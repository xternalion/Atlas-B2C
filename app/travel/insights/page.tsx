import type { Metadata } from "next";
import Hero from "@/components/Travel/Insights/Hero";
import Experiences from "@/components/Travel/Insights/Experiences";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://www.atlasinc.io";

export const metadata: Metadata = {
  title: "Travel Insights | Atlas Travel",
  description:
    "Stories, guides, and curated experiences from Atlas Travel to help you plan your next trip.",
  alternates: { canonical: `${baseUrl}/travel/insights` },
};

export default function Insights() {
  return (
    <div className="relative z-30">
      <Hero />
      <Experiences />
    </div>
  );
}
