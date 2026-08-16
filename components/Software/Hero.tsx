import Link from "next/link";
import { ArrowUpRight, Sparkles, Layers, ShieldCheck } from "lucide-react";

export default function SoftwareHero() {
  return (
    <section className="relative overflow-hidden min-h-screen flex items-center px-8 md:px-12 2xl:px-0 py-32 bg-[#0d0d0d] text-white">
      <div className="absolute -top-32 -left-32 w-125 h-125 bg-[#dd9e5e]/6 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-125 h-125 bg-[#dd9e5e]/4 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-size-[72px_72px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/5 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto w-full grid lg:grid-cols-[1.05fr_0.95fr] gap-16 lg:gap-20 items-center">
        <div className="flex flex-col items-start text-left">
          <Link
            href="/software#get-started-pricing"
            className="inline-flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase text-[#dd9e5e] bg-[#dd9e5e]/10 border border-[#dd9e5e]/30 px-4 py-1.5 rounded-full mb-8 hover:bg-[#dd9e5e]/15 transition-colors"
          >
            <Sparkles size={12} /> AtlasCore · 7 Modules <ArrowUpRight size={12} />
          </Link>

          <h1 className="cursive font-medium text-white uppercase leading-tight mb-6 text-4xl md:text-5xl">
            Digital infrastructure,
            <br />
            <span className="bg-clip-text text-transparent bg-linear-to-r from-[#e8b07a] via-[#dd9e5e] to-[#c8874a]">
              built to scale.
            </span>
          </h1>

          <p className="text-white/45 text-sm md:text-base max-w-md leading-relaxed mb-10">
            Atlas builds the websites, CMS platforms, and business systems
            modern companies run on — architected once, built to grow for
            years, not months.
          </p>

          <div className="flex flex-row gap-3 items-center">
            <Link href="/software#get-started-pricing" className="btn-primary-sm text-[13px]! px-6! py-2.5!">
              See Plans <ArrowUpRight size={16} />
            </Link>
            <Link href="/software#how-it-works" className="btn-light-glass text-[13px]! px-6! py-2.5! w-fit!">
              How It Works
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-6 bg-[#dd9e5e]/8 rounded-[2.5rem] blur-3xl pointer-events-none" />

          <div
            className="relative rounded-3xl overflow-hidden border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.45)]"
            style={{ background: "linear-gradient(150deg, #17130f 0%, #0d0d0d 55%, #050505 100%)" }}
          >
            <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-white/5">
              <span className="w-2 h-2 rounded-full bg-[#ff5f57]/40" />
              <span className="w-2 h-2 rounded-full bg-[#febc2e]/40" />
              <span className="w-2 h-2 rounded-full bg-[#28c840]/40" />
              <span className="ml-3 text-[10px] text-white/30 font-medium">app.atlasinc.io</span>
            </div>

            <div className="p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#dd9e5e]">
                  AtlasCore Dashboard
                </span>
                <span className="flex items-center gap-1.5 text-[9px] text-white/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#28c840]" /> Live
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  ["7", "Modules"],
                  ["99.9%", "Uptime"],
                  ["24/7", "Monitoring"],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-xl bg-white/5 border border-white/10 px-3 py-3">
                    <p className="text-white text-lg font-black leading-none">{value}</p>
                    <p className="text-white/40 text-[9px] mt-1.5 uppercase tracking-wide">{label}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-xl bg-white/5 border border-white/10 h-28 p-4 flex items-end gap-1.5">
                {[40, 65, 50, 80, 55, 90, 70].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t bg-linear-to-t from-[#dd9e5e]/20 to-[#dd9e5e]/70"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>

              <p className="text-white/25 text-[10px]">Recent build: D-Link Colombo · Premium Real Estate</p>
            </div>
          </div>

          <div className="absolute -left-5 -bottom-5 rounded-2xl border border-[#dd9e5e]/25 bg-[#0d0d0d] p-4 flex items-center gap-3 shadow-xl">
            <div className="w-10 h-10 rounded-xl bg-[#dd9e5e]/15 border border-[#dd9e5e]/25 flex items-center justify-center shrink-0">
              <Layers size={18} className="text-[#dd9e5e]" />
            </div>
            <div>
              <p className="text-white text-base font-extrabold leading-none">7 Modules</p>
              <p className="text-white/40 text-[10px] mt-1">AtlasCore Included</p>
            </div>
          </div>

          <div className="absolute -right-4 -top-4 rounded-2xl border border-[#dd9e5e]/25 bg-[#0d0d0d] p-4 flex items-center gap-3 shadow-xl">
            <div className="w-10 h-10 rounded-xl bg-[#dd9e5e]/15 border border-[#dd9e5e]/25 flex items-center justify-center shrink-0">
              <ShieldCheck size={18} className="text-[#dd9e5e]" />
            </div>
            <div>
              <p className="text-white text-base font-extrabold leading-none">Built to Scale</p>
              <p className="text-white/40 text-[10px] mt-1">Architect-First</p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
        <div className="w-px h-10 bg-white/40 animate-pulse" />
        <span className="text-[9px] tracking-[0.3em] uppercase font-semibold text-white/60">Scroll</span>
      </div>
    </section>
  );
}
