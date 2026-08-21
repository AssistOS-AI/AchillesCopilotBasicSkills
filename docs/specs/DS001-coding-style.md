---
id: DS001
title: Coding Style
status: implemented
owner: repository
summary: Defines source layout, documentation synchronization, and validation rules for AchillesCopilotBasicSkills.
---

# Coding Style

## Introduction

This specification is the coding-style, source-layout, and test-organization authority for AchillesCopilotBasicSkills.

## Core Content

Persistent documentation, specifications, descriptors, and code comments must be written in English. JavaScript modules should use modern ECMAScript modules, async/await for asynchronous control flow, explicit exports, and focused functions with narrow responsibilities. External dependencies must not be introduced without explicit approval.

Skill-specific implementation, references, examples, tests, templates, and assets must remain inside the owning skill folder unless a repository-wide validation concern genuinely applies to every skill. A root production `src/` tree must not become a hidden dependency for portable skills. Repository-level tests, when present, should be grouped by the skill or shared contract they validate and must use deterministic fixtures rather than machine-specific paths or secrets.

Files should remain focused and reviewable. Run `./fileSizesCheck.sh` after substantial changes and split files when size or line length obscures responsibilities. Documentation changes must regenerate `docs/specs/matrix.md`, verify local HTML and asset links, and test browser-resolved resources over HTTP when partials or relative assets are involved.

## Decisions & Questions

### Question #1: Where do portable examples belong?

Response: Examples belong inside the relevant skill folder so the complete operational contract survives when that folder is copied into another repository.

## Conclusion

Repository changes must preserve modular skill folders, explicit contracts, deterministic validation, and synchronized documentation.
