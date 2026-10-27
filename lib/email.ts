import "server-only";
import type { LeadKind } from "@/lib/forms";

/** Sends email through the Resend API (https://resend.com). No SDK needed. */
export function emailConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.EMAIL_FROM);
}

async function send({ to, subject, text, replyTo }: { to: string; subject: string; text: string; replyTo?: string }) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: process.env.EMAIL_FROM, to, subject, text, reply_to: replyTo }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Resend failed (${res.status}): ${await res.text()}`);
}

const replies: Record<LeadKind, { subject: string; body: (first: string) => string }> = {
  student: {
    subject: "You're on the GetHyre.ai early-access list",
    body: (first) =>
      `Hi ${first},\n\nThanks for joining GetHyre.ai early access. We'll invite you as soon as we go live at your campus.\n\nYour first step will be a role-specific skill assessment and a 10-minute AI mock interview, followed by your skill report.\n\nTeam GetHyre.ai`,
  },
  college: {
    subject: "Thanks for your interest in GetHyre.ai",
    body: (first) =>
      `Hi ${first},\n\nThanks for reaching out. We'll contact you within two working days to set up a call with your placement team.${
        process.env.NEXT_PUBLIC_BOOKING_URL ? `\n\nPrefer to pick a time now? ${process.env.NEXT_PUBLIC_BOOKING_URL}` : ""
      }\n\nTeam GetHyre.ai`,
  },
  company: {
    subject: "Thanks for registering hiring interest with GetHyre.ai",
    body: (first) =>
      `Hi ${first},\n\nThanks for telling us about your hiring plans. We'll get back to you within two working days with how a matched shortlist would work for your roles.\n\nTeam GetHyre.ai`,
  },
  ambassador: {
    subject: "We've received your GetHyre.ai ambassador application",
    body: (first) =>
      `Hi ${first},\n\nThanks for applying to be a GetHyre.ai campus ambassador. We'll reply within a week.\n\nTeam GetHyre.ai`,
  },
};

export async function sendAutoReply(kind: LeadKind, to: string, firstName: string) {
  const r = replies[kind];
  await send({ to, subject: r.subject, text: r.body(firstName), replyTo: process.env.LEADS_ALERT_EMAIL });
}

export async function sendLeadAlert(kind: LeadKind, data: Record<string, string>, note?: string) {
  const to = process.env.LEADS_ALERT_EMAIL;
  if (!to) return;
  const lines = Object.entries(data).map(([k, v]) => `${k}: ${v}`);
  await send({
    to,
    subject: `New ${kind} lead: ${data.name ?? ""}${data.college ? ` (${data.college})` : data.company ? ` (${data.company})` : ""}`,
    text: `${note ? `${note}\n\n` : ""}${lines.join("\n")}`,
    replyTo: data.email,
  });
}
