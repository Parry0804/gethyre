import type { Metadata } from "next";
import { LeadForm } from "@/components/forms/lead-form";
import { StoreButtons } from "@/components/layout/store-buttons";
import Link from "next/link";
import { Bullets, DownloadCard } from "@/components/marketing/blocks";
import { Photo } from "@/components/marketing/photos";
import { Reveal } from "@/components/motion";
import { HeroEngine } from "@/components/product/hero-engine";
import { ReportDemo } from "@/components/product/live-demos";
import { ProductTour } from "@/components/product/product-tour";
import { RoleMarquee } from "@/components/product/role-marquee";
import { CampusToCareer, Differences, FactsBand, ScatteredVsConnected } from "@/components/product/sections";
import { VideoPlayer } from "@/components/marketing/video-player";
import { ButtonLink, Container, Section, SectionHeader } from "@/components/ui";
import type { PhotoName } from "@/content/photos";
import { fields } from "@/lib/forms";
import { site } from "@/lib/site";

const partners: { who: string; title: string; points: string[]; cta: string; href: string; photo: PhotoName }[] = [
  {
    who: "For colleges",
    title: "A placement-readiness partner for your campus.",
    points: ["Batch-level readiness and skill gaps", "Students prepared before drives begin", "Onboarding support for your placement cell"],
    cta: "Partner with us",
    href: "/colleges",
    photo: "campusModern",
  },
  {
    who: "For companies",
    title: "Freshers who arrive assessed and interview-ready.",
    points: ["Profiles backed by role-specific assessments", "Candidates matched to the roles you share", "Shortlists from partner campuses"],
    cta: "Register hiring interest",
    href: "/companies",
    photo: "freshersTeam",
  },
];

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
        <Container className="relative grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_600px] lg:gap-12">
          <div className="flex flex-col items-start gap-5 lg:gap-6">
            <span className="inline-flex items-center gap-2 rounded-md border border-sky bg-white px-3.5 py-2 text-[13px] font-semibold text-primary-strong shadow-sm lg:text-sm">
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
              <ButtonLink href="/early-access" track="hero">
                Get early access
              </ButtonLink>
              <ButtonLink href="/product" variant="secondary" track="hero-product">
                See how it works
              </ButtonLink>
            </div>
            <div className="flex flex-col gap-3 pt-1">
              <StoreButtons />
              <a href="/colleges" className="w-fit text-[15px] font-semibold text-primary-strong underline-offset-4 hover:underline">
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

      {/* Target roles */}
      <section id="roles" aria-labelledby="roles-title" className="scroll-mt-20 overflow-hidden bg-white py-12 lg:py-16">
        <Container className="flex flex-col items-center gap-2 text-center">
          <span className="text-[13px] font-bold uppercase tracking-[0.1em] text-primary">Roles we prepare you for</span>
          <h2 id="roles-title" className="text-[24px] font-extrabold tracking-[-0.02em] lg:text-[32px]">
            30+ roles across 8 industries. Pick yours.
          </h2>
          <p className="max-w-[560px] text-[15px] text-body lg:text-[17px]">
            Your assessment, mock interview and roadmap are built around the role you choose.
          </p>
        </Container>
        <RoleMarquee />
      </section>

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

      {/* Skill report (from the former Students page) */}
      <Section id="sample-report" tone="white" labelledBy="report-title">
        <div className="grid items-center gap-10 lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-18">
          <div className="order-2 w-full max-w-[460px] justify-self-center lg:order-1 lg:w-[460px]">
            <ReportDemo />
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

      {/* Why */}
      <Section labelledBy="why-title">
        <SectionHeader id="why-title" eyebrow="Why GetHyre.ai" title="Not another prep app. The whole path, connected." />
        <Differences />
        <Reveal className="mt-6 lg:mt-8">
          <FactsBand />
        </Reveal>
      </Section>

      {/* For colleges and companies */}
      <Section tone="white" labelledBy="partners-title">
        <SectionHeader
          id="partners-title"
          eyebrow="Beyond students"
          title="Working with colleges and hiring teams."
          intro="GetHyre.ai is built for students, together with the placement cells that support them and the companies that hire them."
        />
        <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:mt-12 lg:gap-6">
          {partners.map((p, i) => (
            <Reveal as="li" key={p.who} delay={i * 100}>
              <Link href={p.href} className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-line bg-surface transition-shadow hover:shadow-[var(--shadow-lift)]">
                <Photo name={p.photo} className="h-[220px] rounded-none lg:h-[260px]" sizes="(min-width: 768px) 50vw, 100vw" position="50% 35%" />
                <div className="flex flex-1 flex-col gap-3 p-6 lg:p-8">
                  <span className="text-sm font-bold text-primary">{p.who}</span>
                  <h3 className="text-[22px] font-extrabold leading-tight tracking-[-0.01em] lg:text-[26px]">{p.title}</h3>
                  <Bullets items={p.points} />
                  <span className="mt-auto pt-2 text-[15px] font-bold text-primary-strong group-hover:underline">
                    {p.cta} <span aria-hidden>→</span>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* Campus survey */}
      <section id="campus-survey" aria-labelledby="survey-title" className="scroll-mt-20 py-14 lg:py-22">
        <Container>
          <div className="flex flex-col gap-5 rounded-[12px] border border-sky bg-tint p-6 lg:flex-row lg:items-center lg:justify-between lg:p-10">
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

      {/* Early access */}
      <section id="early-access" aria-labelledby="ea-title" className="scroll-mt-20 py-14 lg:py-22">
        <Container>
          <div className="grid items-center gap-6 rounded-[12px] bg-primary p-[18px] pt-7 text-white lg:grid-cols-[minmax(0,1fr)_500px] lg:gap-10 lg:rounded-[12px] lg:p-14">
            <div className="flex flex-col gap-3.5 px-1.5 lg:px-0">
              <h2 id="ea-title" className="text-[28px] font-extrabold leading-[1.12] tracking-[-0.025em] lg:text-[44px] lg:leading-[1.1]">
                Be first in line when GetHyre.ai opens.
              </h2>
              <p className="text-[15px] leading-relaxed text-white lg:text-[17px]">
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
