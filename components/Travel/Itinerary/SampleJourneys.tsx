"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Briefcase, Sparkles } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

type Listing = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image_urls: string[];
  listing_type: string;
  price: string;
};

const TYPE_META: Record<string, { label: string; icon: React.ElementType }> = {
  tours: { label: "Tour", icon: Sparkles },
  packages: { label: "Package", icon: Briefcase },
};

export default function SampleJourneys() {
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    supabase
      .from("ac_listings_travel")
      .select("id, title, subtitle, description, image_urls, listing_type, price")
      .in("listing_type", ["tours", "packages"])
      .eq("status", "Active")
      .order("created_at", { ascending: true })
      .limit(8)
      .then(({ data }) => {
        if (data) setListings(data);
      });
  }, []);

  if (listings.length === 0) return null;

  return (
    <section className="relative bg-white border-t border-black/6 py-24 2xl:py-32">
      <div className="max-w-6xl mx-auto px-8 md:px-12 2xl:px-0">
        <div className="flex flex-col gap-4 max-w-xl mb-14">
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-[#c8874a]" />
            <span className="text-[#c8874a] text-[11px] font-bold tracking-[0.3em] uppercase">Get Inspired</span>
          </div>
          <h2 className="cursive text-4xl md:text-5xl text-[#0a0908] leading-tight">
            Tours &amp; packages travelers love.
          </h2>
          <p className="text-black/45 text-sm leading-relaxed">
            Browse a real trip, or use it as a starting point — WanderMind will tailor it to your dates and budget.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {listings.map((item) => {
            const meta = TYPE_META[item.listing_type] ?? { label: item.listing_type, icon: Sparkles };
            const Icon = meta.icon;
            const image = item.image_urls?.[0];
            const prompt = `${item.title}${item.subtitle ? ` — ${item.subtitle}` : ""}. ${item.description ?? ""}`.trim();

            return (
              <a
                key={item.id}
                href={`/travel/itinerary?prompt=${encodeURIComponent(prompt)}`}
                className="group relative flex flex-col justify-end h-96 rounded-3xl overflow-hidden border border-black/8 shadow-sm hover:shadow-xl transition-shadow duration-300"
              >
                {image ? (
                  <Image
                    src={image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="absolute inset-0 bg-linear-to-br from-[#1a1310] to-[#0a0908] flex items-center justify-center">
                    <Icon size={32} className="text-[#dd9e5e]/30" />
                  </div>
                )}
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-black/10" />

                <span className="absolute top-4 left-4 flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.25em] text-white bg-white/15 backdrop-blur-md border border-white/25 px-2.5 py-1 rounded-full">
                  <Icon size={11} /> {meta.label}
                </span>

                <div className="relative z-10 p-5 flex flex-col gap-2">
                  <h3 className="text-white font-bold text-lg leading-tight line-clamp-1">{item.title}</h3>
                  {item.subtitle && (
                    <p className="text-white/60 text-[12px] leading-relaxed line-clamp-2">{item.subtitle}</p>
                  )}
                  <div className="flex items-center justify-between mt-1">
                    {item.price && <span className="text-white text-sm font-bold">{item.price}</span>}
                    <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#dd9e5e] group-hover:text-[#e8b07a] transition-colors">
                      Plan it <ArrowUpRight size={13} />
                    </span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
