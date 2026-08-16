"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ArrowUpRight } from "lucide-react";
import { config } from "@/lib/config";

const waUrl = (msg: string) =>
  `https://wa.me/${config.whatsapp.pricingNumber}?text=${encodeURIComponent(msg)}`;

type Basis = "onetime" | "monthly";

type Tier = {
  name: string;
  lkr: string;
  usd: string;
  period: string;
  duration?: string;
  badge?: string;
  features: string[];
  href: string;
  external?: boolean;
};

const onetimeTiers: Tier[] = [
  {
    name: "Basic",
    lkr: "95,000",
    usd: "297",
    period: "one-time",
    duration: "1–2 weeks",
    features: [
      "Up to 3 pages",
      "Custom website design",
      "Mobile responsive",
      "Basic SEO setup",
      "Contact form",
      "30 days post-launch support",
    ],
    href: waUrl(
      `Hi ${config.companyName}! I'm interested in the *Basic* one-time build — LKR 95,000 / $297. Could we discuss details?\n\n${config.websiteUrl}`,
    ),
    external: true,
  },
  {
    name: "Standard",
    lkr: "165,000",
    usd: "516",
    period: "one-time",
    duration: "2–4 weeks",
    badge: "Most Popular",
    features: [
      "Up to 7 pages",
      "Dynamic & editable content",
      "SEO optimization",
      "Contact form & WhatsApp",
      "4 revision rounds",
      "2 months post-launch support",
    ],
    href: waUrl(
      `Hi ${config.companyName}! I'm interested in the *Standard* one-time build — LKR 165,000 / $516. Could we discuss details?\n\n${config.websiteUrl}`,
    ),
    external: true,
  },
  {
    name: "Premium",
    lkr: "275,000",
    usd: "859",
    period: "one-time",
    duration: "4–6 weeks",
    features: [
      "Unlimited pages",
      "Full CMS access",
      "Advanced SEO",
      "Contact, WhatsApp & API",
      "8 revision rounds",
      "3 months priority support",
    ],
    href: waUrl(
      `Hi ${config.companyName}! I'm interested in the *Premium* one-time build — LKR 275,000 / $859. Could we discuss details?\n\n${config.websiteUrl}`,
    ),
    external: true,
  },
];

const monthlyTiers: Tier[] = [
  {
    name: "Starter",
    lkr: "9,500",
    usd: "29",
    period: "/mo",
    features: [
      "Up to 3 SaaS projects",
      "AI travel itinerary generation",
      "Full CMS access",
      "Email support",
    ],
    href: "/billing?plan=basic",
  },
  {
    name: "Growth",
    lkr: "30,000",
    usd: "94",
    period: "/mo",
    badge: "Most Popular",
    features: [
      "Everything in Starter",
      "Unlimited SaaS projects",
      "Priority support",
      "Performance optimization",
      "Monthly strategy call",
    ],
    href: "/billing?plan=pro",
  },
  {
    name: "Partner",
    lkr: "55,000",
    usd: "172",
    period: "/mo",
    features: [
      "Everything in Growth",
      "Dedicated point of contact",
      "New feature development",
      "Quarterly strategy session",
      "Emergency response (4h)",
    ],
    href: waUrl(
      `Hi ${config.companyName}! I'm interested in the *Partner* plan — LKR 55,000/mo / $172/mo. Could we discuss details?\n\n${config.websiteUrl}`,
    ),
    external: true,
  },
];

export default function GetStarted() {
  const [basis, setBasis] = useState<Basis>("onetime");
  const tiers = basis === "onetime" ? onetimeTiers : monthlyTiers;

  return (
    <section id="get-started-pricing" className="relative overflow-hidden bg-[#0d0d0d] text-white py-24 2xl:py-32">
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-125 h-125 bg-[#dd9e5e]/4 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 md:px-12 2xl:px-0 flex flex-col items-center text-center">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px w-8 bg-[#dd9e5e]" />
          <span className="text-[#dd9e5e] text-[11px] font-bold tracking-[0.3em] uppercase">Pricing</span>
          <div className="h-px w-8 bg-[#dd9e5e]" />
        </div>
        <h2 className="cursive font-medium uppercase text-4xl md:text-5xl leading-tight mb-4">
          One simple way
          <br />
          <span className="bg-clip-text text-transparent bg-linear-to-r from-[#e8b07a] via-[#dd9e5e] to-[#c8874a]">
            to start.
          </span>
        </h2>
        <p className="text-white/45 text-sm md:text-base leading-relaxed mb-8 max-w-xl">
          Pay once for a build, subscribe monthly for ongoing SaaS — priced in
          LKR and USD. Or talk to us for something custom-built.
        </p>

        <div className="inline-flex p-1 gap-1 rounded-full border border-white/10 bg-white/5 mb-12">
          <button
            type="button"
            onClick={() => setBasis("onetime")}
            className={`px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-wide transition-all duration-200 cursor-pointer ${
              basis === "onetime" ? "bg-[#dd9e5e] text-white" : "text-white/40 hover:text-white/70"
            }`}
          >
            One-Time Build
          </button>
          <button
            type="button"
            onClick={() => setBasis("monthly")}
            className={`px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-wide transition-all duration-200 cursor-pointer ${
              basis === "monthly" ? "bg-[#dd9e5e] text-white" : "text-white/40 hover:text-white/70"
            }`}
          >
            Monthly Subscription
          </button>
        </div>

        {/* Tier grid */}
        <div className="grid md:grid-cols-3 gap-5 w-full mb-6">
          {tiers.map((tier) => {
            const isPopular = tier.badge === "Most Popular";
            return (
              <div
                key={tier.name}
                className={`relative flex flex-col rounded-3xl p-7 text-left transition-all duration-300 ${
                  isPopular
                    ? "bg-white text-[#0a0908] shadow-[0_30px_80px_rgba(0,0,0,0.35)] ring-1 ring-[#dd9e5e]/40"
                    : "bg-white/[0.03] border border-white/10 text-white"
                }`}
              >
                {tier.badge && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-linear-to-r from-[#e8b07a] via-[#dd9e5e] to-[#c8874a] text-white text-[9px] font-black tracking-[0.2em] uppercase px-4 py-1.5 rounded-full whitespace-nowrap">
                    {tier.badge}
                  </span>
                )}

                <h3 className={`font-bold text-xl mb-1 ${isPopular ? "text-[#0a0908]" : "text-white"}`}>
                  {tier.name}
                </h3>
                {tier.duration && (
                  <p className={`text-xs mb-4 ${isPopular ? "text-black/35" : "text-white/35"}`}>
                    Est. {tier.duration}
                  </p>
                )}

                <div className={`h-px mb-4 ${isPopular ? "bg-black/8" : "bg-white/10"} ${!tier.duration ? "mt-4" : ""}`} />

                <div className="flex items-baseline gap-1.5 flex-wrap">
                  <span className="text-2xl font-black">LKR {tier.lkr}</span>
                  <span className={`text-xs font-semibold ${isPopular ? "text-black/35" : "text-white/35"}`}>
                    {tier.period}
                  </span>
                </div>
                <p className={`text-xs mb-5 ${isPopular ? "text-black/40" : "text-white/40"}`}>
                  ≈ ${tier.usd} USD {tier.period}
                </p>

                <ul className="flex flex-col gap-2.5 flex-1 mb-6">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-[13px]">
                      <Check size={14} className="text-[#c8874a] mt-0.5 shrink-0" />
                      <span className={isPopular ? "text-black/70" : "text-white/60"}>{f}</span>
                    </li>
                  ))}
                </ul>

                {tier.external ? (
                  <a
                    href={tier.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={isPopular ? "btn-primary-base" : "btn-primary-outline"}
                  >
                    Get Started <ArrowUpRight size={15} />
                  </a>
                ) : (
                  <Link href={tier.href} className={isPopular ? "btn-primary-base" : "btn-primary-outline"}>
                    Subscribe <ArrowUpRight size={15} />
                  </Link>
                )}
              </div>
            );
          })}
        </div>

        {/* Custom / by application */}
        <div className="w-full rounded-3xl border border-white/10 bg-white/[0.03] p-7 md:p-8 flex flex-col md:flex-row items-center justify-between gap-5 text-left">
          <div>
            <span className="inline-flex text-[10px] font-bold uppercase tracking-wide text-white/50 bg-white/5 border border-white/10 px-3 py-1 rounded-full mb-3">
              By Application
            </span>
            <h3 className="font-bold text-2xl md:text-3xl text-white mb-1.5">
              Custom & Enterprise Builds
            </h3>
            <p className="text-white/40 text-sm leading-relaxed max-w-md">
              Larger platform, multi-market travel program, or dedicated
              support? We scope and build it with you directly — one-time or
              monthly, whichever fits.
            </p>
          </div>
          <a
            href={waUrl(
              `Hi ${config.companyName}! I'm interested in a custom / enterprise build — could we discuss details?\n\n${config.websiteUrl}`,
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-light-glass !w-fit shrink-0"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}
