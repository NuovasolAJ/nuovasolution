// Final verification: the hero panel across five positions, the per-plan rows, and the 3D block's media.
import { spawn } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
const BASE = process.argv[2], OUT = process.argv[3], SHOTS = process.argv[4];
const CDP = 9413; const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
mkdirSync(SHOTS, { recursive: true });
const res = { deployment: BASE, started_utc: new Date().toISOString(), detail: {} };
const kids = [];
const prof = join(SHOTS, "v2prof"); rmSync(prof, { recursive: true, force: true });
kids.push(spawn("C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe", ["--headless=new", "--disable-gpu", "--no-first-run", `--user-data-dir=${prof}`, `--remote-debugging-port=${CDP}`, "about:blank"], { stdio: "ignore" }));
let list; for (let i = 0; i < 60; i++) { try { list = await (await fetch(`http://127.0.0.1:${CDP}/json`)).json(); break; } catch { await sleep(500); } }
const ws = new WebSocket(list.find((t) => t.type === "page").webSocketDebuggerUrl); await new Promise((r) => ws.addEventListener("open", r));
let id = 0; const pend = new Map();
ws.addEventListener("message", (e) => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } });
const send = (m, p = {}) => new Promise((r) => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method: m, params: p })); });
const ev = async (x) => (await send("Runtime.evaluate", { expression: x, returnByValue: true, awaitPromise: true })).result?.result?.value;
const vp = (w, h, mobile = w <= 430) => send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: 2, mobile });
const go = async (p, w = 3600) => { await send("Page.navigate", { url: BASE + p }); await sleep(w); };
const shot = async (n) => { const s = await send("Page.captureScreenshot", { format: "png" }); writeFileSync(join(SHOTS, n + ".png"), Buffer.from(s.result.data, "base64")); };
await send("Page.enable");

// 1. the hero panel across five scroll positions
const panel = {};
for (const [w, h, tag] of [[1440, 950, "d1440"], [390, 844, "m390"]]) {
  await vp(w, h, w <= 430); await go("/es");
  const heroH = await ev('(() => { const s = document.querySelector("section.hero-world"); return s ? Math.round(s.getBoundingClientRect().height) : innerHeight; })()');
  const steps = [];
  for (let i = 0; i <= 4; i++) {
    await ev(`scrollTo({top: ${Math.round((heroH * i) / 4)}, behavior: "instant"})`); await sleep(1300);
    steps.push(await ev(`(() => { const p = document.querySelector(".hero-panel"); if (!p) return null; const r = p.getBoundingClientRect();
      const texts = [...p.querySelectorAll("p, h1, h2, h3, li, span")].filter(e => (e.innerText || "").trim());
      const clippedText = texts.filter(e => { const s = getComputedStyle(e); return (["hidden","clip"].includes(s.overflowX) || ["hidden","clip"].includes(s.overflowY)) && (e.scrollWidth > e.clientWidth + 2 || e.scrollHeight > e.clientHeight + 2); }).length;
      const outside = texts.filter(e => { const q = e.getBoundingClientRect(); return q.width > 0 && (q.right > innerWidth + 2 || q.left < -2); }).length;
      let op = 1, q = p; while (q) { op *= Number(getComputedStyle(q).opacity || 1); q = q.parentElement; }
      return { top: Math.round(r.top), bottom: Math.round(r.bottom), fullyInView: r.top > -2 && r.bottom <= innerHeight + 2,
        visiblePart: Math.round(Math.max(0, Math.min(r.bottom, innerHeight) - Math.max(r.top, 0))), height: Math.round(r.height),
        opacity: Math.round(op * 100) / 100, transform: getComputedStyle(p).transform.slice(0, 40), clippedText, outside, textLen: (p.innerText || "").trim().length }; })()`));
  }
  panel[tag] = { heroHeight: heroH, steps };
}
res.detail.panel = panel;
console.log("PANEL 1440:", JSON.stringify(panel.d1440?.steps));
console.log("PANEL 390:", JSON.stringify(panel.m390?.steps));

// 2. per-plan rows
await vp(1440, 950, false); await go("/es/packages", 3200);
res.detail.planRows = await ev(`(() => { const out = [];
  for (const h of [...document.querySelectorAll("main h3")]) {
    const name = (h.innerText || "").trim();
    if (!/Essential|Growth|Enterprise|Scale/.test(name)) continue;
    const box = h.closest("article, li, div");
    out.push({ name, rows: [...(box?.querySelectorAll("dt, dd, li, p") || [])].map(e => (e.innerText || "").trim()).filter(Boolean).slice(0, 14) });
  }
  return out; })()`);
console.log("\nPLAN ROWS:", JSON.stringify(res.detail.planRows).slice(0, 800));

// 3. the 3D block by its own heading
for (const p of ["/es", "/es/platform"]) {
  await go(p, 3600);
  res.detail[`td_${p.replace(/\W/g, "_")}`] = await ev(`(async () => { for (let i = 0; i < 16; i++) { scrollTo({top: innerHeight*i, behavior: "instant"}); await new Promise(r => setTimeout(r, 520)); }
    const head = [...document.querySelectorAll("h2, h3")].find(h => /3D|plano|amueblad|girar|recorrer/i.test(h.innerText || ""));
    if (!head) return { found: false };
    const block = head.closest("section, article, div");
    const imgs = [...block.querySelectorAll("img")].map(i => ({ src: (i.currentSrc || i.src || "").split("/").pop(), alt: (i.alt || "").slice(0, 40), nw: i.naturalWidth }));
    const vids = [...block.querySelectorAll("video")].map(v => ({ src: (v.currentSrc || "").split("/").pop(), poster: (v.getAttribute("poster") || "").split("/").pop(), paused: v.paused, muted: v.muted, duration: Math.round((v.duration || 0) * 10) / 10 }));
    return { found: true, heading: (head.innerText || "").trim().slice(0, 60), text: (block.innerText || "").replace(/\\s+/g, " ").slice(0, 420),
      imgs, vids, canvas: block.querySelectorAll("canvas").length, buttons: [...block.querySelectorAll("button")].map(b => (b.innerText || "").trim().slice(0, 24)).slice(0, 6) }; })()`);
  console.log(`\n3D ${p}:`, JSON.stringify(res.detail[`td_${p.replace(/\W/g, "_")}`]).slice(0, 700));
}
await shot("rvh-v2-3d");
writeFileSync(OUT, JSON.stringify(res, null, 1));
ws.close(); for (const k of kids) k.kill(); process.exit(0);
