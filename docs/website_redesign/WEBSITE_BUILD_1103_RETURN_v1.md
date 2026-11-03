# WEBSITE BUILD 1103 — return on the one build of the owner's order of 03.11.2026 (home page and /packages, ES and EN)

**Written for:** the owner (design verdict), Audit (consolidation), the Reviewer (independent check on the named build), Copy
(the WORKING lines in §6), 3D (the media mapping in §4).
**Status:** implemented and awaiting the owner's view and the independent technical and final audit. Nothing here is a design
acceptance; nothing is released for publication.

```
WEBSITE_BUILD_1103          = faf2dbb  dpl_FnoR4QFTNPg1E9ws4g28gj2FdzkC   (presentation build, stub)   preview: https://nuovasolution-design-preview-qx416se64-nuovasolajs-projects.vercel.app/es   EN: /en
WEBSITE_BUILD_1103_STAGING  = faf2dbb  dpl_FgNysWx6qAS6xR669UcG1Cuv5aUv  (staging mode, not part of the design view)
code                        = 347fb77 (the build) → aa7cbc0 (the 3D handle sweep, the media register) → faf2dbb (contrast of the quiet function items, poster preload, the film on a phone after load, content-visibility below the fold)
research (step 0)           = docs/website_redesign/RESEARCH_1103.md · pictures docs/website_redesign/research_1103/
the owner's pictures        = docs/website_redesign/owner_review_1103/ (C01–C09 + README)
evidence                    = docs/website_redesign/evidence_2026-11-03_build/ (desktop/, phone/, recordings/, checks/, compare/)
```

The order's split into work packages 1–3 was lifted by Audit on 03.11.; this is one build for the whole home page and /packages.

---

## 1. The eight mandatory points — implemented how · evidence · honest grade

| # | Point | Implemented how | Evidence (picture / time in the recording) | Grade 1–10 |
|---|---|---|---|---|
| 1 | **Hero: the 7-second film as a dimmed background loop, one sentence and the main action over it; 2–3 benefits animated while it runs; the demo directly underneath; the logo in the header; poster for slow connections; reduced motion = still** | `components/home/hero.tsx`, `hero-film.tsx`: the living-room ride of C01 (`living-camera-ride.mp4`, 8 s) muted in a loop behind two gradients; the headline rises word by word, then the lead, the actions "Ver la demo" / "Pedir acceso" and the invitation line; three benefits appear at 1.3 s / 2.2 s / 3.1 s in the right column (under the words on a phone); a pause control at the top right; the demonstration card rises into the film's lower edge. The poster (`living-ride-poster.webp`) stands first and stays with reduced motion, `saveData` or a 2G/3G connection; on a phone the film is attached after the first paint. The header stands transparent over the film with the logo inverted to white and returns to the light bar with the black logo at the page's top (the preview band) and below the film. | `desktop/01-hero-film-start.png`, `02-hero-benefits.png`, `03-hero-header-over-film.png`, `30-reduced-motion-hero.png`, `phone/01-hero.png`, `phone/12-reduced-motion.png`; recording desktop-normal 0:00–0:05 (the film and the benefits), desktop-reduced 0:00–0:05 (the poster) | 9 |
| 2 | **Demo WhatsApp: Laura writes ONE message; times on both sides; a reply without an AI sound; no illogical question; the record fills field by field** | `lib/content/home-demo.ts`, `components/home/hero-demo.tsx`: one bubble "Hola, soy Laura. Busco un piso de 2 dormitorios en Estepona, hasta 320.000 €. ¿Podría ver alguno la semana que viene?" with 11:20; typing dots once; the reply in the owner's words "Perfecto, Laura: Estepona, 2 dormitorios, hasta 320.000 €. ¿Ya tienes la financiación resuelta o te ayudamos a valorarlo?" with 11:21, one grey tick and the one mark "Asistente automático de la agencia"; the record "Ficha de Laura" fills Intención, Zona, Dormitorios, Presupuesto, Idioma, Visita one field every 0.35 s, each flashing once in the house green, then the state, the priority "Alta · pide zona, presupuesto y visita" and the next step. One run ≈ 7.5 s; the end state stays; "Repetir demo" and both "Ver la demo" buttons run it again. | `desktop/04-demo-message.png`, `05-demo-typing-reply.png`, `06-demo-end.png`, `phone/02-demo-end.png`, `03-record.png`; recording desktop-normal 0:05–0:14 | 9 |
| 3 | **Every channel looks like its channel (C07–C09): e-mail = mailbox with subject and sender; web form = a real form that is sent; phone = call view with waveform, live transcript and duration** | the e-mail is a mailbox: an inbox list of three mails at the left (from 1180 px), the open message with subject, sender, address and "Para: tu agencia · martes 11:24", the body, three dots, then the reply in the thread with the assistant mark and "enviado" (the agency's Gmail reply in Spanish, as the register allows); the web form is a browser card "Formulario de contacto · tu web" with six real fields (Nombre, Email, Busco as a select, Zona, Presupuesto, Mensaje) that fill one after another with a caret, then "Enviar" is pressed and turns into "Enviado · martes 11:31"; the phone is a dark call view: Álvaro's avatar, "Llamada entrante", the line answered with a running duration (0:01 … 0:38) and a live waveform, the transcript line by line, the assistant's line, then "Llamada atendida · 0:38". The form and the phone carry "Prototipo" on their surface and in their state line. The dialogues are the implementer's (§6, for Copy). | `desktop/07-channel-email-mailbox.png`, `08-channel-webform-filling.png`, `09-channel-webform-sent.png`, `10-channel-phone-live.png`, `11-channel-phone-ended.png`, `12-tab-keyboard-focus.png`, `phone/04-channel-email.png`, `05-channel-phone.png`; recording desktop-normal 0:14–0:31 | 9 |
| 4 | **Core functions as their own animated sections with real product UI; a simple flow "Anfrage → Nuova → Akte → dein Team", animated on scroll, understood in 5 s** | `components/home/flow-ribbon.tsx`: four nodes Consulta → Nuova → Ficha → Tu equipo on a dotted line that is drawn in the house green as the ribbon scrolls into view (scroll-linked `pathLength`). `components/home/functions.tsx`: six functions at the left (Leads importantes con motivo · Consultas respondidas · Lo importante, guardado · Inmuebles que encajan · Seguimiento con permiso · El día de tu equipo), each with one line and its status word; a sticky stage at the right that swaps the product surface of the function in view with a short rise: the priority list with reasons, the "Respondidas hoy" list at 23:40 / 07:15 / 11:20, Laura's record with its history, the two listings that fit with "Proponer a Laura", the new listing with the permission line, Elena's Wednesday list with "Tomar". On a phone every function stands with its own surface in a linear stack. The weekly report and 3D have their own stages (points 5 and 6), so the eight functions of the order are all on the page. | `desktop/13-flow.png`, `14-functions-priority.png`, `15-functions-matching.png`, `16-functions-team.png`, `phone/06-flow.png`, `07-functions.png`; recording desktop-normal 0:31–0:45 | 9 |
| 5 | **Reporting (C05): no box of three numbers; a real chart (weeks, channels, hot leads, open cases) in the style of the real report, animated, "Datos de ejemplo"** | `components/home/report-stage.tsx`: one report sheet with the header "Agencia de ejemplo · Semana del 26 oct al 1 nov · WhatsApp y email · Demo con datos ficticios" and the chip "Datos de ejemplo"; the four-week chart (received / answered, Copy's example figures 19·17, 24·22, 21·20, 25·23) whose bars grow from the base line when the sheet comes into view; the six figures of Copy §4.2 with their definitions, counted up, "No medido" as text for delivered and response time; the channel bars WhatsApp 13 / Email 10; "Sigue abierto" and "Qué hacer ahora" from Copy §4.3; the state line and the link to /example-report. Built on the look of the agency login's weekly report (components/app/weekly-report.tsx). | `desktop/17-report.png`, `phone/08-report.png`; recording desktop-normal 0:45–0:50 | 9 |
| 6 | **3D (C02): "La casa entera" without room names and viewer menu (the clean media of handoff_2026-10-30 by SHA256SUMS; house-turn-es.mp4 out); a large stage: plan → model → empty/furnished on a handle** | `components/home/stage-3d.tsx`: one stage of 1200 × 600 px that walks once when it comes into view: the dimensioned ground-floor plan (drawn to scale from the house's specification) → the clean model "02 Modelo" (`house-model-clean-1600.webp` from `modelo_both_floors.png`, no labels) → the living room empty/furnished on the compare handle, which sweeps from the empty room to the furnished one once and then belongs to the visitor; the fourth step "Entrega" shows the whole house as the clean take of the 3D lane (`house-clean-take.mp4` = `media/clean_take_fullhd.mp4`, sha256 identical, 1920 × 1080, 25 s, no labels) behind its own poster, loaded only on a click. The labelled `house-turn-{es,en}.mp4`, their posters and the labelled `house-both-floors-*.webp` are removed from the repository. The section carries "En preparación · todavía no contratable" and "Casa de ejemplo ficticia" (Copy §5). | `desktop/18-3d-plan.png`, `19-3d-model.png`, `20-3d-pair.png`, `21-3d-film-poster.png`, `22-3d-film-playing.png`, `phone/09-3d.png`; `checks/media-sha256.txt`; recording desktop-normal 0:50–0:57 | 9 |
| 7 | **Plans (C03): no empty circles; every row a full function icon and a status label (Incluido green / En preparación / Por encargo); a check only where available; full and valuable; the recommended plan stands out** | `components/home/plans-table.tsx` on Copy §6.1: one table of sixteen rows in six groups (Canales, CRM, Equipo, Informes, Integraciones, Servicios), every row with a function icon (lucide) and, per plan, one status pill: "Incluido" green with a check (9 cells), "No incluido" (9), "En preparación" (30); "Por encargo" is defined but not used today (Copy: only once 3D is accepted). Essential carries "Recomendado para empezar" (it is the plan whose rows are included today; nothing is called popular). Below 1024 px one card per plan with the same grouped rows. No price, no "Disponible", no "Probar gratis"; every action is "Solicita una propuesta" to the contact page. The same table stands on /packages under Copy's C-10/C-11 opening. | `desktop/23-plans-top.png`, `24-plans-bottom.png`, `25-packages-page.png`, `phone/10-plans.png`, `13-packages.png`; recording desktop-normal 0:57–1:03 | 9 |
| 8 | **Overall feel: luxury / enterprise, much white space, large type, depth (shadows, glass, soft gradients), micro-animations on hover and scroll, fluid on the phone; ES home page ≈ 650–900 visible words; more picture, less text** | the page is one story on a light ground: the film, the product card with a deep shadow rising into it, the flow ribbon, the sticky stage on a soft gradient field, the report sheet, the 3D stage, the table, the dark close with a green glow. Type: the headline at 80 px on 1440, section titles at the display scale, nothing under 13 px on the page and nothing under 14 px in the demonstration. Motion: the words rise once, every block rises into place when it enters the window (Motion `whileInView`), tabs and buttons lift on hover, the flow line draws on scroll, the bars grow, the handle sweeps; with reduced motion every end state stands; without JavaScript every section is readable. The phone: a linear stack, no horizontal overflow, 44 px targets. Words: 1 051 words in all; 650 of prose (headlines, lines, the plans' rows and status words), 401 inside the three product surfaces (the demonstration 142, the functions stage ≈ 60, the report sheet ≈ 200) (see §3). Lighthouse mobile: 91 / 89 / 88 in three runs (accessibility 100) (see §3). | every picture; `checks/build-check-1103.json`, `checks/lighthouse-summary.json`, `compare/` (§8) | 9 |

The grades are the implementer's own, against the order's wording; the design verdict is the owner's. What keeps every point from a 10: the hero film is the 720 p study (point 1); the demo dialogues of three channels are the implementer's until Copy checks them (points 2, 3); the plan → model step is a crossfade, not a camera move (point 6); the page counts 1 051 words with its product surfaces (point 8).

---

## 2. Research (step 0)

`docs/website_redesign/RESEARCH_1103.md`: the five references of the owner's report (FIND Real Estate, The Digital Yes,
Pyzhevsky, Realevate, Attio), nine of the implementer's own choice (Linear, Glaido, Fora, SleekFlow, Belgrade Arbor, Lev,
STILL / FORM, Lenval Properties, Vercel) and the libraries (Motion, GSAP ScrollTrigger, Lenis, Magic UI, Aceternity, 21st.dev),
each with the pictures and the line "das übernehmen wir für Abschnitt X". The critical check of the order (five lines) stands in
its §4 and was implemented without waiting: the C01 film is the living-room ride of the 3D lane's earlier handoff, not a file of
handoff_2026-10-30; the 15 MB clean take plays on request only; "recommended" is reconciled with the report's "no invented
popular plan"; one grey tick, never two blue ones; the film on the phone after the first paint.

---

## 3. Measured on the named deployment

| Check | Result | File |
|---|---|---|
| Build check of the eight points (`scripts/design/build-check-1103.mjs`, 26 checks) | 26/26 (the 3D film check with the clean take playing at 1920 × 1080, 25 s; the keyboard check; the phone check with no horizontal overflow) | `checks/build-check-1103.json`, `.log` |
| Contrast (`scripts/design/contrast-check.mjs`) | 0 comparisons below the floor | `checks/contrast-results.json` |
| Routes (`scripts/e2e/route-scan.mjs`) | 55/55 | `checks/route-scan.json` |
| Lighthouse mobile, /es, three runs (simulated throttling, Edge 156) | performance 91 · 89 · 88 (LCP 3.5–3.6 s, TBT 90–150 ms, CLS 0, FCP 1.1 s); accessibility 100 in every run; best practices 92 in every run, the one failing audit being the Vercel preview toolbar script `vercel.live/_next-live/feedback/feedback.js` blocked by the site's own CSP (a preview-only script, not part of the page) | `checks/lighthouse-mobile-run{1,2,3}.json` |
| Lighthouse desktop, /es | performance 100 (LCP 0.8 s, TBT 0 ms, CLS 0), accessibility 100, best practices 92 (the same preview-toolbar audit) | `checks/lighthouse-desktop.json` |
| Lighthouse mobile, /es/packages | performance 100, accessibility 100 | `checks/lighthouse-mobile-packages.json` |
| Visible Spanish words of the home page (FAQ answers closed) | 1 051 words in all; 650 of prose (headlines, lines, the plans' rows and status words), 401 inside the three product surfaces (the demonstration 142, the functions stage ≈ 60, the report sheet ≈ 200) | `checks/build-check-1103.json` → `words_es` |
| Smallest font | 13 px on the page (chips, small labels), 14 px in the hero and the demonstration | `checks/build-check-1103.json` → `8-fonts` |
| Real-time recordings | four, real time, real clicks on "Ver la demo" and the tabs "Email" and "Teléfono", then the scroll through every section: desktop 1366 × 768 normal 101.7 s (12.0 MB), desktop reduced motion 71.8 s (3.8 MB), phone 390 × 844 normal 83.4 s (6.9 MB), phone reduced motion 83.2 s (5.7 MB); `.txt` beside each with frames and seconds | `recordings/*.mp4` + `.txt` |
| `/api/build` | `{"commit":"faf2dbb90a12ae5e55f5e4ada965de52d67a594a","deployment":"dpl_FnoR4QFTNPg1E9ws4g28gj2FdzkC","env":"preview","mode":"stub"}` | `checks/api-build.json` |

On the words: the report's budget speaks of visible words; the order asks at the same time for product UI instead of text. The
check counts both: the prose of the page (headlines, lines, status words, the plans' rows and cells) and, separately, the words
inside the three product surfaces (the demonstration, the functions stage, the report sheet). The prose stands at 650, inside the budget; with the product surfaces counted as words the page carries 1 051, above it. Copy's own count of its §1–§6 was 827 with the plans' status words included; the surfaces the order asks for add the rest. If the owner reads the budget as the whole page, the first cut would be the report's six definitions (≈ 70 words) and the demo's state lines (≈ 25).

---

## 4. Media mapping (source file · checksum · published URL · poster · visible content)

| Published file (`/media/3d/…`) | Source (3D lane) | sha256 source | sha256 published | Visible content |
|---|---|---|---|---|
| `living-camera-ride.mp4` | living-room study, `living_camera_ride.mp4` (1280 × 720, 8 s) | — (earlier handoff, 2026-10-02) | `c3c56a9c…baaa0` | the hero's film: the furnished living room, a slow camera ride (C01) |
| `living-ride-poster.webp` | the film's own frame | — | `3a64afa7…d715` | the hero's poster (reduced motion, slow connection, first paint) |
| `house-model-clean-1600.webp` | `handoff_2026-10-30/media/modelo_both_floors.png` (3840 × 2160, `ui=0`) | `533231f0…79f` | `d948d9ed…ea63` | 3D step 02: both floors without a roof, no labels |
| `living-empty-1200.webp` | `handoff_2026-10-30/pair/living_empty.jpg` | `aa2f54f5…9a8c` | `3d1dff9e…6714` | 3D step 03, the empty room |
| `living-furnished-1200.webp` | `handoff_2026-10-30/pair/living_furnished.jpg` | `d87d8f84…a393` | `79ed5583…a9f7` | 3D step 03, the furnished room |
| `house-clean-take.mp4` | `handoff_2026-10-30/media/clean_take_fullhd.mp4` (1920 × 1080, 25 fps, 25 s) | `e9ba714b…867a6` | identical: `e9ba714b…867a6` | 3D step 04: the whole house, upper floor, lower floor, furniture off and on; no labels, no menu; plays on click |
| `house-clean-take-poster.webp` | the clean take's frame at 1.5 s | — | `bac9ee56…4ebb` | the poster of step 04 |
| removed: `house-turn-es.mp4`, `house-turn-en.mp4`, both posters, `house-both-floors-{es,en}-1600.webp` | handoff_2026-10-23 (labelled) | — | — | no longer in the repository or on the page |

Full checksums: `checks/media-sha256.txt` and `docs/website_redesign/MEDIA_SOURCES_1010.md` §2b.

---

## 5. Claims (governance/API_CLAIMS_LINES_1102_v1.md)

| Rule | On the page |
|---|---|
| no prices | none; "Te decimos el precio para tu agencia antes de acordar nada." |
| no package "Disponible" | the status words are Incluido / No incluido / En preparación; "Disponible" does not occur as a status |
| WhatsApp only for our own agency, not "with your number" | the row "WhatsApp con el número de tu agencia" is "En preparación" in every plan; the hero says "por WhatsApp y email" |
| the alert not "Disponible" | the function "Leads importantes, con motivo" is "En preparación"; the surface says "Aviso a Elena · en preparación"; the demo's state line "En preparación: el aviso a Elena y su lista de tareas." |
| public registration locked | main action "Ver la demo", second action "Pedir acceso"; no `/signup` link on a public page (footer, closing band, FAQ, example report, platform pages, contact, trial changed); "Probar gratis" nowhere |
| the web form and the phone are prototypes | marked on their surface and in their state line |
| priority as a category with a reason, no score | "Alta · pide zona, presupuesto y visita" and the like; no number |
| a sent text is not a delivered one | one grey tick; "Hora de envío, no de entrega"; "Entregadas al cliente: No medido" |
| a viewing request is not an appointment | "Una petición de visita no es una cita: la confirma una persona." |
| matching, follow-ups, task list, weekly e-mail, 3D, other languages, Instagram, phone | "En preparación" everywhere; matching also carries Copy's "Implementado; todavía sin activar para ninguna agencia" |
| the database in the EU | "La base de datos está en la Unión Europea (Fráncfort)." (never "all data") |

---

## 6. For Copy: the lines of this build that are not in handover 1102 v2 (WORKING, for the check the order foresees)

| Where | ES (working) |
|---|---|
| hero, the three benefits | Responde en español, también fuera de horario · Guarda zona, presupuesto e intención en la ficha · Tu equipo ve la prioridad y el siguiente paso |
| hero, the film's label and the control | Vídeo de fondo: un salón amueblado de la casa de ejemplo ficticia de NuovaSolution, 8 segundos en bucle, sin sonido · Pausar el vídeo / Reproducir el vídeo |
| demo WhatsApp, the reply (the owner's words of 03.11.) | Perfecto, Laura: Estepona, 2 dormitorios, hasta 320.000 €. ¿Ya tienes la financiación resuelta o te ayudamos a valorarlo? |
| demo e-mail (Carmen Ortega, propietaria) | subject "Valoración de mi piso en Fuengirola"; body "Buenos días, quiero vender mi piso en Fuengirola, 3 dormitorios cerca del paseo marítimo, y me gustaría una valoración. ¿Podrían venir esta semana?"; reply "Hola, Carmen. Gracias por escribirnos: un piso de 3 dormitorios en Fuengirola para vender, con valoración esta semana. ¿Qué día te viene mejor para la visita, por la mañana o por la tarde?"; record: vender · Fuengirola · paseo marítimo · piso de 3 dormitorios · español · valoración esta semana; Alta · propietaria que quiere vender y pide cita; "Elena le propone día y hora para la valoración."; states "Hoy: respuesta en español por email (Gmail) y ficha guardada." / "En preparación: el aviso a Elena y su lista de tareas." |
| demo web form (Sofía Lamas) | fields Nombre · Email (sofia.lamas@ejemplo.es) · Busco: Alquilar · Zona: Fuengirola · Presupuesto: hasta 1.200 € al mes · Mensaje: "Dos dormitorios, larga temporada, a partir de enero. ¿Tenéis algo?"; Enviar → Enviado · martes 11:31; record: alquilar · larga temporada, Fuengirola, 2, hasta 1.200 € al mes · desde enero, español; Media · alquiler con zona y presupuesto, sin fecha de visita; "Enviar a Sofía lo disponible en alquiler." · "Tarea para tu equipo · lo envía una persona."; "Prototipo: el formulario web todavía no está disponible." |
| demo phone (Álvaro Pons) | "Hola, llamo por la villa de Elviria." · "Quería saber el precio y si hay margen." · "Me viene mejor que me llamen por la tarde." · assistant: "Perfecto, Álvaro: la villa de Elviria, precio y margen. Una persona de la agencia te llama esta tarde."; Llamada entrante / Llamada atendida · 0:38; record: compra · la villa de Elviria, precio y margen, español, llamada a partir de las 16:00, +34 ··· ··· ···; Alta · pregunta por un inmueble concreto y pide que le llamen; "Devolver la llamada a partir de las 16:00." · "Tarea para tu equipo · el precio lo da una persona."; "Prototipo: el asistente telefónico todavía no está disponible; solo en español." |
| the flow | Cómo funciona · De la consulta a tu equipo, sin que nadie esté pendiente. · Consulta (WhatsApp, email, formulario o teléfono) · Nuova (Responde en español) · Ficha (Zona, presupuesto, idioma) · Tu equipo (Prioridad y siguiente paso) |
| the functions | Lo que tu agencia gana · Cada consulta, atendida y en su sitio. · 01 Leads importantes, con motivo — La ficha marca la prioridad y por qué. El aviso a la persona que toca está en preparación. · 02 Consultas respondidas (Copy §2) · 03 Lo importante, guardado (Copy §2) · 04 Inmuebles que encajan (Copy §3 + "Implementado; todavía sin activar para ninguna agencia") · 05 Seguimiento con permiso — Un inmueble nuevo que encaja se propone solo con permiso del cliente. · 06 El día de tu equipo (Copy §3) |
| the surfaces' words | Consultas de hoy · Respondidas hoy · Hora de envío, no de entrega · Historial · Encajan con Laura · de tu cartera · Proponer a Laura · Nuevo en tu cartera · Permiso de Laura para avisos: sí · martes 11:23 · Enviar la propuesta por email · Sin permiso no se envía nada. · Elena · miércoles · Tomar · Aviso a Elena · en preparación; the names Carmen Ortega, Marta R., Tomás V. (fictional) |
| the report | eyebrow "Informe"; "Por canal"; "Datos de ejemplo" (chip); the rest is Copy §4 |
| 3D | eyebrow "Un servicio aparte"; "La casa entera" · "Las dos plantas, luego cada planta, con y sin muebles. Grabado del visor real, 25 segundos, sin sonido." · "Ver la casa entera"; the alt texts of §4 |
| the plans | "Recomendado para empezar"; "Un ✓ solo donde la función está incluida hoy." |
| the FAQ's title | "Preguntas" · "Todas las preguntas" |

Copy's §1.2 reply ("Hola, Laura. Anoto …") was replaced by the owner's wording of 03.11.; Copy's §1.2 message in two bubbles
became one bubble (the owner's C06).

---

## 7. Open points, with owners

| Point | Owner | State |
|---|---|---|
| the design verdict on this build | Owner | open (this return) |
| the WORKING lines of §6 | Copy | to check after the owner's view |
| the demo dialogues of the e-mail, form and phone channels | Copy | as §6 |
| a 1080p living-room ride (the hero film is the 720 p study of 2026-10-02, upscaled on wide screens) | 3D | asked for here, not ordered |
| the owner's visual acceptance of the 3D run on a real iPhone (report §6 test A) | Owner / 3D | open since 02.11. |
| RV6 on this build | Reviewer | the named build is this return's |
| Lighthouse mobile ≥ 85: met on the named build (91 / 89 / 88); the measurement is Lighthouse 13.6 with simulated throttling in Edge 156 on this machine, not a field value | Website | see §3 |
| E-FU2 page on nuovasolution.com, `main`, the production domain | — | untouched |
| Safari / a real iPhone | — | not measured; 390 px is Edge's emulation |

---

## 8. Comparison pictures (our page beside a reference)

| File | Left | Right |
|---|---|---|
| `compare/01-hero-vs-find.png` | our hero at 1440 (the film, the sentence, the action) | FIND Real Estate's hero (research R1) |
| `compare/02-demo-vs-digital-yes.png` | our WhatsApp demonstration at its end | The Digital Yes's WhatsApp card (the owner's B05) |
| `compare/03-functions-vs-attio.png` | our functions section (the sticky stage) | Attio's step list with its product surface (research R5) |

---

## 9. Said plainly

- The design verdict is the owner's; the grades in §1 are the implementer's against the order's wording.
- The hero film is the 720 p living-room study (what C01 shows); on screens wider than 1280 px it is upscaled and softened by the
  dim. A 1080p take would sharpen it; it is listed for 3D, not ordered.
- The demonstration's dialogues of three channels are the implementer's; Copy checks them.
- The preview band ("Vista previa") stands above the hero on every preview; the header is light there and turns transparent over
  the film once the page has scrolled past the band. On a released site without the band the header starts transparent.
- No Safari, no real iPhone; the phone pictures and recordings are Edge's emulation at 390 × 844.
- The sections below the fold use `content-visibility: auto` (faf2dbb, for the phone's layout cost). Their blocks rise into place when the page scrolls to them; after a programmatic jump straight into a section (there is no link on the page that does this) the rise can wait for the next scroll step. The evidence helpers scroll in steps for that reason; the probes make the sections render before reading the page's words.
- The recordings of the four runs were taken while the same machine was otherwise idle; the Lighthouse runs were taken alone, after the recordings.
- Signal to Audit and the Reviewer: this file, the named build above and the evidence folder.
