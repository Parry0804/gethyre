import type { Metadata } from "next";
import { FeatureCards, LinkCard, PhotoPlaceholder } from "@/components/marketing/blocks";
import { PhotoBand } from "@/components/marketing/photos";
import { Container, Eyebrow, H1, Lead, Section, SectionHeader } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "GetHyre.ai exists to shorten the path from campus to first job: an honest diagnosis, focused training on real gaps, and placement matched to what each student can do.",
  alternates: { canonical: "/about" },
};

const team = [
  { name: "Pranay Pawar", role: "Co-founder · Product and design" },
  { name: "[Co-founder name]", role: "Co-founder · AI product" },
  { name: "[Team member]", role: "[Role]" },
  { name: "[Team member]", role: "[Role]" },
];

export default function AboutPage() {
  return (
    <>
      <section className="py-10 lg:py-24">
        <Container className="flex flex-col gap-5">
          <Eyebrow>About GetHyre.ai</Eyebrow>
          <H1 className="max-w-[1000px] lg:text-[64px]">Every student who is ready to work should find work.</H1>
          <Lead className="max-w-[820px] lg:text-xl">
            GetHyre.ai exists to shorten the path from campus to first job: an honest diagnosis, focused training on real
            gaps, and placement matched to what each student can actually do.
          </Lead>
        </Container>
      </section>

      <PhotoBand names={["classroom", "campusLawn", "youngProfessional"]} />

      <Section tone="white" labelledBy="story-title">
        <div className="grid gap-6 lg:grid-cols-[420px_minmax(0,1fr)] lg:gap-18">
          <SectionHeader id="story-title" eyebrow="Why we started" title="We've seen placement season up close." />
          <div className="flex flex-col gap-4 text-base leading-[1.65] text-body lg:text-lg">
            <p>[Paragraph 1: the team&apos;s years of coaching and placement work with students, and what you kept seeing go wrong.]</p>
            <p>[Paragraph 2: why a single connected journey (diagnose, train, place) fixes what scattered tools don&apos;t.]</p>
            <p>[Paragraph 3: what you&apos;re building with partner colleges this year.]</p>
          </div>
        </div>
      </Section>

      <Section labelledBy="beliefs-title">
        <SectionHeader id="beliefs-title" eyebrow="What we believe" title="Three ideas behind everything we build." />
        <FeatureCards
          items={[
            { title: "Honesty first", body: "A real report beats false confidence. We show students exactly where they stand.", icon: "target" },
            { title: "One path, not ten apps", body: "Diagnosis, training and placement belong in one connected journey.", icon: "arrow" },
            { title: "Colleges as partners", body: "Placement cells know their students best. We build with them, not around them.", icon: "check" },
          ]}
        />
      </Section>

      <Section tone="white" labelledBy="team-title">
        <SectionHeader id="team-title" eyebrow="The team" title="The people building GetHyre.ai." />
        <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-6 lg:mt-10 lg:grid-cols-4 lg:gap-5">
          {team.map((p, i) => (
            <li key={`${p.name}-${i}`} className="flex flex-col gap-2">
              <PhotoPlaceholder className="aspect-[4/5] lg:aspect-square" />
              <p className="pt-1 text-[15px] font-bold lg:text-lg">{p.name}</p>
              <p className="text-[13px] text-muted lg:text-[15px]">{p.role}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="contact" labelledBy="contact-title">
        <SectionHeader id="contact-title" eyebrow="Get in touch" title="Talk to us." />
        <ul className="mt-8 grid gap-3 md:grid-cols-2 lg:mt-10 lg:grid-cols-4 lg:gap-5">
          <li>
            <LinkCard kicker="Students" title="Get your skill report when your campus goes live." link="Get early access" href="/early-access" />
          </li>
          <li>
            <LinkCard kicker="Colleges" title="Bring GetHyre.ai to your placement cell." link="Book a partnership call" href="/colleges#book-a-call" />
          </li>
          <li>
            <LinkCard kicker="Companies" title="Hire assessed freshers from partner campuses." link="Register hiring interest" href="/companies#register" />
          </li>
          <li>
            <LinkCard
              kicker="Everyone else"
              title={`${site.contact.email} · ${site.contact.city}, India`}
              link="Email us"
              href={`mailto:${site.contact.email}`}
            />
          </li>
        </ul>
      </Section>
    </>
  );
}
