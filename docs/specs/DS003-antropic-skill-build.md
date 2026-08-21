---
id: DS003
title: Antropic Skill Build
status: implemented
owner: repository
summary: Defines the self-contained portability baseline for Anthropic-style SKILL.md bundles.
---

# Antropic Skill Build

## Introduction

This specification defines the repository contract for the `antropic-skill-build` skill.

## Core Content

The skill keeps instructions, references, templates, assets, and helper modules inside one portable skill folder and treats repository-wide conventions as authoring guidance rather than runtime imports.

The repository must retain the artifacts documented on the corresponding HTML skill page and must keep descriptor text, catalog metadata, examples, references, scripts, and outputs synchronized. A copied skill must retain everything it needs except capabilities supplied by the agent runtime itself.

Declared dependencies are `gamp-specs`, `achilles-specs`. A consuming project must resolve declared dependencies explicitly and must not infer undeclared runtime coupling.

## Decisions & Questions

### Question #1: What defines the maintenance boundary for this skill?

Response: The complete `antropic-skill-build` directory is the portable unit, and its descriptor is the operational entry point. Supporting artifacts remain local so their relationship to the contract is inspectable.

## Conclusion

Changes to `antropic-skill-build` must preserve its declared boundary and update this specification and its HTML documentation together.
