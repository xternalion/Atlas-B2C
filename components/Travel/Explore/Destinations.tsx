"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

type Destination = {
  id: string;
  title: string;
  tagline: string;
  image_urls: string[];
};

type DestinationsProps = {
  title: string;
  subtitle: string;
  continents: string[];
};

const Destinations = ({ title, subtitle, continents }: DestinationsProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [destinations, setDestinations] = useState<Destination[]>([]);

  useEffect(() => {
    supabase
      .from("ac_destinations")
      .select("id, title, tagline, image_urls")
      .overlaps("continent", continents)
      .order("created_at", { ascending: true })
      .then(({ data }) => {
        if (data) setDestinations(data);
      });
  }, [continents]);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: dir === "right" ? 220 : -220,
      behavior: "smooth",
    });
  };

  return (
    <div className="bg-white text-gray-800">
      <div className="max-w-6xl mx-auto pb-12 px-7 md:px-12 2xl:px-0 flex flex-col gap-6">
        <div className="flex items-end justify-between">
          <div>
            <Link
              href="/travel/explore"
              className="text-sm font-extrabold flex items-center gap-0.5 my-1 hover:gap-2 transition-all duration-300 w-fit"
            >
              {title} <ChevronRight size={22} />
            </Link>
            <p className="text-[11px] text-gray-500 tracking-wide">{subtitle}</p>
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
          className="flex gap-2.5 2xl:gap-3.5 overflow-x-auto snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {destinations.map((dest) => (
            <div key={dest.id} className="flex-none snap-start w-40 group relative">
              <div className="w-full h-40 overflow-hidden relative rounded-3xl bg-gray-100">
                {dest.image_urls?.[0] && (
                  <Image
                    src={dest.image_urls[0]}
                    alt={dest.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                )}
                <div className="absolute inset-0 group-hover:bg-white/10 transition duration-700" />
              </div>

              <div className="pt-3 px-0.5 flex flex-col gap-0.5">
                <Link
                  href={`/travel/listing?id=${dest.id}&type=destination`}
                  className="text-[12px] font-bold group-hover:underline line-clamp-1 hover:text-black leading-snug after:absolute after:inset-0 after:content-['']"
                >
                  {dest.title}
                </Link>
                <p className="text-[10px] text-gray-400 line-clamp-2 leading-relaxed">{dest.tagline}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Destinations;
