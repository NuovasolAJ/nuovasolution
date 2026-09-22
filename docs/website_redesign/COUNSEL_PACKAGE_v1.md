# COUNSEL PACKAGE v1 — NuovaSolution legal texts and legal questions, consolidated

> # DRAFT – not legally reviewed
> Every text in this package is a draft prepared by the Website Copy / Product Truth lane from the
> documented technical state. None is approved unless its row says **APPROVED BY OWNER** with a
> date and reference. Nothing here is legal advice or a compliance statement.

**State:** `2026-09-22_SYNC_0900Z` · **Written:** 2026-09-22 · **Package version:** `counsel-pkg-v1`
**Replaces:** `CONNECT_NOTICE_DRAFT_v1.md` §B and §C, `PRODUCT_TEXTS_C2_v1.md` §5.4 and §6 as
counsel material, `SIGNATURE_COPY_READY_v1.md` Part B. Those files stay as history.
**For:** counsel (legal review) · owner (the few decisions that are his) · API, Hosting, Voice,
Social, Multimodal, Lead (the technical facts in §J) · Website Implementer (placement).

```
DISCLOSURE_DRAFTS_EN_DE_IT = DELIVERED 2026-09-22
LEGAL_DRAFTS_META          = DELIVERED 2026-09-22
```

---

## 0. How to read this package

**Text status labels**

| Label | Meaning |
|---|---|
| **APPROVED BY OWNER** | Approved by the owner in writing; date and reference given. Counsel adequacy may still be open |
| **PENDING COUNSEL** | Submitted for counsel review; not approved |
| **DRAFT – not legally reviewed** | Written in this package; never shown to customers as final |
| **NOT APPROVED (live in prod)** | Currently rendered by the product without approval; must be decided |

**Fact labels:** **FACT** = documented, source named · **OPEN FACT → lane** = unknown, the named lane
must supply it; this is **not** a question for counsel · **COUNSEL** = a legal question.

**Placeholders.** `⟦…⟧` marks a missing fact in a draft; a page may not be published while any
remains. `{{agency_legal_name}}` is a template placeholder used **only inside the product**; the
renderer must replace it with the agency's real legal name or not send the text (§E.4).

**What counsel receives:** sections B to G are texts to review; section I lists the legal questions,
each pointing to the exact text. Counsel is not asked to fill technical gaps: those are in §J with
the responsible lane.

---

## A. Roles and scope

| Situation | Proposed role | Status |
|---|---|---|
| People who contact an estate agency that uses Nuova (buyers, sellers, tenants) | Agency = controller; NuovaSolution = processor (Art. 28 GDPR) | proposed, COUNSEL (C-01) |
| Agency staff using Nuova | Agency = controller for its staff data in Nuova; NuovaSolution = processor | proposed, COUNSEL (C-01) |
| Agency account, contract, billing | NuovaSolution = controller | proposed, COUNSEL (C-01) |
| Visitors of nuovasolution.com, the question box, people who write to NuovaSolution itself | NuovaSolution = controller | FACT (NuovaSolution's own processing) |
| **People who write to the central WhatsApp number +34 628 370 476** | **Not settled.** The number and its WhatsApp Business account are NuovaSolution's own. Today it serves NuovaSolution's own tenant. If agencies are later served through it, a person writing may be the agency's lead while NuovaSolution operates the channel | COUNSEL (C-02), gap noted in `SOCIAL_SYNC_0921_RETURN_v1.md` §5.3 |

**Controller identity used in the drafts** (as published today in the legal notice): Antonio Jesus
Diaz Gomez, Prolongación Hernando de Carabeo, Nerja, Málaga, Spain, antonio@nuovasolution.com. The
owner's decision on the legal person for Meta business verification (Social D1) may change this
block; the drafts carry it as `⟦controller block⟧` so it changes in one place.

---

## B. Privacy notice of NuovaSolution (controller notice) — DRAFT – not legally reviewed

Scope: NuovaSolution's own processing. The processing an agency does through Nuova is described in
**the agency's** notice (template exists as `legal/launch_docs/PRIVACY_NOTICE_v1.md` in the system
repo) and in the processing agreement. Section B.8 points people there.

### B.1 English

**1. Who is responsible**
⟦controller block⟧. Contact for privacy questions: antonio@nuovasolution.com.

**2. What this notice covers**
This website (nuovasolution.com), the question box on it, messages you send to NuovaSolution by
email or to our WhatsApp number, calls to our voice line where one is offered, the creation and use
of an agency account, and the connection of an agency's own Instagram, Facebook Page, email,
WhatsApp or CRM accounts to Nuova.

**3. What we process, where it comes from, and why**

| Source | Data | Purpose | Legal basis |
|---|---|---|---|
| Website visits | pages visited, counted without cookies | understanding use of the site | ⟦COUNSEL C-05: legitimate interest proposed⟧ |
| Question box | your question, our answer, and only if you give them: name, email, phone, the page you asked from | answering you; a person follows up if you ask | ⟦COUNSEL C-05⟧ |
| Email to NuovaSolution | sender name and address, message text | replying to you | ⟦COUNSEL C-05: steps at your request before a contract proposed⟧ |
| WhatsApp to our number | your name and number as WhatsApp shows them, your messages | replying to you, keeping your request on one record | ⟦COUNSEL C-05⟧ |
| Voice line, where offered | your number, what you say in the call as a transcript and summary, any appointment you ask for | answering the call and passing the request to a person | ⟦COUNSEL C-05⟧ · ⟦OPEN FACT → Voice: whether any voice line is offered publicly at publication⟧ |
| Agency account | name, work email, password (held only by our sign in provider in protected form), agency name, language, team members and their roles, branding images, legal details of the agency | providing the service you signed up for | ⟦COUNSEL C-05: contract proposed⟧ |
| Connected Instagram or Facebook Page (only when an agency connects them) | the Page and Instagram account identifiers, comments and private messages people send to that account, and the posts the agency publishes through Nuova | letting the agency answer comments and messages on its own account and publish its own posts | ⟦COUNSEL C-05⟧ |
| Connected email or WhatsApp of an agency | enquiries that reach Nuova through that account | answering them for the agency | processed for the agency, see B.8 |

We use AI to understand messages and to write replies. See section 5.

We do not sell personal data and we do not use it for advertising.

**4. Automated replies and priority**
Replies to enquiries are written by an AI assistant and are identified as such. Each enquiry
receives a priority so a person knows where to start. ⟦COUNSEL C-06: whether this priority is
profiling that needs further information or a right to object here⟧.

**5. AI services**
Messages are processed by AI models to understand them and to write replies. We reach these models
through OpenRouter; the models in use are provided by OpenAI, Google and Anthropic. Voice notes are
transcribed by OpenAI. ⟦OPEN FACT → Multimodal / Hosting: whether provider logging and training are
excluded for these accounts; the notice states it only if confirmed⟧.

**6. Who receives data (service providers)**

| Provider | What for | Where |
|---|---|---|
| Supabase | database, sign in, file storage | Frankfurt, Germany |
| Hetzner | our automation servers | Germany |
| Meta (WhatsApp, Instagram, Facebook) | receiving and sending messages; connected accounts | ⟦OPEN FACT → Social⟧ |
| Google (Gmail, Google Sheets) | email; optional copy of leads in a sheet | ⟦OPEN FACT → API⟧ |
| OpenRouter, OpenAI, Google, Anthropic | AI processing (section 5) | ⟦OPEN FACT → Multimodal: regions⟧ |
| ElevenLabs, Telnyx | voice line, where offered | ⟦OPEN FACT → Voice: regions⟧ |
| Vercel | hosting this website | ⟦OPEN FACT → Website Reviewer / API: region and data⟧ |
| Cal.com | booking a demo, if you use it | ⟦OPEN FACT → Website Implementer: confirm it is used⟧ |
| The CRM an agency chooses to connect | only if the agency connects one | the CRM provider's regions |

Where a provider processes data outside the EU, ⟦COUNSEL C-07: transfer mechanism wording⟧.

**7. How long we keep data**
Records of our automation runs, which can contain message content, are deleted after 14 days. Our
server backups are kept for about 15 days. ⟦COUNSEL C-08 with OPEN FACT → API: retention for
enquiries, leads, question box entries, account data after the end of a contract, and billing data;
two internal sources disagree on billing (5 or 6 years)⟧.

**8. If you contacted an estate agency that uses Nuova**
That agency decides about your data and tells you how in its own privacy notice. We process your
data on its behalf. If you write to us, we pass your request to the agency and help it answer.

**9. Your rights**
You can ask for access, correction, deletion, restriction, portability, and object to processing.
Where we rely on your consent you can withdraw it at any time. Write to antonio@nuovasolution.com.
You can also complain to the Spanish data protection authority (AEPD, aepd.es). How to ask for
deletion is explained on our data deletion page.

**10. Changes**
We will update this notice when our processing changes. The date at the top shows the current
version.

### B.2 Español

**1. Responsable**
⟦bloque del responsable⟧. Contacto para privacidad: antonio@nuovasolution.com.

**2. Qué cubre este aviso**
Este sitio web (nuovasolution.com), su cuadro de preguntas, los mensajes que envías a NuovaSolution
por email o a nuestro número de WhatsApp, las llamadas a nuestra línea de voz cuando se ofrezca, la
creación y el uso de una cuenta de agencia, y la conexión a Nuova de las cuentas propias de una
agencia en Instagram, en una página de Facebook, de email, de WhatsApp o de su CRM.

**3. Qué tratamos, de dónde procede y para qué**

| Origen | Datos | Finalidad | Base jurídica |
|---|---|---|---|
| Visitas a la web | páginas visitadas, contadas sin cookies | entender el uso del sitio | ⟦ABOGADO C-05: interés legítimo propuesto⟧ |
| Cuadro de preguntas | tu pregunta, nuestra respuesta y, solo si los das: nombre, email, teléfono y la página desde la que preguntas | responderte; una persona te contacta si lo pides | ⟦ABOGADO C-05⟧ |
| Email a NuovaSolution | nombre y dirección del remitente, texto del mensaje | responderte | ⟦ABOGADO C-05: medidas precontractuales a petición tuya propuestas⟧ |
| WhatsApp a nuestro número | tu nombre y número tal como los muestra WhatsApp, tus mensajes | responderte y mantener tu solicitud en una sola ficha | ⟦ABOGADO C-05⟧ |
| Línea de voz, cuando se ofrezca | tu número, lo que dices en la llamada como transcripción y resumen, y la cita que pidas | atender la llamada y pasar la solicitud a una persona | ⟦ABOGADO C-05⟧ · ⟦DATO ABIERTO → Voice⟧ |
| Cuenta de agencia | nombre, email de trabajo, contraseña (guardada solo por nuestro proveedor de inicio de sesión de forma protegida), nombre de la agencia, idioma, miembros del equipo y sus roles, imágenes de marca y datos legales de la agencia | prestar el servicio que has contratado | ⟦ABOGADO C-05: contrato propuesto⟧ |
| Instagram o página de Facebook conectados (solo si una agencia los conecta) | identificadores de la página y de la cuenta de Instagram, comentarios y mensajes privados que la gente envía a esa cuenta, y las publicaciones que la agencia hace a través de Nuova | que la agencia responda comentarios y mensajes en su propia cuenta y publique sus propias publicaciones | ⟦ABOGADO C-05⟧ |
| Email o WhatsApp conectados de una agencia | consultas que llegan a Nuova por esa cuenta | responderlas en nombre de la agencia | tratamiento por cuenta de la agencia, ver 8 |

Usamos IA para entender los mensajes y redactar las respuestas. Ver el apartado 5.

No vendemos datos personales ni los usamos para publicidad.

**4. Respuestas automáticas y prioridad**
Las respuestas a las consultas las redacta un asistente de IA y se identifican como tales. Cada
consulta recibe una prioridad para que una persona sepa por dónde empezar. ⟦ABOGADO C-06⟧.

**5. Servicios de IA**
Los mensajes se tratan con modelos de IA para entenderlos y redactar las respuestas. Accedemos a
esos modelos a través de OpenRouter; los modelos los proporcionan OpenAI, Google y Anthropic. Las
notas de voz las transcribe OpenAI. ⟦DATO ABIERTO → Multimodal / Hosting⟧.

**6. Quién recibe los datos (proveedores)**
Supabase (base de datos, inicio de sesión y archivos; Fráncfort, Alemania), Hetzner (nuestros
servidores de automatización; Alemania), Meta (WhatsApp, Instagram y Facebook), Google (Gmail y
Google Sheets), OpenRouter, OpenAI, Google y Anthropic (IA), ElevenLabs y Telnyx (línea de voz,
cuando se ofrezca), Vercel (alojamiento de esta web), Cal.com (reserva de demo, si la usas) y el
CRM que una agencia decida conectar. Regiones: ⟦DATOS ABIERTOS, ver tabla EN⟧. Transferencias fuera
de la UE: ⟦ABOGADO C-07⟧.

**7. Cuánto tiempo guardamos los datos**
Los registros de ejecución de nuestra automatización, que pueden contener el contenido de los
mensajes, se borran a los 14 días. Las copias de seguridad de nuestros servidores se conservan unos
15 días. ⟦ABOGADO C-08 con DATO ABIERTO → API⟧.

**8. Si contactaste con una inmobiliaria que usa Nuova**
Esa agencia decide sobre tus datos y te lo explica en su propio aviso de privacidad. Tratamos tus
datos por su cuenta. Si nos escribes, le pasamos tu solicitud y le ayudamos a responderla.

**9. Tus derechos**
Puedes pedir acceso, rectificación, supresión, limitación y portabilidad, y oponerte al
tratamiento. Si el tratamiento se basa en tu consentimiento, puedes retirarlo en cualquier momento.
Escribe a antonio@nuovasolution.com. También puedes reclamar ante la Agencia Española de Protección
de Datos (aepd.es). Cómo pedir la eliminación se explica en nuestra página de eliminación de datos.

**10. Cambios**
Actualizaremos este aviso cuando cambie nuestro tratamiento. La fecha de arriba indica la versión
vigente.

### B.3 Notes for counsel on B

1. The Instagram and Facebook rows describe processing that **does not run yet**: no account is
   connected, no Meta webhook has ever been received (`SOCIAL_SYNC_0921_RETURN_v1.md`). They are
   written in the conditional ("only when an agency connects them") because Meta requires a
   published notice before review. Counsel decides whether conditional wording is acceptable or the
   rows must wait for launch.
2. "Replies … are identified as such" depends on an approved disclosure being active (§E). Today no
   approved text is active and prod renders an unapproved interim sentence. The sentence may only be
   published once §E is decided.
3. The voice row: a voice agent exists in prod and can be reached without authentication
   (`VOICE_SYNC_0921_RETURN_v1.md`), although voice is not offered to customers. Whether the notice
   must describe it now is question C-09.

---

## C. Terms of service — DRAFT – not legally reviewed

### C.1 English

**1. Scope.** These terms govern the use of nuovasolution.com and the trial of the Nuova service.
The terms for a paid package are agreed directly with the agency in a written contract.

**2. The service.** Nuova answers, qualifies and records enquiries for real estate agencies on the
channels an agency connects. Each module's page on this website states what is available today and
what is still being built. We do not promise any result, number of enquiries or sales.

**3. The trial.** The trial is free for fourteen days and requires no payment method. It does not
turn into a paid package on its own; a paid package needs your explicit agreement. The browser
never grants a trial, a plan or an extension; the service does.

**4. Your accounts on other platforms.** When you connect Instagram, a Facebook Page, WhatsApp, an
email account or a CRM, you confirm that you are allowed to connect it, and you remain bound by that
platform's own terms, including Meta's Platform Terms. You can disconnect at any time.

**5. Acceptable use.** You may not use Nuova to send unsolicited messages, to contact people who
have not contacted you or agreed to be contacted, or in breach of applicable communication rules.
Nuova replies to people who write to you; it does not start conversations on social platforms.

**6. AI generated replies.** Replies are written by an AI assistant under the rules your agency
sets and are identified as AI generated. Your agency remains responsible for the offers and
commitments it makes to its customers.

**7. Data protection.** For the personal data of your customers and staff, your agency is the
controller and NuovaSolution processes it on your behalf under a processing agreement ⟦COUNSEL
C-01⟧. Our own processing is described in our privacy notice.

**8. Liability.** ⟦COUNSEL C-10⟧

**9. Law and courts.** ⟦COUNSEL C-10⟧

**10. Changes.** We will publish changes on this page. The date at the top shows the current text.

### C.2 Español

**1. Alcance.** Estos términos regulan el uso de nuovasolution.com y la prueba del servicio Nuova.
Los términos de un paquete de pago se acuerdan directamente con la agencia en un contrato escrito.

**2. El servicio.** Nuova responde, cualifica y registra las consultas de las agencias inmobiliarias
en los canales que la agencia conecta. La página de cada módulo en esta web indica lo que está
disponible hoy y lo que todavía se está construyendo. No prometemos ningún resultado, número de
consultas ni ventas.

**3. La prueba.** La prueba es gratuita durante catorce días y no requiere ningún método de pago. No
se convierte por sí sola en un paquete de pago; un paquete de pago necesita tu acuerdo expreso. El
navegador nunca concede una prueba, un plan ni una ampliación; lo hace el servicio.

**4. Tus cuentas en otras plataformas.** Al conectar Instagram, una página de Facebook, WhatsApp, una
cuenta de email o un CRM, confirmas que estás autorizado a conectarla y sigues sujeto a los términos
de esa plataforma, incluidas las Condiciones de la Plataforma de Meta. Puedes desconectar en
cualquier momento.

**5. Uso aceptable.** No puedes usar Nuova para enviar mensajes no solicitados, para contactar con
personas que no te han contactado ni han aceptado ser contactadas, ni en contra de la normativa de
comunicación aplicable. Nuova responde a las personas que te escriben; no inicia conversaciones en
redes sociales.

**6. Respuestas generadas por IA.** Las respuestas las redacta un asistente de IA según las reglas
que fija tu agencia y se identifican como generadas por IA. Tu agencia sigue siendo responsable de
las ofertas y compromisos que hace a sus clientes.

**7. Protección de datos.** Para los datos personales de tus clientes y de tu equipo, tu agencia es
la responsable del tratamiento y NuovaSolution los trata por su cuenta según un contrato de encargo
⟦ABOGADO C-01⟧. Nuestro propio tratamiento se describe en nuestro aviso de privacidad.

**8. Responsabilidad.** ⟦ABOGADO C-10⟧

**9. Ley aplicable y tribunales.** ⟦ABOGADO C-10⟧

**10. Cambios.** Publicaremos los cambios en esta página. La fecha de arriba indica el texto vigente.

### C.3 Notes on C

- Clause 3 follows the owner's decision in force: free 14 day trial, no payment method
  (`CLAIMS_MATRIX.md` T-01, T-01b) and conversion only with explicit authorisation (export v2 §C1).
  **The +7 day extension is not in the terms** (owner decision D1 pending; T-03 LEGAL; no video
  pipeline). No price appears anywhere; no pricing authority exists.
- Clause 5, second sentence, states the designed social behaviour (reply only after the person
  writes first; `META_SCOPE_MATRIX_v5.md` Screencast B). It must stay true when social launches.

---

## D. Data deletion instructions page (Meta compatible) — DRAFT – not legally reviewed

Meta accepts an instructions URL until Facebook Login for Business is live; a deletion callback
(`signed_request`) does not exist yet and is only needed then (`SOCIAL_SYNC_0921_RETURN_v1.md` §6.2).
This page extends the text already on the rebuilt site (`lib/content/legal.ts`, from
`PRODUCT_TEXTS_C2_v1.md` §6.2) with the Meta specific part.

### D.1 English

**How to ask us to delete your data**
Write to antonio@nuovasolution.com from the address or number you used with us, and say what you
want: a copy of your data, a correction, or deletion.

**If you contacted an estate agency that uses Nuova**
That agency decides about your data. We pass your request to them and help them answer it.

**If you connected Instagram or a Facebook Page to Nuova**
1. In Nuova, disconnect the account in your agency settings. New comments and messages stop
   reaching Nuova.
2. You can also remove Nuova's access on the platform itself: in your Facebook or Instagram
   settings, open "Apps and websites" and remove Nuova.
3. To have the data Nuova received from that account deleted, write to antonio@nuovasolution.com
   with the name of the Page or Instagram account.

**Checking it is you**
We may ask you to confirm the request from the same email address, phone number or account, so
nobody else can ask for your data.

**What happens**
A person handles every request. We confirm receipt, then tell you the outcome, including anything we
have to keep by law and why. We answer within the period the law sets, which is normally one month.

**This page**
This page does not delete anything itself.

**Complaint**
You can also complain to the Spanish data protection authority (AEPD).

### D.2 Español

**Cómo pedirnos que eliminemos tus datos**
Escribe a antonio@nuovasolution.com desde la dirección o el número que usaste con nosotros e indica
qué quieres: una copia de tus datos, una corrección o la eliminación.

**Si contactaste con una inmobiliaria que usa Nuova**
Esa agencia decide sobre tus datos. Le pasamos tu solicitud y le ayudamos a responderla.

**Si conectaste Instagram o una página de Facebook a Nuova**
1. En Nuova, desconecta la cuenta en los ajustes de tu agencia. Los nuevos comentarios y mensajes
   dejan de llegar a Nuova.
2. También puedes quitar el acceso de Nuova en la propia plataforma: en los ajustes de Facebook o de
   Instagram, abre "Aplicaciones y sitios web" y elimina Nuova.
3. Para que se eliminen los datos que Nuova recibió de esa cuenta, escribe a antonio@nuovasolution.com
   con el nombre de la página o de la cuenta de Instagram.

**Comprobar que eres tú**
Podemos pedirte que confirmes la solicitud desde el mismo email, número de teléfono o cuenta, para
que nadie más pueda pedir tus datos.

**Qué pasa después**
Una persona gestiona cada solicitud. Confirmamos la recepción y después te comunicamos el resultado,
incluido lo que tengamos que conservar por ley y por qué. Respondemos dentro del plazo que marca la
ley, que normalmente es de un mes.

**Esta página**
Esta página no elimina nada por sí misma.

**Reclamación**
También puedes reclamar ante la Agencia Española de Protección de Datos (AEPD).

### D.3 Notes on D

- Deletion in prod is **manual** and not certified: no eraser is certified in prod, backups keep
  removed rows for about 15 days (`COUNSEL_TECHNIK_BRIEF_v1.md` §5; `MULTIMODAL_M3_PURGE_DSAR_RECORD_v1.md`).
  The page therefore promises a person and an outcome, not an automatic deletion. Question C-11.
- Step 1 of the Meta part ("disconnect in your agency settings") presupposes the disconnect control
  exists in the customer interface. It exists in staging (`sg_provider_revoke`) and not on the
  website yet. The page may be published before that only if step 1 is removed.
  ⟦OPEN FACT → Website Implementer / Social⟧

---

## E. AI disclosure texts

### E.1 What exists (verbatim, from `build/ai_disclosure/10_apply.sql`, confirmed in prod by the Audit on 2026-09-22)

| Version | Lang | Channel | Text | Status | active |
|---|---|---|---|---|---|
| `v1.0-es-2026-08` | es | email | Este mensaje ha sido generado por un asistente de inteligencia artificial de NuovaSolution. Si deseas atención personalizada con un agente humano, por favor indíquelo en su respuesta. | **APPROVED BY OWNER** 2026-08-05, ref `H6_FINAL_OWNER_APPROVAL_RECORD_v1`; counsel adequacy open | false |
| `v1.0-es-2026-08` | es | whatsapp | 🤖 Soy un asistente de inteligencia artificial. Te ayudaré con tu consulta inmobiliaria. Si prefieres hablar con un agente humano, indícamelo en cualquier momento. | **APPROVED BY OWNER** 2026-08-05 | false |
| `v1.0-es-2026-08` | es | form (also used for web) | Está siendo atendido por un asistente de inteligencia artificial. Si prefiere hablar con un agente humano, puede solicitarlo. | **APPROVED BY OWNER** 2026-08-05 | false |
| `v1.0-es-2026-08` | es | voice | none (NULL) | — | — |
| `v1.1-es-2026-09` | es | email | Le atiende el asistente digital de {{agency_legal_name}}, con la supervisión de nuestro equipo. Si prefiere hablar con una persona, indíquelo en su respuesta. | **PENDING COUNSEL** since 2026-09-02 | false |
| `v1.1-es-2026-09` | es | whatsapp | identical to v1.0 whatsapp | inherits v1.0 approval | false |
| `v1.1-es-2026-09` | es | form | identical to v1.0 form | inherits v1.0 approval | false |
| `v1.1-es-2026-09` | es | voice | none (NULL) | — | — |

**Where the approved v1.0 text is scoped:** Spanish only; the approved row carries email,
WhatsApp and form texts. The documented pilot scope for the disclosure is ES, NuovaSolution only,
WhatsApp plus email (`legal/LAWYER_REVIEW_MASTER_PACK_v1.md`); whether the approval record
`H6_FINAL_OWNER_APPROVAL_RECORD_v1` limits the approval to that pilot is not stated in the sources
read for this package ⟦OPEN FACT → API: quote the scope line of the approval record⟧. Using v1.0 for another agency would print
"de NuovaSolution" (vendor name) in that agency's email (defect DEF-DISCLOSURE-NUOVA-1); v1.1 was
written to fix that.

**Form of address as approved, kept as approved:** WhatsApp *tú*; form *usted*; email v1.0 mixes
*tú* ("deseas") and *usted* ("indíquelo … su"); email v1.1 *usted*. The translations below mirror
each channel's approved register. The mixed register of the v1.0 email is recorded for counsel's
information only; it is not reopened as an owner decision.

**Data defect for API:** v1.1 carries `legal_approved_by = "PENDING …"` but a filled
`legal_approved_at` (2026-09-06). A pending text must not carry an approval date.

### E.2 Equivalence drafts EN, DE, IT — DRAFT – not legally reviewed

Faithful equivalents of the Spanish sources, same meaning, same strength, same register. **None is
approved.** They exist so counsel reviews all languages in one pass and API can store them as
inactive rows (§E.5).

**v1.0 equivalents** (source approved by owner; equivalents not approved)

| Channel | en | de | it |
|---|---|---|---|
| email (formal) | This message was generated by an artificial intelligence assistant of NuovaSolution. If you would like personal attention from a human agent, please say so in your reply. | Diese Nachricht wurde von einem KI-Assistenten von NuovaSolution erstellt. Wenn Sie persönliche Betreuung durch eine menschliche Ansprechperson wünschen, teilen Sie uns das bitte in Ihrer Antwort mit. | Questo messaggio è stato generato da un assistente di intelligenza artificiale di NuovaSolution. Se desidera un'assistenza personale da parte di un agente umano, lo indichi nella sua risposta. |
| whatsapp (informal, as approved) | 🤖 I am an artificial intelligence assistant. I will help you with your property enquiry. If you would rather talk to a human agent, just tell me at any time. | 🤖 Ich bin ein KI-Assistent. Ich helfe dir bei deiner Immobilienanfrage. Wenn du lieber mit einer menschlichen Ansprechperson sprechen möchtest, sag es mir jederzeit. | 🤖 Sono un assistente di intelligenza artificiale. Ti aiuterò con la tua richiesta immobiliare. Se preferisci parlare con un agente umano, dimmelo in qualsiasi momento. |
| form (formal) | You are being assisted by an artificial intelligence assistant. If you would prefer to speak with a human agent, you can ask for one. | Sie werden von einem KI-Assistenten betreut. Wenn Sie lieber mit einer menschlichen Ansprechperson sprechen möchten, können Sie das jederzeit verlangen. | La sta assistendo un assistente di intelligenza artificiale. Se preferisce parlare con un agente umano, può richiederlo. |

**v1.1 equivalents** (source pending counsel; equivalents not approved). WhatsApp and form are
identical to v1.0 in the source, so their equivalents are the v1.0 rows above.

| Channel | en | de | it |
|---|---|---|---|
| email (formal) | You are being assisted by the digital assistant of {{agency_legal_name}}, supervised by our team. If you would prefer to speak with a person, please say so in your reply. | Sie werden vom digitalen Assistenten von {{agency_legal_name}} betreut, unter Aufsicht unseres Teams. Wenn Sie lieber mit einer Person sprechen möchten, teilen Sie uns das bitte in Ihrer Antwort mit. | La assiste l'assistente digitale di {{agency_legal_name}}, con la supervisione del nostro team. Se preferisce parlare con una persona, lo indichi nella sua risposta. |

Translation notes for counsel: "KI-Assistent" and "artificial intelligence assistant" are the plain
equivalents of "asistente de inteligencia artificial". In the v1.1 email, "digital assistant" is
kept because the source says "asistente digital"; whether "digital" discloses an AI system clearly
enough is the substantive question C-12, and it applies to all four languages at once. German
"menschliche Ansprechperson" is used for "agente humano" to avoid the gendered "Mitarbeiter".

### E.3 The interim sentence live in prod — NOT APPROVED

| es | en | de | it |
|---|---|---|---|
| Respuesta generada con asistencia de IA. | Reply generated with AI assistance. | Antwort mit KI-Unterstützung erstellt. | Risposta generata con l'assistenza dell'IA. |

Hard coded in renderer v2, rendered by prod Main since 2026-09-21 17:12Z whenever no active notice
exists, which today is always. **Not approved** (Audit ruling R2). It is also weaker than the
approved v1.0 (it drops "you can ask for a person"). Owner decision `DISCLOSURE_INTERIM_NON_ES`
decides whether it may stay for non Spanish replies; for Spanish it is replaced as soon as v1.0 is
activated.

### E.4 Behaviour when no approved text exists (to be agreed by API and Hosting)

Proposed binding behaviour, in line with Audit ruling R2 and the owner's instruction of 2026-09-22
(no silent fallback to an English private signature or an arbitrary interim text):

| Case | Behaviour |
|---|---|
| Approved and active text exists for the reply language and channel | render it |
| Reply language has **no** approved active text | **fail closed**: do not send an AI reply; hand the enquiry to a person; log `disclosure_missing` with language and channel. The interim sentence is used **only** if the owner writes `DISCLOSURE_INTERIM_NON_ES = YES`, and then every use carries the flag and is logged |
| Channel `voice` | never fall back to the email text; no voice text exists, so calls go to a person (current behaviour of the voice lane) |
| `{{agency_legal_name}}` resolves to empty | **fail closed** as above; never send "…asistente digital de , con…". Today `ai_disclosure_render` returns ok with an empty name; API must change that |
| Any unresolved `{{…}}` in the rendered text | fail closed, log `placeholder_unresolved` (Lead's `REPLY_CONTRACT_V2` criterion 9) |
| A text marked PENDING | never selected; the resolver already rejects `legal_approved_by` starting with PENDING, STAGING or TEST (rule R9) |

Owner decision `DISCLOSURE_LIVE_TEXT` (Audit recommendation, which this lane shares): activate
**v1.0-es now** for Spanish. Result: Spanish replies carry the approved text; every other language
fails closed or uses the interim sentence only under `DISCLOSURE_INTERIM_NON_ES = YES`.

### E.5 Rows for API (to be stored inactive)

```json
[
  {"notice_version":"v1.0-en-2026-09-draft","language":"en","active":false,"legal_approved_by":"PENDING — DRAFT equivalence of v1.0-es-2026-08, not legally reviewed","legal_approved_at":null,
   "text_email":"This message was generated by an artificial intelligence assistant of NuovaSolution. If you would like personal attention from a human agent, please say so in your reply.",
   "text_whatsapp":"🤖 I am an artificial intelligence assistant. I will help you with your property enquiry. If you would rather talk to a human agent, just tell me at any time.",
   "text_form":"You are being assisted by an artificial intelligence assistant. If you would prefer to speak with a human agent, you can ask for one.","text_voice":null},
  {"notice_version":"v1.0-de-2026-09-draft","language":"de","active":false,"legal_approved_by":"PENDING — DRAFT equivalence of v1.0-es-2026-08, not legally reviewed","legal_approved_at":null,
   "text_email":"Diese Nachricht wurde von einem KI-Assistenten von NuovaSolution erstellt. Wenn Sie persönliche Betreuung durch eine menschliche Ansprechperson wünschen, teilen Sie uns das bitte in Ihrer Antwort mit.",
   "text_whatsapp":"🤖 Ich bin ein KI-Assistent. Ich helfe dir bei deiner Immobilienanfrage. Wenn du lieber mit einer menschlichen Ansprechperson sprechen möchtest, sag es mir jederzeit.",
   "text_form":"Sie werden von einem KI-Assistenten betreut. Wenn Sie lieber mit einer menschlichen Ansprechperson sprechen möchten, können Sie das jederzeit verlangen.","text_voice":null},
  {"notice_version":"v1.0-it-2026-09-draft","language":"it","active":false,"legal_approved_by":"PENDING — DRAFT equivalence of v1.0-es-2026-08, not legally reviewed","legal_approved_at":null,
   "text_email":"Questo messaggio è stato generato da un assistente di intelligenza artificiale di NuovaSolution. Se desidera un'assistenza personale da parte di un agente umano, lo indichi nella sua risposta.",
   "text_whatsapp":"🤖 Sono un assistente di intelligenza artificiale. Ti aiuterò con la tua richiesta immobiliare. Se preferisci parlare con un agente umano, dimmelo in qualsiasi momento.",
   "text_form":"La sta assistendo un assistente di intelligenza artificiale. Se preferisce parlare con un agente umano, può richiederlo.","text_voice":null},
  {"notice_version":"v1.1-en-2026-09-draft","language":"en","active":false,"legal_approved_by":"PENDING — DRAFT equivalence of v1.1-es-2026-09, not legally reviewed","legal_approved_at":null,
   "text_email":"You are being assisted by the digital assistant of {{agency_legal_name}}, supervised by our team. If you would prefer to speak with a person, please say so in your reply.",
   "text_whatsapp":"🤖 I am an artificial intelligence assistant. I will help you with your property enquiry. If you would rather talk to a human agent, just tell me at any time.",
   "text_form":"You are being assisted by an artificial intelligence assistant. If you would prefer to speak with a human agent, you can ask for one.","text_voice":null},
  {"notice_version":"v1.1-de-2026-09-draft","language":"de","active":false,"legal_approved_by":"PENDING — DRAFT equivalence of v1.1-es-2026-09, not legally reviewed","legal_approved_at":null,
   "text_email":"Sie werden vom digitalen Assistenten von {{agency_legal_name}} betreut, unter Aufsicht unseres Teams. Wenn Sie lieber mit einer Person sprechen möchten, teilen Sie uns das bitte in Ihrer Antwort mit.",
   "text_whatsapp":"🤖 Ich bin ein KI-Assistent. Ich helfe dir bei deiner Immobilienanfrage. Wenn du lieber mit einer menschlichen Ansprechperson sprechen möchtest, sag es mir jederzeit.",
   "text_form":"Sie werden von einem KI-Assistenten betreut. Wenn Sie lieber mit einer menschlichen Ansprechperson sprechen möchten, können Sie das jederzeit verlangen.","text_voice":null},
  {"notice_version":"v1.1-it-2026-09-draft","language":"it","active":false,"legal_approved_by":"PENDING — DRAFT equivalence of v1.1-es-2026-09, not legally reviewed","legal_approved_at":null,
   "text_email":"La assiste l'assistente digitale di {{agency_legal_name}}, con la supervisione del nostro team. Se preferisce parlare con una persona, lo indichi nella sua risposta.",
   "text_whatsapp":"🤖 Sono un assistente di intelligenza artificiale. Ti aiuterò con la tua richiesta immobiliare. Se preferisci parlare con un agente umano, dimmelo in qualsiasi momento.",
   "text_form":"La sta assistendo un assistente di intelligenza artificiale. Se preferisce parlare con un agente umano, può richiederlo.","text_voice":null}
]
```

Version ids with the suffix `-draft` are proposals; API chooses the final id scheme. All rows are
`active:false`; the `PENDING` prefix keeps the resolver from selecting them.

### E.6 Spoken Spanish disclosure (voice) — separate item, no approved text exists

`text_voice` is NULL in every row; without an approved spoken text the voice lane routes calls to a
person (`VOICE_DISCLOSURE_REQUIREMENTS_v1.md`). The spoken opening differs from written text: it is
heard once, cannot be re-read, and precedes everything else in the call. No register has been
approved for voice, so choosing one here does not reopen an approved decision.

**Drafts for counsel — DRAFT – not legally reviewed**

| Option | es (usted) | Length |
|---|---|---|
| V1, with human option | Hola, le atiende el asistente de inteligencia artificial de {{agency_legal_name}}. Está hablando con un sistema automático, no con una persona. Si prefiere hablar con una persona, dígalo en cualquier momento. | about 9 s |
| V2, short | Hola, le atiende el asistente de inteligencia artificial de {{agency_legal_name}}, un sistema automático. ¿En qué puedo ayudarle? | about 5 s |

Source of the structure: `legal/launch_docs/AI_DISCLOSURE_NOTICE_v1.md` ("Estás hablando con un
sistema automatizado, no con una persona"), set in *usted* for a first call with an unknown caller.
Question C-13: may the "ask for a person" clause be dropped (V2)? If a call is recorded or
transcribed, the consent text is separate and not drafted here (C-14).

---

## F. Question box texts — DRAFT – not legally reviewed

Shipped on the rebuilt site in stub mode; prod has no question box backend (`web_qa_*` absent).

| Key | en | es |
|---|---|---|
| storage | Your question and our answer are stored so we can answer it ⟦and improve our replies⟧. If you leave contact details, we use them only to reply to you. Read the privacy notice. | Guardamos tu pregunta y nuestra respuesta para poder contestarla ⟦y mejorar nuestras respuestas⟧. Si dejas datos de contacto, solo los usamos para responderte. Lee el aviso de privacidad. |
| ai | Answers are written by an AI assistant from what NuovaSolution has confirmed about its product. | Las respuestas las redacta un asistente de IA a partir de lo que NuovaSolution ha confirmado sobre su producto. |

The bracketed clause stays only if API confirms answers are used that way (§J, API-4). The web
channel reuses the form disclosure in staging; whether the website needs its own disclosure text is
C-15.

---

## G. Notice before connecting a data source — DRAFT – not legally reviewed

The full text (short layer, detail layer, per source values, implementation rules, rejected
sentences) is `CONNECT_NOTICE_DRAFT_v1.md` §A, unchanged except for these corrections:

1. "Who processes it" now lists the same providers as §B.1 section 6, including Anthropic, Telnyx
   (voice only) and Cal.com (website only, not a data source).
2. Prod has an **inert** `contacts` table since 2026-09-21; it changes nothing in the notice.
3. The notice is shown only where a connection can actually be made; today no external CRM can be
   connected and no Meta account either.

---

## H. Technical facts counsel can rely on

| Fact | Source |
|---|---|
| Prod database Supabase `eu-central-1` Frankfurt; staging Ireland | `COUNSEL_TECHNIK_BRIEF_v1.md` §2 |
| Automation on NuovaSolution's own server, Hetzner, Germany | brief §3 |
| n8n prod execution records deleted after 336 h (14 days); nightly encrypted dumps about 15 days on the same host, no off site copy | `MULTIMODAL_M3_PURGE_DSAR_RECORD_v1.md` l.112 to 122 |
| Supabase point in time recovery off; backup retention not readable | brief §4 |
| AI via OpenRouter: `openai/gpt-4.1-mini` (replies), `google/gemini-2.5-flash-lite` (classification), `openai/gpt-4o` (images and documents), `anthropic/claude-haiku-4-5` (property image analysis); OpenAI `whisper-1` direct (voice notes) | `FINAL_CORE_MODEL_PIN_AND_FREEZE_CONDITIONS_v1.md`, `PROVIDER_DEPENDENCY_REGISTRY_v1.md` |
| Zero retention or no training settings for AI providers: not documented | Meta research 2026-09-22 |
| Follow up messages: none are sent in prod; a follow up is allowed only with channel specific consent | brief §6; `LEAD_SYNC_0921_RETURN_v1.md` §5 |
| No approved AI disclosure active in prod; unapproved interim sentence rendered since 2026-09-21 17:12Z | Audit read 2026-09-22 |
| Deletion in prod manual, no certified eraser | brief §5 |
| Instagram and Facebook: nothing connected, no webhook ever received, nothing submitted to Meta | `SOCIAL_SYNC_0921_RETURN_v1.md` |
| A public voice agent in prod can create a confirmed booking without calendar authority; containment awaits owner decision `VOICE_BOOK_SCOPE_REVOKE`; call recording is off | `VOICE_SYNC_0921_RETURN_v1.md`; Audit read 2026-09-22 |
| Branding images are stored publicly readable so email programs can show them | `ONB_BRANDING_ASSET_UPLOAD_v1.sql` |

---

## I. Questions for counsel (legal only)

Each question names the text it concerns. Answer format: `COUNSEL_DECISION_IMPORT_SCHEMA_v1.json`
in the system repo.

| ID | Question | Text |
|---|---|---|
| C-01 | Confirm roles: agency controller and NuovaSolution processor for leads and staff; NuovaSolution controller for its own account, contract and billing data | §A, §B.1 s.8, §C.1 s.7 |
| C-02 | Role of NuovaSolution for people writing to the central WhatsApp number, today (own tenant) and if agencies are served through it | §A last row |
| C-03 | Sub processor list: must the models behind OpenRouter be named individually | §B.1 s.5 and s.6 |
| C-04 | May the Instagram and Facebook rows be published in the conditional before launch, as Meta requires a notice at review | §B.1 s.3, note B.3.1 |
| C-05 | Legal basis per row (proposals in the table) | §B.1 s.3 |
| C-06 | Is the priority given to each enquiry profiling that requires more information or a right to object in the notice | §B.1 s.4 |
| C-07 | Transfer wording for providers outside the EU | §B.1 s.6 |
| C-08 | Retention per category, and which billing period applies (5 years per the offboarding contract, 6 years per C.Com art. 30 in the privacy template) | §B.1 s.7 |
| C-09 | Must the notice describe the voice agent now, given it is reachable in prod but not offered | §B.1 s.3 voice row, note B.3.3 |
| C-10 | Liability, applicable law and courts clauses | §C clauses 8 and 9 |
| C-11 | Is the deletion page adequate while deletion is manual and backups keep data about 15 days | §D, note D.3 |
| C-12 | Does "asistente digital" (v1.1 email) disclose an AI system clearly enough under AI Act Art. 50, or must it say "inteligencia artificial" as v1.0 does; answer applies to EN, DE, IT | §E.1, §E.2 |
| C-13 | Voice opening: V1 or V2; may the human option be dropped from the spoken text | §E.6 |
| C-14 | Consent text if calls are ever recorded or transcribed | §E.6 |
| C-15 | Does the website question box need its own disclosure, or does the form text suffice | §F |
| C-16 | Confirm the approved v1.0 EN, DE, IT equivalents and the v1.1 equivalents once C-12 is decided | §E.2 |
| C-17 | Pre connection notice: acknowledgement rather than consent; wording of the control | §G, `CONNECT_NOTICE_DRAFT_v1.md` §A.4 |
| C-18 | OAuth scope breadth for external CRMs before any is released (Zoho `modules.ALL`, Pipedrive full scopes) | `CONNECT_NOTICE_DRAFT_v1.md` §A.3 |
| C-19 | Public trial extension against an honest review (+7 days): incentivised review rules (L-13) | owner decision D1 |

**Withdrawn from the previous package:** D4 (*usted* vs *tú* for WhatsApp). The approved form of
address stays as approved.

## J. Open technical facts, by responsible lane (not counsel)

| ID | Lane | Fact needed | Unblocks |
|---|---|---|---|
| API-1 | API | Retention figures actually implemented per category; Supabase backup retention | §B s.7, C-08 |
| API-2 | API | Make `ai_disclosure_render` fail closed on an empty `{{agency_legal_name}}`, add a voice branch that never falls back to email, null `legal_approved_at` on v1.1 | §E.4 |
| API-3 | API | Store the §E.5 rows inactive; confirm the version id scheme | §E.5 |
| API-4 | API | Are question box answers used to improve replies; how long are they kept | §F |
| API-5 | API | Are `legal_name` and `brand_display_name` set for the NuovaSolution tenant in prod | §E.4 |
| API-6 | API | Store the app scoped Meta `user_id` at connect time; deletion callback plan | §D |
| HOS-1 | Hosting | Switch Main to `rpc/ai_disclosure_render` (R2); implement the §E.4 table; does a prod WhatsApp reply carry any disclosure today | §E.3, §E.4 |
| MM-1 | Multimodal | OpenRouter data policy and training exclusion; Whisper under zero retention; regions | §B s.5 and s.6 |
| VOI-1 | Voice | ElevenLabs and Telnyx retention, deletion API, regions; whether any voice line will be offered publicly at publication | §B voice row, C-09 |
| SOC-1 | Social | Meta processing regions; the disconnect control in the customer UI | §B s.6, §D step 1 |
| WEB-1 | Website Reviewer / Implementer | Vercel region and data; whether Cal.com is used | §B s.6 |

## K. Owner decisions in this package

| Decision | Recommendation |
|---|---|
| `DISCLOSURE_LIVE_TEXT` | activate v1.0-es now (Audit recommendation) |
| `DISCLOSURE_INTERIM_NON_ES` | NO: non Spanish replies fail closed and go to a person until an equivalent is approved. Choose YES only if unanswered foreign language enquiries are the greater risk |
| D1 trial extension | keep the extension out of public texts until C-19 and the video pipeline are resolved (already implemented this way) |
| Controller block | the legal person used for Meta business verification (Social D1) decides the `⟦controller block⟧` |
