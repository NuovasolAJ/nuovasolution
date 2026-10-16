# DESIGN.md — the rules every page is checked against (2026-10-16)

References (captured 2026-10-03, `evidence_2026-10-03/references/`): `fora-d1440-hero.png` (the dusk, the dark land,
the product surface rising), `fora-d1440-s1.png` (one sentence lighting up word by word on scroll), `glaido-d1440-s2.png`
(line grid instead of cards, large grey/white type), `glaido-d1440-s1.png` (one-sentence section, before/after).

## Surfaces and colour

- Two grounds: the dark evening scene (hero only, `#131416` → the dusk photograph) and ivory (`--surface-canvas`,
  `#fbfaf7`) everywhere else. The hero does not end in a band: the product panel hangs over the edge.
- One line colour (`--border-hairline`), one text grey (`--text-secondary`), one accent (`--champagne-400`) used only on
  the primary button of the dark ground and on the one important enquiry.
- No pastel fields per section (sand/sage/sky are retired on the home page), no channel colour as a surface (WhatsApp
  green only on a 12 px icon), no beige closing block.
- Contrast: display text on the hero ≥ 7:1 (both headline lines ivory); small text ≥ 4.5:1 everywhere (measured by
  `contrast-check.mjs`).

## Type

- Display: `t-display-xl` (hero), `t-display-l` (moment titles), `t-display-m` (sub-moments). Body: `t-body-l` (leads),
  `t-body-m`. Captions: `t-caption`. Nothing else. Line length ≤ 65 characters.
- One sentence per moment title; one lead sentence under it; no paragraphs longer than two sentences on the home page.

## Layout

- Containers: `container-default` (1200), the hero stage 1040. From 1600 px the hero scene (photo, ridges) fills the
  width; type and panel do not grow past the stage.
- Two radii: surfaces 20 px, elements 10 px. No card inside a card. Line grids (hairlines) instead of card rows.
- Values never break: tables and records with figures are ≥ 300 px wide or stack label over value; digits tabular,
  `white-space: nowrap` on amounts.
- Phone 390: no element wider than the viewport; the product panel within two screens of the top.

## Motion

- Allowed: scroll-bound scenes (the hero's four layers and the panel's tilt; the loss sentence and its clock), driven by
  `--depth` from `components/ui/depth-scene.tsx` and CSS `calc()`, never by time. The hero's own typing sequence runs
  once on entry and again only on "Reproducir otra vez".
- Not allowed on the home page: fade-in per section (`Reveal`), lists that pop one after another, loops, pastel
  changes, anything that moves because it can.
- Reduced motion and no JavaScript: every scene stands in its end state (the `--depth` fallback is 1).

## Words

- No internal names (Jarvis). No file names, run ids, "stub", "REF-DEMO" in pictures or texts.
- Product truth stands on `/hoy` only. The home page carries one demonstration line and the link.
- Property references ("EST-204") at most twice per page.
- Languages and channels only as Copy's TEXTS_1013 lines allow.
