# Airbnb Clone

A pixel-perfect, desktop-only (1280px+) clone of an Airbnb listing page, built with React (Vite) + Tailwind CSS.

## Features

- **Listing Page** — full property page with hero gallery, host info, amenities, reviews, booking card, and map
- **Photo Tour** — full-screen gallery overlay with all listing photos, opened via "Show all photos"
- **Lightbox** — single-photo viewer with prev/next arrows and keyboard navigation, opened from the photo tour
- **Accessibility** — focus trapping, keyboard navigation (Esc/Arrow keys), ARIA roles, visible focus rings
- **localStorage** — persists saved/wishlisted state and last-viewed lightbox photo index

## Stack

- React 18 (Vite, JavaScript — no TypeScript)
- Tailwind CSS v3
- Vanilla CSS (animations, custom properties)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Project Structure

```
src/
├── App.jsx                          # Root: renders listing + conditionally mounts overlays
├── main.jsx                         # Vite entry point
├── index.css                        # Global styles + Tailwind directives
├── components/
│   ├── listing/
│   │   ├── ListingHeader.jsx        # Title, rating, superhost, share/save buttons
│   │   ├── HeroGallery.jsx          # 5-image hero grid + "Show all photos"
│   │   ├── HostCard.jsx             # Host info + listing highlights
│   │   ├── AmenitiesSection.jsx     # Expandable amenities list
│   │   ├── ReviewsSection.jsx       # Rating breakdown + 2-column review grid
│   │   ├── BookingCard.jsx          # Sticky booking card with date/guest pickers
│   │   └── MapSection.jsx           # OpenStreetMap embed
│   ├── photo-tour/
│   │   └── PhotoTourOverlay.jsx     # Full-screen scrollable gallery overlay
│   └── lightbox/
│       └── Lightbox.jsx             # Single-photo viewer with keyboard nav
├── data/
│   └── listing.json                 # Mock listing content (frontend-only)
├── hooks/
│   ├── useLocalStorage.js           # Persist saved/wishlist + lightbox index
│   └── useLightboxKeyboard.js       # Arrow/Esc keyboard handler for lightbox
└── lib/
    └── design-tokens.js             # Colors, typography, spacing, radii, shadows

.claude/
├── agents/
│   ├── visual-fidelity-auditor.md  # Sub-agent: pixel diff vs. reference
│   ├── accessibility-auditor.md    # Sub-agent: a11y checks
│   └── component-builder.md        # Sub-agent: scaffold new components
└── skills/
    └── design-token-extractor/
        └── SKILL.md                 # Skill: normalize observed values into tokens

docs/
├── prompts.md                       # Full AI prompt log (deliverable)
└── architecture-diagram.png         # Production architecture diagram (deliverable)
```

## Sub-Agent Configs

The `.claude/agents/` directory contains three Claude Code sub-agent configs committed as deliverables:

- **visual-fidelity-auditor** — compares built components against the design spec
- **accessibility-auditor** — checks keyboard nav, ARIA, focus management
- **component-builder** — scaffolds new components following project conventions

## Keyboard Navigation

| Key | Action |
|-----|--------|
| `Escape` | Close topmost overlay (Lightbox → Photo Tour → Listing) |
| `←` / `→` | Navigate photos in Lightbox |
| `Tab` / `Shift+Tab` | Navigate interactive elements (focus-trapped in overlays) |

## Design Tokens

Key tokens extracted from the Airbnb design system, defined in `src/lib/design-tokens.js`:

| Token | Value | Tailwind class |
|-------|-------|----------------|
| Brand | `#FF385C` | `bg-brand` / `text-brand` |
| Primary text | `#222222` | `text-ink-primary` |
| Secondary text | `#717171` | `text-ink-secondary` |
| Border | `#DDDDDD` | `border-border-light` |
| Gallery radius | `12px` | `rounded-gallery` |
| Base transition | `200ms ease` | — |
