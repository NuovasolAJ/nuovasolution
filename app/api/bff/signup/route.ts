import { cookies } from "next/headers";
import { awaitingContract, clientKey, envelope, fail, isStub, rateLimited, sameOrigin, stubRefused } from "@/lib/contracts/bff";
import { SESSION_COOKIE, STUB_CASE_COOKIE } from "@/lib/contracts/server";
import type { SignupRequest } from "@/lib/contracts/types";

export const runtime = "nodejs";

/**
 * POST /api/bff/signup. Wraps backend POST /signup (public + captcha + rate limit).
 * Stub mode: validates the shape, sets a stub session cookie, returns next:"onboarding".
 * The browser never receives a service key. The trial is created by the backend, never here.
 */
export async function POST(req: Request) {
  if (!sameOrigin(req)) return fail("forbidden", 403);
  if (rateLimited(`signup:${clientKey(req)}`, 5)) return fail("rate_limited", 429);
  if (stubRefused()) return fail("not_available", 404);

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

  // Sandbox and live: tenant provisioning runs through the backend's signup and
  // owner-bootstrap path, which is delivered with governance/WEBSITE_HANDOFF_v1.md.
  // Until then this answers awaiting_contract. It never creates a partial account.
  return awaitingContract("signup_provisioning");
}
