# GreenTomato homepage design QA control sheet

| Planned element | Responsible file/component | Evidence | Status | Adjustment / next correction |
|---|---|---|---|---|
| 1440px six-chapter proportions and alternating fields | `styles/reference-master.css` | `qa/final-reference/desktop-final-corrected.png`; `npm test` | matched | Fixed chapter heights: 594 / 641 / 818 / 804 / 788 / 506px. |
| 01 Seed hero, outlined Tomato, reference copy | `index.html`, `.home-hero` | desktop screenshot | matched | Restored reference eyebrow, Brands navigation, metadata and black field. |
| 02 Sprout / About | `.home-about` | desktop screenshot | matched | Scaled and positioned the transparent sprout against the paper field. |
| 03 five Artist frames | `.artist-grid`, authentic profile assets | desktop screenshot; browser reports 5 visible frames | adjusted | Gray placeholders intentionally replaced with Rosie's five existing real photos. |
| 04 four Work frames | `.work-grid`, existing MP4 assets | desktop screenshot; browser reports 4 visible videos; click QA | adjusted | Gray placeholders intentionally replaced with four existing real videos. |
| 05 Brands / Services crystal | `.brand-index`, `.brands-services` | desktop screenshot | matched | Restored the two text groups and crystal plant on black. |
| 06 Contact return seed and prototype form | `.contact-flow`, `scripts/home.js` | desktop screenshot; successful form interaction QA | matched | Prototype feedback only; no Google Sheet/Gmail integration in this phase. |
| Mobile responsive treatment | mobile rules in `reference-master.css` | `qa/final-reference/mobile-final.png`; 390px overflow check | adjusted | Same design system reflowed for 390px because no separate mobile master was supplied. |
| Plant layer V2 static WebGL coordinate system | `scripts/growth-three.js`, `data/plant-composition-v2.json` | `qa/plant-webgl-desktop-contact-pass6.png`; `qa/plant-webgl-mobile-contact-pass2.png`; `qa/plant-webgl-mobile-bloom-pass3.png`; `npm test` | adjusted | Six native-resolution silver plant sources render through one orthographic page coordinate system. Desktop follows the supplied master; mobile has an independent text-safe composition. Static only: no transition, float, glow, pointer motion, or rotation. |
| 2026-08-05 closed-seed WebGL source replacement | `data/plant-composition-v2.json`, `assets/growth/source-v2/closed-seed-silver.png` | `npm test` | matched | Seed source now uses the approved silver three-petal image while stages 02-06 keep the locked V2 sources. |
| Plant source sharpness and background isolation | `assets/growth/source-v2/*`, WebGL key shader | `qa/fresh-pass5.png`; `qa/plant-webgl-mobile-bloom-pass3.png` | matched | Uses the locked native source files directly; no 3072px derivatives or CSS upscaling pipeline. Black/paper backgrounds are removed in the shader without generating enlarged copies. |

Known visual deltas: Artist and Work media differ from the gray placeholders by explicit user instruction. The supplied master is 512×1536, so high-resolution typography and metallic assets are reconstructed rather than enlarging the low-resolution screenshot itself.
