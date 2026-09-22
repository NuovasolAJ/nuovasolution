# WEBSITE CLAIM REGISTER v2 — code check and status update

**State:** `2026-09-22_SYNC_0900Z` · **Written:** 2026-09-22
**Code checked:** `2089094` on `website_enterprise_redesign` (the last code commit; `0b813d0` is docs only)
**Lane:** Website Copy / Product Truth / Director
**Status:** DRAFT by its author, **not independently reviewed**. This lane owns source and wording.
The Website Reviewer owns what is actually delivered and the independent acceptance; this document
does not repeat the Reviewer's technical review.

> v2 does not rewrite v1. The 106 row definitions, their original wording and their corrections
> stay in `WEBSITE_CLAIM_REGISTER_v1.md`. v2 records (1) whether each row is correctly implemented
> in the code, (2) which rows changed status because of evidence gathered since 2026-09-21, and
> (3) one correction of v1 itself.

---

## 1. Signal

```
WEBSITE_CLAIM_REGISTER_CODE_CHECK = 2 deviations (+1 accepted deviation, +1 open condition) @2089094
```

## 2. Method

Every row WCR-001 to WCR-175 (106 rows) was checked against the rendering sources at `2089094`:
`lib/content/capabilities.ts`, `lib/content/statuses.ts`, `lib/i18n/dictionaries/en.ts`,
`lib/i18n/dictionaries/es.ts`, `lib/content/legal.ts`, `lib/media-manifest.ts`, `lib/contracts/stubs.ts`,
and the page templates where a row depends on placement (`app/[locale]/page.tsx`,
`app/[locale]/platform/[slug]/page.tsx`). Both locales, no sampling. A full text scan of every copy
source found **none** of these strings in either language: *hot lead*, *lead caliente*, *21 days*,
*hasta 21*, *Disponible ahora*, *nine languages*, *nueve idiomas*, *three properties*, *tres
propiedades*, *sixteen*, *dieciséis*, *current consent*, *always synced*, *no setup*, *1 to 100*,
*above 80*, *< 1 second*, *in real time*, *en tiempo real*. EN and ES dictionaries have matching
key counts.

Placement in the rendered page (spacing, order, visual adjacency) is the Reviewer's check. This
document flags a placement issue only where the source makes it visible.

## 3. Result per block

| Rows | Area | Result at `2089094` |
|---|---|---|
| WCR-001 | meta description | applied |
| **WCR-002** | hero lead | wording applied; **DEV-1** (qualifier placement) |
| WCR-003, 004 | status sentences | applied, both locales |
| WCR-005 | "Start free" | wording unchanged as intended; render gating is the mode gate (Reviewer) |
| WCR-010 | hero note, closing, contact | applied: "Try free for 14 days. No payment method required." |
| WCR-011 to 015 | rail | applied; hot lead removed (§4) |
| WCR-016 | gap | no claim |
| WCR-017 | film | applied in `home.film.body` and in the V-01 scene list |
| WCR-018 | operating picture | applied: alert node removed, matching and Daily Goals outlined, legend present |
| WCR-019 | chapter I | unchanged, correct |
| WCR-020 to 022 | chapters II and III | applied; hot lead point removed (§4) |
| WCR-023 | context inventory | applied |
| WCR-024 | context "Your own environment" | unchanged; carries no availability claim, accepted |
| WCR-025 | assistant | correct |
| WCR-026 to 029 | "next" items | applied (no language count, no progress figure, interest wording) |
| WCR-030 to 033 | access and closing | applied; extension step replaced |
| WCR-040 | platform lead | unchanged, accepted as design statement |
| WCR-041 | tenant section | applied ("under your brand. In development."); h2 unchanged, no availability claim |
| **WCR-050** | AI Sales Agent h1 | wording correct; **DEV-2** (qualifier placement) |
| WCR-051 to 056 | AI Sales Agent | applied |
| WCR-060 to 068 | Lead Intelligence | applied; WCR-065 removed rather than retensed (§4) |
| WCR-070 to 077 | Universal CRM | applied |
| WCR-080 to 084 | Property Matching | applied: overall `in_implementation`, no count |
| WCR-090 to 093 | Daily Assistant | applied; Spanish "Disponible ahora" gone |
| WCR-100, 101 | Voice | applied: no language count |
| WCR-110, 111 | Social Growth | applied |
| WCR-120 to 122 | Lead Acquisition, Property Experience | correct |
| WCR-130 to 134 | Packages | applied, extra line present |
| WCR-140 to 148 | Trial | applied: 14 days, extension items removed, branding and CRM steps reworded |
| WCR-150 to 158 | Signup, login, onboarding, callback | applied; callback now carries the full C2 outcome set |
| WCR-160 to 162, 165 | Contact, WhatsApp | unchanged, correct (number gated) |
| WCR-163, **164** | Q&A | applied C2 text; **OC-1** open condition (§5) |
| WCR-170 to 175 | Legal | data deletion page applied; privacy and terms remain placeholders (§7 and the counsel package) |

**Totals:** 106 rows checked · 2 deviations · 1 accepted deviation · 1 open condition · every other
row applied or correctly unchanged.

## 4. Accepted deviation: hot lead removed instead of "being built"

The Implementer removed every hot lead statement (WCR-012, 018, 021 point 3, 060, 061, 062, 065,
067, 075) instead of retensing them to "being built" as v1 recommended.

**Accepted, and v1 was wrong.** `CLAIMS_MATRIX.md` D-10 forbids *every wording and every visual*
of hot lead alerting, which includes "being built". v1's recommendation for WCR-021 point 3 and
WCR-065 therefore conflicted with the valid matrix. The Implementer followed the higher authority.
The evidence has not changed since: no prod run has delivered a hot lead alert to an agent, the
hot run 36718 sent none, and the alerting contract `MF-02` does not exist. The removal stands until
a prod delivery is evidenced **and** D-10 is changed by its owning chat.

**v1 correction:** in `WEBSITE_CLAIM_REGISTER_v1.md` read the corrections for WCR-021 point 3 and
WCR-065 as "remove", not "`in_implementation`". A note is added to v1's header.

## 5. Deviations and the open condition, for the Implementer

| ID | Row | Found at | Deviation | Expected |
|---|---|---|---|---|
| **DEV-1** | WCR-002 | `app/[locale]/page.tsx`: the Q-2 qualifier renders only under the operating picture (`h.picture.qualifier`), not with the hero lead | `CLAIMS_MATRIX.md` "How to use" rule 3: an `APPROVED-Q` claim carries its qualifier **with the claim, not in a footer**. B-04 is `APPROVED-Q` | Render `common.qualifiers.q2` as a caption directly under the hero lead, both locales |
| **DEV-2** | WCR-050 | `app/[locale]/platform/[slug]/page.tsx`: on the AI Sales Agent page Q-2 appears only in the scenario caption ("Example. Based on…") | same rule | Render Q-2 under the h1 or lead on the AI Sales Agent page; the scenario caption may keep it too |
| **OC-1** | WCR-164 | Q&A storage sentence "…so we can answer it **and improve our replies**" is shipped | "improve our replies" asserts a purpose nobody has confirmed (question Q-API-9: are answers used to improve replies, and how long are they kept). The whole sentence is counsel item C-Q7 | Keep until API answers. If the answer is no, remove "and improve our replies" / "y mejorar nuestras respuestas". Prod has no `web_qa_*` objects today, so no visitor data is collected in prod meanwhile |

Closing signal for the Implementer: `WEBSITE_CLAIM_DEVIATIONS_FIXED` with commit SHA. The Reviewer
verifies placement.

## 6. Status changes since 2026-09-21

Evidence source: `governance/CLOSEOUT_EVIDENCE_INDEX_v1.md` (`2026-09-22_SYNC_0900Z`) and the Audit's
live read of 2026-09-22 ~08:30Z in `governance/dispatch_2026-09-22/PROMPT_*.md`.

| Topic | New fact | Effect on public copy |
|---|---|---|
| Gmail reply | The 2026-09-20 regression was **answered twice** (Gmail ids `1a0bff346fdd23f1` 17:53:06Z and `1a0bff39c7d86d5a` 17:53:28Z, one node run, a timeout retry). `GMAIL_REGRESSION_PASS = NO` stays. Fix in prod since 09-21 (Main `942392608803592d`, no blind retry, 60 s timeout). No real message since | **No change needed**: the site says Gmail text enquiries are answered, which remains true, and makes no "exactly one reply" or reliability claim. **Rule added:** no copy may claim single delivery, reliability or speed for email until `GMAIL_POSTFIX_E2E_PASS` exists. A deployed fix is not a proven fix |
| Owner login and membership | Login proven (LV); membership in prod (employee `24ee6292…`, agency_admin, 09-21 12:33Z, LV); walk **not** done (task `03d0d8eb…` queued) | No public claim depends on it. Self service onboarding remains unproven for customers; wording unchanged |
| Native CRM | Prod gained a `contacts` table on 09-21 with the media plane; it has **no consumer** | v1 evidence key E-CRMSTG said "no `contacts` table"; read as "inert `contacts` table, no consumer". Copy unchanged |
| Media | Prod media tables exist; prod Main still calls the old v1 children; Gmail intake downloads no attachments | "Attachments, WhatsApp media and Outlook are in development" stays correct |
| Property matching | Wired in a staging canary only; prod returns `{}` | `in_implementation` stays |
| Voice | A public voice agent in prod can create confirmed bookings without calendar authority; containment awaits owner decision `VOICE_BOOK_SCOPE_REVOKE` | The site says Voice is not offered to any agency, which is true of the offer. **Status documents must not say "voice blocked" until containment is confirmed** |
| Social | Not submitted, `SUBMIT_READY = NO` | Copy correct |
| AI disclosure | Both Spanish notices exist and are inactive; an **unapproved** interim sentence is rendered by prod Main since 09-21 17:12Z (ruling R2) | No website claim. Handled in `COUNSEL_PACKAGE_v1.md` §E and `SIGNATURE_COPY_READY_v2.md` |
| Page count | The build produces 61 static pages, not 62 (review WR-24) | v1 §0.4 said 62; read 61 |

## 7. What stays open for this register

The privacy and terms pages are still placeholders on the rebuilt site; complete drafts for counsel
are in `COUNSEL_PACKAGE_v1.md` §B to §D. The old public site (a separate question) is handled in
`OLD_LIVE_SITE_HOTFIX_COPY_v1.md`.
