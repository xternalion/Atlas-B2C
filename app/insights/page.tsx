import type { Metadata } from "next";
import Insights from "@/components/Travel/Insights";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://www.atlasinc.io";

export const metadata: Metadata = {
  title: "Insights | Atlas — Stories, Guides & Perspectives",
  description:
    "Atlas Insights — software perspectives, travel guides, venture updates, and stories from the Atlas ecosystem.",
  alternates: { canonical: `${baseUrl}/insights` },
};

export default function InsightsPage() {
  return <Insights />;
}
