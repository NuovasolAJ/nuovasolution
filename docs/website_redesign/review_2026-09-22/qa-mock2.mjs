// Reviewer's own mock of WEBSITE_QA_INGRESS_CONTRACT_v1 + WEBSITE_QA_RESPONSE_CONTRACT_v1 (localhost only).
// Throwaway test secret from env. Accept: 202 when every ingress rule holds. Result: signed GET over the exact
// query string, fresh nonce per call; first poll "pending", second "answered".
import http from "node:http";
import { createHash, createHmac, timingSafeEqual } from "node:crypto";
const SECRET = process.env.MOCK_SECRET;
const nonces = new Set();
const accepted = new Map(); // key conversation|message -> polls
const eq = (a, b) => a && b && a.length === b.length && timingSafeEqual(Buffer.from(a), Buffer.from(b));
const sign = (ts, nonce, payload) => createHmac("sha256", SECRET).update(`${ts}|${nonce}|${createHash("sha256").update(payload).digest("hex")}`).digest("hex");
const log = (o) => console.log(JSON.stringify({ at: new Date().toISOString(), ...o }));
function headerChecks(req, payload) {
  const h = (n) => req.headers[n];
  const ts = h("x-nuova-timestamp"), nonce = h("x-nuova-nonce"), sig = h("x-nuova-signature"), tenant = h("x-nuova-tenant");
  const c = {
    headers_present: Boolean(ts && nonce && sig && tenant),
    fresh: Math.abs(Date.now() / 1000 - Number(ts)) <= 300,
    nonce_format: /^[A-Za-z0-9._:-]{8,128}$/.test(nonce ?? ""),
    nonce_unused: !nonces.has(`${tenant}:${nonce}`),
    signature: eq(sig, sign(ts, nonce, payload)),
  };
  return { c, tenant, nonce };
}
http.createServer((req, res) => {
  const chunks = [];
  req.on("data", (d) => chunks.push(d));
  req.on("end", () => {
    const u = new URL(req.url, "http://x");
    const send = (s, b) => { res.writeHead(s, { "Content-Type": "application/json" }); res.end(JSON.stringify(b)); };
    if (req.method === "POST" && u.pathname === "/webhook/website-qa") {
      const raw = Buffer.concat(chunks);
      const { c, tenant, nonce } = headerChecks(req, raw);
      let b = null; try { b = JSON.parse(raw.toString("utf8")); } catch {}
      const allowed = ["question", "q", "message", "session_id", "message_id", "name", "email", "phone", "page_url", "locale"];
      c.body_object = Boolean(b) && typeof b === "object";
      c.question_1_4000 = typeof (b?.question ?? b?.q ?? b?.message) === "string" && (b.question ?? b.q ?? b.message).length >= 1 && (b.question ?? b.q ?? b.message).length <= 4000;
      c.session_id = typeof b?.session_id === "string" && /^[A-Za-z0-9._:-]{8,128}$/.test(b.session_id);
      c.only_contract_fields = b ? Object.keys(b).every((k) => allowed.includes(k)) : false;
      c.page_url_https_or_absent = b?.page_url === undefined || String(b.page_url).startsWith("https://");
      const ok = Object.values(c).every(Boolean);
      log({ route: "accept", body_keys: b ? Object.keys(b) : null, checks: c, verdict: ok ? 202 : 401 });
      if (!ok) return send(401, { error: "unauthorized" });
      nonces.add(`${tenant}:${nonce}`);
      const conversation_id = `web::${b.session_id}`, message_id = b.message_id ?? `web_${nonce}`;
      accepted.set(`${tenant}|${conversation_id}|${message_id}`, 0);
      return send(202, { accepted: true, conversation_id, message_id });
    }
    if (req.method === "GET" && u.pathname === "/webhook/website-qa/result") {
      const query = req.url.split("?")[1] ?? "";
      const { c, tenant, nonce } = headerChecks(req, Buffer.from(query, "utf8"));
      c.query_canonical = /^conversation_id=[^&]+&message_id=[^&]+$/.test(query);
      const ok = Object.values(c).every(Boolean);
      const key = `${tenant}|${u.searchParams.get("conversation_id")}|${u.searchParams.get("message_id")}`;
      log({ route: "result", query_shape: query.replace(/=[^&]*/g, "=…"), checks: c, known: accepted.has(key) });
      if (!ok) return send(401, { error: "unauthorized" });
      nonces.add(`${tenant}:${nonce}`);
      if (!accepted.has(key)) return send(404, { error: "unknown" });
      const n = accepted.get(key) + 1; accepted.set(key, n);
      const base = { conversation_id: u.searchParams.get("conversation_id"), message_id: u.searchParams.get("message_id") };
      return n < 2 ? send(200, { status: "pending", ...base, retry_after_ms: 1500 })
                   : send(200, { status: "answered", ...base, answer: { text: "MOCK ANSWER from reviewer mock", language: "en", html: null }, answered_at: new Date().toISOString() });
    }
    send(404, { error: "unknown" });
  });
}).listen(3997, "127.0.0.1", () => log({ listening: "127.0.0.1:3997" }));
