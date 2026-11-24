// F22b, final: the "teléfono" tick in the comparison matrix.
// Two lessons folded in:
//  - /es/packages renders only ~3k chars of innerText; the matrix lives behind three
//    "Ver todo lo que incluye" triggers and in textContent (content-visibility), so the row must be
//    OPENED and read via textContent.
//  - every whitespace pattern is built with new RegExp("\\s+") instead of a regex literal inside the
//    template, because a literal \s in a template literal decays to s and silently eats the letter
//    (my own diagnostic printed "vi ta previa" and "la diferencia" one run ago).
const BASE = process.argv[2];
const CDP = 9477, sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const list = await (await fetch(`http://127.0.0.1:${CDP}/json/list`)).json();
const ws = new WebSocket(list.find((t) => t.type === "page").webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener("open", r));
let id = 0; const pend = new Map();
ws.addEventListener("message", (e) => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } });
const send = (m, p = {}) => new Promise((r) => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method: m, params: p })); });
const ev = async (x) => { const r = await send("Runtime.evaluate", { expression: x, returnByValue: true, awaitPromise: true });
  if (r.result?.exceptionDetails) return { __error: (r.result.exceptionDetails.exception?.description || "").slice(0, 300) };
  return r.result?.result?.value; };
const build = async () => { try { const r = await fetch(`${BASE}/api/build`, { signal: AbortSignal.timeout(20000) }); const j = await r.json(); return `${j.commit?.slice(0, 7)}/${j.deployment}`; } catch { return "UNREACHABLE"; } };
const PIN = await build();
if (PIN === "UNREACHABLE") { console.log("ABORT: build unreachable"); process.exit(2); }
const fs = await import("node:fs");
await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
await send("Emulation.setTouchEmulationEnabled", { enabled: true, maxTouchPoints: 5 });
await send("Page.navigate", { url: `${BASE}/es/packages` });
await sleep(7200);

const opened = await ev(`(async()=>{const WS=new RegExp("\\\\s+","g");
  const s=(ms)=>new Promise(r=>setTimeout(r,ms));
  const trig=[...document.querySelectorAll("button,summary,[role=button]")]
    .filter(b=>/Ver todo lo que incluye|Ver las diferencias/i.test((b.textContent||"").replace(WS," ")));
  let n=0;
  for(const b of trig){ try{ b.scrollIntoView({block:"center",behavior:"instant"}); await s(220); b.click(); n++; await s(600);}catch(e){} }
  await s(900);
  return {clicked:n, expanded:[...document.querySelectorAll("[aria-expanded=true]")].length};})()`);
console.log(`\n######## F22b  build ${PIN}   Auslöser geöffnet: ${opened?.clicked}, jetzt offen: ${opened?.expanded}`);

const probe = await ev(`(()=>{const WS=new RegExp("\\\\s+","g");
  const clean=(s)=>(s||"").replace(WS," ").trim();
  const tc=clean(document.body.textContent);
  const i=tc.search(/tel[eé]f[oó]n/i);
  if(i<0) return {present:false, textLen:tc.length,
    matrixSeen:/INTEGRACIONES|CANALES|Etiquetas en tu bandeja/i.test(tc)};
  const own=(e)=>{let s="";for(const n of e.childNodes) if(n.nodeType===3) s+=n.nodeValue; return clean(s);};
  const hit=[...document.querySelectorAll("*")].filter(e=>/tel[eé]f[oó]n/i.test(own(e)));
  const e=hit[0];
  if(!e) return {present:true, inTextOnly:true, textLen:tc.length, ctx:tc.slice(Math.max(0,i-170),i+170)};
  const row=e.closest("tr,[role=row],li")||e.parentElement;
  const cells=row?[...row.children].map(c=>{
    const t=clean(c.textContent);
    const svg=c.querySelector("svg");
    return {tag:c.tagName.toLowerCase(), text:t.slice(0,44),
      tickGlyph:/[✓✔☑]/.test(t), dash:/[—–-]/.test(t)&&t.length<=3,
      svg: svg?(svg.getAttribute("aria-label")||svg.getAttribute("data-icon")||"svg-ohne-Namen"):null,
      srLabels:[...c.querySelectorAll("[aria-label],[title]")].map(x=>x.getAttribute("aria-label")||x.getAttribute("title"))};
  }):[];
  const r=e.getBoundingClientRect();
  return {present:true, textLen:tc.length, label:own(e),
    y:Math.round(r.top+window.scrollY),
    rowTag:row?row.tagName.toLowerCase():null, rowText:clean(row?.textContent).slice(0,180), cells,
    rowOuter:row?clean(row.outerHTML).slice(0,600):null};})()`);

if (!probe?.present) {
  console.log(`  "teléfono" kommt im gesamten textContent NICHT vor (${probe?.textLen} Zeichen, Tabelle erkennbar: ${probe?.matrixSeen}).`);
} else {
  console.log(`  gefunden: ${JSON.stringify(probe.label || probe.ctx?.slice(0, 120))}  y=${probe.y}`);
  console.log(`  Zeile <${probe.rowTag}>: ${JSON.stringify(probe.rowText)}`);
  for (const c of probe.cells || []) console.log(`     <${c.tag}> ${JSON.stringify(c.text)}  Haken-Zeichen=${c.tickGlyph}  Strich=${c.dash}  svg=${JSON.stringify(c.svg)}  sr=${JSON.stringify(c.srLabels)}`);
  if (probe.rowOuter) console.log(`  markup: ${probe.rowOuter.slice(0, 420)}`);
  await ev(`window.scrollTo(0,${Math.max(0, (probe.y || 0) - 230)})`);
  await sleep(900);
  const r = await send("Page.captureScreenshot", { format: "png" });
  if (r.result?.data) { fs.writeFileSync("audit-F22b-es390-telefono.png", Buffer.from(r.result.data, "base64")); console.log(`  Bild: audit-F22b-es390-telefono.png`); }
}
const PIN2 = await build();
console.log(`  build start ${PIN} end ${PIN2} ${PIN === PIN2 ? "STABLE" : "*** MOVED - VOID"}`);
fs.writeFileSync("f22b-final.json", JSON.stringify({ pin: PIN, pinEnd: PIN2, opened, probe }, null, 1));
process.exit(0);
