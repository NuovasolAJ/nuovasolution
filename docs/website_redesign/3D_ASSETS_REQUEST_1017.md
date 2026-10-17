# 3D ASSETS REQUEST 1017 — what the website needs from the 3D lane, named exactly

**State:** `2026-10-17` · **Lane:** Website Implementer → **3D** (owner's closing order 2026-10-17 §7). The website's
3D section (`components/home/model-3d.tsx`, files under `public/media/3d/`) has its slots prepared; this acceptance
point stays open until the files below exist. Nothing is simulated meanwhile: no CSS rotation of a flat picture, no
design variant shown as a furniture comparison.

| # | Needed | Exact form | Replaces | Where it goes |
|---|---|---|---|---|
| A-1 | A rotation of the building, **as video** or as a **working interactive viewer** | Video: MP4 H.264, 1280×720 or 1600×900, 8–12 s full turn, no UI, no title bar, no file or run names in the picture; it will play with controls (pause). Viewer: an HTTPS URL that can be embedded (iframe) with rotation by pointer and keyboard, no login | the still `living-viewer-1200.webp` (a capture of the viewer with its title bar "Browser viewer with the study furnishing (run-…)") | stage 04 of the section; the video in `public/media/3d/`, a viewer by URL in `lib/content/home-sections.ts` |
| A-2 | The unfurnished → furnished pair of the living room | two PNG/JPG ≥ 1600 px wide, **identical camera, geometry and lighting**; left without furniture, right with furniture. Not two design revisions | the slider that showed "first version / revised design" (removed; a single render stands there now with the note) | the slider slot `[data-model3d-pair-slot]` |
| A-3 | A clean capture of the viewer (optional, if A-1 is a video) | 1600×1000, no title bar, no chrome | the cropped capture | stage 04 picture |
| A-4 | Origins | one line per file: scene, date, renderer, licence of furniture assets | `MEDIA_SOURCES_1010.md` §2 | the sources file |

Drop the files in `docs/website_redesign/media_in_3d/<date>/` with a `README.md` listing them. The website lane
converts, places and re-labels within the same day and records the change in `MEDIA_SOURCES_1010.md`.
