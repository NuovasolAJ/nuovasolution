import { envelope, isStub } from "@/lib/contracts/bff";
import { environmentProblem } from "@/lib/contracts/mode";
import { sessionToken } from "@/lib/contracts/server";
import { verifySession } from "@/lib/contracts/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/bff/auth/session. Says whether the browser holds a usable session, nothing more: the header reads
 * it once per page to show "My agency" and "Log out" instead of "Log in" (audit order 2026-10-08b, point 3),
 * while the public pages stay static. No token, no user id and no tenant leaves the server; a dead or
 * expired token answers signed out.
 */
export async function GET() {
  const token = sessionToken();
  if (!token) return envelope({ ok: true, code: "ok", message: "anonymous", details: { signedIn: false } });
  if (isStub()) return envelope({ ok: true, code: "ok", message: "stub", details: { signedIn: token === "stub", name: "Demo Agency (stub)" } }, 200, true);
  if (environmentProblem()) return envelope({ ok: true, code: "ok", message: "unverified", details: { signedIn: false } });
  try {
    const user = await verifySession(token);
    return envelope({ ok: true, code: "ok", message: user ? "signed_in" : "anonymous", details: { signedIn: Boolean(user), name: user?.agencyName ?? null } });
  } catch {
    return envelope({ ok: true, code: "ok", message: "unverified", details: { signedIn: false } });
  }
}
