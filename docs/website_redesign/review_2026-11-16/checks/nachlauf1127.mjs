// RV6 short run on the named commit 43d9cce. Six points plus the owner's condition.
//  A  the owner's condition at 360 x 640 ES, measured exactly as he stated it:
//     "Die 0 px Reserve akzeptiere ich, wenn der Button vollständig sichtbar und bedienbar ist."
//     fully visible = the WHOLE rect inside the window AND no other element painted over it, tested
//       at the centre and at all four corners with elementsFromPoint;
//     operable = a REAL touch at the centre and 2 px above the lower edge lands on the button and
//       the page then does what the button promises (the demo's end state).
//  B  E-4: all three WhatsApp heads.
//  C  E-5 / E-6: the hint's size and visibility rule over seven windows, furniture removed.
//  D  the fold rows as a regression guard, furniture removed.
//  E  does the hint overlap the main action or the caption anywhere?
const BASE = process.argv[2];
const OUT = process.argv[3] || "nachlauf-1127.json";
const CDP = 9477, sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const list = await (await fetch(`http://127.0.0.1:${CDP}/json/list`)).json();
const ws = new WebSocket(list.find((t) => t.type === "page").webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener("open", r));
let id = 0; const pend = new Map();
ws.addEventListener("message", (e) => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } });
const send = (m, p = {}) => new Promise((r) => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method: m, params: p })); });
const ev = async (x) => { const r = await send("Runtime.evaluate", { expression: x, returnByValue: true, awaitPromise: true }); if (r.result?.exceptionDetails) return { __error: (r.result.exceptionDetails.exception?.description || "").slice(0, 300) }; return r.result?.result?.value; };
const build = async () => { try { const r = await fetch(`${BASE}/api/build`, { signal: AbortSignal.timeout(20000) }); const j = await r.json(); return `${j.commit}|${j.deployment}|${j.env}|${j.mode}`; } catch { return "UNREACHABLE"; } };
const PIN_START = await build();
if (PIN_START === "UNREACHABLE") { console.log("ABORT: build unreachable"); process.exit(2); }
await send("Page.enable");
const STRIP = `(()=>{let n=0;for(const s of ["[data-env]","[data-preview-switches]","[data-env-marker]"]){for(const e of document.querySelectorAll(s)){e.remove();n++;}}return n;})()`;
const open = async (loc, W, H, MOB, strip = true) => {
  await send("Emulation.setDeviceMetricsOverride", { width: W, height: H, deviceScaleFactor: MOB ? 2 : 1, mobile: !!MOB });
  await send("Emulation.setTouchEmulationEnabled", { enabled: !!MOB, maxTouchPoints: MOB ? 5 : 0 });
  for (let a = 1; a <= 3; a++) {
    await send("Page.navigate", { url: `${BASE}/${loc}/` }); await sleep(a === 1 ? 7000 : 8400);
    const c = await ev(`(()=>({len:(document.body.innerText||"").length,h1:!!document.querySelector("h1")}))()`);
    if (c && !c.__error && c.h1 && c.len > 500) { if (strip) { await ev(STRIP); await sleep(950); } await ev(`window.scrollTo(0,0)`); await sleep(550); return true; }
  }
  return false;
};
const tap = async (x, y) => {
  await send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x, y, radiusX: 11, radiusY: 11, force: 1 }] });
  await sleep(70);
  await send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
};
const res = { probe: "nachlauf1127", base: BASE, pin_start: PIN_START, when: new Date().toISOString() };

// ---------- A : the owner's condition at 360 x 640 ES ----------
{
  const A = {};
  if (!await open("es", 360, 640, 1)) { res.A = { NOT_MEASURED: "home never loaded" }; }
  else {
    A.geometry = await ev(`(function(){
      var b=document.querySelector("[data-hero-cta='task']"); if(!b) return null;
      var r=b.getBoundingClientRect(); var cs=getComputedStyle(b);
      var pts={centre:[r.left+r.width/2,r.top+r.height/2],
               tl:[r.left+2,r.top+2], tr:[r.right-2,r.top+2], bl:[r.left+2,r.bottom-2], br:[r.right-2,r.bottom-2],
               nearBottom:[r.left+r.width/2, r.bottom-2]};
      var hits={};
      for(var k in pts){ var el=document.elementFromPoint(pts[k][0],pts[k][1]);
        hits[k]= el ? (el===b || b.contains(el) ? "the button" : ((el.className&&el.className.toString?el.className.toString():el.tagName)||"?").slice(0,40)) : "nothing"; }
      return { rect:{x:Math.round(r.left),y:Math.round(r.top),w:Math.round(r.width),h:Math.round(r.height),bottom:Math.round(r.bottom),right:Math.round(r.right)},
        vw:innerWidth, vh:innerHeight,
        fullyInsideWindow: r.top>=0 && r.left>=0 && r.bottom<=innerHeight && r.right<=innerWidth,
        reserveBelow: Math.round(innerHeight - r.bottom),
        minSide: Math.round(Math.min(r.width,r.height)),
        opacity:cs.opacity, visibility:cs.visibility, pointerEvents:cs.pointerEvents,
        hitTest: hits, allFiveHitTheButton: Object.keys(hits).every(function(k){return hits[k]==="the button";}),
        label:(b.innerText||"").replace(/\\s+/g," ").trim(), href:b.getAttribute("href") };
    })()`);
    // operable: a real touch at the centre
    const g = A.geometry;
    if (g && g.rect) {
      const cx = g.rect.x + g.rect.w / 2, cy = g.rect.y + g.rect.h / 2;
      await tap(cx, cy); await sleep(3500);
      A.tapCentre = await ev(`(function(){var s=document.querySelector('#demo');
        return { hash:location.hash, scrollY:Math.round(scrollY),
          demoEntered:s?s.getAttribute('data-demo-entered'):null, demoPhase:s?s.getAttribute('data-demo-phase'):null, demoDone:s?s.getAttribute('data-demo-done'):null,
          endTextVisible:(function(){var t=document.querySelector('[data-demo-task-title]'); if(!t) return null; var r=t.getBoundingClientRect(); return r.top<innerHeight&&r.bottom>0;})() };})()`);
      // and once more, 2 px above the lower edge - the pixel the owner's "0 px reserve" is about
      await open("es", 360, 640, 1);
      const g2 = await ev(`(function(){var b=document.querySelector("[data-hero-cta='task']");var r=b.getBoundingClientRect();return {x:r.left+r.width/2,y:r.bottom-2};})()`);
      await tap(g2.x, g2.y); await sleep(3500);
      A.tapAtLowerEdge = await ev(`(function(){var s=document.querySelector('#demo');
        return { hash:location.hash, scrollY:Math.round(scrollY), demoEntered:s?s.getAttribute('data-demo-entered'):null, demoDone:s?s.getAttribute('data-demo-done'):null };})()`);
    }
    res.A = A;
    console.error(`A 360 ES: fullyInside=${g?.fullyInsideWindow} reserve=${g?.reserveBelow} minSide=${g?.minSide} allCornersHit=${g?.allFiveHitTheButton} tapCentre->${A.tapCentre?.demoEntered}/${A.tapCentre?.hash} tapEdge->${A.tapAtLowerEdge?.demoEntered}`);
  }
}

// ---------- B : the three WhatsApp heads ----------
{
  res.B = {};
  for (const loc of ["es", "en"]) {
    if (!await open(loc, 1366, 768, 0)) { res.B[loc] = "NOT_MEASURED"; continue; }
    await ev(`(()=>{for(const e of document.querySelectorAll(".at-card"))e.scrollIntoView({block:"center"});window.scrollTo(0,0);})()`); await sleep(1100);
    res.B[loc] = await ev(`(function(){
      var one=function(sel){var e=document.querySelector(sel); if(!e) return null; var cs=getComputedStyle(e); var svg=e.querySelector("svg");
        var lab=e.querySelector(".demo-chat-name")||e;
        return {bg:cs.backgroundColor,label:getComputedStyle(lab).color,mark:svg?getComputedStyle(svg).color:null,text:(e.innerText||"").replace(/\\s+/g," ").trim().slice(0,40)};};
      return { heroLabel:one(".hf-scene-msg .hf-scene-label"), agencyTask:one(".at-chat-head"), atCount:document.querySelectorAll(".at-chat-head").length };})()`);
    console.error(`B ${loc}: hero=${res.B[loc]?.heroLabel?.bg} agencyTask=${res.B[loc]?.agencyTask?.bg} mark=${res.B[loc]?.agencyTask?.mark}`);
  }
  // the demo head after the run
  if (await open("es", 1366, 768, 0)) {
    await ev(`(function(){var a=document.querySelector("[data-hero-cta='task']");if(a)a.click();return 1;})()`); await sleep(18000);
    res.B.demoHead = await ev(`(function(){var h=document.querySelector('.demo-chat-head'); if(!h) return null; var cs=getComputedStyle(h); var svg=h.querySelector('svg'); var n=h.querySelector('.demo-chat-name');
      return {bg:cs.backgroundColor,name:n?getComputedStyle(n).color:null,mark:svg?getComputedStyle(svg).color:null};})()`);
    console.error(`B demoHead: ${JSON.stringify(res.B.demoHead)}`);
  }
}

// ---------- C + D + E : hint, fold, overlaps - seven windows, furniture removed ----------
{
  res.CDE = [];
  for (const [W, H, MOB] of [[360, 640, 1], [375, 667, 1], [390, 844, 1], [414, 896, 1], [1280, 720, 0], [1366, 768, 0], [1440, 900, 0]]) {
    for (const loc of ["es", "en"]) {
      if (!await open(loc, W, H, MOB)) { res.CDE.push({ viewport: `${W}x${H}`, locale: loc, NOT_MEASURED: true }); continue; }
      const r = await ev(`(function(){
        var vh=innerHeight;
        var box=function(s){var e=document.querySelector(s); if(!e) return null; var r=e.getBoundingClientRect(); var cs=getComputedStyle(e);
          return {x:r.left,y:r.top,w:r.width,h:r.height,bottom:r.bottom,right:r.right,display:cs.display,shown:cs.display!=="none"&&r.width>0};};
        var over=function(a,b){ if(!a||!b||!a.shown||!b.shown) return false; return a.x<b.right&&a.right>b.x&&a.y<b.bottom&&a.bottom>b.y; };
        var task=box("[data-hero-scene-task]"), main=box("[data-hero-cta='task']"), edge=box(".hf-edge"), mark=box(".hf-mark");
        return { vh:vh,
          taskHead: task?Math.round(vh-task.bottom):null, mainHead: main?Math.round(vh-main.bottom):null,
          edgeShown: edge?edge.shown:false, edgeW: edge?Math.round(edge.w):null, edgeH: edge?Math.round(edge.h):null,
          edgeMinSide: edge&&edge.shown?Math.round(Math.min(edge.w,edge.h)):null,
          edgeBottom: edge&&edge.shown?Math.round(edge.bottom):null, edgeInFold: edge&&edge.shown?(edge.bottom<=vh+1):null,
          edgeOverMain: over(edge,main), edgeOverMark: over(edge,mark),
          markShown: mark?mark.shown:false, markBottom: mark?Math.round(mark.bottom):null, markInFold: mark&&mark.shown?(mark.bottom<=vh+1):null };
      })()`);
      res.CDE.push({ viewport: `${W}x${H}`, locale: loc, ...r });
      console.error(`${W}x${H} ${loc}: task=${r.taskHead} main=${r.mainHead} | hint shown=${r.edgeShown} ${r.edgeW}x${r.edgeH} inFold=${r.edgeInFold} overMain=${r.edgeOverMain} overMark=${r.edgeOverMark} | caption inFold=${r.markInFold}`);
    }
  }
}
res.pin_end = await build(); res.pinned = res.pin_start === res.pin_end;
if (!res.pinned) res.VOID = "build moved - VOID";
await (await import("node:fs")).promises.writeFile(OUT, JSON.stringify(res, null, 1));
console.log(JSON.stringify({ pinned: res.pinned, out: OUT }, null, 1));
process.exit(0);
