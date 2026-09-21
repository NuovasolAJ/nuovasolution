import { cookies } from "next/headers";
import { envelope, fail, isStub, sameOrigin, stubRefused } from "@/lib/contracts/bff";
import { STUB_CASE_COOKIE } from "@/lib/contracts/server";

export const runtime = "nodejs";

/**
 * POST /api/bff/onboarding/case { case: 1..6 }. STUB MODE ONLY. Selects which of
 * the six readiness fixtures the wizard renders, so each case can be proven
 * visually. Returns 404 in staging mode: it does not exist there.
 */
export async function POST(req: Request) {
  if (!isStub() || stubRefused() || !sameOrigin(req)) return fail("not_found", 404);
  let body: { case?: number };
  try {
    body = await req.json();
  } catch {
    return fail("invalid_input", 400);
  }
  const n = Number(body.case);
  if (!Number.isInteger(n) || n < 1 || n > 6) return fail("invalid_input", 400);
  cookies().set(STUB_CASE_COOKIE, String(n), { httpOnly: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 8 });
  return envelope({ ok: true, code: "ok", message: "stub", details: { case: n } }, 200, true);
}
