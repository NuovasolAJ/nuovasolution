# Copy → Audit, Redesign (cc Owner): every plan card in three columns, and what goes on the card for 04.12. · 23.11.2026

**Order:** the owner, 23.11.:
> "Bitte führ jede Karte in drei Spalten: in Prod nutzbar / nur auf Staging belegt / muss noch gebaut werden. Auf die Karte für den 04.12. kommt nur, was bis dahin in Prod belegt ist. Die Staging-Grenzen (50 Personen, 10 CRM) gelten nicht als Prod-Beleg, solange Prod keine Planebene hat (API 65f31f84). Die Growth-Frage entscheidet der Owner anhand meines Registers."

**Sources:**
- the register in the build `ab38b69` (`lib/claims.ts` `claims` and `planRows`, with the comments that name each proof);
- API `cfa8c14` and `5c87597` (plan data and request paths);
- API `bd7a685` (the answer to Copy's Enterprise candidates);
- n8n `65f31f84`: prod has no plan layer (no plan rows, no `resolve_entitlements`, no limit triggers, no `plan_lead_admit`).

**Status:** an editorial and technical check, not a legal approval. **Audit's register decides.** Where Audit's register says otherwise, it wins, and Copy adjusts the lines.

**"Usable in prod"** means proven in prod on NuovaSolution's own agency, register state `included`.
- For a new agency, the connected mailbox is the condition (A12). That is the go-live condition (a) anyway.
- A row that is proven in prod only for NuovaSolution's own number or own agency counts as **staging / own agency only**.

---

## 1. Essential (what every plan carries, `planRows` ALL, plus the included rows outside the table)

| Usable in prod | Proven only on staging, or only for the own agency | Still to be built, or an external release |
|---|---|---|
| reply by e-mail (`replyEmail`) | **reply on WhatsApp for a customer agency.** `replyWhatsapp` is included only on NuovaSolution's own number. On the agency's number it needs `whatsappOwnNumber` ("soon"; prod has exactly one number, API 20.11.) | other languages (`otherLanguages`, SPRACHEN-NEU; hidden in both views) |
| also at night (`replyOutOfHours`; the register asks for its own evidence for the public claim, §1b) | one record across channels (`oneRecordAcrossChannels`; prod only for NuovaSolution, API cee6992) | external CRMs (`integrations`; no provider with a prod sync) |
| the language recognised and noted (`languageNoted`) | the alert to the agent (`alert`; held back in prod, HA1, until V3-DEPLOY and a prod probe) | 3D (`model3d`; T6 not accepted) |
| record in the built-in CRM (`crm`) | the weekly e-mail (`weeklyEmail`; only the own agency; T33 fixes not in prod) | |
| priority with its reason (`priorityWithReason`) | the trial's limits: 3 people, 750 enquiries a month, 1 mailbox, 1 CRM (staging plan rows; prod has no plan layer) | |
| labels in the Gmail inbox (`labels`) | the trial request form (`pilot_request` intake: staging; prod proposed Tue 24.11. 11:00, API `cfa8c14` §2.3) and the trial activation (`pilot_agency_onboard`, staging) | |
| the report in the login (`reportInLogin`) | | |
| reads the listing link a client sends (`listingLink`, Main 175669 / Enricher 175671) | | |
| reminder after 1 h, escalation after 2 h (`reminders`, 195149 / 195288) | | |

## 2. Growth adds (`planRows` GE)

| Usable in prod | Proven only on staging | Still to be built, or an owner decision |
|---|---|---|
| **nothing** | the task list per person (`taskList`; Daily's team view b08ba6f4 on staging; prod: 0 tasks for pilot_test_a) | the trend and insights in the report (`reportTrend`; the extended tier is empty in prod) |
| | listing proposals (`matching`; pm_certified = false; in the data also on in Essential) | the phone assistant (`phoneAssistant`; staging prototype; owner decision E-4 Growth or Enterprise; voice routing does not ask the plan) |
| | follow-up (`followup`; the prod sender is inactive; `followup.basic` also on in Essential) | |
| | leads from portals and ads (`adsLeads`; no real delivery) | |
| | 8 people and 3 CRM connections (plan rows; no plan layer in prod). Inviting with roles: staging b20c66ba; TEAMROLES-PROD package Tue 24.11. 12:00 (topic 32) | |

## 3. Enterprise adds (`planRows` E, plus API's candidates)

| Usable in prod | Proven only on staging | Still to be built, or an external release |
|---|---|---|
| **nothing** | up to 50 people (X-3; enforced on staging; prod needs TEAMROLES-PROD **and** the plan layer, topic 23, no date) | several offices (X-1: only a counter, not enforced, nobody can create an office, **no line**, API `bd7a685` §2) |
| | up to 10 CRM connections (X-7; the counter is enforced on staging; its use hangs on external CRMs, topic 35) | social media (`instagram` / X-4; Meta; `social.publish` is also on in Growth: a conflict in the data) |
| | no monthly cap on enquiries (X-2; true, but no difference until Lead's gate is in the Main) | phone minutes 1,000 (X-5; owner decision E-4 first) |
| | 3D quota 25 (X-8; `px3d_quota` on staging; 3D is not in prod) | structured property feed (X-6; the gate exists, no importer calls it; owner: Enterprise only?) |

---

## 4. The cards for 04.12. (only what is proven in prod; texts ES/EN, final)

### Essential

| Line | ES | EN | Keys |
|---|---|---|---|
| 1 (replaces "Responde por WhatsApp y email, también de noche.") | Responde por email, también de noche. | Replies by email, also at night. | `replyEmail`, `replyOutOfHours` |
| 2 (unchanged) | Cada consulta en su ficha, con su prioridad y su motivo. | Every enquiry on its record, with its priority and reason. | `crm`, `priorityWithReason` |
| 3 (replaces "Cada semana, un informe con lo que pide tu atención.") | Cada semana, un informe en tu cuenta con lo que ha llegado. | Every week, a report in your account on what has arrived. | `reportInLogin` |
| optional 4 | Lee el anuncio que te envía el cliente. | Reads the listing a client sends you. | `listingLink` |
| optional 5 | Si nadie atiende una tarea, te la recuerda a la hora y avisa al responsable a las dos. | If nobody takes a task, it reminds you after an hour and alerts the person in charge after two. | `reminders` |

**Why lines 1 and 3 change:**
- **Line 1:** WhatsApp on the agency's number is not proven in prod.
- **Line 3:** "lo que pide tu atención" promises the insights (`reportTrend`, "soon"), and the e-mail is not proven for a customer agency.
- **Each returns as soon as Audit moves its key to "usable in prod":**
  - line 1 becomes "Responde por WhatsApp y email, también de noche." / "Replies on WhatsApp and email, also at night." (`whatsappOwnNumber`);
  - line 3 becomes "Cada semana, un informe en tu cuenta y en tu correo." / "Every week, a report in your account and in your inbox." (`weeklyEmail`).

### Growth and Enterprise

**Today nothing they add is proven in prod.** On these two cards:
- "Todo lo de Essential, y además:" / "Todo lo de Growth, y además:" **go**, because nothing would follow them;
- the card keeps its audience, its action and the price line;
- no difference line, and no "Próximamente".

| Key | Today | ES (04.12.) | EN (04.12.) | Why |
|---|---|---|---|---|
| `brief-1120.ts` `who.enterprise` | Para varias oficinas | **Para agencias grandes** | **For larger agencies** | X-1 is no function (API `bd7a685`). "Varias oficinas" names an audience only through a function that does not exist |
| `home-1103.ts:482` Enterprise line | Todo lo de Growth, para varias oficinas[, con …] | **Todo lo de Growth, para agencias grandes.** (the `con …` part only with prod-proven parts) | **Everything in Growth, for larger agencies.** | the same |
| `es.ts:415` / `en.ts:450` `planLines` | essential "Responder y ordenar lo que llega. Una oficina, un equipo pequeño." · growth "Seguir, proponer y coordinar. Un equipo más grande." · scale "Captar, atender llamadas y presentar en 3D. Varias oficinas." | essential **unchanged** · growth **Para un equipo más grande.** · scale **Para agencias grandes.** | essential unchanged · growth **For a larger team.** · scale **For larger agencies.** | follow-up, listing proposals, calls and 3D are not in prod. Fix it even if the line is not rendered |
| `home-1103.ts:601` FAQ "¿Cómo empiezo?", second half | ¿Más de un equipo o varias oficinas? Pide una demo de Growth… | **¿Un equipo más grande?** Pide una demo de Growth o habla con nosotros sobre Enterprise. | **A larger team?** Book a Growth demo or talk to us about Enterprise. | the same |
| `brief-1120.ts:111` `contact.talk.body` | Cuéntanos cuántas oficinas tenéis y cómo trabajáis… | **unchanged** | unchanged | a question to the prospect, not a promise |

**When a key reaches "usable in prod"**, its line from `brief-1120.ts` `plans.differences` comes back under "y además:". Copy's wording stays. For Enterprise, X-3 becomes:
- ES: Hasta 50 personas en la cuenta.
- EN: Up to 50 people on the account.

Here `{n}` = 50, read from the plan row (API `bd7a685` §3), never typed by hand.

---

## 5. What follows for the owner (not Copy's decision)

1. **Growth and Enterprise have no difference proven in prod today.**
   - The earliest one is X-3 (people), via TEAMROLES-PROD (Tue 24.11.) **plus** the plan layer in prod (topic 23, no date).
   - Without topic 23 before 04.12., both cards stand on audience and conversation only.
   - The owner decides the Growth question with Audit's register.
2. **The comparison matrix** carries the same claims as the cards. If the rule "only what is proven in prod" applies to the cards, it applies to the matrix: a tick for a "soon" row is the same promise.
   - "No Próximamente" and "only what is proven" together mean that a row not proven by 04.12. leaves the matrix. It does not get a mark.
   - Copy recommends that. The owner confirms.
3. **The hero and the WhatsApp demo (Mila)** show WhatsApp on the agency's number. That is `whatsappOwnNumber`, "soon", the owner's release (20.11. 09:05 (3)).
   - The card rule does not cover the hero, but the same question does. Audit puts it on the 04.12. list.
4. **The Essential card's own action** (the trial request) needs the request form in prod (A12 row 14, proposed Tue 24.11. 11:00) and F-e fixed (Redesign: `consent` forwarded by the BFF).

---

## 6. Addendum, 23.11. evening: the owner's decisions. **§4 and §5 are NOT USED.**

**The owner, 23.11., decision 2:**
> "Die Website zeigt im Preview NuovaSolution bei 100 %: alle geplanten Kanäle, Funktionen, Pakete und Wege, verständlich und ohne Próximamente. Die Einteilung Prod/Staging/Bau steht nur im internen Register (n8n governance/WEBSITE_VERSPRECHEN_REGISTER_1120_v1.md, 704960b6)."

**What that means:**
- The cards and the matrix show the planned offer.
- The three columns in §1–§3 are internal. They feed Audit's register and never go on a page.
- §4 (the 04.12. card with prod-proven lines only) and §5 are withdrawn. **Redesign builds nothing from §4.**

### 6.1 The card lines for the preview (target view), final

| Card | Line | ES | EN | Keys | Register line |
|---|---|---|---|---|---|
| Essential | 1 | Responde por WhatsApp y email, también de noche. | Replies on WhatsApp and email, also at night. | `replyWhatsapp`, `replyEmail`, `replyOutOfHours` | 1, 2, 3 |
| Essential | 2 | Cada consulta en su ficha, con su prioridad y su motivo. | Every enquiry on its record, with its priority and reason. | `crm`, `priorityWithReason` | 11, 12 |
| Essential | 3 | Cada semana, un informe con lo que pide tu atención. | Every week, a report on what needs your attention. | `reportInLogin`, `weeklyEmail` | 28, 29 |
| Growth | 1 | Cada persona, su lista de tareas del día. | Everyone gets their task list for the day. | `taskList` | 23 |
| Growth | 2 | Propone inmuebles que encajan con cada cliente. | Suggests listings that fit each client. | `matching` | 26 |
| Growth | 3 | Seguimiento de tus contactos, con su permiso. | Follow-up with your contacts, with their permission. | `followup` | 27 |
| Enterprise | 1 (**replaces** "Varias oficinas en una sola cuenta.") | Hasta 50 personas en la cuenta. | Up to 50 people on the account. | plan row `seats` (`{n}` = 50 from the row) | 41 (X-3) |
| Enterprise | 2 | Clientes nuevos desde tus redes sociales. | New clients from your social media. | `instagram` | 33 |
| Enterprise | `who` (**replaces** "Para varias oficinas") | Para agencias grandes | For larger agencies | — | 42 |

Lines 1–3 for Essential and Growth are batch 1 §3.1, unchanged; they are already in the build.

**Why Enterprise line 1 changes even in the 100 % view:**
- "Varias oficinas" is not a planned function. Nobody can create an office, there is no build order and no owner line (API `bd7a685` §2).
- The register says "streichen … sofort möglich" (line 42).
- X-3 is planned and built on staging (TEAMROLES-PROD, topic 32; plan layer, topic 23).
- **If the owner wants offices as a planned function,** he says so and the line comes back. Until then it is X-1 open in the register.

**The same replacement applies to:**
- `home-1103.ts:482`: "Todo lo de Growth, para agencias grandes." / "Everything in Growth, for larger agencies.";
- `planLines.scale` "… Varias oficinas." → "… Para agencias grandes." / "… For larger agencies.";
- the FAQ `:601` "¿Más de un equipo o varias oficinas?" → "¿Un equipo más grande?" / "A larger team?".

The other `planLines` stay as they are: in the 100 % view they describe planned functions.

### 6.2 My three columns against Audit's register `704960b6`: deviations, for Audit

**Where Copy was wrong, Copy takes the register's class:**

| # | Point | Copy's column (§1–§3) | Register | Who changes |
|---|---|---|---|---|
| D-1 | `replyOutOfHours` | usable in prod | **nur Nachweis fehlt** (line 2): no prod run ID of an out-of-hours reply | Copy takes the register's class |
| D-2 | `reminders` | usable in prod | belegt **only for agencies with office hours** (lines 17–19; AGENCY-HOURS-PROD; 4 of 5 prod agencies have none) | Copy takes the register's condition |
| D-3 | `taskList` | staging only | **nur Nachweis fehlt**: works in prod for `nuovasolution` (morning brief 188254 → 188255); as a Growth difference: build (plan layer) | Copy takes the register's class |
| D-4 | `followup` | staging only | build, **plus the counsel exception** (E1) | Copy adds the exception |
| D-5 | `adsLeads` | staging only | build, with a **Meta exception** for the Meta part | Copy adds the exception |

**Where the register should add something:**

| # | Point | Copy's column (§1–§3) | Register | Who changes |
|---|---|---|---|---|
| D-6 | `matching` | listed under Growth; the data has it on in Essential | the same conflict (W-1) | none; agreed |
| D-7 | `integrations` | to build | build; **"Namen dürfen nicht als verfügbar stehen"** (line 31) | **for Audit and Redesign:** in the 100 % view the CRM names are planned, but the owner limited them on 23.11. to CRMs relevant in Spain / Costa del Sol, built on customer request. Copy needs the list before writing any CRM name. Until then the matrix says "Conexión con tu CRM" / "Connection to your CRM", with no names |
| D-8 | `labels` | usable in prod (Gmail) | belegt, Gmail only; "Satz muss Gmail meinen" (line 14) | **Copy:** the matrix line becomes "Etiquetas en tu bandeja de Gmail" / "Labels in your Gmail inbox" until labels for Outlook are planned or proven. Redesign takes it with the cards |
| D-9 | P-11, the task title with the client's name and the reference | not in my columns | build; "Referenz im Titel ist nicht belegt, sonst Text anpassen" (line 21) | **Copy, for the register:** the 100 % view keeps "Llamar a Mila · Comprobar disponibilidad de la ref. 9895153". If Lead's package carries the name but not the reference, Copy's fallback for prod is "Llamar a Mila · Comprobar disponibilidad del inmueble" / "Call Mila · Check whether the property is available" |
| D-10 | `origin`, `mailboxConnection`, `outlook`, `webform`, `dailyVoice`, AGENCY-HOURS, P-14 | missing in my columns | in the register (lines 6–8, 13, 19, 22, 24) | none; the register is complete there, and Copy's columns were cards only |
| D-11 | `pilotCta.line2` "Las condiciones, por escrito." | not in my columns | counsel exception (line 44) | **the same phrase is in Copy's `actionLine` for Growth and Enterprise** ("…con las condiciones por escrito."). Audit: is it the same promise? If yes, it carries the same exception |

**No deviation:**
- **Prod has no plan layer,** so no plan difference is usable in prod.
- **X-1 gets no line.**
- **WhatsApp:** via our number for agencies = build; via the agency's own number = the Meta exception.

### 6.3 Q-1 = on request (owner 23.11., decision 1): the last self-start lines, for Redesign

| Key | Today | ES | EN |
|---|---|---|---|
| `trial.stepsLead` | Paso a paso, a tu ritmo. Tu progreso queda guardado… / One step at a time, in your own time… | Lo que ya está hecho queda guardado: si paramos, seguimos donde lo dejamos. | What is done stays saved: if we stop, we pick up where we left off. |
| `signup.eyebrow` | Empieza gratis / Start free | Tu prueba de Essential | Your Essential trial |
| `signup.lead` | 14 días gratis. Sin pago. / 14 days free. No payment. | 14 días gratis con Essential, sin tarjeta. | 14 days free on Essential, no card. |
| `register.lead` (es.ts:714, en.ts:764) | …los 14 días empiezan cuando la actives. / …the 14 days start when you activate it. | Tu acceso funciona. Este último paso crea tu agencia; los 14 días empiezan cuando activemos tu prueba contigo. | Your login works. This last step creates your agency; the 14 days start when we activate your trial with you. |
| `offer.steps[0]` (es.ts:324, WORKING) | Crea tu cuenta · Tu nombre, tu email de trabajo, una contraseña. | **Pide tu prueba** · Te escribimos en 24 h laborables y la preparamos contigo. | **Request your trial** · We write to you within 24 working hours and set it up with you. |
| `offer.steps[1]` (WORKING) | Pon nombre a tu agencia y configúrala · Tus datos, tus datos legales, tu logo, tu equipo. | **Preparamos tu agencia contigo** · Tus datos, tus datos legales, tu logo y tu equipo. | **We set up your agency with you** · Your details, legal details, logo and team. |
| `offer.steps[2]`, `offer.stepsTitle` "Así empiezas", `offer.note` | WORKING | **confirmed unchanged** | confirmed unchanged |

**Growth → demo, Enterprise → conversation:** already built (stage 1). Nothing new.

### 6.4 Redesign's three WORKING lines for D-7, and WhatsApp via our number (register line 3)

**D-7: the CRM lines.** Copy's rule: the owner said CRMs relevant in Spain, built on request.
- So no "sí" and no "se conecta" that sounds like any CRM works by itself.
- Outlook is a mailbox, not a CRM. It does not share a row with the CRM.

| # | Redesign WORKING | ES (final) | EN (final) |
|---|---|---|---|
| (a) | matrix row "Conexión con tu CRM y con Outlook" | CRM row: **Conexión con tu CRM**. Outlook goes into the mailbox row: **Tu correo de Gmail o de Outlook** | CRM row: **Connection to your CRM**. Mailbox row: **Your Gmail or Outlook mailbox** |
| (b) | home FAQ "Incluye un CRM. También se conecta con el tuyo." | Incluye su propio CRM. Si ya trabajas con otro, vemos contigo cómo conectarlo. | It includes its own CRM. If you already work with another one, we look at connecting it with you. |
| (c) | /faq Q-18/19 "¿Funciona con mi CRM?" → "Sí. Se incluye un CRM y, si ya usas uno, lo conectamos contigo." | question unchanged · answer: NuovaSolution incluye su propio CRM, así que no necesitas otro. Si ya trabajas con uno, vemos contigo cómo conectarlo. | question unchanged · answer: NuovaSolution includes its own CRM, so you do not need another one. If you already work with one, we look at connecting it with you. |

**WhatsApp via NuovaSolution's number.**
- The owner's decision 2 plans both ways: via our number (register line 3, build) and via the agency's number (line 4, Meta exception).
- Today the site names only the agency's number.
- **Where:** the home FAQ (the full answer) and the matrix's WhatsApp row (short). The offer step stays as it is; a step should not carry an option.

| Place | ES | EN |
|---|---|---|
| matrix, WhatsApp row | WhatsApp, con el número de tu agencia o con el nuestro | WhatsApp, on your agency's number or on ours |
| home FAQ, question | ¿Necesito un número de WhatsApp Business? | Do I need a WhatsApp Business number? |
| home FAQ, answer | No. Puedes empezar con el número de WhatsApp de NuovaSolution y pasar al de tu agencia cuando lo tengas. | No. You can start on NuovaSolution's WhatsApp number and move to your agency's own number when you have one. |

**Open, for Audit and Lead (not for the page):** with our number, does the reply say the agency's name? The demo says "soy el asistente de Marta". With our number the client writes to a NuovaSolution number, and the register should state what the client sees.
