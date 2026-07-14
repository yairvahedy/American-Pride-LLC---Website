"use client";

import { useMemo, useState } from "react";
import { SearchBar } from "./SearchBar";
import { CatalogCategoryCard } from "./CatalogCategoryCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { SearchIcon } from "@/components/icons";
import type { ProductCategory } from "@/lib/products";

/**
 * Catalog landing browser. A prominent search filters the category
 * overview live; with no query it presents the featured spotlight and the
 * full category grid. (Product-level search lives on each category page.)
 */
export function CategoryCatalog({
  categories,
  featured,
}: {
  categories: ProductCategory[];
  featured: ProductCategory[];
}) {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  const filtered = useMemo(() => {
    if (!q) return categories;
    return categories.filter((c) =>
      `${c.name} ${c.description} ${c.slug}`.toLowerCase().includes(q),
    );
  }, [categories, q]);

  return (
    <div>
      <SearchBar
        value={query}
        onValueChange={setQuery}
        placeholder="Search the catalog by category…"
        size="lg"
        className="max-w-xl"
      />

      {q ? (
        <div className="mt-10">
          <h2 className="text-xl font-bold text-ink">
            {filtered.length} {filtered.length === 1 ? "category" : "categories"}{" "}
            found
          </h2>
          {filtered.length > 0 ? (
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((c) => (
                <CatalogCategoryCard key={c.slug} category={c} />
              ))}
            </div>
          ) : (
            <div className="mt-6">
              <EmptyState
                icon={SearchIcon}
                title="No matching categories"
                description={`Nothing matched “${query}”. Clear the search to see all product categories.`}
                action={
                  <Button variant="outline" onClick={() => setQuery("")}>
                    Clear search
                  </Button>
                }
              />
            </div>
          )}
        </div>
      ) : (
        <>
          {featured.length > 0 && (
            <section className="mt-12">
              <h2 className="text-xl font-bold text-ink">Featured Categories</h2>
              <p className="mt-1 text-sm text-body">
                Our most-requested lines for dry cleaners and laundries.
              </p>
              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {featured.map((c) => (
                  <CatalogCategoryCard key={c.slug} category={c} featured />
                ))}
              </div>
            </section>
          )}

          <section className="mt-14">
            <h2 className="text-xl font-bold text-ink">All Categories</h2>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((c) => (
                <CatalogCategoryCard key={c.slug} category={c} />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
