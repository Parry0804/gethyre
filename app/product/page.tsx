import type { Metadata } from "next";
import { CheckIcon } from "@/components/icons";
import { CtaBand } from "@/components/marketing/blocks";
import { PhoneMockup } from "@/components/marketing/phone-mockup";
import { Reveal } from "@/components/motion";
import { Demo } from "@/components/product/live-demos";
import { ButtonLink, Container, Eyebrow, H1, Lead, Section, SectionHeader, cx } from "@/components/ui";
import { modules } from "@/content/product";

export const metadata: Metadata = {
  title: "Product tour",
  description:
    "Every part of GetHyre.ai: profile and target role, skill assessment, AI mock interview, skill report, roadmap, ATS-ready CV, job-ready check, skill-based job matching and the journey dashboard.",
  alternates: { canonical: "/product" },
};

const phaseTone: Record<string, string> = {
  Diagnose: "bg-tint text-primary-strong",
  Train: "bg-amber-tint text-warning",
  Place: "bg-success-tint text-success-strong",
  Track: "bg-surface text-ink",
};

export default function ProductPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pb-6 pt-10 lg:pb-10 lg:pt-16">
        <div className="bg-dots absolute inset-0 [mask-image:radial-gradient(ellipse_at_50%_0%,#000_20%,transparent_65%)]" aria-hidden />
        <Container className="relative flex flex-col items-center text-center">
          <Eyebrow>Product tour</Eyebrow>
          <H1 className="mt-4 max-w-[900px] lg:text-[64px]">Every step of placement prep, in one app.</H1>
          <Lead className="mt-5 max-w-[680px]">
            From the first assessment to a matched job, here&apos;s exactly what students do in GetHyre.ai and what they get back
            at each step.
          </Lead>
          <div className="mt-7 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <ButtonLink href="/early-access" track="product-hero">
              Get early access
            </ButtonLink>
            <ButtonLink href="/colleges" variant="secondary" track="product-hero-college">
              Bring it to your college
            </ButtonLink>
          </div>

          {/* Fanned phones */}
          <div className="relative mt-12 flex h-[300px] w-full max-w-[760px] items-start justify-center sm:h-[400px] lg:mt-16 lg:h-[480px]">
            <div className="absolute bottom-0 left-1/2 h-[70%] w-[90%] -translate-x-1/2 rounded-t-[40px] bg-sky" aria-hidden />
            <div className="absolute left-1/2 top-10 hidden -translate-x-[150%] -rotate-6 sm:block">
              <PhoneMockup src="/screens/report.webp" alt="Skill report screen" width={220} />
            </div>
            <div className="relative z-10 animate-float">
              <PhoneMockup src="/screens/home-diagnose.webp" alt="GetHyre.ai home screen" width={250} priority />
            </div>
            <div className="absolute left-1/2 top-10 hidden translate-x-1/2 rotate-6 sm:block">
              <PhoneMockup src="/screens/plan.webp" alt="Roadmap screen" width={220} />
            </div>
          </div>
        </Container>
      </section>

      {/* Jump navigation */}
      <nav
        aria-label="Product sections"
        className="sticky top-16 z-30 border-y border-line bg-white/95 backdrop-blur lg:top-[76px]"
      >
        <Container>
          <ul className="-mx-5 flex gap-2 overflow-x-auto px-5 py-3 [scrollbar-width:none] lg:mx-0 lg:justify-center lg:px-0">
            {modules.map((m, i) => (
              <li key={m.id} className="shrink-0">
                <a
                  href={`#${m.id}`}
                  className="flex items-center gap-2 rounded-full border border-line px-3.5 py-2 text-[13px] font-semibold text-ink transition-colors hover:border-primary hover:text-primary"
                >
                  <span className="text-muted">{i + 1}</span>
                  {m.tab}
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </nav>

      {/* Modules */}
      {modules.map((m, i) => {
        const flip = i % 2 === 1;
        return (
          <section
            key={m.id}
            id={m.id}
            aria-labelledby={`${m.id}-title`}
            className={cx("scroll-mt-36 py-14 lg:scroll-mt-40 lg:py-20", i % 2 === 0 ? "bg-surface" : "bg-white")}
          >
            <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <div className={cx("flex flex-col gap-4", flip && "lg:order-2")}>
                <div className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-full bg-ink text-sm font-extrabold text-white">
                    {i + 1}
                  </span>
                  <span className={cx("rounded-full px-3 py-1 text-xs font-bold", phaseTone[m.phase])}>{m.phase}</span>
                </div>
                <h2
                  id={`${m.id}-title`}
                  className="text-[28px] font-extrabold leading-[1.12] tracking-[-0.025em] text-ink lg:text-[40px]"
                >
                  {m.title}
                </h2>
                <p className="text-base leading-relaxed text-body lg:text-lg">{m.summary}</p>
                <div className="mt-2 grid gap-6 sm:grid-cols-2">
                  <List title="What you do" items={m.youDo} />
                  <List title="What you get" items={m.youGet} accent />
                </div>
              </div>

              <Reveal className={cx("relative", flip && "lg:order-1")}>
                <div className={cx(m.screen && (flip ? "lg:ml-36" : "lg:mr-36"))}>
                  <Demo name={m.demo} />
                </div>
                {m.screen ? (
                  <div
                    className={cx(
                      "absolute -bottom-10 hidden lg:block",
                      flip ? "-left-2 -rotate-3" : "-right-2 rotate-3",
                    )}
                  >
                    <PhoneMockup src={m.screen.src} alt={m.screen.alt} width={160} />
                  </div>
                ) : null}
              </Reveal>
            </Container>
          </section>
        );
      })}

      {/* Two ways in */}
      <Section tone="white" labelledBy="ways-title">
        <SectionHeader
          id="ways-title"
          eyebrow="Two ways in"
          title="Start from scratch, or go straight to jobs."
          intro="Every student begins with the same diagnosis. What happens next depends on what it shows."
        />
        <div className="mt-8 grid gap-4 lg:mt-12 lg:grid-cols-2 lg:gap-6">
          <Reveal className="flex flex-col gap-5 rounded-[24px] bg-primary p-6 text-white lg:p-8">
            <h3 className="text-xl font-bold lg:text-2xl">Full journey</h3>
            <p className="text-[15px] leading-relaxed text-sky lg:text-base">
              For most students. Find your gaps, close them on a roadmap, then get matched once you&apos;re job-ready.
            </p>
            <Flow steps={["Diagnose", "Train", "Job-ready", "Place"]} light />
          </Reveal>
          <Reveal delay={100} className="flex flex-col gap-5 rounded-[24px] border border-line bg-surface p-6 lg:p-8">
            <h3 className="text-xl font-bold lg:text-2xl">Direct placement</h3>
            <p className="text-[15px] leading-relaxed text-body lg:text-base">
              Already prepared? If your diagnosis passes the job-ready check, skip the roadmap and go straight to matched jobs.
            </p>
            <Flow steps={["Diagnose", "Job-ready", "Place"]} />
          </Reveal>
        </div>
      </Section>

      <CtaBand
        title="Want to try it first?"
        body="Join early access and get the first invites to campus pilots."
        cta="Get early access"
        href="/early-access"
        track="product-cta"
      />
    </>
  );
}

function List({ title, items, accent }: { title: string; items: string[]; accent?: boolean }) {
  return (
    <div className="flex flex-col gap-2.5">
      <span className="text-sm font-bold text-ink">{title}</span>
      <ul className="flex flex-col gap-2">
        {items.map((x) => (
          <li key={x} className="flex items-start gap-2.5 text-[15px] leading-snug text-body">
            <span
              className={cx(
                "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full",
                accent ? "bg-success text-white" : "bg-tint text-primary",
              )}
            >
              <CheckIcon size={12} />
            </span>
            {x}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Flow({ steps, light }: { steps: string[]; light?: boolean }) {
  return (
    <ol className="flex flex-wrap items-center gap-2">
      {steps.map((s, i) => (
        <li key={s} className="flex items-center gap-2">
          <span
            className={cx(
              "rounded-full px-3.5 py-1.5 text-[13px] font-bold",
              light ? "bg-white text-primary" : "bg-white text-ink ring-1 ring-line",
            )}
          >
            {s}
          </span>
          {i < steps.length - 1 ? (
            <span aria-hidden className={light ? "text-sky" : "text-muted"}>
              →
            </span>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
