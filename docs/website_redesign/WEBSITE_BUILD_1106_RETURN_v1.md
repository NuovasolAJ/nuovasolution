# WEBSITE BUILD 1106 — return on the owner's round of 06.11.2026 on build 2dfa67d (FARBE, COMING-SOON, FRAGE A–D, points 1–15, VORSCHAU-SCHUTZ, WANDBILDER-RAUMTYP)

**Written for:** the owner (the design verdict, the palette and the headline face), Audit (consolidation), the Reviewer (RV6 on the
named build), Copy (§7), 3D (§5), Social (§8).
**Status:** implemented and awaiting the owner's view and the independent technical and final audit. Nothing here is a design
acceptance; nothing is released for publication; the live site is untouched.

```
WEBSITE_BUILD_1106          = a5f1d21  dpl_Bi9Eac2LESXauYrPnkMhmoFD98ke   (presentation build, stub)
  fixed URL                 = https://nuovasolution-design-preview-c0ktpvgrs-nuovasolajs-projects.vercel.app/es   EN: /en   example report: /es/example-report   packages: /es/packages
  the two views             = …/es?view=target (the preview: the full target state, Copy's notice §14)   ·   …/es?view=public (what a launch build of today's lib/claims.ts shows)
  the palettes              = …/es?palette=a (bronze, the default) · ?palette=b (bottle green) · ?palette=c (near-monochrome)   ·   the headline face: ?display=fraunces (default Inter)
  the switches persist      = one visit with the parameter sets a cookie (nuova-view / nuova-palette / nuova-display); the next pages keep it until the parameter changes it; the bar at the bottom left of the preview switches too
WEBSITE_BUILD_1106_STAGING  = a5f1d21  dpl_FPkwqTZM1dbdCvndX5rtpDdPu1bx   https://nuovasolution-staging-preview-4uhy6n405-nuovasolajs-projects.vercel.app   (staging mode, not part of the design view)
code                        = a5f1d21 on website_enterprise_redesign (one commit for the whole round, on 8bfc859/b969260)
the text source             = docs/website_redesign/WEBSITE_COPY_HANDOVER_1105_v3.md §14–§23 (Copy e072d18 + c257602; §23 = V-1…V-59) — the only text source
the 3D media                = C:\src\nuova-3d, deliverables/website-assets/handoff_2026-11-06 (NACHTRAG_WANDBILD_1106_v1.md: hero_A, modelo_planta_baja_loop, entrega_clip with the Van Gogh wall painting; every checksum verified with sha256sum -c)
the owner's pictures        = docs/website_redesign/owner_review_1106/ (O01–O09, A_*)
evidence                    = docs/website_redesign/evidence_2026-11-06_build/ (desktop/, phone/, public/, palettes/, recordings/, checks/; measured on a5f1d21)
the protection              = owner's code: C:\Users\Usuario\.nuova-secrets\website_preview_access_code.txt (the same for both projects) · automation bypass: stg_website_preview_bypass.txt (design) and stg_website_staging_bypass.txt (staging) — header x-vercel-protection-bypass; no value in the repository, in this file or in any log
```

---

## 0. The protection (VORSCHAU-SCHUTZ = JA) — how the owner opens it, how the Reviewer measures it

Built as the site's own `middleware.ts` (not Vercel's Password Protection, which is a paid feature on this plan; the Reviewer's
list REVIEWER_TO_REDESIGN_1106_VORSCHAU_SCHUTZ_v1 §2 was the specification, §5 names the middleware case):

| | How |
|---|---|
| **The owner on the phone** | open the fixed URL → a plain gate page (NuovaSolution mark, one field, ES/EN by the path) → type the code from `website_preview_access_code.txt` once → the real page. The cookie lasts 30 days and survives reload, a new tab and the switch between the views. The code can also be given in the link (`?acceso=…`); the server strips it from the address with a 303 before the page shows. |
| **The Reviewer's suites** | the header `x-vercel-protection-bypass: <secret>` on every request (the three suites, Lighthouse `--extra-headers`, the CDP runs all send it); `x-vercel-set-bypass-cookie: true` sets the cookie for the subresources; the secret also works once as `?x-vercel-protection-bypass=` and is stripped from the address. Vercel's own naming is used so existing probes work unchanged. |
| **What is covered** | every path except Next's hashed static files: the HTML routes, `/api/build`, the media under `/media/`, the icons, the fonts, the sitemap, robots. Without the code or the header: **401** — the gate HTML for a page request, a plain 401 for everything else (`checks/protection-probe.txt`). |
| **First response** | with the cookie or the header the first response is the real page: no interstitial, no redirect, no banner that shifts the layout (Copy's preview notice §14 is part of the page itself, as before). |
| **noindex** | stays on top: `X-Robots-Tag: noindex, nofollow` on every preview response and on the gate page, and the `<meta name="robots">` in both. |
| **Both views** | reachable behind the gate by `?view=target` / `?view=public` (cookie), named above; the bar at the bottom left of the preview switches between them, the palettes and the headline face. A live build (`NUOVA_LIVE_RELEASE`) ignores every switch and renders the public view only. |
| **Both projects** | the design preview and the staging twin, each with its own bypass file; the owner's code is the same on both. The environment holds `PREVIEW_ACCESS_CODE` and `PREVIEW_BYPASS_SECRET` (encrypted, preview target) set through the Vercel API; no secret in the repository. |
| **Cookie** | the stored value is a SHA-256 of the secret, not the secret; `HttpOnly`, `Secure`, `SameSite=Lax`. |

The 401 and the gate page are measured in the build check (`A-21-protection`) and in `checks/protection-probe.txt`.

---

## 1. The owner's lines and points 1–15 — implemented how · evidence · honest grade

| # | Point | Implemented how | Evidence | Grade |
|---|---|---|---|---|
| FARBE | **away from blue; three palettes A/B/C on the same tokens, a switch in the preview only, contrast at least as today; the owner picks** | `app/globals.css`: the one accent `--brand` with `--brand-ink`, `--brand-wash`, `--brand-line`, `--brand-soft`, switched by `data-palette` on the page: **A** bronze-champagne `#7a5520` on black/white (the default), **B** bottle green `#1e4d3a`, **C** near-monochrome `#141416` (the accent only on active states: the rail's active segment, the entry button, the included check, the flow's fill). Every accent reads on white at ≥ 6.6 : 1 (today's blue 6.64). The switch is `?palette=a|b|c` (cookie) and the preview bar; a live build is palette A. Blue is gone from every surface (the WhatsApp chat's own green and the plan drawing excepted). | `palettes/a-01…05`, `b-01…05`, `c-01…05` (hero, flow, scenes, report, plans+entry per palette); `checks/build-check-1106.json` → `FARBE-palettes`, `13-no-blue-no-glow`; `checks/contrast-results.json` | 9 |
| SOON | **no "Próximamente / Coming soon" anywhere; preview = target state without status words + notice; public strictly from lib/claims.ts (not included ⇒ not shown at all); one switch; both as pictures** | `lib/claims.ts` holds the keys (Copy §15: `replyWhatsapp`, `replyEmail`, `replyOutOfHours`, `webform`, `phoneAssistant`, `alert`, `adsLeads`, `matching`, `followup`, `social`, `reportTrend`, `model3d`, `trial`, `plans`, `mailboxConnection`, `outlook`, …) and `live(key, view)`: in the **target** view every key is on; in the **public** view only what is included today. Every surface asks it: the demonstration's channels, the eleven scenes (seven in public), the report's trend/channels/insights, the 3D section, the plans table (public: the block "Qué incluye" instead), the entry (trial vs "Pedir acceso"), the FAQ items, the trust lines, the close, the header's nav word, the platform rows, the module pages, /trial (redirects to /contact in public). Nothing is hidden by `display:none` — it is not rendered. The status words Incluido/Próximamente appear on no page in either view (the check counts 0); the plans' cells carry ✓ / — with the words only for screen readers. Copy's notice §14 stands on every preview route. | `desktop/*` (target), `public/01…11` (public view: hero with "Pedir acceso", two channels, seven scenes, report without trend, no 3D, "Qué incluye", entry by invitation, FAQ six, example report, packages, phone); `checks/build-check-1106.json` → `SOON-public-view`, `SOON-public-example-report`, `claims-target`, `14-entry-target` | 9 |
| A | **the reply line: my recommendation without a contact promise** | Copy §16's line is built in: "¡Hola, Laura! Gracias por escribirnos. Buscas en Estepona, 2 dormitorios y hasta 320.000 €, ¿verdad? ¿Te viene mejor por la mañana o por la tarde para una visita?" — no "Apunto", no "te escribe hoy", no availability promise; the e-mail reply of §22 the same way. | `desktop/06-demo-end-rotation-bar.png`, `07-demo-rotated-to-email.png`; `checks/…` → `A-B-reply-chips` | 9 |
| B | **Copy's chip stays** | chip 1 "Responde en español, también fuera de horario" stays; chip 3 "Marca la prioridad y avisa a tu equipo" (target) / "…y su motivo" (public), §16. | `desktop/04-hero-chips-wall-art.png`; `checks/…` → `A-B-reply-chips` | 9 |
| C | **"Por canal" with example figures for all channels, from Copy, the same total on home and /example-report; public only the running channels** | Copy §19: WhatsApp 10 · Email 6 · Formulario web 3 · Teléfono 2 · Portales y anuncios 4 = 25 on the home report (bars) and on /example-report (the donut's five sectors, centre 25), the top-channel insight "WhatsApp · 10 de 25"; the funnel's rates on the 25 received (92 · 24 · 16) with Copy's note; the thirteen hours of §19 with the office-hours line; Sofía's open case on the web form. Public view: the figures 25 · 23 · 6 · 2 and the funnel; no channel block, no insights, no hours (reportTrend off). | `desktop/24-report-channels-all.png`, `40-example-report-donut-funnel.png`, `public/05-public-report-two-channels.png`, `09-public-example-report.png`; `checks/…` → `C-channels-target`, `15-example-report-compare`, `SOON-public-example-report` | 9 |
| D | **hero as a calm video with the new wall picture from 3D; still picture until delivery** | the hero is the 3D lane's **hero_A of 06.11.** (3840 × 2160, the Van Gogh wall painting; `9cb1bae4…` verified) as WebP in three widths + the 960 poster, the slow drift kept, the credit "Cuadro: Vincent van Gogh, Cypresses (1889), The Metropolitan Museum of Art, dominio público" as the mark's title. The video slot is prepared in `hero-image.tsx` (poster = this picture, MP4 first, WebM second, muted/loop/playsInline, poster with reduced motion, no autoplay before it can play); it takes the lane's file under `public/media/3d/hero-a.mp4/.webm` when it arrives with its checksum (Sat 07.11.). Until then the picture. | `desktop/04-hero-chips-wall-art.png`; `checks/…` → `3-wall-art` | 8 (video pending) |
| 1 | **tab icon: the NuovaSolution mark, SVG + PNG sharp at 16/32/180, light and dark tabs, old files gone, new cache name, proof picture** | the mark traced from the official `nuova-icon.png` (potrace, one path, `components/ui/mark.tsx` = the same vector in the flow and the gate); `app/icon0.svg` (adaptive: black mark on a light tab, white on a dark tab by `prefers-color-scheme`), `app/icon1.png` 512 px tile, `app/apple-icon.png` 180 px; Next serves them with a content hash (`/icon0.svg?<hash>`), so every browser fetches the new icon; `app/icon.svg`, `app/icon.png`, `public/favicon-v2.*` deleted (404 measured). Proof sheet at 16 / 32 / 180 on light and dark. | `01-tab-icon-proof-16-32-180.png`; `checks/…` → `1-tab-icon` | 9 |
| 2 | **logo moment bigger, 2–3 s, then travels into the header logo on scroll while the hero text appears; header logo hidden meanwhile; text also without scrolling; reduced motion = still** | `components/home/brand-moment.tsx`: the logo alone over the picture at ≥ 380 px wide (1366), held 2.5 s, then it travels (WAAPI, translate + scale measured against the header's logo box) and lands in the header; the header's own logo is hidden until it lands; the words rise as it leaves; a scroll after the first breath (700 ms) starts the travel at once and the words' delay drops to 0. With reduced motion: no moment, the header's logo stays, the words stand. Without JavaScript the same. | `desktop/01-brand-moment-hold.png` (1.4 s), `02-brand-moment-travel.png` (2.9 s), `03-brand-moment-landed-words.png` (4.6 s); recordings 0:00–0:06; `checks/…` → `2-brand-moment`, `2-brand-moment-scroll`, `reduced-motion`, `no-js` | 9 |
| 3 | **wall art: the abstract picture gone, only 3D's delivery** (+ WANDBILDER-RAUMTYP = OK: every medium) | the hero (hero_A 06.11.), 02 Modelo (`house-ground-loop.mp4/.webm` + poster = `modelo_planta_baja_loop` 06.11., `239d2e44…` / `3e1a2c39…`) and 04 Entrega (`house-delivery.mp4/.webm` + poster = `entrega_clip` 06.11., `2f1e2a70…` / `4c0d7e6b…`) carry the Van Gogh painting; the swap only from the lane's handoff by checksum (`checks/media-sha256.txt`). The unused old media (`living-camera-ride.mp4`, `living-ride-poster.webp`, `house-ground-near-1600.webp`, `house-ground-near-empty-1600.webp`) are removed from the repository. **Still old:** the pair `living-empty-1200.webp` / `living-furnished-1200.webp` (step 03 "Vacío y amueblado") — the lane re-renders it after the hero video (the owner's line); it is swapped by checksum when it arrives. The web model (the lane's run of 06.11.) is not embedded on the site (the 3D section shows the lane's clips and stills only), so no viewer medium carries the old picture. | `desktop/04`, `26-3d-02-model-ready.png`, `28-3d-04-delivery-playing.png`, `27-3d-03-pair.png` (the old pair, marked); `checks/media-sha256.txt`; MEDIA_SOURCES_1010.md §2e | 8 (the pair pending) |
| 4 | **channel tabs visibly clickable, bigger, hover, invitation from Copy, auto-switch with a bar stopping on the first click, keyboard + phone** | `components/home/hero-demo.tsx`: Copy's invitation "Elige un canal y mira cómo responde." above four tabs (target; two in public) each ≥ 48 px with an icon, a hairline ring and the accent ring + lift on hover; after the first run the tabs rotate by themselves (a progress bar on the active tab runs over the pause, `--run`); the first click or touch stops the rotation for good; the arrow keys move the channel (`role=tablist`); on the phone ≥ 44 px and switchable by touch. With reduced motion no rotation. | `desktop/05…09`, `phone/02-demo-tabs.png`; recordings 0:06–0:30; `checks/…` → `4-channel-tabs`, `phone` | 9 |
| 5 | **typing dots ~2–2.5 s, no jump; phone tab without status pill/line** | the typing indicator stands 2.3 s before the reply (the reply bubble is reserved, so nothing jumps); no mark, no pill, no state line on any channel (the phone's "Asistente telefónico" shows the assistant's words of §22 only). | `desktop/05-demo-typing.png`, `09-demo-phone-no-mark.png`; `checks/…` → `5-typing-no-status` | 9 |
| 6 | **Cómo funciona: no thin lines/arrows; connected modern fields filling on scroll with the accent; NuovaSolution centred; four stations on one line; step 4 from Copy** | `components/home/flow-ribbon.tsx`: four fields on one 4 px track that fills in the accent as the section scrolls (scaleX on the wide window, scaleY on the phone) and lights every field as the fill reaches it; the NuovaSolution mark as a vector centred in its field (< 1 px off); titles and icons on one line (< 1 px spread, the 4 px fault gone); Copy §17's four lines, step 4 "Tu equipo llega preparado …". With reduced motion the track stands filled. | `desktop/10-flow-before.png`, `11-flow-filled.png`, `phone/03-flow-track.png`; `checks/…` → `6-flow-fields` | 9 |
| 7 | **scenes pinned, each its own scroll section (70–100 vh), no waiting, no jump on fast scroll, click jump stays; ≥ ~1 s per scene at normal speed** | `components/home/functions.tsx`: the stage is `position: sticky` under the header; the eleven scenes are eleven segments of 85 vh of the page; the scene follows the scroll position only (no timer, nothing blocks); a fast scroll skips nothing and jumps nowhere (the surfaces crossfade); a click on the rail or a scene name jumps instantly to that segment; a click on the stage advances. Measured at 640 px/s: every scene ≥ 1 s in view and in order (`checks/build-check-1106.json` → `7-scenes-pinned` carries the timeline). On the phone the scenes stand in a linear stack by chapter (no pin). | `desktop/12…19`, `phone/04-scenes-chapter.png`; recordings 0:36–1:05; `checks/…` → `7-scenes-pinned`, `7-priority-target`, `7-daily` | 9 |
| 8 | **chapters Atiende / Organiza / Crece (Crece = matching, follow-up, origin, Instagram, report), text from Copy** | Copy §18: Atiende (01 respuesta, 02 idioma) · Organiza (03 ficha, 04 prioridad+aviso, 05 buzón, 06 equipo) · Crece (07 origen, 08 inmuebles que encajan, 09 seguimiento, 10 Instagram, 11 informe); the chapter line of §18 beside the stage, Crece's line composed per view; the report scene with 25 · 23 · 6 and the link to the example report. Public: seven scenes (Atiende 2 · Organiza 3 · Crece 2). | `desktop/16-scenes-07-crece-origin.png`, `19-scenes-11-report.png`; `checks/…` → `8-9-chapters-rail`, `8-report-scene` | 9 |
| 9 | **numbers 01–10 → a connected progress bar** | one connected rail of eleven segments grouped by chapter (no single circles), the active segment in the accent, the past ones dark, each segment a button; the counter "03 / 11" beside it. | `desktop/12-scenes-01-pinned.png`; `checks/…` → `8-9-chapters-rail` | 9 |
| 10 | **hard white bars → calm transitions** | the scene block, the report and the plans stand on soft grounds that feather in and out over 160 px (gradients from transparent); no hard edge between sections. | `desktop/20-grounds-flow-to-scenes.png`, `21-grounds-report-to-3d.png`; `checks/…` → `10-grounds` | 9 |
| 11 | **3D steps by scroll (01–04, no jump), video only when playable, click stays, 02 Modelo with the new 3D media** | `components/home/stage-3d.tsx`: the stage pinned, four segments of 70 vh, the step follows the scroll (no clock); 02 Modelo shows the lane's poster until the clip reports it can play, then the loop (`house-ground-loop.mp4`, 1920 px, 10 s); 04 Entrega loads on request, shows "Cargando" while it buffers and plays once ready; the step buttons still jump. With reduced motion the posters stand. Unpinned on the phone. | `desktop/25…28`, `48-reduced-motion-3d-still.png`, `phone/07-3d.png`; recordings ≈1:08–1:22; `checks/…` → `11-3d-by-scroll` | 9 |
| 12 | **"Tu camino" as a connected run; ES 1440 bug fixed** | three stations on one line with the words under each node (≥ 120 px wide, ≤ 2 lines), the button on one line; at ES 1440 the lead ≥ 500 px wide, no 90 px column, "Pregúntanos por el 3D" on one line (also measured at 1280). | `desktop/29-3d-path-run.png`, `30-3d-path-es-1440.png`, `31-3d-path-es-1280.png`; `checks/…` → `12-path-run`, `12-path-es-1440` | 9 |
| 13 | **no AI impression, luxury: fewer blue tiles, glows, uniform pills; a distinct headline font with a proper licence beside Inter, both shown** | no blue (FARBE), the icon tiles neutral (white, hairline ring), no glow behind the close (white on black), the hero's benefits as quiet lines without pill boxes, the status pills gone. The headline face: **Fraunces** (SIL Open Font License, via next/font, self-hosted, no request to Google) on the display sizes with `?display=fraunces`; Inter stays the default and the body face in both. Both pictured for the owner's choice. | `desktop/42-display-inter.png`, `43-display-fraunces.png`, `44-display-fraunces-scenes.png`; `checks/…` → `13-display-variant`, `13-no-blue-no-glow` | 9 |
| 14 | **entry: target state "Pruébalo gratis 14 días" + a simple 3-step way with Copy's text, "Sin método de pago…"; "Acceso por invitación…" only public while the trial is off; the switch in claims.ts only** | Copy §16/§20: in the target view the hero's second action "Pruébalo gratis 14 días" → /signup with "Sin método de pago y sin renovación automática.", the block "14 días gratis, en 3 pasos" with its three steps and the two lines, the header's "Prueba", Essential's action the trial, the FAQ "¿Cómo empiezo?" with the trial; in the public view "Pedir acceso" + "Acceso por invitación." everywhere, "Cómo empezar" in two steps, the header's "Acceso". The one switch is the key `trial` (with `publicSignup`) in `lib/claims.ts`. | `desktop/32-entry-three-steps.png`, `33-faq-how-to-start.png`, `public/07-public-entry-invitation.png`; `checks/…` → `14-entry-target`, `SOON-public-view` | 9 |
| 15 | **report: "Sin / Con NuovaSolution" over the same example week on home and /example-report, figures/texts from Copy, example-marked, no money promise, calm animation, phone, reduced motion simple** | `components/report/compare-block.tsx` + `compare-toggle.tsx` on Copy §19: a segmented switch (two real buttons, `aria-pressed`, "Con" first), the lead with the example agency's hours, seven rows with both figures in sight and the chosen side lifted (25/25 · 9/9 · 2/2 · 9/0 · 5/0 · 25/2 · "lo que alguien anote"/25), the close of the state crossfading, the assumption line, the mark "Ejemplo con datos ficticios · la misma semana"; no €, no %, no revenue word; the same block on /example-report. On the phone full-width, ≥ 44 px, a header row for the two columns; with reduced motion the figures simply change. | `desktop/22-report-with.png`, `23-report-without.png`, `38-example-report-with.png`, `39-example-report-without.png`, `phone/06-report-switch.png`; `checks/…` → `15-report-compare`, `15-example-report-compare`, `reduced-motion`, `phone` | 9 |

The grades are the implementer's own against the order's wording; the design verdict is the owner's. What keeps a point from a
10: the hero video and the step-03 pair are the lane's (D, 3); the palette and the headline face are the owner's choice, both
built but neither chosen (FARBE, 13); the eleven-scene stage is measured at one normal speed (640 px/s), a faster hand sees each
scene shorter (7).

### 1b. The owner's points of 06.11. 19:00 and the addition

| Line | Done |
|---|---|
| 1 only text source §14–§23 (V-1…V-59) | every line on the page is from §14–§23; the old→new list §23 applied (the route scan reads every route for the old wording) |
| 2 the false alert statement `faq.ts:125/:133/:141` → key `alert` | the FAQ item "¿Avisa a mi equipo?" hangs on `alert`: in the target view it answers yes (§21), in the public view the item is not rendered; the public "¿Cómo empiezo?" answers by invitation |
| 3 finish the round on 2dfa67d, pictures in owner_review_1106/ | this build; the owner's pictures committed with this return |
| 4 tell API whether the website uses key a8e25047 | `REDESIGN_TO_API_1106_SCHLUESSEL_v1.md` (in a5f1d21): **no** — no occurrence in code or environment, both preview projects without any secret key, `env.ts` refuses secret keys; API can revoke without touching the website |
| 5 the Meta small fix, separately, preview only | §8 below |
| 6 name the build, the fixed URL, both deployment ids | the block at the top |
| WANDBILDER-RAUMTYP = OK | point 3 above and §5: every medium on the site listed with its state |

---

## 2. Measured on the named deployment

| Check | Result | File |
|---|---|---|
| Build check of the round (`scripts/design/build-check-1106.mjs`, 33 checks: the points 1–15, FARBE, SOON (both views), A–D, A-21, EN, reduced motion, no JavaScript, the phone) | **33/33 on a5f1d21** (the deployed run of 07.11. 00:31–00:34; locally 32/33 before, the one miss being the EN probe's own stale selector, corrected in the suite before the deployed run) | `checks/build-check-1106.json`, `.log` |
| Contrast (`scripts/design/contrast-check.mjs`, both widths, every route) | **0 comparisons below the floor** over 44 measurements (22 routes × 1440 and 390; the worst text on the page 4.57 : 1 on its own ground, the floor 4.5) | `checks/contrast/contrast-results.json`, `checks/contrast-check.log` |
| Routes (`scripts/e2e/route-scan.mjs`) | **55/55** | `checks/route-scan.json`, `.log` |
| Protection probe (bare vs header, both projects) | design: bare `/es`, `/api/build`, the hero WebP and the icon all **401**; with the header `/es` **200 with 0 redirects**, the hero's words in the first response; `X-Robots-Tag: noindex, nofollow` on the gate and on the page, the gate's `<meta name="robots">` too, 0 page words in the gate. Staging: bare `/api/build` **401**, with its own header **200** (re-measured 09:30 once its build was Ready; during the run it was still building and answered Vercel's building page) | `checks/protection-probe.txt` |
| Lighthouse mobile, /es (simulated throttling, Edge, three runs, alone on the machine, the bypass as `--extra-headers`) | performance **83 · 86 · 75** (LCP 4.3 / 4.1 / 4.3 s under the simulated 4G throttle = the hero picture, as on 2dfa67d; TBT 160 / 80 / 400 ms; CLS 0; FCP 1.1–1.2 s); accessibility **100** in every run; best practices 92 in every run, the one failing audit being Vercel's preview-toolbar script blocked by the site's CSP (preview only) | `checks/lighthouse-mobile-run{1,2,3}.json`, `lighthouse-summary.json` |
| Lighthouse desktop, /es | performance **99** (LCP 0.9 s, TBT 0 ms, CLS 0, FCP 0.3 s); accessibility **97**: one audit, `target-size` — the rail's chapter names and the 4 px segments are buttons under 24 px tall (**fixed in the working tree after the build**: 24 px hit areas with the 4 px bar painted on the content box; goes into the next named build, §9); best practices 92 (the toolbar audit) | `checks/lighthouse-desktop.json` |
| Lighthouse mobile, /es/example-report | performance **98** (TBT 140 ms, LCP 0.9 s); accessibility **97**: one audit, `listitem` — the funnel's `<ol>` carried `role="img"`, so its items had no list parent (**fixed in the working tree after the build**: the picture role on a wrapper; §9); best practices 92 | `checks/lighthouse-mobile-example-report.json` |
| Scene stay at a normal scroll (640 px/s, 1366 × 768) | all eleven in order, each ≥ 1.03 s: reply 1 320 · language 1 089 · record 1 046 · priority 1 114 · inbox 1 033 · team 1 116 · origin 1 087 · matching 1 050 · followup 1 101 · social 1 046 · report 1 599 ms; the rail's past segments in the accent (`rgb(122, 85, 32)`), the click on the rail lands within 0.5 s | `checks/build-check-1106.json` → `7-scenes-pinned` |
| Words (visible Spanish, the home page, target view) | 1 426 words in all; 761 of prose (headlines, the eleven scenes' lines, the entry, trust, the FAQ questions, the close), 665 inside the product surfaces (the demonstration, the stage, the report sheet with the Sin/Con block); nothing under 13 px, nothing under 14 px in the demonstration | `checks/build-check-1106.json` → `fonts-words` |
| Recordings (real time, nothing sped up; normal and reduced motion, 1366 × 768 and 390) | desktop 1366 × 768 normal 84.7 s / 1 288 frames / 9.2 MB · reduced motion 85.2 s / 4.3 MB · phone 390 normal 87.2 s / 1 298 frames / 7.9 MB · reduced motion 87.1 s / 6.0 MB (the brand moment, the tabs rotating then a real click, the flow filling, the eleven scenes at a normal scroll, "Tomar", the switch Sin/Con both ways, the 3D stage by scroll, the path, the plans, the entry, the close) | `recordings/` |
| Build identity | `/api/build` → commit a5f1d21abadd0c8d33961080fe0ca9f84baa3bb0, deployment dpl_Bi9Eac2LESXauYrPnkMhmoFD98ke, env preview, mode stub; staging → the same commit, dpl_FPkwqTZM1dbdCvndX5rtpDdPu1bx, mode staging | `checks/api-build.json`, `api-build-staging.json` |

Nothing under 13 px on the page, nothing under 14 px in the demonstration (measured in the build check).

The five Lighthouse reports store the run's extra headers in their `configSettings`; the bypass value in them was replaced by
`<redacted>` before the files were committed (the scan of every evidence text file for both bypass values: 0 hits).

---

## 3. The two views, side by side (what differs; everything else is the same page)

| Surface | target (the preview) | public (today's claims.ts) |
|---|---|---|
| hero | chip 3 "…y avisa a tu equipo"; second action "Pruébalo gratis 14 días" + "Sin método de pago…" | chip 3 "…y su motivo"; "Pedir acceso" + "Acceso por invitación." |
| demonstration | four channels with rotation | WhatsApp and Email, no tabs' rotation beyond the two |
| Cómo funciona | the first line names the channels of the target state | the first line names the two channels |
| scenes | eleven in three chapters, the alert row, the ad origins, the voice bar | seven (Atiende 2 · Organiza 3 · Crece 2), none of the three |
| report | trend, five channels, insights, figures, Sin/Con | figures and Sin/Con only (its close "Y cada semana ves qué sigue abierto.") |
| 3D | the section | not rendered |
| plans | the table (18 rows, ✓/—), Essential → trial | "Qué incluye" with the six included rows and "Pedir acceso" |
| entry / trust / FAQ / close | "14 días gratis, en 3 pasos", N-1, seven questions, "con tus canales" | "Cómo empezar" in two steps, "Pides acceso y te enseñamos el sistema.", six questions, without "con tus canales" |
| header nav | "Prueba" | "Acceso" |
| /example-report, /packages, /platform, /trial | the full state | the public state; /trial → /contact |
| notice | Copy §14 on every route | the same notice (the public view is still the preview) |

---

## 4. The media of this round (3D lane, handoff_2026-11-06; MEDIA_SOURCES_1010.md §2e)

| File (public/media/3d/) | From | Shows | sha256 (first 16) of the source → of the file |
|---|---|---|---|
| `hero-a-2560.webp`, `-1920`, `-1280`, `hero-a-poster-960.webp` | `hero/hero_A.png` (3840 × 2160) | the hero, the Van Gogh wall painting | `9cb1bae44abcf248` → `63aa99e0553a5f85`, `5ede56b63ba50b13`, `e235df050442777d`, `2461f83c46b208c0` |
| `house-ground-loop.mp4` (identical bytes), `.webm` (identical), `house-ground-loop-poster-1600.webp` | `modelo/modelo_planta_baja_loop.*` | 02 Modelo | `239d2e44d41dab78`, `3e1a2c3967bdf495`, poster from `93d7b7fbb0d7c66f` → `5bd3ae7bc6ac1fd7` |
| `house-delivery.mp4` (identical), `.webm` (identical), `house-delivery-poster-1600.webp` | `entrega/entrega_clip.*` | 04 Entrega | `2f1e2a70de1fbd77`, `4c0d7e6bc88c3134`, poster from `b183f902a5b8b3f2` → `91dfc8cd6127f593` |
| `living-empty-1200.webp`, `living-furnished-1200.webp` | handoff_2026-10-30 (old wall art) | 03 Vacío y amueblado | `3d1dff9e6d100a39`, `79ed558318779dd0` — **to be replaced** by the lane's re-render |
| removed | `living-camera-ride.mp4`, `living-ride-poster.webp`, `house-ground-near-1600.webp`, `house-ground-near-empty-1600.webp` | used by no page | — |

The icons: `app/icon0.svg` `c19e5aabbcc04400`, `app/icon1.png` `247beb02544e7d1a`, `app/apple-icon.png` `36ef0b7bab033fa8` (traced from the
official `nuova-icon.png`). The art credit on the page as the lane recommends (CC0; not a licence condition).

---

## 5. What I need from 3D

| # | What | For |
|---|---|---|
| 1 | the hero video (Sat 07.11.): MP4 (H.264, faststart, fixed fps, ≤ ~12 MB) + WebM + its poster, 1920 × 1080 or the hero's 2560 width, a calm slow move, loopable, with the checksums in a handoff folder | FRAGE D: the slot in `hero-image.tsx` takes it under `hero-a.mp4/.webm`; one commit, no other change |
| 2 | the re-rendered pair `living_empty` / `living_furnished` (the same framing as 30.10., the Van Gogh painting), with checksums | point 3 / WANDBILDER: the last medium with the old picture |
| 3 | nothing else: hero_A, the loop and the delivery clip of 06.11. are built in by checksum | — |

## 6. What I need from the Reviewer (RV6)

RV6 on exactly this build: a5f1d21, the fixed URL, dpl_Bi9Eac2LESXauYrPnkMhmoFD98ke and dpl_FPkwqTZM1dbdCvndX5rtpDdPu1bx. The
bypass files are named at the top (one per project); the owner's code is not needed for the suites. The two views by `?view=`;
the cookie persists, so a probe that measures the public view sets `?view=public` on its first navigation and `?view=target`
when it returns (the same for `?palette=a` and `?display=inter`). A-22 (the wall art per medium): §4 lists every medium with its
checksum and state; the pair of step 03 is the named exception until the lane delivers. A-23: the alert sentence stands only in
the target view (the FAQ item on `alert`).

## 7. What I need from Copy

Nothing blocks. Two notes: (a) the EN of the Sin/Con block, the entry block and the chapter lines follow §14–§23's EN where given
and my own EN where §23 gives only ES (the strings sit in `lib/content/home-1103.ts`, marked `en:`) — a read of the EN page is
welcome; (b) if the owner picks Fraunces for the headlines, no text changes.

## 8. The Meta small fix of the live site (point 5 of 19:00) — prepared, not published

| | State |
|---|---|
| where | the E-FU2 worktree `C:\Users\Usuario\Desktop\nuova-oldsite-efu2` (branch `efu2-prueba-objeto`, e03b5fb); **working tree only, not committed**: `app/aviso-legal`, `app/legal-notice`, `app/politica-privacidad`, `app/privacy-policy` |
| what | the owner's name with its accents, the full address with number and postcode (ES/EN), Copy's brand sentence on the two legal notices (§22). **Not added:** the phone (OPEN in the owner's file), the NIF (after the Alta). The values are read from `.nuova-secrets\owner_firmendaten_1106.txt` by a script; they stand nowhere else |
| preview | project `nuovasolution` (the live project), preview deployment `dpl_EJYD91Gb3FWNFPXuUq7JC1eRMFo5` = `https://nuovasolution-kbmgp2pr1-nuovasolajs-projects.vercel.app` (Preview, Ready, built from the working tree with the CLI; no production deployment, the domain untouched). **Limit:** the live project's deployment protection is Vercel Authentication, so the preview answers 302 to Vercel's sign-in for anyone without a Vercel session on the team; Social's character-by-character comparison needs a signed-in browser or a bypass secret of that project (not set by me — "Bestehenden Schutz anderer Deployments nicht abschalten") |
| publish | only with the owner's line `WEBSITE-KLEINFIX = JA` → production deployment of the same project from this worktree (E-FU2 page included, unchanged), then the one-line promote back is `dpl_4xQt97aFfKzNBpsmXzKxNwZeHTCq` |

---

## 9. Not in this build / limits

- **Two findings of the deployed Lighthouse run, fixed in the working tree after a5f1d21 (not in the named build):** (a) the rail's
  chapter names and segments as buttons under 24 px (`app/globals.css`: 24 px hit areas, the 4 px bar on the content box, the
  active one 8 px; the colours and the check's probes unchanged); (b) the example report's funnel `<ol role="img">` (the role moved
  to a wrapper, the list `aria-hidden`, the items keep a list parent). Both go into the next named build together with the lane's
  media (§5) and whatever RV6 finds; the Reviewer measures them there.

- The hero video (FRAGE D) and the step-03 pair: the lane's, §5.
- The platform menu (`platform-map`) is view-gated by rows; the onboarding step "Tus canales" (N-3) sits inside the login, not reachable on the stub.
- The staging twin runs the same code in staging mode; the suites of this return ran on the design preview; the staging identity and the protection probe are in `checks/api-build-staging.json` and `protection-probe.txt`.
- Lighthouse's best-practices audit on a preview still reports Vercel's preview-toolbar script blocked by the site's CSP (preview only).
- The old-site preview for the Meta fix is behind Vercel's SSO (§8).
- The push of a5f1d21 also carried Copy's two local commits c0fd191 and b969260 (the one-pager and the FR/IT/NL drafts) to origin, because they sat on the branch below mine; nothing of theirs was changed. The one-pager stays internal as Copy's note says.
