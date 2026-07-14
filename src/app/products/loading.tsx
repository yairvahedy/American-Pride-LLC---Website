import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Skeleton } from "@/components/ui/Skeleton";

/** Catalog landing loading skeleton. */
export default function ProductsLoading() {
  return (
    <>
      <div className="bg-brand py-14 sm:py-18">
        <Container>
          <Skeleton className="h-3 w-32 bg-white/20" />
          <Skeleton className="mt-4 h-10 w-64 bg-white/20" />
          <Skeleton className="mt-4 h-4 w-full max-w-xl bg-white/10" />
        </Container>
      </div>
      <Section spacing="lg">
        <div className="grid gap-8 lg:grid-cols-[16rem_1fr] lg:gap-10">
          <Skeleton className="hidden h-96 w-full rounded-card lg:block" />
          <div>
            <Skeleton className="h-13 w-full max-w-xl rounded-btn" />
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-72 w-full rounded-card" />
              ))}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
