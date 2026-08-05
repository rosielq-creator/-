import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const css = readFileSync(new URL("../styles/reference-master.css", import.meta.url), "utf8");

const desktop = css.match(/@media \(min-width: 801px\) \{([\s\S]*?)\n\}/)?.[1] ?? "";
const mobile = css.match(/@media \(max-width:800px\) \{([\s\S]*?)\n\}/)?.[1] ?? "";

const artistCoordinates = [
  /\.artist-card:nth-child\(1\)\s*\{[^}]*left:586px;[^}]*top:52px;/s,
  /\.artist-card:nth-child\(2\)\s*\{[^}]*right:230px;[^}]*top:52px;/s,
  /\.artist-card:nth-child\(3\)\s*\{[^}]*left:788px;[^}]*top:294px;/s,
  /\.artist-card:nth-child\(4\)\s*\{[^}]*left:586px;[^}]*top:544px;/s,
  /\.artist-card:nth-child\(5\)\s*\{[^}]*right:230px;[^}]*top:544px;/s,
];

for (const coordinate of artistCoordinates) {
  assert.match(desktop, coordinate, "desktop Artist cards must keep approved design coordinates");
}

const workCoordinates = [
  /\.work-card:nth-child\(1\)\s*\{[^}]*left:505px;[^}]*top:245px;/s,
  /\.work-card:nth-child\(2\)\s*\{[^}]*right:137px;[^}]*top:245px;/s,
  /\.work-card:nth-child\(3\)\s*\{[^}]*left:505px;[^}]*top:520px;/s,
  /\.work-card:nth-child\(4\)\s*\{[^}]*right:137px;[^}]*top:520px;/s,
];

for (const coordinate of workCoordinates) {
  assert.match(desktop, coordinate, "desktop Work cards must keep approved design coordinates");
}

assert.match(mobile, /\.artist-grid\s*\{[^}]*right:18px;[^}]*bottom:28px;[^}]*left:18px;/s,
  "mobile Artist grid must keep approved edge and baseline coordinates");
assert.match(mobile, /\.success-stories \.work-grid\s*\{[^}]*right:18px;[^}]*bottom:35px;[^}]*left:18px;/s,
  "mobile Work grid must keep approved edge and baseline coordinates");

assert.doesNotMatch(css, /\.artist-card img\s*\{[^}]*filter:(?!none)/s,
  "Artist sources must render in their uploaded color");
assert.doesNotMatch(css, /\.artist-card img\s*\{[^}]*opacity:(?!1(?:[;}]))/s,
  "Artist sources must render at full opacity");
assert.doesNotMatch(css, /\.work-media video\s*\{[^}]*filter:(?!none)/s,
  "Work sources must render in their uploaded color");
assert.doesNotMatch(css, /\.work-media video\s*\{[^}]*opacity:(?!1(?:[;}]))/s,
  "Work sources must render at full opacity");

console.log("Artist and Work card fidelity contract passed");
