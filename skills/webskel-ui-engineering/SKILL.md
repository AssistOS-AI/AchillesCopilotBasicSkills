---
name: webskel-ui-engineering
description: Build or review any WebSkel UI in a Ploinky agent, including Explorer components and every agent-owned plugin mounted in Explorer. Use for all changes to WebSkel views, presenters, actions, lifecycle, templates, component registration, shared UI, and DOM rendering. Enforces WebSkel as the Ploinky MVM framework and prevents manual-DOM and generated-HTML substitutes.
---

# WebSkel UI Engineering

## Purpose

Use this skill for every UI implementation or review in any Ploinky agent that uses WebSkel directly or contributes a WebSkel component or plugin to Explorer.

WebSkel is the mandatory MVM UI framework for these surfaces. HTML/CSS resources are the View, domain state and services are the Model, and the WebSkel presenter is the view-facing model that coordinates state, lifecycle, actions, child components, and rendering. Do not treat WebSkel as a loader around an independently managed DOM application. Use its component, presenter, action, lifecycle, invalidation, resource, and dependency capabilities as the primary UI architecture.

## Scope

This skill applies to:

- Explorer `web-components` and shared UI.
- Explorer IDE plugins.
- Agent-owned IDE plugins mounted by Explorer.
- Direct WebSkel applications exposed by a Ploinky agent.
- Component HTML, CSS, presenter JavaScript, runtime registration, dependencies, and focused UI tests.
- UI reviews that touch DOM rendering, event handling, component boundaries, or reusable structure.

## Required Context

Before editing:

1. Read the nearest repository guidance and relevant design specifications.
2. Identify the component HTML, CSS, presenter, registration entry, host context, child dependencies, services, and focused tests.
3. Inspect adjacent components for the WebSkel version and lifecycle conventions actually used by the host.
4. Separate stable view structure, view-facing state, domain/model operations, and host integration before changing code.

## MVM Responsibilities

### View

- Keep stable DOM structure in the component `.html` resource.
- Keep visual rules in the component `.css` resource.
- Put repeated or conditionally instantiated structure in inert `<template>` elements owned by the component.
- Declare ordinary user actions with `data-local-action`.
- Declare child WebSkel components with `data-presenter` where the host contract requires it.
- Keep the View declarative; do not hide its structure inside JavaScript strings.

### View-facing model / presenter

- Use the WebSkel presenter as the component's view-facing model and orchestrator.
- Implement declared local actions as presenter methods.
- Hold normalized UI state in the presenter or a focused controller owned by it.
- Use WebSkel lifecycle hooks for setup, projection, and teardown.
- Use `invalidate()` for meaningful structural state transitions and targeted DOM projection for transient status that must preserve child component instances.
- Coordinate child presenters through explicit inputs, presenter APIs, and semantic custom events.
- Delegate persistence, network calls, authorization, and domain algorithms to services or model modules.

### Model and services

- Keep authoritative domain state and mutations outside HTML and ad hoc DOM state.
- Expose bounded operations and normalized data to the presenter.
- Do not let reusable presentational components own domain persistence or authorization.

## WebSkel Action Contract

- Put ordinary click actions in component HTML with `data-local-action="methodName optionalArg"`.
- Implement the named method on the owning presenter and delegate focused domain work where appropriate.
- Use `data-action` only for an intentional application-level action registry boundary.
- Do not attach direct `click` listeners to ordinary buttons, menu items, links, rows, or cards that WebSkel can dispatch.
- Explicit DOM listeners are allowed only when declarative click dispatch is not the interaction: pointer gestures, keyboard or blur behavior, input/change events, click-outside detection, browser lifecycle events, and semantic custom events.
- Every explicit listener needs a stable handler reference and symmetric cleanup in the unload or destroy path.
- Preserve focus restoration, keyboard behavior, ARIA state, disabled state, event propagation, and Shadow DOM retargeting.

## Template And Safe Projection Contract

- Clone inert template content for repeated dynamic structure.
- Assign untrusted, remote, or workspace-derived values with `textContent`, DOM properties, safe attributes, or validated `data-*` values.
- Prefer `replaceChildren`, `append`, `classList`, `dataset`, and property assignment.
- Do not build application markup with JavaScript template strings or string concatenation.
- Do not use dynamic `innerHTML` or `insertAdjacentHTML` for application rendering.
- `innerHTML` is exceptional: only framework-owned static resource loading or an explicitly sanitized rich-content contract may use it, and the authority must be documented at the call site.
- Do not make rendered HTML or queried DOM values the authoritative model when presenter or service state can represent the value.

## WebSkel Component Contract

- Reuse an existing WebSkel component or component-owned inert template before duplicating markup.
- Extract a reusable component when a concept has multiple consumers, an independent lifecycle, or a stable input/output contract.
- Prefer presentational reusable components: accept normalized inputs and emit semantic custom events while the host owns persistence and authorization.
- Register components through the owning `webskel.json` or runtime component declaration.
- Declare child dependencies explicitly so the host loads templates, CSS, presenters, and dependent components before mount.
- Use WebSkel component creation and presenter readiness APIs instead of manually bootstrapping parallel custom-element systems.
- Preserve child instances during status-only updates; do not rebuild a component subtree merely to change busy text, selection, or disabled state.

## Styling Contract

- Scope selectors to the component tag or established component root.
- Use component-owned BEM-like element and modifier names.
- Project visual state through `data-*`, ARIA state, or modifier classes and let CSS render it.
- Reuse existing design tokens and shared components.
- Avoid global selectors and generic state classes that leak across Explorer-hosted plugins.

## Review Procedure

1. Map Model, View, and presenter responsibilities.
2. Confirm the component uses WebSkel lifecycle and registration instead of a parallel manual UI runtime.
3. Map every ordinary click to `data-local-action` and a presenter method.
4. List every explicit listener and justify why WebSkel action dispatch cannot represent it.
5. Search edited JavaScript for `innerHTML`, `insertAdjacentHTML`, markup-shaped template strings, and direct click listeners.
6. Move stable structure to HTML and repeated structure to inert templates.
7. Check for an existing reusable component or extract one when the boundary is stable.
8. Verify child preservation, cleanup, focus, ARIA, keyboard behavior, responsive layout, and safe data projection.
9. Run focused syntax and unit tests, then visually verify the component when a browser target is available.

## Completion Checklist

- WebSkel is used as the MVM framework, not only as a component loader.
- View, presenter, and model/service responsibilities are explicit.
- Ordinary clicks use `data-local-action` and corresponding presenter methods.
- Explicit listeners are necessary and cleaned up.
- Stable markup lives in HTML resources and repeated markup clones inert templates.
- Dynamic values use safe DOM assignment.
- Reusable UI is not duplicated.
- Components and dependencies are registered through WebSkel.
- Status-only updates preserve child instances.
- CSS is component-scoped.
- Accessibility, keyboard behavior, documentation, and focused validation remain correct.

## Help

Invoke for any Ploinky agent UI that uses WebSkel or contributes UI to Explorer, including controls, menus, modals, lists, cards, renderers, presenters, templates, and shared components.
