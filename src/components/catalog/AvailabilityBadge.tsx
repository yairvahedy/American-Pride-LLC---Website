import { Badge } from "@/components/ui/Badge";
import { availabilityMeta, type Availability } from "@/lib/products";

/**
 * Stock-status badge. Maps an `Availability` value to a toned pill via the
 * shared availability metadata so labels/colors stay consistent.
 */
export function AvailabilityBadge({
  availability,
  className,
}: {
  availability?: Availability;
  className?: string;
}) {
  if (!availability) return null;
  const meta = availabilityMeta[availability];
  return (
    <Badge tone={meta.tone} dot className={className}>
      {meta.label}
    </Badge>
  );
}
