// Page-by-page comparison against Audit's promise register (governance/WEBSITE_VERSPRECHEN_REGISTER_1120_v1.md,
// 704960b6). Per the owner's rule of 23.11. the preview shows NuovaSolution at 100 %, so a statement
// whose register class is not "belegt" is NOT a preview defect -- it goes on the GAP LIST for the
// public launch. Audit's §E adds the other direction: a rendered statement with NO register row is a
// finding.
//
// Method: collect the text a visitor actually reads per page (innerText after walking the page so
// lazy sections render and the demo reaches its end state), then match the register's own wording in
// Node, where the patterns can be read and corrected. Build pinned at start and end.
//
// Deliberate limits, stated rather than hidden:
//  - innerText only. A statement split across elements is still caught because innerText is the
//    joined visible text, which is what the earlier mark scan taught me.
//  - /faq is an accordion: the walk opens each trigger alone, as marks2.mjs does.
//  - ES only. Audit's register is written in ES wording; EN is checked for the rows where a gap would
//    differ by language (none found so far), and that is stated in the report, not assumed away.
const BASE = process.argv[2];
const OUT = process.argv[3] || "register-bea7d19-es.json";
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
if (PIN === "UNREACHABLE") { console.log("ABORT: build endpoint unreachable - nothing compared, NOT a pass"); process.exit(2); }
await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
await send("Emulation.setTouchEmulationEnabled", { enabled: true, maxTouchPoints: 5 });

const PAGES = ["/", "/packages", "/platform", "/faq", "/contact?interes=trial&plan=essential",
  "/contact?interes=demo&plan=growth", "/contact?interes=talk&plan=enterprise", "/example-report", "/trial"];

const text = {};
for (const path of PAGES) {
  let ok = false;
  for (let a = 1; a <= 3 && !ok; a++) {
    await send("Page.navigate", { url: `${BASE}/es${path}` }); await sleep(a === 1 ? 6200 : 7600);
    const c = await ev(`(()=>({len:(document.body.innerText||"").length,url:location.pathname}))()`);
    ok = c && !c.__error && c.len > 300;
  }
  if (!ok) { console.log(`  ${path}: ABORT - never loaded, this page contributes NOTHING and is not read as "absent"`); text[path] = null; continue; }
  // walk the page so lazy sections render and the demo reaches its end state; open each accordion alone
  await ev(`(async()=>{const s=()=>new Promise(r=>setTimeout(r,110));
    for(let y=0;y<document.body.scrollHeight;y+=420){window.scrollTo(0,y);await s();}
    window.scrollTo(0,0);await s();return true;})()`);
  await sleep(2600);
  const parts = await ev(`(async()=>{const s=(ms)=>new Promise(r=>setTimeout(r,ms));
    const seen=[document.body.innerText||""];
    const trig=[...document.querySelectorAll("summary,[aria-expanded],button[aria-controls]")];
    for(const t of trig){ try{ t.click(); await s(70); seen.push(document.body.innerText||""); }catch(e){} }
    return seen;})()`);
  const joined = (Array.isArray(parts) ? parts : [""]).join("\n").replace(/[ \t\u00a0]+/g, " ");
  text[path] = joined;
  console.log(`  ${path.padEnd(42)} ${joined.length} chars read`);
}

// --- the register's own wording, row by row -------------------------------------------------
// cls: the class Audit assigns. "belegt" | "nachweis" (nur Nachweis fehlt) | "bau" (Bau oder externe
// Freigabe). exc: an owner exception, which Audit marks as an exception and NOT as a gap.
const ROWS = [
  { n: 1, key: "replyEmail", cls: "belegt", re: [/Responde por email/i, /contesta .{0,24}por email/i, /respuesta por email/i] },
  { n: 2, key: "replyOutOfHours", cls: "nachweis", re: [/tambi[eé]n de noche/i, /con la oficina cerrada/i] },
  { n: 3, key: "replyWhatsapp (unsere Nummer)", cls: "bau", re: [/Responde por WhatsApp/i, /WhatsApp y email/i] },
  { n: 4, key: "whatsappOwnNumber", cls: "bau", exc: "Meta", re: [/WhatsApp de (la|tu) agencia/i, /n[uú]mero de tu agencia/i, /con el nuestro/i] },
  { n: 5, key: "languageNoted", cls: "belegt", re: [/detecta(mos)? (el )?idioma/i, /reconoce el idioma/i, /en su idioma/i, /Traducci[oó]n:/i] },
  { n: 6, key: "mailboxConnection", cls: "bau", re: [/Conecta tu buz[oó]n/i, /Conectamos tu buz[oó]n/i, /tu correo de Gmail o de Outlook/i] },
  { n: 7, key: "outlook", cls: "bau", re: [/Outlook/i] },
  { n: 8, key: "webform", cls: "bau", re: [/formulario web/i, /\bFormulario\b/] },
  { n: 9, key: "phoneAssistant", cls: "bau", exc: "Anwalt (Prod-Telefon)", re: [/no confirma citas/i, /Tel[eé]fono/i] },
  { n: 10, key: "adsLeads", cls: "bau", exc: "Meta (Teil)", re: [/portales y anuncios/i, /anuncios/i] },
  { n: 11, key: "crm", cls: "belegt", re: [/Cada consulta en su ficha/i, /en su ficha/i] },
  { n: 12, key: "priorityWithReason", cls: "belegt", re: [/con su prioridad y su motivo/i, /prioridad/i] },
  { n: 13, key: "origin", cls: "belegt", re: [/Herkunft|procedencia|de d[oó]nde (viene|llega)/i, /WhatsApp · |Email · /] },
  { n: 14, key: "labels", cls: "belegt", re: [/etiquetas?/i] },
  { n: 15, key: "oneRecordAcrossChannels", cls: "nachweis", re: [/una sola ficha/i, /un solo registro/i, /misma persona/i] },
  { n: 16, key: "listingLink", cls: "belegt", re: [/Lee el anuncio/i, /el anuncio que te env[ií]a/i] },
  { n: 17, key: "reminders 1h", cls: "belegt", re: [/te la recuerda a la hora/i, /se lo recordamos a Marta/i, /recordamos/i] },
  { n: 18, key: "Eskalation 2h", cls: "belegt", re: [/avisa al responsable a las dos/i, /avisa al responsable/i] },
  { n: 20, key: "alert", cls: "bau", re: [/avis(o|a) por (correo|email)/i, /alerta/i] },
  { n: 21, key: "P-11 Aufgabentitel mit Kunde und Objekt", cls: "bau", re: [/Llamar a Mila/i, /9895153/] },
  { n: 22, key: "P-14 spätere Antwort aktualisiert die Aufgabe", cls: "bau", re: [/a partir de las 17:00/i] },
  { n: 23, key: "taskList", cls: "nachweis/bau", re: [/su lista de tareas/i, /Cada persona, su lista/i] },
  { n: 24, key: "dailyVoice", cls: "bau", re: [/asistente de voz/i, /por voz/i, /Tomar\b/] },
  { n: 25, key: "teamRoles", cls: "bau", re: [/Tu equipo y sus roles/i, /PARA MARTA/i, /para Marta/, /se reparten el trabajo/i] },
  { n: 26, key: "matching", cls: "bau", re: [/Propone inmuebles que encajan/i, /inmuebles que encajan/i, /selecci[oó]n corta del inventario/i] },
  { n: 27, key: "followup", cls: "bau", exc: "Anwalt", re: [/Seguimiento/i, /con su permiso/i] },
  { n: 28, key: "reportInLogin", cls: "belegt", re: [/un informe en tu cuenta/i, /informe en tu acceso/i, /en tu acceso/i] },
  { n: 29, key: "weeklyEmail", cls: "bau", re: [/el informe de la semana/i, /en tu correo/i] },
  { n: 30, key: "reportTrend", cls: "bau", re: [/lo que pide tu atenci[oó]n/i, /tendencia/i] },
  { n: 31, key: "integrations (CRM-Namen)", cls: "bau", re: [/HubSpot/i, /Pipedrive/i, /Zoho/i, /Salesforce/i] },
  { n: 32, key: "model3d", cls: "bau", re: [/\b3D\b/, /Por encargo/i] },
  { n: 33, key: "instagram", cls: "bau", exc: "Meta", re: [/redes sociales/i, /Instagram/i] },
  { n: 34, key: "plans + Vergleichstabelle", cls: "bau", re: [/Elige tu plan/i, /Essential/, /Growth/, /Enterprise/] },
  { n: 35, key: "pilotCta 14 días gratis", cls: "bau", re: [/Prueba Essential gratis/i, /14 d[ií]as gratis/i, /sin tarjeta/i] },
  { n: 36, key: "Testgrenzen 3 Personen / 750 / 1 Postfach / 1 CRM", cls: "bau", re: [/3 personas/i, /750/, /1 buz[oó]n/i] },
  { n: 37, key: "P-9 nach dem Testende", cls: "bau", re: [/cuando (termina|acaba) la prueba/i, /al final de la prueba/i, /despu[eé]s de los 14/i] },
  { n: 38, key: "P-2 'Te escribimos en 24 h'", cls: "bau", re: [/en 24 ?h/i, /24 horas laborables/i] },
  { n: 39, key: "Growth→Demo, Enterprise→Gespräch", cls: "bau", re: [/Pedir la demo/i, /Hablemos de Enterprise/i, /plan Growth/i] },
  { n: 40, key: "Growth 8 Personen / 3 CRM", cls: "bau", re: [/8 personas/i, /3 conexiones/i, /3 CRM/i] },
  { n: 41, key: "Enterprise 50 Personen / 10 CRM / 3D 25", cls: "bau", re: [/Hasta 50 personas/i, /10 CRM/i, /25 /] },
  { n: 42, key: "X-1 varias oficinas", cls: "bau", re: [/varias oficinas/i, /una oficina/i] },
  { n: 43, key: "X-5 1.000 Minuten / X-6 Feed", cls: "bau", re: [/1\.?000 minutos/i, /feed/i] },
  { n: 44, key: "'Las condiciones, por escrito.'", cls: "bau", exc: "Anwalt", re: [/Las condiciones, por escrito/i, /condiciones por escrito/i, /por escrito/i] },
  { n: 45, key: "Termine", cls: "nachweis", re: [/confirma la (cita|visita)/i, /\bvisita\b/i, /\bcita\b/i] },
];

console.log(`\n######## register comparison, ES, build ${PIN}`);
const out = [];
for (const row of ROWS) {
  const hits = [];
  for (const [path, t] of Object.entries(text)) {
    if (!t) continue;
    for (const re of row.re) {
      const m = t.match(re);
      if (m) { const i = t.indexOf(m[0]); hits.push({ path, match: m[0], ctx: t.slice(Math.max(0, i - 48), i + 76).replace(/\n/g, " ") }); break; }
    }
  }
  out.push({ ...row, re: row.re.map(String), rendered: hits.length > 0, hits });
}
const unreadable = Object.entries(text).filter(([, t]) => !t).map(([p]) => p);
const renderedNotProven = out.filter((r) => r.rendered && r.cls !== "belegt");
const notRendered = out.filter((r) => !r.rendered);

console.log(`\n--- rendered AND not "belegt"  ->  GAP LIST for the public launch (${renderedNotProven.length}) ---`);
for (const r of renderedNotProven) console.log(`  Z.${String(r.n).padStart(2)} ${r.cls.padEnd(14)}${r.exc ? "[Ausnahme " + r.exc + "] " : ""}${r.key}\n        auf ${[...new Set(r.hits.map((h) => h.path))].join(", ")}  z.B. ${JSON.stringify(r.hits[0].match)}`);
console.log(`\n--- rendered and "belegt" (${out.filter((r) => r.rendered && r.cls === "belegt").length}) ---`);
for (const r of out.filter((x) => x.rendered && x.cls === "belegt")) console.log(`  Z.${String(r.n).padStart(2)} ${r.key}  auf ${[...new Set(r.hits.map((h) => h.path))].slice(0, 4).join(", ")}`);
console.log(`\n--- NOT found in the rendered text (${notRendered.length}) - either genuinely absent or my pattern is wrong ---`);
for (const r of notRendered) console.log(`  Z.${String(r.n).padStart(2)} ${r.cls.padEnd(14)}${r.key}`);
if (unreadable.length) console.log(`\n*** pages that never loaded and therefore prove NOTHING: ${unreadable.join(", ")}`);

const PIN2 = await build();
console.log(`\n  build start ${PIN}  end ${PIN2}  ${PIN === PIN2 ? "STABLE" : "*** MOVED - VOID ***"}`);
const fs = await import("node:fs");
fs.writeFileSync(OUT, JSON.stringify({ pin: PIN, pinEnd: PIN2, pages: Object.keys(text), unreadable, rows: out }, null, 1));
// The collected text is saved too, so a pattern can be corrected and re-matched WITHOUT crawling
// again: a wrong pattern is my error, and re-reading the site to fix my own regex would also risk
// comparing against a different moment. (Z.20 was a false negative of exactly this kind: /platform
// renders "Avisos de consultas importantes" and my pattern looked for "aviso por correo".)
fs.writeFileSync(OUT.replace(/\.json$/, "") + "-text.json", JSON.stringify({ pin: PIN, text }, null, 1));
process.exit(PIN === PIN2 ? 0 : 4);
