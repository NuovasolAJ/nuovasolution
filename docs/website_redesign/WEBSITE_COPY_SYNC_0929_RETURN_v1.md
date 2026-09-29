# WEBSITE COPY — return, round 2026-09-29

**State:** `2026-09-29_CONVERGENCE_R2` · **Lane:** Website Copy / Product Truth
**Branch:** `website_enterprise_redesign` · **Written:** 2026-09-29
**Read for this round:** audit `a55878d` (`governance/RECONCILIATION_2026-09-29_v1.md`, copy order C1–C5 and
the 19 external findings in the implementer order), and the handoffs now physically in this repo:
`backend_handoff/handoff_in_2026-09-29/PRODUCT_TRUTH_TABLE_v1.md`, `LEAD_TRUTH_INPUT_v1.md`,
`DAILY_FEATURE_TRUTH_2026-09-28_v1.md`, `3d/3D_FEATURE_TRUTH.md`, `social/META_LEGAL_SECTIONS_v1.md`,
`daily_media/MANIFEST.md`.
**Checked:** the rendered design preview at code `d475dec`, routes `/en`, `/es`, `/en/packages`,
`/es/packages`, `/en/contact`, `/en/trial`, `/en/platform/daily-assistant`, fetched and read as text in
reading order on 2026-09-29.
**Status:** author's record. Not independently reviewed, not legally reviewed.

---

## 1. Signals

```
COPY_DELTAS_0929     = DELIVERED  docs/website_redesign/COPY_DELTAS_0929.md  (44 deltas, D-01…D-44)
MEDIA_CAPTIONS       = DELIVERED  COPY_DELTAS_0929.md §5  (clip headings, 3+1 subtitle cues, 4 still captions)
FAQ_KB_VERSION       = faq-kb-v1.1  (44 questions; 8 answers corrected, Q-41…Q-44 new)
LEGAL_PAGES_FINAL    = v2  marks=24  in 7 distinct gaps, none of them in this lane
COUNSEL_QUESTIONS_0929 = DELIVERED  COUNSEL_PACKAGE_v2.md §7  (CQ-1…CQ-19, plus O-4 in two sentences)
COPY_RENDERED_CHECK  = DONE  COPY_DELTAS_0929.md §6  (7 routes, EN+ES, rendered text in reading order)
```

`LEGAL_PAGES_FINAL = v2 marks=24` is the honest count, not a target. The rule stands: **no page goes live
while a mark is in it.** Six of the seven gaps wait on the owner, on Hosting or on counsel; the seventh is
the publication date the implementer sets at publication.

## 2. Files touched, and nothing re-handed

| File | What happened |
|---|---|
| `COPY_DELTAS_0929.md` | **new**, and the only new file: 44 string deltas with route, key, rendered before, EN, ES and the evidence line |
| `PRODUCT_FAQ_KB_v1.md` | revised to `faq-kb-v1.1` in place |
| `LEGAL_PAGES_FINAL_v1.md` | revised to **v2** in place, so one file stays the authority |
| `COUNSEL_PACKAGE_v2.md` | §7 added: the bundled counsel list and the O-4 comparison |
| `LAUNCH_COPY_v1.md` | one amendment pointer at §1; the register itself is not rewritten |

Already delivered texts are **not** re-handed. `LAUNCH_COPY_v1.md` §2 to §9, `PRODUCT_TEXTS_C3_v1.md` and
`AUTH_COPY_v1.md` stand unchanged except where a delta names the key.

## 3. What the truth sheets changed, and it is not cosmetic

The three lane sheets arrived after my last round, and two of them contradict claims that are **live on the
preview right now**. This is the substance of this round.

**Qualification and priority are not publishable.** `le_qualification` is **staging only, not present in
production** (`LEAD_TRUTH_INPUT_v1` §1), and no lane asserts a priority value in production. The rendered
preview claims one in eleven places: the hero lead, the record card's "Priority: high" and
"Qualification / Qualified, ready to view", the journey step "Prioritised", the section "Recorded and
prioritised", the card "One record, one priority" with "Cold, warm or hot", the four-row leads table with
its High/Medium/Low chips and "ordered by priority", the nav line "Qualifies and prioritises each enquiry",
and the plan feature "Qualification and priority on every enquiry". All eleven are replaced in §2 and §3 of
the deltas with what production does hold: `lead_memory` with preferences, budget and language, `leads`,
`contacts`, `dg_task`, `events`.

**The journey now ends where the proof is strongest.** Daily's sheet certifies its own sentences:
a viewing request or callback becomes a task with the customer, the property and the time they asked for;
each person sees their own list; one tap takes it and one closes it; the card names who took it; nobody can
take it twice. All in production, owner-tested. So the four steps become **Answered · Recorded · Handed over
· Done**, which also answers the assignment's "Mitarbeiterhandlung" with the part we can prove.

**The Daily page described a product that does not exist in production.** It said "the assistant lists the
leads whose priority rose overnight and explains, for each one, what changed". Daily row 11: a chat
assistant is **NO in production**, staging only. Replaced by the claim flow (D-36), and the menu label
stops calling it an assistant (D-37), which is exactly what Daily asked for.

**Laura confirmed availability she cannot confirm.** The reply read "yes, the flat is still available".
There is no connected property source for a customer and property suggestions are off in the pilot, so the
assistant cannot confirm availability, and `LEAD_TRUTH_INPUT_v1` §5 says it never confirms an appointment
either. Rewritten in D-10, and the demo person, reference and time now match the real Daily captures
(Laura Serrano, REF-DEMO-204, Thursday morning), so the site and the clip cannot contradict each other.

**The trial wording is released.** `PRODUCT_TRUTH_TABLE_v1` §G: the trial carries the Essential scope for
14 days as of 2026-09-28. So Essential gets the trial chip and the "Try Essential free" CTA, and Growth and
Scale get neither (D-20 to D-23).

**The plans look identical because they are.** The entitlements that separate Essential, Growth and Scale
are the hidden ones: advanced reporting, Voice, structured feed, campaign intake. Rather than invent a
feature ladder, the page now says what is true: the same working parts today, different size. The
"CRM connections 1 / 3 / 10" limit comes off the public page entirely, because externally nothing is
connected for a customer, 0 inbound events have been processed, and a connection count would advertise an
integration that has never run for an agency.

## 4. Where I went beyond the order, and why

| # | Item | Reason |
|---|---|---|
| 1 | The privacy and deletion pages now cover **Instagram only**, not "Instagram or Facebook" | Social's own delimitation D2: Facebook pages and advertising lead forms use a different login with different permissions and belong to another lane. A page naming Facebook would describe a connection we do not have. Flagged to Social in `LEGAL_PAGES_FINAL` §6 |
| 2 | Social's deletion deadlines, 72 hours and 30 days, are **not** in the page | Social itself writes they need counsel and must not be promised before the path is served. No social deletion path has run. They are now CQ-13 |
| 3 | The contact address stays `antonio@nuovasolution.com`, not `privacy@` | Social flags the risk itself: an address that does not exist is a review risk. One search and replace closes it if the owner creates the alias |
| 4 | The CRM page gains a limitation sentence (D-39) | "there is no automatic person merge across channels today" is, in Lead's own words, "worth stating plainly". A customer who discovers it in week two discovers it as a defect |
| 5 | The footer's "operating layer" line is replaced on every page (D-40) | the assignment asks for less abstraction, and the sentence appeared on all seven routes I read |

## 5. What is fixed, and what is still mine to check

WR-33 and WR-34: the Reviewer has confirmed them closed on the current state, which matches what I
reported on 2026-09-28 from the code. No further action from this lane.

Still mine, and not claimable yet: whether the rendered result reads well after these deltas. The deltas
remove five blocks and shorten fourteen, and the numbers I can give are text numbers, not visual ones (284
text blocks EN, 282 ES before the change; `home.hero.h1` 30 characters in ES; longest card line 148). Once
the implementer has built the deltas I read both languages on the preview again, on the new commit, and
report the second pass. That is the part of the assignment I can only finish after the build.

## 6. Hard blockers and what each one blocks

| # | Item | Who | Blocks |
|---|---|---|---|
| 1 | O-6 legal form, NIF, address | Owner | all four legal pages, invoices, Meta business verification |
| 2 | O-8 retention per data class | Owner, then counsel | the retention section and any answer about how long data is kept |
| 3 | `SUBPROCESSOR_LIST_v1` | Hosting | the processor list's completeness and the transfer statement. **Requested in this round** |
| 4 | O-7 prices and the billing period | Owner, then API | every amount, and the period the comparison needs |
| 5 | CQ-2, the pilot's disclosure version | counsel, then Owner | a third party agency's e-mail replies |
| 6 | CQ-16, the web channel notice | counsel | the public question box |
| 7 | Whether a priority or qualification value exists in production at all | Lead | if it does, five deltas can be reopened as a real claim. Until then they stay removed |
| 8 | Whether the catalogue's lead caps (750 / 3000 / no cap) are commercial limits or staging placeholders | API | they render today as hard numbers on a public page |

## 7. What I did not touch

No application code. Every delta is applied by the Website Implementer, in the dictionaries,
`capabilities.ts`, `plans.ts` and the media manifest. No other lane's documents, no lane's status file, no
git history change, no push, no merge, no deployment. No n8n, Supabase, webhook, credential or product API
request: the previews were read as public pages over HTTPS, GET only, and nothing was submitted on any
form. The working tree also holds the implementer's and the reviewer's concurrent work; none of it is
staged by me.
