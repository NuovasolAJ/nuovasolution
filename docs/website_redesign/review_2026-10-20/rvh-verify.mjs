// Verification of the four RV2 hits: the real hero panel, the clipped element, the plan cards,
// the 3D section's markup and the social list.
import { spawn } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
const BASE = process.argv[2], OUT = process.argv[3], SHOTS = process.argv[4];
const CDP = 9412; const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
mkdirSync(SHOTS, { recursive: true });
const res = { deployment: BASE, started_utc: new Date().toISOString(), detail: {} };
const kids = [];
const prof = join(SHOTS, "vprof"); rmSync(prof, { recursive: true, force: true });
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

// 1. the clipped element and the real hero panel
await vp(1440, 950, false); await go("/es");
res.detail.clipped = await ev(`[...document.querySelectorAll("main *")].filter(e => { const s = getComputedStyle(e);
    if (!["hidden", "clip"].includes(s.overflowX) && !["hidden", "clip"].includes(s.overflowY)) return false;
    if (e.clientWidth <= 4 || e.clientHeight <= 4) return false;
    return e.scrollWidth > e.clientWidth + 2 || e.scrollHeight > e.clientHeight + 2; })
  .map(e => ({ tag: e.tagName, cls: (e.className || "").toString().slice(0, 60), sw: e.scrollWidth, cw: e.clientWidth, sh: e.scrollHeight, ch: e.clientHeight, text: (e.innerText || "").trim().slice(0, 60) })).slice(0, 5)`);
res.detail.panel = await ev(`(() => { const cands = [...document.querySelectorAll("main [class*=panel], main [data-panel], main figure, main article")]
    .map(e => ({ cls: (e.className || "").toString().slice(0, 50), r: e.getBoundingClientRect(), text: (e.innerText || "").trim().slice(0, 60) }))
    .filter(x => x.r.width > 200 && x.r.height > 120);
  return cands.map(x => ({ cls: x.cls, top: Math.round(x.r.top), height: Math.round(x.r.height), inView: x.r.top > -4 && x.r.bottom <= innerHeight + 4, text: x.text })).slice(0, 6); })()`);
console.log("CLIPPED:", JSON.stringify(res.detail.clipped));
console.log("PANEL:", JSON.stringify(res.detail.panel));

// 2. plan cards without relying on data-plan
await go("/es/packages", 3200);
res.detail.plans = await ev(`(() => { const t = (document.body.innerText || "").replace(/\\s+/g, " ");
  const names = [...new Set((t.match(/Essential|Growth|Scale/g) || []))];
  const heads = [...document.querySelectorAll("main h2, main h3")].map(h => (h.innerText || "").trim().slice(0, 40));
  const capacity = (t.match(/[^.]{0,70}(capacidad|consultas al mes)[^.]{0,70}\\./gi) || []).slice(0, 3);
  const numbers = (t.match(/\\b\\d{2,5}\\b/g) || []).slice(0, 12);
  return { names, heads: heads.slice(0, 12), capacity, numbers }; })()`);
console.log("PLANS:", JSON.stringify(res.detail.plans).slice(0, 600));

// 3. the 3D section markup
for (const p of ["/es", "/es/platform"]) {
  await go(p, 3600);
  res.detail[`three_d_${p.replace(/\W/g, "_")}`] = await ev(`(async () => { for (let i = 0; i < 14; i++) { scrollTo({top: innerHeight*i, behavior: "instant"}); await new Promise(r => setTimeout(r, 550)); }
    const sec = [...document.querySelectorAll("section")].find(s => /3D|plano|modelo|amueblad/i.test(s.innerText || ""));
    if (!sec) return { section: false };
    const bg = [...sec.querySelectorAll("*")].map(e => getComputedStyle(e).backgroundImage).filter(b => b && b !== "none").slice(0, 6);
    return { section: true, html: sec.innerHTML.replace(/\\s+/g, " ").slice(0, 700),
      text: (sec.innerText || "").replace(/\\s+/g, " ").slice(0, 500),
      imgCount: sec.querySelectorAll("img").length, videoCount: sec.querySelectorAll("video").length, canvasCount: sec.querySelectorAll("canvas").length,
      svgCount: sec.querySelectorAll("svg").length, backgrounds: bg }; })()`);
  console.log(`\n3D ${p}:`, JSON.stringify(res.detail[`three_d_${p.replace(/\W/g, "_")}`]).slice(0, 700));
}
await shot("rvh-v-3d");

// 4. the social list
await go("/api/bff/auth/login?stub=1&next=%2Fes%2Fsocial%2Fpost", 4200);
res.detail.social = await ev(`(() => { const main = document.querySelector("main");
  return { path: location.pathname, text: (main?.innerText || "").replace(/\\s+/g, " ").slice(0, 900),
    images: [...(main?.querySelectorAll("img") || [])].map(i => ({ src: (i.currentSrc || i.src || "").split("/").pop(), w: i.naturalWidth })),
    noImageNotes: ((main?.innerText || "").match(/no tiene imagen/gi) || []).length }; })()`);
console.log("\nSOCIAL:", JSON.stringify(res.detail.social).slice(0, 700));
await shot("rvh-v-social");
writeFileSync(OUT, JSON.stringify(res, null, 1));
ws.close(); for (const k of kids) k.kill(); process.exit(0);
