// Owner 23.11. point 4: the language switch IN THE MIDDLE OF THE FORM must keep the WAY and the
// PLAN. Not the empty page - the form already filled in.
//
// Two separate things are tested, because they fail separately:
//   (1) the URL keeps interes + plan  -> R-7, a link-building question
//   (2) the FORM STATE survives the locale navigation (interest value, prefilled message, and
//       what the visitor typed) -> a client-state question that can fail even with a correct URL
// Validated as a NEGATIVE CONTROL on ab38b69, where (1) is known to fail. A probe that cannot
// catch the known-broken case proves nothing on the candidate.
const BASE = process.argv[2];
const FROM = process.argv[3] || "es";
const W = Number(process.argv[4] || 390), H = Number(process.argv[5] || 844);
const OUT = process.argv[6] || `sprachmitten-${FROM}-${W}.json`;
const TO = FROM === "es" ? "en" : "es";
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
if (PIN === "UNREACHABLE") { console.log("ABORT: build endpoint unreachable"); process.exit(2); }
await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride", { width: W, height: H, deviceScaleFactor: 2, mobile: true });
await send("Emulation.setTouchEmulationEnabled", { enabled: true, maxTouchPoints: 5 });

const TYPED = { agency: "Inmobiliaria RV6 Prueba", name: "RV6 Revisor", phone: "+34600000001" };
const MAIL = "ajdg.private+rv4-lang-" + FROM + "@gmail.com";
const WAYS = [["trial", "essential"], ["demo", "growth"], ["talk", "enterprise"]];
const R = { pin: PIN, from: FROM, to: TO, viewport: `${W}x${H}`, ways: [] };
console.log(`\n######## language switch MID-FORM  ${FROM} -> ${TO}  ${W}x${H}  build ${PIN}`);

for (const [interes, plan] of WAYS) {
  const url = `${BASE}/${FROM}/contact?interes=${interes}&plan=${plan}`;
  let ok = false;
  for (let a = 1; a <= 3 && !ok; a++) {
    await send("Page.navigate", { url }); await sleep(a === 1 ? 5800 : 7400);
    // R-9 keeps the typed fields in sessionStorage for the tab, so without clearing it the SECOND
    // way would open on the first way's text and the evidence would be polluted. Clear, then load
    // again, because the restore happens on mount.
    await ev(`(()=>{try{sessionStorage.clear();}catch(e){}})()`);
    await send("Page.navigate", { url }); await sleep(5200);
    const c = await ev(`(()=>({f:!!document.querySelector("form"),len:(document.body.innerText||"").length,
      kept:(()=>{try{return sessionStorage.getItem("nuova.prq");}catch(e){return "blocked";}})()}))()`);
    ok = c && !c.__error && c.f && c.len > 300 && !c.kept;
    if (c && c.kept) console.log(`  ${interes}: storage not empty after the reset - would be polluted, retrying`);
  }
  if (!ok) { console.log(`\n  ${interes}: ABORT - form never loaded, NOT a pass`); R.ways.push({ interes, plan, loaded: false }); continue; }

  // fill it in, as a visitor who is halfway through
  const before = await ev(`(()=>{
    const set=(n,v)=>{const e=document.querySelector("[name='"+n+"']"); if(!e) return null;
      const d=Object.getOwnPropertyDescriptor(Object.getPrototypeOf(e),"value");
      d.set.call(e,v); e.dispatchEvent(new Event("input",{bubbles:true})); e.dispatchEvent(new Event("change",{bubbles:true}));
      return e.value;};
    set("agency",${JSON.stringify(TYPED.agency)}); set("name",${JSON.stringify(TYPED.name)});
    set("email",${JSON.stringify(MAIL)}); set("phone",${JSON.stringify(TYPED.phone)});
    const g=(n)=>((document.querySelector("[name='"+n+"']")||{}).value||"");
    return {url:location.pathname+location.search, interest:g("interest"), message:g("message"),
      agency:g("agency"), name:g("name"), phone:g("phone"),
      submit:((document.querySelector("form button[type=submit]")||{}).innerText||"").replace(/[\\s\\u00a0]+/g," ").trim().slice(0,40)};})()`);

  // the switch itself: only a link with a VISIBLE box (the collapsed utilities hold a 0x0 copy)
  const loc = await ev(`(async()=>{
    const other="/"+${JSON.stringify(TO)};
    const cands=()=>[...document.querySelectorAll("a[href]")].filter(x=>{const h=x.getAttribute("href")||"";
      return h===other||h.startsWith(other+"/")||h.startsWith(other+"?");});
    const vis=()=>cands().filter(x=>{const r=x.getBoundingClientRect();return r.width>0&&r.height>0;})[0];
    let a=vis(), viaMenu=false;
    if(!a){ const b=[...document.querySelectorAll("button")].find(x=>/men[uú]|menu/i.test(x.getAttribute("aria-label")||x.innerText||""));
      if(b){ b.click(); viaMenu=true; await new Promise(r=>setTimeout(r,900)); a=vis(); } }
    if(!a) return {found:false,viaMenu,all:cands().map(x=>x.getAttribute("href"))};
    a.scrollIntoView({block:"center",behavior:"instant"}); await new Promise(r=>setTimeout(r,350));
    const r=a.getBoundingClientRect();
    return {found:true,viaMenu,href:a.getAttribute("href"),
      cx:Math.round(r.left+r.width/2),cy:Math.round(r.top+r.height/2)};})()`);
  if (!loc?.found) { console.log(`\n  ${interes}: language link not reachable (${JSON.stringify(loc?.all)}) - NOT a pass`);
    R.ways.push({ interes, plan, before, switched: false }); continue; }

  await send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: loc.cx, y: loc.cy, radiusX: 11, radiusY: 11 }] });
  await send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  await sleep(3600);

  const after = await ev(`(()=>{
    const g=(n)=>((document.querySelector("[name='"+n+"']")||{}).value||"");
    const body=(document.body.innerText||"").replace(/[\\s\\u00a0]+/g," ");
    return {url:location.pathname+location.search, interest:g("interest"), message:g("message"),
      agency:g("agency"), name:g("name"), email:g("email"), phone:g("phone"),
      h1:(document.querySelector("h1")?.innerText||"").replace(/[\\s\\u00a0]+/g," ").trim().slice(0,60),
      namesPlan:new RegExp(${JSON.stringify(plan)},"i").test(body),
      submit:((document.querySelector("form button[type=submit]")||{}).innerText||"").replace(/[\\s\\u00a0]+/g," ").trim().slice(0,40)};})()`);

  const urlKeepsWay = (after?.url || "").includes(`interes=${interes}`);
  const urlKeepsPlan = (after?.url || "").includes(`plan=${plan}`);
  const wayKept = after?.interest && after.interest !== "other" && after.interest !== "";
  const typedKept = after?.agency === TYPED.agency && after?.name === TYPED.name;
  R.ways.push({ interes, plan, href: loc.href, before, after, urlKeepsWay, urlKeepsPlan, wayKept, typedKept });

  console.log(`\n  ${interes} / ${plan}   switch link ${JSON.stringify(loc.href)}${loc.viaMenu ? " (in the menu)" : ""}`);
  console.log(`     before: ${before.url}`);
  console.log(`             interest=${JSON.stringify(before.interest)} message=${JSON.stringify(before.message)} submit=${JSON.stringify(before.submit)}`);
  console.log(`     after : ${after.url}   h1=${JSON.stringify(after.h1)}`);
  console.log(`             interest=${JSON.stringify(after.interest)} message=${JSON.stringify(after.message)} submit=${JSON.stringify(after.submit)}`);
  console.log(`     URL keeps the way (interes=${interes}): ${urlKeepsWay ? "YES" : "*** NO"}`);
  console.log(`     URL keeps the plan (plan=${plan}):      ${urlKeepsPlan ? "YES" : "*** NO"}`);
  console.log(`     form still carries the way:             ${wayKept ? "YES (" + after.interest + ")" : "*** NO (" + after.interest + ")"}`);
  console.log(`     what the visitor typed survived:        ${typedKept ? "YES" : "no (agency=" + JSON.stringify(after.agency) + ")"}`);
  console.log(`     the plan is named on the page:          ${after.namesPlan ? "YES" : "*** NO"}`);
}

const PIN2 = await build(); R.pinEnd = PIN2;
const pass = R.ways.filter((w) => w.urlKeepsWay && w.urlKeepsPlan && w.wayKept).length;
console.log(`\nRESULT  ways keeping BOTH way and plan through the language switch: ${pass} of ${R.ways.length}`);
console.log(`        build start ${PIN}  end ${PIN2}  ${PIN === PIN2 ? "STABLE" : "*** MOVED - VOID ***"}`);
const fs = await import("node:fs"); fs.writeFileSync(OUT, JSON.stringify(R, null, 1));
process.exit(PIN === PIN2 ? 0 : 4);
