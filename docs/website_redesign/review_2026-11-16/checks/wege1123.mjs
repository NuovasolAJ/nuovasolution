// The two phone paths of the owner's brief, measured on one pinned build.
//   W-1  Mila's WhatsApp enquiry -> the callback task
//   W-2  plan choice -> the right form -> the confirmation
// Per step: is the target reachable, how far must one scroll, how many taps, does the tap LAND
// on the target (elementFromPoint before a real Input.dispatch tap - an overlay that steals the
// tap is exactly "where you mistap"), and what state results.
// Build is pinned at start AND end; a moved build VOIDS the run. A step that compared nothing
// is NEVER a pass - it is reported as "not reachable" or "aborted".
const BASE = process.argv[2];
const LOC = process.argv[3] || "es";
const W = Number(process.argv[4] || 390), H = Number(process.argv[5] || 844);
const TAG = process.argv[6] || "run";
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
const build = async () => {
  try { const r = await fetch(`${BASE}/api/build`, { signal: AbortSignal.timeout(20000) }); const j = await r.json();
    return `${j.commit?.slice(0, 7)}/${j.deployment}`; } catch { return "UNREACHABLE"; }
};
const PIN = await build();
if (PIN === "UNREACHABLE") { console.log("ABORT: /api/build unreachable at start"); process.exit(2); }

await send("Page.enable"); await send("Runtime.enable");
await send("Emulation.setDeviceMetricsOverride", { width: W, height: H, deviceScaleFactor: 2, mobile: true });
await send("Emulation.setTouchEmulationEnabled", { enabled: true, maxTouchPoints: 5 });

// R-9 keeps the typed fields in sessionStorage for the tab. This probe only READS forms, it never
// types -- so anything in storage comes from an EARLIER probe in this same browser and would be
// read back as if it were the page's own prefill (that is what happened on the first run against
// bea7d19). Clear it once at the start, and state what was found, so the prefill readings below are
// the page's and not mine.
await send("Page.navigate", { url: `${BASE}/${LOC}` });
await new Promise((r) => setTimeout(r, 5200));
const stale = await ev(`(()=>{try{const s=sessionStorage.getItem("nuova.prq");sessionStorage.clear();return s;}catch(e){return "blocked";}})()`);
console.log(`\n######## storage reset before the run: ${stale ? "found and cleared leftovers from an earlier probe" : "was already empty"}`);

const go = async (url, mustSel) => {
  for (let a = 1; a <= 3; a++) {
    await send("Page.navigate", { url }); await sleep(a === 1 ? 5800 : 7500);
    const ok = await ev(`(()=>{const b=document.body;return {len:(b?.innerText||"").length,
      sel:${JSON.stringify(mustSel || "body")}?!!document.querySelector(${JSON.stringify(mustSel || "body")}):true,
      url:location.pathname+location.search};})()`);
    if (ok && !ok.__error && ok.len > 500 && ok.sel) return { ok: true, ...ok };
    console.log(`    (load attempt ${a} weak: len=${ok?.len} sel=${ok?.sel})`);
  }
  return { ok: false };
};

// scroll a target minimally into view, report the scroll distance a visitor needs, then check
// what sits under the tap point, then tap for real.
const TAPJS = (sel, nth) => `(async()=>{
  const all=[...document.querySelectorAll(${JSON.stringify(sel)})];
  const e=all[${nth || 0}];
  if(!e) return {found:false,count:all.length};
  const before=scrollY;
  e.scrollIntoView({block:"center",behavior:"instant"});
  await new Promise(r=>setTimeout(r,450));
  const r=e.getBoundingClientRect();
  const cx=Math.round(r.left+r.width/2), cy=Math.round(r.top+r.height/2);
  const hit=document.elementFromPoint(cx,cy);
  const lands = hit ? (hit===e||e.contains(hit)||hit.contains(e)) : false;
  const hitDesc = hit ? hit.tagName.toLowerCase()+(hit.className&&typeof hit.className==="string"?"."+hit.className.split(" ").slice(0,2).join("."):"")+" "+((hit.innerText||hit.textContent||"").replace(/\\s+/g," ").trim().slice(0,40)) : "none";
  // neighbours: other tappable things whose box is within 12 px of this one (crowding)
  let crowd=0;
  for(const o of document.querySelectorAll("a,button,[role='button']")){ if(o===e) continue;
    const q=o.getBoundingClientRect(); if(q.width===0) continue;
    const gapY = q.top>r.bottom ? q.top-r.bottom : (r.top>q.bottom ? r.top-q.bottom : 0);
    const overlapX = Math.min(q.right,r.right)-Math.max(q.left,r.left);
    if(gapY<12 && overlapX>8) crowd++; }
  return {found:true,count:all.length,scrollNeeded:Math.round(Math.abs(scrollY-before)),scrollY:Math.round(scrollY),
    w:Math.round(r.width*10)/10,h:Math.round(r.height*10)/10,cx,cy,lands,hitDesc,crowd,
    name:((e.getAttribute("aria-label")||e.textContent||"").replace(/[\\s\\u00a0]+/g," ").trim().slice(0,70)),
    href:(e.getAttribute("href")||"")};})()`;

const tap = async (sel, nth, label) => {
  const pre = await ev(TAPJS(sel, nth));
  if (pre?.__error) return { step: label, error: pre.__error };
  if (!pre.found) return { step: label, reachable: false, note: "selector not present" };
  const t0 = Date.now();
  await send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: pre.cx, y: pre.cy, radiusX: 11, radiusY: 11 }] });
  await send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  await sleep(1400);
  const after = await ev(`({url:location.pathname+location.search+location.hash, len:(document.body.innerText||"").length})`);
  return { step: label, reachable: true, ...pre, ms: Date.now() - t0, after };
};

const line = (r) => {
  if (r.error) return `  ${r.step.padEnd(34)} ERROR ${r.error.slice(0, 90)}`;
  if (!r.reachable) return `  ${r.step.padEnd(34)} NOT REACHABLE (${r.note})`;
  return `  ${r.step.padEnd(34)} ${String(r.w).padStart(5)}x${String(r.h).padEnd(5)} scroll+${String(r.scrollNeeded).padStart(5)}  tapLands=${r.lands ? "yes" : "NO -> " + r.hitDesc}  crowd=${r.crowd}  ${r.href ? "-> " + r.href : ""}${r.after?.url ? "  now=" + r.after.url : ""}`;
};

const RES = { pin: PIN, locale: LOC, viewport: `${W}x${H}`, tag: TAG, w1: [], w2: [], state: {} };
console.log(`\n######## ${TAG}  ${LOC}  ${W}x${H}  build ${PIN}`);

// ---------------------------------------------------------------- W-1
console.log(`\n## W-1  Mila's WhatsApp enquiry -> the callback task`);
let nav = await go(`${BASE}/${LOC}`, "h1");
if (!nav.ok) { console.log("  ABORT: home did not load after 3 attempts"); process.exit(3); }

// is the enquiry itself in the first screen, without any scrolling?
const first = await ev(`(()=>{
  scrollTo({top:0,behavior:"instant"});
  const vis=(e)=>{const r=e.getBoundingClientRect();return r.top<innerHeight&&r.bottom>0&&r.width>0;};
  const t=(e)=>((e.innerText||e.textContent||"").replace(/[\\s\\u00a0]+/g," ").trim());
  const inFirst=[];
  for(const e of document.querySelectorAll("h1,h2,p,a,button,[data-hero-cta],[data-hero-bubble],[data-hero-task]")){
    if(!vis(e)) continue; const s=t(e); if(!s||s.length<3) continue;
    const r=e.getBoundingClientRect();
    inFirst.push({tag:e.tagName.toLowerCase(),y:Math.round(r.top),h:Math.round(r.height),s:s.slice(0,110)}); }
  const body=(document.body.innerText||"").replace(/[\\s\\u00a0]+/g," ");
  return {inFirst, milaInFirst:/Mila/i.test(inFirst.map(x=>x.s).join(" ")),
    milaOnPage:(body.match(/Mila/gi)||[]).length, h1:(document.querySelector("h1")?.innerText||"").replace(/\\s+/g," ")};})()`);
RES.state.firstScreen = first;
console.log(`  first screen, no scrolling - h1: ${JSON.stringify(first.h1)}`);
console.log(`  "Mila" in the first screen: ${first.milaInFirst ? "YES" : "no"}   on the whole page: ${first.milaOnPage}x`);
for (const i of (first.inFirst || []).slice(0, 14)) console.log(`     y=${String(i.y).padStart(4)} ${i.tag.padEnd(6)} ${JSON.stringify(i.s.slice(0, 92))}`);

for (const [sel, nth, label] of [
  ['[data-hero-cta="task"]', 0, "hero: Ver como queda la tarea"],
]) { const r = await tap(sel, nth, label); RES.w1.push(r); console.log(line(r)); }

// what state is the demo in after the hero link, and does the task card hold head/state/fields/reminder
const demo1 = await ev(`(async()=>{
  await new Promise(r=>setTimeout(r,2500));
  const d=document.querySelector("[data-demo]");
  if(!d) return {demo:false};
  const att=Object.fromEntries([...d.attributes].filter(a=>a.name.startsWith("data-")).map(a=>[a.name,a.value]));
  const r=d.getBoundingClientRect();
  const txt=(d.innerText||d.textContent||"").replace(/[\\s\\u00a0]+/g," ").trim();
  const card=document.querySelector("[data-task-card],[data-demo-task],[data-task]");
  const ctxt=card?((card.innerText||card.textContent||"").replace(/[\\s\\u00a0]+/g," ").trim()):null;
  return {demo:true,att,inView:r.top<innerHeight&&r.bottom>0,top:Math.round(r.top),
    len:txt.length, text:txt.slice(0,900), card:!!card, cardText:ctxt?ctxt.slice(0,600):null};})()`);
RES.state.demoAfterHero = demo1;
console.log(`\n  demo after the hero link: present=${demo1.demo} inView=${demo1.inView} top=${demo1.top}`);
if (demo1.att) console.log(`    ${JSON.stringify(demo1.att)}`);
if (demo1.card) console.log(`    task card: ${JSON.stringify((demo1.cardText || "").slice(0, 320))}`);
else console.log(`    task card: NOT FOUND by [data-task-card]/[data-demo-task]/[data-task]`);
if (demo1.text) console.log(`    demo text: ${JSON.stringify(demo1.text.slice(0, 420))}`);

// the deliberate way: tap the WhatsApp channel, then read the resulting task
const wa = await tap('[data-demo-tab="whatsapp"]', 0, "demo: tap WhatsApp");
RES.w1.push(wa); console.log("\n" + line(wa));
const demo2 = await ev(`(async()=>{
  const t0=Date.now(); let d=document.querySelector("[data-demo]");
  // wait for the run to reach its end state, up to 30 s
  while(Date.now()-t0<30000){ d=document.querySelector("[data-demo]");
    if(d&&d.getAttribute("data-demo-done")==="true") break;
    await new Promise(r=>setTimeout(r,500)); }
  const att=Object.fromEntries([...d.attributes].filter(a=>a.name.startsWith("data-")).map(a=>[a.name,a.value]));
  const txt=(d.innerText||d.textContent||"").replace(/[\\s\\u00a0]+/g," ").trim();
  const phases=[...document.querySelectorAll("[data-demo-step],[data-w]")].map(e=>({
    k:e.getAttribute("data-demo-step")||e.getAttribute("data-w"),
    on:e.getAttribute("aria-current")||e.getAttribute("data-state")||"",
    s:((e.innerText||e.textContent||"").replace(/\\s+/g," ").trim().slice(0,70))}));
  return {msToDone:Date.now()-t0,att,len:txt.length,text:txt.slice(0,1600),phases};})()`);
RES.state.demoAfterWhatsapp = demo2;
console.log(`  demo run to its end state: ${demo2.msToDone} ms (machine time, not a human reading time)`);
console.log(`    ${JSON.stringify(demo2.att)}`);
if (demo2.phases?.length) for (const p of demo2.phases) console.log(`      step ${p.k} ${p.on} ${JSON.stringify(p.s)}`);
console.log(`    demo text now: ${JSON.stringify((demo2.text || "").slice(0, 900))}`);

// ---------------------------------------------------------------- W-2
console.log(`\n## W-2  plan choice -> form -> confirmation`);
nav = await go(`${BASE}/${LOC}`, "h1");
if (!nav.ok) { console.log("  ABORT: home did not load for W-2"); process.exit(3); }
for (const [sel, nth, label] of [
  ['[data-demo-to-plans]', 0, "demo: Ver que plan te encaja"],
  ['[data-plan-cta="card-essential"]', 0, "plan card Essential: main action"],
  ['[data-plan-direct="card-essential"]', 0, "plan card Essential: contratar"],
  ['[data-plan-cta="card-growth"]', 0, "plan card Growth: main action"],
  ['[data-plan-cta="card-enterprise"]', 0, "plan card Enterprise: main action"],
  ['[data-plan-fold-button="essential"]', 0, "plan card Essential: what's included"],
]) { const r = await tap(sel, nth, label); RES.w2.push(r); console.log(line(r));
     if (r.after?.url && !r.after.url.startsWith(`/${LOC}`) === false && r.after.url.includes("contact")) {
       nav = await go(`${BASE}/${LOC}`, "h1"); } }

// the plan differences the owner's third task needs
const diffs = await ev(`(async()=>{
  var y=0,s=0; while(y<document.documentElement.scrollHeight){scrollTo({top:y,behavior:"instant"});await new Promise(r=>setTimeout(r,70));y+=600;s++;if(s>400)break;}
  const sec=document.querySelector("[data-plans]");
  if(!sec) return {plans:false};
  const att=Object.fromEntries([...sec.attributes].filter(a=>a.name.startsWith("data-")).map(a=>[a.name,a.value]));
  const dd=[...document.querySelectorAll("[data-plan-diffs],[data-plan-diff]")].map(e=>({
    v:e.getAttribute("data-plan-diffs")||e.getAttribute("data-plan-diff"),
    s:((e.innerText||e.textContent||"").replace(/[\\s\\u00a0]+/g," ").trim().slice(0,260))}));
  const body=(sec.innerText||sec.textContent||"").replace(/[\\s\\u00a0]+/g," ");
  return {plans:true,att,diffs:dd,
    free14:(body.match(/14 d[ií]as|14 days/gi)||[]).length,
    freeWord:(body.match(/gratis|free|gratuit/gi)||[]).length,
    tableShown:att["data-plans-table-shown"], text:body.slice(0,1400)};})()`);
RES.state.planDiffs = diffs;
console.log(`\n  plans section: ${JSON.stringify(diffs.att)}`);
console.log(`  "14 days" appears ${diffs.free14}x, a free-word ${diffs.freeWord}x inside the plans section`);
for (const d of (diffs.diffs || [])) console.log(`    data-plan-diffs=${d.v}: ${JSON.stringify(d.s.slice(0, 200))}`);

// ---------------------------------------------------------------- the four form ways
console.log(`\n## the form per way: does it arrive prefilled, and what does it name`);
const WAYS = [["trial", "essential"], ["demo", "growth"], ["talk", "enterprise"], ["contratar", "essential"]];
RES.forms = [];
for (const [interes, plan] of WAYS) {
  const url = `${BASE}/${LOC}/contact?interes=${interes}&plan=${plan}`;
  const n = await go(url, "form, input, [data-contact-form]");
  if (!n.ok) { console.log(`  interes=${interes.padEnd(10)} ABORT: page did not load`); RES.forms.push({ interes, plan, loaded: false }); continue; }
  const f = await ev(`(async()=>{
    await new Promise(r=>setTimeout(r,900));
    var y=0,s=0; while(y<document.documentElement.scrollHeight){scrollTo({top:y,behavior:"instant"});await new Promise(r=>setTimeout(r,60));y+=600;s++;if(s>200)break;}
    scrollTo({top:0,behavior:"instant"}); await new Promise(r=>setTimeout(r,250));
    const fields=[...document.querySelectorAll("input,select,textarea")].map(e=>({
      name:e.name||e.id||"",type:e.type||e.tagName.toLowerCase(),
      value:(e.value||"").slice(0,70), checked:e.type==="checkbox"||e.type==="radio"?e.checked:undefined,
      required:e.required, label:(()=>{const l=e.labels&&e.labels[0];return l?(l.innerText||l.textContent||"").replace(/\\s+/g," ").trim().slice(0,52):(e.getAttribute("aria-label")||e.placeholder||"").slice(0,52);})(),
      hidden:(()=>{const c=getComputedStyle(e);const r=e.getBoundingClientRect();return c.display==="none"||c.visibility==="hidden"||(r.width===0&&r.height===0);})(),
      h:Math.round(e.getBoundingClientRect().height)}));
    const h1=(document.querySelector("h1")?.innerText||"").replace(/\\s+/g," ").trim();
    const card=document.querySelector("[data-contact-card],[data-interes],[data-way-card]");
    const submit=[...document.querySelectorAll("button[type=submit],input[type=submit],form button")].map(e=>({
      t:((e.innerText||e.textContent||"").replace(/\\s+/g," ").trim().slice(0,60)),h:Math.round(e.getBoundingClientRect().height)}));
    const body=(document.body.innerText||"").replace(/[\\s\\u00a0]+/g," ");
    return {h1, fields, submit,
      cardText: card?((card.innerText||card.textContent||"").replace(/\\s+/g," ").trim().slice(0,300)):null,
      cardAttrs: card?Object.fromEntries([...card.attributes].filter(a=>a.name.startsWith("data-")).map(a=>[a.name,a.value])):null,
      mentionsPlan: new RegExp(${JSON.stringify(plan)},"i").test(body),
      mentions14: /14 d[ií]as|14 days/i.test(body),
      mentionsFree: /gratis|free|gratuit/i.test(body),
      marks:(body.match(/pr[óo]ximamente|coming soon/gi)||[]).length};})()`);
  if (f?.__error) { console.log(`  interes=${interes} ERROR ${f.__error.slice(0, 80)}`); continue; }
  RES.forms.push({ interes, plan, loaded: true, ...f });
  console.log(`\n  interes=${interes} plan=${plan}`);
  console.log(`    h1: ${JSON.stringify(f.h1.slice(0, 90))}`);
  console.log(`    names the plan: ${f.mentionsPlan}   says 14 days: ${f.mentions14}   says free: ${f.mentionsFree}   marks: ${f.marks}`);
  if (f.cardText) console.log(`    way card ${JSON.stringify(f.cardAttrs)}: ${JSON.stringify(f.cardText.slice(0, 190))}`);
  for (const x of f.fields) console.log(`      ${x.hidden ? "[hidden] " : ""}${(x.name || "?").padEnd(16)} ${x.type.padEnd(9)} h=${String(x.h).padStart(3)} ${x.required ? "req " : "    "}value=${JSON.stringify(x.value)} label=${JSON.stringify(x.label)}`);
  console.log(`      submit: ${f.submit.map((s) => `${JSON.stringify(s.t)}(h=${s.h})`).join(", ")}`);
}

const PIN2 = await build();
RES.pinEnd = PIN2;
console.log(`\n######## build at start ${PIN}   at end ${PIN2}   ${PIN === PIN2 ? "STABLE" : "*** MOVED - RUN VOID ***"}`);
const fs = await import("node:fs");
fs.writeFileSync(process.argv[7] || `wege-${TAG}.json`, JSON.stringify(RES, null, 1));
process.exit(PIN === PIN2 ? 0 : 4);
