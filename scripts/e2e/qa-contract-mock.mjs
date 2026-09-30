// LOCAL CONTRACT MOCK for the website Q&A. Listens on 127.0.0.1 only. Never a real backend.
// Enforces, byte for byte, what the published contracts require:
//   governance/WEBSITE_QA_INGRESS_CONTRACT_v1.md   POST /webhook/website-qa  -> 202 accepted | 401
//   governance/WEBSITE_QA_RESPONSE_CONTRACT_v1.md  GET  /webhook/website-qa/result -> 200 pending|answered|handoff|failed | 401 | 404
// Signature: hex(HMAC-SHA256(secret, `${ts}|${nonce}|${sha256hex(bytes)}`)), bytes = raw body (POST) or raw query (GET).
// Freshness |now - ts| <= 300 s. Nonce single use per tenant. Secret comes from MOCK_SECRET (throwaway, generated per run).
// Behaviour: first result poll -> pending (retry 800 ms), later -> answered. A question containing "HANDOFF" resolves to handoff,
// "FAILED" to failed, and "NEVER" stays pending for good (the website's 60 second budget has to end the wait).
import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { appendFileSync } from "node:fs";
import http from "node:http";

const SECRET = process.env.MOCK_SECRET;
const TENANT = process.env.MOCK_TENANT ?? "e2e_tenant";
const PORT = Number(process.env.MOCK_PORT ?? 3998);
const LOG = process.env.MOCK_LOG;
if (!SECRET) throw new Error("MOCK_SECRET required");

const nonces = new Set();
const store = new Map(); // `${conv}|${msg}` -> { question, polls }
const log = (o) => {
  const line = JSON.stringify({ utc: new Date().toISOString(), ...o });
  if (LOG) appendFileSync(LOG, line + "\n");
};

function verify(req, bytes) {
  const tenant = req.headers["x-nuova-tenant"];
  const ts = Number(req.headers["x-nuova-timestamp"]);
  const nonce = String(req.headers["x-nuova-nonce"] ?? "");
  const sig = String(req.headers["x-nuova-signature"] ?? "");
  const checks = {
    tenant: tenant === TENANT,
    fresh: Number.isFinite(ts) && Math.abs(Date.now() / 1000 - ts) <= 300,
    nonce_format: /^[A-Za-z0-9._:-]{8,128}$/.test(nonce),
    nonce_unused: !nonces.has(`${tenant}|${nonce}`),
    sig_format: /^[0-9a-f]{64}$/.test(sig),
  };
  const expected = createHmac("sha256", SECRET).update(`${ts}|${nonce}|${createHash("sha256").update(bytes).digest("hex")}`).digest("hex");
  checks.signature = checks.sig_format && timingSafeEqual(Buffer.from(expected), Buffer.from(sig));
  const ok = Object.values(checks).every(Boolean);
  if (ok) nonces.add(`${tenant}|${nonce}`); // consumed only on success
  return { ok, checks };
}

const reply = (res, status, body) => {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(body));
};

http
  .createServer((req, res) => {
    const chunks = [];
    req.on("data", (c) => chunks.push(c));
    req.on("end", () => {
      const url = new URL(req.url, `http://127.0.0.1:${PORT}`);
      if (req.method === "POST" && url.pathname === "/webhook/website-qa") {
        const bytes = Buffer.concat(chunks);
        const v = verify(req, bytes);
        let body = null;
        try { body = JSON.parse(bytes.toString("utf8")); } catch { body = null; }
        const q = body?.question ?? body?.q ?? body?.message;
        v.checks.question = typeof q === "string" && q.length >= 1 && q.length <= 4000;
        v.checks.session_id = typeof body?.session_id === "string" && /^[A-Za-z0-9._:-]{8,128}$/.test(body.session_id);
        v.checks.no_extra_fields = body && Object.keys(body).every((k) => ["question", "q", "message", "session_id", "message_id", "name", "email", "phone", "page_url", "locale"].includes(k));
        const ok = v.ok && v.checks.question && v.checks.session_id && v.checks.no_extra_fields;
        log({ op: "POST", verdict: ok ? 202 : 401, checks: v.checks, fields: body ? Object.keys(body) : null });
        if (!ok) return reply(res, 401, { error: "unauthorized" });
        const conv = `web::${body.session_id}`;
        const msg = body.message_id ?? `web_${req.headers["x-nuova-nonce"]}`;
        store.set(`${conv}|${msg}`, { question: q, polls: 0 });
        return reply(res, 202, { accepted: true, conversation_id: conv, message_id: msg });
      }
      if (req.method === "GET" && url.pathname === "/webhook/website-qa/result") {
        const raw = req.url.split("?")[1] ?? ""; // exact bytes of the query as sent
        const v = verify(req, Buffer.from(raw, "utf8"));
        const conv = url.searchParams.get("conversation_id");
        const msg = url.searchParams.get("message_id");
        v.checks.canonical_order = /^conversation_id=[^&]+&message_id=[^&]+$/.test(raw);
        const ok = v.ok && v.checks.canonical_order;
        if (!ok) {
          log({ op: "GET", verdict: 401, checks: v.checks });
          return reply(res, 401, { error: "unauthorized" });
        }
        const rec = store.get(`${conv}|${msg}`);
        if (!rec) {
          log({ op: "GET", verdict: 404, checks: v.checks });
          return reply(res, 404, { error: "unknown" });
        }
        rec.polls += 1;
        if (rec.polls === 1 || /NEVER/.test(rec.question)) {
          log({ op: "GET", verdict: "200 pending", checks: v.checks });
          return reply(res, 200, { status: "pending", conversation_id: conv, message_id: msg, retry_after_ms: 800 });
        }
        if (/FAILED/.test(rec.question)) {
          log({ op: "GET", verdict: "200 failed", checks: v.checks });
          return reply(res, 200, { status: "failed", conversation_id: conv, message_id: msg });
        }
        if (/PROMISE/.test(rec.question)) {
          // what the staging assistant said for every question on 2026-09-30: an "answer" that promises contact
          log({ op: "GET", verdict: "200 answered (contact promise)", checks: v.checks });
          return reply(res, 200, { status: "answered", conversation_id: conv, message_id: msg, answer: { text: "I cannot answer that right now. A colleague will get back to you.", language: "en", html: null } });
        }
        if (/HANDOFF/.test(rec.question)) {
          log({ op: "GET", verdict: "200 handoff", checks: v.checks });
          return reply(res, 200, { status: "handoff", conversation_id: conv, message_id: msg, note: "a colleague will follow up" });
        }
        log({ op: "GET", verdict: "200 answered", checks: v.checks });
        return reply(res, 200, { status: "answered", conversation_id: conv, message_id: msg, answer: { text: `MOCK ANSWER (local contract mock, not the product): ${rec.question.slice(0, 80)}`, language: "en", html: null }, answered_at: new Date().toISOString() });
      }
      reply(res, 404, { error: "not_found" });
    });
  })
  .listen(PORT, "127.0.0.1", () => console.log(`qa-contract-mock listening 127.0.0.1:${PORT}`));
