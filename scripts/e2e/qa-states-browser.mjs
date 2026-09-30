// Every state of the question box in a real browser, against the LOCAL contract mock (no staging, no
// production): waiting, still working, the 60 second budget, the three outcomes that are not an answer,
// closing while waiting, an over-long question, an empty question. What it guards: the box never says
// that somebody will get in touch (the product assistant records no handover), and it never hangs.
// Requires a prior `next build` (stub mode). Usage: node scripts/e2e/qa-states-browser.mjs
import { spawn } from "node:child_process";
import { randomBytes } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const ROOT = new URL("../../", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const OUT = process.env.OUT ?? join(ROOT, "docs", "website_redesign", "evidence_2026-09-29", "qa_states");
const EDGE = process.env.EDGE ?? "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const NEXT = join(ROOT, "node_modules", "next", "dist", "bin", "next");
const PORT = 3127, MOCK_PORT = 3997, CDP_PORT = 9369;
const BASE = `http://localhost:${PORT}`;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
mkdirSync(OUT, { recursive: true });

const results = { started_utc: new Date().toISOString(), mode: "stub build + local Q&A contract mock", commit: process.env.E2E_COMMIT ?? "working tree", checks: [] };
const check = (id, what, pass, evidence) => { results.checks.push({ id, what, pass: Boolean(pass), evidence }); console.log(`${pass ? "PASS" : "FAIL"} ${id} ${what}`); };
const kids = [];
const start = (cmd, args, env) => { const p = spawn(cmd, args, { cwd: ROOT, env: { ...process.env, ...env }, stdio: ["ignore", "pipe", "pipe"] }); p.stdout.on("data", () => {}); p.stderr.on("data", () => {}); kids.push(p); return p; };

try {
  const secret = randomBytes(32).toString("hex"); // throwaway
  start(process.execPath, [join(ROOT, "scripts", "e2e", "qa-contract-mock.mjs")], { MOCK_SECRET: secret, MOCK_TENANT: "e2e_tenant", MOCK_PORT: String(MOCK_PORT) });
  start(process.execPath, [NEXT, "start", "-p", String(PORT)], { QA_INTAKE_URL: `http://127.0.0.1:${MOCK_PORT}/webhook/website-qa`, QA_TENANT_ID: "e2e_tenant", QA_TENANT_HMAC_SECRET: secret });
  for (let i = 0; i < 120; i++) { try { const r = await fetch(`${BASE}/en`, { redirect: "manual" }); if (r.status) break; } catch { /* not up */ } await sleep(500); }

  const prof = join(tmpdir(), `nuova-qastates-${Date.now()}`);
  kids.push(spawn(EDGE, ["--headless=new", "--disable-gpu", "--no-first-run", "--hide-scrollbars", `--user-data-dir=${prof}`, `--remote-debugging-port=${CDP_PORT}`, "about:blank"], { stdio: "ignore" }));
  let list;
  for (let i = 0; i < 60; i++) { try { list = await (await fetch(`http://127.0.0.1:${CDP_PORT}/json`)).json(); break; } catch { await sleep(500); } }
  const ws = new WebSocket(list.find((t) => t.type === "page").webSocketDebuggerUrl);
  await new Promise((res) => ws.addEventListener("open", res));
  let mid = 0;
  const pend = new Map();
  ws.addEventListener("message", (e) => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } });
  const send = (method, params = {}) => new Promise((res) => { const i = ++mid; pend.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
  const ev = async (x) => (await send("Runtime.evaluate", { expression: x, returnByValue: true, awaitPromise: true })).result?.result?.value;
  const waitFor = async (x, ms) => { const t = Date.now(); while (Date.now() - t < ms) { if (await ev(x)) return Date.now() - t; await sleep(250); } return null; };
  const shot = async (name) => { const s = await send("Page.captureScreenshot", { format: "jpeg", quality: 80 }); if (s.result?.data) writeFileSync(join(OUT, `${name}.jpg`), Buffer.from(s.result.data, "base64")); };
  await send("Page.enable");
  await send("Runtime.enable");
  await send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });

  const D = `document.querySelector('[data-qa-panel="fixed"]')`;
  const open = async (locale) => { await send("Page.navigate", { url: `${BASE}/${locale}/packages` }); await sleep(2200); await ev(`document.querySelector('[data-qa-launcher]').click()`); await sleep(500); };
  const ask = async (q) => {
    await ev(`(()=>{const t=${D}.querySelector('textarea');Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,'value').set.call(t,${JSON.stringify(q)});t.dispatchEvent(new Event('input',{bubbles:true}));})()`);
    await ev(`${D}.querySelector('form button[type=submit]').click()`);
  };
  const last = () => ev(`(()=>{const a=[...${D}.querySelectorAll('[data-qa-turn="nuova"]')].pop();return a?{text:a.innerText.trim(),link:a.querySelector('a')?.getAttribute('href')??null}:null})()`);
  const count = () => ev(`${D}.querySelectorAll('[data-qa-turn="nuova"]').length`);
  const PROMISE = /will (answer|get in touch|contact you|reply to you)|se pondrá en contacto|te responder[áa]|leave an email|deja un email/i;

  // 1. never answered: waiting → still working → the budget ends the wait
  await open("en");
  const sendDisabledEmpty = await ev(`${D}.querySelector('form button[type=submit]').disabled`);
  check("QT-01", "an empty question cannot be sent", sendDisabledEmpty === true, { disabled: sendDisabledEmpty });
  await ask("NEVER answer this one");
  const t0 = Date.now();
  const thinking = await waitFor(`/Reading your question/.test(${D}.querySelector('.typing')?.innerText??'')`, 4000);
  const busyBtn = await ev(`({disabled:${D}.querySelector('form button[type=submit]').disabled,busy:${D}.querySelector('form button[type=submit]').getAttribute('aria-busy')})`);
  const slow = await waitFor(`/Still working on it/.test(${D}.querySelector('.typing')?.innerText??'')`, 20000);
  await shot("m390-en-qa-still-working");
  const ended = await waitFor(`${D}.querySelectorAll('[data-qa-turn="nuova"]').length===1`, 70000);
  const total = Date.now() - t0;
  const a1 = await last();
  const after = await ev(`({typing:!!${D}.querySelector('.typing'),disabled:${D}.querySelector('form button[type=submit]').disabled})`);
  await shot("m390-en-qa-budget-ended");
  check("QT-02", "waiting is shown at once, and the send control is busy while it lasts", thinking !== null && busyBtn.disabled === true && busyBtn.busy === "true", { thinking_ms: thinking, ...busyBtn });
  check("QT-03", "after about ten seconds the box says it is still working", slow !== null && Date.now() - t0 >= 0 && slow + (thinking ?? 0) >= 8000 && slow + (thinking ?? 0) <= 16000, { still_working_after_ms: slow === null ? null : slow + (thinking ?? 0) });
  check("QT-04", "an answer that never comes ends inside the 60 second budget with 'cannot confirm' and the contact link", ended !== null && total <= 62000 && /cannot confirm/i.test(a1?.text ?? "") && a1?.link === "/en/contact" && !after.typing, { ended_after_ms: total, text: a1?.text, link: a1?.link });

  // 2. the backend says "handoff": no promise that somebody gets in touch, because no contact was recorded
  await ask("HANDOFF please");
  await waitFor(`${D}.querySelectorAll('[data-qa-turn="nuova"]').length===2`, 20000);
  const a2 = await last();
  check("QT-05", "a handover answer of the backend is shown as 'cannot confirm' with the contact link, never as a promise of contact", /cannot confirm/i.test(a2?.text ?? "") && a2?.link === "/en/contact" && !PROMISE.test(a2?.text ?? ""), a2);

  // 3. failed
  await ask("FAILED on purpose");
  await waitFor(`${D}.querySelectorAll('[data-qa-turn="nuova"]').length===3`, 20000);
  const a3 = await last();
  check("QT-06", "a failed answer says so and offers the contact page", /did not go through/i.test(a3?.text ?? "") && a3?.link === "/en/contact", a3);

  // 4. a normal answer still arrives after those
  await ask("Does Nuova work with WhatsApp?");
  await waitFor(`${D}.querySelectorAll('[data-qa-turn="nuova"]').length===4`, 20000);
  const a4 = await last();
  check("QT-07", "an answer is shown as an answer, without a contact button", /MOCK ANSWER/.test(a4?.text ?? "") && a4?.link === null, a4);
  const ai = await ev(`${D}.querySelector('[data-qa-ai-notice]')?.innerText??null`);
  check("QT-08", "the AI notice stays next to the conversation", /AI assistant/.test(ai ?? ""), { notice: ai });

  // 5. over-long question
  await ask("x".repeat(4001));
  await sleep(600);
  const err = await ev(`${D}.querySelector('[role=alert]')?.innerText??null`);
  const maxlen = await ev(`${D}.querySelector('textarea').maxLength`);
  check("QT-09", "a question over 4000 characters is not sent: the field stops at 4000 and the route refuses more", maxlen === 4000 && (err === null || /4000/.test(err)), { maxLength: maxlen, error: err });

  // 6. closing while waiting ends the request; nothing is appended afterwards (Spanish)
  await open("es");
  const before = await count();
  await ask("NEVER, otra vez");
  await sleep(2500);
  await send("Input.dispatchKeyEvent", { type: "keyDown", key: "Escape", code: "Escape", windowsVirtualKeyCode: 27 });
  await send("Input.dispatchKeyEvent", { type: "keyUp", key: "Escape", code: "Escape", windowsVirtualKeyCode: 27 });
  await sleep(4000);
  const closed = await ev(`!document.querySelector('[data-qa-panel="fixed"]')`);
  await ev(`document.querySelector('[data-qa-launcher]').click()`);
  await sleep(600);
  const st = await ev(`({answers:${D}.querySelectorAll('[data-qa-turn="nuova"]').length,typing:!!${D}.querySelector('.typing'),busy:${D}.querySelector('form button[type=submit]').getAttribute('aria-busy'),label:${D}.querySelector('form button[type=submit]').innerText})`);
  check("QT-10", "Escape closes the window and ends the waiting request; reopened, the box is idle and nothing was appended", closed && st.answers === before && !st.typing && st.busy !== "true" && st.label === "Enviar", { closed, before, ...st });
  await shot("m390-es-qa-reopened");
  ws.close();
} catch (e) {
  check("QT-00", "the run completed", false, String(e?.stack ?? e));
} finally {
  for (const k of kids) { try { k.kill(); } catch { /* gone */ } }
  results.finished_utc = new Date().toISOString();
  const pass = results.checks.filter((c) => c.pass).length;
  results.pass = pass; results.total = results.checks.length;
  writeFileSync(join(OUT, "qa-states-results.json"), JSON.stringify(results, null, 1));
  console.log(`${pass} passed, ${results.total - pass} failed -> ${join(OUT, "qa-states-results.json")}`);
  process.exit(pass === results.total ? 0 : 1);
}
