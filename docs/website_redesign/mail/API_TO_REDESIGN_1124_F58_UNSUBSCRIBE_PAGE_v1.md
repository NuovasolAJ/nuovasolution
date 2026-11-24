# API → Redesign (cc Copy, Audit): the unsubscribe page `/baja` (F58) · 24.11.2026

**Why:** Audit's F58 asks that opening the unsubscribe link no longer unsubscribes, because link scanners in mail programs open every link. The page asks first, and one button confirms.

**Why it must be a website page:** Supabase serves every edge-function body as `text/plain` with `Content-Security-Policy: default-src 'none'; sandbox`.
- A page there shows HTML source in the browser.
- A form button there cannot work.

**Done on staging (API, 24.11., proof 10/10):** edge `email-unsubscribe` v10.
- The mail link still points at the edge.
- A GET now only answers **303** to the website:
  `https://nuovasolution.com/baja?t=<token>`
  It writes nothing, so links in mails already sent land on the page too.

## What the page does

**Route:** `/baja?t=<token>`.
- Locale: as the site does it; Spanish by default, because the token carries no language.
- No login, `noindex`, no third-party scripts (the token is in the URL).

**On load, peek:**
```
POST https://<supabase>/functions/v1/email-unsubscribe
Content-Type: application/json
{"t": "<token from the URL>", "action": "peek"}
```
CORS is open for `https://nuovasolution.com`, `https://www.nuovasolution.com` and `http://localhost:3931`.

| Reply | Show (Copy, COPY_TO_API_1113 §U) |
|---|---|
| 200 `{"state":"ask","agency_name":…,"privacy_email":…}` | U-t, U-1h, U-1t, **one** button U-1b |
| 200 `{"state":"already",…}` | U-3 |
| 400 `{"state":"invalid"}`, or no `t` | U-4 |
| network error / 5xx | U-5 |

**On the button, confirm:** the same call with `"action": "confirm"`.

| Reply | Show |
|---|---|
| 200 `{"state":"done",…}` | U-2h, U-2t, U-2r, U-2e (`{{agency_privacy_email}}` = `privacy_email`; leave U-2e out if it is null) |
| 200 `{"state":"already",…}` | U-3 |
| 400 `{"state":"invalid"}` | U-4 |
| 503 `{"state":"error"}` / network error | U-5 |

**Rules:**
- Only the button unsubscribes. Never call `confirm` on load, on hover or in a prefetch.
- `{{agency_name}}` comes from the reply. If it is null, use the U-4 / U-5 wording, which has no agency.
- The replies never contain the contact's address. The page must not show or log the token.
- Tú form as Copy wrote it. Copy has the usted variant if an agency's mails use usted.
- U-2r stays: after the opt-out, the reply to a new enquiry still goes out (staging proof V6). Only follow-ups, proposals and marketing stop.

## Ask
- **Please give a date** for the page on a staging build.
- Then API runs the full path once: a sink mail, the link from it, the page, the button, the ledger row.
- F19 goes to prod only after that, with its owner line, and P-2 after the lawyer.
