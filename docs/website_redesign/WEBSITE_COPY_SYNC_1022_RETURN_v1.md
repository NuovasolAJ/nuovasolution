# WEBSITE COPY — return, round 2026-10-22 (R22)

**State:** `2026-10-23` · **Lane:** Website Copy / Product Truth
**Marking:** technical and editorial check. **Not a legal approval, not a Meta approval.**

---

## 1. The handover is published

| | |
|---|---|
| File | `docs/website_redesign/WEBSITE_COPY_HANDOVER_1021.md` |
| Commit | **`22d65fb`** "docs(website): R21 one handover file to Website and the return" |
| Branch | `origin/website_enterprise_redesign`, pushed as a fast-forward from `83f428c` |
| Read it | `git fetch origin && git show 22d65fb:docs/website_redesign/WEBSITE_COPY_HANDOVER_1021.md` |

**This is the only copy handover.** Nothing in this round replaces or extends it. The legal changes below
are in the legal source files that its row D-4 already points to, so the mapping stays as written.

**What went with the push, and why.** Between `83f428c` and `22d65fb` there were five commits, all
documentation:

| Commit | Lane | Content |
|---|---|---|
| `81234e5` | Copy | R20 text check and return; it also carried another lane's staged deletion of `.staging-hold` |
| `1b7d3e1` | Copy | restores `.staging-hold`; net effect on the file across both commits is zero |
| `e0aed30` | Copy | the R20 return's note on that mistake |
| `a827531` | **Reviewer** | `REVIEWER_SYNC_1020_RETURN_v1.md` with its screenshots and scripts |
| `22d65fb` | Copy | the handover and the R21 return |

`a827531` is not this lane's. It sat between my commits, so publishing `22d65fb` without it would have
meant new hashes for the handover. **The owner chose to push the branch including it** (23.10.). No code
file changed: the code on the branch head is the code of `deb9b66`. `.staging-hold` is present at the
head, so the staging project stays held; the design preview builds once, without any change to the site.
The uncommitted files of other lanes, `components/app/mail-shell.tsx` among them, were not touched,
staged or committed.

## 2. Website texts

Nothing to check yet. The basis for the check is the handover above, 38 rows and the feature-state table.
Once Website names a build, I read its rendered `/es` and `/en` pages through the build's **fixed**
deployment URL, confirmed by `/api/build`, and report per row: applied, open, or changed differently.

The rules for that check, unchanged: public lines only from the production column; implemented, staging,
production and customer acceptance are four different states; ad intake stays "En preparación ·
todavía no contratable" until proven end to end; running ads is not presented as a service today.

**Build reference:** ⟦named build, to be added on Website's return⟧.

## 3. Legal notice and legal pages, now drafted for a natural person

`LEGAL_PAGES_FINAL_v1.md` is now **v4**, and the deletion page in `META_LEGAL_TEXT_FINAL.md` §3 was changed
the same way. Basis: API's `OWNER_CARD_E14_1020_v1.md` (LSSI-CE Art. 10.1, natural person, NIF = DNI, no
register entry).

| Change | Why |
|---|---|
| One identity block with five fields, `⟦E14: NAME / NIF / ADDRESS / EMAIL / PHONE⟧` (ES: `NOMBRE`, `DIRECCIÓN`, `TELÉFONO`) | company data only through the planned path: the owner fills `owner_e14_public.txt`, API signals it complete, the implementer fills the fields at build time |
| The name, the address fragment and the e-mail address written into v3 are removed from the page text | the same: no company data from this lane's memory |
| Telephone added | Art. 10.1 a) asks for a direct contact besides e-mail |
| "NuovaSolution" named as the **trading name** of the person on all four pages | Meta needs to see the link between the display name and the legal name |
| No register line, no price line | Art. 10.1 b) does not apply to a natural person; the site shows no prices. If prices appear later, a VAT sentence is needed (Art. 10.1 f) |
| "with a qualification and a priority" removed from the notice and the terms | no priority value in production; the notice now matches handover row D-1 |

**Open marks in the page text** (§1–§4 of the legal pages, and the deletion page):

| Mark | Who | State |
|---|---|---|
| `⟦E14: …⟧` | Owner, then API's signal | **no E14 completeness signal yet**: `API_SIGNALS_1021` has no E14 entry, the last is `E14_CARD` of 20.10. This lane does not read the owner's file |
| `⟦OWNER+COUNSEL: RETENTION⟧` | Owner, then counsel | options A/B/C in `META_LEGAL_TEXT_FINAL.md` §5b, recommendation C |
| `⟦COUNSEL: DPA⟧`, `⟦COUNSEL: LIABILITY⟧` | counsel | decision sheet D5 |
| `⟦publication date⟧` | implementer | set at publication |

**For the Meta review.** The Instagram sections of the privacy notice, the terms block and the deletion
page are in place. They name the controller through the same E14 block. **`META_LEGAL_TEXT_READY` stays
NO**, for the three reasons recorded on 10-07 and still open: the retention decision, the production purge
path behind the one conditional sentence on the deletion page, and the company details. The URLs for the
Meta form remain `/privacy-policy`, `/terms`, `/data-deletion`. Their checksums change with this round; the
values recorded on 10-06 no longer apply, and new ones are produced when the text is declared ready.

**Draft ready to publish once:** the E14 signal has come and the implementer has filled the fields, the owner
has decided on retention, counsel has filled DPA and liability, and the purge path exists in production.
Until then no page with a `⟦…⟧` in it goes live.

## 4. E22: the three staff templates, one sentence each, for your approval

The order points to `SOCIAL_COPY_E22_WHATSAPP_TEMPLATES_v1.md`. That file was **superseded** on 14.10. and
contains only one staff template (its T2 and T3 go to customers). The three staff templates are listed in
Social's `SOCIAL_E22_WHATSAPP_TEMPLATES_v3.md` and API's list `SOCIAL_TO_API_1019_E22_LIST_v1.md`, as raw
texts. Their final Spanish wording is in `WEBSITE_COPY_1020_ON_DEB9B66_v1.md` §5. The summaries below are of
**that** wording. Nothing was rewritten.

| Template | What it does, in one sentence |
|---|---|
| `ns_alerta_empleado_v1` | Tells the responsible person in the team that a new enquiry is waiting for them, with the customer's first name, the occasion and the channel, and that it is in their task list (button "Abrir tarea"). |
| `ns_recordatorio_empleado_v1` | Reminds the same person that nobody has taken the enquiry since the time it arrived, and that they can take it in their task list. |
| `ns_escalado_empleado_v1` | Hands an enquiry that nobody in the team has taken since it arrived to a second person, without naming who left it. |

**Applies to all three:** utility category (proposal; Meta decides), Spanish only, no customer telephone,
e-mail, message text or score. A WhatsApp message goes out only to an employee number confirmed with the
one-time code; without it, mail is the only channel, as it is in production today. Reminder and escalation
also need E19 working hours in production; you decided E19-PROD = JA on 20.10., and the templates stay
**prepared, not active**, until that is deployed.

**Your answer, in this form:**

```
E22 staff = JA: alerta, recordatorio, escalado     (or only the ones named)
E22 staff = NEIN
```

A JA means submission by the owner of the WhatsApp account lane, not sending. Nothing is submitted by this
lane.

## 5. Reviewer

After Website's return, the Reviewer and this lane check **the same** commit and deployment, both through its
fixed URL and `/api/build`. The earlier contradiction on the language claim (F-R16-5: RV2 quoted a sentence
that has 0 hits in the source and the HTML of `deb9b66`) is closed **by reading the rendered text of that
build**, not by taking over an earlier return, mine included. If the two readings differ, the HTML of that
build decides, quoted with its route.

## 6. Preconditions remaining

| # | Precondition | Who |
|---|---|---|
| 1 | one pass applying `WEBSITE_COPY_HANDOVER_1021.md` (`22d65fb`) on a named build | Website |
| 2 | the text check on that build, together with the Reviewer | Copy, Reviewer |
| 3 | the E14 completeness signal | Owner, API |
| 4 | the retention decision; the production purge path | Owner and counsel; Hosting and API |
| 5 | DPA and liability | counsel |
| 6 | the package limits, `OWNER_TEMPLATE_PACKAGE_LIMITS_1021_v1.md` | Owner |
| 7 | E22 staff templates | Owner |
| 8 | E19 working hours deployed in production | Lead, Hosting |

## 7. What I did not do

No application code, no design, no acceptance, no publication of a page. No company data, NIF, address or
telephone number written or read; the owner's E14 file was not opened. No E22 text rewritten or submitted.
Only documentation commits pushed, each with a pathspec; foreign uncommitted changes left as they were.
