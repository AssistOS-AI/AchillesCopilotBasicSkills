---
name: achilles-skill-builder
description: Create and review AchillesAgentLib skills, including cskill, oskill, dcgskill, tskill DBTable skills, Anthropic-style SKILL.md skills, and oskill access to dynamic Ploinky agent skills.
---

# Achilles AgentLib Skill Builder

## Purpose

This skill defines how to author a skill that can be discovered, registered, prepared, and executed by AchillesAgentLib. It is intentionally practical: it identifies the descriptor file, the required sections, the expected folder layout, and the runtime role of each skill family.

A skill should be treated as a bounded runtime unit. The descriptor tells MainAgent and the relevant subsystem what the skill is for, when it should be used, and which execution contract applies. Do not invent new descriptor sections for AgentLib-native skill families. Use the recognized sections below, or report the ambiguity if the required information has no valid place.

## Common AgentLib Rules

Descriptor determines type: the descriptor filename determines the skill family: `cskill.md`, `oskill.md`, `dcgskill.md`, `tskill.md`, or `SKILL.md`.

Folder per skill: a normal filesystem skill lives in `skills/<skill-name>/` and contains its descriptor. Ploinky agent skills are dynamic and do not use this folder layout.

Top heading: every descriptor should start with `# <skill-name>`. For `SKILL.md`, optional frontmatter `name` may also define the skill name.

No invented sections: use only the recognized sections for the selected family. If a new section seems necessary, treat that as a specification question.

Text output: skills should return plain text.

MainAgent routing: MainAgent discovers descriptors, registers skills, delegates execution to the matching subsystem, and may route a user request to an orchestrator before exposing lower-level skills.

Oskill ownership: skills explicitly listed in an oskill allowlist are callable by that oskill, but are not exposed as separate top-level tools for ordinary MainAgent sessions.

Ploinky agents: Ploinky agents are called only through oskill `Allowed Agents`. They are runtime-discovered agents, not manually authored skill folders.

## Skill Family Overview

cskill: use when you need a stable JavaScript capability with a small, precise, repeatable task.

oskill: use when you need to coordinate several skills or Ploinky agents under explicit allowlists and session rules.

dcgskill: use when you need adaptive request-local behavior that may answer directly or generate temporary JavaScript for the current request.

tskill / DBTable skill: use when you need controlled create, read, update, and delete behavior over table-like records, fields, identifiers, validations, and relationships.

`SKILL.md` / Anthropic-style skill: use when you need an instruction bundle compatible with environments that use `SKILL.md`, optionally with resources and scripts.

Ploinky agent skill: use when you need an oskill to call an available Ploinky agent through the router as a text-returning tool.

## cskill: Stable Code Skill

A cskill is the basic code-backed skill. Use it when the behavior should be stable, inspectable, and implemented in JavaScript. The descriptor is `cskill.md`. The executable module is loaded from `src/index.mjs` first, then `src/index.js` if the `.mjs` file is absent.

Required layout:

```text
skills/
  <skill-name>/
    cskill.md
    src/
      index.mjs
```

The optional generation-driven layout also includes `specs/index.mjs.md`. In that case, `specs/` is the maintained source for generation and `src/index.mjs` is a generated or regenerated artifact. If the module is hand-maintained, `src/index.mjs` is the maintained runtime file.

Descriptor sections:

`# <skill-name>`: descriptor title and canonical human-readable skill name.

`## Description`: states what the skill does and when MainAgent or an orchestrator should use it.

`## Input Format`: required by the current Code Skills subsystem. Describes the natural-language prompt or command format expected by `action(args)`.

`## Output Format`: describes the text returned by the skill. Use text or JSON string if structure is needed.

`## Constraints`: optional. State hard limits that the executable module must enforce or respect.

`## Help`: optional user-facing invocation guidance. It is not runtime logic.

Minimal `cskill.md` template:

```markdown
# local-formatter
## Description
Formats a local text fragment through a stable JavaScript implementation.

## Input Format
Plain text instruction and the text to format.

## Output Format
Plain text.

## Constraints
Do not access paths outside the workspace.

## Help
Example: format this paragraph as concise technical prose.
```

Runtime entrypoint:

The module must export `action(args)`. `args` contains `promptText`, `mainAgent` as an instance of MainAgent, and `options`.

```js
export async function action(args) {
  const prompt = args.promptText;
  const mainAgent = args.mainAgent;
  const options = args.options;
  // perform bounded local work
  return "plain text result";
}
```

When to choose cskill:

Small precise operation: use cskill.

Stable local algorithm: use cskill and implement it in `src/index.mjs`.

Specification-driven code generation: add `specs/index.mjs.md` and regenerate through the build path.

Complex workflow using several capabilities: use oskill instead and delegate to smaller skills.

Ad hoc calculation or temporary code: use dcgskill instead.

## oskill: Orchestration Skill

An oskill has no local JavaScript implementation. It coordinates other skills and, when needed, Ploinky agents. The descriptor is `oskill.md`. Its purpose is to define a bounded execution environment: what preparation may happen, which tools may be called, and whether execution uses a loop session or a SOP session.

Required layout:

```text
skills/
  <orchestrator-name>/
    oskill.md
```

Descriptor sections:

`# <skill-name>`: descriptor title and orchestrator name.

`## Description`: most important routing text. It states what the orchestrator does and when it should be selected.

`## Preparation`: optional. Describes context-building work that runs before the main session.

`## Allowed Preparation Skills`: optional. One skill name per line. If absent, preparation reuses the main allowlist; if present and empty, preparation has no delegated skills.

`## Instructions`: main orchestration instructions. They explain how to use the allowed skills and agents to solve the task.

`## Allowed Skills`: one skill name per line. This is the main control surface for local skills available to the orchestrator.

`## Allowed Agents`: one Ploinky agent name per line. These agents are exposed as text-returning tools inside the orchestrator session.

`## Session Type`: use `loop` or `soplang`. If omitted or not `loop`, the subsystem uses the SOP path.

`## Help`: optional user-facing invocation guidance.

Session choice:

`loop`: use when the next action depends on intermediate results, clarifications, tool failures, or changing context. It is more adaptive and can resume when awaiting input.

`soplang`: use when the task can be expressed as a plan of well-defined steps over known skills. It is more rigid and better for algorithm-like workflows without complex branching. Do not use if you need to iterate over a dynamic list or if you have branched execution paths.

Minimal oskill template:

```markdown
# document-review
## Description
Coordinate a bounded document review workflow.

## Instructions
Use only the allowed skills. Return a concise final answer.

## Allowed Skills
context-loader
spec-reviewer

## Session Type
soplang

## Help
Invoke with the document path and the review objective.
```

When to choose oskill:

Task requires several skills: use oskill.

Task needs a controlled preparation stage: use oskill with `Preparation` and `Allowed Preparation Skills`.

Task needs Ploinky agents: use oskill with `Allowed Agents`.

Task is one stable local operation: use cskill instead.

## dcgskill: Dynamic Code Generation Skill

A dcgskill is descriptor-only. It lets the runtime decide whether to answer directly with text or to generate temporary JavaScript for the current request. It does not load `src/index.mjs` and does not use the cskill `action(args)` entrypoint.

Required layout:

```text
skills/
  <skill-name>/
    dcgskill.md
```

Descriptor sections:

`# <skill-name>`: descriptor title and skill name.

`## Prompt`: behavioral guidance used in the text-versus-code decision prompt.

`## Input`: describes the expected input. The operative runtime key remains `input`.

`## Model`: optional. Selects the model value for the decision prompt, for example `fast` or `deep`, depending on configured model aliases.

`## Help`: optional user-facing invocation guidance.

Minimal dcgskill template:

```markdown
# exact-calculation
## Prompt
Answer directly when the computation is simple. Generate temporary JavaScript when exact computation is safer.

## Input
Natural-language calculation request.

## Model
fast

## Help
Example: multiply these two large integers.
```

When to choose dcgskill:

One-off computation: use dcgskill.

Exact arithmetic or transformation may need code: use dcgskill if a permanent module is unnecessary.

Stable capability reused often: use cskill instead.

Multi-step workflow: use oskill instead.

## tskill: DBTable Skill

A DBTable skill is authored as `tskill.md`. It models a table-oriented domain with fields, validations, access rules, relationships, interactive fields, and delete guards. The maintained source is `tskill.md`. The generated runtime module is derived under `src/` and should not be edited as the source of truth.

Typical layout:

```text
skills/
  <table-skill-name>/
    tskill.md
    specs/
      tskill.generated.mjs.md
    src/
      tskill.generated.mjs
    tests/
      <table-skill-name>.test.mjs
```

Descriptor sections:

`# <TableName> Skill`: title for the table skill and the entity it manages.

`## Table Purpose`: business meaning of the table. Helps operation parsing and documentation.

`## Fields`: main schema section. Each field is declared as `### <fieldName>` with field-level subsections.

`## Role Access Policy`: defines which roles can read and which roles can write.

`## Relationships`: defines references between tables. Used for foreign-key checks and delete dependencies.

`## Business Rules`: human-readable domain rules. Put executable constraints in validators or derivators when enforcement is required.

`## Instructions`: additional guidance for parsing natural-language create, update, select, and delete requests.

`## Delete Guard`: use `block_if_referenced` when delete must be blocked by dependent records.

`## Interactive Fields`: defines the fields and order used in progressive create/update capture.

`## List Extra Fields`: defines additional fields shown in list/select displays.

`## Help`: optional user-facing invocation guidance.

Field-level subsections:

`#### Description`: explains the meaning of the field.

`#### Aliases`: alternative names accepted during parsing.

`#### Field Value Resolver`: normalizes user input into the stored value.

`#### Field Value Validator`: checks format, type, length, pattern, or domain constraints.

`#### Field Value Presenter`: formats stored values for display.

`#### Field Value Enumerator`: defines possible values when the field is enumerable.

`#### Field Value Derivator`: defines a derived value.

`#### Field Value Is Required`: states whether a value must be present.

`#### PrimaryKey`: marks the identity field used by update/delete flows.

`#### Indexed / Unique / Grouping`: declares indexing, uniqueness, or grouping semantics.

`#### Type / MaxLength / MinLength / Pattern`: defines basic type and validation hints.

`#### Default`: defines default value behavior.

Minimal tskill template:

```markdown
# Customers Skill
## Table Purpose
Manage customer records.

## Fields
### customer_id
#### Description
Unique integer identifier.
#### PrimaryKey
Auto-increment starting from 1.

### email
#### Description
Primary contact email.
#### Field Value Is Required
Always required.
#### Field Value Validator
Must be a valid email address.

## Role Access Policy
read: admin, operator
write: admin

## Delete Guard
block_if_referenced

## Help
Example: create customer email=user@example.com
```

When to choose tskill:

Persistent records with fields and IDs: use tskill.

CRUD operations from natural language: use tskill.

Strict validation and role access are needed: use tskill.

No table state is involved: use cskill, oskill, or dcgskill instead.

## SKILL.md: Anthropic-style Skill

AchillesAgentLib also supports Anthropic-style skill bundles. The descriptor is `SKILL.md`, uppercase. This family is useful when a reusable instruction bundle must remain compatible with environments that understand `SKILL.md`. The raw body is used as operational guidance for a loop-session runtime.

Typical layout:

```text
skills/
  <skill-name>/
    SKILL.md
    scripts/
    resources/
```

Descriptor guidance:

Frontmatter `name`: optional. Defines the skill name.

`# <skill-name>`: fallback skill name when frontmatter is absent.

Operational body: the body should be direct runtime guidance, not narrative documentation.

`## Help`: optional user-facing invocation guidance.

`scripts/`: optional. Files exposed through bounded runtime script execution.

`resources/`: optional. Files exposed through bounded resource access.

Unlike the AgentLib-native descriptor families, `SKILL.md` does not require the same narrow section set. Keep the body disciplined because it becomes session guidance.

## Ploinky Agent Skills

A Ploinky agent skill is not manually authored as a skill folder. It is created dynamically when an oskill declares `## Allowed Agents`. The orchestrator subsystem asks the Ploinky router for agent-card metadata, wraps the declared agents as callable text tools, and invokes them through the OpenAI-compatible chat completions interface.

No descriptor: do not create a folder or descriptor for a Ploinky agent skill.

Only from oskill: declare the agent under `## Allowed Agents` inside `oskill.md`.

Plain text input: the orchestrator passes plain text to the agent tool.

Text output: the response text is returned to the orchestrator session.

Agent metadata: tool descriptions are derived from agent-card metadata such as summary, tags, and usage guidance.

Allowed Agents template:

```markdown
## Allowed Agents
openaiAgent
researchAgent
codingAgent
```

## Authoring Checklist

Correct descriptor filename: the file name matches the intended family.

Correct folder layout: the skill is under `skills/<skill-name>/` unless it is a dynamic Ploinky agent.

Top heading present: the descriptor starts with `# <skill-name>` or `SKILL.md` frontmatter defines `name`.

Sections are valid: only recognized sections are used for the selected skill family.

Description is precise: MainAgent or oskill can decide when the skill should be used.

Input is explicit: the descriptor says exactly what the prompt/input should contain.

Output is text: the skill returns a text response or serialized text.

Code entrypoint exists: code-backed skills export `action(args)` from `src/index.mjs` or `src/index.js`.

Oskill allowlists are explicit: `Allowed Skills`, `Allowed Preparation Skills`, and `Allowed Agents` are declared when capability boundaries matter.

DBTable fields are coherent: primary keys, required fields, validators, relationships, and interactive fields refer to real field names.

Generated artifacts are not edited as source: for generated cskill or tskill outputs, maintain the descriptor/spec files and regenerate.
