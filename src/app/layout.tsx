import type { Metadata } from "next";
import { Inter, Archivo } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site-config";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { QuoteProvider } from "@/context/QuoteContext";
import { QuoteIndicator } from "@/components/quote/QuoteIndicator";

/* Body typeface — highly legible neutral grotesque. */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

/* Display / heading typeface — sturdier grotesque for authority. */
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "dry cleaning supplies",
    "commercial laundry supplies",
    "wholesale hangers",
    "poly bags",
    "dry cleaning chemicals",
    "laundry detergent wholesale",
    "California dry cleaning supplier",
  ],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${archivo.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-surface">
        <QuoteProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <QuoteIndicator />
        </QuoteProvider>
      </body>
    </html>
  );
}
