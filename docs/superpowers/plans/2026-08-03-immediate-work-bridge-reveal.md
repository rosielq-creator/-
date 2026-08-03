# Immediate Work Bridge Reveal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the Artist-to-Work bridge respond immediately, remove artist numbering, present a single-line outlined white slogan with a silver sheen, and render every brand logo monochrome without a tile or asset background.

**Architecture:** Keep the static `index.html` + `home-v4.css` + `home-v4.js` homepage. Markup defines one slogan line and background-free logo sources; CSS maps one normalized `--bridge-progress` value into mask, letter lift, blur, and sheen; JavaScript continues to expose reversible scroll progress.

**Tech Stack:** Static HTML, CSS custom properties/transforms/clip-path, vanilla JavaScript, Node structural tests.

## Global Constraints

- Section order remains Artists → slogan bridge → brand logos → Work.
- `SEE WHAT WE MAKE POSSIBLE.` remains one line and contains no green text.
- The bridge has no pure-black hold before text motion begins.
- Artist numbers `01`–`05` are not visible.
- Brand marks are monochrome and background-free.
- Preserve `prefers-reduced-motion` behavior.

---

### Task 1: Lock the revised homepage contract

**Files:**
- Modify: `tests/home-structure.test.mjs`

**Interfaces:**
- Consumes: `index.html`, `home-v4.css`, and `home-v4.js` as UTF-8 text.
- Produces: assertions for one-line slogan markup, absent numbering, synchronized bridge variables, outlined sheen styling, and background-free logo styling.

- [ ] **Step 1: Write failing structural assertions**

Add assertions that reject `<span>01</span>` through `<span>05</span>`, require a single `.bridge-slogan` element containing the complete slogan, require `--bridge-mask-progress` and `--bridge-text-progress`, require `-webkit-text-stroke` and `.bridge-sheen`, and reject colored `.brand-logo-*` backgrounds.

- [ ] **Step 2: Run the test and verify failure**

Run: `npm test`
Expected: FAIL because the current page has two slogan spans, numbered artist cards, and colored raster-logo tile backgrounds.

- [ ] **Step 3: Commit the failing contract**

```bash
git add tests/home-structure.test.mjs
git commit -m "test: lock immediate bridge and monochrome logo contract"
```

### Task 2: Update Artist and slogan markup

**Files:**
- Modify: `index.html:72-120`

**Interfaces:**
- Consumes: existing artist links and brand accessibility labels.
- Produces: `.bridge-mask`, `.bridge-slogan`, `.bridge-letter`, and `.bridge-sheen` hooks for CSS; artist cards without number spans.

- [ ] **Step 1: Remove the five artist number spans**

Keep each linked `<img>` unchanged and remove only its adjacent numeric `<span>`.

- [ ] **Step 2: Replace the split heading with one accessible line**

Use one `.bridge-slogan` heading containing the complete `SEE WHAT WE MAKE POSSIBLE.` copy and a sheen layer marked `aria-hidden="true"`; add a decorative `.bridge-mask` layer.

- [ ] **Step 3: Run the test**

Run: `npm test`
Expected: still FAIL on CSS synchronization and logo background rules, while markup assertions pass.

### Task 3: Synchronize mask, outlined letter lift, and sheen

**Files:**
- Modify: `home-v4.css:6,177-179`
- Modify: `home-v4.js:53-66`

**Interfaces:**
- Consumes: normalized `progress: number` in `[0,1]` from `syncWorkBridge()`.
- Produces: CSS properties `--bridge-progress`, `--bridge-mask-progress`, and `--bridge-text-progress` on `[data-work-bridge]`.

- [ ] **Step 1: Expose synchronized progress values**

In `syncWorkBridge()`, set mask progress from the full range and map text progress to start near mask progress `0.1`, clamped to `[0,1]`. Keep requestAnimationFrame throttling and reverse-scroll behavior.

- [ ] **Step 2: Implement the immediate mask and single-line outlined type**

Make `.bridge-mask` rise from the bottom immediately. Keep `.bridge-slogan` on one line with `white-space:nowrap`, responsive `clamp()`, transparent fill plus white `-webkit-text-stroke`, scroll-driven upward transform, and blur-to-clear filtering.

- [ ] **Step 3: Implement the restrained silver sheen**

Overlay a clipped silver-white gradient through `.bridge-sheen`, translate it horizontally using `--bridge-text-progress`, and avoid looping keyframes, green, glow, or heavy shadow.

- [ ] **Step 4: Preserve reduced motion**

In the existing reduced-motion media query, show the mask and outlined slogan in their completed state with no blur or sheen travel.

### Task 4: Remove all brand backgrounds

**Files:**
- Modify: `home-v4.css:160-179`
- Modify: `assets/brands/parknshop.svg`
- Modify: `assets/brands/the-peninsula-hong-kong.svg`
- Modify: `assets/brands/chow-sang-sang.svg`
- Modify: `index.html:114-120`

**Interfaces:**
- Consumes: existing accessible brand labels.
- Produces: transparent SVG sources and uniform white monochrome logo presentation.

- [ ] **Step 1: Point raster-backed brands to transparent SVG marks**

Replace the ParknShop, Peninsula, and Chow Sang Sang `.png`/`.jpg` sources with their transparent SVG counterparts while keeping alt text and labels.

- [ ] **Step 2: Remove per-brand colored tile overrides**

Delete forced black, white, and red backgrounds and raster-specific blend rules. Keep all tiles transparent and apply one grayscale/white filter system to every image.

- [ ] **Step 3: Run structural tests**

Run: `npm test`
Expected: PASS and print `home structural contract passed`.

### Task 5: Browser verification and publication

**Files:**
- Modify only if verification reveals a scoped defect: `home-v4.css`, `home-v4.js`, or `index.html`

**Interfaces:**
- Consumes: local homepage served by the existing npm script.
- Produces: desktop/mobile screenshots and a published GitHub Pages revision.

- [ ] **Step 1: Verify desktop and mobile**

Check the Artist exit, first bridge scroll frame, mid-reveal, completed slogan, and brand grid at desktop and mobile widths. Confirm no horizontal overflow, no visible artist numbers, no pure-black pause, and no logo tile backgrounds.

- [ ] **Step 2: Verify reduced motion and console output**

Emulate reduced motion, confirm readable completed content, and confirm zero browser console errors.

- [ ] **Step 3: Run final tests and diff checks**

Run: `npm test && git diff --check`
Expected: tests pass and diff check emits no output.

- [ ] **Step 4: Commit and push**

```bash
git add index.html home-v4.css home-v4.js tests/home-structure.test.mjs assets/brands/*.svg
git commit -m "fix: synchronize work bridge reveal"
git push origin main
```
