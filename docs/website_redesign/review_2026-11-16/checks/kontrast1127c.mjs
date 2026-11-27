// RV6, third and final instrument for the two caption contrasts on dbd14d8.
// What the two earlier runs taught, both my own faults:
//   v1  a CLIPPED screenshot over an element with backdrop-filter came back near-white -> wrong.
//   v2  full-viewport capture was right, but (a) at 1366 .hf-mark sits BELOW the fold because the
//       preview furniture pushes the hero down, so it was skipped, and (b) at 390 the preview
//       switch panel (.pv) paints OVER the caption, which is what produced the white background.
//       My second "control" (.hf-lead) is itself text on the photo, so demanding >= 7 of it was
//       my own bad threshold, not a failure of the page.
// So this one measures the RELEASED condition: the two preview strips are removed from the DOM
// first (the same correction applied to the fold all week), the whole viewport is captured, and
// the rects are cropped inside the page. Control = a paragraph of real body text on the page's own
// surface further down, which must come out high; if it does not, the sample is not a measurement.
// In dbd14d8 .hf-mark has NO capsule (globals.css:680 only) - it is rgba(248,246,241,0.72) straight
// on the photo. That is the thing under test.
const BASE = process.argv[2];
const OUT = process.argv[3] || "kontrast-c-1127.json";
const CDP = 9477, sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const list = await (await fetch(`http://127.0.0.1:${CDP}/json/list`)).json();
const ws = new WebSocket(list.find((t) => t.type === "page").webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener("open", r));
let id = 0; const pend = new Map();
ws.addEventListener("message", (e) => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } });
const send = (m, p = {}) => new Promise((r) => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method: m, params: p })); });
const ev = async (x) => { const r = await send("Runtime.evaluate", { expression: x, returnByValue: true, awaitPromise: true }); if (r.result?.exceptionDetails) return { __error: (r.result.exceptionDetails.exception?.description || "").slice(0, 300) }; return r.result?.result?.value; };
const build = async () => { try { const r = await fetch(`${BASE}/api/build`, { signal: AbortSignal.timeout(20000) }); const j = await r.json(); return `${j.commit}|${j.deployment}`; } catch { return "UNREACHABLE"; } };
const PIN_START = await build();
if (PIN_START === "UNREACHABLE") { console.log("ABORT"); process.exit(2); }
await send("Page.enable");

const TARGETS = [".hf-mark", ".hf-scene-mark", "h1", ".pain-line, .pb-line, #pain p"];
const res = { probe: "kontrast1127c", base: BASE, pin_start: PIN_START, when: new Date().toISOString(), samples: [] };

for (const [W, H, MOB] of [[1366, 768, 0], [390, 844, 1], [360, 640, 1]]) {
  await send("Emulation.setDeviceMetricsOverride", { width: W, height: H, deviceScaleFactor: 1, mobile: !!MOB });
  let ok = false;
  for (let a = 1; a <= 3 && !ok; a++) {
    await send("Page.navigate", { url: `${BASE}/es/` }); await sleep(a === 1 ? 7000 : 8400);
    const c = await ev(`(()=>({h1:!!document.querySelector("h1"),mark:!!document.querySelector(".hf-mark"),sm:!!document.querySelector(".hf-scene-mark")}))()`);
    ok = c && !c.__error && c.h1 && c.mark && c.sm;
  }
  if (!ok) { res.samples.push({ viewport: `${W}x${H}`, NOT_MEASURED: "hero never rendered" }); continue; }
  // the released condition: both preview-only strips out of the DOM
  const removed = await ev(`(()=>{let n=0;for(const s of ["[data-env]","[data-preview-switches]","[data-env-marker]"]){for(const e of document.querySelectorAll(s)){e.remove();n++;}}return n;})()`);
  await sleep(1000);
  await ev(`window.scrollTo(0,0)`); await sleep(700);

  for (const phase of [0, 6, 12, 18]) {
    await ev(`(function(){var i=document.querySelector(".hf-image"); if(!i) return false; i.style.animationDelay="-${phase}s"; i.style.animationPlayState="paused"; return true;})()`);
    await sleep(520);
    const info = await ev(`(function(){
      var out={}; var sels=${JSON.stringify(TARGETS)};
      for(var k=0;k<sels.length;k++){var e=document.querySelector(sels[k]); if(!e){out[sels[k]]=null;continue;}
        var r=e.getBoundingClientRect(); var cs=getComputedStyle(e);
        var cx=r.left+r.width/2, cy=r.top+r.height/2;
        var stack=[]; try{stack=document.elementsFromPoint(cx,cy).slice(0,4).map(function(x){return (x.className&&x.className.toString&&x.className.toString().slice(0,28))||x.tagName;});}catch(err){}
        out[sels[k]]={x:Math.round(r.left),y:Math.round(r.top),w:Math.round(r.width),h:Math.round(r.height),
          color:cs.color,fontSize:cs.fontSize,fontWeight:cs.fontWeight,bg:cs.backgroundColor,
          text:(e.innerText||"").replace(/\\s+/g," ").trim().slice(0,52), stack:stack,
          inView: r.top>=0 && r.bottom<=innerHeight && r.width>2 && r.height>2};}
      return out;})()`);
    await ev(`(function(){var sels=${JSON.stringify(TARGETS)};
      for(var k=0;k<sels.length;k++){var e=document.querySelector(sels[k]); if(e){e.dataset.rv6p=e.style.color||"";e.style.setProperty("color","transparent","important");}}
      return true;})()`);
    await sleep(330);
    const shot = await send("Page.captureScreenshot", { format: "png" });
    await ev(`(function(){var sels=${JSON.stringify(TARGETS)};
      for(var k=0;k<sels.length;k++){var e=document.querySelector(sels[k]); if(e){if(e.dataset.rv6p){e.style.color=e.dataset.rv6p;}else{e.style.removeProperty("color");} delete e.dataset.rv6p;}}
      return true;})()`);
    const b64 = shot?.result?.data;
    if (!b64) { res.samples.push({ viewport: `${W}x${H}`, phase, NOT_MEASURED: "no screenshot" }); continue; }
    const per = await ev(`(async function(){
      var img=new Image(); img.src="data:image/png;base64,${b64}"; await img.decode();
      var c=document.createElement("canvas"); c.width=img.naturalWidth; c.height=img.naturalHeight;
      var g=c.getContext("2d",{willReadFrequently:true}); g.drawImage(img,0,0);
      var INFO=${JSON.stringify(info)};
      function lin(v){v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4);}
      function L(q){return 0.2126*lin(q[0])+0.7152*lin(q[1])+0.0722*lin(q[2]);}
      function ratio(x,y){var a1=L(x),b1=L(y);var hi=Math.max(a1,b1),lo=Math.min(a1,b1);return (hi+0.05)/(lo+0.05);}
      var sx=img.naturalWidth/innerWidth, sy=img.naturalHeight/innerHeight, out={};
      for(var key in INFO){ var i=INFO[key];
        if(!i){ out[key]={skipped:"missing"}; continue; }
        if(!i.inView){ out[key]={skipped:"not fully in view", y:i.y, h:i.h}; continue; }
        var X=Math.round(i.x*sx),Y=Math.round(i.y*sy),Wd=Math.max(1,Math.round(i.w*sx)),Ht=Math.max(1,Math.round(i.h*sy));
        if(X<0||Y<0||X+Wd>c.width||Y+Ht>c.height){ out[key]={skipped:"rect outside shot"}; continue; }
        var d=g.getImageData(X,Y,Wd,Ht).data;
        var m=i.color.match(/rgba?\\(([^)]+)\\)/); var p=m[1].split(",").map(Number);
        var T=[p[0],p[1],p[2]], a=(p.length>3?p[3]:1), rs=[], bs=[0,0,0];
        for(var q=0;q<d.length;q+=4){ var B=[d[q],d[q+1],d[q+2]];
          bs[0]+=B[0];bs[1]+=B[1];bs[2]+=B[2];
          rs.push(ratio([a*T[0]+(1-a)*B[0],a*T[1]+(1-a)*B[1],a*T[2]+(1-a)*B[2]],B)); }
        rs.sort(function(x,y){return x-y;});
        var n=rs.length, mean=0; for(var z=0;z<n;z++)mean+=rs[z]; mean/=n;
        out[key]={px:n,textColor:T,textAlpha:a,fontSize:i.fontSize,ownBg:i.bg,text:i.text,stack:i.stack,
          bgMean:[Math.round(bs[0]/n),Math.round(bs[1]/n),Math.round(bs[2]/n)],
          min:+rs[0].toFixed(2),p05:+rs[Math.floor(n*0.05)].toFixed(2),median:+rs[Math.floor(n*0.5)].toFixed(2),
          mean:+mean.toFixed(2),max:+rs[n-1].toFixed(2),
          below3:+(rs.filter(function(v){return v<3;}).length/n*100).toFixed(1),
          below45:+(rs.filter(function(v){return v<4.5;}).length/n*100).toFixed(1)};
      }
      return out;})()`);
    const ctrl = per?.[".pain-line, .pb-line, #pain p"];
    const controlOk = ctrl && !ctrl.skipped && ctrl.median >= 7;
    const m1 = per?.[".hf-mark"], m2 = per?.[".hf-scene-mark"], h1 = per?.["h1"];
    res.samples.push({ viewport: `${W}x${H}`, phase, furnitureRemoved: removed, controlOk, control: ctrl && { median: ctrl.median, min: ctrl.min, skipped: ctrl.skipped }, per });
    console.error(`${W}x${H} ph-${phase}s ctrl=${ctrl?.median ?? ctrl?.skipped} | hf-mark min=${m1?.min} med=${m1?.median} bg=${JSON.stringify(m1?.bgMean)} <4.5=${m1?.below45}% stack=${JSON.stringify(m1?.stack)} | scene-mark min=${m2?.min} med=${m2?.median} <4.5=${m2?.below45}% | h1 min=${h1?.min} med=${h1?.median}`);
  }
  await ev(`(function(){var i=document.querySelector(".hf-image"); if(i){i.style.animationPlayState="";i.style.animationDelay="";} return true;})()`);
}
res.pin_end = await build(); res.pinned = res.pin_start === res.pin_end;
if (!res.pinned) res.VOID = "build moved - VOID";
await (await import("node:fs")).promises.writeFile(OUT, JSON.stringify(res, null, 1));
console.log(JSON.stringify({ pinned: res.pinned, samples: res.samples.length, out: OUT }, null, 1));
process.exit(0);
