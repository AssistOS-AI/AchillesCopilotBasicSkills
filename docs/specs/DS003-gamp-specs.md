---
id: DS003
title: GAMP Specs
status: implemented
owner: gamp_specs
summary: Defines the bootstrap contract for documentation layout, DS generation, matrix generation, link verification, and synchronized agent guidance.
---

# DS003 GAMP Specs

## Introduction

This specification defines the repository bootstrap contract implemented by `gamp_specs`. It covers the documentation surface, DS structure, matrix generation, agent guidance, coding-style anchoring, and synchronization obligations that keep the repository internally consistent and reusable.

## Core Content

The repository must maintain `AGENTS.md` as the single root guidance file. In a skill-catalog repository such as this one, the HTML documentation must live under `docs/`, use a consistent navigation shell with shared header and footer partials, and include one page for each skill currently present in the repository. The DS specifications must live under `docs/specs/` using the `DS0xx-description.md` convention, with `DS000-vision.md`, `DS001-coding-style.md`, and one DS file per skill. In a downstream project that only consumes imported skills from this catalog, the host project's `docs/` and `docs/specs/` trees must document the host project rather than the imported skills. Imported-skill guidance must stay inside the local `skills/` folders there.

The DS set must carry frontmatter metadata that includes at least `id`, `title`, `status`, `owner`, and `summary`. Ordinary DS files must use `Introduction`, `Core Content`, `Decisions & Questions`, and `Conclusion`. The `Decisions & Questions` section must use numbered question subchapters such as `### Question #1: ...`, with `Response:` or `Options:` inside each subchapter. `docs/specs/matrix.md` must be generated from that metadata by `skills/gamp_specs/scripts/generate_specs_matrix.mjs` rather than edited manually. The matrix is therefore a generated status view over the DS set, not a freeform narrative specification. It is intentionally exempt from the normal four-section rule that applies to ordinary DS files.

`docs/specsLoader.html` must be copied from `skills/gamp_specs/assets/specsLoader.html`. Documentation work must also run `skills/gamp_specs/scripts/verify_docs_links.mjs` so the HTML surface and its local links remain valid. Architectural interpretations, naming choices, and unresolved issues must be recorded directly in the affected DS files under numbered `Decisions & Questions` entries rather than in a separate decision-log file.

The root project template must include `fileSizesCheck.sh`, and `gamp_specs` must carry the same file under `skills/gamp_specs/assets/fileSizesCheck.sh` so new projects can install it as part of initialization. This repository itself must keep repository-wide example code inside the relevant skill folders instead of introducing a shared root `src/` tree that copied skills would not carry with them.

## Decisions & Questions

### Question #1: Why does the bootstrap contract separate skill-catalog documentation from downstream-project documentation?

Response: The catalog repository owns the reusable skill contract, so it needs central skill pages and per-skill DS files. A downstream project has a different responsibility: it must explain the host project's own architecture and behavior. If consumer repositories duplicate the skill catalog under their own `docs/` trees, those copies drift independently and make it harder to tell whether a rule belongs to the host project or to the imported agent tooling.

## Conclusion

Future structural changes must keep the repository documentation surface aligned with this bootstrap contract. New skill families, new documentation rules, and new DS-generation rules must be added to `gamp_specs` as part of the same revision.
