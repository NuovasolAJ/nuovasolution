# WEBSITE COPY — return, round 2026-09-30

**State:** `2026-09-30` · **Lane:** Website Copy / Product Truth
**Branch:** `website_enterprise_redesign` · **Written:** 2026-09-30
**Read for this round:** `governance/AUDIT_MASTER_2026-09-30_v1.md` (copy order, four tasks) and the inputs
in `backend_handoff/handoff_in_2026-09-30/`: `PRODUCT_TRUTH_TABLE_v1.md` (v1.1),
`HOSTING_SUBPROCESSORS_2026-09-29_v1.md`, `WEBQA_BACKEND_READY_2026-09-29_v1.md`,
`MEDIA_RETENTION_TEMPLATE_v1.md`.
**Checked:** code `3c38f8d` on **both** previews, `/en`, `/es`, `/en/platform`, `/en/trial` on design and
`/en`, `/es` on staging, fetched 2026-09-30 and read as text in reading order.
**Status:** author's record. Not independently reviewed, not legally reviewed.

---

## 1. Signals

```
COPY_RENDERED_CHECK_2 = docs/website_redesign/COPY_DELTAS_0930.md §1   on commit 3c38f8d
COPY_DELTAS_0930      = DELIVERED  §2, D-45…D-53 (9 deltas, EN+ES, each with route, key, before, evidence)
FAQ_PAGE_COPY         = DELIVERED  §3, 26 questions in five groups, EN+ES, no contact promise
MEDIA_CAPTIONS        = DELIVERED  §4, before → action → result, three cues plus one optional
FAQ_KB_VERSION        = faq-kb-v1.2  (47 questions; Q-13, Q-40 and two states lose the contact promise; Q-45…Q-47 new)
LEGAL_PAGES_FINAL     = v3  marks=20  in six gaps (was 24 in seven); the four subprocessor marks are closed
PHONE_SOCIAL_PREPARED = §6, held until VOICE_REAL_CALL_E2E and one real provider run per permission
```

`COPY_RENDERED_CHECK_2` is on `3c38f8d`, which is the commit the Reviewer is checking. If the implementer
ships the deltas on a new commit, the check is repeated on that one; it is cheap, because the extraction is
scripted.

## 2. The rendered check, in one paragraph

Eight of the ten items I was asked to check are either clean or corrected by a delta. **Clean and worth
saying plainly:** every qualification and priority claim from 2026-09-29 is gone from both languages, the
record now reads "Asked for / Wants to view / Writes in / Next", the journey reads Answered · Recorded ·
Handed over · Done, Daily is a task surface with no chat and no staff login, Outlook is named nowhere, and
Social is absent. **Corrected by a delta:** the hero's absolute, the "nothing is handed between tools"
claim, the platform page's "operating layer" and its cross-channel record claim, the phone sentence sitting
under "On request", the 3D text's missing input and check, the Q&A fallback that promises a person, and two
onboarding items that imply an effect they do not have.

## 3. The four things that changed a claim, not a wording

**The hero.** "No enquiry waits until Monday" is an absolute over all enquiries, and the reply path is held
today. D-45 replaces it with the mechanism: **"Answered when it arrives, not when someone is free"** ·
**"Respondida cuando llega, no cuando alguien tiene tiempo"**. It is the same promise the product actually
makes, it carries no number and no quantifier, and at the hero's 16 character column it keeps the three to
four line shape the design has now. The visual direction is untouched.

**"Nothing is handed between tools" was false.** The Google Sheets export is one active production workflow
that hands a copy of every lead to another tool. D-46 says what is true instead: the conversation, what the
customer asked for and the task sit on one record.

**Opening hours and the calendar steer nothing.** `PRODUCT_TRUTH_TABLE` v1.1 §G is explicit: branding,
language, the disclosure and the tenant row steer production behaviour; calendar, opening hours, social and
the Q&A settings are stored and steer nothing. The home page offered "Your opening hours — Done" as part of
going live and named the calendar in the setup step. D-51 removes both, and the new Q-46 answers the
question directly: a text enquiry is answered whenever it arrives, and the hours will steer the phone
assistant, which is being built.

**The phone read as purchasable.** The sentence sat under the heading "On request", beside the 3D service,
which is orderable. D-48 moves it under **"Being built"** and says in the sentence itself that it is not
part of what you can order today. That is the point the assignment made, and it also removes the risk on
the later customer page.

## 4. Two findings I was not asked for

**The staging preview answers visitors from a stale knowledge base.** `WEBQA_BACKEND_READY` records
`kb_version = faq-kb-v1.0` applied on staging, byte-identical to my file of 2026-09-28. That version still
answers that every enquiry carries a priority of cold, warm or hot, that the phone assistant can be shown
on request, and that a person answers where data is stored. All three were corrected in v1.1 and again in
v1.2. The staging preview has no "no assistant is connected" note, so the assistant there does answer. So
the wired assistant is wrong on exactly the questions the rendered page no longer gets wrong. Nothing on a
public surface may answer from a row older than `faq-kb-v1.2`, and that is now the first item in §7 of the
deltas.

**The two previews carry different bands, correctly.** Design says nothing you enter creates an account;
staging says accounts and data are for testing and may be reset. On staging a form really does create
something, so the wording must stay different. Recorded as a note, not a delta, so nobody "harmonises" it.

## 5. Legal v3

Section 6 now names all seven services in the customer path with what each receives and where it runs:
Hetzner Online (Germany, verified), Supabase (European Union, Frankfurt, verified), Meta for WhatsApp,
Google for Gmail, OpenRouter for the model routing, OpenAI for transcribing a voice message, and Google
Sheets as the optional lead export. Two locations are stated as **verified by us** and the rest as
**declared by the provider**, because Hosting verified exactly two and warned this lane not to turn a
declaration into a promise. Section 10 names the four that may process outside the European Economic Area
rather than describing the case in general. HubSpot, Pipedrive, Zoho, Salesforce and Outlook are **not**
named as processors: they are wired but have never run for a customer, and naming them would invent a data
flow.

**Marks: 20, in six gaps** (v2 had 24 in seven). The four subprocessor marks are closed. What remains:
`⟦OWNER: NIF⟧` 6, `⟦OWNER: ADDRESS_FULL⟧` 4, `⟦OWNER+COUNSEL: RETENTION⟧` 2, `⟦COUNSEL: DPA⟧` 2,
`⟦COUNSEL: LIABILITY⟧` 2, `⟦publication date⟧` 4. The rule is unchanged and is in the file: **no page goes
live while a mark is in it.** Two counsel questions are new: CQ-20 on the transfer basis and CQ-21 on
retention now that the template exists.

## 6. Hard blockers

| # | Item | Who | Blocks |
|---|---|---|---|
| 1 | `WEBQA_KB_ROW = faq-kb-v1.2` | Hosting with API | any public Q&A surface. Until then the static FAQ of §3 is the surface |
| 2 | O-6 legal form, NIF, address | Owner | all four legal pages, and with them the Meta chain |
| 3 | O-8 retention per class, on the template that now exists | Owner, then counsel | the retention section |
| 4 | O-7 prices and the billing period | Owner, then API | every amount. The catalogue reports `awaiting_pricing_authority` |
| 5 | CQ-2, CQ-13, CQ-16, CQ-20, CQ-21 | counsel | the pilot's e-mail channel, two sentences on the deletion page, the question box, the privacy page |
| 6 | `VOICE_REAL_CALL_E2E` with an approved spoken notice | Voice, Owner, counsel | §6.1, the phone text |
| 7 | One real provider run per requested permission | Social | §6.2, the social text |
| 8 | Whether a priority value exists in production at all | Lead | the five deltas of 2026-09-29 stay removed |

## 7. What I did not do

No design change and no design proposal: the only structural request is D-52, which is the order of two
existing blocks on the platform page. No application code. No new document series: one new file
(`COPY_DELTAS_0930.md`), two revisions in place (`PRODUCT_FAQ_KB_v1.md` to v1.2,
`LEGAL_PAGES_FINAL_v1.md` to v3), one addition to the counsel package, and this return. No already delivered
text is handed over again without a change.

I did **not** submit anything to the staging Q&A endpoint to test the assistant's answers. That is a product
service, and this lane reads pages over HTTPS with GET and nothing else. The knowledge base version there is
established from `WEBQA_BACKEND_READY`, which states it.
