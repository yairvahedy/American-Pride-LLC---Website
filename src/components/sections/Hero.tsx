import Image from "next/image";
import Link from "next/link";
import type { ComponentType, SVGProps } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import {
  HangerIcon,
  BagIcon,
  BottleIcon,
  FlaskIcon,
  SprayIcon,
  IronIcon,
  BoxIcon,
  EstablishedIcon,
  HandshakeIcon,
  TruckIcon,
  ShieldCheckIcon,
  CartIcon,
  BookIcon,
} from "@/components/icons";

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

/* ============================================================
   HERO CONTENT
   ------------------------------------------------------------
   Reproduces the client-supplied hero artwork as an editable,
   layered component. Every layer below can be updated on its
   own without touching the others:

   - HERO_IMAGE ....... the background photograph
   - HEADLINE / SUBHEAD  the copy
   - PRODUCT_LINKS ...  the left-hand product list
   - TRUST_ITEMS .....  the light trust bar under the hero
   - ACTIONS .........  the buttons

   When higher-resolution or individual assets arrive, swap the
   relevant block — the layout stays intact.
   ============================================================ */

/**
 * Background photograph. This is the warehouse photo from the client's
 * hero artwork with the baked-in trust bar/buttons cropped off, so the
 * real (responsive) trust bar and buttons below sit over clean imagery.
 * Replace `src` to swap in a higher-resolution photo later.
 */
const HERO_IMAGE = {
  src: "/images/hero-bg.jpg",
  alt: "American Pride warehouse stocked with dry cleaning and laundry supplies",
} as const;

/**
 * The supplied artwork includes the AP logo top-left. Our Navbar
 * already shows it directly above, so the in-hero logo is off by
 * default to avoid a duplicate. Set to `true` to show it.
 */
const SHOW_BRANDMARK = false;

/** Left-hand product list. Each links to its category page. */
const PRODUCT_LINKS: { label: string; href: string; icon: Icon }[] = [
  { label: "Hangers & Covers", href: "/products/hangers-covers", icon: HangerIcon },
  { label: "Poly Bags & Film", href: "/products/poly-bags-film", icon: BagIcon },
  { label: "Chemicals", href: "/products/chemicals", icon: FlaskIcon },
  { label: "Detergents", href: "/products/detergents", icon: BottleIcon },
  { label: "Spotting Supplies", href: "/products/spotting-supplies", icon: SprayIcon },
  { label: "Pressing Supplies", href: "/products/pressing-supplies", icon: IronIcon },
  { label: "Counter & Packaging Supplies", href: "/products/counter-packaging", icon: BoxIcon },
];

/** Trust bar shown directly below the hero photograph. */
const TRUST_ITEMS: { icon: Icon; title: string; description: string }[] = [
  {
    icon: EstablishedIcon,
    title: "Quality Products",
    description: "Top brands and premium supplies you can count on.",
  },
  {
    icon: HandshakeIcon,
    title: "Personal Service",
    description: "We treat every customer like a partner.",
  },
  {
    icon: TruckIcon,
    title: "Fast & Reliable Shipping",
    description: "On-time delivery to keep your business moving.",
  },
  {
    icon: ShieldCheckIcon,
    title: "35 Years of Experience",
    description: "Three decades of knowledge, trust, and industry leadership.",
  },
];

/** Primary hero actions. */
const ACTIONS = [
  { label: "Shop Products", href: "/products", icon: CartIcon, kind: "primary" as const },
  { label: "Request a Catalog", href: "/contact", icon: BookIcon, kind: "outline" as const },
];

/**
 * Homepage hero — a faithful, responsive rebuild of the client's hero
 * artwork. Two stacked bands (photo hero with the CTA buttons + trust
 * bar). The buttons sit inside the photo band, high enough to be visible
 * on entry and above the trust cards. Each layer is independently
 * editable via the constants above.
 */
export function Hero() {
  return (
    <section aria-label="American Pride — wholesale dry cleaning supplier">
      {/* ---------- Band 1: photographic hero ---------- */}
      <div className="relative isolate overflow-hidden bg-brand-dark">
        {/* Background image (swap-ready layer) */}
        <Image
          src={HERO_IMAGE.src}
          alt={HERO_IMAGE.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-right"
        />

        {/* Legibility overlays: heavy on small screens, an elegant
            left-to-right navy fade on large screens. */}
        <div
          aria-hidden
          className="absolute inset-0 bg-brand-dark/70 lg:hidden"
        />
        <div
          aria-hidden
          className="absolute inset-0 hidden lg:block bg-gradient-to-r from-brand-dark from-[42%] via-brand-dark/70 via-[62%] to-transparent to-[80%]"
        />

        <Container className="relative z-10 py-16 sm:py-20 lg:py-24">
          <div className="max-w-xl lg:max-w-[40rem]">
            {SHOW_BRANDMARK && (
              <div className="mb-8">
                <Logo inverted />
              </div>
            )}

            {/* Headline hierarchy */}
            <h1 className="font-heading font-extrabold uppercase leading-[0.98] tracking-tight text-white">
              <span className="block text-2xl sm:text-3xl lg:text-4xl">
                Supplying America&rsquo;s
              </span>
              <span className="block text-5xl sm:text-6xl lg:text-7xl">
                Dry Cleaners
              </span>
              <span className="block text-5xl text-hero-blue sm:text-6xl lg:text-7xl">
                Since 1990
              </span>
            </h1>

            {/* Subheadline */}
            <p className="mt-6 max-w-lg text-base leading-relaxed text-navy-100 sm:text-lg">
              Premium dry cleaning supplies, packaging, equipment, and personal
              service backed by{" "}
              <strong className="font-semibold text-hero-blue">
                35 years of experience!
              </strong>
            </p>

            {/* Primary actions — kept high in the hero so they are visible
                on entry, above the trust bar. */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {ACTIONS.map(({ label, href, icon: ItemIcon, kind }) => (
                <Button
                  key={label}
                  href={href}
                  size="lg"
                  variant={kind === "primary" ? "primary" : "outline"}
                  className={
                    "w-full sm:w-auto sm:min-w-[220px] " +
                    (kind === "primary"
                      ? "bg-hero-blue hover:bg-hero-blue-hover focus-visible:outline-hero-blue"
                      : "border-white/50 bg-transparent text-white hover:border-white/80 hover:bg-white/10 focus-visible:outline-white")
                  }
                >
                  <ItemIcon className="h-5 w-5" />
                  {label}
                </Button>
              ))}
            </div>

            {/* Product list */}
            <ul className="mt-8 space-y-2.5">
              {PRODUCT_LINKS.map(({ label, href, icon: ItemIcon }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="group inline-flex items-center gap-3 text-white/90 transition-colors hover:text-white"
                  >
                    <ItemIcon className="h-5 w-5 shrink-0 text-white/80 transition-colors group-hover:text-hero-blue" />
                    <span className="text-base sm:text-lg">{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </div>

      {/* ---------- Band 2: trust bar ---------- */}
      <div className="border-b border-line bg-surface-muted">
        <Container>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {TRUST_ITEMS.map(({ icon: ItemIcon, title, description }, index) => (
              <li
                key={title}
                className={
                  "flex items-start gap-4 py-7 sm:px-6 lg:px-8 " +
                  (index > 0
                    ? "border-t border-line sm:border-t-0 lg:border-l lg:border-line"
                    : "")
                }
              >
                <span
                  className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-btn bg-navy-50 text-brand"
                  aria-hidden
                >
                  <ItemIcon className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="text-sm font-bold tracking-wide text-ink uppercase">
                    {title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-body">
                    {description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </section>
  );
}
