# WEBSITE · the owner's review of 02.11. (stage 1 `845429e` not accepted) · Work package 1 — the light hero and one WhatsApp-to-record demonstration

**State:** `2026-11-03` · **Lane:** Website Implementer → **Owner** (the view of work package 1 before work package 2), **Audit** (the signal of order
02.11., point 3), **Reviewer** (RV6 on the build named here), **Copy** (the WORKING lines of the three other channels, §4).
**Order:** the owner's return of 02.11. ("WEBSITE_STAGE1 = NICHT ABGENOMMEN"; the report `02_NuovaSolution_Review.pdf` §3, §8, §9 as the binding
design direction; work packages 1–3). **Status:** implemented and awaiting the owner's view of work package 1 and, after work packages 2 and 3, the
independent technical and final audit. The design judgement is the owner's; the technical measurements stand in §3. No "10/10" here.

```
WEBSITE_AP1          = f6315c1  dpl_8cQzPAckrfiPCByR9bXCKJ7pjc8M    (presentation build, mode stub)
WEBSITE_AP1_STAGING  = f6315c1  dpl_8LkhZU2AxhuDDjs8HpS5gXUKpQS9   (onboarding build, mode staging; not part of the design view)
```

| | |
|---|---|
| Preview link for the owner's view | https://nuovasolution-design-preview-8w236lbsd-nuovasolajs-projects.vercel.app/es (English: `/en`) · `/api/build` → `f6315c1`, `mode: stub` |
| Code | `845429e` (stage 1, not accepted) → `6a9fd46` (work package 1: the light hero, the demonstration, the review filed) → `f6315c1` (Copy's handover 1102 v2 §1 applied). Explicit pathspecs; Copy's (`0a5370e`) and the Reviewer's (`e680318`) files untouched |
| The owner's review filed | `docs/website_redesign/owner_review_1102/02_NuovaSolution_Review.pdf` and `images/B01…B17_image_…png` (the 17 pictures extracted from the PDF at their original pixel size, `images/manifest.json` with page, original name, size and SHA-256) |
| Withdrawn with this build | the four-layer concept, the hero photograph (`hero-room-*.webp` removed; the media register updated), the leaning app surface, the object card in the hero, the six-step sequence "La consulta de Laura, paso a paso" (component, content and CSS removed), the old stage-2 instruction (points 3–8 of 30.10.) |
| What stays as on `845429e` | everything from the story chapters down (A–F, social, 3D, packages, trust, FAQ), the module pages, the example report, the legal pages, the app area: these are work package 2. The E-FU2 test page on nuovasolution.com (`dpl_4xQt97aFfKzNBpsmXzKxNwZeHTCq`) is untouched; no deploy to the old site's `main`; no production domain change |
| Browsers really used | headless Edge (Chromium) at 1366 × 768, 1440 × 900, 1024 × 900, 768 × 1024 and 390 × 844 (mobile emulation, 2×); reduced motion emulated. **No Safari, no iPhone, no real phone.** A headless browser scrolled and clicked, not a person |
| Evidence | `docs/website_redesign/evidence_2026-11-03_ap1/` — `desktop/` (1366 × 768 first, then 1440, 1024, 768, EN, reduced motion), `phone/` (390 at 2×), `recordings/` (four files, §3), `checks/` (the suites, `/api/build`, the font sizes) |

## 1. The hero (report §3 "Hero")

| The report's line | Built on `f6315c1` | Where to look |
|---|---|---|
| Calm light ground, dark clear type, the house green as the main accent, WhatsApp green only for the channel, no rainbow cards | The hero stands on the page's canvas (`#fbfaf7`), ink type, the house green (`--brand-green #3a634b`) on the record's state dot, the priority pill, the next-step rule and the lit link mark; WhatsApp green on the channel's tab icon, the avatar ring and the outgoing bubble's tint only. One accent family, no photograph, no gradient | `desktop/03-first-screen-end.png` |
| The existing logo in the header; no logo development | The official artwork as before, never inverted now (the header is the light bar on every page) | every picture |
| Desktop: text about 40 %, demonstration about 60 %; no fixed height of several screens; at 1366 × 768 the benefit, the main action, the enquiry **and** a visible result on the first screen | Grid `0.9fr : 1.5fr` (measured 37.5 % : 62.5 % of the two columns). At 1366 × 768 the first screen holds the eyebrow, the headline, the benefit line, both actions, the access line, the channel bar, Laura's two messages, the reply, the record with its six fields, the state, the priority and the head of the next step (the two state lines follow just below the fold) | `desktop/01…03-first-screen-*.png` |
| Mobile: headline, benefit line, main action, then the compact demonstration; no desktop miniature | 390 px: the words, then the demonstration full width, the chat first and the record under it with a short "a la ficha" link; the record's rows stack key over value | `phone/01…04-*.png` |
| The working version "Mientras enseñas, Nuova atiende." + the benefit line; "Probar gratis" not as the main action | Copy's handover 1102 v2 §1.1: "Mientras enseñas, Nuova atiende." · "Responde consultas por WhatsApp y email y guarda lo importante en una ficha." (the report's "…y avisa a tu equipo" dropped: the alert is held back in production, HA1) · main action **"Ver la demo"** (runs the demonstration again and brings it into view) · quiet second action **"Pedir acceso"** → `/contact` · under them "Acceso por invitación mientras preparamos el registro público." No trial line, no "14 días gratis", no "Probar gratis" in the hero | `desktop/03-first-screen-end.png` |
| The header's one general button | "Ver la demo" → the demonstration on the home page (was "Probar gratis" → `/signup`; API's claims lines 02.11.: public registration is not released). The login stays | the header in every picture |

## 2. The demonstration (report §3 "ein Gespräch, drei sichtbare Folgen", §8 "Hero-Demo")

| The report's line | Built | Where to look |
|---|---|---|
| State 1 — the enquiry on a realistic WhatsApp surface: header, two readable messages, the time, few messenger details; no real number, no heavy phone frame | The chat surface: an avatar with the WhatsApp-green ring, "Laura · compradora · WhatsApp · 11:20", two incoming bubbles (Copy's message split at its sentence end): "Hola, soy Laura. Busco un piso de 2 dormitorios en Estepona, hasta 320.000 €." / "¿Podría ver alguno la semana que viene?". No number, no frame | `desktop/01-first-screen-start.png` |
| State 2 — three typing dots once, then a short professional reply; beside it, grouped in time, name/intent, language, area, budget; not every field its own second | Typing dots once (1.4 s), then the reply "Hola, Laura. Anoto Estepona, 2 dormitorios y hasta 320.000 €, y que quieres ver pisos la semana que viene. ¿Buscas vivienda habitual o segunda residencia?" with the one automation mark "Asistente automático de la agencia". The record "Ficha de Laura" appears with the reply and fills in two groups: intention · then area, bedrooms, budget · then language, the viewing asked for. The link mark between the columns turns green when the record starts | `desktop/02-first-screen-typing.png`, `03-first-screen-end.png`; `recordings/desktop-1366x768-normal.mp4` (0–8 s) |
| State 3 — the record shows the state, a reasoned priority and the next step; "Consulta registrada", "Siguiente paso: …"; a request is not a confirmed viewing; a sent text is not a proven delivery | "Estado · Consulta registrada" · "Prioridad · **Alta** · pide zona, presupuesto y visita" (a category with its reason, no number) · "Siguiente paso · Elena le propone día y hora para la visita." with "Una petición de visita no es una cita: la confirma una persona." · the two state lines "Hoy: respuesta en español y ficha guardada." / "En preparación: el aviso a Elena y su lista de tareas." The words "enviada" / "entregada" are not used | `desktop/03-first-screen-end.png`, `phone/04-record.png` |
| The end state stays; "Repetir demo" starts again; about 6–9 s; no forced waiting, no forced scroll, no loading animation, no special cursor | The run takes 5.6 s from the first message to the end state (phases at 0.9 · 1.8 · 3.2 · 3.95 · 4.7 · 5.6 s), then stands. "Repetir demo" in the bar and the hero's "Ver la demo" run it again. The words of the page never depend on it; nothing scrolls on its own | `recordings/*`, `checks/master-check.json` (`ap1-hero-demo`) |
| Score: a priority signal; a number only if the scale is real; otherwise a category with its reason | A category ("Alta") with its reason; no number anywhere | `desktop/03-first-screen-end.png` |
| Tone: natural and short, the automated assistant named once at a sensible place, no AI self-description in every bubble; the demo must not pretend a person answers | The mark "Asistente automático de la agencia" stands on the reply bubble, once; the foot carries "Demo con datos ficticios" | `desktop/03-first-screen-end.png` |
| Channel choice: icon + full name, a clearly filled active tab, the hint "Elige un canal", keyboard focus, a visible change of content, the same by touch; the phone and the form as demo/prototype; no automatic change while someone reads | A native tablist "Elige un canal": WhatsApp · Email · Formulario web · Teléfono, each with its icon and name; the active tab filled ink; arrow keys, Home/End and a visible focus ring; a click or a key runs that channel's own sequence; nothing changes on its own (measured: the channel still stands after 9 s). The web form and the phone carry "Prototipo" on their own surface's header line. The e-mail channel shows the German enquiry with its translation, "Sin respuesta automática" and the record for a person | `desktop/04…07-*.png`, `phone/05-channel-email.png`; `recordings/*` (the click on "Email") |
| Reduced motion: finished states, full content, working actions. Without JavaScript: benefit, evidence and next action reachable | The phase lives in CSS (`--phase` on the root, `--at` on every item, one rule derives the visibility), so the markup is complete from the first paint. With reduced motion the end state stands at once and the replay control is hidden; without JavaScript the enquiry, the reply and the record with its nine lines are in the document (measured) | `desktop/09-reduced-motion.png`, `phone/06-reduced-motion.png`, `checks/master-check.json` (`reduced`, `nojs`) |
| Cards: small position changes and clear state changes, not only fades; no content behind overlapping cards | Every arriving item rises 8 px and fades in; a field that has just arrived flashes once in the house green's wash; the reply gets a quiet ring while the record fills; nothing overlaps (the cover probe at five scroll positions finds no covered point) | `checks/master-check.json` (`d1440-cover`, `m390-cover`) |

## 3. Measured on dpl_8cQzPAckrfiPCByR9bXCKJ7pjc8M

| Check | Result |
|---|---|
| Master check (`scripts/design/master-check.mjs`, re-read on the light hero: still, cover, header, reduced, nojs, R24/R25 hero parts, Copy's rows, the new `ap1-hero-demo`) | 32/32 (`checks/master-check.json`, `master-check.log`). The first run on this deployment gave 30/32: two probes read the word "aviso" in Copy's honest state line "En preparación: el aviso a Elena y su lista de tareas." as an alert claim; the probes were narrowed to a claimed alert ("aviso por email", "aviso enviado", "Disponible") and the suite re-run on the same deployment, 32/32. The narrowing is a change of the check script (`scripts/design/master-check.mjs`, committed with this return), not of the site |
| Contrast (`contrast-check.mjs`, ES and EN, 1440 and 390, every route) | 0 comparisons below the floor (`checks/contrast-results.json`) |
| Routes (`route-scan.mjs`) | 55/55 (`checks/route-scan.json`) |
| The smallest font in the hero and the demonstration | 1366 × 768: hero words 14 px (the eyebrow) · 15 · 17 · 18.9 · 20 · 49.6 px (the headline); demonstration 14 px (22 elements: keys, metas, the hint, the replay, the state lines), 15 px (8), 16 px (12), 17 px (1). 390 px: hero words 14 · 15 · 17 · 17.2 · 34 px; demonstration the same as on the desktop. Nothing under 14 px; body text 16–17 px (`checks/fonts-1366.txt`, `fonts-390.txt`) |
| `/api/build` | `f6315c1`, `website_enterprise_redesign`, dpl_8cQzPAckrfiPCByR9bXCKJ7pjc8M, preview, stub |
| Recordings (real time, nothing sped up; Page.startScreencast frames at their own timestamps) | `desktop-1366x768-normal.mp4` 25.5 s (1085 frames) · `desktop-1366x768-reduced-motion.mp4` 26.1 s (152 frames: nothing moves, so few frames change) · `phone-390-normal.mp4` 24.8 s (668 frames) · `phone-390-reduced-motion.mp4` 24.7 s (377 frames) |

What the recordings show: desktop — the page at its top, "Ver la demo" pressed (the run, 8 s), the "Email" tab pressed (its run), back to "WhatsApp", a
short scroll into the page; phone — the words, the scroll to the demonstration (it starts when it is in view), the run, the record, the "Email"
tab, its record. The reduced-motion files show the same actions with every state standing at once.

## 4. For Copy

Applied from `WEBSITE_COPY_HANDOVER_1102_v2.md` §1.1 and §1.2: every ES and EN line of the hero and the WhatsApp demonstration. Deviations, said
as such: Laura's message stands in two bubbles (the report's "zwei gut lesbare Nachrichten"), split at Copy's sentence end; the record's second
line reads "WhatsApp · 11:21" (a data line, not a claim). WORKING lines by the implementer, not in the handover, for Copy's next round:

| Where | WORKING line (ES) |
|---|---|
| E-mail channel (the Kellers, German, held) | surface header "Peter y Anna Keller · propietarios · Email · martes 11:24"; the German text with "Traducción · escrito en alemán"; note "Sin respuesta automática — El email llegó en alemán y hoy Nuova responde en español: no envía nada. La consulta queda en la ficha y la contesta una persona de tu equipo."; record Nombre · Piden (vender · valoración de una villa) · Idioma (alemán) · Zona (Marbella · Elviria) · Plazo (visita de valoración esta semana); "Registrada · espera a una persona"; "Alta · propietarios que quieren vender y piden cita"; "Contestar y proponer la visita — Tarea para tu equipo · la respuesta la escribe una persona"; state lines "Hoy: en otro idioma no se envía nada automáticamente; la consulta queda en la ficha." / "En preparación: el aviso a Elena y su lista de tareas." |
| Web form (Sofía, prototype) | "Prototipo · Sofía Lamas · inquilina · Formulario de tu web · martes 11:31"; her message; the reply by e-mail "Hola, Sofía. Anoto dos dormitorios en Fuengirola, hasta 1.200 € al mes y desde enero. Una persona de la agencia te envía lo que tenemos en larga temporada."; record Nombre · Busca (alquilar · 2 dormitorios) · Idioma · Zona · Presupuesto; "Consulta registrada"; "Media · alquiler con zona y presupuesto, sin fecha de visita"; "Enviar lo disponible en alquiler — Tarea para tu equipo · lo envía una persona"; "Prototipo: el formulario web todavía no está disponible." |
| Phone (Álvaro, prototype) | "Prototipo · Álvaro Pons · comprador · Llamada · martes 11:37 · solo en español"; what he says; "Atendida por el asistente — Dice que es un asistente automático, anota el motivo, el inmueble y la hora que prefiere. No da precio ni negocia: le devuelve la llamada una persona."; record Nombre · Pregunta por (comprar · la villa de Elviria) · Idioma · Quiere saber (precio y margen) · Prefiere (llamada a partir de las 16:00); "Llamada atendida · nota en la ficha"; "Alta · pregunta por un inmueble concreto y pide que le llamen"; "Devolver la llamada — Tarea para tu equipo · a partir de las 16:00"; "Prototipo: el asistente telefónico todavía no está disponible; solo en español." |
| Header | the one general button "Ver la demo" (ES) / "See the demo" (EN) → the demonstration (`lib/i18n/dictionaries`, `common.seeDemo`) |

Not changed in this work package (work package 2, Copy's §2–§7): the story chapters A–F and their heading "Con más detalle", the 3D section, the
packages and their "Probar gratis" button, the trust section, the module pages, the example report, the FAQ.

## 5. Said plainly

- **The design judgement is the owner's.** This return measures; it does not accept. Work package 2 (the page order of the report §4, the three
  results, the scenes, the report cut-out, the 3D stage with the clean media of `handoff_2026-10-30`, the packages' rows and status words, the detail
  pages and EN) starts only after the owner's view of work package 1.
- The hero demonstration stands in the window from the first paint with the enquiry alone; before the script runs (a slow connection) a visitor sees
  state 1, never an empty surface. The record's column is empty until the reply (by design: the record exists only then).
- The word count of the home page is unchanged by this package (the chapters stay until work package 2); the report's 650–900 words are a work-package-2
  measure.
- No Safari, no iPhone: 390 px is an emulation. The owner's real-iPhone view remains the proof the report asks for (§8).
- The example report's contradictions (§5), the packages (§5), the 3D handover's checksums and visible content (§6) are untouched here and belong to
  work package 2; nothing of them is claimed.
- Audit's signal: this file and its evidence folder are the work-package-1 signal of the order's point 3. The Reviewer's RV6 can run on
  dpl_8cQzPAckrfiPCByR9bXCKJ7pjc8M with the report's §9 list, design and technique judged separately.
