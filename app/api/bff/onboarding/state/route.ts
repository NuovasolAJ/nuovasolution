import { envelope, fail, refusal } from "@/lib/contracts/bff";
import { getOnboardingState, sessionToken } from "@/lib/contracts/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/bff/onboarding/state. Stub: the selected labelled fixture.
 * Sandbox and live: verified session -> tenant resolved on the server ->
 * onboarding_wizard_state(p_client_id). The projection is returned unchanged.
 */
export async function GET() {
  if (!sessionToken()) return fail("no_session", 401);
  try {
    const { data, stub } = await getOnboardingState();
    return envelope({ ok: true, code: "ok", message: stub ? "stub" : "ok", details: data }, 200, stub);
  } catch (e) {
    return refusal(e);
  }
}
