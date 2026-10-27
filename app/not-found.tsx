import Link from "next/link";
import { ButtonLink, Container } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="py-18 lg:py-30">
      <Container className="flex flex-col items-center gap-4 text-center lg:gap-5">
        <p className="text-[88px] font-extrabold leading-none tracking-[-0.04em] text-sky lg:text-[120px]">404</p>
        <h1 className="text-[32px] font-extrabold leading-[1.15] tracking-[-0.025em] lg:text-5xl">This page is still in training.</h1>
        <p className="max-w-[600px] text-base leading-relaxed text-body lg:text-[19px]">
          We couldn&apos;t find the page you were looking for. It may have moved, or the link may be wrong.
        </p>
        <div className="mt-2 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <ButtonLink href="/">Go to the homepage</ButtonLink>
          <ButtonLink href="/early-access" variant="secondary">
            Join early access
          </ButtonLink>
        </div>
        <ul className="mt-3 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[15px] font-semibold text-primary-strong lg:text-base">
          <li><Link href="/students">For students</Link></li>
          <li><Link href="/colleges">For colleges</Link></li>
          <li><Link href="/companies">For companies</Link></li>
          <li><Link href="/#faq">FAQ</Link></li>
        </ul>
      </Container>
    </section>
  );
}
