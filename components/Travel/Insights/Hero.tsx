"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";

type SlideMedia = {
  type: "image" | "video";
  src: string;
  heading: string;
  subtext: string;
};

export default function InsightsHero() {
  const [slides, setSlides] = useState<SlideMedia[]>([]);
  const [current, setCurrent] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    supabase
      .from("ac_heroes")
      .select("title, subtitle, images")
      .eq("page_id", "insights")
      .single()
      .then(({ data }) => {
        if (!data) return;
        const urls: string[] = Array.isArray(data.images) ? data.images.filter(Boolean) : [];
        const dbSlides: SlideMedia[] = urls.map((url) => ({
          type: url.endsWith(".mp4") ? ("video" as const) : ("image" as const),
          src: url,
          heading: data.title ?? "",
          subtext: data.subtitle ?? "",
        }));
        if (dbSlides.length) setSlides(dbSlides);
      });
  }, []);

  useEffect(() => {
    if (slides.length < 2) return;
    const interval = setInterval(
      () => setCurrent((prev) => (prev + 1) % slides.length),
      10000,
    );
    return () => clearInterval(interval);
  }, [slides.length]);

  useEffect(() => {
    if (!slides.length) return;
    const nextIndex = (current + 1) % slides.length;
    slides.forEach((slide, i) => {
      if (slide.type !== "video") return;
      const el = videoRefs.current[i];
      if (!el) return;
      if (i === current) {
        el.currentTime = 0;
        el.play().catch(() => {});
      } else {
        el.pause();
        if (i === nextIndex) el.load();
      }
    });
  }, [current, slides]);

  /* ── Static fallback (no DB media configured) ── */
  if (slides.length === 0) {
    return (
      <section className="relative overflow-hidden bg-[#0d0d0d] text-white">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-[#dd9e5e]/6 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-[#dd9e5e]/4 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:72px_72px]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/5 to-transparent" />

        <div className="max-w-6xl mx-auto pt-36 pb-24 2xl:pt-44 2xl:pb-32 px-6 md:px-12 2xl:px-0 relative z-10 flex flex-col gap-6">
          <span className="text-[11px] w-fit font-bold tracking-widest uppercase text-[#dd9e5e] bg-[#dd9e5e]/10 border border-[#dd9e5e]/30 px-4 py-1.5 rounded-full">
            Atlas Insights
          </span>
          <h1 className="cursive text-4xl 2xl:text-5xl leading-[1.05] max-w-2xl">
            Perspectives,{" "}
            <span className="text-[#dd9e5e]">Stories & Guides</span>
          </h1>
          <p className="text-white/50 text-[15px] font-light leading-relaxed max-w-xl">
            Software thinking, travel perspectives, venture updates, and ideas
            from inside the Atlas ecosystem — written to inform, not to fill
            space.
          </p>
        </div>
      </section>
    );
  }

  /* ── DB-driven media carousel ── */
  return (
    <div className="relative h-[64vh] w-full overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-gray-950 transition-opacity duration-[1200ms] ease-in-out will-change-[opacity] ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {slide.type === "video" ? (
            <video
              ref={(el) => {
                videoRefs.current[index] = el;
              }}
              src={slide.src}
              muted
              loop
              playsInline
              preload={index === 0 || index === 1 ? "auto" : "none"}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <Image
              src={slide.src}
              alt={`Slide ${index + 1}`}
              fill
              className="object-cover"
              priority={index <= 1}
            />
          )}
          <div className="absolute inset-0 bg-black/50" />
          <div className="max-w-6xl mx-auto h-full pt-30 pb-24 px-6 md:px-12 2xl:px-0 relative z-10 flex flex-col items-center text-center md:items-start md:text-start justify-center gap-6">
            <span className="text-[11px] w-fit font-bold tracking-widest uppercase text-[#dd9e5e] bg-[#dd9e5e]/10 border border-[#dd9e5e]/30 px-4 py-1.5 rounded-full">
              Atlas Insights
            </span>
            <h1 className="cursive text-4xl 2xl:text-5xl text-white leading-[1.05] max-w-2xl">
              {(() => {
                const words = slide.heading.split(" ");
                const main = words.slice(0, -2).join(" ");
                const accent = words.slice(-2).join(" ");
                return (
                  <>
                    {main}
                    {main ? " " : ""}
                    <span className="text-[#dd9e5e]">{accent}</span>
                  </>
                );
              })()}
            </h1>
            <p className="text-white/50 text-[15px] font-light leading-relaxed max-w-xl">
              {slide.subtext}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
