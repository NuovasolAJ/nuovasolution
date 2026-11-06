# Reviewer → Redesign: what the preview protection has to leave intact · 06.11.2026, 19:00 Madrid

**Written for:** Redesign (builds it), cc the owner, Copy, Audit.
**Why:** the owner decided on 06.11. — **the preview goes behind a protection before the next named build** (my §G-7:
the preview now carries the full target state, including "Pruébalo gratis 14 días", "Crea tu cuenta" and
"Conectamos contigo el buzón y el WhatsApp de tu agencia", on a URL that answers to anyone holding the link).
**Two conditions the owner set:** they must be able to open it **on their phone**, and **my checks must keep
running**. Nothing in this file is a code instruction — it is the list of properties I need in order to measure the
build at all. The choice of mechanism is Redesign's.

---

## 1. What I recommend, and why

| Option | The owner on a phone | My probes | Verdict |
|---|---|---|---|
| **Password Protection** (one password per project) + **Protection Bypass for Automation** | one short password, typed once, the cookie survives reload and a new tab | the bypass secret works as a header on every request | **this one** |
| Vercel Authentication (SSO) | needs a Vercel session in the phone's browser, and the owner is not always signed in there | every HTML and asset request 401s without the same bypass secret, so the bypass is needed anyway | only if the owner prefers it — then say so in the return |
| noindex alone (today's state) | — | — | **not a protection**; it is what §G-7 asked to end |

**The password goes to the owner directly** — not through me, not into the repository, not into a commit message, not
into this file.

## 2. What the bypass has to do, or my suites break

| # | Requirement | What breaks without it |
|---|---|---|
| 1 | the bypass works as the **HTTP header** `x-vercel-protection-bypass`, not only as a query parameter, and `x-vercel-set-bypass-cookie` is accepted so one navigation sets the cookie for every subresource | Lighthouse runs as its own process with `--extra-headers`; my fetch probes and the CDP runs set headers. A query-parameter-only bypass cannot be attached to the hundreds of subresource requests a page makes |
| 2 | it covers **every** path, not just the HTML routes: `/api/build`, `/public/media/3d/*`, the icons, the fonts, the CSS, the sitemap | A-1 reads `/api/build` for the build identity; C01 and D02 measure the hero WebPs' real pixel widths; D09/D10 measure the 3D media's duration and frame rate; A-17 fetches the icon. A 401 on a subresource does not look like a 401 in a screenshot — it looks like a missing picture, and I would report a false finding |
| 3 | with the cookie or the header present, the **first response is the real page** — no interstitial, no redirect chain, no injected banner that shifts the layout | A-6 (without JavaScript) and Q-3 (gone from the text, not just hidden) read the **delivered** HTML. An interstitial as the first response makes both meaningless. A banner that pushes the page down breaks A-2 (the first screen at 1366 × 768) |
| 4 | **both views stay separately reachable behind the protection**, and the way to each one is written in the build's return | P-4/P-5: the protection must not become the only difference between the preview and the public view. A protected URL that serves the same HTML either way still fails P-5 |
| 5 | **both projects** get it — the design preview **and** the staging twin — with the secret for each named in the return | half of the suites run against staging; a protected staging without a bypass means I can report nothing about it |
| 6 | `noindex` **stays** on top of the protection | protection and noindex are different things; A-21 reports both separately |

## 3. Where the secret goes

`C:\Users\Usuario\.nuova-secrets\` — one file per project, e.g. `stg_website_preview_bypass.txt` and
`stg_website_staging_bypass.txt`, each holding only the secret. I read from there. **It never appears** in the
repository, in a commit message, in a report, in a screenshot, in a log or in this chat. If the secret is rotated, the
file is overwritten and the return says so.

## 4. What I will report about it (A-21), either way

1. Does the preview answer **without** the bypass? It must not — a 200 without the secret means the protection is not on.
2. Does the owner's path work: password once, then the page, on a phone-sized window.
3. Is `X-Robots-Tag` / `<meta name="robots">` really set to noindex.
4. Does Copy's notice (§14) stand on **every** preview route, ES and EN — the notice stays load-bearing even behind a
   password, because it is what makes the target-state sentences honest.

## 5. One thing to decide in the build, not by me

If Redesign chooses SSO, note it in the return: the owner's phone test then depends on a Vercel session, and my probes
still need the automation bypass. If Redesign chooses a middleware of its own instead of Vercel's protection, the six
requirements of §2 apply unchanged, and §2.3 becomes the one most likely to go wrong.

**Marking:** technical, read-only. No application code written or changed by me. RV6 runs on exactly one build: the
next one Redesign names, with its commit, its fixed URL and both deployment ids.
