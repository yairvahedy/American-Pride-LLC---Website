"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { ProductColor } from "@/lib/products";

/**
 * Color / finish selector. Renders selectable swatches with the active
 * option named. Reusable on the product page; only shown when a product
 * actually has color options.
 */
export function ColorSelector({
  colors,
  onChange,
}: {
  colors: ProductColor[];
  onChange?: (color: ProductColor) => void;
}) {
  const [active, setActive] = useState(0);
  if (colors.length === 0) return null;

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="text-sm font-semibold text-ink">Color / Finish</span>
        <span className="text-sm text-muted">{colors[active]?.name}</span>
      </div>
      <div className="mt-2 flex flex-wrap gap-2.5">
        {colors.map((color, i) => (
          <button
            key={color.name}
            type="button"
            onClick={() => {
              setActive(i);
              onChange?.(color);
            }}
            title={color.name}
            aria-label={color.name}
            aria-pressed={active === i}
            className={cn(
              "h-9 w-9 rounded-full border ring-offset-2 transition-shadow",
              active === i
                ? "border-navy-600 ring-2 ring-navy-500"
                : "border-steel-300 hover:ring-2 hover:ring-steel-300",
            )}
            style={{ backgroundColor: color.swatch }}
          />
        ))}
      </div>
    </div>
  );
}
