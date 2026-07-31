---
id: DS012
title: WebSkel UI Engineering
status: implemented
owner: webskel-ui-engineering
summary: Defines WebSkel as the MVM UI framework for Ploinky agents and Explorer-hosted plugins, with declarative actions, templates, lifecycle, and reusable components.
---

# DS012 WebSkel UI Engineering

## Introduction

This specification defines the portable WebSkel implementation and review contract distributed to Ploinky agent repositories through the default skill catalog.

## Core Content

WebSkel is the mandatory MVM UI framework whenever a Ploinky agent uses WebSkel directly or contributes a WebSkel plugin or component to Explorer. HTML and CSS resources form the View, services and authoritative domain state form the Model, and the presenter is the view-facing model. The presenter owns lifecycle, declarative actions, invalidation, child coordination, and safe projection while services own persistence, authorization, and domain mutations.

Ordinary clicks use `data-local-action` and presenter methods. Explicit listeners are reserved for pointer gestures, keyboard/blur behavior, input/change events, click-outside handling, browser lifecycle events, and semantic custom events, with stable references and symmetric cleanup.

Stable structure lives in component HTML. Repeated or conditional structure uses inert templates cloned by the presenter. Dynamic values are assigned with `textContent`, DOM properties, safe attributes, or validated `data-*` values. JavaScript render strings, dynamic `innerHTML`, and `insertAdjacentHTML` are not normal application rendering mechanisms.

Reusable concepts with multiple consumers, independent lifecycle, or stable semantic boundaries become WebSkel components. Components and dependencies are registered through WebSkel, and status-only updates preserve existing child presenter instances. UI reviews must check MVM boundaries, declarative actions, listener justification, safe projection, component reuse, accessibility, cleanup, and focused validation.

## Decisions & Questions

### Question #1: Why is the skill distributed to every Ploinky agent repository?

Response: Explorer mounts plugins owned by multiple agents, while some agents expose direct WebSkel applications. A host-only standard would allow plugin internals to bypass the framework and create inconsistent behavior inside the same UI.

### Question #2: Why restrict direct click listeners and JavaScript-generated markup?

Response: WebSkel already provides presenter-scoped actions, component resources, lifecycle, and dependencies. Bypassing those capabilities creates parallel UI systems, obscures ownership, complicates cleanup, and increases injection risk.

## Conclusion

Ploinky WebSkel interfaces remain coherent when the framework is used at full MVM capacity and view structure, presenter orchestration, services, actions, lifecycle, and reusable components retain explicit boundaries.
