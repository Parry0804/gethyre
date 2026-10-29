import type { Metadata } from "next";
import { LeadForm } from "@/components/forms/lead-form";
import { Bullets } from "@/components/marketing/blocks";
import { PhoneMockup } from "@/components/marketing/phone-mockup";
import { Container, Eyebrow, H1, Lead } from "@/components/ui";
import { fields } from "@/lib/forms";

export const metadata: Metadata = {
  title: "Early access",
  description: "Join the GetHyre.ai early-access list and get your skill report as soon as we go live at your campus.",
  alternates: { canonical: "/early-access" },
};

/** The page campus QR codes point to. Keep it focused on the form. */
export default function EarlyAccessPage() {
  return (
    <section className="py-9 lg:py-18">
      <Container className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_540px] lg:gap-16">
        <div className="flex flex-col gap-5">
          <Eyebrow>Early access</Eyebrow>
          <H1>Get your skill report first.</H1>
          <Lead>Join the list and we&apos;ll invite you as soon as GetHyre.ai goes live at your campus.</Lead>
          <Bullets
            className="text-ink"
            items={["Your skill report with a readiness score", "First invites to campus pilots", "Launch updates only. No spam."]}
          />
          <div className="hidden pt-3 lg:block">
            <PhoneMockup src="/screens/home-diagnose.webp" alt="GetHyre.ai app home screen" width={240} />
          </div>
        </div>
        <LeadForm
          kind="student"
          fields={fields.studentFull}
          submitLabel="Join early access"
          heading="Join early access"
          subheading="Takes 30 seconds."
          consentText="I agree to receive launch updates and accept the privacy policy."
          className="shadow-[var(--shadow-lift)] lg:rounded-[12px] lg:p-9"
        />
      </Container>
    </section>
  );
}
