// D-1, D-2, D-3 of expected-16-optiona-1120.json, measured in ONE pass on the fixed build.
//
// D-1  the public channel list renders "email" / "e-mail" and never empty (the guard against the
//      discarded (b) edit, which would substitute the empty string into 13 text lines)
// D-2  none of Copy's §7 wording is on the page, while Q-22's line (Copy §5c, teamRoles) stays
// D-3  the plans "replies" row is unchanged against 2342537 in name and cells, both views
//
// Guards, both learned the hard way:
//  - /api/build is read at the START and at the END. If it moved, the run is VOID. A dry run once
//    crossed two deployments mid-pass (a9cc222 -> 7fbb662) and one view came back with a null body.
//  - every navigation is verified as really loaded (body non-null, > 500 chars, required selector
//    present) and retried up to 3 times, so a blank page cannot read as "nothing found = pass".
import { writeFileSync, readFileSync } from "node:fs";

const BASE = process.argv[2];
const TAG = process.argv[3] || "untagged";
const EXP = JSON.parse(readFileSync(new URL("./expected-16-optiona-1120.json", import.meta.url), "utf8"));
if (!BASE) { console.error("usage: node d123.mjs <base-url> <tag>"); process.exit(2); }

const CDP = 9477, sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const buildOf = async () => { try { return await (await fetch(`${BASE}/api/build`)).json(); } catch (e) { return { error: String(e).slice(0, 120) }; } };

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
await send("Page.enable");

const wake = () => ev(`(async()=>{var y=0,s=0;while(y<document.documentElement.scrollHeight){scrollTo({top:y,behavior:"instant"});await new Promise(r=>setTimeout(r,120));y+=600;s++;if(s>400)break;}scrollTo({top:0,behavior:"instant"});await new Promise(r=>setTimeout(r,400));return s})()`);

/** Navigate and prove the page is really there. Returns false after 3 failed attempts. */
const go = async (url, mustSee) => {
  for (let attempt = 1; attempt <= 3; attempt++) {
    await send("Page.navigate", { url });
    await sleep(5200);
    const ok = await ev(`(()=>{const b=document.body; if(!b) return {ok:false,why:"body null"};
      const t=(b.innerText||"").length; if(t<500) return {ok:false,why:"only "+t+" chars"};
      ${mustSee ? `if(!document.querySelector(${JSON.stringify(mustSee)})) return {ok:false,why:"selector missing: ${mustSee}"};` : ""}
      return {ok:true,chars:t};})()`);
    if (ok && ok.ok) return ok;
    console.log(`   retry ${attempt}/3 on ${url}: ${ok ? ok.why : "no answer"}`);
  }
  return false;
};

const PROBE = `(()=>{
  const SKIP = {SCRIPT:1,STYLE:1,NOSCRIPT:1,TEMPLATE:1};
  const txt = (e) => { if(!e) return "";
    const w=document.createTreeWalker(e, NodeFilter.SHOW_TEXT, { acceptNode: n =>
      SKIP[n.parentElement && n.parentElement.tagName] ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT });
    let s=""; while(w.nextNode()) s += w.currentNode.nodeValue + " ";
    return s.replace(/[\\s\\u00a0\\u202f]+/g," ").trim(); };
  const page = txt(document.body);

  // the plans "replies" row: its name and its three cells
  const rows=[...document.querySelectorAll("[data-plan-row]")];
  const replyRow = rows.find(r => /Respuestas en espa|Replies in Spanish/.test(txt(r))) || null;
  const rowCells = replyRow ? [...replyRow.querySelectorAll("[data-plan-cell]")].map(c => ({
    state: c.getAttribute("data-plan-cell"), word: txt(c), aria: c.getAttribute("aria-label") || "",
    painted: (()=>{const b=c.getBoundingClientRect(); return b.width>0 && b.height>0;})() })) : [];
  const rowName = replyRow ? txt(replyRow).slice(0,160) : null;
  // Whether the ROW itself is painted. If the table sits inside a closed fold the cells are not
  // painted for a legitimate reason, and an unpainted cell must then be reported, not failed.
  const rowPainted = replyRow ? (()=>{const b=replyRow.getBoundingClientRect(); return b.width>0 && b.height>0;})() : false;

  // holes: an element whose OWN text has a space before a comma or period. Reported, not failed:
  // text-node concatenation across elements can produce a spurious space.
  const holes=[];
  for (const e of document.querySelectorAll("p,li,span,h1,h2,h3,h4,div,td,th,dd,dt,figcaption,a,button")) {
    if (e.children.length) continue;                 // leaf elements only
    const t = txt(e); if (!t) continue;
    if (/\\S\\s+[,.](\\s|$)/.test(t) || /\\s{2,}/.test(t)) holes.push({ tag: e.tagName, t: t.slice(0,140) });
  }
  const meta = (document.querySelector('meta[name="description"]')||{}).content || "";
  return { page, pageChars: page.length, rowName, rowPainted, rowCells, holes: holes.slice(0,40), holeCount: holes.length, meta,
    tokenVisible: page.includes("\\u27e6") || page.includes("\\u27e7") };})()`;

const R = { tag: TAG, base: BASE, buildStart: await buildOf(), runs: {}, verdicts: {} };
console.log(`build at start: ${R.buildStart.commit || R.buildStart.error}`);

const ROUTES = [
  { path: "", need: "[data-plan-row]" },
  { path: "/faq", need: null },
];

for (const loc of ["es", "en"]) {
  for (const view of ["target", "public"]) {
    for (const r of ROUTES) {
      const url = `${BASE}/${loc}${r.path}?view=${view}`;
      const key = `${loc}${r.path || "/"}-${view}`;
      const loaded = await go(url, r.need);
      if (!loaded) { R.runs[key] = { FAILED_TO_LOAD: true }; console.log(`${key}: *** FAILED TO LOAD - not counted as a pass ***`); continue; }
      await wake();
      await ev(`(async()=>{for(const d of document.querySelectorAll("details")) d.open=true;
        for(const b of document.querySelectorAll('[aria-expanded="false"]')) b.click();
        await new Promise(r=>setTimeout(r,1200));return 1})()`);
      const o = await ev(PROBE);
      R.runs[key] = o;
      console.log(`${key}: ${o.pageChars} chars | row ${o.rowName ? JSON.stringify(o.rowName.slice(0,60)) : "(not on this route)"} | cells ${o.rowCells.map(c=>c.state).join(",") || "-"} | holes ${o.holeCount} | token ${o.tokenVisible}`);
    }
  }
}

R.buildEnd = await buildOf();
R.stable = R.buildStart.commit && R.buildStart.commit === R.buildEnd.commit;
console.log(R.stable ? `\nBUILD STABLE: ${R.buildStart.commit}` : `\n*** VOID *** ${R.buildStart.commit} -> ${R.buildEnd.commit}`);

// ---- verdicts ----
const anyFailedLoad = Object.entries(R.runs).filter(([, v]) => v.FAILED_TO_LOAD).map(([k]) => k);
const allText = Object.fromEntries(Object.entries(R.runs).filter(([, v]) => !v.FAILED_TO_LOAD).map(([k, v]) => [k, v.page || ""]));
const has = (key, s) => (allText[key] || "").includes(s);

// D-1
const d1 = { fails: [], holeReview: [] };
for (const [k, t] of Object.entries(allText)) {
  const loc = k.startsWith("es") ? "es" : "en";
  const isPublic = k.endsWith("-public");
  const word = isPublic ? EXP["D-1_channelListWhole"].publicChannelWord[loc] : null;
  for (const bad of EXP["D-1_channelListWhole"].mustNotAppear) if (t.includes(bad)) d1.fails.push(`${k}: forbidden "${bad}"`);
  if (isPublic && word && !t.includes(word)) d1.fails.push(`${k}: the public channel word "${word}" is nowhere on the page`);
}
for (const [k, v] of Object.entries(R.runs)) if (v.holes?.length) d1.holeReview.push({ run: k, n: v.holeCount, sample: v.holes.slice(0, 6) });
for (const [k, v] of Object.entries(R.runs)) if (!v.FAILED_TO_LOAD && v.meta !== undefined && /\s[,.]/.test(v.meta)) d1.fails.push(`${k}: META DESCRIPTION has a hole: ${JSON.stringify(v.meta.slice(0,120))}`);

// D-2
const d2 = { fails: [] };
for (const [k, t] of Object.entries(allText)) {
  for (const bad of EXP["D-2_copySection7Absent"].mustNotAppear) if (t.includes(bad)) d2.fails.push(`${k}: Copy §7 wording present: "${bad}"`);
}
for (const loc of ["es", "en"]) {
  const gate = EXP["D-2_copySection7Absent"].mustStillAppear.gate[loc];
  const k = `${loc}/faq-public`;
  if (allText[k] !== undefined && !has(k, gate)) d2.fails.push(`${k}: Q-22's gate line is MISSING: "${gate}"`);
}

// D-3
const d3 = { fails: [], seen: {} };
for (const [k, v] of Object.entries(R.runs)) {
  if (v.FAILED_TO_LOAD || !v.rowName) continue;
  const loc = k.startsWith("es") ? "es" : "en";
  const view = k.endsWith("-public") ? "public" : "target";
  const want = EXP["D-3_plansRowUnchanged"][view];
  d3.seen[k] = { name: v.rowName, cells: v.rowCells.map((c) => c.state) };
  if (!v.rowName.includes(want.nameContains[loc])) d3.fails.push(`${k}: row name does not contain "${want.nameContains[loc]}" - got ${JSON.stringify(v.rowName.slice(0,90))}`);
  const cells = v.rowCells.map((c) => c.state);
  if (cells.length !== 3) d3.fails.push(`${k}: expected 3 cells, got ${cells.length}`);
  else if (cells.join(",") !== want.cells.join(",")) d3.fails.push(`${k}: cells ${cells.join(",")} instead of ${want.cells.join(",")}`);
  // An unpainted cell is only a defect when the ROW is painted. If the table sits inside a closed
  // fold, nothing is painted for a legitimate reason - that is reported, not failed.
  if (v.rowPainted && v.rowCells.some((c) => !c.painted)) d3.fails.push(`${k}: the row is painted but a cell of it is not`);
  else if (!v.rowPainted) (d3.notPainted ||= []).push(k);
}

// A check that examined nothing must never read as a pass. lost16.mjs once returned "0 lost"
// because its accessor did not match the file shape; that is the same class of error.
if (!Object.keys(d3.seen).length) d3.fails.push("ABORT: the replies row was found on NO run - the selector or the route is wrong, and 0 failures here means nothing");
if (!Object.keys(allText).length) d1.fails.push("ABORT: no route produced any text at all - nothing was examined");

R.verdicts = { buildStable: R.stable, failedToLoad: anyFailedLoad, D1: d1, D2: d2, D3: d3 };
const total = d1.fails.length + d2.fails.length + d3.fails.length;
writeFileSync(`d123-${TAG}.json`, JSON.stringify(R, null, 1));

console.log(`\n--- D-1 channel list whole: ${d1.fails.length ? "FAIL" : "PASS"}`);
d1.fails.forEach((f) => console.log("   " + f));
if (d1.holeReview.length) { console.log("   holes to judge by hand (not auto-failed):"); d1.holeReview.forEach((h) => console.log(`     ${h.run}: ${h.n} - ${JSON.stringify(h.sample)}`)); }
console.log(`--- D-2 Copy §7 absent, Q-22 present: ${d2.fails.length ? "FAIL" : "PASS"}`);
d2.fails.forEach((f) => console.log("   " + f));
console.log(`--- D-3 plans row unchanged: ${d3.fails.length ? "FAIL" : "PASS"}`);
d3.fails.forEach((f) => console.log("   " + f));
if (d3.notPainted?.length) console.log(`   row not painted (closed fold is a legitimate reason - judged by hand): ${d3.notPainted.join(", ")}`);
if (!Object.keys(d3.seen).length) console.log("   NOTE: the row was not found on any run - that is not a pass, it means the selector or the route is wrong");
console.log(`\n${total} failures | ${anyFailedLoad.length} routes failed to load | build ${R.stable ? "stable" : "MOVED - RUN IS VOID"}`);
console.log(`written d123-${TAG}.json`);
process.exit(0);
