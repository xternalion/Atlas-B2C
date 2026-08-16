"use client";
import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { config } from "@/lib/config";

const Intro = () => {
  return (
    <section className="relative overflow-hidden bg-[#0d0d0d] text-white">
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-[#dd9e5e]/6 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-[#dd9e5e]/4 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:72px_72px]" />

      <div className="max-w-6xl mx-auto pt-36 pb-24 2xl:pt-44 2xl:pb-32 px-6 md:px-12 2xl:px-0 relative z-10 flex flex-col gap-12">
        <div className="flex flex-col gap-5 max-w-3xl">
          <span className="text-[11px] w-fit font-bold tracking-widest uppercase text-[#dd9e5e] bg-[#dd9e5e]/10 border border-[#dd9e5e]/30 px-4 py-1.5 rounded-full">
            About Atlas
          </span>
          <h1 className="cursive text-4xl 2xl:text-5xl leading-[1.05]">
            One Brand.{" "}
            <span className="text-[#dd9e5e]">
              {config.showTravel ? "Two Focus Areas." : "Built to Scale."}
            </span>
          </h1>
          <p className="text-white/50 text-[15px] font-light leading-relaxed max-w-2xl">
            {config.showTravel
              ? "Atlas brings software and travel together under one platform, one design system, and one vision."
              : "Atlas is the software company behind AtlasCore — one platform, one design system, one vision."}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 border-t border-white/[0.06] pt-12">
          <div className="flex flex-col gap-4">
            <p className="text-white/25 text-[10px] font-bold uppercase tracking-[0.3em]">
              The Story
            </p>
            <p className="text-white/60 text-sm leading-relaxed">
              Atlas started with software — building websites, platforms, and
              digital systems for businesses that needed more than templates.
              {config.showTravel &&
                " From that foundation, we expanded into travel, creating WanderMind to bring the same systems-thinking to how people explore the world."}
            </p>
            <p className="text-white/40 text-sm leading-relaxed">
              {config.showTravel
                ? "Today Atlas operates both under one roof — sharing a design language, a code philosophy, and the same standard of quality in everything we ship."
                : "Every product we ship shares the same design language, the same code philosophy, and the same standard of quality."}
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-white/25 text-[10px] font-bold uppercase tracking-[0.3em]">
              The Mission
            </p>
            <p className="text-white/60 text-sm leading-relaxed">
              We believe the best businesses are built on strong systems, not
              shortcuts. Whether it&apos;s a client&apos;s e-commerce store,
              an internal CMS, or a full booking platform — we apply the
              same rigour: architect first, build once, scale forever.
            </p>
            <p className="text-white/40 text-sm leading-relaxed">
              Atlas is not a freelance studio. It&apos;s a small team that
              builds {config.showTravel ? "software and travel products" : "digital products"}{" "}
              with the same care and long-term thinking.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <Link href="/software" className="btn-primary-sm">
            Explore Software <ArrowUpRight size={15} />
          </Link>
          {config.showTravel && (
            <Link href="/travel/itinerary" className="btn-light-glass !text-[13px] !px-5 !py-2.5 !w-fit">
              Explore Travel
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default Intro;
