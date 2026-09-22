import { cookies } from "next/headers";
import { clientKey, envelope, fail, isStub, rateLimited, readJson, refusal, sameOrigin } from "@/lib/contracts/bff";
import { readProfile, readStubProfile, saveStubProfile } from "@/lib/contracts/onboarding";
import { SESSION_COOKIE, sessionToken } from "@/lib/contracts/server";
import { brandingApi } from "@/lib/contracts/supabase";

export const runtime = "nodejs";

/**
 * POST /api/bff/branding/commit { kind, object_path }. branding-assets `commit` (v2 §3) reads the
 * STORED bytes: real type from the magic bytes, true size, measured dimensions. A mismatch rejects
 * and deletes the upload; a foreign or un-issued upload is refused (CROSS_TENANT_ASSET). The answer
 * is the profile read back, never the request echoed.
 */
export async function POST(req: Request) {
  if (!sameOrigin(req)) return fail("forbidden", 403);
  if (rateLimited(`brand-commit:${clientKey(req)}`, 20)) return fail("rate_limited", 429);
  if (!cookies().get(SESSION_COOKIE)?.value) return fail("no_session", 401);
  const b = await readJson<{ kind?: string; object_path?: string }>(req);
  if (!b || (b.kind !== "logo" && b.kind !== "logo_dark")) return fail("invalid_asset_kind", 400);
  if (typeof b.object_path !== "string" || b.object_path.length > 200) return fail("upload_not_found", 422);

  if (isStub()) {
    const p = readStubProfile();
    // The stub stores no file. It shows a labelled demonstration logo so the preview states can be reviewed.
    if (b.kind === "logo") p.branding = { ...p.branding, logo: "/stub/demo-agency-logo.svg", logo_present: true };
    else p.branding = { ...p.branding, logo_dark: "/stub/demo-agency-logo-dark.svg" };
    return envelope({ ok: true, code: "ok", message: "stub", details: { profile: saveStubProfile(p) } }, 200, true);
  }
  try {
    const token = sessionToken();
    await brandingApi(token, "commit", { kind: b.kind, object_path: b.object_path });
    return envelope({ ok: true, code: "ok", message: "ok", details: { profile: await readProfile(token) } });
  } catch (e) {
    return refusal(e);
  }
}
