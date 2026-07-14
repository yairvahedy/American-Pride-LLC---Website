import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ProductCard } from "./ProductCard";
import { ProductCardSkeleton } from "./ProductCardSkeleton";
import type { Product } from "@/lib/products";

const gridClass =
  "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";

/**
 * Responsive product grid. Renders product cards, a skeleton grid while
 * loading, or an empty-state slot when there are no products.
 */
export function ProductGrid({
  products,
  loading = false,
  skeletonCount = 8,
  empty,
  className,
}: {
  products: Product[];
  loading?: boolean;
  skeletonCount?: number;
  empty?: ReactNode;
  className?: string;
}) {
  if (loading) {
    return (
      <div className={cn(gridClass, className)} aria-busy>
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return empty ? <>{empty}</> : null;
  }

  return (
    <div className={cn(gridClass, className)}>
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </div>
  );
}

/** Standalone skeleton grid for route-level loading.tsx files. */
export function ProductGridSkeleton({
  count = 8,
  className,
}: {
  count?: number;
  className?: string;
}) {
  return (
    <div className={cn(gridClass, className)} aria-busy>
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
