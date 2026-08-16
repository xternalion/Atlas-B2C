"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "How do I get started with Atlas?",
    a: "Fill out the project form above, select what you're looking for, and tell us about your biggest challenge. We'll review your submission and get back to you within one business day to discuss next steps.",
  },
  {
    q: "What services does Atlas offer?",
    a: "We build custom websites, CMS platforms, and business automation systems. We also handle full brand identity — from visual identity to digital infrastructure — helping businesses operate smarter and grow faster.",
  },
  {
    q: "How long does a typical project take?",
    a: "Timelines depend on project scope. A custom website typically takes 2–4 weeks. A full CMS platform or automation system can range from 4–10 weeks. We'll provide a clear timeline after the discovery stage.",
  },
  {
    q: "Who owns the work once it's delivered?",
    a: "You own all your logos, branding, content, and business data. Atlas retains ownership of reusable frameworks, CMS engines, and internal systems. Source code transfer is available when explicitly agreed in writing.",
  },
  {
    q: "Can I reach you via WhatsApp?",
    a: "Yes. WhatsApp is often the fastest way to reach us for quick questions. Tap 'Chat on WhatsApp' in the contact section above or find the link in the footer.",
  },
  {
    q: "Do you work with international clients?",
    a: "Absolutely. Atlas serves clients globally. Most collaboration happens remotely over video calls, email, and shared workspaces — no matter where you're based.",
  },
];

const ContactFAQ = () => {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative bg-[#0d0d0d] overflow-hidden">
      <style>{`
        @keyframes cfUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
        .cf{opacity:0}
        .cf-in .cf-h{animation:cfUp 0.85s ease-out forwards}
        .cf-in .cf-1{animation:cfUp 0.7s 0.05s ease-out forwards}
        .cf-in .cf-2{animation:cfUp 0.7s 0.10s ease-out forwards}
        .cf-in .cf-3{animation:cfUp 0.7s 0.15s ease-out forwards}
        .cf-in .cf-4{animation:cfUp 0.7s 0.20s ease-out forwards}
        .cf-in .cf-5{animation:cfUp 0.7s 0.25s ease-out forwards}
        .cf-in .cf-6{animation:cfUp 0.7s 0.30s ease-out forwards}
      `}</style>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_0%,rgba(221,158,94,0.06),transparent)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      <div
        className={`relative max-w-6xl mx-auto px-6 md:px-12 2xl:px-0 py-20 md:py-28 ${
          inView ? "cf-in" : ""
        }`}
      >
        <div className="text-center max-w-xl mx-auto mb-14">
          <p className="cf cf-h text-[#dd9e5e] text-[12px] font-semibold uppercase tracking-[0.32em] mb-4">
            FAQ
          </p>
          <h2 className="cf cf-h cursive text-3xl md:text-4xl text-white leading-[1.07] tracking-tight mb-4">
            Frequently Asked{" "}
            <span className="text-[#dd9e5e]">Questions</span>
          </h2>
          <p className="cf cf-h text-white/40 text-[13.5px] font-light leading-relaxed">
            Can&apos;t find what you&apos;re looking for? Use the form above to
            get in touch directly.
          </p>
        </div>

        <div className="max-w-2xl mx-auto flex flex-col gap-3">
          {FAQS.map(({ q, a }, i) => (
            <div
              key={i}
              className={`cf cf-${i + 1} border rounded-2xl overflow-hidden transition-all duration-300 ${
                openIdx === i
                  ? "bg-white/5 border-[#dd9e5e]/20"
                  : "bg-white/2 border-white/8"
              }`}
            >
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
              >
                <span className="text-white text-[14px] font-semibold leading-snug">
                  {q}
                </span>
                <ChevronDown
                  size={16}
                  className={`shrink-0 text-[#dd9e5e] transition-transform duration-300 ${
                    openIdx === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIdx === i ? "max-h-48" : "max-h-0"
                }`}
              >
                <p className="px-6 pb-5 text-white/45 text-[13px] leading-relaxed font-light">
                  {a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactFAQ;
