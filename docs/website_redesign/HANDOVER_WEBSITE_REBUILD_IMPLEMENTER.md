# HANDOVER — WEBSITE REBUILD IMPLEMENTER

**Written:** 2026-09-18, for the machine change. Confirms the saved local working state of this
chat only. It is not a statement about a complete USB backup or a successful restore; Hosting
coordinates that.

> Nothing here is production ready. No staging call was ever made. No push, no merge, no
> deployment. Completion wording for everything below: implemented and awaiting independent
> technical and final audit.

---

## 1. Role and workspace

| | |
|---|---|
| **Role** | Website rebuild implementer for NuovaSolution (earlier in the same chat: Product Truth, Package Entitlement and Claims Guardian; author of `PRODUCT_TRUTH.md` and `CLAIMS_MATRIX.md`) |
| **Workspace** | `C:\Users\49176\OneDrive\Desktop\Nuovasolution` (the SEPARATE website repository; lives inside OneDrive) |
| **Never touched** | the backend repository, n8n, Supabase, Vercel, Meta, production, credentials |
| **Canonical states consumed** | `2026-09-08_CLOSEOUT_1220Z` (full rebuild), `2026-09-09_SYNC_1310Z` (incremental update) |

## 2. Git

| | |
|---|---|
| Branch | `website_enterprise_redesign` |
| HEAD at handover | the commit that adds this file; its parent is `8e782f922c098b7c03648ccfb40192c3ba87819d` (full rebuild) |
| Before that | `550cf73` hygiene, `be31b17` truth and claims v2 |
| Remote | `origin` = GitHub `NuovasolAJ/nuovasolution`. **The branch has no upstream and was never pushed.** 26 commits ahead of `origin/main` before this file |
| Tracked working tree | clean at handover |

**Consequence for the move:** every commit on this branch exists only on this machine. A copy of
the folder must include the `.git` directory, or the branch must be pushed by the owner's
decision. This chat did not push.

## 3. Work done, with evidence

1. **Truth and claims** (`PRODUCT_TRUTH.md`, `CLAIMS_MATRIX.md`): written, reconciled against
   backend export v1 (Wave A1, `7513e5c`) and export v2 plus the AF addendum (Wave V1, `be31b17`).
2. **Hygiene** (`550cf73`): `.next/`, `tsconfig.tsbuildinfo`, `.mcp.json`,
   `.claude/settings.local.json` untracked; legacy static site and dead components removed; the
   owner's untracked `/v2` concept moved byte for byte to the ignored `_archive/`.
3. **Full local rebuild** (`8e782f9`, 93 files): tokens, Inter, preserved logo, one solid header,
   `/en` and `/es` routes, capability registry with canonical statuses, 62 static pages, typed
   export v2 contracts, stub mode by default, BFF routes, Q&A route with
   `ts|nonce|body_sha256` HMAC signing, onboarding wizard with six stub cases, capture harness.
4. **2026-09-09 sync applied:** pending acceptance never worded as available
   (`final_acceptance` = "Built, final acceptance pending", public flag off); footer legal links
   gated behind `NEXT_PUBLIC_LEGAL_LINKS=approved`; Supabase consumer signal reported.

**Evidence on record** (details in `WEBSITE_REBUILD_STATUS.md` §6): `tsc --noEmit` exit 0;
`next lint` clean; `next build` exit 0; served asset hashes verified against `.next/static`;
HTTP contract checks passed; no secret-shaped string in the client bundle; 212 captures.

**WEBSITE_SUPABASE_CONSUMERS:** none active. Dormant server-only readers of `SUPABASE_URL` and
`SUPABASE_ANON_KEY` in `app/api/bff/auth/login`, `app/api/bff/auth/logout`, `lib/contracts/bff.ts`,
`lib/contracts/server.ts`, all behind the staging acknowledgement gate. `SUPABASE_SERVICE_ROLE_KEY`
is a declared name only. The website never consumed a Supabase key; legacy-key disablement has no
effect on it.

## 4. Open tasks, blockers, next step

**Next required step:** the independent website review (design in both languages, mobile 360 to
430 px, navigation, trial copy, onboarding rendering). It has not started. It gates staging.

| Open | Blocked on |
|---|---|
| Staging integration | `governance/WEBSITE_HANDOFF_v1.md` not delivered; independent review not passed |
| Onboarding fields for booking mode, calendar, hours, handoff rules | `onboarding_readiness(client_id)` contract not in this repository. The renderer shows only returned fields |
| Q&A intake header and field names, response shape | `Website_QA_Intake_v1` document |
| Data deletion beyond a static page | backend DSAR authority contract |
| Testimonial upload surface | media pipeline (MF-01); no upload control is rendered |
| Captcha on signup | provider decision (MF-08) |
| Any price | no pricing authority exists (MF-10) |
| Footer legal links, public release, CTA releases | owner decisions |
| Legal text on four routes | counsel |
| Videos, photography, product captures | recording; all nine video slots and every image slot are labelled pending frames |
| CI guard for retired hosts and secret-shaped strings | not yet wired |
| `CLAUDE.md` | still carries the superseded brief; owner approval required to edit |

**Known small items for whoever continues**

- Five stray PNG files sit untracked in the repository root, produced by one failed inline
  capture command of this chat (their names contain `$2` and `${name}`). They are junk, not
  results. Left in place because the move instruction says delete nothing. Safe to delete.
- The capture script's per-shot ceiling of 60 s was too short for ten heavy captures on this
  machine; they were retaken with 90 to 170 s. Raising the ceiling in
  `scripts/screenshots.sh` is a reasonable follow-up.
- Header: the first page opening is designed for a transparent header state in
  `LUXURY_UX_MEDIA_SYSTEM.md`; the build uses one solid header everywhere, a deliberate
  simplification after a defect on ivory openings. A reviewer may want the two-state version back.

## 5. Important local files

**Committed and therefore in `.git`:** all of `app/`, `components/`, `lib/`, `scripts/`,
`middleware.ts`, configs, `.env.example` (names only), every document in `docs/website_redesign/`
listed by `git ls-files`.

**Untracked, NOT in git, must be copied by hand**

| Path | What |
|---|---|
| `docs/website_redesign/backend_handoff/WEBSITE_INTEGRATION_HANDOFF_EXPORT_v1.md` | historical backend export |
| `docs/website_redesign/backend_handoff/WEBSITE_INTEGRATION_HANDOFF_EXPORT_v2.md` | **current technical authority** |
| `docs/website_redesign/backend_handoff/…_v2_AF_ADDENDUM_v1.md` | addendum to v2 |
| `WhatsApp Video 2026-07-07 at 18.30.48.mp4` (root) | owner's media file |

These three backend exports are the owner's files. Confirmed free of secrets by full read. Not
committed by this chat because location and visibility are the owner's decision.

**Ignored, NOT in git**

| Path | What | Needed on the new machine |
|---|---|---|
| `screenshots/` | 212 review captures, desktop and mobile, all routes and six onboarding cases | yes, if the reviewer should see them without re-running; otherwise reproducible |
| `_archive/` | the owner's former `/v2` concept (`app-v2`, `components-v2`, `lib-os`) | yes, it exists nowhere else |
| `.mcp.json` | local MCP server config. **Contains a credential. Never commit, never paste.** Treat per the owner's rotation decision | recreate rather than copy, if rotated |
| `.claude/settings.local.json` | local Claude Code permissions | optional |
| `.vercel/` | Vercel project link (ids only) | optional, `vercel link` recreates it |
| `.next/`, `node_modules/`, `tsconfig.tsbuildinfo` | build output and dependencies | no, regenerate |

**No 3D assets** (.blend, GLB, plans, textures, models, renders) exist in this workspace. The
website only carries a labelled pending slot for Property Experience.

**Local integration configuration:** there is no `.env` file of any kind. The site runs in stub
mode by default. Staging requires `NUOVA_INTEGRATION_MODE=staging`, `NUOVA_API_BASE` and
`NUOVA_STAGING_ACK=I_HAVE_WEBSITE_HANDOFF_V1` together; none is set anywhere.

## 6. Programs, connections, configuration paths (no secret values)

| Need | Detail |
|---|---|
| Node.js | v24.14.1 used here; npm 11.11.0. `npm install` restores `node_modules` from `package-lock.json` |
| Framework | Next.js 14.2.35, React 18, TypeScript 5.5, Tailwind 3.4. No package was added by the rebuild |
| Fonts | Inter via `next/font/google`: **the first build on a new machine needs internet** to fetch the font files |
| Git | with Git Bash; the capture script is Bash and uses `cygpath` and `timeout` |
| Browser for captures | Microsoft Edge at `C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe`; override with the `EDGE` variable |
| Run locally | `npm install`, `npx next build`, `npx next start -p 3005`, then `bash scripts/screenshots.sh` |
| MCP connections | `n8n-mcp` is configured in `.mcp.json` but **was never used by this chat** and repeatedly failed to connect. Not required for the website. Google Drive and Claude Docs connectors were available and unused |
| Claude Code memory | `C:\Users\49176\.claude\projects\c--Users-49176-OneDrive-Desktop-Nuovasolution\memory\` (`MEMORY.md`, `project_nuovasolution_website.md`, `project_n8n_environment.md`). Outside the workspace; the folder name encodes the workspace path, so a different path on the new machine means a different memory folder |
| Windows caveat | stopping a shell does not stop the `next start` child it spawned. Kill by command line match before rebuilding, and verify served asset hashes against `.next/static`, or a stale server will serve old HTML against a new build |
| OneDrive caveat | the repository is inside OneDrive; git and file scans are slow and may time out. Let OneDrive finish syncing before copying, or pause it during the copy so `.git` is not captured half-written |

## 7. Session

| | |
|---|---|
| Session ID | `937de8ae-6978-4532-9587-53e5dd2d3a11` |
| Transcript | `C:\Users\49176\.claude\projects\c--Users-49176-OneDrive-Desktop-Nuovasolution\937de8ae-6978-4532-9587-53e5dd2d3a11.jsonl` (about 15 MB at handover, verified present) |
| Whether the transcript resumes on another machine | UNKNOWN. It depends on the same workspace path and Claude Code's own behaviour |

## 8. Coordination state known to this chat

- Reports sent to the owner: Supabase consumer signal; final rebuild report with commit refs,
  page inventory, captures, reviewer status, staging evidence, pending contracts, release gates.
- Returns still outstanding toward this chat: `WEBSITE_HANDOFF_v1.md` from API/CRM; the
  independent review result; owner decisions on footer legal links, CTA releases, public release;
  counsel text.
- Decisions in force: stub mode by default; staging only after handoff and review; no public
  deployment without the owner's release decision; legal placeholders are local scope only;
  3D is premium on request and never blocks readiness; no price anywhere.
