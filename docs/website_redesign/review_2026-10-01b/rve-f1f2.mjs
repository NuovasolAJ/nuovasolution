// Re-measure exactly the two open findings on the delivered deployment:
// F1 contrast of small text, F2 Spanish labels clipped. Same method as the finding that raised them.
import { spawn } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
const BASE = process.argv[2], OUT = process.argv[3], SHOTS = process.argv[4];
const CDP = 9397; const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
mkdirSync(SHOTS, { recursive: true });
const res = { base: BASE, started_utc: new Date().toISOString(), detail: {} };
const kids = [];
const prof = join(SHOTS, "f1f2prof"); rmSync(prof, { recursive: true, force: true });
kids.push(spawn("C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe", ["--headless=new", "--disable-gpu", "--no-first-run", `--user-data-dir=${prof}`, `--remote-debugging-port=${CDP}`, "about:blank"], { stdio: "ignore" }));
let list; for (let i = 0; i < 60; i++) { try { list = await (await fetch(`http://127.0.0.1:${CDP}/json`)).json(); break; } catch { await sleep(500); } }
const ws = new WebSocket(list.find((t) => t.type === "page").webSocketDebuggerUrl); await new Promise((r) => ws.addEventListener("open", r));
let id = 0; const pend = new Map();
ws.addEventListener("message", (e) => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } });
const send = (m, p = {}) => new Promise((r) => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method: m, params: p })); });
const ev = async (x) => (await send("Runtime.evaluate", { expression: x, returnByValue: true, awaitPromise: true })).result?.result?.value;
const vp = (w, h, mobile = w <= 430) => send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: 2, mobile });
const go = async (p, w = 3000) => { await send("Page.navigate", { url: BASE + p }); await sleep(w); };
const shot = async (n) => { const s = await send("Page.captureScreenshot", { format: "png" }); writeFileSync(join(SHOTS, n + ".png"), Buffer.from(s.result.data, "base64")); };
await send("Page.enable");

const CON = `(() => {
  const lum = (c) => { const m = c.match(/[0-9.]+/g); if (!m) return null; const [r, g, b] = m.slice(0, 3).map(Number);
    const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
  const bgOf = (el) => { let e = el; while (e) { const s = getComputedStyle(e); if (s.backgroundColor && s.backgroundColor.indexOf("rgba(0, 0, 0, 0)") === -1 && s.backgroundColor !== "transparent") return s.backgroundColor; e = e.parentElement; } return "rgb(255,255,255)"; };
  const out = [];
  for (const e of document.querySelectorAll("main *, header *, footer *")) {
    if (![...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())) continue;
    const r = e.getBoundingClientRect(); if (r.width < 8 || r.bottom < 0 || r.top > innerHeight) continue;
    let op = 1, p = e; while (p) { op *= Number(getComputedStyle(p).opacity || 1); p = p.parentElement; }
    if (op < 0.9) continue;
    const s = getComputedStyle(e); const l1 = lum(s.color), l2 = lum(bgOf(e)); if (l1 === null || l2 === null) continue;
    const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
    const size = parseFloat(s.fontSize) || 16, bold = Number(s.fontWeight) >= 700;
    const need = size >= 24 || (size >= 18.66 && bold) ? 3 : 4.5;
    if (ratio < need) out.push({ t: (e.innerText || "").trim().slice(0, 32), ratio: Math.round(ratio * 100) / 100, need, size: Math.round(size), color: s.color, bg: bgOf(e) });
  }
  const seen = new Set(); return out.filter(x => { const k = x.t + x.ratio; if (seen.has(k)) return false; seen.add(k); return true; }).slice(0, 10); })()`;

const CLIP = `[...document.querySelectorAll("main *, header *, footer *")].filter(e => {
    if (![...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())) return false;
    return e.scrollWidth > e.clientWidth + 2 && e.clientWidth > 40;
  }).map(e => ({ t: (e.innerText || "").trim().slice(0, 36), sw: e.scrollWidth, cw: e.clientWidth, tag: e.tagName })).slice(0, 8)`;

const ROUTES = ["/en", "/es", "/en/platform", "/es/platform", "/en/platform/crm", "/es/platform/crm", "/en/packages", "/es/packages", "/en/trial", "/es/trial", "/es/contact", "/es/signup"];
const con = {}, clip = {};
for (const [w, h] of [[360, 800], [390, 844], [768, 1024], [1024, 800], [1440, 900]]) {
  await vp(w, h);
  for (const p of ROUTES) {
    await go(p, 2400);
    const steps = Math.min(8, Math.ceil(await ev("document.body.scrollHeight / innerHeight")));
    const c = [], k = [];
    for (let s = 0; s < steps; s++) {
      await ev(`scrollTo({top: innerHeight*${s}, behavior: "instant"})`); await sleep(1100);
      const cc = await ev(CON); if (cc && cc.length) c.push(...cc);
      const kk = await ev(CLIP); if (kk && kk.length) k.push(...kk);
    }
    if (c.length) con[`${w}${p}`] = c.slice(0, 5);
    if (k.length) clip[`${w}${p}`] = k.slice(0, 5);
  }
}
res.detail.contrast = con; res.detail.clipped = clip;
console.log("F1 contrast: pages", Object.keys(con).length, JSON.stringify(Object.values(con)[0] || []).slice(0, 360));
console.log("F2 clipped : pages", Object.keys(clip).length, JSON.stringify(Object.entries(clip).slice(0, 3)).slice(0, 360));
await vp(768, 1024); await go("/es/packages", 2800); await shot("rve-768-es-packages");
await vp(390, 844); await go("/es", 2800); await ev('scrollTo({top: innerHeight, behavior: "instant"})'); await sleep(1200); await shot("rve-390-es-home");
writeFileSync(OUT, JSON.stringify(res, null, 1));
ws.close(); for (const k of kids) k.kill(); process.exit(0);
