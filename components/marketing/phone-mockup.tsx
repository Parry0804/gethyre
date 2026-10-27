import Image from "next/image";
import { cx } from "@/components/ui";

/**
 * A phone frame holding a real app screen exported from Figma (780×1688, 2×).
 * `width` is the frame width in CSS px; the screen keeps the 390×844 ratio.
 */
export function PhoneMockup({
  src,
  alt,
  width = 300,
  priority,
  className,
  frame = "ink",
}: {
  src: string;
  alt: string;
  width?: number;
  priority?: boolean;
  className?: string;
  frame?: "ink" | "soft";
}) {
  const pad = Math.round(width * 0.04);
  const inner = width - pad * 2;
  return (
    <div
      className={cx("shrink-0", frame === "ink" ? "bg-ink" : "bg-ink-soft", className)}
      style={{ width, padding: pad, borderRadius: Math.round(width * 0.153) }}
    >
      <Image
        src={src}
        alt={alt}
        width={780}
        height={1688}
        priority={priority}
        sizes={`${inner}px`}
        className="block h-auto w-full bg-surface"
        style={{ borderRadius: Math.round(width * 0.113) }}
      />
    </div>
  );
}
