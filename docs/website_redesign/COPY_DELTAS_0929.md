# COPY DELTAS 0929 — string deltas against the rendered preview

**State:** `2026-09-29_CONVERGENCE_R2` · **Written:** 2026-09-29 · **Copy version:** `launch-v1.1`
**Lane:** Website Copy / Product Truth → **Website Implementer**, and **Reviewer** for the claim changes.
**Checked against:** the design preview at code `d475dec`,
`https://nuovasolution-design-preview-git-we-eeb43f-nuovasolajs-projects.vercel.app`, routes `/en`, `/es`,
`/en/packages`, `/es/packages`, `/en/contact`, `/en/trial`, `/en/platform/daily-assistant`, fetched
2026-09-29, text extracted in reading order. Every "before" below is the **rendered** string, not a
dictionary guess.
**Evidence base:** `PRODUCT_TRUTH_TABLE_v1.md`, `LEAD_TRUTH_INPUT_v1.md`,
`DAILY_FEATURE_TRUTH_2026-09-28_v1.md`, `3d/3D_FEATURE_TRUTH.md`, `social/META_LEGAL_SECTIONS_v1.md`,
`daily_media/MANIFEST.md`, all in `backend_handoff/handoff_in_2026-09-29/`.
**Status:** DRAFT by its author, not independently reviewed.

> Order of work: **§2 first** (hero and the journey), then **§3** (trial and plans), then §4. §5 is the
> media copy, §6 is what I found on the rendered pages, §7 lists what is still owed.

---

## 1. Register amendments — what the truth inputs changed

`LAUNCH_COPY_v1.md` §1 stands except for these five rows. Each one moved because a lane delivered a
reading, not because the wording was disliked.

| Row | Was | Is now | Why |
|---|---|---|---|
| L-03 | "one customer record with a **qualification** and a **priority**", live | **one record with what the customer asked for**, live. Qualification and priority are **not publishable** | `le_qualification` is **staging only, not present in production** (`LEAD_TRUTH_INPUT_v1` §1). No lane asserts a priority value in production. What production holds is `lead_memory` (preferences, budget, language, interaction count), `leads`, `contacts`, `dg_task`, `events`, `media_assets` |
| L-03b | *(new)* | **The record is per channel.** A customer writing by e-mail and later by WhatsApp is **two** records unless a key ties them | `LEAD_TRUTH_INPUT_v1` §3: "there is no automatic person merge across channels today", proven by construction, and explicitly "worth stating plainly" |
| L-04 | task, live, gated on `HANDOFF_PROMISE_RULE` | **live, and the strongest row we have**: take, complete, who took it, own list, two languages, state machine | `DAILY_FEATURE_TRUTH` rows 1 to 7, production, owner-tested. Rows 8, 10, 11, 12 are NO: no manager board, no hosted staff login, no chat, no voice for staff |
| L-07 | Essential wording only after `TRIAL_PLAN_ALIGNED` | **Essential wording released** for the 14 days | `PRODUCT_TRUTH_TABLE_v1` §G: "trial now carries the Essential scope for 14 days (2026-09-28)". Still staging, so the public launch keeps its `ONBOARDING_PROD_APPLIED` gate |
| L-14 | Voice "part of the product and we show it on request" | **narrower**: no production number exists and the legal gate routes every call to a human today | `PRODUCT_TRUTH_TABLE_v1` §D: no number in production, `voice_resolve_routing` answers `route = human`, `reason = language_not_legally_supported`, spoken notice not approved |

L-18 external CRMs and L-19 Outlook stay `hidden`, now with a named reason instead of a missing table:
externally **nothing is connected for a customer** (own sandbox rows from July, two writes unresolved, 0
inbound events processed), and Outlook is a **fetch path on staging only** with no send path at all.

---

## 2. Priority 1 — hero and one customer journey

### 2.1 The hero

| # | Route · key | Before (rendered) | After EN | After ES | Evidence |
|---|---|---|---|---|---|
| D-01 | `/` · `home.hero.lead` | "A buyer writes on Sunday evening. Nuova answers in their language, records the enquiry **with a priority**, and leaves your team one clear task." | A buyer writes on Sunday evening. Nuova answers in their language, records what she asked for, and leaves your team one task to finish. | Un comprador escribe un domingo por la noche. Nuova responde en su idioma, registra lo que ha pedido y deja a tu equipo una tarea que terminar. | L-03 |

`home.hero.h1`, `.eyebrow`, `.qualifier`, `.note` and both CTAs are unchanged: the hero already answers
who it is for, which problem, what Nuova does and what the next step is.

### 2.2 The one journey, four steps

The journey ends with a **person acting**, which is the part production proves best. Setup leaves the
journey (finding 3).

| # | Route · key | Before (rendered) | After EN | After ES | Evidence |
|---|---|---|---|---|---|
| D-02 | `/` · `home.stack.h2` | "From a message to a task" | From a message to a finished task | De un mensaje a una tarea terminada | finding 2: the old h2 appeared twice on the page |
| D-03 | `/` · `home.stack.lead` | "…It becomes one record with what they are looking for, **a qualification and a priority**. A viewing request becomes a task your team can see." | The enquiry is answered in the customer's language. It becomes one record with what they asked for. A viewing request becomes a task, and one of your people takes it and closes it. | La consulta se responde en el idioma del cliente. Pasa a ser una ficha con lo que ha pedido. Una petición de visita pasa a ser una tarea, y alguien de tu equipo la toma y la cierra. | L-03, `DAILY_FEATURE_TRUTH` rows 1 to 5 |
| D-04 | `/` · `home.stack.steps` | "Answered · Recorded · **Prioritised** · Task for your team" | Answered · Recorded · Handed over · Done | Respondida · Registrada · Asignada · Hecha | L-03, Daily row 4 (state machine `queued → routed → claimed → in_progress → completed`) |
| D-05 | `/` · step 2 label | "02 · Recorded and prioritised" | 02 · Recorded | 02 · Registrada | L-03 |
| D-06 | `/` · step 3 label | "03 · Task for your team" | 03 · Handed over | 03 · Asignada | — |
| D-07 | `/` · step 4 | "04 · Your setup" plus the whole setup card **inside the journey** | **remove from the journey.** Step 4 becomes: 04 · Done | 04 · Hecha | finding 3. Setup keeps its own section further down (`home.access`) |
| D-08 | `/` · new step 4 card `title` / `line` | *(new)* | **One of your people finishes it** · One tap takes the task, one tap completes it. The card shows who took it, and nobody can take the same task twice. | **Alguien de tu equipo la termina** · Un toque la toma, un toque la completa. La tarjeta muestra quién la ha tomado, y nadie puede tomar la misma tarea dos veces. | `DAILY_FEATURE_TRUTH` §2, sentences certified as safe by the Daily lane |

### 2.3 Laura: no confirmed availability, and one name across all surfaces

The demo person is now **Laura Serrano**, the reference **REF-DEMO-204**, and the wish **Thursday
morning**, because that is what the real Daily captures show on screen
(`daily_media/MANIFEST.md`, agreed with this lane under Z05). The site and the clip must not contradict
each other.

| # | Route · key | Before (rendered) | After EN | After ES | Evidence |
|---|---|---|---|---|---|
| D-09 | `/` · `hero.cards.enquiry.text` | "Hello, I am Laura. Is the two bedroom flat in Estepona still available? We are in Manchester and could come on Thursday." | Hello, I am Laura Serrano. Is the two bedroom flat in Estepona still free to view? We are in Manchester and could come on Thursday morning. | Hola, soy Laura Serrano. ¿Se puede ver el piso de dos dormitorios en Estepona? Estamos en Manchester y podríamos ir el jueves por la mañana. | MANIFEST demo story |
| D-10 | `/` · `hero.cards.answer.text` | "Hello Laura, **yes, the flat is still available.** I have noted Thursday. An agent from the agency will contact you to confirm the time." | Hello Laura, thank you for writing. I have noted the two bedroom flat in Estepona and Thursday morning. An agent from the agency will contact you to confirm availability and the time. | Hola Laura, gracias por escribir. He anotado el piso de dos dormitorios en Estepona y el jueves por la mañana. Un agente de la agencia se pondrá en contacto contigo para confirmar la disponibilidad y la hora. | finding 13. `PRODUCT_TRUTH_TABLE_v1` §A and §F: no property source is connected for a customer and property suggestions are off in the pilot, so **availability cannot be confirmed by the assistant**; `LEAD_TRUTH_INPUT_v1` §5: an appointment is never confirmed by the assistant |
| D-11 | `/` · `views.conversation.turns[2]` and `[3]` | "Thursday afternoon, please. We land at 13:00." / "Noted: Thursday afternoon. An agent from the agency will confirm the exact time with you." | Thursday morning would suit us. We land the evening before. / Noted: Thursday morning. An agent from the agency will confirm the time and the viewing with you. | El jueves por la mañana nos vendría bien. Llegamos la tarde anterior. / Anotado: el jueves por la mañana. Un agente de la agencia te confirmará la hora y la visita. | as D-09, D-10 |
| D-12 | `/` · `hero.cards.record.*` | "Priority: high" · "Qualification / Qualified, ready to view" · "Buyer · 2 bedrooms · Estepona · viewing requested" · "Next / Confirm Thursday with Laura" | **remove the priority chip and the qualification pair.** Record shows: "Laura Serrano" · "Asked for: 2 bedrooms, Estepona · REF-DEMO-204" · "Wants to view: Thursday morning" · "Writes in: English" · "Next: a task for your team" | "Laura Serrano" · "Pide: 2 dormitorios, Estepona · REF-DEMO-204" · "Quiere ver: el jueves por la mañana" · "Escribe en: inglés" · "Siguiente: una tarea para tu equipo" | L-03. `lead_memory` holds preferences, budget, language and the interaction count; it holds no qualification and no priority in production |
| D-13 | `/` · `views.leads.*` (the four row table) | each row "Qualification : …" plus a "High / Medium / Low" chip, footer "Every enquiry as one record, ordered by priority." | rows read "Asked for: …" and "Next: …"; the chips are **removed**; footer: "Synthetic data. One week of enquiries, each one as a record with what the customer asked for." | las filas dicen "Pide: …" y "Siguiente: …"; se eliminan las etiquetas; pie: "Datos sintéticos. Una semana de consultas, cada una como una ficha con lo que ha pedido el cliente." | L-03 |
| D-14 | `/` · `home.stack.cards.understand.title` / `.line` / `.qualifier` | "One record, one priority" · "Every enquiry is recorded with the conversation, what the person wants and a priority, so your team starts with the most promising ones." · "Cold, warm or hot. No score to interpret." | **One record per enquiry** · The conversation and what the customer asked for stay on one record, so the next person to open it sees everything without asking. · *(qualifier removed)* | **Una ficha por consulta** · La conversación y lo que ha pedido el cliente se quedan en una sola ficha, así que quien la abra después lo ve todo sin preguntar. | L-03. "Cold, warm or hot" is a qualification scale and is not in production |

### 2.4 Repetition and the duplicated blocks

| # | Route · section | Finding | Action |
|---|---|---|---|
| D-15 | `/` · "One enquiry, end to end" | the section repeats the h2 "From a message to a task" and shows the conversation a **third** time (hero, step 1, here) | **remove the section.** Findings 1 and 2 |
| D-16 | `/` · "One system" | the customer record card is rendered a **third** time here | remove the duplicated record card; the section keeps its heading and lead only | finding 1 |
| D-17 | `/` · readiness card "What is needed to go live" | rendered **twice**, identically, once in the journey and once under "Getting started" | keep it **once**, under "Getting started" | finding 1 |
| D-18 | `/` · `home.picture.h2` | "One enquiry, one memory, one place" | **One enquiry, one record, one place** · **Una consulta, una ficha, un solo lugar** | "one memory" reads as a memory across channels, which does not exist (L-03b) |
| D-19 | `/` · readiness card, disclosure row | "The notice that tells your customers an assistant is replying — **Done**" | state becomes **"We set this up with you" / "Lo preparamos contigo"** | the notice is ours to activate, not the agency's to tick; in production no notice is active today (`PRODUCT_TRUTH_TABLE_v1` §B) |

---

## 3. Priority 1 — trial, plans, paying

### 3.1 The trial belongs to Essential

| # | Route · key | Before (rendered) | After EN | After ES | Evidence |
|---|---|---|---|---|---|
| D-20 | `/packages` · `h1` | "Start with 14 days of trial" | Try Essential free for 14 days | Prueba Essential gratis 14 días | L-07 |
| D-21 | `/packages` · `lead` | "14 days, no payment method. After that you choose a plan with us, and we tell you the price for your agency before anything is agreed." | 14 days of Essential, free, with no payment method. After that you choose a plan with us, and we tell you the price and the billing period before anything is agreed. | 14 días de Essential, gratis y sin método de pago. Después eliges un plan con nosotros y te decimos el precio y el periodo de facturación antes de acordar nada. | L-07; finding 8 asks for a comparable period |
| D-22 | `/packages` · Essential card | trial chip sits **above all three plans**; Essential's CTA is "Request a proposal" | the chip **"14 days free · no payment method"** sits on the **Essential card only**; Essential's CTA becomes **"Try Essential free" / "Prueba Essential gratis"** | finding 7 | |
| D-23 | `/packages` · Growth and Scale cards | same trial chip applies to them by position | **no trial chip.** CTA stays "Request a proposal" / "Solicita una propuesta" | finding 7: Growth and Scale are not free to try | |
| D-24 | `/packages` · `trialLines[2]` | "Days left are shown from the server, never counted in your browser." / "Los días restantes se muestran desde el servidor, nunca se cuentan en tu navegador." | **remove** | finding 9: an internal implementation statement |

No sentence anywhere may say how long setting up takes. "Setup in five minutes" and every variant of it
stays out: no lane has measured it.

### 3.2 The plans differ in size, and the page says so

The three cards render the **same** feature list today, which reads like a copy defect but is the truth:
the entitlements that differ between Essential, Growth and Scale are the ones the register hides
(advanced reporting, Voice, structured feed, campaign intake). So the page explains the real difference
instead of faking a feature ladder.

| # | Route · key | Before (rendered) | After EN | After ES | Evidence |
|---|---|---|---|---|---|
| D-25 | `/packages` · `tiersLead` | "What each plan includes, read from the plan catalogue." | All three plans include the same working parts today. They differ in size: offices, seats and enquiries per month. | Hoy los tres planes incluyen las mismas partes en funcionamiento. Se diferencian en el tamaño: oficinas, puestos y consultas al mes. | `BILLING-TRIAL-VS-ESSENTIAL-1`; the differing entitlements are hidden rows |
| D-26 | `/packages` · `featureNames["lead.qualify"]` | "Qualification and priority on every enquiry" | What each customer asked for, kept on their record | Lo que ha pedido cada cliente, guardado en su ficha | L-03 |
| D-27 | `/packages` · `featureNames["channel.email"]` | "Gmail" | Email through Gmail | Email con Gmail | `PRODUCT_TRUTH_TABLE_v1` §B: Gmail is real, other providers are not. The word stays specific |
| D-28 | `/packages` · limits · `crm_connections` | "CRM connections · 1 / 3 / 10" | **do not render this limit** on the public page | — | `PRODUCT_TRUTH_TABLE_v1` §A: externally nothing is connected for a customer, 0 inbound events processed. A connection count would advertise an integration that has never run for an agency (finding 8) |
| D-29 | `/packages` · `amountLine` | "We tell you before anything is agreed." | We tell you the price and the billing period before anything is agreed. | Te decimos el precio y el periodo de facturación antes de acordar nada. | finding 8 |
| D-30 | `/packages` · `baselineLine` | "Every plan includes the CRM, the replies, the qualification and the tasks." | Every plan includes the replies, the record and the tasks. The CRM is included from the start. | Todos los planes incluyen las respuestas, la ficha y las tareas. El CRM está incluido desde el principio. | L-03, L-09 |

The invoice path (`paySteps` 1 to 4 and `payNote`) is correct as rendered and stays: request, invoice,
transfer, confirmed payment activates. Nothing about it moves to the marketing sections.

---

## 4. The remaining pages

| # | Route · key | Before (rendered) | After EN | After ES | Evidence |
|---|---|---|---|---|---|
| D-31 | `/contact` · `demoH2` | "Book a demo" while the button says "Request a demo" | Request a demo | Solicitar una demo | Z19: no authorised test booking has run. Heading and button now agree |
| D-32 | `/contact` · `demoBody` | "We show you Nuova running on a real enquiry, not a slide deck." | We walk you through the system on a real example and you can ask anything. No slide deck. | Te guiamos por el sistema con un ejemplo real y puedes preguntar lo que quieras. Sin presentación. | replies are held in production (`PRODUCT_TRUTH_TABLE_v1` §B), so a live run on a customer's enquiry cannot be promised, and a real customer's enquiry is not ours to show |
| D-33 | `/contact` · `whatsappH2`, `whatsappBody`, `whatsappCta`, `whatsappUnavailable` | "A direct WhatsApp line will appear here once the business number is configured." | **remove the whole block** | finding 10: a channel that does not exist is not a contact option, and the sentence explains our configuration to a customer | |
| D-34 | `/platform/daily-assistant` · `h1` | "Your agents stop administering the pipeline." | The request becomes a task somebody owns. | La petición pasa a ser una tarea con dueño. | `DAILY_FEATURE_TRUTH` row 1 |
| D-35 | `/platform/daily-assistant` · lead | "Daily Goals and the assistant tell your team what to do first, and why." | Every viewing request and every callback becomes a task with the customer, the property and the time they asked for. | Cada petición de visita y cada llamada pendiente pasa a ser una tarea con el cliente, el inmueble y la hora que ha pedido. | `DAILY_FEATURE_TRUTH` §2, certified safe by the Daily lane |
| D-36 | `/platform/daily-assistant` · scenario | "An agent starts the day and asks who to call first. **The assistant lists the leads whose priority rose overnight** and explains, for each one, what changed." | An agent opens the list, takes Laura Serrano's viewing task, and completes it once a person has agreed the time with her. The others see that it is taken, and by whom. | Un agente abre la lista, toma la tarea de la visita de Laura Serrano y la completa cuando una persona ha acordado la hora con ella. Los demás ven que está tomada y quién la ha tomado. | finding 12. `DAILY_FEATURE_TRUTH` row 11: a chat assistant is **NO in production**, staging only. Rows 3 to 5 are the proven behaviour |
| D-37 | nav · `stages.handover` label and `stageLines.handover` | "Daily Assistant" · "What to do first, and why" | **Daily Tasks** · The tasks your team takes and closes | **Tareas diarias** · Las tareas que tu equipo toma y cierra | `DAILY_FEATURE_TRUTH` §3.2: on the website "assistant" suggests a chat; the word must describe the task surface or go |
| D-38 | nav · `stageLines.understand` | "Lead Intelligence · Qualifies and prioritises each enquiry" and "CRM · One record per customer" | **Lead Intelligence** · Keeps what each customer told you · **CRM** · Leads, conversations and tasks in one place | **Lead Intelligence** · Guarda lo que te ha contado cada cliente · **CRM** · Leads, conversaciones y tareas en un solo lugar | L-03; `lead_memory` is the proven object (46 rows in production) |
| D-39 | `/platform/crm` · body | *(the page presents the record as one per customer)* | add one sentence: A customer who writes by e-mail and later on WhatsApp starts as two records until you link them. We would rather tell you that here than let you find it. | Un cliente que escribe por email y después por WhatsApp empieza como dos fichas hasta que las unes. Preferimos decírtelo aquí y no que lo descubras tú. | L-03b. This is the material limitation the assignment requires us not to hide |
| D-40 | footer · `brandLine` | "Nuova is the operating layer of a real estate agency. Built for the way agencies in Spain actually work." | Nuova answers your agency's enquiries and turns them into work your team can finish. Built for how agencies in Spain actually work. | Nuova responde a las consultas de tu agencia y las convierte en trabajo que tu equipo puede terminar. Hecho para la forma en que trabajan las agencias en España. | task 1: the abstract "operating layer" explanation goes. It was on every page |
| D-41 | footer · `placeholderNote` | "Legal pages are published as labelled placeholders pending counsel." | **remove** | finding 9, and it becomes false with `LEGAL_PAGES_FINAL v2` |
| D-42 | `/platform/property-experience` · all copy | the 3D page | Only these three sentences, and no others: An interactive 3D model of your property in the browser, built by us on request. · To scale from your plans; furniture and materials are illustrative. · Tap a room, choose a floor, switch the furnishing on and off. | Un modelo 3D interactivo de tu inmueble en el navegador, hecho por nosotros a petición. · A escala según tus planos; los muebles y los materiales son ilustrativos. · Toca una habitación, elige una planta, activa y desactiva el mobiliario. | `3D_FEATURE_TRUTH` §2. Forbidden by §3 of the same file: photorealistic, "with your furniture", first-person walkthrough, VR, instant result, self-service, upload your plan and get a model automatically, any price or delivery time, and any link to a public viewer |
| D-43 | `/platform/voice` · all copy | "Voice: certified on our side, waiting on the gates." and the status paragraph | One sentence: A phone assistant is in preparation. We walk you through it on request. | El asistente telefónico está en preparación. Te lo explicamos a petición. | L-14. There is no production number and the legal gate routes every call to a human today, so no demo of an AI-conducted call can be promised |
| D-44 | `/platform/ai-sales-agent` · status area | "Attachments, voice notes, Outlook …" style provider lists | photos, documents and attachments are **not named on the page at all**; Outlook is not named | — | `PRODUCT_TRUTH_TABLE_v1` §B: 0 real media runs with a customer; Outlook is staging fetch only with no send path. Both are hidden rows, and a hidden row gets no sentence, not even a soft one |

---

## 5. MEDIA_CAPTIONS

### 5.1 The Daily clip

Files `daily-claim-flow-{en,es}-{desktop,mobile}.mp4/.webm`, 21 seconds, **no sound**, poster
`daily-clip-poster-*`. The clip shows one real screen: the task list, then the agent takes Laura
Serrano's viewing task, then completes it. A soft blue ring marks each click; it is a recording aid.

| Slot | EN | ES |
|---|---|---|
| Section heading above the clip | One task, taken and closed | Una tarea, tomada y cerrada |
| Lead under the heading | 21 seconds from the real screen your team uses. No sound needed. | 21 segundos de la pantalla real que usa tu equipo. No hace falta sonido. |
| Poster overlay label | The task list your team works from | La lista de tareas con la que trabaja tu equipo |
| Caption under the clip | Recording from the product, with synthetic people and properties. The ring marks where the agent taps; it is part of the recording, not the product. | Grabación del producto, con personas e inmuebles sintéticos. El anillo marca dónde toca el agente; es parte de la grabación, no del producto. |

**Subtitles**, three cues, matched to the visible action rather than to a script:

| # | EN | ES |
|---|---|---|
| 1 | Laura Serrano asked for a viewing on Thursday morning. | Laura Serrano ha pedido una visita el jueves por la mañana. |
| 2 | The agent takes the task. The card now says it is theirs. | El agente toma la tarea. La tarjeta ya dice que es suya. |
| 3 | Done. It leaves the list, and the rest stays. | Hecha. Sale de la lista y el resto se queda. |

A fourth cue is available if the mobile cut runs longer: EN "A colleague already took the second one, so
there is no button on it." · ES "La segunda ya la ha tomado un compañero, así que no tiene botón."

### 5.2 Captions for the product stills

| File | EN | ES |
|---|---|---|
| `daily-tasks-*` | Each person sees their own list: taken, waiting, and what nobody has yet. | Cada persona ve su propia lista: tomadas, en espera y lo que todavía no tiene nadie. |
| `daily-task-action-*` | Taken by you. Only you can close it. | La has tomado tú. Solo tú puedes cerrarla. |
| `daily-task-done-*` | Closed. The task leaves the list. | Cerrada. La tarea sale de la lista. |
| `daily-task-card-*` | The customer, the property and the time they asked for, on one card. | El cliente, el inmueble y la hora que ha pedido, en una sola tarjeta. |

Every caption sits with the picture it describes, and each picture keeps the synthetic-data label. The
staff client is not linked from the site: there is no hosted address for it yet
(`DAILY_FEATURE_TRUTH` row 10), so no caption invites anyone to log in.

---

## 6. COPY_RENDERED_CHECK

What I read on the rendered previews on 2026-09-29, in reading order, EN and ES.

**Clean.** Nothing from the forbidden list of `LAUNCH_COPY_v1.md` §2 survives: no "Most agencies start
here", no "What is not ready yet", no "Certified internally", no "External gate pending", no "in
development", no "being built", no catalog code, no "never miss", no "hot lead", no score, no
"checkout", no "coming soon", no "puertas", no "catorce días". The ES disclosure in the hero is the
approved `v1.0-es` WhatsApp text, verbatim, including the robot glyph. The sample-translation label sits
with the English version. The four payment steps are in the right order and the note that an issued
invoice activates nothing is there. ES and EN are structurally identical, with no mixed language on a
page and no untranslated string.

**Not clean, and fixed above.** Priority and qualification are claimed in eleven places (D-12, D-13,
D-14, D-04, D-26, D-38). The h2 "From a message to a task" renders twice (D-02, D-15). The Laura
conversation renders three times and the customer record three times (D-15, D-16). The readiness card
renders twice, identically (D-17). The reply confirms availability (D-10). Setup is step 4 of the
customer journey (D-07). The Daily page describes a chat assistant (D-36). Contact offers a WhatsApp
line that does not exist (D-33). Two internal sentences remain, one in the packages trial list and one
in the footer (D-24, D-41). The footer explains an "operating layer" on every page (D-40).

**Rhythm, measured on the rendered text.** The home page runs 284 text blocks in EN and 282 in ES.
Three surfaces carry the whole story (conversation, record, task) and each appears two or three times,
which is why the page reads long rather than dense. The deltas above remove 5 blocks outright (D-07,
D-15, D-16, D-17, D-33) and shorten 14, without removing a single capability statement. What remains
alternates: hero with the stack, three pain lines as text, four steps each with one different surface,
one system block as text, setup, plans, short FAQ, close.

**What I still cannot judge.** Line breaks, the real mobile reading and whether the layers read as
depth are visual, and I read text. The implementer's own screenshot set and scroll video, plus the
owner's T5 judgement, decide that. Two measurable things I can name: `home.hero.h1` is 30 characters in
ES and 27 in EN, so the three-line intent holds; and the longest single card line after these deltas is
148 characters (D-14 ES), which is four lines at 390 px.

---

## 7. Still owed, by whom

| # | Item | Who | What it blocks |
|---|---|---|---|
| 1 | Whether a priority or qualification value exists in **production** at all, and under which name | Lead | if it does, D-04, D-12, D-13, D-14 and D-26 can be reopened as a real claim. Until then, no |
| 2 | The billing period of each plan from the catalogue | API | D-29 states there is a period; the period itself cannot be named yet |
| 3 | Whether the catalogue's lead caps (750 / 3000 / no cap) are the real commercial limits or staging placeholders | API | they render today as hard numbers. If they are placeholders, they are invented numbers on a public page |
| 4 | Amounts | Owner (`PRICING_AUTHORITY`, O-7) | every price slot |
| 5 | Gmail signature: does a signature block exist at all | Hosting | any sentence about signatures. Today none is written |
| 6 | The Cal.com event profile shows a personal name, not the brand | Owner, in the calendar tool | finding 15. Not a code change and not a copy change |
| 7 | A hosted address for the staff client, and that origin on the auth allow list | Hosting + API | any mention of staff logging in (`DAILY_FEATURE_TRUTH` row 10) |
| 8 | `HOSTING_TRUTH_INPUT` (which n8n node reads which onboarding setting) | Hosting | any claim that a setting the agency enters steers behaviour. The onboarding page describes entering settings, not their effect, which is currently correct |
