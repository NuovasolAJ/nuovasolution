# Copy → PM, API: topic 28 (the first reactivation message) and topic 23 (self-sign-up and trial) · 20.11.2026 (due Mon 23.11. 12:00)

**Asked by:** the owner, 20.11.: "Texte ES/EN/DE für (1) Thema 28 Reaktivierung: erste Nachricht an einen früheren Interessenten bei einem neu passenden Objekt (kurz, Makler-Ton, nur Fakten aus dem Inserat, Abmeldehinweis), (2) Thema 23 Selbst-Anmeldung und Trial: Anmeldeseite, Bestätigung, Hinweis Trial-Ende, Grenze erreicht. Abgleich mit lib/claims.ts, nichts versprechen, was nicht ‚included' ist."

**For:** PM and API.

**Status:** an editorial and technical check, not a legal approval and not a Meta approval.

**Basis:**
- the register `lib/claims.ts` as of 20.11.;
- today's sign-up texts `lib/i18n/dictionaries/es.ts:448–545` and their EN counterparts;
- the sign-up route `app/api/bff/signup/route.ts`;
- from the n8n repo (read only): `governance/AGENCY_ONBOARDING_TRIAL_GROWTH_IMPL_EVIDENCE_v1.md` and `governance/AGENCY_ONBOARDING_PROVIDER_TRIAL_LIFECYCLE_ADJUDICATION_v1.md`.

**Placeholders** are in `{curly braces}`. Every number (limits, dates, days) is filled from the data at send time; Copy writes none.

---

## 0. The register check: what these texts may promise

### 0.1 Topic 28 is itself "soon"

**The register:** the reactivation message is `matching` + `followup`, and both are "soon" (`claims.ts`: `pm_certified = false`, "prod sender inactive").

So this message may go out only when all of these hold:

| Condition | Why |
|---|---|
| `matching` and `followup` are "included" | the message is the function |
| **e-mail:** `mailboxConnection` is in production (A12) | the message comes from the agency's mailbox, and the reply goes back there |
| **WhatsApp:** `whatsappOwnNumber` is in production, plus a WhatsApp template approved by Meta | a first message outside a conversation needs an approved template |
| consent for each contact, its legal basis cleared by counsel | PRODUCT_TRUTH L-02 / L-08: "highest-risk single capability"; counsel on reactivation consent is still open |
| the opt-out works before the first send (link and keyword) | the message promises it |

### 0.2 Languages

**Today only Spanish goes out automatically.** `otherLanguages` is "soon" and stays hidden in both views (owner, 20.11. 09:05, point 4).

**EN and DE are ready texts.** They may be sent only once `otherLanguages` is "included", with its evidence.

**The site and the app have no DE locale.** The account language is `es` or `en` (`signup/route.ts`). The DE texts of §2 are therefore for reading (PM, owner) and for the day a DE locale exists.

### 0.3 Topic 23 is "soon" as well

**The register:** `trial` and `publicSignup` are "soon"; the owner decided on 20.11. "kein Selbst-Start". So all of §2 are target texts.

**Inside them only "included" functions are named:**
- reply in Spanish;
- the record with its priority and reason;
- the report in the login;
- the reminder.

**Not named:**
- property matching;
- follow-up;
- team and roles (`teamRoles` "soon", API `9ecba2c` as relayed by Redesign);
- the phone;
- Instagram;
- other languages;
- the agency's own WhatsApp number.

### 0.4 Two findings for PM and API (outside Copy's lane)

**F-1, the trial matrix does more than the register allows.** In staging, the `trial` plan row has:
- `followup.basic` ON;
- `property.matching` LIMITED.

(`AGENCY_ONBOARDING_TRIAL_GROWTH_IMPL_EVIDENCE_v1.md`, entitlement matrix.)

The register has both as "soon", and follow-up is legally held (`plans.ts`, C3 §7). If the matrix goes to production like this, a trial agency would send follow-ups the site does not promise and counsel has not cleared. The matrix should match the register before go-live. It is data, so it changes without a deploy.

**F-2, the trial's scope is decided twice:**
- `plans.ts` R26: the trial equals Essential;
- the owner: the pilot is 14 days with the Growth scope.

§2 therefore names the scope only as `{plan}`. PM fills it.

---

## 1. Topic 28: the first message to a former enquirer, when a new listing fits

### 1.1 Rules

1. **Short:** the body is at most 80 words, not counting the footer.
2. **The agent's tone:** "tú" in ES and "Sie" in DE, as an estate agent writes to a client. No marketing tone.
3. **Facts only from the listing:** type, area, price, bedrooms, size and link.
   - No judgement: not "ideal", "oportunidad", "chollo", "exclusivo" or "no te lo pierdas".
   - No urgency, no comparison with the client's budget, no discount.
4. **One sentence from the record:** when they wrote and what they were looking for (type and area). Nothing else from the record.
5. **A missing field is dropped with its separator.** Never "precio a consultar", never an empty "· m²".
   - No price: the subject reads "{Tipo} en {zona}".
   - No month: "Hace un tiempo nos escribiste…" / "A while ago you wrote to us…" / "Vor einiger Zeit haben Sie uns geschrieben…".
   - No first name: "Hola:" / "Hello," / "Guten Tag,".
6. **The month carries the year** when it is not the current year: "en marzo de 2025".
7. **The sender:** the agency, signed by the responsible agent.
8. **The footer** always says three things:
   - why we are writing (permission);
   - how to stop;
   - that the assistant prepared the message. The site says: "Cada respuesta automática indica que la escribe un asistente."
9. **The first message only.** What happens without a reply is a follow-up rule; that is not this file.

**The permission sentence of the footer** is true only for a contact with recorded consent for this purpose. If counsel accepts another legal basis, that sentence changes, and Copy rewrites it then.

### 1.2 Fields

| Field | From | Example (fictional) |
|---|---|---|
| `{nombre}` | record, first name | Javier |
| `{mes_consulta}` | record, month of the earlier enquiry | marzo |
| `{busqueda}` | record: type with an indefinite article, plus area, in the message's language | un ático en Benalmádena · a penthouse in Benalmádena · eine Penthousewohnung in Benalmádena |
| `{tipo}` `{zona}` `{precio}` `{dormitorios}` `{superficie}` `{enlace}` | listing | Ático · Benalmádena · 275.000 € · 2 · 85 · link |
| `{agente}` `{agencia}` | record / agency | Marta · {agencia} |
| `{enlace_baja}` | the opt-out link | — |

**Price format:**
- ES: "275.000 €"
- EN: "€275,000"
- DE: "275.000 €"

### 1.3 E-mail

**ES**

> **Asunto:** {Tipo} en {zona}, {precio}
>
> Hola, {nombre}:
>
> En {mes_consulta} nos escribiste porque buscabas {busqueda}. Acaba de entrar uno que encaja con lo que nos dijiste:
>
> {Tipo} en {zona} · {dormitorios} dormitorios · {superficie} m² · {precio}
> {enlace}
>
> ¿Sigues buscando? Si te interesa verlo, contesta a este email y te propongo un día.
>
> Un saludo,
> {agente}
> {agencia}
>
> —
> Te escribimos porque nos diste permiso para avisarte de inmuebles como este. Si no quieres recibir más, pulsa aquí: {enlace_baja}. Este mensaje lo ha preparado el asistente de {agencia}.

**EN**

> **Subject:** {Type} in {area}, {price}
>
> Hi {name},
>
> In {month} you wrote to us because you were looking for {search}. One has just come in that fits what you told us:
>
> {Type} in {area} · {bedrooms} bedrooms · {size} m² · {price}
> {link}
>
> Are you still looking? If you'd like to see it, reply to this email and I'll suggest a day.
>
> Best regards,
> {agent}
> {agency}
>
> —
> We're writing because you gave us permission to tell you about properties like this one. To stop receiving these messages, click here: {unsubscribe_link}. This message was prepared by {agency}'s assistant.

**DE**

> **Betreff:** {Typ} in {Ort}, {Preis}
>
> Hallo {Vorname},
>
> im {Monat} haben Sie uns geschrieben, weil Sie {Suche} gesucht haben. Gerade ist ein Objekt hereingekommen, das zu Ihren Angaben passt:
>
> {Typ} in {Ort} · {Schlafzimmer} Schlafzimmer · {Fläche} m² · {Preis}
> {Link}
>
> Suchen Sie noch? Wenn Sie es besichtigen möchten, antworten Sie einfach auf diese E-Mail, und ich schlage Ihnen einen Termin vor.
>
> Viele Grüße
> {Makler}
> {Agentur}
>
> —
> Wir schreiben Ihnen, weil Sie uns erlaubt haben, Sie über Objekte wie dieses zu informieren. Wenn Sie keine weiteren Nachrichten erhalten möchten, klicken Sie hier: {Abmeldelink}. Diese Nachricht hat der Assistent von {Agentur} vorbereitet.

**Notes:**
- **DE:** "Hallo {Vorname}" with "Sie" is the usual mix in agency mail today. If PM wants it more formal: "Guten Tag {Vorname} {Nachname},".
- **The reply goes to the agency.** "Contesta a este email" needs the agency's mailbox (A12).

### 1.4 WhatsApp (template; only under §0.1)

> **Replaced by §4.2** (addendum 20.11., PM `dec3a8bb`): the template now comes in two versions, with and without a link. The text below is the same as version L there.

**Template variables cannot be empty.** So rule 5 (drop a missing field) does not work here. Either every variable is a required field, or there is one template for each combination of fields. API decides which.

**ES**

> Hola, {{1}}. En {{2}} nos preguntaste por {{3}}. Acaba de entrar: {{4}} en {{5}}, {{6}}.
> {{7}}
> ¿Sigues buscando? Contesta a este mensaje y te propongo un día para verlo.
> {{8}} · {{9}}
>
> Mensaje preparado por el asistente de {{9}}. Si no quieres recibir más, responde BAJA.

**EN**

> Hi {{1}}. In {{2}} you asked us about {{3}}. This has just come in: {{4}} in {{5}}, {{6}}.
> {{7}}
> Still looking? Reply to this message and I'll suggest a day to see it.
> {{8}} · {{9}}
>
> Message prepared by {{9}}'s assistant. To stop receiving these, reply STOP.

**DE**

> Hallo {{1}}, im {{2}} haben Sie uns nach {{3}} gefragt. Gerade neu: {{4}} in {{5}}, {{6}}.
> {{7}}
> Suchen Sie noch? Antworten Sie auf diese Nachricht, und ich schlage Ihnen einen Besichtigungstermin vor.
> {{8}} · {{9}}
>
> Nachricht vorbereitet vom Assistenten von {{9}}. Wenn Sie keine Nachrichten mehr möchten, antworten Sie mit STOP.

**The variables:**

| Variable | Content |
|---|---|
| {{1}} | name |
| {{2}} | month |
| {{3}} | the search |
| {{4}} | type |
| {{5}} | area |
| {{6}} | price |
| {{7}} | link |
| {{8}} | agent |
| {{9}} | agency |

**For API:** BAJA and STOP must be processed as an opt-out before the first send. "Nach {{3}} gefragt" needs the search in the dative in DE ("nach einer Penthousewohnung in Benalmádena").

---

## 2. Topic 23: self-sign-up and trial (target texts; `trial` and `publicSignup` are "soon")

### 2.1 The sign-up page (replaces `es.ts:502–520` and its EN where the wording differs; error texts and `checkEmail` stay as built)

| Element | ES | EN | DE |
|---|---|---|---|
| eyebrow | Empieza gratis | Start free | Kostenlos starten |
| h1 | Crea la cuenta de tu agencia | Create your agency's account | Konto für Ihre Agentur anlegen |
| lead | 14 días gratis, sin tarjeta. Con tu opinión al final, 7 días más. | 14 days free, no card. With your feedback at the end, 7 more days. | 14 Tage kostenlos, ohne Karte. Mit Ihrer Rückmeldung am Ende 7 Tage mehr. |
| scope line (new) | La prueba incluye lo mismo que {plan}. | The trial includes the same as {plan}. | Der Test umfasst dasselbe wie {plan}. |
| field: name | Tu nombre | Your name | Ihr Name |
| field: agency | Nombre de la agencia | Agency name | Name der Agentur |
| field: email | Email de trabajo | Work email | Geschäftliche E-Mail |
| field: password | Contraseña | Password | Passwort |
| password help | Al menos 10 caracteres. | At least 10 characters. | Mindestens 10 Zeichen. |
| field: language | Idioma de tu cuenta | Your account language | Sprache Ihres Kontos |
| submit | Crear cuenta | Create account | Konto anlegen |
| submitting | Creando tu cuenta | Creating your account | Konto wird angelegt |
| privacy | Tus datos se usan para crear la cuenta de tu agencia. Lee el aviso de privacidad. | Your details are used to create your agency's account. Read the privacy notice. | Ihre Angaben werden verwendet, um das Konto Ihrer Agentur anzulegen. Lesen Sie die Datenschutzhinweise. |
| have account | ¿Ya tienes cuenta? · Iniciar sesión | Already have an account? · Sign in | Sie haben schon ein Konto? · Anmelden |

**Changes and conditions:**
- **Lead:**
  - **"Sin pago" becomes "sin tarjeta".** That is the word of the site's pilot line ("14 días gratis, sin tarjeta").
  - **The +7 is in production on staging** (`PLUS_7_EXTENSION_OPERATIONAL = PASS`).
  - **Per the HONEST_FEEDBACK_RULE,** the extension never depends on a positive opinion.
  - **Shown in production only** once the trial is.
- **The scope line:** `{plan}` comes from F-2.
- **The language field** offers ES and EN only. DE is not offered until a DE locale exists (§0.2).
- **The removed line `success`** ("Cuenta creada. Vamos a configurar tu agencia."): the route always answers "confirm your e-mail" first (`next: "confirm"`). So the page never shows "account created" before the confirmation. If Redesign still renders it, it is replaced by `checkEmail.h`.
- **Terms:** a line "Al crear la cuenta aceptas las condiciones de la prueba." comes only once a terms page exists (counsel). Until then, no such line.

### 2.2 Confirmation

**(a) On the page after sending:** `checkEmail` stays as built (`es.ts:532–538`).

DE for it:
- "Bestätigen Sie Ihre E-Mail-Adresse"
- "Wir haben einen Link an {email} geschickt. Öffnen Sie ihn, um fortzufahren. Der Link ist eine Stunde gültig."
- "Wenn Sie den Link auf einem anderen Gerät öffnen, melden Sie sich danach hier mit Ihrer E-Mail-Adresse und Ihrem Passwort an."
- "Falsche Adresse? Beginnen Sie mit der richtigen neu."
- "Keine E-Mail nach ein paar Minuten? Sehen Sie im Spam-Ordner nach, und sonst schreiben Sie uns."

**(b) The confirmation e-mail.** It is the identity server's template, so API sets it. It says "one hour" because the page says so; API confirms that value.

| | ES | EN | DE |
|---|---|---|---|
| Subject | Confirma tu email para empezar | Confirm your email to get started | Bestätigen Sie Ihre E-Mail-Adresse |
| Body | Hola, {nombre}: para crear la cuenta de {agencia}, confirma tu email con este enlace. Vale durante una hora. {enlace} Si no has sido tú, ignora este email: sin confirmación, la cuenta no se activa. | Hi {name}, to create the account for {agency}, confirm your email with this link. It is valid for one hour. {link} If this wasn't you, ignore this email: without confirmation, the account is not activated. | Hallo {Vorname}, um das Konto für {Agentur} anzulegen, bestätigen Sie bitte Ihre E-Mail-Adresse über diesen Link. Er ist eine Stunde gültig. {Link} Wenn Sie das nicht waren, ignorieren Sie diese E-Mail: Ohne Bestätigung wird das Konto nicht aktiviert. |

**(c) The trial has started** (e-mail after the agency is registered):

| | ES | EN | DE |
|---|---|---|---|
| Subject | Tu prueba ha empezado | Your trial has started | Ihr Test hat begonnen |
| Body | Hola, {nombre}: la prueba de {agencia} empieza hoy y termina el {fecha_fin}. El primer paso es conectar el buzón de tu agencia: hasta entonces no llega ninguna consulta. Lo haces en la configuración: {enlace}. | Hi {name}, {agency}'s trial starts today and ends on {end_date}. The first step is to connect your agency's mailbox: until then no enquiries come in. You do it in the setup: {link}. | Hallo {Vorname}, der Test für {Agentur} beginnt heute und endet am {Enddatum}. Der erste Schritt ist, das Postfach Ihrer Agentur zu verbinden: Bis dahin kommen keine Anfragen an. Das machen Sie in der Einrichtung: {Link}. |

"Hasta entonces no llega ninguna consulta" is the production truth: without a connected mailbox, no enquiry of the agency arrives (API `cee6992`). The sentence sends the agency to the one step that matters.

### 2.3 The trial ends

**Sent 3 days before** (the scheduler is an activation step, per the n8n evidence). The day count comes from the server, never from a countdown in the browser (`es.ts:464`).

| | ES | EN | DE |
|---|---|---|---|
| Subject | Tu prueba termina el {fecha_fin} | Your trial ends on {end_date} | Ihr Test endet am {Enddatum} |
| Body | Hola, {nombre}: a la prueba de {agencia} le quedan {dias} días; termina el {fecha_fin}. Hasta entonces todo sigue igual. Para seguir después, contesta a este email y te enviamos las condiciones por escrito. | Hi {name}, {agency}'s trial has {days} days left; it ends on {end_date}. Until then everything carries on as it is. To continue afterwards, reply to this email and we'll send you the terms in writing. | Hallo {Vorname}, der Test für {Agentur} läuft noch {Tage} Tage, bis zum {Enddatum}. Bis dahin bleibt alles, wie es ist. Wenn Sie danach weitermachen möchten, antworten Sie auf diese E-Mail, und wir schicken Ihnen die Bedingungen schriftlich. |
| +7 line (only while eligible: no feedback submitted yet, no extension granted) | ¿Quieres 7 días más? Cuéntanos qué te ha parecido, lo bueno y lo malo: {enlace_opinion}. Lo que digas no cambia nada: los 7 días son tuyos igual. | Want 7 more days? Tell us what you thought, the good and the bad: {feedback_link}. What you say changes nothing: the 7 days are yours either way. | Möchten Sie 7 Tage mehr? Sagen Sie uns, wie Sie den Test fanden, das Gute und das Schlechte: {Feedback-Link}. Was Sie schreiben, ändert nichts: Die 7 Tage bekommen Sie so oder so. |

**Sent on the day it ends:**

| | ES | EN | DE |
|---|---|---|---|
| Subject | Tu prueba ha terminado | Your trial has ended | Ihr Test ist beendet |
| Body | Hola, {nombre}: la prueba de {agencia} terminó el {fecha_fin}. {tras_fin} Si quieres seguir, contesta a este email y te enviamos las condiciones por escrito. | Hi {name}, {agency}'s trial ended on {end_date}. {after_end} If you'd like to continue, reply to this email and we'll send you the terms in writing. | Hallo {Vorname}, der Test für {Agentur} ist am {Enddatum} zu Ende gegangen. {nach_Ende} Wenn Sie weitermachen möchten, antworten Sie auf diese E-Mail, und wir schicken Ihnen die Bedingungen schriftlich. |

**`{tras_fin}` can only be written after API's answer, and the e-mail is not sent without it.** The agency must know two things.

**1. What stops?** For example: do its clients still get a reply? Copy's wording if the replies stop:

| ES | EN | DE |
|---|---|---|
| Desde ese día, NuovaSolution ya no responde a las consultas de tu agencia. | From that day, NuovaSolution no longer replies to your agency's enquiries. | Ab diesem Tag beantwortet NuovaSolution die Anfragen Ihrer Agentur nicht mehr. |

**2. How long is its data kept, and how does it get a copy?** Retention values are pending counsel. Copy's wording once a date exists:

| ES | EN | DE |
|---|---|---|
| Tus datos se guardan hasta el {fecha_borrado}; después se borran. Si quieres una copia antes, escríbenos. | Your data is kept until {deletion_date}; after that it is deleted. If you'd like a copy first, write to us. | Ihre Daten werden bis zum {Löschdatum} aufbewahrt und danach gelöscht. Wenn Sie vorher eine Kopie möchten, schreiben Sie uns. |

**No checkout link:** there is no online checkout (Billing Model A, `plans.ts`). So "contesta a este email" is the way to continue.

### 2.4 A limit is reached

**The limits are data** in the `trial` plan row. They change without code (`ENTITLEMENT_MATRIX_CONFIGURABLE = PASS`). So the number always comes in brackets from the data, and the text is the same for any value.

| Limit | ES | EN | DE |
|---|---|---|---|
| enquiries a month (`leads_month`) | Tu agencia ha llegado a {n} consultas este mes, el máximo de tu prueba. {al_limite} Escríbenos y vemos juntos qué plan encaja. | Your agency has reached {n} enquiries this month, the most your trial includes. {at_limit} Write to us and we'll look together at which plan fits. | Ihre Agentur hat diesen Monat {n} Anfragen erreicht, das Maximum Ihres Tests. {am_Limit} Schreiben Sie uns, dann schauen wir gemeinsam, welcher Plan passt. |
| offices (`offices`) | Has llegado al máximo de oficinas de tu prueba ({n}). Si necesitas más, escríbenos. | You've reached the most offices your trial includes ({n}). If you need more, write to us. | Sie haben die maximale Zahl an Büros für Ihren Test erreicht ({n}). Wenn Sie mehr brauchen, schreiben Sie uns. |
| people (`seats`), only once `teamRoles` is "included" | Has llegado al máximo de personas de tu prueba ({n}). Para añadir a alguien, quita antes a otra persona o escríbenos. | You've reached the most people your trial includes ({n}). To add someone, remove another person first or write to us. | Sie haben die maximale Zahl an Personen für Ihren Test erreicht ({n}). Um jemanden hinzuzufügen, entfernen Sie zuerst eine andere Person oder schreiben Sie uns. |

**`{al_limite}` comes from API's answer, and the line is not shown without it.** What happens to enquiry number {n}+1?

**Variant V-1:** the replies pause.

| ES | EN | DE |
|---|---|---|
| Las consultas nuevas siguen llegando a tu buzón como siempre, pero NuovaSolution no las responde ni las registra hasta el {fecha_reinicio}. | New enquiries still arrive in your mailbox as usual, but NuovaSolution does not reply to them or record them until {reset_date}. | Neue Anfragen kommen weiter wie gewohnt in Ihrem Postfach an, aber NuovaSolution beantwortet und erfasst sie bis zum {Neustartdatum} nicht. |

**Variant V-2:** everything carries on.

| ES | EN | DE |
|---|---|---|
| NuovaSolution sigue respondiendo y registrando todas las consultas. | NuovaSolution keeps replying to and recording every enquiry. | NuovaSolution beantwortet und erfasst weiterhin alle Anfragen. |

API's answer picks the variant. Copy writes no third one.

**Not written on purpose:**
- **CRM connections:** connecting another CRM is `integrations`, which is "soon".
- **Voice minutes:** `phoneAssistant` is "soon".

---

## 3. Open

| # | Who | Question |
|---|---|---|
| O-1 | Counsel (via the owner) | the legal basis for writing to former enquirers again, and the footer sentence that goes with it (§1.1) |
| O-2 | API | opt-out by link and by keyword BAJA/STOP, working before the first send (§1.3, §1.4) |
| O-3 | API | WhatsApp template: required fields or one template per combination (§1.4) |
| O-4 | PM / owner | the trial's scope `{plan}`: Essential (`plans.ts` R26) or Growth (owner's pilot) (F-2) |
| O-5 | PM / API | trial matrix: `followup.basic` and `property.matching` against the register (F-1) |
| O-6 | API | what stops when the trial ends, and how long data is kept (§2.3 `{tras_fin}`) |
| O-7 | API | what happens to the enquiry after the monthly limit: V-1 or V-2 (§2.4) |
| O-8 | API | the confirmation link's validity, "one hour" (§2.2 b) |

---

## 4. Addendum 20.11.: topic 28 after PM's adoption (`PM_THEMA_28_REAKTIVIERUNG_1120_v1.md`, `dec3a8bb`, relayed by the owner)

### 4.1 PM's three points, and what they change here

| # | PM | Change in this file |
|---|---|---|
| 1 | "Acaba de entrar" stays. PM makes sure it comes only with listings that are really new | none in the wording. The sentence is true only under PM's condition, so it is a send rule: not for an older listing that was re-published or changed |
| 2 | A link only where the source rights allow it | the WhatsApp template in two versions, L (with a link) and S (without), ES/EN/DE (§4.2). API decides which one goes to Meta |
| 3 | No availability sentence in the first message (confirmed) | none. The texts have none: "¿Sigues buscando?" asks about the client's search, not about the listing. Nothing like "todavía disponible" / "still available" / "noch verfügbar" is to be added |

**The e-mail (§1.3) needs no second version.** The link is a field under rule 5: without source rights, the line `{enlace}` is dropped and the rest stays as it is.

### 4.2 The WhatsApp template in two versions

**Both versions:**
- The variables are required fields (§1.4).
- The footer is the same in both.
- BAJA / STOP must work before the first send (O-2).

#### Version L, with a link (unchanged from §1.4)

| Variable | {{1}} | {{2}} | {{3}} | {{4}} | {{5}} | {{6}} | {{7}} | {{8}} | {{9}} |
|---|---|---|---|---|---|---|---|---|---|
| Content | name | month | search | type | area | price | link | agent | agency |

**ES**

> Hola, {{1}}. En {{2}} nos preguntaste por {{3}}. Acaba de entrar: {{4}} en {{5}}, {{6}}.
> {{7}}
> ¿Sigues buscando? Contesta a este mensaje y te propongo un día para verlo.
> {{8}} · {{9}}
>
> Mensaje preparado por el asistente de {{9}}. Si no quieres recibir más, responde BAJA.

**EN**

> Hi {{1}}. In {{2}} you asked us about {{3}}. This has just come in: {{4}} in {{5}}, {{6}}.
> {{7}}
> Still looking? Reply to this message and I'll suggest a day to see it.
> {{8}} · {{9}}
>
> Message prepared by {{9}}'s assistant. To stop receiving these, reply STOP.

**DE**

> Hallo {{1}}, im {{2}} haben Sie uns nach {{3}} gefragt. Gerade neu: {{4}} in {{5}}, {{6}}.
> {{7}}
> Suchen Sie noch? Antworten Sie auf diese Nachricht, und ich schlage Ihnen einen Besichtigungstermin vor.
> {{8}} · {{9}}
>
> Nachricht vorbereitet vom Assistenten von {{9}}. Wenn Sie keine Nachrichten mehr möchten, antworten Sie mit STOP.

#### Version S, without a link

| Variable | {{1}} | {{2}} | {{3}} | {{4}} | {{5}} | {{6}} | {{7}} | {{8}} |
|---|---|---|---|---|---|---|---|---|
| Content | name | month | search | type | area | price | agent | agency |

Without a link the client cannot look anything up. So the invitation offers the details in the conversation; it does not add any fact.

**ES**

> Hola, {{1}}. En {{2}} nos preguntaste por {{3}}. Acaba de entrar: {{4}} en {{5}}, {{6}}.
> ¿Sigues buscando? Contesta a este mensaje y te cuento los detalles o te propongo un día para verlo.
> {{7}} · {{8}}
>
> Mensaje preparado por el asistente de {{8}}. Si no quieres recibir más, responde BAJA.

**EN**

> Hi {{1}}. In {{2}} you asked us about {{3}}. This has just come in: {{4}} in {{5}}, {{6}}.
> Still looking? Reply to this message and I'll tell you more or suggest a day to see it.
> {{7}} · {{8}}
>
> Message prepared by {{8}}'s assistant. To stop receiving these, reply STOP.

**DE**

> Hallo {{1}}, im {{2}} haben Sie uns nach {{3}} gefragt. Gerade neu: {{4}} in {{5}}, {{6}}.
> Suchen Sie noch? Antworten Sie auf diese Nachricht, dann erzähle ich Ihnen mehr dazu oder schlage Ihnen einen Besichtigungstermin vor.
> {{7}} · {{8}}
>
> Nachricht vorbereitet vom Assistenten von {{8}}. Wenn Sie keine Nachrichten mehr möchten, antworten Sie mit STOP.

**Notes:**
- **"te cuento los detalles" / "I'll tell you more" / "erzähle ich Ihnen mehr"** is the agent's offer, not a statement about the listing. What the agent tells then is the agency's matter.
- **The variables are numbered differently in the two versions** (agent and agency are {{8}}/{{9}} in L and {{7}}/{{8}} in S). API must map them separately for each template.

### 4.3 Open after this addendum

The O-list of §3 stays. New:

| # | Who | Question |
|---|---|---|
| O-9 | API | which version, L or S, goes to Meta (or both as two templates) |
| O-10 | PM | the rule "only really new listings" (point 1), in writing, so the sentence "Acaba de entrar" is backed |
