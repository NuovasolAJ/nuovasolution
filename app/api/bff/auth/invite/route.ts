import { cookies } from "next/headers";
import { clientKey, envelope, fail, isStub, rateLimited, readJson, refusal, sameOrigin, stubRefused } from "@/lib/contracts/bff";
import { environmentProblem } from "@/lib/contracts/mode";
import { INVITE_COOKIE, SESSION_COOKIE } from "@/lib/contracts/server";
import { verifySession } from "@/lib/contracts/supabase";

export const runtime = "nodejs";

const TYPES = ["invite", "recovery", "signup"];

/**
 * POST /api/bff/auth/invite { access_token, type: "invite" | "recovery" | "signup" }
 *
 * GoTrue e-mail links (handoff v1 §1, v2 §2) land on the site with the session in the URL
 * fragment. The fragment never reaches a server by itself; the page removes it from the address
 * bar at once and posts it here, once. The token is verified with the identity server:
 * - invite / recovery: kept only in a 15-minute httpOnly cookie for the set-password step
 *   (next: "welcome"); it is not a session yet;
 * - signup (the confirmation click): the address is now confirmed and the token becomes the
 *   session (next: "onboarding", where tenant-api decides between registration and setup).
 */
export async function POST(req: Request) {
  if (!sameOrigin(req)) return fail("forbidden", 403);
  if (rateLimited(`invite:${clientKey(req)}`, 10)) return fail("rate_limited", 429);
  if (stubRefused()) return fail("not_available", 404);
  const b = await readJson<{ access_token?: string; type?: string }>(req, 8192);
  const type = String(b?.type ?? "");
  const token = typeof b?.access_token === "string" ? b.access_token : "";
  if (!TYPES.includes(type) || token.length < (isStub() ? 4 : 10)) return fail("link_expired", 401);
  const jar = cookies();
  const secure = !isStub() || process.env.NODE_ENV === "production";
  const next = type === "signup" ? "onboarding" : "welcome";

  if (isStub()) {
    if (token !== "stub") return fail("link_expired", 401);
    if (type === "signup") jar.set(SESSION_COOKIE, "stub", { httpOnly: true, sameSite: "lax", secure, path: "/", maxAge: 60 * 60 * 8 });
    else jar.set(INVITE_COOKIE, "stub", { httpOnly: true, sameSite: "lax", secure, path: "/", maxAge: 15 * 60 });
    return envelope({ ok: true, code: "ok", message: "stub", details: { next } }, 200, true);
  }
  if (environmentProblem()) return fail("environment_misconfigured", 503);
  try {
    const user = await verifySession(token);
    if (!user) return fail("link_expired", 401);
    if (type === "signup") {
      if (!user.emailConfirmed) return fail("email_not_confirmed", 403);
      jar.set(SESSION_COOKIE, token, { httpOnly: true, sameSite: "lax", secure: true, path: "/", maxAge: 60 * 60 });
    } else {
      jar.set(INVITE_COOKIE, token, { httpOnly: true, sameSite: "lax", secure: true, path: "/", maxAge: 15 * 60 });
    }
    return envelope({ ok: true, code: "ok", message: "ok", details: { next } });
  } catch (e) {
    return refusal(e);
  }
}
