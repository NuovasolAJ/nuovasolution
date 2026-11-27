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
// v2 (27.11.), for the data-hero-fit mechanism: three things the plain sweep cannot see.
//   - FINE STEPS. A 10 px grid can step straight over a narrow band where neither branch holds.
//     Around every height where the mode changes, the sweep repeats in 2 px steps.
//   - WITHOUT JAVASCRIPT. The script sets data-hero-fit; without it the CSS default (the 28 px
//     edge) must hold, and that is the case a sweep with JavaScript never exercises.
//   - THE FLIP AFTER FIRST PAINT. The script re-measures on load and after document.fonts.ready.
//     If the mode changes after the first paint, the hero's foot moves under the visitor. Measured
//     by reading mode and foot immediately and again after fonts and load have settled.
// What this script still CANNOT settle, and says so rather than implying it is covered: the script
// measures window.innerHeight while the CSS decides with 100svh. On a real phone those differ once
// the browser toolbar collapses; in headless emulation they are equal, so no sweep here can see it.
const BASE = process.argv[2];
const OUT = process.argv[3] || "hoehen-1127.json";
const LOCS = (process.argv[4] || "es,en").split(",");
const WIDTHS = (process.argv[5] || "360,375,390,414").split(",").map(Number);
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
  var content=hero.querySelector(".hf-content");
  return { vh:vh, heroBottom:Math.round(hr.bottom), painTop:Math.round(pr.top),
    peek: Math.round(vh - hr.bottom),
    fit: hero.getAttribute("data-hero-fit"),
    contentH: content?Math.round(content.getBoundingClientRect().height):null,
    room: content?Math.round(vh - content.getBoundingClientRect().height):null,
    heroMinH: Math.round(parseFloat(getComputedStyle(hero).minHeight)||0),
    painVisiblePx: Math.max(0, Math.round(Math.min(vh, pr.bottom) - Math.max(0, pr.top))),
    slicedLines: cut, slicedCount: cut.length, wholeLinesShown: shown.length };
})()`;

const res = { probe: "hoehenfeger1127", base: BASE, pin_start: PIN_START, when: new Date().toISOString(), rows: [], fine: [], noJs: [], flip: [] };
for (const W of WIDTHS) {
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

    // --- FINE STEPS around every height where the mode changes: a 10 px grid can step over a
    //     narrow band in which neither branch holds. 2 px steps, +/- 12 px around each change.
    const edges = [];
    for (let i = 1; i < mine.length; i++) if (mine[i].fit !== mine[i - 1].fit) edges.push(mine[i].height);
    for (const e of edges) {
      for (let H = e - 12; H <= e + 12; H += 2) {
        if (H < 560 || H > 940) continue;
        await send("Emulation.setDeviceMetricsOverride", { width: W, height: H, deviceScaleFactor: 2, mobile: true });
        await sleep(240); await ev(`window.scrollTo(0,0)`); await sleep(160);
        const r = await ev(PROBE);
        if (!r || r.__error || r.__missing) { res.fine.push({ width: W, height: H, locale: loc, NOT_MEASURED: true }); continue; }
        res.fine.push({ width: W, height: H, locale: loc, ...r });
        if (r.slicedCount > 0) console.error(`*** FINE ${W}x${H} ${loc}: fit=${r.fit} peek=${r.peek} SLICES: ${r.slicedLines.map(s => `"${s.text}" ${s.cutAt}/${s.of}px`).join(" | ")}`);
      }
      console.error(`  fine around ${W}x${e} ${loc}: ${res.fine.filter(x=>x.width===W&&x.locale===loc&&Math.abs(x.height-e)<=12&&x.slicedCount>0).length} sliced of 13`);
    }

    // --- THE FLIP AFTER FIRST PAINT: the script re-measures on load and after fonts.ready. If the
    //     mode changes after the first paint, the hero's foot moves under the visitor.
    for (const H of [667, 740, 800, 844]) {
      await send("Emulation.setDeviceMetricsOverride", { width: W, height: H, deviceScaleFactor: 2, mobile: true });
      await send("Page.navigate", { url: `${BASE}/${loc}/` });
      await sleep(900);
      const early = await ev(`(function(){var s=document.querySelector('section[data-hero="film"]');var h=s?s.getBoundingClientRect():null;return s?{fit:s.getAttribute("data-hero-fit"),foot:h?Math.round(h.bottom):null}:null;})()`);
      await sleep(7000);
      await ev(`(()=>{for(const s of ["[data-env]","[data-preview-switches]","[data-env-marker]"])for(const e of document.querySelectorAll(s))e.remove();})()`);
      await sleep(900); await ev(`window.scrollTo(0,0)`); await sleep(300);
      const late = await ev(`(function(){var s=document.querySelector('section[data-hero="film"]');var h=s?s.getBoundingClientRect():null;return s?{fit:s.getAttribute("data-hero-fit"),foot:h?Math.round(h.bottom):null}:null;})()`);
      const flipped = early && late && early.fit !== late.fit;
      res.flip.push({ width: W, height: H, locale: loc, early, late, flippedAfterPaint: !!flipped });
      if (flipped) console.error(`*** FLIP ${W}x${H} ${loc}: ${early.fit} -> ${late.fit}, foot ${early.foot} -> ${late.foot}`);
    }
  }
}

// --- WITHOUT JAVASCRIPT: the script sets data-hero-fit; without it the CSS default (the 28 px
//     edge) must hold. A sweep with JavaScript never exercises that case.
// Scripts are disabled only for the NAVIGATION, then re-enabled to read the page: an inline script
// skipped during parsing is not re-run afterwards, so the DOM stays the one a visitor without
// JavaScript sees, while Runtime.evaluate (which the disable flag can block) works again.
for (const W of WIDTHS) {
  for (const loc of LOCS) {
    for (const H of [640, 667, 740, 800, 844, 896]) {
      await send("Emulation.setScriptExecutionDisabled", { value: true });
      await send("Emulation.setDeviceMetricsOverride", { width: W, height: H, deviceScaleFactor: 2, mobile: true });
      await send("Page.navigate", { url: `${BASE}/${loc}/` }); await sleep(5200);
      await send("Emulation.setScriptExecutionDisabled", { value: false });
      await sleep(400);
      const r = await ev(PROBE);
      if (!r || r.__error || r.__missing) { res.noJs.push({ width: W, height: H, locale: loc, NOT_MEASURED: "no probe without JS" }); continue; }
      res.noJs.push({ width: W, height: H, locale: loc, ...r });
      if (r.slicedCount > 0) console.error(`*** NO-JS ${W}x${H} ${loc}: fit=${r.fit} peek=${r.peek} SLICES ${r.slicedCount}`);
      else console.error(`no-js ${W}x${H} ${loc}: fit=${r.fit} peek=${r.peek} clean`);
    }
  }
}
res.pin_end = await build(); res.pinned = res.pin_start === res.pin_end;
if (!res.pinned) res.VOID = "build moved - VOID";
const cutOf = (a) => a.filter((r) => r.slicedCount > 0);
const bad = cutOf(res.rows), badFine = cutOf(res.fine), badNoJs = cutOf(res.noJs);
const flips = res.flip.filter((f) => f.flippedAfterPaint);
res.summary = {
  grid: { windows: res.rows.length, sliced: bad.length, where: bad.map((b) => `${b.width}x${b.height} ${b.locale} peek ${b.peek}`) },
  fine: { windows: res.fine.length, sliced: badFine.length, where: badFine.map((b) => `${b.width}x${b.height} ${b.locale} peek ${b.peek}`) },
  withoutJavaScript: { windows: res.noJs.length, sliced: badNoJs.length, modes: [...new Set(res.noJs.map((r) => String(r.fit)))], where: badNoJs.map((b) => `${b.width}x${b.height} ${b.locale} peek ${b.peek}`) },
  flipAfterFirstPaint: { checked: res.flip.length, flipped: flips.length, where: flips.map((f) => `${f.width}x${f.height} ${f.locale}: ${f.early?.fit}->${f.late?.fit}, foot ${f.early?.foot}->${f.late?.foot}`) },
  cannotBeSettledHere: "the script measures window.innerHeight while the CSS decides with 100svh; in headless emulation the two are equal, so no sweep here can see a divergence that only appears when a real browser toolbar collapses",
};
await (await import("node:fs")).promises.writeFile(OUT, JSON.stringify(res, null, 1));
console.log(JSON.stringify({ pinned: res.pinned, ...res.summary, out: OUT }, null, 1));
process.exit(0);
