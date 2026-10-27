import type { Metadata } from "next";
import { LeadForm } from "@/components/forms/lead-form";
import { FeatureCards, NumberedSteps, PageHero } from "@/components/marketing/blocks";
import { PhotoBand } from "@/components/marketing/photos";
import { CheckIcon } from "@/components/icons";
import { ButtonLink, Pill, Section, SectionHeader } from "@/components/ui";
import { fields } from "@/lib/forms";

export const metadata: Metadata = {
  title: "For hiring teams",
  description:
    "Hire freshers who are already assessed. Every GetHyre.ai candidate comes with a verified skill report, interview practice and a CV tailored to your role.",
  alternates: { canonical: "/companies" },
};

export default function CompaniesPage() {
  return (
    <>
      <PageHero
        eyebrow="For hiring teams"
        title="Hire freshers who are already assessed."
        intro="Every GetHyre.ai candidate comes with a verified skill report, interview practice and a CV tailored to your role, from partner campuses."
        actions={
          <ButtonLink href="#register" track="companies-hero">
            Register hiring interest
          </ButtonLink>
        }
        aside={<CandidateCard />}
      />

      <PhotoBand
        names={["hiringTeam", "recruiter", "youngProfessional"]}
        captions={["Your hiring team", "Shortlists you can trust", "Freshers ready on day one"]}
      />

      <Section tone="white" labelledBy="why-title">
        <SectionHeader id="why-title" eyebrow="Why hire through GetHyre.ai" title="Shortlists you don't have to second-guess." />
        <FeatureCards
          tone="surface"
          columns={4}
          items={[
            { title: "Skills proven, not claimed", body: "Every profile carries scores from a role-specific assessment.", icon: "check" },
            { title: "Interview-practised", body: "Candidates have done AI mock interviews and worked on their feedback.", icon: "target" },
            { title: "Matched to your role", body: "We rank candidates by assessed fit for the roles you share.", icon: "arrow" },
            { title: "From partner campuses", body: "A growing pool of final-year students from colleges we work with.", icon: "check" },
          ]}
        />
      </Section>

      <Section labelledBy="how-title">
        <SectionHeader id="how-title" eyebrow="How it works" title="Three steps to your shortlist." />
        <NumberedSteps
          items={[
            { title: "Share your roles", body: "Tell us the roles, skills and number of freshers you're hiring." },
            { title: "Get a matched shortlist", body: "We send candidates ranked by assessed fit, with their skill reports." },
            { title: "Interview and hire", body: "You run your process. Candidates arrive prepared and role-ready." },
          ]}
        />
      </Section>

      <Section id="register" tone="white" labelledBy="register-title">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_520px] lg:gap-16">
          <SectionHeader
            id="register-title"
            eyebrow="Register hiring interest"
            title="Tell us what you're hiring for."
            intro="We'll get back to you within two working days with how a shortlist would work for your roles."
          />
          <LeadForm kind="company" fields={fields.company} submitLabel="Register interest" tone="surface" />
        </div>
      </Section>
    </>
  );
}

/** Illustrative candidate profile for the hero. Sample data only. */
function CandidateCard() {
  const skills = [
    { label: "Figma and UI design", score: 72, need: 70, note: "Met" },
    { label: "Design systems", score: 58, need: 60, note: "Nearly there" },
    { label: "Communication", score: 60, need: 65, note: "Nearly there" },
  ];
  return (
    <figure
      aria-label="Illustrative candidate profile with verified skills"
      className="flex w-full max-w-[520px] flex-col gap-4 rounded-[20px] border border-line bg-white p-5 shadow-[var(--shadow-lift)] lg:rounded-[24px] lg:p-7"
    >
      <div className="flex items-center gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-sky text-sm font-bold text-primary-strong lg:size-13 lg:text-base">
          AS
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-bold lg:text-lg">Aditi S.</p>
          <p className="text-xs text-muted lg:text-[13px]">Product Designer · Class of 2027</p>
        </div>
        <Pill className="bg-success-tint text-success-strong">Job-ready · 84</Pill>
      </div>
      <p className="text-sm font-semibold">Verified skills</p>
      {skills.map((s) => (
        <div key={s.label} className="flex flex-col gap-1.5">
          <div className="flex justify-between gap-2 text-xs lg:text-[13px]">
            <span className="font-medium">{s.label}</span>
            <span className="text-muted">
              {s.score} of {s.need} · {s.note}
            </span>
          </div>
          <div className="h-2 rounded-full bg-surface">
            <div className="h-2 rounded-full bg-primary" style={{ width: `${s.score}%` }} />
          </div>
        </div>
      ))}
      <p className="text-sm font-semibold">Mock interview</p>
      <dl className="grid grid-cols-3 gap-2 lg:gap-3">
        {[
          ["70", "Role knowledge"],
          ["60", "Communication"],
          ["65", "Clarity"],
        ].map(([v, k]) => (
          <div key={k} className="flex flex-col-reverse gap-0.5 rounded-xl bg-surface p-3">
            <dt className="text-[11px] font-medium text-muted lg:text-xs">{k}</dt>
            <dd className="text-xl font-extrabold lg:text-[22px]">{v}</dd>
          </div>
        ))}
      </dl>
      <p className="flex items-center gap-2 text-xs font-medium text-muted">
        <CheckIcon size={16} className="text-primary" />
        Verified by GetHyre assessment · Illustrative profile
      </p>
    </figure>
  );
}
