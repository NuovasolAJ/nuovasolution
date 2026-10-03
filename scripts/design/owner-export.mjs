// Owner export (order 2026-10-02): from a deployed origin, full-page PNG screenshots of the home page and the
// packages page (desktop 1440 and phone 390), and a short MP4 scroll film of the home page on desktop: the hero
// at rest, the depth layers moving while the hero scrolls out, the card deck, the film module opened (play
// pressed, the clip running with its caption), then the rest of the page. Everything comes from headless Edge
// over CDP; the MP4 is encoded in the same browser with WebCodecs (H.264, software) and mp4-muxer, so no
// ffmpeg is needed. The page is read only: nothing is deployed and no protection is touched.
//
// Frames are captured scroll-step by scroll-step and stamped at 30 fps; real time runs 3.6x slower than the film
// (REAL_MS per frame), and the document's animations and the clip are slowed by the same factor, so transitions
// and the film play at natural speed in the result.
//
// Usage: BASE=https://… MUXER=<path to mp4-muxer.min.js> OUT=<folder> node scripts/design/owner-export.mjs
//        LOCALES=en,es  SKIP_SHOTS=1  SKIP_VIDEO=1
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync, copyFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const ROOT = new URL("../../", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const BASE = (process.env.BASE ?? "").replace(/\/$/, "");
if (!BASE) throw new Error("BASE=https://… is required (a deployed origin)");
const OUT = process.env.OUT ?? join(ROOT, "docs", "website_redesign", "owner_export_2026-10-02");
const MUXER = process.env.MUXER;
const EDGE = process.env.EDGE ?? "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const CDP_PORT = 9351;
const LOCALES = process.env.LOCALES ? process.env.LOCALES.split(",") : ["en", "es"];
const FPS = 30;
const REAL_MS = Number(process.env.REAL_MS ?? 240); // real milliseconds per film frame (a 1440x900 capture costs about 200 ms here)
const RATE = 1000 / FPS / REAL_MS; // playback rate for animations and the clip (≈ 0.278)
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
mkdirSync(OUT, { recursive: true });

const kids = [];
try {
  const prof = join(tmpdir(), `nuova-export-${Date.now()}`);
  kids.push(spawn(EDGE, ["--headless=new", "--disable-gpu", "--no-first-run", "--hide-scrollbars", "--autoplay-policy=no-user-gesture-required", "--allow-file-access-from-files", `--user-data-dir=${prof}`, `--remote-debugging-port=${CDP_PORT}`, "about:blank"], { stdio: "ignore" }));
  let list;
  for (let i = 0; i < 60; i++) { try { list = await (await fetch(`http://127.0.0.1:${CDP_PORT}/json`)).json(); break; } catch { await sleep(500); } }

  const connect = async (wsUrl) => {
    const ws = new WebSocket(wsUrl);
    await new Promise((res) => ws.addEventListener("open", res));
    let mid = 0;
    const pend = new Map();
    ws.addEventListener("message", (e) => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } });
    const send = (method, params = {}) => new Promise((res) => { const i = ++mid; pend.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
    const ev = async (x) => { const r = await send("Runtime.evaluate", { expression: x, returnByValue: true, awaitPromise: true }); if (r.result?.exceptionDetails) throw new Error(r.result.exceptionDetails.exception?.description ?? "evaluate failed"); return r.result?.result?.value; };
    await send("Page.enable");
    await send("Runtime.enable");
    return { ws, send, ev };
  };
  const page = await connect(list.find((t) => t.type === "page").webSocketDebuggerUrl);

  const REVEAL = "(()=>{document.querySelectorAll('.reveal,.rise').forEach(e=>e.classList.add('is-in'));document.querySelectorAll('img[loading=lazy]').forEach(i=>i.loading='eager');return true})()";

  // 1 Full-page screenshots
  if (!process.env.SKIP_SHOTS) {
    for (const locale of LOCALES) {
      for (const [tag, w, h, mobile, dpr] of [["desktop", 1440, 900, false, 1], ["mobile", 390, 844, true, 2]]) {
        await page.send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: dpr, mobile });
        for (const [name, path] of [["home", ""], ["packages", "/packages"]]) {
          await page.send("Page.navigate", { url: `${BASE}/${locale}${path}` });
          await sleep(3500);
          await page.ev(REVEAL);
          await sleep(900);
          const height = await page.ev("document.documentElement.scrollHeight");
          const s = await page.send("Page.captureScreenshot", { format: "png", captureBeyondViewport: true, clip: { x: 0, y: 0, width: w, height: Math.min(height, 16000), scale: 1 } });
          const file = join(OUT, `${name}-${tag}-${locale}.png`);
          const bytes = Buffer.from(s.result.data, "base64");
          writeFileSync(file, bytes);
          console.log(`wrote ${file} (${w}x${height} css px, dpr ${dpr}, ${Math.round(bytes.length / 1024)} kB)`);
        }
      }
    }
  }

  // 2 Scroll film of the home page, desktop
  if (!process.env.SKIP_VIDEO) {
    if (!MUXER) throw new Error("MUXER=<path to mp4-muxer.min.js> is required for the film");
    const encDir = join(tmpdir(), `nuova-encode-${Date.now()}`);
    mkdirSync(encDir, { recursive: true });
    copyFileSync(MUXER, join(encDir, "mp4-muxer.min.js"));
    writeFileSync(join(encDir, "encode.html"), `<!doctype html><title>encode</title><script src="mp4-muxer.min.js"></script><script>
      let muxer, encoder, fps, err = null, frames = 0;
      window.enc = {
        async init(w, h, f) {
          fps = f;
          muxer = new Mp4Muxer.Muxer({ target: new Mp4Muxer.ArrayBufferTarget(), video: { codec: "avc", width: w, height: h }, fastStart: "in-memory" });
          encoder = new VideoEncoder({ output: (c, m) => muxer.addVideoChunk(c, m), error: (e) => { err = e.message; } });
          const cfg = { codec: "avc1.640028", width: w, height: h, bitrate: 9_000_000, framerate: f, hardwareAcceleration: "prefer-software", avc: { format: "avc" } };
          const s = await VideoEncoder.isConfigSupported(cfg);
          if (!s.supported) throw new Error("H.264 encoder not supported here");
          encoder.configure(cfg);
          return true;
        },
        async add(b64, i) {
          const blob = await (await fetch("data:image/jpeg;base64," + b64)).blob();
          const bmp = await createImageBitmap(blob);
          const vf = new VideoFrame(bmp, { timestamp: Math.round(i * 1e6 / fps), duration: Math.round(1e6 / fps) });
          encoder.encode(vf, { keyFrame: i % 90 === 0 });
          vf.close(); bmp.close(); frames++;
          if (frames % 30 === 0) await encoder.flush(); // keeps the queue short without a timer loop
          if (err) throw new Error(err);
          return frames;
        },
        async finish() {
          await encoder.flush();
          muxer.finalize();
          const blob = new Blob([muxer.target.buffer], { type: "video/mp4" });
          const url = await new Promise((res) => { const fr = new FileReader(); fr.onload = () => res(fr.result); fr.readAsDataURL(blob); });
          return url.slice(url.indexOf(",") + 1);
        },
      };
    </script>`);
    const encUrl = "file:///" + join(encDir, "encode.html").replace(/\\/g, "/");
    // A second browser for the encoder: a second tab in the first one would take the foreground, and a
    // background tab gets no animation frames, so the page's scroll-driven layers would never update.
    kids.push(spawn(EDGE, ["--headless=new", "--disable-gpu", "--no-first-run", "--allow-file-access-from-files", `--user-data-dir=${prof}-enc`, `--remote-debugging-port=${CDP_PORT + 1}`, encUrl], { stdio: "ignore" }));
    let list2;
    for (let i = 0; i < 60; i++) { try { list2 = await (await fetch(`http://127.0.0.1:${CDP_PORT + 1}/json`)).json(); break; } catch { await sleep(500); } }
    const enc = await connect(list2.find((t) => t.type === "page").webSocketDebuggerUrl);
    await sleep(1000);
    if ((await enc.ev("typeof Mp4Muxer")) !== "object") throw new Error("mp4-muxer did not load in the encoder page");
    console.log("encoder page ready");

    // FILM=hero: the hero only (the sequence from its start, then the scroll that shows the layers move), on the
    // desktop or, with VIEW=m390, on the phone. Without FILM: the whole page with the deck and the clip (1001 layout).
    const HERO = process.env.FILM === "hero";
    const PHONE = process.env.VIEW === "m390";
    const VW = PHONE ? 390 : 1440, VH = PHONE ? 844 : 900, DPR = PHONE ? 2 : 1;
    const W = VW * DPR, H = VH * DPR;
    await page.send("Emulation.setDeviceMetricsOverride", { width: VW, height: VH, deviceScaleFactor: DPR, mobile: PHONE });
    await page.send("Animation.enable");

    for (const locale of HERO ? LOCALES : []) {
      await page.send("Page.navigate", { url: `${BASE}/${locale}` });
      await sleep(5000);
      await page.send("Animation.setPlaybackRate", { playbackRate: RATE });
      const sceneTop = await page.ev("Math.round(document.querySelector('.hero-scene').getBoundingClientRect().top + scrollY)");
      const sceneBottom = await page.ev("Math.round(document.querySelector('.hero-scene').getBoundingClientRect().bottom + scrollY)");
      const start = PHONE ? Math.max(0, sceneTop - 76) : 0;
      const plan = [["hold", 6.2, start, start], ["scroll", 4.0, start, Math.max(start, sceneBottom - (PHONE ? 420 : 300))], ["hold", 0.8, 0, 0]];
      plan[2][2] = plan[2][3] = plan[1][3];
      const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
      await enc.ev(`enc.init(${W}, ${H}, ${FPS})`);
      await page.ev(`window.scrollTo({top:${start},behavior:'instant'})`);
      await sleep(400);
      // The sequence from its first frame: the replay control restarts the keyframes.
      await page.ev("document.querySelector('[data-seq-replay]')?.click()");
      let i = 0, late = 0;
      for (const [kind, secs, from, to] of plan) {
        const n = Math.round(secs * FPS);
        for (let k = 0; k < n; k++, i++) {
          const target = Date.now() + REAL_MS;
          const y = kind === "scroll" ? Math.round(from + (to - from) * ease((k + 1) / n)) : from;
          await page.ev(`(()=>{ window.scrollTo({top:${y},behavior:'instant'}); return new Promise(r=>{ const t=setTimeout(r,250); requestAnimationFrame(()=>requestAnimationFrame(()=>{ clearTimeout(t); r(); })); }); })()`);
          const s = await page.send("Page.captureScreenshot", { format: "jpeg", quality: 92, captureBeyondViewport: false });
          await enc.ev(`enc.add(${JSON.stringify(s.result.data)}, ${i})`);
          const rest = target - Date.now();
          if (rest > 0) await sleep(rest); else late++;
        }
      }
      const bytes = Buffer.from(await enc.ev("enc.finish()"), "base64");
      const file = join(OUT, `hero-film-${PHONE ? "m390" : "d1440"}-${locale}.mp4`);
      writeFileSync(file, bytes);
      console.log(`wrote ${file} (${i} frames = ${(i / FPS).toFixed(1)}s at ${FPS} fps, ${W}x${H}, ${Math.round(bytes.length / 1024)} kB, ${late} late frames)`);
      await page.send("Animation.setPlaybackRate", { playbackRate: 1 });
      await enc.ev("location.reload()");
      await sleep(1500);
    }

    for (const locale of HERO ? [] : LOCALES) {
      await page.send("Page.navigate", { url: `${BASE}/${locale}` });
      await sleep(4000);
      await page.ev("window.scrollTo(0,0)");
      await page.send("Animation.setPlaybackRate", { playbackRate: RATE });
      // Positions from the live page, so the film follows this build's layout and not a remembered one.
      const pos = JSON.parse(await page.ev(`(()=>{ const t=(s)=>{const e=document.querySelector(s); const r=e.getBoundingClientRect(); return {top:Math.round(r.top+scrollY), bottom:Math.round(r.bottom+scrollY)}; };
        return JSON.stringify({ hero: t('section[aria-labelledby=hero-h1]'), deck: t('[data-deck]'), last: t('[data-deck-item]:last-of-type'), play: t('[data-clip-play]'), close: t('section[aria-labelledby=close-h]'), max: document.documentElement.scrollHeight - innerHeight }); })()`));
      const headerH = parseFloat(await page.ev("getComputedStyle(document.documentElement).getPropertyValue('--header-h')")) || 72;
      const clipStop = Math.min(pos.last.top - headerH - 18, pos.play.bottom - H + 120); // the last card under the header, the play button in view
      const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
      // [kind, seconds, from, to]: hold, scroll (eased), play (press play and hold)
      const plan = [
        ["hold", 1.5, 0, 0],
        ["scroll", 4.0, 0, pos.hero.bottom - headerH],
        ["scroll", 2.2, pos.hero.bottom - headerH, pos.deck.top - headerH - 40],
        ["scroll", 7.0, pos.deck.top - headerH - 40, clipStop],
        ["play", 7.5, clipStop, clipStop],
        ["scroll", 7.0, clipStop, pos.max],
        ["hold", 1.5, pos.max, pos.max],
      ];
      await enc.ev(`enc.init(${W}, ${H}, ${FPS})`);
      console.log(`${locale}: positions ${JSON.stringify(pos)}, clip stop ${clipStop}`);
      let i = 0;
      let late = 0;
      const t0 = Date.now();
      for (const [kind, secs, from, to] of plan) {
        const n = Math.round(secs * FPS);
        if (kind === "play") {
          // Press play, let the film start, then hold it paused and step it one film frame (1/30 s) per capture:
          // the clip then runs at its natural speed in the result whatever a capture costs.
          const started = await page.ev(`(async()=>{ const b=document.querySelector('[data-clip-play]'); if(!b) return 'no button'; b.click(); for (let k=0;k<50;k++){ const v=document.querySelector('[data-clip-component] video'); if(v){ v.muted=true; try{ await v.play(); }catch(e){ return 'play failed: '+e.message } for (let j=0;j<50&&v.readyState<2;j++) await new Promise(r=>setTimeout(r,100)); v.pause(); v.currentTime=0; return 'started, stepping from 0, readyState ' + v.readyState; } await new Promise(r=>setTimeout(r,100)); } return 'no video'; })()`);
          console.log(`${locale}: film module ${started}`);
        }
        for (let k = 0; k < n; k++, i++) {
          const target = Date.now() + REAL_MS;
          const y = kind === "scroll" ? Math.round(from + (to - from) * ease((k + 1) / n)) : from;
          if (kind === "play") await page.ev(`(()=>{ const v=document.querySelector('[data-clip-component] video'); if(!v) return false; return new Promise(r=>{ const t=setTimeout(()=>r('late'),600); v.addEventListener('seeked',()=>{ clearTimeout(t); r(true); },{once:true}); v.currentTime=${((k + 1) / FPS).toFixed(4)}; }); })()`);
          // Two animation frames so scroll-driven layers (depth, deck) have painted; a time limit so a frame that never comes cannot stall the film.
          await page.ev(`(()=>{ window.scrollTo({top:${y},behavior:'instant'}); return new Promise(r=>{ const t=setTimeout(r,250); requestAnimationFrame(()=>requestAnimationFrame(()=>{ clearTimeout(t); r(); })); }); })()`);
          const s = await page.send("Page.captureScreenshot", { format: "jpeg", quality: 92, captureBeyondViewport: false });
          await enc.ev(`enc.add(${JSON.stringify(s.result.data)}, ${i})`);
          const rest = target - Date.now();
          if (rest > 0) await sleep(rest); else late++;
        }
        console.log(`${locale}: ${kind} ${secs}s ${from}->${to} done (${i} frames, ${Math.round((Date.now() - t0) / 1000)}s real)`);
      }
      const b64 = await enc.ev("enc.finish()");
      const bytes = Buffer.from(b64, "base64");
      const file = join(OUT, `home-scroll-desktop-${locale}.mp4`);
      writeFileSync(file, bytes);
      console.log(`wrote ${file} (${i} frames = ${(i / FPS).toFixed(1)}s at ${FPS} fps, ${W}x${H}, ${Math.round(bytes.length / 1024)} kB, ${late} late frames)`);
      await page.send("Animation.setPlaybackRate", { playbackRate: 1 });
      await enc.ev("location.reload()");
      await sleep(1500);
    }
    enc.ws.close();
  }
  page.ws.close();
} finally {
  for (const k of kids) { try { k.kill(); } catch { /* gone */ } }
}
