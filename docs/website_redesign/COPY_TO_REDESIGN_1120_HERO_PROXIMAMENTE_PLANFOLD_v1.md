# Copy → Redesign, RV6: hero check, the visible "Próximamente", the folded plan cards · 19.11.2026 (due Fri 20.11. 10:00)

**Asked by:** Redesign (nuovasolution-32), 19.11. evening, after the owner released draft (16) for the build:
- Form A: the day story on the phone as D-c, desktop D-1…D-6;
- palette B;
- no prices;
- phone ≤ 21 screens.

**Basis:**
- `COPY_TO_REDESIGN_1117_TARGET_PRODUCT_TEXTS_v2.md` (`e851e72`);
- the build draft `lib/content/strengths.ts` (read only);
- the register `lib/claims.ts` (read only).

**Status:** an editorial and technical check, not a legal approval and not a Meta approval.

**What this file is:** a delta to v2. Where it says nothing, v2 stays. It changes v2 in one place: the switch-day form of the cards (§2.1). RV6 gets that rule from here.

---

## 1. Hero (owner: "Bitte mit Copy auch den Hero prüfen")

**Verdict: confirmed, no word changed.** The build (`strengths.ts:58–61`) carries §A exactly.

| # | ES | EN | Check |
|---|---|---|---|
| H-h1 | Haz crecer tu inmobiliaria. No tu carga de trabajo. | Grow your agency. Not your workload. | Natural in both languages. It is a goal, not a function claim, so it stays true in both views |
| H-sub (target) | NuovaSolution capta clientes, responde consultas y hace seguimiento. Reactiva contactos, propone inmuebles y te muestra qué merece tu atención, para que tu negocio avance sin que todo dependa de ti. | NuovaSolution brings in clients, answers enquiries and follows up. It re-engages past contacts, suggests properties and shows you what deserves your attention, so your business moves forward without everything depending on you. | The owner's text. Correct Spanish; NuovaSolution is the subject, so the tú form is not needed here. No number, no promised deal |
| H-subP (public on the switch day) | Tus clientes reciben respuesta aunque estés en una visita, y lo que piden te espera ordenado en su ficha. | Your clients get a reply even while you are at a viewing, and what they ask for is waiting for you on their record. | True today: reply and record are in production. It fits under the new h1: the h1 names the goal, H-subP names what works today |

**One build note on `subKeys` (`strengths.ts:60`), not a text change.** "capta clientes" is true when **either** `adsLeads` **or** `instagram` is on. The exact rule for H-sub is:

> H-sub shows when `followup` AND `matching` are on, AND at least one of `adsLeads` / `instagram` is on. Otherwise H-subP.

If the build requires all four keys, a switched-off `instagram` alone sends the hero back to H-subP. That is stricter than needed, not false. Redesign decides.

**No "Próximamente" in the hero** (v2 §A stays): a hero with "próximamente" in the middle reads badly; the fallback H-subP does the job.

---

## 2. A visible "Próximamente" (owner: "‚Desde Growth' allein sagt nur, zu welchem Paket sie gehört")

### 2.1 The card form on the switch day (this replaces v2 §B.2 "Switch day" and the PX column of v2 §B.3)

**Rule P-1, a card whose keys are all off:**
- The **plan chip** starts with "Próximamente" (table §2.2). It is the first thing read on the card, so it carries the state.
- The **title, the sentence and the phone line stay.** They describe the planned function; the chip says it is not active yet.
- The **three example lines are hidden.** With times and names they read as something already running. Their mark G-m "Ejemplo · datos ficticios" / "Example · fictional data" is hidden with them: it has nothing left to mark. (Added 19.11. on RV6's question. In the partial states of §2.3 the mark stays wherever at least one example line is shown: G-1p with all three lines, G-3p with line 1.)
- The **PX sentence ("Gana nuevos clientes: próximamente.") is no longer used on the cards.** Next to the title and the new chip it would say the same thing three times.

The `px` field in `strengths.ts` can then go, or stay unused; Redesign decides. PX-b / PX-s stay valid everywhere else (plans table, demo tabs, `COPY_TO_REDESIGN_1116_EXAMPLE_WEEK_PROXIMAMENTE_v1.md` §1).

**Rule P-2, a card whose keys are partly on:** only the two cases in §2.3 have their own text. Any other partial state follows P-1 (the whole card "Próximamente").

### 2.2 The plan chips, off (P-1)

Redesign's WORKING wording is confirmed, with one change on T-6.

| Card | Chip, on (v2, unchanged) | Chip, off ES | Chip, off EN |
|---|---|---|---|
| G-2, G-3, T-2, T-4 | Desde Growth · From Growth | Próximamente · Desde Growth | Coming soon · From Growth |
| G-1 | Desde Growth · redes sociales en Enterprise · From Growth · social media on Enterprise | **Próximamente · Desde Growth** (shortened 20.11., `mail/COPY_TO_REDESIGN_1120_PROXIMAMENTE_v1.md` §6; was "… · redes sociales en Enterprise") | **Coming soon · From Growth** |
| T-6 | Opcional, con cualquier plan · Optional, with any plan | **Próximamente · Opcional, con cualquier plan** (replaces "Opcional · próximamente", so every off chip starts the same way) | **Coming soon · Optional, with any plan** |
| T-8 | Todos los planes · Every plan | Próximamente · Todos los planes (only if `reportInLogin` ever goes off; it is in production today) | Coming soon · Every plan |

**T-8 build note:** the sentence names no e-mail, so T-8 hangs on `reportInLogin` only. `weeklyEmail` being off does not touch it (v2 §B.3).

### 2.3 The two partial states with their own text (P-2)

**G-1, ads and forms on (`adsLeads`), social off (`instagram`):** the seller example (the form on an ad) stays true, so the examples stay.

| Element | ES | EN |
|---|---|---|
| Chip | Desde Growth · redes sociales en Enterprise, próximamente | From Growth · social media on Enterprise, coming soon |
| Sentence (G-1p) | Tus anuncios y formularios atraen a compradores y a propietarios que quieren vender. Cada contacto llega como una consulta con su ficha. | Your ads and lead forms draw in buyers and owners who want to sell. Every contact arrives as an enquiry with its own record. |
| Phone line | De tu anuncio a una consulta. | From your ad to an enquiry. |
| Examples | the three seller lines (Isabel, Mijas), unchanged | unchanged |

G-1's full sentence (comments and direct messages) needs `instagram` **and**, once it exists, `socialInbox` (v2 §F). Until that key exists, the DM clause is target only.

**G-3, reply, record and priority on (in production today), `matching` and/or `followup` off:**

| Element | ES | EN |
|---|---|---|
| Chip | Desde Growth · en parte próximamente | From Growth · partly coming soon |
| Sentence (G-3p) | Responde al momento y aclara qué busca cada cliente. {partes}: próximamente. | It replies at once and finds out what each client is looking for. {parts}: coming soon. |
| {partes}, built from the keys that are off, joined with " y " / " and " | `matching`: "Proponerle inmuebles que encajan" · `followup`: "hacer seguimiento, con su permiso" (the capital letter goes by position: whichever part comes first in the sentence takes it. Only `followup` off reads "… Hacer seguimiento, con su permiso: próximamente." / "… Following up, with their permission: coming soon." Clarified 20.11. on RV6's N-5) | `matching`: "Suggesting listings that fit" · `followup`: "following up, with their permission" |
| Phone line | Cada interesado, respondido al momento. | Every lead, answered at once. |
| Examples | **only line 1** ("Laura pregunta por un piso en Estepona · respuesta al momento y una pregunta"); lines 2 and 3 hidden | only line 1 |

Both off, full sentence: "Responde al momento y aclara qué busca cada cliente. Proponerle inmuebles que encajan y hacer seguimiento, con su permiso: próximamente." / "It replies at once and finds out what each client is looking for. Suggesting listings that fit and following up, with their permission: coming soon."

### 2.4 "Un día con NuovaSolution" on the switch day

| Where | Off station |
|---|---|
| Desktop D-1…D-6 | The station stays, with PX-b "Próximamente" / "Coming soon" right after the time. If more than two stations are off, only the live ones are shown (v2 §C) |
| Phone D-c | The off station is left out of the compact line. D-c names only live stations |
| D-4 partial (`matching` on, `instagram` off) | "Entra un piso nuevo en Estepona: encaja con Laura." / "A new flat comes in in Estepona: it fits Laura." |

### 2.5 If the owner wants "Próximamente" on certain cards already today

The wording is the same (§2.2–2.4). Which keys are switched is the owner's decision (`publicGate`), not Copy's.

**For that decision, the register as it stands today (`claims.ts:37–68`), for the keys of this section:**
- **"included"** (production): `replyWhatsapp`, `replyEmail`, `replyOutOfHours`, `crm`, `priorityWithReason`, `reportInLogin`, `reminders`.
- **"soon"**: `adsLeads`, `instagram`, `matching`, `followup`, `taskList`, `dailyVoice`, `phoneAssistant`, `weeklyEmail`, `model3d`.

So with the register's states, the section would read on the switch day as follows:
- G-1, G-2, T-2, T-4, T-6 "Próximamente";
- G-3 partial (§2.3);
- T-8 unchanged;
- the day shows only D-3 and D-6;
- the hero shows H-subP.

---

## 3. The folded plan cards on the phone (≤ 639 px)

**Confirmed:**

| Element | ES | EN |
|---|---|---|
| Button, closed | Ver todo lo que incluye | See everything included |
| Button, open | Ocultar | Hide |
| aria-label, closed | Ver todo lo que incluye {Plan} | See everything {Plan} includes |
| aria-label, open | Ocultar lo que incluye {Plan} | Hide what {Plan} includes |

**Conditions (so the fold hides detail, not the offer):**
- Visible while closed:
  - the plan name and the "for whom" line;
  - both ways **with the line under each button**: "14 días gratis, sin tarjeta" and "Te respondemos en 24 h laborables, con las condiciones por escrito.";
  - the line above the plans: "El piloto gratuito de 14 días incluye todo lo de Growth…" (v2 §E).
- The button state is read out by `aria-expanded`, and the tap area is at least 44 px high.
- When open, a "Próximamente" cell inside the groups shows PX-b, and the legend "Próximamente: aún no activo" / "Coming soon: not active yet" is visible with it (1116 §1, point 4).
- Desktop is unchanged.

---

## 4. Open
- **Owner:** whether certain cards show "Próximamente" already today, and which keys (§2.5).
- **Owner:** {precio} (v2 §D, unchanged).
- **Owner/API:** `socialInbox` (v2 §F, unchanged).
