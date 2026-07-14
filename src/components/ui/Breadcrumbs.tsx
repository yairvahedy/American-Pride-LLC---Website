import Link from "next/link";
import { cn } from "@/lib/utils";
import { ChevronRightIcon } from "@/components/icons";

export type Crumb = {
  label: string;
  href?: string;
};

/**
 * Reusable breadcrumb trail. The last crumb renders as the current page
 * (no link). Emits BreadcrumbList JSON-LD for SEO. Used on category and
 * product pages.
 */
export function Breadcrumbs({
  items,
  className,
}: {
  items: Crumb[];
  className?: string;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: c.href } : {}),
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className={cn("text-sm", className)}>
      <ol className="flex flex-wrap items-center gap-1.5 text-muted">
        {items.map((crumb, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={`${crumb.label}-${i}`} className="flex items-center gap-1.5">
              {crumb.href && !isLast ? (
                <Link
                  href={crumb.href}
                  className="transition-colors hover:text-brand"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span
                  className={cn(isLast && "font-semibold text-ink")}
                  aria-current={isLast ? "page" : undefined}
                >
                  {crumb.label}
                </span>
              )}
              {!isLast && (
                <ChevronRightIcon className="h-3.5 w-3.5 text-steel-400" />
              )}
            </li>
          );
        })}
      </ol>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </nav>
  );
}
