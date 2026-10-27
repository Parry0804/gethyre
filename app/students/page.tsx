import type { Metadata } from "next";
import { Bullets, CtaBand, DownloadCard, PageHero } from "@/components/marketing/blocks";
import { PhoneMockup } from "@/components/marketing/phone-mockup";
import { ButtonLink, Section, SectionHeader } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "For students",
  description:
    "Take a role-specific assessment and an AI mock interview, get a detailed skill report, and follow one roadmap from your first gap to matched jobs.",
  alternates: { canonical: "/students" },
};

const phases = [
  {
    phase: "Diagnose",
    title: "Find out where you stand",
    screen: "/screens/assessment.webp",
    alt: "Skill assessment question",
    items: ["Role-specific skill assessment", "10-minute AI mock interview", "Detailed skill report with a readiness score"],
  },
  {
    phase: "Train",
    title: "Close your gaps",
    screen: "/screens/plan.webp",
    alt: "Month-by-month plan",
    items: ["Month-by-month roadmap built from your gaps", "Progress tracking and a second assessment", "CV builder with ATS suggestions"],
  },
  {
    phase: "Place",
    title: "Get matched",
    screen: "/screens/home-place.webp",
    alt: "Home screen showing matched jobs",
    items: ["Jobs ranked by your assessed skills", "A CV tailored to every application", "Placement support from our team"],
  },
];

export default function StudentsPage() {
  return (
    <>
      <PageHero
        eyebrow="For students"
        title="See what's holding you back. Then fix it."
        intro="Take a role-specific assessment and an AI mock interview, get a detailed skill report, and follow one roadmap from first gap to matched jobs."
        actions={
          <>
            <ButtonLink href="/early-access" track="students-hero">
              Get early access
            </ButtonLink>
            <ButtonLink href="/#how-it-works" variant="secondary">
              See how it works
            </ButtonLink>
          </>
        }
        aside={
          <PhoneMockup
            src="/screens/interview.webp"
            alt="Practice interview chat in the GetHyre.ai app"
            width={300}
            priority
          />
        }
      />

      <Section tone="white" labelledBy="journey-title">
        <SectionHeader id="journey-title" eyebrow="Your journey" title="From first assessment to matched jobs." />
        <ul className="mt-8 grid gap-4 lg:mt-10 lg:grid-cols-3 lg:gap-7">
          {phases.map((p) => (
            <li key={p.phase} className="flex flex-col gap-4 rounded-[20px] bg-surface px-6 pb-7 pt-7 lg:px-7 lg:pt-8">
              <div className="flex justify-center">
                <PhoneMockup src={p.screen} alt={p.alt} width={230} />
              </div>
              <p className="text-[13px] font-bold uppercase tracking-[0.1em] text-primary lg:text-sm">{p.phase}</p>
              <h3 className="text-[22px] font-extrabold tracking-[-0.01em] lg:text-2xl">{p.title}</h3>
              <Bullets items={p.items} />
            </li>
          ))}
        </ul>
      </Section>

      <Section id="sample-report" labelledBy="report-title">
        <div className="grid items-center gap-10 lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-18">
          <div className="order-2 flex justify-center lg:order-1">
            <PhoneMockup src="/screens/report.webp" alt="Skill report with readiness score and ranked skill gaps" width={300} />
          </div>
          <div className="order-1 flex flex-col gap-5 lg:order-2">
            <SectionHeader
              id="report-title"
              eyebrow="Your skill report"
              title="A report that tells you the truth."
              intro="No vague scores. Your report shows exactly where you stand against the role you want, and what to do next."
            />
            <Bullets
              items={[
                "A readiness score out of 100, and how it's calculated",
                "Skill gaps ranked against what your target role needs",
                "Interview scores, your best moment and what to work on",
                "A roadmap preview built from your gaps",
              ]}
            />
            <DownloadCard {...site.downloads.sampleReport} />
          </div>
        </div>
      </Section>

      <CtaBand
        title="Be first to get your skill report."
        body="Join early access and you'll be among the first students invited when your campus goes live."
        cta="Get early access"
        href="/early-access"
        track="students-cta"
      />
    </>
  );
}
