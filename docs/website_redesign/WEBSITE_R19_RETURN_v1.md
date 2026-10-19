# WEBSITE R19 — the concrete closing order of 2026-10-19, on 4110566

**State:** `2026-10-19` · **Lane:** Website Implementer → **Owner** (visual acceptance, five steps in
`OWNER_ACCEPTANCE_CARD_1010.md`), **Copy** (the text slots, §6), **Reviewer** (exactly this deployment, RV2),
**Audit** (`ACCEPTANCE_LIST_1010.md` §F6), **3D** (`WEBSITE_TO_3D_1019_SLOTS_v1.md`), **Daily**
(`mail/MAIL_SHELL_v2_FILLINGS.md`), **API** (`WEBSITE_TO_API_1019_STAGING_BUILD_v1.md`).
**Order:** `WEBSITE R19 — KONKRETER ABSCHLUSSAUFTRAG` (owner, 2026-10-19, twelve sections), on commit `4110566` /
`dpl_2KqZb43ZxiywgYpNqmKJYffLg95G`. No v4 restart, nothing rebuilt back, no new design direction.
**Code:** `fdfd30e` (the order) + `deb9b66` (the 3D "pending" mark on an opaque ground, after the contrast check on `fdfd30e` found its ivory text on a translucent ground). **Status:** implemented and awaiting independent technical and final audit. Three kinds of proof are kept apart:
technical checks (§4), my own visual check (§5), productive backend proof (none here; §8). The last independent
visual grade (6/10) is not replaced by anything in this file; the owner's look decides.

```
WEBSITE_R19 = deb9b66 dpl_GyrsjqBQcCdg7KEXccKdUkE4v5nc
```

| | |
|---|---|
| This deployment | https://nuovasolution-design-preview-7p2xkf9hm-nuovasolajs-projects.vercel.app (`/es`, `/en`) |
| Preview alias (always the newest build) | https://nuovasolution-design-preview-git-we-eeb43f-nuovasolajs-projects.vercel.app |
| Build mark | `/api/build` → `{"commit":"deb9b66c…","deployment":"dpl_GyrsjqBQcCdg7KEXccKdUkE4v5nc","env":"preview","mode":"stub"}`; `<meta name="nuova-build">` on every page |
| Before | `4110566` / `dpl_2KqZb43ZxiywgYpNqmKJYffLg95G` |
| Browsers and devices really checked | headless Edge (Chromium 141) at 390×844 (mobile emulation, DPR 2), 768×1024, 1366×650, 1366×768, 1440×900, 1920×1080; **no Safari, no Firefox, no real phone, no real mail client or handset** |

## 1. Seen first (§1)

- **The delivered build `4110566`**, desktop and phone, ES and EN, the scroll and every sales page, before any change:
  the hero's main case was an appointment handled by a person ("a colleague will get back to you", "a task for your
  team"); the land read as flat bands; the panel's lean was barely visible; the Keller reply was shown as sent in
  German; EST-204 and EST-231 were two sea-view living rooms; the packages printed 750 / 3.000 enquiries a month.
- **fora.so, 2026-10-19:** the live site is a creator directory ("Learn from people who do the work"); not used as the
  landscape reference. The reference is our own captures of 2026-10-03
  (`evidence_2026-10-03/references/fora-d1440-hero.png`, `fora-m390-hero.png`, `fora-d1440-s1…s6.png`): a dusk
  sky, dark wooded hills, a product surface rising from the land, one sentence lighting up on scroll. Those files
  exist; nothing is claimed beyond them. Having four elements at four speeds is not the reference; the connected
  landscape with a lit far range, the headland with its tree line and the near ground in front of the panel is what
  was taken from it.
- **21st.dev:** the Container Scroll principle (Manu Arora, MIT) stays the mechanics of the panel; no component and no
  library was added for an animation.

## 2. Findings per point: fixed · blocked externally · owner decision

### Fixed in this deployment

| § | What was wrong on `4110566` | What stands on `deb9b66` |
|---|---|---|
| 2 hero | the main case was a viewing appointment that ends with "a colleague will get back to you" and a "Tomar" task | one product case: Laura (Madrid, writes in Spanish) asks whether the terrace faces south and whether there is a garage, names her budget; Nuova answers from the listing's own data, asks one question (to live all year or a second home); three visible results: *what she wants, saved* · *customer record updated* · *alert to your team* with the reason (property, area, budget named). Nothing is shown as sent that is a draft; no appointment, no calendar, no autonomy the backend does not have. The limit stands inside the panel: "Hoy: WhatsApp y email, respuestas en español. En otro idioma no se envía nada automáticamente." |
| 3 depth | four dark bands; the panel's lean hardly visible | one landscape: a far range with a lit rim and the water's glint under it, a headland with a tree line and a lit crest, the panel, a near ground with low scrub that sinks away on scroll. The panel starts at 18° and 0.9, rises 56 px and comes upright to 1.05 over the first scroll (`--upright` over depth × 2.2). Headline, lead, buttons, the exchange and the results are readable at 0/25/50/75/100 % and at 1366×650 (`hero/`, `widths/first-l1366s.png`); nothing covers them (master-check `cover`, five positions, two widths) |
| 4 transition | a straight ivory gradient over the dark land greyed at the panel's sides | a pool of the page's light under the panel's foot: warm at its edge (no grey from mixing ivory into anthracite), masked as a soft ellipse so the dark land ends in a curve, never a band; it lies under the panel and never over a word. The uncut film shows the scroll through it (`film/`) |
| 5 motion | the sticky chapter deck; `Rise` started at opacity 0 | no deck: the chapters follow each other plainly on every width (the deck did not help reading or the anchors); every settle starts at 0.5 opacity; lists are in the document from the first paint; after a fast scroll to the end and back every stage keeps its height, its text and its pictures at 390 / 768 / 1366×650 / 1366×768 / 1920 (`widths/stages.json`); reduced motion shows everything at once |
| 6 thread | the chapters did not say what came in, what Nuova did and what resulted; the alert was only a badge; no cross-channel continuation | under every chapter title and the social section: **Qué llega · Qué hace Nuova · Resultado**; chapter D opens with the alert by email to Elena with its reason (the proven hot-lead mail), then the morning list; chapter B's record carries "if Laura writes later by email, her customer code keeps her on this record"; the phone stands as an inbound channel in A and B; social is told as a *new* enquiry, not a handled one |
| 7 truth | "El sistema responde en el idioma del cliente…" (not proven), "queda una tarea para tu equipo" as a capability; the Keller reply shown as sent in German | the state line per chapter names what Gate §18 names: replies in Spanish and the record available; other languages: nothing sent automatically, the draft and the task in testing; the customer code implemented, awaiting acceptance; matching implemented, not switched on; the alert by email and the task available, the morning assistant in testing; the report in the login available, Monday's mail sent once, not regular. The German email is a **held draft** ("Borrador preparado · no enviado") with the reason |
| 8 platform, social | — (platform unchanged from X-6) · social had no "what came in / did / result" | the social section carries the three answers; the post uses the listing's facts (south terrace, garage, 78 m²); "the comments and the figures are examples" stands under it; no reach, no leads, no conversion figures |
| 9 language, pictures | "Señores Keller"; a German subject line in the translated view; two near-identical sea-view rooms; "EST-204" inside dialogues | "Hola Anna, hola Peter"; the subject translated with the original one tap away; EST-231 shown from outside (a white building with balconies and a penthouse, Pexels 10135435, licence in `MEDIA_SOURCES_1010.md`), EST-204 the living room, EST-240 the living room of a renovated flat, EST-118 the villa from outside; every card names what its picture shows; the reference stays off the dialogues |
| 10 3D | a still capture under "Vista giratoria"; the render shown three times; a 2×2 block under the steps | plan → model → empty/furnished → turn, as the order names them; steps 3 and 4 carry "Pendiente del equipo 3D" on the picture and say what stands meanwhile (the final render; the 8 s camera ride from its 4 s frame); no still under the turn, no CSS rotation, no doubled picture; the request to 3D unchanged (A-1, A-2) |
| 11 packages, mail | 750 / 3.000 "consultas al mes" printed on the ladder and the packages page without API's confirmation | no monthly figure anywhere until API confirms what the catalogue counts (`ACCEPTANCE_LIST_1010` E-4); the ladder keeps for whom · what is done · what is added · confirmed limits. **MAIL_SHELL_v2** with Daily's TASK block (kind, customer, lines, reasoned priority, held draft as a draft, state, next step, "Abrir"); the morning brief previewed at `/app/brief` and the weekly report at `/app/reports/email`, both on desktop (640) and phone (390), Spanish first (`mail/`) |
| 12 handover | no build mark; `/legal/imprint` 404 | `/api/build` and the meta; `/legal/imprint` → 308 to the provisional notice (no company detail invented; E14 open); the staging build for the onboarding test asked of API with what the website needs (`WEBSITE_TO_API_1019_STAGING_BUILD_v1.md`) |

### Blocked externally

| What | Who | Why |
|---|---|---|
| The empty/furnished pair from the same camera and the full turn (or viewer) | 3D | no material yet; the two slots are built and marked pending (`WEBSITE_TO_3D_1019_SLOTS_v1.md`) |
| The monthly capacity figure on the packages | API | E-4: what `leads_month` counts and its package assignment are unconfirmed; the figure is hidden, not reworded |
| A real send and a real handset for the mail shell | Daily, Hosting | a rendered preview is not a received mail; Daily releases v2 on its side by sha256 |
| A build against the staging backend for the onboarding browser test | API | needs the pinned target's approval and a fixture agency (asked) |
| Productive backend proof of any path | unchanged | `ACCEPTANCE_LIST_1010.md` §A–§E |

### Owner decisions

The public name of the morning assistant ("el asistente de la mañana" is the implementer's choice) · prices or a price
frame · the company details for the legal notice (E14) · the visual verdict on this build.

## 3. What to look at

Folder `docs/website_redesign/evidence_2026-10-19/`.

| Where | What |
|---|---|
| `hero/` | the hero at 0/25/50/75/100 % and the transition, 1440 and 390, ES and EN (`hero-shots.json` with the panel's box) |
| `widths/` | the first screen, the edge, the cards and the social flow at 390, 768, 1366×650, 1366×768, 1920; `after-fast-*.png` and `stages.json` after the fast scroll |
| `story/` | A, B (WhatsApp, the held German draft, its original, web form, phone), C, D (alert + open, propose, done), E (+ request sent), F, G social; phone views of B, C, D, G |
| `sections/` | the 3D steps, trust, packages, the menu, the platform page, the packages page; phone views |
| `mail/` | the morning brief and the weekly report, desktop 640 and phone 390, ES and EN |
| `pages/` | full pages: home ES/EN desktop and phone, platform, packages |
| `film/story-film-d1440-es.mp4` | the uncut scroll film from the hero through the six chapters, the social flow and the 3D section (57 s, 1716 frames at 30 fps, 0 late frames; `film/frames/` every 4 s) |
| `BEFORE_AFTER_*.png` | `4110566` next to `deb9b66`: hero, transition, chapter D, chapter C, 3D, the mail |
| `checks/`, `contrast/`, `route_scan/`, `links/` | the suites (§4) |

**Recording conditions of the film:** headless Edge 1440×900, CDP, captured scroll-step by scroll-step and encoded
with WebCodecs H.264 at 30 fps; real time runs slower than the film (280 ms per frame), so frame timing is not the
browser's own scroll feel; the hero's sequence is slowed to the film's pace; the channel is changed in B, the task
taken, proposed and done in D, the request sent in E.

## 4. Technical checks on this deployment

- `scripts/design/master-check.mjs` **28 of 28** (the layers at three speeds; the panel's lean and rise; nothing
  covered at five positions on two widths; the header; the six chapters with the three answers; the held draft never
  shown as sent; no Jarvis, no "Señores Keller", no internal word in the sales flow; the email demo; the translation
  toggle; the channels by keyboard; the notice on every channel; the three-step task; the 3D steps with the two pending
  slots and no still as the turn; no capacity figure; no overflow at 390/768; the FAQ; reduced motion; without
  JavaScript; the login gate; the reports; the weekly mail in shell v2 without a task block; the morning brief in shell
  v2 with three tasks and no figures; social B; log out).
- Contrast: **0** below 4.5 : 1 on `deb9b66` (`contrast/contrast-results.json`). On `fdfd30e` the check found 8 (2 distinct): the ivory "Pendiente del equipo 3D" mark stood on a translucent ink ground; fixed in `deb9b66`.
- Routes **55 of 55** (`route_scan/route-scan.json`). Links **1064 of 1064** (`links/LINK_CTA_MATRIX.md`).
- `next lint` clean, `tsc` clean.

## 5. My own visual check (§1, §3, §4, §5)

| Width | Looked at | Found and fixed on the way |
|---|---|---|
| 1440×900 | the hero at five positions, the transition, every chapter, social, 3D, packages, the platform page, the mail previews | the tree line first read as a row of stones (made slim and rooted); the light pool had a hard edge at its sides (masked as a soft ellipse); the reason in D stood twice (removed); steps 03 and 04 of 3D showed the same frame (the ride now starts from its 4 s frame; the large duplicate render is gone) |
| 1366×650 | the first screen | headline, lead and buttons fit above the land; the panel is reached within one scroll |
| 390×844 | the hero at five positions, B, C, D, social, the mail previews, the fast scroll | the arrival cards truncated the names (they wrap now); everything keeps its height after the fast scroll |
| 768, 1366×768, 1920 | first screen, edge, cards, social, fast scroll | nothing to fix |
| Reduced motion | the hero and the chapters | the foreground stands at 35 %, nothing moves, everything readable |
| The film | watched end to end as frames every 4 s (`film/frames/`) | the hero sequence runs before the scroll; the land and the panel move apart; the light pool opens into the ivory page; chapter A shows the arrivals quiet, then arrived; B switches to the phone view without overlap; C’s cards and the proposal; D’s alert, take, propose, done; E’s request sent; F’s three figures; the social flow; the 3D steps with their pending marks. Nothing stands empty in any sampled frame |

## 6. Text slots for Copy (C1, C2)

All WORKING by the implementer, to confirm or replace; the slot names are in `lib/content/home-story.ts` unless noted.

- **Hero:** `heroEnquiry` / `heroEnquiryTranslated` (Laura's question: south terrace, garage, budget) · `heroReply` /
  `heroReplyTranslated` (the answer from the listing's data, one question back) · `results` (three result lines) ·
  `lead` ("…con los datos de tu cartera… y avisa a tu equipo cuando una consulta importa") · `stateToday` (the limit
  line) · `labels.done` ("Lo que ya está hecho").
- **Chapters:** every `inbound` / `did` / `result` triple and every `state` line (A–F), the titles of B and D, the line of B
  (customer code across channels) and D (the alert).
- **Enquiries:** Laura's second message and reply (`enquiries[0]`), the Keller draft with "Hallo Anna, hallo Peter" and
  its ES/EN translation, Sofía's reply (now repeats what she asked for once), the `next` result lines of all four.
- **Words:** `reply.noted` "Ficha actualizada", `reply.continuity`, `reply.heldTitle` / `heldLine`, `reply.earlier`,
  `reply.emailSubjectKellerTranslated`; `situation.drafted` / `noted` / `after`; `match.criteria` (+ "Para vivir"),
  `match.proposal`; `task.alert.*`, `task.items` (Laura: "Quiere ver el piso…", Keller: "borrador en alemán
  pendiente"), `task.confirm` "Proponer la hora a Laura", `task.doneLine` "Laura acepta…", `task.chatConfirm`;
  `followup.body` / `cta` (Thursday instead of "tomorrow"); `social.inbound` / `did` / `result`, `social.post.caption`,
  `social.noAds`.
- **3D (`home-sections.ts`):** `model3d.eyebrow`, `lead`, `steps` (02 "Modelo", 03 "Vacío y amueblado"), `pairPending`,
  `turnPending`, `viewerLine`.
- **Packages (`package-matrix.ts`):** Essential `limits` without the capacity sentence.
- **Mail (`morning-brief-demo.ts`):** every line of the morning brief preview (subject, summary, the three tasks, next
  action, button, footer) is a design preview; Daily's renderer and Copy's K1 texts are the source of the real mail.
- **Listings:** EST-204 facts now carry "terraza 14 m² al sur · garaje"; `photoKind` labels (Salón / Exterior).

Not changed: the platform page, the FAQ, the trust section, the packages page's other texts, the legal pages.

## 7. Handover

- **Reviewer (RV2):** exactly `deb9b66` / `dpl_GyrsjqBQcCdg7KEXccKdUkE4v5nc`; `/api/build` names it. Stub mode; no backend
  path is proven here. F-R16-1…5: imprint now 308 → notice (still provisional), privacy still "Provisional" (E14 open),
  the language claim replaced by the limit line (not a proof).
- **Copy:** §6 and `WEBSITE_COPY_SYNC_1019_RETURN_v1.md` when it exists; while a slot is open the design stands and the
  slot is replaced, not the page held.
- **Social:** the build mark they asked for on 2026-10-12 exists on every deployment from here on.
- **Daily / Hosting:** `mail/MAIL_SHELL_v2.html` (sha256 in `MAIL_SHELL_v2_FILLINGS.md`), the two previews.
- **3D:** `WEBSITE_TO_3D_1019_SLOTS_v1.md`.
- **API:** `WEBSITE_TO_API_1019_STAGING_BUILD_v1.md`; E-4.

## 8. Said plainly

No productive backend path is proven by this deployment; every figure is an example and says so. The film is a
headless recording with timing slips, not the browser's own scroll. No Safari, Firefox, real phone or real mail client
was used. The sticky deck was removed on my judgement under §5; the owner can ask for it back. The design verdict is the
owner's; no grade is claimed here.
