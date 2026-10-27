import { z } from "zod";

/** The four lead forms on the site. Each writes to its own Google Sheet tab. */
export const leadKinds = ["student", "college", "company", "ambassador"] as const;
export type LeadKind = (typeof leadKinds)[number];

export type FieldConfig = {
  name: string;
  label: string;
  placeholder: string;
  type?: "text" | "email" | "tel" | "number";
  autoComplete?: string;
  optional?: boolean;
  /** Sits half-width beside the next half field on wider screens. */
  half?: boolean;
  multiline?: boolean;
};

const name = z.string().trim().min(2, "Please enter your name.").max(80);
const email = z.string().trim().toLowerCase().email("Please enter a valid email address.").max(120);
const phone = z
  .string()
  .trim()
  .regex(/^\+?[\d\s-]{8,16}$/, "Please enter a valid phone number.");
const optionalPhone = z.union([z.literal(""), phone]).optional();
const short = (label: string) => z.string().trim().min(2, `Please enter your ${label}.`).max(120);
const optionalShort = z.string().trim().max(120).optional();
const consent = z.literal("on", { error: "Please tick the box to continue." });

export const schemas = {
  student: z.object({
    name,
    email,
    whatsapp: optionalPhone,
    college: short("college"),
    course: optionalShort,
    role: short("target role"),
    consent,
  }),
  college: z.object({
    name,
    designation: short("designation"),
    college: short("college and city"),
    phone,
    email,
    students: optionalShort,
    consent,
  }),
  company: z.object({
    name,
    company: short("company name"),
    email,
    phone,
    roles: z.string().trim().min(2, "Please tell us the roles you're hiring for.").max(300),
    freshers: optionalShort,
    consent,
  }),
  ambassador: z.object({
    name,
    email,
    whatsapp: phone,
    college: short("college and city"),
    course: short("course and year"),
    why: z.string().trim().min(10, "Please add a line or two about you.").max(600),
    consent,
  }),
} satisfies Record<LeadKind, z.ZodTypeAny>;

/** Column order for each Google Sheet tab (after the timestamp column). */
export const sheetColumns: Record<LeadKind, string[]> = {
  student: ["name", "email", "whatsapp", "college", "course", "role"],
  college: ["name", "designation", "college", "phone", "email", "students"],
  company: ["name", "company", "email", "phone", "roles", "freshers"],
  ambassador: ["name", "email", "whatsapp", "college", "course", "why"],
};

export const sheetTabs: Record<LeadKind, string> = {
  student: "Students",
  college: "Colleges",
  company: "Companies",
  ambassador: "Ambassadors",
};

/** Bump when the consent wording changes, so each lead records which text they agreed to. */
export const CONSENT_VERSION = "2026-10-v1";

/* ---------- Field sets used by the pages ---------- */

export const fields = {
  studentShort: [
    { name: "name", label: "Full name", placeholder: "Your name", autoComplete: "name" },
    { name: "email", label: "Email", placeholder: "you@college.edu", type: "email", autoComplete: "email" },
    { name: "college", label: "College", placeholder: "Your college", half: true, autoComplete: "organization" },
    { name: "role", label: "Target role", placeholder: "e.g. Data analyst", half: true },
  ],
  studentFull: [
    { name: "name", label: "Full name", placeholder: "Your name", autoComplete: "name" },
    { name: "email", label: "Email", placeholder: "you@college.edu", type: "email", autoComplete: "email" },
    { name: "whatsapp", label: "WhatsApp number", placeholder: "+91", type: "tel", autoComplete: "tel", optional: true },
    { name: "college", label: "College", placeholder: "Your college", autoComplete: "organization" },
    { name: "course", label: "Course and year", placeholder: "e.g. B.Tech CSE, final year", optional: true },
    { name: "role", label: "Target role", placeholder: "e.g. Data analyst" },
  ],
  college: [
    { name: "name", label: "Your name", placeholder: "Full name", autoComplete: "name" },
    { name: "designation", label: "Designation", placeholder: "e.g. Training and Placement Officer", autoComplete: "organization-title" },
    { name: "college", label: "College and city", placeholder: "College name, city", autoComplete: "organization" },
    { name: "phone", label: "Phone", placeholder: "+91", type: "tel", autoComplete: "tel", half: true },
    { name: "email", label: "Email", placeholder: "name@college.edu", type: "email", autoComplete: "email", half: true },
    { name: "students", label: "Final-year students", placeholder: "Approximate number", type: "number", optional: true },
  ],
  company: [
    { name: "name", label: "Your name", placeholder: "Full name", autoComplete: "name" },
    { name: "company", label: "Company", placeholder: "Company name", autoComplete: "organization" },
    { name: "email", label: "Work email", placeholder: "name@company.com", type: "email", autoComplete: "email", half: true },
    { name: "phone", label: "Phone", placeholder: "+91", type: "tel", autoComplete: "tel", half: true },
    { name: "roles", label: "Roles you're hiring for", placeholder: "e.g. Junior data analyst, UI designer" },
    { name: "freshers", label: "Freshers per year", placeholder: "Approximate number", type: "number", optional: true },
  ],
  ambassador: [
    { name: "name", label: "Full name", placeholder: "Your name", autoComplete: "name" },
    { name: "email", label: "Email", placeholder: "you@college.edu", type: "email", autoComplete: "email", half: true },
    { name: "whatsapp", label: "WhatsApp number", placeholder: "+91", type: "tel", autoComplete: "tel", half: true },
    { name: "college", label: "College and city", placeholder: "College name, city", autoComplete: "organization" },
    { name: "course", label: "Course and year", placeholder: "e.g. B.Tech CSE, 3rd year" },
    { name: "why", label: "Why you?", placeholder: "One or two lines about you", multiline: true },
  ],
} satisfies Record<string, FieldConfig[]>;

export type LeadState = {
  status: "idle" | "error" | "success";
  message?: string;
  fieldErrors?: Record<string, string>;
  values?: Record<string, string>;
  firstName?: string;
};
