/**
 * Product & category data layer.
 *
 * The single source of truth for the catalog. Types describe the full
 * end-state feature set (multiple photos, colors, specs, dimensions,
 * packaging, pricing, quotes, PDF downloads, a 3D model, related items)
 * so every component can be built against a stable shape.
 *
 * There are NO real products yet. `products` is intentionally empty.
 * To let the browsing experience be built and demonstrated, a
 * deterministic set of clearly-generic PLACEHOLDER products is generated
 * per category (no invented names, prices, or specs). When real data is
 * added to `products`, it automatically takes over — see
 * `getCategoryProducts`.
 *
 * Nothing here renders UI — pure data + types.
 */

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export type ProductImage = {
  /** Optional until real photography is supplied (UI falls back to a placeholder). */
  src?: string;
  alt: string;
};

export type ProductColor = {
  name: string;
  /** CSS color for the swatch. */
  swatch: string;
  images?: ProductImage[];
};

export type ProductSpec = {
  label: string;
  value: string;
};

export type ProductPricing = {
  /** e.g. "case", "box", "each", "roll". */
  unit: string;
  /** Numeric price in USD; omit for quote-only items. */
  price?: number;
  minimumOrderQuantity?: number;
  /** Surface a "Request a quote" flow instead of a price. */
  quoteOnly?: boolean;
};

export type ProductDocument = {
  label: string;
  href: string;
  kind?: "pdf" | "doc" | "other";
};

export type ProductModel3D = {
  /** Path to a .glb/.gltf asset. */
  src: string;
  poster?: string;
};

/** Stock status. Drives the availability badge + quote messaging. */
export type Availability =
  | "in-stock"
  | "low-stock"
  | "made-to-order"
  | "out-of-stock";

export const availabilityMeta: Record<
  Availability,
  { label: string; tone: "success" | "warning" | "info" | "muted" }
> = {
  "in-stock": { label: "In Stock", tone: "success" },
  "low-stock": { label: "Low Stock", tone: "warning" },
  "made-to-order": { label: "Made to Order", tone: "info" },
  "out-of-stock": { label: "Out of Stock", tone: "muted" },
};

/**
 * A single product. Only identity fields are required; everything else
 * is optional so products can be enriched incrementally.
 */
export type Product = {
  slug: string;
  name: string;
  sku: string;
  categorySlug: string;
  shortDescription?: string;
  description?: string;
  images?: ProductImage[];
  colors?: ProductColor[];
  specs?: ProductSpec[];
  dimensions?: string;
  material?: string;
  packaging?: string;
  pricing?: ProductPricing;
  availability?: Availability;
  documents?: ProductDocument[];
  model3d?: ProductModel3D;
  /** Free-text search terms (name/sku are always searched too). */
  keywords?: string[];
  relatedSlugs?: string[];
  featured?: boolean;
  /** True for generated demo entries so the UI can flag them if needed. */
  placeholder?: boolean;
};

export type ProductCategory = {
  slug: string;
  name: string;
  /** Short line used on cards. */
  description: string;
  /** Longer paragraph used on the category hero. */
  intro?: string;
  image?: ProductImage;
  featured?: boolean;
};

/* ------------------------------------------------------------------ */
/* Categories                                                          */
/* ------------------------------------------------------------------ */

export const productCategories: ProductCategory[] = [
  {
    slug: "hangers-covers",
    name: "Hangers & Covers",
    description:
      "Wire, plastic and specialty hangers plus garment covers to protect finished orders.",
    intro:
      "Everything you need to hang, shape and protect finished garments — from everyday wire and plastic hangers to specialty styles and poly garment covers.",
    featured: true,
  },
  {
    slug: "poly-bags-film",
    name: "Poly Bags & Film",
    description:
      "Garment poly bags, laundry wrap, liners and roll film in a full range of sizes.",
    intro:
      "Protective poly for every stage of the order — garment bags, laundry wrap, can liners and roll film in the sizes and gauges your operation runs through.",
    featured: true,
  },
  {
    slug: "chemicals",
    name: "Chemicals",
    description:
      "Dry cleaning solvents, additives and professional cleaning chemistry.",
    intro:
      "Solvents, detergents-boosters, additives and cleaning chemistry from trusted manufacturers, built for professional dry cleaning and laundry.",
    featured: true,
  },
  {
    slug: "detergents",
    name: "Detergents",
    description:
      "Detergents, starches and sizing formulated for high-volume cleaning.",
    intro:
      "Professional-grade detergents, starches and sizing formulated to deliver consistent results at high volume.",
    featured: true,
  },
  {
    slug: "spotting-supplies",
    name: "Spotting Supplies",
    description:
      "Spotting agents and stain removers for tackling the toughest soils.",
    intro:
      "A complete spotting board — pre-spotters, tannin and protein formulas, rust removers and the tools to work them, for the stains that need a specialist.",
    featured: true,
  },
  {
    slug: "pressing-supplies",
    name: "Pressing Supplies",
    description:
      "Pads, covers and finishing consumables that keep your equipment running.",
    intro:
      "Press pads, covers, spray heads and finishing consumables to keep your pressing and finishing equipment producing crisp, clean results.",
    featured: true,
  },
  {
    slug: "counter-packaging",
    name: "Counter & Packaging Supplies",
    description:
      "Tags, tickets, invoices, safety pins and front-counter packaging essentials.",
    intro:
      "The front-counter essentials that keep orders moving — tags, tickets, invoices, safety pins, staples and packaging supplies.",
  },
];

/* ------------------------------------------------------------------ */
/* Products (real data goes here — empty until the client supplies it) */
/* ------------------------------------------------------------------ */

export const products: Product[] = [];

/* ------------------------------------------------------------------ */
/* Placeholder generation (demo only — deterministic, SSR-safe)        */
/* ------------------------------------------------------------------ */

/** How many demo cards each category shows until real products exist. */
export const PLACEHOLDERS_PER_CATEGORY = 12;

const CATEGORY_PREFIX: Record<string, string> = {
  "hangers-covers": "HC",
  "poly-bags-film": "PB",
  chemicals: "CH",
  detergents: "DT",
  "spotting-supplies": "SP",
  "pressing-supplies": "PR",
  "counter-packaging": "CP",
};

// Cycled so the demo grid shows a realistic mix of states (no randomness).
const AVAILABILITY_CYCLE: Availability[] = [
  "in-stock",
  "in-stock",
  "low-stock",
  "made-to-order",
  "in-stock",
  "out-of-stock",
  "in-stock",
  "low-stock",
];

// Real product photography attached to specific placeholder slugs. As real
// products are added, this is superseded by entries in `products`.
const PLACEHOLDER_IMAGES: Record<string, ProductImage[]> = {
  "hangers-covers-sample-1": [
    { src: "/images/products/hanger-white.jpg", alt: "White contour garment hanger with a gold hook" },
    { src: "/images/products/hanger-tan.jpg", alt: "Tan contour garment hanger with a gold hook" },
    { src: "/images/products/hanger-cream.jpg", alt: "Cream contour garment hanger with a gold hook" },
  ],
};

/** Build deterministic placeholder products for a category. */
export function getPlaceholderProducts(categorySlug: string): Product[] {
  const category = getCategoryBySlug(categorySlug);
  if (!category) return [];
  const prefix = CATEGORY_PREFIX[categorySlug] ?? "AP";

  return Array.from({ length: PLACEHOLDERS_PER_CATEGORY }, (_, i) => {
    const n = i + 1;
    const id = String(n).padStart(3, "0");
    const slug = `${categorySlug}-sample-${n}`;
    return {
      slug,
      name: "Product Name",
      sku: `AP-${prefix}-${id}`,
      categorySlug,
      shortDescription:
        "Short product description will appear here once catalog data is added.",
      images: PLACEHOLDER_IMAGES[slug],
      availability: AVAILABILITY_CYCLE[i % AVAILABILITY_CYCLE.length],
      pricing: { unit: "case", quoteOnly: true },
      keywords: [category.name],
      placeholder: true,
    } satisfies Product;
  });
}

/* ------------------------------------------------------------------ */
/* Lookups                                                             */
/* ------------------------------------------------------------------ */

export function getFeaturedCategories(): ProductCategory[] {
  return productCategories.filter((c) => c.featured);
}

export function getCategoryBySlug(slug: string): ProductCategory | undefined {
  return productCategories.find((c) => c.slug === slug);
}

/**
 * Products for a category. Returns real products when they exist,
 * otherwise the deterministic placeholder set so the UI is populated.
 */
export function getCategoryProducts(categorySlug: string): Product[] {
  const real = products.filter((p) => p.categorySlug === categorySlug);
  return real.length > 0 ? real : getPlaceholderProducts(categorySlug);
}

/** Every product across the catalog (real, or placeholders while empty). */
export function getAllProducts(): Product[] {
  if (products.length > 0) return products;
  return productCategories.flatMap((c) => getPlaceholderProducts(c.slug));
}

export function getProductBySlug(productSlug: string): Product | undefined {
  const real = products.find((p) => p.slug === productSlug);
  if (real) return real;
  // Placeholder slugs encode their category: "<categorySlug>-sample-<n>".
  const match = productSlug.match(/^(.*)-sample-\d+$/);
  if (match) {
    return getPlaceholderProducts(match[1]).find((p) => p.slug === productSlug);
  }
  return undefined;
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  if (product.relatedSlugs?.length) {
    return product.relatedSlugs
      .map((s) => getProductBySlug(s))
      .filter((p): p is Product => Boolean(p))
      .slice(0, limit);
  }
  return getCategoryProducts(product.categorySlug)
    .filter((p) => p.slug !== product.slug)
    .slice(0, limit);
}

/* ------------------------------------------------------------------ */
/* Search + filtering                                                  */
/* ------------------------------------------------------------------ */

export type ProductFilters = {
  query?: string;
  categorySlug?: string;
  material?: string;
  color?: string;
  availability?: Availability;
};

/**
 * Reusable search/filter over a product list. Matches the query against
 * name, SKU, keywords and category name. Category is active now; the
 * material/color/availability facets are wired here and activate as soon
 * as product data carries those fields.
 */
export function filterProducts(
  list: Product[],
  filters: ProductFilters,
): Product[] {
  const q = filters.query?.trim().toLowerCase();
  return list.filter((p) => {
    if (filters.categorySlug && p.categorySlug !== filters.categorySlug) {
      return false;
    }
    if (filters.availability && p.availability !== filters.availability) {
      return false;
    }
    if (filters.material && p.material !== filters.material) return false;
    if (filters.color && !p.colors?.some((c) => c.name === filters.color)) {
      return false;
    }
    if (q) {
      const categoryName = getCategoryBySlug(p.categorySlug)?.name ?? "";
      const haystack = [
        p.name,
        p.sku,
        categoryName,
        ...(p.keywords ?? []),
      ]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
}

/** Convenience: search the whole catalog. */
export function searchProducts(filters: ProductFilters): Product[] {
  return filterProducts(getAllProducts(), filters);
}
