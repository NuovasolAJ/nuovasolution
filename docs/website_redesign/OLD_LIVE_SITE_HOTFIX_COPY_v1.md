# OLD LIVE SITE HOTFIX COPY v1 — minimal true replacements for nuovasolution.com (WR-03)

> **Superseded by `OLD_LIVE_SITE_HOTFIX_COPY_v2.md` (2026-09-23).** v1 missed 13 claims that are
> actually rendered on the live site (Reviewer TSV `review_2026-09-22/hotfix-uncovered-keys-9943660.tsv`).
> v2 is complete and standalone. Do not implement from this file.

**State:** `2026-09-22_SYNC_0900Z` · **Written:** 2026-09-22 · **Copy version:** `oldsite-fix-v1`
**Lane:** Website Copy / Product Truth / Director → **Website Implementer** (text only PR against
`main` @ `9943660`, if the owner chooses that route) · Reviewer verifies the deployed result
**Status:** DRAFT by its author, not independently reviewed.

> The public site today is the pre-redesign site (`REVIEW_2026-09-21.md` §5, WR-03). It publishes
> claims `CLAIMS_MATRIX.md` rejects. These are the smallest text changes that make each statement
> true today. **Nothing is removed from the product's scope**: a capability that exists but is not
> live in prod is kept and retensed; only false statements of fact are replaced.

Owner decision this serves: `WEBSITE_LIVE_CLAIM_FIX`. Options: (a) this text only hotfix on `main`,
reviewed and deployed on its own; (b) replace the old site with the reviewed rebuild. This file
makes (a) possible without waiting for (b). **Recommendation: (a) now**, because the rebuild is not
accepted yet (re-review pending) and the false claims are public today.

---

## 1. Rules applied

- No absolute "every" without its qualifier (B-04, B-14): replacements say "enquiries", not "every enquiry".
- Speed: only the qualitative form `CLAIMS_MATRIX.md` B-05 approves ("in seconds, not hours"). No
  figure (B-06). One measured prod data point exists (24 s on WhatsApp, one owner test); that is not
  a promise.
- Priority: "priority" wording per D-03 and D-05; **no scale, no threshold** (D-04).
- No hot lead alert statement (D-10). A viewing request becoming a task is evidenced in prod (task
  `32711087…`), so it replaces the alert where the page shows "what reaches the team".
- No automatic follow up claim: no follow up is sent in prod and E-01 is legally held. The
  capability is kept as a name with its real status ("in preparation").
- CRM: leads are recorded in Nuova; no CRM sync is claimed (F-08).
- Setup: no "no setup" (O-09); the old site's primary action is a demo, and today NuovaSolution
  sets agencies up with them.
- Trial: the owner's decision in force is a free 14 day trial without payment method
  (`CLAIMS_MATRIX.md` T-01, T-01b), but **self sign up is not live**. So the old site may say the
  trial is being prepared, and its buttons must say what they actually do (book a demo). No price,
  no new plan.
- Simulation: the `/live-demo` page runs local heuristics in the browser, no AI, no backend
  (`CURRENT_SITE_AUDIT.md` §9). It gets a disclosure **before** interaction (S-02) and loses the
  "real time", "AI Analysis" and "CRM updated" claims.
- Old site register (tú in Spanish) is kept.

## 2. Replacements in `translations/en.ts` and `translations/es.ts`

Only keys that contain a rejected claim. Keys marked † belong to components that no page imports
(chat-demo, demo-flow, speed-compare, lead-lost, trust-strip); their strings still ship in the
JavaScript bundle, so they are replaced too. Deleting those components is an equally valid fix.

### 2.1 Speed

| Key | EN new | ES new |
|---|---|---|
| `hero.headline.line1` | Reply in seconds, not hours | Responde en segundos, no en horas |
| `hero.feature.1.title` | Reply automatically | Responde automáticamente |
| `hero.feature.1.desc` | Text enquiries on WhatsApp and email get an automatic reply | Las consultas de texto por WhatsApp y email reciben una respuesta automática |
| `hero.feature.2.desc` | See who wants to buy, rent or sell | Ve quién quiere comprar, alquilar o vender |
| `hero.feature.3.desc` | Enquiries are recorded and answered | Las consultas se registran y se responden |
| `hero.chat.replied` | Replied automatically | Respondido automáticamente |
| `always.sub` | Replies automatically and keeps each conversation on one record | Responde automáticamente y mantiene cada conversación en una sola ficha |
| `always.row2` | Reply sent automatically | Respuesta enviada automáticamente |
| `always.step.5` | Automatic reply | Respuesta automática |
| `always.time.2` | Automatic | Automático |
| `always.left.3.desc2` | Evaluated automatically | Evaluado automáticamente |
| `strip.item1.label` † | Replies automatically | Responde automáticamente |
| `strip.item1.desc` † | Text enquiries get an automatic reply, day or night. | Las consultas de texto reciben una respuesta automática, de día o de noche. |
| `scenarios.s1.title` | The system replies automatically and collects what matters | El sistema responde automáticamente y recoge lo importante |
| `scenarios.s3.title` | You see which leads are worth your time | Ves qué clientes valen la pena |
| `intel.headline` | Know which leads are worth your time | Sabe qué clientes valen tu tiempo |
| `cta.process.2` | Replies start automatically | Las respuestas empiezan automáticamente |
| `faq.q2.a` | It is answered automatically, qualified and given a priority. | Se responde automáticamente, se cualifica y recibe una prioridad. |
| `demo.label` † | Demo (simulation) | Demo (simulación) |
| `demo.heading` † | See the steps, in a simulation | Mira los pasos, en una simulación |
| `demo.reply.speed` † | Automatic reply | Respuesta automática |
| `demo.reply.status` † | Lead answered | Consulta respondida |
| `speed.note` † | A reply in seconds, not hours. | Una respuesta en segundos, no en horas. |
| `speed.fast.t2` † | Seconds | Segundos |
| `speed.fast.t3`, `speed.fast.t4` † | Automatic | Automático |
| `speed.fast.l2` † | Reply sent automatically | Respuesta enviada automáticamente |

`always.time.3` ("Seconds" / "Segundos") stays: it is qualitative.

### 2.2 Score and priority

| Key | EN new | ES new |
|---|---|---|
| `intel.sub` | Leads are answered, qualified and given a priority, so you can focus on the most promising ones | Las consultas se responden, se cualifican y reciben una prioridad, para que te centres en las más prometedoras |
| `intel.build.title` | The system builds a clear priority step by step | El sistema construye una prioridad clara paso a paso |
| `intel.score.note` | As more information comes in, the priority updates automatically | A medida que llega más información, la prioridad se actualiza automáticamente |
| `intel.outcome.text` | Leads get a priority, so the most promising ones are handled first. | Los leads reciben una prioridad, así que los más prometedores se atienden primero. |
| `intel.outcome.highlight` | The most promising leads are marked as priority | Los leads más prometedores se marcan como prioritarios |
| `faq.q4.a` | Each lead gets a priority: cold, warm or hot. The most promising ones are clearly marked. | Cada cliente recibe una prioridad: frío, interesado o prioritario. Los de mayor potencial se marcan claramente. |
| `demo.score.title` † | Priority | Prioridad |
| `demo.score.temp` † | HIGH PRIORITY | PRIORIDAD ALTA |
| `speed.fast.l3` † | Lead qualified and prioritised | Cliente cualificado y priorizado |

The cold, warm and hot labels stay: they are the priority bands the product sets (a real lead scored
45 warm on 2026-09-20).

### 2.3 CRM

| Key | EN new | ES new |
|---|---|---|
| `always.crm` | Recorded as a lead in Nuova | Registrado como lead en Nuova |
| `intel.outcome.crm` | Leads are recorded in Nuova with their qualification | Los contactos quedan registrados en Nuova con su cualificación |
| `strip.item3.desc` † | We set it up around the way your team already works. | Lo configuramos según la forma en que ya trabaja tu equipo. |

### 2.4 Setup and demo terms

| Key | EN new | ES new |
|---|---|---|
| `hero.cta.note` | We show you Nuova on a real enquiry, not a slide deck. | Te enseñamos Nuova con una consulta real, no con un PowerPoint. |
| `cta.microcopy` | Optional. On a real enquiry. | Opcional. Con una consulta real. |
| `cta.compat2` | We set it up with you | Lo configuramos contigo |
| `faq.q1.a` | No. You keep your email and WhatsApp, and we set Nuova up with you. | No. Mantienes tu email y tu WhatsApp, y configuramos Nuova contigo. |

### 2.5 Hot lead alert (D-10) and follow up (E-01)

| Key | EN new | ES new |
|---|---|---|
| `always.alert.main` | Task for your team | Tarea para tu equipo |
| `always.alert.sub` | When a viewing is requested | Cuando se pide una visita |
| `always.row5` | Viewing requests become tasks for your team | Las peticiones de visita pasan a ser tareas para tu equipo |
| `always.row3` | Follow up with the customer's permission: in preparation | Seguimiento con permiso del cliente: en preparación |
| `always.fup` | Follow up: in preparation | Seguimiento: en preparación |
| `always.left.4.title` | Prioritise and hand over | Prioriza y traspasa |
| `always.left.4.desc` | The most promising leads first | Primero los leads más prometedores |
| `scenarios.s4.title` | Follow up with the customer's permission is in preparation | El seguimiento con permiso del cliente está en preparación |
| `scenarios.s4.text` | When a customer goes quiet, the conversation stays on their record. Automatic follow up, only where the customer has agreed to it, is being prepared. | Cuando un cliente deja de responder, la conversación queda en su ficha. El seguimiento automático, solo cuando el cliente lo ha aceptado, se está preparando. |
| `scenarios.fup.l3` | Follow up in preparation | Seguimiento en preparación |
| `faq.q6.a` | The conversation stays on their record. Automatic follow up, only with the customer's permission, is in preparation. | La conversación queda en su ficha. El seguimiento automático, solo con el permiso del cliente, está en preparación. |
| `strip.item4.label` † | Follow up in preparation | Seguimiento en preparación |
| `strip.item4.desc` † | Only where the customer has agreed to it. | Solo cuando el cliente lo ha aceptado. |
| `demo.alert.title` † | A task for the agent | Una tarea para el agente |
| `demo.alert.hot` † | HIGH PRIORITY | PRIORIDAD ALTA |
| `speed.fast.l4` † | Viewing request becomes a task | La petición de visita pasa a ser una tarea |

### 2.6 Guarantees, trial, footer

| Key | EN new | ES new |
|---|---|---|
| `faq.q3.a` | Text enquiries on connected channels get an automatic reply. | Las consultas de texto en los canales conectados reciben una respuesta automática. |
| `faq.q7.q` | Can I test this before deciding? | ¿Puedo probarlo antes de decidir? |
| `faq.q7.a` | A free 14 day trial without payment method is being prepared. Until it opens, a demo shows Nuova on a real enquiry. | Se está preparando una prueba gratuita de 14 días sin método de pago. Hasta que se abra, una demo te enseña Nuova con una consulta real. |
| `cta.start.free` | Book a demo | Reserva una demo |
| `footer.tagline` | The operating layer of a real estate agency. Built for agencies in Spain. | La capa operativa de una agencia inmobiliaria. Hecho para agencias en España. |

`cta.start.free` currently opens the demo booking (rejected pattern T-02); the label now says what
the button does.

## 3. Replacements outside the translation files

### 3.1 Metadata

| File | Field | EN new |
|---|---|---|
| `app/layout.tsx` | `title`, `openGraph.title` | NuovaSolution. The operating layer of a real estate agency |
| `app/layout.tsx` | `description` | Enquiries answered, qualified and kept on one record. For real estate agencies in Spain. |
| `app/layout.tsx` | `openGraph.description` | Automatic replies. Qualified enquiries. One record per customer. |
| `app/live-demo/page.tsx` | `title` | Demo (simulation). NuovaSolution |
| `app/live-demo/page.tsx` | `description` | A simulation that shows the steps NuovaSolution takes with a real estate enquiry. It runs in your browser, not on the live system. |

### 3.2 `/live-demo` (`components/live-demo/live-demo-client.tsx`, UI string table)

**Disclosure, shown above the input before any interaction** (S-02; wording needs the owner's
confirmation under S-02, recommended as written):

| EN | ES |
|---|---|
| This is a simulation. It runs in your browser and shows the steps Nuova takes with an enquiry. It is not the live system and does not use AI. | Esto es una simulación. Funciona en tu navegador y muestra los pasos que sigue Nuova con una consulta. No es el sistema real y no usa IA. |

"It does not use AI" is exact: the demo engine is deterministic local code (`CURRENT_SITE_AUDIT.md`
§9). The earlier copy master wording "same logic, sample data" is **not** used, because the demo
does not run the product's logic.

| Key | EN new | ES new |
|---|---|---|
| `pageLabel` | Demo (simulation) | Demo (simulación) |
| `subheadline` | Text enquiries answered automatically and qualified. Your team starts with the most promising ones. | Consultas de texto respondidas automáticamente y cualificadas. Tu equipo empieza por las más prometedoras. |
| `tryExample` | Try an example: | Prueba un ejemplo: |
| `analysisLabel` | Analysis (simulated) | Análisis (simulado) |
| `hotAlert` | High priority (simulated) | Prioridad alta (simulado) |
| `emailTagline` | Every enquiry. Automatic. | Cada consulta. Automática. |
| `crmUpdated` | Lead recorded (simulated) | Lead registrado (simulado) |
| `scoreLabel` | Priority | Prioridad |
| `fieldScore` | Priority | Prioridad |
| `inquiryUpdated` | New signal detected · priority updated | Nueva señal detectada · prioridad actualizada |
| `bookDemo` | Book a demo | Reserva una demo |

**One non text change the copy depends on:** the score ring and the record card render
`{score}/100` and an animated 0 to 87 number. `CLAIMS_MATRIX.md` S-04 rejects publishing a scale
taken from the simulation. Minimal fix: render the band (Cold, Warm, Hot / Frío, Interesado,
Prioritario) instead of the number. This is a code change for the Implementer; if it is not made,
the page may not ship even with the disclosure.

`whatsappUs` renders a WhatsApp button; no business number exists for sales messages (the central
number is under the Meta freeze and is not a sales line by any decision). The Implementer confirms
the button's target; if it has none, it is hidden.

## 4. Not copy, recorded for completeness

- The primary CTA uses `data-cal-link` on `href="#"` (A-02). Fix: real booking URL in `href`.
- `/terms` and `/data-deletion` return 404 on the live site; Meta needs both. Drafts are in
  `COUNSEL_PACKAGE_v1.md` §C and §D; publishing them waits on counsel and the owner decision
  `LEGAL_PLACEHOLDER_ROUTES`.

## 5. Acceptance

The Reviewer reads the deployed site (HTML and JS) and confirms none of these strings remains, in
either language: *Always synced*, *Siempre sincronizado*, *No setup*, *Sin configuración*, *1 to
100*, *1 a 100*, *above 80*, *más de 80*, *< 1 second*, *< 1 segundo*, *menos de un segundo*,
*instantly* as a speed promise, *real time*, *tiempo real*, *AI Analysis*, *HOT LEAD*, *Agent
alerted*, *Agent notified*, *follows up automatically*, *Only spam is ignored*, *AI lead
automation*, *Start for free* on a demo link. Closing signal: `WEBSITE_LIVE_CLAIM_FIX = DEPLOYED`
with the deployment id and the Reviewer's readout.
