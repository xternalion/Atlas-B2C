"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { Heart, ChevronRight, ChevronLeft } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

type Package = {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  description: string;
  image_urls: string[];
};

const Packages = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [packages, setPackages] = useState<Package[]>([]);

  useEffect(() => {
    supabase
      .from("ac_listings_travel")
      .select("id, title, subtitle, price, description, image_urls")
      .eq("listing_type", "packages")
      .order("created_at", { ascending: true })
      .then(({ data }) => {
        if (data) setPackages(data);
      });
  }, []);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: dir === "right" ? 220 : -220,
      behavior: "smooth",
    });
  };

  return (
    <div className="bg-white text-gray-800">
      <div className="max-w-6xl mx-auto py-12 md:py-14 md:pt-24 px-7 md:px-12 2xl:px-0 flex flex-col gap-6">
        <div className="flex items-end justify-between">
          <div>
            <Link
              href="/travel/packages"
              className="text-sm font-extrabold flex items-center gap-0.5 my-1 hover:gap-2 transition-all duration-300 w-fit"
            >
              Curated Travel Packages <ChevronRight size={22} />
            </Link>
            <p className="text-[11px] text-gray-500 tracking-wide">
              Bundled flights, stays, and experiences — priced and ready to book.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {packages.length === 0 ? (
          <p className="text-sm text-gray-400 py-6">
            No packages available yet — check back soon, or try our{" "}
            <Link href="/travel/itinerary" className="font-semibold text-[#dd9e5e] hover:underline">
              AI itinerary generator
            </Link>{" "}
            for a custom trip.
          </p>
        ) : (
          <div
            ref={scrollRef}
            className="flex gap-3.5 overflow-x-auto snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {packages.map((pkg) => (
              <div key={pkg.id} className="flex-none snap-start w-40 group relative">
                <div className="w-full h-40 overflow-hidden relative rounded-3xl bg-gray-100">
                  {pkg.image_urls?.[0] && (
                    <Image
                      src={pkg.image_urls[0]}
                      alt={pkg.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  )}
                  <div className="absolute inset-0 group-hover:bg-white/10 transition duration-700" />

                  {pkg.price && (
                    <div className="absolute top-2.5 left-3 bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1 text-[10px] group-hover:scale-105 duration-700 font-bold text-gray-800 tracking-wide shadow-sm">
                      {pkg.price}
                    </div>
                  )}

                  <Link
                    href="/travel/login"
                    className="absolute top-2.5 right-2.5 w-7 h-7 flex items-center justify-center bg-white/60 hover:bg-white hover:scale-125 duration-700 backdrop-blur-sm rounded-full shadow-4xl z-10"
                  >
                    <Heart size={16} className="text-black group-hover:text-black transition-colors duration-300" />
                  </Link>
                </div>

                <div className="pt-3 px-0.5 flex flex-col gap-0.5">
                  <Link
                    href={`/travel/listing?id=${pkg.id}&type=package`}
                    className="text-[12px] font-bold group-hover:underline line-clamp-1 hover:text-black leading-snug after:absolute after:inset-0 after:content-['']"
                  >
                    {pkg.title}
                  </Link>
                  <p className="text-[10px] text-gray-400 line-clamp-2 leading-relaxed">{pkg.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Packages;
