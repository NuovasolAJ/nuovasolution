# WEBSITE COPY — return, round 2026-10-13 (R17)

**State:** `2026-10-13` · **Lane:** Website Copy / Product Truth
**Branch:** `website_enterprise_redesign` · **Commit:** `4c4ae95`
**Read:** `AUDIT_TO_LANES_2026-10-13_R17.md`, `LAUNCH_GATE_v1.md` R17-1 and R17-5,
`DAILY_SYNC_1012_RETURN_v1.md` §5, `LEAD_LANGUAGE_AND_CROSSCHANNEL_STATE_1012_v1.md`,
`PRODUCT_TRUTH_TABLE` v1.1.
**Status:** author's record. Not independently reviewed, not legally reviewed. **No website check and no
design round**, as instructed; the website follows the named build after 15.10.

---

## 1. Handovers

```
TEXTS_1013.md   sha256 115c9ff850ee22524dac8efb6c0d4f9c6bea603f29ac6084116c265140bac4cf
  §1 MAIL_SHELL_v1, the morning letter ES/EN        → Daily, Hosting
  §2 the hold case and the three options E18        → Lead
  §3 E22, the WhatsApp template wording             → Social
  §4 the language and channel lines                 → the build after 15.10.
  §5 received / answered / delivered                → Lead, API
  §6 Supabase, and what it does not settle          → legal, through this lane
  §7 the company details, one line                  → Owner, with Social

META_LEGAL_TEXT_FINAL.md  sha256 6c08e7f595a6733d25371458c3bac1262c7b3c3de9d278979288808d9faf7581
  §5c updated to the new Supabase state
```

Acceptance condition for each: the receiving lane reads the section addressed to it and says whether a
field named there does not exist. **Nothing in these texts is a release**, and none of them has been seen
by a reviewer.

## 2. The morning letter is bound to the envelope, not to a layout

It renders from `dg_task_evidence/v3`, block `summary` with `kind · customer · request · state ·
headline`, plus `dg_day_answer`. Every slot the order named is written in both languages: EYEBROW,
SUBJECT in three cases, GREETING, SUMMARY, FIGURES as the task list with its reason, NEXT_ACTION, BUTTON,
FOOTER, and a zero state that is three sentences rather than an empty list.

**It names no appointment.** In production `dg_asst_schedule` does not exist, and the product's own answer
is "I cannot read that yet" rather than "no appointments". A letter that implied a calendar would claim
something the product deliberately refuses to claim.

**The reason comes from `summary.headline` or it is absent.** If the envelope carries no reason, the row
is listed without one. A ranking the mail invents is worse than a missing line, because the reader would
act on it.

Phone numbers carry the plus sign, because a number in a morning letter is tapped, not read.

## 3. The hold case: the sentence an agency can act on

Task title, task sentence, the short reason and the morning-letter line are in §2 of the texts, with the
draft offered for a person to use. Two things are stated rather than implied:

**A held send is not a hot lead.** Different reason, different urgency, and under R17-2 its own event. If
the same enquiry is also hot, that is a second signal, not a re-use of this one.

**Option B carries the sentence the agency should read before choosing it:** their customer wrote in
another language and will be answered in Spanish. Whether that is wise is the agency's call. It must not
be a surprise, and the setting is the only place where it can be said in time.

## 4. The WhatsApp templates say what category they are

The follow-up is **marketing**, it is submitted as marketing, and the unsubscribe line exists because
marketing needs one rather than as evidence that an opt-in happened. Calling it a utility message because
it is useful is exactly the move that gets a number restricted.

**The opt-in is a record that has to exist before the send.** No wording creates it, and §3 says so in the
section rather than in a footnote, because the wording is where the temptation lives.

## 5. The language claims, with the distinction that matters

Both blanket statements are wrong, and the order is right to name them.

**"Only Spanish"** is wrong about the **capability**: the language rule is in the production agent
`6f4740f2`, and es/en/de/it were exercised on staging in battery B, 8/8. **It is right about what may be
sent**: one approved notice, one language, one tenant.

**"Every language"** cannot be derived from those runs, because they used **test notices created for the
run** (`vSTAGING-TEST-{en,de,es,it}-2026-09`). A test notice proves the switch, not the permission.

So the honest line is neither: *the system replies in the customer's language; what is missing for other
languages is the legal approval of the notice, not the capability* — and, today, we answer in Spanish, and
an unapproved language is held with a task rather than answered. **Voice gets no line at all** until Voice
delivers its capability table: the approval covers WhatsApp and e-mail, voice is not an approved channel,
and guessing on another lane's behalf is how a wrong claim gets published. Six lines, each with its
channel, its version and its evidence, are ready for the build after 15.10.

## 6. Received, answered, delivered

Three different things, and the weekly report keeps them apart under R17-5. **The delivered line does not
render at all today**, because the `reply_delivered` event with a provider reference is still to be built.
An answered count printed as a delivered count is precisely the number an agency would act on and that we
cannot stand behind. A held turn counts as received, never as answered; an aborted run counts as nothing.

No revenue, no saved time, no advertising results, no conversion rate. The benefit is shown by naming
what happened: enquiries arrived, how many were answered, viewings asked for, tasks closed, what is still
open. All of it measured, none of it invented.

## 7. Supabase, corrected rather than left stale

**Pro is active and database backups are visible.** That is a real improvement on the state this lane
described on 2026-10-12, and the legal file says so now.

**It settles none of these three**, and the text does not imply otherwise: storage is not the database, so
a lost document is still lost; a visible backup is not a tested restore, and nobody has restored anything;
and the backup window is now **part of** the retention decision rather than a separate question, because a
backup that keeps what the rule deletes makes the published period false.

## 8. Open decisions, unchanged and genuinely open

| # | Decision | Who | Consequence of leaving it |
|---|---|---|---|
| 1 | Retention of the message texts: A, B or C, **with** the backup window | Owner | the privacy section keeps saying nothing is on a timer |
| 2 | Storage backup and one tested restore | Owner, on API's figure | no recovery sentence may be written at all |
| 3 | The company details, one line | Owner, asked with Social | legal notice, invoices and the Meta verification stay open. **Nothing is invented meanwhile**: no company name, no register entry, no legal form appears anywhere |
| 4 | Legal approval of a second language's notice | Owner and lawyer | de/en/it stay held rather than supported |
| 5 | `REPORTING_CONTRACT_v2` per field | Lead | the weekly mail renders only the fields that arrive |

## 9. For the next named build, collected rather than chased

The thirteen deltas of `CLAIMS_CHECK_1012.md` and the six missing state lines of the story A to F are
**not re-sent**. They are waiting for the build after 15.10., and only the sentences they touch and the
legal pages need checking then, not the site again.

## 10. What I did not do

No website check, no design round, no acceptance. Nothing already delivered was reworked without a changed
basis: `CLAIMS_CHECK_1012`, `WEEKLY_REPORT_MAIL_v1`, `COPY_HERO_1003` and `COPY_DELTAS_1003` stand as
they are, and the only edited file is the legal one, where Supabase changed under it.
