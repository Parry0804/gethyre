import type { Metadata } from "next";
import Link from "next/link";
import { CheckIcon } from "@/components/icons";
import { StoreButtons } from "@/components/layout/store-buttons";
import { Photo } from "@/components/marketing/photos";
import { Reveal } from "@/components/motion";
import { ButtonLink, Container, Eyebrow, H1, Lead, Section, SectionHeader, cx } from "@/components/ui";
import type { PhotoName } from "@/content/photos";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About us",
  description:
    "GetHyre.ai is an AI placement platform that takes college students from campus to career: it diagnoses skill gaps, trains on a personal roadmap and matches students to jobs by proven skills.",
  alternates: { canonical: "/about" },
};

const problems = [
  {
    title: "Students can't see their gaps",
    body: "Most find out what they're missing in the interview room, when it's too late to fix it.",
  },
  {
    title: "Preparation is scattered",
    body: "Resume templates, video playlists, test apps and job boards that never talk to each other.",
  },
  {
    title: "Hiring runs on keywords",
    body: "Job matching reads CVs for words, not for what a candidate can actually do.",
  },
];

const phases: { phase: string; title: string; body: string; photo: PhotoName; href: string }[] = [
  {
    phase: "Diagnose",
    title: "Find out where you stand",
    body: "A role-specific skill assessment and an AI mock interview produce one readiness score and a ranked list of gaps.",
    photo: "studentDesk",
    href: "/product#assessment",
  },
  {
    phase: "Train",
    title: "Close the gaps that matter",
    body: "A month-by-month roadmap built from those gaps, progress you can see, and an ATS-ready CV written from what you've proved.",
    photo: "studyGroup",
    href: "/product#roadmap",
  },
  {
    phase: "Place",
    title: "Get matched on proven skills",
    body: "Once the job-ready check is passed, students are matched to roles by assessed skills, with a CV tailored to each job.",
    photo: "youngProfessional",
    href: "/product#jobs",
  },
];

const principles = [
  { title: "Honesty first", body: "A clear report beats false confidence. We show students exactly where they stand, and why." },
  { title: "One path, not ten apps", body: "Diagnosis, training and placement belong in one connected journey where each step feeds the next." },
  { title: "Skills over keywords", body: "What a student can do should decide which jobs they see, not the words on their CV." },
  { title: "Built with colleges", body: "Placement cells know their students best. We work alongside them, not around them." },
];

const commitments = [
  {
    title: "We never sell your data",
    body: "Personal data is used only to run your journey. No data brokers, no third-party advertising.",
    link: { label: "Privacy policy", href: "/privacy" },
  },
  {
    title: "Scores you can check",
    body: "We publish how the readiness score and gap levels are built, and a person reviews any score you dispute.",
    link: { label: "How we assess", href: "/how-we-assess" },
  },
  {
    title: "AI as guidance, not judgment",
    body: "AI scores and matches help students and employers decide. They never make a hiring decision on their own.",
    link: { label: "How we use AI", href: "/privacy#ai" },
  },
  {
    title: "Your data, your call",
    body: "Students choose which employers see their profile, and can delete their account and data at any time.",
    link: { label: "Your rights", href: "/privacy#your-rights" },
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pb-12 pt-12 lg:pb-20 lg:pt-20">
        <div className="bg-dots absolute inset-0 [mask-image:radial-gradient(ellipse_at_50%_0%,#000_15%,transparent_65%)]" aria-hidden />
        <Container className="relative flex flex-col items-center gap-6 text-center">
          <Eyebrow>About GetHyre.ai</Eyebrow>
          <H1 className="max-w-[980px] lg:text-[68px]">We help every graduate find their way from campus to career.</H1>
          <Lead className="max-w-[760px] lg:text-xl">
            GetHyre.ai is an AI placement platform for college students. We find what stands between a student and their first
            job, help them close it, and connect them to employers on the strength of skills they&apos;ve proved.
          </Lead>
          <div className="flex w-full flex-col justify-center gap-3 pt-2 sm:w-auto sm:flex-row">
            <ButtonLink href="/product" track="about-product">
              Explore the product
            </ButtonLink>
            <ButtonLink href="/colleges" variant="secondary" track="about-colleges">
              Partner with us
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* Wide photo */}
      <Container>
        <Reveal>
          <Photo name="businessSchool" priority className="h-[280px] sm:h-[400px] lg:h-[560px]" sizes="(min-width: 1440px) 1360px, 100vw" position="50% 35%">
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night/80 to-night/0 px-5 pb-5 pt-24 lg:px-10 lg:pb-9">
              <p className="max-w-[640px] text-left text-lg font-bold leading-snug text-white lg:text-[28px]">
                Built for the millions of students who graduate every year ready to work, but not yet sure how to get there.
              </p>
            </div>
          </Photo>
        </Reveal>
      </Container>
      <div className="h-12 lg:h-20" aria-hidden />

      {/* The problem */}
      <Section tone="white" labelledBy="problem-title">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
          <div className="flex flex-col gap-6">
            <SectionHeader
              id="problem-title"
              eyebrow="Why we exist"
              title="Degrees are rising. Job-readiness isn't keeping up."
              intro="India produces one of the world's largest graduating classes every year, and many of those graduates leave college unsure what employers want from them. The gap usually isn't talent. It's knowing what to work on, and getting seen for it."
            />
          </div>
          <ul className="flex flex-col gap-3 lg:justify-center lg:gap-4">
            {problems.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 100} className="flex gap-4 rounded-[16px] border border-line bg-surface p-5 lg:p-6">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white text-sm font-extrabold text-primary ring-1 ring-line">
                  {i + 1}
                </span>
                <span className="flex flex-col gap-1">
                  <span className="text-lg font-bold">{p.title}</span>
                  <span className="text-[15px] leading-relaxed text-body">{p.body}</span>
                </span>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      {/* Mission and vision */}
      <section aria-labelledby="mission-title" className="relative overflow-hidden bg-night py-16 text-white lg:py-24">
        <div className="bg-dots-night absolute inset-0 [mask-image:linear-gradient(180deg,#000,transparent_80%)]" aria-hidden />
        <div className="absolute -left-40 -top-40 size-[480px] rounded-full bg-primary/25 blur-[120px]" aria-hidden />
        <Container className="relative">
          <h2 id="mission-title" className="sr-only">
            Mission and vision
          </h2>
          <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
            <Reveal className="flex flex-col gap-4 rounded-[20px] border border-night-line bg-night-2/60 p-7 lg:p-10">
              <span className="text-sm font-bold text-sky">Our mission</span>
              <p className="text-[26px] font-extrabold leading-tight tracking-[-0.02em] lg:text-[36px]">
                Make every student who is ready to work, ready to be hired.
              </p>
              <p className="text-[15px] leading-relaxed text-[#b6c4e0] lg:text-base">
                By turning placement preparation into one honest, measurable journey: diagnose, train, place.
              </p>
            </Reveal>
            <Reveal delay={100} className="flex flex-col gap-4 rounded-[20px] border border-night-line bg-night-2/60 p-7 lg:p-10">
              <span className="text-sm font-bold text-sky">Our vision</span>
              <p className="text-[26px] font-extrabold leading-tight tracking-[-0.02em] lg:text-[36px]">
                A hiring world where proven skills open doors, not college names or keywords.
              </p>
              <p className="text-[15px] leading-relaxed text-[#b6c4e0] lg:text-base">
                Where every graduate knows their next step, and every employer can trust what a candidate&apos;s profile says.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* What we do */}
      <Section labelledBy="what-title">
        <SectionHeader
          id="what-title"
          eyebrow="What we do"
          title="One AI platform for the whole placement journey."
          intro="Three phases, each feeding the next, in an app students carry with them through their final years."
        />
        <ol className="mt-8 grid gap-4 md:grid-cols-3 lg:mt-12 lg:gap-6">
          {phases.map((p, i) => (
            <Reveal as="li" key={p.phase} delay={i * 100} className="flex flex-col overflow-hidden rounded-[20px] border border-line bg-white">
              <Photo name={p.photo} className="h-[200px] rounded-none lg:h-[230px]" sizes="(min-width: 768px) 33vw, 100vw" position="50% 30%">
                <span className="absolute left-4 top-4 rounded-md bg-white/95 px-2.5 py-1 text-xs font-bold text-primary-strong">
                  {i + 1} · {p.phase}
                </span>
              </Photo>
              <div className="flex flex-1 flex-col gap-2.5 p-6">
                <h3 className="text-xl font-bold">{p.title}</h3>
                <p className="text-[15px] leading-relaxed text-body">{p.body}</p>
                <Link href={p.href} className="mt-auto pt-2 text-[15px] font-bold text-primary-strong underline-offset-4 hover:underline">
                  See how it works <span aria-hidden>→</span>
                </Link>
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* How we work */}
      <Section tone="white" labelledBy="principles-title">
        <div className="grid gap-10 lg:grid-cols-[400px_minmax(0,1fr)] lg:gap-16">
          <SectionHeader
            id="principles-title"
            eyebrow="How we work"
            title="Four principles behind every decision."
            intro="They shape what we build, what we leave out and how we treat the people who use GetHyre.ai."
          />
          <ul className="grid gap-px overflow-hidden rounded-[20px] border border-line bg-line sm:grid-cols-2">
            {principles.map((p, i) => (
              <li key={p.title} className="flex flex-col gap-2 bg-white p-6 lg:p-8">
                <span className="text-sm font-extrabold text-primary">0{i + 1}</span>
                <h3 className="text-xl font-bold">{p.title}</h3>
                <p className="text-[15px] leading-relaxed text-body">{p.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Trust */}
      <Section tone="white" labelledBy="trust-title">
        <SectionHeader
          id="trust-title"
          eyebrow="Our commitments"
          title="Responsible AI, and respect for student data."
          intro="Students trust us with their scores, answers and ambitions. Here's what we promise in return."
        />
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4 lg:gap-5">
          {commitments.map((c, i) => (
            <Reveal as="li" key={c.title} delay={i * 80} className="flex flex-col gap-3 rounded-[16px] border border-line bg-surface p-6">
              <span className="flex size-9 items-center justify-center rounded-full bg-success text-white">
                <CheckIcon size={18} />
              </span>
              <h3 className="text-lg font-bold">{c.title}</h3>
              <p className="text-[15px] leading-relaxed text-body">{c.body}</p>
              <Link href={c.link.href} className="mt-auto pt-1 text-sm font-bold text-primary-strong underline-offset-4 hover:underline">
                {c.link.label} <span aria-hidden>→</span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* Get the app */}
      <section aria-labelledby="app-title" className="py-14 lg:py-20">
        <Container>
          <div className="relative flex flex-col items-start gap-6 overflow-hidden rounded-[24px] bg-primary px-6 py-10 text-white lg:flex-row lg:items-center lg:justify-between lg:px-14 lg:py-14">
            <div className="absolute -right-24 -top-24 size-[360px] rounded-full bg-white/10" aria-hidden />
            <div className="relative flex flex-col gap-3">
              <h2 id="app-title" className="text-[28px] font-extrabold leading-tight tracking-[-0.02em] lg:text-[40px]">
                Get GetHyre.ai on your phone.
              </h2>
              <p className="max-w-[520px] text-base text-sky lg:text-lg">Available for iPhone and Android.</p>
            </div>
            <StoreButtons tone="light" size="lg" className="relative" />
          </div>
        </Container>
      </section>

      {/* Contact */}
      <Section id="contact" tone="white" labelledBy="contact-title">
        <div className="grid gap-10 lg:grid-cols-[400px_minmax(0,1fr)] lg:gap-16">
          <div className="flex flex-col gap-5">
            <SectionHeader id="contact-title" eyebrow="Get in touch" title="Talk to us." />
            <dl className="flex flex-col gap-3 text-[15px]">
              <div>
                <dt className="font-bold text-ink">Company</dt>
                <dd className="text-body">{site.contact.companyName}</dd>
              </div>
              <div>
                <dt className="font-bold text-ink">Based in</dt>
                <dd className="text-body">{site.contact.city}, India</dd>
              </div>
              <div>
                <dt className="font-bold text-ink">Email</dt>
                <dd>
                  <a href={`mailto:${site.contact.email}`} className="font-semibold text-primary-strong hover:underline">
                    {site.contact.email}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
          <ul className="grid gap-px overflow-hidden rounded-[20px] border border-line bg-line sm:grid-cols-2">
            {[
              { k: "Colleges and universities", t: "Bring GetHyre.ai to your placement cell.", l: "Book a partnership call", h: "/colleges#book-a-call" },
              { k: "Hiring teams", t: "Hire assessed freshers from partner campuses.", l: "Register hiring interest", h: "/companies#register" },
              { k: "Press and media", t: "Logos, app screens and company facts.", l: "Open the press kit", h: "/press" },
              { k: "Careers", t: "Help us build the future of campus hiring.", l: "See open roles", h: "/careers" },
            ].map((c) => (
              <li key={c.k} className="flex flex-col gap-2 bg-white p-6 lg:p-7">
                <span className="text-sm font-bold text-primary">{c.k}</span>
                <span className={cx("text-lg font-bold leading-snug text-ink")}>{c.t}</span>
                <Link href={c.h} className="mt-auto pt-2 text-[15px] font-bold text-primary-strong underline-offset-4 hover:underline">
                  {c.l} <span aria-hidden>→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}
