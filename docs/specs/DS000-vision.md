---
id: DS000
title: Vision
status: implemented
owner: repository
summary: Defines the repository mission as a baseline catalog of self-contained Anthropic-style skills for Achilles-oriented projects.
---

# DS000 Vision

## Introduction

This repository exists to provide a standardized, reusable baseline of self-contained skills for the team and for downstream projects that use Achilles, our libraries, and our technologies. Its purpose is to bootstrap project structure, runtime conventions, skill-family authoring guidance, and repository review practices without coupling each skill to the host project's internal source tree.

## Core Content

The repository must preserve a layered skill model. `gamp_specs` defines repository bootstrap and documentation rules. `achilles_specs` defines AchillesAgentLib and runtime-configuration conventions. The remaining skills define reusable families or executable workflows. The repository must expose those layers consistently through `README.md`, `AGENTS.md`, `docs/index.html`, and the DS matrix.

![Repository skill map](../assets/skill-map.svg)

The repository must remain ready to host more skill families over time. When that happens, the new skills must be visible in the skill catalog and must be reflected in the bootstrap documentation rules rather than being introduced as undocumented exceptions. The repository must therefore preserve explicit catalog maintenance, explicit DS maintenance, and explicit per-skill documentation rather than treating these as secondary chores.

## Conclusion

Future work must preserve the repository as a coherent baseline rather than a loose collection of unrelated prompts. The documented skill catalog and the actual `skills/` directory must remain synchronized.
