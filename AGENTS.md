# AGENTS.md

## Scope

This repository distributes the AchillesCopilotBasicSkills portable skill catalog. The canonical documentation entry points are `docs/index.html` and `docs/specsLoader.html?spec=matrix.md`. The DS files under `docs/specs/` are the source of truth.

## Mandatory Reading Order

1. Read `README.md` for the repository purpose and catalog usage.
2. Read `docs/index.html` for the catalog architecture and documentation map.
3. Read `docs/specsLoader.html?spec=DS001-coding-style.md` for coding style, source layout, and test organization.
4. Read `docs/specsLoader.html?spec=matrix.md` and the relevant per-skill DS file.
5. Read the complete target skill folder before editing it.

## Current Skill Catalog

- `achilles-skill-builder`
- `antropic-skill-build`
- `cskill-build`
- `dgskill-build`
- `oskill-build`

## Repository Rules

- Keep all persistent documentation, specifications, descriptors, and code comments in English.
- Treat `docs/specs/*.md` as authoritative when explanatory prose diverges.
- Update HTML documentation and the affected specifications whenever source behavior, interfaces, structure, dependencies, or constraints change.
- Keep every skill self-contained and preserve its local references, examples, scripts, templates, and assets.
- Keep imported-skill documentation inside copied skill folders in downstream projects; the host project’s `docs/` tree must describe the host project.
- Keep `AGENTS.md`, `README.md`, `docs/index.html`, per-skill pages, and `docs/specs/matrix.md` synchronized with the current skill folders.
- Update this catalog whenever a skill folder is added, removed, or renamed.
- Keep DS numbering contiguous and use numbered question subchapters inside `Decisions & Questions`.
- Update the GAMP skill when new skill families, coding-style rules, or project bootstrap rules are introduced.

## Runtime Defaults

- Default executable language: Node.js using ECMAScript modules and async/await.
- Default dependency policy: no external dependencies without explicit user approval.
- Skill output should remain plain text unless the owning descriptor defines a serialized text format.

## Key Paths

- Skill catalog: `skills/`
- HTML documentation: `docs/`
- Specifications: `docs/specs/`
- Specification loader: `docs/specsLoader.html`
- Coding-style authority: `docs/specs/DS001-coding-style.md`
