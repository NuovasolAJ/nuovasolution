// RV6: the hero's foot is HEIGHT-dependent, so four named windows cannot answer "no window sliced".
// Two rules decide where the hero ends on a phone:
//   (max-width:1023)                      min-height: min(calc(100svh - 160px), 820px)
//   (max-width:639) and (max-height:720)  min-height: calc(100svh - 28px)   [new, local only]
// and where the CONTENT is taller than the minimum, the content decides instead. Between the named
// windows the peek of the next section can therefore land anywhere - and a peek bigger than the
// pain section's top air (32px) but smaller than air + one line slices a line of type horizontally.
// That is exactly the failure I found on 26.11., so it gets swept, not assumed.
// Measured per window height: where the hero ends, how much of the next section shows, and whether
// the fold line crosses the BOX OF ANY TEXT NODE in the pain section (the real question - not
// whether the element overlaps, but whether a line of type is cut through).
const BASE = process.argv[2];
const OUT = process.argv[3] || "hoehen-1127.json";
const LOCS = (process.argv[4] || "es,en").split(",");
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
if (PIN_START === "UNREACHABLE") { console.log("ABORT: build unreachable"); process.exit(2); }
await send("Page.enable");

// every text node's own client rects - that is what gets sliced, not the element box
const PROBE = `(function(){
  var vh=innerHeight;
  var hero=document.querySelector(".hf"); var pain=document.getElementById("pain");
  if(!hero||!pain) return {__missing:true};
  var hr=hero.getBoundingClientRect(), pr=pain.getBoundingClientRect();
  var cut=[], shown=[];
  var w=document.createTreeWalker(pain, NodeFilter.SHOW_TEXT, null);
  var n;
  while((n=w.nextNode())){
    var t=(n.nodeValue||"").trim(); if(!t) continue;
    var par=n.parentElement; if(!par) continue;
    var cs=getComputedStyle(par); if(cs.display==="none"||cs.visibility==="hidden") continue;
    if(par.classList && par.classList.contains("sr-only")) continue;
    var rg=document.createRange(); rg.selectNodeContents(n);
    var rects=rg.getClientRects();
    for(var i=0;i<rects.length;i++){
      var r=rects[i]; if(r.width<1||r.height<1) continue;
      if(r.top < vh && r.bottom > vh){ cut.push({text:t.slice(0,44), top:Math.round(r.top), bottom:Math.round(r.bottom), h:Math.round(r.height), cutAt:Math.round(vh-r.top), of:Math.round(r.height)}); }
      else if(r.bottom <= vh && r.top >= 0){ shown.push(t.slice(0,30)); }
    }
  }
  return { vh:vh, heroBottom:Math.round(hr.bottom), painTop:Math.round(pr.top),
    peek: Math.round(vh - hr.bottom),
    painVisiblePx: Math.max(0, Math.round(Math.min(vh, pr.bottom) - Math.max(0, pr.top))),
    slicedLines: cut, slicedCount: cut.length, wholeLinesShown: shown.length };
})()`;

const res = { probe: "hoehenfeger1127", base: BASE, pin_start: PIN_START, when: new Date().toISOString(), rows: [] };
for (const W of [360, 375]) {
  for (const loc of LOCS) {
    // load once per (width, locale), then only change the viewport height
    let loaded = false;
    for (let a = 1; a <= 3 && !loaded; a++) {
      await send("Emulation.setDeviceMetricsOverride", { width: W, height: 800, deviceScaleFactor: 2, mobile: true });
      await send("Emulation.setTouchEmulationEnabled", { enabled: true, maxTouchPoints: 5 });
      await send("Page.navigate", { url: `${BASE}/${loc}/` }); await sleep(a === 1 ? 7200 : 8400);
      const c = await ev(`(()=>({h1:!!document.querySelector("h1"),pain:!!document.getElementById("pain"),len:(document.body.innerText||"").length}))()`);
      loaded = c && !c.__error && c.h1 && c.pain && c.len > 500;
    }
    if (!loaded) { res.rows.push({ width: W, locale: loc, NOT_MEASURED: "home never loaded" }); continue; }
    await ev(`(()=>{let n=0;for(const s of ["[data-env]","[data-preview-switches]","[data-env-marker]"]){for(const e of document.querySelectorAll(s)){e.remove();n++;}}return n;})()`);
    await sleep(900);
    for (let H = 600; H <= 900; H += 10) {
      await send("Emulation.setDeviceMetricsOverride", { width: W, height: H, deviceScaleFactor: 2, mobile: true });
      await sleep(260);
      await ev(`window.scrollTo(0,0)`); await sleep(180);
      const r = await ev(PROBE);
      if (!r || r.__error || r.__missing) { res.rows.push({ width: W, height: H, locale: loc, NOT_MEASURED: true, raw: r }); continue; }
      res.rows.push({ width: W, height: H, locale: loc, ...r });
      if (r.slicedCount > 0) console.error(`*** ${W}x${H} ${loc}: peek=${r.peek} SLICES ${r.slicedCount}: ${r.slicedLines.map(s => `"${s.text}" cut ${s.cutAt}/${s.of}px`).join(" | ")}`);
    }
    const mine = res.rows.filter((x) => x.width === W && x.locale === loc && !x.NOT_MEASURED);
    const bad = mine.filter((x) => x.slicedCount > 0);
    console.error(`${W} ${loc}: ${mine.length} heights, peek ${Math.min(...mine.map(x=>x.peek))}..${Math.max(...mine.map(x=>x.peek))}, sliced at ${bad.length} heights${bad.length?": "+bad.map(x=>x.height).join(","):""}`);
  }
}
res.pin_end = await build(); res.pinned = res.pin_start === res.pin_end;
if (!res.pinned) res.VOID = "build moved - VOID";
const bad = res.rows.filter((r) => r.slicedCount > 0);
res.summary = { heights: res.rows.length, slicedHeights: bad.length, sliced: bad.map((b) => ({ w: b.width, h: b.height, loc: b.locale, peek: b.peek, lines: b.slicedLines })) };
await (await import("node:fs")).promises.writeFile(OUT, JSON.stringify(res, null, 1));
console.log(JSON.stringify({ pinned: res.pinned, heights: res.rows.length, slicedHeights: bad.length, out: OUT }, null, 1));
process.exit(0);
