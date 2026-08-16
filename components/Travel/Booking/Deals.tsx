"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { Heart, ChevronRight, ChevronLeft } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

type Deal = {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  description: string;
  image_urls: string[];
};

const Deals = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [deals, setDeals] = useState<Deal[]>([]);

  useEffect(() => {
    supabase
      .from("ac_listings_travel")
      .select("id, title, subtitle, price, description, image_urls")
      .ilike("listing_type", "packages")
      .order("created_at", { ascending: true })
      .then(({ data }) => {
        if (data) setDeals(data);
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
      <div className="max-w-6xl mx-auto pb-12 px-7 md:px-12 2xl:px-0 flex flex-col gap-6">
        <div className="flex items-end justify-between">
          <div>
            <Link
              href="/travel/packages"
              className="text-sm font-extrabold flex items-center gap-0.5 my-1 hover:gap-2 transition-all duration-300 w-fit"
            >
              Find The Best Deals <ChevronRight size={22} />
            </Link>
            <p className="text-[11px] text-gray-500 tracking-wide">
              Handpicked travel experiences and curated getaways at exclusive rates.
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
          {deals.map((deal) => (
            <div key={deal.id} className="flex-none snap-start w-40 group relative">
              <div className="w-full h-40 overflow-hidden relative rounded-3xl bg-gray-100">
                {deal.image_urls?.[0] && (
                  <Image
                    src={deal.image_urls[0]}
                    alt={deal.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                )}
                <div className="absolute inset-0 group-hover:bg-white/10 transition duration-700" />

                {deal.price && (
                  <div className="absolute top-2.5 left-3 bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1 text-[10px] group-hover:scale-105 duration-700 font-bold text-gray-800 tracking-wide shadow-sm">
                    {deal.price}
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
                  href={`/travel/listing?id=${deal.id}&type=package`}
                  className="text-[12px] font-bold group-hover:underline line-clamp-1 hover:text-black leading-snug after:absolute after:inset-0 after:content-['']"
                >
                  {deal.title}
                </Link>
                <p className="text-[10px] text-gray-400 line-clamp-2 leading-relaxed">{deal.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Deals;
