# Homepage Brand Logos Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a static seven-logo brand section immediately after Artists, with every official brand mark presented in a unified monochrome treatment.

**Architecture:** Keep the homepage dependency-free. Add semantic HTML in `index.html`, isolated responsive styling in `home-v4.css`, and locally hosted logo assets under `assets/brands/`; extend the existing structural contract test so section order, logo count, names, and monochrome treatment cannot regress.

**Tech Stack:** Semantic HTML5, CSS Grid, SVG/PNG assets, Node.js built-in assertion tests.

## Global Constraints

- The section follows Artists and precedes Work.
- Layout is static: left title, right seven-logo grid; no carousel, scrolling control, or brand switching.
- Brands: PARKnSHOP Hong Kong, MGM Macau, Octopus Hong Kong, The Peninsula Hong Kong, ChillGood TV, Asia Allied Infrastructure, Chow Sang Sang.
- All marks appear black/white only and retain their native aspect ratios.
- Existing Artists and Work behavior remains unchanged.

---

### Task 1: Lock the brand-section contract

**Files:**
- Modify: `tests/home-structure.test.mjs`

**Interfaces:**
- Consumes: homepage HTML and CSS as strings.
- Produces: assertions for `.brands`, seven `.brand-logo` entries, exact brand labels, section order, and CSS monochrome filtering.

- [ ] **Step 1: Write failing assertions** for `artists → brands → work`, seven logos, all seven accessible labels, and `grayscale(1)`.
- [ ] **Step 2: Run `npm test`** and confirm failure because the brand section does not yet exist.
- [ ] **Step 3: Commit the failing contract** with `test: define homepage brand grid contract`.

### Task 2: Add local brand assets and semantic markup

**Files:**
- Create: `assets/brands/*`
- Modify: `index.html`

**Interfaces:**
- Consumes: locally stored official brand marks.
- Produces: `<section class="brands">` containing seven `.brand-logo` figures with accessible names.

- [ ] **Step 1: Save each verified brand mark locally** with a stable lowercase filename.
- [ ] **Step 2: Add the section after Artists** with the heading `Brands we’ve worked with` and a seven-item grid.
- [ ] **Step 3: Run `npm test`** and confirm only the styling assertion remains failing.
- [ ] **Step 4: Commit** with `feat: add homepage brand logo section`.

### Task 3: Style and verify the monochrome grid

**Files:**
- Modify: `home-v4.css`

**Interfaces:**
- Consumes: `.brands`, `.brands-head`, `.brand-grid`, and `.brand-logo` markup.
- Produces: a desktop split layout, responsive mobile stack, consistent logo boxes, and monochrome presentation.

- [ ] **Step 1: Add desktop styling** matching the homepage border, spacing, typography, and 3-column grid rhythm.
- [ ] **Step 2: Apply monochrome treatment** using `filter: grayscale(1) contrast(1.15)` and opacity without distorting aspect ratios.
- [ ] **Step 3: Add mobile styling** that stacks the title and uses a two-column logo grid.
- [ ] **Step 4: Run `npm test`** and confirm `home structural contract passed`.
- [ ] **Step 5: Run the site and visually verify** desktop and mobile layouts, missing assets, and overflow.
- [ ] **Step 6: Commit** with `style: unify homepage brand logos in monochrome`.
