import { cn } from "@/lib/utils";
import { DownloadIcon, DocumentIcon } from "@/components/icons";
import type { Product } from "@/lib/products";

const PLACEHOLDER_DOCS = ["Spec Sheet (PDF)", "Safety Data Sheet (PDF)"];

/**
 * Downloads section (spec sheets, SDS, catalog pages). Renders real
 * documents when present; otherwise shows the standard document slots as
 * disabled "available on request" rows so the section is ready for PDFs.
 */
export function ProductDownloads({ product }: { product: Product }) {
  const docs = product.documents ?? [];

  return (
    <section aria-labelledby="downloads-heading">
      <h2 id="downloads-heading" className="text-xl font-bold text-ink">
        Downloads
      </h2>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {docs.length > 0
          ? docs.map((doc) => (
              <a
                key={doc.href}
                href={doc.href}
                className="flex items-center gap-3 rounded-card border border-line bg-surface p-4 shadow-card transition-colors hover:border-steel-300"
              >
                <DocumentIcon className="h-5 w-5 shrink-0 text-brand" />
                <span className="flex-1 text-sm font-semibold text-ink">
                  {doc.label}
                </span>
                <DownloadIcon className="h-5 w-5 text-steel-400" />
              </a>
            ))
          : PLACEHOLDER_DOCS.map((label) => (
              <div
                key={label}
                className={cn(
                  "flex items-center gap-3 rounded-card border border-dashed border-steel-300 bg-surface-muted p-4",
                )}
                aria-disabled
              >
                <DocumentIcon className="h-5 w-5 shrink-0 text-steel-400" />
                <span className="flex-1 text-sm font-semibold text-steel-500">
                  {label}
                </span>
                <span className="text-xs font-medium text-muted">
                  On request
                </span>
              </div>
            ))}
      </div>
    </section>
  );
}
