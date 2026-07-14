import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { FilterSidebar } from "@/components/catalog/FilterSidebar";
import { CategoryCatalog } from "@/components/catalog/CategoryCatalog";
import { productCategories, getFeaturedCategories } from "@/lib/products";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse American Pride's wholesale catalog for the dry cleaning and commercial laundry industry — hangers, poly, chemicals, detergents, spotting, pressing and counter supplies.",
};

/**
 * Catalog landing page. Category overview with a live search, a featured
 * spotlight, the full category grid, and a filter sidebar (Category is
 * active; other facets are shown ready-but-disabled). Product-level
 * browsing continues on each category page.
 */
export default function ProductsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Wholesale Catalog"
        title="Products"
        description="Explore our full range of supplies for dry cleaning, laundry and uniform businesses. Search a category to jump in, or browse everything below."
      />

      <Section spacing="lg">
        <div className="grid gap-8 lg:grid-cols-[16rem_1fr] lg:gap-10">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <FilterSidebar />
          </div>
          <div>
            <CategoryCatalog
              categories={productCategories}
              featured={getFeaturedCategories().slice(0, 3)}
            />
          </div>
        </div>
      </Section>
    </>
  );
}
