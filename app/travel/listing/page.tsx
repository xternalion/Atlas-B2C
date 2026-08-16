"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Star,
  DollarSign,
  Globe,
  Flame,
  Sparkles,
  Calendar,
  TrendingUp,
  Clock,
  CloudSun,
  Languages,
  Coins,
  Stamp,
  Hash,
} from "lucide-react";

// ─── Type ─────────────────────────────────────────────────────────────────────

interface Destination {
  id: string;
  title: string;
  subtitle: string;
  country: string;
  city: string;
  vibe: string;
  description: string;
  why_visit: string;
  highlights: string | string[];
  tags: string | string[];
  best_time: string;
  duration: string;
  price_range: string;
  popularity_score: string;
  climate: string;
  languages: string;
  currency: string;
  visa_info: string;
  image_urls: string[];
}

type DetailItem = { icon: React.ElementType; label: string; value: string };

// ─── Loading ──────────────────────────────────────────────────────────────────

function LoadingView() {
  return (
    <div className="min-h-screen bg-black">
      {/* dark hero skeleton */}
      <div className="relative h-[80vh] w-full bg-neutral-900 overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="max-w-6xl mx-auto absolute inset-0 flex flex-col justify-end pb-20 px-7 md:px-12 2xl:px-0 gap-3">
          <div className="h-5 w-20 bg-white/10 rounded-full" />
          <div className="h-8 w-56 bg-white/15 rounded-xl" />
          <div className="h-3 w-80 bg-white/8 rounded-full" />
          <div className="h-3 w-32 bg-white/8 rounded-full mt-1" />
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {[0,1,2].map((i) => <span key={i} className={`rounded-full bg-white/20 ${i === 0 ? "w-3 h-1.5" : "w-1.5 h-1.5"}`} />)}
        </div>
      </div>
      {/* white panel skeleton */}
      <div className="relative -mt-10 z-20 bg-white rounded-t-[2pc] px-7 md:px-12 2xl:px-0 py-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 animate-pulse">
          <div className="flex flex-col gap-5">
            <div className="h-3 w-16 bg-gray-200 rounded-full" />
            <div className="h-6 w-52 bg-gray-200 rounded-xl" />
            <div className="h-3 w-3/4 bg-gray-100 rounded-full" />
            <div className="h-3 w-full bg-gray-100 rounded-full" />
            <div className="h-3 w-4/5 bg-gray-100 rounded-full" />
            <div className="h-3 w-2/3 bg-gray-100 rounded-full" />
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
              {[0,1,2].map((i) => <div key={i} className="flex flex-col gap-1.5"><div className="h-4 w-12 bg-gray-200 rounded" /><div className="h-2.5 w-16 bg-gray-100 rounded" /></div>)}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="h-44 w-full bg-gray-100 rounded-3xl" />
            <div className="h-3 w-full bg-gray-100 rounded-full" />
            <div className="h-3 w-3/4 bg-gray-100 rounded-full" />
            <div className="h-3 w-1/2 bg-gray-100 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Not found ────────────────────────────────────────────────────────────────

function NotFoundView() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#dd9e5e18_0%,_transparent_60%)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#dd9e5e]/40 to-transparent" />
      <div className="relative flex flex-col items-center gap-5 text-center px-8">
        <div className="w-16 h-16 rounded-2xl bg-[#dd9e5e]/10 border border-[#dd9e5e]/20 flex items-center justify-center">
          <MapPin size={28} className="text-[#dd9e5e]" />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-extrabold text-white">Not Found</h2>
          <p className="text-sm text-white/40 max-w-xs leading-relaxed">
            This listing doesn&apos;t exist or may have been removed.
          </p>
        </div>
        <Link
          href="/"
          className="flex items-center gap-2 text-xs font-bold text-[#dd9e5e] hover:text-white border border-[#dd9e5e]/30 hover:border-[#dd9e5e]/60 bg-[#dd9e5e]/8 hover:bg-[#dd9e5e]/15 px-5 py-2.5 rounded-full transition-all duration-200 mt-1"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

// ─── Main content ─────────────────────────────────────────────────────────────

function ListingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");
  const type = searchParams.get("type");

  const [destination, setDestination] = useState<Destination | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [current, setCurrent] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [showMore, setShowMore] = useState(false);
  const [pricingTier, setPricingTier] = useState<"solo" | "couple" | "group">("solo");

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setNotFound(true);
      return;
    }
    const table = (type === "package" || type === "hotel" || type === "ride" || type === "tour" || type === "experience") ? "ac_listings_travel" : "ac_destinations";
    supabase
      .from(table)
      .select("*")
      .eq("id", id)
      .single()
      .then(({ data, error }) => {
        if (error || !data) {
          setNotFound(true);
        } else {
          const isTour    = type === "tour";
          const isRide    = type === "ride";
          const isHotel   = type === "hotel";
          const isPackage = type === "package";
          const isExperience = type === "experience";

          const mapped: Destination = {
            id:    data.id,
            title: data.title ?? "",

            subtitle: data.subtitle ?? (isTour ? (data.category ?? "") : ""),

            country: data.country ?? "",

            city: isRide
              ? [data.pickup, data.dropoff].filter(Boolean).join(" → ")
              : isExperience
              ? (data.location ?? "")
              : isTour
              ? (data.location ?? "")
              : (data.city ?? ""),

            // vibe badge on hero
            vibe: isRide    ? (data.ride_type  ?? "")
                : isHotel   ? (data.hotel_type ?? "")
                : isExperience ? (data.vibe || data.category || "")
                : isTour    ? (data.vibe || data.category || "")
                : isPackage ? (data.category   ?? "")
                : (data.vibe ?? ""),

            description: data.description ?? "",

            // only destinations and tours have why_visit
            why_visit: isExperience ? (data.about_host ?? "") : (!isHotel && !isPackage && !isRide) ? (data.why_visit ?? "") : "",

            highlights: isRide
              ? (Array.isArray(data.inclusions) ? data.inclusions.join(", ") : (data.inclusions ?? ""))
              : (data.highlights ?? ""),

            tags: data.tags ?? "",

            // "Best Time / Check-in / Meeting Point" slot
            best_time: isRide    ? (data.advance_booking ?? "")
                     : isHotel   ? (data.check_in && data.check_out ? `${data.check_in} – ${data.check_out}` : (data.check_in ?? ""))
                     : isExperience ? (data.meeting_point ?? "")
                     : isTour    ? (data.meeting_point ?? "")
                     : (data.best_time ?? ""),

            // "Duration / Min Stay" slot
            duration: isHotel ? (data.min_stay ?? "") : (data.duration ?? ""),

            // price displayed on pricing card + detail chip
            price_range: (isTour || isRide || isPackage)
              ? (data.price ? `$${Number(data.price).toLocaleString()}${data.price_label ? ` ${data.price_label}` : ""}` : "")
              : isExperience
              ? (data.price ? `$${Number(data.price).toLocaleString()}/person` : "")
              : isHotel
              ? (data.price_per_night ? `$${Number(data.price_per_night).toLocaleString()}/night` : "")
              : (data.price_range ?? ""),

            // rating → convert to /10 scale for star display
            popularity_score: (isTour || isRide || isHotel || isExperience)
              ? (data.rating ? String(parseFloat(data.rating) * 2) : "")
              : isPackage
              ? ""
              : (data.popularity_score ?? ""),

            // "Climate / Neighbourhood / Group size / Difficulty" slot
            climate: isRide    ? (data.vehicle_type  ?? "")
                   : isHotel   ? (data.neighborhood  ?? "")
                   : isExperience ? (data.group_size ?? "")
                   : isTour    ? (data.max_group_size ? `Max ${data.max_group_size} people` : "")
                   : isPackage ? (data.difficulty     ?? "")
                   : (data.climate ?? ""),

            // "Languages / Amenities / Group size" slot
            languages: isRide
              ? (data.driver_languages ?? "")
              : isHotel
              ? (Array.isArray(data.amenities) ? data.amenities.filter(Boolean).slice(0, 5).join(", ") : "")
              : isExperience
              ? (data.languages ?? "")
              : isTour
              ? (data.languages ?? "")
              : isPackage
              ? (data.group_size ? `Up to ${data.group_size} people` : "")
              : (data.languages ?? ""),

            // "Currency / Cancellation / Included" slot
            currency: isRide    ? (data.capacity ?? "")
                    : isHotel   ? (data.cancellation_policy ?? "")
                    : isExperience ? (data.cancellation_policy ?? "")
                    : isTour    ? (data.cancellation_policy ?? "")
                    : isPackage ? (Array.isArray(data.included) ? data.included.filter(Boolean).slice(0, 4).join(", ") : "")
                    : (data.currency ?? ""),

            // "Visa / What to bring / Excluded" slot
            visa_info: isRide    ? ""
                     : isHotel   ? ""
                     : isExperience ? (Array.isArray(data.what_to_expect) ? data.what_to_expect.filter(Boolean).slice(0, 4).join(", ") : "")
                     : isTour    ? (data.what_to_bring ?? "")
                     : isPackage ? (Array.isArray(data.excluded) ? data.excluded.filter(Boolean).slice(0, 4).join(", ") : "")
                     : (data.visa_info ?? ""),

            image_urls: data.image_urls ?? [],
          };
          setDestination(mapped);
        }
        setLoading(false);
      });
  }, [id, type]);

  const images = destination?.image_urls ?? [];

  useEffect(() => {
    if (images.length < 2) return;
    const t = setInterval(
      () => setCurrent((p) => (p + 1) % images.length),
      5000,
    );
    return () => clearInterval(t);
  }, [images.length]);

  const prev = () => setCurrent((p) => (p === 0 ? images.length - 1 : p - 1));
  const next = () => setCurrent((p) => (p + 1) % images.length);

  const handleTouchStart = (e: React.TouchEvent) =>
    setTouchStartX(e.touches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (diff > 50) next();
    else if (diff < -50) prev();
    setTouchStartX(null);
  };

  if (loading) return <LoadingView />;
  if (notFound || !destination) return <NotFoundView />;

  // ── Derived ─────────────────────────────────────────────────────────────────

  const toItems = (val: string | string[] | null | undefined): string[] => {
    if (!val) return [];
    if (Array.isArray(val)) return val.filter(Boolean);
    return val.split(",").map((s) => s.trim()).filter(Boolean);
  };

  const highlightItems = toItems(destination.highlights);
  const tagItems = toItems(destination.tags);

  const score = parseFloat(destination.popularity_score);
  const scoreValid = !isNaN(score) && score > 0;
  const scoreLabel = scoreValid ? score.toFixed(1) : null;
  const starsOut5 = scoreValid ? Math.round((score / 10) * 5) : 0;

  const descWords = destination.description.split(" ");
  const descShort = descWords.slice(0, 60).join(" ");
  const descRest = descWords.slice(60).join(" ");
  const hasMore = descWords.length > 60;

  // Right-column detail cards — only show filled fields
  const isHotelListing   = type === "hotel";
  const isTourListing    = type === "tour";
  const isPackageListing = type === "package";
  const isRideListing    = type === "ride";
  const isExperienceListing = type === "experience";

  const allDetails: DetailItem[] = [
    {
      icon: DollarSign as React.ElementType,
      label: isHotelListing ? "Price Per Night" : (isPackageListing ? "Starting From" : isExperienceListing ? "Price Per Person" : "Estimated Budget"),
      value: destination.price_range,
    },
    {
      icon: Clock as React.ElementType,
      label: isHotelListing ? "Minimum Stay" : "Duration",
      value: destination.duration,
    },
    {
      icon: Calendar as React.ElementType,
      label: isHotelListing ? "Check-in / Check-out"
           : isTourListing  ? "Meeting Point"
           : isExperienceListing ? "Meeting Point"
           : "Best Time to Visit",
      value: destination.best_time,
    },
    {
      icon: CloudSun as React.ElementType,
      label: isHotelListing   ? "Neighbourhood"
           : isTourListing    ? "Group Size"
           : isExperienceListing ? "Group Size"
           : isPackageListing ? "Difficulty"
           : isRideListing    ? "Vehicle Type"
           : "Climate",
      value: destination.climate,
    },
    {
      icon: Languages as React.ElementType,
      label: isHotelListing   ? "Top Amenities"
           : isPackageListing ? "Group Size"
           : isExperienceListing ? "Languages"
           : isRideListing    ? "Driver Languages"
           : "Languages",
      value: destination.languages,
    },
    {
      icon: Coins as React.ElementType,
      label: (isHotelListing || isTourListing || isExperienceListing) ? "Cancellation Policy"
           : isPackageListing                  ? "What's Included"
           : isRideListing                     ? "Capacity"
           : "Currency",
      value: destination.currency,
    },
    {
      icon: Stamp as React.ElementType,
      label: isTourListing    ? "What to Bring"
           : isExperienceListing ? "What to Expect"
           : isPackageListing ? "Not Included"
           : "Visa Requirements",
      value: destination.visa_info,
    },
    {
      icon: Globe as React.ElementType,
      label: "Country",
      value: destination.country,
    },
    {
      icon: MapPin as React.ElementType,
      label: (isTourListing || isExperienceListing) ? "Location" : "City / Region",
      value: destination.city,
    },
    {
      icon: TrendingUp as React.ElementType,
      label: (isHotelListing || isTourListing || isRideListing || isExperienceListing) ? "Guest Rating" : "Popularity",
      value: scoreLabel ? `${scoreLabel} / 10` : "",
    },
  ];
  const details = allDetails.filter((d) => Boolean(d.value));

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <div className="bg-white text-gray-900">
      {/* ── Hero Carousel ──────────────────────────────────────────────────────── */}
      {images.length > 0 ? (
        <div
          className="relative h-[80vh] w-full overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex h-full w-full transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {images.map((src, i) => (
              <div key={i} className="relative min-w-full h-full shrink-0">
                <Image
                  src={src}
                  alt={`${destination.title} ${i + 1}`}
                  fill
                  className="object-cover"
                  priority={i === 0}
                />
                <div className="absolute inset-0 bg-black/35 2xl:bg-black/45" />
              </div>
            ))}
          </div>

          {/* Arrows — 2xl only */}
          {images.length > 1 && (
            <div className="hidden 2xl:block">
              <button
                onClick={prev}
                className="absolute top-1/2 left-6 -translate-y-1/2 hover:bg-white/10 rounded-lg px-2 py-4 text-white z-20 transition cursor-pointer"
              >
                <ChevronLeft size={44} />
              </button>
              <button
                onClick={next}
                className="absolute top-1/2 right-6 -translate-y-1/2 hover:bg-white/10 rounded-lg px-2 py-4 text-white z-20 transition cursor-pointer"
              >
                <ChevronRight size={44} />
              </button>
            </div>
          )}

          {/* Overlay */}
          <div className="max-w-6xl mx-auto absolute inset-0 flex flex-col justify-end pb-20 px-7 md:px-12 2xl:px-0 gap-1.5 text-white z-10">
            <div className="flex flex-wrap items-center gap-2 mb-0.5">
              {destination.vibe && (
                <span className="text-[11px] font-bold tracking-widest uppercase text-[#dd9e5e] bg-[#dd9e5e]/15 border border-[#dd9e5e]/30 px-3 py-1 rounded-full">
                  {destination.vibe}
                </span>
              )}
              {tagItems.slice(0, 3).map((t) => (
                <span
                  key={t}
                  className="text-[10px] font-semibold text-white/60 bg-white/10 border border-white/20 px-2.5 py-1 rounded-full"
                >
                  {t}
                </span>
              ))}
            </div>
            <h1 className="cursive text-3xl md:text-4xl 2xl:text-5xl leading-tight">
              {destination.title}
            </h1>
            {destination.subtitle && (
              <p className="text-xs 2xl:text-sm text-white/70 max-w-xl leading-relaxed">
                {destination.subtitle}
              </p>
            )}
            {(destination.city || destination.country) && (
              <p className="text-[11px] text-white/50 flex items-center gap-1.5 mt-0.5">
                <MapPin size={12} />
                {[destination.city, destination.country]
                  .filter(Boolean)
                  .join(", ")}
              </p>
            )}
          </div>

          {/* Dots */}
          {images.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${i === current ? "bg-white scale-125" : "bg-white/40"}`}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        /* Fallback when no images */
        <div className="h-72 bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] flex flex-col justify-end pb-12 px-8 gap-1.5 text-white">
          {destination.vibe && (
            <span className="text-[11px] font-bold tracking-widest uppercase text-[#dd9e5e] bg-[#dd9e5e]/15 border border-[#dd9e5e]/30 px-3 py-1 rounded-full w-fit">
              {destination.vibe}
            </span>
          )}
          <h1 className="cursive text-3xl md:text-4xl font-extrabold">
            {destination.title}
          </h1>
          {destination.subtitle && (
            <p className="text-xs text-white/60">{destination.subtitle}</p>
          )}
          <p className="text-[11px] text-white/40 flex items-center gap-1.5">
            <MapPin size={11} />{" "}
            {[destination.city, destination.country].filter(Boolean).join(", ")}
          </p>
        </div>
      )}

      {/* ── Info Panel ─────────────────────────────────────────────────────────── */}
      <div className="relative -mt-10 z-20 bg-white rounded-t-[2pc] 2xl:rounded-t-none">
        <div className="max-w-6xl mx-auto px-7.5 md:px-12 2xl:px-0 py-8 md:py-12 2xl:py-14 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* ── LEFT ─────────────────────────────────────────────────────────── */}
          <div className="flex flex-col gap-8">
            {/* Title + stats */}
            <div className="flex flex-col gap-4">
              <button
                onClick={() => router.back()}
                className="flex items-center gap-0.5 text-[11px] text-gray-400 hover:text-gray-800 font-semibold tracking-wide transition-colors duration-200 w-fit group/bc"
              >
                <ChevronLeft
                  size={13}
                  className="group-hover/bc:-translate-x-0.5 transition-transform duration-200"
                />
                {type === "package" ? "Packages" : type === "hotel" ? "Hotels" : type === "tour" ? "Tours" : type === "ride" ? "Rentals" : type === "experience" ? "Experiences" : "Destinations"}
              </button>
              <div className="flex flex-col gap-2">
                <h2 className="text-lg 2xl:text-xl font-extrabold">
                  {destination.title}
                </h2>
                {destination.subtitle && (
                  <p className="text-xs 2xl:text-sm text-gray-500 leading-relaxed max-w-lg">
                    {destination.subtitle}
                  </p>
                )}
              </div>

              {/* Stats row */}
              {(scoreLabel ||
                destination.best_time ||
                destination.price_range ||
                destination.duration) && (
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                  {scoreLabel && (
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-extrabold flex items-center gap-1">
                        <Star
                          size={13}
                          className="text-[#dd9e5e] fill-[#dd9e5e]"
                        />
                        {scoreLabel}
                      </p>
                      <p className="text-[10px] 2xl:text-xs text-gray-400">
                        {(type === "hotel" || type === "tour" || type === "ride") ? "Rating" : "Popularity"}
                      </p>
                    </div>
                  )}
                  {destination.duration && (
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-extrabold">
                        {destination.duration}
                      </p>
                      <p className="text-[10px] 2xl:text-xs text-gray-400">
                        {type === "experience" ? "Duration" : "Ideal Stay"}
                      </p>
                    </div>
                  )}
                  {destination.price_range && (
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-extrabold">
                        {destination.price_range}
                      </p>
                      <p className="text-[10px] 2xl:text-xs text-gray-400">
                        Est. Budget
                      </p>
                    </div>
                  )}
                  {!destination.duration && destination.best_time && (
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-extrabold">
                        {destination.best_time}
                      </p>
                      <p className="text-[10px] 2xl:text-xs text-gray-400">
                        {type === "experience" ? "Meeting Point" : "Best Time"}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Why Visit */}
            {destination.why_visit && (
              <div className="flex gap-4 p-4 bg-[#fdf6ee] border border-[#dd9e5e]/20 rounded-2xl">
                <div className="w-8 h-8 rounded-xl bg-[#dd9e5e]/15 flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles size={15} className="text-[#dd9e5e]" />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-xs font-extrabold text-gray-800">
                    Why Visit?
                  </p>
                  <p className="text-xs 2xl:text-sm text-gray-500 leading-relaxed">
                    {destination.why_visit}
                  </p>
                </div>
              </div>
            )}

            {/* About */}
            {destination.description && (
              <div className="flex flex-col gap-3 pb-6 border-b border-gray-100">
                <h4 className="text-sm font-extrabold">
                  {type === "hotel" ? "About This Hotel"
                  : type === "tour" ? "About This Tour"
                  : type === "package" ? "About This Package"
                  : type === "ride" ? "About This Transfer"
                  : type === "experience" ? "About This Experience"
                  : "About This Destination"}
                </h4>
                <p className="text-xs 2xl:text-sm text-gray-400 leading-relaxed">
                  {descShort}
                  {!showMore && hasMore ? "…" : ""}
                </p>
                {showMore && hasMore && (
                  <p className="text-xs 2xl:text-sm text-gray-400 leading-relaxed">
                    {descRest}
                  </p>
                )}
                {hasMore && (
                  <button
                    onClick={() => setShowMore((v) => !v)}
                    className="select-none btn-dark-outline btn-dynamic w-fit text-xs"
                  >
                    {showMore ? "Show less" : "Show more"}
                  </button>
                )}
              </div>
            )}

            {/* Location, vibe & tags */}
            {(destination.city ||
              destination.country ||
              destination.vibe ||
              destination.best_time ||
              tagItems.length > 0) && (
              <div className="flex flex-col gap-3 pb-6 border-b border-gray-100">
                <h4 className="text-sm font-extrabold">
                  Location, Vibe &amp; Tags
                </h4>
                <div className="flex flex-wrap gap-2">
                  {destination.city && (
                    <span className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-600 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-full">
                      <MapPin size={11} className="text-[#dd9e5e]" />{" "}
                      {destination.city}
                    </span>
                  )}
                  {destination.country && (
                    <span className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-600 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-full">
                      <Globe size={11} className="text-[#dd9e5e]" />{" "}
                      {destination.country}
                    </span>
                  )}
                  {destination.vibe && (
                    <span className="flex items-center gap-1.5 text-[11px] font-semibold text-[#dd9e5e] bg-[#dd9e5e]/10 border border-[#dd9e5e]/25 px-3 py-1.5 rounded-full">
                      <Sparkles size={11} /> {destination.vibe}
                    </span>
                  )}
                  {destination.best_time && (
                    <span className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-600 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-full">
                      <Calendar size={11} className="text-[#dd9e5e]" /> Best:{" "}
                      {destination.best_time}
                    </span>
                  )}
                  {tagItems.map((t) => (
                    <span
                      key={t}
                      className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-500 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-full"
                    >
                      <Hash size={11} className="text-gray-400" /> {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Must-see highlights */}
            {highlightItems.length > 0 && (
              <div className="flex flex-col gap-4">
                <h4 className="text-sm font-extrabold">Must-See Highlights</h4>
                <ul className="flex flex-col gap-3">
                  {highlightItems.map((h) => (
                    <li
                      key={h}
                      className="flex items-center gap-3 text-xs 2xl:text-sm font-semibold text-gray-700"
                    >
                      <span className="w-8 h-8 rounded-xl bg-[#dd9e5e]/10 flex items-center justify-center shrink-0">
                        <Flame size={15} className="text-[#dd9e5e]" />
                      </span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* ── RIGHT ────────────────────────────────────────────────────────── */}
          <div className="flex flex-col gap-8">

            {/* Pricing card */}
            {(() => {
              const tiers = {
                solo:   { label: "Solo",   people: "1 person",  multiplier: 1 },
                couple: { label: "Couple", people: "2 people",  multiplier: 1.8 },
                group:  { label: "Group",  people: "4+ people", multiplier: 3.2 },
              } as const;
              const base = destination.price_range || "Contact us";
              const inclusions = type === "experience"
                ? ["Hosted by a local expert", "Small-group format", "Clear meeting point", "Flexible booking support"]
                : ["Return flights included", "Hotel accommodation", "Guided city tours", "Airport transfers"];
              return (
                <div className="bg-white border-2 border-gray-100 rounded-3xl p-6 flex flex-col gap-5 shadow-sm">
                  <div className="flex flex-col gap-1">
                    <p className="text-[10px] font-bold tracking-widest uppercase text-[#dd9e5e]">Plan Your Visit</p>
                    <h3 className="text-lg font-extrabold text-gray-900">{destination.title}</h3>
                    {destination.city && (
                      <p className="text-[11px] text-gray-400 flex items-center gap-1">
                        <MapPin size={11} className="text-[#dd9e5e]" /> {destination.city}{destination.country ? `, ${destination.country}` : ""}
                      </p>
                    )}
                  </div>

                  {/* Tier selector */}
                  <div className="grid grid-cols-3 gap-2">
                    {(["solo", "couple", "group"] as const).map((t) => (
                      <button
                        key={t}
                        onClick={() => setPricingTier(t)}
                        className={`flex flex-col items-center gap-0.5 py-3 rounded-2xl border-2 text-[11px] font-bold transition-all duration-200 cursor-pointer ${
                          pricingTier === t
                            ? "border-[#dd9e5e] bg-[#dd9e5e]/8 text-[#dd9e5e]"
                            : "border-gray-100 text-gray-500 hover:border-gray-200"
                        }`}
                      >
                        {tiers[t].label}
                        <span className="text-[9px] font-medium opacity-70">{tiers[t].people}</span>
                      </button>
                    ))}
                  </div>

                  {/* Price display */}
                  <div className="flex flex-col gap-1 py-4 border-y border-gray-100">
                    <p className="text-[10px] text-gray-400 font-medium">Estimated cost</p>
                    <p className="text-3xl font-extrabold text-gray-900 tracking-tight">{base}</p>
                    <p className="text-[10px] text-gray-400">per {tiers[pricingTier].people} · flights, stays &amp; tours</p>
                  </div>

                  {/* Inclusions */}
                  <ul className="flex flex-col gap-2">
                    {inclusions.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-[11px] font-semibold text-gray-600">
                        <span className="w-4 h-4 rounded-full bg-[#dd9e5e]/15 flex items-center justify-center shrink-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#dd9e5e]" />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* CTAs */}
                  <div className="flex flex-col sm:flex-row lg:flex-col gap-2 pt-1">
                    <Link
                      href="/travel/contact"
                      className="select-none btn-primary-base"
                    >
                      Book Now
                    </Link>
                    <Link
                      href="/travel/contact"
                      className="select-none btn-primary-outline"
                    >
                      Request Custom Quote
                    </Link>
                    <Link
                      href="/travel/itinerary"
                      className="select-none btn-primary-outline"
                    >
                      Plan with AI
                    </Link>
                  </div>
                </div>
              );
            })()}

            {/* Feature card */}
            <div className="bg-gradient-to-br from-[#fdf6ee] to-[#fdefd8] border border-[#dd9e5e]/20 rounded-3xl p-6 flex flex-col gap-3 text-center items-center">
              {destination.vibe && (
                <span className="text-[11px] font-bold tracking-widest uppercase text-[#dd9e5e] bg-[#dd9e5e]/10 border border-[#dd9e5e]/30 px-3 py-1 rounded-full">
                  {destination.vibe}
                </span>
              )}
              <h4 className="text-base font-extrabold">{destination.title}</h4>
              {destination.subtitle && (
                <p className="text-xs 2xl:text-sm text-gray-500 leading-relaxed max-w-sm">
                  {destination.subtitle}
                </p>
              )}
              {scoreLabel && (
                <div className="flex items-center gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i < starsOut5
                          ? "text-[#dd9e5e] fill-[#dd9e5e]"
                          : "text-gray-300 fill-gray-200"
                      }
                    />
                  ))}
                  <span className="text-xs font-bold text-gray-600 ml-1.5">
                    {scoreLabel} / 10
                  </span>
                </div>
              )}
            </div>

            {/* Destination details */}
            {details.length > 0 && (
              <div className="flex flex-col gap-4">
                <h4 className="text-sm font-extrabold">Destination Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {details.map(({ icon: Icon, label, value }) => (
                    <div
                      key={label}
                      className="bg-white border-2 border-gray-100 hover:border-[#dd9e5e] rounded-2xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <span className="w-9 h-9 rounded-xl bg-[#dd9e5e]/10 flex items-center justify-center shrink-0">
                        <Icon size={16} className="text-[#dd9e5e]" />
                      </span>
                      <div className="flex flex-col gap-0.5 min-w-0">
                        <p className="text-[10px] text-gray-400 font-medium">
                          {label}
                        </p>
                        <p className="text-xs font-extrabold text-gray-800 truncate">
                          {value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Page export ──────────────────────────────────────────────────────────────

export default function ListingPage() {
  return (
    <Suspense fallback={<LoadingView />}>
      <ListingContent />
    </Suspense>
  );
}
