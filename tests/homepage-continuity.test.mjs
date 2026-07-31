import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
const css = await readFile(new URL("../home-v4.css", import.meta.url), "utf8");
const js = await readFile(new URL("../home-v4.js", import.meta.url), "utf8");

test("homepage chapters follow the approved continuous narrative", () => {
  const selectors = [
    'class="hero-sequence"',
    'class="artists"',
    'class="work success-stories"',
    'class="services"',
    'class="contact"',
  ];
  const offsets = selectors.map((selector) => html.indexOf(selector));

  assert.ok(offsets.every((offset) => offset >= 0), "every homepage chapter must exist");
  assert.deepEqual(offsets, [...offsets].sort((a, b) => a - b));
});

test("artists chapter is scalable and keeps its directory exit", () => {
  assert.equal((html.match(/class="artist-name(?: is-active)?"/g) ?? []).length, 5);
  assert.match(html, /class="artists-view-more" href="artists\.html"/);
  assert.match(js, /pointerenter/);
  assert.doesNotMatch(js, /setTimeout\s*\(/);
});

test("selected work preserves four campaign stories", () => {
  assert.equal((html.match(/<article class="work-row/g) ?? []).length, 4);
});

test("final continuity contract disables slide mechanics and forced chapter screens", () => {
  const contractStart = css.indexOf("/* Continuous homepage contract */");
  assert.ok(contractStart >= 0, "final continuity contract must be present");

  const contract = css.slice(contractStart);
  assert.match(contract, /scroll-snap-type:\s*none/);
  assert.match(contract, /\.artists[\s\S]*?min-height:\s*auto/);
  assert.match(contract, /\.success-stories[\s\S]*?min-height:\s*auto/);
  assert.match(contract, /\.services[\s\S]*?min-height:\s*auto/);
  assert.match(contract, /\.contact[\s\S]*?min-height:\s*auto/);
  assert.doesNotMatch(contract, /position:\s*sticky/);
});
