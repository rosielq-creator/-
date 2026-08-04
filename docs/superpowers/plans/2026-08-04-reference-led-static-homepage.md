# Reference-Led Static Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the rejected prototype with one desktop full-page static homepage whose structural composition closely follows By Monolog while retaining GreenTomato content and authentic media.

**Architecture:** Keep the existing semantic section sequence and bilingual shell, but remove the ambient/motion prototype from the static approval build. Recompose the homepage through a dedicated reference-led stylesheet; validate the section contract and native 16:9 media before creating a single full-page browser capture.

**Tech Stack:** Semantic HTML5, CSS Grid, existing vanilla JavaScript modules, Node structural tests, Playwright/Chromium screenshot verification.

## Global Constraints

- Static layout is led by By Monolog: close structural reproduction of header proportions, typography scale, asymmetric positioning, whitespace cadence, artist index, and Success Stories rhythm.
- Essential contributes no styling to this checkpoint; its 3D and scroll motion are deferred until static and mobile layouts are approved.
- Use only authentic source assets and official client/brand materials.
- Desktop Work videos remain native 16:9 with no decorative cropping.
- Include Header, Hero, About, Artists, Success Stories, Brands, Services, Contact, and Footer.
- Do not use decorative gradients, rainbow blobs, glass cards, neon accents, floating cards, or template color panels.
- Preserve normal HTML flow, keyboard semantics, bilingual controls, in-place video controls, and separate project links.

---

### Task 1: Lock the static homepage contract

**Files:**
- Modify: `tests/home-structure.test.mjs`
- Modify: `index.html`

**Interfaces:**
- Consumes: existing `data-site-shell`, language controls, section IDs, `data-media-toggle`, and `data-project-link` hooks.
- Produces: `.reference-home`, `.artist-index`, `.success-stories`, `.brand-index`, and an HTML document with no `.ambient-stage` or motion-only attributes.

- [ ] **Step 1: Write the failing structural assertions**

```js
assert.match(home, /class="[^"]*reference-home/);
assert.match(home, /class="artist-index"/);
assert.match(home, /class="success-stories"/);
assert.match(home, /class="brand-index"/);
assert.doesNotMatch(home, /ambient-stage|data-ambient-object|data-motion-section|data-motion-item/);
```

- [ ] **Step 2: Run the contract and verify failure**

Run: `node tests/home-structure.test.mjs`

Expected: FAIL because the rejected prototype still contains `.ambient-stage` and lacks the new reference-led class names.

- [ ] **Step 3: Replace prototype-only homepage hooks**

Update the body and section hooks to the following contract while preserving all content and accessibility labels:

```html
<body class="reference-home">
  <header class="site-header" data-site-shell>...</header>
  <main id="main">
    <section class="home-hero" aria-labelledby="hero-title">...</section>
    <section id="about" class="home-about" aria-labelledby="about-title">...</section>
    <section id="artists" class="artist-index" aria-labelledby="artists-title">...</section>
    <section id="work" class="success-stories" aria-labelledby="work-title">...</section>
    <section id="brands" class="brand-index" aria-labelledby="brands-title">...</section>
    <section id="services" class="service-flow" aria-labelledby="services-title">...</section>
    <section id="contact" class="contact-flow" aria-labelledby="contact-title">...</section>
  </main>
</body>
```

Delete the ambient stage and all motion-only attributes. Keep each video button, project link, language control, label, and form field intact.

- [ ] **Step 4: Run the contract and verify pass**

Run: `node tests/home-structure.test.mjs`

Expected: `home structural contract passed`.

- [ ] **Step 5: Commit the semantic reset**

```bash
git add index.html tests/home-structure.test.mjs
git commit -m "refactor: reset homepage for reference-led layout"
```

### Task 2: Build the By Monolog-led desktop composition

**Files:**
- Modify: `styles/home-continuous.css`
- Modify: `styles/site-shell.css`
- Test: `tests/home-structure.test.mjs`

**Interfaces:**
- Consumes: the semantic classes from Task 1 and shared `--gutter`, `--paper`, `--ink`, and typography variables.
- Produces: a desktop layout at 1440px with cover-like Hero, negative-space About, directory Artists, medium 16:9 Success Stories, editorial Brands, and continuous Services/Contact ending.

- [ ] **Step 1: Add CSS source assertions**

```js
const css = readFileSync(new URL("../styles/home-continuous.css", import.meta.url), "utf8");
assert.match(css, /\.reference-home/);
assert.match(css, /\.success-stories/);
assert.match(css, /aspect-ratio:\s*16\s*\/\s*9/);
assert.doesNotMatch(css, /ambient-|backdrop-filter|radial-gradient|linear-gradient/);
```

- [ ] **Step 2: Run the contract and verify failure**

Run: `node tests/home-structure.test.mjs`

Expected: FAIL because the old stylesheet contains the rejected ambient and gradient language.

- [ ] **Step 3: Replace the prototype stylesheet with the static editorial system**

Implement these exact layout invariants:

```css
.reference-home{background:#f4f4f0;color:#111}
.home-hero{min-height:100svh;display:grid;grid-template-columns:repeat(12,minmax(0,1fr));padding:7rem var(--gutter) 2rem}
.home-hero h1{grid-column:1/-1;align-self:end;margin:0;font-size:clamp(7rem,17vw,17rem);line-height:.72;letter-spacing:-.095em;white-space:nowrap}
.home-about,.artist-index,.success-stories,.brand-index,.service-flow,.contact-flow{padding:clamp(9rem,15vw,18rem) var(--gutter)}
.artist-index{display:grid;grid-template-columns:repeat(12,minmax(0,1fr))}
.success-stories{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));row-gap:clamp(8rem,13vw,15rem)}
.success-stories .work-card{grid-column:1/span 8}
.success-stories .work-card:nth-of-type(even){grid-column:5/span 8}
.work-media video{display:block;width:100%;aspect-ratio:16/9;object-fit:contain;background:#111}
.brand-index{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));background:transparent;color:inherit}
```

Complete the typography, captions, artist rows, partner index, services, form rules, and footer without decorative cards, gradient fills, glass effects, or motion states. Use spacing and alignment—not background panels—to separate sections.

- [ ] **Step 4: Run structural and syntax checks**

Run: `node tests/home-structure.test.mjs && node --check scripts/home.js && git diff --check`

Expected: structural contract passes, JavaScript syntax passes, and `git diff --check` prints nothing.

- [ ] **Step 5: Commit the desktop composition**

```bash
git add styles/home-continuous.css styles/site-shell.css tests/home-structure.test.mjs
git commit -m "style: reproduce reference-led desktop composition"
```

### Task 3: Capture and gate the full-page static review

**Files:**
- Create: `previews/reference-static-desktop-full.png`
- Verify: `index.html`
- Verify: `styles/home-continuous.css`

**Interfaces:**
- Consumes: the desktop composition from Task 2.
- Produces: one 1440px full-page review image showing every required section and a user approval gate before mobile or motion work.

- [ ] **Step 1: Start the local static server**

Run: `python3 -m http.server 4173`

Expected: server listens on `http://127.0.0.1:4173`.

- [ ] **Step 2: Capture the full page at the desktop review viewport**

Use Chromium at `1440 × 1000`, open `http://127.0.0.1:4173/index.html`, wait for fonts and poster images, then save a full-page screenshot to `previews/reference-static-desktop-full.png`.

Expected: the screenshot visibly includes Header, Hero, About, Artists, all Success Stories, Brands, Services, Contact, and Footer.

- [ ] **Step 3: Verify layout integrity**

In the browser, evaluate:

```js
({
  width: document.documentElement.scrollWidth,
  viewport: document.documentElement.clientWidth,
  sections: [...document.querySelectorAll('main > section')].map(section => section.id || section.className),
  ratios: [...document.querySelectorAll('.work-media video')].map(video => getComputedStyle(video).aspectRatio)
})
```

Expected: `width === viewport`, the seven homepage sections are present in order, and every reported video ratio is `16 / 9`.

- [ ] **Step 4: Run the final checkpoint checks**

Run: `node tests/home-structure.test.mjs && node --check scripts/home.js && git diff --check`

Expected: all checks pass with no diff whitespace errors.

- [ ] **Step 5: Send the screenshot for approval**

Send `previews/reference-static-desktop-full.png` to the active Discord channel. Do not begin responsive CSS or Essential-inspired motion until the user explicitly approves this static composition.

