"use client";

import { useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";
import { PhoneMockup } from "@/components/marketing/phone-mockup";
import { cx } from "@/components/ui";
import { journey, phaseNotes, type Phase } from "@/content/journey";
import { track } from "@/lib/track";

const phases: Phase[] = ["Diagnose", "Train", "Place"];

/**
 * Desktop: the seven steps as a list, with the phone pinned beside them.
 * Mobile: Diagnose / Train / Place tabs, a swipeable phone and one step card.
 */
export function JourneyStepper() {
  const [active, setActive] = useState(1);
  const touchX = useRef<number | null>(null);
  const current = journey.find((s) => s.n === active) ?? journey[0];

  const go = (n: number) => {
    const next = Math.min(journey.length, Math.max(1, n));
    setActive(next);
    track("journey_step_view", { step: next });
  };

  return (
    <div className="mt-8 grid gap-10 lg:mt-12 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-16">
      {/* Desktop list */}
      <ol className="hidden flex-col gap-2 lg:flex" aria-label="Journey steps">
        {journey.map((step, i) => {
          const showPhase = i === 0 || journey[i - 1].phase !== step.phase;
          const on = step.n === active;
          return (
            <li key={step.n}>
              {showPhase ? (
                <div className={cx("flex items-baseline justify-between px-1 pb-1.5", i === 0 ? "" : "pt-4")}>
                  <span className="text-[13px] font-bold uppercase tracking-[0.1em] text-muted">{step.phase}</span>
                  <span className="text-[13px] text-muted">{phaseNotes[step.phase]}</span>
                </div>
              ) : null}
              <button
                type="button"
                onClick={() => go(step.n)}
                aria-pressed={on}
                className={cx(
                  "flex w-full items-start gap-4 rounded-lg border px-[18px] py-4 text-left transition-colors",
                  on ? "border-primary bg-tint" : "border-line bg-white hover:border-line-strong",
                )}
              >
                <StepNumber n={step.n} on={on} />
                <span className="flex flex-col gap-1">
                  <span className="text-[17px] font-bold text-ink">{step.title}</span>
                  <span className="text-[15px] leading-normal text-body">{step.description}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      {/* Mobile phase tabs */}
      <div className="flex gap-1.5 rounded-lg bg-surface p-1 lg:hidden" role="tablist" aria-label="Phases">
        {phases.map((phase) => {
          const on = current.phase === phase;
          return (
            <button
              key={phase}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => go(journey.find((s) => s.phase === phase)!.n)}
              className={cx(
                "flex-1 rounded-[9px] py-2.5 text-sm",
                on ? "bg-white font-bold text-ink shadow-sm" : "font-medium text-muted",
              )}
            >
              {phase}
            </button>
          );
        })}
      </div>

      {/* Phone (sticky on desktop, swipeable on mobile) */}
      <div className="flex flex-col items-center gap-4 lg:sticky lg:top-28 lg:self-start">
        <div
          className="touch-pan-y"
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 40) go(active + (dx < 0 ? 1 : -1));
            touchX.current = null;
          }}
        >
          <div className="lg:hidden">
            <PhoneMockup key={current.screen} src={current.screen} alt={current.alt} width={250} />
          </div>
          <div className="hidden lg:block">
            <PhoneMockup key={current.screen} src={current.screen} alt={current.alt} width={300} />
          </div>
        </div>
        <p className="hidden text-sm text-muted lg:block" aria-live="polite">
          Step {current.n} of {journey.length} · {current.title} · Preview
        </p>
      </div>

      {/* Mobile step card and controls */}
      <div className="flex flex-col gap-4 lg:hidden">
        <div className="flex items-start gap-4 rounded-lg border border-primary bg-tint px-[18px] py-4" aria-live="polite">
          <StepNumber n={current.n} on />
          <span className="flex flex-col gap-1">
            <span className="text-[17px] font-bold text-ink">{current.title}</span>
            <span className="text-[15px] leading-normal text-body">{current.description}</span>
          </span>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => go(active - 1)}
            disabled={active === 1}
            aria-label="Previous step"
            className="inline-flex size-11 items-center justify-center rounded-full border border-line bg-white disabled:opacity-40"
          >
            <ChevronLeftIcon size={20} />
          </button>
          <div className="flex items-center gap-1.5" aria-hidden>
            {journey.map((s) => (
              <span
                key={s.n}
                className={cx("h-2 rounded-full transition-all", s.n === active ? "w-5 bg-primary" : "w-2 bg-line-strong")}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => go(active + 1)}
            disabled={active === journey.length}
            aria-label="Next step"
            className="inline-flex size-11 items-center justify-center rounded-full border border-line bg-white disabled:opacity-40"
          >
            <ChevronRightIcon size={20} />
          </button>
        </div>
        <p className="text-center text-[13px] text-muted">
          Step {current.n} of {journey.length} · swipe for the next step
        </p>
      </div>
    </div>
  );
}

function StepNumber({ n, on }: { n: number; on: boolean }) {
  return (
    <span
      className={cx(
        "flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold",
        on ? "bg-primary text-white" : "bg-surface text-ink",
      )}
    >
      {n}
    </span>
  );
}
