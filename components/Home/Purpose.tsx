import Image from "next/image";
import { config } from "@/lib/config";

const FACTS = config.showTravel
  ? [
      { value: "2 Industries", desc: "Software & Travel" },
      { value: "1 Center", desc: "Everything, together" },
      { value: "100% Reinvested", desc: "Into what's next" },
    ]
  : [
      { value: "AtlasCore", desc: "One system, every build" },
      { value: "100% Custom", desc: "No two builds alike" },
      { value: "Built to Scale", desc: "Not just launch" },
    ];

export default function Purpose() {
  return (
    <section className="relative overflow-hidden bg-white py-24 2xl:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_0%_10%,rgba(221,158,94,0.07),transparent_60%)] pointer-events-none" />

      {/* Watermark */}
      <Image
        src="/favicon.ico"
        alt=""
        aria-hidden="true"
        width={480}
        height={480}
        className="absolute -bottom-28 -right-28 w-[30vw] h-[30vw] max-w-100 max-h-100 opacity-[0.05] pointer-events-none select-none"
      />

      <div className="relative max-w-6xl mx-auto px-6 md:px-12 2xl:px-0 grid lg:grid-cols-[1.1fr_0.9fr] gap-14 lg:gap-20 items-center">
        <div>
          <div className="flex items-center gap-3 mb-7">
            <div className="h-px w-8 bg-[#c8874a]" />
            <span className="text-[#c8874a] text-[11px] font-bold tracking-[0.3em] uppercase">Our Purpose</span>
          </div>

          <h2 className="cursive font-medium leading-tight mb-6 text-4xl sm:text-5xl md:text-6xl text-[#0a0908] text-balance">
            Infrastructure isn&apos;t a feature.
            <br />
            It&apos;s the{" "}
            <span className="bg-clip-text text-transparent bg-linear-to-r from-[#e8b07a] via-[#dd9e5e] to-[#c8874a]">
              foundation
            </span>{" "}
            everything else stands on.
          </h2>

          <p className="text-black/45 text-sm md:text-base leading-relaxed max-w-lg">
            {config.showTravel
              ? "No switching brands, no separate logins — a business runs smarter and its people explore further, all from the same Atlas account."
              : "No templates, no shortcuts — every business gets a system built specifically for it, managed from one Atlas account."}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {FACTS.map(({ value, desc }) => (
            <div
              key={value}
              className="flex items-center gap-5 rounded-2xl border border-black/8 bg-black/1.5 px-6 py-5 hover:border-[#dd9e5e]/30 hover:bg-[#dd9e5e]/3 transition-colors duration-300"
            >
              <div className="h-9 w-1 rounded-full bg-linear-to-b from-[#e8b07a] to-[#c8874a] shrink-0" />
              <div>
                <p className="text-[#0a0908] text-lg font-bold leading-none mb-1.5">{value}</p>
                <p className="text-black/40 text-[12px]">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
