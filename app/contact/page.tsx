import type { Metadata } from "next";
import Contact from "@/components/Contact";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://www.atlasinc.io";

export const metadata: Metadata = {
  title: "Contact | Atlas - Get to Know Us",
  description:
    "Get in touch with Atlas for software projects, travel bookings, or any general inquiry. We respond within 48 hours.",
  alternates: { canonical: `${baseUrl}/contact` },
};

export default function ContactPage() {
  return <Contact />;
}
