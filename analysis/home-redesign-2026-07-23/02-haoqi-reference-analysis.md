# Haoqi.design reference analysis

Reference: `https://haoqi.design/`  
Analyzed: 2026-07-23  
Method: browser screenshots, DOM/computed-layout inspection, public HTML/CSS/JS bundle inspection

## Core design system

### Grid and spacing

- Desktop content uses a 12-column grid.
- Outer desktop gutters are 56 px.
- Mobile outer gutters are 16–24 px depending on the section.
- The first composition is exactly one viewport high.
- A second editorial text section begins only after the first viewport completes.
- Project cards use different column spans, but every card aligns to the same grid.

The important effect is not asymmetry by itself. It is **asymmetry constrained by a visible system**.

### Typography

The first screen uses three levels:

1. small brand/navigation labels;
2. small descriptive blocks at the top;
3. one large, three-line statement anchored to the lower-left.

The statement is large without being overlaid by decoration. Supporting text occupies separate columns rather than sitting on top of the headline.

On mobile, the same content is re-authored:

- logo at the top;
- headline near the top;
- large protected empty middle;
- biography at the bottom;
- time/weather metadata on the baseline.

This is the strongest lesson for GTAI: empty space is an active layout component.

### Color

- Dominant warm off-white background.
- Near-black primary type.
- Gray secondary type.
- One acidic lime accent for labels/signature.

The accent appears rarely, so it retains meaning.

### Navigation

- Desktop navigation is fixed and sparse.
- The header container covers the viewport but uses `pointer-events: none`; only controls opt back into interaction.
- Mobile removes the desktop navigation cluster from the first view instead of shrinking it into a cramped row.

## Page rhythm

### Viewport 1 — positioning

Purpose: say who this person is and what they bring.

No project thumbnails or service cards are introduced here.

### Viewport 2 — point of view

A large editorial paragraph becomes the entire visual event. The handwritten lime signature is the only decorative layer.

Screenshot: [Editorial intro](screenshots/haoqi-intro-desktop.png)

### Selected work — proof

Projects are arranged on the 12-column grid with variable spans. Media is square, while title and year sit below the media rather than on top.

Screenshot: [Work layout](screenshots/haoqi-work-desktop.png)

The page therefore follows a simple sequence:

`Positioning → point of view → evidence → closing invitation`

## Motion system

Observed public implementation:

- React/Next.js.
- Lenis smooth scrolling with `lerp: 0.1`.
- Framer Motion for interface animation.
- Three.js through React Three Fiber.
- Text lines initially render at opacity 0 and reveal after loading.
- A fixed canvas supplies project and transition visuals.
- Scroll position is distributed through a shared scroll bus.
- Pointer coordinates and scroll velocity feed WebGL effects.

### Shader findings

The public bundle includes:

- a radial masked-dots transition using `uHoleRadius`, `uProgress`, `uAspect` and `uFeather`;
- a pixel/dot post-processing effect;
- sine distortion around a pointer position;
- a shatter/cell displacement effect;
- bokeh sampling with blue-noise jitter;
- refraction and chromatic-aberration shaders;
- scroll-synced reveal and cursor/model effects.

The key design lesson is restraint: this large technical system is mostly behind project media and transitions. It does not put multiple visible shader motifs, animated characters and physics objects into the same hero.

## Reliability and performance caution

In the isolated headless browser, Haoqi's fixed canvas/loading sequence did not complete visually without temporarily hiding the canvas and revealing the underlying DOM. The DOM content and layout were present, but the canvas remained over the page.

This does not prove a general production failure, but it demonstrates a real implementation risk:

- WebGL-dependent first paint is harder to test;
- loading failures can obscure otherwise valid content;
- GPU/browser differences need a robust fallback;
- a portfolio can tolerate this risk more easily than a commercial inquiry site.

For GTAI, HTML content must remain fully visible without WebGL.

## Transferable principles

Use:

- grid discipline;
- protected whitespace;
- one message per section;
- externalized labels;
- one accent color;
- a clear narrative sequence;
- restrained, purposeful motion.

Avoid:

- copying the exact black/lime personal-portfolio aesthetic;
- tying first paint to a WebGL loading state;
- importing multiple shader families;
- hiding information needed for agency conversion.

