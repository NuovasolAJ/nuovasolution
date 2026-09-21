import { awaitingContract, envelope } from "@/lib/contracts/bff";
import { getPlans } from "@/lib/contracts/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** GET /api/bff/plans. { plans:[{ code, display_name, entitlements_summary }] }. No price exists anywhere. */
export async function GET() {
  const r = await getPlans();
  if (r.kind === "awaiting_contract") return awaitingContract("plans");
  return envelope({ ok: true, code: "ok", message: r.kind === "stub" ? "stub" : "ok", details: { plans: r.plans } }, 200, r.kind === "stub");
}
