import type { SVGProps } from "react";

/**
 * Lightweight inline icon set. Keeping these as local components avoids
 * an icon-library dependency and lets every icon inherit `currentColor`
 * and accept standard SVG props (className, aria-hidden, etc.).
 */

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function PhoneIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4.5 5.5c0-.55.45-1 1-1h2.2c.46 0 .86.31.97.76l.86 3.45c.1.4-.03.82-.34 1.09l-1.5 1.3a13 13 0 0 0 5.46 5.46l1.3-1.5c.27-.31.69-.44 1.09-.34l3.45.86c.45.11.76.51.76.97v2.2c0 .55-.45 1-1 1A15.5 15.5 0 0 1 4.5 5.5Z" />
    </svg>
  );
}

export function WhatsAppIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.48 1.34 5L2 22l5.16-1.35a9.9 9.9 0 0 0 4.88 1.25h.01c5.5 0 9.96-4.46 9.96-9.96 0-2.66-1.04-5.16-2.92-7.04A9.9 9.9 0 0 0 12.04 2Zm0 1.8c2.18 0 4.23.85 5.78 2.4a8.13 8.13 0 0 1 2.4 5.77c0 4.52-3.67 8.18-8.18 8.18a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.06.8.82-2.98-.2-.31a8.13 8.13 0 0 1-1.25-4.36c0-4.52 3.66-8.18 8.17-8.18Zm-2.5 4.13c-.18 0-.47.07-.72.34-.25.27-.95.93-.95 2.27 0 1.34.98 2.63 1.11 2.81.14.18 1.9 2.9 4.6 4.06.64.28 1.14.44 1.53.56.64.2 1.23.18 1.69.11.51-.08 1.58-.65 1.8-1.27.22-.63.22-1.16.16-1.27-.07-.11-.25-.18-.52-.31-.27-.14-1.58-.78-1.83-.87-.24-.09-.42-.14-.6.14-.18.27-.68.86-.83 1.04-.16.18-.31.2-.58.07-.27-.14-1.13-.42-2.16-1.33-.8-.71-1.34-1.59-1.5-1.86-.14-.27-.01-.42.12-.55.12-.12.27-.31.4-.47.14-.16.18-.27.28-.45.09-.18.05-.34-.02-.48-.07-.14-.6-1.47-.83-2.01-.22-.53-.44-.46-.6-.46l-.5-.01Z" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12.5 10 17l9-10" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

export function MapPinIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

/* --- Trust-card icons --- */

export function EstablishedIcon(props: IconProps) {
  // A rosette / seal — communicates "established, trusted".
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="9" r="5.5" />
      <path d="M9 13.5 7.5 21l4.5-2.5L16.5 21 15 13.5" />
      <path d="M12 6.5v2.8l1.9 1.1" />
    </svg>
  );
}

export function InventoryIcon(props: IconProps) {
  // Stacked boxes — deep inventory.
  return (
    <svg {...base} {...props}>
      <path d="M3.5 8 12 4l8.5 4-8.5 4-8.5-4Z" />
      <path d="M3.5 8v8l8.5 4 8.5-4V8" />
      <path d="M12 12v8" />
    </svg>
  );
}

export function PriceTagIcon(props: IconProps) {
  // Price tag — competitive pricing.
  return (
    <svg {...base} {...props}>
      <path d="M4 4h7l9 9-7 7-9-9V4Z" />
      <circle cx="8" cy="8" r="1.4" />
    </svg>
  );
}

export function HeadsetIcon(props: IconProps) {
  // Support headset — personal service.
  return (
    <svg {...base} {...props}>
      <path d="M4 13v-1a8 8 0 0 1 16 0v1" />
      <rect x="3" y="13" width="4" height="6" rx="1.4" />
      <rect x="17" y="13" width="4" height="6" rx="1.4" />
      <path d="M20 19a4 4 0 0 1-4 3.2H13" />
    </svg>
  );
}

export function HandshakeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M11 6 8.5 4.5 3 8v7l3 1 3.5-3" />
      <path d="M13 6l2.5-1.5L21 8v7l-3 1-4-3.5" />
      <path d="M9 12.5 11.5 15c.7.7 1.8.7 2.5 0l.3-.3" />
      <path d="m9.5 10 2 2c.7.7 1.8.7 2.5 0" />
    </svg>
  );
}

export function TruckIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 6h11v9H3z" />
      <path d="M14 9h4l3 3v3h-7z" />
      <circle cx="7" cy="17.5" r="1.8" />
      <circle cx="17" cy="17.5" r="1.8" />
    </svg>
  );
}

export function ShieldCheckIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3 5 6v5c0 4.2 2.9 7.6 7 9 4.1-1.4 7-4.8 7-9V6l-7-3Z" />
      <path d="m9 11.5 2 2 4-4.5" />
    </svg>
  );
}

export function CartIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 4h2l2.2 11.2a1 1 0 0 0 1 .8h8.4a1 1 0 0 0 1-.8L20 7H6" />
      <circle cx="9" cy="20" r="1.4" />
      <circle cx="17" cy="20" r="1.4" />
    </svg>
  );
}

export function BookIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H12v15H5.5A1.5 1.5 0 0 0 4 20.5V5.5Z" />
      <path d="M20 5.5A1.5 1.5 0 0 0 18.5 4H12v15h6.5a1.5 1.5 0 0 1 1.5 1.5V5.5Z" />
    </svg>
  );
}

/* --- Product-category line icons (hero list) --- */

export function HangerIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 7a2 2 0 1 1 2 2c-1 0-2 .8-2 2v.5" />
      <path d="M12 11.5 4 17.5a1 1 0 0 0 .6 1.8h14.8a1 1 0 0 0 .6-1.8L12 11.5Z" />
    </svg>
  );
}

export function BagIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M7 8V6a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v2" />
      <path d="M6 8h12l-.8 11.2a1 1 0 0 1-1 .8H7.8a1 1 0 0 1-1-.8L6 8Z" />
    </svg>
  );
}

export function BottleIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M10 3h4v2l1.5 2.5a3 3 0 0 1 .5 1.7V19a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V9.2a3 3 0 0 1 .5-1.7L10 5V3Z" />
      <path d="M8 13h8" />
    </svg>
  );
}

export function FlaskIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M10 3v6.5L5.5 17A2 2 0 0 0 7.2 20h9.6a2 2 0 0 0 1.7-3L14 9.5V3" />
      <path d="M9 3h6" />
      <path d="M8.5 14h7" />
    </svg>
  );
}

export function SprayIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M9 8V5h4v3" />
      <path d="M13 5h2m-2 1.5h2.5M15 8h2" />
      <path d="M8 8h6v3a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V8Z" />
      <path d="M9 12v7a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-7" />
    </svg>
  );
}

export function IronIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 16v-2a6 6 0 0 1 6-6h10l-1 6a2 2 0 0 1-2 2H4Z" />
      <path d="M4 19h13" />
      <path d="M15 8V6a1 1 0 0 0-1-1h-3" />
    </svg>
  );
}

export function BoxIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 8h16v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8Z" />
      <path d="M3 5h18v3H3z" />
      <path d="M10 12h4" />
    </svg>
  );
}

/* --- Catalog / UI icons --- */

export function SearchIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.2-3.2" />
    </svg>
  );
}

export function FilterIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 6h18M6 12h12M10 18h4" />
    </svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

export function ChevronLeftIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m15 6-6 6 6 6" />
    </svg>
  );
}

export function PlusIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function MinusIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12h14" />
    </svg>
  );
}

export function TrashIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m2 0-.7 12a1 1 0 0 1-1 1H7.7a1 1 0 0 1-1-1L6 7" />
      <path d="M10 11v6M14 11v6" />
    </svg>
  );
}

export function DownloadIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3v12m0 0 4-4m-4 4-4-4" />
      <path d="M4 17v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-2" />
    </svg>
  );
}

export function CubeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3 4 7v10l8 4 8-4V7l-8-4Z" />
      <path d="m4 7 8 4 8-4M12 11v10" />
    </svg>
  );
}

export function DocumentIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 3h8l4 4v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
      <path d="M14 3v4h4M8 13h8M8 17h5" />
    </svg>
  );
}

export function ImageIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="8.5" cy="9.5" r="1.5" />
      <path d="m4 18 5-5 3.5 3.5L16 13l4 4" />
    </svg>
  );
}

export function ClipboardIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="5" y="4" width="14" height="17" rx="2" />
      <path d="M9 4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V4Z" />
      <path d="M9 11h6M9 15h6" />
    </svg>
  );
}

export function InboxIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 13 6 5h12l2 8v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6Z" />
      <path d="M4 13h4l1 2h6l1-2h4" />
    </svg>
  );
}
