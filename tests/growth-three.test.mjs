import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const home = readFileSync(new URL("../index.html", import.meta.url), "utf8");
const source = readFileSync(new URL("../scripts/home.js", import.meta.url), "utf8");
const css = readFileSync(new URL("../styles/reference-master.css", import.meta.url), "utf8");

assert.doesNotMatch(home, /canvas|data-growth-webgl|three\.module/i, "static approval removes the 3D canvas");
assert.doesNotMatch(source, /mountGrowthThree|mountGrowthLifecycle/i, "static approval removes plant lifecycle motion code");
assert.equal((home.match(/class="chapter-plant"/g) || []).length, 6, "all six approved plants must be rendered as static assets");
assert.match(css, /\.chapter-plant\s*\{[^}]*position:absolute/s, "static plants need deterministic reference coordinates");
assert.doesNotMatch(css, /\.chapter-plant[^}]*animation\s*:/s, "static plants must not animate");

console.log("static growth artwork contract passed");
