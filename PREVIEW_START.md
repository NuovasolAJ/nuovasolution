# NuovaSolution website — review previews, start guide

State: branch `website_enterprise_redesign`. Two review deployments exist side by side (audit R24), both
`noindex` (meta tag, `X-Robots-Tag` header, `robots.txt: Disallow: /`), both with a visible band on every
page, both in a **separate Vercel project** so the existing `nuovasolution` project (production = `main`, the
old live site, customer domain) is never touched. noindex is not access control: anyone with the link can open
a preview; that is the point of a review link.

Stable links (branch aliases of the Git-connected projects, updated on every push of the branch; Vercel shortens
long branch names with a hash):

- Design preview: https://nuovasolution-design-preview-git-we-eeb43f-nuovasolajs-projects.vercel.app
- Staging integration: https://nuovasolution-staging-preview-git-w-44e113-nuovasolajs-projects.vercel.app

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

Both projects exist since 2026-09-28 (team `nuovasolajs-projects`), are connected to the GitHub repository and
build every push of `website_enterprise_redesign` as a **Preview** deployment (their production branch stays
`main`, which is never pushed for the redesign). CLI deployments go the same way: `vercel deploy --target preview`,
never `--prod`. The stub account surfaces refuse to render when `VERCEL_ENV=production` (`lib/contracts/mode.ts`,
review WR-06), and that protection stays as it is. Note: the first deployment of a new Vercel project is always a
production deployment; deploy once more with `--target preview`.

What was done, so it can be repeated or audited:

1. `npx vercel@latest login` (device code, one browser confirmation), `vercel project add <name>`,
   `vercel link --yes --project <name>`, `vercel git connect --yes`.
2. Framework preset `nextjs` set through the Projects API (`framework: "nextjs"`); without it the deployment
   serves only static files and every page answers NOT_FOUND.
3. Staging project only: `vercel env add NUOVA_INTEGRATION_MODE preview`, `NUOVA_STAGING_TARGET_APPROVED`,
   `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` (the staging **publishable** key from the secure
   store, piped in, never typed into a chat). No secret key ever goes into the site (WEBSITE_HANDOFF_v2).
4. Deployment Protection: Vercel Authentication switched off **only for these two projects** (Projects API,
   `ssoProtection: null`). The existing `nuovasolution` project keeps its protection; its Git integration also
   builds the branch, behind that protection, and is not used for review.
5. The site has no edge middleware any more: the Vercel runtime loaded Next 14's middleware as a CommonJS
   function and failed (`MIDDLEWARE_INVOCATION_FAILED`). Locale prefixing is a set of `next.config.js`
   redirects (root and the known unprefixed page paths; `Accept-Language: es…` → `/es`, else `/en`).
6. Verification, logged out: `BASE=https://… node scripts/e2e/route-scan.mjs` runs every route in ES and EN,
   the hidden slugs (404), the `X-Robots-Tag: noindex` header and meta, robots.txt, sitemap, a poster asset, the
   four product clips (they have to answer as `video/mp4`) and a legacy redirect against a deployed origin.
7. Staging project only, since 2026-09-29 (question box on the product assistant): `QA_INTAKE_URL`,
   `QA_TENANT_ID`, `NEXT_PUBLIC_QA_SURFACE=public` and, stored as a **Secret**, `QA_TENANT_HMAC_SECRET` piped
   from the secure store (`stg_webqa_hmac_stg_web_product_qa.txt`). The secret is used by the site's server to
   sign the forwarded question and never reaches the browser; the design project has none of these.
8. `.vercelignore` leaves out documentation, scripts and video files in the repository root. The product clips
   under `public/media/` are part of every deployment.

`.vercel/` and `.env*.local` are ignored by Git; linking a project never touches the repository.

## C. What the design preview shows

- Home, platform overview, the published product pages (AI Sales Agent, Lead Intelligence, Universal CRM,
  Daily Assistant), plans, trial, contact, sign up, log in, welcome, legal placeholders, in ES and EN, with
  the language switch in the header. Capabilities marked `hidden` in the publication register
  (`lib/content/capabilities.ts`) have no page (404), no menu entry and no footer link.
- The question box: shown as a labelled **Demo**; without a backend a question gets the honest
  "We cannot confirm that from here" state. Set `NEXT_PUBLIC_QA_SURFACE=hidden` to remove it entirely.
  (On a staging or live build the box is hidden unless that deployment sets `NEXT_PUBLIC_QA_SURFACE=public`.)
- The social screens `/social`, `/social/post`, `/social/inbox`, `/social/settings` after the stub login, with
  synthetic fixtures (`?case=empty` for a fresh workspace). On the staging preview they read the signed-in
  agency's real state and send nothing.
- Sign up and log in: the forms work as UI; a stub login opens the onboarding with local sample data.

## D. Not in the design preview

Real registration, e-mail confirmation, agency creation, trial, onboarding writes, logo upload, CRM choice
against a backend, payment or checkout. Those run only on the staging integration deployment (or the local
staging build) and are covered by the staging end-to-end suite (`scripts/e2e/staging-e2e.mjs`).
