import { cookies } from "next/headers";
import { clientKey, envelope, fail, isStub, rateLimited, refusal, sameOrigin } from "@/lib/contracts/bff";
import { crmCatalogStub } from "@/lib/contracts/stubs";
import { getCrmCatalog, NOTICE_ACK_COOKIE, SESSION_COOKIE, sessionToken, STUB_CRM_COOKIE, stubCrmSelection } from "@/lib/contracts/server";
import { CONNECT_NOTICE_VERSION } from "@/lib/content/connect-notice";
import { tenantApi } from "@/lib/contracts/supabase";

export const runtime = "nodejs";

/**
 * POST /api/bff/crm/select { provider, intent: "select" | "interest" }
 *
 * "select"   only for providers the catalog marks selectable (built-in CRM, Google Sheets).
 * "interest" only for providers the catalog marks coming_soon: records that the agency
 *            uses that CRM. The backend keeps the built-in CRM of record and syncs nothing
 *            (CRM contract §1, §4). Unavailable providers are refused here.
 *
 * Sandbox: tenant-api crm.select with the user's own token (v2 §2); the edge function derives
 * the tenant and the backend checks the manage-users right itself. The browser never sends a tenant, a role or a subject.
 */
export async function POST(req: Request) {
  if (!sameOrigin(req)) return fail("forbidden", 403);
  if (rateLimited(`crm:${clientKey(req)}`, 20)) return fail("rate_limited", 429);
  if (!cookies().get(SESSION_COOKIE)?.value) return fail("no_session", 401);

  let body: { provider?: string; intent?: string };
  try {
    body = await req.json();
  } catch {
    return fail("invalid_input", 400);
  }
  const provider = String(body.provider ?? "");
  const intent = body.intent === "interest" ? "interest" : "select";

  try {
    const catalog = isStub() ? crmCatalogStub : (await getCrmCatalog()).data;
    const entry = catalog.find((c) => c.provider === provider);
    if (!entry) return fail("invalid_provider", 400);
    if (intent === "select" && !entry.selectable) return fail("not_selectable", 409);
    if (intent === "interest" && entry.availability !== "coming_soon") return fail("not_selectable", 409);
    // Google Sheets receives lead data: never without the pre-connection notice acknowledged first.
    if (intent === "select" && provider === "google_sheets" && cookies().get(NOTICE_ACK_COOKIE)?.value !== `google_sheets:${CONNECT_NOTICE_VERSION}`) return fail("notice_required", 428);

    if (isStub()) {
      const cur = stubCrmSelection();
      // Mirrors the backend: the Sheets copy is an add-on and choosing the built-in CRM does not switch it off.
      const selected = intent === "select" ? (cur.selected === "google_sheets" ? "google_sheets" : provider) : cur.selected ?? (cur.explicitly_chosen ? "nuovasolution" : "");
      const interest = intent === "interest" ? provider : cur.interest ?? "";
      cookies().set(STUB_CRM_COOKIE, `${selected}|${interest}`, { httpOnly: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 8 });
      return envelope({ ok: true, code: "ok", message: "stub", details: { selection: stubCrmSelection() } }, 200, true);
    }

    const result = await tenantApi<Record<string, unknown>>(sessionToken(), "crm.select", { provider });
    // v2 §2: {ok, state, crm_mode, crm_of_record, …}. Only scalar fields on this allow-list are passed
    // on; the page then re-reads crm.current before it says anything was stored.
    const safe: Record<string, string | boolean> = {};
    for (const k of ["ok", "state", "crm_mode", "crm_of_record"]) {
      const v = result?.[k];
      if (typeof v === "string" || typeof v === "boolean") safe[k] = v;
    }
    return envelope({ ok: true, code: "ok", message: "ok", details: { result: safe } });
  } catch (e) {
    return refusal(e);
  }
}
