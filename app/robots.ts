import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // Keep Vercel preview deployments (test builds of branches) out of search results.
  if (process.env.VERCEL_ENV === "preview") {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/thank-you"] },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
