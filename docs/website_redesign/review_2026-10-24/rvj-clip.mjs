import { spawn } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
const BASE = process.argv[2], OUT = process.argv[3], SHOTS = process.argv[4];
const CDP = 9423; const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
mkdirSync(SHOTS, { recursive: true });
const kids = [];
const prof = join(SHOTS, "clipprof"); rmSync(prof, { recursive: true, force: true });
kids.push(spawn("C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe", ["--headless=new", "--disable-gpu", "--no-first-run", `--user-data-dir=${prof}`, `--remote-debugging-port=${CDP}`, "about:blank"], { stdio: "ignore" }));
let list; for (let i = 0; i < 60; i++) { try { list = await (await fetch(`http://127.0.0.1:${CDP}/json`)).json(); break; } catch { await sleep(500); } }
const ws = new WebSocket(list.find((t) => t.type === "page").webSocketDebuggerUrl); await new Promise((r) => ws.addEventListener("open", r));
let id = 0; const pend = new Map();
ws.addEventListener("message", (e) => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } });
const send = (m, p = {}) => new Promise((r) => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method: m, params: p })); });
const ev = async (x) => (await send("Runtime.evaluate", { expression: x, returnByValue: true, awaitPromise: true })).result?.result?.value;
await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 950, deviceScaleFactor: 1, mobile: false });
await send("Page.navigate", { url: BASE + "/es" }); await sleep(3600);
const box = await ev(`(async () => { for (let i = 0; i < 16; i++) { scrollTo({top: innerHeight*i, behavior: "instant"}); await new Promise(r => setTimeout(r, 420)); }
  const v = document.querySelector("video"); if (!v) return null;
  v.scrollIntoView({ block: "center" }); await new Promise(r => setTimeout(r, 800));
  const r = v.getBoundingClientRect();
  return { x: Math.round(r.left + r.width / 2), y: Math.round(r.top + r.height * 0.9), label: v.getAttribute("aria-label") || "", poster: v.getAttribute("poster"), src: (v.currentSrc || "").split("/").pop(), duration: Math.round((v.duration || 0) * 10) / 10 }; })()`);
let state = null;
if (box) {
  for (const type of ["mousePressed", "mouseReleased"]) { await send("Input.dispatchMouseEvent", { type, x: box.x, y: box.y, button: "left", clickCount: 1, buttons: type === "mousePressed" ? 1 : 0 }); await sleep(140); }
  await sleep(3200);
  state = await ev(`(() => { const v = document.querySelector("video"); if (!v) return null;
    return { playing: !v.paused, currentTime: Math.round((v.currentTime || 0) * 100) / 100, duration: Math.round((v.duration || 0) * 10) / 10, muted: v.muted, volume: v.volume, readyState: v.readyState }; })()`);
  if (!state?.playing) { await ev('(async () => { const v = document.querySelector("video"); try { await v.play(); } catch (e) {} })()'); await sleep(2500);
    state = { ...(await ev(`(() => { const v = document.querySelector("video"); return { playing: !v.paused, currentTime: Math.round((v.currentTime || 0) * 100) / 100, muted: v.muted, readyState: v.readyState }; })()`)), viaScript: true }; }
}
const s = await send("Page.captureScreenshot", { format: "png" });
writeFileSync(join(SHOTS, "rvj-3d-ride.png"), Buffer.from(s.result.data, "base64"));
writeFileSync(OUT, JSON.stringify({ base: BASE, video: box, state, utc: new Date().toISOString() }, null, 1));
console.log(JSON.stringify({ video: box, state }));
ws.close(); for (const k of kids) k.kill(); process.exit(0);
