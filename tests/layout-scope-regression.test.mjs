import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';

const css = fs.readFileSync(new URL('../styles/reference-master.css', import.meta.url), 'utf8');
const composition = JSON.parse(
  fs.readFileSync(new URL('../data/plant-composition-v2.json', import.meta.url), 'utf8'),
);

test('pages 2-3 work does not alter the approved global palette or hide lifecycle stages', () => {
  assert.match(css, /--paper:#f3f3ef/);
  assert.doesNotMatch(css, /growth-stage\[data-stage="sprout"\].*opacity:0/);
  assert.doesNotMatch(css, /growth-stage\[data-stage="branches"\].*opacity:0/);
});

test('the approved first-screen seed source remains unchanged', () => {
  const seed = composition.plants.find((plant) => plant.id === 'seed');
  assert.equal(seed.source, 'assets/growth/source-v2/01-seed.png');
  assert.equal(seed.sha256, '5da5c92a645f0d44ab559886a763bbd4f090c84b366397e7f401c2d7e76edb75');
});

test('all six approved desktop section heights remain locked', () => {
  for (const declaration of [
    '.home-hero { height:594px !important;',
    '.home-about { height:641px !important;',
    '.artist-index { height:818px !important;',
    '.success-stories { height:804px !important;',
    '.brand-index { height:788px !important;',
    '.contact-flow { height:506px !important;',
  ]) {
    assert.ok(css.includes(declaration), `missing protected declaration: ${declaration}`);
  }
});
