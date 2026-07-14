"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Placeholder } from "@/components/ui/Placeholder";
import { CubeIcon, ImageIcon } from "@/components/icons";
import type { ProductImage, ProductModel3D } from "@/lib/products";

const PLACEHOLDER_SLOTS = 4;

/**
 * Product image gallery: a main viewer with a thumbnail strip and a
 * dedicated slot for the future interactive 3D viewer. Renders swap-ready
 * placeholders until real photography / a 3D model is supplied.
 */
export function ProductGallery({
  images = [],
  model3d,
  name,
}: {
  images?: ProductImage[];
  model3d?: ProductModel3D;
  name: string;
}) {
  const hasImages = images.length > 0;
  const slots = hasImages ? images : Array.from({ length: PLACEHOLDER_SLOTS });
  const [active, setActive] = useState(0);
  const [view, setView] = useState<"image" | "3d">("image");

  return (
    <div>
      {/* Main viewer */}
      <div className="overflow-hidden rounded-card border border-line bg-surface">
        {view === "3d" ? (
          <div className="flex aspect-square w-full flex-col items-center justify-center gap-3 bg-steel-50 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-brand ring-1 ring-steel-200">
              <CubeIcon className="h-8 w-8" />
            </span>
            <p className="text-sm font-semibold text-ink">Interactive 3D viewer</p>
            <p className="max-w-xs text-xs text-muted">
              A rotatable 3D render will load here once the model is available.
            </p>
          </div>
        ) : hasImages && images[active]?.src ? (
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

      {/* Thumbnails + 3D tab */}
      <div className="mt-3 flex flex-wrap gap-3">
        {slots.map((slot, i) => {
          const img = hasImages ? (slot as ProductImage) : undefined;
          const isActive = view === "image" && active === i;
          return (
            <button
              key={i}
              type="button"
              onClick={() => {
                setView("image");
                setActive(i);
              }}
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

        {/* 3D viewer slot */}
        <button
          type="button"
          onClick={() => setView("3d")}
          aria-label="View in 3D"
          aria-pressed={view === "3d"}
          className={cn(
            "relative flex h-16 w-16 flex-col items-center justify-center gap-0.5 rounded-btn border bg-surface text-[0.6rem] font-semibold transition-colors",
            view === "3d"
              ? "border-navy-600 text-brand ring-2 ring-navy-500/30"
              : "border-line text-steel-500 hover:border-steel-300",
          )}
        >
          <CubeIcon className="h-5 w-5" />
          3D
        </button>
      </div>
      {!model3d && (
        <p className="mt-2 text-xs text-muted">
          3D render coming soon for this product.
        </p>
      )}
    </div>
  );
}
