/** Return a uniformly random item from a non-empty list. `random` is injectable for tests. */
export function pickRandom(list, random = Math.random) {
  if (!Array.isArray(list) || list.length === 0) {
    throw new RangeError("pickRandom needs a non-empty list");
  }
  return list[Math.floor(random() * list.length)];
}

/**
 * Return an index into `list` that differs from `currentIndex`.
 * Draws from the n-1 other positions, so it never repeats and stays uniform.
 */
export function pickDifferent(list, currentIndex, random = Math.random) {
  if (!Array.isArray(list) || list.length < 2) {
    throw new RangeError("pickDifferent needs a list with at least 2 items");
  }
  const drawn = Math.floor(random() * (list.length - 1));
  return drawn >= currentIndex ? drawn + 1 : drawn;
}
