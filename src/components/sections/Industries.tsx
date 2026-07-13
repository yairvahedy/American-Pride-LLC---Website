import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Placeholder } from "@/components/ui/Placeholder";
import { industries } from "@/lib/content";

/**
 * "Industries We Serve" — the primary customer segments. Each card has
 * a small placeholder for a representative icon/photo to be added later.
 */
export function Industries() {
  return (
    <Section surface="default" spacing="lg">
      <SectionHeading
        eyebrow="Who We Serve"
        title="Built for the businesses that keep clothes clean"
        description="We supply the everyday essentials and specialty products across the dry cleaning and commercial laundry trade."
      />

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {industries.map((industry) => (
          <Card key={industry.name} interactive padding="none">
            <Placeholder
              ratio="16/10"
              rounded="none"
              label={industry.name}
              className="border-0 border-b border-line"
            />
            <div className="p-5">
              <h3 className="text-base font-bold text-ink">{industry.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-body">
                {industry.description}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
