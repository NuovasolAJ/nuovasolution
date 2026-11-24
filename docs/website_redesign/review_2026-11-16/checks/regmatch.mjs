// Offline matching against the text collected from bea7d19, so a wrong pattern of mine can be
// corrected without crawling the site again. Two passes, because a register comparison can fail in
// both directions:
//   PASS 1  per row: is the statement rendered? Patterns tightened after reading the contexts of the
//           first run (Z.9 had matched the contact page's own phone NUMBER, Z.24 a task button).
//   PASS 2  per ABSENT row: search for the words the statement would have to use if it were there,
//           so "not found" is a measured absence and not my regex being too narrow.
import fs from "node:fs";
const { pin, text } = JSON.parse(fs.readFileSync(process.argv[2] || "register-bea7d19-es-text.json", "utf8"));

const ROWS = [
  { n: 1, key: "replyEmail", cls: "belegt",
    re: [/Responde por .{0,20}email/i, /contesta en minutos por email/i, /respuesta .{0,20}por email/i] },
  { n: 2, key: "replyOutOfHours 'también de noche'", cls: "nachweis",
    re: [/tambi[eé]n de noche/i, /respuesta de noche/i, /con la oficina cerrada/i] },
  { n: 3, key: "replyWhatsapp über UNSERE Nummer", cls: "bau",
    re: [/Responde por WhatsApp/i, /WhatsApp y email/i, /o con el nuestro/i] },
  { n: 4, key: "whatsappOwnNumber über die Nummer DER AGENTUR", cls: "bau", exc: "Meta",
    re: [/WhatsApp,? con el n[uú]mero de tu agencia/i, /WhatsApp de (la|tu) agencia/i] },
  { n: 5, key: "languageNoted", cls: "belegt",
    re: [/Detecci[oó]n del idioma/i, /en su idioma/i, /Traducci[oó]n:/] },
  { n: 6, key: "mailboxConnection", cls: "bau",
    re: [/Conecta(mos)? tu buz[oó]n/i, /Tu correo de Gmail o de Outlook/i, /Buz[oó]n de la agencia/i] },
  { n: 7, key: "outlook", cls: "bau", re: [/Outlook/] },
  { n: 8, key: "webform als Kanal", cls: "bau", re: [/Formulario web/i, /Formulario\b(?!\s*de)/] },
  // tightened: the contact pages print NuovaSolution's OWN number under "TELÉFONO", which is not this claim
  { n: 9, key: "phoneAssistant als Kanal", cls: "bau", exc: "Anwalt (Prod-Telefon)",
    re: [/no confirma citas/i, /Formulario Tel[eé]fono/i, /llamadas de tel[eé]fono/i, /asistente .{0,14}tel[eé]fono/i] },
  { n: 10, key: "adsLeads 'portales y anuncios'", cls: "bau", exc: "Meta (Teil)",
    re: [/portales y anuncios/i, /Leads de anuncios/i] },
  { n: 11, key: "crm 'Cada consulta en su ficha'", cls: "belegt", re: [/Cada consulta en su ficha/i, /queda en su ficha/i] },
  { n: 12, key: "priorityWithReason", cls: "belegt", re: [/con su prioridad y su motivo/i] },
  { n: 13, key: "origin WhatsApp oder E-Mail", cls: "belegt", re: [/Herkunft/i, /WhatsApp · \d/, /Email · \d/, /de d[oó]nde (viene|llega)/i, /por canal/i] },
  { n: 14, key: "labels im Gmail-Postfach", cls: "belegt", re: [/Etiquetas en tu bandeja de Gmail/i, /con su etiqueta/i, /Etiquetas de email/i] },
  { n: 15, key: "oneRecordAcrossChannels", cls: "nachweis", re: [/una sola ficha/i, /un solo registro/i, /la misma persona/i] },
  { n: 16, key: "listingLink", cls: "belegt", re: [/Lee el anuncio/i, /el anuncio que te env[ií]a/i] },
  { n: 17, key: "reminders 1 h", cls: "belegt", re: [/te la recuerda a la hora/i, /se lo recordamos a Marta/i, /lo recordamos/i] },
  { n: 18, key: "Eskalation 2 h 'avisa al responsable a las dos'", cls: "belegt",
    re: [/avisa al responsable/i, /a las dos horas/i, /pasa a .{0,18}responsable/i, /escala/i] },
  // false negative in run 1: /platform renders "Avisos de consultas importantes"
  { n: 20, key: "alert per Mail an die richtige Person", cls: "bau",
    re: [/Avisos? de consultas importantes/i, /Un email a la persona/i, /te avisamos por (correo|email)/i, /aviso al m[oó]vil/i] },
  { n: 21, key: "P-11 Aufgabentitel MIT Kundennamen und Objekt", cls: "bau", re: [/Llamar a Mila/i, /9895153/] },
  { n: 22, key: "P-14 spätere Antwort aktualisiert die Aufgabe", cls: "bau", re: [/a partir de las 17:00/i] },
  { n: 23, key: "taskList 'Cada persona, su lista de tareas'", cls: "nachweis/bau", re: [/su lista de tareas/i, /Cada persona, su lista/i] },
  // "Tomar" in run 1 was a task-action button, not the voice assistant
  { n: 24, key: "dailyVoice Sprach-Tagesassistent", cls: "bau", re: [/asistente de voz/i, /\bpor voz\b/i, /dictar/i, /hablar con el asistente/i] },
  { n: 25, key: "teamRoles / 'para Marta'", cls: "bau", re: [/Tu equipo y sus roles/i, /TAREA PARA MARTA/i, /para Marta/, /se reparten el trabajo/i] },
  { n: 26, key: "matching 'inmuebles que encajan'", cls: "bau", re: [/inmuebles que encajan/i, /selecci[oó]n corta del inventario/i, /de tu cartera que encajan/i] },
  { n: 27, key: "followup 'con su permiso'", cls: "bau", exc: "Anwalt",
    re: [/Seguimiento de tus contactos, con su permiso/i, /solo con permiso/i] },
  { n: 28, key: "reportInLogin", cls: "belegt", re: [/informe en tu (cuenta|acceso)/i, /est[aá] en tu acceso/i] },
  { n: 29, key: "weeklyEmail — der Bericht kommt per MAIL", cls: "bau",
    re: [/informe .{0,30}en tu correo/i, /te lo enviamos por (correo|email)/i, /cada lunes .{0,20}correo/i] },
  { n: 30, key: "reportTrend 'lo que pide tu atención'", cls: "bau", re: [/lo que pide tu atenci[oó]n/i, /tendencia/i] },
  { n: 31, key: "integrations — CRM-Namen", cls: "bau", re: [/HubSpot/i, /Pipedrive/i, /Zoho/i, /Salesforce/i] },
  { n: 32, key: "model3d als Angebot", cls: "bau", re: [/Visualizaci[oó]n 3D/i, /Tu plano, en 3D/i, /modelo 3D/i] },
  { n: 33, key: "instagram / Social", cls: "bau", exc: "Meta", re: [/desde tus redes sociales/i, /Instagram/i, /redes sociales/i] },
  { n: 34, key: "plans und Vergleichstabelle", cls: "bau", re: [/Elige tu plan/i, /Todo lo de Essential/i, /Todo lo de Growth/i] },
  { n: 35, key: "pilotCta '14 días gratis, sin tarjeta'", cls: "bau", re: [/14 d[ií]as gratis, sin tarjeta/i, /Prueba Essential gratis/i] },
  { n: 36, key: "Testgrenzen 3 Personen / 750 / 1 Postfach / 1 CRM", cls: "bau",
    re: [/3 personas/i, /750 consultas/i, /1 buz[oó]n/i, /l[ií]mites de la prueba/i] },
  { n: 37, key: "P-9 was nach dem Testende passiert", cls: "bau",
    re: [/cuando (termina|acaba) la prueba/i, /al acabar los 14/i, /despu[eé]s de los 14 d[ií]as/i, /fin de la prueba/i] },
  { n: 38, key: "P-2 'Te escribimos en 24 h'", cls: "bau", re: [/en 24 ?h/i, /24 horas laborables/i] },
  { n: 39, key: "Growth → Demo, Enterprise → Gespräch", cls: "bau", re: [/Pedir la demo/i, /Hablemos de Enterprise/i, /Pide una demo de Growth/i] },
  { n: 40, key: "Growth 8 Personen / 3 CRM", cls: "bau", re: [/8 personas/i, /3 conexiones/i, /tres CRM/i] },
  { n: 41, key: "Enterprise 50 Personen / 10 CRM / 3D-Kontingent", cls: "bau", re: [/Hasta 50 personas/i, /10 CRM/i, /hasta 10 conexiones/i] },
  { n: 42, key: "X-1 'varias oficinas'", cls: "bau", re: [/varias oficinas/i, /una oficina/i] },
  { n: 43, key: "X-5 1.000 Minuten / X-6 Objekt-Feed", cls: "bau", re: [/1\.?000 minutos/i, /minutos de tel[eé]fono/i, /feed/i] },
  { n: 44, key: "'Las condiciones, por escrito.'", cls: "bau", exc: "Anwalt", re: [/condiciones,? por escrito/i, /Todo por escrito/i] },
  { n: 45, key: "Termine — eine Person bestätigt", cls: "nachweis", re: [/una persona la confirma/i, /petici[oó]n de visita/i] },
];

const find = (re) => {
  const hits = [];
  for (const [path, t] of Object.entries(text)) {
    if (!t) continue;
    const m = t.match(re);
    if (m) { const i = t.indexOf(m[0]); hits.push({ path, match: m[0], ctx: t.slice(Math.max(0, i - 55), i + 85).replace(/\s+/g, " ").trim() }); }
  }
  return hits;
};

const out = [];
for (const row of ROWS) {
  let hits = [];
  for (const re of row.re) { hits = find(re); if (hits.length) { row.hit = String(re); break; } }
  out.push({ ...row, rendered: hits.length > 0, hits });
}

const gaps = out.filter((r) => r.rendered && r.cls !== "belegt");
const proven = out.filter((r) => r.rendered && r.cls === "belegt");
const absent = out.filter((r) => !r.rendered);

console.log(`######## register comparison on ${pin}, ES, offline re-match\n`);
console.log(`rendered and NOT "belegt"  -> GAP LIST: ${gaps.length}`);
console.log(`rendered and "belegt":       ${proven.length}`);
console.log(`not rendered:                ${absent.length}\n`);

console.log(`===== GAP LIST for the public launch =====`);
for (const r of gaps) {
  console.log(`\nZ.${String(r.n).padStart(2)}  ${r.key}   [${r.cls}${r.exc ? " · Ausnahme " + r.exc : ""}]`);
  console.log(`     auf: ${[...new Set(r.hits.map((h) => h.path))].join(", ")}`);
  console.log(`     wie: "${r.hits[0].ctx.slice(0, 130)}"`);
}
console.log(`\n\n===== rendered and proven (no gap) =====`);
for (const r of proven) console.log(`  Z.${String(r.n).padStart(2)}  ${r.key}  — ${[...new Set(r.hits.map((h) => h.path))].slice(0, 5).join(", ")}`);
console.log(`\n\n===== NOT rendered =====`);
for (const r of absent) console.log(`  Z.${String(r.n).padStart(2)}  [${r.cls}] ${r.key}`);

// PASS 2: prove each absence is not my regex being narrow
console.log(`\n\n===== absence check: do the words appear at all? =====`);
const PROBE = {
  18: [/responsable/i, /dos horas/i, /2 h\b/i, /escal/i],
  24: [/\bvoz\b/i, /asistente/i, /hablar/i],
  29: [/informe/i, /correo/i, /semana/i],
  31: [/CRM/i, /integraci/i, /conecta/i],
  36: [/l[ií]mite/i, /personas/i, /consultas al mes/i, /750/],
  37: [/prueba/i, /14 d[ií]as/i, /termina/i],
  38: [/24/, /horas/i, /laborables/i],
  40: [/8 /, /conexiones/i, /personas/i],
  42: [/oficina/i],
  43: [/minutos/i, /feed/i, /cartera/i],
};
for (const r of absent) {
  const probes = PROBE[r.n] || [];
  const found = probes.map((p) => { const h = find(p); return `${String(p)}: ${h.length ? h.length + "x (" + h[0].path + ' "' + h[0].match + '")' : "0"}`; });
  console.log(`  Z.${String(r.n).padStart(2)} ${r.key}`);
  for (const f of found) console.log(`       ${f}`);
}
fs.writeFileSync(process.argv[3] || "register-verdict-bea7d19.json", JSON.stringify({ pin, gaps, proven, absent }, null, 1));
