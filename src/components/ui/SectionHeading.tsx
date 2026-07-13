import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  /** Small uppercase label above the title. */
  eyebrow?: string;
  title: string;
  /** Supporting sentence(s) below the title. */
  description?: string;
  /** Horizontal alignment of the block. */
  align?: "left" | "center";
  /** Render on a dark/brand surface (adjusts text colors). */
  inverted?: boolean;
  className?: string;
};

/**
 * Standard section intro: eyebrow + heading + description. Keeps titles,
 * spacing and measure consistent across every section on the site.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  inverted = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl",
        className,
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "inline-flex items-center gap-2 text-xs font-semibold tracking-[0.14em] uppercase",
            inverted ? "text-accent-200" : "text-accent-600",
          )}
        >
          <span
            className={cn(
              "h-px w-6",
              inverted ? "bg-accent-200/60" : "bg-accent-400",
            )}
            aria-hidden
          />
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "text-3xl sm:text-4xl",
          inverted ? "text-white" : "text-ink",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "text-base leading-relaxed sm:text-lg",
            inverted ? "text-navy-100" : "text-body",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
