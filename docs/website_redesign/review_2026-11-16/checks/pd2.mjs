import { writeFileSync } from "node:fs";
const B="https://nuovasolution-design-preview-git-we-eeb43f-nuovasolajs-projects.vercel.app";
const CDP=9477,sleep=ms=>new Promise(r=>setTimeout(r,ms));
const list=await (await fetch(`http://127.0.0.1:${CDP}/json/list`)).json();
const ws=new WebSocket(list.find(t=>t.type==="page").webSocketDebuggerUrl);
await new Promise(r=>ws.addEventListener("open",r));
let id=0;const pend=new Map();
ws.addEventListener("message",e=>{const m=JSON.parse(e.data);if(m.id&&pend.has(m.id)){pend.get(m.id)(m);pend.delete(m.id);}});
const send=(m,p={})=>new Promise(r=>{const i=++id;pend.set(i,r);ws.send(JSON.stringify({id:i,method:m,params:p}));});
const ev=async x=>(await send("Runtime.evaluate",{expression:x,returnByValue:true,awaitPromise:true})).result?.result?.value;
await send("Page.enable");
const R={build:await (await fetch(`${B}/api/build`)).json()};
for (const [w,h,lab] of [[390,844,"390"],[1440,900,"1440"]]) {
  const mob=w<500;
  await send("Emulation.setDeviceMetricsOverride",{width:w,height:h,deviceScaleFactor:mob?2:1,mobile:mob});
  await send("Page.navigate",{url:`${B}/es?view=target`}); await sleep(5200);
  R[lab]=await ev(`(async function(){
    var all=[].slice.call(document.querySelectorAll("[data-plan-direct]"));
    var vis=all.filter(function(e){return e.getClientRects().length>0;});
    if(vis.length) vis[0].scrollIntoView({block:"center",behavior:"instant"});
    await new Promise(r=>setTimeout(r,900));
    var box=function(e){var r=e.getBoundingClientRect();var cs=getComputedStyle(e);
      return {key:e.getAttribute("data-plan-direct"),w:Math.round(r.width),h:Math.round(r.height),area:Math.round(r.width*r.height),
        topAbs:Math.round(r.top+scrollY),fontSize:parseFloat(cs.fontSize),fontWeight:cs.fontWeight,bg:cs.backgroundColor,
        decoration:cs.textDecorationLine,radius:cs.borderRadius,href:e.getAttribute("href")};};
    var shown=all.filter(function(e){return e.getClientRects().length>0;}).map(box);
    var hidden=all.filter(function(e){return e.getClientRects().length===0;}).map(function(e){return e.getAttribute("data-plan-direct");});
    // the pilot button inside the same plan unit
    var pilots=[].slice.call(document.querySelectorAll("a,button")).filter(function(e){
      return /piloto gratuito/i.test(e.textContent||"")&&e.getClientRects().length>0&&e.getBoundingClientRect().width>40;}).map(function(e){
      var r=e.getBoundingClientRect();return {w:Math.round(r.width),h:Math.round(r.height),area:Math.round(r.width*r.height),topAbs:Math.round(r.top+scrollY)};});
    var near=shown.length?pilots.filter(function(p){return Math.abs(p.topAbs-shown[0].topAbs)<160;}):[];
    return {total:all.length, shown:shown, hiddenKeys:hidden, pilotNearFirst: near[0]||null};})()`);
}
writeFileSync("pd2.json",JSON.stringify(R,null,1));
for (const k of ["390","1440"]) {
  const o=R[k]; console.log("==",k,"total",o.total,"hidden",JSON.stringify(o.hiddenKeys));
  for (const s of o.shown) console.log("   ",s.key,s.w+"x"+s.h,"="+s.area+"px2",s.fontSize+"px",s.bg,s.decoration,s.radius,s.href);
  console.log("    pilot near first:",JSON.stringify(o.pilotNearFirst));
}
process.exit(0);
