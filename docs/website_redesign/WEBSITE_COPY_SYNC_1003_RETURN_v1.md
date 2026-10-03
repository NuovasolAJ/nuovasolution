# WEBSITE COPY — return, round 2026-10-03 (R10b)

**State:** `2026-10-03` · **Lane:** Website Copy / Product Truth
**Branch:** `website_enterprise_redesign` · **Written:** 2026-10-03
**Base:** application code `cf6e80f`, visually **not** accepted by the owner. My D-54…D-87 are in it;
D-80 is not.
**Evidence base:** the package matrix in
`backend_handoff/handoff_in_2026-10-03/AUDIT_ORDERS_2026-10-03.md` §"Paketmatrix",
`3D_FEATURE_TRUTH.md` (Delta 7), `META_LEGAL_SECTIONS_v1.md`, `PRODUCT_FAQ_KB_v1.md` v1.2.
**Status:** author's record. Not independently reviewed, not legally reviewed.

---

## 1. Signals

```
COPY_HERO_1003        = DELIVERED  docs/website_redesign/COPY_HERO_1003.md   commit 7e4e7e1 (sent first)
COPY_DELTAS_1003      = DELIVERED  docs/website_redesign/COPY_DELTAS_1003.md
META_LEGAL_TEXT_FINAL = docs/website_redesign/META_LEGAL_TEXT_FINAL.md
                        sha256 72e25e9c78924020983ddebfdc1e176f89be1d45c43ff280089342bee4a44d3c
                        placeholders: 0
```

The hero went out on its own commit before the rest was written, because the implementer starts there.

## 2. What is in the delivery

**Hero** (`COPY_HERO_1003.md`): headline, one subline of 21 words, two buttons, the state line and the
three labels for the product image, ES and EN, inside the text limits.

**Five module demonstrations** (`COPY_DELTAS_1003.md` §1): title, two to four step lines of three to six
words, one state line each, every state line naming the matrix row that proves it.

**Package comparison** (§2): Essential with five lines, Growth and Enterprise opening with "everything in
the previous one, plus", the 3D strip, and the four-way separation of processing, acquisition, the
advertising budget and 3D orders. No price, no quota, no "unlimited", no promised leads.

**Trial sentence** (§3), **AI transparency** (§4), **eight FAQ entries** (§5), **the closing CTA** (§6),
**the reference decision** (§7).

**Meta legal texts** (`META_LEGAL_TEXT_FINAL.md`): the Instagram privacy section, the connected-accounts
terms block and the complete deletion page, ES and EN, with zero placeholders.

## 3. Three decisions I made against the order, each with its reason

**The hot alert is not a hero label.** The order offers "CRM-Eintrag/Hot-Alert" as the third label. The
matrix row reads *"Prod vorhanden; Fehlauslösung im Paket behoben · fehlt: Port"*: what runs in production
is the version **with** the false trigger, and the fix has not been ported. A hero label is the one place
on the page that carries no state line. So the third label is the customer record, and the alert appears
in module demonstration 1 with the state "in preparation, not bookable yet". The label text is written and
ready for the day the port is reported.

**Enterprise has three lines, not four.** "Größerer Akquiseumfang" has the matrix entry *"nicht definiert ·
Owner-Definition"*. The round's positive closing case is that every package line is backed by a matrix
row, and "not defined" is not a backing. Writing it would have meant inventing a scope or a number. The
line is written the day the owner says what a larger acquisition scope is.

**"3D-Kontingent" is not written as a quota.** The matrix says handwork per order, no counter, no viewer
host, no order entity. So 3D is "available per order, no quota" in Enterprise and in the separate strip,
and nothing says how many or how fast.

## 4. The reference, now decided

`EST-204`. It was blocked on 2026-10-01 because `REF-DEMO-204` is burned into the clip v2 picture and a
site-only change would have shown two references on one screen. Daily is recording clip v3 anyway, since
the burned-in subtitles have to come out so the player bar stops covering them, so the reference change
rides along in that run at no extra cost. **Asked of Daily:** `EST-204` as the viewing reference in clip
v3, and no burned-in subtitles. Until v3 ships, site and clip both keep `REF-DEMO-204`.

## 5. The two corrections in the Meta texts

**No Facebook.** Social's draft says "Instagram or Facebook" in the deletion paths. Their own delimitation
D2 says Facebook pages and advertising lead forms run through a different login with different
permissions. A page naming Facebook describes a connection we do not have, so the texts cover Instagram
only and say so in the first line.

**No deletion callback.** Social's draft describes Instagram notifying us when the app is removed, an
automatic deletion and a confirmation code. No such endpoint exists. Meta accepts an instruction URL, and
an automated path that does not exist is the one claim a reviewer can check and disprove. So: removing the
app ends our access, deletion of stored data is requested on the page, and a person confirms it in writing,
twice, on receipt and on completion.

Also not adopted: Social's 72 hour and 30 day deadlines. Social itself writes they need counsel and must
not be promised before the path is served, and no social deletion request has ever been handled. The page
states the statutory period. That is counsel question CQ-13.

## 6. Hard blockers

| # | Item | Who | What it blocks |
|---|---|---|---|
| 1 | What "a larger acquisition scope" means | Owner | the fourth Enterprise line |
| 2 | The port of the hot-lead fix into production | the owning lane | the third hero label, and Essential's fifth state line moving to available |
| 3 | O-7 prices and the billing period | Owner, then API | every amount. The cards carry none, by design |
| 4 | O-6 legal form, NIF, address | Owner | the privacy, terms and legal notice pages. **Not** the Meta texts, which are placeholder-free and can be published now |
| 5 | O-8 retention per class | Owner, then counsel | the retention section |
| 6 | `3D_OWNER_VISUAL_ACCEPTANCE` | Owner | embedding the viewer. The texts are ready |
| 7 | Clip v3 with `EST-204` and no burned-in subtitles | Daily | D-80 |
| 8 | CQ-13 deletion deadlines, CQ-16 web notice, CQ-2 disclosure version | counsel | two sentences on the deletion page, the question box, the pilot's e-mail channel |

## 7. What I did not do

No application code, no design direction, no reviewer acceptance: the state lines say what is proven, and
whether the result looks right is the owner's visual decision and the reviewer's technical one. No new
document series: one short hero file delivered first, one deltas file, one Meta legal file, and this
return. Nothing already delivered is handed over again without a change.
