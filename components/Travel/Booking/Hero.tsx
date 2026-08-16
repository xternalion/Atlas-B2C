"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  CalendarDays,
  Users,
  PlaneTakeoff,
  PlaneLanding,
  X,
  Minus,
  Plus,
  Search,
} from "lucide-react";
import Stays from "@/components/Travel/Booking/Stays";
import Rides from "@/components/Travel/Booking/Rides";
import Airline from "@/components/Travel/Booking/Airline";
import Deals from "@/components/Travel/Booking/Deals";

type SlideMedia = {
  type: "image" | "video";
  src: string;
  heading: string;
  subtext: string;
};

type Tab = "flights" | "hotels" | "rides";

const tabs: { key: Tab; label: string }[] = [
  { key: "flights", label: "Flights" },
  { key: "hotels", label: "Hotels" },
  { key: "rides", label: "Rides" },
];

const fallbackCopy: Record<Tab, { eyebrow: string; heading: string; subtext: string }> = {
  flights: {
    eyebrow: "Flights · Real-Time Search",
    heading: "Find Your Next Flight",
    subtext: "Search live fares across airlines and book the route that fits your trip",
  },
  hotels: {
    eyebrow: "Hotels · Resorts · Apartments",
    heading: "Find Your Perfect Stay",
    subtext: "Book the perfect hotel — anywhere, anytime",
  },
  rides: {
    eyebrow: "Rides · Airport Transfers",
    heading: "Book Your Next Ride",
    subtext: "Reliable pickups and drop-offs, wherever you land",
  },
};

const popularDestinations = [
  { city: "Dubai", country: "United Arab Emirates" },
  { city: "Paris", country: "France" },
  { city: "Singapore", country: "Singapore" },
  { city: "London", country: "United Kingdom" },
  { city: "Colombo", country: "Sri Lanka" },
  { city: "Toronto", country: "Canada" },
];

// Fully isolated per tab (keyed by tab in the parent) so switching tabs
// always starts from a clean slate — no stale slides/index carried over.
function TabCarousel({ tab }: { tab: Tab }) {
  const [current, setCurrent] = useState(0);
  const [slides, setSlides] = useState<SlideMedia[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const copy = fallbackCopy[tab];

  useEffect(() => {
    let cancelled = false;
    supabase
      .from("ac_heroes")
      .select("title, subtitle, images")
      .eq("page_id", tab)
      .single()
      .then(({ data }) => {
        if (cancelled) return;
        const urls: string[] = data && Array.isArray(data.images) ? data.images.filter(Boolean) : [];
        const dbSlides: SlideMedia[] = urls.map((url) => ({
          type: url.endsWith(".mp4") ? ("video" as const) : ("image" as const),
          src: url,
          heading: data?.title ?? "",
          subtext: data?.subtitle ?? "",
        }));
        setSlides(dbSlides);
      });
    return () => {
      cancelled = true;
    };
  }, [tab]);

  useEffect(() => {
    if (slides.length < 2) return;
    const interval = setInterval(() => setCurrent((prev) => (prev + 1) % slides.length), 9000);
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

  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {slides.length === 0 ? (
        // No CMS hero row exists yet for this page_id (e.g. "flights") — use a
        // real local photo instead of a flat gradient so it stays visually and
        // heightwise consistent with tabs that do have real CMS media. ac-ep.webp
        // is a 16:9 daylight shot, so it crops cleanly on wide screens (unlike
        // ac-wm.webp, a near-square night shot that left a big dark void).
        <div className="absolute inset-0">
          <Image src="/ac-ep.webp" alt="" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8 pb-10 gap-3">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10 bg-[#dd9e5e]/70" />
              <span className="text-[#dd9e5e] text-[10px] font-bold tracking-[0.35em] uppercase">
                {copy.eyebrow}
              </span>
              <div className="h-px w-10 bg-[#dd9e5e]/70" />
            </div>
            <h1 className="cursive text-4xl 2xl:text-5xl font-medium text-white leading-tight uppercase mb-4">
              {copy.heading}
            </h1>
            <p className="text-white/50 text-sm max-w-md leading-relaxed tracking-wide min-h-11 flex items-start justify-center">
              {copy.subtext}
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
                unoptimized
                className="object-cover"
                priority={index <= 1}
              />
            )}
            <div className="absolute inset-0 bg-black/50" />
            <div className="max-w-6xl mx-auto absolute inset-0 flex flex-col text-center items-center justify-center tracking-wide gap-3 text-white pb-10 px-8 md:px-14 2xl:px-0">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-10 bg-[#dd9e5e]/70" />
                <span className="text-[#dd9e5e] text-[10px] font-bold tracking-[0.35em] uppercase">
                  {copy.eyebrow}
                </span>
                <div className="h-px w-10 bg-[#dd9e5e]/70" />
              </div>
              <h1 className="cursive text-4xl 2xl:text-5xl font-medium text-white leading-tight uppercase mb-4">
                {slide.heading || copy.heading}
              </h1>
              <p className="text-white/50 text-sm max-w-md leading-relaxed tracking-wide min-h-11 flex items-start justify-center">
                {slide.subtext || copy.subtext}
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
  );
}

export default function BookingHero({ initialTab = "flights" }: { initialTab?: Tab }) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>(initialTab);

  // Hotels fields
  const [showLocation, setShowLocation] = useState(false);
  const [showGuests, setShowGuests] = useState(false);
  const [location, setLocation] = useState("");
  const [locationSearch, setLocationSearch] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const checkInRef = useRef<HTMLInputElement>(null);
  const checkOutRef = useRef<HTMLInputElement>(null);
  const guestsRef = useRef<HTMLDivElement>(null);

  // Flights fields
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [depart, setDepart] = useState("");
  const [ret, setRet] = useState("");
  const [travelers, setTravelers] = useState(1);
  const departRef = useRef<HTMLInputElement>(null);
  const returnRef = useRef<HTMLInputElement>(null);

  // Rides fields
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [rideDate, setRideDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const rideDateRef = useRef<HTMLInputElement>(null);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (guestsRef.current && !guestsRef.current.contains(e.target as Node)) setShowGuests(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const formatDate = (d: string) =>
    d
      ? new Date(d + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })
      : null;

  const guestSummary = `${adults} Adult${adults !== 1 ? "s" : ""}${children > 0 ? `, ${children} Child${children !== 1 ? "ren" : ""}` : ""}, ${rooms} Room${rooms !== 1 ? "s" : ""}`;

  const filteredDestinations = popularDestinations.filter(
    (d) =>
      d.city.toLowerCase().includes(locationSearch.toLowerCase()) ||
      d.country.toLowerCase().includes(locationSearch.toLowerCase()),
  );

  const handleSearch = () => {
    if (tab === "flights") {
      const qs = new URLSearchParams({ from, to, depart, adults: String(travelers) });
      if (ret) qs.set("return", ret);
      router.push(`/travel/flights?${qs}`);
    } else if (tab === "hotels") {
      if (!location) {
        setLocationSearch("");
        setShowLocation(true);
        return;
      }
      router.push(
        `/travel/hotels?location=${encodeURIComponent(location)}&checkIn=${checkIn}&checkOut=${checkOut}&adults=${adults}&children=${children}&rooms=${rooms}`,
      );
    } else {
      const qs = new URLSearchParams({ pickup, dropoff, date: rideDate, passengers: String(passengers) });
      router.push(`/travel/rides?${qs}`);
    }
  };

  const barClass =
    "flex items-center gap-2.5 px-5 py-3 hover:bg-gray-50 transition text-left cursor-pointer flex-1 min-w-0 border-r border-gray-200 relative";
  const mobileBarClass =
    "flex items-center gap-2.5 px-4 py-3 hover:bg-gray-50 transition text-left cursor-pointer border border-gray-200 rounded-xl relative";

  return (
    <div className="bg-white text-gray-900 relative">
      <TabCarousel key={tab} tab={tab} />

      {/* Search Form */}
      <div className="max-w-2xl lg:max-w-4xl mx-auto -mt-40 md:-mt-60 lg:-mt-40 relative z-30 bg-white md:shadow-2xl border border-gray-100 rounded-4xl pt-8 md:pt-6 p-6 flex flex-col gap-4">
        {/* Tabs */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 md:left-7 md:translate-x-0 flex p-2 gap-2 bg-black/80 backdrop-blur-lg rounded-full shadow-lg">
          {tabs.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`text-xs md:text-[11px] px-3 py-1.5 md:py-1 font-semibold rounded-full transition ${
                tab === key ? "bg-[#dd9e5e] text-white" : "hover:bg-white/5 text-gray-400 hover:text-white cursor-pointer"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Desktop single row */}
        <div className="hidden lg:flex items-stretch border border-gray-200 rounded-2xl overflow-hidden">
          {tab === "flights" && (
            <>
              <div className={barClass}>
                <PlaneTakeoff size={18} className="text-[#dd9e5e] shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide leading-none mb-0.5">From</p>
                  <input
                    value={from}
                    onChange={(e) => setFrom(e.target.value.toUpperCase())}
                    placeholder="CMB"
                    maxLength={3}
                    className="font-bold text-sm w-full outline-none placeholder:text-gray-300"
                  />
                </div>
              </div>
              <div className={barClass}>
                <PlaneLanding size={18} className="text-[#dd9e5e] shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide leading-none mb-0.5">To</p>
                  <input
                    value={to}
                    onChange={(e) => setTo(e.target.value.toUpperCase())}
                    placeholder="DXB"
                    maxLength={3}
                    className="font-bold text-sm w-full outline-none placeholder:text-gray-300"
                  />
                </div>
              </div>
              <button onClick={() => departRef.current?.showPicker?.()} className={barClass}>
                <CalendarDays size={18} className="text-[#dd9e5e] shrink-0" />
                <div>
                  <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide leading-none mb-0.5">Depart</p>
                  <p className={`font-bold text-sm whitespace-nowrap ${!depart ? "text-gray-300" : ""}`}>
                    {formatDate(depart) ?? "Add date"}
                  </p>
                </div>
                <input
                  ref={departRef}
                  type="date"
                  min={today}
                  value={depart}
                  onChange={(e) => setDepart(e.target.value)}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full"
                  tabIndex={-1}
                />
              </button>
              <button onClick={() => returnRef.current?.showPicker?.()} className={barClass}>
                <CalendarDays size={18} className="text-gray-300 shrink-0" />
                <div>
                  <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide leading-none mb-0.5">Return</p>
                  <p className={`font-bold text-sm whitespace-nowrap ${!ret ? "text-gray-300" : ""}`}>
                    {formatDate(ret) ?? "Optional"}
                  </p>
                </div>
                <input
                  ref={returnRef}
                  type="date"
                  min={depart || today}
                  value={ret}
                  onChange={(e) => setRet(e.target.value)}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full"
                  tabIndex={-1}
                />
              </button>
              <div className={`${barClass} border-r-0`}>
                <Users size={18} className="text-[#dd9e5e] shrink-0" />
                <div>
                  <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide leading-none mb-0.5">
                    Travelers
                  </p>
                  <input
                    type="number"
                    min={1}
                    value={travelers}
                    onChange={(e) => setTravelers(Number(e.target.value) || 1)}
                    className="font-bold text-sm w-12 outline-none"
                  />
                </div>
              </div>
            </>
          )}

          {tab === "hotels" && (
            <>
              <button
                onClick={() => {
                  setLocationSearch("");
                  setShowLocation(true);
                }}
                className={barClass}
              >
                <MapPin size={18} className="text-[#dd9e5e] shrink-0" />
                <div className="min-w-0">
                  <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide leading-none mb-0.5">
                    Destination
                  </p>
                  <p className={`font-bold text-sm truncate ${!location ? "text-gray-300" : ""}`}>
                    {location || "Where are you going?"}
                  </p>
                </div>
              </button>
              <button onClick={() => checkInRef.current?.showPicker?.()} className={barClass}>
                <CalendarDays size={18} className="text-[#dd9e5e] shrink-0" />
                <div>
                  <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide leading-none mb-0.5">
                    Check-in
                  </p>
                  <p className={`font-bold text-sm whitespace-nowrap ${!checkIn ? "text-gray-300" : ""}`}>
                    {formatDate(checkIn) ?? "Add date"}
                  </p>
                </div>
                <input
                  ref={checkInRef}
                  type="date"
                  min={today}
                  value={checkIn}
                  onChange={(e) => {
                    setCheckIn(e.target.value);
                    if (checkOut && e.target.value > checkOut) setCheckOut("");
                  }}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full"
                  tabIndex={-1}
                />
              </button>
              <button onClick={() => checkOutRef.current?.showPicker?.()} className={barClass}>
                <CalendarDays size={18} className="text-gray-300 shrink-0" />
                <div>
                  <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide leading-none mb-0.5">
                    Check-out
                  </p>
                  <p className={`font-bold text-sm whitespace-nowrap ${!checkOut ? "text-gray-300" : ""}`}>
                    {formatDate(checkOut) ?? "Add date"}
                  </p>
                </div>
                <input
                  ref={checkOutRef}
                  type="date"
                  min={checkIn || today}
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full"
                  tabIndex={-1}
                />
              </button>
              <div ref={guestsRef} className="relative border-r border-gray-200">
                <button
                  onClick={() => setShowGuests((v) => !v)}
                  className="flex items-center gap-2.5 px-5 py-3 hover:bg-gray-50 transition text-left cursor-pointer h-full"
                >
                  <Users size={18} className="text-[#dd9e5e] shrink-0" />
                  <div>
                    <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide leading-none mb-0.5">
                      Guests & Rooms
                    </p>
                    <p className="font-bold text-sm whitespace-nowrap">{guestSummary}</p>
                  </div>
                </button>
                {showGuests && (
                  <div className="absolute top-full mt-2 right-0 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 z-20 min-w-[220px]">
                    {(
                      [
                        { label: "Adults", sub: "Age 18+", value: adults, setValue: setAdults, min: 1 },
                        { label: "Children", sub: "Age 0–17", value: children, setValue: setChildren, min: 0 },
                        { label: "Rooms", sub: "Number of rooms", value: rooms, setValue: setRooms, min: 1 },
                      ] as const
                    ).map(({ label, sub, value, setValue, min }, i) => (
                      <div
                        key={label}
                        className={`flex items-center justify-between py-2.5 ${i > 0 ? "border-t border-gray-100" : ""}`}
                      >
                        <div>
                          <p className="font-semibold text-sm">{label}</p>
                          <p className="text-xs text-gray-400">{sub}</p>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <button
                            onClick={() => setValue(Math.max(min, value - 1) as never)}
                            className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-200 hover:border-gray-400 text-gray-500 transition cursor-pointer"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="font-bold text-sm w-4 text-center">{value}</span>
                          <button
                            onClick={() => setValue((value + 1) as never)}
                            className="w-7 h-7 flex items-center justify-center rounded-full border border-[#dd9e5e] text-[#dd9e5e] hover:bg-[#dd9e5e] hover:text-white transition cursor-pointer"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={() => setShowGuests(false)}
                      className="mt-3 w-full bg-gray-900 hover:bg-black text-white rounded-xl py-2 text-xs font-bold transition cursor-pointer"
                    >
                      Done
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

          {tab === "rides" && (
            <>
              <div className={barClass}>
                <MapPin size={18} className="text-[#dd9e5e] shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide leading-none mb-0.5">
                    Pickup
                  </p>
                  <input
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    placeholder="Bandaranaike Airport"
                    className="font-bold text-sm w-full outline-none placeholder:text-gray-300"
                  />
                </div>
              </div>
              <div className={barClass}>
                <MapPin size={18} className="text-gray-300 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide leading-none mb-0.5">
                    Drop-off
                  </p>
                  <input
                    value={dropoff}
                    onChange={(e) => setDropoff(e.target.value)}
                    placeholder="Galle Face Hotel"
                    className="font-bold text-sm w-full outline-none placeholder:text-gray-300"
                  />
                </div>
              </div>
              <button onClick={() => rideDateRef.current?.showPicker?.()} className={barClass}>
                <CalendarDays size={18} className="text-[#dd9e5e] shrink-0" />
                <div>
                  <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide leading-none mb-0.5">Date</p>
                  <p className={`font-bold text-sm whitespace-nowrap ${!rideDate ? "text-gray-300" : ""}`}>
                    {formatDate(rideDate) ?? "Add date"}
                  </p>
                </div>
                <input
                  ref={rideDateRef}
                  type="date"
                  min={today}
                  value={rideDate}
                  onChange={(e) => setRideDate(e.target.value)}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full"
                  tabIndex={-1}
                />
              </button>
              <div className={`${barClass} border-r-0`}>
                <Users size={18} className="text-[#dd9e5e] shrink-0" />
                <div>
                  <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide leading-none mb-0.5">
                    Passengers
                  </p>
                  <input
                    type="number"
                    min={1}
                    value={passengers}
                    onChange={(e) => setPassengers(Number(e.target.value) || 1)}
                    className="font-bold text-sm w-12 outline-none"
                  />
                </div>
              </div>
            </>
          )}

          <button
            onClick={handleSearch}
            className="flex items-center gap-2 bg-black hover:bg-gray-900 text-white text-sm font-bold px-6 py-3.5 transition cursor-pointer shrink-0"
          >
            <Search size={16} />
            Search
          </button>
        </div>

        {/* Mobile / tablet: stacked */}
        <div className="flex lg:hidden flex-col gap-2">
          {tab === "flights" && (
            <>
              <div className={mobileBarClass}>
                <PlaneTakeoff size={18} className="text-[#dd9e5e] shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide leading-none mb-0.5">From</p>
                  <input
                    value={from}
                    onChange={(e) => setFrom(e.target.value.toUpperCase())}
                    placeholder="CMB"
                    maxLength={3}
                    className="font-bold text-sm w-full outline-none placeholder:text-gray-300"
                  />
                </div>
              </div>
              <div className={mobileBarClass}>
                <PlaneLanding size={18} className="text-[#dd9e5e] shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide leading-none mb-0.5">To</p>
                  <input
                    value={to}
                    onChange={(e) => setTo(e.target.value.toUpperCase())}
                    placeholder="DXB"
                    maxLength={3}
                    className="font-bold text-sm w-full outline-none placeholder:text-gray-300"
                  />
                </div>
              </div>
              <button onClick={() => departRef.current?.showPicker?.()} className={mobileBarClass}>
                <CalendarDays size={18} className="text-[#dd9e5e] shrink-0" />
                <div>
                  <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide leading-none mb-0.5">Depart</p>
                  <p className={`font-bold text-sm ${!depart ? "text-gray-300" : ""}`}>{formatDate(depart) ?? "Add date"}</p>
                </div>
                <input
                  type="date"
                  min={today}
                  value={depart}
                  onChange={(e) => setDepart(e.target.value)}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full"
                  tabIndex={-1}
                />
              </button>
              <div className={mobileBarClass}>
                <Users size={18} className="text-[#dd9e5e] shrink-0" />
                <div>
                  <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide leading-none mb-0.5">
                    Travelers
                  </p>
                  <input
                    type="number"
                    min={1}
                    value={travelers}
                    onChange={(e) => setTravelers(Number(e.target.value) || 1)}
                    className="font-bold text-sm w-12 outline-none"
                  />
                </div>
              </div>
            </>
          )}

          {tab === "hotels" && (
            <>
              <button
                onClick={() => {
                  setLocationSearch("");
                  setShowLocation(true);
                }}
                className={mobileBarClass}
              >
                <MapPin size={18} className="text-[#dd9e5e] shrink-0" />
                <div className="min-w-0">
                  <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide leading-none mb-0.5">
                    Destination
                  </p>
                  <p className={`font-bold text-sm truncate ${!location ? "text-gray-300" : ""}`}>
                    {location || "Where are you going?"}
                  </p>
                </div>
              </button>
              <button onClick={() => checkInRef.current?.showPicker?.()} className={mobileBarClass}>
                <CalendarDays size={18} className="text-[#dd9e5e] shrink-0" />
                <div>
                  <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide leading-none mb-0.5">
                    Check-in
                  </p>
                  <p className={`font-bold text-sm ${!checkIn ? "text-gray-300" : ""}`}>
                    {formatDate(checkIn) ?? "Add date"}
                  </p>
                </div>
                <input
                  type="date"
                  min={today}
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full"
                  tabIndex={-1}
                />
              </button>
              <button onClick={() => checkOutRef.current?.showPicker?.()} className={mobileBarClass}>
                <CalendarDays size={18} className="text-gray-300 shrink-0" />
                <div>
                  <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide leading-none mb-0.5">
                    Check-out
                  </p>
                  <p className={`font-bold text-sm ${!checkOut ? "text-gray-300" : ""}`}>
                    {formatDate(checkOut) ?? "Add date"}
                  </p>
                </div>
                <input
                  type="date"
                  min={checkIn || today}
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full"
                  tabIndex={-1}
                />
              </button>
              <div ref={guestsRef} className="relative">
                <button onClick={() => setShowGuests((v) => !v)} className={`${mobileBarClass} w-full`}>
                  <Users size={18} className="text-[#dd9e5e] shrink-0" />
                  <div>
                    <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide leading-none mb-0.5">
                      Guests & Rooms
                    </p>
                    <p className="font-bold text-sm whitespace-nowrap">{guestSummary}</p>
                  </div>
                </button>
              </div>
            </>
          )}

          {tab === "rides" && (
            <>
              <div className={mobileBarClass}>
                <MapPin size={18} className="text-[#dd9e5e] shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide leading-none mb-0.5">
                    Pickup
                  </p>
                  <input
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    placeholder="Bandaranaike Airport"
                    className="font-bold text-sm w-full outline-none placeholder:text-gray-300"
                  />
                </div>
              </div>
              <div className={mobileBarClass}>
                <MapPin size={18} className="text-gray-300 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide leading-none mb-0.5">
                    Drop-off
                  </p>
                  <input
                    value={dropoff}
                    onChange={(e) => setDropoff(e.target.value)}
                    placeholder="Galle Face Hotel"
                    className="font-bold text-sm w-full outline-none placeholder:text-gray-300"
                  />
                </div>
              </div>
              <button onClick={() => rideDateRef.current?.showPicker?.()} className={mobileBarClass}>
                <CalendarDays size={18} className="text-[#dd9e5e] shrink-0" />
                <div>
                  <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide leading-none mb-0.5">Date</p>
                  <p className={`font-bold text-sm ${!rideDate ? "text-gray-300" : ""}`}>
                    {formatDate(rideDate) ?? "Add date"}
                  </p>
                </div>
                <input
                  type="date"
                  min={today}
                  value={rideDate}
                  onChange={(e) => setRideDate(e.target.value)}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full"
                  tabIndex={-1}
                />
              </button>
              <div className={mobileBarClass}>
                <Users size={18} className="text-[#dd9e5e] shrink-0" />
                <div>
                  <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide leading-none mb-0.5">
                    Passengers
                  </p>
                  <input
                    type="number"
                    min={1}
                    value={passengers}
                    onChange={(e) => setPassengers(Number(e.target.value) || 1)}
                    className="font-bold text-sm w-12 outline-none"
                  />
                </div>
              </div>
            </>
          )}

          <button
            onClick={handleSearch}
            className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-black text-white font-bold py-3 rounded-full transition cursor-pointer text-sm"
          >
            <Search size={15} />
            Search {tabs.find((t) => t.key === tab)?.label}
          </button>
        </div>
      </div>

      {/* Location Popup (Hotels) */}
      {showLocation && (
        <div
          className="fixed inset-0 bg-black/60 flex flex-col items-center justify-start gap-3 z-50 pt-20 md:pt-24"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowLocation(false);
          }}
        >
          <div className="max-w-3xl bg-white rounded-2xl p-4 md:p-5 w-[90%] flex flex-col gap-3 relative overflow-y-auto max-h-[75vh] md:max-h-[60vh]">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm">Where are you staying?</h3>
              <button onClick={() => setShowLocation(false)} className="text-gray-400 hover:text-gray-700 cursor-pointer">
                <X size={18} />
              </button>
            </div>
            <input
              type="text"
              placeholder="Search city, region, or hotel..."
              value={locationSearch}
              onChange={(e) => setLocationSearch(e.target.value)}
              className="w-full px-3 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-[#dd9e5e]"
              autoFocus
            />
            <div className="flex flex-col">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-1 mb-1.5">
                Popular Destinations
              </p>
              {filteredDestinations.map((d) => (
                <button
                  key={d.city}
                  onClick={() => {
                    setLocation(`${d.city}, ${d.country}`);
                    setShowLocation(false);
                  }}
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 cursor-pointer w-full text-left transition"
                >
                  <MapPin size={18} className="text-[#dd9e5e] shrink-0" />
                  <span>
                    <p className="text-sm font-semibold">{d.city}</p>
                    <p className="text-xs text-gray-400">{d.country}</p>
                  </span>
                </button>
              ))}
              {filteredDestinations.length === 0 && (
                <p className="text-sm text-gray-400 text-center py-4">No destinations found.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab-appropriate content below the hero */}
      {tab === "flights" && (
        <>
          <Airline />
          <Deals />
        </>
      )}
      {tab === "hotels" && <Stays />}
      {tab === "rides" && <Rides />}
    </div>
  );
}
