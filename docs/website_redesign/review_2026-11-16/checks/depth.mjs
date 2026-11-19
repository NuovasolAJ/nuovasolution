import { writeFileSync } from "node:fs";
const BASE=process.argv[2],TAG=process.argv[3];
const CDP=9477,sleep=ms=>new Promise(r=>setTimeout(r,ms));
const list=await (await fetch(`http://127.0.0.1:${CDP}/json/list`)).json();
const ws=new WebSocket(list.find(t=>t.type==="page").webSocketDebuggerUrl);
await new Promise(r=>ws.addEventListener("open",r));
let id=0;const pend=new Map();
ws.addEventListener("message",e=>{const m=JSON.parse(e.data);if(m.id&&pend.has(m.id)){pend.get(m.id)(m);pend.delete(m.id);}});
const send=(m,p={})=>new Promise(r=>{const i=++id;pend.set(i,r);ws.send(JSON.stringify({id:i,method:m,params:p}));});
const ev=async x=>(await send("Runtime.evaluate",{expression:x,returnByValue:true,awaitPromise:true})).result?.result?.value;
await send("Page.enable");
const R={build:await (await fetch(`${BASE}/api/build`)).json(),depth:{},fonts:null,planes:null};
for (const [w,h,lab] of [[390,844,"phone390x844"],[1440,900,"desktop1440x900"]]) {
  const mob=w<500;
  for (const v of ["target","public"]) {
    await send("Emulation.setDeviceMetricsOverride",{width:w,height:h,deviceScaleFactor:mob?2:1,mobile:mob});
    await send("Page.navigate",{url:`${BASE}/es?view=${v}`}); await sleep(5200);
    await ev(`(async()=>{var y=0,steps=0;while(y<document.documentElement.scrollHeight){scrollTo({top:y,behavior:"instant"});await new Promise(r=>setTimeout(r,120));y+=600;steps++;if(steps>300)break;}scrollTo({top:0,behavior:"instant"});await new Promise(r=>setTimeout(r,400));return document.documentElement.scrollHeight})()`);
    R.depth[`${lab}_${v}`]=await ev(`({doc:document.documentElement.scrollHeight,vh:innerHeight,screens:Math.round(document.documentElement.scrollHeight/innerHeight*10)/10})`);
    if(lab==="desktop1440x900"&&v==="target"){
      R.fonts=await ev(`(()=>{const o={};for(const e of document.querySelectorAll("h1,h2,h3,.t-display-xl,.t-display-l,.t-display-m,.hf-h1,.fn-h2,.fn-title,.closing-h2")){const f=getComputedStyle(e).fontFamily.split(",")[0].replace(/["']/g,"");o[f]=(o[f]||0)+1;}return o;})()`);
      R.planes=await ev(`(()=>[...document.querySelectorAll("h1,h2,h3,[class*=eyebrow],[class*=kicker]")].map(e=>(e.textContent||"").trim()).filter(s=>s==="Planes"||s==="Plans").length`);
    }
  }
}
writeFileSync(`depth-${TAG}.json`,JSON.stringify(R,null,1));
console.log("build",R.build.commit.slice(0,7));
console.log("depth",JSON.stringify(R.depth));
console.log("fonts",JSON.stringify(R.fonts),"planes headings",R.planes);
process.exit(0);
