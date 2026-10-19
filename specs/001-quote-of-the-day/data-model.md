# Data Model

**Quote** (static, in `src/quotes.js`): `{ text: string, author: string }`. Identity: index in the `QUOTES` array.

**Favorites** (persisted): JSON array of unique integers (quote indices) under key `quote-of-the-day:favorites`.
Validation on load: must be an array; entries must be integers within `[0, QUOTES.length)`; anything else is dropped.
