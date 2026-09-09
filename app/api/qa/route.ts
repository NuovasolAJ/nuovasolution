import { createHash, createHmac, randomBytes } from "node:crypto";
import { clientKey, envelope, fail, rateLimited } from "@/lib/contracts/bff";

export const runtime = "nodejs";

/**
 * POST /api/qa { question, locale }
 *
 * browser → this route (rate limit, validate)
 *         → tenant and target resolved from server config only
 *         → signs ts|nonce|body_sha256 with the server-held tenant HMAC
 *         → Hosting Website_QA_Intake_v1
 *
 * body_sha256 = sha256 lowercase hex over the exact UTF-8 bytes of the body sent.
 * The HMAC secret and the intake URL never reach the bundle. Any failure at the
 * intake (401 by contract) becomes an honest "cannot confirm" for the visitor.
 *
 * Open item: the header names and the intake's response shape below are this
 * file's assumption and must be confirmed against Website_QA_Intake_v1.
 */
export async function POST(req: Request) {
  if (rateLimited(`qa:${clientKey(req)}`, 10)) return fail("rate_limited", 429);

  let body: { question?: string; locale?: string };
  try {
    body = await req.json();
  } catch {
    return fail("invalid_input", 400);
  }
  const question = (body.question ?? "").trim();
  const locale = body.locale === "es" ? "es" : "en";
  if (question.length < 3) return fail("invalid_input", 400);
  if (question.length > 500) return fail("too_long", 422);

  const intake = process.env.QA_INTAKE_URL;
  const tenant = process.env.QA_TENANT_ID;
  const secret = process.env.QA_TENANT_HMAC_SECRET;
  if (!intake || !tenant || !secret) {
    // Honest state: the surface is present, the target is not configured.
    return envelope({ ok: false, code: "not_configured", message: "not_configured" }, 200);
  }

  const ts = String(Math.floor(Date.now() / 1000));
  const nonce = randomBytes(16).toString("hex");
  const payload = JSON.stringify({ tenant_id: tenant, question, locale, ts, nonce });
  const bytes = Buffer.from(payload, "utf8");
  const bodySha = createHash("sha256").update(bytes).digest("hex");
  const signature = createHmac("sha256", secret).update(`${ts}|${nonce}|${bodySha}`).digest("hex");

  let upstream: Response;
  try {
    upstream = await fetch(intake, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "X-Nuova-Tenant": tenant,
        "X-Nuova-Timestamp": ts,
        "X-Nuova-Nonce": nonce,
        "X-Nuova-Body-SHA256": bodySha,
        "X-Nuova-Signature": signature,
      },
      body: bytes,
      cache: "no-store",
      signal: AbortSignal.timeout(12_000),
    });
  } catch {
    return envelope({ ok: false, code: "cannot_confirm", message: "cannot_confirm" }, 200);
  }

  if (!upstream.ok) {
    // 401 by contract for every failure. Never surfaced as a technical error.
    return envelope({ ok: false, code: "cannot_confirm", message: "cannot_confirm" }, 200);
  }
  const data = (await upstream.json().catch(() => null)) as { answer?: string; can_confirm?: boolean } | null;
  if (!data?.answer) return envelope({ ok: false, code: "cannot_confirm", message: "cannot_confirm" }, 200);
  return envelope({ ok: true, code: "ok", message: "ok", details: { answer: data.answer, can_confirm: data.can_confirm !== false } });
}
