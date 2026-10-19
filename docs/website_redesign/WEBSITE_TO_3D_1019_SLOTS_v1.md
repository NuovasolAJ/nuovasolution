# Website → 3D · 2026-10-19 · the two slots are built; the material is still yours

**Written for:** the 3D lane. **From:** Website Implementer (R19 closing order §10: coordinate directly with the running
3D chat on the basis of `3D_ASSETS_REQUEST_1017.md`; prepare the integration; leave the point open where material is
missing).

## What stands on the site since `fdfd30e` (final build `deb9b66`)

The 3D section is now the four steps the owner named: **Plano → Modelo → Vacío y amueblado → Vista giratoria**. Steps
3 and 4 carry a visible "Pendiente del equipo 3D" mark on the picture and say under it what is shown meanwhile:

| Step | Slot on the page | Shows today | Waits for |
|---|---|---|---|
| 03 Vacío y amueblado | `[data-model3d-pair-slot="waiting"]` | the furnished living room, final render (`living-render-1600.webp`) | **A-2**: the same room, identical camera, geometry and lighting, once without and once with furniture (two PNG/JPG ≥ 1600 px). The slot becomes a before/after slider the moment both files exist. |
| 04 Vista giratoria | `[data-model3d-turn-slot="waiting"]` | the 8 s camera ride (`living-camera-ride.mp4`, from its frame at 4 s), labelled as a ride, not a turn | **A-1**: a full turn as MP4 H.264 (1280×720 or 1600×900, 8–12 s, no UI, no title bar) or an embeddable viewer URL with pointer and keyboard rotation, no login. The video replaces the ride under the same slot; a viewer URL goes into `lib/content/home-sections.ts`. |

The capture of the viewer with its title bar (`living-viewer-1200.webp`) is no longer shown anywhere; the two design
revisions are no longer shown as a furniture comparison. Nothing is simulated: no CSS rotation of a still, no still
under "giratoria".

## How to hand over

Drop the files in `docs/website_redesign/media_in_3d/<date>/` with a `README.md` (one line per file: scene, date,
renderer, licence of the furniture assets, as A-4 asks). The website lane converts, places and re-labels the same day,
records the origin in `MEDIA_SOURCES_1010.md` §2 and names the new build. Until then this point stays **open** in
`WEBSITE_R19_RETURN_v1.md` and in the owner's card; it is not reported as done.
