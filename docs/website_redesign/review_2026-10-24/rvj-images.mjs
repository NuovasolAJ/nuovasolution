// R24 pre-check: the owner's website findings (images 01-05, 07-13) measured on the named build.
// Read-only. Usage: node rvj-images.mjs <baseUrl> <out.json> <shots>
import { spawn } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
const BASE = process.argv[2], OUT = process.argv[3], SHOTS = process.argv[4];
const CDP = 9421; const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
mkdirSync(SHOTS, { recursive: true });
const res = { deployment: BASE, started_utc: new Date().toISOString(), images: {}, detail: {} };
const put = (img, verdict, ev) => { res.images[img] = { verdict, evidence: ev }; console.log(`${img} ${verdict} :: ${JSON.stringify(ev).slice(0, 300)}`); };
const kids = [];
try {
  const prof = join(SHOTS, "imgprof"); rmSync(prof, { recursive: true, force: true });
  kids.push(spawn("C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe", ["--headless=new", "--disable-gpu", "--no-first-run", `--user-data-dir=${prof}`, `--remote-debugging-port=${CDP}`, "about:blank"], { stdio: "ignore" }));
  let list; for (let i = 0; i < 60; i++) { try { list = await (await fetch(`http://127.0.0.1:${CDP}/json`)).json(); break; } catch { await sleep(500); } }
  const ws = new WebSocket(list.find((t) => t.type === "page").webSocketDebuggerUrl);
  await new Promise((r) => ws.addEventListener("open", r));
  let id = 0; const pend = new Map();
  ws.addEventListener("message", (e) => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } });
  const send = (m, p = {}) => new Promise((r) => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method: m, params: p })); });
  const ev = async (x) => (await send("Runtime.evaluate", { expression: x, returnByValue: true, awaitPromise: true })).result?.result?.value;
  const vp = (w, h, mobile = w <= 430) => send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: 2, mobile });
  const go = async (p, w = 3600) => { await send("Page.navigate", { url: BASE + p }); await sleep(w); };
  const shot = async (n) => { const s = await send("Page.captureScreenshot", { format: "png" }); writeFileSync(join(SHOTS, n + ".png"), Buffer.from(s.result.data, "base64")); };
  const txt = () => ev('(document.body.innerText || "").replace(/\\s+/g, " ")');
  await send("Page.enable");

  // ---------- 01: does the fixed header cover the hero buttons? ----------
  const headerCover = {};
  for (const [w, h] of [[390, 844], [1440, 950]]) {
    await vp(w, h); await go("/es");
    headerCover[w] = await ev(`(() => { const hdr = document.querySelector("header"); const hr = hdr.getBoundingClientRect();
      const ctas = [...document.querySelectorAll("main a, main button")].filter(e => /gratis|demo|empieza|ver /i.test(e.innerText || ""));
      const out = [];
      for (const c of ctas.slice(0, 6)) { const r = c.getBoundingClientRect(); if (r.height === 0) continue;
        const overlap = Math.min(hr.bottom, r.bottom) - Math.max(hr.top, r.top);
        const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
        const top = document.elementFromPoint(cx, cy);
        out.push({ label: (c.innerText || "").trim().slice(0, 22), top: Math.round(r.top), headerBottom: Math.round(hr.bottom),
          overlapPx: Math.round(Math.max(0, overlap)), hitIsSelf: !!top && (c.contains(top) || top === c), hitLabel: top ? (top.innerText || top.tagName).trim().slice(0, 18) : null }); }
      return { headerHeight: Math.round(hr.height), headerPosition: getComputedStyle(hdr).position, ctas: out }; })()`);
    await shot(`rvj-${w}-01-hero`);
  }
  res.detail.headerCover = headerCover;
  const covered = Object.entries(headerCover).flatMap(([w, v]) => (v.ctas ?? []).filter((c) => c.overlapPx > 0 || c.hitIsSelf === false).map((c) => ({ w, ...c })));
  put("01", covered.length === 0 ? "NOT_REPRODUCED" : "CONFIRMED", { covered: covered.slice(0, 4), header: Object.fromEntries(Object.entries(headerCover).map(([w, v]) => [w, { h: v.headerHeight, pos: v.headerPosition }])) });

  // ---------- 03 / 11: the Daily task, the cut column and the two wordings ----------
  await vp(1440, 950, false); await go("/es");
  res.detail.daily = await ev(`(async () => {
    const take = [...document.querySelectorAll("button")].find(b => /^Tomar/i.test((b.innerText || "").trim()));
    const before = (document.body.innerText || "").match(/Abierta[^.]{0,60}|nadie la ha tomado[^.]{0,40}/)?.[0] ?? null;
    let after = null;
    if (take) { take.scrollIntoView({ block: "center" }); await new Promise(r => setTimeout(r, 600)); take.click(); await new Promise(r => setTimeout(r, 1800));
      after = (document.body.innerText || "").match(/[^.]{0,80}(tomada|Tomada|desaparece|Desaparece)[^.]{0,80}/)?.[0] ?? null; }
    const clipped = [...document.querySelectorAll("main *")].filter(e => { const s = getComputedStyle(e);
      if (!["hidden", "clip"].includes(s.overflowX) && !["hidden", "clip"].includes(s.overflowY)) return false;
      if (e.clientWidth <= 4 || e.clientHeight <= 4) return false;
      return e.scrollWidth > e.clientWidth + 2; }).map(e => ({ cls: (e.className || "").toString().slice(0, 40), sw: e.scrollWidth, cw: e.clientWidth, t: (e.innerText || "").trim().slice(0, 40) })).slice(0, 5);
    const narrow = [...document.querySelectorAll("main p, main li")].filter(e => { const r = e.getBoundingClientRect(); return r.width > 0 && r.width < 40 && (e.innerText || "").trim().length > 10; })
      .map(e => ({ w: Math.round(e.getBoundingClientRect().width), t: (e.innerText || "").trim().slice(0, 30) })).slice(0, 4);
    return { takeFound: !!take, before, after, clipped, narrowColumns: narrow }; })()`);
  await shot("rvj-1440-03-daily");
  const d = res.detail.daily;
  put("03", (d?.clipped?.length ?? 0) === 0 && (d?.narrowColumns?.length ?? 0) === 0 ? "NOT_REPRODUCED" : "CONFIRMED",
    { clipped: d?.clipped, narrow: d?.narrowColumns, after_take: d?.after });

  // ---------- 12: the accent in "envía", and the language sentence everywhere ----------
  const lang = {};
  for (const p of ["/es", "/es/faq", "/es/platform", "/es/packages"]) { await go(p, 2600);
    const t = await txt();
    lang[p] = { withAccent: (t.match(/env[íi]a nada autom/gi) || []).map((s) => s.slice(0, 20)), sentence: (t.match(/[^.]{0,40}otro idioma[^.]{0,60}\./i) || [])[0]?.trim() ?? null }; }
  res.detail.language = lang;
  const badAccent = Object.entries(lang).filter(([, v]) => (v.withAccent ?? []).some((s) => /envia nada/i.test(s)));
  put("12", badAccent.length === 0 ? "NOT_REPRODUCED" : "CONFIRMED", { pages_without_accent: badAccent.map(([p]) => p), sample: lang["/es"] });

  // ---------- 04: the social example, the clipped state line and the empty area ----------
  await vp(1440, 950, false); await go("/es", 3600);
  res.detail.social = await ev(`(async () => { for (let i = 0; i < 14; i++) { scrollTo({top: innerHeight*i, behavior: "instant"}); await new Promise(r => setTimeout(r, 500)); }
    const head = [...document.querySelectorAll("h2, h3")].find(h => /social|instagram|publicaci/i.test(h.innerText || ""));
    if (!head) return { found: false };
    const block = head.closest("section, article, div");
    const state = [...block.querySelectorAll("*")].find(e => /Estado\\s*:/i.test((e.innerText || "").slice(0, 40)));
    const r = state ? state.getBoundingClientRect() : null;
    const hdr = document.querySelector("header").getBoundingClientRect();
    const gaps = []; const kids2 = [...block.children];
    for (let i = 0; i < kids2.length - 1; i++) { const a = kids2[i].getBoundingClientRect(), b = kids2[i + 1].getBoundingClientRect();
      const gap = Math.round(b.top - a.bottom); if (gap > 160) gaps.push({ gap, after: (kids2[i].innerText || "").trim().slice(0, 30) }); }
    return { found: true, heading: head.innerText.trim().slice(0, 50), stateLine: state ? (state.innerText || "").trim().slice(0, 60) : null,
      stateTop: r ? Math.round(r.top) : null, headerBottom: Math.round(hdr.bottom), stateUnderHeader: r ? r.top < hdr.bottom : null, bigGaps: gaps.slice(0, 3) }; })()`);
  await shot("rvj-1440-04-social");
  const s4 = res.detail.social;
  put("04", s4?.stateUnderHeader === false && (s4?.bigGaps?.length ?? 0) === 0 ? "NOT_REPRODUCED" : "CONFIRMED",
    { stateLine: s4?.stateLine, stateUnderHeader: s4?.stateUnderHeader, bigGaps: s4?.bigGaps });

  // ---------- 05: the 3D heading under the header, and the pending cards ----------
  await go("/es", 3600);
  res.detail.threeD = await ev(`(async () => { for (let i = 0; i < 16; i++) { scrollTo({top: innerHeight*i, behavior: "instant"}); await new Promise(r => setTimeout(r, 480)); }
    const head = [...document.querySelectorAll("h2, h3")].find(h => /De tu plano|3D/i.test(h.innerText || ""));
    if (!head) return { found: false };
    head.scrollIntoView({ block: "start" }); await new Promise(r => setTimeout(r, 900));
    const r = head.getBoundingClientRect(); const hdr = document.querySelector("header").getBoundingClientRect();
    const block = head.closest("section, article, div");
    return { found: true, heading: head.innerText.trim().slice(0, 50), headingTop: Math.round(r.top), headerBottom: Math.round(hdr.bottom),
      hiddenByHeader: r.top < hdr.bottom, pendingMarks: (block.innerText.match(/Pendiente[^.·\\n]{0,40}/gi) || []).slice(0, 4),
      media: { img: block.querySelectorAll("img").length, video: block.querySelectorAll("video").length, canvas: block.querySelectorAll("canvas").length } }; })()`);
  await shot("rvj-1440-05-3d");
  const t3 = res.detail.threeD;
  put("05", t3?.hiddenByHeader === false && (t3?.media?.img ?? 0) + (t3?.media?.video ?? 0) + (t3?.media?.canvas ?? 0) > 0 ? "NOT_REPRODUCED" : "CONFIRMED",
    { hiddenByHeader: t3?.hiddenByHeader, headingTop: t3?.headingTop, headerBottom: t3?.headerBottom, pending: t3?.pendingMarks, media: t3?.media });

  // ---------- 07 / 10: the package cards, the sticker and the empty Enterprise ----------
  await go("/es/packages", 3400);
  res.detail.packages = await ev(`(() => {
    const cards = [...document.querySelectorAll("main h3")].filter(h => /Essential|Growth|Enterprise/.test(h.innerText || ""))
      .map(h => { const box = h.closest("article, li, div");
        const lines = [...box.querySelectorAll("li, dt, dd, p")].map(e => (e.innerText || "").trim()).filter(Boolean);
        return { name: (h.innerText || "").trim(), lines: lines.length,
          prep: lines.filter(l => /En preparaci[oó]n|todavía no contratable/i.test(l)).length,
          available: lines.filter(l => /Disponible/i.test(l)).length, sample: lines.slice(0, 6) }; });
    const sticker = [...document.querySelectorAll("main *")].find(e => /14 d[ií]as gratis/i.test((e.innerText || "").slice(0, 40)));
    let overlap = null;
    if (sticker) { const sr = sticker.getBoundingClientRect();
      const card = sticker.closest("article, li, div.card, div");
      const cr = card ? card.getBoundingClientRect() : null;
      overlap = cr ? { stickerTop: Math.round(sr.top), cardTop: Math.round(cr.top), crossesEdge: sr.top < cr.top - 1 || sr.left < cr.left - 1 } : null; }
    return { cards, sticker: overlap }; })()`);
  await shot("rvj-1440-07-packages");
  const pk = res.detail.packages;
  const ent = (pk?.cards ?? []).find((c) => /Enterprise/.test(c.name));
  put("07", (ent?.lines ?? 0) >= 4 && (ent?.available ?? 0) > 0 ? "NOT_REPRODUCED" : "CONFIRMED",
    { cards: (pk?.cards ?? []).map((c) => ({ name: c.name, lines: c.lines, prep: c.prep, available: c.available })) });
  put("10", pk?.sticker?.crossesEdge === false ? "NOT_REPRODUCED" : "CONFIRMED", { sticker: pk?.sticker, enterprise_lines: ent?.lines });

  // ---------- 08 / 11: the morning assistant wording, platform vs packages ----------
  const wording = {};
  for (const p of ["/es/platform", "/es/packages", "/es/platform/daily-assistant"]) { await go(p, 2800);
    const t = await txt();
    wording[p] = { morning: (t.match(/[^.·]{0,50}(asistente de la mañana|lista de la mañana)[^.]{0,80}/gi) || []).slice(0, 3),
      disappear: (t.match(/[^.]{0,60}(desaparece|Desaparece)[^.]{0,60}/g) || []).slice(0, 2),
      langPick: (t.match(/[^.]{0,40}(en ingl[eé]s, elegido|elegido en la aplicaci[oó]n)[^.]{0,40}/gi) || []).slice(0, 2) }; }
  res.detail.wording = wording;
  put("08", (wording["/es/platform"]?.morning ?? []).some((l) => /En preparaci/i.test(l)) && (wording["/es/packages"]?.morning ?? []).some((l) => /Disponible/i.test(l)) ? "CONFIRMED" : "NOT_REPRODUCED",
    { platform: wording["/es/platform"]?.morning, packages: wording["/es/packages"]?.morning });
  put("11", (wording["/es/platform/daily-assistant"]?.disappear ?? []).length > 0 || (wording["/es/platform/daily-assistant"]?.langPick ?? []).length > 0 ? "CONFIRMED" : "NOT_REPRODUCED",
    { disappear: wording["/es/platform/daily-assistant"]?.disappear, language_pick: wording["/es/platform/daily-assistant"]?.langPick });

  // ---------- 09: the product page ----------
  await go("/es/platform/ai-sales-agent", 3200);
  res.detail.agentPage = await ev(`(() => { const t = (document.body.innerText || "").replace(/\\s+/g, " ");
    const h1 = document.querySelector("h1"); const fs = h1 ? parseFloat(getComputedStyle(h1).fontSize) : null;
    const qh = [...document.querySelectorAll("h2, h3")].find(h => /Qu[eé] hace/i.test(h.innerText || ""));
    const items = qh ? [...(qh.closest("section, div")?.querySelectorAll("li") || [])].length : null;
    return { h1: (h1?.innerText || "").trim().slice(0, 60), h1FontPx: fs ? Math.round(fs) : null, queHaceItems: items,
      gmail: /Gmail/.test(t), outlook: /Outlook/.test(t) }; })()`);
  await shot("rvj-1440-09-agent");
  const ag = res.detail.agentPage;
  put("09", (ag?.queHaceItems ?? 0) > 3 ? "NOT_REPRODUCED" : "CONFIRMED", ag);

  // ---------- 13: the name sticker over the notice ----------
  await go("/es", 3600);
  res.detail.matching = await ev(`(async () => { for (let i = 0; i < 14; i++) { scrollTo({top: innerHeight*i, behavior: "instant"}); await new Promise(r => setTimeout(r, 480)); }
    const note = [...document.querySelectorAll("main *")].find(e => /publicable/i.test((e.innerText || "").slice(0, 120)));
    const name = [...document.querySelectorAll("main *")].find(e => /^Laura Serrano/.test((e.innerText || "").trim()));
    if (!note || !name) return { found: false, note: !!note, name: !!name };
    note.scrollIntoView({ block: "center" }); await new Promise(r => setTimeout(r, 700));
    const nr = name.getBoundingClientRect(), or = note.getBoundingClientRect();
    const ox = Math.min(nr.right, or.right) - Math.max(nr.left, or.left);
    const oy = Math.min(nr.bottom, or.bottom) - Math.max(nr.top, or.top);
    const cx = Math.max(nr.left, or.left) + ox / 2, cy = Math.max(nr.top, or.top) + oy / 2;
    const top = ox > 2 && oy > 2 ? document.elementFromPoint(cx, cy) : null;
    return { found: true, overlapX: Math.round(ox), overlapY: Math.round(oy),
      overlapping: ox > 2 && oy > 2, hit: top ? (top.innerText || "").trim().slice(0, 30) : null }; })()`);
  await shot("rvj-1440-13-matching");
  put("13", res.detail.matching?.overlapping === true ? "CONFIRMED" : "NOT_REPRODUCED", res.detail.matching);

  // ---------- 02: the reference state of the Daily card (checked only against 03/11) ----------
  put("02", "REFERENCE", { note: "owner marks it in order; used only as the before-state for 03 and 11", before: res.detail.daily?.before });
  ws.close();
} catch (e) { res.error = String(e?.message ?? e); console.error("ERROR", res.error); }
finally {
  res.finished_utc = new Date().toISOString();
  writeFileSync(OUT, JSON.stringify(res, null, 1));
  console.log(JSON.stringify(Object.fromEntries(Object.entries(res.images).map(([k, v]) => [k, v.verdict]))));
  for (const k of kids) k.kill();
  process.exit(0);
}
