import { envelope, fail, refusal } from "@/lib/contracts/bff";
import { getEntitlements, sessionToken } from "@/lib/contracts/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** GET /api/bff/entitlements. features + account_state only. Technical keys are never rendered to the agency. */
export async function GET() {
  if (!sessionToken()) return fail("no_session", 401);
  try {
    const { data, stub } = await getEntitlements();
    return envelope({ ok: true, code: "ok", message: stub ? "stub" : "ok", details: data }, 200, stub);
  } catch (e) {
    return refusal(e);
  }
}
