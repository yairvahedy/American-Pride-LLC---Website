import { Hero } from "@/components/sections/Hero";
import { Industries } from "@/components/sections/Industries";
import { ProductCategories } from "@/components/sections/ProductCategories";
import { WhyAmericanPride } from "@/components/sections/WhyAmericanPride";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { ContactCta } from "@/components/sections/ContactCta";

/**
 * Homepage.
 *
 * Purely composes the section components in the agreed order. Each
 * section owns its own layout, spacing and (placeholder) content, so
 * this file stays a readable table of contents for the page.
 *
 * Order: Hero (photo + trust bar + actions) → Industries → Product
 * Categories → Why American Pride → About Preview → Contact CTA. The
 * hero owns its own trust bar (from the client artwork), so there is no
 * separate trust section here. (Footer is rendered by the root layout.)
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Industries />
      <ProductCategories />
      <WhyAmericanPride />
      <AboutPreview />
      <ContactCta />
    </>
  );
}
