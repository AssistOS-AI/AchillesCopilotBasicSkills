# AchillesCopilotBasicSkills

This repository is the standardized, reusable baseline skill catalog for the team and for downstream projects that use Achilles, our libraries, and our technologies. It combines repository bootstrap guidance, runtime conventions, skill-family construction rules, and self-contained workflow skills with tests and documentation that are expected to evolve together.

## Repository Structure

- `skills/` contains the canonical skill folders. Each folder is expected to include `SKILL.md`, `DS.md`, `skill.json`, and any local example code or assets required to keep the skill portable.
- This repository intentionally does not expose a production root `src/` tree. Example code lives under the relevant skill folder so the whole skill can be copied into another project's `skills/` directory.
- `tests/` is organized by skill as `tests/<skill-name>/` so the validation surface remains modular and easy to inspect. These tests validate example code and repository scripts; they are not production deployment artifacts.
- `data/` is reserved for runtime-mounted persistent data.
- `docs/` contains the technical HTML documentation and the DS specification set for this skill-catalog repository itself.
- Downstream projects that copy these skills should document their own codebase under `docs/`. They should not add DS files or HTML pages there whose subject is the imported skills themselves; skill-specific agent guidance stays inside the copied `skills/<skill-name>/` folders.

## Current Skills

- `gamp_specs`
- `achilles_specs`
- `article_build`
- `cskill_build`
- `dgskill_build`
- `oskill_build`
- `antropic_skill_build`
- `review_specs`

## Documentation Authority

- Repository overview: `docs/index.html`
- Coding style and repository structure: `docs/specsLoader.html?spec=DS001-coding-style.md`
- LLM routing and model tiers: `docs/specsLoader.html?spec=DS002-llm-model-strategy.md`
- Full specification matrix: `docs/specsLoader.html?spec=matrix.md`
- Agent guidance: `AGENTS.md`

## Maintenance Rule

Whenever a new skill is added or renamed, update the skill catalog, `AGENTS.md`, the HTML documentation, and the DS matrix in the same change set. DS numbering must remain contiguous and gap-free. Ordinary DS files must use `Introduction`, `Core Content`, `Decisions & Questions`, and `Conclusion`, and the `Decisions & Questions` section must use numbered Markdown subchapters such as `### Question #1: ...`.
