---
id: DS004
title: Achilles Specs
status: implemented
owner: achilles_specs
summary: Defines AchillesAgentLib resolution, runtime-configuration overrides, and the requirement to surface these conventions in coding style guidance.
---

# DS004 Achilles Specs

## Introduction

This specification defines the Achilles-specific runtime conventions that complement the repository bootstrap rules. It exists so that AchillesAgentLib integration and runtime configuration remain explicit rather than implicit.

## Core Content

The repository is authorized to use AchillesAgentLib. The portable example implementation must resolve the library through `skills/achilles_specs/examples/depsLoader.mjs`, preferring a parent-directory copy and falling back to `node_modules`. Runtime configuration examples must accept manual overrides and environment-based defaults and must remain inside the same skill folder. All LLM work must flow through `LLMAgent`, and task tags plus model tiers must remain available in runtime configuration.

The repository must keep the Achilles conventions visible in agent guidance and in `DS001-coding-style.md`. These conventions are repository-wide defaults rather than hidden implementation details of a single skill. Documentation pages should also point readers toward the runtime helpers that implement these rules instead of leaving them as abstract policy.

## Conclusion

Future Achilles runtime changes must update the implementation, agent guidance, and DS material together. Silent drift between runtime behavior and repository guidance is not permitted.
