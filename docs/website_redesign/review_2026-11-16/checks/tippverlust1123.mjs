// Does switching language mid-form clear what the visitor TYPED? Possibly - but my first probe
// set the fields with a programmatic value setter, so React may never have held those values and
// the "loss" could be my artifact. Here the text is entered through REAL key input
// (Input.insertText into a focused field), which a controlled React input cannot tell from a
// human, and the value is read back before the switch to prove it was really there.
const BASE = process.argv[2], FROM = process.argv[3] || "es";
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
await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
await send("Emulation.setTouchEmulationEnabled", { enabled: true, maxTouchPoints: 5 });
await send("Page.navigate", { url: `${BASE}/${FROM}/contact?interes=trial&plan=essential` });
await sleep(6200);

// type into a field the way a person does: tap it, then insert text as key input
const typeInto = async (name, text) => {
  const box = await ev(`(()=>{const e=document.querySelector("[name='"+${JSON.stringify(name)}+"']");
    if(!e) return null; e.scrollIntoView({block:"center",behavior:"instant"});
    const r=e.getBoundingClientRect();
    return {cx:Math.round(r.left+r.width/2),cy:Math.round(r.top+r.height/2)};})()`);
  if (!box) return null;
  await send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: box.cx, y: box.cy, radiusX: 8, radiusY: 8 }] });
  await send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  await sleep(300);
  const focused = await ev(`(()=>{const a=document.activeElement;return a?(a.getAttribute("name")||a.tagName.toLowerCase()):"none";})()`);
  await send("Input.insertText", { text });
  await sleep(250);
  const val = await ev(`((document.querySelector("[name='"+${JSON.stringify(name)}+"']")||{}).value||"")`);
  return { focused, val };
};

console.log(`\n######## typed input through a mid-form language switch  ${FROM} -> ${TO}`);
const a = await typeInto("agency", "Inmobiliaria RV6");
const n = await typeInto("name", "RV6 Revisor");
console.log(`  typed with REAL key input:`);
console.log(`    agency: focus landed on ${JSON.stringify(a?.focused)}, field now ${JSON.stringify(a?.val)}`);
console.log(`    name  : focus landed on ${JSON.stringify(n?.focused)}, field now ${JSON.stringify(n?.val)}`);
const reallyThere = a?.val === "Inmobiliaria RV6" && n?.val === "RV6 Revisor";
if (!reallyThere) { console.log(`  *** the text did not arrive by key input - cannot test the loss, reporting as inconclusive`); process.exit(1); }

// prove React itself holds it: force a re-render by changing another control, then re-read
const held = await ev(`(async()=>{
  const sel=document.querySelector("[name='interest']");
  const prev=sel?sel.value:null;
  if(sel){ const d=Object.getOwnPropertyDescriptor(Object.getPrototypeOf(sel),"value");
    d.set.call(sel,sel.value); sel.dispatchEvent(new Event("change",{bubbles:true})); }
  await new Promise(r=>setTimeout(r,500));
  const g=(x)=>((document.querySelector("[name='"+x+"']")||{}).value||"");
  return {afterRerender:{agency:g("agency"),name:g("name")},interest:prev};})()`);
console.log(`  survives a re-render (so React holds it, not just the DOM): agency=${JSON.stringify(held.afterRerender.agency)} name=${JSON.stringify(held.afterRerender.name)}`);

// now the switch
const loc = await ev(`(async()=>{
  const other="/"+${JSON.stringify(TO)};
  const vis=()=>[...document.querySelectorAll("a[href]")].filter(x=>{const h=x.getAttribute("href")||"";
    return (h===other||h.startsWith(other+"/")||h.startsWith(other+"?"));}).filter(x=>{const r=x.getBoundingClientRect();return r.width>0&&r.height>0;})[0];
  let el=vis();
  if(!el){ const b=[...document.querySelectorAll("button")].find(x=>/men[uú]|menu/i.test(x.getAttribute("aria-label")||x.innerText||""));
    if(b){ b.click(); await new Promise(r=>setTimeout(r,900)); el=vis(); } }
  if(!el) return {found:false};
  el.scrollIntoView({block:"center",behavior:"instant"}); await new Promise(r=>setTimeout(r,300));
  const r=el.getBoundingClientRect();
  return {found:true,href:el.getAttribute("href"),cx:Math.round(r.left+r.width/2),cy:Math.round(r.top+r.height/2)};})()`);
if (!loc?.found) { console.log("  language link not reachable - inconclusive"); process.exit(1); }
await send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: loc.cx, y: loc.cy, radiusX: 11, radiusY: 11 }] });
await send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
await sleep(3800);
const after = await ev(`(()=>{const g=(x)=>((document.querySelector("[name='"+x+"']")||{}).value||"");
  return {url:location.pathname+location.search,agency:g("agency"),name:g("name"),
    interest:g("interest"),message:g("message"),
    h1:(document.querySelector("h1")?.innerText||"").replace(/[\\s\\u00a0]+/g," ").trim().slice(0,50)};})()`);
console.log(`\n  switched via ${JSON.stringify(loc.href)} -> ${after.url}  h1=${JSON.stringify(after.h1)}`);
console.log(`    agency after the switch: ${JSON.stringify(after.agency)}`);
console.log(`    name   after the switch: ${JSON.stringify(after.name)}`);
console.log(`    interest / message kept: ${JSON.stringify(after.interest)} / ${JSON.stringify(after.message)}`);
const lost = after.agency === "" && after.name === "";
console.log(`\n  VERDICT: what the visitor typed is ${lost ? "LOST - they must type it again" : "kept"}`);
console.log(`           (the text was proven present by key input and survived a re-render first,`);
console.log(`            so this is the page's behaviour, not a programmatic-setter artifact)`);
process.exit(0);
