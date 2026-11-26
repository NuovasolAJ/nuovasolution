# Redesign → Owner, Audit (cc RV6, Copy): the E2 candidate, before/after · 26.11.2026 (v1)

**Status:** implemented locally and waiting for the owner's view and the independent technical check. **Not pushed** — the alias still serves
`bea7d19` = `dpl_H6WfQ1GKkjwRtP8F5wq2ZH3SKjUK`; a push needs the owner's own line.
**Candidate:** `0c3a57d` on `website_enterprise_redesign`; before = `bea7d19`.

## 1. Where the pictures and the videos are

Folder on the owner's machine: `C:\Users\Usuario\Desktop\owner_evidence_1117\website_1123\e2_kandidat_1124\`

| What | Files |
|---|---|
| Every home section, before/after, 390 px and 1440 px (26 pairs) | `alle_abschnitte\<section>-<width>-antes-despues.png` (hero, pain, demo, flow, areas, tasks, report, 3d, plans, start, behind, faq, close) |
| First screen and the agency tasks, numbered pairs | `01…04-*.png` |
| Report and "Cómo funciona", numbered pairs | `05…07-*.png` |
| The living first screen on film | `video-erster-bildschirm-hero-390.webm`, `…-hero-1440.webm`, `…-hero-390-reduced.webm` (reduced motion) |
| Hero background candidates A/B/C beside the current render, WhatsApp look | `..\e2_hero_fotos\` |

## 2. What changed (the owner's E2 order of 24.11.)

| Section | Before (bea7d19) | After (candidate) | Problem it solves |
|---|---|---|---|
| First screen | eyebrow, headline, sentence, scene, two buttons, trial line, three benefits, scroll arrow | headline, one sentence, ONE action, the living picture: Mila's WhatsApp message arrives (0.9 s), Marta's task builds itself (1.9–2.4 s), once; reduced motion = everything stands | too much on the first screen; the product was described, not shown |
| WhatsApp | neutral chat | WhatsApp green bar with the mark, wallpaper, the app's bubble tints (first screen and demo) | the channel was not recognisable at once |
| Demo (R-12) | loops through the channels | plays once, the finished task stays, replay only on click; a reader who scrolls past finds the finished picture | the payoff stood 4 s, then vanished |
| "Cómo funciona" | four steps, each with its product piece repeated under it on the phone | tight list on the phone (the pieces are the demo above); desktop keeps the one frame; no blank band after it | duplicate product views, a blank band on the desktop |
| "Lo que tu agencia gana" | long lines, four points per area, three examples per extra card | Copy 88b2d1a: two points per area, shorter proofs, one/no example | text block |
| Seven cards → agency tasks | seven text cards + day story as text | four stacked cards (Atiende por ti · Gana nuevos clientes · Reactiva tus contactos · Cada mañana, el día claro), each with one product-view proof and one black action; 3D as one line; the day as a strip of six moments | describe → show |
| Report | chart, figures, channels, open items, Sin/Con table | the three cards (figure · meaning · next step) and one action to the report page | the home page carried the whole report |
| Buttons and arrows | arrow icons on every action, a white 3D button | no arrows anywhere, black buttons | the owner's design rule |
| Words | "24 h", "varias oficinas", "Hoy responde…" | gone (Copy final lines 4a549bd, 21830f8, 4fa1412, 6beb985, 88b2d1a, 2ea3453) | register and owner decisions |

## 3. Measured (local candidate vs the alias)

| Width | Section | Before px | After px |
|---|---|---|---|
| 390 | first screen | 757 | 716 |
| 390 | "Cómo funciona" | 1715 | 708 |
| 390 | agency tasks (was seven cards + day) | 1574 | 2048 (each card carries a product view now) |
| 390 | report | 3128 | 927 |
| 390 | whole page | 18153 | 15198 |
| 1440 | report | 2072 | 714 |
| 1440 | "Lo que tu agencia gana" | 1460 | 1304 |
| 1440 | whole page | ≈ 14780 | 13131 |

**F22a (RV6 ab6d143, 1366 × 768):** on the candidate the main action "Ver cómo queda la tarea" ends at y = 694 of 768 WITH the preview band
(before: 839, below the fold); 1280 × 720: 668 of 720; 1440 × 900: 843 of 900. Fixed by the short-window block in `app/globals.css`
(two-line headline, two-line sentence, tighter living picture). **F22b** is no defect by the owner's decision of 23.11. (the check shows plan membership, RV6 3e63452).

**R-13 (RV6 34ebc36, source pre-finding, 26.11.):** the trial link on the first screen was a clipped `sr-only` tab stop, so a sighted keyboard
user's focus vanished there. Fixed on the candidate after `0c3a57d`: the link stays clipped while unfocused and appears as the second button
while it holds keyboard focus (the skip-link pattern). Measured with real Tab presses on the local build: 1366 × 768 = 13 presses, 198 × 44 px
at y = 644 (still above the fold); 390 = 6 presses, 358 × 44 px. Evidence `docs/website_redesign/evidence/r13-probe.mjs` and
`r13-local-34ebc36-plus.json`; pictures `e2_kandidat_1124\r13\`. RV6 measures it again on the deployment. **The candidate for the push is
therefore the commit named at release, not `0c3a57d`.**

**The first screen in ES and EN (RV6's headroom question, 26.11.):** English runs longer (the translation line under Mila's message, a longer
sentence) and on the candidate put the main action below the fold at 390 × 844 (46 px) and 1280 × 720 (22 px). Fixed after `0c3a57d`
(the living picture tight at every width, the phone's slack above the headline gone, the band counted in the phone's minimum height, the
sentence on two lines in the short desktop window). Headroom under the main action, unfocused, with the preview band, local build
(`docs/website_redesign/evidence/fold-es-en.mjs`, `fold-es-en-local-194c6ec-plus.json`; pictures `e2_kandidat_1124\falz_es_en\`):

| Window | ES task card | ES main action | EN task card | EN main action |
|---|---|---|---|---|
| 390 × 844 | 132 | 40 | 132 | 40 |
| 1280 × 720 | 160 | 66 | 117 | 23 |
| 1366 × 768 | 168 | 74 | 165 | 71 |
| 1440 × 900 | 168 | 74 | 150 | 56 |
| 375 × 667 | 19 | −73 | −64 | −156 |

**375 × 667 (the SE-sized phone) stays below the fold in both languages** with the band: the band alone takes three lines (92 px) there,
and the first screen's content (headline, sentence, message, task, action) does not fit in the 515 px that remain. The owner decides whether
375 × 667 is a required size for the first screen; the content cannot be made to fit it without removing one of its parts.

## 4. The builder's grades (the owner's six criteria; RV6 grades independently)

| Section | Understanding | Little text | Modern | Premium | Sells | Easy trial | Two references |
|---|---|---|---|---|---|---|---|
| First screen | 9 | 9 | 9 | 9 | 9 | 9 | https://linear.app/homepage · https://www.attio.com |
| Agency tasks | 9 | 9 | 9 | 9 | 9 | 9 | https://framer.university/resources/stacking-cards-on-scroll-in-framer · https://ramp.com |
| Report | 9 | 9 | 9 | 9 | 9 | 9 | https://stripe.com · https://linear.app/homepage |
| "Cómo funciona" | 9 | 9 | 9 | 9 | 9 | 9 | https://www.attio.com · https://ramp.com |

The grade "easy trial" on the first screen counts the header button and the phone bar, since the trial button itself left the first screen on the owner's rule.

## 5. Open for the owner

- The hero background: A / B / C (`e2_hero_fotos\hero-hintergrund-aktuell-vs-A-B-C.png`) or the current render; the motion stays in every case.
- The task title: A (the brief's title with the ref. and 17:00) or B (Copy 6beb985, ref. and time in the second line).
- The push release for the candidate once he has seen the pictures.

## 6. Skills used (the owner's point 7)

Taken over as Markdown only into `.claude/skills/` (github.com/emilkowalski/skills @ 64eb3de): emil-design-eng, find-animation-opportunities, animate (+RECIPES), choreograph (+RECIPES), review-animations (+STANDARDS), apple-design. Applied: one entrance per container, lead/support/decoration roles, the strong ease-out curve, transform and opacity only, play once, reduced motion as a gentle fade, press feedback on every action.
