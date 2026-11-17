// Points (7)-(15), the owner's additions, colours and depth — one pass.
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
  if (r.result?.exceptionDetails) return { __error: (r.result.exceptionDetails.exception?.description || "").slice(0, 240) };
  return r.result?.result?.value;
};
await send("Page.enable");
const shot = async n => { const r = await send("Page.captureScreenshot", { format: "png" }); const d = r.result?.result?.data || r.result?.data; if (d) writeFileSync(`shot-${TAG}-${n}.png`, Buffer.from(d, "base64")); };
const metrics = (w, h) => send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: w < 500 ? 2 : 1, mobile: w < 500 });
const nav = async (u, ms = 5200) => { await send("Page.navigate", { url: u }); await sleep(ms); };
const wake = () => ev(`(async()=>{const st=Math.round(innerHeight*0.8),h=document.documentElement.scrollHeight;
 for(let y=0;y<h;y+=st){scrollTo({top:y,behavior:"instant"});await new Promise(r=>setTimeout(r,200));}
 scrollTo({top:0,behavior:"instant"});await new Promise(r=>setTimeout(r,400));return h})()`);
const HIDE = `(function(){var px=0;["[data-env]","[data-preview-switches]","[data-env-marker]"].forEach(function(s){
  [].slice.call(document.querySelectorAll(s)).forEach(function(e){var r=e.getBoundingClientRect();
    if(getComputedStyle(e).position!=="fixed") px+=Math.round(r.height); e.style.display="none";});});
  return px;})()`;
const R = { tag: TAG, build: await (await fetch(`${BASE}/api/build`)).json() };

// ---------- depth, with and without the preview furniture ----------
R.depth = {};
for (const [w, h, lab] of [[390, 844, "390x844"], [1440, 900, "1440x900"]]) {
  await metrics(w, h); await nav(`${BASE}/es?view=target`); await wake();
  const withF = await ev(`({doc:document.documentElement.scrollHeight,vh:innerHeight})`);
  const furniture = await ev(HIDE); await sleep(600); await wake();
  const without = await ev(`({doc:document.documentElement.scrollHeight,vh:innerHeight})`);
  R.depth[lab] = {
    furniturePx: furniture,
    withFurniture: { ...withF, screens: Math.round(withF.doc / withF.vh * 10) / 10 },
    withoutFurniture: { ...without, screens: Math.round(without.doc / without.vh * 10) / 10 },
  };
  // per section, so a difference can be located
  R.depth[lab].sections = await ev(`[].slice.call(document.querySelectorAll("section,[id]")).filter(function(e){
      return e.getBoundingClientRect().height>200 && e.parentElement && e.parentElement.tagName!=="SECTION";})
    .slice(0,24).map(function(e){var r=e.getBoundingClientRect();
      return {id:e.id||((e.className||"").toString().split(" ")[0]),h:Math.round(r.height),screens:Math.round(r.height/innerHeight*100)/100};})`);
}

// ---------- colours: brown, blue, gold ----------
await metrics(1440, 900); await nav(`${BASE}/es?view=target`); await wake(); await ev(HIDE);
R.colours = await ev(`(function(){
  function toHsl(r,g,b){r/=255;g/=255;b/=255;var mx=Math.max(r,g,b),mn=Math.min(r,g,b),d=mx-mn,h=0,s=0,l=(mx+mn)/2;
    if(d){s=l>0.5?d/(2-mx-mn):d/(mx+mn);
      if(mx===r)h=((g-b)/d+(g<b?6:0));else if(mx===g)h=((b-r)/d+2);else h=((r-g)/d+4);h*=60;}
    return [Math.round(h),Math.round(s*100),Math.round(l*100)];}
  function parse(v){var m=/rgba?\\((\\d+),\\s*(\\d+),\\s*(\\d+)(?:,\\s*([\\d.]+))?\\)/.exec(v||"");
    if(!m)return null; if(m[4]!==undefined&&parseFloat(m[4])<0.08) return null;
    return toHsl(+m[1],+m[2],+m[3]);}
  var out={braun:[],blau:[],gold:[],paper:[]}, seen={};
  var els=document.querySelectorAll("*");
  for (var i=0;i<els.length;i++){var e=els[i];
    if(e.getClientRects().length===0) continue;
    var cs=getComputedStyle(e);
    var vals=[["color",cs.color],["background",cs.backgroundColor],["border",cs.borderTopColor],["fill",cs.fill],["stroke",cs.stroke]];
    var bi=cs.backgroundImage; if(bi&&bi!=="none"){var mm=bi.match(/rgba?\\([^)]+\\)/g)||[]; for(var q=0;q<mm.length;q++) vals.push(["gradient",mm[q]]);}
    for (var j=0;j<vals.length;j++){var hsl=parse(vals[j][1]); if(!hsl) continue;
      var bucket=null;
      if(hsl[0]>=15&&hsl[0]<=45&&hsl[1]>=15) bucket=(hsl[2]>=15&&hsl[2]<=55)?"braun":(hsl[1]>=25?"gold":"paper");
      else if(hsl[0]>=190&&hsl[0]<=260&&hsl[1]>=15) bucket="blau";
      if(!bucket) continue;
      if(bucket==="gold"&&hsl[2]>85) bucket="paper";
      var key=bucket+"|"+vals[j][1]+"|"+vals[j][0];
      if(seen[key]) continue; seen[key]=1;
      out[bucket].push({prop:vals[j][0],value:vals[j][1],hsl:hsl,
        where:(e.tagName+"."+(e.className||"").toString().split(" ").slice(0,2).join(".")).slice(0,44),
        text:(e.textContent||"").trim().slice(0,30)});}}
  var rs=getComputedStyle(document.documentElement);
  var vars={}; ["--brand","--brand-ink","--accent","--accent-wash","--signal-attention"].forEach(function(v){vars[v]=rs.getPropertyValue(v).trim();});
  return {counts:{braun:out.braun.length,blau:out.blau.length,gold:out.gold.length,paper:out.paper.length},hits:out,vars:vars};})()`);

// ---------- (7) open card takes the row ----------
await metrics(1440, 900); await nav(`${BASE}/es?view=target`); await wake();
R.p7 = await ev(`(async function(){
  var b=[].slice.call(document.querySelectorAll("button,a")).filter(function(e){return (e.textContent||"").trim()==="Ver Crece";})[0];
  if(!b) return {missing:true};
  b.scrollIntoView({block:"center",behavior:"instant"}); await new Promise(r=>setTimeout(r,600));
  b.click(); await new Promise(r=>setTimeout(r,1800));
  var card=b.closest("article")||b.closest("[class*=ch-card]");
  var row=card.parentElement;
  var cr=card.getBoundingClientRect(), rr=row.getBoundingClientRect();
  var sibs=[].slice.call(row.children).filter(function(e){return e!==card&&e.getBoundingClientRect().height>40;})
    .map(function(e){var r=e.getBoundingClientRect();return {top:Math.round(r.top),h:Math.round(r.height),w:Math.round(r.width)};});
  // columns inside the open card: children sharing a top edge
  var kids=[].slice.call(card.querySelectorAll("*")).filter(function(e){var r=e.getBoundingClientRect();
    return r.height>60&&r.width>120&&e.parentElement&&e.parentElement.closest("article")===card;});
  var tops={};
  kids.forEach(function(e){var r=e.getBoundingClientRect();var k=Math.round(r.top/8)*8;(tops[k]=tops[k]||[]).push(Math.round(r.left));});
  var cols=0; for (var k in tops){var uniq={};tops[k].forEach(function(x){uniq[x]=1;});var n=Object.keys(uniq).length; if(n>cols)cols=n;}
  return {cardW:Math.round(cr.width), rowW:Math.round(rr.width), fillsRow: Math.round(rr.width-cr.width)<=2,
    leftGap:Math.round(cr.left-rr.left), rightGap:Math.round(rr.right-cr.right),
    columnsInside:cols, siblings:sibs, siblingsAbove: sibs.every(function(s){return s.top<Math.round(cr.top);}),
    cardH:Math.round(cr.height)};})()`);
await shot("p7-1440");

// ---------- (8) comparison ----------
R.p8 = await ev(`(function(){
  var rows=[].slice.call(document.querySelectorAll("[class*=cmpb-row],[class*=cmp-row]")).filter(function(e){return e.getClientRects().length>0;});
  var opts=[].slice.call(document.querySelectorAll(".cmp-option")).map(function(e){var r=e.getBoundingClientRect();var cs=getComputedStyle(e);
    return {text:(e.textContent||"").trim().slice(0,24),h:Math.round(r.height),fw:cs.fontWeight,radius:cs.borderRadius,
      on:(e.getAttribute("aria-checked")==="true"||e.getAttribute("aria-selected")==="true"||(e.className||"").toString().indexOf("is-on")>=0)};});
  var vtext=[].slice.call(document.querySelectorAll(".cmpb-v-text")).map(function(e){var cs=getComputedStyle(e);
    return {text:(e.textContent||"").trim().slice(0,24),fs:parseFloat(cs.fontSize),oneLine:e.scrollWidth<=e.clientWidth+1,h:Math.round(e.getBoundingClientRect().height)};});
  var more=[].slice.call(document.querySelectorAll("button,a")).filter(function(e){return /Ver la semana completa|m[aá]s|menos/i.test((e.textContent||"").trim())&&e.getClientRects().length>0;})
    .map(function(e){return (e.textContent||"").trim().slice(0,30);});
  var plansCta=document.querySelector(".plans-cta");
  return {rowCount:rows.length, options:opts, vtext:vtext, moreButtons:more,
    plansCtaRadius: plansCta?getComputedStyle(plansCta).borderRadius:null};})()`);

// ---------- (9)(10) 3D ----------
R.p9 = await ev(`(async function(){
  var stage=document.querySelector("[data-model3d-stage]");
  if(!stage) return {missing:true};
  var sec=stage.closest("section")||stage.parentElement;
  sec.scrollIntoView({block:"start",behavior:"instant"}); await new Promise(r=>setTimeout(r,1200));
  var pinned=[]; var p=stage;
  while(p&&p!==document.body){var cs=getComputedStyle(p); if(cs.position==="sticky"||cs.position==="fixed") pinned.push((p.tagName+"."+(p.className||"").toString().split(" ")[0]).slice(0,34)); p=p.parentElement;}
  // empty bands inside the 3D section
  var rects=[];
  (function walk(e){for(var i=0;i<e.children.length;i++){var c=e.children[i];var r=c.getBoundingClientRect();var cs=getComputedStyle(c);
    var paints=(c.textContent||"").trim().length>0||c.tagName==="IMG"||c.tagName==="SVG"||c.tagName==="VIDEO"||cs.backgroundImage!=="none"||cs.backgroundColor!=="rgba(0, 0, 0, 0)";
    if(r.height>2&&paints&&c.children.length===0) rects.push({top:Math.round(r.top),bottom:Math.round(r.bottom)}); else walk(c);}})(sec);
  rects.sort(function(a,b){return a.top-b.top;});
  var merged=[]; rects.forEach(function(r){ if(merged.length&&r.top<=merged[merged.length-1].bottom+1) merged[merged.length-1].bottom=Math.max(merged[merged.length-1].bottom,r.bottom); else merged.push({top:r.top,bottom:r.bottom}); });
  var gaps=[]; for(var i=1;i<merged.length;i++){var g=merged[i].top-merged[i-1].bottom; if(g>0) gaps.push(g);}
  gaps.sort(function(a,b){return b-a;});
  var btns=[].slice.call(document.querySelectorAll("[data-m3d-step-button]"));
  var states=[];
  for (var i=0;i<btns.length;i++){ btns[i].click(); await new Promise(r=>setTimeout(r,1400));
    var on=btns.filter(function(e){return (e.className||"").toString().indexOf("is-on")>=0||e.getAttribute("aria-current");});
    var past=btns.filter(function(e){return (e.className||"").toString().indexOf("is-past")>=0;});
    var media=[].slice.call(stage.querySelectorAll("img,video")).map(function(e){return (e.currentSrc||e.src||"").split("/").pop();}).slice(0,2);
    states.push({clicked:i,on:on.length,past:past.length,media:media});}
  var bubbles={};
  [].slice.call(sec.querySelectorAll("[class*=bubble],[class*=chat]")).forEach(function(e){var bg=getComputedStyle(e).backgroundColor; if(bg!=="rgba(0, 0, 0, 0)") bubbles[bg]=(bubbles[bg]||0)+1;});
  return {pinnedAncestors:pinned, sectionH:Math.round(sec.getBoundingClientRect().height),
    largestGapPx:gaps[0]||0, top3Gaps:gaps.slice(0,3), buttons:btns.length, states:states, bubbleBackgrounds:bubbles};})()`);
await shot("p9-1440");

// ---------- (11) free way per plan, (12) como empezar ----------
for (const [w, h, lab] of [[390, 844, "390"], [1440, 900, "1440"]]) {
  await metrics(w, h); await nav(`${BASE}/es?view=target`); await wake();
  R[`p11_${lab}`] = await ev(`(function(){
    var free=[].slice.call(document.querySelectorAll("a,button")).filter(function(e){
      return /Empieza 14 d[ií]as gratis|Start 14 days free/i.test(e.textContent||"")&&e.getClientRects().length>0;})
      .map(function(e){var r=e.getBoundingClientRect();return {text:(e.textContent||"").trim().slice(0,30),href:e.getAttribute("href"),w:Math.round(r.width),h:Math.round(r.height),bg:getComputedStyle(e).backgroundColor};});
    var direct=[].slice.call(document.querySelectorAll("[data-plan-direct]")).filter(function(e){return e.getClientRects().length>0;})
      .map(function(e){var r=e.getBoundingClientRect();return {key:e.getAttribute("data-plan-direct"),text:(e.textContent||"").trim().slice(0,26),href:e.getAttribute("href"),w:Math.round(r.width),h:Math.round(r.height),bg:getComputedStyle(e).backgroundColor};});
    var t=(document.body.textContent||"");
    return {freeButtons:free, directs:direct,
      todosLosPlanes: t.indexOf("Todos los planes pueden empezar")>=0,
      cualquierPlan: t.indexOf("Cualquier plan puede empezar")>=0,
      precioRaw: t.indexOf("{precio}")>=0, enPreparacion: t.indexOf("En preparaci")>=0};})()`);
}
await metrics(1440, 900); await nav(`${BASE}/es?view=target`); await wake();
R.p12 = await ev(`(function(){
  var head=[].slice.call(document.querySelectorAll("h2,h3")).filter(function(e){return /C[oó]mo empezar/i.test(e.textContent||"");})[0];
  if(!head) return {missing:true};
  var sec=head.closest("section")||head.parentElement;
  var kids=[].slice.call(sec.querySelectorAll("*")).filter(function(e){var r=e.getBoundingClientRect();
    return r.height>80&&r.width>150&&e.children.length>0&&e.parentElement&&e.parentElement.closest("section")===sec;});
  var boxes=kids.slice(0,8).map(function(e){var r=e.getBoundingClientRect();
    return {cls:(e.className||"").toString().slice(0,26),x:Math.round(r.left),y:Math.round(r.top),w:Math.round(r.width),h:Math.round(r.height)};});
  var sr=sec.getBoundingClientRect();
  return {sectionW:Math.round(sr.width),sectionH:Math.round(sr.height),boxes:boxes};})()`);
await shot("p12-1440");

// ---------- (13)(14)(15) phone ----------
await metrics(390, 844); await nav(`${BASE}/es?view=target`); await wake();
R.p13_15 = await ev(`(async function(){
  var stage=document.querySelector("[data-model3d-stage]");
  var sec=stage?(stage.closest("section")||stage.parentElement):null;
  var marks=sec?[].slice.call(sec.querySelectorAll("*")).filter(function(e){
    return (e.textContent||"").trim()==="Casa de ejemplo ficticia"&&e.children.length===0;}).map(function(e){
    var cs=getComputedStyle(e);var bg=cs.backgroundColor;var m=/rgba?\\((\\d+),\\s*(\\d+),\\s*(\\d+)/.exec(bg);
    var light=m?Math.round((Math.max(+m[1],+m[2],+m[3])+Math.min(+m[1],+m[2],+m[3]))/2/255*100):null;
    return {bg:bg,lightness:light,cls:(e.className||"").toString().slice(0,24)};}):[];
  var play=[].slice.call(document.querySelectorAll("button,[role=button]")).filter(function(e){
    var t=(e.getAttribute("aria-label")||"")+(e.className||"").toString();
    return /play|reproduc/i.test(t)&&e.getClientRects().length>0;}).map(function(e){var r=e.getBoundingClientRect();
    return {w:Math.round(r.width),h:Math.round(r.height),label:(e.getAttribute("aria-label")||"").slice(0,24)};});
  var planCards=[].slice.call(document.querySelectorAll("[class*=plans-cards] > *")).filter(function(e){return e.getClientRects().length>0;})
    .map(function(e){var r=e.getBoundingClientRect();return {pos:getComputedStyle(e).position,top:Math.round(r.top+scrollY),h:Math.round(r.height),
      text:(e.textContent||"").trim().slice(0,16)};});
  var overlaps=[]; for(var i=1;i<planCards.length;i++){var ov=(planCards[i-1].top+planCards[i-1].h)-planCards[i].top; if(ov>0) overlaps.push(ov);}
  var sticky={trust:0,report:0,extra:0};
  [].slice.call(document.querySelectorAll("[class*=trust] > *")).forEach(function(e){if(getComputedStyle(e).position==="sticky")sticky.trust++;});
  [].slice.call(document.querySelectorAll("[class*=rep-] > *")).forEach(function(e){if(getComputedStyle(e).position==="sticky")sticky.report++;});
  [].slice.call(document.querySelectorAll(".ch-extra > *")).forEach(function(e){if(getComputedStyle(e).position==="sticky")sticky.extra++;});
  var mcta=document.querySelector(".mcta-main");
  var plansCta=document.querySelector(".plans-cta");
  return {exampleMarks:marks, playButtons:play, planCards:planCards, planCardOverlaps:overlaps, stickyElsewhere:sticky,
    mcta: mcta?{h:Math.round(mcta.getBoundingClientRect().height),radius:getComputedStyle(mcta).borderRadius}:null,
    plansCtaRadius: plansCta?getComputedStyle(plansCta).borderRadius:null};})()`);
await shot("p13-390");

writeFileSync(`p715-${TAG}.json`, JSON.stringify(R, null, 1));
console.log("build", R.build.commit.slice(0, 7));
console.log("depth", JSON.stringify(R.depth["390x844"] && { f: R.depth["390x844"].furniturePx, mit: R.depth["390x844"].withFurniture.screens, ohne: R.depth["390x844"].withoutFurniture.screens }), "| desktop", R.depth["1440x900"] && R.depth["1440x900"].withoutFurniture.screens);
console.log("colours", JSON.stringify(R.colours.counts), JSON.stringify(R.colours.vars));
console.log("7", JSON.stringify({ fillsRow: R.p7.fillsRow, cardW: R.p7.cardW, rowW: R.p7.rowW, cols: R.p7.columnsInside, above: R.p7.siblingsAbove }));
console.log("8", JSON.stringify({ rows: R.p8.rowCount, opts: R.p8.options, vtext: R.p8.vtext, more: R.p8.moreButtons }));
console.log("9", JSON.stringify({ pinned: R.p9.pinnedAncestors, gap: R.p9.largestGapPx, btns: R.p9.buttons, states: R.p9.states && R.p9.states.map(s => [s.on, s.past]) }));
console.log("11@390", JSON.stringify(R.p11_390));
console.log("11@1440", JSON.stringify(R.p11_1440));
console.log("13-15", JSON.stringify(R.p13_15));
process.exit(0);
