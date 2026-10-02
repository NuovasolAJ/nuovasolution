import { clientKey, envelope, fail, isStub, rateLimited, readJson, refusal, sameOrigin } from "@/lib/contracts/bff";
import { sessionToken } from "@/lib/contracts/server";
import { lookupSocialTarget } from "@/lib/contracts/social";
import { tenantApi, type Json } from "@/lib/contracts/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/bff/social/action
 * Write side of the four social screens (SOCIAL_ACTIONS_CONTRACT_v1 + SOCIAL_UI_ACTION_WIRING_PATCH_v1 §3).
 * The browser sends an action name and, where needed, the key of a post or an inbox entry as the
 * read state rendered it ("p0", "s2"); this route turns the key back into the provider's export id
 * or target by re-reading the state server side, so no provider id of a third party ever reaches
 * the browser. No token, no ops secret and no client_id passes through the browser either: the
 * session decides the tenant, tenant-api op `social.action` resolves it and talks to social_meta_ig.
 * Every refusal from the database is passed on as a reason, never rewritten into a technical error.
 *
 * Stub build: there is nothing to act on; the answer is a labelled refusal, never a faked success.
 */
const ACTIONS = ["begin_connect", "account_check", "publish", "verify_publish", "poll_comments", "poll_dms", "reply_public", "reply_private", "dm_reply", "disconnect"] as const;
type Action = (typeof ACTIONS)[number];
const NEEDS_EXPORT: Action[] = ["publish", "verify_publish"];
const NEEDS_TARGET: Action[] = ["reply_public", "reply_private", "dm_reply"];

/** Only the fields the screens show pass back (patch §2 step 5). Nothing else of the provider answer leaves the server. */
const SHOWN = ["ok", "reason", "authorize_url", "media_id", "permalink", "provider_ref", "token_deleted", "outcome", "account_name", "account_type", "quota"] as const;

export async function POST(req: Request) {
  if (!sameOrigin(req)) return fail("forbidden", 403);
  const token = sessionToken();
  if (!token) return fail("no_session", 401);

  const body = await readJson<{ action?: string; post?: string; signal?: string; message?: string }>(req);
  const action = body?.action as Action | undefined;
  if (!action || !ACTIONS.includes(action)) return fail("invalid_input", 400);
  if (NEEDS_EXPORT.includes(action) && !/^p\d{1,3}$/.test(body?.post ?? "")) return fail("invalid_input", 400);
  if (NEEDS_TARGET.includes(action) && !(/^s\d{1,3}$/.test(body?.signal ?? "") && body?.message?.trim())) return fail("invalid_input", 400);
  if (body?.message && body.message.length > 1000) return fail("invalid_input", 400);

  // tighter than the read route, and tightest for the one action that opens a provider window
  const budget = action === "begin_connect" ? 5 : 20;
  if (rateLimited(`social:action:${action}:${clientKey(req)}`, budget)) return fail("rate_limited", 429);

  if (isStub()) return envelope({ ok: false, code: "not_available_in_stub", message: "not_available_in_stub" }, 200, true);

  try {
    const args: Json = { action };
    if (NEEDS_EXPORT.includes(action)) {
      const exportId = await lookupSocialTarget("post", body!.post!);
      if (!exportId) return fail("invalid_input", 400);
      args.export_id = exportId;
    }
    if (NEEDS_TARGET.includes(action)) {
      const target = await lookupSocialTarget("signal", body!.signal!);
      if (!target) return fail("invalid_input", 400);
      args.target = target;
      args.message = body!.message!.trim();
    }
    const r = await tenantApi<Json>(token, "social.action", args);
    const details: Json = {};
    for (const k of SHOWN) if (k in r) details[k] = r[k];
    // Only an https link to the provider is ever opened by the browser.
    if (typeof details.authorize_url === "string" && !/^https:\/\//.test(details.authorize_url)) delete details.authorize_url;
    // A refusal is a result, not an error: 200 with ok:false, so the screen can show the reason.
    const ok = r.ok === true;
    const reason = ok ? "ok" : String(r.reason ?? "refused");
    return envelope({ ok, code: reason, message: reason, details });
  } catch (e) {
    return refusal(e);
  }
}
