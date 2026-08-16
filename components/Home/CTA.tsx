import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { config } from "@/lib/config";

export default function FinalCTA() {
  return (
    <section id="get-started" className="relative bg-white">
      <div className="max-w-6xl mx-auto pb-12 px-6 md:px-12 2xl:px-0">
        <div className="relative rounded-4xl overflow-hidden min-h-[380px] flex items-center bg-[#0d0d0d]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_0%,rgba(221,158,94,0.12),transparent)]" />

          <div className="relative z-10 w-full px-10 md:px-16 py-14 flex flex-col items-center text-center gap-4">
            <span className="text-[11px] font-bold tracking-widest uppercase text-[#dd9e5e] bg-[#dd9e5e]/10 border border-[#dd9e5e]/30 px-4 py-1.5 rounded-full">
              {config.showTravel ? "One Brand. Software & Travel." : "Digital Infrastructure, Built Right."}
            </span>

            <h2 className="cursive font-medium uppercase text-4xl md:text-5xl text-white">
              Ready to Get
              <br />
              <span className="bg-clip-text text-transparent bg-linear-to-r from-[#e8b07a] via-[#dd9e5e] to-[#c8874a]">
                Started?
              </span>
            </h2>

            <p className="text-xs font-normal tracking-wide text-white/40 max-w-2xl leading-relaxed">
              {config.showTravel
                ? "Whether you need a digital foundation for your business or your next trip planned in minutes — Atlas has a plan for you."
                : "Whatever your business needs — a website, a platform, or a full digital system — Atlas has a plan for you."}
            </p>

            <div className="flex flex-col items-center gap-4 justify-center mt-2">
              <Link href="/software#get-started-pricing" className="btn-primary-base">
                Start with SaaS <ArrowUpRight size={16} />
              </Link>
              {config.showTravel && (
                <Link href="/travel/itinerary" className="btn-light-glass">
                  Plan a Trip
                </Link>
              )}
            </div>

            <p className="text-[11px] text-white/30 mt-4">
              Or reach us directly at{" "}
              <a
                href={`mailto:${config.contact.email}`}
                className="text-white/50 hover:text-[#dd9e5e] transition-colors"
              >
                {config.contact.email}
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
