import "server-only";
import { cookies, headers } from "next/headers";
import { integrationMode } from "./mode";
import { readProfile, readReadiness, readStubProfile, readTrial, stubReadiness, stubTrial } from "./onboarding";
import { crmCatalogStub, entitlementsStub, onboardingCase, plansStub } from "./stubs";
import { sessionActor, tenantApi, verifySession, type Json } from "./supabase";
import type { CrmCatalogEntry, CrmSelection, EntitlementSnapshot, OnboardingState, Plan } from "./types";
import type { OnboardingProfile, Readiness, TrialView } from "./types-onboarding";

/**
 * Server-side contract access for pages. Stub mode returns the labelled stub directly.
 * Sandbox and live (WEBSITE_HANDOFF_v2): the session token from the httpOnly cookie is forwarded
 * to the JWT-bound edge functions, which verify it and derive tenant and role themselves.
 * Pages never call the backend from the browser, and no tenant id is ever sent or rendered.
 */

export const SESSION_COOKIE = "nuova_session";
export const STUB_CASE_COOKIE = "nuova_stub_case";
export const STUB_CRM_COOKIE = "nuova_stub_crm";
/** Stub only: "0" after a stub sign-up until the stub registration step is done. */
export const STUB_REGISTERED_COOKIE = "nuova_stub_registered";
/** Set by /api/bff/consent/connect-notice for 10 minutes; required by crm/select for Google Sheets. */
export const NOTICE_ACK_COOKIE = "nuova_notice_ack";
/** Verified invite/recovery token between the e-mail link and the set-password step (15 minutes). */
export const INVITE_COOKIE = "nuova_invite";

export function hasInvite(): boolean {
  return Boolean(cookies().get(INVITE_COOKIE)?.value);
}

export function hasSession(): boolean {
  return Boolean(cookies().get(SESSION_COOKIE)?.value);
}

export function sessionToken(): string | undefined {
  return cookies().get(SESSION_COOKIE)?.value;
}

export function stubCaseFromCookie(): number {
  const v = Number(cookies().get(STUB_CASE_COOKIE)?.value ?? "1");
  return Number.isFinite(v) && v >= 1 && v <= 6 ? v : 1;
}

/** Everything the onboarding page needs for a member of an agency. */
export interface OnboardingBundle {
  kind: "member";
  state: OnboardingState;
  profile: OnboardingProfile;
  readiness: Readiness | null;
  trial: TrialView | null;
  role: string;
  stub: boolean;
}

/** A signed-in, confirmed user without an agency yet: the page shows the registration step (v2 §2). */
export interface RegistrationBundle {
  kind: "register";
  agencyNameHint: string | null;
  email: string | null;
  stub: boolean;
}

export async function getOnboardingBundle(caseOverride?: number): Promise<OnboardingBundle | RegistrationBundle> {
  if (integrationMode() === "stub") {
    if (cookies().get(STUB_REGISTERED_COOKIE)?.value === "0") return { kind: "register", agencyNameHint: "Demo Agency (stub)", email: "demo@agency.example", stub: true };
    const profile = readStubProfile();
    return { kind: "member", state: { ...onboardingCase(caseOverride ?? stubCaseFromCookie()), client_id: "" }, profile, readiness: stubReadiness(profile), trial: stubTrial, role: "agency_admin", stub: true };
  }
  const token = sessionToken();
  const actor = await sessionActor(token);
  if (!actor.authorized) {
    const user = await verifySession(token);
    return { kind: "register", agencyNameHint: user?.agencyName ?? null, email: actor.email, stub: false };
  }
  const [raw, profile, readiness, trial] = await Promise.all([
    tenantApi<OnboardingState>(token, "onboarding.state"),
    readProfile(token),
    readReadiness(token).catch(() => null), // the page says "could not load readiness", never a guess
    readTrial(token).catch(() => null),
  ]);
  if (!raw || !Array.isArray(raw.steps)) throw new Error("onboarding_state_unavailable");
  return { kind: "member", state: { ...raw, client_id: "" }, profile, readiness, trial, role: actor.role ?? "agent", stub: false };
}

export type PlansResult = { kind: "stub"; plans: Plan[] } | { kind: "live"; plans: Plan[] } | { kind: "awaiting_contract" };

/** Plans. No price exists anywhere. The plan vocabulary is an open owner/Billing decision (v2 §5), so none is shown. */
export async function getPlans(): Promise<PlansResult> {
  if (integrationMode() === "stub") return { kind: "stub", plans: plansStub };
  return { kind: "awaiting_contract" };
}

export async function getEntitlements(): Promise<{ data: EntitlementSnapshot; stub: boolean }> {
  if (integrationMode() === "stub") return { data: entitlementsStub, stub: true };
  const raw = await tenantApi<{ features?: EntitlementSnapshot["features"]; account_state?: string }>(sessionToken(), "entitlements");
  // Only the two fields the contract names leave the server. Limits, quotas and plan internals stay here.
  return { data: { features: raw.features ?? {}, account_state: raw.account_state ?? "unknown" }, stub: false };
}

/** CRM catalog (tenant-api crm.catalog, member). The backend's English note is never passed on. */
export async function getCrmCatalog(): Promise<{ data: CrmCatalogEntry[]; stub: boolean }> {
  if (integrationMode() === "stub") return { data: crmCatalogStub, stub: true };
  const raw = await tenantApi<unknown>(sessionToken(), "crm.catalog");
  const data = (Array.isArray(raw) ? (raw as CrmCatalogEntry[]) : [])
    .filter((e) => typeof e?.provider === "string" && typeof e?.display_name === "string")
    .map(({ note: _note, ...rest }) => rest)
    .sort((a, b) => a.sort - b.sort);
  return { data, stub: false };
}

/**
 * What can honestly be said about the current CRM choice.
 * Stub: read back from the stub cookie. Sandbox: tenant-api crm.current, where the choice and the
 * actual connection are reported separately (v2 §2). Google Sheets reads "connected" only when
 * the connection itself says connected, never because it was chosen.
 */
export function stubCrmSelection(): CrmSelection {
  const raw = cookies().get(STUB_CRM_COOKIE)?.value ?? "";
  const [selected, interest] = raw.split("|");
  return {
    of_record: "nuovasolution",
    selected: selected === "google_sheets" ? "google_sheets" : null,
    interest: interest && /^[a-z_]{2,32}$/.test(interest) ? interest : null,
    source: "stub",
    selection_not_readable: false,
    explicitly_chosen: selected === "google_sheets" || selected === "nuovasolution",
    sheets_connected: false, // the stub never connects anything
  };
}

export async function getCrmSelection(): Promise<CrmSelection> {
  if (integrationMode() === "stub") return stubCrmSelection();
  const r = await tenantApi<Json>(sessionToken(), "crm.current");
  const sel = (r.selection ?? {}) as Json;
  const con = (r.connection ?? {}) as Json;
  const sheets = sel.sheets_projection === true;
  return {
    // onboarding_crm_current: crm_of_record is "nuova_native" while crm_mode is the built-in CRM.
    of_record: sel.crm_of_record === "nuova_native" || sel.crm_mode === "nuovasolution" ? "nuovasolution" : null,
    selected: sheets ? "google_sheets" : null,
    interest: typeof sel.interest === "string" && /^[a-z_]{2,32}$/.test(sel.interest) ? sel.interest : null,
    source: "crm_current",
    selection_not_readable: false,
    explicitly_chosen: sel.explicitly_chosen === true,
    sheets_connected: sheets && con.status === "connected",
  };
}

export function requestLocaleHint(): string {
  return headers().get("accept-language") ?? "";
}
