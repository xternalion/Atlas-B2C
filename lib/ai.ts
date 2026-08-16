import Anthropic from "@anthropic-ai/sdk";

const MODEL = "claude-sonnet-5";

export function isAiConfigured(): boolean {
  return Boolean(process.env.ANTHROPIC_API_KEY);
}

function getClient(): Anthropic {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error("ANTHROPIC_API_KEY is not set");
  }
  return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
}

function parseJsonResponse<T>(message: Anthropic.Message): T {
  const block = message.content.find((b) => b.type === "text");
  if (!block || block.type !== "text") {
    throw new Error("AI response contained no text");
  }
  const cleaned = block.text.trim().replace(/^```(json)?\s*|```$/g, "");
  return JSON.parse(cleaned) as T;
}

export type TripParams = {
  destinationCity: string;
  destinationIata: string | null;
  originIata: string | null;
  startDate: string | null;
  endDate: string | null;
  travelers: number;
  budget: string | null;
};

export async function extractTripParams(prompt: string): Promise<TripParams> {
  const client = getClient();
  const message = await client.messages.create({
    model: MODEL,
    max_tokens: 500,
    system:
      'You extract structured trip parameters from a free-text travel request. Respond with ONLY valid JSON matching this exact shape: {"destinationCity": string, "destinationIata": string|null, "originIata": string|null, "startDate": string|null (YYYY-MM-DD), "endDate": string|null (YYYY-MM-DD), "travelers": number, "budget": string|null}. Guess IATA airport codes for major cities when possible. No prose, no markdown fences.',
    messages: [{ role: "user", content: prompt }],
  });
  return parseJsonResponse<TripParams>(message);
}

export type ItineraryResult = {
  title: string;
  summary: string;
  days: { day: number; title: string; activities: string[] }[];
  estimatedBudget: string | null;
  notes: string | null;
};

export async function synthesizeItinerary(
  prompt: string,
  tripParams: TripParams,
  context: { flights?: unknown; packages?: unknown; flightsAvailable: boolean },
): Promise<ItineraryResult> {
  const client = getClient();
  const message = await client.messages.create({
    model: MODEL,
    max_tokens: 2000,
    system:
      'You are WanderMind, Atlas Travel\'s itinerary planner. Given a traveler\'s request, extracted trip parameters, and any real flight/package data found, produce a realistic day-by-day itinerary. If flight data is unavailable, do not invent specific flight numbers or prices. Respond with ONLY valid JSON matching this exact shape: {"title": string, "summary": string, "days": [{"day": number, "title": string, "activities": string[]}], "estimatedBudget": string|null, "notes": string|null}. No prose, no markdown fences.',
    messages: [
      {
        role: "user",
        content: JSON.stringify({ prompt, tripParams, ...context }),
      },
    ],
  });
  return parseJsonResponse<ItineraryResult>(message);
}
