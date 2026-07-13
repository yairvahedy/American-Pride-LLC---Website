import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type CardProps = {
  children: ReactNode;
  className?: string;
  /** Add hover elevation + border emphasis (for interactive cards). */
  interactive?: boolean;
  /** Internal padding preset. Use "none" when a media element bleeds
   *  to the card edges and you pad the body separately. */
  padding?: "none" | "sm" | "md" | "lg";
  as?: ElementType;
};

const paddingMap = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
} as const;

/**
 * Base surface card: white background, hairline border, modest radius
 * and the standard soft shadow. The building block for category cards,
 * value-prop cards, industry cards, etc.
 */
export function Card({
  children,
  className,
  interactive = false,
  padding = "md",
  as: Tag = "div",
}: CardProps) {
  return (
    <Tag
      className={cn(
        "relative overflow-hidden rounded-card border border-line bg-surface shadow-card",
        paddingMap[padding],
        interactive &&
          "transition-all duration-200 hover:-translate-y-0.5 hover:border-steel-300 hover:shadow-card-hover",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
