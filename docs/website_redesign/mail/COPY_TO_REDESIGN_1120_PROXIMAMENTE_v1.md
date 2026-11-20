# Copy → Redesign, RV6: the "Próximamente" wording for the public page, with the owner's five keys · 20.11.2026 (due 11:00)

**Order:**
- The owner to Redesign, 20.11. morning: "Den Wortlaut legt Copy bis 11:00 in docs/website_redesign/mail/COPY_TO_REDESIGN_1120_PROXIMAMENTE_v1.md; übernimm ihn ohne Rückfrage."
- Later the same morning: "‚Próximamente' bleibt genau wie in Copys Datei 8cbe48c/19b5523 mit dem heutigen Stand von claims.ts."

Redesign relayed both. Copy did not get the order directly.

**Status:** an editorial and technical check, not a legal approval and not a Meta approval.

**What this file is:**
- **The wording rules do not change.** They are in `docs/website_redesign/COPY_TO_REDESIGN_1120_HERO_PROXIMAMENTE_PLANFOLD_v1.md`: `8cbe48c` + `19b5523` (G-m) + `fb2e600` (the capital letter in G-3p by position).
- This file adds two things:
  - §1, the exact result for the gate Redesign builds now;
  - §2, two lines of the section that the earlier file did not cover.

---

## 1. The result with the gate Redesign builds (five keys "soon": `phoneAssistant`, `instagram`, `adsLeads`, `matching`, `followup`)

All other keys of the section stay live, including `taskList`, `dailyVoice` and `model3d`.

| Place | What the public page shows | ES | EN |
|---|---|---|---|
| Hero | H-subP (`followup` and `matching` off) | Tus clientes reciben respuesta aunque estés en una visita, y lo que piden te espera ordenado en su ficha. | Your clients get a reply even while you are at a viewing, and what they ask for is waiting for you on their record. |
| G-1 | P-1, all off. Title, sentence and phone line stay; the examples and G-m are hidden | chip: Próximamente · Desde Growth · redes sociales en Enterprise | chip: Coming soon · From Growth · social media on Enterprise |
| G-2 | P-1 | chip: Próximamente · Desde Growth | chip: Coming soon · From Growth |
| G-3 | partial, both parts off | chip: Desde Growth · en parte próximamente · sentence: Responde al momento y aclara qué busca cada cliente. Proponerle inmuebles que encajan y hacer seguimiento, con su permiso: próximamente. · phone: Cada interesado, respondido al momento. · example line 1 only, with G-m | chip: From Growth · partly coming soon · sentence: It replies at once and finds out what each client is looking for. Suggesting listings that fit and following up, with their permission: coming soon. · phone: Every lead, answered at once. · example line 1 only, with G-m |
| G-d | unchanged (`taskList`, `dailyVoice` live) | Cada mañana, qué oportunidades piden tu atención. | Every morning, which opportunities need your attention. |
| T-2 | P-1 | chip: Próximamente · Desde Growth | chip: Coming soon · From Growth |
| T-4, T-8, T-6 | unchanged | — | — |
| Day, desktop | three stations off (D-2, D-4, D-5), so more than two: **only D-1, D-3, D-6 are shown** | 08:30 · 13:20 · 23:40 with their v2 sentences | same |
| Day, phone D-c | the live stations only | 08:30 tu día · 13:20 aviso · 23:40 respuesta de noche | 08:30 your day · 13:20 notice · 23:40 a night-time reply |

Plans table, /packages and demo tabs: off rows and tabs carry PX-b "Próximamente" / "Coming soon". The legend reads "Próximamente: aún no activo" / "Coming soon: not active yet" (`COPY_TO_REDESIGN_1116_EXAMPLE_WEEK_PROXIMAMENTE_v1.md` §1, points 4 and 5). Nothing new here.

## 2. Two lines the earlier file did not cover

| # | Element | When | ES | EN |
|---|---|---|---|---|
| E-P | eyebrow of the section (v2 "Todo lo que hace por tu agencia") | **as soon as one card of the section is "Próximamente" or partial**, which is the case with the five keys | Todo lo que hace y hará por tu agencia | Everything it does, and will do, for your agency |
| G-h | the main statement | **stays unchanged** | Nuevos clientes. Contactos que vuelven. Más oportunidades para tu agencia. | New clients. Contacts who come back. More opportunities for your agency. |

**Why E-P:** "Todo lo que hace" in the present tense above cards marked "Próximamente" says these functions work today.

**Why G-h stays:**
- It is the owner's main statement. Like the hero h1, it names a goal, not a function.
- The cards directly below it carry the state in their first element, the chip. So "Próximamente" is visible where the planned functions are named (the owner's rule of 19.11.).
- If the owner wants the heading itself marked, Copy writes that line. Copy does not change it on its own.

## 3. One difference for the owner (not Copy's to decide)

**Settled by the owner, 20.11. 09:05:**
- Only what is proven in production for pilot agencies is shown as available.
- His five keys, `whatsappOwnNumber` and `alert` are "Próximamente".
- `otherLanguages` stays hidden in both views.
- The other ten (RV6 `42bd0ec`, group C) are decided by API's production check (`API_TO_WEBSITE_1120_REGISTER_ABGLEICH_v1.md`, by 13:00).

The wording for every possible result is in §4. The text below stays as history.

The owner's second sentence says "mit dem heutigen Stand von claims.ts". The register (`claims.ts:37–68`) lists more keys of this section as "soon" than the five Redesign builds: also `taskList`, `dailyVoice`, `weeklyEmail` and `model3d`, plus `webform` in the demo.

**If the gate follows the register in full, the page changes as in the earlier file's §2.5:**
- T-4 and T-6 are also "Próximamente";
- the day shows only D-3 and D-6;
- G-d hangs on `taskList`/`dailyVoice`, so the growth block ends without it.

The wording for that case already exists; only the switch differs. The owner decides which applies.

---

## 4. The wording for every key the owner's decision of 20.11. 09:05 can switch (added 20.11.)

**Why this section:** Redesign takes API's result into `publicGate` without asking back. Every key that can come out "soon" therefore needs its wording ready now.

**How it works:**
- PX-b is the badge "Próximamente" / "Coming soon".
- PX-s is the sentence form "{Función}: próximamente." / "{Function}: coming soon." (`COPY_TO_REDESIGN_1116_EXAMPLE_WEEK_PROXIMAMENTE_v1.md` §1).
- A plan row gets PX-b instead of "✓". A sentence that names the function gets PX-s, or the PX-s of its line.
- **Nothing that is "soon" is simply hidden any more** (owner, point 1). The only exception is `otherLanguages` (point 4).

### 4.1 Keys fixed as "Próximamente" by the owner (points 2 and 3)

| Key | Where it has its wording |
|---|---|
| `phoneAssistant`, `instagram`, `adsLeads`, `matching`, `followup` | §1 of this file. Elsewhere 1116 §1 rows: "Llamadas: próximamente.", "Instagram: próximamente.", "Inmuebles que encajan con cada cliente: próximamente.", "Seguimiento automático: próximamente." |
| `adsLeads` outside the section (plans row) | PX-b; PX-s "Contactos de portales y anuncios: próximamente." / "Contacts from portals and ads: coming soon." (new, there was no 1116 row) |
| `whatsappOwnNumber` | 1116 §1: "WhatsApp con el número de tu agencia: próximamente." / "WhatsApp on your agency's own number: coming soon." |
| `alert` | 1116 §1: "Aviso por email a la persona adecuada: próximamente." / "Email alert to the right person: coming soon." |
| `otherLanguages` | hidden in both views (owner, point 4); no "próximamente" line |

### 4.2 Group C: the ten keys API checks by 13:00 (point 6)

| Key | Function name ES · EN | PX-s ES | PX-s EN | Where it shows on the site |
|---|---|---|---|---|
| `taskList` | Lista de tareas del equipo · The team's task list | Lista de tareas: próximamente. | Task list: coming soon. | T-4 (P-1), D-1, G-d (below), plans row |
| `dailyVoice` | Resumen de la mañana · The morning summary | Resumen de la mañana: próximamente. | Morning summary: coming soon. | T-4 (P-1), D-1, G-d |
| `model3d` | Visualización 3D · 3D visualisation | chip "Próximamente · Opcional, con cualquier plan" (`8cbe48c` §2.2) | chip "Coming soon · Optional, with any plan" | T-6, the 3D section (1116 §1 row) |
| `weeklyEmail` | Resumen de la semana por email · The weekly summary by e-mail | El resumen de la semana por email: próximamente. | The weekly summary by e-mail: coming soon. | plans row, the report line C-4 (1113, "hide" until now: it becomes this PX-s). T-8 does not hang on it |
| `reportTrend` | Tendencia y canales del informe · The report's trend and channels | La tendencia y los canales del informe: próximamente. | The report's trend and channels: coming soon. | the report's channel cards (1113) |
| `webform` | Formulario web · Web form | Formulario web: próximamente. | Web form: coming soon. | the demo's web-form tab (PX-b on the tab, the tab keeps playing, 1116 §1 point 5), plans row |
| `oneRecordAcrossChannels` | Una sola ficha por cliente en todos los canales · One record per client across every channel | Una sola ficha por cliente en todos los canales: próximamente. | One record per client across every channel: coming soon. | plans row, any line that says one record across channels |
| `integrations` | Conexión con tu CRM · Connection to your CRM | Conexión con tu CRM: próximamente. | Connection to your CRM: coming soon. | plans row, FAQ |
| `outlook` | Outlook | Outlook: próximamente. | Outlook: coming soon. | plans row, FAQ |
| `mailboxConnection` | Conexión con el buzón de tu agencia · Connection to your agency's mailbox | **see §4.3** | | step 3 of "Cómo empezar" (1113/1116) |

**G-d with `taskList` and `dailyVoice` off:** "Cada mañana, qué oportunidades piden tu atención: próximamente." / "Every morning, which opportunities need your attention: coming soon."

**The day story** follows `8cbe48c` §2.4. If more than two stations are off, only the live ones show.

### 4.3 One conflict for the owner: `mailboxConnection`

**The conflict:**
- 1116 §1 says **never "próximamente"** for `mailboxConnection` / `replyEmail`. The owner tied the go-live to A12 (16.11.): if A12 slips, the go-live slips, not the text.
- Point 1 of 20.11. says that everything not proven shows "Próximamente".

If API finds no production proof for connecting a pilot agency's own mailbox, the two rules contradict each other.

**And it is not one line.** An agency's e-mail enquiries are answered only once its mailbox is connected. So "Próximamente" here would also touch every e-mail claim made for the pilot agency (the e-mail tab, "por WhatsApp y email", step 3).

**What the owner decides:**
- (a) the go-live waits for A12, as on 16.11.; or
- (b) e-mail for the agency's own mailbox becomes "Próximamente". Then Copy writes the e-mail lines anew, the same day.

If API's result is "soon" for this key, Redesign follows the owner's point 6 as ordered. Copy has put (a)/(b) to the owner. Until he answers, PX-s for step 3 is: "Conexión con el buzón de tu agencia: próximamente." / "Connection to your agency's mailbox: coming soon."

## 5. Card K-2 "Ninguna consulta se queda sin aviso" (Redesign's question, 20.11.)

**The answer: the 13:20 step is part of `reminders`, not `alert`.**
- `alert` (HA1) is the e-mail notice about a new enquiry to the right person.
- The chain "reminder after 1 h, next step after 2 h" is `reminders` (owner D10, "Prod 13.11.").

So K-2 hangs on `["reminders"]` only (`home-1103.ts:426`) and stays on the public page.

**But the 2-hour step changed with the owner's F1 (no escalation mail).** Daily's E19 v2 (`DAILY_SIGNALS_1107.md`, 18.11. 10:55Z and the runs after it):
- At 1 h, ONE reminder goes to the responsible person, with "Si nadie la toma, a las {{hora}} pasa a {{nombre}}."
- At 2 h, **no mail goes out**. The task passes to the next person (`assigned_to`, `handed_over`) and stays visible to everyone.

So "avisamos a la siguiente" / "Carlos is told" is no longer true: the next person gets the task, not a notice.

**New wording (both views):**

| Place | ES | EN |
|---|---|---|
| line `:426` | Si nadie del equipo se ocupa de una consulta, al cabo de una hora se lo recordamos a la persona responsable. A las dos horas, la consulta pasa a la siguiente persona. | If nobody on the team takes an enquiry, after one hour we remind the person responsible. After two hours, the enquiry passes to the next person. |
| example 3 `:427` and timeline `:433` | 13:20 · Pasa a Carlos | 13:20 · Passed to Carlos |
| proof `:429` | Recordatorio a la hora; a las dos, pasa a la siguiente persona. En producción desde el 13.11. | A reminder after one hour; after two, it passes to the next person. In production since 13.11. |
| day story D-3 (`strengths.ts`, 13:20) | Nadie ha cogido la visita de Laura: pasa a Carlos y él la coge. | Nobody has taken Laura's viewing: it passes to Carlos, and he takes it. |
| D-c part | 13:20 pasa a Carlos | 13:20 passed to Carlos |

**The date "desde el 13.11." covers only the reminder.** The handover at 2 h is in production only once Daily's E19 v2 is.

Until Daily confirms that in production, the public view shows:
- **line:** "… se lo recordamos a la persona responsable. El paso a la siguiente persona a las dos horas: próximamente." / "… we remind the person responsible. Passing it to the next person after two hours: coming soon.";
- **example 3, timeline step and D-3:** with PX-b;
- **proof:** "Recordatorio a la hora: en producción desde el 13.11." / "A reminder after one hour: in production since 13.11.".

The target view uses the new wording from the table directly.

**The production state, read 20.11.** Source: n8n repo `governance/DAILY_SIGNALS_1107.md`, entries 08:20:23Z and 08:24Z, read only.

What is already true:
- E19 v2 runs in production since **20.11. 08:23Z**, according to Hosting. Daily did not read the n8n side itself.
- Daily read the four database functions back in production (`prod_sql_readonly`), including the handover `dg_task_e19_hand_over`.

What is still open:
- **No real handover in production has been observed yet.**
- Daily watches the first v2 ticks today and reports a deviation, or at the latest at 18:00.

**So:**
- **Public, until Daily's report:** the PX variant above.
- **After Daily reports at least one OBSERVED handover in production** (sharpened 20.11. with RV6): the new wording from the table. A report of "no deviation" without a handover case is not a proof, so the PX variant stays. Its proof line becomes "Recordatorio a la hora, en producción desde el 13.11.; el paso a la siguiente persona, desde el 20.11." / "A reminder after one hour, in production since 13.11.; passing it to the next person, since 20.11.". It replaces the proof in the table: one date for each part.
- **The PX variant's proof** is changed so the date visibly belongs to the reminder only (RV6's point): "Recordatorio a la hora: en producción desde el 13.11." / "A reminder after one hour: in production since 13.11.".

**The WhatsApp demo tab** stays hidden in public, not "Próximamente" (owner 16.11., point 8). This is noted as the owner's earlier, specific decision; Redesign names it to him as the second exception next to `otherLanguages`.

## 5a. FAQ "¿En qué idiomas responde?" (Redesign's question, 20.11., after API's check `cee6992`)

**The owner, 20.11. 09:05, point 4:** `otherLanguages` stays hidden **in both views**. So no sentence announces more languages, neither "próximamente" nor "en preparación". "En preparación" is not used anywhere (v2, status).

**The answer ends after the second sentence, in both views** (`faq.ts:87–88`):

| ES | EN |
|---|---|
| Hoy responde automáticamente solo en español. Reconoce el idioma de cada consulta y, si no es español, la pasa a tu equipo. | Today it replies automatically in Spanish only. It recognises the language of every enquiry and, if it is not Spanish, passes it to your team. |

**Dropped:** "Más idiomas, en preparación." / "More languages are in preparation." in the target view, and Redesign's "Más idiomas: próximamente." in the gate view. The 1116 §1 row "Otros idiomas: próximamente." is retired with it.

## 5b. `statuses.ts` `premium_on_request` (WCR-004), set ahead in case it renders

`statuses.ts:69` / `:120` still read "Las primeras entregas están en preparación." "En preparación" is not used anywhere. If Redesign finds the sentence rendered in any view, it becomes:

| ES | EN |
|---|---|
| Un servicio que preparamos para ti. Próximamente. | A service we prepare for you. Coming soon. |

Label and short form "Bajo petición" / "On request" stay. If the sentence is rendered nowhere, nothing changes.

## 5c. FAQ Q-22 "¿Puedo añadir a mi equipo y darles roles distintos?" (Redesign's question, build `7fbb662`)

**The problem:** Q-22 hangs on `taskList`. In the gate view it answers with "Lista de tareas: próximamente.", which does not answer a question about roles.

**Its own PX line** (gate view, as long as the answer is not proven in production):

| ES | EN |
|---|---|
| Equipo y roles: próximamente. | Team and roles: coming soon. |

The target answer stays: "Sí. Invitas a tu equipo y defines un rol para cada persona, y los roles deciden qué ven y qué hacen."

**Open for API:**
- The register has no key for inviting the team and setting roles.
- Copy cannot say whether this is proven in production for pilot agencies.
- If API confirms it, the target answer is shown in public too. Until then, the PX line applies.
- Hanging it on `taskList` is Redesign's choice and stays, until API names a key.

## 6. G-1's off chip, shortened (RV6's question, 20.11., measured on `deb4a40`)

**The change:** while G-1 is fully off (P-1), its chip reads **"Próximamente · Desde Growth"** / **"Coming soon · From Growth"**. The Enterprise clause is dropped.

**Why:**
- The three-part chip wraps to two lines (318 × 42 px at 390) and outweighs the title on the card that opens the growth block.
- A card marked "Próximamente" does not sell a plan boundary yet.
- On the phone the chip is the only thing that tells a live card from an off one, because the examples are hidden below 640 px. So it has to be short and plain.

**Unchanged:**
- **On:** "Desde Growth · redes sociales en Enterprise" (v2).
- **Partial** (G-1p, ads on, social off): "Desde Growth · redes sociales en Enterprise, próximamente". Here the ad part is live and in the pilot, so the boundary is real information.

This replaces the G-1 row of `COPY_TO_REDESIGN_1120_HERO_PROXIMAMENTE_PLANFOLD_v1.md` §2.2.

## 7. The public view with no reply channel live: the owner's (b) of §4.3 (relayed by Redesign, 20.11. about 13:00)

**Basis (Redesign's message, not received by Copy directly):**
- The owner chose (b): e-mail for the agency's own mailbox is "Próximamente".
- `publicGate.replyEmail` is "soon" (prod has no mailbox register, API `cee6992`).
- WhatsApp needs `whatsappOwnNumber`, which stays "soon" (owner, point 3).
- So in the public view ⟦canales⟧ is empty.

### 7.0 What this means (for the owner, before the acceptance)

**In the public view NuovaSolution no longer answers a pilot agency's clients on any channel.** So every sentence that says "it replies" changes, not only the e-mail lines:
- the line under the hero h1;
- the "Atiende" area;
- the flow;
- the FAQ;
- the example blocks.

**Still shown as available:**
- the record, with its priority and reason;
- where each enquiry comes from;
- the report in the login;
- the reminder after one hour;
- recognising the language.

**Open for API and the owner, not Copy's to decide:** without a connected channel, how does a pilot agency's enquiry reach the system at all? If it cannot, the record lines have no input in production either, and under point 1 they would be "Próximamente" too. Copy writes no line for that until API answers.

### 7.1 Two new PX lines and the build rule R-0

| Line | ES | EN | Use |
|---|---|---|---|
| **PX-R** | Respuestas en español por email: próximamente. | Replies in Spanish by email: coming soon. | any line that says the system replies, while R-0 holds |
| **PX-s `replyEmail`** | Respuesta por email, en el buzón de tu agencia: próximamente. | A reply by e-mail, in your agency's mailbox: coming soon. | a point that hangs on `replyEmail` alone (`capabilities.ts:107`) |

**PX-R names e-mail only.** WhatsApp stays unnamed in public (owner 16.11., point 8).

**R-0:**
- **When it holds:** while ⟦canales⟧ is empty in the public view.
- **`replyOutOfHours`:** under R-0 it counts as off too, because a night-time reply is a property of the reply.
- **When it ends:** as soon as any reply channel is live, today's forms with ⟦canales⟧ come back unchanged.
- **Target view:** unchanged throughout.

### 7.2 The sentences with ⟦canales⟧, under R-0

| Place | ES | EN |
|---|---|---|
| meta description `es.ts:12` / `en.ts:11` | Cada consulta queda en su ficha, con su prioridad y su motivo, para que tu equipo sepa por dónde empezar. Hecho para agencias inmobiliarias en España. | Every enquiry lands on its record, with its priority and reason, so your team knows where to start. Built for real estate agencies in Spain. |
| FAQ "¿Qué hace NuovaSolution?" `faq.ts:54–55`, its `pub` `:58`, home `home-1103.ts:596` | Guarda lo importante de cada consulta en su ficha, con su prioridad y su motivo, para que tu equipo sepa por dónde empezar. Respuestas en español por email: próximamente. | It keeps what matters from every enquiry on its record, with its priority and reason, so your team knows where to start. Replies in Spanish by email: coming soon. |
| FAQ "¿Qué canales se responden?" `faq.ts:63` | Respuestas en español por email: próximamente. | Replies in Spanish by email: coming soon. |
| flow F-1, node 1 `home-1103.ts:62` (both variants) | Por email, en el buzón de tu agencia: próximamente. | By e-mail, in your agency's mailbox: coming soon. |
| functions "Consultas respondidas" `home-1103.ts:100` | Title stays, with PX-b after it. Line: Respuestas en español por email, también fuera de horario: próximamente. | Title stays, with PX-b. Line: Replies in Spanish by email, also out of hours: coming soon. |
| origin `home-1103.ts:106` | La ficha guarda de dónde llega cada consulta. Así ves qué canal te trae clientes. | The record keeps where each enquiry comes from. So you see which channel brings you clients. |
| plans row `home-1103.ts:513` / `:536` | Respuestas en español por email, with PX-b in every plan cell instead of ✓ | Replies in Spanish by email, with PX-b |
| platform-map L-1 `platform-map.ts:48–49` | Reconoce el idioma de cada consulta y, si no es español, la pasa a tu equipo. Respuestas en español por email: próximamente. | It recognises the language of every enquiry and, if it is not Spanish, passes it to your team. Replies in Spanish by email: coming soon. |
| qualifier q5 `es.ts:90` / `en.ts:96` | Respuestas en español por email: próximamente. | Replies in Spanish by email: coming soon. |

**Notes:**
- **Meta description:** no PX in a meta description. "Una tarea clara" is dropped as well, because `taskList` is soon.
- **Flow, node 2 "NuovaSolution responde":** title and line stay, with PX-b after the title (rule P-1).

### 7.3 The static lines that become false

| Place | ES | EN |
|---|---|---|
| hero line under h1, `home-1103.ts:33` and `strengths.ts:101` (**H-subP0**) | Lo que piden tus clientes te espera ordenado en su ficha, con su prioridad y su motivo, aunque estés en una visita. | What your clients ask for waits for you on their record, with its priority and reason, even while you are at a viewing. |
| hero L-2 `home-1103.ts:45` | Reconoce el idioma. Si no es español, pasa a tu equipo. | It recognises the language. If it is not Spanish, it goes to your team. |
| hero scroll `home-1103.ts:53` | Ver cómo funciona | See how it works |
| area "Atiende" line `home-1103.ts:85` and `:648` (both variants) | Entiende y ordena cada consulta en cuanto llega, también de noche y en fin de semana. | It understands and sorts every enquiry as soon as it arrives, also at night and at weekends. |
| point `home-1103.ts:650`, `pubText` | Responde en minutos por email: próximamente. | Replies within minutes by email: coming soon. |
| FAQ "¿Responde de noche…?" `faq.ts:67` | Respuestas en español por email, también de noche y en fin de semana: próximamente. | Replies in Spanish by email, also at night and at weekends: coming soon. |
| FAQ languages `faq.ts:87–88`, `home-1103.ts:599`, point `:663` | Reconoce el idioma de cada consulta y, si no es español, la pasa a tu equipo. Respuestas en español por email: próximamente. | It recognises the language of every enquiry and, if it is not Spanish, passes it to your team. Replies in Spanish by email: coming soon. |
| phone core, flow `home-1103.ts:448` | core: Cada consulta, en su ficha, con su prioridad y su motivo. · proof: PX-R | core: Every enquiry on its record, with its priority and reason. · proof: PX-R |
| phone core "attend" `home-1103.ts:451` | core: Respuesta por email en minutos, también de noche: próximamente. · proof: Llega con la conexión de tu buzón. | core: Email replies within minutes, also at night: coming soon. · proof: It comes with connecting your mailbox. |
| flow card `answerPublic` `es.ts:192` / `en.ts:214` | step "Respondida" with PX-b; title and line unchanged (P-1) | step "Answered" with PX-b; title and line unchanged |
| "Cómo empezar", step 3 `home-1103.ts:554` | {mailbox PX-s} Desde el primer día trabajas con lo que está activo para tu agencia. Con tu opinión al final, 7 días más. | {mailbox PX-s} From day one you work with what is active for your agency. With your feedback at the end, 7 more days. |

**Notes:**
- **Hero:** H-sub when the target rule holds; else H-subP while a reply channel is live; else H-subP0.
- **Phone core "attend":** the 2-minute measurement is not shown while R-0 holds. Next to "próximamente", a production figure reads as availability.
- **Step 3:** "Cada consulta… por los canales activos queda contestada" cannot stay; no channel is active.

**Platform page "Asistente de consultas"** (`capabilities.ts`, the `ai-sales-agent` entry):

| Element | ES | EN |
|---|---|---|
| `navLine` `:91` | Respuestas a consultas de texto: próximamente. | Replies to text enquiries: coming soon. |
| `h1` | unchanged, with PX-b right above it, as the chip on a card (P-1) | unchanged, with PX-b |
| `leadPublic` `:100–103` | Cuando tu buzón esté conectado, las consultas por email recibirán respuesta en español y quedarán en su ficha, aunque tu equipo esté con un cliente o fuera de la oficina. Conexión con el buzón de tu agencia: próximamente. | Once your mailbox is connected, enquiries by e-mail will get a reply in Spanish and land on their record, even while your team is with a client or out of the office. Connection to your agency's mailbox: coming soon. |
| `scenarioPublic` `:118–121` | starts "Así funcionará con tu buzón conectado: una compradora escribe por email…"; the rest unchanged | starts "How it will work once your mailbox is connected: a buyer writes by e-mail…"; the rest unchanged |
| `fits` "Gmail" `:123` | Gmail, with PX-b | Gmail, with PX-b |
| point `replyEmail` `:107` | PX-s `replyEmail` (§7.1) | PX-s `replyEmail` |
| point `alert` `:109` | 1116 §1: "Aviso por email a la persona adecuada: próximamente." (owner, point 3: Próximamente, not hidden) | "Email alert to the right person: coming soon." |

**Only if rendered (Redesign checks in the build):**

| Place | ES | EN |
|---|---|---|
| `es.ts:145` lead | Una compradora escribe mientras estás en una visita. NuovaSolution registra lo que ha pedido en su ficha, con su prioridad y su motivo. | A buyer writes while you are at a viewing. NuovaSolution records what she asked for on her record, with its priority and reason. |
| `es.ts:146` state | PX-R | PX-R |
| `home-story.ts:252` lead | Guarda lo importante de cada consulta en su ficha. Respuestas en español por email: próximamente. | Keeps what matters from every enquiry on its record. Replies in Spanish by email: coming soon. |
| `home-story.ts:284` state | Disponible hoy: la ficha de cada consulta, con su prioridad y su motivo. Próximamente: las respuestas por email, el formulario web y la llamada. | Available today: the record of every enquiry, with its priority and reason. Coming soon: replies by e-mail, the web form and the phone call. |
| `home-story.ts:294` state | Disponible hoy: la ficha de cada consulta, con su prioridad y su motivo. | Available today: the record of every enquiry, with its priority and reason. |

### 7.4 Cards and the day story under R-0

- **G-3:** G-3p's first sentence "Responde al momento…" is false under R-0. So G-3 follows P-1, the whole card "Próximamente · Desde Growth". G-3p applies only while a reply channel is live.
- **T-8**, example line 1: "Lunes 08:00 · 25 consultas, 25 en su ficha" / "Monday 08:00 · 25 enquiries, 25 on their record".
- **D-6 (23:40)** is off under R-0. Only D-3 is left.
- **D-3, while the handover is PX (§5):** to keep the one live station true, the public view shows the reminder instead of the handover:
  - time 12:20;
  - text "Nadie ha cogido la visita de Laura: Marta recibe un recordatorio." / "Nobody has taken Laura's viewing: Marta gets a reminder.";
  - D-c "12:20 recordatorio a Marta" / "12:20 reminder to Marta".
  - After Daily reports an observed handover, D-3 goes back to 13:20 "pasa a Carlos".

### 7.5 The example blocks ("Ejemplo · datos ficticios")

They show the finished product. Under R-0 they keep their content, the same way the hero demo does, and the reply parts carry the state:
- **"Respondidas hoy"** (`home-1103.ts:134`): PX-b after the title.
- **Report example:**
  - **k1** (`:269`): "llegaron con la oficina cerrada." / "arrived while the office was closed.". The second sentence is dropped.
  - **`chartNote`** (`:287`): "Cuatro semanas de ejemplo." / "Four example weeks.".
- **"Sin / con NuovaSolution" comparison:**
  - **The rows at `:360` and `:362`:** PX-b in the "with" column instead of "0". Their `d` lines are dropped.
  - **`closeWith`** (`:367`): "Ninguna consulta se pierde de vista: las 25 en su ficha." / "No enquiry slips out of sight: all 25 on their record."

### 7.6 The hero demo with all three tabs marked

- **The tabs:** PX-b on each, as Redesign builds it; the surface keeps playing.
- **The invite line:** "Pulsa un canal y mira cómo responderá." / "Tap a channel to see how it will reply."
