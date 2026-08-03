import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
const css = readFileSync(new URL("../home-v4.css", import.meta.url), "utf8");
const js = readFileSync(new URL("../home-v4.js", import.meta.url), "utf8");

const order = ["class=\"hero\"", "class=\"manifesto\"", "class=\"artists\"", "class=\"work-bridge\"", "class=\"brands\"", "class=\"work\"", "class=\"services\"", "class=\"contact\""];
let cursor = -1;
for (const marker of order) {
  const next = html.indexOf(marker);
  assert.ok(next > cursor, `expected ${marker} after prior homepage section`);
  cursor = next;
}

assert.equal((html.match(/data-artist-trigger=/g) || []).length, 5, "expected five artist scroll triggers");
assert.equal((html.match(/class=\"artist-card/g) || []).length, 5, "expected five persistent artist cards in the 3D rail");
assert.match(html, /data-artist-left/, "expected left artist classification");
assert.match(html, /data-artist-right/, "expected right artist classification");
assert.match(html, /data-artist-stage/, "expected a single artist stage");
assert.match(html, /class="manifesto-line"/, "expected editorial manifesto lines");
assert.match(html, /rel="icon"/, "expected an explicit favicon to avoid a missing browser asset");
assert.match(html, /SEE WHAT WE MAKE POSSIBLE\./, "expected approved work-transition slogan");
const artistSection = html.slice(html.indexOf('class="artists"'), html.indexOf('class="work-bridge"'));
assert.doesNotMatch(artistSection, /<span>0[1-5]<\/span>/, "artist numbers 01–05 must not be visible");
assert.match(artistSection, /class="artist-archive-link"[^>]*href="artists\.html"/, "artist section must lead to the complete roster");
assert.match(artistSection, /VIEW ALL ARTISTS/, "artist archive link must clearly invite discovery");
assert.match(html, /class="bridge-mask"/, "expected the immediate rising bridge mask");
assert.match(html, /class="bridge-slogan"[^>]*>SEE WHAT WE MAKE POSSIBLE\.<span class="bridge-sheen"/, "expected one-line slogan with sheen layer");
assert.match(html, /assets\/brands\/parknshop-white\.png/, "expected supplied transparent ParknShop logo");
assert.match(html, /assets\/brands\/mgm-macau-white\.png/, "expected supplied transparent MGM Macau logo");
assert.match(html, /assets\/brands\/the-peninsula-hong-kong\.svg/, "expected transparent Peninsula wordmark");
assert.match(html, /assets\/brands\/chow-sang-sang\.svg/, "expected transparent Chow Sang Sang logo");
assert.doesNotMatch(css, /scroll-snap-type\s*:/, "homepage must not use scroll snapping");
assert.match(
  html,
  /<h1 id="hero-title">We build next-generation<br>artists with identities,<br>voices and worlds\.<\/h1>/,
  "hero headline must match the restored cf3dd51 homepage"
);
assert.match(
  html,
  /<div class="hero-wordmark" aria-hidden="true"><span>AI<\/span><span>PRODUCTION<\/span><\/div>/,
  "hero wordmark must match the restored cf3dd51 homepage"
);
assert.doesNotMatch(html, /class="globe"/, "new Monolog hero ornament must be removed");
assert.match(html, /class="manifesto"/, "the current manifesto must remain");
assert.match(html, /class="artist-stage"/, "the current artist stage must remain");

assert.equal((html.match(/class="brand-logo(?: |")/g) || []).length, 7, "expected seven static brand logos");
for (const brand of [
  "PARKnSHOP Hong Kong",
  "MGM Macau",
  "Octopus Hong Kong",
  "The Peninsula Hong Kong",
  "ChillGood TV",
  "Asia Allied Infrastructure",
  "Chow Sang Sang",
]) {
  assert.match(html, new RegExp(`aria-label="${brand}"`), `expected an accessible ${brand} logo`);
}
assert.match(js, /syncArtistRail/, "artist rail must follow continuous scroll progress");
assert.match(js, /--artist-progress/, "artist rail must expose normalized progress to CSS");
assert.match(js, /--bridge-progress/, "work bridge must expose normalized progress to CSS");
assert.doesNotMatch(js, /--bridge-(?:mask|text)-progress/, "cover and slogan must not use separate delayed progress values");
assert.match(css, /\.bridge-mask\{[^}]*var\(--bridge-progress\)/s, "bridge cover must follow the shared progress value");
assert.match(css, /\.work-bridge\{[^}]*margin-top:-100svh/s, "bridge must overlap the final artist viewport so the cover is visible");
assert.match(css, /\.work-bridge \.bridge-slogan\{[^}]*var\(--bridge-progress\)/s, "bridge slogan must follow the same shared progress value");
assert.match(css, /perspective:/, "artist rail must establish 3D perspective");
assert.match(css, /-webkit-text-stroke:/, "bridge slogan must use outlined typography");
assert.match(css, /\.bridge-sheen/, "bridge slogan must include the silver sheen treatment");
assert.doesNotMatch(css, /\.brand-logo-(?:parknshop|peninsula|chow)[^{]*\{[^}]*background\s*:/s, "brand logos must not have colored tile backgrounds");
assert.match(css, /prefers-reduced-motion:reduce/, "motion must have a reduced-motion fallback");

const workSection = html.slice(html.indexOf('class="work"'), html.indexOf('class="services"'));
assert.equal((workSection.match(/class="work-row/g) || []).length, 4, "homepage must preview exactly four work stories");
assert.equal((workSection.match(/class="work-row work-row-reverse"/g) || []).length, 2, "two work stories must reverse media and copy for an alternating editorial rhythm");
assert.match(workSection, /class="work-copy"/, "work stories must use a dedicated editorial copy column");
assert.match(workSection, /VIEW MORE WORK/, "work section must lead to the complete project archive");
assert.match(css, /\.work-row-reverse \.work-media/s, "desktop work layout must reverse alternating stories");

console.log("home structural contract passed");
