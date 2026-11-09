import type { ReactNode } from "react";
import { cx } from "@/components/ui";
import { site } from "@/lib/site";

/* Outline icons from Tabler Icons (MIT licence), inlined so they ship no JavaScript. */
const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" } as const;
const icons: Record<"instagram" | "linkedin" | "youtube", ReactNode> = {
  instagram: (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden {...stroke}>
      <path d="M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4l0 -10" />
      <path d="M8.5 12a3.5 3.5 0 1 0 7 0a3.5 3.5 0 0 0 -7 0" />
      <path d="M17 7v.01" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden {...stroke}>
      <path d="M8 11v5" />
      <path d="M8 8v.01" />
      <path d="M12 16v-5" />
      <path d="M16 16v-3a2 2 0 1 0 -4 0" />
      <path d="M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4l0 -10" />
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden {...stroke}>
      <path d="M2 8a4 4 0 0 1 4 -4h12a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-12a4 4 0 0 1 -4 -4v-8" />
      <path d="M10 9l5 3l-5 3l0 -6" />
    </svg>
  ),
};

const networks = [
  { key: "instagram", label: "GetHyre.ai on Instagram" },
  { key: "linkedin", label: "GetHyre.ai on LinkedIn" },
  { key: "youtube", label: "GetHyre.ai on YouTube" },
] as const;

/** Round social icon buttons. Only networks with a link in site config are shown. */
export function SocialLinks({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  const links = networks.filter((s) => site.social[s.key]);
  if (links.length === 0) return null;
  return (
    <ul className={cx("flex items-center gap-2.5", className)}>
      {links.map(({ key, label }) => (
        <li key={key}>
          <a
            href={site.social[key]}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            data-cta={`social-${key}`}
            className={cx(
              "flex size-10 items-center justify-center rounded-full border transition-colors",
              tone === "light"
                ? "border-line bg-white text-ink hover:border-primary hover:bg-primary hover:text-white"
                : "border-white/25 text-white hover:bg-white hover:text-ink",
            )}
          >
            {icons[key]}
          </a>
        </li>
      ))}
    </ul>
  );
}
