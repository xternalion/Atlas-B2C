import type { Metadata } from "next";
import Hero from "@/components/Travel/Explore/Hero";
import Tours from "@/components/Travel/Explore/Tours";
import Destinations from "@/components/Travel/Explore/Destinations";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://www.atlasinc.io";

export const metadata: Metadata = {
  title: "Explore | Atlas Travel",
  description:
    "Discover curated tours and top destinations across Europe, Asia, and the Middle East with Atlas Travel.",
  alternates: { canonical: `${baseUrl}/travel/explore` },
};

export default function Explore() {
  return (
    <div className="relative z-30">
      <Hero />
      <Tours />
      <Destinations
        title="Places You Can Visit"
        subtitle="Explore the most sought-after destinations curated for every mood and travel style."
        continents={["Europe"]}
      />
      <Destinations
        title="Explore The Wonders of Asia"
        subtitle="Dive into Asia's most vibrant cultures, landscapes, and must-see destinations."
        continents={["Asia", "Middle East"]}
      />
    </div>
  );
}
