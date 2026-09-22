import { cookies } from "next/headers";
import { clientKey, envelope, fail, isStub, rateLimited, readJson, refusal, sameOrigin } from "@/lib/contracts/bff";
import { integrationMode } from "@/lib/contracts/mode";
import { NOTICE_ACK_COOKIE, SESSION_COOKIE, sessionToken } from "@/lib/contracts/server";
import { tenantApi } from "@/lib/contracts/supabase";
import { CONNECT_NOTICE_VERSION } from "@/lib/content/connect-notice";

export const runtime = "nodejs";

const SOURCES = ["google_sheets"];

/**
 * POST /api/bff/consent/connect-notice { source, notice_version }
 *
 * Records that the agency read the pre-connection notice (CONNECT_NOTICE_DRAFT_v1 §A.4:
 * acknowledgement, not consent). The notice is a DRAFT and not legally reviewed, so this route
 * exists only on test surfaces: a live build refuses it. An acknowledgement of a draft is not a
 * legal clearance.
 *
 * Storage: there is no backend write contract yet (question Q-API-C7). Until there is one, the
 * record is a structured line in this server's log with tenant, user, role, source, notice version
 * and UTC time, and the response says exactly that (`recorded_in: "website_server_log"`).
 * A 10-minute httpOnly marker lets /api/bff/crm/select refuse a Sheets choice without it.
 */
export async function POST(req: Request) {
  if (integrationMode() === "live") return fail("not_available", 404);
  if (!sameOrigin(req)) return fail("forbidden", 403);
  if (rateLimited(`notice:${clientKey(req)}`, 20)) return fail("rate_limited", 429);
  if (!cookies().get(SESSION_COOKIE)?.value) return fail("no_session", 401);
  const b = await readJson<{ source?: string; notice_version?: string }>(req);
  if (!b || !SOURCES.includes(String(b.source)) || b.notice_version !== CONNECT_NOTICE_VERSION) return fail("invalid_input", 400);
  const at = new Date().toISOString();
  const mark = () => cookies().set(NOTICE_ACK_COOKIE, `${b.source}:${CONNECT_NOTICE_VERSION}`, { httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV === "production", path: "/api/bff/crm", maxAge: 600 });

  if (isStub()) {
    mark();
    return envelope({ ok: true, code: "ok", message: "stub", details: { recorded_in: "nowhere_stub", at } }, 200, true);
  }
  try {
    const s = await tenantApi(sessionToken(), "session");
    if (s.authorized !== true) return fail("unresolved_membership", 403);
    if (s.manage_users !== true) return fail("forbidden", 403);
    console.info(JSON.stringify({ event: "connect_notice_ack", notice_version: CONNECT_NOTICE_VERSION, source: b.source, tenant: s.client_id, user: s.tenant_user_id, role: s.role, at }));
    mark();
    return envelope({ ok: true, code: "ok", message: "ok", details: { recorded_in: "website_server_log", at } });
  } catch (e) {
    return refusal(e);
  }
}
