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

**Nothing here has been approved by a lawyer.** Every text is a draft.

### 0a. Corrections of 2026-09-28 — read before the sheets

Three statements in the first version of this package were wrong. The Audit refuted them from its own
reads of the production and staging functions, and they are corrected here rather than quietly
adjusted. Evidence: `DISCLOSURE-FN-BYTES-0924` and `STATE-0928-LIVE` in
`governance/CLOSEOUT_EVIDENCE_INDEX_v1.md`.

| # | What this package claimed | What is established |
|---|---|---|
| C-1 | "A channel with no approved text falls back to the **e-mail** text, so it does not fail closed." | **Refuted for production.** `ai_disclosure_render` selects the text per channel and stops with `no_text_for_channel`. It fails closed. The fallback defect is in the **staging** gate `check_ai_disclosure`, which falls back to the **WhatsApp** text and filters neither approval status nor tenant. That is a staging defect owed by API, and it never reached a customer. |
| C-2 | "An unapproved interim sentence reaches real customers today." | **Not established, and materially different.** Production has had **0 customer runs since 2026-09-20**, 0 leads since 09-24, and all 8 notices are inactive. E-mail replies are held. WhatsApp ran under a regime that would have answered **without any notice** rather than with an unapproved one. Under ruling R34 that regime is corrected to `held`, so after Hosting's `WA_HOLD_PROD = VERIFIED` both channels hold until an approved notice is active. |
| C-3 | "Two texts are live in production today." | Only one text has ever been publicly live in this sense: the old website's own copy, which is a truthfulness matter, not a disclosure one. Whether the hard-coded interim string described in `COUNSEL_PACKAGE_v1.md` §E.3 still exists in the production workflow at all is **an open fact**, not a finding: ⟦OPEN FACT → Hosting: does prod Main still carry the renderer v2 fallback string, and under which regime would it be emitted?⟧ |

What does **not** change: no approved Spanish text is active, so nothing the assistant writes is
covered by an approval today, and `v1.1-es` is still pending. The urgency is unchanged; its reason is.

### Priority

| Order | Sheet | Why first |
|---|---|---|
| 1 | D1 AI disclosure `v1.1-es` | No approved notice is active, so every AI channel is held. The product cannot answer a customer until counsel and the owner close this |
| 2 | D2 Spoken Spanish disclosure | Voice has no approved text at all |
| 3 | D4 Privacy notice | Launch blocking, matrix row L-14 |
| 4 | D6 Deletion page, D5 Terms | Required by Meta for the WhatsApp review |
| 5 | D7 Connect notice, D8 Question box | Needed before a real agency connects a data source |
| 6 | D3, D9, D10, D11 | Needed before the corresponding feature is public |

---

## 1. Index

| # | Item | Channel | Languages | Live today? | Blocks |
|---|---|---|---|---|---|
| D1 | AI disclosure `v1.1-es` | chat, e-mail, WhatsApp | es | no notice active; both channels held | every customer-facing reply |
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
4. **Which text may be activated for the pilot agency.** The owner is being asked to activate
   `v1.0-es`. Its **e-mail** text reads "asistente de inteligencia artificial de NuovaSolution", so an
   e-mail sent under the pilot agency's brand would name **our** company as the operator of the
   assistant. `v1.1-es` is the version written to name the agency (`{{agency_legal_name}}`), and it is
   the one pending. Counsel decides whether naming the vendor instead of the agency in the agency's own
   e-mail is acceptable for the pilot, or whether `v1.1-es` must be approved first. The WhatsApp text
   of `v1.0-es` does not have this problem, because it names no company at all.
5. The interim wording in `COUNSEL_PACKAGE_v1.md` §E.3 was never approved by anyone. Whether it is
   still emitted anywhere is an open fact (§0a, C-3). If Hosting confirms it exists, counsel says
   whether it may remain for non-Spanish replies while `v1.1-es` is pending.

**Blocked until answered:** any reply to a real customer, and D3.

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

**Corrected, and it improves the position:** production does **not** substitute another channel's
text. `ai_disclosure_render` stops with `no_text_for_channel`, and the voice text is NULL in all eight
notices, so a spoken reply cannot go out carrying an e-mail sentence. A voice channel without an
approved text is held, not improvised (§0a, C-1). The residual defect is in the staging gate and is
owed by API (§3, T-01).

**Who writes the spoken text:** the wording belongs to the Voice lane, which owes the telephony
inventory first (`VOICE_TELEPHONY_INVENTORY`); this package carries the draft in
`COUNSEL_PACKAGE_v1.md` §E.6 so counsel can rule on the shape of it, not on a final script.

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

**Exact text:** **`LEGAL_PAGES_FINAL_v1.md` §2** (EN §2.1, ES §2.2, retention proposal §2.7), which
replaces `COUNSEL_PACKAGE_v1.md` §B.1/§B.2 as of 2026-09-28. The new version adds the Instagram, Meta
and WhatsApp section, splits the controller and processor situations into one explicit section, and
removes both "will be listed here after legal review" promises, which are now marked gaps that must be
filled before publication.

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

**Exact text:** **`LEGAL_PAGES_FINAL_v1.md` §3** (EN §3.1, ES §3.2), which replaces
`COUNSEL_PACKAGE_v1.md` §C.1/§C.2 as of 2026-09-28. It adds the agency's duty not to remove the AI
notice, the four separated payment steps, and the statement that a held reply is correct behaviour
rather than downtime. Two marks remain for counsel: ⟦COUNSEL: DPA⟧ and ⟦COUNSEL: LIABILITY⟧.

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

**Exact text:** **`LEGAL_PAGES_FINAL_v1.md` §4** (EN §4.1, ES §4.2), which replaces
`COUNSEL_PACKAGE_v1.md` §D.1/§D.2 as of 2026-09-28. It adds the Instagram and Facebook path: the agency
disconnects, or the person removes the app in their Meta settings, which sends us a deletion request for
which we return a confirmation code. Content of the Meta parts follows the Social lane's own
specification of 2026-09-23 §5 and awaits Social's confirmation.

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

## 2. The actual exposure today

Counsel should treat this as the current exposure, independent of the drafts above. It is smaller than
the first version of this package claimed, and the difference matters for how urgent each sheet is.

1. **No AI reply is going out at all.** 0 production customer runs since 2026-09-20, all eight notices
   inactive, e-mail held, and WhatsApp moving to held under R34. There is no stream of unapproved
   disclosures to stop; there is a product that cannot answer until D1 is closed.
2. **The old live website** still carries unsupported claims. They are being removed under
   `OLD_LIVE_SITE_HOTFIX_COPY_v2.md`, which is a truthfulness fix, not a legal one, and it proceeds
   without waiting for counsel.
3. **No legal page is public.** `/terms` and `/data-deletion` return 404 and the privacy notice
   contains no Instagram, Meta, WhatsApp or Facebook section. That blocks the Meta review and is the
   reason D4, D5 and D6 now have finished drafts in `LEGAL_PAGES_FINAL_v1.md`.

---

## 3. Technical unknowns to close before counsel answers

These are not legal questions. Each one changes what counsel is being asked to approve, so the
responsible lane should close it first.

| # | Unknown | Lane | Closing signal | Affects |
|---|---|---|---|---|
| T-01 | **Corrected (§0a, C-1).** Production fails closed with `no_text_for_channel`. Open: the **staging** gate `check_ai_disclosure` falls back to the WhatsApp text and filters neither `approval_status` nor `approved_client_ids`; and an empty `{{agency_legal_name}}` still renders | API | `STG_DISCLOSURE_GATE_FIXED` | D1, D2, D3 |
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
| O-4 | `DISCLOSURE_LIVE_TEXT`: which version is activated, given that the `v1.0-es` e-mail text names NuovaSolution rather than the agency (D1 question 4) | D1, and the pilot |
| O-5 | Whether the four legal pages are published now, ahead of the website launch, so the Meta chain can proceed | D4, D5, D6 |

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
5. Priority is stated, led by the fact that no approved notice is active, which holds every channel.

## 6. What changed on 2026-09-28

1. Three of this package's own statements are corrected in §0a: the production renderer does fail
   closed, no unapproved sentence is reaching customers, and the "two live texts" claim is withdrawn.
2. The privacy notice, the terms and the deletion page now have finished drafts in
   `LEGAL_PAGES_FINAL_v1.md`, including the Instagram, Meta and WhatsApp sections the Meta review
   needs. D4, D5 and D6 point there instead of at v1.
3. D1 gains the question that decides the pilot: `v1.0-es` names the vendor in the e-mail text, while
   the proof API is asked to produce expects the agency's legal name, which only the pending `v1.1-es`
   yields.
4. D2 is corrected in our favour and the authorship of the spoken text is assigned to the Voice lane.
5. T-01 is rewritten to the staging defect that actually exists.
6. Two owner decisions are added: which disclosure version is activated, and whether the legal pages
   are published ahead of the launch.

**Not changed:** v1 §E (the disclosure inventory and the equivalence drafts), §F and §G. The
Google Sheets corrections in D7.1 stand.

---

## 7. COUNSEL_QUESTIONS_0929 — the whole list, in one place

Added 2026-09-29. Everything counsel is being asked, bundled, so nobody has to assemble it from the
sheets. Each row names the sheet it belongs to and what stays blocked while it is open. Nothing on this
list has been approved by a lawyer, and no text in our files is marked as approved.

| # | Question | Sheet | Blocked while open |
|---|---|---|---|
| CQ-1 | Is `v1.1-es` adequate as the AI notice for e-mail, WhatsApp and the form channel, in each channel separately? | D1 | every reply to a real customer |
| CQ-2 | **The pilot's version question.** May `v1.0-es` be used for a **third party agency**, given that its e-mail text names NuovaSolution as the operator of the assistant, or must `v1.1-es` (which names the agency) be approved first? An owner acceptance alone does not answer whether the customer of that agency is correctly informed | D1, O-4 | `DISCLOSURE_SCOPE_PILOT` for any agency other than our own tenant |
| CQ-3 | Must the notice repeat in every message of a conversation, or is the first one enough? | D1 | nothing; today it repeats |
| CQ-4 | Must the agency's **registered** legal name appear, or is the trading brand enough? | D1 | whether an empty legal name may ever render |
| CQ-5 | The **spoken** notice for a call: wording, the moment it is said, and whether recording needs its own sentence. Voice owns the draft, counsel the adequacy | D2 | every call. Today the routing answers `route = human`, `reason = language_not_legally_supported`, so no AI call happens at all |
| CQ-6 | Are the EN, DE and IT drafts legally equivalent to the approved Spanish text for a recipient in that language? | D3 | answering a customer who writes in those languages |
| CQ-7 | The privacy notice as a whole: legal bases per purpose, the processor list's required level of detail, the transfer statement, and whether the agency's customers need a notice separate from the one for agency users | D4 | publication of the privacy page |
| CQ-8 | **Retention.** The proposal per data class in `LEGAL_PAGES_FINAL` §2.7. Note the facts: production carries **0** retention policy rows, and no restorable backup is proven, so nothing may be promised that the system does not do | D4, O-8 | the retention section, and any answer about how long data is kept |
| CQ-9 | Terms: is a data processing agreement an annex, and when does the agency accept it? | D5 | the terms page |
| CQ-10 | Terms: the liability limitation | D5 | the terms page |
| CQ-11 | Terms: the trial clause, including that it does not convert on its own | D5 | nothing; the current wording is conservative |
| CQ-12 | **The Instagram section** now in `LEGAL_PAGES_FINAL` §2.1/§2.2 section 12: the legal bases as stated, the hashed sender identifier as a safeguard, and whether the retention rule tied to the connection is sufficient | D4, D6 | the Meta App Review |
| CQ-13 | **The deletion deadlines.** Social proposes confirming within 72 hours and completing within 30 days. Are they required, or may we state the statutory period? They are currently **not** in the page, because no social deletion path has ever run | D6 | nothing today; it changes the page if required |
| CQ-14 | Does the deletion page satisfy the platform requirement while staying truthful about our role as processor for an agency's data subjects? | D6 | the Meta App Review |
| CQ-15 | The connect notice: acknowledgement or consent, and may the three pending rows stay hidden until CQ-7 and CQ-8 are answered? | D7 | the first real data source connection |
| CQ-16 | **The web channel notice**, priority 1: is the draft in `PRODUCT_FAQ_KB_v1.md` §8 sufficient on our own site, must it be versioned like the channel texts, and is "follow up" a permissible description? | D8 | the public question box |
| CQ-17 | The review rule: may we ask a customer for a public review, and under what disclosure? | D9 | the first review we would ever publish |
| CQ-18 | The legal footer of transactional account e-mail, and whether it needs an unsubscribe line | D10 | the confirmation e-mail |
| CQ-19 | What we may guarantee an agency about executing a data subject request on its behalf, and what happens to copies outside our control | D11 | the first real agency |
| CQ-20 | **The transfer basis, added 2026-09-30.** `LEGAL_PAGES_FINAL` v3 §6 now names all seven services in the customer path, and §10 names the four that may process outside the European Economic Area: Meta, Google, OpenRouter, OpenAI. The page states that their **own** data processing terms make such transfers under the European Commission's standard contractual clauses, and that we have not verified where each stores data. Is that a sufficient basis and a sufficient statement, or must we hold a signed processing agreement with each one before naming it? | D4 | publication of the privacy page, if the answer is that the statement is not enough |
| CQ-21 | **Retention, now with a template.** API and Multimodal delivered `MEDIA_RETENTION_TEMPLATE_v1`, so the owner can decide days per document class (O-8). Counsel confirms the classes and the periods before they are printed. Today production carries **0** retention policy rows, so nothing is deleted on a schedule | D4, D11 | the retention section |

### 7.1 O-4 for the owner, in two sentences

For the owner's decision, without legal language:

> **`v1.0-es`** is approved and ready, and its e-mail text tells your pilot agency's customers that they
> are dealing with "un asistente de inteligencia artificial **de NuovaSolution**", which names us rather
> than the agency.
> **`v1.1-es`** says "el asistente digital **de \{\{agency_legal_name\}\}**", which is what an agency would
> want its customers to read, and it is still waiting for the lawyer.

Consequence either way: the **WhatsApp** text of `v1.0-es` names no company, so a WhatsApp-only pilot can
start today without this question. E-mail cannot, unless the owner accepts our name appearing in the
agency's mail, which is CQ-2.
