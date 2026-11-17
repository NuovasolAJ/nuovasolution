# Copy → Redesign, 17.11. evening: the target view shows the finished product

**Order:** the owner, 17.11.
- The target view shows NuovaSolution as agencies will have it when it is finished.
- After 10 seconds an agent should think: "I need this, and testing it costs me nothing."

**Due:** 17.11. 20:00. The fixed build is Wed 18.11. 14:00.

**Status:**
- This is an editorial and technical check, not a legal approval and not a Meta approval.
- Every line below is a **target** line. It hangs on its key in `lib/claims.ts`.
- On the switch day, a key that is not in production gets its "Próximamente" wording (`COPY_TO_REDESIGN_1116_EXAMPLE_WEEK_PROXIMAMENTE_v1.md` §1, PX-b/PX-s).
- Nothing below is a fact about production unless it says so.

**Rules kept:**
- tú form;
- short;
- no quotes from clients, no logos, no figures of real clients;
- all example data fictional and marked;
- no portal names;
- no promise of a time, of availability or of a booking (owner KALENDER, 26.10.).

**Nothing the owner likes is dropped.** Two lines move:
- the hero's h1 "Mientras enseñas, NuovaSolution atiende." becomes the line under the title of (C);
- the hero's lead stays as the subline of variant H-1.

---

## A. Hero: the result for the agent (3 variants, the owner chooses)

The button stays "Solicita tu piloto gratuito", with the pilot line under it (`home-1103.ts:34–37`). ⟦canales⟧ is filled from the keys, as everywhere else.

| # | h1 ES | Subline ES | h1 EN | Subline EN |
|---|---|---|---|---|
| H-1 | No pierdas ni una consulta más. | Tus clientes reciben respuesta aunque estés en una visita, y lo que piden te espera ordenado en su ficha. | Never lose another enquiry. | Your clients get a reply even while you are at a viewing, and what they ask for is waiting for you on their record. |
| H-2 | Más visitas, menos horas pegado al teléfono. | Cada consulta recibe respuesta al momento por ⟦canales⟧ y llega a tu equipo con lo que busca y a quién llamar primero. | More viewings, fewer hours stuck on the phone. | Every enquiry gets an instant reply on ⟦canales⟧ and reaches your team with what the client wants and who to call first. |
| H-3 | Tú enseñas casas. Nosotros no dejamos escapar ninguna consulta. | Respuesta al momento, cada cliente en su ficha y el seguimiento hecho. Pruébalo 14 días gratis. | You show homes. We make sure no enquiry slips away. | An instant reply, every client on a record and the follow-up done. Try it free for 14 days. |

**Copy's recommendation: H-1.**
- It names the pain the whole page is built on (lost enquiries).
- Its subline is the owner's existing lead, so nothing is lost.

**What each variant claims:**
- **H-1:** "No pierdas" is a wish to the reader, not a guarantee. The guarantee-like line is already the owner's K2 title "Ninguna consulta se queda sin aviso".
- **H-2:** "Más visitas" is an outcome without a figure; no figure is allowed. If the owner wants it measurable, the example report already counts "6 pedidas · 4 acordadas" per week.
- **H-3:** "el seguimiento hecho" hangs on `followup` (Growth and up). It is still fine in the hero because the hero describes the product, not the pilot. "14 días gratis" is true for Essential (§E).

---

## B. "Todo lo que hace por tu agencia"

**Where:** after Atiende · Organiza · Crece. "Y además" (K1, K2) stays as it is.
**Card style:** like K1/K2. A title, one sentence, three example lines, a small mark, and a plan chip.

**The plan chip is needed for honesty.** Five of the eight strengths start at Growth (`planRows`), and the free pilot is Essential only (§E). The agent must see what the pilot includes.

**Order: by selling power.** The pain first (lost enquiries), then more viewings, then time, then extras.

| # | Key(s) | Title ES (≤ 5 words) | Title EN | Sentence ES | Sentence EN | Phone ES | Phone EN | Plan chip ES · EN |
|---|---|---|---|---|---|---|---|---|
| T-1 | `followup` | Seguimiento hasta que contesta | Follow-up until they reply | Si el cliente no contesta, le volvemos a escribir, con su permiso, hasta que responde o te dice que no. | If the client doesn't reply, we write again, with their permission, until they answer or tell you no. | Nadie se enfría sin seguimiento. | No lead goes cold unfollowed. | Desde Growth · From Growth |
| T-2 | `phoneAssistant` | Atiende el teléfono por ti | Answers the phone for you | Cuando estás en una visita, el asistente coge la llamada, anota qué busca y te deja la tarea. | When you're at a viewing, the assistant takes the call, notes what they want and leaves you the task. | Ninguna llamada perdida en una visita. | No call missed during a viewing. | Desde Growth · From Growth |
| T-3 | `matching` | Inmuebles que encajan, siempre | Listings that fit, always | Cada cliente recibe los inmuebles de tu cartera que encajan con lo que busca, también los que entran después. | Every client is matched with the listings in your portfolio that fit what they want, including the ones that come in later. | Cada piso nuevo, con su cliente. | Every new listing, to its client. | Desde Growth · From Growth |
| T-4 | `taskList`, `dailyVoice` | Cada mañana, el día claro | Every morning, a clear day | Cada mañana, cada persona del equipo sabe qué tiene que hacer hoy y con quién. | Every morning, everyone on the team knows what to do today and with whom. | Tu día, ordenado a las 8:30. | Your day, sorted by 8:30. | Desde Growth · From Growth |
| T-5 | `adsLeads` | Todos tus leads, atendidos | Every lead, answered | Las consultas de tus portales y anuncios entran en el mismo sitio y reciben la misma respuesta al momento. | Enquiries from your portals and ads land in the same place and get the same instant reply. | Portales y anuncios, en un sitio. | Portals and ads, in one place. | Desde Growth · From Growth |
| T-6 | `model3d` | Tu plano, en 3D | Your floor plan, in 3D | Convertimos tu plano en un modelo 3D, vacío y amueblado, con imágenes para tus anuncios. | We turn your floor plan into a 3D model, empty and furnished, with images for your listings. | Del plano a imágenes de anuncio. | From floor plan to listing images. | Opcional, con cualquier plan · Optional, with any plan |
| T-7 | `instagram` | Publicaciones para tus redes | Posts for your social media | Cada inmueble nuevo, preparado como publicación con foto y texto. Tú la apruebas y sale en el Instagram de tu agencia. | Every new listing, prepared as a post with a photo and text. You approve it and it goes out on your agency's Instagram. | Tus pisos, en Instagram, con tu visto bueno. | Your listings on Instagram, with your OK. | Enterprise · Enterprise |
| T-8 | `reportInLogin`, `weeklyEmail` | Tu semana, en un informe | Your week, in one report | Cada lunes ves qué entró, qué sigue abierto y qué hacer esta semana. | Every Monday you see what came in, what is still open and what to do this week. | Qué entró y qué hacer. | What came in and what to do. | Todos los planes · Every plan |

**The example lines** (fictional; the same people as the demo and the example week; mark on every card "Ejemplo · datos ficticios" / "Example · fictional data"):

| # | Line 1 ES | Line 2 ES | Line 3 ES | Line 1 EN | Line 2 EN | Line 3 EN |
|---|---|---|---|---|---|---|
| T-1 | Mar 11:31 · Sofía pide un alquiler en Fuengirola | Jue 10:00 · Seguimiento: «¿Sigues buscando para enero?» | Jue 12:14 · Sofía contesta · a su ficha | Tue 11:31 · Sofía asks for a rental in Fuengirola | Thu 10:00 · Follow-up: "Still looking for January?" | Thu 12:14 · Sofía replies · to her record |
| T-2 | 11:39 · Álvaro llama · estás en una visita | Atendida · la villa de Elviria, precio y margen | Tarea: devolver la llamada a partir de las 16:00 | 11:39 · Álvaro calls · you're at a viewing | Answered · the villa in Elviria, price and room to negotiate | Task: call back from 16:00 |
| T-3 | Nuevo en tu cartera: piso de 2 dormitorios en Estepona, 305.000 € | Encaja con Laura: 2 dormitorios, Estepona, hasta 320.000 € | Tú decides: «Enviar a Laura» | New in your portfolio: 2-bedroom flat in Estepona, €305,000 | Fits Laura: 2 bedrooms, Estepona, up to €320,000 | You decide: "Send to Laura" |
| T-4 | 08:30 · Buenos días, Marta. Hoy, 3 cosas: | Proponer fecha a los Keller · Devolver la llamada a Álvaro, desde las 16:00 | Enviar a Sofía lo disponible en alquiler | 08:30 · Good morning, Marta. Today, 3 things: | Propose a date to the Kellers · Call Álvaro back, from 16:00 | Send Sofía what's available to rent |
| T-5 | Portal · EST-204 · piso con terraza en Estepona | Respondida al llegar · en su ficha | Informe: portales y anuncios, 4 de 25 | Portal · EST-204 · flat with terrace in Estepona | Answered on arrival · on its record | Report: portals and ads, 4 of 25 |
| T-6 | Plano: plano-estepona.pdf | Modelo vacío y amueblado | Imágenes para anuncios y redes · marcadas como visualización | Plan: plano-estepona.pdf | Model, empty and furnished | Images for listings and social media · marked as a visualisation |
| T-7 | Nuevo: piso con terraza en Estepona | Borrador: foto + «2 dormitorios y terraza, a 10 minutos de la playa» | Aprobado por Marta · publicado | New: flat with terrace in Estepona | Draft: photo + "2 bedrooms and a terrace, 10 minutes from the beach" | Approved by Marta · posted |
| T-8 | Lunes 08:00 · 25 consultas, 25 respondidas | 9 con la oficina cerrada · 4 visitas acordadas | Esta semana: proponer fecha a las 2 visitas pendientes | Monday 08:00 · 25 enquiries, 25 answered | 9 with the office closed · 4 viewings agreed | This week: propose a date for the 2 open viewings |

**Notes on the examples:**
- **T-1:** the tense says nothing about the follow-up rhythm of the product (no "every 2 days"). "Con su permiso" stays in the sentence: Copy's C-3 and the owner's plan row "seguimiento con permiso".
- **T-3:** the agent decides what is sent. Nothing is offered to a client as available.
- **T-4:** the three items are the demo's next steps (Kellers, Álvaro, Sofía). "Marta" is the team member of K2.
- **T-5:** "EST-204" is the demo inbox's own item (`home-demo.ts:160`). No portal name.
- **T-7:** "con tu visto bueno" / "Aprobado por Marta" is required. Nothing is posted without the agency's approval. "10 minutos de la playa" is the fictional listing's text, not a claim.
- **T-8:** the figures are the example week's (25 · 25 · 9 · 4 · 2). They must stay the same as the report and the pain line.

**Two points for the owner, flagged rather than written around:**
- **Lead generation.** No key and no lane build "Lead-Generierung" in the sense of *creating* new leads (campaigns, seller landing pages). The only function that exists is `adsLeads`: leads from portals and ads come in and are answered (staging). T-5 is written on that. If the owner means new leads, that needs an owner decision, a key and a lane. Until then T-5 must not say "te traemos clientes".
- **`HELD_BACK`** (`claims.ts:142`: `phoneAssistant`, `instagram`) keeps the phone and Instagram out of offers in both views (`offered()`). For T-2 and T-7 to show in the target view as the owner now wants, Redesign hangs these two cards on `live()`, not `offered()`. This is a build note, not a text.

---

## C. "Un día con NuovaSolution"

| # | Element | ES | EN |
|---|---|---|---|
| D-t | title | Un día con NuovaSolution | A day with NuovaSolution |
| D-s | line under the title (the hero's former h1, kept) | Mientras enseñas, NuovaSolution atiende. | While you show a home, NuovaSolution answers. |
| D-1 | 08:30 (`taskList`, `dailyVoice`) | Marta abre su resumen: sabe qué toca hoy y con quién. | Marta opens her summary: she knows what's on today and with whom. |
| D-2 | 11:39 (`phoneAssistant`) | Marta está en una visita; el asistente atiende la llamada de Álvaro y le deja la tarea. | Marta is at a viewing; the assistant takes Álvaro's call and leaves her the task. |
| D-3 | 13:20 (`reminders`) | Nadie ha cogido la visita de Laura: Carlos recibe el aviso y la coge. | Nobody has taken Laura's viewing: Carlos gets the notice and takes it. |
| D-4 | 16:00 (`matching`, `instagram`) | Entra un piso nuevo en Estepona: encaja con Laura y su publicación para redes espera tu visto bueno. | A new flat comes in in Estepona: it fits Laura, and its social media post waits for your OK. |
| D-5 | 18:00 (`followup`) | Sofía no ha contestado: recibe un seguimiento, con su permiso. | Sofía hasn't replied: she gets a follow-up, with her permission. |
| D-6 | 23:40 (`replyOutOfHours`) | Llega una consulta con la oficina cerrada: respuesta al momento, y mañana a las 8:30 está en tu resumen. | An enquiry arrives with the office closed: an instant reply, and tomorrow at 8:30 it's in your summary. |
| D-m | mark | Ejemplo · nombres ficticios | Example · fictional names |

D-6 closes the circle back to D-1.

**Each station hangs on its key(s).** On the switch day a station whose key is off gets its PX-s wording; it is not hidden. If more than two stations would be "Próximamente", Copy recommends the owner reduce the section to the live stations rather than show a day of announcements.

---

## D. Profitability line (placeholder until the owner sets prices)

| # | ES | EN |
|---|---|---|
| R-1 | Desde {precio} al mes. Una sola consulta que no se pierde puede valer una comisión entera. | From {precio} a month. A single enquiry that isn't lost can be worth a whole commission. |
| R-2 (shorter, alternative) | {precio} al mes: menos que una comisión que se escapa. | {precio} a month: less than one commission that slips away. |

**Recommendation: R-1.**
- It compares without inventing a figure ("puede valer").
- R-2 states that the price is lower than a commission. That is true only once the owner's price is set, so Copy checks R-2 against the real {precio} before it goes live.

**Placement:** under the plans table, beside "Te decimos el precio para tu agencia antes de acordar nada." Rule: **until {precio} is set, R-1/R-2 are not rendered in either view**. The site shows no price today (claims `plans` "soon"). Never leave a raw "{precio}" on the page.

---

## E. The free pilot is Essential only. Every sentence that promised it for every plan

**The new rule (owner, 17.11.):**
- The free 14-day pilot is for **Essential**.
- **Growth** and **Enterprise** are hired directly ("Contratar directamente").

**Plan buttons** (replaces `COPY_TO_REDESIGN_1117_DEMO_REPLIES_PLAN_BUTTONS_v1.md` §2 for Growth and Enterprise):

| Plan | Way 1 | Line under it | Way 2 | Line under it |
|---|---|---|---|---|
| Essential | **black** "Empieza 14 días gratis" / "Start 14 days free" | 14 días gratis, sin tarjeta / 14 days free, no card | outlined "Contratar directamente" / "Go straight to a plan" | Te respondemos en 24 h laborables, con las condiciones por escrito. / We reply within 24 working hours, with the terms in writing. |
| Growth, Enterprise | **black** "Contratar directamente" / "Go straight to a plan" | Te respondemos en 24 h laborables, con las condiciones por escrito. / We reply within 24 working hours, with the terms in writing. | — | — |

- **The subject of the pilot form (B-pilot, `4194eab`):** **"Piloto gratuito · plan Essential"** / **"Free pilot · Essential plan"**, fixed.
  - `app/[locale]/contact/page.tsx:39` builds it from any plan today.
  - A pilot link must carry only Essential. A pilot request coming from a Growth or Enterprise link opens the form as "Contratar {Plan}".
- **B-aria:** "Empieza 14 días gratis con Essential" only. Growth and Enterprise keep "Contratar {Plan} directamente".

**Every sentence that promised a free start for every plan** (file:line on today's HEAD):

| Where | Today | New ES | New EN |
|---|---|---|---|
| `lib/content/home-1103.ts:479` (line above the plans) | Todos los planes pueden empezar con un piloto gratuito de 14 días. | El piloto gratuito de 14 días es con Essential. Growth y Enterprise los contratas directamente. | The free 14-day pilot runs on Essential. Growth and Enterprise you hire directly. |
| `lib/i18n/dictionaries/es.ts:375` / `en.ts:410` (packages page lead) | Cualquier plan puede empezar con 14 días de piloto, gratis … | Empieza con 14 días de piloto en Essential, gratis y con nuestro acompañamiento, y 7 días más si nos das tu opinión. Growth y Enterprise los contratas directamente; el precio te lo explicamos antes de acordar nada. | Start with a 14-day pilot on Essential, free and with our support, and 7 more days if you give us your feedback. Growth and Enterprise you hire directly; we explain the price before anything is agreed. |
| `lib/content/faq.ts:193–194` (the pilot answer) | Usas NuovaSolution en tu agencia durante 14 días, gratis … | Usas NuovaSolution con el plan Essential en tu agencia durante 14 días, gratis y con nuestro acompañamiento. *(rest unchanged)* | You use NuovaSolution on the Essential plan in your agency for 14 days, free and with our support. *(rest unchanged)* |
| `COPY_TO_REDESIGN_1116_OWNER_LIST_TEXTS_v1.md` §4 PK-0, PK-lead; `COPY_TO_REDESIGN_1116_PILOT14_TEXTS_v1.md` | the "todos / cualquier plan" lines | **superseded by this §E** | |

**Checked, and they stay** (they do not promise a free start for every plan):
- the hero pilot line `home-1103.ts:36–37`, and `claims.ts:210`;
- the header button "Solicita tu piloto gratuito";
- `pilot-request.ts:16–18`, `:65`;
- the "Cómo empezar" steps `home-1103.ts:529–542`;
- the phone lines `:451–452`;
- the final CTA `:597`;
- `es.ts:680` "Tu prueba tiene el alcance de Essential durante 14 días" (already right);
- `es.ts:415` "14 días gratis" on the Essential card only (D-22);
- `es.ts:264–265` "Empieza gratis y luego elige un plan": true, because you start on Essential and may then hire any plan;
- `home-1103.ts:494` "La visualización 3D se contrata aparte, con cualquier paquete." (about 3D, not the pilot).

**Pilot form option** (`pilot-request.ts:35`): it stays "Piloto gratuito". Redesign: when it is chosen, the plan is Essential, whatever plan the link carried.

---

## F. Open
- **Owner:** choose H-1, H-2 or H-3. **Recommendation: H-1.**
- **Owner:** set {precio} before R-1/R-2 are shown. Copy then checks R-2 against it.
- **Owner:** decide what "Lead-Generierung" means (§B). T-5 stays on `adsLeads` until then.
- **Owner:** the five Growth strengths (T-1 to T-5) are not part of the free Essential pilot, and the plan chips say so. If the owner wants the pilot to show them, the pilot's scope has to change, not the text.
