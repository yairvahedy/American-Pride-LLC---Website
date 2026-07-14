import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { QuoteView } from "@/components/quote/QuoteView";

export const metadata: Metadata = {
  title: "Your Quote",
  description:
    "Review the products in your wholesale quote request and send it to American Pride for pricing.",
};

/**
 * Quote workflow page. Lists quote items, lets the customer adjust
 * quantities, and collects contact details before sending. Delivery
 * (email / WhatsApp) is wired in a later phase.
 */
export default function QuotePage() {
  return (
    <>
      <PageHeader
        eyebrow="Wholesale Quote"
        title="Your Quote Request"
        description="Review your selected products, set quantities, and send us your details — we'll reply with competitive wholesale pricing."
      />
      <Section spacing="lg">
        <QuoteView />
      </Section>
    </>
  );
}
