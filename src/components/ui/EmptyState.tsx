import type { ComponentType, ReactNode, SVGProps } from "react";
import { cn } from "@/lib/utils";

type EmptyStateProps = {
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  description?: string;
  /** Optional action(s) — buttons / links. */
  action?: ReactNode;
  className?: string;
  /** Compact variant for inline use (e.g. inside a grid column). */
  compact?: boolean;
};

/**
 * Professional empty state used across the catalog and quote flows:
 * no search results, empty category, empty quote, etc. Icon + message +
 * optional action, centered on a subtle dashed panel.
 */
export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
  compact = false,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-card border border-dashed border-steel-300 bg-surface-muted text-center",
        compact ? "px-6 py-10" : "px-6 py-16 sm:py-20",
        className,
      )}
    >
      {Icon && (
        <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white text-steel-400 ring-1 ring-steel-200">
          <Icon className="h-7 w-7" />
        </span>
      )}
      <h3 className="text-lg font-bold text-ink">{title}</h3>
      {description && (
        <p className="mt-2 max-w-md text-sm leading-relaxed text-body">
          {description}
        </p>
      )}
      {action && <div className="mt-6 flex flex-wrap justify-center gap-3">{action}</div>}
    </div>
  );
}
