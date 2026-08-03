# Artist Transition and Brand Logos Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the five-artist scroll feel like one continuous 3D track, insert the approved black slogan transition before the brand-logo bridge, and use Rosie's supplied ParknShop, Peninsula, and Chow Sang Sang marks.

**Architecture:** Keep the static homepage architecture and add three focused layers: a five-card artist rail driven by scroll progress, a sticky slogan transition driven by CSS custom properties, and a responsive brand-logo grid. JavaScript only calculates active artist and normalized section progress; CSS owns transforms, easing, and reduced-motion behavior.

**Tech Stack:** Semantic HTML, CSS transforms/perspective, vanilla JavaScript, Node structural tests.

## Global Constraints

- Section order is Artist → black slogan transition → brand logos → Work.
- Slogan is `SEE WHAT WE MAKE POSSIBLE.`
- Preserve supplied brand artwork; do not redraw logos.
- Support `prefers-reduced-motion: reduce`.
- No new runtime dependency.

---

### Task 1: Structural Contract and Brand Assets

**Files:**
- Modify: `tests/home-structure.test.mjs`
- Create: `assets/brands/parknshop.png`
- Create: `assets/brands/peninsula.png`
- Create: `assets/brands/chow-sang-sang.jpg`

**Interfaces:**
- Consumes: supplied inbound logo files.
- Produces: stable asset paths and tests for the new homepage sequence.

- [ ] **Step 1: Add failing assertions** for the five-card rail, transition slogan, transition/logo/work order, three supplied asset paths, and reduced-motion contract.
- [ ] **Step 2: Run `npm test`** and confirm the new assertions fail.
- [ ] **Step 3: Copy the exact supplied files** into `assets/brands/` without altering pixels.
- [ ] **Step 4: Commit with the implementation tasks** after the complete contract passes.

### Task 2: Continuous Artist Rail

**Files:**
- Modify: `index.html`
- Modify: `home-v4.css`
- Modify: `home-v4.js`

**Interfaces:**
- Consumes: `artists[]`, `[data-artist-stage]`, and scroll position.
- Produces: `--artist-progress`, active metadata, and five persistent `.artist-card` elements.

- [ ] **Step 1: Replace the swapping portrait** with five persistent portrait cards inside one perspective rail.
- [ ] **Step 2: Derive continuous scroll progress** from the artist trigger track and set `--artist-progress` every animation frame.
- [ ] **Step 3: Map each card's distance from progress** to translate3d, rotateY, scale, opacity, blur, and z-index while updating metadata only when the nearest card changes.
- [ ] **Step 4: Add mobile and reduced-motion fallbacks** that retain readable navigation without depth blur.

### Task 3: Slogan and Brand Bridge

**Files:**
- Modify: `index.html`
- Modify: `home-v4.css`
- Modify: `home-v4.js`

**Interfaces:**
- Consumes: transition-section viewport progress and the three stable brand asset paths.
- Produces: `--bridge-progress`, masked slogan motion, logo reveal, and a clean handoff to Work.

- [ ] **Step 1: Insert the approved black transition section** after Artists with split slogan lines and an accessibility label.
- [ ] **Step 2: Insert a brand-logo bridge** after the slogan using ParknShop, Peninsula, and Chow Sang Sang images with per-logo optical sizing.
- [ ] **Step 3: Update transition progress** through requestAnimationFrame and expose it as `--bridge-progress`.
- [ ] **Step 4: Implement translate/clip-path/reveal animation** and a static reduced-motion state.

### Task 4: Verification and Publish

**Files:**
- Modify: `tests/home-structure.test.mjs`

**Interfaces:**
- Consumes: final homepage and CSS/JS.
- Produces: passing automated contract and browser QA evidence.

- [ ] **Step 1: Run `npm test`** and require `home structural contract passed`.
- [ ] **Step 2: Start `node server.js`** and inspect desktop and mobile screenshots plus console errors.
- [ ] **Step 3: Verify section order, all five artist states, all three exact logos, and reduced-motion behavior.**
- [ ] **Step 4: Commit and push the verified homepage** to the configured GitHub Pages branch.
