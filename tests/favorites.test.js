import test from "node:test";
import assert from "node:assert/strict";
import { loadFavorites, saveFavorites, toggleFavorite, STORAGE_KEY } from "../src/favorites.js";

const IDS = ["a", "b", "c", "d", "e"];

const fakeStorage = (initial = {}) => {
  const data = { ...initial };
  return {
    getItem: (k) => (k in data ? data[k] : null),
    setItem: (k, v) => { data[k] = String(v); },
    data,
  };
};

test("toggleFavorite adds then removes without mutating the input", () => {
  const empty = new Set();
  const one = toggleFavorite(empty, "c");
  assert.deepEqual([...one], ["c"]);
  assert.equal(empty.size, 0);
  assert.equal(toggleFavorite(one, "c").size, 0);
});

test("favorites round-trip through storage (FR-006)", () => {
  const s = fakeStorage();
  assert.equal(saveFavorites(s, new Set(["b", "e"])), true);
  assert.deepEqual([...loadFavorites(s, IDS)].sort(), ["b", "e"]);
});

test("corrupt or missing data yields no favorites (FR-007)", () => {
  assert.equal(loadFavorites(fakeStorage(), IDS).size, 0);
  assert.equal(loadFavorites(fakeStorage({ [STORAGE_KEY]: "{not json" }), IDS).size, 0);
  assert.equal(loadFavorites(fakeStorage({ [STORAGE_KEY]: '{"a":1}' }), IDS).size, 0);
});

test("unknown or invalid entries are ignored", () => {
  const s = fakeStorage({ [STORAGE_KEY]: JSON.stringify(["c", "gone", 2, null, "x"]) });
  assert.deepEqual([...loadFavorites(s, IDS)], ["c"]);
});

test("storage that throws never crashes the page (FR-007)", () => {
  const broken = { getItem() { throw new Error("blocked"); }, setItem() { throw new Error("quota"); } };
  assert.equal(loadFavorites(broken, IDS).size, 0);
  assert.equal(saveFavorites(broken, new Set(["b"])), false);
});

test("reordering the quote list keeps favorites on the same quotes (FR-006)", () => {
  const s = fakeStorage();
  saveFavorites(s, new Set(["c"]));
  const reordered = ["e", "d", "c", "b", "a", "new"];
  assert.deepEqual([...loadFavorites(s, reordered)], ["c"]);
});
