# WEBSITE COPY — return, round 2026-10-20 (R20)

**State:** `2026-10-20` · **Lane:** Website Copy / Product Truth
**Checked:** `deb9b66` / `dpl_GyrsjqBQcCdg7KEXccKdUkE4v5nc`, through the **fixed** deployment URL and
confirmed by `/api/build`. The branch alias already serves `83f428c` (documentation only); it was not used.
**Marking:** technical and editorial check. **Not a legal approval, not a Meta approval.**

---

## 1. Delivered

```
R20-9  WEBSITE_COPY_1020_ON_DEB9B66_v1.md
       §1  my 18 rows on deb9b66: 5 applied, 13 open as scheduled, 2 added (R-19, R-20)
       §2  the owner's seven points, each with rendered text, fix, class
       §3  every package feature with its state
       §4  legal: one false sentence fixable now, the prepared texts mapped to routes
       §5  the three E19 staff templates for E22                         → Social
```

## 2. Build, widths, and what was not checked

The order named `deb9b66`; the alias has moved on, so every reading is from the fixed URL. **Desktop and
phone width say the same thing**: the only width-specific elements are the preview badge and a replay
control. That is a check of the text in both variants, not of line breaks on a handset.

## 3. What changed on this build, and what did not

**Applied:** the hero state line (better than my row, because it says the limit in the same sentence), the
hero lead, the flow lead, "una sola ficha por cliente" in that form, and the Reviewer's F-R16-5 rest —
"lo que falta … es la aprobación legal del aviso, no la función" — is gone.

**Open, as scheduled:** thirteen rows, because the exec table put this list into the pass **after** this
build. Their wording stands in `COPY_1019.md` and is not re-sent.

**Two rows added.** The shared-record claim survives in two other sentences on the home page, "abre una
ficha por cliente" and "una ficha al día por cliente". In production an e-mail and a WhatsApp contact are
two records, so both become "por consulta".

## 4. The owner's points

All seven are answered in §2 of the file. Three are worth a sentence here.

**"Ninguna consulta se queda sin respuesta"** opens the Essential card. It is false the moment somebody
writes in another language, because that turn is held and gets nothing. It becomes "Las consultas en
español por WhatsApp y email se responden mientras estás fuera."

**The packages had no state on any Growth or Enterprise feature**, so calendar, ad leads and follow-up read
as included. Every feature now carries the site's two words. Two moved up on evidence since 10-03: the
alert, now available by e-mail without office hours, and the report in the login. One open question goes
to API and the owner: the offices and seats on the cards, 1/3, 1/8, 5/50, are not stated anywhere as
decided limits. If they are staging values, they are invented numbers on a public page.

**The imprint** redirects correctly to a page marked provisional, which is honest while E14 is open. But one
paragraph on it is a false claim **now**, independent of E14: "una capa operativa … con una sola memoria del
cliente". The replacement is the activity sentence already prepared in `LEGAL_PAGES_FINAL_v1.md` §1.

## 5. The three E19 staff templates

Utility, Spanish, to the agency's own employee, without customer phone, e-mail, text or score. The
escalation names nobody who failed; the reminder carries no urgency word the data does not hold; the time
is quoted as the stored arrival time rather than an age that goes stale when read later. One phrase of
Social's T-1 changes: "tu panel" becomes "tu lista de tareas", the name the surface has everywhere else.

Two limits stated for the submission rather than hidden in the text: no WhatsApp alert without a confirmed
employee number, so in production today mail is the only channel; and reminder and escalation depend on
E19 working hours, which do not exist in production. **Prepared, not active.**

## 6. Preconditions remaining

| # | Precondition | Who |
|---|---|---|
| 1 | the next targeted pass applying R-4…R-20, the package states and the imprint sentence | Website |
| 2 | whether 1/3, 1/8, 5/50 are decided limits | API and Owner |
| 3 | E14, the company details | Owner |
| 4 | the retention decision with the backup window | Owner, then counsel |
| 5 | the production purge path, for the one conditional sentence on the deletion page | Hosting, API |
| 6 | E19 working hours in production, for reminder and escalation | Lead, Hosting |
| 7 | E10 | Owner and counsel |

## 6b. An error of mine in this round, and its correction

**Commit `81234e5` carried a deletion of `.staging-hold` that this lane never made.** I committed without a
pathspec, so `git commit` took the whole shared index, including a deletion another lane had staged and not
yet committed. `.staging-hold` stops the staging preview from building, and its own text says it is
deleted "in the commit that follows the owner's decision".

**Corrected in `1b7d3e1`**, a path-limited commit that returns the file to its last committed state. No
history was rewritten. **Nothing was pushed in between** (origin stood at `83f428c`), so no build ever saw
the hold lifted. The copy lane's net effect on operational files is zero.

**For the lane that staged the deletion:** your change was not lost through any decision of mine; it was
swept into my commit and then reverted. If the owner has released staging, delete the file again in your
own commit with the reference to that decision, which is what the file asks for.

**For this lane, recorded as a rule:** every commit names its paths — `git commit -- <paths>` — because the
index is shared with other lanes. This happened once before, in August (`138a946`), for the same reason.

## 7. What I did not do

No design work, no acceptance, no publication. No company data, legal form or register entry invented. No
limit, price or capacity figure written. The live and preview pages were read with GET only.
