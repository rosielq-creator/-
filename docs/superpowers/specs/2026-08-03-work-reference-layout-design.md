# Work Reference Layout Design

## Goal

Rebuild the homepage Work preview to match the supplied reference video: four identical desktop rows with media on the left, compact editorial copy on the right, and a restrained jelly-like response while scrolling.

## Layout

- Keep the existing four projects, media files, links, and final `VIEW MORE WORK` archive link.
- Every desktop row uses the same direction. Media stays left at 58% of the row and copy stays right at 42%, separated by a 12px gutter.
- Media uses a 3:2 aspect ratio and `object-fit: cover`.
- Rows use compact 20px vertical spacing and a thin neutral divider.
- Copy uses a 10px project label, 16px title, and 12px body copy with tight reference-like spacing. No oversized display titles inside project rows.
- On screens below 760px, each row stacks media above copy while keeping the compact type hierarchy.

## Motion

- Preserve native page scrolling and do not add scroll snapping.
- Derive a clamped velocity value from successive `scrollY` values.
- Apply the velocity as a maximum 12px opposing translation to the Work index, then damp it toward zero on each animation frame. This creates a subtle soft lag and settle without making text wobble or hijacking input.
- Disable the translation under `prefers-reduced-motion: reduce`.

## Acceptance Criteria

- The homepage contains exactly four Work rows and none use reverse-direction classes.
- All desktop Work rows have media left and copy right using the 58/42 proportion.
- The title, body, metadata, spacing, and media ratio match the supplied reference scale.
- Scrolling through Work produces a small interruptible lag that settles quickly and never exceeds 12px.
- Existing Artist, brand, bridge, services, and case-page behavior remains unchanged.
- Structural tests and desktop/mobile browser checks pass.
