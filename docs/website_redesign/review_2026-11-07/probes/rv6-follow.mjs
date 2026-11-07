// RV6 follow-up: A-10 (do the tabs switch by themselves?), A-16 with the build's real scene markers,
// the 3D step walk with the media facts (A-22 / D09 / D10), the hero files' true pixel widths (D02),
// the 390 px wide element, and the blocks that stay invisible under reduced motion (A-5).
import { readFileSync, writeFileSync } from "node:fs";
const BYPASS = readFileSync("C:/Users/Usuario/.nuova-secrets/stg_website_preview_bypass.txt", "utf8").trim();
const BASE = "https://nuovasolution-design-preview-c0ktpvgrs-nuovasolajs-projects.vercel.app";
const VIEW = process.argv[2] || "target";
const CDP = 9473, sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const list = await (await fetch(`http://127.0.0.1:${CDP}/json/list`)).json();
const ws = new WebSocket(list.find((t) => t.type === "page").webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener("open", r));
let id = 0; const pend = new Map();
ws.addEventListener("message", (e) => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } });
const send = (m, p = {}) => new Promise((r) => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method: m, params: p })); });
const ev = async (x) => (await send("Runtime.evaluate", { expression: x, returnByValue: true, awaitPromise: true })).result?.result?.value;
await send("Page.enable"); await send("Network.enable");
await send("Network.setExtraHTTPHeaders", { headers: { "x-vercel-protection-bypass": BYPASS } });
const metrics = (w, h, m = false) => send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: m ? 2 : 1, mobile: m });
const go = async (p, s = 3500) => { await send("Page.navigate", { url: `${BASE}${p}${p.includes("?") ? "&" : "?"}view=${VIEW}` }); await sleep(s); };
const wake = () => ev(`(async()=>{const st=Math.round(innerHeight*0.8),h=document.documentElement.scrollHeight;
 for(let y=0;y<h;y+=st){scrollTo({top:y,behavior:"instant"});await new Promise(r=>setTimeout(r,300));}
 scrollTo({top:0,behavior:"instant"});await new Promise(r=>setTimeout(r,700));return h})()`);
const R = { view: VIEW, utc: new Date().toISOString() };
const T = async (n, f) => { try { R[n] = await f(); } catch (e) { R[n] = { error: String(e).slice(0, 180) }; } };

// 1. A-10: load, never click, watch aria-selected for 22 s
await metrics(1366, 768);
await T("A10_selfSwitch", async () => {
  await go("/es"); await wake();
  await ev(`(()=>{const tl=document.querySelector("[role=tablist]");tl.scrollIntoView({block:"center",behavior:"instant"});return 1})()`);
  await sleep(500);
  const seq = [];
  for (let i = 0; i < 22; i++) {
    seq.push(await ev(`(()=>{const t=[...document.querySelectorAll("[data-demo-tab]")];
      return t.findIndex(e=>e.getAttribute("aria-selected")==="true")+"|"+(document.querySelector("[data-demo-tab][aria-selected=true]")?.getAttribute("data-demo-tab")||"");})()`));
    await sleep(1000);
  }
  const titles = await ev(`[...new Set([...document.querySelectorAll("[data-demo-tab]")].map(e=>e.getAttribute("title")))]`);
  const changes = seq.filter((v, i) => i > 0 && v !== seq[i - 1]).length;
  return { secondsWatched: 22, sequence: seq, changesWithoutAnyClick: changes, tabTitle: titles };
});

// 2. the scene machinery: find the real markers, then A-16 at 800 px/s
await T("scenes", async () => {
  await go("/es"); await wake();
  const probe = await ev(`(()=>{
    const attrs=new Set(); document.querySelectorAll("*").forEach(e=>{for(const a of e.getAttributeNames()) if(/scene|step|chapter|stage|rail|功/i.test(a)) attrs.add(a);});
    const cand=[...document.querySelectorAll("[data-scene],[data-step],[data-chapter],[data-stage]")].slice(0,4).map(e=>({tag:e.tagName,attrs:e.getAttributeNames().join(","),t:(e.innerText||"").replace(/\\s+/g," ").slice(0,40)}));
    return {attrNames:[...attrs], sample:cand, sceneCount:document.querySelectorAll("[data-scene]").length};
  })()`);
  return probe;
});

// 3. the hero files' true widths (D02)
await T("heroFiles", async () => ev(`(async()=>{
  const names=["hero-a-2560.webp","hero-a-1920.webp","hero-a-1280.webp","hero-a-poster-960.webp"];
  const out=[];
  for(const n of names){ const img=new Image(); img.src="/media/3d/"+n;
    await new Promise(r=>{img.onload=r;img.onerror=r;setTimeout(r,4000);});
    out.push({file:n, naturalWidth:img.naturalWidth, naturalHeight:img.naturalHeight}); }
  const picked=document.querySelector("img[src*='hero-a'],img[srcset*='hero-a']");
  return {files:out, inPage: picked?{current:(picked.currentSrc||"").split("/").pop(), rendered:Math.round(picked.getBoundingClientRect().width), dpr:devicePixelRatio, srcset:(picked.getAttribute("srcset")||"").slice(0,160)}:null};
})()`));

// 4. the 3D step walk: which media load, their facts
await T("media3d", async () => {
  await go("/es"); await wake();
  return await ev(`(async()=>{
    const sec=[...document.querySelectorAll("section")].find(s=>/Presentar un inmueble|Del plano/i.test(s.innerText||""));
    if(!sec) return {found:false};
    sec.scrollIntoView({block:"center",behavior:"instant"}); await new Promise(r=>setTimeout(r,1200));
    const steps=[...sec.querySelectorAll("button,[role=tab],[data-step]")].filter(e=>{const r=e.getBoundingClientRect();return r.width>8&&r.height>8;});
    const log=[];
    for(let i=0;i<Math.min(steps.length,8);i++){
      steps[i].scrollIntoView({block:"center",behavior:"instant"}); await new Promise(r=>setTimeout(r,300));
      steps[i].click(); await new Promise(r=>setTimeout(r,2600));
      const vids=[...sec.querySelectorAll("video")].map(v=>({src:(v.currentSrc||"").split("/").pop(),dur:Math.round((v.duration||0)*10)/10,poster:(v.poster||"").split("/").pop(),paused:v.paused,loop:v.loop,w:v.videoWidth,h:v.videoHeight,quality:(()=>{try{const q=v.getVideoPlaybackQuality?v.getVideoPlaybackQuality():null;return q?{dropped:q.droppedVideoFrames,total:q.totalVideoFrames}:null}catch(e){return null}})()}));
      const imgs=[...sec.querySelectorAll("img")].filter(e=>e.getBoundingClientRect().width>20).map(e=>({src:(e.currentSrc||e.src).split("/").pop(),nw:e.naturalWidth,alt:(e.alt||"").slice(0,50)}));
      log.push({step:i, label:(steps[i].innerText||"").replace(/\\s+/g," ").trim().slice(0,30), videos:vids, images:imgs});
    }
    return {found:true, steps:steps.length, log};
  })()`);
});

// 5. the 402 px element at 390 and the invisible blocks under reduced motion
await T("phone402", async () => {
  await metrics(390, 844, true); await go("/es"); await wake();
  return await ev(`(()=>{
    const wide=[...document.querySelectorAll("body *")].filter(e=>{const s=getComputedStyle(e); if(s.display==="none"||s.visibility==="hidden")return false;
      const r=e.getBoundingClientRect(); return r.width>innerWidth+2;}).slice(0,6)
      .map(e=>({tag:e.tagName,cls:(e.className||"").toString().slice(0,50),w:Math.round(e.getBoundingClientRect().width),ov:getComputedStyle(e).overflowX,t:(e.innerText||"").replace(/\\s+/g," ").slice(0,34)}));
    return {docScrollWidth:document.documentElement.scrollWidth, inner:innerWidth, wide};
  })()`);
});
await T("A5_invisible", async () => {
  await send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
  await metrics(1366, 768); await go("/es"); await wake();
  const r = await ev(`(()=>[...document.querySelectorAll("body *")].filter(e=>{const s=getComputedStyle(e);
     return +s.opacity===0 && e.getBoundingClientRect().height>20 && !e.closest("[aria-hidden=true]");})
     .slice(0,16).map(e=>({tag:e.tagName,cls:(e.className||"").toString().slice(0,60),h:Math.round(e.getBoundingClientRect().height),t:(e.innerText||"").replace(/\\s+/g," ").slice(0,40),anim:getComputedStyle(e).animationName,tr:getComputedStyle(e).transform.slice(0,30)})))()`);
  await send("Emulation.setEmulatedMedia", { features: [] });
  return r;
});

writeFileSync(`rv6-follow-${VIEW}.json`, JSON.stringify(R, null, 1));
console.log("done");
process.exit(0);
