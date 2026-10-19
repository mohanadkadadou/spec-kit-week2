import test from "node:test";
import assert from "node:assert/strict";
import { pickRandom } from "../src/selection.js";
import { QUOTES } from "../src/quotes.js";

test("pickRandom returns the item chosen by the random source", () => {
  assert.equal(pickRandom(["a", "b", "c"], () => 0), "a");
  assert.equal(pickRandom(["a", "b", "c"], () => 0.5), "b");
  assert.equal(pickRandom(["a", "b", "c"], () => 0.999), "c");
});

test("pickRandom rejects an empty list", () => {
  assert.throws(() => pickRandom([]), RangeError);
});

test("built-in list has at least 10 well-formed quotes (FR-002)", () => {
  assert.ok(QUOTES.length >= 10);
  for (const q of QUOTES) {
    assert.ok(q.text.trim() && q.author.trim());
  }
});

import { pickDifferent } from "../src/selection.js";

test("pickDifferent never returns the current index, for every possible draw (FR-003)", () => {
  const list = ["a", "b", "c", "d"];
  for (let current = 0; current < list.length; current++) {
    for (const r of [0, 0.2, 0.34, 0.5, 0.67, 0.99999]) {
      assert.notEqual(pickDifferent(list, current, () => r), current);
    }
  }
});

test("pickDifferent can reach every other index", () => {
  const seen = new Set();
  for (const r of [0, 0.4, 0.8]) seen.add(pickDifferent(["a", "b", "c", "d"], 1, () => r));
  assert.deepEqual([...seen].sort(), [0, 2, 3]);
});

test("pickDifferent rejects lists that cannot satisfy the rule", () => {
  assert.throws(() => pickDifferent(["only"], 0), RangeError);
});

test("every quote has a unique stable id (FR-006)", async () => {
  const { QUOTES } = await import("../src/quotes.js");
  const ids = QUOTES.map((q) => q.id);
  assert.equal(new Set(ids).size, ids.length);
  assert.ok(ids.every((id) => /^[a-z0-9-]+$/.test(id)));
});
