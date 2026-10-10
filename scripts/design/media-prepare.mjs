// Prepares the site's photographs and renders: resize, crop and encode as WebP with the headless browser's
// own canvas (no image library in the project). Usage: node scripts/design/media-prepare.mjs jobs.json
// jobs.json: [{ "src": "C:/abs/in.jpg", "out": "C:/abs/out.webp", "w": 1600, "aspect": 1.5, "crop": "center|right|left|top|bottom", "q": 0.82 }]
import { spawn } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { pathToFileURL } from "node:url";

const jobs = JSON.parse(readFileSync(process.argv[2], "utf8"));
const EDGE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const PORT = 9700 + Math.floor(Math.random() * 200);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const prof = join(tmpdir(), `nuova-media-${Date.now()}-${PORT}`);
const page = join(tmpdir(), `nuova-media-${PORT}.html`);
writeFileSync(page, "<!doctype html><title>media</title>");
const edge = spawn(EDGE, ["--headless=new", "--disable-gpu", "--no-first-run", "--allow-file-access-from-files", `--user-data-dir=${prof}`, `--remote-debugging-port=${PORT}`, pathToFileURL(page).href], { stdio: "ignore" });
try {
  let list;
  for (let i = 0; i < 60; i++) { try { list = await (await fetch(`http://127.0.0.1:${PORT}/json`)).json(); if (list.some((t) => t.type === "page")) break; } catch { /* not up yet */ } await sleep(400); }
  const ws = new WebSocket(list.find((t) => t.type === "page").webSocketDebuggerUrl);
  await new Promise((res) => ws.addEventListener("open", res));
  let mid = 0; const pend = new Map();
  ws.addEventListener("message", (e) => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } });
  const send = (method, params = {}) => new Promise((res) => { const i = ++mid; pend.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
  const ev = async (x) => { const r = await send("Runtime.evaluate", { expression: x, returnByValue: true, awaitPromise: true }); if (r.result?.exceptionDetails) throw new Error(JSON.stringify(r.result.exceptionDetails)); return r.result?.result?.value; };
  await send("Runtime.enable");
  await sleep(500);
  for (const j of jobs) {
    const src = pathToFileURL(j.src).href;
    const js = `(async () => {
      const img = new Image(); img.src = ${JSON.stringify(src)}; await img.decode();
      const aspect = ${j.aspect ?? "null"}; const crop = ${JSON.stringify(j.crop ?? "center")};
      let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;
      if (crop === "right-half") { sx = sw / 2; sw = sw / 2; }
      else if (crop === "left-half") { sw = sw / 2; }
      if (aspect) {
        const cur = sw / sh;
        if (cur > aspect) { const nw = sh * aspect; sx += crop === "left" ? 0 : crop === "right" ? sw - nw : (sw - nw) / 2; sw = nw; }
        else if (cur < aspect) { const nh = sw / aspect; sy += crop === "top" ? 0 : crop === "bottom" ? sh - nh : (sh - nh) / 2; sh = nh; }
      }
      const w = Math.min(${j.w}, Math.round(sw)); const h = Math.round(w * sh / sw);
      const c = document.createElement("canvas"); c.width = w; c.height = h;
      const g = c.getContext("2d"); g.imageSmoothingQuality = "high"; g.drawImage(img, sx, sy, sw, sh, 0, 0, w, h);
      const blob = await new Promise((r) => c.toBlob(r, "image/webp", ${j.q ?? 0.82}));
      const buf = new Uint8Array(await blob.arrayBuffer()); let s = ""; for (let i = 0; i < buf.length; i += 0x8000) s += String.fromCharCode.apply(null, buf.subarray(i, i + 0x8000));
      return { b64: btoa(s), w, h };
    })()`;
    const r = await ev(js);
    mkdirSync(dirname(j.out), { recursive: true });
    const bytes = Buffer.from(r.b64, "base64");
    writeFileSync(j.out, bytes);
    console.log(`${j.out} ${r.w}x${r.h} ${bytes.length} B`);
  }
  ws.close();
} finally { edge.kill(); }
