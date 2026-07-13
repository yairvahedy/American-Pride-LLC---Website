import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { Placeholder } from "@/components/ui/Placeholder";
import { Button } from "@/components/ui/Button";
import { ArrowRightIcon, WhatsAppIcon } from "@/components/icons";
import {
  getCategoryBySlug,
  productCategories,
} from "@/lib/products";
import { siteConfig } from "@/lib/site-config";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

/** Pre-render a static page for every known category. */
export function generateStaticParams() {
  return productCategories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return { title: "Product Category" };
  return {
    title: category.name,
    description: category.description,
  };
}

/**
 * Individual product-category page.
 *
 * This is the architectural stub for future product pages. The layout
 * already reserves space for the pieces that will land later — a hero
 * image, a product grid, specs, color options, pricing and quote
 * requests — so building those features means filling these regions in,
 * not restructuring the route.
 */
export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  return (
    <>
      <PageHeader
        eyebrow="Product Category"
        title={category.name}
        description={category.description}
      />

      <Section spacing="lg">
        {/* Reserved region: category hero image */}
        <Placeholder
          ratio="21/9"
          label={`${category.name} — category image`}
          className="w-full"
        />

        {/* Reserved region: product grid (individual product cards) */}
        <div className="mt-12">
          <h2 className="text-2xl">Products</h2>
          <p className="mt-2 max-w-2xl text-body">
            Detailed product listings for this category — with multiple
            photos, color options, specifications, pricing and wholesale
            quote requests — are being added. In the meantime, contact us for
            full availability and pricing.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-card border border-line bg-surface shadow-card"
              >
                <Placeholder ratio="1/1" rounded="none" label="Product photo" />
                <div className="space-y-2 p-5">
                  <div className="h-4 w-2/3 rounded bg-steel-100" />
                  <div className="h-3 w-full rounded bg-steel-100" />
                  <div className="h-3 w-4/5 rounded bg-steel-100" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quote CTA */}
        <div className="mt-14 flex flex-col items-start justify-between gap-6 rounded-card border border-line bg-surface-muted p-8 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-xl">Need pricing on {category.name}?</h3>
            <p className="mt-1.5 text-body">
              Call or WhatsApp {siteConfig.contact.phone.display}, or request a
              wholesale quote.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="/contact" variant="primary">
              Request a Quote
              <ArrowRightIcon className="h-5 w-5" />
            </Button>
            <Button
              href={siteConfig.contact.whatsapp.href}
              variant="outline"
              target="_blank"
              rel="noreferrer"
            >
              <WhatsAppIcon className="h-5 w-5" />
              WhatsApp
            </Button>
          </div>
        </div>

        <div className="mt-8">
          <Link
            href="/products"
            className="text-sm font-semibold text-brand hover:text-accent-600"
          >
            ← Back to all products
          </Link>
        </div>
      </Section>
    </>
  );
}
