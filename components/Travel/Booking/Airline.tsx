"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

type Airline = {
  id: string;
  title: string;
  description: string;
  location: string;
  image_url: string;
  image_urls: string[];
};

const Airline = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [airlines, setAirlines] = useState<Airline[]>([]);

  useEffect(() => {
    supabase
      .from("ac_listings_travel")
      .select("id, title, description, location, image_url, image_urls")
      .eq("listing_type", "airlines")
      .order("created_at", { ascending: true })
      .then(({ data }) => {
        if (data) setAirlines(data);
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
              href="/travel/explore"
              className="text-sm font-extrabold flex items-center gap-0.5 my-1 hover:gap-2 transition-all duration-300 w-fit"
            >
              Partnering Airlines <ChevronRight size={22} />
            </Link>
            <p className="text-[11px] text-gray-500 tracking-wide">
              Discover world-class airlines curated for comfort, reliability,
              and exceptional travel experiences.
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

        <div
          ref={scrollRef}
          className="flex gap-3.5 overflow-x-auto snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {airlines.map((airline) => (
            <div
              key={airline.id}
              className="flex-none snap-start w-40 group"
            >
              <div className="w-full h-40 overflow-hidden relative rounded-3xl bg-gray-100">
                {airline.image_urls?.[0] && (
                  <Image
                    src={airline.image_urls[0]}
                    alt={airline.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent transition duration-700" />

                <div className="absolute top-2.5 left-3 bg-white backdrop-blur-sm rounded-full px-2 py-1 text-[10px] group-hover:scale-105 duration-700 font-semibold text-black shadow-4xl">
                  Featured Airline
                </div>

                <div className="absolute bottom-2.5 left-3.5 right-2.5 flex items-end justify-between">
                  <p className="text-white text-[10px] font-semibold leading-tight drop-shadow">
                    {airline.location}
                  </p>
                  {airline.image_url && (
                    <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center shadow-md overflow-hidden flex-shrink-0">
                      <img
                        src={airline.image_url}
                        alt={`${airline.title} logo`}
                        className="w-5 h-5 object-contain"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-3 px-0.5 flex flex-col gap-0.5">
                <Link
                  href="/travel/flights"
                  className="text-[12px] font-bold group-hover:underline line-clamp-1 hover:text-black leading-snug after:absolute after:inset-0 after:content-['']"
                >
                  {airline.title}
                </Link>
                <p className="text-[10px] text-gray-400 line-clamp-2 leading-relaxed">
                  {airline.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Airline;
