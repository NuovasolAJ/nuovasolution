import { clientKey, envelope, fail, rateLimited, refusal } from "@/lib/contracts/bff";
import { sessionToken } from "@/lib/contracts/server";
import { getSocialState, isSocialScreen } from "@/lib/contracts/social";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/bff/social/state?screen=connect|post|inbox|settings
 * Read only. Stub: the labelled fixture. Staging: tenant-api `social.state` with the user's own
 * session token; the tenant is the session's. The answer is the reduced screen state: no tenant
 * id, no credential, no provider account id (SOCIAL_UI_API_CONTRACT_v1).
 */
export async function GET(req: Request) {
  if (!sessionToken()) return fail("no_session", 401);
  if (rateLimited(`social:${clientKey(req)}`, 40)) return fail("rate_limited", 429);
  const screen = new URL(req.url).searchParams.get("screen");
  if (!isSocialScreen(screen)) return fail("invalid_input", 400);
  try {
    const s = await getSocialState(screen);
    return envelope({ ok: true, code: "ok", message: s.stub ? "stub" : "ok", details: s }, 200, s.stub);
  } catch (e) {
    return refusal(e);
  }
}
