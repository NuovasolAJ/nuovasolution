// Owner's six additional checks of 16.11., measured on the phone (390) unless stated.
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
  const ex = r.result?.exceptionDetails;
  if (ex) return { __error: (ex.exception?.description || ex.text || "").slice(0, 300) };
  return r.result?.result?.value;
};
await send("Page.enable");
const shot = async n => { const r = await send("Page.captureScreenshot", { format: "png" }); const d = r.result?.result?.data || r.result?.data; if (d) writeFileSync(`six-${TAG}-${n}.png`, Buffer.from(d, "base64")); };
const phone = () => send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
const desk = () => send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
const go = async (u, ms = 5200) => { await send("Page.navigate", { url: u }); await sleep(ms); };
const wake = () => ev(`(async()=>{var y=0,steps=0;while(y<document.documentElement.scrollHeight){scrollTo({top:y,behavior:"instant"});await new Promise(r=>setTimeout(r,120));y+=600;steps++;if(steps>300)break;}scrollTo({top:0,behavior:"instant"});await new Promise(r=>setTimeout(r,400));return document.documentElement.scrollHeight})()`);
const R = { tag: TAG, base: BASE };
R.build = await (await fetch(`${BASE}/api/build`)).json();

// ---- 1 "Ver Atiende / Organiza / Crece": where does the content open? ----
await phone(); await go(`${BASE}/es?view=target`); await wake();
R.verButtons = await ev(`(async()=>{
  const out=[];
  const WANT=["Ver Atiende","Ver Organiza","Ver Crece"];
  const btns=[...document.querySelectorAll("button,a")].filter(e=>WANT.includes((e.textContent||"").trim())&&e.getBoundingClientRect().width>10);
  for(const b of btns){
    b.scrollIntoView({block:"center",behavior:"instant"}); await new Promise(r=>setTimeout(r,500));
    const before=b.getBoundingClientRect();
    const absBtnBottom=before.bottom+scrollY;
    const ctrl=b.getAttribute("aria-controls");
    const beforeH=document.documentElement.scrollHeight;
    b.click(); await new Promise(r=>setTimeout(r,1400));
    let target=ctrl?document.getElementById(ctrl):null;
    if(!target){
      // the first element below the button that was not there / is now visible and tall
      const cands=[...document.querySelectorAll("section,div[role=region],[data-fn-copy-pane],[id]")]
        .map(e=>({e,r:e.getBoundingClientRect()}))
        .filter(o=>o.r.height>120&&o.r.top+scrollY>absBtnBottom-4)
        .sort((a,b)=>(a.r.top+scrollY)-(b.r.top+scrollY));
      target=cands[0]?.e||null;
    }
    const tr=target?target.getBoundingClientRect():null;
    out.push({label:(b.textContent||"").trim().slice(0,40),
      btnAbsBottom:Math.round(absBtnBottom),
      ariaControls:ctrl||null, ariaExpanded:b.getAttribute("aria-expanded"),
      contentAbsTop: tr?Math.round(tr.top+scrollY):null,
      gapPx: tr?Math.round(tr.top+scrollY-absBtnBottom):null,
      gapScreens: tr?Math.round((tr.top+scrollY-absBtnBottom)/innerHeight*100)/100:null,
      docGrewPx: document.documentElement.scrollHeight-beforeH,
      contentTag: target?target.tagName+"."+(target.className||"").toString().split(" ")[0]:null});
  }
  return {count:btns.length,out};})()`);

// ---- 2 scroll depth ----
await go(`${BASE}/es?view=target`); await wake();
R.depthPhone = await ev(`({doc:document.documentElement.scrollHeight, vh:innerHeight, screens:Math.round(document.documentElement.scrollHeight/innerHeight*10)/10})`);
await desk(); await go(`${BASE}/es?view=target`); await wake();
R.depthDesktop = await ev(`({doc:document.documentElement.scrollHeight, vh:innerHeight, screens:Math.round(document.documentElement.scrollHeight/innerHeight*10)/10})`);

// ---- 3 fonts ----
R.fonts = await ev(`(()=>{const o={};const seen=[];
  for(const e of document.querySelectorAll("h1,h2,h3,.t-display-xl,.t-display-l,.t-display-m,.hf-h1,.fn-h2,.fn-title,.closing-h2")){
    const f=getComputedStyle(e).fontFamily.split(",")[0].replace(/["']/g,"");
    o[f]=(o[f]||0)+1;
    if(seen.length<8) seen.push({tag:e.tagName,cls:(e.className||"").toString().split(" ")[0],font:f,text:(e.textContent||"").trim().slice(0,32)});
  }
  return {families:o, sample:seen, htmlDisplayAttr:document.documentElement.getAttribute("data-display")||null,
    rootHas:!!document.querySelector('[data-display="fraunces"]')};})()`);

// ---- 4 the 3D step on slow scrolling + tabs clickable ----
await phone(); await go(`${BASE}/es?view=target`);
R.model3d = await ev(`(async()=>{
  const stage=()=>document.querySelector("[data-model3d-stage]");
  // slow scroll until the stage is on screen
  const step=Math.round(innerHeight*0.25);
  for(let y=0;y<document.documentElement.scrollHeight;y+=step){
    scrollTo({top:y,behavior:"instant"}); await new Promise(r=>setTimeout(r,180));
    const s=stage(); if(s){const r=s.getBoundingClientRect(); if(r.top<innerHeight*0.7&&r.bottom>0) break;}
  }
  await new Promise(r=>setTimeout(r,1500));
  const s=stage(); if(!s) return {stage:false};
  const first=s.getAttribute("data-model3d-stage");
  const btns=[...document.querySelectorAll("[data-m3d-step-button]")];
  const states=[];
  for(let i=0;i<btns.length;i++){
    btns[i].scrollIntoView({block:"center",behavior:"instant"}); await new Promise(r=>setTimeout(r,300));
    btns[i].click(); await new Promise(r=>setTimeout(r,1600));
    states.push({i, key:btns[i].getAttribute("data-m3d-step-button"), stageAfter:stage()?.getAttribute("data-model3d-stage"),
      label:(btns[i].textContent||"").trim().slice(0,28)});
  }
  return {stage:true, firstStageOnScroll:first, buttons:btns.length, states};})()`);

// ---- 5 the form and the two buttons ----
await go(`${BASE}/es/contact?view=target`); await wake();
R.form = await ev(`(()=>{
  const f=document.querySelector("form"); if(!f) return {form:false};
  const fields=[...f.querySelectorAll("input,select,textarea")].filter(e=>e.type!=="hidden");
  const req=fields.filter(e=>e.required||e.getAttribute("aria-required")==="true");
  const pilot=[...document.querySelectorAll("a,button")].find(e=>/piloto gratuito|free pilot/i.test(e.textContent||""));
  const direct=[...document.querySelectorAll("a,button")].find(e=>/contratar directamente|sign up directly|contract directly/i.test(e.textContent||""));
  const box=e=>{if(!e)return null;const r=e.getBoundingClientRect();const cs=getComputedStyle(e);
    return {text:(e.textContent||"").trim().slice(0,40),w:Math.round(r.width),h:Math.round(r.height),
      fontSize:parseFloat(cs.fontSize),fontWeight:cs.fontWeight,bg:cs.backgroundColor,area:Math.round(r.width*r.height)};};
  return {form:true, fields:fields.length, required:req.length,
    requiredNames:req.map(e=>e.name||e.id||e.type),
    pilot:box(pilot), direct:box(direct)};})()`);

// ---- 6 "Planes" twice, "Gratis" at Essential, in both views ----
R.labels = {};
for (const view of ["target", "public"]) {
  await go(`${BASE}/es?view=${view}`); await wake();
  R.labels[view] = await ev(`(()=>{
    const t=(document.body.textContent||"");
    const planes=[...document.querySelectorAll("h1,h2,h3,[class*=eyebrow],[class*=kicker]")]
      .map(e=>(e.textContent||"").trim()).filter(s=>/^planes$|^plans$/i.test(s));
    const essential=[...document.querySelectorAll("[data-plan-col],[class*=plan]")]
      .map(e=>(e.textContent||"").trim().replace(/\\s+/g," ")).filter(s=>/Essential/.test(s)).slice(0,3);
    return {planesHeadings:planes, planesCount:planes.length,
      gratisNearEssential: essential.filter(s=>/\\bGratis\\b|\\bFree\\b/.test(s)).slice(0,2),
      essentialSample: essential.map(s=>s.slice(0,110))};})()`);
}

writeFileSync(`six-${TAG}.json`, JSON.stringify(R, null, 1));
console.log("build", R.build.commit?.slice(0, 7));
console.log("1 Ver-buttons:", JSON.stringify(R.verButtons));
console.log("2 depth phone:", R.depthPhone.screens, "screens; desktop:", R.depthDesktop.screens);
console.log("3 fonts:", JSON.stringify(R.fonts.families));
console.log("4 3D:", JSON.stringify({ first: R.model3d.firstStageOnScroll, buttons: R.model3d.buttons, states: R.model3d.states?.map(s => [s.key, s.stageAfter]) }));
console.log("5 form:", JSON.stringify({ fields: R.form.fields, required: R.form.required, names: R.form.requiredNames, pilot: R.form.pilot?.area, direct: R.form.direct?.area }));
console.log("6 labels:", JSON.stringify(R.labels));
process.exit(0);
