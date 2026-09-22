import { cookies } from "next/headers";
import { envelope, fail, isStub, refusal, sameOrigin } from "@/lib/contracts/bff";
import { SESSION_COOKIE, sessionToken } from "@/lib/contracts/server";
import { tenantApi } from "@/lib/contracts/supabase";

export const runtime = "nodejs";

const OUTCOMES = ["activated", "already_active", "blocked"] as const;

/**
 * POST /api/bff/tenant/activate. The browser only sends the request.
 * tenant-api `activate` (v2 §2) with the user's own token: agency_admin only (FORBIDDEN_ADMIN_ONLY
 * otherwise), decided by tenant_activation_readiness on the server. The answer is passed on as
 * outcome plus blocked gate keys; the page renders those only through its label map.
 */
export async function POST(req: Request) {
  if (!sameOrigin(req)) return fail("forbidden", 403);
  if (!cookies().get(SESSION_COOKIE)?.value) return fail("no_session", 401);
  if (isStub()) return envelope({ ok: true, code: "ok", message: "stub", details: { outcome: "blocked", activated: false, note: "stub acknowledges; nothing activated" } }, 202, true);
  try {
    const r = await tenantApi(sessionToken(), "activate");
    const outcome = OUTCOMES.find((o) => o === r.outcome) ?? null;
    if (!outcome || r.readiness_source !== "tenant_activation_readiness") return fail("server_error", 502);
    const keys = (v: unknown) => (Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : []);
    const activated = outcome !== "blocked" && r.activated !== false;
    return envelope(
      { ok: activated, code: activated ? "ok" : "not_activatable", message: outcome, details: { outcome, activated, blocked_mandatory: keys(r.blocked_mandatory), blocked_features: keys(r.blocked_features) } },
      activated ? 200 : 409,
    );
  } catch (e) {
    return refusal(e);
  }
}
