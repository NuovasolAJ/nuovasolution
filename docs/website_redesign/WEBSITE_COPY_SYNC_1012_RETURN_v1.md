# WEBSITE COPY — return, round 2026-10-12 (R16)

**State:** `2026-10-12` · **Lane:** Website Copy / Product Truth
**Branch:** `website_enterprise_redesign` · **Written:** 2026-10-12 · **Commit:** `47b4236`
**Read:** `backend_handoff/handoff_in_2026-10-12/AUDIT_ORDERS_2026-10-12.md`, the R16 lane orders in the
system repo, the master order 1010 and `HANDOFF_1010_PAUSE.md`, the texts of `08ecf9c` at HEAD `2561247`.
**Measured myself:** the live legal pages, again, today.
**Status:** author's record. Not independently reviewed, not legally reviewed. No second design round was
started and no design question is touched.

---

## 1. Signals

```
CLAIMS_CHECK_1012     = DELIVERED  docs/website_redesign/CLAIMS_CHECK_1012.md
                        13 deltas D-94…D-106, EN+ES, each against a matrix row
                        plus 6 missing state lines for the story A to F
WEEKLY_REPORT_MAIL_v1 = DELIVERED  docs/website_redesign/WEEKLY_REPORT_MAIL_v1.md
                        subject in 4 cases, body, zero state, "not measured", button, trial rule
META_LEGAL_TEXT_READY = NO — one technical point and two owner decisions (§3)
                        file   docs/website_redesign/META_LEGAL_TEXT_FINAL.md
                        sha256 e55c647208ea7c3b89d572359ca77b0b7c8b5d9de0f2dcdad6f079b5f147bf0e
                               (identical for the git blob and the working copy this time)
                        placeholders 0
META_LEGAL_PAGES_LIVE_VERIFIED = NOT RUN — nothing is published (§4)
```

**A finished text is not a live-page PASS, and these two signals stay apart on purpose.** The second one
can only be earned by reading the published page.

## 2. The claims check: what the texts of `08ecf9c` claim, and what the matrix carries

**The finding that matters.** The five scenes carry a state line. The **story A to F carries none**, and
four of its six chapters show things the matrix puts in preparation: the property match, the assistant
that explains the order, the follow-up and the weekly report. Written in the present tense without a
state line, that is the target product sold as today's. Every chapter now gets the same two words the
scenes already teach the reader, and chapters A and D get a split line because half of each is real.

**Thirteen sentences go beyond the matrix.** The ones worth naming here:

- **"in her language" and "to each customer in their language"** — production answers in **Spanish only**.
  The hero said it directly above its own caption that says "Today in Spanish". That is the "every
  language" claim the order names, in the two places it actually occurs.
- **"a task with a priority"** in chapter D — the priority claim was removed everywhere on 2026-09-29
  because `le_qualification` is staging only. It came back in the story.
- **"Would 10 or 12 suit you better?"** — naming two hours says those hours are free, and no calendar is
  connected. Asking which **part of the day** suits keeps the owner's warmer, more concrete reply from
  2026-10-06 and asserts nothing.
- **the phone and a web form as channels we connect**, including "we set up the phone assistant's number
  and your hours" — there is no production number, and stored hours steer nothing.
- **"your leads sync with what you already use"** for HubSpot, Pipedrive, Zoho, Salesforce — nothing is
  connected in production. Google Sheets, which **does** run one production workflow, was buried in the
  same sentence as the four that do not. They are now two states in two sentences.

**"Try Essential free"**: replaced where it needs prior knowledge, kept where it does not. The general
calls to action are already free of the package name; the packages page headline is not, and that is the
one that changes.

## 3. The legal state, corrected rather than carried forward

**A deletion has been observed.** My file said on 2026-10-07 that none ever had been. Run **138217 at
13:15:06Z** removed a record whose thirteen day target had passed, so the path from "due" to "gone" has
been walked end to end. **On staging.** In production the path does not exist at all. The two now sit in
one small table in the file so nobody reads one as the other, and the old sentence is gone rather than
softened.

**The fifteen minute schedule is no longer an unconditional promise.** A clock every fifteen minutes is
not an operating guarantee, and a failed run or an interrupted service would break the promise at the
worst moment. Both languages now say that in normal operation the identifier is gone within fifteen
minutes, and that if a run fails or the service is interrupted, the next successful run removes it.

**Retention is three things, and only one is undecided:**

| What | State |
|---|---|
| the message texts | **undecided.** Three options in §5b with purpose, period, deletion route and effort |
| the reply identifiers | **decided and built:** 7 days, 24 hours, the clock, the salted value afterwards |
| the backups | **undecided, and it can quietly undo the first one.** Point in time recovery is off, nothing restorable is listed, no restore has ever been tested. Three options in §5c; **API supplies the cost figure** |

The backup question is in the file because a retention period that a backup outlives is not the real
period, and that gap is the first thing an authority asks about. My view, and it is only that: option C
for the texts and option 2 for the backups, with the recovery window set to the retention period so the
two cannot contradict each other. **Whether any of them meets the legal standard is the legal review**,
listed as CQ-8 and CQ-21, and nothing here anticipates it.

**Scope, so the section is not read as an offer:** Instagram runs on staging only and is not in the pilot,
no Facebook connection exists or is described, and there is no automatic deletion route over Meta. The
section is conditional in its first line, which is correct for the review and is not an announcement.

## 4. The live pages, measured again today

| URL | Status |
|---|---|
| `/privacy-policy`, `/politica-privacidad` | 200, and still **no Instagram section** |
| `/terms`, `/data-deletion`, `/eliminar-datos` | **404** |

Unchanged since 2026-10-07. Of the three URLs Meta is given, one answers. **This is why
`META_LEGAL_PAGES_LIVE_VERIFIED` is NOT RUN and cannot be earned by any text file.**

## 5. The two signals, with conditions anyone can check

**`META_LEGAL_TEXT_READY` flips when all three hold:**

1. Hosting reports the purge path **in production**, with one observed deletion there, not on staging.
2. The owner names A, B or C for the message texts, and the mechanism is built. The sentence changes from
   "today nothing is on a timer" to the rule **after** it runs, not before.
3. The owner names 1, 2 or 3 for the backups on API's cost figure, and the window does not outlive the
   retention period chosen in point 2.

Nothing else in the texts waits on anything. When the three close, one paragraph is deleted and the file
is ready as it stands.

**`META_LEGAL_PAGES_LIVE_VERIFIED` flips when I have read the published pages and all of this is true:**
the Instagram section is on both privacy pages, `/terms`, `/data-deletion` and `/eliminar-datos` answer
200, the deletion page names the controller and links a privacy page that **answers** (the ES link was
pointing at a 404 until I fixed it), the EN and ES versions carry the same substance, and the sentences
match the file at the checksum above. Publication goes through the existing website and hosting route and
**does not wait for the 3D finish**; those are unrelated chains.

## 6. The company details: one request, one line, once

Still missing from the published pages: the **tax number** and the **house number with postal code**.
Coordinated with Social so the owner is asked **once**, not by two lanes:

> `FIRMENANGABEN = <Rechtsform>, <NIF/CIF>, <Straße und Hausnummer>, <PLZ> <Ort>, <Land>`

Everything in that line ends up published in the legal notice, so it needs no secret channel. The one
thing that does: **the official document Meta's business verification compares the entry against** must
go through the secure store, never through a chat. **These details are still not needed for the three
Meta texts** (§4 of the file explains why per field); they are needed for the legal notice, the invoices
and the verification.

## 7. Open decisions that are genuinely open

| # | Decision | Who | Consequence of leaving it |
|---|---|---|---|
| 1 | Retention of the message texts: A, B or C | Owner | the privacy section keeps saying nothing is on a timer, which is true and weak |
| 2 | Backups: 1, 2 or 3, on API's cost | Owner | a published period that a backup may outlive |
| 3 | The company details, one line | Owner | legal notice, invoices and the Meta verification stay open |
| 4 | Is billing monthly? `packages.perMonth` renders "per month" with no amount and no stated interval | API | a billing fact on the page that no lane has confirmed |
| 5 | `REPORTING_CONTRACT_v2` per field | Lead | the weekly mail renders only the fields that arrive; the wording is already written for any answer |

## 8. What I did not do

No design work and no second design round. No publication, no acceptance, no reviewer verdict. I did not
set `META_LEGAL_TEXT_READY` on a staging deletion, and I did not write a retention period that nobody has
decided and nothing enforces. The live pages were read with GET over HTTPS; nothing was submitted.
