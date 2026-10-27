import type { Metadata } from "next";
import { ButtonLink, Container, Eyebrow, H1, Lead, cx } from "@/components/ui";

export const metadata: Metadata = {
  title: "Guides",
  description: "Free guides on placement interviews, fresher CVs, aptitude and the skills each role needs.",
  alternates: { canonical: "/guides" },
};

const categories = ["All", "Interviews", "CV and profile", "Aptitude", "Role guides", "For placement cells"];

const articles = [
  { category: "Interviews", title: "How to answer “Tell me about a project” in a campus interview" },
  { category: "CV and profile", title: "The one-page fresher CV that passes ATS checks" },
  { category: "Role guides", title: "Skills a junior data analyst needs in [year]" },
  { category: "Aptitude", title: "A 4-week aptitude plan for placement season" },
  { category: "Interviews", title: "HR round questions and how to structure your answers" },
  { category: "For placement cells", title: "Measuring batch readiness before placement drives" },
];

/** Guides index. Articles are placeholders until the first ones are written. */
export default function GuidesPage() {
  return (
    <>
      <section className="pb-8 pt-10 lg:pb-14 lg:pt-20">
        <Container className="flex flex-col gap-5">
          <Eyebrow>Guides</Eyebrow>
          <H1 className="max-w-[900px]">Placement prep, explained simply.</H1>
          <Lead className="max-w-[720px]">
            Free guides on interviews, CVs and the skills each role needs. Written by the GetHyre.ai team.
          </Lead>
          <ul className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 lg:mx-0 lg:flex-wrap lg:px-0" aria-label="Categories">
            {categories.map((c, i) => (
              <li key={c} className="shrink-0">
                <span
                  className={cx(
                    "inline-flex rounded-full px-4 py-2 text-sm font-semibold",
                    i === 0 ? "bg-ink text-white" : "border border-line bg-white text-ink",
                  )}
                >
                  {c}
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="pb-14 lg:pb-22" aria-label="Articles">
        <Container>
          <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {articles.map((a) => (
              <li key={a.title}>
                <article className="flex h-full flex-col overflow-hidden rounded-[20px] bg-white">
                  <div className="flex h-44 items-center justify-center bg-sky text-[13px] text-body lg:h-50">[Cover image]</div>
                  <div className="flex flex-1 flex-col gap-2.5 p-5 lg:p-6">
                    <p className="text-xs font-bold uppercase tracking-[0.08em] text-primary lg:text-[13px]">{a.category}</p>
                    <h2 className="text-lg font-bold leading-snug lg:text-xl">{a.title}</h2>
                    <p className="mt-auto pt-1 text-sm text-muted">[N] min read · Coming soon</p>
                  </div>
                </article>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex flex-col gap-5 rounded-[24px] bg-tint p-6 lg:flex-row lg:items-center lg:justify-between lg:p-10">
            <div className="flex flex-col gap-1.5">
              <h2 className="text-[21px] font-extrabold tracking-[-0.01em] lg:text-2xl">New guides every week</h2>
              <p className="text-[15px] text-body lg:text-base">Join early access and we&apos;ll send them to you.</p>
            </div>
            <ButtonLink href="/early-access" className="w-full lg:w-auto" track="guides">
              Join early access
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
