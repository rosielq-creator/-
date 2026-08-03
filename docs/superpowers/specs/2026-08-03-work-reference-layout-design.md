# Work Reference Layout Design

## Goal

Match the supplied Menulog reference for the homepage Work rows and remove all jelly/elastic motion.

## Approved visual contract

- Desktop content rail is asymmetric and narrower: `padding-left: 17.5vw`, `padding-right: 2vw`.
- Every row uses media left and copy right at `58 / 42` with a `20px` gap.
- Media stays at `3 / 2`, is clipped by its frame, and never translates, scales, or springs while scrolling.
- Rows use compact `38px` vertical spacing and a one-pixel divider.
- Copy kicker is 11–13px, title is 22–29px, and body is 16–21px with restrained line height.
- Mobile remains media above copy and uses no motion.

## Verification

The structural test must reject the prior 71.5/28.5 ratio, oversized typography, and any Work jelly/translation implementation. Desktop and mobile browser screenshots must show no horizontal overflow or media escape.
