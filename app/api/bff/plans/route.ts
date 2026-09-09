import { envelope, fail, isStub, proxy } from "@/lib/contracts/bff";
import { plansStub } from "@/lib/contracts/stubs";

export const runtime = "nodejs";
// Never prerendered: in staging mode the plan list must reflect the backend at request time.
export const dynamic = "force-dynamic";

/** GET /api/bff/plans. { plans:[{ code, display_name, entitlements_summary }] }. No price exists anywhere. */
export async function GET() {
  if (isStub()) return envelope({ ok: true, code: "ok", message: "stub", details: { plans: plansStub } }, 200, true);
  const { status, json } = await proxy("/plans");
  if (status >= 500 || !json) return fail("server_error", 502);
  return envelope({ ok: true, code: "ok", message: "ok", details: json });
}
