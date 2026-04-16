# Decision Log

## Introduction

This file records architectural interpretations and naming choices that affect how the repository evolves. It exists so future changes can distinguish intentional policy from accidental drift.

## Core Content

### 2026-04 Baseline bootstrap

1. The former `skills/gamp-structure/` material was merged into `skills/gamp_specs/` so the repository keeps the prior scripts, references, and specs-loader asset while aligning the skill name with the canonical skill catalog.
2. The repository keeps both `AGENT.md` and `AGENTS.md` because the user explicitly requested `AGENT.md` while the inherited bootstrap material already referenced `AGENTS.md`. The two files are therefore treated as synchronized compatibility twins.
3. Canonical repository skill identifiers use underscore-based folder names such as `gamp_specs` and `article_build`, while legacy names are preserved as aliases inside `skill.json` metadata when needed.
4. Documentation synchronization is enforced at the repository level: adding a skill now requires updates to the agent guidance, README, HTML pages, and DS matrix in the same revision.

### 2026-04 Generated specs and portable examples

1. `docs/specs/matrix.md` is now generated from DS frontmatter metadata rather than maintained as freeform prose. This avoids matrix drift and turns the matrix into a status view over the DS set.
2. The repository no longer uses a shared root `src/` tree for example code. Portable example implementations now live inside the relevant skill folders, especially `skills/gamp_specs/examples/` and `skills/achilles_specs/examples/`, because downstream projects are expected to copy skill folders directly.
3. Repository tests validate portable examples and documentation tooling only. They are intentionally repository-local verification artifacts and are not meant to be deployed together with copied skills.

## Conclusion

Any future interpretation that changes repository structure, naming, or synchronization policy must be recorded here before the new convention is treated as stable.
