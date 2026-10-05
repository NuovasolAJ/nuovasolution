# WEBSITE_HERO_PREVIEW — the new hero, for the owner's view before anything else follows

**State:** `2026-10-05` · **Lane:** Website Implementer → **Audit**, for the owner.
**Order:** R10b (2026-10-03) with the owner's five points of the same day (depth stays binding; enquiry →
reply → CRM record → next action; hot alert only with visible qualification; latest approved texts; the
target package structure without selling what is unfinished).
**Status:** implemented and awaiting independent technical and final audit. The design verdict is the owner's.

```
WEBSITE_HERO_PREVIEW = b108810 dpl_3NDFokWZHDsvrjDfzGcCoJxHg2iu
```

| | |
|---|---|
| Preview (alias, always the newest) | https://nuovasolution-design-preview-git-we-eeb43f-nuovasolajs-projects.vercel.app/es · `/en` |
| This deployment | https://nuovasolution-design-preview-9trwlbrus-nuovasolajs-projects.vercel.app |
| Commits | `46053c4` hero, tokens, Copy's hero texts · `84eafde` staging hold · `b108810` replay fix |
| Staging preview | **not built on purpose** (order: nothing goes to staging before the owner's release). It still serves `486bfe8`. The hold is the file `.staging-hold`; deleting it releases staging |

**Only the hero is new.** Everything below the hero on this deployment is still the former page (interim).
The same design is carried to the other sections only after the owner has seen this.

## 1. The pictures (original size, nothing shrunk)

Folder: `docs/website_redesign/evidence_2026-10-03/hero_preview/`

| File | What it is |
|---|---|
| `HERO_COMPARE_1440_es.png`, `HERO_COMPARE_1440_en.png` | our hero at 1440 × 900 next to fora.so and glaido.com |
| `HERO_COMPARE_390_es.png`, `HERO_COMPARE_390_en.png` | our hero at 390 × 844 (2x): the first screen and the scene scrolled into view, next to fora.so and glaido.com |
| `nuova-hero-d1440-{es,en}.png`, `nuova-hero-m390-{es,en}.png`, `nuova-hero-m390-{es,en}-scene.png` | the single pictures |
| `hero-film-d1440-es.mp4`, `hero-film-m390-es.mp4` | 11 seconds each: the sequence from its first frame, then the scroll in which the layers move |
| `../references/` | the reference pictures taken for this round (hero, pricing area and six stations per site, 1440 and 390) |

Pictures and films are taken from the deployment above in headless Edge (Chromium). **No Safari and no
real phone was used.**

## 2. What the hero shows

One scene, four numbered steps, in the order they happen:

1. **WhatsApp enquiry** — Laura Serrano's message, in Spanish.
2. **Reply in Spanish** — Nuova's reply forms (three dots, then the text), signed "Nuova · AI assistant".
3. **Customer record** — her name and what she asked for, filled in line by line.
4. **A task for your team** — "Confirm Thursday's viewing with Laura Serrano", open, with a Claim button.

There is **no hot lead alert** in the hero. The owner asked for it only where an example shows why a lead
qualifies, and Copy's matrix reading (COPY_HERO_1003 §3) is that the alert running in production still
misfires. It moves to module demonstration 1 with its own state line.

The conversation is in Spanish on both language versions, because Spanish is the language the product
replies in today; the label says so inside the picture ("Reply in Spanish").

## 3. Depth: three layers that can be told apart, and what moves

| Layer | What it is | In the still picture | In motion |
|---|---|---|---|
| Background | a warm ground with a light arch niche and a dot hint | larger than the window, darker than the page, no text | moves least on scroll |
| Product (centre) | the agency's window: conversation on the left, record on the right | a framed window with the scene's main shadow | the reply forms, the record fills |
| Foreground | exactly two cards that cross the window's edge | the enquiry over the left edge, the task over the right edge, each with the longest shadow | the enquiry **arrives** from in front and to the left; the task **comes forward** out of the window; on scroll both travel further than the window |

The foreground is two cards with a role in the story (what comes in, what a person does next), not a
collection of travelling text panels. Without JavaScript and with reduced motion the finished picture
stands still and complete. "Play again" restarts the sequence.

Checked on the deployment (headless Edge, 1440 × 900, `/es`):

| Case | Result |
|---|---|
| Reduced motion | all eight sequence parts visible 1.2 s after load, no typing dots, no replay control, no layer moves on scroll (`--depth` 0, no transform) |
| Without JavaScript | the finished picture; nothing is hidden (`nuova-hero-d1440-es-nojs.png`) |
| Keyboard | skip link → logo → menu → languages → log in → header button → hero main button → second button → "Play again" → next section. Nothing inside the picture takes focus; it is one figure with a spoken label |
| Replay | 400 ms after a press the reply and the task are hidden again and the enquiry is arriving |
| Films | desktop 37 of 330 frames captured late, phone 0 of 330; the sequence runs at its real speed in both |

## 4. What was taken from the references, and what was not

Both reference pages were looked at as pictures (not as text) at 1440 and 390. **Both are dark pages**
(fora: a dusk landscape, glaido: black with one lime accent); the order asks for a light, warm page. Taken
over is the construction, not the colour:

- a short headline with a label pill over it, one sub-line, one main button and at most a second;
- the product picture directly beside the text (glaido) inside a thin frame (fora), on its own ground;
- large, light headline weight and tight tracking; one accent colour (ours: the brand gold);
- on a phone: one button, then the product.

Not taken over: customer quotes, figures, logo walls, prices, a billing switch.

## 5. 21st.dev components used so far

| Component | Author, licence | Link | What was adapted |
|---|---|---|---|
| Hero Section 1 | Meschac Irung (tailark), MIT | https://21st.dev/@meschacirung/components/hero-section-1 | the picture in a thin outer frame with the window inside; a live surface instead of a screenshot; no logo cloud; a CSS sequence instead of a motion library |
| Dot Pattern | Magic UI, MIT | https://21st.dev/@magicui/components/dot-pattern | typed props, ink-scale colour, a radial mask so it stays a hint |

21st.dev serves component source only with an API key; the source was read from the open upstream
repositories of the same components (tailark/blocks, Magic UI). No init run, no change to
`tailwind.config.ts`. `lucide-react` was added for icons.

## 6. Texts

All hero texts are Copy's (`COPY_HERO_1003`): headline unchanged, the sub-line, both buttons, the state
line under the buttons and the three labels. Two points for Copy:

- **Label 4** ("A task for your team" · "Una tarea para tu equipo") is not in Copy's delivery, which has
  three labels; it reuses the approved board wording. Copy may replace it.
- The former note "14 days free. No payment." is no longer under the buttons, because Copy's slot there is
  the state line. It is not lost: it returns on the Essential card.

## 7. What the owner is asked to decide

1. Is this the direction for the hero: depth, the four steps, the amount of text?
2. Spanish conversation on the English page: right, or should the English page show an English example
   with the label kept?
3. Anything to change before the same design is carried to the demonstrations, the package cards, the FAQ
   and the closing.
