# WEBSITE VISUAL 1009 — the follow-up on the accepted demonstration: hero refined, five scenes, four tasks, the package ladder

**State:** `2026-10-09` · **Lane:** Website Implementer → **Owner** (visual decision), Audit, Copy (text
confirmation after the implementation), Reviewer (this deployment), API/Audit (package deviations).
**Order:** owner follow-up to `WEBSITE_EXCERPT_PREVIEW c360d1f` (2026-10-06, ten points) plus the
addition for the FAQ page (categories without counts, questions as an accordion).
**Inputs applied:** `COPY_WORKING_TEXTS_1006` (W-1 to W-7 confirmed, W-8 and W-9 replaced).
**Status:** implemented and awaiting independent technical and final audit. Not a claim of "finished" or
"premium"; what follows is what can be seen and what was measured.

```
WEBSITE_VISUAL_1009 = 62608a2 dpl_45HnpRt3Usu2Mz2vjgAW6pRZrJbb
```

| | |
|---|---|
| Preview (alias, always the newest) | https://nuovasolution-design-preview-git-we-eeb43f-nuovasolajs-projects.vercel.app/es · `/en` |
| This deployment | https://nuovasolution-design-preview-3acsb1y53-nuovasolajs-projects.vercel.app |
| Commit | `62608a2` (on `c360d1f` and Copy's `c4266b6`) |
| Staging preview | still **held** on `486bfe8` (`.staging-hold`); the staging project's build is cancelled on every push |
| Browser | headless Edge (Chromium). **No Safari, no real phone.** |

## 1. What to look at

Folder `docs/website_redesign/evidence_2026-10-09/`.

| Where | What |
|---|---|
| `hero/` | the refined hero, desktop and phone, ES and EN: first screen, the scene scrolled, the panel |
| `hero/hero-film-d1440-es.mp4`, `hero/hero-film-m390-es.mp4` | the sequence, then the scroll with the layers moving apart and the panel coming upright |
| `scenes/` | the five demonstrations, one picture per step that matters: A (WhatsApp and phone as the way in, the full conversation, the beam to the record, the task taken), B, C (list arriving, the reasoned order, the task taken), D (post approved, comment and allowed reply), E (plan/model slider, the upper floor) |
| `sections/` | the Platform menu in four tasks (ES and EN, desktop and the phone sheet), the trial with its steps, the package ladder (desktop and phone), the FAQ accordion (desktop ES, phone EN), the Daily page with the withheld recording |
| `BEFORE_AFTER_1440_es.png` | `c360d1f` (2026-10-05) next to now, first screen and scene |
| `checks/excerpt-check.json` | the measured interactions (§6) |
| `contrast/`, `route_scan/`, `links/`, `clip/` | the suites on this deployment |

## 2. The hero (order §1)

- **Mid ground reduced to two calm pieces of architecture**: a long terrace house with a colonnade of three
  arches on the left, a villa with one wide arch and a palm on the right, one cypress each. The village of
  small houses is gone, and so is the lamp dot on the foreground arch.
- **Three distinct tones**: the far ridges and the sea are lighter and cooler, the architecture stands in
  warm ivory and grey on a mid-grey slope, the foreground is the darkest thing in the picture. Checked in
  the still (`hero/hero-d1440-es-scene.png`).
- **The panel** leans back 9° at the top of the page and comes upright while growing from 96 % to 100 % as
  the page scrolls, then rests upright and flat at full size (one calm end position). Phone: 4° and the
  same growth. Reduced motion: a fixed 2.5° lean, no movement.
- The foreground never reaches headline, buttons or the panel's story (measured at five scroll positions,
  desktop and phone, on the painted shapes with a control probe: 0 hits, control 2 of 2).

## 3. The entry (order §2)

- The one general button is **"Probar gratis" / "Try free"** everywhere (header, hero, trial section,
  footer, contact, FAQ, module pages). The package name appears only on the packages and trial pages.
- Under the hero's buttons: **"14 días · Sin tarjeta"**, matching the real flow (no payment method, no card:
  FAQ Q-11, the signup and onboarding code).
- The trial section lists the real steps in their real order: create the account → name and set up the
  agency → **connect the channels together with us** (a separate step; FAQ Q-40). No minutes, no "live at
  once".

## 4. The demonstrations (order §3, §5)

**Five scenes in one selector** (`#demo`): Responder · Encontrar · Coordinar · Captar · Presentar. Each has a
benefit headline, one sentence, its steps, one large stage and two honest lines under the stage: the kind
of picture and the state.

| Scene | Kind shown | Proof behind it |
|---|---|---|
| A Responder: WhatsApp (or **phone** as the alternative way in) → reply in Spanish → record → task taken | **real product path** (the phone variant is marked in preparation) | matrix: replies prod (Spanish), CRM entries prod, task list/take/complete prod; phone staging only |
| B Encontrar: wish with area, budget, bedrooms → two listings of the agency's own portfolio → the proposal on WhatsApp or email | **design prototype** | property matching staging, no real source; **availability is not looked up anywhere, so "sigue disponible" is never shown** |
| C Coordinar: the morning list arriving → the order with its reason (a date named, waited longest; "a high budget is not urgency") → take → done | **mixed**: take/done real, the morning view and the WhatsApp notice prototype | Daily: list/take/complete prod; overview and WhatsApp staging logic only, no real send |
| D Captar: a listing → the post, approved by the agency → a comment → an allowed reply that claims no availability → the contact in a record | **design prototype** | Social Growth staging, 0 Meta calls, approval pending |
| E Presentar: the dimensioned plan → plan/model slider → floors and furniture | **per order; the views are illustrations** | 3D by hand per order; the real viewer waits for `3D_OWNER_VISUAL_ACCEPTANCE` |

- The reply to Laura is shortened to a result and one targeted question ("¿Os viene mejor a las 10 o a las
  12?"), with no commitment and no availability claim. **WORKING text for Copy and Lead** (it replaces
  Copy's D-10 wording in the hero panel, scene A and the module pages).
- "Por eso se fían de la respuesta" is removed from the transparency line (D-93 keeps the rest).
- **EST-204 everywhere** on the site: hero, scenes, record, listings, dictionaries. Daily's recordings
  (clip v3 and the four stills) still carry REF-DEMO-204 inside the picture, so **they are withheld** on the
  Daily page with a one-line explanation until Daily delivers a cut and stills with EST-204; no page shows
  two references. Asked of Daily: clip v4 and stills with EST-204.
- Labels, alerts, follow-ups, calendar and reports are not sold inside the scenes; they appear in the
  Platform menu and the ladder with their states.
- The working task demonstration (take, mark as done) is kept in A and C and is **not** called Jarvis on
  WhatsApp anywhere; scene C says what the morning notice still lacks.
- The Daily page sentence "the others see that it is taken and by whom" now follows the **measured** rule of
  the clip v3 manifest (2026-10-02): a taken task leaves the lists of the others. The 2026-09-28 truth sheet
  said the opposite (claimant columns visible). **Daily to confirm which is true in production.**

## 5. Platform in four tasks, the ladder, the FAQ (order §4, §6, addition)

- **Menu**: Atender consultas · Gestionar oportunidades · Coordinar tu equipo · Captar y presentar, every
  entry with a benefit line and a state word (available · in preparation · per order); a link only where a
  page exists today. Source `lib/content/platform-map.ts`. Cross-channel identity, more languages, external
  CRM connections and calendar booking each still need their own proof and are shown accordingly.
- **Ladder**: Essential (replies, labels, CRM, hot lead alerts) · Growth (plus follow-ups, suggestions, daily
  tasks, lead intake, calendar) · Enterprise (plus Instagram, phone, 3D per order) · 3D on its own. Available
  lines carry a check; lines in preparation stand in words with no check and no button. "Consultas
  procesadas al mes" is labelled as the processing limit it is. No price, no quota, no promised leads; ad
  campaigns and budget stay the agency's. Names are a proposal; the plan ids stay `essential`, `growth`,
  `scale`. **Deviations against the catalogue** (nine, D-1 to D-9: the hot-lead flag on no plan, follow-ups
  granted to Essential by the catalogue, no flag for tasks, calendar, Instagram or 3D, the meaning of
  `leads_month`) are in `docs/website_redesign/PACKAGE_MATRIX_CHECK_1006.md` for Audit and API.
- **FAQ page**: the category blocks show a heading only (the count under it is gone), the questions open one
  at a time, the row ids are data attributes and never text. Same on the phone.

## 6. What was actually checked on this deployment

`scripts/design/excerpt-check.mjs`, **14 of 14**, headless Edge, `/es`:

| Interaction | Result |
|---|---|
| the four depths move by different amounts; the panel leans and comes upright | desktop +20 / +11 / −12 px after 420 px, phone +7 / +4 / −4 px; panel matrix changes |
| no foreground over headline, buttons or the panel's story, five scroll positions | 0 hits, control probe 2 of 2, desktop and phone |
| the navigation stands on the sky at the top, is the light bar after scrolling | yes |
| autoplay: advances after 7 s in view, **stops for good at the first choice by hand** | yes |
| choosing another scene stops autoplay and starts at step 1; a task taken in A is open again after leaving and re-entering A, and C has its own | yes (no contradictory task state) |
| keyboard: steps, take and done, the full conversation; a scene tab; the plan/model slider (arrow keys) | yes |
| reduced motion: all visible, nothing moves, panel fixed lean, no autoplay | yes |
| without JavaScript: the hero's finished picture and the steps are in the document | yes |
| FAQ: one question open at a time, aria-expanded and its region, no count under a category, no row id in the text | yes |
| contrast of small text, all sales routes | 0 below 4.5 : 1 |
| route scan · link matrix · clip suite | 55 of 55 · 1132 of 1132 · the Daily recording recorded as withheld (4 of 4) |

Expand, back, replay and the full conversation were operated by hand in the captures of `scenes/`.
Not run: the older suites that assert the former home page; they follow with the roll-out.

## 7. Building blocks (order §7)

| Block | Licence, source | Used for |
|---|---|---|
| Animated List (Magic UI) | MIT, source public | the enquiries arriving in scene C and the criteria in scene B; adapted to appear once and stay |
| Animated Beam (Magic UI) | MIT, source public (registry) | the one connection channel → record in scenes A and D; brand gold on a hairline, three runs then rest |
| Image Compare (kuratlielia) | MIT stated, source only with a 21st API key | **not copied**; our own slider on a native range input (keyboard, screen reader) for plan and model in scene E |
| Expandable Tabs (preetsuthar17) | no licence, private source | **not copied**; the scene selector shows every label (owner's condition) |
| Accordion (motion-primitives) | MIT | the FAQ |
| Container Scroll Animation (Aceternity) | MIT | the panel's mechanics, as before |

No animation was added without a meaning: the list shows arrival, the beam shows the connection, the
slider shows the same object in two views.

## 8. Three kinds, named plainly

- **Preview can be operated**: everything in §6.
- **Real product path proven end to end**: none newly in this round. The hero and scene A show paths that
  exist in production (replies in Spanish, CRM entries, task list/take/complete); the owner's own production
  test of the task surface is the only end to end proof on record, and the live gate L-01 (first real
  delivery to a customer) is still open.
- **Visual prototype waiting for proof**: scene B (matching; availability source), scene C's morning view
  and WhatsApp notice (one real send, take/done from WhatsApp), scene D (Meta approval), scene E's real
  viewer (3D visual acceptance), the phone way in (production routing), the menu entries and ladder lines
  marked "in preparation".

## 9. Remaining dependencies

| Who | What |
|---|---|
| Copy, Lead | confirm the shortened reply to Laura and the new WORKING texts (scenes, menu, ladder, trial steps, FAQ frame) |
| Daily | clip v4 and stills with EST-204; confirm the visibility rule of a taken task |
| API, Audit | the nine package deviations in `PACKAGE_MATRIX_CHECK_1006.md` |
| Owner | the Enterprise acquisition line (undefined), the 3D visual acceptance, the hero and the scenes themselves |
| Reviewer | this deployment |

Texts marked WORKING in `lib/content/home-scenes.ts`, `platform-map.ts`, `package-matrix.ts` and the
dictionaries are the implementer's until Copy confirms them; `HOME_V3_WORKING_TEXT` stays true.
