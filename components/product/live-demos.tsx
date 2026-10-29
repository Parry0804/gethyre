"use client";

/**
 * Live, looping mock-ups of each part of the GetHyre.ai app, built in code so they animate.
 * Each demo only runs while it's on screen, and shows a finished still for reduced motion.
 * The student, scores and jobs shown are an illustrative example, not real data.
 */

import { useRef, type ReactNode } from "react";
import { CheckIcon } from "@/components/icons";
import { useInView, useLoop, useReducedMotion } from "@/components/motion";
import { cx } from "@/components/ui";

/* ---------- Shared frame ---------- */

export function AppWindow({
  title,
  meta,
  children,
  className,
  dark,
}: {
  title: string;
  meta?: ReactNode;
  children: ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <div
      className={cx(
        "overflow-hidden rounded-[10px] border shadow-[0_24px_60px_rgb(10_22_51/0.18)]",
        dark ? "border-night-line bg-night-2 text-white" : "border-line bg-white text-ink",
        className,
      )}
    >
      <div
        className={cx(
          "flex items-center justify-between gap-3 border-b px-4 py-3",
          dark ? "border-night-line" : "border-line",
        )}
      >
        <div className="flex items-center gap-2.5">
          <span className="flex gap-1.5" aria-hidden>
            <span className="size-2.5 rounded-full bg-[#f87171]" />
            <span className="size-2.5 rounded-full bg-[#fbbf24]" />
            <span className="size-2.5 rounded-full bg-[#34d399]" />
          </span>
          <span className={cx("text-[13px] font-semibold", dark ? "text-sky" : "text-ink")}>{title}</span>
        </div>
        {meta ? <span className={cx("text-xs", dark ? "text-subtle" : "text-muted")}>{meta}</span> : null}
      </div>
      <div className="p-4 sm:p-5">{children}</div>
    </div>
  );
}

/** Runs a loop of `count` steps while the demo is visible; returns the last step for reduced motion. */
function useDemo(count: number, ms: number) {
  const ref = useRef<HTMLDivElement>(null);
  // Single-state demos (report, dashboard) play once and stay put; looping demos pause off screen.
  const inView = useInView(ref, { once: count === 1 });
  const reduced = useReducedMotion();
  const step = useLoop(count, ms, inView && !reduced);
  return { ref, step: reduced ? count - 1 : step, inView: inView || reduced };
}

function Bar({ value, className, track = "bg-surface" }: { value: number; className?: string; track?: string }) {
  return (
    <span className={cx("block h-2 overflow-hidden rounded-full", track)}>
      <span
        className={cx("block h-full rounded-full transition-[width] duration-700 ease-out", className ?? "bg-primary")}
        style={{ width: `${value}%` }}
      />
    </span>
  );
}

/* ---------- 1. Profile and target role ---------- */

const roles = ["Product designer", "Data analyst", "Software developer", "Business analyst", "Digital marketer", "UX researcher"];

export function ProfileDemo() {
  const { ref, step } = useDemo(roles.length, 1400);
  return (
    <div ref={ref}>
      <AppWindow title="Your profile" meta="Step 1 of 7">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Name" value="Aditi Sharma" />
            <Field label="Graduating" value="2027" />
          </div>
          <Field label="College" value="Your college" />
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold text-muted">Target role</span>
            <div className="flex flex-wrap gap-2">
              {roles.map((r, i) => (
                <span
                  key={r}
                  className={cx(
                    "rounded-md border px-3 py-1.5 text-[13px] font-semibold transition-all duration-300",
                    i === step ? "scale-105 border-primary bg-primary text-white" : "border-line bg-white text-body",
                  )}
                >
                  {r}
                </span>
              ))}
            </div>
          </div>
          <p className="rounded-lg bg-tint px-3.5 py-2.5 text-[13px] text-primary-strong">
            Your assessment and roadmap are built for <b>{roles[step]}</b>.
          </p>
        </div>
      </AppWindow>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <span className="flex flex-col gap-1">
      <span className="text-xs font-semibold text-muted">{label}</span>
      <span className="rounded-md border border-line px-3 py-2 text-[13px] font-medium text-ink">{value}</span>
    </span>
  );
}

/* ---------- 2. Skill assessment ---------- */

const options = [
  "Redesign the checkout page",
  "Check where users drop off and why",
  "Add a discount pop-up",
  "Ask the team what they think",
];

export function AssessmentDemo() {
  // 0 reading · 1 hovering B · 2 selected B · 3 saved, next question
  const { ref, step } = useDemo(4, 1300);
  const q = step === 3 ? 8 : 7;
  return (
    <div ref={ref}>
      <AppWindow title="Skill assessment" meta={`Question ${q} of 20`}>
        <div className="flex flex-col gap-4">
          <Bar value={(q / 20) * 100} />
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-tint px-2.5 py-1 text-[11px] font-bold text-primary-strong">Scenario</span>
            <span className="text-xs text-muted">Product thinking</span>
          </div>
          <p className="text-[15px] font-bold leading-snug sm:text-base">
            Users are dropping off at checkout. What do you do first?
          </p>
          <ul className="flex flex-col gap-2">
            {options.map((o, i) => {
              const isB = i === 1;
              const hover = isB && step === 1;
              const picked = isB && step >= 2;
              return (
                <li
                  key={o}
                  className={cx(
                    "flex items-center gap-3 rounded-lg border px-3 py-2.5 text-[13px] transition-all duration-300 sm:text-sm",
                    picked ? "border-primary bg-tint font-semibold text-ink" : hover ? "border-primary/60 bg-white" : "border-line bg-white text-body",
                  )}
                >
                  <span
                    className={cx(
                      "flex size-6 shrink-0 items-center justify-center rounded-full border text-[11px] font-bold transition-colors",
                      picked ? "border-primary bg-primary text-white" : "border-line-strong text-muted",
                    )}
                  >
                    {picked ? <CheckIcon size={14} /> : String.fromCharCode(65 + i)}
                  </span>
                  {o}
                </li>
              );
            })}
          </ul>
          <div className="flex items-center justify-between">
            <span className={cx("text-xs font-semibold text-success transition-opacity", step === 3 ? "opacity-100" : "opacity-0")}>
              Answer saved
            </span>
            <span
              className={cx(
                "rounded-md px-4 py-2 text-[13px] font-semibold transition-colors",
                step >= 2 ? "bg-primary text-white" : "bg-surface text-subtle",
              )}
            >
              Next question
            </span>
          </div>
        </div>
      </AppWindow>
    </div>
  );
}

/* ---------- 3. AI mock interview ---------- */

type Msg = { from: "ai" | "you"; text: string; tag?: string };
const chat: Msg[] = [
  { from: "ai", text: "Tell me about a project where you used data to make a decision." },
  { from: "you", text: "In my final-year project I surveyed 200 students and found most skipped onboarding, so I cut it to one screen." },
  { from: "ai", text: "What changed after that, and how did you measure it?", tag: "Follow-up" },
];

export function InterviewDemo() {
  // 0 typing · 1 q1 · 2 answer · 3 typing · 4 follow-up · 5 feedback · 6 hold
  const { ref, step } = useDemo(7, 1300);
  const visible = step >= 4 ? 3 : step >= 2 ? 2 : step >= 1 ? 1 : 0;
  const typing = step === 0 || step === 3;
  return (
    <div ref={ref}>
      <AppWindow
        title="AI mock interview"
        meta={
          <span className="inline-flex items-center gap-1.5">
            <span className="relative flex size-2">
              <span className="animate-ping-soft absolute inline-flex size-full rounded-full bg-danger" />
              <span className="relative inline-flex size-2 rounded-full bg-danger" />
            </span>
            06:42 left
          </span>
        }
      >
        <div className="flex min-h-[290px] flex-col gap-3">
          {chat.slice(0, visible).map((m, i) => (
            <div key={i} className={cx("animate-pop flex", m.from === "you" ? "justify-end" : "justify-start")}>
              <div
                className={cx(
                  "max-w-[85%] rounded-[10px] px-3.5 py-2.5 text-[13px] leading-snug sm:text-sm",
                  m.from === "you" ? "rounded-br-md bg-primary text-white" : "rounded-bl-md bg-surface text-ink",
                )}
              >
                {m.tag ? (
                  <span className="mb-1 block text-[11px] font-bold text-primary-strong">{m.tag}</span>
                ) : null}
                {m.text}
              </div>
            </div>
          ))}
          {typing ? (
            <div className="flex">
              <div className="flex gap-1 rounded-[10px] rounded-bl-md bg-surface px-4 py-3" aria-hidden>
                <span className="typing-dot size-1.5 rounded-full bg-muted" />
                <span className="typing-dot size-1.5 rounded-full bg-muted" />
                <span className="typing-dot size-1.5 rounded-full bg-muted" />
              </div>
            </div>
          ) : null}
          {step >= 5 ? (
            <div className="animate-pop mt-auto rounded-lg border border-success/30 bg-success-tint px-3.5 py-3">
              <p className="text-xs font-bold text-success-strong">Live feedback</p>
              <div className="mt-2 grid grid-cols-3 gap-2 text-center">
                {[
                  ["Clarity", "8/10"],
                  ["Structure", "7/10"],
                  ["Impact", "Add a number"],
                ].map(([k, v]) => (
                  <span key={k} className="rounded-lg bg-white px-1.5 py-1.5">
                    <span className="block text-[10px] text-muted">{k}</span>
                    <span className="block text-[12px] font-bold text-ink">{v}</span>
                  </span>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </AppWindow>
    </div>
  );
}

/* ---------- 4. Skill report ---------- */

const gaps = [
  { skill: "Design systems", level: "High gap", score: 38, tone: "bg-danger", chip: "bg-danger-tint text-danger" },
  { skill: "User research", level: "Medium", score: 61, tone: "bg-amber", chip: "bg-amber-tint text-warning" },
  { skill: "Prototyping", level: "Strong", score: 84, tone: "bg-success", chip: "bg-success-tint text-success-strong" },
  { skill: "Communication", level: "Strong", score: 80, tone: "bg-success", chip: "bg-success-tint text-success-strong" },
];

export function ReportDemo({ score = 75 }: { score?: number }) {
  const { ref, inView } = useDemo(1, 1000);
  return (
    <div ref={ref}>
      <AppWindow title="Your skill report" meta="Product designer">
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-5">
            <Gauge value={inView ? score : 0} />
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-muted">Readiness score</span>
              <span className="text-[15px] font-bold">Nearly there</span>
              <span className="text-xs leading-snug text-muted">The role needs 70+. Close one high gap to get there.</span>
            </div>
          </div>
          <ul className="flex flex-col gap-3">
            {gaps.map((g, i) => (
              <li key={g.skill} className="flex flex-col gap-1.5">
                <span className="flex items-center justify-between text-[13px]">
                  <span className="font-semibold">{g.skill}</span>
                  <span className={cx("rounded-md px-2 py-0.5 text-[11px] font-bold", g.chip)}>{g.level}</span>
                </span>
                <span className="block h-2 overflow-hidden rounded-full bg-surface">
                  <span
                    className={cx("block h-full rounded-full transition-[width] duration-1000 ease-out", g.tone)}
                    style={{ width: inView ? `${g.score}%` : "0%", transitionDelay: `${300 + i * 150}ms` }}
                  />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </AppWindow>
    </div>
  );
}

export function Gauge({ value, size = 104, dark, display }: { value: number; size?: number; dark?: boolean; display?: string }) {
  const r = 42;
  const c = 2 * Math.PI * r;
  return (
    <span className="relative inline-flex shrink-0" style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" className="size-full -rotate-90" aria-hidden>
        <circle cx="50" cy="50" r={r} fill="none" strokeWidth="9" className={dark ? "stroke-night-line" : "stroke-surface"} />
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          strokeWidth="9"
          strokeLinecap="round"
          className="stroke-primary transition-[stroke-dashoffset] duration-[1400ms] ease-out"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - value / 100)}
        />
      </svg>
      <span className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[28px] font-extrabold leading-none tabular-nums" style={{ fontSize: size * 0.27 }}>
          {display ?? value}
        </span>
        {display ? null : <span className={cx("text-[10px] font-semibold", dark ? "text-subtle" : "text-muted")}>of 100</span>}
      </span>
    </span>
  );
}

/* ---------- 5. Roadmap ---------- */

const months = [
  { m: "Month 1", focus: "Design systems", tasks: ["Audit 3 real design systems", "Build a 20-component kit"] },
  { m: "Month 2", focus: "User research", tasks: ["Run 5 user interviews", "Write a research summary"] },
  { m: "Month 3", focus: "Portfolio", tasks: ["Turn the kit into a case study", "Retake the assessment"] },
];
const allTasks = months.flatMap((m) => m.tasks);

export function RoadmapDemo() {
  const { ref, step } = useDemo(allTasks.length + 2, 1000);
  const done = Math.min(step, allTasks.length);
  const pct = Math.round((done / allTasks.length) * 100);
  return (
    <div ref={ref}>
      <AppWindow title="Your roadmap" meta={`${pct}% done`}>
        <div className="flex flex-col gap-4">
          <Bar value={pct} className="bg-success" />
          <ol className="flex flex-col gap-3">
            {months.map((m, mi) => (
              <li key={m.m} className="rounded-lg border border-line p-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-[13px] font-bold">{m.m}</span>
                  <span className="text-xs text-muted">{m.focus}</span>
                </div>
                <ul className="mt-2 flex flex-col gap-1.5">
                  {m.tasks.map((t, ti) => {
                    const k = mi * 2 + ti;
                    const isDone = k < done;
                    const isNext = k === done;
                    return (
                      <li key={t} className="flex items-center gap-2.5 text-[13px]">
                        <span
                          className={cx(
                            "flex size-5 shrink-0 items-center justify-center rounded-md border transition-all duration-300",
                            isDone ? "scale-100 border-success bg-success text-white" : isNext ? "border-primary" : "border-line-strong",
                          )}
                        >
                          {isDone ? <CheckIcon size={12} /> : null}
                        </span>
                        <span className={cx("transition-colors", isDone ? "text-muted line-through" : "text-ink")}>{t}</span>
                      </li>
                    );
                  })}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </AppWindow>
    </div>
  );
}

/* ---------- 6. ATS-ready CV ---------- */

const keywords = ["Figma", "Design systems", "Usability testing", "Prototyping", "A/B testing"];

export function CvDemo() {
  const { ref, step } = useDemo(keywords.length + 3, 900);
  const found = Math.min(step, keywords.length);
  const score = 58 + Math.round((found / keywords.length) * 34);
  return (
    <div ref={ref}>
      <AppWindow title="CV for: Product designer, fintech" meta={<span className="font-bold text-success">ATS {score}</span>}>
        <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_150px]">
          <div className="relative overflow-hidden rounded-lg border border-line bg-white p-3.5">
            <div className="h-3 w-28 rounded bg-ink" />
            <div className="mt-1.5 h-2 w-40 rounded bg-line-strong" />
            {[0, 1, 2].map((block) => (
              <div key={block} className="mt-4 flex flex-col gap-1.5">
                <div className="h-2 w-20 rounded bg-primary/70" />
                <div className="h-1.5 w-full rounded bg-line" />
                <div className="h-1.5 w-11/12 rounded bg-line" />
                <div className="h-1.5 w-4/5 rounded bg-line" />
              </div>
            ))}
            <div className="pointer-events-none absolute inset-x-0 h-10 animate-[gh-scan_2.4s_linear_infinite] bg-gradient-to-b from-primary/0 via-primary/15 to-primary/0" />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold text-muted">Matched to the job</span>
            {keywords.map((kw, i) => (
              <span
                key={kw}
                className={cx(
                  "flex items-center gap-2 rounded-lg border px-2.5 py-1.5 text-[12px] font-semibold transition-all duration-300",
                  i < found ? "border-success/40 bg-success-tint text-success-strong" : "border-line text-subtle",
                )}
              >
                <span className={cx("flex size-4 items-center justify-center rounded-full", i < found ? "bg-success text-white" : "bg-surface")}>
                  {i < found ? <CheckIcon size={10} /> : null}
                </span>
                {kw}
              </span>
            ))}
          </div>
        </div>
      </AppWindow>
    </div>
  );
}

/* ---------- 7. Job-ready check ---------- */

const checks = ["Readiness score 70 or more", "No high gaps left", "ATS-ready CV"];

export function JobReadyDemo() {
  const { ref, step } = useDemo(checks.length + 3, 1000);
  const passed = Math.min(step, checks.length);
  const unlocked = passed === checks.length;
  return (
    <div ref={ref}>
      <AppWindow title="Job-ready check" meta={`${passed} of 3`}>
        <div className="flex flex-col gap-3">
          {checks.map((c, i) => (
            <div
              key={c}
              className={cx(
                "flex items-center gap-3 rounded-lg border px-3.5 py-3 text-sm font-semibold transition-all duration-300",
                i < passed ? "border-success/40 bg-success-tint text-ink" : "border-line text-muted",
              )}
            >
              <span
                className={cx(
                  "flex size-7 shrink-0 items-center justify-center rounded-full transition-all duration-300",
                  i < passed ? "bg-success text-white" : "bg-surface",
                )}
              >
                {i < passed ? <CheckIcon size={16} /> : <span className="size-2 rounded-full bg-line-strong" />}
              </span>
              {c}
            </div>
          ))}
          <div
            className={cx(
              "mt-1 flex items-center justify-between rounded-lg px-4 py-3.5 transition-all duration-500",
              unlocked ? "bg-primary text-white" : "bg-surface text-subtle",
            )}
          >
            <span className="text-sm font-bold">{unlocked ? "You're job-ready. Jobs unlocked." : "Finish the checks to unlock jobs"}</span>
            <span className="text-lg" aria-hidden>
              {unlocked ? "🎉" : "🔒"}
            </span>
          </div>
        </div>
      </AppWindow>
    </div>
  );
}

/* ---------- 8. Job matching ---------- */

const jobs = [
  { role: "Product designer", org: "Fintech startup", place: "Bengaluru", match: 92 },
  { role: "UX designer", org: "SaaS company", place: "Remote", match: 87 },
  { role: "UI designer", org: "D2C brand", place: "Gurugram", match: 81 },
];

export function JobsDemo() {
  const { ref, step } = useDemo(jobs.length + 3, 1000);
  const shown = Math.min(step + 1, jobs.length);
  const tailored = step >= jobs.length;
  return (
    <div ref={ref}>
      <AppWindow title="Jobs matched to your skills" meta="12 matches">
        <ul className="flex min-h-[270px] flex-col gap-2.5">
          {jobs.slice(0, shown).map((j, i) => (
            <li key={j.role} className="animate-pop flex items-center gap-3 rounded-lg border border-line p-3">
              <MatchRing value={j.match} />
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="truncate text-sm font-bold">{j.role}</span>
                <span className="truncate text-xs text-muted">
                  {j.org} · {j.place}
                </span>
              </span>
              {i === 0 && tailored ? (
                <span className="animate-pop shrink-0 rounded-md bg-success-tint px-2.5 py-1 text-[11px] font-bold text-success-strong">
                  CV tailored
                </span>
              ) : (
                <span className="shrink-0 rounded-md bg-tint px-2.5 py-1 text-[11px] font-bold text-primary-strong">View</span>
              )}
            </li>
          ))}
          <li className="mt-auto rounded-lg bg-tint px-3.5 py-2.5 text-[12px] text-primary-strong">
            Ranked by the skills you proved in your assessment, not keywords.
          </li>
        </ul>
      </AppWindow>
    </div>
  );
}

function MatchRing({ value }: { value: number }) {
  const r = 16;
  const c = 2 * Math.PI * r;
  return (
    <span className="relative flex size-11 shrink-0 items-center justify-center">
      <svg viewBox="0 0 40 40" className="absolute inset-0 -rotate-90" aria-hidden>
        <circle cx="20" cy="20" r={r} fill="none" strokeWidth="4" className="stroke-surface" />
        <circle
          cx="20"
          cy="20"
          r={r}
          fill="none"
          strokeWidth="4"
          strokeLinecap="round"
          className="stroke-success"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - value / 100)}
        />
      </svg>
      <span className="text-[11px] font-extrabold">{value}%</span>
    </span>
  );
}

/* ---------- 9. Progress dashboard ---------- */

const trend = [42, 48, 55, 61, 66, 75, 81];

export function DashboardDemo() {
  const { ref, inView } = useDemo(1, 1000);
  const w = 520;
  const h = 170;
  const pts = trend.map((v, i) => [(i / (trend.length - 1)) * w, h - ((v - 30) / 60) * h] as const);
  const line = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const area = `${line} L${w},${h} L0,${h} Z`;
  return (
    <div ref={ref}>
      <AppWindow title="My journey dashboard" meta="Aditi · Product designer" dark>
        <div className="grid gap-4 lg:grid-cols-[150px_minmax(0,1fr)]">
          <nav className="hidden flex-col gap-1 lg:flex" aria-hidden>
            {["Overview", "Report", "Roadmap", "Interviews", "CV", "Jobs"].map((x, i) => (
              <span
                key={x}
                className={cx("rounded-lg px-3 py-2 text-[13px]", i === 0 ? "bg-primary font-semibold text-white" : "text-subtle")}
              >
                {x}
              </span>
            ))}
          </nav>
          <div className="flex min-w-0 flex-col gap-4">
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {[
                ["Readiness", "81", "+39 since start"],
                ["Gaps closed", "6 of 8", "2 medium left"],
                ["Roadmap", "72%", "On track"],
                ["Mock interviews", "4", "Clarity up 2 pts"],
              ].map(([k, v, s]) => (
                <div key={k} className="rounded-lg border border-night-line bg-night px-3 py-2.5">
                  <span className="block text-[11px] text-subtle">{k}</span>
                  <span className="block text-lg font-extrabold tabular-nums">{v}</span>
                  <span className="block text-[10px] text-[#6ee7b7]">{s}</span>
                </div>
              ))}
            </div>
            <div className="rounded-lg border border-night-line bg-night p-3.5">
              <div className="flex items-baseline justify-between">
                <span className="text-[13px] font-semibold">Readiness over time</span>
                <span className="text-[11px] text-subtle">Weeks 1–7</span>
              </div>
              <svg viewBox={`0 -6 ${w} ${h + 12}`} className="mt-3 h-auto w-full overflow-visible" aria-hidden>
                <defs>
                  <linearGradient id="gh-area" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[0.25, 0.5, 0.75].map((g) => (
                  <line key={g} x1="0" x2={w} y1={h * g} y2={h * g} stroke="#24365f" strokeDasharray="4 6" />
                ))}
                <line x1="0" x2={w} y1={h - ((70 - 30) / 60) * h} y2={h - ((70 - 30) / 60) * h} stroke="#34d399" strokeDasharray="2 5" />
                <text x={w - 4} y={h - ((70 - 30) / 60) * h - 6} textAnchor="end" fontSize="11" fill="#6ee7b7">
                  Job-ready line
                </text>
                <path d={area} fill="url(#gh-area)" className={cx("transition-opacity duration-1000", inView ? "opacity-100" : "opacity-0")} />
                <path
                  d={line}
                  fill="none"
                  stroke="#60a5fa"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  pathLength={1}
                  strokeDasharray={1}
                  strokeDashoffset={inView ? 0 : 1}
                  style={{ transition: "stroke-dashoffset 1.8s cubic-bezier(.2,.7,.2,1)" }}
                />
                {pts.map(([x, y], i) => (
                  <circle
                    key={i}
                    cx={x}
                    cy={y}
                    r={i === pts.length - 1 ? 6 : 3.5}
                    fill={i === pts.length - 1 ? "#60a5fa" : "#0a1633"}
                    stroke="#60a5fa"
                    strokeWidth="2"
                    className="transition-opacity duration-500"
                    style={{ opacity: inView ? 1 : 0, transitionDelay: `${300 + i * 200}ms` }}
                  />
                ))}
              </svg>
            </div>
            <div className="flex items-center justify-between gap-3 rounded-lg bg-primary px-4 py-3">
              <span className="text-[13px] font-semibold">Next: retake the assessment to confirm your progress</span>
              <span className="shrink-0 rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-primary">Start</span>
            </div>
          </div>
        </div>
      </AppWindow>
    </div>
  );
}

/* ---------- Lookup ---------- */

const demos = {
  profile: ProfileDemo,
  assessment: AssessmentDemo,
  interview: InterviewDemo,
  report: ReportDemo,
  roadmap: RoadmapDemo,
  cv: CvDemo,
  jobready: JobReadyDemo,
  jobs: JobsDemo,
  dashboard: DashboardDemo,
} as const;

export function Demo({ name }: { name: keyof typeof demos }) {
  const Component = demos[name];
  return <Component />;
}
