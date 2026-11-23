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

## 4a. The owner's decisions, 23.11. (ec4181ed)

**The mail: yes.** "24 h" goes from the mail and from the screen.
- The mail above has no "24 h" and is final.
- **For API: the machine-readable version is `docs/website_redesign/mail/pilot_confirm_texts.json`,** with the same words: per interest (`demo`, `talk`) and per language, plus fallbacks, sender name and the four-mail test matrix for the staging sink.

**The screen, for Redesign** (`lib/content/brief-1120.ts`), Growth and Enterprise only:

| Key | Today | ES | EN |
|---|---|---|---|
| `plans.actionLine.growth` | Te respondemos en 24 h laborables, con las condiciones por escrito. | Te escribimos para acordar el día de la demo. | We write to you to agree the day of the demo. |
| `plans.actionLine.enterprise` | Te respondemos en 24 h laborables, con las condiciones por escrito. | Te escribimos para acordar la conversación. | We write to you to arrange the conversation. |
| `contact.done.demo.h` | Gracias. Una persona del equipo te escribe en 24 h laborables para acordar el día de la demo. | Gracias. Una persona del equipo te escribe para acordar el día de la demo. | Thank you. A person from our team will write to you to agree the day of the demo. |
| `contact.done.talk.h` | Gracias. Una persona del equipo te escribe en 24 h laborables para acordar la conversación. | Gracias. Una persona del equipo te escribe para acordar la conversación. | Thank you. A person from our team will write to you to arrange the conversation. |
| `contact.done.talk.next[1]` | Hablamos de tus oficinas y de cómo trabajáis. | Hablamos de tu equipo y de cómo trabajáis. | We talk about your team and how you work. |
| `contact.talk.body` | Cuéntanos cuántas oficinas tenéis y cómo trabajáis. Te proponemos una conversación y después una propuesta por escrito. | Cuéntanos cómo es tu agencia y cómo trabajáis. Te proponemos una conversación y después una propuesta por escrito. | Tell us about your agency and how you work. We suggest a conversation, then a proposal in writing. |

**Why the last two rows:** the owner's decision 2 of 23.11. says several offices are neither a plan feature nor a planned function. A confirmation that announces "tus oficinas" as the topic leads there.

**Side effect for Audit (D-11):** the two card lines lose "con las condiciones por escrito". "Te enviamos las condiciones por escrito" (`done.demo.next[2]`) and "una propuesta por escrito" stay. Audit says whether they carry the counsel exception of register line 44.

**Not changed: Essential, "contract" and "other" still say "24 h laborables"** (brief-1120 :89, :125, :128, :129, :136; faq.ts :195, :206; home-1103 :456, :546, :551, :599; es/en access, ask, trial).
- The owner's decision names Growth and Enterprise.
- **Owner:** does "24 h" go there too? If yes, Copy delivers the lines in one table. The pattern is "Te escribimos para activar tu prueba contigo." / "We write to you to set up your trial with you."

## 4b. The "contratar" confirmation gets its three steps (RV6 `ebc8b6e`, observation on `bea7d19`)

**RV6 noted:** the confirmation of the direct-contract way is the only one of the four without "Qué pasa ahora" steps, although it carries the highest intent to buy. **Copy adds them,** in the same form as trial, demo and talk. They contain no deadline (owner ec4181ed) and promise only what the form body already says ("Te enviamos el precio y el contrato por escrito. Firmas solo si te encaja.").

| Key | ES (final) | EN (final) |
|---|---|---|
| `brief-1120.ts` `contact.done.contract.next[0]` | Te enviamos el precio y el contrato por escrito. | We send you the price and the contract in writing. |
| `contact.done.contract.next[1]` | Lo revisas con calma y vemos contigo cualquier duda. | You read it at your own pace, and we go through any questions with you. |
| `contact.done.contract.next[2]` | Firmas solo si te encaja, y lo preparamos todo contigo. | You sign only if it suits you, and we set everything up with you. |

**No placeholder (corrected after RV6 `ef25eff`).** The first version of step 3 had "{plan}".
- In the build, `{plan}` is filled in only in the card heading (`pilot-request.ts:20`), not in the confirmation's `next`.
- Its fallback "un plan" would read "preparamos un plan contigo".
- The step names no plan; the heading above it already does. `contact.done.contract.h` stays as it is.

**For the timing:** the candidate `bea7d19` stays unchanged until RV6 has measured. These lines go into the first follow-up.

**For Audit:** "el contrato por escrito" is the same promise as the counsel exception, register line 44 ("Las condiciones, por escrito."). Audit says whether it carries the exception.

## 5. Open

| Who | What |
|---|---|
| Owner | F-c: the mail is sent at all (yes / no); "24 h laborables" in screen and mail, or in neither |
| API | the template per language; the sender's display name "NuovaSolution"; a test run to the test account only, with the run ID |
| Audit | a register line for the mail once API's test run exists (it promises "una persona del equipo te escribe", the same as P-2) |
| Owner | the same mail for the Essential trial request? If yes, Copy writes it in the same form: "…tu solicitud de la prueba de Essential…" / "Una persona del equipo te escribe para activar tu prueba contigo." |
