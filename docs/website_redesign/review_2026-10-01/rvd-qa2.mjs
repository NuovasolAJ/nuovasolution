// What a visitor sees when asking the product assistant on the staging preview (data-qa-* hooks).
import { spawn } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
const BASE = process.argv[2], OUT = process.argv[3], SHOTS = process.argv[4];
const CDP = 9393; const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
mkdirSync(SHOTS, { recursive: true });
const kids = []; const res = { base: BASE, started_utc: new Date().toISOString(), runs: [] };
const prof = join(SHOTS, "qa2prof"); rmSync(prof, { recursive: true, force: true });
kids.push(spawn("C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe", ["--headless=new", "--disable-gpu", "--no-first-run", `--user-data-dir=${prof}`, `--remote-debugging-port=${CDP}`, "about:blank"], { stdio: "ignore" }));
let list; for (let i = 0; i < 60; i++) { try { list = await (await fetch(`http://127.0.0.1:${CDP}/json`)).json(); break; } catch { await sleep(500); } }
const ws = new WebSocket(list.find((t) => t.type === "page").webSocketDebuggerUrl); await new Promise((r) => ws.addEventListener("open", r));
let id = 0; const pend = new Map();
ws.addEventListener("message", (e) => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } });
const send = (m, p = {}) => new Promise((r) => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method: m, params: p })); });
const ev = async (x) => (await send("Runtime.evaluate", { expression: x, returnByValue: true, awaitPromise: true })).result?.result?.value;
const go = async (p, w = 3200) => { await send("Page.navigate", { url: BASE + p }); await sleep(w); };
const shot = async (n) => { const s = await send("Page.captureScreenshot", { format: "png" }); writeFileSync(join(SHOTS, n + ".png"), Buffer.from(s.result.data, "base64")); };
await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 950, deviceScaleFactor: 1, mobile: false });

const QUESTIONS = [
  ["en", "Does Nuova answer WhatsApp enquiries at night?", "en-night"],
  ["es", "¿Tengo que cambiar de CRM?", "es-crm"],
  ["en", "What does Essential cost?", "en-price"],
];
for (const [locale, q, name] of QUESTIONS) {
  await go(`/${locale}`);
  const r = await ev(`(async () => {
    const launcher = document.querySelector("[data-qa-launcher]");
    if (launcher) { launcher.click(); await new Promise(r => setTimeout(r, 1200)); }
    const panel = document.querySelector("[data-qa-panel]") || document.querySelector("[role=dialog]");
    if (!panel) return { launcher: !!launcher, panel: false };
    const box = panel.querySelector("textarea, input[type=text]");
    if (!box) return { launcher: true, panel: true, input: false, panelText: (panel.innerText || "").slice(0, 300) };
    const setter = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(box), "value").set;
    setter.call(box, ${JSON.stringify(q)}); box.dispatchEvent(new Event("input", { bubbles: true }));
    await new Promise(r => setTimeout(r, 400));
    const btn = panel.querySelector("button[type=submit]") || [...panel.querySelectorAll("button")].find(b => !b.getAttribute("aria-label"));
    const t0 = Date.now(); if (btn) btn.click();
    let text = "";
    for (let i = 0; i < 30; i++) { await new Promise(r => setTimeout(r, 1200)); text = (panel.innerText || "").replace(/\\s+/g, " ").trim();
      if (/cannot confirm|no podemos confirmar|colleague|persona|person can/i.test(text)) break; }
    const notice = document.querySelector("[data-qa-ai-notice]");
    return { launcher: true, panel: true, input: true, seconds: Math.round((Date.now() - t0) / 100) / 10, panelText: text.slice(0, 500), aiNotice: notice ? notice.innerText.trim().slice(0, 160) : null,
      contactOffer: /email|e-mail|correo|contact|whatsapp|phone|tel/i.test(text) };
  })()`);
  res.runs.push({ locale, question: q, ...r });
  console.log(name, JSON.stringify(r).slice(0, 520));
  await shot(`rvd-qa2-${name}`);
}
writeFileSync(OUT, JSON.stringify(res, null, 1));
ws.close(); for (const k of kids) k.kill(); process.exit(0);
