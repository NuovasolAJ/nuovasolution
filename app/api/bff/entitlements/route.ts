import { cookies } from "next/headers";
import { envelope, fail, isStub, proxy } from "@/lib/contracts/bff";
import { entitlementsStub } from "@/lib/contracts/stubs";
import { SESSION_COOKIE } from "@/lib/contracts/server";

export const runtime = "nodejs";

/** GET /api/bff/entitlements. Technical keys are never rendered to the agency. */
export async function GET() {
  const token = cookies().get(SESSION_COOKIE)?.value;
  if (!token) return fail("no_session", 401);
  if (isStub()) return envelope({ ok: true, code: "ok", message: "stub", details: entitlementsStub }, 200, true);
  const { status, json } = await proxy("/entitlements", { bearer: token });
  if (status === 401) return fail("no_session", 401);
  if (!json) return fail("server_error", 502);
  return envelope({ ok: true, code: "ok", message: "ok", details: json });
}
