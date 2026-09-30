import { clientKey, envelope, fail, rateLimited } from "@/lib/contracts/bff";
import { isMessageId, qaConfig, qaResult, qaSession } from "@/lib/contracts/qa";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/qa/result?message_id=web_…
 * The conversation is always this visitor's own (session cookie), so one browser
 * can never read another visitor's answer. Signed with a fresh nonce per call.
 * Returns { status } in answered | pending | handoff | failed | unknown | cannot_confirm.
 */
export async function GET(req: Request) {
  if (rateLimited(`qa-result:${clientKey(req)}`, 120)) return fail("rate_limited", 429);
  const message_id = new URL(req.url).searchParams.get("message_id");
  if (!isMessageId(message_id)) return fail("invalid_input", 400);
  const session_id = qaSession(false);
  if (!session_id) return fail("no_session", 401);
  const cfg = qaConfig();
  if (!cfg) return envelope({ ok: true, code: "ok", message: "not_configured", details: { status: "cannot_confirm" } });
  const outcome = await qaResult(cfg, session_id, message_id);
  return envelope({ ok: true, code: "ok", message: outcome.status, details: outcome });
}
