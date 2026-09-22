import { cookies } from "next/headers";
import { clientKey, envelope, fail, isStub, rateLimited, readJson, refusal, sameOrigin } from "@/lib/contracts/bff";
import { supabaseUrl } from "@/lib/contracts/env";
import { SESSION_COOKIE, sessionToken } from "@/lib/contracts/server";
import { BackendRefusal, brandingApi } from "@/lib/contracts/supabase";

export const runtime = "nodejs";

const KINDS = ["logo", "logo_dark"];
const TYPES = ["image/png", "image/jpeg", "image/webp"];
const MAX = 5 * 1024 * 1024;

/**
 * POST /api/bff/branding/upload-init { kind, filename, content_type, size_bytes } -> { object_path, signed_upload_url }
 * branding-assets `init` (v2 §3) with the user's own token: manage_users, tenant-prefixed path, a
 * signed upload URL minted by the edge function. The browser then PUTs the bytes directly to it;
 * no file passes through this server. The URL is passed on only when it points at the configured
 * project's storage.
 */
export async function POST(req: Request) {
  if (!sameOrigin(req)) return fail("forbidden", 403);
  if (rateLimited(`brand-init:${clientKey(req)}`, 20)) return fail("rate_limited", 429);
  if (!cookies().get(SESSION_COOKIE)?.value) return fail("no_session", 401);
  const b = await readJson<{ kind?: string; filename?: string; content_type?: string; size_bytes?: number }>(req);
  if (!b || !KINDS.includes(String(b.kind))) return fail("invalid_asset_kind", 400);
  if (!TYPES.includes(String(b.content_type))) return fail("unsupported_file_type", 400);
  const size = Number(b.size_bytes);
  if (!Number.isInteger(size) || size <= 0) return fail("invalid_file_size", 400);
  if (size > MAX) return fail("file_too_large", 400);
  const filename = String(b.filename ?? "upload").replace(/[^\w.\- ]/g, "").slice(0, 120) || "upload";

  if (isStub()) {
    return envelope({ ok: true, code: "ok", message: "stub", details: { object_path: `stub/${b.kind}/stub.png`, signed_upload_url: null } }, 200, true);
  }
  try {
    const r = await brandingApi(sessionToken(), "init", { kind: b.kind, filename, content_type: b.content_type, size_bytes: size });
    const url = typeof r.signed_upload_url === "string" ? r.signed_upload_url : "";
    if (typeof r.object_path !== "string" || !url.startsWith(`${supabaseUrl()}/storage/v1/`)) throw new BackendRefusal("server_error", 502);
    return envelope({ ok: true, code: "ok", message: "ok", details: { object_path: r.object_path, signed_upload_url: url } });
  } catch (e) {
    return refusal(e);
  }
}
