# Copy → Redesign, 17.11.: demo replies in all four tabs, plan buttons

**Order:** the owner's verdict of 16.11. evening ("fast perfekt"). Pictures: `owner_evidence_1116/website_abend_1116/` (outside the repo).
**Due:** Tue 17.11. 12:00. The fixed build is Wed 18.11. 14:00.
**Status:** this is an editorial and technical check, not a legal approval and not a Meta approval.

**Point 3 of the order is already delivered:**
- the example week with 25 Spanish enquiries ("Esperan a una persona" = 0) and the "Próximamente" wording: `COPY_TO_REDESIGN_1116_EXAMPLE_WEEK_PROXIMAMENTE_v1.md` (`88143c1`, plus `006bad9` for `home-story.ts:191`);
- Redesign built it on `a697fb8` and `a8654d8`;
- nothing is open there.

---

## 1. Demo replies: the assistant helps, and says what a person takes over

### 1.1 What the product really does today (the proof for every sentence below)

| # | What the reply does | Proof |
|---|---|---|
| P-1 | It restates what the client wants: intent, area, size, budget, timing | production e-mail reply, 13.11. 14:40 ("Perfecto, … seguimos con la compra en Nerja."), owner picture `owner_evidence_1113/staff_mails_1113/S02_mail1_antwort_1440.png` |
| P-2 | It asks **one** next question that moves the case on | the same e-mail (one question about the use of the flat); production WhatsApp reply 13.11. 15:09 (one question about the type of home), `owner_evidence_1113/medien_prod_probe/MP_01_foto_y_pdf.png` |
| P-3 | It says that a person takes over | production WhatsApp reply 13.11. 15:11: "Un compañero te contactará con opciones adecuadas.", `MP_02_pdf_respuesta_y_audio.png` |
| P-4 | It records a viewing or call-back wish **with the time** and shows it to the responsible person; it never confirms a booking | owner decision KALENDER, 26.10. (`backend_handoff/handoff_in_2026-10-13/OWNER_DECISIONS_2026-10-24_R24.md:78`); phone: "Rückrufwunsch mit Wunschzeit … Nie eine Zusage" (`AUDIT_ORDERS_R25C_PROMPTS_R25C.md:305`) and the visible task "Ha pedido que le llamen" (`:296`) |
| P-5 | If nobody takes the case, the responsible person is reminded after one hour, and the next person is alerted after two | production since 13.11. (owner, card K2; `owner_evidence_1113/staff_mails_1113/S04…`, `S05…`) |
| P-6 | It reads data from a listing | **only partly proven:** <br>– a listing **link** on WhatsApp: the **record** picks up price, bedrooms and m² (K1, owner 16.11.); a reply that quotes those figures is **not** proven; <br>– a **PDF on e-mail**: the reply does quote price, bedrooms and reference (production run 161640, MM's register) |
| P-7 | Every reply carries the AI notice | production, both channels (`MP_01`, `S02`). The demo shows it as the label "Asistente automático de la agencia", Copy 1105 v3 §3 |

**What follows from this:**
- **Allowed:** the reply confirms the wish and its time, asks the next question, and says which part a person does. The price, availability and the date of the visit are the person's part.
- **Not allowed:**
  - "te llamamos a las 16:00" as a promise of a time (KALENDER, voice: never a commitment);
  - "hay", "disponible", "te lo enseño" (no availability);
  - quoting a price from a WhatsApp link (P-6 not proven).

**Changed from 06.11.:** the owner's earlier rule was "no contact promise". It gives way here to production, which already says "Un compañero te contactará" (P-3), and to the owner's new order. The time of a call or visit is still never promised.

**"Daten aus dem Inserat":** in these four tabs they stay on the record and are not quoted in a reply.
- None of the four tabs carries a PDF on e-mail.
- The WhatsApp link only fills the record (P-6).
- The page already shows the listing data in the card "Lee el anuncio que te envía el cliente" (K1).
- If the owner wants it inside the demo, the e-mail tab would need a buyer with an attached brochure. That changes the example week (Carmen is the seller in the report), so it is not done here.

### 1.2 The replies (file:line on `a8654d8`)

**WhatsApp · Laura · `lib/content/home-demo.ts:127`** (target and public; `replyWhatsapp`)

| | ES | EN |
|---|---|---|
| new | ¡Hola, Laura! Gracias por escribirnos. Buscas un piso de 2 dormitorios en Estepona, hasta 320.000 €, y quieres verlo la semana que viene. ¿Qué días y a qué hora te vienen mejor? Con eso, una persona del equipo te escribe con opciones y te propone fecha para la visita. | Hi Laura, thanks for writing to us. You're looking for a 2-bedroom flat in Estepona, up to €320,000, and you'd like to view next week. Which days and times suit you best? With that, someone on the team will write to you with options and propose a date for the viewing. |

Proof per sentence:
1. Greeting: P-7 (the label).
2. "Buscas …": P-1.
3. "¿Qué días y a qué hora…?": P-2 and P-4.
4. "una persona del equipo te escribe con opciones y te propone fecha": P-3 ("con opciones adecuadas"). It promises no day and no availability.

The record stays as it is, including the next step ("Una persona de tu equipo le propone día y hora.") and its small line ("Una petición de visita no es una cita: la confirma una persona.").

**Email · Carmen · `lib/content/home-demo.ts:171`** (target and public; `replyEmail`)

| | ES | EN |
|---|---|---|
| new | ¡Hola, Carmen! Gracias por escribirnos. Quieres vender tu piso de 3 dormitorios en Fuengirola, cerca del paseo marítimo, y te gustaría una valoración esta semana. Para prepararla, ¿cuántos metros tiene el piso, más o menos? Una persona del equipo te propone día y hora para la visita de valoración. | Hi Carmen, thanks for writing to us. You want to sell your 3-bedroom flat in Fuengirola, near the seafront, and you'd like a valuation this week. To prepare it, roughly how many square metres is the flat? Someone on the team will propose a day and time for the valuation visit. |

Proof per sentence:
1. Greeting: P-7.
2. "Quieres vender…": P-1.
3. "¿cuántos metros…?": P-2. It is one question, and a useful one for a valuation.
4. "Una persona del equipo te propone día y hora": P-3 and P-4. The time is the person's part.

The record stays as it is.

**Formulario web · Sofía · `lib/content/home-demo.ts:197–211`** (both views until the switch day, owner 16.11. evening; `webform` is "soon", a prototype, so on the switch day it gets PX-b. Corrected 17.11. after RV6: "target view only" was the rule before 16.11.)

**New: a reply after "Enviado".** Today the tab ends at "Enviado · martes 11:31" and shows no answer, which is why it reads as hand-on only. Proposal: after `sentAt`, a reply panel in the e-mail style of the e-mail tab, with the same label.

| Element | ES | EN |
|---|---|---|
| panel head | Respuesta por email · martes 11:33 | Reply by e-mail · Tuesday 11:33 |
| reply | Hola, Sofía. Gracias por tu mensaje. Buscas un piso de 2 dormitorios en Fuengirola, de alquiler de larga temporada, hasta 1.200 € al mes y a partir de enero. ¿Lo buscas amueblado o sin amueblar? Una persona del equipo te envía lo disponible que encaje. | Hi Sofía, thanks for your message. You're looking for a 2-bedroom flat to rent long term in Fuengirola, up to €1,200 a month, from January. Would you like it furnished or unfurnished? Someone on the team will send you what is available and fits. |

Proof:
- **11:33:** e-mail replies came after about 2 minutes (owner measurement, 13.11.).
- **The sentences:** P-1, P-2 and P-3, the same as the e-mail tab. "lo disponible" is chosen by the person; the assistant itself names nothing as available.
- **What is not proven:** that a form enquiry gets this e-mail. The form is a prototype. **On the switch day** the tab gets PX-b "Próximamente" (`…EXAMPLE_WEEK_PROXIMAMENTE_v1.md` §1), as today.
- The record stays as it is: next step "Enviar a Sofía lo disponible en alquiler."

**Teléfono · Álvaro · `lib/content/home-demo.ts:245`** (both views until the switch day, owner 16.11. evening; `phoneAssistant` is "soon", a staging prototype, so on the switch day it gets PX-b)

| | ES | EN |
|---|---|---|
| new | Perfecto, Álvaro. He pedido que te llamen esta tarde, a partir de las 16:00, a este número. El precio y el margen de la villa de Elviria te los explica una persona del equipo. | Great, Álvaro. I've asked for you to be called back this afternoon, from 16:00, on this number. The price and the room to negotiate on the villa in Elviria will be explained by someone on the team. |

Proof per sentence:
1. "He pedido que te llamen … a partir de las 16:00": P-4. The assistant confirms what it did (the wish with its time goes to the responsible person, task "Ha pedido que le llamen"). It does not promise the call at that time.
2. "a este número": the record keeps the caller's number, `home-demo.ts:258`.
3. "El precio … te lo explica una persona": the price is never given by the assistant (`:262`, "el precio lo da una persona").

**What is not proven:** the phone in production. **On the switch day** this tab gets "Próximamente", as today.

The record stays as it is, including the next step "Devolver la llamada a partir de las 16:00."

**Story · Laura · `lib/content/home-story.ts:150` and `:153`** (the second message, "Vivienda habitual. Nos gustaría verlo la semana que viene"). The same rule applies here, so "Queda en tu ficha" goes.

| | ES | EN |
|---|---|---|
| new | Gracias, Laura. ¿Qué días y a qué hora te vienen mejor la semana que viene? Una persona del equipo te propone fecha para la visita. | Thank you, Laura. Which days and times next week suit you best? Someone on the team will propose a date for the viewing. |

### 1.3 For Redesign
- Please update the comment `home-demo.ts:18`. "no contact promise" now reads: "no promise of a time, no availability, one question back; a person takes over price, availability and the date (Copy 1117 §1)".
- **Length:**
  - The WhatsApp and e-mail replies grow by about one sentence. At 390 px please check that the reply still fits in the chat surface without scrolling inside it.
  - If it does not fit, "Gracias por escribirnos." may go in both tabs. Nothing else goes.

---

## 2. Plan buttons (two equal ways per plan)

**Superseded in part, 17.11. evening (owner, final):** the pilot carries the Growth scope and stands under Essential and Growth. Enterprise has only "Contratar directamente". B-pilot is fixed to "Piloto gratuito · 14 días con Growth". B-1s stays "14 días gratis, sin tarjeta". See `COPY_TO_REDESIGN_1117_TARGET_PRODUCT_TEXTS_v2.md` §E. B-1, B-2 and B-2s below stay valid.

| # | Element | ES | EN |
|---|---|---|---|
| B-1 | button, black (→ pilot form with the plan) | Empieza 14 días gratis | Start 14 days free |
| B-1s | line under B-1 | 14 días gratis, sin tarjeta | 14 days free, no card |
| B-2 | button, outlined (→ contact form, option "Contratar un plan", with the plan) | Contratar directamente | Go straight to a plan |
| B-2s | line under B-2 | Te respondemos en 24 h laborables, con las condiciones por escrito. | We reply within 24 working hours, with the terms in writing. |
| B-subj | the subject of the contact form | Contratar {Plan} (e.g. "Contratar Growth") | Request the {Plan} plan (e.g. "Request the Growth plan") |
| B-pilot | the pilot form's message field, prefilled by B-1 (Redesign's WORKING line, confirmed 17.11.; the client can edit it) | Piloto gratuito · plan {Plan} | Free pilot · {Plan} plan |
| B-aria | accessible names (three plans, so the names must differ) | Empieza 14 días gratis con {Plan} · Contratar {Plan} directamente | Start 14 days free with {Plan} · Go straight to the {Plan} plan |

**Proof and limits:**
- **"sin tarjeta":**
  - TR-2 "El piloto es gratuito. No te pedimos tarjeta ni cuenta bancaria." (owner 16.11., `COPY_TO_REDESIGN_1116_OWNER_LIST_TEXTS_v1.md` §8);
  - the pilot form has no payment field.
- **"24 h laborables":** the owner's commitment of 16.11. B-2s says "Te respondemos" because the form may carry only an e-mail. With a phone number the confirmation says "Te llamamos" (CF-1, §7).
- **"condiciones por escrito":** the owner's order and DC-h ("Te enviamos el precio y el contrato por escrito").
- **"Empieza":** the pilot starts after the conversation. The form's confirmation names the steps (CF-2/CF-3, "Si encaja, … empiezan tus 14 días"), so the button promises nothing the form does not keep.
- **No price, no online payment, no "comprar"** on either button or line.
- **EN B-2 stays "Go straight to a plan"** (DC-l), so the button and the form option read the same.
- **"Request the … plan" in the EN subject**, not "Hire Growth": it says what happens, a request.

**What stays:** the line under the table, "Cada plan incluye todo lo del anterior. Te decimos el precio para tu agencia antes de acordar nada."

---

## 3. Open
- **None for these texts.** Lead's confirmation on Tue 12:00 (languages, "vender") does not touch them. The e-mail reply restates "vender" as the client's own word.
- **Owner, only if wanted:** the listing data quoted inside a reply (§1.1, "Daten aus dem Inserat").
