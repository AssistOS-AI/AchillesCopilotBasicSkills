---
id: DS000
title: AchillesCopilotBasicSkills Vision
status: implemented
owner: repository
summary: Portable construction rules for AchillesAgentLib skill families and self-contained Anthropic-style skills.
---

# AchillesCopilotBasicSkills Vision

## Introduction

AchillesCopilotBasicSkills is a portable skill catalog. It gives consuming agents and projects explicit operational guidance without requiring repository-level runtime coupling.

## Core Content

The repository must keep every distributed skill self-contained inside `skills/<skill-name>/`. A copied folder must preserve its descriptor, references, examples, scripts, assets, and catalog metadata when those artifacts exist. Root documentation must describe the catalog itself, while downstream projects that import a skill must keep their own documentation focused on the host system.

The design specifications under `docs/specs/` are the source of truth for catalog structure and durable behavior. HTML documentation must remain synchronized with those contracts and with the actual skill folders.

## Decisions & Questions

### Question #1: Why is the skill folder the portability boundary?

Response: The folder keeps operational instructions and supporting artifacts together, allowing a consumer to copy one bounded unit without hidden imports from this repository.

## Conclusion

AchillesCopilotBasicSkills must remain a coherent, implementation-backed catalog whose skill folders can be understood and moved independently.
