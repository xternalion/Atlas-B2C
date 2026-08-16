"use client";

import Image from "next/image";

const ContactHeader = () => {
  return (
    <section className="relative bg-[#0d0d0d] overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      <Image
        src="/contact.webp"
        alt=""
        fill
        className="object-cover opacity-25"
        priority
      />
      <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-black/20" />
      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/20" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="relative max-w-6xl mx-auto px-6 md:px-12 2xl:px-0">
        <p className="text-[#dd9e5e] text-[12px] md:text-[13px] font-semibold uppercase tracking-[0.32em] mb-5">
          Get in Touch
        </p>
        <h1 className="cursive text-4xl 2xl:text-5xl text-white leading-[1.07] tracking-tight max-w-xl mb-5">
          Let&apos;s Build{" "}
          <span className="text-[#dd9e5e]">Something Together</span>
        </h1>
        <p className="text-white/50 text-[14px] font-light leading-relaxed max-w-md">
          Whether it&apos;s a software project or a general
          enquiry — we&apos;re here. We&apos;ll get back to you within one
          business day.
        </p>
      </div>
    </section>
  );
};

export default ContactHeader;
