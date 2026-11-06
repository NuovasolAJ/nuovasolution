# Redesign → API: does the website still use the production secret key `a8e25047`? · 06.11.2026

**Written for:** API (the owner of `API_SCHLUESSEL_PROD_1106_v1.md`), cc the owner, Audit, Hosting. Read-only; no value of any key stands
here or anywhere in the website's repository.

## The answer: no

The website does not use the Supabase production secret key `a8e25047` (the "default secret" of the project), and never did on the
redesign branch. Checked on 06.11.2026:

| Where | Checked how | Result |
|---|---|---|
| The website's code (`website_enterprise_redesign`, HEAD a223d62 + the working tree of the 06.11. round) | full-text search for the key id across `app/`, `lib/`, `components/`, `scripts/`, `docs/`, the config files | no occurrence |
| The local environment files of the website | `.env*` in the repository folder: only `.env.example` exists; no `.env`, `.env.local` or `.env.production` here | no occurrence |
| Vercel, project `nuovasolution-design-preview` (`prj_var3eWmjB9PAj2zY4WsssbFzUFTY`) | the project's environment variables by the API (names only) | no Supabase key of any kind (the stub build needs none) |
| Vercel, project `nuovasolution-staging-preview` (`prj_ZrLV8AxREFdz04Fj91riy0z2vfk1`) | the same | `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` (the staging project `fflmmzapksycjfdcjdtd`, a publishable key), `NUOVA_INTEGRATION_MODE`, `NUOVA_STAGING_TARGET_APPROVED`, `QA_INTAKE_URL`, `QA_TENANT_ID`, `QA_TENANT_HMAC_SECRET`; no production value, no secret key |
| Vercel, project `nuovasolution` (the live site, old code on `main` / `efu2-prueba-objeto`) | the old site has no backend call at all (static pages, a `mailto:` contact) | no key |
| The website's runtime rule | `lib/contracts/env.ts`: `SUPABASE_SERVICE_ROLE_KEY` and `SUPABASE_SECRET_KEY` are **refused at runtime** (`secret_key_not_allowed`); every backend call is made with the user's own session token through the BFF, on the publishable key only (WEBSITE_HANDOFF_v2 §0) | a secret key cannot be used by this code even if someone set it |

The website has never had a production Supabase target either: the only project reference the staging build may talk to is pinned in
code (`STAGING_SUPABASE_REFS`), and a live build refuses to start without the owner's release token.

## What API can do with that

The "website" row of the register (`API_SCHLUESSEL_PROD_1106_v1.md` §Kurz, "die letzte offene Prüfung seit dem 21.09. ist die Website")
is closed on the website's side: **`a8e25047` can be revoked without touching the website.** Nothing on the website has to change
when it is revoked; nothing on the website has to be rotated with it. If API wants the same check repeated on the day of the
revocation, say so and I run the search again on the then-current HEAD and the then-current Vercel environment.

## Not checked here

n8n credentials, the `tenant-api` edge function, the `.env.production` in the system repository's folder: not the website's, not
read by me.
