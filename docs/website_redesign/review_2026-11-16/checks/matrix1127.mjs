// RV6: the {plan} matrix on the named deployment. The placeholder lives in THREE places
// (brief-1120.ts): the card heading contact.contract.h, the prefilled subject contact.subject.contract,
// and step 3 of the confirmation contact.done.contract.next[2]. Each has its own fallback when the
// link carries no plan - "un plan"/"a plan" for the heading, "tu plan"/"your plan" for the step, and
// NOTHING for the subject (contact/page.tsx:43 builds it only when a plan is present).
// Measured: interes=contratar x {essential, growth, enterprise, none, invalid} x {es, en}, heading
// and subject without submitting; then the confirmation's steps for the states that matter.
// A literal "{plan}" anywhere on a rendered page is a defect. A state that could not be reached is
// reported as such, never as a pass.
const BASE = process.argv[2];
const OUT = process.argv[3] || "matrix-1127.json";
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
await send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });

const READ = `(function(){
  var n=function(s){return (s||"").replace(/[\\s\\u00a0]+/g," ").trim();};
  var card=document.querySelector(".prq, [data-prq], form");
  var h=document.querySelector(".prq-h, form h1, form h2, main h1");
  var sel=document.querySelector("select[name=interest]");
  var opts=[];
  if(sel){for(var i=0;i<sel.options.length;i++)opts.push({v:sel.options[i].value,t:n(sel.options[i].text)});}
  var msg=document.querySelector("textarea[name=message]");
  var body=n(document.body.innerText);
  var heads=[];var hs=document.querySelectorAll("h1,h2,h3,.prq-eyebrow,.prq-h,.prq-body");
  for(var j=0;j<hs.length;j++){var t=n(hs[j].innerText);if(t)heads.push(t);}
  return { heads: heads.slice(0,12),
    h: n(h&&h.innerText),
    selValue: sel?sel.value:null, selIndex: sel?sel.selectedIndex:null, options: opts,
    message: msg?msg.value:null,
    submit: n((document.querySelector("form button[type=submit], form button")||{}).innerText),
    contractNote: n((document.querySelector("[data-prq-contract-note]")||{}).innerText),
    literalPlan: /\\{plan\\}/.test(body), literalWhere: body.indexOf("{plan}")>=0 ? body.slice(Math.max(0,body.indexOf("{plan}")-70), body.indexOf("{plan}")+40) : null,
    bodyLen: body.length };
})()`;

const res = { probe: "matrix1127", base: BASE, pin_start: PIN_START, when: new Date().toISOString(), heading: {}, confirmation: {} };

// ---- part 1 : heading + subject, no submitting ----
for (const loc of ["es", "en"]) {
  for (const plan of ["essential", "growth", "enterprise", "", "bogus"]) {
    const url = `${BASE}/${loc}/contact?interes=contratar${plan ? `&plan=${plan}` : ""}`;
    let r = null;
    for (let a = 1; a <= 3; a++) {
      await send("Page.navigate", { url }); await sleep(a === 1 ? 6200 : 7800);
      r = await ev(READ);
      if (r && !r.__error && r.bodyLen > 300) break;
    }
    const tag = `${loc}_${plan || "noplan"}`;
    res.heading[tag] = r && !r.__error ? r : { NOT_MEASURED: true, raw: r };
    console.error(`${tag}: h="${r?.h}" sel=${r?.selValue}/${r?.selIndex} msg="${r?.message}" literal{plan}=${r?.literalPlan}`);
  }
}

// ---- part 2 : the confirmations. Submissions go to a deliverable address only; the preview route
//      answers "simulated", so nothing leaves the system. The honeypot field "web" stays empty.
const fill = (mail) => `(function(){
  var set=function(sel,val){var e=document.querySelector(sel); if(!e) return false;
    var d=Object.getOwnPropertyDescriptor(Object.getPrototypeOf(e),"value"); d.set.call(e,val);
    e.dispatchEvent(new Event("input",{bubbles:true})); e.dispatchEvent(new Event("change",{bubbles:true})); return true;};
  var ok={agency:set("input[name=agency]","RV6 Pruefstelle"),name:set("input[name=name]","RV6 Reviewer"),email:set("input[name=email]",${JSON.stringify(mail)})};
  var hp=document.querySelector("input[name=web]"); ok.honeypotEmpty = !hp || hp.value==="";
  return ok;
})()`;
const CONF = `(function(){
  var n=function(s){return (s||"").replace(/[\\s\\u00a0]+/g," ").trim();};
  var done=document.querySelector("[data-prq-done], .prq-done");
  var steps=[];var ls=document.querySelectorAll("[data-prq-done] li, .prq-done li, .prq-next li");
  for(var i=0;i<ls.length;i++)steps.push(n(ls[i].innerText));
  var body=n(document.body.innerText);
  return { present: !!done, h: n((document.querySelector("[data-prq-done] h2, .prq-done h2, [data-prq-done] h1")||{}).innerText),
    eyebrow: n((document.querySelector(".prq-done-eyebrow, [data-prq-done] .prq-eyebrow")||{}).innerText),
    steps: steps, stepCount: steps.length,
    simulated: /no se ha enviado a nadie|was not sent to anybody/i.test(body),
    literalPlan: /\\{plan\\}/.test(body),
    literalWhere: body.indexOf("{plan}")>=0 ? body.slice(Math.max(0,body.indexOf("{plan}")-70), body.indexOf("{plan}")+40) : null,
    bodyLen: body.length };
})()`;

const WAYS = [
  ["es", "contratar", "growth"], ["es", "contratar", ""], ["en", "contratar", "growth"], ["en", "contratar", ""],
  ["es", "trial", "essential"], ["es", "demo", "growth"], ["es", "talk", "enterprise"],
];
for (const [loc, interes, plan] of WAYS) {
  const tag = `${loc}_${interes}_${plan || "noplan"}`;
  const url = `${BASE}/${loc}/contact?interes=${interes}${plan ? `&plan=${plan}` : ""}`;
  await send("Page.navigate", { url }); await sleep(6600);
  const mail = `ajdg.private+rv6-1127-${interes}${plan || "np"}-${loc}@gmail.com`;
  const filled = await ev(fill(mail));
  if (!filled || filled.__error || !filled.agency) { res.confirmation[tag] = { NOT_MEASURED: "form fields not found", filled }; continue; }
  if (!filled.honeypotEmpty) { res.confirmation[tag] = { NOT_MEASURED: "honeypot not empty - would be a spam submission" }; continue; }
  await sleep(400);
  const sent = await ev(`(function(){var b=document.querySelector("form button[type=submit]")||document.querySelector("form button"); if(!b) return false; b.click(); return true;})()`);
  await sleep(7000);
  const c = await ev(CONF);
  res.confirmation[tag] = { submitted: sent, filled, ...c };
  console.error(`CONF ${tag}: present=${c?.present} steps=${c?.stepCount} literal{plan}=${c?.literalPlan} simulated=${c?.simulated}`);
}

res.pin_end = await build(); res.pinned = res.pin_start === res.pin_end;
if (!res.pinned) res.VOID = "build moved - VOID";
await (await import("node:fs")).promises.writeFile(OUT, JSON.stringify(res, null, 1));
console.log(JSON.stringify({ pinned: res.pinned, out: OUT }, null, 1));
process.exit(0);
