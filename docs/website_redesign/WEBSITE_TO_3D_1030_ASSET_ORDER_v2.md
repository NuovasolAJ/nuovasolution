# Website → 3D · ONE bundled asset order, v2 (30.10.2026) — replaces `WEBSITE_TO_3D_1026_ASSET_ORDER.md`

**Written for:** the 3D lane (nuova-3d). **From:** the website implementer. **Order:** the owner's binding website closing order of
27.10. §8 (the recordings the website needs, as one bundled hand-over; no second workshop, no separate model build). **Rule:** the
files replace the website's under the same names and are bound to the build by run id, commit and sha256 in the website's return.

## What the website shows today and why it stays an open point

The 3D section shows the 23.10. run: the house turn cut to 20 s with the viewer's room names, buttons and title burnt in, the
empty/furnished pair and the older living-room ride. The owner's order names this as not good enough for marketing; until the
take below is delivered **this asset point stays open in every website return**, the rest of the website does not wait for it.

## The order (one delivery, every item from ONE corrected run named with run id + commit; sha256 per file)

1. **House take, marketing** — recorded from the real viewer, 1920 × 1080 or better, constant frame rate (25 or 30 fps, no dropped
   frames; the website measures it on receipt with `requestVideoFrameCallback`), **no burnt-in room names, menus, title block or
   cursor**; the house closer and larger, no part of the building cut off; the sequence **ground floor first, then the upper floor,
   then a short view of the whole house**; about **10–14 s**, only as long as the views stay understandable; even motion, no
   speed-up to shorten; the first frame already shows the loaded house (no empty or black start). Keep the mandatory mark burnt in
   ("Casa de ejemplo ficticia · grabado del visor real" / EN). ES and EN. Formats: WebM as recorded **and** H.264 MP4
   (yuv420p, ≤ 3 Mbit/s) if ffmpeg exists on the 3D machine, else WebM and the website converts (frame-exact, as it did). Poster: the
   first frame as JPG ≥ 1600 px. Not acceptable as a "quality fix": upscaling or an accelerated stuttering take.
   The website labels the active floor **outside** the video (a caption line under it), so the take needs no label.
2. **Living-room ride** (the delivery step) re-recorded or re-rendered from the corrected house's living room, 8–10 s, same rules,
   same room and camera as the pair.
3. **Empty / furnished pair** from the corrected run, same camera "main", 3000 × 2000 JPG (as the 25.10. README lists).
4. **Whole-house still** without chrome, 1600 × 1000, ES/EN (or one language-neutral frame).

Deliver into `deliverables/website-assets/handoff_2026-10-30/` with the README pattern of 25.10. (run id, commit, QA figures, marks,
what may not be claimed) and a `clips.json` with the step timestamps. The plan keeps its room names on the website (drawn by the
website from the model's specification); the clean model pictures and videos do not need them.

## What the website does not need

A hosted viewer link (Hosting T3), room pictures 14–18, a portrait take, sound, any delivery-time figure (none is published).
