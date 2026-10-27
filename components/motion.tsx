"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties, type ReactNode, type RefObject } from "react";
import { cx } from "@/components/ui";

/* ---------- Hooks ---------- */

function subscribeReducedMotion(cb: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

/** True when the visitor asked the OS for less motion. */
export function useReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

/** Whether the element is on screen. With `once`, stays true after the first time. */
export function useInView<T extends Element>(ref: RefObject<T | null>, { once = false, margin = "0px 0px -10% 0px" } = {}) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin: margin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, once, margin]);
  return inView;
}

/**
 * Steps through `count` states every `ms` while `running`.
 * Used by the live product demos so each one loops only while it's on screen.
 */
export function useLoop(count: number, ms: number, running: boolean) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!running) return;
    const t = window.setInterval(() => setI((n) => (n + 1) % count), ms);
    return () => window.clearInterval(t);
  }, [count, ms, running]);
  return i;
}

/* ---------- Components ---------- */

/** Fades and lifts its children in the first time they scroll into view. */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "section";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true });
  const [passed, setPassed] = useState(false);

  // A fast scroll or an anchor jump can skip right past an element without the observer firing,
  // so also reveal anything that's already above the bottom of the screen.
  useEffect(() => {
    if (seen || passed) return;
    let raf = 0;
    const check = () => {
      raf = 0;
      const el = ref.current;
      if (el && el.getBoundingClientRect().top < window.innerHeight) setPassed(true);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [seen, passed]);

  const inView = seen || passed;
  return (
    <Tag
      ref={ref as never}
      className={cx("reveal", inView && "is-in", className)}
      style={delay ? ({ "--delay": `${delay}ms` } as CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}

/** Counts from `from` to `to` once on screen. Shows the final number straight away for reduced motion. */
export function CountUp({
  to,
  from = 0,
  duration = 1400,
  suffix = "",
  className,
}: {
  to: number;
  from?: number;
  duration?: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduced = useReducedMotion();
  const [value, setValue] = useState(from);

  useEffect(() => {
    if (!inView || reduced) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(from + (to - from) * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, from, to, duration]);

  return (
    <span ref={ref} className={cx("tabular-nums", className)}>
      {reduced ? to : value}
      {suffix}
    </span>
  );
}

/** An endlessly scrolling row. Children are rendered twice so the loop is seamless. */
export function Marquee({
  children,
  duration = 40,
  className,
  label,
}: {
  children: ReactNode;
  duration?: number;
  className?: string;
  label: string;
}) {
  return (
    <div className={cx("marquee-mask overflow-hidden", className)} aria-label={label} role="region">
      <div
        className="animate-marquee flex w-max hover:[animation-play-state:paused]"
        style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
      >
        <div className="flex shrink-0 items-center gap-3 pr-3">{children}</div>
        <div className="flex shrink-0 items-center gap-3 pr-3" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
