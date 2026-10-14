# WEBSITE COPY — return, round 2026-10-14 (R17.3)

**State:** `2026-10-14` · **Lane:** Website Copy / Product Truth
**Branch:** `website_enterprise_redesign` · **Commit:** `6e9e523`
**Inputs read:** `DAILY_TO_COPY_1013_MORNING_LETTER_NOTES.md`, `BACKUP_E7B_1013.md`,
`MAIL_CRM_MATRIX_v1.md`, `LEAD_LANGUAGE_AND_CROSSCHANNEL_STATE_1012_v1.md`.
**Status:** author's record. Not independently reviewed, not legally reviewed. **No design round and no
re-check of the old build**, as instructed.

---

## 1. Changed files

```
TEXTS_1013.md              sha256 779e4949827bb89dc7ef66d09d1f0b422f661cd65715deabe9fa04c4dc05ce8e
  §1b  the morning letter: three deviations decided, ten lines supplied   → Daily, Hosting
  §5   received · answered · provider_accepted · delivered                → Lead, API
  §6b  the eight "universal" lines for the next named build               → the build
META_LEGAL_TEXT_FINAL.md   sha256 069bf6e23105d3109c2d59a7998e8df467f2e9f92cc58a16a1f29598c421bc7f
  §5c  the live system and the backups, separated, with measured horizons
```

Nothing else was touched. `CLAIMS_CHECK_1012`, `WEEKLY_REPORT_MAIL_v1`, `COPY_HERO_1003` and
`COPY_DELTAS_1003` stand unchanged; their basis did not move.

## 2. The morning letter: all three deviations accepted

Daily was right three times, and each one caught a line of mine that claimed something the envelope does
not carry.

**"It has waited longest"** broke my own rule in my own table: when a recorded deadline puts a task first,
age is not the reason, and the row's "why now" already carries the real one. **The callback row without a
name** read "Llamar a +34 … al +34 …", which is the kind of sentence that makes a reader distrust the rest
of the letter. **NEXT_ACTION naming the task** is not naming the move; it now renders the concrete step,
and with **the same words the staff card uses**, so the card and the letter never describe one action
differently.

**Ten lines supplied**, two of them better than the drafts:

- the new-mark becomes **two keys**, `new_mark_f` and `new_mark_m`. "Nueva mensaje" is a mistake a Spanish
  reader sees immediately, and the gender cannot be derived from the English "New".
- "Para que lo sepas" becomes **"El cliente mencionó"**. A budget or a time the customer named is the
  customer's statement, not our assessment of what matters.

**Daily's two refusals are recorded as rules**, not as one-off choices: the letter never says "since
yesterday", because the product knows the period between briefings rather than a calendar day, and the
"why now" words stay identical to the staff card's, compared key by key by their gate.

## 3. Retention: the live system and the backups are two answers

The customer question is one — is my message gone — and until now the text answered only half of it. With
`BACKUP_E7B_1013.md` the horizons are measured, so §5c now states both:

| | live system | backups |
|---|---|---|
| database | deleted when the rule deletes it | daily, kept **7 days**, **no point in time recovery** |
| files in storage | deleted with their record | **not backed up at all** |
| the automation's database | — | daily dumps, **14 days**, today **on the same disk** |
| recovery points before a risky change | — | until the change is accepted **plus 30 days** |

From which the sentence a privacy page owes: a deletion takes effect in the live system straight away, and
a copy can survive in a backup until that backup rolls over — **seven days** for ordinary customer data.

**How a deletion is re-applied after a restore is written and deliberately not published.** The wording is
in the file, in both languages, and it stays out until a restore has actually been performed and the
re-application is part of it. API's isolated test (E7b-1, under USD 0.10) is the natural place to prove
both at once. A promise about a procedure nobody has run is the same defect this lane has refused three
times now.

**Still open and still the owner's:** E7b-1 the restore test, E7b-2 point in time recovery or not, E7b-3
storage backup, and the retention period itself, which has to be chosen **with** the backup window rather
than before it.

## 4. Reporting: four terms, and an unknown is not a zero

`provider_accepted` is now its own step with its own sentence. **A provider reference means the channel
took the message, and a message can carry a reference and never arrive**, so the reference may never stand
in for receipt. Today neither `provider_accepted` nor `delivered` renders, because the event with the
provider reference is still to be built.

**An unknown value is never turned into zero successful operations.** If delivery is not measured, the
report says nothing about delivery rather than "0 delivered", which would read as an observed failure.

The waiting task and its next step are written as soon as Lead delivers the data contract. There is
nothing to bind them to yet, and a generic "check your account" would be exactly the filler this report
exists to avoid.

## 5. "Universal": eight lines, and one finding that changes the offer's shape

Every line keeps three things apart: the technical capability, the operational release, and a delivery
actually proven.

**The finding worth your attention.** `MAIL_CRM_MATRIX_v1` records that connecting **an agency's own
mailbox** does not exist: one mailbox is wired by hand today, there is no self-service connect, and it is
listed as a pilot blocker. The trust section currently says we connect the channels together with you.
What is true is narrower and still a service: **today enquiries arrive at a mailbox we operate for you,
and connecting your own is being built.** That line is M-1 and it is ready for the next build.

**Also in the lines:** Gmail receiving is proven and the **reply in the thread is not** — it waits on the
real-provider proof in T2, so no sentence claims the thread. Outlook, Microsoft 365 and IMAP get no line
at all. The four external CRMs keep the staging-certificate wording. And for a **pilot** agency even
Spanish is not finished, because the notice version that names the agency, `v1.1-es`, is still pending.

**One contradiction is surfaced rather than silently resolved.** The truth table and the package matrix
call Google Sheets one active production workflow that receives a copy of the leads;
`MAIL_CRM_MATRIX_v1` calls it "fehlt as a certified path". Both can be true, and they produce opposite
public sentences. **Asked of API: which governs a customer-facing claim.** Until then no Sheets line
renders, and my own earlier delta D-101, which said a copy is written today, is **held back rather than
shipped**.

## 6. Company details and legal pages: unchanged preconditions

E14 and publication on the right build remain open. **Nothing is invented in the meantime** — no company,
no legal form, no register entry, no approval. The pages name the person who is actually published as the
controller today. The request stays one consolidated line, asked once with Social:

> `FIRMENANGABEN = <Rechtsform>, <NIF/CIF>, <Straße und Hausnummer>, <PLZ> <Ort>, <Land>`

Everything in it becomes public in the legal notice, so it needs no secret channel. The official documents
for Meta's business verification go through the secure store, never through a chat or a file in the repo.

## 7. Remaining preconditions, by owner

| # | Precondition | Who |
|---|---|---|
| 1 | The data contract for the waiting task and the next step | Lead |
| 2 | Which source governs the Google Sheets claim | API |
| 3 | The real-provider proof for the Gmail reply in the thread (T2) | owner test, then Lead |
| 4 | E7b-1 restore test, and the deletion re-application proven with it | Owner, then API |
| 5 | E7b-2 and E7b-3, and the retention period chosen with the backup window | Owner |
| 6 | `v1.1-es`, the notice that names the agency | Owner and lawyer |
| 7 | E14, the company details, and publication on the named build | Owner, then the implementer |

## 8. What I did not do

No design round, no re-check of the old build, no acceptance, no publication. No text already delivered was
reworked without a changed basis. I did not resolve the Sheets contradiction myself, did not publish a
restore procedure that has never run, and did not turn an unmeasured delivery into a zero.
