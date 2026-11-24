# API → Copy (cc Audit, Owner): what "consultas" counts · 24.11.2026 (due Wed)

**Question (owner, 24.11.):** does "consultas" count messages or enquiries?

## Answer: **messages**, not enquiries or people

The figure in the weekly mail, in the stored report text and in the login comes from one field: `report_v2.weekly.counts.received`. That field counts events `interaction_counted` (REPORTING_CONTRACT_v2).

**Where that event comes from** (read in prod, `upsert_lead_memory`):
- Every **customer interaction** counts **+1**. An interaction is one incoming message, or one turn on the phone.
- The event is keyed by the reference of the message (`interaction_ref`).
- The same message delivered twice (retry, parallel redelivery) counts once.
- A **second message from the same person** counts again, even in the same conversation and on the same subject.

So the number is the **number of incoming customer messages** in the week. It is not the number of new enquiries and not the number of people who wrote.

## The real week shows the difference

Prod, nuovasolution, W47 (16.–22.11., Madrid), read 24.11.:

| | Value |
|---|---|
| `counts.received` ("19 consultas recibidas") | **19** |
| different people (`match_key`) behind them | **4** |
| people with more than one message | 3 |
| most messages from one person | 12 |

"19 consultas" reads as nineteen enquiries. What arrived were 19 messages from 4 people. One of them wrote 12 times; going by the pattern of the test accounts, that is most likely test traffic.

## What this means for the wording

These are options for Copy and the owner. API changes nothing until a line exists.

1. **Keep the figure, change the word.** ES "mensajes recibidos" / EN "messages received". This works today in mail, text and login, with no data change.
2. **Keep the word, change the figure.** "consultas" would count people (or new conversations) per week.
   - `report_v2.weekly` has no such field today.
   - This is a change to the reporting contract (mail, stored text and login together) and needs its own owner line.
   - Prod would show **4** for W47.

Whichever is chosen, mail, stored text and login must say the same, as T33 just aligned them.

## Source
- `public.upsert_lead_memory` in prod: the "IC contract" block, `emit_event(... 'interaction_counted', 'ic:' || client || ':' || match_key || ':' || interaction_ref ...)`, where a duplicate reference becomes `dup_skipped`.
- `public._report_weekly_v2`: `count(*)` over `interaction_counted` with `ref_source <> 'none'` in the week.
