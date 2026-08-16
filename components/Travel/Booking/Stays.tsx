"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { Heart, ChevronRight, ChevronLeft } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

type Hotel = {
  id: string;
  title: string;
  image_urls: string[];
  city: string[];
  country: string[];
  hotel_type: string;
  description: string;
};

const Stays = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hotels, setHotels] = useState<Hotel[]>([]);

  useEffect(() => {
    supabase
      .from("ac_listings_travel")
      .select("id, title, image_urls, city, country, hotel_type, description")
      .eq("listing_type", "hotels")
      .order("created_at", { ascending: true })
      .then(({ data }) => {
        if (data) setHotels(data);
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
              Hotel Stays <ChevronRight size={22} />
            </Link>
            <p className="text-[11px] text-gray-500 tracking-wide">
              Explore the most sought-after hotels curated for every mood and
              travel style.
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
          {hotels.map((hotel) => (
            <div
              key={hotel.id}
              className="flex-none snap-start w-40 group relative"
            >
              <div className="w-full h-40 overflow-hidden relative rounded-3xl bg-gray-100">
                {hotel.image_urls?.[0] && (
                  <Image
                    src={hotel.image_urls[0]}
                    alt={hotel.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                )}
                <div className="absolute inset-0 group-hover:bg-white/10 transition duration-700" />

                <div className="absolute top-2.5 left-3 bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1 text-[10px] group-hover:scale-105 duration-700 font-bold text-gray-800 tracking-wide shadow-sm">
                  {hotel.hotel_type}
                </div>

                <Link
                  href="/travel/login"
                  className="absolute top-2.5 right-2.5 w-7 h-7 flex items-center justify-center bg-white/60 hover:bg-white hover:scale-125 duration-700 backdrop-blur-sm rounded-full shadow-4xl z-10"
                >
                  <Heart
                    size={16}
                    className="text-black group-hover:text-black transition-colors duration-300"
                  />
                </Link>
              </div>

              <div className="pt-3 px-0.5 flex flex-col gap-0.5">
                <Link
                  href={`/travel/listing?id=${hotel.id}&type=hotel`}
                  className="text-[12px] font-bold group-hover:underline line-clamp-1 hover:text-black leading-snug after:absolute after:inset-0 after:content-[‘’]"
                >
                  {hotel.title}
                </Link>
                <p className="text-[10px] text-gray-400 line-clamp-2 leading-relaxed">
                  {hotel.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stays;
