import { writeFileSync } from "node:fs";
const B="https://nuovasolution-design-preview-git-we-eeb43f-nuovasolajs-projects.vercel.app";
const CDP=9477, sleep=ms=>new Promise(r=>setTimeout(r,ms));
const list=await (await fetch(`http://127.0.0.1:${CDP}/json/list`)).json();
const ws=new WebSocket(list.find(t=>t.type==="page").webSocketDebuggerUrl);
await new Promise(r=>ws.addEventListener("open",r));
let id=0;const pend=new Map();
ws.addEventListener("message",e=>{const m=JSON.parse(e.data);if(m.id&&pend.has(m.id)){pend.get(m.id)(m);pend.delete(m.id);}});
const send=(m,p={})=>new Promise(r=>{const i=++id;pend.set(i,r);ws.send(JSON.stringify({id:i,method:m,params:p}));});
const ev=async x=>(await send("Runtime.evaluate",{expression:x,returnByValue:true,awaitPromise:true})).result?.result?.value;
await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride",{width:1440,height:900,deviceScaleFactor:1,mobile:false});
const R={};
for (const interes of ["pilot","contratar"]) for (const plan of ["essential","growth","enterprise"]) {
  const u=`${B}/es/contact?interes=${interes}&plan=${plan}&view=target`;
  await send("Page.navigate",{url:u}); await sleep(4200);
  R[`${interes}|${plan}`]=await ev(`(function(){var f=document.querySelector("form"); if(!f) return {form:false};
    var vals={};
    [].slice.call(f.querySelectorAll("select")).forEach(function(s){vals["select:"+(s.name||s.id)]=s.value;});
    [].slice.call(f.querySelectorAll('input[type=radio]')).forEach(function(r){if(r.checked)vals["radio:"+r.name]=r.value;});
    var ta=f.querySelector("textarea");
    var sub=f.querySelector('button[type=submit]');
    return {vals:vals, textarea:(ta&&ta.value||"").slice(0,60), submit:(sub&&sub.textContent||"").trim().slice(0,40)};})()`);
}
writeFileSync("presel.json",JSON.stringify(R,null,1));
for (const [k,v] of Object.entries(R)) console.log(k, JSON.stringify(v));
process.exit(0);
