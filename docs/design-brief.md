# Design Brief — Xaf Mobile E-Commerce

**Project:** Xaf Mobile E-Commerce  
**Stack:** Next.js 14+ (App Router), Tailwind CSS, TypeScript, Supabase  
**Document Version:** 1.0  
**Date:** August 2026

---

> *"Typography communicates attention to detail. White space communicates confidence."*
> — Hooman Design

---

## 1. Brand Voice & Tone

Xaf does not shout. It speaks in measured, confident sentences. Every word, every micro-interaction, every pixel of whitespace should say: *this brand has nothing to prove.*

### 1.1 Personality
- **Confident restraint** — Never more than necessary. A single accent on a sea of calm.
- **Tactile warmth** — The digital experience should feel like touching high-quality paper or cool metal. Subtle, physical, considered.
- **Quiet authority** — Like a well-edited editorial spread. The design leads; the user follows naturally.

### 1.2 Copy Principles
- Use short, declarative sentences in product titles and CTAs.
- Reserve longer, richer language for product stories and the about/editorial surfaces.
- Replace jargon with clarity. *"Free delivery Thursday"* beats *"2–3 business day shipping."*
- Avoid exclamation marks. Confidence does not need punctuation to prove itself.

### 1.3 Micro-Copy Tone
| Context | Preferred Wording |
|---------|-------------------|
| Cart empty state | "Your cart is resting." |
| Out of stock | "Currently unavailable. Let us notify you." |
| Guest checkout prompt | "Continue as guest — no account required." |
| Loading | "Preparing your experience…" |
| Add to cart confirmation | "Added." (with subtle haptic feedback) |

---

## 2. Color Palette

Inspired by Oroton's warm neutrals, Stripe's precision, and Coco Republic's editorial restraint. Xaf's palette is built on a dark-luxury foundation with a single warm-gold accent.

### 2.1 Primary Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--color-obsidian` | `#0A0A0B` | Background, dark surfaces |
| `--color-charcoal` | `#141416` | Cards, elevated surfaces |
| `--color-slate` | `#1E1E22` | Borders, dividers, secondary surfaces |
| `--color-fog` | `#8A8A96` | Secondary text, muted labels |
| `--color-cloud` | `#E8E6E3` | Body text, primary content |
| `--color-pure` | `#FFFFFF` | Headlines, maximum emphasis |

### 2.2 Accent: Warm Gold

| Token | Value | Usage |
|-------|-------|-------|
| `--color-gold` | `#C5A253` | CTA backgrounds, active states, selected swatches |
| `--color-gold-soft` | `#C5A25320` | Subtle hover overlays, background glows |
| `--color-gold-soft` | `#C5A25340` | Focus rings, active card borders |

**Usage rule:** Gold appears on no more than **3% of the viewport** at any time. Its scarcity is what makes it signal priority. Everything else is monochrome.

### 2.3 Semantic Colors (checkout & feedback)

| Token | Value | Usage |
|-------|-------|-------|
| `--color-success` | `#34C759` | Order confirmed, payment success |
| `--color-warning` | `#F0A500` | Low stock, delivery cutoff |
| `--color-error` | `#E5534B` | Validation errors, declined payments |

### 2.4 Tailwind Configuration

```ts
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        obsidian: '#0A0A0B',
        charcoal: '#141416',
        slate: '#1E1E22',
        fog: '#8A8A96',
        cloud: '#E8E6E3',
        pure: '#FFFFFF',
        gold: {
          DEFAULT: '#C5A253',
          soft: 'rgba(197,162,83,0.125)',
          medium: 'rgba(197,162,83,0.25)',
        },
      },
    },
  },
};
```

---

## 3. Typography System

A serif + sans-serif pairing borrowed from luxury editorial: **Newsreader** for headlines (the warm, slightly calligraphic serif), **Inter** for body (the neutral, perfectly legible sans). This combination is used by premium brands from Apple to Aesop.

### 3.1 Type Scale (mobile-first)

| Role | Font | Weight | Size | Line Height | Letter Spacing |
|------|------|--------|------|-------------|----------------|
| Display | Newsreader | 400 / italic | 36–44px | 1.1 | -0.02em |
| H1 — Page title | Newsreader | 500 | 28–32px | 1.15 | 0em |
| H2 — Section | Newsreader | 500 | 22–24px | 1.2 | 0em |
| H3 — Card title | Inter | 600 | 16–18px | 1.3 | 0em |
| Body | Inter | 400 | 15px | 1.6 | 0em |
| Caption / Label | Inter | 500 | 12px | 1.4 | 0.04em |
| Overline | Inter | 600 | 10px | 1.3 | 0.12em |

### 3.2 Font Pairing Rules
- **Serif headlines** carry brand personality and signal exclusivity.
- **Sans-serif body** ensures comfortable long-form reading on small screens.
- Use italic serif sparingly — only for editorial/quote surfaces, never for CTAs.
- Minimum type size on mobile: **12px** for captions, **15px** for body text.

### 3.3 Baseline Grid
All text sits on a **4px baseline grid**. Line heights are chosen so that multiples of 4 align perfectly. This invisible grid is what separates "designed" from "laid out."

### 3.4 Tailwind Config

```ts
fontFamily: {
  serif: ['var(--font-newsreader)', 'Georgia', 'serif'],
  sans: ['var(--font-inter)', 'Helvetica Neue', 'Arial', 'sans-serif'],
},
```

> *Sources: [Hooman Design](https://hooman.com/blogs/what-make-websites-expensive), [Oroton](https://www.oroton.com/), [Apple](https://www.apple.com/)*

---

## 4. Animation & Motion Guidelines

Motion at Xaf follows one rule: **every animation must earn its place**. Nothing moves unless it clarifies, confirms, or delights.

### 4.1 Philosophy

Animation is not decoration. It is:
- **Feedback** — "Yes, we registered your tap."
- **Orientation** — "Here is where the content came from; here is where it went."
- **Personality** — "This brand is considered, not careless."

### 4.2 Core Motion Principles

| Principle | Implementation |
|-----------|----------------|
| **Subtlety** | No animation exceeds 400ms for standard transitions; 150–250ms for micro-interactions. |
| **Easing** | `ease-out` for entrances (material arriving), `ease-in-out` for shared-element transitions. Spring physics only for playful surfaces (empty states, confirmations). |
| **Performance** | Animate only `transform` and `opacity`. Never animate `width`, `height`, `top`, `left`, `margin`, or `padding`. |
| **GPU first** | Use `will-change: transform` on animated elements; remove after animation ends. |
| **Respect users** | Honor `prefers-reduced-motion`. When set, all non-essential animation is replaced with instant state changes. |

### 4.3 Standard Transition Preset

```ts
// lib/animations/variants.ts
export const standardTransition = {
  duration: 0.35,
  ease: [0.25, 0.1, 0.25, 1], // cubic-bezier(0.25, 0.1, 0.25, 1)
};

export const springGentle = {
  type: 'spring',
  stiffness: 300,
  damping: 24,
  mass: 0.8,
};
```

### 4.4 Page Transitions

- **Route changes:** A shared-element fade + 20px vertical slide. The outgoing page fades down; the incoming page fades up. Duration: 350ms.
- **Tab switches:** Cross-fade only. No movement. Duration: 200ms.
- **Modal / sheet open:** Slide up from bottom with a 400ms spring curve. Backdrop fades in simultaneously at 250ms.
- **Modal / sheet close:** Reverse. Backdrop fades out first (150ms), then sheet retracts (250ms).

### 4.5 Product Card Interactions

| Trigger | Animation |
|---------|-----------|
| Card appears in grid | Staggered fade-up: each card delayed by 60ms from the previous. |
| Image hover (desktop) | Subtle scale(1.03) with shadow elevation. Duration: 200ms. |
| Add to cart tap | Button fills with gold (scale 0.97 pulse), then card lifts 4px briefly. |
| Swatch selected | Cross-fade image, swatch ring animates to gold. Duration: 150ms. |
| Wishlist heart | Scale bounce (spring), then fills gold. Duration: 300ms. |

### 4.6 Loading States

- **Skeleton shimmer:** A soft gradient sweeps left-to-right across placeholder shapes every 2 seconds. Duration: 1.5s, linear, infinite.
- **Image progressive load:** Blur-up using Next.js `placeholder="blur"` with a blurDataURL. The blur is removed at 90% load completion via an Intersection Observer.
- **Skeleton shapes:** Match the final layout card geometry exactly to prevent CLS.

### 4.7 Prohibited Motion
- No bouncing logos or spinning loaders.
- No marquee text.
- No confetti or particle effects on purchase completion (a subtle scale pulse on the confirmation checkmark is sufficient).
- No parallax on mobile — it causes scroll jank.

> *Sources: [Commerce-UI Microinteractions](https://commerce-ui.com/insights/motion-in-ecommerce-part-1-microinteractions), [Framer Motion + Tailwind 2025](https://dev.to/manukumar07/framer-motion-tailwind-the-2025-animation-stack-1801)*

---

## 5. Component Styling

Components are the grammar of the interface. They must be consistent, reusable, and quietly refined.

### 5.1 Design Principles
- **Generous touch targets:** All interactive elements are a minimum of **48×48px** (WCAG AAA mobile target).
- **Soft elevation, not hard shadows:** Use a layered shadow system — no single shadow is ever "flat black."
- **Rounded corners:** Consistent radii at the system level: `4px` (inputs), `12px` (cards), `16px` (modals, hero images), `9999px` (pills, chips).

### 5.2 Shadow System

| Level | Tailwind Classes | Usage |
|-------|-----------------|-------|
| Rest | `shadow-sm` (0 1px 2px rgba(0,0,0,0.3)) | Default cards, inputs |
| Raised | `shadow-md` (0 4px 12px rgba(0,0,0,0.4)) | Product cards, buttons on hover |
| Floating | `shadow-lg` (0 8px 24px rgba(0,0,0,0.5)) | Modals, bottom sheets, sticky header |
| Elevated | `shadow-xl` (0 16px 48px rgba(0,0,0,0.6)) | Full-screen overlays, expanded media |

### 5.3 Button Hierarchy

| Type | Style | Usage |
|------|-------|-------|
| **Primary** | Filled gold (`bg-gold text-obsidian`), full width on mobile, `rounded-xl`, 48px height | Add to cart, Checkout, Continue |
| **Secondary** | Outlined (`border border-fog/30 text-cloud`), same height | Add to wishlist, View details |
| **Ghost** | Text only, no border, `text-fog hover:text-cloud` | Cancel, Skip, Less info |
| **Destructive** | Filled `bg-error/10 text-error border border-error/20` | Remove item, Cancel order |

**All buttons have:** 48px minimum height, `tracking-wide` label, `active:scale-[0.97]` micro-interaction.

### 5.4 Card Styling

```
ProductCard
├── Container: bg-charcoal rounded-2xl overflow-hidden
├── Image area: aspect-[3/4] with object-cover
├── Content pad: p-4
├── Title: Inter 600 / 16px / text-cloud
├── Price: Inter 500 / 16px / text-pure
└── Swatches: flex row, 24px circles, 2px ring on selected
```

Cards rest in a **single-column list** on mobile (full-width, 16px horizontal padding, 16px vertical gap). Two-column grids are reserved for category browsing only.

### 5.5 Input Fields

- Background: `bg-slate`
- Border: `border border-slate` (default) / `border-gold` (focused)
- Text: `text-cloud` / `placeholder:text-fog`
- Radius: `rounded-xl`
- Height: 52px
- Focus state: gold border + 4px gold soft glow ring (`ring-2 ring-gold/20`)

### 5.6 Bottom Sheet / Action Sheet

- Container: `bg-charcoal rounded-t-3xl`
- Drag handle: centered, `w-10 h-1 bg-fog/40 rounded-full`, 12px from top
- Max height: 85vh
- Backdrop: `bg-obsidian/60 backdrop-blur-sm`

### 5.7 Navigation

- **Sticky header:** 56px height, `bg-obsidian/80 backdrop-blur-xl border-b border-slate/50`. Logo left, cart icon right. Transparent on hero, solid on scroll.
- **Bottom nav (5 items max):** 64px height, `bg-charcoal border-t border-slate`. Active item uses gold icon + label. 12px safe-area padding for iOS home indicator.

---

## 6. Layout Principles

### 6.1 The 8-Point Grid
Every dimension, spacing, and margin is a multiple of **8px**. This creates visual rhythm and ensures consistency across breakpoints.

### 6.2 Mobile Layout Canvas

```
┌────────────────────────────┐ 16px horizontal padding
│  Sticky Header (56px)      │
├────────────────────────────┤
│                            │
│  Hero / Content            │
│  (full bleed, 16px inset)  │
│                            │
│                            │
├────────────────────────────┤
│  Product Cards             │ 16px gap between cards
│  (full width)              │
│                            │
├────────────────────────────┤
│  Bottom Nav (64px)         │
└────────────────────────────┘
```

### 6.3 Whitespace as a Signal
- Hero sections breathe: 80–120px of vertical space above and below the primary message.
- Product card content is never cramped: 16px internal padding minimum.
- Section transitions use 40–64px of space to let the eye reset.
- **Clutter is the enemy of premium.** If a section feels full, remove an element before adding space.

### 6.4 Content Width
- No content exceeds **480px** centered on mobile. This is the comfortable reading range.
- Hero imagery and media break out to full bleed (−16px horizontal).
- Product grids use a single column on phones; two columns are only introduced at the `md` breakpoint (768px).

### 6.5 Visual Hierarchy Flow
Users scan in an **F-pattern** on mobile (top-left to bottom-right, with a strong horizontal first pass). Critical elements should align to:
1. **Top third** — category labels, search
2. **Center** — hero imagery, product titles
3. **Bottom third** — CTAs, prices, add-to-cart (thumb zone)

---

## 7. Mobile UX Priorities

Baymard's 2026 benchmarks show 75% of mobile e-commerce sites rate "Mediocre" or worse. Xaf targets the top 1%. These priorities are non-negotiable.

### 7.1 Thumb-Zone Optimization (P0)

The most important mobile UX principle. Everything a user needs most must live in the bottom third of the screen.

- **Primary CTA** (Add to cart, Checkout): Fixed bottom bar or sticky action sheet. Minimum height 64px, full width with 16px inset.
- **Secondary actions** (Wishlist, Share, Compare): Top-right in the sticky header.
- **Navigation:** Bottom tab bar, not a hamburger menu. Hamburger menus hide navigation and reduce discovery by 40%.
- **Reach mapping:**
  - Easy reach (bottom third): Cart, buy, continue
  - Stretch reach (middle third): Product details, reviews, size selector
  - Hard reach (top third): Search, menu, filters (promote search to easy reach via a bottom bar on category pages)

### 7.2 Guest Checkout (P0)

**62% of sites fail this. Xaf will not.**

- Guest Checkout is the **primary** and visually dominant option on the account selection screen.
- The "Create account" button is secondary — presented below guest flow.
- No password required for guest checkout.
- After purchase, optionally prompt: "Save your details for next time?" — never force it.

### 7.3 Delivery Date Display (P0)

Users don't care about "2 business days." They care about **"Thursday."**

- Display: "Delivers Thursday, August 20" — not "Ships in 2–3 business days."
- Add a countdown: "Order in the next 43 minutes for Thursday delivery."
- Show this on the product page *before* checkout, not hidden inside the flow.

### 7.4 Product Variation UX (P0)

**42% of mobile sites fail here. Xaf will not.**

- Show all color and size swatches **inline on the product card** in category listings.
- Tapping a swatch updates the image without navigation.
- Selected swatch has a 2px gold ring.
- Never make users tap "Select size" before seeing the price or adding to cart.

### 7.5 Cart Quantity Controls (P0)

**97% of mobile sites use plain text inputs. Xaf will not.**

- Use `+` / `−` stepper buttons alongside a controlled input field.
- Buttons are 44×44px with 48px total touch target.
- Default value is auto-cleared on focus so users don't accidentally submit "21" when they meant "2."
- Quantity updates are debounced 300ms and auto-submit on change.

### 7.6 Image Gallery & Reviews (P1)

- Swipeable thumbnail carousel under the hero image, using CSS scroll-snap (no JS library required for simple carousels).
- Long-press to zoom on product images. Release to dismiss.
- All reviewer-submitted photos load in a **single shared carousel** — not a separate one per review.
- 360° product view icon for eligible products.

### 7.7 Search & Discovery (P1)

- Search is accessible from **every** page via a dedicated bottom-bar icon (not hidden in a menu).
- Recent searches and trending queries appear in the search overlay.
- Filter panel slides in from the right (bottom sheet on mobile).
- Active filter count is shown as a gold badge on the filter icon.

### 7.8 Checkout Flow (P1)

| Step | Design Rule |
|------|-------------|
| Account | Guest CTA dominant. No password required. |
| Shipping | Show calendar date, not just speed. List pickup/delivery side-by-side. |
| Payment | Single-screen card form. Adaptive error messages ("Card number is incomplete"). |
| Review | Order summary + edit link for each section. No surprises at the last step. |
| Confirmation | Clean success state. Checkmark animation. Order number prominent. Delivery date repeated. |

### 7.9 Performance (P1 — Table Stakes)

A premium feel is impossible at 3-second load times.

- **LCP target:** < 2.0s on 4G mid-tier device.
- **INP target:** < 200ms (interactions feel instant).
- **CLS target:** < 0.1 (no layout shifts during load).
- **Image strategy:** WebP/AVIF with `priority` on hero, `loading="lazy"` on below-fold. Blur placeholder for every product image.
- **Bundle strategy:** Dynamic imports for below-fold components. Route-based code splitting is automatic in Next.js App Router.

### 7.10 Accessibility (P1)

- All interactive elements have visible focus states (gold ring).
- Color contrast: minimum 4.5:1 for body text, 3:1 for large text against background.
- Screen reader labels on icon-only buttons (`aria-label`).
- `prefers-reduced-motion` disables all non-essential animation.
- Form inputs have associated labels (not just placeholders).

---

## 8. Technical Architecture Reference

### 8.1 Tailwind Token Strategy

All design decisions should be expressed as **Tailwind utilities**, not bespoke CSS classes. Create a single `@theme` block in `globals.css` for brand tokens. Extend in `tailwind.config.ts` for animations and keyframes only.

### 8.2 Component Directory Structure

```
src/
  app/                       # Next.js App Router pages
    (shop)/                  # Product, category, search routes
    (checkout)/              # Cart, address, payment routes
    (account)/               # Orders, profile, settings
  components/
    ui/                      # Primitives: Button, Input, Badge, Sheet, Skeleton
    product/                 # ProductCard, ImageGallery, SwatchGroup, ReviewCarousel
    checkout/                # CartSheet, AddressForm, PaymentStep, DeliveryPicker
    layout/                  # StickyHeader, BottomNav, SkeletonLoader, PageTransition
  lib/
    animations/              # Framer Motion variants, spring configs, page transitions
    hooks/                   # useCart, useCheckout, useThrottle, useReducedMotion
  styles/
    globals.css              # Tailwind directives + custom keyframes + @theme block
```

### 8.3 Animation Tooling

Use **Framer Motion** (package: `motion`) for all React-level animation. Tailwind animations handle CSS-only shimmer and fade effects. Never reach for GSAP or CSS-in-JS animation libraries — they add bundle weight for no measurable benefit in this context.

---

## 9. Design Quality Checklist

Before any feature ships, confirm:

- [ ] Does it feel slower than 200ms to respond to a tap?
- [ ] Is there a moment where the user might feel "lost" without scrolling?
- [ ] Does any element compete with the primary CTA for attention?
- [ ] Would a color-blind user understand the status being communicated?
- [ ] Does the page still feel premium at 2x zoom (accessibility)?
- [ ] Is there any animation that doesn't serve a purpose? Remove it.
- [ ] Did we use the 8-point grid for every spacing value?
- [ ] Is the type hierarchy clear without relying on color alone?

---

## 10. Inspiration & References

| Reference | Lesson for Xaf |
|-----------|----------------|
| **Oroton** | Warm neutrals + generous whitespace = timeless luxury. |
| **Apple** | Product-first layouts, no visual noise, delivery-date clarity. |
| **Coco Republic** | Editorial layout, high-end showroom feeling, dimensional imagery. |
| **Paul Fredrick** | Bespoke previews and customization create a "tailored" digital experience. |
| **Everlane** | Transparency storytelling — cost breakdowns, supply chain — builds trust. |
| **Baymard 2026** | Mobile UX benchmarks. Xaf targets the top 1% by fixing guest checkout, delivery dates, and variation handling. |

> *Sources: [BigCommerce Best Ecommerce Design 2026](https://www.bigcommerce.com/articles/ecommerce/best-ecommerce-website-design/), [Awwwards E-Commerce](https://www.awwwards.com/websites/e-commerce/), [Baymard Mobile UX 2026](https://baymard.com/blog/mobile-ux-ecommerce)*

---

## 11. Implementation Roadmap

| Phase | Focus | Key Deliverables |
|-------|-------|-----------------|
| **1. Foundation** | Design system + performance | Tailwind token config, font pipeline, Next.js Image, skeleton loaders, 8-point grid enforcement. |
| **2. Product UX** | Discovery + presentation | Combined variation swatches, swipeable galleries, thumb-zone CTAs, reviewer-image carousel. |
| **3. Animation** | Motion design | Framer Motion page transitions, staggered reveals, hover micro-interactions, spring-physics modals. |
| **4. Checkout** | Conversion optimization | Prominent guest checkout, adaptive validation, delivery-date display, countdown cutoffs, fulfillment switcher. |
| **5. Polish** | Award-winning finish | Editorial typography tuning, glassmorphism accents, performance audit (LCP < 2s), accessibility pass. |

---

*This document is the north star for Xaf's visual and interaction design. Every component, page, and micro-decision should trace back to the principles defined here. When in doubt, choose the more restrained option.*

*Compiled for the Xaf Mobile E-Commerce project. References analyst-research.md and shared-context.md.*
