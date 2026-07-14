"use client";

import { useMemo, useState } from "react";
import { SearchBar } from "./SearchBar";
import { ProductGrid } from "./ProductGrid";
import { ProductCardSkeleton } from "./ProductCardSkeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { SearchIcon, InboxIcon } from "@/components/icons";
import { filterProducts, type Product } from "@/lib/products";

/**
 * Client-side catalog browser: search + live filtering + "Load More"
 * pagination + empty states, over a product list supplied by the server.
 * Used on category pages (and reusable anywhere a scoped product list is
 * browsed). Real product data drops straight in — the architecture and
 * search fields (name/SKU/keywords/category) are already wired.
 */
export function CatalogBrowser({
  products,
  pageSize = 8,
  searchPlaceholder = "Search products, SKUs…",
}: {
  products: Product[];
  pageSize?: number;
  searchPlaceholder?: string;
}) {
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(pageSize);
  const [loadingMore, setLoadingMore] = useState(false);

  const filtered = useMemo(
    () => filterProducts(products, { query }),
    [products, query],
  );

  const onQueryChange = (value: string) => {
    setQuery(value);
    setVisibleCount(pageSize);
  };

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const loadMore = () => {
    setLoadingMore(true);
    // Simulated async fetch so the "Load More" skeletons are demonstrable;
    // swap for a real fetch when product data is paginated server-side.
    window.setTimeout(() => {
      setVisibleCount((v) => v + pageSize);
      setLoadingMore(false);
    }, 350);
  };

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <SearchBar
          value={query}
          onValueChange={onQueryChange}
          placeholder={searchPlaceholder}
          className="sm:max-w-md"
        />
        <p className="text-sm text-muted sm:ml-auto">
          {filtered.length} {filtered.length === 1 ? "product" : "products"}
          {query && " found"}
        </p>
      </div>

      <div className="mt-6">
        {filtered.length === 0 ? (
          query ? (
            <EmptyState
              icon={SearchIcon}
              title="No results found"
              description={`We couldn't find anything matching “${query}”. Try a different term or browse the full category.`}
              action={
                <Button variant="outline" onClick={() => onQueryChange("")}>
                  Clear search
                </Button>
              }
            />
          ) : (
            <EmptyState
              icon={InboxIcon}
              title="No products in this category yet"
              description="Products are being added to this category. In the meantime, contact us for availability and wholesale pricing."
              action={
                <Button href="/contact" variant="primary">
                  Request a Quote
                </Button>
              }
            />
          )
        ) : (
          <>
            <ProductGrid products={visible} />
            {loadingMore && (
              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {Array.from({ length: Math.min(pageSize, filtered.length - visibleCount) }).map(
                  (_, i) => (
                    <ProductCardSkeleton key={i} />
                  ),
                )}
              </div>
            )}
            {hasMore && (
              <div className="mt-10 flex flex-col items-center gap-3">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={loadMore}
                  disabled={loadingMore}
                >
                  {loadingMore ? "Loading…" : "Load More Products"}
                </Button>
                <p className="text-xs text-muted">
                  Showing {visible.length} of {filtered.length}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
