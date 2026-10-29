"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { CheckIcon } from "@/components/icons";
import { useInView, useReducedMotion } from "@/components/motion";
import { Gauge } from "@/components/product/live-demos";
import { cx } from "@/components/ui";
import { journey } from "@/content/journey";

/** Readiness shown in the floating card at each journey step (illustrative student). */
const readinessAt = [0, 0, 0, 75, 78, 84, 84];

/** Where each journey step starts in /video/hero-flow.mp4 (seconds), and the loop length. */
const STEP_AT = [0, 4.6, 7.25, 11.85, 17.15, 23.95, 27.35];
const LOOP_S = 32.5;
/** A representative moment inside each step, used when a step is picked or motion is reduced. */
const STEP_HOLD = [3.6, 6.4, 10.2, 15.6, 21.5, 26.2, 31.2];

function stepAt(t: number) {
  let i = 0;
  while (i + 1 < STEP_AT.length && t >= STEP_AT[i + 1]) i++;
  return i;
}

/**
 * The home hero's centrepiece: a looping, muted screen recording of the working app that runs
 * through the seven-step journey on one phone. The step rail and floating cards follow the video.
 */
export function HeroEngine() {
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref);
  const reduced = useReducedMotion();
  const running = inView && !paused && !reduced;

  // Play only while visible, not hovered and motion is allowed.
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (running) v.play().catch(() => {});
    else v.pause();
  }, [running]);

  // Reduced motion: show a still frame of the chosen step instead of playing.
  useEffect(() => {
    const v = video.current;
    if (v && reduced) v.currentTime = STEP_HOLD[step];
  }, [reduced, step]);

  // Keep the step rail in sync with the video.
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const v = video.current;
      if (v) {
        const t = v.currentTime % LOOP_S;
        const i = stepAt(t);
        setStep((s) => (s === i ? s : i));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);


  const current = journey[step];
  const score = readinessAt[step];
  const gapsClosed = step >= 5;

  return (
    <div
      ref={ref}
      className="relative mx-auto w-full max-w-[600px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="relative flex justify-center overflow-hidden rounded-[12px] bg-sky pt-8 sm:pt-10 lg:h-[620px] lg:items-center lg:overflow-visible lg:rounded-none lg:bg-transparent lg:pt-0">
        {/* Backdrop panel */}
        <div className="absolute inset-y-6 left-10 right-10 hidden rounded-[12px] border border-sky bg-[linear-gradient(180deg,#eff6ff,#dbeafe)] lg:block" aria-hidden />
        <div className="bg-grid absolute inset-y-6 left-10 right-10 hidden rounded-[12px] opacity-60 lg:block" aria-hidden />

        {/* Phone playing the working prototype */}
        <div className="relative -mb-36 sm:-mb-44 lg:mb-0">
          <div className="w-[236px] rounded-[36px] bg-ink p-[9px] shadow-[0_30px_70px_rgb(10_22_51/0.28)] sm:w-[270px] lg:w-[292px] lg:rounded-[44px] lg:p-[12px]">
            <div className="relative aspect-[360/800] overflow-hidden rounded-[28px] bg-surface lg:rounded-[33px]">
              <video
                ref={video}
                className="absolute inset-0 h-full w-full object-cover"
                src="/video/hero-flow.mp4"
                poster="/video/hero-flow-poster.webp"
                autoPlay={!reduced}
                muted
                loop
                playsInline
                preload="auto"
                disablePictureInPicture
                aria-label={`GetHyre.ai app demo. Step ${current.n} of ${journey.length}: ${current.title}. ${current.description}`}
              />
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
              <span className="mt-1 inline-block rounded-md bg-danger-tint px-2 py-0.5 text-[11px] font-bold text-danger">High priority</span>
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

    </div>
  );
}

function FloatCard({ className, children, delay }: { className: string; children: ReactNode; delay: number }) {
  return (
    <div
      className={cx(
        "absolute z-10 rounded-[10px] border border-line bg-white/95 px-3.5 py-3 text-ink shadow-[0_14px_36px_rgb(10_22_51/0.14)] backdrop-blur",
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
    <div className="animate-pop flex w-[240px] items-start gap-3 rounded-[10px] border border-line bg-white px-3.5 py-3 shadow-[0_14px_36px_rgb(10_22_51/0.14)]">
      <span className={cx("mt-1 size-2.5 shrink-0 rounded-full", dot)} />
      <span className="flex flex-col">
        <span className="text-[13px] font-bold text-ink">{title}</span>
        <span className="text-xs text-muted">{body}</span>
      </span>
    </div>
  );
}
