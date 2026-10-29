import Image from "next/image";
import type { ReactNode } from "react";
import { Reveal } from "@/components/motion";
import { Container, cx } from "@/components/ui";
import { photos, type PhotoName } from "@/content/photos";

/** A rounded photo that fills its box. Size the box with `className` (an aspect ratio or a height). */
export function Photo({
  name,
  className,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority,
  children,
  position,
}: {
  name: PhotoName;
  className?: string;
  sizes?: string;
  priority?: boolean;
  children?: ReactNode;
  /** CSS object-position, e.g. "50% 30%". */
  position?: string;
}) {
  const p = photos[name];
  return (
    <div className={cx("relative overflow-hidden rounded-[12px] bg-sky", className)}>
      <Image
        src={p.src}
        alt={p.alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
        style={position ? { objectPosition: position } : undefined}
      />
      {children}
    </div>
  );
}

/** Three photos in a row under a page hero. Scrolls sideways on phones. */
export function PhotoBand({ names, captions }: { names: [PhotoName, PhotoName, PhotoName]; captions?: [string, string, string] }) {
  return (
    <section aria-label="Photos" className="pb-6 lg:pb-10">
      <Container>
        <ul className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-1 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-[1.25fr_1fr_1fr] md:overflow-visible md:px-0 lg:gap-5">
          {names.map((n, i) => (
            <Reveal as="li" key={n} delay={i * 100} className="w-[78%] shrink-0 snap-center md:w-auto">
              <Photo name={n} className="aspect-[4/3] md:aspect-auto md:h-[300px]" sizes="(min-width: 768px) 33vw, 80vw">
                {captions ? (
                  <span className="absolute bottom-3 left-3 rounded-md bg-white/90 px-3 py-1.5 text-[13px] font-semibold text-ink backdrop-blur">
                    {captions[i]}
                  </span>
                ) : null}
              </Photo>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
