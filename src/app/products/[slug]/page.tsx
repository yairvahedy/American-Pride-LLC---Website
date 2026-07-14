import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CategoryHero } from "@/components/catalog/CategoryHero";
import { FilterSidebar } from "@/components/catalog/FilterSidebar";
import { CatalogBrowser } from "@/components/catalog/CatalogBrowser";
import {
  getCategoryBySlug,
  getCategoryProducts,
  productCategories,
} from "@/lib/products";

type CategoryPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return productCategories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return { title: "Product Category" };
  return { title: category.name, description: category.description };
}

/**
 * Category page. Breadcrumbs → hero banner → filter sidebar + searchable,
 * paginated product grid. Renders placeholder products until real data is
 * added; empty states appear when a search returns nothing.
 */
export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const products = getCategoryProducts(slug);

  return (
    <>
      <div className="border-b border-line bg-surface">
        <Container className="py-3">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Products", href: "/products" },
              { label: category.name },
            ]}
          />
        </Container>
      </div>

      <CategoryHero category={category} productCount={products.length} />

      <Section spacing="lg">
        <div className="grid gap-8 lg:grid-cols-[16rem_1fr] lg:gap-10">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <FilterSidebar currentCategorySlug={slug} />
          </div>
          <div>
            <CatalogBrowser
              products={products}
              searchPlaceholder={`Search ${category.name}…`}
            />
          </div>
        </div>
      </Section>
    </>
  );
}
