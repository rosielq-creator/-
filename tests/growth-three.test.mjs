import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const home = readFileSync(new URL("../index.html", import.meta.url), "utf8");
const source = readFileSync(new URL("../scripts/home.js", import.meta.url), "utf8");
const css = readFileSync(new URL("../styles/reference-master.css", import.meta.url), "utf8");

assert.doesNotMatch(home, /canvas|data-growth-webgl|three\.module/i, "static approval removes the 3D canvas");
assert.doesNotMatch(source, /mountGrowthThree|mountGrowthLifecycle/i, "static approval removes plant lifecycle motion code");
assert.equal((home.match(/class="chapter-plant"/g) || []).length, 6, "all six approved plants must be rendered as static assets");
assert.equal((home.match(/assets\/growth\/originals\//g) || []).length, 6, "all plants must use the native-resolution source files");
assert.doesNotMatch(home, /assets\/growth\/hd\/[^\"]+-alpha\.png/, "blurred upscaled alpha derivatives must not ship");
assert.match(css, /\.chapter-plant\s*\{[^}]*position:absolute/s, "static plants need deterministic reference coordinates");
assert.doesNotMatch(css, /\.chapter-plant[^}]*animation\s*:/s, "static plants must not animate");
assert.match(css, /--join-02-03:\s*966px/, "sprout and branches must share the 02-03 stem endpoint");
assert.match(css, /--join-03-04:\s*931px/, "branches and bloom must share the 03-04 stem endpoint");
assert.match(css, /--join-04-05:\s*961px/, "bloom and crystal must share the 04-05 stem endpoint");
assert.match(css, /--join-05-06:\s*900px/, "crystal and return seed must share the 05-06 stem endpoint");

console.log("static growth artwork contract passed");
