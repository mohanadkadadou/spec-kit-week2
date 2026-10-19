/** Favorites persistence. Favorites are stored as quote indices. All storage access is guarded. */
export const STORAGE_KEY = "quote-of-the-day:favorites";

/** Load favorites as a Set of valid indices; never throws. */
export function loadFavorites(storage, quoteCount) {
  try {
    const parsed = JSON.parse(storage.getItem(STORAGE_KEY));
    if (!Array.isArray(parsed)) return new Set();
    return new Set(parsed.filter((n) => Number.isInteger(n) && n >= 0 && n < quoteCount));
  } catch {
    return new Set();
  }
}

/** Persist favorites; returns false (instead of throwing) if storage is unavailable. */
export function saveFavorites(storage, favorites) {
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify([...favorites]));
    return true;
  } catch {
    return false;
  }
}

/** Return a new Set with `index` added if absent, removed if present. */
export function toggleFavorite(favorites, index) {
  const next = new Set(favorites);
  if (next.has(index)) next.delete(index);
  else next.add(index);
  return next;
}
