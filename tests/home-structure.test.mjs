import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const home = readFileSync(new URL("../index.html", import.meta.url), "utf8");
const maya = readFileSync(new URL("../maya.html", import.meta.url), "utf8");
const css = readFileSync(new URL("../styles/home-continuous.css", import.meta.url), "utf8");
const exactCss = readFileSync(new URL("../styles/design-exact.css", import.meta.url), "utf8");
const homeScript = readFileSync(new URL("../scripts/home.js", import.meta.url), "utf8");

for (const page of [home, maya]) {
  assert.match(page, /data-site-shell/, "expected the shared site shell");
  assert.match(page, /data-language="en"/, "expected an English language control");
  assert.match(page, /data-language="zh"/, "expected a Chinese language control");
  assert.match(page, /styles\/site-shell\.css/, "expected shared shell styling");
}

assert.match(home, /<canvas[^>]*data-growth-webgl[^>]*><\/canvas>/i, "expected one decorative Three.js surface");
assert.match(home, /data-growth-organism[^>]*aria-hidden="true"/i, "the WebGL enhancement must stay outside the accessibility tree");
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
assert.match(css, /\.reference-home/);
assert.match(css, /\.success-stories/);
assert.match(css, /aspect-ratio:\s*16\s*\/\s*9/);
assert.doesNotMatch(css, /ambient-/);
assert.match(home, /data-growth-organism/, "expected one persistent lifecycle organism");
assert.match(home, /class="growth-surface"/, "expected one shared visual surface behind every chapter");
assert.equal((home.match(/class="chapter-number"/g) || []).length, 6, "approved layout has six numbered chapters");
assert.match(home, /class="[^\"]*hero-seed[^\"]*"/, "hero needs the approved seed composition");
assert.match(home, /class="[^\"]*artist-grid[^\"]*"/, "artists need the approved five-slot composition");
assert.match(home, /class="[^\"]*work-grid[^\"]*"/, "work needs the approved four-slot composition");
assert.match(home, /class="[^\"]*brands-services[^\"]*"/, "brands and services must share chapter 05");
assert.doesNotMatch(home, /growth-tree|tree-main-trunk|tree-abstract-crown/, "the rejected continuous tree must be removed");
assert.equal((home.match(/class="artist-card"/g) || []).length, 5, "homepage must feature exactly five equal artists");
assert.match(home, /href="artists\.html"[^>]*>\s*(?:<[^>]+>)*View all artists/i, "expected a route to the complete artist index");
assert.equal((home.match(/class="work-card"/g) || []).length, 4, "homepage must keep work curated");
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

// Static artwork parity: desktop Hero and Work keep the approved light,
// oversized editorial hierarchy even when the lifecycle layer is available.
assert.match(exactCss, /--static-blue:\s*#cbd5ff/, "expected the approved cool hero colour");
assert.match(exactCss, /--static-rose:\s*#f5e7e7/, "expected the approved warm work colour");
assert.match(exactCss, /\.home-hero\{[^}]*background:[^}]*radial-gradient/s, "hero must retain the static colour field");
assert.match(exactCss, /\.home-hero h1 span\{[^}]*display:inline/s, "desktop wordmark must remain on one line");
assert.match(exactCss, /\.success-stories \.work-intro\{[^}]*left:34vw/s, "work title must follow the approved centered offset");
assert.match(exactCss, /\.success-stories \.work-grid\{[^}]*grid-template-columns:minmax\(0,8fr\) minmax\(0,3fr\)/s, "work media must preserve the approved dominant first story");
assert.match(home, /AI ARTISTS \/ CREATIVE PRODUCTION/, "hero eyebrow must match the approved static artwork");
assert.match(exactCss, /\.growth-stage\[data-stage="seed"\][^{]*\{[^}]*opacity:0/s, "static hero must not be obscured by the lifecycle object");
assert.match(exactCss, /\.growth-stage\[data-stage="bloom"\][^{]*\{[^}]*opacity:0/s, "static work screen must not be obscured by the lifecycle object");
assert.match(exactCss, /\.home-hero h1\{[^}]*margin:0 0 100px/s, "hero wordmark needs the approved baseline above the statement");
assert.match(exactCss, /@media\(min-width:801px\)[\s\S]*\.home-hero\{[^}]*height:calc\(100vh - 52px\)/s, "desktop hero and sticky header must fit one viewport");
assert.match(exactCss, /@media\(min-width:801px\)[\s\S]*\.site-brand::before\{content:"GT"/s, "desktop header must show the approved GT wordmark");
assert.match(exactCss, /@media\(min-width:801px\)[\s\S]*\.language-switch\{[^}]*display:flex/s, "desktop header must expose the approved language controls");
assert.match(exactCss, /\.success-stories \.work-grid\{[^}]*top:510px/s, "first work frame must start at the approved vertical coordinate");
assert.match(exactCss, /\.success-stories \.work-grid\{[^}]*left:3vw/s, "work frames must use the approved narrow page gutter");
assert.match(exactCss, /\.success-stories \.work-grid\{[^}]*grid-template-columns:minmax\(0,8fr\) minmax\(0,3fr\)/s, "first work frame must retain the approved dominant width");
assert.match(exactCss, /@media\(max-width:800px\)[\s\S]*\.site-brand::before\{content:"GT"/s, "mobile header must restore the approved GT wordmark");
assert.match(exactCss, /@media\(max-width:800px\)[\s\S]*\.home-hero\{[^}]*radial-gradient/s, "mobile hero must keep the approved light colour field");
assert.match(exactCss, /@media\(max-width:800px\)[\s\S]*\.home-hero h1\{[^}]*white-space:nowrap/s, "mobile wordmark must stay on one clipped line");
assert.match(exactCss, /@media\(max-width:800px\)[\s\S]*\.home-hero \.hero-statement\{[^}]*grid-column:1\/-1/s, "mobile statement must be positioned from the full hero grid");
assert.match(exactCss, /@media\(max-width:800px\)[\s\S]*\.home-hero \.hero-statement\{[^}]*left:56px/s, "mobile statement must land at the approved 76px page coordinate");
assert.match(home, /<span>Hong Kong<\/span><span>Global \/ 2026<\/span>/, "hero metadata must match the static artwork");

const manifest = JSON.parse(readFileSync(new URL("../data/authentic-assets.json", import.meta.url), "utf8"));
const approved = new Set(manifest.filter(item => item.approved).map(item => item.path));
const localMedia = [...home.matchAll(/(?:src|poster)="(assets\/[^"?]+)/g)].map(match => match[1]);
for (const path of localMedia) assert.ok(approved.has(path), `${path} is not approved authentic media`);

console.log("home structural contract passed");
