/**
 * Primary site navigation.
 *
 * Single source used by both the desktop and mobile navigation so the
 * two never fall out of sync. Add future top-level routes here.
 */

export type NavItem = {
  label: string;
  href: string;
};

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];
