---
id: DS011
title: Manage Ploinky Agents
status: implemented
owner: manage-ploinky-agents
summary: Defines the operating contract for safely creating, updating, reviewing, and securing Ploinky agents, and the obligation to resynchronize the owning repository's specifications with gamp-specs after every change.
---

# DS011 Manage Ploinky Agents

## Introduction

This specification defines the `manage-ploinky-agents` skill contract. The skill teaches a coding agent how to create, update, review, and secure Ploinky agents and the Ploinky runtime without breaking identity, routing, authentication, authorization, policy, or filesystem invariants. Within this catalog repository the subject of the specification is the skill itself; when the skill is applied, it operates on a separate Ploinky repository and is responsible for keeping that repository's specifications authoritative.

## Core Content

The skill is layered. `SKILL.md` is the compact operating contract that loads first. The `references/` files carry the deeper agent model, configuration shapes, security invariants, workflows, and code examples, and must be opened only when a task requires them. A deterministic validator at `scripts/validate-ploinky-agent.mjs` checks an agent directory and an optional router policy state against the structural and security invariants that prose cannot enforce alone. The skill also carries a portable `README.md` and `install.sh` because it is meant to be copied into external Ploinky repositories for use by Codex and Claude Code.

The skill must preserve a fixed set of security invariants. The canonical agent id `agent:<repo>/<agent>` is durable, while route keys and aliases are routing labels that must not change identity. The router is the single public control point, and agent container ports must not be exposed directly. The three JWT families flow in fixed directions: a User Session JWT terminates at the router, an Agent Assertion JWT proves source-agent identity to the router, and a Router Request JWT authorizes one concrete internal request to a target AgentServer. Every internal token binds to the real operation through a recomputed request hash. MCP policy is explicit and fail-closed, where missing policy denies and tags in `mcp-config.json` are only bootstrap defaults. The HTTP whitelist is path-based, readonly, and separate from MCP policy. Chat completions stay non-privileged. Secrets stay separated, so an agent never receives the master key or another agent's secret.

The skill is spec-driven. The DS specifications of the repository that owns an agent are the source of truth. The skill must state intended behavior in specification terms, make the smallest safe configuration or code change that satisfies it, and then resynchronize the owning repository's specifications and documentation with `gamp-specs`. That resynchronization runs against the edited repository rather than against this skill folder, regenerates the affected DS files, the HTML documentation, and `docs/specs/matrix.md`, and runs that repository's documentation link verification. A change is not finished while the specifications still describe the previous behavior.

This skill depends on `gamp-specs` for the specification and documentation layout it must regenerate in target repositories. As a member of this catalog it follows the repository conventions: a `skill.json` descriptor, a local `DS.md` design summary, a per-skill HTML page under `docs/`, and a contiguous DS entry reachable from `docs/specs/matrix.md`.

## Decisions & Questions

### Question #1: Should the spec relationship be a spec-first hard gate or a mandatory resynchronization after the change?

Response: The skill enforces mandatory resynchronization after every change rather than blocking edits behind a spec-first gate. Code-first and configuration-first editing remains available so routine fixes stay fast, but invoking `gamp-specs` against the owning repository after the change is required, so the specifications never lag the implementation. The specifications still hold authority because, when documented intent and code disagree, the skill reconciles the difference in favor of the specification rather than silently following the code.

### Question #2: Why does this skill keep its own `README.md` and `install.sh` and a hyphenated name when other catalog skills rely on `DS.md` and `skill.json`?

Response: The skill was authored as a portable skill for the Codex and Claude Code CLIs, with an installer that copies it into a target repository's `.agents/skills/` and `.claude/skills/` directories. For catalog parity it now also carries `skill.json` and `DS.md` and is documented here. The portable `README.md` and `install.sh` remain because the skill is intended to be copied into external Ploinky repositories. The existing hyphenated name and installer paths are retained to avoid breaking the established skill id; renaming would be a migration rather than a documentation change.

## Conclusion

Future work on the `manage-ploinky-agents` skill must keep the compact contract, the layered references, and the deterministic validator aligned, and must preserve both the security invariants and the spec-resynchronization obligation. When Ploinky introduces new runtime surfaces, routing behavior, or policy rules, update the references, the validator, this specification, and the synchronized catalog guidance together.
