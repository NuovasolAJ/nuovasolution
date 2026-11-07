// RV6 browser layer on the named build. One view per run: node rv6-cdp.mjs <view> <outJson> <shotDir>
// A-2/A-3/A-4 viewports · A-5 reduced motion · A-7..A-10 tabs · A-11 contrast · A-12 type · A-13 demo
// A-16 scroll at a human rate · A-18 the Spanish path at 1440/1280 · A-20 the switch · A-22 media
// C01/D01/D03/D04/D06/D11 owner findings. The bypass secret is read from the store, never printed.
import { spawn } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

const VIEW = process.argv[2] || "target";
const OUT = process.argv[3], SHOTS = process.argv[4];
const BYPASS = readFileSync("C:/Users/Usuario/.nuova-secrets/stg_website_preview_bypass.txt", "utf8").trim();
const BASE = "https://nuovasolution-design-preview-c0ktpvgrs-nuovasolajs-projects.vercel.app";
const CDP = 9473;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
mkdirSync(SHOTS, { recursive: true });
// attach to an Edge already listening on the port; only spawn one if none is there
let list, kid = null;
const poll = async () => { try { const r = await fetch(`http://127.0.0.1:${CDP}/json/list`); return r.ok ? await r.json() : null; } catch { return null; } };
list = await poll();
if (!list) {
  const prof = join(SHOTS, "prof-" + VIEW);
  rmSync(prof, { recursive: true, force: true });
  kid = spawn("C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    ["--headless=new", "--disable-gpu", "--no-first-run", "--hide-scrollbars", "--autoplay-policy=no-user-gesture-required",
      `--user-data-dir=${prof}`, `--remote-debugging-port=${CDP}`, "about:blank"], { stdio: "ignore", detached: true });
  for (let i = 0; i < 60 && !list; i++) { await sleep(600); list = await poll(); }
}
if (!list || !list.some((t) => t.type === "page")) { console.error("no page target on port " + CDP); process.exit(2); }
const ws = new WebSocket(list.find((t) => t.type === "page").webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener("open", r));
let id = 0; const pend = new Map();
ws.addEventListener("message", (e) => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } });
const send = (m, p = {}) => new Promise((r) => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method: m, params: p })); });
const ev = async (x) => (await send("Runtime.evaluate", { expression: x, returnByValue: true, awaitPromise: true })).result?.result?.value;
const shot = async (n) => { const s = await send("Page.captureScreenshot", { format: "png" }); if (s.result?.data) writeFileSync(join(SHOTS, n), Buffer.from(s.result.data, "base64")); };
await send("Page.enable"); await send("Network.enable"); await send("DOM.enable"); await send("Runtime.enable");
await send("Network.setExtraHTTPHeaders", { headers: { "x-vercel-protection-bypass": BYPASS } });
const metrics = (w, h, mobile = false) => send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: mobile ? 2 : 1, mobile });
const url = (p) => `${BASE}${p}${p.includes("?") ? "&" : "?"}view=${VIEW}`;
const go = async (p, settle = 3000) => { await send("Page.navigate", { url: url(p) }); await sleep(settle); };

const FN = `window.__rv = {
  vis(el){ const s=getComputedStyle(el); if(s.visibility==="hidden"||s.display==="none"||+s.opacity===0) return false;
    if(el.closest("[aria-hidden=true]")) return false; const r=el.getBoundingClientRect(); return r.width>1&&r.height>1; },
  rect(el){ const r=el.getBoundingClientRect(); return {x:Math.round(r.left),y:Math.round(r.top+scrollY),w:Math.round(r.width),h:Math.round(r.height)}; },
  t(el){ return (el.innerText||el.textContent||"").replace(/\\s+/g," ").trim(); },
  bg(el){ const r=el.getBoundingClientRect();
    const cx=Math.min(Math.max(r.left+Math.min(r.width/2,40),1),innerWidth-2), cy=Math.min(Math.max(r.top+r.height/2,1),innerHeight-2);
    const on=r.top<innerHeight&&r.bottom>0&&r.left<innerWidth&&r.right>0;
    const st=on?(document.elementsFromPoint(cx,cy)||[]):[]; const at=st.indexOf(el); const chain=at>=0?st.slice(at):[];
    const lst=chain.length?chain:(()=>{const a=[];let n=el;while(n){a.push(n);n=n.parentElement;}return a;})();
    for(const n of lst){ const s=getComputedStyle(n);
      if(s.backgroundImage&&s.backgroundImage!=="none") return {rgb:null,src:"image"};
      const m=s.backgroundColor.match(/rgba?\\(([\\d.]+),\\s*([\\d.]+),\\s*([\\d.]+)(?:,\\s*([\\d.]+))?\\)/);
      if(m&&(m[4]===undefined||+m[4]>0.6)) return {rgb:[+m[1],+m[2],+m[3]],src:"color"}; }
    return {rgb:[255,255,255],src:"default"}; },
  lum(c){ const f=c.map(v=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4);}); return 0.2126*f[0]+0.7152*f[1]+0.0722*f[2]; },
  ratio(a,b){ const l1=this.lum(a),l2=this.lum(b); return Math.round(((Math.max(l1,l2)+0.05)/(Math.min(l1,l2)+0.05))*100)/100; },
  col(el){ const m=getComputedStyle(el).color.match(/rgba?\\(([\\d.]+),\\s*([\\d.]+),\\s*([\\d.]+)/); return m?[+m[1],+m[2],+m[3]]:[0,0,0]; },
  leaves(){ return [...document.querySelectorAll("body *")].filter(el=>{
    if(!this.vis(el)) return false; if(/^(SCRIPT|STYLE|SVG|PATH|NOSCRIPT)$/.test(el.tagName)) return false;
    const own=[...el.childNodes].some(n=>n.nodeType===3&&n.textContent.trim().length>0); return own; }); },
  async wake(){ const step=Math.round(innerHeight*0.8), h=document.documentElement.scrollHeight;
    for(let y=0;y<h;y+=step){ scrollTo({top:y,behavior:"instant"}); await new Promise(r=>setTimeout(r,320)); }
    scrollTo({top:0,behavior:"instant"}); await new Promise(r=>setTimeout(r,800)); return h; }
};true`;

const R = { view: VIEW, utc: new Date().toISOString(), steps: {} };
const T = async (name, fn) => { try { R.steps[name] = await fn(); } catch (e) { R.steps[name] = { error: String(e).slice(0, 200) }; } };

// ---------- A-2 the first screen at 1366x768 ----------
await metrics(1366, 768);
await go("/es");
await ev(FN);
await T("A2_firstScreen", async () => {
  await ev(`__rv.wake()`); await sleep(600);
  await shot(`${VIEW}-1366-first.png`);
  return await ev(`(()=>{
    const inFold = el => { const r = el.getBoundingClientRect(); return r.top < 768 && r.bottom > 0; };
    const h1 = [...document.querySelectorAll("h1")].filter(e=>__rv.vis(e));
    const acts = [...document.querySelectorAll("a,button")].filter(e=>__rv.vis(e)&&inFold(e)&&__rv.t(e).length>2);
    const prim = acts.filter(e=>/ver la demo|pru[eé]balo|pedir acceso|solicita/i.test(__rv.t(e)));
    const demo = document.querySelector("[data-hero-demo],[data-demo-phase],#demo");
    const rec = [...document.querySelectorAll("[data-hero-record],[data-hero-result],.record,[data-record]")].filter(e=>__rv.vis(e)&&inFold(e));
    const chat = [...document.querySelectorAll("*")].filter(e=>__rv.vis(e)&&inFold(e)&&/Hola|Buenos|Laura/.test(__rv.t(e))&&__rv.t(e).length<200);
    return { h1: h1.map(e=>({t:__rv.t(e).slice(0,70),r:__rv.rect(e)})),
      actionsInFold: acts.map(e=>__rv.t(e).slice(0,30)), primaryInFold: prim.map(e=>__rv.t(e).slice(0,30)),
      demoInFold: demo?inFold(demo):null, demoRect: demo?__rv.rect(demo):null,
      recordInFold: rec.length, enquiryTextInFold: chat.length>0,
      words: document.body.innerText.split(/\\s+/).length, foldWords: [...document.querySelectorAll("body *")].filter(e=>__rv.vis(e)&&inFold(e)).map(e=>__rv.t(e)).join(" ").split(/\\s+/).length };
  })()`);
});

// ---------- A-11 contrast + A-12 type, scrolling ----------
await T("A11_A12", async () => {
  return await ev(`(async()=>{
    const bad=[], scenes=[], small=[]; const seen=new Set();
    const H=document.documentElement.scrollHeight, step=Math.round(innerHeight*0.75);
    for(let y=0;y<H;y+=step){ scrollTo({top:y,behavior:"instant"}); await new Promise(r=>setTimeout(r,420));
      for(const el of __rv.leaves()){
        const r=el.getBoundingClientRect(); if(r.top>innerHeight||r.bottom<0) continue;
        const key=el.tagName+"|"+__rv.t(el).slice(0,40)+"|"+Math.round(r.width);
        if(seen.has(key)) continue; seen.add(key);
        const st=getComputedStyle(el), fs=parseFloat(st.fontSize), fw=+st.fontWeight||400;
        if(fs<14) small.push({t:__rv.t(el).slice(0,40),px:Math.round(fs*10)/10,cls:(el.className||"").toString().slice(0,40)});
        const g=__rv.bg(el);
        if(!g.rgb){ scenes.push({t:__rv.t(el).slice(0,40),px:Math.round(fs)}); continue; }
        const ratio=__rv.ratio(__rv.col(el),g.rgb);
        const large=fs>=24||(fs>=18.66&&fw>=700); const need=large?3:4.5;
        if(ratio<need) bad.push({t:__rv.t(el).slice(0,50),ratio,need,px:Math.round(fs),y:Math.round(r.top+scrollY)});
      } }
    scrollTo({top:0,behavior:"instant"});
    return {measured:seen.size, fails:bad, onScenes:scenes.length, smallest:small.sort((a,b)=>a.px-b.px).slice(0,14)};
  })()`);
});

// ---------- A-7..A-10 the channel tabs ----------
await T("A7_A10_tabs", async () => {
  await go("/es"); await ev(FN); await ev(`__rv.wake()`); await sleep(500);
  const info = await ev(`(()=>{
    const tl=document.querySelector("[role=tablist]"); if(!tl) return null;
    const tabs=[...tl.querySelectorAll("[role=tab]")].filter(e=>__rv.vis(e));
    tl.scrollIntoView({block:"center",behavior:"instant"});
    return { count:tabs.length, labels:tabs.map(e=>__rv.t(e)), sel:tabs.map(e=>e.getAttribute("aria-selected")),
      tabindex:tabs.map(e=>e.getAttribute("tabindex")),
      box:tabs.map(e=>{const r=e.getBoundingClientRect();return {x:Math.round(r.left+r.width/2),y:Math.round(r.top+r.height/2)};}) };
  })()`);
  if (!info) return { tablist: false };
  const click = async (x, y, touch = false) => {
    if (touch) { await send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x, y }] }); await send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] }); }
    else { await send("Input.dispatchMouseEvent", { type: "mousePressed", x, y, button: "left", clickCount: 1 }); await send("Input.dispatchMouseEvent", { type: "mouseReleased", x, y, button: "left", clickCount: 1 }); }
    await sleep(900);
  };
  const before = await ev(`document.querySelector("[role=tabpanel]")?.innerText.slice(0,60)`);
  const target = info.box[1] || info.box[0];
  await click(target.x, target.y);
  const mouse = await ev(`({sel:[...document.querySelectorAll("[role=tab]")].map(e=>e.getAttribute("aria-selected")), panel:document.querySelector("[role=tabpanel]")?.innerText.slice(0,60)})`);
  // no self-switching: wait and look again
  await sleep(6000);
  const idle = await ev(`[...document.querySelectorAll("[role=tab]")].map(e=>e.getAttribute("aria-selected"))`);
  // touch at 390
  await metrics(390, 844, true); await go("/es"); await ev(FN); await ev(`__rv.wake()`); await sleep(500);
  const tbox = await ev(`(()=>{const tl=document.querySelector("[role=tablist]"); if(!tl) return null; tl.scrollIntoView({block:"center",behavior:"instant"});
    const t=[...tl.querySelectorAll("[role=tab]")].filter(e=>__rv.vis(e)); const r=(t[2]||t[1]||t[0]).getBoundingClientRect();
    return {x:Math.round(r.left+r.width/2),y:Math.round(r.top+r.height/2),label:__rv.t(t[2]||t[1]||t[0])};})()`);
  let touch = null;
  if (tbox) { await click(tbox.x, tbox.y, true); touch = await ev(`({sel:[...document.querySelectorAll("[role=tab]")].map(e=>e.getAttribute("aria-selected")), panel:document.querySelector("[role=tabpanel]")?.innerText.slice(0,50)})`); }
  // keyboard at 1366: a trusted click on quiet ground, then Tab to the tablist, then ArrowRight
  await metrics(1366, 768); await go("/es"); await ev(FN); await ev(`__rv.wake()`); await sleep(400);
  const quiet = await ev(`(()=>{const tl=document.querySelector("[role=tablist]"); tl.scrollIntoView({block:"center",behavior:"instant"});
    const r=tl.getBoundingClientRect(); return {x:Math.round(r.left+5),y:Math.round(r.top-30)};})()`);
  await click(quiet.x, quiet.y);
  let focusInfo = null;
  for (let i = 0; i < 12; i++) {
    await send("Input.dispatchKeyEvent", { type: "rawKeyDown", key: "Tab", code: "Tab", windowsVirtualKeyCode: 9 });
    await send("Input.dispatchKeyEvent", { type: "keyUp", key: "Tab", code: "Tab", windowsVirtualKeyCode: 9 });
    await sleep(220);
    const f = await ev(`(()=>{const a=document.activeElement; if(!a) return null;
      const s=getComputedStyle(a); return {role:a.getAttribute("role"),t:__rv.t(a).slice(0,30),outline:s.outlineWidth+" "+s.outlineStyle+" "+s.outlineColor, box:s.boxShadow.slice(0,60), tabs:i};})()`);
    if (f && f.role === "tab") { focusInfo = f; break; }
  }
  let arrow = null;
  if (focusInfo) {
    await send("Input.dispatchKeyEvent", { type: "rawKeyDown", key: "ArrowRight", code: "ArrowRight", windowsVirtualKeyCode: 39 });
    await send("Input.dispatchKeyEvent", { type: "keyUp", key: "ArrowRight", code: "ArrowRight", windowsVirtualKeyCode: 39 });
    await sleep(800);
    arrow = await ev(`({sel:[...document.querySelectorAll("[role=tab]")].map(e=>e.getAttribute("aria-selected")), active:__rv.t(document.activeElement).slice(0,30)})`);
    await shot(`${VIEW}-tab-focus.png`);
  }
  return { ...info, before, mouse, idleAfter6s: idle, touch, keyboardFocus: focusInfo, arrow };
});

// ---------- A-16 scroll at a human rate ----------
await T("A16_scrollSpeed", async () => {
  await metrics(1366, 768); await go("/es"); await ev(FN); await ev(`__rv.wake()`); await sleep(500);
  const stage = await ev(`(()=>{const s=document.querySelector("[data-scene],[data-stage],.scenes,[data-functions]");
    const host=s?s.closest("section")||s:null; if(!host) return null; const r=host.getBoundingClientRect();
    return {top:Math.round(r.top+scrollY),h:Math.round(r.height)};})()`);
  if (!stage) return { stageFound: false };
  await ev(`window.__log=[]; window.__obs=setInterval(()=>{ const n=document.querySelector("[data-scene-active],[aria-current=step],[data-scene][data-active=true]");
     const lab=(document.querySelector("[data-scene-active]")||n); window.__log.push({t:Date.now(), y:Math.round(scrollY), s: lab?(lab.getAttribute("data-scene")||lab.getAttribute("data-scene-active")||__rv.t(lab).slice(0,24)):null}); },100); true`);
  const px = 800, stepPx = 40, dt = Math.round(1000 * stepPx / px);
  await ev(`scrollTo({top:${Math.max(0, stage.top - 200)},behavior:"instant"})`); await sleep(500);
  const end = stage.top + stage.h + 400;
  for (let y = stage.top - 200; y < end; y += stepPx) { await ev(`scrollTo({top:${y},behavior:"instant"})`); await sleep(dt); }
  await sleep(600);
  const log = await ev(`(clearInterval(window.__obs), window.__log.map(e=>({dy:e.y, s:e.s})))`);
  const dwell = {}; let prev = null, count = 0;
  for (const e of (log || [])) { if (e.s !== prev) { prev = e.s; count = 1; } else count++; dwell[e.s] = Math.max(dwell[e.s] || 0, count * 100); }
  return { pxPerSec: px, samples: (log || []).length, distinctScenes: Object.keys(dwell).filter(k => k !== "null").length, dwellMs: dwell };
});

// ---------- A-18 the Spanish path at 1440 and 1280 ----------
await T("A18_pathES", async () => {
  const res = {};
  for (const w of [1440, 1280]) {
    await metrics(w, 900); await go("/es"); await ev(FN); await ev(`__rv.wake()`); await sleep(400);
    res[w] = await ev(`(()=>{
      const sec=[...document.querySelectorAll("section")].find(s=>/C[oó]mo funciona|Del plano|Presentar un inmueble/i.test(__rv.t(s)));
      if(!sec) return {found:false};
      sec.scrollIntoView({block:"center",behavior:"instant"});
      const els=[...sec.querySelectorAll("*")].filter(e=>__rv.vis(e)&&[...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim()));
      const clipped=[], overflow=[], collide=[];
      for(const e of els){ const r=e.getBoundingClientRect(), st=getComputedStyle(e);
        if(e.scrollWidth>e.clientWidth+1&&/hidden|clip/.test(st.overflowX)) clipped.push({t:__rv.t(e).slice(0,44),sw:e.scrollWidth,cw:e.clientWidth});
        if(e.scrollHeight>e.clientHeight+1&&/hidden|clip/.test(st.overflowY)) clipped.push({t:__rv.t(e).slice(0,44),sh:e.scrollHeight,ch:e.clientHeight});
        if(r.right>innerWidth+1||r.left<-1) overflow.push({t:__rv.t(e).slice(0,44),l:Math.round(r.left),r:Math.round(r.right)});
        const lines=[...e.getClientRects()]; if(lines.length>1&&lines.some(l=>l.width<8)) collide.push({t:__rv.t(e).slice(0,44),lines:lines.length});
      }
      return {found:true, docOverflow: document.documentElement.scrollWidth>innerWidth+1, items:els.length, clipped, overflow, orphanLines:collide};
    })()`);
    await shot(`${VIEW}-${w}-path.png`);
  }
  return res;
});

// ---------- A-3/A-4 viewports ----------
await T("A3_A4_viewports", async () => {
  const res = {};
  for (const [w, h, mob] of [[390, 844, true], [768, 1024, false], [1024, 768, false]]) {
    await metrics(w, h, mob); await go("/es"); await ev(FN); await ev(`__rv.wake()`); await sleep(400);
    res[w] = await ev(`(()=>{
      const o=document.documentElement.scrollWidth>innerWidth+1;
      const wide=[...document.querySelectorAll("body *")].filter(e=>{if(!__rv.vis(e))return false;const r=e.getBoundingClientRect();return r.width>innerWidth+2||r.right>innerWidth+2;}).slice(0,8).map(e=>({t:__rv.t(e).slice(0,36),w:Math.round(e.getBoundingClientRect().width)}));
      const h1=[...document.querySelectorAll("h1")].filter(e=>__rv.vis(e)).length;
      const covered=[...document.querySelectorAll("a,button")].filter(e=>{if(!__rv.vis(e))return false;const r=e.getBoundingClientRect();
        if(r.top<0||r.bottom>innerHeight) return false; const el=document.elementFromPoint(r.left+r.width/2,r.top+r.height/2); return el&&!e.contains(el)&&!el.contains(e);}).map(e=>__rv.t(e).slice(0,26));
      const tiny=[...document.querySelectorAll("a,button")].filter(e=>{if(!__rv.vis(e))return false;const r=e.getBoundingClientRect();return r.height<36||r.width<36;}).map(e=>({t:__rv.t(e).slice(0,24),h:Math.round(e.getBoundingClientRect().height)}));
      return {docOverflow:o, wideElements:wide, h1count:h1, coveredActions:covered, smallTargets:tiny.slice(0,10)};
    })()`);
    await shot(`${VIEW}-${w}-home.png`);
  }
  return res;
});

// ---------- A-5 reduced motion ----------
await T("A5_reducedMotion", async () => {
  await send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
  await metrics(1366, 768); await go("/es"); await ev(FN); await ev(`__rv.wake()`); await sleep(1200);
  const r = await ev(`(()=>{
    const running=document.getAnimations().filter(a=>a.playState==="running").length;
    const vids=[...document.querySelectorAll("video")].map(v=>({src:(v.currentSrc||"").split("/").pop(),paused:v.paused,auto:v.autoplay}));
    const hidden=[...document.querySelectorAll("body *")].filter(e=>{const s=getComputedStyle(e); return +s.opacity===0 && e.getBoundingClientRect().height>20 && !e.closest("[aria-hidden=true]");}).length;
    const acts=[...document.querySelectorAll("a,button")].filter(e=>__rv.vis(e)).length;
    return {runningAnimations:running, videos:vids, invisibleBlocks:hidden, actions:acts, words:document.body.innerText.split(/\\s+/).length};
  })()`);
  await shot(`${VIEW}-reduced.png`);
  await send("Emulation.setEmulatedMedia", { features: [] });
  return r;
});

// ---------- the demo, the hero media, the steps, the footer ----------
await T("demo_media_footer", async () => {
  await metrics(1366, 768); await go("/es"); await ev(FN); await ev(`__rv.wake()`); await sleep(800);
  return await ev(`(()=>{
    const demo=document.querySelector("[data-hero-demo],#demo")||document.body;
    const dt=__rv.t(demo);
    const heroImgs=[...document.querySelectorAll("img")].filter(e=>/hero-a|hero_a/i.test(e.currentSrc||e.src)).map(e=>({src:(e.currentSrc||e.src).split("/").pop(),nw:e.naturalWidth,nh:e.naturalHeight,rw:Math.round(e.getBoundingClientRect().width),alt:e.alt}));
    const imgs=[...document.querySelectorAll("img")].filter(e=>__rv.vis(e)).map(e=>({src:(e.currentSrc||e.src).split("/").pop().slice(0,40),nw:e.naturalWidth,alt:(e.alt||"").slice(0,40)}));
    const vids=[...document.querySelectorAll("video")].map(v=>({src:(v.currentSrc||"").split("/").pop(),dur:Math.round((v.duration||0)*10)/10,poster:(v.poster||"").split("/").pop(),loop:v.loop,muted:v.muted}));
    const tomar=[...document.querySelectorAll("*")].filter(e=>__rv.vis(e)&&/^Tomar$/i.test(__rv.t(e)));
    const footer=document.querySelector("footer");
    const header=document.querySelector("header");
    let overlap=[];
    if(header){ const hr=header.getBoundingClientRect();
      overlap=[...document.querySelectorAll("h1,h1 *,[data-chip],p")].filter(e=>{if(!__rv.vis(e))return false;const r=e.getBoundingClientRect();
        return r.top<hr.bottom&&r.bottom>hr.top&&r.left<hr.right&&r.right>hr.left&&!header.contains(e);}).map(e=>__rv.t(e).slice(0,40)); }
    return {
      demoText: dt.slice(0,700),
      lauraMsgs: (dt.match(/Laura/g)||[]).length,
      ticks: (dt.match(/✓✓|✔✔|entregado|enviado/gi)||[]).length,
      heroImgs, images: imgs.slice(0,24), videos: vids,
      tomarTags: tomar.map(e=>({tag:e.tagName,role:e.getAttribute("role"),ti:e.getAttribute("tabindex")})),
      footerText: footer?__rv.t(footer).slice(0,400):null,
      headerOverlap: overlap
    };
  })()`);
});

writeFileSync(OUT, JSON.stringify(R, null, 1));
console.log("done", VIEW, Object.keys(R.steps).join(","));
try { kid.kill(); } catch {}
process.exit(0);
