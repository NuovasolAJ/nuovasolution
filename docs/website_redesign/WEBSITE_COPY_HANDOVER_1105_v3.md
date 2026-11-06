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
  invited external agency can use (§1b, §13);
- **addendum 06.11.:** the owner's round on `2dfa67d` (§14–§22): no readiness word on the site, every sentence written for the target
  state, public view strictly from `lib/claims.ts`. **§14–§23 take precedence** where they differ from an earlier section; §1b and §13
  are rewritten in place, and §23 lists every earlier place with its old and new wording.

**Read on:** `faf2dbb` / `dpl_FnoR4QFTNPg1E9ws4g28gj2FdzkC`, through its fixed URL, 05.11., GET only.

**Rules:**
- the brand is **NuovaSolution** everywhere in visible text (not "Nuova");
- no status word on any visible text (§1, §14), also not inside a whole sentence;
- no prices, no popularity claim, no "Disponible" per plan;
- a figure appears only with a definition; a new figure or a language claim appears only with current product evidence, otherwise
  it is marked as an example or not shown.

**Marking:** editorial and technical. **Not a legal approval, not a Meta approval. No publication released.**

---

## 1. The central status file (one source for every status on the site)

**Addendum 06.11. (owner):** the status words apply only internally, in this register and in `lib/claims.ts`. They do not appear on the
site, in either view.

**Internal states:** two for functions, plus one for what a plan leaves out:

| State ES | State EN | Means | Used where (until 05.11.; now internal) |
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

### 1b. The public view: checked by state, not by status word

**Owner, 05.11. and 06.11. (replaces the earlier "shows Próximamente in production"):**
- A key is `included` in the public build only for what an invited agency other than nuovasolution can use in production. The basis is `governance/ERSTE_FREMDE_AGENTUR_1105_v1.md` (API repo, `3d97372`).
- **A key whose condition is not met is not shown at all** in the public build. There is no status word for it (§14).
- **The preview** shows the target state with the notice at the top. It is not checked against this table.
- **Before the production go-live**, the Reviewer checks the rendered public view: every visible function has its key set, every key set has its condition met, and nothing from a key that is off is visible, also not in a card, the report, the FAQ or the table.

**What the sources state, read 06.11.:**
- Production knows exactly one tenant until V3-DEPLOY.
- Mail of an external agency does not arrive in production yet (K5). The direct mailbox connection is not finished; the owner's internal target for the test run A12 is 20.11. (`API_D5_DIREKT_1106_v1.md` §7).
- An agency cannot yet finish the mailbox connection alone in its browser (same file, §3). A pure @gmail.com mailbox only follows Google's review (§1).
- Release U is in production since 05.11. 13:32Z.

**Today no key below meets its condition.** The seven `included` values in `lib/claims.ts` are the preview-era states of §1. Pictures of
the public view taken on them are a rehearsal of the layout, not the go-live state, and the floor of §15 is not met today.

| Key | Condition for `included` in the public build (external agency) | Source row |
|---|---|---|
| `replyEmail` | **the agency's mailbox connected in production (D5)**; A12 passed; V3-DEPLOY; an approved ES notice for the agency (K4) | K5, K4 |
| `replyWhatsapp`, `whatsappOwnNumber` | the agency's own number registered and routed (K1–K3); the gates of the multi-agency plan green; Meta approvals; V3-DEPLOY. For an external agency these two keys turn together | K1–K3 |
| `replyOutOfHours` | a reply key on, and one real automatic reply outside the agency's hours in production, per connected channel | new |
| `mailboxConnection` | the connection done and tested with a test mailbox of an external agency (A12), in the joint appointment; the sentence names no provider that has not passed | K5 |
| `origin` | **the agency's mailbox connected in production (D5)** for e-mail; K1–K3 for WhatsApp; V3-DEPLOY | K5, K2 |
| `languageNoted` | **the agency's mailbox connected in production (D5)** for e-mail; K2 for WhatsApp; V3-DEPLOY | K5, F7 |
| `labels` | **the agency's mailbox connected in production (D5)**, with labels in **that** mailbox (owner `GMAIL-UMFANG` = A-voll, 06.11.; A12 check 4); Gmail only until Outlook has its own line | K5 |
| every other function at the agency's mail intake (reply by e-mail, attachments, held reply) | **the agency's mailbox connected in production (D5)** | K5 |
| `crm`, `priorityWithReason` | V3-DEPLOY; ONBOARDING-PROD (F1); tenant isolation green (F12); one channel connected | F1, F12 |
| `reportInLogin` | ONBOARDING-PROD; report entitlement for the agency (B1) | F1, B1 |
| `taskList`, `dailyVoice` | V3-DEPLOY + ONBOARDING-PROD; staff access for the agency | F2, B2 |
| `plans`, `trial`, `publicSignup` | E28-Prod P1/P4/P5 + the owner's registration line | register |
| all others | the column "Turns into Incluido when" in §1 | §1 |

**No button or line "Conecta tu Gmail" / "Connect your Gmail" anywhere, in either view.** The connection is done together with the
agency, not by one click (§13).

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

**Addendum 06.11. (owner).** The table shows what each plan contains:
- a ✓ where the plan holds the function, a "—" where it does not, and **no status word in a cell**. For screen readers: "En este plan" · "In this plan" and "No en este plan" · "Not in this plan";
- **no fixed 19 rows in the public state**: a row whose key is off is absent, and the number of rows follows the keys (§20 P-5). The preview shows the rows below without "Respuestas en otros idiomas" (§15);
- the columns of the table below are the internal map of which plan holds which row, not visible words. Its census is no pass condition.

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

EX-1 is **superseded by §19 R-5** (no readiness clause). EX-2 stands.

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

**Addendum 06.11.:** "returns" now means that the key turns on and the element appears. The sentences are in §16–§21.

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

## 13. Connection wording: written for the target state, hidden in public until it works (owner, 05.11. and 06.11.)

The target sentence says what will be true once the connection is built: it is done **together with the agency** and tested with a real
message (API's `API_D5_DIREKT_1106_v1.md` §3 and §6). Each row names the key and what stands in public while it is off. "En un buzón
que operamos para ti" is gone, because route B is stopped (D5-DIREKT).

| # | File on `2dfa67d` | Target ES | Target EN | Keys | Public when a key is off |
|---|---|---|---|---|---|
| N-1 | `lib/content/home-1103.ts:346`, trust line 1 | Conectamos contigo el buzón y el WhatsApp de tu agencia y probamos cada canal con un mensaje real. | We connect your agency's mailbox and WhatsApp with you and test each channel with a real message. | `mailboxConnection`, `whatsappOwnNumber` | mailbox only: "Conectamos contigo el buzón de tu agencia y lo probamos con un mensaje real." · "We connect your agency's mailbox with you and test it with a real message." WhatsApp only: "Conectamos contigo el WhatsApp de tu agencia y lo probamos con un mensaje real." · "We connect your agency's WhatsApp with you and test it with a real message." Neither: "Pides acceso y te enseñamos el sistema." · "You request access and we show you the system." |
| N-2 | `lib/content/faq.ts:205`, Q-21 | Tú preparas los datos de tu agencia, tu logo y tu equipo. Conectamos contigo el buzón y el WhatsApp y probamos cada canal con un mensaje real antes de darlo por conectado. | You prepare your agency's details, your logo and your team. We connect the mailbox and WhatsApp with you and test each channel with a real message before calling it connected. | as N-1 | one channel: the same sentence with that channel. Neither: "Te enseñamos el sistema con datos de ejemplo." · "We show you the system with example data." |
| N-3 | `lib/i18n/dictionaries/es.ts:323` (and EN), onboarding step | Tus canales · Conectamos contigo el buzón y el WhatsApp de tu agencia y probamos cada canal con un mensaje real. | Your channels · We connect your agency's mailbox and WhatsApp with you and test each channel with a real message. | as N-1 | one channel: that channel. Neither: hide the step |
| N-4 | `es.ts:473` (and EN), trial step "Canales" | Canales · the same sentence as N-3 | Channels · the same sentence as N-3 | as N-1 | the route follows §21 |
| N-5 | `lib/content/capabilities.ts:83`; `lib/content/platform-map.ts:55` | Respuesta por email, en el buzón de tu agencia. · La misma respuesta para lo que llega al buzón de tu agencia. | A reply by e-mail, in your agency's mailbox. · The same reply for what arrives in your agency's mailbox. | `replyEmail` | hide the row |
| N-6 | `lib/content/home-demo.ts`, the state lines on the Email tab | **removed in both views** (§14) | **removed** | | the tab follows `replyEmail` |

The channel labels "Email con Gmail" / "Email through Gmail" (`es.ts:418`, `en.ts:456`) name a channel, promise no connection, and stay
while `replyEmail` is on.

---

## 14. Addendum 06.11.: two views, no readiness word (the owner's round on `2dfa67d`)

**Owner, 06.11.:** "Próximamente / Coming soon" stands nowhere on the site, also not in the report. Every sentence is written for
the target state. Redesign hides in public what `lib/claims.ts` does not carry as included. §14–§23 take precedence over the
earlier sections where they differ.

| View | Shows | Mark |
|---|---|---|
| **Preview** | the target state: the "Target" column of §16–§21 | the preview notice at the top (below) |
| **Public** | only what `lib/claims.ts` carries as `included`. Everything else is **not shown at all**: scene, row, chip, sentence, channel | none |

| Preview notice (`es.ts:97`, and EN) | ES | EN |
|---|---|---|
| line, no date and no promise, on every route of the preview | Vista previa, no pública. Muestra el producto completo, incluidas funciones que no están activas. Datos de ejemplo: nada de lo que introduzcas crea una cuenta ni llega a nadie. | Preview, not public. It shows the complete product, including functions that are not active. Example data: nothing you enter creates an account or reaches anyone. |

**The internal words.** The status words apply only in §1 and in `lib/claims.ts`. A statement on connecting a mailbox or WhatsApp
appears in public only when it is true.

**How to read §16–§21.** "Keys" are `lib/claims.ts` keys; the sentence needs all of them. The last column says what stands in public
when a key is off. "Hide" means the element disappears with no replacement.

**Gone from all visible text, in both views:**
- Incluido, No incluido, Próximamente, Coming soon, En preparación, Prototipo, also inside a whole sentence;
- "Hoy no", and "hoy" or "todavía" where they promise something later;
- every pill and every cell word that states a status;
- the state lines under the demo, the scenes and the report.

**What stays, because it is not a status word:**
- "No medido", twice, in both views (owner; §6);
- "Demo con datos ficticios", "Datos de ejemplo", "Casa de ejemplo ficticia";
- "Provisional" on the legal pages.

**Limits that stay in public.** They bound a function that is shown, so hiding them would mislead:
- in another language nothing is sent automatically;
- a viewing request is not an appointment, a person confirms it;
- answered is not delivered;
- two records until `oneRecordAcrossChannels` is on (API's register requires this);
- the retention answer Q-44 stays word for word until counsel has answered.

**Not shown in either view for now.** There is no owner line or evidence for a target sentence:
- `otherLanguages` (follows the owner's Question B, §16; when it turns on, the rows in §15 apply);
- the calendar row (KALENDER first stage is a wish that a person confirms; writing into a diary is undecided);
- reading photos and PDFs (Q-26: MM names the behaviour first).

---

## 15. Keys and shared rules

**New keys for `lib/claims.ts`** (Redesign writes the file):

| New key | Why | Value today |
|---|---|---|
| `replyEmail`, `replyWhatsapp` | §1b has separate conditions for the two. `replySpanish` becomes "either of them" | included, included (as `replySpanish` today) |
| `replyOutOfHours` | the owner's example. The reply goes out when the message arrives (FAQ Q-03, Q-46); there is no separate switch in the product, but the public claim needs its own evidence (§1b) | included (as `replySpanish` today) |
| `mailboxConnection` | the sentence on connecting the agency's mailbox (D5-DIREKT) | soon |
| `outlook` | split from `integrations`; it has its own path (O4, MM) | soon |
| `plans` | plan names and the comparison table. API's register: production has no package system yet (E28-Prod P4) | soon |

**The channel list `⟦canales⟧`.** Every sentence that names channels builds them from the keys, in this order, with "y" / "and"
before the last:

| Key | ES | EN |
|---|---|---|
| `replyWhatsapp` | WhatsApp | WhatsApp |
| `replyEmail` | email | e-mail |
| `webform` | formulario web | web form |
| `phoneAssistant` | teléfono | phone |
| `adsLeads` | portales y anuncios | portals and ads |

**The language rule.** Every reply sentence says "en español" in both views while `otherLanguages` is off. This is the one exception
to "preview = target", and it follows the owner's Question B ("en español" is the true limit). When the key turns on (owner
`SPRACHEN-NEU`, 06.11.: ES + EN + DE for mail, WhatsApp and phone, each language with its evidence and its approved notice; this
replaces S2 for German), these change together. If only one more language is proven, the sentences name only that one:

| Place | ES | EN |
|---|---|---|
| "en español" in a reply sentence, also chip 1 | en español, inglés y alemán | in Spanish, English and German |
| the limit sentence | En otro idioma no se envía nada automáticamente. | In another language nothing is sent automatically. |
| plans row (returns) | Respuestas también en inglés y alemán | Replies in English and German too |
| the example of a language that gets no automatic reply (scene "El idioma", the report's 2, the open cases): today the Kellers write in German | the Kellers become **Claire y Paul Renard**, "francés · reconocido", "Consulta en francés: quieren vender su villa" | **Claire and Paul Renard**, "French · recognised", "Enquiry in French: they want to sell their villa" |

**Why the example moves:** with German on, an enquiry in German gets an automatic reply, so the 2 of the example week need a language
the product does not answer. The figures do not change. If French is later proven (the owner's next stage), the example moves again.

**The floor of the public view.** With `replySpanish` or `crm` off there is no public product page at all. No text is needed for that
case: the public build does not go live.

---

## 16. Hero and demo (Questions A and B)

**Question A (owner: Redesign's proposal, no contact promise).** The reply in §3 is replaced:

| Element | ES | EN |
|---|---|---|
| WhatsApp reply (`replyWhatsapp`) | ¡Hola, Laura! Gracias por escribirnos. Buscas en Estepona, 2 dormitorios y hasta 320.000 €, ¿verdad? ¿Te viene mejor por la mañana o por la tarde para una visita? | Hi Laura, thanks for writing to us. You're looking in Estepona, 2 bedrooms, up to €320,000, is that right? Would the morning or the afternoon suit you better for a viewing? |

- It promises no contact and no availability, and "Apunto" and "segunda residencia" (struck on 03.11.) are gone.
- It asks for a wish, in line with the owner's KALENDER line. So the record keeps its next step and the small line of §3: "Una petición de visita no es una cita: la confirma una persona."

**Question B (owner: Copy's chip stays).** Chip 1 stays word for word in both views.

| # | Element | Target ES | Target EN | Keys | Public when a key is off |
|---|---|---|---|---|---|
| H-1 | Chip 1 | Responde en español, también fuera de horario | Replies in Spanish, also out of hours | `replySpanish`, `replyOutOfHours` | `replyOutOfHours` off: "Responde en español" · "Replies in Spanish" |
| H-2 | Chip 2 | Guarda zona, presupuesto e intención | Keeps area, budget and intent | `crm` | floor (§15) |
| H-3 | Chip 3 | Marca la prioridad y avisa a tu equipo | Marks the priority and alerts your team | `priorityWithReason`, `alert` | `alert` off: "Marca la prioridad y su motivo" · "Marks the priority and its reason". Both off: hide |
| H-4 | Benefit line | as §2, unchanged | as §2 | `replySpanish`, `crm` | floor |
| H-5 | Secondary action | Pruébalo gratis 14 días | Try it free for 14 days | `trial`, `publicSignup` | "Pedir acceso" · "Request access" |
| H-6 | Line under the actions | Sin método de pago y sin renovación automática. | No payment method and no automatic renewal. | `trial`, `publicSignup` | "Acceso por invitación." · "Access by invitation." |
| H-7 | Nav and footer link (§10.4) | Prueba | Trial | `trial`, `publicSignup` | "Acceso" · "Access" |

**Invitation on the channel tabs (replaces "Elige un canal"):**

| ES | EN | Keys | Public |
|---|---|---|---|
| Elige un canal y mira cómo responde. | Choose a channel and see how it replies. | at least two of `replyWhatsapp`, `replyEmail`, `webform`, `phoneAssistant` | one channel on: no tabs, no invitation |

| Tab | Key | Public when off |
|---|---|---|
| WhatsApp | `replyWhatsapp` | hide the tab |
| Email | `replyEmail` | hide the tab |
| Formulario web | `webform` | hide the tab |
| Teléfono | `phoneAssistant` | hide the tab |

No tab carries a mark, a pill or a state line in either view.

---

## 17. Cómo funciona

**Step 4: "Tu equipo continúa" is replaced.** I take the audit's title. In the line I write "qué prioridad tiene", because the record
holds a priority with its reason, not an urgency measure. The second sentence keeps the human step that remains.

| # | Step | Target ES | Target EN | Keys | Public when a key is off |
|---|---|---|---|---|---|
| F-1 | 1, line | Por ⟦canales⟧, a cualquier hora. | On ⟦canales⟧, at any hour. | list, `replyOutOfHours` | off: "Por ⟦canales⟧." · "On ⟦canales⟧." |
| F-2 | 2 | as §4, unchanged | as §4 | `replySpanish` | floor |
| F-3 | 3, line | Zona, presupuesto, idioma, prioridad y su motivo. | Area, budget, language, priority and its reason. | `crm`, `priorityWithReason` | off: "Zona, presupuesto e idioma." · "Area, budget and language." |
| F-4 | 4, title | **Tu equipo llega preparado** | **Your team arrives prepared** | `crm` | floor |
| F-5 | 4, line | Abre la ficha y ya sabe quién es, qué busca y qué prioridad tiene. La cita la acuerda una persona. | They open the record and already know who it is, what they want and what priority it has. A person agrees the appointment. | `crm`, `priorityWithReason` | off: "Abre la ficha y ya sabe quién es y qué busca. La cita la acuerda una persona." · "They open the record and already know who it is and what they want. A person agrees the appointment." |

---

## 18. Scenes in three chapters

**The chapters.** "Crece" carries the message: not only faster, but growing. It says what the agency gains in knowledge and reach. It
gives no figure and no promise of sales.

| Chapter ES | Chapter EN | Line ES | Line EN | Scenes, in this order | Public |
|---|---|---|---|---|---|
| Atiende | Answer | Responde cuando tú no puedes: en una visita, de noche o el fin de semana. | It replies when you can't: during a viewing, at night or at the weekend. | Consultas respondidas · El idioma de cada cliente | `replyOutOfHours` off: "Responde cuando tú no puedes, también durante una visita." · "It replies when you can't, also during a viewing." |
| Organiza | Organise | Lo que pide cada cliente queda en su ficha, con su prioridad y su motivo, y tu equipo sabe por dónde empezar. | What each client asks for stays on their record, with its priority and reason, and your team knows where to start. | Lo importante, guardado · Leads importantes, con motivo · Tu buzón, ordenado · El día de tu equipo | `priorityWithReason` off: "Lo que pide cada cliente queda en su ficha." · "What each client asks for stays on their record." |
| Crece | Grow | No es solo responder antes. Sabes de dónde llegan tus clientes, vuelves a ellos cuando entra un inmueble que encaja y das a conocer tu cartera. | It's not just replying sooner. You know where your clients come from, you go back to them when a listing that fits comes in, and you get your portfolio seen. | De dónde llega cada consulta · Inmuebles que encajan · Seguimiento con permiso · Publicar en Instagram · Tu semana, en un informe | composed below |

**"Crece" in public.** The first sentence always stands. The second is composed:

| Keys on | Second sentence ES | Second sentence EN |
|---|---|---|
| `origin`, `followup`, `instagram` | as the target | as the target |
| `origin`, `followup` | Sabes de dónde llegan tus clientes y vuelves a ellos cuando entra un inmueble que encaja. | You know where your clients come from and you go back to them when a listing that fits comes in. |
| `origin`, `matching` | Sabes de dónde llegan tus clientes y les propones inmuebles que encajan. | You know where your clients come from and you propose listings that fit. |
| `origin` only | Sabes de dónde llegan tus clientes y qué sigue abierto cada semana. | You know where your clients come from and what is still open each week. |
| only the report entry remains | hide the chapter; the report section stands alone | the same |

A chapter with no visible scene is hidden.

**The scenes** (titles as §5):

| # | Scene | Target ES | Target EN | Keys | Public when a key is off |
|---|---|---|---|---|---|
| S-1 | Consultas respondidas | En español, por ⟦canales⟧, también fuera de horario. | In Spanish, on ⟦canales⟧, also out of hours. | `replySpanish`, list, `replyOutOfHours` | off: "En español, por ⟦canales⟧." · "In Spanish, on ⟦canales⟧." |
| S-2 | El idioma de cada cliente | NuovaSolution detecta el idioma de cada cliente y lo guarda en su ficha. Si no es español, no se envía nada automáticamente: lo escribe una persona. | NuovaSolution detects each client's language and keeps it on their record. If it is not Spanish, nothing is sent automatically: a person writes it. | `languageNoted` | hide |
| S-3 | Lo importante, guardado | as §5, unchanged | as §5 | `crm` | floor |
| S-4 | Leads importantes, con motivo | La ficha marca la prioridad y por qué, y avisa a la persona que toca. | The record marks the priority and why, and alerts the right person. | `priorityWithReason`, `alert` | `alert` off: "La ficha marca la prioridad y por qué." · "The record marks the priority and why."; hide the alert row in the surface. `priorityWithReason` off: hide |
| S-5 | Tu buzón, ordenado | as §5, unchanged | as §5 | `labels` | hide |
| S-6 | El día de tu equipo | as §5, unchanged | as §5 | `taskList`, `dailyVoice` | `dailyVoice` off: "Cada persona ve sus tareas y por qué va primero cada una." · "Each person sees their tasks and why each comes first."; hide the voice bar. `taskList` off: hide |
| S-7 | De dónde llega cada consulta | La ficha guarda de dónde llega cada consulta: ⟦canales⟧. Así ves qué canal te trae clientes. | The record keeps where each enquiry comes from: ⟦canales⟧. So you see which channel brings you clients. | `origin`, list | one channel on: hide |
| S-8 | Inmuebles que encajan | as §5, unchanged; the button "Proponer a Laura" without a mark | as §5 | `matching` | hide |
| S-9 | Seguimiento con permiso | as §5, unchanged | as §5 | `followup` | hide |
| S-10 | Publicar en Instagram | as §5, unchanged | as §5 | `instagram` | hide |
| S-11 | Tu semana, en un informe | Qué entró, de dónde llegó y qué sigue abierto, para decidir dónde poner tu tiempo. | What came in, where it came from and what is still open, so you can decide where to put your time. | `reportInLogin`, `reportTrend` | `reportTrend` off: "Qué entró y qué sigue abierto, para decidir dónde poner tu tiempo." · "What came in and what is still open, so you can decide where to put your time." `reportInLogin` off: hide |

---

## 19. The report: one example week, on the home page and on `/example-report`

The figures of §6 stay: **25 received · 23 answered · 2 waiting for a person · 6 viewings asked for · 4 agreed · chart 19/17, 24/22,
21/20, 25/23 · No medido twice.**

**"Por canal", target state.** It is an example with fictional data, and it sums to the same 25:

| Channel ES | Channel EN | Enquiries |
|---|---|---|
| WhatsApp | WhatsApp | **10** |
| Email | E-mail | **6** |
| Formulario web | Web form | **3** |
| Teléfono | Phone | **2** |
| Portales y anuncios | Portals and ads | **4** |
| **Total** | **Total** | **25** |

**"Por canal" in public.** It is part of the extended report, so it needs `reportTrend`; then it shows only the channels that run. The
sum stays 25:

| Channels on | Figures |
|---|---|
| all five | as above |
| WhatsApp and Email only | WhatsApp 14 · Email 11 (§6) |
| one channel only | the block is hidden (one channel compares nothing) |
| any other set | the figure of each channel that is off is added to Email (to WhatsApp if Email is off) |

**The hours of arrival** replace Redesign's working row. The peak stays 11:00–12:00 · 6, the sum stays 25, and the rows now also hold
the 23:40 and 07:15 of the scene "Consultas respondidas":

| Hour | 7 | 9 | 10 | 11 | 12 | 13 | 14 | 16 | 18 | 19 | 20 | 21 | 23 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Enquiries | 1 | 1 | 2 | 6 | 3 | 2 | 1 | 1 | 2 | 1 | 2 | 2 | 1 |

| Line | ES | EN |
|---|---|---|
| Office hours of the example agency, under the chart | Horario de la agencia de ejemplo: de 10:00 a 14:00 y de 17:00 a 20:00. | Hours of the example agency: 10:00 to 14:00 and 17:00 to 20:00. |

**Texts that change** (home page and `/example-report`):

| # | Element | Target ES | Target EN | Keys | Public when a key is off |
|---|---|---|---|---|---|
| R-1 | Header (home) | Agencia de ejemplo · Semana del 26 oct al 1 nov · Demo con datos ficticios | Example agency · Week of 26 Oct to 1 Nov · Demo with fictional data | `reportInLogin` | hide the section |
| R-2 | Status line, §6 | **removed in both views** | **removed** | | |
| R-3 | Consultas recibidas, definition | Consultas nuevas registradas en la semana. | New enquiries recorded in the week. | `reportInLogin` | hide the section |
| R-4 | Respondidas, definition | Consultas con una respuesta automática. Las otras 2 llegaron en otro idioma: no se envía nada automáticamente. | Enquiries with an automatic reply. The other 2 arrived in another language: nothing is sent automatically. | `replySpanish` | floor |
| R-5 | Chart note | Cuatro semanas de ejemplo. | Four example weeks. | `reportTrend` | hide the chart |
| R-6 | Channel note and basis | Las mismas 25, según el canal de llegada. | The same 25, by the channel they arrived on. | `reportTrend` | hide with the block |
| R-7 | Insight: Tu mejor canal | WhatsApp · 10 de 25 consultas | WhatsApp · 10 of 25 enquiries | `reportTrend` | hide all three insights |
| R-8 | Insight state line | **removed in both views** | **removed** | | |
| R-9 | Base line, `/example-report` | Base: consultas registradas en NuovaSolution, de lunes a domingo. Respondida no es lo mismo que entregada: el informe no mide lo que llega al cliente. | Basis: enquiries recorded in NuovaSolution, Monday to Sunday. Answered is not the same as delivered: the report does not measure what reaches the customer. | `reportInLogin` | hide the section |
| R-10 | Close, `/example-report`, line | El informe de tu agencia se crea con tus consultas; no hay cifras que rellenar. | Your agency's report is built from your enquiries; there are no figures to fill in. | `trial`, `publicSignup` | with "Acceso por invitación." · "Access by invitation." in front |
| R-11 | Funnel, the rates | every rate on the 25 received: 92 % · 24 % · 16 %, with the note "Porcentajes sobre las 25 consultas recibidas." | the same, "Percentages of the 25 enquiries received." | `reportTrend` | hide |

R-11 fixes a mismatch on `2dfa67d`: the funnel shows "26 %" for viewings (6 of 23) next to the insight "24 % · 6 de 25".

**The switch "Sin / Con NuovaSolution"** (home page and `/example-report`). It is one fictional week and the same as above. The block
names no channel, so it holds in every channel set.

| Element | ES | EN |
|---|---|---|
| Switch | Sin NuovaSolution · Con NuovaSolution | Without NuovaSolution · With NuovaSolution |
| Mark, in sight of the figures | Ejemplo con datos ficticios · la misma semana | Example with fictional data · the same week |
| Lead | 25 consultas de la agencia de ejemplo, que abre de 10:00 a 14:00 y de 17:00 a 20:00. | 25 enquiries to the example agency, which is open 10:00 to 14:00 and 17:00 to 20:00. |
| Assumption, small | En este ejemplo nadie contesta con la oficina cerrada. Tu agencia puede trabajar de otra forma. | In this example nobody answers while the office is closed. Your agency may work differently. |

| Row ES | Row EN | Sin | Con | Definition ES | Definition EN |
|---|---|---|---|---|---|
| Consultas de la semana | Enquiries in the week | **25** | **25** | Las mismas en los dos casos. | The same in both cases. |
| Llegaron con la oficina cerrada | Arrived while the office was closed | **9** | **9** | Antes de abrir 2, a mediodía 2, después de cerrar 5. | Before opening 2, at midday 2, after closing 5. |
| De ellas, pedían visita | Of those, asking for a viewing | **2** | **2** | Dos de las 6 visitas pedidas de la semana. | Two of the week's 6 viewings asked for. |
| Sin respuesta hasta que abre la oficina | No reply until the office opens | **9** | **0** | Con NuovaSolution, esas 9 reciben la respuesta automática al llegar. | With NuovaSolution, those 9 get the automatic reply when they arrive. |
| Esperan al día siguiente | Waiting until the next day | **5** | **0** | Las que llegaron después de las 20:00. | Those that arrived after 20:00. |
| Esperan a una persona para la primera respuesta | Waiting for a person for the first reply | **25** | **2** | Con NuovaSolution, las 2 que llegaron en otro idioma. | With NuovaSolution, the 2 that arrived in another language. |
| En su ficha, con prioridad y motivo | On their record, with priority and reason | **lo que alguien anote** · **whatever someone notes down** | **25** | Las 25, sin copiar nada a mano. | All 25, with nothing copied by hand. |

| Close of the state | ES | EN |
|---|---|---|
| Sin | 9 consultas esperan a que abra la oficina; 5 de ellas, hasta el día siguiente. 2 de esas 9 pedían visita. | 9 enquiries wait for the office to open; 5 of them until the next day. 2 of those 9 were asking for a viewing. |
| Con, first sentence | Ninguna consulta se pierde de vista: 23 respondidas, 2 esperando a una persona y las 25 en su ficha. | No enquiry slips out of sight: 23 answered, 2 waiting for a person and all 25 on their record. |
| Con, second sentence (`reportTrend`) | Y cada semana ves de dónde llegan tus clientes, para decidir dónde crecer. | And each week you see where your clients come from, so you can decide where to grow. |
| Con, second sentence, `reportTrend` off | Y cada semana ves qué sigue abierto. | And each week you see what is still open. |

**Keys of the block:** `replySpanish`, `crm`, `replyOutOfHours`. If any of them is off, hide the whole block. With
`priorityWithReason` off, the last row reads "En su ficha" · "On their record".

**Not in this block, as the owner orders:** no €, no %, no revenue, sales or commission line, no time-saved figure, no statement about
real agencies, and no change to the 6 viewings (Sin and Con are the same 6: the example claims no extra viewing).

**The sums, for the check:**

| Check | Sum |
|---|---|
| Channels | 10 + 6 + 3 + 2 + 4 = **25**; public 14 + 11 = **25** |
| Answered | 23 + 2 = **25** |
| Hours | 13 rows = **25**; peak 6 |
| Office hours | open 16 + closed 9 = **25**; closed 2 + 2 + 5 = **9** |
| Answered, split | the 2 in another language arrived with the office open, so 14 open + 9 closed = **23** |
| Viewings | 4 agreed ≤ 6 asked for; 2 asked for while closed ≤ 6 |
| Rates | 23/25 = 92 %, 6/25 = 24 %, 4/25 = 16 % |
| Chart | last week 25 / 23 |

---

## 20. Entry, plans, trust, FAQ, close, 3D

**The way in: 14 days in 3 steps, for the target state, no technique.**

| Element | ES | EN |
|---|---|---|
| Title | 14 días gratis, en 3 pasos | 14 days free, in 3 steps |
| Step 1 | **Crea tu cuenta.** Tu nombre, tu email de trabajo y una contraseña. | **Create your account.** Your name, your work e-mail and a password. |
| Step 2 | **Configura tu agencia.** Tus datos, tu logo y tu equipo, a tu ritmo. | **Set up your agency.** Your details, your logo and your team, at your own pace. |
| Step 3 | **Conectamos tu buzón contigo.** Lo hacemos juntos y lo probamos con un mensaje real. | **We connect your mailbox with you.** We do it together and test it with a real message. |
| Line | Los 14 días empiezan cuando tu agencia está lista. Sin método de pago y sin renovación automática. | The 14 days start when your agency is ready. No payment method and no automatic renewal. |
| Small line | Te decimos antes de empezar si tu buzón ya se puede conectar. | We tell you before you start whether your mailbox can be connected yet. |
| Action | Pruébalo gratis 14 días | Try it free for 14 days |

- **Facts:** the trial start and "no payment method" are in API's register. The joint connection and the check before registering are in API's `API_D5_DIREKT_1106_v1.md` §3 and §6.
- **Keys:** `trial`, `publicSignup`, `mailboxConnection`.

**In public while the trial is off** (the way in becomes a request):

| Keys on | Title ES · EN | Steps | Line |
|---|---|---|---|
| `mailboxConnection` | Cómo empezar · How to start | 1 **Pides acceso.** · **You request access.** 2 **Te enseñamos el sistema.** · **We show you the system.** 3 as step 3 above | "Acceso por invitación." · "Access by invitation." |
| none | the same | 1 and 2 only | the same |

**Plans (§9):**

| # | Element | Target ES | Target EN | Keys | Public when a key is off |
|---|---|---|---|---|---|
| P-1 | Intro | Empieza con 14 días de Essential, gratis. Después eliges el plan que encaja con tu agencia. | Start with 14 days of Essential, free. Then choose the plan that fits your agency. | `trial`, `plans` | see P-5 |
| P-2 | Action, Essential | Pruébalo gratis 14 días | Try it free for 14 days | `trial`, `publicSignup` | Solicita una propuesta · Request a proposal |
| P-3 | Action, Growth and Enterprise | Solicita una propuesta | Request a proposal | | |
| P-4 | Legend | Un ✓ donde el plan incluye la función. | A ✓ where the plan includes the function. | `plans` | see P-5 |
| P-5 | The table | §9: ✓ or —, no status word | §9 | `plans`, each row its key | a row with its key off is hidden. With `plans` off, or when the plans no longer differ: **no plan names and no table**. One block: H2 "Qué incluye" · "What's included", the rows that are on as a list, the price line of §9, the action of H-5 |
| P-6 | Line, Growth | as §9 | as §9 | `taskList`, `matching`, `followup` | names only the parts that are on |
| P-7 | Line, Enterprise | as §9 | as §9 | `instagram`, `model3d` | names only the parts that are on |
| P-8 | Row, integrations | HubSpot, Pipedrive, Zoho, Salesforce, Outlook | the same | `integrations`, `outlook` | names only the parts that are on |

**Trust (§10.1).** Lines 2 and 3 are unchanged. Line 1 is §13 N-1.

**FAQ, home page (§10.2):**

| Question | Target ES | Target EN | Keys | Public when a key is off |
|---|---|---|---|---|
| ¿Qué hace NuovaSolution? | Responde en español las consultas que llegan por ⟦canales⟧ y guarda lo importante de cada una en su ficha, con su prioridad y su motivo. | It answers the enquiries that arrive on ⟦canales⟧ in Spanish and keeps what matters from each one on its record, with its priority and reason. | `replySpanish`, `crm`, `priorityWithReason` | off: end after "en su ficha." · "on its record." |
| ¿En qué idiomas responde? | En español. Detecta el idioma de cada consulta; en otro idioma no se envía nada automáticamente. | as §10.2 | `languageNoted` | off: "En español." · "Spanish." |
| ¿Sabe el cliente que responde un asistente? | as §10.2 | as §10.2 | `replySpanish` | floor |
| ¿Avisa a mi equipo? | Sí. Cuando una consulta es importante, avisa por email a la persona que toca, con el motivo. | Yes. When an enquiry is important, it alerts the right person by e-mail, with the reason. | `alert` | hide |
| ¿Cómo empiezo? | Pruébalo gratis 14 días, sin método de pago: creas tu cuenta, configuras tu agencia y conectamos tu buzón contigo. | Try it free for 14 days, with no payment method: you create your account, set up your agency and we connect your mailbox with you. | `trial`, `publicSignup`, `mailboxConnection` | "Por invitación: pide acceso y te enseñamos el sistema." · "By invitation: request access and we will show you the system." |
| ¿Funciona con mi CRM? | Incluye un CRM. También se conecta con HubSpot, Pipedrive, Zoho y Salesforce. | It includes a CRM. It also connects to HubSpot, Pipedrive, Zoho and Salesforce. | `crm`, `integrations` | off: "Incluye un CRM." · "It includes a CRM." |
| ¿Cuánto cuesta? | as §10.2 | as §10.2 | | stays |

**Close (§10.3), the line:**

| Target ES | Target EN | Keys | Public when off |
|---|---|---|---|
| Te enseñamos la demo con tus canales y respondemos tus preguntas. | We show you the demo with your channels and answer your questions. | `mailboxConnection` | "Te enseñamos la demo y respondemos tus preguntas." · "We show you the demo and answer your questions." |

**3D (§8).** The status word is gone. The texts stay. The whole section, including the action, hangs on `model3d`; off means hide.

---

## 21. The detail pages

The same rule applies. On `2dfa67d`, the delivered HTML holds these counts of the readiness word (GET, fixed URL, 06.11.; hidden panels
included): home 94, `/packages` 66, `/platform` 15, `/example-report` 7, `/faq` 5, `/trial` 4, `/contact` 1, `/platform/daily-assistant` 1.
EN has the same counts.

**A finding, independent of the status word.** `faq.ts:125`, `:133` and `:141` still say the team **gets an e-mail alert today**. API's
register holds the alert back in production, and row C-6 was not applied. The three rows below put them under `alert`.

**FAQ page (`lib/content/faq.ts`):**

| Q | Target ES | Target EN | Keys | Public when a key is off |
|---|---|---|---|---|
| frame, h1 | Respuestas claras sobre lo que hace NuovaSolution | Straight answers about what NuovaSolution does | | stays |
| frame, lead | Aquí está lo que hace el producto, sin promesas de más. | This is what the product does, with no promises beyond that. | | stays |
| Q-01 | Responde a las consultas que recibe tu agencia, registra cada una con lo que ha pedido el cliente y convierte una petición de visita en una tarea que tu equipo toma y cierra. | as today | `replySpanish`, `crm`, `taskList` | off: end after "lo que ha pedido el cliente." · "what the customer asked for." |
| Q-02 | Consultas por ⟦canales⟧. | Enquiries on ⟦canales⟧. | list | stays, with the list |
| Q-03 | as today | as today | `replyOutOfHours` | hide |
| Q-06 | as today | as today | `replySpanish` | floor |
| Q-08 | No. Lo que responde sale de lo que escribió el cliente y de lo que tu agencia ha confirmado. Solo propone inmuebles de tu cartera. | No. What it answers comes from what the customer wrote and what your agency has confirmed. It proposes only listings from your portfolio. | `matching` | off: without the last sentence |
| Q-09 | as today | as today | `taskList` | off: end after "de tu gente." · "with your people." |
| Q-31 | Sí, por email. Cuando una consulta parece importante, la persona adecuada de tu equipo recibe un aviso con el motivo. | Yes, by e-mail. When an enquiry looks important, the right person on your team gets an alert with the reason. | `alert` | hide |
| Q-41 | En su propia lista, cada persona entrando como ella misma. | In their own list, each person signed in as themselves. | `taskList` | hide |
| Q-42 | Sí. Cada persona puede preguntar «¿Qué tengo hoy?» y el asistente le explica qué va primero y por qué. | Yes. Each person can ask "What do I have today?" and the assistant explains what comes first and why. | `dailyVoice` | hide |
| Q-43 | Una. Si la misma persona escribe por los dos canales, todo queda en una sola ficha. | One. If the same person writes on both channels, everything stays on one record. | `oneRecordAcrossChannels` | **limit stays:** "Dos, hasta que algo las una. Preferimos decírtelo ahora y no que lo descubras en tu segunda semana." · "Two, until something ties them together. We would rather tell you now than let you find it in your second week." |
| Q-11 | 14 días de Essential, gratis y sin método de pago. Creas la cuenta tú mismo. | 14 days of Essential, free and with no payment method. You create the account yourself. | `trial`, `publicSignup` | hide, with Q-12 |
| Q-13 | Te decimos el precio y el periodo de facturación para tu agencia antes de acordar nada. | We tell you the price and the billing period for your agency before anything is agreed. | | stays |
| Q-16 | No. Puedes empezar por tu cuenta. | No. You can start on your own. | `trial`, `publicSignup` | "No hace falta una llamada comercial: escríbenos y te enseñamos el sistema." · "No sales call is needed: write to us and we will show you the system." |
| Q-21 | §13 N-2 | §13 N-2 | | |
| Q-22 | as today | as today | `taskList` | hide |
| Q-44 | **unchanged** (no retention period is published until counsel has answered) | **unchanged** | | stays |
| Q-46 | En los mensajes no: una consulta de texto se responde cuando llega. En el teléfono, tu horario dirige el asistente. | In messages, no: a text enquiry is answered whenever it arrives. On the phone, your hours steer the assistant. | `replySpanish`, `phoneAssistant` | off: "No: una consulta de texto se responde cuando llega, a cualquier hora." · "No: a text enquiry is answered whenever it arrives, at any hour." |
| group title | Otras preguntas | Other questions | | hide if the group is empty |
| Q-18/19 | Sí. Se incluye un CRM y, si ya usas uno de estos, lo conectamos contigo. | Yes. A CRM is included and, if you already use one of these, we connect it with you. | `integrations` | hide |
| Q-20 | Sí, con el buzón de tu agencia, junto con nosotros. | Yes, with your agency's mailbox, together with us. | `outlook` | hide |
| Q-26 | not shown (§14) | not shown | | hide |
| Q-27 | Sí. El asistente telefónico atiende la llamada, deja lo que pide el cliente en su ficha y una tarea a tu equipo. El precio lo da una persona. | Yes. The phone assistant answers the call, leaves what the customer asks for on their record and a task for your team. A person gives the price. | `phoneAssistant` | hide |
| Q-28 | No lo gestiona solo: preparas la publicación con los datos del inmueble y sale en tu cuenta cuando tú la apruebas. | Not on its own: you prepare the post with the listing's details and it goes out on your account when you approve it. | `instagram` | hide |
| Q-29 | as today | as today | `model3d` | hide |
| Q-30 | No hacemos campañas ni compramos leads. Recogemos los leads de los anuncios que ya tienes. | We do not run campaigns or buy leads. We take in the leads from the ads you already run. | `adsLeads` | off: "No. No hacemos campañas ni compramos leads." · "No. We do not run campaigns or buy leads." |

**Platform and modules (`platform-map.ts`, `capabilities.ts`).** No state chip in either view. A row with its key off is hidden in
public, and so is a group with no row left.

| Place | Target ES | Target EN | Keys | Public when a key is off |
|---|---|---|---|---|
| group line, answers | Las consultas por ⟦canales⟧ se responden en español. Una consulta en otro idioma no recibe respuesta automática. | Enquiries on ⟦canales⟧ are answered in Spanish. An enquiry in another language gets no automatic reply. | list | stays, with the list |
| row WhatsApp | Respuesta por WhatsApp, con el número de tu agencia. | Replies on WhatsApp, on your agency's own number. | `replyWhatsapp`, `whatsappOwnNumber` | hide |
| row Email | §13 N-5 | §13 N-5 | | |
| row Paso a una persona, state line | La petición queda registrada, aparece en la lista de tareas y avisa en cada traspaso. | The request is recorded, appears in the task list and alerts at each handover. | `crm`, `taskList`, `alert` | off: "La petición queda registrada." · "The request is recorded." |
| row Avisos, Propuestas, Seguimientos, Tareas, Asistente de la mañana, Formularios web, Asistente telefónico, Instagram, Comentarios, 3D | the line as today | as today | `alert`, `matching`, `followup`, `taskList`, `dailyVoice`, `webform`, `phoneAssistant`, `instagram`, `instagram`, `model3d` | hide |
| row Calendario | not shown (§14) | not shown | | hide |
| row Informes | El informe completo en tu acceso de agencia y un resumen semanal por email. Lo que llega al cliente no se mide. | The full report in your agency login and a weekly e-mail summary. What reaches the customer is not measured. | `reportInLogin`, `weeklyEmail` | off: "El informe completo en tu acceso de agencia. Lo que llega al cliente no se mide." · "The full report in your agency login. What reaches the customer is not measured." |
| row Leads de anuncios | Recoge los leads de los anuncios que ya tienes. Las campañas siguen siendo tuyas. | It takes in the leads from the ads you already run. The campaigns stay yours. | `adsLeads` | hide |
| block "En construcción" (`es.ts:49–50`) | **removed in both views** | **removed** | | |
| `capabilities.ts:85` | Un aviso por email a la persona adecuada cuando una consulta importa. | An e-mail alert to the right person when an enquiry matters. | `alert` | hide |
| `capabilities.ts:231`, state line | **removed in both views** | **removed** | | |
| `capabilities.ts:304`, `:319`, Social module | no target text; scene S-10 covers it | | `instagram` | hide |
| `capabilities.ts:372` | Una experiencia de la propiedad terminada, creada por NuovaSolution y revisada por una persona antes de llegar a un comprador. Un servicio premium, bajo petición. | A finished property experience, created by NuovaSolution and checked by a person before it reaches a buyer. A premium service, on request. | `model3d` | hide |
| `es.ts:90`, `q5`, module pages | Funciona con ⟦canales⟧, con respuestas en español. | Works with ⟦canales⟧, with replies in Spanish. | list | stays, with the list; removed on `/platform/daily-assistant` (C-30) |
| `es.ts:146` | En español, por ⟦canales⟧. | In Spanish, on ⟦canales⟧. | list | stays, with the list |
| `es.ts:307` | Elige una escena. | Choose a scene. | | stays |

**Trial, packages, contact (`es.ts`, and EN at the same keys):**

| Place | Target ES | Target EN | Keys | Public when a key is off |
|---|---|---|---|---|
| `/packages` h1 and lead | the existing `h1Neutral` and `leadNeutral` | the same | `trial`, `publicSignup` | h1 "Qué incluye NuovaSolution" · "What NuovaSolution includes"; lead "Acceso por invitación. Te decimos el precio para tu agencia antes de acordar nada." · "Access by invitation. We tell you the price for your agency before anything is agreed." |
| `baselineLine` | Todos los planes incluyen las respuestas, la ficha y el CRM. Las tareas del equipo, desde Growth. | All plans include the replies, the record and the CRM. The team's tasks, from Growth. | `plans`, `taskList` | hide with the table (P-5) |
| packages FAQ, the C-14 answer | No. Puedes empezar por tu cuenta. | No. You can start on your own. | `trial`, `publicSignup` | as Q-16 |
| packages FAQ, card and 14-day answers | as today | as today | `trial` | hide |
| `/trial` h1, state line | h1 "Prueba gratis durante 14 días."; **state line removed** | h1 "Try it free for 14 days."; **removed** | `trial`, `publicSignup` | the route leads to `/contact` |
| `/trial` step Canales | Conectamos contigo el buzón y el WhatsApp de tu agencia y probamos cada canal con un mensaje real. | We connect your agency's mailbox and WhatsApp with you and test each channel with a real message. | §13 N-4 | |
| `/trial` step Fuentes de leads | Dinos de dónde te llegan los leads y los conectamos contigo. | Tell us where your leads come from and we connect them with you. | `adsLeads` | off: "Dinos de dónde te llegan los leads." · "Tell us where your leads come from." |
| `/trial` step CRM | Hay un CRM incluido desde el principio. Si usas otro, dinos cuál y lo conectamos contigo. | A CRM is included from the start. If you use another, tell us which and we connect it with you. | `integrations` | off: first sentence only |
| `tryFree` (`es.ts:63`) | Prueba gratis durante 14 días | Try it free for 14 days | `trial`, `publicSignup` | hide |
| `/contact` `trialBody` (`es.ts:491`) | Prueba gratis durante 14 días. Sin método de pago, sin llamada comercial. | Try it free for 14 days. No payment method, no sales call. | `trial`, `publicSignup` | hide the block |

**Appendix C.** Rows C-2, C-3, C-6, C-7, C-9, C-10, C-11, C-13, C-14, C-15, C-16, C-16a, C-16b, C-19, C-22, C-23, C-24, C-26 and C-27 are
replaced: §23 gives their old and new wording.

---

## 22. The brand sentence and the WORKING lines

**The brand sentence** (Social's list, point 4; `/legal-notice`, `/aviso-legal`):

| ES | EN |
|---|---|
| NuovaSolution es una marca de ⟦E14: NOMBRE⟧. | NuovaSolution is a brand of ⟦E14: NAME⟧. |

- The name comes from the owner, with its accents exactly as on the DNI. It is not filled in here, and no sentence is live until the owner's line `WEBSITE-KLEINFIX = JA`.
- `META_LEGAL_TEXT_FINAL.md` §3 says "nombre comercial". I leave that as it is. **For counsel:** whether "marca" is acceptable without a registered mark. No missing legal text is written here: privacy, terms and the deletion page stay with counsel and E14 (L-1).

**The WORKING lines of Redesign's return §6, each with a verdict:**

| Line | Verdict | ES | EN |
|---|---|---|---|
| E-mail reply | **changed** ("Apunto" struck, as in Question A) | ¡Hola, Carmen! Gracias por escribirnos. Quieres vender tu piso de 3 dormitorios en Fuengirola, cerca del paseo marítimo, y te gustaría una valoración esta semana, ¿verdad? ¿Te viene mejor por la mañana o por la tarde? | Hi Carmen, thanks for writing to us. You want to sell your 3-bedroom flat in Fuengirola, near the seafront, and you'd like a valuation this week, is that right? Would the morning or the afternoon suit you better? |
| E-mail next step | accepted | Una persona de tu equipo le propone día y hora para la valoración. | Someone on your team proposes a day and time for the valuation. |
| Phone, the assistant | **changed** ("lo anoto" sounds like the struck "Anoto") | Gracias, Álvaro. Queda para el equipo: la villa de Elviria, el precio y el margen, y que prefieres que te llamen por la tarde. | Thank you, Álvaro. It's with the team now: the villa in Elviria, the price and the room to negotiate, and that you'd prefer a call in the afternoon. |
| Surface `priority` | accepted, except Sofía: `webform` on: "Formulario web · 11:31"; off: "Email · 11:31" (the demo's form sends her enquiry at 11:31) | | |
| Surface `reply` | accepted, with the foot "Hora de envío, no de entrega" | | |
| Surface `record` | accepted | | |
| Surface `origin` | accepted; the two "Próximamente" rows become rows with content, below | | |
| Surface `language` | accepted | | |
| Surface `inbox` | **note changed** | En el buzón de tu agencia | In your agency's mailbox |
| Surface `matching`, `followup`, `social` | accepted; no status mark; "Fotos de muestra" stays | | |
| Surface `team` and the Daily view | accepted; "Tomar · Demo" and "Vista de ejemplo de la app del equipo" stay | | |
| Channel note | accepted | Las mismas 25, según el canal de llegada | The same 25, by the channel they arrived on |
| Funnel step lines | accepted, except "respuesta automática enviada" becomes "respuesta automática"; rates per R-11 | | |
| Hours' note | accepted; rows per §19 | | |
| Open-cases table | accepted; Sofía's channel follows `webform` as above | | |
| Demo state lines (`home-demo.ts`) | **removed in both views** | | |

**The two new rows of the surface `origin`** (fictional people; each row needs its key):

| Who | What ES | What EN | Origin ES · EN | Key |
|---|---|---|---|---|
| Inés Navarro | Piso con terraza en Estepona · EST-204 | Flat with terrace in Estepona · EST-204 | Portal · Portal | `adsLeads` |
| Daniel Ruiz | Adosado en Mijas | Townhouse in Mijas | Anuncio · Ad | `adsLeads` |

**Marking:** editorial and technical. Not a legal approval, not a Meta approval. No publication released.

---

## 23. Answer to the Reviewer's §G-6, and every earlier place with its old and new wording

**For:** Redesign (applies it) and the Reviewer (checks against it).

| §G-6 | Answer (owner, 06.11.) | Where |
|---|---|---|
| 1 | Status words apply only internally, in the register (§1) and in `lib/claims.ts`, not on the page. | §1 |
| 2 | The table shows what a plan contains, with no status word per cell and no fixed 19 rows in the public state. | §9 |
| 3 | Follows from 2: the condition "a status word in every cell" (C03) does not stand. | §9 |
| 4 | "Próximamente" also goes from whole sentences. "Informe ampliado: próximamente" and N-1 … N-4 are replaced by true sentences with no such word and no commitment. A statement on connecting a mailbox or WhatsApp appears in public only when it is true. **The reading in §G-6.4 (full sentences stay) therefore does not apply.** | §13, §19, this list |
| 5 | The notice is in §14, with no date and no promise. | §14 |
| 6 | "No medido" stays, twice, in both views. | §14, §19 |
| 7 | Not answered here: how thin the public view may be is the owner's decision. | |

**How to read the list.** "New" is what stands **in public while the key is off**. "No text" means the element is not there. The target
sentence for the preview is in the row named in the last column. Files named in a C-row that no longer exist on `2dfa67d`
(`home-sections.ts`, `home-sequence.ts`, `package-matrix.ts`) are listed only so the old wording cannot return.

**A. §2–§10 of this file**

| # | Place | Old ES | Old EN | New ES | New EN | Preview |
|---|---|---|---|---|---|---|
| V-1 | §2, line under the actions; C-9 | Acceso por invitación mientras preparamos el registro público. | Access by invitation while public registration is being prepared. | Acceso por invitación. | Access by invitation. | H-6 |
| V-2 | §3, mark on Formulario web and Teléfono | Próximamente | Coming soon | no text | no text | no mark |
| V-3 | §3, demo state lines, `home-demo.ts` | Incluido: la respuesta por email (Gmail) y la ficha con su prioridad. · Próximamente: el aviso a la persona que toca y la lista de tareas. · Próximamente: el formulario web. · Próximamente: el asistente telefónico, en español. | Included: the e-mail reply (Gmail) and the record with its priority. · Coming soon: the alert to the right person and the task list. · Coming soon: the web form. · Coming soon: the phone assistant, in Spanish. | no text | no text | no text |
| V-4 | §5, scene 1 | La ficha marca la prioridad y por qué. El aviso a la persona que toca llega próximamente. | The record marks the priority and why. The alert to the right person is coming soon. | La ficha marca la prioridad y por qué. | The record marks the priority and why. | S-4 |
| V-5 | §5, scene 4 | La ficha guarda el canal de origen. Portales y anuncios, próximamente. | The record keeps the channel of origin. Portals and ads, coming soon. | La ficha guarda de dónde llega cada consulta: ⟦canales⟧. Así ves qué canal te trae clientes. | The record keeps where each enquiry comes from: ⟦canales⟧. So you see which channel brings you clients. | S-7 |
| V-6 | §5, scene 5 | NuovaSolution detecta el idioma y lo guarda. Hoy responde en español; en otro idioma no se envía nada automáticamente. | NuovaSolution detects the language and keeps it. Today it replies in Spanish; in another language nothing is sent automatically. | NuovaSolution detecta el idioma de cada cliente y lo guarda en su ficha. Si no es español, no se envía nada automáticamente: lo escribe una persona. | NuovaSolution detects each client's language and keeps it on their record. If it is not Spanish, nothing is sent automatically: a person writes it. | S-2 |
| V-7 | §5, scenes 7–10, the status; scene 1 and 4 quiet notes | Próximamente · El aviso a la persona que toca · próximamente · Portales y anuncios · próximamente | Coming soon · The alert to the right person · coming soon · Portals and ads · coming soon | no text; the scene follows its key | no text | S-6, S-8, S-9, S-10 |
| V-8 | §5, button in scene 7 | Proponer a Laura · Próximamente | Propose to Laura · Coming soon | no text (the scene is hidden) | no text | Proponer a Laura · Propose to Laura |
| V-9 | §6, status line | Incluido: el informe en el acceso de tu agencia. Próximamente: el resumen semanal por email y el informe ampliado. | Included: the report in your agency's login. Coming soon: the weekly e-mail summary and the extended report. | no text | no text | no text |
| V-10 | §6, chart note | Cuatro semanas de ejemplo. La evolución por semanas forma parte del informe ampliado: próximamente. | Four example weeks. The week-by-week trend is part of the extended report: coming soon. | no text (the chart follows `reportTrend`) | no text | Cuatro semanas de ejemplo. · Four example weeks. |
| V-11 | §6, "Por canal", marks | próximamente | coming soon | figures per §19 | figures per §19 | §19 |
| V-12 | §7, line under the insights | Estas conclusiones forman parte del informe ampliado: próximamente. | These insights are part of the extended report: coming soon. | no text | no text | no text |
| V-13 | §7, close | Acceso por invitación mientras preparamos el registro público. El informe de tu agencia se crea con tus consultas; no hay cifras que rellenar. | Access by invitation while public registration is being prepared. Your agency's report is built from your enquiries; there are no figures to fill in. | Acceso por invitación. El informe de tu agencia se crea con tus consultas; no hay cifras que rellenar. | Access by invitation. Your agency's report is built from your enquiries; there are no figures to fill in. | R-10 |
| V-14 | `example-report.ts`, channel basis | Las mismas 25, según el canal de llegada. Los canales marcados como próximamente no tienen cifras: no están en producción. | The same 25, by the channel they arrived on. Channels marked coming soon carry no figure: they are not in production. | Las mismas 25, según el canal de llegada. | The same 25, by the channel they arrived on. | R-6 |
| V-15 | §8, status | Próximamente | Coming soon | no text (the section follows `model3d`) | no text | no text |
| V-16 | §9, intro | Hoy, acceso por invitación. Los planes se podrán contratar con el registro público. | Today, access by invitation. Plans can be booked once public registration opens. | Acceso por invitación. | Access by invitation. | P-1 |
| V-17 | §9, every cell | Incluido · No incluido · Próximamente | Included · Not included · Coming soon | ✓ · — · the row is absent | ✓ · — · the row is absent | ✓ · — |
| V-18 | legend, `home-1103.ts` | Un ✓ solo donde la función está incluida hoy. | A ✓ only where the function is included today. | Un ✓ donde el plan incluye la función. | A ✓ where the plan includes the function. | P-4 |
| V-19 | §10.1, line 1 | Pides acceso y te enseñamos el sistema. La conexión del buzón y del WhatsApp de tu agencia llega próximamente. | You request access and we show you the system. Connecting your agency's mailbox and WhatsApp is coming soon. | Pides acceso y te enseñamos el sistema. | You request access and we show you the system. | N-1 |
| V-20 | §10.2, ¿Avisa a mi equipo? | Próximamente. Hoy la prioridad y su motivo quedan en la ficha. | Coming soon. Today the priority and its reason stay on the record. | no text (the question is hidden) | no text | §20 |
| V-21 | §10.2, ¿Cómo empiezo? | Hoy por invitación: pide acceso y te enseñamos el sistema. El registro público y la prueba de 14 días llegan próximamente. | By invitation today: request access and we will show you the system. Public registration and the 14-day trial are coming soon. | Por invitación: pide acceso y te enseñamos el sistema. | By invitation: request access and we will show you the system. | §20 |
| V-22 | §10.2, ¿Funciona con mi CRM? | Incluye un CRM. HubSpot, Pipedrive, Zoho y Salesforce, próximamente. | It includes a CRM. HubSpot, Pipedrive, Zoho and Salesforce, coming soon. | Incluye un CRM. | It includes a CRM. | §20 |
| V-23 | §11, EX-1 | Cuatro semanas de ejemplo. La evolución por semanas forma parte del informe ampliado, en preparación. | Four example weeks. The week-by-week trend is part of the extended report, in preparation. | as V-10 | as V-10 | R-5 |

**B. §13, the addition `702a11d`**

| # | Place | Old ES | Old EN | New ES | New EN | Preview |
|---|---|---|---|---|---|---|
| V-24 | N-1 | as V-19 | as V-19 | as V-19 | as V-19 | N-1 |
| V-25 | N-2, FAQ Q-21 | Hoy te enseñamos el sistema con datos de ejemplo. La conexión del buzón y del WhatsApp de tu agencia llega próximamente; cuando esté lista, probaremos cada canal con un mensaje real antes de darlo por conectado. | Today we show you the system with example data. Connecting your agency's mailbox and WhatsApp is coming soon; once it is ready, we will test each channel with a real message before calling it connected. | Te enseñamos el sistema con datos de ejemplo. | We show you the system with example data. | N-2 |
| V-26 | N-3, onboarding step | Tus canales · La conexión del buzón y del WhatsApp de tu agencia llega próximamente. | Your channels · Connecting your agency's mailbox and WhatsApp is coming soon. | no text (the step is hidden) | no text | N-3 |
| V-27 | N-4, trial step | Próximamente: conectar el buzón y el WhatsApp de tu agencia. | Coming soon: connecting your agency's mailbox and WhatsApp. | no text (`/trial` leads to `/contact`) | no text | N-4 |
| V-28 | N-5 | Respuesta por email: próximamente para el buzón de tu agencia. (and "…en un buzón que operamos para ti.") | Reply by e-mail: coming soon for your agency's mailbox. (and "…a mailbox we operate for you.") | no text | no text | N-5 |
| V-29 | N-6 | Demo: así funcionará con el buzón de tu agencia (próximamente). | Demo: this is how it will work with your agency's mailbox (coming soon). | no text | no text | no text |

**C. The appendix, and the same wording in the code on `2dfa67d`**

| # | Place | Old ES | Old EN | New ES | New EN | Preview |
|---|---|---|---|---|---|---|
| V-30 | C-2, C-3 | En preparación: el aviso por email y la lista de tareas. · En preparación: el aviso por email a la persona que toca, la lista de tareas para tomarlas y cerrarlas, y el asistente que explica el orden. | In preparation: the e-mail alert and the task list. · In preparation: the e-mail alert to the right person, the task list to take and close tasks, and the assistant that explains the order. | no text | no text | no text |
| V-31 | C-4, C-5, C-20, C-21, state chips (`platform-map.ts`) | Próximamente · Por encargo · Disponible en parte · Disponible | Coming soon · To order · Partly available · Available | no text; the row follows its key | no text | no chip |
| V-32 | C-6; `faq.ts:125` | Todavía no. El aviso por email a la persona adecuada de tu equipo, con el motivo, está en preparación. Hoy la consulta queda en su ficha. (code: Sí, por email. … Todavía sin horario de oficina.) | Not yet. The e-mail alert to the right person on your team, with the reason, is in preparation. Today the enquiry is kept on its record. (code: Yes, by e-mail. … No office hours yet.) | no text (the question is hidden) | no text | Q-31 |
| V-33 | C-7; `capabilities.ts:85` | Un aviso por email a la persona adecuada cuando una consulta importa (próximamente). | An e-mail alert to the right person when an enquiry matters (coming soon). | no text | no text | §21 |
| V-34 | C-10 | Tres paquetes, con su estado real | Three packages, with their real state | Qué incluye NuovaSolution | What NuovaSolution includes | §21 |
| V-35 | C-11; `es.ts:372` | Hoy los paquetes todavía no se pueden contratar: el registro y la prueba de 14 días están próximamente. Te decimos el precio para tu agencia antes de acordar nada. | The packages cannot be booked yet: registration and the 14-day trial are coming soon. We tell you the price for your agency before anything is agreed. | Acceso por invitación. Te decimos el precio para tu agencia antes de acordar nada. | Access by invitation. We tell you the price for your agency before anything is agreed. | §21 |
| V-36 | C-13; `faq.ts:163` | Será de 14 días de Essential, gratis y sin método de pago. El registro público está próximamente; hasta entonces, escríbenos y te enseñamos el sistema. | It will be 14 days of Essential, free and with no payment method. Public registration is coming soon; until then, write to us and we will show you the system. | no text (the question is hidden) | no text | Q-11 |
| V-37 | C-14; `faq.ts:198`; `es.ts:389` | No hace falta una llamada comercial: escríbenos y te enseñamos el sistema. Empezar por tu cuenta llega con el registro público, próximamente. | No sales call is needed: write to us and we will show you the system. Starting on your own comes with public registration, coming soon. | No hace falta una llamada comercial: escríbenos y te enseñamos el sistema. | No sales call is needed: write to us and we will show you the system. | Q-16 |
| V-38 | C-15 | Así será el arranque cuando abra el registro: creas la cuenta y configuras tu agencia a tu ritmo. La conexión del buzón y del WhatsApp de tu agencia llega próximamente. El precio te lo decimos para tu agencia antes de acordar nada; lo que pasa con los datos está escrito aquí. | This is how it will start once registration opens: you create the account and set up your agency at your own pace. Connecting your agency's mailbox and WhatsApp is coming soon. We tell you the price for your agency before anything is agreed; what happens with the data is written here. | Pides acceso y te enseñamos el sistema. Te decimos el precio para tu agencia antes de acordar nada. | You request access and we show you the system. We tell you the price for your agency before anything is agreed. | §20 |
| V-39 | C-16; `es.ts:446–447` | La prueba gratuita de 14 días, próximamente. · Estado: El registro público y la prueba de 14 días están próximamente. | The 14-day free trial, coming soon. · State: Public registration and the 14-day trial are coming soon. | no text (`/trial` leads to `/contact`) | no text | §21 |
| V-40 | C-16a; `es.ts:63` | Prueba gratuita de 14 días: próximamente | 14-day free trial: coming soon | no text | no text | §21 |
| V-41 | C-16b; `es.ts:491` | La prueba gratuita de 14 días, sin método de pago, llega con el registro público, próximamente. | The 14-day free trial, with no payment method, comes with public registration, coming soon. | no text (the block is hidden) | no text | §21 |
| V-42 | C-19 | En preparación · todavía no contratable | In preparation · not bookable yet | no text | no text | no text |
| V-43 | C-22 | Los modelos 3D y la publicación en Instagram están en preparación; Instagram depende además de la aprobación de la plataforma. | 3D models and Instagram publishing are in preparation; Instagram also depends on the platform's approval. | no text | no text | no text |
| V-44 | C-23 | …Cada modelo será un encargo, con o sin paquete. Estado: En preparación · todavía no contratable. | …Each model will be an order, with or without a package. State: In preparation · not bookable yet. | no text (the section follows `model3d`) | no text | …Cada modelo es un encargo, con o sin paquete. · …Each model is an order, with or without a package. |
| V-45 | C-24 | Más adelante, los modelos 3D también se podrán encargar por separado, sin ningún paquete. | Later, 3D models can also be ordered on their own, without a package. | no text | no text | Los modelos 3D también se encargan por separado, sin ningún paquete. · 3D models can also be ordered on their own, without a package. |
| V-46 | C-26; `platform-map.ts:54` | Respuesta por WhatsApp, hoy en español. Conectar el número de tu agencia, próximamente. | Replies on WhatsApp, in Spanish today. Connecting your agency's own number, coming soon. | no text (the row is hidden) | no text | §21 |
| V-47 | C-27 | Conectar la cuenta de WhatsApp Business de tu agencia está en preparación. | Connecting your agency's own WhatsApp Business account is in preparation. | no text | no text | no text |
| V-48 | `faq.ts:133` | En su propia lista, cada persona entrando como ella misma. Esa lista está próximamente; hasta entonces, tu equipo recibe por email el aviso de cada consulta importante. | In their own list, each person signed in as themselves. That list is coming soon; until then your team gets an e-mail alert for each important enquiry. | no text (the question is hidden) | no text | Q-41 |
| V-49 | `faq.ts:141` | Hoy no. Hoy tu equipo recibe por email el aviso de cada consulta importante. La lista de tareas y el asistente que explica el orden están próximamente. | Not today. Today your team gets an e-mail alert for each important enquiry. The task list and the assistant that explains the order are coming soon. | no text (the question is hidden) | no text | Q-42 |
| V-50 | `platform-map.ts:58`, state line | Incluido: la petición queda registrada · Próximamente: verla en la lista de tareas y un aviso en cada traspaso | Included: the request is recorded · Coming soon: seeing it in the task list, and a notice on every handover | La petición queda registrada. | The request is recorded. | §21 |
| V-51 | `platform-map.ts:86` | El informe completo en tu acceso de agencia. El resumen semanal por email, próximamente. Lo que llega al cliente aún no se mide. | The full report in your agency login. The weekly e-mail summary, coming soon. What reaches the customer is not measured yet. | El informe completo en tu acceso de agencia. Lo que llega al cliente no se mide. | The full report in your agency login. What reaches the customer is not measured. | §21 |
| V-52 | `capabilities.ts:231`, state line | Próximamente | Coming soon | no text | no text | no text |
| V-53 | `capabilities.ts:372` | …Un servicio premium, bajo petición, próximamente. | …A premium service, on request, coming soon. | no text (follows `model3d`) | no text | §21 |
| V-54 | `es.ts:377`, `baselineLine` | Todos los planes incluyen las respuestas y la ficha; las tareas del equipo están próximamente. El CRM está incluido desde el principio. | Every plan includes the replies and the record; the team's tasks are coming soon. The CRM is included from the start. | no text (with the table) | no text | §21 |
| V-55 | `es.ts:474`, `en.ts:513` | Dinos de dónde te llegan hoy los leads. Conectar esas fuentes está próximamente. | Tell us where your leads come from today. Connecting those sources is coming soon. | Dinos de dónde te llegan los leads. | Tell us where your leads come from. | §21 |
| V-56 | `es.ts:50`, `en.ts:56` | Un asistente telefónico que atiende llamadas está en construcción. Hoy no forma parte de lo que se puede contratar, y lo diremos claramente hasta que lo sea. | A phone assistant that answers calls is being built. It is not part of what you can order today, and we will say so plainly until it is. | no text | no text | no text |
| V-57 | `faq.ts:27`, frame lead | Si algo todavía no forma parte del producto, esta página lo dice. Nada de lo que hay aquí es un plan para más adelante. | If something is not part of the product yet, this page says so. Nothing here is a plan for later. | Aquí está lo que hace el producto, sin promesas de más. | This is what the product does, with no promises beyond that. | the same |
| V-58 | `faq.ts:319`, Q-30 | No. No hacemos campañas ni compramos leads. Más adelante recogeremos los leads de los anuncios que ya tienes. | No. We do not run campaigns or buy leads. Later we will take in the leads from the ads you already run. | No. No hacemos campañas ni compramos leads. | No. We do not run campaigns or buy leads. | Q-30 |
| V-59 | `home-1103.ts`, `report.soon`; `claimWords.soon` | próximamente | coming soon | not rendered anywhere; the words stay only as internal state | the same | the same |

`home-story.ts` holds more of these lines ("Disponible hoy: el aviso por email", "Próximamente."). They were not rendered on the routes
read on `2dfa67d`. If any of them is used again, the same rule applies, and they carry no target text from this file.

**What the Reviewer's list has to follow:**

| Row | Now |
|---|---|
| C03, E-1, E-2, Q-4 | §9: no status word in a cell; no fixed 19 rows in public; the census of status words is no pass condition |
| C06 | the reply of §16, not §3 |
| C08, C09 | no "Próximamente" mark on the tabs |
| D, insights | "WhatsApp · 10 de 25" in the target state; the line "informe ampliado" is gone |
| D-2 | §13 and V-24 … V-29 |
| D-3a P-1 | also holds for whole sentences (§G-6 point 4) |
| D-3a P-2, P-3 | the notice of §14 |
| Q-5 | "No medido" stays, in both views |
| A-19 | the sums of §19 |

**Marking:** editorial and technical. Not a legal approval, not a Meta approval. No publication released.

---

## Appendix: the detail pages (carried over from v2)

**Vocabulary (addendum 06.11.):** no row below puts "En preparación" or "Próximamente" on the site any more. §23 replaces the rows that carry such a clause. Where it says "Reservar una demo", "Probar gratis" or a trial line, §2, §7 and §9 of this file decide. Where a row concerns the home page, the example report, the plans or the footer, §2–§10 **supersede** it.

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
