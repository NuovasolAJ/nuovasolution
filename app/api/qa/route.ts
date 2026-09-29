import { clientKey, envelope, fail, rateLimited, sameOrigin } from "@/lib/contracts/bff";
import { newMessageId, qaAccept, qaConfig, qaSession } from "@/lib/contracts/qa";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/qa { question, locale }
 *
 * browser → this route (same origin, rate limit, validate)
 *         → session_id from an httpOnly cookie, message_id minted here
 *         → signed POST to Website_QA_Intake_v1 (lib/contracts/qa.ts)
 * Returns { status, message_id } where status is answered | pending | handoff |
 * failed | cannot_confirm. On pending the widget polls GET /api/qa/result.
 * Not configured, or a target this build may not use: the honest "cannot confirm".
 */
export async function POST(req: Request) {
  if (!sameOrigin(req)) return fail("forbidden", 403);
  if (rateLimited(`qa:${clientKey(req)}`, 10)) return fail("rate_limited", 429);

  let body: { question?: string; locale?: string };
  try {
    body = await req.json();
  } catch {
    return fail("invalid_input", 400);
  }
  const question = String(body.question ?? "").trim();
  const locale = body.locale === "es" ? "es" : "en";
  if (question.length < 1) return fail("invalid_input", 400);
  if (question.length > 4000) return fail("too_long", 422);

  const cfg = qaConfig();
  if (!cfg) return envelope({ ok: true, code: "ok", message: "not_configured", details: { status: "cannot_confirm" } });

  // No contact details are taken or forwarded: a product question creates no lead and no handover
  // (WEBQA_BACKEND_READY_2026-09-29 §3). A visitor who wants a person uses the contact page.

  // page_url: https and this site only, otherwise dropped (ingress contract).
  const ref = req.headers.get("referer");
  let page_url: string | undefined;
  try {
    const u = ref ? new URL(ref) : null;
    if (u && u.protocol === "https:" && u.host === new URL(req.url).host) page_url = `${u.origin}${u.pathname}`;
  } catch {
    page_url = undefined;
  }

  const session_id = qaSession(true)!;
  const message_id = newMessageId();
  const outcome = await qaAccept(cfg, { question, locale, session_id, message_id, page_url });
  return envelope({ ok: true, code: "ok", message: outcome.status, details: { ...outcome, message_id } });
}
