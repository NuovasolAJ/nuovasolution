# Redesign → Social: the four questions on the small fix of the live site (SOCIAL_OWNER_ANTWORTEN_1106_v1.md §5) · 06.11.2026

**Written for:** Social (Meta's business verification), cc the owner, Copy, Audit. Everything read-only; nothing deployed, nothing
published. Publishing needs the owner's own line (`WEBSITE-KLEINFIX = JA`).

## The four answers

| # | Question | Answer |
|---|---|---|
| 1 | Are the sources of today's live site available, and can it be deployed separately from the new website? | **Yes, both.** The live site is the branch `main` of this repository (the old Next.js site), plus the one page of E-FU2 on the branch `efu2-prueba-objeto` (`e03b5fb` = `main` + `/es/prueba-objeto` + its picture, nothing else). Its legal pages are `app/legal-notice/page.tsx`, `app/aviso-legal/page.tsx`, `app/privacy-policy/page.tsx`, `app/politica-privacidad/page.tsx` in that branch (worktree `C:\Users\Usuario\Desktop\nuova-oldsite-efu2`). It is deployed **separately** from the new website: the new website lives on the branch `website_enterprise_redesign` and on the two preview projects only; the live site is deployed with the Vercel CLI as a production deployment of the project `nuovasolution` (that is how E-FU2 went live on 30.10.). A push to `main` through the Git integration would overwrite the live site, so the fix goes the CLI way on the E-FU2 branch, not through `main`. |
| 2 | Project and deployment id? | Project `nuovasolution` (`prj_1AXMlFaisqoNhvWYfkMDPI5UJL9D`, team `team_xTIb9VCvR1QRDfJCFZnyzjVI`); the production deployment serving nuovasolution.com today: `dpl_4xQt97aFfKzNBpsmXzKxNwZeHTCq` (…-90ov7ev2h-…, 30.10., E-FU2). The fix would be a new production deployment of the same project; its id is known only once it exists and will be named in the signal. |
| 3 | Is the way back possible as described (the previous Vercel deployment set active again)? | **Yes.** The previous production deployment stays in the project's history and can be promoted again (Vercel "rollback" / promote of `dpl_4xQt97aFfKzNBpsmXzKxNwZeHTCq`), which also restores E-FU2 exactly as it is. No DNS change, no domain change. |
| 4 | Is ≤ 1 working day right? | **Yes, once the owner's values are here** (the name with its accents as on the DNI, the full address with number and postcode, the phone that takes calls, and Copy's brand sentence): the four pages are plain text in four files; edit, build, preview deployment on the project, your character-by-character comparison, then the production deployment on the owner's line — inside one working day. The NIF comes on day X as the second mini-deploy, as your table says. |

## What stays out of the fix (as your §5 says)

- The "we do not share your data" sentence and the rest of the privacy text: counsel (L22). Not touched by the fix.
- `/terms` and `/data-deletion` on the **live** site: not part of the fix. On the **new** website both routes exist since
  `394f4ce` (`/es/terms`, `/es/data-deletion`, also `/privacy` and `/legal-notice`, ES and EN) and lead to the existing
  provisional legal pages; they are linked from no public page until counsel's texts replace the provisional ones.

## What I need, in one message from the owner

1. The owner's full name with its accents, exactly as on the DNI.
2. The full address: street, number, postcode, town, province.
3. The phone number that takes calls.
4. (Copy) the sentence "NuovaSolution es una marca de <name>" / "NuovaSolution is a brand of <name>".
5. The line `WEBSITE-KLEINFIX = JA` for the production deployment, when the preview comparison is done.

Until these arrive nothing is edited on the live site. The values go into the four pages by hand (the live site has no E14
block); on the new website they go into the E14 environment block, which is a separate step.
