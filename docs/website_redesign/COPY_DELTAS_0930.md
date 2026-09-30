# COPY DELTAS 0930 — rendered check 2, the static FAQ, and the texts that wait for their proof

**State:** `2026-09-30` · **Written:** 2026-09-30 · **Copy version:** `launch-v1.2`
**Lane:** Website Copy / Product Truth → **Website Implementer**, **Reviewer** for the claim changes.
**Checked against:** code `3c38f8d` on **both** previews, fetched 2026-09-30 and read as text in reading
order: design `…design-preview-git-we-eeb43f…`, routes `/en`, `/es`, `/en/platform`, `/en/trial`; staging
`…staging-preview-git-w-44e113…`, routes `/en`, `/es`.
**Evidence base:** `backend_handoff/handoff_in_2026-09-30/` — `PRODUCT_TRUTH_TABLE_v1.md` (v1.1),
`HOSTING_SUBPROCESSORS_2026-09-29_v1.md`, `WEBQA_BACKEND_READY_2026-09-29_v1.md`,
`MEDIA_RETENTION_TEMPLATE_v1.md`; plus `handoff_in_2026-09-29/` Daily, Lead and 3D truth sheets.
**Status:** DRAFT by its author, not independently reviewed.

> The visual direction is not touched. Everything here is text, and the only structural request is the
> order of two blocks (§2, D-52).

---

## 1. COPY_RENDERED_CHECK_2

Ten items, each read on the rendered page and judged against the current product truth.

| # | What was checked | Verdict | What I read, and against what |
|---|---|---|---|
| 1 | "No enquiry waits until Monday" (`/en` h1, `/es` "Ninguna consulta espera al lunes") | **reformulate**, D-45 | It is an absolute over all enquiries, which the matrix does not allow, and the reply path is held today because no notice is active. The gate on L-01 covers publication, but the sentence itself should not need a gate to be true |
| 2 | "Nothing is handed between tools" (`/en` line 161, ES line 160) | **reformulate**, D-46 | False where the Google Sheets export runs: that is one active production workflow handing a copy of every lead to another tool. `PRODUCT_TRUTH_TABLE` v1.1 §A |
| 3 | Prioritisation and qualification anywhere | **clean** | All eleven claims of 2026-09-29 are gone from both languages. The record now reads "Asked for / Wants to view / Writes in / Next", the leads table has no chips, the journey reads Answered · Recorded · Handed over · Done |
| 4 | CRM and Outlook | **clean on the pages I read, one addition** | Outlook is named nowhere. The CRM line reads "Leads, conversations and tasks in one place". The platform lead still says "the customer is one record rather than one record per tool", which is the cross-channel merge claim again → D-47 |
| 5 | Daily | **clean** | "Daily Tasks", "The tasks your team takes and closes", the clip with poster and my caption, "Taken by you. Only you can close it." Nothing about a chat, a manager board or a staff login |
| 6 | Phone | **reformulate**, D-48 | The sentence "A phone assistant is in preparation. We walk you through it on request." renders **under the heading "On request"**, next to the orderable 3D service. In that position it reads as something you can buy. There is no production number, and the legal gate routes every call to a person |
| 7 | 3D | **extend**, D-49 | The three sentences are in and correct. What the customer actually has to provide, and what is checked, is missing, and the assignment asks for it |
| 8 | Social | **absent, and that is correct** | No mention on any route I read. It stays absent until its own proof; the prepared text is §6.2, not for publication |
| 9 | The Q&A fallback "A person can." | **remove the promise**, D-50 | It appears twice on the home page and inside the panel. Saying a person can answer is a commitment nobody has made. The static FAQ (§3) replaces the surface meanwhile |
| 10 | Onboarding and readiness | **two corrections**, D-51 | "Your opening hours — Done" and "your calendar" are offered as setup that matters. `PRODUCT_TRUTH_TABLE` v1.1 §G is explicit: branding, language, the disclosure and the tenant row steer production behaviour; **calendar, opening hours, social and the Q&A settings are stored and steer nothing** |

**Two findings outside the ten, both material.**

**The staging preview answers visitors from a stale knowledge base.** `WEBQA_BACKEND_READY` records
`kb_version = faq-kb-v1.0`, "byte-identical to Copy's file", applied on staging. That file is the
2026-09-28 version, which still answers that every enquiry carries a priority of cold, warm or hot, that
we can show the phone assistant on request, and that a person answers where the data is stored. Every one
of those was corrected on 2026-09-29 in v1.1 and is corrected again in v1.2 today. So the wired assistant
on the staging preview is, on those questions, wrong in exactly the way the rendered page no longer is.
Nothing on a public surface may be answered from a KB row older than `faq-kb-v1.2`.

**The design preview and the staging preview do not carry the same band.** Design says "Preview. Not
public. Demonstration data only: nothing you enter creates an account or reaches anyone." Staging says
"Test environment. Accounts and data here are for testing and may be reset." Both are correct for what
they are, and the difference is deliberate, so this is a note rather than a delta: the staging band must
keep its wording, because on staging a form **does** create something.

---

## 2. Deltas

| # | Route · key | Before (rendered) | After EN | After ES | Evidence |
|---|---|---|---|---|---|
| D-45 | `/` · `home.hero.h1` | "No enquiry waits until Monday" / "Ninguna consulta espera al lunes" | Answered when it arrives, not when someone is free | Respondida cuando llega, no cuando alguien tiene tiempo | check 1. It states the mechanism instead of a quantity: the reply is written when the message arrives rather than when a person is available. No absolute, no number, no minutes. Length: 49 EN / 54 ES, which at the hero's 16ch column keeps the three to four line shape the design has today |
| D-46 | `/` · `home.picture.lead` | "Nuova sits underneath the agency rather than beside it. **Nothing is handed between tools**, and nothing has to be kept in someone's head." | The conversation, what the customer asked for and the task all sit on one record. Nothing has to be kept in someone's head, and nobody has to ask a colleague what was already said. | La conversación, lo que ha pedido el cliente y la tarea están en una sola ficha. Nada tiene que quedarse en la cabeza de nadie, y nadie tiene que preguntar a un compañero qué se dijo ya. | check 2 |
| D-47 | `/platform` · `platform.h1` and `platform.lead` | "The operating layer of a real estate agency." · "…because the customer is one record rather than one record per tool." | **Everything one enquiry needs, in one place** · Each part of Nuova does one job properly, and they share one record, so the answer, the context and the task are never in three different places. | **Todo lo que necesita una consulta, en un solo lugar** · Cada parte de Nuova hace bien una cosa, y comparten una misma ficha, así que la respuesta, el contexto y la tarea nunca están en tres sitios distintos. | check 4. "Operating layer" is the abstraction the assignment asks us to drop, and "the customer is one record" is the cross-channel merge claim that `LEAD_TRUTH_INPUT_v1` §3 rules out |
| D-48 | `/platform` · the phone sentence and the group it sits in | heading "On request" containing both the phone sentence and the 3D service | Move the phone out of "On request". Its own line, under the heading **"Being built"** / **"En construcción"**: A phone assistant that answers calls is being built. It is not part of what you can order today, and we will say so plainly until it is. | Un asistente telefónico que atiende llamadas está en construcción. Hoy no forma parte de lo que se puede contratar, y lo diremos claramente hasta que lo sea. | check 6. `PRODUCT_TRUTH_TABLE` v1.1 §D: no number in production, and `voice_resolve_routing` answers `route = human` because no spoken notice is approved |
| D-49 | `/platform` and `/platform/property-experience` · 3D | the three sentences, correct but incomplete | Add, after them: You send us a dimensioned floor plan, and photos if you have them. We build the model from the plan, check it against your drawings, and you get a link. Furniture and materials are illustrative and can be switched off. | Nos envías un plano con medidas y, si las tienes, fotos. Construimos el modelo a partir del plano, lo comprobamos contra tus planos y recibes un enlace. Los muebles y los materiales son ilustrativos y se pueden desactivar. | `3D_FEATURE_TRUTH` §1 and §2: to scale against the drawings within ±5 %, illustrative furnishing from our own library, made by hand per property. §3 forbids: photorealistic, "with your furniture", an automatic model from an upload, a first person walkthrough, VR, an instant result, self service, prices or delivery times. **Photos are input, never a promise of a photo exact rebuild** |
| D-50 | `/` · `qa.cannotConfirm` and the two places it renders | "We cannot confirm that from here. **A person can.**" | We cannot confirm that from here. You can send the question to antonio@nuovasolution.com. | No podemos confirmarlo desde aquí. Puedes enviar la pregunta a antonio@nuovasolution.com. | check 9. The route stays usable; the commitment that somebody will answer is gone. Same rule in `PRODUCT_FAQ_KB_v1.md` v1.2 §7 and in Q-40 |
| D-51 | `/` · `home.access.steps[2].line` and the readiness example | "Your details, your hours, your logo, your calendar." · readiness row "Your opening hours — Done" | step 3 line: Your agency details, your legal details and your logo, plus your team and their roles. · **remove the "Your opening hours" row** from the readiness example | paso 3: Los datos de tu agencia, tus datos legales y tu logo, más tu equipo y sus roles. · **quitar la fila "Tu horario"** del ejemplo de preparación | check 10. `PRODUCT_TRUTH_TABLE` v1.1 §G: hours and calendar are stored and steer nothing in production. Offering them as part of going live implies an effect they do not have |
| D-52 | `/platform` · order of the two blocks | the "On request" block renders **before** the four numbered modules | the four working modules first, then "On request" (3D), then "Being built" (phone) | los cuatro módulos primero, después "A petición" (3D) y después "En construcción" (teléfono) | a visitor should meet what they get before what they do not. This is an order change, not a design change |
| D-53 | `/` · `home.access.h2` and the trial step | "Your agency, set up by you" with "One step, and your 14 day trial starts." | unchanged text, one addition after step 3: Nothing is charged, and we do not ask for a card at any point in these three steps. | sin cambios, una frase tras el paso 3: No se cobra nada y no pedimos ninguna tarjeta en ninguno de estos tres pasos. | `PRODUCT_TRUTH_TABLE` v1.1 §H: self service card checkout is blocked on purpose, prices report `awaiting_pricing_authority`. Saying it here answers the question the visitor actually has at that moment |

---

## 3. FAQ_PAGE_COPY — the static FAQ, EN and ES

Replaces the "Ask Nuova anything" surface until `WEBQA_MODEL_ROUTE` and the Reviewer's browser end to end
are reported **and** the backend carries `faq-kb-v1.2`. Twenty-six questions in five groups, all taken from
`PRODUCT_FAQ_KB_v1.md` v1.2, rewritten from the assistant's voice into the site's voice. The KB row is given
so the Reviewer can check each answer against its evidence.

**Page frame**

| Slot | EN | ES |
|---|---|---|
| Eyebrow | Questions | Preguntas |
| h1 | Straight answers about what Nuova does today | Respuestas claras sobre lo que hace Nuova hoy |
| Lead | If something is not part of the product yet, this page says so. Nothing here is a plan for later. | Si algo todavía no forma parte del producto, esta página lo dice. Nada de lo que hay aquí es un plan para más adelante. |
| Contact line at the end | Not answered here? Write to antonio@nuovasolution.com. | ¿No está aquí la respuesta? Escribe a antonio@nuovasolution.com. |

The contact line offers an address and promises nothing about a reply. That is deliberate: no automatic
contact promise anywhere on this page.

### Group 1 · What Nuova does

| KB | EN question · answer | ES question · answer |
|---|---|---|
| Q-01 | **What does Nuova actually do?** It answers the enquiries your agency receives, records each one with what the customer asked for, and turns a viewing request into a task your team takes and closes. | **¿Qué hace Nuova exactamente?** Responde a las consultas que recibe tu agencia, registra cada una con lo que ha pedido el cliente y convierte una petición de visita en una tarea que tu equipo toma y cierra. |
| Q-02 | **Which channels are answered?** Text enquiries on WhatsApp and by e-mail. Other channels are not part of the offer today. | **¿Qué canales se responden?** Consultas de texto por WhatsApp y por email. Otros canales no forman parte de la oferta hoy. |
| Q-03 | **Does it answer at night and at weekends?** Yes. The reply is written when the message arrives rather than when somebody is free. We do not promise a number of minutes, because we do not measure one. | **¿Responde de noche y los fines de semana?** Sí. La respuesta se escribe cuando llega el mensaje, no cuando alguien tiene tiempo. No prometemos un número de minutos porque no lo medimos. |
| Q-05 | **Does the customer know they are talking to an assistant?** Yes. Every reply the assistant writes carries a notice that says so. It is a legal duty, not an option, and it does not depend on your plan. | **¿Sabe el cliente que habla con un asistente?** Sí. Cada respuesta que redacta el asistente lleva un aviso que lo indica. Es una obligación legal, no una opción, y no depende de tu plan. |
| Q-06 | **In which language does it answer my customers?** In the language the customer wrote in. You set a default for the cases where that cannot be determined. | **¿En qué idioma responde a mis clientes?** En el idioma en el que escribió el cliente. Tú defines un idioma por defecto para los casos en que no se pueda determinar. |
| Q-07 | **Does it commit my agency to anything?** No. The reply agrees no price, no date and no condition. A viewing request is recorded as a request, and a person confirms it. | **¿Compromete a mi agencia a algo?** No. La respuesta no acuerda ningún precio, ni fecha, ni condición. Una petición de visita se registra como petición y una persona la confirma. |
| Q-09 | **Does it replace my team?** No. It answers first and organises the enquiry. The viewing, the negotiation and the relationship stay with your people, and the task tells them where to start. | **¿Sustituye a mi equipo?** No. Responde primero y organiza la consulta. La visita, la negociación y la relación siguen siendo de tu gente, y la tarea les dice por dónde empezar. |
| Q-08 | **Will it invent details about a property?** It does not put property suggestions in replies today; that part is switched off until it passes our own tests. What it answers comes from what the customer wrote and what your agency has confirmed. | **¿Se inventa datos de una propiedad?** Hoy no incluye propuestas de propiedades en las respuestas; esa parte está desactivada hasta que supere nuestras propias pruebas. Lo que responde sale de lo que escribió el cliente y de lo que tu agencia ha confirmado. |

### Group 2 · The record and your team

| KB | EN | ES |
|---|---|---|
| Q-10 | **Can my team see what the assistant said?** Yes. The conversation sits on the customer record, so anyone with the right role reads the same history. | **¿Puede mi equipo ver lo que dijo el asistente?** Sí. La conversación está en la ficha del cliente, así que cualquier persona con el rol adecuado lee el mismo historial. |
| Q-43 | **If the same person writes by e-mail and then by WhatsApp, is that one record?** Two, until something ties them together. There is no automatic merge across channels today, and we would rather tell you now than let you find it in your second week. | **Si la misma persona escribe por email y luego por WhatsApp, ¿es una sola ficha?** Dos, hasta que algo las una. Hoy no hay una unión automática entre canales, y preferimos decírtelo ahora y no que lo descubras en tu segunda semana. |
| Q-31 | **Does it tell me which leads are hot?** Not as a score or a label, and we will not invent one. What your team gets is the task: the customer, the property and the time they asked for. No alert message is sent to you. | **¿Me dice qué leads están calientes?** No como una puntuación ni una etiqueta, y no la vamos a inventar. Lo que recibe tu equipo es la tarea: el cliente, el inmueble y la hora que ha pedido. No se te envía ningún mensaje de alerta. |
| Q-41 | **Where does my team work the tasks?** In Spanish or English, each person with their own list, signed in as themselves. There is no public address for it yet, so setting that up is part of what we do with you. | **¿Dónde trabaja mi equipo las tareas?** En español o en inglés, cada persona con su propia lista y entrando como ella misma. Todavía no hay una dirección pública para eso, así que prepararlo es parte de lo que hacemos contigo. |
| Q-42 | **Can my team ask the assistant what to do today?** Not today. What your team gets is the task list: take a task, close it, and see who took the others. | **¿Puede mi equipo preguntarle al asistente qué hacer hoy?** Hoy no. Lo que recibe tu equipo es la lista de tareas: tomar una tarea, cerrarla y ver quién ha tomado las demás. |
| Q-22 | **Can I add my team and give them different roles?** Yes. You invite your team and set a role for each person, and the roles decide what they see and do. | **¿Puedo añadir a mi equipo y darles roles distintos?** Sí. Invitas a tu equipo y defines un rol para cada persona, y los roles deciden qué ven y qué hacen. |

### Group 3 · Trial, plans and paying

| KB | EN | ES |
|---|---|---|
| Q-11 | **How long is the trial and what does it cost?** 14 days of Essential, free, with no payment method and no card. You create the account yourself. | **¿Cuánto dura la prueba y qué cuesta?** 14 días de Essential, gratis, sin método de pago y sin tarjeta. Creas la cuenta tú mismo. |
| Q-12 | **What happens after the 14 days?** Your account and your data stay. The paid parts pause until you choose a plan, and you can still log in. | **¿Qué pasa después de los 14 días?** Tu cuenta y tus datos se quedan. Las partes de pago se pausan hasta que elijas un plan, y puedes seguir entrando. |
| Q-13 | **What does it cost after that?** We tell you the price and the billing period for your agency before anything is agreed. There is no price on this site yet. | **¿Cuánto cuesta después?** Te decimos el precio y el periodo de facturación para tu agencia antes de acordar nada. Todavía no hay ningún precio en este sitio. |
| Q-14 | **Can I pay by card on the website?** No. We issue an invoice and you pay it by bank transfer. There is no card payment and no automatic renewal. | **¿Puedo pagar con tarjeta en la web?** No. Emitimos una factura y la pagas por transferencia. No hay pago con tarjeta ni renovación automática. |
| Q-15 | **When is my plan active?** When the payment is confirmed. An issued invoice does not activate anything on its own. | **¿Cuándo está activo mi plan?** Cuando el pago está confirmado. Una factura emitida no activa nada por sí sola. |
| Q-16 | **Do I have to talk to a salesperson first?** No. You can start on your own. A demo is optional and never a condition. | **¿Tengo que hablar antes con un comercial?** No. Puedes empezar por tu cuenta. La demo es opcional y nunca una condición. |
| Q-21 | **How long does setting up take?** We do not give a duration. You do it yourself in steps, your progress is saved, and you can stop and come back. | **¿Cuánto se tarda en configurarlo?** No damos una duración. Lo haces tú mismo por pasos, tu progreso se guarda y puedes parar y volver. |

### Group 4 · Your data

| KB | EN | ES |
|---|---|---|
| Q-32 | **What happens to the data of the people who write to me?** It is processed to answer and to organise the enquiry for your agency. It is not sold and not used to advertise to anyone. The privacy notice states the detail. | **¿Qué pasa con los datos de las personas que me escriben?** Se tratan para responder y organizar la consulta para tu agencia. No se venden y no se usan para hacer publicidad a nadie. El aviso de privacidad indica el detalle. |
| Q-33 | **Where is the data stored?** In the European Union. The database and the files sit with our infrastructure provider in Frankfurt, and the servers that run the automation are in Germany. Customer files have no public link, and every time a person opens one it is logged. | **¿Dónde se guardan los datos?** En la Unión Europea. La base de datos y los archivos están con nuestro proveedor de infraestructura en Fráncfort, y los servidores que ejecutan la automatización están en Alemania. Los archivos de clientes no tienen enlace público, y cada vez que una persona abre uno queda registrado. |
| Q-34 | **Can a customer ask for their data to be deleted?** Yes. The data deletion page explains how to ask, and we help your agency answer such a request. | **¿Puede un cliente pedir que se eliminen sus datos?** Sí. La página de eliminación de datos explica cómo pedirlo, y ayudamos a tu agencia a responder a esa solicitud. |
| Q-44 | **How long do you keep the data, and do you keep backups?** We do not publish a retention period yet, and we will not print one we do not keep to. Ask us and you get the answer that applies to your agency in writing. | **¿Cuánto tiempo guardáis los datos y hacéis copias de seguridad?** Todavía no publicamos un plazo de conservación y no vamos a imprimir uno que no cumplamos. Pregúntanos y recibes por escrito la respuesta que se aplica a tu agencia. |
| Q-45 | **Which services process our messages, and where?** The privacy notice names each one and what it is for. The servers that run the automation are in Germany and the database and files are in the European Union. For the message channels and the AI provider we state what each provider declares, because we have not verified those regions ourselves. | **¿Qué servicios tratan nuestros mensajes y dónde?** El aviso de privacidad nombra cada uno y para qué sirve. Los servidores que ejecutan la automatización están en Alemania y la base de datos y los archivos en la Unión Europea. Para los canales de mensajes y el proveedor de IA indicamos lo que declara cada proveedor, porque esas regiones no las hemos verificado nosotros. |
| Q-46 | **If I enter my opening hours, does the assistant respect them?** Not today. A text enquiry is answered whenever it arrives. Your hours will steer the phone assistant, which is still being built. | **Si indico mi horario, ¿lo respeta el asistente?** Hoy no. Una consulta de texto se responde cuando llega. Tu horario dirigirá el asistente telefónico, que todavía está en construcción. |

### Group 5 · What is not part of the offer today

One group, stated once, so nobody has to hunt for it. No dates, no "soon".

| KB | EN | ES |
|---|---|---|
| Q-18 / Q-19 | **Do you work with HubSpot, Salesforce, Pipedrive or Zoho?** Not today. A CRM is included and your leads live there from the start. The field mappings for those four exist on our side, and each still needs one real connection and one real sync for an agency before we would promise it. | **¿Funciona con HubSpot, Salesforce, Pipedrive o Zoho?** Hoy no. Se incluye un CRM y tus leads viven ahí desde el principio. Las correspondencias de campos de esos cuatro existen por nuestra parte, y cada una necesita todavía una conexión real y una sincronización real en una agencia antes de que lo prometamos. |
| Q-20 | **Does it work with Outlook or Microsoft 365?** Not today. We can read a mailbox in our test environment; replying inside an Outlook thread does not exist yet. Receiving a mail from an Outlook account is not an Outlook integration. | **¿Funciona con Outlook o Microsoft 365?** Hoy no. En nuestro entorno de pruebas podemos leer un buzón; responder dentro de un hilo de Outlook todavía no existe. Recibir un correo desde una cuenta de Outlook no es una integración con Outlook. |
| Q-26 | **Can it read photos or PDFs a customer sends?** Not as part of the offer today. It is built and we are still testing it, including what happens with a file that cannot be read. | **¿Puede leer fotos o PDF que envía un cliente?** Hoy no como parte de la oferta. Está construido y seguimos probándolo, incluido qué pasa con un archivo que no se puede leer. |
| Q-27 | **Does it take phone calls?** No. A phone assistant is being built and it is not part of what you can order today. | **¿Atiende llamadas de teléfono?** No. Un asistente telefónico está en construcción y hoy no forma parte de lo que se puede contratar. |
| Q-28 | **Does it manage my Instagram?** Not today. It depends on an approval from the platform that we do not have yet, and we will not give you a date for someone else's decision. | **¿Gestiona mi Instagram?** Hoy no. Depende de una aprobación de la plataforma que todavía no tenemos, y no vamos a dar una fecha para la decisión de otro. |
| Q-29 | **What is Property Experience?** An interactive 3D model of a property in the browser, as a service we build on request from your dimensioned plans. | **¿Qué es Property Experience?** Un modelo 3D interactivo de un inmueble en el navegador, como servicio que construimos a petición a partir de tus planos con medidas. |
| Q-30 | **Do you bring me leads from advertising?** No. Nuova works on the enquiries that reach your agency. | **¿Me traéis leads de publicidad?** No. Nuova trabaja sobre las consultas que llegan a tu agencia. |

---

## 4. Daily clip subtitles, before → action → result

For the new clip. Three cues in that exact shape, plus the fourth only if the cut is long enough. Same
text in both formats; the mobile cut may drop cue 4.

| # | Shape | EN | ES |
|---|---|---|---|
| 1 | **Before** | Laura Serrano asked for a viewing on Thursday morning. Nobody has taken it yet. | Laura Serrano ha pedido una visita el jueves por la mañana. Todavía no la ha tomado nadie. |
| 2 | **Action** | The agent takes the task. The card now says it is theirs, and no one else can take it. | El agente toma la tarea. La tarjeta ya dice que es suya, y nadie más puede tomarla. |
| 3 | **Result** | Closed. It leaves the list, the rest stays, and the team can see who did it. | Cerrada. Sale de la lista, el resto se queda y el equipo ve quién lo ha hecho. |
| 4 | optional | The second task is already taken by a colleague, so it has no button. | La segunda tarea ya la ha tomado un compañero, así que no tiene botón. |

Unchanged from 0929 and still correct: the section heading, the poster label and the caption that names
the click ring as part of the recording rather than the product.

---

## 5. What the customer story is, in one line per surface

For the implementer, so the same story carries through and nothing new is invented. Each line is already
covered by a delta or by an existing string.

| Surface | The one thing it says |
|---|---|
| Hero | The reply happens when the enquiry arrives, not when somebody is free |
| Three pains | The enquiry at the wrong moment, the scattered context, and nobody knowing who calls back |
| 01 Answered | A reply in the customer's language, under your agency's name, that promises nothing |
| 02 Recorded | One record holds the conversation and what they asked for |
| 03 Handed over | The viewing request becomes a task with a reason and an owner |
| 04 Done | A person takes it and closes it, and the team sees who |
| One system | The three things live together instead of in three places |
| Getting started | You set the agency up yourself, and nothing is charged |
| Plans | Essential free for 14 days, then a price we tell you, paid by invoice |
| FAQ | What is not included, said once and plainly |

---

## 6. Prepared, not for publication

Both texts stay out of the build until their own end to end proof is reported. They are written now so
that nobody writes them in a hurry on the day the proof arrives.

### 6.1 Phone — publishes after `VOICE_REAL_CALL_E2E` **and** an approved spoken notice

| Slot | EN | ES |
|---|---|---|
| Heading | The call is answered, and the callback is written down | La llamada se atiende, y la devolución queda anotada |
| Lead | Someone calls outside office hours. The assistant answers, says it is an assistant, takes what they want, and leaves your team a callback task with the number and the reason. | Alguien llama fuera del horario. El asistente responde, dice que es un asistente, recoge lo que quiere y deja a tu equipo una tarea de devolución con el número y el motivo. |
| Limit, stated on the page | It does not agree appointments on the phone. A person calls back and does that. | No acuerda citas por teléfono. Una persona devuelve la llamada y lo hace. |
| Not to be written | any number of rings or minutes, transfers to a colleague during the call, behaviour on holidays, or what happens if the telephony provider is down. `PRODUCT_TRUTH_TABLE` v1.1 §E: holidays are not implemented, a warm transfer has no stored destination, and a provider outage has no fallback | — |

### 6.2 Social — publishes after one real provider run per requested permission

| Slot | EN | ES |
|---|---|---|
| Heading | Your Instagram, worked from the same place as everything else | Tu Instagram, gestionado desde el mismo sitio que todo lo demás |
| Lead | Publish a listing to your account, read the comments and the messages it brings, and answer them without leaving Nuova. Someone who asks about a property becomes a lead like any other. | Publica un inmueble en tu cuenta, lee los comentarios y los mensajes que llegan y respóndelos sin salir de Nuova. Quien pregunta por un inmueble pasa a ser un lead como cualquier otro. |
| Limits, stated on the page | Instagram only, and only a professional account you own or administer. We publish what you approve and we answer only people who wrote to you first. Facebook pages and advertising lead forms are not part of it. | Solo Instagram, y solo una cuenta profesional tuya o que administres. Publicamos lo que apruebas y respondemos solo a quien te ha escrito primero. Las páginas de Facebook y los formularios de publicidad no forman parte de esto. |
| Not to be written | any claim of a Meta partnership, review or certification; anything about Facebook pages or Lead Ads; unsolicited messages | — |

---

## 7. Still owed, by whom

| # | Item | Who | What it blocks |
|---|---|---|---|
| 1 | `WEBQA_KB_ROW = faq-kb-v1.2` in `app_config` | Hosting, with API | any Q&A surface going public. Today staging answers from `faq-kb-v1.0`, which carries claims the pages no longer make |
| 2 | O-6 legal form, NIF, address | Owner | all four legal pages |
| 3 | O-8 retention per class, on the template that now exists | Owner | the retention section, and Q-44 stays as written |
| 4 | O-7 prices and the billing period | Owner, then API | every amount. The catalogue reports `awaiting_pricing_authority` |
| 5 | CQ-2 disclosure version for a third party agency, CQ-13 deletion deadlines, CQ-16 web notice, CQ-20 the transfer basis | counsel | the pilot's e-mail channel, two sentences on the deletion page, the question box |
| 6 | Whether a priority value exists in production at all | Lead | five deltas of 2026-09-29 stay removed until it does |
| 7 | Whether the catalogue's lead caps are commercial limits or staging placeholders | API | they render as hard numbers |
| 8 | Gmail signature: whether a signature block exists at all | Hosting | `PRODUCT_TRUTH_TABLE` v1.1 §B now says `agency_branding` and `agency_email_branding` **are** read by the production Main and that without them the signature falls back to the plain brand name. That is an implementation proof, not a sent mail. After the first real branded send, L-12 can move from hidden to live and this lane writes the sentence |
