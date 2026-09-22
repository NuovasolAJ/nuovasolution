import { envelope, fail, isStub, refusal } from "@/lib/contracts/bff";
import { readReadiness, readStubProfile, stubReadiness } from "@/lib/contracts/onboarding";
import { sessionToken } from "@/lib/contracts/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/bff/onboarding/readiness. tenant-api `readiness` (tenant_activation_readiness) for the
 * token's tenant, reduced to gate_key, status, mandatory, classification and activatable. The page
 * renders gate keys only through its label map (unknown keys render nothing).
 */
export async function GET() {
  if (!sessionToken()) return fail("no_session", 401);
  if (isStub()) return envelope({ ok: true, code: "ok", message: "stub", details: stubReadiness(readStubProfile()) }, 200, true);
  try {
    return envelope({ ok: true, code: "ok", message: "ok", details: await readReadiness(sessionToken()) });
  } catch (e) {
    return refusal(e);
  }
}
