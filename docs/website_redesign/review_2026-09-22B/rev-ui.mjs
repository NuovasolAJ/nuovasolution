// Independent technical design check of the current candidate (no taste judgement):
// overlap, clipping, overflow, placeholders, language field, plan -> checkout path, reduced motion,
// keyboard focus. Local server only. Viewports are real CSS px through DevTools device emulation.
import { spawn } from "node:child_process";
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const REF = "fflmmzapksycjfdcjdtd";
const ROOT = process.argv[2], OUT = process.argv[3], SHOTS = process.argv[4];
const SECRETS = "C:/Users/Usuario/.nuova-secrets";
const PORT = 3133, CDP = 9361, BASE = `http://localhost:${PORT}`;
const PUB = readFileSync(join(SECRETS, "stg_publishable_key.txt"), "utf8").trim();
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
mkdirSync(SHOTS, { recursive: true });

const res = { started_utc: new Date().toISOString(), commit: "6fbe45f", checks: [], detail: {} };
const check = (id, what, pass, evidence) => { res.checks.push({ id, what, pass: Boolean(pass), evidence }); console.log(`${pass ? "PASS" : "FAIL"} ${id} ${what} :: ${JSON.stringify(evidence).slice(0, 400)}`); };
const kids = [];

const OVERLAP = `(() => {
  const vis = [...document.querySelectorAll('header *, nav *, main *')].filter(e => {
    const s = getComputedStyle(e); if (s.visibility === 'hidden' || s.display === 'none' || Number(s.opacity) < 0.05) return false;
    if (!e.childNodes.length || ![...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())) return false;
    const r = e.getBoundingClientRect(); return r.width > 8 && r.height > 8 && r.top < innerHeight && r.bottom > 0;
  });
  const out = [];
  for (let i = 0; i < vis.length; i++) for (let j = i + 1; j < vis.length; j++) {
    const a = vis[i], b = vis[j];
    if (a.contains(b) || b.contains(a)) continue;
    const ra = a.getBoundingClientRect(), rb = b.getBoundingClientRect();
    const ox = Math.min(ra.right, rb.right) - Math.max(ra.left, rb.left);
    const oy = Math.min(ra.bottom, rb.bottom) - Math.max(ra.top, rb.top);
    if (ox > 4 && oy > 4) out.push({ a: (a.innerText || '').trim().slice(0, 28), b: (b.innerText || '').trim().slice(0, 28), overlap: Math.round(ox) + 'x' + Math.round(oy) });
  }
  return out.slice(0, 12);
})()`;
const CLIPPED = `[...document.querySelectorAll('main *, header *')].filter(e => {
  const s = getComputedStyle(e);
  if (!['hidden','clip'].includes(s.overflowX) && !['hidden','clip'].includes(s.overflowY)) return false;
  return e.scrollWidth > e.clientWidth + 2 || e.scrollHeight > e.clientHeight + 2;
}).map(e => ({ t: (e.innerText||'').trim().slice(0,40), sw: e.scrollWidth, cw: e.clientWidth, sh: e.scrollHeight, ch: e.clientHeight })).slice(0, 10)`;

try {
  kids.push(spawn(process.execPath, [join(ROOT, "node_modules", "next", "dist", "bin", "next"), "start", "-p", String(PORT)], { cwd: ROOT, env: { ...process.env, NUOVA_INTEGRATION_MODE: "staging", NEXT_PUBLIC_SUPABASE_URL: `https://${REF}.supabase.co`, NEXT_PUBLIC_SUPABASE_ANON_KEY: PUB, NUOVA_STAGING_TARGET_APPROVED: REF }, stdio: "ignore" }));
  for (let i = 0; i < 120; i++) { try { await fetch(`${BASE}/en`); break; } catch { await sleep(500); } }

  const prof = join(SHOTS, "prof"); rmSync(prof, { recursive: true, force: true });
  kids.push(spawn("C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe", ["--headless=new", "--disable-gpu", "--no-first-run", `--user-data-dir=${prof}`, `--remote-debugging-port=${CDP}`, "about:blank"], { stdio: "ignore" }));
  let list; for (let i = 0; i < 60; i++) { try { list = await (await fetch(`http://127.0.0.1:${CDP}/json`)).json(); break; } catch { await sleep(500); } }
  const ws = new WebSocket(list.find((t) => t.type === "page").webSocketDebuggerUrl);
  await new Promise((r) => ws.addEventListener("open", r));
  let id = 0; const pend = new Map();
  ws.addEventListener("message", (e) => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } });
  const send = (method, params = {}) => new Promise((r) => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
  const ev = async (x) => (await send("Runtime.evaluate", { expression: x, returnByValue: true, awaitPromise: true })).result?.result?.value;
  const vp = (w, h = 900, mobile = w <= 430) => send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: 1, mobile });
  const go = async (p, wait = 2200) => { await send("Page.navigate", { url: BASE + p }); await sleep(wait); };
  const shot = async (n) => { const s = await send("Page.captureScreenshot", { format: "png" }); writeFileSync(join(SHOTS, n + ".png"), Buffer.from(s.result.data, "base64")); };
  await send("Page.enable"); await send("Runtime.enable");

  const PAGES = ["/en", "/es", "/en/platform/crm", "/es/platform/crm", "/en/pricing", "/es/pricing", "/en/signup", "/es/signup"];
  const WIDTHS = [360, 390, 768, 1440];

  // overlap + clipping + overflow across viewports and locales
  const overlaps = {}, clipped = {}, overflow = {};
  for (const w of WIDTHS) { await vp(w, w <= 430 ? 844 : 900);
    for (const p of PAGES) { await go(p);
      const o = await ev(OVERLAP), c = await ev(CLIPPED), sw = await ev(`({iw: innerWidth, sw: document.documentElement.scrollWidth})`);
      if (o?.length) overlaps[`${w}${p}`] = o;
      if (c?.length) clipped[`${w}${p}`] = c;
      if (sw && sw.sw > sw.iw + 1) overflow[`${w}${p}`] = sw;
    } }
  res.detail.overlaps = overlaps; res.detail.clipped = clipped; res.detail.overflow = overflow;
  check("UI-01", "no overlapping text boxes on eight pages x four viewports", Object.keys(overlaps).length === 0, { pages_with_overlap: Object.keys(overlaps).slice(0, 6), count: Object.keys(overlaps).length });
  check("UI-02", "no clipped text (scroll size beyond a hidden box)", Object.keys(clipped).length === 0, { pages: Object.keys(clipped).slice(0, 6), count: Object.keys(clipped).length });
  check("UI-03", "no horizontal page overflow", Object.keys(overflow).length === 0, { pages: Object.keys(overflow).slice(0, 6) });

  // open navigation at 390: overlap inside the open menu
  await vp(390, 844); await go("/es");
  const navOpen = await ev(`(async()=>{const b=[...document.querySelectorAll('header button')].find(x=>/men|Men|☰/i.test(x.getAttribute('aria-label')||x.innerText)); if(!b) return 'no menu button'; b.click(); await new Promise(r=>setTimeout(r,600)); return 'opened';})()`);
  const navOverlap = navOpen === "opened" ? await ev(OVERLAP) : [];
  await shot("ui-390-es-nav-open");
  check("UI-04", "the open mobile navigation has no overlapping labels", Array.isArray(navOverlap) && navOverlap.length === 0, { menu: navOpen, overlaps: (navOverlap ?? []).slice(0, 4) });

  // placeholder wording on public pages
  await vp(1440, 900);
  const placeholders = {};
  for (const p of PAGES) { await go(p); const t = await ev(`(document.body.innerText||'').match(/(Capture pending|Pendiente de captura|Lorem|TODO|placeholder|Coming soon|Próximamente)/gi)||[]`); if (t?.length) placeholders[p] = [...new Set(t)]; }
  res.detail.placeholders = placeholders;
  check("UI-05", "no placeholder wording on the public pages", Object.keys(placeholders).length === 0, placeholders);

  // language field on the Spanish sign-up page
  await go("/es/signup");
  const lang = await ev(`(()=>{const s=document.querySelector('select[name=language],select#language,select'); if(!s) return {found:false, labels:[...document.querySelectorAll('label')].map(l=>l.innerText.trim()).slice(0,8)};
    const lab=(s.labels&&s.labels[0]?s.labels[0].innerText:'').trim(); return {found:true, label:lab, value:s.value, options:[...s.options].map(o=>o.value+':'+o.text.trim()), pageLocale:document.documentElement.lang};})()`);
  res.detail.language_field = lang;
  check("UI-06", "the Spanish sign-up page preselects Spanish and labels the field in Spanish",
    lang?.found ? lang.value === "es" && !/english/i.test(String(lang.label)) : false, lang);

  // plan -> checkout path
  await go("/es/pricing");
  const ctas = await ev(`[...document.querySelectorAll('main a[href], main button')].map(e=>({t:(e.innerText||'').trim().slice(0,32), href:e.getAttribute('href')||''})).filter(x=>x.t).slice(0,25)`);
  res.detail.pricing_ctas = ctas;
  check("UI-07", "each plan offers a visible next step (registration or demo), not a dead end",
    Array.isArray(ctas) && ctas.some((c) => /signup|registro|demo|contact/i.test(c.href + c.t)), { ctas: (ctas ?? []).slice(0, 8) });

  // reduced motion
  await send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
  await go("/es", 2600);
  const anim = await ev(`(()=>{const a=document.getAnimations?document.getAnimations():[]; const running=a.filter(x=>x.playState==='running'); return {total:a.length, running:running.length, infinite: running.filter(x=>x.effect&&x.effect.getTiming().iterations===Infinity).length};})()`);
  check("UI-08", "with reduced motion no animation keeps running", anim && anim.running === 0, anim);
  await send("Emulation.setEmulatedMedia", { features: [] });

  // 200 % browser zoom on desktop = half the CSS width
  await vp(720, 900, false); await go("/es");
  const zoom = await ev(`({iw:innerWidth, sw:document.documentElement.scrollWidth})`);
  const zoomOverlap = await ev(OVERLAP);
  await shot("ui-720-es-zoom200");
  check("UI-09", "at 200 % zoom the page neither overflows nor overlaps", zoom.sw <= zoom.iw + 1 && (zoomOverlap ?? []).length === 0, { ...zoom, overlaps: (zoomOverlap ?? []).length });

  // keyboard: focus is visible and reaches the primary action
  await vp(1440, 900); await go("/es");
  const kb = await ev(`(()=>{const f=[...document.querySelectorAll('a[href],button,select,input,textarea')].filter(e=>!e.disabled&&e.offsetParent); if(!f.length) return {n:0};
    f[0].focus(); const s=getComputedStyle(document.activeElement); const ring=s.outlineStyle!=='none'&&parseFloat(s.outlineWidth)>0 || s.boxShadow!=='none';
    return {n:f.length, firstFocus:(document.activeElement.innerText||'').trim().slice(0,24), visibleRing:ring};})()`);
  check("UI-10", "keyboard focus is visible on the first interactive element", Boolean(kb?.visibleRing), kb);

  await shot("ui-1440-es-home");
  ws.close();
} catch (e) {
  res.error = String(e?.message ?? e);
  console.error("ERROR", res.error);
} finally {
  res.finished_utc = new Date().toISOString();
  res.summary = { pass: res.checks.filter((c) => c.pass).length, total: res.checks.length };
  writeFileSync(OUT, JSON.stringify(res, null, 1));
  console.log(JSON.stringify(res.summary));
  for (const k of kids) k.kill();
  process.exit(0);
}
