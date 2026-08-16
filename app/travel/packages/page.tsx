import type { Metadata } from "next";
import Packages from "@/components/Travel/Booking/Packages";

export const metadata: Metadata = {
  title: "Travel Packages | Atlas Travel",
  description:
    "Browse curated travel packages — bundled flights, stays, and experiences priced and ready to book with Atlas Travel.",
  alternates: { canonical: "https://www.atlasinc.io/travel/packages" },
};

export default function PackagesPage() {
  return (
    <div className="relative z-30 bg-[#0d0d0d] pt-40 pb-4">
      <div className="max-w-6xl mx-auto px-7 md:px-12 2xl:px-0 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px w-10 bg-[#dd9e5e]/70" />
          <span className="text-[#dd9e5e] text-[10px] font-bold tracking-[0.35em] uppercase">
            Packages · Curated Trips
          </span>
        </div>
        <h1 className="cursive text-4xl 2xl:text-5xl text-white leading-tight">Travel Packages</h1>
        <p className="text-white/50 text-sm mt-3 max-w-md leading-relaxed">
          Bundled flights, stays, and experiences — priced and ready to book.
        </p>
      </div>
      <Packages />
    </div>
  );
}
