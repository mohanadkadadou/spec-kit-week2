# Week 2 Write-up — Spec-Driven Development with Spec Kit

**Student:** Mohanad Kadadou (2309115218) · **Course:** JOB191 AI-Augmented Software Engineering
**Agent used:** Claude Code (Claude Sonnet 5.5) · **Spec Kit:** `specify-cli` 1.2.2 · **Integration key:** `claude`

## Setup (what I actually did)
```bash
uv tool install specify-cli
specify init spec-kit-week2 --integration claude --non-interactive --ignore-agent-tools
```
`--ignore-agent-tools` was needed because the `claude` CLI binary is not on this machine's PATH (I use
Claude Code through the desktop app). The agent read each generated `.claude/skills/speckit-*/SKILL.md`
and followed its outline step by step, writing exactly the files each skill specifies.
`.specify/.gitignore` only ignores machine-local files (`feature.json`, extension overrides), so
the constitution, templates, scripts and `specs/` are all committed.
The git history is one commit per stage so the loop is visible: `git log --oneline`.

## Prompts given to each skill
| Stage | Prompt |
|---|---|
| `/speckit-constitution` | Create principles focused on code quality, testing, and maintainability. |
| `/speckit-specify` | A quote-of-the-day page: one random quote from a built-in list, a "New quote" button, and favoriting that persists across reloads. |
| `/speckit-plan` | Use plain HTML/CSS/JavaScript, no backend; persist favorites in localStorage. |
| `/speckit-tasks` | (no arguments) |
| `/speckit-implement` | (no arguments) |
| `/speckit-converge` | (no arguments), run twice |

Review gate: after every stage I read the artifact against the previous one (e.g. plan vs. constitution
check table, tasks vs. FR numbers) before continuing; the stage-1 spec passed its own quality checklist
(`checklists/requirements.md`) in one iteration.

## Spec/plan refinement that changed the output (before / after)
**Trigger.** The first `/speckit-converge` pass (after implement) reported two gaps, both traceable to
vague wording in the artifacts rather than to coding mistakes:

| | Before (spec v1 / plan v1) | Problem found by converge | After (spec v2 / plan v2) |
|---|---|---|---|
| Spec US1/AC2, FR-003 | "a quote from the list is displayed" | `pickRandom` can return the *same* quote. Measured over 100 000 presses: **8.38 % repeats** (≈ 1/12), so "New quote" often looked broken (partial) | "a *different* quote… never the same twice in a row" |
| Plan decision | `pickRandom(list)` for every press | — | `pickDifferent(list, currentIndex)`: draw from n−1 positions and skip the current one: impossible to repeat, still uniform |
| Spec Key Entity / FR-006 | Quote has "stable identity" (but plan stored the **array index**) | Plan contradicted spec: inserting or reordering quotes would silently move favorites to the wrong quote | Spec makes it testable (favorites survive reorder); plan stores a stable string `id` per quote; unknown ids dropped on load |

I changed the **spec and plan only**, appended Phase 7 tasks (T013–T015), and then implemented. Result:
- New tests: `pickDifferent` never returns the current index for any draw; ids unique; reordered list keeps favorites.
- Browser check: **0 repeats in 500 consecutive "New quote" presses** (was 8.4 %), storage now holds
  `["da-vinci-simplicity"]` instead of an index.

## Convergence outcome
- Pass 1: **3 findings** (T013 partial, T014 contradicts, T015 missing), appended as Phase 7.
- After `implement` of Phase 7 and `npm test` (13/13 passing) + browser verification (recorded in
  `quickstart.md`), pass 2 found no gaps against FR-001…FR-008, SC-001…SC-004 and constitution I–V:
  **Converged.**

## Other notes
- `package.json` first used `node --test tests/`; on Node 24 this fails (the directory is treated as a module).
  Bare `node --test` auto-discovers `tests/*.test.js`. Fixed in its own commit.
- Tests: 13 total, plain `node --test`, no dependencies (constitution II & III).

## What I learned
Spec-driven development felt like overhead for the first stages of such a tiny page: writing a
constitution, checklist and five design documents took longer than the ~100 lines of code. It paid off
at the review gates: the plan's "favorites by array index" shortcut was a hidden bug that contradicted
the spec's own "stable identity" wording, and the converge step caught it plus the repeat-quote problem
by comparing code against the artifacts rather than by luck. Fixing the spec first and re-deriving the
tasks made the change small and traceable, and tests written from the FR numbers made "converged"
something I could measure instead of assert.
