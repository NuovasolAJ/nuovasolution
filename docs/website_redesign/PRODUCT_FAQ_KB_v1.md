# PRODUCT FAQ KB v1 — the product assistant's knowledge base

**Version:** `faq-kb-v1.0` · **State:** `2026-09-28_FINAL_CONVERGENCE_AUDIT_R2` · **Written:** 2026-09-28
**Lane:** Website Copy / Product Truth → **Lead** (`PRODUCT_QA_CONTRACT`) and **Hosting** (H2, the
product path) · also the source for the public FAQ blocks.
**Status:** DRAFT by its author, not independently reviewed, not legally reviewed.

Every answer carries the version `faq-kb-v1.0`. When an answer changes, the version of that row
changes and the assistant reports the row version it answered from, so a wrong answer can be traced
to a text rather than to a model.

---

## 1. How the assistant uses this file

1. **Answer only from this file.** No answer is composed from general knowledge, from the website's
   marketing text or from the property pipeline's prompts.
2. **No match, no guess.** If the question is not covered here, the assistant says so and offers a
   person. That is a correct outcome, not a failure.
3. **Never these, in any wording:** a price or a discount, a response time, a guaranteed result,
   legal or tax advice, a commitment on our behalf, anything about a named agency or customer,
   anything about a module marked `hidden` in `LAUNCH_COPY_v1.md` §1 beyond the honest answer written
   here.
4. **The visitor is not a lead in the property sense.** The question is stored as a `website_qa`
   enquiry; it is not qualified, scored, matched against properties, or turned into a handover task
   unless the visitor asks to be contacted (R25).
5. **Language.** Answer in the language of the question, English or Spanish. If it is another
   language, answer in English and offer a person.

`allowed` = the assistant may answer. `handover` = the assistant gives the short answer written here
and offers a person. `refuse` = the assistant states the boundary and offers a person.

---

## 2. What Nuova does

| # | Question | Answer | Evidence | Mode |
|---|---|---|---|---|
| Q-01 | EN What does Nuova actually do?<br>ES ¿Qué hace Nuova exactamente? | EN It answers the enquiries your agency receives, records each one as a customer record with a qualification and a priority, and turns a viewing request into a task your team can see and complete.<br>ES Responde a las consultas que recibe tu agencia, registra cada una como una ficha con su cualificación y su prioridad, y convierte una petición de visita en una tarea que tu equipo ve y completa. | L-01 to L-04 | allowed |
| Q-02 | EN Which channels are answered?<br>ES ¿Qué canales se responden? | EN Text enquiries on WhatsApp and by e-mail. Other channels are not part of the offer today.<br>ES Consultas de texto por WhatsApp y por email. Otros canales no forman parte de la oferta hoy. | L-01, L-02 | allowed |
| Q-03 | EN Does it answer at night and at weekends?<br>ES ¿Responde de noche y los fines de semana? | EN Yes. The reply does not wait for office hours. We do not promise a number of minutes, and we do not measure one.<br>ES Sí. La respuesta no espera al horario de oficina. No prometemos un número de minutos ni lo medimos. | L-01; L-22 forbids a time claim | allowed |
| Q-04 | EN How fast does it reply?<br>ES ¿Cuánto tarda en responder? | EN We do not give a time. The reply is automatic rather than scheduled, but no measured figure exists, so we will not invent one.<br>ES No damos un tiempo. La respuesta es automática, no programada, pero no existe una cifra medida y no vamos a inventarla. | L-22 | allowed |
| Q-05 | EN Does the customer know they are talking to an assistant?<br>ES ¿Sabe el cliente que habla con un asistente? | EN Yes. Every reply written by the assistant carries a notice that says so. It is a legal duty, not an option, and it does not depend on your plan.<br>ES Sí. Cada respuesta redactada por el asistente lleva un aviso que lo indica. Es una obligación legal, no una opción, y no depende de tu plan. | `DISCLOSURE-FN-BYTES-0924`; A-W2 | allowed |
| Q-06 | EN In which language does it answer my customers?<br>ES ¿En qué idioma responde a mis clientes? | EN In the language the customer wrote in. You set a default for the cases where that cannot be determined.<br>ES En el idioma en el que escribió el cliente. Tú defines un idioma por defecto para los casos en que no se pueda determinar. | L-05; `LANG-FIELDS-1`. **No language count** | allowed |
| Q-07 | EN Does it commit my agency to anything?<br>ES ¿Compromete a mi agencia a algo? | EN No. The reply does not agree a price, a date or a condition. A viewing request is recorded as a request, and a person confirms it.<br>ES No. La respuesta no acuerda ningún precio, fecha ni condición. Una petición de visita se registra como petición y una persona la confirma. | L-04; R36 | allowed |
| Q-08 | EN Will it invent details about a property?<br>ES ¿Se inventa datos de una propiedad? | EN It does not put property suggestions in replies today; that part is switched off until it passes our own tests. What it does answer comes from what the customer wrote and what your agency has confirmed.<br>ES Hoy no incluye propuestas de propiedades en las respuestas; esa parte está desactivada hasta que supere nuestras propias pruebas. Lo que responde sale de lo que escribió el cliente y de lo que tu agencia ha confirmado. | L-11 hidden, R32 | allowed |
| Q-09 | EN Does it replace my team?<br>ES ¿Sustituye a mi equipo? | EN No. It answers first and organises the enquiry. The viewing, the negotiation and the relationship stay with your people, and the task tells them where to start.<br>ES No. Responde primero y organiza la consulta. La visita, la negociación y la relación siguen siendo de tu gente, y la tarea les dice por dónde empezar. | L-04 | allowed |
| Q-10 | EN Can my team see what the assistant said?<br>ES ¿Puede mi equipo ver lo que dijo el asistente? | EN Yes. The conversation sits on the customer record, so anyone with the right role reads the same history.<br>ES Sí. La conversación está en la ficha del cliente, así que cualquier persona con el rol adecuado lee el mismo historial. | L-03 | allowed |

## 3. Trial, plans, paying

| # | Question | Answer | Evidence | Mode |
|---|---|---|---|---|
| Q-11 | EN How long is the trial and what does it cost?<br>ES ¿Cuánto dura la prueba y qué cuesta? | EN 14 days, with no payment method and no card. You create the account yourself.<br>ES 14 días, sin método de pago y sin tarjeta. Creas la cuenta tú mismo. | L-07 | allowed |
| Q-12 | EN What happens after the 14 days?<br>ES ¿Qué pasa después de los 14 días? | EN Your account and your data stay. The paid parts pause until you choose a plan, and you can still log in.<br>ES Tu cuenta y tus datos se quedan. Las partes de pago se pausan hasta que elijas un plan, y puedes seguir entrando. | L-07 | allowed |
| Q-13 | EN What does it cost after that?<br>ES ¿Cuánto cuesta después? | EN I do not give prices. A person tells you the price for your agency before anything is agreed.<br>ES No doy precios. Una persona te dice el precio para tu agencia antes de acordar nada. | L-08; no `PRICING_AUTHORITY` | handover |
| Q-14 | EN Can I pay by card on the website?<br>ES ¿Puedo pagar con tarjeta en la web? | EN No. We issue an invoice and you pay it by bank transfer. There is no card payment and no automatic renewal.<br>ES No. Emitimos una factura y la pagas por transferencia. No hay pago con tarjeta ni renovación automática. | L-08 | allowed |
| Q-15 | EN When is my plan active?<br>ES ¿Cuándo está activo mi plan? | EN When the payment is confirmed. An issued invoice does not activate anything on its own.<br>ES Cuando el pago está confirmado. Una factura emitida no activa nada por sí sola. | L-08 | allowed |
| Q-16 | EN Do I have to talk to a salesperson first?<br>ES ¿Tengo que hablar antes con un comercial? | EN No. You can start on your own. A demo is optional and never a condition.<br>ES No. Puedes empezar por tu cuenta. La demo es opcional y nunca una condición. | L-06 | allowed |
| Q-17 | EN Is there a discount, an offer or a longer trial?<br>ES ¿Hay descuento, oferta o prueba más larga? | EN I cannot offer either. A person handles anything about conditions.<br>ES No puedo ofrecer ninguna de las dos cosas. Una persona se ocupa de cualquier cuestión sobre condiciones. | T-03 on legal hold | refuse |

## 4. Setting up, CRM, team

| # | Question | Answer | Evidence | Mode |
|---|---|---|---|---|
| Q-18 | EN Do I have to change my CRM?<br>ES ¿Tengo que cambiar de CRM? | EN No. A CRM is included and it is where your leads live from the start. Connecting an outside CRM is not part of the offer today, so tell us which one you use and you stay on the included CRM meanwhile.<br>ES No. Se incluye un CRM y es donde viven tus leads desde el principio. Conectar un CRM externo no forma parte de la oferta hoy, así que dinos cuál usas y entretanto sigues con el CRM incluido. | L-09, L-18 | allowed |
| Q-19 | EN Do you work with HubSpot, Salesforce, Pipedrive or Zoho?<br>ES ¿Funciona con HubSpot, Salesforce, Pipedrive o Zoho? | EN Not as something I can promise you today. Tell a person which one you use and they will tell you exactly where it stands.<br>ES Hoy no como algo que te pueda prometer. Dile a una persona cuál usas y te dirá exactamente en qué punto está. | L-18 hidden | handover |
| Q-20 | EN Does it work with Outlook or Microsoft 365?<br>ES ¿Funciona con Outlook o Microsoft 365? | EN Not as part of the offer today. A person will tell you where it stands rather than give you a date.<br>ES Hoy no como parte de la oferta. Una persona te dirá en qué punto está, en lugar de darte una fecha. | L-19 hidden | handover |
| Q-21 | EN How long does setting up take?<br>ES ¿Cuánto se tarda en configurarlo? | EN I do not give a duration. You do it yourself in steps, your progress is saved, and you can stop and come back.<br>ES No doy una duración. Lo haces tú mismo por pasos, tu progreso se guarda y puedes parar y volver. | L-06 | allowed |
| Q-22 | EN Can I add my team and give them different roles?<br>ES ¿Puedo añadir a mi equipo y darles roles distintos? | EN Yes. You invite your team and set a role for each person, and the roles decide what they see and do.<br>ES Sí. Invitas a tu equipo y defines un rol para cada persona, y los roles deciden qué ven y qué hacen. | onboarding team step, `AUTH_COPY_v1.md` §5 | allowed |
| Q-23 | EN Do messages go out with my agency's name and logo?<br>ES ¿Los mensajes salen con el nombre y el logo de mi agencia? | EN They go out under your agency's name. Your logo and signature in outgoing mail are not something I can promise you yet; a person will tell you where it stands.<br>ES Salen con el nombre de tu agencia. Tu logo y tu firma en el correo que sale no son algo que te pueda prometer todavía; una persona te dirá en qué punto está. | L-01 allowed, L-12 hidden | handover |
| Q-24 | EN Can I keep a copy of my leads in my own spreadsheet?<br>ES ¿Puedo tener una copia de mis leads en mi propia hoja de cálculo? | EN Not as part of the offer today. A person will tell you where it stands.<br>ES Hoy no como parte de la oferta. Una persona te dirá en qué punto está. | L-20 hidden | handover |
| Q-25 | EN Do you support more than one office?<br>ES ¿Soportáis más de una oficina? | EN Plans differ in what they include, including offices and seats. A person tells you which plan fits your structure.<br>ES Los planes se diferencian en lo que incluyen, incluidas oficinas y puestos. Una persona te dice qué plan encaja con tu estructura. | plan limits exist; no figures published | handover |

## 5. Media, phone, social, 3D

| # | Question | Answer | Evidence | Mode |
|---|---|---|---|---|
| Q-26 | EN Can it read photos or PDFs a customer sends?<br>ES ¿Puede leer fotos o PDF que envía un cliente? | EN Not as part of the offer today. It is built and we are still testing it, including what happens with a file that cannot be read, and I will not promise it before those tests pass.<br>ES Hoy no como parte de la oferta. Está construido y seguimos probándolo, incluido qué pasa con un archivo que no se puede leer, y no lo voy a prometer antes de que esas pruebas pasen. | L-10 hidden; E3 is a reproduced FAIL | allowed |
| Q-27 | EN Does it take phone calls?<br>ES ¿Atiende llamadas de teléfono? | EN A phone assistant is part of the product and we show it on request. It is not answering agency calls today.<br>ES El asistente telefónico forma parte del producto y lo mostramos a petición. Hoy no atiende llamadas de agencias. | L-14 on request | allowed |
| Q-28 | EN Does it manage my Instagram or Facebook?<br>ES ¿Gestiona mi Instagram o Facebook? | EN Not today. It depends on approvals from the platforms that we do not have yet, so a person will tell you where it stands rather than give you a date.<br>ES Hoy no. Depende de aprobaciones de las plataformas que todavía no tenemos, así que una persona te dirá en qué punto está en lugar de darte una fecha. | L-16 hidden | handover |
| Q-29 | EN What is Property Experience?<br>ES ¿Qué es Property Experience? | EN A 3D walkthrough of a property, as a premium service on request.<br>ES Un recorrido 3D de una propiedad, como servicio premium a petición. | L-15 on request | allowed |
| Q-30 | EN Do you bring me leads from advertising?<br>ES ¿Me traéis leads de publicidad? | EN Not as part of the offer today. Nuova works on the enquiries that reach your agency.<br>ES Hoy no como parte de la oferta. Nuova trabaja sobre las consultas que llegan a tu agencia. | L-17 hidden | allowed |
| Q-31 | EN Does it tell me which leads are hot so I can call them first?<br>ES ¿Me dice qué leads están calientes para llamarlos primero? | EN Every enquiry carries a priority: cold, warm or hot, with no score to interpret, and the task tells your team where to start. There is no alert message sent to you.<br>ES Cada consulta lleva una prioridad: fría, templada o caliente, sin puntuación que interpretar, y la tarea le dice a tu equipo por dónde empezar. No se te envía ningún mensaje de alerta. | L-03, L-04; D-10 forbids the alert claim | allowed |

## 6. Data, rights, trust

| # | Question | Answer | Evidence | Mode |
|---|---|---|---|---|
| Q-32 | EN What happens to the data of the people who write to me?<br>ES ¿Qué pasa con los datos de las personas que me escriben? | EN They are processed to answer and to organise the enquiry for your agency. They are not sold and they are not used to advertise to anyone. The privacy notice states the detail.<br>ES Se tratan para responder y organizar la consulta para tu agencia. No se venden y no se usan para hacer publicidad a nadie. El aviso de privacidad indica el detalle. | `LEGAL_PAGES_FINAL_v1.md` §2 | allowed |
| Q-33 | EN Where is the data stored?<br>ES ¿Dónde se guardan los datos? | EN A person answers that precisely, because it deserves a precise answer rather than a general one.<br>ES Una persona responde a eso con precisión, porque merece una respuesta precisa y no general. | `PRODUCT_TRUTH_TABLE_v1` question C not delivered | handover |
| Q-34 | EN Can a customer ask for their data to be deleted?<br>ES ¿Puede un cliente pedir que se eliminen sus datos? | EN Yes. There is a page that explains how to ask, and we help your agency answer such a request.<br>ES Sí. Hay una página que explica cómo pedirlo, y ayudamos a tu agencia a responder a esa solicitud. | `LEGAL_PAGES_FINAL_v1.md` §4 | allowed |
| Q-35 | EN Is my agency's data separate from other agencies'?<br>ES ¿Los datos de mi agencia están separados de los de otras agencias? | EN Each agency has its own environment, and a person will walk you through exactly how that is enforced. I do not make security claims.<br>ES Cada agencia tiene su propio entorno, y una persona te explicará exactamente cómo se garantiza. Yo no hago afirmaciones sobre seguridad. | isolation exists; gate N14 not proven; B-14/B-15 forbid security claims | handover |
| Q-36 | EN Do you use my data to train an AI?<br>ES ¿Usáis mis datos para entrenar una IA? | EN A person answers that in writing, because it is a commitment and not something I should summarise.<br>ES Una persona responde a eso por escrito, porque es un compromiso y no algo que yo deba resumir. | no approved statement exists | refuse |
| Q-37 | EN Who is behind NuovaSolution?<br>ES ¿Quién está detrás de NuovaSolution? | EN The legal notice names the owner, the address and the contact e-mail.<br>ES El aviso legal indica el titular, la dirección y el email de contacto. | `LEGAL_PAGES_FINAL_v1.md` §1 | allowed |
| Q-38 | EN Which agencies use it? Can I see a reference?<br>ES ¿Qué agencias lo usan? ¿Puedo ver una referencia? | EN I do not name customers and we publish no references. A person will tell you what can be shown.<br>ES No doy nombres de clientes y no publicamos referencias. Una persona te dirá qué se puede mostrar. | no real social proof exists (Z04) | handover |
| Q-39 | EN Is it available in my country?<br>ES ¿Está disponible en mi país? | EN We work with agencies in Spain. For anywhere else, a person answers.<br>ES Trabajamos con agencias en España. Para cualquier otro sitio, responde una persona. | positioning | allowed |
| Q-40 | EN Can I try it with my real enquiries?<br>ES ¿Puedo probarlo con mis consultas reales? | EN That is exactly what a person sets up with you, because it touches your channels. Leave your e-mail and we will get in touch.<br>ES Eso es justo lo que una persona prepara contigo, porque afecta a tus canales. Déjanos tu email y te contactamos. | channel connection is not self-service today | handover |

---

## 7. Interface states

Replaces nothing in `PRODUCT_TEXTS_C3_v1.md` §4 except where noted; adds the confirmation rule from
Z10.

| State | EN | ES |
|---|---|---|
| Thinking | Reading your question | Leyendo tu pregunta |
| Still working | Still working on it. | Seguimos con ello. |
| Answered, with the row version | — *(no visible version; the version is logged, not shown)* | — |
| Does not know | I cannot confirm that from here. A person can. | No puedo confirmarlo desde aquí. Una persona sí puede. |
| Price question | I do not give prices. A person tells you the price for your agency. | No doy precios. Una persona te dice el precio para tu agencia. |
| Legal or tax question | That needs a person, and in some cases your own adviser. | Eso necesita una persona y, en algunos casos, tu propio asesor. |
| Timeout | No answer yet. A person can help you directly. | Todavía no hay respuesta. Una persona puede ayudarte directamente. |
| Failed | That did not go through. Try once more, or contact a person. | No se ha enviado. Inténtalo otra vez o contacta con una persona. |
| Too long | Please keep it under 4000 characters. | Por favor, menos de 4000 caracteres. |
| Too many | Too many questions in a short time. Try again shortly. | Demasiadas preguntas en poco tiempo. Inténtalo de nuevo en breve. |
| **Offer to be contacted** | Want a person to follow this up? Leave an e-mail or a phone number. | ¿Quieres que una persona lo retome? Deja un email o un teléfono. |
| **Confirmed handover** | Done. A person has your question and your contact details. | Hecho. Una persona tiene tu pregunta y tus datos de contacto. |
| Contact field | E-mail or phone, if you want a person to reply. | Email o teléfono, si quieres que te responda una persona. |

**Two rules the interface must keep.** The storage sentence and the handover sentence describe what
**has** happened, never what might: nothing says "saved" or "a person has it" before the request
came back confirmed (Z10). And the panel keeps **one** conversation, whether it is opened inline or
as the floating window.

---

## 8. Web disclosure text, draft for counsel — priority 1

The approved `v1.0-es` covers WhatsApp, e-mail and the form channel. On the **web** channel the
production renderer returns `channel_outside_approval`, so the public question box has no approved
text (A-W7). Without this text the box does not go public.

**What the visitor must be told, at the moment they get an answer:**

| Element | EN | ES |
|---|---|---|
| Before the first answer | Answers here are written by an AI assistant. | Las respuestas de aquí las redacta un asistente de inteligencia artificial. |
| With the answer | Written by an AI assistant of NuovaSolution. If you prefer a person, ask and we will hand it over. | Redactado por un asistente de inteligencia artificial de NuovaSolution. Si prefieres una persona, dilo y te lo pasamos. |
| Storage | Your question is saved as an enquiry in Nuova, with any contact details you give us, so we can answer and follow up. Read the privacy notice. | Tu pregunta se guarda como una consulta en Nuova, junto con los datos de contacto que nos des, para poder responderte y hacer seguimiento. Lee el aviso de privacidad. |
| Boundaries | It does not give prices, legal or tax advice, and it does not commit us to anything. | No da precios, ni asesoramiento legal o fiscal, ni nos compromete a nada. |

**What counsel decides.** (1) Is the "before the first answer" line plus the line on the answer
enough on our own website, where we are the controller and the visitor is a prospective business
customer rather than a private consumer of an agency? (2) Must this text be registered as a version
alongside the channel texts, so that the same approval discipline applies, and if so under which
channel name, `web` or `form`? (3) Is "follow up" a permissible description of contacting the
visitor afterwards about the product, or must the promise narrow to answering only?

Until an approved answer exists, the question box renders **only** on preview builds, labelled as a
demonstration, and not on the public site.

---

## 9. What this file deliberately does not answer

An integration date for any hidden module. A number of minutes, hours or days for any reply. A
price, a discount or a trial extension. A named customer. A security or compliance guarantee. A
statement about where data is stored, until API delivers question C of `PRODUCT_TRUTH_TABLE_v1`.
Anything about training models on customer data. For each of these the assistant hands over to a
person, and that is the designed behaviour, not a gap.
