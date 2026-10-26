// Checks of the master order (2026-10-10 §12) on a deployed origin, in headless Edge. One JSON with every check:
//   depth / panel / cover   the hero's layers move apart, the panel comes upright, the floating cards cover no words
//   header                  the navigation stands on the sky at the top and is the light bar after scrolling
//   story                   the six chapters A to F are in the document and readable without a click
//   channels                the channel selector works by mouse and by arrow keys; the whole scene changes with it
//   task                    Jarvis: take and done by keyboard, the record line appears
//   notice                  the AI notice can be opened on every channel
//   model3d / packages      the 3D section and the ladder are there; no proof-state label on the public page
//   reduced                 with reduced motion nothing moves and everything is visible
//   nojs                    without JavaScript the hero's picture and all six chapters stand
//   faq                     questions open one at a time, no count under a category, no row id in the text
//   login-gate              /app without a session goes to the login with next=; the login returns there (stub session)
//   session-header          with a session the header shows the account link and log out; log out works and says so
//   reports                 the weekly report renders its counts (stub) and the email preview has the button
//   social-b                Screen B shows the reason sentence, the cover frame and the draft control
// Usage: BASE=https://… OUT=<folder> node scripts/design/master-check.mjs
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const BASE = (process.env.BASE ?? "").replace(/\/$/, "");
if (!BASE) throw new Error("BASE=https://… is required");
const OUT = process.env.OUT ?? join(process.cwd(), "docs", "website_redesign", "evidence_2026-10-10", "checks");
const EDGE = process.env.EDGE ?? "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const PORT = 9371 + Math.floor(Math.random() * 20);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
mkdirSync(OUT, { recursive: true });

const results = { started_utc: new Date().toISOString(), base: BASE, checks: [] };
const check = (id, what, ok, evidence) => { results.checks.push({ id, what, ok: !!ok, evidence }); console.log(`${ok ? "PASS" : "FAIL"} ${id} ${what}`); };

const edge = spawn(EDGE, ["--headless=new", "--disable-gpu", "--no-first-run", "--hide-scrollbars", `--user-data-dir=${join(tmpdir(), "nuova-master-" + Date.now())}`, `--remote-debugging-port=${PORT}`, "about:blank"], { stdio: "ignore" });
try {
  let list;
  for (let i = 0; i < 60; i++) { try { list = await (await fetch(`http://127.0.0.1:${PORT}/json`)).json(); break; } catch { await sleep(400); } }
  const ws = new WebSocket(list.find((t) => t.type === "page").webSocketDebuggerUrl);
  await new Promise((res) => ws.addEventListener("open", res));
  let mid = 0;
  const pend = new Map();
  ws.addEventListener("message", (e) => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } });
  const send = (method, params = {}) => new Promise((res) => { const i = ++mid; pend.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
  const ev = async (x) => (await send("Runtime.evaluate", { expression: x, returnByValue: true, awaitPromise: true })).result?.result?.value;
  const key = async (k, code, vk) => { const text = k === "Enter" ? "\r" : k.length === 1 ? k : undefined; await send("Input.dispatchKeyEvent", { type: "keyDown", key: k, code, windowsVirtualKeyCode: vk, text }); await send("Input.dispatchKeyEvent", { type: "keyUp", key: k, code, windowsVirtualKeyCode: vk }); };
  const nav = async (path, ms = 4500) => { await send("Page.navigate", { url: `${BASE}${path}` }); await sleep(ms); };
  const shot = async (name) => { const s = await send("Page.captureScreenshot", { format: "png" }); writeFileSync(join(OUT, name), Buffer.from(s.result.data, "base64")); };
  await send("Page.enable"); await send("Runtime.enable"); await send("DOM.enable"); await send("Network.enable");

  const LAYERS = `JSON.stringify(Object.fromEntries([["far","[data-depth-layer=far]"],["sky","[data-depth-layer=sky]"],["mid","[data-depth-layer=mid]"],["panel",".hero-panel"]].map(([k,s])=>[k,getComputedStyle(document.querySelector(s)).transform])))`;
  const ty = (m) => { const a = /matrix\(([^)]+)\)/.exec(m); if (a) return +a[1].split(",")[5]; const b = /matrix3d\(([^)]+)\)/.exec(m); return b ? +b[1].split(",")[13] : 0; };

  for (const [view, w, h, mobile, dpr] of [["d1440", 1440, 900, false, 1], ["m390", 390, 844, true, 2]]) {
    await send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: dpr, mobile });
    await send("Emulation.setEmulatedMedia", { features: [] });
    await nav("/es", 7000);
    const top = JSON.parse(await ev(LAYERS));
    await ev("window.scrollTo(0, 420)"); await sleep(600);
    const down = JSON.parse(await ev(LAYERS));
    const d = { far: ty(down.far) - ty(top.far), sky: ty(down.sky) - ty(top.sky), mid: ty(down.mid) - ty(top.mid) };
    check(`${view}-depth`, "four layers at four speeds: stars (far) > sky > ridges (mid) > 0 (the panel scrolls with the page)", d.mid > 2 && d.far / d.sky > 1.3 && d.sky / d.mid > 1.3, { moved_px_after_420_scroll: d, ratios: { far_sky: +(d.far / d.sky).toFixed(2), sky_mid: +(d.sky / d.mid).toFixed(2) } });
    check(`${view}-panel`, "the panel leans back at the top of the page and comes upright and larger after scrolling", top.panel !== down.panel && /matrix3d/.test(top.panel), { top: top.panel.slice(0, 90), down: down.panel.slice(0, 90) });
    // Nothing lies over the words: a grid of points inside the headline, the buttons and the four story parts of
    // the panel is probed at five scroll positions; a point whose top element is neither inside its own part nor
    // behind it (an ancestor shows through a rounded corner) counts as covered.
    const cover = JSON.parse(await ev(`(async()=>{
      const hero=document.querySelector('.hero-world'); const end=hero.getBoundingClientRect().bottom+scrollY-innerHeight*0.4; const out=[];
      for (const y of [0, end*0.25, end*0.5, end*0.75, end]) {
        window.scrollTo(0, Math.round(y)); await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));
        const row={scroll:Math.round(y), hits:[]};
        for (const sel of ['#hero-h1','[data-hero-lead]','[data-hero-cta]','.hero-cta-second','[data-hero-enquiry]','[data-hero-reply]','[data-hero-results]','[data-hero-state]']) {
          const t=document.querySelector(sel); const r=t.getBoundingClientRect(); let n=0, seen=0;
          for (let i=0;i<=8;i++) for (let j=0;j<=5;j++) { const x=r.left+2+(r.width-4)*i/8, yy=r.top+2+(r.height-4)*j/5; if (yy<0||yy>innerHeight||x<0||x>innerWidth) continue; seen++; const e=document.elementFromPoint(x,yy); if (e && !e.closest(sel) && !e.contains(t) && !e.closest('header')) n++; }
          if (n>0) row.hits.push(sel+':'+n+'/'+seen);
        }
        out.push(row);
      }
      const cards=document.querySelectorAll('.hero-float').length;
      window.scrollTo(0,0); return JSON.stringify({rows:out, cards});
    })()`));
    check(`${view}-cover`, "no headline, button or story part of the panel is covered by anything, at five scroll positions; no floating card exists", cover.cards === 0 && cover.rows.every((r) => r.hits.length === 0), cover);
  }

  await send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  await nav("/es", 4500);
  const hTop = await ev("getComputedStyle(document.querySelector('header')).backgroundColor");
  await ev("window.scrollTo(0, 300)"); await sleep(500);
  const hDown = await ev("getComputedStyle(document.querySelector('header')).backgroundColor");
  check("header", "the navigation has no bar at the top of the page and the light bar after scrolling", /rgba\(0, 0, 0, 0\)|transparent/.test(hTop) && /25[0-3], 25[0-2], 24[6-9]/.test(hDown), { top: hTop, scrolled: hDown });

  // the story: six chapters, readable in the scroll, no click needed
  const story = JSON.parse(await ev(`(async()=>{const ids=['story-a','story-b','story-c','story-d','story-e','story-f'];const out={};for(const id of ids){const el=document.getElementById(id);(()=>{const it=el.closest('[data-deck-item]');let t=0,n=it?it.parentElement:el;while(n){t+=n.offsetTop;n=n.offsetParent;}if(it){for(const s of it.parentElement.children){if(s===it)break;t+=s.offsetHeight;}}window.scrollTo(0,Math.max(0,t-80))})();await new Promise(r=>setTimeout(r,id==='story-a'?3800:500));const h=el.querySelector('h3');const stage=el.querySelector('[data-story-stage]');const laura=el.innerText.includes('Laura');out[id]={heading:h?h.innerText.slice(0,40):null,stage:!!stage&&stage.getBoundingClientRect().height>200,text:(stage?stage.innerText.length:0),laura}}window.scrollTo(0,0);return JSON.stringify(out)})()`));
  const ids = Object.keys(story);
  check("story", "the six chapters stand in the document with a heading and a filled stage, and the same enquiry (Laura) runs through each of them", ids.length === 6 && ids.every((k) => story[k].heading && story[k].stage && story[k].text > 120 && story[k].laura), story);
  const states = JSON.parse(await ev("JSON.stringify({states:document.querySelectorAll('[data-chapter-state]').length, answers:document.querySelectorAll('[data-chapter-answers]').length, letters:document.querySelectorAll('.story-letter').length, social:!!document.getElementById('story-social'), comment:!!document.querySelector('[data-social-comment]'), friday:/viernes|Friday/i.test(document.querySelector('[data-stage=followup]')?.innerText||''), thursday:/jueves|Thursday/i.test(document.querySelector('[data-story-email]')?.innerText||''), deadSpan:document.querySelectorAll('[data-story-email] span.demo-action').length, emailBtn:!!document.querySelector('[data-story-request]'), alert:!!document.querySelector('[data-hot-lead-alert]'), held:(()=>{document.querySelector('[data-channel-tab=email]')?.click();return true})(), jarvis:/Jarvis/.test(document.querySelector('main').innerText), senores:/Señores Keller|señores Keller/.test(document.querySelector('main').innerText)})"));
  await sleep(500);
  const held = JSON.parse(await ev("JSON.stringify({held:!!document.querySelector('[data-story-held]'), sent:/enviad[oa] a los Keller|sent to the Kellers|Borrador|Hallo Anna/i.test(document.querySelector('[data-channel-view]')?.innerText||''), figures:/hasta 3 personas|hasta 8 personas|hasta 50 personas|Oficinas|Puestos/.test(document.getElementById('packages')?.innerText||'')})"));
  await ev("document.querySelector('[data-channel-tab=whatsapp]')?.click()");
  check("story-texts", "every chapter and the social strip carry a state line and the three answers; no chapter letters; the follow-up is on Wednesday before Thursday's viewing (no Friday); the email's action is a real demo button; the alert with its reason stands in D; the German email is held without an automatic reply and without a draft (HANDOVER_1021 §E); no office/seat figures on the ladder (owner 20.10.); no Jarvis, no 'Señores Keller'", states.states >= 7 && states.answers >= 7 && states.letters === 0 && states.social && states.comment && !states.friday && states.thursday && states.deadSpan === 0 && states.emailBtn && states.alert && held.held && !held.sent && !held.figures && !states.jarvis && !states.senores, { ...states, ...held });
  await ev("(()=>{const e=document.getElementById('story-e');const it=e.closest('[data-deck-item]');let t=0,n=it?it.parentElement:e;while(n){t+=n.offsetTop;n=n.offsetParent;}if(it){for(const s of it.parentElement.children){if(s===it)break;t+=s.offsetHeight;}}window.scrollTo(0,Math.max(0,t-80))})()"); await sleep(3600);
  const btn = JSON.parse(await ev("JSON.stringify((()=>{const b=document.querySelector('[data-story-request]'); if(!b) return {exists:false}; const r=b.getBoundingClientRect(); return {exists:true, tag:b.tagName, visible:r.height>0&&getComputedStyle(b).opacity!=='0', text:b.innerText.slice(0,40)}})())"));
  await ev("document.querySelector('[data-story-request]')?.click()"); await sleep(500);
  const req = JSON.parse(await ev("JSON.stringify({state:document.querySelector('[data-story]').dataset.storyRequested, sent:!!document.querySelector('[data-story-request-sent]'), text:(document.querySelector('[data-story-request-sent]')?.innerText||'').slice(0,80)})"));
  check("email-demo", "the email's demo button (a real button, visible after its entry) shows the request landing with the team, never a booked appointment", btn.exists && btn.tag === "BUTTON" && btn.visible && req.state === "sent" && req.sent && /nadie ha confirmado|nobody has confirmed/i.test(req.text), { button: btn, ...req });
  await ev("(()=>{const e=document.getElementById('story-b');const it=e.closest('[data-deck-item]');let t=0,n=it?it.parentElement:e;while(n){t+=n.offsetTop;n=n.offsetParent;}if(it){for(const s of it.parentElement.children){if(s===it)break;t+=s.offsetHeight;}}window.scrollTo(0,Math.max(0,t-80))})()"); await sleep(600);
  await ev("document.querySelector('[data-channel-tab=email]').click()"); await sleep(600);
  const tr = JSON.parse(await ev("JSON.stringify({toggle:document.querySelector('[data-translation-toggle]')?.dataset.translationToggle, before:(document.querySelector('[data-story-incoming] p[lang]')?.innerText||'').slice(0,30)})"));
  await ev("document.querySelector('[data-translation-toggle]').click()"); await sleep(300);
  const tr2 = JSON.parse(await ev("JSON.stringify({toggle:document.querySelector('[data-translation-toggle]')?.dataset.translationToggle, after:(document.querySelector('[data-story-incoming] p[lang]')?.innerText||'').slice(0,30), lang:document.querySelector('[data-story-incoming] p[lang]')?.getAttribute('lang')})"));
  check("translation", "a foreign-language message is shown translated with the original one tap away", tr.toggle === "translated" && tr2.toggle === "original" && tr2.lang === "de" && tr.before !== tr2.after, { ...tr, ...tr2 });

  // channels: click and arrow keys; the whole scene changes (back on WhatsApp first: the translation check left Email selected)
  await ev("(()=>{const e=document.getElementById('story-b');const it=e.closest('[data-deck-item]');let t=0,n=it?it.parentElement:e;while(n){t+=n.offsetTop;n=n.offsetParent;}if(it){for(const s of it.parentElement.children){if(s===it)break;t+=s.offsetHeight;}}window.scrollTo(0,Math.max(0,t-80))})()"); await sleep(600);
  await ev("document.querySelector('[data-channel-tab=whatsapp]').click()"); await sleep(600);
  const c0 = await ev("document.querySelector('[data-story]').dataset.storyChannel + '|' + document.querySelector('[data-channel-view]').innerText.slice(0,40)");
  await ev("document.querySelector('[data-channel-tab=phone]').click()"); await sleep(700);
  const c1 = JSON.parse(await ev("JSON.stringify({ch:document.querySelector('[data-story]').dataset.storyChannel, view:document.querySelector('[data-channel-view]').dataset.channelView, text:document.querySelector('[data-channel-view]').innerText, hasWhatsAppWords:/WhatsApp/.test(document.querySelector('[data-channel-view]').innerText), hasCall:/Llamada|llamar|llamada/.test(document.querySelector('[data-channel-view]').innerText)})"));
  await ev("document.querySelector('[data-channel-tab=phone]').focus()"); await key("ArrowLeft", "ArrowLeft", 37); await sleep(600);
  const c2 = await ev("document.querySelector('[data-story]').dataset.storyChannel + ' ' + document.activeElement.getAttribute('data-channel-tab')");
  await key("ArrowRight", "ArrowRight", 39); await key("ArrowRight", "ArrowRight", 39); await sleep(600);
  const c3 = await ev("document.querySelector('[data-story]').dataset.storyChannel");
  check("channels", "the channel selector works by click and arrow keys; the phone view carries call words and no WhatsApp step text", c0.startsWith("whatsapp") && c1.ch === "phone" && c1.view === "phone" && c1.hasCall && !c1.hasWhatsAppWords && c2 === "webform webform" && c3 === "whatsapp", { start: c0, phone: { ...c1, text: c1.text.slice(0, 80) }, after_left: c2, after_two_right: c3 });

  // the notice on every channel
  const notices = JSON.parse(await ev(`(async()=>{const out={};for(const ch of ['whatsapp','email','webform','phone']){document.querySelector('[data-channel-tab='+ch+']').click();await new Promise(r=>setTimeout(r,600));document.querySelector('[data-story-notice-toggle]').click();await new Promise(r=>setTimeout(r,300));const n=document.querySelector('[data-story-notice]');out[ch]=n?n.innerText.slice(0,50):null;document.querySelector('[data-story-notice-toggle]').click();}return JSON.stringify(out)})()`));
  check("notice", "the AI notice can be shown on every channel", Object.values(notices).every((t) => t && t.length > 20), notices);

  // Jarvis: take and done by keyboard
  await ev("(()=>{const e=document.getElementById('story-d');const it=e.closest('[data-deck-item]');let t=0,n=it?it.parentElement:e;while(n){t+=n.offsetTop;n=n.offsetParent;}if(it){for(const s of it.parentElement.children){if(s===it)break;t+=s.offsetHeight;}}window.scrollTo(0,Math.max(0,t-80))})()"); await sleep(600);
  await ev("document.querySelector('[data-task-take]').focus()"); await key(" ", "Space", 32); await sleep(600);
  const t1 = await ev("document.querySelector('[data-story]').dataset.storyTask");
  await ev("document.querySelector('[data-task-confirm]').click()"); await sleep(600);
  const tc = await ev("document.querySelector('[data-story]').dataset.storyTask");
  await ev("document.querySelector('[data-task-complete]').focus()"); await key("Enter", "Enter", 13); await sleep(600);
  const t2 = JSON.parse(await ev("JSON.stringify({state:document.querySelector('[data-story]').dataset.storyTask, line:(document.querySelector('[data-task-done-line]')?.innerText||'').slice(0,60), others:[...document.querySelectorAll('[data-task-item]')].map(e=>e.dataset.taskState).join(',')})"));
  check("task", "the task: take, agree the time as its own step, done; the done line names who did what; the other tasks stay open", t1 === "taken" && tc === "confirmed" && t2.state === "done" && t2.line.length > 20 && t2.others === "done,open,open,open", { taken: t1, done: t2 });

  // 3D and packages: there, and no proof-state label on the public page
  // R24: the 3D lane's assets are in (the pair on a compare handle, the turn as a video with its poster, the plan and the whole house), every
  // picture carries the fictional-house mark, no "pending" word remains
  const sec = JSON.parse(await ev("JSON.stringify({model3d:!!document.getElementById('model-3d'), steps:document.querySelectorAll('[data-model3d-steps] li').length, plan:!!document.querySelector('[data-model3d-step=\"1\"] [data-demo-plan]'), house:(document.querySelector('[data-model3d-step=\"2\"] img')?.getAttribute('src')||''), pair:document.querySelector('[data-model3d-pair-slot]')?.dataset.model3dPairSlot, pairImgs:document.querySelectorAll('[data-model3d-pair-slot] img').length, range:!!document.querySelector('[data-model3d-pair-slot] [data-compare-range]'), turn:document.querySelector('[data-model3d-turn-slot]')?.dataset.model3dTurnSlot, film:!!document.querySelector('[data-model3d-film] video'), src:(document.querySelector('[data-model3d-film] source')?.getAttribute('src')||''), poster:(document.querySelector('[data-model3d-film] video')?.getAttribute('poster')||''), pending:document.querySelectorAll('[data-model3d-pending]').length, captions:[...document.querySelectorAll('[data-model3d-caption]')].filter(e=>/ficticio|ficticia|Fictional/.test(e.innerText)).length, packages:document.querySelectorAll('[data-package]').length, proof:document.querySelectorAll('[data-proof-state]').length, menuStates:document.querySelectorAll('[data-platform-menu] .state-line').length, labels:(()=>{const t=document.getElementById('model-3d').innerText;return !/Pendiente del equipo 3D|Pending from the 3D team|Raw model|Modelo en bruto|Primera versi|First version|dibujada por NuovaSolution/.test(t)})(), capacity:/Capacidad: consultas|Capacity: enquiries|750|3\\.000|3,000/.test(document.getElementById('packages')?.innerText||''), internal:/clip v|REF-DEMO|withheld|retenid|03-done|(^|[\\s(])env([\\s).:,]|$)|Jarvis/i.test(document.querySelector('main').innerText)})"));
  check("model3d-packages", "the 3D section: four steps of one house (the plan to scale, the whole house from the viewer, the empty/furnished pair on a compare handle, the turn as a video with its poster), every picture marked as the fictional example house, no pending mark; the ladder is there; no monthly capacity figure; no proof-state label and no state word in the menu; no internal word (clip, env, 03-done, Jarvis) in the sales flow", sec.model3d && sec.steps === 4 && sec.plan && /house-both-floors/.test(sec.house) && sec.pair === "delivered" && sec.pairImgs === 2 && sec.range && sec.turn === "delivered" && sec.film && /house-turn-es\.mp4/.test(sec.src) && /house-turn-poster/.test(sec.poster) && sec.pending === 0 && sec.captions === 4 && sec.packages === 4 && sec.proof === 0 && sec.menuStates === 0 && sec.labels && !sec.capacity && !sec.internal, sec);

  // no element wider than the page at 390 and 768 (measured without the mobile viewport expansion that hides it)
  for (const w of [390, 768]) {
    await send("Emulation.setDeviceMetricsOverride", { width: w, height: 900, deviceScaleFactor: 1, mobile: false });
    await nav("/es", 4000);
    const ov = JSON.parse(await ev("JSON.stringify({sw:document.documentElement.scrollWidth, iw:innerWidth, wide:[...document.querySelectorAll('body *')].filter(e=>{const r=e.getBoundingClientRect();if(!(r.right>innerWidth+2&&r.width>0))return false;if(e.closest('[data-depth-layer],.hero-ridges,.hero-sky,.hero-world-land,.hero-world-stars'))return false;let a=e.parentElement;while(a&&a!==document.body){const o=getComputedStyle(a).overflowX;if((o==='auto'||o==='scroll'||o==='hidden')&&a.getBoundingClientRect().right<=innerWidth+2)return false;a=a.parentElement;}return true;}).slice(0,4).map(e=>e.tagName+'.'+String(e.className).slice(0,40))})"));
    check(`overflow-${w}`, "no horizontal overflow and no element wider than the viewport", ov.sw <= ov.iw && ov.wide.length === 0, ov);
  }
  await send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  // the FAQ
  await nav("/es/faq", 3500);
  const faq = JSON.parse(await ev(`(()=>{const btns=[...document.querySelectorAll('[data-accordion] button')];btns[1].click();return new Promise(r=>setTimeout(()=>{btns[2].click();setTimeout(()=>{const open=[...document.querySelectorAll('[data-accordion-item=open]')].length;const exp=btns[2].getAttribute('aria-expanded');const region=document.getElementById(btns[2].getAttribute('aria-controls'));const counts=[...document.querySelectorAll('section[id] h2')].filter(h=>/^\\d+$/.test((h.nextElementSibling?.innerText||'').trim())).length;const ids=document.body.innerText.includes('Q-0');r(JSON.stringify({open,exp,regionShown:!!region&&region.getBoundingClientRect().height>10,counts,ids_visible:ids}))},700)},700))})()`));
  check("faq", "one question open at a time, aria-expanded and its region, no count under a category, no row id in the text", faq.open === 1 && faq.exp === "true" && faq.regionShown && faq.counts === 0 && !faq.ids_visible, faq);

  // reduced motion
  await send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
  await nav("/es", 1500);
  const r0 = JSON.parse(await ev(`JSON.stringify({items:[...document.querySelectorAll('[data-hero-surface] .seq-item')].map(e=>getComputedStyle(e).opacity), layers:${LAYERS}, replay:getComputedStyle(document.querySelector('[data-seq-replay]')).display})`));
  await ev("window.scrollTo(0, 420)"); await sleep(500);
  const r1 = JSON.parse(await ev(LAYERS));
  const still = JSON.parse(r0.layers);
  check("reduced", "reduced motion: everything visible at once, no layer moves, the panel keeps a fixed lean, the replay control is hidden", r0.items.every((o) => o === "1") && still.far === "none" && still.sky === "none" && still.mid === "none" && still.panel === r1.panel && /matrix3d/.test(still.panel) && r0.replay === "none", { items_visible: r0.items.length, layers_top: still, panel_after_scroll_same: still.panel === r1.panel, replay: r0.replay });
  await send("Emulation.setEmulatedMedia", { features: [] });

  // without JavaScript
  await send("Emulation.setScriptExecutionDisabled", { value: true });
  await nav("/es", 3000);
  const doc = await send("DOM.getDocument", { depth: 1 });
  const q = async (sel) => (await send("DOM.querySelectorAll", { nodeId: doc.result.root.nodeId, selector: sel })).result.nodeIds.length;
  const nojs = { hero: await q(".hero-world"), story_parts: await q("[data-hero-enquiry],[data-hero-reply],[data-hero-results]"), results: await q("[data-hero-result]"), chapters: await q(".story-chapter:not(#story-social)"), stages: await q("[data-story-stage]"), html_js: await q("html.js") };
  await shot("home-d1440-es-nojs.png");
  check("nojs", "without JavaScript the hero's finished picture (the exchange and the customer record with its five lines) and all six chapters with their stages are in the document", nojs.hero === 1 && nojs.story_parts === 3 && nojs.results === 5 && nojs.chapters === 6 && nojs.stages === 6 && nojs.html_js === 0, nojs);
  await send("Emulation.setScriptExecutionDisabled", { value: false });

  // login gate: /app without a session → login with next=
  await send("Network.clearBrowserCookies");
  const redirects = [];
  const onReq = (e) => { const m = JSON.parse(e.data); if (m.method === "Network.requestWillBeSent" && m.params.redirectResponse) redirects.push({ from: m.params.redirectResponse.url, to: m.params.request.url, status: m.params.redirectResponse.status }); };
  ws.addEventListener("message", onReq);
  await nav("/es/app/reports", 3500);
  ws.removeEventListener("message", onReq);
  const gate = { url: await ev("location.pathname + location.search"), hasForm: await ev("!!document.querySelector('[data-login-form]')"), redirects: redirects.slice(0, 3) };
  check("login-gate", "the report without a session goes to the login and remembers where it came from", /\/es\/login\?next=%2Fes%2Fapp%2Freports/.test(gate.url) && gate.hasForm, gate);

  // stub session: the login returns to the report; the header shows the account; log out works
  const stubLogin = await (await fetch(`${BASE}/api/bff/auth/login?stub=1&next=/es/app/reports`, { redirect: "manual" })).status;
  await nav("/api/bff/auth/login?stub=1&next=%2Fes%2Fapp%2Freports", 4500);
  const rep = JSON.parse(await ev("JSON.stringify({path:location.pathname, state:document.querySelector('[data-reports-state]')?.dataset.reportsState, counts:document.querySelectorAll('[data-report-count]').length, nulls:document.querySelectorAll('[data-report-value=\"null\"]').length, period:(document.querySelector('[data-report-period]')?.innerText||''), emailLink:!!document.querySelector('[data-report-email-link]'), stubChip:/demostraci/i.test(document.body.innerText)})"));
  await sleep(1500);
  const hdr = JSON.parse(await ev("JSON.stringify({nav:document.querySelector('header [data-session-nav]')?.dataset.sessionNav, account:!!document.querySelector('header [data-account-link]'), logout:!!document.querySelector('header [data-logout]'), loginText:/Iniciar sesión/.test(document.querySelector('header').innerText)})"));
  const order = JSON.parse(await ev("JSON.stringify({demoFirst:(()=>{const d=document.querySelector('[data-report-demo]');const m=document.querySelector('[data-report-meaning]');return !!d&&!!m&&(d.compareDocumentPosition(m)&Node.DOCUMENT_POSITION_FOLLOWING)>0})(), estimate:/estimaci|estimate/i.test(document.querySelector('main').innerText), meaning:document.querySelectorAll('[data-report-key]').length})"));
  check("reports", "with a session the report renders its counts and period (stub data, labelled ABOVE the figures, no 'not an estimate' sentence) with the three meaning blocks and the email preview link", stubLogin === 303 && rep.path === "/es/app/reports" && rep.state === "report" && rep.counts >= 6 && rep.period.length > 8 && rep.emailLink && rep.stubChip && order.demoFirst && !order.estimate && order.meaning === 3, { stub_login_status: stubLogin, ...rep, ...order });
  await nav("/es/app", 3500);
  const pkgName = await ev("(document.querySelector('[data-app-trial]')?.innerText||'')");
  check("app-package", "the session area names the package next to the trial line", /Essential/.test(pkgName), { trial: pkgName });
  check("session-header", "with a session the header shows the account link and log out instead of log in", hdr.nav === "in" && hdr.account && hdr.logout && !hdr.loginText, hdr);
  await nav("/es/app/reports/email", 4000);
  const em = JSON.parse(await ev("JSON.stringify({subject:(document.querySelector('[data-weekly-email]')?.dataset.emailSubjectText||''), button:document.querySelector('[data-email-button]')?.getAttribute('href')||'', shell:!!document.querySelector('[data-mail-shell=v3]'), tiles:document.querySelectorAll('[data-mail-tile]').length, open:document.querySelectorAll('[data-mail-open-action]').length, tasks:document.querySelectorAll('[data-mail-task]').length, channels:(document.querySelector('[data-mail-shell]')?.innerText||''), logo:document.querySelector('[data-mail-logo]')?.getAttribute('alt')||'', n8n:/n8n/i.test(document.querySelector('[data-mail-shell]')?.innerText||'')})"));
  const emOk = /\d/.test(em.subject) && /\/es\/app\/reports$/.test(em.button) && em.shell && em.tiles === 3 && em.open === 2 && em.tasks === 0 && em.logo.length > 3 && !em.n8n && !/formulario|teléfono|cita de los Keller/i.test(em.channels);
  check("report-email", "the Monday email preview is in the shared shell (v3): the logo, the subject with the figure, three tiles (answered of received, viewings with the agreed ones, waiting for a person), the open actions by name, the button to the full report; no task block; no web-form or phone figure and no booked appointment (COPY_1019 R-10)", emOk, { ...em, channels: em.channels.slice(0, 200) });
  // R23: the two mail previews without a login (stub build only), the 3D video starting at 0:00 with its own poster, the phone scene Spanish only
  await send("Network.clearBrowserCookies");
  await nav("/es/preview/weekly", 4000);
  const pw = JSON.parse(await ev("JSON.stringify({path:location.pathname, tiles:document.querySelectorAll('[data-mail-tile]').length, open:document.querySelectorAll('[data-mail-open-action]').length, demo:!!document.querySelector('[data-preview-demo]'), login:!!document.querySelector('[data-login-form]')})"));
  await nav("/es/preview/brief", 4000);
  const pb = JSON.parse(await ev("JSON.stringify({path:location.pathname, tasks:document.querySelectorAll('[data-mail-task]').length, demo:!!document.querySelector('[data-preview-demo]')})"));
  check("mail-previews-open", "the weekly report and the morning brief can be seen without a login on the stub build, labelled as demonstration", pw.path === "/es/preview/weekly" && pw.tiles === 3 && pw.open === 2 && pw.demo && !pw.login && pb.path === "/es/preview/brief" && pb.tasks === 3 && pb.demo, { weekly: pw, brief: pb });
  await nav("/es", 4500);
  const v3d = JSON.parse(await ev("JSON.stringify((()=>{const v=document.querySelector('[data-model3d-film] video');const s=v?.querySelector('source');return {poster:v?.getAttribute('poster')||'', src:s?.getAttribute('src')||'', phone:/solo en español|Spanish only/.test(document.querySelector('[data-stage=reply]')?.innerText||'')+'', social:/la escribe una persona|written by a person/.test(document.getElementById('story-social')?.innerText||'')+'', packagesBeforeTrust:(()=>{const p=document.getElementById('packages'),t=document.getElementById('start');return !!p&&!!t&&(p.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_FOLLOWING)>0})()}})())"));
  check("r23-findings", "the 3D video starts at 0:00 with its own poster (no #t fragment); the social reply is a person's; the packages stand before the way in and the questions", /house-turn-poster/.test(v3d.poster) && !/#t=/.test(v3d.src) && v3d.social === "true" && v3d.packagesBeforeTrust, v3d);
  // R24 (owner pictures of 24.10., audit BILDBEFUNDE_R24): the actual logo as an image, loaded, ivory on the dark hero and ink after the scroll; the
  // customer record in the hero; the hero's panel head on the first screen at 1366 × 768; the hero ends on a straight ivory edge (the ground band
  // is the story's canvas colour at the hero's bottom); the state lines 14 px; no chip over the rights line in C; the social post marked as an
  // example with its photo source; the trial mark inside the Essential card on the packages page; the platform's morning-list row partly
  // available; the task sentence the same on the home page and the daily page; no German word in the Spanish mail previews
  await send("Emulation.setDeviceMetricsOverride", { width: 1366, height: 768, deviceScaleFactor: 1, mobile: false });
  await nav("/es", 5000);
  const r24a = JSON.parse(await ev("JSON.stringify((()=>{const lg=document.querySelector('header [data-site-logo]');const panel=document.querySelector('[data-hero-panel]').getBoundingClientRect();const hero=document.querySelector('.hero-world').getBoundingClientRect();const edge=document.elementFromPoint(Math.round(innerWidth/2), Math.round(hero.bottom-3));const ground=document.querySelector('.hero-world-ground');const gcs=getComputedStyle(ground);const chip=document.querySelector('#story-c .story-front')?.getBoundingClientRect();const rights=[...document.querySelectorAll('#story-c [data-stage=match] p')].pop()?.getBoundingClientRect();const inter=chip&&rights&&chip.left<rights.right&&chip.right>rights.left&&chip.top<rights.bottom&&chip.bottom>rights.top;return {logoImg:!!lg&&lg.tagName==='IMG'&&lg.complete&&lg.naturalWidth>0, logoFilterTop:getComputedStyle(lg).filter, record:!!document.querySelector('[data-hero-record]'), recordLines:document.querySelectorAll('[data-hero-record] [data-hero-result]').length, alert:/Aviso por email a tu equipo/.test(document.querySelector('[data-hero-record]')?.innerText||''), panelTop:Math.round(panel.top), heroBottom:Math.round(hero.bottom), groundMask:gcs.maskImage||gcs.webkitMaskImage, front:!!document.querySelector('.hero-world-front'), stateFont:getComputedStyle(document.querySelector('[data-hero-state]')).fontSize, lineFont:getComputedStyle(document.querySelector('.state-line')).fontSize, chipOverlap:!!inter, socialExample:!!document.querySelector('[data-social-post] [data-social-example]'), photoSource:/Pexels 12715501/.test(document.getElementById('story-social')?.innerText||''), taskSentence:/el asistente de la mañana dice quién la ha tomado/.test(document.getElementById('story-d')?.innerText||'')}})())"));
  await ev("window.scrollTo(0, 400)"); await sleep(600);
  const r24b = JSON.parse(await ev("JSON.stringify({logoFilterScrolled:getComputedStyle(document.querySelector('header [data-site-logo]')).filter, logoVisible:(()=>{const r=document.querySelector('header [data-site-logo]').getBoundingClientRect();return r.width>80&&r.height>20})()})"));
  await send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  await nav("/es/packages", 4000);
  const r24c = JSON.parse(await ev("JSON.stringify((()=>{const s=document.querySelector('[data-trial-sticker]');const card=s?.closest('li');const sr=s?.getBoundingClientRect(),cr=card?.getBoundingClientRect();return {inside:!!sr&&!!cr&&sr.left>=cr.left&&sr.right<=cr.right&&sr.top>=cr.top, text:s?.innerText||''}})())"));
  await nav("/es/platform/daily-assistant", 4000);
  const r24d = JSON.parse(await ev("JSON.stringify({tasksView:!!document.querySelector('[data-view=tasks]'), leadsView:!!document.querySelector('[data-view=board]'), sentence:/desaparece de las listas de los demás, y el asistente de la mañana dice quién la ha tomado/.test(document.querySelector('main').innerText), langLine:/elegido en la aplicación/.test(document.querySelector('main').innerText), state:!!document.querySelector('[data-product-state]'), why:document.querySelectorAll('[data-product-why] li').length})"));
  await nav("/es/platform", 3500);
  const r24e = JSON.parse(await ev("JSON.stringify({daily:(document.querySelector('[data-platform-entry=daily] [data-platform-entry-state]')?.innerText||''), dailyState:document.querySelector('[data-platform-entry=daily] [data-platform-entry-state]')?.dataset.state, tasksState:document.querySelector('[data-platform-entry=tasks] [data-platform-entry-state]')?.dataset.state})"));
  await nav("/es/preview/brief", 4000);
  const r24f = { brief: await ev("/hülle|Hülle/.test(document.body.innerText)") };
  await nav("/es/preview/weekly", 4000);
  r24f.weekly = await ev("/hülle|Hülle/.test(document.body.innerText)");
  const r24 = { ...r24a, ...r24b, sticker: r24c, daily: r24d, platform: r24e, german: r24f };
  check("r24-findings", "R24: the actual logo (an image, loaded, ivory on the dark hero and ink after the scroll); the customer record with the alert in the hero; the panel's head on the first screen at 1366 × 768; the hero ends on a straight ivory edge (no mask, no foreground); state lines 14 px; no chip over the rights line in C; the social post marked as an example with its photo source; the trial mark inside the Essential card; the daily page shows tasks with its state, the benefit lines and the one task sentence (X-9), no app-language line; the platform rows for the morning assistant and the tasks in preparation (X-5); no German word in the Spanish mail previews", r24a.logoImg && /invert/.test(r24a.logoFilterTop) && !/invert/.test(r24b.logoFilterScrolled) && r24b.logoVisible && r24a.record && r24a.recordLines === 5 && r24a.alert && r24a.panelTop < 768 && (r24a.groundMask === "none" || !r24a.groundMask) && !r24a.front && r24a.stateFont === "14px" && r24a.lineFont === "14px" && !r24a.chipOverlap && r24a.socialExample && r24a.photoSource && r24a.taskSentence && r24c.inside && /Sin método de pago/.test(r24c.text) && r24d.tasksView && !r24d.leadsView && r24d.sentence && !r24d.langLine && r24d.state && r24d.why >= 2 && r24e.dailyState === "preparing" && r24e.tasksState === "preparing" && !r24f.brief && !r24f.weekly, r24);
  // Copy's W-1…W-12 on this build: the hero's channel row, the FAQ language and hot-lead answers, the platform rows' states, the E.164 number
  await nav("/es", 4500);
  const heroCh = JSON.parse(await ev("JSON.stringify({chips:[...document.querySelectorAll('[data-hero-channel]')].map(e=>e.dataset.heroChannel), alert:/Aviso por email a tu equipo/.test(document.querySelector('[data-hero-results]')?.innerText||''), regrouped:/\\+34 600 123 456/.test(document.querySelector('main').innerText)})"));
  await nav("/es/faq", 3500);
  const faqW = JSON.parse(await ev("JSON.stringify((()=>{const t=document.querySelector('main').textContent;return {lang:/En español\\. En otro idioma no se envía nada automáticamente/.test(t), oldLang:/idioma en el que escribió el cliente/.test(t), hot:/Sí, por email\\. Cuando una consulta parece importante/.test(t), noAlert:/No se te envía ningún mensaje de alerta/.test(t), ads:/No hacemos campañas ni compramos leads/.test(t)}})())"));
  await nav("/es/platform", 3500);
  const plW = JSON.parse(await ev("JSON.stringify({rows:document.querySelectorAll('[data-platform-entry]').length, states:document.querySelectorAll('[data-platform-entry-state]').length, preparing:document.querySelectorAll('[data-platform-entry-state][data-state=preparing]').length})"));
  check("copy-w-rows", "Copy's W-rows (1023): the hero shows only WhatsApp and e-mail and names the alert's channel; the FAQ answers the language and the hot lead as production does and the ads question as the packages do; every platform row carries its state; no regrouped phone number", heroCh.chips.join(",") === "whatsapp,email" && heroCh.alert && !heroCh.regrouped && faqW.lang && !faqW.oldLang && faqW.hot && !faqW.noAlert && faqW.ads && plW.rows > 10 && plW.states === plW.rows && plW.preparing >= 8, { hero: heroCh, faq: faqW, platform: plW });
  await nav("/api/bff/auth/login?stub=1&next=%2Fes%2Fapp%2Freports%2Femail", 4500);
  // the morning brief preview: the same shell, the task block instead of figures
  await nav("/es/app/brief", 4000);
  const br = JSON.parse(await ev("JSON.stringify({shell:!!document.querySelector('[data-mail-shell=v3]'), tasks:document.querySelectorAll('[data-mail-task]').length, figures:document.querySelectorAll('[data-mail-slot=figures]').length, opens:document.querySelectorAll('[data-mail-task-open]').length, draft:(()=>{const t=document.querySelector('[data-mail-shell]')?.innerText||'';return /Contestar al cliente y proponer una fecha/.test(t)&&!/Borrador|Hallo Anna/.test(t)})(), priority:/Prioridad alta/.test(document.querySelector('[data-mail-shell]')?.innerText||''), demo:!!document.querySelector('[data-brief-demo]'), wide:(()=>{const t=document.querySelector('[data-mail-shell]');return t?t.scrollWidth<=t.clientWidth+1:false})()})"));
  check("brief-email", "the morning brief preview is in the same shell with the task block (kind, customer, lines, reasoned priority, held draft labelled as a draft, state, next step, open link) and no figures; labelled as demonstration", br.shell && br.tasks === 3 && br.figures === 0 && br.opens === 3 && br.draft && br.priority && br.demo && br.wide, br);
  // social screen B
  await nav("/es/social/post", 4500);
  await sleep(2500);
  const sb = JSON.parse(await ev("JSON.stringify({listings:document.querySelectorAll('[data-listing]').length, covers:document.querySelectorAll('[data-listing-cover]').length, shown:[...document.querySelectorAll('[data-listing-cover=shown] img')].filter(i=>i.complete&&i.naturalWidth>0).length, drafts:document.querySelectorAll('[data-social-action=\"draft\"]').length, inert:document.querySelectorAll('[data-social-action=\"draft\"][data-social-inert]').length, off:[...document.querySelectorAll('[data-social-off]')].map(e=>e.dataset.socialOff)[0]||null})"));
  check("social-b", "Screen B shows the cover frame for every listing, at least two covers actually loaded (F-R16-3), and a draft control on the publishable ones, switched off with its reason until the release", sb.listings >= 2 && sb.covers === sb.listings && sb.shown >= 2 && sb.drafts >= 1 && sb.inert === sb.drafts && sb.off !== null, sb);
  // log out from the header
  await nav("/es/app", 4000);
  await ev("document.querySelector('header [data-logout]').click()"); await sleep(4000);
  const out = JSON.parse(await ev("JSON.stringify({path:location.pathname, notice:!!document.querySelector('[data-signed-out]'), nav:document.querySelector('header [data-session-nav]')?.dataset.sessionNav})"));
  await nav("/es/app", 3000);
  const after = await ev("location.pathname");
  check("logout", "log out from the header lands on the public root with a status line; the agency area asks for the login again", out.path === "/es" && out.notice && out.nav === "out" && after === "/es/login", { ...out, app_after_logout: after });

  ws.close();
} finally {
  edge.kill();
  results.pass = results.checks.filter((c) => c.ok).length;
  results.total = results.checks.length;
  writeFileSync(join(OUT, "master-check.json"), JSON.stringify(results, null, 1));
  console.log(`${results.pass}/${results.total} checks passed -> ${join(OUT, "master-check.json")}`);
}
