# MEDIA SOURCES 1010 — every photograph, render and film on the home page, with its origin and licence

**State:** `2026-10-10` · **Lane:** Website Implementer → Audit, Owner. Master order 2026-10-10 §1, §2, §6, §7:
licensed or clearly synthetic pictures only, rights stated, no real listing, no real person.

## 1. Photographs (Pexels, free licence)

Source: pexels.com. Licence: the Pexels licence (read 2026-10-10): free for commercial use, modification allowed,
attribution not required; unaltered copies may not be sold, people and brands may not be implied to endorse. Every
photograph was resized and re-encoded as WebP with `scripts/design/media-prepare.mjs` (browser canvas, no library).
None shows a listing of any agency; on the site each one is labelled "Foto de muestra" / "Sample photo" where it stands
for a listing. The locations are **not** the Costa del Sol unless stated; the pictures stand for a kind of place, not for a
property.

| File (public/media/world/) | Pexels id | Photographer | Stated location | Used as |
|---|---|---|---|---|
| `hero-room-1800.webp`, `hero-room-900.webp` (2026-10-30 to 2026-11-02, files removed) | 12715501 | Keegan Checks | none stated | was the hero's depth layer (the owner's order of 30.10., point 1); withdrawn with the owner's review of 02.11. (no photograph in the hero). The same photograph stays in use as `listing-est204.webp` (row above). Before it: `hero-dusk-1400.webp`, `hero-dusk-800.webp` (10393597, Soontorn B, a coast at dusk, 2026-10-10 to 2026-10-30; files removed) |
| `listing-est204.webp` (since 2026-10-12) | 12715501 | Keegan Checks | none stated | the example listing EST-204: a living room opening onto a terrace with the sea behind |
| `listing-est231.webp` (since 2026-10-19) | 10135435 | Daniel Nouri | none stated (Mediterranean) | the example listing EST-231, shown from outside: a white apartment building with balconies and a penthouse on top (R19 §9: a room, the outside or the plan, not the sea again). Replaced 31817163 (Ahmet Çötür, a double-height living room with sea views, used 2026-10-12 to 2026-10-19) |
| `listing-est118.webp` (since 2026-10-12) | 31817156 | Ahmet Çötür | none stated (Mediterranean) | the example villa EST-118 of the viewing in progress: the house with its pool and terrace |
| `listing-est240.webp` (since 2026-10-12) | 7851904 | Gabriela Pons | Madrid, Spain | the example listing EST-240 of the follow-up: a renovated flat's living room |

Replaced on 2026-10-12 (final order §7: listing cards show rooms, architecture and terraces, not the sea alone):
20304083 (Adrianna CA, Marbella), 30720428 (May Vanhille, Italy), 24807132 (Ahmet Çötür), 29698107 (Renkgezgini).
Not used: 6775268 (Ben Mack; the photographer's own caption restricts commercial use, so it was left out although
the Pexels licence would allow it), 16030699 (download failed), 26859048, 18042769, 4383348, 15172873, 1838640,
17672408, 16443429, 4180974, 5793547, 31817155, 8134746, 22042390, 18179901, 6312353 (viewed, not fitting).

## 2. The 3D living room (3D lane, 2026-10-05 delivery)

Source: `C:\src\nuova-3d\docs\return_2026-10-05\` (the 3D lane's return of 2026-10-05, "Bericht Änderungen
Wohnzimmer"). The living room is the owner's accepted quality direction (3D audit orders 2026-10-06: "Das Wohnzimmer ist
die Richtung"); the formal `3D_OWNER_VISUAL_ACCEPTANCE` is still open and is listed in ACCEPTANCE_LIST_1010.md. The
model is the 3D lane's fictional two-storey demonstration house, not a real home; the furniture is CC0 and similar in
style, not a reconstruction. The page says so under the section.

| File (public/media/3d/) | From | Shows |
|---|---|---|
| `living-before-1200.webp` | `living_before_same_camera.jpg` | the **first version** of the furnished living room, same camera, same daylight (the "before" of the slider). It is furnished, so the slider is labelled "first version / revised design", not "raw / furnished" (final order 2026-10-12 §7). An unfurnished-to-furnished pair from the same camera does not exist yet; the viewer's furniture-off frames of 2026-10-03 (`toggle_living/`, 960×540) are from another camera and were not used |
| `living-render-1600.webp`, `living-render-800.webp` | `living_final_3000.jpg` | the furnished living room, offline render (the "after", and the film's poster) |
| `living-clay-1200.webp` | `living_stage_clay.jpg` | furniture placed, no materials (stage 2 of 4) |
| `living-viewer-1200.webp` | right half of `viewer_living_room_before_vs_after.jpg` | the rotatable browser viewer with the study furnishing (stage 4 of 4) |
| `living-camera-ride.mp4` | `living_camera_ride.mp4` (unchanged, 1280x720, 8 s, 3.4 MB) | the camera ride through the living room |

New pictures and films from the 3D lane replace these files under the same names; nothing else on the page changes.

## 2b. The 3D media of the build of 03.11.2026 (3D lane, handoff_2026-10-30, with checksums)

Source: `C:\src
uova-3d\deliverables\website-assets\handoff_2026-10-30\` (README and `SHA256SUMS.txt` of the 3D lane; run
`run-20261102-092500-house`, commit `caf044a`). The owner's order of 03.11. (point 6): the whole house without room names or
viewer controls, and the labelled `house-turn-{es,en}.mp4` with its posters and the labelled `house-both-floors-*.webp` removed.

| File (public/media/3d/) | From (handoff) | sha256 of the source | sha256 of the published file | Shows |
|---|---|---|---|---|
| `house-clean-take.mp4` | `media/clean_take_fullhd.mp4` (1920 × 1080, 25 fps, 25 s, H.264) | `e9ba714b40761e829f88cee6c4b0ed7ba1f8acc140f22eb3f63509a3843867a6` | identical (copied byte for byte) | the whole house from above: upper floor, lower floor, furniture off and on; no labels, no menus (`?ui=0`); plays on request only |
| `house-clean-take-poster.webp` | the film's own frame at 1.5 s (browser canvas, 1600 px) | — | see the evidence folder's `checks/media-sha256.txt` | the poster of the film |
| `house-model-clean-1600.webp` | `media/modelo_both_floors.png` (3840 × 2160, `ui=0`) | `533231f02eb27e0688fbcf46449f46d23b982c59ce2f58104331ee03921a079f` | see `checks/media-sha256.txt` | the "02 Modelo" view: both floors without a roof, no labels |
| `living-empty-1200.webp`, `living-furnished-1200.webp` (unchanged since 30.10.) | `pair/living_empty.jpg`, `pair/living_furnished.jpg` (3000 × 2000, Cycles) | `aa2f54f5…9a8c`, `d87d8f84…fdba393` | see `checks/media-sha256.txt` | the same living room empty and furnished from the same camera, on the compare handle |
| `living-camera-ride.mp4`, `living-ride-poster.webp` (unchanged since 26.10.) | the 3D lane's living-room study, `living_camera_ride.mp4` (1280 × 720, 8 s) | `c3c56a9c3e6b982068e3f44a0171c17fe0eacbe83e1fbecd3acf3ad2b08baaa0` (published file) | — | the hero's background film (the owner's picture C01), muted, in a loop, dimmed; the poster stands with reduced motion and on slow connections |

The page carries the 3D lane's mandatory mark itself ("Casa de ejemplo ficticia"); nothing is burnt into these files.

## 2c. The 3D media of the round of 05.11.2026 (3D lane, handoff_2026-11-02; the owner's F2 and point 9)

Source: `C:\src\nuova-3d\deliverables\website-assets\handoff_2026-11-02\` (README `REDESIGN_3D_MEDIEN_1102_v1.md`). The owner's
finding F2 (the 1080p delivery clip stuttered, D10) and point 9 (02 Modelo as a turn of the ground floor). The 3D lane has not
delivered a native ground-floor turn yet: until it does, 02 Modelo is the clean take's own ground-floor segment (12.3–25.04 s),
re-encoded as a loop. Both clips were re-encoded with the browser's H.264 encoder (`cut-1105.mjs`: every presented frame once at
its media time, 25 fps even, keyframe every 50 frames, faststart). Superseded and removed: `house-clean-take.mp4` (the 1080p
original, 15 MB), `house-clean-take-poster.webp`, `house-model-clean-1600.webp` (both floors; no longer shown).

| File (public/media/3d/) | From (handoff) | sha256 of the source | sha256 of the published file (first 16) | Shows |
|---|---|---|---|---|
| `house-clean-take-720.mp4` (6.5 MB) | `entrega/clean_take_fullhd.mp4` (1920 × 1080, 25 s) re-encoded to 1280 × 720, 2 600 kbps, 625 frames at 40 000 µs each | `e9ba714b40761e82…` | `9013746be48b393f` | 04 Entrega: the whole house, plays on request behind its poster |
| `house-clean-take-poster-1600.webp` | `entrega/clean_take_poster.jpg` (1600 px) | `e3fe77a7b4be95c1…` | `c15d1ff90ccbcd5e` | the poster of 04 Entrega |
| `house-ground-turn.mp4` (3.2 MB) | `entrega/clean_take_fullhd.mp4`, the segment 12.3–25.04 s (the ground floor turning), 1280 × 720, 2 200 kbps, 318 frames | `e9ba714b40761e82…` | `735cbebb8126ee37` | 02 Modelo: the ground floor turning, muted, in a loop; only while the step is on the stage |
| `house-ground-turn-poster.webp` | the clip's own frame at 0.2 s (browser canvas, 1280 px) | — | `e2f57012f58d0e3b` | the poster of 02 Modelo |
| `house-ground-near-1600.webp` | `modelo/modelo_planta_baja_cerca.png` (furnished ground floor, near) | `e97b4e847f27ca07…` | `346146597f023bda` | 02 Modelo with reduced motion (the still) |
| `house-ground-near-empty-1600.webp` | `modelo/modelo_planta_baja_cerca_vacio.png` | `ff1dc903…` | `c0b45e8fc7287dac` | filed for the stage's next step; not shown yet |

## 2d. The three media of the 3D lane's handoff_2026-11-05 (the owner's order of 05.11.: HERO = A, 02 Modelo, 04 Entrega)

Source: `C:\src\nuova-3d\deliverables\website-assets\handoff_2026-11-05\` (README `REDESIGN_3D_MEDIEN_1105_v1.md`, `SHA256SUMS.txt`,
commit `a881c88`; every checksum verified with `sha256sum -c` on 06.11.). Superseded and removed: the cuts of §2c
(`house-ground-turn.mp4` + poster, `house-clean-take-720.mp4` + poster). The hero film `living-camera-ride.mp4` and its poster stay
in the repository but are no longer shown on the home page (the hero is the still picture now).

| File (public/media/3d/) | From (handoff) | sha256 of the source | sha256 of the published file (first 16) | Shows |
|---|---|---|---|---|
| `hero-a-2560.webp`, `hero-a-1920.webp`, `hero-a-1280.webp` | `hero/hero_A.jpg` (3840 × 2160, Cycles, "tarde cálida") scaled in the browser's canvas, WebP q0.8 | `b59710aae571d1de…` | `b6c3a188434edbaf`, `a4c0ae92f322a52e`, `aa845d8e12ced2d9` | the hero's picture in three widths (`srcset`) |
| `hero-a-poster-960.webp` | `hero/hero_A_poster.jpg` (1920 × 1080) | `a18aabcf28a04f45…` | `d308e31ddfb24c14` | the hero's picture on the smallest screens |
| `house-ground-loop.mp4` (13.2 MB) | `modelo/modelo_planta_baja_loop.mp4` (1920 × 1080, 30 fps, 10 s, seamless) | `2c650aeed765bb99…` | identical (copied byte for byte) | 02 Modelo: the ground floor in one full turn; the first `<source>` |
| `house-ground-loop.webm` (11.0 MB) | `modelo/modelo_planta_baja_loop.webm` (VP9) | `dc9ac2c3e31c9fbb…` | identical | the second `<source>` of 02 |
| `house-ground-loop-poster-1600.webp` | `modelo/modelo_planta_baja_loop_poster.jpg` (the loop's first frame) | `22674d6935185392…` | see `checks/media-sha256.txt` | the poster of 02; the still with reduced motion |
| `house-delivery.mp4` (15.3 MB) | `entrega/entrega_clip.mp4` (1920 × 1080, 30 fps fixed, 18.4 s, GOP 60, faststart) | `14bf2dc4e8a188d7…` | identical | 04 Entrega, on request; the first `<source>` |
| `house-delivery.webm` (9.2 MB) | `entrega/entrega_clip.webm` (VP9) | `3906a2bdf6a1ca04…` | identical | the second `<source>` of 04 |
| `house-delivery-poster-1600.webp` | `entrega/entrega_clip_poster.jpg` (the frame at 1.0 s) | `2cc405f1df15971551…` | see `checks/media-sha256.txt` | the poster of 04 |

The lane's mandatory mark "Casa de ejemplo ficticia, visualización" stands on the hero picture and on the 3D stage; the hero's
alt is the lane's ("Casa de ejemplo ficticia: salón amueblado, ilustrativo"). The wall painting in `hero_A` is the lane's placeholder
art and will be replaced by the lane with public-domain art (the owner's order of 05.11.); the new render arrives with its checksum
and replaces the files under the same names.

## 2e. The 3D lane's handoff_2026-11-06 (the owner's `WANDBILD = 1`; the verdict of 06.11., point 3: only the lane's delivery)

The lane's addendum `NACHTRAG_WANDBILD_1106_v1.md` (`C:\src
uova-3d\deliverables\website-assets\handoff_2026-11-06\`, `SHA256SUMS.txt`
verified on 06.11. with `sha256sum -c`: every file OK) replaces exactly three media of the 05.11. handoff. The wall painting in the
living room is now **Vincent van Gogh, "Cypresses", 1889, The Metropolitan Museum of Art 49.30, public domain / CC0**
(objectID 437980; the lane's file `assets_cc0/art/met_437980_vangogh_cypresses.jpg`). The credit is not mandatory under CC0; the lane
recommends it, and the site carries it as the title of the hero's mark ("Cuadro: Vincent van Gogh, Cypresses (1889), The Metropolitan
Museum of Art, dominio público"). Same camera, light and settings as on 05.11.; the file names on the site stay the same.

| Site file | Lane file (handoff_2026-11-06) | Lane sha256 (first 16) | On the site | Use |
|---|---|---|---|---|
| `hero-a-2560.webp` / `-1920` / `-1280` / `hero-a-poster-960.webp` | `hero/hero_A.png` (3840 × 2160, 8 bit) | `9cb1bae44abcf248…` | WebP 80 (poster 78) by sharp 0.34, resized from the PNG | the hero picture (HERO = A) |
| `house-ground-loop.mp4` (12.7 MB) | `modelo/modelo_planta_baja_loop.mp4` (H.264, 1920 × 1080, 30 fps constant, 10.0 s, 300 frames) | `239d2e44d41dab78…` | identical (sha256 verified on the site and on the deployment) | 02 Modelo, the first `<source>` |
| `house-ground-loop.webm` (10.5 MB) | `modelo/modelo_planta_baja_loop.webm` (VP9) | `3e1a2c3967bdf495…` | identical | the second `<source>` of 02 |
| `house-ground-loop-poster-1600.webp` | `modelo/modelo_planta_baja_loop_poster.jpg` (the first frame) | `93d7b7fbb0d7c66f…` | WebP 80 at 1600 px | the poster of 02; it stands over the clip until the clip can play |
| `house-delivery.mp4` (14.6 MB) | `entrega/entrega_clip.mp4` (H.264, 1920 × 1080, 30 fps constant, 18.4 s, 552 frames) | `2f1e2a70de1fbd77…` | identical (sha256 verified) | 04 Entrega, the first `<source>`, loaded on request |
| `house-delivery.webm` (8.9 MB) | `entrega/entrega_clip.webm` (VP9) | `4c0d7e6bc88c313…` | identical | the second `<source>` of 04 |
| `house-delivery-poster-1600.webp` | `entrega/entrega_clip_poster.jpg` (the frame at 1.0 s) | `b183f902a5b8b3f2…` | WebP 80 at 1600 px | the poster of 04 |

The lane's play check (installed Chrome and Edge, phone-like emulation): both clips play to the end; dropped frames 2–6 of 300 /
552 (the lane's own threshold "≤ 2 or ≤ 1 %" is met or just missed by one frame on the installed browsers, met on the phone-like
emulation); MP4 stays the first `<source>`. The earlier placeholder painting ("the abstract picture", the lane's `abstract_art()`
fallback) is gone from every medium on the site. FRAGE D (a calm hero video with the painting): not delivered yet; the still picture
stays until the lane's hero video arrives with its checksum.

### The owner's addition of 06.11. evening: the wall paintings apply to every medium

Per medium on the site after this round (the owner: "no medium with the old picture stays"; the swap only from the 3D lane's
handoff with checksums):

| Medium on the site | Wall painting | Source |
|---|---|---|
| `hero-a-*.webp` (the hero) | **new** (Van Gogh, Cypresses) | handoff_2026-11-06 `hero/hero_A.png` |
| `house-ground-loop.mp4/.webm` + poster (02 Modelo) | **new** | handoff_2026-11-06 `modelo/` |
| `house-delivery.mp4/.webm` + poster (04 Entrega) | **new** | handoff_2026-11-06 `entrega/` |
| `living-empty-1200.webp`, `living-furnished-1200.webp` (03 Vacío y amueblado) | **old** (the lane's earlier placeholder art) | handoff_2026-10-30; the lane re-renders after the hero video (the owner's line of 06.11.), then they are swapped by checksum |
| `living-camera-ride.mp4`, `living-ride-poster.webp`, `house-ground-near-1600.webp`, `house-ground-near-empty-1600.webp` | old, **not used by any page** | removed from `public/media/3d/` in this round |

### 2f · handoff_2026-11-07 (3D, 07.11.: the hero video and every medium with the new wall paintings; SHA256SUMS 81/81 verified with `sha256sum -c`)

| File (public/media/3d/) | From (handoff_2026-11-07) | Shows | sha256 of the source (first 16) | On the site |
|---|---|---|---|---|
| `hero-a.mp4` (3.3 MB, byte-identical), `hero-a.webm` (1.9 MB, byte-identical) | `hero_video/hero_living_loop.*` (1920 × 1080, 30 fps, 10 s seamless, Van Gogh) | the hero's moving background (FRAGE D = JA, G1) | `99600da324e17cb4`, `be0822dfb3a4f9ff` | plays over the still picture once it can; the picture stays the first paint and the fallback |
| `hero-a-video-poster-1920.webp` | `hero_video/hero_living_loop_poster.jpg` | the video's poster | `5add0ed3085fd6ce` | |
| `hero-a-2560/1920/1280.webp`, `hero-a-poster-960.webp` | `hero_video/hero_A_still.jpg` = `handoff_2026-11-06/hero/hero_A.jpg` (byte-identical, `2d1f7eed55e9631c`) | the still picture | unchanged since 06.11. | |
| `house-ground-loop.mp4/.webm` (byte-identical) + `house-ground-loop-poster-1600.webp` | `modelo/modelo_planta_baja_loop.*` (all seven paintings) | 02 Modelo | `bbcf243b7462e409`, `bb144b0b18c18083`, poster `3b9cfb85f4967348` | replaces the 06.11. loop; the lane may replace it once more on Mon 09.11. (station 54) |
| `house-delivery.mp4/.webm` (byte-identical) + `house-delivery-poster-1600.webp` | `entrega/entrega_clip.*` | 04 Entrega | `ae3585855fdde03d`, `ab16124f2c71eac7`, poster `a0f2d8317aad041f` | the same |
| `living-empty-1200.webp`, `living-furnished-1200.webp` | `pair/living_empty.jpg`, `pair/living_furnished.jpg` (3000 × 2000, Cycles, Van Gogh) | 03 Vacío y amueblado (the slider) | `f301f5ee7ddc6233`, `2729d31a2dc40f93` | **the last medium with the old picture is replaced**; no medium with the old art remains on the site |
| not used on the site | `hero/hero_B.*`, `modelo/modelo_*cerca*`, `modelo/modelo_both_floors*`, `modelo/modelo_ground_floor*`, `modelo/modelo_upper_floor*`, `rooms/*` | — | — | filed with the lane; a room gallery is not part of the build |

The lane's "no longer to be used" list (clean take of 02.11., every clip and poster of 10-01 … 10-30) carries nothing that is still under `public/media/`.

### The tab icon (06.11., point 1)

`app/icon0.svg` (the mark traced from the official artwork `public/images/nuova-icon.png` with potrace, 3.7 kB, black on a light
tab and white on a dark one by `prefers-color-scheme`), `app/icon1.png` (the white mark on the black tile, 512 px) and
`app/apple-icon.png` (180 px); Next serves them with a content hash in the URL (a new cache name on every change). The old
`public/favicon-v2.*` are removed. The same path serves `components/ui/mark.tsx` (the mark in the flow's second field, exactly centred).

## 3. Drawn, not photographed

- (removed 02.11.) the hero's ridges of the four-layer concept.
- The dimensioned floor plan of the 3D stage (`components/home/scene-art.tsx`, `DemoPlan`): the ground floor of the 3D lane's demonstration house, drawn to scale from its specification.
- Every product surface (the panel, the stages of the story, the report, the email) is the site's own markup with
  invented people and figures, labelled "Ejemplo con personas e inmuebles inventados" / "Cifras de ejemplo".

## 4. Not used

- Daily's recordings and stills (`public/media/daily/`): still carry REF-DEMO-204 inside the picture while the site
  says EST-204; withheld on the Daily page until Daily's clip v4 (requested 2026-10-09).
- No stock photograph of a person. No logo of a customer. No testimonial.
