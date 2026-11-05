import type { ReactNode } from "react";
import { CheckIcon } from "@/components/icons";
import { Card, Container, Eyebrow, H1, Lead, cx } from "@/components/ui";
import type { PolicyBlock, PolicySection } from "@/content/privacy";

/* ---------- Inline markup: **bold** and [label](href) ---------- */

function Inline({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  const re = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    if (m[1]) {
      parts.push(
        <strong key={k++} className="font-semibold text-ink">
          {m[1]}
        </strong>,
      );
    } else {
      const external = /^https?:/.test(m[3]);
      parts.push(
        <a
          key={k++}
          href={m[3]}
          className="font-semibold text-primary underline-offset-4 hover:underline"
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {m[2]}
        </a>,
      );
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}

/* ---------- Blocks ---------- */

function PolicyTable({ columns, rows }: { columns: string[]; rows: string[][] }) {
  return (
    <>
      {/* Tablet and desktop: a real table */}
      <div className="hidden overflow-hidden rounded-[10px] border border-line md:block">
        <table className="w-full border-collapse text-left">
          <thead className="bg-surface">
            <tr>
              {columns.map((c) => (
                <th key={c} scope="col" className="px-4 py-3 text-[12px] font-bold uppercase tracking-[0.08em] text-muted lg:px-5">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r[0]} className="border-t border-line align-top">
                {r.map((cell, i) => (
                  <td
                    key={i}
                    className={cx(
                      "px-4 py-3.5 text-[15px] leading-relaxed lg:px-5",
                      i === 0 ? "w-[22%] font-semibold text-ink" : "text-body",
                    )}
                  >
                    <Inline text={cell} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Phones: one card per row */}
      <ul className="flex flex-col gap-3 md:hidden">
        {rows.map((r) => (
          <li key={r[0]} className="rounded-[10px] border border-line bg-white p-4">
            <p className="text-[15px] font-bold text-ink">
              <Inline text={r[0]} />
            </p>
            <dl className="mt-2.5 flex flex-col gap-2.5">
              {r.slice(1).map((cell, i) => (
                <div key={i}>
                  <dt className="text-[11px] font-bold uppercase tracking-[0.08em] text-muted">{columns[i + 1]}</dt>
                  <dd className="mt-0.5 text-[15px] leading-relaxed text-body">
                    <Inline text={cell} />
                  </dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>
    </>
  );
}

function Block({ block }: { block: PolicyBlock }) {
  switch (block.type) {
    case "p":
      return (
        <p className="text-base leading-[1.7] text-body lg:text-[17px]">
          <Inline text={block.text} />
        </p>
      );
    case "list":
      return (
        <ul className="flex flex-col gap-3">
          {block.items.map((item) => (
            <li key={item} className="flex gap-3 text-base leading-[1.7] text-body lg:text-[17px]">
              <span className="mt-[11px] size-1.5 shrink-0 rounded-[2px] bg-primary" aria-hidden />
              <span>
                <Inline text={item} />
              </span>
            </li>
          ))}
        </ul>
      );
    case "steps":
      return (
        <ol className="flex flex-col gap-3">
          {block.items.map((item, i) => (
            <li key={item} className="flex gap-3.5 text-base leading-[1.7] text-body lg:text-[17px]">
              <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md bg-tint text-[13px] font-bold text-primary">
                {i + 1}
              </span>
              <span>
                <Inline text={item} />
              </span>
            </li>
          ))}
        </ol>
      );
    case "note":
      return (
        <div className="rounded-[10px] border border-success/20 bg-success-tint px-5 py-4 text-[15px] leading-relaxed text-success-strong lg:text-base">
          <Inline text={block.text} />
        </div>
      );
    case "table":
      return <PolicyTable columns={block.columns} rows={block.rows} />;
  }
}

/* ---------- Page ---------- */

export function PolicyPage({
  title,
  intro,
  effective,
  updated,
  summary,
  sections,
  contact,
}: {
  title: string;
  intro: ReactNode;
  effective: string;
  updated: string;
  summary: string[];
  sections: PolicySection[];
  contact: { label: string; value: ReactNode }[];
}) {
  const num = (i: number) => String(i + 1).padStart(2, "0");
  const toc = (
    <ol className="flex flex-col">
      {sections.map((s, i) => (
        <li key={s.id}>
          <a
            href={`#${s.id}`}
            className="flex gap-3 rounded-md px-3 py-2 text-[14px] leading-snug text-body transition-colors hover:bg-surface hover:text-ink"
          >
            <span className="w-5 shrink-0 font-bold tabular-nums text-primary">{num(i)}</span>
            {s.title}
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden border-b border-line bg-white py-10 lg:py-16">
        <div className="bg-dots absolute inset-0 [mask-image:radial-gradient(ellipse_at_85%_20%,#000_10%,transparent_60%)]" aria-hidden />
        <Container className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,480px)] lg:items-end lg:gap-14">
          <div className="flex flex-col gap-4">
            <Eyebrow>Legal</Eyebrow>
            <H1>{title}</H1>
            <Lead className="max-w-[620px]">{intro}</Lead>
            <p className="text-sm text-muted lg:text-[15px]">
              Effective {effective} · Last updated {updated}
            </p>
          </div>
          <Card tone="tint" className="flex flex-col gap-4">
            <p className="text-[13px] font-bold uppercase tracking-[0.1em] text-primary">At a glance</p>
            <ul className="flex flex-col gap-3">
              {summary.map((s) => (
                <li key={s} className="flex gap-3 text-[15px] leading-relaxed text-ink lg:text-base">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-[4px] bg-primary text-white">
                    <CheckIcon size={12} />
                  </span>
                  {s}
                </li>
              ))}
            </ul>
          </Card>
        </Container>
      </section>

      {/* Body */}
      <section className="bg-white py-10 lg:py-16">
        <Container className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-16">
          {/* Contents: sticky on desktop, collapsible on phones */}
          <aside className="hidden lg:block">
            <nav aria-label="On this page" className="sticky top-28">
              <p className="px-3 pb-2 text-[13px] font-bold uppercase tracking-[0.1em] text-muted">On this page</p>
              {toc}
            </nav>
          </aside>
          <details className="group rounded-[10px] border border-line bg-surface lg:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3.5 text-[15px] font-bold text-ink">
              On this page
              <span className="text-primary transition-transform group-open:rotate-180" aria-hidden>
                ▾
              </span>
            </summary>
            <nav aria-label="On this page" className="border-t border-line px-1 py-2">
              {toc}
            </nav>
          </details>

          <div className="flex min-w-0 max-w-[860px] flex-col">
            {sections.map((s, i) => (
              <article
                key={s.id}
                id={s.id}
                className={cx("scroll-mt-24 flex flex-col gap-4", i > 0 && "mt-10 border-t border-line pt-10 lg:mt-12 lg:pt-12")}
              >
                <h2 className="flex items-baseline gap-3 text-[22px] font-extrabold leading-tight tracking-[-0.02em] text-ink lg:text-[28px]">
                  <span className="text-[15px] font-bold tabular-nums text-primary lg:text-[17px]">{num(i)}</span>
                  {s.title}
                </h2>
                {s.blocks.map((b, j) => (
                  <Block key={j} block={b} />
                ))}
                {s.id === "contact" ? (
                  <Card tone="surface" className="mt-1">
                    <dl className="grid gap-5 sm:grid-cols-2">
                      {contact.map((c) => (
                        <div key={c.label}>
                          <dt className="text-[12px] font-bold uppercase tracking-[0.08em] text-muted">{c.label}</dt>
                          <dd className="mt-1 text-base leading-relaxed text-ink">{c.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </Card>
                ) : null}
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
