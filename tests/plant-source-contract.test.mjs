import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';

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
assert.equal(seedPlant.source, "assets/growth/source-v2/closed-seed-silver.png", "seed must use the approved silver three-petal closed seed");
assert.equal(seedPlant.sha256, "a97a9875763e9dccc1094152ab61486e8e14002fe039c850c3f7cff4c1a83515");

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

const suppliedPlantSources = [
  'assets/growth/source-v2/02-sprout-4k.webp',
  'assets/growth/source-v2/03-vine-4k.webp',
];
for (const source of suppliedPlantSources) {
  assert.equal(existsSync(new URL(`../${source}`, import.meta.url)), true, `${source} must exist`);
}

const css = await readFile(new URL('../styles/reference-master.css', import.meta.url), 'utf8');
assert.match(css, /\.home-about::after[^}]*02-sprout-4k-alpha\.png/s,
  'section 02 must render the supplied transparent sprout');
assert.match(css, /\.artist-index::after[^}]*03-vine-connected-v2-alpha\.png/s,
  'section 03 must render the corrected large connected vine');
assert.match(css, /\.artist-grid[^}]*z-index:6/s,
  'Artist cards must cross above the continuous vine layer');

console.log('plant source and anchor contract: ok');
