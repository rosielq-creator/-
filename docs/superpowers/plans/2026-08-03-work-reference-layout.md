# Work Reference Layout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the alternating homepage Work preview with the supplied reference's consistent media-left editorial rows and restrained jelly scrolling.

**Architecture:** Keep the static HTML and existing project assets. Enforce the layout contract through `home-v4.css`, and add a small requestAnimationFrame velocity damper in `home-v4.js` that only updates one CSS custom property.

**Tech Stack:** Static HTML, CSS Grid, vanilla JavaScript, Node.js structural contract tests.

## Global Constraints

- Keep exactly four homepage projects and the existing `VIEW MORE WORK` link.
- Do not alter Artist, brand, bridge, services, or case-page content.
- Preserve native scrolling; do not use scroll snapping or a new dependency.
- Disable jelly motion when reduced motion is requested.

---

### Task 1: Lock the Work Layout Contract

**Files:**
- Modify: `tests/home-structure.test.mjs`
- Modify: `index.html`

**Interfaces:**
- Consumes: the four existing `.work-row` articles.
- Produces: four directionally identical `.work-row` elements containing `.work-media` and `.work-copy`.

- [ ] **Step 1: Write failing structural assertions**

Assert that no Work row includes `work-row-reverse`, that every row contains media before copy, and that the Work archive link remains.

- [ ] **Step 2: Run the structural test and verify failure**

Run: `npm test`
Expected: FAIL because two rows still use `work-row-reverse`.

- [ ] **Step 3: Remove reverse classes from the second and fourth rows**

Change both affected article class attributes to `class="work-row"` without changing their content.

- [ ] **Step 4: Run the structural test and verify success**

Run: `npm test`
Expected: `home structural contract passed`.

### Task 2: Match the Reference Proportions and Type Scale

**Files:**
- Modify: `tests/home-structure.test.mjs`
- Modify: `home-v4.css`

**Interfaces:**
- Consumes: `.work-row`, `.work-media`, `.work-copy`, and `.work-description`.
- Produces: desktop 58/42 rows with 3:2 media and compact 10px/16px/12px typography; mobile stacked rows.

- [ ] **Step 1: Add failing CSS contract assertions**

Assert that Work uses `grid-template-columns:minmax(0,58fr) minmax(0,42fr)`, media uses `aspect-ratio:3/2`, and the row title is `16px`.

- [ ] **Step 2: Run the structural test and verify failure**

Run: `npm test`
Expected: FAIL because the existing Work CSS uses alternating 1.7fr columns and display typography.

- [ ] **Step 3: Replace the Work override block**

Set the common desktop grid, compact spacing and typography, preserve media cropping, and retain a single-column mobile fallback below 760px.

- [ ] **Step 4: Run the structural test and verify success**

Run: `npm test`
Expected: `home structural contract passed`.

### Task 3: Add Restrained Jelly Scroll Response

**Files:**
- Modify: `tests/home-structure.test.mjs`
- Modify: `home-v4.js`
- Modify: `home-v4.css`

**Interfaces:**
- Consumes: browser `scrollY`, `requestAnimationFrame`, and `.work-index`.
- Produces: CSS custom property `--work-jelly` in the inclusive range `[-12, 12]`.

- [ ] **Step 1: Add failing motion contract assertions**

Assert that JavaScript writes `--work-jelly`, clamps with `Math.max(-12,Math.min(12`, and CSS translates `.work-index` using the variable with a reduced-motion reset.

- [ ] **Step 2: Run the structural test and verify failure**

Run: `npm test`
Expected: FAIL because no Work velocity damper exists.

- [ ] **Step 3: Implement the requestAnimationFrame damper**

On scroll, convert the latest delta to an opposing clamped offset; on animation frames, multiply the value by `0.82` until its absolute value is below `0.05`, then write zero and stop the loop.

- [ ] **Step 4: Add transform and reduced-motion CSS**

Translate `.work-index` by `calc(var(--work-jelly,0) * 1px)` and force `transform:none` inside the existing reduced-motion media query.

- [ ] **Step 5: Run all tests**

Run: `npm test`
Expected: `home structural contract passed`.

### Task 4: Browser Verification and Release

**Files:**
- Modify only if verification exposes a defect in the files above.

**Interfaces:**
- Consumes: local static server and deployed GitHub Pages output.
- Produces: verified desktop and mobile Work presentation.

- [ ] **Step 1: Start the local server and inspect desktop**

Use a 1440px desktop viewport. Verify all four rows are media-left, the media/copy proportion matches the reference, and text remains readable while scrolling.

- [ ] **Step 2: Inspect mobile and reduced motion**

Use a 390px viewport and reduced-motion emulation. Verify stacked layout, no horizontal overflow, and no jelly translation under reduced motion.

- [ ] **Step 3: Run the full test suite again**

Run: `npm test`
Expected: `home structural contract passed`.

- [ ] **Step 4: Commit and push**

Commit the verified files, integrate the feature branch into `main`, push `main`, and confirm the deployed revision.
