import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";

type SectionSpacing = "sm" | "md" | "lg";
type SectionSurface = "default" | "muted" | "sunken" | "brand";

const spacingMap: Record<SectionSpacing, string> = {
  sm: "py-12 sm:py-16",
  md: "py-16 sm:py-20 lg:py-24",
  lg: "py-20 sm:py-24 lg:py-32",
};

const surfaceMap: Record<SectionSurface, string> = {
  default: "bg-surface",
  muted: "bg-surface-muted",
  sunken: "bg-surface-sunken",
  brand: "bg-brand text-white",
};

type SectionProps = {
  children: ReactNode;
  className?: string;
  /** Inner container className (spacing, max-width overrides). */
  containerClassName?: string;
  /** Vertical rhythm preset. */
  spacing?: SectionSpacing;
  /** Background treatment used for alternating section backgrounds. */
  surface?: SectionSurface;
  /** When false, children are rendered full-bleed without a Container. */
  contained?: boolean;
  as?: ElementType;
  id?: string;
};

/**
 * A full-width page section with consistent vertical spacing and an
 * optional background surface. Standardizes the rhythm of the page so
 * every section stacks predictably. Wraps its children in a Container
 * unless `contained` is set to false.
 */
export function Section({
  children,
  className,
  containerClassName,
  spacing = "md",
  surface = "default",
  contained = true,
  as: Tag = "section",
  id,
}: SectionProps) {
  return (
    <Tag
      id={id}
      className={cn(spacingMap[spacing], surfaceMap[surface], className)}
    >
      {contained ? (
        <Container className={containerClassName}>{children}</Container>
      ) : (
        children
      )}
    </Tag>
  );
}
