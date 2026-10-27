import type { ReactNode } from "react";
import { CheckIcon, DownloadIcon, FileIcon, PlayIcon, PlusIcon, featureIcons, type FeatureIconName } from "@/components/icons";
import { ArrowLink, ButtonLink, Card, Container, Eyebrow, H1, Lead, cx } from "@/components/ui";
import { site } from "@/lib/site";

/* ---------- Page hero (inner pages) ---------- */

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
              <span className="flex size-11 items-center justify-center rounded-xl bg-tint text-primary">
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

/* ---------- Simple text cards (problem section etc.) ---------- */

export function TextCards({ items, tone = "white" }: { items: { title: string; body: string }[]; tone?: "white" | "surface" }) {
  return (
    <ul className="mt-8 grid gap-3 md:grid-cols-3 lg:mt-10 lg:gap-5">
      {items.map((c) => (
        <li key={c.title}>
          <Card tone={tone} className="flex h-full flex-col gap-2.5">
            <h3 className="text-lg font-bold text-ink lg:text-xl">{c.title}</h3>
            <p className="text-[15px] leading-relaxed text-body lg:text-base">{c.body}</p>
          </Card>
        </li>
      ))}
    </ul>
  );
}

/* ---------- Numbered steps ---------- */

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
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-[15px] font-bold text-white">
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

/* ---------- Check-mark bullets ---------- */

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

/* ---------- Download card ---------- */

export function DownloadCard({ title, meta, href }: { title: string; meta: string; href: string | null }) {
  const body = (
    <>
      <span className="flex size-11 shrink-0 items-center justify-center rounded-[10px] bg-tint text-primary">
        <FileIcon size={22} />
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="text-base font-bold text-ink">{title}</span>
        <span className="text-[13px] text-muted">{href ? meta : `${meta} · Available soon`}</span>
      </span>
      {href ? <DownloadIcon size={22} className="shrink-0 text-primary" /> : null}
    </>
  );
  const classes = "flex w-full max-w-[460px] items-center gap-3.5 rounded-[14px] border border-line bg-white px-[18px] py-4";
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

/* ---------- FAQ ---------- */

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="flex flex-col">
      {items.map((item) => (
        <details key={item.q} className="group border-b border-line last:border-b-0">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-base font-bold text-ink lg:py-6 lg:text-lg">
            {item.q}
            <PlusIcon size={20} className="shrink-0 text-primary transition-transform group-open:rotate-45" />
          </summary>
          <p className="-mt-1 pb-5 text-[15px] leading-relaxed text-body lg:pb-6 lg:text-base">{item.a}</p>
        </details>
      ))}
    </div>
  );
}

/* ---------- Blue call-to-action band ---------- */

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
        <div className="flex flex-col gap-6 rounded-[24px] bg-primary p-7 text-white lg:flex-row lg:items-center lg:justify-between lg:rounded-[28px] lg:p-14">
          <div className="flex max-w-[680px] flex-col gap-3">
            <h2 className="text-[26px] font-extrabold leading-tight tracking-[-0.02em] lg:text-[44px] lg:leading-[1.1]">{title}</h2>
            <p className="text-[15px] leading-relaxed text-sky lg:text-[17px]">{body}</p>
          </div>
          <ButtonLink href={href} variant="light" track={track} className="w-full shrink-0 lg:w-auto">
            {cta}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}

/* ---------- Demo video ---------- */

export function DemoVideo() {
  if (site.demoVideoUrl) {
    return (
      <div className="aspect-video w-full overflow-hidden rounded-[18px] bg-ink-soft lg:rounded-[24px]">
        <iframe
          src={site.demoVideoUrl}
          title="GetHyre.ai 60-second walkthrough"
          loading="lazy"
          allow="accelerometer; encrypted-media; picture-in-picture"
          allowFullScreen
          className="size-full"
        />
      </div>
    );
  }
  return (
    <div className="flex aspect-video w-full flex-col items-center justify-center gap-3 rounded-[18px] bg-ink-soft text-center lg:gap-4 lg:rounded-[24px]">
      <span className="flex size-16 items-center justify-center rounded-full bg-white text-ink lg:size-22">
        <PlayIcon size={28} />
      </span>
      <p className="text-[15px] font-bold text-white lg:text-xl">Watch the 60-second walkthrough</p>
      <p className="hidden text-sm text-subtle sm:block">[Demo video coming soon]</p>
    </div>
  );
}

/* ---------- Placeholder photo ---------- */

export function PhotoPlaceholder({ label = "[Photo]", className }: { label?: string; className?: string }) {
  return (
    <div className={cx("flex items-center justify-center rounded-[16px] bg-sky text-sm text-body", className)}>{label}</div>
  );
}

/* ---------- Contact / audience link card ---------- */

export function LinkCard({
  kicker,
  title,
  link,
  href,
  tone = "white",
}: {
  kicker: string;
  title: string;
  link: string;
  href: string;
  tone?: "white" | "primary";
}) {
  const primary = tone === "primary";
  return (
    <Card tone={primary ? "primary" : "white"} className="flex h-full min-h-[220px] flex-col gap-3.5 lg:min-h-[260px] lg:p-8">
      <p className={cx("text-[13px] font-bold uppercase tracking-[0.1em]", primary ? "text-sky" : "text-muted")}>{kicker}</p>
      <p className={cx("text-[21px] font-extrabold leading-tight lg:text-2xl", primary ? "text-white" : "text-ink")}>{title}</p>
      <div className="mt-auto">
        {primary ? (
          <a href={href} className="inline-flex items-center gap-1 text-[15px] font-bold text-white underline-offset-4 hover:underline lg:text-base">
            {link} <span aria-hidden>→</span>
          </a>
        ) : (
          <ArrowLink href={href}>{link}</ArrowLink>
        )}
      </div>
    </Card>
  );
}
