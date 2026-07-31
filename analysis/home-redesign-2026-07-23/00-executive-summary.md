# GTAI Home redesign research — executive summary

Date: 2026-07-23  
Scope: read-only audit of the current GTAI Home and `https://haoqi.design/`  
Website changes: none

## Conclusion

The Home feels busy because it has no protected focal zone. The first viewport currently asks the user to process all of these at once:

1. global navigation and sound/language controls;
2. the `AI PRODUCTION` headline;
3. five animated characters;
4. five rank badges plus a `MOST LOVED` flag;
5. an orbital device;
6. seven physics-driven letter/symbol blocks;
7. crystal/canvas decoration;
8. manifesto, CTA, coordinates and status text.

At 1440 × 900, the headline occupies the center while characters, labels and kinetic objects cross its visual field. At 390 × 844, the same composition is compressed rather than re-authored, so the title, characters, ranks and orbit compete even more strongly.

The most important product inconsistency is that the Home visibly ranks the five artists (`#01`–`#05`, including `MOST LOVED`) even though the confirmed roster requirement is equal prominence.

## Recommended direction

Adopt a restrained editorial Home inspired by Haoqi's information discipline, not a visual copy:

- Convert Home from one locked, overloaded viewport into a short vertical story.
- Hero: one proposition, one short supporting statement, one CTA, one controlled visual field.
- Roster: five equal artist entries in a dedicated second section.
- Proof/positioning: one concise third section that directs users to Work or Services.
- Keep the existing off-white, dark ink and GTAI green; remove decorative colors from the primary hierarchy.
- Use one signature motion system. Do not run character idle loops, physics blocks, crystal drift and orbital motion simultaneously.

Recommended concept name: **Editorial Stage**.

## What to borrow from Haoqi

- 12-column grid and consistent outer gutters.
- One dominant message per viewport.
- Monochrome hierarchy with one accent color.
- Large typography balanced by small, precise metadata.
- Motion that reveals or transitions content instead of decorating every object.
- Mobile composition that is reflowed and simplified, not scaled down.

## What not to borrow

- Do not copy Haoqi's personal-portfolio voice or exact layout.
- Do not adopt its heavy WebGL stack wholesale.
- Do not hide primary navigation on mobile without a clear replacement.
- Do not make project visuals dependent on WebGL; Haoqi's canvas failed to complete reliably in the headless audit environment.

## Priority order

1. Remove ranking and restore equal artist prominence.
2. Reduce the Home hero to one message and one visual system.
3. Separate artist discovery from the hero into its own section.
4. Consolidate the accumulated Home CSS before implementing a new design.
5. Add motion only after the static hierarchy works at desktop and mobile sizes.

## Evidence

- [Current GTAI desktop](screenshots/gtai-home-desktop.png)
- [Current GTAI mobile](screenshots/gtai-home-mobile.png)
- [Haoqi desktop hero](screenshots/haoqi-home-desktop.png)
- [Haoqi mobile hero](screenshots/haoqi-home-mobile.png)
- [Haoqi editorial intro](screenshots/haoqi-intro-desktop.png)

