# Tasks: Quote of the Day Page

**Input**: `/specs/001-quote-of-the-day/` (spec.md, plan.md, data-model.md)
**Tests**: Required by constitution principle II.

## Phase 1: Setup
- [ ] T001 Create `package.json` with `"type": "module"` and a `test` script (`node --test tests/`)
- [ ] T002 [P] Create `index.html` skeleton with quote, author, favorite button, new-quote button, `aria-live` region
- [ ] T003 [P] Create `styles.css` (readable layout, visible focus, favorited state)

## Phase 2: Foundational
- [ ] T004 Create `src/quotes.js` with at least 10 quotes (FR-002)
- [ ] T005 [P] Write `tests/selection.test.js` then implement `src/selection.js` `pickRandom` (FR-001, FR-003)
- [ ] T006 [P] Write `tests/favorites.test.js` then implement `src/favorites.js` (load/save/toggle, corrupt data, storage throwing) (FR-004, FR-006, FR-007)

## Phase 3: User Story 1 - See a random quote (P1)
- [ ] T007 [US1] Implement `src/main.js` rendering a random quote on load (FR-001)
- [ ] T008 [US1] Wire the "New quote" button (FR-003)

## Phase 4: User Story 2 - Favorite a quote (P2)
- [ ] T009 [US2] Wire favorite toggle with `aria-pressed` and visual state (FR-004, FR-005)

## Phase 5: User Story 3 - Persistence (P2)
- [ ] T010 [US3] Load favorites on start, save on toggle, ignore unknown ids (FR-006, FR-007)

## Phase 6: Polish
- [ ] T011 [P] Verify keyboard-only use and offline use (SC-003, SC-004)
- [ ] T012 [P] Run `npm test` and the quickstart manual check
