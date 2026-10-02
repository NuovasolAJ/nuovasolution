// Finds when the picture changes in a product clip, so the caption cues can follow the visible action
// (COPY_DELTAS_0929 §5.1: "matched to the visible action rather than to a script"). Loads the clip from
// the local build in headless Edge, samples a frame every 0.5 s and reports the change against the frame before.
// Usage: node scripts/design/clip-cues.mjs /media/daily/daily-laura-es-desktop.mp4
import { spawn } from "node:child_process";
import { tmpdir } from "node:os";
import { join } from "node:path";

const ROOT = new URL("../../", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const EDGE = process.env.EDGE ?? "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const NEXT = join(ROOT, "node_modules", "next", "dist", "bin", "next");
const PORT = 3118, CDP_PORT = 9348;
const BASE = `http://localhost:${PORT}`;
const clips = process.argv.slice(2).length ? process.argv.slice(2) : ["media/daily/daily-laura-es-desktop.mp4", "media/daily/daily-laura-en-desktop.mp4", "media/daily/daily-laura-es-mobile.mp4", "media/daily/daily-laura-en-mobile.mp4"];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const kids = [];
try {
  const p = spawn(process.execPath, [NEXT, "start", "-p", String(PORT)], { cwd: ROOT, env: process.env, stdio: ["ignore", "pipe", "pipe"] });
  p.stdout.on("data", () => {}); p.stderr.on("data", () => {}); kids.push(p);
  for (let i = 0; i < 120; i++) { try { const r = await fetch(`${BASE}/en`, { redirect: "manual" }); if (r.status) break; } catch { /* not up */ } await sleep(500); }
  const prof = join(tmpdir(), `nuova-cues-${Date.now()}`);
  kids.push(spawn(EDGE, ["--headless=new", "--disable-gpu", "--no-first-run", "--autoplay-policy=no-user-gesture-required", `--user-data-dir=${prof}`, `--remote-debugging-port=${CDP_PORT}`, "about:blank"], { stdio: "ignore" }));
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
  await send("Page.navigate", { url: `${BASE}/en/contact` });
  await sleep(1500);
  for (const clip of clips) {
    const r = await ev(`(async()=>{
      const v=document.createElement('video'); v.muted=true; v.preload='auto'; v.src=${JSON.stringify("/" + clip.replace(/^\//, ""))};
      await new Promise((res,rej)=>{v.onloadeddata=res; v.onerror=()=>rej(new Error('load'));});
      const c=document.createElement('canvas'); c.width=160; c.height=Math.round(160*v.videoHeight/v.videoWidth); const g=c.getContext('2d',{willReadFrequently:true});
      const out=[]; let prev=null;
      for(let t=0;t<v.duration;t+=0.5){ v.currentTime=t; await new Promise(res=>{v.onseeked=res;}); g.drawImage(v,0,0,c.width,c.height); const d=g.getImageData(0,0,c.width,c.height).data; let diff=0; if(prev){for(let i=0;i<d.length;i+=4){diff+=Math.abs(d[i]-prev[i])+Math.abs(d[i+1]-prev[i+1])+Math.abs(d[i+2]-prev[i+2]);} diff=Math.round(diff/(d.length/4));} prev=new Uint8ClampedArray(d); out.push([t,diff]); }
      return {duration:v.duration,w:v.videoWidth,h:v.videoHeight,changes:out.filter(x=>x[1]>=2)};
    })()`);
    console.log(clip, JSON.stringify(r));
  }
  ws.close();
} finally {
  for (const k of kids) { try { k.kill(); } catch { /* gone */ } }
}
