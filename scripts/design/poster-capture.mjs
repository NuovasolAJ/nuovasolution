// Poster capture for the prepared media places (audit Z14): renders the poster routes of the
// LOCAL stub build in headless Edge and writes the frames the MediaSlot component expects:
//   public/media/<slug>/<slug>-16x9-v<N>-poster-<locale>.jpg  (1600 × 900)
//   public/media/<slug>/<slug>-4x5-v<N>-poster-<locale>.jpg   (1080 × 1350)
// Requires a prior `next build` (stub mode). Usage: node scripts/design/poster-capture.mjs
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const ROOT = new URL("../../", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const EDGE = process.env.EDGE ?? "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const NEXT = join(ROOT, "node_modules", "next", "dist", "bin", "next");
const PORT = 3112, CDP_PORT = 9344;
const BASE = `http://localhost:${PORT}`;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const SLOTS = [
  { id: "V-01", slug: "nuova-agency-day", version: 1 },
  { id: "V-05", slug: "onboarding", version: 1 },
];
const kids = [];
const start = (cmd, args) => { const p = spawn(cmd, args, { cwd: ROOT, env: process.env, stdio: ["ignore", "pipe", "pipe"] }); p.stdout.on("data", () => {}); p.stderr.on("data", () => {}); kids.push(p); return p; };
const waitHttp = async (url) => { for (let i = 0; i < 120; i++) { try { const r = await fetch(url, { redirect: "manual" }); if (r.status) return true; } catch { /* not up */ } await sleep(500); } throw new Error(`not reachable: ${url}`); };

try {
  start(process.execPath, [NEXT, "start", "-p", String(PORT)]);
  await waitHttp(`${BASE}/en`);
  const prof = join(tmpdir(), `nuova-poster-${Date.now()}`);
  kids.push(spawn(EDGE, ["--headless=new", "--disable-gpu", "--no-first-run", "--hide-scrollbars", `--user-data-dir=${prof}`, `--remote-debugging-port=${CDP_PORT}`, "about:blank"], { stdio: "ignore" }));
  let list;
  for (let i = 0; i < 60; i++) { try { list = await (await fetch(`http://127.0.0.1:${CDP_PORT}/json`)).json(); break; } catch { await sleep(500); } }
  const ws = new WebSocket(list.find((t) => t.type === "page").webSocketDebuggerUrl);
  await new Promise((res) => ws.addEventListener("open", res));
  let mid = 0;
  const pend = new Map();
  ws.addEventListener("message", (e) => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } });
  const send = (method, params = {}) => new Promise((res) => { const i = ++mid; pend.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
  await send("Page.enable");

  for (const slot of SLOTS) {
    const dir = join(ROOT, "public", "media", slot.slug);
    mkdirSync(dir, { recursive: true });
    for (const locale of ["en", "es"]) {
      for (const [tag, w, h, q] of [["16x9", 1600, 900, ""], ["4x5", 1080, 1350, "?size=4x5"]]) {
        await send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: 1, mobile: false });
        await send("Page.navigate", { url: `${BASE}/poster/${locale}/${slot.id}${q}` });
        await sleep(1800);
        const s = await send("Page.captureScreenshot", { format: "jpeg", quality: 88, clip: { x: 0, y: 0, width: w, height: h, scale: 1 } });
        const file = join(dir, `${slot.slug}-${tag}-v${slot.version}-poster-${locale}.jpg`);
        writeFileSync(file, Buffer.from(s.result.data, "base64"));
        console.log("wrote", file);
      }
    }
  }
  ws.close();
} finally {
  for (const k of kids) { try { k.kill(); } catch { /* gone */ } }
}
