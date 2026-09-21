# PRODUCT TEXTS C2 v1 — ready for the Website Implementer

**State:** `2026-09-21_SYNC_1215Z` · **Written:** 2026-09-21
**Lane:** Website Copy / Product Truth / Director
**Status:** DRAFT by its author. **Not independently reviewed.** Truth and UX: Website Reviewer.
Strings touching personal data (§5.4, §6) additionally need counsel; they are marked.

> Every string here is written to match **contracted or implemented behaviour**, not to promise a
> missing function. Where the backend has not contracted a state, the text is still supplied so
> the Implementer is never blocked, and the row says which contract field it waits for. House
> rules hold: no dashes in customer strings, no invented numbers, no guaranteed outcomes, `tú` in
> Spanish.

**Contract sources** (system repo `governance/` unless marked): `CRM_ONBOARDING_DROPDOWN_CONTRACT_v1.md`
(staging read 2026-09-15), `WEBSITE_INTEGRATION_HANDOFF_v1.md` §4, `CRM_CALLBACK_AUTH_BOTH_GENERATIONS_BUILD_HANDOFF_v1.md`,
`CRM_CALLBACK_CLASSIFICATION_AND_TRANSPORT_AUTH_FINAL_v1.md`, `build/onboarding/ONB_BRANDING_ASSET_UPLOAD_v1.sql`,
`build/onboarding/ONB_BRANDING_LEGAL_FIELDS_v1.sql`, `ONBOARDING_FORM_FINAL_v1.md`,
`build/onboarding/ONB_ACTIVATION_GATES_LEGAL_STAFF_v1.sql`, `WEBSITE_QA_INGRESS_CONTRACT_v1.md`,
`WEBSITE_QA_RESPONSE_CONTRACT_v1.md`, `legal/launch_docs/DATA_SUBJECT_REQUEST_PROCEDURE_v1.md`.

**Not yet delivered:** `governance/WEBSITE_HANDOFF_v1.md` (API, signal `WEBSITE_HANDOFF_READY`).
Where it lands and differs from the sources above, it wins and this file is updated.

---

## 1. CRM choice in onboarding (step 7)

### 1.1 What the backend actually offers

From `crm_provider_catalog()` (staging). **Prod has none of these functions yet.**

| Catalogue entry | State | Effect of choosing it |
|---|---|---|
| Nuova CRM (included) | available, default | `crm_mode='nuovasolution'`. Step 7 is `completed` with no further action. Never blocks activation |
| Google Sheets | available | Nuova CRM stays the CRM of record; a Sheets projection is switched on |
| HubSpot, Pipedrive, Zoho CRM, Salesforce | `coming_soon`, not selectable for connection | Only records interest (`crm_interest`). Nothing is synced |
| GoHighLevel, Microsoft Dynamics | `unavailable` | Not offered |
| Anything else | not in the catalogue | Stays on Nuova CRM |

### 1.2 Strings

| Key | EN | ES |
|---|---|---|
| `crm.heading` | Where your leads are kept | Dónde se guardan tus leads |
| `crm.lead` | A CRM is included. Most agencies start with it and never need another one. | Hay un CRM incluido. La mayoría de las agencias empiezan con él y no necesitan otro. |
| `crm.option.native.title` | **No external CRM. Use the CRM included in Nuova.** | **Sin CRM externo. Usa el CRM incluido en Nuova.** |
| `crm.option.native.tag` | Included · Recommended | Incluido · Recomendado |
| `crm.option.native.body` | Every enquiry becomes a lead with the person's contact details, what they are looking for, their qualification and priority, and the conversation so far. Viewing requests become tasks for your team. Nothing to connect and nothing to pay extra. | Cada consulta se convierte en un lead con los datos de contacto de la persona, lo que busca, su cualificación y prioridad, y la conversación hasta ahora. Las peticiones de visita pasan a ser tareas para tu equipo. No hay que conectar nada ni pagar nada más. |
| `crm.option.native.limits` | It is not a replacement for an accounting or transaction system, and it does not import records from another CRM. | No sustituye a un sistema contable o de gestión de operaciones, y no importa fichas de otro CRM. |
| `crm.option.sheets.title` | Also keep a copy in Google Sheets | Guardar también una copia en Google Sheets |
| `crm.option.sheets.body` | Nuova stays the place where leads are kept. A Google Sheet receives a copy you can open, filter and share. | Nuova sigue siendo el sitio donde se guardan los leads. Una hoja de Google Sheets recibe una copia que puedes abrir, filtrar y compartir. |
| `crm.option.external.group` | Your own CRM | Tu propio CRM |
| `crm.option.external.soon` | Coming soon | Próximamente |
| `crm.option.external.body` | Connecting {provider} is not offered yet. Choose it to tell us you want it. You stay on the included CRM meanwhile, and nothing is sent to {provider}. | La conexión con {provider} todavía no se ofrece. Elígelo para decirnos que la quieres. Mientras tanto sigues con el CRM incluido y no se envía nada a {provider}. |
| `crm.interest.saved` | Noted. We will tell you when {provider} can be connected. | Anotado. Te avisaremos cuando se pueda conectar {provider}. |
| `crm.option.unavailable` | Not offered | No disponible |
| `crm.option.other` | My CRM is not listed | Mi CRM no aparece |
| `crm.option.other.body` | That CRM is not offered. You are on the CRM included in Nuova, and you can change this later. | Ese CRM no se ofrece. Estás en el CRM incluido en Nuova, y puedes cambiarlo más adelante. |
| `crm.done` | Using the CRM included in Nuova. | Usando el CRM incluido en Nuova. |

**Two truth notes for the Implementer.**

1. `crm.option.native.body` describes the lead record the backend writes today in prod (`leads`,
   `lead_memory`, `dg_task`) and the richer staging `contacts` layer. **It deliberately does not
   promise a CRM screen**, because none exists in prod. If the Reviewer finds a CRM view in the
   customer tree before launch, a line may be added: EN "You see every lead in one list." ES "Ves
   todos los leads en una sola lista."
2. Vendor names render as plain text only after owner decision D2 in
   `WEBSITE_CLAIM_REGISTER_v1.md` §4. No logos in any case.

---

## 2. External CRM connection: start, return, errors

**Today no external CRM can be connected** (§1.1). These strings are for the day a provider is
released. They are written now so the flow is not blocked on copy.

### 2.1 Start

| Key | EN | ES |
|---|---|---|
| `connect.start.title` | Connect {provider} | Conectar {provider} |
| `connect.start.body` | You will be sent to {provider} to sign in and approve access. Use the {provider} account your agency works in. Nuova never sees your {provider} password. | Te llevamos a {provider} para iniciar sesión y aprobar el acceso. Usa la cuenta de {provider} con la que trabaja tu agencia. Nuova nunca ve tu contraseña de {provider}. |
| `connect.start.notice` | Before you connect, read what is shared and why. | Antes de conectar, lee qué se comparte y para qué. |
| `connect.start.cta` | Continue to {provider} | Continuar a {provider} |
| `connect.start.salesforce.env` | Which Salesforce do you use? | ¿Qué Salesforce usas? |
| `connect.start.salesforce.prod` | My live Salesforce | Mi Salesforce real |
| `connect.start.salesforce.sandbox` | A Salesforce sandbox | Un sandbox de Salesforce |
| `connect.start.redirecting` | Taking you to {provider} | Te llevamos a {provider} |
| `connect.start.link_expired` | This link is no longer valid. Start the connection again from the CRM step. | Este enlace ya no es válido. Vuelve a empezar la conexión desde el paso del CRM. |

`connect.start.notice` links to the pre connection notice in `CONNECT_NOTICE_DRAFT_v1.md`.

### 2.2 Return and every outcome

| Outcome | Backend source | EN | ES |
|---|---|---|---|
| Connected | `status=connected` | {provider} is connected. New leads will also reach {provider}. | {provider} está conectado. Los nuevos leads también llegarán a {provider}. |
| Waiting on provider | `202 externally_pending`, `status=pending` | Sent. {provider} has not confirmed it yet. Nothing more for you to do right now. You stay on the included CRM until it does. | Enviado. {provider} todavía no lo ha confirmado. Por ahora no tienes que hacer nada más. Sigues con el CRM incluido hasta entonces. |
| Link or session expired | `state_expired` (10 minute window) | The connection took too long and timed out. Nothing has changed. Start it again when you are ready. | La conexión tardó demasiado y caducó. No ha cambiado nada. Vuelve a empezar cuando quieras. |
| Wrong agency or account | `state_mismatch` | This connection belongs to a different agency account or setup. Nothing has changed. Start again from your own CRM step. | Esta conexión pertenece a otra cuenta de agencia u otra configuración. No ha cambiado nada. Vuelve a empezar desde tu propio paso del CRM. |
| Already used or unknown | `state_replay`, `state_invalid` | This connection link was already used or is not valid. Nothing has changed. Start again from the CRM step. | Este enlace de conexión ya se usó o no es válido. No ha cambiado nada. Vuelve a empezar desde el paso del CRM. |
| Cancelled by you | **not contracted** (needs API: mapping of the provider's cancel return) | You cancelled the connection. Nothing has changed. | Has cancelado la conexión. No ha cambiado nada. |
| Access denied | **not contracted** (needs API: `error=access_denied`) | Access was not approved in {provider}, so nothing was connected. If that was a mistake, try again and approve access. | No se aprobó el acceso en {provider}, así que no se ha conectado nada. Si fue un error, inténtalo otra vez y aprueba el acceso. |
| Signed in to the wrong {provider} account | **not contracted** (needs API) | You signed in to a different {provider} account than expected. Nothing was connected. Sign out of {provider} and try again with your agency's account. | Has iniciado sesión con otra cuenta de {provider} distinta de la esperada. No se ha conectado nada. Cierra sesión en {provider} e inténtalo otra vez con la cuenta de tu agencia. |
| Provider error | `400` sanitised provider error | {provider} could not complete the connection. Nothing has changed. You can try again. | {provider} no pudo completar la conexión. No ha cambiado nada. Puedes intentarlo otra vez. |
| Degraded | `424 degraded`, health `degraded` | Connected, but something changed on {provider}'s side. It still works. Worth a look. | Conectado, pero algo ha cambiado en {provider}. Sigue funcionando. Conviene revisarlo. |
| Action required | health `action_required` | Something changed in {provider} and the connection has stopped working properly. Leads are still kept in Nuova. | Algo ha cambiado en {provider} y la conexión ha dejado de funcionar bien. Los leads se siguen guardando en Nuova. |
| Disconnected or revoked | `status=revoked` | {provider} is disconnected. Your leads stay in Nuova. Records already sent to {provider} stay there. | {provider} está desconectado. Tus leads siguen en Nuova. Las fichas ya enviadas a {provider} se quedan allí. |
| Token refresh failed | `status=refresh_failed` | We lost access to {provider}. Reconnect it to continue. Your leads stay in Nuova meanwhile. | Hemos perdido el acceso a {provider}. Vuelve a conectarlo para continuar. Mientras tanto tus leads siguen en Nuova. |
| Unknown outcome | anything else | We could not confirm the connection. Nothing has been marked as connected. Try again or contact us. | No hemos podido confirmar la conexión. No se ha marcado nada como conectado. Inténtalo otra vez o contacta con nosotros. |

**Rules the strings depend on.** An unknown outcome never renders as success. `externally_pending`
never renders as done. "Nothing has changed" is used only where the contract guarantees it; the
three "not contracted" rows keep it on the assumption that no authorisation row is written before
the provider approves, **which API must confirm** (question Q-API-2 in §8).

### 2.3 Disconnect

| Key | EN | ES |
|---|---|---|
| `disconnect.confirm.title` | Disconnect {provider}? | ¿Desconectar {provider}? |
| `disconnect.confirm.body` | New leads will stop reaching {provider}. Everything stays in Nuova. Records already in {provider} stay there; Nuova does not delete them. | Los nuevos leads dejarán de llegar a {provider}. Todo sigue en Nuova. Las fichas que ya están en {provider} se quedan allí; Nuova no las borra. |
| `disconnect.cta` | Disconnect | Desconectar |
| `disconnect.done` | Disconnected. You are back on the CRM included in Nuova. | Desconectado. Vuelves a usar el CRM incluido en Nuova. |

Source: dropdown contract §5 ("revoked, built in continues, nothing is deleted in Nuova").

---

## 3. Branding upload (step 3), including logos on dark backgrounds

### 3.1 Contract facts the strings rely on

Kinds `logo` and `email_banner`. PNG, JPEG, WebP or GIF, no SVG. Up to 5 MB. Logo 48 to 1024 px,
aspect 0.2 to 5.0, shown at most 180 px wide in email. Banner 600 × 120 to 1600 × 480, aspect 2
to 6. Needs the `manage_users` permission. An invalid or missing asset is simply left out of the
email, never shown broken. The bucket is public read, because email clients must load the image.
**Light and dark logo variants, a "needs a light background" flag and a text fallback are demanded
of API and Hosting but not built** (dispatch PROMPT_01 A9, PROMPT_04 H2). Prod today sends one
black logo with no dark mode protection (F6).

### 3.2 Strings

| Key | EN | ES |
|---|---|---|
| `branding.lead` | Your logo and email banner go on the emails your agency sends through Nuova. | Tu logo y el banner de email aparecen en los emails que tu agencia envía a través de Nuova. |
| `branding.logo.help` | Use a PNG with a transparent background, at least 48 pixels on each side. In emails it is shown up to 180 pixels wide. | Usa un PNG con fondo transparente, de al menos 48 píxeles por lado. En los emails se muestra con un ancho máximo de 180 píxeles. |
| `branding.logo.dark.help` | Many people read email in dark mode. A dark logo on a transparent background can disappear there. Check the preview on both backgrounds below. | Mucha gente lee el email en modo oscuro. Un logo oscuro sobre fondo transparente puede desaparecer ahí. Revisa la vista previa sobre los dos fondos de abajo. |
| `branding.preview.light` | On a light background | Sobre fondo claro |
| `branding.preview.dark` | On a dark background | Sobre fondo oscuro |
| `branding.variant.darkLogo` *(when variants ship)* | Logo for dark backgrounds (optional) | Logo para fondos oscuros (opcional) |
| `branding.variant.darkLogo.help` *(when variants ship)* | A light version of your logo. We use it where the background is dark. | Una versión clara de tu logo. La usamos donde el fondo es oscuro. |
| `branding.variant.needsLight` *(when variants ship)* | My logo only works on a light background | Mi logo solo funciona sobre fondo claro |
| `branding.variant.needsLight.help` *(when variants ship)* | We then place it on a light panel so it stays readable in dark mode. | Entonces lo colocamos sobre un panel claro para que se lea en modo oscuro. |
| `branding.textFallback` *(when shipped)* | If no logo is set, your agency name is shown in text instead. | Si no hay logo, se muestra el nombre de tu agencia en texto. |
| `branding.untouched` | We never recolour, crop or redraw your logo. If something looks wrong, upload a different file. | Nunca cambiamos el color, recortamos ni redibujamos tu logo. Si algo no se ve bien, sube otro archivo. |
| `branding.banner.help` | A wide image between 600 × 120 and 1600 × 480 pixels, about four times as wide as it is tall. | Una imagen ancha de entre 600 × 120 y 1600 × 480 píxeles, unas cuatro veces más ancha que alta. |
| `branding.public` *(counsel item C-Q9)* | Images you upload here are stored so that email programs can display them, which means anyone with the image link can open them. Do not upload anything confidential. | Las imágenes que subes aquí se guardan para que los programas de email puedan mostrarlas, así que cualquiera con el enlace de la imagen puede abrirlas. No subas nada confidencial. |
| `branding.saved` | Saved. This is how it will look. | Guardado. Así es como se verá. |

**Interim until variants exist.** Show both previews and `branding.logo.dark.help`. Do **not**
render the variant controls: a control that saves nothing is a dead surface.

**Errors** (backend codes):

| Code | EN | ES |
|---|---|---|
| `UNSUPPORTED_FILE_TYPE` / `unsupported_file_type` | That file type is not accepted. Use PNG, JPEG, WebP or GIF. | Ese tipo de archivo no se acepta. Usa PNG, JPEG, WebP o GIF. |
| `FILE_TOO_LARGE` / `file_too_large` | That file is larger than 5 MB. Use a smaller one. | Ese archivo supera los 5 MB. Usa uno más pequeño. |
| `INVALID_FILE_SIZE` | That file could not be read. Try exporting it again. | No se pudo leer ese archivo. Prueba a exportarlo de nuevo. |
| `width_too_small` / `height_too_small` | The image is too small. The logo needs at least 48 pixels on each side. | La imagen es demasiado pequeña. El logo necesita al menos 48 píxeles por lado. |
| `width_too_large` / `height_too_large` | The image is larger than needed. Use one up to 1024 pixels on its longest side. | La imagen es más grande de lo necesario. Usa una de hasta 1024 píxeles en su lado más largo. |
| `aspect_out_of_range` (logo) | This shape will not fit the email header. Use a logo that is not extremely tall or extremely wide. | Esta forma no encaja en la cabecera del email. Usa un logo que no sea extremadamente alto ni extremadamente ancho. |
| `aspect_out_of_range` (banner) | A banner needs to be wide: roughly two to six times as wide as it is tall. | Un banner tiene que ser ancho: entre dos y seis veces más ancho que alto, aproximadamente. |
| `FORBIDDEN_MANAGE_BRANDING` | Only a team member who manages users can change the branding. Ask your agency admin. | Solo un miembro del equipo que gestiona usuarios puede cambiar la marca. Pídeselo a tu administrador de la agencia. |
| `UPLOAD_NOT_FOUND` | The upload did not arrive. Try once more. | La subida no ha llegado. Inténtalo otra vez. |
| `CROSS_TENANT_ASSET` | That file cannot be used here. Upload it again from this account. | Ese archivo no se puede usar aquí. Súbelo otra vez desde esta cuenta. |

---

## 4. Readiness, waiting and error states (step 10)

### 4.1 Gate names in plain language

From `tenant_activation_readiness`. Mandatory gates block going live; optional ones never do.

| Gate | Mandatory | EN title | ES title |
|---|---|---|---|
| `agency_tenant` | yes | Your agency account | La cuenta de tu agencia |
| `owner_admin` | yes | An admin for your agency | Un administrador para tu agencia |
| `staff_provisioned` | yes | Your team | Tu equipo |
| `plan_entitlements` | yes | Your plan | Tu plan |
| `white_label_legal` | yes | Your legal details and branding | Tus datos legales y tu marca |
| `whatsapp` | yes | WhatsApp | WhatsApp |
| `ai_disclosure` | yes | The notice that tells your customers an assistant is replying | El aviso que indica a tus clientes que responde un asistente |
| `business_hours` | yes | Your opening hours | Tu horario |
| `routing_mode` | yes | Who receives which enquiries | Quién recibe cada consulta |
| `test_scenarios` | yes | A test run before going live | Una prueba antes de salir en vivo |
| `launch_approval` | yes | Final approval to go live | Aprobación final para salir en vivo |
| `gmail` | no | Gmail | Gmail |
| `crm_connection` | no | An external CRM | Un CRM externo |
| `google_sheets` | no | Google Sheets | Google Sheets |
| `voice_provider`, `voice_transport` | no | Voice | Voz |
| `paid_acquisition` | no | Lead ads | Anuncios de captación |
| `property_feed` | no | Property feed | Feed de propiedades |
| `property_matching` | no | Property matching | Property matching |
| `property_experience` | no | Property Experience 3D | Property Experience 3D |

`white_label_legal` detail line. EN: "Legal name, tax number (CIF or NIF), address, logo, and links
to your own privacy notice and terms." ES: "Razón social, CIF o NIF, dirección, logo y enlaces a tu
propio aviso de privacidad y tus términos."

### 4.2 Gate states

| State | EN | ES |
|---|---|---|
| `READY` | Done | Hecho |
| `BLOCKED` | Still needed | Todavía necesario |
| `OPTIONAL` | Optional, never blocks going live | Opcional, nunca impide salir en vivo |
| `DISABLED` | Switched off for this account | Desactivado en esta cuenta |
| `UNSUPPORTED_GATE` | We cannot check this one yet. It does not block you. | Esto todavía no lo podemos comprobar. No te bloquea. |

`UNSUPPORTED_GATE` "does not block you" follows the readiness output, which reports it separately
from `blocked_mandatory`; API must confirm it is never counted as blocking (Q-API-6).

### 4.3 Summary lines

| Key | EN | ES |
|---|---|---|
| `ready.yes` | Everything needed is in place. Your agency can go live. | Todo lo necesario está listo. Tu agencia puede salir en vivo. |
| `ready.no` | A few things are still needed before you go live. | Todavía faltan algunas cosas antes de salir en vivo. |
| `ready.waitingOnUs` | Some of this is waiting on us, not on you. We will tell you when it clears. | Parte de esto depende de nosotros, no de ti. Te avisaremos cuando se resuelva. |
| `ready.goLive.note` | Going live is done by Nuova once every step is ready. The button sends the request. | La salida en vivo la realiza Nuova cuando todos los pasos están listos. El botón envía la solicitud. |
| `ready.error` | We could not load your readiness right now. Nothing has changed. Try again in a moment. | No hemos podido cargar tu estado ahora mismo. No ha cambiado nada. Inténtalo de nuevo en un momento. |

### 4.4 The gate that currently blocks every agency

`ai_disclosure` is mandatory and **counsel pending** (E-GATE). Until it clears no agency can go
live. The customer must be told this is on our side:

| Key | EN | ES |
|---|---|---|
| `gate.ai_disclosure.pending` | Waiting on us. We are finalising the notice that tells your customers when an assistant is replying. You do not need to do anything. | Depende de nosotros. Estamos terminando el aviso que indica a tus clientes cuándo responde un asistente. No tienes que hacer nada. |

The provider waiting strings (`externally_pending`, "Waiting on {provider}") are already in the
dictionaries and match the contract. Fallback when `MF-11` provider names are missing: "the
provider" / "el proveedor".

---

## 5. Website Q&A widget

### 5.1 Facts

Staging only; the answer step is simulated; prod has nothing (E-QA). States `answered`,
`pending`, `handoff`, `failed`. Question 1 to 4000 characters. Optional name, email, phone.
Stored in `web_qa_answers`. The only rate limit is the website's own (10 per minute per IP).
**No Q&A specific answer boundary list exists in the backend.** The boundaries below are
therefore a website rule the backend answer must also respect; API or Hosting must confirm the
responder enforces them (Q-API-8).

### 5.2 Strings

| Key | EN | ES |
|---|---|---|
| `qa.intro` | Questions about what Nuova does and whether it fits your agency. | Preguntas sobre qué hace Nuova y si encaja con tu agencia. |
| `qa.boundaries` | It does not quote prices, give legal or tax advice, or commit NuovaSolution to anything. For those, a person answers. | No da precios, ni asesoramiento legal o fiscal, ni compromete a NuovaSolution a nada. Para eso responde una persona. |
| `qa.ai` *(counsel item C-Q7)* | Answers are written by an AI assistant from what NuovaSolution has confirmed about its product. | Las respuestas las redacta un asistente de IA a partir de lo que NuovaSolution ha confirmado sobre su producto. |
| `qa.pending` | Reading your question | Leyendo tu pregunta |
| `qa.slow` | Still working on it. | Seguimos con ello. |
| `qa.handoff` | A person on our team will answer this one. Leave an email if you want the answer sent to you. | Esta la responderá una persona de nuestro equipo. Deja un email si quieres que te enviemos la respuesta. |
| `qa.failed` | That did not go through. Try once more, or contact a person. | No se ha enviado. Inténtalo otra vez o contacta con una persona. |
| `qa.cannotConfirm` | We cannot confirm that from here. A person can. | No podemos confirmarlo desde aquí. Una persona sí puede. |
| `qa.tooLong` | Please keep it under 4000 characters. A few sentences is plenty. | Por favor, menos de 4000 caracteres. Con unas frases basta. |
| `qa.rateLimited` | Too many questions in a short time. Wait a minute and try again. | Demasiadas preguntas en poco tiempo. Espera un minuto e inténtalo otra vez. |
| `qa.contact.optional` | Name, email or phone (optional). Only needed if you want a person to reply to you. | Nombre, email o teléfono (opcional). Solo si quieres que te responda una persona. |

### 5.3 Stub mode

The existing behaviour (always "cannot confirm", human contact path) stays. A visible stub label
**does not help** a visitor here; the "cannot confirm" answer is already honest. No label needed.

### 5.4 Replacement for the current storage sentence (counsel item C-Q7)

The current line "Nothing you type here is stored with a client record" is misleading (register
WCR-164). Replacement:

| EN | ES |
|---|---|
| Your question and our answer are stored so we can answer it and improve our replies. If you leave contact details, we use them only to reply to you. Read the privacy notice. | Guardamos tu pregunta y nuestra respuesta para poder contestarla y mejorar nuestras respuestas. Si dejas datos de contacto, solo los usamos para responderte. Lee el aviso de privacidad. |

"Improve our replies" must be removed if counsel or the owner confirms the answers are **not**
used that way; the retention period is added once one exists (Q-API-9).

---

## 6. Data subject requests (DSAR) — counsel review required for the whole section

### 6.1 Facts

No executable DSAR endpoint exists. The procedure document is PREPARE ONLY. Erasers exist in
staging; deletion in prod is **not certified**. Requests today are received by a person by email.
The response period is legally set, not a product choice, and its wording is counsel's.

### 6.2 Data deletion page, replacement text

| Section | EN | ES |
|---|---|---|
| Heading | Your data, and how to ask about it | Tus datos, y cómo preguntar por ellos |
| Who to write to | Write to antonio@nuovasolution.com from the address you used with us. Say what you are asking for: a copy of your data, a correction, or deletion. | Escribe a antonio@nuovasolution.com desde la dirección que usaste con nosotros. Indica qué pides: una copia de tus datos, una corrección o la eliminación. |
| If you dealt with an agency | If you contacted an estate agency that uses Nuova, that agency decides about your data. We pass your request to them and help them answer it. | Si contactaste con una inmobiliaria que usa Nuova, es esa agencia quien decide sobre tus datos. Le pasamos tu solicitud y le ayudamos a responderla. |
| Checking it is you | We may ask you to confirm the request from the same email address or phone number, so nobody else can ask for your data. | Podemos pedirte que confirmes la solicitud desde el mismo email o teléfono, para que nadie más pueda pedir tus datos. |
| What happens | A person handles every request. We confirm receipt, then tell you the outcome, including anything we have to keep by law and why. | Una persona gestiona cada solicitud. Confirmamos la recepción y después te comunicamos el resultado, incluido lo que tengamos que conservar por ley y por qué. |
| Timing *(counsel)* | We answer within the period the law sets, which is normally one month. | Respondemos dentro del plazo que marca la ley, que normalmente es de un mes. |
| This page | This page does not delete anything itself. | Esta página no elimina nada por sí misma. |
| Complaint | You can also complain to the Spanish data protection authority (AEPD). | También puedes reclamar ante la Agencia Española de Protección de Datos (AEPD). |

The "If you dealt with an agency" paragraph rests on the **proposed** role split (agency
controller, NuovaSolution processor), which is RECHTLICH_OFFEN in `COUNSEL_TECHNIK_BRIEF_v1.md`
§1. It is included because leaving it out would tell a lead that NuovaSolution decides about
their data, which is the opposite of the proposal. Counsel item C-Q1.

### 6.3 In product (for agencies, when the DSAR authority is wired)

| Key | EN | ES |
|---|---|---|
| `dsar.received` | Request received. A person is handling it. | Solicitud recibida. Una persona la está gestionando. |
| `dsar.done.deleted` | Deleted. | Eliminado. |
| `dsar.done.anonymized` | Anonymised: the person can no longer be identified. | Anonimizado: ya no se puede identificar a la persona. |
| `dsar.done.retained` | Kept, because {basis} requires it. It is restricted and used for nothing else. | Conservado, porque {basis} lo exige. Está restringido y no se usa para nada más. |
| `dsar.done.open` | Not finished yet. We are still waiting on {store}. | Todavía no ha terminado. Seguimos esperando a {store}. |

These follow the draft outcome set `deleted / anonymized / retained under named basis / open
residual`. `open` is shown as open; it is never rounded up to done.

---

## 7. Stub, sandbox and live marking

Governing rule from the owner: a test or stub label only where it helps the person using the
page.

| Mode | Who sees it | Label | EN | ES | Why |
|---|---|---|---|---|---|
| **Stub** (default build, local data) | anyone on a form or account surface | persistent top band on signup, login, onboarding, trial status, packages | **Demonstration only.** Nothing you enter creates a real account or reaches anyone. | **Solo demostración.** Nada de lo que introduzcas crea una cuenta real ni llega a nadie. | Without it a visitor would believe they signed up |
| **Stub** | marketing pages | **none** | n/a | n/a | No action there depends on the mode; a band would only add noise |
| **Sandbox** (staging) | owner, testers, reviewer | persistent top band on every page | **Test environment.** Accounts and data here are for testing and may be reset. | **Entorno de pruebas.** Las cuentas y los datos de aquí son de prueba y pueden borrarse. | Testers must never mistake staging for the real product |
| **Sandbox** | every outgoing message or email generated from it | subject or first line prefix | `[TEST]` | `[TEST]` | The Audit already requires `[TEST]` on injected test alerts (`PRECHECK-HANDOFF-NEG-1`) |
| **Live** | customers | **none** | n/a | n/a | A "live" badge tells a customer nothing useful |
| **Live** | internal, owner | small footer marker, optional | Live | En vivo | Implementer's call; not customer copy |

The existing `stubNotice` strings in the dictionaries may be replaced by the stub band above, or
kept alongside it on forms. Do not show both on the same line.

---

## 8. Questions for API (and Hosting where noted)

| ID | Question | Blocks |
|---|---|---|
| Q-API-1 | When does `WEBSITE_HANDOFF_v1.md` ship, and which contracts in it are staging, prod or draft? | All of §2, §3 variants, §6.3 |
| Q-API-2 | Exact callback outcome codes for user cancelled, `access_denied`, wrong provider account and provider 5xx; is any authorisation row written before approval; where does the BFF send the browser afterwards? | §2.2 three "not contracted" rows |
| Q-API-3 | Is `expired` a real authorisation status or does it map to `refresh_failed` or `revoked`? | §2.2 |
| Q-API-4 | Schema, RPC and error codes for logo variants: dark variant, `needs_light_background`, SVG yes or no, which field holds the text fallback name | §3 variant strings |
| Q-API-5 | Is the public read `agency-branding` bucket intended long term? | `branding.public`, counsel C-Q9 |
| Q-API-6 | Is `UNSUPPORTED_GATE` ever counted as blocking? | §4.2 |
| Q-API-7 | Does prod provision `pipeline_stages`, scoring weights and follow up templates, or only `leads` and `lead_memory`? Is any CRM list view planned for the customer tree before launch? | §1.2 note 1 |
| Q-API-8 (Hosting) | Will the Q&A responder enforce topic boundaries (no prices, no legal or tax advice, no commitments)? Does the web disclosure differ from the form disclosure? | §5.2 |
| Q-API-9 | Retention of `web_qa_answers`, and whether answers are used to improve replies | §5.4 |
| Q-API-10 | DSAR intake endpoint, verification method per channel, controller forwarding flow | §6.3 |
