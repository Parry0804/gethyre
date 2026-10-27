/**
 * Site-wide settings and the facts the site still needs from the team.
 * Anything in [square brackets] is a placeholder: search the repo for "[" before launch.
 */

export const site = {
  name: "GetHyre.ai",
  // Your own domain when set; otherwise the Vercel production address; localhost when running locally.
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
  description:
    "The AI placement journey for college students: diagnose your gaps with an assessment and an AI mock interview, train on a roadmap built from them, and get matched to jobs.",
  tagline:
    "The AI placement journey for college students: diagnose your gaps, train on a roadmap, get matched to jobs.",
  /** Fixed rather than computed so every page stays fully static. Update each January. */
  copyrightYear: 2026,

  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@[domain]",
    careersEmail: process.env.NEXT_PUBLIC_CAREERS_EMAIL ?? "careers@[domain]",
    pressEmail: process.env.NEXT_PUBLIC_PRESS_EMAIL ?? "press@[domain]",
    /** Digits only with country code, e.g. 919876543210. Leave empty to hide WhatsApp links. */
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",
    city: "[City]",
    companyName: "[Registered company name]",
  },

  social: {
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "",
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "",
    youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL ?? "",
  },

  /** The Google Form used for the campus survey. */
  surveyUrl: process.env.NEXT_PUBLIC_SURVEY_URL ?? "",

  /** Calendar link (Cal.com or Calendly) for college partnership calls. Optional. */
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL ?? "",

  /** Demo video embed URL (YouTube "embed" link). Empty shows the placeholder. */
  demoVideoUrl: process.env.NEXT_PUBLIC_DEMO_VIDEO_URL ?? "",

  /**
   * Downloadable files. Put the PDFs in /public/downloads and set `href`.
   * While `href` is null the card shows "Available soon" instead of a broken link.
   */
  downloads: {
    brochure: { title: "College brochure", meta: "PDF", href: null as string | null },
    sampleReport: {
      title: "Sample skill report",
      meta: "PDF · dummy student",
      href: null as string | null,
    },
    logoPack: { title: "Logo pack", meta: "SVG and PNG · light and dark", href: null as string | null },
    appScreens: { title: "App screens", meta: "PNG", href: null as string | null },
    founderPhotos: { title: "Founder photos", meta: "JPG · high resolution", href: null as string | null },
    brandGuidelines: {
      title: "Brand guidelines",
      meta: "PDF · colours, type, usage",
      href: null as string | null,
    },
  },
} as const;

export function whatsappLink(message = "Hi GetHyre.ai, I have a question.") {
  if (!site.contact.whatsapp) return null;
  return `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const mainNav = [
  { href: "/product", label: "Product" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/students", label: "Students" },
  { href: "/colleges", label: "Colleges" },
  { href: "/companies", label: "Companies" },
  { href: "/about", label: "About" },
] as const;

export const footerNav = [
  {
    title: "Product",
    links: [
      { href: "/product", label: "Product tour" },
      { href: "/#how-it-works", label: "How it works" },
      { href: "/students", label: "For students" },
      { href: "/colleges", label: "For colleges" },
      { href: "/companies", label: "For companies" },
      { href: "/early-access", label: "Early access" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/careers", label: "Careers" },
      { href: "/press", label: "Press kit" },
      { href: "/about#contact", label: "Contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/#faq", label: "FAQ" },
      { href: "/how-we-assess", label: "How we assess" },
      { href: "/students#sample-report", label: "Sample skill report" },
      { href: "/#campus-survey", label: "Campus survey" },
      { href: "/ambassadors", label: "Campus ambassadors" },
      { href: "/guides", label: "Guides" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy policy" },
      { href: "/terms", label: "Terms of use" },
    ],
  },
] as const;
