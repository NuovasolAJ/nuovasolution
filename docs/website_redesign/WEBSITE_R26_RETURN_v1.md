# WEBSITE R26 — the owner's binding closing order of 27.10. (design, understanding, conversion) + R26 ZIEL 1/ZIEL 2 — one named build

**State:** `2026-10-30` · **Lane:** Website Implementer → **Owner** (the six pictures, §2; the card `OWNER_ACCEPTANCE_CARD_1010.md`),
**Copy** and **Reviewer** (RV5 jointly on exactly this build, §7), **API / PM** (ZIEL 1, `WEBSITE_TO_API_PM_1030_PRUEBA_OBJETO_URL.md`),
**3D** (`WEBSITE_TO_3D_1030_ASSET_ORDER_v2.md`), **Audit** (`ACCEPTANCE_LIST_1010.md` §F11).
**Orders:** the owner's "VERBINDLICHER WEBSITE-ABSCHLUSSAUFTRAG" (27.10., §1–§12) and the audit's R26 block (stand 9f59c8b).
**Status:** implemented and awaiting independent technical and final audit. Three judgements stay apart: the technical pass (§5,
measured), the product promises (Copy's reading, §7) and the design acceptance (the owner's, on his screen). No "10/10" here.

```
WEBSITE_R26         = 3dbafd6 dpl_4Qz1SE8ozqsvtD98swPxf3YrYeGK   (presentation build, mode stub)
WEBSITE_R26_STAGING = 3dbafd6 dpl_4deTgUf5EdY8z1TSFBsuFJMZw8oX   (onboarding build, mode staging)
PRUEBA_OBJETO_URL   = https://nuovasolution.com/es/prueba-objeto  dpl_4xQt97aFfKzNBpsmXzKxNwZeHTCq  (production, the one page)
```

| | |
|---|---|
| Presentation build | https://nuovasolution-design-preview-2368s4mjg-nuovasolajs-projects.vercel.app (`/es`, `/en`); `/api/build` → `mode: stub` |
| Staging-backend build | https://nuovasolution-staging-preview-imcp8cplz-nuovasolajs-projects.vercel.app; `/api/build` → `mode: staging` |
| Code | `a945fa9` (RV4) → `fed3c4d` (merge of `website_r25c`: fra1, MX check, E-FU2, social inbox W1–W6, S2 line, E14 block, v4 deletion text, the furnished picture's alt) → `3dbafd6` (this order); explicit pathspecs; Copy's `b397082` and the Reviewer's `3d21ed2` untouched between them |
| The six owner pictures of 27.10. | `evidence_2026-10-30/before/` (the owner's own captures 110120, 110135, 110142, 110405, 110512 and the follow-up crop from `a945fa9`) → `evidence_2026-10-30/after/01…06-*.png`, the same crops |
| Browsers and devices really checked | headless Edge (Chromium) at 390 × 844 (mobile emulation, 2×), 768 × 1024, 1024 × 900, 1366 × 768, 1920 × 1080, and 683 × 384 at 2× as the 200 % zoom of 1366; reduced motion emulated; keyboard focus by script. **No Safari, no iPhone, no real phone, no real mail client.** The external click-through the owner mentions did not happen on my side either: this is a headless check, not a person clicking |

## 1. Finding → change → checked → dependency (the order's §12 table)

| § | Finding (owner) | Implemented | Checked (`evidence_2026-10-30/`) | Dependent on |
|---|---|---|---|---|
| 2 | The flat villa backdrop with yellow window blocks is not released; one fixed direction: calm background with subtle light, a discreet spatial structure, the large legible product surface, few highlighted results | The villas, the far shore and the terrace parapets are gone (`hero-world-layers.tsx`). Layer 1: the dusk sky toned calm with one soft light low over the sea and the stars. Layer 2: `Structure`, thin lines only — the horizon, the floor's joints converging in perspective, a slim column edge at each side; nothing figurative. Layer 3: the panel. Layer 4: the customer record lifted a step from the panel (`.hero-record-lift`). The floor's light pool under the panel is the page's canvas colour. The same tokens, shadows, radii and motion as the rest of the page | `after/01-hero-villas-1366.png` vs `before/owner-27.10-110120.png`; `after/hero-top-{390,768,1024,1366,1920}.png` | the owner's view |
| 3 | The tablet further forward and up, less lean, more legible content; at 1366 × 768 the headline, the main action and an understandable product cut; the record: name/role → search → budget → language → priority with reason → next step; the hero flows into the first story section; a phone composition of its own; the 21st container-scroll principle without its huge margins | Lean 7° (desktop), 5° on a window ≤ 820 px high, **0° on the phone** (a 2,400 px panel leaning 8° had pushed its head 200 px down — measured, fixed); rise 14 px, scale 0.985 → 1.015; the stage 1,180 px wide and 36 px under the words. At 1366 × 768 the enquiry bubble and the record's first field stand on the first screen (master check `r24b-findings`: enquiry bottom ≤ 768, record field top < 768). The record carries the six items in that order (nothing invented: the priority is the proven e-mail alert with its reason, the next step a person's). The hero's lower ground is the story's canvas colour; the structure and the light fade with `--dissolve` while the panel comes upright; no bar, no cut shadow, no empty scroll stretch (the phone's stage padding 10 px) | `after/hero-panel-*.png`, `after/02-edge-1366.png`, `after/03-edge-wide-1920.png`, `recordings/demo-desktop-1366.mp4`, `recordings/demo-mobile-390.mp4` | the owner's view |
| 4 | One connected animated story: enquiry → record fills → alert → takes → next step; press/focus/touch states; no forced scroll; reduced motion | The hero's sequence (enquiry, reply, record fields, priority, next step), chapter A's arrivals with their states, D's take → propose → done with the appointment steps changing, E's reply: one motion system, nothing moves after a scene settled. The optional card stack of the order was **not** built: the chapters read in the normal scroll (the owner withdrew a deck on 17.10.; the stack would have been a second structure). Reduced motion: every state stands at once | master check `reduced`, `task`, `email-demo`, `r24b-findings` | — |
| 5 | The squeezed follow-up section; cards outside the bubble; conditions in a details area; limits visible; "Tomar"/"Responder" inviting | Chapter E rebuilt: a short WhatsApp message (one question), the two listings as full cards under it (stacked on the phone), Laura's one-line reply as the demo action, the one limit visible ("Sale solo si Laura aceptó recibir propuestas y tú activaste los seguimientos; nunca repetido. Prototipo…"), the three conditions and the footer in a `<details>` block; no card in a card in a card; no font shrunk. Laura is the active case (the hero, B, D); the Kellers, Álvaro and Sofía stand as the compact arrivals list of A and the morning list of D. "Tomar" and "Responder: sí, el jueves también" carry "Prueba la demo", pulse twice on first sight (then never), show hover, keyboard focus and press, change the state at once and can be reset ("Volver a empezar"). No real message or booking: the demo is in the page | `after/06-story-e-1366.png` vs `before/06-story-e-a945fa9-1366.png`, `after/story-e-m390.png`, `after/story-e-details-1366.png`, `after/focus-take-1366.png`, `after/story-d-done-1366.png`, `after/story-e-replied-1366.png` | Copy on the new lines |
| 6 | Shorter texts: benefit headline, two sentences, a demonstration, a next action; the Daily headline split; no internal jargon; Nuova's prework visible; nothing promised that is not proven | Chapter lines cut to two sentences (A, E, F); D's headline "Tu equipo sabe qué atender primero." with a two-sentence line (WORKING, for Copy); the hero's record and the Lead Intelligence view say what Nuova captured, why the enquiry matters and what the person decides; the reply keeps "Una persona de la agencia te confirma lo de la terraza y el garaje" (Copy-confirmed, Q-1); "Ejemplo ilustrativo" once per surface; no tenant/intake/routing/pipeline/gate word on a public page (master check `model3d-packages` internal-word regex) | `after/04-story-d-1366.png` vs `before/owner-27.10-110405.png` | Copy |
| 7 | "Ver el informe completo" must not lead to a login without a preview; a complete public example report | New public page `/es/example-report` and `/en/example-report` on every build: the three figures, a bar chart of four example weeks with traceable values, what is open, the next steps, "Informe de ejemplo · no son datos de ninguna agencia", then "Probar gratis" and "Ya tengo acceso: ver mi informe". Story F's button points there. The real reports stay behind the login (`/app/reports`), read the backend and are untouched; the example page reads nothing | `after/05-story-f-1366.png` vs `before/owner-27.10-110512.png`, `after/example-report-1366.png`, `after/example-report-m390.png` | Copy on the words |
| 8 | 3D: a clean take from the real viewer (no labels, closer, ground → upper → whole, 10–14 s, ≥ 1080p, even), the active floor named outside the video, the ride and the handle kept large, the broker's three-step path, the example mark once | The media swapped to the 3D lane's corrected run `run-20261026-140923-house` (`handoff_2026-10-25`, commit `e196be8`, SHA256SUMS): the pair, the house still, the two recordings cut frame-exact at the source's 25 fps (2.2–22.7 s; 511 frames, every gap 40 ms, `checks/frametiming-house-turn-es.json`), the posters; sha256 of the website files in `checks/media3d-sha256.txt`. The active floor is named under the video while it plays (`MediaVideo cues`: "Las dos plantas" → "Planta baja" at 13.3 s). The broker's path in three steps (send the plan and photos → we clarify and build → the checked presentation by a protected link), no delivery time, no automatic creation. The example mark once above the section, the captions short. **Open asset point, stated as such:** the take still carries the viewer's room names and controls; the clean take is ordered in `WEBSITE_TO_3D_1030_ASSET_ORDER_v2.md`; the kitchen findings O27-1/O27-2 are 3D's, then an asset swap | `after/model3d-1366.png`, `after/model3d-playing-1366.png`, `after/model3d-steps-1366.png`, `after/model3d-path-1366.png` | 3D's clean take |
| 9 | No dialable demo phone numbers, no tel:/WhatsApp links on demo contacts, no real mailboxes | Every demo number is `+34 XXX XXX XXX` (home story, the morning list, the brief preview, the social fixture); no `tel:` or WhatsApp link exists on any demo contact (grep over the content and the pages: 0). The only `mailto:` targets are the owner's own legal contact and the contact page's business address, which stay. No number was dialled or written to | master check `copy-w-rows` (no regrouped number), `links/LINK_CTA_MATRIX.md` (`mail` links listed) | — |
| 10 | Every public ES/EN route: benefit, a fitting view, the current scope, a next action; Daily = the workday, CRM = overview and history, Lead Intelligence = priority and next step; packages before FAQ; "Probar gratis" consistent | Lead Intelligence's view now ends with "Prioridad" (the proven alert, "Nuova no calcula una puntuación") and "Siguiente paso"; CRM shows the fields and the dated history; Daily the task list; AI Sales Agent the conversation with what was noted. The packages stand before the way in and the questions on the home page; no price, limit or green tick added. "Probar gratis" is the one primary action on every page (14 días · Sin método de pago; the trial's behaviour after the 14 days is not stated, because no owner line fixes it) | `after/platform-*.png`, `after/packages-1366.png`, `after/faq-1366.png`, `routes/` (55 routes) | PAKETE/PREISE/TRIAL lines (owner) |
| 11 | Self-check before the report: every public page and demo state, navigation, dropdowns, buttons, FAQ, report, 3D handle, trial entry; 390/768/1024/1366/1920; 200 % zoom; keyboard, focus, reduced motion; videos on demand; real scroll and playback | Done as the suites and the evidence list (§5, §6); the 200 % zoom as 683 px at 2× with the overflow measure (no horizontal overflow); keyboard focus photographed on "Tomar"; reduced motion in the master check; videos `preload="none"` until near, paused off screen, one at a time (`r24b-findings`); the real-time recordings of scrolling and the demo clicks, desktop and phone (`recordings/`). Safari and iPhone: **not checked** | §5, §6 | the owner's real phone |
| R26 | ZIEL 2: `website_r25c`, Copy Z-1a/Z-1b/Z-2, the furnished picture's alt, "Mi agencia" active, R26-j | All in this build: `website_r25c` merged (`fed3c4d`); Z-1a ("sin respuesta automática" in A's result), Z-1b (the Kellers' state "Sin respuesta automática"), Z-2 ("la primera respuesta"); `alt` on the furnished picture (`pairAltFurnished`); "Mi agencia" carries `aria-current="page"` and an underline while `/app…` is open (`session-nav.tsx`); the Instagram deletion paragraph is META_LEGAL_TEXT_FINAL §3 word for word on `/legal/data-deletion` (ES/EN), in the prepared P1 pages and in `LEGAL_PAGES_FINAL_v1.md` §4 (the separate "if you remove the app" paragraph is gone in all three) | `after/nav-mi-agencia-1366.png`, `after/legal-data-deletion-1366.png`, `after/story-a-1366.png` | RV5 |
| R26 | ZIEL 1: the E-FU2 page on nuovasolution.com | **Live** since 30.10.: `https://nuovasolution.com/es/prueba-objeto`, deployment `dpl_4xQt97aFfKzNBpsmXzKxNwZeHTCq`, built from the production site's `main` + exactly one page, one own graphic and two `X-Robots-Tag` headers (branch `efu2-prueba-objeto` @ `e03b5fb`); noindex in the HTML and the HTTP header, not linked anywhere, every other route unchanged, nothing of the new website on the domain. The owner's released values (Nerja, 289.000 €, 2 dorm., 1 baño, 75 m², venta) and "Imagen: propia (NuovaSolution)". Signal `PRUEBA_OBJETO_URL` to API and PM: `WEBSITE_TO_API_PM_1030_PRUEBA_OBJETO_URL.md` | the signal document (headers, status codes, the route list before/after) | API's binding, Hosting's observation |

## 2. The six pictures, before → after

| # | Owner's picture (27.10.) | After (this build) |
|---|---|---|
| 01 | `before/owner-27.10-110120.png` — the villa backdrop with the window blocks | `after/01-hero-villas-1366.png` — the calm sky, the structure lines, the panel with the lifted record |
| 02 | `before/owner-27.10-110135.png` — the cut below the panel | `after/02-edge-1366.png` — the light pool into the story, no edge |
| 03 | `before/owner-27.10-110142.png` — the same at a wide window | `after/03-edge-wide-1920.png` |
| 04 | `before/owner-27.10-110405.png` — chapter D with the full phone number and the long headline | `after/04-story-d-1366.png` — "Tu equipo sabe qué atender primero.", `+34 XXX XXX XXX`, "Prueba la demo" |
| 05 | `before/owner-27.10-110512.png` — "Ver el informe completo" leading to the login | `after/05-story-f-1366.png` → `after/example-report-1366.png` |
| 06 | `before/06-story-e-a945fa9-1366.png` — the squeezed follow-up (the owner's sixth capture did not reach this machine; this is the same section on `a945fa9`) | `after/06-story-e-1366.png` |

## 3. Pages and devices really checked (the order's §11)

All 55 public routes of the route scan (ES and EN: home, platform and the four module pages, packages, trial, contact, FAQ, the
legal pages, the example report, login/signup, the previews, the app routes behind the login) and the 1,064 links of the link
matrix; the demo states of A (replay), B (four channels, the notice), D (take → propose → done → again), E (reply → reset, the
details block), F (the example report), the social strip, the 3D handle (keyboard and pointer, `compare-range`), the videos
(play, pause, one at a time, off-screen pause, the floor cue), the FAQ accordion, the navigation (dropdown, the account link
with a stub session), the trial entry (`/signup` on the stub build). Widths 390, 768, 1024, 1366, 1920 and the 200 % zoom at
683 px; reduced motion; keyboard focus. Headless Edge only; no Safari, no iPhone, no real phone.

## 4. Open asset point (3D)

The house take on the site is the corrected run's recording with the viewer's labels and controls in the picture. The clean
marketing take (no chrome, closer, ground → upper → whole, 10–14 s, ≥ 1080p, even) is ordered (`WEBSITE_TO_3D_1030_ASSET_ORDER_v2.md`)
and replaces the files under the same names when 3D delivers it with run, commit and sha; the kitchen findings O27-1/O27-2 stay
with 3D. This point stays open in this return by the owner's own rule.

## 5. Technical checks on the presentation build

| Suite | Result |
|---|---|
| `scripts/design/master-check.mjs` (33 checks) | 33/33 passed on `dpl_4Qz1SE8ozqsvtD98swPxf3YrYeGK` (`/api/build` → `3dbafd6`, `mode: stub`) → `evidence_2026-10-30/checks/master-check.{log,json}` |
| `scripts/design/contrast-check.mjs` | 0 comparisons below the floor (0 distinct) → `evidence_2026-10-30/contrast/contrast-results.json` |
| `scripts/e2e/route-scan.mjs` | 55/55 route checks passed → `evidence_2026-10-30/routes/route-scan.json` |
| `scripts/e2e/link-matrix.mjs` | 1064/1064 links ok → `evidence_2026-10-30/links/LINK_CTA_MATRIX.md` |
| 200 % zoom (683 px at 2×) | 15 public routes (ES/EN home, platform + 4 modules, packages, FAQ, contact, trial, example report, data deletion, login, signup): `scrollWidth` 683 = `innerWidth` 683, 0 elements wider than the viewport outside their own scroll containers → `evidence_2026-10-30/checks/zoom-overflow.txt`; all 15 fetched `200` → `checks/zoom-fetch.txt`; pictures `after/zoom200-home-683.png`, `after/zoom200-story-d-683.png` |
| `next lint`, `tsc --noEmit` | clean |
| Staging build | `dpl_4deTgUf5EdY8z1TSFBsuFJMZw8oX`: `/api/build` → `3dbafd6`, `ref website_enterprise_redesign`, `mode: staging` → `evidence_2026-10-30/staging/api-build.json`; `vercel inspect` on 30.10.: 5 functions listed, 5 × `[fra1]`, 0 × `iad1` → `evidence_2026-10-30/staging/vercel-inspect-staging.txt` |
| Recordings (real time, the browser's frame timestamps) | desktop 1366×768: 953 frames over 31.01 s (`recordings/demo-desktop-1366.mp4`, scroll + the demo clicks Tomar → Confirmar → Completar and the follow-up request); phone 390×844: 917 frames over 31.03 s (`recordings/demo-mobile-390.mp4`); frame timing of the 3D turn clip → `checks/frametiming-house-turn-es.json` (40 ms steps), source comparison `checks/frametiming-source-1025-es.json`; 3D media checksums `checks/media3d-sha256.txt` |

## 6. Said plainly

- The design verdict is the owner's; this report measures. The external click-through the owner mentions did not take place here
  either: a headless browser clicked, not a person.
- The 3D take still shows the viewer's labels: an open asset point, not closed by wording.
- The "card stack" of §4 was not built; the story reads in the normal scroll on purpose.
- Nothing of the new website is on the production domain; the one E-FU2 page is, by the owner's line of 27.10.
- No price, package limit, trial behaviour after 14 days or language beyond Spanish is claimed.

## 7. Hand-over to Copy and Reviewer (RV5, jointly, this build only)

Build: `WEBSITE_R26` above. Copy: the WORKING lines of this build (the Daily headline and line, the shorter chapter lines, the
follow-up's message, limit and details words, "Prueba la demo", the example report's words, the Lead Intelligence priority/next
step, the 3D path and the single example mark); Z-1a/Z-1b/Z-2 as applied; the legal paragraph R26-j. Reviewer: §1 row by row on
the same crops, the MX refusal on the staging build, the alt, the nav state, the region. Signal "Build benannt" = the block above.
