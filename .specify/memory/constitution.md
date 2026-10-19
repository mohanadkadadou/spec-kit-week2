# Quote of the Day Constitution

## Core Principles

### I. Code Quality
Source code MUST be small, readable and consistently formatted. Each module MUST have a
single responsibility (quote selection, favorites storage, and DOM rendering are separate).
No dead code, no unused dependencies. Functions MUST be pure wherever possible so they can
be tested without a browser.

### II. Test-First Testing (NON-NEGOTIABLE)
Every behavior in the spec MUST be covered by an automated test that is written before, or
together with, the code it verifies. Core logic MUST be testable with no browser and no
build step (plain `node --test`). A task is not done until `npm test` passes.

### III. Maintainability
Plain HTML/CSS/JavaScript with no backend and no build step. The browser-only layer (DOM,
`localStorage`) MUST be isolated behind thin adapters so the logic can be reused and
tested. Magic values (storage key, quote data) MUST live in named constants or data files.

### IV. Graceful Failure
The page MUST keep working if `localStorage` is unavailable or contains corrupt data;
it MUST never throw an uncaught error on load.

### V. Accessibility and Simplicity
Interactive controls MUST be real `<button>` elements with accessible names and visible
focus. State changes (favorite on/off) MUST be exposed with `aria-pressed`. Prefer the
simplest solution that satisfies the spec (YAGNI).

## Technology Constraints
- Stack: HTML5, CSS3, ES modules in the browser; Node 20+ only for running tests.
- Persistence: browser `localStorage` only. No network calls, no external services.
- No runtime dependencies.

## Development Workflow
- Work follows the Spec Kit loop: constitution, specify, plan, tasks, implement, converge.
- A human reviews each artifact before the next stage starts.
- Spec and plan are the source of truth; behavior changes start by amending them.
- Commits are small and each stage's artifacts are committed.

## Governance
This constitution supersedes ad-hoc practices. Amendments require a written change in
this file with a version bump. Plans and reviews MUST check compliance with every MUST
rule above, and any justified deviation MUST be recorded in the plan's Complexity section.

**Version**: 1.0.0 | **Ratified**: 2026-10-19 | **Last Amended**: 2026-10-19
