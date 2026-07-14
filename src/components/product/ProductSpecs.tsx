import type { Product } from "@/lib/products";

/**
 * Specifications section. Renders the standard attribute set (material,
 * dimensions, packaging) plus any custom spec rows. Values fall back to
 * "Available on request" so the layout is complete before real spec data
 * exists — no fabricated numbers.
 */
export function ProductSpecs({ product }: { product: Product }) {
  const attributes: { label: string; value?: string }[] = [
    { label: "Material", value: product.material },
    { label: "Dimensions", value: product.dimensions },
    { label: "Packaging", value: product.packaging },
    ...(product.specs ?? []),
  ];

  const hasRealData =
    Boolean(product.material || product.dimensions || product.packaging) ||
    (product.specs?.length ?? 0) > 0;

  return (
    <section aria-labelledby="specs-heading">
      <h2 id="specs-heading" className="text-xl font-bold text-ink">
        Specifications
      </h2>
      <dl className="mt-5 divide-y divide-line overflow-hidden rounded-card border border-line">
        {attributes.map((attr, i) => (
          <div
            key={`${attr.label}-${i}`}
            className="grid grid-cols-1 gap-1 px-5 py-3.5 sm:grid-cols-3 sm:gap-4 even:bg-surface-muted"
          >
            <dt className="text-sm font-semibold text-ink">{attr.label}</dt>
            <dd className="text-sm text-body sm:col-span-2">
              {attr.value ?? (
                <span className="text-muted">Available on request</span>
              )}
            </dd>
          </div>
        ))}
      </dl>
      {!hasRealData && (
        <p className="mt-3 text-xs text-muted">
          Detailed specifications are published as products are added. Contact
          us any time for full specs on a specific item.
        </p>
      )}
    </section>
  );
}
