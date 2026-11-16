// Public-view promise scan: nothing may be promised that is not in production.
const BASE = process.argv[2] || "https://nuovasolution-design-preview-2ufwjoyhr-nuovasolajs-projects.vercel.app";
const strip = h => h.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<style[\s\S]*?<\/style>/g, " ")
  .replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&#x27;|&apos;/g, "'")
  .replace(/&quot;/g, '"').replace(/&laquo;|&raquo;|&#171;|&#187;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">")
  .replace(/\s+/g, " ").trim();

const seen = new Set(), queue = ["/es", "/en"], pages = [];
while (queue.length && pages.length < 60) {
  const p = queue.shift();
  if (seen.has(p)) continue; seen.add(p);
  let res, html;
  try { res = await fetch(`${BASE}${p}?view=public`); html = await res.text(); } catch { continue; }
  if (res.status !== 200) continue;
  pages.push({ path: p, text: strip(html) });
  for (const m of html.matchAll(/href="(\/(?:es|en)[^"#?]*)"/g)) {
    const h = m[1].replace(/\/$/, "") || m[1];
    if (!seen.has(h) && !queue.includes(h)) queue.push(h);
  }
}

const RULES = [
  // owner 16.11.: the public view must not promise what is not in production
  ["instagram", /instagram/gi],
  ["ownNumber", /(tu|vuestro|su) propio n[uú]mero|n[uú]mero (propio|de tu agencia)|your own number|own WhatsApp number/gi],
  ["phone", /tel[eé]fono|llamadas?\b|phone call|phone assistant|asistente telef/gi],
  ["languages", /cualquier idioma|en tu idioma|varios idiomas|multiling|multi-?lingual|any language|in your language|ingl[eé]s y|English and German|alem[aá]n/gi],
  ["waMedia", /\b(foto|fotos|im[aá]genes|PDF|expos[eé]|audio|nota de voz|notas de voz|plano|planos|voice note|floor ?plan)\b/gi],
  // owner 16.11., the offer rule
  ["demoOffer", /solicitar una demo|reservar una demo|request a demo|book a demo/gi],
  ["selfStart", /prueba gratis(?! durante 14 d[ií]as, con)|pru[eé]balo gratis|try it free|14 d[ií]as de Essential|14 days of Essential|crea(?:s)? (?:tu|la) cuenta t[uú] mismo|create the account yourself/gi],
  ["recomendado", /recomendado|recommended/gi],
  ["secondsNoWa", /en segundos(?![^.]{0,40}WhatsApp)|within seconds(?![^.]{0,40}WhatsApp)/gi],
  ["noScore", /no calcula una puntuaci[oó]n|computes no score/gi],
  ["comingSoon", /pr[oó]ximamente|coming soon/gi],
];

const out = {};
for (const pg of pages) {
  const hits = {};
  for (const [name, re] of RULES) {
    re.lastIndex = 0; const qs = []; let m;
    while ((m = re.exec(pg.text)) && qs.length < 4) qs.push(pg.text.slice(Math.max(0, m.index - 100), m.index + m[0].length + 100));
    if (qs.length) hits[name] = qs;
  }
  if (Object.keys(hits).length) out[pg.path] = hits;
}
console.log("pages scanned:", pages.length, pages.map(p => p.path).join(" "));
console.log(JSON.stringify(out, null, 1));
