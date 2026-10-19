import { QUOTES } from "./quotes.js";
import { pickRandom } from "./selection.js";
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

let favorites = loadFavorites(safeStorage, QUOTES.length);
let current = QUOTES.indexOf(pickRandom(QUOTES));

function render() {
  const q = QUOTES[current];
  els.text.textContent = q.text;
  els.author.textContent = q.author;
  const on = favorites.has(current);
  els.fav.setAttribute("aria-pressed", String(on));
  els.fav.textContent = on ? "★ Favorited" : "☆ Favorite";
}

els.next.addEventListener("click", () => {
  current = QUOTES.indexOf(pickRandom(QUOTES));
  render();
});

els.fav.addEventListener("click", () => {
  favorites = toggleFavorite(favorites, current);
  saveFavorites(safeStorage, favorites);
  render();
});

render();
