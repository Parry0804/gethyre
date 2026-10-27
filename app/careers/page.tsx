import type { Metadata } from "next";
import { FeatureCards } from "@/components/marketing/blocks";
import { Container, Eyebrow, H1, Lead, Section, SectionHeader } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join the small team building GetHyre.ai with colleges across India.",
  alternates: { canonical: "/careers" },
};

const roles = [
  { title: "[Role title]", team: "[Team]", type: "[Full-time · City / Remote]" },
  { title: "[Role title]", team: "[Team]", type: "[Internship · Remote]" },
  { title: "[Role title]", team: "[Team]", type: "[Full-time · City]" },
];

export default function CareersPage() {
  return (
    <>
      <section className="pb-10 pt-10 lg:pb-14 lg:pt-20">
        <Container className="flex flex-col gap-5">
          <Eyebrow>Careers</Eyebrow>
          <H1 className="max-w-[900px]">Help every student get to their first job.</H1>
          <Lead className="max-w-[720px]">
            We&apos;re a small team building GetHyre.ai with colleges across India. If that sounds like your kind of work,
            we&apos;d like to hear from you.
          </Lead>
        </Container>
      </section>

      <Section tone="white" labelledBy="roles-title">
        <SectionHeader id="roles-title" eyebrow="Open roles" title="Join us." />
        <ul className="mt-8 flex flex-col gap-3 lg:mt-10">
          {roles.map((r, i) => (
            <li
              key={i}
              className="flex flex-col gap-2 rounded-[16px] bg-surface px-6 py-5 lg:flex-row lg:items-center lg:justify-between lg:px-7 lg:py-6"
            >
              <div>
                <h3 className="text-lg font-bold lg:text-xl">{r.title}</h3>
                <p className="text-sm text-muted lg:text-[15px]">
                  {r.team} · {r.type}
                </p>
              </div>
              <a
                href={`mailto:${site.contact.careersEmail}?subject=${encodeURIComponent(`Application: ${r.title}`)}`}
                className="text-[15px] font-bold text-primary-strong hover:underline"
              >
                Apply by email →
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-col gap-1.5">
          <h3 className="text-lg font-bold lg:text-xl">Don&apos;t see your role?</h3>
          <p className="text-[15px] text-body lg:text-base">
            Email{" "}
            <a href={`mailto:${site.contact.careersEmail}`} className="font-semibold text-primary-strong underline">
              {site.contact.careersEmail}
            </a>{" "}
            with what you&apos;d like to build with us.
          </p>
        </div>
      </Section>

      <Section labelledBy="work-title">
        <SectionHeader id="work-title" eyebrow="How we work" title="Small team, real ownership." />
        <FeatureCards
          items={[
            { title: "Students first", body: "Every decision starts with what helps a student get placed.", icon: "target" },
            { title: "Ship and learn", body: "We test with real students and colleges, and improve fast.", icon: "arrow" },
            { title: "Honest work", body: "Clear reports, clear claims, and clear feedback inside the team.", icon: "check" },
          ]}
        />
      </Section>
    </>
  );
}
