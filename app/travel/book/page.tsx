import type { Metadata } from "next";
import BookingHero from "@/components/Travel/Booking/Hero";

export const metadata: Metadata = {
  title: "Book | Atlas Travel",
  description: "Search flights, hotels, and rides — all from one place.",
};

export default function BookPage() {
  return (
    <div className="relative z-30">
      <BookingHero />
    </div>
  );
}
