"use client";

import { useState } from "react";
import Link from "next/link";
import { QuantityStepper } from "./QuantityStepper";
import { Button } from "@/components/ui/Button";
import { CheckIcon, PlusIcon } from "@/components/icons";
import { useQuote, type QuoteProductRef } from "@/context/QuoteContext";

/**
 * Product-page buy box: quantity stepper + Add to Quote. Adds the chosen
 * quantity to the quote and confirms inline, with a link through to the
 * quote once the item is in it.
 */
export function ProductQuoteControl({ product }: { product: QuoteProductRef }) {
  const { addItem, isInQuote, hydrated } = useQuote();
  const [quantity, setQuantity] = useState(1);
  const inQuote = hydrated && isInQuote(product.slug);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm font-semibold text-ink">Quantity</span>
        <QuantityStepper value={quantity} onChange={setQuantity} />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          type="button"
          size="lg"
          onClick={() => addItem(product, quantity)}
          className="sm:flex-1"
        >
          <PlusIcon className="h-5 w-5" />
          Add to Quote
        </Button>
        <Button href="/contact" variant="outline" size="lg" className="sm:flex-1">
          Request Pricing
        </Button>
      </div>

      {inQuote && (
        <p className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-700">
          <CheckIcon className="h-4 w-4" />
          In your quote.{" "}
          <Link href="/quote" className="font-semibold underline">
            View quote
          </Link>
        </p>
      )}
    </div>
  );
}
