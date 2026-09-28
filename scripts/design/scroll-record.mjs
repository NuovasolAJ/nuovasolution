// Scroll recording (owner criteria 2026-09-28): a short animated GIF of the home page scrolling
// through the hero, the stacked product cards and the transitions, desktop and phone, ES.
// Frames come from CDP screenshots while the page scrolls in steps; encoded with gifenc.
// Requires a prior `next build` (stub mode). Usage: node scripts/design/scroll-record.mjs
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import gifenc from "gifenc";
import { PNG } from "./png.mjs";

const { GIFEncoder, quantize, applyPalette } = gifenc;

const ROOT = new URL("../../", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const OUT = process.env.OUT ?? join(ROOT, "docs", "website_redesign", "design_probe_2026-09-28");
const EDGE = process.env.EDGE ?? "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const NEXT = join(ROOT, "node_modules", "next", "dist", "bin", "next");
const PORT = 3114, CDP_PORT = 9345;
const BASE = `http://localhost:${PORT}`;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
mkdirSync(OUT, { recursive: true });
const kids = [];
const start = (cmd, args) => { const p = spawn(cmd, args, { cwd: ROOT, env: process.env, stdio: ["ignore", "pipe", "pipe"] }); p.stdout.on("data", () => {}); p.stderr.on("data", () => {}); kids.push(p); return p; };
const waitHttp = async (url) => { for (let i = 0; i < 120; i++) { try { const r = await fetch(url, { redirect: "manual" }); if (r.status) return true; } catch { /* not up */ } await sleep(500); } throw new Error(`not reachable: ${url}`); };

try {
  start(process.execPath, [NEXT, "start", "-p", String(PORT)]);
  await waitHttp(`${BASE}/es`);
  const prof = join(tmpdir(), `nuova-scroll-${Date.now()}`);
  kids.push(spawn(EDGE, ["--headless=new", "--disable-gpu", "--no-first-run", "--hide-scrollbars", `--user-data-dir=${prof}`, `--remote-debugging-port=${CDP_PORT}`, "about:blank"], { stdio: "ignore" }));
  let list;
  for (let i = 0; i < 60; i++) { try { list = await (await fetch(`http://127.0.0.1:${CDP_PORT}/json`)).json(); break; } catch { await sleep(500); } }
  const ws = new WebSocket(list.find((t) => t.type === "page").webSocketDebuggerUrl);
  await new Promise((res) => ws.addEventListener("open", res));
  let mid = 0;
  const pend = new Map();
  ws.addEventListener("message", (e) => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } });
  const send = (method, params = {}) => new Promise((res) => { const i = ++mid; pend.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
  const ev = async (x) => (await send("Runtime.evaluate", { expression: x, returnByValue: true, awaitPromise: true })).result?.result?.value;
  await send("Page.enable");
  await send("Runtime.enable");

  for (const [tag, w, h, mobile, step, frameW] of [["d1440", 1440, 900, false, 90, 720], ["m390", 390, 844, true, 60, 390]]) {
    await send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: 1, mobile });
    await send("Page.navigate", { url: `${BASE}/es` });
    await sleep(2200);
    const total = await ev("document.documentElement.scrollHeight - innerHeight");
    const end = Math.min(total, mobile ? 5200 : 4200); // hero, pains, stacked cards, media, record
    const gif = GIFEncoder();
    const scale = frameW / w;
    const fh = Math.round(h * scale);
    let y = 0;
    let frames = 0;
    while (y <= end) {
      await ev(`window.scrollTo({top:${y},behavior:'instant'})`);
      await sleep(y === 0 ? 900 : 70);
      const s = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: false, clip: { x: 0, y: 0, width: w, height: h, scale } });
      const png = PNG.decode(Buffer.from(s.result.data, "base64"));
      const rgba = png.data;
      const palette = quantize(rgba, 128, { format: "rgba4444" });
      const index = applyPalette(rgba, palette, "rgba4444");
      gif.writeFrame(index, png.width, png.height, { palette, delay: y === 0 ? 900 : 60 });
      frames++;
      y += step;
    }
    gif.finish();
    const file = join(OUT, `scroll-${tag}-es-home.gif`);
    writeFileSync(file, Buffer.from(gif.bytes()));
    console.log(`wrote ${file} (${frames} frames, ${fh}px high)`);
  }
  ws.close();
} finally {
  for (const k of kids) { try { k.kill(); } catch { /* gone */ } }
}
