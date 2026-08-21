---
id: DS005
title: DGSkill Build
status: implemented
owner: repository
summary: Defines adaptive request-local skills that answer directly or generate temporary guarded JavaScript.
---

# DGSkill Build

## Introduction

This specification defines the repository contract for the `dgskill-build` skill.

## Core Content

The skill requires an explicit decision between textual and procedural output, a bounded prompt, sandbox policy, and normalized results. It is intended for exploratory or one-off work that does not justify a stable generated module.

The repository must retain the artifacts documented on the corresponding HTML skill page and must keep descriptor text, catalog metadata, examples, references, scripts, and outputs synchronized. Generated code is transient, scope remains request-local, and sandbox and normalization rules are explicit.

Declared dependencies are `gamp-specs`, `achilles-specs`. A consuming project must resolve declared dependencies explicitly and must not infer undeclared runtime coupling.

## Decisions & Questions

### Question #1: What defines the maintenance boundary for this skill?

Response: The complete `dgskill-build` directory is the portable unit, and its descriptor is the operational entry point. Supporting artifacts remain local so their relationship to the contract is inspectable.

## Conclusion

Changes to `dgskill-build` must preserve its declared boundary and update this specification and its HTML documentation together.
