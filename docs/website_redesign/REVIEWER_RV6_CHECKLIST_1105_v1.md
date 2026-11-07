# REVIEWER RV6 — the check list, written before the build exists

**Role:** independent reviewer. No application code written or changed. **Status:** prepared, **not yet run**.
**Written for:** Redesign (so it can build against it), Copy, 3D, API and Audit. **Date:** 2026-11-05,
**extended 2026-11-06** for Copy's addition `702a11d` (§D-2 connection wording), **again 2026-11-06 (evening)** for
the owner's change order (hero = A, §D-3 replaced by the two views, A-16 … A-20), and **again 2026-11-06 (late)** for
the owner's answer to §G-6 and **Copy's addendum `e072d18` (§14–§23)**: P-1 holds strictly — "próximamente" /
"coming soon" stands in **no** view, not even inside a whole sentence; §D-2 is rebuilt as the **register of places**
(bound to Copy's V-1 … V-59) with a **view-aware** false-promise test; the claims ceiling splits into "forbidden
everywhere" and "target state, hidden in public while the key is off"; the report's figures follow the addendum's
§19 (five channels, 10 · 6 · 3 · 2 · 4, rates on 25); §E drops the 19-row census; D12 holds over C03; "No medido"
stays; the notice is Copy's, quoted word for word. **All seven collisions of §G-6 are answered; one new point is
recorded in §G-7.**

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
| **Copy's addendum of 06.11.** — §14–§23, **takes precedence** where it differs from §1–§13 | same file, **`e072d18`**: the two views and the preview notice (§14), the new keys (§15), the new demo reply and the chips (§16), the report's five channels and sums (§19), plans and the way in (§20), and **§23 = the register V-1 … V-59 plus the rows this list had to follow** |
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
| A-20 | **the switch "Sin / Con NuovaSolution"** | both states are reachable by mouse, touch and keyboard with a visible focus ring; the switch carries **no money and no revenue promise** — no €, no %, no "más ingresos", "más ventas", "más comisiones", "ROI", "recuperas", "ahorras X horas", no time-saved figure, no statement about real agencies (§19); the mark "Ejemplo con datos ficticios · la misma semana" stands **in sight of the figures**, not in a footnote further down; the seven rows and both closing sentences are §19's, and the 6 viewings are **the same** in Sin and Con |
| A-21 | **the preview is protected** — **decided by the owner on 06.11.: yes, before the next named build** | now a pass condition, not a question: the preview **must not** answer 200 without the bypass; the owner's own way in (one password, phone-sized window) works; `X-Robots-Tag` / `<meta name="robots">` is noindex **as well**; Copy's notice stands on every preview route, ES and EN. What the protection must leave intact so the other 20 checks can run at all is in `REVIEWER_TO_REDESIGN_1106_VORSCHAU_SCHUTZ_v1.md` (six requirements; the bypass secret lives only in `C:\Users\Usuario\.nuova-secrets\`) |
| A-22 | **only the new wall art, per medium** (the owner, 06.11., WANDBILDER-RAUMTYP = OK) | every medium the named build actually references is inventoried and checked **one by one**, not as a group: `house-delivery.mp4` / `.webm` and its poster, `house-ground-loop.mp4` / `.webm` and its poster, the living-room camera ride, the web model's assets, the hero stills `hero-a-2560/1920/1280.webp` and `hero-a-poster-960.webp`, and every other picture or video on any route. Per medium: **(a)** its sha256 **as served** matches an entry in 3D's handover manifest that 3D marks as carrying the **new** wall art — a medium whose checksum is not in that list is a finding, whatever it looks like; **(b)** a frame is captured at a moment where the wall is in shot (videos: at the stage step that plays it; stills: directly) and filed as evidence, so the owner and 3D can confirm with the eye what the checksum asserts. **The named exception:** the hero medium carries Van Gogh by the owner's line (today picture A, the hero video when it lands) and is **not** failed for it — it is recorded as the exception. **Pass condition: no medium on the site carries the old picture.** The mapping comes from 3D's handover with checksums; Redesign swaps only from that handover, so a medium in the build that no handover entry explains is a finding against the swap, not against 3D |
| A-24 | **Copy's own check of the build — D-1 … D-23** (the owner, 07.11.) | `COPY_CHECK_1107_BUILD_a5f1d21_v1.md`, **`64751f1`**, is a checkpoint list in its own right: every row is measured on the next named build, in **both** views and in ES and EN, with **D-3 … D-7 first** (the alert on `/platform/lead-intelligence` and `/platform/crm`, and the contact promise "lo anoto / te escribe con día y hora" on `/platform/ai-sales-agent` and `/platform/crm`). Lesson from RV6 on `a5f1d21`: an alert or promise scan that covers only the home page and the FAQ **misses `product-views.tsx` and `home-story.ts`** — every route in the sweep is scanned for the alert and for a contact promise, not just the home page |
| A-25 | **what is switched off is hidden publicly** (the owner, 07.11.) | in the **public** view: **0** "Tareas diarias" (and its nav/footer entry) while `taskList` is off · `/signup` carries no "14 días gratis" and no sign-up form, and the route itself is not reachable as a trial page · `/contact` carries no sentence about the Prueba · no payment block anywhere. Each checked as a string **and** by route status |
| A-26 | **A-6 and A-20 measured on the deployment itself** (the owner, 07.11.) | the "Sin" state of the switch "Sin / Con NuovaSolution" is reported to live **only in client code**: so A-20 is measured twice — with JavaScript (both states reachable, the figures of §19, the example mark in sight) **and** in the delivered HTML of the deployment (A-6), where the "Sin" rows must either stand or the block must not claim a comparison that a reader without JavaScript cannot see. Together with F-4 of 07.11. (49 elements at inline `opacity:0` without JavaScript), this is the one mechanism to re-measure in full |
| A-23 | **the alert says nothing false** (the owner, 06.11.) | `alert` is **`soon`** in `lib/claims.ts`, so no page may state the e-mail alert as something that happens today. The three lines the owner named are checked by their place: **`faq.ts:125` Q-31** ("Sí, por email. … recibe un aviso con el motivo. Todavía sin horario de oficina.") · **`faq.ts:133` Q-41** ("…hasta entonces, tu equipo recibe por email el aviso de cada consulta importante.") · **`faq.ts:141` Q-42** ("Hoy no. Hoy tu equipo recibe por email el aviso…"). All three must be gone in the **public** view (V-32, V-48, V-49: the question is hidden). In **both** views the construction "the alert happens meanwhile / today" is forbidden, because it sells a held-back function as the fallback for a hidden one — and "Todavía", "Hoy no" and "próximamente" fall under C-1 anyway. In the **preview** only the target sentence of §20 may stand: "Sí. Cuando una consulta es importante, avisa por email a la persona que toca, con el motivo." EN included (`faq.ts:124`, `:132`, `:140`) |

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
| D05 | the scene change on scroll is good but not recognisable; "Leads importantes" carries a blanket "En preparación" although the priority is on the record | **0** state words on any scene (V-4, V-7: no text; the scene follows its key); the scene change has a visible marker (progress, number or title); scene 4 and scene 5 carry their new sentences (V-5, V-6) | M for the words · O for recognisable enough |
| D06 | "Tomar" not clickable; Daily's voice question not shown | "Tomar" is a real control (button/link or `role` + `tabindex`), reachable by hit-test and by keyboard, **or** it is honestly marked as a demo. The voice question and the task list carry **no state word**: in the preview they stand as §21's Q-41/Q-42, in public they are hidden (V-48, V-49) | M |
| D07 | the report's "Por canal" names only WhatsApp/Email | **preview:** five channels with figures, 10 · 6 · 3 · 2 · 4 = 25 (§19). **Public:** only the channels that run, 14 · 11 with two on, the block hidden with one. **0** "próximamente" marks on any channel (V-11, V-14) | M |
| D08 | `/es/example-report` unprofessional: small bars, much white space, no real charts | real chart elements exist (axes, scale, legend, labels) and are not decorative strips; every figure matches §D below; the page's empty space is recorded as a measurement, the verdict stays the owner's | M+O |
| D09 | the rotation should show the ground floor only | which media the step "Modelo" loads, its duration, loop and whether the segment shown is the ground floor as delivered by 3D | M for the media · O for the choice |
| D10 | the delivery clip stutters; the path "plan → finished" is not visible for the agent | the clip's codec, resolution, fixed frame rate, poster, duration, dropped versus total frames while it plays; the agent's path line from Copy v3 §8 is present | M for the figures · O for the feel on their machine |
| D11 | the dark green does not fit the brand; English labels in the Spanish footer | **0** English module labels on Spanish pages — "Asistente de consultas", "Ficha y prioridad", "CRM", "Tareas diarias", footer link and nav "Acceso" (Copy v3 §10.4); the closing section's colour recorded as a token value | M for the labels · O for the colour |
| D12 | "Recomendado para empezar" holds back the upsell; the table is small; too many "En preparación" | **0** occurrences of "Recomendado", "Más popular", "El más completo"; no cell under 14 px; **0** status words in the table (the census is withdrawn — §E) and, with `plans` off, no table at all | M |

### C01–C09 (03.11., on `f6315c1`) — re-checked for regression

| ID | Owner's finding | What RV6 measures | Who decides |
|---|---|---|---|
| C01 | **resolved by the owner's order of 06.11.: the hero is picture A; the film from 3D comes later** | the hero carries the 3D lane's render **A** (`hero_A`, handoff 2026-11-05, `a881c88`) as a still picture: the three WebP widths load with `naturalWidth > 0`, the 960 px poster is the first paint, the drift is slow (≈ 24 s) and **absent** under reduced motion, the lane's alt is set, and the visible mark "Casa de ejemplo ficticia, visualización" stands in sight of the picture. **No hero film and no pause control** — a `<video>` in the hero is now a finding, not a pass. The later film stays a future stage and is not checked on this build | M |
| C02 | the 3D turn still shows room names and the viewer's menu | **0** room names (Salón, Cocina, Dormitorio, Baño, Planta) and no viewer UI in the film | M |
| C03 | empty circles without ticks; "Probar gratis" | **0** empty circles in the plans; "Pruébalo gratis" stays **off** (Copy v3 §9). The condition "every cell carries a status word" is **withdrawn** by the order of 06.11. — see §G-6, conflict 3 | M |
| C04 | "Cómo se pide" is text instead of picture and arrows | the 3D path is shown in steps, not as a paragraph | M+O |
| C05 | the week's figures are a statistics box instead of a chart from the real reporting | the chart is a chart (see D08) and its figures are §6's | M+O |
| C06 | two messages from Laura, time only on our reply, "Anoto" sounds like a machine, the second-home question is illogical | **one** message from Laura, a time on **both** sides, **0** "Anoto", **0** "segunda residencia", and the reply is the **new** one of §16 Question A word for word — "¡Hola, Laura! Gracias por escribirnos. Buscas en Estepona, 2 dormitorios y hasta 320.000 €, ¿verdad? ¿Te viene mejor por la mañana o por la tarde para una visita?" (**not** Copy v3 §3 any more), plus the small line "Una petición de visita no es una cita: la confirma una persona." | M |
| C07 | e-mail channel must look like a mailbox | the e-mail panel shows a mailbox (list, sender, subject), not a chat | M+O |
| C08 | the web form looked like a WhatsApp chat | the form panel is a real form. **The "Próximamente" mark is withdrawn** (V-2): no tab carries a mark, a pill or a state line in either view (§16); the tab itself stands in the preview and follows `webform` in public | M |
| C09 | the phone channel is weak, the call view missing | the phone panel shows a call, **with no mark** (as C08); the tab follows `phoneAssistant` in public | M+O |
| C-tabs | — | the invitation above the tabs is "Elige un canal y mira cómo responde." (§16, replacing "Elige un canal"); with only one channel on in public there are **no tabs and no invitation** | M |
| C-all | logo missing, no animations, not modern, too much text | the logo is in the header; the word count of the Spanish home page; the motion is recorded in real-time captures, normal and reduced | M for logo and counts · **O for modern enough** |

---

## C. Claims ceiling — nothing may be said beyond the register and Copy v3

Checked on **every** route, ES and EN. **With the addendum `e072d18` the ceiling splits in two:** some lines are
forbidden everywhere, and others are the **target state** that the preview may show while the **public** view must
hide them until their key in `lib/claims.ts` is on. Both halves are checked separately, and a line in the wrong half
is a finding.

### C-1. Forbidden in **both** views

| Must **not** appear | Why |
|---|---|
| **"próximamente" / "coming soon" in any wording** — the status word, and equally inside a whole sentence ("informe ampliado: próximamente", "llega próximamente", "Próximamente: conectar…"), plus "pronto", "en breve", "en preparación", "Prototipo" | the owner's answer of 06.11.; §14 of the addendum: gone from all visible text in both views. The register of the places is §D-2 |
| **"Incluido" / "No incluido" / "Included" / "Not included"** as a word next to a function | the status words live only in §1 of the handover and in `lib/claims.ts` — internal, never on the page (§14) |
| **"Hoy no"**, and "hoy" or "todavía" wherever they promise something later | §14: these are readiness words in disguise |
| "Disponible" per function or plan | the register allows it only where the column "may say today" does |
| the prices 349 / 649 / 999 € | internal calculation only; "Te decimos el precio para tu agencia" instead |
| "Recomendado", "Más popular", "El más completo" | no popularity claim; Enterprise holds more than Growth |
| a numeric score such as "98/100" | only with a real scale and calculation; otherwise a priority category with its reason |
| "todos los datos en la UE" | only **the database** is in Frankfurt |
| "tu propio número" for WhatsApp | production has our own number only |
| "multilingüe", "en su idioma" — and any reply sentence without "en español" | §15: every reply sentence says "en español" in **both** views while `otherLanguages` is off. This is Copy's one stated exception to "preview = target" |
| "visita confirmada" for an asked viewing | "Una petición de visita no es una cita: la confirma una persona" |
| "en un buzón que operamos para ti" / "a mailbox we operate for you" | route B is stopped (D5-DIREKT), so the sentence is gone in **both** views (§13) |
| a delivery time or price for 3D | neither is given |
| "60 fps", "Lighthouse 100" without a measurement | no unmeasured performance claim |
| **money or revenue from the comparison** — a € figure, a percentage of revenue, "más ingresos", "más ventas", "más comisiones", "ROI", "recuperas … €", "ahorras X horas", a time-saved figure, a statement about real agencies | §19 closes this explicitly; the switch shows one fictional week, not an earning (A-20) |
| the three things with no owner line yet — `otherLanguages`, the calendar row, reading photos and PDFs (Q-26) | §14: not shown in **either** view for now |

### C-2. Target state — the preview may show it, the public view must hide it while the key is off

Each row is checked twice: present in the preview, and **absent** in the public view unless `lib/claims.ts` carries
the named key as included. The fallback wording in the last column is Copy's.

| Line | Key(s) | What the public view shows instead |
|---|---|---|
| "Conectamos contigo el buzón y el WhatsApp de tu agencia y probamos cada canal con un mensaje real." (trust line, FAQ Q-21, onboarding and trial step, "Cómo empezar" step 3, the close) | `mailboxConnection`, `whatsappOwnNumber` | one channel on: the same sentence with that channel only · neither: "Pides acceso y te enseñamos el sistema." / the step is hidden / the close drops "con tus canales" |
| "14 días gratis, en 3 pasos", "Pruébalo gratis 14 días", "Sin método de pago y sin renovación automática.", "Crea tu cuenta." | `trial`, `publicSignup` | "Cómo empezar" with steps 1–2, "Solicita una propuesta" / "Pedir acceso", "Acceso por invitación." |
| "Sí. Cuando una consulta es importante, avisa por email a la persona que toca, con el motivo." and the chip "Marca la prioridad y avisa a tu equipo" | `alert` | the FAQ question is hidden; the chip reads "Marca la prioridad y su motivo" |
| "También se conecta con HubSpot, Pipedrive, Zoho y Salesforce." / the integrations row incl. Outlook | `integrations`, `outlook` | the sentence ends at "Incluye un CRM."; the row names only the parts that are on |
| the plan names and the comparison table | `plans` | **no plan names and no table** — one block "Qué incluye" with the rows that are on, the price line and the action (§E) |
| "Por canal", the chart, the three insights, the funnel rates | `reportTrend` | the block, the chart and the insights are hidden |
| the whole 3D section including its action | `model3d` | hidden |
| the report section | `reportInLogin` | hidden |

**The floor (§15):** with `replySpanish` or `crm` off there is no public product page at all. If the named build's
`lib/claims.ts` has either off, the public view is not a page to grade — I record that and stop there.

### C-3. Must appear

**In both views:** "NuovaSolution" instead of "Nuova" in every visible text except the demo's sender label; the demo
mark "Demo con datos ficticios"; the hero mark "Casa de ejemplo ficticia, visualización"; the automation mark
"Asistente automático de la agencia" **once**; "No medido" **twice**; and the five limits that §14 keeps in public
because hiding them would mislead — in another language nothing is sent automatically · a viewing request is not an
appointment, a person confirms it · answered is not delivered · two records until `oneRecordAcrossChannels` is on ·
the retention answer Q-44 word for word until counsel has answered.

**In the preview view only:** Copy's notice, word for word (§14) — "Vista previa, no pública. Muestra el producto
completo, incluidas funciones que no están activas. Datos de ejemplo: nada de lo que introduzcas crea una cuenta ni
llega a nadie." / "Preview, not public. It shows the complete product, including functions that are not active.
Example data: nothing you enter creates an account or reaches anyone."

**Withdrawn as a must-appear row:** the old invitation line "Acceso por invitación mientras preparamos el registro
público." — V-1 shortens it to "Acceso por invitación.", and in the preview's target state H-6 replaces it with "Sin
método de pago y sin renovación automática."

---

## D. The figures of the report and `/es/example-report`

One set of values, identical on the home page and on the report page. The four head figures of §6 stay; the channel
split, the insight and the rates are **re-cut by the addendum's §19** (`e072d18`). Each figure must carry its
definition; a figure without one is a finding.

| Figure | Target state (preview) | Public view | Note |
|---|---|---|---|
| Consultas recibidas | **25** | the same | new enquiries recorded in the week |
| **Por canal** | WhatsApp **10** · Email **6** · Formulario web **3** · Teléfono **2** · Portales y anuncios **4** | only the channels that run: with WhatsApp and Email on → **14 · 11**; one channel only → the block is hidden; any other set → each off channel's figure is added to Email (to WhatsApp if Email is off) | sums to **25** in every set — this is the point of the row |
| Respondidas | **23** | the same | the other 2 arrived in another language, nothing sent automatically |
| Esperan a una persona | **2** | the same | |
| Visitas pedidas | **6** | the same | asked is not agreed — nothing may say 4 here |
| acordadas por el equipo | **4** | the same | |
| Entregadas al cliente · Tiempo de respuesta | **No medido** ×2 | **No medido** ×2 | as text, not as a number; stays in **both** views |
| weekly chart | 19·17 · 24·22 · 21·20 · **25·23** | hidden with `reportTrend` off | week 4 equals the figures above |
| **insight "Tu mejor canal"** | **WhatsApp · 10 de 25 consultas** | with WhatsApp + Email on it must agree with the channel block (14), not stand at 10 | a mismatch between the insight and the block is a finding |
| insight, hours | peak **11:00–12:00 · 6**, the 13 hour rows summing **25**, plus the line "Horario de la agencia de ejemplo: de 10:00 a 14:00 y de 17:00 a 20:00." | hidden with `reportTrend` off | the hours replace Redesign's working row |
| **funnel rates** | every rate on the 25 received: **92 % · 24 % · 16 %** with "Porcentajes sobre las 25 consultas recibidas." | hidden with `reportTrend` off | R-11 fixes the mismatch on `2dfa67d` (funnel "26 %" beside the insight "24 %") — **0** occurrences of 26 % |
| status line and insight state line | **removed** | **removed** | R-2 and R-8 are gone in both views |
| base line | "Base: consultas registradas en NuovaSolution, de lunes a domingo. Respondida no es lo mismo que entregada: el informe no mide lo que llega al cliente." | the same | word for word on the report page |
| example marks | "Informe de ejemplo · no son datos de ninguna agencia" and a fictional-data mark | the same | present |
| the page's close | the line "El informe de tu agencia se crea con tus consultas; no hay cifras que rellenar." | with "Acceso por invitación." in front | **no** "Míralo con los datos de tu agencia" is required any more; no trial line in the public view |

**A-19 runs exactly Copy's own sum list (§19):** channels 10+6+3+2+4 = 25 and public 14+11 = 25 · answered 23+2 = 25 ·
hours 13 rows = 25 with peak 6 · office hours open 16 + closed 9 = 25 and closed 2+2+5 = 9 · answered split
14 open + 9 closed = 23 · viewings 4 ≤ 6 and 2 asked while closed ≤ 6 · rates 23/25 = 92 %, 6/25 = 24 %, 4/25 = 16 % ·
chart last week 25/23. **The switch's own rows** (§19): 25/25 · 9/9 · 2/2 · 9→0 · 5→0 · 25→2 · "lo que alguien anote"→25,
and the 6 viewings are the same in both states — a switch that claims an extra viewing is a finding.

**Settled:** the funnel discrepancy of `f3dcdbf` (25 → 23 → 4 → 3) is closed by §19 — 6 asked, 4 agreed, and the rates
all on 25.

---

## D-2. The register of places — where "próximamente" stood, and what stands there now

The owner's answer of 06.11. (late): **P-1 holds strictly.** "próximamente" / "coming soon" stands in **no** view, not
as a status word next to a function and **not inside a whole sentence** — so the sentences that Copy's addition
`702a11d` §13 made mandatory are now themselves to be removed. Two things must therefore be true at the same time at
every one of these places, and RV6 checks both:

- **(a) the word is gone** — `próximamente`, `proximamente`, `coming soon`, `pronto`, `en breve`, `en preparación`,
  case-insensitive, in text, `title`, `alt`, `aria-label`, `placeholder` and hover layers, in both views, ES and EN;
- **(b) no false promise took its place** — see the test below. A place that is merely emptied and now reads as if the
  connection already worked is a **finding**, not a pass.

### The places, one by one

**No longer open: Copy delivered the wording in `e072d18` §23** — 59 rows **V-1 … V-59** (A: §2–§10 · B: §13's
N-rows · C: the appendix and the same wording in the code on `2dfa67d`), each with place, old ES, old EN, new ES,
new EN and the preview row. **That table is the register; RV6 runs it row by row** and writes three columns per row
into the return: what the named build shows, whether (a) and (b) hold, and which view it was measured in. My N-rows
below stay as the short index into it.

| ID | Place | What stood there (and must now go) | Copy's new wording |
|---|---|---|---|
| N-1 | the first trust line, home page (`home-1103.ts:346`) | "Pides acceso y te enseñamos el sistema. La conexión … **llega próximamente**." | **V-19, V-24 · §13 N-1:** target "Conectamos contigo el buzón y el WhatsApp de tu agencia y probamos cada canal con un mensaje real."; public with both keys off "Pides acceso y te enseñamos el sistema." |
| N-2 | the FAQ Q-21 (`faq.ts:205`) | "Hoy te enseñamos el sistema … **llega próximamente**; cuando esté lista, probaremos cada canal…" | **V-25 · §13 N-2:** target "Tú preparas los datos de tu agencia, tu logo y tu equipo. Conectamos contigo el buzón y el WhatsApp y probamos cada canal con un mensaje real antes de darlo por conectado."; public, neither key "Te enseñamos el sistema con datos de ejemplo." |
| N-3 | the onboarding step "Tus canales" (`es.ts:323`) | "La conexión … **llega próximamente**." | **V-26 · §13 N-3:** target as N-1; public, neither key: **hide the step** |
| N-4 | the trial step "Canales" (`es.ts:473`) | "**Próximamente**: conectar el buzón y el WhatsApp de tu agencia." | **V-27 · §13 N-4:** target as N-3; public: `/trial` leads to `/contact` (§21), no text |
| N-5 | the e-mail answer line (`capabilities.ts:83`, `platform-map.ts:55`) | "Respuesta por email: **próximamente** para el buzón de tu agencia." **and** "…en un buzón que operamos para ti." | **V-28 · §13 N-5:** target "Respuesta por email, en el buzón de tu agencia." / "La misma respuesta para lo que llega al buzón de tu agencia."; `replyEmail` off: hide the row. **"en un buzón que operamos para ti" is gone in both views** — route B stopped |
| N-6 | the Email tab's state line (`home-demo.ts`) | "Demo: así funcionará con el buzón de tu agencia (**próximamente**)." | **V-29 · §13 N-6: removed in both views**; the tab follows `replyEmail`, and **no tab carries a mark, a pill or a state line in either view** (§16) |
| N-7 | the insight and chart lines on the report and `/es/example-report` | "informe ampliado: **próximamente**", "La evolución por semanas forma parte del informe ampliado: próximamente", "Estas conclusiones forman parte del informe ampliado: próximamente" | **V-10, V-12, V-23 · R-5/R-8:** chart note "Cuatro semanas de ejemplo."; the insight state line and the "informe ampliado" lines are **gone**; the chart follows `reportTrend` |
| N-8 | Daily's voice question, the team list, the task list (`faq.ts:133`, `faq.ts:141`) | the state **Próximamente** beside them | **V-48, V-49:** no text — the questions are hidden; in the preview they stand as Q-41/Q-42 of §21 |
| N-9 | the further channels in the report's "Por canal" (`example-report.ts`) | a channel without a figure, marked **Próximamente** | **V-11, V-14 · §19:** five channels with figures in the target state, "Las mismas 25, según el canal de llegada."; in public only the channels that run |
| N-10 | the web-form and phone marks on the demo tabs (§3) | the mark **Próximamente** / **Coming soon** | **V-2, V-9, V-3:** no mark and no state line at all; the tab itself follows `webform` / `phoneAssistant` |
| N-11 | the demo's four state lines (`home-demo.ts`) | "Incluido: la respuesta por email … · Próximamente: el aviso …" | **V-3:** no text, in either view |
| N-12 | the scene state lines of the sticky stages | the state word per scene (Copy v3 §1, owner finding D05) | open — the scenes keep their marker (D05), without a state word |
| N-13 | the plans table's cells | **Próximamente** per cell (Copy v3 §9) | settled: no status word per cell at all (D12 over C03) |
| N-14 | the claims ceiling's conditional rows — CRMs (HubSpot, Pipedrive, Zoho, Salesforce, Outlook), other languages, the alert | each was allowed **only** carrying "Próximamente" | with the word gone, the only honest places are: **absent** in the public view unless `lib/claims.ts` includes it, and in the preview view present **without** the word, covered by the top notice (P-2) |

RV6 writes this table out in the return with three columns filled per row: what the named build actually shows, whether
(a) and (b) hold, and whether Copy's wording had landed at the time of the run.

### The false-promise test (b) — and why it is not the same in both views

The owner's point of 06.11.: where the "próximamente" sentence falls away, **no false promise may take its place** —
above all nothing saying the mailbox connection already runs. Copy's answer puts the affirmative sentence
("Conectamos contigo el buzón … y probamos cada canal con un mensaje real") into the **target state**, where the
preview notice carries it, and hides it in **public** while `mailboxConnection` is off. So the test has two halves:

| View | What the connection sentence may say | Pass condition |
|---|---|---|
| **Preview** | the affirmative target sentence **is** the expected text | it is there **and** Copy's notice stands above it (P-2). The notice is what makes the sentence honest; **without the notice the sentence is exactly the false promise the owner named**, and RV6 reports it under P-2 *and* (b) |
| **Public** | nothing about connecting the agency's mailbox or WhatsApp while `mailboxConnection` / `whatsappOwnNumber` are off | the fallback of §13 stands instead ("Pides acceso y te enseñamos el sistema.", the step hidden, the close without "con tus canales"), and **none** of the rows below appears |

**Forbidden in the public view while the keys are off — and in the preview too, because no sentence may claim it is
already done:**

| What must not stand | Examples |
|---|---|
| a past or completed state | "tus canales están conectados", "ya recibimos tus consultas", "tu buzón ya responde", "conectado" as a state on a channel |
| an instruction that invites the act now, or a surface to do it on | "Conecta tus canales", "Conecta tu Gmail", a button or link into a connect flow, a form field asking for the mailbox or an OAuth entry |
| a step the reader can take today, in the public view | the onboarding step and the trial step are checked for exactly this; in public they are hidden or lead to `/contact` |
| the agency's own number or mailbox as the demo's source | the demo's sender label stays "Asistente automático de la agencia"; the marks "Demo con datos ficticios" / "Datos de ejemplo" stay |
| a date or a horizon anywhere | "en semanas", "este mes", "en la próxima versión" — the notice itself must carry none (P-3) |

The channel labels "Email con Gmail" / "Email through Gmail" name a channel, promise no connection, and stay while
`replyEmail` is on. The small line of the way in, "Te decimos antes de empezar si tu buzón ya se puede conectar.", is
Copy's and is **not** a promise — it is checked as present wherever the three steps stand.

---

## D-3. Coming-soon is hidden — the two views (new version, owner's order of 06.11.)

The status words no longer stand next to the functions. RV6 checks **two views of the same build** and grades them
apart.

### D-3a. The preview view — the target state, without status words

| ID | Check | Pass condition |
|---|---|---|
| P-1 | **no status word and no coming-soon sentence anywhere** | `Incluido`, `Próximamente`, `proximamente`, `No incluido`, `Included`, `Coming soon`, `Not included`, `pronto`, `en breve` and the retired "En preparación", "Prototipo", "Implementado; todavía sin activar" appear **0** times — not in a card, not in the report, not in the FAQ, not in the plans table, not in a tooltip, `title`, `alt`, `placeholder` or `aria-label`, not on a hover-only layer. **Strictly, per the owner's answer of 06.11.: also not inside a whole sentence** — "informe ampliado: próximamente", "llega próximamente", "Próximamente: conectar el buzón…" fall too. Every such place is registered in §D-2 and must pass the false-promise test (b) |
| P-2 | **the notice stands at the top** | Copy's line (`es.ts:97` and EN), **word for word**: "Vista previa, no pública. Muestra el producto completo, incluidas funciones que no están activas. Datos de ejemplo: nada de lo que introduzcas crea una cuenta ni llega a nadie." It stands above the fold at scroll 0 at **1366 × 768 and at 390 px**, on **every** route of the preview in ES and EN, is not a dismissible cookie-style strip, and is not placed under the hero. **This notice is load-bearing:** it is what makes the preview's affirmative target sentences honest (§D-2 (b)), so a missing, shortened or scrolled-away notice is a finding against the whole view, not a cosmetic one |
| P-3 | **the notice carries no promise** | no date, no "en semanas", no "pronto estará", no "ya disponible", and none of the struck words of C-1 — measured against Copy's wording character for character, EN included |
| P-4 | **the view is recognisable as the preview** | the view is reached in a defined way (a path, a parameter or an env mode) and the way is written down in the return, so the owner can open exactly the same thing. The preview view must **not** be what an anonymous visitor on the public URL gets (P-5 proves that) |
| P-5 | **the two views really differ** | the same route, fetched both ways, differs in the expected direction: the preview shows the fuller target state, the public view shows only the included set. If both deliver the same HTML, the gate is not implemented — regardless of what either page says |

### D-3b. The public view — only what `lib/claims.ts` carries as included

| ID | Check | Pass condition |
|---|---|---|
| Q-1 | **the list is read first** | `lib/claims.ts` is read read-only from the named commit and the **included** set is written out key by key in the return. It is the single reference; a key missing from it counts as not included. The addendum's §15 adds keys Redesign must have written — `replyEmail`, `replyWhatsapp`, `replyOutOfHours` (included), `mailboxConnection`, `outlook`, `plans` (**soon**) — and RV6 records each one's value as found, because **`plans` = soon means the public view carries no plan names and no table at all** (§E) |
| Q-1b | **the floor** | with `replySpanish` **or** `crm` off there is no public product page at all (§15). RV6 reads that off `lib/claims.ts` first; if either is off, the public view is not graded and the return says so |
| Q-2 | **nothing beyond the included set is visible** | every function named in visible text maps to an included key. Checked surface by surface: the hero and its chips, the feature cards, the channel tabs and their panels, the record and the priority block, **the report and `/es/example-report`**, **the FAQ answers**, **the plans table**, the navigation and the footer, the demo's labels, the sticky stages' scenes, and the `platform/*` subpages |
| Q-3 | **nothing hidden only to the eye** | a function removed from sight must be gone from the delivered HTML's text, not merely `opacity: 0`, `visibility: hidden`, `display: none`, off-screen, zero-height or covered. Measured on the delivered HTML **and** on the live DOM, including the no-JavaScript pass (A-6) |
| Q-4 | **the plans table under the new rule** | per §20 P-5: a row whose key is off is **absent**, not an empty or struck cell; and with **`plans` off — its value today — there are no plan names and no table**, but one block instead: H2 "Qué incluye" / "What's included", the rows that are on as a list, the price line of §9 and the action of H-5. A plans table still standing in the public view while `plans` is off is a finding |
| Q-5 | **the figures follow the same rule** | a report figure for a function that is not included is absent; **"No medido" stays in both views** (the owner's point 3 — it is a measurement statement, not a status); §D's figures stay the binding set for what **is** shown |
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
Re-cut by the addendum's §20 (P-1 … P-8). Copy states it plainly: **"no status word in a cell; no fixed 19 rows in
public; the census of status words is no pass condition."** The old E-1/E-3 census is therefore withdrawn.

| Check | Pass condition |
|---|---|
| E-1 | **preview:** the rows of §9 in §9's order and wording, each cell a **✓** or a **—**, nothing else. **Public:** a row whose key is off is **absent**; with **`plans` off** there is no table and no plan name at all (Q-4) |
| E-2 | **0** status words in any cell in either view (P-1); no empty circle, no struck cell, no blank where a reader expects a value |
| E-3 | the legend is V-18's new wording — "Un ✓ donde el plan incluye la función." / "A ✓ where the plan includes the function." — **not** the old "Un ✓ solo donde la función está incluida hoy." |
| E-4 | no price, no badge, no popularity line; the intro is P-1's ("Empieza con 14 días de Essential, gratis…" in the target state, V-16's "Acceso por invitación." in public while `trial`/`plans` are off); the Growth and Enterprise lines name only the parts whose keys are on (P-6, P-7) |
| E-5 | nothing under 14 px; the same table in the same state on the home page and on `/packages`, ES and EN |
| E-6 | **preview:** Essential's action is "Pruébalo gratis 14 días", Growth and Enterprise "Solicita una propuesta". **Public with `trial`/`publicSignup` off:** every action is "Solicita una propuesta" / "Pedir acceso", and the words "14 días gratis", "Sin método de pago", "Crea tu cuenta" appear **0** times |
| E-7 | the integrations row names only the parts whose keys are on — `integrations` **and** the new separate `outlook` key (P-8); Outlook standing while `outlook` is off is a finding |
| E-8 | the whole block "14 días gratis, en 3 pasos" follows the same rule: in public with the trial off it is "Cómo empezar" with steps 1–2 (plus step 3 only while `mailboxConnection` is on) and the line "Acceso por invitación." (§20) |

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
4. This list is bound to Copy v3 (`04f4981`), its addition `702a11d` **and the addendum `e072d18` (§14–§23), which
   takes precedence where they differ**. If a newer text source lands, the rows that quote it move with it.
5. Section **D-3c** is a **production** check, not a preview check. A preview PASS says nothing about whether an
   invited external agency could use a function in production.

### G-6. The seven collisions — all answered

Copy answered each one in `e072d18` §23, on the owner's decisions of 06.11. Nothing here is open any more; the rows
are kept so it stays visible what was decided and why.

| # | What I raised | The answer, and where this list now stands |
|---|---|---|
| 1 | Copy v3 §1 is built on the three status words, which the hiding rule takes off the page | **Status words are internal only** — §1 and `lib/claims.ts`, never on the page. My §C-1 now forbids them in both views |
| 2 | §9's plans table is 19 fixed rows with one status word per cell | **No status word per cell and no fixed 19 rows in public.** §E is re-cut; the census is withdrawn |
| 3 | D12 against C03 | **D12 holds; C03's condition does not stand.** My withdrawal is confirmed |
| 4 | the two "próximamente" **sentences** are honest statements, not statuses | **The owner overruled my reading:** the word goes from whole sentences too, and a statement about connecting a mailbox appears in public only when it is true. §D-2 is rebuilt accordingly, and the affirmative target sentence moves into the preview, where the notice carries it |
| 5 | the notice's wording | **Copy's, in §14**, without date or promise; quoted in P-2 word for word |
| 6 | the report's two "No medido" | **Stay, in both views** |
| 7 | the thinner public view | **A deliberate product decision, not a finding.** I keep recording what each view shows |

---

## H. The small fix of the live site for Meta — character for character, and nothing else

A separate errand, not part of RV6, and the owner set its scope on 06.11.: **I report only the character-for-character
result, and only once Redesign names the preview.** Until then there is nothing from me on it.

| What | How |
|---|---|
| Where | the **preview** deployment of the live-site project `nuovasolution` (`prj_1AXMlFaisqoNhvWYfkMDPI5UJL9D`), named by Redesign with its deployment id — **not** the production deployment, which only goes out on the owner's `WEBSITE-KLEINFIX = JA` |
| Which pages | the four of the fix: `/legal-notice`, `/aviso-legal`, `/privacy-policy`, `/politica-privacidad` |
| Against what | the owner's own five values as delivered — the full name **with its accents as on the DNI**, the full address (street, number, postcode, town, province), the phone that takes calls, Copy's brand sentence "NuovaSolution es una marca de …" / "… is a brand of …" |
| Character for character means | the visible text is extracted and compared **unnormalised**: every accent and ñ, every space, every comma, the postcode's digits, and the phone in **E.164 never regrouped** (the 14.10. finding). A sha256 of each page's extracted text is recorded, LF and CRLF |
| And the rest of the page | diffed against the text of the current production deployment `dpl_4xQt97aFfKzNBpsmXzKxNwZeHTCq`, so that **only** the intended insertions changed. An unintended change anywhere else is reported even if the five values are perfect |
| What I report | one table: per page and per value, matches / differs, with the differing characters named; plus the four sha256 values and the diff count. **No verdict on publishing, no legal opinion, no recommendation** — the owner's line decides |
| What stays out | the privacy text and the "we do not share your data" sentence (counsel, L22), `/terms` and `/data-deletion` on the live site, and the NIF, which comes as the second mini-deploy on day X |

---

### G-7. The question the owner has now answered — the preview goes behind a protection

**Answered by the owner on 06.11., 19:00: yes — the preview goes behind a protection before the next named build**,
with two conditions: the owner must be able to open it on their phone, and my checks must keep running.

What I raised: with the addendum, the **preview** view carries the full target state — "Pruébalo gratis 14 días",
"Crea tu cuenta", "Conectamos contigo el buzón y el WhatsApp de tu agencia", "Sí. … avisa por email a la persona que
toca". These are exactly the lines API's register (`25a6382`) holds back from the public, and what keeps them honest
is one line of notice at the top of the page — on a URL that, on every build I have measured, answers to anyone
holding the link, with only `noindex` in front of it.

What follows from the decision: **A-21 becomes a pass condition** instead of a recorded observation, and the six
properties the protection must leave intact — so that the hero WebPs, the 3D media, `/api/build`, the icon, the
no-JavaScript pass and Lighthouse can still be measured — are written for Redesign in
`REVIEWER_TO_REDESIGN_1106_VORSCHAU_SCHUTZ_v1.md`. The bypass secret lives only in `C:\Users\Usuario\.nuova-secrets\`
and appears in no report. If the protection lands in a form that blocks a check, I say which check and why rather
than reporting a false finding.
