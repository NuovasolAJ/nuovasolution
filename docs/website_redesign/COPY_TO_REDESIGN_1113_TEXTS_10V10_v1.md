# COPY → Redesign · Texts for the 10/10 build · ES + EN · Fri 13.11.2026

**For:** Redesign (builds with these lines), the Reviewer (checks them). **Owner order of 13.11.**, after the master prompt
`owner_review_1109/REDESIGN_MASTERPROMPT_10V10_1109_v1.md` and the desktop review `OWNER_AUDIT_DESKTOP_REVIEW_1109_v1.md`.
**Basis:** Copy's texts of 1108 (`16bf954`) stay. This file adds the six points of 13.11. Where it gives a text for a place, it replaces
the earlier one. **§0 (owner, 13.11.: one offer) overrides every "demo" button in 1108**, including H-1, H-3, P-1, P-2 and the button
of "Quién está detrás".
**Languages:** the site has ES and EN (`lib/i18n/index.ts`). Every line is given in both.
**Read against:** HEAD `9a10d4c` (`lib/claims.ts`, `lib/content/home-1103.ts`, `faq.ts`, the dictionaries), 3D's
`C:\src\nuova-3d\docs\3D_FEATURE_TRUTH.md` (16.10.), MM's `MM_WA_MEDIEN_SPRACHNACHRICHT_IMAP_1106_v1.md` and `MULTIMODAL_SIGNALS_1106.md`
(last entry 09.11.), `components/site/product-views.tsx:21` (Lead's truth on the score).
**Marking:** every line is **WORKING** until its proof stands. Editorial and technical, not a legal approval, not a Meta approval.
No number appears that the example report or a register does not carry.

**How to read the "Proof" column:**
- **proven:** the fact stands today in `lib/claims.ts` as `included`, or in a published line of the site, or in an owner line.
- **open:** a named lane has to confirm. Until then the line shows in the target view only, and the public view uses the fallback.

---

## 0. ONE offer: the main button and the pilot line (owner decision 13.11., before 14:00)

**Owner, 13.11.:** one offer everywhere, "Piloto gratuito". "Solicitar una demo", "Reservar una demo" and "14 días" leave the site. This
section **replaces** 1108 H-1, H-3, P-1 and P-2 and every "demo" button. The live demo section stays: it shows the product, it is not an
offer.

| # | Place | ES | EN |
|---|---|---|---|
| B-1 | **the one main button**: hero, header, the phone's fixed bar, plans (every column), "Cómo empezar", "Quién está detrás", the closing band, `/contact`, `/faq`, the module pages | **Solicita tu piloto gratuito** | **Request your free pilot** |
| B-1s | short form, **only** where B-1 does not fit on one line (header and fixed bar at 360–390 px) | Piloto gratuito | Free pilot |
| B-2 | **the pilot line**, directly under B-1 in the hero (and under the button in "Cómo empezar") | Tu agencia usa NuovaSolution sin pagar, con nuestro acompañamiento. Las condiciones, por escrito. | Your agency uses NuovaSolution free of charge, with our support. The terms in writing. |
| B-3 | `aria-label` of B-1s | Solicita tu piloto gratuito | Request your free pilot |

**Why these words:**
- **"Solicita" is honest.** The pilot is agreed, not started by a click; there is no self-service sign-up (`publicSignup` is soon).
- **B-2 has no number.** The owner line PAKETE (free, at most 90 days, no payment method) may stand in the FAQ (Q-11). The short line does not need it.
- **No "demo" and no price in B-2.** The demo button is gone, so "precio en la demo" goes too. The price appears only in the FAQ (Q-13 below).

**Where B-1 leads:** `/contact`, to the pilot card (C-1 below). The booking page may stay behind the card's button only if it really
lets the visitor book a slot (1108 O-3).

**The second hero button (1108 H-2, WhatsApp) leaves the hero.** The master prompt asks for one main button, and Redesign's §6 shows the
company phone as a number only, no `wa.me`. The label for that number on contact, legal notice and footer is **Teléfono** / **Phone**.

### The pilot card on `/contact` (replaces "Solicitar una demo", `es.ts:490–492`)

| # | ES | EN |
|---|---|---|
| C-0 | eyebrow: Piloto gratuito | eyebrow: Free pilot |
| C-1 | h: Solicita tu piloto gratuito | h: Request your free pilot |
| C-2 | Hablamos contigo, te enseñamos el sistema con un ejemplo y vemos si encaja con tu agencia. Sin presentación de ventas. | We talk with you, show you the system with an example and see whether it fits your agency. No sales pitch. |
| C-3 | button = B-1 | button = B-1 |
| C-4 | page lead (`es.ts:486`): Contacto humano directo, en español o en inglés. Te enseñamos el sistema y te explicamos el piloto y el precio. | Direct human contact, in Spanish or English. We show you the system and explain the pilot and the price. |

---

## 1. Pain line under the hero

| # | ES | EN | Proof |
|---|---|---|---|
| S-1 | En una semana de ejemplo, **9 de 25** consultas llegaron con la oficina cerrada. ¿Quién les contestó? | In an example week, **9 of 25** enquiries arrived while the office was closed. Who answered them? | proven: the example week of the report (`home-1103.ts:336`, 9 = 2 + 2 + 5) |
| S-1m | Ejemplo con datos ficticios | Example with fictional data | the mark, small, beside or under the line |

- **Why a question.** The answer is the demo just below, so the line needs no promise of its own.
- **The 9 and the 25 are the report's figures.** They must stay the same everywhere on the page; if the report's example changes, this line changes with it.
- **Counting up** to 9 is fine.
- **No present tense.** Not "9 de 25 consultas llegan…", because that would read as a market statistic.

---

## 2. Atiende · Organiza · Crece (stacked cards)

Every card is built the same way: title, one sentence, 3 or 4 points, one button.

**There is no score.** `product-views.tsx:21` records Lead's truth: "No qualification score … exists in production". The site's own
line says "NuovaSolution no calcula una puntuación". So the owner's "Score / Puntuación" becomes **priority with its reason**. If Lead
says a score now exists, Copy writes the line.

### Atiende / Answer

| # | Target ES | Target EN | Public while the proof is open (ES · EN) | Proof |
|---|---|---|---|---|
| A-0 | Contesta en cuanto llega la consulta, también de noche y en fin de semana. | It replies as soon as the enquiry arrives, also at night and at weekends. | the same | proven: `replyOutOfHours` included |
| A-1 | Responde en segundos, a cualquier hora. | Replies within seconds, at any hour. | Responde al llegar la consulta, a cualquier hora. · Replies when the enquiry arrives, at any hour. | **open:** no measurement. The report itself shows "Tiempo de respuesta: No medido". "En segundos" needs time from arrival to sending over real production runs (API/Lead). After that it stands, and only for channels that are included |
| A-2 | Entiende qué busca: comprar, alquilar o vender. | Understands what they want: to buy, rent or sell. | the same | proven: the "Intención" field on the record, `crm` included, the hero chip in both views. API confirms the three values |
| A-3 | Todo entra en el CRM: zona, presupuesto, intención y canal, sin copiar nada. | Everything goes into the CRM: area, budget, intent and channel, with nothing copied by hand. | the same | proven: `crm`, `origin` included |
| A-4 | Prioridad con su motivo, en cada ficha. | Priority with its reason, on every record. | the same | proven: `priorityWithReason` included |
| A-btn | Ver cómo responde | See how it replies | the same | leads to the demo |

### Organiza / Organise

| # | Target ES | Target EN | Public (ES · EN) | Proof |
|---|---|---|---|---|
| O-0 | Cada consulta en su ficha, con lo que toca hacer hoy. | Every enquiry on its record, with what needs doing today. | Cada consulta en su ficha, en orden. · Every enquiry on its record, in order. | `taskList` soon |
| O-1 | La persona que toca recibe el aviso. | The right person gets the alert. | hide | **open:** `alert` soon |
| O-2 | Tareas del día: tu equipo sabe qué hacer hoy. | Today's tasks: your team knows what to do today. | hide | **open:** `taskList` soon |
| O-3 | El canal de origen en cada ficha. | The channel of origin on every record. | the same | proven: `origin` included |
| O-4 | Reconoce el idioma. Si no es español, la consulta espera a una persona. | It recognises the language. If it is not Spanish, the enquiry waits for a person. | the same | proven: `languageNoted` included. **This is the language's one point, as the owner asked** |
| O-btn | Ver una ficha | See a record | the same | `/platform/crm` |

### Crece / Grow

| # | Target ES | Target EN | Public (ES · EN) | Proof |
|---|---|---|---|---|
| C-0 | Te enseña dónde está tu potencial y qué hacer después. | It shows you where your potential is and what to do next. | the same | proven: `reportInLogin` included (open cases and next steps in every view) |
| C-1 | Un informe semanal en tu acceso: qué entró, qué sigue abierto y qué hacer. | A weekly report in your login: what came in, what is still open and what to do. | the same | proven: `reportInLogin` |
| C-2 | Inmuebles de tu cartera que encajan con cada cliente. | Listings from your portfolio that fit each client. | hide | **open:** `matching` soon |
| C-3 | Seguimiento con el permiso del cliente. | Follow-up with the client's permission. | hide | **open:** `followup` soon |
| C-4 | El resumen de la semana, también por email. | The week's summary, also by e-mail. | hide | **open:** `weeklyEmail` soon |
| C-btn | Ver el informe de ejemplo | See the example report | the same | exists |

In the public view Crece keeps C-0 and C-1. If two points look thin, add the file point F-0 from §3 there once it is proven.

---

## 3. NEW: files (photos, plans, PDFs, voice notes)

**State:** **target view only, until MM confirms per line what runs in production.**
- I could not reach MM directly today: no peer session carries MM's name. The question is in §7.
- What I could read (MM, 06.11. and 09.11.):
  - The media path exists.
  - Photo without text and the unreadable file are in Lead's candidate `28a`, and go to production only after L1 with Lead's go.
  - Voice notes are proven in Spanish only: EN and DE have 0 runs.
  - A real-phone run with photo and PDF was "GESPERRT", earliest Fri 13.11.
  - I found nothing on e-mail attachments.

| # | Target ES | Target EN | Proof needed from MM, per line |
|---|---|---|---|
| F-0 | Entiende fotos, planos, PDF y notas de voz, por WhatsApp y email. | Understands photos, floor plans, PDFs and voice notes, on WhatsApp and e-mail. | each medium × each channel: live in production or not. Only the live pairs stay in the line |
| F-1 | Una foto o un plano, aunque llegue sin texto: responde con lo que muestra. | A photo or a floor plan, even without text: it replies with what it shows. | `[FOT: Photo Only?]` live in production (the owner says it comes today) |
| F-2 | Un PDF o la ficha de un inmueble: lo lee junto con el mensaje. | A PDF or a listing sheet: it reads it together with the message. | `[WA: Merge Doc Context]` live; e-mail attachments yes or no |
| F-3 | Una nota de voz: la transcribe y la contesta como un mensaje escrito. | A voice note: it transcribes it and answers it like a written message. | live; proven in Spanish only. The public line says "una nota de voz en español" until EN/DE have runs |
| F-4 | Si no puede abrir un archivo, lo dice y pide que lo vuelvan a enviar. | If it cannot open a file, it says so and asks for it to be sent again. | `[MMU: Unreadable?]` live in production |

**Where:** either as one card point in Atiende, or as a short strip after the cards, with F-0 as its title and F-1 to F-4 under it. Never
on a picture.
**Not in the line:** "exposé" as a promise of extraction, any number of formats, any time.

---

## 4. Report: "Dónde está tu potencial"

| # | Place | ES | EN | View |
|---|---|---|---|---|
| R-0 | eyebrow | Informe | Report | both |
| R-1 | h2 (replaces "Tu semana, en un informe") | Dónde está tu potencial | Where your potential is | both |
| R-2 | one sentence | Cada semana, el informe te enseña qué se atendió, qué sigue abierto y dónde puedes crecer. | Every week, the report shows you what was handled, what is still open and where you can grow. | both |
| R-m | the mark, once in the section | Datos de ejemplo | Example data | both |

### The three insight cards (figure · insight · next step)

**Target view** (the channel cards hang on `reportTrend`, the third also on `adsLeads`):

| # | Figure | Insight ES | Next step ES | Insight EN | Next step EN |
|---|---|---|---|---|---|
| K-1 | 9 de 25 | llegaron con la oficina cerrada. Las 9 recibieron respuesta al llegar. | 2 pedían visita: proponles una fecha a primera hora. | arrived while the office was closed. All 9 got a reply when they arrived. | 2 asked for a viewing: offer them a date first thing. |
| K-2 | WhatsApp · 10 de 25 | es tu canal más fuerte. | Pon tu WhatsApp donde te buscan: anuncios, web y escaparate. | is your strongest channel. | Put your WhatsApp where people look for you: ads, website and shop window. |
| K-3 | Portales y anuncios · 4 de 25 | Compara antes de invertir más. | Pon al lado lo que pagas por portales y anuncios: el informe cuenta las consultas, el gasto lo sabes tú. | Compare before you spend more. | Set what you pay for portals and ads beside it: the report counts the enquiries, you know the spend. |

**Public view** (only keys that are included: `replyOutOfHours`, `reportInLogin`, `languageNoted`):

| # | Figure | Insight ES | Next step ES | Insight EN | Next step EN |
|---|---|---|---|---|---|
| K-1 | 9 de 25 | as above | as above | as above | as above |
| K-2p | 6 de 25 | pidieron visita; 4 ya están acordadas. | Propón fecha a las 2 que faltan. | asked for a viewing; 4 are already agreed. | Offer a date to the 2 still open. |
| K-3p | 2 de 25 | llegaron en otro idioma y esperan a una persona. | Contéstales hoy. | arrived in another language and are waiting for a person. | Answer them today. |

**Advertising budget, the limit.** The report counts enquiries by channel of origin. It does not measure spend, cost per lead or sales.
So it may help decide where to invest, and it must never claim a saving or a return. This line stands under K-3, in the target view only:
- **ES:** El informe te dice de dónde llega cada consulta. Con eso decides dónde invertir; lo que gastas en anuncios no lo mide.
- **EN:** The report tells you where each enquiry comes from. That helps you decide where to invest; it does not measure what you spend on ads.

**Remove the "No medido" tiles** ("Entregadas al cliente", "Tiempo de respuesta") from the sales page. That is fine, on one condition: no
line anywhere may then claim a response time (see A-1).

**Sin / Con, at most 4 rows visible.** The rest goes behind a control:
- "Ver la semana completa" / "See the full week".

The rows that stay visible are the existing rows of `home-1103.ts` with their figures:
1. Llegaron con la oficina cerrada 9 · 9
2. Sin respuesta hasta que abre la oficina 9 · 0
3. Esperan al día siguiente 5 · 0
4. En su ficha: "lo que alguien anote" · 25

The mark "Ejemplo con datos ficticios · la misma semana" stays in sight of the figures.

---

## 5. 3D

**Checked with 3D on 13.11.:** `C:\src\nuova-3d\docs\3D_TO_COPY_REDESIGN_1113_NUTZEN_v1.md` (3D commit `61b5072`). The lines below
follow it. They stay **target view only** while `model3d` is soon.

### The benefit points

| # | Target ES | Target EN | 3D, 13.11. |
|---|---|---|---|
| 3-1 | Enseñas la casa en 3D: plantas, habitaciones, con y sin muebles. | You show the home in 3D: floors, rooms, with and without furniture. | **rephrased, as 3D asked:** a fact, not a comparison. 3D wrote "El comprador recorre la casa…". Copy makes the agency the subject, because the model's link opens only with the agency's session and there is no public viewer. A buyer sees it when the agency shows it |
| 3-2 | Vacía y amueblada, desde la misma cámara: el comprador ve lo que puede ser. | Empty and furnished, from the same camera: the buyer sees what it could be. | **yes:** the furniture switch in the viewer and the pair from the same camera (`pair/`) |
| 3-3 | Imágenes del modelo para tus anuncios y redes, marcadas como visualización. | Images from the model for your listings and social media, marked as a visualisation. | **yes for images**, with the mark "Rendering / visualización". **No video per order.** Never "vídeos" |
| 3-4 | Algo distinto que enseñar al propietario cuando pides el encargo. | Something different to show an owner when you ask for the listing. | **yes, as a use.** Not "más propietarios eligen tu agencia", which promises a result |
| — | ~~Colaboración con interioristas~~ | — | **no:** not built, not in progress |

**Never:** "your furniture from photos", "automatic from the plan", "measured" or "to scale with the building", a delivery time,
"instant", photorealistic, VR, a public viewer link, a price.

### Floor mark for 04 Entrega

The mark stands outside the picture, as its own label. It shows only during these seconds of `entrega_clip` (30 fps, 18.4 s; 3D's
`check/entrega_frames.json`):

| Seconds | ES | EN |
|---|---|---|
| 0.0–1.9 (both floors) | no mark | no mark |
| 1.9–7.3 | Planta alta | Upper floor |
| 7.3–12.6 | Planta baja | Ground floor |
| 12.6–15.4 | Planta baja · sin muebles | Ground floor · unfurnished |
| 15.4–18.4 | Planta baja | Ground floor |

### Slider and captions

These also answer Redesign's T-10 request of 07.11.

| # | ES | EN |
|---|---|---|
| 3-s1 | Vacía | Empty |
| 3-s2 | Amueblada | Furnished |
| 3-s3 | the hint at the first wiggle: Arrastra | Drag |
| 3-s4 | `aria-label` of the slider: Comparar vacía y amueblada | Compare empty and furnished |
| 3-c | the caption, once, under the picture: Casa de ejemplo ficticia, visualización | Fictional example house, visualisation |

### "Tu camino", card 3

3D, 13.11.: each order delivers the model with a protected link for the agency, plus still images. There is no video and no public
link.

| # | ES | EN |
|---|---|---|
| 3-t1 | Tú envías el plano | You send the plan |
| 3-t2 | Nosotros construimos el modelo y lo revisamos | We build the model and check it |
| 3-t3 | Te entregamos el enlace y las imágenes | We deliver the link and the images |

---

## 6. "Piloto gratuito" everywhere instead of 14 days

**The rule** (owner, 13.11., see §0). There is one offer: the free pilot, with one main button, "Solicita tu piloto gratuito" (B-1). In
both views `/signup` and `/trial` lead to `/contact`. The words "demo" as an offer, "Reservar/Solicitar una demo" and "14 días" appear
nowhere.

**Duration and payment method.** The owner line PAKETE (desktop review 09.11. §3.7) says the pilot is free, lasts at most 90 days and
needs no payment method. The FAQ may say that. The short line does not carry it.

### The entry and the main places

| Place at `9a10d4c` | ES | EN |
|---|---|---|
| `claims.ts:146–157`, entry action, both views | B-1 · line: B-2 · nav: Piloto | B-1 · line: B-2 · nav: Pilot |
| `home-1103.ts:435` title | Piloto gratuito, en 3 pasos | Free pilot, in 3 steps |
| step 1 | **Solicita tu piloto.** Hablamos contigo, te enseñamos el sistema y vemos si encaja. | **Request your pilot.** We talk with you, show you the system and see whether it fits. |
| step 2 | **Preparamos tu agencia contigo.** Tus datos y tu equipo. | **We set up your agency with you.** Your details and your team. |
| step 3, target (`mailboxConnection`) | **Conectamos tu buzón contigo.** Lo hacemos juntos y lo probamos con un mensaje real. | **We connect your mailbox with you.** We do it together and test it with a real message. |
| step 3, public | **Empiezas el piloto.** Antes, te confirmamos por escrito qué está activo. | **You start the pilot.** Before that, we confirm in writing what is active. |
| `home-1103.ts:445` line | Sin método de pago. Las condiciones del piloto, por escrito. | No payment method. The pilot's terms in writing. |
| `home-1103.ts:475` "¿Cómo empiezo?" | Solicita tu piloto gratuito. Hablamos contigo, te enseñamos el sistema y, si encaja, preparamos tu agencia contigo. | Request your free pilot. We talk with you, show you the system and, if it fits, set up your agency with you. |
| plans table, button in every column (`plans-table.tsx:47`) | B-1 | B-1 |
| Growth badge | Recomendado | Recommended |
| `es.ts:370` / `en.ts:404` packages h1 | Piloto gratuito | Free pilot |
| `es.ts:380` / `en.ts:415` | El precio para tu agencia te lo explicamos antes de acordar nada. No hay pago en la web. | We explain the price for your agency before anything is agreed. There is no payment on the website. |
| `es.ts:388` "¿Necesito una tarjeta…?" | No. El piloto es gratuito y no pedimos método de pago. | No. The pilot is free and we ask for no payment method. |
| `es.ts:486` / `en.ts` contact lead | = C-4 | = C-4 |
| `es.ts:1060` / EN, the assistant's suggestion | ¿Cómo funciona el piloto? | How does the pilot work? |
| login, the line under the form (target) | ¿Todavía no tienes cuenta? Solicita tu piloto gratuito. | No account yet? Request your free pilot. |
| `es.ts:60` / `en.ts:66` `bookDemo` (FAQ page, module pages, closing band) | = B-1 | = B-1 |
| `home-1103.ts:477` closing band `ctaDemo` "Ver la demo" | = B-1 | = B-1 |

### The FAQ

| Place | ES | EN |
|---|---|---|
| `faq.ts:182` group title | Piloto, planes y precio | Pilot, plans and price |
| Q-11 question | ¿Qué es el piloto? | What is the pilot? |
| Q-11 answer | Usas NuovaSolution en tu agencia sin pagar, acompañado por nosotros, durante un máximo de 90 días. No pedimos método de pago. Antes de empezar te confirmamos por escrito qué está activo y las condiciones. | You use NuovaSolution in your agency without paying, with our support, for up to 90 days. We ask for no payment method. Before you start, we confirm in writing what is active and the terms. |
| Q-12 question | ¿Qué pasa cuando termina el piloto? | What happens when the pilot ends? |
| Q-12 answer | Decides si sigues. El precio te lo explicamos antes de acordar nada. Qué pasa con tus datos lo fija el acuerdo por escrito. | You decide whether to continue. We explain the price before anything is agreed. What happens to your data is set in the written agreement. |
| Q-13 question | ¿Cuánto cuesta? | What does it cost? |
| Q-13 answer (replaces 1108 P-4) | El piloto es gratuito. El precio para después del piloto te lo explicamos antes de acordar nada. | The pilot is free. We explain the price for after the pilot before anything is agreed. |

### Retire

Every remaining "14 días" / "14 days" string on the public site, from the list `git grep "14 d"` gives at `9a10d4c`:
- `es.ts` 63, 412, 447–448, 494;
- `en.ts` 69, 164, 278, 292, 329, 350, 405, 426, 437, 450–451, 486–487, 495, 533, 544;
- `faq.ts` 188–202, 232.

Each place takes the matching line above or goes.

### Not changed here

- **The terms page** (`legal.ts:131–132`, "La prueba es gratuita durante 14 días"). That is counsel's text. Copy's proposal for counsel: "El piloto es gratuito y no requiere ningún método de pago. Sus condiciones se acuerdan por escrito." / "The pilot is free and requires no payment method. Its terms are agreed in writing."
- **The app's own trial words** (`app-words.ts`, onboarding "quedan {days} días"). They describe the product's account state, not the offer, and follow API's pilot register.

---

## 7. The other text places of Redesign's §6 (`REFERENZEN_1109_v1.md`, `8e74ab3`)

### Hero: the "message arrives" bubble (for the Ken Burns picture)

| # | ES | EN | Rule |
|---|---|---|---|
| H-b1 | Nueva consulta · WhatsApp | New enquiry · WhatsApp | bubble title |
| H-b2 | «Hola, soy Laura. ¿Podría ver alguno la semana que viene?» | "Hi, I'm Laura. Could I see one next week?" | the demo's own Laura, shortened |
| H-b3 | Respondida · 11:21 | Answered · 11:21 | shows after a moment. A clock time, no "segundos", no ticks |

The hero's three ticks on the photo: if they stay as a glass card, they keep their wording of §16 (H-1 to H-3).

### Live demo

| # | Place | ES | EN | View |
|---|---|---|---|---|
| D-p | line above the chips (P-6; replaces "Elige un canal y mira cómo responde.") | Pulsa un canal y mira cómo responde. | Tap a channel and see how it replies. | both |
| D-f1 | Laura sends a file (the new moment in the WhatsApp run) | «Os mando el plano del que me gusta.» + a picture of a floor plan | "Here's the floor plan of the one I like." + a picture of a floor plan | **target only** until MM confirms (§3) |
| D-f2 | the reply | Gracias, Laura. Veo un plano de 2 dormitorios con terraza. ¿Te viene mejor por la mañana o por la tarde para verlo? | Thank you, Laura. I can see a 2-bedroom plan with a terrace. Would the morning or the afternoon suit you better to see it? | target |
| D-f3 | the record's new field | Archivo · plano: 2 dormitorios, terraza | File · plan: 2 bedrooms, terrace | target |

**D-f2 follows MM's rule** for a photo: it states only what the picture shows and asks at most one question. It promises no contact
and no appointment, as owner Question A requires. The plan in the picture must really show 2 bedrooms and a terrace.

### Atiende / Organiza / Crece, beyond §2

- **The file point** goes in Atiende as F-0 (§3), target only. If Atiende then has five points, A-3 moves to Organiza.
- **Instagram (Redesign's Crece list) stays out of the card.** `instagram` is soon, nothing has been published at Meta, and the owner's list for Crece does not name it. It stays a row in the plans table.

### 3D: correct the floor times in Redesign's plan

Redesign's §6 row 6 says "Erdgeschoss 0–9 s, Obergeschoss 9–18 s". **That is not the clip.** 3D (`61b5072`) gives the order: the upper
floor first (1.9–7.3 s), then the ground floor (7.3–18.4 s). Use the table in §5.

### Phone bar and phone number

- The fixed bar carries B-1, or B-1s where B-1 does not fit.
- The company number's label is **Teléfono** / **Phone**. It shows as a number only, publicly only with the owner's acceptance (Redesign's point 14).

---

## 8. Open, who answers by when

| # | Question | Who | By |
|---|---|---|---|
| Q-MM (the owner routes it) | Per medium (photo, plan, PDF, voice note) × channel (WhatsApp, e-mail): live in production today, yes or no, with the run or the step (for example `28a` / "24z"). Is the unreadable-file reply live? Voice notes: still Spanish only? | MM | today, so the lines go public on Mon |
| Q-3D | **answered 13.11.** (`61b5072`), built into §5. 3D then confirmed Copy's 3-1 (the agency as subject), the floor seconds and card 3-t3 by message; no further deviation | 3D | done |
| Q-A1 | "En segundos": the time from arrival to sending over real production runs (median and maximum, number of runs) | Lead (owner, 13.11.) | before the build is named |
| Q-A2 | Intent values buy / rent / sell on the production record | Lead (owner, 13.11.) | before the build is named |
| Q-L | Is there a score in production now? If not, priority with reason stays (§2) | Lead | only if it changed |
