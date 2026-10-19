# Data Model

**Quote** (static, in `src/quotes.js`): `{ id: string, text: string, author: string }`. Identity: the unique, never-reused `id` (NOT the array index).

**Favorites** (persisted): JSON array of unique strings (quote ids) under key `quote-of-the-day:favorites`.
Validation on load: must be an array; entries must be strings matching an existing quote `id`; anything else is dropped.
