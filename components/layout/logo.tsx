import Image from "next/image";
import Link from "next/link";

export function Logo({ className = "h-8 w-auto", priority }: { className?: string; priority?: boolean }) {
  return (
    <Link href="/" aria-label="GetHyre.ai home" className="inline-flex shrink-0 items-center">
      <Image src="/brand/logo.png" alt="GetHyre.ai" width={498} height={96} className={className} priority={priority} />
    </Link>
  );
}
