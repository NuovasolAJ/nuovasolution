import { writeFileSync } from "node:fs";
const BASE = process.argv[2], TAG = process.argv[3];
const CDP = 9477, sleep = ms => new Promise(r => setTimeout(r, ms));
const list = await (await fetch(`http://127.0.0.1:${CDP}/json/list`)).json();
const ws = new WebSocket(list.find(t => t.type === "page").webSocketDebuggerUrl);
await new Promise(r => ws.addEventListener("open", r));
let id = 0; const pend = new Map();
ws.addEventListener("message", e => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } });
const send = (m, p = {}) => new Promise(r => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method: m, params: p })); });
const ev = async x => {
  const r = await send("Runtime.evaluate", { expression: x, returnByValue: true, awaitPromise: true });
  if (r.result?.exceptionDetails) return { __error: (r.result.exceptionDetails.exception?.description || "").slice(0, 300) };
  return r.result?.result?.value;
};
await send("Page.enable");
const phone = () => send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
const go = async (u, ms = 5200) => { await send("Page.navigate", { url: u }); await sleep(ms); };
const wake = () => ev(`(async()=>{var y=0,steps=0;while(y<document.documentElement.scrollHeight){scrollTo({top:y,behavior:"instant"});await new Promise(r=>setTimeout(r,120));y+=600;steps++;if(steps>300)break;}scrollTo({top:0,behavior:"instant"});await new Promise(r=>setTimeout(r,400));return document.documentElement.scrollHeight})()`);
const R = { tag: TAG };
R.build = await (await fetch(`${BASE}/api/build`)).json();

// --- 3D: which step is active on slow scroll, and do the tabs switch it? ---
await phone(); await go(`${BASE}/es?view=target`);
R.model3d = await ev(`(async()=>{
  const findActive=()=>{
    const btns=[...document.querySelectorAll("[data-m3d-step-button]")];
    const on=btns.find(b=>b.getAttribute("aria-current")||b.className.includes("is-on")||b.className.includes("is-active")||b.getAttribute("aria-selected")==="true");
    const stage=document.querySelector("[data-model3d-stage]");
    const img=stage?[...stage.querySelectorAll("img,video")].map(e=>(e.currentSrc||e.src||"").split("/").pop()).filter(Boolean):[];
    return {activeKey:on?on.getAttribute("data-m3d-step-button"):null,
      activeLabel:on?(on.textContent||"").trim().slice(0,30):null,
      activeIndex:on?btns.indexOf(on):-1, media:img.slice(0,3),
      stepAttr:document.querySelector("[data-m3d-step]")?.getAttribute("data-m3d-step")||null,
      classes:btns.map(b=>(b.className||"").toString().split(" ").filter(c=>c.includes("is-")).join("+"))};
  };
  const step=Math.round(innerHeight*0.2);
  let seen=null;
  for(let y=0;y<document.documentElement.scrollHeight;y+=step){
    scrollTo({top:y,behavior:"instant"}); await new Promise(r=>setTimeout(r,200));
    const s=document.querySelector("[data-model3d-stage]");
    if(s){const r=s.getBoundingClientRect(); if(r.top<innerHeight*0.6&&r.bottom>innerHeight*0.2){ await new Promise(r=>setTimeout(r,1400)); seen=findActive(); break;}}
  }
  const after=[];
  const btns=[...document.querySelectorAll("[data-m3d-step-button]")];
  for(let i=0;i<btns.length;i++){
    btns[i].scrollIntoView({block:"center",behavior:"instant"}); await new Promise(r=>setTimeout(r,300));
    btns[i].click(); await new Promise(r=>setTimeout(r,1700));
    const a=findActive();
    after.push({clicked:i, clickedKey:btns[i].getAttribute("data-m3d-step-button"), label:(btns[i].textContent||"").trim().slice(0,26), nowActive:a.activeKey, nowIndex:a.activeIndex, media:a.media});
  }
  return {onScroll:seen, buttons:btns.length, after};})()`);

// --- the form on /contact, both paths ---
await go(`${BASE}/es/contact?view=target`); await wake();
R.form = await ev(`(()=>{
  const f=document.querySelector("form");
  const box=e=>{if(!e)return null;const r=e.getBoundingClientRect();const cs=getComputedStyle(e);
    return {text:(e.textContent||"").trim().replace(/[ ]+/g," ").slice(0,44),w:Math.round(r.width),h:Math.round(r.height),
      fontSize:parseFloat(cs.fontSize),fontWeight:cs.fontWeight,bg:cs.backgroundColor,area:Math.round(r.width*r.height),tag:e.tagName};};
  const all=[...document.querySelectorAll("a,button,label,input,select,textarea")];
  const byText=re=>all.find(e=>re.test((e.textContent||"")+" "+(e.value||"")));
  const out={formFound:!!f};
  if(f){
    const fields=[...f.querySelectorAll("input,select,textarea")].filter(e=>e.type!=="hidden");
    const req=fields.filter(e=>e.required||e.getAttribute("aria-required")==="true");
    out.fields=fields.map(e=>({name:e.name||e.id||"",type:e.type||e.tagName,required:!!(e.required||e.getAttribute("aria-required")==="true")}));
    out.requiredCount=req.length;
    out.submit=box(f.querySelector('button[type="submit"],input[type="submit"]'));
  }
  out.pilotCta=box(all.find(e=>/Solicita tu piloto gratuito/.test(e.textContent||"")));
  out.contratar=box(byText(/Contratar directamente|Contratar un plan/));
  out.radios=[...document.querySelectorAll('input[type="radio"]')].map(e=>({name:e.name,value:e.value,checked:e.checked,label:(e.closest("label")?.textContent||"").trim().slice(0,40)}));
  return out;})()`);

// --- scroll depth in BOTH views, phone and desktop, stated conditions ---
R.depth = {};
for (const [w, h, label] of [[390, 844, "phone390x844"], [1440, 900, "desktop1440x900"]]) {
  const mob = w < 500;
  for (const view of ["target", "public"]) {
    await send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: mob ? 2 : 1, mobile: mob });
    await go(`${BASE}/es?view=${view}`); await wake();
    R.depth[`${label}_${view}`] = await ev(`({doc:document.documentElement.scrollHeight,vh:innerHeight,screens:Math.round(document.documentElement.scrollHeight/innerHeight*10)/10})`);
  }
}
writeFileSync(`six2-${TAG}.json`, JSON.stringify(R, null, 2));
console.log("3D onScroll:", JSON.stringify(R.model3d.onScroll));
console.log("3D after clicks:", JSON.stringify(R.model3d.after));
console.log("form:", JSON.stringify(R.form).slice(0, 1200));
console.log("depth:", JSON.stringify(R.depth));
process.exit(0);
