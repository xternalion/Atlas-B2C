import Link from "next/link";
import { ArrowUpRight, Code2, Plane, Check } from "lucide-react";
import { config } from "@/lib/config";

const SOFTWARE_TRACK = {
  icon: Code2,
  eyebrow: "Software",
  title: "Digital Infrastructure",
  desc: "Websites, platforms, and CMS solutions built on AtlasCore — the same modular system behind every build.",
  items: ["Web platforms & CMS", "Automation & workflows", "Billing & subscriptions"],
  href: "/software#modules",
  cta: "See modules",
};

const TRAVEL_TRACK = {
  icon: Plane,
  eyebrow: "Travel",
  title: "AI-Powered Trips",
  desc: "Describe a trip in plain language and WanderMind plans it — flights, stays, and a bookable itinerary.",
  items: ["AI itinerary planning", "Flights, hotels & rentals", "Curated travel packages"],
  href: "/travel/itinerary",
  cta: "Plan a trip",
};

const TRACKS = config.showTravel ? [SOFTWARE_TRACK, TRAVEL_TRACK] : [SOFTWARE_TRACK];

const Solutions = () => {
  return (
    <section id="solutions" className="relative overflow-hidden bg-[#0d0d0d] border-t border-white/8">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(221,158,94,0.08),transparent)] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-125 h-125 bg-[#dd9e5e]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto py-24 2xl:py-32 px-6 md:px-12 2xl:px-0">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-10 bg-[#dd9e5e]/60" />
            <span className="text-[#dd9e5e] text-[10px] font-bold tracking-[0.35em] uppercase">Solutions</span>
            <div className="h-px w-10 bg-[#dd9e5e]/60" />
          </div>
          <h2 className="cursive text-4xl md:text-5xl text-white leading-tight max-w-2xl mb-5">
            {config.showTravel ? "Two Industries. One Platform." : "Built on AtlasCore."}
          </h2>
          <p className="text-white/45 text-sm max-w-lg leading-relaxed">
            {config.showTravel
              ? "Everything Atlas builds falls under one of two solution tracks — each independent, each sharing the same design system underneath."
              : "Everything Atlas builds runs on the same modular system underneath — built for scale from day one."}
          </p>
        </div>

        <div className={`grid gap-6 ${config.showTravel ? "md:grid-cols-2" : "md:grid-cols-1 max-w-xl mx-auto"}`}>
          {TRACKS.map(({ icon: Icon, eyebrow, title, desc, items, href, cta }) => (
            <div
              key={eyebrow}
              className="group flex flex-col gap-6 p-8 rounded-3xl border border-white/8 bg-white/[0.02] hover:border-[#dd9e5e]/30 hover:bg-white/[0.04] transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-[#dd9e5e]/10 border border-[#dd9e5e]/25 flex items-center justify-center">
                  <Icon size={22} className="text-[#dd9e5e]" />
                </div>
                <span className="text-[9px] font-bold tracking-[0.28em] uppercase text-[#dd9e5e] bg-[#dd9e5e]/10 border border-[#dd9e5e]/25 px-3 py-1.5 rounded-full">
                  {eyebrow}
                </span>
              </div>

              <div>
                <h3 className="text-white font-bold text-2xl mb-2">{title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{desc}</p>
              </div>

              <ul className="flex flex-col gap-2.5">
                {items.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-[13px] text-white/60 font-medium">
                    <Check size={14} className="text-[#dd9e5e] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href={href}
                className="flex items-center gap-1.5 text-[13px] font-semibold text-[#dd9e5e] hover:text-[#e8b07a] transition-colors mt-auto"
              >
                {cta} <ArrowUpRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solutions;
