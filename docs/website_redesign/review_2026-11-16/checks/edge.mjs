import { writeFileSync } from "node:fs";
const BASE=process.argv[2], TAG=process.argv[3];
const CDP=9477, sleep=ms=>new Promise(r=>setTimeout(r,ms));
const list=await (await fetch(`http://127.0.0.1:${CDP}/json/list`)).json();
const ws=new WebSocket(list.find(t=>t.type==="page").webSocketDebuggerUrl);
await new Promise(r=>ws.addEventListener("open",r));
let id=0; const pend=new Map();
ws.addEventListener("message",e=>{const m=JSON.parse(e.data); if(m.id&&pend.has(m.id)){pend.get(m.id)(m);pend.delete(m.id);}});
const send=(m,p={})=>new Promise(r=>{const i=++id;pend.set(i,r);ws.send(JSON.stringify({id:i,method:m,params:p}));});
const ev=async x=>(await send("Runtime.evaluate",{expression:x,returnByValue:true,awaitPromise:true})).result?.result?.value;
await send("Page.enable");
const shot=async n=>{const r=await send("Page.captureScreenshot",{format:"png"});const d=r.result?.result?.data||r.result?.data;if(d)writeFileSync(`edge-${TAG}-${n}.png`,Buffer.from(d,"base64"));};
const R={};
for (const [w,h,label] of [[1366,768,"1366x768"],[1366,625,"1366x625"],[1440,900,"1440x900"],[1440,757,"1440x757"],[390,844,"390x844"],[390,664,"390x664"]]) {
  const mob=w<500;
  await send("Emulation.setDeviceMetricsOverride",{width:w,height:h,deviceScaleFactor:mob?2:1,mobile:mob});
  await send("Page.navigate",{url:`${BASE}/es?view=target`}); await sleep(5200);
  const furn=await ev(`(()=>{let px=0;for(const s of ["[data-env]","[data-preview-switches]","[data-env-marker]"]){for(const e of document.querySelectorAll(s)){const r=e.getBoundingClientRect();if(getComputedStyle(e).position!=="fixed")px+=Math.round(r.height);e.style.display="none";}}scrollTo({top:0,behavior:"instant"});return px;})()`);
  await sleep(700);
  R[label]=await ev(`(()=>{const vh=innerHeight;
    const hero=document.querySelector('[data-hero="film"]')||document.querySelector("h1")?.closest("section");
    if(!hero) return {error:"no hero"};
    const hr=hero.getBoundingClientRect();
    // the first element after the hero in document order that paints something
    let next=hero.nextElementSibling;
    while(next&&next.getBoundingClientRect().height<4) next=next.nextElementSibling;
    const nr=next?next.getBoundingClientRect():null;
    const vis=nr?Math.max(0,Math.round(Math.min(vh,nr.bottom)-Math.max(0,nr.top))):0;
    const txt=next?(next.textContent||"").trim().replace(/\s+/g," ").slice(0,70):"";
    return {vh, heroBottom:Math.round(hr.bottom), heroHeight:Math.round(hr.height),
      nextTag: next?next.tagName+"."+(next.className||"").toString().split(" ")[0]:null,
      nextTop: nr?Math.round(nr.top):null, nextVisiblePx: vis, nextText: txt,
      h1Top: Math.round(document.querySelector("h1").getBoundingClientRect().top)};})()`);
  R[label].furniturePx=furn;
  await shot(label);
}
writeFileSync(`edge-${TAG}.json`,JSON.stringify(R,null,1));
for(const [k,v] of Object.entries(R)) console.log(k,"vh="+v.vh,"heroBottom="+v.heroBottom,"next="+v.nextTag,"visible="+v.nextVisiblePx+"px","h1@"+v.h1Top,"|",v.nextText);
process.exit(0);
