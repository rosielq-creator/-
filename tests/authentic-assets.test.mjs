import assert from "node:assert/strict";
import fs from "node:fs";

const manifest = JSON.parse(fs.readFileSync("data/authentic-assets.json", "utf8"));

for (const item of manifest) {
  assert.ok(
    ["official-client", "user-original", "licensed-brand", "commissioned-motion"].includes(item.source),
    `${item.path} has an unsupported source`,
  );
  assert.equal(item.approved, true, `${item.path} is not approved`);
  assert.ok(fs.existsSync(item.path), `${item.path} does not exist`);
}
