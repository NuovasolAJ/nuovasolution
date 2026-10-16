# WEBSITE REDESIGN FINAL 1012 — the binding closing order delivered: a calm hero, the story tightened, truthful media, a report that means something, one mail shell, one package definition

**State:** `2026-10-16` · **Lane:** Website Implementer → **Owner** (visual verdict, the card), **Copy** (the changed
texts, §8), **Reviewer** (this deployment), **Audit** (the bundle: this return, `ACCEPTANCE_LIST_1010.md` §F2, the
evidence folder), Daily, Social, API, Reporting, Hosting, 3D, Voice (handoffs in §8).
**Order:** `NUOVASOLUTION — VERBINDLICHER REDESIGN-ABSCHLUSSAUFTRAG` (owner, 2026-10-12, eleven sections), on the
basis of `WEBSITE_MASTER_1010 = 2561247`. Inputs: the owner's words of 2026-10-12 on the first screen, Copy's
`CLAIMS_CHECK_1012.md` (D-94…D-106), `REVIEWER_SYNC_1012_RETURN_v1.md` (F-R16-1…5), `AUDIT_ORDERS_2026-10-12.md`
(R16-K), and Copy's `TEXTS_1013.md` §4 and §6b, written "for the build after 15.10." — this build.
**Status:** implemented and awaiting independent technical and final audit. Not "finished", not a score; what follows
is what can be seen and what was measured.

```
WEBSITE_REDESIGN_FINAL_1012 = 3fae766 dpl_CXhRM6HanhgP7AX4zFinZzjQ1G4N
MAIL_SHELL_V1 = docs/website_redesign/mail/MAIL_SHELL_v1.html sha256 5b78cd68f475a2975c1e9014e669cd4e71d5059802b7f6be53d9e6d16e69e51c
```

| | |
|---|---|
| Preview (alias, always the newest build) | https://nuovasolution-design-preview-git-we-eeb43f-nuovasolajs-projects.vercel.app/es · `/en` |
| This deployment | https://nuovasolution-design-preview-rks321lhy-nuovasolajs-projects.vercel.app |
| Code | `6fff61b` (the order's eleven sections, 2026-10-12) and `3fae766` (Copy's lines of TEXTS_1013 for this build, 2026-10-16); between them Copy's own commits `4c4ae95`…`dbeba48` (documents only) |
| Docs | this return's commit |
| Staging preview | still **held** on `486bfe8` (`.staging-hold`); nothing was sent to staging or production; no real customer send |
| Browser | headless Edge (Chromium), 1440×900, 768×1024 (overflow only) and 390×844. **No Safari, no real phone.** |
| Owner's card | `docs/website_redesign/OWNER_ACCEPTANCE_CARD_1010.md`, updated (the steps changed with the hero) |
| The owner's screenshots named by the order | **not found**: no folder or file with them exists in the repository or in `docs/website_redesign/`; the order's own words and the owner's message of 2026-10-12 on the hero were used instead. If the pictures carry a point not covered here, they are the next input |

## 1. What to look at

Folder `docs/website_redesign/evidence_2026-10-12/` (captured on this deployment).

| Where | What |
|---|---|
| `hero/hero-d1440-{es,en}-{0,25,50,75,100}.png`, `-transition.png`; `hero-m390-…` | the hero at 0 / 25 / 50 / 75 / 100 % of its own height, and the edge into the story, desktop and phone, ES and EN |
| `pages/` | the whole home page, ES and EN, desktop and phone |
| `story/` | A; B on each of the four channels, the notice opened, the German email shown translated and then in the original; C; D open and done; E, and E with the request sent; F; G the social strip; the phone for B (phone channel), D, E (sent) and G |
| `sections/` | the 3D section with its relabelled slider, the trust section and its questions, the ladder, the packages page with the staged lines, the Platform menu (desktop and phone sheet) |
| `app/` | the agency home with the package name, the weekly report (full page: label above, three meaning blocks), the Monday email in the shared shell, the social screen B, the login with `next=`, the header with a session |
| `film/story-film-d1440-es.mp4` | the scroll film (55 s): the hero sequence and the transition, A to F with the channel change and the original/translation in B, the task taken and closed in D, the request sent in E, the social strip, the 3D section |
| `BEFORE_AFTER_HERO_1440_es.png`, `BEFORE_AFTER_STORY_1440_es.png`, `BEFORE_AFTER_REPORTING_1440_es.png`, `BEFORE_AFTER_TRANSITION_1440_es.png` | `2561247` (2026-10-10) next to now |
| `checks/master-check.json` | the 27 measured interactions (§4) |
| `contrast/`, `route_scan/`, `links/` | the suites on this deployment |

## 2. Before and after, in short

| | `2561247` (2026-10-10) | now |
|---|---|---|
| First screen | headline, two buttons, the panel with Laura's full message; two photo cards floating over the panel's lower corners on an ivory band | headline, two buttons, the panel: one line of situation ("Tuesday 11:20 · Marcos is at a viewing until 12:00 · Nuova handles what arrives"), a two-line enquiry, a three-line reply, the record, the next step, one state line. No cards, no band |
| Hero → story | the dark land, then an ivory band with the cards, then the ivory page | the panel stands on the dark land with a short dark foot; the story begins at its own edge |
| Depth | far photo +70, ridges +36, cards −54 px after 420 px scroll | stars +19, coast +12, ridges +6 px after 420 px scroll (ratios 1.6 and 2.0); the panel scrolls with the page, leans 10° → 0° and grows 0.92 → 1.04 |
| Chapters | big letters A–F, a label, long dialogues, Laura's full text again in B, "Friday" in the follow-up | benefit headlines, a state line each, alternating layouts, the short WhatsApp text in B, the follow-up on Wednesday 17:30 before Thursday's viewing |
| Languages | "in her language" in the lead and the titles | no language in the lead or the titles; Copy's L-1 + L-2 as the hero's state line, L-1…L-3 in chapter B; foreign messages shown translated with the original one tap away |
| Email action in E | a span that looked like a button | a demo button: the request lands with the team, nobody has confirmed, undo |
| Jarvis | a list with priority | "Buenos días, Elena" → the day's items → the most important one with its reason → the action; the important-enquiry chip visible |
| 3D slider | "Raw model / furnished" over a furnished first version | "First version / Revised design" with the note that an unfurnished pair from the same camera does not exist yet |
| Listing photos | sea views | rooms, architecture, terraces (Pexels, `MEDIA_SOURCES_1010.md`) |
| Weekly report | figures first, "Nada aquí es una estimación" below | "Cifras de ejemplo" above, then three questions answered (what Nuova handled, which chances came up, what is next), then the counts; the sentence is gone |
| Monday email | its own markup | `MAIL_SHELL_v1`: logo, colours, width, one button, no automation footer |
| Packages | "Leads per month" on one page, "processing limit" on another; Scale vs Enterprise | "Consultas procesadas al mes" everywhere; the ladder's names on the packages page (Enterprise for the id `scale`, the id unchanged) and the staged lines per card |

## 3. The eleven sections of the order

1. **Design idea** kept: the evening mood and the stars, the situation, the proposals and the follow-up, warm surfaces.
   Improved: the landscape is one toned photograph and two drawn ridges, nothing generic drawn on top; no empty areas
   (the hero's foot is 64 px on the desktop, 40 on the phone); the repeated white cards are gone from the hero and the
   chapters alternate text/stage sides; dialogues cut to one question per reply; every control has a visible state
   (tabs, the translation toggle, the demo button); the subpages carry the same package definition (§9). No arches, no
   neon, no decorative diagram.
2. **Components and sources** unchanged in kind: the Container Scroll Animation principle (the panel), motion's
   `LazyMotion`/`m` with `useReducedMotion` through `MotionConfig reducedMotion="user"`, Magic UI's Animated List
   adapted (now with `startOnView`, `keepOrder`, `replayKey` and the reduced-motion end state). No second animation
   library. Licences in §6.
3. **Hero**: four distinct depth layers measured at four speeds (stars, coast, ridges, panel; §4). The order named two
   foreground cards as the fourth layer; the owner's words of 2026-10-12 ("the eye does not know where to look", the
   grey-to-white band) replaced them, and the stars took the fourth speed. The panel rises and comes upright
   (`rotateX` 10° → 0°, scale 0.92 → 1.04). No text is covered at any of five scroll positions (§4). At 1440×900 the
   first screen shows the headline, both buttons and the panel's head: the channel chips, the situation line and the
   enquiry. On the phone the panel stands under the words without side overlap (no element wider than 390 px, §4). The
   transition is the dark foot and the story's own edge.
4. **Animations**: the hero sequence runs once on entry and again only on "Reproducir otra vez"; the arrivals in A, the
   criteria in C and the conditions in E enter once on view; chapter F has its own replay button; with reduced motion
   every end state is in place (§4).
5. **Story and texts**: no letters, benefit headlines, a state line under every chapter (Copy's CLAIMS_CHECK_1012 §1
   wording, chapter B now Copy's TEXTS_1013 L-1…L-3), varied layouts, the hero dialogue not repeated (B shows the short
   WhatsApp text), full names readable, the timeline Tuesday 11:20 → Wednesday 08:30 → Wednesday 17:30 ("before
   tomorrow's viewing") → Thursday 10:00; replies natural with one question at most (D-97 "morning or afternoon"); the
   German email and the Spanish form and call shown translated for the reader with the original one tap away; no
   suggested free slots; the AI labelling kept on every channel.
6. **Controls**: tab and link states; the follow-up's action is a demo button that shows the request landing with the
   team (never a booked calendar); the phone channel has **no listening sample** (no approved audio exists, §5); Jarvis
   is personal; the important-enquiry chip is visible on the hot item; phone numbers carry "+34"; "One of your people
   finishes it" is replaced by "Nuova prepares, your team advises and closes"; Social has its own compact path
   (listing → draft → approval → published → comment, the comment styled as one, no advertising claim).
7. **Images and 3D**: the four listing photographs show rooms, architecture and terraces; the slider is labelled "first
   version / revised design" because the available "before" is furnished; the viewer picture is named a capture and
   the camera ride a video; `docs/website_redesign/media_in_3d/` does not exist yet (§5).
8. **Reporting**: the weekly summary answers three questions before any figure; four counts in the mail; details in the
   login; received, answered, viewings requested, confirmed by the team, tasks closed and proposals are separate lines;
   no revenue, no time saved; "Cifras de ejemplo" stands above the numbers; the sentence "Nada aquí es una estimación"
   is gone; `MAIL_SHELL_v1` is the one shell (logo, colours, width, button) with two fillings (weekly report, morning
   brief) and no automation footer; the login's Monday email renders on it; `REPORTS_CONTRACT_REQUEST_1010.md` is
   reused, no parallel contract. Copy's four terms of TEXTS_1013 §5 (received, answered, provider_accepted, delivered)
   are noted for the contract: the page renders only received and answered, never a delivery count.
9. **Packages**: one definition on the home, platform, product, packages, trial and login pages; the ladder's names
   (Essential, Growth, Enterprise) with `scale` as the unchanged id; staged, not same, functions; "Consultas procesadas
   al mes" with 750 / 3.000 / no cap exactly as `package-matrix.ts` carries them from the 2026-10-03 matrix; no
   plan-id or entitlement change; "Probar gratis" as the one general button; the trial scope explicit (14 days,
   Essential, no card); the setup explained in three calm steps (Copy's M-1, M-2, M-8 inside them); the CRM in two
   states (Copy's M-4, M-5; no Google Sheets line, M-6); no internal note about Daily, clips or builds in any customer
   view (the Daily page shows the board instead of the withheld recording).
10. **Claims**: language per channel and proof (L-1…L-3 on email and WhatsApp; nothing about the phone's or the form's
    languages; nothing about Outlook); the five reviewer findings: F-R16-1 and F-R16-2 closed on the page, F-R16-3 open
    by data, F-R16-4 with the owner/Copy/Hosting, F-R16-5 narrowed to Copy's lines (`ACCEPTANCE_LIST_1010.md` §F2);
    no legal text released by this lane; the demo character ("Ejemplo con personas e inmuebles inventados") and the
    publication gate (`ACCEPTANCE_LIST_1010.md`) unchanged.
11. **Delivery**: this document, the fixed commit and deployment, the before/after pictures, the film, the three lists
    in §5, no score.

## 4. What was measured on this deployment

`scripts/design/master-check.mjs`, **27 of 27**, headless Edge, `/es`:

| Interaction | Result |
|---|---|
| four layers at four speeds (stars > coast > ridges > 0, the panel with the page); the panel leans and comes upright, larger | desktop +19.0 / +11.8 / +5.9 px after 420 px, phone +7.7 / +4.8 / +2.3 px; the panel's matrix changes |
| no headline, button or story part of the panel covered by anything at five scroll positions; no card and no band exist | 0 hits, desktop and phone |
| the navigation on the sky at the top, the light bar after scrolling | yes |
| six chapters with a heading and a filled stage, Laura in every one | yes |
| every chapter and the social strip carry a state line; no letters; Wednesday before Thursday, no Friday; the email's action is a button | yes |
| the email's demo button, visible after its entry, shows the request landing with the team | yes |
| the German email shown translated, the original one tap away (`lang="de"`) | yes |
| the channel selector by click and arrow keys; the phone view carries call words and no WhatsApp step text | yes |
| the AI notice opens on every channel | yes |
| Jarvis: take and done by keyboard; the done line names who; the others stay open | yes |
| the 3D section (four stages, the truthfully labelled slider, the video named, the capture named) and the ladder; no proof-state label; no state word in the menu or ladder; no internal note | yes |
| no horizontal overflow and no element wider than the viewport at 390 and 768 | yes |
| FAQ: one open at a time, aria, no count, no row id | yes |
| reduced motion: everything visible, no layer moves, the panel keeps a fixed lean, no replay control | yes |
| without JavaScript: the hero's finished picture and all six chapters with their stages | yes |
| `/app/reports` without a session → the login with `next=`, and back | yes |
| with a session: the report with the label **above** the figures, the three meaning blocks, no "not an estimate" sentence, the email link; the package name on `/app`; the account link and log out in the header | yes |
| the Monday email in the shared shell with the logo, the subject with the figure, the button | yes |
| social screen B: a cover frame per listing, a draft control per publishable listing, switched off with its reason | yes |
| log out from the header: the root with a status line; the agency area asks for the login again | yes |
| contrast of small text, all sales routes | **0** below 4.5 : 1 |
| route scan · link matrix | 55 of 55 · 1532 of 1532 |

Also walked by eye on the local build and on the deployment: the hero at 0/25/50/75/100 % and the transition at 1440 and 390,
ES and EN; chapters A, B, D, F; the social strip; the report; the mail preview; the packages page. Not run: the older
suites that assert the former home page, the clip suite (Daily's recording stays withheld), Safari, a real phone.

## 5. The three lists

**Behoben (fixed in this build)**

- The first screen: the short exchange, the situation as one line inside the panel, no cards, no ivory band, the dark
  foot and the story's own edge (the owner's three points of 2026-10-12).
- Four depth layers at four measured speeds; the panel's rise and tilt within the order's figures; nothing covered.
- The story: letters gone, benefit headlines, state lines, alternating layouts, the short text in B, the timeline
  without "Friday", one question per reply, translated examples with the original, Jarvis personal, the important
  chip, "+34", the "finishes it" line replaced, the social path.
- The email's action as a real demo button; the 3D slider labelled truthfully; the viewer and the film named for what
  they are; the listing photographs replaced.
- The weekly report's order and meaning; the sentence removed; the package name in the session area; the mail shell.
- One package definition and one wording for the processing limit on every page; the ladder's names on the packages
  page without touching an id.
- Copy's D-94…D-106 and the TEXTS_1013 lines for this build (L-1…L-3, M-1…M-8) in place.
- Reviewer F-R16-1 and F-R16-2 closed on the page; F-R16-5 set to Copy's lines.
- No horizontal overflow on the phone (the chapter grid forced the page to 586 px at 390 before; fixed).

**Konkrete externe Abhängigkeit (a named lane holds the next step)**

| What | Who | The signal that closes it |
|---|---|---|
| The phone channel's listening sample (play/pause, duration, transcript) | Voice / API | one approved audio file of the intended voice with its transcript; then it is built on the phone channel |
| The unfurnished → furnished pair of the living room from the same camera; `docs/website_redesign/media_in_3d/` with origins; the viewer host | 3D | the files in `media_in_3d/`; then the slider says "unfurnished / furnished" |
| A listing with a stored cover on the staging read model, or the statement that none exists (F-R16-3) | Social, API | one fixture with `cover_url` |
| The weekly report's op and flags; the daily read model for `/app` | API, Reporting, Daily | `REPORTS_CONTRACT_REQUEST_1010.md`; Copy's four terms of TEXTS_1013 §5 bind to it |
| What `leads_month` counts (D-9) | API | the confirmation that it counts processed enquiries |
| Daily's clip v4 and stills with EST-204 and the Tuesday clock | Daily | the files; the Daily page then shows them again |
| Confirmation of the applied D-94…D-106, the chapter state lines, the new hero and social texts, and the placement of L-1…L-3 and M-1…M-8 | Copy | Copy's next check on this deployment |
| The legal pages' marks and the imprint route (F-R16-4) | Copy, Hosting | Copy's final texts and Hosting's purge path, after the owner's line below |

**Benötigte Owner-Handlung (only the owner can do it)**

- The visual verdict on this deployment (the card: five steps, no account needed).
- The company details, one line, for the imprint and the legal pages (FIRMENANGABEN).
- The display name "Enterprise" for the id `scale` (shown now; the id untouched).
- The Enterprise acquisition line (D-8) or its omission (omitted now).
- The 3D visual acceptance (`3D_OWNER_VISUAL_ACCEPTANCE`).
- The staging hold (`.staging-hold` stays until the owner's word).
- The owner's own screenshots of 2026-10-12, if they carry a point not listed here.

## 6. Building blocks and sources

| Block | Licence, source | Used for |
|---|---|---|
| Container Scroll Animation (Manu Arora, Aceternity) | MIT, public upstream | the panel's mechanics: perspective, rotateX to flat, scale, driven by the scene's own scroll measure (`components/ui/depth-scene.tsx`); no code copied |
| Animated List (Magic UI) | MIT, public upstream | adapted in `components/ui/animated-list.tsx`: the arrivals in A, the criteria in C, the conditions in E |
| Animated Beam (Magic UI) | MIT | already adapted (module pages), unchanged |
| framer-motion 11 (`LazyMotion`, `m`, `MotionConfig`) | MIT | the chapters' entries, reduced motion from the user's setting |
| Accordion (motion-primitives) | MIT | the FAQ and the trust questions |
| Pricing (Meschac Irung, tailark) | MIT | the ladder's structure |
| Lucide icons | ISC | the channel and action icons |
| Pexels photographs (12715501 Keegan Checks, 31817163 and 31817156 Ahmet Çötür, 7851904 Gabriela Pons, 10393597 Soontorn B) | Pexels licence (free, modification allowed, no attribution required) | the listing pictures and the dusk; `MEDIA_SOURCES_1010.md` |
| The 3D lane's living room (2026-10-05) | the lane's own files | the 3D section |
| mp4-muxer 5.2.1 (Vanilagy) | MIT, via jsDelivr, used only by the film script, not shipped | the scroll film |

No paid asset or service was added.

## 7. Known limits, said plainly

- The first screen at 1440×900 shows the panel's head (chips, situation, the enquiry), not the whole exchange; the rest
  follows within the first scroll. Whether that is enough "product beside the headline" is the owner's verdict.
- The stub build's demo session is a stub; the staging preview is held; nothing here proves a backend path.
- The film is a screen recording of the deployment at 30 fps from a headless browser; the browser's own scroll
  smoothing is not in it.

## 8. Handoffs

| To | What |
|---|---|
| Copy | the changed texts of this build (hero situation and state line, chapter state lines, the social strip, the report's meaning blocks, the mail shell's fillings, the packages page, the trust section's three steps and two CRM states): confirmation or replacement; the placement of L-1…L-3 and M-1…M-8 |
| Reviewer | this deployment, dpl_CXhRM6HanhgP7AX4zFinZzjQ1G4N |
| Audit | this return, `ACCEPTANCE_LIST_1010.md` §F2 (R-1…R-12 and R-5b), `evidence_2026-10-12/`, `MEDIA_SOURCES_1010.md`; `MAIL_SHELL_V1` with its hash above |
| Hosting, Daily | `MAIL_SHELL_v1.html` and `MAIL_SHELL_v1_FILLINGS.md` as the one shell for the weekly report and the morning brief |
| Owner | the card, the verdict, the lines in §5 |

`HANDOFF_1010_PAUSE.md` and `WEBSITE_MASTER_1010_RETURN_v1.md` §1 (the evidence folder of 2026-10-10) are superseded for
the pictures; the master return's §2–§9 still describe what did not change.
