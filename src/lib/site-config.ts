/**
 * Central company / contact configuration.
 *
 * Everything that could change (phone, email, hours, address, social
 * links) lives here so it can be updated in one place and consumed
 * across the site. Keep this file free of JSX or component logic.
 */

export const siteConfig = {
  name: "American Pride LLC",
  shortName: "American Pride",
  legalName: "American Pride LLC",
  tagline: "Wholesale Supply for Dry Cleaning & Commercial Laundry",
  description:
    "American Pride LLC is a California-based wholesale supplier serving the dry cleaning and commercial laundry industry since 1990. Competitive pricing, a huge in-stock inventory, and personal customer service.",

  // Founding year drives all "Since 1990" copy and trust badges. Update
  // the year here and every reference follows.
  foundedYear: 1990,
  // Ready-made phrases so wording stays consistent everywhere.
  since: "Since 1990",
  servingSince: "Serving California Since 1990",

  contact: {
    phone: {
      // Human-readable and dial-ready formats kept together so links
      // and display never drift apart.
      display: "+1 (323) 842-1660",
      href: "tel:+13238421660",
    },
    whatsapp: {
      display: "+1 (323) 842-1660",
      // wa.me expects a country-code number with no symbols.
      href: "https://wa.me/13238421660",
    },
    email: {
      display: "americanpridellc@gmail.com",
      href: "mailto:americanpridellc@gmail.com",
    },
    // Physical location. `full` is the single-line form; the parts are
    // available for multi-line display (e.g. the Contact page).
    address: {
      line1: "6420 S Alameda St",
      city: "Huntington Park",
      state: "CA",
      zip: "90255",
      full: "6420 S Alameda St, Huntington Park, CA 90255",
      // Opens the address in the user's maps app.
      mapHref:
        "https://maps.google.com/?q=American+Pride+LLC+6420+S+Alameda+St+Huntington+Park+CA+90255",
    },
    location: "Huntington Park, California",
  },

  // Placeholder hours — confirm and refine with the client later.
  hours: [
    { days: "Monday – Friday", time: "8:00 AM – 5:00 PM PST" },
    { days: "Saturday – Sunday", time: "Closed" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
