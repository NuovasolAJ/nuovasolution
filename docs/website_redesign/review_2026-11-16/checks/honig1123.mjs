// The only tap target under 44 px on the candidate is the form's unlabelled "web" field (215x24),
// i.e. the spam trap. A trap SHOULD be small, so counting it as an R-3 failure would be a false
// finding. But a trap that a person can see, tap or tab into is a different matter: the route
// rejects a request whose trap field is filled, so a visitor who fills it loses their enquiry with
// no idea why. So the question is not its size but: can a HUMAN reach it?
//   (a) how is it kept away from people - and is that technique one assistive software respects?
//   (b) does a tap at its centre land on it (elementFromPoint, before any dispatch)?
//   (c) is it in the real Tab order of the form?
//   (d) does a screen reader see it (aria-hidden / label / autocomplete)?
const BASE = process.argv[2], LOC = process.argv[3] || "es";
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
if (PIN === "UNREACHABLE") { console.log("ABORT: build endpoint unreachable - NOT a pass"); process.exit(2); }
await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
await send("Emulation.setTouchEmulationEnabled", { enabled: true, maxTouchPoints: 5 });
await send("Page.navigate", { url: `${BASE}/${LOC}/contact?interes=trial&plan=essential` });
await sleep(6200);

const info = await ev(`(()=>{const e=document.querySelector("[name='web']");
  if(!e) return {missing:true};
  const cs=getComputedStyle(e); const r=e.getBoundingClientRect();
  const wrap=e.parentElement; const ws_=wrap?getComputedStyle(wrap):null;
  const wr=wrap?wrap.getBoundingClientRect():null;
  return {
    box:{w:Math.round(r.width),h:Math.round(r.height),top:Math.round(r.top),left:Math.round(r.left),pageY:Math.round(r.top+window.scrollY)},
    own:{display:cs.display,visibility:cs.visibility,opacity:cs.opacity,position:cs.position,
      clipPath:cs.clipPath,clip:cs.clip,overflow:cs.overflow,height:cs.height,
      transform:cs.transform,pointerEvents:cs.pointerEvents,zIndex:cs.zIndex},
    attrs:{ariaHidden:e.getAttribute("aria-hidden"),tabindex:e.getAttribute("tabIndex"),
      autocomplete:e.getAttribute("autocomplete"),type:e.getAttribute("type"),
      id:e.id,labelFor:(e.id?!!document.querySelector("label[for='"+e.id+"']"):false),
      inLabel:!!e.closest("label")},
    wrapper:ws_?{tag:wrap.tagName.toLowerCase(),cls:String(wrap.className||"").slice(0,60),
      display:ws_.display,visibility:ws_.visibility,opacity:ws_.opacity,overflow:ws_.overflow,
      height:ws_.height,position:ws_.position,clipPath:ws_.clipPath,
      box:{w:Math.round(wr.width),h:Math.round(wr.height),top:Math.round(wr.top)}}:null,
    outer:e.outerHTML.slice(0,220)};})()`);

console.log(`\n######## the spam-trap field on the contact form  ${LOC}  build ${PIN}`);
if (info?.missing) { console.log("  no [name=web] on this form"); process.exit(0); }
console.log(`  box            ${JSON.stringify(info.box)}`);
console.log(`  own styles     ${JSON.stringify(info.own)}`);
console.log(`  attributes     ${JSON.stringify(info.attrs)}`);
console.log(`  wrapper        ${JSON.stringify(info.wrapper)}`);
console.log(`  markup         ${info.outer}`);

// (b) would a tap at its centre land on it? Read elementFromPoint BEFORE dispatching anything.
const hit = await ev(`(()=>{const e=document.querySelector("[name='web']");
  e.scrollIntoView({block:"center",behavior:"instant"});
  const r=e.getBoundingClientRect();
  const cx=Math.round(r.left+r.width/2), cy=Math.round(r.top+r.height/2);
  const at=document.elementFromPoint(cx,cy);
  return {cx,cy,hitTag:at?at.tagName.toLowerCase():"none",
    hitName:at?(at.getAttribute("name")||at.getAttribute("aria-label")||(at.innerText||"").slice(0,30)):"",
    isTheTrap:at===e};})()`);
console.log(`\n  (b) a tap at its centre lands on: ${hit.hitTag} ${JSON.stringify(hit.hitName)}  -> is it the trap itself? ${hit.isTheTrap ? "*** YES" : "no"}`);

// (c) real Tab order of the form: start from the agency field, walk forward, see if it is a stop
await ev(`(()=>{const a=document.querySelector("[name='agency']"); a&&a.focus(); return document.activeElement?.getAttribute("name");})()`);
const stops = [];
for (let i = 1; i <= 12; i++) {
  await send("Input.dispatchKeyEvent", { type: "rawKeyDown", windowsVirtualKeyCode: 9, nativeVirtualKeyCode: 9, key: "Tab", code: "Tab" });
  await send("Input.dispatchKeyEvent", { type: "keyUp", windowsVirtualKeyCode: 9, nativeVirtualKeyCode: 9, key: "Tab", code: "Tab" });
  await sleep(130);
  const s = await ev(`(()=>{const e=document.activeElement; if(!e) return {n:"none"};
    return {n:(e.getAttribute("name")||e.tagName.toLowerCase()),
      label:((e.getAttribute("aria-label")||e.innerText||"").replace(/[\\s\\u00a0]+/g," ").trim().slice(0,30))};})()`);
  stops.push(s?.n);
  if (stops.filter((x) => x === "submit" || x === "button").length > 1) break;
}
const trapInTab = stops.includes("web");
console.log(`  (c) Tab order from the agency field: ${stops.join(" -> ")}`);
console.log(`      the trap is a focus stop: ${trapInTab ? "*** YES" : "no"}`);

const PIN2 = await build();
console.log(`\n  VERDICT  a person can reach it: ${hit.isTheTrap || trapInTab ? "*** possibly - look at the styles above" : "no (not by tap, not by Tab)"}`);
console.log(`           build start ${PIN}  end ${PIN2}  ${PIN === PIN2 ? "STABLE" : "*** MOVED - VOID ***"}`);
const fs = await import("node:fs");
fs.writeFileSync(process.argv[4] || `honig-${LOC}.json`, JSON.stringify({ pin: PIN, pinEnd: PIN2, locale: LOC, info, hit, stops, trapInTab }, null, 1));
process.exit(PIN === PIN2 ? 0 : 4);
