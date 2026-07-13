"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { mainNav } from "@/lib/nav";
import { siteConfig } from "@/lib/site-config";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import {
  PhoneIcon,
  WhatsAppIcon,
  MailIcon,
  MenuIcon,
  CloseIcon,
} from "@/components/icons";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Site header: a slim contact utility strip above the main navigation
 * bar. Fully responsive with an accessible mobile menu. Uses the
 * shared `mainNav` and `siteConfig` so contact details and routes stay
 * in one place.
 */
export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMenu = () => setMobileOpen(false);

  // Prevent background scroll while the mobile menu is open. The menu is
  // closed from the navigation click handlers below (not a route effect),
  // which keeps state updates out of render effects.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50">
      {/* Utility contact strip */}
      <div className="hidden bg-brand-dark text-navy-100 md:block">
        <Container className="flex h-10 items-center justify-between text-xs">
          <div className="flex items-center gap-6">
            <a
              href={siteConfig.contact.phone.href}
              className="inline-flex items-center gap-1.5 transition-colors hover:text-white"
            >
              <PhoneIcon className="h-3.5 w-3.5" />
              {siteConfig.contact.phone.display}
            </a>
            <a
              href={siteConfig.contact.email.href}
              className="inline-flex items-center gap-1.5 transition-colors hover:text-white"
            >
              <MailIcon className="h-3.5 w-3.5" />
              {siteConfig.contact.email.display}
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-navy-200">{siteConfig.servingSince}</span>
            <a
              href={siteConfig.contact.whatsapp.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-white"
            >
              <WhatsAppIcon className="h-3.5 w-3.5" />
              WhatsApp
            </a>
          </div>
        </Container>
      </div>

      {/* Main navigation bar */}
      <div className="border-b border-line bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/85 shadow-header">
        <Container className="flex h-18 items-center justify-between gap-4">
          <Logo />

          {/* Desktop nav */}
          <nav
            aria-label="Primary"
            className="hidden items-center gap-1 lg:flex"
          >
            {mainNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative rounded-btn px-4 py-2 text-sm font-semibold transition-colors",
                    active
                      ? "text-brand"
                      : "text-body hover:text-brand hover:bg-navy-50",
                  )}
                >
                  {item.label}
                  {active && (
                    <span
                      className="absolute inset-x-4 -bottom-px h-0.5 rounded-full bg-accent-400"
                      aria-hidden
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop actions */}
          <div className="hidden items-center gap-2.5 lg:flex">
            <Button
              href={siteConfig.contact.whatsapp.href}
              variant="outline"
              target="_blank"
              rel="noreferrer"
              aria-label="Message us on WhatsApp"
            >
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp
            </Button>
            <Button href={siteConfig.contact.phone.href} variant="primary">
              <PhoneIcon className="h-4 w-4" />
              Call Us
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="inline-flex h-11 w-11 items-center justify-center rounded-btn border border-line text-ink transition-colors hover:bg-steel-100 lg:hidden"
          >
            {mobileOpen ? (
              <CloseIcon className="h-6 w-6" />
            ) : (
              <MenuIcon className="h-6 w-6" />
            )}
          </button>
        </Container>
      </div>

      {/* Mobile menu panel */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden fixed inset-x-0 top-18 bottom-0 z-40 overflow-y-auto border-t border-line bg-surface"
        >
          <Container className="flex flex-col gap-1 py-4">
            {mainNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-btn px-4 py-3 text-base font-semibold transition-colors",
                    active
                      ? "bg-navy-50 text-brand"
                      : "text-body hover:bg-steel-100 hover:text-brand",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}

            <div className="mt-4 flex flex-col gap-3 border-t border-line pt-4">
              <Button
                href={siteConfig.contact.phone.href}
                variant="primary"
                fullWidth
                size="lg"
                onClick={closeMenu}
              >
                <PhoneIcon className="h-5 w-5" />
                Call {siteConfig.contact.phone.display}
              </Button>
              <Button
                href={siteConfig.contact.whatsapp.href}
                variant="outline"
                fullWidth
                size="lg"
                target="_blank"
                rel="noreferrer"
                onClick={closeMenu}
              >
                <WhatsAppIcon className="h-5 w-5" />
                Message on WhatsApp
              </Button>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
