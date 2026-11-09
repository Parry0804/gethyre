import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const routes = [
  "",
  "/product",
  "/students",
  "/colleges",
  "/companies",
  "/about",
  "/early-access",
  "/how-we-assess",
  "/ambassadors",
  "/guides",
  "/careers",
  "/press",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : path === "/early-access" || path === "/colleges" ? 0.9 : 0.6,
  }));
}
