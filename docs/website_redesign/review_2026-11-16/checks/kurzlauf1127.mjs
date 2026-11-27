// RV6 short run on the named commit 7a46a59. Scope as agreed, nothing beyond it.
//  1  the rows at 360 and 375 in both languages + 390/414 for context: fold, hero foot, peek, mode
//  2  N-2 / N-3: is there a hint on any phone at all, and does anything overlap the main action
//  3  N-1: the caption - where it sits, whether it is inside the fold (contrast runs separately)
//  4  the owner's item: the EN hero task title, and whether it still stands on one line
//  5  the probe's inertness: .hf-svh must not be a tap target, not a Tab stop, must not add
//     scrollable overflow, and must not move the fold figures against 43d9cce
const BASE = process.argv[2];
const OUT = process.argv[3] || "kurzlauf-1127.json";
const CDP = 9477, sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const list = await (await fetch(`http://127.0.0.1:${CDP}/json/list`)).json();
const ws = new WebSocket(list.find((t) => t.type === "page").webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener("open", r));
let id = 0; const pend = new Map();
ws.addEventListener("message", (e) => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } });
const send = (m, p = {}) => new Promise((r) => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method: m, params: p })); });
const ev = async (x) => { const r = await send("Runtime.evaluate", { expression: x, returnByValue: true, awaitPromise: true }); if (r.result?.exceptionDetails) return { __error: (r.result.exceptionDetails.exception?.description || "").slice(0, 300) }; return r.result?.result?.value; };
const key = async (k, c, v) => { for (const type of ["keyDown", "keyUp"]) await send("Input.dispatchKeyEvent", { type, key: k, code: c, windowsVirtualKeyCode: v, nativeVirtualKeyCode: v }); };
const build = async () => { try { const r = await fetch(`${BASE}/api/build`, { signal: AbortSignal.timeout(20000) }); const j = await r.json(); return `${j.commit}|${j.deployment}|${j.env}|${j.mode}`; } catch { return "UNREACHABLE"; } };
const PIN_START = await build();
if (PIN_START === "UNREACHABLE") { console.log("ABORT: build unreachable - NOT a pass"); process.exit(2); }
await send("Page.enable");
const STRIP = `(()=>{let n=0;for(const s of ["[data-env]","[data-preview-switches]","[data-env-marker]"]){for(const e of document.querySelectorAll(s)){e.remove();n++;}}return n;})()`;
const open = async (loc, W, H, MOB) => {
  await send("Emulation.setDeviceMetricsOverride", { width: W, height: H, deviceScaleFactor: MOB ? 2 : 1, mobile: !!MOB });
  await send("Emulation.setTouchEmulationEnabled", { enabled: !!MOB, maxTouchPoints: MOB ? 5 : 0 });
  for (let a = 1; a <= 3; a++) {
    await send("Page.navigate", { url: `${BASE}/${loc}/` }); await sleep(a === 1 ? 7000 : 8400);
    const c = await ev(`(()=>({len:(document.body.innerText||"").length,h1:!!document.querySelector("h1")}))()`);
    if (c && !c.__error && c.h1 && c.len > 500) { await ev(STRIP); await sleep(950); await ev(`window.scrollTo(0,0)`); await sleep(550); return true; }
  }
  return false;
};
const res = { probe: "kurzlauf1127", base: BASE, pin_start: PIN_START, when: new Date().toISOString(), rows: [], probeInert: {}, titles: {} };

const ROW = `(function(){
  var vh=innerHeight;
  var box=function(s){var e=document.querySelector(s); if(!e) return null; var r=e.getBoundingClientRect(); var cs=getComputedStyle(e);
    return {x:r.left,y:r.top,w:r.width,h:r.height,bottom:r.bottom,right:r.right,shown:cs.display!=="none"&&cs.visibility!=="hidden"&&r.width>0&&r.height>0};};
  var ov=function(a,b){ if(!a||!b||!a.shown||!b.shown) return 0; var x=Math.max(0,Math.min(a.right,b.right)-Math.max(a.x,b.x)); var y=Math.max(0,Math.min(a.bottom,b.bottom)-Math.max(a.y,b.y)); return Math.round(x*y); };
  var hero=document.querySelector(".hf"), sec=document.querySelector('section[data-hero="film"]');
  var task=box("[data-hero-scene-task]"), main=box("[data-hero-cta='task']"), edge=box(".hf-edge"), mark=box(".hf-mark");
  var n=function(s){return (s||"").replace(/[\\s\\u00a0]+/g," ").trim();};
  var title=document.querySelector(".hf-scene-task-title");
  var lines=null;
  if(title){ var rg=document.createRange(); rg.selectNodeContents(title); lines=rg.getClientRects().length; }
  var svh=document.querySelector(".hf-svh");
  return { vh:vh,
    heroFoot: hero?Math.round(hero.getBoundingClientRect().bottom):null,
    peek: hero?Math.round(vh-hero.getBoundingClientRect().bottom):null,
    fit: sec?sec.getAttribute("data-hero-fit"):null,
    taskHead: task?Math.round(vh-task.bottom):null, mainHead: main?Math.round(vh-main.bottom):null,
    hintShown: edge?edge.shown:false, hintOverMain: ov(edge,main), hintOverMark: ov(edge,mark),
    markBottom: mark?Math.round(mark.bottom):null, markInFold: mark&&mark.shown?(mark.bottom<=vh+1):null,
    taskTitle: n(title&&title.innerText), taskTitleLines: lines,
    svhProbe: svh?{h:Math.round(svh.getBoundingClientRect().height),w:Math.round(svh.getBoundingClientRect().width),vis:getComputedStyle(svh).visibility,pe:getComputedStyle(svh).pointerEvents,aria:svh.getAttribute("aria-hidden")}:null,
    docScrollW: document.documentElement.scrollWidth, docClientW: document.documentElement.clientWidth,
    heroScrollH: hero?hero.scrollHeight:null, heroClientH: hero?hero.clientHeight:null };
})()`;

for (const [W, H, MOB] of [[360, 640, 1], [375, 667, 1], [390, 844, 1], [414, 896, 1], [1366, 768, 0]]) {
  for (const loc of ["es", "en"]) {
    if (!await open(loc, W, H, MOB)) { res.rows.push({ viewport: `${W}x${H}`, locale: loc, NOT_MEASURED: true }); continue; }
    const r = await ev(ROW);
    res.rows.push({ viewport: `${W}x${H}`, locale: loc, ...r });
    console.error(`${W}x${H} ${loc}: fit=${r.fit} foot=${r.heroFoot} peek=${r.peek} task=${r.taskHead} main=${r.mainHead} | hint=${r.hintShown} overMain=${r.hintOverMain} | caption inFold=${r.markInFold} at ${r.markBottom} | title="${r.taskTitle}" lines=${r.taskTitleLines}`);
  }
}

// ---- the owner's item: both titles side by side, and the demo's end title ----
for (const loc of ["es", "en"]) {
  if (!await open(loc, 390, 844, 1)) { res.titles[loc] = "NOT_MEASURED"; continue; }
  const heroTitle = await ev(`(function(){var n=function(s){return (s||"").replace(/\\s+/g," ").trim();};return n((document.querySelector(".hf-scene-task-title")||{}).innerText);})()`);
  await ev(`(function(){var a=document.querySelector("[data-hero-cta='task']"); if(a) a.click(); return 1;})()`);
  await sleep(18000);
  const demo = await ev(`(function(){var n=function(s){return (s||"").replace(/\\s+/g," ").trim();};
    var t=document.querySelector("[data-demo-task-title]");
    return { endTitle:n(t&&t.querySelector(".demo-next-value")&&t.querySelector(".demo-next-value").innerText), endBlock:n(t&&t.innerText).slice(0,120) };})()`);
  res.titles[loc] = { heroTaskTitle: heroTitle, demoEndTitle: demo.endTitle, identical: heroTitle === demo.endTitle, demoBlock: demo.endBlock };
  console.error(`titles ${loc}: hero="${heroTitle}" demo="${demo.endTitle}" identical=${heroTitle === demo.endTitle}`);
}

// ---- the probe's inertness: tap targets and the real Tab order at 375 ----
if (await open("es", 375, 667, 1)) {
  const t = await ev(`(function(){
    var vis=function(e){var x=e; while(x&&x!==document.body){var cs=getComputedStyle(x); if(cs.display==="none"||cs.visibility==="hidden"||x.hasAttribute("hidden")) return false; x=x.parentElement;} return true;};
    var all=[].slice.call(document.querySelectorAll("a,button,input,select,textarea,[role=button],[tabindex]"));
    var svh=document.querySelector(".hf-svh");
    return { svhIsTarget: !!(svh && (svh.matches("a,button,[role=button],[tabindex]"))),
      svhVisibleByAncestorWalk: svh?vis(svh):null,
      targetsCounted: all.filter(vis).length,
      svhAmongTargets: all.indexOf(svh)>=0 };
  })()`);
  let stops = [], found = false;
  for (let i = 0; i < 22; i++) {
    await key("Tab", "Tab", 9); await sleep(80);
    const a = await ev(`(function(){var e=document.activeElement; if(!e) return null; var r=e.getBoundingClientRect(); return {cls:((e.className&&e.className.toString?e.className.toString():e.tagName)||"").slice(0,34), w:Math.round(r.width), h:Math.round(r.height), isSvh: e.classList&&e.classList.contains("hf-svh")};})()`);
    if (a) stops.push(a);
    if (a && a.isSvh) found = true;
  }
  res.probeInert = { ...t, tabStops: stops.length, svhEverFocused: found, zeroSizeStops: stops.filter((s) => s.w === 0 || s.h === 0).length, stops: stops.slice(0, 12) };
  console.error(`probe inert: isTarget=${t.svhIsTarget} visibleByWalk=${t.svhVisibleByAncestorWalk} everFocused=${found} zeroSizeTabStops=${res.probeInert.zeroSizeStops}`);
}

res.pin_end = await build(); res.pinned = res.pin_start === res.pin_end;
if (!res.pinned) res.VOID = "build moved - VOID";
await (await import("node:fs")).promises.writeFile(OUT, JSON.stringify(res, null, 1));
console.log(JSON.stringify({ pinned: res.pinned, out: OUT }, null, 1));
process.exit(0);
