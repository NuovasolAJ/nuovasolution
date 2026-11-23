# API → Redesign, RV6, Audit (cc Owner): fixed commit 2024697 against the real staging intake · 23.11.2026

**Order (owner 23.11., addenda to ec4181ed point 3):** on exactly the fixed commit (49c4670 plus R-9b, R-10, R-11):
- the seven agreed cases;
- the path test 43abaa0a with W1b–W6b (no 24 h);
- R-9 and R-9b in ES and EN.

After a switch from Essential to Growth or Enterprise, the way, the package and the auto-inserted subject must match.

**The commit:** `2024697` (Redesign, "one re-pin before the push"; RV6 f0a9b78: site content of bd21830 = 2024697). It ran in a separate git worktree, so Redesign's working copy was not touched; the app tree was clean, and `next dev` used the real staging `pilot-request-intake`. Addresses are on example.invalid, and every test row was erased afterwards.

## 1. The seven cases (F-e over real HTTP): **7/7** · 19:29Z

`scripts/cert/stg_fe_consent_http.mjs` → `governance/evidence/stg_fe_consent_http_1123.json` (n8n repo).

| | Case | Result |
|---|---|---|
| H1 | consent true | 200 sent, one row, consent true, way trial, trial task |
| H2 | consent missing | 422 `fields ["consent"]` from the BFF, no row |
| H3 | consent `"true"` (string) | 422 as H2, no row |
| H4 | honeypot filled | 200 simulated, no row |
| H5 | production without the intake | 503 `intake_unconfigured` |
| H6 | no lead_memory row | 1376 = 1376 |
| H7 | cleanup | 0 left |

H2/H3 were the two open points from 32236c1 (502 then). They are now fixed.

## 2. Path test 43abaa0a with R-9 and R-9b: **23/23** · 19:27Z

`scripts/cert/stg_website_path_e2e.mjs 2024697` → `governance/evidence/stg_website_path_e2e_2024697.json`. Real Chromium at 390×844 (mobile, touch); the language switch is reached through the menu sheet, as a visitor does.

| Group | Cases | What is checked |
|---|---|---|
| W1–W6 | 3 packages × ES→EN / EN→ES | card on /packages → form on the right way → language switch keeps the way → submit → screen `sent` and the way → stored row (way, language) → our team's task (title per way) → Growth/Enterprise: confirmation mail queued (`pending`), Essential `not_needed` |
| W1b–W6b | the same 6 screens | the screen confirmation has no 24 h promise |
| R-9 | Essential → Growth, Essential → Enterprise, ES and EN | nothing typed in the message; way `demo`/`talk`, package `growth`/`enterprise`, the subject on screen **and** stored is the target's ("Demo · plan Growth", "Conversación · plan Enterprise", EN "Demo · Growth plan", "Conversation · Enterprise plan"); never Essential's; the typed agency is kept; the task is for the target |
| R-9b A | note typed **above** the prefill → language switch, ES and EN | the note is kept; the subject becomes the other language's Essential subject, on screen and stored; the old one is gone |
| R-9b B | note above → Growth way, ES and EN | note kept, Growth subject, never Essential's |
| R-9b C | control: note **below** → Growth way, ES and EN | the same, clean |
| W0 | cleanup | 0 left |

Example of a stored message (R9b-B-es): `Growth · nota R9 de la prueba Demo · plan Growth`.

**Honest note on the run.** The first run (19:23Z) gave 15/23. The failures came from my test, not from the site:
- After a language switch, I read the URL and the message too early. The switch is a client-side navigation, and `networkidle` returned while the old page was still showing.
- The stored rows of those same cases were right (language `en`, target subject).
- I added waiting for the target URL and for the mount effect, then reran on the same commit: 23/23.

## 3. What this does not cover

- **The confirmation mail itself** (sending to the staging sink) is proven separately: `governance/API_SIGNALS_1030.md`, STG_Pilot_Request_Confirm_v1.
- **The visual phone comparison** and **RV6's own measurement** stay with RV6.
- **Prod** is unchanged.
