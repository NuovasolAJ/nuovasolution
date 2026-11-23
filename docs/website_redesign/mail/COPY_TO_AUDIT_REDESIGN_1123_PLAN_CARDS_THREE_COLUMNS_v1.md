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
