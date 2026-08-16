"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

type SlideMedia =
  | { type: "image"; src: string; heading: string; subtext: string }
  | { type: "video"; src: string; heading: string; subtext: string };

const Hero = () => {
  const [slides, setSlides] = useState<SlideMedia[]>([]);
  const [current, setCurrent] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    supabase
      .from("ac_heroes")
      .select("title, subtitle, images")
      .eq("page_id", "explore")
      .single()
      .then(({ data }) => {
        if (!data) return;
        const urls: string[] = Array.isArray(data.images)
          ? data.images.filter(Boolean)
          : [];
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

  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);

  return (
    <div className="bg-white text-gray-900 relative">
      <div className="relative h-[74vh] w-full overflow-hidden">
        {slides.length === 0 ? (
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gray-950" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_-5%,rgba(221,158,94,0.18),transparent)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_80%_70%,rgba(221,158,94,0.06),transparent)]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8 py-10 gap-3">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-10 bg-[#dd9e5e]/70" />
                <span className="text-[#dd9e5e] text-[10px] font-bold tracking-[0.35em] uppercase">
                  Tours · Destinations · Packages
                </span>
                <div className="h-px w-10 bg-[#dd9e5e]/70" />
              </div>
              <h1 className="cursive text-4xl 2xl:text-5xl font-medium text-white leading-tight uppercase mb-4">
                Discover Every <span>Corner</span>
              </h1>
              <p className="text-white/50 text-sm max-w-md leading-relaxed tracking-wide min-h-11 flex items-start justify-center">
                Ancient cities, vibrant cultures, and spectacular views await
              </p>
            </div>
          </div>
        ) : (
          slides.map((slide, index) => (
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

              <div className="max-w-6xl mx-auto absolute inset-0 flex flex-col text-center items-center justify-center tracking-wide gap-3 text-white py-10 px-8 md:px-14 2xl:px-0">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px w-10 bg-[#dd9e5e]/70" />
                  <span className="text-[#dd9e5e] text-[10px] font-bold tracking-[0.35em] uppercase">
                    Tours · Destinations · Packages
                  </span>
                  <div className="h-px w-10 bg-[#dd9e5e]/70" />
                </div>
                <h1 className="cursive text-4xl 2xl:text-5xl font-medium text-white leading-tight uppercase mb-4">
                  {(() => {
                    const words = slide.heading.split(" ");
                    const main = words.slice(0, -2).join(" ");
                    const accent = words.slice(-2).join(" ");
                    return (
                      <>
                        {main}
                        {main ? " " : ""}
                        <span>{accent}</span>
                      </>
                    );
                  })()}
                </h1>
                <p className="text-white/50 text-sm max-w-md leading-relaxed tracking-wide min-h-11 flex items-start justify-center">
                  {slide.subtext}
                </p>
              </div>
            </div>
          ))
        )}

        {slides.length > 1 && (
          <div className="hidden 2xl:block">
            <button
              onClick={prevSlide}
              className="absolute top-1/2 left-6 -translate-y-1/2 hover:bg-white/5 rounded-lg px-2 py-4 text-white z-20 transition"
            >
              <ChevronLeft size={44} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute top-1/2 right-6 -translate-y-1/2 hover:bg-white/5 rounded-lg px-2 py-4 text-white z-20 transition"
            >
              <ChevronRight size={44} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
