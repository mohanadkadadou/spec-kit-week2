/** Return a uniformly random item from a non-empty list. `random` is injectable for tests. */
export function pickRandom(list, random = Math.random) {
  if (!Array.isArray(list) || list.length === 0) {
    throw new RangeError("pickRandom needs a non-empty list");
  }
  return list[Math.floor(random() * list.length)];
}
