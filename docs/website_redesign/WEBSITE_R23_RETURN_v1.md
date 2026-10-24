# WEBSITE R23 — the owner's picture findings of 23.10., Copy's lines on a76e6e1, the previews without a login

**State:** `2026-10-24` · **Lane:** Website Implementer → **Owner** (the card `OWNER_ACCEPTANCE_CARD_1010.md`: five steps at the
PC, five on the real phone), **Copy** (§3: what of W-1…W-13 was applied, what waits), **Reviewer** (RV on exactly this
deployment), **API / Lead / Daily** (Copy's Q-1…Q-4), **PM** (E-FU2 test page, §4), **Hosting** (H16 after the owner's
verdict), **Audit** (`ACCEPTANCE_LIST_1010.md` §F8).
**Order:** `governance/R23/10_WEBSITE.md` (23.10.), on `a76e6e1` (RV3 `344feef`: design PASS, promises PASS, 3D open;
Copy `f37157b`: handover 38/38, the language claim found in the FAQ, W-1…W-13, Q-1…Q-4).
**Status:** implemented and awaiting independent technical and final audit. Headless checks are mine; the real phone is
the owner's; the real mail client is Hosting's test mail.

```
WEBSITE_R23         = 9f6c65e dpl_C7hvT71vZZCi8YUUgSarodHQNhro   (presentation build, mode stub)
WEBSITE_R23_STAGING = 9f6c65e dpl_H2UB1acA8G5UFVkLbdKbVfhqG4p5   (onboarding build, mode staging)
```

| | |
|---|---|
| Presentation build | https://nuovasolution-design-preview-1pfs923d9-nuovasolajs-projects.vercel.app (`/es`, `/en`); `/api/build` → `mode: stub` |
| Staging-backend build | https://nuovasolution-staging-preview-dq8btlwhe-nuovasolajs-projects.vercel.app; `/api/build` → `mode: staging` |
| Code | `2dd80da` (the owner's findings, the previews, the test page) + `9f6c65e` (Copy's W-rows); both with an explicit pathspec; Copy's `f37157b` and the Reviewer's `344feef` lie between them untouched |
| Before | `a76e6e1` / `dpl_GLRzbYXujgTNW1MvS6TboEyF889m` |
| Browsers and devices really checked | headless Edge (Chromium) at 390×844 (mobile emulation), 768×1024, 1366×650, 1366×768, 1440×900, 1920×1080; **no Safari, no Firefox, no real phone, no real mail client** |

## 1. The owner's picture findings (point 1), one by one

| Picture | Finding | What stands on `9f6c65e` | State |
|---|---|---|---|
| 01 | hero layers and transition | unchanged since `deb9b66` (one landscape in four depths, the panel from 18°, the light pool under its foot); RV2 and RV3 measured it PASS. I could not see the picture, so I did not change the scene on a guess | **open until the owner names the fault** |
| 02, 04 | natural dialogues | the hero exchange shortened ("¡Hola, Laura! Sí, la terraza da al sur y el piso incluye plaza de garaje. Te envío la ficha… ¿Buscáis vivienda habitual o segunda residencia?"), Laura's second message ("Vivienda habitual. Nos gustaría verlo la semana que viene…"), the reply ("Perfecto, Laura, lo anoto. Una compañera de la agencia te escribe con día y hora…"), Elena's message in D; "vivienda habitual" instead of "para vivir todo el año" everywhere | fixed |
| — | the hot lead unambiguous | one wording in the hero result, the alert card in D and the badge: **"Aviso por email a tu equipo"** / "Aviso de consulta importante · por email"; the FAQ now says yes, by e-mail (Copy W-2) | fixed |
| 05 | honest social follow path | the public reply is a person's ("Respuesta pública · la escribe una persona de tu equipo"); the comment becomes a new contact on a record; "Nuova no responde en público por sí sola" | fixed |
| 07 | packages: available vs planned | a filled check only on available lines, a hollow ring on planned or to-order lines, on the ladder and on the packages page; the planned lines in the secondary colour | fixed |
| 08 | order packages / FAQ | the packages now stand before "Cómo empiezas" and its questions on the home page | fixed |
| 06 | 3D video starts at 0:04 | the ride starts at 0:00; its poster is the scene's own 4-second frame (`living-ride-poster.webp`), so the render of step 03 is not shown twice | fixed |
| 03 | phone scene Spanish only | "Atendida por el asistente · solo en español"; "El asistente telefónico habla solo español…"; chapter A's state names it; the default-language sentence removed from the setup step (Copy W-6, Voice 23.10.) | fixed |

## 2. The other points

| Point | State |
|---|---|
| 2 previews without a login | `/es/preview/weekly` and `/es/preview/brief` (and `/en/…`): the weekly report in the new layout and the morning brief, demonstration data, labelled, **stub build only** (404 on the staging build), not linked, noindex. The owner's card names them |
| 3 Copy's deviations | W-1…W-12 applied in `9f6c65e` (§3); W-13 is the owner's; Q-1…Q-4 wait for API, Lead and Daily, the fallbacks are ready |
| 4 3D | unchanged, "Pendiente del equipo 3D" on steps 3 and 4 |
| 5 the legal notice | waits for E14 (API's completeness signal), then Copy fills the five fields and the website publishes on nuovasolution.com; the privacy notice only after counsel. Nothing published now |
| 6 proofs apart | headless: §5; real phone: the five steps in the owner's card, with the link; real mail client: Hosting's H16 test mail after the owner's verdict on the weekly layout |
| E-FU2 (owner 23.10.) | the test listing page `/es/prueba-objeto` (§4) |

## 3. Copy's lines (COPY_SYNC_1023 §3), what was applied

| # | Applied as | Note |
|---|---|---|
| W-1 | FAQ "¿En qué idioma…?" → "En español. En otro idioma no se envía nada automáticamente." | the language claim's last place |
| W-2 | FAQ "¿Me dice qué leads están calientes?" → "Sí, por email…" | |
| W-3 | every platform row carries its state ("Disponible" · "En preparación · todavía no contratable" · "Por encargo"); 18 rows, 9 in preparation | `data-platform-entry-state` |
| W-4 | the hero's channel row: WhatsApp and Email only | web form and call stay in story A as prototypes |
| W-5 | hero result "Aviso por email a tu equipo" | |
| W-6 | "…el aviso de IA que lleva cada respuesta." (no default language) | |
| W-7 | Laura's record card on `/platform/lead-intelligence`: 2 dormitorios, Estepona · la semana que viene · español | |
| W-8 | trial step "Fuentes de leads": "Dinos de dónde te llegan hoy los leads. Conectar esas fuentes está en preparación." | |
| W-9 | story B `did`: "…; en otro idioma no envía nada." | |
| W-10 | FAQ ads: "No. No hacemos campañas ni compramos leads. Más adelante recogeremos…" | |
| W-11 | the proposal: "Laura, tenemos dos pisos que encajan con lo que buscas: …" | |
| W-12 | `+34600123456` everywhere (story, morning list, brief) | |
| W-13 | **not applied**: the English module names stay until the owner decides | owner |
| Q-1…Q-4 | **not applied**: the fallbacks stand ready in Copy's table; applied in one pass once API, Lead and Daily answer | API, Lead, Daily |

The R23 texts of §1 (dialogues, alert wording, social lines, phone lines) are WORKING by the implementer; Copy reads them
on this build: `heroEnquiry`, `heroReply`, `results[2]`, `enquiries[0].text/reply`, `task.chatConfirm`, `task.alert.label`,
`task.important`, `reply.callAnswered`, `reply.phoneCaveat`, chapter A `state`, `social.replyLabel/reply/noAvailability/did/line/post.next`.

## 4. E-FU2: the owner's test listing page

`/es/prueba-objeto` (`app/[locale]/prueba-objeto/page.tsx`): one listing marked **[PRUEBA]** in the title and in a bar over
the picture, with reference `PRUEBA-001`, price, place, facts, availability, "updated" date and a JSON-LD `Offer` block
for the availability checker. Demonstration content: the site's own licensed sample photo (Pexels 12715501) and a text
that says it is a test, not an offer. Not linked, `noindex`, **stub build only**. Still needed: PM's minimum fields (what
the checker reads), the owner's own text and picture, the owner's release of the address (the design preview is not a
domain the owner controls in the sense of E-FU2; publishing on nuovasolution.com is a separate owner word), and the
removal after the test.

## 5. Technical checks on the presentation build

- `scripts/design/master-check.mjs` **31 of 31** (the 28 of R20 plus: the previews without a login, the R23 findings
  (poster, social, section order), Copy's W-rows (hero channels, FAQ language and hot lead, platform states, E.164)).
- Contrast: **0** below 4.5 : 1.
- Routes **55 of 55**. Links **1064 of 1064**. `next lint` clean, `tsc` clean.
- Staging build: `/api/build` `mode: staging`; the three new routes answer 404 there, as intended.

## 6. What to look at

Folder `docs/website_redesign/evidence_2026-10-24/`: `hero/`, `widths/` (+ `stages.json`), `story/`, `sections/`, `mail/`,
`app/`, `pages/` as in R19/R20, plus `r23/` (the weekly and brief previews without a login, desktop and phone; the test
listing; the FAQ answers opened; the platform rows with their states; the 3D step with its poster) and `staging/`.
No new film: the scroll and the layers are unchanged since `deb9b66` (`evidence_2026-10-19/film/`).

## 7. Open

| What | Who |
|---|---|
| Picture 01: what disturbs in the hero layers | Owner |
| The weekly report layout's release → H16 test mail | Owner, Hosting |
| W-13; Q-1…Q-4 | Owner; API, Lead, Daily |
| E-FU2 fields, text, picture, address | PM, Owner |
| 3D pair and turn | 3D |
| E14 → legal notice | Owner, API, Copy |
| Real phone (card), real mail client (H16) | Owner, Hosting |

## 8. Said plainly

No backend path is proven by either deployment. Every figure is an example and says so. The hero was not changed on a
picture I have not seen. No grade is claimed.
