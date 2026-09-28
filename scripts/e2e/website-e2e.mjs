// Website end to end checks against a LOCAL build (stub mode) plus a local Q&A contract mock.
// No staging, no production, no backend host is contacted. Requires a prior `next build`.
// Usage: node scripts/e2e/website-e2e.mjs   (env EDGE overrides the Edge path, OUT the evidence folder)
// Writes <OUT>/e2e-results.json, <OUT>/qa-mock.log and screenshots. Exit code 1 if any check fails.
import { spawn } from "node:child_process";
import { randomBytes } from "node:crypto";
import { mkdirSync, rmSync, writeFileSync, readFileSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { deflateSync } from "node:zlib";

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
// A small solid PNG, built by hand so the harness needs no image dependency.
function makePng(w, h) {
  const crcTable = Array.from({ length: 256 }, (_, n) => { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; return c >>> 0; });
  const crc = (buf) => { let c = 0xffffffff; for (const b of buf) c = crcTable[(c ^ b) & 0xff] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; };
  const chunk = (type, data) => { const len = Buffer.alloc(4); len.writeUInt32BE(data.length); const td = Buffer.concat([Buffer.from(type), data]); const c = Buffer.alloc(4); c.writeUInt32BE(crc(td)); return Buffer.concat([len, td, c]); };
  const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4); ihdr[8] = 8; ihdr[9] = 2;
  const raw = Buffer.alloc((w * 3 + 1) * h);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) { const o = y * (w * 3 + 1) + 1 + x * 3; raw[o] = 31; raw[o + 1] = 42; raw[o + 2] = 68; }
  return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk("IHDR", ihdr), chunk("IDAT", deflateSync(raw)), chunk("IEND", Buffer.alloc(0))]);
}
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

  // ---- W1: onboarding BFF input and authorization refusals (stub build; the same guards run before any staging call) ----
  r = await post("/api/bff/onboarding/business", { timezone: "Europe/Madrid", languages: ["es"], default_language: "es", business_hours: { mon: "18:00-09:00" } }, stubCookie);
  j = await r.json();
  check("W1-01", "inverted opening hours are refused with the field named", r.status === 400 && j.details?.field === "business_hours.mon", { status: r.status, field: j.details?.field });
  r = await post("/api/bff/onboarding/business", { timezone: "Mars/Olympus", languages: ["es"], default_language: "es", business_hours: { mon: "09:00-18:00" } }, stubCookie);
  check("W1-02", "an unknown time zone is refused", r.status === 400, r.status);
  r = await post("/api/bff/onboarding/legal", { legal_name: "X", tax_id: "123", address_line: "a", address_city: "b", address_postal_code: "29600", privacy_url: "https://a.es/p", terms_url: "https://a.es/t" }, stubCookie);
  j = await r.json();
  check("W1-03", "an invalid tax number is refused before any call", r.status === 400 && j.details?.field === "tax_id", j.details);
  r = await post("/api/bff/onboarding/legal", { legal_name: "X", tax_id: "B12345678", address_line: "a", address_city: "b", address_postal_code: "29600", privacy_url: "javascript:alert(1)", terms_url: "https://a.es/t" }, stubCookie);
  j = await r.json();
  check("W1-04", "a non-https legal link is refused", r.status === 400 && j.details?.field === "privacy_url", j.details);
  r = await post("/api/bff/onboarding/calendar", { appointment_types: [{ type: "viewing", minutes: 30 }], no_calendar_fallback: { create_callback: false } }, stubCookie);
  check("W1-05", "switching off the callback fallback is refused (no request may be dropped)", r.status === 400, r.status);
  r = await post("/api/bff/branding/upload-init", { kind: "logo", filename: "x.svg", content_type: "image/svg+xml", size_bytes: 100 }, stubCookie);
  const svgStatus = r.status;
  r = await post("/api/bff/branding/upload-init", { kind: "logo", filename: "x.png", content_type: "image/png", size_bytes: 6 * 1024 * 1024 }, stubCookie);
  check("W1-06", "SVG and files over 5 MB are refused before any upload URL exists", svgStatus === 400 && r.status === 400, { svg: svgStatus, big: r.status });
  r = await post("/api/bff/branding/commit", { kind: "logo", object_path: "stub/logo/x.png" }, "");
  check("W1-07", "branding commit requires a session", r.status === 401, r.status);
  r = await post("/api/bff/crm/select", { provider: "google_sheets", intent: "select" }, stubCookie);
  j = await r.json();
  check("W1-13", "Google Sheets cannot be chosen server-side without the notice acknowledged first", r.status === 428 && j.code === "notice_required", { status: r.status, code: j.code });
  r = await post("/api/bff/branding/upload-init", { kind: "logo", filename: "x.gif", content_type: "image/gif", size_bytes: 1000 }, stubCookie);
  check("W1-14", "GIF is refused (v2 accepts PNG, JPEG, WebP)", r.status === 400, r.status);
  r = await post("/api/bff/consent/connect-notice", { source: "google_sheets", notice_version: "connect-notice-v0" }, stubCookie);
  check("W1-08", "an acknowledgement of an unknown notice version is refused", r.status === 400, r.status);
  r = await post("/api/bff/auth/set-password", { password: "a-long-password" }, "");
  j = await r.json();
  check("W1-09", "setting a password without a verified invite link is refused", r.status === 401 && j.code === "link_expired", j.code);
  r = await h("/api/bff/onboarding/business", { method: "POST", headers: { Origin: "https://evil.example", "Content-Type": "text/plain", Cookie: stubCookie }, body: "{}" });
  check("W1-10", "cross-origin onboarding writes are refused", r.status === 403, r.status);
  r = await h("/api/bff/onboarding/state", { headers: { Cookie: stubCookie } });
  j = await r.json();
  check("W1-11", "the onboarding read carries no tenant id", j.ok && j.details?.state?.client_id === "" && !JSON.stringify(j).includes("stub-client"), "client_id blanked");
  r = await h("/api/bff/onboarding/readiness", { headers: { Cookie: stubCookie } });
  j = await r.json();
  check("W1-12", "readiness is served as gate states from the readiness contract shape", j.ok && Array.isArray(j.details?.gates) && j.details.gates.every((g) => typeof g.gate_key === "string" && typeof g.status === "string"), j.details?.gates?.length);

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
  await send("DOM.enable");

  // B1 onboarding, stub case 3, mobile 390
  await mobile(390, 844);
  await nav(`${BASE}/api/bff/auth/login?stub=1&case=3&next=/en/onboarding`, 3500);
  const ob = await ev(`(()=>({h1:[...document.querySelectorAll('h1')].map(x=>x.innerText),crm:!!document.querySelector('[data-crm-choice]'),radios:[...document.querySelectorAll('[data-crm-choice] input[type=radio]')].map(x=>x.value),ribbon:document.querySelector('[data-env]')?.getAttribute('data-env')??null,text:document.body.innerText,sw:document.documentElement.scrollWidth,iw:innerWidth}))()`);
  check("B1-a", "onboarding has an h1 and the CRM choice with exactly the two selectable options", ob.h1.length === 1 && ob.crm && ob.radios.join(",") === "nuovasolution,google_sheets", { h1: ob.h1, radios: ob.radios });
  check("B1-b", "preview band (demonstration data) visible on the onboarding surface", ob.ribbon === "preview", ob.ribbon);
  const rawKeys = ["white_label_legal", "ai_disclosure", "staff_provisioned", "owner_admin", "business_hours", "px.experience", "externally_pending", "locked_by_plan"].filter((k) => ob.text.includes(k));
  check("WR-11", "no raw backend key is rendered", rawKeys.length === 0, rawKeys);
  check("WR-22", "no percentage number on onboarding", !/\d+\s?%/.test(ob.text), "step count shown instead");
  check("B1-c", "no horizontal overflow at 390 px", ob.sw <= ob.iw, { scrollWidth: ob.sw, innerWidth: ob.iw });
  results.screens = [await shot("m390-en-onboarding-case3")];

  // B2 choose Google Sheets: DRAFT notice first, acknowledgement required, then save, reload
  await ev(`document.querySelector('[data-crm-choice] input[value=google_sheets]').click()`);
  await sleep(300);
  const saveBtn = `[...document.querySelectorAll('[data-crm-choice] button')].find(b=>/Save choice/.test(b.innerText))`;
  const notice = await ev(`(()=>{const n=document.querySelector('[data-connect-notice]');return {version:n?.getAttribute('data-connect-notice'),draft:/DRAFT – not legally reviewed/.test(n?.innerText??''),slot:/⟦/.test(n?.innerText??''),pendingRows:n?.querySelectorAll('[data-pending=legal_review]').length??0,disabled:${saveBtn}.disabled}})()`);
  check("W2-09", "Sheets shows the DRAFT notice above the button, no open slot rendered, save blocked until acknowledged", notice.version === "connect-notice-v1-draft" && notice.draft && !notice.slot && notice.pendingRows === 3 && notice.disabled, notice);
  await ev(`document.querySelector('[data-connect-ack]').click()`);
  await ev(`document.querySelector('[data-connect-notice]').scrollIntoView({block:'start'})`);
  await sleep(300);
  results.screens.push(await shot("m390-en-onboarding-sheets-notice"));
  await ev(`${saveBtn}.click()`);
  const saved = await waitFor(`document.querySelector('[data-crm-msg=ok]')?.innerText.includes('Saved')`);
  await nav(`${BASE}/en/onboarding`, 3000);
  const after = await ev(`(()=>({checked:document.querySelector('[data-crm-choice] input:checked')?.value,done:document.querySelector('[data-crm-of-record]')?.innerText,sheets:document.querySelector('[data-sheets-state]')?.getAttribute('data-sheets-state'),sheetsText:document.querySelector('[data-sheets-state]')?.innerText}))()`);
  check("W2-07", "choice saved, and a reload shows the same choice", saved && after.checked === "google_sheets" && /CRM included in Nuova/.test(after.done ?? ""), after);
  check("W2-10", "Google Sheets reads 'chosen, not connected', never 'connected'", after.sheets === "chosen_not_connected" && /Chosen, not connected/.test(after.sheetsText ?? "") && !/^Connected/m.test(after.sheetsText ?? ""), after.sheetsText);

  // B3 register interest for HubSpot
  await ev(`[...document.querySelectorAll('[data-crm-choice] button')].find(b=>/I use HubSpot/.test(b.innerText)).click()`);
  const interest = await waitFor(`/We will tell you when HubSpot can be connected/.test(document.querySelector('[data-crm-msg=ok]')?.innerText??'')`);
  check("W2-08", "naming HubSpot records interest only, with the built-in CRM kept", interest, "interest message shown");
  await ev(`document.querySelector('[data-crm-choice]').scrollIntoView({block:'start'})`);
  await sleep(400);
  results.screens.push(await shot("m390-en-onboarding-crm-after"));

  // B8 setup sections: business + hours, legal, logo upload with light/dark preview, calendar; save, reload, readiness
  const setVal = (sel, v) => ev(`(()=>{const e=document.querySelector(${JSON.stringify(sel)});const proto=e.tagName==='SELECT'?HTMLSelectElement.prototype:HTMLInputElement.prototype;Object.getOwnPropertyDescriptor(proto,'value').set.call(e,${JSON.stringify(v)});e.dispatchEvent(new Event('input',{bubbles:true}));e.dispatchEvent(new Event('change',{bubbles:true}));})()`);
  const submitIn = (sec) => ev(`document.querySelector('[data-setup-section=${sec}] button[type=submit]').click()`);
  const okIn = (sec) => waitFor(`!!document.querySelector('[data-setup-section=${sec}] [data-setup-msg=ok]')`);
  const before = await ev(`(()=>({missing:document.querySelector('[data-legal-missing]')?.getAttribute('data-legal-missing'),fallback:document.querySelectorAll('[data-text-fallback]').length,wl:document.querySelector('[data-gate=white_label_legal]')?.getAttribute('data-gate-status'),bh:document.querySelector('[data-gate=business_hours]')?.getAttribute('data-gate-status')}))()`);
  check("B8-a", "fresh profile: legal fields missing, agency name shown as text fallback on both previews, gates blocked", before.missing?.includes("tax_id") && before.fallback === 2 && before.wl === "BLOCKED" && before.bh === "BLOCKED", before);
  await ev(`document.querySelector('[data-lang=en]').click()`);
  await submitIn("setup-business");
  const bizOk = await okIn("setup-business");
  for (const [n, v] of Object.entries({ legal_name: "Demo Agency S.L. (stub)", tax_id: "B12345678", address_line: "Calle Ejemplo 1", address_postal_code: "29600", address_city: "Marbella", privacy_url: "https://demo-agency.example/privacidad", terms_url: "https://demo-agency.example/terminos" })) await setVal(`[data-setup-section=setup-legal] input[name=${n}]`, v);
  await submitIn("setup-legal");
  const legalOk = await okIn("setup-legal");
  // logo: a real 96x48 PNG file through the file input (stub stores no bytes and shows its labelled demo logo)
  const png = join(tmpdir(), `nuova-e2e-logo-${Date.now()}.png`);
  writeFileSync(png, makePng(96, 48));
  const docRoot = await send("DOM.getDocument", { depth: -1 });
  const inp = await send("DOM.querySelector", { nodeId: docRoot.result.root.nodeId, selector: "[data-logo-input=logo]" });
  await send("DOM.setFileInputFiles", { nodeId: inp.result.nodeId, files: [png] });
  const logoOk = await waitFor(`document.querySelectorAll('[data-logo-img]').length===2`);
  // v2 §3: optional variant for dark backgrounds, then the contrast flag
  const doc2 = await send("DOM.getDocument", { depth: -1 });
  const inpDark = await send("DOM.querySelector", { nodeId: doc2.result.root.nodeId, selector: "[data-logo-input=logo_dark]" });
  await send("DOM.setFileInputFiles", { nodeId: inpDark.result.nodeId, files: [png] });
  const darkOk = await waitFor(`!!document.querySelector('[data-preview=dark] [data-logo-img=dark]')`);
  results.screens.push(await (async () => { await ev(`document.querySelector('[data-setup-section=setup-branding]').scrollIntoView({block:'start'})`); await sleep(300); return shot("m390-en-setup-branding-dark-variant"); })());
  await ev(`fetch('/api/bff/branding/remove',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({kind:'logo_dark'})})`);
  await nav(`${BASE}/en/onboarding`, 3000);
  await ev(`document.querySelector('[data-needs-light]').click()`);
  const chipOk = await waitFor(`!!document.querySelector('[data-preview=dark] [data-light-chip=yes]')`);
  check("B8-f", "dark-variant upload shows on the dark preview; without it, the contrast flag puts the logo on a light chip", darkOk && chipOk, { darkOk, chipOk });
  await ev(`document.querySelector('[data-setup-section=setup-calendar] [data-appointment=valuation] input').click()`);
  await submitIn("setup-calendar");
  const calOk = await okIn("setup-calendar");
  check("B8-b", "business, legal, logo and calendar each save and show the read-back state", bizOk && legalOk && logoOk && calOk, { bizOk, legalOk, logoOk, calOk });
  await ev(`document.querySelector('[data-setup-section=setup-branding]').scrollIntoView({block:'start'})`);
  await sleep(300);
  results.screens.push(await shot("m390-en-setup-branding-light-dark"));
  await nav(`${BASE}/en/onboarding`, 3000);
  const reload = await ev(`(()=>({missing:document.querySelector('[data-legal-missing]')?.getAttribute('data-legal-missing'),logos:document.querySelectorAll('[data-logo-img]').length,previews:[...document.querySelectorAll('[data-preview]')].map(p=>p.getAttribute('data-preview')),tax:document.querySelector('[data-setup-section=setup-legal] input[name=tax_id]')?.value,en:document.querySelector('[data-lang=en]')?.checked,val:document.querySelector('[data-appointment=valuation] input')?.checked,wl:document.querySelector('[data-gate=white_label_legal]')?.getAttribute('data-gate-status'),bh:document.querySelector('[data-gate=business_hours]')?.getAttribute('data-gate-status'),ai:document.querySelector('[data-gate=ai_disclosure]')?.getAttribute('data-gate-status'),act:document.querySelector('[data-activatable]')?.getAttribute('data-activatable'),sw:document.documentElement.scrollWidth,iw:innerWidth}))()`);
  check("B8-c", "after reload: every saved value is back, logo on light and dark previews", reload.missing === "" && reload.logos === 2 && reload.previews.join(",") === "light,dark" && reload.tax === "B12345678" && reload.en && reload.val, reload);
  check("B8-d", "readiness follows the saved data: legal and hours ready, the AI notice gate still blocks, not activatable", reload.wl === "READY" && reload.bh === "READY" && reload.ai === "BLOCKED" && reload.act === "no", { wl: reload.wl, bh: reload.bh, ai: reload.ai, act: reload.act });
  check("B8-e", "no horizontal overflow at 390 px with the setup sections", reload.sw <= reload.iw, { sw: reload.sw, iw: reload.iw });
  await ev(`document.querySelector('[data-setup-section=setup-readiness]').scrollIntoView({block:'start'})`);
  await sleep(300);
  results.screens.push(await shot("m390-en-setup-readiness"));

  // B10 sign-up -> (stub confirmation) -> registration step -> onboarding
  await ev(`fetch('/api/bff/auth/logout',{method:'POST'})`);
  await nav(`${BASE}/en/signup`, 3000);
  for (const [n, v] of Object.entries({ name: "Stub Owner", agency_name: "Registered Agency (stub)", email: "owner@agency.example", password: "a-long-password" })) await setVal(`form input[name=${n}]`, v);
  await ev(`document.querySelector('form button[type=submit]').click()`);
  const reg = await waitFor(`!!document.querySelector('[data-register]')`);
  const regName = await ev(`document.querySelector('[data-register] input[name=agency_name]')?.value`);
  await ev(`document.querySelector('[data-register] button[type=submit]').click()`);
  const regDone = await waitFor(`!!document.querySelector('[data-onboarding-setup]')`);
  check("B10", "sign-up leads to the registration step, and registering opens the agency setup", reg && regDone && typeof regName === "string", { reg, regDone });

  // B9 invite link: fragment token -> verified server-side -> fragment gone -> set password -> onboarding
  await ev(`fetch('/api/bff/auth/logout',{method:'POST'})`);
  await nav(`${BASE}/es#access_token=stub&type=invite&expires_in=3600`, 3500);
  const inv = await ev(`({path:location.pathname,hash:location.hash,form:!!document.querySelector('[data-set-password]')})`);
  check("B9-a", "the invite fragment is removed from the address bar and the set-password form appears", inv.path === "/es/welcome" && inv.hash === "" && inv.form, inv);
  await setVal("[data-set-password] input[name=password]", "una-contraseña-larga");
  await setVal("[data-set-password] input[name=confirm]", "una-contraseña-larga");
  await ev(`document.querySelector('[data-set-password] button[type=submit]').click()`);
  const landed = await waitFor(`location.pathname==='/es/onboarding'`);
  check("B9-b", "setting the password opens the onboarding with a session", landed, "landed on /es/onboarding");
  await nav(`${BASE}/en#error=access_denied&error_code=otp_expired`, 3000);
  const exp = await ev(`({path:location.pathname+location.search,state:document.querySelector('[data-welcome-state]')?.getAttribute('data-welcome-state')})`);
  check("B9-c", "an expired link says so and offers login, no form", exp.path === "/en/welcome?state=expired" && exp.state === "expired", exp);

  // B4 Q&A widget against the contract mock: accept, poll, answer, focus handling
  await nav(`${BASE}/en`, 3000);
  await ev(`document.querySelector('[data-qa-launcher]').click()`);
  await sleep(400);
  const focusIn = await ev(`document.activeElement?.tagName==='TEXTAREA'`);
  check("WR-17a", "opening the Q&A panel moves focus into it", focusIn, "textarea focused");
  await ev(`(()=>{const t=document.querySelector('[role=dialog] textarea');const set=Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,'value').set;set.call(t,'Does Nuova work with WhatsApp?');t.dispatchEvent(new Event('input',{bubbles:true}));})()`);
  await ev(`document.querySelector('[role=dialog] form button[type=submit]').click()`);
  // The home page also embeds an inline Q&A window; the launcher's window is the dialog.
  const answered = await waitFor(`/MOCK ANSWER/.test(document.querySelector('[role=dialog] [role=log]')?.innerText??'')`, 20000);
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
  for (const path of ["/en", "/es", "/en/trial", "/es/trial", "/en/platform/lead-intelligence", "/es/platform/lead-intelligence", "/en/platform/crm", "/en/platform/daily-assistant", "/en/contact", "/en/packages"]) {
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
