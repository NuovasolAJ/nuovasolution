// Route scan (audit W1/W3 closing criteria): every public route in both languages answers
// directly (no home fallback), hidden capability slugs answer 404, every response carries
// X-Robots-Tag: noindex unless released, robots.txt disallows everything, the sitemap is empty,
// and the rendered HTML contains none of the forbidden strings. Runs against a local build
// (default: starts `next start` on 3113) or a deployed origin (BASE=https://… node …).
// Writes route-scan.json next to the other evidence. Exit 1 on any failure.
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("../../", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const OUT = process.env.OUT ?? join(ROOT, "docs", "website_redesign", "evidence_2026-09-29");
const PORT = 3113;
const BASE = (process.env.BASE ?? `http://localhost:${PORT}`).replace(/\/$/, "");
const EXPECT_INDEXABLE = process.env.EXPECT_INDEXABLE === "1";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
mkdirSync(OUT, { recursive: true });

const PUBLISHED = ["ai-sales-agent", "lead-intelligence", "crm", "daily-assistant"];
const HIDDEN = ["voice", "social-growth", "lead-acquisition", "property-matching", "property-experience", "does-not-exist"];
const PAGES = ["", "/platform", ...PUBLISHED.map((s) => `/platform/${s}`), "/packages", "/trial", "/contact", "/signup", "/login", "/login?confirmed=1", "/welcome", "/legal/privacy", "/legal/terms", "/legal/data-deletion", "/legal/notice"];
const FORBIDDEN = [
  /Most agencies/i, /La mayoría empieza/i, /never need another/i, /What is not ready yet/i, /Certified internally/i, /Certificado internamente/i,
  /real doorways/i, /puertas/i, /Capture pending/i, /Captura pendiente/i, /catorce/i, /Coming soon/i, /hot lead/i, /lead caliente/i,
  /In development/, /En desarrollo/, /In final testing/, /En prueba final/, /Not offered yet/, /Todavía no se ofrece/, /waiting on the gates/i, /localhost/i,
];
const results = { started_utc: new Date().toISOString(), base: BASE, checks: [] };
const check = (id, what, pass, evidence) => { results.checks.push({ id, what, pass: Boolean(pass), evidence }); console.log(`${pass ? "PASS" : "FAIL"} ${id} ${what}${pass ? "" : ` :: ${JSON.stringify(evidence)}`}`); };
const kids = [];

try {
  if (!process.env.BASE) {
    const p = spawn(process.execPath, [join(ROOT, "node_modules", "next", "dist", "bin", "next"), "start", "-p", String(PORT)], { cwd: ROOT, env: process.env, stdio: ["ignore", "pipe", "pipe"] });
    p.stdout.on("data", () => {}); p.stderr.on("data", () => {}); kids.push(p);
    for (let i = 0; i < 120; i++) { try { const r = await fetch(`${BASE}/en`, { redirect: "manual" }); if (r.status) break; } catch { /* not up */ } await sleep(500); }
  }
  const get = (path) => fetch(`${BASE}${path}`, { redirect: "manual", headers: { "user-agent": "nuova-route-scan" } });

  // Routes: 200 and the page's own H1 (no home fallback), noindex header, no forbidden string.
  for (const locale of ["en", "es"]) {
    const homeH1 = (await (await get(`/${locale}`)).text()).match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1]?.replace(/<[^>]+>/g, "").trim();
    for (const path of PAGES) {
      const url = `/${locale}${path}`;
      const r = await get(url);
      const html = await r.text();
      const text = html.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, " ");
      const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1]?.replace(/<[^>]+>/g, "").trim() ?? null;
      const robots = r.headers.get("x-robots-tag");
      const metaNoindex = /<meta name="robots" content="noindex/i.test(html);
      const hits = FORBIDDEN.filter((re) => re.test(text)).map(String);
      const notHome = path === "" || (h1 !== null && h1 !== homeH1);
      check(`route ${url}`, `200, own page (no home fallback), ${EXPECT_INDEXABLE ? "indexable" : "noindex header + meta"}, no forbidden string`,
        r.status === 200 && notHome && (EXPECT_INDEXABLE ? !robots : /noindex/.test(robots ?? "") && metaNoindex) && hits.length === 0,
        { status: r.status, h1, robots, metaNoindex, hits });
      if (path === "") {
        const words = text.replace(/\s+/g, " ").trim().split(" ").length;
        results[`home_words_${locale}`] = words;
        console.log(`INFO home ${locale} ≈ ${words} words in rendered text (nav and footer included)`);
      }
    }
    for (const slug of HIDDEN) {
      const r = await get(`/${locale}/platform/${slug}`);
      check(`hidden /${locale}/platform/${slug}`, "hidden or unknown capability answers 404", r.status === 404, { status: r.status });
    }
  }

  // robots.txt and sitemap follow the release gate; the bare root redirects to a locale.
  const robots = await (await get("/robots.txt")).text();
  check("robots.txt", EXPECT_INDEXABLE ? "allows crawling" : "disallows everything, advertises no sitemap", EXPECT_INDEXABLE ? /Allow: \//.test(robots) : /Disallow: \/\s*$/m.test(robots) && !/Sitemap/.test(robots), robots.trim());
  const sm = await get("/sitemap.xml");
  const smText = await sm.text();
  check("sitemap.xml", EXPECT_INDEXABLE ? "lists routes" : "lists nothing on a preview", EXPECT_INDEXABLE ? /<loc>/.test(smText) : !/<loc>/.test(smText), { status: sm.status, locs: (smText.match(/<loc>/g) ?? []).length });
  const root = await get("/");
  check("root redirect", "/ redirects once to a locale", root.status === 307 && /\/(en|es)$/.test(root.headers.get("location") ?? ""), { status: root.status, location: root.headers.get("location") });
  const assets = await get("/media/daily/daily-clip-poster-es-desktop.png");
  check("poster asset", "media poster is served", assets.status === 200 && (assets.headers.get("content-type") ?? "").includes("image"), { status: assets.status, type: assets.headers.get("content-type") });
  const legacy = await get("/live-demo");
  check("legacy redirect", "/live-demo redirects permanently", legacy.status === 308 || legacy.status === 301, { status: legacy.status, location: legacy.headers.get("location") });
} finally {
  for (const k of kids) { try { k.kill(); } catch { /* gone */ } }
  results.finished_utc = new Date().toISOString();
  results.pass = results.checks.filter((c) => c.pass).length;
  results.total = results.checks.length;
  writeFileSync(join(OUT, "route-scan.json"), JSON.stringify(results, null, 1));
  console.log(`${results.pass}/${results.total} route checks passed -> ${join(OUT, "route-scan.json")}`);
  process.exit(results.pass === results.total ? 0 : 1);
}
