# CONNECT NOTICE DRAFT v1 — notice before a data or CRM connection, and the counsel package

> **2026-09-22:** §A (the notice itself) stays valid, with the corrections in
> `COUNSEL_PACKAGE_v1.md` §G. §B (privacy additions) and §C (counsel questions) are **superseded** by
> the consolidated `COUNSEL_PACKAGE_v1.md`; question numbers there are new (C-01 to C-19).

> # DRAFT – not legally reviewed
> Prepared by the Website Copy / Product Truth lane as a **template for counsel**. It states what
> the system technically does, as far as it is documented. It is not legal advice, not an approved
> text and not a compliance statement. Nothing in it may be published or shown to an agency as
> final until counsel has reviewed it and the owner has released it.

**State:** `2026-09-21_SYNC_1215Z` · **Written:** 2026-09-21
**For:** counsel (legal review) · Website Implementer (placement, acknowledgement logic, logging,
dispatch W4) · Website Reviewer (truth and UX) · API (open facts)
**Builds on, does not replace:** the pre connect draft in
`governance/CRM_ONBOARDING_DROPDOWN_CONTRACT_v1.md` §6 and `governance/COUNSEL_TECHNIK_BRIEF_v1.md`
(14.09.2026). Every fact below carries its source. **Nothing is estimated.** Where a fact is
unknown, the text carries a marked slot `⟦…⟧` and the rule in §A.4 applies.

---

## A. The notice shown before a connection

### A.1 When it is shown

Before the agency connects any of: its email mailbox, WhatsApp, a Google Sheet, an external CRM.
Today only the first two exist in prod for NuovaSolution's own tenant, Google Sheets per agency is
staging only, and **no external CRM can be connected** (`CRM_ONBOARDING_DROPDOWN_CONTRACT_v1.md`
§1: `coming_soon`, sync fenced). The CRM variant is written now so it is ready when a provider is
released.

Reader: the person setting up the agency (the agency is the proposed controller for its leads'
data; see §C.1). Register: `tú`, as on the rest of the website. The API draft uses `usted`; either
is acceptable for a business reader, consistency with the site decides.

### A.2 Short layer (always visible above the connect button)

**EN**

> **Before you connect {source}**
>
> Connecting {source} lets Nuova do its job for your agency: read the enquiries that arrive there,
> answer them, qualify them and keep them as leads. To do that, Nuova processes the messages and
> the details people send you, including with AI services that understand the message and draft
> the reply.
>
> Nuova uses this data to provide the service to your agency, not to sell it or to advertise to
> anyone. You can disconnect at any time.
>
> [What is shared, who processes it and how long it is kept]

**ES**

> **Antes de conectar {source}**
>
> Al conectar {source}, Nuova puede hacer su trabajo para tu agencia: leer las consultas que llegan
> ahí, responderlas, cualificarlas y guardarlas como leads. Para ello, Nuova trata los mensajes y los
> datos que te envían las personas, también con servicios de inteligencia artificial que entienden
> el mensaje y redactan la respuesta.
>
> Nuova usa estos datos para prestar el servicio a tu agencia, no para venderlos ni para hacer
> publicidad a nadie. Puedes desconectar en cualquier momento.
>
> [Qué se comparte, quién lo trata y cuánto tiempo se guarda]

Why each sentence is there, and what it avoids:

| Sentence | Basis | Deliberately not said |
|---|---|---|
| "read the enquiries … answer … qualify … keep as leads" | E-GM, E-WA: intake, reply, `leads`/`lead_memory` rows in prod | "reads your whole inbox", which is neither claimed nor denied until API answers Q-API-C1 |
| "processes the messages … including with AI services" | Message Agent and classifiers run on hosted models (`COUNSEL_TECHNIK_BRIEF_v1.md` §3: OpenRouter / OpenAI) | **"We do not use your data"**, which is false, because processing the data is the service |
| "not to sell it or to advertise to anyone" | Existing privacy notice "We do not sell your data"; no advertising use in any record | "never used for AI training", which is **not documented** (Q-API-C4) |
| "You can disconnect at any time" | Dropdown contract §5 | "and everything is deleted", which is false (§A.3 row 6) |

### A.3 Detail layer (one click away, same screen)

**EN**

| Heading | Text |
|---|---|
| What is shared | From {source}: {data_by_source}. Plus what Nuova creates from it: the qualification and priority of each lead, the conversation history, and tasks such as a viewing request. |
| What it is used for | Answering enquiries on your agency's behalf, qualifying and prioritising them, keeping each customer as one record, and creating tasks for your team. Follow up messages are sent only where the person has given permission for that channel. |
| AI | Messages are processed by AI models to understand them and draft replies: ⟦model providers in prod, Q-API-C3⟧, reached through OpenRouter. ⟦Whether providers may retain or train on the content, Q-API-C4⟧. Each customer is told that an assistant is replying. |
| Who processes it | NuovaSolution, and the service providers it uses to run Nuova: Supabase (database, in Frankfurt, Germany), Hetzner (servers in Germany), {source_provider}, and the AI providers above. ⟦Complete sub processor list, counsel item C-Q3⟧ |
| How long it is kept | ⟦Retention per data category, counsel item C-Q4⟧ |
| Disconnecting | {disconnect_by_source} |
| Your customers' rights | People whose enquiries you receive can ask for a copy of their data, a correction or deletion. Nuova helps your agency answer those requests. |

**ES**

| Encabezado | Texto |
|---|---|
| Qué se comparte | De {source}: {data_by_source}. Además, lo que Nuova genera a partir de ello: la cualificación y la prioridad de cada lead, el historial de conversación y tareas como una petición de visita. |
| Para qué se usa | Para responder a las consultas en nombre de tu agencia, cualificarlas y priorizarlas, mantener a cada cliente como una sola ficha y crear tareas para tu equipo. Los mensajes de seguimiento solo se envían cuando la persona ha dado su permiso para ese canal. |
| IA | Los mensajes se tratan con modelos de inteligencia artificial para entenderlos y redactar las respuestas: ⟦proveedores de modelos en producción, Q-API-C3⟧, a través de OpenRouter. ⟦Si los proveedores pueden conservar el contenido o entrenar con él, Q-API-C4⟧. A cada cliente se le indica que responde un asistente. |
| Quién lo trata | NuovaSolution y los proveedores que usa para prestar Nuova: Supabase (base de datos, en Fráncfort, Alemania), Hetzner (servidores en Alemania), {source_provider} y los proveedores de IA indicados. ⟦Lista completa de subencargados, punto C-Q3 para el abogado⟧ |
| Cuánto tiempo se guarda | ⟦Plazo de conservación por categoría de datos, punto C-Q4 para el abogado⟧ |
| Desconectar | {disconnect_by_source} |
| Derechos de tus clientes | Las personas cuyas consultas recibes pueden pedir una copia de sus datos, una corrección o su eliminación. Nuova ayuda a tu agencia a responder a esas solicitudes. |

**Per source values**

| {source} | {data_by_source} EN / ES | {source_provider} | {disconnect_by_source} EN / ES | Basis |
|---|---|---|---|---|
| Email | the enquiry emails that reach Nuova, with sender name, address, message text and ⟦attachments, Q-API-C1⟧ / los emails de consulta que llegan a Nuova, con nombre y dirección del remitente, el texto y ⟦adjuntos, Q-API-C1⟧ | Google (Gmail) | ⟦What stops and what is kept, Q-API-C2⟧ | Gmail intake in prod (E-GM); attachments not processed in prod (media plane absent) |
| WhatsApp | messages sent to your WhatsApp line, with the sender's name and phone number / los mensajes enviados a tu línea de WhatsApp, con el nombre y el teléfono de quien escribe | Meta (WhatsApp Business) | ⟦Q-API-C2⟧ | E-WA |
| Google Sheets | a copy of each lead: contact details, what they are looking for, qualification and status / una copia de cada lead: datos de contacto, lo que busca, cualificación y estado | Google (Sheets) | New leads stop going to the sheet. Everything stays in Nuova, and the sheet keeps what it already has. / Los nuevos leads dejan de llegar a la hoja. Todo sigue en Nuova y la hoja conserva lo que ya tiene. | Dropdown contract §1: Sheets is a projection; Nuova remains the record |
| External CRM | your leads as contacts and deals in {provider}, plus reading existing {provider} contacts to avoid duplicates, with the permissions you approve in {provider} / tus leads como contactos y operaciones en {provider}, además de la lectura de los contactos existentes en {provider} para evitar duplicados, con los permisos que apruebes en {provider} | {provider} | New leads stop reaching {provider}. Everything stays in Nuova. Records already in {provider} stay there; Nuova does not delete them. / Los nuevos leads dejan de llegar a {provider}. Todo sigue en Nuova. Las fichas que ya están en {provider} se quedan allí; Nuova no las borra. | Dropdown contract §2 and §5 |

### A.4 Rules for the Implementer

1. **No slot `⟦…⟧` may render.** A connection whose notice still contains an unresolved slot stays
   in its existing honest pending state. This is the mechanism that keeps the notice true without
   inventing a retention period or a provider.
2. The short layer sits **above** the connect button, not behind it. The detail layer is one click
   away on the same screen, never a separate document the user must find.
3. **Acknowledgement, not consent.** The agency is connecting its own data sources to its own
   processor; the proposed basis is the agency's instruction under the processing agreement, not
   consent (`COUNSEL_TECHNIK_BRIEF_v1.md` §1, RECHTLICH_OFFEN). Control label, pending counsel C-Q2:
   EN "I have read what is shared and why. Connect {source}." ES "He leído qué se comparte y para
   qué. Conectar {source}."
4. Log per API contract: tenant, user, source, notice version identifier, UTC time. The notice
   version is a fixed identifier such as `connect-notice-v1-draft`, so later text changes are
   traceable.
5. No logos of {provider}; text names only, subject to owner decision D2 in
   `WEBSITE_CLAIM_REGISTER_v1.md`.

### A.5 Sentences considered and rejected

| Rejected | Why |
|---|---|
| "We do not use your data." / "No usamos tus datos." | False. Processing the data is the service. Explicitly forbidden by the owner |
| "Your data is never used to train AI." | Not documented anywhere (Q-API-C4) |
| "Disconnecting deletes your data." | False for every source: Nuova keeps its records; provider side records stay |
| "Data is stored securely / encrypted / GDPR compliant." | `CLAIMS_MATRIX.md` B-15, X-08: rejected in every form |
| "Real time synchronisation." | Not contracted; the CRM sync is fenced |
| "Your data stays in the EU." | Supabase and n8n are in Germany, but AI providers reached through OpenRouter are not documented as EU only |

---

## B. Website privacy notice: draft additions for counsel

The public privacy notice (`lib/content/legal.ts`, PLACEHOLDER) says providers "will be listed
here after legal review". These drafts cover **the website itself** and the account creation that
the rebuilt site prepares. Processing inside an agency's environment belongs in the processing
agreement with that agency.

| Section | Draft EN | Draft ES | Status of the facts |
|---|---|---|---|
| What this notice covers | This website, the question box, the contact channels, and creating an agency account for the trial. | Este sitio web, el cuadro de preguntas, los canales de contacto y la creación de una cuenta de agencia para la prueba. | as today |
| Data from the question box | Your question and our answer. Name, email and phone only if you choose to give them. | Tu pregunta y nuestra respuesta. Nombre, email y teléfono solo si decides darlos. | `WEBSITE_QA_INGRESS_CONTRACT_v1.md`; store `web_qa_answers`; **staging only** |
| Data for an agency account | Your name, work email, a password (stored only in protected form by our sign in provider), your agency's name and your language. | Tu nombre, tu email de trabajo, una contraseña (guardada solo de forma protegida por nuestro proveedor de inicio de sesión), el nombre de tu agencia y tu idioma. | signup contract; Supabase Auth. "Protected form" is deliberately not "encrypted" (B-15) |
| AI in the question box | Answers are written by an AI assistant. ⟦model providers, Q-API-C3⟧ | Las respuestas las redacta un asistente de IA. ⟦proveedores, Q-API-C3⟧ | answer path simulated in staging |
| Service providers | Supabase (database and sign in, Frankfurt), Hetzner (servers, Germany), ⟦Vercel for the website, region Q-API-C6⟧, ⟦AI providers⟧. | Supabase (base de datos e inicio de sesión, Fráncfort), Hetzner (servidores, Alemania), ⟦Vercel para la web, región Q-API-C6⟧, ⟦proveedores de IA⟧. | brief §3; Vercel data handling UNKNOWN |
| Analytics | ⟦confirm against the deployed build, Reviewer R2⟧ | ⟦idem⟧ | the current sentence "cookieless page view analytics" is unverified for the deployed version |
| Retention | ⟦per category, C-Q4⟧ | ⟦C-Q4⟧ | conflicting sources, see §C.2 |

---

## C. Counsel package

Bundled so counsel receives reviewable drafts and technical facts, not a general request for
"approval". Each item names the draft, the fact it rests on, and the decision needed. Format for
answers: `COUNSEL_DECISION_IMPORT_SCHEMA_v1.json` in the system repo, as the brief requests.

### C.1 Decisions requested

| ID | Decision | Draft to review | Technical facts |
|---|---|---|---|
| C-Q1 | Confirm roles: agency controller for lead data, NuovaSolution processor; NuovaSolution controller for its own account and billing data | §A (entire), `PRODUCT_TEXTS_C2_v1.md` §6.2 "If you dealt with an agency" | brief §1 (RECHTLICH_OFFEN) |
| C-Q2 | Is an acknowledgement (instruction) the right mechanism before connecting, or is consent needed from anyone? Wording of the control | §A.4 rule 3 | the agency connects its own mailbox, WhatsApp line, sheet or CRM |
| C-Q3 | Sub processor list to disclose, and whether the AI providers behind OpenRouter must be named individually | §A.3 "Who processes it", §B | brief §3 plus facts **missing from the brief**: Google models via OpenRouter (staging pins `google/gemini-2.5-flash-lite` for classification, `openai/gpt-4.1-mini` for replies; prod pins unconfirmed), OpenAI Whisper for media (staging), Stripe named in the checkout contract, Microsoft only if connected, the retired n8n Cloud which may still hold personal data |
| C-Q4 | Retention per category. **The sources conflict**: statutory billing retention 5 years (brief §4, offboarding contract) against 6 years accounting and 4 years invoices (`legal/launch_docs/DATA_SUBJECT_REQUEST_PROCEDURE_v1.md` §6.2); operational data deleted 30 days after the end of the agreement (brief) against 0 days at termination (`OFFBOARDING_DATA_CONTRACT_v1.md` §6) | §A.3 "How long", §B | prod n8n execution logs pruned after 14 days, nightly dumps rotated at 14 days on the same host (`MULTIMODAL_M3_PURGE_DSAR_RECORD_v1.md`); Supabase backups unreadable, point in time recovery off |
| C-Q5 | Legal basis wording on the website privacy notice ("your consent when you contact us") | `lib/content/legal.ts` privacy "Legal basis" | contact form, question box, account creation |
| C-Q6 | Disconnect wording: is it enough to say records already sent to an external CRM stay there, and who must erase them on a data subject request | §A.3 per source table | two phase CRM erasure is already an open question (SP-Q2) |
| C-Q7 | Question box: AI disclosure sentence and storage sentence | `PRODUCT_TEXTS_C2_v1.md` §5.2 `qa.ai`, §5.4 | web channel reuses the form disclosure today (brief §7) |
| C-Q8 | AI disclosure in customer messages: ES master v1.1, Option 1 or 2, EN, DE and IT equivalents, WhatsApp register, placement | `SIGNATURE_COPY_READY_v1.md` Part B | only the Spanish row exists; the mandatory onboarding gate `ai_disclosure` blocks every agency until this is decided |
| C-Q9 | Branding images are stored publicly readable so email clients can show them: disclose, and is the wording right | `PRODUCT_TEXTS_C2_v1.md` §3.2 `branding.public` | bucket `agency-branding` is public read (`ONB_BRANDING_ASSET_UPLOAD_v1.sql`); **not in the brief** |
| C-Q10 | Data subject request page: roles paragraph, verification, "normally one month" | `PRODUCT_TEXTS_C2_v1.md` §6.2 | no DSAR endpoint; prod deletion not certified |
| C-Q11 | Public trial extension (+7 after an approved review): L-13 incentivised review | `WEBSITE_CLAIM_REGISTER_v1.md` §4 D1 | backend mechanism exists; video pipeline does not |
| C-Q12 | OAuth scope breadth for external CRMs (Zoho `modules.ALL`, Pipedrive full scopes) before any provider is released: proportionate? | §A.3 CRM row | `CRM_ONBOARDING_DROPDOWN_CONTRACT_v1.md` §2; scopes differ from `CRM_NATIVE_ADAPTER_LAYER_v1.md` §2 |

### C.2 What the existing counsel brief does not yet contain

To be added by its owner, the API lane, or read by counsel from here: the model providers behind
OpenRouter and the model pins; OpenAI Whisper for media and whether zero data retention is enabled
(recommended, not verified); the n8n 14 day prune and backup rotation (documented elsewhere, UNKNOWN
in the brief); the public branding bucket; Stripe, Microsoft and the retired n8n Cloud; the question
box contact fields; the effect of disconnecting a CRM or a channel; the data subject request
intake, verification and period.

### C.3 What is not asked of counsel

Pure language corrections that change no legal meaning are not sent as new legal projects: the
signature and role line (`SIGNATURE_COPY_READY_v1.md` Part A), readiness and connection status
strings, branding help, error messages. They go to the Reviewer for truth and UX only.

---

## D. Questions for API

| ID | Question | Unblocks |
|---|---|---|
| Q-API-C1 | Which emails does the Gmail intake read: every message in the connected mailbox, or only those passing the intake gate? Are attachments stored or passed to a model in prod? | {data_by_source} for email |
| Q-API-C2 | What happens to stored leads, tokens and queued work when an agency disconnects Gmail or WhatsApp outside offboarding? | {disconnect_by_source} for channels |
| Q-API-C3 | Which models and providers does **prod** Main use today? | the AI row |
| Q-API-C4 | Are zero data retention or no training settings enabled for the OpenRouter and OpenAI accounts? | the AI row; A.5 |
| Q-API-C5 | Which retention figures are authoritative (C-Q4 conflicts), and what are the Supabase backup retention and point in time recovery settings for prod? | retention slots |
| Q-API-C6 | What data does the Vercel deployment process, in which region? | §B |
| Q-API-C7 | Is the acknowledgement log (§A.4 rule 4) a new table or an existing one such as `consent_ledger`, and what is the write RPC? | Implementer W4 |
