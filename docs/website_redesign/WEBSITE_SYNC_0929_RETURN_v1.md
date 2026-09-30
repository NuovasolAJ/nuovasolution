# WEBSITE SYNC 0929 — implementer return v1

**State:** `2026-09-29_CONVERGENCE_R2` · **Lane:** Website Implementer · **Written:** 2026-09-30
**Branch:** `website_enterprise_redesign`, pushed to origin, no force push · **Code:** `3c38f8d`
**Status wording:** implemented and awaiting independent technical and final audit. Nothing here is a design
acceptance; `WEBSITE_OWNER_ACCEPTANCE` is the owner's signal.

The two aliases follow every push of the branch. A later commit that changes only documentation or scripts (this
return is one) rebuilds them with the same application code; the deployments named below stay reachable under
their own addresses and are the ones every result in this return was measured on.

Deploy found before work (as ordered): design and staging aliases both served `d475dec`
(`dpl_7Vmqsr6CUhTyhkDrNW2fzgU3YzoH` on the design project, created 2026-09-28 22:21 CEST).

## 0. Signals

```
WEBSITE_ROUND_0929              = 3c38f8d
   design   https://nuovasolution-design-preview-git-we-eeb43f-nuovasolajs-projects.vercel.app    dpl_4QmDk3Um96212WUwk6PpyFjZKXtT  (…-fpfvnf19p-…, stub, noindex)
   staging  https://nuovasolution-staging-preview-git-w-44e113-nuovasolajs-projects.vercel.app   dpl_8xx9U1TuH6XaGT8EM9sEzb5etB41  (…-86i5nypc1-…, staging fflmmzapksycjfdcjdtd, noindex)
WEBSITE_VISUAL_DIRECTION_READY  = 3c38f8d  (direction built in 4686981; hero, the four-stage journey and pricing; desktop and phone; §2)
WEBSITE_SELF_CHECK              = 16 of 16 suites run on 3c38f8d; all green except two checks that depend on the staging assistant (§1, §5)   docs/website_redesign/evidence_2026-09-29/ · design_probe_2026-09-29/
WEBSITE_QA_WIRED                = e8b4e79  (server-side signed path, no contact fields; real answers on screen EN and ES on 2026-09-29;
                                           on 2026-09-30 the staging assistant answers every question with its "cannot answer" sentence → the site shows its own honest state; §5)
SOCIAL_UI                       = STAGING_USABLE  https://nuovasolution-staging-preview-git-w-44e113-nuovasolajs-projects.vercel.app/en/social  3ea6e2f  (read only; §6)
OWNER_RESUME_READY              = NOT_RAISED  (API's allow list is in place; the one missing input is a confirmed staging identity WITHOUT an agency; §7)
META_LEGAL_PUBLIC               = BLOCKED_INPUT  (LEGAL_PAGES_FINAL v2 still carries 24 marks; publication on the customer domain needs O-14; §8)
WEBSITE_LIVE_CLAIM_FIX          = READY_NOT_DEPLOYED  (unchanged: hotfix/old-site-copy-v2 82112df; needs the owner's JA, O-14; the redesign branch never goes to production)
DAILY_MEDIA_RECEIVED            = received → read → compared → integrated (clip, posters, task card, task action) → tested   (§4)
SOCIAL_SPEC_RECEIVED            = received → read → compared → integrated (four screens, read side) / not integrated (actions, by order) → tested   (§6)
LEGAL_INPUTS_RECEIVED           = received → read → compared → NOT integrated (24 open marks; legal routes of the previews stay labelled) → labelled state tested   (§8)
WEBSITE_OWNER_ACCEPTANCE        = (owner)
```

Commits of this round, oldest first: `4686981` visual direction, one journey, Daily clip, Essential trial, 44 copy
deltas · `e8b4e79` question box on the product assistant contract · `3ea6e2f` social screens · `0145edd` one primary
CTA label, reading order, grouped numbers · `4e2ceda` header at 1024 px, hidden link removed · `0e87d6a` clips part of
the deployment, clip failure state · `1d76d64` cancelled question, polling pace, sign-up focus · `3c38f8d` contact
promise never shown, scroll recorder.

## 1. Self check on `3c38f8d` — what ran, where, result

All scripts are in the repository and run with one command each. "Deployed" means the HTTPS alias above, logged out.

| # | Suite | Where | Result | Evidence |
|---|---|---|---|---|
| 1 | Route scan: every route EN/ES answers its own page, hidden slugs 404, noindex header + meta, robots, empty sitemap, 0 forbidden strings, poster and the four clips served as video | deployed design · deployed staging | 52/52 · 52/52 | `evidence_2026-09-29/deployed_design/route-scan.json`, `…/deployed_staging/route-scan.json` |
| 2 | Link and CTA matrix: every link of 34 pages (EN/ES) followed; internal targets 200 in the page's language, anchors exist, mail addresses clean, the demo calendar opens | deployed design · deployed staging | 946/946 · 946/946 | `…/deployed_design/LINK_CTA_MATRIX.md` (+ `.json`), same under `deployed_staging` |
| 3 | Page capture: 16 routes × EN/ES × 1440, 1024, 768, 390, 360 and 200 % zoom; one h1, no horizontal overflow, no clipped text, no broken image, page starts at the top | deployed design | 192/192 | `design_probe_2026-09-29/pages/` (192 pictures + `page-capture.json`) |
| 4 | Probe: menu and mobile sheet with the keyboard, Escape, focus return, Q&A window, 200 % zoom, reduced motion (nothing pinned, nothing animating, no video loaded), server HTML without JavaScript | local stub build | 102/102 | `design_probe_2026-09-29/probe/probe-results.json` (+ 140 pictures) |
| 5 | Product clip in the browser: nothing requested before play, muted, native controls, 21.3 s, caption follows the action, pause and resume, failure state | deployed design · deployed staging | 17/17 · 17/17 | `evidence_2026-09-29/clip_design/`, `…/clip_staging/` |
| 6 | Question box on staging, EN desktop and ES phone: visible outcome inside 60 s, no contact promise, one conversation, secret / tenant / assistant host in no response body, cookie flags, foreign origin 403, foreign tenant and wrong signature 401, design preview stays a labelled demo | deployed staging (+ design) | 12/14 | `…/qa_staging/qa-staging-results.json` — the two open checks are "the assistant answered from its knowledge base" (EN, ES), see §5 |
| 7 | Question box states against the local contract mock: waiting, "still working" after 10 s, the 60 s budget, handover, failed, contact promise, cancel with Escape, over-long, empty | local stub build | 11/11 | `…/qa_states/qa-states-results.json` |
| 8 | Social screens with the reviewer tenant's own login: four screens × EN/ES × 1440, 768, 390, 360; states; nothing enabled; no tenant id, credential or internal id in any response; keyboard; logout | deployed staging | 14/14 | `…/social_staging/social-results.json` (+ 40 pictures) |
| 9 | Social screens, every state once and the fresh workspace (synthetic fixtures) | local stub build | 14/14 | `…/social_stub/` (+ 80 pictures) |
| 10 | Form states: sign-up empty / wrong e-mail / short password / very long values / draft kept; login empty / forgot; on staging a login without an account (waiting state, sentence, nothing created) — EN/ES at 390 and 360 | deployed design · deployed staging | 16/16 · 18/18 | `…/form_states_design/`, `…/form_states_staging/` |
| 11 | Stub end to end (auth stub, onboarding, CRM, branding, Q&A contract) | local stub build | 58/58 | `…/stub/e2e-results.json` |
| 12 | Staging end to end (real login, tenant-api writes, branding upload, readiness, cross-tenant refusals) | local staging build against `fflmmzapksycjfdcjdtd` | 27/27 | `…/staging/staging-e2e-results.json` |
| 13 | Mode gate (live refused without release, sandbox pinned, secret key refused) | local | 11/11 | `…/mode-gate-results.json` |
| 14 | Performance before / after, identical conditions | two design deployments | measured, §1a | `…/performance/PERFORMANCE.md` (+ `.json`) |
| 15 | `tsc --noEmit`, `next build` stub and staging | local | clean | — |
| 16 | Navigation: new page at the top, back and forward, anchors below the fixed header, deep link with anchor, language switch keeps the anchor, no folded answers — desktop and phone | deployed design | 13/13 | `…/navigation/nav-results.json` |

Where the evidence is: every result file (`.json`, `.md`), the close-ups of the direction, the four scroll clips
and the pictures of the clip, question box and form suites are committed with this return. The three large
picture sets stay in the working copy at the paths above and are not committed (about 120 MB together):
`design_probe_2026-09-29/pages/` (192), `design_probe_2026-09-29/probe/` (140), `evidence_2026-09-29/social_*/` (120).
Each is rebuilt with the one command named in its script's header.

Defects this self check found in my own work of this round, all fixed before this return:

| Found by | Defect | Fix |
|---|---|---|
| media check | **the four clips were missing on both previews** from `4686981` to `4e2ceda`: `.vercelignore` excluded every `*.mp4`; posters were served, play requested a file that was not there | `0e87d6a`; the route scan now demands `video/mp4` for all four, and suite 5 plays them |
| scroll recorder | **the scroll recordings showed only their first frame** (clip rectangle in document coordinates). This also applies to the two GIFs delivered with the 0928 return; they are removed | `3c38f8d`; a recording with an empty frame now fails |
| page capture | Spanish primary label left the header by 16 px at 1024 px | `4e2ceda` |
| page capture | an invisible "Explore the platform" link after the closing section of the home page (a focus stop without a place) | `4e2ceda` |
| link matrix | primary CTA named "Start free" on eight pages and "Try Essential free" in the header | `0145edd`: one label everywhere |
| question box states | closing the window while a question waited left the box busy for good; with fast polling the site's own rate limit ended a slow answer at about 48 s | `1d76d64` |
| staging run 2026-09-30 | the assistant's sentence "A colleague will get back to you" was shown as an answer although nothing records a contact | `3c38f8d`, §5 |

## 1a. Performance before and after media and motion

Same browser, same machine, 5 runs per page and deployment, cold cache, the two deployments measured in turn; medians.
Before: `nuovasolution-design-preview-lbfoqes6v-nuovasolajs-projects.vercel.app` (`d475dec`). After: `nuovasolution-design-preview-fpfvnf19p-nuovasolajs-projects.vercel.app` (`3c38f8d`).
Desktop 1440 × 900 without throttling. Phone 390 × 844 with the processor slowed 4× and a slow 4G line (1.6 Mbit/s down, 750 kbit/s up, 150 ms).

| Page | Profile | | First paint ms | Largest paint ms (min–max) | Layout shift at load / after scrolling the whole page | Main thread blocked ms | kB at load / after scroll | Images kB | Video kB | Page height px |
|---|---|---|---|---|---|---|---|---|---|---|
| /en | desktop | before | 496 | 912 (760–968) | 0 / 0 | 0 | 412 / 543 | 232 | 0 | 10533 |
| /en | desktop | after | 400 | 860 (772–1088) | 0 / 0 | 0 | 419 / 565 | 247 | 0 | 9225 |
| /en | phone | before | 1016 | 3080 (2728–3220) | 0 / 0 | 351 | 512 / 514 | 204 | 0 | 14428 |
| /en | phone | after | 996 | 3084 (2720–3152) | 0 / 0 | 323 | 518 / 556 | 239 | 0 | 13004 |
| /es | desktop | before | 432 | 896 (784–1084) | 0 / 0 | 0 | 413 / 549 | 238 | 0 | 10622 |
| /es | desktop | after | 396 | 828 (796–860) | 0 / 0 | 0 | 419 / 559 | 242 | 0 | 9473 |
| /es | phone | before | 956 | 3076 (2596–3140) | 0 / 0 | 293 | 514 / 517 | 206 | 0 | 14777 |
| /es | phone | after | 1012 | 3076 (2624–3188) | 0 / 0 | 324 | 512 / 551 | 234 | 0 | 13370 |
| /en/packages | desktop | before | 400 | 876 (784–1020) | 0 / 0 | 0 | 406 / 408 | 103 | 0 | 4031 |
| /en/packages | desktop | after | 368 | 832 (816–1044) | 0 / 0 | 0 | 412 / 414 | 104 | 0 | 4288 |
| /en/packages | phone | before | 908 | 2548 (2524–2588) | 0 / 0 | 51 | 405 / 408 | 103 | 0 | 6596 |
| /en/packages | phone | after | 904 | 2596 (2560–2624) | 0 / 0 | 51 | 411 / 414 | 103 | 0 | 6854 |
| /es/packages | desktop | before | 372 | 840 (788–856) | 0 / 0 | 0 | 406 / 408 | 103 | 0 | 4188 |
| /es/packages | desktop | after | 344 | 824 (752–892) | 0 / 0 | 0 | 412 / 414 | 103 | 0 | 4361 |
| /es/packages | phone | before | 900 | 2584 (2564–2636) | 0 / 0 | 49 | 405 / 408 | 103 | 0 | 6679 |
| /es/packages | phone | after | 908 | 2588 (2552–2764) | 0 / 0 | 68 | 411 / 414 | 103 | 0 | 7019 |

Reading it:
- **Nothing of the film is loaded before play**: 0 kB of video on every page in every run. The poster and the real captures add 15 kB of pictures on the English home page on a desktop (4 kB Spanish), all below the first screen and lazy.
- **Layout shift is 0** at load and after the whole page was scrolled, before and after: every picture and the clip frame reserve their place.
- **The largest paint is the headline (desktop) or the lead paragraph (phone), before and after**; it moved by -52 ms (EN) and -68 ms (ES) on a desktop and by 4 ms (EN) and 0 ms (ES) on the throttled phone, inside the spread of the single runs. On that phone profile it stays at about 3.1 s; that is the font and script cost of the site as it was, not of this round.
- **The home page is shorter**: 10533 → 9225 px (EN, -12 %) and 10622 → 9473 px (ES) at 1440; 14428 → 13004 px on the phone.
- Main-thread blocking (long tasks beyond 50 ms, whole page scrolled): desktop home 0 → 0 ms (EN), 0 → 0 ms (ES); throttled phone 351 → 323 ms (EN), 293 → 324 ms (ES). Script size is nearly unchanged (147 → 152 kB).

Full table with requests, fonts, scripts and the single largest shifts: `evidence_2026-09-29/performance/PERFORMANCE.md`.


## 2. A — visual direction (hero, one complete journey, pricing)

Shown on the design alias, desktop and phone. Close-ups: `design_probe_2026-09-29/direction/` (48 pictures: EN/ES,
1440 and 390: hero, pains, the four stages, statement, setup, offer, plans opening, plan cards, payment).
Scroll clips of the whole home page: `design_probe_2026-09-29/scroll/scroll-{d1440,m390}-{en,es}-home.gif`.

The three layers, as built:

| Layer | What it is on the page | Where |
|---|---|---|
| 1 Ground | calm bands in sand, stone and sage with a fine paper grain; sections that belong together share one band; a band begins with rounded shoulders; the hero stands in front of one arch. No colour washes, no green veil, no screen-high white | `globals.css` `.band*`, `.hero-arch` |
| 2 Product | real Nuova surfaces on white stages: the conversation with the AI notice, a week of records with one record, the real task card, the real clip of the staff app, the readiness check, the plan cards | `hero-scene.tsx`, `flow-story.tsx`, `product-views.tsx`, `product-clip.tsx` |
| 3 Foreground | small overlapping details that mark what changed: "Recorded · Laura Serrano" over the hero, the task card over the conversation, the "Answered · 21:40" chip, the record laid over the list, the trial sticker on Essential, the step rail that follows the scroll. Motion is reveal only; with reduced motion everything is static | same files, `flow-rail.tsx` |

Layouts differ on purpose: reply beside its note · header row with the records and one record over their corner ·
task card across the full width · clip on top with its text below (on a phone the text comes first) · one
full-width statement · setup in a stone panel · offer card with sticker.

Roll-out to platform, product, trial, contact and the account pages waits for the owner's word on the direction,
as ordered. Those pages already carry this round's content changes and pass every check above.

Stage heights on a small phone (reviewer finding Z17, 390 × 640): 1224 / 1216 / 449 / 1074 px. Nothing is pinned
any more and nothing is cut off; three of the four stages are still longer than one screen because each holds its
text and a complete product surface. I did not shorten them by cutting the surfaces; this is for the reviewer's
and the owner's judgement.

## 3. B and C — findings → fix → evidence

The 19 external findings (W1) and the reviewer's baseline:

| # | Finding | Fix on `3c38f8d` | Evidence |
|---|---|---|---|
| 1 | Home longer than 10 000 px, scenes repeated | one story, told once. Measured under identical conditions: EN 10 533 → 9 225 px, ES 10 622 → 9 473 px at 1440; on the phone profile 14 428 → 13 004 (EN), 14 777 → 13 370 (ES) | `performance/PERFORMANCE.md`, `pages/page-capture.json` |
| 2 | "From a message to a task" twice | one journey "From a message to a finished task": answered → recorded → handed over → done; the hero's four chips are its anchors | link matrix: 18 anchors exist |
| 3 | Setup shown as a step of the customer journey | own section after the journey, with the readiness check | close-up `…-home-statement-setup.jpg` |
| 4 | Video | Daily clip behind its poster in stage 04; details in §4 | suite 5 |
| 5 | Layout variety | §2 | close-ups, scroll clips |
| 6 | White voids | bands and panels, no section without a ground | page captures |
| 7 | Trial only on Essential | sticker "14 days free · No payment method" on the Essential card only; Growth and Scale: "Request a proposal" with the plan carried to the contact page; no duration of setup, no success figure, no testimonial anywhere | route scan forbidden list 0 hits; link matrix CTA table |
| 8 | Pricing comparable | plans differ by offices, seats and enquiries per month; one block "what every plan includes", one "price and billing period"; invoice ≠ payment kept; **no CRM connection counts**; no amounts (no price authority, O-7) | close-up `…-packages-plans.jpg` |
| 9 | Technical sentences | removed ("Days left are shown from the server…") | route scan |
| 10 | "WhatsApp line appears later" on contact | removed with the whole block | route scan |
| 11 | Q&A | wired, §5 | suites 6, 7 |
| 12 | Daily promise | task surface only: a request becomes a task, somebody takes it, the same person completes it; no chat assistant, no team board, no staff login address | product page, `DAILY_FEATURE_TRUTH` |
| 13 | Laura example | no confirmed availability: the reply notes the wish and hands the time to an agent | hero and stage 01 |
| 14 | Mail link with the sentence's full stop | only the address is the link | link matrix: 46 mail links clean |
| 15 | Calendar shows a person's name | **not in the code**: the public title of the calendar page is "Free Demo Call – See how it works \| Antonio Diaz Gomez \| Cal.com". It is the profile name in the owner's Cal.com account (owner step, §9). Absolute wording: none | link matrix external rows |
| 16 | Social UI | §6 | suites 8, 9 |
| 17 | Legal marks | not published; §8 | — |
| 18 | Real product surfaces as the main visuals | §2 layer 2 | close-ups |
| 19 | "Coming soon" catalogue | none; hidden capabilities have no page | route scan 0 hits, hidden slugs 404 |
| R | Reviewer baseline: mail dot, Q&A `not_configured`, CRM connections 1/3/10 | closed (rows 14, 11, 8) | — |
| R | Reviewer baseline: stage heights (Z17) | measured, not shortened; §2 | `pages/` |
| R | Reviewer baseline: Spanish legal pages under English slugs | **open**, unchanged. Renaming the slugs changes the URLs that go into the Meta app settings; it belongs with the legal publication (§8) | — |

Copy: all 44 deltas of `COPY_DELTAS_0929.md` are in. Interim implementer wording, for Copy to replace: the third
pain and the three pain labels, the Lead Intelligence lead and scenario, `periodLine`, the three plan lines, the
control labels of the clip (play, "21 seconds, no sound", alt text, load error), every Spanish sentence of the
social screens and every social sentence marked `// interim` in `lib/i18n/dictionaries/en.ts`.

Navigation (suite 16): a new page starts at the top, back returns to the place that was left, anchors land
below the fixed header, a deep link with an anchor works on first load, the language switch keeps the anchor.
Accordions: the public pages have none any more; questions stand with their answers, nothing is folded away (the
one disclosure left is in the onboarding's CRM step, a native `details` with a 44 px target).

## 4. Media manifest

Source: `backend_handoff/handoff_in_2026-09-29/daily_media/` (Daily lane, recorded 2026-09-28 from the real staff
client on staging, synthetic people and properties). Copied unchanged to `public/media/daily/`.

| File (× `en`/`es`) | Format | Size | Used |
|---|---|---|---|
| `daily-claim-flow-<l>-desktop.mp4` | 1756×988, 21.3 s, no audio track | 709 / 686 kB | stage 04, from 768 px |
| `daily-claim-flow-<l>-mobile.mp4` | 840×1052, 21.3 s, no audio track | 607 / 638 kB | stage 04, below 768 px |
| `daily-clip-poster-<l>-{desktop,mobile}.png` | first frame | 93–106 kB | the clip's poster, lazy |
| `daily-task-card-<l>-{desktop,mobile}.png` | one card | 35–37 kB | stage 03 |
| `daily-task-action-<l>-{desktop,mobile}.png` | list after "taken by you" | 98–110 kB | Daily Tasks product page, platform overview |
| `daily-tasks-…`, `daily-task-done-…` | list at rest, done state | 79–106 kB | shipped, **not referenced** by a page (the poster shows the same list; the done state is in the clip) |
| `…-desktop.webm` | VP9 | — | not shipped: the mp4 plays in every browser tested; one format keeps the choice simple |

Behaviour (suite 5): before play there is no `<video>` element and no request for a film; the poster keeps the
frame's ratio, so nothing shifts; play starts muted with the browser's own controls; no autoplay, no loop; the
caption line under the frame changes at 7.0 s and 13.5 s (measured on the four cuts) and tells the three steps, so
the clip is understood without sound and without a subtitle menu; if the film cannot be loaded the poster and the
play control return with a sentence. Synthetic data is labelled on every surface; the clip's note says that the
blue ring is a recording aid and not part of the product.

No furniture import, no photo reconstruction, no 3D in this round (`3D_FEATURE_TRUTH` read; the capability stays
without a page).

## 5. D — question box (product assistant)

Path: browser → `POST /api/qa` on the site (same origin, rate limit) → the site's server signs
(`X-Nuova-*`, HMAC over `ts|nonce|sha256`) and forwards to Hosting's staging endpoint, tenant
`stg_web_product_qa` → answer on screen. The browser sends the question and the language, nothing else. The
secret is a Secret-type variable of the **staging preview project only**, piped from the secure store; it is in
no response body, no cookie and no page (suite 6, 762 kB of responses searched).

Changed because the product assistant records no handover and creates no lead (`WEBQA_BACKEND_READY` §3): the
contact field is gone, nothing promises that a person will answer, every outcome that is not an answer says "We
cannot confirm that from here. A person can." with a link to the contact page. The AI notice stays next to the
conversation. Staging and live builds hide the box unless the deployment sets `NEXT_PUBLIC_QA_SURFACE=public`; the
design preview keeps its labelled demo and is not connected.

What was seen:

| When | Deployment | EN "Does Nuova answer WhatsApp enquiries at night?" | ES "¿Tengo que cambiar de CRM?" |
|---|---|---|---|
| 2026-09-29 13:4xZ and 16:5xZ | `dpl_DEbNfSV6coHXeCJeyr6AbeLvz7Q8` (`e8b4e79`), `dpl_8M3hnypnZM1CruWr4bvBmZWAwyMU` (`3ea6e2f`) | answer from the knowledge base in 5.4 s: "Yes. Nuova answers WhatsApp enquiries at night and weekends. The replies do not wait for office hours. However, no specific response time in minutes is promised or measured." | answer in 4.5 s: "No. Se incluye un CRM y es donde viven tus leads desde el principio. Conectar un CRM externo no forma parte de la oferta hoy, así que dinos cuál usas y entretanto sigues con el CRM incluido." |
| 2026-09-30 09:35Z, three questions, called directly and through the site | `dpl_8xx9U1TuH6XaGT8EM9sEzb5etB41` (`3c38f8d`) | the backend returns `status: "answered"` with "I cannot answer that right now. A colleague will get back to you." for every question | "No puedo responder eso ahora mismo. Un compañero te responderá." |

The pictures of the 2026-09-29 run were overwritten by the later runs; the texts above are from that run's log.

**For Hosting / Lead:** (1) since some time before 2026-09-30 09:00Z the staging assistant no longer answers from the
knowledge base; (2) its fallback sentence promises contact although this path records none, against §3 of its own
contract, and carries no marker (no `answer_class`, no `degraded`); (3) the synchronous 200 carries no
`kb_version`. The site now refuses to show any answer text that promises contact and shows its own state instead,
so a visitor is not told something nobody keeps. `WEBSITE_QA_STAGING` stays Hosting's signal; with the assistant
answering again the two open checks of suite 6 pass without a change on my side.

## 6. D — social screens (read side)

`/social`, `/social/post`, `/social/inbox`, `/social/settings`, EN and ES, behind the normal login. The server
forwards the signed-in user's own session token to `tenant-api` op `social.state`; the session decides the tenant,
no `client_id` is sent. The answer is reduced on the server before anything reaches the browser: no tenant id, no
credential, no provider account id, no internal id, no rule text; a permalink only if it is an https link to
instagram.com. **No ops token is on the website and `social_meta_ig` is never called**; nothing here can reach a
provider. `service_role` is not used anywhere.

With the reviewer tenant (`stg_meta_review_c5ef6a`, its own user, suite 8): publishing enabled, no account
connected → "No Instagram account connected."; four synthetic listings, the one without documented image rights
refused in words, EN and ES; empty inbox for comments and messages; no connection to disconnect; deletion page
linked. Every action (connect, choose, fetch, reply, check status, disconnect) is visible and disabled, with one
sentence saying that actions are switched on separately; after an unclear outcome only "Check status" exists;
there is no field for a first message. Every other state is in the stub fixtures (suite 9).

Against Social's acceptance list (`SOCIAL_UI_SPEC_v1` §6): point 3 (listing without rights refused) and point 8 (no
token, no raw ids) hold. **Point 1 is not met as written**: the states `not_configured` and `not_released` come from
`config_check` on `social_meta_ig`, which needs the ops token; `social.state` carries neither. Two ways, for Social
and API to choose: add `app_configured` and the active release to `social.state` (keeps the ops token off the
website for everything that only reads), or accept the ops token on the website's server for the action step.
Point 7 (disconnect) and points 2, 4, 5, 6 belong to the action step and the owner's release.

Also missing in `social.state` for the spec: the last 20 operations for screen D, and a first image per listing
for screen B. Prices are printed in euros (the contract does not name a currency).

## 7. D — owner resume

In place: API's `STG_AUTH_REDIRECTS = EXACT+ORIGIN` for the staging alias with `site_url` on it (their evidence
`stg_redirects_mump1gmv.json`, 2026-09-29 13:09Z). On the deployed staging preview a staging identity logs in
through the form over HTTPS and lands in the onboarding (suite 8, reviewer tenant's user); a login without an
account answers correctly (suite 10); the path "confirmed, no agency → registration step → agency once →
onboarding" passes in the stub (suite 11, B10) and API proved its database side 9/9 in a rolled-back transaction.

Not done: the ordered test **with a confirmed identity without an agency on the deployed staging preview**. No
such identity exists in the secure store; every fixture there has an agency. Creating one needs the identity
server's admin access, which is API's, not the website's (the website holds the publishable key only), and I
did not use another lane's key for it. The owner's identity of 22.09. was not touched.

Ready: `scripts/e2e/owner-resume-browser.mjs`. With `stg_web_resume_fixture.txt` (e-mail, password) in the secure
store it runs read-only in one command (login → registration step shown → state route says `register`), and with
`RUN_REGISTER=1` it names the agency once and checks reload and the second attempt. After that run:
`OWNER_RESUME_READY` with `<staging>/es/login`.

## 8. D — legal

`LEGAL_PAGES_FINAL` (v2, in `LEGAL_PAGES_FINAL_v1.md`) and `META_LEGAL_SECTIONS_v1.md` are read and compared.
The v2 text still carries **24 marks in 7 gaps** (NIF, full address, retention, subprocessor list, DPA,
liability, publication date). By rule no page with a mark is published, and I invented no approval: the legal
routes of both previews keep their labelled placeholder state (label present on both previews, EN and ES). `META_LEGAL_PUBLIC`
needs: the owner's O-6 lines, Hosting's subprocessor list, counsel's three answers, then O-14 for the customer
domain. The deletion callback is API's and does not exist yet; the social settings screen therefore promises no
deadline and links to the deletion page.

## 9. Open, by owner of the next step

| # | What | Who | Signal |
|---|---|---|---|
| 1 | Word on the visual direction (desktop and phone, design alias) → I roll it out to the remaining pages | Owner | direction feedback |
| 2 | Cal.com: the public profile name shown in the calendar page title is a person's name; set the profile or team name to NuovaSolution | Owner (Cal.com settings) | — |
| 3 | One confirmed staging identity without an agency, in the secure store as `stg_web_resume_fixture.txt` | API | then `OWNER_RESUME_READY` from me |
| 4 | Staging assistant answers again from the knowledge base; fallback text without a contact promise, with a marker; `kb_version` on the synchronous answer | Hosting / Lead | `WEBSITE_QA_STAGING` |
| 5 | `PLANS_ENDPOINT`: the plan cards still use the transcription of 2026-09-23. Two questions with it: `daily.goals` is false for trial and Essential in the catalogue although the task surface is sold in every plan; and whether "Leads per month" is a hard cap | API, Copy | `PLANS_ENDPOINT` |
| 6 | Social: where `not_configured` / `not_released` come from for a read-only screen (§6); log and listing image in `social.state`; Spanish texts | Social, API, Copy | `SOCIAL_UI_ACCEPTED` |
| 7 | Legal inputs (§8) | Owner, Hosting, Counsel, Copy | `LEGAL_PAGES_FINAL` marks = 0 |
| 8 | Prices (O-7), old-site hotfix and legal publication on the customer domain (O-14), demo test booking (O-15) | Owner | — |
| 9 | Interim wordings (§3) | Copy | string deltas |

Rules kept: design stub and real staging stay separate projects and builds; nothing was changed in production, in
the existing `nuovasolution` project or on the customer domain; no force push; no protection of another
deployment was switched off; the owner's staging identity was neither used nor changed; no secret is in the
browser, the repository, a log or a picture; n8n was not touched.
