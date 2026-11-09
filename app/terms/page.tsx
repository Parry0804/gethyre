import type { Metadata } from "next";
import { LegalPage } from "@/components/marketing/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of use",
  alternates: { canonical: "/terms" },
};

// Draft structure only. Have the final text reviewed by a lawyer before launch.
export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of use"
      updated="9 November 2026"
      sections={[
        {
          heading: "Using this website",
          body: "You may use this website to learn about GetHyre.ai, join the early-access list and contact us. Please don't misuse it: no automated scraping, spam, attempts to break its security, or false information in our forms.",
        },
        {
          heading: "No job guarantee",
          body: "GetHyre.ai helps students prepare and connects them with matched roles. It does not guarantee a placement, a job offer or a particular salary. Employers make their own hiring decisions.",
        },
        {
          heading: "Who we are",
          body: `GetHyre.ai is a product of ${site.contact.companyName}, ${site.contact.city}, India, which owns and operates this website and the GetHyre.ai apps for iOS and Android.`,
        },
        {
          heading: "Content and trademarks",
          body: `The GetHyre.ai name, logo, app and website content belong to ${site.contact.companyName}. You may not copy or reuse them without written permission.`,
        },
        {
          heading: "Contact",
          body: `${site.contact.companyName}, ${site.contact.city}, India. Email: ${site.contact.email}. [Registered address to be added.]`,
        },
      ]}
    />
  );
}
