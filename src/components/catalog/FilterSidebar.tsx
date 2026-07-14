"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { FilterIcon, CloseIcon } from "@/components/icons";
import { FilterGroup } from "./FilterGroup";
import { productCategories } from "@/lib/products";
import { filterGroups } from "@/lib/filters";

function FilterContent({ currentCategorySlug }: { currentCategorySlug?: string }) {
  const facets = filterGroups.filter((g) => g.key !== "category");
  return (
    <div>
      {/* Category — the one active filter (navigation-based) */}
      <div className="border-b border-line py-4">
        <p className="text-sm font-bold text-ink">Category</p>
        <ul className="mt-3 space-y-1">
          <li>
            <Link
              href="/products"
              className={cn(
                "block rounded-md px-3 py-1.5 text-sm transition-colors",
                !currentCategorySlug
                  ? "bg-navy-50 font-semibold text-brand"
                  : "text-body hover:bg-steel-100 hover:text-brand",
              )}
            >
              All Categories
            </Link>
          </li>
          {productCategories.map((c) => {
            const active = c.slug === currentCategorySlug;
            return (
              <li key={c.slug}>
                <Link
                  href={`/products/${c.slug}`}
                  aria-current={active ? "true" : undefined}
                  className={cn(
                    "block rounded-md px-3 py-1.5 text-sm transition-colors",
                    active
                      ? "bg-navy-50 font-semibold text-brand"
                      : "text-body hover:bg-steel-100 hover:text-brand",
                  )}
                >
                  {c.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Declared-but-disabled facets */}
      {facets.map((g) => (
        <FilterGroup
          key={g.key}
          label={g.label}
          type={g.type}
          options={g.options}
          disabled={!g.active}
        />
      ))}
    </div>
  );
}

/**
 * Catalog filter sidebar. A static column on desktop; on mobile it
 * collapses behind a "Filters" button that opens a slide-over. Category
 * is the active filter; other facets are shown disabled until product
 * data exists.
 */
export function FilterSidebar({
  currentCategorySlug,
  className,
}: {
  currentCategorySlug?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  // Close on Escape and lock body scroll while the mobile drawer is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Mobile trigger */}
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex h-11 items-center gap-2 rounded-btn border border-steel-300 bg-surface px-4 text-sm font-semibold text-ink shadow-card transition-colors hover:bg-steel-100"
        >
          <FilterIcon className="h-4 w-4" />
          Filters
        </button>
      </div>

      {/* Desktop column */}
      <aside
        className={cn(
          "hidden lg:block rounded-card border border-line bg-surface p-5 shadow-card",
          className,
        )}
        aria-label="Product filters"
      >
        <FilterContent currentCategorySlug={currentCategorySlug} />
      </aside>

      {/* Mobile slide-over */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          <div
            className="absolute inset-0 bg-brand-dark/40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 flex w-[85%] max-w-sm flex-col bg-surface shadow-xl">
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <span className="text-base font-bold text-ink">Filters</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close filters"
                className="rounded-btn p-1.5 text-ink hover:bg-steel-100"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 pb-6">
              <FilterContent currentCategorySlug={currentCategorySlug} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
