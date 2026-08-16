import React from "react";
import Link from "next/link";
import { ArrowUpRight, Code2, Plane } from "lucide-react";
import { config } from "@/lib/config";

const SOFTWARE_VENTURE = {
  icon: <Code2 size={20} className="text-[#dd9e5e]" />,
  eyebrow: "Active",
  name: "AtlasCore",
  label: "Software",
  tagline: "Digital Infrastructure & Business Systems",
  description:
    "We design and build the digital systems modern businesses run on — brand identity, web platforms, CMS solutions, e-commerce, and full-stack automation. Every project is built for scale, not just launch.",
  tags: ["Web Design", "CMS", "Full-Stack", "Automation", "AtlasCore"],
  href: "/#offerings",
  cta: "Explore Software",
  active: true,
};

const TRAVEL_VENTURE = {
  icon: <Plane size={20} className="text-[#dd9e5e]" />,
  eyebrow: "Building",
  name: "WanderMind",
  label: "Travel",
  tagline: "AI-Powered Travel Platform",
  description:
    "WanderMind is Atlas's travel platform — flights, hotels, rides, and curated experiences. Built on the same systems-first philosophy, it brings intelligence and simplicity to modern travel planning.",
  tags: ["Flights", "Hotels", "Experiences", "WanderMind", "AI Travel"],
  href: "/travel",
  cta: "Explore Travel",
  active: true,
};

const VENTURES = config.showTravel ? [SOFTWARE_VENTURE, TRAVEL_VENTURE] : [SOFTWARE_VENTURE];

const Offer = () => {
  return (
    <section className="relative bg-white overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-gray-200 to-transparent" />

      <div className="max-w-6xl mx-auto py-24 2xl:py-32 px-6 md:px-12 2xl:px-0 flex flex-col gap-12">
        <div className={`flex flex-col gap-4 max-w-xl ${config.showTravel ? "" : "items-center text-center mx-auto"}`}>
          <span className="text-[11px] w-fit font-bold tracking-widest uppercase text-[#dd9e5e] bg-[#dd9e5e]/10 border border-[#dd9e5e]/30 px-4 py-1.5 rounded-full">
            What We Do
          </span>
          <h2 className="cursive text-4xl 2xl:text-5xl text-gray-900 leading-[1.05]">
            {config.showTravel ? (
              <>Software <span className="text-[#dd9e5e]">& Travel</span></>
            ) : (
              <>Digital <span className="text-[#dd9e5e]">Infrastructure</span></>
            )}
          </h2>
          <p className="text-gray-400 text-sm font-light leading-relaxed">
            {config.showTravel
              ? "Two focused products, built independently but connected by the same design system and standard of quality."
              : "One focused product, built with a consistent design system and standard of quality."}
          </p>
        </div>

        <div className={`grid grid-cols-1 gap-6 ${config.showTravel ? "md:grid-cols-2" : "max-w-xl mx-auto w-full"}`}>
          {VENTURES.map((v) => (
            <div
              key={v.name}
              className={`group relative rounded-2xl border p-8 flex flex-col gap-6 transition-all duration-300 shadow-sm ${
                v.active
                  ? "bg-gray-50/80 border-gray-200 hover:border-[#dd9e5e]/40 hover:shadow-xl hover:-translate-y-1"
                  : "bg-gray-50/40 border-dashed border-gray-200 opacity-50"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-white border border-[#dd9e5e]/25 shadow-sm flex items-center justify-center">
                  {v.icon}
                </div>
                <span
                  className={`text-[9px] font-bold tracking-[0.28em] uppercase px-3 py-1.5 rounded-full border ${
                    v.active
                      ? "text-[#dd9e5e] bg-[#dd9e5e]/10 border-[#dd9e5e]/25"
                      : "text-gray-400 bg-white border-gray-200"
                  }`}
                >
                  {v.eyebrow}
                </span>
              </div>

              <div className="flex flex-col gap-1.5">
                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.25em]">
                  {v.name}
                </p>
                <h3 className="cursive text-3xl text-gray-900">
                  {v.label}
                </h3>
                <p className="text-gray-500 text-[11px] font-semibold uppercase tracking-wide">
                  {v.tagline}
                </p>
              </div>

              <p className="text-gray-500 text-sm leading-relaxed font-light flex-1">
                {v.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {v.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[9px] font-semibold uppercase tracking-wider text-gray-500 bg-white border border-gray-200 px-2.5 py-1 rounded-full"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <Link
                href={v.href}
                className="flex items-center gap-1.5 text-[12px] font-semibold text-[#dd9e5e] hover:text-[#c8874a] transition-colors mt-auto"
              >
                {v.cta} <ArrowUpRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Offer;