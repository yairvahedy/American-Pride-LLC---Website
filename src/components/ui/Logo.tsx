import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

type LogoProps = {
  className?: string;
  /** Use light mark/text for placement on dark (brand) backgrounds. */
  inverted?: boolean;
  /** Hide the wordmark text and show the mark only. */
  markOnly?: boolean;
};

/**
 * Brand logo — the official American Pride hanger "AP" mark paired with
 * the company wordmark. The mark is a transparent PNG; on dark surfaces
 * the `inverted` variant renders it white via a filter. Swapping the
 * brand asset means replacing /public/images/logo-mark.png only.
 */
export function Logo({ className, inverted = false, markOnly = false }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} — home`}
      className={cn("group inline-flex items-center gap-2.5", className)}
    >
      <Image
        src="/images/logo-mark.png"
        alt={markOnly ? siteConfig.name : ""}
        width={839}
        height={544}
        sizes="64px"
        priority
        className={cn(
          "h-10 w-auto shrink-0",
          inverted && "brightness-0 invert",
        )}
      />

      {!markOnly && (
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
      )}
    </Link>
  );
}
