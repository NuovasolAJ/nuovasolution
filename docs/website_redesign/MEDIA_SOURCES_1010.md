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
| `hero-dusk-1400.webp`, `hero-dusk-800.webp` | 10393597 | Soontorn B | none stated | the hero's far layer (a coast at dusk), toned to the page's anthracite |
| `listing-est204.webp` | 20304083 | Adrianna CA | Marbella, Andalucía | the example listing EST-204 (terrace, sea between palms) |
| `listing-est231.webp` | 30720428 | May Vanhille | Italy | the example listing EST-231 (sea between bougainvillea) |
| `listing-est118.webp` | 24807132 | Ahmet Çötür | none stated (Mediterranean) | the example villa EST-118 of the viewing in progress |
| `listing-est240.webp` | 29698107 | Renkgezgini | none stated | the example listing EST-240 of the follow-up |

Not used: 6775268 (Ben Mack; the photographer's own caption restricts commercial use, so it was left out although
the Pexels licence would allow it), 16030699 (download failed), 26859048, 18042769, 4383348, 15172873, 1838640,
17672408, 16443429 (viewed, not fitting).

## 2. The 3D living room (3D lane, 2026-10-05 delivery)

Source: `C:\src\nuova-3d\docs\return_2026-10-05\` (the 3D lane's return of 2026-10-05, "Bericht Änderungen
Wohnzimmer"). The living room is the owner's accepted quality direction (3D audit orders 2026-10-06: "Das Wohnzimmer ist
die Richtung"); the formal `3D_OWNER_VISUAL_ACCEPTANCE` is still open and is listed in ACCEPTANCE_LIST_1010.md. The
model is the 3D lane's fictional two-storey demonstration house, not a real home; the furniture is CC0 and similar in
style, not a reconstruction. The page says so under the section.

| File (public/media/3d/) | From | Shows |
|---|---|---|
| `living-before-1200.webp` | `living_before_same_camera.jpg` | the raw model, same camera, same daylight (the "before" of the slider) |
| `living-render-1600.webp`, `living-render-800.webp` | `living_final_3000.jpg` | the furnished living room, offline render (the "after", and the film's poster) |
| `living-clay-1200.webp` | `living_stage_clay.jpg` | furniture placed, no materials (stage 2 of 4) |
| `living-viewer-1200.webp` | right half of `viewer_living_room_before_vs_after.jpg` | the rotatable browser viewer with the study furnishing (stage 4 of 4) |
| `living-camera-ride.mp4` | `living_camera_ride.mp4` (unchanged, 1280x720, 8 s, 3.4 MB) | the camera ride through the living room |

New pictures and films from the 3D lane replace these files under the same names; nothing else on the page changes.

## 3. Drawn, not photographed

- The hero's ridges (`components/home/hero-world-layers.tsx`): two soft hills in the page's own dark tones.
- The dimensioned floor plan of the 3D section (`components/home/scene-art.tsx`, `FloorPlan`): a drawing with five rooms.
- Every product surface (the panel, the stages of the story, the report, the email) is the site's own markup with
  invented people and figures, labelled "Ejemplo con personas e inmuebles inventados" / "Cifras de ejemplo".

## 4. Not used

- Daily's recordings and stills (`public/media/daily/`): still carry REF-DEMO-204 inside the picture while the site
  says EST-204; withheld on the Daily page until Daily's clip v4 (requested 2026-10-09).
- No stock photograph of a person. No logo of a customer. No testimonial.
