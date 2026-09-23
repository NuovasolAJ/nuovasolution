# NuovaSolution website — design preview, start guide

State: branch `website_enterprise_redesign`, code `e39ad06` (return `ca81034`). Demonstration build only:
synthetic data, no backend, forms and the question box are labelled "Demonstration only" / "Solo demostración".
This is not a registration, payment or agent proof.

## A. Run it locally (any machine with Node 20+)

```
npm ci
npm run build
npm start
```

Then open http://localhost:3000/es (Spanish) or http://localhost:3000/en. The default integration mode is
`stub`: nothing leaves the server, no variables are needed, and nothing you type creates an account.

## B. Publish an isolated Vercel preview (owner or reviewer with a Vercel account)

The repository is linked to the Vercel project `nuovasolution` (production = `main`, the old live site).
A push of this branch to GitHub creates a preview deployment of the new site there automatically. Two things
decide whether an outside reviewer can open it:

1. **Deployment Protection** of that project. If "Vercel Authentication" is on for previews, only Vercel team
   members can open the link. Do not switch it off for the existing project; instead create a separate project:
   Vercel → Add New Project → import `NuovasolAJ/nuovasolution` → name `nuovasolution-design-preview` →
   Settings → Git → Production Branch = `website_enterprise_redesign` → Settings → Deployment Protection →
   Vercel Authentication: Disabled. No environment variables at all (the build then runs in `stub` mode).
   The stable link is `https://nuovasolution-design-preview.vercel.app` (or whatever name Vercel assigns).
2. **No environment variables** on that separate project. `NUOVA_INTEGRATION_MODE` unset = stub. A staging or
   live variable would change what the preview does and is not part of this design preview.

Alternative without the dashboard: from this folder, `npx vercel@latest login`, then
`npx vercel@latest --prod --yes` after `npx vercel@latest link` to the new project. Nothing in this branch reads
a secret; do not add one.

## C. What the preview shows

- Home, platform overview, nine product pages, plans, trial, contact, sign up, log in, welcome, legal placeholders,
  in ES and EN, with the language switch in the header.
- The question box: the button opens the window; in stub mode a question is answered with the honest
  "We cannot confirm that from here" state, because no backend is connected.
- Sign up and log in: the forms work as UI and show the demonstration band; a stub login opens the onboarding
  with local sample data (clearly labelled).

## D. Not in this preview

Real registration, e-mail confirmation, agency creation, trial, onboarding writes, logo upload, CRM choice
against a backend, payment or checkout. Those run only in a staging build (`npm run owner:staging`, staging
publishable key from the secure store) and are covered by `docs/website_redesign/WEBSITE_SYNC_0923_RETURN_v1.md`.
