// Point 16 on the fixed build: the section's cards, the eyebrow (E-P), the day story, and the zero hits,
// in BOTH views, at 390 and 1440, in ES and EN.
// NOTE: never put a backslash-s class inside page code sent through a shell heredoc - a heredoc once ate the
// backslash and silently stripped every lowercase "s". This file is written with the Write tool and all
// whitespace normalisation happens in Node, below.
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
  const ex = r.result?.exceptionDetails;
  if (ex) return { __error: (ex.exception?.description || ex.text || "").slice(0, 300) };
  return r.result?.result?.value;
};
await send("Page.enable");
const shot = async n => { const r = await send("Page.captureScreenshot", { format: "png" }); const d = r.result?.result?.data || r.result?.data; if (d) writeFileSync(`p16-${TAG}-${n}.png`, Buffer.from(d, "base64")); };
// the settled-height traversal: re-read the end at EVERY step, or the lower sections never settle
const wake = () => ev(`(async()=>{var y=0,steps=0;
  while(y<document.documentElement.scrollHeight){scrollTo({top:y,behavior:"instant"});
  await new Promise(r=>setTimeout(r,120));y+=600;steps++;if(steps>300)break;}
  scrollTo({top:0,behavior:"instant"});await new Promise(r=>setTimeout(r,400));
  return {steps:steps,h:document.documentElement.scrollHeight}})()`);

// A run that straddles two deployments is worthless - the alias moved under me once mid-run and
// one view came back with a null body. Every navigation is checked for a LOADED page carrying the
// section, and the build is pinned at the start and verified at the end.
const buildAtStart = await (await fetch(`${BASE}/api/build`)).json();
const R = { tag: TAG, base: BASE, build: buildAtStart, runs: {}, notLoaded: [] };
const go = async (url, need = "[data-strengths]", ms = 5200) => {
  for (let attempt = 1; attempt <= 3; attempt++) {
    await send("Page.navigate", { url });
    await sleep(ms);
    const ready = await ev(`!!document.body && document.body.textContent.length > 500 && !!document.querySelector(${JSON.stringify(need)})`);
    if (ready === true) return true;
    console.log(`  ! ${url} not loaded (attempt ${attempt}) - retrying`);
    await sleep(2500);
  }
  return false;
};

const PROBE = `(()=>{
  const txt = e => (e && e.textContent) || "";
  const painted = e => { if(!e) return false; const r=e.getBoundingClientRect(); const cs=getComputedStyle(e);
    return r.width>0 && r.height>0 && cs.visibility!=="hidden" && cs.display!=="none" && parseFloat(cs.opacity||"1")>0.05; };
  const sec = document.querySelector("[data-strengths]");
  const eyebrowEl = document.querySelector("[data-strengths-eyebrow]");
  const cards = [...document.querySelectorAll("[data-strength]")].map(c => ({
    key: c.getAttribute("data-strength"),
    state: c.getAttribute("data-strength-state"),
    chip: txt(c.querySelector("[data-strength-chip]")),
    chipState: c.querySelector("[data-strength-chip]") ? c.querySelector("[data-strength-chip]").getAttribute("data-strength-chip") : null,
    title: txt(c.querySelector(".ch-name")),
    line: txt(c.querySelector(".ch-line")),
    linePainted: painted(c.querySelector(".ch-line")),
    phone: txt(c.querySelector(".ch-core")),
    phonePainted: painted(c.querySelector(".ch-core")),
    examples: [...c.querySelectorAll(".ch-examples li")].map(txt),
    examplesPainted: [...c.querySelectorAll(".ch-examples li")].filter(painted).length,
    mark: txt(c.querySelector(".ch-mark")),
    markPainted: painted(c.querySelector(".ch-mark"))
  }));
  const day = document.querySelector("[data-strength-day]");
  const compactEl = document.querySelector("[data-day-compact]");
  return {
    sectionFound: !!sec,
    soonFlag: sec ? sec.getAttribute("data-strengths-soon") : null,
    eyebrow: txt(eyebrowEl),
    h2: txt(document.querySelector("#st-h")),
    afterGrowth: txt(document.querySelector(".st-after")),
    cards: cards,
    dayForm: day ? day.getAttribute("data-strength-day-form") : null,
    dayTitle: txt(document.querySelector(".st-day-title")),
    dayLine: txt(document.querySelector(".st-day-line")),
    compact: txt(compactEl),
    compactPainted: painted(compactEl),
    stations: [...document.querySelectorAll("[data-day-step]")].map(s => ({
      time: s.getAttribute("data-day-step"),
      live: s.getAttribute("data-day-step-live"),
      text: txt(s.querySelector(".st-day-text")),
      timeText: txt(s.querySelector(".st-day-time")),
      painted: painted(s)
    })),
    stationsPainted: [...document.querySelectorAll("[data-day-step]")].filter(painted).length,
    dayMark: txt(document.querySelector(".st-day-mark")),
    heroSub: txt(document.querySelector("[data-hero-lead]")),
    body: document.body.textContent || ""
  };})()`;

for (const loc of ["es", "en"]) {
  for (const view of ["target", "public"]) {
    for (const [w, h] of [[390, 844], [1440, 900]]) {
      const label = `${loc}-${view}-${w}`;
      const mob = w < 500;
      await send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: mob ? 2 : 1, mobile: mob });
      const loaded = await go(`${BASE}/${loc}?view=${view}`);
      if (!loaded) { R.notLoaded.push(label); console.log(`${label} | NOT LOADED after 3 attempts - not measured`); continue; }
      const trav = await wake();
      const r = await ev(PROBE);
      R.runs[label] = { traversal: trav, ...r };
      if (loc === "es") { await ev(`document.querySelector("[data-strengths]").scrollIntoView({block:"start",behavior:"instant"})`); await sleep(900); await shot(label); }
      console.log(label, "| section", r.sectionFound, "| soon", r.soonFlag, "| cards", (r.cards || []).length, "| stations painted", r.stationsPainted, "| steps", trav && trav.steps);
    }
  }
}
const endCommit = (await (await fetch(`${BASE}/api/build`)).json()).commit;
R.buildAtEnd = endCommit;
R.oneBuild = endCommit === buildAtStart.commit;
writeFileSync(`p16a-${TAG}.json`, JSON.stringify(R, null, 1));
console.log("\nwritten p16a-" + TAG + ".json");
console.log(R.oneBuild
  ? `BUILD STABLE through the run: ${endCommit.slice(0, 7)}`
  : `*** VOID: the alias moved during the run, ${buildAtStart.commit.slice(0, 7)} -> ${endCommit.slice(0, 7)}. Repeat on one build. ***`);
if (R.notLoaded.length) console.log("NOT LOADED: " + R.notLoaded.join(", "));
process.exit(0);
