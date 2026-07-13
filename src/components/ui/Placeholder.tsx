import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PlaceholderProps = {
  /** Short label describing what image belongs here. */
  label?: string;
  /**
   * CSS aspect-ratio string, e.g. "16/9", "4/3", "1/1". Omit when the
   * placeholder should fill an explicitly-sized parent (use `fill`).
   */
  ratio?: string;
  /** Fill the parent element instead of using an intrinsic ratio. */
  fill?: boolean;
  /** Optional overlay content rendered above the placeholder surface. */
  children?: ReactNode;
  className?: string;
  /** Rounding preset; defaults to the card radius. */
  rounded?: "none" | "card" | "full";
};

const roundedMap = {
  none: "rounded-none",
  card: "rounded-card",
  full: "rounded-full",
} as const;

/**
 * A deliberate, on-brand image placeholder.
 *
 * Used everywhere a real photo, product shot or render will later live.
 * It reads as an intentional design element (not a broken image) and is
 * a drop-in target: swap this for `next/image` when assets arrive, using
 * the same wrapper sizing. A faint hatch pattern + label communicates
 * "image goes here" without shouting.
 */
export function Placeholder({
  label = "Image",
  ratio,
  fill = false,
  children,
  className,
  rounded = "card",
}: PlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={`${label} placeholder`}
      style={ratio ? { aspectRatio: ratio } : undefined}
      className={cn(
        "relative flex items-center justify-center overflow-hidden",
        "border border-line bg-steel-100 text-muted",
        // Subtle diagonal hatch so an empty placeholder still has texture.
        "bg-[repeating-linear-gradient(135deg,var(--color-steel-200)_0px,var(--color-steel-200)_1px,transparent_1px,transparent_11px)]",
        fill && "absolute inset-0 h-full w-full",
        roundedMap[rounded],
        className,
      )}
    >
      {children ?? (
        <span className="flex items-center gap-2 px-3 text-center text-xs font-medium tracking-wide uppercase">
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden
          >
            <rect x="3" y="4" width="18" height="16" rx="2" />
            <circle cx="8.5" cy="9.5" r="1.5" />
            <path d="m4 18 5-5 3.5 3.5L16 13l4 4" />
          </svg>
          {label}
        </span>
      )}
    </div>
  );
}
