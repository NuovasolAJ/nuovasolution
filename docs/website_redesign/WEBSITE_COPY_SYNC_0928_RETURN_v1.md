# WEBSITE COPY — return, round 2026-09-28

**State:** `2026-09-28_FINAL_CONVERGENCE_AUDIT_R2` · **Lane:** Website Copy / Product Truth
**Branch:** `website_enterprise_redesign` · **Written:** 2026-09-28
**Read for this round:** audit `1e3a339` (`governance/FINAL_CONVERGENCE_AUDIT_2026-09-28_v1.md`),
`governance/dispatch_2026-09-22_1800Z/website_2026-09-24/W10_WEBSITE_COPY.md`,
`governance/dispatch_2026-09-22_1800Z/WEBSITE_ZIP_RECON_2026-09-24_v1.md` (Z01–Z22, A-W1…A-W8, R24–R30),
`governance/CLOSEOUT_EVIDENCE_INDEX_v1.md`, `governance/SOCIAL_SYNC_0923_RETURN_v1.md` §4 and §5,
`docs/website_redesign/REVIEW_2026-09-28.md`, and the rendered state at `e39ad06`.
**Status:** author's record. Not independently reviewed, not legally reviewed.

---

## 1. Signals

```
LAUNCH_COPY_v1           = DELIVERED
PRODUCT_FAQ_KB_v1        = DELIVERED faq-kb-v1.0
WEB_DISCLOSURE_TEXT_DRAFT = DELIVERED   (PRODUCT_FAQ_KB_v1.md §8, counsel sheet, priority 1)
LEGAL_PAGES_FINAL        = DELIVERED    (with five marked gaps, §5 below)
COUNSEL_V2_CORRECTED     = DONE
```

No signal claims implementation, publication, legal approval or independent acceptance.
`LEGAL_PAGES_FINAL = DELIVERED` means the four pages are written EN and ES and ready for the
implementer; it does not mean they may be published today, because five entries still need the owner
or a lane (§5).

## 2. Files

| File | Deliverable | Who acts next |
|---|---|---|
| `LAUNCH_COPY_v1.md` | C2, C3, C6, C9, C10: the publication register and every launch text | Implementer, then Reviewer against the register |
| `PRODUCT_FAQ_KB_v1.md` | C4: 40 product questions EN/ES with evidence and version, interface states, the web disclosure draft | Lead (`PRODUCT_QA_CONTRACT`), Hosting (H2), counsel (§8) |
| `LEGAL_PAGES_FINAL_v1.md` | C1: legal notice, privacy, terms, data deletion EN/ES with the Meta sections | Implementer (hotfix v3), Owner (the gaps), Social (confirm §12), counsel |
| `COUNSEL_PACKAGE_v2.md` | C5: corrected in place | Owner, then counsel |
| `WEBSITE_COPY_SYNC_0928_RETURN_v1.md` | this record | Audit |

`PRODUCT_TEXTS_C3_v1.md` and `AUTH_COPY_v1.md` stay in force. `LAUNCH_COPY_v1.md` is a **delta against
the rendered state**, not a fresh document round: where it names no key, the text at `e39ad06` stands.

## 3. Finding by finding

Format: ID → file and section → before → after → evidence → state.

| ID | Where | Before | After | Evidence | State |
|---|---|---|---|---|---|
| Z04 | `LAUNCH_COPY_v1` §2 S-01…S-03, §5.3 | "Most agencies start here", "La mayoría empieza aquí", "never need another one" | removed; a fit line may only return if it names confirmed plan limits | no customer figures exist anywhere | CLOSED in copy |
| Z05 | §4.1–4.4 | customer gives no name, reply says "Hello Laura", "Thursday morning or afternoon both work", no notice in the example | Laura introduces herself; the wish is noted and a person confirms; the ES card carries the approved `v1.0-es` WhatsApp text verbatim; a fourth surface shows the task | `COUNSEL_PACKAGE_v1.md` §E.1; R36 | CLOSED in copy |
| Z06 | §2 S-04…S-06, S-11, S-12, S-16; §3.4; §6 | "What is not ready yet", "Certified internally", "External gate pending", catalog code, "test environment", the browser-versus-backend block | all removed; the register in §1 carries the truth instead of the page | R27 | CLOSED in copy |
| Z07 | §1 L-10, L-16…L-20; §6.1; §7.1 | "attachments, voice notes, Outlook … in development", "Every message, from every channel", "Universal CRM" | the four unproven provider claims are `hidden`; the CRM headline is bounded to connected channels; "Universal" removed | `PRODUCT_TRUTH_TABLE_v1` not delivered, so C6 applies | CLOSED in copy, blocked on API for any positive statement |
| Z08 | §1 L-12; §3.4 | "Branded email is in development", logo and signature promised on the home page | the whole `home.brand` block is out until the branding chain and one real sent mail exist | no real branded mail since 2026-09-22 | CLOSED in copy |
| Z09 / A-W4 | §1 L-13; FAQ §1 rule 4 | the question box rendered publicly with no working answer path | `hidden` until `WEBSITE_QA_STAGING = PASS` **and** an approved web text; the knowledge base and the boundary rules are delivered | `WEBQA-STG-93233`; R25 | copy CLOSED, path open at Hosting and Lead |
| Z10 | FAQ §7 | "saved" and "handed over" stated before the request returned; contact asked for a name | both sentences describe what has happened; contact is e-mail or phone | R25 | CLOSED in copy |
| Z11 / Z03 / R26 | §5.1, §5.2, §5.3 | every card linked to `/signup`; trial wording assumed Essential | interim wording now, Essential wording only after `TRIAL_PLAN_ALIGNED`; Growth and Scale go to a proposal | `BILLING-TRIAL-VS-ESSENTIAL-1` | copy CLOSED, gate at API |
| Z12 | §3.4 | `operating-map` nodes with a legend grading our own build | removed; the one-system idea keeps one short text block | Z12 | CLOSED in copy |
| Z15 / R28 | §2 S-08, §6 | "Room by room, through the real doorways" / "por las puertas reales" | replaced by the single on-request sentence until `3D_FEATURE_TRUTH` arrives | the panorama product was discontinued 2026-09-08 | CLOSED in copy, waiting on 3D |
| Z16 | §3, §9 | home ≈ 1,990 EN / 2,120 ES words | one story: hero, three pain lines, four steps, one product view, one system block, packages, short FAQ, close; two home blocks and two cards removed | Z16 | CLOSED in copy, to be measured on the rendered page |
| Z18 | §8 E-01…E-08 | "puertas" as approval gates, "catorce días", double language and payment questions | each with its exact location and correction | Z18, R30 | CLOSED in copy |
| Z19 | §7.1 | "Book a demo" with no proven booking | "Request a demo" until `DEMO_PATH = PASS`, then "Book a demo" | Reviewer has not run the test booking | CLOSED in copy |
| A-W7 | FAQ §8 | no approved text for the web channel | draft EN/ES plus the three questions counsel must answer | production returns `channel_outside_approval` for the web channel | DELIVERED to counsel |
| Meta M1 | `LEGAL_PAGES_FINAL_v1` §2.1 §12, §2.2 §12, §4 | legal texts contain **0** occurrences of Instagram, Meta, WhatsApp, Facebook; `/terms` and `/data-deletion` 404 | Instagram and Meta section EN/ES, deletion page with the Meta callback path and the confirmation code, terms and deletion as public pages with the three URLs for the Meta forms | Social evidence G7; `instagram_business_basic` + `instagram_business_manage_messages` | DELIVERED, needs Social's confirmation and the owner's entries |
| WR-33 / WR-34 | §6.1 | Reviewer reports both open | by the code both claims carry a qualifier in place (`page.tsx:47`; `platform/[slug]/page.tsx:53`); the review searched for the superseded `q2` literal, which is not the hero's qualifier since C3. The three absolute headlines **are** a real defect and are rewritten | `en.ts:137`, `es.ts:130`, `en.ts:75` | handed back to the Reviewer for a re-check; headlines CLOSED in copy |

## 4. What I corrected in my own earlier work

| # | Correction | Why it mattered |
|---|---|---|
| 1 | `COUNSEL_PACKAGE_v2.md` §0a C-1: "a channel without an approved text falls back to the e-mail text" | **Refuted for production.** `ai_disclosure_render` selects per channel and stops with `no_text_for_channel`. The fallback to the WhatsApp text exists in the **staging** gate. Evidence `DISCLOSURE-FN-BYTES-0924`. I had told counsel the system does not fail closed, when it does |
| 2 | §0a C-2: "an unapproved sentence reaches real customers today" | **Not established.** 0 production customer runs since 2026-09-20, all eight notices inactive, e-mail held, WhatsApp under a regime that would answer without any notice and which R34 corrects to held. The urgency stands; the reason was wrong |
| 3 | §0a C-3: "two texts are live in production" | withdrawn; whether the hard-coded interim string still exists at all is now an open fact for Hosting, not a finding |
| 4 | D2: the "known defect" paragraph | replaced with what is true, which is better for us: a voice channel with no approved text is held, not improvised |
| 5 | T-01 | rewritten to the staging defect that actually exists, with `STG_DISCLOSURE_GATE_FIXED` as its signal |

Point 1 is the one I would have wanted caught earlier: a counsel package that misstates the failure
mode invites the wrong legal answer.

## 5. Hard blockers and marked gaps

Nothing in this round is blocked in a way that stopped the work. These are the entries other people
must fill before publication, each exactly marked in the files.

| # | Gap | Who | What it blocks |
|---|---|---|---|
| 1 | ⟦OWNER: LEGAL_FORM⟧, ⟦OWNER: NIF⟧, ⟦OWNER: ADDRESS_FULL⟧ | Owner | all four legal pages. Today only name, city and e-mail are published; a Spanish legal notice needs the tax number and the full address, and Meta's business verification compares them with the official document |
| 2 | ⟦OWNER+COUNSEL: RETENTION⟧ | Owner, then counsel | privacy section 7. A proposal per data category is ready in `LEGAL_PAGES_FINAL_v1.md` §2.7 to be approved or corrected |
| 3 | ⟦HOSTING: SUBPROCESSOR_LIST⟧ | Hosting (`SUBPROCESSOR_LIST_v1`) | privacy sections 6 and 10. Until it arrives the notice names categories plus the processors that are certain |
| 4 | ⟦COUNSEL: DPA⟧, ⟦COUNSEL: LIABILITY⟧ | counsel | terms sections 8 and 10 |
| 5 | `PRICING_AUTHORITY` | Owner | no amount anywhere; the plan pages render without figures |
| 6 | `PRODUCT_TRUTH_TABLE_v1` | API | L-18 CRMs, L-19 Outlook, L-20 Sheets stay hidden and get no positive sentence |
| 7 | `META_LEGAL_SECTIONS` as a signal | Social | the Meta sections are written from Social's own 2026-09-23 §5 specification and need Social's confirmation |
| 8 | No preview URL | Implementer | the layout check of the copy could not be done on a rendered page (§7) |

**The implementer does not publish a legal page while a ⟦…⟧ is still in it.** That rule is in the file.

## 6. One contradiction I am reporting upward

The owner is asked to set `DISCLOSURE_LIVE_TEXT = v1.0-es`, and API's A1b is asked to prove
`ai_disclosure_render(<pilot>, 'email', 'es')` returns the **pilot agency's** legal name from
`agency_branding`. Those two cannot both hold. The approved `v1.0-es` **e-mail** text reads
"asistente de inteligencia artificial de NuovaSolution": it names our company, has no placeholder, and
would tell the pilot agency's customers that the assistant is ours. The version that names the agency
is `v1.1-es` (`{{agency_legal_name}}`), and that one is pending counsel.

The **WhatsApp** text of `v1.0-es` does not have the problem, because it names no company. So the pilot
can start on WhatsApp under `v1.0-es` without this conflict, while the e-mail channel needs either
counsel's approval of `v1.1-es` or an explicit owner decision to send the vendor's name from the
agency's mailbox.

What I did with it in copy: the demo example on the website uses the **WhatsApp** text and never the
e-mail text in an agency-branded message. Recorded as `COUNSEL_PACKAGE_v2.md` D1 question 4 and owner
decision O-4. This is an activation-plan contradiction, not a copy problem, and it belongs to API,
the Owner and counsel.

## 7. One task I could not complete

Task 8 of the assignment, checking the design copy with the implementer **in the actual layout**:
headline length, line breaks, mobile reading and the alternating rhythm can only be judged on a
rendered page. There is no preview URL (`WEBSITE_REVIEW_URL` not reported, gate N7 not reached, and the
Reviewer's `DESIGN_PROBE_TECH_CHECK` is NOT RUN for the same reason).

What I did instead: derived character budgets per slot from the components at `e39ad06`
([hero-stack.tsx](components/site/hero-stack.tsx), [stage-stack.tsx](components/site/stage-stack.tsx),
[product-views.tsx](components/site/product-views.tsx)) and the type scale, checked every EN and ES
string in `LAUNCH_COPY_v1.md` against the longer of the two, and wrote the line-break intent for the
hero and the section rhythm (`LAUNCH_COPY_v1.md` §9). That is a text-level check, not a visual one, and
§9 says so. As soon as a preview exists I check every slot against it and return the deviations.

## 8. Decision I took that the Audit should confirm or overturn

C2 proposed Social as `on_request` with one sentence. I set L-16 (Instagram and Facebook) to
**`hidden`** instead, because there are 0 provider calls, the legal pages are not public yet and the lab
release has not been given, so we could not even show it in a demo. Voice and Property Experience 3D
stay `on_request` with exactly one sentence each, as instructed. If the Audit rules otherwise, the
sentence pattern is ready in `LAUNCH_COPY_v1.md` §7.2 and one line is added. Nothing is silently
dropped: L-16 keeps its row, its evidence and its gate.

## 9. What I did not touch

No application code. Every change in these files is applied by the Website Implementer, including the
strings in `capabilities.ts`, `legal.ts`, `plans.ts`, the dictionaries and the media manifest. No other
lane's documents. No status document belonging to another lane. No git history change, no push, no
merge, no deployment. No n8n, Supabase, webhook, credential or external request. The working tree also
holds the Implementer's and the Reviewer's concurrent work; none of it is staged by me.
