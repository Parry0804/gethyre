import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

/**
 * Content Security Policy: only this site and the few services it uses may load scripts,
 * frames or make requests. Scripts allow 'unsafe-inline' because the site is fully static
 * (nonces would force every page to render on each request); there's no user-generated HTML,
 * and React escapes everything it renders.
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com https://www.clarity.ms https://scripts.clarity.ms https://challenges.cloudflare.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://images.unsplash.com https://www.googletagmanager.com https://*.google-analytics.com https://*.clarity.ms https://c.bing.com",
  "font-src 'self'",
  "media-src 'self'",
  "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://*.clarity.ms https://c.bing.com https://challenges.cloudflare.com",
  "frame-src https://www.youtube-nocookie.com https://player.vimeo.com https://drive.google.com https://challenges.cloudflare.com",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=(), browsing-topics=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // Don't advertise the framework in a response header.
  poweredByHeader: false,
  // Never ship source maps to browsers (this is the default; kept explicit).
  productionBrowserSourceMaps: false,
  async redirects() {
    return [
      // Merged into the home page.
      { source: "/students", destination: "/", permanent: true },
      // Placeholder pages removed before launch.
      { source: "/guides", destination: "/", permanent: false },
      { source: "/press", destination: "/contact", permanent: false },
      { source: "/ambassadors", destination: "/contact", permanent: false },
    ];
  },
  async headers() {
    // Long browser caching for media. Rename a file (e.g. hero-flow-v2.mp4) when you replace it.
    const media = { key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" };
    return [
      { source: "/(.*)", headers: securityHeaders },
      { source: "/video/:path*", headers: [media] },
      { source: "/screens/:path*", headers: [media] },
      { source: "/brand/:path*", headers: [media] },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
