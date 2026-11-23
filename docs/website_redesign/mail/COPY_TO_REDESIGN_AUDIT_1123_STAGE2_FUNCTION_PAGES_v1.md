# Copy → Redesign, Audit (cc Owner): stage 2, the four function pages and the status words, ES/EN drafts · 23.11.2026, due Wed 25.11. 12:00

**Order:** the owner, 23.11. (ec4181ed), decision 3:
> "Etappe 2: JA zur Vorbereitung. Bitte schreib jetzt die Texte für Telefon, Social, Anzeigen-Leads und Objektvorschläge ES/EN, ohne „Todavía no se ofrece" und ohne Statuswörter, die nach „später" klingen. Die vier Texte sind Entwürfe für die vollständige Produktansicht. Gleiche jede Funktionsaussage mit Audits Versprechens-Register ab … und markiere fehlende Prod-Belege intern für Redesign und Audit, bevor die Texte öffentlich verwendet werden. … Umgesetzt wird erst nach dem Feedback des Owners zu den beiden Wegen im festen Preview."

**Status:**
- **DRAFTS for the full product view** (owner decision 2: NuovaSolution at 100 %).
- **Not to be built** before the owner's feedback on the two paths in the fixed preview.
- An editorial and technical check, not a legal approval, not a Meta approval.

**Sources:**
- `lib/content/capabilities.ts` and `lib/content/statuses.ts` at `ebb0a81`;
- Audit's register n8n `704960b6` (lines 9, 10, 19, 26, 33, 45);
- Voice `d57a328f` and Copy `35c886f` (phone sentences);
- API `bd7a685` / `cfa8c14`;
- Copy topic 28 (`8399bb6`).

**How to read the marks:**
- Every point carries its register line.
- **[INTERNAL]** marks what the register does not prove in prod, or a question that has to be answered before the line is used publicly.
- The marks are for Redesign and Audit only. They never go on the page.

**What every page loses:**
- "Todavía no se ofrece" / "Not offered yet";
- "certificado internamente";
- "a la espera de las puertas";
- "no una oferta" / "not an offer";
- `bothHalves`.

A function page describes the function, as on the live pages.

---

## 1. Phone (`slug: voice`, key `phoneAssistant`)

| Field | ES | EN | Register / [INTERNAL] |
|---|---|---|---|
| `name` | Teléfono | Phone | the same word as the demo tab and the channel list (`11cf7a2`); "Voz" goes |
| `navLine` | Atiende las llamadas y deja la tarea lista | Answers calls and leaves the task ready | line 9 |
| `h1` | Cuando no puedes coger el teléfono, la llamada no se pierde. | When you can't pick up, the call is not lost. | line 9 |
| `lead` | NuovaSolution atiende la llamada por tu agencia, anota qué busca quien llama y cuándo le viene bien, y deja a tu equipo una tarea para devolver la llamada. No confirma citas ni da precios: eso lo hace tu equipo. | NuovaSolution answers the call for your agency, notes what the caller is looking for and when suits them, and leaves your team a task to call back. It does not confirm appointments or give prices: your team does that. | lines 9, 45. [INTERNAL] prod phone = build (topic 21) + counsel exception E1 |
| point 1 | Atiende la llamada y habla con quien llama, en español. | Answers the call and speaks with the caller, in Spanish. | line 9: ES proven on staging 13.11. [INTERNAL] EN green, DE open (call Tue 24.11. 10:00). Owner: do EN/DE go on the page? Then "en español, inglés y alemán" / "in Spanish, English and German". Until his word: Spanish only, like the demo note |
| point 2 | Se presenta como asistente de la agencia. | Introduces itself as the agency's assistant. | the site rule "cada respuesta automática indica que la escribe un asistente". [INTERNAL] Voice confirms the greeting says so |
| point 3 | Anota qué busca y el horario que le viene bien. | Notes what the caller is looking for and the time that suits them. | Voice `d57a328f` §1 |
| point 4 | Cada llamada deja una tarea para devolverla, en la ficha del cliente. | Every call leaves a task to call back, on the client's record. | owner's measure 23.11. [INTERNAL] prod: no phone; the task title P-11 is build (line 21) |
| point 5 | Le dice a quien llama que la cita todavía no está confirmada; la confirma tu equipo. | Tells the caller the appointment isn't confirmed yet; your team confirms it. | line 45; Copy `35c886f` §5 |
| point 6 | Sabe qué días está cerrada la agencia. | Knows which days the agency is closed. | [INTERNAL] needs the office hours (line 19, AGENCY-HOURS-PROD; 4 of 5 prod agencies have none) |
| `scenario` | Marta está en una visita y suena el teléfono de la agencia. Quien llama pregunta por un piso en Nerja y quiere verlo el lunes por la mañana. NuovaSolution atiende, lo anota en su ficha y le dice que la cita todavía no está confirmada. Al volver, Marta tiene la tarea: devolver la llamada y acordar la visita. | Marta is at a viewing when the agency's phone rings. The caller asks about a flat in Nerja and would like to see it on Monday morning. NuovaSolution answers, notes it on their record and tells them the appointment isn't confirmed yet. When Marta is back, the task is waiting: call back and agree the viewing. | lines 9, 45 |
| `why` | Para agencias que pierden llamadas mientras enseñan un piso: la llamada que no puedes coger recibe respuesta y deja una tarea para devolverla. | For agencies that miss calls while showing a property: the call you cannot take gets an answer and leaves a task to call back. | line 9 |
| `fits` | Teléfono | Phone | [INTERNAL] the agency's own number or a forwarded one? Voice and Hosting say which before the page names a number |
| `bothHalves` | **removed** | **removed** | |
| plan chip | — | — | [INTERNAL] E-4 (Growth or Enterprise) is open; the page names no plan until the owner decides |

## 2. Social media (`slug: social-growth`, key `instagram`)

| Field | ES | EN | Register / [INTERNAL] |
|---|---|---|---|
| `name` | Redes sociales | Social media | "Crecimiento en redes" promises growth; the page describes conversations |
| `navLine` | Comentarios que pasan a ser clientes | Comments that turn into clients | line 33 |
| `h1` | Una pregunta en un comentario pasa a ser una conversación con un cliente. | A question in a comment becomes a conversation with a client. | line 33 |
| `lead` | Cuando alguien pregunta en un comentario, NuovaSolution le contesta en privado, donde la plataforma lo permite, y la conversación pasa a una ficha de cliente como cualquier otra consulta. También te ayuda con los textos de tus publicaciones de inmuebles. | When someone asks a question in a comment, NuovaSolution replies in private, where the platform allows it, and the conversation lands on a client record like any other enquiry. It also helps you with the texts of your property posts. | line 33: **Meta exception E3**; staging, never published at Meta |
| point 1 | Una pregunta real en un comentario recibe respuesta en privado, donde la plataforma lo permite. | A genuine question in a comment gets a private reply, where the platform allows it. | line 33 |
| point 2 | Si la persona quiere, la conversación sigue por WhatsApp y queda en su ficha. | If the person wants, the conversation continues on WhatsApp and stays on their record. | line 33 + WhatsApp lines 3/4 [INTERNAL] the same WhatsApp question as the hero |
| point 3 | Te ayuda con los textos de tus publicaciones de inmuebles, con el tono de tu agencia. | Helps you with the texts of your property posts, in your agency's tone. | line 33 (`social.publish`). [INTERNAL] W-3: Growth or Enterprise (data: Growth too) |
| point 4 | Contenido por diseño: protege tus cuentas y no persigue interacciones. | Restrained by design: it protects your accounts and does not chase engagement. | line 33 |
| `scenario` | Alguien comenta en la publicación de un ático en Marbella: «¿Qué precio tiene?». NuovaSolution le contesta en privado y le ofrece seguir por WhatsApp. La persona acepta y su consulta queda en una ficha, con lo que pidió, como cualquier otra. | Someone comments on a post about a penthouse in Marbella: "What's the price?". NuovaSolution replies in private and offers to continue on WhatsApp. The person agrees, and their enquiry lands on a record with what they asked for, like any other. | line 33. The reply in the scenario gives no price: the price comes from the team (the site rule) |
| `why` | Para agencias que publican sus inmuebles en redes: las preguntas de los comentarios no se quedan sin respuesta. | For agencies that post their listings on social media: the questions in the comments do not go unanswered. | line 33 |
| `fits` | Instagram · WhatsApp, para seguir la conversación | Instagram · WhatsApp, to continue the conversation | [INTERNAL] Facebook pages too? Social says which platforms the Meta review covers; only those are named |
| `notAvailable` | No incluye TikTok ni grupos de Facebook. | It does not include TikTok or Facebook Groups. | a scope statement, not a "later" |
| `bothHalves` | **removed** | **removed** | |

## 3. Leads from your ads (`slug: lead-acquisition`, key `adsLeads`)

| Field | ES | EN | Register / [INTERNAL] |
|---|---|---|---|
| `name` | Leads de tus anuncios | Leads from your ads | |
| `navLine` | Los formularios de tus campañas entran como consultas | Your campaign forms arrive as enquiries | line 10 |
| `h1` | Cada lead de tus campañas entra con su campaña y recibe respuesta. | Every lead from your campaigns arrives with its campaign and gets a reply. | line 10 |
| `lead` | Cuando alguien rellena el formulario de un anuncio de Meta o de Google, NuovaSolution lo recibe, le contesta como a cualquier otra consulta y lo guarda en su ficha con la campaña de la que viene. Tus anuncios los sigues gestionando tú. | When someone fills in the form on a Meta or Google ad, NuovaSolution receives it, replies like to any other enquiry and keeps it on their record with the campaign it came from. You keep running your ads. | line 10: Google package PAID_GOOGLE_PROD_v1 dry run; **Meta part: exception**. [INTERNAL] by which channel does the reply go (e-mail, WhatsApp)? API says so; until then the page says "le contesta" without a channel |
| point 1 | Formularios de Meta Lead Ads. | Meta Lead Ads forms. | line 10, Meta exception |
| point 2 | Formularios de Google (Lead Forms). | Google Lead Forms. | line 10 [INTERNAL] the first real lead in prod is missing |
| point 3 | Cada lead lleva la campaña y la fuente de la que viene. | Each lead carries the campaign and source it came from. | line 10 |
| point 4 | Se responde y se ordena como cualquier otra consulta: ficha, prioridad y motivo. | It is answered and sorted like any other enquiry: record, priority and reason. | lines 10, 11, 12 |
| `scenario` | Una campaña de Meta anuncia villas en Benahavís. Alguien deja sus datos en el formulario. La consulta llega a NuovaSolution con el nombre de la campaña, recibe respuesta y aparece en su ficha, lista para tu equipo. | A Meta campaign advertises villas in Benahavís. Someone leaves their details in the form. The enquiry reaches NuovaSolution with the campaign's name, gets a reply and appears on its record, ready for your team. | line 10 |
| `note` | NuovaSolution no gestiona ni optimiza tu publicidad: recibe los leads y los atribuye a su campaña. | NuovaSolution does not run or optimise your advertising: it receives the leads and attributes them to their campaign. | the old `bothHalves.pending` second sentence, kept as a scope note |
| `why` | Para agencias que invierten en anuncios: cada lead recibe respuesta y sabes de qué campaña viene. | For agencies that invest in ads: every lead gets a reply and you know which campaign it came from. | line 10 |
| `fits` | Meta Lead Ads · Google Lead Forms | Meta Lead Ads · Google Lead Forms | |
| `bothHalves` | **removed** | **removed** | |

**Portals are not on this page.** The register calls the row "portales y anuncios", but nothing in it proves a portal path.
- [INTERNAL] for API and Lead: do portal enquiries (Idealista, Fotocasa) that reach the agency's mailbox go through the e-mail channel like any other mail?
- If yes, Copy adds one point: "Las consultas de portales que llegan a tu correo se atienden como cualquier otro email." / "Portal enquiries that reach your inbox are handled like any other email."

## 4. Property matching (`slug: property-matching`, key `matching`)

| Field | ES | EN | Register / [INTERNAL] |
|---|---|---|---|
| `name` | Inmuebles que encajan | Property matching | unchanged |
| `navLine` | Una selección corta de tu propio inventario | A short selection from your own listings | line 26; "En desarrollo" goes |
| `h1` | Una selección corta y relevante, con una disponibilidad que la agencia puede defender. | A short, relevant selection, with availability the agency can stand behind. | unchanged |
| `lead` | NuovaSolution entiende qué busca el cliente y lo cruza con el inventario de tu agencia. El cliente recibe una selección corta; tu agente ve todas las opciones. Lo que no se puede confirmar como disponible se marca así. | NuovaSolution understands what the client is looking for and matches it against your agency's listings. The client receives a short selection; your agent sees all the options. Anything whose availability cannot be confirmed is marked as such. | line 26: build, `pm_certified = false`. [INTERNAL] Audit D: that the selection is **sent** to the client is not proven; PM says whether the agent approves it first. If yes: "Tu agente la revisa y se la envía al cliente." / "Your agent reviews it and sends it to the client." |
| point 1 | Entiende qué busca realmente el cliente. | Understands what the client is actually looking for. | line 26 |
| point 2 | Cruza con tu propio inventario o con fuentes que tu agencia autoriza. | Matches against your own listings or sources your agency authorises. | line 26 |
| point 3 | Disponibilidad honesta: no se presenta como disponible nada que la agencia no pueda defender. | Honest availability: nothing is presented as available that the agency cannot stand behind. | line 26 |
| point 4 | Una petición de visita pasa a ser una tarea del equipo. | A viewing request becomes a team task. | line 26 + tasks |
| point 5 | Cuando entra un inmueble nuevo que encaja con lo que pidió un cliente, se lo proponemos, con su permiso. | When a new listing comes in that fits what a client asked for, we suggest it to them, with their permission. | topic 28 (`8399bb6`). [INTERNAL] counsel O-1 (consent for reactivation); prod sender inactive (line 27) |
| `scenario` | Un comprador pide un piso de dos dormitorios cerca de la playa, con terraza. NuovaSolution le envía una selección corta del inventario de la agencia que encaja, marca el que no pudo confirmar como disponible, y la petición de visita llega al agente como una tarea. | A buyer asks for a two-bedroom flat near the beach, with a terrace. NuovaSolution sends a short selection from the agency's listings that fits, marks the one whose availability could not be confirmed, and the viewing request reaches the agent as a task. | line 26 (the same [INTERNAL] as `lead`) |
| `why` | Para agencias con inventario propio: el cliente ve pocas opciones buenas, y tu agente no tiene que buscarlas a mano. | For agencies with their own listings: the client sees a few good options, and your agent does not have to search for them by hand. | line 26 |
| `fits` | La web de tu agencia como fuente de inmuebles · Un feed compatible · El inventario de tu CRM | Your agency's website as a property source · A supported feed · Your CRM's listings | [INTERNAL] the feed: X-6 (owner: Enterprise only?); the CRM inventory hangs on the CRMs (line 31, built on request) |
| plan chip | — | — | [INTERNAL] W-1: Essential or Growth (data: on in Essential) |

---

## 5. The status words (`lib/content/statuses.ts`)

**Copy's proposal:** in the customer view no status chip is rendered at all. Every function shown is part of the offer.
- **Where a chip is wanted** (index rows, cards), it names the **plan** that includes the function. It is derived from `planRows`, never typed by hand:

  | Chip | ES | EN |
  |---|---|---|
  | in every plan | En todos los planes | In every plan |
  | from Growth | Desde Growth | From Growth |
  | Enterprise only | Enterprise | Enterprise |
  | 3D | Opcional | Optional |

- **The statuses stay as internal data** for the register. They do not appear on any customer page.

| Status | Today ES / EN (label · sentence) | Customer view |
|---|---|---|
| `live` | En uso hoy · Funcionando con tráfico real… / In use today · Running on real… | not rendered |
| `final_acceptance` | En prueba final · …antes de ofrecerlo / In final testing · …before we offer it | not rendered ("later") |
| `in_implementation` | En desarrollo · Todavía no está disponible / In development · Not available yet | not rendered ("later") |
| `certified_gate_pending` | Todavía no se ofrece · …aprobación externa / Not offered yet · …approval from outside | not rendered ("later") |
| `premium_on_request` | Bajo petición · Un servicio que preparamos para ti / On request · A service we prepare for you | chip **Opcional** / **Optional**; sentence **Un servicio que preparamos para ti, para cada inmueble.** / **A service we prepare for you, for each property.** |
| `not_available` | No se ofrece / Not offered | not rendered; scope exclusions go into `notAvailable` as a sentence ("No incluye…") |

**The same applies to the points of the live pages** (`ai-sales-agent`, `lead-intelligence`, `crm`, `daily-assistant`). Their points carry `in_implementation` / `final_acceptance` for several lines ("Adjuntos de email", "Daily Goals", "Email con tu marca", …).
- In the customer view, Redesign renders these points like the others, without a chip, **or** leaves them out where the line is not a planned function.
- Copy reviews those points in the next stage 2 file, together with the other function pages.

## 6. For Audit: what the four pages promise that the register does not prove in prod

| Page | Promise | Register | Kind |
|---|---|---|---|
| Phone | the whole page | line 9 | build + counsel E1 |
| Phone | Spanish only on the page | line 9 | owner decides on EN/DE after the DE call |
| Phone | introduces itself as an assistant | — | **new line for the register** (Voice confirms) |
| Phone | closed days | line 19 | build (AGENCY-HOURS-PROD) |
| Social | the whole page | line 33 | Meta E3; W-3 |
| Social | platforms named | — | **new line** (which platforms the Meta review covers) |
| Ads | the whole page | line 10 | Google: first prod lead; Meta: exception |
| Ads | reply channel | — | **new line** (API) |
| Matching | the whole page | line 26 | build; W-1 |
| Matching | selection **sent** to the client | Audit §D | **new line** (PM) |
| Matching | new listing proposed with consent | lines 27 / topic 28 | counsel O-1 |

**Signal for Redesign:** these are drafts; build nothing before the owner's feedback on the two paths. After it, the lines in §1–§5 are final unless Audit or the owner marks one.
