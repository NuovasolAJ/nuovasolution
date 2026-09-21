import { cookies } from "next/headers";
import { awaitingContract, envelope, fail, isStub } from "@/lib/contracts/bff";
import { trialStub } from "@/lib/contracts/stubs";
import { SESSION_COOKIE } from "@/lib/contracts/server";

export const runtime = "nodejs";

/**
 * GET /api/bff/trial/status. The server is the single source of truth for days_left and trial_end.
 * Sandbox: the trial read is not in a delivered contract yet; the onboarding page shows
 * trial_end from the wizard projection instead.
 */
export async function GET() {
  if (!cookies().get(SESSION_COOKIE)?.value) return fail("no_session", 401);
  if (isStub()) return envelope({ ok: true, code: "ok", message: "stub", details: trialStub }, 200, true);
  return awaitingContract("trial_status");
}
