import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { LeadForm } from "@/components/forms/lead-form";
import { SocialLinks } from "@/components/layout/social-links";
import { ChatIcon, FileIcon, TargetIcon } from "@/components/icons";
import { Reveal } from "@/components/motion";
import { Container, Eyebrow, H1, Lead, Section, SectionHeader } from "@/components/ui";
import { fields } from "@/lib/forms";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact us",
  description:
    "Get in touch with GetHyre.ai: questions about the app, college partnerships, hiring, press and careers.",
  alternates: { canonical: "/contact" },
};

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden>
      <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  );
}

function BuildingIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden>
      <path d="M3 21h18M5 21V8l7-4 7 4v13M9 21v-5h6v5M9 11h.01M15 11h.01" />
    </svg>
  );
}

const teams: { icon: ReactNode; title: string; body: string; link: { label: string; href: string } }[] = [
  {
    icon: <BuildingIcon />,
    title: "Colleges and universities",
    body: "Bring GetHyre.ai to your placement cell and see batch-level readiness.",
    link: { label: "Book a partnership call", href: "/colleges#book-a-call" },
  },
  {
    icon: <TargetIcon size={20} />,
    title: "Hiring teams",
    body: "Hire freshers who are already assessed and interview-practised.",
    link: { label: "Register hiring interest", href: "/companies#register" },
  },
  {
    icon: <FileIcon size={20} />,
    title: "Press and media",
    body: "Logos, app screens and company facts for stories about GetHyre.ai.",
    link: { label: site.contact.pressEmail, href: `mailto:${site.contact.pressEmail}` },
  },
  {
    icon: <ChatIcon size={20} />,
    title: "Careers",
    body: "Want to help build the future of campus hiring? We'd like to hear from you.",
    link: { label: site.contact.careersEmail, href: `mailto:${site.contact.careersEmail}` },
  },
];

export default function ContactPage() {
  const wa = whatsappLink();
  const details = [
    { icon: <MailIcon />, label: "Email", value: site.contact.email, href: `mailto:${site.contact.email}` },
    ...(wa ? [{ icon: <ChatIcon size={20} />, label: "WhatsApp", value: "Chat with us", href: wa }] : []),
    { icon: <PinIcon />, label: "Based in", value: `${site.contact.city}, India` },
    { icon: <BuildingIcon />, label: "GetHyre.ai is a product of", value: site.contact.companyName },
  ];

  return (
    <>
      {/* Hero with form */}
      <section className="relative overflow-hidden pb-14 pt-10 lg:pb-22 lg:pt-16">
        <div className="bg-dots absolute inset-0 [mask-image:radial-gradient(ellipse_at_20%_10%,#000_15%,transparent_60%)]" aria-hidden />
        <Container className="relative grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_560px] lg:gap-16">
          <div className="flex flex-col items-start gap-5 lg:pt-6">
            <Eyebrow>Contact us</Eyebrow>
            <H1 className="lg:text-[64px]">Let&apos;s talk.</H1>
            <Lead className="max-w-[520px]">
              Questions about the app, a partnership for your college, or hiring from GetHyre.ai? Send us a message and the
              right person on our team will reply.
            </Lead>

            <ul className="mt-3 flex w-full max-w-[520px] flex-col divide-y divide-line overflow-hidden rounded-[16px] border border-line bg-white">
              {details.map((d) => (
                <li key={d.label} className="flex items-center gap-4 px-5 py-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-tint text-primary">{d.icon}</span>
                  <span className="flex min-w-0 flex-col">
                    <span className="text-xs font-semibold text-muted">{d.label}</span>
                    {d.href ? (
                      <a
                        href={d.href}
                        {...(d.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="truncate text-[15px] font-bold text-ink hover:text-primary"
                      >
                        {d.value}
                      </a>
                    ) : (
                      <span className="truncate text-[15px] font-bold text-ink">{d.value}</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-3 pt-2">
              <span className="text-sm font-bold text-ink">Follow GetHyre.ai</span>
              <SocialLinks />
            </div>
          </div>

          <LeadForm
            kind="contact"
            fields={fields.contact}
            submitLabel="Send message"
            heading="Send us a message"
            subheading="We read every message and reply by email."
            consentText="I agree to be contacted about my message and accept the privacy policy."
            className="shadow-[var(--shadow-lift)] lg:rounded-[16px] lg:p-9"
          />
        </Container>
      </section>

      {/* Teams */}
      <Section tone="white" labelledBy="teams-title">
        <SectionHeader
          id="teams-title"
          eyebrow="Find the right team"
          title="Looking for something specific?"
          intro="Go straight to the team that can help."
        />
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4 lg:gap-5">
          {teams.map((t, i) => (
            <Reveal as="li" key={t.title} delay={i * 80} className="flex flex-col gap-3 rounded-[16px] border border-line bg-surface p-6">
              <span className="flex size-10 items-center justify-center rounded-full bg-white text-primary ring-1 ring-line">{t.icon}</span>
              <h3 className="text-lg font-bold">{t.title}</h3>
              <p className="text-[15px] leading-relaxed text-body">{t.body}</p>
              <a
                href={t.link.href}
                className="mt-auto break-all pt-1 text-sm font-bold text-primary-strong underline-offset-4 hover:underline"
              >
                {t.link.label} <span aria-hidden>→</span>
              </a>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* Self-serve */}
      <section aria-labelledby="help-title" className="py-14 lg:py-20">
        <Container>
          <div className="flex flex-col items-start gap-5 rounded-[24px] bg-night px-6 py-10 text-white lg:flex-row lg:items-center lg:justify-between lg:px-14 lg:py-12">
            <div className="flex flex-col gap-2">
              <h2 id="help-title" className="text-[26px] font-extrabold leading-tight tracking-[-0.02em] lg:text-[34px]">
                Have a question about the product?
              </h2>
              <p className="max-w-[560px] text-base text-[#b6c4e0]">
                Most answers are already on the site: how the product works, how scores are built and how we handle your data.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {[
                { label: "Product tour", href: "/product" },
                { label: "How we assess", href: "/how-we-assess" },
                { label: "Privacy policy", href: "/privacy" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="inline-flex min-h-11 items-center rounded-xl border border-white/25 px-5 text-[15px] font-semibold text-white transition-colors hover:bg-white hover:text-ink"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
