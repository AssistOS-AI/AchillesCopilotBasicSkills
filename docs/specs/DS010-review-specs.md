---
id: DS010
title: Review Specs
status: implemented
owner: review_specs
summary: Defines a step-by-step review workflow for reconciling affected DS files with new context, instructions, and observed issues.
---

# DS010 Review Specs

## Introduction

This specification defines the repository workflow for reviewing and strengthening DS files when new context, instructions, or observed problems arrive. It exists because specification maintenance requires a repeatable review method, not ad hoc textual patching.

## Core Content

The review process must start by identifying the affected DS files, the relevant code or skill folders, the applicable repository guidance, and any known contradictions. Each affected DS must then be reviewed step by step against the current implementation, the user's instructions, and the surrounding specification set. `Core Content` must state the general approach, contract boundaries, invariants, and important special cases. It is the contract backbone and must not be diluted into a long rationale dump.

`Decisions & Questions` must hold the detailed rationale, tradeoffs, design interpretations, and unresolved alternatives. This section may be arbitrarily long when that improves clarity. It must use numbered Markdown subchapters such as `### Question #1: ...`, with `Response:` for settled reasoning and `Options:` for unresolved alternatives. If a clarification materially changes the contract, the DS must update `Core Content` as well as `Decisions & Questions`. Multi-option questions must remain unimplemented in code until one path is selected.

When review work changes the contract surface, every affected synchronized artifact must be updated in the same revision. This includes `AGENTS.md`, `README.md`, `docs/index.html`, per-skill HTML pages, local skill summaries, and tests where relevant. The review workflow must also preserve the repository-wide boundary that downstream consumer projects do not document imported skills under the host project's `docs/` tree.

## Decisions & Questions

### Question #1: Why does this review workflow keep `Core Content` concise while allowing `Decisions & Questions` to grow without a fixed size limit?

Response: The contract backbone needs to remain fast to audit and stable over time, so it should carry only the general approach, boundaries, invariants, and important special cases. Detailed reasoning changes more often and may expand as the repository learns more. Keeping that detail in numbered `Decisions & Questions` entries preserves traceability without turning the main contract section into an unreadable blend of requirements and commentary.

## Conclusion

Future specification reviews must preserve the distinction between contract backbone and detailed rationale. If the review workflow changes, this specification, the skill descriptor, and the synchronized repository guidance must change together.
