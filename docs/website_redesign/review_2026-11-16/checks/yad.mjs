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
const shot=async n=>{const r=await send("Page.captureScreenshot",{format:"png"});const d=r.result?.result?.data||r.result?.data;if(d)writeFileSync(`yad-${n}.png`,Buffer.from(d,"base64"));};
const R={build:await (await fetch(`${B}/api/build`)).json()};
for (const [w,h,lab] of [[390,844,"390"],[1440,900,"1440"]]) {
  const mob=w<500;
  await send("Emulation.setDeviceMetricsOverride",{width:w,height:h,deviceScaleFactor:mob?2:1,mobile:mob});
  await send("Page.navigate",{url:`${B}/es?view=target`}); await sleep(5200);
  await ev(`(async()=>{const st=Math.round(innerHeight*0.8),h=document.documentElement.scrollHeight;for(let y=0;y<h;y+=st){scrollTo({top:y,behavior:"instant"});await new Promise(r=>setTimeout(r,200));}scrollTo({top:0,behavior:"instant"});await new Promise(r=>setTimeout(r,400));return h})()`);
  R[lab]=await ev(`(async function(){
    var want=["Ver Atiende","Ver Organiza","Ver Crece"];
    var btns=[].slice.call(document.querySelectorAll("button,a")).filter(function(e){return want.indexOf((e.textContent||"").trim())>=0;});
    var pos=btns.map(function(e){var r=e.getBoundingClientRect();
      return {label:(e.textContent||"").trim(),topAbs:Math.round(r.top+scrollY),left:Math.round(r.left),w:Math.round(r.width),h:Math.round(r.height)};});
    var tops=pos.map(function(p){return p.topAbs;});
    var spread=tops.length?Math.max.apply(null,tops)-Math.min.apply(null,tops):null;
    // "Y además" block
    var yd=null;
    var all=[].slice.call(document.querySelectorAll("h2,h3,p,div,section"));
    for (var i=0;i<all.length;i++){var t=(all[i].textContent||"").trim();
      if(/^Y adem[aá]s/.test(t)&&all[i].children.length<=6){ yd=all[i]; break; }}
    var ydInfo=null;
    if(yd){ var sec=yd.closest("section")||yd; var r=sec.getBoundingClientRect();
      var kids=[].slice.call(sec.children).map(function(e){var k=e.getBoundingClientRect();
        return {tag:e.tagName,cls:(e.className||"").toString().split(" ")[0],top:Math.round(k.top),h:Math.round(k.height),empty:(e.textContent||"").trim().length===0};});
      ydInfo={sectionTopAbs:Math.round(r.top+scrollY),sectionHeight:Math.round(r.height),
        textLen:(sec.textContent||"").trim().length,children:kids,
        emptyChildren:kids.filter(function(k){return k.empty&&k.h>24;}).length};}
    return {buttons:pos, topSpreadPx:spread, sameLine: spread!==null&&spread<=4, yAdemas:ydInfo};})()`);
  if(R[lab]&&R[lab].yAdemas){await ev(`(function(){var all=[].slice.call(document.querySelectorAll("h2,h3,p,div,section"));for(var i=0;i<all.length;i++){var t=(all[i].textContent||"").trim();if(/^Y adem[aá]s/.test(t)&&all[i].children.length<=6){(all[i].closest("section")||all[i]).scrollIntoView({block:"center",behavior:"instant"});return 1;}}return 0;})()`);await sleep(900);await shot(lab+"-yademas");}
}
writeFileSync("yad.json",JSON.stringify(R,null,1));
for (const k of ["390","1440"]) {
  const o=R[k]; if(!o){console.log(k,"none");continue;}
  console.log("==",k,"topSpread",o.topSpreadPx,"sameLine",o.sameLine);
  for(const b of o.buttons) console.log("   ",b.label,"top",b.topAbs,"left",b.left,b.w+"x"+b.h);
  console.log("    Y además:",JSON.stringify(o.yAdemas&&{top:o.yAdemas.sectionTopAbs,h:o.yAdemas.sectionHeight,textLen:o.yAdemas.textLen,emptyChildren:o.yAdemas.emptyChildren}));
}
process.exit(0);
