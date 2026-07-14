"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Placeholder } from "@/components/ui/Placeholder";
import { ImageIcon } from "@/components/icons";
import type { ProductImage } from "@/lib/products";

const PLACEHOLDER_SLOTS = 4;

/**
 * Product image gallery: a main viewer with a thumbnail strip. Renders
 * swap-ready placeholders until real photography is supplied.
 */
export function ProductGallery({
  images = [],
  name,
}: {
  images?: ProductImage[];
  name: string;
}) {
  const hasImages = images.length > 0;
  const slots = hasImages ? images : Array.from({ length: PLACEHOLDER_SLOTS });
  const [active, setActive] = useState(0);

  return (
    <div>
      {/* Main viewer */}
      <div className="overflow-hidden rounded-card border border-line bg-surface">
        {hasImages && images[active]?.src ? (
          <Image
            src={images[active].src as string}
            alt={images[active].alt}
            width={900}
            height={900}
            priority
            className="aspect-square w-full object-cover"
          />
        ) : (
          <Placeholder
            ratio="1/1"
            rounded="none"
            label={`${name} — product image`}
          />
        )}
      </div>

      {/* Thumbnails */}
      <div className="mt-3 flex flex-wrap gap-3">
        {slots.map((slot, i) => {
          const img = hasImages ? (slot as ProductImage) : undefined;
          const isActive = active === i;
          return (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              aria-pressed={isActive}
              className={cn(
                "relative h-16 w-16 overflow-hidden rounded-btn border bg-surface transition-colors",
                isActive
                  ? "border-navy-600 ring-2 ring-navy-500/30"
                  : "border-line hover:border-steel-300",
              )}
            >
              {img?.src ? (
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={80}
                  height={80}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="flex h-full w-full items-center justify-center text-steel-400">
                  <ImageIcon className="h-5 w-5" />
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
