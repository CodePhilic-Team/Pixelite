# CLAUDE.md

> **Read this file first.** It is the single source of truth for how this codebase is structured,
> styled, and built. For AI agent architecture see [AGENTS.md](./AGENTS.md).

---

## Project Overview

A **premium, elite-tier e-commerce storefront** built with Next.js 15 (App Router) + TypeScript.
**Frontend only** — no backend, no database. All data is mocked/static for now, structured so it
can be swapped for real API calls later with zero component changes.

### Design Language

The aesthetic is **luxury editorial** — think high-fashion retail meets a curated art gallery.

- **Palette:** Muted warm neutrals — off-white ivory, warm cream, deep charcoal, obsidian ink.
  Single accent: champagne gold. Zero purple. Zero generic gradients.
- **Typography:** Three-font system — serif display for headlines, clean sans for UI, mono for
  prices and labels. Each has a purpose; never mix them casually.
- **Motion:** Intentional, restrained. Scroll reveals, image hovers, drawer slides. Not decorative noise.
- **Images:** Full-bleed, high-quality. Images are the product. Design around them, not over them.
- **Mobile:** Designed mobile-first. Every layout decision starts at 375px and scales up.

---

## Tech Stack

| Layer       | Technology                          | Notes                                        |
|-------------|-------------------------------------|----------------------------------------------|
| Framework   | Next.js 15 — App Router             | SSG by default, SSR/ISR where dynamic        |
| Language    | TypeScript 5 — strict mode          | No `any`. No exceptions.                     |
| Styling     | Tailwind CSS 3 + CSS custom props   | Design tokens in `tailwind.config.ts`        |
| Fonts       | `next/font` (Google + local)        | Cormorant Garamond · DM Sans · Geist Mono    |
| Animation   | Framer Motion                       | Scroll reveals, page transitions, drawers    |
| Icons       | Lucide React                        | Stroke-based, consistent weight              |
| Images      | `next/image`                        | Always. Never raw `<img>`.                   |
| State       | Zustand + `persist` middleware      | Cart, wishlist, UI panels                    |
| Forms       | React Hook Form + Zod               | Checkout fields, newsletter, search          |
| Utilities   | clsx + tailwind-merge               | Conditional class merging via `cn()`         |
| Linting     | ESLint + Prettier + Husky           | Enforced on commit via lint-staged           |

---

## Repository Structure

```
.
├── app/
│   ├── (store)/                    # Storefront route group
│   │   ├── layout.tsx              # Shared layout: Navbar + Footer
│   │   ├── page.tsx                # Homepage
│   │   ├── shop/
│   │   │   ├── page.tsx            # Full product listing / collection
│   │   │   └── [category]/
│   │   │       └── page.tsx        # Category-filtered listing
│   │   ├── product/
│   │   │   └── [slug]/
│   │   │       └── page.tsx        # Product detail page (PDP)
│   │   ├── cart/
│   │   │   └── page.tsx            # Cart page (mobile fallback)
│   │   ├── checkout/
│   │   │   └── page.tsx
│   │   ├── wishlist/
│   │   │   └── page.tsx
│   │   └── about/
│   │       └── page.tsx
│   ├── layout.tsx                  # Root layout — fonts, providers, metadata
│   └── globals.css                 # CSS variables + Tailwind base layer
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx              # Sticky, transparent → solid on scroll
│   │   ├── Footer.tsx
│   │   ├── MobileMenu.tsx          # Full-screen slide-in drawer
│   │   └── PageWrapper.tsx         # Consistent padding + fade-in on mount
│   │
│   ├── ui/                         # Atomic primitives — no business logic
│   │   ├── Button.tsx              # variants: primary | outline | ghost | icon
│   │   ├── Badge.tsx               # "New" · "Sale" · "Limited" labels
│   │   ├── Divider.tsx             # Decorative horizontal rule
│   │   ├── Tag.tsx                 # Filter / category tags
│   │   └── Typography.tsx          # Heading · Body · Label · Price
│   │
│   ├── product/
│   │   ├── ProductCard.tsx         # Grid card — hover reveals quick-add
│   │   ├── ProductGrid.tsx         # Responsive grid wrapper
│   │   ├── ProductImages.tsx       # PDP gallery — thumbnails + zoom
│   │   ├── ProductInfo.tsx         # PDP: name, price, description
│   │   ├── ProductOptions.tsx      # Size / color / material variant selector
│   │   ├── ProductBadge.tsx        # Overlaid "New" / "Bestseller" chips
│   │   └── RelatedProducts.tsx     # Horizontal-scroll product strip
│   │
│   ├── cart/
│   │   ├── CartDrawer.tsx          # Slide-in side panel (right)
│   │   ├── CartItem.tsx
│   │   └── CartSummary.tsx
│   │
│   ├── home/
│   │   ├── HeroSection.tsx         # Full-viewport hero, image bg, headline + CTA
│   │   ├── FeaturedCollection.tsx  # 3 hero products, large imagery
│   │   ├── CategoryGrid.tsx        # 2×2 or 3-col editorial category tiles
│   │   ├── Marquee.tsx             # Scrolling feature-strip (infinite CSS)
│   │   ├── Testimonials.tsx        # Minimal quote cards
│   │   └── NewsletterBanner.tsx    # Full-width dark band, single email input
│   │
│   └── shared/
│       ├── ImageWithFallback.tsx   # next/image + skeleton while loading
│       ├── AnimatedSection.tsx     # Scroll-reveal wrapper (Framer Motion)
│       ├── Modal.tsx               # Focus-trapped modal dialog
│       └── Skeleton.tsx            # Skeleton variants for cards, text, images
│
├── lib/
│   ├── data/                       # Mock data — swap for API calls later
│   │   ├── products.ts
│   │   ├── categories.ts
│   │   └── testimonials.ts
│   ├── store/                      # Zustand stores
│   │   ├── cart.store.ts
│   │   └── wishlist.store.ts
│   ├── hooks/
│   │   ├── useScrollDirection.ts   # Returns "up" | "down"
│   │   ├── useMediaQuery.ts        # SSR-safe breakpoint detection
│   │   └── useCart.ts              # Cart actions + derived state
│   ├── utils/
│   │   ├── cn.ts                   # clsx + twMerge helper
│   │   ├── formatPrice.ts          # Intl.NumberFormat currency helper
│   │   └── slugify.ts
│   └── types/
│       ├── product.ts
│       ├── cart.ts
│       └── category.ts
│
├── public/
│   └── images/                     # All static image assets
│       ├── hero/                   # Homepage hero images
│       ├── products/               # Product photos — name by slug: {slug}-01.jpg
│       ├── categories/             # Category tile backgrounds
│       └── brand/                  # Logo, favicon, OG images
│
├── styles/
│   └── animations.css              # Reusable @keyframes (marquee, shimmer, etc.)
│
├── tailwind.config.ts              # Full design-token configuration
├── CLAUDE.md                       # ← you are here
└── AGENTS.md                       # AI agent docs (unused in pure frontend)
```

---

## Design System

### Color Palette

All colors are CSS custom properties. Never hardcode hex values in components.

```css
/* app/globals.css */
:root {
  /* ─── Neutrals (primary palette) ─────────────────────────── */
  --color-ivory:       #F8F5F0;   /* page background              */
  --color-cream:       #EDE8DF;   /* card bg, hover surfaces      */
  --color-stone:       #C8BFB0;   /* borders, dividers            */
  --color-warm-gray:   #8C8479;   /* secondary text, captions     */
  --color-charcoal:    #2C2926;   /* primary body text            */
  --color-ink:         #0F0D0B;   /* headings, max contrast       */

  /* ─── Accent (use sparingly) ─────────────────────────────── */
  --color-gold:        #B89A60;   /* prices, CTA borders, rules   */
  --color-gold-light:  #D4B97A;   /* hover state of gold          */

  /* ─── Semantic aliases ────────────────────────────────────── */
  --color-surface:     var(--color-ivory);
  --color-text:        var(--color-charcoal);
  --color-text-muted:  var(--color-warm-gray);
  --color-border:      var(--color-stone);
  --color-accent:      var(--color-gold);
}
```

Map these in `tailwind.config.ts`:

```ts
colors: {
  ivory:      "var(--color-ivory)",
  cream:      "var(--color-cream)",
  stone:      "var(--color-stone)",
  "warm-gray":"var(--color-warm-gray)",
  charcoal:   "var(--color-charcoal)",
  ink:        "var(--color-ink)",
  gold:       "var(--color-gold)",
  "gold-light":"var(--color-gold-light)",
},
```

### Font System

| Role        | Typeface              | Tailwind class   | Used for                                          |
|-------------|-----------------------|------------------|---------------------------------------------------|
| **Display** | Cormorant Garamond    | `font-display`   | Hero headings, section titles, pull quotes        |
| **Body**    | DM Sans               | `font-body`      | Nav, descriptions, UI copy, buttons, labels       |
| **Mono**    | Geist Mono            | `font-mono`      | Prices, SKUs, size/quantity labels, numeric data  |

```ts
// app/layout.tsx — font setup
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import localFont from "next/font/local";

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

// Download GeistMono and place in public/fonts/
const monoFont = localFont({
  src: "../public/fonts/GeistMono-Regular.woff2",
  variable: "--font-mono",
  display: "swap",
});

// Apply all three to <html>:
// className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}
```

### Spacing & Layout Tokens

```ts
// tailwind.config.ts — extend.spacing
spacing: {
  "section": "6rem",     // section vertical padding (desktop)
  "section-sm": "3.5rem", // section vertical padding (mobile)
  "18": "4.5rem",
  "22": "5.5rem",
},
maxWidth: {
  "site":  "1440px",     // max content width
  "copy":  "68ch",       // prose line length cap
},
```

---

## Animation Principles

> Every animation must earn its place. When in doubt, remove it.

| Animation type   | Approach                              | Rule                                                  |
|------------------|---------------------------------------|-------------------------------------------------------|
| Scroll reveal    | Framer Motion `whileInView`           | Fade + 20px Y-translate. One reusable `<AnimatedSection>` |
| Page transitions | Framer Motion `AnimatePresence`       | Opacity fade only — no slides between pages           |
| Hover: images    | Tailwind `group-hover:scale-105`      | `duration-500 ease-out`. Never more than 5% scale.    |
| Hover: text/links| CSS `transition-colors`               | Color shift only. 200ms.                              |
| Navbar           | `useScrollDirection` + CSS classes    | Transparent → solid/backdrop-blur on scroll           |
| Cart drawer      | Framer Motion `x` translate           | Slides from right. 350ms ease-in-out.                 |
| Skeleton loading | CSS `@keyframes shimmer`              | Soft left-to-right shimmer                            |
| Marquee          | CSS `@keyframes marquee` (infinite)   | Pause on hover                                        |

**Standard reveal config** — copy this exactly:

```ts
// components/shared/AnimatedSection.tsx
const variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};
// viewport: { once: true, margin: "-80px" }
```

**Do NOT:**
- Use spring/bounce/elastic animations on any product UI
- Animate on every mouse move (only on hover enter/leave)
- Stagger siblings more than 80ms apart
- Add motion to text that a user needs to read immediately
- Skip `useReducedMotion()` — always respect it

```ts
// Pattern for respecting prefers-reduced-motion
import { useReducedMotion } from "framer-motion";
const prefersReduced = useReducedMotion();
const motionProps = prefersReduced ? {} : { variants, initial: "hidden", whileInView: "visible" };
```

---

## Component Rules

### Naming & Structure

```
ComponentName.tsx         — one component per file
ComponentName.test.tsx    — co-located unit test
```

- Props interface defined above the component, always exported
- JSDoc comment above any non-trivial prop
- No inline `style={{}}` — Tailwind only
- Always use `cn()` for conditional classes

### The `cn()` utility

```ts
// lib/utils/cn.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes safely, resolving conflicts last-writer-wins. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### Images

- Always `next/image` with explicit `width`+`height` OR `fill` inside a sized parent
- Every `<Image>` has a meaningful, descriptive `alt` attribute
- Wrap in `<ImageWithFallback>` for any user-facing image (shows skeleton until loaded)
- Images named by slug: `/images/products/{slug}-01.jpg`, `{slug}-02.jpg`, etc.

### Buttons

```tsx
<Button variant="primary">Add to Cart</Button>        // filled charcoal, gold on hover
<Button variant="outline">View Collection</Button>     // border only, fill on hover
<Button variant="ghost">See Details →</Button>         // text, animated underline
<Button variant="icon" aria-label="Wishlist">          // icon-only, no bg
  <Heart size={18} />
</Button>
```

---

## Page Architecture

### Homepage section order (do not change without design review)

1. `<HeroSection />` — full-viewport, image background, large serif headline + CTA
2. `<Marquee />` — "Free shipping · Handcrafted · Sustainably sourced · New arrivals ·"
3. `<FeaturedCollection />` — 3 signature products, large imagery, minimal text
4. `<CategoryGrid />` — 2-up or 3-up editorial tiles, each with an image background
5. `<AnimatedSection>` + secondary product row (4 cards)
6. `<Testimonials />` — minimal quote cards, initials only (no star ratings above fold)
7. `<NewsletterBanner />` — full-width dark section, single email input + submit

### Product Listing (`/shop`, `/shop/[category]`)

- Filter/sort bar sticks below navbar on scroll
- Grid: 2 columns on mobile → 3 on `md:` → 4 on `xl:`
- Filter state stored in URL search params: `?sort=price-asc&category=bags`
- Paginated by default; upgrade to infinite scroll as an enhancement

### Product Detail Page (`/product/[slug]`)

Desktop (side-by-side):
- Left 55%: `<ProductImages />` — stacked thumbs + large main, click-to-zoom
- Right 45%: `<ProductInfo />`, `<ProductOptions />`, Add to Cart

Mobile (stacked):
- Images first, full width
- Info panel below
- Sticky bottom bar: price + "Add to Cart" button when main button is off-screen

Below the fold (both):
- Full description in collapsible accordion
- `<RelatedProducts />` horizontal scroll strip

---

## TypeScript Types

```ts
// lib/types/product.ts

export interface Product {
  id:                     string;
  slug:                   string;
  name:                   string;
  brand?:                 string;
  /** Price in cents — e.g. 14900 = $149 */
  priceInCents:           number;
  /** Original price for sale items */
  compareAtPriceInCents?: number;
  images:                 ProductImage[];
  category:               string;
  tags:                   string[];
  shortDescription:       string;
  description:            string;  // rich text / markdown
  variants:               ProductVariant[];
  isNew?:                 boolean;
  isBestseller?:          boolean;
  stock:                  number;
}

export interface ProductImage {
  src: string;   // path relative to /public — e.g. "/images/products/bag-01.jpg"
  alt: string;
}

export interface ProductVariant {
  id:      string;
  label:   string;             // "S" | "M" | "Ivory" | "42"
  type:    "size" | "color" | "material";
  inStock: boolean;
}
```

```ts
// lib/utils/formatPrice.ts

/**
 * Format a price in cents to a localized currency string.
 * @example formatPrice(14900) → "$149"
 * @example formatPrice(14950) → "$149.50"
 */
export function formatPrice(cents: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
  }).format(cents / 100);
}
```

---

## State Management (Zustand)

### Cart Store

```ts
// lib/store/cart.store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  productId:    string;
  variantId:    string;
  name:         string;
  imageSrc:     string;
  priceInCents: number;
  quantity:     number;
}

interface CartState {
  items:    CartItem[];
  isOpen:   boolean;
  // Actions
  openCart:       () => void;
  closeCart:      () => void;
  addItem:        (item: Omit<CartItem, "quantity">) => void;
  removeItem:     (productId: string, variantId: string) => void;
  updateQuantity: (productId: string, variantId: string, qty: number) => void;
  clearCart:      () => void;
  // Derived
  totalItems:      () => number;
  subtotalInCents: () => number;
}
```

Cart persists across page reloads via `localStorage`.

---

## Accessibility (WCAG 2.1 AA — non-negotiable)

- All interactive elements keyboard-accessible and visible-focused
  (`focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none`)
- `aria-label` on every icon-only button
- All `<Image>` components have meaningful `alt` text
- Color contrast ≥ 4.5:1 for body text; ≥ 3:1 for large text against its background
- Modals and drawers trap focus and restore it to the trigger on close
- `<Marquee>` pauses on `prefers-reduced-motion`
- Screen-reader-only text via `sr-only` Tailwind class where needed

---

## Performance Rules

- `next/image` everywhere — correct `sizes` prop for responsive src sets
- Every image container has a fixed aspect-ratio wrapper — **no layout shift**
- Fonts loaded with `display: swap` + preloaded `<link>` in `<head>`
- Heavy components (PDP gallery, filter panel) use `dynamic(() => import(...), { ssr: false })`
- Import individual Lucide icons — never the whole library
- No client-side data fetching with `useEffect` for data that can live in a Server Component

---

## Code Style

```json
// .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 100,
  "tabWidth": 2
}
```

- Max line length: **100 characters**
- JSDoc comment on every non-obvious function, hook, and component
- Components use named exports for stories/tests; default export for the page/route

---

## Example: Full Component

```tsx
/**
 * ProductCard
 *
 * Grid view card for a single product. Shows the primary image,
 * name, and price. On hover (desktop) reveals a quick-add button
 * and scales the image. Wishlist toggle always visible.
 */

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { formatPrice } from "@/lib/utils/formatPrice";
import type { Product } from "@/lib/types/product";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

export interface ProductCardProps {
  product: Product;
  /** Additional Tailwind classes on the root <article> */
  className?: string;
}

export default function ProductCard({ product, className }: ProductCardProps) {
  const {
    slug, name, priceInCents,
    compareAtPriceInCents, images, isNew,
  } = product;

  return (
    <article className={cn("group relative flex flex-col", className)}>

      {/* ── Image container — fixed 4:5 aspect ratio ─────────── */}
      <Link
        href={`/product/${slug}`}
        className="relative overflow-hidden aspect-[4/5] bg-cream rounded-sm"
      >
        <Image
          src={images[0].src}
          alt={images[0].alt}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 ease-out
                     group-hover:scale-105"
        />

        {/* New badge */}
        {isNew && (
          <Badge className="absolute top-3 left-3">New</Badge>
        )}

        {/* Quick-add — slides up on hover, desktop only */}
        <div
          className="absolute bottom-0 inset-x-0 p-3
                     translate-y-full group-hover:translate-y-0
                     transition-transform duration-300 ease-out
                     hidden md:block"
        >
          <Button variant="primary" className="w-full">
            Quick Add
          </Button>
        </div>
      </Link>

      {/* ── Card body ─────────────────────────────────────────── */}
      <div className="mt-3 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <Link href={`/product/${slug}`}>
            <h3 className="font-body text-sm text-charcoal truncate
                           hover:text-ink transition-colors duration-200">
              {name}
            </h3>
          </Link>

          <p className="mt-0.5 font-mono text-sm text-charcoal">
            {formatPrice(priceInCents)}
            {compareAtPriceInCents && (
              <span className="ml-2 line-through text-warm-gray">
                {formatPrice(compareAtPriceInCents)}
              </span>
            )}
          </p>
        </div>

        {/* Wishlist toggle */}
        <Button
          variant="icon"
          aria-label={`Save ${name} to wishlist`}
          className="shrink-0 text-warm-gray hover:text-ink"
        >
          <Heart size={16} />
        </Button>
      </div>
    </article>
  );
}
```

---

## Development Commands

```bash
npm install           # install all dependencies
npm run dev           # dev server → http://localhost:3000
npm run build         # production build
npm run typecheck     # tsc --noEmit (no output, type errors only)
npm run lint          # eslint
npm run format        # prettier --write .
```

---

## Environment Variables

```bash
# .env.local  (no real secrets for frontend-only)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_CURRENCY=USD
NEXT_PUBLIC_SITE_NAME="Your Store Name"
```

Add API keys here when the backend is connected — see AGENTS.md.

---

## Quick Reference Links

| Resource              | URL                                                          |
|-----------------------|--------------------------------------------------------------|
| Next.js App Router    | https://nextjs.org/docs/app                                  |
| Tailwind CSS          | https://tailwindcss.com/docs                                 |
| Framer Motion         | https://www.framer.com/motion/                               |
| Zustand               | https://docs.pmnd.rs/zustand/getting-started/introduction    |
| Lucide Icons          | https://lucide.dev/icons/                                    |
| next/font             | https://nextjs.org/docs/app/building-your-application/optimizing/fonts |
| Cormorant Garamond    | https://fonts.google.com/specimen/Cormorant+Garamond         |
| DM Sans               | https://fonts.google.com/specimen/DM+Sans                    |
| Geist Mono            | https://vercel.com/font                                      |