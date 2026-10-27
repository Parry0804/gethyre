import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/* ---------- Layout ---------- */

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cx("mx-auto w-full max-w-[1240px] px-5 lg:px-6", className)}>{children}</div>;
}

type SectionTone = "surface" | "white" | "ink" | "none";

const toneClass: Record<SectionTone, string> = {
  surface: "bg-surface",
  white: "bg-white",
  ink: "bg-ink text-white",
  none: "",
};

export function Section({
  id,
  tone = "none",
  className,
  innerClassName,
  children,
  labelledBy,
}: {
  id?: string;
  tone?: SectionTone;
  className?: string;
  innerClassName?: string;
  children: ReactNode;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cx("scroll-mt-20 py-14 lg:py-22", toneClass[tone], className)}
    >
      <Container className={innerClassName}>{children}</Container>
    </section>
  );
}

/* ---------- Type ---------- */

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cx("text-[13px] font-bold uppercase tracking-[0.1em] text-primary lg:text-sm", className)}>
      {children}
    </p>
  );
}

export function H1({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h1
      className={cx(
        "text-[40px] font-extrabold leading-[1.06] tracking-[-0.03em] text-ink lg:text-[56px]",
        className,
      )}
    >
      {children}
    </h1>
  );
}

export function H2({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <h2
      id={id}
      className={cx(
        "text-[30px] font-extrabold leading-[1.12] tracking-[-0.025em] lg:text-[44px] lg:leading-[1.1]",
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function Lead({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cx("text-[17px] leading-relaxed text-body lg:text-[19px]", className)}>{children}</p>;
}

/** Eyebrow + heading + optional intro, the standard section opener. */
export function SectionHeader({
  eyebrow,
  title,
  intro,
  id,
  invert,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  id?: string;
  invert?: boolean;
  className?: string;
}) {
  return (
    <div className={cx("flex max-w-3xl flex-col gap-3", className)}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <H2 id={id} className={invert ? "text-white" : "text-ink"}>
        {title}
      </H2>
      {intro ? (
        <p className={cx("text-base leading-relaxed lg:text-lg", invert ? "text-subtle" : "text-body")}>{intro}</p>
      ) : null}
    </div>
  );
}

/* ---------- Buttons ---------- */

type ButtonVariant = "primary" | "secondary" | "light" | "whatsapp";

const variantClass: Record<ButtonVariant, string> = {
  primary: "bg-primary text-white hover:bg-primary-strong",
  secondary: "border-[1.5px] border-primary bg-white text-primary hover:bg-tint",
  light: "bg-white text-primary hover:bg-tint",
  whatsapp: "bg-whatsapp text-white hover:bg-success-strong",
};

const buttonBase =
  "inline-flex min-h-[52px] items-center justify-center gap-2 rounded-[14px] px-6 text-base font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60";

type ButtonLinkProps = {
  href: string;
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
  /** Name sent to analytics as the CTA location. */
  track?: string;
  external?: boolean;
};

export function ButtonLink({ href, variant = "primary", className, children, track, external }: ButtonLinkProps) {
  const classes = cx(buttonBase, variantClass[variant], className);
  if (external) {
    return (
      <a href={href} className={classes} data-cta={track} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} data-cta={track}>
      {children}
    </Link>
  );
}

export function Button({
  variant = "primary",
  className,
  ...props
}: ComponentProps<"button"> & { variant?: ButtonVariant }) {
  return <button className={cx(buttonBase, variantClass[variant], className)} {...props} />;
}

/** Text link with an arrow, used inside cards. */
export function ArrowLink({
  href,
  children,
  className,
  external,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
}) {
  const classes = cx(
    "inline-flex items-center gap-1 text-[15px] font-bold text-primary-strong underline-offset-4 hover:underline lg:text-base",
    className,
  );
  const content = (
    <>
      {children}
      <span aria-hidden>→</span>
    </>
  );
  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}

/* ---------- Small pieces ---------- */

export function Pill({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cx("inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold", className)}>
      {children}
    </span>
  );
}

export function Card({
  children,
  className,
  tone = "white",
}: {
  children: ReactNode;
  className?: string;
  tone?: "white" | "surface" | "tint" | "primary" | "ink";
}) {
  const tones = {
    white: "bg-white",
    surface: "bg-surface",
    tint: "bg-tint",
    primary: "bg-primary text-white",
    ink: "bg-ink text-white",
  };
  return <div className={cx("rounded-[16px] p-6 lg:p-7", tones[tone], className)}>{children}</div>;
}
