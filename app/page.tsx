import type { Metadata } from "next";
import type { ReactNode } from "react";
import { LeadForm } from "@/components/forms/lead-form";
import { AppBadge } from "@/components/layout/app-badge";
import { DemoVideo, Faq, FeatureCards, LinkCard, PhotoPlaceholder, TextCards } from "@/components/marketing/blocks";
import { JourneyStepper } from "@/components/marketing/journey-stepper";
import { PhoneMockup } from "@/components/marketing/phone-mockup";
import { ButtonLink, Container, H2, Section, SectionHeader } from "@/components/ui";
import { faqs } from "@/content/journey";
import { fields } from "@/lib/forms";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "GetHyre.ai · Know your gaps. Close them. Get hired." },
  alternates: { canonical: "/" },
};

const previewScreens = [
  { src: "/screens/assessment.webp", label: "Skill assessment", alt: "Skill assessment question screen" },
  { src: "/screens/report.webp", label: "Your report", alt: "Skill report with readiness score and skill gaps" },
  { src: "/screens/plan.webp", label: "Your roadmap", alt: "Personal plan with a monthly breakdown" },
  { src: "/screens/job-ready.webp", label: "Job-ready check", alt: "Job-ready check with three checks passed" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="pb-10 pt-8 lg:pb-12 lg:pt-16">
        <Container className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_540px] lg:gap-10">
          <div className="flex flex-col items-start gap-5 lg:gap-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-tint px-3.5 py-2 text-[13px] font-semibold text-primary-strong lg:text-sm">
              <span className="size-2 rounded-full bg-primary" aria-hidden />
              Now onboarding pilot colleges
            </span>
            <h1 className="text-[44px] font-extrabold leading-[1.04] tracking-[-0.035em] text-ink lg:text-[68px]">
              Know your gaps.
              <br />
              Close them.
              <br />
              <span className="text-primary">Get hired.</span>
            </h1>
            <p className="max-w-[560px] text-[17px] leading-relaxed text-body lg:text-[19px]">
              GetHyre.ai diagnoses your skills with an assessment and an AI mock interview, trains you on a roadmap built
              from your gaps, then places you in jobs matched to your profile.
            </p>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <ButtonLink href="/early-access" track="hero">
                Get early access
              </ButtonLink>
              <ButtonLink href="/colleges" variant="secondary" track="hero-college">
                Partner as a college
              </ButtonLink>
            </div>
            <ul className="hidden flex-wrap gap-2.5 sm:flex" aria-label="The three phases">
              {["1 · Diagnose", "2 · Train", "3 · Place"].map((p) => (
                <li key={p} className="rounded-full border border-line bg-white px-3.5 py-2 text-sm font-semibold">
                  {p}
                </li>
              ))}
            </ul>
            <AppBadge />
          </div>

          <div className="relative mx-auto flex w-full max-w-[540px] justify-center overflow-hidden rounded-[28px] bg-sky pt-7 lg:h-[680px] lg:items-center lg:overflow-visible lg:rounded-none lg:bg-transparent lg:pt-0">
            <div className="absolute left-1/2 top-1/2 hidden size-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky lg:block" aria-hidden />
            <div className="relative -mb-40 lg:mb-0 lg:translate-x-12">
              <PhoneMockup
                src="/screens/home-diagnose.webp"
                alt="GetHyre.ai app home screen showing the Diagnose, Train and Place journey"
                width={290}
                priority
              />
            </div>
            <FloatCard className="-left-4 top-[200px] w-[170px]!">
              <span className="text-xs text-muted">Readiness</span>
              <span className="text-xl font-extrabold">
                75 <span className="text-sm font-semibold text-primary-strong">Nearly there</span>
              </span>
            </FloatCard>
            <FloatCard className="bottom-[150px] right-0">
              <span className="text-xs text-muted">Biggest gap</span>
              <span className="text-[15px] font-bold">Design systems</span>
              <span className="text-xs font-semibold text-danger">High priority</span>
            </FloatCard>
          </div>
        </Container>
      </section>

      {/* Proof */}
      <section aria-label="Early proof" className="pb-10 lg:pb-6">
        <Container className="grid gap-3 lg:grid-cols-[420px_minmax(0,1fr)] lg:gap-5">
          <div className="flex flex-col gap-1.5 rounded-[20px] bg-ink p-6 text-white lg:px-7">
            <p className="text-[40px] font-extrabold tracking-[-0.03em] lg:text-[44px]">[X]%</p>
            <p className="text-[15px] leading-normal text-line-strong lg:text-base">
              of [N] students we surveyed don&apos;t know which skills are holding them back.
            </p>
            <p className="pt-1 text-xs text-subtle">Source: GetHyre.ai campus survey, [month] 2026</p>
          </div>
          <div className="flex flex-col justify-center gap-4 rounded-[20px] bg-white p-6 lg:px-7">
            <p className="text-xs font-bold uppercase tracking-[0.08em] text-muted lg:text-sm">
              Piloting with colleges in [region]
            </p>
            <ul className="grid grid-cols-2 gap-2.5 lg:grid-cols-4 lg:gap-4">
              {[1, 2, 3, 4].map((i) => (
                <li key={i} className="flex h-14 items-center justify-center rounded-xl bg-surface text-xs text-muted lg:h-16 lg:text-[13px]">
                  [College logo]
                </li>
              ))}
            </ul>
            <p className="text-xs text-muted">Shown with each college&apos;s written permission.</p>
          </div>
        </Container>
      </section>

      {/* Problem */}
      <Section labelledBy="problem-title" className="pt-6 lg:pt-14">
        <SectionHeader id="problem-title" eyebrow="The problem" title="Placement season shouldn't be guesswork." />
        <TextCards
          items={[
            {
              title: "You don't know where you stand",
              body: "Most students walk into drives without knowing which skills will hold them back.",
            },
            {
              title: "Prep is scattered",
              body: "A resume tool here, a mock interview app there, and nothing that ties progress together.",
            },
            {
              title: "Job boards match keywords",
              body: "Your strengths, gaps and goals never make it into how jobs are recommended.",
            },
          ]}
        />
      </Section>

      {/* How it works */}
      <Section id="how-it-works" tone="white" labelledBy="how-title">
        <SectionHeader
          id="how-title"
          eyebrow="How it works"
          title="Diagnose. Train. Place."
          intro="Three phases, one app. Each step unlocks the next, so every hour of prep goes where your gaps are."
        />
        <JourneyStepper />
      </Section>

      {/* Why */}
      <Section labelledBy="why-title">
        <SectionHeader id="why-title" eyebrow="Why GetHyre.ai" title="Not another prep app. The whole path, connected." />
        <FeatureCards
          items={[
            {
              title: "One connected journey",
              body: "Your report builds your roadmap, your roadmap builds your CV, and all of it shapes your job matches.",
              icon: "arrow",
            },
            {
              title: "Matched by assessed skills",
              body: "Jobs are ranked by the skills you've proven, and each application gets a CV tailored to the role.",
              icon: "target",
            },
            {
              title: "Progress you can see",
              body: "Track your readiness score as you train, then retake the assessment to show how far you've come.",
              icon: "check",
            },
          ]}
        />
      </Section>

      {/* Built for three */}
      <Section labelledBy="three-title" className="pt-0 lg:pt-0">
        <H2 id="three-title" className="text-ink">
          Built for three people.
        </H2>
        <ul className="mt-8 grid gap-3 md:grid-cols-3 lg:gap-5">
          <li>
            <LinkCard
              tone="primary"
              kicker="Students"
              title="See your real gaps, follow one roadmap, get matched to jobs that fit."
              link="Get early access"
              href="/early-access"
            />
          </li>
          <li>
            <LinkCard
              kicker="Colleges"
              title="A placement-readiness partner with batch-level progress you can report on."
              link="Partner with us"
              href="/colleges"
            />
          </li>
          <li>
            <LinkCard
              kicker="Companies"
              title="Shortlist freshers who are already assessed and interview-practised."
              link="Register hiring interest"
              href="/companies"
            />
          </li>
        </ul>
      </Section>

      {/* See it before launch */}
      <Section tone="ink" labelledBy="preview-title">
        <div className="flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
          <H2 id="preview-title" className="text-white">
            See it before launch.
          </H2>
          <p className="text-sm text-subtle lg:text-[15px]">Real app screens · launching soon</p>
        </div>
        <div className="mt-6 lg:mt-9">
          <DemoVideo />
        </div>
        <ul
          className="-mx-5 mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 lg:mx-0 lg:mt-9 lg:justify-center lg:gap-6 lg:overflow-visible lg:px-0"
          aria-label="App screens"
        >
          {previewScreens.map((s) => (
            <li key={s.label} className="flex snap-center flex-col items-center gap-3">
              <PhoneMockup src={s.src} alt={s.alt} width={248} frame="soft" />
              <span className="text-sm font-medium text-line-strong">{s.label}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Team */}
      <Section labelledBy="team-title">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="flex flex-col gap-4">
            <SectionHeader id="team-title" eyebrow="The team" title="Built by people who have coached students through placements." />
            <p className="text-base leading-relaxed text-body lg:text-[17px]">
              [Two lines on the team&apos;s coaching and placement background, and why you&apos;re building GetHyre.ai.]
            </p>
          </div>
          <ul className="grid grid-cols-2 gap-4 lg:gap-5">
            {[
              { name: "Pranay Pawar", role: "Co-founder · Product and design" },
              { name: "[Co-founder name]", role: "Co-founder · AI product" },
            ].map((p) => (
              <li key={p.name} className="flex flex-col gap-2">
                <PhotoPlaceholder className="aspect-square" />
                <p className="pt-1 text-base font-bold lg:text-lg">{p.name}</p>
                <p className="text-[13px] text-muted lg:text-[15px]">{p.role}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Campus survey */}
      <section id="campus-survey" aria-labelledby="survey-title" className="scroll-mt-20 pb-14 lg:pb-22">
        <Container>
          <div className="flex flex-col gap-5 rounded-[24px] border border-sky bg-tint p-6 lg:flex-row lg:items-center lg:justify-between lg:p-10">
            <div className="flex flex-col gap-2">
              <h2 id="survey-title" className="text-[22px] font-extrabold tracking-[-0.02em] lg:text-[26px]">
                Help us build GetHyre.ai
              </h2>
              <p className="text-[15px] leading-normal text-body lg:text-[17px]">
                Tell us what makes placement prep hard for you. It takes 2 minutes.
              </p>
            </div>
            <ButtonLink
              href={site.surveyUrl || "/early-access"}
              external={Boolean(site.surveyUrl)}
              track="survey"
              className="w-full shrink-0 lg:w-auto"
            >
              Take the campus survey
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <Section id="faq" tone="white" labelledBy="faq-title">
        <div className="grid gap-6 lg:grid-cols-[360px_minmax(0,1fr)] lg:gap-12">
          <H2 id="faq-title" className="text-ink">
            Questions, answered.
          </H2>
          <Faq items={faqs} />
        </div>
      </Section>

      {/* Early access */}
      <section id="early-access" aria-labelledby="ea-title" className="scroll-mt-20 py-14 lg:py-22">
        <Container>
          <div className="grid items-center gap-6 rounded-[24px] bg-primary p-[18px] pt-7 text-white lg:grid-cols-[minmax(0,1fr)_500px] lg:gap-10 lg:rounded-[28px] lg:p-14">
            <div className="flex flex-col gap-3.5 px-1.5 lg:px-0">
              <h2 id="ea-title" className="text-[28px] font-extrabold leading-[1.12] tracking-[-0.025em] lg:text-[44px] lg:leading-[1.1]">
                Be first in line when GetHyre.ai opens.
              </h2>
              <p className="text-[15px] leading-relaxed text-sky lg:text-[17px]">
                Early-access students get the first invites to campus pilots.
              </p>
              <a href="/colleges" className="hidden text-base font-bold text-white underline-offset-4 hover:underline lg:inline">
                Running placements at a college? Partner with us →
              </a>
            </div>
            <LeadForm
              kind="student"
              fields={fields.studentShort}
              submitLabel="Join early access"
              consentText="I agree to receive launch updates and accept the privacy policy."
            />
            <a href="/colleges" className="px-1.5 text-sm font-bold text-white lg:hidden">
              Running placements at a college? Partner with us →
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}

function FloatCard({ className, children }: { className: string; children: ReactNode }) {
  return (
    <div
      className={`absolute hidden w-[190px] flex-col gap-1 rounded-2xl border border-line bg-white px-4 py-3.5 text-ink shadow-[var(--shadow-float)] lg:flex ${className}`}
    >
      {children}
    </div>
  );
}
