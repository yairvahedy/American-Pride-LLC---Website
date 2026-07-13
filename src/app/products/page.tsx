import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { CategoryCard } from "@/components/ui/CategoryCard";
import { productCategories } from "@/lib/products";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse American Pride LLC's wholesale product categories for the dry cleaning and commercial laundry industry.",
};

/**
 * Products index. Lists every product category. Individual product
 * listings and filtering are built in a later phase; the category grid
 * here already routes into the per-category pages.
 */
export default function ProductsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Catalog"
        title="Wholesale Products"
        description="Explore our full range of supplies for dry cleaning, laundry and uniform businesses. Detailed product listings and pricing are on the way — call us any time for availability and quotes."
      />

      <Section spacing="lg">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {productCategories.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </Section>
    </>
  );
}
