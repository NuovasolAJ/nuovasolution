# RV6 — the independent check of the named build `a5f1d21` · 07.11.2026

**From:** the Reviewer. **For:** the owner, Redesign, Copy, 3D, Audit.
**No application code was written or changed.** Secrets appear nowhere in this file.

```
checked          = WEBSITE_BUILD_1106  a5f1d21  dpl_Bi9Eac2LESXauYrPnkMhmoFD98ke
  /api/build says  commit a5f1d21abadd0c8d33961080fe0ca9f84baa3bb0 · ref website_enterprise_redesign
                   deployment dpl_Bi9Eac2LESXauYrPnkMhmoFD98ke · env preview · mode stub        → A-1 PASS
staging          = a5f1d21  dpl_FPkwqTZM1dbdCvndX5rtpDdPu1bx  (protection probe only)
measured against = REVIEWER_RV6_CHECKLIST_1105_v1.md (8bfc859) · Copy 1105 v3 §14–§23 (e072d18) · API 25a6382
views            = ?view=target (preview) and ?view=public, both crawled over 28 routes, ES and EN
evidence         = docs/website_redesign/review_2026-11-07/ (probes/, checks/, shots/)
```

## The verdict, plainly

| Grade | Result |
|---|---|
| **Technique and operation (topic 16)** | **NOT passed yet** — five findings, listed below. Three are text or route corrections of a few lines; one is the reveal mechanism (reduced motion and no JavaScript); one is a design decision for the owner (the tabs advancing by themselves). |
| **Design** | not mine. The owner's verdict stands outstanding, as ordered. |
| **Wall art (A-22)** | **open, not failed** — three of four media are the new ones (two byte-identical to 3D's handoff), the fourth pair is still the old picture and waits for 3D. State per medium below. |

Everything else measured **passes**: the protection, the hiding rule in both views, the figures and their sums, the
alert, contrast, the keyboard, the scenes at a human scroll speed, the Spanish path at 1440 and 1280, the tab icon,
and the demo's content.

---

## 1. The findings

| # | Where | What I measured | Against |
|---|---|---|---|
| **F-1** | `/es/platform/ai-sales-agent` and `/en/...`, **both views** | "Respuesta por email, **en un buzón que operamos para ti**." / "A reply by e-mail, **in a mailbox we operate for you**." | Copy §13 N-5 / V-28 strikes this sentence **in both views** because route B is stopped (D5-DIREKT). The target wording is "Respuesta por email, en el buzón de tu agencia."; with `replyEmail` off the row is hidden. This is the one sentence of the register that did not move. |
| **F-2** | `/es/signup` and `/en/signup`, **public view** | the full trial page renders: "Empieza gratis · Crea la cuenta de tu agencia · **14 días gratis. Sin pago.**" / "Start free · Create your agency account · **14 days free. No payment.**", with the form and the button "Crear cuenta". `/trial` correctly answers **307 → /contact** in public; `/signup` answers 200. It is **not linked** from the public home (the second action there is "Pedir acceso"), but it is reachable | Q-2 and C-2: `trial` and `publicSignup` are **soon** in `lib/claims.ts`, so the public view must not carry the trial promise anywhere. The page's own note "este formulario no crea una cuenta real…" is a developer's line, not Copy's |
| **F-3** | the channel tabs, both views | without any click the selection moves by itself while the demo is on screen: **whatsapp → email at 9.3 s → webform at 19.1 s**, and the tabs carry `title="Siguiente canal en unos segundos; un clic lo detiene"`. A click does stop it | A-10 "no tab switches by itself". It is clearly deliberate and it is honest about itself; the owner decides whether the auto-advance stays. If it stays, A-10 is withdrawn for this build |
| **F-4** | the reveal items, both views | **Reduced motion:** after scrolling each element into view with `prefers-reduced-motion: reduce`, 3 of 3 `rep-insight` (the report's three insights), 3 of 3 `ps-task` rows (the task list with its "Tomar" buttons) and the "Siguiente escena" button stay at **opacity 0**; 3 of 12 `mrise` blocks likewise. **Without JavaScript:** 49 elements keep their inline `opacity:0`, among them the demo's reply row, the record fields, the inbox rows and the listings; the visible word count falls to 149 | A-5 ("every finished state stands at once, the content is complete and the actions work") and A-6. The text **is** in the delivered HTML — the rendering hides it, not the HTML |
| **F-5** | `/es/platform/crm`, lead sentence, both views (ES only) | "**Tus canales conectados**, una ficha por consulta." | The false-promise test of §D-2 (b): a completed state about the agency's channels while `mailboxConnection` is **soon**. Small, and the English page words it differently |

## 2. What passes, with the measurement

| Check | Result |
|---|---|
| **A-21 protection** | **PASS, six for six.** Without the bypass: **401 on every path** — `/es`, `/en`, `/es/example-report`, `/es/packages`, `/api/build`, `/media/3d/*.mp4`, `/media/3d/*.webp`, `/icon0.svg`, `/robots.txt`, `/sitemap.xml` — on **both** projects; the gate HTML for a page request, a plain 401 for the rest. With the header: 200 and the real page as the first response. `X-Robots-Tag: noindex, nofollow` on the gate **and** the page, plus the `<meta>`. The owner's code in the link answers **303 → /es** and sets an `HttpOnly; Secure` cookie; a wrong code answers 401 with the gate. The secret is read from `.nuova-secrets` and appears in no file here |
| **P-1 no readiness word** | **PASS.** Over 28 routes × 2 views × ES/EN: **0** occurrences of "próximamente", "coming soon", "en preparación", "prototipo", "Hoy no", "pronto", "en breve" — in visible text, in `aria-label`/`title`/`alt`/`placeholder`, and in sr-only text. The three "todavía" hits are the retention answer Q-44, which §14 keeps |
| **P-2 / P-3 the notice** | **PASS.** Copy's §14 line stands word for word on **every** route of both views, ES and EN, directly under the header (72 px header, notice 37 px), with no date and no promise. (It reads "Vista previa, no pública ." in the extracted text only because the full stop sits outside the bold span.) |
| **P-5 the views differ** | **PASS** on all 28 routes. Home 2 854 → 1 648 words, `/packages` 912 → 347, `/faq` 1 162 → 820. Nothing is merely hidden: `/es/trial` answers 307 → `/contact` in public |
| **Q-1 the keys** | **PASS.** `lib/claims.ts` carries §15's new keys with the values asked: `replyWhatsapp`, `replyEmail`, `replyOutOfHours` **included**; `mailboxConnection`, `outlook`, `plans` **soon**. The floor (`replySpanish`, `crm`) is on, so the public view is a page to grade |
| **Q-2 / Q-4 the public view** | **PASS.** No plans table and no plan name; the block "Qué incluye" carries exactly the six included rows (`replyWhatsapp`, `languageNoted`, `labels`, `crm`, `priorityWithReason`, `reportInLogin`). The target view has the table with 18 rows, every cell a ✓ or a —. Target-state lines (trial, the connection sentence, the alert, HubSpot, plan names) are **absent** in public everywhere **except F-2** |
| **A-19 the figures and the sums** | **PASS**, against Copy's own sum list. Por canal 10 · 6 · 3 · 2 · 4 = **25**; answered 23 + 2 = 25; viewings 4 ≤ 6; the insight reads "WhatsApp · 10 de 25 consultas"; the rates are 92 · 24 · 16 on the 25 with Copy's note; the hours carry the peak 11:00–12:00 · 6 and the office-hours line; **"26 %" appears 0 times** (the mismatch of `2dfa67d` is fixed); "No medido" twice in **both** views; the base line of R-9 word for word; the switch carries "Ejemplo con datos ficticios · la misma semana" in sight of the figures, no €, no %, no revenue line, and the 6 viewings are the same in Sin and Con |
| **A-23 the alert** | **PASS.** `alert` is **soon**. The three sentences the owner named are gone from the source at `a5f1d21` (`faq.ts:125/:133/:141` — "Todavía sin horario de oficina", "hasta entonces…", "Hoy no…") and from both views. In the public view the words "avisa/aviso" appear **nowhere** on the home page and the three FAQ items are not rendered. In the target view only Copy's §20 sentence stands |
| **A-11 contrast** | **PASS.** 0 failures over **472** text elements in the target view and **316** in public, measured while each element was on screen and against the real paint stack. 81 (target) and 53 (public) items stand on a photograph or a scene and are listed for the eye rather than failed by arithmetic |
| **A-7 / A-8 / A-9 the tabs** | **PASS.** A trusted mouse click and a real touch event both switch the panel and `aria-selected`; two Tab presses from quiet ground reach the tablist, the focused tab carries `outline: 2px solid rgb(14,14,15)` and matches `:focus-visible`, and ArrowRight moves the selection to Email with the panel following. Roving `tabindex` 0/−1 is correct |
| **A-16 scrolling at a human rate** | **PASS.** At **800 px/s** all **11** scenes appear in order, none skipped, the shortest dwell **850 ms** (most 850–1 400 ms) |
| **A-18 the Spanish path** | **PASS** at **1440** and **1280** px: no clipped line, no element over the viewport edge, no orphan line, no document overflow |
| **A-3 / A-4 the viewports** | **PASS** at 390, 768 and 1024: no horizontal page scroll, one h1, no covered action. At 390 the hero image is 401 px wide inside a container with `overflow-x: clip`, so the page itself does not scroll sideways |
| **A-12 / D-12 the type** | smallest on the page: **12 px** (the three footer eyebrows "PLATAFORMA/EMPEZAR/EMPRESA") and **13 px** (language switch, the notice). The plans table: cells 16 px, nothing under **14 px**. Note for the owner: Copy's notice is among the smallest type on the page although it carries the whole preview's honesty |
| **A-17 the tab icon** | **PASS.** `icon0.svg` (adaptive), `icon1.png` 512, `apple-icon.png` 180, each served with a content hash; the old files `/icon.svg`, `/icon.png`, `/favicon-v2.*`, `/favicon.ico` all answer **404**; every route carries its own title |
| **A-14 the routes** | 28 internal routes, all 200 in both views with one h1, except `/es|en/trial` → **307 → /contact** in public (intended, §21) |
| **C01 the hero** | **PASS.** Picture A, no `<video>` in the hero; `hero-a-2560/1920/1280.webp` and the 960 poster are served at exactly their named sizes (2560×1440, 1920×1080, 1280×720, 960×540, verified from the files' own headers); the `srcset` offers all four with `sizes="100vw"`; the alt is set and the visible mark "Casa de ejemplo ficticia, visualización" stands in the picture |
| **D01 / C06 the demo** | **PASS.** No page text lies inside the header's band at scroll 0; **0** ticks and no "enviado/entregado"; **one** message from Laura with a time on both sides, the sender label "Asistente automático de la agencia" once, and the reply is §16's new one word for word; "Apunto/Anoto" and "segunda residencia" appear 0 times |
| **D06 "Tomar"** | **PASS.** `<button type="button" class="ps-take">Tomar<span class="ps-take-demo">Demo</span></button>` — a real button, honestly marked as a demo |
| **D11 the footer** | **PASS.** The Spanish footer carries Copy's §10.4 words only: Visión general · Asistente de consultas · Ficha y prioridad · CRM · Tareas diarias · Preguntas · Contacto, and "Pedir acceso" in the public view |
| **D04 the pictures** | **PASS.** Every visible image on the home page is loaded (`naturalWidth > 0`) and carries an alt |
| **D09 / D10 the clips** | 02 Modelo plays `house-ground-loop.mp4`, 10.0 s, 1920×1080, loop, **0 dropped of 182 frames**. 04 Entrega stands behind its poster with the control "Ver la casa entera"; **one click** starts `house-delivery.mp4`, 18.4 s, 1920 wide, **0 dropped of 179 frames**. The stutter of `faf2dbb` is not reproducible here; the feel on the owner's own machine stays the owner's |

## 3. A-22 — the wall art, the state per medium (as the owner ordered until 3D's handover)

Measured by fetching each medium **as served** and comparing its sha256 with 3D's `SHA256SUMS.txt` of
`handoff_2026-11-06`, plus a frame for the eye.

| Medium (as served) | bytes | State |
|---|---|---|
| `house-ground-loop.mp4` | 13 347 943 | **NEW — byte-identical** to `modelo/modelo_planta_baja_loop.mp4` |
| `house-ground-loop.webm` | 11 045 650 | **NEW — byte-identical** to `modelo/modelo_planta_baja_loop.webm` |
| `house-delivery.mp4` | 15 265 543 | **NEW — byte-identical** to `entrega/entrega_clip.mp4` |
| `house-delivery.webm` | 9 296 018 | **NEW — byte-identical** to `entrega/entrega_clip.webm` |
| `hero-a-2560/1920/1280.webp`, `hero-a-poster-960.webp` | 151 922 / 100 070 / 55 910 / 33 152 | **NEW**, but **derivatives** of 3D's `hero_A.jpg`, so no checksum can prove it. Confirmed **by eye**: the hero shows Van Gogh's Cypresses (`shots/target-1366-first.png`) |
| `house-ground-loop-poster-1600.webp`, `house-delivery-poster-1600.webp` | 161 116 / 136 266 | derivatives of the new posters (JPEG → WebP), so no byte match; they belong to the new clips |
| **`living-empty-1200.webp`** | 40 284 | **STILL OLD** — not in the 06.11. handover; the frame shows the old abstract painting (`shots/3d-03-pair.png`) |
| **`living-furnished-1200.webp`** | 59 170 | **STILL OLD** — the same |
| `living-camera-ride.mp4`, `living-ride-poster.webp`, `house-ground-near-1600.webp` | — | **removed**, 404 on the deployment, as Redesign's return says |

So: **step 03 "Vacío y amueblado" is the only place on the site that still carries the old picture.** A-22 passes
once 3D delivers the re-rendered pair and Redesign swaps it by checksum. One question for **3D**, not a finding
against Redesign: in the 02 Modelo frame a second, different picture hangs on the dining-room wall — intended or not
is 3D's call.

## 4. Observations, not findings

1. **The plan cells name their state to a screen reader.** `<span role="img" aria-label="Incluido">✓</span>` and
   `aria-label="No incluido"` for the —. That is the accessible equivalent of the tick, not a readiness word, and
   **"Próximamente" appears in no attribute anywhere**. It does deviate from my own P-1 wording, which forbade the
   words in `aria-label` too. If the owner wants it gone, "Sí"/"No" or "Incluido en el plan" would carry the same
   meaning. I have not counted it as a finding.
2. **A-2, the first screen at 1366 × 768, is not met as written.** The benefit and the actions are there, but the
   enquiry and its result begin at y = **826** (header 72 + notice 37, hero section 154–922). Even without the
   preview notice it would begin at ≈ 789. The hero is built to fill the window exactly, so the demo starts just
   below it — on a 768 px screen one short scroll is needed. Also three action-like items sit in the first screen
   ("Ver la demo" in the header, "Ver la demo" and the second action in the hero); whether that is one main action is
   the owner's call.
3. **`robots.txt` allows `ChatGPT-User`, `Claude-User` and `Perplexity-User` on `/` while `*` is disallowed.** Behind
   the gate this reaches nobody, but the same file in a live build would invite those three crawlers into the public
   view. Worth one decision before launch.
4. The target view's plans table shows **18** rows; `otherLanguages` is deliberately absent per §14 ("not shown in
   either view for now"). The 19-row census is withdrawn, so this is a note for Copy, not a finding.
5. Two of my own probe artefacts, named so nobody repeats them: the notice looked "missing" until I allowed for the
   space before its full stop, and a mangled regex dropped every lowercase "s" from captured scene labels. Neither
   reached a finding.

## 5. What this does not say

Design, the palette, the headline face and "modern enough" are the owner's. The real iPhone, the real mail client and
the feel of the clips are the owner's. API owns the product truth behind the keys; 3D owns the media; Copy owns the
wording. §D-3c (every "Incluido" against its condition for an invited external agency) stays the check **before the
production go-live** and is not part of this preview run. The Meta small fix (§H) waits for Redesign to name its
preview; nothing on it is reported here.

**Marking:** technical and operational, measured on one named build. Not a design acceptance, not a legal approval,
no publication released.
