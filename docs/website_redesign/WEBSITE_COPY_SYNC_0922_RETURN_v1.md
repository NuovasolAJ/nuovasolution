# WEBSITE COPY / PRODUCT TRUTH / DIRECTOR — SYNC_0922 RETURN v1

**State:** `2026-09-22_SYNC_0900Z` · **Written:** 2026-09-22T08:11Z onward
**Workspace:** `C:\Users\Usuario\Desktop\Nuovasolution`, branch `website_enterprise_redesign`
**Scope:** texts and status documents only. No application code, no n8n, no database, no API call,
no webhook, no push, no deployment. Own texts are not declared independently reviewed.

Owner instruction of 2026-09-22 applied over PROMPT_11 where they differ: the approved form of
address is **not** reopened, so the dispatch item "bundle D4 (usted vs tú) with counsel" is
withdrawn.

## 1. Signals

```
WEBSITE_CLAIM_REGISTER_CODE_CHECK = 2 deviations (+1 accepted, +1 open condition) @2089094   2026-09-22T08:11Z
SIGNATURE_COPY_FINAL             = v1 (copy version signoff-v2)                              2026-09-22
ROLE_LABEL_RECOMMENDATION        = harmonised (es "Asistente de IA de {brand}", it "Assistente IA di {brand}") → Lead decides
DISCLOSURE_DRAFTS_EN_DE_IT       = DELIVERED (v1.0 and v1.1 equivalents, email/whatsapp/form, DRAFT – not legally reviewed)
LEGAL_DRAFTS_META                = DELIVERED (privacy, terms, data deletion, EN+ES, DRAFT – not legally reviewed)
COUNSEL_PACKAGE                  = DELIVERED (one package, 19 legal questions, technical gaps routed to lanes)
OLD_SITE_HOTFIX_COPY             = DELIVERED (awaits owner WEBSITE_LIVE_CLAIM_FIX)
META_REVIEW_COPY                 = DELIVERED (narration bound to actions; 0 clips recordable today)
STATUS_DOCS_2026_09_22           = DELIVERED (PRODUCT_TRUTH, CLAIMS_MATRIX, IMPLEMENTATION_STATUS)
```

## 2. Chains × seven stages (this lane's deliverables)

1 implemented · 2 locally checked · 3 staging · 4 real provider · 5 prod · 6 owner visibly tested ·
7 independently accepted. Stages 3 to 5 do not apply to texts until another lane renders them.

| Deliverable | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
|---|---|---|---|---|---|---|---|
| Register v2 code check | ✅ | ✅ all 106 rows, both locales, full string scan | n/a | n/a | n/a | ❌ | ❌ Reviewer |
| Signature final | ✅ | ✅ matches renderer v2 closings; mapping validated as JSON by eye | ❌ un-mock window | ❌ | ❌ prompt and fallback still in prod | ❌ | ❌ |
| Disclosure equivalents | ✅ | ✅ faithful to source register per channel | n/a | n/a | n/a | ❌ | ❌ counsel |
| Legal drafts (privacy, terms, deletion) | ✅ | ✅ facts sourced, gaps as slots | n/a | n/a | n/a | ❌ | ❌ counsel |
| Old site hotfix copy | ✅ | ✅ each key checked against the matrix | n/a | n/a | ❌ not deployed | ❌ | ❌ Reviewer |
| Meta review copy | ✅ | ✅ bound to Social's scripts | ❌ no flow works | ❌ | ❌ | ❌ | ❌ |

## 3. Evidence

| Item | Value |
|---|---|
| Code checked | `2089094` (`website_enterprise_redesign`); HEAD `0b813d0` docs only |
| Evidence index state read | `2026-09-22_SYNC_0900Z` |
| Audit live read used | `governance/dispatch_2026-09-22/PROMPT_*.md` common block, rulings R1 to R7 |
| Disclosure texts, verbatim source | `build/ai_disclosure/10_apply.sql`, confirmed by the Audit's read |
| Renderer v2 strings | `scripts/waves/2026-09-21_sync1215z/render_compose_email_v2.js` (sha256-16 `1c8754aa6995e1d9`) per `HOSTING_SYNC_0921_RETURN_v1.md` |
| Old site strings | `git show main:translations/{en,es}.ts`, `main:components/live-demo/live-demo-client.tsx`, `main:app/layout.tsx`, `main:app/live-demo/page.tsx` |
| Commit of this return | see §3 of the chat report and `git log` |

## 4. Open points

| # | Open | Next | Closing signal |
|---|---|---|---|
| 1 | DEV-1, DEV-2 (qualifier placement), OC-1 (Q&A clause) | Implementer; API answers Q&A retention | `WEBSITE_CLAIM_DEVIATIONS_FIXED` + SHA |
| 2 | Role label decision | Lead | `ROLE_LABEL_DECISION = <harmonised|lead_spec>` |
| 3 | Remove prompt lines 93 to 99 and fallback N3; run S1 to S12 on real replies | Lead + Hosting | `REPLY_CONTRACT_V2 = STAGING_PASS`, new Main sfp |
| 4 | Brand fallback must stop at `brand_display_name`; logged locale fallback | Hosting | same |
| 5 | `ai_disclosure_render`: fail closed on empty agency name; voice branch; null approval date on v1.1; store §E.5 rows inactive | API | API return naming the migration |
| 6 | Main switches to `rpc/ai_disclosure_render`; §E.4 behaviour | Hosting | `DISCLOSURE_READ_PATH = PROD` |
| 7 | Counsel package C-01 to C-19 | owner forwards to counsel | written answers per `COUNSEL_DECISION_IMPORT_SCHEMA_v1.json` |
| 8 | Technical facts API-1 to WEB-1 | named lanes (`COUNSEL_PACKAGE_v1.md` §J) | facts in their returns |
| 9 | Old site hotfix PR, score ring number removed | Implementer after owner YES | `WEBSITE_LIVE_CLAIM_FIX = DEPLOYED` + Reviewer readout |
| 10 | Meta clips | Social | `META_CLIP_<letter>_RECORDABLE = YES` per clip |
| 11 | The Implementer is building `lib/content/connect-notice.ts` from `CONNECT_NOTICE_DRAFT_v1.md` | Implementer | the notice renders no unresolved `⟦…⟧` slot and stays in its pending state until the slots are filled (rule §A.4.1) |

## 5. Owner decisions, recommendation first

| Decision | Recommendation |
|---|---|
| `WEBSITE_LIVE_CLAIM_FIX` | text only hotfix of the old site now (`OLD_LIVE_SITE_HOTFIX_COPY_v1.md`) |
| `DISCLOSURE_LIVE_TEXT` | activate v1.0-es now |
| `DISCLOSURE_INTERIM_NON_ES` | NO: non Spanish replies go to a person until an equivalent is approved |
| D1 trial extension | keep it out of public texts (already implemented) |
| D2 CRM vendor names as text | yes, text only, "not offered yet" |
| S-02 simulation disclosure for `/live-demo` | approve the wording in `OLD_LIVE_SITE_HOTFIX_COPY_v1.md` §3.2 |

## 6. What actually works now, per chain

- **Register:** every public statement on the rebuilt site has an evidence reference, and none is stronger than the index.
- **Signature:** a final four language mapping exists; real replies still carry the old signature until Lead and Hosting remove the prompt closing and the fallback.
- **Disclosure:** Spanish has one approved text (inactive); EN, DE and IT exist as drafts ready for counsel and for inactive storage.
- **Legal texts:** complete drafts exist for privacy, terms and deletion in EN and ES; none can be published before counsel.
- **Old public site:** still shows rejected claims; the replacement text is ready.
- **Meta review:** words are ready for every clip; no clip can be recorded yet.

## 7. Owner test

Nothing in this round is runnable by the owner; these are documents. One five minute read replaces a
test:

| Step | Action | Expected |
|---|---|---|
| 1 | Open `docs/website_redesign/COUNSEL_PACKAGE_v1.md` §K | four decisions with a recommendation each |
| 2 | Open `docs/website_redesign/OLD_LIVE_SITE_HOTFIX_COPY_v1.md` §2.6 and §3.2 | trial and simulation wording you can approve in one line |
| 3 | Reply with the decision lines, for example `WEBSITE_LIVE_CLAIM_FIX = a`, `DISCLOSURE_LIVE_TEXT = v1.0-es`, `DISCLOSURE_INTERIM_NON_ES = NO` | the next lanes can act |

No screenshots needed. Monitoring chat for the follow up: this lane for text, the Website Reviewer
for the deployed result.
