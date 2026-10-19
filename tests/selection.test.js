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
