import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "@/components/icons";
import type { FilterOption } from "@/lib/filters";

/**
 * Reusable, collapsible filter group. Renders checkbox / radio / swatch
 * options and supports a disabled state (greyed out with a hint) for
 * facets that are declared but not yet backed by product data.
 *
 * Uses native <details> for accessible, JS-free collapsing. When active,
 * pass `selected` + `onToggle` to make it interactive.
 */
export function FilterGroup({
  label,
  type,
  options,
  selected = [],
  onToggle,
  disabled = false,
  disabledNote = "Available once products are added.",
  defaultOpen = true,
}: {
  label: string;
  type: "checkbox" | "radio" | "swatch";
  options: FilterOption[];
  selected?: string[];
  onToggle?: (value: string) => void;
  disabled?: boolean;
  disabledNote?: string;
  defaultOpen?: boolean;
}) {
  return (
    <details
      open={defaultOpen}
      className="group border-b border-line py-4 last:border-b-0"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-2 text-sm font-bold text-ink [&::-webkit-details-marker]:hidden">
        <span className="flex items-center gap-2">
          {label}
          {disabled && (
            <span className="rounded-badge bg-steel-100 px-2 py-0.5 text-[0.65rem] font-semibold tracking-wide text-steel-500 uppercase">
              Soon
            </span>
          )}
        </span>
        <ChevronDownIcon className="h-4 w-4 text-steel-400 transition-transform group-open:rotate-180" />
      </summary>

      <div className="mt-3">
        {disabled || options.length === 0 ? (
          <div className={cn(options.length === 0 && "text-sm")}>
            {options.length > 0 && (
              <div className="mb-2 flex flex-wrap gap-2 opacity-50">
                {options.map((o) => (
                  <span
                    key={o.value}
                    className="rounded-btn border border-steel-200 px-2.5 py-1 text-xs text-steel-500"
                  >
                    {o.label}
                  </span>
                ))}
              </div>
            )}
            <p className="text-xs leading-relaxed text-muted">{disabledNote}</p>
          </div>
        ) : type === "swatch" ? (
          <div className="flex flex-wrap gap-2">
            {options.map((o) => (
              <button
                key={o.value}
                type="button"
                onClick={() => onToggle?.(o.value)}
                aria-pressed={selected.includes(o.value)}
                title={o.label}
                className={cn(
                  "h-7 w-7 rounded-full border ring-offset-2 transition-shadow",
                  selected.includes(o.value)
                    ? "border-navy-600 ring-2 ring-navy-500"
                    : "border-steel-300 hover:ring-2 hover:ring-steel-300",
                )}
                style={{ backgroundColor: o.swatch ?? "#ccc" }}
              />
            ))}
          </div>
        ) : (
          <ul className="space-y-1.5">
            {options.map((o) => {
              const checked = selected.includes(o.value);
              return (
                <li key={o.value}>
                  <label className="flex cursor-pointer items-center gap-2.5 rounded-md px-1 py-1 text-sm text-body transition-colors hover:text-ink">
                    <input
                      type={type}
                      checked={checked}
                      onChange={() => onToggle?.(o.value)}
                      className="h-4 w-4 rounded border-steel-300 text-brand accent-navy-700"
                    />
                    {o.label}
                  </label>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </details>
  );
}
