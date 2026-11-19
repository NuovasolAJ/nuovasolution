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
for (const [w,h,lab] of [[1440,900,"1440"],[390,844,"390"]]) {
  const mob=w<500;
  await send("Emulation.setDeviceMetricsOverride",{width:w,height:h,deviceScaleFactor:mob?2:1,mobile:mob});
  await send("Page.navigate",{url:`${B}/es?view=target`}); await sleep(5200);
  await ev(`(async()=>{var y=0,steps=0;while(y<document.documentElement.scrollHeight){scrollTo({top:y,behavior:"instant"});await new Promise(r=>setTimeout(r,120));y+=600;steps++;if(steps>300)break;}scrollTo({top:0,behavior:"instant"});await new Promise(r=>setTimeout(r,400));return document.documentElement.scrollHeight})()`);
  R[lab]=await ev(`(function(){
    var box=document.querySelector(".ch-extra"); if(!box) return {found:false};
    var br=box.getBoundingClientRect();
    var rects=[];
    var walk=function(e){
      for(var i=0;i<e.children.length;i++){var c=e.children[i];var r=c.getBoundingClientRect();
        var cs=getComputedStyle(c);
        var paints=(c.textContent||"").trim().length>0||c.tagName==="IMG"||c.tagName==="SVG"||cs.backgroundImage!=="none"||cs.backgroundColor!=="rgba(0, 0, 0, 0)";
        if(r.height>2&&paints&&c.children.length===0) rects.push({top:Math.round(r.top),bottom:Math.round(r.bottom)});
        else walk(c);}};
    walk(box);
    rects.sort(function(a,b){return a.top-b.top;});
    var merged=[];
    for(var i=0;i<rects.length;i++){var r=rects[i];
      if(merged.length&&r.top<=merged[merged.length-1].bottom+1){merged[merged.length-1].bottom=Math.max(merged[merged.length-1].bottom,r.bottom);}
      else merged.push({top:r.top,bottom:r.bottom});}
    var gaps=[];
    for(var i=1;i<merged.length;i++){var g=merged[i].top-merged[i-1].bottom; if(g>0) gaps.push({afterY:merged[i-1].bottom,px:g});}
    var ink=merged.reduce(function(s,m){return s+(m.bottom-m.top);},0);
    gaps.sort(function(a,b){return b.px-a.px;});
    return {found:true, blockW:Math.round(br.width), blockH:Math.round(br.height),
      contentBands:merged.length, inkPx:ink, coveragePct:Math.round(ink/br.height*100),
      largestGapPx: gaps.length?gaps[0].px:0, top3Gaps:gaps.slice(0,3)};})()`);
}
writeFileSync("gap.json",JSON.stringify(R,null,1));
for (const k of ["1440","390"]) console.log(k, JSON.stringify(R[k]));
process.exit(0);
