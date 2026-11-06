# REVIEWER RV6 — the check list, written before the build exists

**Role:** independent reviewer. No application code written or changed. **Status:** prepared, **not yet run**.
**Written for:** Redesign (so it can build against it), Copy, 3D, API and Audit. **Date:** 2026-11-05,
**extended 2026-11-06** for Copy's addition `702a11d` (§D-2 connection wording), and **again 2026-11-06 (evening)**
for the owner's change order: hero = A (C01), **§D-3 replaced** by the two views of the status words, and five new
checks A-16 … A-20.

**RV6 runs on exactly one build:** the next one Redesign names, with **commit, fixed URL and both deployment ids**.
`faf2dbb` / `dpl_FnoR4QFTNPg1E9ws4g28gj2FdzkC` was **not accepted** by the owner (D01–D12) and is not an end state.
**`2dfa67d` is not the build for RV6 either** — the owner ordered a further change round on 06.11., so RV6 waits for
the build named after it. Earlier verdicts stay on their own builds: `WEBSITE_TECH_ACCEPTED = PASS` remains bound to
`3dbafd6` alone. The production deployment is **not** part of this round.

**What binds this list**

| Source | Commit / path |
|---|---|
| Owner's review of 02.11., §3 (direction), §8 (motion and quality), §9 (how the round ends) | `docs/website_redesign/owner_review_1102/02_NuovaSolution_Review.pdf` |
| Owner's findings C01–C09 on `f6315c1` | `docs/website_redesign/owner_review_1103/README.md` |
| Owner's findings D01–D12 on `faf2dbb` | `docs/website_redesign/owner_review_1105/README.md` |
| Claims ceiling (API) | `API_CLAIMS_LINES_1102_v1.md`, `25a6382` — **in the API repo**, `governance/` |
| The only text source (Copy) | `docs/website_redesign/WEBSITE_COPY_HANDOVER_1105_v3.md`, **`04f4981`**, **with the addition `702a11d`** (§1b prod conditions, §13 connection wording, the new first trust line, C-15 re-worded) |
| What "Incluido" means in production (API) | `ERSTE_FREMDE_AGENTUR_1105_v1.md`, `3d97372` — **in the API repo**, `governance/` |
| Owner's change order of 06.11. (evening) | hero = A, status words hidden in two views, five new checks — carried into C01, D02, §D-3 and A-16 … A-20 of this list |
| What may be visible publicly | the build's own `lib/claims.ts` — the single list; read read-only from the named commit |

**Three separate grades, as ordered.** **Design** · **operation** · **technique**. A technical PASS is not a design
acceptance, and **there is no overall PASS without the owner's design verdict**. Real iPhone/Safari, the real mail
client and matters of taste stay the owner's view.

---

## A. Technique and operation, measured on the named build

| ID | Check | Pass condition |
|---|---|---|
| A-1 | the build identifies itself | `/api/build` returns the named commit, deployment, env and mode |
| A-2 | first screen at **1366 × 768** | benefit, **one** main action, and the enquiry **plus** a visible result are all inside the first 768 px; the reading load in that screen is recorded |
| A-3 | the phone at **390 px** | no horizontal overflow, one h1, no clipped text, no covered action; order = headline, benefit, main action, demo |
| A-4 | **768 px** and **1024 px** | no overflow, no collapsed column, no covered action |
| A-5 | **reduced motion** | every finished state stands at once, the content is complete and the actions work; no animation still running |
| A-6 | **without JavaScript** | benefit, evidence and the next action are reachable; the demo's end state is in the delivered HTML |
| A-7 | channel tabs by **mouse** | a trusted click switches the panel and `aria-selected` |
| A-8 | channel tabs by **touch** | a real touch event does the same at 390 px |
| A-9 | channel tabs by **keyboard** | one Tab reaches the tablist, the arrow key moves the selection, and the focused tab carries a **visible** focus ring (not colour alone) |
| A-10 | no tab switches by itself | no automatic change while someone reads or after a click of their own |
| A-11 | **contrast** | every visible text ≥ 4.5:1 (≥ 3:1 for large type), measured **while the element is on screen**; text standing on a film or a photograph is listed separately for the eye |
| A-12 | **smallest type** | nothing unreadably small; every size under 14 px is reported with its place |
| A-13 | the demo's run | one pass of about 6–9 s, typing dots once and short, the end state stays, replay works, reading never depends on an animation |
| A-14 | **all linked subpages** | every internal link answers 200 (or a named, intended redirect), one h1, no overflow at 1366 and 390, in **ES and EN** |
| A-15 | page weight and first paint | recorded for the before/after comparison the report asks for (same engine, same window) |
| A-16 | **scroll at a normal speed** | the page is driven at a human rate (≈ 800 px/s in 50 ms wheel steps, not instant jumps and not frame-by-frame); **every** scene of every sticky stage reaches its finished state and stays readable for ≥ 400 ms. A scene skipped, overrun or still mid-reveal at that speed is a finding. Run at 1366 × 768 and at 390 px, normal and reduced motion |
| A-17 | **the tab icon** | the `<link rel="icon">` (and the apple touch icon, if present) resolves **200** with a real image of a declared size; the icon is the NuovaSolution mark, not a framework default; the tab title is the page's own, in the page's language, on **every** route ES and EN |
| A-18 | **Spanish at 1440 px in the path** | the steps of the path ("Cómo se pide" / plan → model → delivery) at **1440 px** in ES: per line `getClientRects()` — no clipped line, no `overflow: hidden` cutting text, no line crossing a neighbouring box, no step label breaking into an orphan. ES runs longer than EN, so EN alone is not evidence; measured at 1440 **and** at 1280 |
| A-19 | **the example figures add up** | the arithmetic is checked, not only the single values: 14 + 11 = **25**; 23 + 2 = **25**; agreed **4** ≤ asked **6**; the chart's last week = **25 · 23**; 6 of 25 = **24 %**; and the same values stand on the home page and on `/es/example-report`. Any sum that does not close is a finding, even if each figure matches §D |
| A-20 | **the switch "Sin / Con NuovaSolution"** | both states are reachable by mouse, touch and keyboard with a visible focus ring; the switch carries **no money and no revenue promise** — no €, no %, no "más ingresos", "más ventas", "más comisiones", "ROI", "recuperas", "ahorras X horas" as a claim; and the block is marked as an example in sight of the figures ("Ejemplo ilustrativo" / "Ejemplo con datos ficticios"), not in a footnote further down the page |

**Routes in the sweep** (as discovered on 05.11., re-discovered on the named build): `/es`, `/en` and for each
language `platform`, `platform/ai-sales-agent`, `platform/lead-intelligence`, `platform/crm`,
`platform/daily-assistant`, `packages`, `trial`, `contact`, `faq`, `login`, `example-report`, plus whatever the new
build links. `/es/social` and `/es/social/inbox` answered **307** on `faf2dbb`; if they stay linked, the redirect must
be the intended one.

---

## B. One checkpoint per owner finding

**M** = measured by the reviewer · **O** = the owner decides · **M+O** = the measurable half is checked here, the
judgement stays with the owner.

**Read every row below against §D-3.** Where a row asked for a status word next to a function (D05, D06, D07, D12,
C03, C08, C09), the new rule overrides it: in the **preview** view the word must be gone (P-1), and in the **public**
view the function itself must be gone unless `lib/claims.ts` carries it as included (Q-2). The substance of the
finding does not change — what changes is whether the honest answer is a word or an absence.

### D01–D12 (05.11., on `faf2dbb`)

| ID | Owner's finding | What RV6 measures | Who decides |
|---|---|---|---|
| D01 | hero text and chips run over the transparent header; ticks at 11:20/11:21; the reply does not sound human | at scroll 0 and at scroll ~420: no page text lies inside the header's band, and no header item is covered; the demo carries **no** tick and no "enviado"/"entregado" (Copy v3 §3); the reply is Copy v3 §3 word for word | M for the overlap and the ticks · O for the tone |
| D02 | direction right, the picture too soft, the text not convincing | the hero **picture's** real pixel width per source, its rendered size against the device pixel ratio (a 960 px file stretched over 1440 px is the softness, measured), the file's checksum against 3D's handoff, and the words against Copy v3 §2 | M for the media facts · O for "cool enough" |
| D03 | four identical boxes with a grey line; "Nuova" instead of NuovaSolution; the last step looks like work for the team | the four steps' geometry and whether they differ; **0** visible "Nuova" not followed by "Solution" (Copy v3 §10.5, 161 places); the last step names a person as Copy v3 §4 does | M |
| D04 | listing pictures missing (grey placeholders); the right surface not clickable | in the matching panel: every listing has a loaded picture with `naturalWidth > 0` and an alt; count of empty surfaces ≥ 90 × 70 px; the far side of the stage is either interactive (hit-tested) or carries no click affordance | M |
| D05 | the scene change on scroll is good but not recognisable; "Leads importantes" carries a blanket "En preparación" although the priority is on the record | the state word per scene against Copy v3 §1 (`priority` = **Incluido**, so the priority line must not read "Próximamente"); the scene change has a visible marker (progress, number or title) | M for the words · O for recognisable enough |
| D06 | "Tomar" not clickable; Daily's voice question not shown | "Tomar" is a real control (button/link or `role` + `tabindex`), reachable by hit-test and by keyboard, **or** it is honestly marked as a demo; `daily_voice` ("¿Qué tengo hoy?") is present with its state **Próximamente** (Copy v3 §1) | M |
| D07 | the report's "Por canal" names only WhatsApp/Email | the block names exactly WhatsApp and Email as figures; any further channel appears **without a figure** and marked **Próximamente** (Copy v3 §6) | M |
| D08 | `/es/example-report` unprofessional: small bars, much white space, no real charts | real chart elements exist (axes, scale, legend, labels) and are not decorative strips; every figure matches §D below; the page's empty space is recorded as a measurement, the verdict stays the owner's | M+O |
| D09 | the rotation should show the ground floor only | which media the step "Modelo" loads, its duration, loop and whether the segment shown is the ground floor as delivered by 3D | M for the media · O for the choice |
| D10 | the delivery clip stutters; the path "plan → finished" is not visible for the agent | the clip's codec, resolution, fixed frame rate, poster, duration, dropped versus total frames while it plays; the agent's path line from Copy v3 §8 is present | M for the figures · O for the feel on their machine |
| D11 | the dark green does not fit the brand; English labels in the Spanish footer | **0** English module labels on Spanish pages — "Asistente de consultas", "Ficha y prioridad", "CRM", "Tareas diarias", footer link and nav "Acceso" (Copy v3 §10.4); the closing section's colour recorded as a token value | M for the labels · O for the colour |
| D12 | "Recomendado para empezar" holds back the upsell; the table is small; too many "En preparación" | **0** occurrences of "Recomendado", "Más popular", "El más completo"; the positioning lines are Copy v3 §9; no cell under 14 px; the status census against §E below | M |

### C01–C09 (03.11., on `f6315c1`) — re-checked for regression

| ID | Owner's finding | What RV6 measures | Who decides |
|---|---|---|---|
| C01 | **resolved by the owner's order of 06.11.: the hero is picture A; the film from 3D comes later** | the hero carries the 3D lane's render **A** (`hero_A`, handoff 2026-11-05, `a881c88`) as a still picture: the three WebP widths load with `naturalWidth > 0`, the 960 px poster is the first paint, the drift is slow (≈ 24 s) and **absent** under reduced motion, the lane's alt is set, and the visible mark "Casa de ejemplo ficticia, visualización" stands in sight of the picture. **No hero film and no pause control** — a `<video>` in the hero is now a finding, not a pass. The later film stays a future stage and is not checked on this build | M |
| C02 | the 3D turn still shows room names and the viewer's menu | **0** room names (Salón, Cocina, Dormitorio, Baño, Planta) and no viewer UI in the film | M |
| C03 | empty circles without ticks; "Probar gratis" | **0** empty circles in the plans; "Pruébalo gratis" stays **off** (Copy v3 §9). The condition "every cell carries a status word" is **withdrawn** by the order of 06.11. — see §G-6, conflict 3 | M |
| C04 | "Cómo se pide" is text instead of picture and arrows | the 3D path is shown in steps, not as a paragraph | M+O |
| C05 | the week's figures are a statistics box instead of a chart from the real reporting | the chart is a chart (see D08) and its figures are §6's | M+O |
| C06 | two messages from Laura, time only on our reply, "Anoto" sounds like a machine, the second-home question is illogical | **one** message from Laura, a time on **both** sides, **0** "Anoto", the reply exactly Copy v3 §3 (which keeps the year-round/second-home question in the agency's voice) | M |
| C07 | e-mail channel must look like a mailbox | the e-mail panel shows a mailbox (list, sender, subject), not a chat | M+O |
| C08 | the web form looked like a WhatsApp chat | the form panel is a real form, and it is marked **Próximamente** (Copy v3 §3) | M |
| C09 | the phone channel is weak, the call view missing | the phone panel shows a call, and it is marked **Próximamente** | M+O |
| C-all | logo missing, no animations, not modern, too much text | the logo is in the header; the word count of the Spanish home page; the motion is recorded in real-time captures, normal and reduced | M for logo and counts · **O for modern enough** |

---

## C. Claims ceiling — nothing may be said beyond the register and Copy v3

Checked on **every** route, ES and EN.

| Must **not** appear | Why |
|---|---|
| "Disponible" per function or plan | the register allows it only where the column "may say today" does |
| the prices 349 / 649 / 999 € | internal calculation only; "Te decimos el precio para tu agencia" instead |
| "Recomendado", "Más popular", "El más completo" | no popularity claim; Enterprise holds more than Growth |
| "14 días gratis", "Sin método de pago", "Probar gratis", "Pruébalo gratis", "Regístrate", "Crear cuenta" | registration is not released; `trialCta` is a prepared switch and stays off |
| a numeric score such as "98/100" | only with a real scale and calculation; otherwise a priority category with its reason |
| "todos los datos en la UE" | only **the database** is in Frankfurt |
| HubSpot / Pipedrive / Zoho / Salesforce / Outlook as available | **Próximamente** only |
| "tu propio número" for WhatsApp | production has our own number only |
| "multilingüe", "en su idioma" | production replies in **Spanish**; language detection is included, other languages are **Próximamente** |
| an alert as available ("avisa a tu equipo", "Aviso … Incluido") | held back in production (HA1) |
| "visita confirmada" for an asked viewing | "Una petición de visita no es una cita" |
| a delivery time or price for 3D | neither is given |
| "60 fps", "Lighthouse 100" without a measurement | no unmeasured performance claim |
| **any promise of a connection** — "conectamos los canales contigo", "Conecta tus canales", "Conecta tu Gmail", "Gmail verbinden" | the agency's own mailbox connection (D5) **is not built**; §13 of the addition `702a11d` |
| **money or revenue from the comparison** — a € figure, a percentage of revenue, "más ingresos", "más ventas", "más comisiones", "ROI", "recuperas … €", "ahorras X horas" | nothing of the kind is measured; the switch "Sin / Con NuovaSolution" shows an illustrative example, not an earning (A-20) |

**Must appear, in both views:** the first trust line in its new wording (`702a11d`) — "Pides acceso y te enseñamos el
sistema. La conexión del buzón y del WhatsApp de tu agencia llega próximamente." / "You request access and we show you
the system. Connecting your agency's mailbox and WhatsApp is coming soon."; "NuovaSolution" instead of "Nuova" in
every visible text except the demo's sender label; the demo mark "Demo con datos ficticios"; the hero mark "Casa de
ejemplo ficticia, visualización"; the automation mark "Asistente automático de la agencia" **once**; the invitation
line "Acceso por invitación mientras preparamos el registro público."

**The status words are now view-dependent** and are checked in §D-3, not here. Where a status word **is** shown, it is
one of Copy v3 §1's three — **Incluido** / **Próximamente** / **No incluido** — and never "En preparación",
"Prototipo" or "Implementado; todavía sin activar".

---

## D. The figures of the report and `/es/example-report`

One set of values, identical on the home page and on the report page (Copy v3 §6, §7). Each must carry its
definition; a figure without one is a finding.

| Figure | Expected | Note |
|---|---|---|
| Consultas recibidas | **25** | new WhatsApp and e-mail messages in the week |
| por canal | **WhatsApp 14 · Email 11** | the same 25, by arrival channel — **not** a count of answers |
| Respondidas | **23** | the other 2 arrived in another language, nothing sent automatically |
| Esperan a una persona | **2** | |
| Visitas pedidas | **6** | asked is not agreed — the home page must not say 4 here |
| acordadas por el equipo | **4** | |
| Entregadas al cliente | **No medido** | as text, not as a number |
| Tiempo de respuesta | **No medido** | as text |
| weekly chart | 19·17 · 24·22 · 21·20 · **25·23** | week 4 equals the figures above |
| insights | WhatsApp 14 de 25 · 11:00–12:00 · 6 · 24 % (6 de 25) | each with its definition. The line "informe ampliado: próximamente" collides with P-1 — see §G-6, conflict 4; RV6 records it rather than failing it |
| base line | "Base: … Respondida no es lo mismo que entregada: lo que llega al cliente aún no se mide." | present on the report page |
| example marks | "Informe de ejemplo · no son datos de ninguna agencia" and a fictional-data mark | present |
| the page's close | "Míralo con los datos de tu agencia" + the invitation line | **no** "14 días gratis · Sin método de pago" |

**Note for the run:** Redesign's commit `f3dcdbf` describes the funnel as 25 → 23 → **4 → 3**, while Copy v3 and the
later commit `22cf04e` give 25 → 23 → **6 → 4**. RV6 checks which of the two the named build shows; the figures above
are the binding ones.

---

## D-2. Connection wording — nothing promises a connection that does not work

Copy's addition `702a11d` §13. The agency's own mailbox connection (owner D5-DIREKT) **is not built**, so these rows
hold **on the preview as well as in production**. Each is checked as a string on every route, ES and EN.

| ID | Must no longer read | Must read |
|---|---|---|
| N-1 | trust line "…y conectamos los canales contigo." | "Pides acceso y te enseñamos el sistema. La conexión del buzón y del WhatsApp de tu agencia llega próximamente." |
| N-2 | the FAQ "¿Cuánto se tarda en configurarlo?" promising "nosotros conectamos los canales contigo y probamos cada uno con un mensaje real" | "Hoy te enseñamos el sistema con datos de ejemplo. La conexión … llega próximamente; cuando esté lista, probaremos cada canal con un mensaje real antes de darlo por conectado." |
| N-3 | the onboarding step "Conecta tus canales con nosotros" | "Tus canales · La conexión del buzón y del WhatsApp de tu agencia llega próximamente." |
| N-4 | the trial step "Conecta tus canales, según los permisos que tengas." | "Próximamente: conectar el buzón y el WhatsApp de tu agencia." |
| N-5 | — | "…en un buzón que operamos para ti." **may stay on the preview**; in production only with D5 route B built, otherwise "Respuesta por email: próximamente para el buzón de tu agencia." |
| N-6 | — | the Email tab's state line **may stay on the preview** (demo with fictional data); in production before D5 it reads "Demo: así funcionará con el buzón de tu agencia (próximamente)." |

The channel labels "Email con Gmail" / "Email through Gmail" name a channel, promise no connection, and stay.
**N-5 and N-6 are therefore the only two rows where the preview and production differ; RV6 on a preview build checks
N-1 to N-4 as findings and records N-5/N-6 as the production condition.**

---

## D-3. Coming-soon is hidden — the two views (new version, owner's order of 06.11.)

The status words no longer stand next to the functions. RV6 checks **two views of the same build** and grades them
apart.

### D-3a. The preview view — the target state, without status words

| ID | Check | Pass condition |
|---|---|---|
| P-1 | **no status word anywhere** | `Incluido`, `Próximamente`, `No incluido`, `Included`, `Coming soon`, `Not included` and the retired "En preparación", "Prototipo", "Implementado; todavía sin activar" appear **0** times in visible text — not in a card, not in the report, not in the FAQ, not in the plans table, not in a tooltip or an `aria-label`, not on a hover-only layer |
| P-2 | **the notice stands at the top** | one notice above the fold, visible at scroll 0 at 1366 × 768 **and** at 390 px, saying that this view shows the target state including functions that are not live yet. It is not a cookie-style strip that can be dismissed away, not placed under the hero, and it is present on every route of the preview, ES and EN |
| P-3 | **the notice carries no promise** | no date, no "en semanas", no "pronto estará", no connection promise (§D-2), no "ya disponible"; its wording is Copy's, quoted as delivered |
| P-4 | **the view is recognisable as the preview** | the view is reached in a defined way (a path, a parameter or an env mode) and the way is written down in the return, so the owner can open exactly the same thing. The preview view must **not** be what an anonymous visitor on the public URL gets (P-5 proves that) |
| P-5 | **the two views really differ** | the same route, fetched both ways, differs in the expected direction: the preview shows the fuller target state, the public view shows only the included set. If both deliver the same HTML, the gate is not implemented — regardless of what either page says |

### D-3b. The public view — only what `lib/claims.ts` carries as included

| ID | Check | Pass condition |
|---|---|---|
| Q-1 | **the list is read first** | `lib/claims.ts` is read read-only from the named commit and the **included** set is written out key by key in the return. It is the single reference; a key missing from it counts as not included |
| Q-2 | **nothing beyond the included set is visible** | every function named in visible text maps to an included key. Checked surface by surface: the hero and its chips, the feature cards, the channel tabs and their panels, the record and the priority block, **the report and `/es/example-report`**, **the FAQ answers**, **the plans table**, the navigation and the footer, the demo's labels, the sticky stages' scenes, and the `platform/*` subpages |
| Q-3 | **nothing hidden only to the eye** | a function removed from sight must be gone from the delivered HTML's text, not merely `opacity: 0`, `visibility: hidden`, `display: none`, off-screen, zero-height or covered. Measured on the delivered HTML **and** on the live DOM, including the no-JavaScript pass (A-6) |
| Q-4 | **the plans table under the new rule** | a row whose function is not included is **absent**, not shown as an empty or struck cell; the table's own sums and its "19 rows" claim move with that (see the conflict note in §G-6) |
| Q-5 | **the figures follow the same rule** | a report figure for a function that is not included is absent, not shown as "No medido" next to a coming-soon function; §D's figures stay the binding set for what **is** shown |
| Q-6 | **no leftovers in the seams** | `<title>`, meta description, OG image text, JSON-LD, `alt` texts, form placeholders, the sitemap and any `data-*` label carry no function outside the included set |

### D-3c. What may stand in `lib/claims.ts` as included — unchanged, and still a production check

The hiding rule changes **where** a status is shown, not **what** may be called included. The condition for a key to
be included in production stays Copy's addition `702a11d` §1b on API's `ERSTE_FREMDE_AGENTUR_1105_v1.md`
(`3d97372`): **"Incluido" means what an invited agency other than nuovasolution can use in production** — the
agency's mailbox connected (D5, route A or B, tested) for `replies`-e-mail, `origin`, `language_detect`, `labels` and
every other function at the mail intake; the agency's own number registered and routed (K1–K3) with Meta's approvals
for `replies`-WhatsApp; V3-DEPLOY plus ONBOARDING-PROD and green tenant isolation for `record` and `priority`; the
report entitlement (B1) for `report_login`; staff access for `team_list` and `daily_voice`.

Checking those conditions against reality is owed **before the production go-live** and is **not** part of RV6 on a
preview build. State of the record as given to me: production knows exactly **one** tenant until V3-DEPLOY; mail of an
external agency does not arrive in production at all yet (K5); the single-mailbox guard (D5) is live since
05.11. 13:40Z; Release U is in production since 05.11. 13:32Z. These are API's and Hosting's statements, not my
measurements. What RV6 **can** do on the preview build is Q-1: name what `lib/claims.ts` claims, so that a key
included there without its condition is visible as a question to API.

---

## E. The plans table

| Check | Pass condition |
|---|---|
| E-1 | the preview view carries all **19 rows** in the order channels, CRM, team, reporting, integrations, services (Copy v3 §9); the public view carries the included subset of them in the same order, with no gap in the sequence |
| E-2 | **under the new rule:** in the preview view no cell carries a status word (P-1); in the public view only the included rows stand (Q-4). In neither view is there an empty circle or a wrong tick, and no cell is left blank where a reader would expect a value |
| E-3 | the rows that **are** shown are Copy v3 §9's, in §9's order and wording; the count of shown rows and which of the 19 are absent is written out in the return, so Copy and the owner can see what the hiding rule removed |
| E-4 | no price, no badge, no popularity line; the three positioning lines are §9's |
| E-5 | nothing under 14 px; the same table on the home page and on `/packages`, ES and EN |
| E-6 | the action is "Solicita una propuesta"; `trialCta` is **off** |

---

## F. Method, so the measurement is honest

- **The page is woken first.** This build uses `content-visibility`, so sections below the fold are not laid out until
  they come near the window. Every probe scrolls the whole page once and returns before it measures anything;
  otherwise elements read as 0 × 0 and a present element looks missing.
- **Contrast is measured while the element is on screen,** in viewport steps, and the ground under the text is read
  from the real paint stack **including the element's own background** (`elementsFromPoint`). A transparent header
  over a dark film and a dark button on a light canvas were both measured wrongly before this rule; text standing on
  a film or photograph is reported for the eye instead of being failed by arithmetic.
- **Clicks are trusted events** (`Input.dispatchMouseEvent`), touches are real touch events, and keyboard focus is
  reached by a trusted click on quiet ground followed by Tab, so `:focus-visible` really applies.
- **Sticky stages are walked** in eight steps through their scroll range, and the 3D block is walked step by step
  (Plano → Modelo → Vacío y amueblado → Entrega), because its media are fetched on request.
- **Reveal animations are given time to settle** (≈ 1.2 s after each scroll) before anything is read.
- Evidence of the run goes to `docs/website_redesign/review_<date>/` with the probes and their JSON. No credential,
  token or signed URL is ever recorded.

## G. Limits of this list

1. It is a technical and operational check. It is **not** a legal approval and **not** a design acceptance.
2. The owner's own view: real iPhone/Safari, the real mail client, the brand's colour, "modern enough", the 3D
   rotation's choice, and whether the texts convince.
3. The database half of the backend evidence stays with API; 3D delivers the media and its own checksums; Copy owns
   the wording. A figure's product truth comes from the register, not from me.
4. This list is bound to Copy v3 (`04f4981`) **and its addition `702a11d`**. If a newer text source lands, the rows
   that quote it move with it.
5. Section **D-3c** is a **production** check, not a preview check. A preview PASS says nothing about whether an
   invited external agency could use a function in production.

### G-6. Where the new hiding rule collides with a rule already in force

Reported, not silently passed over. Each needs one decision, and the decision belongs to the owner with Copy and API —
not to me.

1. **Copy v3 §1 is the only text source and it is built on the three status words** over 23 keys; the hiding rule
   takes those words off the page. §1 therefore needs a sentence from Copy saying where the words still apply (the
   preview notice? the internal register only?) — otherwise Copy's binding source and the visible page disagree by
   construction.
2. **Copy v3 §9's plans table is defined as 19 fixed rows with one status word per cell**, and its census (Incluido
   7 rows × 3, the "No incluido" cells in their places) is a pass condition. In the public view most of that table
   disappears. Copy owns the question of what the public table then is — the included rows only, or a differently
   written table.
3. **Owner finding D12** asked for "fewer *En preparación*" and **C03** for a status word in every cell. The hiding
   rule answers D12 and withdraws C03's condition. I read the later order as the stronger one and have marked C03
   accordingly; if the owner meant C03 to survive, say so and I restore it.
4. **Two "próximamente" lines are not function statuses but sentences Copy wrote deliberately:** the insight line
   "informe ampliado: próximamente" (§6) and the connection wording N-1 … N-4 of the addition `702a11d`, whose whole
   point is that the page must say the connection is *not yet* there. A literal P-1 would delete exactly the honest
   sentences. **My reading:** P-1 strikes the status word **next to a function** (card, cell, tab, FAQ status mark);
   it does not strike a full sentence about what the product does not do yet. RV6 will check it that way and list
   every such sentence separately, so the owner can strike more if that is the intent.
5. **D-3a's P-2 notice and the claims ceiling** meet each other: the notice has to say "target state, not all live"
   without becoming a promise (P-3). The wording must come from Copy; I do not invent it, and a notice written by
   Redesign is a finding against §C if it dates anything.
6. **Hiding and the figures:** `/es/example-report` shows "No medido" twice by Copy's design (§6). That is an honest
   statement about a measurement, not a coming-soon status, so Q-5 keeps it. If the owner wants those two rows gone
   from the public view as well, the report's four-figure story changes and Copy has to rewrite §6.
7. **If the public view is the one with fewer functions, the public site becomes thinner than what the owner rejected
   as "too little" on 03.11. (C-all).** That is a product decision, not a review finding — I record what each view
   shows and leave the judgement with the owner.
