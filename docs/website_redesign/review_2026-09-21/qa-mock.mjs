// Local mock of governance/WEBSITE_QA_INGRESS_CONTRACT_v1.md (request side only).
// Throwaway test secret from the environment; never a real tenant secret. Listens on localhost only.
import http from "node:http";
import { createHash, createHmac, timingSafeEqual } from "node:crypto";

const SECRET = process.env.MOCK_SECRET;
const seen = new Set();

http
  .createServer((req, res) => {
    const chunks = [];
    req.on("data", (c) => chunks.push(c));
    req.on("end", () => {
      const raw = Buffer.concat(chunks);
      const h = (n) => req.headers[n.toLowerCase()];
      const checks = {};
      const ts = h("X-Nuova-Timestamp"), nonce = h("X-Nuova-Nonce"), sig = h("X-Nuova-Signature"), tenant = h("X-Nuova-Tenant");
      checks.path = req.method === "POST" && req.url === "/webhook/website-qa";
      checks.headers_present = Boolean(ts && nonce && sig && tenant);
      checks.fresh = Math.abs(Date.now() / 1000 - Number(ts)) <= 300;
      checks.nonce_format = /^[A-Za-z0-9._:-]{8,128}$/.test(nonce ?? "");
      checks.nonce_unused = !seen.has(`${tenant}:${nonce}`);
      const expected = createHmac("sha256", SECRET).update(`${ts}|${nonce}|${createHash("sha256").update(raw).digest("hex")}`).digest("hex");
      checks.signature_over_raw_bytes = Boolean(sig) && sig.length === expected.length && timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
      let body = null;
      try { body = JSON.parse(raw.toString("utf8")); } catch {}
      checks.body_json_object = Boolean(body) && typeof body === "object" && !Array.isArray(body);
      checks.body_size_ok = raw.length <= 65536;
      const q = body?.question ?? body?.q ?? body?.message;
      checks.question_1_4000 = typeof q === "string" && q.length >= 1 && q.length <= 4000;
      checks.session_id_required = typeof body?.session_id === "string" && /^[A-Za-z0-9._:-]{8,128}$/.test(body.session_id);
      const ok = Object.values(checks).every(Boolean);
      console.log(JSON.stringify({
        at: new Date().toISOString(),
        received_header_names: Object.keys(req.headers).filter((k) => k.startsWith("x-nuova")),
        received_body_keys: body ? Object.keys(body) : null,
        checks,
        verdict: ok ? "202" : "401",
      }));
      if (ok) {
        seen.add(`${tenant}:${nonce}`);
        res.writeHead(202, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ accepted: true, conversation_id: `web::${body.session_id}`, message_id: body.message_id ?? `web_${nonce}` }));
      } else {
        res.writeHead(401, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "unauthorized" }));
      }
    });
  })
  .listen(3999, "127.0.0.1", () => console.log("qa-mock listening 127.0.0.1:3999"));
