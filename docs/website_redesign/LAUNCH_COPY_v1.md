# LAUNCH COPY v1 — the publication register and the launch texts

**State:** `2026-09-28_FINAL_CONVERGENCE_AUDIT_R2` · **Written:** 2026-09-28 · **Copy version:** `launch-v1`
**Lane:** Website Copy / Product Truth → **Website Implementer** (all page text) · **Reviewer** checks
the register against the rendered page.
**Base:** website `e39ad06` (HEAD `44e9639`), the rendered dictionaries
[en.ts](lib/i18n/dictionaries/en.ts) / [es.ts](lib/i18n/dictionaries/es.ts),
[capabilities.ts](lib/content/capabilities.ts). Findings Z01–Z22 and rulings R24–R40.
**Status:** DRAFT by its author, not independently reviewed.

> This file is a **delta against what is rendered today**, not a new page plan. Where a key is not
> listed, the text at `e39ad06` stays. `PRODUCT_TEXTS_C3_v1.md` stays in force for everything this
> file does not change; `AUTH_COPY_v1.md` owns sign up, login and the account e-mails; legal pages
> are in `LEGAL_PAGES_FINAL_v1.md`; the product assistant's knowledge is `PRODUCT_FAQ_KB_v1.md`.

---

## 0. The four rules this file enforces

1. **No sentence outranks its evidence.** Every public claim is a row in §1 with a proof reference
   and, where it is not provable today, the exact signal that makes it publishable.
2. **No internal language on a sales page.** No "not ready", "certified internally", "external gate
   pending", "in development", "being built", "test environment", catalog codes, browser versus
   backend explanations. The register carries the truth; the page carries the offer.
3. **No invented anything.** No prices, no counts, no durations, no response times, no testimonials,
   no agency numbers, no language counts, no "most agencies".
4. **No promise the run does not keep.** "An agent will contact you" appears only where the same
   surface shows the task that was created (R36). A viewing request is never shown as a confirmed
   appointment.

---

## 1. Publication register

> **Amended 2026-09-29 by `COPY_DELTAS_0929.md` §1.** Five rows moved after the lane truth sheets
> arrived: L-03 loses qualification and priority, the new L-03b states that a record is per channel,
> L-04 is confirmed as the strongest proven row, L-07 releases the Essential trial wording, and L-14
> narrows Voice. Read that section together with this table.

`publish` is the decision for the launch build. `gate` is the signal that must be reported before
that row may render at all; a row whose gate has not been reported stays out of the build, it does
not render with a caveat. Evidence keys are rows of
`governance/CLOSEOUT_EVIDENCE_INDEX_v1.md` and gates N0–N14 of the 2026-09-28 audit §0c.

| # | What the customer is told it does | publish | evidence today | gate before it renders |
|---|---|---|---|---|
| L-01 | Text enquiries on WhatsApp are answered under your agency's name | live | prod Main 240 n carries the reply and disclosure logic (`STATE-0928-LIVE`); buffer cases A/B/C/D proven on staging; **0 customer runs since 2026-09-20**, all 8 notices inactive | `AI_DISCLOSURE_ACTIVE_ES` + `DISCLOSURE_SCOPE_PILOT = APPLIED` + `WA_HOLD_PROD = VERIFIED` + `PROD_BUFFER_DEPLOYED_AND_VERIFIED` |
| L-02 | Text enquiries by e-mail are answered in the same thread | live | same prod path; e-mail replies are held today because no notice is active (`DISCLOSURE-FN-BYTES-0924`) | `GMAIL_POSTFIX_E2E = PASS` (owner T2) |
| L-03 | Each enquiry becomes one customer record with a qualification and a priority | live | qualification and priority run in prod Main; counting contract fixed (`IC-CONTRACT-CANONICAL-R37`) | `IC_CONTRACT_CASES = PASS 4/4` |
| L-04 | A viewing request becomes one task your team can see and complete | live | **owner-proven in prod**: task `7cc4344f…` claimed 07:59:55Z, completed 08:02:48Z (`DAILY-CALLBACK-CARD-PROD-1`, gate N0 accepted) | `HANDOFF_PROMISE_RULE = STAGING_PASS` |
| L-05 | Replies are written in the language the customer wrote in | live | role line 14/14 with a real model (gate N5 half); canonical language fields exist (`LANG-FIELDS-1`) | `REPLY_CONTRACT_REAL_LLM = PASS`. **No language count, ever** |
| L-06 | You create the account yourself and set the agency up yourself | live | onboarding package ready; owner login and resume proven locally | `AUTH_SENDER_LIVE` + `STG_AUTH_REDIRECTS = EXACT` + `WEBSITE_REGISTRATION_INDEPENDENT = PASS` + `ONBOARDING_PROD_APPLIED` |
| L-07 | 14 days free, no payment method | live | trial exists; **trial plan is not Essential yet** (`BILLING-TRIAL-VS-ESSENTIAL-1`) | interim wording until `TRIAL_PLAN_ALIGNED`, then the Essential wording (§5.1) |
| L-08 | Plans, and an invoice paid by bank transfer | live, without amounts | billing objects 13/13 on staging | amounts only after `PRICING_AUTHORITY`; path after `BILLING_INVOICE_PATH = PASS` + `PAYMENT_ACTIVATION_IDEMPOTENT = PASS` |
| L-09 | A CRM is included from the start | live | built-in CRM in prod | `LEAD_TRUTH_INPUT = DELIVERED` for any detail beyond "included" |
| L-10 | Photos, documents and e-mail attachments are understood | **hidden** | prod media path byte-verified, **0 real media runs**; corrupted-file case is a reproduced FAIL | `MEDIA_OWNER_E2E = PASS` |
| L-11 | Suitable properties are suggested inside the reply | **hidden** | real model 1/7: G1 not run, G2/G4/G6/G7 FAIL (`PM-REAL-LLM-RAW-0923`); in the pilot the feature is switched off (R32) | `PM_REAL_LLM = PASS 7/7` |
| L-12 | Messages carry your logo and your signature | **hidden** | renderer deployed, own logo upload on staging, **no real branded mail sent since 2026-09-22** | `BRANDING_CHAIN_MATRIX` (Hosting) + one real sent mail |
| L-13 | Ask the product assistant on this site | **hidden** | staging run 93233 failed, product question was routed through the property pipeline (`WEBQA-STG-93233`) | `WEBSITE_QA_STAGING = PASS` **and** an approved web disclosure text (A-W7, §6 of `PRODUCT_FAQ_KB_v1.md`) |
| L-14 | A phone assistant | on request | gateway v8 in prod, booking fail-closed, negative control 8/8; **no real customer call, no number** | `VOICE_TELEPHONY_INVENTORY = DELIVERED`. One sentence only, §7.2 |
| L-15 | Property Experience, 3D | on request | two models, delta 3; owner has **not** accepted it visually | `3D_FEATURE_TRUTH` + `3D_OWNER_VISUAL_ACCEPTANCE = PASS`. One sentence only, §7.2 |
| L-16 | Instagram and Facebook | **hidden** | lab guards 12/12, edge v2; **0 provider calls**, legal pages not public, reviewer tenant inactive | `META_LAB_TEST_RELEASE` + one real provider run per permission. **Deviation from C2 noted in §10** |
| L-17 | Campaign leads (Meta Lead Ads, Google Lead Forms) | **hidden** | intake built and tested internally, no provider run | one real provider run |
| L-18 | HubSpot, Pipedrive, Zoho, Salesforce | **hidden** | mapping certificates only; no real OAuth connection | `PRODUCT_TRUTH_TABLE_v1` proves a real read and write |
| L-19 | Outlook and Microsoft 365 | **hidden** | fetch 6/6 on staging, no prod path, no reply path | `PRODUCT_TRUTH_TABLE_v1` question B |
| L-20 | A copy of your leads in your own Google Sheet | **hidden** | staging only; the notice text is corrected but unreviewed | one real agency connection + counsel on the notice |
| L-21 | Employees run tasks by voice message | **hidden** | relay 8/8 and Whisper 13/13 on staging, task id required | outside the pilot proposal (R31) |
| L-22 | Instant or numeric response speed | **never** | no measurement exists | none. This claim is not available at any evidence level |
| L-23 | Hot lead alerts | **never** | matrix D-10 | none |

**Reading rule for the implementer:** build the page from rows marked `live` plus the two
`on request` sentences in §7.2. Rows marked `hidden` have no string, no card, no icon, no menu entry
and no FAQ answer that implies they exist. `PRODUCT_FAQ_KB_v1.md` holds the honest answer for the
visitor who asks about a hidden row.

---

## 2. Strings that must return zero matches

The Reviewer greps the rendered HTML of both locales. Each of these is rendered today.

| # | String | Where it is today | Why |
|---|---|---|---|
| S-01 | `Most agencies start here` | `packages.recommended` | invented popularity (Z04) |
| S-02 | `La mayoría empieza aquí` | ES equivalent | same |
| S-03 | `never need another one` / ES equivalent | `en.ts:492` / `es.ts:481` | invented durability (Z04) |
| S-04 | `What is not ready yet` | `home.notReady.h2` | internal report on a sales page (Z06) |
| S-05 | `Certified internally` / `certificado por nuestra parte` | `product.certified`, `capabilities.ts:208` | internal vocabulary (Z06) |
| S-06 | `External gate pending` | `product.pending` | internal vocabulary (Z06) |
| S-07 | `puertas` in the sense of approval gates | `capabilities.ts:212,226`, `media-manifest.ts:111` | not Spanish for this (Z18) |
| S-08 | `doorways` / `puertas reales` | `capabilities.ts:301,308`, `media-manifest.ts:227` | describes the discontinued panorama product (Z15) |
| S-09 | `in development` / `en desarrollo` | `home.stack.cards.answer.line`, `home.brand.note`, `platform.tenant.body` | status formula (Z07, Z08) |
| S-10 | `being built` / `se está construyendo` | `home.stack.cards.advance.line`, `home.picture.legend` | status formula |
| S-11 | `Catalog code` / `Código de catálogo` | `packages.catalogCode` | internal code (Z06) |
| S-12 | `test environment` / `entorno de pruebas` on a public page | `packages.tiersLead` | internal (Z06). The environment band on a preview build is not this |
| S-13 | `catorce días` | `legal.ts:110` | must read `14 días` (Z18) |
| S-14 | `Universal CRM` | `nav.stageLines.understand` | unproven universality (Z07) |
| S-15 | `Thursday morning or afternoon both work` and the ES equivalent | `home.views.conversation.turns[1]` | offers calendar time we do not hold (Z05) |
| S-16 | `browser` / `navegador` in a promise about entitlements | `trial.honesty.lines`, `terms` section "What the browser never does" | governance explanation, not customer copy (Z06) |
| S-17 | `checkout` | anywhere public | there is no online payment path |
| S-18 | `hot lead`, `Score`, `/100` | anywhere | D-10 and the live-site hotfix |
| S-19 | `Every enquiry gets an answer` / `Cada consulta recibe respuesta` | `capabilities.ts:68` | absolute (B-14); the ES form is one of the ten strings being removed from the old live site (§6.1) |
| S-20 | `Every message, from every channel` / `Cada mensaje, de cada canal` | `capabilities.ts:130` | universality claim on a capability that is not offered (Z07, §6.1) |
| S-21 | `on every enquiry` / `en cada consulta` | `capabilities.ts:101` | absolute (B-14, §6.1) |

---

## 3. Home page, keyed delta

### 3.1 Hero

| Key | EN | ES |
|---|---|---|
| `home.hero.eyebrow` | For real estate agencies in Spain | Para agencias inmobiliarias en España |
| `home.hero.h1` | No enquiry waits until Monday | Ninguna consulta espera al lunes |
| `home.hero.lead` | A buyer writes on Sunday evening. Nuova answers in their language, records the enquiry with a priority, and leaves your team one clear task. | Un comprador escribe un domingo por la noche. Nuova responde en su idioma, registra la consulta con una prioridad y deja a tu equipo una tarea clara. |
| `home.hero.qualifier` | On the channels you connect. | En los canales que conectes. |
| `home.hero.note` | 14 days free. No payment. | 14 días gratis. Sin pago. |
| `home.hero.ctaPrimary` | Start free | Empieza gratis |
| `home.hero.ctaSecondary` | See how it works | Mira cómo funciona |

The h1 is three lines by intent on mobile: **No enquiry / waits until / Monday** ·
**Ninguna consulta / espera / al lunes**. Budgets in §9.

### 3.2 The three everyday pains (replaces `home.problem`)

| Key | EN | ES |
|---|---|---|
| `home.problem.h2` | The enquiry arrives at the worst moment | La consulta llega en el peor momento |
| `home.problem.items[0]` | You are at a viewing when it lands. | Estás en una visita cuando entra. |
| `home.problem.items[1]` | It waits until the evening. By then they have written to another agency. | Espera hasta la noche. A esa hora ya han escrito a otra agencia. |
| `home.problem.items[2]` | Monday starts with a full inbox and no order to it. | El lunes empieza con la bandeja llena y sin ningún orden. |
| `home.problem.close` | None of that is a discipline problem. There is simply nobody free at 21:40 on a Sunday. | Nada de eso es un problema de disciplina. Simplemente no hay nadie libre un domingo a las 21:40. |

`home.problem.lead`, `.detail` and `.more` are removed: three short lines carry it, and the
disclosure of four places and three tools was our own inventory, not the agency's.

### 3.3 What happens instead (replaces `home.stack`)

| Key | EN | ES |
|---|---|---|
| `home.stack.eyebrow` | What Nuova does | Qué hace Nuova |
| `home.stack.h2` | From a message to a task | De un mensaje a una tarea |
| `home.stack.lead` | The enquiry is answered in the customer's language. It becomes one record with what they are looking for, a qualification and a priority. A viewing request becomes a task your team can see. | La consulta se responde en el idioma del cliente. Pasa a ser una ficha con lo que busca, una cualificación y una prioridad. Una petición de visita pasa a ser una tarea que tu equipo ve. |
| `home.stack.steps` | Answered · Recorded · Prioritised · Task for your team | Respondida · Registrada · Priorizada · Tarea para tu equipo |
| `home.stack.stepsDetail` | The reply says an assistant wrote it. It does not commit your agency to a price, a date or a condition. | La respuesta indica que la ha redactado un asistente. No compromete a tu agencia a ningún precio, fecha ni condición. |

**The four cards, rewritten.** Two are removed, none gains a status formula.

| Key | EN | ES |
|---|---|---|
| `cards.answer.title` | WhatsApp and e-mail | WhatsApp y email |
| `cards.answer.line` | Text enquiries are answered and recorded under your agency's name. | Las consultas de texto se responden y se registran con el nombre de tu agencia. |
| `cards.understand.title` | One record, one priority | Una ficha, una prioridad |
| `cards.understand.line` | Every enquiry is recorded with the conversation, what the person wants and a priority, so your team starts with the most promising ones. | Cada consulta queda registrada con la conversación, lo que la persona quiere y una prioridad, para que tu equipo empiece por las más prometedoras. |
| `cards.understand.qualifier` | Cold, warm or hot. No score to interpret. | Fría, templada o caliente. Sin puntuación que interpretar. |
| `cards.handover.title` | One clear task, not a reminder | Una tarea clara, no un recordatorio |
| `cards.handover.line` | A viewing request becomes a task with a name, a reason and an owner. Your team claims it and completes it. | Una petición de visita pasa a ser una tarea con nombre, motivo y responsable. Tu equipo la toma y la completa. |
| `cards.setup.title` | Your agency, set up by you | Tu agencia, configurada por ti |
| `cards.setup.line` | Your details, your hours, your team and your roles. Your progress is saved between sessions. | Tus datos, tu horario, tu equipo y sus roles. Tu progreso se guarda entre sesiones. |

`cards.advance` (property matching) and `cards.attract` (campaign leads) are **removed**: L-11 and
L-17 are hidden.

### 3.4 Removals on the home page

| Key | Action | Reason |
|---|---|---|
| `home.notReady` (whole block) | remove | Z06. A customer does not read our defect list on the way to a trial |
| `home.brand` | remove until L-12 has its gate | no real branded mail has been sent |
| `home.picture.nodes`, `.nextFrom`, `.legend`, `.pathLabel` | remove | Z12: a diagram that looks like live data, with a legend that grades our own build |
| `home.picture.h2` / `.lead` | keep, shortened (below) | the one-system idea is true and worth one short block |
| `product.certified`, `product.pending` | remove the labels | S-05, S-06 |

| Key | EN | ES |
|---|---|---|
| `home.picture.h2` | One enquiry, one memory, one place | Una consulta, una memoria, un solo lugar |
| `home.picture.lead` | Nuova sits underneath the agency rather than beside it. Nothing is handed between tools, and nothing has to be kept in someone's head. | Nuova está debajo de la agencia, no al lado. Nada se pasa de una herramienta a otra y nada tiene que quedarse en la cabeza de nadie. |

### 3.5 Closing

| Key | EN | ES |
|---|---|---|
| `home.closing.h2` | Your next enquiry is already on its way | Tu próxima consulta ya está en camino |
| `home.closing.body` | The only question is what happens to it. | La única pregunta es qué pasa con ella. |
| `home.closing.ctaPrimary` | Start free | Empieza gratis |
| `home.closing.ctaSecondary` | Request a demo | Solicitar una demo |

---

## 4. The demo story: one person, one property, four surfaces

One fictional person (**Laura M.**), one fictional property (**a two bedroom flat in Estepona**),
carried through every surface without changing a detail. Every surface keeps the label "Example with
synthetic data" / "Ejemplo con datos sintéticos".

### 4.1 Surface 1 — the enquiry

| Key | EN | ES |
|---|---|---|
| `cards.enquiry.channel` | WhatsApp · new enquiry | WhatsApp · consulta nueva |
| `cards.enquiry.time` | Sunday 21:40 | domingo 21:40 |
| `cards.enquiry.text` | Hello, I am Laura. Is the two bedroom flat in Estepona still available? We are in Manchester and could come on Thursday. | Hola, soy Laura. ¿Sigue disponible el piso de dos dormitorios en Estepona? Estamos en Manchester y podríamos ir el jueves. |
| `cards.enquiry.from` | Laura M. | Laura M. |

She introduces herself, so the reply may use her name (Z05).

### 4.2 Surface 2 — the answer, with the disclosure

The ES answer opens with the **owner-approved WhatsApp disclosure text v1.0-es verbatim**. The EN
answer carries a marked sample translation, because no English disclosure is approved.

| Key | EN | ES |
|---|---|---|
| `cards.answer.label` | Answered by Nuova, under your agency's name | Respondido por Nuova, con el nombre de tu agencia |
| `cards.answer.time` | Sunday 21:40 | domingo 21:40 |
| `cards.answer.disclosure` | I am an AI assistant. I will help you with your property enquiry. If you prefer to speak to a human agent, tell me at any time. *(sample translation, marked)* | 🤖 Soy un asistente de inteligencia artificial. Te ayudaré con tu consulta inmobiliaria. Si prefieres hablar con un agente humano, indícamelo en cualquier momento. |
| `cards.answer.text` | Hello Laura, yes, the flat is still available. I have noted Thursday. An agent from the agency will contact you to confirm the time. | Hola Laura, sí, el piso sigue disponible. He anotado el jueves. Un agente de la agencia se pondrá en contacto contigo para confirmar la hora. |
| `cards.answer.disclosureNote` | The reply carries this notice because an assistant wrote it. | La respuesta lleva este aviso porque la ha redactado un asistente. |

Three constraints on this card, all load-bearing:

1. **No calendar time is offered.** "Thursday works", "morning or afternoon both work" and every
   variant are out. The wish is recorded; a person confirms (S-15).
2. **"An agent will contact you" is allowed here only because surface 4 shows the task.** If the
   implementer drops surface 4, this sentence must drop with it (R36).
3. The ES disclosure string is **quoted, not edited**. It is the approved text. Any change to it is
   an owner and counsel matter, not a copy edit. Note for the record: the approved **e-mail** text
   of the same version names NuovaSolution rather than the agency, so it is not used in an
   agency-branded example (see §10, open item 4).

### 4.3 Surface 3 — the customer record

| Key | EN | ES |
|---|---|---|
| `cards.record.label` | Customer record | Ficha del cliente |
| `cards.record.name` | Laura M. | Laura M. |
| `cards.record.summary` | Buyer · 2 bedrooms · Estepona · viewing requested | Compradora · 2 dormitorios · Estepona · visita solicitada |
| `cards.record.priority` | Priority: high | Prioridad: alta |
| `cards.record.qualificationLabel` / `qualification` | Qualification / Qualified, ready to view | Cualificación / Cualificada, lista para visitar |
| `cards.record.nextLabel` / `next` | Next / Confirm Thursday with Laura | Siguiente / Confirmar el jueves con Laura |

No number, no score, no budget figure. The summary repeats the same criteria the enquiry stated.

### 4.4 Surface 4 — the task (new surface, needed)

This surface does not exist in the build yet. It is the one the implementer must add, because it is
both the strongest proven capability (L-04, owner-proven in production) and the condition for the
contact promise on surface 2.

| Key | EN | ES |
|---|---|---|
| `cards.task.label` | Your team's tasks, today | Las tareas de tu equipo, hoy |
| `cards.task.title` | Confirm Thursday's viewing with Laura M. | Confirmar con Laura M. la visita del jueves |
| `cards.task.reason` | Reason: viewing requested, Estepona, 2 bedrooms | Motivo: visita solicitada, Estepona, 2 dormitorios |
| `cards.task.state` | Open · nobody has claimed it yet | Abierta · nadie la ha tomado todavía |
| `cards.task.action` | Claim | Tomar |
| `cards.task.note` | A request is not an appointment. The task exists so a person confirms the time. | Una petición no es una cita. La tarea existe para que una persona confirme la hora. |

### 4.5 Product views: what each shot must show

Captions are copy; the shots are the implementer's, from the staging build. Each caption sits under
its image. No shot may contain a real agency name, a real person, a real phone number or a score.

| View | Caption EN | Caption ES | The shot must show |
|---|---|---|---|
| CRM board | Every enquiry as one record, ordered by priority. | Cada consulta como una ficha, ordenada por prioridad. | the lead list with qualification and priority, synthetic names |
| Reply with disclosure | The reply that goes out, with the notice it must carry. | La respuesta que sale, con el aviso que debe llevar. | one outgoing message including the ES disclosure line |
| Daily tasks | What your team does first, and why. | Qué hace tu equipo primero, y por qué. | the task from §4.4 in the board, claimable |
| Onboarding | You set your agency up yourself, one step at a time. | Configuras tu agencia tú mismo, paso a paso. | an onboarding step with saved progress visible |

---

## 5. Packages and trial

### 5.1 The trial, two versions

**Interim, valid today** (trial plan is not Essential yet, `BILLING-TRIAL-VS-ESSENTIAL-1`):

| Key | EN | ES |
|---|---|---|
| `packages.h1` | Start with 14 days of trial | Empieza con 14 días de prueba |
| `packages.lead` | 14 days, no payment method. After that you choose a plan with us, and we tell you the price for your agency before anything is agreed. | 14 días, sin método de pago. Después eliges un plan con nosotros y te decimos el precio para tu agencia antes de acordar nada. |
| `packages.trialBadge` | 14 days of trial | 14 días de prueba |

**After API reports `TRIAL_PLAN_ALIGNED`**, and only then, the badge and the CTA move to Essential:

| Key | EN | ES |
|---|---|---|
| `packages.h1` | Try Essential free for 14 days | Prueba Essential gratis 14 días |
| `packages.trialBadge` | 14 days free, Essential | 14 días gratis, Essential |
| `packages.ctaTrial` | Try Essential free | Prueba Essential gratis |

Growth and Scale never carry a trial CTA:

| Key | EN | ES |
|---|---|---|
| `packages.ctaProposal` | Request a proposal | Solicita una propuesta |
| `packages.proposalLine` | Tell us your offices, your team and your channels, and we send you a proposal. | Cuéntanos tus oficinas, tu equipo y tus canales y te enviamos una propuesta. |

### 5.2 Paying, in four separated steps

The four steps stay four, and the fourth is not the third.

| Key | EN | ES |
|---|---|---|
| `packages.payH2` | An invoice, paid by bank transfer | Una factura, pagada por transferencia |
| `paySteps[0]` | **You request the plan.** You tell us which plan you want. | **Solicitas el plan.** Nos dices qué plan quieres. |
| `paySteps[1]` | **We issue the invoice.** It states the amount and the bank details. | **Emitimos la factura.** Indica el importe y los datos bancarios. |
| `paySteps[2]` | **You transfer the amount.** From your own bank, whenever you choose. | **Haces la transferencia.** Desde tu banco, cuando tú decidas. |
| `paySteps[3]` | **We confirm the payment and activate the plan.** A person checks that the amount arrived. | **Confirmamos el pago y activamos el plan.** Una persona comprueba que el importe ha llegado. |
| `packages.payNote` | An issued invoice does not activate anything. The confirmed payment does. There is no card payment on this site and no automatic renewal. | Una factura emitida no activa nada. Lo hace el pago confirmado. En este sitio no se paga con tarjeta y no hay renovación automática. |

### 5.3 Removals and replacements in packages

| Key | Action |
|---|---|
| `packages.recommended` | **remove** (S-01/S-02). If a fit line is wanted later, it must come from confirmed plan limits, for example seats, and name them |
| `packages.catalogCode`, `.catalogNote`, `.catalogSource` | remove (S-11) |
| `packages.tiersLead` | replace: EN "What each plan includes, read from the plan catalogue." · ES "Qué incluye cada plan, según el catálogo de planes." |
| `packages.baselineLine` | replace: EN "Every plan includes the CRM, the replies, the qualification and the tasks." · ES "Todos los planes incluyen el CRM, las respuestas, la cualificación y las tareas." |
| `packages.notAvailable`, `.stubNote`, `.plansAwaiting` | keep for test builds only; they must not render on the public build |
| `packages.featureNames["lead.engine.orchestrate"]`, `["channel.voice"]`, `["feed.structured"]`, `["reporting.advanced"]` | hidden rows: a plan may not list a feature the register hides. If the catalogue returns them, the implementer filters them out and tells API |
| `packages.faq` | keep all four, with the third answer corrected: EN "No. You can start on your own. A demo is optional." stays; the second becomes "Not on this site. We send an invoice and you pay by bank transfer." |
| `trial.honesty` | **remove** (S-16). The truthful part of it, that days remaining come from the service, is not a selling point and not a customer concern |
| `trial.steps` CRM step | keep as written: it is accurate and honest about the included CRM |
| `trial.steps` Property Experience step | replace with the §7.2 sentence |

---

## 6. Platform and capability pages

The status vocabulary disappears from the public surface. `capabilities.ts` keeps its internal
statuses as **data for the register**; the page renders only what §1 allows.

| Internal status today | Rendered as |
|---|---|
| `live` | the capability, described in the present tense |
| `final_acceptance` | the capability, described in the present tense, once its gate in §1 is reported |
| `in_implementation` | **nothing** |
| `certified_gate_pending` | **nothing**, except Voice and 3D, which get their one sentence in §7.2 |
| `premium_on_request` | the one sentence in §7.2 |

### 6.1 Product page headlines: the absolutes come out

Three headlines claim more than the register carries, and one of them is a string the old live site is
being cleaned of. Rewritten so that **the claim carries its own boundary**, which also ends the class of
defect that WR-33 and WR-34 describe: a sentence that needs a qualifier standing somewhere else on the
page.

| Location | Today | EN | ES |
|---|---|---|---|
| `capabilities.ts:68` AI Sales Agent | "Every enquiry gets an answer, and the conversation carries on." / "Cada consulta recibe respuesta, y la conversación sigue." | Your text enquiries are answered on the channels you connect. | Tus consultas de texto se responden en los canales que conectes. |
| `capabilities.ts:101` Lead Intelligence | "One customer, one record, and a clear priority on every enquiry." | One customer, one record, one clear priority. | Un cliente, una ficha, una prioridad clara. |
| `capabilities.ts:130` CRM | "Every message, from every channel, on one record." | The messages from your connected channels, on one record. | Los mensajes de tus canales conectados, en una sola ficha. |
| `capabilities.ts:199` Daily Assistant | "Your agents stop administering the pipeline." | unchanged | unchanged |

Why these three and not a general pass: "every" and "cada" are absolutes the matrix does not allow
(B-14), the CRM headline made a universality claim while its own capability is not offered (Z07), and
"Cada consulta recibe respuesta" is one of the ten literal strings being removed from the old live site
under `OLD_LIVE_SITE_HOTFIX_COPY_v2.md`. It should not survive on the new one.

**On WR-33 and WR-34, reported open by the Reviewer on 2026-09-28.** By the code at `e39ad06` both
claims do carry a qualifier in place, so I am not changing the placement:

- Home hero: the qualifier renders directly under the lead at
  [app/[locale]/page.tsx:47](app/[locale]/page.tsx#L47), from `home.hero.qualifier`
  ([en.ts:137](lib/i18n/dictionaries/en.ts#L137) "Based on the channels you connect and the permissions
  you hold." · [es.ts:130](lib/i18n/dictionaries/es.ts#L130) "Según los canales que conectes y los
  permisos que tengas."). The sentence the review searched for, `common.qualifiers.q2`, is **not** the
  hero's qualifier: `PRODUCT_TEXTS_C3_v1.md` gave the hero a channel-specific one, because the hero
  claim is about channels.
- Product pages: `q2` renders unconditionally under the lead at
  [app/[locale]/platform/[slug]/page.tsx:53](app/[locale]/platform/[slug]/page.tsx#L53). The occurrence
  measured at y 2086 is the **second** one, at line 136, where it appears as "Example. " plus `q2`.

So the measurement and the code disagree, and I cannot resolve the Reviewer's DOM probe from here. The
headline rewrites above make the question moot for these pages, and the open item is handed back for a
re-check against the strings that are actually rendered, not against the superseded Q-2 literal.

Two capability pages need their own text change beyond deletion:

**Voice** (`capabilities.ts:208–226`): the h1 "Voice: certified on our side, waiting on the gates"
and the ES version with "puertas" are replaced by §7.2's single sentence. The page keeps no status
paragraph.

**Property Experience 3D** (`capabilities.ts:301–308`): "Room by room, through the real doorways" /
"por las puertas reales" describes the panorama product that was discontinued on 2026-09-08. Until
the 3D lane delivers `3D_FEATURE_TRUTH`, the page carries only §7.2's sentence. When the feature
list arrives, the text describes exactly the viewer that exists: floors, tapping a room, switching
furniture and surroundings. Virtual furniture is labelled as virtual.

---

## 7. Navigation, CTAs, the two on-request sentences

### 7.1 Navigation and CTA

| Key | EN | ES | Note |
|---|---|---|---|
| `nav.stageLines.understand` | Lead Intelligence, CRM | Lead Intelligence, CRM | "Universal CRM" removed (S-14) |
| `nav.stageLines.advance` | Property Experience, on request | Property Experience, a petición | L-11 hidden, L-15 on request |
| `nav.stageLines.attract` | *(entry removed)* | *(entry removed)* | L-16, L-17 hidden |
| `nav.startFree` | Start free | Empieza gratis | must lead to a form that works (WR-32) |
| `contact.demoCta` | Request a demo | Solicitar una demo | until the Reviewer's test booking passes |
| `contact.demoCta` after `DEMO_PATH = PASS` | Book a demo | Reservar una demo | only then |

### 7.2 The two sentences for on-request modules

Exactly one sentence each, nowhere else:

| Module | EN | ES |
|---|---|---|
| Voice | A phone assistant is part of the product and we show it on request. | El asistente telefónico forma parte del producto y lo mostramos a petición. |
| Property Experience 3D | A 3D walkthrough of a property, as a premium service on request. | Un recorrido 3D de una propiedad, como servicio premium a petición. |

Neither sentence says the module is running for agencies today, because it is not.

---

## 8. Spanish, checked line by line

| # | Location | Today | Correction |
|---|---|---|---|
| E-01 | `capabilities.ts:208,212,226` | "a la espera de las puertas", "las puertas del proveedor" | removed with the status paragraphs (§6) |
| E-02 | `media-manifest.ts:111` | "las puertas del proveedor" | remove the sentence; media notes are not customer copy |
| E-03 | `legal.ts:110` | "catorce días" | "14 días" (also in `LEGAL_PAGES_FINAL_v1.md` §3) |
| E-04 | `capabilities.ts:301,308` | "por las puertas reales" | §6 |
| E-05 | `home.hero.note` + the former caption | the payment promise twice on one page | once per page, in the hero note (already fixed in `AUTH_COPY_v1.md` for sign up) |
| E-06 | sign up + register | the language question twice | asked once, in the register step (`AUTH_COPY_v1.md` §1) |
| E-07 | `qa.contactOptional` | "Name, email or phone" | "Email o teléfono, si quieres que te responda una persona." Contact is e-mail or phone; the name is not needed to answer |
| E-08 | ES throughout | mixed address forms | **tú** to the agency owner on the site; the approved register per channel inside a simulated customer message: WhatsApp **tú**, form **usted**. A speaker's text and a channel's text are never merged |

The demo customer writes in Spanish as a private person and is answered in the WhatsApp register,
which the approved text sets. That is the only place where a customer voice appears on the site.

---

## 9. Layout budgets, for the implementer

Measured against the components at `e39ad06`:
[hero-stack.tsx](components/site/hero-stack.tsx), [stage-stack.tsx](components/site/stage-stack.tsx),
[product-views.tsx](components/site/product-views.tsx). Character counts include spaces and are the
**maximum**, so the longer of EN and ES has to fit.

| Slot | Budget | Longest text in §3 to §7 | Line intent |
|---|---|---|---|
| `home.hero.h1` | 34 | 30 (`Ninguna consulta espera al lunes`) | three lines at 390 px, two from 768 px |
| section `h2` | 46 | 42 (`La consulta llega en el peor momento`) | one line from 768 px, two allowed at 390 px |
| `lead` | 180 | 178 (ES hero lead) | three lines at 390 px |
| pain item | 80 | 74 | two lines at 390 px |
| card title | 34 | 31 | one line |
| card line | 150 | 148 | four lines at 390 px |
| step label | 22 | 20 (`Tarea para tu equipo`) | never wraps |
| CTA label | 22 | 20 (`Solicitar una demo`) | never wraps |
| chip or caption | 60 | 52 | one line |

**Rhythm.** The page alternates deliberately rather than stacking nine similar blocks: hero with the
three-card stack · three short pain lines, text only · the four-step line with the product views ·
one full-width product view (CRM board) · the one-system block, text only · packages with the
four-step payment path · a short FAQ · closing. No two adjacent sections use the same layout, and no
section repeats a sentence from its neighbour.

**What I could not check here.** Real line breaks, real mobile reading and the alternating rhythm can
only be judged on the rendered page. No preview URL exists yet (`WEBSITE_REVIEW_URL` not reported,
gate N7 not reached). The budgets above are derived from the components and the type scale, not from
a rendered screen. As soon as the preview exists, I check every slot against it and return the
deviations; that check is owed and is not claimed here.

---

## 10. Open items, with the responsible lane

| # | Item | Owner | Effect while open |
|---|---|---|---|
| 1 | `PRICING_AUTHORITY` | Owner | no amount anywhere; L-08 renders without figures |
| 2 | Legal entity, NIF, address | Owner | `LEGAL_PAGES_FINAL_v1.md` carries marked placeholders |
| 3 | `PRODUCT_TRUTH_TABLE_v1` | API | L-18, L-19, L-20 stay hidden; no provider sentence is written |
| 4 | **The approved e-mail disclosure names NuovaSolution, not the agency.** `v1.0-es` e-mail reads "asistente de inteligencia artificial de NuovaSolution", while API's A1b expects the proof to show the **pilot agency's** legal name, which only `v1.1-es` produces, and `v1.1-es` is pending counsel | API + Owner + counsel | the website shows the WhatsApp text, never the e-mail text, in an agency-branded example. This is a contradiction inside the activation plan, not a copy problem, and it is reported to the Audit |
| 5 | Web channel disclosure not approved (A-W7) | counsel via Owner | L-13 hidden, the question box does not render publicly |
| 6 | `META_LEGAL_SECTIONS` as a lane signal | Social | the Meta sections in `LEGAL_PAGES_FINAL_v1.md` are written from Social's own content specification of 2026-09-23 §5 and need Social's confirmation |
| 7 | **Deviation, decided by the Audit:** C2 proposed Social as `on_request`. I set L-16 to `hidden`, because 0 provider calls exist and no demo can be shown without the lab release. Voice and 3D remain `on_request` as instructed | Audit | if the Audit rules otherwise, the sentence pattern of §7.2 is ready and one line is added |
| 8 | Preview URL for the layout check | Implementer | §9 is unverified against a rendered page |
