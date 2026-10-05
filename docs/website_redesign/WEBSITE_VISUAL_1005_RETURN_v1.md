# WEBSITE VISUAL 1005 — the corrected visual direction, as an excerpt for the owner's view

**State:** `2026-10-05` · **Lane:** Website Implementer → **Owner** (visual decision), Audit, Copy.
**Order:** "NuovaSolution – visuelle Richtung korrigieren und Produkt verständlich zeigen" (owner, 2026-10-05),
aligned with the running R10b work: nothing was built twice, the hero of 2026-10-03 was replaced, not kept.
**Status:** implemented and awaiting independent technical and final audit. **This is not a claim that the
page is finished or premium.** It is the first excerpt the order asks for (§1): the new hero and the
interactive product demonstration directly under it. The rest of the site is unchanged and waits for the
owner's feedback.

```
WEBSITE_EXCERPT_PREVIEW = c360d1f dpl_68rx9Uwm7osAMpsxEpM2XMUHuhpk
```

| | |
|---|---|
| Preview (alias, always the newest) | https://nuovasolution-design-preview-git-we-eeb43f-nuovasolajs-projects.vercel.app/es · `/en` |
| This deployment | https://nuovasolution-design-preview-4ml7ggo52-nuovasolajs-projects.vercel.app |
| Commits | `1c23d34` hero world and demonstration · `cece862` room under the panel's story · `165050e` Daily's clip v3 on the Daily page · `c360d1f` contrast of small text |
| Staging preview | still **held** on `486bfe8` (file `.staging-hold`); nothing of this is on staging |
| Browser | headless Edge (Chromium). **No Safari, no real phone.** |

---

## 1. What to look at

Folder `docs/website_redesign/evidence_2026-10-05/`, all pictures in original size.

| File | What it shows |
|---|---|
| `BEFORE_AFTER_1440_es.png` | the first screen on 2026-10-02 (`cf6e80f`), on 2026-10-03 (`b108810`), now, and the scene scrolled 400 px |
| `BEFORE_AFTER_390_es.png` | the same on the phone: before, before, now (first screen, the panel, the foot of the scene) |
| `REFERENCE_COMPARE_1440_es.png`, `REFERENCE_COMPARE_390_es.png` | now, next to fora.so and glaido.com |
| `DEMO_STEPS_1440_es.png` | the four views of the demonstration on one sheet |
| `hero/hero-film-d1440-es.mp4` (12 s), `hero/hero-film-m390-es.mp4` (14 s) | the sequence in the panel, then the scroll in which the four depths move apart. Recorded on `cece862`; the two later commits change no motion |
| `hero/*.png` | hero, desktop and phone, ES and EN: first screen, the scene, on the phone also the panel and the foot |
| `demo/*.png` | every step on desktop, the full conversation opened, the task taken, steps on the phone, the trial offer |
| `checks/excerpt-check.json`, `checks/hero-d1440-es-nojs.png` | the measured closing conditions (§4) |
| `performance/PERFORMANCE.md` | loading before and after (§5) |

## 2. The hero: one spatial scene in four depths

Not four cards and not nested containers. A Mediterranean world drawn for this site (own SVG, no
photograph, no foreign asset), on dark anthracite:

| Depth | What is there | In the still picture | On scroll |
|---|---|---|---|
| 1 far | the sky after sunset with a warm band along the horizon, two mountain ridges, coast lights, the sea with the last light on it, a few stars | lowest contrast, smallest forms | lags behind the page (moves down against it) |
| 2 mid | two hillsides with a white village: a bell tower, an arcade with a lit arch, cypresses, a palm, lit windows | lighter walls, warm windows, cut by the panel | lags behind, half as much |
| 3 panel | **one large light Nuova panel**: the WhatsApp enquiry, the reply in Spanish, the customer record, the next step | the brightest and largest thing in the picture, leaning back in perspective | comes upright |
| 4 front | an olive tree and an agave on the left, a stepped terrace wall with a pot and the foot of an arch with a lamp on the right | darkest, covers the panel's lower corners | runs ahead of the page |

- The headline and the buttons stand on the open sky. No foreground reaches them, and none reaches the
  panel's story (measured, §4).
- The former beige round form, the frame inside a frame and the pills are gone. The panel is one surface.
- **Phone and reduced motion keep the composition.** On the phone the landscape shows in a band above the
  panel and the foreground lies over its lower corners; with reduced motion nothing moves and the panel keeps
  a small fixed lean.
- No scroll lock and no pinned section: the page scrolls natively throughout.
- Art direction as ordered: dark anthracite hero, warm ivory content, one warm accent (the dusk and the lit
  windows, the brand gold in small marks). WhatsApp green appears only on the WhatsApp conversation. No logo
  strip.
- The navigation has no bar while the page is at its top (light words on the sky) and is the usual light bar
  after the first scroll. The logo is the unchanged official lockup, in ivory on the sky.

## 3. The product story

**Headline (the owner's direction):** "Menos gestión. Más tiempo para tus clientes." · EN "Less admin.
More time for your clients." Under it one factual sentence on what is proven today.
**Primary button:** see the demonstration. **Second:** the trial. The trial is offered again after the
demonstration.

**One consistent case** in the hero's panel and in the demonstration: Laura Serrano writes on WhatsApp on
Sunday at 21:40 about a two bedroom flat in Estepona (REF-DEMO-204) and Thursday morning; Nuova replies in
Spanish; her record holds what she asked for; the next step is to confirm Thursday's viewing. The
contradiction "Spanish message / writes in English" is gone: the record says **Spanish**, and the
conversation is shown in Spanish on both language versions, because that is the language the product
replies in.

**The demonstration** (`#demo`): four steps beside one large stage. Each step can be chosen by hand, there
are previous, next and play/pause controls, and the automatic run gives 7 seconds per step, only while the
stage is on screen, and stops for good at the first choice by hand. The last view is a real small
interaction: take the task, mark it done, and the four-line summary of the case follows.

**AI labelling (§5 of the order):** the compact view shows "Nuova · asistente de IA" and the product's
reply. It is marked "Vista abreviada"; "Ver la conversación completa" opens the full message in place, with
the approved notice word for word. Nothing of the approved notice was changed, and nothing claims legal
compliance.

### Real product path or design prototype

| What is shown | Kind | Basis |
|---|---|---|
| WhatsApp enquiry → reply in Spanish → customer record → task that a person takes and completes (hero panel and demonstration) | **real product path**, shown with invented people and data; marked so under the stage | package matrix 2026-10-03: automatic replies (production, Spanish), CRM entries (production), task list / take / complete (production) |
| Daily / Jarvis as a WhatsApp morning overview (§6 of the order) | **not built yet; it will be a design prototype, marked as one, and not published as available** | see §6 below: the WhatsApp way is not proven end to end |
| Phone, property matching, social, 3D scenes (§7) | **not built yet**; all four are unproven for customers today and will be marked prototypes | package matrix: staging only or handwork per order |

## 4. The visual closing conditions, measured on this deployment

`scripts/design/excerpt-check.mjs`, 11 of 11, headless Edge, `/es`, 1440 × 900 and 390 × 844.

| Condition of the order | Result |
|---|---|
| Four depths recognisable in the still picture | see `hero/hero-d1440-es-scene.png` and `hero/hero-m390-es-foot.png`; a judgement for the owner, not a number |
| Layers move by different amounts | after 420 px of scroll: far +20.0 px, mid +10.7 px, front −12.4 px (desktop); +7.4 / +4.1 / −3.7 px (phone); the panel's lean goes from 7° towards upright |
| No foreground over text or controls | probed on the painted shapes at five scroll positions, desktop and phone: 0 hits on headline, sub-line, both buttons and the four story parts; control probe sees the foreground (2 of 2) |
| A customer action leads visibly to a fitting result | steps 1 → 2 → 3 → 4 of the demonstration; the task can be taken and completed |
| No contradictory example data | one story object feeds the hero and the demonstration (name, time, property, language, channel) |
| No unreadable text behind stacked cards | the card deck is no longer on the page; nothing is stacked |
| Phone | same composition, steps above the stage, controls under it, touch targets 44 px and more |
| Reduced motion | everything visible at once, no layer moves, the panel keeps a fixed lean, the demonstration does not run by itself |
| Keyboard | steps, the full conversation, take and done work with Enter and Space |
| Without JavaScript | the hero's finished picture and the four steps are in the document |
| Forms, authentication, onboarding | untouched; on this deployment the route scan passes 55 of 55 and the link matrix 1016 of 1016 |
| Contrast of small text | 0 below the floor on all sales routes (two real findings in the panel were fixed in `c360d1f`) |

Modules that open in the page context (§7) are **not** in this excerpt and therefore not claimed.

## 5. Loading, against the page of 2026-10-02

Five runs each, cold cache, medians. Before = `cf6e80f`, after = `cece862`.

| Page | Profile | LCP before | LCP after | Transferred before | after | Layout shift |
|---|---|---|---|---|---|---|
| /es | desktop | 988 ms | 556 ms | 838 kB | 454 kB | 0 → 0 |
| /en | desktop | 1080 ms | 508 ms | 836 kB | 454 kB | 0 → 0 |
| /es | phone, slowed | 3536 ms | 1608 ms | 818 kB | 452 kB | 0 → 0 |
| /en | phone, slowed | 3528 ms | 1592 ms | 811 kB | 452 kB | 0 → 0 |

The page is also shorter (the excerpt has three sections). JavaScript grew from 156 to 185 kB because the
demonstration uses framer-motion; the hero itself needs no script for its first picture.

## 6. Daily / Jarvis: the proof that is missing

Checked against `DAILY_FEATURE_TRUTH_2026-09-28_v1`, the package matrix of 2026-10-03 and the clip v3
manifest: production carries the task list with take and complete; the team overview and everything about
WhatsApp for staff exist as staging logic only; Jarvis "has no WhatsApp path in either direction".

So the WhatsApp morning overview the order describes (new enquiries → reasoned order → take → visible
confirmation → done) **cannot be shown as a product function today**. Missing, exactly: one real end to end
run in which the overview is delivered to a staff member on WhatsApp and "take" and "done" sent from
WhatsApp change the task in the product. Until that exists it will be built as a design prototype with the
mark "Prototipo de diseño. Todavía no disponible." (the label is already in the code), with a reasoned order
that comes only from dates and statements of the customer, never from a budget alone.

What **was** done for Daily now: clip v3 replaces v2 on the Daily page (`165050e`). The picture carries no
text any more, so the player bar covers nothing; the first line describes the opening frame instead of
speaking of Laura over another card; the caption line is read from the subtitle track itself. Clip suite 21
of 21 on the deployment. The existing clip is **not** presented as Jarvis anywhere.

## 7. The 21st.dev building blocks named in the order

| Component | Licence, source | Decision |
|---|---|---|
| Container Scroll Animation (Manu Arora / Aceternity) | MIT, source public | **used, as mechanics**: perspective on the container, rotateX from tilted to flat with the scroll, the layered shadow. Driven by the scene's one scroll measure instead of a second tracker, so the hero needs no animation library for its first picture; the demo's tall spacers are not taken over. It does not replace the landscape depths |
| Animated Feature Carousel (minhxthanh) | no licence stated, source only with a 21st API key | **not copied**; the same visible purpose is implemented by us: a step list beside one large changing stage, by hand or played, 7 s per step |
| Expandable Tabs (preetsuthar17) | no licence stated, source only with a 21st API key | **not used yet**: it is meant for the module selection (§7 of the order), which is not in this excerpt. It will be implemented by us with labels that are always written out |

No init run, no change to `tailwind.config.ts`. `lucide-react` (icons) and the existing `framer-motion`
(demonstration only) are the only packages involved. The two components credited on 2026-10-03 (tailark hero,
Magic UI dot pattern) are no longer in the code.

## 8. Texts

| Text | Source |
|---|---|
| "Menos gestión. Más tiempo para tus clientes." | the owner's direction |
| labels 1 to 3 in the panel, the demonstration's title, its first three step titles, the transparency sentence at step 2 (D-93), the closing line | Copy (`COPY_HERO_1003`, `COPY_DELTAS_1003`) |
| **working text by the implementer, for Copy to confirm or replace:** the English form of the headline; the sub-line; "Ver la demostración"; label 4 "Siguiente paso"; the step sentences 1, 3 and 4; the fourth step's title; the footer line | marked `WORKING` in the dictionaries; the page carries `data-working-text` |

The footer no longer says that Nuova turns enquiries into work for your team; its working line is about
answering and keeping order.
The sentence "One step, and your 14 day trial starts." (D-88, D-89) and the marker "Sample translation…"
are no longer on the home page. On other routes the marker still stands where Copy's D-91 and D-92 will
move it; that belongs to the roll-out.
The demo reference stays `REF-DEMO-204`: Daily's clip v3 was recorded with it, so D-80 (`EST-204`) cannot
ship yet without contradicting the film.

## 9. Not done, on purpose

Waiting for the owner's view of this excerpt (§1 of the order): the Daily prototype, the module section
with demonstrations in place, the package cards on the proven state, the FAQ accordion, the roll-out to the
sub pages, and with it the remaining Copy deltas. Waiting for signals of other lanes as before: Meta legal
pages, the registration test, the social actions (API readiness **and** the lab or owner release).

Suites that assert the former home page (the stub end to end run's home texts, the conversion path from the
hero's old button, the deck probe, the design probe) are **not adapted yet and were not run**; they follow
with the roll-out, when the page has its final sections. Run on this deployment: excerpt check, contrast,
route scan, link matrix, clip suite.

Removed from the home page with this excerpt: the three pains, the four-card journey with the deck, the
one-sentence band, the setup section, the Essential card and the four FAQ answers. Their content is not lost;
it returns in the new direction or stays on its own page.

## 10. For the owner

1. Is the hero's world the right direction: the four depths, the dusk, the amount of landscape beside the
   panel on a desktop and above it on a phone?
2. Is the panel large and clear enough, and is the lean right?
3. Does the demonstration show the product clearly enough to carry the same form into the modules?
4. The headline in English ("Less admin. More time for your clients.") is my rendering of your Spanish line.
