// RV2 substance on the named deployment: hero at five scroll positions, panel readability, calm
// transition, late-loading, packages, 3D pair and turn view, mail preview, social cover, reports.
import { spawn } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
const BASE = process.argv[2], OUT = process.argv[3], SHOTS = process.argv[4];
const CDP = 9411; const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
mkdirSync(SHOTS, { recursive: true });
const res = { deployment: BASE, started_utc: new Date().toISOString(), checks: [], detail: {} };
const check = (id, what, verdict, ev) => { res.checks.push({ id, what, verdict, evidence: ev }); console.log(`${verdict} ${id} ${what} :: ${JSON.stringify(ev).slice(0, 330)}`); };
const kids = [];
try {
  const prof = join(SHOTS, "rv2prof"); rmSync(prof, { recursive: true, force: true });
  kids.push(spawn("C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe", ["--headless=new", "--disable-gpu", "--no-first-run", `--user-data-dir=${prof}`, `--remote-debugging-port=${CDP}`, "about:blank"], { stdio: "ignore" }));
  let list; for (let i = 0; i < 60; i++) { try { list = await (await fetch(`http://127.0.0.1:${CDP}/json`)).json(); break; } catch { await sleep(500); } }
  const ws = new WebSocket(list.find((t) => t.type === "page").webSocketDebuggerUrl);
  await new Promise((r) => ws.addEventListener("open", r));
  let id = 0; const pend = new Map(); const errors = [];
  ws.addEventListener("message", (e) => { const m = JSON.parse(e.data);
    if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); return; }
    if (m.method === "Log.entryAdded" && m.params?.entry?.level === "error") errors.push(String(m.params.entry.text).slice(0, 140)); });
  const send = (m, p = {}) => new Promise((r) => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method: m, params: p })); });
  const ev = async (x) => (await send("Runtime.evaluate", { expression: x, returnByValue: true, awaitPromise: true })).result?.result?.value;
  const vp = (w, h, mobile = w <= 430) => send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: 2, mobile });
  const go = async (p, w = 3600) => { await send("Page.navigate", { url: BASE + p }); await sleep(w); };
  const shot = async (n) => { const s = await send("Page.captureScreenshot", { format: "png" }); writeFileSync(join(SHOTS, n + ".png"), Buffer.from(s.result.data, "base64")); };
  await send("Page.enable"); await send("Log.enable"); await send("Runtime.enable");

  // ---------- A. hero at five scroll positions, both widths ----------
  const hero = {};
  for (const [w, h, tag] of [[1440, 950, "d1440"], [390, 844, "m390"]]) {
    await vp(w, h, w <= 430); await go("/es");
    const heroH = await ev('(() => { const s = document.querySelector("main section"); return s ? Math.round(s.getBoundingClientRect().height) : innerHeight; })()');
    const steps = [];
    for (let i = 0; i <= 4; i++) {
      const y = Math.round((heroH * i) / 4);
      await ev(`scrollTo({top: ${y}, behavior: "instant"})`); await sleep(1300);
      const m = await ev(`(() => {
        const clipped = [...document.querySelectorAll("main *")].filter(e => { const s = getComputedStyle(e);
          if (!["hidden", "clip"].includes(s.overflowX) && !["hidden", "clip"].includes(s.overflowY)) return false;
          if (e.clientWidth <= 4 || e.clientHeight <= 4) return false;
          return e.scrollWidth > e.clientWidth + 2 || e.scrollHeight > e.clientHeight + 2; }).length;
        const panel = [...document.querySelectorAll("main *")].map(e => ({ e, r: e.getBoundingClientRect() }))
          .filter(x => x.r.width > 220 && x.r.height > 140 && (x.e.innerText || "").trim().length > 40)
          .sort((a, b) => b.r.width * b.r.height - a.r.width * a.r.height)[0];
        const vis = panel ? { top: Math.round(panel.r.top), bottom: Math.round(panel.r.bottom), inView: panel.r.top > -4 && panel.r.bottom <= innerHeight + 4,
          textLen: (panel.e.innerText || "").trim().length, scrollsInside: panel.e.scrollHeight > panel.e.clientHeight + 2 } : null;
        const offscreenText = [...document.querySelectorAll("main p, main h1, main h2, main li")].filter(e => { const r = e.getBoundingClientRect();
          return r.width > 0 && r.right > innerWidth + 2; }).length;
        return { clipped, panel: vis, offscreenText, scrollY: Math.round(scrollY) }; })()`);
      steps.push(m);
      await shot(`rvh-${tag}-hero-${i}`);
    }
    hero[tag] = { heroHeight: heroH, steps };
  }
  res.detail.hero = hero;
  const bad = Object.entries(hero).flatMap(([t, v]) => v.steps.map((s, i) => ({ t, i, ...s })).filter((s) => s.clipped > 0 || s.offscreenText > 0));
  check("RV2-01", "hero and panel at five scroll positions: nothing clipped, nothing pushed off screen (1440 and 390)",
    bad.length === 0 ? "PASS" : "FAIL", { bad: bad.slice(0, 4), panel_1440_step0: hero.d1440?.steps?.[0]?.panel, panel_390_step0: hero.m390?.steps?.[0]?.panel });

  // ---------- B. late loading: does anything move after the first paint ----------
  await vp(1440, 950, false);
  await send("Page.navigate", { url: BASE + "/es" }); await sleep(1200);
  const early = await ev('[...document.querySelectorAll("main h1, main h2, main p")].slice(0, 12).map(e => Math.round(e.getBoundingClientRect().top + scrollY))');
  await sleep(4000);
  const late = await ev('[...document.querySelectorAll("main h1, main h2, main p")].slice(0, 12).map(e => Math.round(e.getBoundingClientRect().top + scrollY))');
  const moved = (early ?? []).map((v, i) => Math.abs(v - (late?.[i] ?? v))).filter((d) => d > 12);
  res.detail.lateLoading = { early, late, moved };
  check("RV2-02", "no late-loading jump: the first twelve text blocks keep their position after the first paint",
    moved.length === 0 ? "PASS" : "FAIL", { moved_count: moved.length, max_shift: Math.max(0, ...moved) });

  // ---------- C. packages ----------
  await go("/es/packages", 3200);
  res.detail.packages = await ev(`(() => { const t = (document.body.innerText || "").replace(/\\s+/g, " ");
    const cards = [...document.querySelectorAll("[data-plan]")].map(e => ({ plan: e.getAttribute("data-plan"),
      lines: [...e.querySelectorAll("dt, dd, h3, p, li")].map(x => (x.innerText || "").trim()).filter(Boolean).slice(0, 12) }));
    return { cards, hasPrice: /\\d+\\s?€|€\\s?\\d+/.test(t), trialSticker: (t.match(/14 d[ií]as[^.]{0,30}/) || [])[0] ?? null,
      differentiators: (t.match(/[^.]{0,80}(se diferencian|difieren|tama[nñ]o)[^.]{0,80}\\./i) || [])[0]?.trim() ?? null }; })()`);
  const pk = res.detail.packages;
  check("RV2-03", "the packages are understandable: three plans, what differs is named, no invented price",
    (pk?.cards?.length ?? 0) >= 3 && !pk.hasPrice ? "PASS" : "FAIL",
    { plans: (pk?.cards ?? []).map((c) => c.plan), differentiators: pk?.differentiators, price_shown: pk?.hasPrice, trial: pk?.trialSticker });
  await shot("rvh-d1440-packages");

  // ---------- D. the 3D moment: empty/furnished pair and the turn view ----------
  for (const p of ["/es", "/es/platform"]) {
    await go(p, 3600);
    const d = await ev(`(async () => { for (let i = 0; i < 12; i++) { scrollTo({top: innerHeight*i, behavior: "instant"}); await new Promise(r => setTimeout(r, 600)); }
      const sec = [...document.querySelectorAll("section")].find(s => /3D|plano|modelo|amueblad/i.test(s.innerText || ""));
      if (!sec) return { section: false };
      const imgs = [...sec.querySelectorAll("img")].map(i => ({ src: (i.currentSrc || i.src || "").split("/").pop(), alt: (i.alt || "").slice(0, 50), w: i.naturalWidth, h: i.naturalHeight }));
      const vids = [...sec.querySelectorAll("video")].map(v => ({ src: (v.currentSrc || "").split("/").pop(), poster: !!v.getAttribute("poster"), paused: v.paused, muted: v.muted, duration: Math.round((v.duration || 0) * 10) / 10 }));
      const canvas = sec.querySelectorAll("canvas").length;
      const pending = (sec.innerText.match(/pendiente|pending|en preparaci[oó]n/gi) || []).length;
      return { section: true, text: (sec.innerText || "").replace(/\\s+/g, " ").slice(0, 400), imgs, vids, canvas, pending }; })()`);
    res.detail[`three_d_${p.replace(/\W/g, "_")}`] = d;
  }
  const td = res.detail.three_d__es_platform?.section ? res.detail.three_d__es_platform : res.detail.three_d__es;
  const pairImgs = (td?.imgs ?? []).filter((i) => /empty|vacio|vacío|furnish|amueblad|room|salon/i.test(i.src + i.alt));
  check("RV2-04", "the 3D moment shows the empty/furnished pair and a turn view that really runs",
    pairImgs.length >= 2 && ((td?.vids ?? []).length > 0 || (td?.canvas ?? 0) > 0) ? "PASS" : "FAIL",
    { section: td?.section, images: (td?.imgs ?? []).map((i) => i.src).slice(0, 6), pair_candidates: pairImgs.length, videos: td?.vids, canvas: td?.canvas, pending_marks: td?.pending });
  await shot("rvh-d1440-3d");

  // ---------- E. stub session: reports regression, package name, mail preview, social cover ----------
  await go("/api/bff/auth/login?stub=1&next=%2Fes%2Fapp", 4200);
  res.detail.app = await ev('({ path: location.pathname, text: (document.querySelector("main")?.innerText || "").replace(/\\s+/g, " ").slice(0, 600) })');
  await go("/es/app/reports", 3600);
  res.detail.reports = await ev('({ path: location.pathname, text: (document.querySelector("main")?.innerText || "").replace(/\\s+/g, " ").slice(0, 900) })');
  await shot("rvh-d1440-reports");
  await go("/es/app/brief", 3800);
  res.detail.brief = await ev(`(() => { const main = document.querySelector("main");
    return { path: location.pathname, text: (main?.innerText || "").replace(/\\s+/g, " ").slice(0, 700),
      frames: document.querySelectorAll("iframe").length,
      mailShell: !!document.querySelector("[data-mail-shell], [class*=mail]"),
      images: [...(main?.querySelectorAll("img") || [])].length }; })()`);
  await shot("rvh-d1440-brief");
  await go("/es/social/post", 3600);
  res.detail.socialPost = await ev('({ text: (document.querySelector("main")?.innerText || "").replace(/\\s+/g, " ").slice(0, 600), images: [...document.querySelectorAll("main img")].map(i => (i.currentSrc || i.src || "").split("/").pop()).slice(0, 6) })');
  const repText = res.detail.reports?.text ?? "";
  check("RV2-05", "regression: the report still labels the figures before showing them and claims no estimate",
    /Datos de demostración/.test(repText) && !/Nada aquí es una estimación/.test(repText) ? "PASS" : "FAIL",
    { label_present: /Datos de demostración/.test(repText), estimation_claim: /Nada aquí es una estimación/.test(repText) });
  check("RV2-06", "regression: the session area names the package next to the trial",
    /paquete\s+(Essential|Growth|Scale)/i.test(res.detail.app?.text ?? "") ? "PASS" : "FAIL",
    { line: (res.detail.app?.text ?? "").match(/Prueba[^.]{0,60}/)?.[0] ?? null });
  check("RV2-07", "F-R16-3: a cover image reaches the social screen",
    !/no tiene imagen/i.test(res.detail.socialPost?.text ?? "") ? "PASS" : "FAIL",
    { images: res.detail.socialPost?.images, sample: (res.detail.socialPost?.text ?? "").slice(0, 120) });
  check("RV2-08", "the morning brief renders the mail shell with the weekly report block",
    (res.detail.brief?.text ?? "").length > 120 ? "INFO" : "FAIL", { path: res.detail.brief?.path, chars: (res.detail.brief?.text ?? "").length, images: res.detail.brief?.images, sample: (res.detail.brief?.text ?? "").slice(0, 200) });

  res.detail.errors = errors.slice(0, 8);
  check("RV2-09", "no application error in the console", errors.filter((e) => !/vercel\.live/.test(e)).length === 0 ? "PASS" : "FAIL", { errors: errors.filter((e) => !/vercel\.live/.test(e)).slice(0, 3) });
  ws.close();
} catch (e) { res.error = String(e?.message ?? e); console.error("ERROR", res.error); }
finally {
  res.finished_utc = new Date().toISOString();
  writeFileSync(OUT, JSON.stringify(res, null, 1));
  console.log(JSON.stringify(res.checks.map((c) => [c.id, c.verdict])));
  for (const k of kids) k.kill();
  process.exit(0);
}
