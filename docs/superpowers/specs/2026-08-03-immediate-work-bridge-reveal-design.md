# Immediate Work Bridge Reveal

## Goal

Remove the empty black pause between Artists and the work-bridge slogan. As soon as the user scrolls beyond the final artist, the black mask must cover the outgoing content while the slogan letters rise into view.

## Motion design

- The black mask and slogan use the same normalized bridge scroll progress.
- The mask begins moving at progress `0` and covers from bottom to top.
- Letter reveal begins once the mask has covered roughly 10% of the viewport; there is no fully black hold before the text appears.
- Letters rise from below their clipped line boxes with a small per-letter stagger, but the stagger is derived from scroll progress rather than a time-based animation.
- The completed slogan remains readable briefly before the brand-logo section enters.
- Existing section order remains Artists → slogan bridge → brand logos → Work.

## Implementation boundary

Keep the current static homepage structure. Adjust only the bridge markup/styles/progress mapping required to synchronize the mask and letters. Preserve GPU-friendly transform/clip-path animation and the existing `prefers-reduced-motion` fallback.

## Acceptance criteria

- The first downward scroll after Artists immediately reveals black mask motion and rising slogan letters.
- No viewport-length or visually noticeable pure-black frame occurs.
- Reversing scroll reverses both effects smoothly.
- Desktop and mobile preserve the same narrative timing.
- Existing homepage structure tests pass, with a new assertion covering the synchronized reveal contract.
