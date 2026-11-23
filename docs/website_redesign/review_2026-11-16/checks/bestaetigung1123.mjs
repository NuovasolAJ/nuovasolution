// Stage 2 of the path probe: follow each main button THROUGH THE FORM TO ITS CONFIRMATION, which
// the owner's brief asks for explicitly ("jeden Hauptbutton bis zur Bestätigung auf Staging").
// Rules kept: test submissions only to a deliverable address, never test.nuovasolution.com; no
// tokens or full confirmation links printed; a step that produced nothing is reported as a
// failure, never as a pass.
const BASE = process.argv[2];
const LOC = process.argv[3] || "es";
const W = Number(process.argv[4] || 390), H = Number(process.argv[5] || 844);
const OUT = process.argv[6] || `conf-${LOC}-${W}.json`;
const MAIL = "ajdg.private+rv4-1123-" + LOC + W + "@gmail.com";
const CDP = 9477, sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const list = await (await fetch(`http://127.0.0.1:${CDP}/json/list`)).json();
const ws = new WebSocket(list.find((t) => t.type === "page").webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener("open", r));
let id = 0; const pend = new Map();
ws.addEventListener("message", (e) => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } });
const send = (m, p = {}) => new Promise((r) => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method: m, params: p })); });
const ev = async (x) => {
  const r = await send("Runtime.evaluate", { expression: x, returnByValue: true, awaitPromise: true });
  if (r.result?.exceptionDetails) return { __error: (r.result.exceptionDetails.exception?.description || "").slice(0, 300) };
  return r.result?.result?.value;
};
const build = async () => { try { const r = await fetch(`${BASE}/api/build`, { signal: AbortSignal.timeout(20000) }); const j = await r.json(); return `${j.commit?.slice(0, 7)}/${j.deployment}`; } catch { return "UNREACHABLE"; } };
const PIN = await build();
if (PIN === "UNREACHABLE") { console.log("ABORT: build endpoint unreachable"); process.exit(2); }

await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride", { width: W, height: H, deviceScaleFactor: 2, mobile: true });
await send("Emulation.setTouchEmulationEnabled", { enabled: true, maxTouchPoints: 5 });

const WAYS = [
  ["trial", "essential", "the free trial"],
  ["demo", "growth", "the Growth demo"],
  ["talk", "enterprise", "the Enterprise conversation"],
  ["contratar", "essential", "signing up for Essential"],
];
const RES = { pin: PIN, locale: LOC, viewport: `${W}x${H}`, mail: "(allowed test address, not printed in full)", ways: [] };
console.log(`\n######## confirmations  ${LOC}  ${W}x${H}  build ${PIN}`);

for (const [interes, plan, human] of WAYS) {
  const url = `${BASE}/${LOC}/contact?interes=${interes}&plan=${plan}`;
  let loaded = false;
  for (let a = 1; a <= 3 && !loaded; a++) {
    await send("Page.navigate", { url }); await sleep(a === 1 ? 5600 : 7200);
    const c = await ev(`(()=>({f:!!document.querySelector("form"),len:(document.body.innerText||"").length}))()`);
    loaded = c && !c.__error && c.f && c.len > 300;
    if (!loaded) console.log(`  (${interes}: load attempt ${a} weak)`);
  }
  if (!loaded) { console.log(`\n  ${interes.padEnd(10)} ABORT - form never loaded, NOT a pass`); RES.ways.push({ interes, plan, submitted: false, reason: "form never loaded" }); continue; }

  // fill the required fields the way a visitor would, leave the prefilled ones untouched
  const filled = await ev(`(()=>{
    const set=(n,v)=>{const e=document.querySelector("[name='"+n+"']"); if(!e) return null;
      const d=Object.getOwnPropertyDescriptor(Object.getPrototypeOf(e),"value");
      d.set.call(e,v); e.dispatchEvent(new Event("input",{bubbles:true})); e.dispatchEvent(new Event("change",{bubbles:true}));
      return e.value;};
    const r={agency:set("agency","Inmobiliaria RV6 Prueba"),name:set("name","RV6 Revisor"),
      email:set("email",${JSON.stringify(MAIL)}),phone:set("phone","+34600000000")};
    // consent, if the form has one
    const cb=[...document.querySelectorAll("input[type=checkbox]")].filter(e=>!e.closest("[aria-hidden='true']"));
    r.checkboxes=cb.length;
    for(const c of cb){ if(!c.checked){ c.click(); } }
    r.checkedAfter=cb.filter(c=>c.checked).length;
    r.interest=(document.querySelector("[name='interest']")||{}).value;
    r.message=((document.querySelector("[name='message']")||{}).value||"").slice(0,60);
    r.honeypotLeftEmpty=((document.querySelector("[name='web']")||{}).value||"")==="";
    return r;})()`);
  console.log(`\n  ${interes.padEnd(10)} ${human}`);
  console.log(`    filled: agency/name/email/phone set, consent boxes ${filled.checkedAfter}/${filled.checkboxes}, interest=${JSON.stringify(filled.interest)}, prefilled message kept=${JSON.stringify(filled.message)}, honeypot left empty=${filled.honeypotLeftEmpty}`);

  // find the submit button, tap it for real, and watch what replaces the form
  const pre = await ev(`(()=>{const b=document.querySelector("form button[type=submit]")||[...document.querySelectorAll("form button")].pop();
    if(!b) return {no:true}; b.scrollIntoView({block:"center",behavior:"instant"});
    const r=b.getBoundingClientRect(); return {no:false,cx:Math.round(r.left+r.width/2),cy:Math.round(r.top+r.height/2),
      h:Math.round(r.height),w:Math.round(r.width),t:((b.innerText||b.textContent||"").replace(/\\s+/g," ").trim().slice(0,40)),
      lands:(()=>{const h=document.elementFromPoint(Math.round(r.left+r.width/2),Math.round(r.top+r.height/2));return h?(h===b||b.contains(h)):false;})()};})()`);
  if (pre.no) { console.log(`    ABORT - no submit button found, NOT a pass`); RES.ways.push({ interes, plan, submitted: false, reason: "no submit button" }); continue; }
  await sleep(350);
  const t0 = Date.now();
  await send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: pre.cx, y: pre.cy, radiusX: 11, radiusY: 11 }] });
  await send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });

  // wait for a confirmation OR an error, up to 25 s; never read "still the form" as success
  const res = await ev(`(async()=>{
    const t0=Date.now(); let last="";
    while(Date.now()-t0<25000){
      const b=(document.body.innerText||"").replace(/[\\s\\u00a0]+/g," ").trim();
      const formGone = !document.querySelector("form") || !!document.querySelector("[data-sent],[data-confirmation],[role='status']");
      const errs=[...document.querySelectorAll("[role='alert'],[data-error],.error")].map(e=>((e.innerText||e.textContent||"").replace(/\\s+/g," ").trim())).filter(Boolean);
      if(formGone || errs.length){ last=b; return {ms:Date.now()-t0, formGone, errors:errs.slice(0,4),
        body:b.slice(0,900), h1:(document.querySelector("h1")?.innerText||"").replace(/\\s+/g," ").trim().slice(0,90),
        status:((document.querySelector("[role='status'],[data-sent],[data-confirmation]")||{}).innerText||"").replace(/\\s+/g," ").trim().slice(0,400),
        url:location.pathname+location.search}; }
      last=b; await new Promise(r=>setTimeout(r,500)); }
    return {ms:Date.now()-t0, timedOut:true, formStillThere:!!document.querySelector("form"),
      body:last.slice(0,700), url:location.pathname+location.search,
      errors:[...document.querySelectorAll("[role='alert'],[data-error]")].map(e=>(e.innerText||"").trim()).slice(0,4)};})()`);
  const row = { interes, plan, submitted: true, submitLabel: pre.t, submitSize: `${pre.w}x${pre.h}`, tapLands: pre.lands, ...res, wallMs: Date.now() - t0 };
  RES.ways.push(row);
  console.log(`    submit ${JSON.stringify(pre.t)} ${pre.w}x${pre.h} tapLands=${pre.lands ? "yes" : "NO"}`);
  if (res.timedOut) {
    console.log(`    *** NO CONFIRMATION within 25 s - form still present=${res.formStillThere}. NOT a pass.`);
    console.log(`        errors: ${JSON.stringify(res.errors)}`);
    console.log(`        page now: ${JSON.stringify((res.body || "").slice(0, 220))}`);
  } else if (res.errors?.length) {
    console.log(`    submitted in ${res.ms} ms but the page reports: ${JSON.stringify(res.errors)}`);
  } else {
    console.log(`    confirmation after ${res.ms} ms at ${res.url}`);
    console.log(`      h1: ${JSON.stringify(res.h1)}`);
    console.log(`      status region: ${JSON.stringify((res.status || "").slice(0, 260))}`);
    console.log(`      page text: ${JSON.stringify((res.body || "").slice(0, 420))}`);
  }
}
const PIN2 = await build();
RES.pinEnd = PIN2;
console.log(`\n######## build start ${PIN}  end ${PIN2}  ${PIN === PIN2 ? "STABLE" : "*** MOVED - VOID ***"}`);
const fs = await import("node:fs"); fs.writeFileSync(OUT, JSON.stringify(RES, null, 1));
process.exit(PIN === PIN2 ? 0 : 4);
