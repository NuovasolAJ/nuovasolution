# CLAIMS CHECK 1012 — the texts of `08ecf9c` against the claims matrix

**State:** `2026-10-12` · **Lane:** Website Copy / Product Truth → **Website Implementer**.
**Checked:** the WORKING texts and the story A to F in `08ecf9c` (current HEAD `2561247`), read from
[en.ts](lib/i18n/dictionaries/en.ts), [es.ts](lib/i18n/dictionaries/es.ts),
[home-sections.ts](lib/content/home-sections.ts), [home-story.ts](lib/content/home-story.ts).
**Matrix:** `backend_handoff/handoff_in_2026-10-03/AUDIT_ORDERS_2026-10-03.md` §"Paketmatrix", plus
`PRODUCT_TRUTH_TABLE` v1.1, `LEAD_TRUTH_INPUT_v1`, `DAILY_FEATURE_TRUTH`, `3D_FEATURE_TRUTH` Delta 7.
**Status:** DRAFT by its author, not independently reviewed.

> The design is not reopened. Every item below is a string, a state line or a missing state line.

---

## 1. The finding that matters most: the story A to F has no state line

The five scenes carry one ("Choose a scene. Each one says what is available today and what is still a
prototype"). **The six story chapters carry none**, and they are written in the present tense as if all of
it ran today. Four of the six show things the matrix puts in preparation.

A private draft may show the target product. A public page may not, unless each chapter says where it
stands. So: **every chapter gets the same two-word state line the scenes already teach the reader.**

| Chapter | State line ES | State line EN | Matrix row |
|---|---|---|---|
| A · the situation | **Disponible hoy:** WhatsApp y email. **Prototipo:** el formulario web y la llamada. | **Available today:** WhatsApp and email. **Prototype:** the web form and the phone call. | "automatische Antworten · Prod", "E-Mail-Labels · Prod, Gmail"; telephony "Staging ES bereit; Prod nichts"; no web form channel in the matrix |
| B · the reply | **Disponible hoy, en español.** | **Available today, in Spanish.** | "automatische Antworten · Prod, **nur ES**, nur nuovasolution" |
| C · the property that fits | **Prototipo · todavía no disponible.** | **Prototype · not available yet.** | "Property Matching · Staging; Prod nichts; keine reale Quelle" |
| D · the next action | **Disponible hoy:** la tarea, tomarla y cerrarla. **Prototipo:** el asistente que explica el orden. | **Available today:** the task, taking it and closing it. **Prototype:** the assistant that explains the order. | "Jarvis/Daily Goals · Prod: Liste/Übernehmen/Erledigen"; `DAILY_FEATURE_TRUTH` row 11: the chat is **NO in production** |
| E · staying in touch | **Prototipo · todavía no disponible.** | **Prototype · not available yet.** | "Follow-ups · Staging exactly-once belegt, Zustellung nicht zertifiziert" |
| F · the result | **Prototipo · todavía no disponible.** | **Prototype · not available yet.** | the weekly report has no contract yet; `reports.weekly` is an open op on API's list |

---

## 2. Sentences that claim more than the matrix carries

| # | Where | Before | After ES | After EN | Matrix |
|---|---|---|---|---|---|
| D-94 | `home.hero.lead` (WORKING) | "Nuova answers **in her language**" · "Nuova responde **en su idioma**" | Una compradora escribe mientras estás en una visita. Nuova le responde en español, registra lo que ha pedido y deja una tarea a tu equipo. | A buyer writes while you are at a viewing. Nuova answers her in Spanish, records what she asked for and leaves your team one task. | replies are **Spanish only**. "In her language" is the one sentence on the page that promises every language, and the state line under it already says Spanish, so the lead contradicted its own caption |
| D-95 | story B title | "Nuova replies to **each customer in their language**" · "a cada cliente en su idioma" | Nuova responde en español y aclara lo que busca cada cliente. | Nuova replies in Spanish and clarifies what each customer wants. | same row. The rest of chapter B is kept word for word: nothing committed, no price, no date, no availability, and every customer is told an assistant is replying |
| D-96 | story D line | "una tarea con **prioridad**, motivo y siguiente paso" · "a task with a **priority**, a reason and a next step" | Una consulta importante se convierte en una tarea con motivo y siguiente paso. | An important enquiry becomes a task with a reason and a next step. | `le_qualification` is **staging only** (`LEAD_TRUTH_INPUT_v1` §1). The priority claim was removed everywhere on 2026-09-29 and has come back in this chapter |
| D-97 | `hero.cards.answer.text` (WORKING, owner 2026-10-06) | "**Would 10 or 12 suit you better?** An agent from the agency will confirm with you." | ¿Te viene mejor por la mañana o por la tarde? Un agente de la agencia te confirmará la hora. | Would the morning or the afternoon suit you better? An agent from the agency will confirm the time with you. | **no calendar is connected and no availability source exists.** Naming two hours says those hours are free. Asking which part of the day suits the customer asks a preference and asserts nothing, which keeps the owner's intent, a warmer and more concrete reply, without inventing a slot |
| D-98 | `trust.steps[2]` | "WhatsApp, email, **web form and phone** are connected together with us, channel by channel." | WhatsApp y email se conectan junto con nosotros, canal por canal. Es un paso aparte y lo hacemos contigo. | WhatsApp and email are connected together with us, channel by channel. It is a separate step and we do it with you. | the phone has no production number and the legal gate sends every call to a person; no web form channel is in the matrix |
| D-99 | `trust.support[2]` | "**We set up the phone assistant's number and your hours.**" | *(remove the line)* | *(remove the line)* | there is no number to set up, and stored opening hours steer nothing in production (`PRODUCT_TRUTH_TABLE` v1.1 §G) |
| D-100 | `trust.support[1]` | "We add the form to your website or connect the one you have." | *(remove the line)* | *(remove the line)* | same reason as D-98 |
| D-101 | `trust.crmExternal.line` | "HubSpot, Pipedrive, Zoho, Salesforce or Google Sheets. **Your leads sync with what you already use**; we make the connection with you." | HubSpot, Pipedrive, Zoho y Salesforce están certificados en nuestro entorno de pruebas contra cuentas reales de cada proveedor, y todavía no hay ninguna conexión en producción. Google Sheets sí recibe hoy una copia de tus leads. Dinos cuál usas y lo preparamos contigo. | HubSpot, Pipedrive, Zoho and Salesforce are certified in our test environment against each provider's real accounts, and there is no production connection yet. Google Sheets does receive a copy of your leads today. Tell us which you use and we prepare it with you. | "externe CRM-Anbindung · Staging zertifiziert; **Prod: keine**" and "Google Sheets · 1 aktiver Produktions-Workflow". Sheets and the four CRMs are two different states and were in one sentence |
| D-102 | `trust.crmTitle` and the choice | "With your CRM or without an external one" | Con el CRM incluido, y con tu CRM cuando esté listo | With the included CRM, and with your CRM when it is ready | the setup step offered external CRM as an equal choice available today |
| D-103 | `story.lead` | "Follow Laura Serrano from her first message **to the week's report**." | Sigue a Laura Serrano desde su primer mensaje hasta la tarea que cierra tu equipo. | Follow Laura Serrano from her first message to the task your team closes. | the weekly report has no contract and no data. The story may still end at F with its prototype line, but the promise at the top should land on the part that is proven |
| D-104 | `hero.cards.answer.disclosureMark` | "Sample translation. The approved notice is the Spanish one." **inside the sales card** | *(move to the figure caption with the synthetic-data label)* | *(same)* | D-91 and D-92 of 2026-09-30 asked for exactly this and it is still in the card. The approved Spanish notice itself stays word for word |

---

## 3. Confirmed, and worth keeping exactly as they are

| Text | Why it is right |
|---|---|
| `trust.ctaLine` "14 days free · No card · No sales call" | no package name, so the general call to action needs no prior knowledge. This is the replacement the order asks for, and it is already in place; `offer.cta` "Try free" · "Prueba gratis" matches it |
| story B's line, apart from the language | "Nothing is committed: no price, no date, no availability. Every customer is told an assistant is replying." Three refusals and the disclosure in one line |
| story E's line | "The follow-up goes out only if Laura agreed to receive proposals and you switched follow-ups on." The consent condition is in the text, which is what the legal hold on follow-ups requires. The chapter still needs its prototype line, because consent is not the same as a working path |
| `offer.note` "No minutes are promised: setting up takes as long as your details take." | the honest answer to the question everyone asks, and no invented duration |
| the 3D block | matches `3D_FEATURE_TRUTH` Delta 7 line for line: no roof, ground or upper floor, no eye-level walkthrough, furniture similar rather than reconstructed, each model made to order |
| `hero.state` "Today in Spanish, for text enquiries on WhatsApp and email." | the scope, in the hero, where it belongs |

---

## 4. "Try Essential free": replaced where it needs prior knowledge, kept where it does not

The rule is that a **general** call to action may not assume the reader knows the packages. Measured
against that, two of the four places are fine and one is not.

| Where | Today | Verdict |
|---|---|---|
| `home.v3.offer.cta` + `trust.ctaLine` | "Try free" · "Prueba gratis", with "14 days free · No card · No sales call" | **already right.** No package name, nothing to know in advance. This is the replacement the order asks for, and it is in place |
| `packages.ctaTrialEssential` on the Essential card | "Try Essential free" · "Prueba Essential gratis" | **keep.** It sits on the card that explains Essential, so the name is context, not prior knowledge |
| `packages.h1` | "Try Essential free for 14 days" · "Prueba Essential gratis 14 días" | **replace.** A visitor arriving from a general link meets the package name in the page's first line, before anything has told them what Essential is |

| # | Key | After ES | After EN |
|---|---|---|---|
| D-105 | `packages.h1` | **Pruébalo gratis 14 días** | **Try it free for 14 days** |
| D-106 | `packages.lead` | 14 días gratis, sin método de pago, con el paquete Essential. Después eliges un plan con nosotros y te decimos el precio y el periodo de facturación antes de acordar nada. | 14 days free, with no payment method, on the Essential package. After that you choose a plan with us, and we tell you the price and the billing period before anything is agreed. |

The scope does not disappear: it moves one line down, into the lead, where the reader has already been
told what the page is about. `h1Neutral` and `leadNeutral` stay as they are for the interim case.

## 5. One open question for API, not a text

`home.v3.packages.perMonth` renders "per month". No price exists anywhere in the product, the catalogue
reports `awaiting_pricing_authority`, and no lane has stated that billing is monthly. Either the catalogue
confirms the interval, or the label comes out until it does. **Not** a copy decision: it is a billing fact.
