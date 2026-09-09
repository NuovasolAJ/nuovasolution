import "server-only";
import { cookies, headers } from "next/headers";
import { apiBase, integrationMode } from "./mode";
import { entitlementsStub, onboardingCase, plansStub, trialStub } from "./stubs";
import type { EntitlementSnapshot, OnboardingState, Plan, TrialState } from "./types";

/**
 * Server-side contract access for pages. In stub mode the stub is returned
 * directly (no HTTP hop). In staging mode the BFF proxies with the user's
 * bearer from the httpOnly cookie. Pages never call the backend from the browser.
 */

export const SESSION_COOKIE = "nuova_session";
export const STUB_CASE_COOKIE = "nuova_stub_case";

export function hasSession(): boolean {
  return Boolean(cookies().get(SESSION_COOKIE)?.value);
}

export function stubCaseFromCookie(): number {
  const v = Number(cookies().get(STUB_CASE_COOKIE)?.value ?? "1");
  return Number.isFinite(v) && v >= 1 && v <= 6 ? v : 1;
}

async function bff<T>(path: string): Promise<T | null> {
  if (integrationMode() !== "staging") return null;
  const token = cookies().get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const res = await fetch(`${apiBase()}${path}`, {
    headers: { Authorization: `Bearer ${token}`, apikey: process.env.SUPABASE_ANON_KEY ?? "" },
    cache: "no-store",
  });
  if (!res.ok) return null;
  return (await res.json()) as T;
}

export async function getOnboardingState(caseOverride?: number): Promise<{ data: OnboardingState; stub: boolean }> {
  if (integrationMode() === "stub") {
    return { data: onboardingCase(caseOverride ?? stubCaseFromCookie()), stub: true };
  }
  const data = await bff<OnboardingState>("/onboarding/state");
  if (!data) throw new Error("onboarding_state_unavailable");
  return { data, stub: false };
}

export async function getTrialState(): Promise<{ data: TrialState; stub: boolean }> {
  if (integrationMode() === "stub") return { data: trialStub, stub: true };
  const data = await bff<TrialState>("/trial/status");
  if (!data) throw new Error("trial_status_unavailable");
  return { data, stub: false };
}

export async function getPlans(): Promise<{ data: Plan[]; stub: boolean }> {
  if (integrationMode() === "stub") return { data: plansStub, stub: true };
  const res = await fetch(`${apiBase()}/plans`, { cache: "no-store" });
  if (!res.ok) throw new Error("plans_unavailable");
  const json = (await res.json()) as { plans: Plan[] };
  return { data: json.plans, stub: false };
}

export async function getEntitlements(): Promise<{ data: EntitlementSnapshot; stub: boolean }> {
  if (integrationMode() === "stub") return { data: entitlementsStub, stub: true };
  const data = await bff<EntitlementSnapshot>("/entitlements");
  if (!data) throw new Error("entitlements_unavailable");
  return { data, stub: false };
}

export function requestLocaleHint(): string {
  return headers().get("accept-language") ?? "";
}
