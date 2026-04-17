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

The repository must maintain `AGENTS.md` as the single root guidance file. The HTML documentation must live under `docs/`, use a consistent navigation shell with shared header and footer partials, and include one page for each skill currently present in the repository. The DS specifications must live under `docs/specs/` using the `DS0xx-description.md` convention, with `DS000-vision.md`, `DS001-coding-style.md`, and one DS file per skill.

The DS set must carry frontmatter metadata that includes at least `id`, `title`, `status`, `owner`, and `summary`. `docs/specs/matrix.md` must be generated from that metadata by `skills/gamp_specs/scripts/generate_specs_matrix.mjs` rather than edited manually. The matrix is therefore a generated status view over the DS set, not a freeform narrative specification. It is intentionally exempt from the normal `Introduction`, `Core Content`, and `Conclusion` section rule that applies to ordinary DS files.

`docs/specs/decisions.md` must exist and must capture architectural interpretations, naming choices, DS renumbering decisions, and high-risk changes. `docs/specsLoader.html` must be copied from `skills/gamp_specs/assets/specsLoader.html`. Documentation work must also run `skills/gamp_specs/scripts/verify_docs_links.mjs` so the HTML surface and its local links remain valid.

The root project template must include `fileSizesCheck.sh`, and `gamp_specs` must carry the same file under `skills/gamp_specs/assets/fileSizesCheck.sh` so new projects can install it as part of initialization. This repository itself must keep repository-wide example code inside the relevant skill folders instead of introducing a shared root `src/` tree that copied skills would not carry with them.

## Conclusion

Future structural changes must keep the repository documentation surface aligned with this bootstrap contract. New skill families, new documentation rules, and new DS-generation rules must be added to `gamp_specs` as part of the same revision.
