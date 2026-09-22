// Check WEBSITE_CLAIM_REGISTER_v1 corrections against the prerendered EN / ES pages of a build.
// Reads files only. Usage: node claims-check.mjs <register.md> <buildDir/.next/server/app> <out.json>
import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
const [reg, appDir, out] = process.argv.slice(2);
const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : p.endsWith(".html") ? [p] : []; });
const decode = (s) => s.replace(/<!-- -->/g, "").replace(/<[^>]+>/g, " ").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;| /g, " ").replace(/\\u0026/g, "&").replace(/\\"/g, '"').replace(/\s+/g, " ");
const files = walk(appDir);
const corpus = { en: "", es: "" };
for (const f of files) { const rel = f.slice(appDir.length).replace(/\\/g, "/"); const loc = rel.startsWith("/es") ? "es" : rel.startsWith("/en") ? "en" : null; if (loc) corpus[loc] += " " + decode(readFileSync(f, "utf8")); }
const norm = (s) => s.replace(/\s+/g, " ").replace(/[’]/g, "'").replace(/^(…|\.\.\.)\s*/, "").replace(/\s*(…|\.\.\.)$/, "").trim();
const has = (loc, s) => corpus[loc].includes(norm(s));
const rows = readFileSync(reg, "utf8").split(/\r?\n/).filter((l) => /^\| WCR-\d+/.test(l));
const res = [];
for (const r of rows) {
  const cols = r.split(" | ").map((c) => c.replace(/^\| ?|\s*\|$/g, ""));
  const id = cols[0], claim = (cols.length >= 7 ? cols[2] : cols[1]) ?? "", corr = cols[cols.length - 1] ?? "";
  const q = (s) => [...s.matchAll(/"([^"]{6,})"/g)].map((m) => m[1].replace(/\*\*/g, ""));
  const en = [...corr.matchAll(/EN(?: [a-z]+)?:? ?"([^"]{4,})"/g)].map((m) => m[1]);
  const es = [...corr.matchAll(/ES(?: [a-z]+)?:? ?"([^"]{4,})"/g)].map((m) => m[1]);
  const old = q(claim).filter((s) => !/\.\.\.|…/.test(s));
  const statusOnly = /status\s*→/.test(corr) && !en.length;
  const keep = /^(None|Keep)/i.test(corr.trim());
  const entry = { id, route: cols[1], action: keep ? "keep" : statusOnly ? "status_change" : en.length || es.length ? "reword" : "other",
    en_expected: en.map((s) => ({ s: s.slice(0, 90), present: has("en", s) })),
    es_expected: es.map((s) => ({ s: s.slice(0, 90), present: has("es", s) })),
    old_text: old.map((s) => ({ s: s.slice(0, 90), still_en: has("en", s), still_es: has("es", s) })) };
  entry.verdict = entry.action === "keep" ? "keep"
    : entry.action === "reword" ? (entry.en_expected.every((x) => x.present) && entry.es_expected.every((x) => x.present) && !(keep ? false : old.some((s) => has("en", s))) ? "applied" : "check")
    : entry.action === "status_change" ? (old.some((s) => has("en", s)) ? "text_still_present(status label decides)" : "text_gone") : "manual";
  res.push(entry);
}
const sum = res.reduce((a, e) => ((a[e.verdict] = (a[e.verdict] ?? 0) + 1), a), {});
writeFileSync(out, JSON.stringify({ html_files: files.length, en_chars: corpus.en.length, es_chars: corpus.es.length, summary: sum, rows: res }, null, 1));
console.log(JSON.stringify({ html_files: files.length, summary: sum }));
for (const e of res.filter((e) => e.verdict !== "applied" && e.verdict !== "keep")) console.log(e.id, e.verdict, JSON.stringify({ en: e.en_expected.filter((x) => !x.present).map((x) => x.s), es: e.es_expected.filter((x) => !x.present).map((x) => x.s), old: e.old_text.filter((x) => x.still_en || x.still_es).map((x) => x.s) }));
