import type { Metadata } from "next";
import BookingHero from "@/components/Travel/Booking/Hero";

export const metadata: Metadata = {
  title: "Hotel Booking | Atlas Travel",
  description:
    "Find and book hotels worldwide with Atlas Travel. Compare prices, amenities, and locations to find the perfect stay for your trip.",
  alternates: { canonical: "https://www.atlasinc.io/travel/hotels" },
};

export default function Hotels() {
  return (
    <div className="relative z-30">
      <BookingHero initialTab="hotels" />
    </div>
  );
}
