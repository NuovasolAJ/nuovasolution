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

Two strips sit above the first screen on the preview only (the environment ribbon and the preview switches; 152 px on the phone, 94 px on
the desktop); a released build has neither. So every window is measured twice: with the strips (what RV6 and the owner see on the alias)
and with both removed from the page (what the product shows). Probe v2 `fold-es-en.mjs`, result `fold-es-en-local-00b488e-with-without.json`.

| Window | With the strips: ES task · action | EN task · action | Without: ES task · action | EN task · action |
|---|---|---|---|---|
| 390 × 844 | 132 · 40 | 132 · 40 | 284 · 192 | 284 · 192 |
| 1280 × 720 | 160 · 66 | 117 · 23 | 254 · 160 | 211 · 117 |
| 1366 × 768 | 168 · 74 | 165 · 71 | 262 · 168 | 259 · 165 |
| 1440 × 900 | 168 · 74 | 150 · 56 | 262 · 168 | 243 · 149 |
| 375 × 667 | 29 · −61 | −52 · −142 | 181 · 91 | 100 · 10 |
| 360 × 640 | −17 · −107 | −98 · −188 | 135 · 45 | 54 · −36 |
| 414 × 896 | 132 · 40 | 132 · 40 | 284 · 192 | 284 · 192 |

(after `b8bb2bc` and `49410c1`; the preview marker on the desktop's left edge is removed with the strips; 360 and 414 are the masterprompt's
phone set, measured on RV6's request; JSON `fold-es-en-local-b8bb2bc-plus-7-windows.json`.)

**What this means for the small phones:** on the preview, with the strips, 375 × 667 and 360 × 640 do not fit; on the released page the task
card sits on the first screen at every window in both languages, and the main action too, except at 360 × 640 in English (36 px under
the fold, one short scroll). The 390 × 844 rows are identical in ES and EN because the phone's minimum height sets the hero's height there
and the content is shorter than it in both languages; the scene's containers report scrollHeight = clientHeight (no clipped text).

**The edge to the next section (RV6 3092143, 0f88744):** on the released desktop page the pain line was cut through its letters at the
fold; the first fix (`49410c1`) left 117–128 px of empty sand band there instead, which is the blank band this build set out to remove.
The whole line cannot fit on the desktop first screen (the content sets the hero's height at 1280/1366/1440 in both languages). Rule now
(the commit after `49410c1`): where the line fits it is whole with its mark (390, 414); everywhere else the hero fills the first screen,
words at the top, the living-room picture to the fold — never a sliced line, never a blank band. `peek.mjs` reports whole / under the
fold / sliced per window; result `peek-local-49410c1-plus.json`: 390/414 whole, every other window 0 px of peek, none sliced. Pictures
without the strips: `e2_kandidat_1124\falz_es_en\ohne-streifen-*.png` (360, 375, 390, 414, 1366; ES and EN); the two desktop forms side
by side for the owner's eye in `falz_es_en\kante_desktop\` (variante-1 = the sand band, variante-2 = the hero to the fold, built).
Headroom with the strips rises where the hero was taller than its content (1366 ES 74 → 114, 1440 ES 66 → 99); the table above
keeps the earlier figures for the other rows, the JSON `fold-es-en-local-49410c1-plus-7-windows.json` has all of them.
Where the hero runs to the fold the first screen carried no sign that the page goes on (RV6 f243f62; the scroll arrow left with the
owner's E2 rule), so the picture now dissolves into the next section's ground over its last 72 px, still, no arrow; the caption sits above it.

## 3a. The hero with the owner's text of 17.11. (Copy 36e2e15, the owner's order of 26.11.)

The headline and the subline went back to the owner's text, character for character ("Haz crecer tu inmobiliaria. No tu carga de
trabajo." and the long subline; EN as in 92f873d). The subline is about half as long again as the E2 line, so the whole first screen was
measured once more on this build (JSON `fold-es-en-local-hero-1117-text-7-windows.json`, `peek-local-hero-1117-text.json`; pictures
`e2_kandidat_1124\hero_text_1117\`). Headroom task card · main action, ES | EN:

| Window | With the strips | Without the strips |
|---|---|---|
| 360 × 640 | −62 · −152 \| −110 · −200 | 90 · 0 \| 42 · −48 |
| 375 × 667 | −16 · −106 \| −63 · −153 | 136 · 46 \| 89 · −1 |
| 390 × 844 | 132 · 40 \| 123 · 31 | 284 · 192 \| 275 · 183 |
| 414 × 896 | 132 · 40 \| 132 · 40 | 284 · 192 \| 284 · 192 |
| 1280 × 720 | 132 · 38 \| 89 · −5 | 225 · 131 \| 182 · 88 |
| 1366 × 768 | 180 · 86 \| 137 · 43 | 273 · 179 \| 230 · 136 |
| 1440 × 900 | 161 · 67 \| 156 · 62 | 255 · 161 \| 250 · 156 |

**What the longer text costs, stated before anyone measures it:** on the released page the task card is on the first screen at every
window in both languages; the main action ends under the fold only on the two smallest phones in English (360 × 640: 48 px; 375 × 667:
1 px). On the preview, with the strips, the English action at 1280 × 720 ends 5 px under the fold and the small phones do not fit. The
pain line stays whole at 390/414 (peek 160/151 px), no window sliced; R-13 unchanged.

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

Durability note (RV6 8c37c9f, 27.11.): at 390 EN the content, not the minimum height, now sets the hero (9 px over the minimum) and the pain line clears the fold by 31 px — the next line added to the hero slices it there first. Measure peek.mjs after any hero text change.

## 7. For Audit: the restored subline against the register (RV6 10c0da2, Nachtrag 7, 27.11.; source reading, no measurement)

The owner's subline of 17.11. is back on the first screen of every page (baa7c8e). RV6 held its six claims against
`governance/WEBSITE_VERSPRECHEN_REGISTER_1120_v1.md`, whose preamble says that since 32236c1 nothing gates rendering, so every rendered
sentence is a public promise:

| Claim | Register rows | State |
|---|---|---|
| capta clientes | adsLeads (10), instagram (33) | Bau · Ausnahme Meta / externe Freigabe |
| responde consultas | replyEmail (1); over WhatsApp replyWhatsapp (3), whatsappOwnNumber (4) | belegt (email, own agency) / Bau |
| hace seguimiento | followup (27) | Bau · Ausnahme Anwalt |
| Reactiva contactos | matching (26), followup (27) | Bau |
| propone inmuebles | matching (26) | Bau (pm_certified = false) |
| qué merece tu atención | reportTrend (30) by wording; priorityWithReason (12) on a narrower reading | Bau / belegt |

One proven, one arguable, four Bau. The sentence describes the target state; under the owner's decision 2 of 23.11. the preview shows
the product at 100 %. Whether the RELEASED public page may carry it is Audit's and the owner's call. The text is from 17.11. (built in
92f873d); the rule that every rendered sentence is a public promise is from 23.11.; the text returns into a stricter regime than the
one it left. Redesign's part: the hero's subline now carries these keys at source (`brief-1120.ts` `hero.keys`, typed `ClaimKey[]`, not rendered, no
gate), so Audit's instrument sees the hero's claims as it sees the cards' (`strengths.ts` g1/g2).

## 8. The owner's decision of 27.11. ("E2-VORSCHAU = JA") → one state, pushed once to the protected preview

Website content commit `54775b8` (the tip pushed carries this document's update on top). The six points:

| Point | Built | Measured on the local build |
|---|---|---|
| 1 Hero text of 17.11. incl. "past"; hero → pain → solution | unchanged from `baa7c8e`; the order was already so | — |
| 2 Form 2 to the edge; a quiet keyboard-reachable scroll hint to the pain section; the fixed phone bar never over the action or its focus | `.hf-edge` (44 × 44, chevron, still, shown where the hero runs to the fold; `#pain` on the pain section) | hint at 1366: 14 Tab presses, focus ring, Enter lands on the pain section; the bar is hidden at the main action and while the trial link holds focus at 360 / 375 / 390 (`e2-final-local-probe.json`) |
| 3 Photo C, animated background kept, no brown tint, darken only behind the text, black buttons | Pexels 35419464 in four WebP widths (`public/media/photos/hero-c-*.webp`, licence record in `FOTOS_LIZENZ_1124_v1.md`), the 24 s drift kept, no film, a left-side shade only (vertical on the phone) | pictures `e2_kandidat_1124\e2_final_1127\` |
| 4 WhatsApp heads neutral, dark label, the official green mark | both heads (first screen, demo; also the agency-task proof) `#f0f2f5`, label ink, mark `#25d366`; bubbles keep the app's tints | demo head rgb(240, 242, 245), mark rgb(37, 211, 102) |
| 5 Hero card title / demo end title, no time in a title, no promised call-back | "Devolver la llamada por el piso de Nerja" / "Return the call about the flat in Nerja"; demo end "Llamar a Mila por el piso de Nerja" / "Call Mila about the flat in Nerja"; the reference stays in Mila's enquiry; the 17:00 stays on her record ("Pide"), where the shown enquiry names it | old title absent, new present (probe) |
| 6 Stacked tasks, compact report kept; W-10, matrix, score to the next phase; Audit carries V-1 | unchanged | — |

Fold on this state, task card · main action, ES | EN, WITHOUT the preview strips (with them in `fold-es-en-local-e2-final-7-windows.json`):
360 × 640 90 · 0 | 64 · −26; 375 × 667 142 · 52 | 110 · 20; 390 × 844 284 · 192 | 284 · 192; 414 × 896 284 · 192 | 284 · 192;
1280 × 720 225 · 131 | 182 · 88; 1366 × 768 273 · 179 | 230 · 136; 1440 × 900 255 · 161 | 250 · 156. The three English edge cases the owner
accepted for E2 are now one (360 × 640 EN, 26 px). Peek: 390/414 the whole pain line, every other window 0, none sliced. R-13: 1366 13 presses,
390 6, the link 44 px.

Vercel before the push (CLI, 27.11.): the preview project lists its deployments, the newest four days old, nothing accumulating; cost 0.

**Pushed 27.11. (the owner's line E2-VORSCHAU = JA):** tip `dbd14d8` = `dpl_Aap3q2WQn2tDU84Rq5xFQuHoZSY1` on the alias (`/api/build`: commit, id, mode stub). ES `https://nuovasolution-design-preview-git-we-eeb43f-nuovasolajs-projects.vercel.app/es`, EN `…/en`. RV6 runs the agreed full pass once on this id; Audit carries V-1. No public launch; that needs the owner's own line.

**Pushed 27.11., second release (E2-VORSCHAU = JA für 43d9cce):** tip `43d9cce` = `dpl_B4BAFStBAfPBKVujC1gniS55JoAX` on the alias. Carries RV6's E-1…E-6 fixes (caption capsule, wider desktop shade, neutral task-proof head, hint 44 px with the visibility rule), the hero register record, and the Rundgang prototype on its own noindex route `/es/rundgang` · `/en/rundgang`. RV6 runs the targeted short run (E-1…E-4, the hint on the small phones, the 360/375 fold rows; 360 × 640 ES accepted by the owner if the button is fully visible and operable). The owner decides the public release separately.

**Pushed 27.11., third release (the owner's line "PUSH-VORSCHAU = JA: 60a38e1 plus Copys Titelzeile als ein Kandidat, nur auf die geschützte Vorschau, nicht öffentlich"):** tip `7a46a59` = `dpl_G44cWgQV64jgPcivJtD2Yix2KJhD` on the alias. Carries RV6's N-1…N-5 fixes since 43d9cce (caption on the dark shade on the short phone; hint and dissolve edge on the desktop only; the 28 px edge; `data-hero-fit` edge/peek so no phone height slices a line; the 100svh probe element, b9b3984) and the owner's hero task title via Copy (be3051c §3): ES "Devolver la llamada por el piso de Nerja" unchanged, EN "Call Mila about the flat in Nerja" (the demo's end words; "Return the call…" left the page). Vercel before the push (CLI): nine deployments listed on the preview project, the newest two hours old, nothing to delete; cost 0. The owner's foot question at 360 / 375 EN: my recommendation, which RV6 measures with the candidate, is no change against 60a38e1 — where the hero's content is taller than the window nothing is added and nothing hidden (no hint, no edge, caption under the fold); the content running past the window is the cue. Measured on the alias without the strips (task card · main action; `evidence/foot-alias-7a46a59.json`): 360 × 640 ES 90 · 0 (the owner's accepted 0 px), EN 64 · −26 (the one accepted English edge case); 375 × 667 ES 158 · 68 with the edge and the caption inside at 627, EN 110 · 20, caption 8 px under; 390 × 844 both 292 · 200; caption contrast on the shade 16.1 / 15.3 ES, 15.8 / 9.2 EN; no hint on any phone, 0 px overlap. RV6's short run on this id: N-1…N-5, the 360/375 rows both languages, the hero foot, the height sweep (fine steps, no JavaScript, early-late flip), the probe's inertness, the EN title. Public release stays closed until the hero claims are live (the owner, V-1; Audit's register). Nothing changes on the build until RV6 has measured.
