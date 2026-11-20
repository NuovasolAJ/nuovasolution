// "Nothing lost": every sentence that stood in the reference build must still stand in the
// TARGET view of the new one. Intended removals are listed explicitly so a deliberate change
// does not read as a loss, and so that a loss cannot hide behind the word "intended".
import { readFileSync, writeFileSync } from "node:fs";
const REF = JSON.parse(readFileSync(process.argv[2], "utf8"));
const NEW = JSON.parse(readFileSync(process.argv[3], "utf8"));
const N = s => (s || "").replace(/[\s  ]+/g, " ").trim();

// Sentences Copy/the owner deliberately changed or removed between the two builds.
// Each entry says WHY, so the list cannot quietly absorb a real loss.
const INTENDED = [
  { re: /Carlos recibe el aviso|Carlos gets the notice/i, why: "Copy 1120 §5: under the owner's F1 the 2-hour step is a handover, not a notice (D-3)" },
  { re: /13:20 aviso|13:20 notice/i, why: "Copy 1120 §5: the D-c part became 'pasa a Carlos'" },
  { re: /avisamos a la siguiente|we tell the next|Carlos is told/i, why: "Copy 1120 §5: no escalation mail any more" },
  { re: /redes sociales en Enterprise/i, why: "Copy 1120 §6: dropped from G-1's OFF chip only; still present on the on chip and G-1p" },
];

const out = { ref: REF.build && REF.build.commit, now: NEW.build && NEW.build.commit, routes: {}, totals: {} };
let lost = 0, intended = 0, kept = 0, newCount = 0;
const lostList = [], intendedList = [];

// inv.mjs stores routes[path] = { target:{chars,sentences:[...]}, public:{...} }.
// Reading r.target as an array returned nothing and produced a silent "0 lost", which would
// have been a worthless pass. The accessor now asserts it found something.
const sentences = r => {
  if (!r) return [];
  if (Array.isArray(r)) return r;
  if (r.target && Array.isArray(r.target.sentences)) return r.target.sentences;
  if (Array.isArray(r.sentences)) return r.sentences;
  return [];
};

for (const [route, refRoute] of Object.entries(REF.routes || {})) {
  const a = sentences(refRoute).map(N).filter(s => s.length > 12);
  const bArr = sentences((NEW.routes || {})[route]).map(N);
  const b = new Set(bArr);
  const blob = bArr.join(" \u0001 ");
  const missing = [];
  for (const s of a) {
    if (b.has(s) || blob.includes(s)) { kept++; continue; }
    const hit = INTENDED.find(i => i.re.test(s));
    if (hit) { intended++; intendedList.push(`${route}\t${s.slice(0, 90)}\t${hit.why}`); continue; }
    lost++; missing.push(s);
  }
  const added = bArr.filter(s => s.length > 12 && !sentences(refRoute).map(N).includes(s));
  newCount += added.length;
  if (missing.length) out.routes[route] = { missing };
  for (const m of missing) lostList.push(`${route}\t${m.slice(0, 120)}`);
}
if (kept + lost + intended === 0) {
  console.error("ABORT: the comparison examined 0 sentences - the accessor did not match the file shape. A '0 lost' from this state means nothing.");
  process.exit(2);
}
out.totals = { kept, intendedRemovals: intended, lost, routesWithLoss: Object.keys(out.routes).length, newSentences: newCount };
writeFileSync("lost16-result.json", JSON.stringify(out, null, 1));
console.log(`reference ${String(out.ref).slice(0, 7)} -> now ${String(out.now).slice(0, 7)}`);
console.log(`kept ${kept} | intended removals ${intended} | LOST ${lost} | routes with a loss ${out.totals.routesWithLoss} | new sentences ${newCount}`);
if (intendedList.length) { console.log("\nINTENDED (each with its reason):"); for (const l of intendedList.slice(0, 20)) console.log("  " + l); }
if (lostList.length) { console.log("\nLOST:"); for (const l of lostList.slice(0, 40)) console.log("  " + l); }
