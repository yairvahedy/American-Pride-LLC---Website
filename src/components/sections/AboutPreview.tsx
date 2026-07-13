import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Placeholder } from "@/components/ui/Placeholder";
import { ArrowRightIcon } from "@/components/icons";

const points = [
  "Family-run, relationship-first business",
  "Deep inventory across every core category",
  "Fast, dependable fulfillment order after order",
];

/**
 * About preview — a short brand story with a placeholder image and a
 * link through to the full About page. Two-column on desktop, stacked
 * on mobile with the image first.
 */
export function AboutPreview() {
  return (
    <Section surface="muted" spacing="lg">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Visual */}
        <div className="order-1 lg:order-none">
          <Placeholder
            ratio="4/3"
            label="About — team / facility photo"
            className="w-full"
          />
        </div>

        {/* Copy */}
        <div>
          <SectionHeading
            eyebrow="About Us"
            title="Serving California Since 1990"
            description="American Pride LLC has spent more than three decades earning the trust of dry cleaners, laundries and uniform companies across California. We keep a huge inventory stocked and priced right, so our customers can focus on running their business."
          />

          <ul className="mt-6 space-y-3">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-3 text-body">
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-400"
                  aria-hidden
                />
                <span className="text-sm sm:text-base">{point}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <Button href="/about" variant="primary">
              Learn more about us
              <ArrowRightIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
