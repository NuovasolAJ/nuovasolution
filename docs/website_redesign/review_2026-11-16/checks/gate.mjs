// Owner's rule set of 16.11.2026, measured per view.
// Redirects are followed BY HAND and the view is re-appended, because Location drops the query
// and the preview then falls back to the target view (lib/view.ts).
import { writeFileSync } from "node:fs";
const BASE = process.argv[2];
const TAG = process.argv[3] || "build";

const strip = h => h.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<style[\s\S]*?<\/style>/g, " ")
  .replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&#x27;|&apos;/g, "'")
  .replace(/&quot;/g, '"').replace(/&laquo;|&raquo;|&#171;|&#187;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">")
  .replace(/\s+/g, " ").trim();

async function get(path, view) {
  let p = path, hops = [];
  for (let i = 0; i < 4; i++) {
    const res = await fetch(`${BASE}${p}?view=${view}`, { redirect: "manual" });
    if (res.status >= 300 && res.status < 400) {
      const loc = (res.headers.get("location") || "").replace(/\?.*$/, "");
      hops.push(`${p} ${res.status} -> ${loc}`);
      if (!loc || loc === p) return { status: res.status, hops, text: "", links: [], final: p };
      p = loc; continue;
    }
    if (res.status !== 200) return { status: res.status, hops, text: "", links: [], final: p };
    const html = await res.text();
    const links = [...html.matchAll(/href="(\/(?:es|en)[^"#?]*)"/g)].map(m => m[1].replace(/(.)\/$/, "$1"));
    return { status: 200, hops, text: strip(html), links, final: p };
  }
  return { status: 310, hops, text: "", links: [], final: p };
}

// what the public view may never promise (owner 16.11.) + the offer rule
const FORBID_PUBLIC = [
  ["ownNumber", /(con el |tu |vuestro |su )?n[uú]mero de tu agencia|tu propio n[uú]mero|your agency'?s (own )?number|your own (WhatsApp )?number/gi],
  ["phoneAssistant", /asistente telef[oó]nico|phone assistant|atiende la llamada|answers the call/gi],
  ["channelPhone", /formulario web, tel[eé]fono|web form, phone|por tel[eé]fono\b(?![^.]{0,30}todav[ií]a no)/gi],
  ["languages", /cualquier idioma|en tu idioma|varios idiomas|multiling|multi-?lingual|any language|in your language/gi],
  ["waMedia", /responde a (lo que env[ií]as|cualquier foto)|entiende (fotos|im[aá]genes)|describe planos|notas? de voz[^.]{0,40}(responde|entiende)|reads? your (photos|voice notes)/gi],
  ["instagramStrong", /publicaciones en instagram|instagram posts|publicar en instagram|posting on instagram/gi],
  ["model3dPublic", /modelos 3D|3D models|visualizaci[oó]n 3D/gi],
];
const FORBID_BOTH = [
  ["demoOffer", /solicitar una demo|reservar una demo|request a demo|book a demo/gi],
  ["selfStart", /prueba gratis(?![^.]{0,30}piloto)|pru[eé]balo gratis|try it free|14 d[ií]as de essential|14 days of essential|crea(?:s)? la cuenta t[uú] mismo|create the account yourself/gi],
  ["recomendado", /\brecomendado\b|\brecommended\b/gi],
  ["secondsNoWa", /en segundos(?![^.]{0,45}whatsapp)|within seconds(?![^.]{0,45}whatsapp)/gi],
  ["noScore", /no calcula una puntuaci[oó]n|computes no score/gi],
  ["comingSoonWord", /pr[oó]ximamente|coming soon/gi],
];
const EXPECT = [
  ["pilotButton", /solicita tu piloto gratuito|request your free pilot/i],
  ["pilotLine14", /piloto gratuito de 14 d[ií]as|free pilot of 14 days|14-day free pilot/i],
  ["instagramPrepared", /instagram \(en preparaci[oó]n\)|instagram \(in preparation\)/i],
  ["phoneNotYet", /¿atiende llamadas\?[^.]{0,20}todav[ií]a no|todav[ií]a no\. las llamadas est[aá]n en preparaci[oó]n|not yet\. calls are in preparation/i],
  ["languageLine", /responde en espa[nñ]ol\. otros idiomas, a tu equipo|replies in spanish\. other languages go to your team/i],
];

const R = { tag: TAG, base: BASE, build: null, views: {} };
try { R.build = await (await fetch(`${BASE}/api/build`)).json(); } catch (e) { R.build = { error: e.message }; }

for (const view of ["public", "target"]) {
  const seen = new Set(), queue = ["/es", "/en"], pages = [];
  while (queue.length && pages.length < 60) {
    const p = queue.shift();
    if (seen.has(p)) continue; seen.add(p);
    const r = await get(p, view);
    if (r.hops.length) R.views[view] ??= {}, (R.views[view].redirects ??= []).push(...r.hops);
    if (r.status !== 200 || !r.text) continue;
    if (seen.has(r.final) && r.final !== p) continue;
    seen.add(r.final);
    pages.push({ path: p, final: r.final, text: r.text });
    for (const l of r.links) if (!seen.has(l) && !queue.includes(l)) queue.push(l);
  }
  R.views[view] ??= {};
  R.views[view].pages = pages.map(p => p.path);
  const hits = {};
  for (const pg of pages) {
    const rules = view === "public" ? [...FORBID_PUBLIC, ...FORBID_BOTH] : FORBID_BOTH;
    for (const [name, re] of rules) {
      re.lastIndex = 0; const qs = []; let m;
      while ((m = re.exec(pg.text)) && qs.length < 3) qs.push(pg.text.slice(Math.max(0, m.index - 110), m.index + m[0].length + 110));
      if (qs.length) ((hits[pg.path] ??= {})[name] = qs);
    }
    for (const [name, re] of EXPECT) if (re.test(pg.text)) ((R.views[view].expect ??= {})[name] ??= []).push(pg.path);
  }
  R.views[view].forbidden = hits;
}
writeFileSync(`gate-${TAG}.json`, JSON.stringify(R, null, 1));
console.log("build", JSON.stringify(R.build));
for (const v of ["public", "target"]) {
  console.log(`--- ${v}: ${R.views[v].pages.length} pages`);
  console.log("   forbidden:", JSON.stringify(Object.fromEntries(Object.entries(R.views[v].forbidden).map(([k, o]) => [k, Object.keys(o)]))));
  console.log("   expected :", JSON.stringify(R.views[v].expect || {}));
}
