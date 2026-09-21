import { cookies } from "next/headers";
import { envelope, fail, isStub, sameOrigin } from "@/lib/contracts/bff";
import { environmentProblem } from "@/lib/contracts/mode";
import { SESSION_COOKIE, STUB_CASE_COOKIE, STUB_CRM_COOKIE } from "@/lib/contracts/server";

export const runtime = "nodejs";

/** POST /api/bff/auth/logout. Revokes the session server-side in sandbox and live, clears cookies in every mode. */
export async function POST(req: Request) {
  if (!sameOrigin(req)) return fail("forbidden", 403);
  const jar = cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (!isStub() && !environmentProblem() && token && token !== "stub" && process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
    await fetch(`${process.env.SUPABASE_URL.replace(/\/$/, "")}/auth/v1/logout`, {
      method: "POST",
      headers: { apikey: process.env.SUPABASE_ANON_KEY, Authorization: `Bearer ${token}` },
      cache: "no-store",
      signal: AbortSignal.timeout(8_000),
    }).catch(() => undefined);
  }
  jar.delete(SESSION_COOKIE);
  jar.delete(STUB_CASE_COOKIE);
  jar.delete(STUB_CRM_COOKIE);
  // An earlier build stored a refresh token under Path=/api/bff/auth. A deletion only
  // matches when the path matches, so it is cleared on that exact path (review WR-12).
  jar.set("nuova_refresh", "", { path: "/api/bff/auth", maxAge: 0, httpOnly: true, sameSite: "lax", secure: true });
  return envelope({ ok: true, code: "ok", message: "signed_out" }, 200, isStub());
}
