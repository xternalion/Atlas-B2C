"use client";

import React, { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";

interface WaitlistForm {
  name: string;
  business_name: string;
  email: string;
  phone: string;
  industry: string;
  website: string;
  challenge: string;
  intent: string;
}

const INITIAL: WaitlistForm = {
  name: "",
  business_name: "",
  email: "",
  phone: "",
  industry: "",
  website: "",
  challenge: "",
  intent: "",
};

const INTENTS = [
  {
    key: "custom_website",
    label: "Request a Custom Website",
    desc: "You need a bespoke website built to your brand.",
  },
  {
    key: "platform_waitlist",
    label: "Join Platform Waitlist",
    desc: "Get early access to the AtlasCreate platform.",
  },
  {
    key: "consultation",
    label: "Book a Consultation",
    desc: "Talk to our team about your project goals.",
  },
];

const INDUSTRIES = [
  "E-Commerce",
  "Technology",
  "Healthcare",
  "Education",
  "Finance",
  "Real Estate",
  "Hospitality",
  "Creative Agency",
  "Startup",
  "Other",
];

const inputCls =
  "w-full bg-white/[0.04] border border-white/[0.09] rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#dd9e5e]/60 transition-colors duration-200";

export default function Waitlist() {
  const [form, setForm] = useState<WaitlistForm>(INITIAL);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.intent) {
      setMessage("Please select one of the options above before submitting.");
      return;
    }
    setLoading(true);
    setMessage("");

    const res = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      setMessage("Something went wrong. Please try again.");
      setLoading(false);
      return;
    }

    setSubmitted(true);
    setLoading(false);
  };

  return (
    <section
      id="waitlist"
      className="relative bg-[#070706] py-24 2xl:py-30 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(221,158,94,0.05),transparent)]" />

      <div className="max-w-6xl mx-auto px-4 md:px-8 2xl:px-0 relative z-10">
        {/* eyebrow */}
        <div className="flex items-center gap-3 mb-12">
          <div className="h-px w-10 bg-[#dd9e5e]/70" />
          <span className="text-[#dd9e5e] text-[10px] font-bold tracking-[0.35em] uppercase">
            Early Access
          </span>
        </div>

        <div className="grid lg:grid-cols-[1fr_500px] gap-16 items-start">
          {/* LEFT: copy + intent selector */}
          <div>
            <h2 className="cursive text-4xl 2xl:text-5xl font-medium text-white leading-tight uppercase mb-4">
              Join the AtlasCreate
              <br />
              <span className="text-[#dd9e5e]">Early Access Waitlist.</span>
            </h2>
            <p className="text-white/40 text-sm leading-relaxed max-w-md mb-10">
              We&apos;re selectively onboarding new clients. Tell us about your
              business and we&apos;ll reach out when a slot opens that&apos;s
              right for you.
            </p>

            <p className="text-[11px] font-bold text-white/30 uppercase tracking-widest mb-4">
              What are you looking for?
            </p>

            <div className="flex flex-col gap-3">
              {INTENTS.map((intent) => (
                <button
                  key={intent.key}
                  type="button"
                  onClick={() => setForm({ ...form, intent: intent.key })}
                  className={`flex items-start gap-4 text-left px-5 py-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
                    form.intent === intent.key
                      ? "border-[#dd9e5e]/50 bg-[#dd9e5e]/[0.06]"
                      : "border-white/[0.07] bg-white/[0.02] hover:border-white/15"
                  }`}
                >
                  <div
                    className={`mt-0.5 w-5 h-5 rounded-full border shrink-0 flex items-center justify-center transition-colors ${
                      form.intent === intent.key
                        ? "border-[#dd9e5e] bg-[#dd9e5e]"
                        : "border-white/20"
                    }`}
                  >
                    {form.intent === intent.key && (
                      <Check size={11} className="text-black" />
                    )}
                  </div>
                  <div>
                    <p
                      className={`text-sm font-semibold mb-0.5 transition-colors ${
                        form.intent === intent.key
                          ? "text-[#dd9e5e]"
                          : "text-white/70"
                      }`}
                    >
                      {intent.label}
                    </p>
                    <p className="text-xs text-white/30">{intent.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: form or success */}
          {submitted ? (
            <div className="flex flex-col items-center justify-center text-center py-20 px-8 rounded-3xl border border-[#dd9e5e]/20 bg-[#dd9e5e]/[0.04]">
              <div className="w-14 h-14 rounded-full bg-[#dd9e5e]/15 border border-[#dd9e5e]/30 flex items-center justify-center mb-5">
                <Check size={24} className="text-[#dd9e5e]" />
              </div>
              <h3 className="text-xl font-bold text-white uppercase tracking-wider mb-2">
                You&apos;re on the list.
              </h3>
              <p className="text-white/40 text-sm max-w-xs leading-relaxed">
                We review applications weekly and will reach out when we have a
                slot that fits your business.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-[#0a0908] rounded-3xl border border-white/[0.07] p-8 flex flex-col gap-5"
            >
              <div className="mb-1">
                <h3 className="text-xl font-bold text-white uppercase tracking-wider mb-1">
                  Your Details
                </h3>
                <p className="text-white/30 text-sm">
                  We review every application personally.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-bold text-white/40 uppercase tracking-widest">
                    Name <span className="text-[#dd9e5e]">*</span>
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    type="text"
                    placeholder="Your name"
                    className={inputCls}
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-bold text-white/40 uppercase tracking-widest">
                    Business Name <span className="text-[#dd9e5e]">*</span>
                  </label>
                  <input
                    name="business_name"
                    value={form.business_name}
                    onChange={handleChange}
                    type="text"
                    placeholder="Your company"
                    className={inputCls}
                    required
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-bold text-white/40 uppercase tracking-widest">
                    Email <span className="text-[#dd9e5e]">*</span>
                  </label>
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="you@example.com"
                    className={inputCls}
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-bold text-white/40 uppercase tracking-widest">
                    Phone
                  </label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    type="tel"
                    placeholder="+94 77 000 0000"
                    className={inputCls}
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-bold text-white/40 uppercase tracking-widest">
                    Industry <span className="text-[#dd9e5e]">*</span>
                  </label>
                  <select
                    name="industry"
                    value={form.industry}
                    onChange={handleChange}
                    className={`${inputCls} appearance-none`}
                    required
                  >
                    <option value="" disabled>
                      Select industry
                    </option>
                    {INDUSTRIES.map((ind) => (
                      <option key={ind} value={ind}>
                        {ind}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-bold text-white/40 uppercase tracking-widest">
                    Website
                  </label>
                  <input
                    name="website"
                    value={form.website}
                    onChange={handleChange}
                    type="url"
                    placeholder="https://yourbusiness.com"
                    className={inputCls}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-bold text-white/40 uppercase tracking-widest">
                  Biggest Challenge <span className="text-[#dd9e5e]">*</span>
                </label>
                <textarea
                  name="challenge"
                  value={form.challenge}
                  onChange={handleChange}
                  placeholder="What's the biggest challenge you're trying to solve with your digital presence?"
                  rows={3}
                  className={`${inputCls} resize-none`}
                  required
                />
              </div>

              {message && (
                <p
                  className={`text-xs font-semibold text-center px-4 py-3 rounded-xl border ${
                    message.startsWith("Something") ||
                    message.startsWith("Please")
                      ? "bg-red-500/10 text-red-400 border-red-500/20"
                      : "bg-[#dd9e5e]/10 text-[#dd9e5e] border-[#dd9e5e]/20"
                  }`}
                >
                  {message}
                </p>
              )}

              <div className="flex justify-end mt-1">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary-base"
                >
                  {loading ? "Submitting…" : "Join the Waitlist"}
                  <ArrowUpRight size={18} />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
