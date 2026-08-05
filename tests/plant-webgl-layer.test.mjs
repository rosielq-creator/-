import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
const css = readFileSync(new URL("../styles/reference-master.css", import.meta.url), "utf8");
const script = readFileSync(new URL("../scripts/growth-three.js", import.meta.url), "utf8");
const composition = JSON.parse(readFileSync(new URL("../data/plant-composition-v2.json", import.meta.url), "utf8"));

assert.match(html, /data-growth-webgl/, "the shared WebGL plant layer must remain mounted");
assert.match(css, /\.growth-stage\s*\{[^}]*display:block\s*!important/s, "the final stylesheet must expose the shared plant layer");
assert.doesNotMatch(css, /\.growth-chapter::after\s*\{[^}]*display:block/s, "section pseudo-images must not compete with WebGL");

for (const breakpoint of ["desktop", "mobile"]) {
  const placements = composition[breakpoint].placements;
  assert.equal(Object.keys(placements || {}).length, 6, `${breakpoint} needs six page-coordinate placements`);
  for (const plant of composition.plants) {
    const placement = placements[plant.id];
    assert.ok(placement, `${breakpoint} placement missing for ${plant.id}`);
    for (const key of ["x", "y", "width", "height"]) assert.equal(typeof placement[key], "number", `${breakpoint}.${plant.id}.${key} must be numeric`);
  }
}

for (const forbidden of ["pointermove", "Math.sin", "gt:growth", "AdditiveBlending"]) {
  assert.ok(!script.includes(forbidden), `static plant renderer must not contain ${forbidden}`);
}
assert.match(script, /OrthographicCamera/, "page-coordinate rendering must use an orthographic camera");
assert.match(script, /plant-composition-v2\.json/, "renderer must consume the locked composition manifest");
for (const plant of composition.plants) assert.match(plant.source, /^assets\/growth\/source-v2\//, `${plant.id} must use a native source`);
assert.match(script, /devicePixelRatio/, "renderer must account for display pixel density");

console.log("static WebGL plant-layer contract passed");
