---
id: DS008
title: O-Skill Build
status: implemented
owner: oskill_build
summary: Defines declarative orchestration-skill descriptors with explicit preparation, instructions, allowed skills, and session-type boundaries.
---

# DS008 O-Skill Build

## Introduction

This specification defines the repository conventions for orchestration skills. It exists because planner-style skills require explicit control over downstream capabilities and session structure.

## Core Content

An O-Skill descriptor must expose a mandatory skill name heading, a description, instructions, and allowed skills. Preparation, allowed preparation skills, and session type may be added when needed. The purpose of this structure is to make the orchestration layer declarative and auditable. The allowed-skills list acts as the planner's declared toolbelt, while preparation isolates context-loading work from the main execution loop.

The repository must preserve this explicit structure so orchestration behavior remains reviewable rather than dissolving into generic prompt text. The descriptor shape is part of the contract, and its maintenance should follow the same modularity and documentation discipline described in `DS001-coding-style.md`.

## Conclusion

Future orchestration work must preserve declarative control and bounded downstream capability access. Any change to session semantics or descriptor shape must update the skill guidance and this specification together.
