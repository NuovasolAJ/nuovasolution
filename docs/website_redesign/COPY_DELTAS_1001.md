# COPY DELTAS 1001 — onboarding vocabulary, and the website texts on the delivered build

**State:** `2026-10-01` · **Written:** 2026-10-01 · **Copy version:** `launch-v1.3`
**Lane:** Website Copy / Product Truth → **Website Implementer**; **Daily** for §2.1; **Reviewer** for the
claim changes.
**Checked against:** code `3d662e1` on the design preview, fetched 2026-10-01 and read as text in reading
order: `/en`, `/es`, `/en/faq`, `/es/faq`, `/en/platform/crm`. Onboarding texts read from
[en.ts](lib/i18n/dictionaries/en.ts) and [es.ts](lib/i18n/dictionaries/es.ts), because `/onboarding`
answers 307 to a login and is not rendered on a public preview.
**Evidence base:** `backend_handoff/handoff_in_2026-09-30/PRODUCT_TRUTH_TABLE_v1.md` (v1.1),
`handoff_in_2026-09-29/LEAD_TRUTH_INPUT_v1.md`, `DAILY_FEATURE_TRUTH_2026-09-28_v1.md`,
`handoff_in_2026-10-01/daily_clip_v2/MANIFEST.md`.
**Status:** DRAFT by its author, not independently reviewed.

> All nine deltas of 0930 are in the build, in both languages, and the question box is gone in favour of
> the checked FAQ. This round is onboarding first, then the website details the order names.

---

## 1. Onboarding

### 1.1 One state vocabulary, four words

Today the onboarding mixes five vocabularies: "Done", "Needs you" / "Te toca a ti", "Connected",
"Still needed", "Optional". A person cannot tell whether "Done" means *I typed it* or *we checked it*.
From now on there are **four** words, and each one answers a different question.

| Word | Means | Where it is used |
|---|---|---|
| **Saved** · Guardado | you entered it and it is stored for your agency | a step you fill in |
| **Connected** · Conectado | a link to another service exists and works | a connector |
| **Checked** · Comprobado | we read it back and it satisfies what going live needs | a readiness gate |
| **Required** · Necesario | still needed before you can go live | a step or a gate that is missing |

| # | Key | Before | After EN | After ES |
|---|---|---|---|---|
| D-54 | `onboarding.stepStatus.completed` | "Done" · "Hecho" / "Set up and confirmed." | **Saved** · What you entered is stored for your agency. | **Guardado** · Lo que has introducido está guardado para tu agencia. |
| D-55 | `onboarding.stepStatus.needs_action` | "Needs you" · **"Te toca a ti"** / "Something here is waiting on you." · "Aquí hay algo esperándote." | **Required** · This step is still needed from you. | **Necesario** · Este paso todavía lo necesitamos de ti. |
| D-56 | `onboarding.setup.readiness.states.READY` | "Done" · "Hecho" | **Checked** | **Comprobado** |
| D-57 | `onboarding.setup.readiness.states.BLOCKED` and `onboarding.blockedMandatory` | "Still needed" · "Todavía necesario" | **Required** | **Necesario** |
| D-58 | `onboarding.stepStatus.externally_pending` | "Waiting on {provider}" | unchanged; it is the one honest fifth state and it names who is waited on | sin cambios |

"Te toca a ti" goes for two reasons: it is the only line in the whole product that addresses the reader
as if the software were keeping score, and in Spanish it reads like a reproach. "Necesario" states the
same fact without the finger.

### 1.2 The CRM step: interest, selection, connection

Three states, and the page never implies a fourth.

| # | Key | Before | After EN | After ES |
|---|---|---|---|---|
| D-59 | `onboarding.crm.chooseLabel` | "Your choice" · "Tu elección" | Your selection | Tu selección |
| D-60 | `onboarding.crm.externalSoon` | **"Coming soon" · "Próximamente"** | Interest only | Solo interés |
| D-61 | `onboarding.crm.externalBody` | "Connecting {provider} is not offered yet. Choose it to tell us you want it…" | Connecting {provider} is not offered. Selecting it records your interest, nothing is sent to {provider}, and your leads stay in the CRM included in Nuova. | Conectar {provider} no se ofrece. Seleccionarlo registra tu interés, no se envía nada a {provider} y tus leads siguen en el CRM incluido en Nuova. |
| D-62 | `onboarding.crm.interestSaved` | "Noted. **We will tell you when** {provider} can be connected." · "Anotado. **Te avisaremos** cuando se pueda conectar {provider}." | Interest recorded. Nothing is sent to {provider}. | Interés registrado. No se envía nada a {provider}. |
| D-63 | `onboarding.crm.sheetsChosen` | "Chosen, not connected" · "Elegido, sin conectar" | Selected, not connected | Seleccionado, sin conectar |

D-60 and D-62 are not style: "Coming soon" is the catalogue of promises the register forbids, and "we
will tell you when" is a contact promise nobody is on the hook for. Both are the same class of defect as
the Q&A fallback that was removed yesterday.

### 1.3 What each setting actually does

`PRODUCT_TRUTH_TABLE` v1.1 §G divides the onboarding in two: branding, language, the disclosure and the
tenant row **steer production behaviour**; calendar, opening hours, social and the Q&A settings are
**stored and steer nothing**. The texts now say which is which, at the point where the person types.

| # | Key | Before | After EN | After ES |
|---|---|---|---|---|
| D-64 | `onboarding.setup.business.hoursHelp` | "Appointments are only offered inside these hours. With no hours set, nothing is booked." · "Las citas solo se ofrecen dentro de este horario. Sin horario, no se reserva nada." | Your hours are stored for your agency. They do not change when a text enquiry is answered: that happens whenever it arrives. They will steer the phone assistant, which is being built. | Tu horario queda guardado para tu agencia. No cambia cuándo se responde una consulta de texto: eso ocurre cuando llega. Dirigirá al asistente telefónico, que está en construcción. |
| D-65 | `onboarding.setup.calendar.notConnected` | "No calendar is connected, so nothing is booked automatically. Requests are handled as set below." | No calendar is connected, so nothing is booked and no appointment is confirmed. A customer who asks for a time becomes a task for your team. | No hay ningún calendario conectado, así que no se reserva nada ni se confirma ninguna cita. Un cliente que pide una hora pasa a ser una tarea para tu equipo. |
| D-66 | voice step, new line | *(none)* | No phone number is connected to your agency. What you set here is stored for when the phone assistant is ready, and nothing answers a call today. | No hay ningún número de teléfono conectado a tu agencia. Lo que configures aquí queda guardado para cuando el asistente telefónico esté listo, y hoy no hay nada que atienda una llamada. |
| D-67 | `onboarding.gates.plan_entitlements` detail, new line | gate label "Your plan" with no explanation | Your trial carries the Essential scope for 14 days. What a paid plan includes is agreed with you before anything is signed. | Tu prueba tiene el alcance de Essential durante 14 días. Lo que incluye un plan de pago se acuerda contigo antes de firmar nada. |

### 1.4 Why we ask for the address, the website and the legal links

The legal step asks for a tax number, an address and three links without saying what they are for, which
is exactly when a person stops filling a form.

| # | Key | After EN | After ES |
|---|---|---|---|
| D-68 | `onboarding.setup.legal.lead` (replaces "Required before any customer email can be sent in your agency's name.") | These details go into the emails your agency sends through Nuova and onto the invoices we send you. Without them we cannot send in your name. | Estos datos van en los emails que tu agencia envía a través de Nuova y en las facturas que te enviamos. Sin ellos no podemos enviar en tu nombre. |
| D-69 | new help line on `addressLine` | Your address appears in the legal footer of those emails and on your invoices. | Tu dirección aparece en el pie legal de esos emails y en tus facturas. |
| D-70 | new help line on `privacyUrl` / `termsUrl` | These links are placed in the emails sent in your name, so the people who write to you can reach your own notices. Nuova's own notices are separate. | Estos enlaces se incluyen en los emails enviados en tu nombre, para que quien te escribe pueda acceder a tus propios avisos. Los avisos de Nuova son aparte. |
| D-71 | property source step, new help line | Your website is where we would read your listings from, once property matching is switched on for your agency. Nothing is read from it today. | Tu web es de donde leeríamos tus inmuebles cuando el emparejamiento de propiedades esté activado para tu agencia. Hoy no se lee nada de ella. |

D-71 matters: property matching resolves as `deferred` and is deliberately fail-closed
(`PRODUCT_TRUTH_TABLE` v1.1 §G), so a field that asks for a website must not imply it is being crawled.

---

## 2. Website

### 2.1 The clip v2 subtitles — Daily's five lines are approved as they are

Daily recorded clip v2 on 2026-10-01 with five subtitles **burned into the video** and shipped as `.vtt`.
I read them against `DAILY_FEATURE_TRUTH` and against the shape the order asks for, before → action →
result:

| # | Shape | ES (Daily) | EN (Daily) | Verdict |
|---|---|---|---|---|
| 1 | before | Laura escribe por WhatsApp y pide ver un piso. | Laura writes on WhatsApp asking to see a flat. | **approved** |
| 2 | before | Su petición aparece como tarea, con la referencia y la hora que pidió. | Her request arrives as a task, with the reference and the time she asked for. | **approved** |
| 3 | action | Una agente la toma. | An agent takes it. | **approved** |
| 4 | action | Queda a su nombre. Nadie más puede tomarla. | It is hers now. Nobody else can take it. | **approved** |
| 5 | result | Al terminarla, sale de la lista. | Once it is done, it leaves the list. | **approved**, and it is the wording the order asked to align to |

**No re-cut is requested.** The lines are Daily's, written from their own truth sheet, they carry the
three beats, and they already use "sale de la lista". Changing them for taste would cost a recording run
and buy nothing. The site texts around the clip are mine and are updated instead:

| # | Key | After EN | After ES |
|---|---|---|---|
| D-72 | clip section heading | A request, taken and finished | Una petición, tomada y terminada |
| D-73 | clip lead | Twenty-two seconds from the screen your team actually uses. No sound. | Veintidós segundos de la pantalla que usa tu equipo. Sin sonido. |
| D-74 | poster label | The request has just arrived | La petición acaba de llegar |
| D-75 | clip caption | Recorded from the product with invented people and properties. The ring marks where the agent taps and is part of the recording. | Grabado del producto con personas e inmuebles inventados. El anillo marca dónde toca el agente y forma parte de la grabación. |

Two things from Daily's honesty notes that the captions must keep honouring, and do: the premium chat
tier is deliberately outside every frame, and the interface language is chosen in the app rather than by
the account, so nothing may be captioned as "it speaks your language".

### 2.2 The AI label: short, and the approved notice untouched

The approved customer notice is quoted verbatim and **is not touched by any delta below**. What changes
is the furniture around it, which currently takes three lines to say one thing.

| # | Key | Before | After EN | After ES |
|---|---|---|---|---|
| D-76 | conversation role chip | "AI assistant" | Nuova · AI assistant | Nuova · asistente de IA |
| D-77 | the note under the reply | "The reply says an assistant wrote it. It does not commit your agency to a price, a date or a condition." | Written by the assistant, and it says so. It agrees no price, no date and no condition. | Lo escribe el asistente, y lo dice. No acuerda precio, ni fecha, ni condición. |
| D-78 | the EN sample marker | "Sample translation. The approved notice exists in Spanish." | Sample translation. The approved notice is the Spanish one. | — *(ES renders the approved text itself and needs no marker)* |
| D-79 | `home.hero.cards.answer.disclosureNote` | "The reply carries this notice because an assistant wrote it." | **remove** — D-77 says it once, and it was saying it twice on one screen | **quitar** |

### 2.3 A natural example reference, paired with Daily

`REF-DEMO-204` renders on the home leads table, the home record card and the CRM page, and the **same
string is burned into the clip v2 picture** ("Visita: Laura Serrano · REF-DEMO-204"). Changing only the
site would put a different reference next to the video on the same screen.

| # | Where | After | Condition |
|---|---|---|---|
| D-80 | every site string carrying `REF-DEMO-204` | **EST-204**, written as "Ref. EST-204" in prose | applies **only together with** Daily's next recording. Until Daily ships a cut whose cards read EST-204, the site keeps `REF-DEMO-204`, because text and picture must agree |

Asked of Daily in the return: use **EST-204** as the viewing reference in the next recording. It reads
like an agency's own reference, which is what the order asks for, and it keeps the Estepona link that the
whole example rests on.

### 2.4 Shorter headlines, one repetition removed

| # | Key | Before | After EN | After ES |
|---|---|---|---|---|
| D-81 | `home.hero.h1` | "Answered when it arrives, not when someone is free" (50 characters, the longest on the page) | **Answered when it arrives** | **Respondida cuando llega** |
| D-82 | `home.hero.lead` | "A buyer writes on Sunday evening. Nuova answers in their language, records what she asked for, and leaves your team one task to finish." | A buyer writes on Sunday evening, when nobody is free. Nuova answers in their language, records what she asked for, and leaves your team one task to finish. | Un comprador escribe un domingo por la noche, cuando no hay nadie libre. Nuova responde en su idioma, registra lo que ha pedido y deja a tu equipo una tarea que terminar. |
| D-83 | `home.picture.h2` | "One enquiry, one record, one place" | **Nothing lives in three places** | **Nada vive en tres sitios** |

D-81 and D-82 together: the contrast that made yesterday's headline strong moves into the lead, where it
costs nothing, and the headline drops from 50 characters to 24. D-83 removes the third "one record" on
the same page while keeping the section's point.

### 2.5 The CRM wording, final

Replaces the interim wording the implementer set on 2026-10-01, which was correct and is now tightened.

| # | Key | Before (interim) | After EN | After ES |
|---|---|---|---|---|
| D-84 | CRM page `h1` | "The messages from your connected channels, on one record." | Your connected channels, on one record. | Tus canales conectados, en una sola ficha. |
| D-85 | CRM page lead | "A CRM is included from the start: every enquiry is recorded as a lead with what the customer asked for and the conversation so far." | A CRM is included from the start. Each enquiry becomes a lead with what the customer asked for and the conversation so far. | Hay un CRM incluido desde el principio. Cada consulta pasa a ser un lead con lo que ha pedido el cliente y la conversación hasta ahora. |
| D-86 | `onboarding.crm.nativeBody` | "Every enquiry becomes a lead with the person's contact details, what they are looking for and the conversation so far…" | Each enquiry becomes a lead with the contact details, what the person asked for and the conversation so far. Viewing requests become tasks for your team. Nothing to connect and nothing extra to pay. | Cada consulta pasa a ser un lead con los datos de contacto, lo que ha pedido la persona y la conversación hasta ahora. Las peticiones de visita pasan a ser tareas para tu equipo. No hay que conectar nada ni pagar nada más. |
| D-87 | CRM page, keep | the two-records limitation sentence | **unchanged**, it is the most useful sentence on the page | sin cambios |

### 2.6 The phone is not a sales surface

Checked on the delivered build: the phone appears on the home page only inside the FAQ answer ("No. A
phone assistant is being built and it is not part of what you can order today.") and on the platform
overview under "Being built". That is where it belongs, and no delta is needed. The one rule for the
rollout: **it never gets a card, an icon, a CTA or a position above a working module.**

---

## 3. What I read on `3d662e1`

All nine deltas of 0930 are in both languages: the hero, the one-record sentence, the platform lead, the
phone moved out of "On request", the 3D input and check, the Q&A fallback without a promise, the setup
step, the opening hours row gone from the readiness example, and the no-card sentence. The question box
is replaced by the checked FAQ, and the FAQ page renders the five groups with the questions in the order
this lane delivered them.

**One thing I missed on 2026-09-30 and the implementer caught.** My rendered check 2 read `/en`, `/es`,
`/en/platform` and `/en/trial`, and did not read the product sub-pages. The CRM page and the onboarding
CRM choice still carried "with its qualification" and "qualification and priority" at that point. The
implementer found it in a close-up check and set an interim wording from my own formula. §2.5 turns that
into the final wording. The lesson for my own checks is in the return: the route list must include the
product sub-pages and the onboarding strings, not only the pages a visitor lands on first.

---

## 4. Still owed

| # | Item | Who | What it blocks |
|---|---|---|---|
| 1 | `WEBQA_KB_ROW = faq-kb-v1.2` | Hosting with API | the question box staying off is the current mitigation; the backend row is still `faq-kb-v1.0` |
| 2 | A recording with **EST-204** | Daily | D-80. Until then site and clip both keep `REF-DEMO-204` |
| 3 | O-6 legal form, NIF, address | Owner | the four legal pages, and the Meta chain behind them |
| 4 | O-8 retention per class | Owner, then counsel | the retention section, and FAQ Q-44 stays as written |
| 5 | O-7 prices and the billing period | Owner, then API | every amount |
| 6 | CQ-2, CQ-13, CQ-16, CQ-20, CQ-21 | counsel | the pilot's e-mail channel, the deletion deadlines, the question box, the privacy page |
| 7 | Whether a priority value exists in production | Lead | the removed claims stay removed |
