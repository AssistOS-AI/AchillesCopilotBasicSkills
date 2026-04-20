# AGENTS.md

## Scope

This repository is the standardized, reusable catalog of self-contained skills for the team and for downstream projects that use Achilles, our libraries, and our technologies. The canonical documentation entry points are `docs/index.html` and `docs/specsLoader.html?spec=matrix.md`, while the DS specifications under `docs/specs/` are the authoritative contract layer for repository structure, coding style, test organization, runtime defaults, and skill-catalog maintenance.

## Mandatory Reading Order

1. Read `README.md` for the repository overview.
2. Read `docs/index.html` for the documentation map and the current skill catalog.
3. Read `docs/specsLoader.html?spec=DS001-coding-style.md` for coding style, module structure, and test-organization rules.
4. Read `docs/specsLoader.html?spec=DS002-llm-model-strategy.md` when touching Achilles runtime configuration or LLM routing behavior.
5. Read `docs/specsLoader.html?spec=matrix.md` and the relevant per-skill DS files before changing structure, conventions, or skill descriptors.
6. Read the target skill folder before editing any skill-specific files.

## Current Skill Catalog

- `gamp_specs`
- `achilles_specs`
- `article_build`
- `cskill_build`
- `dgskill_build`
- `oskill_build`
- `antropic_skill_build`
- `review_specs`

## Repository Rules

- Keep all persistent documentation, specifications, descriptors, and code comments in English.
- Use `AGENTS.md` as the single repository guidance file and do not reintroduce `AGENT.md` aliases or duplicate copies.
- Treat `docs/specs/DS001-coding-style.md` as the coding-style authority.
- Treat `docs/specs/*.md` as the authoritative documentation layer when prose diverges.
- Keep the skill folders self-contained and preserve their local artifacts during restructures.
- Do not treat this repository as a deployable production runtime. Example code that documents skill behavior must live inside the relevant skill folder, not in a shared repository-level `src/` tree.
- In downstream projects that consume these skills, do not add DS files or `/docs` pages whose subject is the imported skills themselves. The host project's `docs/` tree must document the host project, while skill-specific agent guidance stays inside the local `skills/` folders.
- Treat `tests/` as repository validation only. The tests verify example code and scripts carried by the skills, but they are not deployment artifacts for downstream projects that copy those skills.
- Keep `AGENTS.md`, `README.md`, `docs/`, and `docs/specs/` synchronized when repository rules or the skill catalog change.
- When a new skill is added under `skills/`, update `AGENTS.md`, `README.md`, `docs/index.html`, the per-skill HTML page set, `docs/specs/matrix.md`, and the relevant DS files in the same change set.
- When a new skill family, bootstrap rule, coding-style rule, or DS-generation rule is introduced, update `skills/gamp_specs/` in the same change set.
- Keep DS numbering contiguous with no missing intermediate files. The sequence currently runs from `DS000` through `DS010`, and future additions must extend the sequence without leaving gaps.
- Ordinary DS files must include `Introduction`, `Core Content`, `Decisions & Questions`, and `Conclusion`. In `Decisions & Questions`, use numbered Markdown subchapters such as `### Question #1: ...`, and place the `Response` or `Options` inside that subchapter.

## Runtime Defaults

- Default runtime language: Node.js with `.mjs` modules and async/await.
- Default dependency policy: no external dependencies without explicit user approval.
- AchillesAgentLib is authorized and the example resolver lives in `skills/achilles_specs/examples/depsLoader.mjs`.
- All LLM interactions must use `LLMAgent` through runtime configuration.

## Key Paths

- Skill catalog root: `skills/`
- Skill-local example code: `skills/<skill-name>/examples/`
- Tests grouped by skill: `tests/<skill-name>/`
- Persistent runtime data: `data/`
- HTML docs: `docs/`
- Specs: `docs/specs/`
