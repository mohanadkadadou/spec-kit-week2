# Research: Quote of the Day

- **Decision**: Persist with `localStorage`. **Rationale**: no backend allowed; synchronous API; sufficient for a small list of ids. **Alternatives**: IndexedDB (overkill), cookies (sent to server, size-limited).
- **Decision**: ES modules + `node --test`. **Rationale**: zero dependencies, no bundler, same code runs in browser and tests. **Alternatives**: Jest/Vitest (adds dependencies, violates simplicity).
- **Decision**: Opening via a static server (`python3 -m http.server`) for ES modules. **Rationale**: browsers block module imports from `file://`. **Alternatives**: single inlined script (loses testability).
