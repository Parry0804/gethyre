import type { Metadata } from "next";
import { DownloadCard } from "@/components/marketing/blocks";
import { Container, Eyebrow, H1, Lead, Section, SectionHeader } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Press kit",
  description: "GetHyre.ai in a line and a paragraph, logos, app screens, founder photos and the media contact.",
  alternates: { canonical: "/press" },
};

export default function PressPage() {
  const d = site.downloads;
  return (
    <>
      <section className="pb-10 pt-10 lg:pb-14 lg:pt-20">
        <Container className="flex flex-col gap-5">
          <Eyebrow>Press kit</Eyebrow>
          <H1 className="max-w-[900px]">Writing about GetHyre.ai?</H1>
          <Lead className="max-w-[720px]">
            Everything you need in one place: our story in a line and a paragraph, logos, app screens and founder photos.
          </Lead>
        </Container>
      </section>

      <Section tone="white" labelledBy="about-title">
        <div className="grid gap-8 lg:grid-cols-[400px_minmax(0,1fr)] lg:gap-16">
          <div className="flex flex-col gap-3">
            <Eyebrow>In a line</Eyebrow>
            <p id="about-title" className="text-[22px] font-extrabold leading-tight lg:text-[26px]">
              GetHyre.ai is an AI placement journey for college students.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Eyebrow>In a paragraph</Eyebrow>
            <p className="max-w-[640px] text-base leading-[1.65] text-body lg:text-[17px]">
              GetHyre.ai helps college students get placed faster. Students take a role-specific skill assessment and an AI
              mock interview, get a detailed skill report, follow a roadmap built from their gaps, and are matched to jobs by
              their assessed skills. GetHyre.ai works with colleges and hiring companies across India. [Founded year, city,
              founders.]
            </p>
          </div>
        </div>
      </Section>

      <Section labelledBy="assets-title">
        <SectionHeader id="assets-title" eyebrow="Downloads" title="Logos, screens and photos." />
        <div className="mt-8 grid gap-3 md:grid-cols-2 lg:mt-10 lg:gap-5">
          {[d.logoPack, d.appScreens, d.founderPhotos, d.brandGuidelines].map((f) => (
            <DownloadCard key={f.title} {...f} />
          ))}
        </div>
      </Section>

      <Section tone="white" labelledBy="media-title" className="lg:py-16">
        <div className="flex flex-col gap-2.5">
          <Eyebrow>Media contact</Eyebrow>
          <p id="media-title" className="text-lg font-bold lg:text-[22px]">
            [Name] ·{" "}
            <a href={`mailto:${site.contact.pressEmail}`} className="text-primary-strong underline">
              {site.contact.pressEmail}
            </a>{" "}
            · [phone]
          </p>
        </div>
      </Section>
    </>
  );
}
