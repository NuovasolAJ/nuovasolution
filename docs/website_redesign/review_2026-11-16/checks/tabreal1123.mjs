// R-8 under test, by the only instrument that settles it: REAL Tab presses through CDP, reading
// document.activeElement after each one. No selector filter, no computed-style guess.
//
// Redesign's objection: my filter tested getComputedStyle(e).display on the ELEMENT, but a
// descendant of a display:none parent keeps its own computed display ("flex"), so the collapsed
// desktop nav passed a filter no browser honours. If that is right, the real sequence reaches the
// trial action in a handful of presses and never stops on a zero-size element.
const BASE = process.argv[2], LOC = process.argv[3] || "es";
const W = Number(process.argv[4] || 390), H = Number(process.argv[5] || 844);
const MAX = Number(process.argv[6] || 60);
const CDP = 9477, sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const list = await (await fetch(`http://127.0.0.1:${CDP}/json/list`)).json();
const ws = new WebSocket(list.find((t) => t.type === "page").webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener("open", r));
let id = 0; const pend = new Map();
ws.addEventListener("message", (e) => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } });
const sendMsg = (m, p = {}) => new Promise((r) => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method: m, params: p })); });
const ev = async (x) => { const r = await sendMsg("Runtime.evaluate", { expression: x, returnByValue: true, awaitPromise: true });
  if (r.result?.exceptionDetails) return { __error: (r.result.exceptionDetails.exception?.description || "").slice(0, 250) };
  return r.result?.result?.value; };
const build = async () => { try { const r = await fetch(`${BASE}/api/build`, { signal: AbortSignal.timeout(20000) }); const j = await r.json(); return `${j.commit?.slice(0, 7)}/${j.deployment}`; } catch { return "UNREACHABLE"; } };
const PIN = await build();
if (PIN === "UNREACHABLE") { console.log("ABORT: build endpoint unreachable"); process.exit(2); }
await sendMsg("Page.enable");
await sendMsg("Emulation.setDeviceMetricsOverride", { width: W, height: H, deviceScaleFactor: 2, mobile: true });
await sendMsg("Page.navigate", { url: `${BASE}/${LOC}` });
await sleep(6500);

const tab = async () => {
  await sendMsg("Input.dispatchKeyEvent", { type: "rawKeyDown", windowsVirtualKeyCode: 9, nativeVirtualKeyCode: 9, key: "Tab", code: "Tab" });
  await sendMsg("Input.dispatchKeyEvent", { type: "keyUp", windowsVirtualKeyCode: 9, nativeVirtualKeyCode: 9, key: "Tab", code: "Tab" });
  await sleep(140);
  return ev(`(()=>{const e=document.activeElement;
    if(!e||e===document.body) return {none:true,tag:e?e.tagName.toLowerCase():"null"};
    const r=e.getBoundingClientRect();
    const hiddenAncestor=(()=>{let p=e;let d=0;while(p&&p!==document.documentElement&&d<20){
      const c=getComputedStyle(p);
      if(c.display==="none") return "display:none on "+p.tagName.toLowerCase()+(typeof p.className==="string"&&p.className?"."+p.className.split(" ").slice(0,2).join("."):"");
      if(c.visibility==="hidden") return "visibility:hidden on "+p.tagName.toLowerCase();
      if(p.hasAttribute&&p.hasAttribute("hidden")) return "[hidden] on "+p.tagName.toLowerCase();
      p=p.parentElement;d++;} return null;})();
    return {none:false,tag:e.tagName.toLowerCase(),
      label:((e.getAttribute("aria-label")||e.innerText||e.textContent||e.value||"").replace(/[\\s\\u00a0]+/g," ").trim().slice(0,46)),
      href:(e.getAttribute("href")||"").slice(0,60),
      w:Math.round(r.width*10)/10,h:Math.round(r.height*10)/10,
      zero:(r.width===0||r.height===0), hiddenAncestor};})()`);
};

// start from a known place: focus the document, not an element
await ev(`document.body.focus&&document.body.focus(); if(document.activeElement&&document.activeElement.blur) document.activeElement.blur();`);
console.log(`\n######## REAL Tab presses  ${LOC}  ${W}x${H}  build ${PIN}`);
const seq = []; let trialAt = null, zeroStops = 0;
for (let i = 1; i <= MAX; i++) {
  const s = await tab();
  if (!s || s.__error) { console.log(`  ${i}: read failed ${s?.__error || ""}`); break; }
  if (s.none) { console.log(`  ${String(i).padStart(3)}: (focus left the page / body)`); seq.push(s); continue; }
  if (s.zero) zeroStops++;
  seq.push(s);
  const flag = s.zero ? `  <-- ZERO SIZE${s.hiddenAncestor ? " (" + s.hiddenAncestor + ")" : " (no hidden ancestor!)"}` : "";
  console.log(`  ${String(i).padStart(3)}: ${s.tag.padEnd(8)} ${String(s.w).padStart(5)}x${String(s.h).padEnd(5)} ${JSON.stringify(s.label).padEnd(44)}${s.href ? " -> " + s.href : ""}${flag}`);
  if (trialAt === null && (s.href.includes("interes=trial") || /Prueba Essential|Try Essential/i.test(s.label))) {
    trialAt = i; console.log(`       ^^^ the main free-trial action, reached after ${i} Tab presses`);
  }
  if (trialAt !== null && i >= trialAt + 3) break;
}
console.log(`\nRESULT  Tab presses to the free-trial action: ${trialAt ?? "not reached in " + MAX}`);
console.log(`        focus stops on zero-size elements: ${zeroStops}`);
const PIN2 = await build();
console.log(`        build start ${PIN}  end ${PIN2}  ${PIN === PIN2 ? "STABLE" : "*** MOVED - VOID ***"}`);
const fs = await import("node:fs");
fs.writeFileSync(process.argv[7] || `tabreal-${LOC}-${W}.json`, JSON.stringify({ pin: PIN, pinEnd: PIN2, locale: LOC, viewport: `${W}x${H}`, trialAt, zeroStops, seq }, null, 1));
process.exit(PIN === PIN2 ? 0 : 4);
