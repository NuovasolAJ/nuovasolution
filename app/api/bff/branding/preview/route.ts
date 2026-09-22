import { envelope, fail, isStub, refusal } from "@/lib/contracts/bff";
import { readBranding, readStubProfile } from "@/lib/contracts/onboarding";
import { sessionToken } from "@/lib/contracts/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** GET /api/bff/branding/preview -> branding-assets `preview` reduced to logo, dark variant, contrast flag and text fallback. */
export async function GET() {
  if (!sessionToken()) return fail("no_session", 401);
  if (isStub()) return envelope({ ok: true, code: "ok", message: "stub", details: readStubProfile().branding }, 200, true);
  try {
    return envelope({ ok: true, code: "ok", message: "ok", details: await readBranding(sessionToken()) });
  } catch (e) {
    return refusal(e);
  }
}
