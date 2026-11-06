# COPY → VOICE · The fixed sentences of the phone in EN and DE · 06.11.2026

**For:** Voice, which wires them in on staging; the owner, who releases them for production with a line of their own.
**Status:** for staging. **Not released for production.** Editorial and technical. Not a legal approval.

**Basis:**
- Voice's key list `VOICE_TO_COPY_1026_SPRECHTEXTE_EN_DE_v1.md`, plus the sentences that came after it: `VOICE_STAGE3_CALL4_FIX_v1.sql`, `VOICE_STAGE3_CALL5_TEXT_v1.sql`, `VOICE_STAGE3_CALL6_CONTACT_v1.sql`, `agent_prompt_v4.txt`. The ES column is what those files say today.
- Owner lines of 06.11.: `SPRACHEN-NEU`, `VORWAHL-SPRACHE`, `SPRACHWECHSEL`.

**This file replaces §1 of `COPY_R25C_TEXTS_1026_v1.md`** (V-1 … V-5), because Voice's Spanish has changed since then. V-2, V-3 and V-4
keep their wording below. If Voice's new list holds a sentence that is missing here, I add it the same day.

**The rules are the same in every language:**
- a time the caller wishes is a wish, and a person confirms it;
- no timing of our own ("shortly", "gleich");
- no transfer, because there is none;
- nothing is said to have been sent;
- `{…}` stays as it is and is filled in the caller's language (days, hours, place names as said);
- German uses **Sie** on the phone;
- "jemand aus dem Team" / "someone from the team" for "un compañero", so no gender is fixed.

---

## A. The keys of `voice_spoken_text`

| # | Key | ES today | EN | DE |
|---|---|---|---|---|
| 1 | `first_message` | Buenas, ha llamado a {agency_name}. Soy {agent_name}, {disclosure_text} | Hello, you've reached {agency_name}. This is {agent_name}, {disclosure_text} | Guten Tag, hier ist {agency_name}. Ich bin {agent_name}, {disclosure_text} |
| 2 | `callback_confirm` | Un compañero del equipo le llamará. | Someone from the team will call you. | Jemand aus dem Team ruft Sie an. |
| 2b | the same, first time | Un compañero del equipo le llamará a este número. | Someone from the team will call you on this number. | Jemand aus dem Team ruft Sie unter dieser Nummer an. |
| 3 | `callback_confirm_after_hours` | Un compañero del equipo le llamará dentro del horario de atención. | Someone from the team will call you during opening hours. | Jemand aus dem Team ruft Sie während unserer Öffnungszeiten an. |
| 3b | the same, first time | Un compañero del equipo le llamará a este número dentro del horario de atención. | Someone from the team will call you on this number during opening hours. | Jemand aus dem Team ruft Sie während unserer Öffnungszeiten unter dieser Nummer an. |
| 4 | `holding` | Un momento, por favor. | One moment, please. | Einen Moment, bitte. |
| 5 | `readback` | Entonces, unos {presupuesto} euros en {zona}, ¿verdad? | So, around {budget} euros in {area}, is that right? | Also etwa {Budget} Euro in {Ort}, richtig? |
| 5b | the same, with a ceiling | Entonces, hasta {presupuesto} euros en {zona}, ¿verdad? | So, up to {budget} euros in {area}, is that right? | Also bis zu {Budget} Euro in {Ort}, richtig? |
| 6 | `readback_repeat_budget` | ¿Me repite el presupuesto, por favor? | Could you repeat the budget, please? | Könnten Sie das Budget bitte wiederholen? |
| 7 | `wish_noted` | Apunto {words}. El compañero le confirma la hora cuando le llame. | I've noted {words}. Someone from the team will confirm the time when they call you. | Ich notiere {words}. Die Uhrzeit bestätigt Ihnen jemand aus dem Team beim Anruf. |
| 8 | `offer_callback` | ¿Quiere que le llame un compañero del equipo? | Would you like someone from the team to call you? | Möchten Sie, dass jemand aus dem Team Sie anruft? |
| 9 | `ask_same_number` | ¿Le llamamos a este mismo número? | Shall we call you on this number? | Sollen wir Sie unter dieser Nummer anrufen? |
| 10 | `language_offer` (a switch) | Claro, seguimos en español. Para que lo sepa: soy el asistente de inteligencia artificial de la agencia. | Of course, let's continue in English. Just so you know, I am the agency's artificial intelligence assistant. | Gern, sprechen wir auf Deutsch weiter. Damit Sie es wissen: Ich bin der KI-Assistent der Agentur. |
| 11 | `language_unclear` | Perdone, no le he entendido bien. Puedo atenderle en español, en inglés o en alemán. | Sorry, I did not quite understand you. I can help you in Spanish, English or German. | Entschuldigung, ich habe Sie nicht gut verstanden. Ich kann Ihnen auf Spanisch, Englisch oder Deutsch helfen. |
| 12 | `ask_send_whatsapp` | ¿Se lo enviamos por WhatsApp a este mismo número? | Shall we send it to you on WhatsApp, on this number? | Sollen wir es Ihnen per WhatsApp an diese Nummer schicken? |
| 13 | `not_yet_sent` | El envío queda anotado para el compañero; todavía no se ha enviado nada. | The request to send it is noted for the team; nothing has been sent yet. | Der Versandwunsch ist für das Team notiert; bisher wurde nichts verschickt. |
| 14 | `retry_registration` | Todavía no he podido registrar la llamada, ¿quiere que lo intente de nuevo? | I haven't been able to log the call yet. Shall I try again? | Ich konnte den Anruf noch nicht eintragen. Soll ich es noch einmal versuchen? |
| 15 | the notice (`text_voice`) | API's table; see `COPY_TO_API_1106_AI_NOTICE_EN_DE_v1.md` §2 | the same | the same |

**Row 10 and the notice:** the second sentence repeats the notice in the new language. It follows §2 of the API file and counsel's answer
on point 7 there.

**Row 11, the second part:** the prompt's line "Por ahora le atiendo solo en español. ¿Seguimos en español?" stays true for Spanish as
long as only Spanish is released. Rows 10, 11 and 16 replace it only when EN and DE are on.

---

## B. A language the phone does not offer

| # | Moment | ES | EN | DE |
|---|---|---|---|---|
| 16 | the caller asks for another language | Lo siento, por teléfono puedo atenderle en español, en inglés o en alemán. | I'm sorry, on the phone I can help you in Spanish, English or German. | Es tut mir leid, am Telefon kann ich Ihnen auf Spanisch, Englisch oder Deutsch helfen. |

This is shorter than V-4 of 26.10. The offer of a call-back is gone, because the prompt forbids a call-back "in that language" and nobody
knows which languages a colleague speaks. **The ES sentence is new and needs the owner's line with the others.**

---

## C. How they will be contacted (`VOICE_STAGE3_CALL6_CONTACT_v1`)

The ES column waits for the owner's line `VOICE_TEXTE_CALL6`. If it changes, EN and DE follow.

| # | Moment | ES | EN | DE |
|---|---|---|---|---|
| 17 | asked how they are contacted | Le llamará un compañero por teléfono y ahí le confirma la hora. Desde aquí no se envía ninguna confirmación. ¿Prefiere otra forma de contacto? | Someone from the team will phone you and confirm the time then. No confirmation is sent from here. Would you prefer another way of being contacted? | Jemand aus dem Team ruft Sie an und bestätigt Ihnen dann die Uhrzeit. Von hier aus wird keine Bestätigung verschickt. Möchten Sie lieber anders kontaktiert werden? |
| 18 | wish: WhatsApp | Apunto que prefiere WhatsApp; el compañero lo verá. Desde aquí no se envía nada. | I've noted that you prefer WhatsApp; the team will see it. Nothing is sent from here. | Ich notiere, dass Sie WhatsApp bevorzugen; das Team sieht das. Von hier aus wird nichts verschickt. |
| 19 | wish: e-mail | Apunto que prefiere correo; el compañero lo verá. Desde aquí no se envía nada. | I've noted that you prefer e-mail; the team will see it. Nothing is sent from here. | Ich notiere, dass Sie E-Mail bevorzugen; das Team sieht das. Von hier aus wird nichts verschickt. |
| 20 | wish: a call | Apunto que prefiere una llamada; el compañero lo verá. | I've noted that you prefer a call; the team will see it. | Ich notiere, dass Sie einen Anruf bevorzugen; das Team sieht das. |
| 21 | asked before the call-back exists | Un compañero puede llamarle por teléfono y confirmarle la hora. | Someone from the team can phone you and confirm the time. | Jemand aus dem Team kann Sie anrufen und Ihnen die Uhrzeit bestätigen. |
| 22 | after a change | Apunto {words}. El compañero le confirma la hora cuando le llame. ¿Algo más? | I've noted {words}. Someone from the team will confirm the time when they call you. Anything else? | Ich notiere {words}. Die Uhrzeit bestätigt Ihnen jemand aus dem Team beim Anruf. Sonst noch etwas? |
| 23 | a later change, short | Apunto {words}. | I've noted {words}. | Ich notiere {words}. |
| 24 | the waiting word | A ver… | Let's see… | Schauen wir mal… |
| 25 | the task's note (for staff) | Contacto preferido: WhatsApp — deseo, sin confirmar | stays Spanish | stays Spanish |

---

## D. Opening hours

The parts are joined by code, as in Spanish. `{día}` and `{hours}` are spoken in the caller's language. German needs the day with its
article in the same way as Spanish ("Am Samstag").

| # | Moment | ES | EN | DE |
|---|---|---|---|---|
| 26 | a closed day | {El sábado} estamos cerrados; ¿le va bien otro día, {de lunes a viernes}? | We are closed on {Saturday}; would another day suit you, {Monday to Friday}? | Am {Samstag} haben wir geschlossen; passt Ihnen ein anderer Tag, {Montag bis Freitag}? |
| 27 | a holiday | {El lunes} es festivo y estamos cerrados; ¿le va bien otro día, {de martes a viernes}? | {Monday} is a public holiday and we are closed; would another day suit you, {Tuesday to Friday}? | {Montag} ist ein Feiertag und wir haben geschlossen; passt Ihnen ein anderer Tag, {Dienstag bis Freitag}? |
| 28 | no other day to name | … ¿Qué otro día le viene bien? | … Which other day suits you? | … Welcher andere Tag passt Ihnen? |
| 29 | an hour outside | A esa hora estamos cerrados; ese día abrimos {hours}. ¿Qué otra hora le viene bien? | We are closed at that time; that day we are open {hours}. Which other time suits you? | Zu dieser Uhrzeit haben wir geschlossen; an dem Tag haben wir {hours} geöffnet. Welche andere Uhrzeit passt Ihnen? |
| 30 | still outside | A esa hora seguimos cerrados; el compañero lo verá con usted. | We are still closed at that time; someone from the team will sort it out with you. | Zu dieser Uhrzeit haben wir weiterhin geschlossen; jemand aus dem Team klärt das mit Ihnen. |
| 31 | still a closed day | Ese día seguimos cerrados; el compañero lo verá con usted. | We are still closed that day; someone from the team will sort it out with you. | An dem Tag haben wir weiterhin geschlossen; jemand aus dem Team klärt das mit Ihnen. |
| 32 | hours, inside | Será en horario de atención: {hours}. | It will be during opening hours: {hours}. | Das geschieht während unserer Öffnungszeiten: {hours}. |
| 33 | we open | Abrimos a las {time}. | We open at {time}. | Wir öffnen um {time}. |
| 34 | we close | Cerramos a las {time}. | We close at {time}. | Wir schließen um {time}. |
| 35 | we reopen | Volvemos a abrir {when}. | We open again {when}. | Wir öffnen wieder {when}. |

---

## E. Other fixed lines of the prompt

| # | Moment | ES | EN | DE |
|---|---|---|---|---|
| 36 | no listing found | Ahora mismo no puedo ofrecerle ninguna. | I can't offer you one right now. | Im Moment kann ich Ihnen keine anbieten. |
| 37 | offer to check | ¿Quiere que un compañero del equipo lo revise y le llame? | Would you like someone from the team to check it and call you? | Möchten Sie, dass jemand aus dem Team das prüft und Sie anruft? |
| 38 | anything else | ¿Algo más? | Anything else? | Sonst noch etwas? |

**Acknowledgements for the prompt** (at most every other turn, each once, as in Spanish):

| ES | EN | DE |
|---|---|---|
| Perfecto · Muy bien · De acuerdo · Entendido | Perfect · Very good · All right · Understood | Sehr gut · In Ordnung · Einverstanden · Verstanden |

The rule "Never say 'Vale'" has its match: no "OK" / "Okay" in EN or DE.

---

## E2. The six keys that were missing (added 06.11. night; status: DRAFT)

**Correction:** my signal said Voice was waiting for nothing. That was wrong for these six keys: they exist in `VOICE_PHONE_LANG_v2c.sql` and
were not on the list I worked from, so Voice used its own marked drafts. The ES is Voice's, word for word.

| # | Key | ES | EN | DE | Against Voice's draft |
|---|---|---|---|---|---|
| 39 | `other_number` | Ahora solo puedo dejar anotado este número; dígale el otro al compañero cuando le llame. | For now I can only note this number; please give the other one when someone from the team calls you. | Im Moment kann ich nur diese Nummer notieren; nennen Sie die andere bitte beim Anruf. | changed: no "colleague", and "Anruf" as in row 7 |
| 40 | `not_yet_sent` | Todavía no se ha enviado nada. | Nothing has been sent yet. | Bisher wurde nichts verschickt. | EN the same; DE as in row 13 |
| 41 | `noted_for_colleague` (a fragment) | queda anotado para el compañero | it's noted for the team | es ist für das Team notiert | EN changed: "team" as everywhere; DE the same |
| 42 | `word_today` | hoy | today | heute | the same |
| 43 | `word_tomorrow` | mañana | tomorrow | morgen | the same |
| 44 | `word_on_day` | el {day} | on {day} | am {day} | the same |

**→ Voice:** replace `source_ref` "Voice-Entwurf, fehlt bei Copy" with these rows. They stay `prod_approved = false`. `not_yet_sent` here is the
key in your table; the longer sentence in row 13 is your `send_noted`.

**The list, compared with `VOICE_PHONE_TEXTS_COPY_c257602.sql` (43 keys, 86 rows):**
- 37 keys match this file word for word (checked by script, placeholders aside).
- 6 keys are the rows above.
- Rows here without a key of yours: 2, 3 (replaced by your 2b, 3b), 4 (the prompt says no holding phrase), 22 (your 23 + `time_confirm` + `closing_q`), 25 (stays Spanish), 15 (API's table).

**Your question on row 16:** yes, asking for the call-back as a sentence of its own is right. Use `offer_callback` (row 8), which promises no
language, so the task is not lost.

---

## F. The owner's line

```
SPRECHTEXTE-TELEFON EN = JA | ÄNDERN: …     DE = JA | ÄNDERN: …      (this file, commit named in the signal; for production only)
```

Rows 1, 10 and 15 also need counsel's answer on the notice, as the Spanish one does. FR, IT and NL come after this.
