# PRODUCT TRUTH — NuovaSolution

**Author:** Product Truth Director / Claims Auditor instance (independent of implementation)
**Branch:** `website_enterprise_redesign`
**Created:** 2026-08-30
**Binding under:** `MASTER_GOVERNANCE.md` §3 (document precedence), R3, R6, R7
**Companion document:** `CLAIMS_MATRIX.md`

> **Scope of authority.** This document defines what NuovaSolution *is* and *is not* for the
> purpose of public website statements. It does not approve a design, a page, a release or a
> deployment. It makes **no production readiness claim** about any capability.

---

## 0. Method, evidence rules and the central limitation

### 0.1 What was examined

| Source | What it is | What it can prove |
|---|---|---|
| `docs/website_redesign/MASTER_GOVERNANCE.md` | Process authority | Rules, not product facts |
| `docs/website_redesign/CURRENT_SITE_AUDIT.md` | Factual codebase inventory | State of the **website**, not the product |
| `docs/website_redesign/INTEGRATION_CONTRACT.md` | Action-by-action state machine | Which website actions have a target system |
| `docs/website_redesign/IMPLEMENTATION_STATUS.md` | Phase log, 7 open conflicts | Which decisions are still missing |
| `CLAUDE.md` | Older project brief | Superseded positioning (conflict C-07) |
| Website codebase (72 tracked files + untracked `/v2`) | Next.js 14 marketing frontend | What the site does today |
| `components/live-demo/demo-engine.ts` | 590 lines, deterministic | That the public demo is **not AI** |
| `translations/en.ts`, `translations/es.ts` | 240 keys each | The claims currently published |
| `lib/os/copy.ts` (untracked `/v2` draft) | Marketing draft with `status: "live" \| "soon"` flags | **Author intent**, not verification |
| Local project notes (2026-05-20) | Automation inventory, active/inactive components | **Indirect** evidence that a backend exists |

### 0.2 Evidence rules applied

1. **Marketing copy is not evidence.** Text in `translations/*.ts` or `lib/os/copy.ts` asserting
   a capability proves only that someone wrote the sentence.
2. **A brief is not evidence.** The owner's capability list is a *specification of intent*. It is
   recorded faithfully below, but it does not by itself move a capability to "confirmed".
3. **Absence of code is evidence of absence — in this repository only.** The website repo
   containing no voice, CRM, social or panorama code proves the *website* has none. It does not
   prove the *product* has none, because the product lives outside this repository.
4. **Indirect evidence is labelled as indirect.** A locally documented component inventory dated
   2026-05-20 indicates that an automation backend exists with active and inactive parts. It is
   three months old, lists names only, and carries no functional verification.
5. **No internal architecture is reproduced here.** Per R8 and the owner's system-isolation
   directive, component names, identifiers, endpoints, hostnames and credentials are not written
   into this document, and no external system was contacted to produce it.

### 0.3 The central limitation — read this before using this document

**Verification of the product backend was not performed and was not permitted.**

The owner's binding system-isolation directive forbids accessing the product project, the n8n
server, Supabase, webhooks, credentials and production integrations. Verification of a live
capability requires exactly that. Therefore:

> **No capability in this document can be placed in Category 1 (Live and confirmed) by this
> instance.** Category 1 is reserved and can only be entered when the owner supplies evidence
> (see §0.4) or an authorised technical instance verifies the capability inside the product
> project.

This is not a judgement that the capabilities are absent. Several are very likely real. It is a
statement that **the website may not assert them as confirmed until evidence exists**, because
under R3/R6 an unverified public claim is a P0 finding regardless of whether it happens to be true.

The practical consequence: the new website can be **designed and written in full**, but a large
share of its claims must ship either (a) with the qualifying wording defined in
`CLAIMS_MATRIX.md`, or (b) not at all, until the owner closes the evidence gaps.

### 0.4 What counts as sufficient evidence to promote a capability to Category 1

Any **one** of the following, supplied by the owner, per capability:

- A dated screen recording or screenshot of the capability running in the product, with the
  agency-facing and customer-facing surfaces visible.
- A written owner confirmation naming: the capability, the date it went live, at least one real
  agency using it, and the configuration it requires.
- A verification report from an authorised technical instance working *inside* the product
  project (not from this website project).

Owner statements alone are accepted for **commercial** facts (packages, trial terms, contact
channels). They are **not** accepted for **technical** facts that the website would state as
present-tense capability, unless the owner explicitly takes responsibility for the claim — which
is itself recorded in `CLAIMS_MATRIX.md` as *Approved on owner's assertion*.

---

## 1. Status categories

| # | Category | Meaning | May the website state it in the present tense? |
|---|---|---|---|
| 1 | **Live and confirmed** | Verified end to end against evidence per §0.4 | Yes, plainly |
| 2 | **Technically present, not fully live-verified** | Asserted by the owner and/or indirectly evidenced; not verified | Only with the qualifying wording in `CLAIMS_MATRIX.md` |
| 3 | **Depends on agency configuration** | Real, but only exists once the agency configures it | Yes, with a configuration qualifier |
| 4 | **Legally or organizationally restricted** | Capability may exist but its use is bounded by law, platform policy or internal process | Only with the legal qualifier, and only after legal confirmation |
| 5 | **Available as controlled simulation** | The website can *show* it; the shown behaviour is not the product | Only when visibly labelled as a simulation |
| 6 | **Website prepared, backend not connected** | UI exists or will exist; no target system | No present-tense capability claim; honest pending state only |
| 7 | **Future capability** | Planned, not built | Only as an explicitly labelled future item, visually separated |

**Current distribution across the capabilities in §3–§16: Category 1 — 0. ** Every other capability
sits in Category 2 or lower. This is the single most important output of this document.

---

## 2. Positioning truth

### 2.1 Confirmed positioning

NuovaSolution is positioned as an **AI Operating and Growth Platform for real estate agencies**,
not a chatbot and not a single-purpose lead tool. This is confirmed by the owner's brief and by
`MASTER_GOVERNANCE.md` §10, and it is binding.

**This is a positioning statement, not a capability claim.** It describes the category the product
competes in. It does not authorise stating that every module inside that category is live. The two
are separated deliberately throughout `CLAIMS_MATRIX.md`.

### 2.2 Positioning conflicts found

| ID | Conflict | Resolution |
|---|---|---|
| **PT-C1** | `CLAUDE.md` positions NuovaSolution as *"AI lead automation for real estate agencies in Spain"* and mandates a pain-first, sand/ivory Mediterranean homepage. The redesign brief mandates an enterprise AI Operating and Growth Platform with mineral black / champagne. | The redesign brief supersedes `CLAUDE.md` (per §10 governance and IMPLEMENTATION_STATUS C-07). **`CLAUDE.md` must be updated by the owner** so the repository does not carry two contradictory briefs. Until then, no instance should read `CLAUDE.md` as current positioning. |
| **PT-C2** | The **live website today** states the old positioning in the footer: *"AI lead automation for real estate agencies in Spain."* | Factual record. It is not a violation today, because it is a *narrower* claim than the platform positioning. It must be replaced in the redesign, not carried over. |
| **PT-C3** | `CLAUDE.md` instructs "Do NOT expose n8n / internal logic". The redesign brief is silent on this. | The `CLAUDE.md` rule is **retained** — it agrees with R8 and with the owner's isolation directive. Internal automation architecture is never public. |
| **PT-C4** | `CLAUDE.md` requires a chatbot/assistant entry point on the site; `INTEGRATION_CONTRACT.md` §7 records no chat backend. | The site assistant is Category 6. See §17.7. |

### 2.3 What NuovaSolution may never be called

- A chatbot, a chat widget, a WhatsApp bot, an autoresponder.
- A CRM replacement, unless §8's dependencies are closed (it is described as a CRM *layer* whose
  claim scope is defined in §8).
- An advertising platform or a media buying tool (see §3.7).
- Certified, compliant, GDPR-compliant, or legally guaranteed in any respect (see §18).

---

## 3. Lead Acquisition

### 3.1 Capability status

| ID | Capability | Category | Evidence basis |
|---|---|---|---|
| A1 | Google Lead Forms intake | **2** | Owner brief only. No website code, no integration record. |
| A2 | Meta Lead Ads intake | **2** | Owner brief only. |
| A3 | Click-to-WhatsApp attribution | **2** | Owner brief only. Depends on Meta ad configuration owned by the agency. |
| A4 | Web lead intake | **2 / 6** | Product side: owner brief. **Website side: Category 6** — the site has zero forms and zero API routes (`CURRENT_SITE_AUDIT.md` §8). |
| A5 | Social opportunities as a lead source | **2** | Owner brief; overlaps §5. |
| A6 | Campaign and source attribution | **2** | Owner brief. Indirectly consistent with an inactive cross-channel automation component noted 2026-05-20. |
| A7 | **Automatic advertising budget optimization** | **Excluded** | **Explicitly excluded by the owner.** Not a capability. Must never appear. |

### 3.2 What the agency experiences

Leads arriving from paid and organic sources land in one place, each carrying the campaign and
source it came from, rather than being scattered across platform inboxes and notification emails.

### 3.3 What the customer experiences

Nothing directly. The customer fills in an ad form, clicks a WhatsApp button, or submits a web
form and receives a reply (§4). Acquisition is invisible to them.

### 3.4 What may safely be claimed

That NuovaSolution can **receive and attribute** leads from Google Lead Forms, Meta Lead Ads,
click-to-WhatsApp and web forms, **subject to the agency connecting its own ad and web accounts.**
Attribution may be described as "which campaign and source a lead came from".

### 3.5 Required qualification

Every acquisition claim carries a connection qualifier: *"once your ad accounts and web forms are
connected"* or *"based on agency permissions and configuration"*. Lead ad intake requires the
agency's own advertising accounts, its own page and ad permissions, and platform approval that
NuovaSolution does not control.

### 3.6 What may not be claimed

- That NuovaSolution **runs, manages, creates or optimises** advertising campaigns.
- **Any** statement about ad spend, cost per lead, ROAS, ROI, lead volume, conversion rate or
  market share. Absolutely forbidden under R6, with no exception and no illustrative version.
- That attribution is complete or exact. Click-to-WhatsApp attribution in particular is
  probabilistic on the platform side and must not be presented as certain.
- That leads are "generated". The product **receives and processes** leads; the agency's ads
  generate them.

### 3.7 Required labelling

Where paid acquisition is presented as a package feature, it must be labelled as an entitlement
(§17), not as a service NuovaSolution performs on the agency's behalf.

### 3.8 What confirmation is missing

1. Which of A1–A6 are actually running for a real agency today, and since when.
2. Whether ad account connection is self-service or performed by NuovaSolution during onboarding.
3. Whether Meta/Google app review or a Business verification is required, and whether it is held.
4. Whether "Paid Acquisition" as a package entitlement means *intake and attribution* or something
   more. The brief lists it as an entitlement without defining it. **Owner decision required.**

---

## 4. AI Customer Communication

### 4.1 Capability status

| ID | Capability | Category | Evidence basis |
|---|---|---|---|
| B1 | WhatsApp conversations | **2** | Owner brief; indirectly consistent with active messaging components noted 2026-05-20. **No WhatsApp number exists on the website** (C-05). |
| B2 | Email conversations | **2** | Owner brief; indirectly consistent with active inbox/reply components noted 2026-05-20. |
| B3 | Web conversations | **2 / 6** | Product side: owner brief. **Website side: Category 6** — no chat backend (`INTEGRATION_CONTRACT.md` §7). |
| B4 | Voice conversations | see §9 | Contradictory evidence — see §9.1. |
| B5 | Automatic responses | **2** | Owner brief. This is the oldest and most consistently asserted capability across all sources. |
| B6 | Multilingual conversations | **2** | Owner brief. The website's own demo engine handles EN/ES/DE, which shows domain intent but is not product evidence. |
| B7 | Contextual memory across channels and time | **2** | Owner brief; `/v2` draft marks it `live` (author intent only). |
| B8 | Images received and understood | **2 + 4** | Owner brief. Storage is legally unconfirmed (§18). |
| B9 | PDFs and documents received and understood | **2 + 4** | Owner brief. Storage is legally unconfirmed (§18). |
| B10 | Voice notes understood | **2 + 4** | Owner brief; `/v2` draft marks it `live`. Audio storage is legally unconfirmed (§18). |
| B11 | Human handoff | **2** | Owner brief; `/v2` draft marks it `live`. |
| B12 | Governed customer handling | **2 / 3** | Owner brief. Governance rules are agency-configured. |

### 4.2 What the agency experiences

Inbound messages across the connected channels are answered without an agent present. The agency
sees the conversation, not a queue of unanswered notifications. Where a conversation needs a human,
it is handed over with its history rather than restarted.

### 4.3 What the customer experiences

A reply that arrives quickly, in their own language, that refers correctly to what they said
earlier and to what they sent — including images, documents and voice notes. When a human takes
over, the customer is not asked to repeat themselves.

### 4.4 What may safely be claimed

- Instant automatic replies on connected channels.
- Conversations in the customer's language.
- Continuity: the system does not lose the thread between messages, channels or days.
- That images, documents and voice notes can be received and understood as part of a conversation.
- That a conversation can be handed to a person, with the history intact.

### 4.5 Required qualification

- **Channel availability:** *"Availability depends on channel configuration."* Not every channel is
  active for every agency.
- **Response speed:** speed may be described qualitatively ("in seconds", "instantly"). **A specific
  number of seconds may not be published** unless the owner supplies a measured, defensible figure.
  The current site's *"Replied in < 1 second"* and the `/v2` draft's *"Replied in 4 seconds"* are
  both unverified and contradict each other — neither may be carried over.
- **Files and audio:** every claim about images, documents or voice notes carries
  *"subject to applicable communication and data-protection rules"* until §18 is closed.
- **Governed handling:** *"with configurable customer handling and human oversight."*

### 4.6 What may not be claimed

- That the system never makes a mistake, always understands, or handles every case.
- That it replies "always within X seconds" as a commitment or SLA.
- That conversations are private, secure, encrypted, GDPR-compliant or legally safe (§18).
- That WhatsApp is available **on the website** — no number exists (C-05, §19).
- That the assistant on the website is the product (§19, §17.7).

### 4.7 Required labelling

Any on-site conversation surface that is not connected to the product backend must be labelled as
a simulation or rendered in an honest pending state. See §16 and §19.

### 4.8 What confirmation is missing

1. Which channels are live for which agencies today.
2. Whether WhatsApp runs on the WhatsApp Business Platform (Cloud API) or otherwise — this
   determines what may be said about templates, 24-hour windows and opt-in.
3. Which languages are actually supported, and whether the list is fixed or open.
4. Whether images, documents and audio are stored, where, and for how long (§18).
5. What "governed customer handling" concretely means: which rules, set by whom, changeable how.
6. A defensible response-time figure, if any is to be published.

---

## 5. Social Growth

### 5.1 Capability status

| ID | Capability | Category | Evidence basis |
|---|---|---|---|
| C1 | Property and social content creation | **2** | Owner brief only. |
| C2 | Scheduled posting **where permitted** | **2 + 4** | Owner brief. Bounded by platform policy and account permissions. |
| C3 | Comment handling | **2 + 4** | Owner brief. Platform-policy bounded. |
| C4 | Comment → private conversation | **2 + 4** | Owner brief. Platform-policy bounded. |
| C5 | Private conversation → WhatsApp | **2 + 4** | Owner brief. Requires customer action and consent. |
| C6 | Lead capture from social engagement | **2 + 4** | Owner brief. Consent-dependent (§18). |
| C7 | Brand and language consistency | **2 / 3** | Owner brief. Depends on agency branding configuration (§13). |
| C8 | Controlled anti-spam behaviour | **2** | Owner brief. This is a *restraint*, and should be presented as one. |
| C9 | **Facebook Group automation** | **Excluded** | **Explicitly excluded by the owner.** Must never appear. |

### 5.2 What the agency experiences

Social presence is maintained without an agent writing every post and watching every comment.
Engagement that shows real interest becomes a conversation and then a lead in the same place as
every other lead, instead of being lost in a notifications tab.

### 5.3 What the customer experiences

A comment gets a reply. If they are genuinely interested, the conversation moves to a private
channel and, if they choose, onward to WhatsApp — as a continuation, not a restart.

### 5.4 What may safely be claimed

- Content creation support for property and social posts.
- Scheduled publishing **where the platform and the agency's permissions allow it**.
- Comment handling that can move a genuine enquiry into a private conversation.
- That social engagement can become a tracked lead.
- That behaviour is deliberately restrained and anti-spam by design.

### 5.5 Required qualification

Every social claim carries **both** a permission qualifier and a platform qualifier:
*"where permitted"*, *"based on agency permissions and configuration"*, *"subject to platform
rules"*. Social platform policy changes outside NuovaSolution's control, and a capability that is
permitted today may not be tomorrow.

### 5.6 What may not be claimed

- **Facebook Group automation, in any wording.** Excluded by the owner.
- Mass messaging, bulk outreach, cold DMs, automated follow requests, engagement farming, or
  anything that reads as growth-hacking. This contradicts C8 and creates platform-ban exposure.
- Guaranteed reach, followers, engagement or social lead volume. No numbers of any kind.
- That posting is fully autonomous with no human review, unless the owner confirms it.

### 5.7 Required labelling

Social Growth is a **higher-package entitlement** (§17) and must be labelled as such wherever it
appears, so no visitor believes it is included in the entry package.

### 5.8 What confirmation is missing

1. Which platforms: Instagram, Facebook, both, others.
2. Whether posting is fully automatic or requires agency approval before publishing.
3. Whether the required platform app permissions are held, and under which account.
4. Whether comment-to-DM automation is currently within each platform's policy.
5. Whether social-sourced contacts have a lawful basis for later messaging (§18).
6. Whether content creation produces text only, or images/video as well.

---

## 6. Lead Intelligence

### 6.1 Capability status

| ID | Capability | Category | Evidence basis |
|---|---|---|---|
| D1 | Canonical customer identity across channels | **2** | Owner brief; an inactive cross-channel component was noted 2026-05-20 — indirect and **inactive**, which weakens rather than supports the claim. |
| D2 | Qualification | **2** | Owner brief. The most consistently asserted capability across every source. |
| D3 | Hot lead score | **2** | Owner brief. The website's demo engine implements a *simulated* 8–100 score with fixed weights — **not the product's scoring**. |
| D4 | Prioritization | **2** | Owner brief. |
| D5 | Customer preferences | **2** | Owner brief. |
| D6 | Memory | **2** | Owner brief. |
| D7 | Follow-up state | **2** | Owner brief. |

### 6.2 What the agency experiences

Each contact is one record rather than four disconnected threads. That record carries what the
person wants, how serious they appear, what has already been sent, and what is due next — so an
agent can decide who to work on without reading every message.

### 6.3 What the customer experiences

They are treated as one person. Writing on WhatsApp after having emailed does not reset the
conversation, and they are not asked the same qualifying questions twice.

### 6.4 What may safely be claimed

- One customer identity across channels.
- Automatic qualification and a lead score that indicates how ready a lead appears.
- Prioritisation so agents work the most promising leads first.
- Retained preferences and follow-up state.

### 6.5 Required qualification

- Scoring must be described as an **indication or a priority signal**, never as an accurate
  prediction, a probability, or a measure of deal likelihood.
- The **numeric scale must not be published** unless the owner confirms the product's real scale.
  The current site publishes *"Each lead is scored from 1 to 100"* and *"Leads above 80 are marked
  as priority"*. These come from the website's simulation and are **not verified product facts**.
  They may not be carried into the redesign without owner confirmation.
- Identity resolution should be described as best-effort matching, not as guaranteed.

### 6.6 What may not be claimed

- Any accuracy figure ("95% accurate", "correctly identifies X% of buyers"). Forbidden.
- That the score predicts revenue, closings, or conversion.
- That no lead is ever misclassified.
- That identity resolution is perfect across channels.

### 6.7 Required labelling

Scoring is **automated profiling of a natural person**. Under GDPR this carries transparency
obligations and, where it materially affects the person, further duties. Any public description of
scoring must be reviewed against §18 before publication. This is a legal, not a copy, decision.

### 6.8 What confirmation is missing

1. The product's real score scale, thresholds and labels.
2. What identity resolution actually keys on (phone, email, both, fuzzy matching).
3. Whether scoring logic is disclosed to the agency, and whether an agency can adjust it.
4. Whether the data subject is informed that automated scoring takes place (§18).

---

## 7. Follow-up

### 7.1 Capability status

| ID | Capability | Category | Evidence basis |
|---|---|---|---|
| E1 | Basic follow-up | **2** | Owner brief; an inactive follow-up component was noted 2026-05-20. Included in all paid packages (§17). |
| E2 | Advanced follow-up and automation | **2** | Owner brief. Higher-package entitlement. |
| E3 | Nurturing | **2 + 4** | Owner brief. Timing and lawful basis unconfirmed (§18). |
| E4 | **Reactivation of older contacts** | **4** | Owner brief; `/v2` draft marks a 5-day, cross-channel reactivation as `live` (author intent only). **This is the single highest-risk capability on the site.** |

### 7.2 What the agency experiences

A lead that goes quiet is not forgotten. Follow-up continues on a defined cadence without an agent
remembering to do it, and the follow-up state is visible on the record.

### 7.3 What the customer experiences

A further message after a period of silence — potentially on a different channel from the one they
originally used.

### 7.4 What may safely be claimed

- That follow-up continues automatically when a lead does not reply, **within the agency's
  configured rules and applicable communication rules**.
- That follow-up state is tracked and visible.

### 7.5 Required qualification

Mandatory on **every** follow-up claim, with no exception:
*"subject to applicable communication rules and the agency's own permissions."*

**E4 (reactivation) additionally requires legal sign-off before it appears publicly at all.**
Re-contacting a dormant contact — especially by switching to a channel the person did not choose —
engages GDPR lawful basis, ePrivacy/LSSI-CE rules on unsolicited commercial communication, and
WhatsApp Business Platform policy simultaneously. The `/v2` draft's framing (*"she goes quiet …
on the fifth, the system tries once more, a different channel"*) is exactly the pattern that
requires confirmation, and it must not ship as written.

### 7.6 What may not be claimed

- That the system contacts people "until they reply", "never gives up", or "keeps trying".
  Persistence framing is a compliance liability and a brand liability. The `/v2` draft line
  *"It never sleeps. It never forgets. It never gives up."* — the third clause is rejected.
- That old or cold contacts are automatically reactivated, until legal confirmation exists.
- Any recovery-rate, revival-rate or re-engagement statistic.
- That channel switching is unrestricted.

### 7.7 Required labelling

If reactivation is shown at all, it must be shown as **agency-controlled and rule-bound**, not as
autonomous system persistence.

### 7.8 What confirmation is missing — *legal, blocking*

1. The lawful basis for follow-up messages after the initial enquiry response.
2. The lawful basis and time limit for reactivating older contacts.
3. Whether channel switching (email → WhatsApp, or the reverse) is permitted for a given contact.
4. Whether WhatsApp template-message and 24-hour-window rules are respected in follow-up.
5. Maximum follow-up count and interval that the owner is willing to state publicly.

---

## 8. Property Matching

### 8.1 Capability status

| ID | Capability | Category | Evidence basis |
|---|---|---|---|
| F1 | Understands customer requirements | **2** | Owner brief. |
| F2 | Uses verified or agency-authorised inventory | **2 + 3** | Owner brief. Depends entirely on the agency connecting a feed or inventory. |
| F3 | Customer-facing focused matches | **2** | Owner brief; `/v2` draft marks it `live` (author intent only). |
| F4 | Internal extended options for agents | **2** | Owner brief. |
| F5 | Property discussion in voice conversations | see §9 | Inherits the voice status. |

### 8.2 What the agency experiences

A lead's stated requirements are matched against the agency's own authorised inventory. The
customer receives a short, relevant selection; the agent can see a wider set internally.

### 8.3 What the customer experiences

A small number of properties that actually fit what they asked for, rather than a list dump or a
generic brochure.

### 8.4 What may safely be claimed

- That customer requirements are understood and matched against the agency's own properties.
- That the customer receives a focused selection and the agent sees more options internally.
- That matching uses **verified or agency-authorised sources**.

### 8.5 Required qualification

- *"Uses your own or agency-authorised property sources."* This is a **trust asset** and should be
  stated positively: the product does not invent or scrape listings.
- *"Availability depends on how your inventory is connected."*

### 8.6 What may not be claimed

- **Named third-party portal integrations.** The `/v2` draft names *Idealista, Fotocasa, HubSpot,
  Salesforce, Pipedrive, Zoho*, and the live site's `always.crm` key states *"Always synced to your
  CRM"*. **No integration with any of these is evidenced anywhere.** Under R6/R7 these are invented
  integrations and are **rejected outright** until the owner confirms each one individually.
- That matching accesses the whole market, all listings, or every portal.
- Any match-quality or match-accuracy statistic.
- That matches are recommendations, valuations or advice.

### 8.7 Required labelling

Any property shown in website media is **illustrative** and must be labelled as such unless it is
a real, licensed, permissioned listing. The `/v2` draft already contains a placeholder note to this
effect — that discipline must be carried forward.

### 8.8 What confirmation is missing

1. How inventory reaches the product: feed, portal, CRM export, manual, or several.
2. Which — if any — named portal or CRM integrations genuinely exist. Each needs individual
   confirmation before it may be named or logo-displayed.
3. What "verified" means operationally, since the word carries weight.
4. Whether the customer-facing match count is fixed (the `/v2` draft says three) or variable.

---

## 9. Voice AI

### 9.1 The contradiction — resolve before any voice copy is written

This is the clearest evidence conflict in the project.

| Source | Says |
|---|---|
| Owner's redesign brief (2026-08-30) | Voice AI answers calls, speaks naturally, qualifies, discusses properties, is multilingual, does callbacks, hands off to humans, and books appointments "when correctly configured". |
| `lib/os/copy.ts`, `/v2` draft | Voice stage explicitly flagged **`status: "soon"`**, with copy: *"Today it tells your agent. Soon it picks up the phone itself."* |
| `INTEGRATION_CONTRACT.md` W-05 | Asks the workflow project to *confirm whether voice AI has a real, callable public entry point*. Unanswered. |
| Local component inventory (2026-05-20) | Contains one **inactive** telephony-vendor test component. No active voice component. |
| Website codebase | No voice code, no telephony SDK, no vendor dependency. |

**Three of five sources indicate voice is not live. One source (the brief) states it is a
capability. The brief is newer, which is why this is a conflict and not a conclusion.**

### 9.2 Capability status

| ID | Capability | Category | Note |
|---|---|---|---|
| H1 | Answers calls | **2 or 7 — unresolved** | Owner must resolve §9.1 |
| H2 | Speaks naturally | **2 or 7 — unresolved** | Inherits H1 |
| H3 | Qualifies leads by phone | **2 or 7 — unresolved** | Inherits H1 |
| H4 | Discusses properties by phone | **2 or 7 — unresolved** | Inherits H1 + §8 |
| H5 | Multilingual voice | **2 or 7 — unresolved** | Inherits H1 |
| H6 | Callbacks | **2 or 7 — unresolved** | Inherits H1 |
| H7 | Human handoff from a call | **2 or 7 — unresolved** | Inherits H1 |
| H8 | Books appointments | **2 or 7 + 3** | Owner's own wording is conditional: *"when correctly configured"* |

**Interim ruling: voice is treated as Category 7 (future capability) on the public website until
the owner resolves §9.1 in writing.** This is the only safe default: shipping "soon" for a live
capability costs an opportunity; shipping "live" for a future capability is a P0 false claim.

### 9.3 What the agency experiences (if confirmed)

Inbound calls are answered when no one picks up. The caller is qualified, and the outcome lands on
the same customer record as every other channel.

### 9.4 What the customer experiences (if confirmed)

A call that is answered rather than ringing out, in their own language, with a person available if
they ask for one.

### 9.5 What may safely be claimed — under the interim ruling

Only that voice is a **planned capability**, in a visually separated future section, with wording
that cannot be mistaken for present availability.

### 9.6 Required qualification (once confirmed)

- *"when correctly configured"* — the owner's own qualifier, carried verbatim.
- Appointment booking requires calendar configuration and must not be claimed unconditionally.
- Availability depends on telephony configuration and number provisioning.

### 9.7 What may not be claimed

- That the AI is indistinguishable from a human, or that callers cannot tell. Beyond being
  unverifiable, several jurisdictions require AI disclosure in voice interactions, and the EU AI
  Act transparency obligations point the same way.
- Any call-handling, answer-rate or qualification statistic.
- That calls are recorded, transcribed or stored — **until §18 is closed**. Call recording in Spain
  requires notification and a lawful basis, and is a distinct legal question from messaging.
- A phone number. None exists in the project (R7).

### 9.8 Required labelling

If voice appears at all before confirmation, it must be labelled as a future capability, in its own
clearly separated section, never mixed into a live feature list.

### 9.9 What confirmation is missing — *blocking*

1. **Is voice live today? Yes or no.** Everything else depends on this.
2. If live: for which agencies, in which languages, since when.
3. Is there a callable number the website may reference (R7 forbids inventing one)?
4. Are calls recorded or transcribed, and is the caller informed?
5. Is AI disclosure given at the start of a call?
6. Does appointment booking write to a real calendar?

---

## 10. Universal CRM

### 10.1 Capability status

| ID | Capability | Category | Evidence basis |
|---|---|---|---|
| G1 | Customer history | **2** | Owner brief; an inactive CRM-adapter component was noted 2026-05-20 — **inactive**. |
| G2 | Messages and channels | **2** | Owner brief. |
| G3 | Source attribution | **2** | Owner brief; see §3. |
| G4 | Qualification | **2** | See §6. |
| G5 | Lead score | **2** | See §6. |
| G6 | Preferences | **2** | See §6. |
| G7 | Attachments and provenance | **2 + 4** | Owner brief. Storage legally unconfirmed (§18). |
| G8 | Handoffs | **2** | Owner brief. |
| G9 | Appointments | **2 + 3** | Owner brief. Requires calendar configuration. |
| G10 | Matching | **2** | See §8. |
| G11 | Central agency view | **2** | Owner brief. |

### 10.2 What the agency experiences

One place holding the whole relationship: every message across every channel, where the lead came
from, how it was qualified and scored, what the customer wants, what they sent and where it came
from, who took over and when, what is booked, and which properties matched.

### 10.3 What the customer experiences

Nothing directly — but they experience its effect: no repetition, no lost context, no contradiction
between two agents.

### 10.4 What may safely be claimed

That NuovaSolution keeps the complete customer relationship in one place, across channels, with
history, attribution, qualification, preferences, attachments, handoffs, appointments and matches
visible to the agency.

### 10.5 Required qualification

- The word **"Universal"** describes *coverage of channels within NuovaSolution*, not universal
  compatibility with external CRMs. This distinction must be enforced in copy, because "Universal
  CRM" invites the wrong reading.
- Appointments require calendar configuration.

### 10.6 What may not be claimed

- **That it syncs with, integrates with, or replaces any named CRM.** The live site's *"Always
  synced to your CRM"* and the `/v2` draft's named CRM list are **rejected** — see §8.6. This is
  the most likely place for an invented-integration violation to reappear, because the phrase is
  already written in the current codebase and will be tempting to reuse.
- That it is a full CRM replacement, unless the owner confirms that positioning.
- Any storage, uptime, retention or security guarantee (§18).

### 10.7 Required labelling

If any external CRM is ever named, it requires individual owner confirmation plus, for logo use,
trademark permission. Logos of companies NuovaSolution does not integrate with are a
`MASTER_GOVERNANCE.md` R6 violation ("fictional … logos") and a legal exposure.

### 10.8 What confirmation is missing

1. Is the CRM a real agency-facing application with a login? This determines the **Log in** CTA
   (§19.6) and much of the site architecture.
2. Does any external CRM integration exist?
3. Where is customer data stored, in which region, for how long (§18)?
4. Can an agency export or delete its data?

---

## 11. Daily Goals and Internal AI Assistant

### 11.1 Capability status

| ID | Capability | Category | Evidence basis |
|---|---|---|---|
| I1 | "Who should I call today?" | **2** | Owner brief only. |
| I2 | "Prepare me for my next viewing." | **2** | Owner brief only. |
| I3 | "Message Pablo." | **2 + 4** | Owner brief. Sending on the agent's behalf raises consent and attribution questions. |
| I4 | "Email my colleague." | **2** | Owner brief only. |
| I5 | "Which buyers match this villa?" | **2** | Owner brief; depends on §8. |
| I6 | "Why is this lead a priority?" | **2** | Owner brief; depends on §6. Valuable as an *explainability* claim. |
| I7 | "How is my team doing?" | **2** | Owner brief; depends on §12. |
| I8 | Desktop, mobile and speech interaction | **2** | Owner brief only. |

**Note:** this is the strongest differentiator in the entire brief — it is what separates an
"operating system" from a "lead tool". It is also **entirely unevidenced**. That combination makes
it the highest-value / highest-risk section on the site.

### 11.2 What the agency experiences

An agent asks the system, in plain language, what to do next — and gets an answer grounded in the
agency's own data, plus the ability to act on it directly.

### 11.3 What the customer experiences

Nothing directly. They experience better-prepared agents.

### 11.4 What may safely be claimed

That agents can ask the system in plain language about their own leads, viewings, priorities and
team, and act on the answer — **once confirmed**, and with the entitlement qualifier (§17).

### 11.5 Required qualification

- Higher-package entitlement. Must be labelled as such.
- Speech interaction requires device permissions and is a browser capability, not a product
  guarantee.
- Actions taken on the agent's behalf (I3, I4) must be described as requiring the agent's
  confirmation, unless the owner confirms otherwise.

### 11.6 What may not be claimed

- That the assistant is autonomous, decides for the agency, or acts unsupervised.
- Any time-saved, productivity or performance figure.
- I7 ("How is my team doing?") must not be presented as employee monitoring or performance scoring.
  In Spain, systematic employee monitoring engages works-council information duties and data
  protection obligations. **This needs legal review before it is described publicly.**

### 11.7 Required labelling

Every example question shown on the site is **illustrative**, and must be marked so — it shows the
kind of question, not a guaranteed supported command set.

### 11.8 What confirmation is missing

1. Does the assistant exist today, in any form?
2. Is it text only, or genuinely speech-capable?
3. Which of I1–I7 actually work, and which are aspirational? A partial list published as a complete
   one is a false claim.
4. Can it send messages and emails on the agent's behalf, and with what confirmation step?
5. Legal position on I7 (team performance visibility).

---

## 12. Reporting

### 12.1 Capability status

All of the following are **Category 2** — owner brief only, no evidence in this repository:

Lead sources · response time · qualification · hot leads · appointments · supported conversions ·
property matching · team workload · daily goals · voice (inherits §9) · acquisition attribution ·
property experience usage (inherits §14).

Basic reporting is included in all paid packages; advanced reporting is a higher-package
entitlement (§17).

### 12.2 What the agency experiences

The agency sees what happened: where leads came from, how fast they were answered, how they
qualified, what was booked, what matched, and how work is distributed across the team.

### 12.3 What the customer experiences

Nothing.

### 12.4 What may safely be claimed

That the agency can see its own operational figures across the areas listed in §12.1.

### 12.5 Required qualification

- **"Supported conversions"** is the owner's own careful wording and must be preserved exactly.
  It means conversions the system contributed to. It does **not** mean conversions the system
  caused, and it must never be shortened to "conversions" in copy.
- Reporting covers only what NuovaSolution itself handled.
- Voice and property-experience reporting depend on those capabilities existing.

### 12.6 What may not be claimed

**Absolutely forbidden, with no illustrative or example version:**

- Ad spend, cost per lead, ROAS, ROI, revenue, commission, deal value, closing rate, or any
  financial outcome figure.
- Any example dashboard containing invented numbers presented as real or typical.
- Benchmarks, industry averages, or comparisons to "the average agency".
- Attribution language implying NuovaSolution caused a sale.

Under R6, a dashboard screenshot with plausible-looking invented figures is a **P0 violation**,
even if no visitor would take it literally. Every number in every visual must be either real and
sourced, or unmistakably marked as illustrative sample data.

### 12.7 Required labelling

Every reporting visual carries a visible **"Illustrative"** / **"Ejemplo"** marker. No exceptions,
including hero imagery, product screenshots and OG images.

### 12.8 What confirmation is missing

1. Does a reporting surface exist today?
2. Which metrics are real and computed, versus planned?
3. Is a real, non-invented screenshot available for the website?
4. What separates basic from advanced reporting (§17)?

---

## 13. Interactive Property Experience

### 13.1 Capability status

| ID | Capability | Category | Evidence basis |
|---|---|---|---|
| K1 | One panorama per room as standard | **2 + 3** | Owner brief. Requires the agency to supply panoramas. |
| K2 | Floor and ceiling included | **2** | Owner brief — a technical quality statement. |
| K3 | Real door navigation | **2** | Owner brief. |
| K4 | Room names | **2 + 3** | Agency-supplied. |
| K5 | Square metres **from a verified source** | **2 + 3 + 4** | Owner brief. **Legally sensitive — see §13.6.** |
| K6 | Real floor plan | **2 + 3** | Agency-supplied. |
| K7 | Current room indicator | **2** | Owner brief. |
| K8 | View direction indicator | **2** | Owner brief. |
| K9 | Multiple floors | **2** | Owner brief. |
| K10 | Stair transitions | **2** | Owner brief. |
| K11 | **No joystick, no free movement** | **Constraint** | A deliberate product boundary, not a limitation to hide. |
| K12 | Customer actions **only when genuinely configured** | **3** | Owner's own conditional wording. |

### 13.2 What the agency experiences

Properties can be presented as a navigable experience built from real panoramas, a real floor plan
and verified measurements, instead of a photo carousel. Capacity is a package entitlement (§17).

### 13.3 What the customer experiences

They move through the property room by room through real doorways, always knowing which room they
are in and which way they are facing, with the real layout and real room sizes available. They
cannot wander freely — movement is deliberately structured.

### 13.4 What may safely be claimed

- A panorama-based, room-by-room property experience with real door navigation.
- Full vertical coverage (floor and ceiling).
- Named rooms, real floor plan, current-room and view-direction orientation.
- Multiple floors with stair transitions.
- Structured navigation **by design** — this should be stated as an intentional choice, since it is
  what distinguishes it from a disorienting free-roam viewer.

### 13.5 Required qualification

- Requires the agency to supply panoramas, floor plans and verified measurements.
- Capacity depends on the package.
- Customer actions appear **only when the agency has configured them** (owner's own wording).

### 13.6 What may not be claimed — square metres

**K5 is the sharpest legal exposure in this section.** Published property measurements in Spain
carry consumer-protection consequences, and Andalusian regional consumer-information rules on
property marketing require accurate information to be available to buyers. Therefore:

- Square metres may be described as **"from a verified source"** *only* if the product genuinely
  enforces sourcing — i.e. an agency cannot type an arbitrary number.
- The website may **never** state or imply that NuovaSolution verifies, certifies or guarantees the
  accuracy of any measurement. NuovaSolution displays what the source provides.
- The word "verified" must be defined on the page, or replaced with the precise mechanism
  (for example "taken from the agency's official documentation").

**If the product does not actually enforce a verified source, K5 must be dropped from public copy
entirely.** This requires an owner answer.

### 13.7 Further forbidden claims

- "Virtual tour", "3D tour", "walkthrough" or "metaverse" framing that implies free movement —
  it contradicts K11 and oversells the experience.
- That it replaces a physical viewing.
- Any statistic about viewings saved, engagement or conversion uplift.
- Named third-party capture hardware or services, unless confirmed.

### 13.8 Required labelling

Any property shown in a website demo of this capability must be a real property used with
permission, or clearly marked as illustrative.

### 13.9 What confirmation is missing

1. Does the Property Experience exist and run today? Is there a real example that may be shown
   publicly, with the owner's permission?
2. Who produces the panoramas — the agency, NuovaSolution, or a third party?
3. Is the "verified source" for square metres technically enforced (§13.6)?
4. What are the per-package capacity limits (§17)? Numbers may not be invented.
5. What are "customer actions" concretely, and what does configuring them require?

---

## 14. Agency Branding

### 14.1 Capability status

| ID | Capability | Category |
|---|---|---|
| L1 | Agency logo | **3** — configuration-dependent by nature |
| L2 | Email banner | **3** |
| L3 | Signatures | **3** |
| L4 | Brand identity | **3** |
| L5 | Personalised communication | **3** |
| L6 | Tenant-specific configuration | **2 + 3** |

### 14.2 What the agency experiences

Communication goes out under the agency's own brand. The agency configures it once during
onboarding.

### 14.3 What the customer experiences

They hear from the agency they contacted — not from NuovaSolution. **This is important and should
be stated plainly**: the product is invisible to the end customer.

### 14.4 What may safely be claimed

That every outbound communication carries the agency's own branding, and that each agency's
configuration is separate.

### 14.5 Required qualification

Branding is configured by the agency during onboarding.

### 14.6 What may not be claimed

- White-label, reseller or agency-partner programme terms — none are confirmed.
- Data-isolation, tenancy-security or "your data is separate" **security** guarantees. Tenant
  separation is a functional statement here, not a security assurance (§18).

### 14.7 Required labelling

None beyond the standard illustrative marker on any branded mockup.

### 14.8 What confirmation is missing

1. Is branding self-service or set up by NuovaSolution?
2. Does customer-facing communication ever show NuovaSolution's name?
3. Custom domain / sending-domain support?

---

## 15. Self-Service Onboarding

### 15.1 Capability status

| ID | Capability | Category | Evidence basis |
|---|---|---|---|
| M1 | Agency setup | **2** | Owner brief only. |
| M2 | Employees and roles | **2** | Owner brief only. |
| M3 | Channels | **2 + 3** | Owner brief; each channel needs its own permissions. |
| M4 | Branding | **2** | See §14. |
| M5 | Property experience setup | **2** | See §13. |
| M6 | Lead connections | **2 + 3** | See §3. |
| M7 | Package entitlements | **2** | See §17. |
| M8 | **Self-service without developers** | **2** | Owner brief only — and it is a strong claim. |

### 15.2 What the agency experiences

The agency sets itself up: company details, staff and roles, channels, branding, property
experience, lead sources — without needing a developer.

### 15.3 What the customer experiences

Nothing.

### 15.4 What may safely be claimed

That setup is self-service and does not require technical staff — **once confirmed**.

### 15.5 Required qualification

- Connecting channels and ad accounts still requires the agency to hold and grant the relevant
  platform permissions, which is not something NuovaSolution controls.
- **No setup-time claim** ("live in a day", "up and running in 15 minutes") without a real,
  measured figure. The current site's *"It takes 15 minutes. No setup needed."* refers to the demo
  call, not to onboarding — that ambiguity must not be carried into the redesign.
- *"No setup needed"* as currently published is **not accurate** for a platform requiring channel
  connection, branding and inventory configuration. It must be replaced.

### 15.6 What may not be claimed

- That no configuration is needed at all.
- That every channel connects with one click.
- Any onboarding-duration figure without measurement.
- Migration or data-import capability, unless confirmed.

### 15.7 Required labelling

If onboarding is shown as a flow, every screen is illustrative unless it is a real screenshot.

### 15.8 What confirmation is missing

1. Does a self-service onboarding flow exist, or is onboarding currently human-led?
2. Where does it live — inside the product app, or on the website? This determines whether the
   redesign builds an onboarding page or only a description of onboarding.
3. Which steps genuinely require no developer.
4. What roles exist (M2).

---

## 16. The public demo and simulation

### 16.1 Findings on the existing `/live-demo`

Verified by reading the code, not inferred:

| Finding | Evidence |
|---|---|
| The demo contains **no AI**. It is deterministic keyword, regex and weighted-score logic. | `demo-engine.ts`, 590 lines: keyword arrays for language, seller/rental/investor detection; regex for budget, bedrooms, timeline; a fixed additive score (base 18; budget +26, location +16, timeline +20, viewing +18 …) with thresholds ≥75 hot, ≥45 warm. |
| It makes **no network call**. Nothing is sent, stored or processed anywhere. | No fetch/XHR in the demo path; the audit confirms zero backend calls site-wide. |
| It is presented to the public as the working product. | Page metadata: *"…qualifies, scores, and responds to real estate inquiries **in real time**"*. UI labels: **"Live Demo"**, **"AI Analysis"**, **"CRM Updated"**, *"Try a real example"*. |
| It contains **no simulation disclosure whatsoever**, in either language. | Searched for simulation/demo-mode/illustrative disclosure text — none present. |
| Its published scoring scale is a **website invention**, and the homepage states it as a product fact. | `translations/en.ts`: *"Each lead is scored from 1 to 100"*, *"Leads above 80 are marked as priority instantly"* — these mirror the simulation's own thresholds. |

**Assessment: this is a live, unqualified false-claim exposure on the production website today.**
Under R3/R6 it is a **P0** finding. It is recorded here as fact; remediation is the owner's and the
implementation instance's decision, not this document's.

### 16.2 Ruling for the redesign

Any on-site experience that does not call the real product is **Category 5 — controlled
simulation**, and:

1. Must be labelled as a simulation **before** the visitor interacts with it, in EN and ES.
2. Must never use the words "live", "real time", "AI analysis" or "CRM updated" unless each is
   literally true of what is running.
3. Must not publish scoring scales, thresholds or timings that come from the simulation rather than
   the product.
4. May keep the domain logic as a demonstration of *what the product does*, provided the framing is
   honest about *how the demonstration works*.

The approved disclosure wording is defined in `CLAIMS_MATRIX.md`. It is **not** invented here and
must be confirmed by the owner in both languages.

---

## 17. Packages and entitlements

### 17.1 Confirmed package structure

Three internal package IDs, confirmed by the owner: **`essential`**, **`growth`**, **`scale`**.

**Public names are not confirmed.** The internal IDs may not be assumed to be the marketing names.
Owner decision required before any pricing page is written.

### 17.2 Baseline — included in all paid packages

Confirmed by the owner as the minimum for every paid package:

| Capability | Truth reference |
|---|---|
| CRM | §10 |
| Lead Engine | §3, §6 |
| Automatic Replies | §4 |
| Basic Follow-up | §7 (E1) |
| Property Matching | §8 |
| Core / Basic Reporting | §12 |

> The owner's two briefs use **"Core Reporting"** and **"Basic Reporting"** for this line. They are
> assumed to be the same thing; **the public name needs an owner decision.**

### 17.3 Higher-package capabilities — *may* be included, only if confirmed

The owner's wording is conditional throughout: higher packages **can** include these **only if
confirmed**. Nothing below may be placed in a package on the website without an explicit owner
mapping.

| Capability | Truth reference | Additional blocker |
|---|---|---|
| Voice | §9 | **Unresolved live/future conflict** (§9.1) |
| Daily Conversational Assistant | §11 | Unevidenced |
| Social Growth | §5 | Platform-policy bounded |
| Advanced Follow-up and Automation | §7 | Legal confirmation (§18) |
| Advanced Reporting | §12 | Basic/advanced split undefined |
| Property Experience | §13 | Quota numbers unknown |
| Paid Acquisition | §3 | Definition undefined (§3.8) |

### 17.4 Scale

The owner states that `scale` **may** include confirmed higher limits, a higher Property Experience
quota, and greater agency capacity.

**No number exists for any limit or quota.** None may be invented, estimated, illustrated or
implied — including through visual devices such as bars, dots, "up to" phrasing or comparative
column heights.

### 17.5 What is explicitly not confirmed

- **Any euro price.** No price, no "from €X", no discount, no currency, no billing period, no
  setup fee, no minimum term, no per-seat or per-agency model. R6 is absolute.
- **Any numeric limit or quota.**
- The public package names.
- Whether pricing is public or on request.
- The exact feature-to-package mapping in §17.3.

### 17.6 What may be published today

A pricing page may state, without invention:

- That there are three packages.
- The confirmed baseline (§17.2) as included in every paid package.
- That higher packages add further capabilities — **only** those individually confirmed by the
  owner, each carrying its own qualifier from §3–§15.
- That pricing is available on request, with *Book a demo* as the action.

Everything else waits. A pricing page with invented figures is a **P0** finding under R6 and
`INTEGRATION_CONTRACT.md` §9.

### 17.7 Entitlement enforcement

Whether the product technically enforces entitlements per tenant is **unconfirmed**. The website
must not claim that a package "unlocks" a capability if enforcement is manual. This is a Category 2
item requiring owner confirmation.

---

## 18. The 14-day trial and the extension mechanism

### 18.1 Trial existence — unresolved and blocking

| Source | Says |
|---|---|
| Owner's brief | The 14-day trial is the **central conversion entry point**. |
| `INTEGRATION_CONTRACT.md` §1 | `BLOCKED` — no signup, no auth, no provisioning, no billing exists. |
| `IMPLEMENTATION_STATUS.md` C-01 | Open conflict: does the trial exist at all? |
| Website codebase | No signup path. **But** a gold primary button labelled *"Start for free" / "Empezar gratis"* exists in `final-cta.tsx` and opens the **Cal.com demo booking**. `/live-demo` uses *"Start for free now"* for the same behaviour. |

**Finding — recorded as fact:** the production website already presents a "start for free" promise
that leads to a sales call. That is a claim/behaviour mismatch and a conversion-honesty problem
independent of whether the trial exists. It must not be carried into the redesign in that form.

**Ruling: the words "14 day free trial", "start free" or "free trial" may not appear anywhere on
the redesigned site until the owner confirms in writing that the trial exists and states what it
provisions.** This is Category 6 at best, and the CTA hierarchy in `MASTER_GOVERNANCE.md` §11
cannot be implemented as written until then.

### 18.2 The extension mechanism — confirmed process, not yet approved for publication

The owner has specified the mechanism precisely. Recorded verbatim in substance:

1. After the 14 days, an extension of **seven days** may be requested **exactly once**.
2. The customer submits an honest reference or feedback video, or a link to one.
3. The status becomes **`pending review`**.
4. The owner reviews the material **manually**.
5. Seven days are granted **only after manual approval**.
6. **An upload may never automatically trigger an extension.**

### 18.3 Ruling on publication

> **This mechanism is marked DISABLED for public display.**

It may not appear on the website — not in copy, not in a FAQ, not in a pricing footnote, not in a
tooltip — until it is **organisationally and legally cleared**. This is the owner's own instruction
and this document enforces it.

### 18.4 Why it needs legal clearance before it is published

Recorded so the legal review has a starting point, not as legal advice:

1. **Consideration for a testimonial.** Offering something of value in exchange for a review or
   reference engages EU unfair-commercial-practices rules on incentivised reviews. Undisclosed
   incentivised testimonials are treated as misleading in several EU regimes.
2. **The word "honest".** A published requirement that feedback be "honest" while it is also the
   condition for a benefit is a contradiction that reviewers and regulators notice. Manual approval
   by the beneficiary of the review sharpens this.
3. **Video containing identifiable persons** is personal data, and possibly biometric-adjacent
   depending on use. Consent, purpose limitation, retention and any later marketing use of the
   video are separate questions requiring separate consents.
4. **Contract terms.** A conditional service extension is a contractual term and must appear in
   terms and conditions, not only in marketing copy.
5. **Manual review capacity.** `pending review` with no committed decision window is an
   organisational commitment the owner must be able to meet.

### 18.5 Non-negotiable implementation constraints, if it is ever published

- The submission form must **never** display success wording implying the extension is granted.
  Only: *received, pending review*. `INTEGRATION_CONTRACT.md` §10 already flags that granted and
  requested must not be conflated.
- No automatic grant on upload, under any circumstances.
- The decision criteria and the review window must be stated.
- Where the request happens — website or product app — is an open owner decision. If it is inside
  the app, it is outside this website project's scope entirely.

---

## 19. Legal areas requiring confirmation before publication

**None of the following is legal advice.** Each is an area where the website would make a public
statement that this instance cannot verify. Each requires confirmation by a qualified adviser or an
explicit, recorded owner decision to accept the risk.

| # | Area | Why it blocks a claim | Affects |
|---|---|---|---|
| L-01 | **Timing and lawful basis for follow-up** | Automated commercial follow-up after an enquiry engages GDPR lawful basis and ePrivacy/LSSI-CE rules on unsolicited commercial communication. | §7 |
| L-02 | **Reactivation of older contacts** | Adds a staleness question and, where the channel changes, a channel-consent question. Highest-risk single capability. | §7 (E4) |
| L-03 | **Image storage** | Retention, purpose limitation, and possible special-category content in customer-supplied photos. | §4 (B8), §10 (G7) |
| L-04 | **Document storage** | Property documents routinely contain third-party personal data. | §4 (B9), §10 (G7) |
| L-05 | **Audio and conversation-content storage** | Voice notes and any call recording/transcription. Call recording in Spain requires notification and a lawful basis. | §4 (B10), §9 |
| L-06 | **Retention periods** | No retention period is defined anywhere. The current privacy policy says only *"as long as needed"*. | All |
| L-07 | **Consents** | Which consents are collected, by whom (agency or NuovaSolution), when, and how they are evidenced. Controller/processor roles between NuovaSolution and each agency are undefined. | All |
| L-08 | **Cross-channel communication** | Moving a contact between email, WhatsApp and voice is a consent question per channel, and a WhatsApp Business Platform policy question. | §4, §5, §7 |
| L-09 | **Automated profiling (lead scoring)** | Scoring natural persons is profiling under GDPR with transparency duties. | §6 |
| L-10 | **AI disclosure** | Whether customers are told they are interacting with AI. EU AI Act transparency obligations point toward disclosure, particularly for voice. | §4, §9 |
| L-11 | **Team performance visibility** | Employee monitoring in Spain engages works-council information duties and data-protection obligations. | §11 (I7) |
| L-12 | **Property measurement display** | Consumer-protection and Andalusian property-information rules. | §13 (K5) |
| L-13 | **Incentivised testimonial mechanism** | Unfair-commercial-practices rules on incentivised reviews. | §18 |
| L-14 | **Website privacy policy is materially incomplete** | The current policy states consent-only basis, "reply to your inquiry", no retention period, no AI processing, no automated decision-making, no image/document/audio storage, no third-country transfers, no sub-processors. It cannot support the platform the redesign will describe. | Site-wide, **blocking** |

### 19.1 Approved cautious formulations

The owner has approved these hedges. They are the **only** approved qualifiers, and each must be
attached to the specific claim it qualifies rather than buried in a footer:

- *Where permitted.*
- *Based on agency permissions and configuration.*
- *Subject to applicable communication rules.*
- *With configurable customer handling and human oversight.*
- *Availability depends on channel configuration.*

**A qualifier is not a licence.** It narrows a claim; it does not make an unverified claim safe.
Categories 6 and 7 are not rescued by hedging.

### 19.2 Never claimed

**Guaranteed legal compliance, in any wording, in any language.** Specifically forbidden:
"GDPR compliant", "fully compliant", "legally safe", "certified", "ISO", "SOC 2", "guaranteed",
"100% secure", or any compliance badge or seal. This is absolute.

---

## 20. CTA truth audit

| CTA | Target system | Status | Verdict |
|---|---|---|---|
| **Start your 14 day free trial** | None. No signup, auth, provisioning or billing. | `BLOCKED` | **Blocked.** May not appear until §18.1 is answered. The governance CTA hierarchy cannot be implemented as written. |
| **Book a demo** | Cal.com, event confirmed in code | `LIVE`, unsafe implementation | **Approved as the primary CTA** in the interim. Implementation defect A-02 (`href="#"` + `preventDefault()`) must be fixed — the anchor must carry the real booking URL. |
| **Experience Nuova** | Undecided: simulation or real backend | `PENDING` | **Placeholder ready.** Ships only as a labelled simulation (§16) until the owner decides. |
| **Talk to Nuova** | Undefined — could be voice, assistant, or callback | `BLOCKED` | **Blocked.** The label has no defined behaviour (C-04). It must not appear while ambiguous. If it means voice, §9 blocks it as well. |
| **Chat with Nuova** | No chat backend | `PENDING` | **Placeholder ready.** A chat window that accepts input and never answers is a P0 violation. Ships as an honest pending state or not at all. |
| **Log in** | No application, no URL, no auth | `BLOCKED` | **Blocked.** Depends on §10.8 #1 — whether a customer-facing application exists. R7 forbids inventing a URL. |
| **WhatsApp** *(referenced across the brief)* | No number exists anywhere | `BLOCKED` | **Blocked.** R7 forbids inventing a phone number. |

**Six of seven conversion paths have no working target system.** Only *Book a demo* is live, and its
current implementation is defective.

---

## 21. Consolidated conflicts raised by this document

| ID | Conflict | Needs |
|---|---|---|
| **PT-C1** | `CLAUDE.md` positioning and visual direction contradict the redesign brief | Owner: update `CLAUDE.md` (confirms C-07) |
| **PT-C5** | Voice: brief says capability, `/v2` draft says "soon", integration contract unanswered, no active component | **Owner: is voice live today?** |
| **PT-C6** | Governance §11 mandates the trial as primary CTA; no trial product is confirmed | **Owner: does the trial exist?** (confirms C-01) |
| **PT-C7** | Named integrations (portals, CRMs) appear in draft copy and live copy with no evidence | **Owner: confirm or reject each name individually** |
| **PT-C8** | Live site publishes a 1–100 score scale and an 80 threshold sourced from the website's own simulation | Owner: confirm the product's real scale, or drop it |
| **PT-C9** | Live site publishes "Start for free" routing to a demo booking, and "No setup needed" for a platform requiring configuration | Owner: acknowledge; must not be carried over |
| **PT-C10** | `/live-demo` presents deterministic client-side logic as live AI, with no disclosure | Owner + implementation: P0, remediate |
| **PT-C11** | Privacy policy cannot support the platform the redesign describes | **Legal: rewrite before launch** |

---

## 22. Summary for the copy, design and implementation instances

**What you may build on now**

- The positioning: an AI Operating and Growth Platform for real estate agencies (§2).
- The full capability architecture in §3–§15 — as *structure*. The site can be designed and written
  around these domains today.
- Category 3 claims (configuration-dependent) — these are safe with their qualifier, because the
  qualifier is the honest description.
- The confirmed package baseline (§17.2) and the three-package structure.
- *Book a demo* as the working primary CTA.

**What you may not build on**

- Any present-tense "we do this today" claim without the §19.1 qualifier — because **nothing is in
  Category 1**.
- Voice as a live capability (§9).
- The 14-day trial, in any wording (§18.1).
- The trial extension mechanism (§18.3).
- Any number: price, limit, quota, score scale, response time, percentage, count, spend, ROI (§12.6,
  §17.5).
- Any named third-party integration or logo (§8.6, §10.6).
- Any of the six blocked CTAs (§20).
- Reactivation and advanced follow-up, until legal confirmation (§7, §19).

**The one structural recommendation this document makes:** design the site so that a capability's
status is a *content property*, not hard-coded prose. Categories will move as the owner supplies
evidence, and several will move soon. A site whose claims can be re-qualified without a rebuild is
worth considerably more than one where every hedge is baked into a paragraph.

---

**Product truth and claims matrix completed for use by copy, design and implementation. No
production readiness claim made.**
