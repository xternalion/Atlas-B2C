import React from "react";
import { Layers, Sparkles, TrendingUp, Compass } from "lucide-react";

const VALUES = [
  {
    title: "Systems First",
    description:
      "Every product we build starts with architecture. We think infrastructure before pixels — foundations that don't need rebuilding six months later.",
    icon: <Layers size={24} className="text-[#dd9e5e]" />,
  },
  {
    title: "Craft Over Speed",
    description:
      "We take the time to get it right. Quality is the only deadline that matters — we'd rather ship something excellent late than something mediocre on time.",
    icon: <Sparkles size={24} className="text-[#dd9e5e]" />,
  },
  {
    title: "Built to Scale",
    description:
      "We architect for growth. Every system we design is built to expand without rebuilding — today's startup infrastructure becomes tomorrow's enterprise backbone.",
    icon: <TrendingUp size={24} className="text-[#dd9e5e]" />,
  },
  {
    title: "Long-term Thinking",
    description:
      "We design for where a product needs to be in a few years, not just at launch. Every decision favors durability over shortcuts.",
    icon: <Compass size={24} className="text-[#dd9e5e]" />,
  },
];

const Values = () => {
  return (
    <section className="bg-[#0d0d0d] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(221,158,94,0.04),transparent)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/5 to-transparent" />

      <div className="max-w-6xl mx-auto py-24 2xl:py-32 px-6 md:px-12 2xl:px-0 relative z-10 flex flex-col gap-12">
        <div className="flex flex-col gap-4 max-w-xl">
          <span className="text-[11px] w-fit font-bold tracking-widest uppercase text-[#dd9e5e] bg-[#dd9e5e]/10 border border-[#dd9e5e]/30 px-4 py-1.5 rounded-full">
            Our Principles
          </span>
          <h2 className="cursive text-4xl 2xl:text-5xl leading-[1.05]">
            What We <span className="text-[#dd9e5e]">Stand For</span>
          </h2>
          <p className="text-white/40 text-sm font-light leading-relaxed">
            Four principles that guide every decision and every product we
            build under the Atlas name.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {VALUES.map((val) => (
            <div
              key={val.title}
              className="group relative bg-white/3 border border-white/[0.07] rounded-2xl p-7 hover:border-[#dd9e5e]/25 hover:bg-white/5 transition-all duration-300 flex flex-col gap-5 overflow-hidden"
            >
              <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#dd9e5e]/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
              <div className="w-11 h-11 bg-[#dd9e5e]/8 border border-[#dd9e5e]/15 rounded-xl flex items-center justify-center group-hover:bg-[#dd9e5e]/12 transition-colors">
                {val.icon}
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-semibold text-white">{val.title}</h3>
                <p className="text-[12px] text-white/40 leading-relaxed font-light">
                  {val.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Values;