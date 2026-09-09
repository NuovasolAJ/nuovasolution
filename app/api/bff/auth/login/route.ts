import { cookies } from "next/headers";
import { clientKey, envelope, fail, isStub, rateLimited } from "@/lib/contracts/bff";
import { SESSION_COOKIE, STUB_CASE_COOKIE } from "@/lib/contracts/server";

export const runtime = "nodejs";

/**
 * GET /api/bff/auth/login?stub=1&case=N&next=/en/onboarding
 * STUB MODE ONLY. Sets the stub session cookie and optionally a stub case, then
 * redirects. Exists so the headless review capture can hold a session. In any
 * other mode this returns 404 and sets nothing.
 */
export async function GET(req: Request) {
  if (!isStub()) return new Response(null, { status: 404 });
  const url = new URL(req.url);
  if (url.searchParams.get("stub") !== "1") return new Response(null, { status: 404 });
  const next = url.searchParams.get("next") ?? "/en/onboarding";
  const safeNext = next.startsWith("/") && !next.startsWith("//") ? next : "/en/onboarding";
  const caseParam = url.searchParams.get("case");
  const jar = cookies();
  jar.set(SESSION_COOKIE, "stub", { httpOnly: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 8 });
  if (caseParam && /^[1-6]$/.test(caseParam)) {
    jar.set(STUB_CASE_COOKIE, caseParam, { httpOnly: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 8 });
  }
  return Response.redirect(new URL(safeNext, url.origin), 303);
}

/**
 * POST /api/bff/auth/login. In staging mode this performs the GoTrue password
 * grant server-side (no SDK, no token in the browser) and stores the access
 * token in an httpOnly cookie. Stub mode sets a stub session.
 */
export async function POST(req: Request) {
  if (rateLimited(`login:${clientKey(req)}`, 8)) return fail("rate_limited", 429);
  let body: { email?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return fail("invalid_input", 400);
  }
  if (!body.email || !body.password) return fail("invalid_input", 400);

  const secure = process.env.NODE_ENV === "production";
  if (isStub()) {
    const jar = cookies();
    jar.set(SESSION_COOKIE, "stub", { httpOnly: true, sameSite: "lax", secure, path: "/", maxAge: 60 * 60 * 8 });
    if (!jar.get(STUB_CASE_COOKIE)) jar.set(STUB_CASE_COOKIE, "2", { httpOnly: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 8 });
    return envelope({ ok: true, code: "ok", message: "stub" }, 200, true);
  }

  const url = process.env.SUPABASE_URL;
  const anon = process.env.SUPABASE_ANON_KEY;
  if (!url || !anon) return fail("server_error", 503);

  const res = await fetch(`${url.replace(/\/$/, "")}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: { "Content-Type": "application/json", apikey: anon },
    body: JSON.stringify({ email: body.email, password: body.password }),
    cache: "no-store",
  });
  if (res.status === 400) {
    const j = (await res.json().catch(() => ({}))) as { error_code?: string; error?: string };
    const code = j.error_code === "email_not_confirmed" || j.error === "email_not_confirmed" ? "email_not_confirmed" : "invalid_grant";
    return fail(code, 400);
  }
  if (res.status === 429) return fail("rate_limited", 429);
  if (!res.ok) return fail("server_error", 502);
  const data = (await res.json()) as { access_token?: string; expires_in?: number; refresh_token?: string };
  if (!data.access_token) return fail("server_error", 502);
  cookies().set(SESSION_COOKIE, data.access_token, { httpOnly: true, sameSite: "lax", secure: true, path: "/", maxAge: data.expires_in ?? 3600 });
  if (data.refresh_token) {
    cookies().set("nuova_refresh", data.refresh_token, { httpOnly: true, sameSite: "lax", secure: true, path: "/api/bff/auth", maxAge: 60 * 60 * 24 * 7 });
  }
  return envelope({ ok: true, code: "ok", message: "signed_in" });
}
