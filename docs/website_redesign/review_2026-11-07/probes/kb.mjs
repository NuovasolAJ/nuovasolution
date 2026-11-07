import { readFileSync } from "node:fs";
const BYPASS = readFileSync("C:/Users/Usuario/.nuova-secrets/stg_website_preview_bypass.txt","utf8").trim();
const BASE="https://nuovasolution-design-preview-c0ktpvgrs-nuovasolajs-projects.vercel.app";
const CDP=9473, sleep=ms=>new Promise(r=>setTimeout(r,ms));
const list=await (await fetch(`http://127.0.0.1:${CDP}/json/list`)).json();
const ws=new WebSocket(list.find(t=>t.type==="page").webSocketDebuggerUrl);
await new Promise(r=>ws.addEventListener("open",r));
let id=0; const pend=new Map();
ws.addEventListener("message",e=>{const m=JSON.parse(e.data); if(m.id&&pend.has(m.id)){pend.get(m.id)(m);pend.delete(m.id);} });
const send=(m,p={})=>new Promise(r=>{const i=++id;pend.set(i,r);ws.send(JSON.stringify({id:i,method:m,params:p}));});
const ev=async x=>(await send("Runtime.evaluate",{expression:x,returnByValue:true,awaitPromise:true})).result?.result?.value;
await send("Page.enable"); await send("Network.enable");
await send("Network.setExtraHTTPHeaders",{headers:{"x-vercel-protection-bypass":BYPASS}});
await send("Emulation.setDeviceMetricsOverride",{width:1366,height:768,deviceScaleFactor:1,mobile:false});
await send("Page.navigate",{url:`${BASE}/es?view=target`}); await sleep(3500);
await ev(`(async()=>{const st=Math.round(innerHeight*0.8),h=document.documentElement.scrollHeight;
 for(let y=0;y<h;y+=st){scrollTo({top:y,behavior:"instant"});await new Promise(r=>setTimeout(r,300));}
 scrollTo({top:0,behavior:"instant"});await new Promise(r=>setTimeout(r,700));return 1})()`);
// bring the tablist on screen and click on真 quiet ground: the section's own heading area
const pt=await ev(`(()=>{const tl=document.querySelector("[role=tablist]"); tl.scrollIntoView({block:"center",behavior:"instant"});
  const r=tl.getBoundingClientRect(); const probe=[[r.left+4,r.top-60],[r.left+4,r.top-90],[innerWidth-40,r.top-60]];
  for(const [x,y] of probe){ const el=document.elementFromPoint(x,y); if(el&&!el.closest("a,button,[role=tab]")) return {x:Math.round(x),y:Math.round(y),hit:el.tagName+"."+(el.className||"").toString().slice(0,24)}; }
  return {x:Math.round(r.left+4),y:Math.round(r.top-60),hit:"fallback"};})()`);
console.log("quiet ground:",JSON.stringify(pt));
await send("Input.dispatchMouseEvent",{type:"mousePressed",x:pt.x,y:pt.y,button:"left",clickCount:1});
await send("Input.dispatchMouseEvent",{type:"mouseReleased",x:pt.x,y:pt.y,button:"left",clickCount:1});
await sleep(400);
for(let i=0;i<30;i++){
  await send("Input.dispatchKeyEvent",{type:"rawKeyDown",key:"Tab",code:"Tab",windowsVirtualKeyCode:9});
  await send("Input.dispatchKeyEvent",{type:"keyUp",key:"Tab",code:"Tab",windowsVirtualKeyCode:9});
  await sleep(180);
  const f=await ev(`(()=>{const a=document.activeElement;if(!a)return null;const s=getComputedStyle(a);
    return {i:${i},tag:a.tagName,role:a.getAttribute("role"),t:(a.innerText||a.textContent||"").replace(/\s+/g," ").trim().slice(0,28),
    outline:s.outlineWidth+" "+s.outlineStyle,shadow:s.boxShadow.slice(0,40),matchFV:a.matches(":focus-visible")};})()`);
  console.log(JSON.stringify(f));
  if(f&&f.role==="tab"){
    await send("Input.dispatchKeyEvent",{type:"rawKeyDown",key:"ArrowRight",code:"ArrowRight",windowsVirtualKeyCode:39});
    await send("Input.dispatchKeyEvent",{type:"keyUp",key:"ArrowRight",code:"ArrowRight",windowsVirtualKeyCode:39});
    await sleep(700);
    console.log("AFTER ARROW:",JSON.stringify(await ev(`({sel:[...document.querySelectorAll("[role=tab]")].map(e=>e.getAttribute("aria-selected")),active:(document.activeElement.innerText||"").trim().slice(0,20),fv:document.activeElement.matches(":focus-visible"),outline:getComputedStyle(document.activeElement).outlineWidth+" "+getComputedStyle(document.activeElement).outlineStyle+" "+getComputedStyle(document.activeElement).outlineColor})`)));
    break;
  }
}
process.exit(0);
