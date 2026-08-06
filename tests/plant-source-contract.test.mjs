import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const contract = JSON.parse(
  await readFile(new URL('../data/plant-composition-v2.json', import.meta.url), 'utf8'),
);

assert.equal(contract.master.width, 512);
assert.equal(contract.master.height, 1536);
assert.equal(contract.desktop.width, 1440);
assert.equal(contract.desktop.height, 4320);
assert.equal(contract.desktop.scaleFromMaster, 2.8125);

assert.deepEqual(
  contract.plants.map(({ id }) => id),
  ['seed', 'sprout', 'branches', 'bloom', 'crystal', 'seed-return'],
);

const seedPlant = contract.plants.find(({ id }) => id === "seed");
assert.equal(seedPlant.source, "assets/growth/source-v2/01-seed.png");
assert.equal(seedPlant.sha256, "5da5c92a645f0d44ab559886a763bbd4f090c84b366397e7f401c2d7e76edb75");

for (const plant of contract.plants) {
  assert.match(plant.source, /^assets\/growth\/source-v2\/.+\.png$/);
  assert.ok(plant.nativeWidth > 0);
  assert.ok(plant.nativeHeight > 0);
  assert.equal(plant.upscaleAllowed, false);
}

assert.deepEqual(
  contract.desktop.joins.map(({ from, to }) => `${from}->${to}`),
  ['sprout->branches', 'branches->bloom', 'bloom->crystal', 'crystal->seed-return'],
);

for (const join of contract.desktop.joins) {
  assert.ok(Number.isFinite(join.master.x));
  assert.ok(Number.isFinite(join.master.y));
  assert.equal(join.desktop.x, join.master.x * contract.desktop.scaleFromMaster);
  assert.equal(join.desktop.y, join.master.y * contract.desktop.scaleFromMaster);
}

const css = await readFile(new URL('../styles/reference-master.css', import.meta.url), 'utf8');
assert.match(css, /\.home-about::after[^}]*sprout-alpha\.png/s);
assert.match(css, /\.artist-index::after[^}]*branches-alpha\.png/s);

console.log('plant source and anchor contract: ok');
