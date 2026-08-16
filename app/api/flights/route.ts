import { NextRequest, NextResponse } from "next/server";


const AMADEUS_BASE = "https://test.api.amadeus.com";

let cachedToken: { token: string; expires: number } | null = null;

async function getToken(): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expires) return cachedToken.token;

  const res = await fetch(`${AMADEUS_BASE}/v1/security/oauth2/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: process.env.AMADEUS_CLIENT_ID!,
      client_secret: process.env.AMADEUS_CLIENT_SECRET!,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Amadeus auth failed: ${res.status} ${text}`);
  }

  const data = await res.json();
  cachedToken = {
    token: data.access_token,
    expires: Date.now() + data.expires_in * 1000 - 30_000,
  };
  return cachedToken.token;
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const required = ["originLocationCode", "destinationLocationCode", "departureDate", "adults"];
    for (const key of required) {
      if (!searchParams.get(key)) {
        return NextResponse.json({ error: `Missing required param: ${key}` }, { status: 400 });
      }
    }

    const token = await getToken();

    const amadeusParams = new URLSearchParams({
      originLocationCode: searchParams.get("originLocationCode")!,
      destinationLocationCode: searchParams.get("destinationLocationCode")!,
      departureDate: searchParams.get("departureDate")!,
      adults: searchParams.get("adults")!,
      max: searchParams.get("max") ?? "15",
      currencyCode: "USD",
    });

    const returnDate = searchParams.get("returnDate");
    const children = searchParams.get("children");
    const infants = searchParams.get("infants");
    if (returnDate) amadeusParams.set("returnDate", returnDate);
    if (children && children !== "0") amadeusParams.set("children", children);
    if (infants && infants !== "0") amadeusParams.set("infants", infants);

    const flightRes = await fetch(
      `${AMADEUS_BASE}/v2/shopping/flight-offers?${amadeusParams}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const flightData = await flightRes.json();

    if (!flightRes.ok) {
const detail = flightData?.errors?.[0]?.detail ?? flightData?.errors?.[0]?.title ?? "Amadeus API error";
      return NextResponse.json({ error: detail }, { status: flightRes.status });
    }

    return NextResponse.json(flightData.data ?? []);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
