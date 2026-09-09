import { cookies } from "next/headers";
import { envelope, fail, isStub, proxy } from "@/lib/contracts/bff";
import { onboardingCase } from "@/lib/contracts/stubs";
import { SESSION_COOKIE, STUB_CASE_COOKIE } from "@/lib/contracts/server";

export const runtime = "nodejs";

/** GET /api/bff/onboarding/state. Wraps backend GET /onboarding/state (Bearer). */
export async function GET() {
  const token = cookies().get(SESSION_COOKIE)?.value;
  if (!token) return fail("no_session", 401);
  if (isStub()) {
    const n = Number(cookies().get(STUB_CASE_COOKIE)?.value ?? "1");
    return envelope({ ok: true, code: "ok", message: "stub", details: onboardingCase(n) }, 200, true);
  }
  const { status, json } = await proxy("/onboarding/state", { bearer: token });
  if (status === 401) return fail("no_session", 401);
  if (status === 403) return fail("forbidden", 403);
  if (!json) return fail("server_error", 502);
  return envelope({ ok: true, code: "ok", message: "ok", details: json });
}
