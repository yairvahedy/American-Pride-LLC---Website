import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  /** Render as a different element (e.g. "header", "section"). */
  as?: ElementType;
};

/**
 * Horizontal content wrapper. Centers content, caps width at the
 * design-system container width and applies consistent responsive
 * gutters. Every full-bleed section places a Container inside it.
 */
export function Container({
  children,
  className,
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full max-w-container px-5 sm:px-6 lg:px-8",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
