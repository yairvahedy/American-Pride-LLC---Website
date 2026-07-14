import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { AvailabilityBadge } from "@/components/catalog/AvailabilityBadge";
import { ProductGallery } from "./ProductGallery";
import { ColorSelector } from "./ColorSelector";
import { ProductQuoteControl } from "./ProductQuoteControl";
import { ProductSpecs } from "./ProductSpecs";
import { ProductDownloads } from "./ProductDownloads";
import { RelatedProducts } from "./RelatedProducts";
import { RecentlyViewed } from "./RecentlyViewed";
import {
  getCategoryBySlug,
  getRelatedProducts,
  type Product,
} from "@/lib/products";

function priceLabel(product: Product) {
  const p = product.pricing;
  if (!p || p.quoteOnly || typeof p.price !== "number") {
    return "Wholesale pricing on request";
  }
  return `$${p.price.toFixed(2)} / ${p.unit}`;
}

/**
 * Full product page template. Assembles the image gallery (+ 3D slot),
 * color selector, buy box (quantity + Add to Quote), specifications,
 * downloads, related products and recently-viewed. Everything is wired;
 * placeholder products render swap-ready empty/on-request states.
 */
export function ProductTemplate({ product }: { product: Product }) {
  const category = getCategoryBySlug(product.categorySlug);
  const related = getRelatedProducts(product, 4);
  const unit = product.pricing?.unit ?? "case";
  const quoteRef = {
    slug: product.slug,
    name: product.name,
    sku: product.sku,
    categorySlug: product.categorySlug,
  };

  return (
    <>
      {/* Top: gallery + info */}
      <Section spacing="md">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <ProductGallery images={product.images} name={product.name} />

          <div>
            {category && (
              <Link
                href={`/products/${category.slug}`}
                className="text-xs font-semibold tracking-[0.14em] text-accent-600 uppercase hover:text-accent-700"
              >
                {category.name}
              </Link>
            )}
            <h1 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
              {product.name}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-3">
              <span className="font-mono text-sm text-muted">
                SKU: {product.sku}
              </span>
              <AvailabilityBadge availability={product.availability} />
            </div>

            {product.shortDescription && (
              <p className="mt-5 text-base leading-relaxed text-body">
                {product.description ?? product.shortDescription}
              </p>
            )}

            {/* Pricing + wholesale messaging */}
            <div className="mt-6 rounded-card border border-line bg-surface-muted p-5">
              <p className="text-xs font-semibold tracking-wide text-muted uppercase">
                Wholesale Pricing
              </p>
              <p className="mt-1 text-lg font-bold text-brand">
                {priceLabel(product)}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-body">
                Sold by the {unit}. Volume pricing available — add this item to
                a quote and we&rsquo;ll send your custom wholesale rate.
              </p>
            </div>

            {/* Color / finish (only when the product has options) */}
            {product.colors && product.colors.length > 0 && (
              <div className="mt-6">
                <ColorSelector colors={product.colors} />
              </div>
            )}

            {/* Buy box */}
            <div className="mt-6">
              <ProductQuoteControl product={quoteRef} />
            </div>
          </div>
        </div>
      </Section>

      {/* Details: specs + downloads */}
      <Section surface="muted" spacing="md">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <ProductSpecs product={product} />
          <ProductDownloads product={product} />
        </div>
      </Section>

      {/* Related + recently viewed */}
      {related.length > 0 && (
        <Section spacing="md">
          <RelatedProducts products={related} />
        </Section>
      )}

      <RecentlyViewed currentSlug={product.slug} />
    </>
  );
}
