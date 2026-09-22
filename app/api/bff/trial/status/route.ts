import { cookies } from "next/headers";
import { envelope, fail, isStub, refusal } from "@/lib/contracts/bff";
import { readTrial, stubTrial } from "@/lib/contracts/onboarding";
import { SESSION_COOKIE, sessionToken } from "@/lib/contracts/server";

export const runtime = "nodejs";

/**
 * GET /api/bff/trial/status. tenant-api `trial.status` for the token's tenant: status,
 * remaining_days and expires_at only. Payment is never inferred from this.
 */
export async function GET() {
  if (!cookies().get(SESSION_COOKIE)?.value) return fail("no_session", 401);
  if (isStub()) return envelope({ ok: true, code: "ok", message: "stub", details: stubTrial }, 200, true);
  try {
    return envelope({ ok: true, code: "ok", message: "ok", details: await readTrial(sessionToken()) });
  } catch (e) {
    return refusal(e);
  }
}
