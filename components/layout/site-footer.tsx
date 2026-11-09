import Link from "next/link";
import Image from "next/image";
import { SocialLinks } from "@/components/layout/social-links";
import { StoreButtons } from "@/components/layout/store-buttons";
import { footerNav, site, whatsappLink } from "@/lib/site";

export function SiteFooter() {
  const wa = whatsappLink();

  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto w-full max-w-[1440px] px-5 pb-7 pt-12 lg:px-10 xl:px-14 lg:pt-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,2fr)] lg:gap-16">
          <div className="flex flex-col items-start gap-4">
            <Link href="/" aria-label="GetHyre.ai home">
              <Image src="/brand/logo.png" alt="GetHyre.ai" width={623} height={160} className="h-10 w-auto" />
            </Link>
            <p className="max-w-[320px] text-[15px] leading-relaxed text-body">{site.tagline}</p>
            <StoreButtons />
            <SocialLinks />
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:gap-12">
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
            ) : null}
          </p>
        </div>
      </div>
    </footer>
  );
}
