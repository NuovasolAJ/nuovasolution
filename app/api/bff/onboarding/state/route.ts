import { envelope, fail, refusal } from "@/lib/contracts/bff";
import { getOnboardingBundle, sessionToken } from "@/lib/contracts/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/bff/onboarding/state. Stub: the selected labelled fixture.
 * Sandbox and live: tenant-api `session` decides: a confirmed user without an agency gets
 * next:"register"; a member gets the wizard projection, the UI-safe profile, readiness
 * (tenant_activation_readiness) and trial status. The tenant id never leaves the server.
 */
export async function GET() {
  if (!sessionToken()) return fail("no_session", 401);
  try {
    const b = await getOnboardingBundle();
    if (b.kind === "register") return envelope({ ok: true, code: "ok", message: b.stub ? "stub" : "ok", details: { next: "register" } }, 200, b.stub);
    return envelope({ ok: true, code: "ok", message: b.stub ? "stub" : "ok", details: { next: "onboarding", state: b.state, profile: b.profile, readiness: b.readiness, trial: b.trial } }, 200, b.stub);
  } catch (e) {
    return refusal(e);
  }
}
