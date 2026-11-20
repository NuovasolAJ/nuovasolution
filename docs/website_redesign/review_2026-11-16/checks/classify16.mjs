// Classify every candidate loss. A category is only allowed if it names WHY and, where the text
// was replaced, the replacement is verified present in the new build. Anything left over is a
// real loss and is printed as such.
import { readFileSync, writeFileSync } from "node:fs";
const REF = JSON.parse(readFileSync(process.argv[2], "utf8"));
const NEW = JSON.parse(readFileSync(process.argv[3], "utf8"));
const N = s => (s || "").replace(/[\s  ]+/g, " ").trim();
const sent = (j, r) => (((j.routes[r] || {}).target) || {}).sentences || [];
const allNew = {}; for (const r of Object.keys(NEW.routes || {})) allNew[r] = sent(NEW, r).map(N).join(" \u0001 ");

const CATS = [
  { name: "preview furniture", re: /Vista previa, no p[úu]blica|Preview, not public|Solo en la vista previa|Preview only/,
    why: "the preview band and switch panel - not page content, and excluded from every other measurement I make" },
  { name: "K-2 old wording (Copy §5)", re: /aviso a las dos|a notice after two|Aviso a Carlos|Carlos is told|avisamos a la siguiente|we tell the next|Carlos recibe el aviso|Carlos gets the notice|13:20 Aviso|13:20 aviso|13:20 notice/i,
    why: "under the owner's F1 the 2-hour step is a handover; Copy 1120 §5 rewrote it", needle: "pasa a la siguiente persona|passes to the next person" },
  { name: "K-2 proof extended (Copy §5)", re: /^En producci[óo]n desde el 13\.11\.$|^In production since 13\.11\.$/,
    why: "the proof line gained a second date", needle: "desde el 20\\.11|since 20\\.11" },
  { name: "otherLanguages hidden (owner point 4)", re: /M[áa]s idiomas, en preparaci[óo]n|More languages are in preparation/,
    why: "the owner's point 4 hides it in BOTH views - its absence is exactly why Copy's rule 1 passes" },
  { name: "H-subP is the alternative hero line", re: /Tus clientes reciben respuesta aunque est[ée]s en una visita|Your clients get a reply even while you are at a viewing/,
    why: "the public fallback subline; the target view correctly shows H-sub instead" },
  { name: "pilot line replaced (Copy v2 §E)", re: /Todos los planes pueden empezar con un piloto gratuito|Every plan can start with a free 14-day pilot/,
    why: "replaced by the Growth-scope pilot line", needle: "El piloto gratuito de 14 d[íi]as incluye|The free 14-day pilot includes" },
  { name: "plans table block re-concatenated", re: /Canales Respuestas en espa[ñn]ol por WhatsApp y email|Channels Replies in Spanish on WhatsApp and e-mail/,
    why: "the plan cells gained Próximamente marks and the fold button, so the concatenated block differs; the rows themselves are present", needle: "Respuestas en espa[ñn]ol por WhatsApp y email|Replies in Spanish on WhatsApp and e-mail" },
  { name: "3D room labels re-concatenated", re: /Casa de ejemplo ficticia|Fictional example house/,
    why: "the floor-plan labels are concatenated differently", needle: "Casa de ejemplo ficticia|Fictional example house" },
  { name: "report link renamed", re: /Ver la semana completa|See the full week/,
    why: "renamed; the example-report page is still linked from the home page, twice", needle: "Ver el informe completo|Ver el informe de ejemplo|See the full report|See the example report" },
  { name: "packages price line reworded", re: /El precio para despu[ée]s te lo explicamos|We explain the price for afterwards/,
    why: "reworded", needle: "antes de acordar nada|before agreeing anything" },
];

const rows = [], residue = [];
for (const [route, refRoute] of Object.entries(REF.routes || {})) {
  const a = sent(REF, route).map(N).filter(s => s.length > 12);
  const blob = allNew[route] || "";
  for (const s of a) {
    if (blob.includes(s)) continue;
    const cat = CATS.find(c => c.re.test(s));
    if (!cat) { residue.push(`${route}\t${s.slice(0, 140)}`); continue; }
    let replacementOk = true;
    if (cat.needle) replacementOk = new RegExp(cat.needle).test(blob);
    rows.push({ route, cat: cat.name, replacementOk, text: s.slice(0, 100) });
    if (!replacementOk) residue.push(`${route}\t[REPLACEMENT MISSING for ${cat.name}]\t${s.slice(0, 120)}`);
  }
}
const byCat = {};
for (const r of rows) { byCat[r.cat] = byCat[r.cat] || { n: 0, replacementOk: true }; byCat[r.cat].n++; if (!r.replacementOk) byCat[r.cat].replacementOk = false; }
console.log(`candidates classified: ${rows.length} | unexplained residue: ${residue.length}\n`);
for (const [k, v] of Object.entries(byCat)) {
  const c = CATS.find(x => x.name === k);
  console.log(`${String(v.n).padStart(3)}  ${k}${c.needle ? (v.replacementOk ? "  [replacement verified present]" : "  [REPLACEMENT MISSING]") : ""}`);
  console.log(`     why: ${c.why}`);
}
if (residue.length) { console.log("\n*** UNEXPLAINED - these are real losses ***"); residue.forEach(r => console.log("  " + r)); }
else console.log("\nNo unexplained loss: every candidate falls into a named category, and every replacement is present.");
writeFileSync("classify16-result.json", JSON.stringify({ classified: rows.length, residue, byCat }, null, 1));
