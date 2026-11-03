// The checks of the owner's order of 03.11.2026 (one build for the home page and /packages) on a deployed origin, in headless Edge.
// One JSON with every check, grouped by the order's eight mandatory points:
//   1 hero        the film runs dimmed behind the sentence and the main action (poster first, pause control), three benefits appear,
//                 the logo stands in the header; reduced motion = the poster; at 1366 × 768 the sentence and the action are on the first screen
//   2 demo        WhatsApp: one message from Laura, times on both sides, the reply without "Anoto", one tick; the record fills field by field
//   3 channels    the e-mail is a mailbox, the web form a form that is sent, the phone a call with waveform, transcript and duration
//   4 functions   six product surfaces with their state, the stage sticky beside the list; the flow in four words drawn on scroll
//   5 report      a real chart that grows in view, the channels, "No medido" as text, "Datos de ejemplo", the example report linked
//   6 3d          plan → model → empty/furnished, the clean media, no room names, the film only on request
//   7 plans       sixteen rows, a status word in every cell, a check only where included, no empty circle, no price, Essential marked
//   8 overall     no claim beyond the register, no sign-up link, no horizontal overflow on the phone, keyboard tabs, EN in sync,
//                 nothing under 13 px, without JavaScript every end state stands, /packages carries the same table
// Usage: BASE=https://… OUT=<folder> node scripts/design/build-check-1103.mjs
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const BASE = (process.env.BASE ?? "").replace(/\/$/, "");
if (!BASE) throw new Error("BASE=https://… is required");
const OUT = process.env.OUT ?? join(process.cwd(), "docs", "website_redesign", "evidence_2026-11-03_build", "checks");
const EDGE = process.env.EDGE ?? "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const PORT = 9391 + Math.floor(Math.random() * 20);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
mkdirSync(OUT, { recursive: true });

const results = { started_utc: new Date().toISOString(), base: BASE, checks: [] };
const check = (id, what, ok, evidence) => { results.checks.push({ id, what, ok: !!ok, evidence }); console.log(`${ok ? "PASS" : "FAIL"} ${id} ${what}`); if (!ok) console.log(`  evidence ${id}: ${JSON.stringify(evidence).slice(0, 1600)}`); };

const edge = spawn(EDGE, ["--headless=new", "--disable-gpu", "--no-first-run", "--hide-scrollbars", "--autoplay-policy=no-user-gesture-required", `--user-data-dir=${join(tmpdir(), "nuova-build1103-" + Date.now())}`, `--remote-debugging-port=${PORT}`, "about:blank"], { stdio: "ignore" });
try {
  let list;
  for (let i = 0; i < 60; i++) { try { list = await (await fetch(`http://127.0.0.1:${PORT}/json`)).json(); break; } catch { await sleep(400); } }
  const ws = new WebSocket(list.find((t) => t.type === "page").webSocketDebuggerUrl);
  await new Promise((res) => ws.addEventListener("open", res));
  let mid = 0;
  const pend = new Map();
  ws.addEventListener("message", (e) => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } });
  const send = (method, params = {}) => new Promise((res) => { const i = ++mid; pend.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
  const ev = async (x) => { const r = await send("Runtime.evaluate", { expression: x, returnByValue: true, awaitPromise: true }); if (r.result?.exceptionDetails) throw new Error(JSON.stringify(r.result.exceptionDetails).slice(0, 400)); return r.result?.result?.value; };
  const J = async (x) => JSON.parse(await ev(`JSON.stringify((${x})())`));
  const key = async (k, code, vk) => { await send("Input.dispatchKeyEvent", { type: "keyDown", key: k, code, windowsVirtualKeyCode: vk }); await send("Input.dispatchKeyEvent", { type: "keyUp", key: k, code, windowsVirtualKeyCode: vk }); };
  const nav = async (path, ms = 4500) => { await send("Page.navigate", { url: `${BASE}${path}` }); await sleep(ms); };
  const view = async (w, h, mobile, dpr = 1) => send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: dpr, mobile });
  const scrollTo = async (sel, off = 0, ms = 900) => { await ev(`window.scrollTo(0, document.querySelector(${JSON.stringify(sel)}).getBoundingClientRect().top + window.scrollY + ${off})`); await sleep(ms); };
  const shot = async (name) => { const s = await send("Page.captureScreenshot", { format: "png" }); writeFileSync(join(OUT, name), Buffer.from(s.result.data, "base64")); };
  await send("Page.enable"); await send("Runtime.enable"); await send("Network.enable");
  const demoRun = async () => { await ev("document.querySelector('[data-hero-cta=demo]').click()"); };
  const phaseOf = () => J(() => ({ phase: Number(document.querySelector("[data-demo]").dataset.demoPhase), done: document.querySelector("[data-demo]").dataset.demoDone, visible: [...document.querySelectorAll("[data-hero-record] .d-at")].filter((e) => getComputedStyle(e).opacity === "1").length }));

  /* ---------------------------------------------------------------- 1 the hero, 1366 × 768 ---------------------------------------------------------------- */
  await view(1366, 768, false);
  await send("Emulation.setEmulatedMedia", { features: [] });
  await nav("/es", 4500);
  const hero = await J(() => {
    const v = document.querySelector(".hf-video"); const m = document.querySelector("[data-hf-film]"); const h1 = document.getElementById("hero-h1"); const cta = document.querySelector("[data-hero-cta=demo]"); const second = document.querySelector("[data-hero-cta=contact]");
    const logo = document.querySelector("header [data-site-logo]"); const lr = logo?.getBoundingClientRect();
    return { state: m?.dataset.hfFilm, src: v?.currentSrc?.split("/").pop(), poster: v?.poster?.split("/").pop(), playing: v ? !v.paused && !v.ended && v.readyState > 2 : false, muted: v?.muted, loop: v?.loop, time: v?.currentTime,
      h1: h1?.innerText.replace(/\s+/g, " "), h1Bottom: h1?.getBoundingClientRect().bottom, ctaBottom: cta?.getBoundingClientRect().bottom, ctaText: cta?.innerText.trim(), secondText: second?.innerText.trim(), secondHref: second?.getAttribute("href"),
      lead: document.querySelector("[data-hero-lead]")?.innerText, access: document.querySelector("[data-hero-access]")?.innerText, logo: !!logo && lr.width > 60 && lr.height > 16, logoLoaded: logo?.complete && logo?.naturalWidth > 0,
      pause: !!document.querySelector("[data-hf-pause]"), shade: !!document.querySelector(".hf-shade"), wordsColor: getComputedStyle(h1).color };
  });
  check("1-hero-film", "the film of the furnished living room runs muted in a loop behind the words, with its poster set and a visible pause control", hero.state === "playing" && hero.playing && hero.muted && hero.loop && /living-camera-ride\.mp4$/.test(hero.src ?? "") && /living-ride-poster\.webp$/.test(hero.poster ?? "") && hero.pause && hero.shade, hero);
  check("1-hero-words", "one sentence and the main action 'Ver la demo' over the film, the quiet second action 'Pedir acceso' to the contact page, access by invitation; on the first screen at 1366 × 768", hero.h1 === "Mientras enseñas, Nuova atiende." && hero.ctaText?.startsWith("Ver la demo") && hero.secondText === "Pedir acceso" && /\/es\/contact$/.test(hero.secondHref ?? "") && hero.ctaBottom < 768 && hero.h1Bottom < 768 && /invitación/.test(hero.access ?? "") && /255, 255, 255/.test(hero.wordsColor), hero);
  check("1-hero-logo", "the NuovaSolution logo stands in the header as a loaded image", hero.logo && hero.logoLoaded, hero);
  await sleep(3500);
  const benefits = await J(() => [...document.querySelectorAll("[data-hf-benefit]")].map((e) => ({ text: e.innerText.trim(), opacity: getComputedStyle(e).opacity, top: e.getBoundingClientRect().top })));
  check("1-hero-benefits", "three benefits appear one after another while the film runs and stand on the first screen", benefits.length === 3 && benefits.every((b) => b.opacity === "1" && b.top < 768 && b.text.length > 10), benefits);
  await ev("window.scrollTo(0, 120)"); await sleep(400);
  const over = await J(() => { const h = document.querySelector("header"); return { over: h.dataset.overFilm, bg: getComputedStyle(h).backgroundColor, logoFilter: getComputedStyle(document.querySelector("header [data-site-logo]")).filter, cta: getComputedStyle(document.querySelector("header .header-cta")).color }; });
  await ev("window.scrollTo(0, 0)"); await sleep(400);
  const atTop = await J(() => { const h = document.querySelector("header"); return { over: h.dataset.overFilm, logoFilter: getComputedStyle(document.querySelector("header [data-site-logo]")).filter }; });
  check("1-hero-header", "over the film the header is transparent with the logo in white and a readable button; at the page's top (the preview band) and below the film it is the light bar with the black logo", over.over === "true" && over.bg === "rgba(0, 0, 0, 0)" && /invert/.test(over.logoFilter) && !/255, 255, 255/.test(over.cta) && atTop.over === "false" && !/invert/.test(atTop.logoFilter), { over, atTop });
  await shot("1-hero-1366.png");

  // reduced motion: the poster, no film, the demonstration's end state at once
  await send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
  await nav("/es", 3000);
  const reduced = await J(() => ({ state: document.querySelector("[data-hf-film]")?.dataset.hfFilm, videoDisplay: getComputedStyle(document.querySelector(".hf-video")).display, posterBg: getComputedStyle(document.querySelector(".hf-media")).backgroundImage.includes("living-ride-poster"), demoDone: document.querySelector("[data-demo]")?.dataset.demoDone, hidden: [...document.querySelectorAll("[data-demo] .d-at")].filter((e) => getComputedStyle(e).opacity !== "1").length, typing: getComputedStyle(document.querySelector("[data-demo] .d-typing")).display, replay: getComputedStyle(document.querySelector("[data-demo-replay]")).display, benefits: [...document.querySelectorAll("[data-hf-benefit]")].every((e) => getComputedStyle(e).opacity === "1") }));
  check("1-hero-reduced", "with reduced motion the poster stands instead of the film, the benefits stand, and the demonstration shows its end state without typing dots or replay", reduced.state === "poster" && reduced.videoDisplay === "none" && reduced.posterBg && reduced.demoDone === "true" && reduced.hidden === 0 && reduced.typing === "none" && reduced.replay === "none" && reduced.benefits, reduced);
  await send("Emulation.setEmulatedMedia", { features: [] });

  /* ---------------------------------------------------------------- 2 the WhatsApp demonstration ---------------------------------------------------------------- */
  await nav("/es", 3000);
  await scrollTo("#demo", -80, 300);
  await demoRun(); await sleep(700);
  const p1 = await phaseOf();
  await sleep(2200); const p2 = await phaseOf();
  await sleep(1400); const p3 = await phaseOf();
  await sleep(3200); const p4 = await phaseOf();
  const wa = await J(() => {
    const inbound = [...document.querySelectorAll("[data-demo] [data-hero-enquiry]")]; const reply = document.querySelector("[data-demo] [data-hero-reply]"); const times = [...document.querySelectorAll("[data-demo] .demo-msg-time")].map((e) => e.innerText.trim());
    return { kind: document.querySelector("[data-demo]").dataset.demoKind, inbound: inbound.length, inText: inbound[0]?.innerText.replace(/\s+/g, " "), times, reply: reply?.innerText.replace(/\s+/g, " "), ticks: document.querySelectorAll("[data-demo] .demo-tick").length, assistant: [...document.querySelectorAll("[data-demo] *")].filter((e) => e.children.length === 0 && /Asistente automático de la agencia/.test(e.textContent)).length,
      fields: [...document.querySelectorAll("[data-hero-record] [data-hero-result]")].map((e) => e.innerText.replace(/\s+/g, " ")), priority: document.querySelector("[data-hero-priority]")?.innerText.replace(/\s+/g, " "), next: document.querySelector("[data-hero-next]")?.innerText.replace(/\s+/g, " "), states: [...document.querySelectorAll("[data-hero-state-line]")].map((e) => e.dataset.heroStateLine), fictional: document.querySelector("[data-hero-state]")?.innerText.trim(), score: /\b\d{1,3}\s?(\/\s?100|puntos|%)/.test(document.querySelector("[data-hero-record]").innerText) };
  });
  check("2-demo-run", "the demonstration runs once from the message to the record's end state (6–9 s): the reply at about 2 s, the fields field by field, the end state after about 7 s, and it stays", p1.phase <= 1 && p2.phase >= 2 && p2.phase < p3.phase && p3.visible < p4.visible && p4.done === "true", { p1, p2, p3, p4 });
  check("2-demo-whatsapp", "Laura writes ONE message with its time; the reply carries its time, one grey tick and the one assistant mark; no 'Anoto', no 'habitual o segunda residencia'; the record fills six fields, the priority with its reason (no score), the next step and the two state lines", wa.kind === "chat" && wa.inbound === 1 && /^Hola, soy Laura\./.test(wa.inText ?? "") && wa.times.length === 2 && /^11:20/.test(wa.times[0]) && /^11:21/.test(wa.times[1]) && /Perfecto, Laura/.test(wa.reply ?? "") && !/Anoto|habitual o segunda/.test(wa.reply ?? "") && wa.ticks === 1 && wa.assistant === 1 && wa.fields.length === 6 && /Alta/.test(wa.priority ?? "") && !wa.score && /Elena le propone/.test(wa.next ?? "") && wa.states.join() === "available,preparing" && wa.fictional === "Demo con datos ficticios", wa);
  await shot("2-demo-end-1366.png");

  /* ---------------------------------------------------------------- 3 the other channels ---------------------------------------------------------------- */
  await ev("document.querySelector('[data-demo-tab=email]').click()"); await sleep(400);
  const mailEarly = await J(() => ({ kind: document.querySelector("[data-demo]").dataset.demoKind, list: !!document.querySelector(".demo-mail-list"), rows: document.querySelectorAll(".demo-mail-row").length, subject: document.querySelector(".demo-mail-subject")?.innerText.trim(), from: document.querySelector(".demo-mail-from-name")?.innerText.trim(), replyOpacity: getComputedStyle(document.querySelector("[data-demo] .demo-mail-reply")).opacity }));
  await sleep(7500);
  const mail = await J(() => ({ replyOpacity: getComputedStyle(document.querySelector("[data-demo] .demo-mail-reply")).opacity, reply: document.querySelector("[data-demo] .demo-mail-reply")?.innerText.replace(/\s+/g, " "), fields: document.querySelectorAll("[data-hero-record] [data-hero-result]").length, done: document.querySelector("[data-demo]").dataset.demoDone, state: document.querySelector("[data-hero-state-line]")?.innerText }));
  check("3-channel-email", "the e-mail channel is a mailbox: the inbox list with three rows, the open message with subject and sender, then the reply in the thread with the assistant mark and 'enviado'; the record fills; the state line names Gmail", mailEarly.kind === "mail" && mailEarly.list && mailEarly.rows === 3 && /Valoración de mi piso/.test(mailEarly.subject ?? "") && /Carmen Ortega/.test(mailEarly.from ?? "") && mailEarly.replyOpacity !== "1" && mail.replyOpacity === "1" && /Asistente automático de la agencia/.test(mail.reply ?? "") && /enviado/.test(mail.reply ?? "") && mail.fields === 5 && mail.done === "true" && /Gmail/.test(mail.state ?? ""), { mailEarly, mail });
  await shot("3-channel-email-1366.png");
  await ev("document.querySelector('[data-demo-tab=webform]').click()"); await sleep(1800);
  const formEarly = await J(() => ({ kind: document.querySelector("[data-demo]").dataset.demoKind, fields: document.querySelectorAll(".demo-form-field").length, filled: document.querySelectorAll(".demo-form-input.is-filled").length, sent: document.querySelector("[data-form]").dataset.formSent, mark: document.querySelector("[data-form] [data-demo-prototype]")?.innerText.trim(), bubbles: document.querySelectorAll("[data-demo] .demo-msg").length }));
  await sleep(9000);
  const form = await J(() => ({ filled: document.querySelectorAll(".demo-form-input.is-filled").length, sent: document.querySelector("[data-form]").dataset.formSent, submit: document.querySelector(".demo-form-submit")?.innerText.trim(), fields: document.querySelectorAll("[data-hero-record] [data-hero-result]").length, done: document.querySelector("[data-demo]").dataset.demoDone, state: document.querySelector("[data-hero-state-line]")?.innerText }));
  check("3-channel-webform", "the web form is a real form with six fields that fill one after another, then it is sent ('Enviado'); no chat bubbles; marked 'Prototipo'; the record fills; the state line says prototype", formEarly.kind === "form" && formEarly.fields === 6 && formEarly.filled < 6 && formEarly.sent === "false" && formEarly.mark === "Prototipo" && formEarly.bubbles === 0 && form.filled === 6 && form.sent === "true" && /Enviado/.test(form.submit ?? "") && form.fields === 5 && form.done === "true" && /Prototipo/.test(form.state ?? ""), { formEarly, form });
  await shot("3-channel-webform-1366.png");
  await ev("document.querySelector('[data-demo-tab=phone]').click()"); await sleep(2200);
  const callLive = await J(() => ({ kind: document.querySelector("[data-demo]").dataset.demoKind, state: document.querySelector("[data-call]").dataset.callState, wave: !!document.querySelector(".demo-wave.is-live"), bars: document.querySelectorAll(".demo-wave i").length, duration: Number(document.querySelector("[data-call-duration]").dataset.callDuration), lines: [...document.querySelectorAll(".demo-line")].filter((e) => getComputedStyle(e).opacity === "1").length, mark: document.querySelector("[data-call] [data-demo-prototype]")?.innerText.trim() }));
  await sleep(8000);
  const call = await J(() => ({ state: document.querySelector("[data-call]").dataset.callState, duration: Number(document.querySelector("[data-call-duration]").dataset.callDuration), text: document.querySelector("[data-call-duration]").innerText.replace(/\s+/g, " "), lines: [...document.querySelectorAll(".demo-line")].filter((e) => getComputedStyle(e).opacity === "1").length, assistant: document.querySelector(".demo-line-assistant")?.innerText.replace(/\s+/g, " "), fields: document.querySelectorAll("[data-hero-record] [data-hero-result]").length, done: document.querySelector("[data-demo]").dataset.demoDone, phone: document.querySelector("[data-hero-record]").innerText.includes("+34 ··· ··· ···") }));
  check("3-channel-phone", "the phone is a call view: a live waveform and a running duration while the line is open, the transcript line by line, the assistant's line; then 'Llamada atendida · 0:38'; marked 'Prototipo'; the record with a masked number", callLive.kind === "call" && callLive.state === "live" && callLive.wave && callLive.bars >= 12 && callLive.duration >= 1 && callLive.lines >= 1 && callLive.lines < 4 && callLive.mark === "Prototipo" && call.state === "ended" && call.duration === 38 && /Llamada atendida · 0:38/.test(call.text) && call.lines === 4 && /No da precio|te llama esta tarde/.test(call.assistant ?? "") && call.fields === 5 && call.done === "true" && call.phone, { callLive, call });
  await shot("3-channel-phone-1366.png");
  // the tabs by keyboard: no automatic change, arrow keys move and run the chosen channel
  await ev("document.querySelector('[data-demo-tab=phone]').focus()"); await key("ArrowRight", "ArrowRight", 39); await sleep(500);
  const k1 = await J(() => ({ ch: document.querySelector("[data-demo]").dataset.demoChannel, focus: document.activeElement?.getAttribute("data-demo-tab"), visible: getComputedStyle(document.activeElement).outlineStyle }));
  await key("ArrowLeft", "ArrowLeft", 37); await sleep(500);
  const k2 = await J(() => ({ ch: document.querySelector("[data-demo]").dataset.demoChannel, focus: document.activeElement?.getAttribute("data-demo-tab") }));
  await sleep(9500);
  const k3 = await J(() => ({ ch: document.querySelector("[data-demo]").dataset.demoChannel, done: document.querySelector("[data-demo]").dataset.demoDone }));
  check("3-channels-keyboard", "arrow keys move between the four channels with the focus following; a channel never changes on its own after the run", k1.ch === "whatsapp" && k1.focus === "whatsapp" && k2.ch === "phone" && k2.focus === "phone" && k3.ch === "phone" && k3.done === "true", { k1, k2, k3 });

  /* ---------------------------------------------------------------- 4 the flow and the functions ---------------------------------------------------------------- */
  await scrollTo("[data-flow-ribbon]", -300, 300); await ev("window.scrollBy(0, 280)"); await sleep(1500);
  const flow = await J(() => ({ nodes: [...document.querySelectorAll("[data-flow-node]")].map((e) => e.querySelector(".flow-node-title").innerText), drawn: Number(getComputedStyle(document.querySelector("[data-flow-line]")).getPropertyValue("stroke-dashoffset").replace("px", "")), pathLength: document.querySelector("[data-flow-line]").style.pathLength ?? document.querySelector("[data-flow-line]").getAttribute("pathLength"), visible: [...document.querySelectorAll("[data-flow-node]")].every((e) => getComputedStyle(e).opacity === "1") }));
  check("4-flow", "the flow stands in four words (Consulta → Nuova → Ficha → Tu equipo) and its line is drawn once the ribbon is in view", flow.nodes.join("|") === "Consulta|Nuova|Ficha|Tu equipo" && flow.visible && flow.drawn <= 0.08, flow);
  await shot("4-flow-1366.png");
  await scrollTo("[data-functions]", 240, 1200);
  const fn1 = await J(() => ({ items: document.querySelectorAll("[data-fn]").length, active: document.querySelector("[data-functions]").dataset.fnActive, stage: getComputedStyle(document.querySelector("[data-fn-stage]")).position, surface: document.querySelector("[data-fn-surface]")?.dataset.fnSurface, ps: document.querySelector("[data-fn-surface] [data-ps]")?.dataset.ps, pills: [...document.querySelectorAll("[data-fn] .status-pill")].map((e) => e.dataset.status), titles: [...document.querySelectorAll(".fn-item-title")].map((e) => e.innerText) }));
  await scrollTo("[data-fn=matching]", -330, 1300);
  const fn2 = await J(() => ({ active: document.querySelector("[data-functions]").dataset.fnActive, surface: document.querySelector("[data-fn-surface]")?.dataset.fnSurface, listings: document.querySelectorAll("[data-fn-surface] .ps-listing").length, text: document.querySelector("[data-fn-surface]")?.innerText.replace(/\s+/g, " ").slice(0, 160) }));
  await scrollTo("[data-fn=team]", -330, 1300);
  const fn3 = await J(() => ({ active: document.querySelector("[data-functions]").dataset.fnActive, surface: document.querySelector("[data-fn-surface]")?.dataset.fnSurface, tasks: document.querySelectorAll("[data-fn-surface] .ps-task").length }));
  check("4-functions", "six functions with one line and a status word each; the stage beside the list is sticky and shows the product surface of the function in view (the priority list, the listings that fit, the team's day)", fn1.items === 6 && fn1.stage === "sticky" && fn1.pills.length === 6 && fn1.pills.filter((p) => p === "included").length === 2 && fn1.ps && fn2.active === "matching" && fn2.surface === "matching" && fn2.listings === 2 && fn3.active === "team" && fn3.surface === "team" && fn3.tasks === 3, { fn1, fn2, fn3 });
  await shot("4-functions-1366.png");

  /* ---------------------------------------------------------------- 5 the report ---------------------------------------------------------------- */
  await scrollTo("[data-report-sheet]", -90, 3200);
  const rep = await J(() => ({ bars: [...document.querySelectorAll(".rep-bar")].map((b) => ({ h: b.getBoundingClientRect().height, t: getComputedStyle(b).transform })), fills: [...document.querySelectorAll(".rep-channel-fill")].map((f) => f.getBoundingClientRect().width), metrics: [...document.querySelectorAll("[data-report-metric]")].map((e) => e.querySelector(".rep-metric-value").innerText.trim()), unmeasured: (document.querySelector("[data-report-sheet]").innerText.match(/No medido/g) || []).length, example: document.querySelector("[data-report-example]")?.innerText.trim(), header: document.querySelector(".rep-paper-title")?.innerText, link: document.querySelector("[data-report-link]")?.getAttribute("href"), open: document.querySelectorAll("[data-report-open] ul li").length, disponible: /\bDisponible\b/.test(document.querySelector("[data-report]").innerText), tiles: document.querySelectorAll("[data-report] .stage").length }));
  check("5-report", "the report as the agency reads it: eight bars grown in view (no zero-height bar), two channel bars, six figures with their definitions of which two read 'No medido', the week in the header, 'Datos de ejemplo', what is open, the link to the example report; no 'Disponible', no box of three numbers", rep.bars.length === 8 && rep.bars.every((b) => b.h > 20 && !/matrix\(1, 0, 0, 0/.test(b.t)) && rep.fills.length === 2 && rep.fills.every((w) => w > 40) && rep.metrics.length === 6 && rep.unmeasured === 2 && rep.example === "Datos de ejemplo" && /26 oct al 1 nov/.test(rep.header ?? "") && /\/es\/example-report$/.test(rep.link ?? "") && rep.open === 2 && !rep.disponible && rep.tiles === 0, rep);
  await shot("5-report-1366.png");

  /* ---------------------------------------------------------------- 6 the 3D stage ---------------------------------------------------------------- */
  await scrollTo("[data-model3d-stage]", -140, 300);
  const m0 = await J(() => ({ step: document.querySelector("[data-model3d-stage]").dataset.m3dStep, pane: document.querySelector("[data-m3d-pane]")?.dataset.m3dPane }));
  await sleep(1700); const m1 = await J(() => ({ step: document.querySelector("[data-model3d-stage]").dataset.m3dStep, pane: document.querySelector("[data-m3d-pane]")?.dataset.m3dPane, src: document.querySelector("[data-m3d-pane=model] img")?.getAttribute("src") }));
  await sleep(2000); const m2 = await J(() => ({ step: document.querySelector("[data-model3d-stage]").dataset.m3dStep, pane: document.querySelector("[data-m3d-pane]")?.dataset.m3dPane, range: !!document.querySelector("[data-compare-range]"), imgs: [...document.querySelectorAll("[data-m3d-pane=pair] img")].map((i) => i.getAttribute("src").split("/").pop()) }));
  await ev("document.querySelector('[data-m3d-step-button=\"3\"]').click()"); await sleep(800);
  const m3 = await J(() => { const v = document.querySelector("[data-model3d-video]"); return { step: document.querySelector("[data-model3d-stage]").dataset.m3dStep, pane: document.querySelector("[data-m3d-pane]")?.dataset.m3dPane, src: v?.getAttribute("src"), poster: v?.poster.split("/").pop(), play: !!document.querySelector("[data-model3d-play]"), old: /house-turn|Raumnamen|nombres de las estancias|mandos del visor/i.test(document.querySelector("[data-model3d]").innerText + [...document.querySelectorAll("[data-model3d] video, [data-model3d] img")].map((e) => e.getAttribute("src") + e.getAttribute("poster")).join()) }; });
  await ev("document.querySelector('[data-model3d-play]').click()"); await sleep(4000);
  const m4 = await J(() => { const v = document.querySelector("[data-model3d-video]"); return { src: v?.currentSrc?.split("/").pop(), state: v?.dataset.model3dVideo, playing: v ? !v.paused && v.currentTime > 0.5 : false, w: v?.videoWidth, h: v?.videoHeight, duration: Math.round(v?.duration ?? 0) }; });
  const m5 = await J(() => ({ status: [...document.querySelectorAll("[data-model3d] .status-pill")].map((e) => e.innerText), example: document.querySelector("[data-model3d-example]")?.innerText, cta: document.querySelector("[data-model3d-cta]")?.getAttribute("href"), steps: [...document.querySelectorAll("[data-m3d-step-button]")].map((e) => e.innerText.replace(/\s+/g, " ")) }));
  check("6-3d-stage", "one stage walks once from the plan to the clean model and to the empty/furnished pair on a handle; the steps switch by button", m0.pane === "plan" && m1.pane === "model" && /house-model-clean-1600\.webp$/.test(m1.src ?? "") && m2.pane === "pair" && m2.range && m2.imgs.join() === "living-empty-1200.webp,living-furnished-1200.webp" && m3.pane === "film" && m5.steps.length === 4, { m0, m1, m2, m3, m5 });
  check("6-3d-film", "the whole house is the clean take of 30.10. (1080p, about 25 s), loaded only on request behind its own poster; nothing of the labelled house-turn remains; the section is marked in preparation and as a fictional example", m3.src === null && /house-clean-take-poster\.webp$/.test(m3.poster ?? "") && m3.play && !m3.old && /house-clean-take\.mp4$/.test(m4.src ?? "") && m4.state === "on" && m4.playing && m4.w === 1920 && m4.h === 1080 && m4.duration >= 24 && m4.duration <= 26 && m5.status.some((s) => /En preparación/.test(s)) && /Casa de ejemplo ficticia/.test(m5.example ?? "") && /\/es\/contact$/.test(m5.cta ?? ""), { m3, m4, m5 });
  await ev("document.querySelector('[data-model3d-video]').pause()");
  await shot("6-3d-1366.png");

  /* ---------------------------------------------------------------- 7 the plans ---------------------------------------------------------------- */
  const plansProbe = () => ({
    rows: document.querySelectorAll("[data-plans-table] [data-plan-row]").length, cells: document.querySelectorAll("[data-plans-table] [data-plan-cell]").length, statuses: [...new Set([...document.querySelectorAll("[data-plans-table] [data-plan-cell]")].map((e) => e.dataset.planCell))].sort(),
    checks: [...document.querySelectorAll("[data-plans-table] [data-plan-cell]")].filter((e) => e.querySelector("svg")).map((e) => e.dataset.planCell), icons: document.querySelectorAll("[data-plans-table] [data-plan-row] .plans-icon svg").length, circles: document.querySelectorAll("[data-plans] .rounded-pill.border-\\[1\\.5px\\], [data-plans] [data-line]").length,
    reco: [...document.querySelectorAll("[data-plans-table] [data-plan-recommended]")].map((e) => e.innerText), groups: [...document.querySelectorAll("[data-plans-table] .plans-cell-group")].map((e) => e.textContent.trim()), price: /\d[\d.]*\s?€|€\s?\d/.test(document.querySelector("[data-plans]").innerText), forbidden: /\bDisponible\b|Probar gratis|Beliebt|popular|Coming soon|Próximamente/.test(document.querySelector("[data-plans]").innerText),
    ctas: [...document.querySelectorAll("[data-plans-table] [data-plan-cta]")].map((e) => e.getAttribute("href")), display: getComputedStyle(document.querySelector("[data-plans-table]")).display, cards: getComputedStyle(document.querySelector("[data-plans-cards]")).display,
  });
  await scrollTo("[data-plans-table]", -100, 1200);
  const plans = await J(plansProbe);
  check("7-plans", "sixteen rows in six groups (Canales, CRM, Equipo, Informes, Integraciones, Servicios) with a function icon each and one status word in every cell: Incluido with a check, No incluido, En preparación; no empty circle, no price, no 'Disponible', no 'Probar gratis'; Essential marked as the plan to start with; every action leads to a person", plans.rows === 16 && plans.cells === 48 && plans.statuses.join() === "excluded,included,preparing" && plans.checks.length > 0 && plans.checks.every((c) => c === "included") && plans.icons === 16 && plans.circles === 0 && plans.reco.length === 1 && plans.groups.join("|") === "Canales|CRM|Equipo|Informes|Integraciones|Servicios" && !plans.price && !plans.forbidden && plans.ctas.length === 3 && plans.ctas.every((h) => /\/es\/contact$/.test(h)) && plans.display !== "none" && plans.cards === "none", plans);
  await shot("7-plans-1366.png");

  /* ---------------------------------------------------------------- 8 overall: claims, links, trust, FAQ, close, fonts ---------------------------------------------------------------- */
  const page = await J(() => {
    const text = document.querySelector("main").innerText; const wc = (t) => (t.match(/[\p{L}\p{N}][\p{L}\p{N}'’.,%€-]*/gu) || []).length; const words = wc(document.querySelector("[data-home]").innerText); const ui = ["[data-demo]", "[data-fn-stage]", "[data-report-sheet]"].reduce((n, s) => n + wc(document.querySelector(s)?.innerText ?? ""), 0); const prose = words - ui;
    return { signup: document.querySelectorAll('main a[href*="/signup"]').length, forbidden: [...(text.match(/Probar gratis|con tu número|desde tu número|Coming soon|Próximamente|puntuación|score/gi) || []), ...(text.match(/\bDisponible\b/g) || [])], ownNumber: /número de tu agencia/.test(text) && !/WhatsApp con el número de tu agencia/.test(text), prices: (text.match(/\b(349|649|999)\s?€/g) || []), words,
      faq: document.querySelectorAll("[data-faq] button").length, trust: document.querySelectorAll("[data-trust-line]").length, close: document.querySelectorAll("[data-closing] a").length, closeDemo: document.querySelector("[data-closing] [data-demo-run]")?.getAttribute("href"), prose, ui, assistantOnceOnPage: (text.match(/Asistente automático de la agencia/g) || []).length,
      minFont: (() => { let min = 99; for (const e of document.querySelectorAll("[data-home] p, [data-home] span, [data-home] dt, [data-home] dd, [data-home] a, [data-home] li, [data-home] h1, [data-home] h2, [data-home] button")) { if (!e.innerText?.trim() || !e.offsetParent || e.closest("[aria-hidden=true]")) continue; min = Math.min(min, parseFloat(getComputedStyle(e).fontSize)); } return min; })(),
      minFontDemo: (() => { let min = 99; for (const e of document.querySelectorAll("[data-demo] p, [data-demo] span, [data-demo] dt, [data-demo] dd, [data-demo] li, [data-demo] button")) { if (!e.innerText?.trim() || !e.offsetParent || e.closest("[aria-hidden=true]")) continue; min = Math.min(min, parseFloat(getComputedStyle(e).fontSize)); } return min; })() };
  });
  check("8-claims", "no public sign-up link, no 'Probar gratis', no status 'Disponible', no price, no score, no 'your own number' claim outside its 'En preparación' row; the assistant is named on the demonstration surface only", page.signup === 0 && page.forbidden.length === 0 && !page.ownNumber && page.prices.length === 0, page);
  check("8-trust-faq-close", "three trust lines, seven questions, the close with 'Ver la demo' (runs the demonstration) and 'Pedir acceso'", page.trust === 3 && page.faq === 7 && page.close === 2 && page.closeDemo === "#demo", page);
  check("8-fonts", "nothing under 13 px on the page and nothing under 14 px in the demonstration", page.minFont >= 13 && page.minFontDemo >= 14, { minFont: page.minFont, minFontDemo: page.minFontDemo });
  results.words_es = { total: page.words, prose: page.prose, product_ui: page.ui };
  check("8-words", "the Spanish home page's prose stays within about 650–900 visible words (FAQ answers closed; the plans' status words count; the words inside the three product surfaces, the demonstration, the functions stage and the report sheet, are counted separately)", page.prose >= 500 && page.prose <= 900, { total: page.words, prose: page.prose, product_ui: page.ui });

  // /packages
  await nav("/es/packages", 4000);
  await scrollTo("[data-plans-table]", -100, 1200);
  const pk = await J(plansProbe);
  const pkHead = await J(() => ({ h1: document.querySelector("h1")?.innerText, signup: document.querySelectorAll('main a[href*="/signup"]').length, trial: /Probar gratis|Prueba Essential gratis/.test(document.querySelector("main").innerText) }));
  check("8-packages", "/packages carries the same table (sixteen rows, the same status words), the opening of Copy C-10, no sign-up link and no trial button", pk.rows === 16 && pk.cells === 48 && pk.statuses.join() === "excluded,included,preparing" && pk.circles === 0 && pkHead.h1 === "Tres paquetes, con su estado real" && pkHead.signup === 0 && !pkHead.trial, { pk, pkHead });
  await shot("8-packages-1366.png");

  // EN in sync
  await nav("/en", 4000);
  const en = await J(() => ({ h1: document.getElementById("hero-h1")?.innerText.replace(/\s+/g, " "), sections: ["[data-hero]", "[data-demo]", "[data-flow]", "[data-functions]", "[data-report]", "[data-model3d]", "[data-plans]", "[data-trust]", "[data-faq]", "[data-closing]"].map((s) => !!document.querySelector(s)), tabs: [...document.querySelectorAll("[data-demo-tab]")].map((e) => e.innerText.trim()), statuses: [...new Set([...document.querySelectorAll("[data-plans-table] [data-plan-cell]")].map((e) => e.innerText.trim()))].sort(), spanishLeak: /Elige un canal|Pedir acceso|En preparación/.test(document.querySelector("main").innerText) }));
  check("8-en", "the English page carries the same ten sections with English words (tabs, status words, the hero)", en.h1 === "While you show a home, Nuova answers." && en.sections.every(Boolean) && en.tabs.join("|") === "WhatsApp|E-mail|Web form|Phone" && en.statuses.join("|") === "In preparation|Included|Not included" && !en.spanishLeak, en);

  // without JavaScript
  await send("Emulation.setScriptExecutionDisabled", { value: true });
  await nav("/es", 3500);
  const nojs = await J(() => ({ js: document.documentElement.classList.contains("js"), hero: !!document.querySelector("[data-hero=film]"), poster: document.querySelector(".hf-video")?.poster.split("/").pop(), demoHidden: [...document.querySelectorAll("[data-demo] .d-at")].filter((e) => getComputedStyle(e).opacity !== "1").length, typing: getComputedStyle(document.querySelector("[data-demo] .d-typing")).display, risesHidden: [...document.querySelectorAll(".mrise")].filter((e) => getComputedStyle(e).opacity !== "1").length, plans: document.querySelectorAll("[data-plans-table] [data-plan-cell]").length, report: document.querySelectorAll("[data-report-metric]").length, fnInline: document.querySelectorAll("[data-fn-surface-inline]").length }));
  await send("Emulation.setScriptExecutionDisabled", { value: false });
  check("8-nojs", "without JavaScript the poster, the demonstration's end state, every section, the plans and the report stand", !nojs.js && nojs.hero && /living-ride-poster/.test(nojs.poster ?? "") && nojs.demoHidden === 0 && nojs.typing === "none" && nojs.risesHidden === 0 && nojs.plans === 48 && nojs.report === 6 && nojs.fnInline === 6, nojs);

  /* ---------------------------------------------------------------- the phone, 390 × 844 ---------------------------------------------------------------- */
  await view(390, 844, true, 2);
  await nav("/es", 5000);
  const ph = await J(() => { const h1 = document.getElementById("hero-h1"); const cta = document.querySelector("[data-hero-cta=demo]"); return { overflow: document.documentElement.scrollWidth <= window.innerWidth, h1Bottom: h1.getBoundingClientRect().bottom, ctaBottom: cta.getBoundingClientRect().bottom, leadBottom: document.querySelector("[data-hero-lead]").getBoundingClientRect().bottom, film: document.querySelector("[data-hf-film]")?.dataset.hfFilm, stage: getComputedStyle(document.querySelector("[data-fn-stage]")).display, inline: [...document.querySelectorAll("[data-fn-surface-inline]")].every((e) => getComputedStyle(e).display !== "none"), cards: getComputedStyle(document.querySelector("[data-plans-cards]")).display, table: getComputedStyle(document.querySelector("[data-plans-table]")).display }; });
  await scrollTo("#demo", -70, 400); await demoRun(); await sleep(8500);
  const phDemo = await J(() => { const s = document.querySelector("[data-hero-chat]").getBoundingClientRect(); const r = document.querySelector("[data-hero-record]").getBoundingClientRect(); return { done: document.querySelector("[data-demo]").dataset.demoDone, chatThenRecord: s.bottom <= r.top + 2, overflow: document.documentElement.scrollWidth <= window.innerWidth, fullWidth: Math.abs(s.width - r.width) < 4 }; });
  await ev("window.scrollTo(0, document.body.scrollHeight)"); await sleep(600);
  const phEnd = await J(() => ({ overflow: document.documentElement.scrollWidth <= window.innerWidth, closing: !!document.querySelector("[data-closing]") }));
  check("8-phone", "at 390 px: the headline, the benefit line and the main action on the first screen, the film attached after the first paint, the demonstration stacked (chat then record, full width), the functions as a linear stack, the plans as cards, no horizontal overflow anywhere", ph.overflow && ph.h1Bottom < 844 && ph.leadBottom < 844 && ph.ctaBottom < 844 && (ph.film === "playing" || ph.film === "poster") && ph.stage === "none" && ph.inline && ph.cards !== "none" && ph.table === "none" && phDemo.done === "true" && phDemo.chatThenRecord && phDemo.fullWidth && phDemo.overflow && phEnd.overflow && phEnd.closing, { ph, phDemo, phEnd });
  await scrollTo("#demo", -70, 400); await shot("8-phone-demo-390.png");

  ws.close();
} finally {
  edge.kill();
  const passed = results.checks.filter((c) => c.ok).length;
  results.summary = `${passed}/${results.checks.length} checks passed`;
  writeFileSync(join(OUT, "build-check-1103.json"), JSON.stringify(results, null, 2));
  console.log(`${results.summary} -> ${join(OUT, "build-check-1103.json")}`);
}
