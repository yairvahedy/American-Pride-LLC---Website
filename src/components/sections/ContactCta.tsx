import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { PhoneIcon, WhatsAppIcon, MailIcon } from "@/components/icons";
import { siteConfig } from "@/lib/site-config";

/**
 * Closing contact call-to-action on the brand surface. Surfaces every
 * way to reach the company (phone, WhatsApp, email) and a primary quote
 * action. The contact form itself lives on the dedicated Contact page.
 */
export function ContactCta() {
  return (
    <Section surface="brand" spacing="lg">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.14em] text-accent-200 uppercase">
          <span className="h-px w-6 bg-accent-200/60" aria-hidden />
          Get In Touch
        </span>
        <h2 className="mt-4 text-3xl text-white sm:text-4xl">
          Ready to talk products or pricing?
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-navy-100">
          Call or message us and a real person who knows the industry will help
          you find exactly what you need — and give you a competitive wholesale
          quote.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
          <Button
            href={siteConfig.contact.phone.href}
            variant="secondary"
            size="lg"
          >
            <PhoneIcon className="h-5 w-5" />
            {siteConfig.contact.phone.display}
          </Button>
          <Button
            href={siteConfig.contact.whatsapp.href}
            variant="accent"
            size="lg"
            target="_blank"
            rel="noreferrer"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Message on WhatsApp
          </Button>
          <Button
            href={siteConfig.contact.email.href}
            variant="outline"
            size="lg"
            className="border-navy-400 text-white hover:bg-navy-700 hover:border-navy-300"
          >
            <MailIcon className="h-5 w-5" />
            Email Us
          </Button>
        </div>
      </div>
    </Section>
  );
}
