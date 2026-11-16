import { writeFileSync } from "node:fs";
const B="https://nuovasolution-design-preview-git-we-eeb43f-nuovasolajs-projects.vercel.app";
const CDP=9477,sleep=ms=>new Promise(r=>setTimeout(r,ms));
const list=await (await fetch(`http://127.0.0.1:${CDP}/json/list`)).json();
const ws=new WebSocket(list.find(t=>t.type==="page").webSocketDebuggerUrl);
await new Promise(r=>ws.addEventListener("open",r));
let id=0;const pend=new Map();
ws.addEventListener("message",e=>{const m=JSON.parse(e.data);if(m.id&&pend.has(m.id)){pend.get(m.id)(m);pend.delete(m.id);}});
const send=(m,p={})=>new Promise(r=>{const i=++id;pend.set(i,r);ws.send(JSON.stringify({id:i,method:m,params:p}));});
const ev=async x=>{const r=await send("Runtime.evaluate",{expression:x,returnByValue:true,awaitPromise:true});
  if(r.result?.exceptionDetails)return{__error:(r.result.exceptionDetails.exception?.description||"").slice(0,200)};
  return r.result?.result?.value;};
await send("Page.enable");
const wake=()=>ev(`(async()=>{const st=Math.round(innerHeight*0.8),h=document.documentElement.scrollHeight;for(let y=0;y<h;y+=st){scrollTo({top:y,behavior:"instant"});await new Promise(r=>setTimeout(r,200));}scrollTo({top:0,behavior:"instant"});await new Promise(r=>setTimeout(r,400));return h})()`);
const R={build:await (await fetch(`${B}/api/build`)).json()};
const BOX=`function(e){if(!e)return null;var r=e.getBoundingClientRect();var cs=getComputedStyle(e);
  return {text:(e.textContent||"").trim().slice(0,40),w:Math.round(r.width),h:Math.round(r.height),area:Math.round(r.width*r.height),
    topAbs:Math.round(r.top+scrollY),fontSize:parseFloat(cs.fontSize),fontWeight:cs.fontWeight,bg:cs.backgroundColor,
    color:cs.color,decoration:cs.textDecorationLine,borderRadius:cs.borderRadius,tag:e.tagName};}`;
for (const [w,h,lab] of [[390,844,"390"],[1440,900,"1440"]]) {
  const mob=w<500;
  await send("Emulation.setDeviceMetricsOverride",{width:w,height:h,deviceScaleFactor:mob?2:1,mobile:mob});
  // packages block on the home page
  await send("Page.navigate",{url:`${B}/es?view=target`}); await sleep(5200); await wake();
  R[`plansDirect_${lab}`]=await ev(`(function(){var box=${BOX};
    var links=[].slice.call(document.querySelectorAll("a.plans-direct,[data-plan-direct]"));
    var btns=[].slice.call(document.querySelectorAll("a,button")).filter(function(e){return /piloto gratuito|free pilot/i.test(e.textContent||"")&&e.getBoundingClientRect().width>40;});
    return {count:links.length, sample:links.slice(0,3).map(box), pilotButtons:btns.slice(0,2).map(box)};})()`);
  // contact page
  await send("Page.navigate",{url:`${B}/es/contact?view=target`}); await sleep(5200); await wake();
  R[`prqDirect_${lab}`]=await ev(`(function(){var box=${BOX};
    var d=document.querySelector("button.prq-direct,[data-prq-direct]");
    var f=document.querySelector("form");
    var sub=f?f.querySelector('button[type="submit"]'):null;
    var reach=document.querySelector("[data-prq-reach]");
    return {direct:box(d), submit:box(sub), reachLine: reach?{text:(reach.textContent||"").trim().slice(0,90),role:reach.getAttribute("role")}:null,
      directBelowSubmit: (d&&sub)?(d.getBoundingClientRect().top>sub.getBoundingClientRect().top):null};})()`);
  // trigger the client rule without sending: clear the fields and press submit
  R[`orRule_${lab}`]=await ev(`(async function(){
    var f=document.querySelector("form"); if(!f) return {form:false};
    var set=function(n,v){var e=f.querySelector('[name="'+n+'"]'); if(!e)return false;
      var p=Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set; p.call(e,v);
      e.dispatchEvent(new Event("input",{bubbles:true})); return true;};
    set("agency","Prueba RV6"); set("name","Prueba RV6"); set("email",""); set("phone","");
    var sub=f.querySelector('button[type="submit"]'); sub.click();
    await new Promise(r=>setTimeout(r,1200));
    var al=document.querySelector("[role=alert]");
    return {alert: al?(al.textContent||"").trim().slice(0,120):null,
      reach: (function(){var e=document.querySelector("[data-prq-reach]");return e?(e.textContent||"").trim().slice(0,120):null;})()};})()`);
}
writeFileSync("direct.json",JSON.stringify(R,null,1));
console.log(JSON.stringify(R,null,1).slice(0,2800));
process.exit(0);
