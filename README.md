# AchillesCopilotBasicSkills

This repository is the baseline skill catalog for Achilles-oriented projects that use self-contained Anthropic-style skills. It combines repository bootstrap guidance, Achilles runtime conventions, skill-family construction rules, and a self-contained article build skill with tests and documentation that are expected to evolve together.

## Repository Structure

- `skills/` contains the canonical skill folders. Each folder is expected to include `SKILL.md`, `DS.md`, `skill.json`, and any local example code or assets required to keep the skill portable.
- This repository intentionally does not expose a production root `src/` tree. Example code lives under the relevant skill folder so the whole skill can be copied into another project's `skills/` directory.
- `tests/` is organized by skill as `tests/<skill-name>/` so the validation surface remains modular and easy to inspect. These tests validate example code and repository scripts; they are not production deployment artifacts.
- `data/` is reserved for runtime-mounted persistent data.
- `docs/` contains the technical HTML documentation and the DS specification set.

## Current Skills

- `gamp_specs`
- `achilles_specs`
- `article_build`
- `cskill_build`
- `dgskill_build`
- `oskill_build`
- `antropic_skill_build`

## Documentation Authority

- Repository overview: `docs/index.html`
- Coding style and repository structure: `docs/specsLoader.html?spec=DS001-coding-style.md`
- LLM routing and model tiers: `docs/specsLoader.html?spec=DS002-llm-model-strategy.md`
- Full specification matrix: `docs/specsLoader.html?spec=matrix.md`
- Decision log: `docs/specs/decisions.md`
- Agent guidance: `AGENT.md` and `AGENTS.md`

## Maintenance Rule

Whenever a new skill is added or renamed, update the skill catalog, the agent guidance, the HTML documentation, and the DS matrix in the same change set. DS numbering must remain contiguous and gap-free.
