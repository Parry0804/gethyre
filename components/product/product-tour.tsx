"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CheckIcon } from "@/components/icons";
import { useInView, useReducedMotion } from "@/components/motion";
import { Demo } from "@/components/product/live-demos";
import { cx } from "@/components/ui";
import { modules, tourIds } from "@/content/product";
import { track } from "@/lib/track";

const TOUR_MS = 7000;
const items = tourIds.map((id) => modules.find((m) => m.id === id)!);

/**
 * Product tour on a dark panel: a numbered step list on the left, the live demo on the right.
 * Auto-advances until the visitor picks a step. On phones the demo sits under the open step.
 */
export function ProductTour() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const reduced = useReducedMotion();
  const running = auto && inView && !reduced;

  useEffect(() => {
    if (!running) return;
    const t = window.setTimeout(() => setActive((a) => (a + 1) % items.length), TOUR_MS);
    return () => window.clearTimeout(t);
  }, [running, active]);

  const m = items[active];

  return (
    <div ref={ref} className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-[minmax(0,440px)_minmax(0,1fr)] lg:gap-16">
      <ol role="tablist" aria-label="Product tour" aria-orientation="vertical" className="flex flex-col border-t border-night-line">
        {items.map((it, i) => {
          const on = i === active;
          return (
            <li key={it.id} className="border-b border-night-line">
              <button
                type="button"
                role="tab"
                id={`tour-tab-${it.id}`}
                aria-selected={on}
                aria-controls="tour-panel"
                onClick={() => {
                  setActive(i);
                  setAuto(false);
                  track("tour_tab", { tab: it.id });
                }}
                className="group relative flex w-full items-baseline gap-5 py-5 text-left"
              >
                {/* Progress line on the left edge of the open step */}
                <span className="absolute -left-px bottom-0 top-0 w-0.5 bg-transparent" aria-hidden>
                  {on ? (
                    <span
                      key={`${active}-${running}`}
                      className={cx(
                        "block h-full w-full origin-top bg-sky",
                        running ? "animate-[gh-bar-y_7s_linear_both]" : "",
                      )}
                    />
                  ) : null}
                </span>
                <span
                  className={cx(
                    "w-8 shrink-0 pl-4 text-sm font-bold tabular-nums transition-colors",
                    on ? "text-sky" : "text-[#6b7da6] group-hover:text-[#b6c4e0]",
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex min-w-0 flex-1 flex-col gap-1 pl-3">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6b7da6]">{it.phase}</span>
                  <span
                    className={cx(
                      "text-lg font-bold leading-snug transition-colors lg:text-xl",
                      on ? "text-white" : "text-[#b6c4e0] group-hover:text-white",
                    )}
                  >
                    {it.title}
                  </span>
                </span>
              </button>

              {on ? (
                <div className="animate-fade flex flex-col gap-4 pb-6 pl-[60px] pr-2">
                  <p className="text-[15px] leading-relaxed text-[#b6c4e0]">{it.summary}</p>
                  <ul className="flex flex-col gap-2">
                    {it.youDo.map((x) => (
                      <li key={x} className="flex items-start gap-2.5 text-[14px] text-[#dbe5f7]">
                        <span className="mt-0.5 flex size-[18px] shrink-0 items-center justify-center rounded-[4px] bg-primary text-white">
                          <CheckIcon size={11} />
                        </span>
                        {x}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/product#${it.id}`}
                    className="inline-flex w-fit items-center gap-1.5 text-[14px] font-bold text-sky underline-offset-4 hover:underline"
                  >
                    How {it.tab.toLowerCase()} works
                    <span aria-hidden>→</span>
                  </Link>
                  {/* Phones: the demo sits under the open step */}
                  <div className="mt-2 lg:hidden">
                    <Demo name={it.demo} />
                  </div>
                </div>
              ) : null}
            </li>
          );
        })}
      </ol>

      <div
        id="tour-panel"
        role="tabpanel"
        aria-labelledby={`tour-tab-${m.id}`}
        className="relative hidden lg:block"
      >
        <div className="sticky top-28 flex min-h-[560px] items-center justify-center rounded-[12px] border border-night-line bg-night-2 p-10">
          <div className="absolute left-5 top-4 flex items-center gap-2 text-[12px] font-semibold text-[#6b7da6]">
            <span className="size-1.5 rounded-full bg-sky" />
            Live preview · {m.tab}
          </div>
          <div key={`demo-${m.id}`} className="animate-pop w-full max-w-[600px]">
            <Demo name={m.demo} />
          </div>
        </div>
      </div>
    </div>
  );
}
