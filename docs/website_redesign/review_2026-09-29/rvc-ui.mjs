// Independent browser baseline on the live DESIGN preview (stub, d475dec as reported).
// Real CSS pixels through DevTools device emulation. Reads only; no account is created.
import { spawn } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const BASE = process.argv[2], OUT = process.argv[3], SHOTS = process.argv[4];
const CDP = 9380;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
mkdirSync(SHOTS, { recursive: true });
const res = { base: BASE, started_utc: new Date().toISOString(), checks: [], detail: {} };
const check = (id, what, verdict, ev) => { res.checks.push({ id, what, verdict, evidence: ev }); console.log(`${verdict} ${id} ${what} :: ${JSON.stringify(ev).slice(0, 320)}`); };
const kids = [];
try {
  const prof = join(SHOTS, "prof"); rmSync(prof, { recursive: true, force: true });
  kids.push(spawn("C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe", ["--headless=new", "--disable-gpu", "--no-first-run", `--user-data-dir=${prof}`, `--remote-debugging-port=${CDP}`, "about:blank"], { stdio: "ignore" }));
  let list; for (let i = 0; i < 60; i++) { try { list = await (await fetch(`http://127.0.0.1:${CDP}/json`)).json(); break; } catch { await sleep(500); } }
  const ws = new WebSocket(list.find((t) => t.type === "page").webSocketDebuggerUrl);
  await new Promise((r) => ws.addEventListener("open", r));
  let id = 0; const pend = new Map();
  ws.addEventListener("message", (e) => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } });
  const send = (m, p = {}) => new Promise((r) => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method: m, params: p })); });
  const ev = async (x) => (await send("Runtime.evaluate", { expression: x, returnByValue: true, awaitPromise: true })).result?.result?.value;
  const vp = (w, h, mobile = w <= 430) => send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: 2, mobile });
  const go = async (p, wait = 3200) => { await send("Page.navigate", { url: BASE + p }); await sleep(wait); };
  const shot = async (n) => { const s = await send("Page.captureScreenshot", { format: "png" }); writeFileSync(join(SHOTS, n + ".png"), Buffer.from(s.result.data, "base64")); };
  await send("Page.enable");

  // ---------- WR-33 / WR-34: is the claim qualified where it is made ----------
  await vp(1440, 900, false);
  const qual = {};
  for (const p of ["/en", "/es", "/en/platform/ai-sales-agent", "/es/platform/ai-sales-agent"]) {
    await go(p);
    qual[p] = await ev(`(() => {
      const h1 = document.querySelector('h1'); const hy = h1.getBoundingClientRect().top + scrollY;
      const nodes = [...document.querySelectorAll('p,span,small,li,figcaption')].filter(e => [...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim()));
      const q = nodes.filter(e => /permission|permiso|configuration|configuraci|Example|Ejemplo|synthetic|sintétic/i.test(e.innerText || ''))
        .map(e => ({ t: (e.innerText || '').trim().slice(0, 80), y: Math.round(e.getBoundingClientRect().top + scrollY) }))
        .sort((a, b) => a.y - b.y);
      const near = q.filter(x => x.y >= hy - 400 && x.y <= hy + 800);
      return { h1: h1.innerText.trim().slice(0, 70), h1_y: Math.round(hy), qualifiers_total: q.length, first: q[0] ?? null, near_claim: near.slice(0, 3) };
    })()`);
  }
  res.detail.qualifier = qual;
  const ok = (x) => x && x.near_claim.length > 0;
  check("RVC-33", "WR-33: the home hero claim is qualified within its own screen, both languages",
    ok(qual["/en"]) && ok(qual["/es"]) ? "PASS" : "FAIL", { en: qual["/en"], es: qual["/es"] });
  check("RVC-34", "WR-34: the product page claim is qualified next to its h1, both languages",
    ok(qual["/en/platform/ai-sales-agent"]) && ok(qual["/es/platform/ai-sales-agent"]) ? "PASS" : "FAIL",
    { en: qual["/en/platform/ai-sales-agent"], es: qual["/es/platform/ai-sales-agent"] });

  // ---------- Z18: language switch keeps an uncritical query ----------
  await go("/en/login?confirmed=1", 3000);
  const sw = await ev(`(async () => { const a = [...document.querySelectorAll('a[href]')].find(x => /^\\/es/.test(x.getAttribute('href') || '')); if (!a) return { found: false };
    const href = a.getAttribute('href'); a.click(); await new Promise(r => setTimeout(r, 2000)); return { found: true, href, url: location.pathname + location.search }; })()`);
  res.detail.language_switch = sw;
  check("RVC-Z18", "switching language keeps ?confirmed=1", /confirmed=1/.test(sw?.url ?? "") ? "PASS" : "FAIL", sw);

  // ---------- Z20: mobile sheet keyboard ----------
  await vp(390, 844);
  await go("/en");
  const sheet = await ev(`(async () => {
    const btn = [...document.querySelectorAll('header button')].find(b => /^(Menu|Menú)/i.test(((b.getAttribute('aria-label') || b.innerText || '').trim())));
    if (!btn) return { opener: false, buttons: [...document.querySelectorAll('header button')].map(b => (b.getAttribute('aria-label') || b.innerText || '').trim().slice(0, 20)) };
    btn.focus(); btn.click(); await new Promise(r => setTimeout(r, 900));
    const panel = btn.getAttribute('aria-controls') ? document.getElementById(btn.getAttribute('aria-controls')) : document.querySelector('[role=dialog]');
    const info = { expanded: btn.getAttribute('aria-expanded'), role: panel ? panel.getAttribute('role') : null, ariaModal: panel ? panel.getAttribute('aria-modal') : null, focusInPanel: panel ? panel.contains(document.activeElement) : null, height: panel ? Math.round(panel.getBoundingClientRect().height) : null };
    document.activeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await new Promise(r => setTimeout(r, 800));
    return { opener: true, ...info, expandedAfterEscape: btn.getAttribute('aria-expanded'), visibleAfterEscape: panel ? panel.getBoundingClientRect().height > 0 : null, focusBackOnOpener: document.activeElement === btn };
  })()`);
  res.detail.sheet = sheet;
  check("RVC-Z20", "the mobile sheet closes with Escape and gives focus back to its opener",
    sheet?.opener && sheet.expandedAfterEscape === "false" && sheet.focusBackOnOpener ? "PASS" : "FAIL", sheet);
  await shot("rvc-390-en-sheet");

  // ---------- Z17: stacked cards at 390x640 and at 200 % zoom ----------
  const stack = {};
  for (const [w, h, label] of [[390, 640, "390x640"], [720, 700, "zoom200"]]) {
    await vp(w, h, w <= 430); await go("/en", 3000);
    stack[label] = await ev(`(() => { const c = [...document.querySelectorAll('.stack-card')];
      return { cards: c.length, viewport: innerHeight, heights: c.map(e => Math.round(e.getBoundingClientRect().height)).slice(0, 8), taller: c.filter(e => e.getBoundingClientRect().height > innerHeight).length, sticky: c.filter(e => getComputedStyle(e).position === 'sticky').length }; })()`);
  }
  res.detail.stack = stack;
  check("RVC-Z17", "stacked cards fit a 640 px viewport and a 200 % zoom",
    Object.values(stack).every((s) => s.cards === 0 || s.taller === 0) ? "PASS" : "FAIL", stack);
  await vp(390, 640); await go("/en", 3000); await shot("rvc-390x640-en-home");

  // ---------- plan interest into the contact request ----------
  await vp(1440, 900, false);
  await go("/en/packages", 3200);
  const plans = await ev(`(() => ({ ctas: [...document.querySelectorAll('main a[href], main button')].map(e => ({ t: (e.innerText || '').trim().slice(0, 30), href: e.getAttribute('href') || '' })).filter(x => x.t).slice(0, 20),
    trial_badges: (document.body.innerText.match(/14 (days|días)/gi) || []).length, free_words: (document.body.innerText.match(/free|gratis/gi) || []).length }))()`);
  res.detail.packages = plans;
  const proposalLink = (plans?.ctas ?? []).find((c) => /contact|contacto/i.test(c.href));
  let contact = null;
  if (proposalLink) { await go(proposalLink.href.replace(BASE, ""), 3000);
    contact = await ev(`(() => { const sel = document.querySelector('select[name*=plan i], input[name*=plan i]');
      const pre = sel ? (sel.value || '') : null; const url = location.search;
      return { url, plan_field: !!sel, prefilled: pre, fields: [...document.querySelectorAll('form input,form select,form textarea')].map(e => e.name || e.id || e.type).slice(0, 10) }; })()`); }
  res.detail.contact = contact;
  check("RVC-PLAN", "a plan carries its interest into the contact request",
    contact?.plan_field && String(contact.prefilled || "").length > 0 ? "PASS" : "FAIL", { link: proposalLink, contact });

  // ---------- legal links and mailto ----------
  await go("/en/legal/privacy", 3000);
  const legal = await ev(`(() => { const mail = [...document.querySelectorAll('a[href^="mailto:"]')].map(a => ({ href: a.getAttribute('href'), text: a.innerText.trim() }));
    const links = [...document.querySelectorAll('footer a[href]')].map(a => a.getAttribute('href')).slice(0, 20);
    return { mailto: mail, footer_links: links, h1: (document.querySelector('h1') || {}).innerText || '' }; })()`);
  res.detail.legal = legal;
  const badMail = (legal?.mailto ?? []).filter((m) => /[.,;]$/.test(m.href) || /\.$/.test(m.href.replace(/^mailto:/, "")));
  check("RVC-MAILTO", "mail links carry a clean address (no trailing dot)", badMail.length === 0 ? "PASS" : "FAIL", { mailto: legal?.mailto, bad: badMail });

  // ---------- 360 px: overflow and overlap of text ----------
  await vp(360, 800);
  const small = {};
  for (const p of ["/en", "/es", "/es/packages", "/es/signup"]) { await go(p, 3000);
    small[p] = await ev(`({ iw: innerWidth, sw: document.documentElement.scrollWidth, overflow: document.documentElement.scrollWidth > innerWidth + 1 })`); }
  res.detail.small = small;
  check("RVC-360", "no horizontal overflow at 360 px", Object.values(small).every((s) => !s.overflow) ? "PASS" : "FAIL", small);

  // ---------- reduced motion and keyboard ----------
  await send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
  await vp(1440, 900, false); await go("/en", 3200);
  const motion = await ev(`(() => { const a = document.getAnimations ? document.getAnimations() : []; const run = a.filter(x => x.playState === 'running');
    const vids = [...document.querySelectorAll('video')].map(v => ({ autoplay: v.autoplay, muted: v.muted, controls: v.controls, poster: !!v.getAttribute('poster'), playing: !v.paused }));
    return { animations: a.length, running: run.length, videos: vids }; })()`);
  res.detail.motion = motion;
  check("RVC-MOTION", "with reduced motion nothing keeps animating and no video plays with sound",
    motion.running === 0 && (motion.videos ?? []).every((v) => !v.playing || v.muted) ? "PASS" : "FAIL", motion);
  await send("Emulation.setEmulatedMedia", { features: [] });

  const kb = await ev(`(() => { const f = [...document.querySelectorAll('a[href],button,select,input,textarea')].filter(e => !e.disabled && e.offsetParent);
    f[0].focus(); const s = getComputedStyle(document.activeElement);
    return { focusables: f.length, first: (document.activeElement.innerText || '').trim().slice(0, 24), ring: s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) > 0 || s.boxShadow !== 'none' }; })()`);
  res.detail.keyboard = kb;
  check("RVC-KB", "focus is visible on the first interactive element", kb?.ring ? "PASS" : "FAIL", kb);
  await shot("rvc-1440-en-home");
  ws.close();
} catch (e) { res.error = String(e?.message ?? e); console.error("ERROR", res.error); }
finally {
  res.finished_utc = new Date().toISOString();
  writeFileSync(OUT, JSON.stringify(res, null, 1));
  console.log(JSON.stringify(res.checks.map((c) => [c.id, c.verdict])));
  for (const k of kids) k.kill();
  process.exit(0);
}
