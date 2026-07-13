import Link from "next/link";
import type { ProductCategory } from "@/lib/products";
import { Placeholder } from "./Placeholder";
import { ArrowRightIcon } from "@/components/icons";

type CategoryCardProps = {
  category: ProductCategory;
};

/**
 * Product category card used in the homepage grid and (later) the
 * products index. Already supports the full future shape — image,
 * name, description, link and product count — rendering a placeholder
 * until real category imagery is supplied.
 */
export function CategoryCard({ category }: CategoryCardProps) {
  const href = `/products/${category.slug}`;

  return (
    <Link
      href={href}
      className="group flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-steel-300 hover:shadow-card-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-600"
    >
      {/* Media — swap Placeholder for next/image when photography lands. */}
      <div className="relative">
        <Placeholder
          ratio="4/3"
          rounded="none"
          label={category.name}
          className="border-0 border-b border-line"
        />
        {typeof category.productCount === "number" && (
          <span className="absolute top-3 right-3 rounded-badge bg-white/95 px-2.5 py-1 text-xs font-semibold text-brand shadow-card">
            {category.productCount}+ products
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold text-ink">{category.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-body">
          {category.description}
        </p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition-colors group-hover:text-accent-600">
          View products
          <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
