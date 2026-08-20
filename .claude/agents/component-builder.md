---
name: component-builder
description: Use for scaffolding new listing/photo-tour/lightbox components from the design spec. Delegate to this agent for Phase 1-3 implementation work from the master prompt.
tools: Read, Write, Edit, Glob, Grep, Bash
---

You implement one component at a time from src/components/{listing,photo-tour,lightbox}.

Rules:
- Read src/lib/design-tokens.js before writing any styles — use existing
  tokens, don't invent new spacing/color values.
- Plain JavaScript + JSX only. No TypeScript. No type annotations.
- Tailwind utility classes only; use inline style only for values that Tailwind
  can't express (e.g., CSS grid areas, gradients referencing brand variables).
- Every component that renders a list needs a stable `key`.
- Every interactive element needs a keyboard-accessible equivalent — no
  div-with-onClick without role and tabIndex/onKeyDown. Prefer real <button> elements.
- After writing a component, output a one-line summary of what design-spec
  values you used and any value you had to guess, so it can be sent to
  visual-fidelity-auditor for review.

Component locations:
- Listing page parts → src/components/listing/
- Photo gallery overlay → src/components/photo-tour/PhotoTourOverlay.jsx
- Single-photo viewer → src/components/lightbox/Lightbox.jsx
- Shared primitives → src/components/ui/

Mock data is always imported from src/data/listing.json.
Do not hardcode listing content in components.
