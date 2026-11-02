# WEBSITE · the owner's order of 30.10. (design acceptance of 3dbafd6 withheld) · Stage 1 — hero with transition + the central product sequence

**State:** `2026-11-02` · **Lane:** Website Implementer → **Owner** (the interim acceptance "Stufe 1 OK" before stage 2), **Copy** (the WORKING
lines of the hero and the sequence, §4), **Reviewer** (reading along; RV6 only after stage 2 on the build named then), **Audit**.
**Order:** the owner's "R26 · Website/Redesign · Gestaltungsabnahme 3dbafd6" of 30.10. (stage 1 = points 1–2 with the proof set of §Abschlussnachweis).
**Status:** implemented and awaiting the owner's interim design verdict and, after stage 2, the independent technical and final audit.
The technical measurements stand in §3; the design judgement is the owner's, on the owner's screen. No "10/10" here.

```
WEBSITE_STAGE1          = 845429e dpl_8WBTUP8TGPDX3snnMp2zM9YTeru1   (presentation build, mode stub)
WEBSITE_STAGE1_STAGING  = 845429e dpl_FYMb95f7MwJHmjYacsro2o31eeuJ   (onboarding build, mode staging; not part of the stage-1 verdict)
```

| | |
|---|---|
| Preview link for the verdict | https://nuovasolution-design-preview-9p7v728tv-nuovasolajs-projects.vercel.app/es (English: `/en`) · `/api/build` → `845429e`, `mode: stub` |
| Code | `3dbafd6` (WEBSITE_R26) → `401afdc`, `56123d2` (docs: R26 return, Copy's RV5) → `7d41872` (this stage) → `845429e` (the hero's record and object card read the light text tokens: the first stage-1 build `dpl_HJwHZxe5GE2CgC2suSnjX3UTaA13` measured 20 contrast comparisons below the floor, all on the object card); explicit pathspecs; Copy's and the Reviewer's files untouched |
| What stays as on 3dbafd6 | everything from the story chapters down (A–F, social, 3D, packages, trust, FAQ), the module pages, the example report, the legal pages, the app area. The technical proofs of 3dbafd6 (master 33/33, routes 55/55, links 1064/1064, contrast 0, zoom 200 %, fra1) and the E-FU2 test page on nuovasolution.com (`dpl_4xQt97aFfKzNBpsmXzKxNwZeHTCq`) are untouched; no deploy to the old site's `main` |
| Browsers really used | headless Edge (Chromium) at 1440 × 900, 1366 × 768, 1024 × 900, 768 × 1024 and 390 × 844 (mobile emulation, 2×); reduced motion emulated. **No Safari, no iPhone, no real phone.** A headless browser scrolled and clicked, not a person |
| Evidence | `docs/website_redesign/evidence_2026-11-02_stage1/` — `desktop/` (1440, 1366, 1024, 768, EN), `phone/` (390 at 2×, every step and its artefact), `recordings/` (four files, §3), `checks/` (the suites and the font measurement on this build) |

## 1. Point 1 — the hero and the transition

| The owner's point | Implemented on `7d41872` | Where to look |
|---|---|---|
| A high-grade spatial product depiction with recognisable layers (app surface in front, record and object offset behind, a property picture as the depth) | Four layers that read as one space. **Depth:** the living room of the listing Laura asks about (EST-204, the same licensed photograph as its card, `hero-room-1800/900.webp`), far back, toned to the dusk, slightly soft; it lags most behind the page on scroll. **Object:** the listing card of that flat as a low row (picture, title, price, place, facts, "Los datos del piso los confirma una persona de tu equipo"), set back at the right and lowest, smaller, lagging. **Record:** Laura's customer record (name/role → search → budget → language → priority with its reason → next step), a step lower than the app's head and 14 px behind its edge (its padding keeps every word clear), lagging a little. **App surface:** in front, leaning 7° and coming upright on scroll: the situation line, the question, the reply, the limit of today. The record and the object fill in sequence after the reply (the same CSS sequence as before, "Reproducir otra vez" restarts it) | `desktop/01-hero-first-screen.png`, `02-hero-stage.png`; the layers' motion in `recordings/desktop-1440-normal.mp4` (0–9 s) |
| A flowing transition from the dark hero into the light story, no hard edge | The photograph is masked so it dissolves into the page's canvas (nothing but the page's own ground remains under it); the light pool rises from 150 px under the stage's head to the full canvas, and is never thinned; the section's own ground switches to the canvas under the pool's full part; the lower half of the three surfaces stands on the canvas, and the sequence begins on the same canvas (no band, no bar, no different ivory). The grey strip of the owner's picture 02 (the pool thinned to 65 % over the dark ground) is gone: the pool is opaque at the foot | `desktop/03-hero-to-sequence.png`, `phone/04-hero-to-sequence.png`; `recordings/*` (the scroll out of the hero) |
| The hero's design language runs through the page | The sequence uses the hero's surfaces (the WhatsApp bubbles, the record card, the listing card, the alert block), its tokens, radii and shadows, and adds the three actor marks that the hero's "Nuova · asistente de IA" and "una persona de tu equipo" already imply. The rest of the page is unchanged until stage 2 | `desktop/04-sequence-head.png` |
| Five-second test: for whom, what, the benefit | Eyebrow "Para agencias inmobiliarias en España" (now 14 px); headline "Mientras enseñas una vivienda, Nuova atiende tus consultas."; lead (WORKING, for Copy): "Responde a lo que llega por WhatsApp y email, guarda lo que busca cada cliente y lo pasa a la persona de tu equipo que toca. Menos consultas que se quedan sin atender." On the first screen at 1366 × 768 the words, both buttons, the enquiry and the record's first field stand (measured: enquiry bottom 734 px, first record field top 686 px) | `desktop/21-hero-1366x768.png`, `phone/01-hero-first-screen.png` |
| The phone's own composition | 390 px: the words, then the app surface full width with no lean, the record inset and lifted, the object card as a row; no depth drift of the stacked cards (they would jitter, not deepen); the photograph still the depth behind the app's head | `phone/01…04-*.png`, `recordings/phone-390-normal.mp4` |
| The tablet | 768–1023 px: the app surface full width, the record and the object side by side under it; from 1024 px the two-column stage | `desktop/22-hero-1024.png`, `23-hero-768.png` |

## 2. Point 2 — the central product sequence

"La consulta de Laura, paso a paso" now follows the hero directly as the main demonstration (not the small box at the foot of chapter D, which stays
as the appointment's detail until stage 2). Six steps on one spine, one clock, three actor marks:

| # | Clock | Who acts (the mark) | Step | The agency's benefit (one sentence) | State line |
|---|---|---|---|---|---|
| 1 | martes 11:20 | the customer (L, outlined champagne) | Laura asks about a flat while Marcos is at a viewing — her WhatsApp message | the enquiry is recorded the moment it arrives, outside hours too | Disponible hoy: WhatsApp y email |
| 2 | martes 11:21 | Nuova, automatic (sage, sparkle) | Laura gets a reply while Marcos is still at the viewing — typing, then the reply; "Nuova confirms no listing facts: a person does" | fewer enquiries left unattended | Disponible hoy, en español; otro idioma: nada automático |
| 3 | martes 11:21 | Nuova, automatic | what she asks for goes on her record — the record fills field by field, then the priority with its reason | the leads you already have are worked better | Disponible hoy: una ficha por consulta |
| 4 | martes 11:25 | Nuova, automatic | two flats from the portfolio fit — the criteria, the two listing cards, the proposal | proposals only from your portfolio; no availability claimed without the source | Implementado; sin activar para ninguna agencia |
| 5 | miércoles 08:30 | Nuova (the alert of 11:21) + Elena, agency (takes it) | Elena knows what to handle first and why — the e-mail alert, her list with Laura first, "Tomada por Elena · 08:55"; a link to the interactive demo in chapter D ("Prueba la demo: toma la tarea tú mismo") | one task, one person, one reason | Disponible hoy: el aviso por email (sin horario de oficina). En preparación: la lista de tareas |
| 6 | miércoles 08:58 → 09:02 | Elena, agency (proposes) + Laura, customer (accepts) | the viewing is agreed and written down — Elena's WhatsApp, Laura's "Sí, el jueves a las 10:00 me viene bien.", "Visita · jueves 10:00 · en la ficha de Laura y en la lista de Elena", "Marcada como hecha por Elena · 09:02" | a next step with a date and a reason, written where the team sees it | La propuesta y la confirmación las hace una persona. En preparación: la lista de tareas y la agenda |

The animation explains the step and nothing else: when a step enters the window its artefacts settle in their order (the typing before the reply, the
record's fields one after another, the cards after the criteria, the task after the alert, Laura's answer after Elena's message), with time to read;
the reader's scroll sets the pace, nothing auto-advances, nothing moves after a step has settled. Everything is in the document from the first
paint at a quiet 45 %; with reduced motion and without JavaScript every artefact stands at full strength at once. The legend of the three marks
stands at the head of the sequence; every step carries its marks as pills. The clock agrees with the chapters (11:20 → 11:21 → 11:25 → 08:30 → 08:58
→ 09:01 → 09:02); the example report's "Confirmar con Laura" contradiction (the owner's point 6) is stage 2.

Not built, said as such: the owner wrote "Nova" once; the product keeps its name "Nuova · asistente de IA" everywhere. No new figure, no new
promise: the state lines are those of the chapters (ACCEPTANCE_LIST_1010.md), the alert's production condition (HA1 → v3) goes into the claims
register of stage 2.

## 3. Measured on `dpl_8WBTUP8TGPDX3snnMp2zM9YTeru1`

| Check | Result |
|---|---|
| `scripts/design/master-check.mjs` (34 checks: the 33 of R26 following the new layers + `stage1-hero-sequence`) | 34/34 passed → `checks/master-check.{log,json}` (locally against the dev server 33/34: `social-b` reads the deployed origin's covers and is known to fail only locally) |
| `scripts/design/contrast-check.mjs` | 0 comparisons below the floor (0 distinct) → `checks/contrast-results.json` (the first stage-1 build had 20, all on the hero's object card; fixed in `845429e`) |
| `scripts/e2e/route-scan.mjs` | 55/55 route checks passed → `checks/route-scan.json` |
| Smallest font sizes, hero and sequence (owner point 8, measured on visible text, decoration excluded) | hero: smallest 14 px (26 elements at 1440, 25 at 390: metas, times, labels, chips, the state line, the replay control, the eyebrow), then 15, 16, 17, 19 px and the headline (67.8 px at 1440, 38.4 px at 390); sequence: smallest 14 px (49 elements: times, actor pills, labels, states, metas), then 15 (35), 16 (22), 17 (7), 19 (3), the step titles 30 px / 22.3 px, the heading 54.2 px / 32.2 px → `checks/fonts-1440.txt`, `checks/fonts-390.txt`. Nothing under 14 px in either section; running text 15–17 px. The rest of the page is measured in stage 2 |
| Recordings (real time, the browser's own frame timestamps, a visitor's scroll from the top through the hero and the whole sequence) | `recordings/desktop-1440-normal.mp4` 1011 frames over 37.8 s · `desktop-1440-reduced-motion.mp4` 739 frames over 37.4 s (prefers-reduced-motion emulated: every artefact stands at once, no layer moves, the app surface keeps a fixed light lean) · `phone-390-normal.mp4` 1050 frames over 44.2 s · `phone-390-reduced-motion.mp4` 915 frames over 39.6 s (the phone's page is longer: each step's artefact is scrolled to as well). Nothing sped up: a frame stands in the file as long as it stood on screen |
| `tsc --noEmit`, `next lint` | clean |

Stage-1 check in detail: four layers present; the record right of the app's centre and behind it (z); the object card behind the record, lower and never
under it; the photo masked; the five-second words; six steps; legend of three; actors per step `customer | nuova | nuova | nuova | nuova,agency |
agency,customer`; a benefit, a state and an artefact in every step; quiet 0.45 before view and 1 once in view; nothing under 14 px in the hero or
the sequence.

## 4. For Copy (WORKING lines of this stage)

The hero lead; the story's new eyebrow/headline/lead ("Con más detalle · Cada paso, de cerca"); everything in `lib/content/home-sequence.ts`
(the legend, the six titles, lines, benefits and states, the artefact labels, Laura's acceptance "Sí, el jueves a las 10:00 me viene bien.", the
closing sentence); the object card's label and note ("El inmueble de la consulta · tu cartera", "Los datos del piso los confirma una persona de tu
equipo"). The claims behind them are the chapters' state lines, unchanged.

## 5. Said plainly

- The design verdict is the owner's. Stage 2 (points 3–8) starts only on "Stufe 1 OK".
- On 30.10. a second session of this chat executed the same stage-1 order in the same working tree in parallel; its CSS for these components and its
  clean-up of two collided text files were on disk uncommitted, were integrated here and are part of `7d41872`. Nothing of another lane was committed.
- Safari and a real iPhone were not used; the 390 px pictures and recording are an emulation.
- The dev server's screenshots of 30.10. fell back to a serif face (the webfont did not load there); the deployment's pictures in `evidence_2026-11-02_stage1/`
  are the ones that count.
