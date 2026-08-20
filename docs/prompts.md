# AI Prompt Log — Airbnb Clone

## Session 1 — Design Recon (Reference Site)
**Tool:** Antigravity IDE browser subagent
**Task:** Extract design tokens from https://www.airbnb.co.in/rooms/1685257792087969631
**Outcome:** Browser subagent was rate-limited. Design tokens were derived from Airbnb's well-documented public design system (Rausch red #FF385C, Circular/Nunito Sans font, 12px gallery border-radius, 200ms transitions). Tokens committed to `src/lib/design-tokens.js`.

---

## Session 2 — Project Scaffold
**Tool:** Antigravity IDE (agy)
**Prompt:**
> Scaffold a React (Vite, no TypeScript) + Tailwind CSS v3 project in /Users/rishi/Airbnb/airbnb-clone. Convert the extracted design tokens into src/lib/design-tokens.js and wire matching entries into tailwind.config.js's theme.extend, so components use semantic class names (bg-brand, text-ink-secondary, etc.) instead of raw hex/px values.

**Outcome:** Vite + React scaffold created. Tailwind v3 installed and configured. Design tokens wired. Google Fonts (Nunito Sans) added as Circular Std substitute. Material Symbols added for amenity icons.

---

## Session 3 — Phase 1: Static Layout Build
**Tool:** Antigravity IDE (agy)
**Prompt:**
> Build the three views as components: Listing Page (ListingHeader, HeroGallery, HostCard, AmenitiesSection, ReviewsSection, BookingCard, MapSection), Photo Tour overlay (PhotoTourOverlay), and Lightbox (Lightbox). Use src/data/listing.json for mock content. Match the Airbnb design spec: 1 large left + 2×2 grid right for hero gallery, sticky right-column booking card with date pickers and guest selector, two-column reviews grid, rating breakdown bars, and full host section.

**Outcome:** All 9 components built in JSX. Two-column grid layout (1fr 380px) for content + booking card. Hero gallery with 5-image layout, hover zoom effect, and "Show all photos" button. Reviews with rating bars and 6-card grid.

**Design values used:**
- Brand: `#FF385C` → `bg-brand`, Reserve button gradient
- Primary text: `#222222` → `text-ink-primary`
- Secondary: `#717171` → `text-ink-secondary`
- Border: `#DDDDDD` → `border-border-light`
- Gallery radius: `12px` → `rounded-gallery`
- Booking card shadow: `rgba(0,0,0,0.12) 0px 6px 16px` → `shadow-booking`
- Hover transition: `200ms ease` on all interactive elements
- Font: `Nunito Sans` (Circular Std substitute)

---

## Session 4 — Phase 2: Photo Tour Behavior
**Tool:** Antigravity IDE (agy)
**Prompt:**
> Implement the Photo Tour overlay: full-screen white overlay with sticky close button, scrollable stacked photo grid (4:3 aspect ratio), and click-to-lightbox on each image. Implement focus trap, Esc-to-close, and body scroll lock. Opening returns focus to the 'Show all photos' trigger on close.

**Outcome:** PhotoTourOverlay.jsx built with slide-up entry animation (300ms ease-out), focus trap using tabindex query, Esc key listener, body overflow lock/unlock, and sticky header with close button + photo count.

---

## Session 5 — Phase 3: Lightbox
**Tool:** Antigravity IDE (agy)
**Prompt:**
> Implement the Lightbox: single-photo viewer on top of Photo Tour (z-index 60 vs Photo Tour z-index 50). Dark scrim background. Prev/next chevron buttons clamped at ends (no loop — match reference). ArrowLeft/ArrowRight keyboard nav via useLightboxKeyboard hook. Esc closes Lightbox only (returns to Photo Tour, not directly to listing). Thumbnail strip at the bottom. Last-viewed index persisted via useLocalStorage. aria-live counter.

**Outcome:** Lightbox.jsx built with focus trap, keyboard hook, thumbnail strip, fade-in animation (200ms), and correct Esc nesting. useLocalStorage persists lightbox-last-index.

---

## Session 6 — Phase 5: Accessibility Pass
**Tool:** Antigravity IDE (agy)
**Prompt:**
> Verify accessibility: all overlays have role="dialog" aria-modal="true" and aria-label. Focus trapped in both overlays. Esc closes topmost overlay only. ArrowLeft/ArrowRight in lightbox. Visible :focus-visible rings. Alt text on all images. Single h1. Star rating has aria-label.

**Outcome:** All overlays have role/aria-modal/aria-label. Focus traps implemented in both PhotoTourOverlay and Lightbox. Esc behavior verified: lightbox closes to photo tour, photo tour closes to listing. All images have descriptive alt text from listing.json. Photo counter has aria-live="polite".
