# American Pride LLC — Website

Production website for **American Pride LLC**, a California-based wholesale
supplier to the dry cleaning and commercial laundry industry, serving
California since 1990.

Built with **Next.js (App Router) · React · TypeScript · Tailwind CSS v4**.

> Status: **Phase 1 — Foundation.** Layout system, design tokens, reusable
> components, responsive navigation and the homepage layout (with placeholders
> for all future imagery). Product listings, forms, quotes, SEO and media are
> built in later phases.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint     # eslint
```

## Project structure

```
src/
├─ app/                      # Routes (App Router)
│  ├─ layout.tsx             # Root layout: fonts, metadata, Navbar + Footer
│  ├─ page.tsx               # Homepage — composes section components
│  ├─ globals.css            # Design system (tokens) + base styles
│  ├─ products/
│  │  ├─ page.tsx            # Products index (category grid)
│  │  └─ [slug]/page.tsx     # Category page — architectural stub for products
│  ├─ about/page.tsx         # About (stub)
│  └─ contact/page.tsx       # Contact (stub)
│
├─ components/
│  ├─ layout/                # Navbar, Footer
│  ├─ sections/              # One component per homepage section
│  ├─ ui/                    # Reusable primitives (Button, Card, Container,
│  │                         #   Section, Placeholder, CategoryCard, Logo, …)
│  └─ icons/                 # Inline SVG icon set
│
└─ lib/
   ├─ site-config.ts         # Company + contact info (single source of truth)
   ├─ nav.ts                 # Primary navigation items
   ├─ products.ts            # Category/product TYPES + data (future-ready)
   ├─ content.ts             # Homepage editorial content
   └─ utils.ts               # cn() class merge helper
```

## Design system

All brand tokens live in [`src/app/globals.css`](src/app/globals.css) under
`@theme` and are consumed through Tailwind utilities:

- **Colors** — `navy-*` (brand), `steel-*` (neutrals), `accent-*` (warm),
  plus semantic aliases (`brand`, `ink`, `body`, `muted`, `line`, `surface`).
- **Typography** — Archivo (headings) + Inter (body) via `next/font`.
- **Radius / shadows / spacing** — `rounded-card`, `shadow-card`, `max-w-container`, etc.

Direction: **Industrial Navy** — deep navy, steel neutrals, generous white
space, one restrained warm accent. No dark mode, no gradients.

## Conventions for future phases

- **Swap images, don't restructure.** Every future image is a
  [`<Placeholder>`](src/components/ui/Placeholder.tsx). Replace with
  `next/image` using the same wrapper sizing.
- **Data shape is already defined.** [`src/lib/products.ts`](src/lib/products.ts)
  types support multiple photos, color options, specs, pricing, quotes, PDF
  downloads and a 3D model — populate data, then build the UI regions already
  reserved in `products/[slug]/page.tsx`.
- **Company details** change in one place: `src/lib/site-config.ts`.
- **New sections** are self-contained components in `components/sections/` and
  composed in `app/page.tsx`.
