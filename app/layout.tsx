import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SiteNav } from "@/components/layout/site-nav";
import { SiteFooter } from "@/components/layout/site-footer";
import { ChatButton } from "@/components/layout/chat-button";
import { Analytics } from "@/components/layout/analytics";
import { site } from "@/lib/site";

// Inter (the app's typeface), self-hosted so builds never depend on Google Fonts.
const inter = localFont({
  src: "./fonts/InterVariable-latin.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "GetHyre.ai · Know your gaps. Close them. Get hired.",
    template: "%s · GetHyre.ai",
  },
  description: site.description,
  applicationName: site.name,
  publisher: site.contact.companyName,
  creator: site.contact.companyName,
  authors: [{ name: site.contact.companyName }],
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_IN",
    images: [{ url: "/brand/og.png", width: 1200, height: 630, alt: "GetHyre.ai" }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#2563eb",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={inter.variable} suppressHydrationWarning>
      <head>
        {/* Photos are served by Unsplash's CDN; open the connection early. */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        {/* Marks JS as available so scroll-reveal styles only hide content when they can show it again. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        {/* Tells search engines (and app-store reviewers' tools) that GetHyre.ai is a product of the registered company. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": `${site.url}/#company`,
                  name: site.contact.companyName,
                  email: site.contact.email,
                  address: { "@type": "PostalAddress", addressLocality: site.contact.city, addressCountry: "IN" },
                  brand: { "@id": `${site.url}/#product` },
                },
                {
                  "@type": "SoftwareApplication",
                  "@id": `${site.url}/#product`,
                  name: site.name,
                  url: site.url,
                  applicationCategory: "EducationalApplication",
                  operatingSystem: "iOS, Android",
                  publisher: { "@id": `${site.url}/#company` },
                },
              ],
            }).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className="flex min-h-dvh flex-col">
        <SiteNav />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <ChatButton />
        <Analytics />
      </body>
    </html>
  );
}
