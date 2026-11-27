// RV6 follow-up on the four things the six-points probe left open or measured wrongly.
//  A  .at-chat-head: ALL of them, each one's own background - the neutral rule names the selector,
//     a later rule in the same file overrides it. Counted, not assumed from one querySelector.
//  B  .hf-edge: its size at every window where it is SHOWN, and its fold position WITHOUT the
//     preview furniture (the six-points run measured it with the strips, which is the same confound
//     that has been corrected for the fold all week).
//  C  the 17:00: my body regex matched the EXAMPLE AGENCY'S OFFICE HOURS, not Mila's record, and
//     the EN record says "from 5 pm" - so the check compared nothing. Measured where it belongs:
//     her turn 3 and the "Pide"/"Asks for" field of her record, and NOT in any title.
//  D  point 6: the task cards are .at-card / [data-task], not the selectors I guessed.
const BASE = process.argv[2];
const OUT = process.argv[3] || "nach-1127.json";
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
if (PIN_START === "UNREACHABLE") { console.log("ABORT: build endpoint unreachable"); process.exit(2); }
await send("Page.enable");
const open = async (loc, W, H, MOB) => {
  await send("Emulation.setDeviceMetricsOverride", { width: W, height: H, deviceScaleFactor: MOB ? 2 : 1, mobile: !!MOB });
  await send("Emulation.setTouchEmulationEnabled", { enabled: !!MOB, maxTouchPoints: MOB ? 5 : 0 });
  for (let a = 1; a <= 3; a++) {
    await send("Page.navigate", { url: `${BASE}/${loc}/` }); await sleep(a === 1 ? 6800 : 8200);
    const c = await ev(`(()=>({len:(document.body.innerText||"").length,h1:!!document.querySelector("h1")}))()`);
    if (c && !c.__error && c.h1 && c.len > 500) return true;
  }
  return false;
};
const strip = `(()=>{let n=0;for(const s of ["[data-env]","[data-preview-switches]"]){for(const e of document.querySelectorAll(s)){e.remove();n++;}}return n;})()`;
const res = { probe: "nach1127", base: BASE, pin_start: PIN_START, when: new Date().toISOString(), A: {}, B: {}, C: {}, D: {} };

// ---------- A + D : 1366, both locales ----------
for (const loc of ["es", "en"]) {
  if (!await open(loc, 1366, 768, 0)) { res.A[loc] = "NOT MEASURED"; continue; }
  await ev(`(()=>{for(const e of document.querySelectorAll(".at-card"))e.scrollIntoView({block:"center"});window.scrollTo(0,0);})()`); await sleep(1200);
  res.A[loc] = await ev(`(()=>{
    const n=(s)=>(s||"").replace(/\\s+/g," ").trim();
    const heads=[...document.querySelectorAll(".at-chat-head")].map((e,i)=>{const cs=getComputedStyle(e);const svg=e.querySelector("svg");return {i,bg:cs.backgroundColor,color:cs.color,mark:svg?getComputedStyle(svg).color:null,text:n(e.innerText)};});
    const others=[...document.querySelectorAll(".hf-scene-msg .hf-scene-label, .demo-chat-head")].map((e)=>({sel:e.className,bg:getComputedStyle(e).backgroundColor,color:getComputedStyle(e).color}));
    return { atHeadCount: heads.length, atHeads: heads, otherHeads: others };
  })()`);
  res.D[loc] = await ev(`(()=>{
    const n=(s)=>(s||"").replace(/\\s+/g," ").trim();
    const cards=[...document.querySelectorAll(".at-card")].map((e)=>({task:e.getAttribute("data-task"),sticky:getComputedStyle(e).position,proof:e.querySelector("[data-task-proof]")?.getAttribute("data-task-proof")||null,lines:n(e.innerText).slice(0,90)}));
    const rep=[...document.querySelectorAll("[data-report-card], .rep-card")].map((e)=>n(e.innerText).slice(0,70));
    return { cardCount: cards.length, cards, reportCards: rep };
  })()`);
}

// ---------- B : the hint, with and without the furniture, at every window ----------
for (const [W, H, MOB] of [[360, 640, 1], [375, 667, 1], [390, 844, 1], [414, 896, 1], [1280, 720, 0], [1366, 768, 0], [1440, 900, 0]]) {
  if (!await open("es", W, H, MOB)) { res.B[`${W}x${H}`] = "NOT MEASURED"; continue; }
  await ev(`window.scrollTo(0,0)`); await sleep(450);
  const m = `(()=>{const e=document.querySelector(".hf-edge"); if(!e) return {present:false}; const r=e.getBoundingClientRect(); const cs=getComputedStyle(e); return { shown: cs.display!=="none", w:r.width, h:r.height, bottom:Math.round(r.bottom), vh:innerHeight, inFold: cs.display!=="none" && r.bottom <= innerHeight+1, minSide: Math.min(r.width,r.height) };})()`;
  const withF = await ev(m);
  await ev(strip); await sleep(900); await ev(`window.scrollTo(0,0)`); await sleep(350);
  const noF = await ev(m);
  res.B[`${W}x${H}`] = { with: withF, without: noF, under44: noF.shown && noF.minSide < 44 };
  console.error(`${W}x${H}: shown=${noF.shown} ${noF.w}x${noF.h} inFold(without)=${noF.inFold} inFold(with)=${withF.inFold}`);
}

// ---------- C : where the 17:00 / 5 pm stands, after the demo run ----------
for (const loc of ["es", "en"]) {
  if (!await open(loc, 1366, 768, 0)) { res.C[loc] = "NOT MEASURED"; continue; }
  const clicked = await ev(`(()=>{const a=document.querySelector("[data-hero-cta='task']"); if(!a) return false; a.click(); return true;})()`);
  await sleep(19000);
  res.C[loc] = await ev(`(()=>{
    const n=(s)=>(s||"").replace(/\\s+/g," ").trim();
    const needle = ${JSON.stringify(loc)} === "es" ? /17:00/ : /5\\s*pm/i;
    // every TITLE-shaped element
    const titles=[...document.querySelectorAll("h1,h2,h3,h4,h5,[class*='title'],[class*='-head']")].map((e)=>n(e.innerText)).filter(Boolean);
    const inTitle = titles.filter((t)=>needle.test(t) && !/10:00|14:00|20:00|11:00|12:00/.test(t));
    // Mila's turns and her record inside the demo
    const turns=[...document.querySelectorAll(".demo-chat-in, .demo-chat-out, [data-demo-turn]")].map((e)=>n(e.innerText)).filter(Boolean);
    const record=[...document.querySelectorAll(".demo-record li, .demo-record-row, [data-demo-record] li, [data-demo-record] div")].map((e)=>n(e.innerText)).filter(Boolean);
    const endTitle = n((document.querySelector("[data-demo-end], .demo-end-title, .demo-task-title")||{}).innerText);
    return { clicked:${clicked},
      inAnyTitle: inTitle,
      turnsWithIt: turns.filter((t)=>needle.test(t)),
      recordWithIt: record.filter((t)=>needle.test(t)),
      recordRows: record.slice(0,14),
      endTitle,
      endTitleHasTime: /\\b\\d{1,2}[:.]\\d{2}\\b|\\b\\d{1,2}\\s*pm\\b/i.test(endTitle) };
  })()`);
}

res.pin_end = await build();
res.pinned = res.pin_start === res.pin_end;
if (!res.pinned) res.VOID = "build moved - VOID";
await (await import("node:fs")).promises.writeFile(OUT, JSON.stringify(res, null, 1));
console.log(JSON.stringify({ pinned: res.pinned, out: OUT }, null, 1));
process.exit(0);
