"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useQuote } from "@/context/QuoteContext";
import { ClipboardIcon } from "@/components/icons";

/**
 * Floating quote indicator. Appears (bottom-right) once the quote has
 * items, linking through to the quote page. Deliberately outside the
 * locked navbar/footer — it's an additive entry point for the new quote
 * flow and hides itself on the quote page.
 */
export function QuoteIndicator() {
  const { count, totalQuantity, hydrated } = useQuote();
  const pathname = usePathname();

  if (!hydrated || count === 0 || pathname === "/quote") return null;

  return (
    <Link
      href="/quote"
      aria-label={`View quote — ${count} ${count === 1 ? "item" : "items"}`}
      className="fixed right-4 bottom-4 z-40 inline-flex items-center gap-2.5 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white shadow-card-hover transition-colors hover:bg-brand-dark sm:right-6 sm:bottom-6"
    >
      <ClipboardIcon className="h-5 w-5" />
      View Quote
      <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-accent-strong px-1.5 text-xs font-bold text-white">
        {totalQuantity}
      </span>
    </Link>
  );
}
