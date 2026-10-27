import Link from "next/link";
import Image from "next/image";
import { AppBadge } from "@/components/layout/app-badge";
import { footerNav, site, whatsappLink } from "@/lib/site";

export function SiteFooter() {
  const social = [
    { label: "Instagram", href: site.social.instagram },
    { label: "LinkedIn", href: site.social.linkedin },
    { label: "YouTube", href: site.social.youtube },
  ].filter((s) => s.href);
  const wa = whatsappLink();

  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto w-full max-w-[1240px] px-5 pb-7 pt-12 lg:px-6 lg:pt-16">
        <div className="grid gap-8 lg:grid-cols-[340px_repeat(4,minmax(0,1fr))] lg:gap-12">
          <div className="flex flex-col items-start gap-4">
            <Link href="/" aria-label="GetHyre.ai home">
              <Image src="/brand/logo.png" alt="GetHyre.ai" width={498} height={96} className="h-8 w-auto" />
            </Link>
            <p className="max-w-[320px] text-[15px] leading-relaxed text-body">{site.tagline}</p>
            <AppBadge />
            {social.length > 0 ? (
              <ul className="flex gap-4">
                {social.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-primary-strong hover:underline"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <div className="grid grid-cols-2 gap-8 lg:col-span-4 lg:grid-cols-4 lg:gap-12">
            {footerNav.map((group) => (
              <nav key={group.title} aria-label={group.title}>
                <h2 className="text-xs font-bold uppercase tracking-[0.08em] text-muted">{group.title}</h2>
                <ul className="mt-3 flex flex-col gap-3">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-[15px] text-ink hover:text-primary">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-line pt-6 text-sm lg:flex-row lg:items-center lg:justify-between">
          <p className="text-muted">
            © {site.copyrightYear} {site.contact.companyName} · {site.contact.city}, India
          </p>
          <p className="flex flex-wrap gap-x-6 gap-y-1 font-medium text-ink">
            <a href={`mailto:${site.contact.email}`} className="hover:text-primary">
              {site.contact.email}
            </a>
            {wa ? (
              <a href={wa} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                WhatsApp
              </a>
            ) : (
              <span>WhatsApp [number]</span>
            )}
          </p>
        </div>
      </div>
    </footer>
  );
}
