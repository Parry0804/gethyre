"use client";

import Link from "next/link";
import { useState } from "react";
import { CheckIcon } from "@/components/icons";
import { cx } from "@/components/ui";
import { commonSkills, roles } from "@/content/roles";
import { track } from "@/lib/track";

/** Home page: pick a role, see the skills GetHyre.ai assesses for it. */
export function RoleExplorer() {
  const [active, setActive] = useState(0);
  const role = roles[active];

  return (
    <div className="mt-8 grid gap-4 lg:mt-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-6">
      <div role="tablist" aria-label="Target roles" aria-orientation="vertical" className="grid grid-cols-2 gap-2 sm:grid-cols-2 lg:gap-3">
        {roles.map((r, i) => {
          const on = i === active;
          return (
            <button
              key={r.id}
              type="button"
              role="tab"
              id={`role-tab-${r.id}`}
              aria-selected={on}
              aria-controls="role-panel"
              onClick={() => {
                setActive(i);
                track("role_view", { role: r.id });
              }}
              className={cx(
                "flex min-h-[76px] flex-col items-start justify-center gap-1 rounded-[10px] border px-3.5 py-3 text-left transition-colors lg:px-4",
                on ? "border-primary bg-primary text-white shadow-[0_10px_28px_rgb(37_99_235/0.25)]" : "border-line bg-white text-ink hover:border-primary/50 hover:bg-tint",
              )}
            >
              <span className={cx("text-[11px] font-bold uppercase tracking-[0.08em]", on ? "text-white" : "text-primary")}>{r.field}</span>
              <span className="text-[14px] font-bold leading-snug lg:text-[15px]">{r.name}</span>
            </button>
          );
        })}
      </div>

      <div
        id="role-panel"
        role="tabpanel"
        aria-labelledby={`role-tab-${role.id}`}
        className="flex flex-col gap-6 rounded-[12px] border border-line bg-white p-6 lg:p-8"
      >
        <div key={role.id} className="flex animate-[gh-fade_0.3s_ease-out] flex-col gap-6">
          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-bold text-primary">{role.field}</span>
            <h3 className="text-[24px] font-extrabold tracking-[-0.02em] lg:text-[30px]">{role.name}</h3>
            <p className="text-[15px] text-body lg:text-[17px]">{role.summary}</p>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-[13px] font-bold uppercase tracking-[0.08em] text-muted">Skills we assess</h4>
            <ul className="grid gap-2 sm:grid-cols-2">
              {role.skills.map((s) => (
                <li key={s} className="flex items-center gap-2.5 rounded-lg bg-surface px-3 py-2.5 text-[14px] font-semibold text-ink">
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-success text-white">
                    <CheckIcon size={12} />
                  </span>
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-[13px] font-bold uppercase tracking-[0.08em] text-muted">Tools covered</h4>
            <ul className="flex flex-wrap gap-2">
              {role.tools.map((t) => (
                <li key={t} className="rounded-md border border-sky bg-tint px-3 py-1.5 text-[13px] font-semibold text-primary-strong">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-auto border-t border-line pt-4 text-[14px] text-body">
          <span className="font-bold text-ink">Every role also covers </span>
          {commonSkills.slice(0, -1).join(", ").toLowerCase()} and {commonSkills.at(-1)?.toLowerCase()}, through the AI mock interview.
        </p>
      </div>

      <p className="text-[15px] text-body lg:col-span-2">
        More roles are being added.{" "}
        <Link href="/early-access" className="font-bold text-primary-strong underline-offset-4 hover:underline">
          Tell us the role you&apos;re aiming for <span aria-hidden>→</span>
        </Link>
      </p>
    </div>
  );
}
