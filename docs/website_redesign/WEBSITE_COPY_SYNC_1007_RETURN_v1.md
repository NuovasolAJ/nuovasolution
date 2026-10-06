# WEBSITE COPY — return, round 2026-10-07 (R12)

**State:** `2026-10-07` · **Lane:** Website Copy / Product Truth
**Branch:** `website_enterprise_redesign` · **Written:** 2026-10-07
**Inputs read:** `governance/SOCIAL_LEGAL_DELTAS_1006_v1.md` §1 to §6,
`governance/API_TO_LANES_1006_HANDOFFS_v1.md` section "Copy + Social", and my own deliveries `c4266b6`
(working texts) and `3251d54` (Meta texts, content checked).
**Status:** author's record. Not independently reviewed, not legally reviewed.

---

## 1. Signal

```
META_LEGAL_PUBLISH_READY = NO — one condition open, and it is not a text problem

  file   docs/website_redesign/META_LEGAL_TEXT_FINAL.md          commit 2b691cd
  sha256 (git blob, LF)      9d0eb5dd97acd80caf81154b4872205177028d8c4ea43164c9bd884cec57ffe6
  sha256 (Windows checkout)  b137130b0364b2dd33d22a8a69123d0e20ec2c43e871ee089aac15dc1991c70c
  alignment list             §4b, ten points A-1 to A-10, EN and ES together
  placeholders               0
  open                       Hosting has not reported REPLY_TARGET_PURGE_SCHEDULED
```

`git show HEAD:<path> | sha256sum` gives the first checksum, `sha256sum` on a Windows checkout the second.

The texts are finished. The flag is withheld on purpose, because of **one sentence**, and §4b of the file
carries both wordings that close it, so the implementer can publish the moment the signal lands.

## 2. What changed in the texts

**The reply target is now its own entry, with its own rule.** Until today the section said we hold the
sender identifier only as a one way value. That stopped being true when the reply window was built. It now
says: the comment identifier, or the sender identifier of a direct message, is held **readable** and only
while we may reply, which is 7 days for a comment and 24 hours from that person's own message. The same
rule and the same deadline apply to the comment identifier **in our record of received events**, which is
the point API asked us not to forget. It is deleted earlier when the account is disconnected or when the
person asks for erasure, and what remains is a salted value kept for one purpose: so that a late repeat of
the same event does not produce a second message.

**The two retention rules are kept apart.** The message texts stay for as long as the agency's account
exists. The reply target does not. Both are now in the text with a sentence that says they are different
rules, because a reader who meets "7 days" and "as long as the account exists" in the same section will
otherwise take the shorter one for everything.

**Disconnecting deletes more than the token.** It now also deletes every reply target still stored for
that connection.

**The terms gained three blocks**, each describing something the system enforces rather than something we
intend: replies are **refused** outside Instagram's periods rather than merely omitted, and a message to
somebody who never wrote is impossible; a publishable listing produces exactly **one** draft, and whether it
goes out is the agency's setting, a person's approval or a delay the agency sets, with an unchanged listing
never published twice; and a photo is published **only** where the stored rights basis explicitly covers
embedding the image, with the system refusing otherwise.

**The two older corrections stand unchanged:** Instagram only, no Facebook connection; and the instruction
page instead of an automatic deletion route over Meta.

## 3. Why the flag is withheld

A-1 and A-3 say the identifier "is deleted" when the period ends. That is a promise about a process that
has to run on a schedule. Hosting has not reported `REPLY_TARGET_PURGE_SCHEDULED`, so today the text would
describe a clean-up that is still a plan, and that is the one kind of sentence a regulator or a platform
reviewer can check.

Both closings are written in the file, so this costs no further round:

- the purge runs **when the window ends** → the wording stands as it is;
- the purge runs **on a cycle** → the sentence takes the honest upper bound, "at the latest one `<interval>`
  later" in EN and ES, with the interval from Hosting's signal. Nothing else in the file changes.

## 4. The controller, unchanged since the check of 2026-10-06

The deletion page names the controller, the address and the e-mail, and links to the privacy notice; the
Instagram section ties "we" to the controller named at the top of that notice. **Nothing further is asked
of the owner for these texts.** The tax number and the house number with postal code remain owed for the
legal notice, the invoices and Meta's business verification, and none of the three Meta texts needs them.

## 5. Hard blockers

| # | Item | Who | Blocks |
|---|---|---|---|
| 1 | `REPLY_TARGET_PURGE_SCHEDULED`, with the interval if it is a cycle | Hosting | the publish-ready flag, and only that |
| 2 | Social's confirmation of the substance | Social | a second pair of eyes before the pages go public |
| 3 | Publication of the three pages | Implementer, after his design section | `META_LEGAL_PUBLIC`, and with it the Meta submission |
| 4 | O-6 tax number and complete address | Owner | the legal notice, invoices, business verification. **Not** these texts |
| 5 | The reply window periods for anything beyond Instagram | API, Social | nothing today; the text names only what Instagram allows |

## 6. What I did not do

No design work: the implementer is in his design section and nothing here touches it. No parallel version
of the legal texts: every sentence went into the sections that already exist, in both languages at the same
time, which is what Social asked for. No publication, no acceptance, and no claim that these texts are
legally reviewed.
