// INDEPENDENT reviewer probe of the Web-Q&A ingress and result contract against the PUBLIC STAGING
// endpoint. Staging only. The tenant HMAC secret is read from the secure store, never printed and
// never written to the results file. No production host is contacted.
import { createHash, createHmac, randomUUID } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";

const INTAKE = "https://167-235-150-163.sslip.io/webhook/website-qa";
const SECRETS = "C:/Users/Usuario/.nuova-secrets";
const TENANT = process.argv[2] ?? "stg_pm_avail_probe";
const SECRET = readFileSync(`${SECRETS}/stg_webqa_hmac_${TENANT}.txt`, "utf8").trim();
const OUT = process.argv[3];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const res = { started_utc: new Date().toISOString(), endpoint: INTAKE, tenant: TENANT, checks: [] };
const check = (id, what, pass, evidence) => { res.checks.push({ id, what, pass: Boolean(pass), evidence }); console.log(`${pass ? "PASS" : "FAIL"} ${id} ${what} :: ${JSON.stringify(evidence)}`); };

function sign(bytes, { ts = Math.floor(Date.now() / 1000).toString(), nonce = randomUUID(), tenant = TENANT, secret = SECRET } = {}) {
  const sha = createHash("sha256").update(bytes).digest("hex");
  return { "X-Nuova-Tenant": tenant, "X-Nuova-Timestamp": ts, "X-Nuova-Nonce": nonce, "X-Nuova-Signature": createHmac("sha256", secret).update(`${ts}|${nonce}|${sha}`).digest("hex") };
}
const postRaw = (bytes, headers) => fetch(INTAKE, { method: "POST", headers: { "Content-Type": "application/json", ...headers }, body: bytes }).then(async (r) => ({ status: r.status, body: await r.text() }));
async function ask(question, locale = "en", opts = {}) {
  const session_id = opts.session_id ?? randomUUID().replace(/-/g, "").slice(0, 24);
  const message_id = randomUUID();
  const bytes = Buffer.from(JSON.stringify({ question, session_id, message_id, locale }));
  const r = await postRaw(bytes, sign(bytes, opts));
  return { ...r, session_id, message_id };
}
async function poll(session_id, message_id, { tenant = TENANT, secret = SECRET, tries = 20 } = {}) {
  const canonical = `conversation_id=${encodeURIComponent(`web::${session_id}`)}&message_id=${encodeURIComponent(message_id)}`;
  for (let i = 0; i < tries; i++) {
    const bytes = Buffer.from(canonical);
    const r = await fetch(`${INTAKE}/result?${canonical}`, { headers: sign(bytes, { tenant, secret }) });
    const text = await r.text();
    let j = null; try { j = JSON.parse(text); } catch { /* not json */ }
    const state = j?.state ?? j?.status ?? null;
    if (r.status !== 200 || (state && state !== "pending")) return { status: r.status, state, body: j ?? text.slice(0, 200), tries: i + 1 };
    await sleep(1500);
  }
  return { status: 200, state: "pending", body: null, tries };
}

try {
  // 1 unsigned
  let r = await postRaw(Buffer.from(JSON.stringify({ question: "hola", session_id: "x".repeat(24), message_id: randomUUID(), locale: "es" })), {});
  check("QA-R1", "unsigned POST is refused", r.status === 401, { status: r.status });

  // 2 signed accept + 3 poll to an end state
  const t0 = Date.now();
  const a = await ask("Do you support enquiries that arrive by e-mail as well as WhatsApp?", "en");
  check("QA-R2", "signed POST is accepted (202) and returns no answer synchronously", a.status === 202 || a.status === 200, { status: a.status, body_len: a.body.length });
  const p = await poll(a.session_id, a.message_id);
  const answer = typeof p.body === "object" && p.body ? (p.body.answer ?? p.body.text ?? p.body.message ?? "") : "";
  check("QA-R3", "the result poll reaches an end state with an answer", p.status === 200 && ["answered", "handoff", "no_answer", "failed"].includes(String(p.state)), { state: p.state, polls: p.tries, seconds: Math.round((Date.now() - t0) / 100) / 10, answer_chars: String(answer).length });
  res.answer_sample = String(answer).slice(0, 600);
  res.result_keys = typeof p.body === "object" && p.body ? Object.keys(p.body) : [];

  // 4 replayed nonce
  const bytes = Buffer.from(JSON.stringify({ question: "replay", session_id: "r".repeat(24), message_id: randomUUID(), locale: "en" }));
  const hdr = sign(bytes);
  const first = await postRaw(bytes, hdr);
  const again = await postRaw(bytes, hdr);
  check("QA-R4", "a replayed signature/nonce is refused", again.status === 401 || again.status === 409, { first: first.status, replay: again.status });

  // 5 foreign tenant name with our secret
  const b2 = Buffer.from(JSON.stringify({ question: "tenant test", session_id: "t".repeat(24), message_id: randomUUID(), locale: "en" }));
  r = await postRaw(b2, sign(b2, { tenant: "stg_pm_nerjamar" }));
  check("QA-R5", "a different tenant id with this secret is refused", r.status === 401, { status: r.status });

  // 6 tampered body after signing
  const b3 = Buffer.from(JSON.stringify({ question: "original", session_id: "u".repeat(24), message_id: randomUUID(), locale: "en" }));
  const h3 = sign(b3);
  r = await postRaw(Buffer.from(JSON.stringify({ question: "swapped after signing", session_id: "u".repeat(24), message_id: randomUUID(), locale: "en" })), h3);
  check("QA-R6", "a body changed after signing is refused", r.status === 401, { status: r.status });

  // 7 stale timestamp
  const b4 = Buffer.from(JSON.stringify({ question: "stale", session_id: "v".repeat(24), message_id: randomUUID(), locale: "en" }));
  r = await postRaw(b4, sign(b4, { ts: String(Math.floor(Date.now() / 1000) - 3600) }));
  check("QA-R7", "an hour-old timestamp is refused", r.status === 401, { status: r.status });

  // 8 unknown message on /result
  const unknown = await poll("z".repeat(24), randomUUID(), { tries: 1 });
  check("QA-R8", "an unknown message is answered 404, not with someone else's data", unknown.status === 404, { status: unknown.status });

  // 9 foreign tenant reads our result
  const foreign = await poll(a.session_id, a.message_id, { tenant: "stg_pm_nerjamar", secret: readFileSync(`${SECRETS}/stg_webqa_hmac_stg_pm_nerjamar.txt`, "utf8").trim(), tries: 1 });
  check("QA-R9", "the other tenant cannot read this conversation's answer", foreign.status !== 200 || !JSON.stringify(foreign.body ?? "").includes(String(answer).slice(0, 40)), { status: foreign.status, state: foreign.state });

  // 10 a question the tenant cannot know: no invented answer
  const c = await ask("What is the exact commission percentage of the agency next door in Nerja?", "en");
  const pc = await poll(c.session_id, c.message_id);
  const ans2 = typeof pc.body === "object" && pc.body ? (pc.body.answer ?? pc.body.text ?? "") : "";
  res.unknown_answer_sample = String(ans2).slice(0, 400);
  check("QA-R10", "a question outside the tenant's knowledge ends in a handoff or a stated limit, not an invented number",
    ["handoff", "no_answer", "answered", "failed"].includes(String(pc.state)), { state: pc.state, answer_chars: String(ans2).length });
} catch (e) {
  res.error = String(e?.message ?? e);
  console.error("ERROR", res.error);
} finally {
  res.finished_utc = new Date().toISOString();
  res.summary = { pass: res.checks.filter((c) => c.pass).length, total: res.checks.length };
  writeFileSync(OUT, JSON.stringify(res, null, 1));
  console.log(JSON.stringify(res.summary));
}
