/** Favorites persistence. Favorites are stored as stable quote ids. All storage access is guarded. */
export const STORAGE_KEY = "quote-of-the-day:favorites";

/** Load favorites as a Set of known quote ids; never throws. */
export function loadFavorites(storage, knownIds) {
  try {
    const parsed = JSON.parse(storage.getItem(STORAGE_KEY));
    if (!Array.isArray(parsed)) return new Set();
    const known = new Set(knownIds);
    return new Set(parsed.filter((id) => typeof id === "string" && known.has(id)));
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

/** Return a new Set with `id` added if absent, removed if present. */
export function toggleFavorite(favorites, id) {
  const next = new Set(favorites);
  if (next.has(id)) next.delete(id);
  else next.add(id);
  return next;
}
