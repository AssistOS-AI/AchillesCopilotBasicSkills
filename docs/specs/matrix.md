# Specification Matrix

Generated from DS frontmatter by `skills/gamp-specs/scripts/generate_specs_matrix.mjs`. Edit the DS files and rerun the generator instead of editing this file manually.

| Specification | Title | Status | Owner | Summary |
| --- | --- | --- | --- | --- |
| [DS000](specsLoader.html?spec=DS000-vision.md) | Vision | [[status:implemented]] | repository | Defines the repository mission as a baseline catalog of self-contained Anthropic-style skills for Achilles-oriented projects. |
| [DS001](specsLoader.html?spec=DS001-coding-style.md) | Coding Style | [[status:implemented]] | gamp-specs | Defines repository-wide coding style, file layout, modular test organization, and size constraints including periodic fileSizesCheck usage. |
| [DS002](specsLoader.html?spec=DS002-llm-model-strategy.md) | LLM Model Strategy | [[status:implemented]] | achilles-specs | Defines explicit task tags, model tiers, and manual-override expectations for LLMAgent-based routing. |
| [DS003](specsLoader.html?spec=DS003-gamp-specs.md) | GAMP Specs | [[status:implemented]] | gamp-specs | Defines the bootstrap contract for documentation layout, DS generation, matrix generation, link verification, and synchronized agent guidance. |
| [DS004](specsLoader.html?spec=DS004-achilles-specs.md) | Achilles Specs | [[status:implemented]] | achilles-specs | Defines AchillesAgentLib resolution, runtime-configuration overrides, and the requirement to surface these conventions in coding style guidance. |
| [DS005](specsLoader.html?spec=DS005-article-build.md) | Article Build | [[status:implemented]] | article-build | Defines the self-contained article generation pipeline, including chapter templates, SVG validation, bibliography checks, and incremental rebuild behavior. |
| [DS006](specsLoader.html?spec=DS006-cskill-build.md) | C-Skill Build | [[status:implemented]] | cskill-build | Defines specification-driven skill construction where a stable descriptor and module-level specs drive generated executable JavaScript. |
| [DS007](specsLoader.html?spec=DS007-dgskill-build.md) | DGSkill Build | [[status:implemented]] | dgskill-build | Defines dynamic code generation skills that can stay textual or emit guarded procedural code under explicit sandbox and normalization rules. |
| [DS008](specsLoader.html?spec=DS008-oskill-build.md) | O-Skill Build | [[status:implemented]] | oskill-build | Defines declarative orchestration-skill descriptors with explicit preparation, instructions, allowed skills, and session-type boundaries. |
| [DS009](specsLoader.html?spec=DS009-antropic-skill-build.md) | Antropic Skill Build | [[status:implemented]] | antropic-skill-build | Defines the portability baseline that keeps Anthropic-style skills self-contained and locally documented. |
| [DS010](specsLoader.html?spec=DS010-review-specs.md) | Review Specs | [[status:implemented]] | review-specs | Defines a step-by-step review workflow for reconciling affected DS files with new context, instructions, and observed issues. |
| [DS011](specsLoader.html?spec=DS011-manage-ploinky-agents.md) | Manage Ploinky Agents | [[status:implemented]] | manage-ploinky-agents | Defines the operating contract for safely creating, updating, reviewing, and securing Ploinky agents, and the obligation to resynchronize the owning repository's specifications with gamp-specs after every change. |
