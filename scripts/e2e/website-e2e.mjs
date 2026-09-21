// Website end to end checks against a LOCAL build (stub mode) plus a local Q&A contract mock.
// No staging, no production, no backend host is contacted. Requires a prior `next build`.
// Usage: node scripts/e2e/website-e2e.mjs   (env EDGE overrides the Edge path, OUT the evidence folder)
// Writes <OUT>/e2e-results.json, <OUT>/qa-mock.log and screenshots. Exit code 1 if any check fails.
import { spawn } from "node:child_process";
import { randomBytes } from "node:crypto";
import { mkdirSync, rmSync, writeFileSync, readFileSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const ROOT = new URL("../../", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const OUT = process.env.OUT ?? join(ROOT, "docs", "website_redesign", "evidence_2026-09-21");
const EDGE = process.env.EDGE ?? "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const NEXT = join(ROOT, "node_modules", "next", "dist", "bin", "next");
const PORT = 3107, PORT_PROD = 3108, MOCK_PORT = 3998, CDP_PORT = 9335;
const BASE = `http://localhost:${PORT}`;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
mkdirSync(OUT, { recursive: true });

const results = { started_utc: new Date().toISOString(), commit: process.env.E2E_COMMIT ?? "working tree", mode: "stub build + local Q&A contract mock", checks: [] };
const check = (id, what, pass, evidence) => {
  results.checks.push({ id, what, pass: Boolean(pass), evidence });
  console.log(`${pass ? "PASS" : "FAIL"} ${id} ${what}`);
};
const kids = [];
const start = (cmd, args, env) => {
  const p = spawn(cmd, args, { cwd: ROOT, env: { ...process.env, ...env }, stdio: ["ignore", "pipe", "pipe"] });
  p.stdout.on("data", () => {});
  p.stderr.on("data", () => {});
  kids.push(p);
  return p;
};
const waitHttp = async (url) => {
  for (let i = 0; i < 120; i++) {
    try { const r = await fetch(url, { redirect: "manual" }); if (r.status) return true; } catch { /* not up */ }
    await sleep(500);
  }
  throw new Error(`not reachable: ${url}`);
};
const cookieOf = (res) => (res.headers.getSetCookie?.() ?? []).map((c) => c.split(";")[0]).join("; ");

try {
  // ---- local services ----
  const secret = randomBytes(32).toString("hex"); // throwaway, never written anywhere
  const mockLog = join(OUT, "qa-mock.log");
  rmSync(mockLog, { force: true });
  start(process.execPath, [join(ROOT, "scripts", "e2e", "qa-contract-mock.mjs")], { MOCK_SECRET: secret, MOCK_TENANT: "e2e_tenant", MOCK_PORT: String(MOCK_PORT), MOCK_LOG: mockLog });
  const qaEnv = { QA_INTAKE_URL: `http://127.0.0.1:${MOCK_PORT}/webhook/website-qa`, QA_TENANT_ID: "e2e_tenant", QA_TENANT_HMAC_SECRET: secret };
  start(process.execPath, [NEXT, "start", "-p", String(PORT)], qaEnv);
  start(process.execPath, [NEXT, "start", "-p", String(PORT_PROD)], { VERCEL_ENV: "production" });
  await waitHttp(`${BASE}/en`);
  await waitHttp(`http://localhost:${PORT_PROD}/en`);

  // ---- HTTP: review reproductions ----
  const h = (path, init = {}) => fetch(`${BASE}${path}`, { redirect: "manual", ...init });
  let r = await h("/api/bff/auth/login?stub=1&next=/%5Cevil.example/x");
  check("WR-05a", "backslash next does not leave the origin", r.status === 303 && new URL(r.headers.get("location"), BASE).host === `localhost:${PORT}`, r.headers.get("location"));
  r = await h("/api/bff/auth/login?stub=1&next=/%09/evil.example");
  check("WR-05b", "tab next does not leave the origin", new URL(r.headers.get("location"), BASE).host === `localhost:${PORT}`, r.headers.get("location"));
  r = await h("/api/bff/auth/login?stub=1&next=/es/onboarding");
  check("WR-05c", "legitimate locale next is kept", new URL(r.headers.get("location"), BASE).pathname === "/es/onboarding", r.headers.get("location"));
  const stubCookie = cookieOf(r);

  r = await h("/en/connect/callback?provider=hubspot&status=success");
  let html = await r.text();
  check("WR-09a", "forged status=success never renders connected", !/is connected|está conectado/.test(html) && /data-callback-reason="unknown"/.test(html), "reason=unknown rendered");
  r = await h("/en/connect/callback?provider=hubspot&status=error&reason=user_cancelled");
  html = await r.text();
  check("WR-09b", "user_cancelled renders the neutral cancellation", /data-callback-reason="user_cancelled"/.test(html), "reason=user_cancelled");
  r = await h("/en/connect/callback?provider=%3Cscript%3E&status=error&reason=provider_error");
  html = await r.text();
  check("WR-09c", "an unknown provider name is never echoed", !html.includes("&lt;script&gt;") && !html.includes("<script>alert"), "fallback provider name");

  r = await h("/api/bff/auth/logout", { method: "POST" });
  const setCookies = r.headers.getSetCookie?.() ?? [];
  check("WR-12", "logout clears nuova_refresh on its own path", setCookies.some((c) => /^nuova_refresh=;/.test(c) && /Path=\/api\/bff\/auth/i.test(c)), setCookies.filter((c) => c.startsWith("nuova_refresh")));

  r = await h("/api/bff/auth/login", { method: "POST", headers: { Origin: "https://evil.example", "Content-Type": "text/plain" }, body: JSON.stringify({ email: "a@b.c", password: "x" }) });
  check("WR-19", "cross-origin login POST is refused", r.status === 403, r.status);

  r = await h("/api/bff/crm/catalog");
  let j = await r.json();
  const providers = j.details?.providers ?? [];
  check("W2-01", "CRM catalog: 9 entries, only built-in and Google Sheets selectable", providers.length === 9 && providers.filter((p) => p.selectable).map((p) => p.provider).join(",") === "nuovasolution,google_sheets", providers.map((p) => `${p.provider}:${p.availability}`));
  check("W2-02", "backend note is never passed to the browser", providers.every((p) => !("note" in p)), "no note field");

  const post = (path, body, cookie) => h(path, { method: "POST", headers: { "Content-Type": "application/json", Cookie: cookie }, body: JSON.stringify(body) });
  r = await post("/api/bff/crm/select", { provider: "hubspot", intent: "select" }, stubCookie);
  check("W2-03", "an external CRM cannot be selected as connected", r.status === 409, r.status);
  r = await post("/api/bff/crm/select", { provider: "gohighlevel", intent: "interest" }, stubCookie);
  check("W2-04", "an unavailable CRM cannot register interest", r.status === 409, r.status);
  r = await post("/api/bff/crm/select", { provider: "notion", intent: "select" }, stubCookie);
  check("W2-05", "a provider outside the catalog is refused", r.status === 400, r.status);
  r = await post("/api/bff/crm/select", { provider: "nuovasolution", intent: "select" }, "");
  check("W2-06", "CRM choice requires a session", r.status === 401, r.status);

  r = await h("/sitemap.xml");
  const sm = await r.text();
  check("WR-21", "sitemap does not advertise unreviewed legal placeholders", !sm.includes("/legal/"), `${(sm.match(/<loc>/g) ?? []).length} urls`);

  r = await post("/api/qa", { question: "x".repeat(4001), locale: "en" }, "");
  check("QA-01", "a question over 4000 characters is refused before sending", r.status === 422, r.status);

  // ---- stub refusal in a public production deployment (WR-06) ----
  const hp = (path, init = {}) => fetch(`http://localhost:${PORT_PROD}${path}`, { redirect: "manual", ...init });
  const a = await hp("/api/bff/auth/login?stub=1&next=/en/onboarding");
  const b = await hp("/api/bff/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: "a@b.c", password: "longpassword" }) });
  const c = await hp("/api/bff/signup", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: "A", email: "a@b.c", password: "longpassword", language: "en", agency_name: "X" }) });
  check("WR-06", "with VERCEL_ENV=production no stub session or stub account can be created", a.status === 404 && b.status === 404 && c.status === 404 && !cookieOf(b).includes("nuova_session"), { stubGet: a.status, login: b.status, signup: c.status });

  // ---- browser flows through Edge DevTools protocol ----
  const prof = join(tmpdir(), `nuova-e2e-${Date.now()}`);
  const edge = spawn(EDGE, ["--headless=new", "--disable-gpu", "--no-first-run", `--user-data-dir=${prof}`, `--remote-debugging-port=${CDP_PORT}`, "about:blank"], { stdio: "ignore" });
  kids.push(edge);
  let list;
  for (let i = 0; i < 60; i++) { try { list = await (await fetch(`http://127.0.0.1:${CDP_PORT}/json`)).json(); break; } catch { await sleep(500); } }
  const ws = new WebSocket(list.find((t) => t.type === "page").webSocketDebuggerUrl);
  await new Promise((res) => ws.addEventListener("open", res));
  let mid = 0;
  const pend = new Map();
  ws.addEventListener("message", (e) => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } });
  const send = (method, params = {}) => new Promise((res) => { const i = ++mid; pend.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
  const ev = async (x) => (await send("Runtime.evaluate", { expression: x, returnByValue: true, awaitPromise: true })).result?.result?.value;
  const shot = async (name) => { const s = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: false }); writeFileSync(join(OUT, `${name}.png`), Buffer.from(s.result.data, "base64")); return `${name}.png`; };
  const nav = async (url, wait = 2500) => { await send("Page.navigate", { url }); await sleep(wait); };
  const waitFor = async (expr, ms = 15000) => { const t = Date.now(); while (Date.now() - t < ms) { if (await ev(expr)) return true; await sleep(300); } return false; };
  const mobile = (w, hgt) => send("Emulation.setDeviceMetricsOverride", { width: w, height: hgt, deviceScaleFactor: 2, mobile: true });
  const desktop = () => send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  await send("Page.enable");
  await send("Runtime.enable");

  // B1 onboarding, stub case 3, mobile 390
  await mobile(390, 844);
  await nav(`${BASE}/api/bff/auth/login?stub=1&case=3&next=/en/onboarding`, 3500);
  const ob = await ev(`(()=>({h1:[...document.querySelectorAll('h1')].map(x=>x.innerText),crm:!!document.querySelector('[data-crm-choice]'),radios:[...document.querySelectorAll('[data-crm-choice] input[type=radio]')].map(x=>x.value),ribbon:document.querySelector('[data-env]')?.getAttribute('data-env')??null,text:document.body.innerText,sw:document.documentElement.scrollWidth,iw:innerWidth}))()`);
  check("B1-a", "onboarding has an h1 and the CRM choice with exactly the two selectable options", ob.h1.length === 1 && ob.crm && ob.radios.join(",") === "nuovasolution,google_sheets", { h1: ob.h1, radios: ob.radios });
  check("B1-b", "stub band visible on the onboarding surface", ob.ribbon === "stub", ob.ribbon);
  const rawKeys = ["white_label_legal", "ai_disclosure", "staff_provisioned", "owner_admin", "business_hours", "px.experience", "externally_pending", "locked_by_plan"].filter((k) => ob.text.includes(k));
  check("WR-11", "no raw backend key is rendered", rawKeys.length === 0, rawKeys);
  check("WR-22", "no percentage number on onboarding", !/\d+\s?%/.test(ob.text), "step count shown instead");
  check("B1-c", "no horizontal overflow at 390 px", ob.sw <= ob.iw, { scrollWidth: ob.sw, innerWidth: ob.iw });
  results.screens = [await shot("m390-en-onboarding-case3")];

  // B2 choose Google Sheets, save, reload: the same state comes back
  await ev(`document.querySelector('[data-crm-choice] input[value=google_sheets]').click()`);
  await ev(`[...document.querySelectorAll('[data-crm-choice] button')].find(b=>/Save choice/.test(b.innerText)).click()`);
  const saved = await waitFor(`document.querySelector('[data-crm-msg=ok]')?.innerText.includes('Saved')`);
  await nav(`${BASE}/en/onboarding`, 3000);
  const after = await ev(`(()=>({checked:document.querySelector('[data-crm-choice] input:checked')?.value,done:document.querySelector('[data-crm-of-record]')?.innerText}))()`);
  check("W2-07", "choice saved, and a reload shows the same choice", saved && after.checked === "google_sheets" && /Google Sheets/.test(after.done ?? ""), after);

  // B3 register interest for HubSpot
  await ev(`[...document.querySelectorAll('[data-crm-choice] button')].find(b=>/I use HubSpot/.test(b.innerText)).click()`);
  const interest = await waitFor(`/We will tell you when HubSpot can be connected/.test(document.querySelector('[data-crm-msg=ok]')?.innerText??'')`);
  check("W2-08", "naming HubSpot records interest only, with the built-in CRM kept", interest, "interest message shown");
  await ev(`document.querySelector('[data-crm-choice]').scrollIntoView({block:'start'})`);
  await sleep(400);
  results.screens.push(await shot("m390-en-onboarding-crm-after"));

  // B4 Q&A widget against the contract mock: accept, poll, answer, focus handling
  await nav(`${BASE}/en`, 3000);
  await ev(`document.querySelector('[data-qa-launcher]').click()`);
  await sleep(400);
  const focusIn = await ev(`document.activeElement?.tagName==='TEXTAREA'`);
  check("WR-17a", "opening the Q&A panel moves focus into it", focusIn, "textarea focused");
  await ev(`(()=>{const t=document.querySelector('[role=dialog] textarea');const set=Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,'value').set;set.call(t,'Does Nuova work with WhatsApp?');t.dispatchEvent(new Event('input',{bubbles:true}));})()`);
  await ev(`document.querySelector('[role=dialog] form button[type=submit]').click()`);
  const answered = await waitFor(`/MOCK ANSWER/.test(document.querySelector('[role=log]')?.innerText??'')`, 20000);
  check("WR-07/08", "question accepted (202), polled, and the answer rendered", answered, "answer from the local contract mock");
  results.screens.push(await shot("m390-en-qa-answered"));
  await send("Input.dispatchKeyEvent", { type: "keyDown", key: "Escape", code: "Escape", windowsVirtualKeyCode: 27 });
  await send("Input.dispatchKeyEvent", { type: "keyUp", key: "Escape", code: "Escape", windowsVirtualKeyCode: 27 });
  await sleep(300);
  const focusBack = await ev(`document.activeElement?.hasAttribute('data-qa-launcher')`);
  check("WR-17b", "Escape returns focus to the launcher", focusBack, "launcher focused");

  // B5 Spanish onboarding uses Spanish step titles; B6 360 px Spanish CRM page does not overflow
  await nav(`${BASE}/es/onboarding`, 3000);
  const es = await ev(`document.body.innerText`);
  check("B5", "Spanish onboarding renders Spanish step titles", /Datos de la agencia/.test(es) && /Dónde se guardan tus leads/.test(es), "es titles present");
  await mobile(360, 800);
  await nav(`${BASE}/es/platform/crm`, 3000);
  const crm360 = await ev(`({sw:document.documentElement.scrollWidth,iw:innerWidth})`);
  check("WR-15", "no horizontal overflow at 360 px on /es/platform/crm", crm360.sw <= crm360.iw, crm360);
  results.screens.push(await shot("m360-es-platform-crm"));

  // B7 claims: no forbidden public wording on the rendered pages
  await desktop();
  const forbidden = [];
  for (const path of ["/en", "/es", "/en/trial", "/es/trial", "/en/platform/lead-intelligence", "/es/platform/lead-intelligence", "/en/platform/voice", "/en/platform/property-matching", "/en/contact", "/en/packages"]) {
    await nav(`${BASE}${path}`, 2200);
    const t = await ev(`document.body.innerText`);
    for (const re of [/hot lead/i, /lead caliente/i, /21 days/i, /21 días/i, /nine languages/i, /nueve idiomas/i, /three properties/i, /tres propiedades/i, /honest video/i]) if (re.test(t)) forbidden.push(`${path}: ${re}`);
  }
  check("WR-04", "no forbidden claim wording on ten public pages, EN and ES", forbidden.length === 0, forbidden);
  results.screens.push(await shot("d1440-en-packages"));

  ws.close();

  // Mock verdicts: every accepted call carried a valid signature and a session_id
  const lines = existsSync(mockLog) ? readFileSync(mockLog, "utf8").trim().split("\n").map((l) => JSON.parse(l)) : [];
  const posts = lines.filter((l) => l.op === "POST");
  const gets = lines.filter((l) => l.op === "GET");
  check("QA-02", "every POST passed the ingress contract (signature, freshness, nonce, tenant, session_id, only contract fields)", posts.length > 0 && posts.every((l) => l.verdict === 202), posts.map((l) => l.verdict));
  check("QA-03", "result polls were signed over the canonical query and resolved pending then answered", gets.some((l) => l.verdict === "200 pending") && gets.some((l) => l.verdict === "200 answered") && gets.every((l) => l.checks.signature), gets.map((l) => l.verdict));
} catch (e) {
  check("RUNNER", "the harness itself completed", false, String(e?.stack ?? e));
} finally {
  for (const k of kids) { try { k.kill(); } catch { /* already gone */ } }
  results.finished_utc = new Date().toISOString();
  results.passed = results.checks.filter((c) => c.pass).length;
  results.failed = results.checks.filter((c) => !c.pass).length;
  writeFileSync(join(OUT, "e2e-results.json"), JSON.stringify(results, null, 1));
  console.log(`\n${results.passed} passed, ${results.failed} failed -> ${join(OUT, "e2e-results.json")}`);
  process.exit(results.failed ? 1 : 0);
}
