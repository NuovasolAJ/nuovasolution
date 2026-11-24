# Copy → Audit, Redesign, API (cc Owner, RV6): narrower lines for RV6 E-0, E-0b, E-1 and the task card, and the wording choice for W-10 · 24.11.2026, due Wed 25.11. 12:00

**Order:** Audit, 24.11.:
> "Zusatz aus RV6 de152f8: bitte engere Sätze ES/EN vorschlagen für „Ninguna consulta se queda sin aviso" (gilt nur mit Bürozeiten), „Ninguna llamada perdida en una visita" (Telefon ist nicht in Prod), E-1 „Medido en producción: email en unos 2 minutos…" (Bezug nennen oder streichen) und die Beispielkarte „Llamar a Mila… / TAREA PARA MARTA" (der Name im Titel kommt heute mit Leads Main, Rollen je Person fehlen in Prod). Dazu APIs Antwort zu W-10 (660e08f: consultas = Nachrichten) in eine Wortlautwahl übersetzen. Redesign baut erst nach dem Owner-Feedback."

**Sources:**
- RV6 `de152f8` (`REVIEWER_LUECKENLISTE_REGISTER_bea7d19_v1.md` §E);
- Audit's register n8n `704960b6` (lines 17–19, 9, 1, 3, 21, 22, 25);
- API `660e08f` (`API_TO_COPY_1124_CONSULTAS_COUNTS_MESSAGES_v1.md`);
- the build at HEAD: `lib/content/home-1103.ts`, `strengths.ts`, `brief-1120.ts`, `home-demo.ts`.

**Status:** an editorial and technical check, not a legal approval.

**The rule for all four:** owner decision 2 (the preview at 100 %) allows a planned function to be described in the present tense. It does not allow two things:
- an **absolute** promise ("ninguna…") that the mechanism does not hold under every condition;
- a **proof sentence** ("medido / en producción desde…") whose reference is left open.

So the function stays, and the absolute word and the open reference go. **Build only after the owner's feedback on the two paths.**

---

## 1. E-0: "Ninguna consulta se queda sin aviso" (`home-1103.ts:430–434`, key `reminders`)

**The problem:** the reminder after 1 h and the handover after 2 h count in the agency's office hours. Without office hours there is neither (register lines 17–19; 4 of 5 prod agencies have none).

| Field | Today | ES (proposed) | EN (proposed) |
|---|---|---|---|
| `name` | Ninguna consulta se queda sin aviso | **Si nadie la atiende, te avisamos** | **If nobody takes it, we tell you** |
| `line` | Si nadie del equipo se ocupa de una consulta, al cabo de una hora se lo recordamos a la persona responsable. A las dos horas, la consulta pasa a la siguiente persona. | Si nadie del equipo se ocupa de una consulta, al cabo de una hora se lo recordamos a la persona responsable. A las dos horas, la consulta pasa a la siguiente persona. **Las horas cuentan dentro del horario de tu agencia.** | If nobody on the team takes an enquiry, after one hour we remind the person responsible. After two hours, the enquiry passes to the next person. **The hours count within your agency's opening hours.** |
| `proof` | Recordatorio a la hora, en producción desde el 13.11.; el paso a la siguiente persona, desde el 20.11. | **Recordatorio a la hora y aviso a las dos horas, probados en nuestra propia agencia el 19.11.** | **Reminder after one hour and alert after two, tested in our own agency on 19.11.** |

**Why the proof changes:**
- The register proves the reminder (run 195149) and the escalation after 2 h (run 195288), both on 19.11., on `nuovasolution`.
- The escalation went to the owner, because the agency has one active person.
- A **handover to the next person** has not been observed (the build's own comment: "no real handover observed yet").
- So the proof names what was measured, where and when. The line above keeps the planned function, including the handover.
- **If AGENCY-HOURS-PROD gives every new agency its hours at the start,** the sentence about opening hours stays true. It also tells the agency why its hours matter.

## 2. E-0b: "Ninguna llamada perdida en una visita." (`strengths.ts:36`, card `t2`, key `phoneAssistant`)

| Field | Today | ES (proposed) | EN (proposed) |
|---|---|---|---|
| `phone` (the card's short line) | Ninguna llamada perdida en una visita. | **Coge la llamada cuando tú no puedes.** | **Takes the call when you can't.** |
| `line` | Cuando estás en una visita, el asistente coge la llamada, anota qué busca y te deja la tarea. | unchanged | unchanged |
| examples, 2nd line | Atendida · la villa de Elviria, precio y margen | **Atendida · la villa de Elviria; precio y margen, para ti** | **Answered · the villa in Elviria; price and room to negotiate, for you** |

**Why:**
- The phone is not in prod (line 9, build, counsel E1). "Ninguna" promises an outcome for every call.
- The new line describes what the function does, without "ninguna".
- **The example line:** "precio y margen" read as if the assistant had discussed price and margin with the caller. The phone rule is "no confirma citas ni da precios" (line 45, Copy `35c886f`). The new line puts the topic in the task for the agent.

## 3. E-1: "Medido en producción: …" (`home-1103.ts:448–449`, `phoneCore.areas.attend.proof`), and the same class in `phoneCore.flow.proof`

**Copy's choice: name the reference, do not strike.** It is the only measured figure on the page, it is true, and naming whose production it was makes it honest.

| Key | Today | ES (proposed) | EN (proposed) |
|---|---|---|---|
| `attend.proof` (with WhatsApp) | Medido en producción: email en unos 2 minutos, WhatsApp en el mismo minuto. | **Medido en nuestra propia agencia: email en unos 2 minutos, WhatsApp en el mismo minuto.** | **Measured in our own agency: email in about 2 minutes, WhatsApp within the same minute.** |
| `attend.proof` (without WhatsApp) | Medido en producción: respuesta por email en unos 2 minutos. | **Medido en nuestra propia agencia: respuesta por email en unos 2 minutos.** | **Measured in our own agency: an email reply in about 2 minutes.** |
| `flow.proof` (same class, not in RV6's list) | Probado en producción el 13.11. | **Probado en nuestra propia agencia el 13.11.** | **Tested in our own agency on 13.11.** |

**[INTERNAL] for Audit:**
- There is no register line for reply times. Please add one with the measurement: run IDs for "unos 2 minutos" and "en el mismo minuto", on `nuovasolution`, and on our own number for WhatsApp (line 3).
- **If Audit cannot find the measurement,** both `attend.proof` lines go, and the core line carries alone: "Contesta en segundos por WhatsApp y en minutos por email." Copy then writes no figure.

## 4. The task card: "Llamar a Mila · … / TAREA PARA MARTA" (`brief-1120.ts:36, :44`; `home-demo.ts:165–166`)

**The register says:**
- **line 21:** the client's name in the title comes with Lead's Main (5338f939, prod window Tue 24.11. 12:00–13:00); the **property reference in the title is not proven**;
- **line 22:** that a later answer updates the open task (P-14, "hoy a partir de las 17:00") is build, uncertain;
- **line 25:** roles per person (an assignment "para Marta") are not in prod.

| Key | Today | ES (proposed) | EN (proposed) |
|---|---|---|---|
| `brief-1120.ts` `scene.task`, `home-demo.ts` `taskHead` | Tarea para Marta | **Tarea abierta** | **Open task** |
| `brief-1120.ts:44` task title (hero) | Llamar a Mila · Comprobar disponibilidad de la ref. 9895153 | **Llamar a Mila · Comprobar disponibilidad del inmueble** | **Call Mila · Check whether the property is available** |
| `home-demo.ts:165` `next.v` (demo end) | Llamar a Mila hoy a partir de las 17:00 · Comprobar disponibilidad de la ref. 9895153 | **Llamar a Mila · Comprobar disponibilidad del inmueble** | **Call Mila · Check whether the property is available** |
| `home-demo.ts` `next.sub` | Mila ya tiene respuesta. La llamada sigue esperando a Marta. | **Mila ya tiene respuesta. En su ficha: la ref. 9895153 y que prefiere que la llamen a partir de las 17:00.** | **Mila already has her answer. On her record: ref. 9895153, and that she would like a call from 5 pm.** |

**Why it holds this way:**
- The **name** is in the title. If Lead's Main goes to prod today, as register line 21 plans, it is true.
- The **reference and the time** move from the task title to the record. The conversation stays on the client's record (`crm`, included, line 11), so the agent finds both there without the task being changed (P-14 is no longer needed).
- **"Tarea abierta"** says what the card is, without an assignment to a person that needs roles. "La llamada sigue esperando a Marta" goes for the same reason.
- **Unchanged:** the hero question "¿quién atiende a Mila?", Mila's WhatsApp, W-2 ("soy el asistente de Marta") and the caption "Estás en una visita · 11:40". They tell the story; they promise no assignment.
- **If Lead's Main is not in prod today,** the name in the title is not proven either. Audit then decides whether the labelled example ("Ejemplo · datos ficticios") may carry it. Copy's fallback would be "Llamar al cliente · Comprobar disponibilidad del inmueble" / "Call the client · Check whether the property is available".

**For the owner:** this narrows path 1, on which he gives his feedback. The before/after stays the same: WhatsApp → an answered client → an open call task. What changes is that the task no longer names a time and a person.

---

## 5. W-10: "consultas" counts messages (API `660e08f`). The wording choice

**API's finding:** `counts.received` counts every incoming client message. Prod W47: **19 messages from 4 people**, one of whom wrote 12 times. "19 consultas" reads as nineteen enquiries.

**API's two options:** (1) keep the figure and change the word to "mensajes"; (2) keep the word and change the figure to count people. Option (2) is a contract change with its own owner line, and prod would show 4.

**Copy recommends (1) now, and (2) as an addition later, never instead of (1):**
- (1) is true today in mail, text and login, with no data change.
- (2) is what an agency actually wants to know ("¿cuánta gente me escribió?"). When the field exists, it **adds** to the figure: "19 mensajes de 4 personas". It never replaces the message figure.
- **The owner decides.** The lines below are for (1).

### 5.1 The weekly mail (file dc62154f; API builds)

| Place | Today ES | ES (1) | EN (1) |
|---|---|---|---|
| subject, n | Tu semana en NuovaSolution: {n} consultas recibidas | Tu semana en NuovaSolution: {n} mensajes de clientes | Your week in NuovaSolution: {n} client messages |
| subject, 1 | … 1 consulta recibida | … 1 mensaje de un cliente | … 1 client message |
| subject, 0 | … ninguna consulta esta semana | … ningún mensaje de clientes esta semana | … no client messages this week |
| figure label | Consultas recibidas | Mensajes de clientes | Client messages |
| summary, n | Llegaron {r} consultas. | Recibiste {r} mensajes de clientes. | You received {r} client messages. |
| summary, 1 | Llegó 1 consulta. | Recibiste 1 mensaje de un cliente. | You received 1 client message. |
| summary, 0 | Esta semana no llegó ninguna consulta{…}. | Esta semana no llegó ningún mensaje de clientes{…}. | No client messages arrived this week{…}. |
| comparison, m | La semana anterior llegaron {m} consultas. | La semana anterior llegaron {m} mensajes. | The week before, {m} messages arrived. |
| comparison, 1 | La semana anterior llegó 1 consulta. | La semana anterior llegó 1 mensaje. | The week before, 1 message arrived. |
| comparison, 0 | La semana anterior no llegó ninguna consulta. | La semana anterior no llegó ningún mensaje. | The week before, no messages arrived. |

**The "atendidas" variants** ("{n} consultas atendidas", "Llegaron {r} consultas y se atendieron {a}"):
- They stay out while `answered` is null.
- If `answered` is ever filled, it must count the **same unit**. Then the line is "Recibiste {r} mensajes de clientes y se respondieron {a}." / "You received {r} client messages and {a} were answered."

### 5.2 The report text (`generate_report`, with T33-TEXT v2)

| Place | Today | ES (1) |
|---|---|---|
| figure | Consultas recibidas: {n} | Mensajes de clientes: {n} |
| counting line (with T-3) | Base de datos: consultas = mensajes de clientes contados en el periodo (la misma cifra que el resumen semanal por correo); … | Cómo contamos: mensajes de clientes = cada mensaje que escribe un cliente, contado una vez (la misma cifra que el resumen semanal por correo); contactos nuevos = primer contacto en el periodo; presupuesto y zonas = lo que el propio cliente indicó. |
| no data | Sin datos en este periodo: consultas | Sin datos en este periodo: mensajes de clientes |

### 5.3 The login report (Redesign, `components/app/weekly-report.tsx`)

| Place | ES (1) | EN (1) |
|---|---|---|
| the figure's label | Mensajes de clientes | Client messages |
| E-2 (API): `answered` null | no "0 atendidas de …"; the figure stands alone | the same |

### 5.4 What does NOT change

**The website's "consultas"** stays: "9 de 25 consultas", "Cada consulta en su ficha", the hero.
- There it means an enquiry: one person who asks. That is what the page describes.
- The report counts messages, so the report says messages.

**[INTERNAL] for Redesign and Audit:** the example report (`/example-report`, `example-report.ts`) imitates the real report.
- Once the owner chooses (1), its figure label follows: "Mensajes de clientes".
- Its sentences about "consultas con la oficina cerrada" stay. They describe enquiries in the fictional example.

**[INTERNAL] for API:** an interaction is "one incoming message, or one turn on the phone".
- Once the phone counts, "mensajes" no longer covers it.
- Then the label becomes "Mensajes y llamadas de clientes" / "Client messages and calls". Copy writes the lines when the phone is in prod.

---

## 6. Open

| Who | What |
|---|---|
| Owner | W-10: (1) "mensajes", with Copy's recommendation (2) later as an addition |
| Owner | the narrower task card (§4) on path 1 |
| Audit | a register line for reply times (§3), with the run IDs; otherwise `attend.proof` goes |
| Audit | §4 fallback, if Lead's Main is not in prod today |
| Redesign | nothing before the owner's feedback; then §1–§4 and §5.3 word for word |
| API | §5.1 and §5.2 after the owner's line; Q-2 (figures without a source) from `348cdc4` is still open |
