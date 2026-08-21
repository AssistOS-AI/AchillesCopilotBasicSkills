# AchillesCopilotBasicSkills

AchillesCopilotBasicSkills is the baseline catalog for authoring skills that AchillesAgentLib can discover, register, prepare, and execute. It defines the recognized descriptor families, their file layouts, runtime boundaries, and portability requirements.

## Using the catalog

Choose the skill whose description matches the task, read its complete `SKILL.md`, and copy the full `skills/<skill-name>/` directory into the consuming environment. Preserve all local references, examples, scripts, assets, and metadata because they are part of the portable contract.

## Skills

| Skill | Responsibility |
| --- | --- |
| [`achilles-skill-builder`](docs/achilles-skill-builder.html) | Defines the descriptor, layout, discovery, and execution contracts for every AchillesAgentLib skill family. |
| [`antropic-skill-build`](docs/antropic-skill-build.html) | Defines the self-contained portability baseline for Anthropic-style SKILL.md bundles. |
| [`cskill-build`](docs/cskill-build.html) | Defines specification-driven, code-backed skills with stable descriptors and generated JavaScript implementations. |
| [`dgskill-build`](docs/dgskill-build.html) | Defines adaptive request-local skills that answer directly or generate temporary guarded JavaScript. |
| [`oskill-build`](docs/oskill-build.html) | Defines declarative orchestrators that coordinate bounded sets of skills and Ploinky agents. |

## Repository layout

- `skills/` contains the distributed skill folders.
- `docs/index.html` is the technical documentation entry point.
- `docs/specs/` contains the authoritative design specifications.
- `docs/specsLoader.html?spec=matrix.md` opens the generated specification matrix.
- `AGENTS.md` defines the mandatory reading order for repository work.
- `fileSizesCheck.sh` checks source-file size and line-length limits.

## Maintenance

When a skill changes, update its descriptor and local artifacts together with the corresponding HTML page and DS specification. Keep DS numbering contiguous, regenerate `docs/specs/matrix.md`, and verify documentation links before publishing.
