# Website → 3D · ONE bundled asset order for the home page (26.10.2026)

**Written for:** the 3D lane (nuova-3d). **From:** the website implementer. **Order:** the owner's consolidated closing order of
26.10. §4 ("Wenn eine saubere Neuaufnahme nötig ist, liefere dem 3D-Chat EINEN gebündelten Asset-Auftrag mit Kamerafahrt, Dauer,
ausgeblendeten Labels und benötigten Formaten"). **Rule:** no second ordering system, no viewer link claimed; the files replace the
ones on the website under the same names, bound to the build by file name and sha256 in the website's return.

## What the website shows today (build after `596679b`), and why this order exists

| Website slot | File today | Source | What is wrong with it for marketing |
|---|---|---|---|
| Main view: the whole house turning | `house-turn-{es,en}.mp4` 1280 × 720, 20.4 s, 25 fps, H.264, no sound; poster `house-turn-poster-{es,en}.webp` | cut from `handoff_2026-10-23/turn/clip_desktop_{es,en}.webm` (run `run-20261024-132933-house`), seconds 2.2–22.7 of the recording, every presented frame once at the recording's own media time (no retiming, no acceleration), the last 0.6 s fading to the frame's ground | the viewer's own **room names, floor and furniture buttons, the title block and the attribution** are burnt into the recording; the run is the one **before** the owner's corrections of 24.10. (pictures 06, 14–18) |
| Step 02: the whole house, still | `house-both-floors-{es,en}-1600.webp` | the first frame of the cut above | same labels and controls |
| Step 03: the living room empty / furnished | `living-empty-1200.webp`, `living-furnished-1200.webp` | `handoff_2026-10-23/pair/` | the run before the corrections (sideboard vases, picture size, armchair) |
| Step 04: the delivery, a short ride | `living-camera-ride.mp4` 8 s, 25 fps; poster `living-ride-poster.webp` | the living-room study of the 2026-10-02 handoff | an older living room than the house; fine as a ride, but not the same room as step 03 |

Measured (headless Edge, `requestVideoFrameCallback`): the source recording presents its frames at an even 40 ms (1250 frames,
no gap over 80 ms), so the stutter the owner saw was **not** in the source; the website's earlier MP4 had counted frames at
30 fps (1330 frames on 44 s, 12 % fast, repeated frames). The new cut keeps the 25 fps timing (512 frames, every gap 40 ms).

## The order (one delivery, all items from ONE corrected run, named with its run id and commit)

1. **House turn, marketing take**, from the corrected run (the one of `handoff_2026-10-25`, `⟦RUN⟧` once it exists):
   - camera: the whole house without a roof, both floors, **one clean full turn** (≈ 14–15 s), then the switch to the ground
     floor and ≈ 4–5 s of its half turn; **15–20 s in all**; no zoom in this take (the zoom is a separate item below)
   - **no viewer chrome**: no room names, no floor/furniture buttons, no title block, no cursor; keep the mandatory mark
     "Casa de ejemplo ficticia · grabado del visor real" / "Fictional demo house · recorded from the real viewer" burnt in
   - the first frame already shows the loaded house on the viewer's light ground (no empty or black start); the last frame holds
     the house (the website fades nothing then)
   - real time as recorded, 25 fps or 30 fps constant, **no acceleration and no dropped frames**; the website checks the frame
     timing on receipt
   - formats: WebM as recorded **and** H.264 MP4 (yuv420p, ≤ 2.5 Mbit/s, 1280 × 720) if ffmpeg is available on the 3D machine;
     otherwise WebM only and the website converts (it did so for the current file)
   - ES and EN (the mark's language), desktop 16:9 only (the website uses one landscape take at every width)
   - poster: the first frame as JPG ≥ 1600 px wide
2. **Zoom into the living room and back** as its own short take (≈ 6–8 s), same rules, ES/EN — optional for the website's main
   view; if delivered, the website shows it as a second clip in the main view's row
3. **Whole-house still** from the same take (both floors, the opening frame), 1600 × 1000, ES/EN, no chrome
4. **Living room empty / furnished** from the corrected run, same camera "main", 3000 × 2000 JPG (as the 25.10. README lists)
5. **Living-room ride** (the camera ride step 04 shows today) re-rendered **from the corrected house's living room**, 8–10 s,
   1280 × 720, same formats as 1 — so steps 03 and 04 show the same room

Deliver into `deliverables/website-assets/handoff_2026-10-26/` with the README pattern of the 25.10. handoff (run id, commit,
QA figures, the mandatory marks, what may not be claimed) and a `clips.json` with the step timestamps. The website binds the
files to its final build by **file name and sha256** in `WEBSITE_R24B_RETURN_v1.md` §3 and replaces nothing before the owner's
release of the run (the 25.10. README: "Vor dem Einbau: Owner-Freigabe").

## What the website does not need

A hosted viewer link (Hosting T3/R20-7), room pictures 14–18 (not on the website), a mobile portrait take (the landscape take is
shown at every width), sound.
