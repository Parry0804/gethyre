import type { ReactNode } from "react";
import { CheckIcon, DownloadIcon, FileIcon, featureIcons, type FeatureIconName } from "@/components/icons";
import { ButtonLink, Card, Container, Eyebrow, H1, Lead, cx } from "@/components/ui";

export function PageHero({
  eyebrow,
  title,
  intro,
  actions,
  aside,
}: {
  eyebrow: string;
  title: ReactNode;
  intro: ReactNode;
  actions?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden py-10 lg:py-18">
      <div className="bg-dots absolute inset-0 [mask-image:radial-gradient(ellipse_at_80%_20%,#000_15%,transparent_65%)]" aria-hidden />
      <Container className="relative grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-14">
        <div className="flex max-w-[620px] flex-col gap-5">
          <Eyebrow>{eyebrow}</Eyebrow>
          <H1>{title}</H1>
          <Lead>{intro}</Lead>
          {actions ? <div className="flex flex-col gap-3 pt-1 sm:flex-row">{actions}</div> : null}
        </div>
        {aside ? <div className="flex justify-center lg:justify-end">{aside}</div> : null}
      </Container>
    </section>
  );
}

/* ---------- Feature cards ---------- */

export type Feature = { title: string; body: string; icon?: FeatureIconName };

export function FeatureCards({
  items,
  tone = "white",
  columns = 3,
}: {
  items: Feature[];
  tone?: "white" | "surface";
  columns?: 3 | 4;
}) {
  return (
    <ul className={cx("mt-8 grid gap-3 lg:mt-10 lg:gap-5", columns === 4 ? "md:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-3")}>
      {items.map((f) => {
        const Icon = featureIcons[f.icon ?? "check"];
        return (
          <li key={f.title}>
            <Card tone={tone} className="flex h-full flex-col gap-3">
              <span className="flex size-11 items-center justify-center rounded-lg bg-tint text-primary">
                <Icon size={22} />
              </span>
              <h3 className="text-lg font-bold text-ink lg:text-xl">{f.title}</h3>
              <p className="text-[15px] leading-relaxed text-body lg:text-base">{f.body}</p>
            </Card>
          </li>
        );
      })}
    </ul>
  );
}

export function NumberedSteps({
  items,
  tone = "white",
}: {
  items: { title: string; body: string }[];
  tone?: "white" | "surface";
}) {
  return (
    <ol
      className={cx(
        "mt-8 grid gap-3 lg:mt-10 lg:gap-5",
        items.length === 4 ? "md:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-3",
      )}
    >
      {items.map((s, i) => (
        <li key={s.title}>
          <Card tone={tone} className="flex h-full gap-4 lg:flex-col lg:gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary text-[15px] font-bold text-white">
              {i + 1}
            </span>
            <span className="flex flex-col gap-1.5">
              <h3 className="text-[17px] font-bold text-ink lg:text-[19px]">{s.title}</h3>
              <p className="text-sm leading-relaxed text-body lg:text-[15px]">{s.body}</p>
            </span>
          </Card>
        </li>
      ))}
    </ol>
  );
}

export function Bullets({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={cx("flex flex-col gap-3", className)}>
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-[15px] leading-normal text-body lg:text-base">
          <CheckIcon size={20} className="mt-0.5 shrink-0 text-primary" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function DownloadCard({ title, meta, href }: { title: string; meta: string; href: string | null }) {
  const body = (
    <>
      <span className="flex size-11 shrink-0 items-center justify-center rounded-md bg-tint text-primary">
        <FileIcon size={22} />
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="text-base font-bold text-ink">{title}</span>
        <span className="text-[13px] text-muted">{href ? meta : `${meta} · Available soon`}</span>
      </span>
      {href ? <DownloadIcon size={22} className="shrink-0 text-primary" /> : null}
    </>
  );
  const classes = "flex w-full max-w-[460px] items-center gap-3.5 rounded-lg border border-line bg-white px-[18px] py-4";
  return href ? (
    <a href={href} download className={cx(classes, "transition-colors hover:border-primary")} data-cta={`download-${title}`}>
      {body}
    </a>
  ) : (
    <div className={classes} aria-disabled>
      {body}
    </div>
  );
}

export function CtaBand({
  title,
  body,
  cta,
  href,
  track,
}: {
  title: string;
  body: string;
  cta: string;
  href: string;
  track?: string;
}) {
  return (
    <section className="pb-14 lg:pb-22">
      <Container>
        <div className="flex flex-col gap-6 rounded-[12px] bg-primary p-7 text-white lg:flex-row lg:items-center lg:justify-between lg:rounded-[12px] lg:p-14">
          <div className="flex max-w-[680px] flex-col gap-3">
            <h2 className="text-[26px] font-extrabold leading-tight tracking-[-0.02em] lg:text-[44px] lg:leading-[1.1]">{title}</h2>
            <p className="text-[15px] leading-relaxed text-white lg:text-[17px]">{body}</p>
          </div>
          <ButtonLink href={href} variant="light" track={track} className="w-full shrink-0 lg:w-auto">
            {cta}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}

