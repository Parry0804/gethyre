"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { CheckIcon } from "@/components/icons";
import { useInView, useReducedMotion } from "@/components/motion";
import { Gauge } from "@/components/product/live-demos";
import { cx } from "@/components/ui";
import { journey } from "@/content/journey";

/** Readiness shown in the floating card at each journey step (illustrative student). */
const readinessAt = [0, 0, 0, 75, 78, 86, 86];
const STEP_MS = 2800;

/**
 * The home hero's centrepiece: the real app screens play through the seven-step journey,
 * while floating cards show the readiness score, gaps and job matches change with each step.
 */
export function HeroEngine() {
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const reduced = useReducedMotion();
  const running = inView && !paused && !reduced;

  useEffect(() => {
    if (!running) return;
    const t = window.setTimeout(() => setStep((s) => (s + 1) % journey.length), STEP_MS);
    return () => window.clearTimeout(t);
  }, [running, step]);

  const current = journey[step];
  const score = readinessAt[step];
  const gapsClosed = step >= 5;

  return (
    <div
      ref={ref}
      className="relative mx-auto w-full max-w-[560px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="relative flex justify-center overflow-hidden rounded-[28px] bg-sky pt-8 sm:pt-10 lg:h-[620px] lg:items-center lg:overflow-visible lg:rounded-none lg:bg-transparent lg:pt-0">
        {/* Halo */}
        <div className="absolute left-1/2 top-1/2 hidden size-[540px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_50%_45%,#dbeafe_0%,#dbeafe_55%,rgb(219_234_254/0)_72%)] lg:block" aria-hidden />
        <div className="absolute left-1/2 top-1/2 hidden size-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-primary/25 lg:block lg:animate-[gh-spin_60s_linear_infinite]" aria-hidden />

        {/* Phone with the real screens cross-fading */}
        <div className="relative -mb-36 sm:-mb-44 lg:mb-0">
          <div className="w-[236px] rounded-[36px] bg-ink p-[9px] shadow-[0_30px_70px_rgb(10_22_51/0.28)] sm:w-[270px] lg:w-[292px] lg:rounded-[44px] lg:p-[12px]">
            <div className="relative aspect-[390/844] overflow-hidden rounded-[28px] bg-surface lg:rounded-[33px]">
              {journey.map((s, i) => (
                <Image
                  key={s.screen}
                  src={s.screen}
                  alt={i === step ? s.alt : ""}
                  aria-hidden={i !== step}
                  width={780}
                  height={1688}
                  priority={i === 0}
                  sizes="292px"
                  className={cx(
                    "absolute inset-0 h-full w-full object-cover transition-all duration-700",
                    i === step ? "scale-100 opacity-100" : "scale-[1.03] opacity-0",
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Readiness */}
        <FloatCard className="bottom-6 left-3 sm:left-4 lg:-left-6 lg:bottom-auto lg:top-[120px]" delay={0}>
          <div className="flex items-center gap-3">
            <Gauge value={score} size={58} display={score === 0 ? "–" : undefined} />
            <div className="flex flex-col">
              <span className="text-[11px] font-semibold text-muted">Readiness</span>
              <span className="text-[13px] font-bold">
                {score === 0 ? "Assessing…" : score >= 80 ? "Job-ready" : "Nearly there"}
              </span>
            </div>
          </div>
        </FloatCard>

        {/* Biggest gap */}
        <FloatCard className="hidden sm:block sm:right-4 sm:top-24 lg:-right-4 lg:top-auto lg:bottom-[150px]" delay={1}>
          <span className="block text-[11px] font-semibold text-muted">{gapsClosed ? "High gaps" : "Biggest gap"}</span>
          {gapsClosed ? (
            <span className="mt-0.5 flex items-center gap-1.5 text-sm font-bold text-success-strong">
              <span className="flex size-5 items-center justify-center rounded-full bg-success text-white">
                <CheckIcon size={12} />
              </span>
              All closed
            </span>
          ) : (
            <>
              <span className="block text-sm font-bold">Design systems</span>
              <span className="mt-1 inline-block rounded-full bg-danger-tint px-2 py-0.5 text-[11px] font-bold text-danger">High priority</span>
            </>
          )}
        </FloatCard>

        {/* Event toast */}
        <div className="absolute right-4 top-[54%] hidden lg:-right-10 lg:top-[96px] lg:block">
          {step === 2 ? (
            <Toast key="iv" tone="primary" title="AI interview in progress" body="Follow-up: how did you measure it?" />
          ) : step === 6 ? (
            <Toast key="jobs" tone="success" title="12 jobs match your skills" body="Top match: Product designer · 92%" />
          ) : step === 4 ? (
            <Toast key="plan" tone="ink" title="Roadmap updated" body="Month 1: design systems" />
          ) : null}
        </div>
      </div>

      {/* Step rail */}
      <div className="relative z-10 mt-5 flex flex-col gap-2.5 lg:mt-0">
        <ol className="flex gap-1.5" aria-label="Journey steps">
          {journey.map((s, i) => (
            <li key={s.n} className="flex-1">
              <button
                type="button"
                onClick={() => setStep(i)}
                aria-label={`Step ${s.n}: ${s.title}`}
                aria-current={i === step ? "step" : undefined}
                className="group block w-full py-2"
              >
                <span className="block h-1.5 overflow-hidden rounded-full bg-line">
                  <span
                    key={i === step ? `on-${step}` : "off"}
                    className={cx(
                      "block h-full rounded-full",
                      i < step ? "w-full bg-primary" : i === step ? "w-full bg-primary" : "w-0",
                      i === step && running ? "animate-[gh-bar_2.8s_linear_both] origin-left" : "",
                    )}
                  />
                </span>
              </button>
            </li>
          ))}
        </ol>
        <p className="flex items-center justify-between text-[13px]" aria-live="polite">
          <span className="font-semibold text-ink">
            <span className="text-primary">{current.phase}</span> · {current.title}
          </span>
          <span className="text-muted">
            {current.n}/{journey.length}
          </span>
        </p>
      </div>
    </div>
  );
}

function FloatCard({ className, children, delay }: { className: string; children: ReactNode; delay: number }) {
  return (
    <div
      className={cx(
        "absolute z-10 rounded-2xl border border-line bg-white/95 px-3.5 py-3 text-ink shadow-[0_14px_36px_rgb(10_22_51/0.14)] backdrop-blur",
        className,
      )}
    >
      <div className="animate-float" style={{ animationDelay: `${delay * -2}s` }}>
        {children}
      </div>
    </div>
  );
}

function Toast({ title, body, tone }: { title: string; body: string; tone: "primary" | "success" | "ink" }) {
  const dot = { primary: "bg-primary", success: "bg-success", ink: "bg-ink" }[tone];
  return (
    <div className="animate-pop flex w-[240px] items-start gap-3 rounded-2xl border border-line bg-white px-3.5 py-3 shadow-[0_14px_36px_rgb(10_22_51/0.14)]">
      <span className={cx("mt-1 size-2.5 shrink-0 rounded-full", dot)} />
      <span className="flex flex-col">
        <span className="text-[13px] font-bold text-ink">{title}</span>
        <span className="text-xs text-muted">{body}</span>
      </span>
    </div>
  );
}
