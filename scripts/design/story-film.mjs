// The scroll film of the main story (master order 2026-10-10 §12): from the hero at rest (the sequence runs),
// down through the six chapters A to F, with a pause on each so its stage can be read, the channel changed in B
// and the task taken and closed in D, the request sent in E, the social strip, then the 3D section. Desktop 1440x900 (or VIEW=m390 for the phone).
// Captured scroll-step by scroll-step from headless Edge over CDP and encoded in a second headless browser with
// WebCodecs (H.264) and mp4-muxer, as owner-export.mjs does; real time runs slower than the film (REAL_MS per
// frame); the hero's own sequence is slowed to the film's pace, the rest runs at the natural rate. Both browsers
// start with background throttling off: Chromium freezes a quiet headless tab after five minutes, which stalled
// the longer captures (2026-10-12).
// Usage: BASE=https://… MUXER=<path to mp4-muxer.min.js> OUT=<folder> [LOCALES=es,en] [VIEW=m390] [REAL_MS=480] node scripts/design/story-film.mjs
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync, copyFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const BASE = (process.env.BASE ?? "").replace(/\/$/, "");
if (!BASE) throw new Error("BASE=https://… is required (a deployed origin)");
const OUT = process.env.OUT ?? join(process.cwd(), "docs", "website_redesign", "evidence_2026-10-10", "film");
const MUXER = process.env.MUXER;
if (!MUXER) throw new Error("MUXER=<path to mp4-muxer.min.js> is required");
const EDGE = process.env.EDGE ?? "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
// A port pair that no other headless browser holds (a lingering instance on a reused port answers /json with its own pages).
const CDP_PORT = await (async () => {
  for (let tries = 0; tries < 20; tries++) {
    const port = 9600 + Math.floor(Math.random() * 200) * 2;
    const busy = async (q) => { try { await fetch(`http://127.0.0.1:${q}/json`, { signal: AbortSignal.timeout(400) }); return true; } catch { return false; } };
    if (!(await busy(port)) && !(await busy(port + 1))) return port;
  }
  throw new Error("no free debugging port pair found");
})();
const LOCALES = process.env.LOCALES ? process.env.LOCALES.split(",") : ["es"];
const PHONE = process.env.VIEW === "m390";
const FPS = 30;
const REAL_MS = Number(process.env.REAL_MS ?? 280);
const RATE = 1000 / FPS / REAL_MS;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
mkdirSync(OUT, { recursive: true });

const kids = [];
try {
  const prof = join(tmpdir(), `nuova-storyfilm-${Date.now()}`);
  kids.push(spawn(EDGE, ["--headless=new", "--disable-gpu", "--no-first-run", "--hide-scrollbars", "--autoplay-policy=no-user-gesture-required", "--disable-background-timer-throttling", "--disable-renderer-backgrounding", "--disable-backgrounding-occluded-windows", "--disable-features=IntensiveWakeUpThrottling", `--user-data-dir=${prof}`, `--remote-debugging-port=${CDP_PORT}`, "about:blank"], { stdio: "ignore" }));
  let list;
  for (let i = 0; i < 60; i++) { try { list = await (await fetch(`http://127.0.0.1:${CDP_PORT}/json`)).json(); break; } catch { await sleep(500); } }
  const connect = async (wsUrl, name = "cdp") => {
    const ws = new WebSocket(wsUrl);
    await new Promise((res) => ws.addEventListener("open", res));
    let mid = 0;
    const pend = new Map();
    ws.addEventListener("message", (e) => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id).res(m); pend.delete(m.id); } });
    // A closed socket or a call that never answers must fail loudly, never leave the film hanging.
    ws.addEventListener("close", (e) => { for (const p of pend.values()) p.rej(new Error(`CDP ${name} socket closed (${e.code}) during ${p.method}`)); pend.clear(); });
    const send = (method, params = {}) => new Promise((res, rej) => {
      const i = ++mid;
      const t = setTimeout(() => { pend.delete(i); rej(new Error(`CDP ${name} ${method} did not answer in 30 s`)); }, 30_000);
      pend.set(i, { method, res: (m) => { clearTimeout(t); res(m); }, rej: (err) => { clearTimeout(t); rej(err); } });
      ws.send(JSON.stringify({ id: i, method, params }));
    });
    const ev = async (x) => { const r = await send("Runtime.evaluate", { expression: x, returnByValue: true, awaitPromise: true }); if (r.result?.exceptionDetails) throw new Error(r.result.exceptionDetails.exception?.description ?? "evaluate failed"); return r.result?.result?.value; };
    await send("Page.enable"); await send("Runtime.enable");
    return { ws, send, ev };
  };
  const page = await connect(list.find((t) => t.type === "page" && /about:blank|^http/.test(t.url)).webSocketDebuggerUrl, "page");

  const encDir = join(tmpdir(), `nuova-storyenc-${Date.now()}`);
  mkdirSync(encDir, { recursive: true });
  copyFileSync(MUXER, join(encDir, "mp4-muxer.min.js"));
  writeFileSync(join(encDir, "encode.html"), `<!doctype html><title>encode</title><script src="mp4-muxer.min.js"></script><script>
    let muxer, encoder, fps, err = null, frames = 0;
    window.enc = {
      async init(w, h, f) { fps = f; muxer = new Mp4Muxer.Muxer({ target: new Mp4Muxer.ArrayBufferTarget(), video: { codec: "avc", width: w, height: h }, fastStart: "in-memory" });
        encoder = new VideoEncoder({ output: (c, m) => muxer.addVideoChunk(c, m), error: (e) => { err = e.message; } });
        const cfg = { codec: "avc1.640028", width: w, height: h, bitrate: 9_000_000, framerate: f, hardwareAcceleration: "prefer-software", avc: { format: "avc" } };
        const s = await VideoEncoder.isConfigSupported(cfg); if (!s.supported) throw new Error("H.264 encoder not supported here"); encoder.configure(cfg); return true; },
      async add(b64, i) { const blob = await (await fetch("data:image/jpeg;base64," + b64)).blob(); const bmp = await createImageBitmap(blob);
        const vf = new VideoFrame(bmp, { timestamp: Math.round(i * 1e6 / fps), duration: Math.round(1e6 / fps) }); encoder.encode(vf, { keyFrame: i % 90 === 0 }); vf.close(); bmp.close(); frames++;
        if (frames % 30 === 0) await encoder.flush(); if (err) throw new Error(err); return frames; },
      async finish() { await encoder.flush(); muxer.finalize(); const blob = new Blob([muxer.target.buffer], { type: "video/mp4" });
        const url = await new Promise((res) => { const fr = new FileReader(); fr.onload = () => res(fr.result); fr.readAsDataURL(blob); }); return url.slice(url.indexOf(",") + 1); },
    };
  </script>`);
  const encUrl = "file:///" + join(encDir, "encode.html").replace(/\\/g, "/");
  kids.push(spawn(EDGE, ["--headless=new", "--disable-gpu", "--no-first-run", "--allow-file-access-from-files", "--disable-background-timer-throttling", "--disable-renderer-backgrounding", "--disable-backgrounding-occluded-windows", "--disable-features=IntensiveWakeUpThrottling", `--user-data-dir=${prof}-enc`, `--remote-debugging-port=${CDP_PORT + 1}`, encUrl], { stdio: "ignore" }));
  let list2;
  for (let i = 0; i < 60; i++) { try { list2 = await (await fetch(`http://127.0.0.1:${CDP_PORT + 1}/json`)).json(); break; } catch { await sleep(500); } }
  const enc = await connect(list2.find((t) => t.type === "page" && t.url.startsWith("file:")).webSocketDebuggerUrl, "encoder");
  await sleep(1000);
  if ((await enc.ev("typeof Mp4Muxer")) !== "object") throw new Error("mp4-muxer did not load in the encoder page");

  const VW = PHONE ? 390 : 1440, VH = PHONE ? 844 : 900, DPR = PHONE ? 2 : 1;
  const W = VW * DPR, H = VH * DPR;
  await page.send("Emulation.setDeviceMetricsOverride", { width: VW, height: VH, deviceScaleFactor: DPR, mobile: PHONE });
  await page.send("Animation.enable");
  const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

  for (const locale of LOCALES) {
    await page.send("Page.navigate", { url: `${BASE}/${locale}` });
    await sleep(6000);
    // Everything revealed and every lazy image loaded before the film starts, so no frame catches a half-loaded stage.
    await page.ev("(()=>{document.querySelectorAll('.reveal').forEach(e=>e.classList.add('is-in'));document.querySelectorAll('img[loading=lazy]').forEach(i=>i.loading='eager');return true})()");
    await sleep(2500);
    const headerH = parseFloat(await page.ev("getComputedStyle(document.documentElement).getPropertyValue('--header-h')")) || 72;
    const pos = JSON.parse(await page.ev(`(()=>{const t=(s)=>{const e=document.querySelector(s);const r=e.getBoundingClientRect();return {top:Math.round(r.top+scrollY),bottom:Math.round(r.bottom+scrollY)}};const st=(id)=>{const e=document.getElementById(id).querySelector('[data-story-stage]');const r=e.getBoundingClientRect();return {top:Math.round(r.top+scrollY),bottom:Math.round(r.bottom+scrollY)}};return JSON.stringify({hero:t('.hero-world'),storyH:t('#story-h'),a:st('story-a'),b:st('story-b'),c:st('story-c'),d:st('story-d'),e:st('story-e'),f:st('story-f'),social:t('#story-social'),m3:t('#model-3d'),max:document.documentElement.scrollHeight-innerHeight})})()`));
    // Each stage is shown with its top under the header; a tall stage is scrolled through slowly during its hold.
    const at = (s) => Math.max(0, Math.min(pos.max, s.top - headerH - 24));
    const through = (s) => Math.max(at(s), Math.min(pos.max, s.bottom - VH + 24));
    const plan = [
      ["hold", 5.0, 0, 0, null],
      ["scroll", 3.0, 0, pos.hero.bottom - VH * 0.6, null],
      ["scroll", 1.4, pos.hero.bottom - VH * 0.6, at(pos.a), null],
      ["scroll", 2.6, at(pos.a), through(pos.a), null],
      ["scroll", 1.2, through(pos.a), at(pos.b), null],
      ["hold", 1.8, at(pos.b), at(pos.b), null],
      ["hold", 2.2, at(pos.b), at(pos.b), "document.querySelector('[data-channel-tab=email]').click()"],
      ["hold", 2.0, at(pos.b), at(pos.b), "document.querySelector('[data-translation-toggle]')?.click()"],
      ["hold", 2.2, at(pos.b), at(pos.b), "document.querySelector('[data-channel-tab=phone]').click()"],
      ["scroll", 1.8, at(pos.b), through(pos.b), null],
      ["scroll", 1.2, through(pos.b), at(pos.c), null],
      ["scroll", 3.0, at(pos.c), through(pos.c), null],
      ["scroll", 1.2, through(pos.c), at(pos.d), null],
      ["hold", 1.6, at(pos.d), at(pos.d), null],
      ["hold", 1.6, at(pos.d), at(pos.d), "document.querySelector('[data-task-take]').click()"],
      ["hold", 2.0, at(pos.d), at(pos.d), "document.querySelector('[data-task-confirm]')?.click()"],
      ["hold", 2.2, at(pos.d), at(pos.d), "document.querySelector('[data-task-complete]').click()"],
      ["scroll", 1.6, at(pos.d), through(pos.d), null],
      ["scroll", 1.2, through(pos.d), at(pos.e), null],
      ["scroll", 3.2, at(pos.e), through(pos.e), null],
      ["hold", 2.4, through(pos.e), through(pos.e), "document.querySelector('[data-story-request]')?.click()"],
      ["scroll", 1.2, through(pos.e), at(pos.f), null],
      ["scroll", 2.8, at(pos.f), through(pos.f), null],
      ["scroll", 1.2, through(pos.f), at(pos.social), null],
      ["scroll", 2.6, at(pos.social), through(pos.social), null],
      ["scroll", 1.4, through(pos.social), pos.m3.top - headerH, null],
      ["scroll", 2.6, pos.m3.top - headerH, Math.min(pos.max, pos.m3.top - headerH + VH * 0.9), null],
      ["hold", 1.0, Math.min(pos.max, pos.m3.top - headerH + VH * 0.9), Math.min(pos.max, pos.m3.top - headerH + VH * 0.9), null],
    ];
    // The slowed playback is used only for the hero's own sequence (the first hold): with it on, a later
    // capture after a React state change was seen to stall the renderer (two runs, 2026-10-12). From the first
    // scroll on, the page runs at its natural rate; the scroll itself is frame-indexed and unaffected.
    await page.send("Animation.setPlaybackRate", { playbackRate: RATE });
    await enc.ev(`enc.init(${W}, ${H}, ${FPS})`);
    await page.ev("window.scrollTo({top:0,behavior:'instant'})");
    await sleep(400);
    await page.ev("document.querySelector('[data-seq-replay]')?.click()");
    let i = 0, late = 0, reused = 0, lastFrame = null;
    const t0 = Date.now();
    for (const [idx, [kind, secs, from, to, action]] of plan.entries()) {
      const n = Math.round(secs * FPS);
      if (idx === 1) await page.send("Animation.setPlaybackRate", { playbackRate: 1 });
      if (action) { await page.ev(action); }
      for (let k = 0; k < n; k++, i++) {
        const target = Date.now() + REAL_MS;
        const y = kind === "scroll" ? Math.round(from + (to - from) * ease((k + 1) / n)) : from;
        await page.ev(`(()=>{ window.scrollTo({top:${y},behavior:'instant'}); return new Promise(r=>{ const t=setTimeout(r,250); requestAnimationFrame(()=>requestAnimationFrame(()=>{ clearTimeout(t); r(); })); }); })()`);
        // A capture that does not come back in time never stalls the film: the previous frame is used once more.
        let data = lastFrame;
        try {
          const s = await Promise.race([page.send("Page.captureScreenshot", { format: "jpeg", quality: 90, captureBeyondViewport: false }), new Promise((_, rej) => setTimeout(() => rej(new Error("capture timeout")), 8000))]);
          data = s.result.data; lastFrame = data;
        } catch (e) { if (!lastFrame) throw e; reused++; }
        await enc.ev(`enc.add(${JSON.stringify(data)}, ${i})`);
        const rest = target - Date.now();
        if (rest > 0) await sleep(rest); else late++;
      }
      console.log(`${locale}: ${kind} ${secs}s ${Math.round(from)}->${Math.round(to)}${action ? " +action" : ""} (${i} frames, ${Math.round((Date.now() - t0) / 1000)}s real)`);
    }
    const bytes = Buffer.from(await enc.ev("enc.finish()"), "base64");
    const file = join(OUT, `story-film-${PHONE ? "m390" : "d1440"}-${locale}.mp4`);
    writeFileSync(file, bytes);
    console.log(`wrote ${file} (${i} frames = ${(i / FPS).toFixed(1)}s at ${FPS} fps, ${W}x${H}, ${Math.round(bytes.length / 1024)} kB, ${late} late frames, ${reused} frames reused)`);
    await page.send("Animation.setPlaybackRate", { playbackRate: 1 });
    await enc.ev("location.reload()");
    await sleep(1500);
  }
  enc.ws.close();
  page.ws.close();
} finally {
  for (const k of kids) { try { k.kill(); } catch { /* gone */ } }
}
