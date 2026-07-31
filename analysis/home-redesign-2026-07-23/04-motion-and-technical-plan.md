# Motion and technical direction

This document is an implementation plan only. No website code was changed.

## Motion principle

The Home needs fewer animation families, not richer simultaneous animation.

| Before | After |
| --- | --- |
| 17 observed CSS animations plus a physics `requestAnimationFrame` loop | One page-reveal system, one roster interaction system, and at most one ambient visual |
| Five characters loop continuously with different actions | Characters remain still until their section is active; one focused artist may move briefly |
| Physics letters react continuously to the pointer | Remove from the hero or use one lightweight pointer response on a single object |
| Orbit, crystal and character motion all compete with the headline | Keep the headline in a protected static zone |
| Mobile retains nearly every desktop visual layer | Mobile keeps typography, one image and direct navigation |
| Several animation timings use generic `ease-in-out` loops | Use 120–180 ms for micro-feedback and 320–500 ms for section reveals |
| Reduced motion stops some loops but leaves the dense composition intact | Reduced motion also simplifies state changes and disables autoplay/ambient movement |

## Recommended motion stack

### Tier 1 — page reveal

- Reveal headline lines with opacity and a small upward translation.
- Duration: 420–520 ms.
- Stagger: 45–65 ms per line.
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)`.
- Reduced motion: opacity only, no translation.

### Tier 2 — roster interaction

- Hover/focus on an artist name crossfades the shared image stage.
- Name underline or rule expands in 140–180 ms.
- Image change uses 220–300 ms opacity with no dramatic scale.
- Touch devices use tap-to-select; no hover dependency.

### Tier 3 — optional signature visual

Choose only one:

1. a subtle masked-dot reveal between hero and roster;
2. one gently refracting GTAI object;
3. a slow orbital line behind a single hero subject.

Do not combine them.

## Shader recommendation

Haoqi's masked-dot transition is the only shader idea worth considering for GTAI Home because it can function as a transition rather than a permanent competing object.

If used:

- render it behind semantic HTML;
- do not block first paint;
- cap device pixel ratio at 1.5;
- pause when the document is hidden;
- disable on reduced motion and low-power/mobile contexts;
- provide a CSS opacity fallback;
- use it once between major sections, not on every card.

Avoid importing Haoqi-like sine, shatter, bokeh, refraction and chromatic-aberration effects together. They increase GPU and testing cost without resolving the Home hierarchy.

## Architecture changes required for implementation

### 1. Isolate Home styles

Replace accumulated overrides with one coherent Home module:

- tokens;
- header;
- hero;
- roster section;
- proof section;
- responsive rules;
- reduced-motion rules.

Do not append another dated override to the bottom of `styles.css`.

### 2. Unlock Home scrolling

Remove the fixed `100svh` body lock for Home if Editorial Stage is selected. Individual full-screen views such as the existing artist carousel can still lock their own section when active.

### 3. Separate motion lifecycle

- Start animation only when its section enters the viewport.
- Stop `requestAnimationFrame` work when hidden or inactive.
- Use `IntersectionObserver` for activation.
- Prefer CSS transforms/opacity for the main UI.
- Keep canvas optional and independently disposable.

### 4. Normalize typography

Load and use no more than:

- one display family;
- one body/mono family.

Remove references to undeclared families or explicitly self-host them.

### 5. Rebuild mobile navigation

The current six-item navigation row is too dense at 390 px.

Recommended:

- logo left;
- language/sound or menu right;
- full navigation in an accessible disclosure/dialog;
- minimum 44 × 44 px targets;
- focus trap and Escape close for a modal menu.

## Suggested implementation sequence

1. Static wireframe at 1440 × 900 and 390 × 844.
2. Confirm hierarchy and artist equality with no motion.
3. Consolidate Home CSS and remove obsolete blocks.
4. Implement responsive roster interaction.
5. Add Tier 1 reveal.
6. Add one optional Tier 3 visual only if the static design already feels complete.
7. Test keyboard, touch, reduced motion and low-performance fallback.

## Acceptance criteria

- The hero has one dominant message at first glance.
- No rank or popularity hierarchy appears among artists.
- All five artists are reachable with equal interaction cost.
- The mobile Home contains no overlapping type and portraits.
- Primary CTA is visible without searching.
- HTML content remains visible if canvas/WebGL fails.
- No more than one continuous ambient animation runs in the visible viewport.
- `prefers-reduced-motion` produces a complete, not merely frozen, experience.

