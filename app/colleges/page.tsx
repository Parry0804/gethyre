import type { Metadata } from "next";
import { LeadForm } from "@/components/forms/lead-form";
import { Bullets, DownloadCard, FeatureCards, NumberedSteps, PageHero } from "@/components/marketing/blocks";
import { PhotoBand } from "@/components/marketing/photos";
import { VideoPlayer } from "@/components/marketing/video-player";
import { ButtonLink, Container, Pill, Section, SectionHeader } from "@/components/ui";
import { fields } from "@/lib/forms";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "For colleges and placement cells",
  description:
    "GetHyre.ai gives every student a skill diagnosis, a roadmap and matched jobs, and gives your placement cell a live view of batch readiness.",
  alternates: { canonical: "/colleges" },
};

export default function CollegesPage() {
  const brochure = site.downloads.brochure;
  return (
    <>
      <PageHero
        eyebrow="For colleges and TPOs"
        title="Better placement outcomes for your students."
        intro="GetHyre.ai gives every student a skill diagnosis, a roadmap and matched jobs, and gives your placement cell a live view of batch readiness."
        actions={
          <>
            <ButtonLink href={site.bookingUrl || "#book-a-call"} external={Boolean(site.bookingUrl)} track="colleges-hero">
              Book a partnership call
            </ButtonLink>
            <ButtonLink href={brochure.href ?? "#downloads"} variant="secondary" track="colleges-brochure">
              Download brochure
            </ButtonLink>
          </>
        }
        aside={<BatchDashboard />}
      />

      <PhotoBand
        names={["campusWalk", "campusBuilding", "studyGroup"]}
        captions={["Final-year students", "Your campus", "Batch-wide prep"]}
      />

      {site.collegeVideo.src ? (
        <section id="demo-video" aria-labelledby="video-title" className="relative scroll-mt-20 overflow-hidden bg-night py-16 text-white lg:py-24">
          <div className="bg-dots-night absolute inset-0 [mask-image:linear-gradient(180deg,#000,transparent_75%)]" aria-hidden />
          <Container className="relative flex flex-col items-center gap-8 text-center lg:gap-12">
            <SectionHeader
              id="video-title"
              eyebrow="Watch the demo"
              title="See what GetHyre.ai does for your students."
              intro="A short walkthrough of the student journey and what your placement cell sees."
              invert
              className="items-center"
            />
            <VideoPlayer src={site.collegeVideo.src} poster={site.collegeVideo.poster} title={site.collegeVideo.title} label={`Watch the demo · ${site.collegeVideo.length}`} className="max-w-[1040px]" />
          </Container>
        </section>
      ) : null}

      <Section tone="white" labelledBy="gets-title">
        <SectionHeader id="gets-title" eyebrow="What your college gets" title="A placement partner, not another portal." />
        <FeatureCards
          tone="surface"
          columns={4}
          items={[
            { title: "Batch readiness view", body: "See every student's readiness, gaps and progress in one dashboard.", icon: "target" },
            { title: "Reports for your reviews", body: "Readiness reports by batch, branch and skill for placement reviews.", icon: "check" },
            { title: "A growing hiring network", body: "Companies hiring from partner campuses see your assessed students.", icon: "arrow" },
            { title: "Onboarding support", body: "We run the student onboarding drive and assessment week with your team.", icon: "check" },
          ]}
        />
      </Section>

      <Section labelledBy="pilot-title">
        <SectionHeader id="pilot-title" eyebrow="How a pilot runs" title="Live on campus in four steps." />
        <NumberedSteps
          items={[
            { title: "Partnership call", body: "We walk your placement team through the platform and agree a simple MoU." },
            { title: "Onboarding drive", body: "Students join with your college linked to their profile." },
            { title: "Diagnose week", body: "Every student takes the assessment and an AI mock interview." },
            { title: "Batch report and training", body: "You get the batch view; students start their roadmaps." },
          ]}
        />
      </Section>

      <Section id="book-a-call" tone="white" labelledBy="call-title">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_500px] lg:gap-16">
          <div className="flex flex-col gap-5">
            <SectionHeader
              id="call-title"
              eyebrow="Talk to us"
              title="See how a pilot would work at your college."
              intro="Share a few details and we'll set up a call with your placement team."
            />
            <Bullets
              items={[
                "A walkthrough of the student journey and the batch view",
                "A pilot plan sized to your final-year batch",
                "Answers to your placement team's questions",
                "Your college is named publicly only with your approval",
              ]}
            />
            <div id="downloads" className="flex scroll-mt-24 flex-col gap-3 pt-3">
              <p className="text-xs font-bold uppercase tracking-[0.08em] text-muted lg:text-sm">
                Downloads for your placement team
              </p>
              <DownloadCard {...brochure} />
              <DownloadCard {...site.downloads.sampleReport} />
            </div>
          </div>
          <LeadForm kind="college" fields={fields.college} submitLabel="Request a call" tone="surface" heading="Book a partnership call" />
        </div>
      </Section>
    </>
  );
}

/** Illustrative batch readiness card for the hero. Numbers are sample data. */
function BatchDashboard() {
  const gaps = [
    { label: "Communication", pct: 41 },
    { label: "Aptitude", pct: 28 },
    { label: "Domain skills", pct: 22 },
  ];
  return (
    <figure
      aria-label="Illustrative college dashboard showing batch readiness"
      className="flex w-full max-w-[560px] flex-col gap-4 rounded-[20px] border border-line bg-white p-5 shadow-[var(--shadow-lift)] lg:gap-5 lg:rounded-[24px] lg:p-7"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[17px] font-bold lg:text-xl">Batch readiness</p>
          <p className="text-xs text-muted lg:text-[13px]">[College name] · Final year, 2027</p>
        </div>
        <Pill className="bg-warning-tint text-[#92400e]">Illustrative</Pill>
      </div>
      <dl className="grid grid-cols-3 gap-2 lg:gap-3">
        {[
          ["412", "Students onboarded"],
          ["368", "Reports ready"],
          ["64", "Avg readiness"],
        ].map(([v, k]) => (
          <div key={k} className="flex flex-col-reverse gap-0.5 rounded-xl bg-surface p-3 lg:rounded-2xl lg:p-4">
            <dt className="text-[11px] font-medium text-muted lg:text-xs">{k}</dt>
            <dd className="text-[22px] font-extrabold lg:text-[28px]">{v}</dd>
          </div>
        ))}
      </dl>
      <div className="flex flex-col gap-2.5">
        <p className="text-sm font-semibold">Readiness across the batch</p>
        <div className="flex h-3.5 gap-1" aria-hidden>
          <span className="w-[22%] rounded-full bg-success" />
          <span className="w-[46%] rounded-full bg-primary" />
          <span className="w-[32%] rounded-full bg-[#f59e0b]" />
        </div>
        <ul className="flex flex-wrap gap-4 text-xs font-medium text-body">
          <li className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-success" />Job-ready 22%</li>
          <li className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-primary" />Nearly there 46%</li>
          <li className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-[#f59e0b]" />Building 32%</li>
        </ul>
      </div>
      <div className="flex flex-col gap-3">
        <p className="text-sm font-semibold">Most common gaps</p>
        {gaps.map((g) => (
          <div key={g.label} className="flex flex-col gap-1.5">
            <div className="flex justify-between text-xs lg:text-[13px]">
              <span className="font-medium">{g.label}</span>
              <span className="text-muted">{g.pct}% of students</span>
            </div>
            <div className="h-2 rounded-full bg-surface">
              <div className="h-2 rounded-full bg-primary" style={{ width: `${g.pct}%` }} />
            </div>
          </div>
        ))}
      </div>
    </figure>
  );
}
