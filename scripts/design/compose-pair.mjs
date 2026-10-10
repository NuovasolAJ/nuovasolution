// Puts two screenshots side by side with a caption each (before / after), using the headless browser's canvas.
// Usage: node scripts/design/compose-pair.mjs out.png "Before caption" before.png "After caption" after.png [maxHeight=1400]
import { spawn } from "node:child_process";
import { writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const [out, capA, a, capB, b, maxH = "1400"] = process.argv.slice(2);
const EDGE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const PORT = 9800 + Math.floor(Math.random() * 100);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const page = join(tmpdir(), `nuova-compose-${PORT}.html`);
writeFileSync(page, "<!doctype html><title>compose</title>");
const edge = spawn(EDGE, ["--headless=new", "--disable-gpu", "--no-first-run", "--allow-file-access-from-files", `--user-data-dir=${join(tmpdir(), `nuova-compose-${Date.now()}`)}`, `--remote-debugging-port=${PORT}`, pathToFileURL(page).href], { stdio: "ignore" });
try {
  let list;
  for (let i = 0; i < 60; i++) { try { list = await (await fetch(`http://127.0.0.1:${PORT}/json`)).json(); if (list.some((t) => t.type === "page")) break; } catch { /* not up */ } await sleep(400); }
  const ws = new WebSocket(list.find((t) => t.type === "page").webSocketDebuggerUrl);
  await new Promise((res) => ws.addEventListener("open", res));
  let mid = 0; const pend = new Map();
  ws.addEventListener("message", (e) => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } });
  const send = (method, params = {}) => new Promise((res) => { const i = ++mid; pend.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
  const ev = async (x) => { const r = await send("Runtime.evaluate", { expression: x, returnByValue: true, awaitPromise: true }); if (r.result?.exceptionDetails) throw new Error(JSON.stringify(r.result.exceptionDetails)); return r.result?.result?.value; };
  await send("Runtime.enable"); await sleep(400);
  const js = `(async () => {
    const load = async (src) => { const img = new Image(); img.src = src; await img.decode(); return img; };
    const A = await load(${JSON.stringify(pathToFileURL(a).href)}), B = await load(${JSON.stringify(pathToFileURL(b).href)});
    const maxH = ${Number(maxH)}; const cap = 44, gap = 24, pad = 24;
    const sA = Math.min(1, maxH / A.naturalHeight), sB = Math.min(1, maxH / B.naturalHeight);
    const wA = Math.round(A.naturalWidth * sA), hA = Math.round(A.naturalHeight * sA), wB = Math.round(B.naturalWidth * sB), hB = Math.round(B.naturalHeight * sB);
    const W = pad + wA + gap + wB + pad, Hh = pad + cap + Math.max(hA, hB) + pad;
    const c = document.createElement("canvas"); c.width = W; c.height = Hh; const g = c.getContext("2d");
    g.fillStyle = "#f3f1ec"; g.fillRect(0, 0, W, Hh);
    g.fillStyle = "#1a1917"; g.font = "600 20px Segoe UI, Arial, sans-serif"; g.textBaseline = "top";
    g.fillText(${JSON.stringify(capA)}, pad, pad + 8); g.fillText(${JSON.stringify(capB)}, pad + wA + gap, pad + 8);
    g.imageSmoothingQuality = "high";
    g.drawImage(A, pad, pad + cap, wA, hA); g.drawImage(B, pad + wA + gap, pad + cap, wB, hB);
    g.strokeStyle = "#d9d5cc"; g.lineWidth = 1; g.strokeRect(pad + 0.5, pad + cap + 0.5, wA - 1, hA - 1); g.strokeRect(pad + wA + gap + 0.5, pad + cap + 0.5, wB - 1, hB - 1);
    const blob = await new Promise((r) => c.toBlob(r, "image/png")); const buf = new Uint8Array(await blob.arrayBuffer());
    let s = ""; for (let i = 0; i < buf.length; i += 0x8000) s += String.fromCharCode.apply(null, buf.subarray(i, i + 0x8000)); return btoa(s);
  })()`;
  writeFileSync(out, Buffer.from(await ev(js), "base64"));
  console.log("wrote", out);
  ws.close();
} finally { edge.kill(); }
