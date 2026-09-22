import { cookies } from "next/headers";
import { clientKey, envelope, fail, isStub, rateLimited, readJson, refusal, sameOrigin } from "@/lib/contracts/bff";
import { SESSION_COOKIE, sessionToken, STUB_REGISTERED_COOKIE } from "@/lib/contracts/server";
import { tenantApi } from "@/lib/contracts/supabase";

export const runtime = "nodejs";

const LANGS = ["es", "en", "de", "it"];
const TIMEZONES = ["Europe/Madrid", "Atlantic/Canary"];

/**
 * POST /api/bff/register { agency_name, language, timezone }
 * tenant-api `register` (v2 §2) with the confirmed user's own token: agency, first membership and
 * the 14-day trial in one backend transaction; a repeat answers already_registered for the same
 * agency. Only the outcome and the trial status leave this route, never the agency id.
 */
export async function POST(req: Request) {
  if (!sameOrigin(req)) return fail("forbidden", 403);
  if (rateLimited(`register:${clientKey(req)}`, 10)) return fail("rate_limited", 429);
  if (!cookies().get(SESSION_COOKIE)?.value) return fail("no_session", 401);
  const b = await readJson<{ agency_name?: string; language?: string; timezone?: string }>(req);
  const agency_name = String(b?.agency_name ?? "").trim();
  if (!agency_name || agency_name.length > 120) return envelope({ ok: false, code: "invalid_agency_name", message: "invalid_agency_name", details: { field: "agency_name" } }, 400);
  const language = LANGS.includes(String(b?.language)) ? String(b?.language) : "es";
  const timezone = TIMEZONES.includes(String(b?.timezone)) ? String(b?.timezone) : "Europe/Madrid";

  if (isStub()) {
    cookies().set(STUB_REGISTERED_COOKIE, "1", { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 60 * 60 * 8 });
    return envelope({ ok: true, code: "ok", message: "stub", details: { outcome: "registered", trial: { status: "active" } } }, 200, true);
  }
  try {
    const r = await tenantApi(sessionToken(), "register", { agency_name, language, timezone });
    const outcome = r.outcome === "registered" || r.outcome === "already_registered" ? r.outcome : null;
    if (!outcome) return fail("server_error", 502);
    const trial = (r.trial ?? {}) as { status?: unknown; expires_at?: unknown };
    return envelope({ ok: true, code: "ok", message: outcome, details: { outcome, trial: { status: typeof trial.status === "string" ? trial.status : null, expires_at: typeof trial.expires_at === "string" ? trial.expires_at : null } } });
  } catch (e) {
    return refusal(e);
  }
}
