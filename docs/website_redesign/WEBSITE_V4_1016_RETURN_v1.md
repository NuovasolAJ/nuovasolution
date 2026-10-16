# WEBSITE V4 1016 — the redesign after the owner's verdict of 2026-10-16: pain first, four layers, one ground, one truth

**State:** `2026-10-16` · **Lane:** Website Implementer → **Owner** (visual verdict, the card), **Copy** (every text of
the new home, §7), **Reviewer** (this deployment), **Audit** (`ACCEPTANCE_LIST_1010.md` §F2/§F3, the evidence folder).
**Order:** the owner's messages of 2026-10-16 ("die Webseite muss in allen Punkten jetzt auf eine 10 von 10 kommen":
verständlich ohne Monstertexte · modern/Luxus mit Animationen, nichts KI-Default · roter Faden Schmerz → Lösung ·
Conversion in den 14-Tage-Test; "du bist der Redesign-Chat, also mache"), on the basis of `WEBSITE_AUDIT_1016.md`,
`CONTENT_MODEL_1016.md` and `DESIGN.md`.
**Status:** implemented and awaiting independent technical and final audit. No score is claimed; §4 lists what was
measured and §6 what only the owner can judge.

```
WEBSITE_V4_1016 = d5c6990 dpl_Hbsf1LsTLoT6hrQuxjye9mVELBcc
```

| | |
|---|---|
| Preview (alias, always the newest build) | https://nuovasolution-design-preview-git-we-eeb43f-nuovasolajs-projects.vercel.app/es · `/en` |
| This deployment | https://nuovasolution-design-preview-1tk1ik0ui-nuovasolajs-projects.vercel.app |
| Code | `7e3b224` (home v4, /hoy, the platform page as the story, the menu, the packages) and `d5c6990` (the subpage bands on the canvas; the film script for the v4 home) |
| Before | `3fae766` / `dpl_CXhRM6HanhgP7AX4zFinZzjQ1G4N` (the delivery the owner rejected) |
| Staging preview | still **held** on `486bfe8`; nothing was sent to staging or production |
| Browser | headless Edge (Chromium), 1440×900, 768 (overflow), 390×844. **No Safari, no real phone.** |
| Owner's card | `OWNER_ACCEPTANCE_CARD_1010.md`, rewritten for v4 |

## 1. What changed, against the owner's points

| Owner (2026-10-16) | Now |
|---|---|
| Ebenen schlecht, Fora-Ebenen rausgeschmissen, Tablet dreht sich nicht nach vorne | Four layers on the section itself (stars, coast, ridges and land, the panel), measured at four speeds (§4); the panel leans **18°** and stands up on the scroll, grows 0.9 → 1, and hangs over the hero's edge into the page |
| Hero schwarz, darunter alles weiß; Text geht im Hintergrund unter | No band and no edge: the product carries the page from dark to light; both headline lines ivory on a darkened sky; the scene fills 1920 px as well as 1440 |
| Zu viele Texte, kein roter Faden | Home ≤ 900 words (measured §4). The thread: the pain in one sentence → the loss on the scroll (a sentence lighting up word by word, the clock 11:20 · +5 min · +30 min · +2 h, "Perdida") → the same enquiry with Nuova → what Nuova does, four rows → the morning → three steps → packages → three questions → the test |
| Beim Scrollen poppt alles auf wie Laden | No entry animation on the home page (0 `.reveal`, measured). Motion only where it explains and only on the scroll: the hero's layers and tilt, the loss sentence and its clock |
| Zu viele Farbtöne; „A la mañana“ anders | One ground (ivory) and one dark scene (hero). The pastel fields and the beige bands are retired everywhere (one CSS rule); line grids instead of cards; the accent only on the primary button and the important enquiry |
| Jarvis ist intern | "Jarvis" appears nowhere public (measured on every route): "la lista de la mañana" / "the morning list" |
| Zu oft EST… | 0 property references on the home page (measured; the limit is 2) |
| Boxen gequetscht | The record and figure excerpts keep ≥ 300 px and never break a number; the hero's record is one line |
| Plataforma reines Chaos | The menu: four words (Atender · Gestionar · Coordinar · Captar) plus "Visión general" and "Qué está disponible hoy"; the module pages carry the same task names; `/platform` is the product story (six interactive scenes, the social path, 3D), the duplicated "02 Registrada / 03 Hecha" list is gone |
| Pakete erklären nicht alles | Each package: for whom (size), what changes in the day (one sentence), what is added, the figures; the price sentence once; "WhatsApp y email" (the web form and the phone are "in preparation" on /hoy) |
| „Una publicación“ leer und tot; 3D 04 soll rotieren, leer/möbliert | Both moved off the home page to `/platform`. The social strip and the 3D section stand as before; the rotating building and the unfurnished/furnished pair need the 3D lane's material (§6) |
| Startseite Zielprodukt, Unterseiten alter Stand; Widersprüche | One vocabulary (menu, home, module pages, footer); the product truth stands on **/hoy** only (three lists from one source plus Copy's language, email and CRM lines); the state lines left the sales pages; phone and web form are sold nowhere |
| Keine Animationen (nutze 21st) | The principles of Container Scroll Animation (Aceternity, MIT) for the panel and of fora.so's statement for the loss sentence, built with the project's own `--depth` scene and CSS `calc()`; no new library, no licence question |

## 2. What to look at

Folder `docs/website_redesign/evidence_2026-10-16/`.

| Where | What |
|---|---|
| `hero/` | the hero at 0/25/50/75/100 % and the edge into the loss scene, desktop and phone, ES and EN |
| `moments/` | the loss scene at three points of its travel, each moment, the menu, the whole page (desktop and phone), `/hoy`, `/platform` (story D, social, 3D), `/packages` |
| `app/`, `pages/` | the login area (unchanged in v4), a module page with the new name, the trial page, `/hoy` and the packages on the phone |
| `film/story-film-home-d1440-es.mp4` | the home from the hero to the closing sentence, the loss scene developing on the scroll |
| `film/story-film-platform-d1440-es.mp4` | the six scenes of `/platform` with the channel change, the translation, the task taken and closed, the request sent |
| `BEFORE_AFTER_*.png` | `3fae766` next to now: the hero, the transition, the story moment, the menu |
| `checks/master-check.json` | the 31 measured checks |
| `contrast/`, `route_scan/`, `links/` | the suites on this deployment |

## 3. The content model and the design rules

`CONTENT_MODEL_1016.md`: one statement, one button and a word limit per route; the home in eight moments.
`DESIGN.md`: two grounds, one accent, two radii, line grids, the type scale, the motion rules (scroll-bound only, end
states without JavaScript and with reduced motion), the word rules (no internal names, truth on /hoy, references ≤ 2).
Every build is measured against both (§4).

## 4. What was measured on this deployment

`scripts/design/master-check.mjs`, **31 of 31**, headless Edge:

| Check | Result |
|---|---|
| four layers at four speeds; the panel leans and stands up | desktop +25.7 / +15.4 / +7.0 px after 420 px scroll, phone +11.8 / +7.1 / +3.4 px |
| nothing covers the headline, the buttons or the panel at five scroll positions; no card, no band, no fade | yes |
| the loss scene develops on the scroll (last word, last beat, "Perdida": dim before, full after; the card fades); the primary button is the trial | yes, desktop and phone |
| words on the home page · Jarvis · property references · internal names · state lines · demo lines · entry fades · menu | 896 · 0 · 0 · 0 · 0 · 1 · 0 · 4 one-word tasks |
| `/platform`: six chapters with Laura; no state lines; Wednesday before Thursday; the email's button; the translation; the channels by keyboard; the notice; the task | yes |
| `/platform`: the 3D section labelled truthfully; no internal note; the ladder on the home page without proof labels | yes |
| `/hoy`: three states with every entry of the platform map, Copy's language line, no Sheets or Outlook line | yes |
| no horizontal overflow at 390 and 768 | yes |
| FAQ · reduced motion · without JavaScript (hero, loss sentence, the six chapters) · login gate · reports · package name · session header · mail shell · social B · logout | yes |
| contrast of small text, all sales routes | **0** below 4.5 : 1 |
| route scan · link matrix | 57 of 57 · 1070 of 1070 |

## 5. Lists: behoben · externe Abhängigkeit · Owner-Handlung

**Behoben:** every row of §1.

**Konkrete externe Abhängigkeit**

| What | Who | Closes with |
|---|---|---|
| The rotating building (turntable video, no UI) and the unfurnished → furnished pair from the same camera | 3D | the files in `docs/website_redesign/media_in_3d/`; the 3D section on `/platform` then shows them |
| Confirmation or replacement of every new text (home v4, /hoy, the menu words, the packages' "for whom / what changes", the module page names) | Copy | Copy's check on this deployment |
| The phone's listening sample | Voice / API | one approved audio file with its transcript |
| The reports contract, the daily read model, the social cover fixture, the legal pages (unchanged from the 2026-10-12 return) | API, Reporting, Daily, Social, Copy, Hosting | as in `WEBSITE_REDESIGN_FINAL_1012_RETURN_v1.md` §5 |

**Benötigte Owner-Handlung**

- The visual verdict on this deployment (the card).
- The public name of the morning assistant: "la lista de la mañana" is the implementer's choice until the owner names it.
- Prices or a price frame for the packages (today: one sentence, "te decimos el precio antes de acordar nada").
- Phone and web form: sold, in preparation (as now, on /hoy) or dropped.
- The truth on one page: /hoy carries it, the sales pages do not. Copy and Audit confirm this placement.
- The 3D material and one real proof (a real Spanish reply, anonymised), when they exist.

## 6. Known limits, said plainly

- The headings of the local build render in a serif because the local font fails to load; the deployment renders the
  site's sans. The evidence pictures are from the deployment.
- The loss scene's travel is 240 vh; on very short windows (< 600 px high) the beats light up close together.
- The home's product excerpts are static markup; the interactive scenes are on `/platform`.
- The hero's typing sequence still runs once on entry (and again on the button); everything else on the home page is
  scroll-bound or still.

## 7. Handoffs

| To | What |
|---|---|
| Copy | `lib/content/home-v4.ts`, `lib/content/today.ts`, the menu words in `platform-map.ts`, the names in `capabilities.ts`, the packages' `who`/`change` in `package-matrix.ts`, the platform page's h1/lead in the dictionaries |
| Reviewer | this deployment, dpl_Hbsf1LsTLoT6hrQuxjye9mVELBcc |
| Audit | this return, `ACCEPTANCE_LIST_1010.md` §F3, `CONTENT_MODEL_1016.md`, `DESIGN.md`, `evidence_2026-10-16/` |
| 3D | the turntable and the pair (§5) |
| Owner | the card, the verdict, the lines in §5 |
