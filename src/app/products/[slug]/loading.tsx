import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Skeleton } from "@/components/ui/Skeleton";
import { ProductGridSkeleton } from "@/components/catalog/ProductGrid";

/** Category page loading skeleton. */
export default function CategoryLoading() {
  return (
    <>
      <div className="border-b border-line bg-surface">
        <Container className="py-3">
          <Skeleton className="h-4 w-64" />
        </Container>
      </div>
      <div className="bg-brand py-12 sm:py-16">
        <Container className="grid items-center gap-8 lg:grid-cols-2">
          <div>
            <Skeleton className="h-3 w-32 bg-white/20" />
            <Skeleton className="mt-4 h-10 w-56 bg-white/20" />
            <Skeleton className="mt-4 h-4 w-full max-w-md bg-white/10" />
          </div>
          <Skeleton className="aspect-[4/3] w-full rounded-card bg-white/10" />
        </Container>
      </div>
      <Section spacing="lg">
        <div className="grid gap-8 lg:grid-cols-[16rem_1fr] lg:gap-10">
          <Skeleton className="hidden h-96 w-full rounded-card lg:block" />
          <div>
            <Skeleton className="h-11 w-full max-w-md rounded-btn" />
            <div className="mt-6">
              <ProductGridSkeleton count={8} />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
