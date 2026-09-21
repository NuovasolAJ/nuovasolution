import "server-only";
import { cookies, headers } from "next/headers";
import { integrationMode } from "./mode";
import { crmCatalogStub, entitlementsStub, onboardingCase, plansStub, trialStub } from "./stubs";
import { resolveActor, serviceRpc } from "./supabase";
import type { CrmCatalogEntry, CrmSelection, EntitlementSnapshot, OnboardingState, Plan, TrialState } from "./types";

/**
 * Server-side contract access for pages. Stub mode returns the labelled stub
 * directly. Sandbox and live read through lib/contracts/supabase.ts: the session
 * cookie is verified with the identity server, the tenant is resolved on the
 * server, and only then is a backend function called. Pages never call the
 * backend from the browser.
 */

export const SESSION_COOKIE = "nuova_session";
export const STUB_CASE_COOKIE = "nuova_stub_case";
export const STUB_CRM_COOKIE = "nuova_stub_crm";

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

export async function getOnboardingState(caseOverride?: number): Promise<{ data: OnboardingState; stub: boolean }> {
  if (integrationMode() === "stub") {
    return { data: onboardingCase(caseOverride ?? stubCaseFromCookie()), stub: true };
  }
  const actor = await resolveActor(sessionToken());
  const data = await serviceRpc<OnboardingState>("onboarding_wizard_state", { p_client_id: actor.clientId });
  if (!data || !Array.isArray(data.steps)) throw new Error("onboarding_state_unavailable");
  return { data, stub: false };
}

/**
 * Trial status. The sandbox has no confirmed read for the full trial record yet
 * (awaiting governance/WEBSITE_HANDOFF_v1.md), so it returns null there and the
 * page shows only what the wizard projection returns (trial_end). Never computed
 * from a hardcoded length.
 */
export async function getTrialState(): Promise<{ data: TrialState; stub: boolean } | null> {
  if (integrationMode() === "stub") return { data: trialStub, stub: true };
  return null;
}

export type PlansResult = { kind: "stub"; plans: Plan[] } | { kind: "live"; plans: Plan[] } | { kind: "awaiting_contract" };

/** Plans. No price exists anywhere. Sandbox: the plans read is not yet contracted. */
export async function getPlans(): Promise<PlansResult> {
  if (integrationMode() === "stub") return { kind: "stub", plans: plansStub };
  return { kind: "awaiting_contract" };
}

export async function getEntitlements(): Promise<{ data: EntitlementSnapshot; stub: boolean }> {
  if (integrationMode() === "stub") return { data: entitlementsStub, stub: true };
  const actor = await resolveActor(sessionToken());
  const raw = await serviceRpc<{ features?: EntitlementSnapshot["features"]; account_state?: string }>("resolve_entitlements", { p_client_id: actor.clientId });
  // Only the two fields the contract names leave the server. Limits, quotas and plan internals stay here.
  return { data: { features: raw.features ?? {}, account_state: raw.account_state ?? "unknown" }, stub: false };
}

export async function getCrmCatalog(): Promise<{ data: CrmCatalogEntry[]; stub: boolean }> {
  if (integrationMode() === "stub") return { data: crmCatalogStub, stub: true };
  const raw = await serviceRpc<CrmCatalogEntry[]>("crm_provider_catalog", {});
  const data = (Array.isArray(raw) ? raw : [])
    .filter((e) => typeof e?.provider === "string" && typeof e?.display_name === "string")
    .map(({ note: _note, ...rest }) => rest)
    .sort((a, b) => a.sort - b.sort);
  return { data, stub: false };
}

/**
 * What can honestly be said about the current CRM choice.
 * Stub: read back from the stub cookie. Sandbox: step 7 of the wizard projection
 * says whether an external CRM is of record; the backend offers no read of an
 * additional Google Sheets projection or of recorded interest (question CRM-READ-1).
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
  };
}

export function crmSelectionFromState(state: OnboardingState): CrmSelection {
  const crm = state.steps.find((s) => s.key === "crm");
  return {
    of_record: crm && crm.external_crm === false ? "nuovasolution" : null,
    selected: null,
    interest: null,
    source: "wizard_state",
    selection_not_readable: true,
  };
}

export function requestLocaleHint(): string {
  return headers().get("accept-language") ?? "";
}
