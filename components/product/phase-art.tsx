/**
 * Illustrations for the Diagnose / Train / Place phases, built from the app's own UI pieces
 * so they point at real features. Static, decorative (the card text carries the meaning).
 */
import type { ReactNode } from "react";
import { CheckIcon, ChatIcon, FileIcon, TargetIcon } from "@/components/icons";
import { Gauge } from "@/components/product/live-demos";
import { cx } from "@/components/ui";

function Stage({ tone, children }: { tone: "blue" | "amber" | "green"; children: ReactNode }) {
  const bg = {
    blue: "from-[#e0ecff] to-[#c7dbff]",
    amber: "from-[#fff4dc] to-[#ffe2a8]",
    green: "from-[#dcf7ea] to-[#b5ebd2]",
  }[tone];
  return (
    <div className={cx("relative h-[230px] overflow-hidden bg-gradient-to-br lg:h-[250px]", bg)} aria-hidden>
      <div className="bg-dots absolute inset-0 opacity-60" />
      <div className="absolute -bottom-16 -right-10 size-48 rounded-full bg-white/40" />
      <div className="absolute -left-8 -top-10 size-32 rounded-full bg-white/30" />
      {children}
    </div>
  );
}

function Chip({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cx("absolute rounded-xl border border-white/70 bg-white px-3 py-2 text-[11px] font-semibold text-ink shadow-[0_10px_24px_rgb(10_22_51/0.14)]", className)}>
      {children}
    </div>
  );
}

function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cx("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold", className)}>{children}</span>;
}

/** Diagnose: assessment question, AI interview, readiness report. */
export function DiagnoseArt() {
  return (
    <Stage tone="blue">
      {/* Report card */}
      <div className="absolute right-3 top-[30px] w-[196px] rounded-2xl sm:right-5 bg-white p-3.5 shadow-[0_18px_40px_rgb(10_22_51/0.18)]">
        <div className="flex items-center gap-3">
          <Gauge value={75} size={64} />
          <div className="flex flex-col">
            <span className="text-[10px] font-semibold text-muted">Readiness</span>
            <span className="text-[13px] font-extrabold text-ink">Nearly there</span>
          </div>
        </div>
        <div className="mt-3 flex flex-col gap-1.5">
          {[
            ["Design systems", "w-[38%]", "bg-danger"],
            ["User research", "w-[61%]", "bg-amber"],
            ["Prototyping", "w-[84%]", "bg-success"],
          ].map(([k, w, c]) => (
            <div key={k} className="flex flex-col gap-0.5">
              <span className="text-[9px] font-semibold text-muted">{k}</span>
              <span className="block h-1.5 rounded-full bg-surface">
                <span className={cx("block h-full rounded-full", w, c)} />
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* Assessment */}
      <Chip className="left-3 top-[58px] w-[112px] -rotate-6 sm:left-5">
        <span className="flex items-center gap-1.5 text-primary-strong">
          <TargetIcon size={13} /> Assessment
        </span>
        <span className="mt-1 block text-[10px] font-medium text-muted">Question 7 of 20</span>
        <span className="mt-1.5 block h-1 rounded-full bg-sky">
          <span className="block h-full w-[35%] rounded-full bg-primary" />
        </span>
      </Chip>
      {/* AI interview */}
      <Chip className="bottom-5 left-3 w-[118px] rotate-3 sm:left-5">
        <span className="flex items-center gap-1.5 text-primary-strong">
          <ChatIcon size={13} /> AI interview
        </span>
        <span className="mt-1.5 flex h-4 items-end gap-[3px]">
          {[6, 12, 8, 16, 10, 14, 7, 12, 5, 9].map((h, i) => (
            <span key={i} className="w-[3px] rounded-full bg-primary/70" style={{ height: h }} />
          ))}
        </span>
      </Chip>
    </Stage>
  );
}

/** Train: roadmap with progress, rising readiness, ATS-ready CV. */
export function TrainArt() {
  const rows = [
    { m: "Month 1", t: "Design systems", done: true },
    { m: "Month 2", t: "User research", done: true },
    { m: "Month 3", t: "Portfolio case study", done: false },
  ];
  return (
    <Stage tone="amber">
      <div className="absolute right-3 top-[30px] w-[200px] rounded-2xl sm:right-5 bg-white p-3.5 shadow-[0_18px_40px_rgb(10_22_51/0.18)]">
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-extrabold text-ink">Your roadmap</span>
          <span className="text-[10px] font-bold text-success-strong">72%</span>
        </div>
        <span className="mt-1.5 block h-1.5 rounded-full bg-surface">
          <span className="block h-full w-[72%] rounded-full bg-success" />
        </span>
        <ul className="mt-2.5 flex flex-col gap-1.5">
          {rows.map((r) => (
            <li key={r.m} className="flex items-center gap-2 rounded-lg border border-line px-2 py-1.5">
              <span
                className={cx(
                  "flex size-4 shrink-0 items-center justify-center rounded",
                  r.done ? "bg-success text-white" : "border border-primary",
                )}
              >
                {r.done ? <CheckIcon size={10} /> : null}
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-[9px] font-semibold text-muted">{r.m}</span>
                <span className={cx("text-[11px] font-semibold", r.done ? "text-muted line-through" : "text-ink")}>{r.t}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
      <Chip className="left-3 top-[58px] -rotate-6 sm:left-5">
        <span className="block text-[10px] font-medium text-muted">Readiness</span>
        <span className="flex items-baseline gap-1 text-[15px] font-extrabold">
          42 <span className="text-[11px] text-muted">→</span> 81
          <span className="text-[10px] font-bold text-success-strong">▲</span>
        </span>
      </Chip>
      <Chip className="bottom-5 left-3 rotate-3 sm:left-5">
        <span className="flex items-center gap-1.5">
          <FileIcon size={13} className="text-primary" /> ATS-ready CV
        </span>
        <Tag className="mt-1 bg-success-tint text-success-strong">Score 92</Tag>
      </Chip>
    </Stage>
  );
}

/** Place: job-ready check, matched jobs with match scores, tailored CV. */
export function PlaceArt() {
  const jobs = [
    { role: "Product designer", org: "Fintech · Bengaluru", match: 92 },
    { role: "UX designer", org: "SaaS · Remote", match: 87 },
  ];
  return (
    <Stage tone="green">
      <div className="absolute right-3 top-[44px] flex w-[200px] flex-col gap-2 sm:right-5">
        {jobs.map((j, i) => (
          <div
            key={j.role}
            className={cx(
              "flex items-center gap-2.5 rounded-2xl bg-white p-2.5 shadow-[0_18px_40px_rgb(10_22_51/0.16)]",
              i === 1 && "ml-4 opacity-95",
            )}
          >
            <span className="relative flex size-10 shrink-0 items-center justify-center">
              <svg viewBox="0 0 40 40" className="absolute inset-0 -rotate-90">
                <circle cx="20" cy="20" r="16" fill="none" strokeWidth="4" className="stroke-surface" />
                <circle
                  cx="20"
                  cy="20"
                  r="16"
                  fill="none"
                  strokeWidth="4"
                  strokeLinecap="round"
                  className="stroke-success"
                  strokeDasharray={2 * Math.PI * 16}
                  strokeDashoffset={2 * Math.PI * 16 * (1 - j.match / 100)}
                />
              </svg>
              <span className="text-[10px] font-extrabold">{j.match}%</span>
            </span>
            <span className="flex min-w-0 flex-col leading-tight">
              <span className="truncate text-[12px] font-bold text-ink">{j.role}</span>
              <span className="truncate text-[10px] text-muted">{j.org}</span>
            </span>
          </div>
        ))}
      </div>
      <Chip className="left-3 top-[58px] -rotate-6 sm:left-5">
        <span className="block text-[10px] font-medium text-muted">Job-ready check</span>
        <span className="mt-1 flex gap-1">
          {[0, 1, 2].map((i) => (
            <span key={i} className="flex size-4 items-center justify-center rounded-full bg-success text-white">
              <CheckIcon size={10} />
            </span>
          ))}
        </span>
      </Chip>
      <Chip className="bottom-5 left-3 rotate-3 sm:left-5">
        <Tag className="bg-tint text-primary-strong">12 jobs matched</Tag>
        <span className="mt-1 block text-[10px] font-medium text-muted">CV tailored for each</span>
      </Chip>
    </Stage>
  );
}
