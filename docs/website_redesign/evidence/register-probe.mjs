// Audit register 704960b6 (45 statements) against the rendered ES pages of a build: per row, the Spanish words that make the
// function visible, and the pages where they render (server HTML, tags stripped). Usage: node register-probe.mjs <base>
const base = process.argv[2];
const pages = ["/es", "/es/platform", "/es/platform/ai-sales-agent", "/es/platform/crm", "/es/platform/daily-assistant", "/es/platform/lead-intelligence", "/es/packages", "/es/contact", "/es/faq", "/es/example-report"];
const rows = [
  [1, "replyEmail", ["por email", "por correo"]], [2, "replyOutOfHours", ["de noche", "fuera de horario"]],
  [3, "replyWhatsapp (our number)", ["nuestro número", "número de nuovasolution", "con tu número o con el nuestro", "el nuestro"]],
  [4, "whatsappOwnNumber (agency number)", ["whatsapp de la agencia", "conecta tu whatsapp", "tu número de whatsapp", "tu whatsapp"]],
  [5, "languageNoted", ["idioma", "en su idioma", "en español"]], [6, "mailboxConnection", ["buzón", "conecta tu correo"]],
  [7, "outlook", ["outlook"]], [8, "webform", ["formulario web", "formulario de tu web"]], [9, "phoneAssistant", ["teléfono", "llamada"]],
  [10, "adsLeads", ["portales", "anuncios"]], [11, "crm", ["ficha"]], [12, "priorityWithReason", ["prioridad", "motivo"]],
  [13, "origin", ["origen", "llegó por", "llegó"]], [14, "labels", ["etiqueta"]], [15, "oneRecordAcrossChannels", ["una sola ficha", "misma ficha", "un solo", "todos los canales"]],
  [16, "listingLink", ["anuncio que te envía", "lee el anuncio"]], [17, "reminders 1 h", ["a la hora", "recuerda"]], [18, "escalation 2 h", ["a las dos", "responsable"]],
  [19, "office hours", ["horario"]], [20, "alert", ["aviso", "avisa", "alerta"]], [21, "task title with name", ["llamar a mila"]],
  [22, "P-14 later answer updates task", ["17:00"]], [23, "taskList", ["lista de tareas", "sus tareas", "qué toca hacer"]], [24, "dailyVoice", ["por voz", "asistente diario", "de viva voz", "voz"]],
  [25, "teamRoles", ["roles", "reparten"]], [26, "matching", ["propone inmuebles", "encajan", "inmuebles que"]], [27, "followup", ["seguimiento", "permiso"]],
  [28, "reportInLogin", ["informe en tu cuenta", "en tu cuenta"]], [29, "weeklyEmail", ["informe de la semana", "en tu correo", "cada semana"]], [30, "reportTrend", ["pide tu atención", "tendencia"]],
  [31, "integrations", ["hubspot", "pipedrive", "zoho", "salesforce", "crm"]], [32, "model3d", ["3d"]], [33, "instagram", ["instagram", "redes sociales"]],
  [34, "plans + compare", ["essential", "growth", "enterprise", "comparar", "diferencias"]], [35, "pilotCta", ["14 días", "sin tarjeta"]],
  [36, "trial limits", ["750", "3 personas", "1 buzón", "un buzón"]], [37, "P-9 trial end", ["al terminar", "termina la prueba", "después de los 14", "cuando acaba"]],
  [38, "P-2 24 h", ["24 h"]], [39, "growth demo / enterprise talk", ["pide una demo", "demo de growth", "hablamos", "conversación"]], [40, "growth limits", ["8 personas", "3 crm"]],
  [41, "enterprise limits", ["50 personas", "10 crm", "sin límite", "25"]], [42, "X-1 varias oficinas", ["varias oficinas"]], [43, "X-5/X-6", ["1.000", "minutos", "feed"]],
  [44, "por escrito", ["por escrito"]], [45, "appointments", ["cita", "visita"]],
];
const strip = (h) => h.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ").toLowerCase();
const texts = {};
for (const p of pages) { const r = await fetch(base + p, { redirect: "manual" }); texts[p] = r.status === 200 ? strip(await r.text()) : `__status_${r.status}__`; }
console.log("pages:", Object.entries(texts).map(([p, t]) => `${p}=${t.startsWith("__") ? t : t.length}`).join(" | "));
for (const [n, key, terms] of rows) {
  const hits = [];
  for (const [p, t] of Object.entries(texts)) { const found = terms.filter((w) => t.includes(w)); if (found.length) hits.push(`${p.replace("/es", "") || "/"}[${found.join(",")}]`); }
  console.log(`${String(n).padStart(2)} ${key.padEnd(36)} ${hits.length ? hits.join(" ") : "-- NOT FOUND --"}`);
}
