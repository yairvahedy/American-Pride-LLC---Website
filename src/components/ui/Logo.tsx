import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

type LogoProps = {
  className?: string;
  /** Use light text/mark for placement on dark (brand) backgrounds. */
  inverted?: boolean;
};

/**
 * Temporary text logo.
 *
 * A simple lettermark emblem + wordmark standing in until the client's
 * real logo is supplied. Swapping in the final asset means replacing
 * only this component — nothing else references the mark directly.
 */
export function Logo({ className, inverted = false }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} — home`}
      className={cn(
        "group inline-flex items-center gap-3",
        className,
      )}
    >
      {/* Lettermark emblem */}
      <span
        className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-btn font-heading text-sm font-bold tracking-tight",
          inverted
            ? "bg-white text-brand"
            : "bg-brand text-white",
        )}
        aria-hidden
      >
        AP
      </span>

      {/* Wordmark */}
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-heading text-lg font-bold tracking-tight",
            inverted ? "text-white" : "text-ink",
          )}
        >
          American Pride
        </span>
        <span
          className={cn(
            "text-[0.7rem] font-semibold tracking-[0.22em] uppercase",
            inverted ? "text-navy-200" : "text-muted",
          )}
        >
          Wholesale Supply
        </span>
      </span>
    </Link>
  );
}
