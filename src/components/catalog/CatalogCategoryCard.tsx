import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Placeholder } from "@/components/ui/Placeholder";
import { Badge } from "@/components/ui/Badge";
import { ArrowRightIcon } from "@/components/icons";
import type { ProductCategory } from "@/lib/products";

/**
 * Large category card for the catalog landing page. Reusable for both the
 * "Featured" spotlight row and the full "All Categories" grid (pass
 * `featured` for a subtle highlight + badge).
 */
export function CatalogCategoryCard({
  category,
  featured = false,
}: {
  category: ProductCategory;
  featured?: boolean;
}) {
  const href = `/products/${category.slug}`;
  const image = category.image;

  return (
    <Link
      href={href}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-card border bg-surface shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-600",
        featured ? "border-navy-200" : "border-line hover:border-steel-300",
      )}
    >
      <div className="relative">
        {image?.src ? (
          <Image
            src={image.src}
            alt={image.alt}
            width={640}
            height={400}
            className="aspect-[16/10] w-full object-cover"
          />
        ) : (
          <Placeholder ratio="16/10" rounded="none" label={category.name} />
        )}
        {featured && (
          <span className="absolute top-3 left-3">
            <Badge tone="accent">Featured</Badge>
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-bold text-ink">{category.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-body">
          {category.description}
        </p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition-colors group-hover:text-accent-600">
          Browse category
          <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
