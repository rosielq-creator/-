import assert from "node:assert/strict";
import { getLifecycleState } from "../scripts/growth-lifecycle.js";

const stages = [
  { name: "seed", top: 0, bottom: 1000 },
  { name: "sprout", top: 1000, bottom: 2200 },
  { name: "branches", top: 2200, bottom: 3600 },
  { name: "bloom", top: 3600, bottom: 5200 },
  { name: "seed-return", top: 5200, bottom: 6200 }
];

assert.deepEqual(getLifecycleState(0, stages), { stage: "seed", index: 0, local: 0, global: 0 });
assert.equal(getLifecycleState(1600, stages).stage, "sprout");
assert.equal(getLifecycleState(2900, stages).stage, "branches");
assert.equal(getLifecycleState(4400, stages).stage, "bloom");
assert.deepEqual(getLifecycleState(6200, stages), { stage: "seed-return", index: 4, local: 1, global: 1 });
assert.equal(getLifecycleState(4200, stages).local, 0.375);

console.log("growth lifecycle contract passed");
