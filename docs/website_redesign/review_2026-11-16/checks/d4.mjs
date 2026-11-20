// D-4 of expected-16-optiona-1120.json: what the font files' byte identity does NOT cover.
//
// The woff2 files are sha256-identical to what 2342537 served, so the glyph question is closed by
// identity. The CSS around them is new code: next/font/google chose the fallback metrics and the
// axis defaults, next/font/local does not. So this measures, on the FIXED BUILD and on the
// BASELINE in the SAME run, so nothing is compared against a remembered number:
//
//   phase A, fonts allowed  - resolved font properties and boxes once document.fonts is ready
//   phase B, fonts BLOCKED  - the same boxes while the ADJUSTED FALLBACK metrics govern, which is
//                             what adjustFontFallback controls and what a visitor sees during swap
//   plus CLS, the legend's ✓ advance width, and document.fonts' faces
//
// Usage: node d4.mjs <fixed-base-url> <baseline-base-url> <tag>
import { writeFileSync } from "node:fs";

const FIXED = process.argv[2], BASELINE = process.argv[3], TAG = process.argv[4] || "untagged";
if (!FIXED || !BASELINE) { console.error("usage: node d4.mjs <fixed-base> <baseline-base> <tag>"); process.exit(2); }

const CDP = 9477, sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const list = await (await fetch(`http://127.0.0.1:${CDP}/json/list`)).json();
const ws = new WebSocket(list.find((t) => t.type === "page").webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener("open", r));
let id = 0; const pend = new Map();
ws.addEventListener("message", (e) => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } });
const send = (m, p = {}) => new Promise((r) => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method: m, params: p })); });
const ev = async (x) => {
  const r = await send("Runtime.evaluate", { expression: x, returnByValue: true, awaitPromise: true });
  if (r.result?.exceptionDetails) return { __error: (r.result.exceptionDetails.exception?.description || "").slice(0, 200) };
  return r.result?.result?.value;
};
await send("Page.enable"); await send("Network.enable");

const buildOf = async (base) => { try { return await (await fetch(`${base}/api/build`)).json(); } catch (e) { return { error: String(e).slice(0, 120) }; } };

// CLS must be observed from before the page's own scripts run.
await send("Page.addScriptToEvaluateOnNewDocument", {
  source: `window.__cls = 0; try { new PerformanceObserver((l) => { for (const e of l.getEntries())
    if (!e.hadRecentInput) window.__cls += e.value; }).observe({ type: "layout-shift", buffered: true }); } catch (e) {}`,
});

const TARGETS = [
  { id: "h1", sel: "[data-hero-words], [data-hero] h1, h1" },
  { id: "lead", sel: "[data-hero-lead]" },
  { id: "cta", sel: "[data-hero-cta], [data-pilot-cta]" },
  { id: "pilot", sel: "[data-hero-pilot]" },
  { id: "nav", sel: 'nav[aria-label="Primary"]' },
  { id: "legend", sel: "[data-plans-legend]" },
];

const PROBE = (targets) => `(()=>{
  const want = ${JSON.stringify(targets)};
  const out = {};
  for (const t of want) {
    const e = document.querySelector(t.sel);
    if (!e) { out[t.id] = { missing: true }; continue; }
    const cs = getComputedStyle(e), r = e.getBoundingClientRect();
    out[t.id] = {
      w: Math.round(r.width * 100) / 100, h: Math.round(r.height * 100) / 100,
      painted: r.width > 0 && r.height > 0,
      family: cs.fontFamily, size: cs.fontSize, lh: cs.lineHeight, weight: cs.fontWeight,
      ls: cs.letterSpacing, opticalSizing: cs.fontOpticalSizing || "(unset)",
      varSettings: cs.fontVariationSettings || "(unset)",
      text: (e.textContent || "").replace(/\\s+/g, " ").trim().slice(0, 60),
    };
  }
  // the legend's tick: its advance width in the legend's own resolved font. A changed fallback
  // face or a notdef box changes this number; identical numbers across the two builds = unchanged.
  const lg = document.querySelector("[data-plans-legend]");
  let tick = null;
  if (lg) {
    const cs = getComputedStyle(lg);
    const c = document.createElement("canvas").getContext("2d");
    c.font = \`\${cs.fontStyle} \${cs.fontWeight} \${cs.fontSize}/\${cs.lineHeight} \${cs.fontFamily}\`;
    tick = { font: c.font, tickW: Math.round(c.measureText("\\u2713").width * 100) / 100,
      refW: Math.round(c.measureText("n").width * 100) / 100,
      presentInText: (lg.textContent || "").includes("\\u2713") };
  }
  const faces = [];
  try { document.fonts.forEach((f) => faces.push(\`\${f.family}|\${f.weight}|\${f.status}\`)); } catch (e) {}
  return { out, tick, faces: faces.sort(), fontsStatus: (document.fonts||{}).status,
    cls: Math.round((window.__cls || 0) * 10000) / 10000,
    bodyChars: (document.body?.innerText || "").length };})()`;

const go = async (url, need) => {
  for (let a = 1; a <= 3; a++) {
    await send("Page.navigate", { url }); await sleep(5200);
    const ok = await ev(`(()=>{const b=document.body; if(!b) return {ok:false,why:"body null"};
      const n=(b.innerText||"").length; if(n<500) return {ok:false,why:"only "+n+" chars"};
      if(!document.querySelector(${JSON.stringify(need)})) return {ok:false,why:"selector missing"};
      return {ok:true};})()`);
    if (ok?.ok) return true;
    console.log(`   retry ${a}/3: ${ok ? ok.why : "no answer"}`);
  }
  return false;
};

const R = { tag: TAG, fixed: FIXED, baseline: BASELINE, builds: {}, runs: {} };
R.builds.fixedStart = await buildOf(FIXED);
R.builds.baselineStart = await buildOf(BASELINE);
console.log(`fixed:    ${R.builds.fixedStart.commit || R.builds.fixedStart.error}`);
console.log(`baseline: ${R.builds.baselineStart.commit || R.builds.baselineStart.error}\n`);

for (const [label, base] of [["fixed", FIXED], ["baseline", BASELINE]]) {
  for (const phase of ["fontsAllowed", "fontsBlocked"]) {
    await send("Network.setBlockedURLs", { urls: phase === "fontsBlocked" ? ["*.woff2", "*.woff", "*.ttf"] : [] });
    for (const w of [390, 1440]) {
      const key = `${label}-${phase}-${w}`;
      await send("Emulation.setDeviceMetricsOverride", { width: w, height: w < 500 ? 844 : 900, deviceScaleFactor: w < 500 ? 2 : 1, mobile: w < 500 });
      if (!(await go(`${base}/es?view=public`, "[data-hero]"))) { R.runs[key] = { FAILED_TO_LOAD: true }; console.log(`${key}: *** FAILED TO LOAD ***`); continue; }
      // fonts.ready resolves in both phases: blocked requests fail fast rather than hang.
      await ev(`(async()=>{try{await document.fonts.ready}catch(e){};await new Promise(r=>setTimeout(r,1200));return 1})()`);
      const o = await ev(PROBE(TARGETS));
      R.runs[key] = o;
      const h1 = o.out?.h1 || {};
      console.log(`${key}: h1 ${h1.w}x${h1.h} | ${String(h1.family).slice(0, 34)} | opsz ${h1.opticalSizing} | CLS ${o.cls} | tickW ${o.tick?.tickW} | faces ${o.faces?.length}`);
    }
  }
}
await send("Network.setBlockedURLs", { urls: [] });
R.builds.fixedEnd = await buildOf(FIXED);
R.builds.baselineEnd = await buildOf(BASELINE);
R.stable = R.builds.fixedStart.commit === R.builds.fixedEnd.commit && R.builds.baselineStart.commit === R.builds.baselineEnd.commit;
console.log(R.stable ? `\nBUILDS STABLE` : `\n*** VOID *** a build moved mid-run`);

// ---- compare fixed against baseline, field by field ----
const diffs = [], missing = [];
const FIELDS = ["w", "h", "family", "size", "lh", "weight", "ls", "opticalSizing", "varSettings"];
let compared = 0;
for (const phase of ["fontsAllowed", "fontsBlocked"]) for (const w of [390, 1440]) {
  const f = R.runs[`fixed-${phase}-${w}`], b = R.runs[`baseline-${phase}-${w}`];
  if (!f || !b || f.FAILED_TO_LOAD || b.FAILED_TO_LOAD) { missing.push(`${phase}-${w}`); continue; }
  for (const t of TARGETS) {
    const a = f.out?.[t.id], c = b.out?.[t.id];
    if (!a || !c) { missing.push(`${phase}-${w}:${t.id}`); continue; }
    if (a.missing || c.missing) { missing.push(`${phase}-${w}:${t.id} (selector found nothing: fixed=${!!a.missing} baseline=${!!c.missing})`); continue; }
    for (const k of FIELDS) { compared++; if (String(a[k]) !== String(c[k])) diffs.push(`${phase}-${w} ${t.id}.${k}: fixed ${JSON.stringify(a[k])} vs baseline ${JSON.stringify(c[k])}`); }
  }
  const ft = f.tick, bt = b.tick;
  if (ft && bt) { compared++; if (ft.tickW !== bt.tickW) diffs.push(`${phase}-${w} tick advance width: fixed ${ft.tickW} vs baseline ${bt.tickW}`);
    if (ft.presentInText !== bt.presentInText) diffs.push(`${phase}-${w} the ✓ in the legend text: fixed ${ft.presentInText} vs baseline ${bt.presentInText}`); }
  if (f.cls !== undefined && b.cls !== undefined) { compared++; if (Math.abs(f.cls - b.cls) > 0.01) diffs.push(`${phase}-${w} CLS: fixed ${f.cls} vs baseline ${b.cls}`); }
}
// A comparison that compared nothing must never read as a pass.
if (!compared) diffs.push("ABORT: nothing was compared - the selectors or the two base URLs are wrong, and an empty diff list here means nothing");

R.verdict = { buildsStable: R.stable, compared, diffCount: diffs.length, diffs, missing };
writeFileSync(`d4-${TAG}.json`, JSON.stringify(R, null, 1));
console.log(`\n--- D-4: ${diffs.length ? "DIFFERENCES" : "IDENTICAL"} | ${compared} values compared`);
diffs.forEach((d) => console.log("   " + d));
if (missing.length) { console.log("   not compared (reported, not silently passed):"); missing.forEach((m) => console.log("     " + m)); }
console.log(`\nwritten d4-${TAG}.json`);
process.exit(0);
