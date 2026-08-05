import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const home = readFileSync(new URL("../index.html", import.meta.url), "utf8");
const maya = readFileSync(new URL("../maya.html", import.meta.url), "utf8");
const css = readFileSync(new URL("../styles/home-continuous.css", import.meta.url), "utf8");
const exactCss = readFileSync(new URL("../styles/design-exact.css", import.meta.url), "utf8");
const masterCss = readFileSync(new URL("../styles/reference-master.css", import.meta.url), "utf8");
const homeScript = readFileSync(new URL("../scripts/home.js", import.meta.url), "utf8");

for (const page of [home, maya]) {
  assert.match(page, /data-site-shell/, "expected the shared site shell");
  assert.match(page, /data-language="en"/, "expected an English language control");
  assert.match(page, /data-language="zh"/, "expected a Chinese language control");
  assert.match(page, /styles\/site-shell\.css/, "expected shared shell styling");
}

assert.doesNotMatch(home, /<canvas\b|data-growth-webgl|data-growth-organism/i, "the approved static page must not mount a WebGL lifecycle surface");
assert.doesNotMatch(homeScript, /growth-three|mountGrowthThree|mountGrowthLifecycle/i, "the approved static page must not initialize 3D or lifecycle transitions");
for (const stage of ["seed", "sprout", "branches", "bloom", "crystal", "seed-return"]) {
  assert.match(home, new RegExp(`<img[^>]+class="chapter-plant"[^>]+data-plant="${stage}"`, "i"), `expected a static ${stage} plant image`);
}
assert.doesNotMatch(maya, /<canvas\b/i, "the profile page remains semantic HTML only");

assert.match(home, /type="module" src="scripts\/home\.js/);
assert.match(maya, /type="module" src="scripts\/maya-profile\.js/);

for (const id of ["about", "artists", "work", "brands", "services", "contact"]) {
  assert.match(home, new RegExp(`id="${id}"`), `expected #${id}`);
}
assert.doesNotMatch(home, /work-bridge|brand-grid|artist-triggers/);
assert.match(home, /class="[^"]*reference-home/);
assert.match(home, /class="[^"]*artist-index[^"]*"/);
assert.match(home, /class="[^"]*success-stories[^"]*"/);
assert.match(home, /class="[^"]*brand-index[^"]*"/);
assert.doesNotMatch(home, /ambient-stage|data-ambient-object|data-motion-section|data-motion-item/);
assert.match(home, /data-project-link/);
assert.match(home, /data-media-toggle/);
assert.match(homeScript, /video\.addEventListener\("play",\s*\(\)\s*=>\s*\{[^}]*video\.controls\s*=\s*true/s, "started Work videos must expose native controls");
assert.match(homeScript, /contactForm\.addEventListener\("submit"/, "contact prototype must handle submission in place");
assert.match(homeScript, /Thanks — we’ll be in touch\./, "contact prototype must provide the approved success feedback");
assert.match(css, /\.reference-home/);
assert.match(css, /\.success-stories/);
assert.match(css, /aspect-ratio:\s*16\s*\/\s*9/);
assert.doesNotMatch(css, /ambient-/);
assert.equal((home.match(/class="chapter-plant"/g) || []).length, 6, "approved layout has six static chapter plants");
assert.equal((home.match(/class="chapter-number"/g) || []).length, 6, "approved layout has six numbered chapters");
assert.match(home, /class="[^\"]*hero-seed[^\"]*"/, "hero needs the approved seed composition");
assert.match(home, /class="[^\"]*artist-grid[^\"]*"/, "artists need the approved five-slot composition");
assert.match(home, /class="[^\"]*work-grid[^\"]*"/, "work needs the approved four-slot composition");
assert.match(home, /class="[^\"]*brands-services[^\"]*"/, "brands and services must share chapter 05");
assert.doesNotMatch(home, /growth-tree|tree-main-trunk|tree-abstract-crown/, "the rejected continuous tree must be removed");
assert.equal((home.match(/class="artist-card"/g) || []).length, 5, "homepage must feature exactly five equal artists");
assert.match(home, /href="artists\.html"[^>]*>\s*(?:<[^>]+>)*View all artists/i, "expected a route to the complete artist index");
assert.equal((home.match(/class="work-card"/g) || []).length, 4, "homepage must keep work curated");
for (const title of ["CHILDGOD · TVB", "The Peninsula Hong Kong", "Octopus", "MGM Macau"]) {
  assert.ok(home.includes(title), `expected approved Work title: ${title}`);
}
assert.doesNotMatch(home, />ChillGOOD\s*↗</i, "the rejected placeholder project title must not remain");
assert.match(home, /href="work\.html"[^>]*>\s*(?:<[^>]+>)*View all work/i, "expected a route to the complete work index");
assert.match(css, /\.artist-card\{[^}]*width:[^}]*height:/s, "artist media positions must share one square size");
assert.doesNotMatch(home, /growth-seed|growth-sprout|growth-branches|growth-bloom/, "sections must not contain disconnected flower ornaments");
for (const stage of ["seed", "sprout", "branches", "bloom", "seed-return"]) {
  assert.match(home, new RegExp(`data-growth-stage="${stage}"`), `expected ${stage} lifecycle stage`);
}
assert.doesNotMatch(home, /bloom-five|bloom-frames/, "rejected per-section flower ornaments must be removed");

const homepageCss = readFileSync(new URL("../styles/home-continuous.css", import.meta.url), "utf8");
for (const selector of [".success-stories", ".brand-index", ".service-flow", ".contact-flow"]) {
  const escapedSelector = selector.replace(".", "\\.");
  const rule = homepageCss.match(new RegExp(`${escapedSelector}\\{[^}]*\\}`, "s"))?.[0] || "";
  assert.ok(rule, `expected a CSS rule for ${selector}`);
}
assert.match(homepageCss, /\.chapter-shell\{[^}]*grid-template-columns:\s*repeat\(12/s, "chapters must use the approved 12-column editorial shell");
assert.match(homepageCss, /\.artist-grid\{[^}]*grid-template-columns:\s*repeat\(2/s, "artist photos must occupy the approved right-side editorial grid");
assert.match(homepageCss, /\.work-grid\{[^}]*grid-template-columns:\s*repeat\(2/s, "featured work must use the approved 2x2 arrangement");
assert.doesNotMatch(homepageCss, /\.reference-home main\{[^}]*background\s*:/s, "main must not paint a separate slide background");

// Final black/white six-chapter reference contract.
assert.match(home, /A seed for new realities/i, "hero eyebrow must match the approved reference");
assert.match(home, /<a href="#brands">Brands<\/a>/i, "reference navigation includes Brands");
assert.match(home, /<span>Est\. Hong Kong<\/span><span>Scroll to begin<\/span>/, "hero metadata must match the reference");
assert.match(home, /styles\/reference-master\.css/, "the final reference master must load last");
for (const height of [594, 641, 818, 804, 788, 506]) {
  assert.match(masterCss, new RegExp(`height:${height}px\\s*!important`), `expected approved ${height}px chapter height`);
}
assert.match(masterCss, /\.home-hero\s*\{[^}]*background:#000/s, "hero must match the native seed background");
assert.match(masterCss, /\.home-about\s*\{[^}]*background:#f7f4ef/s, "about must match the native sprout background");
assert.match(masterCss, /\.artist-card:nth-child\(1\)\s*\{[^}]*left:586px;[^}]*top:52px/s, "artist grid must retain the first approved coordinate");
assert.match(masterCss, /\.work-card:nth-child\(4\)\s*\{[^}]*right:137px;[^}]*top:520px/s, "work grid must retain the fourth approved coordinate");
assert.match(masterCss, /@media \(max-width:800px\)/, "mobile reference treatment is required");

const manifest = JSON.parse(readFileSync(new URL("../data/authentic-assets.json", import.meta.url), "utf8"));
const approved = new Set(manifest.filter(item => item.approved).map(item => item.path));
const localMedia = [...home.matchAll(/(?:src|poster)="(assets\/[^"?]+)/g)].map(match => match[1]);
for (const path of localMedia) assert.ok(approved.has(path), `${path} is not approved authentic media`);

console.log("home structural contract passed");
