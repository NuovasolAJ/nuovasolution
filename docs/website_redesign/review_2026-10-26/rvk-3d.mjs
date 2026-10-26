import { spawn } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
const BASE = process.argv[2], OUT = process.argv[3], SHOTS = process.argv[4];
const CDP = 9431; const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
mkdirSync(SHOTS, { recursive: true });
const res = { deployment: BASE, started_utc: new Date().toISOString(), detail: {} };
const kids = [];
const prof = join(SHOTS, "p3d"); rmSync(prof, { recursive: true, force: true });
kids.push(spawn("C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe", ["--headless=new", "--disable-gpu", "--no-first-run", `--user-data-dir=${prof}`, `--remote-debugging-port=${CDP}`, "about:blank"], { stdio: "ignore" }));
let list; for (let i = 0; i < 60; i++) { try { list = await (await fetch(`http://127.0.0.1:${CDP}/json`)).json(); break; } catch { await sleep(500); } }
const ws = new WebSocket(list.find((t) => t.type === "page").webSocketDebuggerUrl); await new Promise((r) => ws.addEventListener("open", r));
let id = 0; const pend = new Map();
ws.addEventListener("message", (e) => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } });
const send = (m, p = {}) => new Promise((r) => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method: m, params: p })); });
const ev = async (x) => (await send("Runtime.evaluate", { expression: x, returnByValue: true, awaitPromise: true })).result?.result?.value;
const shot = async (n) => { const s = await send("Page.captureScreenshot", { format: "png" }); writeFileSync(join(SHOTS, n + ".png"), Buffer.from(s.result.data, "base64")); };
await send("Page.enable");
for (const [w, h, tag] of [[390, 844, "m390"], [1440, 950, "d1440"]]) {
  await send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: 2, mobile: w <= 430 });
  await send("Page.navigate", { url: BASE + "/es" }); await sleep(3600);
  const d = await ev(`(async () => { try { for (let i = 0; i < 16; i++) { scrollTo({top: innerHeight*i, behavior: "instant"}); await new Promise(r => setTimeout(r, 450)); }
    const head = [...document.querySelectorAll("h2, h3")].find(x => /De tu plano/i.test(x.innerText || ""));
    if (!head) return { found: false };
    head.scrollIntoView({ block: "start" }); await new Promise(r => setTimeout(r, 900));
    const block = head.closest("section") || head.closest("div");
    const imgs = [...block.querySelectorAll("img")].map(i => ({ src: (i.currentSrc || i.src || "").split("/").pop(), alt: (i.alt || "").slice(0, 70), loaded: i.complete && i.naturalWidth > 0, nw: i.naturalWidth, loading: i.getAttribute("loading") }));
    const v = block.querySelector("video");
    const vinfo = v ? { src: (v.currentSrc || "").split("/").pop(), poster: (v.getAttribute("poster") || "").split("/").pop(), label: (v.getAttribute("aria-label") || "").slice(0, 80), controls: v.controls, muted: v.muted, autoplay: v.autoplay, playsInline: v.playsInline, preload: v.preload, duration: Math.round((v.duration || 0) * 10) / 10 } : null;
    const captions = [...block.querySelectorAll("figcaption, p, li")].map(e => (e.innerText || "").trim()).filter(Boolean).slice(0, 10);
    const overflow = document.documentElement.scrollWidth > innerWidth + 1;
    return { found: true, imgs, video: vinfo, captions, canvas: block.querySelectorAll("canvas").length,
      pending: (block.innerText.split(" ").filter(w => /Pendiente/i.test(w)).length), overflow, blockWidth: Math.round(block.getBoundingClientRect().width) }; } catch (e) { return { found: false, error: String(e).slice(0, 120) }; } })()`);
  if (d?.video) {
    const box = await ev(`(() => { const v = document.querySelector("section video, div video"); if (!v) return null; v.scrollIntoView({ block: "center" }); const r = v.getBoundingClientRect(); return { x: Math.round(r.left + r.width / 2), y: Math.round(r.top + r.height / 2) }; })()`);
    if (box) { for (const type of ["mousePressed", "mouseReleased"]) { await send("Input.dispatchMouseEvent", { type, x: box.x, y: box.y, button: "left", clickCount: 1, buttons: type === "mousePressed" ? 1 : 0 }); await sleep(140); } await sleep(2600); }
    d.playback = await ev(`(() => { const v = document.querySelector("section video, div video"); if (!v) return null;
      return { playing: !v.paused, currentTime: Math.round((v.currentTime || 0) * 100) / 100, muted: v.muted, readyState: v.readyState }; })()`);
    if (!d.playback?.playing) { await ev('(async () => { const v = document.querySelector("section video, div video"); try { await v.play(); } catch (e) {} })()'); await sleep(2400);
      d.playback = { ...(await ev(`(() => { const v = document.querySelector("section video, div video"); return { playing: !v.paused, currentTime: Math.round((v.currentTime || 0) * 100) / 100, muted: v.muted }; })()`)), viaScript: true }; }
  }
  res.detail[tag] = d;
  console.log(tag, JSON.stringify(d ?? { undefined_result: true }).slice(0, 700));
  await shot(`rvk-${tag}-3d`);
}
writeFileSync(OUT, JSON.stringify(res, null, 1));
ws.close(); for (const k of kids) k.kill(); process.exit(0);
