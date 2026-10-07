# WEBSITE COPY — return, round 2026-10-07 (R13b)

**State:** `2026-10-07` · **Lane:** Website Copy / Product Truth
**Branch:** `website_enterprise_redesign` · **Written:** 2026-10-07
**Inputs read:** `governance/HOSTING_SYNC_1007_RETURN_v1.md` §5 (the purge schedule), the audit records of
2026-10-07 R13 and R13b, and my own `2b691cd` with its two variants.
**Measured myself:** the live legal pages, 2026-10-07, listed in §4.
**Status:** author's record. Not independently reviewed, not legally reviewed.

---

## 1. Signals

```
META_LEGAL_TEXT_READY = NO — three named points, none of them a wording question

  file   docs/website_redesign/META_LEGAL_TEXT_FINAL.md          commit 1ec40cf
  sha256 (git blob, LF)      4643ccbcae68ce184c71347da8d33894d16a755e2d2a88bb0971b868b14c01bc
  sha256 (Windows checkout)  5d355b8dd3bf27c2ccdf195cc08741df14e8fb1a02e96b955b262b4617d02f6f
  placeholders               0
  open 1  the clean-up clock runs on staging; a public text describes production
  open 2  no deletion has ever been observed (PURGE_DELETION_PROVEN, Hosting and Social)
  open 3  the owner's retention decision for the message texts (§5b, three options)

META_LEGAL_PAGES_LIVE_VERIFIED = NOT RUN — the targeted publication has not happened yet (§4)
```

## 2. The clean-up sentence now matches what is built

Hosting reported `REPLY_TARGET_PURGE_SCHEDULED = 1UVIZepbuUU1I7Rw`: every **fifteen minutes**, calling
`sg_reply_target_purge_due()` and nothing else, first run 135818 at 19:57:32Z, `purged 0, tenants 0`.

So the architecture is a clock, not a deletion at the exact end of the window, and the text says so in both
languages: the identifier is gone **at the latest fifteen minutes** after the period ends, and **if a run
is missed the next one removes what was due**. That second half is in the text deliberately: without it a
missed run reads as data kept for ever.

**Why the signal is still withheld, in two sentences.** The clock runs on staging, and a public text
describes production. And the first run had nothing due, so the path from "due" to "gone" has never been
exercised once; `purged 0` is the correct answer to an empty queue, not evidence that deletion works. When
both close, one paragraph is deleted from the file and it is ready as it stands. If the production interval
differs from fifteen minutes, the number in two sentences is the only thing that changes.

I note Hosting's own finding with respect, because it is the reason this lane will not take a schedule as a
proof: their log node read a permission-denied object as `purged: 1`. A schedule that reports a deletion it
never made is exactly the thing a legal text must not be built on.

## 3. The message texts: the rule was written as a policy, and nobody had chosen it

The section said comments, messages and the leads from them are kept "for as long as your agency's account
exists, unless you ask us to delete them earlier". That reads as a decided policy. It is not one. It is
what happens because production carries **zero** retention policy rows, so nothing is on a timer.

The text now says that plainly in both languages, and promises that a period will be stated before it
starts to apply. **Three options are in §5b of the file** for the owner, each with the sentence it
produces, what has to be built, and what it costs:

| | Rule | The real cost |
|---|---|---|
| **A** | keep while the account exists, delete on request | nothing to build. The weakest position on storage limitation: somebody who wrote once is kept indefinitely because an agency stayed a customer |
| **B** | a fixed period after the last contact, for example 24 months | the strongest on paper, and the cost lands on the **agency**: a buyer who returns after the period is a stranger again, and in this market people do return after years |
| **C** | tied to the relationship: deleted a set time after the agency's account ends, with an agency override | the middle, and the one whose cost lands on **us**: it needs an offboarding deletion that actually runs, which nobody has tested |

This lane's view, and it is only that: **C**. It matches how the data is actually used, it does not take an
agency's history away, and its cost is ours rather than the customer's. **A must not be published as a
chosen policy, because nobody chose it.**

What the audit is asked for: the owner's line naming A, B or C and, for B or C, the number. Then the
mechanism is built, and only then does the sentence change from "today nothing is on a timer" to the rule.

## 4. The live pages, measured today

| URL | Status | Instagram mentions |
|---|---|---|
| `https://nuovasolution.com/privacy-policy` | 200 | **0** |
| `https://nuovasolution.com/politica-privacidad` | 200 | **0** |
| `https://nuovasolution.com/legal-notice` | 200 | — |
| `https://nuovasolution.com/aviso-legal` | 200 | — |
| `https://nuovasolution.com/terms` | **404** | — |
| `https://nuovasolution.com/data-deletion` | **404** | — |
| `https://nuovasolution.com/eliminar-datos` | **404** | — |

This confirms Social's reading of 2026-10-06 one day later, and it tells the implementer exactly what the
targeted publication has to do: put the Instagram section into the **two** privacy pages that already
exist, and add the three pages that do not. Meta is given three URLs, and today one of them answers.

**A defect of my own, found by measuring instead of assuming.** The deletion page linked the Spanish
privacy notice at `/aviso-de-privacidad`, which is a 404. The published Spanish page is
`/politica-privacidad`. Corrected in this commit. A legal page whose own link is dead is the first thing a
platform reviewer clicks.

## 5. Hard blockers

| # | Item | Who | Blocks |
|---|---|---|---|
| 1 | `PURGE_DELETION_PROVEN`: one record due, one run, the record gone | Hosting, Social | `META_LEGAL_TEXT_READY` |
| 2 | The same clock running against production | Hosting | the same |
| 3 | The retention decision A, B or C, and the number | Owner, through Audit | the same. It is the only one of the three that needs a person rather than a run |
| 4 | The targeted publication of the three pages and the two sections | Implementer | `META_LEGAL_PAGES_LIVE_VERIFIED`, and after it Social's `META_LEGAL_PUBLIC` |
| 5 | O-6 tax number and complete address | Owner | the legal notice, invoices, business verification. **Not** these texts |

## 6. What I did not do

No design work. No publication and no acceptance. I did not set `META_LEGAL_TEXT_READY` on a schedule that
has never deleted anything, and I did not write a retention period that nobody has decided and nothing
enforces. The live pages were read with GET over HTTPS; nothing was submitted anywhere.
