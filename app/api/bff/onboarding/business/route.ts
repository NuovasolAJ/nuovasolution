import { cookies } from "next/headers";
import { clientKey, envelope, fail, isStub, rateLimited, readJson, refusal, sameOrigin } from "@/lib/contracts/bff";
import { parseBusiness, readProfile, readStubProfile, saveStubProfile, writeBusiness } from "@/lib/contracts/onboarding";
import { SESSION_COOKIE, sessionToken } from "@/lib/contracts/server";

export const runtime = "nodejs";

/**
 * POST /api/bff/onboarding/business { timezone, languages[], default_language, business_hours }
 * -> tenant-api onboarding.set `business` and `calendar_policy` (hours kept in step), each as the
 * complete section, with the user's own token (v2 §2; the edge function checks manage_users and
 * derives the tenant). Answers with the profile read back, so the UI only shows what was stored.
 */
export async function POST(req: Request) {
  if (!sameOrigin(req)) return fail("forbidden", 403);
  if (rateLimited(`ob-business:${clientKey(req)}`, 20)) return fail("rate_limited", 429);
  if (!cookies().get(SESSION_COOKIE)?.value) return fail("no_session", 401);
  const body = await readJson(req);
  if (!body) return fail("invalid_input", 400);
  const v = parseBusiness(body);
  if ("invalid" in v) return envelope({ ok: false, code: "invalid_input", message: "invalid_input", details: { field: v.invalid } }, 400);

  if (isStub()) {
    const p = readStubProfile();
    p.business = { ...p.business, ...v };
    return envelope({ ok: true, code: "ok", message: "stub", details: { profile: saveStubProfile(p) } }, 200, true);
  }
  try {
    const token = sessionToken();
    await writeBusiness(token, v);
    return envelope({ ok: true, code: "ok", message: "ok", details: { profile: await readProfile(token) } });
  } catch (e) {
    return refusal(e);
  }
}
