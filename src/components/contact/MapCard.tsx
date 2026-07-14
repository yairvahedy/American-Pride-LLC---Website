import { siteConfig } from "@/lib/site-config";
import { MapPinIcon, ArrowRightIcon } from "@/components/icons";

/* A stylized, on-brand city-map illustration (not a live map). Blocks +
   roads in the site's steel/navy palette with an accent location pin.
   The whole card links out to Google Maps for the real thing. */

// City blocks laid out on a road grid (viewBox 800 x 450).
const COLS: [number, number][] = [
  [10, 168],
  [204, 362],
  [398, 560],
  [596, 790],
];
const ROWS: [number, number][] = [
  [10, 122],
  [158, 282],
  [318, 440],
];
const BLOCK_SHADES = ["var(--color-steel-200)", "var(--color-steel-300)"];

export function MapCard() {
  const { address } = siteConfig.contact;

  const blocks: { x: number; y: number; w: number; h: number; fill: string }[] =
    [];
  ROWS.forEach(([y0, y1], r) =>
    COLS.forEach(([x0, x1], c) => {
      // Leave the central block open as a "plaza" for the pin.
      if (r === 1 && c === 2) return;
      blocks.push({
        x: x0,
        y: y0,
        w: x1 - x0,
        h: y1 - y0,
        fill: BLOCK_SHADES[(r + c) % 2],
      });
    }),
  );

  return (
    <a
      href={address.mapHref}
      target="_blank"
      rel="noreferrer"
      aria-label={`Open ${address.full} in Google Maps`}
      className="group relative block aspect-[16/9] w-full overflow-hidden rounded-card border border-line shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-600"
    >
      <svg
        viewBox="0 0 800 450"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        role="img"
        aria-hidden
      >
        {/* Ground / roads base */}
        <rect width="800" height="450" fill="var(--color-surface)" />

        {/* Blocks */}
        {blocks.map((b, i) => (
          <rect
            key={i}
            x={b.x}
            y={b.y}
            width={b.w}
            height={b.h}
            rx="10"
            fill={b.fill}
          />
        ))}

        {/* A park block for map realism */}
        <rect x="204" y="318" width="158" height="122" rx="10" fill="#dbe7db" />

        {/* Main avenues — white strips with dashed center lines */}
        <g stroke="var(--color-steel-300)" strokeWidth="2" strokeDasharray="10 10">
          <line x1="0" y1="140" x2="800" y2="140" />
          <line x1="0" y1="300" x2="800" y2="300" />
          <line x1="185" y1="0" x2="185" y2="450" />
          <line x1="379" y1="0" x2="379" y2="450" />
          <line x1="578" y1="0" x2="578" y2="450" />
        </g>

        {/* Highlighted route to the destination */}
        <path
          d="M 0 415 L 185 415 L 185 300 L 379 300 L 470 225"
          fill="none"
          stroke="var(--color-brand)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.85"
        />

        {/* Plaza + pin */}
        <circle cx="479" cy="222" r="52" fill="var(--color-surface)" opacity="0.7" />
        <circle
          cx="479"
          cy="222"
          r="30"
          fill="var(--color-accent-200)"
          opacity="0.5"
        />
        {/* Pin shadow */}
        <ellipse cx="479" cy="236" rx="14" ry="4" fill="var(--color-navy-900)" opacity="0.18" />
        {/* Pin marker */}
        <path
          d="M479 180c-16 0-29 13-29 29 0 21 29 45 29 45s29-24 29-45c0-16-13-29-29-29Z"
          fill="var(--color-accent-strong)"
        />
        <circle cx="479" cy="209" r="10" fill="var(--color-surface)" />
      </svg>

      {/* Address + CTA bar */}
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 border-t border-line bg-white/95 px-4 py-3 backdrop-blur">
        <span className="flex min-w-0 items-center gap-2">
          <MapPinIcon className="h-4 w-4 shrink-0 text-accent-600" />
          <span className="truncate text-sm font-semibold text-ink">
            {address.line1}, {address.city}
          </span>
        </span>
        <span className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-brand">
          <span className="hidden sm:inline">Open in Google Maps</span>
          <span className="sm:hidden">Directions</span>
          <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </a>
  );
}
