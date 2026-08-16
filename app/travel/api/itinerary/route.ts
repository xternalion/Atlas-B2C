import { NextRequest, NextResponse } from "next/server";
import { isAiConfigured, extractTripParams, synthesizeItinerary } from "@/lib/ai";
import { renderItineraryPdf } from "@/lib/pdf/itinerary-pdf";
import { uploadToR2 } from "@/lib/r2";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { prompt, name, email, startDate, endDate, travelers, budget } = body as {
    prompt: string;
    name?: string;
    email: string;
    startDate?: string;
    endDate?: string;
    travelers?: number;
    budget?: string;
  };

  if (!prompt || !email) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  if (!isAiConfigured()) {
    return NextResponse.json(
      { error: "AI itinerary generation is not configured yet" },
      { status: 503 },
    );
  }

  let tripParams;
  try {
    tripParams = await extractTripParams(prompt);
  } catch (err) {
    console.error("AI trip-param extraction error:", err);
    return NextResponse.json({ error: "Failed to understand the trip request" }, { status: 502 });
  }

  if (startDate) tripParams.startDate = startDate;
  if (endDate) tripParams.endDate = endDate;
  if (travelers) tripParams.travelers = travelers;
  if (budget) tripParams.budget = budget;

  // Best-effort real flight fetch — continues without flights if Amadeus
  // isn't configured or the request fails, rather than failing the itinerary.
  let flights: unknown[] = [];
  let flightsAvailable = false;
  if (tripParams.originIata && tripParams.destinationIata && tripParams.startDate) {
    try {
      const qs = new URLSearchParams({
        originLocationCode: tripParams.originIata,
        destinationLocationCode: tripParams.destinationIata,
        departureDate: tripParams.startDate,
        adults: String(tripParams.travelers || 1),
        max: "5",
      });
      if (tripParams.endDate) qs.set("returnDate", tripParams.endDate);
      const res = await fetch(`${req.nextUrl.origin}/travel/api/flights?${qs}`);
      if (res.ok) {
        const data = await res.json();
        flights = Array.isArray(data) ? data : [];
        flightsAvailable = flights.length > 0;
      }
    } catch (err) {
      console.error("Flight fetch failed (continuing without flights):", err);
    }
  }

  // Best-effort matching package lookup — same non-fatal treatment.
  let packages: unknown[] = [];
  try {
    const { data } = await supabaseAdmin
      .from("ac_listings_travel")
      .select("id, title, name, description, price")
      .ilike("title", `%${tripParams.destinationCity}%`)
      .limit(5);
    packages = data ?? [];
  } catch (err) {
    console.error("Package lookup failed (continuing without packages):", err);
  }

  let itinerary;
  try {
    itinerary = await synthesizeItinerary(prompt, tripParams, {
      flights,
      packages,
      flightsAvailable,
    });
  } catch (err) {
    console.error("AI itinerary synthesis error:", err);
    return NextResponse.json({ error: "Failed to generate itinerary" }, { status: 502 });
  }

  let pdfUrl: string | null = null;
  try {
    const pdfBuffer = await renderItineraryPdf(itinerary);
    const key = `itineraries/${Date.now()}-${Math.random().toString(36).slice(2)}.pdf`;
    pdfUrl = await uploadToR2(key, pdfBuffer, "application/pdf");
  } catch (err) {
    console.error("PDF generation/upload failed (continuing without PDF):", err);
  }

  const { data: inserted, error: dbError } = await supabaseAdmin
    .from("ac_itineraries")
    .insert([
      {
        email,
        name: name || null,
        prompt,
        itinerary_json: itinerary,
        pdf_url: pdfUrl,
        flights_included: flightsAvailable,
      },
    ])
    .select()
    .single();

  if (dbError) {
    console.error("Supabase insert error (ac_itineraries):", dbError.message);
    return NextResponse.json({ error: "Failed to save itinerary" }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    data: { itineraryId: inserted.id, itinerary, pdfUrl },
  });
}
