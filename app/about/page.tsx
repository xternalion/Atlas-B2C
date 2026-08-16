import type { Metadata } from "next";
import About from "@/components/About";
import { config } from "@/lib/config";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://www.atlasinc.io";

export const metadata: Metadata = {
  title: config.showTravel ? "About | Atlas — Software & Travel" : "About | Atlas",
  description: config.showTravel
    ? "Learn about Atlas — one brand behind AtlasCore (software) and WanderMind (travel). One platform, one design system, one vision."
    : "Learn about Atlas, the team behind AtlasCore — one platform, one design system, one vision.",
  alternates: { canonical: `${baseUrl}/about` },
};

export default function AboutPage() {
  return <About />;
}
