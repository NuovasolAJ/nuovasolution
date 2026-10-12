// R16 walk on the delivered deployment: stub session -> /app -> reports -> social -> logout,
// plus the general checks per viewport and language. Read-only; the stub writes nothing to a backend.
import { spawn } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
const BASE = process.argv[2], OUT = process.argv[3], SHOTS = process.argv[4];
const CDP = 9401; const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
mkdirSync(SHOTS, { recursive: true });
const res = { deployment: BASE, started_utc: new Date().toISOString(), checks: [], detail: {} };
const check = (id, what, verdict, ev) => { res.checks.push({ id, what, verdict, evidence: ev }); console.log(`${verdict} ${id} ${what} :: ${JSON.stringify(ev).slice(0, 330)}`); };
const kids = [];
try {
  const prof = join(SHOTS, "walkprof"); rmSync(prof, { recursive: true, force: true });
  kids.push(spawn("C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe", ["--headless=new", "--disable-gpu", "--no-first-run", `--user-data-dir=${prof}`, `--remote-debugging-port=${CDP}`, "about:blank"], { stdio: "ignore" }));
  let list; for (let i = 0; i < 60; i++) { try { list = await (await fetch(`http://127.0.0.1:${CDP}/json`)).json(); break; } catch { await sleep(500); } }
  const ws = new WebSocket(list.find((t) => t.type === "page").webSocketDebuggerUrl);
  await new Promise((r) => ws.addEventListener("open", r));
  let id = 0; const pend = new Map(); const consoleErrors = []; const failedRequests = [];
  ws.addEventListener("message", (e) => {
    const m = JSON.parse(e.data);
    if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); return; }
    if (m.method === "Runtime.consoleAPICalled" && m.params?.type === "error") consoleErrors.push((m.params.args || []).map((a) => a.value ?? a.description ?? "").join(" ").slice(0, 160));
    if (m.method === "Log.entryAdded" && m.params?.entry?.level === "error") consoleErrors.push(String(m.params.entry.text).slice(0, 160));
    if (m.method === "Network.loadingFailed") failedRequests.push({ type: m.params?.type, error: m.params?.errorText });
  });
  const send = (m, p = {}) => new Promise((r) => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method: m, params: p })); });
  const ev = async (x) => (await send("Runtime.evaluate", { expression: x, returnByValue: true, awaitPromise: true })).result?.result?.value;
  const vp = (w, h, mobile = w <= 430) => send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: 2, mobile });
  const go = async (p, w = 3200) => { await send("Page.navigate", { url: BASE + p }); await sleep(w); };
  const shot = async (n) => { const s = await send("Page.captureScreenshot", { format: "png" }); writeFileSync(join(SHOTS, n + ".png"), Buffer.from(s.result.data, "base64")); };
  const text = () => ev('(document.body.innerText || "").replace(/\\s+/g, " ").trim()');
  await send("Page.enable"); await send("Runtime.enable"); await send("Log.enable"); await send("Network.enable");

  // ---------- 1. gate before any session ----------
  await vp(1440, 950, false);
  await go("/es/app", 2500);
  const gated = await ev('({ path: location.pathname, search: location.search, h1: (document.querySelector("h1")||{}).innerText || null })');
  check("R16-01", "the login area is gated before a session exists", /login/.test(gated?.path ?? "") ? "PASS" : "FAIL", gated);

  // ---------- 2. stub session, session header, package, trial ----------
  await go("/api/bff/auth/login?stub=1&next=%2Fes%2Fapp", 4000);
  const app = await ev(`(() => { const t = (document.body.innerText || "").replace(/\\s+/g, " ");
    const header = document.querySelector("header")?.innerText.replace(/\\s+/g, " ").trim() || "";
    return { path: location.pathname, h1: (document.querySelector("h1")||{}).innerText || null,
      header: header.slice(0, 220),
      logout: /log out|cerrar sesión|salir/i.test(header + t),
      packageName: (t.match(/Essential|Growth|Scale/) || [])[0] ?? null,
      trialText: (t.match(/[^.]{0,70}(14 d[ií]as|14 days|prueba|trial)[^.]{0,70}\\./i) || [])[0]?.trim() ?? null,
      awaitingNumbers: (t.match(/\\b\\d+\\b/g) || []).slice(0, 8),
      body: t.slice(0, 400) }; })()`);
  res.detail.app = app;
  check("R16-02", "after the stub sign-in the area names the session, the package and the trial",
    app?.path?.includes("/app") && app.logout && app.packageName ? "PASS" : "FAIL",
    { path: app?.path, logout: app?.logout, package: app?.packageName, trial: app?.trialText, header: app?.header?.slice(0, 120) });
  await shot("rvf-1440-es-app");

  // ---------- 3. reports: gate passed, awaiting contract, no invented figure ----------
  await go("/es/app/reports", 3500);
  const rep = await ev(`(() => { const t = (document.body.innerText || "").replace(/\\s+/g, " ");
    const nums = (t.match(/\\b\\d{1,6}\\b/g) || []);
    return { path: location.pathname, h1: (document.querySelector("h1")||{}).innerText || null,
      awaiting: /awaiting|pendiente|esperando/i.test(t),
      awaitingSentence: (t.match(/[^.]{0,90}(awaiting|pendiente|esperando)[^.]{0,90}\\./i) || [])[0]?.trim() ?? null,
      numbers: nums.slice(0, 10), zeros: (t.match(/\\b0\\b/g) || []).length,
      body: t.slice(0, 500) }; })()`);
  res.detail.reports = rep;
  const repNums = (rep?.numbers ?? []).filter((n) => !/^20\d\d$/.test(n));
  check("R16-03", "the weekly report says the contract is awaited and shows no figure",
    rep?.path?.includes("reports") && rep.awaiting && repNums.length === 0 ? "PASS" : "FAIL",
    { path: rep?.path, awaiting: rep?.awaitingSentence, numbers_left: repNums });
  await shot("rvf-1440-es-app-reports");

  // ---------- 4. social screens: draft, approve, cover, reason ----------
  const social = {};
  for (const p of ["/es/social", "/es/social/post", "/es/social/inbox", "/es/social/settings"]) {
    await go(p, 3200);
    social[p] = await ev(`(() => { const t = (document.body.innerText || "").replace(/\\s+/g, " ");
      const buttons = [...document.querySelectorAll("button, a[href]")].filter(b => b.offsetParent).map(b => (b.innerText || "").trim().slice(0, 26)).filter(Boolean).slice(0, 12);
      return { path: location.pathname, h1: (document.querySelector("h1")||{}).innerText || null,
        draft: /draft|borrador/i.test(t), approve: /approve|aprobar|publicar/i.test(t),
        cover: /cover|portada|cover_url/i.test(t), reason: /reason|motivo|raz[oó]n/i.test(t),
        disabledButtons: [...document.querySelectorAll("button[disabled], button[aria-disabled=true]")].length,
        buttons, body: t.slice(0, 320) }; })()`);
  }
  res.detail.social = social;
  const sp = social["/es/social/post"] ?? {};
  check("R16-04", "the social screens offer draft and approval and name cover and reason",
    sp.draft && sp.approve ? "PASS" : "FAIL",
    { post: { draft: sp.draft, approve: sp.approve, cover: sp.cover, reason: sp.reason, buttons: (sp.buttons ?? []).slice(0, 6) },
      overview_h1: social["/es/social"]?.h1, inbox: social["/es/social/inbox"]?.h1, settings: social["/es/social/settings"]?.h1 });
  await shot("rvf-1440-es-social-post");

  // ---------- 5. onboarding without an external CRM ----------
  await go("/es/onboarding", 3800);
  const onb = await ev(`(async () => { const t0 = (document.body.innerText || "").replace(/\\s+/g, " ");
    const radios = [...document.querySelectorAll("input[type=radio]")].map(r => r.value);
    const own = [...document.querySelectorAll("input[type=radio]")].find(r => /nuovasolution|built|propio|sin/i.test(r.value));
    let saved = null;
    if (own) { own.click(); await new Promise(r => setTimeout(r, 400));
      const b = [...document.querySelectorAll("button")].find(x => /^(Guardar|Save)/i.test(x.innerText.trim()));
      if (b) { b.click(); await new Promise(r => setTimeout(r, 2000)); saved = (document.body.innerText.match(/Guardad[^\\n]{0,110}|Saved[^\\n]{0,110}/) || [])[0] ?? "no line"; } }
    const t = (document.body.innerText || "").replace(/\\s+/g, " ");
    return { path: location.pathname, radios, chosenOwn: !!own, saved,
      stubBand: /demostraci[oó]n|demonstration|preview|vista previa/i.test(t),
      steps: [...document.querySelectorAll("[data-step], ol li, section h2")].map(e => (e.innerText || "").trim().slice(0, 40)).slice(0, 8) }; })()`);
  res.detail.onboarding = onb;
  check("R16-05", "onboarding lets the agency stay on the built-in CRM and says honestly where the save landed",
    onb?.chosenOwn && /demostraci|demonstration|preview|vista previa/i.test(JSON.stringify(onb.stubBand)) !== false ? "PASS" : "FAIL",
    { radios: onb?.radios, saved: onb?.saved, labelled_as_preview: onb?.stubBand });
  await shot("rvf-1440-es-onboarding");

  // ---------- 6. real logout ----------
  await go("/es/app", 3000);
  const out = await ev(`(async () => { const b = [...document.querySelectorAll("button, a")].find(x => /log out|cerrar sesión|salir/i.test(x.innerText));
    if (!b) return { control: false };
    b.click(); await new Promise(r => setTimeout(r, 3000));
    return { control: true, path: location.pathname, search: location.search }; })()`);
  await go("/es/app", 2500);
  const after = await ev('({ path: location.pathname, search: location.search })');
  res.detail.logout = { click: out, afterSecondVisit: after };
  check("R16-06", "logging out ends the session: the area is gated again afterwards",
    out?.control && /login/.test(after?.path ?? "") ? "PASS" : "FAIL", { click: out, revisit: after });

  // ---------- 7. general: overflow, contrast, reduced motion, focus, media, errors ----------
  const CON = `(() => { const lum = (c) => { const m = c.match(/[0-9.]+/g); if (!m) return null; const [r, g, b] = m.slice(0, 3).map(Number);
      const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
    const bgOf = (el) => { let e = el; while (e) { const s = getComputedStyle(e); if (s.backgroundColor && s.backgroundColor.indexOf("rgba(0, 0, 0, 0)") === -1 && s.backgroundColor !== "transparent") return s.backgroundColor; e = e.parentElement; } return "rgb(255,255,255)"; };
    const out = [];
    for (const e of document.querySelectorAll("main *, header *, footer *")) {
      if (![...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())) continue;
      const r = e.getBoundingClientRect(); if (r.width < 8 || r.bottom < 0 || r.top > innerHeight) continue;
      let op = 1, p = e; while (p) { op *= Number(getComputedStyle(p).opacity || 1); p = p.parentElement; }
      if (op < 0.9) continue;
      const s = getComputedStyle(e); const l1 = lum(s.color), l2 = lum(bgOf(e)); if (l1 === null || l2 === null) continue;
      const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
      const size = parseFloat(s.fontSize) || 16, bold = Number(s.fontWeight) >= 700;
      const need = size >= 24 || (size >= 18.66 && bold) ? 3 : 4.5;
      if (ratio < need) out.push({ t: (e.innerText || "").trim().slice(0, 30), ratio: Math.round(ratio * 100) / 100, need, size: Math.round(size) });
    }
    const seen = new Set(); return out.filter(x => { const k = x.t + x.ratio; if (seen.has(k)) return false; seen.add(k); return true; }).slice(0, 6); })()`;
  const PUBLIC = ["/en", "/es", "/en/platform", "/es/platform", "/en/packages", "/es/packages", "/es/trial", "/es/contact"];
  const overflow = {}, contrast = {};
  for (const [w, h] of [[360, 800], [390, 844], [768, 1024], [1440, 950]]) {
    await vp(w, h);
    for (const p of PUBLIC) {
      await go(p, 2400);
      const steps = Math.min(8, Math.ceil(await ev("document.body.scrollHeight / innerHeight")));
      const c = [];
      for (let s = 0; s < steps; s++) { await ev(`scrollTo({top: innerHeight*${s}, behavior: "instant"})`); await sleep(900); const cc = await ev(CON); if (cc && cc.length) c.push(...cc); }
      const o = await ev('({ iw: innerWidth, sw: document.documentElement.scrollWidth })');
      if (o.sw > o.iw + 1) overflow[`${w}${p}`] = o;
      if (c.length) contrast[`${w}${p}`] = c.slice(0, 4);
    }
  }
  res.detail.overflow = overflow; res.detail.contrast = contrast;
  check("R16-07", "no horizontal overflow on the public routes, four viewports", Object.keys(overflow).length === 0 ? "PASS" : "FAIL", { affected: Object.keys(overflow) });
  check("R16-08", "no text below the contrast floor on the public routes", Object.keys(contrast).length === 0 ? "PASS" : "FAIL", { affected: Object.keys(contrast).slice(0, 6), sample: Object.values(contrast)[0]?.slice(0, 2) });

  await vp(1440, 950, false);
  await send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
  await go("/es", 3600);
  res.detail.motion = await ev(`(() => { const a = document.getAnimations ? document.getAnimations() : [];
    return { running: a.filter(x => x.playState === "running").length,
      videosPlaying: [...document.querySelectorAll("video")].filter(v => !v.paused).length,
      hiddenText: [...document.querySelectorAll("main *")].filter(e => { const s = getComputedStyle(e); return Number(s.opacity) < 0.1 && (e.innerText || "").trim().length > 10; }).length }; })()`);
  check("R16-09", "with reduced motion nothing animates and nothing stays hidden",
    res.detail.motion.running === 0 && res.detail.motion.videosPlaying === 0 && res.detail.motion.hiddenText === 0 ? "PASS" : "FAIL", res.detail.motion);
  await send("Emulation.setEmulatedMedia", { features: [] });

  await go("/es", 3200);
  res.detail.focus = await ev(`(() => { const f = [...document.querySelectorAll("a[href],button,select,input,textarea")].filter(e => !e.disabled && e.offsetParent);
    const noRing = []; for (const e of f.slice(0, 25)) { e.focus(); const s = getComputedStyle(document.activeElement);
      if (!((s.outlineStyle !== "none" && parseFloat(s.outlineWidth) > 0) || s.boxShadow !== "none")) noRing.push((e.innerText || e.getAttribute("aria-label") || e.tagName).trim().slice(0, 20)); }
    return { focusables: f.length, withoutRing: noRing }; })()`);
  check("R16-10", "the first 25 focusable elements show a focus ring", (res.detail.focus?.withoutRing ?? []).length === 0 ? "PASS" : "FAIL", res.detail.focus);

  res.detail.media = await ev(`(async () => { for (let i = 0; i < 10; i++) { scrollTo({top: innerHeight*i, behavior: "instant"}); await new Promise(r => setTimeout(r, 450)); }
    const imgs = [...document.querySelectorAll("img")];
    const broken = imgs.filter(i => i.complete && i.naturalWidth === 0).map(i => (i.currentSrc || i.src || "").split("/").pop());
    const vids = [...document.querySelectorAll("video")].map(v => ({ poster: !!v.getAttribute("poster"), autoplay: v.autoplay, muted: v.muted, controls: v.controls }));
    return { images: imgs.length, broken, videos: vids }; })()`);
  check("R16-11", "no broken image and no clip that plays with sound by itself",
    (res.detail.media?.broken ?? []).length === 0 && (res.detail.media?.videos ?? []).every((v) => !v.autoplay || v.muted) ? "PASS" : "FAIL", res.detail.media);

  res.detail.consoleErrors = consoleErrors.slice(0, 10); res.detail.failedRequests = failedRequests.slice(0, 10);
  check("R16-12", "the pages load without console errors or failed requests",
    consoleErrors.length === 0 && failedRequests.length === 0 ? "PASS" : "FAIL", { errors: consoleErrors.slice(0, 3), failed: failedRequests.slice(0, 3) });
  await shot("rvf-1440-es-home");
  await vp(390, 844); await go("/es", 3000); await shot("rvf-390-es-home");
  ws.close();
} catch (e) { res.error = String(e?.message ?? e); console.error("ERROR", res.error); }
finally {
  res.finished_utc = new Date().toISOString();
  writeFileSync(OUT, JSON.stringify(res, null, 1));
  console.log(JSON.stringify(res.checks.map((c) => [c.id, c.verdict])));
  for (const k of kids) k.kill();
  process.exit(0);
}
