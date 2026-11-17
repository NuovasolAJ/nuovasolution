# Copy → Redesign, 17.11. evening, v2: the target view shows the finished product

**This file replaces `COPY_TO_REDESIGN_1117_TARGET_PRODUCT_TEXTS_v1.md` completely.** v1 stays in the repo only as history.

**Order:** the owner's decisions of 17.11. on v1:
- (A) the owner's own hero;
- (E) the pilot carries the Growth scope;
- (B) lead generation means winning new clients;
- (D) unchanged.

**Due:** 17.11. 20:00. Redesign builds after the owner's YES on the draft pictures (Wed 10:00). The fixed build is Wed 18.11. 14:00.

**Status:**
- This is an editorial and technical check, not a legal approval and not a Meta approval.
- Every line is a **target** line and hangs on its key(s). The target picture and public availability stay apart: on the switch day, a key that is not in production gets "Próximamente" (`COPY_TO_REDESIGN_1116_EXAMPLE_WEEK_PROXIMAMENTE_v1.md` §1, PX-b/PX-s). "En preparación" is not used anywhere.
- Nothing below states a fact about production unless it says so.

**Rules kept:**
- tú form;
- short;
- no quotes from clients, no logos, no figures of real clients;
- example data fictional and marked;
- no portal names;
- no promise of a time, of availability or of a booking (owner KALENDER, 26.10.);
- **no guaranteed deals and no success figures** (owner, 17.11.).

**Nothing the owner likes is dropped.** The former hero h1 "Mientras enseñas, NuovaSolution atiende." stands under the title of "Un día con NuovaSolution" (§C). The former hero lead "Tus clientes reciben respuesta aunque estés en una visita…" stays in the code. It is used as the public fallback of the subline on the switch day (§A).

---

## 0. Instagram and social media (owner, 17.11.)

**What applies:**
- "Instagram (En preparación)" no longer applies. The target view shows Instagram and social media as finished functions.
- **Retired:**
  - Q-7 in `COPY_TO_REDESIGN_1116_PILOT14_TEXTS_v1.md`;
  - "Instagram stays out of the public view" in `COPY_TO_REDESIGN_1116_OWNER_LIST_TEXTS_v1.md` (`d861ef4`).

**Build:** `instagram` is in `HELD_BACK` (`claims.ts:142`), so `offered()` hides it in both views. In the target view it must read through `live()`. The same holds for `phoneAssistant`.

**Stays:**
- No post goes out without the agency's OK.
- No promise about Meta's own review.

---

## A. Hero (the owner's text)

| # | Element | ES | EN |
|---|---|---|---|
| H-h1 | h1 | Haz crecer tu inmobiliaria. No tu carga de trabajo. | Grow your agency. Not your workload. |
| H-sub | subline (target) | NuovaSolution capta clientes, responde consultas y hace seguimiento. Reactiva contactos, propone inmuebles y te muestra qué merece tu atención, para que tu negocio avance sin que todo dependa de ti. | NuovaSolution brings in clients, answers enquiries and follows up. It re-engages past contacts, suggests properties and shows you what deserves your attention, so your business moves forward without everything depending on you. |
| H-subP | subline, public fallback on the switch day while the growth keys are off | Tus clientes reciben respuesta aunque estés en una visita, y lo que piden te espera ordenado en su ficha. | Your clients get a reply even while you are at a viewing, and what they ask for is waiting for you on their record. |

**What H-sub hangs on:**

| Clause | Keys |
|---|---|
| capta clientes | G-1 keys, §B |
| responde consultas | `replyWhatsapp`, `replyEmail` (in production) |
| hace seguimiento | `followup` |
| reactiva contactos | G-2 |
| propone inmuebles | `matching` |
| te muestra qué merece tu atención | `priorityWithReason` (in production), plus `taskList`/`dailyVoice` |

On the switch day, if `followup`, `matching` or the G-1 keys are off, the subline falls back to H-subP. A subline with "próximamente" in the middle would read badly in a hero.

**EN choices:**
- "brings in clients" for "capta clientes": it describes a function, not a promise of a number.
- "re-engages past contacts" for "reactiva contactos": "reactivates" reads like a technical term in English.

The button and the pilot lines under it stay as they are (`home-1103.ts:34–37`).

---

## B. "Todo lo que hace por tu agencia"

**Structure: ONE new section** from the existing card parts (the owner's protective rule). It has two blocks, plus the day story (§C) inside it.

### B.1 The growth block (lead generation = winning new clients)

| # | Element | ES | EN |
|---|---|---|---|
| G-h | main statement | Nuevos clientes. Contactos que vuelven. Más oportunidades para tu agencia. | New clients. Contacts who come back. More opportunities for your agency. |
| G-d | line after the three cards (shortened, owner 17.11.) | Cada mañana, qué oportunidades piden tu atención. | Every morning, which opportunities need your attention. |
| G-m | mark on each example | Ejemplo · datos ficticios | Example · fictional data |

| # | Title ES (≤ 5 words) | Title EN | Sentence ES | Sentence EN | Phone ES | Phone EN |
|---|---|---|---|---|---|---|
| G-1 | Gana nuevos clientes | Win new clients | Tus publicaciones, anuncios y formularios atraen a compradores y a propietarios que quieren vender. Cada comentario o mensaje directo se convierte en una consulta con su ficha. | Your posts, ads and lead forms draw in buyers and owners who want to sell. Every comment or direct message becomes an enquiry with its own record. | De un comentario a una consulta. | From a comment to an enquiry. |
| G-2 | Reactiva tus contactos | Bring contacts back | Cuando entra un inmueble que encaja o hay un motivo nuevo, volvemos a escribir a tus antiguos interesados y clientes, con su permiso. | When a listing that fits comes in, or there is a new reason to get in touch, we write again to your past enquirers and clients, with their permission. | Tus contactos de siempre, otra vez activos. | Your past contacts, active again. |
| G-3 | Del interés a la oportunidad | From interest to opportunity | Responde, aclara qué busca cada cliente, le propone inmuebles que encajan y, con su permiso, hace seguimiento. | It replies, finds out what each client is looking for, suggests listings that fit and, with their permission, follows up. | Cada interesado, con su siguiente paso. | Every lead, with its next step. |

**Examples** (3 compact lines each; fictional; no portal or network name in the text, "Instagram" only where the target function names it):

| # | Line 1 ES | Line 2 ES | Line 3 ES | Line 1 EN | Line 2 EN | Line 3 EN |
|---|---|---|---|---|---|---|
| G-1 | Formulario de tu anuncio «¿Cuánto vale tu casa?»: Isabel, casa en Mijas | Respuesta al momento y una pregunta: «¿Cuántos metros tiene, más o menos?» | Ficha nueva: propietaria · Mijas · quiere vender · pide valoración | The form on your ad "What is your home worth?": Isabel, house in Mijas | An instant reply and one question: "Roughly how many square metres is it?" | New record: owner · Mijas · wants to sell · asks for a valuation |
| G-2 | Javier escribió en marzo: ático en Benalmádena, hasta 280.000 € | Hoy entra un ático en Benalmádena, 275.000 € | Le escribimos, con su permiso: «¿Sigues buscando?» · Javier: «Sí, ¿cuándo puedo verlo?» | Javier wrote in March: penthouse in Benalmádena, up to €280,000 | Today a penthouse in Benalmádena comes in, €275,000 | We write to him, with his permission: "Still looking?" · Javier: "Yes, when can I see it?" |
| G-3 | Laura pregunta por un piso en Estepona · respuesta al momento y una pregunta | Le proponemos 2 pisos que encajan: 2 dormitorios, hasta 320.000 € | No contesta en dos días · seguimiento con su permiso · pide visita | Laura asks about a flat in Estepona · an instant reply and one question | We suggest 2 flats that fit: 2 bedrooms, up to €320,000 | No reply in two days · a follow-up with her permission · she asks for a viewing |

**Notes on the growth examples:**
- **G-1:** the reply to "¿Sigue disponible?" confirms nothing. A person confirms availability (the rule of every reply, `COPY_TO_REDESIGN_1117_DEMO_REPLIES_PLAN_BUTTONS_v1.md` §1.1).
- **G-1 shows a SELLER (owner, 17.11.):** an owner who wants to sell comes in through the form on an ad. It runs on `adsLeads`, Growth, so it is part of the pilot.
  - **Isabel** is a new fictional person. Carmen stays the e-mail seller of the demo and the example week.
  - **The question** is the same as in Carmen's demo reply (metres for the valuation, `COPY_TO_REDESIGN_1117_DEMO_REPLIES_PLAN_BUTTONS_v1.md` §1.2).
  - **Replaced:** the buyer example (comment, direct message), 17.11. It was a draft line that was never on the page. The comment/DM route stays in G-1's sentence.
- **G-2 and G-3:** "con su permiso" is in the sentence and in the example, and it is required. Writing to past contacts again needs their consent. Copy writes no line that suggests otherwise. Whether the consent of an earlier enquiry covers this is counsel's question, not Copy's (added to §F).
- **The "suggests" in G-3** is made by the system and sent by the agency, or with the client's permission. Nothing is offered as available.
- **No figure of success anywhere.** "Más oportunidades" is the owner's main statement. It names no number and promises no deal.

### B.2 Mapping each service to the existing register (`lib/claims.ts`)

| Service | Planned function scope | Key(s) in the register | State in the register today | Plan in the register (`planRows`) |
|---|---|---|---|---|
| **G-1** new clients | property posts on social media | `instagram` (social_posting) | soon: staging, never published at Meta | **Enterprise** |
| | ads and connected lead forms (portals, ads, the ad's form) | `adsLeads` (ad_leads) | soon: staging, no real delivery | Growth, Enterprise |
| | the agency's own web form | `webform` | soon: prototype | not a plan row today |
| | **comments and direct messages → qualified enquiry** | **no key today.** Proposed: `socialInbox` (comments and DMs answered and turned into an enquiry with its record) | **not in the register.** Copy cannot confirm a lane that builds it | proposed: with `instagram` |
| **G-2** bring contacts back | a listing that fits a past contact | `matching` | soon: pm_certified = false | Growth, Enterprise |
| | a new reason to get in touch, with permission | `followup` (with the occasion of a plan, backend "plan_occasion") | soon: prod sender inactive | Growth, Enterprise |
| **G-3** interest to opportunity | reply and one question | `replyWhatsapp`, `replyEmail` | **included** (production 13.11.) | every plan |
| | find out the need, priority with its reason | `crm`, `priorityWithReason` | **included** | every plan |
| | suggest listings that fit | `matching` | soon | Growth, Enterprise |
| | follow up with permission | `followup` | soon | Growth, Enterprise |
| **G-d** daily assistant | what needs attention today | `taskList`, `dailyVoice` | soon | Growth, Enterprise |

**What follows for the plan chips:**
- G-2, G-3 and G-d sit in the free pilot (Growth scope, §E).
- **G-1 is split.** Ads and lead forms are Growth. Posts, comments and DMs are Enterprise in the register. So the Growth pilot does not test the social part of G-1.
- **Decided 17.11. by the owner:** `instagram` stays on Enterprise. It is decided again together with the prices. G-1's chip reads "Desde Growth · redes sociales en Enterprise" / "From Growth · social media on Enterprise".

**Plan chips:**

| Card | ES | EN |
|---|---|---|
| G-2, G-3, G-d | Desde Growth | From Growth |
| G-1 | Desde Growth · redes sociales en Enterprise | From Growth · social media on Enterprise |

**Switch day:** every card whose keys are all off gets PX-b and its PX-s sentence ("Gana nuevos clientes: próximamente." etc.). A card whose keys are partly in production keeps the sentence only if the sentence stays true for the part that is on. Otherwise it gets PX. G-3 is the only card with keys in production today (reply, record, priority).

### B.3 The other cards (unchanged from v1, renumbered; the folded ones named)

Folded into the growth block, so they are not separate cards any more. Their substance stays:

| v1 card | Folded into |
|---|---|
| T-1 Seguimiento hasta que contesta | G-3 (and G-2) |
| T-3 Inmuebles que encajan, siempre | G-2 and G-3 |
| T-5 Todos tus leads, atendidos | G-1 |
| T-7 Publicaciones para tus redes | G-1 |

Its approval step ("Tú la apruebas") moves into G-1's scope: no post goes out without the agency's OK.

**The cards that stay, in selling order after the growth block:**

| # | Key(s) | Title ES | Title EN | Sentence ES | Sentence EN | Phone ES | Phone EN | Plan chip |
|---|---|---|---|---|---|---|---|---|
| T-2 | `phoneAssistant` | Atiende el teléfono por ti | Answers the phone for you | Cuando estás en una visita, el asistente coge la llamada, anota qué busca y te deja la tarea. | When you're at a viewing, the assistant takes the call, notes what they want and leaves you the task. | Ninguna llamada perdida en una visita. | No call missed during a viewing. | Desde Growth · From Growth |
| T-4 | `taskList`, `dailyVoice` | Cada mañana, el día claro | Every morning, a clear day | Cada mañana, cada persona del equipo sabe qué tiene que hacer hoy y con quién. | Every morning, everyone on the team knows what to do today and with whom. | Tu día, ordenado a las 8:30. | Your day, sorted by 8:30. | Desde Growth · From Growth |
| T-8 | `reportInLogin`, `weeklyEmail` | Tu semana, en un informe | Your week, in one report | Cada lunes ves qué entró, qué sigue abierto y qué hacer esta semana. | Every Monday you see what came in, what is still open and what to do this week. | Qué entró y qué hacer. | What came in and what to do. | Todos los planes · Every plan |
| T-6 | `model3d` | Tu plano, en 3D | Your floor plan, in 3D | Convertimos tu plano en un modelo 3D, vacío y amueblado, con imágenes para tus anuncios. | We turn your floor plan into a 3D model, empty and furnished, with images for your listings. | Del plano a imágenes de anuncio. | From floor plan to listing images. | Opcional, con cualquier plan · Optional, with any plan |

**Examples:**

| # | Line 1 ES | Line 2 ES | Line 3 ES | Line 1 EN | Line 2 EN | Line 3 EN |
|---|---|---|---|---|---|---|
| T-2 | 11:39 · Álvaro llama · estás en una visita | Atendida · la villa de Elviria, precio y margen | Tarea: devolver la llamada a partir de las 16:00 | 11:39 · Álvaro calls · you're at a viewing | Answered · the villa in Elviria, price and room to negotiate | Task: call back from 16:00 |
| T-4 | 08:30 · Buenos días, Marta. Hoy, 3 cosas: | Proponer fecha a los Keller · Devolver la llamada a Álvaro, desde las 16:00 | Enviar a Sofía lo disponible en alquiler | 08:30 · Good morning, Marta. Today, 3 things: | Propose a date to the Kellers · Call Álvaro back, from 16:00 | Send Sofía what's available to rent |
| T-8 | Lunes 08:00 · 25 consultas, 25 respondidas | 9 con la oficina cerrada · 4 visitas acordadas | Esta semana: proponer fecha a las 2 visitas pendientes | Monday 08:00 · 25 enquiries, 25 answered | 9 with the office closed · 4 viewings agreed | This week: propose a date for the 2 open viewings |
| T-6 | Plano: plano-estepona.pdf | Modelo vacío y amueblado | Imágenes para anuncios y redes · marcadas como visualización | Plan: plano-estepona.pdf | Model, empty and furnished | Images for listings and social media · marked as a visualisation |

**Two things about these cards:**
- **T-4 stays (owner, 17.11.).** G-d was shortened to one line, so the two do not repeat each other: G-d names the opportunities, and T-4 is the team's day with its example.
- **The switch day:**

| Card | Switch-day wording |
|---|---|
| T-2 | PX "Atiende el teléfono por ti: próximamente." |
| T-4 | PX "Cada mañana, el día claro: próximamente." |
| T-6 | "Opcional · próximamente" |
| T-8 | keeps its sentence: the report is in production, and the sentence names no e-mail |

"Y además" (K1, K2) stays as it is.

---

## C. "Un día con NuovaSolution" (unchanged from v1)

| # | Element | ES | EN |
|---|---|---|---|
| D-t | title | Un día con NuovaSolution | A day with NuovaSolution |
| D-s | line under the title (the hero's former h1, kept) | Mientras enseñas, NuovaSolution atiende. | While you show a home, NuovaSolution answers. |
| D-1 | 08:30 (`taskList`, `dailyVoice`) | Marta abre su resumen: sabe qué toca hoy y con quién. | Marta opens her summary: she knows what's on today and with whom. |
| D-2 | 11:39 (`phoneAssistant`) | Marta está en una visita; el asistente atiende la llamada de Álvaro y le deja la tarea. | Marta is at a viewing; the assistant takes Álvaro's call and leaves her the task. |
| D-3 | 13:20 (`reminders`) | Nadie ha cogido la visita de Laura: Carlos recibe el aviso y la coge. | Nobody has taken Laura's viewing: Carlos gets the notice and takes it. |
| D-4 | 16:00 (`matching`, `instagram`) | Entra un piso nuevo en Estepona: encaja con Laura y su publicación para redes espera tu visto bueno. | A new flat comes in in Estepona: it fits Laura, and its social media post waits for your OK. |
| D-5 | 18:00 (`followup`) | Sofía no ha contestado: recibe un seguimiento, con su permiso. | Sofía hasn't replied: she gets a follow-up, with her permission. |
| D-6 | 23:40 (`replyOutOfHours`) | Llega una consulta con la oficina cerrada: respuesta al momento, y mañana a las 8:30 está en tu resumen. | An enquiry arrives with the office closed: an instant reply, and tomorrow at 8:30 it's in your summary. |
| D-m | mark | Ejemplo · nombres ficticios | Example · fictional names |
| D-c | compact form (inside the section, if the owner prefers one line) | 08:30 tu día · 11:39 llamada atendida · 13:20 aviso · 16:00 piso que encaja · 18:00 seguimiento · 23:40 respuesta de noche | 08:30 your day · 11:39 call answered · 13:20 notice · 16:00 a listing that fits · 18:00 follow-up · 23:40 a night-time reply |

**Switch day:** a station whose key is off gets its PX-s wording. If more than two stations would be "Próximamente", Copy recommends showing only the live stations.

---

## D. Profitability line (unchanged; placeholder until the owner sets prices)

| # | ES | EN |
|---|---|---|
| R-1 | Desde {precio} al mes. Una sola consulta que no se pierde puede valer una comisión entera. | From {precio} a month. A single enquiry that isn't lost can be worth a whole commission. |
| R-2 (alternative) | {precio} al mes: menos que una comisión que se escapa. | {precio} a month: less than one commission that slips away. |

**Recommendation: R-1.**

**Rules:**
- R-1/R-2 are **not rendered in either view** until {precio} is set.
- Never a raw "{precio}" on the page.
- Copy checks R-2 against the real price.

---

## E. The pilot: 14 days with the Growth scope (owner, 17.11., replaces v1 §E)

**The rule:**
- The free 14-day pilot carries **everything in Growth**, so the agent tests the strong functions.
- "Empieza 14 días gratis" stands under **Essential and Growth**. Both start the same pilot.
- After it, the agent chooses the plan.
- **Enterprise** has only "Contratar directamente".

**Plan buttons:**

| Plan | Way 1 | Line under it | Way 2 | Line under it |
|---|---|---|---|---|
| Essential, Growth | **black** "Empieza 14 días gratis" / "Start 14 days free" | 14 días gratis, sin tarjeta / 14 days free, no card (the owner's words, unchanged; the Growth scope is said in the line above the plans) | outlined "Contratar directamente" / "Go straight to a plan" | Te respondemos en 24 h laborables, con las condiciones por escrito. / We reply within 24 working hours, with the terms in writing. |
| Enterprise | **black** "Contratar directamente" / "Go straight to a plan" | Te respondemos en 24 h laborables, con las condiciones por escrito. / We reply within 24 working hours, with the terms in writing. | — | — |

**The form:**
- **Subject of the pilot form (B-pilot), fixed:** "Piloto gratuito · 14 días con Growth" / "Free pilot · 14 days with Growth". It replaces "Piloto gratuito · plan {Plan}" (`4194eab`) and v1's "plan Essential".
- `app/[locale]/contact/page.tsx:39` must use this one subject for every pilot link, Essential or Growth. Enterprise has no pilot link.
- **B-aria:**
  - Essential: "Empieza 14 días gratis desde Essential" / "Start 14 days free from Essential".
  - Growth: "Empieza 14 días gratis desde Growth" / "Start 14 days free from Growth".
  - "Contratar {Plan} directamente" stays for all three plans.

**Lines that change** (file:line on today's HEAD):

| Where | Today | New ES | New EN |
|---|---|---|---|
| `lib/content/home-1103.ts:479` (line above the plans) | Todos los planes pueden empezar con un piloto gratuito de 14 días. | El piloto gratuito de 14 días incluye todo lo de Growth. Después eliges tu plan; Enterprise lo contratas directamente. | The free 14-day pilot includes everything in Growth. Then you choose your plan; Enterprise you hire directly. |
| the phone's core line of the plans (= PK-0) | Todos los planes pueden empezar … | 14 días gratis con todo lo de Growth, sin tarjeta. | 14 days free with everything in Growth, no card. |
| `lib/i18n/dictionaries/es.ts:375` / `en.ts:410` (/packages lead) | Cualquier plan puede empezar con 14 días de piloto, gratis … | Empieza con 14 días de piloto con todo lo de Growth, gratis y con nuestro acompañamiento, y 7 días más si nos das tu opinión. Después eliges tu plan; el precio te lo explicamos antes de acordar nada. Enterprise lo contratas directamente. | Start with a 14-day pilot with everything in Growth, free and with our support, and 7 more days if you give us your feedback. Then you choose your plan; we explain the price before anything is agreed. Enterprise you hire directly. |
| `lib/content/faq.ts:193–194` (the pilot answer) | Usas NuovaSolution en tu agencia durante 14 días, gratis … | Usas NuovaSolution en tu agencia durante 14 días, con todo lo de Growth, gratis y con nuestro acompañamiento. Al final te pedimos tu opinión; si nos la das, el piloto sigue 7 días más. Después eliges tu plan. No pedimos método de pago. Antes de empezar te confirmamos por escrito qué está activo y las condiciones. | You use NuovaSolution in your agency for 14 days, with everything in Growth, free and with our support. At the end we ask for your feedback; if you give it, the pilot runs 7 more days. Then you choose your plan. We ask for no payment method. Before you start, we confirm in writing what is active and the terms. |
| `lib/i18n/dictionaries/es.ts:415` / `en.ts:453` `trialBadgeAligned` "14 días gratis" (D-22: Essential card only) | not rendered anywhere (Redesign, 17.11.) | **no change, no extra chip**: "14 días gratis, sin tarjeta" under the button on Essential and Growth does the job | same |
| `COPY_TO_REDESIGN_1116_OWNER_LIST_TEXTS_v1.md` §4 PK-0/PK-lead, `COPY_TO_REDESIGN_1116_PILOT14_TEXTS_v1.md`, v1 §E of this file | the "todos / cualquier plan" lines and "Essential only" | **superseded by this §E** | |

**Flagged, not a text change.** `es.ts:680` / `en.ts:729` ("Tu prueba tiene el alcance de Essential durante 14 días", D-67) and `lib/plans.ts:70` describe the **self-service trial in the app**, which API aligned to Essential (R26, TRIAL_PLAN_ALIGNED on staging). If the pilot now runs on Growth:
- API sets the pilot's scope to Growth;
- only then does this app line change, to "Tu piloto tiene el alcance de Growth durante 14 días. Lo que incluye tu plan después se acuerda contigo antes de firmar nada." / "Your pilot carries the Growth scope for 14 days. What your plan includes afterwards is agreed with you before anything is signed.";
- until API confirms, the app line stays. It is not on the public website.

**Checked, and they stay:**
- the hero pilot line `home-1103.ts:36–37` / `claims.ts:210`;
- "Solicita tu piloto gratuito";
- `pilot-request.ts:16–18`, `:65`;
- "Cómo empezar" `home-1103.ts:529–542`;
- `:451–452`;
- `:597`;
- `es.ts:264–265` (true: you start free, then choose);
- `:494` (3D).

**The plan chips on the cards stay** (owner). "Desde Growth" now reads as "in your pilot".

---

## F. Open
- **Decided 17.11. evening by the owner:**
  - (1) `instagram` stays on Enterprise, to be decided again with the prices;
  - (2) G-1 shows a seller;
  - (3) T-4 stays, and G-d is shortened.
- **New timeline (owner, 17.11.):** Redesign is paused until Thu 19.11. 20:00. The draft pictures for (16) follow on Fri 20.11., and RV6 measures after that.
- **Owner/API:** a key for comments and direct messages (`socialInbox`) and the lane that builds it. Until then G-1's DM clause is target only and gets PX on the switch day.
- **API:** the pilot's scope = Growth in the product (the app line `es.ts:680`).
- **Counsel:** whether the consent of an earlier enquiry covers writing again for reactivation (G-2), or whether a separate opt-in is needed. Copy keeps "con su permiso" either way.
- **Owner:** {precio}.
