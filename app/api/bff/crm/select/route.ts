import { cookies } from "next/headers";
import { clientKey, envelope, fail, isStub, rateLimited, refusal, sameOrigin } from "@/lib/contracts/bff";
import { crmCatalogStub } from "@/lib/contracts/stubs";
import { getCrmCatalog, SESSION_COOKIE, sessionToken, STUB_CRM_COOKIE, stubCrmSelection } from "@/lib/contracts/server";
import { resolveActor, serviceRpc } from "@/lib/contracts/supabase";

export const runtime = "nodejs";

/**
 * POST /api/bff/crm/select { provider, intent: "select" | "interest" }
 *
 * "select"   only for providers the catalog marks selectable (built-in CRM, Google Sheets).
 * "interest" only for providers the catalog marks coming_soon: records that the agency
 *            uses that CRM. The backend keeps the built-in CRM of record and syncs nothing
 *            (CRM contract §1, §4). Unavailable providers are refused here.
 *
 * Sandbox: the identity is verified on the server and passed as p_actor_subject to
 * onboarding_crm_select; the backend derives the tenant and checks the manage-users
 * right itself. The browser never sends a tenant, a role or a subject.
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

    if (isStub()) {
      const cur = stubCrmSelection();
      const selected = intent === "select" ? (provider === "google_sheets" ? "google_sheets" : "") : cur.selected ?? "";
      const interest = intent === "interest" ? provider : cur.interest ?? "";
      cookies().set(STUB_CRM_COOKIE, `${selected}|${interest}`, { httpOnly: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 8 });
      return envelope({ ok: true, code: "ok", message: "stub", details: { selection: stubCrmSelection() } }, 200, true);
    }

    const actor = await resolveActor(sessionToken());
    const result = await serviceRpc<Record<string, unknown>>("onboarding_crm_select", { p_actor_subject: actor.subject, p_provider: provider });
    // The response shape of onboarding_crm_select is not in a delivered contract. Only a
    // small allow-list of scalar fields is passed on, and the UI re-reads the wizard state
    // before it says anything was stored.
    const safe: Record<string, string | boolean> = {};
    for (const k of ["availability", "status", "outcome", "crm_mode", "waitlisted", "enqueues_to_sync"]) {
      const v = result?.[k];
      if (typeof v === "string" || typeof v === "boolean") safe[k] = v;
    }
    return envelope({ ok: true, code: "ok", message: "ok", details: { result: safe } });
  } catch (e) {
    return refusal(e);
  }
}
