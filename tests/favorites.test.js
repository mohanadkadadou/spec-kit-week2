import test from "node:test";
import assert from "node:assert/strict";
import { loadFavorites, saveFavorites, toggleFavorite, STORAGE_KEY } from "../src/favorites.js";

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
  const one = toggleFavorite(empty, 3);
  assert.deepEqual([...one], [3]);
  assert.equal(empty.size, 0);
  assert.equal(toggleFavorite(one, 3).size, 0);
});

test("favorites round-trip through storage (FR-006)", () => {
  const s = fakeStorage();
  assert.equal(saveFavorites(s, new Set([1, 4])), true);
  assert.deepEqual([...loadFavorites(s, 10)].sort(), [1, 4]);
});

test("corrupt or missing data yields no favorites (FR-007)", () => {
  assert.equal(loadFavorites(fakeStorage(), 10).size, 0);
  assert.equal(loadFavorites(fakeStorage({ [STORAGE_KEY]: "{not json" }), 10).size, 0);
  assert.equal(loadFavorites(fakeStorage({ [STORAGE_KEY]: '{"a":1}' }), 10).size, 0);
});

test("unknown or invalid entries are ignored", () => {
  const s = fakeStorage({ [STORAGE_KEY]: JSON.stringify([2, 99, -1, "x", 1.5]) });
  assert.deepEqual([...loadFavorites(s, 10)], [2]);
});

test("storage that throws never crashes the page (FR-007)", () => {
  const broken = { getItem() { throw new Error("blocked"); }, setItem() { throw new Error("quota"); } };
  assert.equal(loadFavorites(broken, 10).size, 0);
  assert.equal(saveFavorites(broken, new Set([1])), false);
});
