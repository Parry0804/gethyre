import type { Metadata } from "next";
import { PolicyPage } from "@/components/marketing/policy";
import { policyMeta, policySections, policySummary } from "@/content/privacy";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "How GetHyre.ai collects, uses, shares and protects your personal data across our Android and iOS apps and website, and how to delete your account.",
  alternates: { canonical: "/privacy" },
};

// Draft: fill every [bracket] and have the final text reviewed by a lawyer before launch.
export default function PrivacyPage() {
  return (
    <PolicyPage
      title="Privacy policy"
      intro="What personal data GetHyre.ai collects, why, who we share it with, how long we keep it, and the choices you have."
      effective={policyMeta.effective}
      updated={policyMeta.updated}
      summary={policySummary}
      sections={policySections}
      contact={[
        { label: "Grievance Officer", value: policyMeta.officer },
        { label: "Email", value: policyMeta.privacyEmail },
        { label: "Company", value: policyMeta.company },
        { label: "Address", value: `${policyMeta.address}, India` },
        {
          label: "Website",
          value: (
            <a href="https://www.gethyre.ai" className="font-semibold text-primary underline-offset-4 hover:underline">
              www.gethyre.ai
            </a>
          ),
        },
      ]}
    />
  );
}
