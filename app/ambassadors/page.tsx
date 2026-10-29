import type { Metadata } from "next";
import { LeadForm } from "@/components/forms/lead-form";
import { Bullets, FeatureCards, PageHero } from "@/components/marketing/blocks";
import { ButtonLink, Section, SectionHeader } from "@/components/ui";
import { fields } from "@/lib/forms";

export const metadata: Metadata = {
  title: "Campus ambassadors",
  description:
    "Bring GetHyre.ai to your campus. Help classmates find their skill gaps before placement season and lead the launch at your college.",
  alternates: { canonical: "/ambassadors" },
};

export default function AmbassadorsPage() {
  return (
    <>
      <PageHero
        eyebrow="Campus ambassadors"
        title="Bring GetHyre.ai to your campus."
        intro="Help your classmates find their gaps before placement season. Lead the launch at your college, and build skills recruiters notice."
        actions={
          <ButtonLink href="#apply" track="ambassadors-hero">
            Apply to be an ambassador
          </ButtonLink>
        }
        aside={
          <figure
            aria-label="Illustrative ambassador card"
            className="flex w-full max-w-[460px] flex-col gap-3.5 rounded-[12px] bg-primary p-7 text-white lg:p-9"
          >
            <p className="text-[13px] font-bold uppercase tracking-[0.1em] text-sky">Ambassador</p>
            <p className="text-2xl font-extrabold lg:text-[28px]">[Student name]</p>
            <p className="text-sm text-sky lg:text-[15px]">[College name] · B.Tech, 3rd year</p>
            <dl className="grid grid-cols-2 gap-3">
              {[
                ["[N]", "classmates onboarded"],
                ["[N]", "sessions run"],
              ].map(([v, k]) => (
                <div key={k} className="flex flex-col-reverse gap-0.5 rounded-[10px] bg-white/12 p-4">
                  <dt className="text-[13px] font-medium text-sky">{k}</dt>
                  <dd className="text-2xl font-extrabold">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="text-xs font-medium text-sky">Illustrative</p>
          </figure>
        }
      />

      <Section tone="white" labelledBy="role-title">
        <SectionHeader id="role-title" eyebrow="What ambassadors do" title="Lead the launch on your campus." />
        <FeatureCards
          tone="surface"
          items={[
            { title: "Spread the word", body: "Share GetHyre.ai in class groups and clubs, and run the campus survey.", icon: "arrow" },
            { title: "Run onboarding", body: "Help classmates sign up and take their first assessment.", icon: "check" },
            { title: "Bring feedback", body: "Tell us what students need, so we build the right things.", icon: "target" },
          ]}
        />
      </Section>

      <Section labelledBy="perks-title">
        <SectionHeader id="perks-title" eyebrow="What you get" title="Grow while you help others grow." />
        <Bullets
          className="mt-6 text-ink"
          items={[
            "[Certificate of recognition]",
            "[Early access to every new feature]",
            "[Mentorship from the GetHyre.ai team]",
            "[Letter of recommendation for top ambassadors]",
          ]}
        />
      </Section>

      <Section id="apply" tone="white" labelledBy="apply-title">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_520px] lg:gap-16">
          <SectionHeader
            id="apply-title"
            eyebrow="Apply"
            title="Applications are open for [semester] 2026."
            intro="One or two ambassadors per college. We'll reply within a week."
          />
          <LeadForm kind="ambassador" fields={fields.ambassador} submitLabel="Apply now" tone="surface" />
        </div>
      </Section>
    </>
  );
}
