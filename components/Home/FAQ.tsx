"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { config } from "@/lib/config";

const FAQS = [
  {
    q: "What does Atlas actually do?",
    a: "Atlas is one brand running two modules: SaaS (websites, CMS platforms, and business automation on subscription plans) and Travel (AI-powered itinerary generation, flight/package search, and booking).",
  },
  {
    q: "Can I use both SaaS and Travel services?",
    a: "Yes. Both modules share one account, so you can manage your SaaS subscription and travel bookings from the same place.",
  },
  {
    q: "How does billing work?",
    a: "You can pay a one-time fee for a project build, subscribe monthly to the self-serve SaaS Starter plan, or talk to us for a custom or enterprise build.",
  },
  {
    q: "How does the AI travel itinerary work?",
    a: "You describe the trip you want, our AI processes the request, fetches real flight and package data, generates a full itinerary, and exports it as a PDF you can confirm into a booking.",
  },
  {
    q: "Do you work with international clients?",
    a: "Absolutely. Atlas serves clients globally for both SaaS and Travel — most collaboration happens remotely.",
  },
  {
    q: "Can I reach you via WhatsApp?",
    a: "Yes. WhatsApp is often the fastest way to reach us — find the link in the contact section or footer.",
  },
];

export default function HomeFAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="relative overflow-hidden bg-[#0d0d0d] text-white py-24 2xl:py-32">
      <div className="max-w-6xl mx-auto px-8 md:px-12 2xl:px-0 grid lg:grid-cols-[0.8fr_1.2fr] gap-16">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-[#dd9e5e]" />
            <span className="text-[#dd9e5e] text-[11px] font-bold tracking-[0.3em] uppercase">FAQ</span>
          </div>
          <h2 className="cursive font-medium text-white uppercase text-4xl md:text-5xl leading-tight mb-6">
            Frequently
            <br />
            <span className="bg-clip-text text-transparent bg-linear-to-r from-[#e8b07a] via-[#dd9e5e] to-[#c8874a]">
              asked.
            </span>
          </h2>
          <p className="text-white/40 text-sm leading-relaxed">
            Still have questions? Email{" "}
            <a
              href={`mailto:${config.contact.email}`}
              className="text-[#dd9e5e] underline hover:text-[#e8b07a] transition-colors"
            >
              {config.contact.email}
            </a>
            .
          </p>
        </div>

        <div className="flex flex-col">
          {FAQS.map(({ q, a }, i) => {
            const isOpen = openIdx === i;
            return (
              <div key={q} className={`py-6 ${i > 0 ? "border-t border-white/8" : ""}`}>
                <button
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-6 text-left cursor-pointer"
                >
                  <span className="text-white text-base md:text-lg font-bold">{q}</span>
                  <span className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center shrink-0 text-white/60">
                    {isOpen ? <X size={14} /> : <Plus size={14} />}
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-48 mt-4" : "max-h-0"
                  }`}
                >
                  <p className="text-white/45 text-sm leading-relaxed max-w-xl">{a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
