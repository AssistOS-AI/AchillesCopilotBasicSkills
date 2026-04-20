---
id: DS006
title: C-Skill Build
status: implemented
owner: cskill_build
summary: Defines specification-driven skill construction where a stable descriptor and module-level specs drive generated executable JavaScript.
---

# DS006 C-Skill Build

## Introduction

This specification defines the repository conventions for C-Skills. It exists to keep specification-driven executable skills aligned with the broader repository bootstrap and Achilles runtime rules.

## Core Content

A C-Skill must expose a stable descriptor, typically `cskill.md`, and a deeper specification set under `specs/`. The descriptor must define routing, input format, output format, and hard constraints. The specification files must describe deeper module responsibilities and serve as the basis for generated executable JavaScript. The generated code is an implementation artifact rather than the primary contract surface.

The repository must preserve this distinction because it enables repeatable regeneration, auditability, and maintenance without embedding the whole design into ad hoc generated code. C-Skills must also inherit the modularity and file-size expectations described in `DS001-coding-style.md`, so that specification-driven generation does not become an excuse for oversized or weakly structured modules. The deeper C-Skill specification material belongs inside the skill folder rather than in a downstream project's central `docs/` tree. Consumer projects may document how they use a generated capability, but they must not duplicate the imported `cskill_build` family guidance as host-project DS files.

## Decisions & Questions

### Question #1: Why does a C-Skill keep a small stable descriptor and a deeper specification set instead of collapsing everything into generated code?

Response: The descriptor provides a durable contract surface for routing and usage, while the deeper specification set preserves rationale and module boundaries that generated code alone would hide. This separation supports regeneration, review, and change control. It also gives a natural place for explicit design rationale and unresolved questions without turning the generated runtime into the primary source of truth.

## Conclusion

Future C-Skill conventions must preserve the separation between descriptor, specification, and generated implementation. If generation workflows evolve, this specification and the skill descriptor must evolve with them.
