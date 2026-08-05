# Plant source and anchor audit

## Result

The six plant files are correctly numbered and visually match the six approved lifecycle stages. The previously used `assets/growth/hd/*` files are rejected because they are 3072px derivatives of smaller source images.

The immutable design master is 512×1536. Scaling it by 2.8125 produces the frozen 1440×4320 desktop page exactly, including header, six sections, and footer. Plant connection coordinates are therefore stored in one page coordinate system in `data/plant-composition-v2.json`.

## Locked source files

| Stage | Source | Native pixels | SHA-256 | Status |
| --- | --- | ---: | --- | --- |
| 01 Seed | `assets/growth/source-v2/01-seed.png` | 2048×1783 | `5da5c92a…e76edb75` | accepted |
| 02 Sprout | `assets/growth/source-v2/02-sprout.png` | 1365×2048 | `8cf178ef…9a7a55f` | accepted |
| 03 Branches | `assets/growth/source-v2/03-branches.png` | 1074×2048 | `2b98a2b1…09ff0a16` | accepted |
| 04 Bloom | `assets/growth/source-v2/04-bloom.png` | 2048×2048 | `70a5cf24…82660d2` | accepted |
| 05 Crystal | `assets/growth/source-v2/05-crystal.png` | 1024×2048 | `acbe0269…7e07af4` | accepted |
| 06 Return seed | `assets/growth/source-v2/06-seed-return.png` | 1024×2048 | `728e72a0…1b528b6` | accepted |

## Desktop joins

The source values below are measured in the 512×1536 design master. The desktop values are exact 2.8125× conversions.

| Join | Master | Desktop 1440px |
| --- | ---: | ---: |
| Sprout → branches | (310, 459) | (871.875, 1290.9375) |
| Branches → bloom | (303, 750) | (852.1875, 2109.375) |
| Bloom → crystal | (334, 1036) | (939.375, 2913.75) |
| Crystal → return seed | (339, 1316) | (953.4375, 3701.25) |

## Rendering decision

- Never upscale the six source rasters.
- Never use the old destructive alpha extractions.
- Preserve the original silver/grey pixels.
- Use a WebGL shader to remove the black/off-white source field at render time and keep the metallic edge detail intact.
- Render all stages against one page coordinate system per breakpoint; section-local boxes are prohibited.
- Keep the body and joins static. Later glow, reflection sweep, and float effects must live on separate layers.

## Remaining gate

Desktop anchors are design-master-derived. Mobile anchors are an independent baseline because there is no approved mobile master; they must be calibrated by 390px overlay QA before release.
