import { cookies } from "next/headers";
import { envelope, fail, isStub, refusal, sameOrigin } from "@/lib/contracts/bff";
import { SESSION_COOKIE, sessionToken } from "@/lib/contracts/server";
import { resolveActor, serviceRpc } from "@/lib/contracts/supabase";
import type { OnboardingState } from "@/lib/contracts/types";

export const runtime = "nodejs";

/**
 * POST /api/bff/tenant/activate. The browser only sends the request.
 *
 * tenant_activate(p_client_id) takes only a tenant id and does not check who is
 * asking, so the website enforces it here, on the server, fail-closed:
 *  1. the session is verified and the tenant resolved server-side;
 *  2. only an agency_admin may activate (any other or unknown role is refused);
 *  3. the wizard projection is re-read and activation is attempted only when the
 *     backend itself reports activatable=true.
 */
export async function POST(req: Request) {
  if (!sameOrigin(req)) return fail("forbidden", 403);
  if (!cookies().get(SESSION_COOKIE)?.value) return fail("no_session", 401);
  if (isStub()) return envelope({ ok: true, code: "ok", message: "stub", details: { activated: false, note: "stub acknowledges; nothing activated" } }, 202, true);
  try {
    const actor = await resolveActor(sessionToken());
    if (actor.role !== "agency_admin") return fail("forbidden", 403);
    const state = await serviceRpc<OnboardingState>("onboarding_wizard_state", { p_client_id: actor.clientId });
    if (state?.activatable !== true) return fail("not_activatable", 409);
    const res = await serviceRpc<Record<string, unknown>>("tenant_activate", { p_client_id: actor.clientId });
    const activated = res?.activated === true || res?.ok === true || res?.status === "active";
    return envelope({ ok: activated, code: activated ? "ok" : "not_activated", message: activated ? "activated" : "not_activated" }, activated ? 200 : 409);
  } catch (e) {
    return refusal(e);
  }
}
