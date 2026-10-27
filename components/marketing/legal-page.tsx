import type { ReactNode } from "react";
import { Container, Eyebrow } from "@/components/ui";

export function LegalPage({
  title,
  updated,
  sections,
}: {
  title: string;
  updated: string;
  sections: { heading: string; body: ReactNode }[];
}) {
  return (
    <section className="bg-white py-10 lg:py-18">
      <Container className="max-w-[880px] lg:px-6">
        <Eyebrow>Legal</Eyebrow>
        <h1 className="mt-3 text-[34px] font-extrabold tracking-[-0.025em] lg:text-5xl">{title}</h1>
        <p className="mt-2 text-sm text-muted lg:text-[15px]">Last updated {updated}</p>
        <div className="mt-8 flex flex-col gap-7 lg:mt-10">
          {sections.map((s) => (
            <div key={s.heading} className="flex flex-col gap-2">
              <h2 className="text-[19px] font-bold lg:text-[22px]">{s.heading}</h2>
              <div className="text-base leading-[1.65] text-body lg:text-[17px]">{s.body}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
