import type { Metadata } from "next";
import HomeHero from "@/components/Home/Hero";
import Purpose from "@/components/Home/Purpose";
import Solutions from "@/components/Home/Solutions";
import Founder from "@/components/Home/Founder";
import CTA from "@/components/Home/CTA";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://www.atlasinc.io";

export const metadata: Metadata = {
  title: "Atlas | One Brand. Multiple Ventures.",
  description:
    "Atlas creates software that empowers businesses to operate smarter, grow faster, and build lasting digital foundations.",
  alternates: { canonical: baseUrl },
};

export default function AtlasHome() {
  return (
    <div className="relative bg-white">
      <HomeHero />
      <Purpose />
      <Solutions />
      <Founder />
      <CTA />
    </div>
  );
}
