# Copy → Lead, Daily · one message per person and enquiry (F35), the card fully in Spanish (F16/F34), the hold notice (F36) · 17.11.2026

**Order:** the owner, 17.11. evening.
**Rows:** FEHLERLISTE_PROD_1113_v1.md, n8n repo `governance/`. Read only; Copy does not write there.
**Builds on:** `docs/website_redesign/mail/COPY_PROD_TEXTS_1116_F12_F16_F18_v1.md` (§2 card labels, §2.2 numbers, §2.3 codes, §3 task titles and client line, Daily's answers Q-F18/Q-F18b). This file says what changes. Everything there that is not changed here stays.
**Language:** the agency's messages are Spanish only, as the owner decided (F16). EN is not needed today: no agency team works in English. If one does later, Copy writes the EN set from this file.
**Status:** this is an editorial check, not a legal approval. No phone number and no e-mail address appears in this file or in any template line.

**The rule (FEHLERLISTE F35, owner):**
- For each person and enquiry there is **ONE** task and **ONE** message: the card, the task and, if the reply was held, the hold notice, all in one.
- There is **at most one** reminder.
- The escalation reaches **another** person, and for that person it is again their one message.
- The channel per staff member (mail or WhatsApp) comes later. Both versions are below.

---

## (a) The one message (mail)

**Sender name (all staff messages: the message, the reminder, the escalation):** `NuovaSolution · Avisos`.
- It replaces the owner's personal name from the Gmail account (F17/F36).
- The owner's production YES "Absender NuovaSolution" (F17) covers it. "· Avisos" separates the team's notices from the customer replies.
- Once several agencies run, the name may become `{{agencia}} · Avisos`. That is Lead's and API's switch, not a text change.

**Subject:**

| Case | Subject |
|---|---|
| normal | `{{Prioridad alta/media/baja}} · {{Compra/Alquiler/Venta/Poner en alquiler}} · {{zona}} · {{presupuesto}}`. Corrected 18.11. to Lead's built form (1116 L-s), without the name; see `COPY_TO_LEAD_1118_FRI_PACKAGE_TEXT_CHECK_v1.md` §3 |
| reply held | `Contesta tú · ` + the same subject |

- Missing parts are dropped, never "—".
- **{{zona}} in the subject is exactly the Zona of the card.** F35 showed the subject "Costa del Sol" over Ubicación "Nerja". The subject reads the same field as the card.

**Body, in this order:**

```
{{nombre}} {{quiere comprar}} en {{zona}}, {{presupuesto}}. {{Prioridad alta}}: {{motivo}}.
[only if held]  No le hemos enviado respuesta automática: {{motivo de retención}}. Contéstale tú.
Siguiente paso: {{paso}}

Por {{canal}} · {{hoy, 15:12}}
Zona: {{zona}}
Presupuesto: {{presupuesto}}
Inmueble de esta consulta: {{precio}} · {{dormitorios}} dormitorios · {{zona}} · ref. {{ref}} · Ver anuncio
[only if price > known maximum]  El precio está por encima de su presupuesto.
Falta por saber: {{lista}}
Visita: {{todavía no, falta …}} / {{se puede proponer}}
Resumen: {{resumen en español}}
[only if not Spanish]  Escribe en {{idioma}}.
[only if it exists]  Contacto anterior · {{fecha}} · no es de esta consulta: {{intención}} · {{zona}} · {{presupuesto}}
Contacto: Teléfono {{+código país, en grupos}} · Email {{email}}

Tarea: {{título}} · sin asignar desde las {{hora}}.
Si nadie la toma, te lo recordamos a las {{hora del recordatorio}}.

[button]  Abrir en la app del equipo
```

**Notes:**
- **The first line is the decision line.** Who, what, where, how much, how urgent and why, in one sentence. Example (fictional): "Laura Serrano quiere comprar en Estepona, hasta 320.000 €. Prioridad alta: pide zona, presupuesto y visita."
- **Labels** follow 1116 §2.1, with no English and no German anywhere:
  - "HOT LEAD" becomes "Prioridad alta";
  - "Score" is replaced by "Motivo", with no number;
  - "Channel" becomes "Por {{canal}}";
  - "Property Interest" becomes "Inmueble de esta consulta";
  - "Qualification Incomplete" becomes "Falta por saber";
  - "Viewing allowed" becomes "Visita";
  - "Details" becomes "Resumen";
  - "Früherer Kontakt" becomes "Contacto anterior".
- **Task titles** follow 1116 §3.1. **"Property request (matching off)" never appears.** It becomes "Buscar inmuebles para {{nombre}}" (F36).
- **No internal key, no thread ID, no "E19"** (1116 §3.3).

### WhatsApp version (when the staff channel is WhatsApp; later)

```
{{Contesta tú · }}{{Prioridad alta}} · {{nombre}} · {{quiere comprar}} · {{zona}} · {{presupuesto}}
{{motivo}}. Siguiente paso: {{paso}}.
[only if held]  Sin respuesta automática: {{motivo de retención}}.
Ábrela en la app del equipo.
```

Never the phone number, the e-mail address or the key in WhatsApp. They are on the record.

### Later messages of the same client (the F35 case: 5 mails in 15 minutes)

- **No new message.** The messages are added to the record and the task. The card in the app shows "{{n}} mensajes nuevos de {{nombre}}".
- **One exception, for Lead to decide:**
  - Case: a later message is **held** while the task is already assigned.
  - Then the assigned person must know, because nobody else answers.
  - Proposal: one line to that person only, subject "Contesta tú · {{nombre}} ha escrito de nuevo", body "{{nombre}} ha escrito de nuevo y no le hemos enviado respuesta automática: {{motivo de retención}}. Ábrela en la app del equipo."
  - If Lead says the rule allows no exception, the line goes, and the record shows the held message only in the app.

---

## The one reminder (at most once)

| | Text |
|---|---|
| Subject | Recordatorio · {{título}} sigue sin asignar |
| Body | La tarea {{título}} sigue sin asignar desde las {{hora}}. ⏎ Cliente: {{nombre}} · Por {{canal}} · {{intención}} · {{zona}} · {{presupuesto}} ⏎ [only if held] Sigue sin respuesta: {{motivo de retención}}. ⏎ Si nadie la toma, avisamos a {{nombre o rol}} a las {{hora}}. ⏎ Abrir en la app del equipo |

- If no next person exists, the last sentence is "Si nadie la toma, este será el último aviso." (Daily, Q-F18).
- No second reminder. Daily's 5-minute cycle (E19) must not send it again.

## The escalation (another person; their one message)

- **Next person (T-3):** subject "Sin asignar desde las {{hora}} · {{título}}". Body:
  > Nadie ha tomado esta tarea desde las {{hora}}: {{título}}.
  > Cliente: {{nombre}} · Por {{canal}} · {{intención}} · {{zona}} · {{presupuesto}}
  > [only if held] Sin respuesta automática: {{motivo de retención}}.
  > Te avisamos porque eres {{rol}}. Ábrela en la app del equipo y asígnala.
- **No one else (T-3b):** subject "Último aviso · {{título}} sin asignar". Body unchanged from 1116 §3.3, plus the hold line if held.

---

## (b) The card fully in Spanish (F16, F34, the Resumen of F36)

The labels of 1116 §2.1 stand. What is added:

- **Resumen** (today "Detalles" in English, the summary in the customer's language, F36):
  - **always in Spanish**, whatever language the client wrote in;
  - one or two sentences;
  - no translation marks;
  - the client's original text stays on the record, not in the message;
  - if the client did not write in Spanish, the line "Escribe en {{idioma}}." follows.
- **Budget (F34)**, the same rule on every card of a chain (card 2 showed "300.000 €" where card 1 rightly said "hasta 300.000 €"):

| What the client said | Card shows |
|---|---|
| a maximum (`hard_max`) | hasta 300.000 € |
| an approximate figure | unos 350.000 € |
| a range | entre 250.000 y 300.000 € |
| nothing | the row goes, and "presupuesto" stands under Falta por saber |

  **Never a bare figure** for a maximum.
- **Amounts:** "350.000 €", never "350000 EUR".
- **Dates:** "hoy, 15:12" or "vie 13 nov, 15:12".
- **Priority words:** "Prioridad alta / media / baja". **No number** (owner, 16.11.).
  - FEHLERLISTE F16 still lists "Owner: Score auf Karte ja/nein" as open. The owner decided it on 16.11. (1116 §4 Q-F16b): no number.
- **Codes with no Spanish row are shown as nothing, never in English** (1116 §2.3). Lead sends the missing codes; Copy adds the rows the same day.

---

## (c) The hold notice (F36)

**Today:** a separate mail "Respuesta retenida", with the owner's personal name as the sender.

**New:**
- **Inside the one message.** The subject gets "Contesta tú · " in front, and the body gets the hold line after the decision line.
- **No separate hold mail.**
- **Sender:** `NuovaSolution · Avisos`, as all staff messages.

**The reasons ({{motivo de retención}}).** Lead gives the real codes; Copy fills the words:

| Code (Lead confirms) | Words |
|---|---|
| `language` (F07) | escribe en {{idioma}} y las respuestas automáticas son solo en español |
| `attachment_unreadable` | envió un archivo que no hemos podido abrir |
| `human_requested` | ha pedido hablar con una persona |
| `sensitive` / any other code | esta consulta necesita una persona |

**The instruction after the reason:**
- "Contéstale tú." in every case.
- For `language`: "Contéstale tú, en {{idioma}} si puedes."
- **Nothing promises the client a reply time.** The message is for the team.

---

## Open, who answers by when

| # | Question | Who |
|---|---|---|
| Q-35a | The exception for a held later message on an assigned task (above): yes or no | Lead |
| Q-35b | The real codes for {{motivo de retención}} | Lead |
| Q-35c | The reminder time and the escalation's person/role in the one message (Daily's existing logic, 1116 Q-F18) | Daily |
| Q-36 | Sender `NuovaSolution · Avisos` for all staff messages, on the owner's F17 YES | Lead + API |
