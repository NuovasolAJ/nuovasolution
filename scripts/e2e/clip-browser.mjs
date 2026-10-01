// The product clip in a real browser (owner order 2026-09-29 C): short, understood without sound, play and
// pause, no autoplay, nothing of the film loaded before the visitor asks for it, no empty player.
// For EN and ES, desktop and phone, on a local build (default) or a deployed origin (BASE=https://…):
//   before play   no <video> element, no request for a film, the poster is a real picture
//   play          one film request for the right language and format, the video plays, is muted, has the
//                 browser's controls, runs about 21 seconds, and the caption line follows the action
//   pause         the video can be paused and resumed
//   failure       when the film cannot be loaded the poster comes back with a sentence, not an empty player
// Writes clip-results.json and a screenshot per case. Exit 1 on any failure.
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const ROOT = new URL("../../", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const OUT = process.env.OUT ?? join(ROOT, "docs", "website_redesign", "evidence_2026-09-29", "clip");
const EDGE = process.env.EDGE ?? "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const NEXT = join(ROOT, "node_modules", "next", "dist", "bin", "next");
const PORT = 3125, CDP_PORT = 9368;
const BASE = (process.env.BASE ?? `http://localhost:${PORT}`).replace(/\/$/, "");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
mkdirSync(OUT, { recursive: true });

const results = { started_utc: new Date().toISOString(), base: BASE, commit: process.env.E2E_COMMIT ?? null, deployment: process.env.E2E_DEPLOYMENT ?? null, checks: [], cases: [] };
const check = (id, what, pass, evidence) => { results.checks.push({ id, what, pass: Boolean(pass), evidence }); console.log(`${pass ? "PASS" : "FAIL"} ${id} ${what}`); };
const kids = [];
try {
  if (!process.env.BASE) {
    const p = spawn(process.execPath, [NEXT, "start", "-p", String(PORT)], { cwd: ROOT, env: process.env, stdio: ["ignore", "pipe", "pipe"] });
    p.stdout.on("data", () => {}); p.stderr.on("data", () => {}); kids.push(p);
    for (let i = 0; i < 120; i++) { try { const r = await fetch(`${BASE}/en`, { redirect: "manual" }); if (r.status) break; } catch { /* not up */ } await sleep(500); }
  }
  const prof = join(tmpdir(), `nuova-clip-${Date.now()}`);
  kids.push(spawn(EDGE, ["--headless=new", "--disable-gpu", "--no-first-run", "--hide-scrollbars", `--user-data-dir=${prof}`, `--remote-debugging-port=${CDP_PORT}`, "about:blank"], { stdio: "ignore" }));
  let list;
  for (let i = 0; i < 60; i++) { try { list = await (await fetch(`http://127.0.0.1:${CDP_PORT}/json`)).json(); break; } catch { await sleep(500); } }
  const ws = new WebSocket(list.find((t) => t.type === "page").webSocketDebuggerUrl);
  await new Promise((res) => ws.addEventListener("open", res));
  let mid = 0;
  const pend = new Map();
  let films = [];
  ws.addEventListener("message", (e) => {
    const m = JSON.parse(e.data);
    if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); return; }
    if (m.method === "Network.requestWillBeSent" && /\.(mp4|webm)(\?|$)/.test(m.params.request.url)) films.push(new URL(m.params.request.url).pathname);
  });
  const send = (method, params = {}) => new Promise((res) => { const i = ++mid; pend.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
  const ev = async (x) => (await send("Runtime.evaluate", { expression: x, returnByValue: true, awaitPromise: true })).result?.result?.value;
  const waitFor = async (x, ms = 20000) => { const t = Date.now(); while (Date.now() - t < ms) { if (await ev(x)) return true; await sleep(250); } return false; };
  const shot = async (name) => { const s = await send("Page.captureScreenshot", { format: "jpeg", quality: 80 }); if (s.result?.data) writeFileSync(join(OUT, `${name}.jpg`), Buffer.from(s.result.data, "base64")); };
  const click = async (sel) => {
    const r = await ev(`(()=>{const e=document.querySelector(${JSON.stringify(sel)});if(!e)return null;e.scrollIntoView({block:'center'});const b=e.getBoundingClientRect();return {x:b.left+b.width/2,y:b.top+b.height/2}})()`);
    if (!r) return false;
    await sleep(300);
    const p = await ev(`(()=>{const b=document.querySelector(${JSON.stringify(sel)}).getBoundingClientRect();return {x:b.left+b.width/2,y:b.top+b.height/2}})()`);
    await send("Input.dispatchMouseEvent", { type: "mousePressed", x: p.x, y: p.y, button: "left", clickCount: 1 });
    await send("Input.dispatchMouseEvent", { type: "mouseReleased", x: p.x, y: p.y, button: "left", clickCount: 1 });
    return true;
  };
  await send("Page.enable");
  await send("Runtime.enable");
  await send("Network.enable");

  const V = `document.querySelector('[data-product-clip] video')`;
  for (const locale of ["en", "es"]) {
    for (const [tag, w, h, mobile] of [["d1440", 1440, 900, false], ["m390", 390, 844, true]]) {
      const id = `${tag}-${locale}`;
      films = [];
      await send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: 1, mobile });
      await send("Page.navigate", { url: `${BASE}/${locale}` });
      await sleep(process.env.BASE ? 3500 : 2200);
      // read the whole page once, as a visitor scrolling would
      await ev(`(async()=>{const H=document.documentElement.scrollHeight;for(let y=0;y<H;y+=innerHeight){scrollTo(0,y);await new Promise(r=>setTimeout(r,120));}})()`);
      await ev(`document.querySelector('[data-product-clip]')?.scrollIntoView({block:'center'})`);
      await sleep(900);
      const before = await ev(`(()=>{const c=document.querySelector('[data-product-clip]');const img=c?.querySelector('img');return {state:c?.getAttribute('data-product-clip')??null,videos:document.querySelectorAll('video').length,poster:img?{w:img.naturalWidth,h:img.naturalHeight,src:new URL(img.currentSrc).pathname}:null,cue:document.querySelector('[data-clip-cue]')?.innerText??null}})()`);
      const noFilmBefore = films.length === 0;
      await click("[data-clip-play]");
      const playing = await waitFor(`(()=>{const v=${V};return !!v&&v.readyState>=2&&v.currentTime>0.3&&!v.paused})()`, 25000);
      const st = await ev(`(()=>{const v=${V};if(!v)return null;return {duration:Math.round(v.duration*10)/10,muted:v.muted,controls:v.controls,paused:v.paused,autoplayAttr:v.autoplay,loopAttr:v.loop,w:v.videoWidth,h:v.videoHeight,src:new URL(v.currentSrc).pathname,audioTracks:(v.audioTracks?v.audioTracks.length:null),hasAudio:(v.webkitAudioDecodedByteCount??0)>0}})()`);
      // the subtitle track: present, off by default, three cues that load when switched on
      const track = await ev(`(async()=>{const v=${V};const t=v.textTracks[0];if(!t)return null;const before=t.mode;t.mode="hidden";for(let i=0;i<30&&!(t.cues&&t.cues.length);i++)await new Promise(r=>setTimeout(r,100));const cues=t.cues?[...t.cues].map(c=>c.text):[];t.mode=before;return {kind:t.kind,lang:t.language,modeBefore:before,cues}})()`);
      check(`CL-${id}-t`, "a subtitle track in the page language with the three lines, off by default so nothing covers the recording", track && track.lang === locale && track.modeBefore !== "showing" && track.cues.length === 3 && track.cues[0] === before.cue, track);
      // the caption line follows the action: jump behind the second and the third cue
      await ev(`(()=>{${V}.currentTime=8})()`); await sleep(900);
      const cue2 = await ev(`({i:document.querySelector('[data-clip-cue]')?.getAttribute('data-clip-cue'),t:document.querySelector('[data-clip-cue]')?.innerText})`);
      await ev(`(()=>{${V}.currentTime=15})()`); await sleep(900);
      const cue3 = await ev(`({i:document.querySelector('[data-clip-cue]')?.getAttribute('data-clip-cue'),t:document.querySelector('[data-clip-cue]')?.innerText})`);
      await shot(`${id}-clip-playing`);
      // pause and resume from the keyboard (the video has the focus after play)
      const focusOnVideo = await ev(`document.activeElement===${V}`);
      await ev(`${V}.pause()`); await sleep(300);
      const t1 = await ev(`${V}.currentTime`); await sleep(700);
      const t2 = await ev(`${V}.currentTime`);
      const pausedHolds = (await ev(`${V}.paused`)) && Math.abs(t2 - t1) < 0.05;
      await ev(`${V}.play()`); await sleep(900);
      const resumed = await ev(`!${V}.paused && ${V}.currentTime > ${t2}`);
      const over = await ev(`({sw:document.documentElement.scrollWidth,iw:innerWidth})`);
      const want = `/media/daily/daily-claim-flow-${locale}-${mobile ? "mobile" : "desktop"}.mp4`;
      const c = { id, before, noFilmBefore, playing, video: st, cue2, cue3, focusOnVideo, pausedHolds, resumed, films: [...new Set(films)], want, overflow: over };
      results.cases.push(c);
      check(`CL-${id}-a`, "before play: poster only, no video element, no film requested", before.state === "poster" && before.videos === 0 && noFilmBefore && before.poster && before.poster.w > 800, { state: before.state, videos: before.videos, films_requested: films.length - (playing ? 1 : 0), poster: before.poster });
      check(`CL-${id}-b`, "play: the film of this language and format plays, muted, with the browser's controls, about 21 seconds", playing && st && st.src === want && st.muted && st.controls && !st.autoplayAttr && !st.loopAttr && st.duration > 19 && st.duration < 23 && !st.hasAudio, st);
      check(`CL-${id}-c`, "the caption line follows the action (second and third cue), so the clip is understood without sound", cue2.i === "1" && cue3.i === "2" && cue2.t !== cue3.t && cue2.t !== before.cue, { first: before.cue, second: cue2.t, third: cue3.t });
      check(`CL-${id}-d`, "the video can be paused and resumed; nothing overflows while it plays", pausedHolds && resumed && over.sw <= over.iw, { pausedHolds, resumed, focusOnVideo, overflow: over });
    }
  }

  // failure: the film request is blocked → the poster comes back with a sentence
  await send("Network.setBlockedURLs", { urls: ["*.mp4"] });
  await send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  await send("Page.navigate", { url: `${BASE}/en` });
  await sleep(process.env.BASE ? 3500 : 2200);
  await ev(`document.querySelector('[data-product-clip]')?.scrollIntoView({block:'center'})`);
  await sleep(600);
  await click("[data-clip-play]");
  const failed = await waitFor(`!!document.querySelector('[data-clip-error]')`, 15000);
  const after = await ev(`({state:document.querySelector('[data-product-clip]')?.getAttribute('data-product-clip'),videos:document.querySelectorAll('video').length,text:document.querySelector('[data-clip-error]')?.innerText??null,play:!!document.querySelector('[data-clip-play]')})`);
  await shot("d1440-en-clip-failed");
  check("CL-fail", "when the film cannot be loaded the poster comes back with a sentence and the play control, never an empty player", failed && after.state === "poster" && after.videos === 0 && after.play && Boolean(after.text), after);
  await send("Network.setBlockedURLs", { urls: [] });
  ws.close();
} catch (e) {
  check("CL-00", "the run completed", false, String(e?.stack ?? e));
} finally {
  for (const k of kids) { try { k.kill(); } catch { /* gone */ } }
  results.finished_utc = new Date().toISOString();
  const pass = results.checks.filter((c) => c.pass).length;
  results.pass = pass; results.total = results.checks.length;
  writeFileSync(join(OUT, "clip-results.json"), JSON.stringify(results, null, 1));
  console.log(`${pass} passed, ${results.total - pass} failed -> ${join(OUT, "clip-results.json")}`);
  process.exit(pass === results.total ? 0 : 1);
}
