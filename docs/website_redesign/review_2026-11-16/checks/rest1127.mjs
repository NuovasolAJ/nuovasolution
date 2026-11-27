// RV6: the two gaps the follow-up left open, with the right selectors and the section scrolled in.
//  E  the compact report: .rep-card / [data-report-card] - read AFTER scrolling the section into
//     view (my empty read was a not-yet-rendered section, not an empty card).
//  F  Mila's record after the demo run: .demo-record, [data-demo-task-title], .demo-next-value,
//     .demo-outcome-row - does the "Pide"/"Asks for" field carry the 17:00 / 5 pm, and does the
//     task TITLE stay free of a time?
const BASE = process.argv[2];
const OUT = process.argv[3] || "rest-1127.json";
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
const open = async (loc, W, H, MOB) => {
  await send("Emulation.setDeviceMetricsOverride", { width: W, height: H, deviceScaleFactor: MOB ? 2 : 1, mobile: !!MOB });
  for (let a = 1; a <= 3; a++) {
    await send("Page.navigate", { url: `${BASE}/${loc}/` }); await sleep(a === 1 ? 6800 : 8200);
    const c = await ev(`(()=>({len:(document.body.innerText||"").length,h1:!!document.querySelector("h1")}))()`);
    if (c && !c.__error && c.h1 && c.len > 500) return true;
  }
  return false;
};
const res = { probe: "rest1127", base: BASE, pin_start: PIN_START, when: new Date().toISOString(), E: {}, F: {} };

for (const loc of ["es", "en"]) {
  // E : the report, scrolled in and given time to rise
  if (!await open(loc, 1366, 768, 0)) { res.E[loc] = "NOT MEASURED"; continue; }
  await ev(`(()=>{const s=document.getElementById("report")||document.querySelector("[data-report]"); if(s) s.scrollIntoView({block:"center"}); return !!s;})()`);
  await sleep(2600);
  res.E[loc] = await ev(`(()=>{
    const n=(s)=>(s||"").replace(/\\s+/g," ").trim();
    const sec=document.querySelector("[data-report]");
    const cards=[...document.querySelectorAll(".rep-card")].map((e)=>({ idx:e.getAttribute("data-report-card"), figure:n(e.querySelector(".rep-card-figure")?.innerText), insight:n(e.querySelector(".rep-card-insight")?.innerText), next:n(e.querySelector(".rep-card-next")?.innerText), note:n(e.querySelector(".rep-card-note")?.innerText) }));
    return { view: sec?.getAttribute("data-report-view"), declared: sec?.getAttribute("data-report-cards"), count: cards.length, cards,
      head: n(document.querySelector(".rep-paper-title")?.innerText), example: n(document.querySelector("[data-report-example]")?.innerText) };
  })()`);

  // F : Mila's record after the run
  if (!await open(loc, 1366, 768, 0)) { res.F[loc] = "NOT MEASURED"; continue; }
  const clicked = await ev(`(()=>{const a=document.querySelector("[data-hero-cta='task']"); if(!a) return false; a.click(); return true;})()`);
  await sleep(19000);
  res.F[loc] = await ev(`(()=>{
    const n=(s)=>(s||"").replace(/\\s+/g," ").trim();
    const rec=document.querySelector(".demo-record, [data-hero-record]");
    const rows=[...document.querySelectorAll(".demo-record .demo-field, .demo-record .demo-outcome-row, .demo-record [class*='demo-'], [data-hero-record] > div")].map((e)=>n(e.innerText)).filter(Boolean);
    const title=document.querySelector("[data-demo-task-title]");
    const needle = ${JSON.stringify(loc)}==="es" ? /17:00/ : /5\\s*pm|17:00/i;
    return { clicked:${clicked}, recordPresent: !!rec, recordLive: rec?.getAttribute("data-record-live"),
      recordText: n(rec?.innerText).slice(0,520),
      recordHasTime: needle.test(n(rec?.innerText)),
      taskTitle: n(title?.innerText), taskTitleValue: n(title?.querySelector(".demo-next-value")?.innerText),
      taskTitleHasTime: /\\b\\d{1,2}[:.]\\d{2}\\b|\\b\\d{1,2}\\s*pm\\b/i.test(n(title?.querySelector(".demo-next-value")?.innerText)),
      rowsSample: rows.slice(0,10) };
  })()`);
}
res.pin_end = await build(); res.pinned = res.pin_start === res.pin_end;
if (!res.pinned) res.VOID = "build moved - VOID";
await (await import("node:fs")).promises.writeFile(OUT, JSON.stringify(res, null, 1));
console.log(JSON.stringify({ pinned: res.pinned, out: OUT }, null, 1));
process.exit(0);
