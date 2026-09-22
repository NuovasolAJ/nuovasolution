// Re-review browser checks for 2089094 via DevTools device emulation. Local host only (:3107 stub build).
import { spawn } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
const SP = process.env.SP, OUT = `${SP}/shots-0922`, B = "http://localhost:3107";
mkdirSync(OUT, { recursive: true });
const prof = `${SP}/edgeprof/cdp3`; rmSync(prof, { recursive: true, force: true });
const edge = spawn("C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe", ["--headless=new", "--disable-gpu", "--no-first-run", `--user-data-dir=${prof}`, "--remote-debugging-port=9336", "about:blank"], { stdio: "ignore" });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let list; for (let i = 0; i < 60; i++) { try { list = await (await fetch("http://127.0.0.1:9336/json")).json(); break; } catch { await sleep(500); } }
const ws = new WebSocket(list.find((t) => t.type === "page").webSocketDebuggerUrl); await new Promise((r) => ws.addEventListener("open", r));
let id = 0; const pend = new Map();
ws.addEventListener("message", (e) => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } });
const send = (method, params = {}) => new Promise((r) => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
const ev = async (x) => (await send("Runtime.evaluate", { expression: x, returnByValue: true, awaitPromise: true })).result?.result?.value;
const go = async (p, wait = 3000) => { await send("Page.navigate", { url: B + p }); await sleep(wait); };
const shot = async (name) => { const s = await send("Page.captureScreenshot", { format: "png" }); writeFileSync(`${OUT}/${name}.png`, Buffer.from(s.result.data, "base64")); };
const vp = (w, h = 844) => send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: 2, mobile: true });
await send("Page.enable"); await send("Network.enable");
const R = {};
const KEYS = /\b(white_label_legal|ai_disclosure|business_hours|routing_mode|test_scenarios|launch_approval|staff_provisioned|owner_admin|agency_tenant|plan_entitlements|lead_acquisition|property_source|property_experience|nuovasolution_crm|google_sheets|locked_by_plan|externally_pending|needs_action)\b/g;

await vp(390);
// WR-16 h1 per page
R.h1 = {};
await go("/api/bff/auth/login?stub=1&case=3&next=/en/onboarding");
for (const p of ["/en/signup", "/es/signup", "/en/login", "/es/login", "/en/onboarding", "/es/onboarding", "/en/connect/callback?provider=hubspot&status=success", "/es/connect/callback?provider=email&status=error&reason=user_cancelled"]) {
  await go(p, 2500); R.h1[p] = await ev(`[...document.querySelectorAll('h1')].map(h=>h.innerText.trim().slice(0,60))`);
}
// WR-09 visible text of forged callback
await go("/en/connect/callback?provider=hubspot&status=success");
R.callbackVisible = await ev(`document.querySelector('main')?.innerText.replace(/\\s+/g,' ').slice(0,400)`);
await shot("m390-en-callback-forged");

// WR-11 visible raw keys, six cases, EN + ES (innerText only)
R.rawKeys = {};
for (const c of [1, 2, 3, 4, 5, 6]) for (const l of ["en", "es"]) {
  await go(`/api/bff/auth/login?stub=1&case=${c}&next=/${l}/onboarding`, 3000);
  R.rawKeys[`case${c}-${l}`] = await ev(`(document.querySelector('main')?.innerText.match(${KEYS}) || []).join(',') || 'none'`);
}

// WR-10 CRM choice: select Google Sheets, save, reload; interest; screenshot
await go("/api/bff/auth/login?stub=1&case=3&next=/en/onboarding", 3500);
R.crm = {};
R.crm.before = await ev(`(()=>{const r=[...document.querySelectorAll('input[type=radio]')];return r.map(x=>x.value+':'+x.checked).join(' ')})()`);
R.crm.pick = await ev(`(async()=>{const r=[...document.querySelectorAll('input[type=radio]')].find(x=>x.value==='google_sheets'); if(!r) return 'no sheets radio'; r.click(); await new Promise(z=>setTimeout(z,300));
  const b=[...document.querySelectorAll('button')].find(x=>/^(Save|Guardar)/i.test(x.innerText.trim())); if(!b) return 'no save button'; b.click(); await new Promise(z=>setTimeout(z,1500));
  return document.querySelector('main').innerText.match(/Saved[^\\n]{0,120}|Guardad[^\\n]{0,120}/)?.[0] || 'no saved line';})()`);
await send("Page.reload"); await sleep(3500);
R.crm.afterReload = await ev(`[...document.querySelectorAll('input[type=radio]')].map(x=>x.value+':'+x.checked).join(' ')`);
R.crm.interest = await ev(`(async()=>{const b=[...document.querySelectorAll('button')].find(x=>/HubSpot/.test(x.innerText)); if(!b) return 'no HubSpot interest button'; const label=b.innerText.trim(); b.click(); await new Promise(z=>setTimeout(z,1500)); return label+' => '+(document.querySelector('main').innerText.match(/Noted[^\\n]{0,120}|Anotado[^\\n]{0,120}/)?.[0]||'no noted line');})()`);
R.crm.connectButtons = await ev(`[...document.querySelectorAll('button,a')].filter(x=>/^(Connect|Conectar)/i.test(x.innerText.trim())).map(x=>x.innerText.trim())`);
R.crm.text = await ev(`(()=>{const m=document.querySelector('main').innerText; const i=m.search(/Where your leads|Dónde se guardan|CRM/); return m.slice(i,i+900).replace(/\\s+/g,' ');})()`);
await ev(`(()=>{const e=[...document.querySelectorAll('input[type=radio]')][0]; e&&e.scrollIntoView({block:'center'})})()`); await sleep(600);
await shot("m390-en-onboarding-crm-choice");

// WR-14 skip on an optional step: any visible change?
await go("/api/bff/auth/login?stub=1&case=5&next=/en/onboarding", 3500);
R.skip = await ev(`(async()=>{const b=[...document.querySelectorAll('button')].find(x=>/^(Skip|Omitir)/i.test(x.innerText.trim())); if(!b) return 'no skip button'; const before=document.querySelector('main').innerText; b.click(); await new Promise(z=>setTimeout(z,1500)); const after=document.querySelector('main').innerText; return {label:b.innerText.trim(), visibleChange: before!==after};})()`);
R.goLive = await ev(`(()=>{const b=[...document.querySelectorAll('button')].find(x=>/Go live|Salir en vivo|Activar/i.test(x.innerText)); return b?{disabledAttr:b.disabled, ariaDisabled:b.getAttribute('aria-disabled'), describedby:b.getAttribute('aria-describedby')}:'none'})()`);

// WR-15 360 px Spanish CRM page and all ES platform pages: layout viewport must stay 360
await vp(360, 800); R.w360 = {};
for (const p of ["/es/platform/crm", "/es/platform/voice", "/es/platform/social-growth", "/es/platform/lead-acquisition", "/es/trial", "/es/onboarding"]) {
  await go(p, 2500); R.w360[p] = await ev(`({innerWidth, scrollWidth: document.documentElement.scrollWidth})`);
}
await go("/es/platform/crm", 2500); await shot("m360-es-platform-crm");

// WR-17 Q&A focus in and back; WR-18 touch targets in header
await vp(390);
await go("/en", 3000);
R.qa = await ev(`(async()=>{const l=[...document.querySelectorAll('button')].find(b=>/Ask a question/i.test(b.innerText)); if(!l) return 'no launcher'; l.focus(); l.click(); await new Promise(z=>setTimeout(z,500));
  const a=document.activeElement; const inPanel=!!a.closest('[role=dialog]'); const opened=(a.tagName+' '+(a.getAttribute('aria-label')||a.placeholder||a.innerText||'')).slice(0,50);
  a.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true})); await new Promise(z=>setTimeout(z,500));
  const b=document.activeElement; return {focusAfterOpen:opened, focusInPanel:inPanel, focusAfterEscape:(b.tagName+' '+(b.innerText||'')).slice(0,40), returnedToLauncher: /Ask a question/i.test(b.innerText||'')};})()`);
R.targets = await ev(`[...document.querySelectorAll('header a[href],header button')].filter(e=>{const r=e.getBoundingClientRect();return r.width&&r.height}).map(e=>{const r=e.getBoundingClientRect();return (e.innerText.trim()||e.getAttribute('aria-label')||'').slice(0,24)+' '+Math.round(r.width)+'x'+Math.round(r.height)})`);
await go("/en", 2500);
R.qaOpenShot = await ev(`(async()=>{[...document.querySelectorAll('button')].find(b=>/Ask a question/i.test(b.innerText))?.click(); await new Promise(z=>setTimeout(z,600)); return document.querySelector('[role=dialog]')?.innerText.replace(/\\s+/g,' ').slice(0,500)||'no dialog';})()`);
await shot("m390-en-qa-open");

console.log(JSON.stringify(R, null, 1)); ws.close(); edge.kill();
