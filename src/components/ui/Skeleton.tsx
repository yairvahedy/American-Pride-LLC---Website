import { cn } from "@/lib/utils";

/**
 * Base shimmer skeleton block. Compose these to build loading states for
 * cards, grids and pages. Uses `animate-pulse` and the steel surface so
 * skeletons read as "content loading", not broken layout.
 */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("animate-pulse rounded-md bg-steel-100", className)}
    />
  );
}
