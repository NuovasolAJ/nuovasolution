# WEBSITE COPY — return record, continuation round 2026-09-23

**State:** `2026-09-23_CONTINUATION` · **Lane:** Website Copy / Product Truth
**Branch:** `website_enterprise_redesign` · **Written:** 2026-09-23
**Status:** author's record. Not independently reviewed.

---

## 1. Signals

```
REDESIGN_COPY = DELIVERED
AUTH_COPY = DELIVERED
OLD_LIVE_SITE_HOTFIX_COPY_v2 = DELIVERED
COUNSEL_PACKAGE_V2 = DELIVERED
```

No signal claims implementation, testing or legal approval. Every one of them means: the text exists
and is ready for the lane that owns the surface.

## 2. Files in this round

| File | Deliverable | Who acts on it |
|---|---|---|
| `PRODUCT_TEXTS_C3_v1.md` | REDESIGN_COPY | Website Implementer |
| `AUTH_COPY_v1.md` | AUTH_COPY | Website Implementer, and API for §6 |
| `OLD_LIVE_SITE_HOTFIX_COPY_v2.md` | hotfix v2 | Website Implementer, then Reviewer |
| `COUNSEL_PACKAGE_v2.md` | COUNSEL_PACKAGE_V2 | Owner, then counsel |

`COUNSEL_PACKAGE_v1.md` is **not** superseded. It remains the body of legal text; v2 is the decision
layer and states this in its §0.

## 3. What each file settles

**REDESIGN_COPY.** Nine home sections, each answering one customer question with a heading of eight
words or fewer, EN and ES. Navigation renamed to what the visitor gets, not what the system is.
Pricing page carries no price: `⟦PRICING_AUTHORITY⟧` stays open and the invoice path is described in
four steps, with the sentence that an invoice does not activate anything and a confirmed payment
does. The question box loses the grounding claim and "improve our replies", because neither is
contracted.

**AUTH_COPY.** Sign up, the check your e-mail state, all six confirmation results, login, the
register step, invitation, and the confirmation and invitation e-mails for API. Three changes to
what is built: the payment promise stops appearing twice, the language field leaves sign up because
its meaning is undecided while the register step already asks the question under a contracted label,
and the privacy sentence keeps the two literal strings the render code depends on.

**Hotfix v2.** All thirteen reviewer claims, the `/live-demo` headline and alert snippet, the score
ring and phone chrome, the dead `data-cal-link`, and an acceptance list that names the ten literal
strings that must return no match.

**COUNSEL_PACKAGE_v2.** Eleven decision sheets with channel, language, version, data flow and what
each blocks. Eight technical unknowns separated out and assigned to API, Hosting and Social with a
named closing signal each. Priority led by the one unapproved sentence that reaches real customers
today.

## 4. Corrections made to my own earlier files this round

1. `PRODUCT_TEXTS_C3_v1.md`: the question box rate limit line said "Wait a minute". No retry window
   is contracted anywhere, so the wait is removed. Same rule as the auth rate limit.
2. `COUNSEL_PACKAGE_v2.md`: my first draft of sheet D8 quoted a storage sentence that is not the one
   in C3. Replaced with the two real lines, storage and AI.
3. `AUTH_COPY_v1.md`: the regex dependency is at `auth-forms.tsx:107`, not 108.

## 5. Things another lane must do, which I did not do

1. **Application code.** Every change described in these four files is applied by the Website
   Implementer. I wrote no code, including the Google Sheets correction in `COUNSEL_PACKAGE_v2.md`
   §D7.1, which is a copy change inside
   [lib/content/connect-notice.ts](lib/content/connect-notice.ts) and is owed to counsel before the
   notice is reviewed. That file today describes the data flowing in the wrong direction: it says
   Nuova reads enquiries from the sheet, while the sheet is a copy sink and the same file's
   disconnect row already says leads stop going to it.
2. **API** owes the seven items in `AUTH_COPY_v1.md` §8 and the four addressed to it in
   `COUNSEL_PACKAGE_v2.md` §3, above all `DISCLOSURE_FAIL_CLOSED`: a channel with no approved text
   currently falls back to the e-mail text instead of refusing to send.
3. **Owner** owes the four decisions in `COUNSEL_PACKAGE_v2.md` §4, starting with the legal entity,
   because four documents cannot be finished without it.

## 6. What I did not touch

No application code, no other lane's files, no status document belonging to another lane, no commit
that includes a file I did not write. No git history change, no push, no merge, no deployment. No
n8n, Supabase, webhook, credential or external request. The working tree also holds the
Implementer's concurrent changes to `app/globals.css`, `components/ui/button.tsx`,
`tailwind.config.ts` and the design probe; those are not staged by me.
