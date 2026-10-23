# Website → API · 2026-10-19 · a build against the staging backend for the onboarding browser test

**Written for:** API (R19 A7) and Audit (R19 W1: "clarify with API whether a build against the staging backend, not
the stub, is possible for the onboarding browser test"). **From:** Website Implementer. No secret is named here.

## What the website can do today

The website has one integration switch, read at build time (`lib/contracts/mode.ts`, `.env.example`):

| Mode | What the server talks to | Where it runs today |
|---|---|---|
| `stub` | nothing; every contract call is answered locally by a labelled stub | the design preview (`nuovasolution-design-preview`), every build named to the owner |
| `staging` | one pinned staging Supabase project, named in `NUOVA_STAGING_TARGET_APPROVED`; any other target is refused at runtime | the staging preview project (`…-staging-preview-…`), held since `486bfe8` via `.staging-hold` |
| `live` | production; refused unless the owner's release value is set | nowhere |

A staging build is therefore possible without new code: the same commit, built in the staging preview project with
`NUOVA_INTEGRATION_MODE=staging`, the approved target ref and the publishable key (never a service key: the website
holds no secret key, every user action is authorised by the user's own token). The onboarding path (`/signup`,
`/onboarding`, the BFF routes under `app/api/bff/`) then runs against the real staging functions.

## What the website needs from API before that build is named

1. **The target and the approval line.** The staging project ref to pin and the owner's per-target approval
   (MASTER_GOVERNANCE §14.5); the value goes into the Vercel project environment of the staging preview, not into the
   repo.
2. **The fixtures for the browser test.** One test agency whose state lets the browser reach the onboarding steps
   (register → profile → channels → CRM choice) without an external CRM, and, if A7 wants it, one with an external
   CRM in the certified set. Who the reviewer logs in as, and that nothing in that agency is a real customer.
3. **The hold.** `.staging-hold` stays until the owner's word; the staging build is then one named deployment, not
   the alias, and the website reports its commit at `/api/build` (added on `fdfd30e`; final build `deb9b66`) so the reviewer measures the
   build it was given.
4. **What API wants read back.** The browser test is a website-side proof of the path, not an acceptance of the
   backend; the acceptance stays with Reviewer on the named staging deployment.

## What the website delivers on its side

- The build mark: `/api/build` → `{commit, ref, deployment, env, mode}` and `<meta name="nuova-build">` on every page.
- The onboarding screens unchanged from `4110566`; nothing in the R19 build touches the BFF.
- The named deployment and the fixture agency in the return, once API names 1 and 2.

Reply in `docs/website_redesign/` or in governance as you prefer; a one-line signal with the target ref's approval
state is enough to start.

## Delivered 2026-10-23 (R20 W3)

The staging hold is released in `cba9ca6`; the staging preview project built the same commit against the pinned staging
target with the variables it already held in Vercel (none named here, none in the repo):

| | |
|---|---|
| Staging build (final) | `a76e6e1` / `dpl_3n3TwzpayrxptkGYNuWCih8qBJjW` · https://nuovasolution-staging-preview-j7f6e9t1u-nuovasolajs-projects.vercel.app (the first one of the day, `cba9ca6` / `dpl_7p5QvPY37bBjC5euejaQfrJaZMKp`, differs only by one client component of the social screen) |
| `/api/build` | `{"commit":"a76e6e1a…","deployment":"dpl_3n3TwzpayrxptkGYNuWCih8qBJjW","env":"preview","mode":"staging"}` |
| Ribbon | `data-env="staging"` on every page |
| Routes | `/es/signup` 200 · `/es/login` 200 · `/es/onboarding` 307 → login (gate) |
| Presentation build (stub), separate | `a76e6e1` / `dpl_GLRzbYXujgTNW1MvS6TboEyF889m` · https://nuovasolution-design-preview-n67lo7zbl-nuovasolajs-projects.vercel.app |

No account was created and nothing was sent from this session: the E28 browser test (two runs, the fixture agency of §2) is
API's and the Reviewer's on exactly this staging deployment. The staging project now builds on every push of the branch
again; if a hold is wanted for a later state, it is one commit that re-adds `.staging-hold`.
