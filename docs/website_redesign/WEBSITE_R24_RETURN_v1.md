# WEBSITE R24 FINAL — the owner's 18 pictures, the audit's findings per picture, the 3D lane's assets, one final named build

**State:** `2026-10-26` · **Lane:** Website Implementer → **Owner** (the card `OWNER_ACCEPTANCE_CARD_1010.md`), **Copy** and
**Reviewer** (the joint closing check on exactly this build: §1 per picture, FAQ, every subpage, the mail previews, the 3D section),
**Hosting** (`WEBSITE_TO_HOSTING_1025_WEEKLY_LAYOUT_OK.md`: the owner's "Layout OK" → H16), **3D** (§3), **PM** (§5), **Audit**
(`ACCEPTANCE_LIST_1010.md` §F9).
**Order:** `AUDIT_ORDERS_R24_PROMPTS_R24.md` block 10 (R24 FINAL, 24.10.), with `AUDIT_ORDERS_R24_BILDBEFUNDE_R24_v1.md` (the audit's
findings per picture), `AUDIT_ORDERS_R24_AUDIT_TO_LANES_2026-10-24_R24.md` (R24-a…m) and `AUDIT_ORDERS_R24_OWNER_DECISIONS_2026-10-24_R24.md`.
**Status:** implemented and awaiting independent technical and final audit. Simulation (headless Edge) and the owner's view are
reported apart (§6, §8). No "closed" is claimed here for anything the owner, Copy or the Reviewer still has to look at.

```
WEBSITE_R24         = 596679b dpl_CCgn42YAPWwoMT3HKMnSrj4GQZHi   (presentation build, mode stub)
WEBSITE_R24_STAGING = 596679b dpl_CWR3NKKTSgaNs64xi9eD469dyGyJ   (onboarding build, mode staging)
```

| | |
|---|---|
| Presentation build | https://nuovasolution-design-preview-chhbk3js9-nuovasolajs-projects.vercel.app (`/es`, `/en`); `/api/build` → `mode: stub` |
| Staging-backend build | https://nuovasolution-staging-preview-q98d818q2-nuovasolajs-projects.vercel.app; `/api/build` → `mode: staging` |
| Code | `deae52a` (the owner's pictures, the 3D assets, 25.10.) + `596679b` (Copy's X-1…X-14, the Q-1/Q-2 fallbacks, the Reviewer's picture-03 and picture-07 conditions, 26.10.); both with an explicit pathspec; Copy's `9bb12f8` and the Reviewer's `611921f` lie between `10808e8` and `deae52a` untouched |
| Before | `9f6c65e` / `dpl_C7hvT71vZZCi8YUUgSarodHQNhro` (the build Copy and the Reviewer pre-checked on 25.10.) |
| Browsers and devices really checked | headless Edge (Chromium) at 390×844 (mobile emulation), 1024×900, 1100×900, 1366×768, 1440×900, 1920×1080; **no Safari, no Firefox, no real phone, no real mail client** |
| Not received by the website lane | the external website review (neither the audit nor Copy received it, `WEBSITE_COPY_SYNC_1024_RETURN_v1.md` §0); PM's minimum fields for E-FU2; API's, Lead's and Daily's answers to Q-1…Q-4 (Copy's fallbacks and the Q-4 proposal stand in this build, §4) |
| Read and applied | `WEBSITE_COPY_SYNC_1024_RETURN_v1.md` (Copy, 25.10.): X-1…X-14 and the Q-1/Q-2 fallbacks in `596679b`; X-15/X-16 met by the 3D assets. `REVIEWER_SYNC_1024_RETURN_v1.md` (Reviewer, 25.10.): the two closing conditions (03 at 1024 px, 07 Enterprise) in `596679b` |

## 1. The owner's pictures, one by one (R24-l): page, finding, correction, build, evidence

Pictures 01–05 and 07–13 are the website's; 06 and 14–18 are the 3D viewer's (the 3D lane's table; what the website took from
them stands under 06). Every finding of the audit's table is answered; "crop" means the cut of the owner's screenshot, not a layout
fault, and is still shown on the same cut in the evidence so the owner can compare.

| # | Page | Finding (audit / owner) | Correction on `596679b` | Evidence (`evidence_2026-10-26/r24/`) |
|---|---|---|---|---|
| 01 | `/es`, hero | (1) the fixed header covers the hero buttons at the owner's scroll position; (2) the demo card runs out into fog and hills, an unclean transition to "Así trabaja Nuova"; (3) the language note small in the card's foot; (4) no readable hero statement on the first screen. Owner: hero readable earlier, a clean transition, the actual logo | (1)+(4) the panel's lean is light now (12°, 28 px, 0.95 → 1.03 instead of 18°, 56 px, 0.9 → 1.05) and the stage sits 10 px closer: at 1366 × 768 the headline, the lead, both buttons, the trial line **and the panel's head** stand on the first screen (panel top at 613 px); a fixed header covers whatever scrolls under it, so the buttons are under it only while the panel is being read — that is the header's behaviour, not a fault. (2) the foreground scrub layer and the radial fog mask are gone: the hero ends on **one straight ivory edge**, the ground band is the story's canvas colour and the panel's foot stands on it. (3) the limit line is 14 px, ink-800, with a ring mark (was 12 px grey). Logo: the official PNG as an image, inverted to ivory on the dark hero and in the footer (the CSS mask did not show in the owner's Chrome) | `p01-hero-top-1366.png`, `p01-hero-panel-1366.png`, `p01-hero-edge-1366.png`, `p01-hero-top-1920.png`, `p01-hero-panel-1920.png`, `p01-hero-m390.png`, `p01-hero-panel-m390.png`, `p12-hero-state-1920.png` |
| 02 | `/es`, D before the take | in order; checked against 03 and 11 | the morning list unchanged; the take → propose → done steps as before | `p02-daily-before-1366.png` |
| 03 | `/es`, D after the take | (1) the right text column cut to letter remnants; (2) after the take the task stays visible with its history while the daily page says "Desaparece de las listas de los demás" (Q-4) | (1) the owner's 738 px picture is a cut of a wider window, **but the Reviewer reproduced a real collapse at 1024 px** (three text boxes of chapter A 47–54 px wide; measured by me too on `deae52a`: 53–73 px). Cause: between 1024 and 1279 px the chapter splits into two columns and the stage is ≈ 456 px wide, too narrow for a two-column stage inside it. Fix in `596679b`: the stages of A, B and E stack to one column from 1024 to 1279 px and stand side by side again from 1280 px. (2) **Copy's X-9/X-10 (Q-4 proposal until Daily confirms)**, one sentence for both surfaces: "Quien toma una tarea se hace cargo de ella: desaparece de las listas de los demás, y el asistente de la mañana dice quién la ha tomado." on the daily page and in its scenario; under the morning list "En la lista de los demás ya no aparece; el asistente de la mañana dice quién la ha tomado."; the FAQ answer per X-6. Note for Daily: its read model (`DAILY_TEAM_TODAY_READ_MODEL_1012.md` §3) returns claimed requests in the **team** scope ("that is the point of a team view") while `mine` excludes them; Copy's sentence describes the `mine` lists and the assistant. Daily settles the wording | `p03-daily-after-1366.png`, `p03-daily-after-1024.png`, `p03-chapter-a-1024.png`, `p11-daily-assistant-what-1920.png` |
| 04 | `/es`, social | (1) "Estado: Prototipo…" cut at the top; (2) a large empty field under the example; (3) the picture rights of the interior photo; (4) "Publicada en tu cuenta" in the example although the function is a prototype | (1) **crop** (the state line is the last line of the text block above the example). (2) the post card is shorter (3:2 picture, 380 px) and the two columns align at the top; the field under the comment column is the chapter's own padding now. (3) the photo is Pexels 12715501 (Keegan Checks), Pexels licence, `MEDIA_SOURCES_1010.md` §1; the source now stands under the example. (4) the post card carries the mark **"Ejemplo · prototipo"** in its head and, over its timeline, Copy's caption **"Ejemplo: así funcionará cuando la plataforma lo apruebe."** (X-13); the state line says "Prototipo · depende de la aprobación de la plataforma" | `p04-social-1366.png` |
| 05 | `/es`, 3D | (1) the headline cut by the header; (2) steps 03 and 04 "Pendiente" although 3D delivered the pair and the turn; (3) "Dormitorio 2" over the door arc; (4) step 02 a white render without a visible relation to the plan; (5) step 04 a 7-second ride instead of turn, zoom and floors | (1) **crop** (the sticky header at the owner's scroll position). (2)–(5) **the 3D lane's assets are in** (§3): 01 the ground floor of the demonstration house **drawn to scale from the model's own specification** (walls, openings, door swings, stair, room names in the page's language, no label on a door arc), 02 the whole house without a roof as the viewer shows it, 03 the living room empty and furnished from the same camera on a compare handle, 04 the recording from the real viewer (both floors one turn, each floor half a turn, furniture off and on; 44 s ES / 47 s EN, no sound) with its poster. No "Pendiente" mark remains; every picture carries the 3D lane's mandatory mark. Zoom is not in the recording: the line says what the video shows (turn, floors, furniture), nothing more | `p05-3d-steps-1440.png`, `p05-3d-steps-1440-en.png`, `p05-3d-pair-moved-1440.png`, `p05-3d-steps-m390.png` |
| 06 | 3D viewer, whole house | (1) room names in English; (2) the shelf with bottles; (3) the terrace furniture intersecting | 3D's table. What the website took: the **Spanish** recording and its opening frame (`clip_desktop_es`: Baño, Pasillo, Trastero, Rellano, Dormitorio 1/2, Terraza), the English one on `/en`. The furniture findings (14–18) are the 3D lane's; the website shows the delivered run `run-20261024-132933-house` as delivered and replaces the files under the same names when 3D delivers a corrected run | `p05-3d-steps-1440.png` (step 02) |
| 07 | `/es`, packages ladder | (1) Growth and Enterprise mostly "En preparación", Enterprise two lines both unavailable (a product and package decision, API's PAKETE sheet); (2) the foot line "Sin precios…" cut; (3) "Sin tarjeta" here, "Sin método de pago" on the packages page | (1) not the website's: the lines show the states Copy's production column gives; the owner's PAKETE decision changes them. The Reviewer's closing condition for 07 ("Enterprise carries an available line, or says plainly that it is an offer on request") is met in words: the Enterprise card says "Hoy es una oferta por encargo: los modelos 3D se hacen ya a partir de tus planos; Instagram depende de la aprobación de la plataforma." Growth's morning line is now "Tareas del equipo y el asistente de la mañana · En preparación · todavía no contratable" (Copy's X-4, after its own correction of R-8: the staff surface reaches production with Release U). (2) **crop**. (3) **one wording**, Copy's X-11: "14 días gratis · Sin método de pago" on the ladder, the hero, the trust band and the packages page ("Sin método de pago" is the broader and true statement; the FAQ keeps "sin método de pago y sin tarjeta") | `p07-packages-home-1366.png`, `p10-packages-page-1920.png` |
| 08 | `/es/platform` | (1) "El asistente de la mañana · En preparación · todavía no contratable" contradicts the ladder's "La lista de la mañana · Disponible: ver, tomar y completar"; (2) "Calendario" cut; its state must fit the KALENDER decision | (1) Copy's X-5: two functions with two names and **one state each**, both "En preparación · todavía no contratable": "El asistente de la mañana — Cada mañana te explica qué va primero, por qué, y el siguiente paso." and "Tareas — Una tarea con dueño por cada visita o llamada pendiente." The ladder (X-4) and story D's state (X-3) say the same; the contradiction is gone in the direction of Copy's evidence (Gate K6c, Daily 1023: nobody can take or close a task in production before Release U), not by raising anything. (2) **crop**; "Calendario" stays "En preparación · todavía no contratable" until the owner's KALENDER line; nothing is claimed | `p08-platform-1920.png` |
| 09 | `/es/platform/ai-sales-agent` | (1) the hero text very large, "Qué hace" only three points; (2) only Gmail named, Outlook after O4/prod; (3) the benefit missing: why, for whom, what it saves | (1) the module headline one step smaller (display-l, 22 ch) on every module page; the AI Sales Agent page in **Copy's X-14 words**: h1 "Tus consultas reciben respuesta aunque estés en una visita.", the lead with the benefit ("Mientras tu equipo está con un cliente o fuera de la oficina… Tu equipo empieza por lo que importa, no por la bandeja de entrada."), four points (WhatsApp in Spanish; e-mail in a mailbox we operate; every conversation on the record; the e-mail alert when an enquiry matters). On CRM, Lead Intelligence and Tareas diarias two benefit lines each under the lead (WORKING, for Copy). (2) "Gmail" alone is gone with X-14: "email, en un buzón que operamos para ti"; Outlook not named before O4 and production. (3) see (1); the way to the free trial is the primary button on every module page and the closing band | `p09-ai-sales-agent-1920.png`, `pages/ai-sales-agent-d1440-es-full.png` |
| 10 | `/es/packages` | (1) the sticker over the Essential card's edge; (2) the Enterprise card mostly empty; (3) "Precio para tu agencia" without a price | (1) the trial mark stands **inside** the card next to its name, "14 días gratis · Sin método de pago" (the Reviewer saw a full-width banner on `9f6c65e`; on this build it is the mark in the card, so nothing lies over an edge). (2) each card is as tall as its content (no stretched empty card) and the Enterprise card says it is an offer on request (07); the number of its lines is the PAKETE decision. (3) the owner's PREISE decision; the block says where the price is stated | `p10-packages-page-1920.png` |
| 11 | `/es/platform/daily-assistant` | (1) "Desaparece de las listas de los demás" (Q-4); (2) "En español o en inglés, elegido en la aplicación" must fit the SPRACH-MATRIX; (3) the card says "Leads", the page "Tareas" | (1) see 03 (X-9). (2) Copy's X-8: the app-language line **is out** until API's SPRACH-MATRIX and the owner's SPRACHEN line; the page now carries its state "En preparación · todavía no contratable" under the lead. (3) the page shows **the task list** now, titled "Las tareas de tu equipo · Esta semana" (X-8): Laura's task taken by Elena, the others open, each with its next step; the foot says what the others see, in X-9's words | `p11-daily-assistant-1920.png`, `p11-daily-assistant-what-1920.png` |
| 12 | `/es`, the hero's limit line | (1) "envía" with its accent?; (2) small and grey; (3) content only after the owner's SPRACHEN line | (1) the source reads `envía` (home-story.ts `stateToday`); the Reviewer closed this on `9f6c65e` (0 occurrences without the accent); the owner's cut lost it in the rendering at 12 px. (2) 14 px, ink-800, with a ring mark. (3) the language content is **unchanged**; the line gained Copy's Q-1 fallback at its end: "Respuestas con datos del inmueble: en preparación." (no answer from API on listing facts in a production reply; the hero's lead and story B's "did" lost "con los datos de tu cartera" for the same reason) | `p12-hero-state-1920.png` |
| 13 | `/es`, C | (1) the name chip over the rights line; (2) the prices of the two cards cut at the top; (3) the state line small | (1) the stage's foot has 64 px (56 on the phone) under its last line; the chip (36 px, 16 px up) stands clear of the rights line, measured in the check. (2) **crop** (the owner's window top). (3) every state line 14 px | `p13-match-1100.png`, `p13-match-1440.png` |
| 14–18 | 3D viewer rooms | the 3D lane's table (bottles, chairs, sink, clock, terrace) | nothing of these is on the website: the website shows no room picture of the viewer but the two living-room renders and the recording; a corrected run replaces the files | — |

**The owner's own points, in the order given:** hero readable earlier (01); the customer record instead of three general checks
(the hero's third column is Laura's record now: name, channel and time, what she looks for, her budget, her language, and the
e-mail alert with its reason as the record's foot); a clean transition (01); the actual logo (01); no overlapping labels (05, 13); a
fitting product picture on every subpage (09: the conversation, 11: the task list, CRM: the records, Lead Intelligence: one record);
an understandable benefit and one way to the free trial (09, every module page, the ladder, the closing band); the take
contradiction and "hülle" in the Spanish mail previews (03/11; the word is gone from both preview introductions, §4).

## 2. The other points of the order

| Point | State |
|---|---|
| 3 availability and language claims | nothing was raised. Three lines went **down** on Copy's evidence: the task list and the morning assistant to "En preparación" (Copy's own correction of R-8, X-3/X-4/X-5/X-6/X-7: the staff surface reaches production with Release U), the hand-over row to "En preparación" (Q-2 fallback: no answer from API/Lead), the listing-data claim out of the hero and story B with "Respuestas con datos del inmueble: en preparación" on the limit line (Q-1 fallback). Language claims: the hero's limit line and the FAQ unchanged; the staff-app sentence removed (X-8) until API's SPRACH-MATRIX and the owner's SPRACHEN line. Q-3: the A-6 wording already stood |
| 4 E-FU2 `/es/prueba-objeto` | unchanged skeleton ([PRUEBA], reference, price, availability, updated, JSON-LD, not linked, noindex, stub build only). **PM's minimum fields have not reached the website lane** (no file in the handoff folder as of 25.10.); the owner's text, picture and address release are open. Published nowhere |
| 5 weekly report layout | the owner's verdict **"Layout OK"** of 25.10. is relayed to Hosting in `WEBSITE_TO_HOSTING_1025_WEEKLY_LAYOUT_OK.md` (→ H16 test mail). The correction that came with it ("hülle") is applied |
| the final named build | `596679b`, both deployments, the FAQ and every subpage on it (§6). It is the one build for the joint closing check of Copy and the Reviewer |

## 2a. Copy's X-1…X-16 and Q-1…Q-4 (COPY_SYNC_1024), what stands on `596679b`

| # | Applied as | Note |
|---|---|---|
| X-1, X-2 | the preview introductions in Copy's words ("recibirá … cuando el envío semanal esté activo", "Todavía no se envía de forma regular") | the owner's "hülle" finding; the word is gone |
| X-3 | story D's state: the alert available, the task list and the assistant in preparation | Copy's correction of its own R-8 |
| X-4 | Growth row "Tareas del equipo y el asistente de la mañana · En preparación · todavía no contratable" | the ladder's `partial` state is gone with it |
| X-5 | two platform rows, "El asistente de la mañana" and "Tareas", both in preparation | the `stateLine` field added on `deae52a` for the merged row is no longer used; left in the type |
| X-6, X-7 | the two FAQ answers | the language words "En español o en inglés" are out of Q-41 with X-7 |
| X-8 | the daily page's state line; the app-language point removed; the card "Las tareas de tu equipo · Esta semana" | |
| X-9, X-10 | the one task sentence on the daily page, its scenario and under the morning list | **Copy's proposal until Daily confirms**; the read-model note stands in §1 picture 03 |
| X-11 | "Sin método de pago" everywhere (hero, trust band, ladder, packages page, dictionaries) | the FAQ sentence "sin método de pago y sin tarjeta" stays |
| X-12 | EN story D line "…without office hours yet" | |
| X-13 | the social caption over the timeline | with the "Ejemplo · prototipo" mark of `deae52a` |
| X-14 | the AI Sales Agent page's h1, lead and four points | my three benefit lines of `deae52a` on that page withdrawn in favour of Copy's text; the two-line benefit blocks on CRM, Lead Intelligence and Tareas diarias stay as WORKING text |
| X-15 | met by the Spanish recording and its opening frame | 3D's labels on `/es` are Spanish |
| X-16 | met: the "Pendiente" marks went only with the material | |
| Q-1 fallback | hero lead and story B without "con los datos de tu cartera"; the limit line with "Respuestas con datos del inmueble: en preparación." | the hero's example reply still answers with the flat's facts; it is the owner's R23 dialogue, labelled as an example |
| Q-2 fallback | "Paso a una persona" → En preparación · todavía no contratable | |
| Q-3 | A-6 wording already as Copy's fallback | |
| Q-4 | X-9/X-10 | Daily |

## 3. The 3D lane's assets (point 2)

Source: `C:\src\nuova-3d\deliverables\website-assets\handoff_2026-10-23\` (README of 24.10., run `run-20261024-132933-house`,
materials 85/85, the owner's phone test of 23.10. "insgesamt sehr gut"). `3D_SYNC_1024_RETURN_v1.md` was not yet in `C:\src\nuova-3d\docs\`
on 25.10. morning; the assets and the README were, and the R24 order names them. Built in:

| Website | File (public/media/3d/) | From | Made how |
|---|---|---|---|
| step 01 plan | drawn in code (`scene-art.tsx` DemoPlan) | `deliverables/demo-two-storey/build/demo_spec.json` (walls, openings, doors, zones, stair in mm, level 0) | to scale, room names ES/EN from the spec's own names |
| step 02 model | `house-both-floors-{es,en}-1600.webp` | `turn/clip_desktop_{es,en}_poster.jpg` (the opening frame: both floors, no roof) | webp 1600 px |
| step 03 pair | `living-empty-1200.webp`, `living-furnished-1200.webp` | `pair/living_empty.jpg`, `pair/living_furnished.jpg` (3000 × 2000, same camera) | webp 1200 px, on `CompareSlider` (range input, keyboard-operable) |
| step 04 turn | `house-turn-{es,en}.mp4` + `house-turn-poster-{es,en}.webp` | `turn/clip_desktop_{es,en}.webm` (1920 × 1080, recorded from the real viewer) | H.264 1280 × 720, 30 fps, ≈1.5 Mbit/s, 7.4 MB each, `preload="metadata"` (no ffmpeg here: WebCodecs + mp4-muxer in headless Edge) |

Marks as the README demands: burned into the clips ("Casa de ejemplo ficticia · grabado del visor real"), under the pair
("…visualización: el mismo salón vacío y con mobiliario ilustrativo, desde la misma cámara"), the `alt` texts as given; the closing
line says it is an example house on a fictional plan of our own, not a real home, and no photorealism is promised. No second
ordering system: the button stays "Pide un modelo" → contact. The earlier living-room files (clay, render, 8-second ride,
its poster) are removed from the repository; nothing else referenced them.

## 4. The texts changed on this build (for Copy)

WORKING by the implementer, every line marked `R24` in the source:

| Where | Line |
|---|---|
| hero record (`home-story.ts` `heroWords.record`, `labels.done`) | "Su ficha, ya al día" · "Ficha de cliente" · "Laura Serrano · compradora" · "Actualizada · WhatsApp · martes 11:21" · Busca / Presupuesto / Escribe en · "Aviso por email a tu equipo" / "Consulta importante: nombró inmueble, zona y presupuesto" (W-5 kept) |
| social (`storyWords.social.example`, `.photoSource`) | "Ejemplo · prototipo" · "Foto de muestra con licencia (Pexels 12715501), no es un inmueble real." |
| 3D (`home-sections.ts` `model3d`) | the four step lines, the four captions, the alt texts, "Vacío" / "Amueblado", `viewerLine` (+ "muebles fuera o dentro"), `film`, `demoNote` ("…sobre un plano ficticio propio…") |
| Enterprise card (`package-matrix.ts` scale `limits`) | "Hoy es una oferta por encargo: los modelos 3D se hacen ya a partir de tus planos; Instagram depende de la aprobación de la plataforma." (the Reviewer's picture-07 condition) |
| module pages (`capabilities.ts` `why`) | Lead Intelligence 2 lines, CRM 2, Tareas diarias 2 ("Para equipos donde alguien pidió una visita y nadie sabe quién devuelve la llamada: cada petición tiene dueño." · "El cliente, el inmueble y la hora que pidió están en la tarea; nada se queda en la cabeza de nadie.") |
| tasks view (`product-views.tsx` foot) | "Datos sintéticos. La tarea de Laura ya no aparece en la lista de los demás; el asistente de la mañana dice que la ha tomado Elena, y solo ella puede cerrarla." |

Everything else of the texts is Copy's (§2a). Unchanged on purpose: the hero's limit line's language content, W-13.

## 5. Open, by owner

| What | Who |
|---|---|
| The joint closing check on this build, per picture (§1) and the whole site | Copy, Reviewer |
| The owner's look at the hero (01), the 3D steps (05), the record (02) on the real phone (card) | Owner |
| H16 test mail after "Layout OK"; the real mail client | Hosting, Owner |
| PAKETE / PREISE / KALENDER / SPRACHEN sheets (pictures 07, 08, 10, 11, 12) | API → Owner |
| Q-4 in writing; Q-1…Q-3 | Daily; API, Lead |
| E-FU2: PM's fields, the owner's text, picture and address, removal after the test | PM, Owner |
| 3D: the corrected run after pictures 06, 14–18; T6; the hosted viewer link | 3D, Hosting |
| The external website review (not received) | Owner → Website, Copy, Reviewer |
| W-13 | Owner |
| Production domain: only after Copy and Reviewer without an open finding and the owner's phone acceptance; no production change by the website lane before that | Owner, Hosting |

## 6. Technical checks on the presentation build

- `scripts/design/master-check.mjs` **32 of 32** (R23's 31 with `model3d-packages`, `nojs` and `r23-findings` rewritten for the delivered
  assets and the record, plus `r24-findings`: the logo as a loaded image, ivory on the hero and ink after the scroll; the record with its
  five lines and the alert; the panel's head on the first screen at 1366 × 768; the straight ivory edge (no mask, no foreground); the
  state lines 14 px; no chip over the rights line in C; the social example mark and the photo source; the trial mark inside the card;
  the daily page's task view with its state, the benefit lines, the one task sentence (X-9) and no app-language line; the platform rows
  for the morning assistant and the tasks in preparation (X-5); no German word in the previews).
- Contrast: **0** below 4.5 : 1.
- Routes **55 of 55**. Links **1064 of 1064**. `next lint` clean, `tsc` clean.
- Staging build: `/api/build` `mode: staging`; the previews and the test listing answer 404 there, as intended.

## 7. What to look at

`docs/website_redesign/evidence_2026-10-26/`: `r24/` (one picture per owner picture, on the owner's cut where the cut mattered),
`pages/` (home, platform, packages, the four module pages, FAQ: ES/EN desktop, home on the phone), `story/`, `sections/`, `mail/`
(the two previews, desktop and phone), `app/`, `checks/` (the suites' JSON), `staging/`.

## 8. Said plainly

The pictures 06 and 14–18 are the 3D lane's to fix; the website shows the run as delivered and says it is a fictional example.
Nothing on either deployment proves a backend path. No availability was raised. The external review is not in the website lane's
hands. Picture 01's first finding (the header over the buttons at one scroll position) is the behaviour of a fixed header; the
change made is that the hero is shorter, so the product is read earlier. The real phone and the real mail client are the owner's and
Hosting's proofs, not mine.
