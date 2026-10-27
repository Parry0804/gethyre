"use server";

import { headers } from "next/headers";
import {
  CONSENT_VERSION,
  leadKinds,
  multilineFields,
  phoneFields,
  schemas,
  sheetColumns,
  sheetTabs,
  type LeadKind,
  type LeadState,
} from "@/lib/forms";
import { rateLimit } from "@/lib/rate-limit";
import { cleanText, safeCell } from "@/lib/sanitize";
import { appendRow, sheetsConfigured } from "@/lib/sheets";
import { emailConfigured, sendAutoReply, sendLeadAlert } from "@/lib/email";
import { verifyTurnstile } from "@/lib/turnstile";

const META_FIELDS = ["page", "utm_source", "utm_medium", "utm_campaign"] as const;
const MAX_FIELDS = 40;

/** The visitor's IP as seen by Vercel (or the first proxy hop elsewhere). */
async function clientIp() {
  const h = await headers();
  return (h.get("x-real-ip") ?? h.get("x-forwarded-for")?.split(",")[0] ?? "unknown").trim().slice(0, 64);
}

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

  // Only accept the fields this form actually has, as plain text, cleaned of control characters.
  const allowed = new Set<string>([...sheetColumns[kind], "consent"]);
  const values: Record<string, string> = {};
  let fieldCount = 0;
  for (const [key, value] of formData.entries()) {
    if (++fieldCount > MAX_FIELDS) break;
    if (typeof value !== "string" || !allowed.has(key)) continue;
    values[key] = cleanText(value, { multiline: multilineFields.has(key) });
  }
  const honeypot = String(formData.get("company_website") ?? "");
  const turnstileToken = formData.get("cf-turnstile-response");

  // Honeypot: real people never see or fill this field. Pretend it worked.
  if (honeypot) {
    return { status: "success", firstName: "" };
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

  // Rate limits: per IP, and per email address so nobody can flood someone else's inbox with auto-replies.
  const ip = await clientIp();
  const byIp = rateLimit(`ip:${ip}`, { limit: 5, windowMs: 10 * 60_000 });
  const byEmail = values.email ? rateLimit(`email:${values.email.toLowerCase()}`, { limit: 3, windowMs: 60 * 60_000 }) : { ok: true };
  if (!byIp.ok || !byEmail.ok) {
    return { status: "error", message: "Too many attempts. Please wait a few minutes and try again.", values };
  }

  if (!(await verifyTurnstile(typeof turnstileToken === "string" ? turnstileToken : null, ip))) {
    return { status: "error", message: "We couldn't confirm you're human. Please try again.", values };
  }

  const data = parsed.data as Record<string, string | undefined>;
  const clean: Record<string, string> = {};
  for (const col of sheetColumns[kind]) clean[col] = data[col] ?? "";
  const meta: Record<string, string> = {};
  for (const m of META_FIELDS) {
    const raw = formData.get(m);
    meta[m] = typeof raw === "string" ? cleanText(raw).slice(0, 200) : "";
  }

  const row = [
    istTimestamp(),
    ...sheetColumns[kind].map((c) => safeCell(clean[c], { isPhone: phoneFields.has(c) })),
    ...META_FIELDS.map((m) => safeCell(meta[m])),
    CONSENT_VERSION,
  ];
  const firstName = (clean.name.split(/\s+/)[0] ?? "").slice(0, 40);

  if (!sheetsConfigured() && !emailConfigured()) {
    if (process.env.NODE_ENV === "production") {
      // No personal data in logs.
      console.error("[leads] No storage configured; lead not saved", kind);
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
      console.error("[leads] Sheets error", err instanceof Error ? err.message.slice(0, 300) : "unknown");
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
      console.error("[leads] Alert email error", err instanceof Error ? err.message.slice(0, 300) : "unknown");
    }
    if (saved) {
      try {
        await sendAutoReply(kind, clean.email, firstName);
      } catch (err) {
        console.error("[leads] Auto-reply error", err instanceof Error ? err.message.slice(0, 300) : "unknown");
      }
    }
  }

  if (!saved) {
    return { status: "error", message: "We couldn't save your details. Please try again in a minute.", values };
  }
  return { status: "success", firstName };
}
