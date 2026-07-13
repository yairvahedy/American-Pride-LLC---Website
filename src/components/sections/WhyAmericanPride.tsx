import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CheckIcon } from "@/components/icons";
import { valueProps } from "@/lib/content";

/**
 * "Why American Pride" — the company's core differentiators presented as
 * a clean feature grid. No imagery needed; each item leads with a small
 * accent check to keep the section calm and scannable.
 */
export function WhyAmericanPride() {
  return (
    <Section surface="default" spacing="lg">
      <SectionHeading
        align="center"
        eyebrow="Why American Pride"
        title="A wholesale partner you can build a business on"
        description="Three and a half decades of doing the basics exceptionally well — the right products, fair pricing, and people who pick up the phone."
      />

      <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {valueProps.map((prop) => (
          <div key={prop.title} className="flex gap-4">
            <span
              className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-btn bg-navy-50 text-brand"
              aria-hidden
            >
              <CheckIcon className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-base font-bold text-ink">{prop.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-body">
                {prop.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
