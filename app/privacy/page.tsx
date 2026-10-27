import type { Metadata } from "next";
import { LegalPage } from "@/components/marketing/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  alternates: { canonical: "/privacy" },
};

// Draft structure only. Have the final text reviewed by a lawyer before launch.
export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      updated="[date]"
      sections={[
        {
          heading: "What we collect",
          body: "[Name, email, WhatsApp number, college, course and target role from our forms; assessment and interview data once you use the app.]",
        },
        {
          heading: "How we use it",
          body: "[To run your journey, send launch updates you agreed to, and match you to jobs. We never sell your data.]",
        },
        {
          heading: "Who we share it with",
          body: "[Partner colleges and hiring companies only as described, and only with your consent.]",
        },
        {
          heading: "Your rights",
          body: `[Access, correction and deletion under India's Digital Personal Data Protection Act. Contact: ${site.contact.email}.]`,
        },
      ]}
    />
  );
}
