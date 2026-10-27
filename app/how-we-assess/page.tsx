import type { Metadata } from "next";
import { Bullets, FeatureCards, NumberedSteps, PageHero } from "@/components/marketing/blocks";
import { PhoneMockup } from "@/components/marketing/phone-mockup";
import { Card, Pill, Section, SectionHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "How we assess",
  description:
    "How the GetHyre.ai readiness score is built, how skill gaps are ranked against your target role, and what unlocks job matches.",
  alternates: { canonical: "/how-we-assess" },
};

const levels = [
  { level: "High gap", className: "bg-danger-tint text-danger", body: "Far below the level the role needs. These come first on your roadmap." },
  { level: "Medium gap", className: "bg-warning-tint text-warning", body: "Partly there. Targeted practice closes these." },
  { level: "Low gap", className: "bg-line text-body", body: "Close to the role's level. A little polish needed." },
];

export default function HowWeAssessPage() {
  return (
    <>
      <PageHero
        eyebrow="How we assess"
        title="A score you can trust, and check."
        intro="Every GetHyre.ai report is built from three sources and measured against what your target role actually needs. Here's exactly how it works."
        aside={<PhoneMockup src="/screens/report.webp" alt="Skill report with readiness score 75" width={300} priority />}
      />

      <Section tone="white" labelledBy="sources-title">
        <SectionHeader id="sources-title" eyebrow="What goes into your readiness score" title="Three sources, one score out of 100." />
        <FeatureCards
          tone="surface"
          items={[
            { title: "Skill assessment", body: "Role-specific, scenario-based questions on the skills your target role needs.", icon: "check" },
            { title: "AI mock interview", body: "A practice interview scored on role knowledge, communication, clarity and problem solving.", icon: "target" },
            { title: "Profile", body: "Your projects, experience and CV, checked against the role.", icon: "arrow" },
          ]}
        />
        <p className="mt-5 text-sm text-muted lg:text-[15px]">
          Weighting: [Skills X% · Interview Y% · Profile Z%]. Shown on every report under &ldquo;How is this calculated?&rdquo;
        </p>
      </Section>

      <Section labelledBy="gaps-title">
        <SectionHeader id="gaps-title" eyebrow="How gaps are ranked" title="Every skill is compared to the level your role needs." />
        <ul className="mt-8 grid gap-3 md:grid-cols-3 lg:mt-10 lg:gap-5">
          {levels.map((l) => (
            <li key={l.level}>
              <Card className="flex h-full flex-col items-start gap-3">
                <Pill className={l.className}>{l.level}</Pill>
                <p className="text-[15px] leading-relaxed text-body lg:text-base">{l.body}</p>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="white" labelledBy="ready-title">
        <SectionHeader id="ready-title" eyebrow="The job-ready check" title="Jobs unlock when three checks pass." />
        <NumberedSteps
          tone="surface"
          items={[
            { title: "Readiness 75 or more", body: "Your score after training, from your second assessment." },
            { title: "No high gaps left", body: "Every skill rated High has been brought down." },
            { title: "CV ready", body: "Your CV passes our ATS check for the role." },
          ]}
        />
        <p className="mt-6 max-w-[900px] text-[15px] leading-relaxed text-body lg:text-base">
          If a check fails, we add gap-closing tasks to your roadmap and you retake the check after them.
        </p>
      </Section>

      <Section labelledBy="data-title">
        <div className="grid gap-6 lg:grid-cols-[440px_minmax(0,1fr)] lg:gap-16">
          <SectionHeader id="data-title" eyebrow="Your data" title="Your data is yours." />
          <Bullets
            items={[
              "We use your answers only to build your report, roadmap and job matches.",
              "We never sell your data.",
              "Colleges see [batch-level / individual] progress only with your consent.",
              "Companies see your profile only when you apply or opt in.",
              "You can download or delete your data at any time. [Confirm with legal review.]",
            ]}
          />
        </div>
      </Section>
    </>
  );
}
