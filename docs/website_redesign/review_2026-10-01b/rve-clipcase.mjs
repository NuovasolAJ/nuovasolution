// The single remaining clipping candidate: /es/platform at 768 px. Is text really cut off?
import { spawn } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
const BASE = process.argv[2], OUT = process.argv[3], SHOTS = process.argv[4];
const CDP = 9398; const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
mkdirSync(SHOTS, { recursive: true });
const kids = [];
const prof = join(SHOTS, "clipcaseprof"); rmSync(prof, { recursive: true, force: true });
kids.push(spawn("C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe", ["--headless=new", "--disable-gpu", "--no-first-run", `--user-data-dir=${prof}`, `--remote-debugging-port=${CDP}`, "about:blank"], { stdio: "ignore" }));
let list; for (let i = 0; i < 60; i++) { try { list = await (await fetch(`http://127.0.0.1:${CDP}/json`)).json(); break; } catch { await sleep(500); } }
const ws = new WebSocket(list.find((t) => t.type === "page").webSocketDebuggerUrl); await new Promise((r) => ws.addEventListener("open", r));
let id = 0; const pend = new Map();
ws.addEventListener("message", (e) => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } });
const send = (m, p = {}) => new Promise((r) => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method: m, params: p })); });
const ev = async (x) => (await send("Runtime.evaluate", { expression: x, returnByValue: true, awaitPromise: true })).result?.result?.value;
await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride", { width: 768, height: 1024, deviceScaleFactor: 2, mobile: false });
await send("Page.navigate", { url: BASE + "/es/platform" }); await sleep(3400);
const out = await ev(`(async () => {
  for (let i = 0; i < 8; i++) { scrollTo({top: innerHeight*i, behavior: "instant"}); await new Promise(r => setTimeout(r, 700)); }
  const el = [...document.querySelectorAll("p")].find(e => (e.innerText || "").indexOf("Hola Laura, gracias por escribir") === 0);
  if (!el) return { found: false };
  const s = getComputedStyle(el); const r = el.getBoundingClientRect();
  const full = el.innerText.trim();
  const range = document.createRange(); range.selectNodeContents(el);
  const rects = [...range.getClientRects()].map(x => ({ w: Math.round(x.width), h: Math.round(x.height) }));
  return { found: true, text: full.slice(0, 70), scrollWidth: el.scrollWidth, clientWidth: el.clientWidth, overflowX: s.overflowX, overflowY: s.overflowY,
    lineClamp: s.webkitLineClamp || s.lineClamp || null, textOverflow: s.textOverflow, whiteSpace: s.whiteSpace, box: { w: Math.round(r.width), h: Math.round(r.height) },
    lineBoxes: rects.length, widestLine: Math.max(...rects.map(x => x.w)), scrollHeight: el.scrollHeight, clientHeight: el.clientHeight };
})()`);
console.log(JSON.stringify(out));
const s = await send("Page.captureScreenshot", { format: "png" });
writeFileSync(join(SHOTS, "rve-768-es-platform-clipcase.png"), Buffer.from(s.result.data, "base64"));
writeFileSync(OUT, JSON.stringify({ base: BASE, case: out, utc: new Date().toISOString() }, null, 1));
ws.close(); for (const k of kids) k.kill(); process.exit(0);
