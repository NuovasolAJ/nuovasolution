# COPY → API, Lead · Footer of the customer mails, and the opt-out page · ES + EN + DE · F19 · v2, Mon 16.11.2026

**Written for:** two lanes.
- **API** stores the texts per agency and builds the opt-out page.
- **Lead** renders the footer in every customer mail.

The person who reads the result is the one who wrote to an agency.

**History:**
- **v1 (13.11., `c9b2d96`)**: ES and EN. The owner accepted it.
- **v2 (16.11.)**: adds German, the opt-out page and the mapping to API's fields from its plan of 13.11. (`f87014f9`, n8n repo
  `governance/API_SIGNALS_1030.md`). The opt-out is now the link only (§3, P-3).

**Error list row:** F19 (`governance/FEHLERLISTE_PROD_1113_v1.md`, `9f7f2b19`). Copy's part is due Tue 17.11.

**Status:** WORKING. This is an editorial and technical draft. It is not a legal approval and not a Meta approval. Counsel checks it before
the first mail goes out with it (§7).

**Basis:**
- **Who is responsible:** the agency is the controller for the people who write to it, and NuovaSolution is its processor
  (`LEGAL_PAGES_FINAL_v1.md` §8, `META_LEGAL_SECTIONS_v1.md`).
- **German:** German uses **Sie**, as the owner decided for WhatsApp and the phone (`WHATSAPP-DE-ANREDE = Sie`).
- **German mails held in production:** customer mails in German are held in production today, because there is no approved German AI
  notice (F07). The German footer is ready for when that changes, and changes nothing before then.

---

## 1. Fields per agency (API fills them, Copy invents none)

| Copy's field | API's field (plan 13.11.) | Content | Required |
|---|---|---|---|
| `{{agency_name}}` | `sender_display_name` | commercial name, as the agency signs; also the sender name of the mail | yes |
| `{{agency_legal_name}}` | `legal_name` (new) | legal name (company or self-employed person) | yes |
| `{{agency_tax_id}}` | inside `legal_footer_text` / `footer_by_locale`, or its own field | NIF / CIF | yes |
| `{{agency_address}}` | as above | registered address, one line | yes |
| `{{agency_privacy_email}}` | as above | the address where people exercise their rights | yes |
| `{{agency_privacy_url}}` | `privacy_url` | the agency's privacy policy | yes (API's plan makes it required) |
| `{{agency_legal_url}}` | `imprint_url` | the agency's aviso legal / Impressum | yes (API's plan makes it required) |
| `{{unsubscribe_url}}` | the signed token link per mail | opens the opt-out page (§4) | only for mails with P-3 |
| logo | `logo_url` (new) | alt text: `{{agency_name}}`. Fixed width, as Lead's render plan says | if the agency has one |
| S-2 | `powered_by_nuovasolution` | the sender line in §2 | while S-2 applies |

**Rules:**
- **No empty fields.** If a required field is empty, the mail shows no empty placeholder and no invented value. API's
  `branding.set` already refuses to activate without the required fields. What happens to a mail meanwhile is counsel's and the
  owner's call (Q-4).
- **Where the data come from.** Only the agency's own signed form, never the website or Copy.
- **Number formats.** NIF exactly as the agency gives it. Addresses in the agency's own spelling. Nothing is translated except the
  labels.

---

## 2. Who sends (one line above the footer)

| # | When | ES | EN | DE |
|---|---|---|---|---|
| S-1 | the mail goes out from the agency's own mailbox (`mailboxConnection`, soon) | *(no line)* | *(no line)* | *(no line)* |
| S-2 | the mail goes out from a NuovaSolution address on the agency's behalf | Este correo lo envía NuovaSolution en nombre de {{agency_name}}. | This email is sent by NuovaSolution on behalf of {{agency_name}}. | Diese E-Mail versendet NuovaSolution im Auftrag von {{agency_name}}. |

Whether NuovaSolution may appear at all ("powered by") is API's lawyer question (2). S-2 is the sentence if the answer is yes. If the
answer is no while the mail still leaves from a NuovaSolution address, the owner decides; Copy writes no line that hides the real sender.

---

## 3. The footer

Small type, under a thin rule, after the signature. Each of P-1, P-2 and P-3 is its own short paragraph. The plain-text part says the same,
with the links written out.

### P-1 Legal notice

| ES | EN | DE |
|---|---|---|
| {{agency_legal_name}} · NIF {{agency_tax_id}} · {{agency_address}} · Aviso legal: {{agency_legal_url}} | {{agency_legal_name}} · Tax ID (NIF) {{agency_tax_id}} · {{agency_address}} · Legal notice: {{agency_legal_url}} | {{agency_legal_name}} · NIF {{agency_tax_id}} · {{agency_address}} · Impressum: {{agency_legal_url}} |

A register entry (Registro Mercantil, or an agents' register) goes after the NIF **only if the agency has one** and counsel says it belongs
in the footer (API's lawyer question 2).

### P-2 Privacy (the short first layer)

| ES (tú) | EN | DE (Sie) |
|---|---|---|
| Protección de datos: {{agency_legal_name}} es responsable de tus datos y los usa para atender tu consulta, que es la base de este tratamiento. Para pedir acceso, corrección o eliminación, limitar el tratamiento u oponerte, escribe a {{agency_privacy_email}}. También puedes reclamar ante la AEPD. Más información: {{agency_privacy_url}} | Data protection: {{agency_legal_name}} is responsible for your data and uses them to answer your enquiry, which is the basis for this processing. To ask for access, correction or deletion, to restrict the processing or to object, write to {{agency_privacy_email}}. You can also complain to the Spanish data protection authority (AEPD). More information: {{agency_privacy_url}} | Datenschutz: Verantwortlich für Ihre Daten ist {{agency_legal_name}}. Wir verwenden sie, um Ihre Anfrage zu beantworten; das ist die Grundlage dieser Verarbeitung. Für Auskunft, Berichtigung, Löschung, Einschränkung oder Widerspruch schreiben Sie an {{agency_privacy_email}}. Sie können sich auch bei der spanischen Datenschutzbehörde (AEPD) beschweren. Mehr dazu: {{agency_privacy_url}} |

**ES, usted form.** Use it only if the mail above it uses usted. The pending agency AI notice `v1.1-es` does ("Le atiende…"), so a mail with
that notice needs this form:

> Protección de datos: {{agency_legal_name}} es responsable de sus datos y los usa para atender su consulta, que es la base de este
> tratamiento. Para pedir acceso, corrección o eliminación, limitar el tratamiento u oponerse, escriba a {{agency_privacy_email}}. También
> puede reclamar ante la AEPD. Más información: {{agency_privacy_url}}

**One form per mail.** The footer never mixes tú and usted with the mail above it. Lead says which form the Spanish replies use, and that
form is the one rendered.

"Para atender tu consulta" covers a reply. Using the data for other properties or newsletters needs its own basis, and P-2 does not cover it
(Q-2).

### P-3 Opt-out (link): only in follow-ups and property suggestions

| ES (tú) | ES (usted) | EN | DE (Sie) |
|---|---|---|---|
| ¿No quieres recibir más correos de {{agency_name}}? Date de baja aquí: {{unsubscribe_url}} | ¿No desea recibir más correos de {{agency_name}}? Puede darse de baja aquí: {{unsubscribe_url}} | Don't want more emails from {{agency_name}}? Unsubscribe here: {{unsubscribe_url}} | Sie möchten keine weiteren E-Mails von {{agency_name}} erhalten? Hier abmelden: {{unsubscribe_url}} |

The `List-Unsubscribe` and `List-Unsubscribe-Post` headers (one click in Gmail and Outlook) carry no text from Copy.
v1's reply-word variant (P-3b, "BAJA") is dropped, because API's plan uses the link.

---

## 4. The opt-out page (new in v2)

**What it is.** The page opens from `{{unsubscribe_url}}`. It carries the agency's name and logo, and is in the language of the mail
(`locale` in the token). A small switch offers ES · EN · DE. The page is plain: one heading, one or two lines, at most one button.

**A button, not an automatic opt-out on opening.** Security scanners in mail programs open links by themselves. If merely opening the page
opted the person out, some people would be unsubscribed without ever clicking. The header one-click (`List-Unsubscribe-Post`) stays
immediate, because only the mail program sends it.

| # | State | ES | EN | DE |
|---|---|---|---|---|
| U-t | browser tab | Darse de baja · {{agency_name}} | Unsubscribe · {{agency_name}} | Abmelden · {{agency_name}} |
| U-1h | asking, heading | ¿Dejar de recibir correos de {{agency_name}}? | Stop receiving emails from {{agency_name}}? | Keine E-Mails mehr von {{agency_name}}? |
| U-1t | asking, line | {{agency_name}} dejará de enviarte seguimientos y propuestas de inmuebles por email. | {{agency_name}} will stop sending you follow-ups and property suggestions by email. | {{agency_name}} sendet Ihnen dann keine Nachfragen und keine Immobilienvorschläge mehr per E-Mail. |
| U-1b | asking, button | Darme de baja | Unsubscribe | Abmelden |
| U-2h | done, heading | Listo. Te has dado de baja. | Done. You have unsubscribed. | Erledigt. Sie sind abgemeldet. |
| U-2t | done, line | {{agency_name}} no te enviará más seguimientos ni propuestas de inmuebles por email. | {{agency_name}} will not send you any more follow-ups or property suggestions by email. | {{agency_name}} sendet Ihnen keine Nachfragen und keine Immobilienvorschläge mehr per E-Mail. |
| U-2r | done, if you write again | Si vuelves a escribir a {{agency_name}}, te contestará a esa consulta. | If you write to {{agency_name}} again, they will answer that enquiry. | Wenn Sie {{agency_name}} wieder schreiben, wird Ihre Anfrage beantwortet. |
| U-2e | done, a mistake? | ¿Ha sido un error? Escribe a {{agency_privacy_email}}. | Was this a mistake? Write to {{agency_privacy_email}}. | War das ein Versehen? Schreiben Sie an {{agency_privacy_email}}. |
| U-3 | already opted out | Ya te habías dado de baja. No recibirás más seguimientos ni propuestas de {{agency_name}} por email. | You had already unsubscribed. You will not receive any more follow-ups or suggestions from {{agency_name}} by email. | Sie hatten sich bereits abgemeldet. Sie erhalten keine Nachfragen und Vorschläge von {{agency_name}} mehr per E-Mail. |
| U-4 | link invalid or expired (agency unknown) | Este enlace no es válido o ha caducado. Para darte de baja, responde al último correo que recibiste y pide la baja. | This link is not valid or has expired. To unsubscribe, reply to the last email you received and ask to be removed. | Dieser Link ist ungültig oder abgelaufen. Um sich abzumelden, antworten Sie auf die letzte E-Mail, die Sie erhalten haben, und bitten Sie um Abmeldung. |
| U-5 | could not save | No hemos podido completar la baja. Inténtalo de nuevo en unos minutos. Si sigue sin funcionar, responde al último correo que recibiste y pide la baja. | We could not complete your request. Please try again in a few minutes. If it still does not work, reply to the last email you received and ask to be removed. | Die Abmeldung hat gerade nicht geklappt. Bitte versuchen Sie es in ein paar Minuten noch einmal. Klappt es weiterhin nicht, antworten Sie auf die letzte E-Mail, die Sie erhalten haben, und bitten Sie um Abmeldung. |
| U-f | page footer | {{agency_legal_name}} · Protección de datos: {{agency_privacy_url}} · Página gestionada por NuovaSolution en nombre de {{agency_name}}. | {{agency_legal_name}} · Data protection: {{agency_privacy_url}} · Page run by NuovaSolution on behalf of {{agency_name}}. | {{agency_legal_name}} · Datenschutz: {{agency_privacy_url}} · Seite betrieben von NuovaSolution im Auftrag von {{agency_name}}. |

The page uses **tú** in Spanish. If the agency's mails use usted, API takes the usted form below. The rows not listed (U-t, U-1b, U-4,
U-5) need no change, and U-f is formal already.

| # | ES (usted) |
|---|---|
| U-1t | {{agency_name}} dejará de enviarle seguimientos y propuestas de inmuebles por email. |
| U-1b | Darme de baja |
| U-2h | Listo. Se ha dado de baja. |
| U-2t | {{agency_name}} no le enviará más seguimientos ni propuestas de inmuebles por email. |
| U-2r | Si vuelve a escribir a {{agency_name}}, le contestará a esa consulta. |
| U-2e | ¿Ha sido un error? Escriba a {{agency_privacy_email}}. |
| U-3 | Ya se había dado de baja. No recibirá más seguimientos ni propuestas de {{agency_name}} por email. |

**U-2r holds only if API confirms it** (Q-6): when the person writes again, the reply to that new enquiry still goes out, and only
follow-ups and suggestions stay off. If API's opt-out also stops replies, U-2r goes and U-2t says "no te enviará más correos".

**The page never shows:** the email address, the person's name, any ID or token, a "resubscribe" button (opting back in needs real
consent, and the page cannot collect it), or a reason survey.

---

## 5. Which mail gets which parts

| Mail | S | P-1 | P-2 | P-3 |
|---|---|---|---|---|
| First reply to an enquiry the person sent | S-2 while it applies | yes | yes | no: the person asked, so the reply is not advertising. Counsel confirms (Q-1) |
| Further replies in the same conversation | S-2 while it applies | yes | yes | no |
| Follow-up the person did not ask for (`followup`, soon) | S-2 while it applies | yes | yes | **yes** |
| Property suggestions (`matching`, soon) | S-2 while it applies | yes | yes | **yes** |

**P-3 appears only once it works.** API must show on one staging run that the link and the header one-click stop the next follow-up from
that agency to that person, and that a second agency is not affected. Until then no follow-up or suggestion goes out at all. A follow-up
without a working opt-out is not an option.

---

## 6. Language

The footer and the page are in the language of the mail. This file covers ES, EN and DE, as the owner ordered for F19. Replies in other
languages are **soon** (`otherLanguages`). If mails go out in another language, API names it and Copy writes the footer for it. The footer is
never in a different language from the mail above it.

---

## 7. Open, who answers

| # | Question | Who |
|---|---|---|
| Q-1 | Is the first reply to an enquiry outside the rules for commercial communications (LSSI-CE art. 21), so that it needs no opt-out? | counsel. API puts Q-1–Q-4 on one sheet (owner, 16.11.) |
| Q-2 | Legal basis in P-2: is "atender tu consulta" (steps at the person's request) right, and does a follow-up need consent or a legitimate interest? | counsel |
| Q-3 | AI disclosure: is one notice per conversation enough (F12), or must every mail carry a line? Copy's proposal is in `COPY_PROD_TEXTS_1116_F12_F16_F18_v1.md` §1 | counsel |
| Q-4 | If a required field is missing: hold the mail, or send it without the footer? | counsel + owner |
| Q-5 | Is S-2 (a NuovaSolution address on the agency's behalf) the case in production today, for which agencies, and from when S-1? | API |
| Q-6 | Does the opt-out stop only follow-ups and suggestions, or every mail? (U-2r depends on it) | API |
| Q-7 | Spanish replies: tú or usted? One form per mail (P-2, P-3, the page) | Lead |

**Not in the footer, on purpose:** NuovaSolution's own company data (S-2 names NuovaSolution, and its legal notice lives on the website),
internal IDs, n8n or infrastructure words, and any figure.
