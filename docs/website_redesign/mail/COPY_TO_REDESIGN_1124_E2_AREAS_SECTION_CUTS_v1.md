# Copy → Redesign (cc RV6): E2, "Lo que tu agencia gana": phone lines, points, "Y además" · 24.11.2026, for Wed 25.11. 12:00

**Basis:**
- Redesign's request of 24.11. on the local E2 state `65d92d1` (`lib/content/home-1103.ts`: `functions`, `phoneCore`, `chapterCopy`, `extraCards`).
- The owner's rule for E2: the same statements, far fewer words, the product shown rather than described.

**Status:** an editorial and technical check, not a legal approval.

**All lines below are final.** Word counts are ES; EN is never longer.

## (4) The h2: confirmed

| Key | ES | EN |
|---|---|---|
| `functions.h2` | Cada consulta, atendida y en su sitio. (6 words) | Every enquiry, answered and in its place. |

## (1) The phone: core and proof per area, each ≤ 12 words

**The three core lines already have 10–11 words.** What makes the phone card long is the proof line: today 13–15 words with E-1. Copy shortens the proofs and confirms the cores.

| Area | Key | ES | Words | EN |
|---|---|---|---|---|
| Atiende | `attend.core` (with WhatsApp) | Contesta en segundos por WhatsApp y en minutos por email. | 10 | Replies in seconds on WhatsApp and in minutes by email. |
| Atiende | `attend.proof` (with WhatsApp) | Medido en nuestra agencia: email, unos 2 minutos; WhatsApp, el mismo minuto. | 12 | Measured in our agency: email, about 2 minutes; WhatsApp, the same minute. |
| Atiende | `attend.core` (without WhatsApp) | Contesta en minutos por email, también con la oficina cerrada. | 10 | Replies in minutes by email, even with the office closed. |
| Atiende | `attend.proof` (without WhatsApp) | Medido en nuestra agencia: respuesta por email en unos 2 minutos. | 10 | Measured in our agency: an email reply in about 2 minutes. |
| Organiza | `organise.core` | Cada consulta, en su ficha: qué busca, zona y presupuesto. | 10 | Every enquiry on its record: what they want, area and budget. |
| Organiza | `organise.proof` | Con prioridad y motivo: «nombró inmueble, zona y presupuesto». | 9 | With priority and reason: "named a property, an area and a budget". |
| Crece | `grow.core` | Ves dónde se te escapa negocio y qué hacer esta semana. | 11 | You see where business slips away and what to do this week. |
| Crece | `grow.proof` | Del informe: consultas con la oficina cerrada, canales y visitas acordadas. | 11 | From the report: enquiries with the office closed, channels and agreed viewings. |
| (flow) | `flow.core` / `flow.proof` | **unchanged** (9 / 8 words) | | |

**"nuestra agencia" instead of "nuestra propia agencia":** it saves a word, and the reference stays named (E-1, `6beb985`).

## (2) `chapterCopy`: at most two points per area (desktop)

| Area | `line` | Point 1 | Point 2 |
|---|---|---|---|
| attend | **unchanged:** Contesta en cuanto llega la consulta, también de noche y en fin de semana. | Entiende qué busca y lo guarda en su ficha: zona, presupuesto e intención. / Understands what they want and saves it on the record: area, budget and intent. | Prioridad con su motivo, en cada ficha. / Priority with its reason, on every record. (unchanged) |
| organise | **unchanged:** Cada consulta en su ficha, con lo que toca hacer hoy. (`linePublic` unchanged) | Tareas del día y aviso a la persona que toca. / Today's tasks, and an alert to the right person. (keys `taskList`, `alert`) | Responde automáticamente en español; si escriben en otro idioma, la consulta pasa a tu equipo. / It replies automatically in Spanish; if someone writes in another language, the enquiry goes to your team. |
| grow | **unchanged:** Ves dónde se te escapa negocio y qué hacer esta semana. | Qué entró, qué se contestó y qué sigue esperando a una persona. / What came in, what was answered and what is still waiting for a person. (unchanged) | Cuántas consultas llegaron con la oficina cerrada y qué canal te trae más. / How many enquiries arrived with the office closed, and which channel brings you the most. |

**What goes, and where it still lives:**
- **attend:** "Responde en segundos por WhatsApp…" is the phone core and the line. "comprar o alquilar" and "CRM … sin copiar nada" are merged into point 1.
- **organise:** "El canal de origen en cada ficha" is shown in the demo's record.
- **organise, the language point:** "Hoy" goes. "Hoy … solo en español" sounds like "más idiomas, más tarde", and the owner has excluded words that sound like "later". The fact stays whole: Spanish automatic replies, other languages to the team (L-1, both views).
- **grow:** the channel and closed-office points are merged. "Cuántas visitas se pidieron y cuántas se acordaron" goes. The phone proof still names "visitas acordadas".

## (3) "Y además": one example per card, the product shown instead

| Card | Key | ES | EN |
|---|---|---|---|
| Lee el anuncio | `name` | Lee el anuncio que te envía el cliente (unchanged) | It reads the listing the client sends you |
| | `line` | Si el cliente te manda el enlace de un anuncio, la ficha recoge precio, dormitorios y metros. La disponibilidad la confirmas tú. | If the client sends you a link to a listing, the record picks up the price, bedrooms and square metres. You confirm whether it is available. |
| | `examples` | **one:** Ficha: 320.000 € · 2 dormitorios · 85 m² | **one:** Record: €320,000 · 2 bedrooms · 85 m² |
| | `scene`, `proof`, `mark` | unchanged | unchanged |
| Si nadie la atiende | `name` | Si nadie la atiende, te avisamos (unchanged) | If nobody takes it, we tell you |
| | `line` | Una hora sin respuesta: recordatorio al responsable. Dos horas: pasa a la siguiente persona. Cuenta el horario de tu agencia. | One hour with no reply: a reminder to the person responsible. Two hours: it passes to the next person. Your agency's opening hours count. |
| | `examples` | **none.** The `timeline` (11:20 · 12:20 · 13:20) **is** the example, shown as the product. The three example lines repeated it word for word | the same |
| | `proof`, `mark`, `timeline` | unchanged (E-0 `6beb985`) | unchanged |

**Why the availability sentence moves into the line:** "Si está disponible, lo confirmas tú." was the third example. It is not an example but the rule that keeps the card honest (the assistant never confirms availability). As an example it would have been cut. In the line it stays.

**Word count:** the reminders line drops from 37 to 20 words; the listingLink line stays at about 25.

## For RV6

**Nothing changes in what is promised.** Every statement keeps its key and its register line:
- **attend point 1:** `crm`, `languageNoted`, `priorityWithReason`.
- **organise point 1:** `taskList` + `alert`, with the same `pub: "hide"` as the two old points.
- **E-0 and E-1:** unchanged in meaning; E-1 only drops "propia".
