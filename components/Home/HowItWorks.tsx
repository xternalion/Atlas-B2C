"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

const dots = (
  <div className="flex items-center gap-1.5 px-5 py-3.5 border-b border-black/6">
    <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
    <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
    <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
  </div>
);

function RequestMockup() {
  const [mode, setMode] = useState<"software" | "travel">("software");
  return (
    <div className="w-full rounded-3xl border border-black/8 bg-white shadow-[0_30px_80px_rgba(0,0,0,0.08)] overflow-hidden">
      {dots}
      <div className="p-6 flex flex-col gap-5">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/35">New Request</p>

        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/30 mb-2">Project Type</p>
          <div className="inline-flex p-1 gap-1 rounded-full border border-black/8 bg-black/[0.02]">
            <button
              type="button"
              onClick={() => setMode("software")}
              className={`px-4 py-1.5 rounded-full text-[11px] font-bold transition-all duration-200 cursor-pointer ${
                mode === "software" ? "bg-[#0a0908] text-white" : "text-black/40 hover:text-black/70"
              }`}
            >
              SaaS
            </button>
            <button
              type="button"
              onClick={() => setMode("travel")}
              className={`px-4 py-1.5 rounded-full text-[11px] font-bold transition-all duration-200 cursor-pointer ${
                mode === "travel" ? "bg-[#0a0908] text-white" : "text-black/40 hover:text-black/70"
              }`}
            >
              Travel Trip
            </button>
          </div>
        </div>

        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/30 mb-2">
            {mode === "software" ? "Deliverable" : "Trip Style"}
          </p>
          <div className="flex items-center justify-between rounded-xl border border-black/10 px-4 py-2.5 text-[13px] text-black/70 font-medium">
            {mode === "software" ? "Web Platform + CMS" : "AI Itinerary + Booking"}
            <span className="text-black/30">⌄</span>
          </div>
        </div>

        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/30 mb-2">What You Need</p>
          <div className="flex flex-wrap gap-2">
            {(mode === "software" ? ["Auth", "Dashboard", "Automation"] : ["Flights", "Itinerary", "PDF Export"]).map(
              (tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#dd9e5e]/30 bg-[#dd9e5e]/8 px-3 py-1 text-[11px] font-semibold text-[#a0622e]"
                >
                  {tag}
                </span>
              ),
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/30 mb-2">Timeline</p>
            <div className="rounded-xl border border-black/10 px-4 py-2.5 text-[13px] text-black/70 font-medium">
              {mode === "software" ? "4–6 weeks" : "Ready in minutes"}
            </div>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/30 mb-2">Plan</p>
            <div className="rounded-xl border border-black/10 px-4 py-2.5 text-[13px] text-black/70 font-medium">
              Monthly
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function UpdatesMockup() {
  return (
    <div className="w-full rounded-3xl border border-black/8 bg-[#faf9f7] shadow-[0_30px_80px_rgba(0,0,0,0.08)] overflow-hidden">
      <div className="flex items-center gap-3 px-5 py-4 border-b border-black/6">
        <div className="w-8 h-8 rounded-full bg-[#0a0908] flex items-center justify-center shrink-0">
          <span className="text-[#dd9e5e] text-[11px] font-black">A</span>
        </div>
        <p className="text-[#0a0908] text-sm font-extrabold">Atlas</p>
      </div>
      <div className="p-5 flex flex-col gap-3">
        <div className="bg-white border border-black/8 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%]">
          <p className="text-black/70 text-[13px] leading-relaxed">
            Hi Alex — your AtlasCore build just started.
          </p>
        </div>
        <div className="bg-white border border-black/8 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%]">
          <p className="text-black/70 text-[13px] leading-relaxed">
            Milestone: Auth + CMS ready for review. Log in to check your build.
          </p>
        </div>
      </div>
    </div>
  );
}

function ResultsMockup() {
  const items = [
    { title: "AtlasCore Platform", badge: "Live", meta: "Pro Plan" },
    { title: "Bali Itinerary", badge: "Confirmed", meta: "5-day trip" },
  ];
  return (
    <div className="w-full rounded-3xl border border-black/8 bg-white shadow-[0_30px_80px_rgba(0,0,0,0.08)] overflow-hidden">
      {dots}
      <div className="p-5 flex flex-col gap-3">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/35 mb-1">Active (2)</p>
        {items.map((item) => (
          <div
            key={item.title}
            className="flex items-center justify-between gap-3 rounded-2xl border border-black/8 px-4 py-3"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-[#dd9e5e]/10 border border-[#dd9e5e]/25 flex items-center justify-center shrink-0">
                <CheckCircle2 size={16} className="text-[#c8874a]" />
              </div>
              <div className="min-w-0">
                <p className="text-black/80 text-[13px] font-bold truncate">{item.title}</p>
                <p className="text-black/35 text-[11px]">{item.meta}</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-[#1a9b52] bg-[#1a9b52]/10 border border-[#1a9b52]/20 px-2.5 py-1 rounded-full shrink-0">
              {item.badge}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const steps = [
  {
    num: "01",
    eyebrow: "Describe",
    title: "Post your request.",
    body: "SaaS or travel — describe the project or trip you want. Our intake maps your goals, budget, and timeline in minutes.",
    Mockup: RequestMockup,
  },
  {
    num: "02",
    eyebrow: "Under The Hood",
    title: "We build it, and keep you posted.",
    body: "Our team (and AI where it helps) turns your brief into a working platform or a fully planned itinerary — with updates along the way, not radio silence.",
    Mockup: UpdatesMockup,
  },
  {
    num: "03",
    eyebrow: "Grow",
    title: "Launch, and keep scaling.",
    body: "Track your live platform and your bookings from the same account. Subscribe once, keep growing on both sides of Atlas.",
    Mockup: ResultsMockup,
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative overflow-hidden bg-white py-24 2xl:py-32">
      <div className="max-w-6xl mx-auto px-8 md:px-12 2xl:px-0">
        <div className="text-center max-w-xl mx-auto mb-20 md:mb-28">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-8 bg-[#c8874a]" />
            <span className="text-[#c8874a] text-[11px] font-bold tracking-[0.3em] uppercase">How It Works</span>
            <div className="h-px w-8 bg-[#c8874a]" />
          </div>
          <h2 className="cursive font-medium text-[#0a0908] uppercase leading-tight mb-6 text-4xl md:text-5xl">
            You describe it.
            <br />
            <span className="bg-clip-text text-transparent bg-linear-to-r from-[#e8b07a] via-[#dd9e5e] to-[#c8874a]">
              We build it.
            </span>
          </h2>
          <p className="text-black/45 text-sm md:text-base leading-relaxed">
            One intake, two modules. Whether it&apos;s a business platform or
            a planned trip, Atlas turns a short description into a real
            deliverable — fast.
          </p>
        </div>

        <div className="flex flex-col">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className={`grid lg:grid-cols-[auto_1fr_0.9fr] gap-8 lg:gap-14 items-center py-14 ${
                i > 0 ? "border-t border-black/6" : ""
              }`}
            >
              <span className="hidden lg:block text-6xl font-black text-black/10 leading-none">
                {step.num}
              </span>

              <div>
                <p className="lg:hidden text-4xl font-black text-black/10 leading-none mb-3">{step.num}</p>
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="h-px w-6 bg-[#c8874a]" />
                  <span className="text-[#c8874a] text-[10px] font-bold uppercase tracking-[0.3em]">
                    {step.eyebrow}
                  </span>
                </div>
                <h3 className="font-bold text-[#0a0908] text-2xl md:text-3xl leading-snug mb-3">
                  {step.title}
                </h3>
                <p className="text-black/45 text-sm leading-relaxed max-w-md">{step.body}</p>
                {i === steps.length - 1 && (
                  <Link
                    href="/software#get-started-pricing"
                    className="inline-flex items-center gap-1.5 text-[#a0622e] hover:text-[#c8874a] text-sm font-semibold mt-4 transition-colors"
                  >
                    See plans <ArrowRight size={14} />
                  </Link>
                )}
              </div>

              <step.Mockup />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
