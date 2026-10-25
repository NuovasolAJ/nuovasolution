# REVIEWER R24 — pre-check (RV4 preparation) and the E28 reconciliation

**Role:** independent reviewer. No application code written or changed.
**Window:** 2026-10-24 12:40Z to 2026-10-25 08:30Z (UTC) · **Order:** `AUDIT_ORDERS_R24_PROMPTS_R24.md` block 11
(replaces the earlier R24 text) · **Rules:** `AUDIT_ORDERS_R24_AUDIT_TO_LANES_2026-10-24_R24.md` (R24-a…m).
**Owner attachments used:** the 18 pictures in `backend_handoff/handoff_in_2026-10-13/BILDER_R24/` and the per-picture
findings in `AUDIT_ORDERS_R24_BILDBEFUNDE_R24_v1.md`. No PDF was needed.

| Item | Value |
|---|---|
| Build checked | `9f6c65e` — the pre-check build named in the order, **not** the final R24 build (none is delivered yet) |
| Presentation deployment | `dpl_C7hvT71vZZCi8YUUgSarodHQNhro` · `https://nuovasolution-design-preview-1pfs923d9-nuovasolajs-projects.vercel.app` · `/api/build` → `mode: stub` |
| Staging deployment | `dpl_H2UB1acA8G5UFVkLbdKbVfhqG4p5` · `https://nuovasolution-staging-preview-dq8btlwhe-nuovasolajs-projects.vercel.app` · `/api/build` → `mode: staging` |
| Engine | Chromium (Edge headless), device emulation at 390 / 768 / 1024 / 1280 / 1440 CSS px. **Real phone and real mail client are not my check → owner view open** |

> This is the pre-check the order allows until the final build exists. **No acceptance is granted here**; RV4 runs on
> the final named R24 build together with Copy, and only what is proven on that version counts as closed (R24 rule).

---

## 1. One finding per owner picture — website pictures 01–05, 07–13

| # | Owner's finding | My measurement on `9f6c65e` | Verdict |
|---|---|---|---|
| 01 | the fixed header covers the hero buttons; only edges visible above "14 días gratis" | header is `position: fixed`, bottom 60–72 px; the hero buttons sit at top 395–611 px at **390 / 768 / 1280 / 1440** and each is hit-testable as itself ("Ver cómo funciona", "Probar gratis") | **not reproduced** at four widths — needs the owner's window height and browser zoom to pin down; the demo card fading into fog is a visual judgement → **owner view** |
| 02 | the Daily card before the hand-over is in order | reference state present: "Abierta · nadie la ha tomado" | **reference** (used only against 03 and 11) |
| 03 | the right text column is cut, only letter remnants | **reproduced at 1024 px only**: three text boxes squeezed to **47–54 px wide and 96–165 px tall** — "Formulario web · martes 11", "Peter y Anna Keller · Prop…", "Laura Serrano · Compradora". Not at 768 / 1280 / 1440 | **CONFIRMED (1024 px)** · closing condition: a minimum column width so these three never fall below readable width |
| 04 | the "Estado: Prototipo…" line sticks clipped at the top; large empty area below | with the block scrolled to the top the line is fully visible (top 1017, header bottom 72, nothing covering it) and reads "Estado: Disponible hoy: WhatsApp y email, en español. Prototipo: el fo…"; no gap above 160 px between the block's children | **not reproduced** |
| 05 | the 3D heading is cut by the header; cards 03 and 04 show "Pendiente del equipo 3D" | heading top 96 px against header bottom 72 px → **not cut**. "Pendiente del equipo 3D" appears **twice** → confirmed. New since RV3: the block now carries `living-clay-1200.webp`, `living-render-1600.webp` and a camera-ride video | **split**: heading not reproduced · the two pending cards **CONFIRMED** |
| 07 | Growth and Enterprise are mostly "En preparación · todavía no contratable"; Enterprise has only two points | counted per card: **Essential** 13 lines, 6 "Disponible", 1 "En preparación" · **Growth** 13 lines, 1 available, 6 in preparation · **Enterprise** 9 lines, **0 "Disponible"** | **CONFIRMED** · closing condition: Enterprise carries at least one available line, or the card says plainly that it is an offer on request |
| 08 | "El asistente de la mañana · En preparación" contradicts 07/10 "La lista de la mañana · Disponible" | `/es/platform`: "El asistente de la mañana — La lista de la mañana: qué va primero, por qué, y el siguiente paso. **En preparación · todavía no contratable**" · `/es/packages`: "La lista de la mañana: qué va primero y por qué · **Disponible: ver, tomar y completar tareas** · En preparación: el correo de la mañana" | **CONFIRMED** — the same capability carries two different states on two pages |
| 09 | the hero text is very large; "Qué hace" has only three points; only Gmail named | h1 is **68 px over 5 lines**; Outlook is absent and only Gmail is named (correct against the truth table); the "Qué hace" list is not machine-readable as list items (0 found), so the count has to be settled in the content | **CONFIRMED in part** (type size, thin section) · the Gmail-only wording is **correct** |
| 10 | the sticker "14 días gratis · Sin método de pago" overlaps the edge of the Essential card; Enterprise mostly empty | the trial line is a **full-width banner above the cards** (390 px: 16→374; 1440 px: 113→736), not a sticker on a card, and nothing covers it. The thin Enterprise card is finding 07 | **not reproduced as an overlap** · the banner-versus-per-card question is design → **owner view** |
| 11 | "Desaparece de las listas de los demás" contradicts 03; "En español o en inglés, elegido en la aplicación" | `/es/platform/daily-assistant` says "Desaparece de las listas de los demás, así que nadie la toma dos veces" and "Para los demás, la tarea desaparece de su lista", while the home card after the hand-over shows "**Tomada por Elena**" and stays visible. The app-language line is present verbatim | **CONFIRMED** (Q-4) · closing condition: one wording for both places, and the app-language line only where it is true |
| 12 | check whether "envía" carries its accent | "En otro idioma no se **envía** nada automáticamente." with accent on `/es`, `/es/faq`, `/es/platform`, `/es/packages`; 0 occurrences without it | **CLOSED** |
| 13 | the name label "Laura Serrano" overlaps the notice "Se muestra solo lo que tu fuente marca como publicable…" | five "Laura Serrano" labels on the page, **none** overlapping the notice ("El inmueble está marcado como publicable y actual"); the nearest pair misses by 3,916 px vertically | **not reproduced** |

Pictures 06 and 14–18 are 3D findings and go to the 3D lane first (R24 routing); I did not re-judge them.

## 2. My open findings from RV3, re-checked on this build

| Finding | State on `9f6c65e` |
|---|---|
| **3D pair and turn view** (open in RV3) | **partly closed.** The block now has media and the **camera ride really plays**: `living-camera-ride.mp4`, 7.9 s, muted, `controls`, own poster `living-ride-poster.webp`, aria-label "Vídeo: recorrido de cámara por el salón · 8 segundos · sin sonido", `readyState 4`, time advanced to 6.49 s. **Still missing:** the **empty/furnished pair from the same camera** — what is shown is clay plus render (plan → model), and two cards still say "Pendiente del equipo 3D" |
| **F-R16-4 legal** | unchanged: `/en|es/legal/privacy`, `/terms`, `/data-deletion` 200 with `Placeholder` (EN) / `Provisional` (ES); `/legal/imprint` 308 → `/legal/notice` in both languages. A technical check is not a legal clearance |
| **F-R16-5 language claim** | **closed on this build, now including the FAQ.** FAQ Q-06: "¿En qué idioma responde a mis clientes? — En español. En otro idioma no se envía nada automáticamente." Correction to my own RV3 report: I closed this on the home line alone and had not read `/faq`; Copy was right to flag that. On this build both places are narrow |
| **R23-1 / R23-2** (test identity, allow-list) | see §3 |

Unchanged checks from RV3 were not repeated (hero geometry, late loading, gates, roles, origins, console).

## 3. E28 — my findings against API's 10/10

API's run (`API_E28_STAGING_BROWSER_1024_v1.md`, run `mvmdqx55`, 10/10) and my RV3 result do **not** contradict each
other; they cover different halves, and the difference is the identity source:

| Point | API | Me | Joint reading |
|---|---|---|---|
| Build | `a76e6e1` / `dpl_3n3TwzpayrxptkGYNuWCih8qBJjW`, `mode: staging` | same build in RV3; today additionally `9f6c65e` / `dpl_H2UB1acA8G5UFVkLbdKbVfhqG4p5` | both named, both self-reported |
| Identity | two **confirmed** users on `example.invalid`, created through the **Auth admin API**, "so no mail went out" | the reserved fixture `stg_website_t6_identity.txt` answers **400 `invalid_grant`** | API's path **bypasses** confirmation; mine needed the fixture, which no longer authenticates → **R23-1 stands** |
| Public sign-up | not exercised | `/api/bff/signup` on today's staging build answers **`ok · next: confirm · session: false`**, and a login before confirmation is refused with **`email_not_confirmed`** | the sign-up half is proven **by me**, on both staging builds |
| Confirmation link | not exercised (no mail) | not exercisable: no readable mailbox for the test domain, and the documented allow-list / `site_url` still point at the older `…git-w-44e113…` origin | **neither of us has proven the real confirmation link** → **R23-2 stands** |
| Agency + CRM step | registration through the site's form, "Sin CRM externo" saved and re-read as of record, HubSpot records interest only, DB verified, 0 authorisations, 0 queued | not reachable without a working identity | **accepted as API's technical staging proof**, not as my own walk |

**To API, in one line:** E28's browser path with and without an external CRM is proven technically on staging; the
**complete public sign-up including a real confirmation link is still unproven by either lane**. What closes it:
(a) a reserved identity "confirmed, no agency" that actually authenticates, or an API-side confirmation of a reviewer
sign-up, and (b) the allow-list and `site_url` pointing at the deployment under test. My probe is committed and needs
no change (`review_2026-10-23/rvi-t6.mjs`).

## 4. Status

```
RV4_FINAL_ACCEPTANCE = NOT_RUN — waiting for the final named build from Website R24 (then jointly with Copy)
R24_PICTURES         = 12 website pictures judged: 5 confirmed (03, 05 part, 07, 08, 09 part, 11), 1 closed (12),
                       4 not reproduced (01, 04, 10, 13), 1 reference (02); 2 of them are owner view
RV3_OPEN             = 3D pair still open, ride closed · legal unchanged · language claim closed incl. FAQ
E28_RECONCILED       = yes, to API: signup half mine, CRM half API's, confirmation link open on both sides
```

## 5. Evidence `review_2026-10-24/`

`rvj-images.mjs` + `rvj-images.json` (first pass per picture) · `rvj-verify.mjs` + `rvj-verify.json` (the measurement
that each verdict above rests on) · `rvj-clip.mjs` + `rvj-clip.json` (the camera ride) · `rvj-routes.json` (routes,
gates, legal) · screenshots of the hero at four widths, the social block, the 3D block, the packages, the matching card
and the playing ride. No credential, token or signed URL is recorded.
