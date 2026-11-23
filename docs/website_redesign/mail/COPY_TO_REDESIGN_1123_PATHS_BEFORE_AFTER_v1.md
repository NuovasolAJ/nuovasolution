# Copy → Redesign, RV6, Audit: the two phone paths before and after, and the WORKING lines still open in the build · 23.11.2026

**Order:** the owner, 23.11. morning:
> "Zuerst an Redesign: ES/EN-Texte für die zwei Vorher/Nachher-Wege auf dem Handy (WhatsApp → Rückrufaufgabe, Paketwahl → richtiges Formular) inklusive Formular- und Bestätigungstexten, soweit nicht schon in 11cf7a2/d8ebc77."

**Binding:**
- the owner's brief, 20.11. (`6726df1`);
- the owner's clarification, 20.11. 15:18 (n8n `governance/ABSCHLUSSPLAN_ZENTRAL_1105_v1.md`, Audit `a6ae6b45`).

What the clarification sets:
- the target for 04.12. is the full presentation of the finished offer;
- all channels, including WhatsApp on the agency's number;
- all plans;
- no "Próximamente";
- the other pages follow only after the owner's feedback on the two paths.

**Status:** an editorial and technical check, not a legal approval and not a Meta approval.

**What this file adds to `11cf7a2` (phone preview) and `d8ebc77` (stage 1):**
- §1, the before and after of each path in words, so Redesign's before/after views can be labelled and RV6 can compare the same case;
- §2, the WhatsApp demo in Redesign's structure (`lib/content/home-demo.ts`). It is still WORKING there;
- §3, the three WORKING lines left in `lib/content/brief-1120.ts` and `pilot-request.ts`.

Everything else for the two paths is in `11cf7a2` and stays.

---

## 1. Before and after (phone, 390 px)

**"Before"** is the measured build `92f873d`, as in the owner's screenshots M1 and M6. **"After"** is Copy's text in `11cf7a2` and `d8ebc77`.

### Path 1: WhatsApp → callback task

| Step | Before (92f873d) | After |
|---|---|---|
| First screen, question | 9 de 25 consultas llegaron con la oficina cerrada. ¿Quién les contestó? | Mientras enseñas un piso, ¿quién atiende a Mila? |
| First screen, what you see | an example week, then "Pulsa un canal y mira cómo responde." | Mila's WhatsApp and, under it, the task "Llamar a Mila · Comprobar disponibilidad de la ref. 9895153" |
| Channels | Email · Formulario web (Próximamente) · Teléfono (Próximamente); no WhatsApp | WhatsApp · Email · Formulario · Teléfono, WhatsApp first, no mark |
| Result | the e-mail answer to Carmen, the record fills while you watch | the finished task: "Respondida automáticamente · Llamada pendiente", the open availability, the reminder line |
| Main action | Solicita tu piloto gratuito | Ver cómo queda la tarea |

**The out-of-hours question stays** (owner: "bleiben soll"). It moves to directly after the first screen, as the bridge into the demo:

| ES | EN |
|---|---|
| 9 de 25 consultas llegaron con la oficina cerrada. ¿Quién les contestó? | 9 of 25 enquiries arrived while the office was closed. Who answered them? |
| Semana de ejemplo · datos ficticios | Example week · fictional data |

Then the demo follows: screen 1-B of `11cf7a2`.

### Path 2: plan choice → the right form

| Step | Before (92f873d) | After |
|---|---|---|
| Line above the plans | El piloto gratuito de 14 días incluye todo lo de Growth… | 14 días gratis con Essential, sin tarjeta. |
| Essential, button | Empieza 14 días gratis (+ Contratar directamente, + Ver todo lo que incluye, three equal buttons) | Prueba Essential gratis durante 14 días (one button; the other two are text links) |
| Growth, button | Empieza 14 días gratis (the same free entry as Essential) | Pide una demo de Growth |
| Enterprise, button | Contratar directamente | Habla con nosotros sobre Enterprise |
| Said before the click | nothing | "Abre la solicitud de … con … ya elegido." |
| Form | "Solicita tu piloto gratuito", eyebrow "Piloto gratuito · 14 días con Growth" (via plan=growth) | by plan: trial / demo / conversation, the plan preselected |
| Confirmation | Gracias. Te contestará una persona del equipo, en español o en inglés. | by plan, naming exactly what happens next (`11cf7a2`, screen 2-C) |
| Sticky bar | Solicita tu piloto gratuito → | Prueba Essential gratis; hidden on the plans screen |

---

## 2. The WhatsApp demo in `home-demo.ts` (replaces the WORKING lines in the `whatsapp` channel)

Redesign's structure has one message, one reply and a record that fills in. Copy's lines in that structure:

| Field | ES | EN |
|---|---|---|
| `chat.time` | 11:42 | 11:42 |
| `chat.message` | Hola, busco un piso de 3 dormitorios en Nerja, hasta 350.000 €. ¿Sigue disponible la ref. 9895153? ¿Me podéis llamar? | Hi, I'm looking for a 3-bedroom flat in Nerja, up to €350,000. Is ref. 9895153 still available? Could you call me? (translation line) |
| `chat.reply` | Hola, Mila, soy el asistente de Marta. La disponibilidad de la ref. 9895153 te la confirma ella por teléfono. ¿A qué hora te viene bien que te llame? | Hi Mila, I'm Marta's assistant. Marta will confirm by phone whether ref. 9895153 is available. What time suits you for her to call? (translation line) |
| `chat.replyTime` | 11:42 | 11:42 |
| `record.title` | Ficha de Mila | Mila's record |
| `record.updated` | WhatsApp · 11:42 | WhatsApp · 11:42 |
| field Intención | compra | buying |
| field Zona | Nerja | Nerja |
| field Dormitorios | 3 | 3 |
| field Presupuesto | hasta 350.000 € | up to €350,000 |
| field Referencia | 9895153 · disponibilidad sin confirmar | 9895153 · availability not confirmed |
| field Idioma | español | Spanish |
| field Pide | que la llamen | a call back |
| `state` | Respondida automáticamente · Llamada pendiente | Answered automatically · Call still to make |
| `priority` | Alta · nombró un inmueble y pide llamada | High · named a property and asks for a call |
| `next` | Llamar a Mila · Comprobar disponibilidad de la ref. 9895153 | Call Mila · Check whether ref. 9895153 is available |
| `next.sub` | Mila ya tiene respuesta. La llamada sigue esperando a Marta. | Mila already has her answer. The call is still waiting for Marta. |

**Why the reply changes:** Redesign's WORKING reply ("Una persona del equipo comprueba si sigue disponible y te llama.") does not say that an assistant writes it. The site's own rule says: "Cada respuesta automática indica que la escribe un asistente."

**Why `state` changes:** "Consulta registrada" says less than the brief asks. The state must show that the software answered **and** that the call is still open (brief, test task 2).

**Times:** 11:42 for message and reply. The first screen's caption is "Estás en una visita · 11:40". The reply comes in the same minute; that is the measured WhatsApp time ("en el mismo minuto").

**W-3 and W-4** (Mila gives a time, the task takes it over) are in `11cf7a2`, screen 1-B and 1-C. They need a second turn, which this structure does not have. Redesign decides whether to add it. The demo is true without it.

---

## 3. The WORKING lines left in the build

| Key | Today (WORKING) | ES | EN | Why |
|---|---|---|---|---|
| `brief-1120.ts` `global.nav` | Prueba gratis / Free trial | Prueba Essential | Try Essential | a "gratis" without the plan breaks rule T-1 (stage 1 §0). The short form for the menu names the plan; "gratis" stays in the button |
| `brief-1120.ts` `contact.model3d` | Pide un modelo 3D de un inmueble · Nos envías el plano… | **confirmed unchanged** | **confirmed unchanged** | the body promises only what is confirmed in writing |
| `brief-1120.ts` `contact.model3d` confirmation | — | Gracias. Una persona del equipo te escribe en 24 h laborables para confirmarte qué incluye el modelo, el precio y la entrega. | Thank you. A person from our team will write to you within 24 working hours to confirm what the model includes, the price and the delivery. | 3D had no confirmation of its own |
| `pilot-request.ts` form labels and errors | WORKING (Copy) | **confirmed** as listed in `11cf7a2`, screen 2-B | **confirmed** | EN e-mail label "Work email" |

---

## 4. Open, unchanged

| # | Who | What |
|---|---|---|
| — | API | the plan differences and form targets (Copy's questions E-1 to E-6 in `11cf7a2` §3; the Enterprise proposal in `COPY_TO_API_1123_ENTERPRISE_DIFFERENCES_v1.md`) |
| — | Audit | P-1 to P-16 go into the promise register (owner, 23.11.) |
| Q-1 | owner | Essential on request or self-start (default: on request) |
| Q-2 | owner | the +7 days with feedback (default: on no customer page) |
| Q-3 | owner | `legal.ts:132` |
