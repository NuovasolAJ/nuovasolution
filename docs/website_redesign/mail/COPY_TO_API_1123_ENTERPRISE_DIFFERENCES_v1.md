# Copy → API (cc Redesign, Audit): two or three provable Enterprise differences · 23.11.2026, answer by 12:00

**Order:** the owner, 23.11.:
> "Bis 12:00 mit API: 2–3 belegbare Enterprise-Unterschiede (heute hat Enterprise im Register nur instagram als eigene Zeile, das hängt an Meta)."

**Status:** an editorial and technical check, not a legal approval and not a Meta approval.

**The problem:**
- In the register's plan rows (`lib/claims.ts` `planRows`), Enterprise has exactly one row of its own: `instagram`. That row depends on Meta (topic 25, an Audit risk for 04.12.).
- Without a second, provable difference, the Enterprise card says "Todo lo de Growth, y además:" and then nothing that holds on 04.12.

**Copy's proposal:**
- Take the differences from what the plan row in the catalogue already separates. That is data, and limits can be read back.
- Hold back what depends on Meta or on a build.
- **API decides which are provable.** Copy only writes the wording.

## 1. Candidates (source: `lib/content/plans.ts` `catalogPlans`, staging `billing_plan` v1 "sellable"; plan code `scale` = Enterprise)

| # | Difference | Catalogue: Essential / Growth / top plan | ES (card line) | EN (card line) | What proves it (API) | Class (owner 20.11.) |
|---|---|---|---|---|---|---|
| X-1 | Several offices in one account | offices 1 / 1 / 5 | Varias oficinas en una sola cuenta. | Several offices in one account. | (a) the limit in the plan row, read back; (b) **is an office a function** (enquiries and tasks per office, the report per office) or only a counter? If only a counter, the line says too much, and Copy writes "Hasta {n} oficinas." | Copy cannot classify this. API: proven / proof missing / build needed |
| X-2 | No monthly cap on enquiries | leads_month 750 / 3000 / none | Sin límite de consultas al mes. | No monthly limit on enquiries. | the plan row (null = no cap) and PLAN_LIMITS_ENFORCE_v1, which never caps the top plan. API O-7, 20.11.: the counting and the rule exist; the Main part is Lead's and is not built | proof missing: is it only the enforcement for the lower plans that is open? |
| X-3 | A larger team | seats 3 / 8 / 50 | Para equipos grandes: hasta {n} personas. | For large teams: up to {n} people. | the plan row; **depends on `teamRoles`** (no invitation with roles in production, API 20.11. 12:11Z) | build needed (`teamRoles`) |
| X-4 | Social media (`instagram`) | plan rows: Enterprise only | Clientes nuevos desde tus redes sociales. | New clients from your social media. | Meta (topic 25) | external release (Meta) |
| X-5 | The phone assistant | plan rows: Growth and up; catalogue `channel.voice` and voice minutes 0 / 0 / 1000: top plan only | Atiende el teléfono por ti. | Answers the phone for you. | **first resolve the conflict:** Growth or Enterprise? | build or proof (topic of the phone assistant) |
| X-6 | A structured property feed | `feed.structured`: top plan only | Tu inventario, conectado por feed. | Your listings, connected by feed. | is it a customer function or an internal one? | API |
| X-7 | More CRM connections | crm_connections 1 / 3 / 10 | — | — | depends on the external CRMs (topic 35, an Audit risk) | build needed |

**Copy's recommendation, if API confirms:** **X-1 and X-2**, plus X-4 once Meta clears it.
- X-1 and X-2 do not hang on Meta or on an external CRM.
- They are what an agency with several offices actually decides on: offices and volume.
- They fit the audience "Para varias oficinas".

**If only X-2 holds:** the card gets X-2 and X-4, and X-4 becomes an Audit launch point. Without X-4, Enterprise stands with one difference. The owner then decides whether that is enough.

## 2. What Copy needs back (one line per candidate)

**For each X-n:**
- the class: proven / proof missing / build or external release needed;
- the owner of the next step;
- the earliest reliable date;
- for X-1: is an office a function or a counter.

**For X-3:** the number `{n}`, from the plan row, never typed by hand.

**Not asked here** (already with API from `11cf7a2` §3):
- E-4 (phone assistant: Growth or Enterprise), which is the same as X-5;
- E-5 (`followup` in Essential?);
- E-6 (the form targets and who receives a request).

Redesign takes API's answer into the cards without asking back. Copy changes no wording for that: the lines in §1 are final for whichever candidates hold.
