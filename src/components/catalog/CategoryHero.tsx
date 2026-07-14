import { Container } from "@/components/ui/Container";
import { Placeholder } from "@/components/ui/Placeholder";
import { Badge } from "@/components/ui/Badge";
import type { ProductCategory } from "@/lib/products";

/**
 * Category page hero banner. Navy banner with the category name, intro
 * copy and a swap-ready category image. Real category photography drops
 * into the media slot without layout changes.
 */
export function CategoryHero({
  category,
  productCount,
}: {
  category: ProductCategory;
  productCount?: number;
}) {
  return (
    <section className="bg-brand text-white">
      <Container className="grid items-center gap-8 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:py-16">
        <div>
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.14em] text-accent-200 uppercase">
            <span className="h-px w-6 bg-accent-200/60" aria-hidden />
            Product Category
          </span>
          <h1 className="mt-4 text-4xl text-white sm:text-5xl">
            {category.name}
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-navy-100">
            {category.intro ?? category.description}
          </p>
          {typeof productCount === "number" && productCount > 0 && (
            <div className="mt-6">
              <Badge tone="accent" className="bg-white/10 text-accent-100 ring-white/15">
                {productCount} products
              </Badge>
            </div>
          )}
        </div>

        <div className="relative">
          <Placeholder
            ratio="4/3"
            label={`${category.name} — category image`}
            className="w-full border-white/10 bg-navy-800"
          />
        </div>
      </Container>
    </section>
  );
}
