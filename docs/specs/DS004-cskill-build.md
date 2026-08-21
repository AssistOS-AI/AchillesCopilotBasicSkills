---
id: DS004
title: C-Skill Build
status: implemented
owner: repository
summary: Defines specification-driven, code-backed skills with stable descriptors and generated JavaScript implementations.
---

# C-Skill Build

## Introduction

This specification defines the repository contract for the `cskill-build` skill.

## Core Content

The contract keeps routing, input, output, and hard constraints in cskill.md, places deeper module requirements in specs/, and treats src/index.mjs or src/index.js as the executable action(args) entrypoint.

The repository must retain the artifacts documented on the corresponding HTML skill page and must keep descriptor text, catalog metadata, examples, references, scripts, and outputs synchronized. Descriptors and module specifications remain authoritative when executable code is generated or regenerated.

Declared dependencies are `gamp-specs`, `achilles-specs`. A consuming project must resolve declared dependencies explicitly and must not infer undeclared runtime coupling.

## Decisions & Questions

### Question #1: What defines the maintenance boundary for this skill?

Response: The complete `cskill-build` directory is the portable unit, and its descriptor is the operational entry point. Supporting artifacts remain local so their relationship to the contract is inspectable.

## Conclusion

Changes to `cskill-build` must preserve its declared boundary and update this specification and its HTML documentation together.
