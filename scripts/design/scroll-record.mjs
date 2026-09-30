// Scroll recording (owner order 2026-09-29, return: short scroll clips of the home page, EN and ES): an
// animated GIF of the whole home page scrolling from the hero to the closing section, desktop and phone.
// Frames come from CDP screenshots while the page scrolls in steps; encoded with gifenc. At most about
// 120 frames per clip, so the step grows with the page.
// Renders a LOCAL build (default, requires `next build` in stub mode) or a deployed origin (BASE=https://…).
// Usage: node scripts/design/scroll-record.mjs      LOCALES=es VIEWS=m390 to narrow it
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import gifenc from "gifenc";
import { PNG } from "./png.mjs";

const { GIFEncoder, quantize, applyPalette } = gifenc;

const ROOT = new URL("../../", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const OUT = process.env.OUT ?? join(ROOT, "docs", "website_redesign", "design_probe_2026-09-29", "scroll");
const EDGE = process.env.EDGE ?? "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const NEXT = join(ROOT, "node_modules", "next", "dist", "bin", "next");
const PORT = 3114, CDP_PORT = 9345;
const BASE = (process.env.BASE ?? `http://localhost:${PORT}`).replace(/\/$/, "");
const LOCALES = process.env.LOCALES ? process.env.LOCALES.split(",") : ["en", "es"];
const VIEWS = process.env.VIEWS ? process.env.VIEWS.split(",") : ["d1440", "m390"];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
mkdirSync(OUT, { recursive: true });
const kids = [];
const start = (cmd, args) => { const p = spawn(cmd, args, { cwd: ROOT, env: process.env, stdio: ["ignore", "pipe", "pipe"] }); p.stdout.on("data", () => {}); p.stderr.on("data", () => {}); kids.push(p); return p; };
const waitHttp = async (url) => { for (let i = 0; i < 120; i++) { try { const r = await fetch(url, { redirect: "manual" }); if (r.status) return true; } catch { /* not up */ } await sleep(500); } throw new Error(`not reachable: ${url}`); };

try {
  if (!process.env.BASE) {
    start(process.execPath, [NEXT, "start", "-p", String(PORT)]);
    await waitHttp(`${BASE}/es`);
  }
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

  for (const locale of LOCALES) for (const [tag, w, h, mobile, minStep, frameW] of [["d1440", 1440, 900, false, 90, 720], ["m390", 390, 844, true, 70, 390]].filter(([t]) => VIEWS.includes(t))) {
    await send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: 1, mobile });
    await send("Page.navigate", { url: `${BASE}/${locale}` });
    await sleep(process.env.BASE ? 3500 : 2200);
    const end = await ev("document.documentElement.scrollHeight - innerHeight"); // the whole page
    const step = Math.max(minStep, Math.ceil(end / 120));
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
    const file = join(OUT, `scroll-${tag}-${locale}-home.gif`);
    const bytes = Buffer.from(gif.bytes());
    writeFileSync(file, bytes);
    console.log(`wrote ${file} (${frames} frames of ${frameW}x${fh}, page ${end + h}px, ${Math.round(bytes.length / 1024)} kB)`);
  }
  ws.close();
} finally {
  for (const k of kids) { try { k.kill(); } catch { /* gone */ } }
}
