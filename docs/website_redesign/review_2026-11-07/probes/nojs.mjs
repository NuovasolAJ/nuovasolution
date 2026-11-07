import { readFileSync, writeFileSync } from "node:fs";
const B=readFileSync("C:/Users/Usuario/.nuova-secrets/stg_website_preview_bypass.txt","utf8").trim();
const BASE="https://nuovasolution-design-preview-c0ktpvgrs-nuovasolajs-projects.vercel.app";
const H={"x-vercel-protection-bypass":B}, CDP=9473, sleep=ms=>new Promise(r=>setTimeout(r,ms));
// 1. inline opacity:0 in the delivered HTML
for(const view of ["target","public"]){
  const h=await fetch(`${BASE}/es?view=${view}`,{headers:H}).then(r=>r.text());
  const m=h.match(/style="[^"]*opacity:\s*0[^"]*"/g)||[];
  const cls=[...h.matchAll(/class="([^"]{0,40})"[^>]*style="[^"]*opacity:\s*0/g)].map(x=>x[1]);
  console.log(`[${view}] inline opacity:0 elements = ${m.length}  classes: ${JSON.stringify([...new Set(cls)].slice(0,12))}`);
}
// 2. CDP: no JavaScript, and reduced motion on the reveal items
const list=await (await fetch(`http://127.0.0.1:${CDP}/json/list`)).json();
const ws=new WebSocket(list.find(t=>t.type==="page").webSocketDebuggerUrl);
await new Promise(r=>ws.addEventListener("open",r));
let id=0; const pend=new Map();
ws.addEventListener("message",e=>{const m=JSON.parse(e.data); if(m.id&&pend.has(m.id)){pend.get(m.id)(m);pend.delete(m.id);}});
const send=(m,p={})=>new Promise(r=>{const i=++id;pend.set(i,r);ws.send(JSON.stringify({id:i,method:m,params:p}));});
const ev=async x=>(await send("Runtime.evaluate",{expression:x,returnByValue:true,awaitPromise:true})).result?.result?.value;
await send("Page.enable"); await send("Network.enable");
await send("Network.setExtraHTTPHeaders",{headers:H});
await send("Emulation.setDeviceMetricsOverride",{width:1366,height:768,deviceScaleFactor:1,mobile:false});

// reduced motion: the three families after scrolling into view
await send("Emulation.setEmulatedMedia",{features:[{name:"prefers-reduced-motion",value:"reduce"}]});
await send("Page.navigate",{url:`${BASE}/es?view=target`}); await sleep(4000);
const red=await ev(`(async()=>{const fam={"ps-task":".ps-task","rep-insight":".rep-insight","fn-stage-next":".fn-stage-next","mrise":".mrise"};
 const out={};
 for(const [k,s] of Object.entries(fam)){ const els=[...document.querySelectorAll(s)]; let zero=0, total=0;
   for(const e of els.slice(0,12)){ e.scrollIntoView({block:"center",behavior:"instant"}); await new Promise(r=>setTimeout(r,650));
     total++; if(+getComputedStyle(e).opacity<0.1) zero++; }
   out[k]={total,invisibleAfterInView:zero}; }
 return out;})()`);
console.log("reduced motion, after scrolling each into view:",JSON.stringify(red));
await send("Emulation.setEmulatedMedia",{features:[]});

// no JavaScript
await send("Emulation.setScriptExecutionDisabled",{value:true});
await send("Page.navigate",{url:`${BASE}/es?view=target`}); await sleep(4000);
const html=await (await send("DOM.getDocument",{depth:-1})).result ? null : null;
const outer=(await send("Runtime.evaluate",{expression:"1"}));
// with script execution disabled, Runtime.evaluate still works for the inspector context
const nojs=await ev(`(()=>{
  const vis=e=>{const s=getComputedStyle(e); if(s.display==="none"||s.visibility==="hidden"||+s.opacity===0) return false; const r=e.getBoundingClientRect(); return r.width>1&&r.height>1;};
  const zero=[...document.querySelectorAll("[style*='opacity']")].filter(e=>+getComputedStyle(e).opacity<0.1);
  const acts=[...document.querySelectorAll("a,button")].filter(vis).map(e=>(e.innerText||"").trim().slice(0,24)).slice(0,20);
  const h1=[...document.querySelectorAll("h1")].filter(vis).map(e=>(e.innerText||"").trim().slice(0,50));
  const notice=document.body.innerText.includes("Vista previa, no p");
  const demoEnd=/Ficha|prioridad|Visita/.test(document.body.innerText);
  return {invisibleInline:zero.length, invisibleClasses:[...new Set(zero.map(e=>(e.className||"").toString().slice(0,26)))].slice(0,10),
    h1, visibleActions:acts, notice, demoEndStateText:demoEnd, words:document.body.innerText.split(/\s+/).length};})()`);
console.log("no JavaScript:",JSON.stringify(nojs));
await send("Emulation.setScriptExecutionDisabled",{value:false});
process.exit(0);
