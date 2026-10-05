// Contrast of small text (review 2026-10-01, F1: WCAG AA 4.5 : 1 for text under 18.66 px, or under 14 px
// bold … i.e. everything that is not "large"). For every visible element with its own text on the sales
// pages, EN and ES, at 1440 and 390 px: its colour against the nearest opaque background behind it; where
// the ground is a band (a gradient painted by a pseudo element, invisible to getComputedStyle), against
// every light ground of the site, so the worst case counts. Local build (default) or deployed (BASE=…).
// Writes contrast-results.json. Exit 1 if any text is below its floor.
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const ROOT = new URL("../../", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const OUT = process.env.OUT ?? join(ROOT, "docs", "website_redesign", "evidence_2026-09-30", "contrast");
const EDGE = process.env.EDGE ?? "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const NEXT = join(ROOT, "node_modules", "next", "dist", "bin", "next");
const PORT = 3141, CDP_PORT = 9385;
const BASE = (process.env.BASE ?? `http://localhost:${PORT}`).replace(/\/$/, "");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
mkdirSync(OUT, { recursive: true });

// The light grounds of the site (globals.css): canvas, white, sunken, the band gradients' stops and the fields.
const GROUNDS = { canvas: "#fbfaf7", white: "#ffffff", sunken: "#f3f1ec", sandTop: "#f6efe2", sandBand: "#f1e8d7", sand200: "#ecdfc4", sageBand: "#e5ede0", sage100: "#eaf1e6", stoneBand: "#ecebe5", sky100: "#e6eef5", sky200: "#cfdde9", apricot100: "#f9e9de", archTop: "#f4ebd9", archEnd: "#efe3cb" };
const ROUTES = ["", "/faq", "/platform", "/platform/ai-sales-agent", "/platform/daily-assistant", "/packages", "/trial", "/contact", "/signup", "/login", "/legal/privacy"];

const lin = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
const lum = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
const ratio = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const blend = (fg, a, bg) => fg.map((c, i) => Math.round(c * a + bg[i] * (1 - a)));

const results = { started_utc: new Date().toISOString(), base: BASE, commit: process.env.E2E_COMMIT ?? null, deployment: process.env.E2E_DEPLOYMENT ?? null, grounds: GROUNDS, pages: [], failures: [] };
const kids = [];
try {
  if (!process.env.BASE) {
    const p = spawn(process.execPath, [NEXT, "start", "-p", String(PORT)], { cwd: ROOT, env: process.env, stdio: ["ignore", "pipe", "pipe"] });
    p.stdout.on("data", () => {}); p.stderr.on("data", () => {}); kids.push(p);
    for (let i = 0; i < 120; i++) { try { const r = await fetch(`${BASE}/en`, { redirect: "manual" }); if (r.status) break; } catch { /* not up */ } await sleep(500); }
  }
  const prof = join(tmpdir(), `nuova-contrast-${Date.now()}`);
  kids.push(spawn(EDGE, ["--headless=new", "--disable-gpu", "--no-first-run", "--hide-scrollbars", `--user-data-dir=${prof}`, `--remote-debugging-port=${CDP_PORT}`, "about:blank"], { stdio: "ignore" }));
  let list;
  for (let i = 0; i < 60; i++) { try { list = await (await fetch(`http://127.0.0.1:${CDP_PORT}/json`)).json(); break; } catch { await sleep(500); } }
  const ws = new WebSocket(list.find((t) => t.type === "page").webSocketDebuggerUrl);
  await new Promise((res) => ws.addEventListener("open", res));
  let mid = 0;
  const pend = new Map();
  ws.addEventListener("message", (e) => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } });
  const send = (method, params = {}) => new Promise((res) => { const i = ++mid; pend.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
  const ev = async (x) => (await send("Runtime.evaluate", { expression: x, returnByValue: true, awaitPromise: true })).result?.result?.value;
  await send("Page.enable");
  await send("Runtime.enable");

  // Per text element: colour (rgba), size, weight, and the nearest ancestor background that is opaque enough.
  const COLLECT = `(()=>{
    const parse=s=>{const m=s.match(/rgba?\\(([^)]+)\\)/);if(!m)return null;const p=m[1].split(/[ ,/]+/).filter(Boolean).map(Number);return {rgb:p.slice(0,3),a:p.length>3?p[3]:1}};
    const out=[];
    for(const el of document.querySelectorAll('body *')){
      if(!el.offsetParent&&getComputedStyle(el).position!=='fixed')continue;
      const own=[...el.childNodes].some(n=>n.nodeType===3&&n.textContent.trim());
      if(!own)continue;
      const cs=getComputedStyle(el);
      if(cs.visibility==='hidden'||parseFloat(cs.opacity)<0.1)continue;
      const r=el.getBoundingClientRect(); if(r.width<3||r.height<3)continue;
      if(el.closest('[aria-hidden=true],video,picture,img,svg'))continue;
      let bg=null,bgEl=null,n=el;
      while(n&&n!==document.documentElement){const b=parse(getComputedStyle(n).backgroundColor);if(b&&b.a>=0.85){bg=b.rgb;bgEl=n;break}if(n.tagName==='HEADER'&&n.dataset.scrolled==='false'){const hero=document.querySelector('[data-hero=dark]');const hb=hero&&parse(getComputedStyle(hero).backgroundColor);if(hb&&hb.a>=0.85){bg=hb.rgb;bgEl=hero;break}}n=n.parentElement}
      // Painted grounds (bands, fields, the arch) are gradients that getComputedStyle cannot read. An opaque surface
      // inside such a ground is what the text really sits on; otherwise the ground itself is, so every light ground counts.
      const groundEl=el.closest('.band,.field-sage,.field-sand,.field-sky,.field-apricot,.hero-arch');
      const onPainted=!!groundEl&&!(bgEl&&groundEl.contains(bgEl)&&bgEl!==groundEl);
      const size=parseFloat(cs.fontSize),weight=parseInt(cs.fontWeight,10);
      const large=size>=24||(size>=18.66&&weight>=700);
      out.push({text:(el.innerText||'').trim().slice(0,40),color:parse(cs.color),bg,size,weight,large,band:onPainted||!bg});
    }
    return out;
  })()`;

  for (const locale of ["en", "es"]) {
    for (const [tag, w, h, mobile] of [["d1440", 1440, 900, false], ["m390", 390, 844, true]]) {
      await send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: 1, mobile });
      for (const route of ROUTES) {
        await send("Page.navigate", { url: `${BASE}/${locale}${route}` });
        await sleep(process.env.BASE ? 2600 : 1400);
        await ev("(()=>{document.querySelectorAll('.reveal,.rise').forEach(e=>e.classList.add('is-in'));return 1})()");
        await sleep(700);
        const items = await ev(COLLECT);
        let worst = null, count = 0;
        for (const it of items) {
          if (!it.color) continue;
          const floor = it.large ? 3 : 4.5;
          // Against its own opaque background; text on a band or field is measured against every light ground
          // unless an opaque light surface sits directly behind it.
          const own = it.bg && lum(it.bg) < 0.5 ? [["own", it.bg]] : it.bg && !it.band ? [["own", it.bg]] : Object.entries(GROUNDS).map(([k, v]) => [k, hex(v)]).concat(it.bg ? [["own", it.bg]] : []);
          for (const [gname, g] of own) {
            const fg = it.color.a < 1 ? blend(it.color.rgb, it.color.a, g) : it.color.rgb;
            const cr = ratio(fg, g);
            count++;
            if (!worst || cr < worst.ratio) worst = { ratio: Math.round(cr * 100) / 100, text: it.text, ground: gname, size: it.size };
            if (cr < floor - 0.005) results.failures.push({ page: `/${locale}${route}`, view: tag, text: it.text, color: it.color, ground: gname, ratio: Math.round(cr * 100) / 100, floor, size: it.size });
          }
        }
        results.pages.push({ page: `/${locale}${route}`, view: tag, texts: items.length, comparisons: count, worst });
        console.log(`${tag} /${locale}${route}: ${items.length} texts, worst ${worst?.ratio} ("${worst?.text}" on ${worst?.ground})`);
      }
    }
  }
  ws.close();
} finally {
  for (const k of kids) { try { k.kill(); } catch { /* gone */ } }
  results.finished_utc = new Date().toISOString();
  // one line per distinct failing text, so the list stays readable
  const seen = new Set();
  results.distinct_failures = results.failures.filter((f) => { const k = `${f.text}|${f.ground}`; if (seen.has(k)) return false; seen.add(k); return true; });
  writeFileSync(join(OUT, "contrast-results.json"), JSON.stringify(results, null, 1));
  for (const f of results.distinct_failures.slice(0, 30)) console.log("FAIL", JSON.stringify(f));
  console.log(`${results.failures.length} comparisons below the floor (${results.distinct_failures.length} distinct) -> ${join(OUT, "contrast-results.json")}`);
  process.exit(results.failures.length ? 1 : 0);
}
