# Copy → Daily: the sentence in the one reminder (owner F1: no escalation mail) · 18.11.2026

**Read (only):** n8n repo `governance/DAILY_SIGNALS_1107.md` (entries 2026-11-17T18:30Z F1, 2026-11-18T09:34Z E19 package v2), `build/daily_goals/f35/build_e19_v2.mjs:83–86`, `build/daily_goals/f35/E19_v2_TEXT_CHECK_1118.txt`.
**Due:** Thu 19.11. 10:00. Copy does not write in the n8n repo, so this file is Copy's answer in the Daily signal's place.
**Status:** this is an editorial check, not a legal approval.

## 1. The sentence

**Today (Daily):**
> Este es el único recordatorio: no te enviaremos más correos sobre esta tarea. Sigue en la app y en el resumen de la mañana.

**Copy, new:**

| # | When | ES |
|---|---|---|
| R-a | always | Este es el único recordatorio: no te enviaremos más correos sobre esta tarea. |
| R-b | the recipient gets the morning summary (is in the brief register) | La tarea sigue en la app y en tu resumen de la mañana. |
| R-b' | the recipient does not get the morning summary | La tarea sigue en la app. |
| R-c | the escalation step has a named next person (owner F1: the task goes on to them, visibly, without mail) | Si nadie la toma, a las {{hora}} pasa a {{nombre}}. |
| R-c' | no next person (today's T-3b case) | *(no sentence)* |

**Why:**
- **"Sigue en la app"** has no subject in Daily's version. It can be read as "you stay in the app". "La tarea sigue…" says what stays.
- **"el resumen de la mañana"** is only true for someone who gets it. In production the brief runs since 17.11. for the one registered staff member (Daily 2026-11-17T08:24Z). A pilot agency's team only gets it once registered. R-b' keeps the sentence true for everyone else.
- **R-c tells the reader what happens next.** F1 removed the mail, not the step: after 120 minutes the task goes on to the next person. Without R-c the reader thinks nothing happens.
  - If the step only makes the task *visible* to the next person rather than handing it over, R-c reads instead: "Si nadie la toma, a las {{hora}} la verá también {{nombre}}."
  - **Daily confirms which of the two is true.**

**The new reminder**, in full (example, fictional):

```
Recordatorio · Buscar inmuebles para Lucía Prueba sigue sin asignar
La tarea Buscar inmuebles para Lucía Prueba sigue sin asignar desde las 10:05.
Cliente: Lucía Prueba · Por WhatsApp
Este es el único recordatorio: no te enviaremos más correos sobre esta tarea.
La tarea sigue en la app.
Si nadie la toma, a las 12:05 pasa a Carlos.
Ábrela en la app del equipo para asignártela.
```

**Confirmed as built:** the notice's "Si nadie la toma, te enviamos un único recordatorio a las 11:05." It matches R-a.

## 2. Two more lines in the same mails (seen in `E19_v2_TEXT_CHECK_1118.txt`)

| # | Today | New | Why |
|---|---|---|---|
| R-d | Sigue sin respuesta automática: hay que contestarle en persona. | **Sigue sin respuesta automática: contéstale tú.** | "en persona" means face to face. It is meant as "a person, not the assistant". Same wording as Lead's hold notice (Copy 1118 check, C-5) |
| R-e | Cliente: Por email (no name known) | **Cliente sin nombre · Por email** | "Cliente: Por email" reads as if the client were called "Por email" |

## 3. What this changes in Copy's earlier files

- `COPY_PROD_TEXTS_1116_F12_F16_F18_v1.md` §3.3:
  - **T-3 and T-3b are retired** (owner F1: no escalation mail);
  - T-2's last sentence ("Si nadie la toma, avisamos a …") is replaced by R-a … R-c above.
- `COPY_TO_LEAD_DAILY_1117_F35_F36_STAFF_MESSAGE_v1.md`:
  - the section "The escalation" is retired, for the same reason;
  - the reminder's last sentence is replaced by R-a … R-c.
- Both files carry a note (same commit).
