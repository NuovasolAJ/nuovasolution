// Exports the design probe as a STATIC snapshot the owner can open from any device: the server-rendered
// HTML of the stub build with the stylesheet, fonts and logo inlined or copied, all scripts removed
// (reveals are visible without JS by design), links rewritten to the pages in the snapshot, and a small
// inline script for the two menus. Forms and the assistant are not connected in the snapshot and it says
// so at the top. Nothing in the snapshot talks to any backend. Requires a prior stub `next build`.
// Usage: node scripts/design/probe-export.mjs   (OUT overrides the folder)
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync, copyFileSync, existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("../../", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const OUT = process.env.OUT ?? join(ROOT, "docs", "website_redesign", "design_probe_2026-09-23", "static");
const NEXT = join(ROOT, "node_modules", "next", "dist", "bin", "next");
const PORT = 3141;
const BASE = `http://localhost:${PORT}`;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
mkdirSync(join(OUT, "assets", "media"), { recursive: true });
mkdirSync(join(OUT, "assets", "images"), { recursive: true });

// route → file in the snapshot
const PAGES = {
  "/es": "index.html",
  "/en": "en.html",
  "/es/packages": "paquetes.html",
  "/en/packages": "packages.html",
  "/es/platform": "plataforma.html",
  "/en/platform": "platform.html",
  "/es/platform/ai-sales-agent": "plataforma-ai-sales-agent.html",
  "/en/platform/ai-sales-agent": "platform-ai-sales-agent.html",
  "/es/platform/daily-assistant": "plataforma-daily-assistant.html",
  "/es/platform/crm": "plataforma-crm.html",
  "/es/trial": "prueba.html",
  "/es/contact": "contacto.html",
  "/es/signup": "registro.html",
  "/es/login": "acceso.html",
  "/en/signup": "signup.html",
  "/en/login": "login.html",
};
const NOTE = {
  es: "Vista estática de la propuesta de diseño (build de demostración). Formularios y asistente no están conectados aquí.",
  en: "Static view of the design proposal (demonstration build). Forms and the assistant are not connected here.",
};

const kids = [];
const start = (cmd, args, env) => { const p = spawn(cmd, args, { cwd: ROOT, env: { ...process.env, ...env }, stdio: ["ignore", "pipe", "pipe"] }); p.stdout.on("data", () => {}); p.stderr.on("data", () => {}); kids.push(p); return p; };
const waitHttp = async (url) => { for (let i = 0; i < 120; i++) { try { const r = await fetch(url, { redirect: "manual" }); if (r.status) return true; } catch { /* not up */ } await sleep(500); } throw new Error(`not reachable: ${url}`); };

try {
  start(process.execPath, [NEXT, "start", "-p", String(PORT)], {});
  await waitHttp(`${BASE}/en`);

  const cssCache = new Map();
  const mediaSeen = new Set();
  const logoDataUri = `data:image/png;base64,${readFileSync(join(ROOT, "public", "images", "logo-tight.png")).toString("base64")}`;
  async function inlineCss(href) {
    if (cssCache.has(href)) return cssCache.get(href);
    let css = await (await fetch(`${BASE}${href}`)).text();
    // fonts and other media referenced by the stylesheet
    const media = [...css.matchAll(/url\((\/_next\/static\/media\/[^)]+)\)/g)].map((m) => m[1]);
    for (const m of media) {
      const name = m.split("/").pop();
      if (!mediaSeen.has(name)) {
        mediaSeen.add(name);
        const buf = Buffer.from(await (await fetch(`${BASE}${m}`)).arrayBuffer());
        writeFileSync(join(OUT, "assets", "media", name), buf);
      }
      css = css.split(m).join(`assets/media/${name}`);
    }
    cssCache.set(href, css);
    return css;
  }

  for (const [route, file] of Object.entries(PAGES)) {
    let html = await (await fetch(`${BASE}${route}`)).text();
    const locale = route.startsWith("/es") ? "es" : "en";

    // stylesheets → inline
    const links = [...html.matchAll(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"[^>]*>/g)];
    for (const l of links) html = html.replace(l[0], `<style>${await inlineCss(l[1])}</style>`);
    // scripts and script preloads → gone (the snapshot is static by design)
    html = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "").replace(/<link[^>]+as="script"[^>]*>/g, "");
    // internal links → snapshot pages; anything not in the snapshot → the home of that language
    html = html.replace(/href="(\/(?:en|es)(?:\/[^"#?]*)?)((?:[?#][^"]*)?)"/g, (_m, path, tail) => {
      const target = PAGES[path] ?? (path.startsWith("/es") ? "index.html" : "en.html");
      return `href="${target}${tail && tail.startsWith("#") ? tail : ""}"`;
    });
    // public assets used by the page: the logo mask as a data URI (a mask image needs a same-origin source), favicons as files
    html = html.replace(/\/images\/logo-tight\.png/g, logoDataUri).replace(/\/favicon-v2\.(svg|png)/g, "assets/images/favicon-v2.$1");
    // the two menus without React, plus the launcher scrolling to the embedded window
    const script = `<script>(function(){var b=document.querySelector('header nav button[aria-controls]');var m=document.querySelector('[data-platform-menu]');if(b&&m){b.addEventListener('click',function(){var o=m.hasAttribute('hidden');if(o)m.removeAttribute('hidden');else m.setAttribute('hidden','');b.setAttribute('aria-expanded',o?'true':'false');});document.addEventListener('keydown',function(e){if(e.key==='Escape'){m.setAttribute('hidden','');b.setAttribute('aria-expanded','false');}});}var h=document.querySelector('header button[aria-label]');var s=document.querySelector('[data-mobile-sheet]');if(h&&s){h.addEventListener('click',function(){var o=s.hasAttribute('hidden');if(o)s.removeAttribute('hidden');else s.setAttribute('hidden','');h.setAttribute('aria-expanded',o?'true':'false');document.documentElement.style.overflow=o?'hidden':'';});}var q=document.querySelector('[data-qa-launcher]');var p=document.querySelector('[data-qa-panel="inline"]');if(q){q.addEventListener('click',function(){if(p)p.scrollIntoView({block:'center',behavior:'smooth'});else location.href='${locale === "es" ? "index.html" : "en.html"}#ask-h';});}document.querySelectorAll('form').forEach(function(f){f.addEventListener('submit',function(e){e.preventDefault();});});})();</script>`;
    const note = `<div style="background:#f6efe2;border-bottom:1px solid #ebe8e1;padding:8px 16px;font:13px/1.5 Inter,system-ui,sans-serif;color:#4b4843;text-align:center">${NOTE[locale]}</div>`;
    // The publish target wraps the file in its own html/head/body skeleton, so the snapshot is a fragment:
    // title + inlined styles + the body's content. The next/font variable class sits on <html> in the real
    // site; here its value is copied onto :root so the same Inter faces apply.
    const pageTitle = (html.match(/<title>([^<]*)<\/title>/) ?? [, "NuovaSolution"])[1].replace(/ · NuovaSolution$/, "");
    // The gallery name of the snapshot on the entry page; the other pages keep their own page title.
    const title = file === "index.html" ? "NuovaSolution Website Probe" : pageTitle;
    const styles = [...html.matchAll(/<style>[\s\S]*?<\/style>/g)].map((m) => m[0]).join("\n");
    const fontVar = (styles.match(/\.__variable_[a-z0-9]+\{(--font-inter:[^}]+)\}/) ?? [])[1] ?? "";
    const body = (html.match(/<body[^>]*>([\s\S]*)<\/body>/) ?? [, html])[1];
    const out = `<title>${title}</title>\n${styles}\n<style>:root{${fontVar};color-scheme:light}body{margin:0}</style>\n<div lang="${locale}">${note}${body}</div>\n${script}`;
    writeFileSync(join(OUT, file), out);
    console.log(`wrote ${file}`);
  }
  for (const f of ["images/logo-tight.png", "favicon-v2.svg", "favicon-v2.png"]) {
    const src = join(ROOT, "public", f);
    if (existsSync(src)) copyFileSync(src, join(OUT, "assets", "images", f.split("/").pop()));
  }
  console.log(`snapshot in ${OUT}: ${Object.keys(PAGES).length} pages, ${mediaSeen.size} media files`);
} finally {
  for (const k of kids) { try { k.kill(); } catch { /* gone */ } }
}
