# WEBSITE COPY 1020 — the text check on `deb9b66`

**State:** `2026-10-20` · **Lane:** Website Copy / Product Truth → **Website**, **Reviewer**, **Social** (§5).
**Checked build, verified, not assumed:** the fixed deployment URL
`https://nuovasolution-design-preview-7p2xkf9hm-nuovasolajs-projects.vercel.app` answers `/api/build` with
`commit deb9b66c43d0…`, `deployment dpl_GyrsjqBQcCdg7KEXccKdUkE4v5nc`, `mode stub`. **The branch alias
already serves `83f428c`**, a documentation commit on top with no code difference; every reading below is
from the fixed URL, so it is exactly the named build.
**Routes read:** `/es`, `/en`, `/es/platform`, `/en/platform`, `/es/packages`, `/es/legal/imprint`
(→ `/es/legal/notice`), `/es/legal/privacy`, `/es/legal/terms`, `/es/legal/data-deletion`.
**Desktop and phone width:** read from the HTML, including every width-specific container. **No claim text
differs between the two widths**: the only desktop-only elements are the preview badge and a replay
control. This is a text check across both variants, not a visual check of line breaks on a handset; that
stays with the Reviewer and the owner.
**Evidence:** Gate §18's promise table. **Rule:** public lines only from the production column.
**Marking:** technical and editorial check. **Not a legal approval, not a Meta approval.**

---

## 1. My 18 rows on `deb9b66`

The exec table scheduled this list for the **next** targeted pass after this build, so a row not applied
yet is the expected state, not a defect. What the build did apply is listed first.

| # | Where | State on `deb9b66` |
|---|---|---|
| R-1 | hero state line | **applied in substance.** It reads "Hoy: WhatsApp y email, respuestas en español. En otro idioma no se envía nada automáticamente." That is correct and slightly better than my row, because it says the limit in the same line. **Keep it** |
| R-2 | hero lead "en su idioma" | **applied** — 0 hits |
| R-3 | flow lead "idioma del cliente" | **applied** — 0 hits |
| R-11 | "una sola ficha por cliente" | **applied** in that form — 0 hits; but see R-19 below, the claim survives in two other sentences |
| F-R16-5 rest | "lo que falta … es la aprobación legal del aviso, no la función" | **gone** — 0 hits. Closed |
| R-4 | story B title "Cada cliente recibe…" | open — 1 hit |
| R-5 | story B "con su código queda en la misma ficha" | open — 1 hit |
| R-6 | story B state "implementado y pendiente de aceptación" | open — 1 hit |
| R-7 | story D "al momento" | open — **2 hits** |
| R-8 | story D state, "todavía sin horario de oficina" | open |
| R-9 | story F "llega el lunes" | open — 1 hit |
| R-10 | example report: "web 3 · teléfono 2", "la cita de los Keller" | open — the owner saw it on this build |
| R-12 | platform `answer`: "Cada consulta recibe…" + "queda como tarea" | open — the owner saw it on this build |
| R-13 | platform `email`: the mailbox we operate | open |
| R-14 | platform `crm`: "Una ficha por cliente" | open — 1 hit |
| R-15 | platform `labels`: "Cada correo" | open — 1 hit |
| R-16 | platform `hot`: state and line | open |
| R-17 | platform `daily`: "motivo de cada prioridad" | open — 1 hit |
| R-18 | platform `reports`: state and line | open |

The replacement wording for every open row stands as written in `COPY_1019.md` §2 and is **not re-sent**.

### 1.1 One row added: the shared record survives in two more sentences

| # | Where | Rendered | New ES | New EN | Class |
|---|---|---|---|---|---|
| R-19 | home, flow (line 78 of the extract) | "Las atiende por el canal por el que llegaron y abre **una ficha por cliente**." | Las atiende por el canal por el que llegaron y abre una ficha por consulta. | It answers them on the channel they came in on and opens a record per enquiry. | **not present**: in production an e-mail and a WhatsApp contact are two records |
| R-20 | home, story B (line 113) | "Una ficha al día **por cliente**…" | Una ficha al día por consulta y, donde hace falta, una tarea con fecha. | An up-to-date record per enquiry and, where needed, a dated task. | same |

"Nunca más de uno por semana por cliente" (line 256) **stays**: it sits in the follow-up chapter, which
carries "Prototipo · todavía no disponible", and it describes a frequency rule of that prototype, not a
shared record.

---

## 2. The seven points the owner saw on this build

| # | Owner point | Rendered on `deb9b66` | Fix | Class |
|---|---|---|---|---|
| O-1 | example report with web form and phone figures and "la cita de los Keller" | "WhatsApp 11 · email 7 · web 3 · teléfono 2 …" · "4 confirmadas por el equipo" · "la cita de los Keller" | = **R-10**: "WhatsApp 13 · email 10", no web, no phone · "4 acordadas por el equipo" · "la visita de los Keller" | an example may not show work on channels that do not exist, nor a booked appointment |
| O-2 | platform: tasks for other languages, a shared customer record | "otro idioma queda como tarea para tu equipo" · "Una ficha por cliente" | = **R-12** and **R-14** | task: staging only · shared record: not present |
| O-3 | Essential: "no enquiry is left unanswered" | packages, Essential lead: "**Ninguna consulta se queda sin respuesta** mientras estás fuera." | ES **Las consultas en español por WhatsApp y email se responden mientras estás fuera.** · EN **Enquiries in Spanish on WhatsApp and e-mail are answered while you are away.** | an absolute that is false the moment somebody writes in another language: that turn is held and gets nothing |
| O-4 | packages: calendar, ad leads, follow-up without clear availability | Growth lists six features and **Enterprise two, none with a state** | §3 below: every feature line carries its state, the same two words as the rest of the site | see §3 |
| O-5 | the imprint leads to a provisional text | `/es/legal/imprint` → `/es/legal/notice`, "PROVISIONAL. Este texto no es definitivo…" | §4 below. The redirect is right; the text behind it is not final and one paragraph is a false claim **today** | |
| O-6 | Reviewer F-R16-5 rest: "…es la aprobación legal del aviso, no la función" | **0 hits** | closed. The hero state line now says what happens, not what is missing | — |
| O-7 | legal pages with placeholders (F-R16-4) | all four pages carry "PROVISIONAL"; **0** open marks rendered; **0** mentions of Instagram | §4: the prepared texts, mapped to their routes; company data only with E14 | — |

---

## 3. The package cards, with a state on every feature (O-4)

The same two-word vocabulary as the module demonstrations: **Disponible** / **En preparación · todavía no
contratable**. Updated to Gate §18, which moved two things since `COPY_DELTAS_1003` §2.

### Essential

| Feature, as rendered | State ES | State EN | Gate §18 |
|---|---|---|---|
| card lead "Ninguna consulta se queda sin respuesta…" | *replaced by O-3* | | |
| Respuestas automáticas · hoy en español | Disponible · en español | Available · in Spanish | implemented in prod; T1/T2 in the publication gate |
| WhatsApp y email | Disponible · el buzón lo operamos nosotros para ti | Available · we operate the mailbox for you | `MAIL_CRM_MATRIX_v1`: no agency mailbox yet |
| Etiquetas de email | Disponible · con Gmail | Available · with Gmail | prod, Gmail |
| Fichas de cliente (CRM) | Disponible · una ficha por consulta | Available · one record per enquiry | not one record per person |
| Avisos de consultas importantes | **Disponible · por email, todavía sin horario de oficina** | **Available · by e-mail, no office hours yet** | **E2E proven (H1)**: up from "preparing" in `COPY_DELTAS_1003` |
| Informe semanal · la entrega al cliente no se mide | **Disponible: el informe en tu acceso · En preparación: el resumen semanal por email** | **Available: the report in your login · In preparation: the weekly e-mail summary** | login E2E proven; mail delivered once, scheduler inactive |

### Growth

| Feature, as rendered | State ES | State EN | Gate §18 |
|---|---|---|---|
| card lead "Cada mañana el equipo sabe qué va primero, y los clientes reciben propuestas que encajan." | **Replace:** "Cada mañana tu equipo ve sus tareas con el motivo de cada una." | "Every morning your team sees its tasks with the reason for each." | proposals not released for any tenant; the sentence promised them |
| Seguimientos con permiso del cliente | En preparación · todavía no contratable | In preparation · not bookable yet | not present in prod |
| Propuestas de inmuebles de tu cartera | En preparación · todavía no contratable | In preparation · not bookable yet | implemented, released for no tenant |
| El asistente de la mañana: la lista del día **con prioridades** · ver, tomar, completar | **Rename:** "La lista de la mañana: qué va primero y por qué" · Disponible: ver, tomar y completar tareas · En preparación: el correo de la mañana | "The morning list: what comes first and why" · Available: see, take and complete tasks · In preparation: the morning e-mail | "prioridades" claims a priority value that production does not hold; the letter has no regular operation |
| Recogida de leads de anuncios | En preparación · todavía no contratable | In preparation · not bookable yet | not present |
| Agenda y citas | En preparación · todavía no contratable | In preparation · not bookable yet | **automatic appointments not present**; no calendar connected |
| Informe con evolución y canales | En preparación · todavía no contratable | In preparation · not bookable yet | the comparison is not measured and the weekly scheduler is inactive |

### Enterprise

| Feature, as rendered | State ES | State EN | Gate §18 |
|---|---|---|---|
| card lead "Instagram y modelos 3D desde el mismo sitio que las consultas." | **Replace:** "Modelos 3D por encargo, y más adelante Instagram desde el mismo sitio." | "3D models to order, and later Instagram from the same place." | Instagram not present; 3D on request |
| Instagram desde el mismo sitio | En preparación · depende de la aprobación de la plataforma | In preparation · depends on the platform's approval | not present (no real run) |
| Modelos 3D incluidos por encargo | Por encargo · a partir de tus planos | To order · from your plans | handwork per order |

**One open question for API and the owner, not a text:** the cards render limits — offices and seats
**1/3, 1/8, 5/50**. No lane has stated whether these are decided commercial limits or values from the
staging catalogue. If they are not decided, they are invented numbers on a public page, which is the one
thing this register forbids outright.

---

## 4. Legal: what can be fixed now, and what waits for E14

### 4.1 Fixable now: one false sentence in the imprint

The legal notice at `/es/legal/notice` says under *Actividad*: "NuovaSolution ofrece una **capa
operativa** para agencias inmobiliarias: las consultas se responden, se entienden y se llevan hacia
adelante en un solo sistema con **una sola memoria del cliente**." The abstraction was removed from every
other page, and "una sola memoria del cliente" is the shared-record claim that production does not support.
This is not a placeholder and it does not wait for E14.

| Where | New ES | New EN |
|---|---|---|
| `/legal/notice`, *Actividad* | NuovaSolution ofrece a las agencias inmobiliarias un sistema que responde a sus consultas, registra cada una en una ficha y crea tareas para el equipo de la agencia. | NuovaSolution provides real estate agencies with a system that answers their enquiries, records each one, and creates tasks for the agency's team. |

This is the wording already prepared in `LEGAL_PAGES_FINAL_v1.md` §1; nothing new is invented.

### 4.2 The prepared texts, and which route each one is for

Nothing in this lane's prepared texts is on the build yet, which is correct while E14 is open. The mapping,
so the implementer does not have to reconstruct it:

| Route | Prepared text | What still blocks it |
|---|---|---|
| `/legal/notice` (imprint) | `LEGAL_PAGES_FINAL_v1.md` §1 | **E14**: legal form, NIF, street number and postal code |
| `/legal/privacy` | `LEGAL_PAGES_FINAL_v1.md` §2, with the Instagram section from `META_LEGAL_TEXT_FINAL.md` §1 | E14 for the controller block; the **retention** decision with the backup window (`META_LEGAL_TEXT_FINAL.md` §5b, §5c); counsel's DPA and liability marks |
| `/legal/terms` | `LEGAL_PAGES_FINAL_v1.md` §3, with the connected-accounts block of `META_LEGAL_TEXT_FINAL.md` §2 | E14; counsel |
| `/legal/data-deletion` | `META_LEGAL_TEXT_FINAL.md` §3 | **nothing from E14**: it names the controller as already published. The one blocking sentence is the clean-up promise, which waits for the **production** purge path |

**Until E14 the "PROVISIONAL" band stays**, and that is correct: a provisional page that says so is honest,
a final-looking page with missing company data is not. No company, legal form, register entry or approval
is invented in the meantime.

---

## 5. C2 — the three E19 staff templates for E22 → Social

Utility messages to the agency's **own** employee about work assigned to them. Spanish only. Built on
Social's T-1 structure: no customer phone, no e-mail, no message text, no score. Every template starts and
ends with text, so no variable sits at an edge.

| Template | Category | Text (es) | Variables | Button |
|---|---|---|---|---|
| `ns_alerta_empleado_v1` | utility | Nueva consulta para ti: {{1}} ({{2}}), recibida por {{3}}. Está en tu lista de tareas. | `{{1}}` first name or "Sin nombre" · `{{2}}` the occasion · `{{3}}` the channel | Abrir tarea |
| `ns_recordatorio_empleado_v1` | utility | Recordatorio: la consulta de {{1}} ({{2}}) sigue sin que nadie la tome desde las {{3}}. Puedes tomarla en tu lista de tareas. | `{{1}}` first name or "Sin nombre" · `{{2}}` the occasion · `{{3}}` the time it arrived, in the agency's zone | Abrir tarea |
| `ns_escalado_empleado_v1` | utility | La consulta de {{1}} ({{2}}) llegó a las {{3}} y todavía no la ha tomado nadie del equipo. Te la pasamos para que no se quede esperando. | as above | Abrir tarea |

**Decisions inside the wording, so they are not lost:**

- **The alert changes one phrase against Social's T-1:** "Ábrelo en tu panel" becomes "Está en tu lista de
  tareas". The staff surface is a task list and is called that on the card, in the letter and on the
  button; "panel" was the only place it had another name.
- **The escalation names nobody who failed.** It goes to the second person and says the task is still
  untaken. Naming the first person would turn a routing message into a reproach sent to a colleague.
- **No urgency word the data does not hold.** "Requiere atención", "urgente" and "importante" are not in
  the reminder or the escalation; the fact that nobody has taken the task is the whole message.
- **The time is a fact, not an age.** "desde las {{3}}" quotes the stored arrival time rather than "hace
  2 horas", which would be wrong the moment the message is read later.

**What the wording cannot do, said for the submission:** the employee's opt-in is the confirmed number
(E16 one-time code, `whatsapp_number_verified_at`); without it no WhatsApp alert goes out and mail is the
only permitted channel, which in production today is the case. Reminder and escalation also depend on E19
working hours, which do **not** exist in production yet: these templates are prepared, not active.
Submission is Social's, approval is Meta's.

---

## 6. C3 — E10

Stays with the owner and counsel, as ordered. This lane's review of Voice's package is in `COPY_1019.md`
§3.5 and is not repeated.
