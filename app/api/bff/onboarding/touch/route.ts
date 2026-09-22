import { cookies } from "next/headers";
import { clientKey, envelope, fail, isStub, rateLimited, readJson, refusal, sameOrigin } from "@/lib/contracts/bff";
import { onboardingCase } from "@/lib/contracts/stubs";
import { SESSION_COOKIE, sessionToken, STUB_CASE_COOKIE } from "@/lib/contracts/server";
import { tenantApi } from "@/lib/contracts/supabase";
import type { StepKey } from "@/lib/contracts/types";

export const runtime = "nodejs";

const STEPS: StepKey[] = ["account", "agency", "branding", "team", "communication", "lead_acquisition", "crm", "property_source", "property_experience", "ready"];

/**
 * POST /api/bff/onboarding/touch { step, action:"visit"|"skip" }. Persists the resume pointer.
 * Sandbox: tenant-api onboarding.touch with the user's own token; the backend derives the tenant
 * and checks manage_users itself. Returns resume_step and percent_complete only.
 */
export async function POST(req: Request) {
  if (!sameOrigin(req)) return fail("forbidden", 403);
  if (rateLimited(`touch:${clientKey(req)}`, 30)) return fail("rate_limited", 429);
  if (!cookies().get(SESSION_COOKIE)?.value) return fail("no_session", 401);
  const body = await readJson<{ step?: string; action?: string }>(req);
  if (!body || !STEPS.includes(body.step as StepKey) || (body.action !== "visit" && body.action !== "skip")) return fail("invalid_wizard_action", 400);

  if (isStub()) {
    const state = onboardingCase(Number(cookies().get(STUB_CASE_COOKIE)?.value ?? "1"));
    return envelope({ ok: true, code: "ok", message: "stub", details: { resume_step: body.step, percent_complete: state.percent_complete } }, 200, true);
  }
  try {
    const r = await tenantApi<{ resume_step?: string; percent_complete?: number }>(sessionToken(), "onboarding.touch", { step: body.step, action: body.action });
    return envelope({ ok: true, code: "ok", message: "ok", details: { resume_step: r?.resume_step ?? null, percent_complete: typeof r?.percent_complete === "number" ? r.percent_complete : null } });
  } catch (e) {
    return refusal(e);
  }
}
