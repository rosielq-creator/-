import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const home = readFileSync(new URL("../index.html", import.meta.url), "utf8");
const maya = readFileSync(new URL("../maya.html", import.meta.url), "utf8");
const css = readFileSync(new URL("../styles/home-continuous.css", import.meta.url), "utf8");

for (const page of [home, maya]) {
  assert.match(page, /data-site-shell/, "expected the shared site shell");
  assert.match(page, /data-language="en"/, "expected an English language control");
  assert.match(page, /data-language="zh"/, "expected a Chinese language control");
  assert.doesNotMatch(page, /<canvas\b/i, "site pages must remain semantic HTML");
  assert.match(page, /styles\/site-shell\.css/, "expected shared shell styling");
}

assert.match(home, /type="module" src="scripts\/home\.js/);
assert.match(maya, /type="module" src="scripts\/maya-profile\.js/);

for (const id of ["about", "artists", "work", "brands", "services", "contact"]) {
  assert.match(home, new RegExp(`id="${id}"`), `expected #${id}`);
}
assert.doesNotMatch(home, /work-bridge|brand-grid|artist-triggers/);
assert.match(home, /class="[^"]*reference-home/);
assert.match(home, /class="[^"]*artist-index[^"]*"/);
assert.match(home, /class="[^"]*success-stories[^"]*"/);
assert.match(home, /class="brand-index"/);
assert.doesNotMatch(home, /ambient-stage|data-ambient-object|data-motion-section|data-motion-item/);
assert.match(home, /data-project-link/);
assert.match(home, /data-media-toggle/);
assert.match(css, /\.reference-home/);
assert.match(css, /\.success-stories/);
assert.match(css, /aspect-ratio:\s*16\s*\/\s*9/);
assert.doesNotMatch(css, /ambient-/);
assert.match(home, /data-growth-organism/, "expected one persistent lifecycle organism");
assert.doesNotMatch(home, /growth-tree|tree-main-trunk|tree-abstract-crown/, "the rejected continuous tree must be removed");
assert.equal((home.match(/class="artist-card"/g) || []).length, 5, "homepage must feature exactly five equal artists");
assert.match(home, /href="artists\.html"[^>]*>\s*(?:<[^>]+>)*View all artists/i, "expected a route to the complete artist index");
assert.equal((home.match(/class="work-card"/g) || []).length, 4, "homepage must keep work curated");
assert.match(home, /href="work\.html"[^>]*>\s*(?:<[^>]+>)*View all work/i, "expected a route to the complete work index");
assert.match(css, /\.artist-card\s*\{[^}]*aspect-ratio:/s, "artist media positions must share one ratio");
assert.doesNotMatch(home, /growth-seed|growth-sprout|growth-branches|growth-bloom/, "sections must not contain disconnected flower ornaments");
for (const stage of ["seed", "sprout", "branches", "bloom", "seed-return"]) {
  assert.match(home, new RegExp(`data-growth-stage="${stage}"`), `expected ${stage} lifecycle stage`);
}
assert.doesNotMatch(home, /bloom-five|bloom-frames/, "rejected per-section flower ornaments must be removed");

const homepageCss = readFileSync(new URL("../styles/home-continuous.css", import.meta.url), "utf8");
for (const selector of [".artist-index", ".success-stories", ".brand-index", ".service-flow", ".contact-flow"]) {
  const escapedSelector = selector.replace(".", "\\.");
  const rule = homepageCss.match(new RegExp(`${escapedSelector}\\{[^}]*\\}`, "s"))?.[0] || "";
  assert.ok(rule, `expected a CSS rule for ${selector}`);
  assert.doesNotMatch(rule, /background\s*:/, `${selector} must not create a slide-like section background`);
}

const manifest = JSON.parse(readFileSync(new URL("../data/authentic-assets.json", import.meta.url), "utf8"));
const approved = new Set(manifest.filter(item => item.approved).map(item => item.path));
const localMedia = [...home.matchAll(/(?:src|poster)="(assets\/[^"?]+)/g)].map(match => match[1]);
for (const path of localMedia) assert.ok(approved.has(path), `${path} is not approved authentic media`);

console.log("home structural contract passed");
