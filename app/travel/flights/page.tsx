"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  PlaneTakeoff,
  PlaneLanding,
  ArrowLeftRight,
  Clock,
  Users,
  ChevronDown,
  ChevronUp,
  Loader2,
  AlertCircle,
  ArrowLeft,
  Wifi,
  Utensils,
} from "lucide-react";
import {
  searchFlights,
  parseDuration,
  formatTime,
  formatDateShort,
  FlightOffer,
} from "@/lib/amadeus";

const AIRLINE_NAMES: Record<string, string> = {
  UL: "SriLankan Airlines",
  EK: "Emirates",
  QR: "Qatar Airways",
  EY: "Etihad Airways",
  SQ: "Singapore Airlines",
  LH: "Lufthansa",
  AF: "Air France",
  BA: "British Airways",
  MH: "Malaysia Airlines",
  AI: "Air India",
  TK: "Turkish Airlines",
  FZ: "Flydubai",
  G8: "Go First",
  "6E": "IndiGo",
  WY: "Oman Air",
  GF: "Gulf Air",
};

function airlineName(code: string) {
  return AIRLINE_NAMES[code] ?? code;
}

function airlineLogo(code: string) {
  return `https://content.airhex.com/content/logos/airlines_${code}_50_50_s.png`;
}

type SortKey = "price" | "duration" | "stops";

function FlightsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const from = searchParams.get("from") ?? "";
  const to = searchParams.get("to") ?? "";
  const type = (searchParams.get("type") ?? "Round+Trip").replace(/\+/g, " ");
  const depart = searchParams.get("depart") ?? "";
  const ret = searchParams.get("return") ?? "";
  const adults = Number(searchParams.get("adults") ?? searchParams.get("passengers") ?? 1);
  const children = Number(searchParams.get("children") ?? 0);
  const infants = Number(searchParams.get("infants") ?? 0);
  const passengers = adults + children + infants;

  const [flights, setFlights] = useState<FlightOffer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortKey>("price");

  const fetchFlights = useCallback(async () => {
    if (!from || !to || !depart) {
      setError("Please provide origin, destination, and departure date.");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const results = await searchFlights({
        originLocationCode: from,
        destinationLocationCode: to,
        departureDate: depart,
        returnDate: type !== "One Way" && ret ? ret : undefined,
        adults,
        children: children > 0 ? children : undefined,
        infants: infants > 0 ? infants : undefined,
        max: 15,
      });
      setFlights(results);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load flights.");
    } finally {
      setLoading(false);
    }
  }, [from, to, depart, ret, type, adults, children, infants]);

  useEffect(() => {
    fetchFlights();
  }, [fetchFlights]);

  const sorted = [...flights].sort((a, b) => {
    if (sortBy === "price") return parseFloat(a.price.total) - parseFloat(b.price.total);
    if (sortBy === "stops")
      return a.itineraries[0].segments.length - b.itineraries[0].segments.length;
    if (sortBy === "duration") {
      const dur = (f: FlightOffer) => {
        const iso = f.itineraries[0].duration;
        const h = iso.match(/(\d+)H/)?.[1] ?? "0";
        const m = iso.match(/(\d+)M/)?.[1] ?? "0";
        return parseInt(h) * 60 + parseInt(m);
      };
      return dur(a) - dur(b);
    }
    return 0;
  });

  const stopLabel = (count: number) =>
    count === 0 ? "Nonstop" : count === 1 ? "1 Stop" : `${count} Stops`;

  const stopColor = (count: number) =>
    count === 0
      ? "text-green-600 bg-green-50"
      : count === 1
      ? "text-amber-600 bg-amber-50"
      : "text-red-500 bg-red-50";

  const cabinClass =
    flights[0]?.travelerPricings?.[0]?.fareDetailsBySegment?.[0]?.cabin ?? "ECONOMY";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dark fill behind transparent navbar */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-black/90 z-30 pointer-events-none" />
      {/* Top bar */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-20 shadow-sm" style={{top: '64px'}}>
        <div className="max-w-6xl mx-auto px-4 md:px-8 2xl:px-0 py-4 flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition shrink-0 cursor-pointer"
          >
            <ArrowLeft size={16} />
            Back
          </button>

          {/* Route summary */}
          <div className="flex items-center gap-2 flex-1">
            <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2 border border-gray-200">
              <PlaneTakeoff size={14} className="text-[#dd9e5e] shrink-0" />
              <span className="font-bold text-sm">{from}</span>
            </div>
            <ArrowLeftRight size={14} className="text-gray-400 shrink-0" />
            <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2 border border-gray-200">
              <PlaneLanding size={14} className="text-[#dd9e5e] shrink-0" />
              <span className="font-bold text-sm">{to}</span>
            </div>
            <div className="hidden md:flex items-center gap-1.5 text-xs text-gray-500">
              <span>{depart && formatDateShort(depart + "T00:00:00")}</span>
              {ret && <><span>→</span><span>{formatDateShort(ret + "T00:00:00")}</span></>}
              <span>·</span>
              <Users size={12} />
              <span>{passengers} pax</span>
              <span>·</span>
              <span className="capitalize">{type}</span>
            </div>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-gray-400 font-medium hidden md:block">Sort:</span>
            {(["price", "duration", "stops"] as SortKey[]).map((key) => (
              <button
                key={key}
                onClick={() => setSortBy(key)}
                className={`px-3 py-1.5 rounded-lg font-semibold capitalize transition cursor-pointer ${
                  sortBy === key
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
              >
                {key}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 py-8">
        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Loader2 size={36} className="animate-spin text-[#dd9e5e]" />
            <p className="text-sm text-gray-500 font-medium">Searching for the best flights...</p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
            <AlertCircle size={36} className="text-red-400" />
            <p className="text-sm text-gray-600 font-medium max-w-sm">{error}</p>
            <button
              onClick={fetchFlights}
              className="mt-2 px-5 py-2 bg-gray-900 text-white text-sm font-bold rounded-xl hover:bg-black transition cursor-pointer"
            >
              Try Again
            </button>
          </div>
        )}

        {/* No results */}
        {!loading && !error && sorted.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 gap-3 text-center">
            <PlaneTakeoff size={36} className="text-gray-300" />
            <p className="text-sm text-gray-500 font-medium">No flights found for this route and date.</p>
            <p className="text-xs text-gray-400">Try different dates or airports.</p>
          </div>
        )}

        {/* Results header */}
        {!loading && !error && sorted.length > 0 && (
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="font-bold text-gray-900">
                {sorted.length} flight{sorted.length !== 1 ? "s" : ""} found
              </p>
              <p className="text-xs text-gray-400 mt-0.5 capitalize">
                {from} → {to} · {cabinClass.toLowerCase()} class
              </p>
            </div>
          </div>
        )}

        {/* Flight cards */}
        <div className="flex flex-col gap-3">
          {sorted.map((offer) => {
            const itinerary = offer.itineraries[0];
            const returnItinerary = offer.itineraries[1];
            const firstSeg = itinerary.segments[0];
            const lastSeg = itinerary.segments[itinerary.segments.length - 1];
            const stops = itinerary.segments.length - 1;
            const carrier = offer.validatingAirlineCodes?.[0] ?? firstSeg.carrierCode;
            const isExpanded = expandedId === offer.id;

            return (
              <div
                key={offer.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition overflow-hidden"
              >
                {/* Main row */}
                <div className="p-4 md:p-5">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    {/* Airline */}
                    <div className="flex items-center gap-3 md:w-44 shrink-0">
                      <div className="w-9 h-9 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden shrink-0">
                        <img
                          src={airlineLogo(carrier)}
                          alt={airlineName(carrier)}
                          className="w-7 h-7 object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = "none";
                          }}
                        />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-800 leading-tight">{airlineName(carrier)}</p>
                        <p className="text-[10px] text-gray-400">{firstSeg.carrierCode}{firstSeg.number}</p>
                      </div>
                    </div>

                    {/* Times */}
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      {/* Depart */}
                      <div className="text-center">
                        <p className="text-lg font-extrabold text-gray-900 leading-none">{formatTime(firstSeg.departure.at)}</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">{firstSeg.departure.iataCode}</p>
                        <p className="text-[10px] text-gray-300">{formatDateShort(firstSeg.departure.at)}</p>
                      </div>

                      {/* Line */}
                      <div className="flex-1 flex flex-col items-center gap-1 min-w-[60px]">
                        <p className="text-[10px] text-gray-400 flex items-center gap-1">
                          <Clock size={9} />
                          {parseDuration(itinerary.duration)}
                        </p>
                        <div className="w-full flex items-center gap-1">
                          <div className="flex-1 h-px bg-gray-200" />
                          <PlaneTakeoff size={11} className="text-[#dd9e5e] shrink-0" />
                          <div className="flex-1 h-px bg-gray-200" />
                        </div>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${stopColor(stops)}`}>
                          {stopLabel(stops)}
                        </span>
                      </div>

                      {/* Arrive */}
                      <div className="text-center">
                        <p className="text-lg font-extrabold text-gray-900 leading-none">{formatTime(lastSeg.arrival.at)}</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">{lastSeg.arrival.iataCode}</p>
                        <p className="text-[10px] text-gray-300">{formatDateShort(lastSeg.arrival.at)}</p>
                      </div>
                    </div>

                    {/* Return leg summary */}
                    {returnItinerary && (
                      <>
                        <div className="hidden md:block w-px h-10 bg-gray-100 shrink-0" />
                        <div className="hidden md:flex items-center gap-3 shrink-0">
                          <div className="text-center">
                            <p className="text-base font-extrabold text-gray-900 leading-none">{formatTime(returnItinerary.segments[0].departure.at)}</p>
                            <p className="text-[10px] text-gray-400 mt-0.5">{returnItinerary.segments[0].departure.iataCode}</p>
                          </div>
                          <div className="flex flex-col items-center gap-0.5">
                            <p className="text-[10px] text-gray-400">{parseDuration(returnItinerary.duration)}</p>
                            <div className="w-12 h-px bg-gray-200" />
                            <p className="text-[9px] text-gray-400">Return</p>
                          </div>
                          <div className="text-center">
                            <p className="text-base font-extrabold text-gray-900 leading-none">
                              {formatTime(returnItinerary.segments[returnItinerary.segments.length - 1].arrival.at)}
                            </p>
                            <p className="text-[10px] text-gray-400 mt-0.5">
                              {returnItinerary.segments[returnItinerary.segments.length - 1].arrival.iataCode}
                            </p>
                          </div>
                        </div>
                      </>
                    )}

                    {/* Price & CTA */}
                    <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-3 md:gap-1 md:w-36 shrink-0">
                      <div className="text-right">
                        <p className="text-xl font-extrabold text-gray-900">
                          ${parseFloat(offer.price.total).toFixed(0)}
                        </p>
                        <p className="text-[10px] text-gray-400">per person · {offer.price.currency}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1.5">
                        <button className="bg-gray-900 hover:bg-black text-white text-xs font-bold px-4 py-2 rounded-xl transition cursor-pointer whitespace-nowrap">
                          Select
                        </button>
                        <p className="text-[10px] text-gray-400">
                          {offer.numberOfBookableSeats} seat{offer.numberOfBookableSeats !== 1 ? "s" : ""} left
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Amenities row */}
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 text-[10px] text-gray-400">
                        <Wifi size={10} /> Wi-Fi available
                      </span>
                      <span className="flex items-center gap-1 text-[10px] text-gray-400">
                        <Utensils size={10} /> Meal included
                      </span>
                      <span className="text-[10px] font-medium text-[#dd9e5e] bg-orange-50 px-2 py-0.5 rounded-full capitalize">
                        {cabinClass.toLowerCase()} class
                      </span>
                    </div>
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : offer.id)}
                      className="flex items-center gap-1 text-[10px] text-gray-400 hover:text-gray-700 transition cursor-pointer"
                    >
                      {isExpanded ? "Hide details" : "Flight details"}
                      {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                    </button>
                  </div>
                </div>

                {/* Expanded segment detail */}
                {isExpanded && (
                  <div className="border-t border-gray-100 bg-gray-50 px-5 py-4 flex flex-col gap-4">
                    {offer.itineraries.map((itin, idx) => (
                      <div key={idx}>
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-3">
                          {idx === 0 ? "Outbound" : "Return"} · {parseDuration(itin.duration)} total
                        </p>
                        <div className="flex flex-col gap-3">
                          {itin.segments.map((seg, si) => (
                            <div key={si} className="flex items-start gap-3">
                              <div className="flex flex-col items-center gap-1 pt-1">
                                <div className="w-2 h-2 rounded-full bg-[#dd9e5e]" />
                                {si < itin.segments.length - 1 && (
                                  <div className="w-px flex-1 bg-gray-200 h-10" />
                                )}
                              </div>
                              <div className="flex-1 flex flex-col md:flex-row md:items-center gap-1 md:gap-6">
                                <div>
                                  <p className="text-sm font-bold text-gray-900">
                                    {formatTime(seg.departure.at)}{" "}
                                    <span className="text-gray-400 font-normal text-xs">{seg.departure.iataCode}</span>
                                  </p>
                                  <p className="text-[10px] text-gray-400">{formatDateShort(seg.departure.at)}</p>
                                </div>
                                <div className="flex items-center gap-2 text-[10px] text-gray-400">
                                  <Clock size={10} />
                                  {parseDuration(
                                    `PT${Math.floor(
                                      (new Date(seg.arrival.at).getTime() - new Date(seg.departure.at).getTime()) / 3600000
                                    )}H${Math.floor(
                                      ((new Date(seg.arrival.at).getTime() - new Date(seg.departure.at).getTime()) % 3600000) / 60000
                                    )}M`
                                  )}
                                  <span className="text-gray-300">·</span>
                                  <span>{seg.carrierCode}{seg.number}</span>
                                  <span className="text-gray-300">·</span>
                                  <span>{seg.aircraft.code}</span>
                                </div>
                                <div>
                                  <p className="text-sm font-bold text-gray-900">
                                    {formatTime(seg.arrival.at)}{" "}
                                    <span className="text-gray-400 font-normal text-xs">{seg.arrival.iataCode}</span>
                                  </p>
                                  <p className="text-[10px] text-gray-400">{formatDateShort(seg.arrival.at)}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Powered by */}
        {!loading && sorted.length > 0 && (
          <p className="text-center text-[10px] text-gray-300 mt-8">
            Powered by Amadeus Travel API · Prices are indicative and subject to change
          </p>
        )}
      </div>
    </div>
  );
}

export default function FlightsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-[#dd9e5e]" />
      </div>
    }>
      <FlightsContent />
    </Suspense>
  );
}
