import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CategoryCard } from "@/components/ui/CategoryCard";
import { Button } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/icons";
import { getFeaturedCategories } from "@/lib/products";

/**
 * Product categories grid — the main browse entry point. Renders the
 * featured categories as reusable CategoryCards and links through to the
 * full products index.
 */
export function ProductCategories() {
  const categories = getFeaturedCategories();

  return (
    <Section surface="muted" spacing="lg">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          eyebrow="Shop by Category"
          title="A full catalog, ready to ship"
          description="From hangers and poly to detergents, solvents and store supplies — explore our wholesale product categories."
        />
        <div className="hidden shrink-0 sm:block">
          <Button href="/products" variant="outline">
            View all products
            <ArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <CategoryCard key={category.slug} category={category} />
        ))}
      </div>

      <div className="mt-8 sm:hidden">
        <Button href="/products" variant="outline" fullWidth>
          View all products
          <ArrowRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </Section>
  );
}
