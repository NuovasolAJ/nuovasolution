// RV6: the contrast of the two captions that sit ON the hero photo, measured on real composited
// pixels, not on declared colours.
//   .hf-mark        "Estás en una visita · 11:40"  - has a dark pill (globals.css:2341) + blur
//   .hf-scene-mark  "Ejemplo · datos ficticios"    - rgba(248,246,241,0.62), NO background of its own
// Both colours are SEMI-TRANSPARENT, so the glyph's real colour is the declared colour composited
// over whatever is behind it. That is modelled: C = a*T + (1-a)*B per pixel, then contrast(C,B).
// The photo drifts for 24 s, so the background moves - sampled at four phases of the drift via a
// negative animation-delay, and at two windows.
// Method per sample: hide the glyphs only (color: transparent), screenshot exactly the caption's
// rect, read the pixels back through a canvas inside the page, restore. A sample that produced no
// pixels is reported as NOT MEASURED, never as a pass.
const BASE = process.argv[2];
const OUT = process.argv[3] || "kontrast-1127.json";
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

const res = { probe: "kontrast1127", base: BASE, pin_start: PIN_START, when: new Date().toISOString(), samples: [] };

for (const [W, H, MOB] of [[1366, 768, 0], [390, 844, 1]]) {
  await send("Emulation.setDeviceMetricsOverride", { width: W, height: H, deviceScaleFactor: 1, mobile: !!MOB });
  let ok = false;
  for (let a = 1; a <= 3 && !ok; a++) {
    await send("Page.navigate", { url: `${BASE}/es/` }); await sleep(a === 1 ? 7000 : 8400);
    const c = await ev(`(()=>({h1:!!document.querySelector("h1"),mark:!!document.querySelector(".hf-mark"),sm:!!document.querySelector(".hf-scene-mark")}))()`);
    ok = c && !c.__error && c.h1 && c.mark && c.sm;
  }
  if (!ok) { res.samples.push({ viewport: `${W}x${H}`, NOT_MEASURED: "hero captions never rendered" }); continue; }
  await ev(`window.scrollTo(0,0)`); await sleep(700);

  for (const sel of [".hf-mark", ".hf-scene-mark"]) {
    for (const phase of [0, 6, 12, 18]) {
      // jump the drift to this phase and hold it there, so the screenshot and the rect agree
      await ev(`(function(){var i=document.querySelector(".hf-image"); if(!i) return false;
        i.style.animationDelay="-${phase}s"; i.style.animationPlayState="paused"; return true;})()`);
      await sleep(500);
      const info = await ev(`(function(){var e=document.querySelector(${JSON.stringify(sel)});
        if(!e) return null; var r=e.getBoundingClientRect(); var cs=getComputedStyle(e);
        if(r.width<2||r.height<2) return {tooSmall:true,w:r.width,h:r.height};
        return { x:Math.floor(r.left), y:Math.floor(r.top), w:Math.ceil(r.width), h:Math.ceil(r.height),
          color:cs.color, fontSize:cs.fontSize, fontWeight:cs.fontWeight,
          bg:cs.backgroundColor, backdrop:cs.backdropFilter,
          text:(e.innerText||"").replace(/\\s+/g," ").trim() };})()`);
      if (!info || info.__error || info.tooSmall) { res.samples.push({ viewport: `${W}x${H}`, sel, phase, NOT_MEASURED: "rect unusable", info }); continue; }
      // hide the glyphs only; the pill and everything behind it stay
      await ev(`(function(){var e=document.querySelector(${JSON.stringify(sel)}); e.dataset.rv6Prev=e.style.color||""; e.style.setProperty("color","transparent","important"); return true;})()`);
      await sleep(260);
      const shot = await send("Page.captureScreenshot", { format: "png", clip: { x: info.x, y: info.y, width: info.w, height: info.h, scale: 1 }, captureBeyondViewport: false });
      await ev(`(function(){var e=document.querySelector(${JSON.stringify(sel)}); e.style.color=e.dataset.rv6Prev||""; if(!e.style.color) e.style.removeProperty("color"); return true;})()`);
      const b64 = shot?.result?.data;
      if (!b64) { res.samples.push({ viewport: `${W}x${H}`, sel, phase, NOT_MEASURED: "no screenshot" }); continue; }
      const stats = await ev(`(async function(){
        var img=new Image(); img.src="data:image/png;base64,${b64}";
        await img.decode();
        var c=document.createElement("canvas"); c.width=img.naturalWidth; c.height=img.naturalHeight;
        var g=c.getContext("2d"); g.drawImage(img,0,0);
        var d=g.getImageData(0,0,c.width,c.height).data;
        if(!d.length) return {none:true};
        var m=${JSON.stringify(info.color)}.match(/rgba?\\(([^)]+)\\)/); var p=m[1].split(",").map(Number);
        var T=[p[0],p[1],p[2]], a=(p.length>3?p[3]:1);
        function lin(v){v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4);}
        function L(c){return 0.2126*lin(c[0])+0.7152*lin(c[1])+0.0722*lin(c[2]);}
        function ratio(x,y){var a1=L(x),b1=L(y);var hi=Math.max(a1,b1),lo=Math.min(a1,b1);return (hi+0.05)/(lo+0.05);}
        var rs=[],n=0;
        for(var i=0;i<d.length;i+=4){
          var B=[d[i],d[i+1],d[i+2]];
          var C=[a*T[0]+(1-a)*B[0], a*T[1]+(1-a)*B[1], a*T[2]+(1-a)*B[2]];
          rs.push(ratio(C,B)); n++;
        }
        rs.sort(function(x,y){return x-y;});
        var mean=0; for(var k=0;k<rs.length;k++)mean+=rs[k]; mean/=rs.length;
        return { px:n, min:+rs[0].toFixed(2), p05:+rs[Math.floor(rs.length*0.05)].toFixed(2),
          median:+rs[Math.floor(rs.length*0.5)].toFixed(2), mean:+mean.toFixed(2), max:+rs[rs.length-1].toFixed(2),
          below3: +(rs.filter(function(v){return v<3;}).length/rs.length*100).toFixed(1),
          below45: +(rs.filter(function(v){return v<4.5;}).length/rs.length*100).toFixed(1),
          textAlpha: a, textColor: T };
      })()`);
      res.samples.push({ viewport: `${W}x${H}`, sel, phase, text: info.text, color: info.color, fontSize: info.fontSize, fontWeight: info.fontWeight, ownBg: info.bg, backdrop: info.backdrop, rect: { w: info.w, h: info.h }, stats });
      console.error(`${W}x${H} ${sel} phase-${phase}s: min=${stats?.min} p05=${stats?.p05} median=${stats?.median} below4.5=${stats?.below45}% below3=${stats?.below3}% (alpha ${stats?.textAlpha}, ${info.fontSize})`);
    }
    await ev(`(function(){var i=document.querySelector(".hf-image"); if(i){i.style.animationPlayState="";i.style.animationDelay="";} return true;})()`);
  }
}
res.pin_end = await build(); res.pinned = res.pin_start === res.pin_end;
if (!res.pinned) res.VOID = "build moved - VOID";
await (await import("node:fs")).promises.writeFile(OUT, JSON.stringify(res, null, 1));
console.log(JSON.stringify({ pinned: res.pinned, samples: res.samples.length, notMeasured: res.samples.filter(s => s.NOT_MEASURED).length, out: OUT }, null, 1));
process.exit(0);
