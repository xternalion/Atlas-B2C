import type { MetadataRoute } from "next";
import { config } from "@/lib/config";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://www.atlasinc.io";

export default function robots(): MetadataRoute.Robots {
  const disallow = ["/api/", "/travel/flights", "/travel/listing"];

  // Travel is currently unlinked from nav/marketing (see lib/config.ts
  // showTravel); keep it out of the index until it's promoted again.
  if (!config.showTravel) {
    disallow.push("/travel");
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow,
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
