// Browser run of the question box on a DEPLOYED staging preview (owner order 2026-09-29 D, WEBQA_BACKEND_READY §5).
// Headless Edge types a question into the page, the site's own server signs and forwards it to the staging
// product assistant, and the answer has to appear on screen, in English and in Spanish.
// It also proves what the browser never sees: every response body the pages loaded is searched for the
// tenant secret, the tenant id and the assistant host. The secret is read from the secure store for that
// comparison only; it is never printed and never written.
// Usage: BASE=https://<staging preview> [DESIGN_BASE=https://<design preview>] node scripts/e2e/qa-staging-browser.mjs
// No production host is contacted. Exit code 1 if any check fails.
import { spawn } from "node:child_process";
import { createHash, createHmac, randomBytes } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const ROOT = new URL("../../", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const OUT = process.env.OUT ?? join(ROOT, "docs", "website_redesign", "evidence_2026-09-29", "qa_staging");
const EDGE = process.env.EDGE ?? "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const BASE = (process.env.BASE ?? "").replace(/\/$/, "");
const DESIGN_BASE = (process.env.DESIGN_BASE ?? "").replace(/\/$/, "");
const SECRET_FILE = process.env.QA_SECRET_FILE ?? "C:/Users/Usuario/.nuova-secrets/stg_webqa_hmac_stg_web_product_qa.txt";
const INTAKE = "https://167-235-150-163.sslip.io/webhook/website-qa";
const TENANT = "stg_web_product_qa";
const CDP_PORT = 9351;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
if (!BASE.startsWith("https://")) { console.log("BASE=https://<staging preview> is required"); process.exit(1); }
mkdirSync(OUT, { recursive: true });

const secret = readFileSync(SECRET_FILE, "utf8").trim();
const results = { started_utc: new Date().toISOString(), base: BASE, design_base: DESIGN_BASE || null, commit: process.env.E2E_COMMIT ?? null, deployment: process.env.E2E_DEPLOYMENT ?? null, checks: [], answers: [], screens: [] };
const check = (id, what, pass, evidence) => {
  results.checks.push({ id, what, pass: Boolean(pass), evidence });
  console.log(`${pass ? "PASS" : "FAIL"} ${id} ${what}`);
};

const kids = [];
try {
  const prof = join(tmpdir(), `nuova-qa-${Date.now()}`);
  kids.push(spawn(EDGE, ["--headless=new", "--disable-gpu", "--no-first-run", "--hide-scrollbars", `--user-data-dir=${prof}`, `--remote-debugging-port=${CDP_PORT}`, "about:blank"], { stdio: "ignore" }));
  let list;
  for (let i = 0; i < 60; i++) { try { list = await (await fetch(`http://127.0.0.1:${CDP_PORT}/json`)).json(); break; } catch { await sleep(500); } }
  const ws = new WebSocket(list.find((t) => t.type === "page").webSocketDebuggerUrl);
  await new Promise((res) => ws.addEventListener("open", res));
  let mid = 0;
  const pend = new Map();
  const requests = new Map(); // requestId -> { url, method, postData }
  const finished = [];
  ws.addEventListener("message", (e) => {
    const m = JSON.parse(e.data);
    if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); return; }
    if (m.method === "Network.requestWillBeSent") requests.set(m.params.requestId, { url: m.params.request.url, method: m.params.request.method, postData: m.params.request.postData ?? null });
    if (m.method === "Network.loadingFinished") finished.push(m.params.requestId);
  });
  const send = (method, params = {}) => new Promise((res) => { const i = ++mid; pend.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
  const ev = async (x) => (await send("Runtime.evaluate", { expression: x, returnByValue: true, awaitPromise: true })).result?.result?.value;
  const waitFor = async (x, ms = 60000) => { const t = Date.now(); while (Date.now() - t < ms) { if (await ev(x)) return true; await sleep(400); } return false; };
  const shot = async (name) => {
    const s = await send("Page.captureScreenshot", { format: "png" });
    if (s.result?.data) writeFileSync(join(OUT, `${name}.png`), Buffer.from(s.result.data, "base64"));
    results.screens.push(`${name}.png`);
  };
  await send("Page.enable");
  await send("Runtime.enable");
  await send("Network.enable");

  const PANEL = `document.querySelector('[data-qa-panel="inline"]')`;
  const type = (sel, text) => ev(`(()=>{const t=document.querySelector(${JSON.stringify(sel)});if(!t)return false;t.focus();const set=Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,'value').set;set.call(t,${JSON.stringify(text)});t.dispatchEvent(new Event('input',{bubbles:true}));return true})()`);
  const lastAnswer = (scope) => ev(`(()=>{const a=[...(${scope}?.querySelectorAll('[data-qa-turn="nuova"]')??[])];return a.length?a[a.length-1].innerText.trim():null})()`);
  const answerCount = (scope) => ev(`(${scope}?.querySelectorAll('[data-qa-turn="nuova"]')??[]).length`);

  async function askInline(locale, view, question, tag) {
    const [w, h, mobile, dpr] = view;
    await send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: dpr, mobile });
    await send("Page.navigate", { url: `${BASE}/${locale}` });
    await sleep(3500);
    const surface = await ev(`(()=>{const p=${PANEL};if(!p)return null;p.scrollIntoView({block:'center'});return {surface:p.getAttribute('data-qa-surface'),text:p.innerText}})()`);
    await sleep(600);
    const before = await answerCount(PANEL);
    await type('[data-qa-panel="inline"] textarea', question);
    const t0 = Date.now();
    // Enter sends, as a visitor on a keyboard would.
    await send("Input.dispatchKeyEvent", { type: "keyDown", key: "Enter", code: "Enter", windowsVirtualKeyCode: 13, text: "\r" });
    await send("Input.dispatchKeyEvent", { type: "keyUp", key: "Enter", code: "Enter", windowsVirtualKeyCode: 13 });
    const busy = await waitFor(`/·/.test(${PANEL}?.querySelector('.typing')?.innerText??'')`, 4000);
    const got = await waitFor(`(${PANEL}?.querySelectorAll('[data-qa-turn="nuova"]')??[]).length>${before}`, 62000);
    const ms = Date.now() - t0;
    const text = await lastAnswer(PANEL);
    const human = await ev(`!!([...(${PANEL}?.querySelectorAll('[data-qa-turn="nuova"]')??[])].pop()?.querySelector('a'))`);
    const kb = await ev(`${PANEL}?.getAttribute('data-qa-kb')`);
    await ev(`${PANEL}?.scrollIntoView({block:'center'})`);
    await sleep(500);
    await shot(`${tag}-${locale}-qa-answer`);
    results.answers.push({ locale, view: tag, question, ms, answered: got && !human, text, kb_version: kb ?? null });
    return { surface, busy, got, human, ms, text };
  }

  const D1440 = [1440, 900, false, 1];
  const M390 = [390, 844, true, 2];

  // QS-01 to QS-03: English on desktop
  const en = await askInline("en", D1440, "Does Nuova answer WhatsApp enquiries at night?", "d1440");
  check("QS-01", "staging shows the wired question box: surface 'public', no Demo label", en.surface?.surface === "public" && !/\bDemo\b/.test(en.surface?.text ?? ""), { surface: en.surface?.surface });
  check("QS-02", "EN: a typed question is answered on screen inside the 60 second budget", en.got && !en.human && en.ms < 60000, { ms: en.ms, answer: en.text });
  check("QS-03", "EN: the waiting state is shown while the answer is produced", en.busy, { busy: en.busy });

  // QS-04: the floating window shows the same conversation (one conversation per visitor)
  await ev(`document.querySelector('[data-qa-launcher]')?.click()`);
  await sleep(600);
  const same = await ev(`(()=>{const d=document.querySelector('[data-qa-panel="fixed"]');const a=[...(d?.querySelectorAll('[data-qa-turn="nuova"]')??[])].pop();return a?a.innerText.trim():null})()`);
  check("QS-04", "the floating window shows the same conversation as the embedded one", Boolean(same) && same === en.text, { same: same === en.text });
  await send("Input.dispatchKeyEvent", { type: "keyDown", key: "Escape", code: "Escape", windowsVirtualKeyCode: 27 });
  await send("Input.dispatchKeyEvent", { type: "keyUp", key: "Escape", code: "Escape", windowsVirtualKeyCode: 27 });

  // QS-05: Spanish on a phone
  const es = await askInline("es", M390, "¿Tengo que cambiar de CRM?", "m390");
  const spanish = /\b(el|la|los|las|un|una|que|es|de|y|no|tu|tus)\b/i.test(es.text ?? "") && !/\bthe\b/i.test(es.text ?? "");
  check("QS-05", "ES: a typed question is answered on screen, in Spanish, inside the budget", es.got && !es.human && es.ms < 60000 && spanish, { ms: es.ms, answer: es.text });
  const over = await ev(`({sw:document.documentElement.scrollWidth,iw:innerWidth})`);
  check("QS-06", "no horizontal overflow at 390 px with the answer on screen", over.sw <= over.iw, over);

  // QS-07: what the browser sent and where it went
  const all = [...requests.values()];
  const foreign = all.filter((r) => /sslip\.io|\/webhook\//.test(r.url));
  const posts = all.filter((r) => r.method === "POST" && /\/api\/qa$/.test(new URL(r.url).pathname));
  const bodies = posts.map((p) => { try { return Object.keys(JSON.parse(p.postData ?? "{}")).sort().join(","); } catch { return "unreadable"; } });
  check("QS-07", "the browser talks to the site's own /api/qa only, and sends the question and the language, nothing else", foreign.length === 0 && posts.length >= 2 && bodies.every((b) => b === "locale,question"), { assistant_calls_from_browser: foreign.length, posts: posts.length, body_keys: [...new Set(bodies)] });

  // QS-08: the secret, the tenant and the assistant host are in no response body the browser received
  let searched = 0, bytes = 0;
  const hits = { secret: 0, tenant: 0, host: 0 };
  for (const id of [...new Set(finished)]) {
    const r = await send("Network.getResponseBody", { requestId: id });
    const raw = r.result?.body;
    if (typeof raw !== "string") continue;
    const body = r.result.base64Encoded ? Buffer.from(raw, "base64").toString("latin1") : raw;
    searched += 1; bytes += body.length;
    if (body.includes(secret)) hits.secret += 1;
    if (body.includes(TENANT)) hits.tenant += 1;
    if (body.includes("sslip.io")) hits.host += 1;
  }
  const cookies = (await send("Network.getAllCookies")).result?.cookies ?? [];
  const qaCookie = cookies.find((c) => c.name === "nuova_qa_session");
  const inCookie = cookies.some((c) => String(c.value).includes(secret));
  const inDom = await ev(`document.documentElement.outerHTML.includes(${JSON.stringify(TENANT)})||document.documentElement.outerHTML.includes('sslip.io')`);
  check("QS-08", "the tenant secret, the tenant id and the assistant host appear in no response body, no cookie and not in the page", searched > 10 && hits.secret === 0 && hits.tenant === 0 && hits.host === 0 && !inCookie && !inDom, { bodies_searched: searched, bytes, hits, in_cookie: inCookie, in_dom: inDom });
  check("QS-09", "the conversation cookie is httpOnly and secure", Boolean(qaCookie?.httpOnly && qaCookie?.secure), { httpOnly: qaCookie?.httpOnly ?? null, secure: qaCookie?.secure ?? null, sameSite: qaCookie?.sameSite ?? null });

  // QS-10: cross-origin posts to the site's route are refused (no browser needed)
  const cross = await fetch(`${BASE}/api/qa`, { method: "POST", headers: { "Content-Type": "application/json", Origin: "https://example.org" }, body: JSON.stringify({ question: "x", locale: "en" }) });
  check("QS-10", "a POST from another origin is refused by the site's route", cross.status === 403, { status: cross.status });

  // QS-11: the assistant refuses a foreign tenant and an unsigned call (server to server, staging only)
  const sign = (tenant, key, bytesToSign) => {
    const ts = String(Math.floor(Date.now() / 1000));
    const nonce = `n_${randomBytes(16).toString("hex")}`;
    const sha = createHash("sha256").update(bytesToSign).digest("hex");
    return { "Content-Type": "application/json", "X-Nuova-Tenant": tenant, "X-Nuova-Timestamp": ts, "X-Nuova-Nonce": nonce, "X-Nuova-Signature": createHmac("sha256", key).update(`${ts}|${nonce}|${sha}`).digest("hex") };
  };
  const probe = Buffer.from(JSON.stringify({ question: "probe", session_id: `s_${randomBytes(16).toString("hex")}`, message_id: `web_${randomBytes(12).toString("hex")}`, locale: "en" }), "utf8");
  const foreignTenant = await fetch(INTAKE, { method: "POST", headers: sign("stg_foreign_tenant_probe", secret, probe), body: probe });
  const wrongKey = await fetch(INTAKE, { method: "POST", headers: sign(TENANT, randomBytes(32).toString("hex"), probe), body: probe });
  check("QS-11", "the assistant refuses a foreign tenant and a wrong signature with 401", foreignTenant.status === 401 && wrongKey.status === 401, { foreign_tenant: foreignTenant.status, wrong_signature: wrongKey.status });

  // QS-12: the design preview stays a labelled demo and is not connected
  if (DESIGN_BASE) {
    await send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
    await send("Page.navigate", { url: `${DESIGN_BASE}/en` });
    await sleep(3500);
    const demo = await ev(`(()=>{const p=${PANEL};if(!p)return null;p.scrollIntoView({block:'center'});return {surface:p.getAttribute('data-qa-surface'),demo:/\\bDemo\\b/.test(p.innerText)}})()`);
    await type('[data-qa-panel="inline"] textarea', "Does Nuova answer WhatsApp enquiries at night?");
    await ev(`${PANEL}?.querySelector('form button[type=submit]')?.click()`);
    await waitFor(`(${PANEL}?.querySelectorAll('[data-qa-turn="nuova"]')??[]).length>0`, 30000);
    const t = await lastAnswer(PANEL);
    await shot("d1440-en-design-qa-demo");
    check("QS-12", "design preview: the box is labelled Demo and answers that it cannot confirm from here", demo?.surface === "demo" && demo?.demo && /cannot confirm/i.test(t ?? ""), { surface: demo?.surface, answer: t });
  }
  ws.close();
} catch (e) {
  check("QS-00", "the run completed", false, String(e?.message ?? e).split(secret).join("[secret]"));
} finally {
  for (const k of kids) { try { k.kill(); } catch { /* gone */ } }
  results.finished_utc = new Date().toISOString();
  const pass = results.checks.filter((c) => c.pass).length;
  results.pass = pass; results.total = results.checks.length;
  writeFileSync(join(OUT, "qa-staging-results.json"), JSON.stringify(results, null, 1).split(secret).join("[secret]"));
  console.log(`${pass} passed, ${results.total - pass} failed -> ${join(OUT, "qa-staging-results.json")}`);
  process.exit(pass === results.total ? 0 : 1);
}
