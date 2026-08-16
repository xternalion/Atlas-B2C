import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { config } from "@/lib/config";

export default function HomeHero() {
  return (
    <section className="relative overflow-hidden min-h-screen flex items-center justify-center px-8 md:px-12 2xl:px-0 py-32 bg-[#0d0d0d] text-white text-center">
      {/* Gold blobs */}
      <div className="absolute -top-32 -left-32 w-125 h-125 bg-[#dd9e5e]/6 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-125 h-125 bg-[#dd9e5e]/4 rounded-full blur-3xl pointer-events-none" />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-size-[72px_72px] pointer-events-none" />

      {/* Bottom fade border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/5 to-transparent" />

      <div className="relative z-10 max-w-3xl mx-auto w-full flex flex-col items-center">
        <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase text-[#dd9e5e] bg-[#dd9e5e]/10 border border-[#dd9e5e]/30 px-4 py-1.5 rounded-full mb-10">
          <Sparkles size={12} />
          {config.showTravel ? "One Brand. Software & Travel." : "Digital Infrastructure, Built Right."}
        </span>

        <h1 className="cursive font-medium uppercase leading-none mb-8 text-8xl md:text-9xl 2xl:text-[11rem] bg-clip-text">
          Atlas
        </h1>

        <p className="text-white/50 text-base md:text-lg max-w-xl leading-relaxed mb-10">
          {config.showTravel
            ? "Digital infrastructure for growing businesses, and AI-powered trips that plan themselves — one platform, two ways to grow."
            : "Digital infrastructure for growing businesses — websites, platforms, and systems built to scale."}
        </p>

        <div className="flex flex-row flex-wrap gap-3 items-center justify-center">
          <Link href="/software" className="btn-primary-sm text-[13px]! px-6! py-2.5!">
            Explore Solutions <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
        <div className="w-px h-10 bg-white/40 animate-pulse" />
        <span className="text-[9px] tracking-[0.3em] uppercase font-semibold text-white/60">Scroll</span>
      </div>
    </section>
  );
}
