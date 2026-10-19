# Quickstart

```bash
npm test                         # run unit tests
python3 -m http.server 8080      # then open http://localhost:8080
```
Manual check: favorite a quote, reload, press "New quote" until it reappears: it must still be favorited.

## Verification log (T015, 2026-10-19)
Checked in a real browser over a local static server:
- 500 consecutive "New quote" presses: 0 repeats of the displayed quote (FR-003).
- Favorite toggled: `aria-pressed="true"`, storage held `["da-vinci-simplicity"]` (id, not index).
- After a full reload the favorited quote was still shown as favorited when it reappeared (FR-006).
- No network requests are made by the page (static files only), so it works offline (SC-003).
- Both controls are `<button>` elements: Tab/Enter/Space operate them, focus ring visible (SC-004).
