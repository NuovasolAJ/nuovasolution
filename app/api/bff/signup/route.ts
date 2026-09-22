import { cookies } from "next/headers";
import { clientKey, envelope, fail, isStub, rateLimited, readJson, refusal, sameOrigin, stubRefused } from "@/lib/contracts/bff";
import { environmentProblem } from "@/lib/contracts/mode";
import { SESSION_COOKIE, STUB_CASE_COOKIE, STUB_REGISTERED_COOKIE } from "@/lib/contracts/server";
import { signUp } from "@/lib/contracts/supabase";
import type { SignupRequest } from "@/lib/contracts/types";

export const runtime = "nodejs";

/**
 * POST /api/bff/signup { name, email, password, language, agency_name }
 * WEBSITE_HANDOFF_v2 §2 registration path, step 1: GoTrue sign-up with the publishable key.
 * E-mail confirmation is required, so the answer is always "check your inbox" (next: "confirm"),
 * whether or not the address already had an account. The agency itself is created later by
 * tenant-api `register`, after the confirmed user signs in: never here, never partially.
 */
export async function POST(req: Request) {
  if (!sameOrigin(req)) return fail("forbidden", 403);
  if (rateLimited(`signup:${clientKey(req)}`, 5)) return fail("rate_limited", 429);
  if (stubRefused()) return fail("not_available", 404);

  const body = await readJson<Partial<SignupRequest>>(req);
  const name = String(body?.name ?? "").trim().slice(0, 120);
  const email = String(body?.email ?? "").trim().toLowerCase();
  const password = String(body?.password ?? "");
  const agency_name = String(body?.agency_name ?? "").trim().slice(0, 120);
  const language = body?.language;
  if (!name || !email || !agency_name || (language !== "en" && language !== "es")) return fail("invalid_input", 400);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) return fail("invalid_input", 400);
  if (password.length < 10 || password.length > 128) return fail("weak_password", 400);

  if (isStub()) {
    // Stub: the confirmation click is simulated; the stub registration step follows.
    const jar = cookies();
    const opts = { httpOnly: true, sameSite: "lax" as const, secure: process.env.NODE_ENV === "production", path: "/", maxAge: 60 * 60 * 8 };
    jar.set(SESSION_COOKIE, "stub", opts);
    jar.set(STUB_CASE_COOKIE, "1", opts);
    jar.set(STUB_REGISTERED_COOKIE, "0", opts);
    return envelope({ ok: true, code: "ok", message: "stub", details: { next: "onboarding", session: true } }, 201, true);
  }
  if (environmentProblem()) return fail("environment_misconfigured", 503);
  try {
    await signUp(email, password, { full_name: name, agency_name, language }, null);
    return envelope({ ok: true, code: "ok", message: "confirm", details: { next: "confirm", session: false } }, 201);
  } catch (e) {
    return refusal(e);
  }
}
