# WEBSITE COPY HANDOVER 1102 v2 — the short text for the new direction, ES and EN, in one file

**For:** the redesign chat, the only writer of the website code. **This file replaces `WEBSITE_COPY_HANDOVER_1102.md`** (`c984d22`)
completely. Everything still valid from it is carried over here (§6, §7, appendix), so there is **one** copy source.
**Basis:**
- the owner's verdict of 02.11.: WEBSITE_STAGE1 = **not accepted**;
- the report "02_NuovaSolution_Review.pdf" (one story in three states, short texts, honest states, the new section order §4,
  reporting and packages §5);
- API's claims register `governance/API_CLAIMS_LINES_1102_v1.md` (`25a6382`): "Disponible" only where its column "may say
  today" allows it;
- Hosting's W44 signal (`5121cf3`): the weekly mail is proven in production **for our own agency only**.

**Rules for this text:**
- one fictional customer (Laura) and one team member (Elena), one flow;
- one label "Demo con datos ficticios";
- status words only: **Incluido · No incluido · En preparación · Por encargo**;
- no prices, no "Disponible" for a package, no score;
- section intros at most two short sentences.

**Marking:** editorial and technical. **Not a legal approval, not a Meta approval. No publication released.**

---

## 0. What the register allows the home page to say today

| Claim | May say | Source |
|---|---|---|
| Replies on WhatsApp and e-mail, in Spanish | ✓ (WhatsApp for our own agency; **not** "the agency's own number") | register, Channels |
| The record in the built-in CRM | ✓ "CRM integrado" | register, CRM |
| **Alert to the team** | ✗, held back in production (HA1, fix in v3) → **En preparación** | register, Alarm |
| Task list for the team | ✗, Release U after E1 → **En preparación** | Gate K6c |
| Weekly e-mail for an agency | ✗, proven for our own agency only (W44) → **En preparación** | `5121cf3` |
| Public registration, the 14-day trial | ✗, not released → access **by invitation** | register, Channels / Packages |
| Packages | no "Disponible" per package; content shown as **what is included** | register, Packages |
| Matching of the agency's own listings | ✗, not certified in production → "Implementado; todavía sin activar" | API product card Q-1 |
| Voice, 3D, Instagram posting | **En preparación** until accepted (owner, LAUNCH-UMFANG) | owner |
| Data location | "base de datos en la UE (Fráncfort)", never "todos los datos" | register, CRM |

**On the report's working version:** "Mientras enseñas, Nuova atiende." holds. "…**y avisa a tu equipo**" does **not** hold today
(the alert is held back). The subline below drops it. It returns on V3-DEPLOY together with a production probe with a real
alert to staff.

---

## 1. Hero and the demo

### 1.1 Hero

| Element | ES | EN |
|---|---|---|
| Eyebrow | Para agencias inmobiliarias en España | For real estate agencies in Spain |
| H1 | Mientras enseñas, Nuova atiende. | While you show a home, Nuova answers. |
| Benefit line | Responde consultas por WhatsApp y email y guarda lo importante en una ficha. | Answers enquiries on WhatsApp and e-mail and keeps what matters on a record. |
| Primary action | Ver la demo | See the demo |
| Secondary action | Pedir acceso | Request access |
| Line under the actions | Acceso por invitación mientras preparamos el registro público. | Access by invitation while public registration is being prepared. |

"Ver la demo" leads to the demo on the same page; "Pedir acceso" leads to the contact page. **"Probar gratis" is not used** until
the owner's registration line and E28-Prod exist; then it may replace "Pedir acceso".

### 1.2 The demo: one conversation, three states

| Element | ES | EN |
|---|---|---|
| Demo label (once, visible) | Demo con datos ficticios | Demo with fictional data |
| Channel hint | Elige un canal | Choose a channel |
| Channel tabs | WhatsApp · Email · Formulario web · Teléfono | WhatsApp · Email · Web form · Phone |
| Mark on the last two tabs | Prototipo | Prototype |
| Replay | Repetir demo | Replay demo |

**State 1 · Llega la consulta / The enquiry arrives**

| | ES | EN |
|---|---|---|
| Chat header | Laura · WhatsApp | Laura · WhatsApp |
| Laura's message | Hola, soy Laura. Busco un piso de 2 dormitorios en Estepona, hasta 320.000 €. ¿Podría ver alguno la semana que viene? | Hi, I'm Laura. I'm looking for a 2-bedroom flat in Estepona, up to €320,000. Could I see one next week? |
| Time | 11:20 | 11:20 |

**State 2 · Respuesta y ficha / Reply and record** (typing dots once, then the reply; the fields fill beside or below it)

| | ES | EN |
|---|---|---|
| Sender label (the one automation mark) | Asistente automático de la agencia | The agency's automated assistant |
| Reply | Hola, Laura. Anoto Estepona, 2 dormitorios y hasta 320.000 €, y que quieres ver pisos la semana que viene. ¿Buscas vivienda habitual o segunda residencia? | Hi Laura. I've noted Estepona, 2 bedrooms, up to €320,000, and that you'd like to see flats next week. Is it for living in or a second home? |
| Record title | Ficha de Laura | Laura's record |
| Fields | Intención: compra · Zona: Estepona · Dormitorios: 2 · Presupuesto: hasta 320.000 € · Idioma: español · Visita: la pide para la semana que viene | Intent: buying · Area: Estepona · Bedrooms: 2 · Budget: up to €320,000 · Language: Spanish · Viewing: asked for next week |
| State line | Hoy: respuesta en español y ficha guardada. | Today: a reply in Spanish and the record saved. |

**State 3 · Tu equipo sabe qué hacer / Your team knows what to do**

| | ES | EN |
|---|---|---|
| Record status | Consulta registrada | Enquiry recorded |
| Priority (a category with its reason, no score) | Prioridad alta · pide zona, presupuesto y visita | High priority · names area, budget and a viewing |
| Next step | Siguiente paso: Elena le propone día y hora para la visita. | Next step: Elena proposes a day and time for the viewing. |
| Small line under it | Una petición de visita no es una cita: la confirma una persona. | A viewing request is not an appointment: a person confirms it. |
| State line | En preparación: el aviso a Elena y su lista de tareas. | In preparation: the alert to Elena and her task list. |

A sent text is not a received one, and the demo's pace is no promise about speed. Neither needs a sentence on the page; the
words "respuesta enviada" or "entregada" are simply not used.

---

## 2. Three results for the agency

| | Title ES | Line ES | Status | Title EN | Line EN |
|---|---|---|---|---|---|
| Section intro | Lo que tu agencia gana | Tres cosas que Nuova hace con cada consulta. | — | What your agency gains | Three things Nuova does with every enquiry. |
| 1 | Consultas respondidas | En español, por WhatsApp y email, también fuera de horario. | Incluido | Enquiries answered | In Spanish, on WhatsApp and e-mail, also out of hours. |
| 2 | Lo importante, guardado | Zona, presupuesto, idioma y lo que pide quedan en su ficha, en el CRM integrado. | Incluido | What matters, kept | Area, budget, language and what they ask for stay on their record, in the built-in CRM. |
| 3 | El siguiente paso, para tu equipo | Un aviso a la persona que toca y una lista de tareas con el motivo. | En preparación | The next step, for your team | An alert to the right person and a task list with the reason. |

Each card shows one product cut-out from the demo (the reply, the record, the next step), not an icon.

---

## 3. Deeper, on request: matching and the workday

| | ES | EN |
|---|---|---|
| Section intro | Dos escenas más, si quieres verlas. | Two more scenes, if you want to see them. |
| Scene tab 1 | Inmuebles que encajan | Listings that fit |
| Scene 1 line | Nuova compara lo que busca Laura con tu cartera y propone solo inmuebles tuyos. | Nuova compares what Laura is looking for with your portfolio and proposes only your own listings. |
| Scene 1 status | Implementado; todavía sin activar para ninguna agencia. | Implemented; not yet switched on for any agency. |
| Scene tab 2 | El día de tu equipo | Your team's day |
| Scene 2 line | Cada persona ve sus tareas, por qué va primero cada una y el siguiente paso. | Each person sees their tasks, why each one comes first and the next step. |
| Scene 2 status | En preparación | In preparation |
| Link | Ver la plataforma | See the platform |

The listing appears here and not in the hero (report §2 A).

---

## 4. Reporting

### 4.1 Section and report labels

| | ES | EN |
|---|---|---|
| Section title | Tu semana, en un informe | Your week, in one report |
| Section intro | Qué atendió Nuova, qué sigue abierto y qué hacer después. | What Nuova handled, what is still open and what to do next. |
| Report header | Agencia de ejemplo · Semana del 26 oct al 1 nov · WhatsApp y email · Demo con datos ficticios | Example agency · Week of 26 Oct to 1 Nov · WhatsApp and e-mail · Demo with fictional data |
| Chart title | Consultas por semana | Enquiries per week |
| Chart note (EX-1) | Cuatro semanas de ejemplo. La evolución por semanas forma parte del informe ampliado, en preparación. | Four example weeks. The week-by-week trend is part of the extended report, in preparation. |
| Open cases title | Sigue abierto | Still open |
| Next actions title | Qué hacer ahora | What to do now |
| Link | Ver el informe de ejemplo | See the example report |
| State line | Incluido: el informe en el acceso de tu agencia. En preparación: el resumen semanal por email. | Included: the report in your agency's login. In preparation: the weekly e-mail summary. |

### 4.2 Metrics, each with its definition

| Metric ES | Definition ES | Metric EN | Definition EN | Value in the demo |
|---|---|---|---|---|
| Consultas recibidas | Mensajes nuevos por WhatsApp y email registrados en la semana. | Enquiries received | New WhatsApp and e-mail messages recorded in the week. | example figure |
| Respondidas | Consultas con una respuesta automática enviada. | Answered | Enquiries with an automatic reply sent. | example figure |
| Esperan a una persona | Consultas abiertas que necesitan a alguien del equipo. | Waiting for a person | Open enquiries that need someone on the team. | example figure |
| Visitas pedidas | Clientes que pidieron ver un inmueble. Pedida no es acordada. | Viewings asked for | Customers who asked to see a property. Asked is not agreed. | example figure |
| Entregadas al cliente | Si la respuesta llegó al teléfono o al buzón del cliente. | Delivered to the customer | Whether the reply reached the customer's phone or inbox. | **No medido / Not measured** |
| Tiempo de respuesta | Minutos entre la consulta y la respuesta. | Response time | Minutes between the enquiry and the reply. | **No medido / Not measured** |

"No medido" is shown as text, never as 0. No conversion rate, revenue curve or score.

### 4.3 Open cases and next actions (demo)

| ES | EN |
|---|---|
| Peter y Anna Keller · valoración de una villa · falta proponer una fecha | Peter and Anna Keller · villa valuation · a date still to propose |
| Sofía Lamas · alquiler desde enero · esperando su respuesta | Sofía Lamas · rental from January · waiting for her reply |
| Proponer a los Keller una fecha para la valoración. | Propose a date to the Kellers for the valuation. |
| Recordar a Laura la visita del jueves a las 10:00. *(EX-2)* | Remind Laura of Thursday's 10:00 viewing. *(EX-2)* |

---

## 5. 3D, a separate service

| | ES | EN |
|---|---|---|
| Section title | Presentar un inmueble en 3D | Present a property in 3D |
| Section intro | Del plano acotado a un modelo que el cliente recorre con la mirada, vacío y amueblado. | From the measured plan to a model the client can look around, empty and furnished. |
| Steps | Plano · Modelo · Vacío y amueblado · Entrega | Plan · Model · Empty and furnished · Delivery |
| Status | En preparación · todavía no contratable | In preparation · not bookable yet |
| Example mark (once) | Casa de ejemplo ficticia | Fictional example house |
| Action | Pregúntanos por el 3D | Ask us about 3D |

---

## 6. Plans, trust and the close

### 6.1 Plans: fixed rows, one status word per cell

| | ES | EN |
|---|---|---|
| Section title | Planes | Plans |
| Section intro | Hoy, acceso por invitación. Los planes se podrán contratar con el registro público, en preparación. | Today, access by invitation. Plans can be booked once public registration opens, in preparation. |
| Column heads | Essential · Growth · Enterprise | Essential · Growth · Enterprise |
| Who for | Una oficina y un equipo pequeño · Un equipo que crece · Varias oficinas | One office and a small team · A growing team · Several offices |
| Inheritance line | Cada plan incluye todo lo del anterior. | Each plan includes everything in the one before. |
| Price line | Te decimos el precio para tu agencia antes de acordar nada. | We tell you the price for your agency before anything is agreed. |
| Action, all three | Solicita una propuesta | Request a proposal |

| Group | Row ES | Row EN | Essential | Growth | Enterprise |
|---|---|---|---|---|---|
| **Canales / Channels** | Respuestas en español por WhatsApp y email | Replies in Spanish on WhatsApp and e-mail | Incluido | Incluido | Incluido |
| | WhatsApp con el número de tu agencia | WhatsApp with your agency's own number | En preparación | En preparación | En preparación |
| | Otros idiomas | Other languages | En preparación | En preparación | En preparación |
| | Asistente telefónico | Phone assistant | No incluido | En preparación | En preparación |
| | Instagram: publicar y comentarios | Instagram: posts and comments | No incluido | No incluido | En preparación |
| **CRM** | CRM integrado: fichas e historial | Built-in CRM: records and history | Incluido | Incluido | Incluido |
| | Una ficha por persona entre WhatsApp y email | One record per person across WhatsApp and e-mail | En preparación | En preparación | En preparación |
| **Equipo / Team** | Aviso de consultas importantes | Alert for important enquiries | En preparación | En preparación | En preparación |
| | Lista de tareas y asistente de la mañana | Task list and morning assistant | No incluido | En preparación | En preparación |
| | Propuestas de tu cartera y seguimientos | Proposals from your portfolio and follow-ups | No incluido | En preparación | En preparación |
| **Informes / Reporting** | Informe en el acceso de tu agencia | Report in your agency's login | Incluido | Incluido | Incluido |
| | Resumen semanal por email | Weekly e-mail summary | En preparación | En preparación | En preparación |
| | Informe con evolución y canales | Report with trend and channels | No incluido | En preparación | En preparación |
| **Integraciones / Integrations** | HubSpot, Pipedrive, Zoho, Salesforce, Outlook | HubSpot, Pipedrive, Zoho, Salesforce, Outlook | En preparación | En preparación | En preparación |
| | Leads de tus anuncios actuales | Leads from your existing ads | No incluido | En preparación | En preparación |
| **Servicios / Services** | Modelos 3D | 3D models | En preparación | En preparación | En preparación |

**Status words EN:** Included · Not included · In preparation · To order. "Por encargo / To order" is kept for 3D once it is accepted
and its scope and price per order are fixed; it is **not** used today. A tick appears only with "Incluido". An empty circle never
appears.

### 6.2 Trust, short

| | ES | EN |
|---|---|---|
| Section title | Cómo empezar y qué pasa con los datos | How to start and what happens with the data |
| Line 1 | Pides acceso, te enseñamos el sistema y conectamos los canales contigo. | You request access, we show you the system and connect the channels with you. |
| Line 2 | La base de datos está en la Unión Europea (Fráncfort). | The database is in the European Union (Frankfurt). |
| Line 3 | Cada respuesta automática indica que la escribe un asistente. | Every automatic reply says that an assistant wrote it. |

### 6.3 FAQ (short; full answers stay on `/faq`)

| Question ES | Answer ES | Question EN | Answer EN |
|---|---|---|---|
| ¿Qué hace Nuova? | Responde en español las consultas que llegan por WhatsApp y email y guarda lo importante de cada una en su ficha. | What does Nuova do? | It answers the enquiries that arrive on WhatsApp and e-mail in Spanish and keeps what matters from each one on its record. |
| ¿En qué idiomas responde? | En español. En otro idioma no se envía nada automáticamente. | Which languages does it answer in? | Spanish. In another language nothing is sent automatically. |
| ¿Sabe el cliente que responde un asistente? | Sí. Cada respuesta automática lo indica. | Does the customer know an assistant is answering? | Yes. Every automatic reply says so. |
| ¿Avisa a mi equipo? | Todavía no: el aviso por email a la persona adecuada está en preparación. | Does it alert my team? | Not yet: the e-mail alert to the right person is in preparation. |
| ¿Cómo empiezo? | Hoy por invitación: pide acceso y te enseñamos el sistema. El registro público y la prueba de 14 días están en preparación. | How do I start? | By invitation today: request access and we will show you the system. Public registration and the 14-day trial are in preparation. |
| ¿Funciona con mi CRM? | Incluye un CRM. HubSpot, Pipedrive, Zoho y Salesforce, cuando esté listo. | Does it work with my CRM? | It includes a CRM. HubSpot, Pipedrive, Zoho and Salesforce when ready. |
| ¿Cuánto cuesta? | Te decimos el precio para tu agencia antes de acordar nada. | What does it cost? | We tell you the price for your agency before anything is agreed. |

### 6.4 Close

| | ES | EN |
|---|---|---|
| Title | Mira cómo atiende Nuova tus consultas | See how Nuova answers your enquiries |
| Line | Te enseñamos la demo con tus canales y respondemos tus preguntas. | We show you the demo with your channels and answer your questions. |
| Primary action | Ver la demo | See the demo |
| Secondary action | Pedir acceso | Request access |

---

## 7. Word budget, ES home page

Counted by script over every Spanish cell of §1–§6, the status words included; FAQ answers excluded, as the report allows:

| Section | ES words |
|---|---|
| §1 | 175 |
| §2 | 68 |
| §3 | 55 |
| §4 | 183 |
| §5 | 40 |
| §6 | 306 |
| **Total** | **827** |

Target: about 650–900. The plans table repeats status words per cell; without them the total is lower. Nothing is reached with small print or text inside images.

---

## 8. The open RV5 lines and the English legal seal (carried over from `WEBSITE_COPY_HANDOVER_1102.md`)

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

## 9. What goes back on evidence, and never before

| Evidence | Text that returns |
|---|---|
| V3-DEPLOY + production probe with a real alert to staff | "…y avisa a tu equipo" in the benefit line; card 3 and the "Aviso" rows → Incluido |
| Release U after E1 | task list and morning assistant → Incluido where the plan includes them |
| the owner's registration line + E28-Prod | "Probar gratis" as the primary action; the 14-day trial lines; the plans' intro |
| multi-agency WhatsApp path passed | "WhatsApp con el número de tu agencia" → Incluido |
| REPORT-AKTIV for agencies (more than our own) | "Resumen semanal por email" → Incluido |
| T6 accepted, 3D scope and price per order fixed | 3D → Por encargo |
| SPRACHEN S2 proven in production | "Otros idiomas" and the language answer |

---

## Appendix: the detail pages (carried over, still valid)

The rows below come from `WEBSITE_COPY_HANDOVER_1102.md` §C. They apply to the pages **outside** the new home page and plans
section: `/platform`, the four module pages, `/faq` (full), `/trial`, `/signup`, `/contact` and the packages page, where it is
not rebuilt from §6.1. Where a row concerns the home page or the plans, §1–§6 above **supersede** it.

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

**Aligned with v2:** C-8 and C-9 now carry the v2 wording (§1.1). C-10, C-11, C-18 and C-19 are **superseded** by §6.1 (the plans: section intro and status words). C-15 is superseded by §6.2. The rest stays as written.
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
| C-15 | `lib/content/home-sections.ts:84`, "Cómo empiezas" lead | "Sin llamada comercial. Creas la cuenta, configuras tu agencia a tu ritmo y conectamos los canales contigo. El precio…" | Así será el arranque cuando abra el registro: creas la cuenta, configuras tu agencia a tu ritmo y conectamos los canales contigo. Hoy el registro está en preparación. El precio te lo decimos para tu agencia antes de acordar nada; lo que pasa con los datos está escrito aquí. | This is how it will start once registration opens: you create the account, set up your agency at your own pace and we connect the channels with you. Registration is in preparation today. We tell you the price for your agency before anything is agreed; what happens with the data is written here. |
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

