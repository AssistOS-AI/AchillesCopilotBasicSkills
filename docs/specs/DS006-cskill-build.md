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

The repository must preserve this distinction because it enables repeatable regeneration, auditability, and maintenance without embedding the whole design into ad hoc generated code. C-Skills must also inherit the modularity and file-size expectations described in `DS001-coding-style.md`, so that specification-driven generation does not become an excuse for oversized or weakly structured modules.

## Conclusion

Future C-Skill conventions must preserve the separation between descriptor, specification, and generated implementation. If generation workflows evolve, this specification and the skill descriptor must evolve with them.
