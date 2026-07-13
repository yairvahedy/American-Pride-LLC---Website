import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "accent";
export type ButtonSize = "sm" | "md" | "lg";

const baseStyles =
  "inline-flex items-center justify-center gap-2 font-semibold rounded-btn " +
  "transition-colors duration-150 select-none whitespace-nowrap " +
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 " +
  "disabled:pointer-events-none disabled:opacity-55";

const variantStyles: Record<ButtonVariant, string> = {
  // Solid navy — primary calls to action.
  primary:
    "bg-brand text-white hover:bg-brand-dark focus-visible:outline-navy-600 shadow-card",
  // White surface with navy text — secondary actions on dark/photo backgrounds.
  secondary:
    "bg-white text-brand hover:bg-steel-100 focus-visible:outline-white shadow-card",
  // Bordered — quieter action that still reads as a button.
  outline:
    "border border-steel-300 text-ink bg-transparent hover:bg-steel-100 hover:border-steel-400 focus-visible:outline-navy-600",
  // Text-only.
  ghost:
    "text-brand bg-transparent hover:bg-navy-50 focus-visible:outline-navy-600",
  // Warm accent — used sparingly for a single high-emphasis CTA.
  accent:
    "bg-accent-strong text-white hover:bg-accent-600 focus-visible:outline-accent-600 shadow-card",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-base",
};

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Stretch to fill the parent width. */
  fullWidth?: boolean;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

function classesFor({
  variant = "primary",
  size = "md",
  fullWidth,
  className,
}: Pick<CommonProps, "variant" | "size" | "fullWidth" | "className">) {
  return cn(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    fullWidth && "w-full",
    className,
  );
}

/**
 * The single button primitive for the whole site.
 *
 * - Renders a real `<button>` by default.
 * - When given `href`, renders a Next.js `<Link>` for internal routes
 *   or a plain `<a>` for external / `tel:` / `mailto:` / `#` targets,
 *   so it works everywhere without callers thinking about it.
 */
export function Button(props: ButtonProps) {
  // Strip our custom props so only valid DOM attributes are spread through.
  const { variant, size, fullWidth, className, children, ...domProps } = props;
  const classes = classesFor({ variant, size, fullWidth, className });

  if (props.href !== undefined) {
    const { href, ...anchorProps } = domProps as AnchorHTMLAttributes<HTMLAnchorElement> & {
      href: string;
    };
    const isInternal = href.startsWith("/");

    if (isInternal) {
      return (
        <Link href={href} className={classes} {...anchorProps}>
          {children}
        </Link>
      );
    }

    return (
      <a href={href} className={classes} {...anchorProps}>
        {children}
      </a>
    );
  }

  const { type = "button", ...buttonProps } =
    domProps as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type={type} className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
