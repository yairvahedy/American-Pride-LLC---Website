/**
 * Editorial content for the homepage sections.
 *
 * Copy and data are kept out of the components so marketing text can
 * be adjusted without touching layout. All strings here are treated as
 * placeholders to be refined with the client.
 */

export type Industry = {
  name: string;
  description: string;
};

/** Primary customer segments the company serves. */
export const industries: Industry[] = [
  {
    name: "Dry Cleaning Stores",
    description:
      "Everyday supplies and chemistry that keep retail dry cleaners running.",
  },
  {
    name: "Commercial Laundries",
    description:
      "High-volume consumables and equipment supplies for large-scale operations.",
  },
  {
    name: "Uniform Companies",
    description:
      "Reliable, repeatable ordering for uniform rental and service programs.",
  },
  {
    name: "Laundry Businesses",
    description:
      "Everything laundromats and laundry services need, in stock and ready to ship.",
  },
];

export type ValueProp = {
  title: string;
  description: string;
};

/** The "Why American Pride" differentiators. */
export const valueProps: ValueProp[] = [
  {
    title: "Competitive Wholesale Pricing",
    description:
      "Direct wholesale pricing that helps protect your margins on the supplies you buy every week.",
  },
  {
    title: "Huge In-Stock Inventory",
    description:
      "A deep, well-stocked catalog across hangers, poly, chemistry and store supplies — ready when you are.",
  },
  {
    title: "Personal Customer Service",
    description:
      "Talk to real people who know the industry and know your business by name.",
  },
  {
    title: "Long-Term Reliability",
    description:
      "A dependable supply partner you can count on order after order, year after year.",
  },
  {
    title: "Serving California Since 1990",
    description:
      "More than three decades serving dry cleaners, laundries and uniform companies.",
  },
  {
    title: "Industry Expertise",
    description:
      "Guidance from a team that understands the products and the day-to-day of the trade.",
  },
];
