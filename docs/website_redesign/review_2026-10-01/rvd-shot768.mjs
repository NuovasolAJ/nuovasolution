// One targeted screenshot of the only content-on-content overlap found settled at 768 px (ES home, y ~1133).
import { spawn } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
const BASE = process.argv[2], SHOTS = process.argv[3];
const CDP = 9396; const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
mkdirSync(SHOTS, { recursive: true });
const kids = [];
const prof = join(SHOTS, "shotprof"); rmSync(prof, { recursive: true, force: true });
kids.push(spawn("C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe", ["--headless=new", "--disable-gpu", "--no-first-run", `--user-data-dir=${prof}`, `--remote-debugging-port=${CDP}`, "about:blank"], { stdio: "ignore" }));
let list; for (let i = 0; i < 60; i++) { try { list = await (await fetch(`http://127.0.0.1:${CDP}/json`)).json(); break; } catch { await sleep(500); } }
const ws = new WebSocket(list.find((t) => t.type === "page").webSocketDebuggerUrl); await new Promise((r) => ws.addEventListener("open", r));
let id = 0; const pend = new Map();
ws.addEventListener("message", (e) => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } });
const send = (m, p = {}) => new Promise((r) => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method: m, params: p })); });
const ev = async (x) => (await send("Runtime.evaluate", { expression: x, returnByValue: true, awaitPromise: true })).result?.result?.value;
await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride", { width: 768, height: 1024, deviceScaleFactor: 2, mobile: false });
await send("Page.navigate", { url: BASE + "/es" }); await sleep(3600);
await ev('scrollTo({top: 900, behavior: "instant"})'); await sleep(1600);
const detail = await ev(`(() => { const e = [...document.querySelectorAll("*")].filter(x => (x.innerText || "").trim() === "domingo 21:40")[0];
  if (!e) return null; const r = e.getBoundingClientRect(); const s = getComputedStyle(e);
  const under = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
  return { rect: { x: Math.round(r.left), y: Math.round(r.top), w: Math.round(r.width), h: Math.round(r.height) }, position: s.position, z: s.zIndex, topElement: (under ? (under.innerText || "").trim().slice(0, 40) : null) }; })()`);
console.log("ES 768 timestamp:", JSON.stringify(detail));
const s = await send("Page.captureScreenshot", { format: "png" });
writeFileSync(join(SHOTS, "rvd-768-es-home-overlap.png"), Buffer.from(s.result.data, "base64"));
ws.close(); for (const k of kids) k.kill(); process.exit(0);
