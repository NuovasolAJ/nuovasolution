# COPY → Lead, MM, Daily · AI notice once per conversation (F12), the agent's lead card (F16), the staff mails (F18) · Mon 16.11.2026

**Written for:**
- **Lead and MM**: F12 and F16. Lead renders the card and decides F12 together with counsel.
- **Daily**: F18, which renders the task mails.

The readers of the result:
- for F12, the agency's customer;
- for F16 and F18, the agent and the agency's staff, in Spanish.

**Error list rows:** F12, F16, F18 (`governance/FEHLERLISTE_PROD_1113_v1.md`, `9f7f2b19`, n8n repo).

**Status:** WORKING. Editorial and technical, not a legal approval, not a Meta approval.

**What Copy read:**
- the owner's screenshots of 13.11. (`owner_evidence_1113/staff_mails_1113`, outside the repo; no number or address from them is copied
  here);
- MM's fix plan (`MM_MEDIEN_ANTWORT_FIX_1113_v1.md`, U5/F5);
- Lead's signal of 13.11. (`ffcc77d5`);
- API's AI-notice state (`API_OWNER_TEXT_1106_ABEND_v1.md` §4);
- Copy's AI-notice drafts (`COPY_TO_API_1106_AI_NOTICE_EN_DE_v1.md`).

---

## 1. F12 · AI notice once per conversation (decision Tue 17.11. 12:00: Lead, Copy, counsel)

**Today:** the notice hangs on **every** reply (`[WA: Apply Disclosure]`, rule R16 / H6 no. 4), so all four replies of 13.11. carried it.

**MM's reading, which counsel confirms:** AI Act art. 50 asks for the notice at the latest at the first interaction, not in every
message.

### 1.1 When the notice appears: **DECIDED by the owner, 16.11.** (counsel releases it)

| # | Moment | Notice |
|---|---|---|
| N-1 | the **first automatic reply per contact and per channel** | **yes**, at the **start** of that reply, before the answer. A contact who first wrote by email and later writes on WhatsApp gets it again on WhatsApp |
| N-2 | further automatic replies to the same contact on the same channel | no (email: P-0 in the footer, 1.2) |
| N-3 | **after 30 days without messages** from that contact on that channel | **yes**, with the next automatic reply |
| N-4 | **the language changes**: the contact writes in a different language from then on | **yes, once**, with the first automatic reply in the new language |
| N-5 | **on request**: the contact asks whether they are talking to a person or a machine | **always** the truthful answer (1.3), in every message where they ask |
| N-6 | **the notice text changes** (a new approved version) | **yes, once** per contact and channel, with the next automatic reply |

**Withdrawn from Copy's proposal:**
- the hand-back from a person to the assistant (old N-4);
- the 14-day ENQ2 window (old N-5).

The owner's rule uses 30 days of quiet instead.

**Memory per contact and channel:**
- API stores "notice shown" with the channel, the language, the version and the time. Hosting builds it in (MM F5).
- If the memory cannot be read, the notice goes out (**fail open towards disclosure**). A missing notice is the worse mistake.

### 1.2 Email: **DECIDED, option B**

Every mail after the first one carries the short line P-0 in the footer, because an email is often forwarded or read on its own.
WhatsApp has no P-0.

| # | ES | EN | DE (Sie) |
|---|---|---|---|
| P-0 | Respuesta preparada por el asistente de inteligencia artificial de {{agency_name}}. | Reply prepared by the artificial intelligence assistant of {{agency_name}}. | Antwort erstellt vom KI-Assistenten von {{agency_name}}. |

P-0 sits above P-1 in the customer-mail footer (`COPY_TO_API_1113_CUSTOMER_MAIL_FOOTER_v1.md` §3), in **every** customer mail, including the
first one. The first mail carries the full notice at the top **and** P-0, which is harmless and keeps the rule simple for the render. If
counsel wants P-0 only from the second mail on, Lead drops it from the first.

### 1.3 The notice texts themselves

**The notice texts:** this file changes **no approved text**. Approved and pending versions as API's §4 lists them:
- `v1.0-es` is for `nuovasolution` only;
- `v1.1-es` is the base for agencies and is still pending with counsel;
- EN and DE are drafts.

**Proposed new text: N-5, the truthful answer.** It is a reply rule for Lead, not a notice text. Spanish uses **tú** (owner, 16.11.).

| ES (tú) | EN | DE (Sie) |
|---|---|---|
| Soy el asistente de inteligencia artificial de {{agency_name}}. Si prefieres hablar con una persona del equipo, dímelo y aviso al equipo. | I am the artificial intelligence assistant of {{agency_name}}. If you would rather talk to a person on the team, tell me and I will let the team know. | Ich bin der KI-Assistent von {{agency_name}}. Wenn Sie lieber mit einer Person aus dem Team sprechen möchten, sagen Sie es mir, dann gebe ich dem Team Bescheid. |

**Condition for N-5.**
- "Aviso al equipo" holds only if such a request really creates a takeover task. It promises no time and no call.
- **Owner, 16.11.:** N-5 goes live only once F28 is in production (Lead, Fri 20.11. at the earliest).
- Until then, the truthful answer is only the first sentence: "Soy el asistente de inteligencia artificial de {{agency_name}}." /
  "I am the artificial intelligence assistant of {{agency_name}}." / "Ich bin der KI-Assistent von {{agency_name}}."

### 1.4 What stays in any case

- No reply goes out to a new contact or channel without an approved notice in its language. DE and EN are held today (F07).
- The notice never sits in the middle or at the end of a reply, where it reads like small print.

---

## 2. F16 · The agent's lead card in Spanish (with Lead)

**What the card shows today (owner's screenshot, 13.11., 15:12):**
- **Mixed languages:**
  - English labels: "HOT LEAD", "Buyer Lead — Purchase", "Score", "Channel: WHATSAPP", "Property Interest", "Details", "Qualification
    Incomplete", "Viewing allowed: No", "Missing: intended use", "Request more information";
  - Spanish labels: "Ubicación", "Presupuesto", "Próximo paso", "Contacto", "Detalles";
  - a German block: "Früherer Kontakt … Kategorie … Temperatur: Cold".
- **Amount** written as "350000 EUR".
- **The phone number** without "+" or spacing.

**Rule:** one language per card, the agency's (Spanish for now). The customer's language becomes a field ("Escribe en alemán").

### 2.1 The labels

| # | Today | ES (new) | Note |
|---|---|---|---|
| L-s | subject "🔥 HOT LEAD - Purchase \| Erja \| 350000 EUR" | Prioridad {{alta/media/baja}} · Compra · {{zona}} · {{presupuesto}} | missing parts are dropped, never "—" |
| L-1 | "🔥 HOT LEAD" | Prioridad alta · Prioridad media · Prioridad baja | **owner, 16.11.:** the level in words, no number. The site's word (D-10 bans "hot lead" in public; the card follows the site). Lead maps its levels to the three words |
| L-2 | "Buyer Lead — Purchase" | Quiere comprar · Quiere alquilar · Quiere vender · Quiere poner en alquiler | from the intent; one phrase |
| L-3 | "Score: 73" | Motivo: {{motivo}} | **no number on the card**, see 2.4 |
| L-4 | "Channel: WHATSAPP" | Por WhatsApp · Por email · Por el formulario web · Por teléfono | |
| L-5 | "Ubicación" | Zona | |
| L-6 | "Presupuesto" | Presupuesto | value per 2.2 |
| L-7 | "Property Interest" + "URL" | Inmueble de esta consulta | only a listing from **this** enquiry (F14); link text "Ver anuncio en {{portal}}" |
| L-7a | (new, from PM's fields) | {{precio}} · {{dormitorios}} dormitorios · {{zona}} · ref. {{ref}} | only fields PM reads; nothing estimated |
| L-7b | (new, ENQ2 rule 4) | El precio está por encima de su presupuesto. | only when the listing price > the known maximum |
| L-8 | "Details: Client appears to be asking about a specific property/listing." | Pregunta por un inmueble concreto. | |
| L-9 | "Qualification Incomplete" | Falta por saber | |
| L-9a | "Missing: intended use" | Para qué la quiere: vivir, invertir o alquilarla. | one phrase per missing field, 2.3 |
| L-10 | "Viewing allowed: No" | Visita: todavía no, falta {{lo que falta}}. · Visita: se puede proponer. | |
| L-11 | "Próximo paso" / "Request more information" | Siguiente paso: {{paso}} | 2.3 |
| L-12 | "Contacto" + bare number | Contacto · Teléfono {{+código país, en grupos}} · Email {{email}} | format only; no phone taken from a link (F03) |
| L-13 | "Detalles" (summary) | Resumen | the generated sentence follows 2.2 for the budget |
| L-14 | (new) | Escribe en {{idioma}}. | only if the customer's language is not Spanish |
| L-15 | "Früherer Kontakt (Stand …, nicht aus dieser Anfrage): Kategorie … Ort … Budget … Temperatur: Cold" | Contacto anterior · {{fecha}} · no es de esta consulta: {{intención}} · {{zona}} · {{presupuesto}} | no "Temperatura"; a wrong old value (F15) is Lead's fix, not a label |
| L-b | (new, if a link to the record exists) | Abrir ficha | |
| L-from | sender name = the owner's personal name (F17) | {{agency_name}} · Avisos | suggestion only; F17 belongs to Lead and API |

### 2.2 Numbers and words for the budget

- **Amounts:** "350.000 €" (dot for thousands, € after a space), never "350000 EUR".
- **Budget wording:**
  - a maximum the customer stated (`hard_max`): "hasta 300.000 €";
  - an approximate figure the customer stated: "unos 350.000 €";
  - a range: "entre 250.000 y 300.000 €";
  - no budget: the row goes, and "presupuesto" appears under Falta por saber.
- **"Aproximado" only if the customer said so** (F06).
- **Place names** exactly as stored after the merge check (F11). The card does not correct "Erja" by itself; that is MM's and Lead's fix.
- **Dates:** "vie 13 nov, 15:12"; today → "hoy, 15:12".

### 2.3 Missing fields and next steps (Lead gives the codes, Copy fills the words)

| Code (Lead confirms the real names) | Falta por saber | Siguiente paso |
|---|---|---|
| `intended_use` | Para qué la quiere: vivir, invertir o alquilarla. | Preguntarle para qué la quiere. |
| `budget` | Presupuesto. | Preguntarle su presupuesto. |
| `location` | Zona. | Preguntarle en qué zona busca. |
| `property_type` | Tipo de inmueble. | Preguntarle qué tipo de inmueble busca. |
| `bedrooms` | Dormitorios. | Preguntarle cuántos dormitorios necesita. |
| `timeframe` | Cuándo quiere comprar. | Preguntarle para cuándo lo necesita. |
| `request_more_info` (next step) | — | Pedirle lo que falta: {{lista}}. |
| `propose_viewing` (next step) | — | Proponerle una visita. |
| `call` (next step) | — | Llamarle hoy. |
| `send_similar` (next step) | — | Enviarle inmuebles parecidos de tu cartera. |

A code with no row here is shown as nothing, not in English. Lead sends the full list; Copy adds the rows the same day.

### 2.4 The score: the card and the website must say the same thing

- **The data hold a score.** The card shows "Score: 73", and Lead's reading of 13.11. lists scores 45, 65, 53 and 80 in the `leads` table.
- **The public website says there is none.** `components/site/product-views.tsx:54` reads "NuovaSolution no calcula una puntuación." /
  "NuovaSolution computes no score." That sentence is **false**, and it is public.
- **Copy's proposal:**
  - **website:** strike only the second sentence and keep "Motivo: nombró inmueble, zona y presupuesto." It goes to Redesign as a public
    fix (`COPY_TO_REDESIGN_1113_TEXTS_10V10_v1.md` §6, Retire);
  - **card:** no number. The agent reads the priority and its reason, which is what the site promises ("un aviso con el motivo",
    `faq.ts:147`).
- If the owner wants the number visible, Lead says so; then the site gets a line about it, written from Lead's definition.

---

## 3. F18 · The staff mails in Spanish (with Daily)

**What they show today (owner's screenshots, 13.11.):**
- the task title "Property request (matching off)", an internal name;
- the key "(E19 · gmail::…)" at the end, which on WhatsApp carries the full number;
- no word about who the client is or what they want;
- an escalation that says "No hay otro compañero disponible", with no instruction.

### 3.1 Task titles (instead of the internal name)

| Task type (Daily confirms the names) | Title |
|---|---|
| `property_request` (matching off) | Buscar inmuebles para {{nombre}} |
| `callback` | Llamar a {{nombre}} |
| `viewing_request` | Organizar la visita de {{nombre}} |
| `callback_request` | the same as `callback` (Daily, 16.11.) |
| pilot request (API, new from Wed 18.11.) | Contestar la solicitud de piloto de {{agencia}}. If the form chose "Contratar un plan": Enviar la propuesta a {{agencia}} |
| any other type | Atender la consulta de {{nombre}} |
| no name known | the same, with "este cliente" instead of {{nombre}} |

### 3.2 The client line (new, in every staff mail)

`Cliente: {{nombre}} · Por {{canal}} · {{intención}} · {{zona}} · {{presupuesto}}`

Missing parts are dropped. Budget and dates follow 2.2. **No phone number and no email address** in the line: they are on the record.

### 3.3 The three mails

> **18.11. (owner F1):** T-3 and T-3b are retired, so there is no escalation mail. T-2's last sentence is replaced by R-a … R-c in `COPY_TO_DAILY_1118_REMINDER_SENTENCE_v1.md`.

| # | Subject | Body |
|---|---|---|
| T-1 new | Tarea nueva sin asignar · {{título}} | Hay una tarea nueva sin asignar: {{título}}. ⏎ {{línea de cliente}} ⏎ Sin asignar desde: {{hora}} ⏎ Si nadie la toma, enviamos un recordatorio {{hora del recordatorio}}. ⏎ Ábrela en la app del equipo para asignártela. |
| T-2 reminder | Recordatorio · {{título}} sigue sin asignar | La tarea {{título}} sigue sin asignar desde {{hora}}. ⏎ {{línea de cliente}} ⏎ Si nadie la toma, avisamos a {{destinatario de la escalada}} {{hora de la escalada}}. ⏎ Ábrela en la app del equipo para asignártela. |
| T-3 escalation, someone else is told | Sin asignar desde {{hora}} · {{título}} | Nadie ha tomado esta tarea desde {{hora}}: {{título}}. ⏎ {{línea de cliente}} ⏎ Te avisamos porque eres {{rol}}. Ábrela en la app del equipo y asígnala. |
| T-3b escalation, no one else to tell | Último aviso · {{título}} sin asignar | Nadie ha tomado esta tarea desde {{hora}} y no hay otra persona a quien avisar. Este es el último aviso. ⏎ {{línea de cliente}} ⏎ Ábrela en la app del equipo y asígnatela. |

**Rules:**
- **No key in any mail.** If support needs a reference, Daily shows a short task number with no phone, no email and no thread ID
  ("Tarea n.º {{n}}"). If no such number exists, nothing is shown.
- **{{destinatario de la escalada}}** is a name or a role that Daily knows. If none is known, T-2 says "Si nadie la toma, este será el
  último aviso." Copy writes no "se escala" without saying to whom.
- **Times:** "a las 16:00" today, "mañana a las 9:00", or "vie 13 nov a las 16:00".
- **WhatsApp version:** the first sentence plus the client line plus "Ábrela en la app del equipo." Never the key, never the number.
- **Seen in the screenshots, Daily's to check:** the first mail says "Sin asignar desde: 15:00" for a task that arrived at 15:05, and a
  second chain says 15:12. The time in the mail must be the task's real time.

---

## 4. Open, who answers by when

| # | Question | Who | By |
|---|---|---|---|
| Q-F12 | **decided 16.11. by the owner** (counsel releases): N-1…N-6 as in 1.1, option B | — | done |
| Q-F12b | Does "quiero hablar con una persona" create a takeover task? (condition for N-5) | Lead | Tue 17.11. 12:00 |
| Q-F16 | The real codes for missing fields and next steps (2.3); the card's sender (F17) | Lead | with ENQ2, Tue 17.11. |
| Q-F16b | **decided 16.11. by the owner:** no number on the card; "Prioridad alta/media/baja" plus the reason. Spanish uses tú | — | done |
| Q-F18 | **answered 16.11. by Daily** (`DAILY_SIGNALS_1107.md`, 08:58Z): types `property_request`, `viewing_request`, `callback`, `callback_request` (= `callback`), plus the pilot request from Wed (title in 3.1). There is no short task number, so no reference is shown; "Ábrela en la app" opens the task itself. New and reminder go to the first responsible person; the escalation goes to the next person of the same agency (T-3, with name); if there is none, to the agency's admin as T-3b "Último aviso". T-2 names that person, or says "este será el último aviso" | — | done |
| Q-F18b | **answered 16.11. by Daily:** the time is the task's real time; E19 runs every 5 minutes. Daily adds "Sin asignar desde las 15:00" with the day when it is not today | — | done |
