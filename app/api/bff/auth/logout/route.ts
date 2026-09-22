import { cookies } from "next/headers";
import { envelope, fail, isStub, sameOrigin } from "@/lib/contracts/bff";
import { STUB_PROFILE_COOKIE } from "@/lib/contracts/onboarding";
import { INVITE_COOKIE, SESSION_COOKIE, STUB_CASE_COOKIE, STUB_CRM_COOKIE, STUB_REGISTERED_COOKIE } from "@/lib/contracts/server";
import { gotrueLogout } from "@/lib/contracts/supabase";

export const runtime = "nodejs";

/** POST /api/bff/auth/logout. Revokes the session server-side in sandbox and live, clears cookies in every mode. */
export async function POST(req: Request) {
  if (!sameOrigin(req)) return fail("forbidden", 403);
  const jar = cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (!isStub() && token && token !== "stub") await gotrueLogout(token);
  jar.delete(SESSION_COOKIE);
  jar.delete(STUB_CASE_COOKIE);
  jar.delete(STUB_CRM_COOKIE);
  jar.delete(STUB_PROFILE_COOKIE);
  jar.delete(STUB_REGISTERED_COOKIE);
  jar.delete(INVITE_COOKIE);
  // An earlier build stored a refresh token under Path=/api/bff/auth. A deletion only
  // matches when the path matches, so it is cleared on that exact path (review WR-12).
  jar.set("nuova_refresh", "", { path: "/api/bff/auth", maxAge: 0, httpOnly: true, sameSite: "lax", secure: true });
  return envelope({ ok: true, code: "ok", message: "signed_out" }, 200, isStub());
}
