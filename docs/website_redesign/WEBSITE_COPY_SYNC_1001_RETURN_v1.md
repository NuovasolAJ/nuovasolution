# WEBSITE COPY — return, round 2026-10-01

**State:** `2026-10-01` · **Lane:** Website Copy / Product Truth
**Branch:** `website_enterprise_redesign` · **Written:** 2026-10-01
**Base:** my `e5437df` (D-45…D-53, KB v1.2, legal v3); delivered build `3d662e1`.
**Checked:** `3d662e1` on the design preview, `/en`, `/es`, `/en/faq`, `/es/faq`, `/en/platform/crm`, read
as text in reading order; onboarding read from the dictionaries, because `/onboarding` answers 307 to a
login and is not rendered on a public preview.
**Status:** author's record. Not independently reviewed, not legally reviewed.

---

## 1. Signals

```
COPY_DELTAS_1001 = DELIVERED  docs/website_redesign/COPY_DELTAS_1001.md  on commit 3d662e1
                   34 deltas, D-54…D-87, EN+ES, each with key, before, after and evidence
  §1 onboarding: four state words, the CRM's three states, what each setting really does, why we ask
  §2 website: clip v2 subtitles reviewed, AI label shortened, example reference, shorter headlines,
     final CRM wording, phone checked and left where it is
CLIP_V2_SUBTITLES = APPROVED AS DELIVERED (Daily's five lines; no re-cut requested)
```

`COPY_DELTAS_1001` is written against `3d662e1`. When the implementer ships them, the commit of
`WEBSITE_ROUND_1001` is the one I check next, and that check is cheap because the extraction is scripted.

## 2. The four things worth reading

**One state vocabulary instead of five.** The onboarding said "Done", "Needs you", "Connected", "Still
needed", "Optional", and a person could not tell whether "Done" meant *I typed it* or *we checked it*.
There are now four words, each answering a different question: **Saved** (you entered it and it is
stored), **Connected** (a link to another service works), **Checked** (we read it back and it satisfies
going live), **Required** (still needed). "Waiting on {provider}" survives as the one honest fifth state,
because it names who is being waited on.

**"Te toca a ti" is gone.** It was the only line in the product that addressed the reader as if the
software were keeping score, and in Spanish it reads like a reproach. "Necesario" states the same fact
without the finger.

**Two promises removed from the CRM step.** "Coming soon" / "Próximamente" is the promise catalogue the
register forbids, and "Te avisaremos cuando se pueda conectar" is a contact promise nobody is on the hook
for. They are the same class of defect as the Q&A fallback removed yesterday, and they sat in the
onboarding where a paying agency reads them. The three states are now interest, selection, connection,
and nothing implies a fourth.

**Each setting now says whether it does anything.** `PRODUCT_TRUTH_TABLE` v1.1 §G splits the onboarding in
two: branding, language, the disclosure and the tenant row steer production; calendar, opening hours,
social and the Q&A settings are stored and steer nothing. The worst case was the opening hours help:
"Appointments are only offered inside these hours. With no hours set, nothing is booked." Nothing is
booked at all, because no calendar is connected anywhere in production. The new line says the hours are
stored, that a text enquiry is answered whenever it arrives, and that the hours will steer the phone
assistant when it exists. The same treatment for the calendar, the voice step, the plan, and for the
address, the website and the legal links, which until now asked for data without saying what it is for.

## 3. Two judgement calls

**I did not ask Daily to re-cut the clip.** The five subtitles are burned into the video. They are
Daily's own, written from their truth sheet, they carry before → action → result, and cue five already
reads "sale de la lista", which is the alignment the order asked for. I approved them as delivered and
rewrote the site texts around the clip instead. A re-cut for wording taste would cost a recording run and
buy nothing.

**The natural reference is delivered but conditional.** `REF-DEMO-204` is burned into the clip v2 picture
("Visita: Laura Serrano · REF-DEMO-204") and also renders on three site surfaces. Changing only the site
would put two different references on one screen, next to each other. So D-80 names **EST-204** as the
reference and binds it to Daily's next recording: until that lands, both keep `REF-DEMO-204`. Daily is
asked for EST-204 in the next run.

## 4. A gap in my own check, found by the implementer

My rendered check 2 on 2026-09-30 read `/en`, `/es`, `/en/platform` and `/en/trial`. It did not read the
product sub-pages or the onboarding strings. The CRM page and the onboarding CRM choice still said "with
its qualification" and "qualification and priority" at that point, which is exactly the claim this lane
had removed everywhere else the day before. The implementer found it in a close-up check and set an
interim wording from my own formula, flagged for me; §2.5 of the deltas turns it into the final wording.

For my own checks from now on: the route list is the pages a visitor lands on **plus** every product
sub-page **plus** the onboarding and auth strings in the dictionaries, since those routes sit behind a
login and never appear in a public render.

## 5. Not done, and why

The reviewer order that reached this chat first is not mine to execute. Its second task checks the
product promises against `PRODUCT_TRUTH_TABLE_v1.1`, and those promises are the texts this lane wrote. A
lane that accepts its own claims produces nothing anyone can rely on, which is the reason the two lanes
are separate. `WEBSITE_TECH_ACCEPTED` is the reviewer's signal and is not set here.

## 6. Hard blockers

| # | Item | Who | Blocks |
|---|---|---|---|
| 1 | `WEBQA_KB_ROW = faq-kb-v1.2` | Hosting with API | the question box going back on. It is off today, which is the right mitigation |
| 2 | A recording whose cards read **EST-204** | Daily | D-80; until then the site keeps `REF-DEMO-204` so text and picture agree |
| 3 | O-6 legal form, NIF, address | Owner | all four legal pages, and the Meta chain behind them |
| 4 | O-8 retention per class, on the template that exists | Owner, then counsel | the retention section |
| 5 | O-7 prices and the billing period | Owner, then API | every amount; the catalogue reports `awaiting_pricing_authority` |
| 6 | CQ-2, CQ-13, CQ-16, CQ-20, CQ-21 | counsel | the pilot's e-mail channel, the deletion deadlines, the question box, the privacy page |
| 7 | Whether a priority value exists in production | Lead | the claims removed on 2026-09-29 stay removed |

## 7. What I did not touch

No application code, no design change, no new document series: one new file (`COPY_DELTAS_1001.md`) and
this return. No already delivered text is handed over again without a change. The previews were read over
HTTPS with GET only; nothing was submitted to any form or to the staging Q&A endpoint.
