import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { Placeholder } from "@/components/ui/Placeholder";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About",
  description: siteConfig.description,
};

/**
 * About page (stub). Structure is in place; full brand story, history
 * timeline and team content are added in a later phase.
 */
export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Us"
        title={siteConfig.servingSince}
        description="A California-based wholesale supplier to the dry cleaning and commercial laundry trade — built on competitive pricing, deep inventory and personal service."
      />

      <Section spacing="lg">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Placeholder
            ratio="4/3"
            label="About — facility / team photo"
            className="w-full"
          />
          <div className="max-w-xl">
            <h2 className="text-2xl sm:text-3xl">Our full story is coming soon</h2>
            <p className="mt-4 leading-relaxed text-body">
              We&rsquo;re putting together the complete history of American
              Pride LLC — how we&rsquo;ve served California&rsquo;s dry cleaners,
              laundries and uniform companies since 1990, and the values that
              keep our customers coming back. Check back shortly, or reach out
              any time in the meantime.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
