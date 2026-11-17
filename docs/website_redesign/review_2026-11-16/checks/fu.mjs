// Follow-ups: the two blues, the comparison rows and the small text, the 3D gap and "is-past",
// and the 3D play button at 390.
import { writeFileSync } from "node:fs";
const BASE = "https://nuovasolution-design-preview-git-we-eeb43f-nuovasolajs-projects.vercel.app";
const CDP = 9477, sleep = ms => new Promise(r => setTimeout(r, ms));
const list = await (await fetch(`http://127.0.0.1:${CDP}/json/list`)).json();
const ws = new WebSocket(list.find(t => t.type === "page").webSocketDebuggerUrl);
await new Promise(r => ws.addEventListener("open", r));
let id = 0; const pend = new Map();
ws.addEventListener("message", e => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } });
const send = (m, p = {}) => new Promise(r => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method: m, params: p })); });
const ev = async x => {
  const r = await send("Runtime.evaluate", { expression: x, returnByValue: true, awaitPromise: true });
  if (r.result?.exceptionDetails) return { __error: (r.result.exceptionDetails.exception?.description || "").slice(0, 200) };
  return r.result?.result?.value;
};
await send("Page.enable");
const metrics = (w, h) => send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: w < 500 ? 2 : 1, mobile: w < 500 });
const nav = async (u, ms = 5200) => { await send("Page.navigate", { url: u }); await sleep(ms); };
const wake = () => ev(`(async()=>{const st=Math.round(innerHeight*0.8),h=document.documentElement.scrollHeight;
 for(let y=0;y<h;y+=st){scrollTo({top:y,behavior:"instant"});await new Promise(r=>setTimeout(r,200));}
 scrollTo({top:0,behavior:"instant"});await new Promise(r=>setTimeout(r,400));return h})()`);
const R = { build: await (await fetch(`${BASE}/api/build`)).json() };

await metrics(1440, 900); await nav(`${BASE}/es?view=target`); await wake();

R.blues = await ev(`(function(){
  function toHsl(r,g,b){r/=255;g/=255;b/=255;var mx=Math.max(r,g,b),mn=Math.min(r,g,b),d=mx-mn,h=0,s=0,l=(mx+mn)/2;
    if(d){s=l>0.5?d/(2-mx-mn):d/(mx+mn);
      if(mx===r)h=((g-b)/d+(g<b?6:0));else if(mx===g)h=((b-r)/d+2);else h=((r-g)/d+4);h*=60;}
    return [Math.round(h),Math.round(s*100),Math.round(l*100)];}
  function parse(v){var m=/rgba?\\((\\d+),\\s*(\\d+),\\s*(\\d+)(?:,\\s*([\\d.]+))?\\)/.exec(v||"");
    if(!m)return null; if(m[4]!==undefined&&parseFloat(m[4])<0.08) return null; return toHsl(+m[1],+m[2],+m[3]);}
  var out=[], seen={};
  var els=document.querySelectorAll("*");
  for(var i=0;i<els.length;i++){var e=els[i]; if(e.getClientRects().length===0) continue;
    if(e.closest("[data-env]")||e.closest("[data-preview-switches]")) continue;
    var cs=getComputedStyle(e);
    var vals=[["color",cs.color],["background",cs.backgroundColor],["border",cs.borderTopColor],["fill",cs.fill],["stroke",cs.stroke],["outline",cs.outlineColor]];
    for(var j=0;j<vals.length;j++){var hsl=parse(vals[j][1]); if(!hsl) continue;
      if(hsl[0]>=190&&hsl[0]<=260&&hsl[1]>=15){
        var k=vals[j][1]+"|"+vals[j][0]; if(seen[k]) {seen[k].n++; continue;} seen[k]={n:1};
        var r=e.getBoundingClientRect();
        out.push({prop:vals[j][0],value:vals[j][1],hsl:hsl,visible:r.width>0&&r.height>0,
          box:Math.round(r.width)+"x"+Math.round(r.height),
          where:(e.tagName+"."+(e.className||"").toString().split(" ").slice(0,3).join(".")).slice(0,56),
          text:(e.textContent||"").trim().slice(0,40)});}}}
  out.forEach(function(o){o.count=seen[o.value+"|"+o.prop].n;});
  return out;})()`);

R.cmp = await ev(`(function(){
  var rows=[].slice.call(document.querySelectorAll("[class*=cmpb-row],[class*=cmp-row]")).filter(function(e){return e.getClientRects().length>0;})
    .map(function(e){return {cls:(e.className||"").toString().slice(0,30),text:(e.textContent||"").trim().replace(/[ ]+/g," ").slice(0,60)};});
  var small=[].slice.call(document.querySelectorAll(".cmpb-v-text,[class*=cmpb-v]")).map(function(e){var cs=getComputedStyle(e);
    return {cls:(e.className||"").toString().slice(0,24),fs:parseFloat(cs.fontSize),ws:cs.whiteSpace,
      oneLine:e.scrollWidth<=e.clientWidth+1,h:Math.round(e.getBoundingClientRect().height),text:(e.textContent||"").trim().slice(0,34)};});
  return {rowCount:rows.length,rows:rows,small:small};})()`);

R.m3d = await ev(`(async function(){
  var stage=document.querySelector("[data-model3d-stage]");
  var sec=stage.closest("section")||stage.parentElement;
  sec.scrollIntoView({block:"start",behavior:"instant"}); await new Promise(r=>setTimeout(r,1200));
  // where are the big gaps?
  var rects=[];
  (function walk(e){for(var i=0;i<e.children.length;i++){var c=e.children[i];var r=c.getBoundingClientRect();var cs=getComputedStyle(c);
    var paints=(c.textContent||"").trim().length>0||c.tagName==="IMG"||c.tagName==="SVG"||c.tagName==="VIDEO"||cs.backgroundImage!=="none"||cs.backgroundColor!=="rgba(0, 0, 0, 0)";
    if(r.height>2&&paints&&c.children.length===0) rects.push({top:Math.round(r.top),bottom:Math.round(r.bottom),what:(c.tagName+"."+(c.className||"").toString().split(" ")[0]).slice(0,26)}); else walk(c);}})(sec);
  rects.sort(function(a,b){return a.top-b.top;});
  var merged=[]; rects.forEach(function(r){ if(merged.length&&r.top<=merged[merged.length-1].bottom+1){merged[merged.length-1].bottom=Math.max(merged[merged.length-1].bottom,r.bottom);merged[merged.length-1].to=r.what;} else merged.push({top:r.top,bottom:r.bottom,from:r.what,to:r.what}); });
  var gaps=[]; for(var i=1;i<merged.length;i++){var g=merged[i].top-merged[i-1].bottom; if(g>8) gaps.push({px:g,after:merged[i-1].to,before:merged[i].from,atY:merged[i-1].bottom});}
  gaps.sort(function(a,b){return b.px-a.px;});
  // is-past: does it paint anything?
  var btns=[].slice.call(document.querySelectorAll("[data-m3d-step-button]"));
  btns[3].click(); await new Promise(r=>setTimeout(r,1400));
  var styles=btns.map(function(e){var cs=getComputedStyle(e);var be=getComputedStyle(e,"::before");var af=getComputedStyle(e,"::after");
    return {cls:(e.className||"").toString().slice(0,40),bg:cs.backgroundColor,color:cs.color,border:cs.borderTopColor+" "+cs.borderTopWidth,
      beforeBg:be.backgroundColor,beforeContent:be.content,afterBg:af.backgroundColor,afterContent:af.content};});
  return {largestGaps:gaps.slice(0,4), stepStyles:styles};})()`);

await metrics(390, 844); await nav(`${BASE}/es?view=target`); await wake();
R.play390 = await ev(`(async function(){
  var btns=[].slice.call(document.querySelectorAll("[data-m3d-step-button]"));
  if(btns.length>3){ btns[3].scrollIntoView({block:"center",behavior:"instant"}); await new Promise(r=>setTimeout(r,500));
    btns[3].click(); await new Promise(r=>setTimeout(r,2200)); }
  var cands=[].slice.call(document.querySelectorAll("button,[role=button],a")).filter(function(e){return e.getClientRects().length>0;})
    .map(function(e){var r=e.getBoundingClientRect();var cs=getComputedStyle(e);
      return {w:Math.round(r.width),h:Math.round(r.height),round:cs.borderRadius,
        label:((e.getAttribute("aria-label")||"")+" "+(e.textContent||"").trim()).trim().slice(0,30),
        cls:(e.className||"").toString().slice(0,30),hasSvg:!!e.querySelector("svg")};})
    .filter(function(o){return o.w>=28&&o.w<=96&&o.h>=28&&o.h<=96&&(o.round.indexOf("999")>=0||o.hasSvg);});
  return cands.slice(0,10);})()`);

writeFileSync("fu.json", JSON.stringify(R, null, 1));
console.log("BLUES", JSON.stringify(R.blues));
console.log("CMP rows", R.cmp.rowCount, JSON.stringify(R.cmp.small));
console.log("CMP first rows", JSON.stringify(R.cmp.rows.slice(0, 10)));
console.log("3D gaps", JSON.stringify(R.m3d.largestGaps));
console.log("3D steps", JSON.stringify(R.m3d.stepStyles));
console.log("PLAY 390", JSON.stringify(R.play390));
process.exit(0);
