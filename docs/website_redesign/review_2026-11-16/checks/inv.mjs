// Content inventory of a build: every sentence per route and view, plus a structural count.
// Used as the "before" for the owner's rule "everything that was there is still there".
import { writeFileSync } from "node:fs";
const BASE = process.argv[2], TAG = process.argv[3];
const strip = h => h.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<style[\s\S]*?<\/style>/g, " ")
  .replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&#x27;|&apos;/g, "'")
  .replace(/&quot;/g, '"').replace(/&laquo;|&raquo;|&#171;|&#187;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">")
  .replace(/\s+/g, " ").trim();

async function get(path, view) {
  let p = path;
  for (let i = 0; i < 4; i++) {
    const res = await fetch(`${BASE}${p}?view=${view}`, { redirect: "manual" });
    if (res.status >= 300 && res.status < 400) { const l = (res.headers.get("location") || "").replace(/\?.*$/, ""); if (!l || l === p) return null; p = l; continue; }
    if (res.status !== 200) return null;
    return { html: await res.text(), final: p };
  }
  return null;
}
const sentences = t => t.split(/(?<=[.!?·])\s+/).map(x => x.trim()).filter(x => x.length > 14);

const seen = new Set(), queue = ["/es", "/en"], routes = [];
while (queue.length && routes.length < 40) {
  const p = queue.shift(); if (seen.has(p)) continue; seen.add(p);
  const r = await get(p, "target"); if (!r) continue;
  routes.push(p);
  for (const m of r.html.matchAll(/href="(\/(?:es|en)[^"#?]*)"/g)) { const h = m[1].replace(/(.)\/$/, "$1"); if (!seen.has(h) && !queue.includes(h)) queue.push(h); }
}

const inv = { tag: TAG, base: BASE, build: await (await fetch(`${BASE}/api/build`)).json(), routes: {} };
for (const r of routes) {
  inv.routes[r] = {};
  for (const view of ["target", "public"]) {
    const g = await get(r, view);
    if (!g) { inv.routes[r][view] = null; continue; }
    const text = strip(g.html);
    const h = g.html;
    const count = re => (h.match(re) || []).length;
    inv.routes[r][view] = {
      chars: text.length,
      sentences: sentences(text),
      structure: {
        demoTabs: count(/data-demo-tab=/g),
        m3dSteps: count(/data-m3d-step-button=/g),
        planRows: count(/data-plan-row=/g),
        planCells: count(/data-plan-cell=/g),
        planDirect: count(/data-plan-direct=/g),
        fnChapters: count(/data-fn-chapter=/g),
        images: count(/<img\b/g),
        videos: count(/<video\b/g),
        svgs: count(/<svg\b/g),
        h2: count(/<h2\b/g),
        h3: count(/<h3\b/g),
        details: count(/<details\b/g),
        buttons: count(/<button\b/g),
        links: count(/<a\b/g),
      },
    };
  }
}
writeFileSync(`inv-${TAG}.json`, JSON.stringify(inv, null, 1));
const tot = Object.values(inv.routes).reduce((s, v) => s + (v.target?.sentences.length || 0), 0);
console.log("build", inv.build.commit.slice(0, 7), inv.build.deployment);
console.log("routes", routes.length, "| sentences in target view, total:", tot);
for (const [r, v] of Object.entries(inv.routes)) console.log(" ", r, v.target ? `${v.target.sentences.length} S · ${JSON.stringify(v.target.structure)}` : "-");
