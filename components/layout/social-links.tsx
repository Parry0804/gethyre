import { IconBrandInstagram, IconBrandLinkedin, IconBrandYoutube } from "@tabler/icons-react";
import { cx } from "@/components/ui";
import { site } from "@/lib/site";

const all = [
  { key: "instagram", label: "GetHyre.ai on Instagram", Icon: IconBrandInstagram },
  { key: "linkedin", label: "GetHyre.ai on LinkedIn", Icon: IconBrandLinkedin },
  { key: "youtube", label: "GetHyre.ai on YouTube", Icon: IconBrandYoutube },
] as const;

/** Round social icon buttons. Only networks with a link in site config are shown. */
export function SocialLinks({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  const links = all.filter((s) => site.social[s.key]);
  if (links.length === 0) return null;
  return (
    <ul className={cx("flex items-center gap-2.5", className)}>
      {links.map(({ key, label, Icon }) => (
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
            <Icon size={20} stroke={1.8} aria-hidden />
          </a>
        </li>
      ))}
    </ul>
  );
}
