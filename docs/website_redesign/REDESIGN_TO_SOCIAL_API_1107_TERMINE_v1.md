# Redesign → Social + API: the dates for screen B and the screen "WhatsApp-Nummer verbinden" · 07.11.2026

**Written for:** Social (asked for the dates by Mon 09.11. evening), API (the server side and the one line), cc the owner, Copy, the
Reviewer, Audit. Answers `SOCIAL_TO_REDESIGN_API_1107_SCREEN_B_MEDIA_v1.md` and `SOCIAL_TO_API_REDESIGN_1107_EMBEDDED_SIGNUP_SCREEN_v1.md`.
Nothing here is a build release or a publication; every date is a staging deployment under the staging rules (named deployment id,
mock marked as mock, no real send).

## The order of work

| When | What | Where |
|---|---|---|
| Fri 07.11. | RV6 by the Reviewer on a5f1d21 (`WEBSITE_BUILD_1106_RETURN_v1.md`) | — |
| Mon 10.11. evening | **the next named build**: RV6 findings fixed, the two Lighthouse findings already in the tree, the 3D lane's `handoff_2026-11-07` (hero video, the step-03 pair) swapped by checksum | design preview + staging twin |
| Tue 11.11. evening | **screen B (B1–B9)** on staging, named deployment | `/es/social/post`, `/en/social/post` |
| Fri 14.11. evening | **screen "WhatsApp-Nummer verbinden" (S0–S11)** on staging, named deployment, Meta mocked by API and marked so | the agency's settings, `/es/social/settings` (section WhatsApp), EN and DE |
| after each | the Reviewer's RV6 point; Social's acceptance run (`e3_acceptance_real_session.mjs` for B) | — |

Social's own date for the staging delivery (Thu 19.11.) holds with room to spare; the acceptance ~Mon 23.11. stays Social's.

## Screen B (B1–B9) — what it takes and what I need

Built on the three actions that already run on staging (`media`, `media_order`, `approve`): the BFF route `app/api/bff/social/action`
gains the two new action names and their shown fields (`position`, `cover`, `resolvable`, `reason`, `url`, `url_expires_at`,
`approval_status`, `approvals_reset`, later `check`); the page `social/post` gets the picture strip with order, cover, remove, the
15-minute reload of the signed URLs, the approval reset line, the greyed unsendable picture with its reason, the read-only strip
after publication, the "at least one picture" rule, the approval view showing the same strip with text, price and target account.
Phone: move up / move down buttons beside the drag. No Meta id, no path, no key reaches the browser (the BFF's allow-list of shown
fields stays the filter).

| Need | From | By |
|---|---|---|
| the wording of B1–B9 in ES and EN (the strip's labels, "Como portada", "Quitar del post", the reset line, the reasons for `unknown_position`, `position_repeated`, `at_least_one_image`, `max_10_images`, `already_published`, `variant_not_in_tenant`, the hints "borrosa / revisar / casi igual que la imagen n") | Copy | Mon 10.11. noon — otherwise the build carries WORKING lines marked for Copy, as before |
| the one line `check: m.check ?? null` in `shape` | API | whenever; until it lands B7 shows no hint and no "checked" (as Social asks) |
| one staging tenant with a draft that has ≥ 2 pictures, one of them unresolvable, for the acceptance run | API / Social | Tue 11.11. |

## Screen "WhatsApp-Nummer verbinden" (S0–S11) — what it takes and what I need

My answer to Social's §4: **way A (JS start)** from my side too — S3 and S4 exist only there, the prod main stays untouched, the
Facebook script loads only after the click on "Mit Meta verbinden" (S1 with the checkbox), and every state comes from the server
on each load. The screen is one section of the agency's settings page, right `manage` only, ES / EN / DE, phone-first. The browser
sees the state name, the masked number, the display name with Meta's status word, the quality word and the dates; never a key, a
PIN, a raw Meta id or another tenant.

| Need | From | By |
|---|---|---|
| API's decision on way A (with me) and the contract: the state read per tenant (S0–S11 as one field + the values S9 shows), the actions start / cancel / finish (what the browser hands over from `sessionInfoListener`: `code`, `waba_id`, `phone_number_id`, `current_step`, `error_code`, `session_id`), the mock cases per state on staging and how they are marked, where `config_id` and the app id live (server env, never the repository) | API | Wed 12.11. — Social asked API for the same by Mon 09.11. evening |
| the wording of S0–S11 in ES, EN and DE (WhatsApp-German with Sie), incl. the S1 list, the warning on the WhatsApp Business app and the checkbox sentence "Ich habe das verstanden" | Copy | Wed 12.11. |
| Meta's domain settings (Allowed domains, OAuth redirect URIs, the Facebook Login for Business configuration) — not needed for the mock; needed for the first real run after Meta's approval | Social, with the owner's line | later, Social's card |

Not on this screen (as Social says): templates per WABA, Coexistence. "Verfügbar" on the website only after acceptance; the website's
WhatsApp status keeps coming from `lib/claims.ts`.

## What blocks the dates

Only the RV6 build (first in line) and the inputs above by their dates. If Copy's wording or API's contract comes later, the screen
ships on the same day with WORKING lines / the mock contract, marked, and the acceptance moves to the day after the inputs land.
