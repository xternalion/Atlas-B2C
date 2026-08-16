import type { Metadata } from "next";
import BookingHero from "@/components/Travel/Booking/Hero";

export const metadata: Metadata = {
  title: "Car Rentals & Rides | Atlas Travel",
  description:
    "Rent a car or book a ride with Atlas Travel. Choose from a wide range of vehicles — economy, SUV, luxury — with transparent pricing and no hidden fees.",
  alternates: { canonical: "https://www.atlasinc.io/travel/rides" },
};

export default function Ride() {
  return (
    <div className="relative z-30">
      <BookingHero initialTab="rides" />
    </div>
  );
}
