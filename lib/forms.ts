import { z } from "zod";

/** The lead forms on the site. Each writes to its own Google Sheet tab. */
export const leadKinds = ["student", "college", "company", "contact"] as const;
export type LeadKind = (typeof leadKinds)[number];

export type FieldConfig = {
  name: string;
  label: string;
  placeholder: string;
  type?: "text" | "email" | "tel" | "number" | "select";
  /** Choices for a select field. */
  options?: readonly string[];
  autoComplete?: string;
  optional?: boolean;
  /** Sits half-width beside the next half field on wider screens. */
  half?: boolean;
  multiline?: boolean;
};

// Letters (any script), spaces, dots, apostrophes and hyphens only. Stops links and markup in names,
// which are echoed in the auto-reply email.
const name = z
  .string()
  .trim()
  .min(2, "Please enter your name.")
  .max(80)
  .regex(/^[\p{L}\p{M}][\p{L}\p{M} .'-]*$/u, "Please use letters only in your name.");
const email = z.string().trim().toLowerCase().email("Please enter a valid email address.").max(120);
const phone = z
  .string()
  .trim()
  .regex(/^\+?[\d\s-]{8,16}$/, "Please enter a valid phone number.");
const optionalPhone = z.union([z.literal(""), phone]).optional();
const short = (label: string) => z.string().trim().min(2, `Please enter your ${label}.`).max(120);
const optionalShort = z.string().trim().max(120).optional();
const consent = z.literal("on", { error: "Please tick the box to continue." });

/** Fields that hold phone numbers: validated by regex, so they may start with "+". */
export const phoneFields = new Set(["phone", "whatsapp"]);
/** Fields where line breaks are allowed. */
export const multilineFields = new Set(["roles", "message"]);

/** Topics on the Contact page form. */
export const contactTopics = [
  "I'm a student",
  "College or university partnership",
  "Hiring from GetHyre.ai",
  "Press and media",
  "Careers",
  "Something else",
] as const;

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
  contact: z.object({
    name,
    email,
    topic: z.enum(contactTopics, { error: "Please choose a topic." }),
    organisation: optionalShort,
    message: z.string().trim().min(10, "Please write a short message (10 characters or more).").max(2000),
    consent,
  }),
} satisfies Record<LeadKind, z.ZodTypeAny>;

/** Column order for each Google Sheet tab (after the timestamp column). */
export const sheetColumns: Record<LeadKind, string[]> = {
  student: ["name", "email", "whatsapp", "college", "course", "role"],
  college: ["name", "designation", "college", "phone", "email", "students"],
  company: ["name", "company", "email", "phone", "roles", "freshers"],
  contact: ["name", "email", "topic", "organisation", "message"],
};

export const sheetTabs: Record<LeadKind, string> = {
  student: "Students",
  college: "Colleges",
  company: "Companies",
  contact: "Contact",
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
  contact: [
    { name: "name", label: "Full name", placeholder: "Your name", autoComplete: "name", half: true },
    { name: "email", label: "Email", placeholder: "you@example.com", type: "email", autoComplete: "email", half: true },
    { name: "topic", label: "What's this about?", placeholder: "Choose a topic", type: "select", options: contactTopics },
    { name: "organisation", label: "College or company", placeholder: "Where you study or work", autoComplete: "organization", optional: true },
    { name: "message", label: "Message", placeholder: "How can we help?", multiline: true },
  ],
} satisfies Record<string, FieldConfig[]>;

export type LeadState = {
  status: "idle" | "error" | "success";
  message?: string;
  fieldErrors?: Record<string, string>;
  values?: Record<string, string>;
  firstName?: string;
};
