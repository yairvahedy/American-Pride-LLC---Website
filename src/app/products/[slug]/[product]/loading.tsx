import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Skeleton } from "@/components/ui/Skeleton";

/** Product page loading skeleton. */
export default function ProductLoading() {
  return (
    <>
      <div className="border-b border-line bg-surface">
        <Container className="py-3">
          <Skeleton className="h-4 w-80" />
        </Container>
      </div>
      <Section spacing="md">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Gallery */}
          <div>
            <Skeleton className="aspect-square w-full rounded-card" />
            <div className="mt-3 flex gap-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-16 w-16 rounded-btn" />
              ))}
            </div>
          </div>
          {/* Info */}
          <div className="space-y-4">
            <Skeleton className="h-3 w-28" />
            <Skeleton className="h-9 w-3/4" />
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-28 w-full rounded-card" />
            <Skeleton className="h-12 w-full rounded-btn" />
          </div>
        </div>
      </Section>
    </>
  );
}
