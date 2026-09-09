import { cookies } from "next/headers";
import { clientKey, envelope, fail, isStub, proxy, rateLimited } from "@/lib/contracts/bff";
import { SESSION_COOKIE, STUB_CASE_COOKIE } from "@/lib/contracts/server";
import type { SignupRequest } from "@/lib/contracts/types";

export const runtime = "nodejs";

/**
 * POST /api/bff/signup. Wraps backend POST /signup (public + captcha + rate limit).
 * Stub mode: validates the shape, sets a stub session cookie, returns next:"onboarding".
 * The browser never receives a service key. The trial is created by the backend, never here.
 */
export async function POST(req: Request) {
  if (rateLimited(`signup:${clientKey(req)}`, 5)) return fail("rate_limited", 429);

  let body: Partial<SignupRequest>;
  try {
    body = (await req.json()) as Partial<SignupRequest>;
  } catch {
    return fail("invalid_input", 400);
  }
  const { name, email, password, language, agency_name } = body;
  if (!name || !email || !password || !agency_name || (language !== "en" && language !== "es")) return fail("invalid_input", 400);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return fail("invalid_input", 400);
  if (password.length < 8) return fail("invalid_input", 400);

  if (isStub()) {
    const jar = cookies();
    jar.set(SESSION_COOKIE, "stub", { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 60 * 60 * 8 });
    jar.set(STUB_CASE_COOKIE, "1", { httpOnly: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 8 });
    return envelope({ ok: true, code: "ok", message: "stub", details: { next: "onboarding", session: true } }, 201, true);
  }

  const captcha = req.headers.get("x-captcha-token") ?? "";
  const { status, json } = await proxy("/signup", { method: "POST", body: JSON.stringify({ name, email, password, language, agency_name, captcha }) });
  if (status === 409) return fail("email_exists", 409);
  if (status === 400) return fail((json as { code?: string })?.code === "captcha_failed" ? "captcha_failed" : "invalid_input", 400);
  if (status === 429) return fail("rate_limited", 429);
  if (status >= 500 || status === 0) return fail("server_error", 502);
  const data = json as { session?: { access_token?: string }; next?: string };
  if (data?.session?.access_token) {
    cookies().set(SESSION_COOKIE, data.session.access_token, { httpOnly: true, sameSite: "lax", secure: true, path: "/", maxAge: 60 * 60 });
  }
  return envelope({ ok: true, code: "ok", message: "created", details: { next: "onboarding", session: Boolean(data?.session) } }, 201);
}
