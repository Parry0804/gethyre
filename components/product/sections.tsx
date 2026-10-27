import Link from "next/link";
import { CheckIcon } from "@/components/icons";
import type { ReactNode } from "react";
import { Photo } from "@/components/marketing/photos";
import { CountUp, Reveal } from "@/components/motion";
import { cx } from "@/components/ui";

/* ---------- Scattered prep vs one connected journey ---------- */

const scattered = [
  { t: "Resume template", c: "left-[6%] top-[10%] -rotate-6" },
  { t: "YouTube playlist", c: "right-[8%] top-[6%] rotate-3" },
  { t: "Mock-test app", c: "left-[22%] top-[34%] rotate-2" },
  { t: "Job board", c: "right-[4%] top-[40%] -rotate-3" },
  { t: "WhatsApp group tips", c: "left-[4%] top-[62%] rotate-3" },
  { t: "Spreadsheet tracker", c: "right-[12%] top-[72%] -rotate-2" },
  { t: "Keyword job alerts", c: "left-[30%] top-[84%] -rotate-1" },
];

const thread = [
  { t: "Skill assessment", s: "Scores every skill the role needs" },
  { t: "AI mock interview", s: "Adds how you communicate" },
  { t: "Skill report", s: "Turns both into readiness and gaps" },
  { t: "Roadmap", s: "Built from your gaps" },
  { t: "ATS-ready CV", s: "Written from what you proved" },
  { t: "Job matches", s: "Ranked by your assessed skills" },
];

export function ScatteredVsConnected() {
  return (
    <div className="mt-8 grid gap-4 lg:mt-12 lg:grid-cols-2 lg:gap-6">
      <Reveal className="flex flex-col rounded-[24px] border border-line bg-white p-6 lg:p-8">
        <h3 className="text-lg font-bold lg:text-xl">Placement prep today</h3>
        <p className="mt-1.5 text-[15px] text-body">Seven tools, none of them talking to each other, and no idea which skill to fix first.</p>
        <div className="relative mt-6 min-h-[320px] flex-1 overflow-hidden rounded-2xl bg-surface bg-dots lg:min-h-[340px]">
          {scattered.map((x) => (
            <span
              key={x.t}
              className={cx(
                "absolute whitespace-nowrap rounded-xl border border-dashed border-line-strong bg-white px-3.5 py-2 text-[13px] font-semibold text-muted shadow-sm",
                x.c,
              )}
            >
              {x.t}
            </span>
          ))}
        </div>
      </Reveal>

      <Reveal delay={120} className="flex flex-col rounded-[24px] bg-primary p-6 text-white lg:p-8">
        <h3 className="text-lg font-bold lg:text-xl">With GetHyre.ai</h3>
        <p className="mt-1.5 text-[15px] text-sky">One journey. Each step feeds the next, so nothing you do is wasted.</p>
        <ol className="relative mt-6 flex flex-col gap-2.5">
          <span className="absolute bottom-6 left-[19px] top-6 w-0.5 overflow-hidden bg-white/20" aria-hidden>
            <span className="absolute left-0 h-16 w-full animate-[gh-scan_3s_linear_infinite] bg-gradient-to-b from-white/0 via-white to-white/0" />
          </span>
          {thread.map((x, i) => (
            <li key={x.t} className="relative flex items-center gap-4 rounded-2xl bg-white/10 px-3 py-2.5 backdrop-blur-sm">
              <span className="relative z-10 flex size-[30px] shrink-0 items-center justify-center rounded-full bg-white text-[13px] font-extrabold text-primary">
                {i + 1}
              </span>
              <span className="flex flex-col">
                <span className="text-[15px] font-bold">{x.t}</span>
                <span className="text-[13px] text-sky">{x.s}</span>
              </span>
            </li>
          ))}
        </ol>
      </Reveal>
    </div>
  );
}

/* ---------- Product facts band ---------- */

const facts = [
  { n: 7, suffix: "", label: "steps from profile to matched jobs" },
  { n: 10, suffix: " min", label: "AI mock interview with follow-ups" },
  { n: 100, suffix: "", label: "point readiness score, updated as you train" },
  { n: 3, suffix: "", label: "clear checks before you're job-ready" },
];

export function FactsBand() {
  return (
    <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-[24px] border border-line bg-line lg:grid-cols-4">
      {facts.map((f) => (
        <li key={f.label} className="flex flex-col gap-1.5 bg-white p-5 lg:p-7">
          <CountUp to={f.n} suffix={f.suffix} className="text-[36px] font-extrabold tracking-[-0.03em] text-primary lg:text-[48px]" />
          <span className="text-[14px] leading-snug text-body lg:text-[15px]">{f.label}</span>
        </li>
      ))}
    </ul>
  );
}

/* ---------- What makes it different ---------- */

export function Differences() {
  return (
    <ul className="mt-8 grid gap-4 lg:mt-12 lg:grid-cols-3 lg:gap-6">
      <Reveal as="li" className="flex flex-col gap-4 rounded-[24px] border border-line bg-white p-6 lg:p-7">
        <div className="flex flex-col gap-3 rounded-2xl bg-surface p-4">
          <Compare label="Keyword match" value={41} tone="bg-line-strong" />
          <Compare label="GetHyre skill match" value={92} tone="bg-success" strong />
          <p className="text-xs text-muted">Example: the same student and the same job</p>
        </div>
        <h3 className="text-lg font-bold lg:text-xl">Matched by skills, not keywords</h3>
        <p className="text-[15px] leading-relaxed text-body">
          Jobs are ranked by what you proved in your assessment and interview, so you apply where you&apos;ll actually fit.
        </p>
      </Reveal>

      <Reveal as="li" delay={100} className="flex flex-col gap-4 rounded-[24px] border border-line bg-white p-6 lg:p-7">
        <div className="flex items-end justify-between gap-3 rounded-2xl bg-surface p-4">
          <ScorePill label="Week 1" value={42} />
          <span className="mb-4 h-px flex-1 border-t-2 border-dashed border-primary/40" aria-hidden />
          <ScorePill label="Week 7" value={81} strong />
        </div>
        <h3 className="text-lg font-bold lg:text-xl">Progress you can prove</h3>
        <p className="text-[15px] leading-relaxed text-body">
          Your readiness score rises as you close gaps. Retake the assessment and show recruiters exactly how far you&apos;ve come.
        </p>
      </Reveal>

      <Reveal as="li" delay={200} className="flex flex-col gap-4 rounded-[24px] border border-line bg-white p-6 lg:p-7">
        <ul className="flex flex-col gap-2 rounded-2xl bg-surface p-4">
          {["Readiness 70 or more", "No high gaps left", "ATS-ready CV"].map((c) => (
            <li key={c} className="flex items-center gap-2.5 text-[13px] font-semibold">
              <span className="flex size-5 items-center justify-center rounded-full bg-success text-white">
                <CheckIcon size={12} />
              </span>
              {c}
            </li>
          ))}
        </ul>
        <h3 className="text-lg font-bold lg:text-xl">You know when you&apos;re ready</h3>
        <p className="text-[15px] leading-relaxed text-body">
          No guessing. Three checks turn green as you train, and matched jobs unlock the moment you pass.
        </p>
      </Reveal>
    </ul>
  );
}

function Compare({ label, value, tone, strong }: { label: string; value: number; tone: string; strong?: boolean }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="flex justify-between text-[13px]">
        <span className={strong ? "font-bold text-ink" : "text-muted"}>{label}</span>
        <span className={strong ? "font-extrabold text-success-strong" : "font-semibold text-muted"}>{value}%</span>
      </span>
      <span className="block h-2.5 overflow-hidden rounded-full bg-white">
        <span className={cx("animate-bar block h-full rounded-full", tone)} style={{ width: `${value}%` }} />
      </span>
    </div>
  );
}

function ScorePill({ label, value, strong }: { label: string; value: number; strong?: boolean }) {
  return (
    <span className="flex flex-col items-center gap-1">
      <span
        className={cx(
          "flex size-16 items-center justify-center rounded-full text-xl font-extrabold",
          strong ? "bg-primary text-white" : "border-2 border-line-strong bg-white text-muted",
        )}
      >
        {strong ? <CountUp from={42} to={value} /> : value}
      </span>
      <span className="text-xs text-muted">{label}</span>
    </span>
  );
}

/* ---------- Built for three ---------- */

export function BuiltForThree() {
  return (
    <ul className="mt-8 grid gap-4 md:grid-cols-3 lg:mt-12 lg:gap-6">
      <Reveal as="li" className="flex flex-col overflow-hidden rounded-[24px] bg-primary text-white">
        <Photo name="studentLaptop" className="h-[220px] rounded-none" sizes="(min-width: 768px) 33vw, 100vw" position="50% 35%">
          <OverlayChip>
            <span className="text-muted">Readiness</span> <b className="text-ink">81</b>
            <span className="ml-1.5 rounded-full bg-success-tint px-2 py-0.5 text-[11px] font-bold text-success-strong">Job-ready</span>
          </OverlayChip>
        </Photo>
        <Card3
          kicker="Students"
          title="See your real gaps, follow one roadmap, get matched to jobs that fit."
          link="Get early access"
          href="/early-access"
          light
        />
      </Reveal>
      <Reveal as="li" delay={100} className="flex flex-col overflow-hidden rounded-[24px] border border-line bg-white">
        <Photo name="campusWalk" className="h-[220px] rounded-none" sizes="(min-width: 768px) 33vw, 100vw">
          <OverlayChip>
            <span className="text-muted">Batch readiness</span> <b className="text-ink">68</b>
            <span className="ml-1.5 text-[11px] font-bold text-success-strong">▲ 14 this term</span>
          </OverlayChip>
        </Photo>
        <Card3
          kicker="Colleges"
          title="A placement-readiness partner with batch-level progress you can report on."
          link="Partner with us"
          href="/colleges"
        />
      </Reveal>
      <Reveal as="li" delay={200} className="flex flex-col overflow-hidden rounded-[24px] border border-line bg-white">
        <Photo name="hiringTeam" className="h-[220px] rounded-none" sizes="(min-width: 768px) 33vw, 100vw">
          <OverlayChip>
            <span className="text-muted">Shortlist</span> <b className="text-ink">12 assessed</b>
            <span className="ml-1.5 rounded-full bg-tint px-2 py-0.5 text-[11px] font-bold text-primary-strong">92% match</span>
          </OverlayChip>
        </Photo>
        <Card3
          kicker="Companies"
          title="Shortlist freshers who are already assessed and interview-practised."
          link="Register hiring interest"
          href="/companies"
        />
      </Reveal>
    </ul>
  );
}

function OverlayChip({ children }: { children: ReactNode }) {
  return (
    <span className="absolute bottom-3 left-3 right-3 flex w-fit max-w-[calc(100%-24px)] items-center gap-1 rounded-xl bg-white/95 px-3 py-2 text-[13px] shadow-sm backdrop-blur">
      {children}
    </span>
  );
}

/* ---------- From campus to career (photo mosaic) ---------- */

export function CampusToCareer() {
  return (
    <div className="mt-8 grid grid-cols-2 gap-3 lg:mt-12 lg:grid-cols-4 lg:grid-rows-[260px_260px] lg:gap-5">
      <Reveal className="col-span-2 lg:row-span-2">
        <Photo name="studentOutdoor" className="aspect-[4/3] lg:aspect-auto lg:h-full" sizes="(min-width: 1024px) 50vw, 100vw">
          <div className="animate-float absolute bottom-4 left-4 flex items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-[0_14px_36px_rgb(10_22_51/0.18)] backdrop-blur">
            <span className="flex size-11 items-center justify-center rounded-full bg-primary text-base font-extrabold text-white">81</span>
            <span className="flex flex-col">
              <span className="text-xs font-semibold text-muted">Readiness, week 7</span>
              <span className="text-sm font-bold text-ink">Job-ready: all 3 checks passed</span>
            </span>
          </div>
        </Photo>
      </Reveal>
      <Reveal delay={100}>
        <Photo name="studyGroup" className="aspect-square lg:aspect-auto lg:h-full" sizes="(min-width: 1024px) 25vw, 50vw">
          <MosaicChip>Roadmap · Month 2</MosaicChip>
        </Photo>
      </Reveal>
      <Reveal delay={200} className="lg:row-span-2">
        <Photo name="youngProfessional" className="aspect-square lg:aspect-auto lg:h-full" sizes="(min-width: 1024px) 25vw, 50vw" position="50% 30%">
          <MosaicChip>Matched: UX designer · 92%</MosaicChip>
        </Photo>
      </Reveal>
      <Reveal delay={150} className="col-span-2 lg:col-span-1">
        <Photo name="graduate" className="aspect-[2/1] lg:aspect-auto lg:h-full" sizes="(min-width: 1024px) 25vw, 100vw" position="50% 25%">
          <MosaicChip>Final year, placement-ready</MosaicChip>
        </Photo>
      </Reveal>
    </div>
  );
}

function MosaicChip({ children }: { children: ReactNode }) {
  return (
    <span className="absolute bottom-3 left-3 rounded-full bg-white/95 px-3 py-1.5 text-[12px] font-bold text-ink shadow-sm backdrop-blur lg:text-[13px]">
      {children}
    </span>
  );
}

function Card3({ kicker, title, link, href, light }: { kicker: string; title: string; link: string; href: string; light?: boolean }) {
  return (
    <div className="flex flex-1 flex-col gap-3 p-6 lg:p-7">
      <span className={cx("text-sm font-bold", light ? "text-sky" : "text-primary")}>{kicker}</span>
      <p className={cx("text-lg font-bold leading-snug lg:text-xl", light ? "text-white" : "text-ink")}>{title}</p>
      <Link
        href={href}
        className={cx("mt-auto pt-3 text-[15px] font-bold underline-offset-4 hover:underline", light ? "text-white" : "text-primary-strong")}
      >
        {link} <span aria-hidden>→</span>
      </Link>
    </div>
  );
}
