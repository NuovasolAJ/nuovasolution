// Does the product clip really start for a visitor? Trusted mouse input through CDP, not a script click.
import { spawn } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
const BASE = process.argv[2], OUT = process.argv[3], SHOTS = process.argv[4];
const CDP = 9395; const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
mkdirSync(SHOTS, { recursive: true });
const kids = []; const res = { base: BASE, started_utc: new Date().toISOString(), runs: [] };
const prof = join(SHOTS, "clipprof"); rmSync(prof, { recursive: true, force: true });
kids.push(spawn("C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe", ["--headless=new", "--disable-gpu", "--no-first-run", `--user-data-dir=${prof}`, `--remote-debugging-port=${CDP}`, "about:blank"], { stdio: "ignore" }));
let list; for (let i = 0; i < 60; i++) { try { list = await (await fetch(`http://127.0.0.1:${CDP}/json`)).json(); break; } catch { await sleep(500); } }
const ws = new WebSocket(list.find((t) => t.type === "page").webSocketDebuggerUrl); await new Promise((r) => ws.addEventListener("open", r));
let id = 0; const pend = new Map();
ws.addEventListener("message", (e) => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } });
const send = (m, p = {}) => new Promise((r) => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method: m, params: p })); });
const ev = async (x) => (await send("Runtime.evaluate", { expression: x, returnByValue: true, awaitPromise: true })).result?.result?.value;
const shot = async (n) => { const s = await send("Page.captureScreenshot", { format: "png" }); writeFileSync(join(SHOTS, n + ".png"), Buffer.from(s.result.data, "base64")); };
await send("Page.enable");

for (const [p, w, h] of [["/en", 390, 844], ["/es", 1440, 900]]) {
  await send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: 1, mobile: w <= 430 });
  await send("Page.navigate", { url: BASE + p }); await sleep(3600);
  const box = await ev(`(async () => {
    for (let i = 0; i < 12; i++) { scrollTo({top: innerHeight*i, behavior: "instant"}); await new Promise(r => setTimeout(r, 450)); }
    const b = [...document.querySelectorAll("button")].find(x => /play the clip|ver el clip/i.test((x.innerText || "") + (x.getAttribute("aria-label") || "")));
    if (!b) return null;
    b.scrollIntoView({ block: "center" }); await new Promise(r => setTimeout(r, 700));
    const r = b.getBoundingClientRect();
    return { x: Math.round(r.left + r.width / 2), y: Math.round(r.top + r.height / 2), label: (b.innerText || "").trim().slice(0, 30) };
  })()`);
  if (!box) { res.runs.push({ route: p, viewport: w, playControl: false }); continue; }
  for (const type of ["mousePressed", "mouseReleased"]) {
    await send("Input.dispatchMouseEvent", { type, x: box.x, y: box.y, button: "left", clickCount: 1, buttons: type === "mousePressed" ? 1 : 0 });
    await sleep(120);
  }
  await sleep(3500);
  const state = await ev(`(() => { const v = document.querySelector("video"); if (!v) return { video: false };
    return { video: true, playing: !v.paused, currentTime: Math.round((v.currentTime || 0) * 100) / 100, duration: Math.round((v.duration || 0) * 10) / 10,
      muted: v.muted, controls: v.controls, autoplay: v.autoplay, src: (v.currentSrc || "").split("/").pop(), volume: v.volume, readyState: v.readyState }; })()`);
  res.runs.push({ route: p, viewport: w, playControl: true, label: box.label, ...state });
  console.log(p, w, JSON.stringify({ label: box.label, ...state }));
  await shot(`rvd-clip-${w}${p.replace(/\//g, "-")}`);
}
writeFileSync(OUT, JSON.stringify(res, null, 1));
ws.close(); for (const k of kids) k.kill(); process.exit(0);
