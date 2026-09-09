import { cookies } from "next/headers";
import { envelope, fail, isStub, proxy } from "@/lib/contracts/bff";
import { SESSION_COOKIE } from "@/lib/contracts/server";

export const runtime = "nodejs";

/**
 * POST /api/bff/tenant/activate. The backend decides activation from its own
 * readiness (activatable). The browser only sends the request. In stub mode
 * this returns a labelled acknowledgement and changes nothing.
 *
 * Open item: the exact backend path for tenant_activate is not in export v2 §F.
 * "/tenant/activate" is this file's placeholder and must be confirmed.
 */
export async function POST() {
  const token = cookies().get(SESSION_COOKIE)?.value;
  if (!token) return fail("no_session", 401);
  if (isStub()) return envelope({ ok: true, code: "ok", message: "stub", details: { activated: false, note: "stub acknowledges; nothing activated" } }, 202, true);
  const { status, json } = await proxy("/tenant/activate", { method: "POST", bearer: token });
  if (status === 401) return fail("no_session", 401);
  if (status === 403) return fail("forbidden", 403);
  if (status === 409) return fail("conflict", 409);
  if (status >= 500 || !json) return fail("server_error", 502);
  return envelope({ ok: true, code: "ok", message: "ok", details: json });
}
