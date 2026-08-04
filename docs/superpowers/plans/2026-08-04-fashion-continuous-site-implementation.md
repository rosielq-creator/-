# GreenTomato Continuous Fashion Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild GreenTomato as a continuous bilingual fashion-studio website, add a motion-ready Maya profile, preserve official case content, and replace the mailto inquiry with a validated Google Sheet submission path.

**Architecture:** Keep the static GitHub Pages deployment and semantic document flow. Split bilingual content, section motion, media controls, profile character orchestration, and inquiry submission into focused ES modules; use CSS custom properties for scroll progress and progressive-enhancement classes for motion. Treat authentic-media provenance and Maya transparent video delivery as explicit gates rather than silently reusing old generated imagery.

**Tech Stack:** Semantic HTML5, modular vanilla JavaScript, CSS, Node 20 test runner, Python asset checks, Google Apps Script web app, GitHub Pages.

## Global Constraints

- Use only authentic source material and official brand/client case-study assets; no previously AI-generated photographs may appear even temporarily.
- The site is one continuous HTML document, not Canvas rendering, mandatory screen snapping, or page-by-page panels.
- Use cream white and ink black; establish section changes with content hand-offs, not hard rules or large color fields.
- English is default; Chinese is editorially rewritten and must not break layout.
- Desktop motion is experimental; mobile and `prefers-reduced-motion` receive stable, lighter behavior.
- Work play controls play/pause in place and remain separate from project navigation.
- Maya appears as a character only on `maya.html`.
- Never invent platform metrics or campaign results.
- Confirm the Google Sheet and Gmail recipient immediately before external creation or deployment.

---

### Task 1: Authentic Asset Gate and Regression Harness

**Files:**
- Create: `data/authentic-assets.json`
- Create: `tests/authentic-assets.test.mjs`
- Modify: `package.json`

**Interfaces:**
- Produces: `data/authentic-assets.json` records shaped as `{path, kind, source, approved}`.
- Produces: `npm test` running structure and asset-provenance tests.

- [ ] **Step 1: Write the failing provenance test**

```js
// tests/authentic-assets.test.mjs
import assert from "node:assert/strict";
import fs from "node:fs";
const manifest = JSON.parse(fs.readFileSync("data/authentic-assets.json", "utf8"));
for (const item of manifest) {
  assert.ok(["official-client", "user-original", "licensed-brand", "commissioned-motion"].includes(item.source));
  assert.ok(fs.existsSync(item.path), `${item.path} does not exist`);
}
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `node tests/authentic-assets.test.mjs`

Expected: FAIL with `ENOENT: data/authentic-assets.json`.

- [ ] **Step 3: Create the explicit manifest from verified official work only**

```json
[
  {"path":"assets/work/takoyaki-poster.jpg","kind":"case-poster","source":"official-client","approved":true},
  {"path":"assets/work/web-video/takoyaki.web.mp4","kind":"case-video","source":"official-client","approved":true},
  {"path":"assets/work/peninsula/peninsula-fathers-day-key-visual.jpg","kind":"case-poster","source":"official-client","approved":true},
  {"path":"assets/work/web-video/peninsula.web.mp4","kind":"case-video","source":"official-client","approved":true},
  {"path":"assets/work/octopus-cover.jpg","kind":"case-poster","source":"official-client","approved":true},
  {"path":"assets/work/web-video/octopus.web.mp4","kind":"case-video","source":"official-client","approved":true},
  {"path":"assets/work/mgm-01-poster.jpg","kind":"case-poster","source":"official-client","approved":true},
  {"path":"assets/work/web-video/mgm-01.web.mp4","kind":"case-video","source":"official-client","approved":true}
]
```

Before committing, verify each `official-client` source against repository history or client delivery records. Do not add artist photography until Rosie identifies it as a user original or licensed brand asset.

- [ ] **Step 4: Update the test script**

```json
"scripts": {
  "start": "node server.js",
  "test": "node tests/home-structure.test.mjs && node tests/authentic-assets.test.mjs"
}
```

- [ ] **Step 5: Run the focused tests**

Run: `npm test`

Expected: PASS. This first gate validates every declared record; Tasks 3 and 5 extend it to require every rendered local media path to be declared.

- [ ] **Step 6: Commit**

```bash
git add data/authentic-assets.json tests/authentic-assets.test.mjs package.json
git commit -m "test: gate site media by verified provenance"
```

### Task 2: Bilingual Content and Shared Page Shell

**Files:**
- Create: `scripts/site-content.js`
- Create: `scripts/i18n.js`
- Create: `styles/site-shell.css`
- Modify: `index.html`
- Modify: `maya.html`
- Modify: `tests/home-structure.test.mjs`

**Interfaces:**
- Produces: `SITE_CONTENT` with `en` and `zh` keys and identical nested property paths.
- Produces: `createLanguageController({root, storageKey})` returning `{language, setLanguage}`.
- Applies translations through `[data-copy]` attributes while preserving form values and scroll position.

- [ ] **Step 1: Add failing shell and language assertions**

```js
assert.match(home, /data-site-shell/);
assert.match(home, /data-language="en"/);
assert.match(home, /data-language="zh"/);
assert.doesNotMatch(home, /<canvas\b/i);
assert.match(home, /type="module" src="scripts\/home\.js/);
assert.match(maya, /type="module" src="scripts\/maya-profile\.js/);
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `node tests/home-structure.test.mjs`

Expected: FAIL on `data-site-shell` or the module script assertion.

- [ ] **Step 3: Create the content contract**

```js
// scripts/site-content.js
export const SITE_CONTENT = {
  en: {
    nav: { about: "About", artists: "Artists", work: "Work", services: "Services", contact: "Contact" },
    hero: { eyebrow: "AI ARTISTS / CREATIVE PRODUCTION", title: "GreenTomato", statement: "We build identities, images and worlds for culture-shaping brands." },
    about: { title: "Human taste. Machine possibility.", body: "We represent next-generation artists and create AI-native campaigns with a human point of view." },
    contact: { title: "Tell us your story", name: "Name", email: "Email", company: "Brand / company", message: "Project description", submit: "Send inquiry" }
  },
  zh: {
    nav: { about: "关于", artists: "人物", work: "案例", services: "服务", contact: "联系" },
    hero: { eyebrow: "AI 人物 / 创意制作", title: "GreenTomato", statement: "为塑造文化的品牌，建立人物、影像与完整世界。" },
    about: { title: "人的审美，机器的可能。", body: "我们代表新一代数字人物，以人的观点创造 AI 原生品牌项目。" },
    contact: { title: "告诉我们你的故事", name: "姓名", email: "邮箱", company: "品牌 / 公司", message: "项目简介", submit: "发送需求" }
  }
};
```

- [ ] **Step 4: Implement language switching without reload**

```js
// scripts/i18n.js
import { SITE_CONTENT } from "./site-content.js";
const read = (object, path) => path.split(".").reduce((value, key) => value?.[key], object);
export function createLanguageController({root = document, storageKey = "gt-language"} = {}) {
  let language = localStorage.getItem(storageKey) === "zh" ? "zh" : "en";
  const render = () => {
    root.documentElement.lang = language === "zh" ? "zh-Hans" : "en";
    root.querySelectorAll("[data-copy]").forEach(node => { node.textContent = read(SITE_CONTENT[language], node.dataset.copy) || ""; });
    root.querySelectorAll("[data-language]").forEach(button => button.setAttribute("aria-pressed", String(button.dataset.language === language)));
  };
  const setLanguage = next => { language = next === "zh" ? "zh" : "en"; localStorage.setItem(storageKey, language); render(); };
  root.querySelectorAll("[data-language]").forEach(button => button.addEventListener("click", () => setLanguage(button.dataset.language)));
  render();
  return { get language(){ return language; }, setLanguage };
}
```

- [ ] **Step 5: Replace the two page headers with one semantic shell**

Use this exact shell in both pages and remove legacy canvas and duplicate profile header scripts:

```html
<header class="site-header" data-site-shell>
  <a class="site-brand" href="index.html" aria-label="GreenTomato home">GT</a>
  <nav aria-label="Primary">
    <a href="index.html#about" data-copy="nav.about">About</a>
    <a href="index.html#artists" data-copy="nav.artists">Artists</a>
    <a href="index.html#work" data-copy="nav.work">Work</a>
    <a href="index.html#services" data-copy="nav.services">Services</a>
    <a href="index.html#contact" data-copy="nav.contact">Contact</a>
  </nav>
  <div class="language-switch" role="group" aria-label="Language">
    <button type="button" data-language="en">EN</button>
    <button type="button" data-language="zh">中文</button>
  </div>
</header>
```

- [ ] **Step 6: Add stable shared-shell CSS and run tests**

```css
:root{--paper:#f2eee5;--ink:#111;--gutter:clamp(1rem,3vw,3rem)}
html{background:var(--paper);color:var(--ink);scroll-behavior:smooth}
body{margin:0;font-family:Arial,sans-serif}
.site-header{position:fixed;inset:0 0 auto;z-index:50;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;padding:1rem var(--gutter);mix-blend-mode:multiply}
.language-switch{justify-self:end}
@media(max-width:760px){.site-header nav{display:none}.site-header{grid-template-columns:1fr auto}}
@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}*,*::before,*::after{animation-duration:.01ms!important;transition-duration:.01ms!important}}
```

Run: `npm test`

Expected: PASS for shell, language controls, no Canvas, and module entry points.

- [ ] **Step 7: Commit**

```bash
git add index.html maya.html scripts/site-content.js scripts/i18n.js styles/site-shell.css tests/home-structure.test.mjs
git commit -m "refactor: add bilingual shared site shell"
```

### Task 3: Continuous Homepage Structure and Authentic Editorial Work Grid

**Files:**
- Create: `scripts/home.js`
- Create: `styles/home-continuous.css`
- Modify: `index.html`
- Modify: `tests/home-structure.test.mjs`
- Modify: `data/authentic-assets.json`

**Interfaces:**
- Consumes: `createLanguageController()` from Task 2.
- Produces: semantic sections `#about`, `#artists`, `#work`, `#services`, `#contact`.
- Produces: `[data-transition]` boundaries and `.is-motion-ready` progressive enhancement.

- [ ] **Step 1: Replace old layout assertions with the approved structure**

```js
for (const id of ["about", "artists", "work", "services", "contact"]) assert.match(home, new RegExp(`id="${id}"`));
assert.doesNotMatch(home, /work-bridge|brand-grid|artist-triggers/);
assert.match(home, /class="work-grid"/);
assert.match(home, /data-project-link/);
assert.match(home, /data-media-toggle/);
const manifest = JSON.parse(fs.readFileSync("data/authentic-assets.json", "utf8"));
const approved = new Set(manifest.filter(item => item.approved).map(item => item.path));
const localMedia = [...home.matchAll(/(?:src|poster)="(assets\/[^"?]+)/g)].map(match => match[1]);
for (const path of localMedia) assert.ok(approved.has(path), `${path} is not approved authentic media`);
```

- [ ] **Step 2: Run the test and verify old markup fails**

Run: `node tests/home-structure.test.mjs`

Expected: FAIL because `work-bridge`, old artist triggers, or brand-grid remain.

- [ ] **Step 3: Rebuild `index.html` in normal document flow**

Use semantic sections in this order and do not add artist `img` elements until their paths pass Task 1 provenance:

```html
<main id="main">
  <section class="home-hero" data-transition="hero-about" aria-labelledby="hero-title">
    <p data-copy="hero.eyebrow"></p><h1 id="hero-title" data-copy="hero.title">GreenTomato</h1><p data-copy="hero.statement"></p>
  </section>
  <section id="about" class="home-about" data-transition="about-artists"><h2 data-copy="about.title"></h2><p data-copy="about.body"></p></section>
  <section id="artists" class="artist-grid" data-transition="artists-work" aria-labelledby="artists-title">
    <h2 id="artists-title">Artists</h2>
    <a href="maya.html" class="artist-entry"><span>01</span><strong>Maya</strong><small>Luxury fashion / art</small></a>
    <a href="amber.html" class="artist-entry"><span>02</span><strong>Amber</strong><small>Music / fashion</small></a>
    <a href="ooona.html" class="artist-entry"><span>03</span><strong>Ooona</strong><small>Beauty / wellness</small></a>
    <a href="noah.html" class="artist-entry"><span>04</span><strong>Noah</strong><small>Film / fashion</small></a>
    <a href="mario.html" class="artist-entry"><span>05</span><strong>Mario</strong><small>Lifestyle / sport</small></a>
  </section>
  <section id="work" class="work-grid" data-transition="work-services" aria-labelledby="work-title"></section>
  <section id="services" class="service-flow" data-transition="services-contact" aria-labelledby="services-title"></section>
  <section id="contact" class="contact-flow" data-transition="contact-footer"></section>
</main>
```

Populate `#work` with the four existing verified cases. Each `<article>` must use a `<button data-media-toggle>` around its video and a separate `<a data-project-link>`.

- [ ] **Step 4: Build the editorial layout without hard separators**

```css
.home-hero{min-height:100svh;padding:10rem var(--gutter) 4rem;display:grid;align-content:space-between;overflow:clip}
.home-hero h1{margin:0;font-size:clamp(5rem,17vw,18rem);font-weight:500;letter-spacing:-.08em;line-height:.72}
.home-about,.artist-grid,.work-grid,.service-flow,.contact-flow{position:relative;padding:clamp(8rem,15vw,18rem) var(--gutter)}
.artist-grid{display:grid;grid-template-columns:repeat(12,1fr);gap:clamp(1rem,2vw,2.5rem)}
.artist-entry{grid-column:span 4;min-height:18rem;display:flex;flex-direction:column;justify-content:space-between;color:inherit;text-decoration:none}
.artist-entry:nth-of-type(even){transform:translateY(8rem)}
.work-grid{display:grid;grid-template-columns:repeat(12,1fr);gap:clamp(3rem,7vw,8rem) 2rem}
.work-card{grid-column:span 5}.work-card:nth-of-type(even){grid-column:7/span 5;margin-top:10rem}
.work-media{display:block;width:100%;padding:0;border:0;background:none}.work-media video{width:100%;display:block}
@media(max-width:760px){.artist-entry,.work-card,.work-card:nth-of-type(even){grid-column:1/-1;transform:none;margin-top:0}.work-grid{gap:5rem}}
```

- [ ] **Step 5: Initialize bilingual and progressive motion classes**

```js
// scripts/home.js
import { createLanguageController } from "./i18n.js";
createLanguageController();
const reduced = matchMedia("(prefers-reduced-motion: reduce)");
if (!reduced.matches) document.documentElement.classList.add("is-motion-ready");
```

- [ ] **Step 6: Run tests and commit**

Run: `npm test`

Expected: PASS, including the provenance test because old profile photos are no longer referenced by homepage or Maya markup.

```bash
git add index.html scripts/home.js styles/home-continuous.css tests/home-structure.test.mjs data/authentic-assets.json
git commit -m "feat: rebuild homepage as continuous editorial flow"
```

### Task 4: Section Hand-Off Motion and Media Controls

**Files:**
- Create: `scripts/section-motion.js`
- Create: `scripts/media-controls.js`
- Modify: `scripts/home.js`
- Modify: `styles/home-continuous.css`
- Create: `tests/browser-smoke.mjs`

**Interfaces:**
- Produces: `createSectionMotion(elements, {reduced})` returning `{refresh, destroy}`.
- Produces: `bindMediaControls(root)` returning a cleanup function.
- Writes only CSS variables `--section-progress`, `--enter-progress`, and state class `.is-playing`.

- [ ] **Step 1: Add failing browser-independent module tests**

```js
// tests/browser-smoke.mjs
import assert from "node:assert/strict";
import fs from "node:fs";
const motion = fs.readFileSync("scripts/section-motion.js", "utf8");
const media = fs.readFileSync("scripts/media-controls.js", "utf8");
assert.match(motion, /requestAnimationFrame/);
assert.match(motion, /prefers-reduced-motion/);
assert.match(media, /data-media-toggle/);
assert.match(media, /\.play\(\)/);
assert.match(media, /\.pause\(\)/);
```

- [ ] **Step 2: Run and verify it fails**

Run: `node tests/browser-smoke.mjs`

Expected: FAIL with missing module files.

- [ ] **Step 3: Implement bounded scroll progress**

```js
// scripts/section-motion.js
export function createSectionMotion(elements, {reduced = matchMedia("(prefers-reduced-motion: reduce)")} = {}) {
  let frame = 0;
  const render = () => {
    frame = 0;
    for (const element of elements) {
      const rect = element.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (innerHeight - rect.top) / (innerHeight + rect.height)));
      element.style.setProperty("--section-progress", progress.toFixed(4));
    }
  };
  const refresh = () => { if (!reduced.matches && !frame) frame = requestAnimationFrame(render); };
  addEventListener("scroll", refresh, {passive:true}); addEventListener("resize", refresh, {passive:true}); refresh();
  return { refresh, destroy(){ removeEventListener("scroll", refresh); removeEventListener("resize", refresh); cancelAnimationFrame(frame); } };
}
```

- [ ] **Step 4: Implement exclusive inline playback**

```js
// scripts/media-controls.js
export function bindMediaControls(root = document) {
  const buttons = [...root.querySelectorAll("[data-media-toggle]")];
  const videos = buttons.map(button => button.querySelector("video")).filter(Boolean);
  const handlers = buttons.map(button => {
    const video = button.querySelector("video");
    const click = async () => {
      if (video.paused) { videos.forEach(other => { if (other !== video) other.pause(); }); await video.play(); }
      else video.pause();
      button.classList.toggle("is-playing", !video.paused);
    };
    button.addEventListener("click", click); return [button, click];
  });
  return () => handlers.forEach(([button, click]) => button.removeEventListener("click", click));
}
```

- [ ] **Step 5: Connect motion and define the hand-off transforms**

```js
import { createSectionMotion } from "./section-motion.js";
import { bindMediaControls } from "./media-controls.js";
createSectionMotion(document.querySelectorAll("[data-transition]"));
bindMediaControls();
```

```css
.is-motion-ready .home-hero h1{transform:translateX(calc((.5 - var(--section-progress,0)) * 12vw)) scale(calc(1 - var(--section-progress,0)*.12))}
.is-motion-ready .home-about{transform:translateY(calc((1 - var(--section-progress,0))*10vh))}
.is-motion-ready .artist-entry{clip-path:inset(calc((1 - var(--section-progress,0))*45%) 0 0)}
.is-motion-ready .work-card{transform:translateY(calc((1 - var(--section-progress,0))*8rem))}
@media(max-width:760px){.is-motion-ready .artist-entry,.is-motion-ready .work-card{transform:none}}
```

- [ ] **Step 6: Run tests and commit**

Run: `npm test && node tests/browser-smoke.mjs`

Expected: PASS.

```bash
git add scripts/home.js scripts/section-motion.js scripts/media-controls.js styles/home-continuous.css tests/browser-smoke.mjs
git commit -m "feat: add continuous section handoff motion"
```

### Task 5: Maya Narrative Profile and Transparent Video Contract

**Files:**
- Create: `scripts/maya-profile.js`
- Create: `scripts/character-video.js`
- Create: `styles/maya-profile.css`
- Create: `data/maya-profile.json`
- Modify: `maya.html`
- Create: `tests/maya-profile.test.mjs`

**Interfaces:**
- Produces: sections `#persona`, `#portfolio`, `#campaigns`, `#platform-data`, `#collaborate`.
- Produces: `createCharacterDirector({stage, scenes, reduced})` with `{activate(sceneId), destroy()}`.
- Consumes only approved video records `{id, webm, fallback, poster}`; missing records render no person rather than an old photo.

- [ ] **Step 1: Write the failing Maya contract test**

```js
import assert from "node:assert/strict";
import fs from "node:fs";
const html = fs.readFileSync("maya.html", "utf8");
for (const id of ["persona","portfolio","campaigns","platform-data","collaborate"]) assert.match(html, new RegExp(`id="${id}"`));
assert.match(html, /data-character-stage/);
assert.doesNotMatch(html, /pink-editorial|black-tailoring|profile-refresh\.js/);
const data = JSON.parse(fs.readFileSync("data/maya-profile.json", "utf8"));
assert.deepEqual(data.scenes, []);
```

- [ ] **Step 2: Run and verify it fails**

Run: `node tests/maya-profile.test.mjs`

Expected: FAIL because legacy Maya markup and generated photo paths remain.

- [ ] **Step 3: Create truthful profile data with no invented metrics**

```json
{
  "name":"Maya",
  "role":{"en":"Luxury Fashion / Art","zh":"高奢时尚 / 艺术"},
  "scenes":[],
  "metrics":[
    {"platform":"Instagram","value":null,"period":null,"updatedAt":null},
    {"platform":"Xiaohongshu","value":null,"period":null,"updatedAt":null}
  ]
}
```

- [ ] **Step 4: Replace `maya.html` with the approved narrative order**

```html
<main class="maya-profile">
  <div class="character-stage" data-character-stage aria-hidden="true"></div>
  <section class="maya-intro" data-scene="intro"><p>GREENTOMATO ARTIST</p><h1>Maya</h1><p>Luxury Fashion / Art</p></section>
  <section id="persona" data-scene="persona"><h2>Persona</h2><div data-profile-persona></div></section>
  <section id="portfolio" data-scene="portfolio"><h2>Portfolio</h2><div class="profile-work-grid" data-profile-work></div></section>
  <section id="campaigns" data-scene="campaigns"><h2>Campaigns</h2><div data-profile-campaigns></div></section>
  <section id="platform-data" data-scene="platform-data"><h2>Platform data</h2><div data-profile-metrics></div></section>
  <section id="collaborate" data-scene="collaborate"><h2>Collaborate</h2><a href="index.html#contact">Tell us your story ↗</a></section>
</main>
```

- [ ] **Step 5: Implement the empty-safe character director**

```js
// scripts/character-video.js
export function createCharacterDirector({stage, scenes = [], reduced = matchMedia("(prefers-reduced-motion: reduce)")} = {}) {
  const byId = new Map(scenes.map(scene => [scene.id, scene]));
  let video;
  const activate = id => {
    const scene = byId.get(id);
    if (!scene || reduced.matches) { stage.replaceChildren(); return; }
    if (!video) { video = document.createElement("video"); video.muted = true; video.playsInline = true; stage.append(video); }
    video.poster = scene.poster; video.src = video.canPlayType("video/webm") ? scene.webm : scene.fallback; video.play().catch(() => stage.replaceChildren());
  };
  return { activate, destroy(){ video?.pause(); stage.replaceChildren(); } };
}
```

- [ ] **Step 6: Connect scenes with IntersectionObserver and no-photo fallback**

```js
// scripts/maya-profile.js
import { createLanguageController } from "./i18n.js";
import { createCharacterDirector } from "./character-video.js";
createLanguageController();
const data = await fetch("data/maya-profile.json").then(response => response.json());
const director = createCharacterDirector({stage:document.querySelector("[data-character-stage]"), scenes:data.scenes});
const observer = new IntersectionObserver(entries => entries.filter(entry => entry.isIntersecting).forEach(entry => director.activate(entry.target.dataset.scene)), {threshold:.55});
document.querySelectorAll("[data-scene]").forEach(section => observer.observe(section));
```

- [ ] **Step 7: Add stable profile styling and test**

```css
.maya-profile section{position:relative;min-height:100svh;padding:clamp(8rem,14vw,16rem) var(--gutter)}
.character-stage{position:fixed;inset:0;pointer-events:none;z-index:5}.character-stage video{position:absolute;right:2vw;bottom:0;max-height:88svh;max-width:48vw}
.maya-profile section>*{position:relative;z-index:10}
@media(max-width:760px){.character-stage video{right:-8vw;max-height:55svh;max-width:70vw}.maya-profile section{min-height:auto;padding-block:8rem}}
```

Run: `node tests/maya-profile.test.mjs && npm test`

Expected: PASS; `scenes` remains empty until approved transparent videos exist, so no character is rendered.

- [ ] **Step 8: Commit**

```bash
git add maya.html scripts/maya-profile.js scripts/character-video.js styles/maya-profile.css data/maya-profile.json tests/maya-profile.test.mjs
git commit -m "feat: build motion-ready Maya narrative profile"
```

### Task 6: Contact Submission Contract and Google Apps Script Endpoint

**Files:**
- Create: `scripts/contact-form.js`
- Create: `integrations/google-apps-script/Code.gs`
- Create: `integrations/google-apps-script/README.md`
- Modify: `index.html`
- Create: `tests/contact-form.test.mjs`

**Interfaces:**
- Produces: `createContactForm(form, {endpoint, fetchImpl})`.
- POST body: `{name,email,company,message,language,submittedAt,honey}`.
- Apps Script response: `{ok:true}` or `{ok:false,error:"validation"|"server"}`.

- [ ] **Step 1: Write failing contract assertions**

```js
import assert from "node:assert/strict";
import fs from "node:fs";
const source = fs.readFileSync("scripts/contact-form.js", "utf8");
assert.match(source, /name/); assert.match(source, /email/); assert.match(source, /company/); assert.match(source, /message/);
assert.match(source, /aria-busy/); assert.match(source, /data-form-status/);
const endpoint = fs.readFileSync("integrations/google-apps-script/Code.gs", "utf8");
assert.match(endpoint, /appendRow/); assert.match(endpoint, /MailApp\.sendEmail/); assert.match(endpoint, /LockService/);
```

- [ ] **Step 2: Run and verify missing files fail**

Run: `node tests/contact-form.test.mjs`

Expected: FAIL with missing `scripts/contact-form.js`.

- [ ] **Step 3: Implement accessible client submission**

```js
export function createContactForm(form, {endpoint, fetchImpl = fetch} = {}) {
  const status = form.querySelector("[data-form-status]");
  form.addEventListener("submit", async event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    form.setAttribute("aria-busy", "true"); status.textContent = "Sending…";
    const body = Object.fromEntries(new FormData(form)); body.language = document.documentElement.lang; body.submittedAt = new Date().toISOString();
    try {
      const response = await fetchImpl(endpoint, {method:"POST", headers:{"Content-Type":"text/plain;charset=utf-8"}, body:JSON.stringify(body)});
      const result = await response.json(); if (!result.ok) throw new Error(result.error);
      form.reset(); status.textContent = "Thank you. Your inquiry has been received.";
    } catch { status.textContent = "We could not send your inquiry. Please try again or email hello@gtomato.com."; }
    finally { form.removeAttribute("aria-busy"); }
  });
}
```

- [ ] **Step 4: Implement locked append and email notification**

```js
const SHEET_ID = PropertiesService.getScriptProperties().getProperty('SHEET_ID');
const NOTIFY_EMAIL = PropertiesService.getScriptProperties().getProperty('NOTIFY_EMAIL');
function reply(value){ return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON); }
function doPost(event){
  const lock = LockService.getScriptLock();
  try {
    const data = JSON.parse(event.postData.contents || '{}');
    if (data.honey || !data.name || !/^\S+@\S+\.\S+$/.test(data.email || '') || !data.message) return reply({ok:false,error:'validation'});
    lock.waitLock(10000);
    SpreadsheetApp.openById(SHEET_ID).getSheetByName('Leads').appendRow([new Date(),data.name,data.email,data.company || '',data.message,data.language || 'en']);
    MailApp.sendEmail({to:NOTIFY_EMAIL,subject:`GreenTomato inquiry — ${data.company || data.name}`,htmlBody:`<p><b>Name:</b> ${escapeHtml(data.name)}</p><p><b>Email:</b> ${escapeHtml(data.email)}</p><p><b>Company:</b> ${escapeHtml(data.company || '—')}</p><p>${escapeHtml(data.message)}</p>`});
    return reply({ok:true});
  } catch(error) { console.error(error); return reply({ok:false,error:'server'}); }
  finally { try { lock.releaseLock(); } catch(_) {} }
}
function escapeHtml(value){ return String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char])); }
```

- [ ] **Step 5: Add exact deployment instructions and keep endpoint unset**

Document creation of a Sheet named `GreenTomato Leads`, a tab named `Leads`, header row `Timestamp, Name, Email, Company, Project description, Language`, Script Properties `SHEET_ID` and `NOTIFY_EMAIL`, deployment as a web app, and endpoint insertion into `data-contact-endpoint`. Do not create or deploy until Rosie confirms the Sheet and Gmail recipient.

- [ ] **Step 6: Test and commit**

Run: `node tests/contact-form.test.mjs && npm test`

Expected: PASS. Manual preview with an unset endpoint must show the fallback error and must not discard entered text before a successful response.

```bash
git add index.html scripts/contact-form.js integrations/google-apps-script/Code.gs integrations/google-apps-script/README.md tests/contact-form.test.mjs
git commit -m "feat: add inquiry submission integration contract"
```

### Task 7: Transparent Maya Video Production and Integration Gate

**Files:**
- Create after approval: `assets/profiles/maya/motion/*.webm`
- Create after approval: `assets/profiles/maya/motion/*.mp4`
- Create after approval: `assets/profiles/maya/motion/*.jpg`
- Modify: `data/maya-profile.json`
- Modify: `data/authentic-assets.json`

**Interfaces:**
- Each approved scene record is `{id, webm, fallback, poster}`.
- Allowed IDs: `intro`, `persona`, `portfolio`, `campaigns`, `platform-data`, `collaborate`.

- [ ] **Step 1: Produce an action brief before generation**

Write one shot per allowed scene with locked Maya identity, high-luxury styling, full-body framing, fixed camera height, consistent light, entry/exit direction, gesture target, 4–7 second duration, and a clean background suitable for alpha extraction. Explicitly prohibit presenter gestures, persistent smiling, exaggerated walking, identity drift, camera movement, and props crossing the body edge.

- [ ] **Step 2: Generate and visually approve one `intro` clip first**

Do not batch the remaining clips until the intro clip passes identity, edge matte, gait, hands, garment physics, loop/ending, and mobile crop review. This is a required media-production checkpoint.

- [ ] **Step 3: Export the approved delivery set**

Run media inspection:

```bash
ffprobe -v error -show_entries stream=codec_name,pix_fmt,width,height -of json assets/profiles/maya/motion/intro.webm
```

Expected: WebM video with an alpha-capable pixel format, plus an H.264 MP4 fallback and JPG poster with matching framing.

- [ ] **Step 4: Add only approved paths to both manifests**

```json
{"id":"intro","webm":"assets/profiles/maya/motion/intro.webm","fallback":"assets/profiles/maya/motion/intro.mp4","poster":"assets/profiles/maya/motion/intro.jpg"}
```

Each file must be recorded in `authentic-assets.json` as `commissioned-motion` and `approved:true` only after Rosie approves the newly produced Maya performance. Generated motion created specifically and approved for this redesign is permitted; old generated photographs remain prohibited.

- [ ] **Step 5: Repeat scene-by-scene and commit only approved media metadata**

Run: `npm test && node tests/maya-profile.test.mjs`

Expected: PASS and all referenced scene files exist.

```bash
git add data/maya-profile.json data/authentic-assets.json assets/profiles/maya/motion
git commit -m "feat: integrate approved Maya character motion"
```

### Task 8: Cross-Device QA, External Integration, and Release

**Files:**
- Modify as findings require: `styles/site-shell.css`
- Modify as findings require: `styles/home-continuous.css`
- Modify as findings require: `styles/maya-profile.css`
- Modify as findings require: `scripts/*.js`
- Create: `docs/qa/2026-08-04-fashion-site-qa.md`

**Interfaces:**
- Consumes all prior tasks.
- Produces a release candidate and cache-busted public URL.

- [ ] **Step 1: Run automated verification**

Run: `npm test && node tests/browser-smoke.mjs && node tests/maya-profile.test.mjs && node tests/contact-form.test.mjs && python3 tests/brand-assets.test.py && git diff --check`

Expected: all commands PASS and `git diff --check` prints nothing.

- [ ] **Step 2: Serve the site and test desktop flows**

Run: `npm start`

At 1440×900 verify hero-to-About, About-to-Artists, Artists-to-Work, Work-to-Services, and Services-to-Contact hand-offs; inline play/pause; separate project links; EN/中文 switching; keyboard navigation; reduced motion; Maya scene activation; and form success/failure states.

- [ ] **Step 3: Test mobile flows**

At 390×844 verify no horizontal overflow, no scroll lock, readable Chinese and English, hidden desktop navigation replacement, no cursor-only controls, media tap playback, Maya never covering controls, and acceptable video memory use.

- [ ] **Step 4: Confirm and create the external destination**

Ask Rosie to confirm the new Sheet title and configured Gmail recipient. Then create `GreenTomato Leads`, set the header row, deploy the Apps Script, store only non-secret endpoint configuration in the website, submit one labeled test lead, verify the row and email, and delete the test row only after explicit confirmation because deletion is destructive.

- [ ] **Step 5: Record evidence**

Document viewport results, browsers, reduced-motion behavior, asset-provenance result, Maya video formats, form test timestamp, Sheet row result, email notification result, known limitations, and screenshot paths in `docs/qa/2026-08-04-fashion-site-qa.md`.

- [ ] **Step 6: Commit release fixes**

```bash
git add styles scripts index.html maya.html data tests docs/qa integrations
git commit -m "fix: complete fashion site release QA"
```

- [ ] **Step 7: Push only after final approval and return the canonical URL**

```bash
git push origin main
release_commit=$(git rev-parse --short HEAD)
```

Return exactly this link format with the resolved commit:

`https://rosielq-creator.github.io/-/?v=<release_commit>`
