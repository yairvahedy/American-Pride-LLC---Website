import { ProductCard } from "@/components/catalog/ProductCard";
import type { Product } from "@/lib/products";

/**
 * "Related Products" row. Reuses the product card grid. Given a set of
 * related products (by category or explicit links), renders up to four.
 */
export function RelatedProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <section aria-labelledby="related-heading">
      <h2 id="related-heading" className="text-2xl font-bold text-ink">
        Related Products
      </h2>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </section>
  );
}
