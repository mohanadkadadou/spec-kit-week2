import { QUOTES } from "./quotes.js";
import { pickRandom, pickDifferent } from "./selection.js";
import { loadFavorites, saveFavorites, toggleFavorite } from "./favorites.js";

const storage = (() => {
  try { return window.localStorage; } catch { return null; }
})();
const safeStorage = storage ?? { getItem: () => null, setItem: () => { throw new Error("no storage"); } };

const els = {
  text: document.getElementById("quote-text"),
  author: document.getElementById("quote-author"),
  fav: document.getElementById("favorite"),
  next: document.getElementById("new-quote"),
};

let favorites = loadFavorites(safeStorage, QUOTES.map((q) => q.id));
let current = QUOTES.indexOf(pickRandom(QUOTES));

function render() {
  const q = QUOTES[current];
  els.text.textContent = q.text;
  els.author.textContent = q.author;
  const on = favorites.has(q.id);
  els.fav.setAttribute("aria-pressed", String(on));
  els.fav.textContent = on ? "★ Favorited" : "☆ Favorite";
}

els.next.addEventListener("click", () => {
  current = pickDifferent(QUOTES, current);
  render();
});

els.fav.addEventListener("click", () => {
  favorites = toggleFavorite(favorites, QUOTES[current].id);
  saveFavorites(safeStorage, favorites);
  render();
});

render();
