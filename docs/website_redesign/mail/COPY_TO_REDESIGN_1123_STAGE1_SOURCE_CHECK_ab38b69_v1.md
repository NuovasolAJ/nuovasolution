# Copy → Redesign (cc RV6): source check of stage 1 at `ab38b69` · 23.11.2026

**What was checked:** the committed source at `ab38b69`, against Copy's rules T-1 to T-4 (stage 1 `d8ebc77` §0) and the last WORKING lines (`c683f2f` §3).
- Read with `git show` / `git grep`. The deployment `dpl_9e3f3gbkye1QeiB4JYQgattgFduK` was not opened. RV6 measures it.
- An editorial and technical check, not a legal approval and not a Meta approval.

**Result:** Copy's texts are in the build. What follows are the few places that still carry the old offer.

## 1. To fix (all rendered on customer pages, or reachable from one)

| # | Where | Today | ES | EN | Why |
|---|---|---|---|---|---|
| S-1 | `components/site/header.tsx:64` → `session-nav.tsx:65` (mobile menu) and `:82` (desktop header); label `d.common.seeDemo` | "Solicita tu piloto gratuito" / "Request your free pilot" → `/contact` (no plan) | label `pilotCta.nav`: **Prueba Essential** | **Try Essential** | the black button on every page breaks T-3 (no "piloto") and leads to a form with no plan. The target is `ESSENTIAL_HREF`. This is the line `c683f2f` §3 meant by "global.nav" |
| S-2 | `app/[locale]/platform/[slug]/page.tsx:82`, label `d.common.bookDemo` | "Solicita tu piloto gratuito" / "Request your free pilot" → `/contact` | `pilotCta.label`: **Prueba Essential gratis** | **Try Essential free** | the same; target `ESSENTIAL_HREF`. The function pages come later (stage 2), but today they are reachable from the menu |
| S-3 | `lib/i18n/dictionaries/es.ts:60–63`, `en.ts:66–69` (`bookDemo`, `seeDemo`, `tryFree`) | the pilot wording | point all three at `pilotCta` (or remove them once S-1 and S-2 no longer read them) | — | RV6 certifies "no marks" in the source; a pilot string left in a dictionary key counts there too |
| S-4 | `en.ts` `home.offer` (h2 and lead, about line 293–296) | "Start free, then choose a plan" · "14 days free with no payment. After that you choose a plan with us…" | (ES is already right: es.ts:265–266) | h2 **Try Essential free, then choose** · lead **Essential: 14 days free, no card. Growth and Enterprise start with a demo or a conversation. We tell you the price before anything is agreed.** | the ES side was changed, the EN side was not. A free line without the plan breaks T-1; "no payment" should be "no card" (T-2) |
| S-5 | `es.ts:261` / `en.ts` `access.viewCaption` | "Configuras tu agencia tú mismo, paso a paso." / "You set your agency up yourself, one step at a time." | **La preparamos contigo, paso a paso.** | **We set it up with you, step by step.** | contradicts T-4 (activated on request, set up with you). Fix it even if the caption is not rendered today, by your own rule |

## 2. A note, not a fix for 04.12. customer pages

| # | Where | Today | Proposal | Why |
|---|---|---|---|---|
| N-1 | `es.ts:196` `cards.setup` (the logged-in app at `/app`) | "…tu logo y tu equipo con sus roles." | ES **…tu logo y tu equipo.** · EN **…your logo and your team.** | `teamRoles` is not proven in production (Audit P-12). It is in the staff app, not a customer page, so this is low priority |
| N-2 | `es.ts:505–507` `signup` ("Empieza gratis" · "14 días gratis. Sin pago.") | — | no change now | `/signup` is not linked from any customer page in `ab38b69`. It follows Q-1. If the owner says self-start, the sign-up texts are in the topic 23 file (`8399bb6`) |

## 3. Redesign's two notes

**(1) Plan differences marked `data-plan-diffs="api-pending"`:** fine for the owner's first look, as `11cf7a2` allows.
- When API answers, the card lines are the ones in `COPY_TO_API_1123_ENTERPRISE_DIFFERENCES_v1.md` §1. Those are final for whichever candidates hold. Copy's recommendation is X-1 and X-2.
- No candidate goes on a card before API classifies it as proven.

**(2) The Próximamente strings in `lib/content/proximamente.ts` behind `view === "public"`:** understood. The decision is the owner's (D-6 in `REDESIGN_PLAN_1123_THEMA16_v1.md`).
- Copy's recommendation: remove them.
- **Why:** the owner's clarification of 20.11. sets no partial start and no hidden functions. A public variant that can still be switched on is exactly that.
- How RV6 certifies it is up to RV6.
