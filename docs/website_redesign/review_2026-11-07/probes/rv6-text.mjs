// RV6 text layer: crawl every route in BOTH views and BOTH languages from the delivered HTML.
// P-1 (no status word / no coming-soon sentence), P-2/P-3 (the notice), P-5 (the views differ),
// C-1/C-2 (the claims ceiling, split), A-19 (the figures and their sums), A-23 (the alert lines),
// D-2 (the register's sentences), E (the plans), A-14 (routes, one h1).
// The bypass secret is read from the secret store and never printed.
import { readFileSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";

const BYPASS = readFileSync("C:/Users/Usuario/.nuova-secrets/stg_website_preview_bypass.txt", "utf8").trim();
const BASE = "https://nuovasolution-design-preview-c0ktpvgrs-nuovasolajs-projects.vercel.app";
const H = { "x-vercel-protection-bypass": BYPASS };

const ENT = { amp: "&", lt: "<", gt: ">", quot: '"', "#39": "'", nbsp: " ", "#x27": "'", aacute: "á", eacute: "é", iacute: "í", oacute: "ó", uacute: "ú", ntilde: "ñ", middot: "·", hellip: "…", mdash: "—", ndash: "–", euro: "€", deg: "°", times: "×" };
const dec = (s) => s.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (m, k) => {
  if (ENT[k]) return ENT[k];
  if (k[0] === "#") return String.fromCodePoint(parseInt(k.slice(1).replace("x", ""), k[1] === "x" ? 16 : 10));
  return m;
});

function parse(html) {
  const noScript = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<svg[\s\S]*?<\/svg>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ");
  // sr-only / visually hidden text, kept apart so we can say where a word lives
  const sr = [...noScript.matchAll(/<[^>]+class="[^"]*(sr-only|visually-hidden)[^"]*"[^>]*>([\s\S]*?)<\//gi)].map((m) => dec(m[2].replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim()).filter(Boolean);
  const attrs = [...noScript.matchAll(/\b(aria-label|title|alt|placeholder)="([^"]*)"/gi)].map((m) => `${m[1]}=${dec(m[2])}`);
  const text = dec(noScript.replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();
  return {
    text,
    sr,
    attrs,
    title: dec(/<title[^>]*>([^<]*)/i.exec(html)?.[1] || ""),
    h1: [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => dec(m[1].replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim()),
    links: [...html.matchAll(/href="(\/[^"#?]*)/g)].map((m) => m[1]),
    videos: [...html.matchAll(/<(video|source|img)[^>]+(src|srcSet|srcset)="([^"]+)"/gi)].map((m) => m[3]),
    sha: createHash("sha256").update(text).digest("hex").slice(0, 12),
  };
}

const BANNED = {
  proximamente: /pr[oó]ximamente/i,
  comingSoon: /coming soon/i,
  enPreparacion: /en preparaci[oó]n/i,
  prototipo: /prototipo/i,
  inPreparation: /in preparation/i,
  incluido: /\bincluido\b/i,
  noIncluido: /no incluido/i,
  included: /\bincluded\b/i,
  notIncluded: /not included/i,
  disponible: /\bdisponible\b/i,
  hoyNo: /hoy no\b/i,
  pronto: /\bpronto\b/i,
  enBreve: /en breve/i,
  todavia: /todav[ií]a/i,
  multilingue: /multiling[uü]e/i,
  enSuIdioma: /en su idioma/i,
  visitaConfirmada: /visita confirmada/i,
  buzonQueOperamos: /buz[oó]n que operamos|mailbox we operate/i,
  prices: /\b(349|649|999)\s*€/,
  recomendado: /recomendado|m[aá]s popular|el m[aá]s completo/i,
  score98: /\b9[0-9]\s*\/\s*100\b/,
  datosUE: /todos los datos en la ue/i,
  propioNumero: /tu propio n[uú]mero/i,
  fps60: /60\s*fps|lighthouse\s*100/i,
  money: /m[aá]s ingresos|m[aá]s ventas|m[aá]s comisiones|\bROI\b|recuperas|ahorras \d+ horas/i,
  twentySixPct: /\b26\s*%/,
  connectImperative: /conecta tus canales|conecta tu gmail|conecta tu whatsapp|connect your (mailbox|channels|gmail)/i,
  alreadyConnected: /canales est[aá]n conectados|ya recibimos tus consultas|tu buz[oó]n ya responde/i,
};

const TARGET_ONLY = {
  trial14: /14 d[ií]as gratis|pru[eé]balo gratis 14 d[ií]as|try it free for 14 days/i,
  creaCuenta: /crea tu cuenta|create your account/i,
  sinMetodoPago: /sin m[eé]todo de pago|no payment method/i,
  connectWithYou: /conectamos (contigo )?(el buz[oó]n|tu buz[oó]n)|we connect (your|the) (mailbox|agency's mailbox)/i,
  alertYes: /avisa por email a la persona que toca|alerts the right person by e-mail/i,
  crmNames: /hubspot/i,
  planNames: /essential/i,
};

const NOTICE_ES = "Vista previa, no pública. Muestra el producto completo, incluidas funciones que no están activas. Datos de ejemplo: nada de lo que introduzcas crea una cuenta ni llega a nadie.";
const NOTICE_EN = "Preview, not public. It shows the complete product, including functions that are not active. Example data: nothing you enter creates an account or reaches anyone.";

const FIG = {
  f25: /\b25\b/, f23: /\b23\b/, f6: /\b6\b/, f4: /\b4\b/,
  noMedido: /no medido/gi,
  ch10: /WhatsApp[^0-9]{0,40}\b10\b/i,
  ch14: /WhatsApp[^0-9]{0,40}\b14\b/i,
  insight10de25: /10 de 25|10 of 25/i,
  insight14de25: /14 de 25|14 of 25/i,
  rates: /92\s*%[\s\S]{0,400}?24\s*%[\s\S]{0,400}?16\s*%/,
  hoursLine: /de 10:00 a 14:00 y de 17:00 a 20:00|10:00 to 14:00 and 17:00 to 20:00/i,
  peak: /11:00\s*[–-]\s*12:00/,
  baseLine: /Base: consultas registradas en NuovaSolution/i,
  sinCon: /Sin NuovaSolution[\s\S]{0,80}Con NuovaSolution|Without NuovaSolution[\s\S]{0,80}With NuovaSolution/i,
  sinConMark: /Ejemplo con datos ficticios[\s\S]{0,30}la misma semana|Example with fictional data/i,
  quieninclude: /Qu[eé] incluye|What's included/i,
  solicitaPropuesta: /Solicita una propuesta|Request a proposal/i,
  pedirAcceso: /Pedir acceso|Request access/i,
  accesoInvitacion: /Acceso por invitaci[oó]n/i,
  demoMark: /Demo con datos ficticios/i,
  heroMark: /Casa de ejemplo ficticia/i,
  senderLabel: /Asistente autom[aá]tico de la agencia/i,
  enEspanol: /en espa[nñ]ol|in Spanish/i,
  visitaNoCita: /no es una cita/i,
  laura: /Laura/g,
  anoto: /apunto|anoto/i,
  segundaResidencia: /segunda residencia/i,
  newReply: /¿Te viene mejor por la ma[nñ]ana o por la tarde para una visita\?|Would the morning or the afternoon suit you better/i,
  nuovaAlone: /Nuova(?!Solution)/g,
  tomar: /Tomar\b/i,
  eligeCanal: /Elige un canal y mira c[oó]mo responde|Choose a channel and see how it replies/i,
};

const seen = new Set();
const out = { build: null, pages: {}, generated: new Date().toISOString() };

async function get(path, view) {
  const url = BASE + path + (path.includes("?") ? "&" : "?") + "view=" + view;
  const r = await fetch(url, { headers: H, redirect: "manual" });
  const body = r.status === 200 ? await r.text() : "";
  return { status: r.status, location: r.headers.get("location"), html: body };
}

const START = ["/es", "/en"];
const queue = [...START];
const found = [];
while (queue.length) {
  const p = queue.shift();
  if (seen.has(p) || !/^\/(es|en)(\/|$)/.test(p)) continue;
  seen.add(p);
  found.push(p);
  const probe = await get(p, "target");
  if (probe.status === 200) {
    for (const l of parse(probe.html).links) if (!seen.has(l) && /^\/(es|en)(\/|$)/.test(l)) queue.push(l);
  }
}
found.sort();

for (const p of found) {
  out.pages[p] = {};
  for (const view of ["target", "public"]) {
    const r = await get(p, view);
    if (r.status !== 200) { out.pages[p][view] = { status: r.status, location: r.location }; continue; }
    const d = parse(r.html);
    const hay = d.text;
    const row = { status: 200, sha: d.sha, title: d.title, h1: d.h1, chars: hay.length, words: hay.split(/\s+/).length };
    row.banned = Object.fromEntries(Object.entries(BANNED).map(([k, re]) => [k, (hay.match(new RegExp(re.source, "gi")) || []).length]).filter(([, n]) => n > 0));
    row.bannedInSr = Object.fromEntries(Object.entries(BANNED).map(([k, re]) => [k, d.sr.filter((s) => re.test(s)).length]).filter(([, n]) => n > 0));
    row.bannedInAttrs = Object.fromEntries(Object.entries(BANNED).map(([k, re]) => [k, d.attrs.filter((s) => re.test(s)).length]).filter(([, n]) => n > 0));
    row.targetOnly = Object.fromEntries(Object.entries(TARGET_ONLY).map(([k, re]) => [k, (hay.match(new RegExp(re.source, "gi")) || []).length]).filter(([, n]) => n > 0));
    row.fig = Object.fromEntries(Object.entries(FIG).map(([k, re]) => [k, (hay.match(new RegExp(re.source, re.flags.includes("g") ? "gi" : "gi")) || []).length]).filter(([, n]) => n > 0));
    row.noticeES = hay.includes(NOTICE_ES);
    row.noticeEN = hay.includes(NOTICE_EN);
    row.srSample = d.sr.slice(0, 12);
    row.media = [...new Set(d.videos.filter((v) => /media|icon|\.webp|\.mp4|\.webm/i.test(v)))].slice(0, 30);
    out.pages[p][view] = row;
  }
}

writeFileSync("rv6-text.json", JSON.stringify(out, null, 1));
console.log("routes:", found.length);
console.log(found.join(" "));
