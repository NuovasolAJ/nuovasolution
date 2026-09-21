import { cookies } from "next/headers";
import { awaitingContract, envelope, fail, isStub, sameOrigin } from "@/lib/contracts/bff";
import { onboardingCase } from "@/lib/contracts/stubs";
import { SESSION_COOKIE, STUB_CASE_COOKIE } from "@/lib/contracts/server";

export const runtime = "nodejs";

/**
 * POST /api/bff/onboarding/touch { step, action:"visit"|"skip" }. Persists the resume pointer.
 * Sandbox: the backend function's signature is not in a delivered contract
 * (onboarding_wizard_touch), so this answers awaiting_contract rather than guessing.
 */
export async function POST(req: Request) {
  if (!sameOrigin(req)) return fail("forbidden", 403);
  const token = cookies().get(SESSION_COOKIE)?.value;
  if (!token) return fail("no_session", 401);
  let body: { step?: string; action?: string };
  try {
    body = await req.json();
  } catch {
    return fail("invalid_input", 400);
  }
  if (!body.step || (body.action !== "visit" && body.action !== "skip")) return fail("invalid_wizard_action", 400);

  if (isStub()) {
    const state = onboardingCase(Number(cookies().get(STUB_CASE_COOKIE)?.value ?? "1"));
    return envelope({ ok: true, code: "ok", message: "stub", details: { ok: true, resume_step: body.step, percent_complete: state.percent_complete } }, 200, true);
  }
  return awaitingContract("onboarding_wizard_touch");
}
