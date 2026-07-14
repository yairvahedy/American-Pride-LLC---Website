"use client";

import { cn } from "@/lib/utils";
import { SearchIcon, CloseIcon } from "@/components/icons";

/**
 * Reusable search input. Controlled and presentational so it can drive
 * live filtering (category page) or a submitted search. The architecture
 * behind it (see `filterProducts`) matches by name, SKU, keywords and
 * category — this component just captures the query.
 */
export function SearchBar({
  value,
  onValueChange,
  onSubmit,
  placeholder = "Search products, SKUs…",
  size = "md",
  className,
  autoFocus,
}: {
  value: string;
  onValueChange: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder?: string;
  size?: "md" | "lg";
  className?: string;
  autoFocus?: boolean;
}) {
  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.(value);
      }}
      className={cn("relative w-full", className)}
    >
      <SearchIcon
        className={cn(
          "pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-steel-400",
          size === "lg" ? "h-5 w-5" : "h-4 w-4",
        )}
      />
      <input
        type="search"
        value={value}
        autoFocus={autoFocus}
        onChange={(e) => onValueChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search products"
        className={cn(
          "w-full rounded-btn border border-steel-300 bg-surface pr-11 pl-11 text-ink shadow-card outline-none transition-colors placeholder:text-steel-400 focus-visible:border-navy-500 focus-visible:ring-2 focus-visible:ring-navy-500/25",
          "[&::-webkit-search-cancel-button]:appearance-none",
          size === "lg" ? "h-13 text-base" : "h-11 text-sm",
        )}
      />
      {value && (
        <button
          type="button"
          onClick={() => onValueChange("")}
          aria-label="Clear search"
          className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-1 text-steel-400 transition-colors hover:bg-steel-100 hover:text-ink"
        >
          <CloseIcon className="h-4 w-4" />
        </button>
      )}
    </form>
  );
}
