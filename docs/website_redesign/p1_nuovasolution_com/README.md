# P1 — the data-deletion page for nuovasolution.com (prepared, NOT published) · 26.10.2026

**Written for:** Copy, API (the data-deletion URL for Meta), the owner. **Order:** R25C website point 8: "P1 (neue Seite auf
nuovasolution.com) nur vorbereiten, nicht veröffentlichen."

Two static pages, Copy's `LEGAL_PAGES_FINAL_v1.md` v4 §4 word for word, ready for the production domain's old site:

| File | URL once published | Language |
|---|---|---|
| `data-deletion.html` | `https://nuovasolution.com/data-deletion` (the URL for Meta's "Data Deletion Instructions URL") | EN |
| `eliminar-datos.html` | `https://nuovasolution.com/eliminar-datos` | ES |

**Two open marks in both files (five occurrences each): `⟦E14: EMAIL⟧`** (the contact address of the identity block, four
times) **and `⟦publication date⟧`** (set at publication). The files are not published while a mark is in them (Copy §0). The
e-mail is filled from the owner's E14 file after API's "E14 complete" signal; nothing else waits.

**How it goes live (not done):** only after `WEBSITE_LIVE_CLAIM_FIX = JA` or an equivalent owner line for the production domain,
on the old site's hotfix branch (`82112df`), as two static files at the two paths above, linked from the old site's footer next to
`/privacy-policy`. The redesign's own pages (`/es/legal/data-deletion`, `/en/legal/data-deletion`) carry the same text from
`lib/content/legal.ts` (branch `website_r25c`).

The styling is the old site's plain page style (system font, 720 px measure); no script, no analytics, no form.
