# GreenTomato Plant Layer V2 — Frozen Design Contract

## Baseline

- Repository baseline: `54221a3` (`fix: match GreenTomato reference homepage`)
- Development branch: `feature/plant-layer-v2`
- The original page structure, typography, copy, navigation, footer, form, spacing, and section geometry are immutable.

## Frozen section geometry

### Desktop (`min-width: 801px`, 1440px reference viewport)

| Section | Height |
| --- | ---: |
| 01 Hero | 594px |
| 02 About | 641px |
| 03 Artists | 818px |
| 04 Work | 804px |
| 05 Brands & Services | 788px |
| 06 Contact | 506px |
| Footer | 112px |

### Mobile (`max-width: 800px`, 390px reference viewport)

| Section | Height |
| --- | ---: |
| 01 Hero | 420px |
| 02 About | 430px |
| 03 Artists | 690px |
| 04 Work | 720px |
| 05 Brands & Services | 620px |
| 06 Contact | 470px |
| Footer | 82px |

## Allowed changes

- Add or replace the plant rendering layer and plant-only assets.
- Restore Artist images to the user-provided source colors without changing card geometry.
- Restore Work media to the user-provided source colors without changing card geometry.
- Add plant-only WebGL shaders or motion after the static master passes visual QA.
- Add tests and QA evidence related to the three scopes above.

## Prohibited changes

- Do not change section heights, page order, or responsive breakpoints.
- Do not move or restyle headings, body copy, navigation, footer, brands, services, or contact form.
- Do not modify Artist or Work card size, position, or layout except where a source-specific crop focal point is required.
- Do not upscale Discord previews or other low-resolution derivatives.
- Do not publish until desktop and mobile overlay QA pass and at least one correction pass is complete.

## Plant asset contract

- Use one shared page coordinate system per breakpoint so lifecycle joins are solved in the asset/layout data, not by moving six unrelated image boxes.
- Preserve the silver/grey metallic artwork; do not recolor the plants.
- Build static fidelity first. Plant body and join anchors remain fixed when glow, reflection sweep, or subtle floating layers are added later.
- Desktop and mobile receive separate composition data.

## Acceptance evidence

- Baseline tests pass before implementation.
- Desktop screenshot at 1440px and mobile screenshot at 390px.
- Overlay comparison against the approved design master.
- Control sheet records each plant anchor, Artist source-color check, Work source-color check, and any remaining delta.
