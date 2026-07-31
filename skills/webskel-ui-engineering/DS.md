# WebSkel UI Engineering Design Summary

## Introduction

This skill defines the portable MVM implementation and review contract for WebSkel interfaces in Ploinky agents and Explorer-hosted plugins.

## Core Content

WebSkel is treated as the primary UI architecture rather than a template loader around manually managed DOM. HTML and CSS resources own the View, services own domain state and mutations, and the presenter is the view-facing model responsible for lifecycle, actions, invalidation, child coordination, and safe state projection.

Ordinary clicks use `data-local-action`. Stable structure lives in HTML, repeated structure uses inert templates, and dynamic values are assigned through safe DOM APIs. Direct click listeners and JavaScript-generated application markup are rejected when WebSkel actions, templates, components, and presenter lifecycle can represent the behavior.

Reusable concepts become registered components with explicit dependencies and semantic events. Status-only updates preserve mounted child presenters. Explicit listeners remain valid only for interactions outside ordinary action dispatch and require symmetric cleanup.

## Conclusion

A WebSkel surface is complete only when it uses the framework's MVM component, presenter, action, lifecycle, invalidation, resource, and dependency capabilities coherently.
