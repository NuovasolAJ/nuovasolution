# COPY → API · Footer of the customer mails, per agency · ES + EN · Fri 13.11.2026

**Written for:** API, who puts the footer into the mails that go to the person who wrote to an agency (replies, and later follow-ups).
Copy wrote the texts; API fills the fields per agency and says which variants apply. Owner order of 13.11.: "mit API die
Fußzeilen-Texte der Kundenmails je Agentur (Datenschutz, Impressum, Abmeldung) vorbereiten".

**Status:** WORKING. This is an editorial and technical draft. It is not a legal approval and not a Meta approval. Counsel checks
it before the first mail goes out with it (§6).

**Basis in the repo:**
- The agency is the controller for the people who write to it, and NuovaSolution is its processor
  (`LEGAL_PAGES_FINAL_v1.md` §8, `backend_handoff/handoff_in_2026-10-03/META_LEGAL_SECTIONS_v1.md`).
- The reply itself already says it comes from an assistant (`COPY_TO_REDESIGN_1108_NEW_TEXTS_v1.md` V-2).
- The mail shells (`MAIL_SHELL_v3.html`) are the agency team's mails. This footer is for the **customer** mails, which is a
  different reader.

---

## 1. Fields per agency (API fills them, Copy invents none)

| Field | Content | Required |
|---|---|---|
| `{{agency_name}}` | commercial name, as the agency signs | yes |
| `{{agency_legal_name}}` | legal name (company or self-employed person) | yes |
| `{{agency_tax_id}}` | NIF / CIF | yes |
| `{{agency_address}}` | registered address, one line | yes |
| `{{agency_privacy_email}}` | the address where people exercise their rights | yes |
| `{{agency_privacy_url}}` | the agency's privacy policy | if the agency has one |
| `{{agency_legal_url}}` | the agency's aviso legal / legal notice | if the agency has one |
| `{{unsubscribe_url}}` | a one-click opt-out link for this person and this agency | only for P-3 (§4) |

**Rule:** if a required field is empty, the mail goes out with no empty placeholder and no invented value. API holds the
agency's mails until the field is filled, or sends without the footer only if counsel says so (§6, Q-4). The data come from the
agency itself, never from the website or from Copy.

---

## 2. Who sends (one line above the footer, API picks the variant)

| # | When | ES | EN |
|---|---|---|---|
| S-1 | the mail goes out from the agency's own mailbox (`mailboxConnection`, soon) | *(no line; the sender is the agency)* | *(no line)* |
| S-2 | the mail goes out from a NuovaSolution address on the agency's behalf (today) | Este correo lo envía NuovaSolution en nombre de {{agency_name}}. | This email is sent by NuovaSolution on behalf of {{agency_name}}. |

---

## 3. The footer

Small type, under a thin rule, after the signature. Plain text works the same as HTML; the links are written out in plain text.

### P-1 Legal notice (Impressum)

| | ES | EN |
|---|---|---|
| with `agency_legal_url` | {{agency_legal_name}} · NIF {{agency_tax_id}} · {{agency_address}} · Aviso legal: {{agency_legal_url}} | {{agency_legal_name}} · Tax ID {{agency_tax_id}} · {{agency_address}} · Legal notice: {{agency_legal_url}} |
| without | {{agency_legal_name}} · NIF {{agency_tax_id}} · {{agency_address}} | {{agency_legal_name}} · Tax ID {{agency_tax_id}} · {{agency_address}} |

### P-2 Privacy (the short first layer)

| | ES | EN |
|---|---|---|
| main | Protección de datos: {{agency_legal_name}} es responsable de tus datos y los usa para atender tu consulta, que es la base de este tratamiento. Puedes pedir acceso, corrección o eliminación de tus datos, o la limitación del tratamiento, u oponerte, escribiendo a {{agency_privacy_email}}. También puedes reclamar ante la AEPD. | Data protection: {{agency_legal_name}} is responsible for your data and uses them to answer your enquiry, which is the basis for this processing. You can ask for access, correction or deletion of your data, or restriction of the processing, or object, by writing to {{agency_privacy_email}}. You can also complain to the Spanish data protection authority (AEPD). |
| with `agency_privacy_url` | + Más información: {{agency_privacy_url}} | + More information: {{agency_privacy_url}} |

"Para atender tu consulta" is the purpose for a reply. If the agency later uses the data for anything else (other properties,
newsletters), that needs its own basis. P-2 does not cover it (§6, Q-2).

### P-3 Opt-out: only in follow-ups and property suggestions

| # | ES | EN | When |
|---|---|---|---|
| P-3a | ¿No quieres recibir más correos de {{agency_name}}? Date de baja aquí: {{unsubscribe_url}} | Don't want more emails from {{agency_name}}? Unsubscribe here: {{unsubscribe_url}} | link variant |
| P-3b | ¿No quieres recibir más correos de {{agency_name}}? Responde a este correo con la palabra BAJA. | Don't want more emails from {{agency_name}}? Reply to this email with the word STOP. | reply variant |

---

## 4. Which mail gets which parts

| Mail | S | P-1 | P-2 | P-3 |
|---|---|---|---|---|
| First reply to an enquiry the person sent | S-2 while it applies | yes | yes | no: the person asked, so the reply is not advertising. Counsel confirms (Q-1) |
| Further replies in the same conversation | S-2 while it applies | yes | yes | no |
| Follow-up the person did not ask for (`followup`, soon) | S-2 while it applies | yes | yes | **yes**, P-3a or P-3b |
| Property suggestions (`matching`, soon) | S-2 while it applies | yes | yes | **yes** |

**P-3 only once it works.** The opt-out line appears only when API confirms that the link (P-3a) or the word BAJA/STOP (P-3b)
really stops the next mail of that agency to that person, tested on one run. Until then, no follow-up or suggestion goes out at
all. A follow-up without a working opt-out is not an option.

---

## 5. Language

The footer is in the language of the mail. Copy delivers ES and EN here. The reply notes other languages (`languageNoted`), and
replies in other languages are **soon** (`otherLanguages`). If mails already go out in another language, API names the languages
and Copy writes the footer for each. The footer is never in a different language from the mail above it.

---

## 6. Open, who answers

| # | Question | Who |
|---|---|---|
| Q-1 | Is the first reply to an enquiry outside the rules for commercial communications (LSSI-CE art. 21), so that it needs no opt-out? | counsel (owner routes it) |
| Q-2 | Legal basis in P-2: is "atender tu consulta" (steps at the person's request) right, and does a follow-up need consent or a legitimate interest? | counsel |
| Q-3 | AI disclosure: the reply says it is an assistant (V-2). Is that enough for the transparency duty for AI systems that talk to people (AI Act art. 50), or does the footer need a line as well? | counsel |
| Q-4 | If a required field is missing: hold the mail, or send it without the footer? | counsel + owner |
| Q-5 | Is S-2 (NuovaSolution address on the agency's behalf) the case in production today, for which agencies, and from when S-1? | API |
| Q-6 | Opt-out: link or reply word, and where the stop is stored so that no channel writes to the person again | API |
| Q-7 | In which languages do customer mails go out in production today? | API / Lead |

**Not in the footer, on purpose:** NuovaSolution's own company data (S-2 names NuovaSolution, and its own legal notice lives on
the website), internal ids, n8n or infrastructure words, any figure.
