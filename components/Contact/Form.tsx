"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  Check,
  Phone,
  MessageCircle,
  Mail,
  User,
  Building2,
  Globe,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { config } from "@/lib/config";

const WA_NUMBER = config.whatsapp.number;

const SERVICE_OPTIONS = [
  "Custom Website",
  "CMS Platform",
  "Business Automation",
  "Brand Identity",
  "Partnership",
  "General Enquiry",
];

const INDUSTRIES = [
  "Professional Services",
  "E-commerce",
  "Healthcare",
  "Education",
  "Real Estate",
  "Finance",
  "Travel",
  "Hospitality",
  "Retail",
  "Technology",

  "Other",
];

interface FormState {
  full_name: string;
  business_name: string;
  email: string;
  phone: string;
  industry: string;
  website: string;
  inquiry_type: string[];
  message: string;
  newsletter: boolean;
}

const INITIAL: FormState = {
  full_name: "",
  business_name: "",
  email: "",
  phone: "",
  industry: "Professional Services",
  website: "",
  inquiry_type: [],
  message: "",
  newsletter: false,
};

const inputCls =
  "w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-[#dd9e5e]/60 focus:ring-2 focus:ring-[#dd9e5e]/10 transition-colors duration-200";

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.inquiry_type.length === 0) {
      setError("Please select at least one option.");
      return;
    }
    setLoading(true);
    setError("");

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
      return;
    }

    setSubmitted(true);
    setLoading(false);
  };

  return (
    <section
      id="contact"
      className="relative bg-linear-to-b from-gray-100 via-gray-50 to-white py-24 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(221,158,94,0.05),transparent)] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 md:px-12 2xl:px-0">
        <div className="grid lg:grid-cols-[340px_1fr] gap-10 lg:gap-16">
          {/* Left: info panel */}
          <div className="flex flex-col gap-8">
            <div>
              <p className="text-[#dd9e5e] text-[12px] font-semibold uppercase tracking-[0.32em] mb-4">
                Contact Us
              </p>
              <h2 className="cursive text-3xl md:text-4xl text-gray-900 leading-[1.07] tracking-tight mb-4">
                We&apos;d Love to{" "}
                <span className="text-[#dd9e5e]">Hear from You</span>
              </h2>
              <p className="text-gray-400 text-[13.5px] font-light leading-relaxed">
                Fill in the form and our team will get back to you within one
                business day — whether it&apos;s a new build, a consultation, or
                a partnership.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {[
                {
                  icon: Phone,
                  label: "Call Us",
                  value: config.contact.phone,
                  href: `tel:${config.contact.phoneTel}`,
                  external: false,
                },
                {
                  icon: MessageCircle,
                  label: "WhatsApp",
                  value: "Chat on WhatsApp",
                  href: `https://wa.me/${WA_NUMBER}`,
                  external: true,
                },
                {
                  icon: Mail,
                  label: "Email",
                  value: config.contact.email,
                  href: `mailto:${config.contact.email}`,
                  external: false,
                },
              ].map(({ icon: Icon, label, value, href, external }) => (
                <Link
                  key={label}
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[#dd9e5e]/15 to-[#dd9e5e]/5 border border-[#dd9e5e]/20 flex items-center justify-center shrink-0 group-hover:border-[#dd9e5e]/40 transition-colors">
                    <Icon
                      size={16}
                      className="text-[#dd9e5e]"
                      strokeWidth={1.6}
                    />
                  </div>
                  <div>
                    <p className="text-gray-400 text-[10px] font-semibold uppercase tracking-[0.22em] mb-0.5">
                      {label}
                    </p>
                    <p className="text-gray-700 text-[13px] font-medium group-hover:text-[#dd9e5e] transition-colors duration-200">
                      {value}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-2.5 border border-gray-200 rounded-xl px-4 py-2.5 bg-gray-50 w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <p className="text-[11px] text-gray-500 font-semibold tracking-wide">
                Mon–Fri 9am–6pm GMT
              </p>
            </div>
          </div>

          {/* Right: form or success */}
          {submitted ? (
            <div className="relative bg-gray-50 border border-gray-200 rounded-3xl flex flex-col items-center justify-center text-center py-20 px-8">
              <div className="w-14 h-14 rounded-full bg-[#dd9e5e]/10 border border-[#dd9e5e]/30 flex items-center justify-center mb-5">
                <Check size={24} className="text-[#dd9e5e]" />
              </div>
              <h3 className="cursive text-2xl font-semibold text-gray-900 mb-2">
                Message Received
              </h3>
              <p className="text-gray-400 text-sm max-w-xs leading-relaxed">
                Our team will review your enquiry and reach out within one
                business day.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setForm(INITIAL);
                }}
                className="mt-6 text-[#dd9e5e] text-xs font-semibold tracking-widest uppercase hover:text-[#c8874a] transition-colors"
              >
                Send Another
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="relative bg-white border border-gray-100 shadow-[0_20px_60px_rgba(0,0,0,0.06)] rounded-3xl p-8 md:p-10 flex flex-col gap-7"
            >
              {/* Header */}
              <div>
                <h3 className="text-gray-900 font-bold text-xl tracking-tight mb-1">
                  Start Your Project
                </h3>
                <p className="text-gray-400 text-xs leading-relaxed">
                  We review every enquiry and respond within one business day.
                </p>
              </div>

              {/* What are you looking for */}
              <div className="flex flex-col gap-3">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                  What are you looking for?{" "}
                  <span className="text-[#dd9e5e]">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {SERVICE_OPTIONS.map((opt) => {
                    const selected = form.inquiry_type.includes(opt);
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() =>
                          setForm({
                            ...form,
                            inquiry_type: selected
                              ? form.inquiry_type.filter((v) => v !== opt)
                              : [...form.inquiry_type, opt],
                          })
                        }
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-xl border text-xs font-semibold transition-all duration-200 cursor-pointer ${
                          selected
                            ? "border-[#dd9e5e]/50 bg-[#dd9e5e]/10 text-[#c8874a]"
                            : "border-gray-200 bg-gray-50 text-gray-500 hover:border-[#dd9e5e]/30 hover:text-[#c8874a]"
                        }`}
                      >
                        {selected && <Check size={10} className="shrink-0" />}
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Name + Business Name */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                    Name <span className="text-[#dd9e5e]">*</span>
                  </label>
                  <div className="relative">
                    <User size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
                    <input
                      name="full_name"
                      value={form.full_name}
                      onChange={handleChange}
                      type="text"
                      placeholder="Your name"
                      className={`${inputCls} pl-11`}
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                    Business Name <span className="text-[#dd9e5e]">*</span>
                  </label>
                  <div className="relative">
                    <Building2 size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
                    <input
                      name="business_name"
                      value={form.business_name}
                      onChange={handleChange}
                      type="text"
                      placeholder="Your company"
                      className={`${inputCls} pl-11`}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Email + Phone */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                    Email <span className="text-[#dd9e5e]">*</span>
                  </label>
                  <div className="relative">
                    <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
                    <input
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      type="email"
                      placeholder="you@example.com"
                      className={`${inputCls} pl-11`}
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                    Phone
                  </label>
                  <div className="relative">
                    <Phone size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      type="tel"
                      placeholder="+94 77 000 0000"
                      className={`${inputCls} pl-11`}
                    />
                  </div>
                </div>
              </div>

              {/* Industry + Website */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                    Industry <span className="text-[#dd9e5e]">*</span>
                  </label>
                  <div className="relative">
                    <select
                      name="industry"
                      value={form.industry}
                      onChange={handleChange}
                      className={`${inputCls} appearance-none pr-10`}
                      required
                    >
                      <option value="" disabled>
                        Select industry
                      </option>
                      {INDUSTRIES.map((i) => (
                        <option key={i} value={i}>
                          {i}
                        </option>
                      ))}
                    </select>
                    <ChevronDown size={15} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                    Website
                  </label>
                  <div className="relative">
                    <Globe size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
                    <input
                      name="website"
                      value={form.website}
                      onChange={handleChange}
                      type="url"
                      placeholder="https://yourbusiness.com"
                      className={`${inputCls} pl-11`}
                    />
                  </div>
                </div>
              </div>

              {/* Biggest Challenge */}
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                  Biggest Challenge <span className="text-[#dd9e5e]">*</span>
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="What's the biggest challenge you're trying to solve with your digital presence?"
                  rows={4}
                  className={`${inputCls} resize-none`}
                  required
                />
              </div>

              {/* Newsletter */}
              <label className="flex items-center gap-3 cursor-pointer group w-fit">
                <div
                  onClick={() =>
                    setForm({ ...form, newsletter: !form.newsletter })
                  }
                  className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-all duration-200 ${
                    form.newsletter
                      ? "bg-[#dd9e5e] border-[#dd9e5e]"
                      : "bg-gray-50 border-gray-300 group-hover:border-[#dd9e5e]/50"
                  }`}
                >
                  {form.newsletter && (
                    <Check size={10} className="text-black" strokeWidth={3} />
                  )}
                </div>
                <span className="text-gray-400 text-xs group-hover:text-gray-600 transition-colors">
                  Keep me updated with tips &amp; insights
                </span>
              </label>

              {error && (
                <p className="text-xs font-semibold text-center px-4 py-3 rounded-xl border bg-[#dd9e5e]/8 text-[#c8874a] border-[#dd9e5e]/20">
                  {error}
                </p>
              )}

              <div className="flex justify-start">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary-base disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? "Sending…" : "Start My Project"}
                  {!loading && <ArrowUpRight size={15} />}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
