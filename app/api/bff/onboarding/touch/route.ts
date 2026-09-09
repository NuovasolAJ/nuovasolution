import { cookies } from "next/headers";
import { envelope, fail, isStub, proxy } from "@/lib/contracts/bff";
import { onboardingCase } from "@/lib/contracts/stubs";
import { SESSION_COOKIE, STUB_CASE_COOKIE } from "@/lib/contracts/server";

export const runtime = "nodejs";

/** POST /api/bff/onboarding/touch { step, action:"visit"|"skip" }. Persists the resume pointer. */
export async function POST(req: Request) {
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
  const { status, json } = await proxy("/onboarding/touch", { method: "POST", bearer: token, body: JSON.stringify(body) });
  if (status === 401) return fail("no_session", 401);
  if (status === 403) return fail("forbidden", 403);
  if (status === 400) return fail("invalid_wizard_action", 400);
  return envelope({ ok: true, code: "ok", message: "ok", details: json });
}
