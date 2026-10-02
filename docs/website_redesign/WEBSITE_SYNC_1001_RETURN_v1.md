# WEBSITE SYNC 1001 — implementer return v1

**Orders:** owner order of 2026-10-02 ("Vollständiger Ersatz des R8-Implementierer-Auftrags") and `AUDIT_ORDERS_2026-10-01` R8 ·
**Lane:** Website Implementer
**Written:** 2026-10-02 · **Branch:** `website_enterprise_redesign`, pushed, no force push · **Code:** `cf6e80f` (on `0a4bb24`,
the round's main commit; `cf6e80f` closes what the staging run found, §6b)
**Base:** code `3d662e1`, docs `228d3a6`; kept on the branch below `0a4bb24`: Copy `73b598d` (COPY_DELTAS_1001) and the
reviewer's `a4b93ef` (F1 and F2 closed on `3d662e1`). The push carried those two commits to the remote as well; nothing of
theirs was changed.
**Status wording:** implemented and awaiting independent technical and final audit. The visual verdict is the owner's
(`WEBSITE_OWNER_ACCEPTANCE`).

Receipt: `backend_handoff/handoff_in_2026-10-01/` (AUDIT_ORDERS_2026-10-01, `daily_clip_v2/` 15 files with MANIFEST),
`COPY_DELTAS_1001.md`, `REVIEW_2026-10-01b.md`, `SOCIAL_ACTIONS_CONTRACT_v1`, `SOCIAL_UI_ACTION_WIRING_PATCH_v1`,
`SOCIAL_UI_CONTRACT_V2_REQUEST_v1`, `AUTH_SENDER_DECISION_v1`, API_SYNC_0930: received, read, integrated or answered below,
tested.

## 0. Signals

```
WEBSITE_ROUND_1001       = cf6e80f  dpl_8556PUqAcV67u3SB6e1YE4YFgrUV  dpl_8fj7GGzQDUL9ughXjiZkQdyrcrJX
   design   https://nuovasolution-design-preview-git-we-eeb43f-nuovasolajs-projects.vercel.app   (…-bhtj2apez-…, stub, noindex)
   staging  https://nuovasolution-staging-preview-git-w-44e113-nuovasolajs-projects.vercel.app  (…-5hidkyoam-…, staging fflmmzapksycjfdcjdtd, noindex)
   (the first deployments of the round, 0a4bb24: design dpl_5VjLQEp92mamDen87BTz2c129KNR …-hy6cudy9j-…, staging dpl_GgVh7At4wLf2cpccfYjQW4znFgty …-r003if2y1-…; the staging run on them found §6b)
LOGIN_BUTTON_FIX         = IMPLEMENTED on both deployments, tested in the browser (§2); ready for the owner's functional test now
CLIP_V2                  = INTEGRATED (home stage 04, Daily product page); MP4 only, Daily's WebM carries no duration header (§4)
COPY_DELTAS_1001         = D-54..D-79 and D-81..D-87 in both languages; D-80 not applied by Copy's own condition (REF-DEMO-204 stays until Daily's EST-204 cut)
ONBOARDING_AREAS         = IMPLEMENTED: five areas, travelling progress, required-step count, four-word states (§5)
SOCIAL_ACTIONS           = ROUTE AND CONTROLS WIRED, every action OFF on staging until API delivers `social.action` and the v2 read model (§6)
REGISTRATION_TEST_READY  = NO — blocked on the owner's AUTH_SMTP_PROVIDER line and API's AUTH_SENDER_LIVE (§8)
21ST_COMPONENTS          = none installed; own implementation of the three candidates' principles (§1)
WEBSITE_OWNER_ACCEPTANCE = (owner)
```

## 1. References and components (order §1)

glaido.com and fora.so were viewed at 1440 and 390 px with scrolling (captures in the session scratchpad, not committed:
foreign brand material). What was taken over is the principle, not a pixel: Fora's **three-plane composition** (a calm
ground that is larger than the product, the product surface in the middle, details in front that break the frame's edge)
and Glaido's **product shown as a legible mail/chat surface with one main action**. No illustration, colour or asset of
either site is used.

The three 21st.dev candidates were checked (preview, source where available, licence, dependencies):

| Candidate | Finding | Decision |
|---|---|---|
| A layer-parallax-hero | preview only, source behind the 21st API key, licence not stated | **built with own means**: `components/ui/depth-scene.tsx` (one scroll listener, `requestAnimationFrame`, writes `--depth`) and the CSS block "Depth" in `globals.css`. 60 lines, no dependency |
| B animated-cards-stack | MIT, needs `motion` + `class-variance-authority`; motion principle = cards stick and the next slides over | the principle was already in `components/site/stack-deck.tsx` (native `position: sticky`); kept and completed per §4 of the order (inert, blur, fallback). No library added |
| C container-scroll-animation | Aceternity, MIT, `framer-motion`; one large product view that tilts while scrolling | **not adopted**: it would repeat the deck's motion on the same page, which the order rules out |

`framer-motion` is in `package.json` from the project's start and remains unused on the site; nothing was installed for a
small effect (order §1).

## 2. Login button (order §6, owner finding)

Cause: every leaving form (login, sign-up, agency registration, set password) ended its submit handler with
`finally { setBusy(false) }`, which ran as soon as the server had answered, while the navigation was still on its way.
The button was clickable again for that moment.

Now (`components/site/auth-forms.tsx`, `useRunning()`): from the first submit the button is **disabled**, carries
`aria-busy`, a quiet ring (`.busy-ring`, static with reduced motion) and the label "Logging you in…" /
"Iniciando sesión…"; a visually hidden `role="status"` line announces the state. A second click or Enter sends nothing
(disabled button plus a ref that catches the moment before React re-renders). On success the page leaves with a full
navigation and **stays busy until the browser has replaced it**. Only a failure frees the button: a wrong login with its
sentence, a server that cannot be reached ("We could not reach the server…"), or no answer within 20 s ("The connection
took too long…"); the address stays, a retry is always possible. The same running state is on the sign-up, agency and
password forms.

Browser tests (`scripts/e2e/form-states-browser.mjs`, the login request is held by the browser's own Fetch domain so the
waiting state is observable):

| # | Case | Result |
|---|---|---|
| FS-06 | two clicks and Enter → **one** request; button disabled, busy, ring, "Logging you in…"; stays blocked until the next page replaces this one | PASS EN · ES |
| FS-07 | refused login → sentence for a wrong login, button free, address kept, a second attempt sends a new request | PASS EN · ES |
| FS-08 | server unreachable → connection sentence, button free | PASS EN · ES |
| FS-09 | no answer at all → busy, then the timeout sentence within 20 s and the button free | PASS |
| FS-05 | staging alias, an address without an account, 600 ms latency → waits visibly, then the wrong-login sentence | see §9 |

Pictures: `evidence_2026-10-02/form_states/m390-*-login-running.jpg`, `…-login-wrong-held.jpg`, `…-login-unreachable.jpg`,
`…-login-timeout.jpg`.

## 3. Hero, colour, navigation, deck (order §2–§4)

**Hero** (`components/site/hero-scene.tsx`): three layers that are told apart in the still picture: the ground (arch, its
hairline echo and a low horizon band, larger than the frame), the product surface (the WhatsApp enquiry, the reply under
the agency's name, the customer record under a divider, inside one white stage) and three foreground details that stand
over the frame's edges (Answered · 21:40 on the top edge, Recorded · Laura Serrano on the left edge at the divider, the
handed-over task card over the frame's bottom padding, below the last line of text). On scroll the ground moves 22 px and
the details 56 px against the surface on the desktop, 10 / 22 px on the phone; with reduced motion or without JavaScript
nothing moves and the picture is complete. The headline and the buttons keep their own column; the scene never lies
over them (checked 1440, 1366×640, 1024, 768, 390, 360). The story is the proven one: enquiry → answer and record →
handover as a task.

**Colour**: the green and blue fields (`--sage-*`, `--sky-*`) are now warm linen and stone, the sage band is linen; no
large green or blue surface remains, status colours (positive, attention, critical) stay functional. One shadow family in
three distances (`--shadow-card`, `--shadow-stage`, `--shadow-overlay`), one contour line, radii unchanged. Section steps
shrink from 1024 px (default 104 → 88 px, feature 128 → 104 px; at 1440: 120 → 96, 144 → 112), so the reading flow is
tighter without touching type sizes. The pain cards sit on a solid ivory surface instead of a 45 % white, so their text
no longer sinks into the sand. Depth language continues in the flow deck, the Daily product page and the onboarding
areas; the FAQ, trial and legal pages keep their flat stages.

**Navigation**: the header is a three-column grid (logo · menu · actions) whose outer columns share the width, so the menu
is geometrically centred independent of what the logo and the actions weigh; labels never wrap. Checked EN and ES at
1440, 1366, 1280, 1024 (below 1024: logo and the menu button). At 1024 with Spanish labels the sides cannot be equal, the
menu shifts left by its own width and nothing wraps or overflows.

**Deck** (`stack-deck.tsx`, `globals.css` "The deck"): the front card is an opaque white stage, so no covered text shows
through; the covered card steps back (scale 0.965, a 1.2 px blur and a 6 % veil at full coverage; both mark the distance,
neither stands in for coverage), its edge stays visible 14 px above the next card; a fully covered card is `inert`, so
nothing under the front card takes a click or the keyboard focus. Native scrolling. A card taller than the window sticks
only once its bottom edge is in view; when the window leaves less than 520 px under the header the cards simply stack.
Deck probe 30/30 at 1440×900, 1280×800, 1024×768 EN/ES, off at 390 and under reduced motion.

Shortened texts (with Copy): hero h1 D-81, lead D-82, "Nothing lives in three places" D-83, the AI note D-77 once instead
of twice (D-79), chip D-76, EN marker D-78. No type size was reduced.

## 4. Videos (order §5)

Daily's clip v2 (`daily_clip_v2/`, recorded 2026-10-01 against staging) is on the home page's fourth stage and at the top
of `/platform/daily-assistant` in place of the still. One shared component, `components/ui/product-clip.tsx`: poster per
format and language (1640×924 / 840×1052), a clear play control with the length ("22 seconds, no sound"), Copy's heading,
lead, poster label and caption (D-72..D-75), Daily's five subtitles as the caption line under the frame (timed from the
VTT) and as a WebVTT track, off by default so nothing covers the recording; no video byte is requested before play; on a
failed load the poster returns with a sentence. Desktop plays the 16:9 cut, the phone the 4:5 cut.

**WebM not served**: Daily's `daily-laura-*-desktop.webm` has no duration header (a recorder stream; checked by the browser,
`duration` is `NaN`, and by reading the file: no Segment Duration element). A browser cannot show a seek bar or the length
for it, so the MP4 is offered for both formats and the WebM stays in the handoff. Ask of Daily: a re-muxed WebM with cues if
the format is wanted.

Not integrated and why: no clip exists for Phone, Social or a WhatsApp inbox, and none may be implied (order §5); the 3D
video waits for the owner's visual acceptance; the task-list clip proves no WhatsApp handling, so it is captioned as what
it shows. No empty placeholders anywhere. The example reference stays `REF-DEMO-204` on the site and in the clip (D-80).
The approved Spanish customer notice is unchanged and visible; the AI label is the chip "Nuova · asistente de IA" (D-76).

## 5. Onboarding (order §7)

`components/site/onboarding-areas.tsx` replaces the step list plus setup page with **five areas**, each a white stage on
the sand ground: 01 agency data and brand (steps account, agency, branding; forms business details, legal details, logo)
· 02 connections and channels (steps channels, lead sources; appointments and hand-off) · 03 CRM and property sources
(steps CRM with the choice, property source, Property Experience) · 04 team and working hours (step team; opening hours
on their own) · 05 summary and activation (readiness gates, go live).

- **Progress** travels with the page: a rail from 1024 px (progress, "continue where you left off", the five areas with
  their state), a slim strip under the header on the phone; neither covers a field or a button for longer than the scroll
  passes it. The count is **"x of N required steps saved"**, derived from the steps that are really needed: optional steps
  and steps a plan does not include are neither counted nor "done" (stub case 2: "4 of 8", case 3: "6 of 9").
- **States** are Copy's four words (D-54..D-57): Saved · Connected · Checked · Required, plus "Waiting on {provider}".
  "Te toca a ti" is gone. "Hecho"/"Done" is no longer used for a typed value; a readiness gate says "Checked" only when the
  backend read it back as READY.
- **Required gets an action**: a required step with a form on the site shows "Go to this step" into its section; a
  required step without a form on the site says so ("There is no form for this on the site yet. The status comes from your
  agency's account.") instead of pointing at nothing.
- **CRM**: interest / selection / connection are three visibly different states with their next step (D-59..D-63): "Interest
  only" with "Interest recorded. Nothing is sent to {provider}."; "Selected, not connected" with the separate connection
  step named; "Connected" only from the backend's connection status.
- **Purpose lines** (D-64..D-71): opening hours are stored and steer the phone assistant being built, not the text replies;
  the calendar line says nothing is booked and a time request becomes a task; the voice line says no number is connected
  and nothing answers a call today; the plan gate says what the trial carries; the legal lead, the address and the two
  link fields say where they appear; the property-source step says the website is not read today (and is not a scraping
  or social consent).
- Save, error, reload and revisit states are unchanged in behaviour (every section saves through its BFF route and shows
  the profile the server read back; `router.refresh()` re-reads steps and gates). The stub cases and the staging suite
  cover them (§9). The owner's account and agency were not used, read or changed; the test used the stub cases and API's
  fixtures.

## 6. Social and registration (order §8)

**Actions wired** per `SOCIAL_UI_ACTION_WIRING_PATCH_v1` §3: `app/api/bff/social/action/route.ts` (same origin, session
required, positive list of the ten actions, 1000-character limit, 5/min for `begin_connect` and 20/min otherwise, calls
`tenant-api` op `social.action` with the user's JWT, passes only the fields the screens show, a refusal is 200 with
`ok:false` and the reason). One deviation from the patch, for the browser's sake: the page sends the **rendered key** of a
post or inbox entry ("p0", "s2"), and the server turns it back into the export id or the reply target from its own fresh
read of the state (`lookupSocialTarget`), so no provider identifier of a third party is ever in the browser and no target
can be typed. Which raw field carries the identifier follows API's example answers; until then the usual names are read
and nothing is sent when none is there.

Controls (`components/site/social-actions.tsx`): Connect Instagram (opens `authorize_url` in a new tab from the click,
reads the state every 3 s for at most 5 min), Check account, Publish on a queued post, Check status after
`delivery_unknown` (publishing again is never offered), Fetch now per inbox tab, public / one private reply per comment,
message reply (field disabled after a sent answer), Disconnect (says the token is deleted). Every control is **off** with
the sentence why when the read state carries no active release, no configured app or no connection; the database decides,
the page never grants.

**Why every action is still off on staging:** the read model has none of the v2 fields (`release`, `provider`,
`cover_url`, `recent_operations`, `SOCIAL_UI_CONTRACT_V2_REQUEST_v1`), so the page cannot tell a missing release from a
missing setup and keeps everything off with the release sentence; and `social.action` is not reported `READY` by API. The
page reads the v2 fields as soon as they arrive (release, validity, post quota and the last operations on screen D); no
provider action runs before the lab release (O-13). Social suite on the staging alias with the reviewer login: §9.

**Registration test**: not run and not claimed. It needs the owner's `AUTH_SMTP_PROVIDER = A|B` and `AUTH_SENDER` line and
API's `AUTH_SENDER_LIVE`; the Supabase default sender (2 mails/hour) is not a test sender. The browser script for the path
(registration → confirmation mail → return → login → agency → onboarding → reload → logout/login) is
`scripts/e2e/owner-resume-browser.mjs` with `RUN_REGISTER=1`; it waits for a mailbox outside the Supabase team. No used
account is passed off as a new registration.

## 6b. Found by the staging run and fixed before the final deployment

- **A tenant key reached the browser.** The backend's `onboarding.state` started carrying `trial.client_id` (new on
  2026-10-02); the website blanked only the top-level `client_id` and passed the rest through, so the staging suite's
  N6 caught the id in `details.state.trial.client_id`. Fix: `stripTenantIds()` in `lib/contracts/server.ts` removes
  every nested `client_id`, `tenant_id` and `client_ref` before the state leaves the server, whatever the backend adds
  next. N6 now names the JSON path of any hit in its evidence.
- The trial line was in the document twice (rail and phone block); the progress block is rendered once and the rail
  only widens from 1024 px (OR-11).
- Two script expectations updated, not site defects: OR-10 read the page before the streamed body had arrived (now waits
  for it); SO-06 expected one inert control on screen A, there are two (Connect, Check account), both off.

## 7. Before and after, recordings

Same views, same widths (1440, 1024, 390), EN and ES: hero, pains, the four flow stages, setup, FAQ, the Daily and CRM
product pages, login, header — **before** on the `3d662e1` design deployment (…-dfucsv37i-…),
`design_probe_2026-10-02/before_after/before/` (72 pictures), **after** on the `0a4bb24` design deployment,
`…/before_after/after/` (72 pictures). Scroll recordings of the home page, desktop and phone, EN and ES, blank frames
refused: `design_probe_2026-10-02/scroll/` (local build) and `…/scroll_deployed/` (the deployment); the desktop clips show
the hero's layers moving apart and the deck. Onboarding close-ups (stub cases 2 and 3, 1440 and 390, EN/ES) are in
`evidence_2026-10-02/e2e/` and `…/probe/` (local).

## 8. Owner steps and remaining blockers

**Owner, iPhone test card (Safari was not used by me; this is a card, not a claim):**
1. Open the design preview on the phone, `/es`. The hero: headline and both buttons on top, below them the WhatsApp
   frame with the chip "Respondida · 21:40" over its top edge and the task card over its bottom edge. Scroll a little: the
   frame moves with the page, the chip and the card a touch faster. Nothing covers a line of text.
2. Scroll to "De un mensaje a una tarea terminada": four cards after each other (no stacking on the phone). On the fourth,
   press "Ver el clip": the clip plays muted, the line under it changes with the picture, the player shows 22 s.
3. Open the staging preview `/es/login`, log in with your access. The button turns to "Iniciando sesión…" with a small
   ring and cannot be pressed a second time until the next page is there. Wrong password once: the sentence appears and
   the button is free again.
4. On the onboarding: a thin strip under the header shows "x de N pasos necesarios guardados" and "Siguiente: …" while
   you scroll; the five areas follow; "Te toca a ti" appears nowhere.
Abort rule unchanged from §1 of the 0930 return: enter nothing if the page asks you to create an account or shows an
agency you did not name.

| Blocker | Owner / lane | Blocks |
|---|---|---|
| `AUTH_SMTP_PROVIDER = A|B`, `AUTH_SENDER`, a test mailbox outside the Supabase team | owner, then API `AUTH_SENDER_LIVE` | the registration test (`REGISTRATION_TEST_READY`) |
| `SOCIAL_ACTION_OP = READY` with an example answer per action; `SOCIAL_UI_CONTRACT_v2 = READY` | API | every social control stays off; Social's four-point acceptance (`SOCIAL_UI_PROVIDER_FLOW_ACCEPTED`) |
| lab release O-13 | owner | provider actions |
| a re-muxed WebM with a duration header, or MP4 only | Daily | nothing on the site; MP4 plays everywhere |
| EST-204 recording | Daily | D-80 |
| 3D video | owner's visual acceptance | the 3D section stays "on request" |
| `WEBQA_KB_ROW = faq-kb-v1.2` | Hosting | the question box stays off |

## 9. Self check on `0a4bb24`

"Deployed" = the HTTPS alias, logged out, deployment IDs as in §0.

| # | Suite | Where | Result | Evidence |
|---|---|---|---|---|
| 1 | Route scan (every route EN/ES incl. `/faq`, hidden slugs 404, noindex, the four clip v2 films as video with byte ranges, the four subtitle files with five cues, forbidden sentences absent) | deployed design · staging `cf6e80f`; local | 55/55 · 55/55; 55/55 | `evidence_2026-10-02/deployed_*/route_scan/`, `…/route_scan/` |
| 2 | Link and CTA matrix (36 pages EN/ES, every link followed) | deployed design · staging | 1048/1048 · 1048/1048 | `…/deployed_*/links/LINK_CTA_MATRIX.md` |
| 3 | Page capture: 17 routes × EN/ES × 1440, 1024, 768, 390, 360, 200 % — one h1, no overflow, no text wider than its box, no broken image, starts at the top | local `cf6e80f`; deployed design | 204/204; 204/204 | `design_probe_2026-10-02/pages/page-capture.json`, `…/pages_deployed/` |
| 4 | Deck (1440×900, 1280×800, 1024×768 EN/ES on; 390 and reduced motion off; covered cards inert) | local; deployed design | 30/30; 30/30 | `evidence_2026-10-02/deck/`, `…/deployed_design/deck/` |
| 5 | Contrast of every small text against its real ground, 60 route/viewport combinations | deployed design | 0 below 4.5 : 1 | `…/deployed_design/contrast/contrast-results.json` |
| 6 | Conversion path, clicked | deployed design · staging | 28/28 · 24/24 | `…/deployed_*/conversion/` |
| 7 | Clip v2 (poster only before play, right film per language and format, muted, ~22 s, caption follows the second and fourth cue, VTT track with five cues off by default, pause/resume, failure → poster + sentence) | local; deployed design | 21/21; 21/21 | `…/clip/`, `…/deployed_design/clip/` |
| 8 | Navigation (top of page, back, anchors, deep link, language switch, nothing folded) | deployed design | 13/13 | `…/deployed_design/nav/` |
| 9 | Form states incl. the login running state FS-06..09 (§2); on the staging alias also FS-05, a real refused login with 600 ms latency, EN and ES | local; deployed staging | 23/23; 25/25 | `…/form_states/`, `…/deployed_staging/form_states/` |
| 10 | Social screens: stub fixtures; the reviewer tenant on staging (every control off with the release sentence, no field for a first message, 44 px, no overflow EN/ES at 1440/768/390/360) | local; deployed staging | 14/14; 14/14 | `…/social/`, `…/deployed_staging/social/` |
| 11 | Owner resume, second visit with API's test identity (login → onboarding with the agency, no registration step, repeated register = `already_registered`, one trial line) | deployed staging | 3/3 | `…/deployed_staging/owner_resume/` |
| 12 | Probe: keyboard, menu, sheet, 200 %, reduced motion, no-JS content, the FAQ | local; deployed design | 94/94; 94/94 | `…/probe/probe-results.json`, `…/deployed_design/probe/` |
| 13 | Stub end to end (box off; onboarding stub cases, CRM choice with the new wording, BFF refusals) | local | 55/55 | `…/e2e/` |
| 14 | Staging end to end (real logins, writes, upload, refusals, N6 tenant-id scan with path evidence) | local staging build against `fflmmzapksycjfdcjdtd` | 27/27 (26/27 before `cf6e80f`, §6b) | `…/staging/` |
| 15 | Mode gate | local | 11/11 | `…/mode-gate-results.json` |

`tsc --noEmit`, `next build` stub and staging: clean. Lint on the changed files: clean.

**Pictures:** committed are every result file, the before and after close-ups (72 + 72), the four scroll clips of the
local build and the four of the deployment, the deck frames, and the pictures of the clip, conversion, form, resume and
stub suites. The large sets (page captures local and deployed, probe local and deployed, social local and staging; 792
pictures) are packed as `evidence-pictures-1001.tar.gz` in the repository root, not committed: 199 790 462 bytes,
SHA-256 `61617252eabf63584490365466a9f244b1c37c76d422c7704ac87274f1054f11`; the SHA-256 of every picture is in the
committed `evidence_2026-10-02/PICTURE_ARCHIVE.sha256.txt`.

**Performance**, `3d662e1` (…-dfucsv37i-…) against `cf6e80f` (…-bhtj2apez-…), same machine, five cold runs each,
interleaved, medians (`evidence_2026-10-02/performance/PERFORMANCE.md`): layout shift 0 at load and after scrolling the
whole page on every page, before and after; 0 kB of video before play. Largest paint on the home page improved on the
desktop (EN 956 → 852 ms, ES 1388 → 916 ms) and on the throttled phone (EN 3460 → 2920 ms, ES 4572 → 3616 ms). The
packages page on the throttled phone is slower in the medians (EN 2844 → 2992 ms, ES 2664 → 2952 ms) with overlapping
single-run ranges, and its main-thread blocking rose (290 → 412 ms EN); the page's code did not change beyond the
shared header and palette, so I report it rather than explain it. Bytes after scrolling the home page rose 566 → 838 kB:
Daily's clip v2 posters are PNG at 1640×924 (≈380 kB each) against the 100 kB posters of v1; they load lazily and only
when the fourth stage is reached. Ask of Daily, or a follow-up here: the same posters as WebP.

**Technical checks vs visual judgement:** the suites above measure overflow, clipping, contrast, one h1, 44 px controls,
keyboard, reduced motion, video playback and form states. Whether the hero's depth, the warm palette and the compact
rhythm read as intended is the owner's judgement on the pictures and the deployment, not something a suite can assert.
No conversion figure is claimed.

## 10. For Copy and the reviewer

- Everything in this round is on the two deployments named in §0; please measure there.
- Copy: the five area titles and lines, "Your selection", "Interest only" and the social action sentences
  (`social.actions.*`) are my interim wording where no delta exists; the onboarding step word for `externally_pending`
  stays "Waiting on {provider}" (D-58). The clip's control labels ("Play the clip", "22 seconds, no sound") are mine.
- Reviewer: the full acceptance on `WEBSITE_ROUND_1001`; the one open hit from `REVIEW_2026-10-01b` (3 px overhang of
  the chat bubble at 768 ES) is in the same bubble, now on a linen field; please re-measure.
- The clip v2 WebM finding (§4) is for Daily.
