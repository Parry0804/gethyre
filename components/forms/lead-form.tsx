"use client";

import Script from "next/script";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useRef, useState } from "react";
import { submitLead } from "@/app/actions/leads";
import { Button, cx } from "@/components/ui";
import type { FieldConfig, LeadKind, LeadState } from "@/lib/forms";
import { track } from "@/lib/track";
import { readUtm, type Utm } from "@/lib/utm";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const initialState: LeadState = { status: "idle" };

const defaultConsent = "I agree to be contacted and accept the privacy policy.";

export function LeadForm({
  kind,
  fields,
  submitLabel,
  consentText = defaultConsent,
  tone = "white",
  heading,
  subheading,
  className,
}: {
  kind: LeadKind;
  fields: FieldConfig[];
  submitLabel: string;
  consentText?: string;
  tone?: "white" | "surface";
  heading?: string;
  subheading?: string;
  className?: string;
}) {
  const [state, formAction, pending] = useActionState(submitLead, initialState);
  const [meta, setMeta] = useState<Utm & { page?: string }>({});
  const router = useRouter();
  const started = useRef(false);

  useEffect(() => {
    // Read UTM tags and the current page on the client only.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMeta({ ...readUtm(), page: window.location.pathname });
  }, []);

  useEffect(() => {
    if (state.status !== "success") return;
    track("form_submit", { form: kind });
    try {
      sessionStorage.setItem("gh_lead", JSON.stringify({ kind, firstName: state.firstName ?? "" }));
    } catch {
      // ignore
    }
    router.push("/thank-you");
  }, [state, kind, router]);

  const value = (name: string) => state.values?.[name] ?? "";
  const error = (name: string) => state.fieldErrors?.[name];
  const id = (name: string) => `${kind}-${name}`;

  // Group consecutive half-width fields into rows.
  const rows: FieldConfig[][] = [];
  for (const f of fields) {
    const last = rows.at(-1);
    if (f.half && last && last.length === 1 && last[0].half) last.push(f);
    else rows.push([f]);
  }

  return (
    <form
      action={formAction}
      noValidate
      onFocus={() => {
        if (!started.current) {
          started.current = true;
          track("form_start", { form: kind });
        }
      }}
      className={cx(
        "flex w-full flex-col gap-3.5 rounded-[20px] p-5 lg:p-7",
        tone === "white" ? "bg-white" : "bg-surface",
        className,
      )}
    >
      {heading ? (
        <div className="mb-1 flex flex-col gap-1">
          <h3 className="text-[22px] font-extrabold tracking-[-0.01em] text-ink lg:text-2xl">{heading}</h3>
          {subheading ? <p className="text-sm text-muted lg:text-[15px]">{subheading}</p> : null}
        </div>
      ) : null}

      <input type="hidden" name="kind" value={kind} />
      <input type="hidden" name="page" value={meta.page ?? ""} />
      <input type="hidden" name="utm_source" value={meta.utm_source ?? ""} />
      <input type="hidden" name="utm_medium" value={meta.utm_medium ?? ""} />
      <input type="hidden" name="utm_campaign" value={meta.utm_campaign ?? ""} />
      {/* Honeypot for bots: hidden from people and assistive tech. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {rows.map((row) => (
        <div key={row.map((f) => f.name).join("-")} className={cx("grid gap-3.5", row.length === 2 && "sm:grid-cols-2")}>
          {row.map((f) => (
            <div key={f.name} className="flex flex-col gap-1.5">
              <label htmlFor={id(f.name)} className="text-sm font-semibold text-ink">
                {f.label}
                {f.optional ? <span className="font-normal text-muted"> (optional)</span> : null}
              </label>
              {f.multiline ? (
                <textarea
                  id={id(f.name)}
                  name={f.name}
                  placeholder={f.placeholder}
                  defaultValue={value(f.name)}
                  rows={3}
                  aria-invalid={Boolean(error(f.name))}
                  aria-describedby={error(f.name) ? `${id(f.name)}-error` : undefined}
                  className={inputClass(Boolean(error(f.name)))}
                />
              ) : (
                <input
                  id={id(f.name)}
                  name={f.name}
                  type={f.type ?? "text"}
                  inputMode={f.type === "tel" ? "tel" : f.type === "number" ? "numeric" : undefined}
                  placeholder={f.placeholder}
                  autoComplete={f.autoComplete}
                  defaultValue={value(f.name)}
                  required={!f.optional}
                  aria-invalid={Boolean(error(f.name))}
                  aria-describedby={error(f.name) ? `${id(f.name)}-error` : undefined}
                  className={inputClass(Boolean(error(f.name)))}
                />
              )}
              {error(f.name) ? (
                <p id={`${id(f.name)}-error`} className="text-[13px] font-medium text-danger">
                  {error(f.name)}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      ))}

      <div className="flex flex-col gap-1.5 pt-1">
        <label className="flex items-start gap-2.5 text-[13px] leading-normal text-body">
          <input
            type="checkbox"
            name="consent"
            defaultChecked={value("consent") === "on"}
            aria-invalid={Boolean(error("consent"))}
            className="mt-0.5 size-[18px] shrink-0 rounded accent-primary"
          />
          <span>
            {consentText.replace("privacy policy.", "")}
            <a href="/privacy" className="font-semibold text-primary-strong underline underline-offset-2">
              privacy policy
            </a>
            .
          </span>
        </label>
        {error("consent") ? <p className="text-[13px] font-medium text-danger">{error("consent")}</p> : null}
      </div>

      {TURNSTILE_SITE_KEY ? (
        <>
          <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="lazyOnload" />
          <div className="cf-turnstile" data-sitekey={TURNSTILE_SITE_KEY} data-appearance="interaction-only" />
        </>
      ) : null}

      <Button type="submit" disabled={pending} className="w-full">
        {pending ? "Sending…" : submitLabel}
      </Button>

      <p aria-live="polite" className={cx("text-sm font-medium", state.status === "error" ? "text-danger" : "sr-only")}>
        {state.status === "error" ? state.message : ""}
      </p>
    </form>
  );
}

function inputClass(invalid: boolean) {
  return cx(
    "min-h-12 w-full rounded-xl border bg-white px-3.5 py-3 text-base text-ink placeholder:text-subtle focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
    invalid ? "border-danger" : "border-line-strong",
  );
}
