// The owner's points 1-4 and 6 (depth), measured in the browser.
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
const shot = async n => { const r = await send("Page.captureScreenshot", { format: "png" }); const d = r.result?.result?.data || r.result?.data; if (d) writeFileSync(`p6-${TAG}-${n}.png`, Buffer.from(d, "base64")); };
const metrics = (w, h) => send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: w < 500 ? 2 : 1, mobile: w < 500 });
const nav = async (u, ms = 5200) => { await send("Page.navigate", { url: u }); await sleep(ms); };
const wake = () => ev(`(async()=>{const st=Math.round(innerHeight*0.8),h=document.documentElement.scrollHeight;
 for(let y=0;y<h;y+=st){scrollTo({top:y,behavior:"instant"});await new Promise(r=>setTimeout(r,200));}
 scrollTo({top:0,behavior:"instant"});await new Promise(r=>setTimeout(r,400));return h})()`);
const R = { tag: TAG, build: await (await fetch(`${BASE}/api/build`)).json(), p1: {}, p2: null, p3: {}, p4: {}, p6depth: {} };

// ---------- 1 Ver ----------
for (const [w, h, lab] of [[390, 844, "390"], [1440, 900, "1440"]]) {
  R.p1[lab] = [];
  for (const want of ["Ver Atiende", "Ver Organiza", "Ver Crece"]) {
    await metrics(w, h); await nav(`${BASE}/es?view=target`); await wake();
    const out = await ev(`(async function(){
      var all=[].slice.call(document.querySelectorAll("button,a"));
      var b=null; for(var i=0;i<all.length;i++){ if((all[i].textContent||"").trim()===${JSON.stringify(want)}){b=all[i];break;} }
      if(!b) return {missing:true};
      b.scrollIntoView({block:"center",behavior:"instant"}); await new Promise(r=>setTimeout(r,700));
      var card=b.closest("article")||b.closest("[class*=ch-card]")||b.parentElement;
      var cr0=card.getBoundingClientRect(); var sy0=Math.round(scrollY);
      var ctrl=b.getAttribute("aria-controls");
      b.click(); await new Promise(r=>setTimeout(r,1600));
      var sy1=Math.round(scrollY);
      var t=ctrl?document.getElementById(ctrl):null;
      if(!t||t.getBoundingClientRect().height<20) t=card.querySelector("[class*=detail],[class*=ch-detail]");
      if(!t) return {noContent:true,ctrl:ctrl};
      var tr=t.getBoundingClientRect(); var cr=card.getBoundingClientRect();
      var vis=Math.max(0,Math.round(Math.min(innerHeight,tr.bottom)-Math.max(0,tr.top)));
      // a loose block under the card row?
      var row=card.parentElement; var rr=row.getBoundingClientRect();
      var after=[]; var n=row.nextElementSibling;
      for(var k=0;k<2&&n;k++){var nr=n.getBoundingClientRect();
        if(nr.height>24&&(n.textContent||"").trim().length>30) after.push({tag:n.tagName,cls:(n.className||"").toString().slice(0,26),h:Math.round(nr.height)});
        n=n.nextElementSibling;}
      return {insideCard: t.closest("article")===card.closest("article")||card.contains(t),
        leftOk: Math.round(tr.left-cr.left)>=-1, rightOk: Math.round(cr.right-tr.right)>=-1,
        dLeft:Math.round(tr.left-cr.left), dRight:Math.round(cr.right-tr.right),
        contentTop:Math.round(tr.top), contentH:Math.round(tr.height), visiblePx:vis,
        pageScrolledItself: sy1-sy0, cardHeight:Math.round(cr.height),
        looseBlocksUnderRow: after};})()`);
    R.p1[lab].push({ button: want, ...out });
  }
  await shot(`ver-${lab}`);
}

// ---------- 2 no swipe rows at 390 ----------
await metrics(390, 844); await nav(`${BASE}/es?view=target`); await wake();
R.p2 = await ev(`(function(){
  var names={extra:".ch-extra", plans:"[class*=plans-cards],[class*=plans-table]", trust:"[class*=trust]", rep:"[class*=rep-]"};
  var out={};
  for (var k in names){
    var els=[].slice.call(document.querySelectorAll(names[k])).filter(function(e){return e.getClientRects().length>0;});
    out[k]=els.slice(0,4).map(function(e){var cs=getComputedStyle(e);
      return {cls:(e.className||"").toString().slice(0,34),scrollW:e.scrollWidth,clientW:e.clientWidth,
        over:cs.overflowX, scrollable: e.scrollWidth>e.clientWidth+1,
        stickyKids: [].slice.call(e.children).filter(function(c){return getComputedStyle(c).position==="sticky";}).length};});
  }
  var anyScroll=[].slice.call(document.querySelectorAll("*")).filter(function(e){
    var cs=getComputedStyle(e); return (cs.overflowX==="auto"||cs.overflowX==="scroll")&&e.scrollWidth>e.clientWidth+1&&e.getClientRects().length>0;})
    .map(function(e){return (e.tagName+"."+(e.className||"").toString().split(" ")[0]).slice(0,40);});
  return {blocks:out, anyHorizontallyScrollable:anyScroll};})()`);

// ---------- 3 plan buttons ----------
for (const [w, h, lab] of [[390, 844, "390"], [1440, 900, "1440"]]) {
  await metrics(w, h); await nav(`${BASE}/es?view=target`); await wake();
  R.p3[lab] = await ev(`(function(){
    var head=[].slice.call(document.querySelectorAll("header a,header button")).filter(function(e){return /piloto|pilot/i.test(e.textContent||"")&&e.getClientRects().length>0;})[0];
    var hr=head?head.getBoundingClientRect():null;
    var box=function(e){var r=e.getBoundingClientRect();var cs=getComputedStyle(e);
      return {text:(e.textContent||"").trim().slice(0,36),w:Math.round(r.width),h:Math.round(r.height),
        top:Math.round(r.top+scrollY),fs:parseFloat(cs.fontSize),lh:parseFloat(cs.lineHeight)||0,
        bg:cs.backgroundColor,border:cs.borderTopWidth+" "+cs.borderTopColor,
        oneLine:(e.scrollWidth<=e.clientWidth+1), href:e.getAttribute("href")||null};};
    var pilots=[].slice.call(document.querySelectorAll("a,button")).filter(function(e){
      return /Empieza 14 d|Start 14 days|piloto gratuito|free pilot/i.test(e.textContent||"")&&e.getClientRects().length>0&&e.getBoundingClientRect().width>60&&!e.closest("header");});
    var directs=[].slice.call(document.querySelectorAll("[data-plan-direct]")).filter(function(e){return e.getClientRects().length>0;});
    return {headerButton: head?box(head):null, headerH: hr?Math.round(hr.height):null,
      pilots:pilots.map(box), directs:directs.map(function(e){var o=box(e);o.key=e.getAttribute("data-plan-direct");return o;})};})()`);
}

// ---------- 4 colours ----------
await metrics(1440, 900); await nav(`${BASE}/es?view=target`); await wake();
R.p4 = await ev(`(function(){
  var toHsl=function(r,g,b){r/=255;g/=255;b/=255;var mx=Math.max(r,g,b),mn=Math.min(r,g,b),d=mx-mn,h=0,s=0,l=(mx+mn)/2;
    if(d){s=l>0.5?d/(2-mx-mn):d/(mx+mn);
      if(mx===r)h=((g-b)/d+(g<b?6:0));else if(mx===g)h=((b-r)/d+2);else h=((r-g)/d+4);h*=60;}
    return [Math.round(h),Math.round(s*100),Math.round(l*100)];};
  var parse=function(v){var m=/rgba?\\((\\d+),\\s*(\\d+),\\s*(\\d+)(?:,\\s*([\\d.]+))?\\)/.exec(v||"");
    if(!m)return null; if(m[4]!==undefined&&parseFloat(m[4])<0.08) return null;
    return toHsl(+m[1],+m[2],+m[3]);};
  var furniture=function(e){return !!(e.closest("[data-env]")||e.closest("[data-preview-switches]")||e.closest("[data-env-marker]"));};
  var hits=[], seen={};
  var els=document.querySelectorAll("*");
  for (var i=0;i<els.length;i++){ var e=els[i];
    if(e.getClientRects().length===0) continue; if(furniture(e)) continue;
    var cs=getComputedStyle(e);
    var vals=[["color",cs.color],["background",cs.backgroundColor],["border",cs.borderTopColor],["fill",cs.fill],["stroke",cs.stroke]];
    var bi=cs.backgroundImage; if(bi&&bi!=="none"){ var mm=bi.match(/rgba?\\([^)]+\\)/g)||[]; for(var q=0;q<mm.length;q++) vals.push(["gradient",mm[q]]); }
    for (var j=0;j<vals.length;j++){ var hsl=parse(vals[j][1]); if(!hsl) continue;
      if(hsl[0]>=15&&hsl[0]<=45&&hsl[1]>=15){
        var key=vals[j][1]+"|"+vals[j][0];
        if(seen[key]) { seen[key].count++; continue; }
        seen[key]={count:1};
        hits.push({prop:vals[j][0],value:vals[j][1],hsl:hsl,
          kind: hsl[2]>=15&&hsl[2]<=55?"braun":"sandfarben",
          where:(e.tagName+"."+(e.className||"").toString().split(" ").slice(0,2).join(".")).slice(0,46),
          text:(e.textContent||"").trim().slice(0,34)});}}}
  for (var k=0;k<hits.length;k++){ hits[k].count=seen[hits[k].value+"|"+hits[k].prop].count; }
  var vars={};
  var rs=getComputedStyle(document.documentElement);
  ["--signal-attention","--brand","--brand-ink","--accent","--accent-wash"].forEach(function(v){vars[v]=rs.getPropertyValue(v).trim();});
  return {hits:hits, brown:hits.filter(function(h){return h.kind==="braun";}).length,
    sand:hits.filter(function(h){return h.kind==="sandfarben";}).length, vars:vars};})()`);

// ---------- 6 depth ----------
for (const [w, h, lab] of [[390, 844, "phone390x844"], [1440, 900, "desktop1440x900"]]) {
  for (const view of ["target", "public"]) {
    await metrics(w, h); await nav(`${BASE}/es?view=${view}`); await wake();
    R.p6depth[`${lab}_${view}`] = await ev(`({doc:document.documentElement.scrollHeight,vh:innerHeight,screens:Math.round(document.documentElement.scrollHeight/innerHeight*10)/10})`);
  }
}
writeFileSync(`p1234-${TAG}.json`, JSON.stringify(R, null, 1));
console.log("build", R.build.commit.slice(0, 7), R.build.deployment);
for (const [k, arr] of Object.entries(R.p1)) for (const o of arr) console.log("1", k, o.button, "inside", o.insideCard, "dL", o.dLeft, "dR", o.dRight, "visible", o.visiblePx, "selfScroll", o.pageScrolledItself, "loose", (o.looseBlocksUnderRow || []).length);
console.log("2 anyHorizScroll:", JSON.stringify(R.p2.anyHorizontallyScrollable));
console.log("4 brown:", R.p4.brown, "sand:", R.p4.sand, "vars:", JSON.stringify(R.p4.vars));
console.log("6 depth:", JSON.stringify(R.p6depth));
process.exit(0);
