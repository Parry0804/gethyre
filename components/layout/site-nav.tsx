"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronRightIcon, CloseIcon, MenuIcon } from "@/components/icons";
import { Logo } from "@/components/layout/logo";
import { AppBadge } from "@/components/layout/app-badge";
import { ButtonLink, cx } from "@/components/ui";
import { mainNav, whatsappLink } from "@/lib/site";

const mobileLinks = [
  { href: "/product", label: "Product" },
  { href: "/students", label: "For students" },
  { href: "/colleges", label: "For colleges" },
  { href: "/companies", label: "For companies" },
  { href: "/about", label: "About" },
  { href: "/guides", label: "Guides" },
];

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openedAt, setOpenedAt] = useState(pathname);
  const menuButton = useRef<HTMLButtonElement>(null);
  const wa = whatsappLink();

  // Close the menu whenever the route changes.
  if (open && openedAt !== pathname) {
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => !href.startsWith("/#") && pathname.startsWith(href);

  return (
    // No backdrop-filter here: it would turn the header into the containing block
    // for the fixed full-screen mobile menu and clip it to the header's height.
    <header className="sticky top-0 z-40 border-b border-line bg-surface">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:font-semibold"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-16 w-full max-w-[1240px] items-center justify-between gap-6 px-5 lg:h-[76px] lg:px-6">
        <Logo className="h-7 w-auto lg:h-8" priority />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cx(
                    "text-[15px] font-medium transition-colors hover:text-primary",
                    isActive(item.href) ? "text-primary" : "text-ink",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <ButtonLink href="/early-access" className="min-h-11 px-5 text-[15px]" track="nav">
            Get early access
          </ButtonLink>
        </div>

        <button
          ref={menuButton}
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-xl border border-line bg-white text-ink lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="Open menu"
          onClick={() => {
            setOpenedAt(pathname);
            setOpen(true);
          }}
        >
          <MenuIcon size={22} />
        </button>
      </div>

      {open ? (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-white lg:hidden"
        >
          <div className="flex h-16 items-center justify-between px-5">
            <Logo className="h-7 w-auto" />
            <button
              type="button"
              autoFocus
              className="inline-flex size-11 items-center justify-center rounded-xl bg-surface text-ink"
              aria-label="Close menu"
              onClick={() => {
                setOpen(false);
                menuButton.current?.focus();
              }}
            >
              <CloseIcon size={22} />
            </button>
          </div>
          <nav aria-label="Mobile" className="px-5 pt-4">
            <ul>
              {mobileLinks.map((item) => (
                <li key={item.href} className="border-b border-line">
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between py-[18px] text-xl font-semibold text-ink"
                  >
                    {item.label}
                    <ChevronRightIcon size={20} className="text-subtle" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex flex-col items-start gap-4 px-5 pb-10 pt-7">
            <ButtonLink href="/early-access" className="w-full" track="mobile-menu">
              Get early access
            </ButtonLink>
            <AppBadge />
            {wa ? (
              <a href={wa} target="_blank" rel="noopener noreferrer" className="text-[15px] font-semibold text-success">
                Questions? Chat with us on WhatsApp
              </a>
            ) : null}
          </div>
        </div>
      ) : null}
    </header>
  );
}
