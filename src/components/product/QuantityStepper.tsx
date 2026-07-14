"use client";

import { cn } from "@/lib/utils";
import { PlusIcon, MinusIcon } from "@/components/icons";

/**
 * Accessible quantity stepper. Reusable in the product buy-box and the
 * quote list.
 */
export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 9999,
  size = "md",
  className,
  ariaLabel = "Quantity",
}: {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md";
  className?: string;
  ariaLabel?: string;
}) {
  const clamp = (n: number) => Math.min(max, Math.max(min, n));
  const dim = size === "sm" ? "h-9 w-9" : "h-11 w-11";
  const field = size === "sm" ? "h-9 w-12 text-sm" : "h-11 w-14 text-base";

  return (
    <div
      className={cn(
        "inline-flex items-stretch overflow-hidden rounded-btn border border-steel-300 bg-surface",
        className,
      )}
    >
      <button
        type="button"
        onClick={() => onChange(clamp(value - 1))}
        disabled={value <= min}
        aria-label="Decrease quantity"
        className={cn(
          "flex items-center justify-center text-ink transition-colors hover:bg-steel-100 disabled:opacity-40",
          dim,
        )}
      >
        <MinusIcon className="h-4 w-4" />
      </button>
      <input
        type="number"
        inputMode="numeric"
        value={value}
        min={min}
        max={max}
        aria-label={ariaLabel}
        onChange={(e) => onChange(clamp(parseInt(e.target.value, 10) || min))}
        className={cn(
          "border-x border-steel-300 text-center font-semibold text-ink outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
          field,
        )}
      />
      <button
        type="button"
        onClick={() => onChange(clamp(value + 1))}
        disabled={value >= max}
        aria-label="Increase quantity"
        className={cn(
          "flex items-center justify-center text-ink transition-colors hover:bg-steel-100 disabled:opacity-40",
          dim,
        )}
      >
        <PlusIcon className="h-4 w-4" />
      </button>
    </div>
  );
}
