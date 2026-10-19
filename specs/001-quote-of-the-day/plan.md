# Implementation Plan: Quote of the Day Page

**Branch**: `001-quote-of-the-day` | **Date**: 2026-10-19 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/001-quote-of-the-day/spec.md`

## Summary

A static page (plain HTML/CSS/JavaScript, no backend) that shows a random quote from a
built-in list, a "New quote" button, and a favorite toggle persisted in `localStorage`.
Logic is split into pure ES modules so it can be unit-tested with `node --test`.

## Technical Context

**Language/Version**: JavaScript (ES2022 modules), HTML5, CSS3
**Primary Dependencies**: None (runtime). Node 20+ only for `node --test`
**Storage**: Browser `localStorage`, one key `quote-of-the-day:favorites` holding a JSON array
**Testing**: `node --test` (built in), pure-logic unit tests + storage-adapter tests with a fake storage
**Target Platform**: Any modern evergreen browser, opened over `file://` or any static server
**Project Type**: Single static web page
**Performance Goals**: First quote visible on first paint (no async work)
**Constraints**: Offline; no build step; no dependencies
**Scale/Scope**: 1 page, ~15 quotes

## Constitution Check

| Principle | Gate | Status |
|---|---|---|
| I. Code Quality | Separate modules: quotes data, selection, storage, UI | PASS |
| II. Test-First | `node --test` tests for selection + storage written with the code | PASS |
| III. Maintainability | No build step; storage key + data in named constants | PASS |
| IV. Graceful Failure | Storage adapter wraps all access in try/catch | PASS |
| V. Accessibility | `<button>` elements, `aria-pressed`, `aria-live` region | PASS |

Re-check after design: PASS, no violations.

## Project Structure

### Documentation (this feature)

```text
specs/001-quote-of-the-day/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
└── tasks.md
```

### Source Code (repository root)

```text
index.html
styles.css
src/
├── quotes.js        # QUOTES data array
├── selection.js     # pickRandom(list), pickDifferent(list, currentIndex)
├── favorites.js     # load/save/toggle favorites against a storage adapter
└── main.js          # DOM wiring
tests/
├── selection.test.js
└── favorites.test.js
package.json         # only a "test" script, no dependencies
```

**Structure Decision**: Single static project; logic modules have no DOM access so they run under Node.

## Design Decisions

- **Random selection**: `pickDifferent(list, currentIndex, random)` draws from the list excluding the current index (draw an index in `[0, n-1)` and skip over `currentIndex`), so a repeat is impossible and the distribution over the other quotes stays uniform. `pickRandom` remains for the first quote on load. `random` is injectable for tests.
- **Favorite identity**: every quote has a stable string `id` (e.g. `"knuth-premature-optimization"`); favorites are stored as ids, never array indices, so reordering or inserting quotes cannot re-assign a favorite to the wrong quote. Unknown ids are dropped on load.
- **Rendering**: `main.js` renders the quote, author, and sets `aria-pressed` on the favorite button.
- **Corruption handling**: invalid JSON or non-array value resets to an empty list.
