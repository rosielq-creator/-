# GTAI Home concept options

## Decision criteria

Each option is judged against:

- immediate agency clarity;
- equal visibility for five artists;
- premium creative tone;
- mobile legibility;
- compatibility with the existing Work, Services and artist pages;
- implementation and performance risk.

## Option A — Editorial Stage (recommended)

### Structure

```text
┌─────────────────────────────────────────────────────────────┐
│ GTAI                                  NAV / LANG / SOUND     │
│                                                             │
│ AI TALENT AGENCY                         short support copy  │
│ [dominant positioning statement]                            │
│                                                             │
│                                         [controlled visual] │
│ [Explore artists →]                                         │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ 01  MARIO      02  OOONA      03  NOAH                     │
│ 04  MAYA       05  AMBER                                     │
│ [five equal editorial artist entries / responsive rail]     │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ One concise agency proof statement                          │
│ [Selected work →]                           [Services →]     │
└─────────────────────────────────────────────────────────────┘
```

### Visual behavior

- Hero uses one selected character or a slow controlled group composition, never all characters plus orbit plus physics objects.
- The roster section gives all five artists equal card area and equal type hierarchy.
- Artist names can form the dominant visual rhythm; portraits appear on hover/focus or in a shared stage.
- The page scrolls naturally.

### Strengths

- Clearest business positioning.
- Solves mobile congestion structurally.
- Preserves character personality without turning Home into a game screen.
- Directly borrows Haoqi's strongest principle: one job per viewport.

### Risks

- Requires changing Home from a locked viewport into a vertical landing page.
- The current view-switching logic needs separation from the new Home scroll behavior.

## Option B — Roster Index

### Structure

The first viewport is a typographic index of five names. Hovering or focusing a name updates one large shared portrait area. On mobile, names become a stacked list with thumbnail previews.

```text
GTAI / AI TALENTS

MARIO ───────────────────────── 01
OOONA ───────────────────────── 02
NOAH  ───────────────────────── 03
MAYA  ───────────────────────── 04
AMBER ───────────────────────── 05

                         [shared portrait stage]
```

### Strengths

- Equal prominence is explicit.
- Fast scanning.
- Strong editorial/art-direction feel.
- Lighter technically than the current scene.

### Risks

- Less immediately playful.
- Requires excellent portrait consistency.
- Could resemble a fashion roster site if agency positioning is too quiet.

## Option C — Single Cinematic Carousel

One artist fills the viewport at a time. Each screen has a large image, name, specialty and profile CTA. Users advance horizontally or vertically.

### Strengths

- Reuses the existing full-screen talent navigation idea.
- Very strong imagery and low visual clutter.
- Easy to understand on mobile.

### Risks

- The first artist receives disproportionate attention.
- Equal prominence depends on users advancing through all five.
- Less suitable if Home must explain GTAI before introducing individuals.

## Scorecard

| Criterion | Editorial Stage | Roster Index | Cinematic Carousel |
| --- | ---: | ---: | ---: |
| Agency clarity | 5 | 4 | 3 |
| Equal artist prominence | 5 | 5 | 3 |
| Mobile legibility | 5 | 5 | 4 |
| Creative distinctiveness | 4 | 5 | 4 |
| Reuse of current structure | 3 | 3 | 5 |
| Implementation risk | 3 | 4 | 4 |
| Overall | **25** | 26 | 23 |

Roster Index scores slightly higher mechanically, but Editorial Stage is recommended because GTAI must sell both the agency and the artists. It provides a stronger conversion narrative.

## Recommended content hierarchy

This is structural guidance, not final marketing copy:

1. eyebrow: category (`AI talent agency`);
2. headline: one differentiated agency proposition;
3. support: what GTAI enables for brands;
4. primary CTA: explore artists;
5. secondary route: view selected work;
6. second section: five equal artists;
7. third section: service/work proof.

## Elements to remove from the Home hero

- popularity ranks;
- `MOST LOVED`;
- coordinates;
- multiple free-floating 3D letters;
- crystal fallback shapes;
- grid plane;
- orbital spine and all five nodes;
- separate manifesto floating over the artwork.

Some of these motifs can survive elsewhere:

- coordinates as a small footer detail;
- one kinetic letter as a loading or hover motif;
- orbit geometry as a subtle section transition;
- character-specific animation inside profile pages.

