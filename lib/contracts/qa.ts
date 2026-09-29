import "server-only";
import { createHash, createHmac, randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import { qaTargetProblem } from "./mode";

/**
 * Website Q&A transport, exactly per
 *   governance/WEBSITE_QA_INGRESS_CONTRACT_v1.md   (POST, 202 accepted / 401)
 *   governance/WEBSITE_QA_RESPONSE_CONTRACT_v1.md  (signed GET /result, four states, 404 unknown)
 * Headers: X-Nuova-Tenant, X-Nuova-Timestamp, X-Nuova-Nonce, X-Nuova-Signature.
 * Signature: hex(HMAC-SHA256(secret, `${ts}|${nonce}|${sha256hex(bytes)}`)) where bytes are
 * exactly the bytes sent: the JSON body for POST, the canonical query string for GET.
 * A fresh nonce per call. The secret, tenant and intake URL never leave the server.
 */

export const QA_SESSION_COOKIE = "nuova_qa_session";
const SESSION_RE = /^[A-Za-z0-9._:-]{8,128}$/;
const MESSAGE_RE = /^web_[a-f0-9]{24}$/;

export interface QaConfig {
  intake: string;
  tenant: string;
  secret: string;
}

/** Null when the Q&A target is not configured or not acceptable for this build. */
export function qaConfig(): QaConfig | null {
  const intake = process.env.QA_INTAKE_URL;
  const tenant = process.env.QA_TENANT_ID;
  const secret = process.env.QA_TENANT_HMAC_SECRET;
  if (!intake || !tenant || !secret) return null;
  if (qaTargetProblem(intake)) return null;
  return { intake: intake.replace(/\/$/, ""), tenant, secret };
}

/** Stable per-visitor conversation identity, kept in an httpOnly cookie. Never taken from the browser body. */
export function qaSession(create: boolean): string | null {
  const jar = cookies();
  const cur = jar.get(QA_SESSION_COOKIE)?.value;
  if (cur && SESSION_RE.test(cur)) return cur;
  if (!create) return null;
  const id = `s_${randomBytes(16).toString("hex")}`;
  jar.set(QA_SESSION_COOKIE, id, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 60 * 60 * 24 });
  return id;
}

export function newMessageId(): string {
  return `web_${randomBytes(12).toString("hex")}`;
}

export function isMessageId(v: string | null): v is string {
  return Boolean(v && MESSAGE_RE.test(v));
}

function signedHeaders(cfg: QaConfig, bytes: Buffer): Record<string, string> {
  const ts = String(Math.floor(Date.now() / 1000));
  const nonce = `n_${randomBytes(16).toString("hex")}`;
  const sha = createHash("sha256").update(bytes).digest("hex");
  const sig = createHmac("sha256", cfg.secret).update(`${ts}|${nonce}|${sha}`).digest("hex");
  return { "X-Nuova-Tenant": cfg.tenant, "X-Nuova-Timestamp": ts, "X-Nuova-Nonce": nonce, "X-Nuova-Signature": sig };
}

export type QaOutcome =
  | { status: "answered"; text: string; language: string | null; kb_version: string | null }
  | { status: "pending"; retry_after_ms: number }
  | { status: "handoff" }
  | { status: "failed" }
  | { status: "unknown" }
  | { status: "cannot_confirm" };

/** Map a response body in the result shape (also used by the intake's synchronous 200). */
function outcomeFrom(json: unknown): QaOutcome {
  const j = (json ?? {}) as { status?: string; answer?: { text?: string; language?: string }; language?: string; kb_version?: string; retry_after_ms?: number };
  // WEBQA_BACKEND_READY_2026-09-29 §2: the result carries status "answered"; the intake's synchronous 200
  // carries the answer without a status field. Both are an answer when the text is there.
  if ((j.status === "answered" || j.status === undefined) && typeof j.answer?.text === "string" && j.answer.text.trim()) {
    const language = typeof j.language === "string" ? j.language : typeof j.answer.language === "string" ? j.answer.language : null;
    return { status: "answered", text: j.answer.text, language, kb_version: typeof j.kb_version === "string" ? j.kb_version.slice(0, 40) : null };
  }
  if (j.status === "pending") {
    const r = Number(j.retry_after_ms);
    return { status: "pending", retry_after_ms: Number.isFinite(r) ? Math.min(Math.max(r, 800), 5000) : 1500 };
  }
  if (j.status === "handoff") return { status: "handoff" };
  if (j.status === "failed") return { status: "failed" };
  return { status: "cannot_confirm" };
}

/**
 * A product question carries no contact details: the product assistant records no handover and
 * creates no lead (WEBQA_BACKEND_READY_2026-09-29 §3), so the site does not collect a name, an
 * e-mail address or a phone number here. A visitor who wants a person uses the contact page.
 */
export interface QaAsk {
  question: string;
  locale: "en" | "es";
  session_id: string;
  message_id: string;
  page_url?: string;
}

export async function qaAccept(cfg: QaConfig, ask: QaAsk): Promise<QaOutcome> {
  // Only fields the ingress contract defines. Exact bytes are signed and sent.
  const body: Record<string, string> = { question: ask.question, session_id: ask.session_id, message_id: ask.message_id, locale: ask.locale };
  if (ask.page_url) body.page_url = ask.page_url;
  const bytes = Buffer.from(JSON.stringify(body), "utf8");
  let res: Response;
  try {
    res = await fetch(cfg.intake, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...signedHeaders(cfg, bytes) },
      body: bytes,
      cache: "no-store",
      signal: AbortSignal.timeout(15_000),
    });
  } catch {
    return { status: "cannot_confirm" };
  }
  if (res.status === 202) return { status: "pending", retry_after_ms: 1500 };
  if (res.status === 200) return outcomeFrom(await res.json().catch(() => null));
  return { status: "cannot_confirm" }; // 401 by contract for every failure; no oracle
}

export async function qaResult(cfg: QaConfig, session_id: string, message_id: string): Promise<QaOutcome> {
  const canonical = `conversation_id=${encodeURIComponent(`web::${session_id}`)}&message_id=${encodeURIComponent(message_id)}`;
  let res: Response;
  try {
    res = await fetch(`${cfg.intake}/result?${canonical}`, {
      method: "GET",
      headers: signedHeaders(cfg, Buffer.from(canonical, "utf8")),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });
  } catch {
    return { status: "cannot_confirm" };
  }
  if (res.status === 404) return { status: "unknown" };
  if (res.status !== 200) return { status: "cannot_confirm" };
  return outcomeFrom(await res.json().catch(() => null));
}
