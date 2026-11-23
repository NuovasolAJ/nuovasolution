// Scans my own probes for the bug that has now bitten me twice: a SINGLE backslash regex escape
// inside a template literal decays (\s -> s) and silently corrupts the extracted text. Inside a
// template literal the escape must be doubled, or a class that needs no escape must be used.
import fs from "node:fs";
const files = ["recon1123.mjs", "klaeren1123.mjs", "wege1123.mjs", "bestaetigung1123.mjs", "detail1123.mjs", "rest1123.mjs"];
const single = /(?:^|[^\\])\\([sdwbSDWB])/g;
let bad = 0;
for (const f of files) {
  if (!fs.existsSync(f)) { console.log(`${f}: MISSING`); continue; }
  const lines = fs.readFileSync(f, "utf8").split(/\r?\n/);
  let inTpl = false;
  lines.forEach((ln, i) => {
    // crude but sufficient: count unescaped backticks to know whether we are inside a template
    const ticks = (ln.match(/(?<!\\)`/g) || []).length;
    const startedInside = inTpl;
    if (ticks % 2 === 1) inTpl = !inTpl;
    if (!startedInside && !(ticks > 0)) return;
    const hits = [...ln.matchAll(single)].map((m) => "\\" + m[1]);
    if (hits.length) { bad++; console.log(`${f}:${i + 1}  ${hits.join(" ")}  |  ${ln.trim().slice(0, 100)}`); }
  });
}
console.log(bad ? `\n*** ${bad} line(s) to check by hand` : "\nCLEAN: no single-backslash escape inside a template literal in any instrument");
