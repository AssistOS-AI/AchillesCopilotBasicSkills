---
id: DS002
title: Achilles Skill Builder
status: implemented
owner: repository
summary: Defines the descriptor, layout, discovery, and execution contracts for every AchillesAgentLib skill family.
---

# Achilles Skill Builder

## Introduction

This specification defines the repository contract for the `achilles-skill-builder` skill.

## Core Content

The skill selects among cskill, oskill, dcgskill, tskill, Anthropic-style SKILL.md bundles, and dynamic Ploinky agent skills. It specifies recognized sections, entrypoints, allowlists, session types, generated-artifact boundaries, and the plain-text result contract used by the runtime.

The repository must retain the artifacts documented on the corresponding HTML skill page and must keep descriptor text, catalog metadata, examples, references, scripts, and outputs synchronized. The descriptor filename determines the family, AgentLib-native descriptors use only recognized sections, and dynamic Ploinky agent skills are exposed only through oskill Allowed Agents.

Declared dependencies are not required by the catalog metadata. A consuming project must resolve declared dependencies explicitly and must not infer undeclared runtime coupling.

## Decisions & Questions

### Question #1: What defines the maintenance boundary for this skill?

Response: The complete `achilles-skill-builder` directory is the portable unit, and its descriptor is the operational entry point. Supporting artifacts remain local so their relationship to the contract is inspectable.

## Conclusion

Changes to `achilles-skill-builder` must preserve its declared boundary and update this specification and its HTML documentation together.
