# WEBSITE COPY — return, round 2026-10-06 (R11b)

**State:** `2026-10-06` · **Lane:** Website Copy / Product Truth
**Branch:** `website_enterprise_redesign` · **Written:** 2026-10-06
**Base:** excerpt `c360d1f`, the `WORKING` strings listed in `WEBSITE_VISUAL_1005_RETURN_v1.md` §8.
**Measured against:** the package matrix in
`backend_handoff/handoff_in_2026-10-03/AUDIT_ORDERS_2026-10-03.md` §"Paketmatrix".
**Status:** author's record. Not independently reviewed, not legally reviewed.

---

## 1. Signals

```
COPY_WORKING_TEXTS_1006 = DELIVERED  docs/website_redesign/COPY_WORKING_TEXTS_1006.md  commit c4266b6
                          9 items: 7 confirmed unchanged, 2 replaced
META_LEGAL_PUBLISH_READY = docs/website_redesign/META_LEGAL_TEXT_FINAL.md
                           sha256 9e22aeb452f58535311c6345fa108ec826801b72465ce56ac341fc725c5b95a8
                           checklist §4, six points, three of them changed something; placeholders 0
D-80 (EST-204)           = NOT DELIVERED, as instructed: clip v3 shows REF-DEMO-204
```

## 2. The working texts

Seven of nine are confirmed and only lose their `WORKING` flag. The implementer's wording is accurate
against the matrix, and the fourth step's line, "One of your people confirms the viewing. Nuova agrees no
dates", is exactly the sentence the calendar truth requires. Two are replaced:

**The fourth step's title** repeated label 4 word for word, two lines apart on the same screen. It now
names the action production performs and the demonstration shows: ES "Tu equipo toma la visita" · EN "Your
team takes the viewing".

**The footer line** kept the answer and the record but dropped the step that is best proven of the three,
the task a person takes and completes, which is the only part of the chain the owner has tested in
production. It now reads ES "Nuova responde a las consultas de tu agencia y deja claro el siguiente paso.
Hecho para agencias en España." and is four words shorter than the working line.

Two notes rather than changes: the sub-line stays at 22 words, because cutting it to twenty means dropping
the only mention of the channels in the hero; and the scope that matters is already inside it, since
production answers in Spanish only. The hero renders publicly on the gate of register row L-01, not
before, which is unchanged.

## 3. The Meta texts, checked on content

The check found three things, two of which are corrections to my own file of 2026-10-03.

**The deletion page named nobody.** Meta reads that page on its own, and it carried no controller at all.
It now opens with the name, the street, the town, the country and the e-mail that the published privacy
page already carries, plus a link to the full notice. The Instagram section, which sits inside the privacy
notice, now says in its first line that "we" means the controller named at the top of that notice.

**The sender identifier sentence no longer matched what is being built.** My text said the identifier is
held only as a one way value that cannot be reversed. With the reply target rule, the identifier the
platform requires for the reply is also held while the reply window of that conversation is open. Both
sentences are now in the text, and the reply identifier is described as deleted when the window closes.
The sentence names **no period**, because none has been confirmed: when API and Social confirm the window,
the number goes in and the file gets a new version. The page can be published as it stands, because the
corrected sentence is accurate and narrower than the one it replaces.

**The deletion page is complete** on content: who is responsible, the four ways in, what we need, what
happens and when, what the page does not do, and the complaint route.

## 4. What the owner is asked for, and what is not needed

Missing from the published privacy page today: the tax number, and the house number and postal code.
**Neither is needed for these three Meta texts**, and I am not asking for them in order to publish:

| Detail | Needed here? | Reason |
|---|---|---|
| Tax number (NIF) | no | it identifies a business in a Spanish legal notice and on invoices. A privacy section and a deletion instruction page identify the controller by name, address and contact; Meta's review asks for a reachable deletion route |
| House number, postal code | not for these texts; yes for the legal notice | the two pages are identifiable with what is already published. A Spanish legal notice needs the complete address, and so does Meta's business verification, which compares the entry against the official document |

So the Instagram sections and the deletion pages can go live today, and the two details stay owed for the
legal notice, the invoices and the business verification. That is a narrower request than the standing
O-6, and it unblocks the Meta chain without waiting for it.

## 5. D-80

Not delivered, as instructed. Clip v3 was recorded with `REF-DEMO-204`, so the site keeps it: a site-only
change to `EST-204` would contradict the film on the same screen. The text is written and waits for a
recording that carries the new reference.

## 6. Step 2 of the order is open by design

Checking only the changed texts and promises happens **after** the implementer's next commit. The criteria
are fixed in advance so the check is quick: real function, illustrative example and design prototype must
stay distinguishable; no "every language", no "every CRM", no automatic booking, no guaranteed leads, no
automatic 3D upload; and no internal `REF-DEMO` identifier outside the labelled example.

## 7. Hard blockers

| # | Item | Who | Blocks |
|---|---|---|---|
| 1 | The reply window period | API, Social | the number in the sentence. **Not** publication |
| 2 | Social's confirmation of the Instagram substance | Social | nothing on our side; it is a second pair of eyes before the pages go public |
| 3 | What "a larger acquisition scope" means | Owner | the fourth Enterprise line |
| 4 | The port of the hot-lead fix | the owning lane | the third hero label, Essential's fifth state line |
| 5 | O-7 prices and the billing period | Owner, then API | every amount |
| 6 | O-6 tax number, complete address | Owner | the legal notice, invoices, Meta business verification. **Not** the three texts released today |
| 7 | A recording carrying `EST-204` | Daily | D-80 |
| 8 | `3D_OWNER_VISUAL_ACCEPTANCE` | Owner | embedding the viewer |

## 8. What I did not do

No application code, no design direction, no acceptance. Steps 1, 2 and 4 of the earlier order continue
unchanged. Nothing already delivered is handed over again without a change: `COPY_HERO_1003` and
`COPY_DELTAS_1003` stand as they are, and only `META_LEGAL_TEXT_FINAL.md` was edited, with its new sha256
above.
