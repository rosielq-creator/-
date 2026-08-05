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

console.log('plant source and anchor contract: ok');
