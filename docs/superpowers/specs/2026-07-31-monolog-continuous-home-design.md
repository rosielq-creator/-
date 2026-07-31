# Monolog-Style Continuous Homepage Design

## Goal

Rebuild the Greentomato homepage as one continuous editorial website using the reference site's layout system, spacing, typographic scale, monochrome palette, dividers, and scroll rhythm while retaining Greentomato copy, artists, media, links, and identity.

## Approved Direction

The user explicitly chose a high-fidelity reproduction rather than a loose visual reference. The page must not read as stacked presentation slides.

## Page Flow

1. Fixed compact header over a black atmospheric hero.
2. Hero statement and oversized `AI PRODUCTION` wordmark.
3. Manifesto immediately attached to the hero on the same black canvas.
4. Artists chapter immediately after the manifesto.
5. Selected work index.
6. Services index.
7. Large contact call-to-action and footer.

## Manifesto

Use Monolog's asymmetric editorial composition: small section metadata on the left, large left-aligned statement occupying the right two-thirds, muted lines becoming bright as the visitor scrolls, and thin structural rules. Keep Greentomato's existing human-led AI message.

## Artists

The Artists chapter behaves as one stage rather than five cards or slides. A portrait and artist name occupy the center. Classification words sit at the left and right edges. Scrolling through the stage changes the active portrait, name, number, descriptors, and profile link. The transition is fast, graphic, and restrained: fade, vertical translation, and scale only.

Artists in order:

1. Maya — Luxury / Fashion / Art
2. Amber — Music / Fashion / Culture
3. Ooona — Beauty / Wellness / Spirit
4. Noah — Film / Fashion / Culture
5. Mario — Lifestyle / Sport / Fashion

## Visual System

- Background: near-black `#090909`.
- Primary type: warm white `#e8e7df`.
- Muted type: charcoal gray.
- Accent: Greentomato green, used sparingly for logo and active indicators.
- Structural dividers: 1px low-contrast rules.
- Display type: Geom; body type: the existing sans-serif stack.
- Desktop sections use a 4/8-column editorial grid and large negative space.
- Mobile retains the sequence, reduces display size, and converts side labels into a compact row without horizontal overflow.

## Interaction and Accessibility

- Use native scrolling with no scroll-jacking.
- Artist state derives from scroll position and also supports direct selection buttons.
- Pause off-screen videos.
- Respect `prefers-reduced-motion`.
- Preserve semantic headings, alt text, focus states, and functional links.

## Acceptance Criteria

- Manifesto directly follows the hero with no white section or full-screen snap.
- Artists directly follows the manifesto and visibly includes side descriptors, portrait, name, index, and profile link.
- All five artists can become active through scrolling or controls.
- The page is one normal document flow and does not use CSS scroll snapping.
- No horizontal overflow at 1440×900, 390×844, or 360×800.
- No uncaught browser errors.
- Existing work videos and internal links remain usable.

