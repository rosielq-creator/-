import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
const css = readFileSync(new URL("../home-v4.css", import.meta.url), "utf8");
const js = readFileSync(new URL("../home-v4.js", import.meta.url), "utf8");

const order = ["class=\"hero\"", "class=\"manifesto\"", "class=\"artists\"", "class=\"work\"", "class=\"services\"", "class=\"contact\""];
let cursor = -1;
for (const marker of order) {
  const next = html.indexOf(marker);
  assert.ok(next > cursor, `expected ${marker} after prior homepage section`);
  cursor = next;
}

assert.equal((html.match(/data-artist-trigger=/g) || []).length, 5, "expected five artist scroll triggers");
assert.match(html, /data-artist-left/, "expected left artist classification");
assert.match(html, /data-artist-right/, "expected right artist classification");
assert.match(html, /data-artist-stage/, "expected a single artist stage");
assert.match(html, /class="manifesto-line"/, "expected editorial manifesto lines");
assert.doesNotMatch(css, /scroll-snap-type\s*:/, "homepage must not use scroll snapping");
assert.match(js, /closestArtistToViewportCenter/, "artist selection must follow the trigger nearest the viewport center");

console.log("home structural contract passed");
