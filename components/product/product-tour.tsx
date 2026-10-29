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

/** Tabbed product tour on a dark panel. Auto-advances until the visitor picks a tab. */
export function ProductTour() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const reduced = useReducedMotion();
  const running = auto && inView && !reduced;

  useEffect(() => {
    if (!running) return;
    const t = window.setTimeout(() => setActive((a) => (a + 1) % items.length), TOUR_MS);
    return () => window.clearTimeout(t);
  }, [running, active]);

  // Keep the active tab visible in the scrollable tab row on phones.
  useEffect(() => {
    const row = tabsRef.current;
    const tab = row?.children[active] as HTMLElement | undefined;
    if (!row || !tab) return;
    row.scrollTo({ left: tab.offsetLeft - 20, behavior: reduced ? "auto" : "smooth" });
  }, [active, reduced]);

  const m = items[active];

  return (
    <div ref={ref} className="mt-8 lg:mt-12">
      <div
        ref={tabsRef}
        role="tablist"
        aria-label="Product tour"
        className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] lg:mx-0 lg:grid lg:grid-cols-6 lg:overflow-visible lg:px-0"
      >
        {items.map((it, i) => {
          const on = i === active;
          return (
            <button
              key={it.id}
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
              className={cx(
                "relative shrink-0 overflow-hidden rounded-lg border px-4 py-3 text-left transition-colors",
                on ? "border-primary bg-primary/15 text-white" : "border-night-line text-subtle hover:border-sky/40 hover:text-sky",
              )}
            >
              <span className="block text-[11px] font-semibold opacity-70">{it.phase}</span>
              <span className="block whitespace-nowrap text-sm font-bold">{it.tab}</span>
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-night-line">
                {on ? (
                  <span
                    key={`${active}-${running}`}
                    className={cx("block h-full origin-left bg-sky", running ? "animate-[gh-bar_7s_linear_both]" : "")}
                  />
                ) : null}
              </span>
            </button>
          );
        })}
      </div>

      <div
        id="tour-panel"
        role="tabpanel"
        aria-labelledby={`tour-tab-${m.id}`}
        className="mt-6 grid items-center gap-8 lg:mt-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,560px)] lg:gap-14"
      >
        <div key={m.id} className="animate-fade flex flex-col gap-4">
          <h3 className="text-[26px] font-extrabold leading-tight tracking-[-0.02em] text-white lg:text-[34px]">{m.title}</h3>
          <p className="text-base leading-relaxed text-[#b6c4e0] lg:text-lg">{m.summary}</p>
          <ul className="mt-1 flex flex-col gap-2.5">
            {m.youDo.map((x) => (
              <li key={x} className="flex items-start gap-3 text-[15px] text-[#dbe5f7]">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                  <CheckIcon size={12} />
                </span>
                {x}
              </li>
            ))}
          </ul>
          <Link
            href={`/product#${m.id}`}
            className="mt-2 inline-flex w-fit items-center gap-1.5 text-[15px] font-bold text-sky underline-offset-4 hover:underline"
          >
            How {m.tab.toLowerCase()} works
            <span aria-hidden>→</span>
          </Link>
        </div>
        <div key={`demo-${m.id}`} className="animate-pop">
          <Demo name={m.demo} />
        </div>
      </div>
    </div>
  );
}
