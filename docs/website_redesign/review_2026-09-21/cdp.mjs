// Device-emulated captures and layout measurements over the Chrome DevTools Protocol.
// Local host only. Uses Node's built-in WebSocket; no dependency installed.
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync, rmSync } from "node:fs";

const SP = process.env.SP;
const EDGE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const B = "http://localhost:3107";
const OUT = `${SP}/shots-cdp`;
mkdirSync(OUT, { recursive: true });
const prof = `${SP}/edgeprof/cdp`;
rmSync(prof, { recursive: true, force: true });

const edge = spawn(EDGE, ["--headless=new", "--disable-gpu", "--no-first-run", `--user-data-dir=${prof}`, "--remote-debugging-port=9333", "about:blank"], { stdio: "ignore" });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function targets() {
  for (let i = 0; i < 60; i++) {
    try { return await (await fetch("http://127.0.0.1:9333/json")).json(); } catch { await sleep(500); }
  }
  throw new Error("devtools not reachable");
}

const list = await targets();
const page = list.find((t) => t.type === "page");
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener("open", r));
let id = 0;
const pending = new Map();
ws.addEventListener("message", (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
});
const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
const evalJs = async (expr) => (await send("Runtime.evaluate", { expression: expr, returnByValue: true, awaitPromise: true })).result?.result?.value;

await send("Page.enable");
await send("Runtime.enable");

const MEASURE = `(() => {
  const vw = innerWidth, sw = document.documentElement.scrollWidth;
  const over = [];
  for (const el of document.querySelectorAll('body *')) {
    const r = el.getBoundingClientRect();
    if (r.width && r.right > vw + 1 && getComputedStyle(el).position !== 'fixed') over.push((el.tagName + '.' + (el.className?.toString?.() || '')).slice(0, 80) + ' right=' + Math.round(r.right));
    if (over.length >= 6) break;
  }
  const small = [];
  for (const el of document.querySelectorAll('a[href],button,input,select,[role=button]')) {
    const r = el.getBoundingClientRect(); const cs = getComputedStyle(el);
    if (!r.width || cs.visibility === 'hidden' || cs.display === 'none') continue;
    if (r.height < 44 || r.width < 24) small.push((el.innerText || el.getAttribute('aria-label') || el.tagName).trim().slice(0, 40) + ' ' + Math.round(r.width) + 'x' + Math.round(r.height));
  }
  return { innerWidth: vw, scrollWidth: sw, horizontalOverflow: sw > vw, overflowing: over, smallTargets: small.slice(0, 12), smallTargetCount: small.length, lang: document.documentElement.lang, h1: document.querySelectorAll('h1').length };
})()`;

const cases = [
  ["en-home", "/en"], ["es-home", "/es"], ["en-trial", "/en/trial"], ["es-signup", "/es/signup"],
  ["en-packages", "/en/packages"], ["es-platform-crm", "/es/platform/crm"],
  ["en-onboard-c3", "/api/bff/auth/login?stub=1&case=3&next=/en/onboarding"],
  ["es-onboard-c3", "/api/bff/auth/login?stub=1&case=3&next=/es/onboarding"],
  ["en-callback-forged", "/en/connect/callback?provider=hubspot&status=success"],
];
const results = {};
for (const w of [390, 360]) {
  await send("Emulation.setDeviceMetricsOverride", { width: w, height: 844, deviceScaleFactor: 2, mobile: true });
  await send("Emulation.setUserAgentOverride", { userAgent: "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Mobile Safari/537.36" });
  for (const [name, path] of cases) {
    await send("Page.navigate", { url: B + path });
    await sleep(3500);
    results[`${w}-${name}`] = await evalJs(MEASURE);
    if (w === 390) {
      const shot = await send("Page.captureScreenshot", { format: "png" });
      writeFileSync(`${OUT}/m${w}-${name}.png`, Buffer.from(shot.result.data, "base64"));
    }
  }
}
// Q&A widget open state on mobile: focus management check
await send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
await send("Page.navigate", { url: B + "/en" });
await sleep(3000);
results["390-qa-focus"] = await evalJs(`(async () => {
  const btn = [...document.querySelectorAll('button')].find(b => /Ask a question/i.test(b.innerText));
  if (!btn) return 'launcher not found';
  btn.focus(); btn.click(); await new Promise(r => setTimeout(r, 400));
  const afterOpen = document.activeElement?.tagName + ' ' + (document.activeElement?.innerText || document.activeElement?.getAttribute('aria-label') || '').slice(0,30);
  document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })); window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
  await new Promise(r => setTimeout(r, 400));
  const afterClose = document.activeElement?.tagName + ' ' + (document.activeElement?.innerText || '').slice(0,30);
  return { focusAfterOpen: afterOpen, focusAfterEscape: afterClose };
})()`);
const shot = await send("Page.captureScreenshot", { format: "png" });
writeFileSync(`${OUT}/m390-en-home-qa-closed-after-escape.png`, Buffer.from(shot.result.data, "base64"));

console.log(JSON.stringify(results, null, 1));
ws.close();
edge.kill();
