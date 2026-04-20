---
id: DS007
title: DGSkill Build
status: implemented
owner: dgskill_build
summary: Defines dynamic code generation skills that can stay textual or emit guarded procedural code under explicit sandbox and normalization rules.
---

# DS007 DGSkill Build

## Introduction

This specification defines the repository conventions for dynamic code generation skills. It exists for situations where requirements are transient, ambiguous, or exploratory enough that a heavier specification-driven skill would be disproportionate.

## Core Content

A DGSkill descriptor must define when the runtime may answer directly, when it may emit guarded JavaScript, and how the output is normalized afterward. Guarded execution policy, prompt guidance, and scope control are mandatory contract elements rather than optional commentary. The repository therefore treats agility and bounded execution as complementary requirements.

The repository must keep DGSkill guidance self-contained and aligned with the broader bootstrap rules, but it must not force these skills into the same specification depth expected of C-Skills. It must also preserve readability and modularity expectations from `DS001-coding-style.md`, especially when temporary code-generation pathways are being described. When downstream projects copy this guidance, the DGSkill contract stays with the skill folder; host-project `docs/` content should describe the project's own dynamic behaviors rather than reproducing the imported DGSkill family rules.

## Decisions & Questions

### Question #1: Why does DGSkill guidance prioritize explicit sandbox and normalization rules even for transient work?

Response: Dynamic generation trades durability for adaptability, which raises the risk of accidental scope expansion. Explicit sandbox and normalization rules restore auditability by bounding what transient code may do and how its output becomes part of the system. Without those rules, the family would become fast to use but unreliable to trust.

## Conclusion

Future DGSkill work must preserve explicit execution guardrails and output-mode clarity. If the guarded runtime contract changes, this specification must change with it.
