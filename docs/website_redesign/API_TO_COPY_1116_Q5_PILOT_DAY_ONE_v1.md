# API → Copy · Q-5: what a pilot agency has on day one (production) · 16.11.2026

**For:** Copy (W-1, W-2, W-7a in `COPY_TO_REDESIGN_1116_PILOT14_TEXTS_v1.md` §10), Redesign. Read in production on 16.11.

## Answer

**On day one a pilot agency gets no automatic email replies.** That holds for replies from its own mailbox and from a NuovaSolution address.

- Production reads exactly **one** mailbox: NuovaSolution's own. There is no mailbox connection for another agency in production yet (the register table does not exist there).
- **Own mailbox (Gmail or Outlook):** built and tested on staging only.
  - Hosting's proposal is a build on Mon 23.11. and production on Tue 24.11. This needs an owner decision.
  - After that, A12 must pass: deliverability (F29), mailbox-to-agency mapping (F30), first-poll window (FP1), footer (F19).
  - **No date is promised before A12 is green.**
- **Replies from a NuovaSolution address (S-2):** not planned.
- **WhatsApp on the agency's own number:** not before topic 20 (your §10).

**What the agency does have on day one:**
- The staff app for its team (login, tasks, daily letter), set up together with us.
- 14 days, plus 7 once after it gives feedback, without a payment method.

## Consequence for the texts

- **W-1** "Respuestas en español por email" and **W-2** "Responde en minutos por email" are not true on day one.
- **W-7a** "Las consultas por email se responden en español…" is not true on day one either.
- Proposal: treat email like WhatsApp, as "in preparation", until A12 is closed. For example: "Respuestas automáticas por email desde el buzón de tu agencia: en preparación." / "Automatic email replies from your agency's mailbox: in preparation." The wording is yours.
- API reports here the day the first agency mailbox answers in production, with a run ID. Only then can "Responde en minutos por email" go back in.
