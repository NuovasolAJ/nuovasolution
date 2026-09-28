# NuovaSolution website — review previews, start guide

State: branch `website_enterprise_redesign`. Two review deployments exist side by side (audit R24), both
`noindex` (meta tag, `X-Robots-Tag` header, `robots.txt: Disallow: /`), both with a visible band on every
page, both in a **separate Vercel project** so the existing `nuovasolution` project (production = `main`, the
old live site, customer domain) is never touched. noindex is not access control: anyone with the link can open
a preview; that is the point of a review link.

| Deployment | Vercel project | Build mode | Variables | Band | What works |
|---|---|---|---|---|---|
| Design preview | `nuovasolution-design-preview` | `stub` (default) | none | "Preview / Vista previa" | every page; forms and the question box run on demonstration data and say so; nothing leaves the server |
| Staging integration | `nuovasolution-staging-preview` | `staging` | `NUOVA_INTEGRATION_MODE=staging`, `NUOVA_STAGING_TARGET_APPROVED=fflmmzapksycjfdcjdtd`, `NEXT_PUBLIC_SUPABASE_URL=https://fflmmzapksycjfdcjdtd.supabase.co`, `NEXT_PUBLIC_SUPABASE_ANON_KEY=<staging publishable key from the secure store>` (optional Q&A: `QA_INTAKE_URL`, `QA_TENANT_ID`, `QA_TENANT_HMAC_SECRET`) | "Test environment / Entorno de pruebas" | real sign-up, e-mail confirmation, login, agency creation, onboarding writes against the pinned staging project |

## A. Run it locally (any machine with Node 20+)

```
npm ci
npm run build
npm start
```

Then open http://localhost:3000/es (Spanish) or http://localhost:3000/en. The default integration mode is
`stub`: nothing leaves the server, no variables are needed, and nothing you type creates an account.
Staging mode locally: `npm run owner:staging` (reads the staging publishable key from the secure store).

## B. Publish the previews on Vercel

Deployments are **Preview** deployments (`vercel deploy` without `--prod`, or a Git push to the branch),
never production deployments: the stub account surfaces refuse to render when `VERCEL_ENV=production`
(`lib/contracts/mode.ts`, review WR-06), and that protection stays as it is. The stable link is the branch
alias Vercel assigns to the project (`<project>-git-website-enterprise-redesign-<team>.vercel.app`) or an
alias set with `vercel alias`.

1. **Design preview.** In the repository folder: `npx vercel@latest login` (one browser login), then
   `npx vercel@latest link --project nuovasolution-design-preview` (create the project when asked), then
   `npx vercel@latest deploy` (no `--prod`). No environment variables at all.
2. **Staging integration.** `npx vercel@latest link --project nuovasolution-staging-preview`, add the
   variables from the table above for the *preview* environment (`vercel env add <NAME> preview`), then
   `npx vercel@latest deploy`. The key is the staging **publishable** key; no secret key ever goes into the
   site (WEBSITE_HANDOFF_v2). Report the resulting origin to API for the exact redirect allow list entry.
3. **Deployment Protection.** New Vercel projects protect preview deployments with Vercel Authentication by
   default, so a reviewer without a Vercel account would see a login wall. Switch it off **only for these two
   separate projects** (Settings → Deployment Protection → Vercel Authentication: Disabled, or the Projects
   API with `ssoProtection: null`). Never for the existing `nuovasolution` project.
4. Verify logged out, in a private window: every route in ES and EN, reload, language switch, assets, the
   `X-Robots-Tag: noindex` header (`node scripts/e2e/route-scan.mjs` with `BASE=https://…` runs the whole
   list against a deployed origin).

`.vercel/` is ignored by Git; linking a project never touches the repository.

## C. What the design preview shows

- Home, platform overview, the published product pages (AI Sales Agent, Lead Intelligence, Universal CRM,
  Daily Assistant), plans, trial, contact, sign up, log in, welcome, legal placeholders, in ES and EN, with
  the language switch in the header. Capabilities marked `hidden` in the publication register
  (`lib/content/capabilities.ts`) have no page (404), no menu entry and no footer link.
- The question box: shown as a labelled **Demo**; without a backend a question gets the honest
  "We cannot confirm that from here" state. Set `NEXT_PUBLIC_QA_SURFACE=hidden` to remove it entirely.
- Sign up and log in: the forms work as UI; a stub login opens the onboarding with local sample data.

## D. Not in the design preview

Real registration, e-mail confirmation, agency creation, trial, onboarding writes, logo upload, CRM choice
against a backend, payment or checkout. Those run only on the staging integration deployment (or the local
staging build) and are covered by the staging end-to-end suite (`scripts/e2e/staging-e2e.mjs`).
