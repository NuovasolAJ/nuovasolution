// Link and CTA matrix (owner order 2026-09-29 E, return: "Link-/CTA-Matrix"). For every public route in
// EN and ES it reads the server-rendered page, lists every link in the header, the main content and the
// footer, and proves where each one goes:
//   internal   the target answers 200 (following the site's own redirects), stays in the page's language,
//              and an #anchor exists as an id on the target
//   mail       the address is well formed and carries no punctuation of the sentence around it
//   external   the target answers (the demo calendar has to open)
// Runs against a local build (default) or a deployed origin (BASE=https://…).
// Writes link-matrix.json and LINK_CTA_MATRIX.md. Exit 1 on any failure.
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("../../", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const OUT = process.env.OUT ?? join(ROOT, "docs", "website_redesign", "evidence_2026-09-29", "links");
const PORT = 3123;
const BASE = (process.env.BASE ?? `http://localhost:${PORT}`).replace(/\/$/, "");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
mkdirSync(OUT, { recursive: true });

const ROUTES = ["", "/faq", "/platform", "/platform/ai-sales-agent", "/platform/lead-intelligence", "/platform/crm", "/platform/daily-assistant", "/packages", "/trial", "/contact", "/contact?plan=growth", "/signup", "/login", "/welcome", "/legal/privacy", "/legal/terms", "/legal/data-deletion", "/legal/notice"];
const kids = [];
const pages = new Map(); // url path -> { status, html, final }

async function load(path) {
  if (pages.has(path)) return pages.get(path);
  let url = `${BASE}${path}`, status = 0, html = "", hops = 0;
  for (; hops < 5; hops++) {
    const r = await fetch(url, { redirect: "manual", headers: { "user-agent": "nuova-link-matrix", "accept-language": "en" } });
    status = r.status;
    if ([301, 302, 303, 307, 308].includes(status)) { url = new URL(r.headers.get("location"), url).toString(); continue; }
    html = (r.headers.get("content-type") ?? "").includes("html") ? await r.text() : "";
    break;
  }
  const v = { status, html, final: url.replace(BASE, ""), hops };
  pages.set(path, v);
  return v;
}

const decode = (s) => s.replace(/&amp;/g, "&").replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#x2F;/g, "/");
const text = (s) => decode(s.replace(/<svg[\s\S]*?<\/svg>/g, "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());

function linksOf(html) {
  const out = [];
  const zones = [["header", /<header[\s\S]*?<\/header>/], ["main", /<main[\s\S]*?<\/main>/], ["footer", /<footer[\s\S]*?<\/footer>/]];
  for (const [zone, re] of zones) {
    const block = html.match(re)?.[0] ?? "";
    for (const m of block.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)) {
      const href = decode(m[1].match(/\bhref="([^"]*)"/)?.[1] ?? "");
      const cls = m[1].match(/\bclass="([^"]*)"/)?.[1] ?? "";
      const label = text(m[2]) || decode(m[1].match(/aria-label="([^"]*)"/)?.[1] ?? "");
      // A call to action is a link drawn as a button: the filled ink pill or the outlined pill.
      const cta = /rounded-pill/.test(cls) && /(bg-ink-950|border-line-strong)/.test(cls) && /\bh-1[124]\b/.test(cls);
      out.push({ zone, href, label, cta: cta ? (/bg-ink-950/.test(cls) ? "primary" : "secondary") : null });
    }
  }
  return out;
}

const results = { started_utc: new Date().toISOString(), base: BASE, commit: process.env.E2E_COMMIT ?? null, deployment: process.env.E2E_DEPLOYMENT ?? null, rows: [], failures: [] };
const external = new Map();
async function probeExternal(href) {
  if (external.has(href)) return external.get(href);
  let v;
  try {
    const r = await fetch(href, { redirect: "follow", headers: { "user-agent": "Mozilla/5.0 (link check)" }, signal: AbortSignal.timeout(20000) });
    const body = await r.text();
    v = { status: r.status, final: r.url, title: text(body.match(/<title[^>]*>([\s\S]*?)<\/title>/)?.[1] ?? "").slice(0, 120) };
  } catch (e) {
    v = { status: 0, final: null, title: String(e?.message ?? e).slice(0, 80) };
  }
  external.set(href, v);
  return v;
}

try {
  if (!process.env.BASE) {
    const p = spawn(process.execPath, [join(ROOT, "node_modules", "next", "dist", "bin", "next"), "start", "-p", String(PORT)], { cwd: ROOT, env: process.env, stdio: ["ignore", "pipe", "pipe"] });
    p.stdout.on("data", () => {}); p.stderr.on("data", () => {}); kids.push(p);
    for (let i = 0; i < 120; i++) { try { const r = await fetch(`${BASE}/en`, { redirect: "manual" }); if (r.status) break; } catch { /* not up */ } await sleep(500); }
  }

  for (const locale of ["en", "es"]) {
    for (const route of ROUTES) {
      const from = `/${locale}${route}`;
      const page = await load(from);
      if (page.status !== 200) { results.failures.push({ from, problem: `page answers ${page.status}` }); continue; }
      const seen = new Set();
      for (const l of linksOf(page.html)) {
        const key = `${l.zone}|${l.href}|${l.label}`;
        if (seen.has(key)) continue;
        seen.add(key);
        const row = { from, ...l, kind: "", target: "", status: null, ok: false, note: "" };
        if (!l.label) row.note = "link without a name";
        if (l.href.startsWith("mailto:")) {
          row.kind = "mail";
          const addr = decodeURIComponent(l.href.slice(7).split("?")[0]);
          row.target = addr;
          row.ok = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/.test(addr) && Boolean(l.label);
          if (!row.ok) row.note = row.note || "address is not clean";
        } else if (/^https?:\/\//.test(l.href) && !l.href.startsWith(BASE)) {
          row.kind = "external";
          const r = await probeExternal(l.href);
          row.target = r.final ?? l.href; row.status = r.status; row.note = r.title;
          row.ok = r.status === 200 && Boolean(l.label);
        } else if (l.href.startsWith("#")) {
          row.kind = "anchor";
          row.target = from + l.href;
          row.ok = new RegExp(`\\bid="${l.href.slice(1).replace(/[^A-Za-z0-9_-]/g, "")}"`).test(page.html) && Boolean(l.label);
          if (!row.ok) row.note = row.note || "no element with that id on the page";
        } else {
          row.kind = "internal";
          const u = new URL(l.href, `${BASE}${from}`);
          const path = u.pathname + u.search;
          const t = await load(path);
          row.target = t.final + u.hash; row.status = t.status;
          const sameLang = new RegExp(`^/${locale}(/|$|\\?)`).test(t.final) || /^\/(en|es)(\/|$)/.test(path) && !new RegExp(`^/${locale}`).test(path) /* the language switch */;
          const anchorOk = !u.hash || new RegExp(`\\bid="${u.hash.slice(1).replace(/[^A-Za-z0-9_-]/g, "")}"`).test(t.html);
          row.ok = t.status === 200 && sameLang && anchorOk && Boolean(l.label);
          if (t.status !== 200) row.note = `target answers ${t.status}`;
          else if (!sameLang) row.note = "target is in the other language";
          else if (!anchorOk) row.note = "anchor missing on the target";
        }
        results.rows.push(row);
        if (!row.ok) results.failures.push({ from, href: l.href, label: l.label, note: row.note });
      }
    }
  }
} finally {
  for (const k of kids) { try { k.kill(); } catch { /* gone */ } }
}

results.finished_utc = new Date().toISOString();
const rows = results.rows;
results.summary = {
  pages: ROUTES.length * 2,
  links: rows.length,
  ok: rows.filter((r) => r.ok).length,
  internal: rows.filter((r) => r.kind === "internal").length,
  anchors: rows.filter((r) => r.kind === "anchor").length,
  mail: rows.filter((r) => r.kind === "mail").length,
  external: rows.filter((r) => r.kind === "external").length,
  cta: rows.filter((r) => r.cta).length,
};
writeFileSync(join(OUT, "link-matrix.json"), JSON.stringify(results, null, 1));

// The readable matrix: every call to action per page, then every distinct target of the plain links.
const esc = (s) => String(s ?? "").replace(/\|/g, "\\|");
let md = `# Link and CTA matrix\n\nOrigin \`${BASE}\`${results.commit ? ` · commit \`${results.commit}\`` : ""}${results.deployment ? ` · deployment \`${results.deployment}\`` : ""} · ${results.finished_utc}\n\n`;
md += `${results.summary.links} links on ${results.summary.pages} pages (EN and ES): ${results.summary.ok} lead where they say, ${results.summary.links - results.summary.ok} do not. ${results.summary.cta} of them are calls to action.\n\n`;
md += `## Calls to action\n\n| Page | Where | Label | Weight | Target | Answer |\n|---|---|---|---|---|---|\n`;
for (const r of rows.filter((x) => x.cta)) md += `| ${esc(r.from)} | ${r.zone} | ${esc(r.label)} | ${r.cta} | ${esc(r.target)} | ${r.ok ? "ok" : "FAIL: " + esc(r.note)} |\n`;
const distinct = new Map();
for (const r of rows.filter((x) => !x.cta)) {
  const k = `${r.kind}|${r.target}`;
  const d = distinct.get(k) ?? { ...r, from: new Set(), labels: new Set() };
  d.from.add(r.from); d.labels.add(r.label); d.ok = d.ok && r.ok;
  distinct.set(k, d);
}
md += `\n## Other links, by target\n\n| Kind | Target | Labels | Used on | Answer |\n|---|---|---|---|---|\n`;
for (const d of distinct.values()) md += `| ${d.kind} | ${esc(d.target)} | ${esc([...d.labels].slice(0, 3).join(" · "))} | ${d.from.size} page${d.from.size === 1 ? "" : "s"} | ${d.ok ? "ok" : "FAIL: " + esc(d.note)}${d.kind === "external" && d.note ? ` (${esc(d.note)})` : ""} |\n`;
if (results.failures.length) {
  md += `\n## Findings\n\n`;
  for (const f of results.failures) md += `- ${esc(f.from)} → \`${esc(f.href ?? "")}\` "${esc(f.label ?? "")}": ${esc(f.note ?? f.problem)}\n`;
}
writeFileSync(join(OUT, "LINK_CTA_MATRIX.md"), md);
console.log(JSON.stringify(results.summary));
for (const f of results.failures.slice(0, 30)) console.log("FAIL", JSON.stringify(f));
console.log(`${results.summary.ok}/${results.summary.links} links ok -> ${join(OUT, "LINK_CTA_MATRIX.md")}`);
process.exit(results.failures.length ? 1 : 0);
