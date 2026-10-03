# COPY DELTAS 1003 — module demonstrations, package comparison, trial, AI transparency, FAQ, closing

**State:** `2026-10-03` · **Written:** 2026-10-03 · **Copy version:** `launch-v1.4`
**Lane:** Website Copy / Product Truth → **Website Implementer**; **Daily** for §7.
**Base:** application code `cf6e80f`. The hero is delivered separately in `COPY_HERO_1003.md`.
**Evidence base:** the **package matrix** in
`backend_handoff/handoff_in_2026-10-03/AUDIT_ORDERS_2026-10-03.md` §"Paketmatrix" (every state line below
names its row), `3D_FEATURE_TRUTH.md` (Delta 7, 2026-10-02), `PRODUCT_FAQ_KB_v1.md` v1.2.
**Text limits applied:** headline ≤ 8 words · one subline ≈ 20 words · feature lines 3 to 6 words ·
paragraphs at most two sentences · ES and EN throughout.
**Status:** DRAFT by its author, not independently reviewed.

---

## 0. The two state words, and how to read them

Every feature line and every demonstration carries one of exactly two states. The matrix row that proves
it is named in the right-hand column, every time.

| State | ES | EN | Means |
|---|---|---|---|
| available | **Disponible** | **Available** | it runs in production today. Where production is narrower than the feature, the scope is in the same line |
| in preparation | **En preparación · todavía no contratable** | **In preparation · not bookable yet** | built, tested or planned, but not something an agency can order today |

There is no third state and no "coming soon". A feature with no matrix row gets no line at all.

---

## 1. The five module demonstrations

Each one: a title, two to four step lines of three to six words, and one state line.

### 1.1 Message → reply → customer record

| Slot | ES | EN |
|---|---|---|
| Title | De un mensaje a una ficha | From a message to a record |
| Step 1 | Llega una consulta por WhatsApp | An enquiry arrives on WhatsApp |
| Step 2 | Nuova responde en español | Nuova replies in Spanish |
| Step 3 | Se crea la ficha del cliente | The customer record is created |
| Step 4 | El aviso de lead caliente | The hot lead alert |
| State | **Disponible:** respuesta en español y ficha del cliente. **En preparación:** el aviso de lead caliente, todavía no contratable. | **Available:** the reply in Spanish and the customer record. **In preparation:** the hot lead alert, not bookable yet. |

**Evidence.** Matrix "Essential · automatische Antworten" (Prod, Spanish only, our own agency), "Essential
· CRM-Einträge" (Prod, database and Google Sheet), "Essential · Hot-Lead-Alerts" (Prod present, the false
trigger fixed **in the package**, the port outstanding). Step 4 is in the demonstration and **not** in the
hero, because the version running in production is still the one that misfires.

### 1.2 Team list → next action → done

| Slot | ES | EN |
|---|---|---|
| Title | De la lista a la tarea hecha | From the list to a finished task |
| Step 1 | Cada persona ve su lista | Each person sees their list |
| Step 2 | Toma la tarea que sigue | They take the next task |
| Step 3 | La cierra cuando está hecha | They close it when done |
| State | **Disponible:** ver, tomar y completar tareas. **En preparación:** la vista de equipo y el aviso por WhatsApp. | **Available:** seeing, taking and completing tasks. **In preparation:** the team overview and the WhatsApp notice. |

**Evidence.** Matrix "Growth · Jarvis/Daily Goals": production carries list, take and complete; the
overview and WhatsApp are staging logic only.

### 1.3 Phone → recorded wish → task

| Slot | ES | EN |
|---|---|---|
| Title | Una llamada que no se pierde | A call that is not lost |
| Step 1 | Alguien llama a tu agencia | Someone calls your agency |
| Step 2 | Se recoge lo que pide | What they want is recorded |
| Step 3 | Queda una tarea para tu equipo | A task is left for your team |
| State | **En preparación · todavía no contratable.** Hoy no hay número en producción. | **In preparation · not bookable yet.** There is no number in production today. |

**Evidence.** Matrix "Enterprise · Telefonie": staging ready in Spanish, production nothing. No sentence
says the assistant speaks to callers today, and none promises an appointment.

### 1.4 Property → social post → comment → reply

| Slot | ES | EN |
|---|---|---|
| Title | De un inmueble a una conversación | From a listing to a conversation |
| Step 1 | Eliges un inmueble tuyo | You pick one of your listings |
| Step 2 | Se prepara la publicación | The post is prepared |
| Step 3 | Llega un comentario o mensaje | A comment or message arrives |
| Step 4 | Respondes desde el mismo sitio | You answer from the same place |
| State | **En preparación · todavía no contratable.** Depende de la aprobación de la plataforma. | **In preparation · not bookable yet.** It depends on the platform's approval. |

**Evidence.** Matrix "Enterprise · Social Growth": built on staging, **0 Meta calls**, needs the lab test,
the app review and, for customer operation, business verification. Instagram only; Facebook pages and
advertising lead forms are not part of it.

### 1.5 Floor plan and photos → 3D model → floors → furniture on and off

| Slot | ES | EN |
|---|---|---|
| Title | Un modelo 3D de tu inmueble | A 3D model of your property |
| Step 1 | Nos envías el plano acotado | You send us the dimensioned plan |
| Step 2 | Construimos y comprobamos el modelo | We build and check the model |
| Step 3 | Eliges planta y entras en cada habitación | You choose a floor and look into each room |
| Step 4 | Enciendes y apagas el mobiliario | You switch the furnishing on and off |
| State | **Disponible por encargo:** cada modelo lo hacemos nosotros a partir de tus planos. **No es automático** y no hay cupo. | **Available per order:** we build each model from your plans. **It is not automatic** and there is no quota. |

**Evidence.** `3D_FEATURE_TRUTH` Delta 7: rotate, zoom, tap a room, choose a floor (demo house), switch
furniture and trees with their shadows, English or Spanish. Matrix "3D-Kontingent": handwork per order, no
counter, no viewer host, no order entity, so **"Kontingent" cannot be written** and no quota, delivery
time or price appears. Embedding on the website waits for `3D_OWNER_VISUAL_ACCEPTANCE`.

**Never, in this demonstration or anywhere:** photorealistic, "with your furniture", a walkthrough at eye
level, virtual reality, an instant result, self service, upload a plan and get a model automatically. The
viewer has no roof, no operable doors or windows, no daylight switch and no measuring tool; mirrors on a
phone show a pre-rendered image rather than a live reflection.

---

## 2. The package comparison

Three cards. Growth and Enterprise open with "everything in the previous one, plus". No price, no quota,
no "unlimited", no promised leads anywhere.

### 2.1 Essential

| Slot | ES | EN |
|---|---|---|
| Card title | Essential | Essential |
| Card line | Responder y ordenar lo que llega. | Answering and ordering what arrives. |
| Feature 1 | Respuestas automáticas | Automatic replies |
| State 1 | Disponible en español | Available in Spanish |
| Feature 2 | Etiquetas de email | E-mail labels |
| State 2 | Disponible con Gmail | Available with Gmail |
| Feature 3 | Fichas de cliente | Customer records |
| State 3 | Disponible | Available |
| Feature 4 | Conexión con tu CRM | Connection to your CRM |
| State 4 | En preparación · todavía no contratable | In preparation · not bookable yet |
| Feature 5 | Avisos de lead caliente | Hot lead alerts |
| State 5 | En preparación · todavía no contratable | In preparation · not bookable yet |
| Button | Prueba Essential gratis | Try Essential free |

**Evidence, line by line.** 1: "automatische Antworten · Prod, nur ES". 2: "E-Mail-Labels · Prod, Gmail";
Outlook is in the "integrieren" column and is therefore **not named**. 3: "CRM-Einträge · Prod". 4:
"externe CRM-Anbindung · Staging zertifiziert, Prod keine". 5: "Hot-Lead-Alerts · Port fehlt".

**The external CRM line, in the card's detail text:** ES "HubSpot, Pipedrive, Zoho y Salesforce están
certificados en nuestro entorno de pruebas contra cuentas reales de cada proveedor. Todavía no hay ninguna
conexión en producción, así que tus leads viven en el CRM incluido." · EN "HubSpot, Pipedrive, Zoho and
Salesforce are certified in our test environment against each provider's real accounts. There is no
production connection yet, so your leads live in the included CRM." The four names are backed by the
matrix; the word **universal** is not, and is never used. The included CRM is never presented as the
external connection.

### 2.2 Growth

| Slot | ES | EN |
|---|---|---|
| Card title | Growth | Growth |
| Card line | Todo lo de Essential, y además: | Everything in Essential, plus: |
| Feature 1 | Seguimientos automáticos | Automatic follow-ups |
| State 1 | En preparación · todavía no contratable | In preparation · not bookable yet |
| Feature 2 | Propuestas de inmuebles | Property suggestions |
| State 2 | En preparación · todavía no contratable | In preparation · not bookable yet |
| Feature 3 | Tareas diarias del equipo | Daily tasks for the team |
| State 3 | Disponible: ver, tomar, completar | Available: see, take, complete |
| Feature 4 | Recogida de leads de anuncios | Intake of leads from ads |
| State 4 | En preparación · todavía no contratable | In preparation · not bookable yet |
| Feature 5 | Agenda y citas | Calendar and appointments |
| State 5 | En preparación · todavía no contratable | In preparation · not bookable yet |
| Button | Solicita una propuesta | Request a proposal |

**Evidence.** Follow-ups: staging exactly-once, delivery not certified. Property Matching: staging,
nothing in production, no real source. Jarvis/Daily Goals: production list, take, complete. Lead intake:
staging. Calendar: not connected, booking mode undefined.

**Separation the card must keep.** Feature 4 is **intake** of leads that your own advertising already
produced. We do not run campaigns, we do not buy advertising and no advertising budget goes through
Nuova. The card says so in one line: ES "Recogemos los leads que generan tus anuncios. Las campañas y el
presupuesto publicitario siguen siendo tuyos." · EN "We take in the leads your ads produce. The campaigns
and the advertising budget stay yours."

### 2.3 Enterprise

| Slot | ES | EN |
|---|---|---|
| Card title | Enterprise | Enterprise |
| Card line | Todo lo de Growth, y además: | Everything in Growth, plus: |
| Feature 1 | Instagram desde el mismo sitio | Instagram from the same place |
| State 1 | En preparación · todavía no contratable | In preparation · not bookable yet |
| Feature 2 | Asistente telefónico | Phone assistant |
| State 2 | En preparación · todavía no contratable | In preparation · not bookable yet |
| Feature 3 | Modelos 3D incluidos por encargo | 3D models included, per order |
| State 3 | Disponible por encargo · sin cupo | Available per order · no quota |
| Button | Solicita una propuesta | Request a proposal |

**The fourth row of the owner's structure is missing on purpose.** "Größerer Akquiseumfang" has the matrix
entry *"nicht definiert · Owner-Definition"*. A package line must be backed by a matrix row, and "not
defined" is not a backing. Writing it would mean inventing a scope, a volume or a number, which this round
forbids. **Owner decision needed:** say what a larger acquisition scope is, and the line is written the
same day. Until then Enterprise carries three lines, not four.

### 2.4 The 3D strip

| Slot | ES | EN |
|---|---|---|
| Line | Modelos 3D también por separado, sin ningún paquete. | 3D models can also be ordered on their own, without a package. |
| Detail | Cada modelo es un encargo: nos envías los planos, lo construimos y lo comprobamos. | Each model is an order: you send the plans, we build it and we check it. |
| Button | Pide un modelo | Ask for a model |

No quota, no delivery time, no price: the matrix row says there is no counter, no viewer host and no order
entity, so nothing may be promised about how many or how fast.

### 2.5 What the three cards separate, and must keep separating

| Thing | Where it belongs | The sentence that keeps it apart |
|---|---|---|
| **Processing** what arrives | Essential | answering, labelling, recording |
| **Acquisition** of new leads | Growth, as intake only | "We take in the leads your ads produce" |
| **The advertising budget** | nowhere in the product | "The campaigns and the advertising budget stay yours" |
| **3D orders** | Enterprise and the separate strip | "Each model is an order", never a quota |

---

## 3. The trial sentence, after the activation rule

| # | Key | Before (in `cf6e80f`) | After ES | After EN |
|---|---|---|---|---|
| D-88 | `home.access.steps[1].line` | "One step, and your 14 day trial starts." · "Un paso, y empieza tu prueba de 14 días." | Le pones nombre a tu agencia y entras en la configuración. | You name your agency and move on to the setup. |
| D-89 | `onboarding.register.lead` | "Your login works. This last step creates your agency and starts your 14 day trial." | Tu acceso funciona. Este último paso crea tu agencia; los 14 días empiezan cuando la actives. | Your login works. This last step creates your agency, and the 14 days start when you activate it. |
| D-90 | new line on the trial card | *(none)* | Los 14 días empiezan cuando tu agencia sale en vivo, no cuando le pones nombre. | Your 14 days start when your agency goes live, not when you name it. |

Naming the agency and starting the trial are two different moments, and a customer who believes the clock
started on day one loses days they paid attention for.

---

## 4. AI transparency

| # | Key | Before | After ES | After EN |
|---|---|---|---|---|
| D-91 | the sample marker inside the conversation | "Sample translation. The approved notice is the Spanish one." **inside the sales display** | *(removed from the display)* | *(removed from the display)* |
| D-92 | figure caption under the conversation card, with the synthetic-data label | — | Datos inventados. El aviso mostrado aquí está traducido; el texto aprobado es el español. | Invented data. The notice shown here is translated; the approved wording is the Spanish one. |
| D-93 | the transparency line, next to the reply | "The reply says an assistant wrote it. It does not commit your agency to a price, a date or a condition." | Tus clientes saben que responde un asistente. Por eso se fían de la respuesta, y nada queda comprometido: ni precio, ni fecha, ni condición. | Your customers are told an assistant is replying. That is why they trust the reply, and nothing is committed: no price, no date, no condition. |

The **approved Spanish notice stays word for word** wherever it is shown. D-91 only moves the translation
remark out of the middle of the sales story into the figure caption, which is where a reader looks for
"what am I seeing".

---

## 5. The home page FAQ, eight entries

Taken from `PRODUCT_FAQ_KB_v1.md` v1.2 and cut to two sentences. Nothing new is claimed; the full page
keeps all twenty-six.

| KB | ES | EN |
|---|---|---|
| Q-11 | **¿Cuánto dura la prueba?** 14 días de Essential, gratis, sin tarjeta. Los 14 días empiezan cuando tu agencia sale en vivo. | **How long is the trial?** 14 days of Essential, free, no card. The 14 days start when your agency goes live. |
| Q-14 | **¿Puedo pagar con tarjeta?** No. Emitimos una factura y la pagas por transferencia. | **Can I pay by card?** No. We issue an invoice and you pay it by bank transfer. |
| Q-02 | **¿Qué canales se responden?** Consultas de texto por WhatsApp y por email. Otros canales no forman parte de la oferta hoy. | **Which channels are answered?** Text enquiries on WhatsApp and by e-mail. Other channels are not part of the offer today. |
| Q-06 | **¿En qué idioma responde?** Hoy en español. Otros idiomas necesitan su propia aprobación. | **In which language does it reply?** In Spanish today. Other languages need their own approval. |
| Q-05 | **¿Sabe el cliente que le responde un asistente?** Sí, cada respuesta lo indica. Es una obligación legal y no depende de tu plan. | **Does the customer know an assistant is replying?** Yes, every reply says so. It is a legal duty and does not depend on your plan. |
| Q-18 | **¿Tengo que cambiar de CRM?** No. Hay un CRM incluido y tus leads viven ahí desde el principio. | **Do I have to change my CRM?** No. A CRM is included and your leads live there from the start. |
| Q-09 | **¿Sustituye a mi equipo?** No. Responde primero y ordena la consulta; la visita y la relación siguen siendo de tu gente. | **Does it replace my team?** No. It answers first and orders the enquiry; the viewing and the relationship stay with your people. |
| Q-16 | **¿Tengo que hablar con un comercial?** No. Puedes empezar por tu cuenta y la demo es opcional. | **Do I have to talk to a salesperson?** No. You can start on your own and a demo is optional. |

---

## 6. The closing CTA

| Slot | ES | EN |
|---|---|---|
| Line | Tu próxima consulta ya está en camino. | Your next enquiry is already on its way. |
| Button | Prueba Essential gratis | Try Essential free |

One line, one button. The second button of the hero does not repeat here.

---

## 7. The example reference, decided

**Decision: `EST-204`.** Daily is recording clip v3 anyway, because the burned-in subtitles have to come
out so the player bar stops covering them. The reference change rides along in that run at no extra cost,
which is what blocked it on 2026-10-01: back then a site-only change would have put `EST-204` next to a
picture reading `REF-DEMO-204`.

| # | Where | After | Condition |
|---|---|---|---|
| D-80 (re-issued) | every site string carrying `REF-DEMO-204` | `EST-204`, written "Ref. EST-204" in prose | ships **together with** clip v3. Until then both stay `REF-DEMO-204` |

Asked of Daily: use `EST-204` as the viewing reference in clip v3, and no burned-in subtitles.

---

## 8. Still owed

| # | Item | Who | What it blocks |
|---|---|---|---|
| 1 | What "a larger acquisition scope" is | Owner | the fourth Enterprise line (§2.3) |
| 2 | The port of the hot-lead fix to production | the owning lane | the third hero label and Essential's state line 5 |
| 3 | O-7 prices and the billing period | Owner, then API | every amount; the cards carry none |
| 4 | O-6 legal form, NIF, address | Owner | the privacy, terms and legal notice pages. **Not** the Meta texts: `META_LEGAL_TEXT_FINAL` is free of placeholders |
| 5 | O-8 retention per class | Owner, then counsel | the retention section |
| 6 | `3D_OWNER_VISUAL_ACCEPTANCE` | Owner | embedding the viewer; the texts are ready |
| 7 | `WEBQA_KB_ROW = faq-kb-v1.2` | Hosting with API | the question box going back on |
