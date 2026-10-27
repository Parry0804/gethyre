import type { Metadata } from "next";
import { LegalPage } from "@/components/marketing/legal-page";

export const metadata: Metadata = {
  title: "Terms of use",
  alternates: { canonical: "/terms" },
};

// Draft structure only. Have the final text reviewed by a lawyer before launch.
export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of use"
      updated="[date]"
      sections={[
        { heading: "Using this website", body: "[Who may use the site and the early-access list.]" },
        { heading: "No job guarantee", body: "[GetHyre.ai helps students prepare and connects them with matched roles; it does not guarantee placement.]" },
        { heading: "Content and trademarks", body: "[Ownership of the GetHyre.ai name, logo and content.]" },
        { heading: "Contact", body: "[How to reach the company, registered name and address.]" },
      ]}
    />
  );
}
