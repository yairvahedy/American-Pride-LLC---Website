"use client";

import Link from "next/link";
import { QuantityStepper } from "@/components/product/QuantityStepper";
import { TrashIcon, ImageIcon } from "@/components/icons";
import { getCategoryBySlug } from "@/lib/products";
import type { QuoteItem as QuoteItemType } from "@/context/QuoteContext";

/**
 * A single line in the quote: product identity, quantity stepper and a
 * remove control. Pricing is intentionally omitted — quotes are priced by
 * the team.
 */
export function QuoteItem({
  item,
  onQuantity,
  onRemove,
}: {
  item: QuoteItemType;
  onQuantity: (slug: string, quantity: number) => void;
  onRemove: (slug: string) => void;
}) {
  const { product, quantity } = item;
  const category = getCategoryBySlug(product.categorySlug);
  const href = `/products/${product.categorySlug}/${product.slug}`;

  return (
    <div className="flex gap-4 py-5">
      <Link
        href={href}
        className="flex h-20 w-20 shrink-0 items-center justify-center rounded-card border border-line bg-steel-100 text-steel-400"
        aria-hidden
      >
        <ImageIcon className="h-7 w-7" />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          {category && (
            <p className="text-xs font-semibold tracking-wide text-muted uppercase">
              {category.name}
            </p>
          )}
          <h3 className="truncate text-base font-bold text-ink">
            <Link href={href} className="hover:text-brand">
              {product.name}
            </Link>
          </h3>
          <p className="font-mono text-xs text-muted">SKU: {product.sku}</p>
        </div>

        <div className="flex items-center gap-3">
          <QuantityStepper
            value={quantity}
            onChange={(q) => onQuantity(product.slug, q)}
            size="sm"
          />
          <button
            type="button"
            onClick={() => onRemove(product.slug)}
            aria-label={`Remove ${product.name} from quote`}
            className="rounded-btn p-2 text-steel-400 transition-colors hover:bg-red-50 hover:text-red-600"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
