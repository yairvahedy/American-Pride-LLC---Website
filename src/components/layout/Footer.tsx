import Link from "next/link";
import { mainNav } from "@/lib/nav";
import { siteConfig } from "@/lib/site-config";
import { productCategories } from "@/lib/products";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { PhoneIcon, WhatsAppIcon, MailIcon, MapPinIcon } from "@/components/icons";

/**
 * Site footer. Brand summary, quick navigation, a short category list
 * for SEO/discoverability, and a contact block. Pulls everything from
 * shared config/data so it stays accurate as the site grows.
 */
export function Footer() {
  const year = 2026; // Static to keep the component server-safe & stable.
  const footerCategories = productCategories.slice(0, 6);

  return (
    <footer className="mt-auto border-t border-line bg-brand-dark text-navy-100">
      <Container className="py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand + blurb */}
          <div className="lg:pr-6">
            <Logo inverted />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-navy-200">
              {siteConfig.tagline}. Serving California&rsquo;s dry cleaners,
              laundries and uniform companies since 1990.
            </p>
          </div>

          {/* Navigate */}
          <nav aria-label="Footer">
            <h3 className="text-sm font-semibold tracking-wide text-white uppercase">
              Company
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-navy-200 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Product categories */}
          <nav aria-label="Product categories">
            <h3 className="text-sm font-semibold tracking-wide text-white uppercase">
              Products
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {footerCategories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/products/${category.slug}`}
                    className="text-navy-200 transition-colors hover:text-white"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold tracking-wide text-white uppercase">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={siteConfig.contact.phone.href}
                  className="inline-flex items-center gap-2.5 text-navy-100 transition-colors hover:text-white"
                >
                  <PhoneIcon className="h-4 w-4 shrink-0 text-accent-300" />
                  {siteConfig.contact.phone.display}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.contact.whatsapp.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2.5 text-navy-100 transition-colors hover:text-white"
                >
                  <WhatsAppIcon className="h-4 w-4 shrink-0 text-accent-300" />
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.contact.email.href}
                  className="inline-flex items-center gap-2.5 break-all text-navy-100 transition-colors hover:text-white"
                >
                  <MailIcon className="h-4 w-4 shrink-0 text-accent-300" />
                  {siteConfig.contact.email.display}
                </a>
              </li>
              <li className="pt-1">
                <a
                  href={siteConfig.contact.address.mapHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-start gap-2.5 text-navy-200 transition-colors hover:text-white"
                >
                  <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent-300" />
                  <span>
                    {siteConfig.legalName}
                    <br />
                    {siteConfig.contact.address.line1}
                    <br />
                    {siteConfig.contact.address.city},{" "}
                    {siteConfig.contact.address.state}{" "}
                    {siteConfig.contact.address.zip}
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-3 border-t border-navy-700/60 pt-6 text-xs text-navy-300 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {siteConfig.legalName}. All rights reserved.
          </p>
          <p>Wholesale supplier to the dry cleaning &amp; laundry industry.</p>
        </div>
      </Container>
    </footer>
  );
}
