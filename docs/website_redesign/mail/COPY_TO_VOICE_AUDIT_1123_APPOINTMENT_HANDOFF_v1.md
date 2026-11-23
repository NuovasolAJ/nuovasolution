# Copy → Voice, Audit (cc Owner): the appointment handoff sentence on the phone, ES/EN/DE · 23.11.2026

**Order:** the owner, 23.11.:
> "Bitte prüf den Satz zur Weitergabe des Terminwunschs auf ES/EN/DE: „Ich habe Ihren Terminwunsch an die Agentur weitergegeben. Der Termin ist noch offen." Prüf dazu, ob der Agent noch „Die Agentur meldet sich bei Ihnen" sagen darf."

**The measure (owner):**
- Today the agent confirms the appointment by hand, outside NuovaSolution.
- Every call creates a callback task.
- The phone agent promises no time and no confirmation by WhatsApp or e-mail.

**Read:** n8n `d57a328f` `governance/VOICE_TERMIN_BESTAETIGUNG_1123_v1.md`, read only.

**Status:** an editorial and technical check, not a legal approval.

---

## 1. Result

| # | Point | Copy |
|---|---|---|
| V-1 | The owner's sentence | **Yes, with one change:** "noch offen" → "noch nicht bestätigt". "Open" also means "free": "The appointment is still open" can be heard as "the slot is still available". "Not confirmed yet" can only mean one thing, and it is exactly the measure: the agent confirms by hand. |
| V-2 | "an die Agentur" | **Recommended: "an das Team"** (ES "al equipo", EN "the team"). The caller rang the agency itself; "the agency" in the third person sounds like an outside call centre. Every other phone sentence already says "jemand aus dem Team". If the owner wants "Agentur", the sentence stays true: only the tone changes. |
| V-3 | "Die Agentur meldet sich bei Ihnen" | **No, not as a promise of the outcome.** The system proves that the callback task exists, with the reminder after 1 h and the escalation after 2 h (`reminders` included, API `cfa8c14` §3.2). It does not prove that the call happens, or when. **Instead, the sentence names the fact:** the request went to the team **with a note to call back**. That tells the caller what happens next without promising it. |
| V-4 | Sie / usted | **Yes, Sie / usted** on the phone (prompt line 15). A stranger calling an agency is addressed with usted in Spain. The WhatsApp demo on the website stays with tú (Mila); each channel keeps its own register. |
| V-5 | Only after `request_handoff` with `ack` true | **Yes.** Before the ack, nothing is "passed on". |

## 2. The sentences (final, Copy)

| Key | ES | EN | DE |
|---|---|---|---|
| `handoff_done` | He pasado su petición de cita al equipo, con el aviso de llamarle. La cita todavía no está confirmada. | I've passed your appointment request to the team, with a note to call you back. The appointment is not confirmed yet. | Ich habe Ihren Terminwunsch mit der Bitte um Rückruf an das Team weitergegeben. Der Termin ist noch nicht bestätigt. |
| `handoff_done_wish` (`{words}` = the caller's words) | He pasado al equipo su petición de cita para {words}, con el aviso de llamarle. La cita todavía no está confirmada. | I've passed your request for {words} to the team, with a note to call you back. The appointment is not confirmed yet. | Ich habe Ihren Terminwunsch für {words} mit der Bitte um Rückruf an das Team weitergegeben. Der Termin ist noch nicht bestätigt. |
| `contact_answer` (the caller asks "will you confirm it by WhatsApp or e-mail?") | Yo no puedo confirmarle la cita ni enviarle nada. ¿Quiere que le diga al equipo cómo prefiere que le contacten? | I can't confirm the appointment or send you anything myself. Would you like me to tell the team how you prefer to be contacted? | Ich kann Ihnen den Termin nicht bestätigen und Ihnen nichts schicken. Soll ich dem Team sagen, wie Sie kontaktiert werden möchten? |
| `contact_whatsapp` (only once stored in the task) | Le he dicho al equipo que prefiere WhatsApp. | I've told the team you prefer WhatsApp. | Ich habe dem Team gesagt, dass Sie WhatsApp bevorzugen. |
| `contact_email` | Le he dicho al equipo que prefiere un correo. | I've told the team you prefer an email. | Ich habe dem Team gesagt, dass Sie eine E-Mail bevorzugen. |
| `contact_call` | Le he dicho al equipo que prefiere una llamada. | I've told the team you prefer a call. | Ich habe dem Team gesagt, dass Sie einen Anruf bevorzugen. |
| `ask_same_number` | ¿El equipo puede llamarle a este mismo número? | Can the team call you on this number? | Darf das Team Sie unter dieser Nummer anrufen? |

**Notes on the wording:**
- **`contact_answer`:** "Yo no puedo" instead of Voice's "Desde aquí no se confirma ni se envía nada". On the phone "desde aquí" has no place the caller can see. "I can't" is what the caller needs to hear.
- **"Le he dicho al equipo"** instead of "He pasado a la agencia que prefiere…". "Pasar que" is not natural Spanish.
- **The `contact_*` sentences say what was noted, never what the team will do with it.** They never say "le escribirán por WhatsApp".
- **The sentence order in `handoff_done`:** first what was done, then what is still open. The call ends on the open point, so nobody hangs up thinking they have an appointment.

## 3. Voice's removals: Copy agrees, and adds four keys

**Agreed:**
- `ask_send` goes;
- `frame_open` and `callback_first_after_hours` go (a time window is a time promise);
- `callback_first`, `time_confirm` and `wish_first` are replaced by `handoff_done` / `handoff_done_wish`;
- "nothing is sent from here" appears only once, in `contact_answer`.

**The closed-days hint stays,** because it comes from the agency's opening hours and is no promise: "Am Samstag haben wir geschlossen; passt Ihnen ein anderer Tag, Montag bis Freitag?"

**Four keys from Voice's table §1 that still promise or presuppose a call:**

| Key | Today | Copy |
|---|---|---|
| `contact_before` | „Jemand aus dem Team kann Sie anrufen und Ihnen die Uhrzeit bestätigen.“ | **goes.** It is the same promise as `time_confirm`, only softer |
| `still_closed_hour` | „… jemand aus dem Team klärt das mit Ihnen.“ | ES "Se lo paso al equipo tal cual." · EN "I'll pass it on to the team as it is." · DE "Ich gebe es so an das Team weiter." |
| `other_number` | „… nennen Sie die andere bitte beim Anruf.“ | ES "¿A qué otro número prefiere que le llamen?" · EN "Which other number would you prefer to be called on?" · DE "Unter welcher anderen Nummer möchten Sie angerufen werden?" (the number goes into the task) |
| prompt line 60 / 69 | the fallback „El compañero le confirma la hora cuando le llame.“ / „Un compañero puede llamarle por teléfono y confirmarle la hora.“ | **replaced by `handoff_done`.** The model is given no sentence of its own for this |

`offer_callback` and `offer_after_empty` are questions ("¿Quiere que le llamen?"). They may stay: every call creates the callback task anyway, so the question promises nothing that the system does not do.

## 4. Open for the owner (not Copy's)

- V-2: "Team" or "Agentur".
- The ≤ 3 simulations, Voice's cost line. Copy's sentences above are final, so they can go into it.
- **Later, per agency (Voice §3):** once an agency switches on `confirm_appointment` or `callback_time_promise`, Copy writes the extra sentence for that setting. No such sentence exists today, and none is needed for 04.12.
