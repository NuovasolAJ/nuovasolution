# The one correction list · owner's bullets + ChatGPT's report + the two addenda of 16.11. · Redesign · Mon 16.11.2026

**Written for:** the owner (one list, one answer per point), Audit and the Reviewer (what to check on the named build), Copy, 3D, API/Hosting, Lead.
**Sources, merged once:** the owner's eleven bullets with 29 pictures (16.11. ~09:00), ChatGPT's report (points 1–12, same message), the owner's
addendum 1 (decisions 1–6, ~09:30) and addendum 2 (F27, retire list f1bef97, antonio@ / B2B1, ~10:00); Copy `COPY_TO_REDESIGN_1116_PILOT14_TEXTS_v1.md`
(4bc0f07) and the retire list in `COPY_TO_REDESIGN_1113_TEXTS_10V10_v1.md` (f1bef97); the Reviewer's F22 pre-measurement
`review_2026-11-16/REVIEWER_F22_VORMESSUNG_1116_v1.md` (afcb947).
**Status words:** **built** = on HEAD, visible on the interim deployment named in §5; **Wed** = in the named build of Wed 18.11. 14:00;
**decision** = a line from the person named is needed. Nothing here is "done": everything is implemented and awaiting the independent
technical check (RV6) and the owner's final design acceptance.

---

## 1. The list (owner's order of work: request path and phone errors → product understanding and offer consistency → visual refinement)

| # | Source | Point | Status | Where / how to check |
|---|---|---|---|---|
| 1.1 | ChatGPT 1, owner add. 3 | `/contact` dead end: demo + 14-day trial still there, the pilot button led back to the same page | **built** | `/es/contact`: pilot card (Copy 1116 C-0 … C-2, 14 days + 7), the short request form, a clear confirmation with the three steps of the pilot (`data-pilot-request="done"`), the e-mail and the company number as two rows (phone from `NUOVA_E14_PHONE`, number only, `tel:` link, no WhatsApp link); no demo card, no trial card, no second button |
| 1.2 | ChatGPT 1 | the request must be testable in the preview without a real send | **built** | `app/api/pilot-request/route.ts` validates and answers `delivery: "simulated"` until API/Hosting name an intake (`NUOVA_PILOT_INTAKE_URL` + `NUOVA_PILOT_INTAKE_TOKEN`, Vercel env only); the page then shows "Vista previa: esta solicitud no se ha enviado a nadie." Form labels, confirmation and error line are WORKING for Copy (`lib/content/pilot-request.ts`) |
| 1.3 | ChatGPT 1, owner add. 3 | the company number as a contact | **built** | `NUOVA_E14_PHONE` set in both preview projects via the Vercel CLI from the vault file (never in the repository); shown on `/contact` and in "Quién está detrás"; the legal notice reads the same value |
| 1.4 | owner add. 4, Copy 1116 §1 | ONE offer: a supported pilot, 14 days + 7 after the feedback; no self-start; `/contact`, packages, `/trial`, shared buttons, FAQ aligned | **built** | hero B-2 + B-2b, Cómo empezar (3 steps with their result, title "Cómo empezar: piloto gratuito de 14 días"), closing E-h/E-t/E-s, `/packages` h1 + lead, FAQ Q-11/Q-11b/Q-12 (home and `/faq`), `/trial` → `/contact`; "Prueba gratis 14 días", "Solicitar una demo", "precio en la demo" have 0 hits on the home page, `/contact`, `/packages`, `/faq` (the Reviewer's 0-hit rule changes per Copy §8: "14 días" with "piloto" is the offer) |
| 1.5 | owner add. 3 | antonio@ stays; live only after Lead's fix B2B1 in production | noted | the address stands on `/contact` and in "Quién está detrás"; the go-live condition goes into the return of the named build |
| 2.1 | ChatGPT 2, owner | "Te contesta una persona" squeezed beside the e-mail on the phone | **built** | the sentence in its own span; e-mail and phone as two rows under the lines (`data-behind-ways`) |
| 2.2 | ChatGPT 2, owner | 3D on the phone: model caption, film text and example mark overlap | **built** | nothing written on the picture any more: one caption line under the steps (`data-model3d-under`) with the step's line and the example mark; the play button keeps only its title |
| 2.3 | ChatGPT 2, owner (side-swipe) | Atiende · Organiza · Crece stacked on the phone, no horizontal swipe | **built** | `.ch-row` is a grid: one column on the phone, three from 1024 px |
| 2.4 | ChatGPT 2 | fixed pilot bar: compact, never under an equal button | **built** | the bar hides while any `[data-pilot-cta]` (hero, plans, Cómo empezar, Quién está detrás, close) is on screen |
| 2.5 | RV6 F22 a | the next section must show ≥ 120 px on the first screen | **built** | hero `min-height: calc(100svh − 136px)`; the pain band shows under it; measure on the named build at 1366×768/625, 1440×900/757, 390×844/664 |
| 2.6 | RV6 F22 c | hero lead on 390 px under AA (runs into the light part of the picture) | **built** | a vertical shade behind the words at ≤ 639 px plus a text shadow; measure on the named build |
| 2.7 | RV6 F22 d, D-3 | the picture pair's two halves differ in height (15 px at 390, 200 px on desktop) | **built** (18812cc) | both pictures take the slider's own box; measure Δ = 0 on the named build |
| 3.1 | owner, ChatGPT 3 | black main button — fine | kept | — |
| 3.2 | owner, ChatGPT 3 | checks in muted green | **built** | `--status-positive #2f7d4f` for the hero glass card, the area points, plan cells, trust/behind checks, the request's confirmation; D stays the brand accent; see §2 C1 |
| 3.3 | ChatGPT 3 | the hero names the product and the channels; readable with a still picture | **built / Wed** | the lead and the glass card name what it does; the channels stand in the flow's first step ("por WhatsApp y email"); a channel line in the hero itself: Wed, if the hero stays calm |
| 4.1 | owner, owner add. 5, Copy 1116 §2 | languages: one sentence everywhere, no promise of automatic replies in other languages | **built** | L-1 in the FAQ (home and `/faq`) and in Organiza, L-2 as the hero's first chip (target); the proven line in public until Lead confirms "a tu equipo" (Copy Q-2); "Más idiomas, en preparación." in the FAQ; see §2 C4 |
| 4.2 | ChatGPT 4 | target view vs public promises | kept | the two views stay; the 10 belongs to the target view, public is checked for "nothing false, no hole" (owner 13.11., RV6 D) |
| 5.1 | owner, ChatGPT 5 | the arrow line of "Cómo funciona" looks generic | **built** | `components/home/flow-story.tsx`: the four steps on the left, ONE product frame on the right in which Laura's enquiry accumulates (message → reply → record → priority + next step), driven by scroll; the phone shows each step's piece under it; reduced motion and no JavaScript show everything at once; no step paler than 0.74 |
| 6.1 | owner, ChatGPT 6 | the area cards' pictures fade into the text, badges cut | **built** | a framed media area with its own edge and no fade; the surface stands whole inside it |
| 6.2 | ChatGPT 6, Copy 1116 §3 | "Crece" needs a concrete benefit | **built** | C-0 "Ves dónde se te escapa negocio y qué hacer esta semana." with C-1 … C-4 from the example report (both views) |
| 7.1 | ChatGPT 7, Copy 1113 §2 | important functions visible while scrolling, not only after "Ver Crece" | **built** | every card shows one sentence and up to four points (Copy A-0 … A-4, O-0 … O-4, C-0 … C-4), public without the open ones; details stay behind "Ver {area}" |
| 7.2 | owner add. 2 (F27, "vender") | A-2 "comprar, alquilar o vender" | **built** | now "Entiende qué busca: comprar o alquilar." until Lead confirms the intent values (Copy Q-A2) |
| 8.1 | owner, ChatGPT 8 | demo auto-run: black flashing tabs and a loading bar look restless | **built** | the active tab is quiet (D wash, D edge), no story bar, 4.2 s reading pause; a click or key stops the rotation for good, nothing advances out of view, reduced motion = no rotation; the invitation is Copy's "Pulsa un canal y mira cómo responde."; see §2 C7 |
| 8.2 | ChatGPT 8 | reduced motion for the whole page incl. hero drift | kept | the hero drift and the loop are off under `prefers-reduced-motion` (CSS, since 1106); the story, the pain count and the demo follow it |
| 9.1 | owner, ChatGPT 9 | the comparison starts with three identical pairs | **built** | the rows that differ come first; four in sight, the shared starting figures behind "Ver la semana completa" |
| 9.2 | owner, ChatGPT 9, Copy 1113 §4 | the report as "Dónde está tu potencial", no "No medido" | **built** | the new head, three insight cards (figure · insight · next step) per view, the two "No medido" tiles removed; no response time is claimed anywhere except Copy's proven A-1 |
| 9.3 | owner, ChatGPT 9 | chart colours: everything the same blue | **built** | each channel its own tint of D from deep to light, WhatsApp its green, names beside the bars |
| 10.1 | ChatGPT 10 | 3D steps always selectable, no empty stretches | kept / Wed | the four steps are tabs and clickable (the Reviewer's live check); the pinned track's length is reviewed on the named build |
| 10.2 | owner, ChatGPT 10, Copy 1116 §7.2 | "Tu camino" as the real order path | **built** | four steps with their lines (Plano y deseos → Confirmamos → Construimos el modelo → Lo ves y compartes las imágenes) and the note "No se crea solo ni al instante."; the owner's chat-scene idea: see §3 D6 |
| 10.3 | ChatGPT 10 | "Pregúntanos por el 3D" preselects 3D on the request | **built** | `/contact?interes=3d` |
| 11.1 | owner, owner add. 1 | "Recomendado" and the blue column wash | **built** | removed; three equal columns, checks in circles everywhere |
| 11.2 | owner add. 2, Copy 1116 §7.1 | 3D is booked separately | **built** | the row "Visualización 3D" shows "Opcional" in all three columns; Enterprise's line no longer lists 3D; the legend reads "✓ Incluido · — No incluido · Opcional: se contrata aparte" |
| 11.3 | owner | "wo steht 14 days free trial?" | resolved | the owner's addendum 4 makes the 14-day supported pilot the offer (built, 1.4); see §2 C2 |
| 12.1 | owner, ChatGPT 12, Copy 1116 §4 | "Cómo empezar" felt cheap: a dense black box | **built** | a light card with three step cards, each with its result (Copy), the number in black, B-2b under the button; the section on the warm ground; data lines beside it |
| 12.2 | owner, ChatGPT 12, Copy 1116 §5 | the close is flat and lifeless | **built** | light and colour on the dark panel (a D glow, a faint living-room picture, a bronze hint), Copy's E-h/E-t/E-s, the one black-and-white button |
| 13.1 | owner add. 1 (P-11) | Fraunces for H1/H2 | **built** | Fraunces is the default face of the display sizes; the same build shows Inter with `?display=inter` (the owner compares both on one build) |
| 13.2 | owner add. 2, Copy f1bef97 | WhatsApp media "En preparación", Laura's floor-plan moment out, the false score sentence out | **built** | the demo carries no file moment; no sentence about photos, PDFs or voice notes on any route; `product-views.tsx` priority reason without the score sentence |
| 14.1 | RV6 F22 b | "teléfono" in the target view's channel list and "¿Atiende llamadas? Sí" | **built** | the channel list names only the included channels in both views ("por WhatsApp y email"); E2 now applies to the FAQ and the plans too (`offered()`), so the calls question is hidden in both views; the demo's phone tab stays as a product scene (owner's four channels) — see §2 C8 |
| 14.2 | owner point 6 via Copy 1116 §10 (fb1a56a) | the agency's own WhatsApp number comes only after its registration with Meta (topic 20): the public view must not suggest an agency's WhatsApp customers are answered today | **built** | public channel list names email only (W-1; the plans row reads "Respuestas en español por email. WhatsApp con el número de tu agencia: en preparación."), A-1 public "Responde en minutos por email." (W-2), the new FAQ "¿Responde desde el WhatsApp de mi agencia?" with "Todavía no…" (W-3; in both views per E2 — Copy's target "Sí" is not shown); the target view keeps "por WhatsApp y email"; W-4 (hero bubble) not built; the old `offer` block and the `/trial` steps in the dictionaries are not rendered (cleanup with the named build) |
| 14.3 | Copy 1116 §11 | the request confirmation's heading | **built** | "Gracias. Te contestará una persona del equipo, en español o en inglés." |
| 15.1 | ChatGPT "Arbeitsweise" | the whole visitor path checked before the return, independent check, one named build with URL and commit, desktop and phone evidence | Wed | §5 |

## 2. Contradictions, named once

| # | Between | Resolution in this build |
|---|---|---|
| C1 | green checks (owner 16.11.) ↔ RV6 B-1 "green only at the WhatsApp mark" (13.11.) | the owner's wish governs: ONE muted green for positive status; D stays the accent; the Reviewer's row "Hochwertig" needs this one line changed |
| C2 | "14 días" out everywhere (owner 13.11.) ↔ "wo steht 14 days free trial?" (16.11.) | the owner's addendum 4: a supported 14 + 7 day pilot is the offer; no self-start; Copy 1116 §8 changes the 0-hit rule accordingly |
| C3 | "Recomendado" ordered (master prompt point 7) ↔ "wieso ist growth recommended?" | removed (addendum 1) |
| C4 | "wir können doch mehrere Sprachen" ↔ production replies in Spanish only (F07/F24) | the owner's addendum 5 and Copy L-1/L-2; the public view keeps the proven line until Lead confirms (Copy Q-2) |
| C5 | Copy A-2 "comprar, alquilar o vender" (proven per API) ↔ "vender vorerst nicht versprechen" (addendum 2) | "comprar o alquilar" until Lead's Q-A2 |
| C6 | 3D ticked in all plans ↔ "un servicio aparte" | "Opcional" in every column (addendum 2) |
| C7 | auto-run ordered (13.11.) ↔ "unruhig" (16.11.) | kept, but quiet: no black flash, no bar, 4.2 s pause, a click stops it; one word from the owner switches it off entirely |
| C8 | four demo channels (owner) ↔ E2 / RV6 "phone not offered" | the phone tab stays as a product scene; no sentence promises phone; the Reviewer may still count the tab — then it goes |
| C9 | Copy's per-area buttons (A-btn/O-btn/C-btn) ↔ one quiet "Ver {área}" per card | the quiet toggle stays (fewer buttons; the pilot stays the main action); Copy's buttons are not used |

## 3. Decisions still needed (one line each)

| # | Who | Question |
|---|---|---|
| D1 | API / Hosting | the intake for the pilot request (URL + token as Vercel env); until then the preview simulates |
| D2 | owner | Copy Q-1: does "sin método de pago" (B-2b, E-s) still hold with the 14 + 7 pilot? |
| D3 | Lead | Copy Q-2: do other-language enquiries reach a person of the agency on WhatsApp and e-mail? (then L-2 goes public) |
| D4 | 3D | Copy Q-3: may the agency pass the protected model link on? (then "lo compartes") |
| D5 | Lead | Q-A2 intent values (then "vender" returns to A-2) |
| D6 | owner | the chat scene for "Tu camino" (agent sends the plan in a chat): Copy would have to write it as a real order dialogue; today the four steps stand without a chat picture |
| D7 | owner | auto-run of the demo: keep (quiet) or off |
| D8 | owner | after the overhaul: Fraunces (default) or Inter — compare `?display=inter` on the same build |
| D9 | API | Copy Q-5: what a pilot agency has on day one (automatic e-mail replies from its own mailbox, from a NuovaSolution address, or not yet) — W-1/W-2 may need the same treatment for e-mail |

## 4. Not in this interim, in the named build of Wednesday

- the hero's "Nueva consulta · WhatsApp" bubble (Copy H-b1 … H-b3) — only if the hero stays calm with it;
- the measurement suite on the deployment: Lighthouse (mobile ≥ 90 / desktop ≥ 95, with the bypass header), CLS < 0.1, LCP < 2.5 s, AA, reduced motion, 360/390/414 tap targets ≥ 44 px, the first-screen conditions, the regression against fdffcf4 (hero, demo, slider), the JavaScript budget (≤ +15 % vs fdffcf4);
- the whole visitor path walked once more (first screen → request confirmation) in both languages and both views;
- the self-grading in a separate file (opened by the Reviewer after their grade);
- Copy's retire list in the dictionaries for pages that are not linked from the home page any more (`/trial`, `/signup` copies) — the routes redirect today.

## 5. Dates

- **Interim state of Mon 16.11.** (this list's "built" rows): the open design preview, deployment and commit in the signal of 15:00; no name, no grade.
- **Named build: Wed 18.11. 14:00** with URL and commit, desktop and phone evidence, the return table (every point above as closed on the build / open / decision), then RV6 and the owner's bundled acceptance.
- Fallback (agreed 13.11., P-2): Thu 19.11. 14:00.
