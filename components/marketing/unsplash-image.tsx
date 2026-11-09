"use client";

import Image, { type ImageLoaderProps, type ImageProps } from "next/image";

/**
 * Unsplash photos are resized and compressed by Unsplash's own image CDN (it serves WebP/AVIF
 * automatically), so they never pass through Vercel's image optimiser: faster, and no usage limits.
 */
function unsplashLoader({ src, width, quality }: ImageLoaderProps) {
  const url = new URL(src);
  url.searchParams.set("auto", "format");
  url.searchParams.set("fit", "max");
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", String(quality ?? 70));
  return url.toString();
}

export function UnsplashImage({ alt, ...props }: ImageProps) {
  return <Image loader={unsplashLoader} alt={alt} {...props} />;
}
