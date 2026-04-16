---
id: DS005
title: Article Build
status: implemented
owner: article_build
summary: Defines the self-contained article generation pipeline, including chapter templates, SVG validation, bibliography checks, and incremental rebuild behavior.
---

# DS005 Article Build

## Introduction

This specification defines the contract of the self-contained `article_build` skill. It exists because the repository contains executable build logic whose boundaries and validation surface must remain stable during future refactors.

## Core Content

The skill must remain self-contained inside `skills/article_build/`. It must derive output from an explicit article root containing `index.html`, `assets/`, and `plan/`. It must support incremental rebuilds, validate copied SVG assets, verify bibliography support from cached evidence, and regenerate the final HTML plus build manifest from article-owned planning material.

![Article build pipeline](../assets/article-build-pipeline.svg)

The repository must preserve the existing module boundaries used by the skill: the build orchestrator, bibliography verification, reference catalog loading, HTML rendering, and SVG validation remain separate responsibilities. Host-project source modules under `src/` must not become runtime dependencies of this skill. The repository should continue using the skill's SVG validator when documentation diagrams are edited, because the same readability and containment concerns apply there as well.

## Conclusion

Future changes must preserve the skill's self-contained execution model and the current validation surface. Any broadening of scope should be reflected in both the descriptor and the test fixtures.
