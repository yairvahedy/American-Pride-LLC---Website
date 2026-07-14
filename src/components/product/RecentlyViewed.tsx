"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/catalog/ProductCard";
import { getProductBySlug, type Product } from "@/lib/products";

const STORAGE_KEY = "ap-recently-viewed-v1";
const MAX_STORED = 8;
const MAX_SHOWN = 4;

/**
 * Recently Viewed. Records the current product in localStorage and shows
 * previously viewed products (excluding the current one). Architecture is
 * complete — it resolves whatever product data exists.
 */
export function RecentlyViewed({ currentSlug }: { currentSlug: string }) {
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    let stored: string[] = [];
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      stored = raw ? (JSON.parse(raw) as string[]) : [];
      if (!Array.isArray(stored)) stored = [];
    } catch {
      stored = [];
    }

    // Show previously-viewed products (before recording the current one).
    // Reading persisted history on mount is a legitimate external-store read.
    const shown = stored
      .filter((slug) => slug !== currentSlug)
      .map((slug) => getProductBySlug(slug))
      .filter((p): p is Product => Boolean(p))
      .slice(0, MAX_SHOWN);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setItems(shown);

    // Record the current product at the front of the history.
    const next = [currentSlug, ...stored.filter((s) => s !== currentSlug)].slice(
      0,
      MAX_STORED,
    );
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }, [currentSlug]);

  if (items.length === 0) return null;

  return (
    <section
      aria-labelledby="recently-viewed-heading"
      className="border-t border-line bg-surface-muted"
    >
      <Container className="py-14 sm:py-16">
        <h2 id="recently-viewed-heading" className="text-2xl font-bold text-ink">
          Recently Viewed
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
}
