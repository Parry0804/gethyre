import type { Metadata } from "next";
import { LeadForm } from "@/components/forms/lead-form";
import { AppBadge } from "@/components/layout/app-badge";
import { CheckIcon } from "@/components/icons";
import { Faq } from "@/components/marketing/blocks";
import { Reveal } from "@/components/motion";
import { HeroEngine } from "@/components/product/hero-engine";
import { DashboardDemo } from "@/components/product/live-demos";
import { ProductTour } from "@/components/product/product-tour";
import { BuiltForThree, CampusToCareer, Differences, FactsBand, ScatteredVsConnected } from "@/components/product/sections";
import { JourneyStepper } from "@/components/marketing/journey-stepper";
import { VideoPlayer } from "@/components/marketing/video-player";
import { ButtonLink, Container, H2, Section, SectionHeader } from "@/components/ui";
import { faqs } from "@/content/journey";
import { fields } from "@/lib/forms";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "GetHyre.ai · Know your gaps. Close them. Get hired." },
  alternates: { canonical: "/" },
};


export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pb-8 pt-8 lg:pb-10 lg:pt-14">
        <div className="bg-dots absolute inset-0 [mask-image:radial-gradient(ellipse_at_70%_30%,#000_20%,transparent_70%)]" aria-hidden />
        <Container className="relative grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_560px] lg:gap-8">
          <div className="flex flex-col items-start gap-5 lg:gap-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-sky bg-white px-3.5 py-2 text-[13px] font-semibold text-primary-strong shadow-sm lg:text-sm">
              <span className="relative flex size-2">
                <span className="animate-ping-soft absolute inline-flex size-full rounded-full bg-primary" />
                <span className="relative inline-flex size-2 rounded-full bg-primary" />
              </span>
              Now onboarding pilot colleges
            </span>
            <h1 className="text-[44px] font-extrabold leading-[1.02] tracking-[-0.04em] text-ink sm:text-[56px] lg:text-[72px]">
              Know your gaps.
              <br />
              Close them.
              <br />
              <span className="text-primary">Get hired.</span>
            </h1>
            <p className="max-w-[540px] text-[17px] leading-relaxed text-body lg:text-[19px]">
              The AI placement journey for college students. A skill assessment and an AI mock interview find your gaps, a
              roadmap closes them, and jobs are matched to the skills you&apos;ve proved.
            </p>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <ButtonLink href="/early-access" track="hero" className="shadow-[0_10px_24px_rgb(37_99_235/0.3)]">
                Get early access
              </ButtonLink>
              <ButtonLink href="/product" variant="secondary" track="hero-product">
                See how it works
              </ButtonLink>
            </div>
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <AppBadge />
              <a href="/colleges" className="text-[15px] font-semibold text-primary-strong underline-offset-4 hover:underline">
                Run placements at a college?
              </a>
            </div>
          </div>
          <HeroEngine />
        </Container>
      </section>

      {/* Demo video */}
      {site.collegeVideo.src ? (
        <section id="demo" aria-labelledby="demo-title" className="scroll-mt-20 pt-14 lg:pt-22">
          <Container className="flex flex-col items-center gap-8 text-center lg:gap-10">
            <SectionHeader
              id="demo-title"
              eyebrow="Watch the demo"
              title="GetHyre.ai in one minute."
              intro="How one guided journey takes students from their first assessment to placement, and what colleges see along the way."
              className="items-center"
            />
            <Reveal className="w-full max-w-[1080px]">
              <VideoPlayer
                src={site.collegeVideo.src}
                poster={site.collegeVideo.poster}
                title={site.collegeVideo.title}
                label={`Watch the demo · ${site.collegeVideo.length}`}
              />
            </Reveal>
          </Container>
        </section>
      ) : null}

      {/* Problem */}
      <Section labelledBy="problem-title">
        <SectionHeader
          id="problem-title"
          eyebrow="The problem"
          title="Placement season shouldn't be guesswork."
          intro="Most students prepare with scattered tools and never find out which skill is holding them back. GetHyre.ai joins every step into one journey."
        />
        <ScatteredVsConnected />
      </Section>

      {/* Product tour */}
      <section id="product-tour" aria-labelledby="tour-title" className="relative scroll-mt-20 overflow-hidden bg-night py-16 text-white lg:py-24">
        <div className="bg-dots-night absolute inset-0 [mask-image:linear-gradient(180deg,#000,transparent_70%)]" aria-hidden />
        <div className="absolute -right-40 -top-40 size-[520px] rounded-full bg-primary/25 blur-[120px]" aria-hidden />
        <Container className="relative">
          <SectionHeader
            id="tour-title"
            eyebrow="Product tour"
            title="See the app at work."
            intro="Every screen below is a live preview of the GetHyre.ai journey. Pick a step or let it play."
            invert
          />
          <ProductTour />
        </Container>
      </section>

      {/* People */}
      <Section labelledBy="people-title">
        <SectionHeader
          id="people-title"
          eyebrow="From campus to career"
          title="Made for students on their way to a first job."
          intro="GetHyre.ai stays with a student from the first assessment in their final years to the job they're matched to."
        />
        <CampusToCareer />
      </Section>

      {/* How it works */}
      <Section id="how-it-works" tone="white" labelledBy="how-title">
        <SectionHeader
          id="how-title"
          eyebrow="How it works"
          title="Diagnose. Train. Place."
          intro="Seven steps across three phases. Each step unlocks the next, so every hour of prep goes where your gaps are."
        />
        <JourneyStepper />
      </Section>

      {/* Why */}
      <Section labelledBy="why-title">
        <SectionHeader id="why-title" eyebrow="Why GetHyre.ai" title="Not another prep app. The whole path, connected." />
        <Differences />
        <Reveal className="mt-6 lg:mt-8">
          <FactsBand />
        </Reveal>
      </Section>

      {/* Dashboard */}
      <Section tone="white" labelledBy="dash-title">
        <div className="grid items-center gap-10 lg:grid-cols-[400px_minmax(0,1fr)] lg:gap-14">
          <div className="flex flex-col gap-5">
            <SectionHeader
              id="dash-title"
              eyebrow="Journey dashboard"
              title="Every step tracked in one place."
              intro="Readiness over time, gaps closed, roadmap progress, interviews and applications. Open the app and you always know what to do next."
            />
            <ul className="flex flex-col gap-2.5">
              {["Readiness trend, week by week", "Gaps closed and gaps left", "Your next step, every time"].map((x) => (
                <li key={x} className="flex items-center gap-3 text-[15px] font-semibold text-ink">
                  <span className="flex size-6 items-center justify-center rounded-full bg-tint text-primary">
                    <CheckIcon size={14} />
                  </span>
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <Reveal>
            <DashboardDemo />
          </Reveal>
        </div>
      </Section>

      {/* Built for three */}
      <Section labelledBy="three-title">
        <H2 id="three-title" className="text-ink">
          Built for three people.
        </H2>
        <BuiltForThree />
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
