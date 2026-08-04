import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const home = readFileSync(new URL("../index.html", import.meta.url), "utf8");
const maya = readFileSync(new URL("../maya.html", import.meta.url), "utf8");

for (const page of [home, maya]) {
  assert.match(page, /data-site-shell/, "expected the shared site shell");
  assert.match(page, /data-language="en"/, "expected an English language control");
  assert.match(page, /data-language="zh"/, "expected a Chinese language control");
  assert.doesNotMatch(page, /<canvas\b/i, "site pages must remain semantic HTML");
  assert.match(page, /styles\/site-shell\.css/, "expected shared shell styling");
}

assert.match(home, /type="module" src="scripts\/home\.js/);
assert.match(maya, /type="module" src="scripts\/maya-profile\.js/);

console.log("home structural contract passed");
