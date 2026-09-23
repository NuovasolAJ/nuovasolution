# OLD LIVE SITE HOTFIX COPY v2 — complete true replacements for nuovasolution.com

**State:** `2026-09-22_SYNC_1800Z` · **Written:** 2026-09-23 · **Copy version:** `oldsite-fix-v2`
**Supersedes:** `OLD_LIVE_SITE_HOTFIX_COPY_v1.md` (incomplete: the Reviewer found 13 rendered claims
it did not cover). **Use this file only.**
**Lane:** Website Copy / Product Truth → **Website Implementer** (text only PR against `main`
@ `9943660`) · Reviewer verifies the deployed result
**Status:** DRAFT by its author, not independently reviewed.
**Gap source:** `review_2026-09-22/hotfix-uncovered-keys-9943660.tsv` and `REVIEW_2026-09-22.md` §6
(13 rendered claims plus the ten literal acceptance strings).

> The public site is still the pre-redesign site and publishes claims `CLAIMS_MATRIX.md` rejects.
> These are the smallest text changes that make each statement true today. **Nothing is removed
> from the product's scope**: a capability that exists but is not live in prod is kept and
> retensed. Owner decision this serves: `WEBSITE_LIVE_CLAIM_FIX`.

---

## 1. Rules applied

- No absolute "every", "never", "always" without evidence (B-04, B-14, X-07).
- Speed only qualitatively (B-05, "in seconds, not hours"); no figure (B-06).
- Priority wording per D-03 and D-05; no scale, no threshold (D-04).
- **No hot lead alert statement and no alert visual** (D-10). A viewing request becoming a task is
  evidenced in prod (task `32711087…`) and replaces the alert wherever the page showed one.
- Follow up: none is sent in prod and E-01 is legally held. The capability keeps its name with its
  real status ("in preparation").
- CRM: leads are recorded in Nuova; no sync claim (F-08).
- **No portal or web form intake claim** (F-06; web form intake is contract only, not prod).
- Trial: free 14 day trial, no payment during the trial (the rule in force). Self sign up is not
  live on the old site, so its buttons say what they do (book a demo). No price, no new plan.
- Simulation: `/live-demo` runs local heuristics in the browser, no AI, no backend. Disclosure
  **before** interaction (S-02).
- No dashes in customer strings (one em dash is removed below).
- Old site register in Spanish stays *tú*.

## 2. Replacements

Keys marked † are in components no page imports; their strings still ship in the JavaScript
bundle, so they are replaced too (deleting those components is an equally valid fix). Keys marked
**R** were found rendered in the live HTML by the Reviewer and are the priority.

### 2.1 Speed and availability

| Key | EN new | ES new |
|---|---|---|
| `hero.headline.line1` | Reply in seconds, not hours | Responde en segundos, no en horas |
| `hero.feature.1.title` | Reply automatically | Responde automáticamente |
| `hero.feature.1.desc` | Text enquiries on WhatsApp and email get an automatic reply | Las consultas de texto por WhatsApp y email reciben una respuesta automática |
| `hero.feature.2.desc` | See who wants to buy, rent or sell | Ve quién quiere comprar, alquilar o vender |
| **R** `hero.feature.2.title` | Qualified automatically | Cualificación automática |
| `hero.feature.3.desc` | Enquiries are recorded and answered | Las consultas se registran y se responden |
| **R** `hero.feature.3.title` | Recorded and answered | Registradas y respondidas |
| `hero.chat.replied` | Replied automatically | Respondido automáticamente |
| **R** `always.label` | Day or night | De día o de noche |
| **R** `always.headline` | Enquiries keep moving while your team is busy | Las consultas siguen avanzando mientras tu equipo está ocupado |
| `always.sub` | Replies automatically and keeps each conversation on one record | Responde automáticamente y mantiene cada conversación en una sola ficha |
| `always.row2` | Reply sent automatically | Respuesta enviada automáticamente |
| `always.step.5` | Automatic reply | Respuesta automática |
| `always.time.2` | Automatic | Automático |
| `always.left.3.desc2` | Evaluated automatically | Evaluado automáticamente |
| `strip.item1.label` † | Replies automatically | Responde automáticamente |
| `strip.item1.desc` † | Text enquiries get an automatic reply, day or night. | Las consultas de texto reciben una respuesta automática, de día o de noche. |
| `strip.label` † | Day or night | De día o de noche |
| `strip.headline` † | Built so enquiries do not sit unanswered | Hecho para que las consultas no se queden sin respuesta |
| `strip.sub` † | Text enquiries are captured, understood and prioritised automatically. Follow up, only with the customer's permission, is in preparation. | Las consultas de texto se capturan, se entienden y se priorizan automáticamente. El seguimiento, solo con el permiso del cliente, está en preparación. |
| `strip.item2.desc` † | Buyer, seller, long term or short term, classified automatically. | Comprador, vendedor, largo plazo o corto plazo, clasificado automáticamente. |
| `scenarios.s1.title` | The system replies automatically and collects what matters | El sistema responde automáticamente y recoge lo importante |
| `scenarios.s3.title` | You see which leads are worth your time | Ves qué clientes valen la pena |
| **R** `scenarios.sub` | Text enquiries are answered and qualified in the background. | Las consultas de texto se responden y se cualifican en segundo plano. |
| `intel.headline` | Know which leads are worth your time | Sabe qué clientes valen tu tiempo |
| `cta.process.2` | Replies start automatically | Las respuestas empiezan automáticamente |
| `faq.q2.a` | It is answered automatically, qualified and given a priority. | Se responde automáticamente, se cualifica y recibe una prioridad. |
| `demo.label` † | Demo (simulation) | Demo (simulación) |
| `demo.heading` † | See the steps, in a simulation | Mira los pasos, en una simulación |
| `demo.reply.speed` † | Automatic reply | Respuesta automática |
| `demo.reply.status` † | Lead answered | Consulta respondida |
| `demo.step2.label` † | Automatic reply | Respuesta automática |
| `speed.note` † | A reply in seconds, not hours. | Una respuesta en segundos, no en horas. |
| `speed.fast.t2` † | Seconds | Segundos |
| `speed.fast.t3`, `speed.fast.t4` † | Automatic | Automático |
| `speed.fast.l2` † | Reply sent automatically | Respuesta enviada automáticamente |

`always.time.3` ("Seconds" / "Segundos") and `always.time.1`, `always.time.4` stay: qualitative,
no promise.

### 2.2 Absolutes: "every", "never", "everything"

| Key | EN new | ES new |
|---|---|---|
| **R** `hero.sub` | Text enquiries get a reply, and each one gets a priority, so you can see who is serious. | Las consultas de texto reciben respuesta, y cada una recibe una prioridad, para que veas quién va en serio. |
| **R** `cta.sub` | Text enquiries are answered, qualified and prioritised, so your team starts with the most promising ones | Las consultas de texto se responden, se cualifican y se priorizan, para que tu equipo empiece por las más prometedoras |
| **R** `scenarios.headline` | From the first message to a qualified enquiry | Del primer mensaje a una consulta cualificada |
| **R** `scenarios.s3.text` | Messages are evaluated automatically. A lead can be cold, warm or hot from the start, and the priority updates as the conversation changes. | Los mensajes se evalúan automáticamente. Un cliente puede ser frío, interesado o prioritario desde el inicio, y la prioridad se actualiza según cambia la conversación. |
| **R** `intel.build.text` | Each message can add missing information and update the priority | Cada mensaje puede añadir información que falta y actualizar la prioridad |
| **R** `faq.q3.q` | Do enquiries get a reply? | ¿Las consultas reciben respuesta? |
| `faq.q3.a` | Text enquiries on connected channels get an automatic reply. | Las consultas de texto en los canales conectados reciben una respuesta automática. |
| `always.row4` † | Priority set for each enquiry | Prioridad asignada a cada consulta |

`scenarios.s3.visual.note`, `faq.headline`, `always.row1`, `always.row6`, `always.step.1` to
`always.step.4`, `always.step.6`, `always.cls.*`, `always.score.*`, `always.left.2.*`,
`always.left.3.title`, `always.left.3.desc1` stay: they name a step or a band, without a promise.

### 2.3 Channels: no portals, no web forms

| Key | EN new | ES new |
|---|---|---|
| **R** `always.left.1.desc` | Email and WhatsApp | Email y WhatsApp |
| **R** `always.left.1.title` | New enquiry | Nueva consulta |

Portal and web form intake are not in prod (F-06; A-04 is a contract only). Naming them is a
claim about integrations that do not run.

### 2.4 The alert card becomes a task card (D-10)

The hero phone card and the demo alert step both show an agent alert. There is no evidenced alert
delivery in prod, and D-10 forbids the wording **and the visual**. A viewing request becoming a
task **is** evidenced, so the card shows that instead.

| Key | EN new | ES new |
|---|---|---|
| **R** `hero.chat.alert.title` | Viewing request | Petición de visita |
| **R** `hero.chat.alert.line1` | Buyer · Marbella | Comprador · Marbella |
| **R** `hero.chat.alert.line2` | Asked for a viewing tomorrow | Pide visita para mañana |
| `hero.chat.sent` | Added to your tasks | Añadido a tus tareas |
| `demo.step4.tab` † | Task | Tarea |
| `demo.step4.label` † | Task for the team | Tarea para el equipo |
| `demo.alert.title` † | A task for the team | Una tarea para el equipo |
| `demo.alert.hot` † | HIGH PRIORITY | PRIORIDAD ALTA |
| `demo.alert.buyer` † | Buyer · Nerja | Comprador · Nerja |
| `demo.alert.budget` † | 900 to 1.200 € per month | 900 a 1.200 € al mes |
| `demo.alert.people` † | 2 people | 2 personas |
| `demo.alert.movein` † | From June | Desde junio |
| `demo.alert.viewing` † | Viewing requested: | Visita solicitada: |
| `demo.alert.yes` † | Yes | Sí |
| `demo.alert.cta` † | → Open the record | → Abrir la ficha |
| `demo.alert.online` † | *(remove the key and the status dot; an "online" presence is not a product state)* | *(quitar la clave y el punto de estado)* |
| `faq.q5.a` | The lead is updated in Nuova, and a viewing request becomes a task for your team. | El contacto se actualiza en Nuova, y una petición de visita pasa a ser una tarea para tu equipo. |

**Non text condition:** if the hero card renders as a phone push notification, the notification
chrome must go (see §4). The text above is true only as a record or task card. The demo values are
sample data inside a labelled simulation and must stay obviously illustrative.

### 2.5 Score and priority

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
| `demo.step3.tab` † | Priority | Prioridad |
| `demo.step3.label` † | Priority for this lead | Prioridad de este contacto |
| `speed.fast.l3` † | Lead qualified and prioritised | Cliente cualificado y priorizado |

The cold, warm and hot bands stay: they are the bands the product sets (a real lead scored warm on
2026-09-20). **The numeric scale never appears** (see §4).

### 2.6 CRM

| Key | EN new | ES new |
|---|---|---|
| `always.crm` | Recorded as a lead in Nuova | Registrado como lead en Nuova |
| `intel.outcome.crm` | Leads are recorded in Nuova with their qualification | Los contactos quedan registrados en Nuova con su cualificación |
| `strip.item3.desc` † | We set it up around the way your team already works. | Lo configuramos según la forma en que ya trabaja tu equipo. |

### 2.7 Follow up (E-01, legally held)

| Key | EN new | ES new |
|---|---|---|
| `always.row3` † | Follow up with the customer's permission: in preparation | Seguimiento con permiso del cliente: en preparación |
| `always.fup` | Follow up: in preparation | Seguimiento: en preparación |
| `always.left.4.title` | Prioritise and hand over | Prioriza y traspasa |
| `always.left.4.desc` | The most promising leads first | Primero los leads más prometedores |
| `scenarios.s4.title` | Follow up with the customer's permission is in preparation | El seguimiento con permiso del cliente está en preparación |
| `scenarios.s4.text` | When a customer goes quiet, the conversation stays on their record. Automatic follow up, only where the customer has agreed to it, is being prepared. | Cuando un cliente deja de responder, la conversación queda en su ficha. El seguimiento automático, solo cuando el cliente lo ha aceptado, se está preparando. |
| `scenarios.fup.l3` | Follow up in preparation | Seguimiento en preparación |
| `faq.q6.a` | The conversation stays on their record. Automatic follow up, only with the customer's permission, is in preparation. | La conversación queda en su ficha. El seguimiento automático, solo con el permiso del cliente, está en preparación. |
| `strip.item4.label` † | Follow up in preparation | Seguimiento en preparación |
| `strip.item4.desc` † | Only where the customer has agreed to it. | Solo cuando el cliente lo ha aceptado. |
| `speed.fast.l4` † | Viewing request becomes a task | La petición de visita pasa a ser una tarea |

### 2.8 Setup, demo terms, trial, footer

| Key | EN new | ES new |
|---|---|---|
| `hero.cta.note` | We show you Nuova on a real enquiry, not a slide deck. | Te enseñamos Nuova con una consulta real, no con un PowerPoint. |
| `cta.microcopy` | Optional. On a real enquiry. | Opcional. Con una consulta real. |
| `cta.compat2` | We set it up with you | Lo configuramos contigo |
| `faq.q1.a` | No. You keep your email and WhatsApp, and we set Nuova up with you. | No. Mantienes tu email y tu WhatsApp, y configuramos Nuova contigo. |
| `faq.q7.q` | Can I test this before deciding? | ¿Puedo probarlo antes de decidir? |
| `faq.q7.a` | A free 14 day trial without payment is being prepared. Until it opens, a demo shows Nuova on a real enquiry. | Se está preparando una prueba gratuita de 14 días sin pago. Hasta que se abra, una demo te enseña Nuova con una consulta real. |
| `cta.start.free` | Book a demo | Reserva una demo |
| `footer.tagline` | The operating layer of a real estate agency. Built for agencies in Spain. | La capa operativa de una agencia inmobiliaria. Hecho para agencias en España. |

The pain narrative keys `lost.sub`, `lost.step4.desc`, `lost.conclusion.sub`, `lost.conclusion`
carry no product claim and no statistic. They stay unchanged.

## 3. Metadata and `/live-demo`

| File | Field | EN new | ES equivalent |
|---|---|---|---|
| `app/layout.tsx` | `title`, `openGraph.title` | NuovaSolution. The operating layer of a real estate agency | — |
| `app/layout.tsx` | `description` | Enquiries answered, qualified and kept on one record. For real estate agencies in Spain. | — |
| `app/layout.tsx` | `openGraph.description` | Automatic replies. Qualified enquiries. One record per customer. | — |
| `app/live-demo/page.tsx` | `title` | Demo (simulation). NuovaSolution | — |
| `app/live-demo/page.tsx` | `description` | A simulation that shows the steps NuovaSolution takes with a real estate enquiry. It runs in your browser, not on the live system. | — |

**Simulation disclosure, above the input, before any interaction** (S-02; owner confirms the
wording):

| EN | ES |
|---|---|
| This is a simulation. It runs in your browser and shows the steps Nuova takes with an enquiry. It is not the live system and does not use AI. | Esto es una simulación. Funciona en tu navegador y muestra los pasos que sigue Nuova con una consulta. No es el sistema real y no usa IA. |

`/live-demo` UI strings (`components/live-demo/live-demo-client.tsx`):

| Key | EN new | ES new |
|---|---|---|
| `pageLabel` | Demo (simulation) | Demo (simulación) |
| `subheadline` | Text enquiries answered automatically and qualified. Your team starts with the most promising ones. | Consultas de texto respondidas automáticamente y cualificadas. Tu equipo empieza por las más prometedoras. |
| `tryExample` | Try an example: | Prueba un ejemplo: |
| `analysisLabel` | Analysis (simulated) | Análisis (simulado) |
| `hotAlert` | High priority (simulated) | Prioridad alta (simulado) |
| `emailTagline` | Every enquiry. Automatic. | Cada consulta. Automática. |
| `crmUpdated` | Lead recorded (simulated) | Lead registrado (simulado) |
| `scoreLabel`, `fieldScore` | Priority | Prioridad |
| `inquiryUpdated` | New signal detected · priority updated | Nueva señal detectada · prioridad actualizada |
| **R** `headlineA` + `headlineB` + `headlineC` | Your agency / replies / while you work | Tu agencia / responde / mientras trabajas |
| **R** `alertSnippet` | Buyer · 650.000 € · Marbella · Viewing requested | Comprador · 650.000 € · Marbella · Visita solicitada |
| `bookDemo` | Book a demo | Reserva una demo |
| `stopLosingBody` | Book a demo and we show you the system on a real enquiry from your market. | Reserva una demo y te enseñamos el sistema con una consulta real de tu mercado. |

## 4. Non text changes, for the Implementer

| # | Item | Why | Minimal fix |
|---|---|---|---|
| 1 | Score ring and record card render `{score}/100` and animate 0 to 87 | S-04 rejects publishing a scale taken from the simulation (D-04 rejects the scale itself) | render the band (Cold, Warm, Hot / Frío, Interesado, Prioritario) instead of the number |
| 2 | Hero card and demo step 4 render a phone push notification | D-10 forbids the alert visual, not only the words | drop the notification chrome (bell, "online" dot, push framing); render a record or task card |
| 3 | Primary CTA is `data-cal-link` on `href="#"` | A-02: dead if the script is blocked | put the real booking URL in `href`, keep the embed as progressive enhancement |
| 4 | `whatsappUs` button on `/live-demo` | no business number is decided for sales | confirm the target; if there is none, hide the control |
| 5 | Five stray PNG files in the repository root | junk from a failed capture run | delete |

## 5. Acceptance

The Reviewer reads the deployed HTML and JavaScript in both languages. **None of these strings may
remain** (ten checks, each covering one rejected claim family):

| # | Must not appear |
|---|---|
| 1 | `Always synced`, `Siempre sincronizado` |
| 2 | `No setup`, `Sin configuración` |
| 3 | `1 to 100`, `1 a 100`, `above 80`, `más de 80`, and any `/100` rendering |
| 4 | `< 1 second`, `< 1 segundo`, `menos de un segundo` |
| 5 | `in real time`, `tiempo real`, `AI Analysis`, `Análisis IA` without the simulated marker |
| 6 | `HOT LEAD`, `LEAD URGENTE`, `Agent alerted`, `Agent notified`, `Agente notificado`, `Alerta WhatsApp` |
| 7 | `never miss`, `Never miss`, `nunca`, `never stops`, `Always Running`, `Always On`, `Siempre Activo` |
| 8 | `Every lead`, `Every inquiry`, `Every message`, `Todos los clientes`, `Cada consulta ... automáticamente` as an absolute promise, `Only spam is ignored` |
| 9 | `portals`, `portales`, `forms` as an intake channel |
| 10 | `follows up automatically`, `seguimiento automático` without the permission qualifier; `Start for free` on a demo link; `AI lead automation` |

**Ten literal strings the Reviewer named** (`REVIEW_2026-09-22.md` §6). None may remain:

| # | Literal |
|---|---|
| 1 | `Every lead gets a reply` |
| 2 | `Cada consulta recibe respuesta` |
| 3 | `Never miss` |
| 4 | `never misses` |
| 5 | `Always Running` |
| 6 | `Siempre Activo` |
| 7 | `never stops` |
| 8 | `nunca para` |
| 9 | `you are notified` |
| 10 | `se te avisa` |

Closing signal: `WEBSITE_LIVE_CLAIM_FIX = DEPLOYED` with the deployment id and the Reviewer's
readout.
