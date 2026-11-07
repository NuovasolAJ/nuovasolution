# Redesign → Copy: the text places of the next named build (the owner's master prompt of 07.11., "WEBSITE_BUILD_1108") · 07.11.2026

**Written for:** Copy (the only writer of new or changed sentences), cc the owner, the Reviewer, Audit. The owner's rule for this
build: *"Neue oder geänderte Sätze schreibt nur Copy … baue erst mit Copys Wortlaut."* Everything below is a **place and a
requirement**, never a proposed sentence. Until Copy's lines arrive, the build carries the current text (or nothing) at these places
and the interim preview (G7) shows them marked `WORKING · Copy`.

The register stays `API_CLAIMS_LINES_1102_v1.md` (no "con tu número", no "Disponible", no price, no contact promise), the view rule
stays §14–§23 (target vs public), D-1…D-23 are built.

| # | Place (owner's point) | What the owner asks | What I need from Copy | View |
|---|---|---|---|---|
| T-1 | **Hero, main action** (B2) | one main button "Reservar una demo" → `/contact` with the appointment choice | the ES and EN label (the owner wrote "Reservar una demo"); the same label is used on the phone's fixed bottom bar (A3) and in the header's main button, so one wording for all three | both |
| T-2 | **Hero, second action** (B2) | "Escríbenos por WhatsApp" → a `wa.me` link to the agency's own number | the ES and EN label; **open for the owner:** the number itself is OPEN in the owner's file (`owner_firmendaten_1106.txt`, Telefon OFFEN). Without a number the button cannot exist; until then the second action stays the view's entry ("Pruébalo gratis 14 días" / "Pedir acceso"). The owner names the number (it goes into the Vercel environment, not the repository) | both |
| T-3 | **Hero, the trial line** (B2) | "Pruébalo gratis 14 días" and "Sin método de pago…" only in the target view | no new text: they already hang on `trial` (§16). Confirmation only | target |
| T-4 | **The voice** (B5) | the answers come in the agency's name: "tu asistente responde en nombre de tu agencia", not "NuovaSolution responde" | the places that say "NuovaSolution responde/atiende/contesta" today: (a) flow station 02 "NuovaSolution responde" (§17); (b) the CRM history rows "Respuesta de NuovaSolution" (D-7 wording); (c) the scenes' lines where NuovaSolution is the subject of the reply (§18); (d) **the H1 "Mientras enseñas, NuovaSolution atiende."** — Copy decides whether the H1 stays (it names the product, not the sender) or follows B5; (e) the demo's sender label is already "Asistente automático de la agencia" (D-8) | both |
| T-5 | **New block "Quién está detrás"** (D1) | the founder with the name from the owner's file, seat in Spain, data in the EU (Frankfurt), every answer marked as an assistant, "una persona confirma cada cita", pilot places limited; no invented customers, figures, logos or reviews | the block's title, the founder line (the name is inserted from the environment, like the legal pages: `⟦E14: NOMBRE⟧`), the seat line (town from the owner's file or just "España"?), the data line (N-1/trust line exists: "La base de datos está en la Unión Europea (Fráncfort)."), the assistant line (exists: "Cada respuesta automática indica que la escribe un asistente."), the appointment line, the pilot line ("plazas limitadas" without a number, or with the number the owner names) — ES and EN, 5–6 short lines | both (the pilot line: target only? Copy decides against §14) |
| T-6 | **Plans table, the price cell** (E3, owner line PAKETE: prices stay internal) | instead of an empty place: "Piloto gratuito · precio en la demo" | the ES and EN cell text, and where it stands (one line under the three plan names, or one per plan) | target (the table is target-only) |
| T-7 | **"Hora de envío, no de entrega"** (the owner names it) | the note under the "Respondidas hoy" list | its replacement wording ES/EN (the meaning stays: the time is the time the reply left, delivery is not measured — R-3/R-4) | both |
| T-8 | **Scenes, the fold** (C3) | at most 5 scenes visible, the rest behind a control; "Siguiente escena" visibly active | the label of the fold control (e.g. "Ver las seis escenas restantes" — Copy's wording), ES/EN; "Siguiente escena" stays | both (public has 7 scenes: 5 + 2) |
| T-9 | **Phone's fixed bottom bar** (A3) | the main action always reachable on the phone | no new text if T-1's label is used; confirm | both |
| T-10 | **3D before/after slider** (G4) | "vacío" against "amueblado" with a handle | the two handle labels and the control's accessible name (ES/EN); today's step is called "Vacío y amueblado" | target |
| T-11 | **Meta verification** (D2) | the brand sentence ES/EN from §22 ("NuovaSolution es una marca de ⟦E14: NOMBRE⟧.") on the new site's legal notice | no new text; it is §22. The Meta tag's value comes from Social, not from Copy | — |

**Not asked of Copy:** D-1…D-23 (already built on HEAD, `0d6d323`), the RV6 wording findings F-1/F-5/F-6 (covered by D-1, D-9, D-3…D-7).

**When:** the interim preview (G7) goes to the owner before the finished build; Copy's lines for T-1, T-4, T-5, T-6, T-7, T-8, T-10 are
needed **before the finished build**, i.e. ideally by Mon 10.11. noon. The interim video shows these places with today's text.
