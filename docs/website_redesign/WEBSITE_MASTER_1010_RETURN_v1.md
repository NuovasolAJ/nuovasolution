# WEBSITE MASTER 1010 — the master order delivered: premium design, the story from A to F, the login with the weekly report

**State:** `2026-10-12` · **Lane:** Website Implementer → **Owner** (visual decision, acceptance card), **Audit**
(publication gate, ACCEPTANCE_LIST_1010), **Reviewer** (this deployment), Copy, Daily, Social, API, Reporting,
Hosting, 3D (handoffs in §9).
**Order:** `MASTERAUFTRAG — NuovaSolution Website: Premium-Gestaltung, durchgehende Produktgeschichte und Abnahme`
(owner, 2026-10-10, twelve points). It replaces every earlier website order.
**Status:** implemented and awaiting independent technical and final audit. Not a claim of "finished"; what follows is
what can be seen and what was measured.

```
WEBSITE_MASTER_1010 = 2561247 dpl_34uYqcvqTJMkkh12WK9c9G5wXHsN
```

| | |
|---|---|
| Preview (alias, always the newest build) | https://nuovasolution-design-preview-git-we-eeb43f-nuovasolajs-projects.vercel.app/es · `/en` |
| This deployment | https://nuovasolution-design-preview-qf57ksuey-nuovasolajs-projects.vercel.app |
| Code | `2561247` (= `08ecf9c` of 2026-10-10 plus one contrast fix of the hero chip; `6c4311f` in between did not compile and its deployment errored, as intended by the fix that followed) |
| Docs | `56d444f` (pause handoff, media sources, reports contract request) and this return's commit |
| Staging preview | still **held** on `486bfe8` (`.staging-hold`); nothing was sent to staging or production |
| Browser | headless Edge (Chromium). **No Safari, no real phone.** |
| Owner's card | `docs/website_redesign/OWNER_ACCEPTANCE_CARD_1010.md` (link, demo session, five steps) |

## 1. What to look at

Folder `docs/website_redesign/evidence_2026-10-10/`.

| Where | What |
|---|---|
| `pages/` | the whole home page, ES and EN, desktop 1440 and phone 390 |
| `hero/` | the first screen and the scrolled hero (panel upright, cards moved), ES and EN, desktop and phone |
| `story/` | one picture per chapter: A, B on each of the four channels (and the notice opened), C, D open and done, E, F; the phone for B (phone channel) and D |
| `sections/` | the 3D section and its slider, the trust section and its questions, the package ladder, the Platform menu (desktop and the phone sheet) |
| `app/` | the agency home, the weekly report (full page), the Monday email, the social screen B with draft controls and cover frames, the login with `next=`, the header with a session |
| `film/story-film-d1440-es.mp4` | the scroll film of the whole story: the hero sequence, A to F with the channel change in B and the task taken and closed in D, then the 3D section |
| `BEFORE_AFTER_HERO_1440_es.png`, `BEFORE_AFTER_STORY_1440_es.png`, `BEFORE_AFTER_REPORTING_1440_es.png` | the previous deployment (`62608a2`, 2026-10-09) next to now |
| `checks/master-check.json` | the 21 measured interactions (§7) |
| `contrast/`, `route_scan/`, `links/` | the suites on this deployment |

## 2. The design direction (order §1, §2)

- **The arches and the village are gone.** The hero is a Costa del Sol dusk (a licensed photograph, toned to the page's
  anthracite) behind two calm drawn ridges, with the product in front: the panel and two floating cards. The Fora
  reference of the project (`evidence_2026-10-03/references/fora-*.png`) was used for the layer principle: a calm
  gradient sky, dark land, the product surface rising out of the ground; the same principle continues in every chapter
  (a soft field behind, the white stage, one chip in front) and on the dark footer.
- **The panel visibly steps forward**: it leans 14° at the top of the page and rises, comes upright and grows from 94 to
  100 % while the first 400 px scroll; the far layer lags, the cards run ahead (measured: far +70 / mid +36 / front −54 px
  on the desktop, +36 / +18 / −26 on the phone).
- **Photographs** stand for the sample listings and the viewing in progress; their origins and licences are in
  `MEDIA_SOURCES_1010.md`. Nothing is a real listing; every stage says "Ejemplo con personas e inmuebles inventados".
- **21st.dev**: the registry serves source only with an API key (no purchase, no connection was made). Blocks were taken
  from their public MIT upstreams or built as purpose-equivalents; the list is in §8.

## 3. The story (order §3, §4, §5, §6)

One enquiry runs through the page: **Laura Serrano** (buyer, Manchester) writes on WhatsApp in English on Tuesday 11:20
about **EST-204** while **Marcos** shows the villa **EST-118**; **Elena** confirms Thursday 10:00 the next morning; on
Friday the new listing **EST-240** fits her. Names, references, prices and the clock agree in the hero, the six chapters,
the module pages and the report (source `lib/content/home-story.ts`).

| Chapter | What the stage shows | Kind |
|---|---|---|
| Hero | for whom, the problem, the product (enquiry → reply in English → record → task), the next step; "Probar gratis" with "14 días gratis · Sin tarjeta" | demonstration on real paths (reply, record, task exist in production, Spanish) |
| A The situation | the viewing in progress; four enquiries arriving on WhatsApp, email, web form, phone, in English, German, Spanish, Spanish | demonstration |
| B The reply | one tablist, four complete scenes: the customer's text, Nuova's reply **in the customer's language**, the record (area, budget, timing, language); the AI notice opens on every channel (Spanish = the approved wording, EN and DE marked as sample translations); phone = note and callback task, no price, no appointment | demonstration; Spanish replies real, other languages and web form and phone need proof (ACCEPTANCE_LIST A-1…A-5) |
| C The property that fits | Laura's criteria → EST-204 and EST-231 from the agency's own portfolio → the proposal on WhatsApp; the rights line says only publishable, current listings are shown and availability is never claimed | demonstration (B-2) |
| D The next action | Jarvis's Wednesday list with priority, reason and next step; take → Elena's confirmation chat → done with who and when; the others stay open | take and done real in production; the list with reasons needs Daily's proof (C-2) |
| E Staying in touch | EST-240 enters the portfolio → three conditions (Laura's consent of Tuesday 11:22, follow-ups switched on, listing publishable) → the email with two cards and one action | demonstration (B-3) |
| F The result | the weekly overview in six counts, what is still open, the Monday email with the button to the full report | demonstration; the report surface is built (§5), the data contract is requested (C-5) |

The story reads without a click; the channel choice in B and the task in D are extras and work by keyboard (§7).

## 4. 3D (order §7)

Plan → furnishing → render → rotatable view as four pictures, the before/after slider from the same camera, and the 8 s
camera ride, all from the 3D lane's living room of 2026-10-05 (the owner's accepted direction). The note under the
section says: a fictional demonstration house, furniture similar in style, each model made to order from the agency's
plans. No automatic pipeline is claimed. New files from the 3D lane replace `public/media/3d/*` under the same names.

## 5. The login area and the weekly report (order §8)

- **Found first**: no reporting exists in this repository or in any repository the website can see; the owner's two
  emails were not used as a reference (REPORTS_CONTRACT_REQUEST_1010 §1).
- **Built**: `/app` (agency home: trial line, the three ways in, the day's operative place that waits for Daily's read
  model), `/app/reports` (period, generated, data basis, counts, by channel, trend, open actions; "Not measured" where a
  figure is absent, never zero; scoped to the plan and to the trial), `/app/reports/email` (the Monday email with the
  button to the full report). In the stub build the figures are the story's week, labelled "Datos de demostración";
  in staging the page says the contract is awaited.
- **Guards, on the server**: session → login with `?next=` and back; membership → registration step; `reporting.basic`
  denied → one sentence; the back end scopes the op to the tenant of the session. No hidden button is a guard.
- **The contract** the website calls is proposed to API/Reporting/Hosting in `REPORTS_CONTRACT_REQUEST_1010.md`.

## 6. Trust, packages, menu, onboarding findings (order §9, §10)

- **Trust section**: the real steps in their order (account → agency → channels with us → where the leads live), the
  included CRM against the agency's own CRM, what we do when connecting, and eight of Copy's FAQ rows. No testimonial,
  no logo, no figure, no "without setup".
- **Ladder**: three packages, each on the one before, 3D on its own, every line with a check, no state label; the
  processing limit named as such; no price. Deviations against the catalogue stay in `PACKAGE_MATRIX_CHECK_1006.md`.
- **Menu**: four tasks, every entry clickable (its page where one exists, otherwise the chapter that shows it), no state
  word. The general button is "Probar gratis" everywhere; "Essential" appears only on the packages and trial pages.
- **Onboarding findings** (audit order 2026-10-08b): a visible **log out** (header, desktop and phone sheet; revokes the
  token, clears the cookies, lands on the root with a status line); the **header reads the session** (`/api/bff/auth/session`,
  static pages unchanged); **return after login** (`?next=` from onboarding, social and app pages; a logged-in visitor on
  the login is sent on; an expired session says so); the **CRM choice** "no external CRM" exists in the onboarding CRM
  step and is now also explained on the home page. The **staging build** stays held on `486bfe8` by `.staging-hold`
  (owner rule R10b); lifting it is the owner's word. The trial start text (activation, not naming) stands in the
  register step (D-89); `AUTH_COPY_v1.md` still carries the superseded sentence for Copy to retire.
- **Social screen B** (order §6, Social's 2026-10-09 gaps): the reason sentence, the listing cover from `cover_url` with
  its 15-minute expiry and a reload, a placeholder without an image, and the two controls "Crear el texto" → "Aprobar"
  through `social.action` v12 (`draft` with the listing key, `approve` with the draft's own id; the server resolves the
  property id from the read state). Everything stays switched off with its reason until the release.

## 7. What was measured on this deployment

`scripts/design/master-check.mjs`, **21 of 21**, headless Edge, `/es`:

| Interaction | Result |
|---|---|
| far, mid and front move by different amounts; the panel leans and comes upright, larger | desktop +70 / +36 / −54 px after 420 px, phone +36 / +18 / −26 px; panel matrix changes |
| no headline, button or story part of the panel under a floating card, five scroll positions | 0 hits, control 2 of 2, desktop and phone |
| the navigation stands on the sky at the top, is the light bar after scrolling | yes |
| six chapters with a heading and a filled stage, Laura in every one | yes |
| the channel selector by click and by arrow keys; the phone view carries call words and no WhatsApp step text | yes |
| the AI notice opens on every channel | yes |
| Jarvis: take and done by keyboard; the done line names who did what; the others stay open | yes |
| the 3D section (four stages, slider, film) and the ladder are there; no proof-state label, no "en preparación" on the public page | yes |
| FAQ: one question open at a time, aria, no count, no row id | yes |
| reduced motion: everything visible, nothing moves, the panel keeps a fixed lean | yes |
| without JavaScript: the hero's finished picture and all six chapters with their stages | yes |
| `/app/reports` without a session → the login with `next=`; the login brings the demo session back there | yes |
| with a session: the header shows the account link and log out; the report renders its counts and period; the email preview carries the subject and the button | yes |
| social screen B: a cover frame per listing, a draft control per publishable listing, switched off with its reason | yes |
| log out from the header: the root with a status line; the agency area asks for the login again | yes |
| contrast of small text, all sales routes | **0** below 4.5 : 1 (the first run found the hero's WhatsApp chip at 3.17 : 1; fixed in `2561247`) |
| route scan · link matrix | 55 of 55 · 1532 of 1532 |

Not run: the older suites that assert the former home page (website-e2e home texts, conversion-path, deck-probe,
probe-capture), the clip suite (Daily's recording stays withheld), Safari, a real phone.

## 8. Building blocks and sources (order §2, §12)

| Block | Licence, source | Used for |
|---|---|---|
| Container Scroll Animation (Manu Arora, Aceternity) | MIT, public upstream | the panel's mechanics: perspective, rotateX to flat, scale, driven by the scene's own scroll measure (`components/ui/depth-scene.tsx`) |
| Animated List (Magic UI) | MIT, public upstream | the arrivals in A, the criteria in C, the conditions in E |
| Accordion (motion-primitives) | MIT | the FAQ and the trust questions |
| Pricing (Meschac Irung, tailark) | MIT | the ladder's structure |
| Image Compare (kuratlielia, 21st.dev) | source only with a 21st API key | **not copied**; our own slider on a native range input (plan/furnished in the 3D section) |
| Expandable Tabs (preetsuthar17) | no licence, private source | **not copied**; the channel selector is a native tablist with arrow keys |
| Lucide icons | ISC | the channel and action icons |
| Pexels photographs, the 3D lane's renders | Pexels licence; the lane's own files | `MEDIA_SOURCES_1010.md` |

No animation was added without a meaning: the list shows arrival, the tilt shows the product stepping forward, the
slider shows the same room in two states.

## 9. Three kinds, named plainly, and the handoffs

- **Operable on the preview**: everything in §7, the demo session of the owner's card, the login area with
  demonstration data, log out, the social screen B controls (refused with a reason, as the database decides).
- **Demonstration with invented data**: the hero panel, the six chapters, the 3D pictures, the report's figures.
- **Backend still missing** (each row in `ACCEPTANCE_LIST_1010.md`): replies in languages other than Spanish, the web
  form and the phone as channels, property suggestions and their source, the follow-up's consent and sending path, the
  alerts' port and flag, Jarvis's reasoned list, the calendar, the weekly report's op and flags, the day's operative read
  model, Meta's approval and the lab release, the 3D visual acceptance and viewer host, Daily's clip v4.

| To | What |
|---|---|
| Copy, Lead | every text of the hero, the story, the 3D and trust sections, the login area, the menu, the ladder and the social additions is WORKING text (marked in the sources); the example clock moved to Tuesday 11:20 and Laura writes English (replaces COPY_HERO_1003's Sunday night; the module pages follow) |
| Daily | clip v4 and stills with EST-204 and the Tuesday clock; confirm the visibility rule of a taken task; name the read model for "today in your team" |
| Social | screen B carries the reason, the cover and draft/approve: `SOCIAL_UI_PATH` is ready for Social's acceptance with the reviewer login once the workspace has the social entitlement again |
| API, Reporting, Hosting | `REPORTS_CONTRACT_REQUEST_1010.md` (the op, the flags, the Monday email) |
| API, Audit | the nine ladder deviations of `PACKAGE_MATRIX_CHECK_1006.md` still stand; the ladder now also lists the weekly report (`reporting.basic` / `reporting.advanced`) |
| 3D | new pictures and films replace `public/media/3d/*`; the owner's visual acceptance stays with the owner |
| Audit | `ACCEPTANCE_LIST_1010.md` is the publication gate of the target version; `NEXT_PUBLIC_PROOF_STATES=1` on any preview prints the states |
| Reviewer | this deployment, `dpl_34uYqcvqTJMkkh12WK9c9G5wXHsN` |
| Owner | the visual verdict (card), the Enterprise acquisition line (D-8), the 3D acceptance, the staging hold |

`HANDOFF_1010_PAUSE.md` is superseded by this return.
