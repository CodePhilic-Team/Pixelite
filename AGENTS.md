# AGENTS.md

> Frontend architecture guide — pages, sections, components, and build order.
> For project-wide conventions, fonts, colors, and tooling see [CLAUDE.md](./CLAUDE.md).

This file documents **what to build, in what order, and how each piece fits together**.
It is the construction blueprint. CLAUDE.md is the style guide.

---

## Build Order

Follow this sequence. Each phase produces working, shippable code before the next begins.

```
Phase 1 — Foundation         (setup, tokens, primitives)
Phase 2 — Layout Shell       (Navbar, Footer, PageWrapper)
Phase 3 — Homepage           (Hero → Marquee → Features → Categories → Newsletter)
Phase 4 — Product Listing    (grid, filters, cards)
Phase 5 — Product Detail     (gallery, info, options, cart add)
Phase 6 — Cart & Wishlist    (drawer, page, state)
Phase 7 — Supporting Pages   (About, Checkout shell)
Phase 8 — Polish             (animations, skeletons, a11y audit, perf)
```

---

## Phase 1 — Foundation

### 1.1 Project Bootstrap

```bash
npx create-next-app@latest . \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir=false \
  --import-alias="@/*"

npm install framer-motion lucide-react zustand clsx tailwind-merge \
            react-hook-form zod @hookform/resolvers
```

### 1.2 Tailwind Config

Full `tailwind.config.ts` — define all tokens here, reference everywhere:

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      // ── Colors (mapped from CSS variables) ──────────────────
      colors: {
        ivory:        "var(--color-ivory)",
        cream:        "var(--color-cream)",
        stone:        "var(--color-stone)",
        "warm-gray":  "var(--color-warm-gray)",
        charcoal:     "var(--color-charcoal)",
        ink:          "var(--color-ink)",
        gold:         "var(--color-gold)",
        "gold-light": "var(--color-gold-light)",
      },

      // ── Font families ────────────────────────────────────────
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body:    ["var(--font-body)", "system-ui", "sans-serif"],
        mono:    ["var(--font-mono)", "monospace"],
      },

      // ── Spacing ──────────────────────────────────────────────
      spacing: {
        "section":    "6rem",
        "section-sm": "3.5rem",
        "18":         "4.5rem",
        "22":         "5.5rem",
      },

      // ── Max widths ───────────────────────────────────────────
      maxWidth: {
        site: "1440px",
        copy: "68ch",
      },

      // ── Aspect ratios ────────────────────────────────────────
      aspectRatio: {
        "product":   "4 / 5",   // standard product card image
        "hero":      "16 / 9",  // hero and banner images
        "editorial": "3 / 4",   // tall editorial/fashion crops
        "square":    "1 / 1",
      },

      // ── Transitions ──────────────────────────────────────────
      transitionTimingFunction: {
        "smooth-out": "cubic-bezier(0.22, 1, 0.36, 1)",
      },

      // ── Typography scale ─────────────────────────────────────
      fontSize: {
        "2xs": ["0.65rem", { lineHeight: "1rem" }],
        "display-2xl": ["4.5rem",  { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-xl":  ["3.75rem", { lineHeight: "1.1",  letterSpacing: "-0.02em" }],
        "display-lg":  ["3rem",    { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        "display-md":  ["2.25rem", { lineHeight: "1.2",  letterSpacing: "-0.01em" }],
      },
    },
  },
  plugins: [],
};

export default config;
```

### 1.3 Global CSS

```css
/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* ── CSS Custom Properties ──────────────────────────────────────── */
:root {
  --color-ivory:      #F8F5F0;
  --color-cream:      #EDE8DF;
  --color-stone:      #C8BFB0;
  --color-warm-gray:  #8C8479;
  --color-charcoal:   #2C2926;
  --color-ink:        #0F0D0B;
  --color-gold:       #B89A60;
  --color-gold-light: #D4B97A;
}

/* ── Base resets & defaults ─────────────────────────────────────── */
@layer base {
  html {
    @apply scroll-smooth;
    background-color: var(--color-ivory);
    color: var(--color-charcoal);
    font-family: var(--font-body), system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Remove default focus outline; custom visible ring applied per-component */
  *:focus { outline: none; }
  *:focus-visible {
    @apply ring-2 ring-gold ring-offset-2 ring-offset-ivory rounded-sm;
  }

  /* Scrollbar — subtle, matching palette */
  ::-webkit-scrollbar       { width: 6px; }
  ::-webkit-scrollbar-track { background: var(--color-cream); }
  ::-webkit-scrollbar-thumb { background: var(--color-stone); border-radius: 3px; }
}
```

### 1.4 Root Layout

```tsx
// app/layout.tsx
import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import localFont from "next/font/local";
import "@/app/globals.css";

const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-display",
  display: "swap",
});

const bodyFont = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const monoFont = localFont({
  src: "../public/fonts/GeistMono-Regular.woff2",
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "Store Name", template: "%s | Store Name" },
  description: "Premium curated goods.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
```

---

## Phase 2 — Layout Shell

### Navbar

**Behavior:**
- Transparent with white text on the hero (homepage)
- Becomes `bg-ivory/95 backdrop-blur-md` with dark text on scroll
- Re-appears when scrolling up (hide on scroll-down pattern)
- Hamburger menu below `md:` breakpoint → `<MobileMenu>` full-screen drawer

**Structure:**
```
[Logo]                    [Nav links — hidden on mobile]    [Cart icon + count] [Search icon] [Hamburger]
```

**Logo:** Display font (Cormorant Garamond), tracked-widest, all-caps if wordmark.

**Cart icon:** Shows a small badge with item count from Zustand. Clicking opens `<CartDrawer>`.

### Footer

Three-column on desktop, stacked on mobile:
```
Col 1: Logo + short tagline + social icons (Instagram, Pinterest — stroke icons)
Col 2: Navigation links — Shop · Collections · About · Contact
Col 3: Newsletter mini-form + "Free shipping on orders over $X"
```
Footer background: `bg-ink` text: `text-stone` / `text-ivory`. Gold accent on hover links.

### PageWrapper

```tsx
// Wraps every page body — consistent horizontal padding, max-width centering,
// and a subtle opacity fade-in on mount.
<main className="mx-auto w-full max-w-site px-4 sm:px-6 lg:px-10 xl:px-16">
  {children}
</main>
```

---

## Phase 3 — Homepage

### HeroSection

**Layout:** Full viewport height (`min-h-screen`). Image fills the background with `object-cover`.
Dark overlay (`bg-ink/30`) for text legibility.

**Content (centered or left-aligned):**
```
[Eyebrow text — small, body font, tracked-wide, gold color]
[Main headline — display font, 3xl → display-xl, white, light weight]
[Sub-headline — body font, warm-gray, max 60ch]
[CTA button — outline variant, white border, hover: filled ivory]
```

**Image path:** `/images/hero/hero-main.jpg` — full-bleed editorial lifestyle photo.

**Animation:** Headline words fade in with stagger (50ms delay each). CTA fades in last.
On mobile, reduce font size and use `section-sm` padding.

### Marquee

Infinite horizontal scroll strip. CSS-only animation — no JS:

```tsx
// Pauses on hover. Respects prefers-reduced-motion.
// Items: "Free Worldwide Shipping" · "Sustainably Crafted" · "New Arrivals Weekly" · ...
// Separator: a small gold diamond "◆" between items
```

Background: `bg-cream`. Text: `font-body text-xs tracking-widest uppercase text-charcoal`.

### FeaturedCollection

Three products in an asymmetric grid:

```
Desktop:
┌──────────────────┬────────────┐
│                  │  Product 2 │
│   Product 1      │            │
│   (tall / 2-row) ├────────────┤
│                  │  Product 3 │
└──────────────────┴────────────┘

Mobile: Stacked vertically, full width
```

Each item: large image, product name (display font), price (mono), "Shop Now →" ghost link.
**Image paths:** `/images/products/{slug}-hero.jpg`

### CategoryGrid

2 or 3 editorial tiles. Each tile:
- Full-width image background (cover, object-center)
- Dark overlay on hover
- Category name in display font, centered, white
- Hover: name underline animates in from left

**Image paths:** `/images/categories/{category-slug}.jpg`

### NewsletterBanner

Full-width section. Background: `bg-ink`. Text: `text-ivory`.

```
[Large display-font headline — "Stay in the know"]
[Sub-copy — body font, warm-gray]
[Email input + Submit button — side by side on desktop, stacked on mobile]
[Fine print: "No spam. Unsubscribe anytime."]
```

Input: `bg-transparent border-b border-stone text-ivory placeholder:text-warm-gray`.
Button: `bg-gold text-ink font-body text-sm tracking-wide` hover: `bg-gold-light`.

---

## Phase 4 — Product Listing

### URL & Filter State

Filters live in URL search params — bookmarkable and shareable:

```
/shop?sort=price-asc&category=bags&tag=leather
```

Read with `useSearchParams()`. Update with `router.replace()` — no page reload.

### Filter/Sort Bar

Sticky below navbar. Contains:
- Category pills (Tag components) — selected: `bg-charcoal text-ivory`, default: `bg-cream text-charcoal`
- Sort dropdown — "Featured · Newest · Price: Low to High · Price: High to Low"
- Item count ("42 products")

### ProductGrid

```tsx
<section className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 xl:grid-cols-4 xl:gap-8">
  {products.map((product, i) => (
    <AnimatedSection key={product.id} delay={i * 0.05}>
      <ProductCard product={product} />
    </AnimatedSection>
  ))}
</section>
```

Stagger delay capped at 0.3s total — no more than 6 items staggered, rest appear instantly.

---

## Phase 5 — Product Detail Page

### Layout

```
Desktop (lg:):
┌───────────────────────────────┬─────────────────────────┐
│  ProductImages (55%)          │  ProductInfo (45%)       │
│  • Thumbnail strip (left)     │  • Breadcrumb            │
│  • Main image (right, zoom)   │  • Brand (if any)        │
│                               │  • Name (display font)   │
│                               │  • Price (mono)          │
│                               │  • Short description     │
│                               │  • ProductOptions        │
│                               │  • Add to Cart button    │
│                               │  • Wishlist + Share      │
└───────────────────────────────┴─────────────────────────┘
[Full description accordion]
[RelatedProducts]
```

Mobile: Images stacked full-width → Info panel → Sticky bottom bar with price + Add to Cart.

### ProductImages

- Thumbnail strip: left-aligned vertical list (desktop), horizontal scroll (mobile)
- Main image: click opens full-screen lightbox (`<Modal>`)
- Zoom on hover (desktop): CSS `transform-origin: cursor position` or a simple lightbox

### ProductOptions

```tsx
// Size selector — buttons in a row
// Selected: bg-charcoal text-ivory border-charcoal
// Unselected: bg-transparent text-charcoal border-stone hover:border-charcoal
// Out of stock: opacity-40 cursor-not-allowed line-through
```

Color selector: circular swatches with border on selected.

### Mobile Sticky Bar

```tsx
// Appears when the main "Add to Cart" button is scrolled off-screen
// Fixed bottom-0, full-width, bg-ivory border-t border-stone
// [Price — mono] [Add to Cart — full remaining width]
```

---

## Phase 6 — Cart & Wishlist

### CartDrawer

Triggered by cart icon in Navbar. Opens from the right.

```
Header: "Your Cart (3)" + Close button (X)
─────────────────────────────────────────
CartItem × N:
  [Image 80×80] [Name] [Variant]
                [Qty stepper −/+] [Price]
                [Remove link]
─────────────────────────────────────────
CartSummary:
  Subtotal: $XXX
  [Checkout button — primary, full width]
  [Continue Shopping — ghost, full width]
```

CartItem image: `next/image` 80×80, `object-cover`, rounded.

### Wishlist

Page at `/wishlist`. Same `<ProductGrid>` layout but with a "Remove" button instead of wishlist toggle. Empty state: editorial illustration (SVG) + "Your wishlist is empty" + CTA to shop.

---

## Phase 7 — Supporting Pages

### About Page

Sections:
1. Full-bleed header image with overlay + "Our Story" headline
2. Brand story copy — display font for pull quotes, body font for paragraphs
3. Values grid — 3 icons + short text (Craftsmanship · Sustainability · Timelessness)
4. Team / maker portraits (if applicable)
5. CTA → Shop

### Checkout Page (shell only — no payment)

Linear single-column form:
1. Contact (email)
2. Shipping address
3. Shipping method selector
4. Order summary sidebar (sticky on desktop)
5. "Place Order" button — disabled until form is valid (Zod schema)

All validated with React Hook Form + Zod. No actual payment processing in frontend-only phase.

---

## Phase 8 — Polish

### Skeletons

Every data-dependent section has a skeleton loading state:

```tsx
// ProductCard skeleton — matches exact dimensions of the real card
<div className="flex flex-col">
  <div className="aspect-[4/5] bg-cream animate-pulse rounded-sm" />
  <div className="mt-3 h-4 w-3/4 bg-cream animate-pulse rounded" />
  <div className="mt-1 h-4 w-1/3 bg-cream animate-pulse rounded" />
</div>
```

### 404 Page

`app/not-found.tsx` — on-brand, minimal:
- Large serif "404" in display font
- Short message
- Link back to Shop

### Loading States

`app/(store)/loading.tsx` — skeleton grid matching the page layout, so there's no blank flash.

### Accessibility Audit Checklist

Before marking Phase 8 complete, verify:

- [ ] Tab through every page — all interactive elements reachable in logical order
- [ ] Screen reader announces cart item count changes (`aria-live="polite"`)
- [ ] All form inputs have visible labels (not just placeholders)
- [ ] Cart drawer is `role="dialog"` with `aria-modal="true"` and `aria-label`
- [ ] Images with no informational value use `alt=""`
- [ ] Skip-to-content link at top of page
- [ ] All color combinations pass contrast ratio check

### Performance Checklist

- [ ] Lighthouse score ≥ 90 on mobile for Performance, Accessibility, Best Practices, SEO
- [ ] No images missing `sizes` attribute
- [ ] No Cumulative Layout Shift (CLS) — all images have aspect-ratio wrappers
- [ ] Fonts preloaded: `<link rel="preload" as="font" …>` in `<head>`
- [ ] No unused Tailwind classes — `content` array in tailwind.config is precise

---

## Image Path Conventions

When adding real images, follow this naming convention exactly — components reference these paths:

```
public/images/
├── hero/
│   ├── hero-main.jpg          # Homepage hero (recommend ≥ 2400px wide)
│   └── hero-about.jpg         # About page header
├── products/
│   ├── {slug}-01.jpg          # Primary product image
│   ├── {slug}-02.jpg          # Gallery image 2
│   ├── {slug}-03.jpg          # Gallery image 3
│   └── {slug}-hero.jpg        # Large featured image (FeaturedCollection)
├── categories/
│   ├── {category-slug}.jpg    # Category tile background
│   └── shop-all.jpg           # "All products" tile
└── brand/
    ├── logo.svg
    ├── logo-light.svg          # White version for dark backgrounds
    └── og-image.jpg           # 1200×630 Open Graph image
```

All product image files should be **high quality JPG** (quality 85+), minimum 1200px on the longest side, with a neutral/white or warm lifestyle background that complements the palette.

---

## Component Build Checklist

Use this as a PR checklist when completing any component:

- [ ] TypeScript — no `any`, all props typed and exported
- [ ] Mobile — tested at 375px, 390px, 430px widths
- [ ] Tablet — tested at 768px, 1024px
- [ ] Desktop — tested at 1280px, 1440px
- [ ] Hover states present and intentional
- [ ] Focus states visible (`focus-visible`)
- [ ] Reduced motion respected (Framer Motion `useReducedMotion`)
- [ ] Skeleton/loading state implemented if component fetches data
- [ ] `next/image` used for all images
- [ ] JSDoc comment on component and any non-obvious props
- [ ] No hardcoded colors — Tailwind tokens only
- [ ] No inline styles