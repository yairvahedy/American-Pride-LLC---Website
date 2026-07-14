import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeTone = "success" | "warning" | "info" | "muted" | "brand" | "accent";

const toneStyles: Record<BadgeTone, string> = {
  success: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  warning: "bg-amber-50 text-amber-700 ring-amber-600/20",
  info: "bg-sky-50 text-sky-700 ring-sky-600/20",
  muted: "bg-steel-100 text-steel-600 ring-steel-500/20",
  brand: "bg-navy-50 text-brand ring-navy-600/15",
  accent: "bg-accent-50 text-accent-700 ring-accent-600/20",
};

type BadgeProps = {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
  /** Small leading dot (for status badges). */
  dot?: boolean;
};

/**
 * Small pill label used for statuses, tags and counts. Tone-driven so it
 * stays consistent everywhere it's used.
 */
export function Badge({ children, tone = "muted", className, dot }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-badge px-2.5 py-1 text-xs font-semibold ring-1 ring-inset",
        toneStyles[tone],
        className,
      )}
    >
      {dot && (
        <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden />
      )}
      {children}
    </span>
  );
}
