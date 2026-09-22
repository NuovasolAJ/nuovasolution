import "server-only";
import { cookies } from "next/headers";
import { brandingApi, tenantApi, type Json } from "./supabase";
import { DAYS, emptyProfile, type Day, type OnboardingProfile, type Readiness, type ReadinessGate, type TrialView } from "./types-onboarding";

/**
 * Onboarding sections over the staging contracts (WEBSITE_HANDOFF_v1 §5, §6; build/onboarding/*.sql).
 * Reads map backend rows to the UI-safe OnboardingProfile; writes validate input before any call.
 * The stub keeps the same shapes in one cookie so stub and sandbox exercise the same UI.
 */

export const STUB_PROFILE_COOKIE = "nuova_stub_profile";

// ---------------- validation (the backend validates again; this only refuses obvious junk early) ----------------

const TIMEZONES = ["Europe/Madrid", "Atlantic/Canary", "Europe/London", "Europe/Lisbon", "Europe/Berlin", "Europe/Paris", "Europe/Amsterdam"] as const;
export const LANGUAGES = ["es", "en", "de", "fr", "it", "nl", "pt"] as const;
const HOURS = /^([01]\d|2[0-3]):[0-5]\d-([01]\d|2[0-3]):[0-5]\d$/;

export type Invalid = { invalid: string };
const bad = (field: string): Invalid => ({ invalid: field });
const str = (v: unknown, max: number): string | null => (typeof v === "string" && v.trim() ? v.trim().slice(0, max) : null);

export interface BusinessInput {
  timezone: string;
  languages: string[];
  default_language: string;
  business_hours: Partial<Record<Day, string>>;
}

export function parseBusiness(b: Record<string, unknown>): BusinessInput | Invalid {
  const timezone = str(b.timezone, 64);
  if (!timezone || !(TIMEZONES as readonly string[]).includes(timezone)) return bad("timezone");
  const languages = Array.isArray(b.languages) ? Array.from(new Set(b.languages.filter((l): l is string => typeof l === "string" && (LANGUAGES as readonly string[]).includes(l)))) : [];
  if (!languages.length) return bad("languages");
  const default_language = str(b.default_language, 8);
  if (!default_language || !languages.includes(default_language)) return bad("default_language");
  const hours: Partial<Record<Day, string>> = {};
  const raw = (b.business_hours ?? {}) as Record<string, unknown>;
  for (const d of DAYS) {
    const v = raw[d];
    if (v === undefined || v === null || v === "") continue;
    if (v === "closed") hours[d] = "closed";
    else if (typeof v === "string" && HOURS.test(v) && v.slice(0, 5) < v.slice(6)) hours[d] = v;
    else return bad(`business_hours.${d}`);
  }
  if (!Object.values(hours).some((v) => v && v !== "closed")) return bad("business_hours");
  return { timezone, languages, default_language, business_hours: hours };
}

export interface LegalInput {
  legal_name: string;
  tax_id: string;
  address_line: string;
  address_city: string;
  address_postal_code: string;
  address_region: string | null;
  privacy_url: string;
  imprint_url: string | null;
  terms_url: string;
}

function httpsUrl(v: unknown): string | null {
  const s = str(v, 500);
  if (!s) return null;
  try {
    const u = new URL(s);
    return u.protocol === "https:" && u.hostname.includes(".") ? u.toString() : null;
  } catch {
    return null;
  }
}

export function parseLegal(b: Record<string, unknown>): LegalInput | Invalid {
  const legal_name = str(b.legal_name, 200);
  if (!legal_name) return bad("legal_name");
  const tax_id = str(b.tax_id, 20)?.toUpperCase().replace(/[\s-]/g, "") ?? null;
  if (!tax_id || !/^[A-Z0-9]{8,10}$/.test(tax_id)) return bad("tax_id");
  const address_line = str(b.address_line, 200);
  if (!address_line) return bad("address_line");
  const address_city = str(b.address_city, 100);
  if (!address_city) return bad("address_city");
  const address_postal_code = str(b.address_postal_code, 10);
  if (!address_postal_code || !/^\d{5}$/.test(address_postal_code)) return bad("address_postal_code");
  const privacy_url = httpsUrl(b.privacy_url);
  if (!privacy_url) return bad("privacy_url");
  const terms_url = httpsUrl(b.terms_url);
  if (!terms_url) return bad("terms_url");
  const imprintRaw = str(b.imprint_url, 500);
  const imprint_url = imprintRaw ? httpsUrl(imprintRaw) : null;
  if (imprintRaw && !imprint_url) return bad("imprint_url");
  return { legal_name, tax_id, address_line, address_city, address_postal_code, address_region: str(b.address_region, 100), privacy_url, imprint_url, terms_url };
}

export interface CalendarInput {
  appointment_types: { type: string; minutes: number }[];
  no_calendar_fallback: { capture_preferred_time: boolean; create_callback: boolean; inform_customer: boolean };
}

const APPOINTMENT_TYPES = ["viewing", "valuation", "call"] as const;
const MINUTES = [15, 30, 45, 60, 90];

export function parseCalendar(b: Record<string, unknown>): CalendarInput | Invalid {
  const list = Array.isArray(b.appointment_types) ? b.appointment_types : [];
  const appointment_types: CalendarInput["appointment_types"] = [];
  for (const a of list) {
    const t = (a as { type?: unknown })?.type;
    const m = Number((a as { minutes?: unknown })?.minutes);
    if (typeof t !== "string" || !(APPOINTMENT_TYPES as readonly string[]).includes(t) || !MINUTES.includes(m)) return bad("appointment_types");
    if (!appointment_types.some((x) => x.type === t)) appointment_types.push({ type: t, minutes: m });
  }
  if (!appointment_types.length) return bad("appointment_types");
  const f = (b.no_calendar_fallback ?? {}) as Record<string, unknown>;
  const no_calendar_fallback = { capture_preferred_time: f.capture_preferred_time === true, create_callback: f.create_callback === true, inform_customer: f.inform_customer === true };
  // With no calendar connected the guard never books; at least the callback must exist so a request is not dropped.
  if (!no_calendar_fallback.create_callback) return bad("no_calendar_fallback");
  return { appointment_types, no_calendar_fallback };
}

// ---------------- staging reads (WEBSITE_HANDOFF_v2: the user's token, forwarded) ----------------

const obj = (v: unknown): Json => (v && typeof v === "object" && !Array.isArray(v) ? (v as Json) : {});
const s = (v: unknown): string | null => (typeof v === "string" && v ? v : null);

function hoursFrom(v: unknown): Partial<Record<Day, string>> {
  const o = obj(v);
  const out: Partial<Record<Day, string>> = {};
  for (const d of DAYS) if (typeof o[d] === "string") out[d] = o[d] as string;
  return out;
}

function brandingFrom(p: Json): OnboardingProfile["branding"] {
  return {
    display_name: s(p.text_fallback),
    logo: p.logo_present === true ? s(p.logo) : null,
    logo_present: p.logo_present === true,
    logo_dark: s(p.logo_dark),
    needs_light_background: p.needs_light_background === true,
  };
}

/**
 * Only fields listed in OnboardingProfile leave this function: client_id, voice, follow-up,
 * qualification and the trial matrix of onboarding.read stay on the server.
 * tenant-api has no read of the saved legal identity and links (asked as WEB-API-1), so the legal
 * part is marked not readable instead of guessed.
 */
export async function readProfile(token: string | undefined): Promise<OnboardingProfile> {
  const [resolved, preview] = await Promise.all([tenantApi(token, "onboarding.read"), brandingApi(token, "preview")]);
  const business = obj(resolved.business);
  const calendar = obj(resolved.calendar);
  const policy = obj(calendar.policy);
  const base = emptyProfile();
  const types = Array.isArray(policy.appointment_types)
    ? (policy.appointment_types as unknown[]).map(obj).filter((a) => typeof a.type === "string" && typeof a.minutes === "number").map((a) => ({ type: a.type as string, minutes: a.minutes as number }))
    : [];
  const fb = obj(policy.no_calendar_fallback);
  return {
    business: {
      name: s(business.name),
      timezone: s(business.timezone),
      languages: Array.isArray(business.languages) ? (business.languages as unknown[]).filter((l): l is string => typeof l === "string") : base.business.languages,
      default_language: s(business.default_language) ?? "es",
      business_hours: hoursFrom(business.business_hours),
    },
    legal: { ...base.legal, readable: false },
    branding: brandingFrom(preview),
    calendar: {
      connected: calendar.connected === true,
      appointment_types: types.length ? types : base.calendar.appointment_types,
      no_calendar_fallback: Object.keys(fb).length
        ? { capture_preferred_time: fb.capture_preferred_time === true, create_callback: fb.create_callback === true, inform_customer: fb.inform_customer === true }
        : base.calendar.no_calendar_fallback,
    },
    legal_missing: null,
  };
}

export async function readReadiness(token: string | undefined): Promise<Readiness> {
  const r = await tenantApi(token, "readiness");
  const gates: ReadinessGate[] = (Array.isArray(r.gates) ? (r.gates as unknown[]) : []).map(obj).filter((g) => typeof g.gate_key === "string").map((g) => ({
    gate_key: g.gate_key as string,
    status: String(g.status ?? "BLOCKED"),
    mandatory: g.mandatory === true,
    classification: String(g.classification ?? ""),
  }));
  return { gates, activatable: r.activatable === true };
}

export async function readTrial(token: string | undefined): Promise<TrialView | null> {
  const row = await tenantApi(token, "trial.status");
  if (typeof row.status !== "string" || row.status === "none") return null;
  const days = Number(row.remaining_days);
  return { status: row.status, remaining_days: Number.isFinite(days) ? Math.ceil(days) : null, expires_at: s(row.expires_at) };
}

// ---------------- writes (tenant-api onboarding.set: always the complete section, v2 §2) ----------------

const DEFAULT_BOOKING_POLICY = { qualify_before_book: true, noise_protection: true };
const DEFAULT_QUALIFICATION = { require: ["intent", "location"] };

async function currentConfig(token: string | undefined) {
  const r = await tenantApi(token, "onboarding.read");
  const business = obj(r.business);
  const policy = obj(obj(r.calendar).policy);
  return {
    offices: typeof business.offices === "number" ? business.offices : 1,
    service_areas: Array.isArray(business.service_areas) ? business.service_areas : [],
    business_hours: obj(business.business_hours),
    booking_policy: Object.keys(obj(policy.booking_policy)).length ? obj(policy.booking_policy) : DEFAULT_BOOKING_POLICY,
    qualification_requirements: Object.keys(obj(policy.qualification_requirements)).length ? obj(policy.qualification_requirements) : DEFAULT_QUALIFICATION,
    appointment_types: Array.isArray(policy.appointment_types) && policy.appointment_types.length ? policy.appointment_types : [{ type: "viewing", minutes: 30 }],
    no_calendar_fallback: Object.keys(obj(policy.no_calendar_fallback)).length ? obj(policy.no_calendar_fallback) : emptyProfile().calendar.no_calendar_fallback,
  };
}

export async function writeBusiness(token: string | undefined, v: BusinessInput) {
  const cur = await currentConfig(token);
  await tenantApi(token, "onboarding.set", { section: "business", values: { offices: cur.offices, service_areas: cur.service_areas, business_hours: v.business_hours, timezone: v.timezone, languages: v.languages, default_language: v.default_language } });
  // The booking guard reads hours from the calendar policy; keep both in step.
  await tenantApi(token, "onboarding.set", { section: "calendar_policy", values: { booking_policy: cur.booking_policy, qualification_requirements: cur.qualification_requirements, appointment_types: cur.appointment_types, business_hours: v.business_hours, no_calendar_fallback: cur.no_calendar_fallback } });
}

/** Returns the legal part as the setters answered it (server-returned values, not the request echoed). */
export async function writeLegal(token: string | undefined, v: LegalInput): Promise<OnboardingProfile["legal"]> {
  const id = await tenantApi(token, "onboarding.set", { section: "legal_identity", values: { legal_name: v.legal_name, tax_id: v.tax_id, address_line: v.address_line, address_city: v.address_city, address_postal_code: v.address_postal_code, address_region: v.address_region, address_country: "ES" } });
  const links = await tenantApi(token, "onboarding.set", { section: "legal_links", values: { privacy_url: v.privacy_url, imprint_url: v.imprint_url, terms_url: v.terms_url } });
  const address = obj(id.address);
  return {
    readable: false,
    legal_name: s(id.legal_name),
    tax_id: s(id.tax_id),
    address: { line: s(address.line), city: s(address.city), postal_code: s(address.postal_code), region: s(address.region), country: s(address.country) ?? "ES" },
    privacy_url: s(links.privacy_url),
    imprint_url: s(links.imprint_url),
    terms_url: s(links.terms_url),
  };
}

export async function writeCalendar(token: string | undefined, v: CalendarInput) {
  const cur = await currentConfig(token);
  await tenantApi(token, "onboarding.set", { section: "calendar_policy", values: { booking_policy: cur.booking_policy, qualification_requirements: cur.qualification_requirements, appointment_types: v.appointment_types, business_hours: cur.business_hours, no_calendar_fallback: v.no_calendar_fallback } });
}

export async function readBranding(token: string | undefined): Promise<OnboardingProfile["branding"]> {
  return brandingFrom(await brandingApi(token, "preview"));
}

// ---------------- stub store (one cookie, labelled stub, never a backend response) ----------------

export function readStubProfile(): OnboardingProfile {
  const raw = cookies().get(STUB_PROFILE_COOKIE)?.value;
  const p = emptyProfile();
  p.business.name = "Demo Agency (stub)";
  p.branding.display_name = "Demo Agency (stub)";
  if (!raw) return p;
  try {
    const saved = JSON.parse(Buffer.from(raw, "base64url").toString("utf8")) as Partial<OnboardingProfile>;
    const merged: OnboardingProfile = {
      business: { ...p.business, ...saved.business },
      legal: { ...p.legal, ...saved.legal, address: { ...p.legal.address, ...saved.legal?.address } },
      branding: { ...p.branding, ...saved.branding },
      calendar: { ...p.calendar, ...saved.calendar },
      legal_missing: [],
    };
    merged.legal_missing = stubMissing(merged);
    return merged;
  } catch {
    return p;
  }
}

function stubMissing(p: OnboardingProfile): string[] {
  const m: string[] = [];
  if (!p.legal.legal_name) m.push("legal_name");
  if (!p.legal.tax_id) m.push("tax_id");
  if (!p.legal.address.line || !p.legal.address.city || !p.legal.address.postal_code) m.push("address");
  if (!p.legal.privacy_url) m.push("privacy_url");
  if (!p.legal.terms_url) m.push("terms_url");
  if (!p.branding.logo_present) m.push("logo");
  return m;
}

/** Route handlers only (cookies are writable there). Returns the profile as the stub now holds it. */
export function saveStubProfile(p: OnboardingProfile): OnboardingProfile {
  const { legal_missing: _m, ...keep } = p;
  cookies().set(STUB_PROFILE_COOKIE, Buffer.from(JSON.stringify(keep), "utf8").toString("base64url"), { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 60 * 60 * 8 });
  return { ...p, legal_missing: stubMissing(p) };
}

/** Stub readiness: same gate keys as the backend; values follow the stub profile. Waiting-on-us gates stay blocked, as on staging. */
export function stubReadiness(p: OnboardingProfile): Readiness {
  const g = (gate_key: string, ok: boolean, mandatory = true, classification = "OWNER_ACTION"): ReadinessGate => ({ gate_key, status: ok ? "READY" : "BLOCKED", mandatory, classification });
  const gates: ReadinessGate[] = [
    g("agency_tenant", true),
    g("owner_admin", true),
    g("staff_provisioned", true),
    g("plan_entitlements", true),
    g("white_label_legal", (p.legal_missing ?? ["unknown"]).length === 0),
    g("business_hours", Boolean(p.business.timezone)),
    g("whatsapp", false, true, "PROVIDER_ACTION"),
    g("ai_disclosure", false, true, "PROVIDER_ACTION"),
    g("routing_mode", true),
    g("test_scenarios", false),
    g("launch_approval", false),
    { gate_key: "google_sheets", status: "OPTIONAL", mandatory: false, classification: "OWNER_ACTION" },
    { gate_key: "crm_connection", status: "OPTIONAL", mandatory: false, classification: "OWNER_ACTION" },
  ];
  return { gates, activatable: gates.every((x) => !x.mandatory || x.status === "READY") };
}

export const stubTrial: TrialView = { status: "active", remaining_days: 9, expires_at: new Date(Date.now() + 9 * 86400000).toISOString() };
