# CLAIMS MATRIX — NuovaSolution Website

**Author:** Product Truth Director / Claims Auditor instance (independent of implementation)
**Branch:** `website_enterprise_redesign`
**Created:** 2026-08-30
**Governs:** every public statement on the website — headlines, subheads, feature names, bullets,
tooltips, alt text, meta descriptions, OG text, microcopy, button labels, image captions, and any
number rendered anywhere, in **both** languages.
**Source of product facts:** `PRODUCT_TRUTH.md`. Where the two disagree, `PRODUCT_TRUTH.md` wins on
what the product is; this document wins on what may be said.

> **This document approves wording. It does not approve a page, a design or a release, and it makes
> no production readiness claim.**

---

## How to use this document

1. Find the capability you are about to write about.
2. Read the **Verdict**. If it is not `APPROVED` or `APPROVED-Q`, stop and do not write the claim.
3. If `APPROVED-Q`, the **Approved Wording** must carry its qualifier. The qualifier sits with the
   claim, not in a footer.
4. Never use anything in **Forbidden Wording**, in either language, in any surface — including
   placeholder text, mockups, screenshots and demo data.
5. If a claim you need is not in this matrix, it is **not approved**. Log it as a conflict; do not
   write it.

### Verdict legend

| Verdict | Meaning |
|---|---|
| `APPROVED` | May be stated plainly |
| `APPROVED-Q` | May be stated **only** with the specified qualifier |
| `REJECTED` | May not be stated, in any wording |
| `OWNER` | Needs owner confirmation before any wording is approved |
| `LEGAL` | Needs legal confirmation before any wording is approved |

`OWNER` and `LEGAL` both mean **do not publish yet**. They differ only in who unblocks them.

### Status legend (from `PRODUCT_TRUTH.md` §1)

`1` Live and confirmed · `2` Technically present, not live-verified · `3` Config-dependent ·
`4` Legally/organizationally restricted · `5` Controlled simulation · `6` Website prepared, backend
not connected · `7` Future capability · `EXCL` Explicitly excluded by the owner

### Risk legend (from `MASTER_GOVERNANCE.md` §2)

`P0` False public claim / legal exposure / dead conversion path — blocks everything.
`P1` Materially damages trust or conversion — blocks release.
`P2` Quality and precision — tracked, not release-blocking alone.

### Evidence legend

`BRIEF` Owner's redesign brief (specification of intent) · `CODE` Verified in this repository ·
`DRAFT` Unfinished `/v2` marketing draft, author intent only · `INV` Indirect local component
inventory, 2026-05-20, names only, no functional verification · `NONE` No evidence found ·
`AUDIT` `CURRENT_SITE_AUDIT.md` · `IC` `INTEGRATION_CONTRACT.md`

---

## 0. The rule that governs every row

**No capability in this matrix has Status 1.** Verification of the product backend was not
performed and, under the owner's system-isolation directive, was not permitted
(`PRODUCT_TRUTH.md` §0.3).

Consequently the default verdict for a capability claim is `APPROVED-Q`, never `APPROVED`. Plain
`APPROVED` appears in this document only for:

- statements about **structure and intent** rather than live capability,
- statements the owner has personally confirmed as commercial fact,
- statements about what the product **does not** do (which carry no capability risk),
- the one live integration, *Book a demo*.

---

## 1. Positioning

| ID | Capability | Status | Evidence | Public? | Approved Wording | Forbidden Wording | Legal Dep | Tech Dep | Owner Decision | Risk | Verdict |
|---|---|---|---|---|---|---|---|---|---|---|---|
| P-01 | AI Operating and Growth Platform for real estate agencies | 2 | BRIEF | Yes | "The AI operating and growth platform for real estate agencies." | "The AI operating system that runs your agency"; anything implying autonomous agency management | — | — | — | P2 | `APPROVED` |
| P-02 | Not a chatbot | — | BRIEF | Yes | "Not a chatbot. An operating layer for the whole customer relationship." | — | — | — | — | P2 | `APPROVED` |
| P-03 | Replaces multiple separate tools | 2 | BRIEF | Qualified | "One system instead of separate tools for messaging, follow-up, matching and reporting." | "Replaces your CRM"; "Replaces your entire stack"; naming tools it replaces | — | §10 CRM scope | Is it positioned as a CRM replacement? | P1 | `APPROVED-Q` |
| P-04 | Product is invisible to the end customer | 3 | BRIEF | Yes | "Your customers hear from your agency, under your brand." | "Your customers will never know" (reads as concealment; conflicts with AI disclosure, L-10) | L-10 | §14 branding | — | P1 | `APPROVED-Q` |
| P-05 | Old positioning: "AI lead automation for real estate agencies in Spain" | — | CODE | No | — | Must not be carried into the redesign — narrower than the confirmed positioning | — | — | Update `CLAUDE.md` | P2 | `REJECTED` |

---

## 2. Lead Acquisition

| ID | Capability | Status | Evidence | Public? | Approved Wording | Forbidden Wording | Legal Dep | Tech Dep | Owner Decision | Risk | Verdict |
|---|---|---|---|---|---|---|---|---|---|---|---|
| A-01 | Google Lead Forms intake | 2 | BRIEF | Qualified | "Receives leads from Google Lead Forms, based on agency permissions and configuration." | "Integrates with Google Ads"; "Manages your Google campaigns" | — | Agency's own ad account + permissions | Is it live for a real agency? | P1 | `APPROVED-Q` |
| A-02 | Meta Lead Ads intake | 2 | BRIEF | Qualified | "Receives leads from Meta Lead Ads, based on agency permissions and configuration." | "Official Meta partner"; "Meta integration" as a badge | — | Meta app permissions; possible app review | Is it live? Is app review held? | P1 | `APPROVED-Q` |
| A-03 | Click-to-WhatsApp attribution | 2 | BRIEF | Qualified | "Sees which campaign a WhatsApp conversation came from, where the platform provides it." | "Full attribution"; "Exact attribution"; "Tracks every click" | L-08 | Meta ad config | Is it live? | P1 | `APPROVED-Q` |
| A-04 | Web lead intake (product side) | 2 | BRIEF | Qualified | "Receives leads from your website forms." | "Instant" without the connection qualifier | — | Form connection | — | P1 | `APPROVED-Q` |
| A-04b | Web lead intake (**this website's own forms**) | 6 | AUDIT, IC | **No** | — | Any working-form implication until a submission path exists | L-07 | **No API routes, no forms** | Where do submissions land? | P0 | `OWNER` |
| A-05 | Social opportunities as a lead source | 2 | BRIEF | Qualified | "Turns social engagement into tracked leads, where permitted." | "Generates leads from social media" | L-07, L-08 | §5 platform permissions | Is it live? | P1 | `APPROVED-Q` |
| A-06 | Campaign and source attribution | 2 | BRIEF, INV (inactive) | Qualified | "Every lead carries the campaign and source it came from." | "Complete attribution"; "Never lose a source"; any accuracy figure | — | Per-channel attribution support | Is it live? | P1 | `APPROVED-Q` |
| A-07 | **Advertising budget optimization** | EXCL | Excluded by owner | **No** | — | "Optimises your ad spend"; "Improves your campaigns"; "Reduces cost per lead"; **all variants** | — | — | — | P0 | `REJECTED` |
| A-08 | Spend / CPL / ROAS / ROI / lead-volume figures | — | NONE | **No** | — | Every figure, including illustrative, sample and mockup values | — | — | — | P0 | `REJECTED` |
| A-09 | "Paid Acquisition" as a package entitlement | 2 | BRIEF | **No** | — | Any wording, until the entitlement is defined | — | — | **What does it include?** | P1 | `OWNER` |

---

## 3. AI Customer Communication

| ID | Capability | Status | Evidence | Public? | Approved Wording | Forbidden Wording | Legal Dep | Tech Dep | Owner Decision | Risk | Verdict |
|---|---|---|---|---|---|---|---|---|---|---|---|
| B-01 | WhatsApp conversations (product) | 2 | BRIEF, INV | Qualified | "Handles WhatsApp conversations. Availability depends on channel configuration." | "Official WhatsApp Business partner"; template/window claims | L-07, L-08 | WhatsApp Business Platform access | Cloud API or otherwise? | P1 | `APPROVED-Q` |
| B-02 | Email conversations | 2 | BRIEF, INV | Qualified | "Handles email enquiries end to end. Availability depends on channel configuration." | Named mailbox-provider integrations | L-07 | Mailbox connection | — | P1 | `APPROVED-Q` |
| B-03 | Web conversations (product) | 2 | BRIEF | Qualified | "Answers enquiries from your website." | — | L-07 | Web channel connection | — | P1 | `APPROVED-Q` |
| B-03b | Web chat **on this website** | 6 | IC §7 | **No** | Honest pending state only — see C-07 in §11 | Any live-assistant implication | L-07 | **No chat backend** | Is a chat backend planned for launch? | P0 | `OWNER` |
| B-04 | Automatic replies | 2 | BRIEF, INV | Qualified | "Every enquiry gets an answer, day or night, based on agency permissions and configuration." | "Every lead always gets a reply within X seconds"; any SLA | — | Channel connection | — | P1 | `APPROVED-Q` |
| B-05 | Response speed — **qualitative** | 2 | BRIEF | Qualified | "In seconds, not hours." / "Answered while the enquiry is still warm." | — | — | — | — | P1 | `APPROVED-Q` |
| B-06 | Response speed — **numeric** | 2 | Contradictory: CODE says "< 1 second", DRAFT says "4 seconds" | **No** | — | "< 1 second"; "4 seconds"; "instantly" as a measured promise; any specific figure | — | Measurement | **Supply a measured figure, or none** | P0 | `OWNER` |
| B-07 | Multilingual conversations | 2 | BRIEF | Qualified | "Speaks to each customer in their own language." | Naming a language count or a language list, until confirmed | — | Model/language support | Which languages? | P1 | `APPROVED-Q` |
| B-08 | Contextual memory | 2 | BRIEF, DRAFT | Qualified | "Nothing starts over. The system already knows the customer." | "Remembers everything, forever"; "Never forgets" | L-06, L-07 | Retention config | — | P1 | `APPROVED-Q` |
| B-09 | Images received and understood | 2 + 4 | BRIEF | Qualified | "Understands the photos customers send, subject to applicable communication rules." | "Stores"; "Analyses"; "Archives" — until L-03 is closed | **L-03** | Storage | — | P1 | `LEGAL` |
| B-10 | PDFs and documents | 2 + 4 | BRIEF | Qualified | "Understands the documents customers send, subject to applicable communication rules." | "Stores your documents"; "Secure document storage" | **L-04** | Storage | — | P1 | `LEGAL` |
| B-11 | Voice notes | 2 + 4 | BRIEF, DRAFT | Qualified | "Understands voice notes, subject to applicable communication rules." | "Records"; "Transcribes and stores" — until L-05 is closed | **L-05** | Storage | — | P1 | `LEGAL` |
| B-12 | Human handoff | 2 | BRIEF, DRAFT | Qualified | "Hands the conversation to a person when it matters, with the full history." | "Always knows when a human is needed" | — | — | — | P1 | `APPROVED-Q` |
| B-13 | Governed customer handling | 2 / 3 | BRIEF | Qualified | "With configurable customer handling and human oversight." | "Fully controlled"; "Cannot make mistakes"; "Guaranteed brand-safe" | L-10 | Rule configuration | What rules, set by whom? | P1 | `APPROVED-Q` |
| B-14 | Accuracy / never-fails claims | — | NONE | **No** | — | "Never misses"; "Always understands"; "100% of enquiries"; any accuracy % | — | — | — | P0 | `REJECTED` |
| B-15 | Security / encryption / GDPR claims | — | NONE | **No** | — | "Secure"; "Encrypted"; "GDPR compliant"; "Private by design"; any badge | **L-14** | — | — | P0 | `REJECTED` |

---

## 4. Social Growth

| ID | Capability | Status | Evidence | Public? | Approved Wording | Forbidden Wording | Legal Dep | Tech Dep | Owner Decision | Risk | Verdict |
|---|---|---|---|---|---|---|---|---|---|---|---|
| C-01 | Property and social content creation | 2 | BRIEF | Qualified | "Helps create property and social content in your brand voice." | "Creates all your content automatically" | — | — | Text only, or images/video? | P1 | `APPROVED-Q` |
| C-02 | Scheduled posting | 2 + 4 | BRIEF | Qualified | "Schedules and publishes where permitted, based on agency permissions and configuration." | "Posts automatically to all your channels" | L-07 | Platform app permissions | Approval step before publishing? | P1 | `APPROVED-Q` |
| C-03 | Comment handling | 2 + 4 | BRIEF | Qualified | "Replies to comments, where permitted." | "Replies to every comment" | L-07 | Platform policy | Is it live? | P1 | `APPROVED-Q` |
| C-04 | Comment → private conversation | 2 + 4 | BRIEF | Qualified | "Moves a genuine enquiry from a comment into a private conversation, where permitted." | "Automatic DM"; "Auto-DMs everyone who comments" | L-07, L-08 | Platform policy | Currently policy-compliant? | P1 | `APPROVED-Q` |
| C-05 | Private conversation → WhatsApp | 2 + 4 | BRIEF | Qualified | "Continues the conversation on WhatsApp when the customer chooses to." | "Moves them to WhatsApp automatically" | **L-08** | Consent per channel | — | P1 | `LEGAL` |
| C-06 | Lead capture from social engagement | 2 + 4 | BRIEF | Qualified | "Social engagement becomes a tracked lead, where permitted." | Any social lead-volume or engagement figure | **L-07** | — | — | P1 | `LEGAL` |
| C-07 | Brand and language consistency | 2 / 3 | BRIEF | Qualified | "Consistent in your brand voice and your customers' languages." | — | — | §14 branding config | — | P2 | `APPROVED-Q` |
| C-08 | Controlled anti-spam behaviour | 2 | BRIEF | Yes | "Deliberately restrained. Built to protect your accounts, not to farm engagement." | "Guaranteed never flagged"; "Ban-proof" | — | — | — | P1 | `APPROVED-Q` |
| C-09 | **Facebook Group automation** | EXCL | Excluded by owner | **No** | — | Every wording, including "community engagement" euphemisms | — | — | — | P0 | `REJECTED` |
| C-10 | Mass messaging / bulk outreach / cold DM | — | NONE | **No** | — | "Mass DM"; "Bulk outreach"; "Automated follow requests"; "Growth hacking" | — | — | — | P0 | `REJECTED` |
| C-11 | Reach / follower / engagement guarantees | — | NONE | **No** | — | Every figure and every guarantee | — | — | — | P0 | `REJECTED` |

---

## 5. Lead Intelligence

| ID | Capability | Status | Evidence | Public? | Approved Wording | Forbidden Wording | Legal Dep | Tech Dep | Owner Decision | Risk | Verdict |
|---|---|---|---|---|---|---|---|---|---|---|---|
| D-01 | Canonical customer identity | 2 | BRIEF, INV (**inactive**) | Qualified | "One customer, one record — across every channel they use." | "Perfect identity resolution"; "Never duplicates" | L-07 | Cross-channel matching | Is it live? | P1 | `APPROVED-Q` |
| D-02 | Qualification | 2 | BRIEF | Qualified | "Every enquiry is qualified automatically." | "Perfectly qualified"; accuracy figures | **L-09** | — | — | P1 | `APPROVED-Q` |
| D-03 | Hot lead score — **existence** | 2 | BRIEF | Qualified | "Each lead carries a priority signal, so your team knows where to start." | "Predicts which leads will close"; "Deal probability" | **L-09** | — | — | P1 | `APPROVED-Q` |
| D-04 | Hot lead score — **numeric scale** | 5 | CODE (**the website's own simulation**, not the product) | **No** | — | "Scored from 1 to 100"; "Leads above 80"; any threshold or scale | L-09 | — | **Confirm the product's real scale, or drop it** | P0 | `OWNER` |
| D-05 | Prioritization | 2 | BRIEF | Qualified | "Your team works the most promising leads first." | "Guarantees you never miss a serious buyer" | — | — | — | P1 | `APPROVED-Q` |
| D-06 | Customer preferences | 2 | BRIEF | Qualified | "Remembers what each customer is looking for." | — | L-06 | — | — | P2 | `APPROVED-Q` |
| D-07 | Memory | 2 | BRIEF | Qualified | See B-08 | See B-08 | L-06 | — | — | P1 | `APPROVED-Q` |
| D-08 | Follow-up state | 2 | BRIEF | Qualified | "You can always see what has been sent and what is due next." | — | — | — | — | P2 | `APPROVED-Q` |
| D-09 | Profiling transparency | 4 | NONE | **No** | — | Any scoring description, until L-09 is reviewed | **L-09** | — | — | P1 | `LEGAL` |

---

## 6. Follow-up

| ID | Capability | Status | Evidence | Public? | Approved Wording | Forbidden Wording | Legal Dep | Tech Dep | Owner Decision | Risk | Verdict |
|---|---|---|---|---|---|---|---|---|---|---|---|
| E-01 | Basic follow-up | 2 | BRIEF, INV (inactive) | Qualified | "If a lead goes quiet, follow-up continues automatically — subject to applicable communication rules and your own permissions." | "Follows up until they reply"; "Never gives up" | **L-01** | — | Max count and interval? | P1 | `LEGAL` |
| E-02 | Advanced follow-up and automation | 2 | BRIEF | **No** | — | Any wording, until L-01 is closed and the entitlement is defined | **L-01** | — | What separates basic from advanced? | P1 | `LEGAL` |
| E-03 | Nurturing | 2 + 4 | BRIEF | **No** | — | Any wording, until L-01 is closed | **L-01** | — | — | P1 | `LEGAL` |
| E-04 | **Reactivation of older contacts** | 4 | BRIEF, DRAFT (marked live) | **No** | — | "Reactivates old leads"; "Wakes up dormant contacts"; "Brings dead deals back"; the `/v2` cross-channel five-day narrative | **L-02, L-08** | Channel-consent handling | **Highest-risk capability on the site** | P0 | `LEGAL` |
| E-05 | Persistence framing | — | DRAFT | **No** | — | "It never gives up"; "Keeps trying"; "Until they answer"; "Relentless" | L-01 | — | — | P0 | `REJECTED` |
| E-06 | Recovery / revival statistics | — | NONE | **No** | — | Every figure | — | — | — | P0 | `REJECTED` |

> **Note on E-01.** Basic follow-up is in the confirmed baseline of every paid package
> (`PRODUCT_TRUTH.md` §17.2), yet its public description is legally blocked. The package baseline
> may still be listed — the *capability name* is approved as a package line item; the *behavioural
> description* is not, until L-01 closes.

---

## 7. Property Matching

| ID | Capability | Status | Evidence | Public? | Approved Wording | Forbidden Wording | Legal Dep | Tech Dep | Owner Decision | Risk | Verdict |
|---|---|---|---|---|---|---|---|---|---|---|---|
| F-01 | Understands customer requirements | 2 | BRIEF | Qualified | "Understands what each customer is actually looking for." | — | — | — | — | P2 | `APPROVED-Q` |
| F-02 | Verified / agency-authorised inventory | 2 + 3 | BRIEF | Qualified | "Matches against your own or agency-authorised property sources." | "Searches the whole market"; "Every listing in Spain"; "All portals" | — | Inventory connection | How does inventory arrive? | P1 | `APPROVED-Q` |
| F-03 | Customer-facing focused matches | 2 | BRIEF, DRAFT | Qualified | "Your customer receives a short, relevant selection — not a list dump." | A fixed number ("three homes"), unless confirmed | — | — | Fixed or variable count? | P1 | `APPROVED-Q` |
| F-04 | Internal extended options | 2 | BRIEF | Qualified | "Your agents see the wider set internally." | — | — | — | — | P2 | `APPROVED-Q` |
| F-05 | Property discussion in voice calls | 7 | Inherits §9 | **No** | — | Any wording while voice is unresolved | — | Voice | See V-01 | P1 | `OWNER` |
| F-06 | **Named portal integrations** (Idealista, Fotocasa, …) | 6 | DRAFT names them; **NONE** evidences them | **No** | — | Every portal name and logo | — | Integration must exist | **Confirm or reject each name individually** | P0 | `REJECTED` |
| F-07 | **Named CRM integrations** (HubSpot, Salesforce, Pipedrive, Zoho) | 6 | DRAFT names them; **NONE** evidences them | **No** | — | Every CRM name and logo; "Works with yours"; "Compatible with your CRM" | — | Integration must exist | **Confirm or reject each name individually** | P0 | `REJECTED` |
| F-08 | "Always synced to your CRM" (**currently live on the site**) | 6 | CODE | **No** | — | This exact claim and every variant | — | No integration evidenced | — | P0 | `REJECTED` |
| F-09 | Match accuracy / quality figures | — | NONE | **No** | — | Every figure | — | — | — | P0 | `REJECTED` |
| F-10 | Matching as advice or valuation | — | NONE | **No** | — | "Recommends"; "Values"; "Appraises"; "Advises" | Consumer/estate-agency rules | — | — | P1 | `REJECTED` |

---

## 8. Universal CRM

| ID | Capability | Status | Evidence | Public? | Approved Wording | Forbidden Wording | Legal Dep | Tech Dep | Owner Decision | Risk | Verdict |
|---|---|---|---|---|---|---|---|---|---|---|---|
| G-01 | Customer history | 2 | BRIEF, INV (**inactive** adapter) | Qualified | "The whole relationship in one place." | "Complete history forever" | L-06 | — | — | P1 | `APPROVED-Q` |
| G-02 | Messages and channels | 2 | BRIEF | Qualified | "Every message, from every channel, on one record." | — | L-07 | Channel config | — | P1 | `APPROVED-Q` |
| G-03 | Source attribution | 2 | BRIEF | Qualified | See A-06 | See A-06 | — | — | — | P1 | `APPROVED-Q` |
| G-04 | Qualification, score, preferences | 2 | BRIEF | Qualified | See D-02, D-03, D-06 | See D-04 | L-09 | — | — | P1 | `APPROVED-Q` |
| G-05 | Attachments and provenance | 2 + 4 | BRIEF | **No** | — | Any storage claim, until L-03/L-04/L-05 close | **L-03, L-04, L-05** | Storage | — | P1 | `LEGAL` |
| G-06 | Handoffs | 2 | BRIEF | Qualified | "You can see who took over, and when." | — | — | — | — | P2 | `APPROVED-Q` |
| G-07 | Appointments | 2 + 3 | BRIEF | Qualified | "Appointments on the record, once your calendar is connected." | "Books viewings automatically" without the calendar qualifier | — | Calendar config | Does it write to a real calendar? | P1 | `APPROVED-Q` |
| G-08 | Matching on the record | 2 | BRIEF | Qualified | See F-01 | See F-06, F-07 | — | — | — | P2 | `APPROVED-Q` |
| G-09 | Central agency view | 2 | BRIEF | Qualified | "One view of the whole agency's pipeline." | — | — | — | — | P2 | `APPROVED-Q` |
| G-10 | The word **"Universal"** | — | BRIEF | Qualified | Use only as "universal **across your channels**". | "Universal" standing alone, or implying compatibility with any external CRM | — | — | — | P1 | `APPROVED-Q` |
| G-11 | CRM replacement positioning | 2 | NONE | **No** | — | "Replaces your CRM" | — | — | **Is it positioned as a replacement?** | P1 | `OWNER` |
| G-12 | Storage / uptime / retention guarantees | — | NONE | **No** | — | Every guarantee | **L-06, L-14** | — | — | P0 | `REJECTED` |

---

## 9. Voice AI

> **Blocking conflict PT-C5.** The brief describes voice as a capability. The `/v2` draft flags it
> `status: "soon"` with the line *"Today it tells your agent. Soon it picks up the phone itself."*
> `INTEGRATION_CONTRACT.md` W-05 asks whether a callable entry point exists and is unanswered. The
> local inventory shows only an **inactive** telephony test component. Three sources say not live.
>
> **Interim ruling: voice is treated as Category 7 (future) on the public website.**

| ID | Capability | Status | Evidence | Public? | Approved Wording | Forbidden Wording | Legal Dep | Tech Dep | Owner Decision | Risk | Verdict |
|---|---|---|---|---|---|---|---|---|---|---|---|
| V-01 | **Is voice live?** | 7 (interim) | Contradictory | — | — | — | L-05, L-10 | Telephony | **BLOCKING — owner must answer** | P0 | `OWNER` |
| V-02 | Voice as a **future** capability | 7 | BRIEF, DRAFT | Qualified | "Voice — coming next." In a visually separated future section. | Any present-tense wording; placement inside a live feature list | — | — | — | P1 | `APPROVED-Q` |
| V-03 | Answers calls | 7 | — | **No** | — | "Answers your calls"; "Never miss a call" | L-05, L-10 | Telephony | V-01 | P0 | `OWNER` |
| V-04 | Speaks naturally | 7 | — | **No** | — | "Indistinguishable from a human"; "Callers can't tell" | **L-10** | — | V-01 | P0 | `REJECTED` |
| V-05 | Qualifies by phone | 7 | — | **No** | — | — | L-09 | — | V-01 | P1 | `OWNER` |
| V-06 | Discusses properties by phone | 7 | — | **No** | — | — | — | §7 matching | V-01 | P1 | `OWNER` |
| V-07 | Multilingual voice | 7 | — | **No** | — | Language counts | — | — | V-01 | P1 | `OWNER` |
| V-08 | Callbacks | 7 | — | **No** | — | — | L-01 | — | V-01 | P1 | `OWNER` |
| V-09 | Human handoff from a call | 7 | — | **No** | — | — | — | — | V-01 | P1 | `OWNER` |
| V-10 | Books appointments | 7 + 3 | BRIEF ("when correctly configured") | **No** | — | Unconditional booking claims | — | Calendar | V-01 | P1 | `OWNER` |
| V-11 | Call recording / transcription | 4 | NONE | **No** | — | Every wording | **L-05** | — | Are calls recorded? Is the caller told? | P0 | `LEGAL` |
| V-12 | A phone number on the site | 6 | NONE | **No** | — | Any number — R7 forbids inventing one | — | — | Supply a real number | P0 | `OWNER` |
| V-13 | Call-handling statistics | — | NONE | **No** | — | Every figure | — | — | — | P0 | `REJECTED` |

---

## 10. Daily Goals and Internal AI Assistant

| ID | Capability | Status | Evidence | Public? | Approved Wording | Forbidden Wording | Legal Dep | Tech Dep | Owner Decision | Risk | Verdict |
|---|---|---|---|---|---|---|---|---|---|---|---|
| I-01 | "Who should I call today?" | 2 | BRIEF | Qualified | Shown as an **illustrative** example question. | Presenting the example set as a guaranteed command set | — | — | Does it exist today? | P1 | `OWNER` |
| I-02 | "Prepare me for my next viewing." | 2 | BRIEF | Qualified | As above | As above | — | — | Does it exist? | P1 | `OWNER` |
| I-03 | "Message Pablo." | 2 + 4 | BRIEF | Qualified | "Draft and send, with your confirmation." | "Sends on your behalf" without a confirmation step | L-07 | — | Confirmation step? | P1 | `OWNER` |
| I-04 | "Email my colleague." | 2 | BRIEF | Qualified | As I-03 | As I-03 | — | — | — | P1 | `OWNER` |
| I-05 | "Which buyers match this villa?" | 2 | BRIEF | Qualified | As I-01 | — | — | §7 matching | — | P1 | `OWNER` |
| I-06 | "Why is this lead a priority?" | 2 | BRIEF | Qualified | "Ask why a lead is a priority, and see the reasoning." — a genuine explainability strength | "Explains its decisions perfectly" | L-09 | §5 scoring | — | P1 | `OWNER` |
| I-07 | "How is my team doing?" | 2 + 4 | BRIEF | **No** | — | "Track your agents"; "Monitor performance"; "See who is underperforming" | **L-11** | — | — | P1 | `LEGAL` |
| I-08 | Desktop, mobile and speech interaction | 2 | BRIEF | Qualified | "On desktop, on mobile, and by speaking." | "Works everywhere, always" | — | Device permissions | Is speech real today? | P1 | `OWNER` |
| I-09 | Assistant autonomy | — | NONE | **No** | — | "Decides for you"; "Acts on its own"; "Runs your day" | — | — | — | P1 | `REJECTED` |
| I-10 | Time-saved / productivity figures | — | NONE | **No** | — | Every figure | — | — | — | P0 | `REJECTED` |

> **Note.** This section is the strongest differentiator in the brief and carries **zero** evidence.
> Every row is `OWNER` or `LEGAL`. Until the owner confirms which questions genuinely work, the
> assistant may be presented **only** as a named capability with illustrative examples — never as a
> demonstrated, working command set.

---

## 11. Reporting

| ID | Capability | Status | Evidence | Public? | Approved Wording | Forbidden Wording | Legal Dep | Tech Dep | Owner Decision | Risk | Verdict |
|---|---|---|---|---|---|---|---|---|---|---|---|
| R-01 | Lead sources | 2 | BRIEF | Qualified | "See where your leads come from." | — | — | — | Does reporting exist? | P1 | `APPROVED-Q` |
| R-02 | Response time | 2 | BRIEF | Qualified | "See how fast enquiries were answered." | Publishing an average as a marketing figure | — | — | — | P1 | `APPROVED-Q` |
| R-03 | Qualification | 2 | BRIEF | Qualified | "See how leads qualified." | — | L-09 | — | — | P1 | `APPROVED-Q` |
| R-04 | Hot leads | 2 | BRIEF | Qualified | "See your priority leads." | See D-04 | L-09 | — | — | P1 | `APPROVED-Q` |
| R-05 | Appointments | 2 | BRIEF | Qualified | "See what was booked." | — | — | Calendar | — | P2 | `APPROVED-Q` |
| R-06 | **Supported conversions** | 2 | BRIEF | Qualified | **"Supported conversions"** — the owner's exact wording, preserved. | **Never shorten to "conversions"**; "Conversions we generated"; "Deals closed by Nuova" | — | — | — | P1 | `APPROVED-Q` |
| R-07 | Property matching | 2 | BRIEF | Qualified | "See how matching performed." | See F-09 | — | — | — | P2 | `APPROVED-Q` |
| R-08 | Team workload | 2 | BRIEF | Qualified | "See how work is distributed." | Performance-ranking framing (see I-07) | **L-11** | — | — | P1 | `LEGAL` |
| R-09 | Daily goals | 2 | BRIEF | Qualified | "See progress against the day's goals." | — | L-11 | §10 | — | P2 | `APPROVED-Q` |
| R-10 | Voice reporting | 7 | Inherits §9 | **No** | — | Any wording | — | Voice | V-01 | P1 | `OWNER` |
| R-11 | Acquisition attribution | 2 | BRIEF | Qualified | See A-06 | See A-08 | — | — | — | P1 | `APPROVED-Q` |
| R-12 | Property experience usage | 2 | BRIEF | Qualified | "See how buyers used the property experience." | Engagement or conversion-uplift figures | — | §13 | — | P2 | `APPROVED-Q` |
| R-13 | **Spend / CPL / ROAS / ROI / revenue / commission / closing rate** | — | NONE | **No** | — | **Every figure, in every form, including sample dashboards and mockups** | — | — | — | P0 | `REJECTED` |
| R-14 | Benchmarks and industry averages | — | NONE | **No** | — | "The average agency…"; "Agencies like yours see…" | — | — | — | P0 | `REJECTED` |
| R-15 | Numbers inside reporting visuals | 5 | — | Qualified | Every visual carries a visible **"Illustrative" / "Ejemplo"** marker. | Any plausible-looking invented figure presented without the marker | — | — | Supply a real screenshot? | P0 | `APPROVED-Q` |

---

## 12. Interactive Property Experience

| ID | Capability | Status | Evidence | Public? | Approved Wording | Forbidden Wording | Legal Dep | Tech Dep | Owner Decision | Risk | Verdict |
|---|---|---|---|---|---|---|---|---|---|---|---|
| K-01 | One panorama per room as standard | 2 + 3 | BRIEF | Qualified | "A real panorama for every room, as standard." | "Unlimited rooms"; "Every property, automatically" | — | Agency supplies panoramas | Who produces them? | P1 | `APPROVED-Q` |
| K-02 | Floor and ceiling | 2 | BRIEF | Qualified | "Full view — floor to ceiling." | — | — | — | — | P2 | `APPROVED-Q` |
| K-03 | Real door navigation | 2 | BRIEF | Qualified | "Move between rooms through the real doorways." | — | — | — | — | P2 | `APPROVED-Q` |
| K-04 | Room names | 2 + 3 | BRIEF | Qualified | "Every room named." | — | — | Agency-supplied | — | P2 | `APPROVED-Q` |
| K-05 | **Square metres from a verified source** | 2+3+4 | BRIEF | **No** | — | "Verified by NuovaSolution"; "Guaranteed accurate"; "Certified measurements" | **L-12** | Source enforcement | **Is the verified source technically enforced?** If not, drop K-05 entirely. | P0 | `LEGAL` |
| K-06 | Real floor plan | 2 + 3 | BRIEF | Qualified | "The real floor plan, alongside the rooms." | — | L-12 | Agency-supplied | — | P1 | `APPROVED-Q` |
| K-07 | Current room indicator | 2 | BRIEF | Qualified | "You always know which room you are in." | — | — | — | — | P2 | `APPROVED-Q` |
| K-08 | View direction | 2 | BRIEF | Qualified | "And which way you are facing." | — | — | — | — | P2 | `APPROVED-Q` |
| K-09 | Multiple floors | 2 | BRIEF | Qualified | "Multiple floors." | — | — | — | — | P2 | `APPROVED-Q` |
| K-10 | Stair transitions | 2 | BRIEF | Qualified | "With real stair transitions between them." | — | — | — | — | P2 | `APPROVED-Q` |
| K-11 | **No joystick, no free movement** | Constraint | BRIEF | Yes | "Structured navigation by design — no joystick, no getting lost." State it as a **deliberate choice**. | Hiding it; or contradicting it with free-roam language | — | — | — | P1 | `APPROVED` |
| K-12 | Customer actions | 3 | BRIEF ("only when genuinely configured") | Qualified | "Customer actions appear only when your agency has configured them." | Unconditional action claims | — | Configuration | What are the actions? | P1 | `APPROVED-Q` |
| K-13 | "Virtual tour" / "3D tour" / "walkthrough" / "metaverse" framing | — | — | **No** | — | All four — they imply free movement and contradict K-11 | — | — | — | P1 | `REJECTED` |
| K-14 | Replaces a physical viewing | — | NONE | **No** | — | "No need to visit"; "Replaces viewings" | — | — | — | P1 | `REJECTED` |
| K-15 | Viewings-saved / engagement / uplift figures | — | NONE | **No** | — | Every figure | — | — | — | P0 | `REJECTED` |
| K-16 | Property shown in website media | 5 | — | Qualified | A real property used with permission, **or** marked illustrative. | An unmarked invented property presented as a client's | — | — | Is there a showable real example? | P1 | `APPROVED-Q` |

---

## 13. Agency Branding

| ID | Capability | Status | Evidence | Public? | Approved Wording | Forbidden Wording | Legal Dep | Tech Dep | Owner Decision | Risk | Verdict |
|---|---|---|---|---|---|---|---|---|---|---|---|
| N-01 | Logo, email banner, signatures, brand identity | 3 | BRIEF | Qualified | "Every message goes out under your brand — your logo, your banner, your signature." | — | — | Onboarding config | Self-service or set up by Nuova? | P2 | `APPROVED-Q` |
| N-02 | Personalised communication | 3 | BRIEF | Qualified | "In your agency's voice." | — | — | — | — | P2 | `APPROVED-Q` |
| N-03 | Tenant-specific configuration | 2 + 3 | BRIEF | Qualified | "Each agency configured separately." | "Isolated"; "Your data is separate and secure" — that is a security claim (B-15) | L-14 | — | — | P1 | `APPROVED-Q` |
| N-04 | Product invisible to the customer | 3 | BRIEF | Qualified | See P-04 | See P-04 | L-10 | — | — | P1 | `APPROVED-Q` |
| N-05 | White-label / reseller / partner programme | 6 | NONE | **No** | — | Every wording | — | — | Does a programme exist? | P1 | `OWNER` |

---

## 14. Self-Service Onboarding

| ID | Capability | Status | Evidence | Public? | Approved Wording | Forbidden Wording | Legal Dep | Tech Dep | Owner Decision | Risk | Verdict |
|---|---|---|---|---|---|---|---|---|---|---|---|
| O-01 | Agency setup | 2 | BRIEF | Qualified | "Set up your agency yourself." | — | — | — | Does the flow exist? | P1 | `OWNER` |
| O-02 | Employees and roles | 2 | BRIEF | Qualified | "Add your team and set their roles." | Naming roles that are not confirmed | — | — | What roles exist? | P1 | `OWNER` |
| O-03 | Channels | 2 + 3 | BRIEF | Qualified | "Connect your channels, based on the permissions you hold." | "One-click connection for every channel" | L-07 | Platform permissions | — | P1 | `APPROVED-Q` |
| O-04 | Branding | 2 | BRIEF | Qualified | See N-01 | — | — | — | — | P2 | `APPROVED-Q` |
| O-05 | Property experience setup | 2 | BRIEF | Qualified | See §12 | — | — | §12 | — | P2 | `APPROVED-Q` |
| O-06 | Lead connections | 2 + 3 | BRIEF | Qualified | See §2 | See A-07 | — | — | — | P1 | `APPROVED-Q` |
| O-07 | Package entitlements | 2 | BRIEF | Qualified | "Your package, visible and manageable." | "Unlocks instantly", if enforcement is manual | — | Entitlement enforcement | Is enforcement technical or manual? | P1 | `OWNER` |
| O-08 | **Self-service without developers** | 2 | BRIEF | Qualified | "No developers needed." | "No setup needed"; "Zero configuration"; "Works out of the box" | — | — | Confirm the claim holds | P1 | `APPROVED-Q` |
| O-09 | **"No setup needed"** (currently live on the site) | — | CODE | **No** | — | This exact claim — inaccurate for a platform requiring channel, branding and inventory setup | — | — | — | P1 | `REJECTED` |
| O-10 | Onboarding-duration claims | — | NONE | **No** | — | "Live in a day"; "Up and running in 15 minutes"; every figure | — | — | Supply a measured figure | P1 | `REJECTED` |
| O-11 | Migration / data import | 6 | NONE | **No** | — | Every wording | — | — | Does it exist? | P1 | `OWNER` |

---

## 15. Packages and pricing

| ID | Claim | Status | Evidence | Public? | Approved Wording | Forbidden Wording | Legal Dep | Tech Dep | Owner Decision | Risk | Verdict |
|---|---|---|---|---|---|---|---|---|---|---|---|
| PK-01 | Three packages exist | 2 | BRIEF | Yes | "Three packages." | — | — | — | — | P2 | `APPROVED` |
| PK-02 | Internal IDs `essential` / `growth` / `scale` | 2 | BRIEF | **No** | — | Publishing internal IDs as marketing names without confirmation | — | — | **Confirm the public names** | P1 | `OWNER` |
| PK-03 | Baseline in all paid packages: CRM, Lead Engine, Automatic Replies, Basic Follow-up, Property Matching, Core Reporting | 2 | BRIEF | Yes, as **names** | "Every paid package includes: CRM · Lead Engine · Automatic Replies · Basic Follow-up · Property Matching · Core Reporting." | Describing each one's behaviour beyond what §3–§11 approve | E-01 → **L-01** | — | "Core" or "Basic" Reporting? | P1 | `APPROVED-Q` |
| PK-04 | Higher packages: Voice, Daily Assistant, Social Growth, Advanced Follow-up, Advanced Reporting, Property Experience, Paid Acquisition | 2 | BRIEF (conditional: *only if confirmed*) | **No** | — | Placing any of these in a named package without an explicit owner mapping | L-01, L-02 | Voice unresolved | **Confirm the feature-to-package mapping** | P0 | `OWNER` |
| PK-05 | Scale: higher limits, higher Property Experience quota, greater capacity | 2 | BRIEF (conditional) | **No** | — | Every number; and every *visual implication* of a number — bars, dots, "up to", comparative column heights | — | — | **Supply the limits, or confirm none are published** | P0 | `OWNER` |
| PK-06 | **Any euro price** | 6 | NONE | **No** | — | Every price, "from €X", discount, currency, billing period, setup fee, minimum term, per-seat or per-agency model | — | No billing provider | **Are prices public or on request?** | P0 | `OWNER` |
| PK-07 | Pricing on request | 6 | NONE | Yes, if chosen | "Pricing on request." → *Book a demo* | — | — | — | Owner chooses public vs on request | P1 | `OWNER` |
| PK-08 | Entitlement enforcement | 2 | NONE | **No** | — | "Unlocks"; "Activates instantly", if enforcement is manual | — | — | Technical or manual? | P1 | `OWNER` |

---

## 16. The 14-day trial and the extension mechanism

| ID | Claim | Status | Evidence | Public? | Approved Wording | Forbidden Wording | Legal Dep | Tech Dep | Owner Decision | Risk | Verdict |
|---|---|---|---|---|---|---|---|---|---|---|---|
| T-01 | **A 14-day free trial exists** | 6 | BRIEF asserts; IC §1 `BLOCKED`; no signup/auth/provisioning/billing | **No** | — | "Start your 14 day free trial"; "Free trial"; "Start free"; "Try free"; "No credit card required" | L-07 (signup data) | **Everything — no signup path exists** | **BLOCKING — does the trial exist?** | P0 | `OWNER` |
| T-02 | **"Start for free" currently on the live site → opens a demo booking** | — | CODE | **No** | — | This exact pattern — a free-start promise routed to a sales call | — | — | Acknowledge; must not be carried over | P0 | `REJECTED` |
| T-03 | Trial extension mechanism (7 days, once, feedback video, pending review, manual approval) | 4 | BRIEF | **No — DISABLED** | — | **Every wording.** Not in copy, not in a FAQ, not in a footnote, not in a tooltip. | **L-13** + contract terms | Depends on T-01 | **Owner: organisational and legal clearance** | P0 | `LEGAL` |
| T-04 | Upload never auto-triggers an extension | 4 | BRIEF | **No** (mechanism disabled) | If ever published: "Received. Pending review." | Any success wording implying the extension is granted | L-13 | — | — | P0 | `LEGAL` |
| T-05 | Trial-conversion or usage statistics | — | NONE | **No** | — | Every figure | — | — | — | P0 | `REJECTED` |

> **T-03 is marked DISABLED by owner instruction** and stays disabled until organisational and
> legal clearance exists. Rationale is recorded in `PRODUCT_TRUTH.md` §18.4.
>
> **Governance consequence.** `MASTER_GOVERNANCE.md` §11 sets the trial as the **primary** CTA. With
> T-01 blocked, that hierarchy cannot be implemented. Interim hierarchy: **Primary — Book a demo.**
> This needs owner ratification.

---

## 17. CTA truth

| ID | CTA | Status | Evidence | Public? | Approved Wording | Forbidden Wording | Legal Dep | Tech Dep | Owner Decision | Risk | Verdict |
|---|---|---|---|---|---|---|---|---|---|---|---|
| CTA-1 | **Start your 14 day free trial** | `BLOCKED` | IC §1 | **No** | — | Every free-trial wording | — | No signup, auth, provisioning or billing | See T-01 | P0 | `OWNER` |
| CTA-2 | **Book a demo** | `LIVE` (defective impl.) | CODE, IC §2 | Yes | "Book a demo" / "Reserva una demo" | Any duration or outcome promise not confirmed ("15 minutes", "no commitment") | — | Fix A-02: the anchor must carry the real booking URL, not `href="#"` + `preventDefault()` | Confirm the event and whether a per-language event is needed | P1 | `APPROVED` |
| CTA-3 | **Experience Nuova** | `PENDING` | IC §3 | Qualified | "Experience Nuova" — **only** with a pre-interaction simulation label | "Live"; "Real time"; "AI analysis"; "See the real system" | — | Simulation vs live backend undecided | Simulated or live? | P0 | `OWNER` |
| CTA-4 | **Talk to Nuova** | `BLOCKED` | IC §5 | **No** | — | The label itself, while its behaviour is undefined | — | Undefined | **What does it do?** (C-04) | P1 | `OWNER` |
| CTA-5 | **Chat with Nuova** | `PENDING` | IC §7 | **No** | Honest pending state only, offering *Book a demo* | Any input field that accepts text and never answers — **P0 violation** | L-07 | No chat backend | Chat backend at launch? | P0 | `OWNER` |
| CTA-6 | **Log in** | `BLOCKED` | IC §4 | **No** | — | Any invented URL (R7); a nav item pointing nowhere | — | No app, no auth, no URL | **Does a customer app exist? At what URL?** | P1 | `OWNER` |
| CTA-7 | **WhatsApp** | `BLOCKED` | IC §8 | **No** | — | Any invented number (R7) | L-08 | No number exists | **Supply the business number, and who answers it** | P0 | `OWNER` |

**Six of seven conversion paths have no working target system.**

---

## 18. Demo and simulation disclosure

| ID | Claim | Status | Evidence | Public? | Approved Wording | Forbidden Wording | Legal Dep | Tech Dep | Owner Decision | Risk | Verdict |
|---|---|---|---|---|---|---|---|---|---|---|---|
| S-01 | The existing `/live-demo` presents deterministic client-side logic as live AI, with **no disclosure** | 5 | CODE | **No** | — | "Live Demo"; "in real time"; "AI Analysis"; "CRM Updated"; "Try a real example" — while nothing of the sort is running | — | — | Remediate | **P0** | `REJECTED` |
| S-02 | Any on-site experience not calling the product | 5 | — | Qualified | Must carry a simulation label **before** interaction, in EN and ES. | Interacting first, disclosing after | — | — | **Confirm the disclosure wording in both languages** | P0 | `OWNER` |
| S-03 | Domain logic shown in a simulation | 5 | CODE | Qualified | Showing *what the product does* is fine; the framing must be honest about *how the demo works*. | Presenting simulation output as product output | — | — | — | P1 | `APPROVED-Q` |
| S-04 | Scoring scales / timings sourced from the simulation | 5 | CODE | **No** | — | "1 to 100"; "above 80"; "< 1 second" | — | — | See D-04, B-06 | P0 | `REJECTED` |
| S-05 | Sample lead data in a demo | 5 | CODE | Qualified | Clearly illustrative; no real person, no real agency, no real property without permission. | Invented client names presented as real (R6) | — | — | — | P1 | `APPROVED-Q` |

---

## 19. Trust, proof and social proof

| ID | Claim | Status | Evidence | Public? | Forbidden Wording | Risk | Verdict |
|---|---|---|---|---|---|---|---|
| X-01 | Customer names, agency names, brands, logos | — | NONE | **No** | Every invented or unpermissioned name and logo (R6) | P0 | `REJECTED` |
| X-02 | Testimonials, quotes, endorsements | — | NONE | **No** | Every invented testimonial | P0 | `REJECTED` |
| X-03 | Case studies, success stories | — | NONE | **No** | Every invented case study | P0 | `REJECTED` |
| X-04 | Counts: agencies, users, leads, messages, conversations | — | NONE | **No** | Every figure, including "trusted by X agencies" and "40 enquiries at once" | P0 | `REJECTED` |
| X-05 | The `/v2` draft's narrative figures ("forty other enquiries", "200 overnight · 3 for you", "197 already handled") | 5 | DRAFT | **No** | These specific figures, and every equivalent | P0 | `REJECTED` |
| X-06 | Certifications, awards, partnerships, compliance badges | — | NONE | **No** | ISO, SOC 2, GDPR badges, "Official partner", every seal | P0 | `REJECTED` |
| X-07 | Uptime, availability, SLA | — | NONE | **No** | "99.9%"; "Always available"; every guarantee | P0 | `REJECTED` |
| X-08 | Guaranteed legal compliance | — | NONE | **No** | "GDPR compliant"; "Fully compliant"; "Legally safe"; "Certified"; every variant, in every language | P0 | `REJECTED` |
| X-09 | Real proof, once it exists | — | — | Yes, when real | A named agency with **written permission**, a real screenshot, a real measured figure | P2 | `OWNER` |

---

## 20. Approved qualifier bank (EN / ES)

The **only** approved qualifiers, per the owner. Each attaches to the claim it qualifies — never a
blanket footer disclaimer. Spanish must be reviewed by a native speaker before publication; these
are structurally correct starting points, not final copy (final wording belongs to
`COPY_AND_CONVERSION_MASTER.md`).

| # | English | Spanish (draft — needs native review) | Use for |
|---|---|---|---|
| Q-1 | Where permitted | Donde esté permitido | Social, posting, comment handling |
| Q-2 | Based on agency permissions and configuration | Según los permisos y la configuración de la agencia | Acquisition, channels, social |
| Q-3 | Subject to applicable communication rules | Sujeto a las normas de comunicación aplicables | Follow-up, files, audio, cross-channel |
| Q-4 | With configurable customer handling and human oversight | Con gestión de clientes configurable y supervisión humana | Governed handling, assistant, automation |
| Q-5 | Availability depends on channel configuration | La disponibilidad depende de la configuración de canales | Every channel claim |

**A qualifier narrows a claim. It does not rescue an unverified one.** Status 6 and 7 capabilities
are not made publishable by adding a hedge.

---

## 21. Owner decisions required

Ordered by what unblocks the most work.

| # | Decision | Unblocks | Risk if wrong |
|---|---|---|---|
| 1 | **Is voice AI live today — yes or no?** | §9 entirely, PK-04, CTA-4, R-10, F-05 | P0 |
| 2 | **Does the 14-day trial exist, and what does it provision?** | T-01, CTA-1, the whole CTA hierarchy, pricing | P0 |
| 3 | **Confirm or reject each named integration** (Idealista, Fotocasa, HubSpot, Salesforce, Pipedrive, Zoho, and any other) | F-06, F-07, F-08, G-11 | P0 |
| 4 | **Is `/live-demo` remediated, and what is the simulation disclosure wording in EN and ES?** | S-01, S-02, CTA-3 | P0 |
| 5 | **The feature-to-package mapping**, and whether prices are public or on request | PK-04, PK-05, PK-06, PK-07 | P0 |
| 6 | **Does a customer-facing application exist, at what URL?** | CTA-6, G-11, O-01…O-08, onboarding scope | P1 |
| 7 | **The business WhatsApp number**, who answers it, in which languages, during which hours | CTA-7, C-05 | P0 |
| 8 | **What does "Talk to Nuova" mean?** | CTA-4 | P1 |
| 9 | **The product's real lead-score scale and thresholds**, or confirmation that none is published | D-03, D-04, R-04 | P0 |
| 10 | **A measured response-time figure**, or confirmation that none is published | B-05, B-06 | P0 |
| 11 | **Is the "verified source" for square metres technically enforced?** | K-05, K-06 | P0 |
| 12 | **What does "Paid Acquisition" include as an entitlement?** | A-09, PK-04 | P1 |
| 13 | **Which Daily Assistant questions actually work today?** | §10 entirely | P1 |
| 14 | **Property Experience quotas per package** | K-01, PK-05 | P1 |
| 15 | **Does self-service onboarding exist, and where does it live?** | §14 entirely | P1 |
| 16 | **Confirm the redesign brief supersedes `CLAUDE.md`**, and update it | PT-C1 / C-07 | P1 |
| 17 | **Ratify the interim CTA hierarchy** (Primary: Book a demo) | Site-wide | P1 |
| 18 | **Rotate the exposed credential** recorded in `CURRENT_SITE_AUDIT.md` A-01 | Security | **P0** |

---

## 22. Legally blocked statements

Nothing below may be published until a qualified adviser or an explicit recorded owner risk
acceptance clears it.

| Legal ID | Blocked area | Blocked claims |
|---|---|---|
| **L-01** | Follow-up timing and lawful basis | E-01, E-02, E-03, PK-03 behavioural description, V-08 |
| **L-02** | Reactivation of older contacts | E-04 — highest-risk single capability |
| **L-03** | Image storage | B-09, G-05 |
| **L-04** | Document storage | B-10, G-05 |
| **L-05** | Audio and conversation-content storage | B-11, G-05, V-11 |
| **L-06** | Retention periods | B-08, D-06, D-07, G-01, G-12 |
| **L-07** | Consents; controller/processor roles between NuovaSolution and each agency | A-04b, B-01…B-03, C-06, I-03, O-03 |
| **L-08** | Cross-channel communication | A-03, C-05, E-04 |
| **L-09** | Automated profiling (lead scoring) | D-02, D-03, D-09, R-03, R-04, V-05 |
| **L-10** | AI disclosure to customers | P-04, B-13, V-04 |
| **L-11** | Team performance visibility | I-07, R-08 |
| **L-12** | Property measurement display | K-05, K-06 |
| **L-13** | Incentivised testimonial mechanism | T-03, T-04 |
| **L-14** | **The website privacy policy is materially incomplete** — consent-only basis, no retention period, no AI processing, no automated decision-making, no image/document/audio storage, no third-country transfers, no sub-processors | **Site-wide and launch-blocking** |

---

## 23. Technically blocked CTAs

| CTA | Missing system | Honest interim state |
|---|---|---|
| Start your 14 day free trial | Signup, auth, tenant provisioning, billing | Does not appear |
| Log in | Customer application and its URL | Omitted from the nav, or an explained pending state |
| Talk to Nuova | A definition | Does not appear |
| WhatsApp | A real business number | Does not appear |
| Chat with Nuova | A chat backend | Designed pending panel offering *Book a demo*, or omitted |
| Experience Nuova | A decision: simulation or live | Labelled simulation |
| **Book a demo** | — (**live**) | Ships, with the `href="#"` defect fixed |

---

## 24. Rejected claims currently published on the live website

Recorded so they are not carried into the redesign by reuse.

| Claim (live today) | Why rejected |
|---|---|
| "Always synced to your CRM" | No CRM integration evidenced (F-08) |
| "Each lead is scored from 1 to 100" | Sourced from the website's own simulation (D-04) |
| "Leads above 80 are marked as priority instantly" | Same (D-04) |
| "Replied in < 1 second" | Unverified; contradicted by the `/v2` draft (B-06) |
| "Start for free" / "Empezar gratis" → opens a demo booking | Free-start promise routed to a sales call (T-02) |
| "No setup needed" | Inaccurate for a platform requiring configuration (O-09) |
| "Live Demo" / "in real time" / "AI Analysis" on `/live-demo` | Deterministic client-side logic, no AI, no disclosure (S-01) |
| "Yes. Every real inquiry gets a reply. Only spam is ignored." | Absolute guarantee (B-14) |
| "AI lead automation for real estate agencies in Spain" (footer) | Superseded positioning (P-05) |

---

## 25. Handover to the leading integration chat

**What this instance delivered**

- `PRODUCT_TRUTH.md` — capability truth across 13 domains, each with status category, agency
  experience, customer experience, safe claim, required qualification, forbidden claim, required
  labelling and missing confirmation.
- `CLAIMS_MATRIX.md` — this document: ~140 claim rows with the ten mandated columns plus a verdict.

**The one fact that governs everything downstream**

> **Zero capabilities are in Category 1.** Backend verification was not performed and was not
> permitted under the owner's system-isolation directive. Every capability claim therefore ships
> qualified, or does not ship.

**What the integration chat may proceed with**

- The 13-domain capability architecture as site structure.
- All `APPROVED` and `APPROVED-Q` rows, with their qualifiers attached to the claim.
- The three-package structure and the confirmed baseline (PK-01, PK-03) as **names**.
- *Book a demo* as the working primary CTA, with the A-02 defect fixed.

**What the integration chat must not proceed with**

- Any `OWNER`, `LEGAL` or `REJECTED` row.
- Six of the seven CTAs (§23).
- Every number: prices, limits, quotas, score scales, response times, percentages, counts, spend,
  ROI (§11, §15).
- Every named third-party integration and logo (F-06, F-07).
- Voice as present-tense capability (§9).
- The trial, in any wording, and the extension mechanism (§16).

**What is needed from the integration chat in return**

1. Confirmation that no page composition begins before `COPY_AND_CONVERSION_MASTER.md` and
   `LUXURY_UX_MEDIA_SYSTEM.md` exist — the `MASTER_GOVERNANCE.md` §5 gate now stands at **2 of 4**.
2. A structural commitment that capability status is a **content property**, not hard-coded prose,
   so claims can be re-qualified as evidence arrives without a rebuild.
3. Routing of the 18 owner decisions (§21) and the 14 legal dependencies (§22) to the owner and to
   legal review, as two separate tracks — they unblock different work and move at different speeds.

**Explicitly not delivered**

No website approval. No design decision. No release recommendation. No verification of any backend
capability. No production readiness assessment of anything.

---

**Product truth and claims matrix completed for use by copy, design and implementation. No
production readiness claim made.**
