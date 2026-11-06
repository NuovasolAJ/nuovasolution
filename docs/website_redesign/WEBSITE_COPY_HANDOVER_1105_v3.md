# WEBSITE COPY HANDOVER 1105 v3 — the only text source for the website, ES and EN

**For:** the redesign chat, the only writer of the website code. **This file replaces `WEBSITE_COPY_HANDOVER_1102_v2.md`**
(`0a5370e`), which is marked superseded. It is complete on its own: every text the home page, the example report, the plans and
the footer need is here; the legal lines and the detail-page rows from v2 are carried over (§11, appendix).

**Basis:**
- the owner's verdict on `faf2dbb` of 05.11. (direction accepted, not yet 10/10): pictures D01–D12 in
  `governance/evidence/website_owner_review_1105/`, PROMPTS_R26 §24, §25b (the audit's own errors: Growth "El más completo",
  "Tu equipo: solo atender la visita");
- API's register `governance/API_CLAIMS_LINES_1102_v1.md` (`25a6382`);
- API's product card `API_PRODUKTKARTE_1026_v1.md`: Q-3 language detection and Gmail labels in production;
- Hosting's W44 signal `5121cf3`: weekly mail proven for our own agency only;
- **addition 05.11.:** API's `governance/ERSTE_FREMDE_AGENTUR_1105_v1.md` (`3d97372`). "Incluido" in production only for what an
  invited external agency can use (§1b, §13).

**Read on:** `faf2dbb` / `dpl_FnoR4QFTNPg1E9ws4g28gj2FdzkC`, through its fixed URL, 05.11., GET only.

**Rules:**
- the brand is **NuovaSolution** everywhere in visible text (not "Nuova");
- status words come from §1 only;
- no prices, no popularity claim, no "Disponible" per plan;
- a figure appears only with a definition; a new figure or a language claim appears only with current product evidence, otherwise
  it is marked as an example or "Próximamente".

**Marking:** editorial and technical. **Not a legal approval, not a Meta approval. No publication released.**

---

## 1. The central status file (one source for every status on the site)

**Two status words** for functions, plus one for the plans table:

| Word ES | Word EN | Means | Used where |
|---|---|---|---|
| **Incluido** | **Included** | works today and the register allows saying so | everywhere |
| **Próximamente** | **Coming soon** | built or planned, not yet covered by evidence in production | everywhere; replaces "En preparación", "Prototipo", "Implementado; todavía sin activar" |
| **No incluido** | **Not included** | the plan does not contain it | plans table only |

| Key | Function ES | Function EN | Status | Note ES (optional, short) | Note EN | Register / evidence | Turns into "Incluido" when |
|---|---|---|---|---|---|---|---|
| `replies` | Respuestas por WhatsApp y email | Replies on WhatsApp and e-mail | **Incluido** | en español, también fuera de horario | in Spanish, also out of hours | Channels: WhatsApp (own agency), Gmail **P** | — |
| `wa_own_number` | WhatsApp con el número de tu agencia | WhatsApp with your agency's own number | **Próximamente** | | | WhatsApp only our own number | multi-agency WhatsApp path passed |
| `language_detect` | Detección del idioma | Language detection | **Incluido** | si no es español, no se envía nada automáticamente | if it is not Spanish, nothing is sent automatically | Q-3: prod records the mismatch | — |
| `other_languages` | Respuestas en otros idiomas | Replies in other languages | **Próximamente** | | | Languages: Spanish in prod, EN on staging | owner SPRACHEN S2 + v3 in prod |
| `record` | Ficha en el CRM integrado | Record in the built-in CRM | **Incluido** | | | CRM **P** | — |
| `priority` | Prioridad con motivo en la ficha | Priority with its reason on the record | **Incluido** | | | owner 05.11.; qualification active in prod | — |
| `alert` | Aviso a la persona que toca | Alert to the right person | **Próximamente** | | | Alarm: held back in prod (HA1) | V3-DEPLOY + prod probe with a real alert |
| `origin` | Canal de origen en la ficha | Channel of origin on the record | **Incluido** | WhatsApp o email | WhatsApp or e-mail | channels **P** | — |
| `ad_leads` | Leads de portales y anuncios | Leads from portals and ads | **Próximamente** | | | ad leads: staging, no real delivery | E2E with a real delivery |
| `labels` | Etiquetas en el buzón | Labels in the mailbox | **Incluido** | en el buzón que operamos para ti | in the mailbox we operate for you | Gmail labels **P**, one mailbox | — |
| `one_record_per_person` | Una ficha por persona entre canales | One record per person across channels | **Próximamente** | | | not yet | Lead's proof on v3 + V3-DEPLOY |
| `matching` | Inmuebles que encajan | Listings that fit | **Próximamente** | | | `pm_certified = false` | certification in prod |
| `followup` | Seguimiento con permiso | Follow-up with permission | **Próximamente** | | | prod sender inactive | E-FU real + status return |
| `team_list` | Lista de tareas del equipo | Team task list | **Próximamente** | | | Release U after E1 | Release U in prod |
| `daily_voice` | Pregúntale "¿Qué tengo hoy?" | Ask "What do I have today?" | **Próximamente** | | | staff app staging (DAILY-A) | Release U + owner |
| `report_login` | Informe en el acceso de tu agencia | Report in your agency's login | **Incluido** | | | report access in prod | — |
| `report_mail` | Resumen semanal por email | Weekly e-mail summary | **Próximamente** | | | W44: own agency only | REPORT-AKTIV for agencies |
| `report_extended` | Informe con evolución, canales y conclusiones | Report with trend, channels and insights | **Próximamente** | | | extended tier empty in prod | extended report in prod |
| `social_posting` | Publicar en Instagram | Posting on Instagram | **Próximamente** | | | Social: staging, never published at Meta | Meta app approved + real post |
| `phone` | Asistente telefónico | Phone assistant | **Próximamente** | | | staging prototype | Voice PASS + owner |
| `crm_external` | HubSpot, Pipedrive, Zoho, Salesforce, Outlook | HubSpot, Pipedrive, Zoho, Salesforce, Outlook | **Próximamente** | | | not in prod | certified connection per provider |
| `model3d` | Modelos 3D | 3D models | **Próximamente** | | | T6 not accepted | T6 + scope and price per order |
| `signup` | Registro y prueba de 14 días | Registration and 14-day trial | **Próximamente** | | | not released | owner registration line + E28-Prod |

### 1b. Prod go-live: "Incluido" only for what an invited **external** agency can use in production

**Owner, 05.11. (addition to v3):**
- "Incluido" applies only to what an invited agency other than nuovasolution can use in production.
- The basis is `governance/ERSTE_FREMDE_AGENTUR_1105_v1.md` (API repo, `3d97372`).
- The direct mailbox connection of an agency (owner D5-DIREKT) **is not built**.
- **On the preview** the statuses of §1 may stay as they are.
- **Before the production go-live**, the Reviewer checks every "Incluido" against the condition below. A row whose condition is not
  met shows **"Próximamente"** in production.

What the table states today:
- **Production knows exactly one tenant until V3-DEPLOY.**
- **Mail of an external agency does not arrive in production at all yet** (K5): production reads the one Gmail account of
  nuovasolution.
- The single-mailbox guard (D5) is live since 05.11. 13:40Z.
- Release U is in production since 05.11. 13:32Z.

| Key | Condition for "Incluido" in production (external agency) | Table row |
|---|---|---|
| `replies` (email part) | **the agency's mailbox connected in production (D5)**, route A or B built and tested with a test mailbox of the agency; V3-DEPLOY; an approved ES notice for the agency (K4) | K5, K4 |
| `replies` (WhatsApp part) | the agency's own number registered and routed (K1–K3), M1–M10 green, Meta approvals; V3-DEPLOY | K1–K3 |
| `origin` | **the agency's mailbox connected in production (D5)** for e-mail; K1–K3 for WhatsApp; V3-DEPLOY | K5, K2 |
| `language_detect` | **the agency's mailbox connected in production (D5)** for e-mail; K2 for WhatsApp; V3-DEPLOY | K5, F7 |
| `labels` | **the agency's mailbox connected in production (D5)**, with labels in **that** mailbox (route A); route B has no agency mailbox to label | K5 |
| every other function at the agency's mail intake (reply by e-mail, attachments, held reply) | **the agency's mailbox connected in production (D5)** | K5 |
| `record`, `priority` | V3-DEPLOY; ONBOARDING-PROD (F1); tenant isolation green after cleaning the 13 rows (F12); one channel connected (D5 or K1–K3) | F1, F12 |
| `report_login` | ONBOARDING-PROD; report entitlement for the agency (B1) | F1, B1 |
| `team_list`, `daily_voice` | V3-DEPLOY + ONBOARDING-PROD; staff access for the agency (Release U is in production since 05.11.) | F2, B2 |

**No "Gmail verbinden" / "Conecta tu Gmail" / "conectamos los canales contigo" anywhere** while D5 is not built (§13).

---

## 2. Hero

| Element | ES | EN |
|---|---|---|
| Eyebrow | Para agencias inmobiliarias en España | For real estate agencies in Spain |
| H1 | Mientras enseñas, NuovaSolution atiende. | While you show a home, NuovaSolution answers. |
| Benefit line | Tus clientes reciben respuesta aunque estés en una visita, y lo que piden te espera ordenado en su ficha. | Your clients get a reply even while you are at a viewing, and what they ask for is waiting for you on their record. |
| Chip 1 | Responde en español, también fuera de horario | Replies in Spanish, also out of hours |
| Chip 2 | Guarda zona, presupuesto e intención | Keeps area, budget and intent |
| Chip 3 | Marca la prioridad y su motivo | Marks the priority and its reason |
| Primary action | Ver la demo | See the demo |
| Secondary action | Pedir acceso | Request access |
| Line under the actions | Acceso por invitación mientras preparamos el registro público. | Access by invitation while public registration is being prepared. |

**Chip 3 replaces "Tu equipo ve la prioridad y el siguiente paso".** The register puts the staff surface on staging, so "ve" says
too much. The priority itself is on the record (`priority`, Incluido). "…y avisa a tu equipo" returns only after V3-DEPLOY and an
alert probe (§12).

---

## 3. The WhatsApp demo

| Element | ES | EN |
|---|---|---|
| Channel hint | Elige un canal | Choose a channel |
| Tabs | WhatsApp · Email · Formulario web · Teléfono | WhatsApp · Email · Web form · Phone |
| Mark on the last two | Próximamente | Coming soon |
| Chat header | Laura · WhatsApp | Laura · WhatsApp |
| Laura | Hola, soy Laura. Busco un piso de 2 dormitorios en Estepona, hasta 320.000 €. ¿Podría ver alguno la semana que viene? | Hi, I'm Laura. I'm looking for a 2-bedroom flat in Estepona, up to €320,000. Could I see one next week? |
| Sender label (the one automation mark) | Asistente automático de la agencia | The agency's automated assistant |
| **Reply** | ¡Hola, Laura! Gracias por escribirnos. Apunto Estepona, 2 dormitorios y hasta 320.000 €, y que te gustaría ver pisos la semana que viene. ¿Lo buscas para vivir todo el año o como segunda residencia? | Hi Laura, thanks for writing to us. I've noted Estepona, 2 bedrooms, up to €320,000, and that you'd like to see flats next week. Is it for living in all year or a second home? |
| Record title | Ficha de Laura | Laura's record |
| Fields | Intención: compra · Zona: Estepona · Dormitorios: 2 · Presupuesto: hasta 320.000 € · Idioma: español · Canal: WhatsApp · Visita: la pide para la semana que viene | Intent: buying · Area: Estepona · Bedrooms: 2 · Budget: up to €320,000 · Language: Spanish · Channel: WhatsApp · Viewing: asked for next week |
| Priority | Prioridad alta · pide zona, presupuesto y visita | High priority · names area, budget and a viewing |
| Next step | Siguiente paso: una persona de tu equipo le propone día y hora. | Next step: someone on your team proposes a day and time. |
| Small line | Una petición de visita no es una cita: la confirma una persona. | A viewing request is not an appointment: a person confirms it. |
| Demo label | Demo con datos ficticios | Demo with fictional data |
| Replay | Repetir demo | Replay demo |

**The reply:**
- no availability promise ("hay", "disponible", "te lo enseño" are not used);
- no contact promise ("te llamamos", "se pondrá en contacto"), because by the audit's E-c that only goes live with V3 and Release
  U;
- one question back, in the agency's voice;
- the words "enviado" and "entregado" do not appear (owner D01: no ticks at 11:20/11:21).

The previous reply ("¿Ya tienes la financiación resuelta o te ayudamos a valorarlo?") offered financing help nobody provides.

---

## 4. Cómo funciona — the work done, and the human step that remains

| | ES | EN |
|---|---|---|
| Eyebrow | Cómo funciona | How it works |
| H2 | De la consulta a tu equipo, con el trabajo previo hecho. | From the enquiry to your team, with the groundwork done. |
| Step 1 title | Llega la consulta | The enquiry arrives |
| Step 1 line | Por WhatsApp o email, a cualquier hora. | On WhatsApp or e-mail, at any hour. |
| Step 2 title | NuovaSolution responde | NuovaSolution replies |
| Step 2 line | En español, con una pregunta útil de vuelta. | In Spanish, with one useful question back. |
| Step 3 title | La ficha se completa | The record fills in |
| Step 3 line | Zona, presupuesto, idioma, prioridad y su motivo. | Area, budget, language, priority and its reason. |
| Step 4 title | Tu equipo continúa | Your team takes over |
| Step 4 line | Llamar, acordar la cita y enseñar el inmueble: eso lo hace una persona. | Calling, agreeing the appointment and showing the property: a person does that. |

**Replaces** "sin que nadie esté pendiente" and any form of "solo atender la visita". Calling back, agreeing and confirming the
appointment and the viewing all remain human steps. The step-4 line now names them.

---

## 5. Lo que tu agencia gana — results and the new scenes

| | ES | EN |
|---|---|---|
| Eyebrow | Lo que tu agencia gana | What your agency gains |
| H2 | Cada consulta, atendida y en su sitio. | Every enquiry, answered and in its place. |
| Scene hint | Elige una escena | Choose a scene |

Each scene has a title, one line, a status from §1, and its product cut-out. The statuses come only from §1.

| # | Title ES | Line ES | Status (key) | Title EN | Line EN |
|---|---|---|---|---|---|
| 1 | Leads importantes, con motivo | La ficha marca la prioridad y por qué. El aviso a la persona que toca llega próximamente. | **Incluido** (`priority`) · aviso: **Próximamente** (`alert`) | Important leads, with a reason | The record marks the priority and why. The alert to the right person is coming soon. |
| 2 | Consultas respondidas | En español, por WhatsApp y email, también fuera de horario. | **Incluido** (`replies`) | Enquiries answered | In Spanish, on WhatsApp and e-mail, also out of hours. |
| 3 | Lo importante, guardado | Zona, presupuesto, idioma y lo que pide quedan en su ficha, en el CRM integrado. | **Incluido** (`record`) | What matters, kept | Area, budget, language and what they ask for stay on their record, in the built-in CRM. |
| 4 | De dónde llega cada consulta | La ficha guarda el canal de origen. Portales y anuncios, próximamente. | **Incluido** (`origin`) · portales y anuncios: **Próximamente** (`ad_leads`) | Where each enquiry comes from | The record keeps the channel of origin. Portals and ads, coming soon. |
| 5 | El idioma de cada cliente | NuovaSolution detecta el idioma y lo guarda. Hoy responde en español; en otro idioma no se envía nada automáticamente. | **Incluido** (`language_detect`) · otros idiomas: **Próximamente** (`other_languages`) | Each client's language | NuovaSolution detects the language and keeps it. Today it replies in Spanish; in another language nothing is sent automatically. |
| 6 | Tu buzón, ordenado | Cada correo llega con su etiqueta: visita, valoración, alquiler. | **Incluido** (`labels`), en el buzón que operamos para ti | Your inbox, sorted | Every e-mail arrives with its label: viewing, valuation, rental. |
| 7 | Inmuebles que encajan | NuovaSolution compara lo que busca el cliente con tu cartera y propone solo inmuebles tuyos. | **Próximamente** (`matching`) | Listings that fit | NuovaSolution compares what the client is looking for with your portfolio and proposes only your own listings. |
| 8 | Seguimiento con permiso | Cuando entra un inmueble que encaja, se propone solo si el cliente lo permitió. | **Próximamente** (`followup`) | Follow-up with permission | When a listing that fits comes in, it is proposed only if the client allowed it. |
| 9 | Publicar en Instagram | Preparas la publicación con los datos del inmueble y sale cuando tú la apruebas. | **Próximamente** (`social_posting`) | Posting on Instagram | You prepare the post with the listing's details and it goes out when you approve it. |
| 10 | El día de tu equipo | Cada persona ve sus tareas y por qué va primero cada una, y puede preguntar "¿Qué tengo hoy?". | **Próximamente** (`team_list`, `daily_voice`) | Your team's day | Each person sees their tasks and why each comes first, and can ask "What do I have today?". |

- **Scene 1 corrects D05:** the card carried "En preparación" for the whole card although the priority is on the record.
- **Scene 7** (matching) gets the real listing images (D04). In the scene, the button "Proponer a Laura" carries "Próximamente".
- **Scene 10:** "Tomar" may be clickable as a demo (D06), with the label "Demo".

---

## 6. Reporting on the home page

| | ES | EN |
|---|---|---|
| Eyebrow | Informe | Report |
| H2 | Tu semana, en un informe | Your week, in one report |
| Intro | Qué atendió NuovaSolution, qué sigue abierto y qué hacer después. | What NuovaSolution handled, what is still open and what to do next. |
| Header | Agencia de ejemplo · Semana del 26 oct al 1 nov · WhatsApp y email · Demo con datos ficticios | Example agency · Week of 26 Oct to 1 Nov · WhatsApp and e-mail · Demo with fictional data |
| Status line | Incluido: el informe en el acceso de tu agencia. Próximamente: el resumen semanal por email y el informe ampliado. | Included: the report in your agency's login. Coming soon: the weekly e-mail summary and the extended report. |
| Link | Ver el informe de ejemplo | See the example report |

**One set of example figures, the same on the home page and on `/example-report`** (fixes (a) and (b)):

| Metric ES | Value | Definition ES | Metric EN | Definition EN |
|---|---|---|---|---|
| Consultas recibidas | **25** | Mensajes nuevos por WhatsApp y email registrados en la semana. | Enquiries received | New WhatsApp and e-mail messages recorded in the week. |
| · por canal | **WhatsApp 14 · Email 11** | Las mismas 25, según el canal de llegada. | · by channel | The same 25, by the channel they arrived on. |
| Respondidas | **23** | Consultas con una respuesta automática enviada. Las otras 2 llegaron en otro idioma: no se envía nada automáticamente. | Answered | Enquiries with an automatic reply sent. The other 2 arrived in another language: nothing is sent automatically. |
| Esperan a una persona | **2** | Consultas abiertas que necesitan a alguien del equipo. | Waiting for a person | Open enquiries that need someone on the team. |
| Visitas pedidas | **6** | Clientes que pidieron ver un inmueble. Pedida no es acordada. | Viewings asked for | Customers who asked to see a property. Asked is not agreed. |
| · acordadas por el equipo | **4** | Visitas que una persona del equipo ya acordó con el cliente. | · agreed by the team | Viewings someone on the team has already agreed with the customer. |
| Entregadas al cliente | **No medido** | Si la respuesta llegó al teléfono o al buzón del cliente. | Delivered to the customer | Whether the reply reached the customer's phone or inbox. |
| Tiempo de respuesta | **No medido** | Minutos entre la consulta y la respuesta. | Response time | Minutes between the enquiry and the reply. |

**Weekly chart** (example, four weeks; week 4 = the figures above):

| Week | Received | Answered |
|---|---|---|
| Sem. 1 / Wk 1 | 19 | 17 |
| Sem. 2 / Wk 2 | 24 | 22 |
| Sem. 3 / Wk 3 | 21 | 20 |
| Sem. 4 / Wk 4 | 25 | 23 |

Chart note ES: "Cuatro semanas de ejemplo. La evolución por semanas forma parte del informe ampliado: próximamente." EN: "Four example
weeks. The week-by-week trend is part of the extended report: coming soon."

**"Por canal" (D07):** only WhatsApp and Email, because those are the channels in production. Further channels may appear in the
example only marked **Próximamente** (web form, phone, portals). No figure is invented for them.

| Still open ES | Still open EN |
|---|---|
| Peter y Anna Keller · valoración de una villa · falta proponer una fecha | Peter and Anna Keller · villa valuation · a date still to propose |
| Sofía Lamas · alquiler desde enero · esperando su respuesta | Sofía Lamas · rental from January · waiting for her reply |
| **What to do now:** Proponer a los Keller una fecha para la valoración. · Recordar a Laura la visita del jueves a las 10:00. | Propose a date to the Kellers for the valuation. · Remind Laura of Thursday's 10:00 viewing. |

---

## 7. The example report page `/example-report`

| Element | ES | EN |
|---|---|---|
| Example mark | Informe de ejemplo · no son datos de ninguna agencia | Example report · not any agency's data |
| H1 | Lo que ve una agencia al final de la semana | What an agency sees at the end of the week |
| Lead | Así es el informe semanal de NuovaSolution, con la semana del ejemplo de la página de inicio. El informe real de tu agencia está en tu acceso. | This is NuovaSolution's weekly report, with the home page's example week. Your agency's real report is in your login. |
| Figures | §6, same values and definitions | §6 |
| Chart | §6 weekly chart, with axis labels "Consultas" and "Semana", and the legend "Recibidas · Respondidas" | the same, "Enquiries", "Week", "Received · Answered" |
| Base line | Base: consultas registradas en NuovaSolution en los canales conectados, de lunes a domingo. Respondida no es lo mismo que entregada: lo que llega al cliente aún no se mide. | Basis: enquiries recorded in NuovaSolution on the connected channels, Monday to Sunday. Answered is not the same as delivered: what reaches the customer is not measured yet. |

**Insight lines** (new; example values computed from the figures above; in the agency's report **Próximamente**, `report_extended`):

| Line ES | Example value ES | Definition ES | Line EN | Example value EN | Definition EN |
|---|---|---|---|---|---|
| Tu mejor canal | WhatsApp · 14 de 25 consultas | El canal por el que llegaron más consultas en la semana. | Your top channel | WhatsApp · 14 of 25 enquiries | The channel that brought the most enquiries in the week. |
| Hora punta | 11:00–12:00 · 6 consultas | La franja de una hora en la que llegaron más consultas. | Peak hour | 11:00–12:00 · 6 enquiries | The one-hour slot in which most enquiries arrived. |
| De consulta a visita | 24 % · 6 de 25 | Visitas pedidas sobre consultas recibidas. No es una tasa de venta. | Enquiry to viewing | 24% · 6 of 25 | Viewings asked for out of enquiries received. Not a sales rate. |

Status line under the insights ES: "Estas conclusiones forman parte del informe ampliado: próximamente." EN: "These insights are part of
the extended report: coming soon."

**The close of the page (fixes (c)):**

| | Current on `faf2dbb` | New ES | New EN |
|---|---|---|---|
| Title | "Pruébalo con tu agencia" | Míralo con los datos de tu agencia | See it with your agency's data |
| Line | "**14 días gratis · Sin método de pago.** El informe de tu agencia se crea con tus consultas; no hay cifras que rellenar." | Acceso por invitación mientras preparamos el registro público. El informe de tu agencia se crea con tus consultas; no hay cifras que rellenar. | Access by invitation while public registration is being prepared. Your agency's report is built from your enquiries; there are no figures to fill in. |
| Actions | "Pedir acceso" · "Ya tengo acceso: ver mi informe" | unchanged | Request access · I already have access: see my report |

**Measured on `faf2dbb`:**
- (a) home "Visitas pedidas 4" against the report page "6 visitas pedidas, 4 acordadas";
- (b) "WhatsApp 13 · email 10" = 23 answered against 25 received, without saying the channels counted answers;
- (c) the line "14 días gratis · Sin método de pago".

All three are fixed by §6 and §7.

---

## 8. 3D

| | ES | EN |
|---|---|---|
| Eyebrow | Un servicio aparte | A separate service |
| H2 | Presentar un inmueble en 3D | Present a property in 3D |
| Intro | Del plano acotado a un modelo que el cliente recorre con la mirada, vacío y amueblado. | From the measured plan to a model the client can look around, empty and furnished. |
| Steps | Plano · Modelo · Vacío y amueblado · Entrega | Plan · Model · Empty and furnished · Delivery |
| Agent's path line (D10) | Tú envías el plano; nosotros construimos el modelo y te entregamos el enlace. | You send the plan; we build the model and send you the link. |
| Status | Próximamente | Coming soon |
| Example mark | Casa de ejemplo ficticia | Fictional example house |
| Action | Pregúntanos por el 3D | Ask us about 3D |

No delivery time and no price is given (owner, 26.10.: 2 working days is an internal target).

---

## 9. Plans

| | ES | EN |
|---|---|---|
| H2 | Planes | Plans |
| Intro | Hoy, acceso por invitación. Los planes se podrán contratar con el registro público. | Today, access by invitation. Plans can be booked once public registration opens. |
| Inheritance line | Cada plan incluye todo lo del anterior. | Each plan includes everything in the one before. |
| Price line | Te decimos el precio para tu agencia antes de acordar nada. | We tell you the price for your agency before anything is agreed. |
| Action, all three | Solicita una propuesta | Request a proposal |

**Positioning, checkable against the table, with no popularity claim.** Replaces "Recomendado para empezar" (D12: it holds back the
upsell) and **not** "El más completo" for Growth, because Enterprise contains more (§25b):

| Plan | Line ES | Line EN | Checkable in the table |
|---|---|---|---|
| Essential | Respuestas, fichas e informe para una oficina. | Replies, records and report for one office. | the rows Essential includes |
| Growth | Todo lo de Essential, más el trabajo del equipo: tareas, propuestas y seguimientos. | Everything in Essential, plus the team's work: tasks, proposals and follow-ups. | the rows Growth adds over Essential |
| Enterprise | Todo lo de Growth, para varias oficinas, con Instagram y 3D. | Everything in Growth, for several offices, with Instagram and 3D. | the rows Enterprise adds over Growth |

No plan carries a badge. If one is wanted, the only true kind of badge is a fact from the table, for example "Más funciones" on
Enterprise. Never "Recomendado" or "Más popular".

**The table** (status words from §1; order: channels, CRM, team, reporting, integrations, services):

| Group | Row ES | Row EN | Essential | Growth | Enterprise |
|---|---|---|---|---|---|
| Canales | Respuestas en español por WhatsApp y email | Replies in Spanish on WhatsApp and e-mail | Incluido | Incluido | Incluido |
| | Detección del idioma | Language detection | Incluido | Incluido | Incluido |
| | Etiquetas en el buzón | Labels in the mailbox | Incluido | Incluido | Incluido |
| | WhatsApp con el número de tu agencia | WhatsApp with your agency's own number | Próximamente | Próximamente | Próximamente |
| | Respuestas en otros idiomas | Replies in other languages | Próximamente | Próximamente | Próximamente |
| | Asistente telefónico | Phone assistant | No incluido | Próximamente | Próximamente |
| | Publicar en Instagram | Posting on Instagram | No incluido | No incluido | Próximamente |
| CRM | Ficha en el CRM integrado, con canal de origen | Record in the built-in CRM, with channel of origin | Incluido | Incluido | Incluido |
| | Prioridad con motivo | Priority with its reason | Incluido | Incluido | Incluido |
| | Una ficha por persona entre canales | One record per person across channels | Próximamente | Próximamente | Próximamente |
| Equipo | Aviso a la persona que toca | Alert to the right person | Próximamente | Próximamente | Próximamente |
| | Lista de tareas y "¿Qué tengo hoy?" | Task list and "What do I have today?" | No incluido | Próximamente | Próximamente |
| | Inmuebles que encajan y seguimiento con permiso | Listings that fit and follow-up with permission | No incluido | Próximamente | Próximamente |
| Informes | Informe en el acceso de tu agencia | Report in your agency's login | Incluido | Incluido | Incluido |
| | Resumen semanal por email | Weekly e-mail summary | Próximamente | Próximamente | Próximamente |
| | Informe ampliado: evolución, canales y conclusiones | Extended report: trend, channels and insights | No incluido | Próximamente | Próximamente |
| Integraciones | HubSpot, Pipedrive, Zoho, Salesforce, Outlook | HubSpot, Pipedrive, Zoho, Salesforce, Outlook | Próximamente | Próximamente | Próximamente |
| | Leads de portales y anuncios | Leads from portals and ads | No incluido | Próximamente | Próximamente |
| Servicios | Modelos 3D | 3D models | Próximamente | Próximamente | Próximamente |

**"Pruébalo gratis" as a prepared switch only.** Key `trialCta` = ES "Pruébalo gratis 14 días" · EN "Try it free for 14 days", with
the line ES "Sin método de pago y sin renovación automática." EN "No payment method and no automatic renewal." It stays **off**.
It is switched on only with the owner's registration line and E28-Prod (`signup` in §1). Until then the plans show "Solicita una
propuesta".

---

## 10. Trust, FAQ, close, footer

### 10.1 Trust, short

| ES | EN |
|---|---|
| Pides acceso y te enseñamos el sistema. La conexión del buzón y del WhatsApp de tu agencia llega próximamente. | You request access and we show you the system. Connecting your agency's mailbox and WhatsApp is coming soon. |
| La base de datos está en la Unión Europea (Fráncfort). | The database is in the European Union (Frankfurt). |
| Cada respuesta automática indica que la escribe un asistente. | Every automatic reply says that an assistant wrote it. |

### 10.2 FAQ (home page, short)

| Question ES | Answer ES | Question EN | Answer EN |
|---|---|---|---|
| ¿Qué hace NuovaSolution? | Responde en español las consultas que llegan por WhatsApp y email y guarda lo importante de cada una en su ficha, con su prioridad y su motivo. | What does NuovaSolution do? | It answers the enquiries that arrive on WhatsApp and e-mail in Spanish and keeps what matters from each one on its record, with its priority and reason. |
| ¿En qué idiomas responde? | En español. Detecta el idioma de cada consulta; en otro idioma no se envía nada automáticamente. | Which languages does it answer in? | Spanish. It detects each enquiry's language; in another language nothing is sent automatically. |
| ¿Sabe el cliente que responde un asistente? | Sí. Cada respuesta automática lo indica. | Does the customer know an assistant is answering? | Yes. Every automatic reply says so. |
| ¿Avisa a mi equipo? | Próximamente. Hoy la prioridad y su motivo quedan en la ficha. | Does it alert my team? | Coming soon. Today the priority and its reason stay on the record. |
| ¿Cómo empiezo? | Hoy por invitación: pide acceso y te enseñamos el sistema. El registro público y la prueba de 14 días llegan próximamente. | How do I start? | By invitation today: request access and we will show you the system. Public registration and the 14-day trial are coming soon. |
| ¿Funciona con mi CRM? | Incluye un CRM. HubSpot, Pipedrive, Zoho y Salesforce, próximamente. | Does it work with my CRM? | It includes a CRM. HubSpot, Pipedrive, Zoho and Salesforce, coming soon. |
| ¿Cuánto cuesta? | Te decimos el precio para tu agencia antes de acordar nada. | What does it cost? | We tell you the price for your agency before anything is agreed. |

### 10.3 Close

| | ES | EN |
|---|---|---|
| Title | Mira cómo NuovaSolution atiende tus consultas | See how NuovaSolution answers your enquiries |
| Line | Te enseñamos la demo con tus canales y respondemos tus preguntas. | We show you the demo with your channels and answer your questions. |
| Actions | Ver la demo · Pedir acceso | See the demo · Request access |

### 10.4 Footer and module names (D11: no English terms on the Spanish pages)

| Place | Current ES | New ES | EN (unchanged where English) |
|---|---|---|---|
| footer tagline | "Nuova responde a las consultas de tu agencia y deja claro el siguiente paso. Hecho para agencias en España." | NuovaSolution responde a las consultas de tu agencia y guarda lo importante en su ficha. Hecho para agencias en España. | NuovaSolution answers your agency's enquiries and keeps what matters on its record. Built for agencies in Spain. |
| module 1 (footer, menu, platform overview, page eyebrow) | "AI Sales Agent" | Asistente de consultas | AI Sales Agent |
| module 2 | "Lead Intelligence" | Ficha y prioridad | Lead Intelligence |
| module 3 | "CRM" | CRM | CRM |
| module 4 | "Tareas diarias" | Tareas diarias | Daily Tasks |
| footer group | "Empezar" | Empezar | Get started |
| footer link | "Prueba" | Acceso | Access |
| header nav | "Prueba" | Acceso | Access |

"CRM" stays: it is the word Spanish agencies use. This decides W-13 for the Spanish pages, in line with the owner's D11.

### 10.5 Brand

Every visible "Nuova" becomes **NuovaSolution**:
- H1, "Cómo funciona" step 2, scene 5 and 7 lines, the report intro and base line, the footer tagline;
- "Qué atendió Nuova" becomes "Qué atendió NuovaSolution";
- "Así es el informe semanal de Nuova" becomes "…de NuovaSolution";
- "consultas registradas en Nuova" becomes "…en NuovaSolution".

Exception: the sender label in the demo stays "Asistente automático de la agencia", because the customer writes to the agency.

---

## 11. Carried over from v2: the RV5 lines and the English legal seal

### A. The four open RV5 lines

### L-1 · The deletion page, at all four places, = `META_LEGAL_TEXT_FINAL.md` §3 word for word

| Place | File on `845429e` |
|---|---|
| `/es/legal/data-deletion` | `lib/content/legal.ts`, the ES `data-deletion` page |
| `/en/legal/data-deletion` | `lib/content/legal.ts`, the EN `data-deletion` page (from line 86) |
| P1 ES | `docs/website_redesign/p1_nuovasolution_com/eliminar-datos.html` |
| P1 EN | `docs/website_redesign/p1_nuovasolution_com/data-deletion.html` |

**Today** all four carry the earlier text: no identity block, no paragraph on what is deleted and what stays, and two different
phrasings. **New:** the text below, which is §3 of `META_LEGAL_TEXT_FINAL.md` at `56123d2`, copied by script.

- `⟦E14: …⟧` is filled from the E14 block once API signals E14 complete. Until then the page stays "PROVISIONAL".
- `⟦COUNSEL: F9⟧` is **not rendered**. It is the publication gate: the paragraph may go live only after counsel has answered F9
  (R26-i). On the preview the paragraph may show without the mark, under the "PROVISIONAL" banner.

**ES (`/eliminar-datos`, `/es/legal/data-deletion`):**

> **Cómo pedirnos que eliminemos tus datos**
>
> **Quién responde.** NuovaSolution es el nombre comercial de ⟦E14: NOMBRE⟧, NIF ⟦E14: NIF⟧,
> ⟦E14: DIRECCIÓN⟧, ⟦E14: EMAIL⟧. El aviso de privacidad completo
> está en https://nuovasolution.com/politica-privacidad.
>
> **Si escribiste a una inmobiliaria que usa Nuova.** Esa agencia decide sobre tus datos y nosotros
> actuamos según sus instrucciones. Escribe a ⟦E14: EMAIL⟧ desde el email o el teléfono que
> usaste e indica que quieres que se eliminen tus datos. Trasladamos tu solicitud a la agencia, la ayudamos
> a responderla y te comunicamos el resultado.
>
> **Si eres una agencia que usa Nuova.** Escribe a ⟦E14: EMAIL⟧ desde la dirección de tu
> cuenta, o pídenoslo dentro de tu cuenta. Confirmamos qué se va a eliminar, qué tenemos que conservar por
> ley y cuándo está hecho.
>
> **Si tu agencia conectó Instagram.** Abre NuovaSolution, entra en Social y pulsa Desconectar. El token se
> elimina de inmediato y dejamos de leer y de publicar. Eliminar la app en los ajustes de Instagram también
> termina nuestro acceso. Ninguna de las dos cosas suprime los datos ya guardados: para eso, escribe a
> ⟦E14: EMAIL⟧ desde la dirección de tu cuenta e indica el nombre de la agencia. Entonces
> suprimimos las publicaciones, los comentarios, los mensajes y las oportunidades creadas a partir de ellos
> para esa conexión.
>
> **Si has comentado o escrito por Instagram a una agencia.** Escribe a ⟦E14: EMAIL⟧ e indica
> la agencia y la fecha aproximada de tu mensaje. No guardamos tu nombre de usuario ni tu identificador
> original de Instagram, así que la agencia y el periodo son lo que nos permite encontrar tus datos.
>
> **Qué necesitamos de ti.** La dirección o el número que usaste y qué pides: una copia de tus datos, una
> corrección o la eliminación. Podemos pedirte que confirmes la solicitud desde esa misma dirección o
> número, para que nadie más pueda pedir tus datos.
>
> **Qué pasa después.** Una persona gestiona cada solicitud. Respondemos para confirmar que la hemos
> recibido y de nuevo cuando está hecha, incluido lo que tengamos que conservar por ley y por qué.
> Respondemos dentro del plazo que marca la ley, que normalmente es de un mes.
>
> **Qué eliminamos y qué se mantiene un tiempo.** Cuando toca eliminar, borramos a la persona de todos los
> almacenes de nuestra base de datos en un solo paso y después revisamos toda la base por si queda algo.
> Algunas copias están fuera de esa base y se eliminan según su propio plazo: los registros de nuestro
> servidor de automatización a los 14 días, y nuestras copias de seguridad como máximo a los 14 días. Si
> alguna vez se restaura una copia, la eliminación se
> aplica de nuevo antes de usar los datos. Las copias que guardan los servicios que usamos, como Meta para
> WhatsApp, siguen sus propios plazos. Una copia que conserva la propia agencia, por ejemplo en su buzón,
> la elimina la agencia, y le decimos qué tiene que borrar. Guardamos constancia de que la eliminación se
> pidió y se hizo, sin tus mensajes ni tus datos de contacto en forma legible, y el registro de cualquier
> consentimiento que diste o retiraste. ⟦COUNSEL: F9⟧
>
> **Qué no hace esta página.** Esta página no elimina nada por sí misma. Te indica cómo pedirlo.
>
> **Si no estás conforme.** Puedes reclamar ante la Agencia Española de Protección de Datos (AEPD).

**EN (`/data-deletion`, `/en/legal/data-deletion`):**

> **How to ask us to delete your data**
>
> **Who this is.** NuovaSolution is the trading name of ⟦E14: NAME⟧, NIF ⟦E14: NIF⟧, ⟦E14: ADDRESS⟧,
> ⟦E14: EMAIL⟧. The full privacy notice is at
> https://nuovasolution.com/privacy-policy.
>
> **If you wrote to an estate agency that uses Nuova.** That agency decides about your data and we act on
> its instructions. Write to ⟦E14: EMAIL⟧ from the e-mail address or phone number you used,
> and say that you want your data deleted. We pass your request to the agency, help it answer, and tell you
> the outcome.
>
> **If you are an agency using Nuova.** Write to ⟦E14: EMAIL⟧ from the address of your
> account, or ask us inside your account. We confirm what will be deleted, what we have to keep by law, and
> when it is done.
>
> **If your agency connected Instagram.** Open NuovaSolution, go to Social and choose Disconnect. The
> access token is deleted immediately and we stop reading and publishing. Removing the app in your
> Instagram settings also ends our access. Neither of those deletes the data already stored: for that,
> write to ⟦E14: EMAIL⟧ from the address of your account and name your agency. We then delete
> the posts, comments, messages and the leads created from them for that connection.
>
> **If you commented on or wrote to an agency on Instagram.** Write to ⟦E14: EMAIL⟧ and name
> the agency and the approximate date of your message. We do not store your Instagram username or your
> original Instagram identifier, so the agency and the time frame are what let us find your data.
>
> **What we need from you.** The address or number you used, and what you want: a copy of your data, a
> correction, or deletion. We may ask you to confirm the request from that same address or number, so that
> nobody else can ask for your data.
>
> **What happens then.** A person handles every request. We reply to confirm that we received it, and again
> when it is done, including anything we must keep by law and why. We answer within the period the law
> sets, which is normally one month.
>
> **What we delete, and what stays for a while.** When a deletion is due, we remove the person from every
> store of our database in one step, and then search the whole database for anything left behind. Some
> copies sit outside that database and are removed on their own schedule: the records of our automation
> server after 14 days, and our backups at the latest after 14 days. If a backup is
> ever restored, the deletion is applied again before the data is used. Copies held by the services we use,
> such as Meta for WhatsApp, follow those services' own deletion periods. A copy the agency keeps itself, in
> its own mailbox for example, is the agency's to delete, and we tell it what to remove. We keep a record that
> the deletion was requested and done, without your messages or your contact details in readable form, and
> the record of any consent you gave or withdrew. ⟦COUNSEL: F9⟧
>
> **What this page does not do.** This page does not delete anything by itself. It tells you how to ask.
>
> **If you are not satisfied.** You can complain to the Spanish data protection authority, the AEPD.

### AL-1 · The alt text of the empty 3D picture

| File | Current | New ES | New EN |
|---|---|---|---|
| `lib/content/home-sections.ts:53` `pairAlt` (the empty picture, `living-empty-1200.webp`) | "Casa de ejemplo ficticia: el mismo salón vacío y con mobiliario ilustrativo" · "Fictional example house: the same living room empty and with illustrative furnishing" | Casa de ejemplo ficticia: el mismo salón vacío, desde la misma cámara | Fictional example house: the same living room, empty, from the same camera |

### EX-1, EX-2 · The example report

| # | File | Current | New ES | New EN |
|---|---|---|---|---|
| EX-1 | `lib/content/example-report.ts:27` (ES), `:55` (EN), `chart.note` | "Cuatro semanas de ejemplo" · "Four example weeks" | Cuatro semanas de ejemplo. La evolución por semanas forma parte del informe ampliado, en preparación. | Four example weeks. The week-by-week trend is part of the extended report, in preparation. |
| EX-2 | `example-report.ts:40` (ES), `:68` (EN), `next[2]` | "Confirmar con Laura la visita del jueves a las 10:00." · "Confirm Thursday's 10:00 viewing with Laura." | Recordar a Laura la visita del jueves a las 10:00. | Remind Laura of Thursday's 10:00 viewing. |

EX-1 falls if API confirms that the agency login already shows several weeks. API's register says the extended report tier is
empty in production.

---

### B. The English legal seal

The Spanish pages say "Provisional"; the English ones say "Placeholder". The English seal gets the Spanish meaning.

| File | Current | New EN |
|---|---|---|
| `lib/i18n/dictionaries/en.ts:80` `placeholder` | "Placeholder" | Provisional |
| `en.ts:897` `placeholderBanner` | "PLACEHOLDER. This text is not final and has not been reviewed by counsel. It is published so the route exists and is clearly labelled." | PROVISIONAL. This text is not final and has not been reviewed by a lawyer. It is published so that the route exists and is clearly marked. |

The Spanish stays: "PROVISIONAL. Este texto no es definitivo y no ha sido revisado por un abogado. Se publica para que la ruta
exista y esté claramente identificada." (`es.ts:842`).

---

## 12. What returns on evidence, and never before

| Evidence | Text that returns |
|---|---|
| V3-DEPLOY + production probe with a real alert to staff | "…y avisa a tu equipo" in the benefit line; `alert` → Incluido; scene 1 without "próximamente" |
| Release U after E1 | `team_list`, `daily_voice` → Incluido where the plan includes them; the reply may then promise contact (audit E-c) |
| owner registration line + E28-Prod | `trialCta` switched on; "Probar gratis" as the primary action; the trial lines |
| multi-agency WhatsApp path passed | `wa_own_number` → Incluido |
| REPORT-AKTIV for agencies | `report_mail` → Incluido |
| extended report in production | `report_extended` → Incluido; the insight lines as real values |
| SPRACHEN S2 proven in production | `other_languages` → Incluido; the language answer names the languages |
| T6 accepted, scope and price per order fixed | `model3d` → Incluido (or "Por encargo") |
| Meta app approved + a real post | `social_posting` → Incluido |

---

## 13. Connection wording: nothing promises a connection that does not work (owner, 05.11.)

Read in the source of `faf2dbb`. These rows apply on the preview **and** in production until D5 is built and tested.

| # | File on `faf2dbb` | Current | New ES | New EN |
|---|---|---|---|---|
| N-1 | `lib/content/home-1103.ts:291`, trust line 1 | "Pides acceso, te enseñamos el sistema y conectamos los canales contigo." | Pides acceso y te enseñamos el sistema. La conexión del buzón y del WhatsApp de tu agencia llega próximamente. | You request access and we show you the system. Connecting your agency's mailbox and WhatsApp is coming soon. |
| N-2 | `lib/content/faq.ts:205`, FAQ "¿Cuánto se tarda en configurarlo?" | "Tú preparas los datos de tu agencia, tu logo, tu equipo y el acceso a WhatsApp y a tu email; nosotros conectamos los canales contigo y probamos cada uno con un mensaje real. …" | Hoy te enseñamos el sistema con datos de ejemplo. La conexión del buzón y del WhatsApp de tu agencia llega próximamente; cuando esté lista, probaremos cada canal con un mensaje real antes de darlo por conectado. | Today we show you the system with example data. Connecting your agency's mailbox and WhatsApp is coming soon; once it is ready, we will test each channel with a real message before calling it connected. |
| N-3 | `lib/i18n/dictionaries/es.ts:323` (and EN at the same key), the onboarding step | "Conecta tus canales con nosotros · WhatsApp y email se conectan junto con nosotros; es un paso distinto de la cuenta." | Tus canales · La conexión del buzón y del WhatsApp de tu agencia llega próximamente. | Your channels · Connecting your agency's mailbox and WhatsApp is coming soon. |
| N-4 | `es.ts:473` (and EN), trial step "Canales" | "Conecta tus canales, según los permisos que tengas." | Próximamente: conectar el buzón y el WhatsApp de tu agencia. | Coming soon: connecting your agency's mailbox and WhatsApp. |
| N-5 | `lib/content/capabilities.ts:83`; `lib/content/platform-map.ts:55` | "…en un buzón que operamos para ti." | **preview:** may stay. **Production:** only with D5 route B built; otherwise the line is: Respuesta por email: próximamente para el buzón de tu agencia. | **Production** otherwise: Reply by e-mail: coming soon for your agency's mailbox. |
| N-6 | `lib/content/home-demo.ts:184`, demo state on the Email tab | "Hoy: respuesta en español por email (Gmail) y ficha guardada." | **preview:** may stay (demo with fictional data). **Production** before D5: Demo: así funcionará con el buzón de tu agencia (próximamente). | Demo: this is how it will work with your agency's mailbox (coming soon). |

The channel labels "Email con Gmail" / "Email through Gmail" (`es.ts:418`, `en.ts:456`) name a channel. They promise no connection
and stay.

---

## Appendix: the detail pages (carried over from v2)

**Vocabulary:** where a row below says "En preparación" or "En preparación · todavía no contratable", the site shows **"Próximamente"** (§1). Where it says "Reservar una demo", "Probar gratis" or a trial line, §2, §7 and §9 of this file decide. Where a row concerns the home page, the example report, the plans or the footer, §2–§10 **supersede** it.

The rows below come from `WEBSITE_COPY_HANDOVER_1102.md` §C. They apply to the pages **outside** the new home page and plans
section: `/platform`, the four module pages, `/faq` (full), `/trial`, `/signup`, `/contact` and the packages page, where it is
not rebuilt from §9. Where a row concerns the home page or the plans, §1–§10 above **supersede** it.

### C. The launch scope, against API's register

### C.1 The alert for important enquiries: held back in production → no "Disponible"

Register, "Alarm in prod": "**P: held back today** (HA1; fix in v3) · **no** 'Disponible' · condition: V3-DEPLOY + a prod probe
with a real alert to staff". The example in the story may still **show** an alert. Every **state** and every **promise** changes.

| # | File | Current | New ES | New EN |
|---|---|---|---|---|
| C-1 | `lib/content/home-story.ts:250`, the hero lead | "Responde a lo que llega por WhatsApp y email, guarda lo que busca cada cliente **y lo pasa a la persona de tu equipo que toca**. Menos consultas que se quedan sin atender." | Responde a lo que llega por WhatsApp y email y guarda en una ficha lo que busca cada cliente. Menos consultas que se quedan sin atender. | Answers what arrives on WhatsApp and e-mail and keeps what each customer is looking for on a record. Fewer enquiries left unanswered. |
| C-2 | `lib/content/home-sequence.ts:118`, step 5 state | "Disponible hoy: el aviso por email, todavía sin horario de oficina. En preparación: la lista de tareas." | En preparación: el aviso por email y la lista de tareas. | In preparation: the e-mail alert and the task list. |
| C-3 | `home-story.ts:363`, story D state | "Disponible hoy: el aviso por email. El aviso llega cuando entra la consulta, todavía sin horario de oficina. En preparación: la lista de tareas…" | En preparación: el aviso por email a la persona que toca, la lista de tareas para tomarlas y cerrarlas, y el asistente que explica el orden. | In preparation: the e-mail alert to the right person, the task list to take and close tasks, and the assistant that explains the order. |
| C-4 | `lib/content/platform-map.ts:70`, row "Avisos de consultas importantes" | state `available` · line "…Todavía sin horario de oficina." | state **`preparing`** · line: Un email a la persona adecuada de tu equipo cuando entra una consulta importante. | state **`preparing`** · line: An e-mail to the right person on your team when an important enquiry comes in. |
| C-5 | `lib/content/package-matrix.ts:66`, Essential row "Avisos de consultas importantes" | state `available` · note "por email, todavía sin horario de oficina" | state **`preparing`**, no note | the same |
| C-6 | `lib/content/faq.ts:125`, "¿Me dice qué leads están calientes?" | "Sí, por email. Cuando una consulta parece importante, la persona adecuada de tu equipo recibe un aviso con el motivo. Todavía sin horario de oficina." | Todavía no. El aviso por email a la persona adecuada de tu equipo, con el motivo, está en preparación. Hoy la consulta queda en su ficha. | Not yet. The e-mail alert to the right person on your team, with the reason, is in preparation. Today the enquiry is kept on its record. |
| C-7 | `lib/content/capabilities.ts:85`, AI Sales Agent, the fourth point | "Un aviso por email a la persona adecuada cuando una consulta importa." | Un aviso por email a la persona adecuada cuando una consulta importa (en preparación). | An e-mail alert to the right person when an enquiry matters (in preparation). |

### C.2 Registration and the trial: no public sign-up promise yet

Register: "public registration **not released** · **no** public sign-up promise · condition: owner registration line + new site
live (E28-Prod P1/P5)"; trial "not before the prod onboarding core (E28-Prod P4 + owner)". **Valid until those two lines exist;
then the current wording comes back.** The primary call to action becomes the demo, which is also the brief's primary CTA ("Book a

**Aligned with v3:** C-8 and C-9 carry the wording of §2. C-10, C-11, C-18 and C-19 are **superseded** by §9 (the plans: intro and status words). C-15 is superseded by §10.1 and §13 on the home page; its text above applies only where the sentence remains on a detail page. The rest stays as written.
Demo").

| # | File | Current | New ES | New EN |
|---|---|---|---|---|
| C-8 | `lib/i18n/dictionaries/es.ts:61`, `:316`; `lib/content/package-matrix.ts:70`; `lib/content/plans.ts:86`: every "Probar gratis" button | "Probar gratis" | Pedir acceso | Request access |
| C-9 | `home-story.ts:252`, `home-sections.ts:118`, `example-report.ts:43`, `app/[locale]/packages/page.tsx:72`: the line under the button | "14 días gratis · Sin método de pago" | Acceso por invitación mientras preparamos el registro público. | Access by invitation while public registration is being prepared. |
| C-10 | `es.ts:370`, packages `h1` | "Pruébalo gratis 14 días" | Tres paquetes, con su estado real | Three packages, with their real state |
| C-11 | `es.ts:371`, packages `lead` under the `h1` | "14 días gratis, sin método de pago, con el paquete Essential. Después eliges un plan con nosotros y te decimos el precio…" | Hoy los paquetes todavía no se pueden contratar: el registro y la prueba de 14 días están en preparación. Te decimos el precio para tu agencia antes de acordar nada. | The packages cannot be booked yet: registration and the 14-day trial are in preparation. We tell you the price for your agency before anything is agreed. |
| C-12 | `es.ts:411`, the Essential card button | "Prueba Essential gratis" | Solicita una propuesta | Request a proposal |
| C-13 | `faq.ts:161`, "¿Cuánto dura la prueba y qué cuesta?" | "14 días de Essential, gratis, sin método de pago y sin tarjeta. Creas la cuenta tú mismo." | Será de 14 días de Essential, gratis y sin método de pago. El registro público está en preparación; hasta entonces, escríbenos y te enseñamos el sistema. | It will be 14 days of Essential, free and with no payment method. Public registration is in preparation; until then, write to us and we will show you the system. |
| C-14 | `faq.ts:195`, "¿Tengo que hablar antes con un comercial?", and `es.ts:388` ("¿Tengo que hablar con alguien antes?", the same answer shortened) | "No. Puedes empezar por tu cuenta. La demo es opcional y nunca una condición." | No hace falta una llamada comercial: escríbenos y te enseñamos el sistema. Empezar por tu cuenta llega con el registro público, en preparación. | No sales call is needed: write to us and we will show you the system. Starting on your own comes with public registration, in preparation. |
| C-15 | `lib/content/home-sections.ts:84`, "Cómo empiezas" lead | "Sin llamada comercial. Creas la cuenta, configuras tu agencia a tu ritmo y conectamos los canales contigo. El precio…" | Así será el arranque cuando abra el registro: creas la cuenta y configuras tu agencia a tu ritmo. La conexión del buzón y del WhatsApp de tu agencia llega próximamente. El precio te lo decimos para tu agencia antes de acordar nada; lo que pasa con los datos está escrito aquí. | This is how it will start once registration opens: you create the account and set up your agency at your own pace. Connecting your agency's mailbox and WhatsApp is coming soon. We tell you the price for your agency before anything is agreed; what happens with the data is written here. |
| C-16 | `es.ts:445`, the `h1` of `/trial`, and the top of that page | "Prueba gratis durante 14 días." · no state | h1: **La prueba gratuita de 14 días, en preparación.** · state line under it: **Estado: El registro público y la prueba de 14 días están en preparación.** | h1: **The 14-day free trial, in preparation.** · **State: Public registration and the 14-day trial are in preparation.** |
| C-16a | `es.ts:62`, `tryFree` | "Prueba gratis durante 14 días" | Prueba gratuita de 14 días: en preparación | 14-day free trial: in preparation |
| C-16b | `es.ts:489`, `trialBody` (the contact page, "O simplemente empieza") | "Prueba gratis durante 14 días. Sin método de pago, sin llamada comercial." | La prueba gratuita de 14 días, sin método de pago, llega con el registro público, en preparación. | The 14-day free trial, with no payment method, comes with public registration, in preparation. |
| C-17 | `/signup` | linked from the trial path | not linked from public pages until the owner's registration line | the same |

### C.3 Packages: no "Disponible" per package

Register: "Package names / content: **S** only; prod has **no** package system · no 'Disponible' per package". The features still
work for our own agency, so the package lists say **what is included**, not that it is available to book.

| # | File | Current | New ES | New EN |
|---|---|---|---|---|
| C-18 | `package-matrix.ts:112`, `states.available` (only in the package lists) | "Disponible" | Incluido | Included |
| C-19 | `package-matrix.ts:115`, `states.request` | "Disponible por encargo · sin cupo" | En preparación · todavía no contratable | In preparation · not bookable yet |

C-11 already says above the cards that the packages cannot be booked yet.

### C.4 3D: an honest state until it is accepted

Owner, LAUNCH-UMFANG: 3D does not hold up the launch and is not shown as available. T6 (order → workshop → QA → delivery →
protected viewer) is not complete.

| # | File | Current | New ES | New EN |
|---|---|---|---|---|
| C-20 | `platform-map.ts:115`, row "Visualización 3D" | state `request` ("Por encargo") | state `preparing` | the same |
| C-21 | `package-matrix.ts:103`, Enterprise row "Modelos 3D incluidos por encargo" | state `request` · note "a partir de tus planos" | state `preparing`, no note | the same |
| C-22 | `package-matrix.ts:99`, Enterprise `limits` | "Hoy es una oferta por encargo: los modelos 3D se hacen ya a partir de tus planos; Instagram depende de la aprobación de la plataforma." | Los modelos 3D y la publicación en Instagram están en preparación; Instagram depende además de la aprobación de la plataforma. | 3D models and Instagram publishing are in preparation; Instagram also depends on the platform's approval. |
| C-23 | `home-sections.ts:23`, 3D section lead | "…Construimos el modelo, lo mostramos vacío y amueblado desde la misma cámara y lo comprobamos contra tu plano. Cada modelo es un encargo, con o sin paquete." | …Construimos el modelo, lo mostramos vacío y amueblado desde la misma cámara y lo comprobamos contra tu plano. Cada modelo será un encargo, con o sin paquete. **Estado: En preparación · todavía no contratable.** | …We build the model, show it empty and furnished from the same camera and check it against your plan. Each model will be an order, with or without a package. **State: In preparation · not bookable yet.** |
| C-24 | `home-sections.ts:59`, `package-matrix.ts:125` | "Modelos 3D también por separado, sin ningún paquete: nos envías los planos, lo construimos y lo comprobamos." | Más adelante, los modelos 3D también se podrán encargar por separado, sin ningún paquete. | Later, 3D models can also be ordered on their own, without a package. |
| C-25 | `home-sections.ts:62`, `package-matrix.ts:127`, button | "Pide un modelo" | Pregúntanos por el 3D | Ask us about 3D |

### C.5 Voice and Instagram posting: already honest, unchanged

The phone is "Prototipo … solo en español" (story A, the platform row "Asistente telefónico · En preparación", FAQ "¿Atiende llamadas?
No."). Instagram is "Prototipo · depende de la aprobación de la plataforma", with the platform rows and the Enterprise row "En
preparación". **No change.** Both remain so until accepted.

### C.6 WhatsApp, data location, module pages

| # | File | Current | New ES | New EN | Register |
|---|---|---|---|---|---|
| C-26 | `platform-map.ts:54`, row WhatsApp | "Respuesta con el nombre de tu agencia; hoy en español." | Respuesta por WhatsApp, hoy en español. Conectar el número de tu agencia está en preparación. | Replies on WhatsApp, in Spanish today. Connecting your agency's own number is in preparation. | "✓ for our own agency; **not** 'your own number'". The disclosure with the agency's name (v1.1) is not approved either |
| C-27 | `home-sections.ts:111`, "Qué hacemos nosotros al conectar" | "Preparamos la cuenta de WhatsApp Business con tu nombre. Hoy las consultas por email…" | Conectar la cuenta de WhatsApp Business de tu agencia está en preparación. Hoy las consultas por email… *(rest unchanged)* | Connecting your agency's own WhatsApp Business account is in preparation. Today e-mail enquiries… *(rest unchanged)* | the same |
| C-28 | `faq.ts:224`, "¿Dónde se guardan los datos?" | "En la Unión Europea. La base de datos y los archivos están con nuestro proveedor de infraestructura en Fráncfort, y los servidores que ejecutan la automatización están en Alemania. …" | La base de datos y los archivos están en la Unión Europea, con nuestro proveedor de infraestructura en Fráncfort, y los servidores que ejecutan la automatización están en Alemania. Para los canales de mensajes y el proveedor de IA indicamos lo que declara cada proveedor. *(the sentence on files without a public link stays)* | The database and the files are in the European Union, with our infrastructure provider in Frankfurt, and the servers that run the automation are in Germany. For the message channels and the AI provider we state what each provider declares. *(the sentence on files stays)* | "base de datos en la UE (Fráncfort)"; **never** "todos los datos en la UE" |
| C-29 | `es.ts:89`, the line under "Encaja con tu operación" on the module pages | "Disponible según los canales que tengas conectados." | Hoy con WhatsApp y Gmail, respuestas en español. | Today with WhatsApp and Gmail, replies in Spanish. | WhatsApp (own agency), Gmail ✓ |
| C-30 | the same line on `/platform/daily-assistant` | as C-29 | **remove** on this page | **remove** | the page is "En preparación"; "Disponible…" under it contradicts it |

**Unchanged, because the register allows them:** "Disponible hoy: WhatsApp y email" (hero step 1, story A); "Disponible hoy, en
español" (step 2); "una ficha por consulta" (step 3, platform CRM); the Gmail labels; the report in the agency login; the CRM
included; "Google Sheets" only as an optional copy; external CRMs only "cuando esté listo"; the CRM page's "dos fichas"; Outlook
"Hoy no"; Spanish as the only reply language.
