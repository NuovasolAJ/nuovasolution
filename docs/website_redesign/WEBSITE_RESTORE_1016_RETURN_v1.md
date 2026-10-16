# WEBSITE RESTORE 1016 — the site as it was before v4, plus the owner's small points

**State:** `2026-10-16` · **Lane:** Website Implementer → **Owner** (visual verdict), Copy, Reviewer, Audit.
**Order:** the owner's verdict on v4 (2026-10-16): "stelle mir die Seite so her wie sie vorher war, nur mit den kleinen
Punkten: kein Jarvis im Namen, EST-204 usw.; 'enquiries processed per month' ist Schwachsinn; die vier Ebenen von fora.so
(Berg hinten, zweite Bergebene, Tablet, eine Ebene davor); das Tablet größer; die Karten übereinander; die
Farbkomposition; Plataforma übersichtlich".
**Status:** implemented and awaiting independent technical and final audit. v4 (`7e3b224`…`d5c6990`) is withdrawn; its
documents stay in the repository as history (`WEBSITE_V4_1016_RETURN_v1.md`, `evidence_2026-10-16/`).

```
WEBSITE_RESTORE_1016 = 565316d dpl_FtFedJRrXZ8LorsNYSHcQoJGGcCA
```

| | |
|---|---|
| Preview (alias, always the newest build) | https://nuovasolution-design-preview-git-we-eeb43f-nuovasolajs-projects.vercel.app/es · `/en` |
| This deployment | https://nuovasolution-design-preview-28l13ofne-nuovasolajs-projects.vercel.app |
| Code | `3fae766` restored for every page and script, plus the small points in 565316d |
| Staging preview | still **held** on `486bfe8`; nothing was sent to staging or production |
| Browser | headless Edge (Chromium), 1440×900, 768 (overflow), 390×844. **No Safari, no real phone.** |
| Owner's card | `OWNER_ACCEPTANCE_CARD_1010.md`, rewritten for this state |

## 1. Restored exactly as before

The home page with the dusk hero, the story A–F with its six interactive scenes (channels, translation, the morning
assistant's list with take and done, the email's demo button, the week's figures), the social strip, the 3D section with
its four stages, slider and camera ride, the "Empezar" section, the ladder; the module pages, the trial, the packages, the
login area, the reports, the Monday email. Every text of `3fae766` (Copy's D-94…D-106 and TEXTS_1013 lines included).

## 2. The small points, applied on that state

| Owner | Now |
|---|---|
| Die vier Ebenen von fora.so: Berg hinten, zweite Bergebene, Tablet, eine Ebene davor | The hero's land has four layers again: a **far ridge** (lighter, slower) behind the **near ridge**, the **panel**, and a **foreground** (a near ground in the hero's own dark) in front of the panel's foot, moving ahead of the page. Measured speeds in §3 |
| Das Tablet ist viel kleiner geworden | The stage is 1140 px wide (was 1000), the panel grows to 1.06 as it stands up (was 1.04); its lean is 12° |
| Die Karten übereinander (Animation) | The six chapters are a **deck** on desktop (≥ 1024 px, ≥ 700 px high, no reduced motion): each chapter sticks below the header and the next slides over it, the covered one steps back (`components/site/stack-deck.tsx`, already in the project). On phones and without JavaScript the chapters follow each other as before |
| Farbkomposition: „A la mañana“ hat eine andere Hintergrundfarbe | One field colour behind every scene (the sand gradient); the sky-blue and sage fields are retired |
| Kein Jarvis im Namen | "Jarvis" appears nowhere public: "el asistente de la mañana" / "the morning assistant" (menu, chapter D, the ladder, the packages page). The story is unchanged otherwise |
| Zu oft EST-204 | The references leave the dialogues ("el piso de Estepona", "la villa de Elviria"); they stay on the record fields and the listing cards, where they belong |
| „Enquiries processed per month“ ist Schwachsinn | "Consultas al mes" / "Enquiries a month" on the ladder and the packages page; the explanatory note is gone; "sin límite" / "unlimited" for Enterprise |
| Pakete erklären nicht alles | Each package: for whom (the size), what changes in the day (one sentence), what is added, the figures |
| Plataforma unübersichtlich | The menu: four words (Atender · Gestionar · Coordinar · Captar) plus "Visión general". The platform page: the four tasks as four sections, each with its entries on one line grid, every entry clickable; then the module pages as a list; then "per order" and "being built" once. The demonstration with the duplicated lead list is gone |

Not changed, on purpose: the state lines of the chapters, the hero's situation line, the 3D section, the social strip,
the trust section, the texts of `3fae766`. v4's `/hoy`, the loss scene and the eight moments are withdrawn.

## 3. What was measured on this deployment

`scripts/design/master-check.mjs` (the 27 checks of `3fae766`), **27 of 27**:

| Check | Result |
|---|---|
| stars > sky > ridges at three speeds; the panel leans and stands up, larger | desktop +19.1 / +11.9 / +5.9 px after 420 px, phone +7.7 / +4.8 / +2.2 px; the far ridge and the foreground move with their own distances (CSS `--depth-ridge-far`, `--depth-front`) |
| nothing covers the headline, the buttons or the four parts of the panel at five scroll positions | yes (the foreground crosses only the panel's empty foot) |
| the six chapters with Laura; the state lines; the email's demo button; the translation; the channels by click and keyboard; the notice; the task by keyboard | yes |
| the 3D section labelled truthfully, the ladder, no proof-state label, no internal note | yes |
| no horizontal overflow at 390 and 768 · FAQ · reduced motion · without JavaScript · login gate · reports · package name · session header · mail shell · social B · logout | yes |
| contrast of small text, all sales routes | **0** below 4.5 : 1 |
| route scan · link matrix | 55 of 55 · 1064 of 1064 |

Pictures in `docs/website_redesign/evidence_2026-10-16b/`: the hero at 0/25/50/75/100 % and the edge into the story
(desktop and phone, ES and EN), the chapter deck at two positions, the platform page, the menu, the packages.
Film: `evidence_2026-10-16b/film/story-film-d1440-es.mp4` (the hero, the six scenes with their controls, the 3D section; 55 s, complete, recorded with timing slips because the deck makes every frame heavier to paint).

## 4. Lists

**Behoben:** every row of §2.

**Externe Abhängigkeit:** unchanged from `WEBSITE_REDESIGN_FINAL_1012_RETURN_v1.md` §5 (3D material, phone audio, cover
fixture, reports contract, Copy's confirmation of the changed texts: the menu words, the platform sections, the
packages' "for whom / what changes", the assistant's public name, the dialogue lines without references).

**Owner-Handlung:** the visual verdict; the public name of the morning assistant ("el asistente de la mañana" is the
implementer's choice); prices or a price frame; the 3D material.

## 5. Said plainly

- The deck makes the chapters sticky on desktop; a chapter taller than the window is read to its end before the next
  one covers it. If the owner prefers the chapters without the deck, it is one wrapper to remove.
- The restore reverts v4 completely; nothing of v4 remains on any page except the four-word menu, which the owner's
  platform point asked for.
