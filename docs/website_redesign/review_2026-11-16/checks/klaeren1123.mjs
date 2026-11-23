// Four ambiguities the recon raised, each resolved by measurement, not by assumption:
//  A) two "Prueba Essential gratis" 68 px apart in the hero - duplicate, or one of them fixed/sticky?
//  B) the "Solo en la vista previa" toggle sits in the FIRST SCREEN of the page the owner grades.
//  C) buttons of real size with EMPTY innerText - content-visibility (my known trap) or no name?
//  D) the fixed bottom bar: the owner's brief measured 299 px of 812 at 375. Still?
const BASE = process.argv[2];
const ROUTE = process.argv[3] || "/es";
const W = Number(process.argv[4] || 390), H = Number(process.argv[5] || 844);
const CDP = 9477, sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const list = await (await fetch(`http://127.0.0.1:${CDP}/json/list`)).json();
const ws = new WebSocket(list.find((t) => t.type === "page").webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener("open", r));
let id = 0; const pend = new Map();
ws.addEventListener("message", (e) => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } });
const send = (m, p = {}) => new Promise((r) => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method: m, params: p })); });
const ev = async (x) => {
  const r = await send("Runtime.evaluate", { expression: x, returnByValue: true, awaitPromise: true });
  if (r.result?.exceptionDetails) return { __error: (r.result.exceptionDetails.exception?.description || "").slice(0, 300) };
  return r.result?.result?.value;
};
await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride", { width: W, height: H, deviceScaleFactor: 2, mobile: true });
await send("Page.navigate", { url: BASE + ROUTE });
await sleep(6000);

const PROBE = `(async()=>{
  const out={};
  const name=(e)=>{ // textContent, NOT innerText: innerText is empty for an unpainted content-visibility subtree
    const t=(e.getAttribute("aria-label")||e.textContent||e.value||"").replace(/[\\s\\u00a0]+/g," ").trim();
    return t.slice(0,90); };
  const box=(e)=>{const r=e.getBoundingClientRect();return{w:Math.round(r.width*10)/10,h:Math.round(r.height*10)/10,top:Math.round(r.top),vy:Math.round(r.top)};};

  // --- D) fixed / sticky elements measured in the FIRST screen, before any scroll
  scrollTo({top:0,behavior:"instant"}); await new Promise(r=>setTimeout(r,400));
  const fixed=[];
  for(const e of document.querySelectorAll("body *")){
    const cs=getComputedStyle(e); if(cs.position!=="fixed"&&cs.position!=="sticky") continue;
    const r=e.getBoundingClientRect(); if(r.width<40||r.height<16) continue;
    if(cs.display==="none"||cs.visibility==="hidden"||cs.opacity==="0") continue;
    fixed.push({pos:cs.position,tag:e.tagName.toLowerCase(),name:name(e).slice(0,60),
      w:Math.round(r.width),h:Math.round(r.height),top:Math.round(r.top),bottom:Math.round(innerHeight-r.bottom),
      z:cs.zIndex, cls:(typeof e.className==="string"?e.className.slice(0,60):"")});
  }
  out.fixed=fixed; out.vh=innerHeight; out.vw=innerWidth;
  // how much of the first screen is covered by fixed chrome
  let covered=0; const bands=[];
  for(const f of fixed){ if(f.top<innerHeight && f.top+f.h>0) bands.push([Math.max(0,f.top),Math.min(innerHeight,f.top+f.h)]); }
  bands.sort((a,b)=>a[0]-b[0]); let cur=null;
  for(const b of bands){ if(!cur||b[0]>cur[1]){ if(cur)covered+=cur[1]-cur[0]; cur=[...b]; } else cur[1]=Math.max(cur[1],b[1]); }
  if(cur)covered+=cur[1]-cur[0];
  out.firstScreenCoveredPx=covered; out.firstScreenCoveredPct=Math.round(covered/innerHeight*1000)/10;

  // --- A) every element whose accessible name contains the free-trial wording
  const trial=[];
  for(const e of document.querySelectorAll("a,button,[role='button']")){
    const n=name(e); if(!/Essential gratis|Essential free|free Essential/i.test(n)) continue;
    const r=e.getBoundingClientRect(); const cs=getComputedStyle(e);
    trial.push({tag:e.tagName.toLowerCase(),name:n,href:(e.getAttribute("href")||""),pageY:Math.round(r.top+scrollY),
      w:Math.round(r.width),h:Math.round(r.height),pos:cs.position,
      data:Object.fromEntries([...e.attributes].filter(a=>a.name.startsWith("data-")).map(a=>[a.name,a.value])),
      visible: !(cs.display==="none"||cs.visibility==="hidden"||cs.opacity==="0"||(r.width===0&&r.height===0)),
      ancestorHiddenAt:(()=>{let p=e.parentElement,d=0;while(p&&d<14){const c=getComputedStyle(p);
        if(c.display==="none"||c.visibility==="hidden") return p.tagName.toLowerCase()+"."+(typeof p.className==="string"?p.className.slice(0,30):"");
        p=p.parentElement;d++;}return null;})()});
  }
  out.trialCtas=trial;

  // --- B) the preview-only control
  const pv=[...document.querySelectorAll("[data-pv-toggle],[data-preview-only]")].map(e=>{
    const r=e.getBoundingClientRect(); return {name:name(e),w:Math.round(r.width),h:Math.round(r.height),
      pageY:Math.round(r.top+scrollY), inFirstScreen: r.top+scrollY < innerHeight,
      outer:(e.outerHTML||"").slice(0,200)};});
  out.previewOnly=pv;
  // does the hero's own h1 get pushed down by it?
  const h1=document.querySelector("h1"); out.h1=h1?{...box(h1),text:name(h1)}:null;

  // --- C) real size but no innerText: traverse everything first, then compare the two reads
  var y=0,s=0; while(y<document.documentElement.scrollHeight){scrollTo({top:y,behavior:"instant"});await new Promise(r=>setTimeout(r,80));y+=600;s++;if(s>400)break;}
  await new Promise(r=>setTimeout(r,300));
  const nameless=[];
  for(const e of document.querySelectorAll("a,button,[role='button']")){
    const r=e.getBoundingClientRect(); if(r.width<10||r.height<10) continue;
    const it=((e.innerText||"").replace(/\\s+/g," ")).trim();
    const tc=((e.textContent||"").replace(/\\s+/g," ")).trim();
    const al=(e.getAttribute("aria-label")||"").trim();
    if(it==="" ) nameless.push({tag:e.tagName.toLowerCase(),innerText:it,textContent:tc.slice(0,70),ariaLabel:al.slice(0,50),
      w:Math.round(r.width),h:Math.round(r.height),pageY:Math.round(r.top+scrollY),
      cvis:(()=>{let p=e;let d=0;while(p&&d<10){const c=getComputedStyle(p);if(c.contentVisibility&&c.contentVisibility!=="visible")return p.tagName.toLowerCase()+":"+c.contentVisibility;p=p.parentElement;d++;}return null;})()});
  }
  out.namelessByInnerText=nameless;

  // --- touch targets under 44 px among things a visitor taps, after full traversal
  const small=[];
  for(const e of document.querySelectorAll("a,button,[role='button'],input,select,textarea,summary")){
    const r=e.getBoundingClientRect(); const cs=getComputedStyle(e);
    if(cs.display==="none"||cs.visibility==="hidden"||(r.width===0&&r.height===0)) continue;
    if(r.height>=44&&r.width>=44) continue;
    small.push({tag:e.tagName.toLowerCase(),name:name(e).slice(0,52),w:Math.round(r.width*10)/10,h:Math.round(r.height*10)/10,
      pageY:Math.round(r.top+scrollY),
      previewOnly: !!e.closest("[data-pv-toggle],[data-preview-only],[data-preview-panel]")});
  }
  out.underTap=small;
  out.depth=document.documentElement.scrollHeight;
  return out;})()`;

const o = await ev(PROBE);
if (o?.__error) { console.log("ERROR " + o.__error); process.exit(1); }
console.log(`\n=== ${ROUTE} @ ${W}x${H}   depth=${o.depth}  viewport=${o.vw}x${o.vh}`);
console.log(`\n[D] fixed/sticky chrome in the first screen: ${o.firstScreenCoveredPx} px of ${o.vh} = ${o.firstScreenCoveredPct} %`);
for (const f of o.fixed) console.log(`    ${f.pos.padEnd(7)} ${String(f.w)}x${String(f.h)} top=${String(f.top).padStart(5)} bottomGap=${String(f.bottom).padStart(5)} z=${f.z} ${JSON.stringify(f.name)}`);
console.log(`\n[A] free-trial calls to action: ${o.trialCtas.length}`);
for (const t of o.trialCtas) console.log(`    y=${String(t.pageY).padStart(5)} ${t.w}x${t.h} ${t.pos.padEnd(8)} vis=${t.visible} hiddenAnc=${t.ancestorHiddenAt || "-"} ${JSON.stringify(t.name.slice(0, 40))} -> ${t.href}\n          ${JSON.stringify(t.data)}`);
console.log(`\n[B] preview-only controls: ${o.previewOnly.length}`);
for (const p of o.previewOnly) console.log(`    y=${p.pageY} ${p.w}x${p.h} firstScreen=${p.inFirstScreen} ${JSON.stringify(p.name)}\n        ${p.outer.replace(/\s+/g, " ").slice(0, 170)}`);
console.log(`    h1: ${o.h1 ? `${o.h1.w}x${o.h1.h} at viewport y=${o.h1.vy} ${JSON.stringify(o.h1.text.slice(0, 60))}` : "NONE"}`);
console.log(`\n[C] interactive elements with EMPTY innerText: ${o.namelessByInnerText.length}`);
for (const n of o.namelessByInnerText) console.log(`    y=${String(n.pageY).padStart(5)} ${n.w}x${n.h} cvis=${n.cvis || "-"} textContent=${JSON.stringify(n.textContent.slice(0, 55))} aria=${JSON.stringify(n.ariaLabel)}`);
console.log(`\n[tap] under 44 px: ${o.underTap.length} (previewOnly marked)`);
for (const s of o.underTap) console.log(`    y=${String(s.pageY).padStart(5)} ${s.w}x${s.h} ${s.previewOnly ? "[PREVIEW-ONLY] " : ""}${JSON.stringify(s.name)}`);
process.exit(0);
