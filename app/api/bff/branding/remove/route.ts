import { cookies } from "next/headers";
import { clientKey, envelope, fail, isStub, rateLimited, readJson, refusal, sameOrigin } from "@/lib/contracts/bff";
import { readProfile, readStubProfile, saveStubProfile } from "@/lib/contracts/onboarding";
import { SESSION_COOKIE, sessionToken } from "@/lib/contracts/server";
import { brandingApi } from "@/lib/contracts/supabase";

export const runtime = "nodejs";

/** POST /api/bff/branding/remove { kind }. branding-assets `remove`: de-references and deletes the stored objects server-side. */
export async function POST(req: Request) {
  if (!sameOrigin(req)) return fail("forbidden", 403);
  if (rateLimited(`brand-remove:${clientKey(req)}`, 20)) return fail("rate_limited", 429);
  if (!cookies().get(SESSION_COOKIE)?.value) return fail("no_session", 401);
  const b = await readJson<{ kind?: string }>(req);
  if (!b || (b.kind !== "logo" && b.kind !== "logo_dark")) return fail("invalid_asset_kind", 400);

  if (isStub()) {
    const p = readStubProfile();
    if (b.kind === "logo") p.branding = { ...p.branding, logo: null, logo_present: false };
    else p.branding = { ...p.branding, logo_dark: null };
    return envelope({ ok: true, code: "ok", message: "stub", details: { profile: saveStubProfile(p) } }, 200, true);
  }
  try {
    const token = sessionToken();
    const r = await brandingApi(token, "remove", { kind: b.kind });
    return envelope({ ok: true, code: "ok", message: "ok", details: { profile: await readProfile(token), objects_deleted: typeof r.removed_objects === "number" ? r.removed_objects : 0 } });
  } catch (e) {
    return refusal(e);
  }
}
