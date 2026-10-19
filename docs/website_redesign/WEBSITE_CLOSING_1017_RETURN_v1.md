# WEBSITE CLOSING 1017 — the binding closing order of 2026-10-17 on the restored site

**State:** `2026-10-17` · **Lane:** Website Implementer → **Owner** (visual acceptance, five steps in §7), **Copy** (the
text changes, §6), **Reviewer** (this deployment), **Audit** (`ACCEPTANCE_LIST_1010.md` §F4/§F5), **3D**
(`3D_ASSETS_REQUEST_1017.md`).
**Order:** `VERBINDLICHER ABSCHLUSSAUFTRAG – NUOVASOLUTION WEBSITE` (owner, 2026-10-17, ten sections), basis
`WEBSITE_RESTORE_1016 = 565316d / dpl_FtFedJRrXZ8LorsNYSHcQoJGGcCA`. It replaces the correction order; v4 was not
brought back; no second rebuild.
**Status:** implemented and awaiting independent technical and final audit. Three kinds of proof are kept apart below:
technical checks (§4), my own visual check (§5), productive backend proof (none here; §8).

```
WEBSITE_CLOSING_1017 = 4110566 dpl_2KqZb43ZxiywgYpNqmKJYffLg95G
```

| | |
|---|---|
| Preview (alias, always the newest build) | https://nuovasolution-design-preview-git-we-eeb43f-nuovasolajs-projects.vercel.app/es · `/en` |
| This deployment | https://nuovasolution-design-preview-hd5u5lvm6-nuovasolajs-projects.vercel.app |
| Before | `565316d` / `dpl_FtFedJRrXZ8LorsNYSHcQoJGGcCA` |
| Browsers and devices really checked | headless Edge (Chromium) at 390×844 (mobile emulation), 768×1024, 1366×650 (short laptop), 1366×768, 1440×900, 1920×1080; **no Safari, no Firefox, no real phone, no real handset for the mail** |

## 1. References, as actually seen (§1)

- **fora.so, 2026-10-17:** the live site is a creator directory ("Learn from people who do the work", category filter,
  creator cards). No layered landscape and no product panel rising from the land exist on it today. The scene the owner
  means is the one in our own captures of 2026-10-03 (`evidence_2026-10-03/references/fora-d1440-hero.png`: dusk sky,
  dark hills with trees, a product surface rising; `fora-d1440-s1.png`: a sentence lighting up on scroll). Those captures
  are the reference used; no comparison is claimed with a scene I did not see.
- **21st.dev** (`/community/components/explore/scroll-animation-component`, 58 entries): *Container Scroll Animation*
  (Manu Arora, Aceternity, MIT, framer-motion): a panel that rotates in 3D on scroll (perspective, rotateX to flat,
  scale). *Scroll Morph Hero* (Prashant Som, licence unknown): a hero morphing from scattered items to a circle to a
  rainbow arc, not a landscape. *Zoom Parallax* (Efferd, licence unknown, Lenis): images zooming at different speeds.
  Adopted: the Container Scroll principle (own implementation, no code copied). Not adopted: Morph Hero (wrong subject)
  and Zoom Parallax (licence unknown, no second animation library). No 21st MCP is available in this session; public
  listings were used, no API key, no paid tool.
- **Our preview**, scrolled and operated myself at every width in §5.

## 2. Findings: fixed · open · blocked externally

### Fixed in this deployment

| Order | What was wrong | What stands now |
|---|---|---|
| §3 hero | the foreground covered the panel's foot permanently; a dark edge then an abrupt change to ivory; the first headline line grey-brown | the foreground frames the entry and **sinks and fades as the panel stands up** (released by depth 0.4); the ground under the panel's foot turns to the page's ivory inside the hero, so the panel opens the light page and the story continues on the same ground; both headline lines ivory; the panel leans 12° and grows to 1.06 |
| §4 pop-in | content waited for the reveal trigger (opacity 0 until in view) | the reveal only settles into place; nothing is hidden before its trigger; reduced motion: still |
| §4 images | listing and villa pictures lazy, blank cards while the deck showed them | fetched with the page (small WebPs), their box reserved with a neutral ground |
| §4 cards | price, place and rooms broke into word towers; records squeezed label against value | the listing card: title, the price on its own line, place, facts, the reference secondary; the record: label above value where the column is narrow |
| §5 Laura | the reply asked "morning or afternoon?" although Laura named Thursday morning | the reply notes Thursday morning and the budget, a colleague comes back with the exact time (hero and chapter B, ES and EN) |
| §5 budget | 320.000 € in the record without a visible source | Laura's message names the budget (hero, the short text in B, the full text) |
| §5 Tomar | "Tomar" took the task and confirmed 10:00 at once | three visible steps: take → **agree the time with Laura** (Elena proposes 10:00, asks) → done; the done line says "hora acordada", never "confirmada" |
| §5 wording | "la chance / qué chances", broken brackets in the proposal, Manchester as the reason for priority, "Jarvis" | "oportunidades" / "la consulta importante", the proposal in plain sentences, the reason is date + property + budget, "el asistente de la mañana" |
| §6 social | five tall, mostly empty boxes | one composition: the post (the listing's own photo and data, caption with a call to write, draft → approved → published states), the prospect's comment, the allowed reply, the next step (a record and a person writes privately). No reach, no leads, no availability |
| §7 3D | two design revisions shown as a furniture comparison; the viewer still with its title bar | the slider is gone until the real pair exists: the final render stands there with the note; stage 04 shows the capture from its lower edge so the bar is out of frame; the missing assets are named in `3D_ASSETS_REQUEST_1017.md` |
| §8 platform | long duplicated capability list, confusing dropdown | the menu in four words plus the overview; the platform page as four tasks with their entries and links, the module list, "per order / being built" once |
| §8 packages | "processed per month"; the phone both included and not bookable; "in the customer's language" | "Capacidad: consultas al mes"; the phone is out of the packages (it stands under "being built" on the platform page); "hoy en español"; each package says for whom, what Nuova does, what is added, and its confirmed limits |
| §8 truth | limits only on a status page | the limit stands with the claim: the hero's state line, chapter B, the platform's answer task, the ladder's replies and report lines, chapter F ("respondida no es entregada") |
| §8 FAQ | "We do not give a duration. You do it yourself…" | what the customer prepares, what Nuova does, when the setup is finished, no duration promised |

### Open (owner or lane)

| What | Who | Why open |
|---|---|---|
| The rotating building (video or working viewer) and the unfurnished → furnished pair | 3D | no material yet; `3D_ASSETS_REQUEST_1017.md` names it exactly; the slots are prepared |
| The public name of the morning assistant | Owner | "el asistente de la mañana" is the implementer's choice |
| Prices or a price frame | Owner | the packages say the price is given before anything is agreed |
| Confirmation of the changed texts (§6) | Copy | handed over in one list |
| A real handset for the mail shell (Copy's D-8) | Hosting / Owner | not possible from this session |

### Blocked externally

- Productive backend proof of any path (languages, alerts, follow-ups, reports, social): unchanged from
  `ACCEPTANCE_LIST_1010.md` §A–§E.

## 3. What to look at

Folder `docs/website_redesign/evidence_2026-10-17/`.

| Where | What |
|---|---|
| `hero/` | the hero at 0/25/50/75/100 % and the edge into the story, 1440 and 390, ES and EN |
| `widths/` | the first screen and the story at 390, 768, 1366×650, 1366×768, 1920 |
| `story/` | B's record, C's cards, D's three steps, E's email, F's figures, the social flow, the 3D section, the packages |
| `film/story-film-d1440-es.mp4` | the uncut scroll film from the hero through the six scenes, the social flow and the 3D section (57 s) |
| `BEFORE_AFTER_HERO`, `_TRANSITION`, `_CARDS`, `_SOCIAL` | `565316d` next to now |
| `checks/`, `contrast/`, `route_scan/`, `links/` | the suites |

## 4. Technical checks on this deployment

`scripts/design/master-check.mjs` **27 of 27** (layers at three measured speeds plus the far ridge and the foreground on their
own distances; nothing covered at five scroll positions; the six chapters; the translation; the channels by keyboard; the
three-step task; the email's button; the 3D labels; no overflow at 390/768; FAQ; reduced motion; without JavaScript; the
login area). Contrast **0** below 4.5:1. Routes 55 of 55. Links 1064 of 1064.

## 5. My own visual check (§9)

Walked myself on the local candidate and then on the deployment, ES and EN, by scrolling slowly, fast and
backwards, with anchor links and the keyboard, with reduced motion:

| Width | What I looked at | Found and fixed on the way |
|---|---|---|
| 390×844 (mobile emulation) | first screen, the hero's edge, the cards of C, the social flow, the fast scroll to the end and back | nothing blank after the fast scroll; every stage keeps its height and its text; the record's fields stack |
| 768×1024 | the same | the social flow in one column on the left, the comment on the right |
| 1366×650 (short laptop) | the first screen | the headline, lead and buttons fit above the ridges; the panel starts under the first screen and is reached within one scroll |
| 1366×768, 1440×900, 1920×1080 | first screen, edge, cards, social, the deck of chapters | at 1920 the scene fills the width, the panel stays 1140 px; the foreground's fade had to start earlier (it still showed at the edge), set to depth 0.22 |
| Deck, keyboard | the channel tabs by arrow keys while chapter B is stuck under A | a link into a covered chapter scrolls to its place in the flow (the deck's own handler) |
| Reduced motion | the hero and the chapters | the foreground stands at 35 %, nothing moves, everything is readable |
| Film | the uncut film from the hero to the 3D section, watched end to end | the three steps of D are in it; the request of E; the social flow; the headless recording shows timing slips, not the browser's own scroll |

## 6. Text changes handed to Copy

Hero: Laura's enquiry names the budget; the reply notes Thursday morning and the budget. Chapter B: the short text, the
reply (ES/EN), the task line "acordar la hora exacta". Chapter D: eyebrow "La consulta importante…", the line with three
steps, items without Manchester, the three task words (Acordar la hora con Laura · Hora propuesta a Laura · Hecha), Elena's
message as a question, the done line "hora acordada". Chapter C: the proposal in plain sentences. Chapter F:
"oportunidades", "respondida no es entregada". Social: the post caption, the three states, the next step. 3D: the note
under the render. Platform map: the answer task and the WhatsApp entry with "hoy en español", the report entry. Packages:
"hoy en español", the report note, the limits line per package, "Capacidad: consultas al mes". FAQ: the setup answer.

## 7. Five steps for the owner's visual acceptance

1. **Erster Bildschirm** (Desktop und Handy): beide Überschriftzeilen hell; langsam scrollen: das Panel richtet sich auf und
   kommt näher, der Vordergrund sinkt und gibt den Panelfuß frei, der Boden unter dem Panel wird zur hellen Seite. Kein
   Streifen, keine Kante.
2. **Story ohne Klick** lesen, dann in **B** die Kanäle und „Ver el original“, in **D** Tomar → Acordar la hora con Laura →
   Marcar como hecha (drei sichtbare Schritte), in **E** der Knopf in der Mail.
3. **Social**: ein Beitrag mit Foto, Text, Freigabe und Veröffentlichung; daneben Martas Frage, die erlaubte Antwort und
   der nächste Schritt.
4. **3D**: vier Stufen, das Render, das Video mit Pause. Die Drehaufnahme und das Paar leer/möbliert fehlen noch (3D).
5. **Menü „Plataforma“**, **Paquetes** (für wen · was übernimmt Nuova · was kommt dazu · Grenzen) und **FAQ**
   „Configuración“.

## 8. Said plainly

No productive backend path is proven by this deployment; every figure is an example and says so. The film is a headless
recording; frame timing is not the browser's own scroll feel.
