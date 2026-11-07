// RV6 A-21: the preview protection. Bare vs header, both projects. Secrets are read from the
// secret store and NEVER printed, logged or written to the output.
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";

const S = "C:/Users/Usuario/.nuova-secrets/";
const read = (f) => readFileSync(S + f, "utf8").trim();
const BYPASS = { design: read("stg_website_preview_bypass.txt"), staging: read("stg_website_staging_bypass.txt") };
const CODE = read("website_preview_access_code.txt");

const URLS = {
  design: "https://nuovasolution-design-preview-c0ktpvgrs-nuovasolajs-projects.vercel.app",
  staging: "https://nuovasolution-staging-preview-4uhy6n405-nuovasolajs-projects.vercel.app",
};

const PATHS = [
  "/es",
  "/en",
  "/es/example-report",
  "/es/packages",
  "/api/build",
  "/media/3d/house-delivery.mp4",
  "/media/3d/hero-a-1280.webp",
  "/icon0.svg",
  "/robots.txt",
  "/sitemap.xml",
];

const out = { generated: new Date().toISOString(), note: "no secret value appears in this file", projects: {} };

async function hit(url, headers = {}) {
  const t0 = Date.now();
  try {
    const r = await fetch(url, { headers, redirect: "manual" });
    const body = await r.text().catch(() => "");
    return {
      status: r.status,
      ms: Date.now() - t0,
      robots: r.headers.get("x-robots-tag") || null,
      ctype: (r.headers.get("content-type") || "").split(";")[0],
      len: body.length,
      metaRobots: /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)/i.exec(body)?.[1] || null,
      looksGate: /acceso|access code|c[oó]digo/i.test(body) && body.length < 20000,
      setCookie: (r.headers.get("set-cookie") || "").replace(/=[^;]+/g, "=<stripped>") || null,
      location: r.headers.get("location") || null,
      firstTitle: /<title[^>]*>([^<]{0,80})/i.exec(body)?.[1] || null,
      sha256_8: body ? createHash("sha256").update(body).digest("hex").slice(0, 8) : null,
    };
  } catch (e) {
    return { error: String(e).slice(0, 120) };
  }
}

for (const [proj, base] of Object.entries(URLS)) {
  const rows = [];
  for (const p of PATHS) {
    const bare = await hit(base + p);
    const withHdr = await hit(base + p, {
      "x-vercel-protection-bypass": BYPASS[proj],
      "x-vercel-set-bypass-cookie": "true",
    });
    rows.push({ path: p, bare, withHeader: withHdr });
  }
  // the owner's way: the code as a link parameter, then what the server answers
  const codeLink = await hit(`${base}/es?acceso=${encodeURIComponent(CODE)}`);
  const wrongCode = await hit(`${base}/es?acceso=definitely-not-the-code-0000`);
  out.projects[proj] = { base, rows, ownerCodeInLink: codeLink, ownerWrongCode: wrongCode };
}

console.log(JSON.stringify(out, null, 1));
