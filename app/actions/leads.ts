"use server";

import { CONSENT_VERSION, leadKinds, schemas, sheetColumns, sheetTabs, type LeadKind, type LeadState } from "@/lib/forms";
import { appendRow, sheetsConfigured } from "@/lib/sheets";
import { emailConfigured, sendAutoReply, sendLeadAlert } from "@/lib/email";
import { verifyTurnstile } from "@/lib/turnstile";

const META_FIELDS = ["page", "utm_source", "utm_medium", "utm_campaign"] as const;

function istTimestamp() {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date());
}

/**
 * Handles all four lead forms: validate, check spam, save to Google Sheets,
 * then send the auto-reply and (for colleges, companies and ambassadors) an alert.
 */
export async function submitLead(_prev: LeadState, formData: FormData): Promise<LeadState> {
  const kindRaw = String(formData.get("kind") ?? "");
  if (!(leadKinds as readonly string[]).includes(kindRaw)) {
    return { status: "error", message: "Something went wrong. Please refresh and try again." };
  }
  const kind = kindRaw as LeadKind;

  const values: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    if (typeof value === "string" && !key.startsWith("$ACTION")) values[key] = value;
  }

  // Honeypot: real people never see or fill this field.
  if (values.company_website) {
    return { status: "success", firstName: "" };
  }

  if (!(await verifyTurnstile(values["cf-turnstile-response"] ?? null))) {
    return { status: "error", message: "We couldn't confirm you're human. Please try again.", values };
  }

  const parsed = schemas[kind].safeParse(values);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      fieldErrors[key] ??= issue.message;
    }
    return { status: "error", message: "Please check the highlighted fields.", fieldErrors, values };
  }

  const data = parsed.data as Record<string, string | undefined>;
  const clean: Record<string, string> = {};
  for (const col of sheetColumns[kind]) clean[col] = data[col] ?? "";
  const meta: Record<string, string> = {};
  for (const m of META_FIELDS) meta[m] = (values[m] ?? "").slice(0, 200);

  const row = [istTimestamp(), ...sheetColumns[kind].map((c) => clean[c]), ...META_FIELDS.map((m) => meta[m]), CONSENT_VERSION];
  const firstName = clean.name.split(/\s+/)[0] ?? "";

  if (!sheetsConfigured() && !emailConfigured()) {
    if (process.env.NODE_ENV === "production") {
      console.error("[leads] No storage configured; lead not saved", kind, clean.email);
      return {
        status: "error",
        message: "Our form isn't connected yet. Please email us instead.",
        values,
      };
    }
    console.info("[leads] Dev mode, not saved:", kind, { ...clean, ...meta });
    return { status: "success", firstName };
  }

  let saved = false;
  if (sheetsConfigured()) {
    try {
      await appendRow(sheetTabs[kind], row);
      saved = true;
    } catch (err) {
      console.error("[leads] Sheets error", err);
    }
  }

  // Alert the team for B2B leads, and for any lead the sheet failed to store.
  if (emailConfigured()) {
    try {
      if (!saved) {
        await sendLeadAlert(kind, { ...clean, ...meta }, "Google Sheets failed to save this lead. Please add it manually.");
        saved = true;
      } else if (kind !== "student") {
        await sendLeadAlert(kind, { ...clean, ...meta });
      }
    } catch (err) {
      console.error("[leads] Alert email error", err);
    }
    if (saved) {
      try {
        await sendAutoReply(kind, clean.email, firstName);
      } catch (err) {
        console.error("[leads] Auto-reply error", err);
      }
    }
  }

  if (!saved) {
    return { status: "error", message: "We couldn't save your details. Please try again in a minute.", values };
  }
  return { status: "success", firstName };
}
