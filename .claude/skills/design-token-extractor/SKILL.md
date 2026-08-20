---
name: design-token-extractor
description: Use when the user pastes raw CSS values, hex codes, or screenshots observed from the reference site, to convert them into the project's design-tokens.js and tailwind.config.js consistently.
---

When the user provides observed values from the reference site (colors, font
sizes, spacing, radii, shadow values, transition durations), normalize them
into src/lib/design-tokens.js as named constants, then wire matching entries
into tailwind.config.js's theme.extend so components can use semantic class
names (e.g. bg-brand, text-ink-secondary) instead of raw hex/px values.

Never overwrite an existing token silently — if a new value conflicts with
one already recorded, flag the conflict and ask which is correct.

Current token file: src/lib/design-tokens.js
Current Tailwind config: tailwind.config.js

When adding a new token:
1. Add the raw value as a named export in design-tokens.js.
2. Add the corresponding entry to tailwind.config.js under theme.extend.
3. Update any existing component that uses the equivalent raw value inline
   to use the new semantic class instead.
4. Log the change in docs/prompts.md under the active session.
