import { cookies } from "next/headers";
import { clientKey, envelope, fail, isStub, rateLimited, readJson, refusal, sameOrigin, stubRefused } from "@/lib/contracts/bff";
import { environmentProblem } from "@/lib/contracts/mode";
import { INVITE_COOKIE, SESSION_COOKIE, STUB_CASE_COOKIE } from "@/lib/contracts/server";
import { setPassword } from "@/lib/contracts/supabase";

export const runtime = "nodejs";

const MIN = 10;

/**
 * POST /api/bff/auth/set-password { password }. Uses the verified invite/recovery token from the
 * httpOnly cookie (never from the request body) to set the password with the identity server
 * (PUT /auth/v1/user). On success that token becomes the session and the invite cookie is cleared.
 * Whether the account has an agency membership is decided by the backend on the next read
 * (unresolved_membership is shown as such, never papered over).
 */
export async function POST(req: Request) {
  if (!sameOrigin(req)) return fail("forbidden", 403);
  if (rateLimited(`setpw:${clientKey(req)}`, 10)) return fail("rate_limited", 429);
  if (stubRefused()) return fail("not_available", 404);
  const jar = cookies();
  const token = jar.get(INVITE_COOKIE)?.value;
  if (!token) return fail("link_expired", 401);
  const b = await readJson<{ password?: string }>(req);
  const password = typeof b?.password === "string" ? b.password : "";
  if (password.length < MIN || password.length > 128) return fail("weak_password", 400);
  const secure = process.env.NODE_ENV === "production";

  if (isStub()) {
    jar.delete(INVITE_COOKIE);
    jar.set(SESSION_COOKIE, "stub", { httpOnly: true, sameSite: "lax", secure, path: "/", maxAge: 60 * 60 * 8 });
    jar.set(STUB_CASE_COOKIE, "1", { httpOnly: true, sameSite: "lax", secure, path: "/", maxAge: 60 * 60 * 8 });
    return envelope({ ok: true, code: "ok", message: "stub" }, 200, true);
  }
  if (environmentProblem()) return fail("environment_misconfigured", 503);
  try {
    await setPassword(token, password);
    jar.delete(INVITE_COOKIE);
    jar.set(SESSION_COOKIE, token, { httpOnly: true, sameSite: "lax", secure: true, path: "/", maxAge: 60 * 60 });
    return envelope({ ok: true, code: "ok", message: "password_set" });
  } catch (e) {
    return refusal(e);
  }
}
