---
id: DS006
title: O-Skill Build
status: implemented
owner: repository
summary: Defines declarative orchestrators that coordinate bounded sets of skills and Ploinky agents.
---

# O-Skill Build

## Introduction

This specification defines the repository contract for the `oskill-build` skill.

## Core Content

The descriptor separates optional preparation from main instructions, declares preparation and execution allowlists, optionally exposes Allowed Agents, and selects loop or soplang session behavior according to workflow branching needs.

The repository must retain the artifacts documented on the corresponding HTML skill page and must keep descriptor text, catalog metadata, examples, references, scripts, and outputs synchronized. The orchestrator’s reachable capabilities are explicit, preparation remains separate from execution, and domain work is delegated to allowed skills or agents.

Declared dependencies are `gamp-specs`, `achilles-specs`. A consuming project must resolve declared dependencies explicitly and must not infer undeclared runtime coupling.

## Decisions & Questions

### Question #1: What defines the maintenance boundary for this skill?

Response: The complete `oskill-build` directory is the portable unit, and its descriptor is the operational entry point. Supporting artifacts remain local so their relationship to the contract is inspectable.

## Conclusion

Changes to `oskill-build` must preserve its declared boundary and update this specification and its HTML documentation together.
