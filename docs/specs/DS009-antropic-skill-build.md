---
id: DS009
title: Antropic Skill Build
status: implemented
owner: antropic_skill_build
summary: Defines the portability baseline that keeps Anthropic-style skills self-contained and locally documented.
---

# DS009 Antropic Skill Build

## Introduction

This specification defines the portability baseline for standardized Anthropic-style skills in this repository. It exists so that each skill remains independently movable and understandable.

## Core Content

Each Anthropic-style skill must remain fully self-contained inside its own folder. Descriptors, references, templates, helper modules, and local assets must live within the skill directory. Repository-level conventions from `gamp_specs` and `achilles_specs` govern authoring and documentation, but the runtime behavior of a skill must not depend on importing arbitrary modules from the host project's `src/` tree.

The repository must also keep the skill catalog synchronized when new Anthropic-style skills are added. The addition of a new skill therefore requires synchronized updates to agent guidance, HTML documentation, the DS matrix, and any affected bootstrap rules. Per-skill documentation must preserve local artifact detail rather than flattening the skill into a shallow description.

## Conclusion

Future skill additions must preserve portability as a hard rule. Deviations from self-containment require an explicit decision entry and synchronized documentation updates.
