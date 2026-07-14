"use client";

import { useState } from "react";
import { useQuote } from "@/context/QuoteContext";
import { QuoteItem } from "./QuoteItem";
import { CustomerInfoForm, type CustomerInfo } from "./CustomerInfoForm";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { ClipboardIcon, CheckIcon } from "@/components/icons";

export function QuoteView() {
  const {
    items,
    count,
    totalQuantity,
    hydrated,
    setQuantity,
    removeItem,
    clear,
  } = useQuote();
  const [submittedName, setSubmittedName] = useState<string | null>(null);

  const handleSubmit = (info: CustomerInfo) => {
    // Front-end only for now: `{ customer: info, items }` is the payload a
    // future send action (email / WhatsApp) will deliver. We confirm and
    // reset the quote here.
    setSubmittedName(info.name);
    clear();
  };

  // Avoid a hydration flash: show a light skeleton until the stored quote loads.
  if (!hydrated) {
    return (
      <div className="grid gap-10 lg:grid-cols-[1fr_22rem]">
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full rounded-card" />
          ))}
        </div>
        <Skeleton className="h-80 w-full rounded-card" />
      </div>
    );
  }

  if (submittedName) {
    return (
      <EmptyState
        icon={CheckIcon}
        title="Quote request ready"
        description={`Thanks, ${submittedName}. Your request has been prepared. Online sending isn't connected yet — for now, call or WhatsApp us and we'll finalize your wholesale pricing right away.`}
        action={
          <>
            <Button href="/products" variant="primary">
              Continue Browsing
            </Button>
            <Button href="/contact" variant="outline">
              Contact Us
            </Button>
          </>
        }
      />
    );
  }

  if (count === 0) {
    return (
      <EmptyState
        icon={ClipboardIcon}
        title="Your quote is empty"
        description="Add products from the catalog to build a wholesale quote request. You can adjust quantities before sending."
        action={
          <Button href="/products" variant="primary">
            Browse Products
          </Button>
        }
      />
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_22rem]">
      {/* Items */}
      <div>
        <div className="flex items-center justify-between border-b border-line pb-3">
          <h2 className="text-lg font-bold text-ink">
            {count} {count === 1 ? "item" : "items"}
          </h2>
          <button
            type="button"
            onClick={clear}
            className="text-sm font-semibold text-muted transition-colors hover:text-red-600"
          >
            Clear all
          </button>
        </div>
        <div className="divide-y divide-line">
          {items.map((item) => (
            <QuoteItem
              key={item.product.slug}
              item={item}
              onQuantity={setQuantity}
              onRemove={removeItem}
            />
          ))}
        </div>
      </div>

      {/* Summary + form */}
      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-card border border-line bg-surface-muted p-6 shadow-card">
          <h2 className="text-lg font-bold text-ink">Quote Summary</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-body">Products</dt>
              <dd className="font-semibold text-ink">{count}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-body">Total quantity</dt>
              <dd className="font-semibold text-ink">{totalQuantity}</dd>
            </div>
          </dl>
          <div className="mt-6 border-t border-line pt-6">
            <CustomerInfoForm onSubmit={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
}
