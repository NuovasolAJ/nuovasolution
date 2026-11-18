# Copy → Lead (Daily for §4): check of the provisional texts in the Friday package · 18.11.2026

**Checked:** n8n repo commit `12396751` (`build/enquiry/build_fri_1120.mjs`, `governance/LEAD_SIGNALS_1106.md` entry 2026-11-17T18:58Z). Read only. Copy does not write in the n8n repo, so this file is Copy's answer in the Lead signal's place.
**Against:**
- `docs/website_redesign/mail/COPY_TO_LEAD_DAILY_1117_F35_F36_STAFF_MESSAGE_v1.md` (F35/F36);
- `docs/website_redesign/mail/COPY_PROD_TEXTS_1116_F12_F16_F18_v1.md` (F16 labels, F18 titles).
**Due:** Thu 19.11. 10:00. **Status:** this is an editorial check, not a legal approval.

**Verdict:**
- **Most of it is confirmed.**
- **Six corrections (§2):** C-1 to C-5 are texts or the order of a rule; C-6 is the hold notice that F35 wants inside the one message, which matters for Lead/Daily's plan.
- **One rule change from Copy's side (§3):** the subject keeps Lead's form.

---

## 1. Confirmed as built

| What | Lead's text | Copy |
|---|---|---|
| Missing code `duration` | Cuánto tiempo quiere alquilar. | **confirmed** |
| Missing code `viewing interest` | Si quiere visitarla. | **confirmed** |
| Missing code `move-in timing` (rent) | Cuándo quiere mudarse. | **confirmed** |
| Missing code `property type or location` | Tipo de inmueble o zona. | **confirmed** |
| Next step `Send WhatsApp alert` | Contactarle hoy. | **confirmed** |
| Next step `Send email` | Escribirle hoy. | **confirmed** |
| Next step `Manual follow-up` | Atender la consulta personalmente. | **confirmed** |
| Priority and reason | Prioridad alta/media/baja · Motivo: nombró zona y presupuesto, pidió una visita … | **confirmed**: no number, the same words as the website |
| Card subject | Prioridad alta · Compra · Nerja · hasta 300.000 € | **confirmed** (1116 L-s). Zona = the card's Zona, as F35 requires |
| Card labels | Zona, Presupuesto, Inmueble de esta consulta, Falta por saber, Siguiente paso, Contacto, Resumen, Escribe en …, Contacto anterior … no es de esta consulta | **confirmed** |
| "Pregunta por un inmueble concreto." / "Ver anuncio en {{portal}}" / "El precio está por encima de su presupuesto." | as in 1116 L-7, L-7b, L-8 | **confirmed**. Portal names are fine on the team's card; they stay off the public site |
| Task titles | Llamar a …, Buscar inmuebles para …, Organizar la visita de …, Atender la consulta de …: quiere hablar con una persona | **confirmed**. The last one is a good addition for F28 |
| Hold reason, language | Escribe en alemán; la respuesta automática solo sale en español. | **confirmed**, with C-5 below |
| Hold reason, other | La respuesta automática necesita revisión antes de enviarse. | **confirmed**: it fits with the draft shown under it |
| F38a reply rule | facts with source, the limit, "still published today" only if allowed, a colleague confirms, an alternative; "never say it is available" | **confirmed**: the same rule as the website demo (no availability promise) |

## 2. Corrections

| # | Where | Today (Lead) | New (Copy) | Why |
|---|---|---|---|---|
| C-1 | the card's buttons | Atender yo · Devolver a la IA | **Lo atiendo yo · Devolver al asistente** | "Atender yo" is clipped Spanish. "IA" is not a word the agency sees anywhere else; the website and the reply label say "asistente" |
| C-2 | the hold notice, task line, case `created` | Tienes la tarea en la app del equipo. | **La tarea está en la app del equipo.** | The task is unassigned. "Tienes" reads as if it were already this person's |
| C-3 | the hold notice, case `failed` | No se pudo crear la tarea: atiéndelo directamente. | **No se pudo crear la tarea: contesta tú directamente.** | "atiéndelo" has no clear object; the instruction is to reply |
| C-4 | the hold notice, the last line | Ábrela en la app del equipo. (after the task line) | **remove**, when the task line already names the app | It says the same thing twice, and "Ábrela" has no clear object when there is no task |
| C-5 | the hold notice, after the reason | (no instruction) | add **"Contéstale tú."** (language case: "Contéstale tú, en {{idioma}} si puedes.") | F36: the team must know what to do, not only why |
| C-6 | the hold notice, subject and place | separate mail "Respuesta retenida · {{nombre}}" | **for Friday:** subject **"Contesta tú · {{nombre}} · sin respuesta automática"**. **Target (F35):** no separate mail; the card's subject gets "Contesta tú · " in front, and the reason line sits in the card | F35: one message per person and enquiry. If the bundling is not ready for Friday, at least the subject says the action |

**Also, not a text but the F34 rule (budget):**
- **The issue.** In `MODEL`, `pres` comes from:
  1. this message's facts;
  2. then the free text `Budget` (a single figure is shown bare);
  3. only then the memory with its mode.
- **The effect.** In a later message of the same enquiry, a maximum the client stated earlier would then show as a bare "300.000 €". That is the F34 case.
- **Copy's request:**
  - **order:** facts → memory of the same enquiry with `hard_max` / approximate → free text;
  - **a bare figure** only when no mode is known. That is allowed, since "unos" may only appear if the client said it (F06).

**Also, a check that is missing (F36 Resumen):**
- **What F36 asks:** the summary must be Spanish whatever language the client wrote in.
- **What `check` tests:** that no English labels appear, not the language of `Lead Summary` itself.
- **Please add to Thursday's staging cases:** run 189229 (German), "Resumen" in Spanish. If the classifier writes it in German or English, either the summary is generated in Spanish, or the "Resumen" box is left out until it is.

## 3. One change on Copy's side

- **The card subject keeps Lead's form** (1116 L-s), without the client's name. `COPY_TO_LEAD_DAILY_1117_F35_F36_STAFF_MESSAGE_v1.md` §(a) is corrected to match (same commit).
- **Sender:**
  - Lead takes the tenant's name (`_client_name`, fallback "NuovaSolution"). Copy confirms it.
  - Copy asks for **" · Avisos"** after it (`{{agencia}} · Avisos`), so the team can tell its own notices from the replies its clients get.
  - **This applies to every staff message: card, hold notice, operator mail.** Today `senderName` is set only on `[HOLD: Send Staff Notice]` and `[HO: Operator Alert]`. Please confirm that the card's sender (F17, ENQ2) is the same.

## 4. Open after this check

| # | Question | Who |
|---|---|---|
| Q-L1 | The card's WhatsApp text carries the client's phone and e-mail (📞, 📧). Copy's F35 file says WhatsApp carries neither; both are on the record. **Copy's recommendation**, not a block. The agent needs the number to call, so the owner decides (data on the staff member's own WhatsApp) | Owner |
| Q-L2 | F35 bundling (card + task + hold in one message, at most one reminder) is **not** in the Friday package. F33 makes it one card per enquiry; the task mails (Daily) and the hold mail stay separate. Plan and date | Lead + Daily |
| Q-L3 | Q-35a/Q-35b from the F35 file: a held later message on an assigned task; the real hold codes | Lead |
