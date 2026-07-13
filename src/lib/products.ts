/**
 * Product & category data layer.
 *
 * This is the architectural backbone for all future product pages.
 * The TYPES below intentionally describe the full end-state feature
 * set (multiple photos, color options, specifications, pricing,
 * wholesale quotes, PDF downloads, a 3D model) so that pages and
 * components can be built against a stable shape. Today we only
 * populate category-level placeholder data; individual products,
 * images and pricing are filled in later without restructuring.
 *
 * Nothing here renders UI — it is pure data + types.
 */

/* ------------------------------------------------------------------ */
/* Shared / future-facing product types                                */
/* ------------------------------------------------------------------ */

/** A single product image. `src` stays optional until real photography
 *  is supplied, letting the UI fall back to a placeholder. */
export type ProductImage = {
  src?: string;
  alt: string;
};

/** A selectable color / finish option for a product. */
export type ProductColor = {
  name: string;
  /** CSS color used for the swatch (hex, rgb, etc.). */
  swatch: string;
  /** Optional per-color imagery, shown when the color is selected. */
  images?: ProductImage[];
};

/** One row in a product specification table. */
export type ProductSpec = {
  label: string;
  value: string;
};

/** Wholesale pricing. Left flexible: unit price, per-case, or
 *  quote-only are all representable. Populated later. */
export type ProductPricing = {
  /** e.g. "case", "box", "each", "roll". */
  unit: string;
  /** Numeric price in USD; omit for quote-only items. */
  price?: number;
  /** Minimum order quantity, if any. */
  minimumOrderQuantity?: number;
  /** When true, the UI surfaces a "Request a quote" flow instead of a price. */
  quoteOnly?: boolean;
};

/** A downloadable document (spec sheet, SDS, catalog page). */
export type ProductDocument = {
  label: string;
  href: string;
  kind?: "pdf" | "doc" | "other";
};

/** A future 3D model reference for the interactive viewer. */
export type ProductModel3D = {
  /** Path to a .glb/.gltf asset. */
  src: string;
  poster?: string;
};

/**
 * A single product. Every field beyond identity is optional so the
 * catalog can grow incrementally — a product can exist with just a
 * name and slug and be enriched over time.
 */
export type Product = {
  slug: string;
  name: string;
  categorySlug: string;
  shortDescription?: string;
  description?: string;
  images?: ProductImage[];
  colors?: ProductColor[];
  specs?: ProductSpec[];
  pricing?: ProductPricing;
  documents?: ProductDocument[];
  model3d?: ProductModel3D;
  /** Marketing flags used for badges / sorting. */
  featured?: boolean;
  tags?: string[];
};

/**
 * A product category. Categories are the primary browse unit and the
 * only thing rendered today (as placeholder cards). `productCount` is
 * a display hint shown on cards; real products get linked in later.
 */
export type ProductCategory = {
  slug: string;
  name: string;
  description: string;
  /** Optional hero/card image; falls back to a placeholder until set. */
  image?: ProductImage;
  /** Approximate count surfaced on the category card ("120+ products"). */
  productCount?: number;
  featured?: boolean;
};

/* ------------------------------------------------------------------ */
/* Category data (placeholders — refine names/counts with client)      */
/* ------------------------------------------------------------------ */

export const productCategories: ProductCategory[] = [
  {
    slug: "hangers-covers",
    name: "Hangers & Covers",
    description:
      "Wire, plastic and specialty hangers, plus garment covers to protect finished orders.",
    productCount: 40,
    featured: true,
  },
  {
    slug: "poly-bags-films",
    name: "Poly Bags & Films",
    description:
      "Garment poly bags, laundry wrap, liners and roll films in a full range of sizes.",
    productCount: 30,
    featured: true,
  },
  {
    slug: "detergents-starches",
    name: "Detergents & Starches",
    description:
      "Professional detergents, starches and sizing formulated for high-volume cleaning.",
    productCount: 35,
    featured: true,
  },
  {
    slug: "chemicals-solvents",
    name: "Chemicals & Solvents",
    description:
      "Dry cleaning solvents, additives and cleaning chemistry from trusted manufacturers.",
    productCount: 28,
    featured: true,
  },
  {
    slug: "spotting-wet-cleaning",
    name: "Spotting & Wet Cleaning",
    description:
      "Spotting agents, stain removers and wet cleaning systems for tough soils.",
    productCount: 24,
    featured: true,
  },
  {
    slug: "pressing-finishing",
    name: "Pressing & Finishing",
    description:
      "Pads, covers, pressing supplies and finishing equipment consumables.",
    productCount: 22,
    featured: true,
  },
  {
    slug: "counter-packaging",
    name: "Counter & Packaging Supplies",
    description:
      "Tags, tickets, invoices, safety pins and front-counter essentials.",
    productCount: 45,
  },
  {
    slug: "paper-products",
    name: "Paper Products",
    description:
      "Tissue, banding paper, box board and protective paper packaging.",
    productCount: 18,
  },
];

/* ------------------------------------------------------------------ */
/* Lookups                                                             */
/* ------------------------------------------------------------------ */

/** Categories highlighted on the homepage grid. */
export function getFeaturedCategories(): ProductCategory[] {
  return productCategories.filter((c) => c.featured);
}

export function getCategoryBySlug(
  slug: string,
): ProductCategory | undefined {
  return productCategories.find((c) => c.slug === slug);
}
