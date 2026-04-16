---
id: DS001
title: Coding Style
status: implemented
owner: gamp_specs
summary: Defines repository-wide coding style, file layout, modular test organization, and size constraints including periodic fileSizesCheck usage.
---

# DS001 Coding Style

## Introduction

This specification defines the repository-wide implementation and documentation policy. It is the coding-style authority referenced by `AGENT.md`, `AGENTS.md`, and the skill descriptors, and it covers source-code defaults, dependency policy, file layout, test organization, readability constraints, and the Achilles-specific runtime conventions that apply to all work in this repository.

## Core Content

The repository must default to Node.js with `.mjs` source files and async/await. External dependencies must not be introduced without explicit user approval. Persistent output saved to disk must remain in English even when the interactive conversation uses another language.

This repository is not a production runtime package. It exists to hold portable skill folders plus the tests and documentation that validate them. Example code must therefore live inside the relevant skill folder, typically under `examples/`, rather than in a shared repository-level `src/` tree. Tests must be grouped by skill as `tests/<skill-name>/`, and each test file should cover one coherent module boundary or one coherent verification responsibility rather than becoming a monolith.

The repository must keep source files small enough to review comfortably on a modern screen. The baseline guardrail is provided by `fileSizesCheck.sh`, which must exist at the repository root and must also be available as `skills/gamp_specs/assets/fileSizesCheck.sh` so new projects initialized from this skill can copy it into place. The current script treats files above 500 lines as warning-level oversized files and files above 800 lines as critical oversized files, while also reporting long lines above 300 characters. As a repository convention, contributors should aim to keep executable source files well below the 700 to 800 line danger zone and should keep line lengths close to normal screen width, with 120 characters acting as the practical readability threshold and 300 characters as the hard long-line warning surfaced by the checker.

The script must be run periodically during maintenance and after larger documentation or source refactors. The output should be used as a refactoring signal rather than ignored as noise. When a file becomes too large, responsibilities should be split into smaller modules instead of normalizing oversized files as acceptable.

AchillesAgentLib is authorized for this repository. The portable example resolver lives in `skills/achilles_specs/examples/depsLoader.mjs` and must attempt parent-directory resolution first and fall back to `node_modules`. Runtime configuration examples live alongside it in the same skill folder and must support manual overrides in addition to environment-based defaults. All LLM interactions must use the `LLMAgent` class through shared runtime configuration.

Documentation must remain synchronized across `AGENT.md`, `AGENTS.md`, `README.md`, `docs/`, and `docs/specs/`. DS files must use the `DS0xx-description.md` naming convention, include frontmatter metadata for status tracking, and remain contiguous with no skipped intermediate numbers.

## Conclusion

Future code changes must preserve these defaults unless a new authoritative decision is recorded in `docs/specs/decisions.md`. Deviations from the runtime, size, readability, or documentation policy require synchronized DS and agent-guidance updates.
