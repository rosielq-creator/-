# Work Reference Layout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reproduce the supplied compact Work layout and remove all elastic motion.

**Architecture:** Keep the existing semantic Work markup and change only its CSS layout contract. Protect the measured ratios and typography with the existing Node structural test.

**Tech Stack:** HTML, CSS, vanilla JavaScript, Node test runner.

## Global Constraints

- Desktop Work rail uses asymmetric `17.5vw / 2vw` gutters.
- Work rows use `58 / 42`, `20px` gap, and `3 / 2` media.
- Work media and rows never translate, scale, spring, or use jelly motion.

---

### Task 1: Lock and implement the reference layout

**Files:**
- Modify: `tests/home-structure.test.mjs`
- Modify: `home-v4.css`

**Interfaces:**
- Consumes: existing `.work`, `.work-row`, `.work-media`, `.work-copy`, and `.work-description` markup.
- Produces: a stable responsive Work rail matching the approved measurements.

- [ ] **Step 1: Write failing structural assertions** for gutters, 58/42 ratio, compact type, and zero Work motion.
- [ ] **Step 2: Run `npm test`** and confirm it fails against the 71.5/28.5 layout.
- [ ] **Step 3: Replace the Work CSS override** with the approved measurements.
- [ ] **Step 4: Run `npm test`** and confirm the complete suite passes.
- [ ] **Step 5: Run desktop/mobile browser QA** and verify the media stays clipped with no overflow.
- [ ] **Step 6: Commit and push** the verified files to `main`.
