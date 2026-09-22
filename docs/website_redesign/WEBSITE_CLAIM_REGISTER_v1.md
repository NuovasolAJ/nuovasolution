# WEBSITE CLAIM REGISTER v1

> **Superseded for status and code conformance by `WEBSITE_CLAIM_REGISTER_v2.md` (2026-09-22).**
> The row definitions below remain valid. **One correction:** the corrections for WCR-021 point 3
> and WCR-065 read "remove", not "`in_implementation`": `CLAIMS_MATRIX.md` D-10 forbids every hot
> lead wording, including "being built". The page count in §0.4 is 61, not 62 (review WR-24).

**State:** `2026-09-21_SYNC_1215Z` · **Written:** 2026-09-21
**Lane:** Website Copy / Product Truth / Director
**Branch:** `website_enterprise_redesign` (local, never pushed)
**Status of this document:** DRAFT by its author. **Not independently reviewed.** Truth and UX
review: Website Reviewer. Legal wording: counsel. This document does not change application code;
the Website Implementer applies corrections.

> Every product or service statement on the rebuilt website, checked against what is actually
> evidenced today. A claim keeps its place in the product scope when it is future or partial;
> only its tense and availability wording change. Nothing here reduces the offered product.

---

## 0. How to read this register

### 0.1 Sources, in precedence order

1. `NuovaSolution-n8n-system/governance/CLOSEOUT_EVIDENCE_INDEX_v1.md`, canonical state
   `2026-09-21_SYNC_1215Z`. `LV` = re-read by the Audit (LIVE_VERIFIED). `RO` = stated by a lane,
   not re-read (REPORT_ONLY). LV outranks RO.
2. The Audit's live read of 2026-09-21 ~12:00Z, carried in
   `governance/dispatch_2026-09-21/PROMPT_*.md`, findings F1 to F8.
3. Lane records newer than the index, used only where they add a later fact and marked RO.
4. Backend contracts (`CRM_ONBOARDING_DROPDOWN_CONTRACT_v1.md`, `ONBOARDING_FORM_FINAL_v1.md`,
   `WEBSITE_QA_*_CONTRACT_v1.md`, export v2) for what a surface is **designed** to do. A contract
   is never evidence that something runs.

**Not used as evidence:** the owner's canonical audit of 2026-09-08 (the source of the website's
current `live` flags) where a newer record contradicts it; the dispatch's own summary line
"nachgewiesen real heute", which §3 tests claim by claim; this repository's previous status
documents, which are stale (see §5).

### 0.2 Evidence keys used below

| Key | Record | Env | Level | What it proves |
|---|---|---|---|---|
| **E-WA** | Index `WA-PROD-E2E-1`, 2026-09-14 | prod | LV | Real WhatsApp text in, real reply delivered (24 s, one run, owner's own number), memory write, enquiry `3be0428f…`, `viewing_request` task `32711087…` |
| **E-GM** | Index `GMAIL-REGRESSION-0920`, 2026-09-20 | prod | LV | Real Gmail in, exactly one reply delivered in thread, new `leads` row with intent, location, budget, type, score 45 warm. **Data effect OPEN**: F1 to F8 |
| **E-GM0904** | `GMAIL_REAL_E2E_FINAL_CLOSEOUT_v1.md`, 2026-09-04 | prod | RO | Two real Gmail enquiries answered in thread; same person across two threads on one channel; one internal Google Sheet row upserted |
| **E-BOOT** | `API_OWNER_BOOTSTRAP_PROD_2026-09-21_v1.md`, 12:33Z | prod | RO (newer than the index) | Owner provisioned as `agency_admin` by an operator action. **Not self service.** Owner session walk still unproven |
| **E-DAILY** | Index `DAILY-UI-WALK-STG-1`, `DAILY-JWT-1` | staging | LV screens | Daily Goals UI walk in staging. Prod walk blocked (`DEF-DG-BIND-INTERNAL-1`) |
| **E-CRMSTG** | `CRM_ONBOARDING_DROPDOWN_CONTRACT_v1.md` (staging read 2026-09-15); `CRM_PRODUCT_CLOSEOUT_FINAL_v1.md` 2026-08-09 | staging | RO | Native CRM default and Sheets projection selectable in staging; HubSpot, Pipedrive, Zoho, Salesforce real OAuth on staging brokers in August, now `coming_soon`, not selectable, sync fenced. **Prod has none of the catalogue functions and no `contacts` table** |
| **E-ALERT** | `LEAD_ENGINE_SYNC_1805Z_v1.md`; `CRM_ATTACHMENT_AND_ALERT_IDENTITY_CLOSEOUT_v1.md` | staging only | RO | Hot lead check fires at RPC level in staging. In prod run 36718 the lead was hot and **no alert was sent**; prod alert target is hard coded |
| **E-PM** | PROMPT_07; `PM_SYNC_0730Z_P1_P5_v1.md` | staging | RO | Matching 61/61 on fixtures. Prod `[PM: Match Properties]` returned `{}` (F5); no prod inventory; rights gate and customer display decision M1 open |
| **E-MM** | Index `MM-0730Z-1`, `MM-M1-SAFE-CHAIN-1` | staging | LV/RO | Media analysis in staging. **Prod media plane absent** (LV) |
| **E-VOICE** | `VOICE_REAL_PSTN_CALL_EVIDENCE_v1.md`; PROMPT_06 | staging | RO | A real call reached the voice provider but not the pipeline. Number is staging. No legal gate |
| **E-SOCIAL** | `SOCIAL_SYNC0730Z_RETURN_v1.md`; PROMPT_08 | staging | RO | Owner flow 41/41 internal. **Meta verification and app review not submitted**, `SUBMIT_READY=NO` |
| **E-TRIAL** | Export v2 §C1, §C2, §C5; `AGENCY_ONBOARDING_TRIAL_GROWTH_*` | staging | RO | 14 days free, no payment instrument, one +7 after an approved testimonial. **Not in prod.** Video media pipeline does not exist (MF-01) |
| **E-QA** | `WEBSITE_QA_INGRESS/RESPONSE_CONTRACT_v1.md`; `SYNC_0730Z_HOSTING_ROUND_v1.md` H6 | staging | RO | Ingress and store built; **answer step simulated**; nothing in prod |
| **E-PX** | Index `PX-TOOLCHAIN-1` | local | RO | Toolchain works on a synthetic room. **No real property, no human QA sheet** (`PX-REAL-1` pending) |
| **E-DSAR** | `DEL1_STAGING_CLOSEOUT_EXECUTION_EVIDENCE_v1.md`; `COUNSEL_TECHNIK_BRIEF_v1.md` §5 | staging | RO | Erasers exist in staging. **Deletion in prod not certified**; `OFFBOARDING-E2E-1` pending |
| **E-GATE** | `ONBOARDING_FORM_FINAL_v1.md`; readiness SQL | staging | RO | Mandatory gate `ai_disclosure` is counsel pending, **so no tenant can currently be activated** |

### 0.3 Status vocabulary

| Register status | German | Meaning | Website status it may carry |
|---|---|---|---|
| **PROD_PROVEN** | nachgewiesen in Prod | A real prod run with real provider delivery and the data effect evidenced | `live` |
| **PROD_PARTIAL** | teilweise in Prod | Part of the claim runs in prod; the rest does not, or has an open defect | `live` only for the proven part, and the wording must be narrowed to it |
| **STAGING_ONLY** | nur Staging | Built and tested in staging or locally; nothing in prod | `in_implementation`, `final_acceptance` or `certified_gate_pending`, never `live` |
| **PLANNED** | geplant | Designed or contracted, not built end to end | `in_implementation` |
| **NOT_EVIDENCED** | nicht belegbar | No record supports it, or a newer record contradicts it | Must be removed or reworded |
| **LAUNCH_CONDITIONAL** | gilt ab Launch | A statement about the offer that becomes true only when a release gate opens (signup live, trial live). Correct copy for a public site **only if** the release gate is enforced | Rendered only when the gate is open; otherwise the existing stub notice |

Flags: **LEGAL** (held by a counsel dependency), **OWNER** (needs an owner decision), **CONFLICT**
(two authorities disagree; both named).

### 0.4 Scope

The rebuild reports 62 statically generated pages. They render from **21 route templates in two
locales**: home, platform, nine capability pages, packages, trial, signup, login, onboarding,
connect callback, contact, and four legal pages. All customer facing strings live in
`lib/i18n/dictionaries/{en,es}.ts`, `lib/content/capabilities.ts`, `lib/content/statuses.ts`,
`lib/content/legal.ts`, `lib/contracts/stubs.ts` and six inline strings in
`components/site/onboarding-wizard.tsx` and `auth-forms.tsx`. Every product statement in those
files is listed below. Pure navigation labels, form field labels and error strings with no product
claim are not listed.

---

## 1. Summary

**106 rows registered** (WCR-001 to WCR-175, numbered in blocks per route; counted from §2).
Each row carries exactly one register status and, where needed, a correction. Rows that need no
change say "None".

**The five corrections that matter most, in order:**

1. **Hot lead alerts are presented as `live` on eleven surfaces. They are not evidenced in prod.**
   The one prod run where a lead was hot sent no alert, and the prod alert target is hard coded to
   the owner's phone. `CLAIMS_MATRIX.md` D-10 already blocks every wording. → `in_implementation`
   everywhere, and removed from the hero lead and the operating picture path.
2. **Property Matching is `live` with a scenario that sends "three properties".** Prod matching
   returned `{}` on 2026-09-20, there is no prod inventory, and showing properties to customers is
   an open owner decision (M1). → `in_implementation`; scenario retensed; the count removed (F-03).
3. **"Native CRM plus Google Sheets, in use today."** Prod stores leads and their qualification;
   it has no CRM screen, no `contacts` table and none of the catalogue functions. The Sheet in prod
   is NuovaSolution's own internal sheet, not an agency adapter. → split into what runs (leads are
   recorded with qualification and history) and what is being built (the CRM view and Sheets per
   agency).
4. **The trial page and three other surfaces advertise the +7 day extension after an "honest video
   and written review".** `CLAIMS_MATRIX.md` T-03 is LEGAL and forbids every wording in public
   marketing, and no video upload or storage pipeline exists (T-03c, MF-01), so the mechanism as
   advertised cannot be carried out. **CONFLICT** with the owner supplied copy recorded in
   `WEBSITE_REBUILD_STATUS.md` §2. Decision prepared in §4.
5. **The Spanish Daily Assistant lead says "Disponible ahora".** The English says it is not
   offered, the status is `final_acceptance` with `publiclyAvailable: false`, and the prod walk is
   blocked. A straight translation defect with a false availability claim. → fixed wording in §2.

**What holds up well.** WhatsApp text dialog (PROD_PROVEN, LV), Gmail reply transport (PROD_PROVEN
for transport, LV), lead capture with qualification and a warm or hot priority (PROD_PROVEN, LV),
viewing request becoming a staff task (task creation PROD_PROVEN, LV), every "not offered yet"
statement, the no price rule, "no payment method required" and "no sales call required" as offer
terms, the step state honesty rules and the stub notices.

---

## 2. The register

Columns: **ID** · **Route (both locales unless noted)** · **Claim as published (EN; ES only where
it differs in substance)** · **Website status today** · **Register status** · **Evidence** ·
**Correction**. Replacement wording is given in EN and ES where a change is needed. No dashes.

### 2.1 Site wide: meta, header, hero, status labels

| ID | Route | Claim | Web status | Register | Evidence | Correction |
|---|---|---|---|---|---|---|
| WCR-001 | all · meta description | "Every enquiry answered, understood and carried forward in one system with one memory of the customer." | n/a | PROD_PARTIAL | E-WA, E-GM; cross channel memory STAGING_ONLY (E-GM0904 same channel only) | Narrow. EN: "Enquiries answered, understood and carried forward in one system, with one record of each customer." ES: "Consultas respondidas, entendidas y llevadas hacia adelante en un solo sistema, con una sola ficha por cliente." |
| WCR-002 | `/` hero lead | "Every enquiry gets an answer, day or night. Every conversation is understood and carried forward. **Your agents hear about the ones that are ready.**" | n/a | Sentences 1 and 2 PROD_PARTIAL (qualifier Q-2 required, B-04). Sentence 3 NOT_EVIDENCED | E-WA, E-GM; E-ALERT | Keep sentences 1 and 2 with the Q-2 qualifier beneath. Replace sentence 3. EN: "Your agents start from the ones that are ready." ES: "Tus agentes empiezan por las que están listas." (priority signal, D-03, PROD_PROVEN via score) |
| WCR-003 | `lib/content/statuses.ts` `live.sentence` | EN "Running for a first agency on real channels." ES "Funcionando para una primera agencia en canales reales." | label for every `live` item | **NOT_EVIDENCED** | Only NuovaSolution's own tenant and the owner's test identities run in prod (E-WA, E-GM, E-BOOT). No external agency tenant is on record | EN: "In use today on real WhatsApp and email traffic, in our own agency environment." ES: "En uso hoy con tráfico real de WhatsApp y email, en nuestro propio entorno de agencia." |
| WCR-004 | `statuses.ts` `premium_on_request` | `publiclyAvailable: true`, "Requested, then delivered once accepted." | label | PROD_PARTIAL | E-PX: requests can be taken by a person; **no delivery has ever been made** | Keep label. Sentence EN: "A premium service we prepare for you on request. The first deliveries are in preparation." ES: "Un servicio premium que preparamos para ti bajo petición. Las primeras entregas están en preparación." |
| WCR-005 | header CTA, many CTAs | "Start free" / "Empieza gratis" | CTA | LAUNCH_CONDITIONAL | T-01 approved wording (CLAIMS_MATRIX, owner closed decision C); E-TRIAL staging; signup not in prod | Correct as copy. **Render only when signup is released**; in stub mode the existing stub notice stays. No change of words |

### 2.2 Home `/[locale]`

| ID | Route | Claim | Web status | Register | Evidence | Correction |
|---|---|---|---|---|---|---|
| WCR-010 | hero note, closing caption, contact | "Try free for up to 21 days. No payment method required." | n/a | "up to 21 days": **LEGAL + NOT deliverable** (CONFLICT). "No payment method required": LAUNCH_CONDITIONAL | T-03, T-03b, T-03c; E-TRIAL | See §4 decision D1. Recommended EN: "Try free for 14 days. No payment method required." ES: "Prueba gratis durante 14 días. Sin método de pago." |
| WCR-011 | rail "Answer" | "Gmail and WhatsApp enquiries answered and carried forward." | n/a | PROD_PROVEN (text) | E-WA, E-GM | None. Add "text" only if the reviewer finds media implied: EN "Gmail and WhatsApp text enquiries…" |
| WCR-012 | rail "Understand" | "One customer record, qualified, **with a hot lead alert to your agents**." | n/a | Record and qualification PROD_PARTIAL; alert NOT_EVIDENCED | E-GM, E-ALERT | EN: "One record per customer, qualified and prioritised." ES: "Una ficha por cliente, cualificada y priorizada." |
| WCR-013 | rail "Advance" | "A short property selection with availability you can stand behind." | n/a | STAGING_ONLY | E-PM | Retense. EN: "Coming next: a short property selection with availability you can stand behind." ES: "Lo siguiente: una selección corta de propiedades con una disponibilidad que puedes defender." |
| WCR-014 | rail "Hand over" | "Daily Goals and an assistant that tells you what to do first." | n/a | STAGING_ONLY | E-DAILY | EN: "Daily Goals and an assistant, built and in final testing." ES: "Daily Goals y una asistente, construidos y en la prueba final." |
| WCR-015 | rail "Your environment" | "Each agency has its own branded environment, configuration, team and roles." | n/a | STAGING_ONLY as multi tenant proof; roles in prod for the owner only (E-BOOT) | E-CRMSTG, E-BOOT; tenant isolation not provable in prod (one real tenant) | Design statement, not a usage claim. EN: "Each agency is set up as its own environment: its brand, configuration, team and roles." ES: "Cada agencia se configura como su propio entorno: su marca, su configuración, su equipo y sus roles." |
| WCR-016 | gap section | Four ledger stories, close line | n/a | No product claim | n/a | None |
| WCR-017 | film section | "An enquiry arrives, is answered, becomes a customer record, reaches an agent, and turns into a property selection." | pending frame | "reaches an agent" PROD_PARTIAL (task created, not worked in a UI); "property selection" STAGING_ONLY | E-WA, E-PM, E-DAILY | Caption stays while the film is pending. **Recording V-01 today would have to show a matching step that does not run in prod.** Film script must stop at "becomes a customer record and a task for your team" until matching is live. Recorded in §6 for the Implementer and the recording plan |
| WCR-018 | operating picture nodes | "Gmail and WhatsApp → Answered → One customer record → Qualified → **Hot lead alert → Property match → Daily Goals**" | n/a | First four PROD_PARTIAL/PROVEN; last three not in prod | E-ALERT, E-PM, E-DAILY | Keep the path as the product picture, but mark the last three nodes as "next" visually and in text. Node labels unchanged; add a legend line. EN: "Solid steps run today. Outlined steps are being built." ES: "Los pasos sólidos funcionan hoy. Los pasos en contorno se están construyendo." |
| WCR-019 | chapter I points | "Gmail text enquiries: answered and replied to in use today." / WhatsApp same / "Attachments, WhatsApp media and Outlook are in development and not offered yet." | n/a | PROD_PROVEN / PROD_PROVEN / STAGING_ONLY correctly stated | E-WA, E-GM, E-MM, Outlook BUILT_INACTIVE | None |
| WCR-020 | chapter II lead | "…is one person in Nuova. The conversation is qualified, and a hot lead alert reaches your agents when it matters." | n/a | Cross channel identity STAGING_ONLY; alert NOT_EVIDENCED | E-GM0904 (same channel), E-ALERT | EN: "A client who writes twice on the same channel stays one person in Nuova, and every enquiry is qualified and prioritised. Recognising the same client across email and WhatsApp is being built." ES: "Un cliente que escribe dos veces por el mismo canal sigue siendo una sola persona en Nuova, y cada consulta se cualifica y se prioriza. Reconocer al mismo cliente entre email y WhatsApp se está construyendo." |
| WCR-021 | chapter II points | "One canonical customer identity across channels." · "Qualification on every enquiry." · "Hot lead alerts to your agents." · "Native CRM plus Google Sheets, in use today." | n/a | STAGING_ONLY · PROD_PROVEN · NOT_EVIDENCED · PROD_PARTIAL | as above, E-CRMSTG | Points in order. EN: "One customer identity across channels, being built." · "Every answered enquiry is qualified and prioritised." · "Hot lead alerts to your agents, being built." · "Every enquiry recorded as a lead with its qualification, in use today. The CRM view and Google Sheets per agency are being built." ES: "Una identidad de cliente única en todos los canales, en construcción." · "Cada consulta respondida se cualifica y se prioriza." · "Avisos de lead caliente a tus agentes, en construcción." · "Cada consulta queda registrada como lead con su cualificación, en uso hoy. La vista de CRM y Google Sheets por agencia se están construyendo." |
| WCR-022 | chapter III points | "Property matching with honest availability, in use today." · "A viewing request becomes a staff task. Built, with final acceptance still pending." · "Property Experience 3D … on request." | n/a | STAGING_ONLY · **PROD_PROVEN for task creation** · PROD_PARTIAL | E-PM, E-WA, E-PX | Point 1 EN: "Property matching with honest availability, being built." ES: "Property matching con disponibilidad honesta, en construcción." Point 2 stays: stage 7 (independent acceptance) and the agent side are open, so "final acceptance pending" is the correct tense. Point 3 per WCR-004 |
| WCR-023 | context items | "Your own inventory: your agency website, a supported feed or your CRM inventory as the property source." | n/a | STAGING_ONLY | E-CRMSTG, E-PM; F-02b is a contract | EN: "Your own inventory: your agency website, a supported feed or your CRM inventory, once property matching is live." ES: "Tu propio inventario: la web de tu agencia, un feed compatible o el inventario de tu CRM, cuando el property matching esté en marcha." |
| WCR-024 | context "Your own environment" | "Your brand, your configuration, your team and roles." | n/a | as WCR-015 | | as WCR-015 |
| WCR-025 | assistant section | "Built, with the final owner test still pending before it is offered." | n/a | STAGING_ONLY, correctly stated | E-DAILY | None (EN and ES agree here) |
| WCR-026 | "next" items | Voice: "**Nine languages** certified internally. Legal disclosure and provider gates pending." | n/a | Number NOT_EVIDENCED and forbidden (`CLAIMS_MATRIX.md` V-07: language counts); rest STAGING_ONLY | E-VOICE; no index row carries a language count | Remove the number. EN: "Certified internally. Legal disclosure and provider gates pending." ES: "Certificado internamente. Información legal y puertas del proveedor pendientes." Reinstate a number only with a record |
| WCR-027 | "next" items | Social Growth: "**Sixteen of twenty steps** built. **Meta review pending.**" | n/a | Number stale; "review pending" implies a submission that has not happened | E-SOCIAL (41/41 internal owner flow; `SUBMIT_READY=NO`) | EN: "Built and tested internally. The Meta review has not been submitted yet." ES: "Construido y probado internamente. La revisión de Meta todavía no se ha solicitado." |
| WCR-028 | "next" items | External CRMs: "HubSpot, Pipedrive, Zoho and Salesforce certified in August. **Current consent pending.**" | n/a | STAGING_ONLY; "consent" is not the gate on record. Naming vendors: **OWNER** (F-07, decision D) | E-CRMSTG: `coming_soon`, sync fenced pending a per provider decision | EN: "HubSpot, Pipedrive, Zoho and Salesforce connected with real authorisation in our August tests. Not offered yet; during setup you can register interest." ES: "HubSpot, Pipedrive, Zoho y Salesforce se conectaron con autorización real en nuestras pruebas de agosto. Todavía no se ofrecen; durante la configuración puedes indicar tu interés." Vendor names stay only if the owner confirms decision D |
| WCR-029 | "next" items | Meta Lead Ads and Google Lead Forms: "Certified on our internal harness. Provider test pending." | n/a | STAGING_ONLY, correctly stated | `LEAD_ENGINE_SYNC_1805Z_v1.md` §8 | None |
| WCR-030 | access step 1 | "Create your agency account. No payment method required, no sales call required." | n/a | LAUNCH_CONDITIONAL | E-TRIAL, T-01b, T-01d | None, gated render as WCR-005 |
| WCR-031 | access step 2 | "Your brand, your team and roles, your channels, your property source. Your progress is saved." | n/a | LAUNCH_CONDITIONAL (wizard staging only; progress and resume contracted) | O-00c | None, gated render |
| WCR-032 | access step 3 | "Fourteen days free, **and up to seven more**. After an honest video and written review…" | n/a | **LEGAL + NOT deliverable** (CONFLICT) | T-03, T-03c | §4 decision D1. Recommended EN title: "Fourteen days free" · line: "Set your agency up and decide with the system running." ES: "Catorce días gratis" · "Configura tu agencia y decide con el sistema en marcha." |
| WCR-033 | closing body | "Start free and see Nuova handle a real enquiry from your own agency." | n/a | LAUNCH_CONDITIONAL, and additionally conditional on activation: today **no tenant can be activated** because the `ai_disclosure` gate is counsel pending | E-GATE | Keep for launch. Launch requires the `ai_disclosure` gate cleared, or the sentence is untrue for every new agency |

### 2.3 Platform `/[locale]/platform`

| ID | Route | Claim | Web status | Register | Evidence | Correction |
|---|---|---|---|---|---|---|
| WCR-040 | platform lead | "…because the customer is one record rather than one record per tool." | n/a | PROD_PARTIAL (one lead record per identity per channel) | E-GM0904 | Keep; it describes design. Acceptable with WCR-020 on the capability pages |
| WCR-041 | tenant section | "Your logo, your email branding, your configuration, your team and your roles. **Nuova is invisible to your customers. They hear from your agency.**" | n/a | NOT_EVIDENCED today, and in tension with L-10 | F4: prod replies are signed "Antonio's AI Assistant"; F6: one black NuovaSolution logo, signature and footer null; white label never received in a real inbox for another agency | Replace sentence 2 with P-04 approved wording. EN: "Your customers hear from your agency, under your brand." ES: "Tus clientes reciben la respuesta de tu agencia, con tu marca." Status: in development until F4 and F6 close. "Invisible" is removed: it conflicts with AI disclosure (L-10) |

### 2.4 Capability pages `/[locale]/platform/[slug]`

**AI Sales Agent** (`ai-sales-agent`, overall `live`)

| ID | Claim | Web status | Register | Evidence | Correction |
|---|---|---|---|---|---|
| WCR-050 | h1 "Every enquiry gets an answer, and the conversation carries on." | live | PROD_PARTIAL | E-WA, E-GM; the Gmail keyword gate is English dominated, so "every" is not evidenced | Keep h1 (approved B-04 shape). The qualifier Q-2 must render on the page |
| WCR-051 | point "Gmail text intake and reply." | live | PROD_PROVEN for transport | E-GM (one send, LV) | None. Note: quality defects F4, F5 open; no quality claim is made, so none needs removing |
| WCR-052 | point "WhatsApp text intake and reply." | live | PROD_PROVEN | E-WA | None |
| WCR-053 | point "The conversation becomes part of one customer record." | live | PROD_PARTIAL | E-GM0904 same channel; F1 counter defect; F7 wrong match key in DemandRegistry | EN: "Each conversation is recorded against the customer." ES: "Cada conversación queda registrada en la ficha del cliente." Keep `live` |
| WCR-054 | points attachments, WhatsApp media, Outlook | in_implementation | STAGING_ONLY / BUILT_INACTIVE | E-MM, `OUTLOOK-ADAPTER-1` | None |
| WCR-055 | scenario "…the agent sees it on Monday as one thread rather than a notification." | illustrative | PROD_PARTIAL: the thread exists in data; **no agent screen exists in prod** | E-DAILY | EN end: "…and the conversation is recorded against the buyer for the agent on Monday." ES: "…y la conversación queda registrada en la ficha del comprador para el agente el lunes." |
| WCR-056 | fits "Your own branded environment. Customers hear from your agency, not from Nuova." | n/a | NOT_EVIDENCED today | F4, F6 | As WCR-041 |

**Lead Intelligence** (`lead-intelligence`, overall `live` → **must become PROD_PARTIAL wording**)

| ID | Claim | Web status | Register | Evidence | Correction |
|---|---|---|---|---|---|
| WCR-060 | navLine "Qualified, and your agents told" | live | half NOT_EVIDENCED | E-ALERT | EN: "Qualified and prioritised" ES: "Cualificado y priorizado" |
| WCR-061 | h1 "One customer, one record, and your agents hear about the ones that are ready." | live | PROD_PARTIAL | E-GM, E-ALERT | EN: "One customer, one record, and a clear priority on every enquiry." ES: "Un cliente, una ficha, y una prioridad clara en cada consulta." |
| WCR-062 | lead "…is one person in Nuova. Every enquiry is qualified, and a hot lead alert reaches your agents when it matters." | live | as WCR-020 | | Use the WCR-020 text |
| WCR-063 | point "One canonical customer identity across channels." | live | STAGING_ONLY | E-GM0904 same channel only; prod has no merge authority | status → `in_implementation` |
| WCR-064 | point "Qualification on every enquiry." | live | PROD_PROVEN | E-GM (score 45 warm) | EN "Qualification on every answered enquiry." ES "Cualificación en cada consulta respondida." |
| WCR-065 | point "Hot lead alerts to your agents." | live | **NOT_EVIDENCED** | E-ALERT; D-10 | status → `in_implementation` |
| WCR-066 | point "A priority signal so your team knows where to start." | live | PROD_PROVEN | E-GM | None |
| WCR-067 | scenario "…the agent responsible receives a hot lead alert with the conversation attached." | illustrative | NOT_EVIDENCED | E-ALERT | EN: "…the record is qualified and its priority rises, so the agent responsible starts there." ES: "…la ficha se cualifica y su prioridad sube, así que el agente responsable empieza por ahí." |
| WCR-068 | overall status `live` | | PROD_PARTIAL | | Keep `live` only because two of four points are PROD_PROVEN; the two others carry `in_implementation` per point |

**Universal CRM** (`crm`, overall `live`)

| ID | Claim | Web status | Register | Evidence | Correction |
|---|---|---|---|---|---|
| WCR-070 | lead "A CRM is included from the start, with Google Sheets alongside it. If your agency already runs on another CRM, connecting it is certified on our side and waits on the current consent." | live | PROD_PARTIAL / STAGING_ONLY / wrong gate named | E-CRMSTG | EN: "A CRM is included from the start: every enquiry is recorded as a lead with its qualification and history. The CRM view for your team and Google Sheets per agency are being built. Connecting HubSpot, Pipedrive, Zoho or Salesforce is not offered yet." ES: "Hay un CRM incluido desde el principio: cada consulta queda registrada como lead con su cualificación y su historial. La vista de CRM para tu equipo y Google Sheets por agencia se están construyendo. La conexión con HubSpot, Pipedrive, Zoho o Salesforce todavía no se ofrece." |
| WCR-071 | point "Native CRM, included." | live | PROD_PARTIAL | prod `leads`, `lead_memory`; no `contacts`, no UI | Keep `live`, reword EN: "Leads recorded with their qualification, included." ES: "Leads registrados con su cualificación, incluido." |
| WCR-072 | point "Google Sheets." | live | STAGING_ONLY for agencies | E-CRMSTG; prod sheet is NuovaSolution's own (E-GM0904, RO) | status → `in_implementation` |
| WCR-073 | point "The whole conversation history on one customer record." | live | PROD_PARTIAL | `lead_memory` holds history per identity; cross channel not proven | Keep `live`, EN: "The conversation history on the customer record." ES: "El historial de conversación en la ficha del cliente." |
| WCR-074 | point "HubSpot, Pipedrive, Zoho CRM and Salesforce." | certified_gate_pending | STAGING_ONLY; **OWNER** for naming | E-CRMSTG; F-07 | Keep status. Names subject to decision D |
| WCR-075 | scenario "…sees the email, the WhatsApp thread, the qualification, **the hot lead alert and the property selection that was sent**." | illustrative | NOT_EVIDENCED in two elements; no CRM screen in prod | E-ALERT, E-PM | EN: "The office manager opens one record and sees the email from last week, the qualification and the viewing request that became a task. Nothing has to be reconstructed." ES: "La responsable de oficina abre una ficha y ve el email de la semana pasada, la cualificación y la petición de visita que pasó a ser una tarea. No hay que reconstruir nada." Label stays "Illustrative" |
| WCR-076 | bothHalves certified "…certified with real authorisation in August." | | STAGING_ONLY, correct | `CRM_PRODUCT_CLOSEOUT_FINAL_v1.md` 2026-08-09 | EN: "…connected with real authorisation in our staging tests in August." ES: "…se conectaron con autorización real en nuestras pruebas de agosto." |
| WCR-077 | bothHalves pending "The current consent is pending. Until it clears, external CRM connection is not offered." | | wrong gate | E-CRMSTG: `coming_soon`, sync fenced pending a per provider release | EN: "Not offered yet. Each provider is released on its own after a final check. Until then you stay on the built in CRM, and choosing one during setup only records your interest." ES: "Todavía no se ofrece. Cada proveedor se activa por separado tras una comprobación final. Hasta entonces sigues con el CRM incluido, y elegir uno durante la configuración solo registra tu interés." |

**Property Matching** (`property-matching`, overall `live` → **must become `in_implementation`**)

| ID | Claim | Web status | Register | Evidence | Correction |
|---|---|---|---|---|---|
| WCR-080 | overall status and first three points | live | **STAGING_ONLY** | E-PM; F5 | All three points → `in_implementation`; overall → `in_implementation` |
| WCR-081 | lead "Nuova understands… matches… The customer receives a short selection." | live | STAGING_ONLY | E-PM | Present tense acceptable as product description once the status chip says in development. Add EN: "Being built. Not offered yet." as the first sentence. ES: "En construcción. Todavía no se ofrece." |
| WCR-082 | point "A viewing request becomes a staff task." | final_acceptance | PROD_PROVEN (creation), agent side open | E-WA | None. Candidate for a later upgrade once an agent claims a task in prod and the Reviewer accepts |
| WCR-083 | scenario "Nuova **sends three properties** from the agency's own inventory…" | illustrative | NOT_EVIDENCED, and F-03 forbids a fixed count | E-PM | EN: "Nuova sends a short selection from the agency's own inventory that matches, marks the one whose availability could not be confirmed, and the viewing request lands with the agent as a task." ES: "Nuova envía una selección corta del inventario propio de la agencia que encaja, marca la que no pudo confirmar como disponible y la petición de visita llega al agente como una tarea." |
| WCR-084 | fits "Your agency website as a property source" etc. | n/a | STAGING_ONLY | contract F-02b | Keep as fits; covered by the status chip |

**Daily Assistant** (`daily-assistant`, `final_acceptance`)

| ID | Claim | Web status | Register | Evidence | Correction |
|---|---|---|---|---|---|
| WCR-090 | ES lead "…**Disponible ahora.** La prueba final del propietario está en curso." | final_acceptance | **NOT_EVIDENCED, contradicts EN and status** | E-DAILY, prod walk blocked | ES: "Daily Goals y la asistente le dicen a tu equipo qué hacer primero, y por qué. Construido, con la prueba final del propietario todavía pendiente antes de ofrecerlo." (matches EN and home ES) |
| WCR-091 | points Daily Goals, assistant, branded email | final_acceptance | STAGING_ONLY | E-DAILY; Jarvis nothing in prod | Status correct. "An assistant that answers questions about your own leads…" ok under `final_acceptance` |
| WCR-092 | point "An employee assistant for internal tasks." | in_implementation | PLANNED | `JARVIS_PROD_PATH_DESIGN_v1.md` design only | None |
| WCR-093 | examples ("Who should I call today?" …) | "Example questions." | illustrative | I-01 to I-06 OWNER | None; the label is present |

**Voice** (`voice`, `certified_gate_pending`)

| ID | Claim | Web status | Register | Evidence | Correction |
|---|---|---|---|---|---|
| WCR-100 | lead and points "certified internally **in nine languages**" (three places) | certified_gate_pending | number NOT_EVIDENCED and forbidden by V-07; certification STAGING_ONLY | E-VOICE: the one real call did not reach the pipeline | Remove "in nine languages" in all three places. EN lead: "Voice handling is certified in our own testing. It is not offered until the legal disclosure and the provider gates clear." ES: "La atención por voz está certificada en nuestras propias pruebas. No se ofrece hasta que se resuelvan la información legal y las puertas del proveedor." Point: EN "Multilingual calls, certified internally." ES "Llamadas en varios idiomas, certificadas internamente." |
| WCR-101 | point "What the call produced lands on the same customer record." | certified_gate_pending | NOT_EVIDENCED for the real call path | E-VOICE: call did not reach our pipeline | Keep under the pending status; do not upgrade until a real call lands in the record |

**Social Growth** (`social-growth`, `certified_gate_pending`)

| ID | Claim | Web status | Register | Evidence | Correction |
|---|---|---|---|---|---|
| WCR-110 | navLine "Built, Meta review pending" · lead "Sixteen of twenty steps are built. The Meta review is pending." · bothHalves "Sixteen of twenty steps built and tested internally." | certified_gate_pending | number stale; review not submitted | E-SOCIAL | navLine EN "Built, Meta review not yet submitted" ES "Construido, revisión de Meta aún no solicitada". Lead EN: "Built and tested internally. The Meta review has not been submitted yet. Until it clears, Social Growth is not offered." ES: "Construido y probado internamente. La revisión de Meta todavía no se ha solicitado. Hasta que se resuelva, Social Growth no se ofrece." bothHalves certified EN "Built and tested internally." ES "Construido y probado internamente." |
| WCR-111 | notAvailable TikTok, Facebook Groups | not_available | correct (C-09 excluded) | CLAIMS_MATRIX C-09 | None |

**Lead Acquisition, Property Experience**

| ID | Claim | Web status | Register | Evidence | Correction |
|---|---|---|---|---|---|
| WCR-120 | Lead Acquisition, all points and both halves | certified_gate_pending | STAGING_ONLY, correctly stated | harness only | None |
| WCR-121 | Property Experience lead "A finished property experience, created by Nuova and checked by a person before it reaches a buyer. A premium service, on request, in preparation." | premium_on_request | STAGING_ONLY / local; correctly says "in preparation" | E-PX | None. Status sentence per WCR-004 |
| WCR-122 | PX scenario "…the accepted delivery reaches the agency. The buyer walks through it…" | illustrative | NOT_EVIDENCED as a past event; label makes it illustrative | E-PX | None; "Illustrative" label must stay adjacent |

### 2.5 Packages `/[locale]/packages`

| ID | Claim | Register | Evidence | Correction |
|---|---|---|---|---|
| WCR-130 | "Every paid package includes the core: CRM, Lead Engine, automatic replies, basic follow up, property matching and core reporting." | Names approved as package line items (PK-03). Behaviour: follow up LEGAL (E-01, L-01); matching and reporting STAGING_ONLY | PK-03 | Keep as names. Add beneath EN: "Each module's page shows what runs today and what is being built." ES: "La página de cada módulo muestra lo que funciona hoy y lo que se está construyendo." |
| WCR-131 | stub plan contents "Daily Assistant, Advanced reporting" in Growth; "Higher limits, Property Experience quota" in Scale | Labelled stub; PK-04 and PK-05 OWNER | `lib/contracts/stubs.ts` | Acceptable only while the stub label renders. Must not survive into staging or live mode unless `/plans` serves it |
| WCR-132 | "There is no self-service billing." / "Can I pay online? Not yet." | PROD_PROVEN as a negative | no billing authority (MF-10) | None |
| WCR-133 | "We tell you what it costs once we have seen yours." | correct: no price authority exists | MF-10 | None. Never replace with a figure |
| WCR-134 | FAQ "No payment method is required at signup." · "A demo is optional." | LAUNCH_CONDITIONAL | T-01b, T-01d | None |

### 2.6 Trial `/[locale]/trial`

| ID | Claim | Register | Evidence | Correction |
|---|---|---|---|---|
| WCR-140 | h1 "Try free for up to 21 days." | **LEGAL + NOT deliverable** (CONFLICT) | T-03, T-03c | §4 D1. Recommended EN h1: "Try free for 14 days." ES: "Prueba gratis durante 14 días." |
| WCR-141 | lead and "how" items 2 to 4 (extension, review, consent for public use) | **LEGAL + NOT deliverable** | T-03, T-03c, T-04, L-13 | §4 D1. Recommended: remove items 2 to 4 from public marketing until L-13 clears **and** MF-01 is built. Item 1 stays |
| WCR-142 | "how" item 1 "Fourteen days free… No payment method required. No sales call required." | LAUNCH_CONDITIONAL | E-TRIAL | None |
| WCR-143 | honesty lines "The browser never grants…", "A submitted review is stored as pending review…", "remaining days… come from the server" | Lines 1 and 3 design statements, correct. Line 2 belongs to the held mechanism | T-04 | Keep lines 1 and 3. Line 2 goes with D1 |
| WCR-144 | steps "Your progress is saved…" | LAUNCH_CONDITIONAL (O-00c) | contract | None |
| WCR-145 | step Branding "Every message goes out under your brand." | NOT_EVIDENCED today | F4, F6 | EN: "Your logo and your email banner, for the messages that go out under your brand." ES: "Tu logo y el banner de tus emails, para los mensajes que salen con tu marca." |
| WCR-146 | step Team "…roles: agent, team lead, office manager, agency admin." | correct (four roles, O-02) | E-BOOT, `AGENCY_USER_IDENTITY_ROLE_PLANE_v1.md` | None |
| WCR-147 | step CRM "A CRM is included from the start. If you already use another one, **you can connect it instead**." | second sentence NOT_EVIDENCED: external CRMs are `coming_soon`, interest only | E-CRMSTG | EN: "A CRM is included from the start. If you use another one, tell us which: connecting it is not offered yet, and you stay on the included CRM meanwhile." ES: "Hay un CRM incluido desde el principio. Si usas otro, dinos cuál: conectarlo todavía no se ofrece y mientras tanto sigues con el CRM incluido." |
| WCR-148 | step Readiness "A clear readiness check before you go live. A step waiting on a provider is never shown as done." | correct design; LAUNCH_CONDITIONAL; note E-GATE | O-00d | None |

### 2.7 Signup, login, onboarding, callback

| ID | Claim | Register | Evidence | Correction |
|---|---|---|---|---|
| WCR-150 | signup lead "Fourteen days free to set your agency up and see it working. No payment method required." | LAUNCH_CONDITIONAL | E-TRIAL, E-GATE | None; "see it working" requires activation, see WCR-033 |
| WCR-151 | signup privacy line "Your details are used to create your agency account. Read the privacy notice." | correct, minimal | L-14 | None; the linked notice is a placeholder (§2.9) |
| WCR-152 | stub notices (signup, login, onboarding, packages) | correct and useful | mode.ts | None. These are the stub labels that **help** the user; keep |
| WCR-153 | onboarding lead "Every step below comes from the readiness contract. A field not returned is not shown. A gate not returned is not enforced." | internal language on a customer surface | n/a | Replace for customers. EN: "Each step shows its real status. Anything waiting on someone else says so." ES: "Cada paso muestra su estado real. Lo que depende de otra persona lo indica." Keep the contract sentence as a developer note only |
| WCR-154 | onboarding "Disabled features never block readiness" | correct per contract | readiness SQL | None |
| WCR-155 | onboarding branding constraints "PNG, JPEG, WebP or GIF. Up to 5 MB." | correct | `ONB_BRANDING_ASSET_UPLOAD_v1.sql` | Extend per `PRODUCT_TEXTS_C2_v1.md` §3 |
| WCR-156 | inline "Native CRM" / "Your own website is a valid source" / "Available" | correct as labels of contracted fields | contract | None |
| WCR-157 | callback states success, pending, cancelled, error | correct but incomplete | CRM callback contracts | Replace with the full set in `PRODUCT_TEXTS_C2_v1.md` §2 |
| WCR-158 | login "Password reset is not available yet." | correct | no reset contract | None |

### 2.8 Contact and Q&A widget

| ID | Claim | Register | Evidence | Correction |
|---|---|---|---|---|
| WCR-160 | contact "Direct human reach, in English or in Spanish." | owner fact | owner | None |
| WCR-161 | contact demo "We show you Nuova running on a real enquiry, not a slide deck." | PROD_PARTIAL: a real enquiry can be shown on WhatsApp and Gmail in NuovaSolution's own environment | E-WA, E-GM | None |
| WCR-162 | WhatsApp CTA renders only when a number is configured | correct mechanism; **OWNER**: the only prod number (+34 628 370 476) is the product's central WhatsApp line under `META_CONFIGURATION_FREEZE` | dispatch rules | Owner decision D3 in §4: whether that number may be published as a sales line |
| WCR-163 | Q&A intro "Answered from what we can actually confirm." | STAGING_ONLY: the answer step is simulated; prod has nothing | E-QA | Correct while the widget shows "cannot confirm" in stub mode. **Before any staging or live answer path, the text must match `PRODUCT_TEXTS_C2_v1.md` §5** |
| WCR-164 | Q&A disclosure "Nothing you type here is stored with a client record." | **NOT_EVIDENCED and misleading**: questions and optional name, email, phone are stored in `web_qa_answers`, and a `handoff` state passes it to a colleague | E-QA contracts | Replace with the draft in `PRODUCT_TEXTS_C2_v1.md` §5 (counsel review) |
| WCR-165 | Q&A "Write on WhatsApp" CTA | as WCR-162 | | Render only with an owner approved number |

### 2.9 Legal routes (PLACEHOLDER banner present on all four)

| ID | Claim | Register | Evidence | Correction |
|---|---|---|---|---|
| WCR-170 | privacy "Service providers that process data on our behalf will be listed here after legal review." | honest placeholder | L-14 | Draft provider list prepared in `CONNECT_NOTICE_DRAFT_v1.md` §B for counsel |
| WCR-171 | privacy "Legal basis: Your consent when you contact us…" | **LEGAL** | counsel | Counsel item C-Q5 in `CONNECT_NOTICE_DRAFT_v1.md` |
| WCR-172 | privacy "This site uses cookieless page view analytics." | depends on the deployed build | Reviewer R2 readout pending | Reviewer to confirm against the deployed bundle |
| WCR-173 | terms "The trial" paragraph with the extension | **LEGAL + NOT deliverable** | T-03 | Goes with §4 D1 |
| WCR-174 | data deletion "We confirm receipt by email and tell you what was deleted and when." | PROD_PARTIAL: a person receives the email; **deletion in prod is not certified** and "tell you what was deleted" promises a capability not proven | E-DSAR | EN: "We confirm receipt by email. A person handles the request and tells you the outcome, including anything we have to keep and why." ES: "Confirmamos la recepción por email. Una persona gestiona la solicitud y te comunica el resultado, incluido lo que tengamos que conservar y por qué." |
| WCR-175 | legal notice "Activity" | correct | P-02 | None |

---

## 3. The dispatch's "proven today" list, tested

`governance/dispatch_2026-09-21/PROMPT_11_WEBSITE_COPY.md` states: *Nachgewiesen real heute:
E-Mail- und WhatsApp-Textdialog mit Antwort, Lead-Erfassung/Scoring, native CRM + Sheets,
Hot-Lead-Alarm, Besichtigungsanfrage → Aufgabe.* The owner's corrected instruction of the same day
requires each claim to carry its own evidence. Result:

| Dispatch claim | Verdict | Why |
|---|---|---|
| WhatsApp text dialog with reply | **Supported** | E-WA, LV, accepted end to end |
| Email text dialog with reply | **Supported for transport only** | E-GM LV, but the Audit marks the data effect OPEN (F1 to F8) and `GMAIL_REGRESSION_PASS` has not been issued |
| Lead capture and scoring | **Supported** | E-GM LV leads row with score; F1 counter caveat |
| Native CRM + Sheets | **Not supported as worded** | Prod has lead tables and one internal NuovaSolution sheet (RO); no catalogue, no `contacts`, no CRM screen, no per agency Sheets |
| Hot lead alert | **Not supported** | No prod alert delivery on record; run 36718 was hot and sent none; target hard coded |
| Viewing request → task | **Supported for task creation** | E-WA LV; the agent side is not proven |

The dispatch also lists as *not live*: media analysis in prod, property matching to customers,
voice in prod, social posting, billing, customer self onboarding, 3D. **All seven confirmed.**

---

## 4. Decisions prepared for the owner

Each has a recommendation. None re-asks a decision already taken.

**D1. The public trial extension ("up to 21 days", honest video and written review, +7 once).**
The copy was supplied by the owner (`WEBSITE_REBUILD_STATUS.md` §2). Against it:
`CLAIMS_MATRIX.md` T-03 is LEGAL (L-13, incentivised review) and forbids every public wording;
and the mechanism as written requires a **video**, for which no upload or storage pipeline exists
(export v2 MF-01, T-03c), so a trial agency could not actually earn the extension.
*Recommendation:* publish "Try free for 14 days. No payment method required." now. Keep the
extension in the product and in this register as PLANNED. Publish it once (a) counsel clears L-13
or the owner records a risk acceptance, and (b) the video pipeline exists or the owner drops the
video requirement. No reduction of the product; only the public promise waits until it can be
kept. *Alternative:* keep the owner copy and record an explicit owner risk acceptance for L-13;
the video requirement must still be dropped or built first, because an unfulfillable condition in
a published offer is a truth problem independent of the legal one.

**D2. Naming HubSpot, Pipedrive, Zoho and Salesforce as text.** `CLAIMS_MATRIX.md` F-07 (decision
D). The site already names them, with the correct "not offered yet" status.
*Recommendation:* approve naming as plain text with the WCR-077 wording; logos stay excluded.

**D3. A public WhatsApp contact number.** The only prod number is the product's central line
under the Meta configuration freeze. *Recommendation:* do not publish it as a sales line until
the owner decides who answers sales messages on it and in which languages; until then the contact
page's existing "will appear here" text stays.

---

## 5. Stale sources this register supersedes

| Source | Stale statement | Now |
|---|---|---|
| `lib/content/capabilities.ts` header | "Statuses are the owner's canonical audit of 2026-09-08" | Corrections in §2 apply; the file header should cite this register and `2026-09-21_SYNC_1215Z` |
| `WEBSITE_REBUILD_STATUS.md` §2a | live claims for hot lead alerts, native CRM plus Sheets, property matching "unchanged, not reopened" | Reopened by the owner's instruction of 2026-09-21 and corrected here |
| `CLAIMS_MATRIX.md` D-10 | hot lead alerting BLOCKED | Still correct; the website contradicts it. The website changes, not the matrix |
| `CLAIMS_MATRIX.md`, `PRODUCT_TRUTH.md` headers | last reconciled 2026-08-31 | Superseded for status by this register; see the supersession notes added to both |
| `IMPLEMENTATION_STATUS.md` §1 | "Pages rebuilt: None", "Application code changed: None" | False since `8e782f9`; corrected by the supersession note |

---

## 6. Handover

| To | What | Closing signal |
|---|---|---|
| **Website Implementer** | Apply §2 corrections in `capabilities.ts`, `statuses.ts`, `dictionaries/{en,es}.ts`, `legal.ts`. Text only; no status is upgraded anywhere. Render LAUNCH_CONDITIONAL copy only behind the signup release gate. V-01 film script stops before matching (WCR-017) | `WEBSITE_CLAIM_CORRECTIONS_APPLIED` with commit SHA |
| **Website Reviewer** | Verify each WCR row against the built pages in both locales; confirm WCR-172 against the deployed bundle | `WEBSITE_CLAIM_REGISTER_REVIEWED = PASS/FAIL` in `REVIEW_2026-09-21.md` |
| **Owner** | D1, D2, D3 in §4 | one line each |
| **Audit** | §3 correction of the dispatch's proven list | acknowledgement |

Re-run this register when any of these land: `GMAIL_REGRESSION_PASS`, a prod hot lead alert
delivery, `MEDIA_CUTOVER_READY`, owner decision M1 on property display, a prod agent claiming a
task, `WEBSITE_QA_E2E_STAGING_PROVEN`, counsel clearing `ai_disclosure`.
