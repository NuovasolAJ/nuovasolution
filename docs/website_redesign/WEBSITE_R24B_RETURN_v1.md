# WEBSITE R24 · consolidated closing order of 26.10. (design and sales experience) — one final named build

**State:** `2026-10-26` · **Lane:** Website Implementer → **Owner**, **Copy** and **Reviewer** (the joint hand-over on exactly this
build, §8), **3D** (`WEBSITE_TO_3D_1026_ASSET_ORDER.md`), **API / PM** (§6: the follow-up rule and the calendar states), **Daily**
(§6: the Q&A flow not shown, the take sentence), **Audit** (`ACCEPTANCE_LIST_1010.md` §F10).
**Order:** the owner's "R24 — konsolidierter Abschlussauftrag für Gestaltung und Verkaufserlebnis" of 26.10. (§1–§8), on the base
`WEBSITE_R24 = 596679b / dpl_CCgn42YAPWwoMT3HKMnSrj4GQZHi`. The three screenshots named in the order (092656, 092709, 092912) did
not reach the website lane's machine; the findings were taken from the order's words and reproduced on `596679b` (§2, "before").
**Status:** implemented and awaiting independent technical and final audit. Simulation (headless Edge) and the owner's view are
reported apart (§5, §7). No design verdict is given here; no "closed" is claimed for anything the owner, Copy or the Reviewer
still has to look at. Nothing on the production domain was touched.

```
WEBSITE_R24B         = a945fa9 dpl_Ez3cribfS2nvd5HwMs39ikdV6iWy   (presentation build, mode stub)
WEBSITE_R24B_STAGING = a945fa9 dpl_6yfhB3L7m64Z66mSqczrocHr1vPk   (onboarding build, mode staging)
```

| | |
|---|---|
| Presentation build | https://nuovasolution-design-preview-2x7bx8vz8-nuovasolajs-projects.vercel.app (`/es`, `/en`); `/api/build` → `mode: stub` |
| Staging-backend build | https://nuovasolution-staging-preview-b1hg8802s-nuovasolajs-projects.vercel.app; `/api/build` → `mode: staging` |
| Code | `f576a8f` (the closing order, 26.10.) + `a945fa9` (Copy's Y-1…Y-4 of 26.10. on it: Daily's sentence for a taken task everywhere, the app-language point, the hand-over row recorded with its two-part state, "están registradas" in A); both with an explicit pathspec; Copy's `2563ea3` and the Reviewer's `d94832d` lie between them untouched |
| Before | `596679b` / `dpl_CCgn42YAPWwoMT3HKMnSrj4GQZHi` (`WEBSITE_R24_RETURN_v1.md`) |
| Browsers and devices really checked | headless Edge (Chromium) at 375 × 812 and 390 × 844 (mobile emulation), 1024 × 900, 1366 × 768, 1440 × 900, 1920 × 1080; reduced motion emulated; **no Safari, no iPhone, no real phone, no real mail client** (§7) |

## 1. Finding → change → visible evidence → remaining dependency (the order's table, §8.1)

| # | Finding (order) | Change on this build | Visible evidence (`evidence_2026-10-26b/`) | Remaining dependency |
|---|---|---|---|---|
| 1.1 | Hero: dark hills and a straight light edge; four layers with a relation to NuovaSolution | Four layers as one scene (`hero-world-layers.tsx`, `hero-world.tsx`, `globals.css` "hero world"): **1** the dusk sky with one warm glow over the sea and the stars; **2** architecture, drawn in the house tokens: a far shore of dark houses in the haze behind the water, and in front a hillside of Mediterranean villas with whitewashed walls in the terrace's light (a set-back upper floor with roof terrace and pergola at the left, low houses with the pool behind the panel, a cantilevered floor with a louvred screen at the right, cypresses, lit openings); **3** the panel; **4** the stone terrace the panel stands on, the page's canvas colour (`#fbfaf7`, the same to the digit as the story's), with its pavement joints in perspective and a low parapet at each side. The ridges, the scrub and the ivory band are gone. On scroll the far shore lags most, the villas a little, the terrace runs ahead, the panel comes upright; the words stay. Reduced motion: nothing moves | `after/hero-top-1366.png`, `after/hero-mid-1366.png`, `after/hero-top-1440.png`, `after/hero-1024.png`, `after/hero-m390.png`, `after/hero-m375.png`, `after/hero-en-1440.png`; before: `before/hero-top-1366.png` | the owner's view of the scene (§7) |
| 1.2 | The panel understandable earlier: at 1366 × 768 a cut of the enquiry **and** the result on the first screen | A short-window rule (`≤ 820 px` high, `≥ 1024` wide): the headline one step smaller (display-l, not unreadable), the lead at 17 px on two lines, the buttons 48 px, the stage 30 px under the words, the lean 7°/6 px. Measured at 1366 × 768: enquiry bubble bottom 742 px, the record's first field ("Busca") top 703 px, both inside 768 | `after/hero-top-1366.png` | — |
| 1.3 | Mobile composed on its own | On the phone the side villas and the parapets are dropped (`.hw-side`), the far shore and the roofs behind the panel stay small above it, the terrace is shorter; the panel stacks (conversation, then the record) | `after/hero-m390.png`, `after/hero-m375.png`, `after/hero-edge-m390.png` | — |
| 2 | Hero → story: a visible cut (092656); no bar, no new divider, no grey fog; a still mid-way must look right; slow, fast and backwards | The hero's lower ground is the story's canvas colour; the dark of the hero is the sky above the villas' skyline, the villas' feet dissolve into the floor (a mask), the parapets dissolve toward the viewer; the scene behind the panel fades as it leaves (`--dissolve`, driven by the scene's own scroll measure, so every scroll position is a lighter version of the same picture). Nothing sticks over the navigation (the layers live inside the hero's `overflow: hidden`) | `after/hero-edge-1366.png` (still, mid-way), `scroll/hero-to-story-1366.mp4` (real time: slow down 3.2 s, back up 1.6 s, fast down 0.7 s; 181 frames over 7.84 s, the browser's own frame timestamps; `scroll/hero-to-story-m390.mp4` the same on the phone, 313 frames over 7.83 s), before: `before/hero-edge-1366.png` | the owner's view |
| 3 | Arrival cards (092709): competing lines, too tall, the listing card stretched, nested frames, dots after names, clipped chips on the phone; arrivals once, then still; the count | One list in one frame with hairlines between rows (`.arrivals`); the main line = name + concern (new `concern` per enquiry), the quiet second line = channel · time · language, the state in its own column at the right and under the text where the list is narrower than 540 px (container query) or the phone; no dot after the name; the listing card as tall as its content (`self-start`). Each row arrives once (AnimatedList), its state appears 0.5 s later ("Llega" → "Respondida" / "Llamada atendida" / "Espera a una persona"); then nothing moves; "Reproducir otra vez" restarts this list only. The count: "las cuatro tienen ficha: dos con respuesta escrita, una llamada atendida, y el email en alemán espera a una persona" — "Anotada" is gone, the call is "atendida" (a prototype, stated in the state line) | `after/story-a-1366.png`, `after/story-a-1024.png`, `after/story-a-m390.png`, `after/story-a-m375.png`; before: `before/story-a-cards-1366.png`, `before/story-a-cards-m390.png` | Copy: the new concern lines and the count sentence (§6) |
| 4.1 | 3D (092912): four equal small boxes; a larger main view with depth | The main view above the steps: the whole house turning, 16:9 across the content width, its words beside it from 1024 px (`.model3d-main`); the four steps under it, smaller: Plano → Modelo → Vacío/amueblado (the handle kept) → **Entrega** with the short living-room ride (8 s, the earlier `living-camera-ride.mp4`, restored from `deae52a^`) | `after/model3d-1366.png`, `after/model3d-steps-1366.png`, `after/model3d-m390.png`; before: `before/model3d-1366.png` | the 3D lane's clean take (§3) |
| 4.2 | The house recording 15–20 s, clean turn, short floor change, no long repeats; labels and controls hidden; starts at 0:00 with a fitting frame; no hectic speed-up | Cut from the 3D lane's recording: seconds 2.2–22.7 (the viewer loaded, the house on its light ground from the first frame; one full turn of both floors, the switch to the ground floor and 3 s of its half turn), **20.4 s**, every presented frame once at the recording's own media time, 25 fps constant, the last 0.6 s fading to the frame's ground; the poster is the cut's first frame. **Labels and controls are still in the picture**: they are burnt into the recording and cannot be removed on the website; the caption says so ("se ven los nombres de las estancias y los mandos del visor"); the clean take is ordered (§3) | `after/model3d-1366.png`; frame timing `checks/frametiming-house-turn-es.json` | 3D: the marketing take without chrome from the corrected run |
| 4.3 | Stutter: in the source or in playback? | **Measured** (headless Edge, `requestVideoFrameCallback`, every presented frame's media time): the source `clip_desktop_es.webm` presents 1250 frames at an even 40 ms (25 fps), no gap over 80 ms → the stutter was **not** in the source. The website's earlier `house-turn-es.mp4` had 1330 frames counted at 30 fps on 44.3 s: 12 % fast, frames repeated → the stutter came from the website's conversion. The new file: 512 frames, every gap 40 ms. Playback stutter on the owner's machine (decoder, display) is not measurable here and stays open | `checks/frametiming-source-es.json`, `checks/frametiming-house-turn-es.json` | the owner's eye on his machine |
| 4.4 | No invented interactivity; no viewer link without a released public link | The videos stay videos (native controls, poster); no viewer link (none is hosted); the compare handle is the one real interaction | — | Hosting T3/R20-7 for a hosted viewer |
| 4.5 | Model corrections stay with 3D; corrected assets bound by version | `handoff_2026-10-25` holds only a README with placeholders (`⟦RUN⟧`); no corrected files exist on the 3D machine's handoff folder; the website shows the 23.10. run and says so in the main view's caption. The bundled order: `WEBSITE_TO_3D_1026_ASSET_ORDER.md` (camera, duration, no chrome, formats, ES/EN, the ride from the corrected room) | — | 3D's delivery; then the files replace under the same names and are bound by sha256 here |
| 5 | Motion with a purpose: arrivals, record fields, alert, take, state change; press/focus/touch response; no hover-only content; no layout jumps; reduced motion; off-screen videos pause; no parallel clips | One system: the hero's sequence (enquiry → reply → record fields → priority → next step), the arrivals' state change, the task's take → propose → done with the appointment steps changing (§7 of the order, row 7.6), the follow-up reply. Every control answers a press the same way (`:active` scale 0.985, hover lift), nothing reveals content on hover only, nothing moves after a scene has settled. Videos: `media-video.tsx` — `preload="none"` until near the window, pause when leaving it, and when one plays every other pauses (checked: play A, play B → A paused; scroll away → B paused). Reduced motion: every state stands at once | `checks/master-check.json` → `r24b-findings` (videos) | — |
| 6.1 | Customer record: name/role → search → budget → language → priority with reason → next step; nothing invented | The hero's record: "Laura Serrano · compradora", Busca, Presupuesto, Escribe en, **Prioridad**: "Consulta importante · aviso por email a tu equipo · Motivo: nombró inmueble, zona y presupuesto" (the proven e-mail alert with its reason), **Siguiente paso**: "una persona de tu equipo le confirma los datos del piso y le propone la visita" (a person's step). No score, no cross-channel merge, no new capability | `after/hero-mid-1366.png` | Copy: the priority and next-step wording (§6) |
| 6.2 | AI Sales Agent: concrete helpful handling; the long AI notice must not dominate; disclosure kept | `ConversationView`: the notice complete but as a quiet 12 px line inside the reply, and under the conversation "Anotado en la ficha: Uso: vivienda habitual · Plazo: quiere visitar la semana que viene" (what the reply noted) | `after/platform-ai-sales-agent-1366.png`; before: `before/platform-ai-sales-agent-1366.png` | — |
| 6.3 | Lead Intelligence: how a further message adds to the record | New `RecordGrowView`: the record with "Domingo · el primer mensaje" (Busca, Presupuesto) and "Martes · el segundo mensaje, en la misma ficha" (Uso, Plazo, each marked "añadido el martes"); foot: whoever opens the record on Tuesday sees both without asking | `after/platform-lead-intelligence-1366.png`; before: `before/platform-lead-intelligence-1366.png` | Copy (§6) |
| 6.4 | CRM: saved information and history | New `RecordHistoryView`: the four saved fields and "Historial" with five dated entries (her message, the reply with the record update, the alert to Elena, her second message, the reply), all proven kinds | `after/platform-crm-1366.png`; before: `before/platform-crm-1366.png` | Copy (§6) |
| 6.5 | Daily: a short Q&A flow next to the tasks, if Daily releases it | **Not shown**: Daily has released no Q&A flow; the page keeps the task list (R24) and claims no assistant conversation | — | Daily's release, then a view |
| 6.6 | Social: preparation, human approval, publication, interest; repeated comments not as ever-new leads | The flow stands (draft → approved by you → published → the comment → the reply by a person → the next step). Wording changed: a comment lands "en la ficha de quien lo escribe" and "si vuelve a comentar, se añade a la misma ficha"; "contacto nuevo" per comment is gone | `after/social-1366.png` | Copy (§6); Social for the record rule |
| 6.7 | "Datos sintéticos" is internal; a customer wording like "Ejemplo ilustrativo" | Every product view and caption says **"Ejemplo ilustrativo"** / "Illustrative example" (dictionaries es/en, `product-views.tsx`); the demo marks stay, once per surface | `after/platform-*.png` | Copy: confirm the wording (§6) |
| 7.1 | Hero confirms listing facts and announces files while "en preparación" below | The reply confirms nothing and announces no file: "¡Hola, Laura! Anoto dos dormitorios con terraza en Estepona y hasta 320.000 €. Una persona de la agencia te confirma lo de la terraza y el garaje. ¿Buscáis vivienda habitual o segunda residencia?" — the proven pattern of story B; the state line keeps Copy's "Respuestas con datos del inmueble: en preparación" | `after/hero-mid-1366.png` | Copy (§6) |
| 7.2 | Packages page: "Todos los planes incluyen … las tareas" while tasks are not bookable | "Todos los planes incluyen las respuestas y la ficha; las tareas del equipo están en preparación. El CRM está incluido desde el principio." (EN alike) | `after/packages-1366.png` | Copy (§6; the line was D-30) |
| 7.3 | Home promises the cost is written here while prices come per offer | Trust lead: "El precio te lo decimos para tu agencia antes de acordar nada; lo que pasa con los datos está escrito aquí." | `after/trust-1366.png` | Copy (§6) |
| 7.4 | Follow-up demo: e-mail, at most weekly; the last technical rule was WhatsApp, at most daily | The follow-up goes on **WhatsApp**, the channel Laura wrote on and consented to (R24 PROMPTS block 8 / H14: "Owner-Handy empfängt 1 Nachricht", E-FU3 consent by the owner's number); the message is a WhatsApp bubble with the two listing cards and one question; Laura's one-line reply is the demo action and lands as a request. **No frequency figure** on the page any more ("un seguimiento por inmueble nuevo, nunca repetido, dentro del horario de contacto de tu agencia"): the "at most daily" rule is not written in any document the website lane holds; API/PM confirm it in writing, then the footer says it | `after/story-e-1366.png` | **API/PM**: the written follow-up rule (channel, maximum frequency, R4 hours) |
| 7.5 | Daily's statement on the taken task | Unchanged (Copy's X-9/X-10 as the Q-4 proposal); Daily's confirmation still open | — | Daily |
| 7.6 | Calendar must distinguish request, proposal, human confirmation, booking | In D under the morning list: "La cita, paso a paso" with four states that follow the task — Petición (done from the start), Propuesta (done after "Proponer la hora"), Confirmación (done after "Marcar como hecha"), En la agenda (the calendar, "en preparación", ring mark); E keeps "una petición no es una cita"; the platform and the ladder keep "Calendario · En preparación" | `after/story-d-1366.png` | the owner's KALENDER line (API's sheet) |
| 7.7 | Missing prices and package limits as ONE owner decision point | §6 below, one block | — | owner |

## 2. Before / after (the order's §8.2)

| Place | Before (`596679b`) | After (this build) |
|---|---|---|
| Hero | `before/hero-top-1366.png` | `after/hero-top-1366.png`, `after/hero-mid-1366.png` |
| Transition | `before/hero-edge-1366.png` | `after/hero-edge-1366.png`, `scroll/hero-to-story-1366.mp4` |
| Arrival cards | `before/story-a-cards-1366.png`, `before/story-a-cards-m390.png` | `after/story-a-1366.png`, `after/story-a-m390.png` |
| 3D | `before/model3d-1366.png` | `after/model3d-1366.png`, `after/model3d-steps-1366.png` |
| AI Sales Agent | `before/platform-ai-sales-agent-1366.png` | `after/platform-ai-sales-agent-1366.png` |
| Lead Intelligence | `before/platform-lead-intelligence-1366.png` | `after/platform-lead-intelligence-1366.png` |
| CRM | `before/platform-crm-1366.png` | `after/platform-crm-1366.png` |
| Daily Tasks | `before/platform-daily-assistant-1366.png` | `after/platform-daily-assistant-1366.png` (the view unchanged, the label "Ejemplo ilustrativo") |

## 3. 3D: what is bound to this build, and what is ordered

| File on the website | Source | sha256 (this build) |
|---|---|---|
| `public/media/3d/house-turn-es.mp4`, `house-turn-en.mp4` | cut 2.2–22.7 s of `handoff_2026-10-23/turn/clip_desktop_{es,en}.webm`, run `run-20261024-132933-house` | `dcd16d332260…` (es), `fa859f4fe188…` (en) |
| `house-turn-poster-{es,en}.webp`, `house-both-floors-{es,en}-1600.webp` | the cut's first frame | `9ff105bdd3c1…` (es), `5e13e6f33932…` (en); the poster and the still are the same frame |
| `living-empty-1200.webp`, `living-furnished-1200.webp` | `handoff_2026-10-23/pair/` | unchanged since `deae52a` |
| `living-camera-ride.mp4`, `living-ride-poster.webp` | the 2026-10-02 living-room study (restored from `deae52a^`) | `c3c56a9c3e6b…`, poster `3a64afa7ec06…` |

The 3D lane's 25.10. README announces a corrected run (`⟦RUN⟧`) with a film that includes the zoom; the folder holds no files yet.
The one bundled order is `WEBSITE_TO_3D_1026_ASSET_ORDER.md`. Until it is delivered and the owner releases the run, the website
shows the 23.10. run and says in the caption that the viewer's names and controls are visible.

## 4. Pages and devices really checked (the order's §8.4)

Headless Edge (Chromium 141) only. Pages: `/es`, `/en` (home, every chapter, social, 3D, packages, trust), `/es/platform`,
`/es/platform/{ai-sales-agent,lead-intelligence,crm,daily-assistant}` and the EN twins, `/es/packages`, `/es/faq`,
`/es/preview/weekly`, `/es/preview/brief`, `/es/app/reports` (stub session), `/es/social/post`, the 55 routes of the route scan
and the 1064 links of the link matrix. Widths: 375 × 812 and 390 × 844 (mobile emulation, 2×), 1024 × 900, 1366 × 768,
1440 × 900, 1920 × 1080. Hero at the top, mid-way and at the transition; the scroll slow, fast and backwards (the recording).
Reduced motion emulated. 3D: the handle moved by keyboard, the video's first frame, play, pause, one at a time, full screen
not simulated (native control). CTA paths: every module page's primary button to `/signup`, the hero's second button, the
ladder's button. Mail previews: both without login. **Not checked:** Safari, iPhone, any real phone, a real mail client, a real
projector or TV; the owner's own machine's video decoding.

## 5. Technical checks on the final build

| Suite | Result |
|---|---|
| `scripts/design/master-check.mjs` (33 checks, new: `r24b-findings`) | 33/33 on `a945fa9` / `dpl_Ez3cribfS2nvd5HwMs39ikdV6iWy` (`checks/master-check.json`, `checks/master-check.log`; full sha256 of the media in `checks/media3d-sha256.txt`) |
| `scripts/design/contrast-check.mjs` | 0 comparisons below the floor (`contrast/`) |
| `scripts/e2e/route-scan.mjs` | 55/55 (`routes/`) |
| `scripts/e2e/link-matrix.mjs` | 1064/1064 on 36 pages (`links/LINK_CTA_MATRIX.md`) |
| `next lint`, `tsc --noEmit` | clean |
| Staging build | `/api/build` → `f576a8f`, `mode: staging` (`staging/api-build.json`); `/es/preview/weekly` → 404 (the previews stay stub-only) |

## 6. Open, by lane (few, named)

**Owner, ONE decision point — prices and package limits (the order's §7, last paragraph).** The website shows no price and no
figure anywhere; these places wait for one line each from the owner (via API's PAKETE/PREISE/TRIAL sheet): (a) the packages page
"Precio para tu agencia" block and the ladder's foot ("Sin precios…"), (b) the Enterprise card's lines and whether it carries an
available line, (c) the limits per package (enquiries, users, channels) that the ladder's rows would carry, (d) the trial's scope
("Essential", 14 days) as the public line. Nothing was invented; the rest of the order did not stop for it.

**Copy (WORKING lines of this build, for its check):** the hero reply (7.1) and the record's "Prioridad"/"Siguiente paso" lines
(6.1); the four `concern` lines and the count sentence of A (3); "Llega" / "Llamada atendida" / "Espera a una persona"; the
appointment steps of D (7.6); the WhatsApp follow-up lines and the footer without a frequency (7.4); the social lines (6.6);
"Ejemplo ilustrativo" (6.7); the packages baseline line (7.2); the trust lead (7.3); the 3D main view's title, line and captions
(4); the Lead Intelligence and CRM view words (6.3, 6.4) and "Anotado en la ficha" (6.2).

**API / PM:** the written follow-up rule (channel, maximum frequency, R4 hours) → the E footer. **Daily:** Q-4 confirmation; a Q&A
flow only if released. **3D:** the bundled asset order. **Reviewer + Copy:** the joint check on this build (§8). **Hosting:** H16
unchanged. **Legal:** E14 unchanged.

## 7. Said plainly

- "Design PASS" of earlier rounds is a technical measure; whether background, transition and staging meet the owner's wish is
  the owner's verdict on this build, on his screen.
- The scroll recording is a headless browser's screencast with the browser's own frame timestamps (no time-lapse); it is not a
  recording of the owner's machine.
- The 3D recording still carries the viewer's labels and controls; the website cannot remove them. The clean take is ordered.
- The stutter was the website's conversion, not the 3D source; the new file is measured even. Playback on the owner's machine is
  not measured here.
- No frequency figure for the follow-up stands on the page until API/PM write the rule; the channel is WhatsApp per the
  follow-up test design (the owner's phone receives it).

## 8. Hand-over to Copy and Reviewer (joint, this build only)

Build: `WEBSITE_R24B` above (`a945fa9`). Copy's Y-1…Y-4 are applied on it (`WEBSITE_COPY_SYNC_1026_RETURN_v1.md`): Y-1 in `capabilities.ts` (point, scenario), `product-views.tsx` (caption) and story D's line under the morning list; Y-2 in `platform-map.ts` (state partial with the two-part line); Y-3 in story A's `after` and `result` (merged with the owner's count of 26.10. §3: "están registradas: dos con respuesta escrita, una llamada atendida con nota, y la que llegó en alemán sin respuesta automática"); Y-4 as a point of the daily page. Check §1 row by row, the WORKING lines of §6, the hero at 1366 × 768 and on the owner's cut, the
transition slow/fast/backwards, the arrivals once and then still, the 3D main view's first frame and 20 s, Lead Intelligence and
CRM views, both mail previews, `/es/packages` baseline line, the trust lead. The Reviewer's technical pass and Copy's text pass go
into one document each on this commit; the owner's phone steps are on `OWNER_ACCEPTANCE_CARD_1010.md`.
