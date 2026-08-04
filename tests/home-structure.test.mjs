import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
const css = readFileSync(new URL("../home-v4.css", import.meta.url), "utf8");
const js = readFileSync(new URL("../home-v4.js", import.meta.url), "utf8");
const caseJs = readFileSync(new URL("../v2-preview/revamp.js", import.meta.url), "utf8");
const caseCss = readFileSync(new URL("../v2-preview/revamp.css", import.meta.url), "utf8");

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
assert.match(css, /\.brand-logo-mgm img\{[^}]*height:110px/s, "MGM mark must be large enough for the complete Chinese wordmark to remain legible");
assert.match(css, /prefers-reduced-motion:reduce/, "motion must have a reduced-motion fallback");

const workSection = html.slice(html.indexOf('class="work"'), html.indexOf('class="services"'));
assert.equal((workSection.match(/class="work-row/g) || []).length, 4, "homepage must preview exactly four work stories");
assert.equal((workSection.match(/work-row-reverse/g) || []).length, 0, "every work story must keep media left and copy right like the reference");
assert.match(workSection, /class="work-copy"/, "work stories must use a dedicated editorial copy column");
assert.match(workSection, /VIEW MORE WORK/, "work section must lead to the complete project archive");
for (const row of workSection.matchAll(/<article class="work-row">([\s\S]*?)<\/article>/g)) {
  assert.ok(row[1].indexOf('class="work-media"') < row[1].indexOf('class="work-copy"'), "work media must precede its copy in every row");
}
assert.match(css, /\.work \.section-head,\.work-index,\.work>\.index-link\{[^}]*1040px/s, "desktop stories rail must be capped at the reference content width");
assert.match(css, /\.work-row\{[^}]*grid-template-columns:minmax\(0,58fr\) minmax\(0,42fr\)[^}]*gap:16px/s, "desktop work rows must use the reference 58/42 media-copy ratio");
assert.match(css, /\.work-row \.work-media\{[^}]*aspect-ratio:3\/2/s, "work media must use the reference 3:2 ratio");
assert.match(css, /\.work-copy h3\{[^}]*font-size:clamp\(21px,1\.65vw,24px\)/s, "work story titles must match the compact reference scale");
assert.match(css, /\.work-copy h3\{[^}]*font-family:"DM Sans",Arial,sans-serif/s, "work story titles must use the reference grotesk typography");
assert.match(css, /\.work-description p\{[^}]*font-size:clamp\(15px,1\.2vw,17\.5px\)[^}]*font-weight:600/s, "work body copy must use the reference size and weight");
assert.doesNotMatch(js, /--work-jelly|settleWorkJelly|nudgeWorkJelly/, "work scrolling must never translate the whole editorial rail");
assert.doesNotMatch(css, /\.work-index\{[^}]*transform:/s, "the work index must remain locked to the layout frame");
assert.doesNotMatch(css, /\.work-row[^}]*animation:/s, "work rows must not use elastic animation");
assert.match(css, /\.work-row:hover \.work-media,\.work-row:focus-within \.work-media\{[^}]*transform:none!important/s, "hovering work media must never move the video frame");
assert.match(js, /querySelectorAll\("\.work-media video"\)[\s\S]*video\.controls=true/s, "every homepage work video must expose playback controls");

assert.equal((workSection.match(/<button class="work-media"/g) || []).length, 4, "work media must be a button, not a navigation link");
assert.doesNotMatch(workSection, /<a class="work-media"/, "work media must never navigate to a case page");
assert.match(js, /workMedia\.addEventListener\("click"[\s\S]*video\.play\(\)/s, "work media click must play video in place");
assert.match(js, /entry\.intersectionRatio<\.4[\s\S]*entry\.target\.pause\(\)/s, "work video must pause when mostly out of view");

const contactSection = html.slice(html.indexOf('class="contact"'), html.indexOf('</main>'));
assert.match(contactSection, /data-contact-trigger/, "contact CTA must reveal the inline form");
assert.match(contactSection, /<form[^>]*data-contact-form[^>]*hidden/, "contact form must start hidden in the contact section");
for (const field of ["name", "email", "company", "projectType", "message"]) {
  assert.match(contactSection, new RegExp(`name="${field}"`), `contact form must include ${field}`);
}
assert.match(contactSection, /class="[^"]*contact-status[^"]*"[^>]*role="status"/, "contact form must expose submission status");
assert.match(js, /mailto:hello@gtomato\.com/, "static form must hand off completed data to the existing contact email workflow");
assert.match(js, /scrollIntoView\(\{behavior:reduced\?"auto":"smooth"/, "contact form must scroll into view and respect reduced motion");

assert.doesNotMatch(caseJs, /class="case-cover"/, "case pages must not render a decorative static cover");
const renderCaseSource = caseJs.slice(caseJs.indexOf("function renderCase()"));
assert.ok(renderCaseSource.indexOf('class="case-info"') < renderCaseSource.indexOf('case-media-section'), "case information must appear before playable media");
assert.match(caseCss, /\.case-hero__grid\s*\{[^}]*grid-template-columns:\s*1fr/s, "case title and metadata must use the full-width top hierarchy");

console.log("home structural contract passed");
