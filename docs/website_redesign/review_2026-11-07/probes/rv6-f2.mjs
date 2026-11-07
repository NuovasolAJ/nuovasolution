import { readFileSync, writeFileSync } from "node:fs";
const BYPASS = readFileSync("C:/Users/Usuario/.nuova-secrets/stg_website_preview_bypass.txt","utf8").trim();
const BASE="https://nuovasolution-design-preview-c0ktpvgrs-nuovasolajs-projects.vercel.app";
const VIEW=process.argv[2]||"target", CDP=9473, sleep=ms=>new Promise(r=>setTimeout(r,ms));
const list=await (await fetch(`http://127.0.0.1:${CDP}/json/list`)).json();
const ws=new WebSocket(list.find(t=>t.type==="page").webSocketDebuggerUrl);
await new Promise(r=>ws.addEventListener("open",r));
let id=0; const pend=new Map();
ws.addEventListener("message",e=>{const m=JSON.parse(e.data); if(m.id&&pend.has(m.id)){pend.get(m.id)(m);pend.delete(m.id);}});
const send=(m,p={})=>new Promise(r=>{const i=++id;pend.set(i,r);ws.send(JSON.stringify({id:i,method:m,params:p}));});
const ev=async x=>(await send("Runtime.evaluate",{expression:x,returnByValue:true,awaitPromise:true})).result?.result?.value;
await send("Page.enable"); await send("Network.enable");
await send("Network.setExtraHTTPHeaders",{headers:{"x-vercel-protection-bypass":BYPASS}});
const metrics=(w,h,m=false)=>send("Emulation.setDeviceMetricsOverride",{width:w,height:h,deviceScaleFactor:m?2:1,mobile:m});
const go=async(p,s=3500)=>{await send("Page.navigate",{url:`${BASE}${p}${p.includes("?")?"&":"?"}view=${VIEW}`});await sleep(s);};
const wake=()=>ev(`(async()=>{const st=Math.round(innerHeight*0.8),h=document.documentElement.scrollHeight;
 for(let y=0;y<h;y+=st){scrollTo({top:y,behavior:"instant"});await new Promise(r=>setTimeout(r,300));}
 scrollTo({top:0,behavior:"instant"});await new Promise(r=>setTimeout(r,700));return h})()`);
const R={view:VIEW};
await metrics(1366,768);

// A-16 with the real markers, at 800 px/s
await go("/es"); await wake();
R.A16 = await ev(`(async()=>{
  const stage=document.querySelector("[data-fn-stage]"); if(!stage) return {found:false};
  const host=stage.closest("section")||stage; const hr=host.getBoundingClientRect();
  const top=Math.round(hr.top+scrollY), h=Math.round(hr.height);
  const read=()=>{ const b=[...document.querySelectorAll("[data-fn-stage-button],[data-fn-chapter]")];
    const on=document.querySelector("[data-fn-stage] [aria-current],[data-fn-stage-button][aria-current],[data-fn-stage-button].is-on,[data-fn-chapter][data-on=true]");
    const vis=[...document.querySelectorAll("[data-fn-stage] *")].filter(e=>{const s=getComputedStyle(e);const r=e.getBoundingClientRect();
      return +s.opacity>0.9&&r.height>40&&r.top<innerHeight&&r.bottom>0&&(e.innerText||"").trim().length>12;});
    const label=vis.length?vis[0].innerText.replace(/\s+/g," ").trim().slice(0,34):null;
    return label; };
  const px=800, step=40, dt=Math.round(1000*step/px), log=[];
  scrollTo({top:Math.max(0,top-300),behavior:"instant"}); await new Promise(r=>setTimeout(r,600));
  for(let y=top-300;y<top+h+500;y+=step){ scrollTo({top:y,behavior:"instant"}); await new Promise(r=>setTimeout(r,dt)); log.push({y,s:read()}); }
  const dwell={}; let prev=null,c=0;
  for(const e of log){ if(e.s!==prev){prev=e.s;c=1;} else c++; if(e.s) dwell[e.s]=Math.max(dwell[e.s]||0,c*dt); }
  scrollTo({top:0,behavior:"instant"});
  return {found:true, stageTop:top, stageHeight:h, samples:log.length, scenes:Object.keys(dwell).length,
    dwellMs:dwell, minDwell:Math.min(...Object.values(dwell)), order:[...new Set(log.map(e=>e.s).filter(Boolean))]};
})()`);

// the 3D walk with data-m3d-step-button
await go("/es"); await wake();
R.M3D = await ev(`(async()=>{
  const st=document.querySelector("[data-model3d-stage]"); if(!st) return {found:false};
  st.scrollIntoView({block:"center",behavior:"instant"}); await new Promise(r=>setTimeout(r,1500));
  const btns=[...document.querySelectorAll("[data-m3d-step-button]")];
  const log=[];
  for(let i=0;i<btns.length;i++){
    btns[i].scrollIntoView({block:"center",behavior:"instant"}); await new Promise(r=>setTimeout(r,250));
    btns[i].click(); await new Promise(r=>setTimeout(r,3200));
    const vids=[...st.querySelectorAll("video")].map(v=>({src:(v.currentSrc||"").split("/").pop(),dur:Math.round((v.duration||0)*100)/100,
      poster:(v.poster||"").split("/").pop(),paused:v.paused,loop:v.loop,w:v.videoWidth,h:v.videoHeight,
      q:(()=>{try{const q=v.getVideoPlaybackQuality();return {dropped:q.droppedVideoFrames,total:q.totalVideoFrames}}catch(e){return null}})()}));
    const imgs=[...st.querySelectorAll("img")].filter(e=>e.getBoundingClientRect().width>20)
      .map(e=>({src:(e.currentSrc||e.src).split("/").pop(),nw:e.naturalWidth,alt:(e.alt||"")}));
    log.push({step:i,label:(btns[i].innerText||"").replace(/\s+/g," ").trim().slice(0,28),videos:vids,images:imgs});
  }
  return {found:true,steps:btns.length,log};
})()`);

// reduced motion: scroll the reveal blocks into view and look again
await send("Emulation.setEmulatedMedia",{features:[{name:"prefers-reduced-motion",value:"reduce"}]});
await go("/es"); await wake();
R.A5inView = await ev(`(async()=>{
  const sel=[...document.querySelectorAll(".mrise, .rep-insight, .trust-step, .trust-words, .fn-stage-next")];
  const out=[];
  for(const e of sel.slice(0,14)){ e.scrollIntoView({block:"center",behavior:"instant"}); await new Promise(r=>setTimeout(r,700));
    const s=getComputedStyle(e); out.push({cls:(e.className||"").toString().slice(0,34),opacity:+s.opacity,tr:s.transform.slice(0,26),h:Math.round(e.getBoundingClientRect().height)}); }
  return out;
})()`);
await send("Emulation.setEmulatedMedia",{features:[]});

// the hero img in page, natural size
await go("/es"); await wake();
R.heroInPage = await ev(`(()=>{const i=document.querySelector("img.hf-image,img[srcset*='hero-a']");
  return i?{cur:(i.currentSrc||"").split("/").pop(),nw:i.naturalWidth,nh:i.naturalHeight,rw:Math.round(i.getBoundingClientRect().width),sizes:i.getAttribute("sizes")}:null;})()`);
// "Tomar" after the scene walk
R.tomar = await ev(`(async()=>{ const b=[...document.querySelectorAll("[data-fn-stage-button]")];
  for(const x of b){ x.click(); await new Promise(r=>setTimeout(r,400)); }
  const t=[...document.querySelectorAll("*")].filter(e=>/^Tomar$/i.test((e.innerText||"").trim()));
  return t.map(e=>({tag:e.tagName,role:e.getAttribute("role"),ti:e.getAttribute("tabindex"),disabled:e.disabled??null,
    clickable:(()=>{const r=e.getBoundingClientRect();const el=document.elementFromPoint(r.left+r.width/2,r.top+r.height/2);return el?(e===el||e.contains(el)||el.contains(e)):null;})()}));
})()`);
writeFileSync(`rv6-f2-${VIEW}.json`,JSON.stringify(R,null,1));
console.log("done");
process.exit(0);
