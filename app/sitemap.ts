import type { MetadataRoute } from "next";
import { config } from "@/lib/config";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://www.atlasinc.io";

export default function sitemap(): MetadataRoute.Sitemap {
  const corePages: MetadataRoute.Sitemap = [
    { url: baseUrl, changeFrequency: "monthly", priority: 1 },
    { url: `${baseUrl}/software`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/insights`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${baseUrl}/contact`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${baseUrl}/privacy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${baseUrl}/terms`, changeFrequency: "yearly", priority: 0.2 },
  ];

  // Travel content pages are only worth indexing while the site is actively
  // promoting Travel (see lib/config.ts showTravel).
  const travelPages: MetadataRoute.Sitemap = config.showTravel
    ? [
        { url: `${baseUrl}/travel/itinerary`, changeFrequency: "monthly", priority: 0.8 },
        { url: `${baseUrl}/travel/explore`, changeFrequency: "monthly", priority: 0.6 },
        { url: `${baseUrl}/travel/packages`, changeFrequency: "monthly", priority: 0.6 },
        { url: `${baseUrl}/travel/hotels`, changeFrequency: "monthly", priority: 0.6 },
        { url: `${baseUrl}/travel/rides`, changeFrequency: "monthly", priority: 0.5 },
        { url: `${baseUrl}/travel/book`, changeFrequency: "monthly", priority: 0.5 },
        { url: `${baseUrl}/travel/insights`, changeFrequency: "weekly", priority: 0.5 },
        { url: `${baseUrl}/travel/about`, changeFrequency: "yearly", priority: 0.4 },
        { url: `${baseUrl}/travel/contact`, changeFrequency: "yearly", priority: 0.4 },
      ]
    : [];

  return [...corePages, ...travelPages];
}
