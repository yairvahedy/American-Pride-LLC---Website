import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Placeholder } from "@/components/ui/Placeholder";
import { PhoneIcon, WhatsAppIcon, MailIcon, MapPinIcon } from "@/components/icons";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact American Pride LLC for wholesale dry cleaning and laundry supplies, pricing and quotes. Call or message us on WhatsApp.",
};

const methods = [
  {
    icon: PhoneIcon,
    label: "Call Us",
    value: siteConfig.contact.phone.display,
    href: siteConfig.contact.phone.href,
  },
  {
    icon: WhatsAppIcon,
    label: "WhatsApp",
    value: siteConfig.contact.whatsapp.display,
    href: siteConfig.contact.whatsapp.href,
  },
  {
    icon: MailIcon,
    label: "Email",
    value: siteConfig.contact.email.display,
    href: siteConfig.contact.email.href,
  },
];

/**
 * Contact page (stub). Contact methods are live; the quote/contact form
 * is added in a later phase — its position is reserved below.
 */
export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get In Touch"
        title="Contact American Pride"
        description="Questions about products, availability or wholesale pricing? Reach out — a real person who knows the industry will help you out."
      />

      <Section spacing="lg">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Contact methods */}
          <div>
            <h2 className="text-2xl">Ways to reach us</h2>
            <div className="mt-6 space-y-4">
              {methods.map((method) => {
                const Icon = method.icon;
                return (
                  <a
                    key={method.label}
                    href={method.href}
                    target={method.href.startsWith("http") ? "_blank" : undefined}
                    rel={method.href.startsWith("http") ? "noreferrer" : undefined}
                    className="flex items-center gap-4 rounded-card border border-line bg-surface p-5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-btn bg-navy-50 text-brand">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-xs font-semibold tracking-wide text-muted uppercase">
                        {method.label}
                      </span>
                      <span className="block font-semibold text-ink">
                        {method.value}
                      </span>
                    </span>
                  </a>
                );
              })}

              {/* Address */}
              <a
                href={siteConfig.contact.address.mapHref}
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-4 rounded-card border border-line bg-surface p-5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-btn bg-navy-50 text-brand">
                  <MapPinIcon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs font-semibold tracking-wide text-muted uppercase">
                    Address
                  </span>
                  <span className="mt-0.5 block font-semibold text-ink not-italic">
                    {siteConfig.legalName}
                    <br />
                    {siteConfig.contact.address.line1}
                    <br />
                    {siteConfig.contact.address.city},{" "}
                    {siteConfig.contact.address.state}{" "}
                    {siteConfig.contact.address.zip}
                  </span>
                </span>
              </a>
            </div>

            {/* Reserved region: embedded map (added with real assets later) */}
            <div className="mt-6">
              <Placeholder
                ratio="16/9"
                label="Map — 6420 S Alameda St, Huntington Park, CA"
                className="w-full"
              />
            </div>

            <div className="mt-8">
              <h3 className="text-sm font-semibold tracking-wide text-muted uppercase">
                Business Hours
              </h3>
              <ul className="mt-3 space-y-1.5 text-sm text-body">
                {siteConfig.hours.map((row) => (
                  <li key={row.days} className="flex justify-between gap-6">
                    <span>{row.days}</span>
                    <span className="text-muted">{row.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Reserved region: contact / quote form */}
          <Card padding="lg" className="bg-surface-muted">
            <h2 className="text-2xl">Send us a message</h2>
            <p className="mt-2 text-body">
              Our online quote &amp; contact form is on the way. For now, the
              fastest way to reach us is by phone or WhatsApp.
            </p>
            <div className="mt-6 space-y-3" aria-hidden>
              <div className="h-11 rounded-btn border border-line bg-surface" />
              <div className="h-11 rounded-btn border border-line bg-surface" />
              <div className="h-28 rounded-btn border border-line bg-surface" />
              <Placeholder
                rounded="card"
                label="Contact form — coming soon"
                className="h-11"
              />
            </div>
          </Card>
        </div>
      </Section>
    </>
  );
}
