# META REVIEW COPY v1 — screencast narration bound to real actions, and brand files for the app

**State:** `2026-09-22_SYNC_0900Z` · **Written:** 2026-09-22 · **Copy version:** `meta-review-v1`
**Lane:** Website Copy / Product Truth / Director → **Social** (owns the Meta submission)
**Status:** DRAFT by its author, not independently reviewed. Nothing here is submitted.

> Meta reviews each permission from a screen recording of the real product doing the job. This
> file gives Social the narration and on screen caption for each clip, and binds every line to
> (1) the permission it demonstrates, (2) the concrete user action on screen, (3) whether that
> action works today. **A line whose action does not work today may not be recorded.** The
> scripts themselves are Social's (`governance/META_SCOPE_MATRIX_v5.md` §2); this file adds words,
> not scope.

## 0. Where things stand

| Item | State | Source |
|---|---|---|
| Submission | none; `SUBMIT_READY = NO`, 0 of 8 review assets ready | `SOCIAL_SYNC_0921_RETURN_v1.md` |
| Connected Instagram or Facebook account | none; Meta provider unavailable; adapter built without HTTP calls; 0 Meta webhooks ever received | same |
| Recording rule | clips are recorded only when the flow works with a real authorised test account | same §6.1 |
| Recording spec | at least 1080p, window width 1440 px or less, cursor visible, one clip per permission, narration in English | Meta submission guide as cited in `SOCIAL_SYNC_0921_RETURN_v1.md` §5.1 (stricter than the 720p in the matrix) |
| Privacy, terms, data deletion URLs | old live site: privacy short and without Meta, `/terms` 404, `/data-deletion` 404; drafts ready in `COUNSEL_PACKAGE_v1.md` §B to §D | Meta research 2026-09-22 |
| Business verification | status unknown; owner read `META_BV_STATUS` pending | Social |
| WhatsApp track | the launch model (central number, own WhatsApp Business account) needs Standard access only per Social; the 2026-08-10 Tech Provider pack applies only if that model is chosen | `SOCIAL_SYNC_0921_RETURN_v1.md` §5.3 |

**Consequence:** every clip below is **not recordable today**. The narration is ready so that
recording can start the day the flow works, without anyone writing words under time pressure.

## 1. Rules for every clip

1. Say only what the viewer sees happen. No claim about results, reach, speed or AI quality.
2. Name the permission exactly as Meta does, once, when it is used.
3. State the restraint rules where the clip shows messaging: the business replies only after the
   person writes; a private reply to a comment is one message; further messages only if the person
   answers, within 24 hours.
4. Show test assets only: the reviewer test user, the business's own test Page and Instagram
   professional account. No real customer, no owner private number.
5. On screen captions: short, sentence case, no dashes.

## 2. Narration and captions per clip

Status column: **works today** means the action can be performed now with a real authorised
account. Every row is **No** until Social's closing signal names the proof.

### Clip A — `instagram_basic`, `instagram_manage_comments`, `pages_read_engagement`

| # | On screen action | Caption | Narration | Works today |
|---|---|---|---|---|
| A1 | Test user signs in to Nuova, starts Facebook Login for Business; consent dialog shows the three scopes | Connect Instagram | The agency connects its own Instagram professional account. The consent dialog lists instagram_basic, instagram_manage_comments and pages_read_engagement. | No |
| A2 | Nuova lists the account's media | Your posts | instagram_basic lets Nuova show the agency its own posts, so it knows which listing a comment belongs to. | No |
| A3 | A second test account comments on a test post | A comment arrives | Someone asks about the property in a comment. | No |
| A4 | Nuova shows the comment and its classified intent | Comment understood | Nuova reads the comment and shows the agency what the person is asking. | No |
| A5 | Nuova posts a public reply; the reply appears on Instagram | Public reply | With instagram_manage_comments the agency replies publicly on its own post. pages_read_engagement is required by these endpoints under Facebook Login. | No |

### Clip B — `instagram_manage_messages`

| # | On screen action | Caption | Narration | Works today |
|---|---|---|---|---|
| B1 | The commenter sends the business a direct message | The person writes first | The conversation starts because the person writes to the business. | No |
| B2 | The message arrives in Nuova through the messages webhook | Message received | Nuova receives the message through the Instagram messages webhook. | No |
| B3 | The agent replies within 24 hours; reply arrives on Instagram | Reply within 24 hours | The agency replies inside the 24 hour window. Nuova never starts a conversation. | No |
| B4 | Screen shows the one private reply rule | One private reply | A private reply to a comment is a single message. The conversation continues only if the person answers. | No |

### Clip C — `instagram_content_publish`, `pages_manage_posts`

| # | On screen action | Caption | Narration | Works today |
|---|---|---|---|---|
| C1 | A property record with its real photos | The agency's own listing | The agency publishes its own property, with its own photos. | No |
| C2 | Generated caption; the grounding check refuses an invented claim | Checked against the listing | The caption is checked against the listing. A statement the listing does not support is refused. | No |
| C3 | Publish to Instagram; post appears | Published to Instagram | instagram_content_publish creates the post on the agency's account. | No |
| C4 | Publish to the Facebook Page; post appears | Published to the Page | pages_manage_posts publishes the same property on the agency's Facebook Page. | No |

### Clip E — `pages_show_list`, `pages_manage_metadata`, `business_management`

| # | On screen action | Caption | Narration | Works today |
|---|---|---|---|---|
| E1 | During setup, Nuova lists the agency's Pages | Choose your Page | pages_show_list shows the Pages the agency manages, so it can choose the right one. | No |
| E2 | Agency selects a Page and its linked Instagram account | Page and Instagram linked | The agency chooses one Page and the Instagram account linked to it. | No |
| E3 | Nuova subscribes the Page to comments and messages | Notifications switched on | pages_manage_metadata subscribes this Page, and only this Page, to comment and message notifications. | No |
| E4 | Business asset provisioning is shown | Access for this business | business_management is used to set up access for the agency's own business assets. | No |
| E5 | Agency disconnects; the connection is removed | Disconnect | The agency can disconnect at any time. Notifications stop and access is removed. | No (staging only: `sg_provider_revoke`) |

### Clip D — `leads_retrieval`, `pages_manage_ads` (paid lane, gate G2)

Narration drafted only on request of the paid lane; the lane is blocked by gate G2 and not part of
the social submission.

### Clips F and G — `pages_manage_engagement`, `pages_messaging`

Not drafted: Social's recommendation for owner decision G9 is not to request these permissions.
Drafted on request if the owner decides otherwise.

## 3. Closing signal per clip

A clip becomes recordable when Social records, for that clip, the real authorised test account,
the environment, the commit or workflow version, and one successful run of every step marked No
above. Signal: `META_CLIP_<letter>_RECORDABLE = YES` with the evidence path. Recording before that
signal would show Meta a flow that does not work, which is both a review failure risk and a truth
violation.

## 4. Brand and icon files (existing; no new design)

| Use | File | Size | Note |
|---|---|---|---|
| **Official logo, light backgrounds** | `Nuovasolution/public/images/logo-tight.png` | 1600 × 320, transparent | the current official lockup, used by the rebuilt site |
| **Official logo, dark backgrounds** | `NuovaSolution-n8n-system/vercel-proxy/public/logo-white.png` | 1600 × 320, transparent | white version of the same lockup |
| **App icon source (Meta needs 1024 × 1024)** | `Nuovasolution/public/images/nuova-icon.png` | 2000 × 2000, transparent | circular NS monogram; scale to 1024 × 1024 on a solid background with tighter padding. Production of the final file: Social or the Implementer, from this file only |
| Icon already at 1024 | `Nuovasolution/public/images/logo-icon.png` | 1024 × 1024, opaque | same monogram, visible compression and slightly off centre; fallback only |
| Wide lockup with padding | `Nuovasolution/public/images/nuova-logo.png` | 3000 × 1000 | light variant |
| Legacy, do not use | `Nuovasolution/public/images/logo-full.png` | 1536 × 1024 | older letterforms on off white |
| Favicon | `Nuovasolution/app/icon.svg`, `app/icon.png` | 32 viewBox, 512 × 512 | a geometric "N", **not** the NS monogram; not suitable as the Meta app icon |
| Email logo in prod | Supabase Storage `agency-branding/nuovasolution/logo/logo-512.png` | shown at 160 × 32 | black only, no dark mode protection (finding F6); the light and dark pair above is the fix source |

Identical copy: `NuovaSolution-n8n-system/preview/logo-tight.png` (same file as the official logo).
No SVG lockup exists.
