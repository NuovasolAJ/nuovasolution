# Copy → API, Audit (cc Owner, Redesign): the confirmation e-mail after a Growth demo request and an Enterprise conversation request, ES/EN · 23.11.2026, due Tue 24.11. 12:00

**Order:** the owner, 23.11.:
> "Bestätigungsmail für Growth (Demo) und Enterprise (Gespräch), ES/EN: kurz, was angekommen ist und was als Nächstes passiert, ohne feste Uhrzeit, ohne Aufforderung zu antworten. Texte bis Di 12:00 an API und Audit."

**Context:**
- API `cfa8c14` §2.2, F-c: there is no confirmation e-mail today.
- The sender would be `no-reply@` with the display name "NuovaSolution" (as T33 W-4).
- Tests go only to a test account, never to real customers.

**Status:** an editorial and technical check, not a legal approval.

**Rules for both mails:**
- tú, as on the website;
- no clock time and no deadline;
- no request to reply;
- no promise beyond the on-screen confirmation;
- the fields come from the request, never typed by hand;
- the same words as the website: "demo de Growth", "conversación sobre Enterprise", "una persona del equipo".

---

## 1. Growth: demo request (`interest = demo`)

| Part | ES | EN |
|---|---|---|
| Subject | Hemos recibido tu solicitud de demo de Growth | We have received your Growth demo request |
| Greeting | Hola, {nombre}: | Hi {name}, |
| What arrived | Hemos recibido tu solicitud de una demo de Growth para {agencia}. | We have received your request for a Growth demo for {agency}. |
| What happens next | Una persona del equipo te escribe para acordar contigo el día de la demo. | A person from our team will write to you to agree the day of the demo with you. |
| Close | No tienes que hacer nada más. | There is nothing else you need to do. |
| Signature | NuovaSolution | NuovaSolution |
| Footer | Recibes este email porque has enviado una solicitud en la web de NuovaSolution. Se envía automáticamente y no recibe respuestas. | You receive this email because you sent a request on the NuovaSolution website. It is sent automatically and cannot receive replies. |

## 2. Enterprise: conversation request (`interest = talk`)

| Part | ES | EN |
|---|---|---|
| Subject | Hemos recibido tu solicitud sobre Enterprise | We have received your request about Enterprise |
| Greeting | Hola, {nombre}: | Hi {name}, |
| What arrived | Hemos recibido tu solicitud para hablar de Enterprise para {agencia}. | We have received your request to talk about Enterprise for {agency}. |
| What happens next | Una persona del equipo te escribe para acordar contigo la conversación. | A person from our team will write to you to arrange the conversation with you. |
| Close | No tienes que hacer nada más. | There is nothing else you need to do. |
| Signature | NuovaSolution | NuovaSolution |
| Footer | the same as in §1 | the same as in §1 |

## 3. Fields and fallbacks

| Field | Source | If it is missing |
|---|---|---|
| `{nombre}` / `{name}` | the form's name field | greeting "Hola:" / "Hello," |
| `{agencia}` / `{agency}` | the form's agency field | the sentence ends without it: "…una demo de Growth." / "…a Growth demo." |
| language | the page the request was sent from (`/es` or `/en`) | ES |

## 4. Why these choices

**"No recibe respuestas" / "cannot receive replies"** is stated, not hidden.
- The sender is `no-reply@`.
- Without the line, a reply would be lost unseen. That is worse than saying it.
- It asks for nothing. There is no "escríbenos", no "responde".

**No "en 24 h laborables" in the mail.** The owner said "ohne feste Uhrzeit".
- **The on-screen confirmation still says "te escribe en 24 h laborables"** (`brief-1120.ts` `contact.done`; register P-2, line 38: "Bau · Owner-Teil (Besetzung)").
- If the owner wants the mail to say the same as the screen, the sentence becomes "Una persona del equipo te escribe en 24 h laborables para…". The EN becomes "…will write to you within 24 working hours to…".
- If the owner wants neither to say it, Redesign drops it from the screen too.
- Screen and mail should not differ for long. **The owner decides; Copy's default is the mail as written above.**

**No description of the demo or the conversation.** What a demo shows is not fixed anywhere Copy can point to. The mail says only what arrived and the next step.

## 5. Open

| Who | What |
|---|---|
| Owner | F-c: the mail is sent at all (yes / no); "24 h laborables" in screen and mail, or in neither |
| API | the template per language; the sender's display name "NuovaSolution"; a test run to the test account only, with the run ID |
| Audit | a register line for the mail once API's test run exists (it promises "una persona del equipo te escribe", the same as P-2) |
| Owner | the same mail for the Essential trial request? If yes, Copy writes it in the same form: "…tu solicitud de la prueba de Essential…" / "Una persona del equipo te escribe para activar tu prueba contigo." |
