# COUNSEL PACKAGE v2 — decision sheets

**State:** `2026-09-22_SYNC_1800Z` · **Written:** 2026-09-23 · **Supersedes:** the question list in
`COUNSEL_PACKAGE_v1.md` §I and §K.
**Lane:** Website Copy / Product Truth. **Status:** DRAFT by its author, not legally reviewed, not
independently reviewed.

---

## 0. How to use this with v1

`COUNSEL_PACKAGE_v1.md` stays valid and is **the body of text**: the full drafts of the privacy
notice (§B), terms (§C), the deletion page (§D) and the disclosure inventory (§E) live there and are
unchanged unless a sheet below says otherwise. This v2 is **the decision layer**: one sheet per item
that needs a lawyer's yes, with the channel, the language, the version, the data flow and what is
blocked until the answer arrives.

Send both files together. Read v2 first.

**Nothing here has been approved by a lawyer.** Every text is a draft. Two texts are live in
production today and are marked as such, because counsel needs to know what is already reaching real
people.

### Priority

| Order | Sheet | Why first |
|---|---|---|
| 1 | D1 AI disclosure `v1.1-es` | An unapproved interim sentence reaches real customers today |
| 2 | D2 Spoken Spanish disclosure | Voice has no approved text at all |
| 3 | D4 Privacy notice | Launch blocking, matrix row L-14 |
| 4 | D6 Deletion page, D5 Terms | Required by Meta for the WhatsApp review |
| 5 | D7 Connect notice, D8 Question box | Needed before a real agency connects a data source |
| 6 | D3, D9, D10, D11 | Needed before the corresponding feature is public |

---

## 1. Index

| # | Item | Channel | Languages | Live today? | Blocks |
|---|---|---|---|---|---|
| D1 | AI disclosure `v1.1-es` | chat, e-mail, WhatsApp | es | interim text yes | every customer-facing reply |
| D2 | Spoken Spanish disclosure | voice | es | no text exists | voice go-live |
| D3 | Disclosure equivalence | chat, e-mail, WhatsApp | en, de, it | no | non-Spanish customers |
| D4 | Privacy notice (controller) | website | en, es | placeholder | public launch |
| D5 | Terms of service | website | en, es | no | paid sign up, Meta |
| D6 | Data deletion instructions | website | en, es | no | Meta review |
| D7 | Notice before connecting a data source | product UI | en, es | test surfaces only | first real connection |
| D8 | Question box storage and retention | website | en, es | live | question box on the new site |
| D9 | Trial and review rule | website | en, es | no | the word "free", review copy |
| D10 | Legal footer for account e-mail | e-mail | en, es | unconfigured | confirmation e-mail |
| D11 | Customer rights requests (DSAR) | product UI | en, es | no | first real agency |

---

## D1 — AI disclosure, Spanish `v1.1-es`

**Channel:** chat, e-mail, WhatsApp · **Language:** es · **Recipient:** the agency's customer, a
private individual · **Status:** `v1.0-es` owner approved 2026-08-05 and **inactive**; `v1.1-es`
**pending**; an uncontrolled interim sentence is **active in production**.

**Exact texts:** `COUNSEL_PACKAGE_v1.md` §E.1 (verbatim `v1.0-es` and `v1.1-es`) and §E.3 (the
interim sentence). Not repeated here so that only one copy of the wording exists.

**Data flow:** a person writes to an agency. Our system composes the reply with an AI service and
sends it under the agency's brand. The disclosure sentence is prepended or appended to that reply,
depending on the channel.

**What counsel must decide.**

1. Does `v1.1-es` satisfy the Spanish and EU transparency duty for an automated reply sent in a
   business's name, in each of the three channels?
2. Must the disclosure appear in **every** message of a conversation, or is the first message
   enough? Today it repeats.
3. Must the agency's registered legal name appear, or is the trading brand enough? This decides
   whether an empty `{{agency_legal_name}}` may ever render. See §3 item T-02.
4. The interim sentence in §E.3 is live and was never approved. Confirm whether it must be replaced
   before the next real customer message, or whether it is defensible in the meantime.

**Blocked until answered:** any reply to a real customer in the new build, and D3.

---

## D2 — Spoken Spanish disclosure (voice)

**Channel:** voice call · **Language:** es · **Status:** **no approved text exists in any version.**

**Draft for review:** `COUNSEL_PACKAGE_v1.md` §E.6.

**Data flow:** an inbound or outbound call is answered by a synthetic voice under the agency's
brand. The caller hears the disclosure before anything else is said.

**What counsel must decide.**

1. The wording and the moment: first sentence of the call, before any question is asked.
2. Whether the caller must be told the call may be recorded, and whether a separate sentence is
   needed for that.
3. Whether an outbound call needs more than an inbound one.

**Known defect counsel should be aware of:** the renderer falls back to the **e-mail** text when no
voice text exists, so a channel with no approved wording does not fail closed. That is a technical
fix owed by API (§3, item T-01), not a legal question, but it changes the risk while D2 is open.

**Blocked until answered:** voice go-live, and every public sentence about voice.

---

## D3 — Disclosure equivalence in EN, DE, IT

**Channel:** chat, e-mail, WhatsApp · **Languages:** en, de, it · **Status:** drafts only.

**Exact texts:** `COUNSEL_PACKAGE_v1.md` §E.2, with the API rows in §E.5.

**What counsel must decide.** Whether each draft is legally equivalent to the approved Spanish text
for a recipient in that language, and whether any country adds its own requirement. The drafts are
translations of meaning, not of words, so equivalence cannot be assumed from the Spanish approval.

**Rule we apply until counsel answers:** a customer who writes in a language with no approved
disclosure is answered in that language **only** if a disclosure exists for it. Otherwise the
conversation is handed to a person. This is a product rule, and it is not implemented yet (§3,
item T-03).

---

## D4 — Privacy notice of NuovaSolution

**Channel:** website · **Languages:** en, es · **Status:** draft; the live site carries a
placeholder, which is matrix row **L-14, launch blocking**.

**Exact text:** `COUNSEL_PACKAGE_v1.md` §B.1 (EN) and §B.2 (ES), unchanged in v2.

**What counsel must decide.**

1. The controller identity and the registered address that must appear (owner input needed first,
   §4 item O-1).
2. The legal basis for each purpose as listed in §B.
3. Whether the sub-processor list must name each service, and whether it must be public and versioned.
4. International transfers: which of the services used require a transfer mechanism and how it is
   described.
5. Retention periods. The drafts leave them open because no product retention rule is decided
   (§4 item O-2).
6. Whether a separate notice is needed for the agency's customers, distinct from this notice for
   agency users, given that we act as processor for the former and controller for the latter
   (roles in `COUNSEL_PACKAGE_v1.md` §A).

**Blocked until answered:** the public launch of the redesigned site.

---

## D5 — Terms of service

**Channel:** website · **Languages:** en, es · **Status:** draft.

**Exact text:** `COUNSEL_PACKAGE_v1.md` §C.1 and §C.2.

**What counsel must decide.**

1. Whether a separate data processing agreement is required as an annex, and whether the agency must
   accept it at sign up or at first connection.
2. The trial clause: what we may say about the 14 days, what happens to data at the end of a trial
   that does not convert, and whether an automatic conversion to a paid plan is permitted as drafted.
3. Liability and availability language, given that no uptime commitment is made anywhere in the copy.
4. Consumer versus business: our customers are businesses, and the drafts assume that. Confirm.
5. Governing law and venue.

---

## D6 — Data deletion instructions page

**Channel:** website · **Languages:** en, es · **Status:** draft, required by Meta.

**Exact text:** `COUNSEL_PACKAGE_v1.md` §D.1 and §D.2.

**What counsel must decide.** Whether the page satisfies the platform requirement while being
accurate about our role: a person writing to an agency is the agency's data subject, and the request
usually has to be executed by the agency with our help. The draft says that. Confirm it is both
truthful and sufficient for the platform.

---

## D7 — Notice before connecting a data source, `v1.1`

**Channel:** product UI · **Languages:** en, es · **Status:** draft, rendered on test surfaces only.

**Exact text:** `COUNSEL_PACKAGE_v1.md` §G and the shipped strings in
[lib/content/connect-notice.ts](lib/content/connect-notice.ts).

### D7.1 Correction owed before counsel reads it

The shipped Google Sheets text states the **wrong direction of data flow**. It says Nuova reads the
enquiries that arrive in the sheet. The sheet is a copy sink: leads flow **to** it. The file
contradicts itself, because the disconnect row already says "New leads stop going to the sheet."
Counsel must not approve a description that is factually inverted, so these two replacements are
made first.

| Location | Replace | With |
|---|---|---|
| `short[0].en` | Connecting Google Sheets lets Nuova do its job for your agency: read the enquiries that arrive there, answer them, qualify them and keep them as leads. To do that, Nuova processes the messages and the details people send you, including with AI services that understand the message and draft the reply. | Connecting Google Sheets gives your team a copy of your leads in a spreadsheet you control. Nuova answers and qualifies the enquiries it receives, and writes each lead to your sheet. To do that, Nuova processes the messages and the details people send you, including with AI services that understand the message and draft the reply. |
| `short[0].es` | Al conectar Google Sheets, Nuova puede hacer su trabajo para tu agencia: leer las consultas que llegan ahí, responderlas, cualificarlas y guardarlas como leads. Para ello, Nuova trata los mensajes y los datos que te envían las personas, también con servicios de inteligencia artificial que entienden el mensaje y redactan la respuesta. | Al conectar Google Sheets, tu equipo tiene una copia de tus leads en una hoja que controlas tú. Nuova responde y cualifica las consultas que recibe, y escribe cada lead en tu hoja. Para ello, Nuova trata los mensajes y los datos que te envían las personas, también con servicios de inteligencia artificial que entienden el mensaje y redactan la respuesta. |
| `rows[0].text.en` | From Google Sheets: a copy of each lead: contact details, … | To Google Sheets: a copy of each lead: contact details, what they are looking for, qualification and status. What Nuova keeps: the same lead, its qualification and priority, the conversation history, and tasks such as a viewing request. |
| `rows[0].text.es` | De Google Sheets: una copia de cada lead: datos de contacto, … | A Google Sheets: una copia de cada lead: datos de contacto, lo que busca, cualificación y estado. Lo que Nuova conserva: el mismo lead, su cualificación y prioridad, el historial de conversación y tareas como una petición de visita. |

This is a copy change in a shipped file. The Website Implementer applies it; I do not edit
application code.

### D7.2 What counsel must decide

1. Is an **acknowledgement** the right instrument here, or is consent required? The control today
   reads "I have read what is shared and why." and is logged with time and user.
2. The three rows still marked `pending` (AI, who processes it, how long it is kept) cannot be
   written until D1, D4 item 3 and D4 item 5 are answered. Confirm they may stay hidden with
   "Awaiting legal review" until then, rather than being filled with a provisional description.
3. Whether the agency, as controller towards its own customers, needs a different notice than this
   one, which is addressed to the agency user.

---

## D8 — Question box on the public website

**Channel:** website · **Languages:** en, es · **Status:** the box is live; its notice is a draft.

**Data flow, as built.** A visitor types a question and an e-mail address. The submission is stored
as a lead record in `website_qa` and is answered by a person or by the assistant. It is our own
processing as controller, not an agency's.

**Two lines shown at the box, as drafted in `PRODUCT_TEXTS_C3_v1.md` §4:**

> Storage, EN: Your question is saved as an enquiry in Nuova, with any contact details you give us,
> so we can answer and follow up. Read the privacy notice.
> Storage, ES: Tu pregunta se guarda como una consulta en Nuova, junto con los datos de contacto que
> nos des, para poder responderte y hacer seguimiento. Lee el aviso de privacidad.
>
> AI, EN: Answers are written by an AI assistant.
> AI, ES: Las respuestas las redacta un asistente de IA.

**What counsel must decide.**

1. Is the storage line sufficient at the point of collection, given the full notice is one click
   away, and is "follow up" a permissible description of contacting the person afterwards about the
   product? If it is not, the line must narrow to answering only, and the product must follow.
2. How long may a question and its e-mail address be kept? No retention rule is decided (§3, T-05).
3. Is the plain AI line enough here, or must this channel carry the same disclosure as D1? The
   recipient is a prospective customer of ours rather than of an agency, so the D1 text does not fit
   as written.

---

## D9 — Trial, the word "free", and review copy

**Channel:** website · **Languages:** en, es · **Status:** matrix T-01 approved, T-03 on legal hold.

**What counsel must decide.**

1. **C-19, the review rule.** Whether we may ask a customer for a public review, and under what
   conditions, given that any incentive must be disclosed. No review is published today and no
   testimonial exists. We want the rule before, not after, the first one.
2. **T-03**, the offer to extend the trial by seven days in exchange for anything. On legal hold and
   not implemented.
3. Confirm the plain wording "14 days free. No payment." is safe as an advertising claim in Spain
   when no payment method is collected and no automatic charge follows. This is the sentence in
   `AUTH_COPY_v1.md` §1.

---

## D10 — Legal footer for the account e-mail

**Channel:** e-mail · **Languages:** en, es · **Status:** unconfigured.

The confirmation and invitation e-mails in `AUTH_COPY_v1.md` §6 end with
`NuovaSolution · {legal_footer}`. **What counsel must decide:** what that footer must contain for a
Spanish business sending transactional e-mail, and whether a transactional account e-mail needs an
unsubscribe line (our reading is no, because it is not marketing, and we want that confirmed).

---

## D11 — Customer rights requests

**Channel:** product UI · **Languages:** en, es · **Status:** texts drafted in
`PRODUCT_TEXTS_C2_v1.md`; no deletion routine is implemented.

**What counsel must decide.** What we must guarantee to an agency about executing a request on its
behalf, what the deadline is once the agency forwards a request to us, and what must happen to
copies that already left our system, for example a lead written to the agency's own Google Sheet.
Our current text says we help the agency answer; it does not promise erasure from copies we no
longer control.

---

## 2. Two texts are live today

Counsel should treat these as the current exposure, independent of the drafts above.

1. The interim AI disclosure sentence, `COUNSEL_PACKAGE_v1.md` §E.3, confirmed in production by the
   Audit on 2026-09-22. Never approved by anyone.
2. The old live website, whose unsupported claims are being removed under
   `OLD_LIVE_SITE_HOTFIX_COPY_v2.md`. That is a truthfulness fix, not a legal one, and it is
   proceeding without waiting for counsel.

---

## 3. Technical unknowns to close before counsel answers

These are not legal questions. Each one changes what counsel is being asked to approve, so the
responsible lane should close it first.

| # | Unknown | Lane | Closing signal | Affects |
|---|---|---|---|---|
| T-01 | `ai_disclosure_render` does not fail closed: with no text for a channel it falls back to the e-mail text, and an empty `{{agency_legal_name}}` still renders | API | `DISCLOSURE_FAIL_CLOSED = READY` | D1, D2, D3 |
| T-02 | Where the agency's legal name is stored, whether it is mandatory at onboarding, and what happens when it is empty | API | `AGENCY_LEGAL_NAME_SOURCE` | D1, D4 |
| T-03 | No rule routes a customer writing in a language with no approved disclosure to a person | API | `DISCLOSURE_LANGUAGE_GATE` | D3 |
| T-04 | The full list of sub-processors actually reached by a customer message, including the AI provider, and the region each runs in | Hosting | `SUBPROCESSOR_LIST_v1` | D4, D7 |
| T-05 | Actual retention in every store that holds customer data, including backups | Hosting | `RETENTION_MAP_v1` | D4, D7, D8, D11 |
| T-06 | Whether the WhatsApp number and Meta app are registered to the correct legal entity, and which permissions the review requests | Social | `META_ENTITY_CONFIRMED` | D5, D6 |
| T-07 | Sender address and SMTP for account e-mail | API | `AUTH_MAIL_TEMPLATE` | D10 |
| T-08 | Whether `website_qa` submissions are deletable on request today | API | `QA_DELETION_READY` | D8, D11 |

---

## 4. Owner decisions, not counsel

| # | Decision | Needed for |
|---|---|---|
| O-1 | The legal entity, registered address and tax identifier to publish | D4, D5, D6, D10 |
| O-2 | How long the product keeps customer data by default, as a business choice inside whatever counsel allows | D4, D7, D11 |
| O-3 | Which lawyer receives this package, and whether one engagement covers Spain plus the Meta review | all |
| O-4 | Whether to pause the interim disclosure sentence now or accept it until D1 returns | D1 |

---

## 5. What changed against v1

1. Every legal question is now a sheet with its channel, language, version, data flow and what it
   blocks, instead of a flat list of nineteen questions.
2. The Google Sheets connect notice is corrected for the direction of the data flow, which was
   inverted in the shipped file (D7.1).
3. The question box, the account e-mail footer and the review rule are added as their own items
   (D8, D10, D9 item 1).
4. The technical unknowns are separated from the legal questions and assigned to API, Hosting and
   Social with a named closing signal each (§3).
5. Priority is stated, led by the unapproved sentence that is live today.

**Not changed:** the drafts in v1 §B, §C, §D, §E, §F and §G. v2 adds no new legal text except the
two Google Sheets corrections in D7.1.
