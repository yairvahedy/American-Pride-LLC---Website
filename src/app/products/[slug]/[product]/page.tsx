import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ProductTemplate } from "@/components/product/ProductTemplate";
import {
  getCategoryBySlug,
  getCategoryProducts,
  getProductBySlug,
  productCategories,
} from "@/lib/products";

type ProductPageProps = {
  params: Promise<{ slug: string; product: string }>;
};

export function generateStaticParams() {
  return productCategories.flatMap((c) =>
    getCategoryProducts(c.slug).map((p) => ({ slug: c.slug, product: p.slug })),
  );
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { product } = await params;
  const p = getProductBySlug(product);
  if (!p) return { title: "Product" };
  return {
    title: `${p.name} — ${p.sku}`,
    description: p.shortDescription,
  };
}

/**
 * Individual product page. Validates the category/product pair, renders
 * breadcrumbs and the reusable product template (gallery, buy box, specs,
 * downloads, related, recently viewed).
 */
export default async function ProductPage({ params }: ProductPageProps) {
  const { slug, product: productSlug } = await params;
  const product = getProductBySlug(productSlug);
  const category = getCategoryBySlug(slug);

  if (!product || !category || product.categorySlug !== slug) {
    notFound();
  }

  return (
    <>
      <div className="border-b border-line bg-surface">
        <Container className="py-3">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Products", href: "/products" },
              { label: category.name, href: `/products/${category.slug}` },
              { label: product.name },
            ]}
          />
        </Container>
      </div>

      <ProductTemplate product={product} />
    </>
  );
}
