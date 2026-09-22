# SIGNATURE COPY READY v1 — multilingual sign-off, role label and AI disclosure drafts

> **Superseded on 2026-09-22.** Part A → `SIGNATURE_COPY_READY_v2.md` (final mapping for Hosting).
> Part B → `COUNSEL_PACKAGE_v1.md` §E (all channels, both versions, approval status per text).
> **Withdrawn:** the owner decision on WhatsApp register (*usted* instead of *tú*) and the usted
> rewrite of the WhatsApp drafts below. The approved form of address of each channel stays as
> approved; translations follow it.

**State:** `2026-09-21_SYNC_1215Z` · **Written:** 2026-09-21
**Lane:** Website Copy / Product Truth / Director, for **Lead** (L3) and **Hosting** (H2), with
**API** (A9) for the data fields
**Status:** Part A (sign-off and role labels) is **localisation, ready to use**, not a legal text.
Part B (AI disclosure) is **DRAFT for counsel, not legally reviewed**, and must not be written into
`ai_disclosure_notices` with an approved marker. Not independently reviewed.

> Fixes finding F4 of the Gmail regression of 2026-09-20: a Spanish reply signed in English as
> "Antonio's AI Assistant". The replacement follows the reply language, keeps each agency's real
> brand and proper names untouched, never signs as NuovaSolution's owner for another agency, and
> never removes the required AI disclosure.

---

## 0. Facts this rests on

Sources in the system repo unless marked.

1. **Two sources produce the wrong signature today, and both must change together.**
   (a) The Message Agent prompt, PART 3, makes the closing "MANDATORY AND UNCONDITIONAL" and ends
   every language with "/ Antonio's AI Assistant"; the persona line reads "You are Antonio's AI
   assistant for NuovaSolution". (b) A code fallback in `build/main/customer_message_html.js`
   (node `Prepare Outbound Customer Message`) **adds the same English signature back** whenever it
   does not detect a closing. Removing (a) alone does not fix F4. (`GMAIL_REPLY_NAME_AND_SIGNATURE_v1.md`
   §B; the prod Main export in the repo is from July, so the exact prod text needs Hosting's live read.)
2. The fallback's detector treats words such as *asistente* or *saludos* as "signature present",
   so a body using them suppresses any signature logic built on top of it.
3. **WhatsApp carries no signature** by design ("2 or 3 short lines, no formal closing"). This file
   changes nothing on WhatsApp except the disclosure (Part B).
4. Branding data already designed (`build/branding/BRANDING_PROMOTION_v1.sql`,
   `build/onboarding/ONB_AGENCY_BRANDING_EMAIL_v1.sql`): `agency_branding.brand_display_name`,
   `legal_name`, `website`, `public_email`, `public_phone`; `agency_email_branding.sender_display_name`,
   `agency_signature_text/html`, `footer_by_locale`, `locale`; employee public name and contact
   through `email_branding_resolved`. Staging precedence already written: locale `p_locale →
   eb.locale → default_language → es`; signature `agency_signature_* override → built from
   employee name, agency name, contact, website`. **The prod renderer ignores all of these.**
5. **No per tenant assistant name field exists.** No `reply_language` field is written anywhere;
   the detected `Final Data.Language` is a full language name and can differ from the language the
   model actually writes in.
6. **Disclosure wording rule:** "Nobody on the engineering side may author, adapt, translate or
   approve disclosure wording" (`VOICE_DISCLOSURE_REQUIREMENTS_v1.md` §7, with requirements R1 to
   R9: discloses the machine, no vendor name, register correct, equivalent across languages, ES
   master). Only a Spanish notice exists as a real row; EN and DE are test fixtures; IT has none.

---

## Part A — sign-off and role label (localisation, ready)

### A.1 Rules

1. **The language of the sign-off equals the language of the reply body.** The renderer takes the
   language of the text it is about to send, not the detected inbound language, when they differ
   (fact 5). If neither is known: the tenant default, else `es`.
2. **Proper names are never translated or altered**: the agency brand, the agency legal name,
   people's names, street names, the website address. `NuovaSolution` never appears in a sign-off
   sent for another agency.
3. **No personal name of NuovaSolution's owner** in any sign-off for any agency. For NuovaSolution's
   own tenant the owner's name may appear only as a human employee line, when a human actually
   takes over (rule 5).
4. **The assistant is named by its role and its agency, never by a person's name.** "Asistente de IA
   de {brand}", not "Antonio's AI Assistant". This keeps the sign-off consistent with the
   disclosure instead of contradicting it.
5. **A human employee line appears only when a human wrote or approved the message**, using that
   employee's public name. An assistant generated reply never carries a human's name as its author.
6. **Deterministic, not generated.** The sign-off is built by the renderer from tenant data. The
   Message Agent must not write any closing, and the code fallback must stop injecting one.
7. **Order in an email**, bottom of the body: closing greeting, role line, brand line, optional
   contact line, then the legal footer. The AI disclosure is placed per Part B §B.3, not merged into
   the sign-off.

### A.2 Strings

Placeholders: `{brand}` = `brand_display_name`, fallback `legal_name`, fallback `clients.name`.
`{employee}` = the employee's public name. `{website}`, `{phone}`, `{email}` = public contact fields,
each line omitted when empty.

**Alignment with Lead's `REPLY_CONTRACT_V2` (`governance/LEAD_SYNC_0921_RETURN_v1.md` §6, SPEC_READY
today).** Lead owns the reply text contract and already fixes the role labels as ES "Asistente
virtual de ⟨agencia⟩", EN "AI assistant of ⟨agency⟩", DE "KI-Assistent von ⟨Agentur⟩", IT
"Assistente virtuale di ⟨agenzia⟩". This file follows Lead and does not introduce a competing set.
**One point for Lead to decide:** EN and DE name AI, ES and IT say "virtual". Requirement R4
(equivalence across languages) favours one meaning in all four. Recommended harmonised set, all
naming AI, all natural in each language:

| | es | en | de | it |
|---|---|---|---|---|
| Lead's current spec | Asistente virtual de {brand} | AI assistant of {brand} | KI-Assistent von {brand} | Assistente virtuale di {brand} |
| Recommended harmonised | Asistente de IA de {brand} | AI assistant of {brand} | KI-Assistent von {brand} | Assistente IA di {brand} |

The table below uses the harmonised set. If Lead keeps its spec, only the ES and IT role lines
change; nothing else in this file depends on it.

| Element | es (usted) | en | de (Sie) | it (Lei) |
|---|---|---|---|---|
| Closing greeting | Un cordial saludo, | Kind regards, | Mit freundlichen Grüßen | Cordiali saluti, |
| Role line, assistant | Asistente de IA de {brand} | AI assistant of {brand} | KI-Assistent von {brand} | Assistente IA di {brand} |
| Role line, human | {employee} | {employee} | {employee} | {employee} |
| Human role subline (optional) | {employee_title} · {brand} | {employee_title} · {brand} | {employee_title} · {brand} | {employee_title} · {brand} |
| Brand line | {brand} | {brand} | {brand} | {brand} |
| Contact line | {website} · {phone} · {email} | same | same | same |

Notes on each language:

- **es:** "Un cordial saludo" is the natural business close in Spain. "Saludos cordiales" is also
  correct; pick one and keep it. Register *usted* matches the disclosure requirement R3.
- **en:** "Kind regards" works for UK, Irish, Nordic and Dutch buyers writing in English.
- **de:** no comma after "Mit freundlichen Grüßen" (German convention). "KI-Assistent" is the
  standard compound, grammatically masculine and neutral in use; do not gender it by agency.
- **it:** register *Lei*. "Assistente IA" is common gender.
- **Other languages** the prompt already covers (fr, nl, and in staging pt, pl, sv, no, da, zh) fall
  back to **en** for the sign-off until each is supplied and checked by a native speaker. A wrong
  closing in the right language is worse than a correct English one. French and Dutch lines can be
  supplied on request; they are deliberately not guessed here.
- **The role line "AI assistant of {brand}" is not the legal disclosure.** It must stay
  compatible with whatever counsel approves in Part B, but it does not replace it.

### A.3 Test matrix for Lead and Hosting (acceptance `REPLY_CONTRACT_V2`)

| Case | Input | Expected sign-off |
|---|---|---|
| S1 | Spanish enquiry, tenant NuovaSolution, assistant reply | "Un cordial saludo," / "Asistente de IA de NuovaSolution" / brand line |
| S2 | English enquiry, other tenant `{brand}=TEST Fixture Agency A` (fixture) | "Kind regards," / "AI assistant of TEST Fixture Agency A" / "TEST Fixture Agency A". No "NuovaSolution", no "Antonio" anywhere |
| S3 | German enquiry, reply written in German | "Mit freundlichen Grüßen" / "KI-Assistent von {brand}" |
| S4 | Italian enquiry | "Cordiali saluti," / "Assistente IA di {brand}" |
| S5 | Enquiry in French | English sign-off (fallback), body in French |
| S6 | Human employee sends a reply | employee line, no assistant role line |
| S7 | Body contains the word *asistente* or *saludos* mid text | sign-off still rendered exactly once |
| S8 | `brand_display_name` null | `legal_name` used; if also null, `clients.name` |
| S9 | Any case | the string "Antonio's AI Assistant" appears **zero** times in the sent message |

"TEST Fixture Agency A" is a deliberately artificial fixture name for tests only; it must never appear in public copy.

---

## Part B — AI disclosure (DRAFT for counsel, not legally reviewed)

### B.1 What exists and what is proposed

| Version | Language | Text | Status |
|---|---|---|---|
| v1.0-es-2026-08, email | es | "Este mensaje ha sido generado por un asistente de inteligencia artificial de NuovaSolution. Si deseas atención personalizada con un agente humano, por favor indíquelo en su respuesta." | Owner approved 2026-08-05; counsel adequacy pending. **Defects:** names the vendor (DEF-DISCLOSURE-NUOVA-1, breaks R2 white label) and mixes *tú* ("deseas") with *usted* ("indíquelo") |
| v1.1-es-2026-09, email | es | "Le atiende el asistente digital de {{agency_legal_name}}, con la supervisión de nuestro equipo. Si prefiere hablar con una persona, indíquelo en su respuesta." | **PENDING counsel.** Vendor neutral, consistent *usted* |
| v1.0 WhatsApp | es | "🤖 Soy un asistente de inteligencia artificial. Te ayudaré con tu consulta inmobiliaria. Si prefieres hablar con un agente humano, indícamelo en cualquier momento." | Owner approved; *tú* register, conflicts with R3 |

**Recommendation to counsel:** take **v1.1** as the ES master for email, because it already meets
R1 to R3. The EN, DE and IT texts below are **equivalence drafts of v1.1**, offered so counsel
reviews four texts in one pass. They are not translations authored for use; they become usable
only with `legal_approved_by` set to a real approver, which the resolver already enforces (R9).

One substantive point for counsel on v1.1: "Le atiende el asistente digital" says *digital*
rather than *artificial intelligence*. Whether that sufficiently discloses an AI system under
Art. 50 of the AI Act is exactly question L2 of `LAWYER_REVIEW_MASTER_PACK_v1.md`. Alternative
wording offered for that decision is in the second row of each table below.

### B.2 Drafts

**Email, first message**

| | es (master, v1.1) | en | de | it |
|---|---|---|---|---|
| Option 1 (as v1.1) | Le atiende el asistente digital de {{agency_legal_name}}, con la supervisión de nuestro equipo. Si prefiere hablar con una persona, indíquelo en su respuesta. | You are being assisted by the digital assistant of {{agency_legal_name}}, supervised by our team. If you would prefer to speak with a person, just say so in your reply. | Sie werden vom digitalen Assistenten von {{agency_legal_name}} betreut, unter Aufsicht unseres Teams. Wenn Sie lieber mit einer Person sprechen möchten, schreiben Sie es einfach in Ihrer Antwort. | La assiste l'assistente digitale di {{agency_legal_name}}, con la supervisione del nostro team. Se preferisce parlare con una persona, lo indichi nella sua risposta. |
| Option 2 (names AI explicitly) | Esta respuesta la ha redactado el asistente de inteligencia artificial de {{agency_legal_name}}, con la supervisión de nuestro equipo. Si prefiere hablar con una persona, indíquelo en su respuesta. | This reply was written by the artificial intelligence assistant of {{agency_legal_name}}, supervised by our team. If you would prefer to speak with a person, just say so in your reply. | Diese Antwort wurde vom KI-Assistenten von {{agency_legal_name}} verfasst, unter Aufsicht unseres Teams. Wenn Sie lieber mit einer Person sprechen möchten, schreiben Sie es einfach in Ihrer Antwort. | Questa risposta è stata scritta dall'assistente di intelligenza artificiale di {{agency_legal_name}}, con la supervisione del nostro team. Se preferisce parlare con una persona, lo indichi nella sua risposta. |

Note: German "KI-Assistent" is a compound, not a parenthetical dash; it is the only hyphen in
these texts and is correct orthography. These are customer message texts, not website copy.

**WhatsApp, first message** (register fixed to *usted* per R3; the owner approved v1.0 is *tú*)

| | es | en | de | it |
|---|---|---|---|---|
| Option 1 | Le atiende el asistente digital de {{agency_legal_name}}. Si prefiere hablar con una persona, dígamelo en cualquier momento. | You are chatting with the digital assistant of {{agency_legal_name}}. If you would prefer a person, just tell me at any time. | Hier schreibt der digitale Assistent von {{agency_legal_name}}. Wenn Sie lieber mit einer Person sprechen möchten, sagen Sie es mir jederzeit. | Le scrive l'assistente digitale di {{agency_legal_name}}. Se preferisce parlare con una persona, me lo dica in qualsiasi momento. |
| Option 2 | Le escribe el asistente de inteligencia artificial de {{agency_legal_name}}. Si prefiere hablar con una persona, dígamelo en cualquier momento. | This is the artificial intelligence assistant of {{agency_legal_name}}. If you would prefer a person, just tell me at any time. | Hier schreibt der KI-Assistent von {{agency_legal_name}}. Wenn Sie lieber mit einer Person sprechen möchten, sagen Sie es mir jederzeit. | Le scrive l'assistente di intelligenza artificiale di {{agency_legal_name}}. Se preferisce parlare con una persona, me lo dica in qualsiasi momento. |

**Fallback line while `ai_disclosure_notices` is missing in prod.** Lead's `REPLY_CONTRACT_V2`
criterion 3 has the renderer insert a fixed minimal sentence per language when the table is
absent, with the ES example "Respuesta generada con asistencia de IA.". That sentence **is**
disclosure wording, so it belongs in this counsel package, not in engineering. Equivalence drafts:

| es (Lead's example) | en | de | it |
|---|---|---|---|
| Respuesta generada con asistencia de IA. | Reply generated with AI assistance. | Antwort mit KI-Unterstützung erstellt. | Risposta generata con l'assistenza dell'IA. |

Counsel point: a fallback that is shorter than the approved notice drops the "you can ask for a
person" clause; whether that is acceptable as an interim is part of C-Q8.

**Owner decision needed on WhatsApp register.** *Usted* is what R3 requires and what an agency
writing to an 800.000 € buyer uses; the owner approved v1.0 in *tú*. Recommendation: *usted*.

**Voice (spoken)** is not drafted here. `text_voice` is null in every language, voice is not live,
and whether the "ask for a human" clause may be dropped from the spoken opening is an open counsel
question (`VOICE_DISCLOSURE_REQUIREMENTS_v1.md` §4).

### B.3 Placement: three implementations disagree

| Implementation | Where the disclosure goes | When |
|---|---|---|
| Legal launch doc `legal/launch_docs/AI_DISCLOSURE_NOTICE_v1.md` | **Before** the first AI generated turn, prepended | first turn |
| Staging V3 | at the top | first turn, recorded by `record_ai_disclosure` |
| Staging composer `EMAIL_COMPOSER_v2.sql` | after the closing | first turn |
| Prod T3 renderer | separate block after the footer | every email, no gate |

**Recommendation:** follow the legal launch document (top of the first AI generated message per
contact, recorded per contact across channels). It is the only one of the four written as a legal
rule, and it keeps the disclosure away from the sign-off so neither can swallow the other. Final
placement is counsel's call; Hosting should build it switchable.

### B.4 Technical defects that would stop any approved text from reaching a customer

Recorded here so the wording work is not wasted. Owners in brackets.

1. `ai_disclosure_notices` does not exist in prod (F3, PGRST205). The table and its RPCs are in
   `PROD_RPC_MIGRATION_v1.sql`, marked not applied. **[API]**
2. The prod read `Fetch AI Disclosure` filters on `client_id`, a column the table does not have,
   and has no `language` or `active` filter. After promotion it would fail with a column error
   instead. Read through `ai_disclosure_render` or `ai_disclosure_gate` with the reply locale.
   **[Hosting]**
3. `apply_client_config.js` swallows the error and passes an empty string; its unit test asserts
   that behaviour. That is the "silent 404" dispatch H2 forbids. **[Hosting]**
4. Prod WhatsApp very likely sends with no disclosure today, because prod has no gate RPCs. Not
   proven from an export. **[Hosting: confirm from the live Main]**
5. The mandatory onboarding gate `ai_disclosure` is counsel pending, so **no agency can be
   activated** until Part B clears. This is the single largest dependency on counsel in the
   product. **[Counsel, then API]**

---

## Part C — handover

| To | Item | Closing signal |
|---|---|---|
| **Lead** | Remove PART 3 closing and the persona name from the Message Agent prompt, **and** the injected closing in `customer_message_html.js`, in the same change. Run A.3 S1 to S9 in staging with the real LLM | `REPLY_CONTRACT_V2 = STAGING_PASS` |
| **Hosting** | Build the sign-off in `[RENDER: Compose Email]` from tenant data per A.1 and A.2; fix B.4 items 2 and 3; confirm B.4 item 4; make disclosure placement switchable | `BRANDED_EMAIL_V2 = STAGING_PROVEN` |
| **API** | Fields per A.2 (reuse `agency_signature_text`, or add `signature_by_locale`); confirm a reply language signal reaches the renderer; promote the disclosure table gated; logo variants (see `PRODUCT_TEXTS_C2_v1.md` §3) | `BRANDING_DATA_PLANE_READY` |
| **Counsel** | Part B: choose Option 1 or 2 per channel; approve ES master and EN, DE, IT equivalents; placement §B.3; voice clause | written approval per text, recorded as `legal_approved_by` |
| **Owner** | WhatsApp register *usted* instead of the approved *tú*; whether NuovaSolution's own replies sign as the brand or also carry the owner as a human line when he takes over | one line each |

### Open questions carried from the research

1. Lead: is the Message Agent freeze lifted for PART 3 and the persona line?
2. Lead or API: which signal carries the language the reply is **actually written in** into the
   renderer?
3. API: will `ai_disclosure_notices` get a per tenant override, or stay global per language with
   only the `{{agency_legal_name}}` placeholder?
4. API: prod values of `clients.language`, `default_language` and `agency_email_branding.locale`
   for NuovaSolution are null today; who sets them?
5. Who submits the EN, DE and IT drafts to counsel together with the ES master? Recommendation:
   this lane bundles them in `CONNECT_NOTICE_DRAFT_v1.md` §E so counsel receives one package.
