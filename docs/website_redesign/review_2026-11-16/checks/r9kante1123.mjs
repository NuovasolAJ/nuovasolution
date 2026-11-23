// R-9 residual (RV6, 23.11.): Redesign's fix restores the visitor's note and swaps the stored
// subject for THIS form's subject -- but only when the stored message STARTS WITH the stored
// subject (pilot-request-form.tsx:49). A visitor who types the note IN FRONT of the prefill
// fails that test, so the old way's / old language's subject rides along inside the text.
//
// Derived from reading the fix, not yet measured. This probe settles it. Two runs:
//   A  Essential way, note typed ABOVE the prefill, then the language switch
//   B  Essential way, note typed ABOVE the prefill, then the Growth way in the same language
// Negative control: the SAME two runs with the note typed BELOW the prefill must come back clean
// (that is what Redesign measured 10/10), so a failure in A/B is the caret position, not the fix.
//
// The note is entered with real key input after a real tap, and the caret is moved with
// setSelectionRange -- a caret move, not a value mutation, so no programmatic-setter artifact.
const BASE = process.argv[2];
const FROM = process.argv[3] || "es";
const W = Number(process.argv[4] || 390), H = Number(process.argv[5] || 844);
const OUT = process.argv[6] || `r9kante-${FROM}-${W}.json`;
const TO = FROM === "es" ? "en" : "es";
const NOTE = "nota R9 arriba";
// the Essential subject of the form we LEAVE, in its own language
const SOURCE_SUBJECT_MARKS = FROM === "es" ? [/Prueba gratuita/i, /14 d[ií]as/i] : [/Free trial/i, /14 days/i];
const CDP = 9477, sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const list = await (await fetch(`http://127.0.0.1:${CDP}/json/list`)).json();
const ws = new WebSocket(list.find((t) => t.type === "page").webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener("open", r));
let id = 0; const pend = new Map();
ws.addEventListener("message", (e) => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } });
const send = (m, p = {}) => new Promise((r) => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method: m, params: p })); });
const ev = async (x) => { const r = await send("Runtime.evaluate", { expression: x, returnByValue: true, awaitPromise: true });
  if (r.result?.exceptionDetails) return { __error: (r.result.exceptionDetails.exception?.description || "").slice(0, 250) };
  return r.result?.result?.value; };
const build = async () => { try { const r = await fetch(`${BASE}/api/build`, { signal: AbortSignal.timeout(20000) }); const j = await r.json(); return `${j.commit?.slice(0, 7)}/${j.deployment}`; } catch { return "UNREACHABLE"; } };
const PIN = await build();
if (PIN === "UNREACHABLE") { console.log("ABORT: build endpoint unreachable - nothing was compared, this is NOT a pass"); process.exit(2); }
await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride", { width: W, height: H, deviceScaleFactor: 2, mobile: true });
await send("Emulation.setTouchEmulationEnabled", { enabled: true, maxTouchPoints: 5 });

const open = async (loc, interes, plan) => {
  for (let a = 1; a <= 3; a++) {
    await send("Page.navigate", { url: `${BASE}/${loc}/contact?interes=${interes}&plan=${plan}` });
    await sleep(a === 1 ? 5800 : 7400);
    const c = await ev(`(()=>({f:!!document.querySelector("[name='message']"),len:(document.body.innerText||"").length}))()`);
    if (c && !c.__error && c.f && c.len > 300) return true;
  }
  return false;
};

// tap the message field, put the caret where we want it, type with real key input
const typeNote = async (where) => {
  const box = await ev(`(()=>{const e=document.querySelector("[name='message']"); if(!e) return null;
    e.scrollIntoView({block:"center",behavior:"instant"});
    const r=e.getBoundingClientRect();
    return {cx:Math.round(r.left+r.width/2),cy:Math.round(r.top+r.height/2),prefill:e.value};})()`);
  if (!box) return null;
  await send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: box.cx, y: box.cy, radiusX: 8, radiusY: 8 }] });
  await send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  await sleep(300);
  const focused = await ev(`(()=>{const a=document.activeElement;return a?(a.getAttribute("name")||a.tagName.toLowerCase()):"none";})()`);
  // caret: 0 for "above the prefill", end for "below it"
  await ev(`(()=>{const e=document.querySelector("[name='message']");
    const p=${where === "above" ? "0" : "e.value.length"}; e.setSelectionRange(p,p); return p;})()`);
  await send("Input.insertText", { text: where === "above" ? NOTE + " " : " " + NOTE });
  await sleep(300);
  const val = await ev(`((document.querySelector("[name='message']")||{}).value||"")`);
  return { focused, prefill: box.prefill, val };
};

const tapLanguage = async () => {
  const loc = await ev(`(async()=>{
    const other="/"+${JSON.stringify(TO)};
    const cands=()=>[...document.querySelectorAll("a[href]")].filter(x=>{const h=x.getAttribute("href")||"";
      return h===other||h.startsWith(other+"/")||h.startsWith(other+"?");});
    const vis=()=>cands().filter(x=>{const r=x.getBoundingClientRect();return r.width>0&&r.height>0;})[0];
    let a=vis();
    if(!a){ const b=[...document.querySelectorAll("button")].find(x=>/men[uú]|menu/i.test(x.getAttribute("aria-label")||x.innerText||""));
      if(b){ b.click(); await new Promise(r=>setTimeout(r,900)); a=vis(); } }
    if(!a) return {found:false};
    a.scrollIntoView({block:"center",behavior:"instant"}); await new Promise(r=>setTimeout(r,350));
    const r=a.getBoundingClientRect();
    return {found:true,href:a.getAttribute("href"),cx:Math.round(r.left+r.width/2),cy:Math.round(r.top+r.height/2)};})()`);
  if (!loc?.found) return null;
  await send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: loc.cx, y: loc.cy, radiusX: 11, radiusY: 11 }] });
  await send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  await sleep(3600);
  return loc.href;
};

const readForm = async () => ev(`(()=>{const g=(n)=>((document.querySelector("[name='"+n+"']")||{}).value||"");
  return {url:location.pathname+location.search,interest:g("interest"),plan:new URLSearchParams(location.search).get("plan"),
    message:g("message"),agency:g("agency")};})()`);

const R = { pin: PIN, from: FROM, to: TO, viewport: `${W}x${H}`, runs: [] };
console.log(`\n######## R-9 residual: where the note sits in the message  ${FROM}  ${W}x${H}  build ${PIN}`);

for (const where of ["above", "below"]) {
  for (const kind of ["language", "way"]) {
    const tag = `note ${where} the prefill -> ${kind === "language" ? `switch ${FROM}->${TO}` : "Growth way, same language"}`;
    if (!(await open(FROM, "trial", "essential"))) { console.log(`\n  ${tag}: ABORT - form never loaded, NOT a pass`); R.runs.push({ where, kind, loaded: false }); continue; }
    // the agency field too, so we can see the restore ran at all
    const ag = await ev(`(()=>{const e=document.querySelector("[name='agency']"); if(!e) return null;
      e.scrollIntoView({block:"center",behavior:"instant"});const r=e.getBoundingClientRect();
      return {cx:Math.round(r.left+r.width/2),cy:Math.round(r.top+r.height/2)};})()`);
    if (ag) { await send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: ag.cx, y: ag.cy, radiusX: 8, radiusY: 8 }] });
      await send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] }); await sleep(260);
      await send("Input.insertText", { text: "Inmobiliaria RV6" }); await sleep(220); }
    const t = await typeNote(where);
    if (!t || !t.val.includes(NOTE)) { console.log(`\n  ${tag}: the note did not arrive by key input (focus=${JSON.stringify(t?.focused)}) - inconclusive, NOT a pass`);
      R.runs.push({ where, kind, typed: t, inconclusive: true }); continue; }

    let via = null;
    if (kind === "language") { via = await tapLanguage(); if (!via) { console.log(`\n  ${tag}: language link not reachable - NOT a pass`); R.runs.push({ where, kind, switched: false }); continue; } }
    else { await open(FROM, "demo", "growth"); via = `/${FROM}/contact?interes=demo&plan=growth`; }

    const after = await readForm();
    // what must be true: the note survives, and NO subject of the old way / old language is in the text
    // after EITHER move the subject of the form we LEFT must be gone: the way changed, or the language did.
    // The marks are therefore the SOURCE language's Essential subject -- never the target's, or the correct
    // swap ("Prueba gratuita ..." -> "Free trial ...") would read as a failure.
    const noteKept = (after?.message || "").includes(NOTE);
    const strayMark = SOURCE_SUBJECT_MARKS.filter((re) => re.test(after?.message || "")).map(String);
    R.runs.push({ where, kind, via, typedValue: t.val, prefill: t.prefill, after, noteKept, strayMark });

    console.log(`\n  ${tag}`);
    console.log(`     prefill was      ${JSON.stringify(t.prefill)}`);
    console.log(`     typed field was  ${JSON.stringify(t.val)}`);
    console.log(`     after the move   ${after?.url}`);
    console.log(`       interest=${JSON.stringify(after?.interest)} plan=${JSON.stringify(after?.plan)} agency=${JSON.stringify(after?.agency)}`);
    console.log(`       message=${JSON.stringify(after?.message)}`);
    console.log(`     the note survived:                      ${noteKept ? "YES" : "*** NO"}`);
    console.log(`     a foreign way's/language's subject rode along: ${strayMark.length ? "*** YES " + strayMark.join(" ") : "no"}`);
  }
}

const PIN2 = await build(); R.pinEnd = PIN2;
const aboveBad = R.runs.filter((r) => r.where === "above" && r.strayMark?.length).length;
const belowBad = R.runs.filter((r) => r.where === "below" && r.strayMark?.length).length;
console.log(`\nRESULT  note ABOVE the prefill, runs carrying a foreign subject: ${aboveBad} of 2`);
console.log(`        note BELOW the prefill (Redesign's measured case):      ${belowBad} of 2  <- must be 0, else the probe is wrong, not the page`);
console.log(`        build start ${PIN}  end ${PIN2}  ${PIN === PIN2 ? "STABLE" : "*** MOVED - VOID ***"}`);
const fs = await import("node:fs"); fs.writeFileSync(OUT, JSON.stringify(R, null, 1));
process.exit(PIN === PIN2 ? 0 : 4);
