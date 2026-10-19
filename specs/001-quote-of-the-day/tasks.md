# Tasks: Quote of the Day Page

**Input**: `/specs/001-quote-of-the-day/` (spec.md, plan.md, data-model.md)
**Tests**: Required by constitution principle II.

## Phase 1: Setup
- [x] T001 Create `package.json` with `"type": "module"` and a `test` script (`node --test tests/`)
- [x] T002 [P] Create `index.html` skeleton with quote, author, favorite button, new-quote button, `aria-live` region
- [x] T003 [P] Create `styles.css` (readable layout, visible focus, favorited state)

## Phase 2: Foundational
- [x] T004 Create `src/quotes.js` with at least 10 quotes (FR-002)
- [x] T005 [P] Write `tests/selection.test.js` then implement `src/selection.js` `pickRandom` (FR-001, FR-003)
- [x] T006 [P] Write `tests/favorites.test.js` then implement `src/favorites.js` (load/save/toggle, corrupt data, storage throwing) (FR-004, FR-006, FR-007)

## Phase 3: User Story 1 - See a random quote (P1)
- [x] T007 [US1] Implement `src/main.js` rendering a random quote on load (FR-001)
- [x] T008 [US1] Wire the "New quote" button (FR-003)

## Phase 4: User Story 2 - Favorite a quote (P2)
- [x] T009 [US2] Wire favorite toggle with `aria-pressed` and visual state (FR-004, FR-005)

## Phase 5: User Story 3 - Persistence (P2)
- [x] T010 [US3] Load favorites on start, save on toggle, ignore unknown ids (FR-006, FR-007)

## Phase 6: Polish
- [x] T011 [P] Verify keyboard-only use and offline use (SC-003, SC-004)
- [x] T012 [P] Run `npm test` and the quickstart manual check

## Phase 7: Convergence
- [x] T013 Make "New quote" always show a different quote than the one displayed, via a `pickDifferent(list, currentIndex)` helper with tests, per US1/AC2 and Independent Test (partial)
- [x] T014 Give each quote a stable string `id` and store favorite ids (not array indices) in storage, migrating nothing but dropping unknown ids, per Key Entity "Quote: stable identity" and FR-006 (contradicts)
- [x] T015 Verify keyboard-only and offline use in a real browser and record the result in quickstart.md, per SC-003, SC-004 (missing)
