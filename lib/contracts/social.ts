import "server-only";
import { integrationMode } from "./mode";
import { sessionToken } from "./server";
import { BackendRefusal, tenantApi, type Json } from "./supabase";

/**
 * Social screens, read side (SOCIAL_UI_API_CONTRACT_v1, SOCIAL_UI_SPEC_v1).
 *
 *   browser → this server (session cookie) → tenant-api op `social.state` with the user's own JWT
 *
 * The session decides the tenant; no client_id is sent. What comes back is reduced here to what a
 * screen shows: the tenant id, the readiness rule's internal authority text and the connected
 * account's provider id never leave the server. This module reads only. Connecting, publishing,
 * polling and replying go to a different server contract (social_meta_ig) and are not part of it.
 */

export type SocialScreen = "connect" | "post" | "inbox" | "settings";
const SCREENS: readonly SocialScreen[] = ["connect", "post", "inbox", "settings"];
export function isSocialScreen(v: string | null | undefined): v is SocialScreen {
  return Boolean(v) && (SCREENS as readonly string[]).includes(v as string);
}

export type PublishEntitlement = "enabled" | "deferred" | "denied" | "unknown";

export interface SocialConnection {
  platform: string;
  display_name: string | null;
  status: string;
  connected_at: string | null;
  disconnected_at: string | null;
}

export interface SocialListing {
  key: string;
  title: string;
  location: string | null;
  price: number | null;
  last_seen_at: string | null;
  ready: boolean;
  /** Reduced reason codes: source_rights_missing | listing_stale | other. */
  reasons: ("source_rights_missing" | "listing_stale" | "other")[];
  max_age_hours: number | null;
}

export type PostState = "queued" | "published" | "delivery_unknown" | "blocked" | "other";
export interface SocialPost {
  key: string;
  state: PostState;
  blocked_reason: string | null;
  scheduled_for: string | null;
  cta_withheld: boolean;
  permalink: string | null;
  published_at: string | null;
  is_mock: boolean;
}

export interface SocialSignal {
  key: string;
  kind: "comment" | "message";
  intent: string | null;
  became_lead: boolean;
  created_at: string | null;
  text: string;
  reply: { kind: "public" | "private" | "message" | "other"; at: string | null; ref: string | null } | null;
  /** A message older than 24 hours without an answer: the provider's reply window is over. */
  window_expired: boolean;
}

export interface SocialState {
  screen: SocialScreen;
  as_of: string | null;
  entitlement: { publish: PublishEntitlement; tenant_active: boolean; account_state: string | null };
  connection: SocialConnection[];
  listings: SocialListing[];
  posts: SocialPost[];
  inbox: SocialSignal[];
  webhook: { events: number; last_received_at: string | null } | null;
  stub: boolean;
}

const str = (v: unknown, max = 200): string | null => (typeof v === "string" && v.trim() ? v.slice(0, max) : null);
const iso = (v: unknown): string | null => (typeof v === "string" && !Number.isNaN(Date.parse(v)) ? v : null);
const arr = (v: unknown): Json[] => (Array.isArray(v) ? (v.filter((x) => x && typeof x === "object") as Json[]) : []);

/** Only https links to Instagram are passed on as a permalink. */
function permalink(v: unknown): string | null {
  const s = str(v, 300);
  if (!s) return null;
  try {
    const u = new URL(s);
    return u.protocol === "https:" && /(^|\.)instagram\.com$/.test(u.hostname) ? u.toString() : null;
  } catch {
    return null;
  }
}

function reduce(raw: Json, screen: SocialScreen, stub: boolean): SocialState {
  const e = (raw.entitlement ?? {}) as Json;
  const publish = e.social_publish === "enabled" || e.social_publish === "deferred" || e.social_publish === "denied" ? e.social_publish : "unknown";
  const asOf = iso(raw.as_of);
  const now = asOf ? Date.parse(asOf) : Date.now();

  const connection = arr(raw.connection).map((c) => ({
    platform: str(c.platform, 40) ?? str(c.provider, 40) ?? "instagram",
    display_name: str(c.display_name, 80),
    status: str(c.status, 40) ?? "unknown",
    connected_at: iso(c.connected_at),
    disconnected_at: iso(c.disconnected_at),
  }));

  const listings = arr(raw.listings).map((l, i) => {
    const r = (l.readiness ?? {}) as Json;
    const reasons = (Array.isArray(r.reasons) ? r.reasons : []).map((x) => {
      const code = String(x);
      return code === "source_rights_missing" ? "source_rights_missing" : code.startsWith("listing_stale") ? "listing_stale" : "other";
    }) as SocialListing["reasons"];
    return {
      key: `l${i}`,
      title: str(l.title, 160) ?? "",
      location: str(l.location, 80),
      price: typeof l.price === "number" && Number.isFinite(l.price) ? l.price : null,
      last_seen_at: iso(l.last_seen_at),
      ready: r.ready === true,
      reasons: reasons.filter((x, n) => reasons.indexOf(x) === n),
      max_age_hours: typeof r.max_age_hours === "number" ? r.max_age_hours : null,
    };
  });

  const posts = arr(raw.posts).map((p, i) => {
    const post = (p.post ?? {}) as Json;
    const s = String(p.state ?? "");
    const unknown = s === "delivery_unknown" || p.delivery === "unknown";
    const state: PostState = unknown ? "delivery_unknown" : s === "published" || post.published_at ? "published" : s === "queued" ? "queued" : s === "blocked" || p.blocked_reason ? "blocked" : "other";
    return {
      key: `p${i}`,
      state,
      blocked_reason: str(p.blocked_reason, 80),
      scheduled_for: iso(p.scheduled_for),
      cta_withheld: typeof p.cta_status === "string" && p.cta_status.startsWith("withheld"),
      permalink: permalink(post.permalink),
      published_at: iso(post.published_at),
      is_mock: post.is_mock === true,
    };
  });

  const inbox = arr(raw.inbox).map((s, i) => {
    const type = String(s.signal_type ?? "");
    const kind: SocialSignal["kind"] = /dm|message/i.test(type) ? "message" : "comment";
    const rep = s.reply && typeof s.reply === "object" ? (s.reply as Json) : null;
    const answered = rep && typeof rep.outcome === "string" && rep.outcome.length > 0;
    const rk = String(rep?.kind ?? "");
    const created = iso(s.created_at);
    return {
      key: `s${i}`,
      kind,
      intent: str(s.intent, 40),
      became_lead: s.became_lead === true,
      created_at: created,
      text: str(s.text, 400) ?? "",
      reply: answered ? { kind: /private/.test(rk) ? "private" : /public/.test(rk) ? "public" : /dm/.test(rk) ? "message" : "other", at: iso(rep?.claimed_at), ref: str(rep?.provider_ref, 64) } : null,
      window_expired: kind === "message" && !answered && created !== null && now - Date.parse(created) > 24 * 3600 * 1000,
    } as SocialSignal;
  });

  const w = raw.webhook_health && typeof raw.webhook_health === "object" ? (raw.webhook_health as Json) : null;
  return {
    screen,
    as_of: asOf,
    entitlement: { publish, tenant_active: e.tenant_active === true, account_state: str(e.account_state, 40) },
    connection,
    listings,
    posts,
    inbox,
    webhook: w ? { events: Number(w.events) || 0, last_received_at: iso(w.last_received_at) } : null,
    stub,
  };
}

/**
 * LOCAL STUB for the design preview. Synthetic, labelled on the page, never a backend answer.
 * Case "empty": a fresh workspace. Default: every state a screen can show, once.
 */
function stubState(screen: SocialScreen, which: string | undefined): SocialState {
  const t = (h: number) => new Date(Date.UTC(2026, 8, 29, 9, 0, 0) - h * 3600 * 1000).toISOString();
  const listings = [
    { title: "Villa in Nerja (synthetic)", location: "Nerja", price: 545000, last_seen_at: t(20), readiness: { ready: true, reasons: [], max_age_hours: 168 } },
    { title: "Apartment in Torrox Costa (synthetic)", location: "Torrox Costa", price: 219000, last_seen_at: t(20), readiness: { ready: true, reasons: [], max_age_hours: 168 } },
    { title: "Townhouse in Frigiliana (synthetic)", location: "Frigiliana", price: 389000, last_seen_at: t(200), readiness: { ready: false, reasons: ["listing_stale:200h"], max_age_hours: 168 } },
    { title: "Flat in Nerja, rights not documented (synthetic)", location: "Nerja", price: 175000, last_seen_at: t(1), readiness: { ready: false, reasons: ["source_rights_missing"], max_age_hours: 168 } },
  ];
  if (which === "empty") {
    return reduce({ as_of: t(0), entitlement: { social_publish: "enabled", tenant_active: true, account_state: "trialing" }, connection: [], listings, posts: [], inbox: [], webhook_health: { events: 0, last_received_at: null } }, screen, true);
  }
  return reduce(
    {
      as_of: t(0),
      entitlement: { social_publish: "enabled", tenant_active: true, account_state: "trialing" },
      connection: [{ platform: "instagram", display_name: "demo.agency.nerja", status: "connected", connected_at: t(72), disconnected_at: null }],
      listings,
      posts: [
        { state: "published", cta_status: "withheld:number_not_approved", post: { permalink: null, published_at: t(30), is_mock: true } },
        { state: "queued", scheduled_for: t(-2), post: {} },
        { state: "delivery_unknown", post: {} },
      ],
      inbox: [
        { signal_type: "comment", intent: "viewing_request", became_lead: true, created_at: t(3), text: "Is the villa still available? We would like to see it on Thursday. (synthetic)", reply: null },
        { signal_type: "comment", intent: "price_inquiry", became_lead: false, created_at: t(26), text: "What is the price per square metre? (synthetic)", reply: { kind: "reply_private", outcome: "sent", provider_ref: "demo-reply-0001", claimed_at: t(25) } },
        { signal_type: "dm_inbound", intent: "location_question", became_lead: false, created_at: t(40), text: "How far is it to the beach? (synthetic)", reply: null },
      ],
      webhook_health: { events: 3, last_received_at: t(3) },
    },
    screen,
    true,
  );
}

/** Read one screen's state for the signed-in user. Throws BackendRefusal with the site's display code. */
export async function getSocialState(screen: SocialScreen, stubCase?: string): Promise<SocialState> {
  if (integrationMode() === "stub") return stubState(screen, stubCase);
  const raw = await tenantApi<Json>(sessionToken(), "social.state", { screen });
  if (!raw || raw.ok === false) {
    const reason = typeof raw?.reason === "string" ? raw.reason : "";
    // Refusals are states (HTTP 200): a login without an agency, or a tenant the backend does not know.
    throw new BackendRefusal(reason === "missing_client_id" || reason === "unknown_tenant" ? "unresolved_membership" : "server_error", reason ? 409 : 502);
  }
  return reduce(raw, screen, false);
}
