import type { Metadata } from "next";
import { Suspense } from "react";
import ItineraryTool from "@/components/Travel/Itinerary/Tool";
import SampleJourneys from "@/components/Travel/Itinerary/SampleJourneys";
import SeamlessBooking from "@/components/Travel/Itinerary/SeamlessBooking";
import CTA from "@/components/Travel/Itinerary/CTA";

export const metadata: Metadata = {
  title: "AI Itinerary Planner | Atlas Travel",
  description:
    "Search a destination or describe your trip and let WanderMind, Atlas Travel's AI, generate a personalized day-by-day itinerary with real flight data and a bookable plan.",
  alternates: { canonical: "https://www.atlasinc.io/travel/itinerary" },
};

export default function ItineraryPage() {
  return (
    <>
      <Suspense fallback={null}>
        <ItineraryTool />
      </Suspense>
      <SampleJourneys />
      <SeamlessBooking />
      <CTA />
    </>
  );
}
