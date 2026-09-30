// Owner resume on the deployed STAGING preview (owner order 2026-09-29 D; RECONCILIATION_2026-09-29 row 6):
// a CONFIRMED identity WITHOUT an agency logs in, is shown the registration step (no sign-up, no second
// e-mail), names the agency once, lands in the onboarding, and after a reload is still the one admin of
// that one agency.
//
// It needs a staging identity in exactly that state, delivered to the secure store as
//   stg_web_resume_fixture.txt   (line 1 e-mail, line 2 password)
// The owner's own identity is never used here. Nothing is printed or written from that file.
//
// Two stages, so that nothing is created by accident:
//   BASE=https://<staging preview> node scripts/e2e/owner-resume-browser.mjs            read only: login → registration step shown
//   BASE=… RUN_REGISTER=1 node scripts/e2e/owner-resume-browser.mjs                     also names the agency (creates ONE staging agency)
// Exit code 2 when the fixture is missing (a dependency, not a failure), 1 when a check fails.
import { spawn } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const ROOT = new URL("../../", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const OUT = process.env.OUT ?? join(ROOT, "docs", "website_redesign", "evidence_2026-09-29", "owner_resume");
const EDGE = process.env.EDGE ?? "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const BASE = (process.env.BASE ?? "").replace(/\/$/, "");
const FIXTURE = process.env.RESUME_FIXTURE ?? "C:/Users/Usuario/.nuova-secrets/stg_web_resume_fixture.txt";
const REGISTER = process.env.RUN_REGISTER === "1";
const LOCALE = process.env.LOCALE === "en" ? "en" : "es"; // the owner continues on /es/login
const CDP_PORT = 9366;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
if (!BASE.startsWith("https://")) { console.log("BASE=https://<staging preview> is required"); process.exit(1); }
mkdirSync(OUT, { recursive: true });

const results = { started_utc: new Date().toISOString(), base: BASE, locale: LOCALE, register: REGISTER, commit: process.env.E2E_COMMIT ?? null, deployment: process.env.E2E_DEPLOYMENT ?? null, checks: [] };
const finish = (code) => { results.finished_utc = new Date().toISOString(); writeFileSync(join(OUT, "owner-resume-results.json"), JSON.stringify(results, null, 1)); process.exit(code); };
if (!existsSync(FIXTURE)) {
  results.blocked = "no confirmed staging identity without an agency in the secure store (stg_web_resume_fixture.txt)";
  console.log(`BLOCKED ${results.blocked}`);
  finish(2);
}
const [email, password] = readFileSync(FIXTURE, "utf8").split(/\r?\n/).map((l) => l.trim());
const scrub = (s) => String(s).split(password).join("[hidden]").split(email).join("[hidden]");
const check = (id, what, pass, evidence) => { results.checks.push({ id, what, pass: Boolean(pass), evidence }); console.log(`${pass ? "PASS" : "FAIL"} ${id} ${what}`); };

const kids = [];
try {
  const prof = join(tmpdir(), `nuova-resume-${Date.now()}`);
  kids.push(spawn(EDGE, ["--headless=new", "--disable-gpu", "--no-first-run", "--hide-scrollbars", `--user-data-dir=${prof}`, `--remote-debugging-port=${CDP_PORT}`, "about:blank"], { stdio: "ignore" }));
  let list;
  for (let i = 0; i < 60; i++) { try { list = await (await fetch(`http://127.0.0.1:${CDP_PORT}/json`)).json(); break; } catch { await sleep(500); } }
  const ws = new WebSocket(list.find((t) => t.type === "page").webSocketDebuggerUrl);
  await new Promise((res) => ws.addEventListener("open", res));
  let mid = 0;
  const pend = new Map();
  const posts = [];
  ws.addEventListener("message", (e) => {
    const m = JSON.parse(e.data);
    if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); return; }
    if (m.method === "Network.requestWillBeSent" && m.params.request.method === "POST") posts.push(new URL(m.params.request.url).pathname);
  });
  const send = (method, params = {}) => new Promise((res) => { const i = ++mid; pend.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
  const ev = async (x) => (await send("Runtime.evaluate", { expression: x, returnByValue: true, awaitPromise: true })).result?.result?.value;
  const waitFor = async (x, ms = 30000) => { const t = Date.now(); while (Date.now() - t < ms) { if (await ev(x)) return true; await sleep(300); } return false; };
  const nav = async (url, ms = 3000) => { await send("Page.navigate", { url }); await sleep(ms); };
  const setVal = (sel, v) => ev(`(()=>{const e=document.querySelector(${JSON.stringify(sel)});if(!e)return false;Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(e,${JSON.stringify(v)});e.dispatchEvent(new Event('input',{bubbles:true}));e.dispatchEvent(new Event('change',{bubbles:true}));return true})()`);
  // No screenshot of the login form (it holds the address); the surfaces after it carry no credential.
  const shot = async (name) => { const s = await send("Page.captureScreenshot", { format: "png" }); if (s.result?.data) writeFileSync(join(OUT, `${name}.png`), Buffer.from(s.result.data, "base64")); };
  await send("Page.enable");
  await send("Runtime.enable");
  await send("Network.enable");
  await send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });

  await nav(`${BASE}/${LOCALE}/login`);
  const form = await ev(`!!document.querySelector('[data-login-form]')`);
  await setVal("[data-login-form] input[name=email]", email);
  await setVal("[data-login-form] input[name=password]", password);
  await ev(`document.querySelector('[data-login-form] button[type=submit]').click()`);
  const landed = await waitFor(`location.pathname==='/${LOCALE}/onboarding'`);
  check("OR-01", "the confirmed identity logs in on the HTTPS staging preview and is taken to the onboarding", form && landed, { landed: await ev("location.pathname") });

  const reg = await ev(`({register:!!document.querySelector('[data-onboarding-register]'),form:!!document.querySelector('[data-register]'),setup:!!document.querySelector('[data-onboarding-setup]'),problem:document.querySelector('[data-onboarding-problem]')?.getAttribute('data-onboarding-problem')??null})`);
  check("OR-02", "without an agency the page shows the registration step, not the setup and not an error", reg.register && reg.form && !reg.setup && !reg.problem, reg);
  check("OR-03", "continuing needs no sign-up and no second confirmation e-mail", !posts.some((p) => /\/api\/bff\/(signup|auth\/resend)$/.test(p)), { posts: [...new Set(posts)] });
  const state = await ev(`fetch('/api/bff/onboarding/state',{cache:'no-store'}).then(r=>r.json()).then(j=>({ok:j.ok,next:j.details?.next??null,hasTenantId:/stg_[a-z0-9_]+/.test(JSON.stringify(j))}))`);
  check("OR-04", "the state route says 'register' and carries no tenant id", state.ok && state.next === "register" && !state.hasTenantId, state);
  await shot(`d1440-${LOCALE}-resume-register`);

  if (REGISTER) {
    const name = `Agencia de prueba ${new Date().toISOString().slice(0, 10)}`;
    await setVal("[data-register] input[name=agency_name]", name);
    await ev(`document.querySelector('[data-register] button[type=submit]').click()`);
    const inSetup = await waitFor(`!!document.querySelector('[data-onboarding-setup]')`, 40000);
    check("OR-05", "naming the agency opens the agency setup", inSetup, { setup: inSetup });
    await nav(`${BASE}/${LOCALE}/onboarding`, 4000);
    const after = await ev(`({setup:!!document.querySelector('[data-onboarding-setup]'),register:!!document.querySelector('[data-onboarding-register]')})`);
    const st2 = await ev(`fetch('/api/bff/onboarding/state',{cache:'no-store'}).then(r=>r.json()).then(j=>({next:j.details?.next??null,steps:j.details?.state?.steps?.length??0,trial:!!j.details?.trial}))`);
    check("OR-06", "after a reload the same agency is there: setup shown, no registration step, trial present", after.setup && !after.register && st2.next === "onboarding" && st2.steps > 0 && st2.trial, { ...after, ...st2 });
    const again = await ev(`fetch('/api/bff/register',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({agency_name:${JSON.stringify(name + " 2")}})}).then(async r=>({status:r.status,code:(await r.json().catch(()=>({}))).code}))`);
    check("OR-07", "a second registration for the same identity creates no second agency", again.status !== 200 && again.status !== 201, again);
    await shot(`d1440-${LOCALE}-resume-onboarding`);
  }
  await ev(`fetch('/api/bff/auth/logout',{method:'POST'}).then(r=>r.status)`);
  ws.close();
} catch (e) {
  check("OR-00", "the run completed", false, scrub(e?.stack ?? e));
} finally {
  for (const k of kids) { try { k.kill(); } catch { /* gone */ } }
  const pass = results.checks.filter((c) => c.pass).length;
  results.pass = pass; results.total = results.checks.length;
  console.log(`${pass} passed, ${results.total - pass} failed`);
  results.finished_utc = new Date().toISOString();
  writeFileSync(join(OUT, "owner-resume-results.json"), scrub(JSON.stringify(results, null, 1)));
  process.exit(pass === results.total ? 0 : 1);
}
