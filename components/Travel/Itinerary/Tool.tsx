"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2, Download, CheckCircle2, Sparkles, ArrowRight, ArrowLeft, Search } from "lucide-react";

type ItineraryResult = {
  title: string;
  summary: string;
  days: { day: number; title: string; activities: string[] }[];
  estimatedBudget: string | null;
  notes: string | null;
};

const MOODS = ["Relaxing", "Adventure", "Romantic", "Cultural", "Nature", "Nightlife", "Luxury", "Family"];

type Stage = "search" | "capture" | "result";

export default function ItineraryTool() {
  const searchParams = useSearchParams();
  const [prompt, setPrompt] = useState(searchParams.get("prompt") ?? "");
  const [moods, setMoods] = useState<string[]>([]);
  const [destinationPref, setDestinationPref] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [stage, setStage] = useState<Stage>("search");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [itineraryId, setItineraryId] = useState<string | null>(null);
  const [itinerary, setItinerary] = useState<ItineraryResult | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [confirming, setConfirming] = useState(false);

  const toggleMood = (mood: string) => {
    setMoods((prev) => (prev.includes(mood) ? prev.filter((m) => m !== mood) : [...prev, mood]));
  };

  const handleSearchSubmit = () => {
    if (!prompt.trim() && !destinationPref.trim()) {
      setError("Tell us where you'd like to go, or describe the trip you want.");
      return;
    }
    setError(null);
    setStage("capture");
  };

  const handleGenerate = async () => {
    if (!email) {
      setError("Enter your email so we can send your itinerary.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const composedPrompt = [
        moods.length ? `Trip mood/vibe: ${moods.join(", ")}.` : "",
        destinationPref ? `Preferred destination or region: ${destinationPref}.` : "",
        prompt || `A trip to ${destinationPref}`,
      ]
        .filter(Boolean)
        .join(" ");

      const res = await fetch("/travel/api/itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: composedPrompt, name, email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong");
        return;
      }
      setItineraryId(data.data.itineraryId);
      setItinerary(data.data.itinerary);
      setPdfUrl(data.data.pdfUrl);
      setStage("result");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async () => {
    if (!itineraryId) return;
    setConfirming(true);
    try {
      const res = await fetch(`/travel/api/itinerary/${itineraryId}/confirm`, { method: "POST" });
      if (res.ok) setConfirmed(true);
    } finally {
      setConfirming(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#08070c] text-white py-32 px-6">
      {/* Rainbow aurora background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-48 -left-24 w-[34rem] h-[34rem] bg-[#dd9e5e]/35 rounded-full blur-[110px]" />
        <div className="absolute -top-32 right-[-6rem] w-[30rem] h-[30rem] bg-[#c8874a]/30 rounded-full blur-[110px]" />
        <div className="absolute bottom-[-6rem] right-1/4 w-[30rem] h-[30rem] bg-[#e8b07a]/25 rounded-full blur-[110px]" />
        <div className="absolute bottom-[-8rem] left-0 w-[26rem] h-[26rem] bg-[#dd9e5e]/20 rounded-full blur-[110px]" />
        {/* subtle accent hues — a hint of colour, not a rainbow */}
        <div className="absolute top-1/4 left-1/3 w-[22rem] h-[22rem] bg-[#4fa8ff]/8 rounded-full blur-[110px]" />
        <div className="absolute top-1/2 right-1/3 w-[20rem] h-[20rem] bg-[#a855f7]/8 rounded-full blur-[110px]" />
        <div className="absolute inset-0 bg-[#0d0d0d]/55" />
      </div>

      <div className="relative max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-px w-10 bg-[#dd9e5e]/40" />
          <span className="text-[#dd9e5e] text-[10px] font-bold tracking-[0.35em] uppercase">
            WanderMind AI
          </span>
        </div>
        <h1 className="cursive text-4xl md:text-5xl text-white mb-3">Where to, next?</h1>
        <p className="text-white/50 text-sm leading-relaxed mb-10 max-w-lg">
          Pick a vibe, name a destination — or just describe the trip in your
          own words. No sign-up needed to start planning.
        </p>

        {stage === "search" && (
          <div className="rounded-3xl border border-white/15 bg-white/[0.06] backdrop-blur-xl p-8 flex flex-col gap-5 shadow-[0_30px_80px_rgba(0,0,0,0.4)]">
            <div className="flex items-center gap-3 rounded-2xl bg-white/10 border border-white/15 px-4 py-3 focus-within:border-[#dd9e5e]/60 transition-colors">
              <Search size={18} className="text-[#dd9e5e] shrink-0" />
              <input
                type="text"
                value={destinationPref}
                onChange={(e) => setDestinationPref(e.target.value)}
                placeholder="Search a destination — Bali, Japan, anywhere in Europe…"
                className="flex-1 bg-transparent text-sm text-white placeholder:text-white/40 outline-none"
              />
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-2.5">
                What&apos;s the vibe? (optional)
              </p>
              <div className="flex flex-wrap gap-2">
                {MOODS.map((mood) => (
                  <button
                    key={mood}
                    type="button"
                    onClick={() => toggleMood(mood)}
                    className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold border transition-all duration-200 cursor-pointer ${
                      moods.includes(mood)
                        ? "bg-[#dd9e5e] text-white border-[#dd9e5e]"
                        : "bg-white/5 border-white/15 text-white/60 hover:text-white hover:border-white/30"
                    }`}
                  >
                    {mood}
                  </button>
                ))}
              </div>
            </div>

            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Anything else? e.g. 5 days, 2 people, mid-range budget, departing from Colombo (optional)"
              rows={3}
              className="w-full rounded-2xl bg-white/10 border border-white/15 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-[#dd9e5e]/60 resize-none"
            />

            {error && <p className="text-rose-300 text-[12px]">{error}</p>}

            <button onClick={handleSearchSubmit} className="btn-primary-base">
              Find My Trip <ArrowRight size={16} />
            </button>
          </div>
        )}

        {stage === "capture" && (
          <div className="rounded-3xl border border-white/15 bg-white/[0.06] backdrop-blur-xl p-8 flex flex-col gap-4 shadow-[0_30px_80px_rgba(0,0,0,0.4)]">
            <button
              onClick={() => setStage("search")}
              className="inline-flex items-center gap-1.5 text-white/50 hover:text-white text-[12px] font-semibold w-fit cursor-pointer transition-colors"
            >
              <ArrowLeft size={13} /> Back
            </button>

            <div>
              <p className="text-white text-sm font-semibold mb-1">Almost there</p>
              <p className="text-white/50 text-[13px] leading-relaxed">
                Where should we send your personalized itinerary?
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Full name (optional)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl bg-white/10 border border-white/15 px-4 py-2.5 text-sm text-white placeholder:text-white/40 outline-none focus:border-[#dd9e5e]/60"
              />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
                className="w-full rounded-xl bg-white/10 border border-white/15 px-4 py-2.5 text-sm text-white placeholder:text-white/40 outline-none focus:border-[#dd9e5e]/60"
              />
            </div>

            {error && <p className="text-rose-300 text-[12px]">{error}</p>}

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="btn-primary-base disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Generating…
                </>
              ) : (
                <>
                  <Sparkles size={16} /> Generate My Itinerary
                </>
              )}
            </button>
          </div>
        )}

        {stage === "result" && itinerary && (
          <div className="rounded-3xl border border-white/15 bg-white/[0.06] backdrop-blur-xl p-8 shadow-[0_30px_80px_rgba(0,0,0,0.4)]">
            <h2 className="cursive text-2xl text-white mb-2">{itinerary.title}</h2>
            <p className="text-white/60 text-sm leading-relaxed mb-6">{itinerary.summary}</p>

            <div className="flex flex-col gap-5 mb-6">
              {itinerary.days.map((day) => (
                <div key={day.day}>
                  <p className="text-white/80 text-xs font-bold uppercase tracking-wider mb-1.5">
                    Day {day.day} — {day.title}
                  </p>
                  <ul className="space-y-1">
                    {day.activities.map((a, i) => (
                      <li key={i} className="text-white/60 text-[13px] leading-relaxed">
                        • {a}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {itinerary.estimatedBudget && (
              <p className="text-white/80 text-sm font-semibold mb-6">
                Estimated budget: {itinerary.estimatedBudget}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-3">
              {pdfUrl && (
                <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="btn-light-glass !w-fit">
                  <Download size={15} /> Download PDF
                </a>
              )}
              {confirmed ? (
                <span className="inline-flex items-center gap-2 text-white text-sm font-semibold">
                  <CheckCircle2 size={16} /> Booking confirmed
                </span>
              ) : (
                <button
                  onClick={handleConfirm}
                  disabled={confirming}
                  className="btn-primary-sm disabled:opacity-60"
                >
                  {confirming ? "Confirming…" : "Confirm Booking"}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
