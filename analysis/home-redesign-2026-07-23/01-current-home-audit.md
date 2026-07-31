# Current GTAI Home audit

## Visual baseline

Audited deployment: `https://rosielq-creator.github.io/comp-web/`  
Desktop viewport: 1440 × 900  
Mobile viewport: 390 × 844

Screenshots:

- [Desktop](screenshots/gtai-home-desktop.png)
- [Mobile](screenshots/gtai-home-mobile.png)

## What is working

- The off-white, near-black and GreenTomato green palette is recognizable.
- The character assets have personality and are more memorable than generic portrait cards.
- The central headline is bold enough to establish a creative-company tone.
- The site has visible keyboard focus states and a reduced-motion branch.
- The desktop header has a clear center navigation model.

## Why it feels cluttered

### P0 — the hierarchy contradicts the roster model

The five talents are meant to receive equal prominence, but the Home labels them `#01`–`#05` and marks Mario as `MOST LOVED`. This changes the meaning of the roster from a curated ensemble into a popularity leaderboard.

Recommendation: remove rank semantics from Home. If sequencing is needed, use neutral index numbers (`01 / 05`) only inside navigation, not as status badges attached to people.

### P0 — too many simultaneous focal points

The hero has at least eight independent information or decoration systems. The eye cannot determine whether the page is primarily about:

- AI production;
- the five artists;
- GreenTomato;
- a game-like ranking system;
- or the kinetic physics interaction.

Recommendation: protect one focal zone. A hero should contain one dominant headline, one supporting statement, one CTA and at most one signature visual system.

### P1 — headline and business proposition do not align

`AI PRODUCTION` reads like a service category, while the site is positioned as a next-generation AI talent agency. The five characters imply roster discovery, but the headline describes production.

Recommendation: decide whether Home's first job is agency positioning or service selling. For the current product goal, agency positioning should lead; Services and Work can prove production capability afterward.

### P1 — mobile is compressed desktop art direction

At 390 × 844:

- all five characters remain visible;
- ranks remain attached to them;
- the orbital line crosses the title zone;
- character anchors and letter blocks compete with the CTA;
- the header still presents six navigation items in one row;
- the manifesto disappears entirely.

Recommendation: author a separate mobile hierarchy. Keep no more than one hero visual, move the roster below the fold, and replace the full desktop navigation with a deliberate mobile pattern.

### P1 — continuous motion has no priority system

The live page exposed 17 running animations in the audited desktop frame, including:

- sound bars;
- crystal drift;
- tennis recoil;
- flag lift and wave;
- multiple character scene floats;
- jump, wave, hang and climb loops;
- portrait drift.

The physics letter field also runs a `requestAnimationFrame` loop and responds to the pointer.

Recommendation: define motion tiers:

1. primary transition;
2. interaction feedback;
3. optional ambient motion.

Only one ambient family should run on Home.

## Measured desktop composition

| Element | Position / size at 1440 × 900 | Observation |
| --- | --- | --- |
| Header | 1440 × 84 | Appropriate footprint, but six primary destinations plus two tools create a dense top edge. |
| Headline | x 202, y 392, 1037 × 117 | Strong scale, but intersected by orbit and adjacent characters. |
| Roster scene | x 202, y 88, 1037 × 734 | Occupies almost the entire usable viewport. |
| Manifesto | x 1022, y 162, 332 × 48 | Competes with Ooona, the `T` block and header controls. |
| CTA | x 72, y 743, 280 × 58 | Clear, but visually disconnected from the central headline. |
| Coordinates | x 72, y 841, 1296 × 23 | Adds another information band without helping the primary decision. |

## Source-level risks

### CSS accumulation

Current source size:

- `styles.css`: 2,181 lines / 113 KB
- `app.js`: 1,089 lines / 46 KB
- `index.html`: 334 lines / 23 KB

Home selectors are repeatedly redefined across chronological override blocks. For example, `.home-title` is defined near the initial Home styles, then overridden in multiple later design passes and media queries. The ranking tree has an earlier spiral implementation that is later disabled and replaced by the orbital-device implementation.

Risk: another visual pass added as a final override would make behavior harder to predict and would preserve obsolete rules.

Recommendation: when implementation begins, replace the Home block as one coherent module instead of appending another dated override.

### Font inconsistency

The HTML imports DM Sans and Instrument Serif, while later CSS refers to Archivo, Barlow Condensed, Silkscreen and DM Mono. These later families are not declared in the audited HTML or with local `@font-face` rules.

Risk: rendering depends on local availability and fallback behavior.

Recommendation: choose a maximum of two loaded families and define them once as design tokens.

### Locked page architecture

`body[data-page="home"]` uses `height: 100svh; overflow: hidden`.

Risk: the Home cannot naturally support an editorial story, and smaller screens must compress everything into one viewport.

Recommendation: if Editorial Stage is selected, unlock vertical scrolling on Home and let the artist roster occupy its own section.

## Accessibility observations

- Positive: focus-visible outlines exist.
- Positive: reduced-motion media queries exist for several elements.
- Risk: multiple visually animated buttons do not communicate that clicking a character immediately changes the entire view.
- Risk: the Home ranking badges use `aria-label` values such as `Preview rank 1`, reinforcing an unintended hierarchy.
- Risk: when reduced motion is enabled, the amount of visual information remains high even though animation stops.

