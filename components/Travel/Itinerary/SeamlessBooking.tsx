import { FileText, PlaneTakeoff, ShieldCheck } from "lucide-react";

const STEPS = [
  {
    icon: FileText,
    title: "One Itinerary, Fully Priced",
    desc: "Flights, stays, and day-by-day activities generated together — not bounced between five different tabs.",
  },
  {
    icon: PlaneTakeoff,
    title: "Real Flight Data",
    desc: "When your route is available, WanderMind pulls live fares instead of guessing prices.",
  },
  {
    icon: ShieldCheck,
    title: "Confirm With One Click",
    desc: "Like what you see? Confirm the booking straight from your itinerary — no separate checkout to hunt down.",
  },
];

export default function SeamlessBooking() {
  return (
    <section className="relative overflow-hidden bg-[#0d0d0d] text-white py-24 2xl:py-32">
      <div className="absolute -top-32 right-0 w-125 h-125 bg-[#dd9e5e]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-8 md:px-12 2xl:px-0">
        <div className="text-center max-w-xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-8 bg-[#dd9e5e]" />
            <span className="text-[#dd9e5e] text-[11px] font-bold tracking-[0.3em] uppercase">Seamless Booking</span>
            <div className="h-px w-8 bg-[#dd9e5e]" />
          </div>
          <h2 className="cursive font-medium uppercase text-4xl md:text-5xl leading-tight mb-4">
            Plan it once.
            <br />
            <span className="bg-clip-text text-transparent bg-linear-to-r from-[#e8b07a] via-[#dd9e5e] to-[#c8874a]">
              Book it once.
            </span>
          </h2>
          <p className="text-white/45 text-sm md:text-base leading-relaxed">
            No juggling separate sites for flights, hotels, and transport — WanderMind keeps it in one flow.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {STEPS.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="flex flex-col gap-4 p-7 rounded-2xl border border-white/8 bg-white/[0.02]"
            >
              <div className="w-11 h-11 rounded-xl bg-[#dd9e5e]/10 border border-[#dd9e5e]/20 flex items-center justify-center">
                <Icon size={20} className="text-[#dd9e5e]" />
              </div>
              <div>
                <h3 className="text-white font-bold text-base mb-1.5">{title}</h3>
                <p className="text-white/40 text-[13px] leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
