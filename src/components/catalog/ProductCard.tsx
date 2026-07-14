import Link from "next/link";
import Image from "next/image";
import { Placeholder } from "@/components/ui/Placeholder";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { AvailabilityBadge } from "./AvailabilityBadge";
import { QuoteButton } from "./QuoteButton";
import { ArrowRightIcon } from "@/components/icons";
import type { Product } from "@/lib/products";

export function productHref(product: Product) {
  return `/products/${product.categorySlug}/${product.slug}`;
}

function priceLabel(product: Product) {
  const p = product.pricing;
  if (!p || p.quoteOnly || typeof p.price !== "number") {
    return "Wholesale pricing on request";
  }
  return `$${p.price.toFixed(2)} / ${p.unit}`;
}

/**
 * Reusable product card. Already supports image, name, SKU, short
 * description, pricing, availability, Add to Quote and View Details — it
 * renders placeholders wherever real data is not yet present. Server
 * component; the Add-to-Quote button is a small client island.
 */
export function ProductCard({ product }: { product: Product }) {
  const href = productHref(product);
  const image = product.images?.[0];

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-steel-300 hover:shadow-card-hover">
      {/* Media */}
      <div className="relative">
        <Link href={href} aria-label={product.name} className="block">
          {image?.src ? (
            <Image
              src={image.src}
              alt={image.alt}
              width={600}
              height={450}
              className="aspect-[4/3] w-full object-cover"
            />
          ) : (
            <Placeholder ratio="4/3" rounded="none" label="Product image" />
          )}
        </Link>

        <div className="pointer-events-none absolute inset-x-3 top-3 flex items-start justify-between gap-2">
          <AvailabilityBadge availability={product.availability} />
          {product.placeholder && (
            <Badge tone="muted" className="bg-white/90">
              Sample
            </Badge>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <p className="font-mono text-xs tracking-wide text-muted">
          SKU: {product.sku}
        </p>
        <h3 className="mt-1 text-base font-bold text-ink">
          <Link href={href} className="transition-colors hover:text-brand">
            {product.name}
          </Link>
        </h3>
        {product.shortDescription && (
          <p className="mt-1.5 line-clamp-2 flex-1 text-sm leading-relaxed text-body">
            {product.shortDescription}
          </p>
        )}

        <p className="mt-3 text-sm font-semibold text-brand">
          {priceLabel(product)}
        </p>

        {/* Actions */}
        <div className="mt-4 flex flex-col gap-2">
          <QuoteButton product={product} size="sm" fullWidth />
          <Button href={href} variant="ghost" size="sm" fullWidth>
            View Details
            <ArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </article>
  );
}
