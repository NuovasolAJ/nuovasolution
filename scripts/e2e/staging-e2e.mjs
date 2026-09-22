// Website STAGING end to end: a local production build in staging mode against the pinned staging
// project fflmmzapksycjfdcjdtd, driven through the real UI (Edge over DevTools protocol) plus HTTP
// negatives. Staging only: any other project ref aborts. No production host is contacted.
//
// Identities (WEBSITE_HANDOFF_v2 §1) are read from the secure store and never printed, logged,
// screenshotted or written anywhere: stg_web_e2e_owner.txt, stg_web_e2e_agent.txt,
// stg_web_e2e_other_owner.txt (line 1 e-mail, line 2 password). The publishable key comes from
// stg_publishable_key.txt; the website uses no secret key.
//
// Writes land only in the acceptance fixtures stg_web_e2e_agency_a1b523 (owner, agent) and read-only
// checks against stg_web_e2e_other_393a6e. End state left for the owner test: business, legal,
// calendar and logo set; CRM back on the built-in CRM; dark variant removed.
//
// Usage: node scripts/e2e/staging-e2e.mjs   (requires `NUOVA_INTEGRATION_MODE=staging next build` first;
//        env OUT = evidence folder, EDGE = browser path, SECRETS = secure store folder)
import { spawn } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { deflateSync } from "node:zlib";

const REF = "fflmmzapksycjfdcjdtd";
const ROOT = new URL("../../", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const OUT = process.env.OUT ?? join(ROOT, "docs", "website_redesign", "evidence_2026-09-22", "staging");
const SECRETS = process.env.SECRETS ?? "C:/Users/Usuario/.nuova-secrets";
const EDGE = process.env.EDGE ?? "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const NEXT = join(ROOT, "node_modules", "next", "dist", "bin", "next");
const PORT = 3121, CDP_PORT = 9351;
const BASE = `http://localhost:${PORT}`;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
mkdirSync(OUT, { recursive: true });
if (process.argv.join(" ").includes("ckxqzfoukcacvqzpagcm")) { console.error("ABORT: production ref"); process.exit(3); }

const cred = (f) => { const [email, password] = readFileSync(join(SECRETS, f), "utf8").split(/\r?\n/); return { email: email.trim(), password: password.trim() }; };
const OWNER = cred("stg_web_e2e_owner.txt"), AGENT = cred("stg_web_e2e_agent.txt"), OTHER = cred("stg_web_e2e_other_owner.txt");
const PUB = readFileSync(join(SECRETS, "stg_publishable_key.txt"), "utf8").trim();
if (!PUB.startsWith("sb_publishable_")) { console.error("ABORT: publishable key has the wrong type"); process.exit(3); }

const results = { started_utc: new Date().toISOString(), commit: process.env.E2E_COMMIT ?? "working tree", env: `staging ${REF}`, fixtures: { agency: "stg_web_e2e_agency_a1b523", second_agency: "stg_web_e2e_other_393a6e" }, checks: [], screens: [] };
const check = (id, what, pass, evidence) => { results.checks.push({ id, what, pass: Boolean(pass), evidence }); console.log(`${pass ? "PASS" : "FAIL"} ${id} ${what}`); };
const kids = [];

function makePng(w, h, rgb) {
  const t = Array.from({ length: 256 }, (_, n) => { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; return c >>> 0; });
  const crc = (b) => { let c = 0xffffffff; for (const x of b) c = t[(c ^ x) & 0xff] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; };
  const chunk = (ty, d) => { const l = Buffer.alloc(4); l.writeUInt32BE(d.length); const td = Buffer.concat([Buffer.from(ty), d]); const c = Buffer.alloc(4); c.writeUInt32BE(crc(td)); return Buffer.concat([l, td, c]); };
  const ih = Buffer.alloc(13); ih.writeUInt32BE(w, 0); ih.writeUInt32BE(h, 4); ih[8] = 8; ih[9] = 2;
  const raw = Buffer.alloc((w * 3 + 1) * h);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) { const o = y * (w * 3 + 1) + 1 + x * 3; const band = x < w / 3; raw[o] = band ? 200 : rgb[0]; raw[o + 1] = band ? 160 : rgb[1]; raw[o + 2] = band ? 60 : rgb[2]; }
  return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk("IHDR", ih), chunk("IDAT", deflateSync(raw)), chunk("IEND", Buffer.alloc(0))]);
}

// ---- HTTP helpers against the local BFF (never the backend directly) ----
const h = (path, init = {}) => fetch(`${BASE}${path}`, { redirect: "manual", ...init });
const cookieOf = (res) => (res.headers.getSetCookie?.() ?? []).map((c) => c.split(";")[0]).filter((c) => c.startsWith("nuova_")).join("; ");
const jpost = (path, body, cookie) => h(path, { method: "POST", headers: { "Content-Type": "application/json", Cookie: cookie ?? "" }, body: JSON.stringify(body) }).then(async (r) => ({ status: r.status, body: await r.json().catch(() => null), cookie: cookieOf(r) }));
const jget = (path, cookie) => h(path, { headers: { Cookie: cookie ?? "" } }).then(async (r) => ({ status: r.status, body: await r.json().catch(() => null) }));
const login = async (id) => { const r = await jpost("/api/bff/auth/login", { email: id.email, password: id.password }); return r.status === 200 ? r.cookie : null; };

try {
  const env = { NUOVA_INTEGRATION_MODE: "staging", NEXT_PUBLIC_SUPABASE_URL: `https://${REF}.supabase.co`, NEXT_PUBLIC_SUPABASE_ANON_KEY: PUB, NUOVA_STAGING_TARGET_APPROVED: REF, SUPABASE_SERVICE_ROLE_KEY: "", SUPABASE_SECRET_KEY: "", QA_INTAKE_URL: "" };
  {
    const p = spawn(process.execPath, [NEXT, "start", "-p", String(PORT)], { cwd: ROOT, env: { ...process.env, ...env }, stdio: "ignore" });
    kids.push(p);
    for (let i = 0; i < 120; i++) { try { await fetch(`${BASE}/en`); break; } catch { await sleep(500); } }
  }

  // ================= HTTP: authorization and tenant isolation =================
  let r = await jget("/api/bff/onboarding/state", "");
  check("N1", "no session: onboarding read refused (401)", r.status === 401, r.status);
  r = await jget("/api/bff/onboarding/state", "nuova_session=eyJhbGciOiJIUzI1NiJ9.e30.Zm9yZ2Vk");
  check("N2", "forged session token: refused (401 no_session)", r.status === 401 && r.body?.code === "no_session", { status: r.status, code: r.body?.code });
  const ownerCk = await login(OWNER), agentCk = await login(AGENT), otherCk = await login(OTHER);
  check("N3", "the three test identities sign in through the BFF (server-side GoTrue, httpOnly cookie)", Boolean(ownerCk && agentCk && otherCk), { owner: !!ownerCk, agent: !!agentCk, other: !!otherCk });
  r = await jpost("/api/bff/auth/login", { email: OWNER.email, password: "definitely-wrong-password" });
  check("N4", "wrong password: invalid_grant, no session cookie", r.status === 400 && r.body?.code === "invalid_grant" && !r.cookie.includes("nuova_session"), r.body?.code);

  const otherBefore = await jget("/api/bff/onboarding/state", otherCk);
  r = await jpost("/api/bff/onboarding/business", { client_id: "stg_web_e2e_other_393a6e", timezone: "Atlantic/Canary", languages: ["es", "en"], default_language: "es", business_hours: { mon: "09:00-18:00", tue: "09:00-18:00", wed: "09:00-18:00", thu: "09:00-18:00", fri: "09:00-17:00", sat: "closed", sun: "closed" } }, ownerCk);
  const otherAfter = await jget("/api/bff/onboarding/state", otherCk);
  check("N5", "a manipulated client_id is ignored: the owner's write lands in the owner's agency, the second agency is unchanged",
    r.status === 200 && r.body?.details?.profile?.business?.timezone === "Atlantic/Canary" && otherBefore.body?.details?.profile?.business?.timezone === otherAfter.body?.details?.profile?.business?.timezone,
    { owner_tz: r.body?.details?.profile?.business?.timezone, other_tz_before: otherBefore.body?.details?.profile?.business?.timezone, other_tz_after: otherAfter.body?.details?.profile?.business?.timezone });
  // The backend's public logo URL carries the tenant prefix in its storage path (bucket agency-branding); that
  // URL is the image itself and is rendered as-is. Everywhere else the id must be absent.
  const ids = /stg_web_e2e_(agency_a1b523|other_393a6e)/;
  const noAssets = (b) => JSON.stringify(b).replace(/https:\/\/[a-z]+\.supabase\.co\/storage\/v1\/object\/public\/agency-branding\/[^"]+/g, "<asset-url>");
  check("N6", "no tenant id in any onboarding read outside the backend's public asset URLs", !ids.test(noAssets(otherAfter.body)) && !ids.test(noAssets(r.body)) && otherAfter.body?.details?.state?.client_id === "", "ids absent outside asset URLs, client_id blanked");

  r = await jpost("/api/bff/onboarding/business", { timezone: "Europe/Madrid", languages: ["es"], default_language: "es", business_hours: { mon: "09:00-18:00" } }, agentCk);
  const agentWrite = r.status;
  r = await jpost("/api/bff/tenant/activate", {}, agentCk);
  const agentActivate = r.status;
  r = await jpost("/api/bff/branding/upload-init", { kind: "logo", filename: "x.png", content_type: "image/png", size_bytes: 1000 }, agentCk);
  check("N7", "agent role: setup write, activation and upload are refused (403 forbidden)", agentWrite === 403 && agentActivate === 403 && r.status === 403, { write: agentWrite, activate: agentActivate, upload: r.status });

  // foreign asset: the owner starts an upload, the second agency tries to commit it
  const png = makePng(240, 96, [31, 42, 68]);
  r = await jpost("/api/bff/branding/upload-init", { kind: "logo_dark", filename: "probe.png", content_type: "image/png", size_bytes: png.length }, ownerCk);
  const probe = r.body?.details;
  if (probe?.signed_upload_url) await fetch(probe.signed_upload_url, { method: "PUT", headers: { "Content-Type": "image/png" }, body: png });
  r = await jpost("/api/bff/branding/commit", { kind: "logo_dark", object_path: probe?.object_path }, otherCk);
  check("N8", "another agency cannot commit this agency's upload (403 cross_tenant_asset)", r.status === 403 && r.body?.code === "cross_tenant_asset", { status: r.status, code: r.body?.code });
  // bytes that are not the declared image: rejected and deleted by the server
  r = await jpost("/api/bff/branding/upload-init", { kind: "logo_dark", filename: "fake.png", content_type: "image/png", size_bytes: 600 }, ownerCk);
  if (r.body?.details?.signed_upload_url) await fetch(r.body.details.signed_upload_url, { method: "PUT", headers: { "Content-Type": "image/png" }, body: Buffer.alloc(600, 0x41) });
  r = await jpost("/api/bff/branding/commit", { kind: "logo_dark", object_path: r.body?.details?.object_path }, ownerCk);
  check("N9", "declared PNG with text bytes: rejected by the server's check of the stored bytes (422)", r.status === 422 && ["file_rejected", "unsupported_file_type"].includes(r.body?.code), { status: r.status, code: r.body?.code });
  r = await jpost("/api/bff/crm/select", { provider: "google_sheets", intent: "select" }, ownerCk);
  check("N10", "Google Sheets cannot be chosen without the notice acknowledgement (428)", r.status === 428, r.status);
  const ack = await jpost("/api/bff/consent/connect-notice", { source: "google_sheets", notice_version: "connect-notice-v1-draft" }, ownerCk);
  r = await jpost("/api/bff/crm/select", { provider: "google_sheets", intent: "select" }, `${ownerCk}; ${ack.cookie}`);
  check("N11", "with the acknowledgement recorded (website server log, no DB contract yet) the Sheets choice reaches tenant-api crm.select", ack.status === 200 && ack.body?.details?.recorded_in === "website_server_log" && r.status === 200 && r.body?.details?.result?.ok === true, { ack: ack.body?.details?.recorded_in, select: r.status, state: r.body?.details?.result?.state });
  r = await jpost("/api/bff/consent/connect-notice", { source: "google_sheets", notice_version: "connect-notice-v1-draft" }, agentCk);
  check("N12", "an agent cannot record the acknowledgement (403)", r.status === 403, r.status);

  // ================= Browser: the owner's chain through the UI =================
  const prof = join(tmpdir(), `nuova-stg-e2e-${Date.now()}`);
  kids.push(spawn(EDGE, ["--headless=new", "--disable-gpu", "--no-first-run", `--user-data-dir=${prof}`, `--remote-debugging-port=${CDP_PORT}`, "about:blank"], { stdio: "ignore" }));
  let list;
  for (let i = 0; i < 60; i++) { try { list = await (await fetch(`http://127.0.0.1:${CDP_PORT}/json`)).json(); break; } catch { await sleep(500); } }
  const ws = new WebSocket(list.find((t) => t.type === "page").webSocketDebuggerUrl);
  await new Promise((res) => ws.addEventListener("open", res));
  let mid = 0; const pend = new Map();
  ws.addEventListener("message", (e) => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } });
  const send = (method, params = {}) => new Promise((res) => { const i = ++mid; pend.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
  const ev = async (x) => (await send("Runtime.evaluate", { expression: x, returnByValue: true, awaitPromise: true })).result?.result?.value;
  const shot = async (name) => { const s = await send("Page.captureScreenshot", { format: "png" }); writeFileSync(join(OUT, `${name}.png`), Buffer.from(s.result.data, "base64")); results.screens.push(`${name}.png`); };
  const nav = async (url, wait = 4000) => { await send("Page.navigate", { url }); await sleep(wait); };
  const waitFor = async (expr, ms = 30000) => { const t = Date.now(); while (Date.now() - t < ms) { if (await ev(expr)) return true; await sleep(400); } return false; };
  const setVal = (sel, v) => ev(`(()=>{const e=document.querySelector(${JSON.stringify(sel)});const proto=e.tagName==='SELECT'?HTMLSelectElement.prototype:HTMLInputElement.prototype;Object.getOwnPropertyDescriptor(proto,'value').set.call(e,${JSON.stringify(v)});e.dispatchEvent(new Event('input',{bubbles:true}));e.dispatchEvent(new Event('change',{bubbles:true}));})()`);
  const scrollTo = async (sel) => { await ev(`document.querySelector(${JSON.stringify(sel)})?.scrollIntoView({block:'start'})`); await sleep(400); };
  const fileInto = async (sel, path) => { const d = await send("DOM.getDocument", { depth: -1 }); const n = await send("DOM.querySelector", { nodeId: d.result.root.nodeId, selector: sel }); await send("DOM.setFileInputFiles", { nodeId: n.result.nodeId, files: [path] }); };
  await send("Page.enable"); await send("Runtime.enable"); await send("DOM.enable");
  await send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });

  // S1 login through the form
  await nav(`${BASE}/en/login`);
  await setVal("form input[name=email]", OWNER.email);
  await setVal("form input[name=password]", OWNER.password);
  await ev(`document.querySelector('form button[type=submit]').click()`);
  const inOb = await waitFor(`location.pathname==='/en/onboarding' && !!document.querySelector('[data-onboarding-setup]')`);
  const ob = await ev(`({ribbon:document.querySelector('[data-env]')?.getAttribute('data-env'),steps:document.querySelectorAll('[id^=step-]').length,trial:document.body.innerText.match(/\\d+ days left in your trial|Last day of your trial/)?.[0]??null,sw:document.documentElement.scrollWidth,iw:innerWidth})`);
  check("S1", "owner logs in through the form and lands on the agency setup (staging ribbon, 10 steps, trial line from trial.status)", inOb && ob.ribbon === "staging" && ob.steps === 10 && !!ob.trial, ob);
  await shot("stg-m390-en-onboarding-top");

  // S2 business + hours
  await ev(`(()=>{const c=document.querySelector('[data-lang=en]'); if(c && !c.checked) c.click();})()`);
  await setVal("[data-setup-section=setup-business] select[name=timezone]", "Europe/Madrid");
  await ev(`document.querySelector('[data-setup-section=setup-business] button[type=submit]').click()`);
  const bizOk = await waitFor(`!!document.querySelector('[data-setup-section=setup-business] [data-setup-msg=ok]')`);
  check("S2", "business data and opening hours saved through tenant-api", bizOk, await ev(`document.querySelector('[data-setup-section=setup-business] [data-setup-msg]')?.innerText??null`));

  // S3 CRM read-back from crm.current: the fixture has the Sheets copy on (chosen, never connected)
  await nav(`${BASE}/en/onboarding`);
  await scrollTo("[data-crm-choice]");
  const sheets = await ev(`({state:document.querySelector('[data-sheets-state]')?.getAttribute('data-sheets-state'),text:document.querySelector('[data-sheets-state]')?.innerText,ofRecord:!!document.querySelector('[data-crm-of-record=nuovasolution]'),checked:document.querySelector('[data-crm-choice] input:checked')?.value,slot:/⟦/.test(document.body.innerText)})`);
  check("S3", "CRM read back from crm.current: built-in CRM of record ('No external CRM'), Google Sheets 'chosen, not connected', never 'connected'",
    sheets.state === "chosen_not_connected" && /Chosen, not connected/i.test(sheets.text ?? "") && sheets.ofRecord && sheets.checked === "google_sheets" && !sheets.slot, sheets);
  await shot("stg-m390-en-crm-sheets-chosen-not-connected");
  // S4 choosing "No external CRM" while the Sheets copy is on: no contracted switch-off exists, so it is not offered as saved
  await ev(`document.querySelector('[data-crm-choice] input[value=nuovasolution]').click()`);
  await sleep(300);
  const native = await ev(`({note:!!document.querySelector('[data-sheets-off-unavailable]'),disabled:[...document.querySelectorAll('[data-crm-choice] button')].find(b=>/Save choice/.test(b.innerText))?.disabled})`);
  check("S4", "'No external CRM' is shown as the CRM of record; switching the Sheets copy off is stated as not available (WEB-API-3), never faked as saved", native.note && native.disabled === true, native);
  await scrollTo("[data-crm-choice]");
  await shot("stg-m390-en-crm-sheets-off-unavailable");

  // S5 logo: real PNG through the file input -> direct signed upload -> server byte check -> previews
  const logoPath = join(tmpdir(), `nuova-stg-logo-${Date.now()}.png`);
  writeFileSync(logoPath, png);
  await fileInto("[data-logo-input=logo]", logoPath);
  const logoOk = await waitFor(`document.querySelectorAll('[data-logo-img]').length===2 && [...document.querySelectorAll('[data-logo-img]')].every(i=>i.complete && i.naturalWidth>0)`, 45000);
  const logoSrc = await ev(`document.querySelector('[data-preview=light] img')?.src??''`);
  check("S5", "logo uploaded as a real file: stored on staging storage, shown on light and dark previews", logoOk && logoSrc.startsWith(`https://${REF}.supabase.co/storage/v1/object/public/agency-branding/`), { logoOk, host: logoSrc ? new URL(logoSrc).host : null });
  await scrollTo("[data-setup-section=setup-branding]");
  await shot("stg-m390-en-branding-light-dark");
  // dark variant, then the contrast flag
  const darkPath = join(tmpdir(), `nuova-stg-logo-dark-${Date.now()}.png`);
  writeFileSync(darkPath, makePng(240, 96, [244, 241, 234]));
  await fileInto("[data-logo-input=logo_dark]", darkPath);
  const darkOk = await waitFor(`!!document.querySelector('[data-preview=dark] [data-logo-img=dark]')`, 45000);
  await scrollTo("[data-setup-section=setup-branding]");
  await shot("stg-m390-en-branding-dark-variant");
  await ev(`[...document.querySelectorAll('[data-setup-section=setup-branding] button')].filter(b=>/Remove/.test(b.innerText)).pop()?.click()`);
  const darkGone = await waitFor(`!document.querySelector('[data-preview=dark] [data-logo-img=dark]')`);
  await ev(`(()=>{const c=document.querySelector('[data-needs-light]'); if(c && !c.checked) c.click();})()`);
  const chip = await waitFor(`!!document.querySelector('[data-preview=dark] [data-light-chip=yes]')`);
  check("S6", "dark variant upload, removal, and the light-background flag all round-trip through branding-assets", darkOk && darkGone && chip, { darkOk, darkGone, chip });
  await scrollTo("[data-setup-section=setup-branding]");
  await shot("stg-m390-en-branding-light-chip");

  // S7 legal identity and links
  for (const [n, v] of Object.entries({ legal_name: "stg_web_e2e_agency S.L. (TEST)", tax_id: "B12345674", address_line: "Calle de Prueba 1", address_postal_code: "29600", address_city: "Marbella", address_region: "Málaga", privacy_url: "https://example.org/stg-web-e2e/privacidad", terms_url: "https://example.org/stg-web-e2e/terminos" })) await setVal(`[data-setup-section=setup-legal] input[name=${n}]`, v);
  await ev(`document.querySelector('[data-setup-section=setup-legal] button[type=submit]').click()`);
  const legalOk = await waitFor(`!!document.querySelector('[data-setup-section=setup-legal] [data-setup-msg]')`);
  const legalMsg = await ev(`({tone:document.querySelector('[data-setup-section=setup-legal] [data-setup-msg]')?.getAttribute('data-setup-msg'),text:document.querySelector('[data-setup-section=setup-legal] [data-setup-msg]')?.innerText,tax:document.querySelector('[data-setup-section=setup-legal] input[name=tax_id]')?.value})`);
  check("S7", "legal identity and links saved; the form shows what the setters returned", legalOk && legalMsg.tone === "ok", legalMsg);

  // S8 calendar / hand-off
  await ev(`(()=>{const c=document.querySelector('[data-appointment=valuation] input'); if(c && !c.checked) c.click();})()`);
  await ev(`document.querySelector('[data-setup-section=setup-calendar] button[type=submit]').click()`);
  const calOk = await waitFor(`!!document.querySelector('[data-setup-section=setup-calendar] [data-setup-msg=ok]')`);
  check("S8", "appointment types and the no-calendar fallback saved (no booking-mode selector offered)", calOk && !(await ev(`/booking mode/i.test(document.body.innerText)`)), calOk);

  // S9 reload: what the backend holds comes back; readiness from tenant_activation_readiness
  await nav(`${BASE}/en/onboarding`, 5000);
  const back = await ev(`({blocked:[...document.querySelectorAll('[data-gate][data-gate-status=BLOCKED]')].map(g=>g.getAttribute('data-gate')),tz:document.querySelector('[data-setup-section=setup-business] select[name=timezone]')?.value,en:document.querySelector('[data-lang=en]')?.checked,val:document.querySelector('[data-appointment=valuation] input')?.checked,logos:document.querySelectorAll('[data-logo-img]').length,chip:!!document.querySelector('[data-light-chip=yes]'),legalNote:!!document.querySelector('[data-legal-not-readable]'),wl:document.querySelector('[data-gate=white_label_legal]')?.getAttribute('data-gate-status'),bh:document.querySelector('[data-gate=business_hours]')?.getAttribute('data-gate-status'),ai:document.querySelector('[data-gate=ai_disclosure]')?.getAttribute('data-gate-status'),act:document.querySelector('[data-activatable]')?.getAttribute('data-activatable'),sw:document.documentElement.scrollWidth,iw:innerWidth})`);
  check("S9", "after reload: business, hours, languages, calendar, logo and contrast flag are read back from the backend", back.tz === "Europe/Madrid" && back.en && back.val && back.logos === 2 && back.chip, back);
  check("S10", "legal read-back gap stated honestly (no legal read in tenant-api yet; WEB-API-1)", back.legalNote, back.legalNote);
  check("S11", "readiness from tenant_activation_readiness: legal+branding and hours READY after the setup; not activatable while other mandatory gates block", back.wl === "READY" && back.bh === "READY" && back.act === "no" && back.blocked.length > 0, { wl: back.wl, bh: back.bh, ai: back.ai, act: back.act, blocked: back.blocked });
  check("S12", "no horizontal overflow at 390 px on the staging onboarding", back.sw <= back.iw, { sw: back.sw, iw: back.iw });
  await scrollTo("[data-setup-section=setup-readiness]");
  await shot("stg-m390-en-readiness");

  // S13 go live: the backend answers blocked, the page says so
  await ev(`[...document.querySelectorAll('button')].find(b=>/^Go live$/.test(b.innerText.trim()))?.click()`);
  await sleep(1500);
  const golive = await ev(`document.querySelector('#go-live-note')?.parentElement?.parentElement?.querySelector('[role=status]')?.innerText??null`);
  check("S13", "Go live never claims activation while gates are open", golive !== null && !/is ready to go live|activated/i.test(golive), golive);

  // S14 agent view: signed in as the agent, the setup is read-only with the role note
  await ev(`fetch('/api/bff/auth/logout',{method:'POST'})`);
  await nav(`${BASE}/en/login`);
  await setVal("form input[name=email]", AGENT.email);
  await setVal("form input[name=password]", AGENT.password);
  await ev(`document.querySelector('form button[type=submit]').click()`);
  const agentView = await waitFor(`!!document.querySelector('[data-onboarding-setup]')`);
  const ro = await ev(`({notes:document.querySelectorAll('[data-role-note]').length,disabled:document.querySelector('[data-setup-section=setup-business] button[type=submit]')?.disabled})`);
  check("S14", "agent sees the setup read-only with the role note on every section", agentView && ro.notes >= 4 && ro.disabled === true, ro);
  await shot("stg-m390-en-agent-readonly");

  // S15 desktop capture of the owner view
  await ev(`fetch('/api/bff/auth/logout',{method:'POST'})`);
  await send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  await nav(`${BASE}/es/login`);
  await setVal("form input[name=email]", OWNER.email);
  await setVal("form input[name=password]", OWNER.password);
  await ev(`document.querySelector('form button[type=submit]').click()`);
  const es = await waitFor(`location.pathname==='/es/onboarding' && /La configuración de tu agencia/.test(document.body.innerText)`);
  check("S15", "Spanish owner view renders in Spanish on desktop", es, es);
  await scrollTo("[data-onboarding-setup]");
  await shot("stg-d1440-es-setup");
  await ev(`fetch('/api/bff/auth/logout',{method:'POST'})`);
  ws.close();
} catch (e) {
  check("RUNNER", "the harness itself completed", false, String(e?.stack ?? e).replace(/sb_publishable_\w+/g, "sb_publishable_[redacted]"));
} finally {
  for (const k of kids) { try { k.kill(); } catch { /* gone */ } }
  results.finished_utc = new Date().toISOString();
  results.passed = results.checks.filter((c) => c.pass).length;
  results.failed = results.checks.filter((c) => !c.pass).length;
  const text = JSON.stringify(results, null, 1);
  for (const s of [OWNER.email, OWNER.password, AGENT.email, AGENT.password, OTHER.email, OTHER.password, PUB]) if (s && text.includes(s)) { console.error("ABORT: a credential would have been written"); process.exit(4); }
  writeFileSync(join(OUT, "staging-e2e-results.json"), text);
  console.log(`\n${results.passed} passed, ${results.failed} failed -> ${join(OUT, "staging-e2e-results.json")}`);
  process.exit(results.failed ? 1 : 0);
}
