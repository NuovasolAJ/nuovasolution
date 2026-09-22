import { cookies } from "next/headers";
import { clientKey, envelope, fail, isStub, rateLimited, readJson, refusal, sameOrigin } from "@/lib/contracts/bff";
import { readProfile, readStubProfile, saveStubProfile } from "@/lib/contracts/onboarding";
import { SESSION_COOKIE, sessionToken } from "@/lib/contracts/server";
import { brandingApi } from "@/lib/contracts/supabase";

export const runtime = "nodejs";

/** POST /api/bff/branding/contrast { needs_light_background } -> branding-assets `contrast` (v2 §3). */
export async function POST(req: Request) {
  if (!sameOrigin(req)) return fail("forbidden", 403);
  if (rateLimited(`brand-contrast:${clientKey(req)}`, 20)) return fail("rate_limited", 429);
  if (!cookies().get(SESSION_COOKIE)?.value) return fail("no_session", 401);
  const b = await readJson<{ needs_light_background?: unknown }>(req);
  if (!b || typeof b.needs_light_background !== "boolean") return fail("invalid_input", 400);

  if (isStub()) {
    const p = readStubProfile();
    p.branding = { ...p.branding, needs_light_background: b.needs_light_background };
    return envelope({ ok: true, code: "ok", message: "stub", details: { profile: saveStubProfile(p) } }, 200, true);
  }
  try {
    const token = sessionToken();
    await brandingApi(token, "contrast", { needs_light_background: b.needs_light_background });
    return envelope({ ok: true, code: "ok", message: "ok", details: { profile: await readProfile(token) } });
  } catch (e) {
    return refusal(e);
  }
}
