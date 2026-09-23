import { clientKey, envelope, fail, isStub, rateLimited, readJson, refusal, sameOrigin, stubRefused } from "@/lib/contracts/bff";
import { environmentProblem } from "@/lib/contracts/mode";
import { resendConfirmation } from "@/lib/contracts/supabase";

export const runtime = "nodejs";

/**
 * POST /api/bff/auth/resend { email, language }
 * Sends the sign-up confirmation e-mail again. The answer is the same whether or not the address
 * has an unconfirmed account (no oracle). Tight local limit: three per minute per caller.
 */
export async function POST(req: Request) {
  if (!sameOrigin(req)) return fail("forbidden", 403);
  if (rateLimited(`resend:${clientKey(req)}`, 3)) return fail("rate_limited", 429);
  if (stubRefused()) return fail("not_available", 404);
  const body = await readJson<{ email?: string; language?: string }>(req, 4096);
  const email = String(body?.email ?? "").trim().toLowerCase();
  const language = body?.language === "en" ? "en" : "es";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) return fail("invalid_input", 400);
  if (isStub()) return envelope({ ok: true, code: "ok", message: "stub" }, 200, true);
  if (environmentProblem()) return fail("environment_misconfigured", 503);
  try {
    await resendConfirmation(email, `${new URL(req.url).origin}/${language}/login?confirmed=1`);
    return envelope({ ok: true, code: "ok", message: "sent" });
  } catch (e) {
    return refusal(e);
  }
}
