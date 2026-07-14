"use client";

import { cn } from "@/lib/utils";
import { Button, type ButtonSize, type ButtonVariant } from "@/components/ui/Button";
import { CheckIcon, PlusIcon } from "@/components/icons";
import { useQuote, type QuoteProductRef } from "@/context/QuoteContext";

type QuoteButtonProps = {
  product: QuoteProductRef;
  quantity?: number;
  size?: ButtonSize;
  fullWidth?: boolean;
  /** Variant used in the default (not-yet-added) state. */
  variant?: ButtonVariant;
  className?: string;
};

/**
 * "Add to Quote" control (client island). Reflects whether the product is
 * already in the quote and adds the given quantity on click. Safe to drop
 * into any server-rendered card or the product page.
 */
export function QuoteButton({
  product,
  quantity = 1,
  size = "md",
  fullWidth,
  variant = "primary",
  className,
}: QuoteButtonProps) {
  const { addItem, isInQuote, hydrated } = useQuote();
  const added = hydrated && isInQuote(product.slug);

  return (
    <Button
      type="button"
      size={size}
      fullWidth={fullWidth}
      variant={added ? "outline" : variant}
      onClick={() =>
        addItem(
          {
            slug: product.slug,
            name: product.name,
            sku: product.sku,
            categorySlug: product.categorySlug,
          },
          quantity,
        )
      }
      aria-label={added ? `${product.name} added to quote` : `Add ${product.name} to quote`}
      className={cn(added && "text-emerald-700", className)}
    >
      {added ? (
        <>
          <CheckIcon className="h-4 w-4" />
          Added to Quote
        </>
      ) : (
        <>
          <PlusIcon className="h-4 w-4" />
          Add to Quote
        </>
      )}
    </Button>
  );
}
