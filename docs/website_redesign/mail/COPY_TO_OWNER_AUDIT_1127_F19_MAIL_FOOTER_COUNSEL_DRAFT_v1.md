# Copy → Owner, Audit, MM (for counsel): F19, the footer of the mails to clients · ES + EN · draft for counsel · 27.11.2026, due 19:00

**Order:** the owner, 27.11.: "eine Fußzeile für Kundenmails (Platz für das Logo, Datenschutz, Impressum, Abmeldelink), ES und EN, als Entwurf für den Anwalt."

**Status:** a draft for counsel. It is an editorial and technical draft, not a legal approval. Nothing is built from this file.

**Where it comes from:**
- `COPY_TO_API_1113_CUSTOMER_MAIL_FOOTER_v1.md` v2 (16.11.), which the owner accepted.
- API built v2 on staging (sink mail 350114, logo and footer in text and HTML; opt-out run 9/9; API `cf3490a3`).
- **What has changed since v2:**
  - the opt-out page (F58);
  - API's answer that replies still go out after an opt-out (Q-6, staging proof V6);
  - the opt-out scope fix (F59).
- This draft adds the layout with the logo, and one correction to the opt-out line (§3, P-3). The DE version stays in v2 and is not part of this draft.

**Who is responsible for the data (as in v2):**
- The agency is the controller for the people who write to it.
- NuovaSolution is its processor (`LEGAL_PAGES_FINAL_v1.md` §8).
- The footer therefore carries the **agency's** data, never NuovaSolution's.

---

## 1. How the footer looks (top to bottom)

```
──────────────────────────────────────────  (thin rule, after the signature)
[ LOGO of {{agency_name}} ]                   fixed width, alt text = {{agency_name}}; if none: no logo, no empty box
S-2  Who sends                                 only while the mail leaves from a NuovaSolution address
P-0  AI line                                   in every mail to a client
P-1  Legal notice (Aviso legal)                in every mail to a client
P-2  Data protection                           in every mail to a client
P-3  Unsubscribe                               only in follow-ups and property suggestions
```

**Layout:**
- Small type, each part its own short paragraph.
- The plain-text part of the mail says the same, with the links written out.
- In HTML the link text is the label ("Aviso legal", "Política de privacidad", "Date de baja"), and the address sits behind it.
- **The footer is in the language of the mail above it,** never mixed. Spanish uses **tú** (owner, 16.11., Q-7).

## 2. The fields (from the agency's signed form, never typed by Copy)

| Field | Content | Required |
|---|---|---|
| `{{agency_name}}` | commercial name, as the agency signs | yes |
| `{{agency_legal_name}}` | legal name (company or self-employed person) | yes |
| `{{agency_tax_id}}` | NIF / CIF, exactly as the agency gives it | yes |
| `{{agency_address}}` | registered address, one line | yes |
| `{{agency_privacy_email}}` | the address for data protection requests | yes |
| `{{agency_privacy_url}}` | the agency's privacy policy | yes |
| `{{agency_legal_url}}` | the agency's aviso legal | yes |
| `{{unsubscribe_url}}` | a signed link per mail; it opens a page with one button (F58) | only in P-3 mails |
| logo | the agency's logo file | if the agency has one |

**If a required field is empty,** the mail never shows an empty placeholder or an invented value. Whether the mail is then held or sent without the footer is question C-4.

## 3. The texts

| # | Part | ES | EN |
|---|---|---|---|
| S-2 | Who sends (while the mail leaves from a NuovaSolution address) | Este correo lo envía NuovaSolution en nombre de {{agency_name}}. | This email is sent by NuovaSolution on behalf of {{agency_name}}. |
| P-0 | AI line | Respuesta preparada por el asistente de inteligencia artificial de {{agency_name}}. | Reply prepared by the artificial intelligence assistant of {{agency_name}}. |
| P-1 | Legal notice | {{agency_legal_name}} · NIF {{agency_tax_id}} · {{agency_address}} · Aviso legal: {{agency_legal_url}} | {{agency_legal_name}} · Tax ID (NIF) {{agency_tax_id}} · {{agency_address}} · Legal notice: {{agency_legal_url}} |
| P-2 | Data protection | Protección de datos: {{agency_legal_name}} es responsable de tus datos y los usa para atender tu consulta, que es la base de este tratamiento. Para pedir acceso, corrección o eliminación, limitar el tratamiento u oponerte, escribe a {{agency_privacy_email}}. También puedes reclamar ante la AEPD. Más información: {{agency_privacy_url}} | Data protection: {{agency_legal_name}} is responsible for your data and uses them to answer your enquiry, which is the basis for this processing. To ask for access, correction or deletion, to restrict the processing or to object, write to {{agency_privacy_email}}. You can also complain to the Spanish data protection authority (AEPD). More information: {{agency_privacy_url}} |
| P-3 | Unsubscribe (**new wording**) | ¿No quieres recibir más seguimientos ni propuestas de inmuebles de {{agency_name}}? Date de baja aquí: {{unsubscribe_url}} | Don't want any more follow-ups or property suggestions from {{agency_name}}? Unsubscribe here: {{unsubscribe_url}} |

**Why P-3 changes** (v2: "¿No quieres recibir más correos de {{agency_name}}?"). The old line says more than the link does in one respect, and less in another:
- **It says more:** after an opt-out, a new enquiry from the person still gets its reply (API Q-6, staging proof V6). "Más correos" promises that every mail stops.
- **It says less:** after the F59 fix (API `cad02a90`, staging), the link also stops follow-ups and suggestions **by WhatsApp**. "Correos" names only email.

The new line names what stops and no channel. **API confirms** that the scope in production will be the same as on staging (email and WhatsApp, follow-ups and suggestions only). If it is not, the line follows production.

**The same correction on the opt-out page** (v2 §4; Redesign builds it, API serves the states), for counsel to read together with P-3:

| # | ES | EN |
|---|---|---|
| U-1t | {{agency_name}} dejará de enviarte seguimientos y propuestas de inmuebles, por email y por WhatsApp. | {{agency_name}} will stop sending you follow-ups and property suggestions, by email and by WhatsApp. |
| U-2t | {{agency_name}} no te enviará más seguimientos ni propuestas de inmuebles, ni por email ni por WhatsApp. | {{agency_name}} will not send you any more follow-ups or property suggestions, by email or by WhatsApp. |
| U-2r | Si vuelves a escribir a {{agency_name}}, te contestará a esa consulta. (unchanged; API confirmed it) | If you write to {{agency_name}} again, they will answer that enquiry. (unchanged) |
| U-3 | Ya te habías dado de baja. No recibirás más seguimientos ni propuestas de {{agency_name}}, ni por email ni por WhatsApp. | You had already unsubscribed. You will not receive any more follow-ups or suggestions from {{agency_name}}, by email or by WhatsApp. |

The other page lines stay as in v2 §4.

## 4. Which mail carries which part

| Mail | S-2 | P-0 | P-1 | P-2 | P-3 |
|---|---|---|---|---|---|
| First reply to the person's own enquiry | while it applies | yes | yes | yes | no (see C-1) |
| Further replies in the same conversation | while it applies | yes | yes | yes | no |
| A follow-up the person did not ask for | while it applies | yes | yes | yes | **yes** |
| A property suggestion | while it applies | yes | yes | yes | **yes** |

**No follow-up or suggestion goes out without a working opt-out.** P-3 has to work first; only then do the mails that need it go out.

## 5. Questions for counsel

| # | Question |
|---|---|
| C-1 | Is the reply to an enquiry the person sent outside the rules for commercial communications (LSSI-CE art. 21), so that it needs no opt-out? |
| C-2 | P-2: is "para atender tu consulta" (steps at the person's request) the right legal basis? Does a follow-up or a property suggestion need consent, or is legitimate interest enough, and must P-2 then say so? |
| C-3 | Is P-2 enough as the first layer, with the full policy behind `{{agency_privacy_url}}`? Does the first layer need anything more? |
| C-4 | If a required field is missing: is the mail held, or sent without the footer? |
| C-5 | S-2: may the mail name NuovaSolution as the sender on the agency's behalf, and is this sentence right? Copy writes no line that hides the real sender. |
| C-6 | P-1: does a register entry (Registro Mercantil, or a register of estate agents) belong after the NIF where the agency has one? |
| C-7 | P-0: does the AI line in the footer, together with the full notice once per contact and channel (owner, 16.11.), meet the duty to say that a reply is prepared by AI? |
| C-8 | P-3 and the page: are the new lines in §3 right for what the opt-out stops and what it does not (a new enquiry still gets its reply)? |

**Not in the footer, on purpose:**
- NuovaSolution's own company data. S-2 names NuovaSolution, and its legal notice lives on its website.
- Internal IDs, system or infrastructure words, and any figure.

## 6. Status of F19 (Audit's error list, for the owner)

| Step | State |
|---|---|
| Texts v2, ES/EN/DE | delivered 16.11., accepted by the owner |
| Staging: logo + footer, text and HTML | proved (API `cf3490a3`, sink mail 350114) |
| F58, an opt-out only through the button | staging edge done (API, 24.11.). **The website page `/baja` still needs Redesign's build and API's full test run** |
| F59, the opt-out also stops WhatsApp | staging fixed (`cad02a90`); prod with API package `9ec1c853` |
| P-2 and this draft | **with counsel** (owner exception) |
| Prod | only after counsel, F58 and F59, with the owner's line |
